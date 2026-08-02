const STAGES = [
  "Orient",
  "5-minute starter",
  "Learn",
  "Practise",
  "Use",
  "Reflect",
  "Show Mum",
];
const RATINGS = {
  0: "Needs another model",
  1: "Correct but hesitant",
  2: "Clear from memory",
};
const MUM_RATINGS = {
  0: "Needs practice",
  1: "Nearly clear",
  2: "Clear to me",
};
const $ = (id) => document.getElementById(id);
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>\"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '\"': "&quot;",
        "'": "&#39;",
      })[ch],
  );
function fresh() {
  return {
    schema: 6,
    selected: 1,
    stage: 0,
    completed: {},
    completedDates: {},
    stageDone: {},
    checks: {},
    notes: {},
    confidence: {},
    lastOpen: {},
    itemIndex: {},
    learnOrder: {},
    learnAttempts: {},
    itemRatings: {},
    retrieval: {},
    recallIndex: {},
    starterPlans: {},
    mumRatings: {},
    mumIndex: {},
    mumFollowups: {},
    reviewQueue: [],
    resourceOpened: {},
    timerLeft: {},
    shiftEvents: [],
    legacySkips: 0,
  };
}
function mergeState(raw) {
  const base = fresh(),
    legacy = raw && (!raw.schema || raw.schema < 5),
    s = { ...base, ...raw };
  for (const k of [
    "completed",
    "completedDates",
    "stageDone",
    "checks",
    "notes",
    "confidence",
    "lastOpen",
    "itemIndex",
    "learnOrder",
    "learnAttempts",
    "itemRatings",
    "retrieval",
    "recallIndex",
    "starterPlans",
    "mumRatings",
    "mumIndex",
    "mumFollowups",
    "resourceOpened",
    "timerLeft",
  ])
    s[k] = { ...(raw?.[k] || {}) };
  s.reviewQueue = Array.isArray(raw?.reviewQueue) ? raw.reviewQueue : [];
  s.shiftEvents = Array.isArray(raw?.shiftEvents) ? raw.shiftEvents : [];
  if (legacy) {
    const map = { 0: 0, 1: 2, 2: 3, 3: 1, 4: 4, 5: 5 },
      mappedStages = {},
      mappedChecks = {};
    Object.entries(raw.stageDone || {}).forEach(([k, v]) => {
      const [day, stage] = k.split("-");
      mappedStages[`${day}-${map[stage] ?? stage}`] = v;
    });
    Object.entries(raw.checks || {}).forEach(([k, v]) => {
      const [day, stage, ...rest] = k.split("-");
      mappedChecks[`${day}-${map[stage] ?? stage}-${rest.join("-")}`] = v;
    });
    s.stageDone = mappedStages;
    s.checks = mappedChecks;
    Object.entries(raw.lastOpen || {}).forEach(
      ([day, stage]) => (s.lastOpen[day] = map[stage] ?? stage),
    );
    s.stage = map[raw.stage] ?? 0;
    Object.entries(raw.vocabDone || {}).forEach(([day, items]) => {
      const pending = [];
      (COURSE[Number(day) - 1]?.items || []).forEach((_, i) => {
        if (items[i]) s.itemRatings[`${day}-${i}`] = 1;
        else pending.push(i);
      });
      if (pending.length) s.learnOrder[day] = pending;
      else if ((COURSE[Number(day) - 1]?.items || []).length)
        s.stageDone[`${day}-2`] = true;
    });
    Object.entries(raw.recall || {}).forEach(([day, items]) => {
      Object.entries(items || {}).forEach(([i, rating]) => {
        s.itemRatings[`${day}-${i}`] = Math.max(
          s.itemRatings[`${day}-${i}`] ?? 0,
          Number(rating),
        );
        if (Number(rating) < 2)
          s.reviewQueue.push({
            day: Number(day),
            index: Number(i),
            rating: Number(rating),
            due: Number(day) + 1,
          });
      });
    });
    s.migratedFrom = 4;
  }
  s.schema = 6;
  return s;
}
function load() {
  try {
    return mergeState(JSON.parse(localStorage.getItem(KEY) || "{}"));
  } catch (e) {
    return fresh();
  }
}
let state = load(),
  timer = { left: 60, running: false, id: null };
function firstOpen() {
  return (
    COURSE.find((l) => !state.completed[l.day]) || COURSE[COURSE.length - 1]
  );
}
if (!state.shiftEvents.length && Number(state.skips) > 0) {
  state.shiftEvents = [
    {
      fromDay: firstOpen().day,
      count: Number(state.skips),
      at: Date.now(),
      legacy: true,
    },
  ];
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}
function announce(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  t.setAttribute("role", "status");
  clearTimeout(announce.id);
  announce.id = setTimeout(() => t.classList.remove("show"), 3200);
}
function lesson() {
  return COURSE[state.selected - 1] || COURSE[0];
}
function stageKey(day, stage) {
  return `${day}-${stage}`;
}
function checkKey(day, stage, item) {
  return `${day}-${stage}-${item}`;
}
function itemKey(day, index) {
  return `${day}-${index}`;
}
function stageIsDone(day, stage) {
  return !!state.stageDone[stageKey(day, stage)];
}
function getCheck(day, stage, item) {
  return !!state.checks[checkKey(day, stage, item)];
}
function setCheck(day, stage, item, value) {
  state.checks[checkKey(day, stage, item)] = value;
  save();
}
function effectiveDate(day) {
  const d = new Date(START);
  let shift = 0;
  state.shiftEvents.forEach((e) => {
    if (day >= e.fromDay) shift += e.count || 1;
  });
  d.setDate(d.getDate() + day - 1 + shift);
  return d;
}
function fmt(d) {
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function resumeStage(day) {
  if (state.completed[day]) return 0;
  const saved = Number(state.lastOpen[day]);
  if (Number.isInteger(saved) && saved >= 0 && saved < STAGES.length)
    return saved;
  for (let i = 0; i < STAGES.length; i++)
    if (!stageIsDone(day, i)) return i;
  return STAGES.length - 1;
}
function savedPosition(l) {
  const s = resumeStage(l.day);
  if (s === 2) {
    const order = learnOrder(l),
      p = state.itemIndex[l.day] || 0;
    return `${STAGES[s]}, sign ${Math.min(p + 1, order.length)} of ${order.length}`;
  }
  if (s === 1) {
    const prompts = retrievalPrompts(l),
      p = state.recallIndex[l.day] || 0;
    return `${STAGES[s]}, prompt ${Math.min(p + 1, prompts.length)} of ${prompts.length}`;
  }
  if (s === 6) {
    const prompts = showMumPrompts(l),
      p = state.mumIndex[l.day] || 0;
    return `${STAGES[s]}, prompt ${Math.min(p + 1, prompts.length)} of ${prompts.length}`;
  }
  return STAGES[s];
}
function totalTime(value) {
  return `${String(value).replace(/\d+/g, (n) => Number(n) + 20)} including Show Mum`;
}
function lessonPath(l) {
  return [
    "5-minute adaptive starter",
    `learn ${l.items.length} ${l.items.length === 1 ? "item" : "items"}`,
    "guided production drill",
    "communication challenge",
    "20-minute Show Mum finale",
  ];
}
function renderHome() {
  const n = firstOpen(),
    done = COURSE.filter((l) => state.completed[l.day]).length,
    position = savedPosition(n);
  $("homePhase").textContent = n.phase;
  $("homeTitle").textContent = n.title;
  $("homeFocus").textContent = n.purpose;
  $("homeDay").textContent = `Day ${n.day} of ${COURSE.length}`;
  $("homeDate").textContent = fmt(effectiveDate(n.day));
  $("homeTime").textContent = totalTime(n.time);
  $("homeSaved").textContent =
    state.lastOpen[n.day] !== undefined
      ? `Saved at ${position}`
      : "Not started";
  $("homeOutcome").textContent = n.mastery;
  $("todayPath").innerHTML = lessonPath(n)
    .map((x) => `<li>${esc(x)}</li>`)
    .join("");
  $("doneCount").textContent = done;
  $("remainCount").textContent = COURSE.length - done;
  $("progressBar").style.width = `${Math.round((done / COURSE.length) * 100)}%`;
  $("progressBar").parentElement.setAttribute(
    "aria-label",
    `${done} of ${COURSE.length} lessons complete`,
  );
  $("beginBtn").textContent =
    state.lastOpen[n.day] !== undefined
      ? `Continue Day ${n.day}: ${position}`
      : `Start Day ${n.day}`;
  renderCourseMap();
  renderReviewSummary();
}
function renderCourseMap() {
  const phases = [];
  COURSE.forEach((l) => {
    let p = phases.find((x) => x.name === l.phase);
    if (!p) {
      p = { name: l.phase, lessons: [] };
      phases.push(p);
    }
    p.lessons.push(l);
  });
  const current = firstOpen().day;
  $("journey").innerHTML = phases
    .map(
      (p, pi) =>
        `<details class="phaseGroup" ${p.lessons.some((l) => l.day === current) || pi === 0 ? "open" : ""}><summary><span>${esc(p.name)}</span><small>${p.lessons.filter((l) => state.completed[l.day]).length}/${p.lessons.length} complete</small></summary><div class="phaseDays">${p.lessons
          .map((l) => {
            const st = state.completed[l.day]
              ? "Complete"
              : l.day === current
                ? state.lastOpen[l.day] !== undefined
                  ? `Resume ${savedPosition(l)}`
                  : "Next lesson"
                : "Available";
            return `<button class="day" data-day="${l.day}" type="button"><span class="dayNum">DAY ${l.day}</span><span><strong>${esc(l.title)}</strong><small>${esc(l.purpose)}</small></span><span class="status ${state.completed[l.day] ? "complete" : l.day === current ? "current" : ""}">${esc(st)}</span></button>`;
          })
          .join("")}</div></details>`,
    )
    .join("");
  document
    .querySelectorAll("[data-day]")
    .forEach((b) => (b.onclick = () => openLesson(Number(b.dataset.day))));
}
function renderReviewSummary() {
  const weak = state.reviewQueue.filter((q) => q.rating < 2).slice(0, 6);
  $("reviewSummary").innerHTML = weak.length
    ? weak
        .map(
          (q) =>
            `<span class="reviewChip">${esc(COURSE[q.day - 1]?.items[q.index]?.term || "Earlier item")}</span>`,
        )
        .join("")
    : '<span class="muted">Your hesitant signs will appear here after practice.</span>';
}
function openLesson(day) {
  stopTimer();
  state.selected = day;
  state.stage = resumeStage(day);
  state.lastOpen[day] = state.stage;
  save();
  $("home").classList.add("hidden");
  $("session").classList.add("active");
  renderSession();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function exitSession() {
  stopTimer();
  $("session").classList.remove("active");
  $("home").classList.remove("hidden");
  save();
  renderHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderSession() {
  const l = lesson();
  $("sessionPhase").textContent =
    `${l.phase} · Day ${l.day} of ${COURSE.length} · ${fmt(effectiveDate(l.day))}`;
  $("sessionTitle").textContent = l.title;
  $("sessionFocus").textContent = l.purpose;
  $("sessionStepCount").textContent = `Step ${state.stage + 1} of ${STAGES.length}`;
  $("sessionTime").textContent = totalTime(l.time);
  renderRail();
  renderStage();
}
function renderRail() {
  $("stageRail").innerHTML = STAGES.map(
    (s, i) =>
      `<button type="button" class="stageDot ${i === state.stage ? "active" : stageIsDone(state.selected, i) ? "done" : ""}" data-stage="${i}" ${i > state.stage && !stageIsDone(state.selected, i - 1) ? "disabled" : ""} aria-current="${i === state.stage ? "step" : "false"}"><span>${i + 1}</span><strong>${esc(s)}</strong></button>`,
  ).join("");
  document.querySelectorAll("[data-stage]").forEach(
    (b) =>
      (b.onclick = () => {
        state.stage = Number(b.dataset.stage);
        state.lastOpen[state.selected] = state.stage;
        save();
        renderSession();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }),
  );
}
function actionBox(action, why, ready) {
  return `<section class="actionBox" aria-labelledby="do-now"><p class="eyebrow" id="do-now">DO THIS NOW</p><h3>${esc(action)}</h3><div class="reasonGrid"><div><strong>Why this matters</strong><p>${esc(why)}</p></div><div><strong>You are ready to continue when</strong><p>${esc(ready)}</p></div></div></section>`;
}
function checklist(items, stage) {
  return `<div class="checklist">${items.map((x, i) => `<label class="check ${getCheck(state.selected, stage, i) ? "checked" : ""}"><input type="checkbox" data-check-item="${i}" ${getCheck(state.selected, stage, i) ? "checked" : ""}><span>${esc(x)}</span></label>`).join("")}</div>`;
}
function helpBox(text) {
  return `<details class="helpBox"><summary>I’m stuck</summary><p>${esc(text)}</p><button type="button" class="miniBtn" id="saveFromHelp">Save and return later</button></details>`;
}
function resourceCard(r, index) {
  const opened =
    !!state.resourceOpened[`${state.selected}-${state.stage}-${index}`];
  return `<article class="resourceCard"><div><p class="eyebrow">${esc(r.source)}</p><h4>${esc(r.label)}</h4><p><strong>Why open it:</strong> ${esc(r.purpose)}</p><p><strong>Watch for:</strong> ${esc(r.watch)}</p></div><a class="resourceLink" data-resource="${index}" href="${esc(r.url)}" target="_blank" rel="noopener">${opened ? "Reopen" : "Open"} ${esc(r.label)} ↗</a>${opened ? `<div class="returnCue"><strong>When you return</strong><p>${esc(r.returnCue)}</p></div>` : ""}</article>`;
}
function nav(ready, message, last = false) {
  return `<div class="stageNav"><div><button class="btn secondary" id="backStage" type="button" ${state.stage === 0 ? "disabled" : ""}>Back</button><button class="btn ghost" id="saveExit" type="button">Save and leave</button></div><div>${last ? `<button class="btn good" id="finishLesson" type="button" ${ready ? "" : "disabled"}>Finish Day ${state.selected}</button>` : `<button class="btn" id="nextStage" type="button" ${ready ? "" : "disabled"}>Continue to ${STAGES[state.stage + 1]}</button>`}</div></div><p class="gateMessage" role="status">${esc(message)}</p>`;
}
function orientStage(l) {
  const items = [
    `Read why today’s lesson matters: ${l.purpose}`,
    `Check the prerequisite: ${l.prior}`,
    "Place the device so your face, shoulders and hands remain visible",
  ];
  const ready = items.every((_, i) => getCheck(l.day, 0, i));
  return `<div class="stageLabel">Step 1 of 7 · Orient</div>${actionBox("Read today’s purpose, then complete the three setup actions.", "Orientation connects today to earlier learning and prevents practice becoming disconnected copying.", l.mastery)}<div class="orientationGrid"><div><p class="eyebrow">REAL-WORLD USE</p><p>${esc(l.use)}</p></div><div><p class="eyebrow">LANGUAGE & CULTURE</p><p>${esc(l.culture)}</p></div></div>${checklist(items, 0)}<h4 class="sectionTitle">Open only what today needs</h4>${l.resources.map(resourceCard).join("")}${helpBox(l.stuck)}${nav(ready, ready ? "Setup complete. Begin the five-minute adaptive starter." : `Complete ${items.filter((_, i) => !getCheck(l.day, 0, i)).length} setup action(s).`)}`;
}
function mumKey(day, index) {
  return `${day}-${index}`;
}
function showMumPrompts(l) {
  const terms = l.items
    .slice(0, Math.min(3, l.items.length))
    .map((item) => item.term);
  const termList = terms.map((term) => `“${term}”`).join(", ");
  return [
    {
      name: "Signs from memory",
      ask: `Show me ${termList} one at a time, without opening an example.`,
      learner:
        "Pause for five seconds before beginning. Sign each item once, leave a clear space, then repeat only the least certain item.",
      lookFor:
        "I can see where one sign ends and the next begins; the hands stay in a readable area; the pace remains calm.",
      starter: `Produce ${terms.join(", ")} from memory with a clear pause between each item.`,
    },
    {
      name: "Today’s focused skill",
      ask: `Show me this practice without speaking: ${l.drill}`,
      learner:
        "Complete one uninterrupted attempt. If a sign disappears, pause, use a repair, and continue instead of restarting everything.",
      lookFor: `I can see a deliberate attempt at today’s focus: ${l.observe}`,
      starter: `Repeat the core drill from Day ${l.day}: ${l.drill}`,
    },
    {
      name: "Use it for meaning",
      ask: `Use today’s learning to communicate this: ${l.use}`,
      learner:
        "Set up the meaning before you begin, make eye contact, and complete the whole message in BSL before discussing it in English.",
      lookFor: `I can follow the beginning, middle and end. ${l.review}`,
      starter: `Rebuild the communication challenge from Day ${l.day}: ${l.use}`,
    },
    {
      name: "Explain and repair",
      ask:
        "Show me the part you found hardest. Pause. Show it once more with one visible improvement.",
      learner:
        "Choose one genuine difficulty. Make the first attempt, silently choose one change, then make the second attempt.",
      lookFor:
        "The second attempt contains one change I can notice—clearer position, steadier pace, stronger expression or a cleaner pause.",
      starter: `Revisit the hardest part of Day ${l.day} and make one visible improvement.`,
    },
  ];
}
function adaptiveMumPrompts(l) {
  const observations = Object.entries(state.mumFollowups)
    .map(([key, followup]) => {
      const [day, index] = key.split("-").map(Number),
        sourceLesson = COURSE[day - 1],
        prompt = sourceLesson ? showMumPrompts(sourceLesson)[index] : null;
      return {
        key,
        day,
        index,
        prompt,
        rating: Number(followup?.rating),
        due: Number(followup?.due ?? day + 1),
      };
    })
    .filter(
      (item) =>
        item.prompt &&
        item.day < l.day &&
        item.due <= l.day &&
        Number.isFinite(item.rating),
    );
  const weak = observations
      .filter((item) => item.rating === 0)
      .sort((a, b) => b.day - a.day)
      .slice(0, 2),
    nearly = observations
      .filter((item) => item.rating === 1)
      .sort((a, b) => b.day - a.day)
      .slice(0, 1),
    secure = observations
      .filter((item) => item.rating === 2)
      .sort((a, b) => a.day - b.day)
      .slice(0, 1);
  return [...weak, ...nearly, ...secure].map((item) => ({
    term: item.prompt.starter,
    source: `Mum’s check · Day ${item.day} · ${MUM_RATINGS[item.rating]}`,
    kind: "mum",
    mumKey: item.key,
    sourceDay: item.day,
    promptIndex: item.index,
  }));
}
function retrievalPrompts(l) {
  if (Array.isArray(state.starterPlans[l.day]) && state.starterPlans[l.day].length)
    return state.starterPlans[l.day];
  const mum = adaptiveMumPrompts(l);
  const due = state.reviewQueue
    .filter((q) => q.day < l.day && q.rating < 2)
    .sort((a, b) => (a.due || 0) - (b.due || 0))
    .slice(0, 3)
    .map((q) => ({
      term: COURSE[q.day - 1]?.items[q.index]?.term || "Earlier item",
      source: `Day ${q.day}`,
      sourceDay: q.day,
      itemIndex: q.index,
    }));
  const prev =
    l.day > 1
      ? COURSE[l.day - 2].items
          .slice(0, 2)
          .map((x, index) => ({
            term: x.term,
            source: `Day ${l.day - 1}`,
            sourceDay: l.day - 1,
            itemIndex: index,
          }))
      : [];
  const foundation =
    l.day > 4
      ? [
          {
            term: l.day % 2 ? "fingerspell your name" : "hello",
            source: "Foundation",
          },
        ]
      : [];
  const unique = [];
  [...mum, ...due, ...prev, ...foundation].forEach((x) => {
    if (x.term && !unique.some((y) => y.term === x.term)) unique.push(x);
  });
  const plan = (
    unique.length
      ? unique
      : l.items
          .slice(0, 3)
          .map((x) => ({ term: x.term, source: "Today’s preview" }))
  ).slice(0, 5);
  state.starterPlans[l.day] = plan;
  save();
  return plan;
}
function retrievalStage(l) {
  const prompts = retrievalPrompts(l),
    idx = Math.min(state.recallIndex[l.day] || 0, prompts.length - 1),
    results = state.retrieval[l.day] || {},
    done = Object.keys(results).length >= prompts.length,
    p = prompts[idx];
  return `<div class="stageLabel">Step 2 of 7 · Adaptive starter</div>${actionBox(`Attempt today’s ${prompts.length} short prompts for five minutes. Start with the visible prompt below.`, `This starter is assembled from your mum’s last ratings, hesitant signs and one older secure item. It changes with the evidence you create.`, `You have honestly attempted all ${prompts.length} prompts. Correct answers are not required.`)}${timerWidget("FIVE-MINUTE STARTER", 300, "Attempt the visible prompt, rate it honestly, then move straight to the next. When time ends, finish only the prompt already in progress.")}<div class="promptCard starterPrompt"><small>${esc(p.source)} · Prompt ${idx + 1} of ${prompts.length}</small><strong>${esc(p.term)}</strong><button class="miniBtn" id="showRetrievalClue" type="button">Show one clue</button><p id="retrievalClue" hidden>Make only the first position or first meaning block. If nothing returns, mark “Not remembered”; the app will bring it back.</p></div><div class="ratingRow"><button class="btn good" data-retrieval="2">Remembered clearly</button><button class="btn warn" data-retrieval="1">Remembered with hesitation</button><button class="btn secondary" data-retrieval="0">Not remembered</button></div>${helpBox("Pause for five seconds. If nothing returns, show the clue, attempt only the first position, then record ‘Not remembered’. The item will return later.")}${nav(done, done ? "Starter complete. The next review plan has already adapted." : `${Object.keys(results).length} of ${prompts.length} starter prompts attempted.`)}`;
}
function learnOrder(l) {
  if (
    !Array.isArray(state.learnOrder[l.day]) ||
    !state.learnOrder[l.day].length
  )
    state.learnOrder[l.day] = l.items.map((_, i) => i);
  return state.learnOrder[l.day];
}
function learnStage(l) {
  const order = learnOrder(l),
    pos = state.itemIndex[l.day] || 0,
    finished = pos >= order.length,
    index = order[Math.min(pos, order.length - 1)] ?? 0,
    item = l.items[index],
    rating = state.itemRatings[itemKey(l.day, index)],
    opened = !!state.resourceOpened[`${l.day}-2-0`];
  if (finished)
    return `<div class="stageLabel">Step 3 of 7 · Learn</div>${actionBox("Review the learning results below, then continue.", "Every item has moved through observe, copy, compare and recall. Items needing support are already queued.", "Each item has an honest result recorded.")}<div class="summaryList">${l.items.map((x, i) => `<div><strong>${esc(x.term)}</strong><span>${esc(RATINGS[state.itemRatings[itemKey(l.day, i)]] || "Attempted")}</span></div>`).join("")}</div>${helpBox(l.stuck)}${nav(true, "Learning cycle complete. Hesitant signs will return in a later starter.")}`;
  return `<div class="stageLabel">Step 3 of 7 · Learn</div>${actionBox(`Learn “${item.term}”. The app will carry the full practice after one short model.`, `Working with one item at a time removes decision fatigue and forces observation before imitation.`, `You have recalled the item with the example closed and chosen an honest result.`)}<div class="itemProgress"><span>Sign ${pos + 1} of ${order.length}</span><progress value="${pos}" max="${order.length}" aria-label="Sign ${pos + 1} of ${order.length}"></progress></div><div class="learningSequence"><section><span>01</span><div><strong>See the meaning</strong><p>Say the meaning to yourself, then open the BSL model.</p></div></section><section><span>02</span><div><strong>Watch with purpose</strong><p>Watch once without moving. Watch again and ${esc(l.observe)}</p></div></section><section><span>03</span><div><strong>Shape and compare</strong><p>Copy slowly three times. Compare location, movement and what the face contributes.</p></div></section><section><span>04</span><div><strong>Close, recall, use</strong><p>Close the model, wait five seconds, recall once, then place the sign in today’s smallest useful phrase.</p></div></section></div>${resourceCard(item.resource, 0)}${opened ? "" : `<p class="gateMessage">Use the short model once. After that, the whole learning cycle stays here.</p>`}<div class="ratingRow"><button class="btn good" data-item-rating="2" ${opened ? "" : "disabled"}>Clear from memory</button><button class="btn warn" data-item-rating="1" ${opened ? "" : "disabled"}>Correct but hesitant</button><button class="btn secondary" data-item-rating="0" ${opened ? "" : "disabled"}>Needs another model</button></div>${helpBox(l.stuck)}${nav(false, `Complete the four learning moves for “${item.term}”.`)}`;
}
function timerWidget(label, seconds, instruction) {
  return `<section class="timerBox" data-timer-seconds="${seconds}"><div><p class="eyebrow">${esc(label)}</p><strong id="timerReadout">${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}</strong><p>${esc(instruction)}</p></div><div><button class="miniBtn" id="timerToggle" type="button">Start timer</button><button class="miniBtn" id="timerRestart" type="button">Restart</button></div></section>`;
}
function practiseStage(l) {
  const items = [
      l.drill,
      `Focus on: ${l.observe}`,
      `Record one short attempt in the device camera, return here, and watch it once with sound muted. If you prefer not to record, use a mirror and complete the same visual check.`,
    ],
    ready = items.every((_, i) => getCheck(l.day, 3, i));
  return `<div class="stageLabel">Step 4 of 7 · Practise</div>${actionBox(l.drill, "A deliberate drill isolates today’s coordination before you use it in communication.", l.mastery)}${timerWidget("OPTIONAL ONE-MINUTE ROUND", 60, "Repeat today’s drill calmly. When time ends, stop, rest your hands and complete the self-check.")}${checklist(items, 3)}<div class="reviewPanel"><p class="eyebrow">COMMON ERRORS TO CHECK</p><ul>${l.errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>${helpBox(l.stuck)}${nav(ready, ready ? "Practice evidence complete." : `Complete ${items.filter((_, i) => !getCheck(l.day, 3, i)).length} practice action(s).`)}`;
}
function useStage(l) {
  const items = [
      `Receptive check: ${l.receptive}`,
      `Communication challenge: ${l.use}`,
      `Self-review: ${l.review}`,
    ],
    ready = items.every((_, i) => getCheck(l.day, 4, i));
  return `<div class="stageLabel">Step 5 of 7 · Use</div>${actionBox(l.use, "Communication combines vocabulary, visual grammar, watching and repair. It is the purpose of the separate drills.", l.mastery)}${checklist(items, 4)}<div class="schoolBox"><p class="eyebrow">USE THIS IN SCHOOL — OPTIONAL</p><p>${esc(l.school)}</p><small>Remain clear that you are a learner. Continue through Deaf-led teaching and real interaction.</small></div>${helpBox(l.stuck)}${nav(ready, ready ? "You completed the communication attempt and review." : `Complete ${items.filter((_, i) => !getCheck(l.day, 4, i)).length} evidence action(s). Success is not required—an honest attempt is.`)}`;
}
function closeStage(l) {
  const note = state.notes[l.day] || "",
    conf = state.confidence[l.day],
    ready = note.trim().length >= 20 && !!conf;
  return `<div class="stageLabel">Step 6 of 7 · Reflect</div>${actionBox("Read the mastery statement, make an honest decision, then write one next action.", "A precise reflection prepares you to display today’s learning and tells tomorrow’s starter what matters.", l.mastery)}<div class="masteryBox"><p class="eyebrow">TODAY’S MASTERY DECISION</p><p>${esc(l.mastery)}</p><p><strong>Reflection:</strong> ${esc(l.reflect)}</p></div><label class="fieldLabel" for="notes">Write what was clear and what should return</label><textarea id="notes" placeholder="Clear today…\nBring back tomorrow…">${esc(note)}</textarea><div class="confidence"><button data-confidence="1" class="${conf === 1 ? "active" : ""}">Needs support</button><button data-confidence="2" class="${conf === 2 ? "active" : ""}">Hesitant but usable</button><button data-confidence="3" class="${conf === 3 ? "active" : ""}">Clear today</button></div><div class="previewBox"><p class="eyebrow">AFTER SHOW MUM</p><p>${esc(l.preview)}</p></div>${helpBox(l.stuck)}${nav(ready, ready ? "Reflection saved. Continue to the 20-minute Show Mum finale." : "Write at least 20 characters and choose one confidence level.")}`;
}
function mumRating(day, index) {
  const value = state.mumRatings[mumKey(day, index)];
  return Number(typeof value === "object" ? value.rating : value);
}
function showMumStage(l) {
  const prompts = showMumPrompts(l),
    rated = prompts.filter((_, index) =>
      Number.isFinite(mumRating(l.day, index)),
    ).length,
    done = rated >= prompts.length,
    idx = Math.min(state.mumIndex[l.day] || 0, prompts.length - 1),
    p = prompts[idx];
  if (done)
    return `<div class="stageLabel">Step 7 of 7 · Show Mum</div>${actionBox("Look over Mum’s four ratings, then finish today’s lesson.", "These observations are evidence, not a verdict. The next five-minute starter will begin with anything marked ‘Needs practice’ or ‘Nearly clear’.", "All four prompts have a rating and the adaptive starter has been prepared.")}<section class="mumSummary"><div class="observerBadge"><span aria-hidden="true">✓</span><div><p class="eyebrow">DISPLAY OF UNDERSTANDING COMPLETE</p><h3>Mum’s view of today</h3></div></div>${prompts.map((prompt, index) => `<div class="mumResult"><div><strong>${esc(prompt.name)}</strong><span>${esc(MUM_RATINGS[mumRating(l.day, index)])}</span></div><button type="button" class="miniBtn" data-edit-mum="${index}">Change rating</button></div>`).join("")}<p class="mumAdaptNote"><strong>Tomorrow is already different.</strong> The five-minute starter will put the least clear display first, then one older secure item for confidence.</p></section>${nav(true, "All four answers were attempted and rated. Day complete is ready.", true)}`;
  return `<div class="stageLabel">Step 7 of 7 · Show Mum</div>${actionBox("Hand the device to Mum. She reads one prompt, watches your answer, then taps one rating.", "Explaining and demonstrating learning to another person exposes what is genuinely available from memory. Mum does not need to know BSL; the app tells her what visible features to notice.", `All ${prompts.length} prompts have been attempted and rated. Accuracy is not required to finish.`)}<section class="mumHandoff"><div class="observerBadge"><span aria-hidden="true">M</span><div><p class="eyebrow">MUM’S VIEW</p><h3>Prompt ${idx + 1} of ${prompts.length}</h3></div></div><p class="mumPrivacy">No recording or rating leaves this device. Please rate what was visible, not what you think the “right sign” should be.</p></section>${timerWidget("20-MINUTE SHOW MUM", 1200, "Allow about five minutes for each prompt: read it, wait quietly, watch the full answer, rate it, then move on.")}<section class="mumPrompt"><p class="eyebrow">MUM, SAY THIS</p><h3>${esc(p.ask)}</h3><div class="mumInstructions"><div><strong>Will does this</strong><p>${esc(p.learner)}</p></div><div><strong>Mum watches for</strong><p>${esc(p.lookFor)}</p></div></div></section><div class="mumRating"><p class="eyebrow">MUM’S RATING FOR THIS ANSWER</p><div class="ratingRow"><button class="btn good" data-mum-rating="2"><strong>Clear to me</strong><span>I could follow it</span></button><button class="btn warn" data-mum-rating="1"><strong>Nearly clear</strong><span>Some hesitation or blur</span></button><button class="btn secondary" data-mum-rating="0"><strong>Needs practice</strong><span>Please bring this back</span></button></div></div>${helpBox("Reduce the answer, not the honesty of the rating. Show only the first sign or first meaning block, pause, then add one piece. Mum should still rate what she could see.")}${nav(false, `${rated} of ${prompts.length} Show Mum prompts rated.`, true)}`;
}
function renderStage() {
  stopTimer();
  const l = lesson();
  let html = [
    orientStage,
    retrievalStage,
    learnStage,
    practiseStage,
    useStage,
    closeStage,
    showMumStage,
  ][state.stage](l);
  $("stageCard").innerHTML = html;
  bindStage(l);
}
function stageReady(l, stage) {
  if (stage === 0) return [0, 1, 2].every((i) => getCheck(l.day, 0, i));
  if (stage === 1)
    return (
      Object.keys(state.retrieval[l.day] || {}).length >=
      retrievalPrompts(l).length
    );
  if (stage === 2) return (state.itemIndex[l.day] || 0) >= learnOrder(l).length;
  if (stage === 3 || stage === 4)
    return [0, 1, 2].every((i) => getCheck(l.day, stage, i));
  if (stage === 5)
    return (
      (state.notes[l.day] || "").trim().length >= 20 &&
      !!state.confidence[l.day]
    );
  if (stage === 6)
    return showMumPrompts(l).every((_, index) =>
      Number.isFinite(mumRating(l.day, index)),
    );
  return false;
}
function enqueue(day, index, rating, due) {
  const existing = state.reviewQueue.find(
    (q) => q.day === day && q.index === index,
  );
  if (existing) {
    existing.rating = rating;
    existing.due = due;
  } else state.reviewQueue.push({ day, index, rating, due });
}
function bindStage(l) {
  document.querySelectorAll("[data-check-item]").forEach(
    (c) =>
      (c.onchange = () => {
        setCheck(l.day, state.stage, Number(c.dataset.checkItem), c.checked);
        renderStage();
      }),
  );
  document.querySelectorAll("[data-resource]").forEach(
    (a) =>
      (a.onclick = () => {
        state.resourceOpened[`${l.day}-${state.stage}-${a.dataset.resource}`] =
          true;
        save();
        setTimeout(renderStage, 250);
      }),
  );
  const saveHelp = $("saveFromHelp");
  if (saveHelp) saveHelp.onclick = exitSession;
  const back = $("backStage");
  if (back) back.onclick = () => moveStage(-1);
  const saveExit = $("saveExit");
  if (saveExit) saveExit.onclick = exitSession;
  const next = $("nextStage");
  if (next)
    next.onclick = () => {
      if (!stageReady(l, state.stage)) {
        announce("Complete the visible attempt before continuing.");
        return;
      }
      state.stageDone[stageKey(l.day, state.stage)] = true;
      moveStage(1);
    };
  document.querySelectorAll("[data-retrieval]").forEach(
    (b) =>
      (b.onclick = () => {
        const prompts = retrievalPrompts(l),
          idx = state.recallIndex[l.day] || 0,
          rating = Number(b.dataset.retrieval);
        state.retrieval[l.day] = state.retrieval[l.day] || {};
        state.retrieval[l.day][idx] = rating;
        const source = prompts[idx];
        if (source.kind === "mum" && source.mumKey) {
          state.mumFollowups[source.mumKey] = {
            rating,
            due: l.day + (rating === 0 ? 1 : rating === 1 ? 2 : 7),
            lastDay: l.day,
          };
        } else {
          const sourceDay = Number(
            source.sourceDay || (source.source.match(/\d+/) || [])[0],
          );
          const itemIndex = Number.isInteger(source.itemIndex)
            ? source.itemIndex
            : sourceDay
              ? COURSE[sourceDay - 1].items.findIndex(
                  (x) => x.term === source.term,
                )
              : -1;
          if (itemIndex >= 0)
            enqueue(
              sourceDay,
              itemIndex,
              rating,
              l.day + (rating === 0 ? 1 : rating === 1 ? 2 : 7),
            );
        }
        state.recallIndex[l.day] = Math.min(idx + 1, prompts.length - 1);
        save();
        const resumeClock = timer.running;
        renderStage();
        if (resumeClock) $("timerToggle")?.click();
      }),
  );
  const clue = $("showRetrievalClue");
  if (clue)
    clue.onclick = () => {
      $("retrievalClue").hidden = false;
      clue.disabled = true;
    };
  document.querySelectorAll("[data-item-rating]").forEach(
    (b) =>
      (b.onclick = () => {
        const order = learnOrder(l),
          pos = state.itemIndex[l.day] || 0,
          index = order[pos],
          rating = Number(b.dataset.itemRating),
          k = itemKey(l.day, index);
        state.itemRatings[k] = rating;
        state.learnAttempts[k] = (state.learnAttempts[k] || 0) + 1;
        enqueue(
          l.day,
          index,
          rating,
          l.day + (rating === 0 ? 1 : rating === 1 ? 2 : 7),
        );
        if (rating === 0 && state.learnAttempts[k] < 2) order.push(index);
        state.itemIndex[l.day] = pos + 1;
        delete state.resourceOpened[`${l.day}-2-0`];
        save();
        renderStage();
      }),
  );
  const notes = $("notes");
  if (notes)
    notes.oninput = (e) => {
      state.notes[l.day] = e.target.value;
      save();
      const ready = stageReady(l, 5),
        action = $("nextStage"),
        message = document.querySelector(".gateMessage");
      if (action) action.disabled = !ready;
      if (message)
        message.textContent = ready
          ? "Reflection saved. Continue to the 20-minute Show Mum finale."
          : "Write at least 20 characters and choose one confidence level.";
    };
  document.querySelectorAll("[data-confidence]").forEach(
    (b) =>
      (b.onclick = () => {
        state.confidence[l.day] = Number(b.dataset.confidence);
        save();
        renderStage();
      }),
  );
  document.querySelectorAll("[data-mum-rating]").forEach(
    (b) =>
      (b.onclick = () => {
        const prompts = showMumPrompts(l),
          index = Math.min(state.mumIndex[l.day] || 0, prompts.length - 1),
          rating = Number(b.dataset.mumRating),
          key = mumKey(l.day, index);
        state.mumRatings[key] = {
          rating,
          at: new Date().toISOString(),
          prompt: prompts[index].ask,
        };
        state.mumFollowups[key] = {
          rating,
          due: l.day + 1,
          lastDay: l.day,
        };
        if (!Object.keys(state.retrieval[l.day + 1] || {}).length)
          delete state.starterPlans[l.day + 1];
        state.mumIndex[l.day] = Math.min(index + 1, prompts.length);
        save();
        const resumeClock = timer.running;
        renderStage();
        if (resumeClock && $("timerToggle")) $("timerToggle").click();
      }),
  );
  document.querySelectorAll("[data-edit-mum]").forEach(
    (b) =>
      (b.onclick = () => {
        const index = Number(b.dataset.editMum),
          key = mumKey(l.day, index);
        delete state.mumRatings[key];
        delete state.mumFollowups[key];
        if (!Object.keys(state.retrieval[l.day + 1] || {}).length)
          delete state.starterPlans[l.day + 1];
        state.mumIndex[l.day] = index;
        save();
        renderStage();
      }),
  );
  const finish = $("finishLesson");
  if (finish)
    finish.onclick = () => {
      if (!stageReady(l, STAGES.length - 1)) return;
      state.stageDone[stageKey(l.day, STAGES.length - 1)] = true;
      state.completed[l.day] = true;
      state.completedDates[l.day] = new Date().toISOString();
      delete state.lastOpen[l.day];
      save();
      announce(`Day ${l.day} complete. Your next retrieval is ready.`);
      setTimeout(exitSession, 700);
    };
  bindTimer();
}
function moveStage(delta) {
  stopTimer();
  state.stage = Math.max(0, Math.min(STAGES.length - 1, state.stage + delta));
  state.lastOpen[state.selected] = state.stage;
  save();
  renderSession();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function bindTimer() {
  const toggle = $("timerToggle"),
    restart = $("timerRestart"),
    box = document.querySelector(".timerBox"),
    day = state.selected,
    timerKey = `${day}-${state.stage}`,
    duration = Number(box?.dataset.timerSeconds || 60);
  if (!toggle) return;
  timer.left = Number.isFinite(state.timerLeft[timerKey])
    ? state.timerLeft[timerKey]
    : duration;
  updateTimer();
  toggle.onclick = () => {
    timer.running = !timer.running;
    toggle.textContent = timer.running ? "Pause timer" : "Resume timer";
    if (timer.running)
      timer.id = setInterval(() => {
        timer.left--;
        state.timerLeft[timerKey] = timer.left;
        save();
        updateTimer();
        if (timer.left <= 0) {
          delete state.timerLeft[timerKey];
          save();
          stopTimer();
          announce(
            state.stage === 6
              ? "Twenty minutes complete. Finish the current answer and rating calmly."
              : state.stage === 1
                ? "Five minutes complete. Finish the current starter prompt calmly."
                : "Round complete. Rest your hands, then complete the self-check.",
          );
        }
      }, 1000);
  };
  restart.onclick = () => {
    stopTimer();
    timer.left = duration;
    state.timerLeft[timerKey] = duration;
    save();
    updateTimer();
  };
}
function updateTimer() {
  const r = $("timerReadout");
  if (r)
    r.textContent = `${Math.floor(timer.left / 60)}:${String(timer.left % 60).padStart(2, "0")}`;
}
function stopTimer() {
  if (timer.id) clearInterval(timer.id);
  timer.id = null;
  timer.running = false;
}
function moveTodayForward() {
  const fromDay = firstOpen().day;
  if (
    !confirm(
      `Move Day ${fromDay} and every unfinished lesson forward by one day? Completed lesson dates will not change.`,
    )
  )
    return;
  state.shiftEvents.push({ fromDay, count: 1, at: Date.now() });
  save();
  renderHome();
  $("undoShift").hidden = false;
  announce(
    "Unfinished lessons moved forward by one day. Undo is available below.",
  );
}
function undoShift() {
  if (!state.shiftEvents.length) return;
  state.shiftEvents.pop();
  save();
  renderHome();
  announce("The date shift was undone.");
}
$("beginBtn").onclick = () => openLesson(firstOpen().day);
$("exitBtn").onclick = exitSession;
$("printBtn").onclick = () => window.print();
$("moveDayBtn").onclick = moveTodayForward;
$("undoShift").onclick = undoShift;
$("resetBtn").onclick = () => {
  if (
    confirm(
      "Reset all BSL progress, notes and review history on this device? This cannot be undone.",
    )
  ) {
    localStorage.removeItem(KEY);
    state = fresh();
    renderHome();
    announce("Progress reset");
  }
};
window.addEventListener("beforeunload", save);
save();
renderHome();

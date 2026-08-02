const STAGES = [
  "Understand",
  "5-minute starter",
  "Learn signs",
  "Build BSL",
  "Watch & respond",
  "Review",
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
    schema: 7,
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
    knowledgeAnswers: {},
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
    deepContentMigration =
      raw && Object.keys(raw).length > 0 && Number(raw.schema || 0) < 7,
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
    "knowledgeAnswers",
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
  if (deepContentMigration) {
    const activeDay = Number(raw.selected || 1);
    s.reviewQueue = [];
    s.itemIndex = {};
    s.learnOrder = {};
    s.learnAttempts = {};
    s.itemRatings = {};
    s.retrieval = {};
    s.recallIndex = {};
    s.starterPlans = {};
    s.resourceOpened = {};
    s.knowledgeAnswers = {};
    s.stage = 0;
    if (!s.completed[activeDay]) s.lastOpen[activeDay] = 0;
    Object.keys(s.stageDone).forEach((key) => {
      const day = Number(key.split("-")[0]);
      if (!s.completed[day]) delete s.stageDone[key];
    });
    Object.keys(s.checks).forEach((key) => {
      const day = Number(key.split("-")[0]);
      if (!s.completed[day]) delete s.checks[key];
    });
    s.migrationNotice = true;
    s.migratedFrom = Number(raw.schema || 4);
  }
  s.schema = 7;
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
    "in-app BSL knowledge + two understanding checks",
    "5-minute adaptive starter",
    `learn ${l.items.length} signed ${l.items.length === 1 ? "model" : "models"} in context`,
    "build two BSL meaning sequences",
    "receptive viewing and response",
    "record, review and decide what returns",
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
  $("contentUpdate").hidden = !state.migrationNotice;
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
function knowledgeKey(day, index) {
  return `${day}-${index}`;
}
function knowledgeReady(l) {
  return (
    getCheck(l.day, 0, 0) &&
    l.knowledgeChecks.every(
      (check, index) =>
        Number(state.knowledgeAnswers[knowledgeKey(l.day, index)]) ===
        check.answer,
    )
  );
}
function evidenceLink(source) {
  return `<a class="evidenceLink" href="${esc(source.url)}" target="_blank" rel="noopener"><strong>${esc(source.label)} ↗</strong><span>${esc(source.note)}</span></a>`;
}
function orientStage(l) {
  const ready = knowledgeReady(l);
  return `<div class="stageLabel">Step 1 of 7 · Understand</div>${actionBox(
    `Learn the answer to today’s question: ${l.enquiry}`,
    "The app now teaches the language idea before asking you to retrieve or perform it. The signed form still comes from a real BSL model; the English label never stands in for the sign.",
    `Both understanding checks are correct and your face, shoulders and hands are visible.`,
  )}<section class="lessonQuestion"><p class="eyebrow">TODAY’S LANGUAGE QUESTION</p><h3>${esc(l.enquiry)}</h3><p>${esc(l.purpose)}</p></section><div class="knowledgeGrid">${l.knowledge
    .map(
      (note, index) =>
        `<article class="knowledgeCard"><span>${String(index + 1).padStart(2, "0")}</span><h4>${esc(note.title)}</h4><p>${esc(note.body)}</p><div class="knowledgeExample"><strong>See it in practice</strong><p>${esc(note.example)}</p></div><p class="misconception"><strong>Avoid:</strong> ${esc(note.avoid)}</p></article>`,
    )
    .join("")}</div><section class="conceptChecks"><div class="sectionIntro"><p class="eyebrow">CHECK THE IDEA</p><h3>Two decisions before your hands move</h3><p>Choose an answer. If it is wrong, read the explanation and try again—this is teaching, not a score.</p></div>${l.knowledgeChecks
    .map((check, checkIndex) => {
      const selected = state.knowledgeAnswers[knowledgeKey(l.day, checkIndex)],
        answered = Number.isInteger(Number(selected)),
        correct = Number(selected) === check.answer;
      return `<fieldset class="conceptCheck"><legend>${checkIndex + 1}. ${esc(check.q)}</legend><div class="answerOptions">${check.options
        .map(
          (option, optionIndex) =>
            `<button type="button" data-knowledge-check="${checkIndex}" data-knowledge-answer="${optionIndex}" class="answerOption ${Number(selected) === optionIndex ? (correct ? "correct" : "wrong") : ""}">${esc(option)}</button>`,
        )
        .join("")}</div>${answered ? `<p class="answerFeedback ${correct ? "correct" : "wrong"}"><strong>${correct ? "Yes." : "Not yet."}</strong> ${esc(check.explain)}</p>` : ""}</fieldset>`;
    })
    .join("")}</section><section class="setupCheck"><div><p class="eyebrow">PRACTICE POSITION</p><h3>Make the full language visible</h3><p>Set the device upright. Your face, shoulders, elbows and both hands should remain inside the frame without leaning away.</p></div>${checklist(["I checked the complete signing window and can see my face, shoulders and both hands."], 0)}</section><details class="evidencePanel"><summary>Evidence and learning limits</summary><p>This lesson is grounded in recognised UK BSL and Deaf-education sources. These links are for verification and deeper study; you do not need to leave the app to understand today’s teaching.</p><div>${l.evidenceSources.map(evidenceLink).join("")}</div><p class="evidenceLimit"><strong>Important:</strong> A dictionary documents signs; it does not replace sustained Deaf-led teaching, feedback or real conversation.</p></details>${helpBox(
    `Re-read only the card connected to the incorrect answer. Say the distinction in your own words, answer again, then stop. For the physical setup, move the device rather than shrinking your signing.`,
  )}${nav(
    ready,
    ready
      ? "The language idea and practice position are secure enough to begin the starter."
      : "Answer both checks correctly and confirm the full signing window.",
  )}`;
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
        `Pause for five seconds before beginning. Use each item for today’s intended meaning, not as a disconnected hand movement.`,
      lookFor: `I can see three separate meanings and a calm boundary between them. Today’s observation focus was: ${l.items[0]?.watch || l.observe}`,
      starter: `Produce ${terms.join(", ")} from memory with a clear pause between each item.`,
    },
    {
      name: "Teach the language idea",
      ask: `First tell me the answer to “${l.enquiry}” in one sentence. Then show me the contrast using BSL or visual communication.`,
      learner:
        `Use your own words for the knowledge, then demonstrate the practical example from “${l.knowledge[0].title}”.`,
      lookFor: `I can hear a clear distinction and then see an example. The key idea is: ${l.knowledge[0].body}`,
      starter: `Explain and demonstrate the Day ${l.day} idea: ${l.knowledge[0].title}.`,
    },
    {
      name: "Build a BSL meaning sequence",
      ask: `Communicate this without speaking: ${l.phrases[0].meaning}`,
      learner:
        `Use the visual plan “${l.phrases[0].build}”. Do not show Mum the gloss until after the attempt.`,
      lookFor: `I can follow the intended beginning, middle and end. Specifically: ${l.phrases[0].focus}`,
      starter: `Rebuild this meaning sequence from Day ${l.day}: ${l.phrases[0].meaning}`,
    },
    {
      name: "Receive, repair and improve",
      ask: `Show me your hardest part, then ask for or make one repair. Finish by communicating: ${l.phrases[1].meaning}`,
      learner:
        "Make one honest first attempt. Name the exact visual change, then attempt again and continue into the second meaning sequence.",
      lookFor: `The second attempt contains one visible change, and this focus is present: ${l.phrases[1].focus}`,
      starter: `Repair the hardest part of Day ${l.day}, then rebuild: ${l.phrases[1].meaning}`,
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
    term: item.prompt.name,
    source: `Mum’s check · Day ${item.day} · ${MUM_RATINGS[item.rating]}`,
    kind: "mum",
    mumKey: item.key,
    sourceDay: item.day,
    promptIndex: item.index,
    prompt: item.prompt.starter,
    clue: `Reduce the earlier display to its first meaning block. The original prompt was: ${item.prompt.ask}`,
    check: item.prompt.lookFor,
  }));
}
function starterFromItem(day, index, source) {
  const item = COURSE[day - 1]?.items[index];
  if (!item) return null;
  return {
    term: item.term,
    source,
    sourceDay: day,
    itemIndex: index,
    prompt: `Without opening a model, express “${item.term}” in this earlier context: ${item.use}`,
    clue: item.clue,
    check: `The meaning is recognisable in context. ${item.contrast}`,
    model: item.resource,
  };
}
function retrievalPrompts(l) {
  if (Array.isArray(state.starterPlans[l.day]) && state.starterPlans[l.day].length)
    return state.starterPlans[l.day];
  if (l.day === 1) {
    state.starterPlans[l.day] = FIRST_DAY_STARTER;
    save();
    return FIRST_DAY_STARTER;
  }
  const mum = adaptiveMumPrompts(l);
  const due = state.reviewQueue
    .filter((q) => q.day < l.day && q.rating < 2)
    .sort((a, b) => (a.due || 0) - (b.due || 0))
    .slice(0, 3)
    .map((q) => starterFromItem(q.day, q.index, `Review due · Day ${q.day}`))
    .filter(Boolean);
  const prev =
    l.day > 1
      ? COURSE[l.day - 2].items
          .slice(0, 2)
          .map((x, index) =>
            starterFromItem(l.day - 1, index, `Yesterday · Day ${l.day - 1}`),
          )
          .filter(Boolean)
      : [];
  const foundation =
    l.day > 4
      ? l.day % 2
        ? [
            {
              term: "Your name",
              source: "Older foundation · fingerspelling",
              kind: "foundation",
              prompt:
                "Fingerspell your full first name once at a pace another beginner could follow.",
              clue:
                "Hold the first letter, then think in one whole-word rhythm instead of isolated letter names.",
              check:
                "One dominant hand stays consistent and the full word occupies a stable signing window.",
            },
          ]
        : [starterFromItem(1, 0, "Older foundation · Day 1")].filter(Boolean)
      : [];
  const unique = [];
  [...mum, ...due, ...prev, ...foundation].forEach((x) => {
    if (x.term && !unique.some((y) => y.term === x.term)) unique.push(x);
  });
  const plan = (
    unique.length ? unique : FIRST_DAY_STARTER
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
  return `<div class="stageLabel">Step 2 of 7 · Adaptive starter</div>${actionBox(
    `Attempt ${prompts.length} previously taught actions. Read the complete context before moving your hands.`,
    "Retrieval should begin from meaning, not a floating English label. Day 1 practises the visual foundations instead of pretending untaught signs can be recalled.",
    `You have honestly attempted all ${prompts.length} prompts. Correct answers are not required.`,
  )}${timerWidget(
    "FIVE-MINUTE STARTER",
    300,
    "Read the complete scenario, wait five quiet seconds, attempt it, rate it, then move on. Finish the current prompt when time ends.",
  )}<section class="starterCard"><div class="starterMeta"><span>${esc(p.source)}</span><span>Prompt ${idx + 1} of ${prompts.length}</span></div><p class="starterTerm">${esc(p.term)}</p><h3>${esc(p.prompt || `Produce “${p.term}” in a meaningful context.`)}</h3><div class="starterReady"><strong>Judge this—not confidence</strong><p>${esc(p.check || "The meaning is visible without spoken English carrying it.")}</p></div><button class="miniBtn" id="showRetrievalClue" type="button">I need one precise clue</button><div id="retrievalClue" class="retrievalClue" hidden><strong>Use this, then attempt once</strong><p>${esc(p.clue || "Rebuild the first meaning block, pause, then add one piece.")}</p>${p.model ? `<a class="miniBtn" data-resource="starter-model" href="${esc(p.model.url)}" target="_blank" rel="noopener">Reopen the exact signed model ↗</a>` : ""}</div></section><div class="ratingRow starterRatings"><button class="btn good" data-retrieval="2">Clear from memory</button><button class="btn warn" data-retrieval="1">Meaning clear, form hesitant</button><button class="btn secondary" data-retrieval="0">Could not retrieve it</button></div>${helpBox(
    "Wait five seconds. Use the precise clue once. If the sign still does not return, choose ‘Could not retrieve it’; that honest result schedules useful review.",
  )}${nav(
    done,
    done
      ? "Starter complete. The next review plan has already adapted."
      : `${Object.keys(results).length} of ${prompts.length} starter prompts attempted.`,
  )}`;
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
    return `<div class="stageLabel">Step 3 of 7 · Learn signed models</div>${actionBox(
      "Read the learning record, then move into BSL structure.",
      "Every sign was linked to an exact signed model, a contextual meaning and a specific observation target. Weak forms are already scheduled to return.",
      "Every model has an honest production result.",
    )}<div class="summaryList learningSummary">${l.items
      .map(
        (x, i) =>
          `<div><span><strong>${esc(x.term)}</strong><small>${esc(x.meaning)}</small></span><em>${esc(RATINGS[state.itemRatings[itemKey(l.day, i)]] || "Attempted")}</em></div>`,
      )
      .join("")}</div><div class="nextTeaching"><p class="eyebrow">NEXT: LANGUAGE, NOT A LIST</p><h3>You will now combine these forms into two visual meaning sequences.</h3><p>A sign remembered in isolation is not yet communicative BSL.</p></div>${helpBox(l.stuck)}${nav(true, "Signed-model cycle complete. Continue to Build BSL.")}`;
  return `<div class="stageLabel">Step 3 of 7 · Learn signed models</div>${actionBox(
    `Learn the BSL model for “${item.term}” in today’s exact meaning.`,
    "The written label only identifies the intended sense. The recorded BSL model supplies the form; the app teaches you how to observe, retrieve and use it.",
    "The model is closed, the sign has been recalled in context, and one honest result is recorded.",
  )}<div class="itemProgress"><span>Signed model ${pos + 1} of ${order.length}</span><progress value="${pos}" max="${order.length}" aria-label="Signed model ${pos + 1} of ${order.length}"></progress></div><section class="signTutor"><div class="signIdentity"><p class="eyebrow">ENGLISH ROUTE LABEL</p><h3>${esc(item.term)}</h3><p><strong>Meaning in this lesson:</strong> ${esc(item.meaning)}</p></div><div class="signContext"><div><strong>Use it for meaning</strong><p>${esc(item.use)}</p></div><div><strong>Do not confuse the task</strong><p>${esc(item.contrast)}</p></div></div></section><div class="learningSequence deep"><section><span>01</span><div><strong>Watch the whole model twice</strong><p>First viewing: do not move. Second viewing: ${esc(item.watch)}</p></div></section><section><span>02</span><div><strong>Rebuild one component</strong><p>${esc(item.clue)} Do only that piece once before copying the whole sign.</p></div></section><section><span>03</span><div><strong>Copy, pause, compare</strong><p>Copy slowly three times. Reopen the model and compare handshape, orientation, location, movement and the relevant non-manual feature.</p></div></section><section><span>04</span><div><strong>Close, wait, communicate</strong><p>Close the model. Wait five seconds. Produce the sign inside today’s context; do not merely repeat the English label.</p></div></section></div>${resourceCard(item.resource, 0)}${opened ? `<p class="modelReturn"><strong>Now keep the page closed.</strong> Complete the recall and context use before choosing a result.</p>` : `<p class="gateMessage">Open this exact model before rating. The app will not pretend a written description can replace signed input.</p>`}<div class="ratingRow"><button class="btn good" data-item-rating="2" ${opened ? "" : "disabled"}>Form and meaning clear from memory</button><button class="btn warn" data-item-rating="1" ${opened ? "" : "disabled"}>Meaning clear, form hesitant</button><button class="btn secondary" data-item-rating="0" ${opened ? "" : "disabled"}>Need the model again</button></div>${helpBox(
    `Use only this recovery: ${item.clue} Reopen the model once, close it, and reproduce the first component before rebuilding the full sign.`,
  )}${nav(false, `Complete the observe–rebuild–compare–recall cycle for “${item.term}”.`)}`;
}
function timerWidget(label, seconds, instruction) {
  return `<section class="timerBox" data-timer-seconds="${seconds}"><div><p class="eyebrow">${esc(label)}</p><strong id="timerReadout">${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}</strong><p>${esc(instruction)}</p></div><div><button class="miniBtn" id="timerToggle" type="button">Start timer</button><button class="miniBtn" id="timerRestart" type="button">Restart</button></div></section>`;
}
function practiseStage(l) {
  const items = [
      `Build “${l.phrases[0].meaning}” in meaning blocks, then remove the written gloss and produce it once from memory.`,
      `Build “${l.phrases[1].meaning}” in meaning blocks, then change one real detail without returning to English word-by-word order.`,
      "Record both sequences or use a mirror. Check that time, people, topic, facial grammar and pauses are visible without spoken English carrying the message.",
    ],
    ready = items.every((_, i) => getCheck(l.day, 3, i));
  return `<div class="stageLabel">Step 4 of 7 · Build BSL</div>${actionBox(
    "Build both visual meaning sequences, then change one detail without rebuilding them from English.",
    "Vocabulary becomes language when meaning, order, space, gaze, face and turn-taking are organised together.",
    "Both sequences work without the planning gloss and the silent review shows their structure.",
  )}<div class="glossNotice"><strong>Planning gloss is not a translation.</strong><p>Upper-case gloss labels help you remember a sequence. They do not capture the full BSL, its non-manual features or all valid ordering.</p></div><div class="phraseGrid">${l.phrases
    .map(
      (phrase, index) =>
        `<article class="phraseCard"><p class="eyebrow">MEANING SEQUENCE ${index + 1}</p><h3>${esc(phrase.meaning)}</h3><details><summary>Reveal the temporary planning gloss</summary><code>${esc(phrase.gloss)}</code></details><div><strong>Build it</strong><p>${esc(phrase.build)}</p></div><div><strong>Watch for</strong><p>${esc(phrase.focus)}</p></div></article>`,
    )
    .join("")}</div>${timerWidget(
    "OPTIONAL THREE-MINUTE BUILD",
    180,
    "Build sequence 1, rest your hands, build sequence 2, then repeat the weaker one without the gloss.",
  )}${checklist(items, 3)}<div class="reviewPanel"><p class="eyebrow">LANGUAGE ERRORS TO CATCH</p><ul>${l.errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>${helpBox(
    `Reduce the sequence to two meaning blocks. Use the ‘Build it’ line, not the English sentence, then add only one block at a time. ${l.stuck}`,
  )}${nav(
    ready,
    ready
      ? "Both meaning sequences were built and reviewed."
      : `Complete ${items.filter((_, i) => !getCheck(l.day, 3, i)).length} BSL-building action(s).`,
  )}`;
}
function useStage(l) {
  const lab = l.receptionLab;
  const items = [
      lab.setup,
      `Complete the three viewing passes in order: ${lab.passes.join(" ")}`,
      `Create the evidence: ${lab.evidence} Then respond with today’s communication challenge: ${l.use}`,
    ],
    ready = items.every((_, i) => getCheck(l.day, 4, i));
  return `<div class="stageLabel">Step 5 of 7 · Watch & respond</div>${actionBox(
    lab.setup,
    "Reception is a separate BSL skill. Written English prompts can test production, but only signed input can test whether you recognise signed language.",
    lab.evidence,
  )}<section class="receptionLab"><div class="receptionHead"><span aria-hidden="true">◉</span><div><p class="eyebrow">RECEPTIVE LAB</p><h3>${esc(lab.title)}</h3></div></div><ol>${lab.passes.map((pass) => `<li>${esc(pass)}</li>`).join("")}</ol><div class="receptionEvidence"><strong>Evidence to create</strong><p>${esc(lab.evidence)}</p></div><div class="receptionSources"><p class="eyebrow">SIGNED INPUT OPTIONS</p>${l.items
    .slice(0, 2)
    .map(
      (item) =>
        `<a href="${esc(item.resource.url)}" target="_blank" rel="noopener">Signed model: ${esc(item.term)} ↗</a>`,
    )
    .join("")}${l.evidenceSources
    .slice(0, 1)
    .map((source) => `<a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.label)} ↗</a>`)
    .join("")}</div><p class="receptionTruth"><strong>What does not count:</strong> looking at “${esc(l.items[0]?.term || "the English label")}” and producing the sign. That is production recall, not BSL reception.</p></section>${checklist(items, 4)}<section class="communicationReply"><p class="eyebrow">RESPOND WITH MEANING</p><h3>${esc(l.use)}</h3><p>${esc(l.review)}</p></section><div class="schoolBox"><p class="eyebrow">USE THIS IN SCHOOL — OPTIONAL</p><p>${esc(l.school)}</p><small>Remain clear that you are a learner. Continue through Deaf-led teaching and real interaction.</small></div>${helpBox(
    `If natural signed input feels too fast, do not replace it with English. Watch once for gist, choose one missing detail, then replay only for that detail or use a specific repair request.`,
  )}${nav(
    ready,
    ready
      ? "Signed input was watched, interpreted and answered."
      : `Complete ${items.filter((_, i) => !getCheck(l.day, 4, i)).length} receptive action(s).`,
  )}`;
}
function closeStage(l) {
  const note = state.notes[l.day] || "",
    conf = state.confidence[l.day],
    reviewItems = [
      l.drill,
      "Record one uninterrupted attempt or use a mirror. Watch once with sound muted so spoken English cannot hide missing visual information.",
      l.review,
    ],
    practiceReady = reviewItems.every((_, i) => getCheck(l.day, 5, i)),
    ready = practiceReady && note.trim().length >= 20 && !!conf;
  return `<div class="stageLabel">Step 6 of 7 · Review</div>${actionBox(
    l.drill,
    "The final self-review turns today’s knowledge into visible performance evidence before Mum sees it.",
    l.mastery,
  )}${timerWidget(
    "ONE-MINUTE INTEGRATION",
    60,
    "Complete the full drill without restarting. If a form disappears, pause and use repair; continuity matters more than pretending perfection.",
  )}${checklist(reviewItems, 5)}<div class="masteryBox"><p class="eyebrow">TODAY’S MASTERY DECISION</p><p>${esc(l.mastery)}</p><p><strong>Reflect on:</strong> ${esc(l.reflect)}</p></div><div class="reviewPanel"><p class="eyebrow">CHECK THE RECORDING, NOT THE FEELING</p><ul>${l.errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div><label class="fieldLabel" for="notes">Write one visible success and one exact item to bring back</label><textarea id="notes" placeholder="Visible today…\nBring back tomorrow…">${esc(note)}</textarea><div class="confidence"><button data-confidence="1" class="${conf === 1 ? "active" : ""}">Needs a model</button><button data-confidence="2" class="${conf === 2 ? "active" : ""}">Meaning clear, form hesitant</button><button data-confidence="3" class="${conf === 3 ? "active" : ""}">Clear from memory today</button></div><div class="previewBox"><p class="eyebrow">AFTER SHOW MUM</p><p>${esc(l.preview)}</p></div>${helpBox(
    `Do one reduced attempt: ${l.stuck} Then record the honest confidence level; you are not required to claim mastery.`,
  )}${nav(
    ready,
    ready
      ? "Practice evidence and reflection are saved. Continue to Show Mum."
      : "Complete the three review actions, write at least 20 characters and choose one confidence level.",
  )}`;
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
  if (stage === 0) return knowledgeReady(l);
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
      [0, 1, 2].every((i) => getCheck(l.day, 5, i)) &&
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
  document.querySelectorAll("[data-knowledge-answer]").forEach(
    (button) =>
      (button.onclick = () => {
        const checkIndex = Number(button.dataset.knowledgeCheck),
          answerIndex = Number(button.dataset.knowledgeAnswer);
        state.knowledgeAnswers[knowledgeKey(l.day, checkIndex)] = answerIndex;
        save();
        renderStage();
      }),
  );
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
          ? "Practice evidence and reflection are saved. Continue to Show Mum."
          : "Complete the review actions, write at least 20 characters and choose one confidence level.";
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
$("dismissUpdate").onclick = () => {
  state.migrationNotice = false;
  save();
  $("contentUpdate").hidden = true;
};
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

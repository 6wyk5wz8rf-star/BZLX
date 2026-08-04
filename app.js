const CONTENT_VERSION = "classroom-readiness-36-v1";
const SESSION_BLOCKS = [
  { id: "arrive", label: "Arrive", minutes: 5, purpose: "Reorient and see today’s classroom mission" },
  { id: "retrieval", label: "Retrieval starter", minutes: 15, purpose: "Retrieve before seeing a model", adaptiveMinutes: 5 },
  { id: "new-a", label: "New learning A", minutes: 25, purpose: "Understand one small language idea" },
  { id: "guided-production", label: "Guided production", minutes: 20, purpose: "Watch, notice, produce and compare" },
  { id: "break-1", label: "Break", minutes: 10, purpose: "Rest eyes, hands and attention", kind: "break" },
  { id: "new-b", label: "New learning B", minutes: 25, purpose: "Build meaning from verified forms" },
  { id: "classroom-application", label: "Classroom application", minutes: 25, purpose: "Receive, respond and use the learning" },
  { id: "break-2", label: "Break", minutes: 10, purpose: "Reset before mixed practice", kind: "break" },
  { id: "mixed-retrieval", label: "Mixed retrieval", minutes: 20, purpose: "Interleave, record and review evidence" },
  { id: "mum-review", label: "Mum Review", minutes: 20, purpose: "Show learning to a live practice partner" },
  { id: "close", label: "Close", minutes: 5, purpose: "Save evidence and preview tomorrow" },
];
const STAGES = SESSION_BLOCKS.map((block) => block.label);
const RATINGS = {
  0: "Needs another model",
  1: "Correct but hesitant",
  2: "Clear from memory",
};
const MUM_RATINGS = {
  0: "Not yet",
  1: "Needed a cue",
  2: "Independent",
  3: "Comfortable in context",
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
    schema: 8,
    contentVersion: CONTENT_VERSION,
    selected: 1,
    stage: 0,
    currentBlockId: SESSION_BLOCKS[0].id,
    completed: {},
    completedDates: {},
    stageDone: {},
    checks: {},
    notes: {},
    confidence: {},
    lastOpen: {},
    lastBlock: {},
    itemIndex: {},
    learnOrder: {},
    learnAttempts: {},
    itemRatings: {},
    retrieval: {},
    recallIndex: {},
    starterPlans: {},
    starterPlanVersions: {},
    mumRatings: {},
    mumIndex: {},
    mumFollowups: {},
    knowledgeAnswers: {},
    reviewQueue: [],
    resourceOpened: {},
    modelViewed: {},
    timerLeft: {},
    timerWarnings: {},
    shiftEvents: [],
    legacySkips: 0,
    schoolVariantNote: "",
    legacyV7: null,
  };
}
function mergeState(raw) {
  const base = fresh(),
    hasSavedState = raw && Object.keys(raw).length > 0,
    oldSchema = Number(raw?.schema || 4),
    s = { ...base, ...(raw || {}) };
  for (const k of [
    "completed",
    "completedDates",
    "stageDone",
    "checks",
    "notes",
    "confidence",
    "lastOpen",
    "lastBlock",
    "itemIndex",
    "learnOrder",
    "learnAttempts",
    "itemRatings",
    "retrieval",
    "recallIndex",
    "starterPlans",
    "starterPlanVersions",
    "mumRatings",
    "mumIndex",
    "mumFollowups",
    "knowledgeAnswers",
    "resourceOpened",
    "modelViewed",
    "timerLeft",
    "timerWarnings",
  ])
    s[k] = { ...(raw?.[k] || {}) };
  s.reviewQueue = Array.isArray(raw?.reviewQueue) ? raw.reviewQueue : [];
  s.shiftEvents = Array.isArray(raw?.shiftEvents) ? raw.shiftEvents : [];
  if (hasSavedState && oldSchema < 5) {
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
  if (hasSavedState && oldSchema < 7) {
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
    s.migratedFrom = oldSchema;
  }
  if (hasSavedState && oldSchema < 8) {
    const priorCompleted = { ...(s.completed || {}) },
      priorDates = { ...(s.completedDates || {}) };
    s.legacyV7 = {
      schema: oldSchema,
      archivedAt: new Date().toISOString(),
      completed: priorCompleted,
      completedDates: priorDates,
      notes: { ...(s.notes || {}) },
      confidence: { ...(s.confidence || {}) },
      itemRatings: { ...(s.itemRatings || {}) },
      mumRatings: { ...(s.mumRatings || {}) },
      reviewQueue: [...(s.reviewQueue || [])],
    };
    /* The 35-day release and this reconstruction do not have equivalent day
     * identities. Preserve every prior record in the readable archive, but do
     * not falsely complete a new three-hour classroom-readiness day from a
     * shorter or semantically different legacy lesson. */
    s.completed = {};
    s.completedDates = {};
    for (const key of [
      "stageDone",
      "checks",
      "notes",
      "confidence",
      "lastOpen",
      "lastBlock",
      "itemIndex",
      "learnOrder",
      "learnAttempts",
      "itemRatings",
      "retrieval",
      "recallIndex",
      "starterPlans",
      "starterPlanVersions",
      "mumRatings",
      "mumIndex",
      "mumFollowups",
      "knowledgeAnswers",
      "resourceOpened",
      "modelViewed",
      "timerLeft",
      "timerWarnings",
    ])
      s[key] = {};
    s.reviewQueue = [];
    s.stage = 0;
    s.selected = 1;
    s.migrationNotice = true;
    s.migratedFrom = oldSchema;
  }
  s.schema = 8;
  s.contentVersion = CONTENT_VERSION;
  s.selected = Math.max(1, Math.min(COURSE.length, Number(s.selected) || 1));
  const selectedLessonId = COURSE[s.selected - 1]?.id,
    stableBlock = s.lastBlock?.[selectedLessonId] || s.currentBlockId,
    stableStage = SESSION_BLOCKS.findIndex((block) => block.id === stableBlock);
  s.stage = stableStage >= 0
    ? stableStage
    : Math.max(0, Math.min(STAGES.length - 1, Number(s.stage) || 0));
  s.currentBlockId = SESSION_BLOCKS[s.stage].id;
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
  timer = {
    left: SESSION_BLOCKS[0].minutes * 60,
    running: false,
    id: null,
    key: null,
    lastPersist: 0,
  };
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
  return `${COURSE[day - 1]?.id || `day-${day}`}:${SESSION_BLOCKS[stage]?.id || stage}`;
}
function checkKey(day, stage, item) {
  return `${stageKey(day, stage)}:check-${item}`;
}
function itemKey(day, index) {
  return COURSE[day - 1]?.items[index]?.id || `${COURSE[day - 1]?.id || `day-${day}`}:item-${index}`;
}
function blockTimerKey(day, stage) {
  return stageKey(day, stage);
}
function resourceKey(day, resource) {
  return `${COURSE[day - 1]?.id || `day-${day}`}:model:${resource.url}`;
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
  if (state.completedDates[day]) {
    const completed = new Date(state.completedDates[day]);
    if (!Number.isNaN(completed.getTime())) return completed;
  }
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
  const stable = state.lastBlock[COURSE[day - 1]?.id],
    stableIndex = SESSION_BLOCKS.findIndex((block) => block.id === stable);
  if (stableIndex >= 0) return stableIndex;
  const saved = Number(state.lastOpen[day]);
  if (Number.isInteger(saved) && saved >= 0 && saved < STAGES.length)
    return saved;
  for (let i = 0; i < STAGES.length; i++)
    if (!stageIsDone(day, i)) return i;
  return STAGES.length - 1;
}
function savedPosition(l) {
  const s = resumeStage(l.day);
  if (s === 3) {
    const order = learnOrder(l),
      p = state.itemIndex[l.day] || 0;
    return `${STAGES[s]}, sign ${Math.min(p + 1, order.length)} of ${order.length}`;
  }
  if (s === 1) {
    const prompts = retrievalPrompts(l),
      p = state.recallIndex[l.day] || 0;
    return `${STAGES[s]}, prompt ${Math.min(p + 1, prompts.length)} of ${prompts.length}`;
  }
  if (s === 9) {
    const prompts = showMumPrompts(l),
      p = state.mumIndex[l.day] || 0;
    return `${STAGES[s]}, prompt ${Math.min(p + 1, prompts.length)} of ${prompts.length}`;
  }
  return STAGES[s];
}
function formatMinutes(minutes) {
  const safe = Math.max(0, Math.round(minutes));
  if (safe >= 60) {
    const hours = Math.floor(safe / 60),
      rest = safe % 60;
    return `${hours} hr${hours === 1 ? "" : "s"}${rest ? ` ${rest} min` : ""}`;
  }
  return `${safe} min`;
}
function remainingSessionMinutes(day, stage = resumeStage(day)) {
  return SESSION_BLOCKS.slice(stage).reduce((total, block, offset) => {
    if (offset > 0) return total + block.minutes;
    const key = blockTimerKey(day, stage),
      saved = Number(state.timerLeft[key]);
    return total + (Number.isFinite(saved) ? Math.ceil(saved / 60) : block.minutes);
  }, 0);
}
function nextBreakFrom(stage) {
  const next = SESSION_BLOCKS.findIndex(
    (block, index) => index >= stage && block.kind === "break",
  );
  if (next < 0) return null;
  const minutes = SESSION_BLOCKS.slice(stage, next).reduce(
    (sum, block) => sum + block.minutes,
    0,
  );
  return { index: next, minutes };
}
function lessonPath(l) {
  return [
    "Arrive and retrieve earlier learning",
    `Understand today’s idea and study ${l.items.length} verified signed ${l.items.length === 1 ? "model" : "models"}`,
    "10-minute break",
    "Build meaning and use it in a classroom situation",
    "10-minute break",
    "Mixed retrieval and evidence review",
    "20-minute Mum Review, then a calm close",
  ];
}
function renderHome() {
  const n = firstOpen(),
    done = COURSE.filter((l) => state.completed[l.day]).length,
    position = savedPosition(n),
    complete = done === COURSE.length,
    currentStage = resumeStage(n.day),
    nextBreak = nextBreakFrom(currentStage);
  $("homePhase").textContent = n.phase;
  $("homeTitle").textContent = complete
    ? "Your 36-day intensive is complete"
    : n.title;
  $("homeFocus").textContent = complete
    ? "You are still a beginner, with a useful classroom foundation and a clear responsibility to keep learning."
    : n.purpose;
  $("homeDay").textContent = `Day ${n.day} of ${COURSE.length}`;
  $("homeDate").textContent = fmt(effectiveDate(n.day));
  $("homeTime").textContent = complete
    ? "Continuation plan ready"
    : `${formatMinutes(remainingSessionMinutes(n.day, currentStage))} remaining · planned after 1:00 pm`;
  $("homeSaved").textContent =
    state.lastOpen[n.day] !== undefined
      ? `Saved at ${position}`
      : complete
        ? "All evidence saved on this device"
        : "Not started";
  $("homeOutcome").textContent = complete
    ? "Continue through Deaf-led or qualified teaching, real interaction and the saved 30-day plan."
    : n.mastery;
  $("todayPath").innerHTML = lessonPath(n)
    .map((x) => `<li>${esc(x)}</li>`)
    .join("");
  $("homeNextBreak").textContent = complete
    ? "Return to Day 36 whenever you want to review the continuation plan."
    : nextBreak
      ? `Next break in about ${formatMinutes(nextBreak.minutes)}.`
      : "No further break today; the next step is a five-minute close.";
  $("doneCount").textContent = done;
  $("remainCount").textContent = COURSE.length - done;
  $("progressBar").style.width = `${Math.round((done / COURSE.length) * 100)}%`;
  $("progressBar").parentElement.setAttribute(
    "aria-label",
    `${done} of ${COURSE.length} lessons complete`,
  );
  $("progressBar").parentElement.setAttribute("aria-valuenow", String(done));
  $("beginBtn").textContent =
    complete
      ? "Open Day 36 continuation plan"
      : state.lastOpen[n.day] !== undefined
      ? `Continue Day ${n.day}: ${position}`
      : `Start Day ${n.day}`;
  $("moveDayBtn").disabled = complete;
  $("moveDayBtn").title = complete
    ? "All 36 learning days are complete."
    : "Move the current unfinished lesson and later dates forward.";
  $("contentUpdate").hidden = !state.migrationNotice;
  renderCourseMap();
  renderReviewSummary();
  renderProgress();
}

function renderProgress() {
  const itemValues = Object.values(state.itemRatings).map(Number),
    mumValues = Object.values(state.mumRatings).map((value) =>
      Number(typeof value === "object" ? value.rating : value),
    ),
    independent = itemValues.filter((value) => value >= 2).length,
    fragile = itemValues.filter((value) => value < 2).length,
    contextual = mumValues.filter((value) => value >= 3).length,
    repairEvidence = Object.keys(state.mumFollowups).length;
  $("abilitySummary").innerHTML = [
    ["Signed forms produced independently", independent],
    ["Forms still needing a cue or model", fragile],
    ["Mum prompts comfortable in context", contextual],
    ["Live partner prompts attempted", mumValues.length],
    ["Repair/context evidence scheduled", repairEvidence],
  ]
    .map(([label, value]) => `<div class="abilityRow"><span>${esc(label)}</span><strong>${value}</strong></div>`)
    .join("");
  const due = state.reviewQueue
    .filter((item) => item.rating < 2)
    .slice(0, 6)
    .map((item) => COURSE[item.day - 1]?.items[item.index]?.term)
    .filter(Boolean);
  $("dueReviewList").innerHTML = due.length
    ? due.map((term) => `<span class="reviewChip">${esc(term)}</span>`).join("")
    : '<p class="quiet">Nothing is due yet. Fragile learning will appear after an honest attempt.</p>';
  const next = firstOpen(),
    phaseEnd = Math.min(36, Math.ceil(next.day / 6) * 6);
  $("nextMilestone").innerHTML = `<strong>Day ${phaseEnd}</strong><p>${esc(COURSE[phaseEnd - 1].title)}</p><small>${phaseEnd - next.day} learning day${phaseEnd - next.day === 1 ? "" : "s"} before this integration point.</small>`;
  $("schoolVariantNote").value = state.schoolVariantNote || "";
  const archived = state.legacyV7
    ? Object.keys(state.legacyV7.completed || {}).filter(
        (day) => state.legacyV7.completed[day],
      ).length
    : 0;
  const archivedNotes = state.legacyV7
      ? Object.values(state.legacyV7.notes || {}).filter((note) => String(note).trim()).length
      : 0,
    archivedRatings = state.legacyV7
      ? Object.keys(state.legacyV7.itemRatings || {}).length + Object.keys(state.legacyV7.mumRatings || {}).length
      : 0,
    hasArchive = archived + archivedNotes + archivedRatings > 0;
  $("legacyEvidence").hidden = !hasArchive;
  if (hasArchive) {
    const completedDays = Object.keys(state.legacyV7.completed || {})
        .filter((day) => state.legacyV7.completed[day])
        .map(Number)
        .sort((a, b) => a - b),
      notes = Object.entries(state.legacyV7.notes || {})
        .filter(([, note]) => String(note).trim())
        .slice(0, 12);
    $("legacyEvidence").innerHTML = `<details><summary>Earlier-course evidence preserved</summary><p>${archived} completion record${archived === 1 ? "" : "s"}, ${archivedNotes} note${archivedNotes === 1 ? "" : "s"} and ${archivedRatings} practice rating${archivedRatings === 1 ? "" : "s"} remain in this archive.</p><p>Earlier completed days: ${completedDays.map((day) => `Day ${day}`).join(", ") || "none recorded"}. These remain historical evidence and are not used to falsely complete the rebuilt course.</p>${notes.length ? `<div class="legacyNotes"><strong>Preserved notes</strong>${notes.map(([day, note]) => `<p><b>Day ${esc(day)}:</b> ${esc(note)}</p>`).join("")}</div>` : ""}</details>`;
  }
}

function showHomeView(name, updateHistory = false) {
  const safe = ["today", "course", "progress"].includes(name) ? name : "today";
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    const active = panel.dataset.viewPanel === safe;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === safe;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (updateHistory)
    history.pushState({ view: safe }, "", `#${safe}`);
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
function calmScrollTop() {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}
function openLesson(day, updateHistory = true, forcedStage = null) {
  stopTimer();
  state.selected = day;
  state.stage = Number.isInteger(forcedStage) ? forcedStage : resumeStage(day);
  state.lastOpen[day] = state.stage;
  state.currentBlockId = SESSION_BLOCKS[state.stage].id;
  state.lastBlock[COURSE[day - 1].id] = state.currentBlockId;
  save();
  $("home").classList.add("hidden");
  $("session").classList.add("active");
  $("primaryNav").hidden = true;
  document.body.classList.add("lessonOpen");
  renderSession();
  if (updateHistory)
    history.pushState({ lesson: day }, "", `#day-${day}`);
  calmScrollTop();
}
function exitSession(updateHistory = true) {
  stopTimer();
  $("session").classList.remove("active");
  $("home").classList.remove("hidden");
  $("primaryNav").hidden = false;
  document.body.classList.remove("lessonOpen");
  save();
  renderHome();
  showHomeView("today");
  if (updateHistory)
    history.pushState({ view: "today" }, "", "#today");
  calmScrollTop();
}
function renderSession() {
  const l = lesson();
  $("sessionPhase").textContent =
    `${l.phase} · Day ${l.day} of ${COURSE.length} · ${fmt(effectiveDate(l.day))}`;
  $("sessionTitle").textContent = l.title;
  $("sessionFocus").textContent = l.purpose;
  $("sessionStepCount").textContent = `Block ${state.stage + 1} of ${STAGES.length}`;
  $("sessionTime").textContent = `${formatMinutes(remainingSessionMinutes(l.day, state.stage))} remaining`;
  const nextBreak = nextBreakFrom(state.stage);
  $("sessionNextBreak").textContent = nextBreak
    ? `Break in about ${formatMinutes(nextBreak.minutes)}`
    : "Final stretch";
  renderRail();
  renderStage();
}
function renderRail() {
  $("stageRail").innerHTML = STAGES.map(
    (s, i) =>
      `<button type="button" class="stageDot ${i === state.stage ? "active" : stageIsDone(state.selected, i) ? "done" : ""} ${Math.abs(i - state.stage) <= 1 ? "near" : ""}" data-stage="${i}" ${i > state.stage && !stageIsDone(state.selected, i - 1) ? "disabled" : ""} aria-current="${i === state.stage ? "step" : "false"}"><span>${i + 1}</span><strong>${esc(s)}</strong><small>${SESSION_BLOCKS[i].minutes} min</small></button>`,
  ).join("");
  document.querySelectorAll("[data-stage]").forEach(
    (b) =>
      (b.onclick = () => {
        state.stage = Number(b.dataset.stage);
        state.lastOpen[state.selected] = state.stage;
        state.currentBlockId = SESSION_BLOCKS[state.stage].id;
        state.lastBlock[lesson().id] = state.currentBlockId;
        save();
        renderSession();
        calmScrollTop();
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
  const key = resourceKey(state.selected, r),
    opened = !!state.resourceOpened[key];
  return `<article class="resourceCard"><div><p class="eyebrow">${esc(r.source)} · INTERNET REQUIRED</p><h4>${esc(r.label)}</h4><p><strong>Why open it:</strong> ${esc(r.purpose)}</p><p><strong>Watch for:</strong> ${esc(r.watch)}</p><details class="modelIntegrity"><summary>Model source and limits</summary><p>${esc(r.limitation || "Use this source for the stated learning task only.")}</p><p><strong>Variation:</strong> ${esc(r.variation || "A different documented variant may also be valid.")}</p><small>Release checked ${esc(r.verifiedOn || "for this course")}; external link only. If it does not load, return here and use Reopen when connected. This action will remain unfinished.</small></details></div><a class="resourceLink" data-resource="${index}" data-resource-key="${esc(key)}" href="${esc(r.url)}" target="_blank" rel="noopener">${opened ? "Reopen" : "Open"} ${esc(r.label)} ↗</a>${opened ? `<div class="returnCue"><strong>When you return</strong><p>${esc(r.returnCue)}</p></div>` : ""}</article>`;
}
function nav(ready, message, last = false) {
  return `<div class="stageNav"><div><button class="btn secondary" id="backStage" type="button" ${state.stage === 0 ? "disabled" : ""}>Back</button><button class="btn ghost" id="saveExit" type="button">Save and leave</button></div><div>${last ? `<button class="btn good" id="finishLesson" type="button" ${ready ? "" : "disabled"}>Finish Day ${state.selected}</button>` : `<button class="btn" id="nextStage" type="button" ${ready ? "" : "disabled"}>Continue to ${STAGES[state.stage + 1]}</button>`}</div></div><p class="gateMessage" role="status">${esc(message)}</p>`;
}
function knowledgeKey(day, index) {
  return `${COURSE[day - 1]?.id || `day-${day}`}:knowledge-${index}`;
}
function knowledgeReady(l) {
  return (
    getCheck(l.day, 2, 0) &&
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
function arriveStage(l) {
  const checks = [
      `I can state today’s practical classroom outcome: ${l.purpose}`,
      "I will stay inside beginner limits and use the child’s agreed support for high-stakes or unclear communication.",
    ],
    ready = checks.every((_, index) => getCheck(l.day, 0, index)),
    previous = l.day > 1 ? COURSE[l.day - 2] : null;
  return `<div class="stageLabel">Block 1 of 11 · Arrive · 5 min</div>${actionBox(
    "Read today’s mission once, prepare the signing space and begin without planning the whole session.",
    "A calm arrival protects attention. The course carries the sequence; your job is only the current meaningful action.",
    "The classroom mission and professional boundary are both clear.",
  )}<section class="arrivalMission"><p class="eyebrow">TODAY’S CLASSROOM MISSION</p><h3>${esc(l.title)}</h3><p>${esc(l.purpose)}</p><div class="missionBoundary"><strong>Remain an honest beginner</strong><p>${esc(l.culture)}</p></div></section>${previous ? `<section class="previousThread"><p class="eyebrow">ONE THREAD FROM YESTERDAY</p><p>${esc(previous.preview)}</p></section>` : `<section class="previousThread"><p class="eyebrow">DAY 1 BASELINE</p><p>Notice what you can recognise, produce and repair today. Day 36 will compare visible evidence—not confidence or time spent.</p></section>`}${checklist(checks, 0)}${helpBox(
    "Reduce the arrival to one decision: place the device, read the mission aloud once, and choose Begin. You do not need to feel ready for all three hours.",
  )}${nav(
    ready,
    ready
      ? "Mission clear. Begin the adaptive retrieval block."
      : "Confirm the mission and beginner boundary before continuing.",
  )}`;
}

function orientStage(l) {
  const ready = knowledgeReady(l);
  return `<div class="stageLabel">Block 3 of 11 · New learning A · 25 min</div>${actionBox(
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
    .join("")}</section><section class="setupCheck"><div><p class="eyebrow">PRACTICE POSITION</p><h3>Make the full language visible</h3><p>Set the device upright. Your face, shoulders, elbows and both hands should remain inside the frame without leaning away.</p></div>${checklist(["I checked the complete signing window and can see my face, shoulders and both hands."], 2)}</section><details class="evidencePanel"><summary>Evidence and learning limits</summary><p>This lesson is grounded in recognised UK BSL and Deaf-education sources. These links are for verification and deeper study; you do not need to leave the app to understand today’s teaching.</p><div>${l.evidenceSources.map(evidenceLink).join("")}</div><p class="evidenceLimit"><strong>Important:</strong> A dictionary documents a citation form. It does not certify the app’s connected sequence, replace sustained Deaf-led teaching or demonstrate every non-manual feature.</p></details>${helpBox(
    `Re-read only the card connected to the incorrect answer. Say the distinction in your own words, answer again, then stop. For the physical setup, move the device rather than shrinking your signing.`,
  )}${nav(
    ready,
    ready
      ? "The language idea and practice position are secure enough to begin the starter."
      : "Answer both checks correctly and confirm the full signing window.",
  )}`;
}
function mumKey(day, index) {
  const lessonId = COURSE[day - 1]?.id || `day-${day}`;
  return `${lessonId}:${["production", "knowledge", "meaning", "repair"][index] || `prompt-${index}`}`;
}
function showMumPrompts(l) {
  const terms = l.items
    .slice(0, Math.min(3, l.items.length))
    .map((item) => item.term);
  const termList = terms.map((term) => `“${term}”`).join(", ");
  return [
    {
      id: `${l.id}:production`,
      target: "production",
      name: "Signs from memory",
      ask: `Show me ${termList} one at a time, without opening an example.`,
      learner:
        `Pause for five seconds before beginning. Use each item for today’s intended meaning, not as a disconnected hand movement.`,
      lookFor: `I can see ${terms.length === 1 ? "one clear meaning" : `${terms.length} separate meanings`} and a calm boundary between them. Today’s observation focus was: ${l.items[0]?.watch || l.observe}`,
      starter: `Produce ${terms.join(", ")} from memory with a clear pause between each item.`,
    },
    {
      id: `${l.id}:knowledge`,
      target: "understanding",
      name: "Teach the language idea",
      ask: `First tell me the answer to “${l.enquiry}” in one sentence. Then show me the contrast using BSL or visual communication.`,
      learner:
        `Use your own words for the knowledge, then demonstrate the practical example from “${l.knowledge[0].title}”.`,
      lookFor: `I can hear a clear distinction and then see an example. The key idea is: ${l.knowledge[0].body}`,
      starter: `Explain and demonstrate the Day ${l.day} idea: ${l.knowledge[0].title}.`,
    },
    {
      id: `${l.id}:meaning`,
      target: "classroom-use",
      name: "Build a BSL meaning sequence",
      ask: `Communicate this without speaking: ${l.phrases[0].meaning}`,
      learner:
        `Use the visual plan “${l.phrases[0].build}”. Do not show Mum the gloss until after the attempt.`,
      lookFor: `I can follow the intended beginning, middle and end. Specifically: ${l.phrases[0].focus}`,
      starter: `Rebuild this meaning sequence from Day ${l.day}: ${l.phrases[0].meaning}`,
    },
    {
      id: `${l.id}:repair`,
      target: "repair",
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
      const sourceLesson = COURSE.find((lesson) =>
          showMumPrompts(lesson).some((prompt) => prompt.id === key),
        ),
        day = sourceLesson?.day,
        prompts = sourceLesson ? showMumPrompts(sourceLesson) : [],
        index = prompts.findIndex((prompt) => prompt.id === key),
        prompt = index >= 0 ? prompts[index] : null;
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
        Number.isFinite(item.rating),
    );
  const weak = observations
      .filter((item) => item.rating === 0 && item.due <= l.day)
      .sort((a, b) => b.day - a.day)
      .slice(0, 2),
    nearly = observations
      .filter((item) => item.rating === 1 && item.due <= l.day)
      .sort((a, b) => b.day - a.day)
      .slice(0, 1),
    secure = observations
      .filter((item) => item.rating >= 2 && item.due <= l.day)
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
  if (
    state.starterPlanVersions[l.day] === CONTENT_VERSION &&
    Array.isArray(state.starterPlans[l.day]) &&
    state.starterPlans[l.day].length
  )
    return state.starterPlans[l.day];
  if (l.day === 1) {
    state.starterPlans[l.day] = FIRST_DAY_STARTER.map((prompt, index) => ({
      id: `${l.id}:starter-foundation-${index + 1}`,
      ...prompt,
    }));
    state.starterPlanVersions[l.day] = CONTENT_VERSION;
    save();
    return state.starterPlans[l.day];
  }
  const mum = adaptiveMumPrompts(l);
  const previousScenario =
    l.day > 1
      ? [
          {
            term: "Classroom situation",
            source: `Scenario return · Day ${l.day - 1}`,
            sourceDay: l.day - 1,
            kind: "scenario",
            prompt: COURSE[l.day - 2].use,
            clue: `Begin with the attention or context boundary, then use only secure meaning blocks from Day ${l.day - 1}.`,
            check: COURSE[l.day - 2].mastery,
          },
        ]
      : [];
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
  [...mum, ...previousScenario, ...due, ...prev, ...foundation].forEach((x) => {
    if (x.term && !unique.some((y) => y.term === x.term)) unique.push(x);
  });
  const plan = (
    unique.length ? unique : FIRST_DAY_STARTER
  )
    .slice(0, 5)
    .map((prompt, index) => ({
      id: prompt.id || `${l.id}:starter-${index + 1}`,
      ...prompt,
    }));
  state.starterPlans[l.day] = plan;
  state.starterPlanVersions[l.day] = CONTENT_VERSION;
  save();
  return plan;
}
function retrievalStage(l) {
  const prompts = retrievalPrompts(l),
    idx = Math.min(state.recallIndex[l.day] || 0, prompts.length - 1),
    results = state.retrieval[l.day] || {},
    done = Object.keys(results).length >= prompts.length,
    p = prompts[idx];
  return `<div class="stageLabel">Block 2 of 11 · Retrieval starter · 15 min</div>${actionBox(
    `Attempt ${prompts.length} previously taught actions. Read the complete context before moving your hands.`,
    "Retrieval should begin from meaning, not a floating English label. Day 1 practises the visual foundations instead of pretending untaught signs can be recalled.",
    `You have honestly attempted all ${prompts.length} prompts. Correct answers are not required.`,
  )}<section class="adaptiveWindow"><strong>First five minutes: adaptive recall</strong><p>Read the complete scenario, wait five quiet seconds, attempt it, rate it, then move on. Use the remaining time to reopen only the weakest model and retry once.</p></section><section class="starterCard"><div class="starterMeta"><span>${esc(p.source)}</span><span>Prompt ${idx + 1} of ${prompts.length}</span></div><p class="starterTerm">${esc(p.term)}</p><h3>${esc(p.prompt || `Produce “${p.term}” in a meaningful context.`)}</h3><div class="starterReady"><strong>Judge this—not confidence</strong><p>${esc(p.check || "The meaning is visible without spoken English carrying it.")}</p></div><button class="miniBtn" id="showRetrievalClue" type="button">I need one precise clue</button><div id="retrievalClue" class="retrievalClue" hidden><strong>Use this, then attempt once</strong><p>${esc(p.clue || "Rebuild the first meaning block, pause, then add one piece.")}</p>${p.model ? `<a class="miniBtn" data-resource="starter-model" href="${esc(p.model.url)}" target="_blank" rel="noopener">Reopen the exact signed model ↗</a>` : ""}</div></section><div class="ratingRow starterRatings"><button class="btn good" data-retrieval="2">Clear from memory</button><button class="btn warn" data-retrieval="1">Meaning clear, form hesitant</button><button class="btn secondary" data-retrieval="0">Could not retrieve it</button></div>${helpBox(
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
    modelKey = resourceKey(l.day, item.resource),
    opened = !!state.resourceOpened[modelKey],
    viewed = !!state.modelViewed[modelKey],
    isAlphabetSystem = item.model.type === "fingerspelling-system",
    isNumberSystem = item.model.type === "regional-number-system" && item.term === "numbers 0–10",
    isSystemModel = isAlphabetSystem || isNumberSystem,
    learningAction = isAlphabetSystem
      ? "Use the official BSL two-handed alphabet to fingerspell your own name clearly."
      : isNumberSystem
        ? "Use the official regional-number resource to practise 0–10 as one coherent system."
        : `Learn the BSL model for “${item.term}” in today’s exact meaning.`,
    routeLabel = isSystemModel ? "OFFICIAL SYSTEM PRACTICE" : "ENGLISH ROUTE LABEL",
    copyInstruction = isSystemModel
      ? "Practise in the small groups specified above. Reopen the official resource and compare exact shape, contact, orientation, movement and transitions before repeating the weaker group."
      : "Copy slowly three times. Reopen the model and compare handshape, orientation, location, movement and the relevant non-manual feature.",
    recallInstruction = isSystemModel
      ? "Close the resource. Wait five seconds. Complete the whole named system task once from memory, then record which part needs another model."
      : "Close the model. Wait five seconds. Produce the sign inside today’s context; do not merely repeat the English label.";
  if (finished)
    return `<div class="stageLabel">Block 4 of 11 · Guided production · 20 min</div>${actionBox(
      "Read the learning record, then take the first cognitive break.",
      "Every sign was linked to an exact signed model, a contextual meaning and a specific observation target. Weak forms are already scheduled to return.",
      "Every model has an honest production result.",
    )}<div class="summaryList learningSummary">${l.items
      .map(
        (x, i) =>
          `<div><span><strong>${esc(x.term)}</strong><small>${esc(x.meaning)}</small></span><em>${esc(RATINGS[state.itemRatings[itemKey(l.day, i)]] || "Attempted")}</em></div>`,
      )
      .join("")}</div><div class="nextTeaching"><p class="eyebrow">AFTER THE BREAK</p><h3>You will combine selected verified forms into visual meaning.</h3><p>A sign remembered in isolation is not yet communicative BSL.</p></div>${helpBox(l.stuck)}${nav(true, "Signed-model cycle complete. A ten-minute break is next.")}`;
  return `<div class="stageLabel">Block 4 of 11 · Guided production · 20 min</div>${actionBox(
    learningAction,
    "The written label only identifies the intended sense. The recorded BSL model supplies the form; the app teaches you how to observe, retrieve and use it.",
    "The model is closed, the sign has been recalled in context, and one honest result is recorded.",
  )}<div class="itemProgress"><span>Signed model ${pos + 1} of ${order.length}</span><progress value="${pos}" max="${order.length}" aria-label="Signed model ${pos + 1} of ${order.length}"></progress></div><section class="signTutor"><div class="signIdentity"><p class="eyebrow">${routeLabel}</p><h3>${esc(item.term)}</h3><p><strong>Meaning in this lesson:</strong> ${esc(item.meaning)}</p></div><div class="signContext"><div><strong>Use it for meaning</strong><p>${esc(item.use)}</p></div><div><strong>Do not confuse the task</strong><p>${esc(item.contrast)}</p></div></div></section><div class="learningSequence deep"><section><span>01</span><div><strong>Watch the whole model twice</strong><p>First viewing: do not move. Second viewing: ${esc(item.watch)}</p></div></section><section><span>02</span><div><strong>Rebuild one component</strong><p>${esc(item.clue)} Do only that piece once before copying the whole sign.</p></div></section><section><span>03</span><div><strong>Copy, pause, compare</strong><p>${esc(copyInstruction)}</p></div></section><section><span>04</span><div><strong>Close, wait, communicate</strong><p>${esc(recallInstruction)}</p></div></section></div>${resourceCard(item.resource, 0)}${opened && !viewed ? `<section class="modelConfirmation"><strong>Did an actual signed model play?</strong><p>Opening a page is not learning evidence.</p><div><button class="btn good" id="confirmModelViewed" type="button">Yes, I viewed a signed model</button><button class="btn secondary" id="reportModelFailed" type="button">Model did not load</button></div></section>` : ""}${viewed ? `<p class="modelReturn"><strong>Now keep the page closed.</strong> Complete the recall and context use before choosing a result.</p>` : `<p class="gateMessage">View and confirm the exact signed model before rating. The app will not pretend a written description can replace signed input.</p>`}<div class="ratingRow"><button class="btn good" data-item-rating="2" ${viewed ? "" : "disabled"}>Form and meaning clear from memory</button><button class="btn warn" data-item-rating="1" ${viewed ? "" : "disabled"}>Meaning clear, form hesitant</button><button class="btn secondary" data-item-rating="0" ${viewed ? "" : "disabled"}>Need the model again</button></div>${helpBox(
    `Use only this recovery: ${item.clue} Reopen the model once, close it, and reproduce the first component before rebuilding the full sign.`,
  )}${nav(false, `Complete the observe–rebuild–compare–recall cycle for “${item.term}”.`)}`;
}
function blockTimerMarkup() {
  const block = SESSION_BLOCKS[state.stage],
    key = blockTimerKey(state.selected, state.stage),
    saved = Number(state.timerLeft[key]),
    seconds =
      timer.key === key
        ? timer.left
        : Number.isFinite(saved)
          ? saved
          : block.minutes * 60,
    next = SESSION_BLOCKS[state.stage + 1],
    warned =
      !!state.timerWarnings[key] ||
      (seconds <= 300 && block.minutes >= 5 && !!next),
    instruction =
      block.kind === "break"
        ? "Use this as a gentle break guide. You may leave longer or return early without penalty."
        : "The clock supports the block; it does not decide whether the learning was meaningful.";
  return `<section class="timerBox blockClock" data-timer-seconds="${block.minutes * 60}"><div><p class="eyebrow">${esc(block.label.toUpperCase())} · ${block.minutes} MIN</p><strong id="timerReadout">${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}</strong><p>${esc(instruction)}</p></div><div><button class="miniBtn" id="timerToggle" type="button">${timer.running && timer.key === key ? "Pause block" : Number.isFinite(saved) && saved < block.minutes * 60 ? "Resume block" : "Start block"}</button><button class="miniBtn" id="timerRestart" type="button">Restart block</button></div><div class="transitionWarning" id="transitionWarning" role="status" ${warned ? "" : "hidden"}><strong>${next ? `In five minutes: ${esc(next.label)}` : "Block ending"}</strong><span>Finish the current meaningful attempt calmly. The timer will not move you on automatically.</span></div></section>`;
}
function practiseStage(l) {
  const items = [
      `Build “${l.phrases[0].meaning}” in meaning blocks, then remove the written gloss and produce it once from memory.`,
      `Build “${l.phrases[1].meaning}” in meaning blocks, then change one real detail without returning to English word-by-word order.`,
      "Record both sequences or use a mirror. Check that time, people, topic, facial grammar and pauses are visible without spoken English carrying the message.",
    ],
    ready = items.every((_, i) => getCheck(l.day, 5, i));
  return `<div class="stageLabel">Block 6 of 11 · New learning B · 25 min</div>${actionBox(
    "Use verified forms to build both meanings, then change one real detail without rebuilding them from English.",
    "Vocabulary becomes language only when meaning, space, gaze, face and turn-taking are organised together—and an app-authored plan is never a substitute for a fluent signed model.",
    "Both meanings have been attempted from verified forms, and any uncertain connected ordering has been marked for qualified confirmation.",
  )}<div class="glossNotice"><strong>Meaning plan—not a BSL model or translation.</strong><p>The upper-case labels below are memory notes. They do not certify natural BSL ordering, non-manual scope or a unique translation. Use only forms you studied from a real model and record uncertainty for a Deaf/qualified teacher.</p></div><div class="phraseGrid">${l.phrases
    .map(
      (phrase, index) =>
        `<article class="phraseCard"><p class="eyebrow">MEANING SEQUENCE ${index + 1}</p><h3>${esc(phrase.meaning)}</h3><details><summary>Reveal the temporary planning gloss</summary><code>${esc(phrase.gloss)}</code></details><div><strong>Build it</strong><p>${esc(phrase.build)}</p></div><div><strong>Watch for</strong><p>${esc(phrase.focus)}</p></div></article>`,
    )
    .join("")}</div><section class="practiceWindow"><strong>Use the block clock deliberately</strong><p>Build meaning 1, rest your hands, build meaning 2, then repeat the weaker meaning without viewing the plan.</p></section>${checklist(items, 5)}<div class="reviewPanel"><p class="eyebrow">LANGUAGE ERRORS TO CATCH</p><ul>${l.errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>${helpBox(
    `Reduce the sequence to two meaning blocks. Use the ‘Build it’ line, not the English sentence, then add only one block at a time. ${l.stuck}`,
  )}${nav(
    ready,
    ready
      ? "Both meaning sequences were built and reviewed."
      : `Complete ${items.filter((_, i) => !getCheck(l.day, 5, i)).length} BSL-building action(s).`,
  )}`;
}
function useStage(l) {
  const lab = l.receptionLab;
  const items = [
      lab.setup,
      `Complete the three viewing passes in order: ${lab.passes.join(" ")}`,
      `Create the evidence: ${lab.evidence} Then respond with today’s communication challenge: ${l.use}`,
    ],
    ready = items.every((_, i) => getCheck(l.day, 6, i));
  return `<div class="stageLabel">Block 7 of 11 · Classroom application · 25 min</div>${actionBox(
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
    .join("")}</div><p class="receptionTruth"><strong>What does not count:</strong> looking at “${esc(l.items[0]?.term || "the English label")}” and producing the sign. That is production recall, not BSL reception.</p></section>${checklist(items, 6)}<section class="communicationReply"><p class="eyebrow">RESPOND WITH MEANING</p><h3>${esc(l.use)}</h3><p>${esc(l.review)}</p></section><div class="schoolBox"><p class="eyebrow">USE THIS IN SCHOOL — OPTIONAL</p><p>${esc(l.school)}</p><small>Remain clear that you are a learner. Continue through Deaf-led teaching and real interaction.</small></div>${helpBox(
    `If natural signed input feels too fast, do not replace it with English. Watch once for gist, choose one missing detail, then replay only for that detail or use a specific repair request.`,
  )}${nav(
    ready,
    ready
      ? "Signed input was watched, interpreted and answered."
      : `Complete ${items.filter((_, i) => !getCheck(l.day, 6, i)).length} receptive action(s).`,
  )}`;
}
function mixedReviewStage(l) {
  const note = state.notes[l.day] || "",
    conf = state.confidence[l.day],
    reviewItems = [
      l.drill,
      "Record one uninterrupted attempt or use a mirror. Watch once with sound muted so spoken English cannot hide missing visual information.",
      l.review,
    ],
    practiceReady = reviewItems.every((_, i) => getCheck(l.day, 8, i)),
    ready = practiceReady && note.trim().length >= 20 && !!conf;
  return `<div class="stageLabel">Block 9 of 11 · Mixed retrieval · 20 min</div>${actionBox(
    l.drill,
    "The final self-review turns today’s knowledge into visible performance evidence before Mum sees it.",
    l.mastery,
  )}<section class="practiceWindow"><strong>Interleave instead of polishing one favourite</strong><p>Complete the full drill once. If a form disappears, use repair and continue; continuity matters more than pretending perfection.</p></section>${checklist(reviewItems, 8)}<div class="masteryBox"><p class="eyebrow">TODAY’S MASTERY DECISION</p><p>${esc(l.mastery)}</p><p><strong>Reflect on:</strong> ${esc(l.reflect)}</p></div><div class="reviewPanel"><p class="eyebrow">CHECK THE RECORDING, NOT THE FEELING</p><ul>${l.errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div><label class="fieldLabel" for="notes">Write one visible success and one exact item to bring back</label><textarea id="notes" placeholder="Visible today…\nBring back tomorrow…">${esc(note)}</textarea><div class="confidence"><button data-confidence="1" class="${conf === 1 ? "active" : ""}">Needs a model</button><button data-confidence="2" class="${conf === 2 ? "active" : ""}">Meaning clear, form hesitant</button><button data-confidence="3" class="${conf === 3 ? "active" : ""}">Clear from memory today</button></div>${helpBox(
    `Do one reduced attempt: ${l.stuck} Then record the honest confidence level; you are not required to claim mastery.`,
  )}${nav(
    ready,
    ready
      ? "Practice evidence and reflection are saved. Continue to Mum Review."
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
    return `<div class="stageLabel">Block 10 of 11 · Mum Review · 20 min</div>${actionBox("Look over Mum’s four ratings, then continue to the five-minute close.", "These observations record partner comprehensibility, not certified BSL accuracy. The next starter will prioritise anything marked ‘Not yet’ or ‘Needed a cue’.", "All four prompts have a rating and the adaptive starter has been prepared.")}<section class="mumSummary"><div class="observerBadge"><span aria-hidden="true">✓</span><div><p class="eyebrow">DISPLAY OF UNDERSTANDING COMPLETE</p><h3>Mum’s view of today</h3></div></div>${prompts.map((prompt, index) => `<div class="mumResult"><div><strong>${esc(prompt.name)}</strong><span>${esc(MUM_RATINGS[mumRating(l.day, index)])}</span></div><button type="button" class="miniBtn" data-edit-mum="${index}">Change rating</button></div>`).join("")}<p class="mumAdaptNote"><strong>Tomorrow is already different.</strong> The starter will put the least clear display first, then one older independent item for spacing. A qualified model—not Mum’s rating—remains the accuracy reference.</p></section>${nav(true, "All four answers were attempted and rated. Continue to Close.")}`;
  return `<div class="stageLabel">Block 10 of 11 · Mum Review · 20 min</div>${actionBox("Hand the device to Mum. She reads one prompt, watches your answer, then taps one rating.", "Explaining and demonstrating learning to another person exposes what is genuinely available from memory. Mum does not need to know BSL; the app gives her visible features to notice.", `All ${prompts.length} prompts have been attempted and rated. Accuracy is not required to continue.`)}<section class="mumHandoff"><div class="observerBadge"><span aria-hidden="true">M</span><div><p class="eyebrow">MUM’S VIEW</p><h3>Prompt ${idx + 1} of ${prompts.length}</h3></div></div><p class="mumPrivacy">No recording or rating leaves this device. Rate how independently and contextually followable the answer was—not whether you believe the BSL form was linguistically correct.</p></section><section class="practiceWindow"><strong>Allow about five minutes for this prompt</strong><p>Read it, wait quietly, watch the full answer, choose one rating and then move on.</p></section><section class="mumPrompt"><p class="eyebrow">MUM, SAY THIS</p><h3>${esc(p.ask)}</h3><div class="mumInstructions"><div><strong>The learner does this</strong><p>${esc(p.learner)}</p></div><div><strong>Mum watches for</strong><p>${esc(p.lookFor)}</p></div></div></section><div class="mumRating"><p class="eyebrow">MUM’S RATING FOR THIS ANSWER</p><div class="ratingRow four"><button class="btn secondary" data-mum-rating="0"><strong>Not yet</strong><span>The answer was not followable</span></button><button class="btn warn" data-mum-rating="1"><strong>Needed a cue</strong><span>A prompt or restart was needed</span></button><button class="btn good" data-mum-rating="2"><strong>Independent</strong><span>Completed without a cue</span></button><button class="btn good strong" data-mum-rating="3"><strong>Comfortable in context</strong><span>Followable inside the situation</span></button></div></div>${helpBox("Reduce the answer, not the honesty of the rating. Show only the first sign or first meaning block, pause, then add one piece. Mum should still rate what she could see.")}${nav(false, `${rated} of ${prompts.length} Mum Review prompts rated.`)}`;
}

function breakStage(l) {
  const ready = getCheck(l.day, state.stage, 0),
    next = SESSION_BLOCKS[state.stage + 1];
  return `<div class="stageLabel">Block ${state.stage + 1} of 11 · Break · 10 min</div>${actionBox(
    "Leave the screen. Rest your eyes and hands; drink, move and let the previous learning settle.",
    "A genuine break protects attention across an intensive session. It is part of the learning design, not a reward for speed.",
    "You have paused the signing work and feel able to begin the next block. Ending early is allowed; the timer does not police you.",
  )}<section class="breakSurface"><span aria-hidden="true">◌</span><div><p class="eyebrow">WHEN YOU RETURN</p><h3>${esc(next.label)}</h3><p>${esc(next.purpose)}</p></div></section>${checklist([
    "I took a real pause away from active signing and am choosing to return now.",
  ], state.stage)}${helpBox(
    "If ten minutes is not enough, choose Save and leave. Returning later today will restore this exact break and the remaining session route.",
  )}${nav(
    ready,
    ready
      ? `Break acknowledged. Continue to ${next.label}.`
      : "Take the break, then confirm that you are choosing to return.",
  )}`;
}

function finalCloseStage(l) {
  const isFinal = l.day === COURSE.length,
    items = isFinal
      ? [
          "I identified three genuinely secure abilities and three fragile abilities.",
          "I recorded a first-school-week action and a dated 30-day continuation action in my saved note.",
          "I can state the high-stakes situations where beginner BSL must never replace qualified support.",
        ]
      : [
          "I can name one visible success and one exact item that should return.",
          "I have read tomorrow’s purpose and know that today’s evidence is saved.",
        ],
    ready = items.every((_, index) => getCheck(l.day, 10, index)),
    mum = showMumPrompts(l).map((_, index) => mumRating(l.day, index));
  return `<div class="stageLabel">Block 11 of 11 · Close · 5 min</div>${actionBox(
    isFinal
      ? "Read the readiness statement, confirm the continuation actions and finish the intensive course honestly."
      : "Read the saved evidence, preview tomorrow and finish without adding one more practice round.",
    "Closing makes the next action clear and prevents an intensive session from leaking into endless, anxious repetition.",
    isFinal
      ? "The readiness summary, professional boundaries, first-week action and 30-day continuation route are explicit."
      : "One success, one fragile item and tomorrow’s purpose are clear.",
  )}<section class="closeSummary"><div><p class="eyebrow">SAVED ON THIS DEVICE</p><h3>${isFinal ? "Useful beginner foundation" : `Day ${l.day} evidence`}</h3><p>${isFinal ? "You have completed the intensive course. You are still learning. You can use some BSL meaningfully, recognise more, improve visual access and repair some breakdowns—but you are not fluent or qualified to interpret." : esc(state.notes[l.day] || "Your retrieval, production and Mum Review evidence is saved.")}</p></div><div class="closeEvidence"><span><strong>${MUM_RATINGS[mum.filter(Number.isFinite).sort((a, b) => b - a)[0]] || "Attempted"}</strong><small>Strongest partner-observation level</small></span><span><strong>${esc(RATINGS[Math.max(0, Number(state.confidence[l.day] || 1) - 1)] || "Recorded")}</strong><small>Self-review snapshot</small></span></div></section><section class="previewBox"><p class="eyebrow">${isFinal ? "THE NEXT 30 DAYS" : "TOMORROW"}</p><h3>${esc(l.preview)}</h3><p>${isFinal ? "Choose qualified, ideally Deaf-led teaching; keep two short retrieval sessions each week; seek real feedback; and confirm school-used variants with the support team." : "The adaptive starter will begin with the least secure evidence while it is still useful."}</p></section>${checklist(items, 10)}${helpBox(
    isFinal
      ? "Reduce the plan to one booked or identified course, two weekly practice appointments and one person or setting able to give authentic feedback. Specific beats ambitious."
      : "Do not reopen every model. Read the saved note once, accept today’s honest evidence and leave the app.",
  )}${nav(
    ready,
    ready
      ? isFinal
        ? "Readiness summary complete. Finish the 36-day intensive."
        : `Day ${l.day} is ready to finish.`
      : `Confirm ${items.filter((_, index) => !getCheck(l.day, 10, index)).length} close action(s).`,
    true,
  )}`;
}

function renderStage() {
  const l = lesson();
  let html = [
    arriveStage,
    retrievalStage,
    orientStage,
    learnStage,
    breakStage,
    practiseStage,
    useStage,
    breakStage,
    mixedReviewStage,
    showMumStage,
    finalCloseStage,
  ][state.stage](l);
  $("stageCard").innerHTML = `${blockTimerMarkup()}${html}`;
  bindStage(l);
}
function stageReady(l, stage) {
  if (stage === 0) return [0, 1].every((index) => getCheck(l.day, 0, index));
  if (stage === 1)
    return (
      Object.keys(state.retrieval[l.day] || {}).length >=
      retrievalPrompts(l).length
    );
  if (stage === 2) return knowledgeReady(l);
  if (stage === 3) return (state.itemIndex[l.day] || 0) >= learnOrder(l).length;
  if (stage === 4 || stage === 7) return getCheck(l.day, stage, 0);
  if (stage === 5 || stage === 6)
    return [0, 1, 2].every((i) => getCheck(l.day, stage, i));
  if (stage === 8)
    return (
      [0, 1, 2].every((i) => getCheck(l.day, 8, i)) &&
      (state.notes[l.day] || "").trim().length >= 20 &&
      !!state.confidence[l.day]
    );
  if (stage === 9)
    return showMumPrompts(l).every((_, index) =>
      Number.isFinite(mumRating(l.day, index)),
    );
  if (stage === 10) {
    const count = l.day === COURSE.length ? 3 : 2;
    return Array.from({ length: count }, (_, index) =>
      getCheck(l.day, 10, index),
    ).every(Boolean);
  }
  return false;
}
function enqueue(day, index, rating, due) {
  const itemId = itemKey(day, index);
  const existing = state.reviewQueue.find(
    (q) => q.itemId === itemId || (q.day === day && q.index === index),
  );
  if (existing) {
    existing.rating = rating;
    existing.due = due;
  } else state.reviewQueue.push({ itemId, day, index, rating, due });
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
        const key = a.dataset.resourceKey || resourceKey(l.day, { url: a.href });
        state.resourceOpened[key] = true;
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
            due: l.day + (rating <= 1 ? 1 : 3),
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
              l.day + (rating <= 1 ? 1 : 3),
            );
        }
        state.recallIndex[l.day] = Math.min(idx + 1, prompts.length - 1);
        save();
        renderStage();
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
          l.day + (rating <= 1 ? 1 : 3),
        );
        if (rating === 0 && state.learnAttempts[k] < 2) order.push(index);
        state.itemIndex[l.day] = pos + 1;
        delete state.resourceOpened[resourceKey(l.day, l.items[index].resource)];
        delete state.modelViewed[resourceKey(l.day, l.items[index].resource)];
        save();
        renderStage();
      }),
  );
  const confirmModel = $("confirmModelViewed"),
    failedModel = $("reportModelFailed");
  if (confirmModel)
    confirmModel.onclick = () => {
      const order = learnOrder(l),
        index = order[state.itemIndex[l.day] || 0] ?? order[order.length - 1],
        key = resourceKey(l.day, l.items[index].resource);
      state.modelViewed[key] = true;
      save();
      renderStage();
    };
  if (failedModel)
    failedModel.onclick = () => {
      const order = learnOrder(l),
        index = order[state.itemIndex[l.day] || 0] ?? order[order.length - 1],
        key = resourceKey(l.day, l.items[index].resource);
      delete state.resourceOpened[key];
      delete state.modelViewed[key];
      save();
      announce("The activity is still unfinished. Reopen the model when connected.");
      renderStage();
    };
  const notes = $("notes");
  if (notes)
    notes.oninput = (e) => {
      state.notes[l.day] = e.target.value;
      save();
      const ready = stageReady(l, 8),
        action = $("nextStage"),
        message = document.querySelector(".gateMessage");
      if (action) action.disabled = !ready;
      if (message)
        message.textContent = ready
          ? "Practice evidence and reflection are saved. Continue to Mum Review."
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
          promptId: prompts[index].id,
          target: prompts[index].target,
          prompt: prompts[index].ask,
        };
        state.mumFollowups[key] = {
          rating,
          due: l.day + (rating <= 1 ? 1 : rating === 2 ? 3 : 7),
          lastDay: l.day,
        };
        if (
          l.day < COURSE.length &&
          !Object.keys(state.retrieval[l.day + 1] || {}).length
        ) {
          delete state.starterPlans[l.day + 1];
          delete state.starterPlanVersions[l.day + 1];
        }
        state.mumIndex[l.day] = Math.min(index + 1, prompts.length);
        save();
        renderStage();
      }),
  );
  document.querySelectorAll("[data-edit-mum]").forEach(
    (b) =>
      (b.onclick = () => {
        const index = Number(b.dataset.editMum),
          key = mumKey(l.day, index);
        delete state.mumRatings[key];
        delete state.mumFollowups[key];
        if (
          l.day < COURSE.length &&
          !Object.keys(state.retrieval[l.day + 1] || {}).length
        ) {
          delete state.starterPlans[l.day + 1];
          delete state.starterPlanVersions[l.day + 1];
        }
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
      delete state.lastBlock[l.id];
      state.currentBlockId = SESSION_BLOCKS[0].id;
      save();
      announce(
        l.day === COURSE.length
          ? "The 36-day intensive is complete. Your continuation plan is ready."
          : `Day ${l.day} complete. Your next retrieval is ready.`,
      );
      setTimeout(exitSession, 700);
    };
  bindTimer();
}
function moveStage(delta) {
  stopTimer();
  state.stage = Math.max(0, Math.min(STAGES.length - 1, state.stage + delta));
  state.lastOpen[state.selected] = state.stage;
  state.currentBlockId = SESSION_BLOCKS[state.stage].id;
  state.lastBlock[lesson().id] = state.currentBlockId;
  save();
  renderSession();
  calmScrollTop();
}
function bindTimer() {
  const toggle = $("timerToggle"),
    restart = $("timerRestart"),
    block = SESSION_BLOCKS[state.stage],
    timerKey = blockTimerKey(state.selected, state.stage),
    duration = block.minutes * 60;
  if (!toggle) return;
  if (timer.key !== timerKey) {
    if (timer.running) pauseBlockTimer();
    timer.key = timerKey;
    timer.left = Number.isFinite(Number(state.timerLeft[timerKey]))
      ? Number(state.timerLeft[timerKey])
      : duration;
  }
  updateTimer();
  toggle.onclick = () => {
    if (timer.running) pauseBlockTimer();
    else startBlockTimer(duration);
  };
  restart.onclick = () => {
    pauseBlockTimer();
    timer.key = timerKey;
    timer.left = duration;
    state.timerLeft[timerKey] = duration;
    delete state.timerWarnings[timerKey];
    save();
    updateTimer();
  };
}
function startBlockTimer(duration) {
  if (timer.id) clearInterval(timer.id);
  if (!Number.isFinite(timer.left) || timer.left <= 0) timer.left = duration;
  timer.running = true;
  timer.lastPersist = Date.now();
  updateTimer();
  timer.id = setInterval(() => {
    timer.left = Math.max(0, timer.left - 1);
    const block = SESSION_BLOCKS[state.stage],
      warning = $("transitionWarning");
    if (
      timer.left <= 300 &&
      block.minutes > 5 &&
      !state.timerWarnings[timer.key]
    ) {
      state.timerWarnings[timer.key] = true;
      if (warning) warning.hidden = false;
      save();
    }
    if (Date.now() - timer.lastPersist >= 5000 || timer.left === 0) {
      state.timerLeft[timer.key] = timer.left;
      timer.lastPersist = Date.now();
      save();
    }
    updateTimer();
    if (timer.left <= 0) {
      pauseBlockTimer();
      const notice = $("transitionWarning");
      if (notice) notice.hidden = false;
      announce("Block time complete. Finish the current meaningful attempt calmly.");
    }
  }, 1000);
}
function pauseBlockTimer() {
  if (timer.id) clearInterval(timer.id);
  timer.id = null;
  timer.running = false;
  if (timer.key) state.timerLeft[timer.key] = Math.max(0, timer.left);
  save();
  updateTimer();
}
function updateTimer() {
  const r = $("timerReadout"),
    toggle = $("timerToggle");
  if (r) {
    r.textContent = `${Math.floor(timer.left / 60)}:${String(timer.left % 60).padStart(2, "0")}`;
    r.closest(".timerBox")?.classList.toggle("running", timer.running);
  }
  if (toggle)
    toggle.textContent = timer.running
      ? "Pause block"
      : timer.left < SESSION_BLOCKS[state.stage].minutes * 60
        ? "Resume block"
        : "Start block";
}
function stopTimer() {
  pauseBlockTimer();
  timer.key = null;
}
function moveTodayForward() {
  if (COURSE.every((lesson) => state.completed[lesson.day])) return;
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
  $("undoShift").hidden = !state.shiftEvents.length;
  announce("The date shift was undone.");
}
$("beginBtn").onclick = () => {
  const complete = COURSE.every((lesson) => state.completed[lesson.day]);
  openLesson(firstOpen().day, true, complete ? SESSION_BLOCKS.length - 1 : null);
};
$("exitBtn").onclick = exitSession;
$("printBtn").onclick = () => window.print();
$("dismissUpdate").onclick = () => {
  state.migrationNotice = false;
  save();
  $("contentUpdate").hidden = true;
};
$("moveDayBtn").onclick = moveTodayForward;
$("undoShift").onclick = undoShift;
document.querySelectorAll("[data-view]").forEach(
  (button) =>
    (button.onclick = () => showHomeView(button.dataset.view, true)),
);
$("schoolVariantNote").oninput = (event) => {
  state.schoolVariantNote = event.target.value.slice(0, 240);
  save();
};
$("resetBtn").onclick = () => {
  if (
    confirm(
      "Reset all BSL progress, notes and review history on this device? This cannot be undone.",
    )
  ) {
    localStorage.removeItem(KEY);
    state = fresh();
    renderHome();
    showHomeView("today");
    $("undoShift").hidden = true;
    announce("Progress reset");
  }
};
function restoreRoute() {
  const lessonMatch = location.hash.match(/^#day-(\d+)$/),
    homeView = location.hash.replace(/^#/, "");
  if (lessonMatch) {
    const day = Math.max(1, Math.min(COURSE.length, Number(lessonMatch[1])));
    openLesson(day, false);
    return;
  }
  if ($("session").classList.contains("active")) exitSession(false);
  showHomeView(["today", "course", "progress"].includes(homeView) ? homeView : "today");
}
window.addEventListener("popstate", restoreRoute);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && timer.running) pauseBlockTimer();
});
window.addEventListener("pagehide", () => {
  if (timer.running) pauseBlockTimer();
  else save();
});
window.addEventListener("beforeunload", () => {
  if (timer.running) pauseBlockTimer();
  else save();
});
save();
renderHome();
$("undoShift").hidden = !state.shiftEvents.length;
if (!location.hash)
  history.replaceState({ view: "today" }, "", "#today");
restoreRoute();
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {
    /* The app remains fully usable online if service-worker registration is unavailable. */
  });
}

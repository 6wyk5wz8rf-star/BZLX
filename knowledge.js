/*
 * BSL Learner Companion · authored knowledge layer
 *
 * This file deliberately separates:
 *   - knowledge about BSL and Deaf communication;
 *   - a contextual meaning to express;
 *   - the external comparison page available for further observation.
 *
 * Written English labels are never presented as if they were BSL. Glosses are
 * planning aids only and are explicitly labelled as such in the interface.
 */

const LEARNING_SOURCES = {
  signatureLevel1: {
    label: "Signature · BSL Level 1",
    url: "https://www.signature.org.uk/qualifications/british-sign-language-qualifications/british-sign-language-level-1-certificate/",
    note: "The recognised beginner pathway covers productive and receptive BSL, everyday conversation, numbers, descriptions, directions and information sharing.",
  },
  signatureNotes: {
    label: "Signature · Level 1 teacher notes",
    url: "https://www.signature.org.uk/documents/teacher_resources/BSL1_teacher_notes.pdf",
    note: "Used for beginner performance expectations including fingerspelling, turn-taking, placement, non-manual features, timelines, repair and directional verbs.",
  },
  signatureFrontline: {
    label: "Signature · Level 1 BSL for frontline staff",
    url: "https://www.signature.org.uk/wp-content/uploads/2023/12/Level-1-BSL101-Frontline-staff-2023.pdf",
    note: "The workplace-focused specification teaches basic direct communication and clarification while explicitly remaining below interpreting competence.",
  },
  signbank: {
    label: "UCL BSL SignBank",
    url: "https://bslsignbank.ucl.ac.uk/about/dictionary/",
    note: "A corpus-informed dictionary and research resource. It documents signs and variation; it is not presented as a stand-alone course.",
  },
  fingerspelling: {
    label: "UCL BSL SignBank · fingerspelling",
    url: "https://bslsignbank.ucl.ac.uk/spell/twohanded.html",
    note: "Interactive two-handed BSL alphabet and receptive fingerspelling practice.",
  },
  numbers: {
    label: "UCL BSL SignBank · number signs",
    url: "https://bslsignbank.ucl.ac.uk/regional/numbersigns/",
    note: "Corpus examples show that number signs can vary across UK regions.",
  },
  colours: {
    label: "UCL BSL SignBank · colour signs",
    url: "https://bslsignbank.ucl.ac.uk/regional/coloursigns/",
    note: "Corpus examples make regional variation visible rather than treating one variant as the only correct form.",
  },
  corpus: {
    label: "BSL Corpus Project",
    url: "https://bslcorpusproject.org/",
    note: "Natural BSL from Deaf signers provides evidence about vocabulary, grammar, variation and real interaction.",
  },
  ndcs: {
    label: "National Deaf Children’s Society · deaf-friendly teaching",
    url: "https://www.ndcs.org.uk/education-professionals/deaf-friendly-teaching",
    note: "Practical classroom guidance on attention, sightlines, visual support, processing time and communication access.",
  },
  ndcsEnvironment: {
    label: "National Deaf Children’s Society · communication environment",
    url: "https://www.ndcs.org.uk/education-professionals/creating-good-communication-environment-educator",
    note: "Practical guidance on planned visual attention signals and an environment in which communication remains visible.",
  },
  ndcsPlay: {
    label: "National Deaf Children’s Society · deaf-friendly playtime",
    url: "https://www.ndcs.org.uk/advice-and-support/all-advice-and-support-topics/raising-deaf-child/deaf-friendly-playtime-tips",
    note: "Guidance on following the child’s communication lead, reducing distraction and keeping faces and interaction visible during play.",
  },
  ndcsStory: {
    label: "National Deaf Children’s Society · deaf-friendly storytime",
    url: "https://www.ndcs.org.uk/advice-and-support/all-advice-and-support-topics/raising-deaf-child/deaf-friendly-storytime-tips",
    note: "Guidance on visually accessible storytelling and signed or visual story support.",
  },
  ndcsPrimary: {
    label: "National Deaf Children’s Society · primary education",
    url: "https://www.ndcs.org.uk/education-professionals/primary-education",
    note: "Practical guidance for participation, learning and social inclusion in primary settings.",
  },
  ndcsSafeguarding: {
    label: "National Deaf Children’s Society · safeguarding professionals",
    url: "https://www.ndcs.org.uk/safeguarding/professionals",
    note: "Safeguarding guidance for professionals working with deaf children; beginner signing never replaces the school’s procedure or qualified communication support.",
  },
  nrcpdRoles: {
    label: "NRCPD · communication professional roles",
    url: "https://www.nrcpd.org.uk/NRCPD-updates.php?article=89",
    note: "Clarifies distinct regulated communication roles so the teacher does not treat every support adult as an interpreter or outsource the teacher-child relationship.",
  },
  sscCurriculum: {
    label: "Scottish Sensory Centre · BSL curriculum glossary",
    url: "https://www.ssc.education.ed.ac.uk/BSL/",
    note: "A specialist curriculum glossary for checking subject terminology externally; its videos are linked, not copied or presented as one universal school version.",
  },
};

const SIGN_OVERRIDES = {
  "how are you": { slug: "hello-how-are-you", sense: "a social question about how someone is" },
  "my name is": { slug: "my-name-is", sense: "introducing your name" },
  "not understand": { slug: "dont-understand", sense: "saying that you have not understood" },
  "don't understand": { slug: "dont-understand", sense: "saying that you have not understood" },
  "show me": { slug: "show", sense: "asking someone to show or demonstrate" },
  "well done": { slug: "well-done", sense: "giving positive feedback" },
  "go home": { slug: "go-home", sense: "going home" },
  "wake up": { slug: "wake-up", sense: "waking from sleep" },
  "not like": { slug: "dislike", sense: "expressing dislike" },
  "yes/no question": { slug: "question", sense: "asking a closed question" },
  "wh-question": { slug: "question", sense: "asking for information" },
  "fingerspell please": { slug: "fingerspell", sense: "asking for a word to be fingerspelled" },
  "got it": { slug: "understand", sense: "confirming understanding" },
  "centre": { slug: "centre", sense: "the middle part of an established sequence or space" },
  "face visible": { slug: "face", sense: "keeping the speaker’s face visible for visual access" },
  "eye contact": { slug: "eye-contact", sense: "shared visual attention in the current interaction" },
  "PE": { slug: "physical-education", sense: "the school subject physical education" },
  "I": { slug: "me", sense: "reference to yourself in the current interaction" },
  "BSL": { slug: "british-sign-language", sense: "British Sign Language, not another signed language or fingerspelled English" },
};

/* Checked external comparison-page routes for the 36-day course. URLs are not
 * assembled from arbitrary English labels, but a route does not select a clip,
 * verify a regional variant or certify that the page matches the intended
 * classroom sense. SignBSL remains a comparison dictionary, not a connected
 * utterance model or a substitute for qualified linguistic review. */
const EXACT_MODEL_ROUTES = {
  "hello": "hello",
  "look": "look",
  "name": "name",
  "good morning": "good-morning",
  "my name is": "my-name-is",
  "how are you": "hello-how-are-you",
  "thank you": "thank-you",
  "goodbye": "goodbye",
  "again": "again",
  "fingerspell please": "fingerspell",
  "yes": "yes",
  "no": "no",
  "please": "please",
  "sorry": "sorry",
  "okay": "okay",
  "ready": "ready",
  "wait": "wait",
  "understand": "understand",
  "not understand": "dont-understand",
  "slower": "slower",
  "show me": "show",
  "what": "what",
  "which": "which",
  "teacher": "teacher",
  "friend": "friend",
  "school": "school",
  "classroom": "classroom",
  "room": "room",
  "toilet": "toilet",
  "park": "park",
  "lunch": "lunch",
  "my turn": "my-turn",
  "stop": "stop",
  "finished": "finished",
  "attention": "attention",
  "sit": "sit",
  "stand": "stand",
  "go": "go",
  "work": "work",
  "book": "book",
  "pencil": "pencil",
  "pen": "pen",
  "scissors": "scissors",
  "chair": "chair",
  "table": "table",
  "where": "where",
  "help": "help",
  "more": "more",
  "break": "break",
  "drink": "drink",
  "different": "different",
  "today": "today",
  "tomorrow": "tomorrow",
  "morning": "morning",
  "afternoon": "afternoon",
  "Monday": "monday",
  "Tuesday": "tuesday",
  "first": "first",
  "next": "next",
  "colour": "colour",
  "red": "red",
  "blue": "blue",
  "circle": "circle",
  "square": "square",
  "tall": "tall",
  "short": "short",
  "same": "same",
  "who": "who",
  "when": "when",
  "why": "why",
  "how": "how",
  "good": "good",
  "well done": "well-done",
  "try": "try",
  "correct": "correct",
  "question": "question",
  "answer": "answer",
  "happy": "happy",
  "sad": "sad",
  "worried": "worried",
  "angry": "angry",
  "tired": "tired",
  "fine": "fine",
  "pain": "pain",
  "ill": "ill",
  "hungry": "hungry",
  "thirsty": "thirsty",
  "happened": "happened",
  "play": "play",
  "join": "join",
  "together": "together",
  "partner": "partner",
  "tell": "tell",
  "choose": "choose",
  "share": "share",
  "agree": "agree",
  "person": "person",
  "door": "door",
  "then": "then",
  "before": "before",
  "after": "after",
  "finish": "finish",
  "think": "think",
  "know": "know",
  "got it": "understand",
  "child": "child",
  "eye contact": "eye-contact",
  "face": "face",
  "quiet": "quiet",
  "story": "story",
  "character": "character",
  "beginning": "beginning",
  "centre": "centre",
  "end": "end",
  "predict": "predict",
  "maths": "maths",
  "reading": "reading",
  "writing": "writing",
  "science": "science",
  "art": "art",
  "PE": "physical-education",
};

const TERM_MEANINGS = {
  hello: "a greeting that opens a visual interaction",
  name: "the noun ‘name’, used before a fingerspelled personal name",
  school: "the place or institution ‘school’",
  maths: "the school subject mathematics",
  book: "a physical or established book referent",
  London: "the UK place name London",
  teacher: "a person whose role is teaching",
  "good morning": "a morning greeting",
  "how are you": "a social question inviting the other person to say how they are",
  fine: "the response ‘fine/okay’ in a wellbeing exchange",
  "thank you": "thanks directed to another person",
  goodbye: "a closing that visibly ends the interaction",
  "my name is": "the meaning block used to introduce a personal name",
  I: "reference to yourself in the current interaction",
  live: "residing in a place, not a live broadcast",
  learn: "the activity of learning or acquiring knowledge",
  BSL: "British Sign Language",
  you: "reference to the current addressee",
  person: "a human referent established in the message",
  friend: "a person identified by the relationship ‘friend’",
  family: "a family group or family relationship context",
  we: "a group that includes the signer",
  they: "an established third-person person or group",
  age: "a person’s age in an age question or answer",
  year: "a year or year-length time context",
  "how many": "an information question asking for a quantity",
  red: "the colour red attached to a visible referent",
  blue: "the colour blue attached to a visible referent",
  green: "the colour green attached to a visible referent",
  yellow: "the colour yellow attached to a visible referent",
  black: "the colour black attached to a visible referent",
  white: "the colour white attached to a visible referent",
  light: "a light shade in a colour contrast",
  dark: "a dark shade in a colour contrast",
  mother: "the family relationship mother",
  father: "the family relationship father",
  parent: "the family relationship parent",
  brother: "the family relationship brother",
  sister: "the family relationship sister",
  child: "a child in a family or people context",
  partner: "a person’s partner",
  happy: "the feeling or state happy",
  sad: "the feeling or state sad",
  worried: "the feeling or state worried",
  angry: "the feeling or state angry",
  tired: "the feeling or state tired",
  excited: "the feeling or state excited",
  who: "an open question asking for a person",
  what: "an open question asking for a thing, action or information",
  where: "an open question asking for a place or location",
  when: "an open question asking for a time",
  why: "an open question asking for a reason",
  how: "an open question asking about manner or state",
  which: "an open question selecting from established alternatives",
  today: "the current day as a time frame",
  yesterday: "the preceding day as a past time frame",
  tomorrow: "the following day as a future time frame",
  Monday: "the day of the week Monday",
  Tuesday: "the day of the week Tuesday",
  Wednesday: "the day of the week Wednesday",
  Thursday: "the day of the week Thursday",
  Friday: "the day of the week Friday",
  Saturday: "the day of the week Saturday",
  Sunday: "the day of the week Sunday",
  morning: "the morning period of a day",
  afternoon: "the afternoon period of a day",
  evening: "the evening period of a day",
  "wake up": "the action of waking from sleep",
  eat: "the action of eating",
  work: "working as an activity or role context",
  "go home": "the event of going home",
  sleep: "the action or state of sleeping",
  look: "directing visual attention to the signer or an established target",
  wait: "an instruction to wait or pause",
  stop: "an instruction to stop the current action",
  sit: "an instruction or action to sit",
  stand: "an instruction or action to stand",
  again: "a request or instruction to repeat",
  finished: "a clear completion boundary",
  ready: "a readiness check or response",
  help: "help directed between established people",
  understand: "understanding a message or confirming comprehension",
  "not understand": "stating that a message was not understood",
  question: "a question as a conversational or classroom function",
  answer: "an answer or response to a question",
  slower: "a request for a slower signing pace",
  "show me": "a request for a visible demonstration",
  English: "the school subject or language English, as established by context",
  science: "the school subject science",
  art: "the school subject art",
  music: "music or the school subject music",
  PE: "the school subject physical education",
  reading: "reading as an activity or school lesson",
  break: "a school break or rest period",
  good: "a positive evaluation tied to a clear action or object",
  "well done": "positive praise for a completed effort or action",
  try: "the action of making an attempt",
  careful: "a calm warning to act carefully",
  kind: "kindness as behaviour or description",
  share: "sharing an object, space or turn",
  "your turn": "passing the current turn to the addressee",
  quiet: "a request or description relating to quiet",
  food: "food as a topic or category",
  drink: "drink as a topic or the action of drinking",
  water: "water as a drink choice",
  tea: "tea as a drink choice",
  coffee: "coffee as a drink choice",
  milk: "milk as a drink choice",
  fruit: "fruit as a food category",
  lunch: "the meal lunch",
  home: "home as a place",
  room: "a room used as the frame for a spatial description",
  door: "a door placed in a room or route map",
  table: "a table used as a spatial anchor",
  chair: "a chair used as a spatial anchor",
  phone: "a phone as an object",
  key: "a key as an object",
  shop: "a shop as a route destination or place",
  park: "a park as a place or route landmark",
  hospital: "a hospital as a place or destination",
  bus: "a bus in a transport context",
  train: "a train in a transport context",
  walk: "travelling on foot",
  go: "movement towards an established place",
  tall: "tall height in a respectful person description",
  short: "short height or length in the established description",
  hair: "hair as a feature in a person description",
  glasses: "worn glasses as an identifying feature",
  clothes: "clothing as a description category",
  young: "young age as a relevant neutral description",
  old: "older age as a relevant neutral description",
  shirt: "a shirt as a worn clothing item",
  trousers: "trousers as a worn clothing item",
  dress: "a dress as a worn clothing item",
  shoes: "shoes as worn items",
  coat: "a coat as a worn clothing item",
  hat: "a hat as a worn item",
  wear: "wearing an established clothing item",
  colour: "colour as a requested or described property",
  like: "a positive preference towards an established topic",
  "not like": "a negative preference towards an established topic",
  love: "a strong positive preference",
  sport: "sport as an activity or interest",
  run: "running as an activity or interest",
  read: "reading as an activity or interest",
  cook: "cooking as an activity or interest",
  weather: "weather as the topic of a description or question",
  sun: "sun or sunny weather in context",
  rain: "rain or raining weather in context",
  cold: "cold temperature or weather",
  hot: "hot temperature or weather",
  wind: "wind or windy weather",
  summer: "the season summer",
  winter: "the season winter",
  "fingerspell please": "a request for a name or unknown word to be fingerspelled",
  "own-name fingerspelling": "using the BSL two-handed alphabet to fingerspell your own name clearly",
  "numbers 0–10": "the numbers zero to ten as one consistent documented regional BSL system",
  "got it": "confirmation that the repaired meaning is now understood",
  happened: "asking or stating what happened in a story",
  feel: "asking or stating a feeling",
  finish: "the end or outcome of an event or task",
  "my turn": "claiming or marking the signer’s turn",
  copy: "an instruction to copy a demonstrated action or sign",
  attention: "gaining or holding visual attention",
  yes: "an affirmative response in the current interaction",
  no: "a negative response in the current interaction",
  please: "politeness within a request, not a substitute for a clear request structure",
  sorry: "an apology or expression of regret in the current situation",
  okay: "being all right or acceptable in the current situation",
  more: "requesting an additional amount of an established item or activity",
  toilet: "the toilet or a private request to use it",
  different: "a contrast between two established things or ideas",
  same: "a similarity between two established things or ideas",
  correct: "feedback that an answer or action is correct in the current task",
  pain: "physical pain or hurt located in the current context",
  ill: "feeling or being unwell",
  hungry: "the physical state of needing food",
  thirsty: "the physical state of needing a drink",
  play: "play as an activity or invitation",
  join: "joining an established person, group or activity",
  together: "people acting as an established group",
  choose: "selecting from visible or established alternatives",
  agree: "sharing the same view about an established idea",
  tell: "communicating information to an established person",
  first: "the first stage in an established sequence",
  next: "the next stage in an established sequence",
  then: "the following event in an established sequence",
  before: "an event placed earlier than another event",
  after: "an event placed later than another event",
  think: "thinking about an established question or idea",
  know: "knowing or having understood established information",
  story: "a narrative or connected sequence of events",
  character: "a person or figure established inside a story",
  beginning: "the opening part of an established sequence or story",
  centre: "the middle part of an established sequence or space",
  end: "the closing part of an established sequence or story",
  predict: "offering a prediction about what may happen next",
  writing: "writing as a classroom subject or activity",
  face: "the face as a visible part of signed communication and visual access",
  pencil: "a pencil used as classroom equipment",
  pen: "a pen used as classroom equipment",
  scissors: "scissors used as classroom equipment",
  circle: "a circular shape in a geometry or object-description task",
  square: "a square shape in a geometry or object-description task",
  classroom: "the classroom as an established school place",
  access: "communication access created through the environment and agreed support",
  direct: "addressing the intended person directly",
  interpreter: "a qualified interpreter in the current communication context",
};

const QUESTION_TERMS = new Set(["who", "what", "where", "when", "why", "how", "which", "how many", "question"]);
const FEELING_TERMS = new Set(["happy", "sad", "worried", "angry", "tired", "excited", "fine", "love", "like", "not like"]);
const TIME_TERMS = new Set(["today", "yesterday", "tomorrow", "morning", "afternoon", "evening", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "year"]);
const DIRECTIONAL_TERMS = new Set(["help", "show me", "give", "ask", "tell", "look", "visit", "phone"]);
const REPAIR_TERMS = new Set(["again", "slower", "not understand", "don't understand", "which sign", "fingerspell please", "got it", "understand"]);

function signSlug(term) {
  const exact = EXACT_MODEL_ROUTES[term] || EXACT_MODEL_ROUTES[term.toLowerCase()];
  if (!exact)
    throw new Error(`No checked comparison-page route for core item “${term}”`);
  return exact;
}

function itemGuidance(term, lesson) {
  const lower = term.toLowerCase();
  const override = SIGN_OVERRIDES[term] || SIGN_OVERRIDES[lower] || {};
  if (term === "own-name fingerspelling") {
    return {
      meaning: TERM_MEANINGS[term],
      use: "Use the official alphabet system to practise your own name and fixed non-identifying sample names. Do not enter or rehearse the child’s name in the app.",
      watch: "Study only the letters needed for the current name. Notice exact contact points, dominant-hand movement and the shortest transition between consecutive letters.",
      clue: "Form the first letter accurately, add one transition at a time, then rebuild the whole name as one rhythmic unit.",
      contrast: "Fingerspelling supports names, places, brands and unfamiliar terms. It does not replace established signs, and it does not create a name sign.",
      url: LEARNING_SOURCES.fingerspelling.url,
      source: "UCL BSL SignBank two-handed alphabet",
    };
  }
  if (term === "numbers 0–10") {
    return {
      meaning: TERM_MEANINGS[term],
      use: "Practise the set in classroom contexts such as quantities, pages, groups and turns. Keep one documented regional system consistent today while learning to recognise alternatives.",
      watch: "Compare selected fingers, palm orientation and movement across the set. Group the practice into 0–5 and 6–10 rather than treating eleven forms as one rapid list.",
      clue: "Retrieve 0–5 first, reset the hand, then retrieve 6–10. Put any missed value into the review note instead of restarting the whole set.",
      contrast: "Regional number variants can be valid. Do not blend versions or treat a written numeral as receptive BSL evidence.",
      url: LEARNING_SOURCES.numbers.url,
      source: "UCL BSL SignBank regional number signs",
    };
  }
  if (/^[A-Z]$/.test(term) && term !== "I") {
    return {
      meaning: `the BSL fingerspelled letter ${term}`,
      use: "Use fingerspelling for names, place names, brands or a word whose sign is not known—not as a substitute for every established sign.",
      watch: "Look at the exact contact point or hand relationship, then watch the shortest transition into the next letter.",
      clue: `Rebuild only the letter ${term} as a still shape. Keep your chosen dominant hand consistent.`,
      contrast: "Do not mouth the letter name one character at a time; in a word, mouth the whole word naturally.",
      url: LEARNING_SOURCES.fingerspelling.url,
      source: "UCL BSL SignBank fingerspelling",
    };
  }
  if (/^\d+$/.test(term)) {
    return {
      meaning: `the number ${term} in today’s context`,
      use: "Use the number with a visible context such as age, quantity, time, price or score so it is not an unexplained handshape.",
      watch: "Compare palm orientation, selected fingers and any movement. Notice regional alternatives without mixing versions inside one practice round.",
      clue: `Show the quantity ${term} with ordinary fingers first, then retrieve the BSL form you selected.`,
      contrast: "A different regional version is not automatically an error. Observe one documented regional system consistently today; qualified feedback is still required.",
      url: LEARNING_SOURCES.numbers.url,
      source: "UCL BSL SignBank number signs",
    };
  }
  let watch = "Watch the starting handshape, location and path of movement. Then replay once to notice the face, mouth pattern or body posture that belongs with the meaning.";
  let clue = `Put “${term}” into today’s smallest meaning block before trying to recall the sign.`;
  let contrast = "Choose the entry that matches today’s meaning; an English word can lead to several unrelated BSL signs.";
  if (QUESTION_TERMS.has(lower)) {
    watch = "Observe the recorded manual examples and visible variation. The external page does not supply a reviewed connected-question span or certify its non-manual features.";
    clue = `Identify the information gap associated with “${term}”, then mark connected ordering and facial scope as pending qualified review.`;
    contrast = "A manual question item is not a complete BSL question. Do not infer connected ordering or non-manual scope from the English label or citation page.";
  } else if (FEELING_TERMS.has(lower)) {
    watch = "Watch the face and body from the first frame. The non-manual expression is part of the meaning, not decoration added after the hand movement.";
    clue = `Adopt the feeling or attitude first, then retrieve “${term}” without mouthing a full English sentence.`;
    contrast = "Do not use one fixed smile or frown for every feeling; expression, intensity and context need to agree.";
  } else if (TIME_TERMS.has(term) || TIME_TERMS.has(lower)) {
    watch = "Notice where the sign sits on the BSL time line and whether its movement points behind, at or ahead of the signer’s current time.";
    clue = `Place the time “${term}” before the event in your mental plan, then retrieve its sign.`;
    contrast = "Time-first is a useful beginner planning frame, not a rule that every BSL sentence must follow identically.";
  } else if (DIRECTIONAL_TERMS.has(lower)) {
    watch = "Observe the citation examples and their start and end points. The page does not verify a classroom-specific directional construction.";
    clue = `Identify who would act towards whom for “${term}”, then record that a fluent connected model is still required.`;
    contrast = "Do not turn a neutral comparison-page example into a directional construction without a qualified model and feedback.";
  } else if (REPAIR_TERMS.has(lower)) {
    watch = "Notice the pause, eye contact and facial signal that hold the turn while the signer requests clarification or confirms understanding.";
    clue = `Picture a real communication breakdown, keep eye contact, and retrieve the repair meaning “${term}”.`;
    contrast = "Repair is successful participation, not an apology or a sign of failure. Keep the interaction open for the reply.";
  } else if (["I", "you", "we", "they", "person", "friend", "family"].includes(term)) {
    watch = "Watch the relationship between pointing, eye gaze and the location already assigned to the person or group.";
    clue = `Establish the person first, hold that location, then retrieve the reference for “${term}”.`;
    contrast = "Pointing in BSL can be grammatical. Avoid moving a person’s location halfway through the message.";
  }
  return {
    meaning:
      override.sense ||
      TERM_MEANINGS[term] ||
      TERM_MEANINGS[lower] ||
      `the intended “${term}” sense inside today’s communication task`,
    use: `Rehearse this individual intended meaning for self-comparison only. The classroom goal is: ${lesson.use}`,
    watch,
    clue,
    contrast,
    url: `https://www.signbsl.com/sign/${signSlug(term)}`,
    source: "SignBSL comparison dictionary",
  };
}

const KNOWLEDGE_PACKS = [
  {
    enquiry: "How does BSL carry meaning beyond the hands?",
    source: ["signatureLevel1", "signbank"],
    terms: ["hello", "name", "A", "B"],
    teach: [
      { title: "A language, not coded English", body: "BSL has its own vocabulary and grammar. A signer organises meaning visually through signs, space, movement, eye gaze, face and body; copying every English word in English order produces Signed Supported English rather than natural BSL.", example: "Plan the meaning HELLO · ME · NAME · W-I-L-L, not the English sentence word by word.", avoid: "Do not treat facial expression as acting added after the ‘real’ hand signs." },
      { title: "The listener needs visual access", body: "Attention is part of the communication event. Establish gaze before signing, keep the face and hands visible, and pause while attention moves between a person, an object and your signing.", example: "Wave within the person’s sightline, wait for gaze, then begin.", avoid: "Do not sign a key instruction while the other person is looking down or while you turn away." },
      { title: "Variation is normal", body: "BSL varies by region, age, community and context. A dictionary may show several accepted forms. Choose one clear form for today, record whose model you followed, and learn to recognise alternatives.", example: "Two different recorded signs for the same colour can both belong to BSL.", avoid: "Do not call a variant wrong simply because it differs from the first clip you saw." },
    ],
    checks: [
      { q: "Which part can carry grammatical meaning in BSL?", options: ["Hands only", "Hands, face, body, gaze and space", "English lip movements only"], answer: 1, explain: "BSL is visual-spatial. Manual and non-manual features work together." },
      { q: "What should happen before the first sign?", options: ["Begin immediately", "Establish visual attention", "Look down at your hands"], answer: 1, explain: "A visually unavailable message has not truly been offered to the other person." },
    ],
    phrases: [
      { meaning: "Hello. My name is Will.", gloss: "HELLO · ME NAME W-I-L-L", build: "Gain attention → greeting → point to self → NAME → fingerspell the whole name.", focus: "Return your gaze to the other person after fingerspelling." },
      { meaning: "I am learning BSL.", gloss: "ME LEARN BSL", build: "Establish self → LEARN → BSL. Keep it as one meaning block.", focus: "Do not insert every English function word." },
    ],
    reception: { title: "See the whole message first", setup: "Open the HELLO model. Cover the written label once the clip begins.", passes: ["Watch once for the social meaning only.", "Watch again for starting location and movement.", "Watch a third time for the face and gaze."], evidence: "Before replaying, reproduce the greeting and state which non-manual feature made it readable." },
  },
  {
    enquiry: "How do clear letter shapes become readable fingerspelling?",
    source: ["fingerspelling", "signatureNotes"],
    terms: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    teach: [
      { title: "Build shapes before speed", body: "A receiver needs stable contact points and economical transitions. Form each letter accurately, release tension, then move directly into the next shape; speed comes after clarity.", example: "Practise CAB as C → direct transition → A → direct transition → B.", avoid: "Do not bounce the hands back to a neutral position between every letter." },
      { title: "Keep one dominant hand", body: "Use the same dominant hand throughout a fingerspelled word. Many BSL letters use both hands, so the non-dominant hand provides a stable place while the dominant hand selects or moves.", example: "Choose the right- or left-handed chart that matches your signing hand.", avoid: "Do not mirror the clip accidentally and then switch hands mid-word." },
      { title: "Read the word, not isolated letters", body: "Fingerspelling is received through shape, movement, rhythm and context. Look for the first letter, last letter and overall word pattern before chasing every middle letter.", example: "For CAB, catch C, notice the short three-letter rhythm, then confirm B.", avoid: "Do not mouth each letter name; mouth the whole word naturally when spelling a word." },
    ],
    checks: [
      { q: "What is the best first goal?", options: ["Maximum speed", "Stable accurate shapes", "Large movements"], answer: 1, explain: "Accurate shapes and direct transitions create readable speed later." },
      { q: "Which hand should change during a word?", options: ["Swap whenever tired", "Keep the chosen dominant hand", "Always copy the video as a mirror"], answer: 1, explain: "Hand consistency is a core beginner expectation." },
    ],
    phrases: [
      { meaning: "CAB, BED, FILM", gloss: "C-A-B · B-E-D · F-I-L-M", build: "Make one word at a time. Pause between words, not between every letter.", focus: "Keep the spelling window compact and the rhythm even." },
      { meaning: "My name begins with W.", gloss: "ME NAME FIRST W", build: "Point to self → NAME → FIRST → W.", focus: "Hold W long enough to be seen before relaxing." },
    ],
    reception: { title: "Catch the outside letters", setup: "Use SignBank’s fingerspelling practice with three-letter words at slow speed.", passes: ["First viewing: record only the first letter.", "Second viewing: add the last letter.", "Third viewing: recover the middle."], evidence: "Identify two words without copying them while they play." },
  },
  {
    enquiry: "How do you complete the alphabet without losing rhythm?",
    source: ["fingerspelling", "signatureNotes"],
    terms: ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    teach: [
      { title: "Movement letters still need boundaries", body: "Some letters include a path or repeated action. The movement must remain compact enough that the receiver can see where one letter ends and the next begins.", example: "Pause the final position of a moving letter for a fraction before transitioning.", avoid: "Do not draw an oversized shape in the air." },
      { title: "Use bridge pairs", body: "Practise the transition that causes the difficulty, not the whole alphabet again. Pair an old letter with a new one and repeat the bridge slowly.", example: "Use M–N, L–O, A–P and E–R as short transition drills.", avoid: "Do not restart the whole word after one unclear letter; repair and continue." },
      { title: "Reception needs prediction", body: "Names and places supply context. If you miss one letter, hold the partial pattern, watch the rest, then ask for repetition rather than abandoning the word.", example: "For L-O-N-D-O-N, first notice length and repeated O/N patterns.", avoid: "Do not stare at the hands so narrowly that you miss the signer’s repair cue." },
    ],
    checks: [
      { q: "If one transition fails, what should you practise?", options: ["The entire alphabet", "Only the difficult bridge", "Speed"], answer: 1, explain: "Isolating the bridge gives more accurate repetitions with less fatigue." },
      { q: "What should you do after missing one received letter?", options: ["Give up", "Keep the pattern and ask for repetition", "Guess silently"], answer: 1, explain: "Repair keeps you inside the conversation." },
    ],
    phrases: [
      { meaning: "PEN, RUN, WET, YOUR", gloss: "P-E-N · R-U-N · W-E-T · Y-O-U-R", build: "Spell each word once slowly, once naturally, then once after a five-second delay.", focus: "Keep moving letters compact." },
      { meaning: "Please fingerspell that again.", gloss: "AGAIN · FINGERSPELL PLEASE", build: "Hold eye contact → AGAIN → FINGERSPELL → open response space.", focus: "The request must visibly invite the other signer to repeat." },
    ],
    reception: { title: "Hold a partial word", setup: "Use three to five-letter random words in SignBank fingerspelling practice.", passes: ["Watch without copying and keep any letters you catch.", "Replay once and add missing positions.", "Only then reveal or check the word."], evidence: "Recover two words using partial information rather than demanding perfect first-pass reception." },
  },
  {
    enquiry: "What makes a fingerspelled word readable to another person?",
    source: ["fingerspelling", "signatureNotes"],
    terms: ["name", "school", "maths", "book", "London", "teacher"],
    teach: [
      { title: "Fingerspell selectively", body: "At beginner level, fingerspelling is appropriate for names of people, places and brands, or when a sign is unknown. Established everyday signs should normally be signed rather than spelled letter by letter.", example: "Fingerspell W-I-L-L and L-O-N-D-O-N; learn the established sign for TEACHER.", avoid: "Do not fingerspell S-I-S-T-E-R or B-O-O-K simply to avoid learning the sign." },
      { title: "The whole word has rhythm", body: "Readable fingerspelling is not a row of frozen flashcards. The hand remains in a stable window while letter changes form a smooth word-sized movement pattern.", example: "Practise your name as one rhythmic unit, then pause before your place name.", avoid: "Do not bounce, restart or accelerate the difficult middle." },
      { title: "Repair protects meaning", body: "If a receiver misses a name, repeat at a clearer pace, segment only if needed, and confirm the recovered word. Communication matters more than displaying speed.", example: "W-I-L-L? — YES, W-I-L-L.", avoid: "Do not repeat at exactly the same unclear speed." },
    ],
    checks: [
      { q: "Which item is most appropriate to fingerspell?", options: ["sister", "London", "book"], answer: 1, explain: "Place names are an appropriate use of fingerspelling; common words usually have established signs." },
      { q: "What should change after a missed word?", options: ["Nothing", "Pace or segmentation", "Switch dominant hands"], answer: 1, explain: "A repair adapts the message for the receiver." },
    ],
    phrases: [
      { meaning: "My name is Will. I live in London.", gloss: "ME NAME W-I-L-L · ME LIVE L-O-N-D-O-N", build: "Name block → pause → place block.", focus: "Give each fingerspelled word its own boundary." },
      { meaning: "I am a teacher at a school.", gloss: "ME TEACHER · WORK SCHOOL", build: "Self/role → work/place.", focus: "Use established signs for TEACHER and SCHOOL; do not spell them." },
    ],
    reception: { title: "Recognise your own information", setup: "Record your name, workplace and city in a random order, then leave the recording for ten minutes.", passes: ["Watch with sound muted and write the first letter of each word.", "Replay and identify the complete words.", "Check the original list only at the end."], evidence: "Identify at least two of three delayed words and note the least readable transition." },
  },
  {
    enquiry: "How does a greeting become a two-person exchange?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["hello", "good morning", "how are you", "fine", "thank you", "goodbye"],
    teach: [
      { title: "Attention comes before language", body: "A greeting begins when both people have visual access. Gain attention, wait for gaze and only then offer the greeting.", example: "Wave in the sightline → eye contact → HELLO.", avoid: "Do not sign HELLO while the other person is looking away." },
      { title: "Questions occupy a span", body: "HOW-ARE-YOU is not made interrogative by the hands alone. Head, eyebrows, gaze and the held final position show that a response is expected.", example: "HELLO · YOU HOW? [hold gaze for reply].", avoid: "Do not drop the face into a neutral statement before the question ends." },
      { title: "Turn-taking is visible", body: "After signing, release the floor: pause, maintain receptive gaze and respond to what the other person actually signs. A conversation is not two memorised monologues.", example: "HOW-ARE-YOU? → pause → FINE THANK-YOU → follow-up or close.", avoid: "Do not begin GOODBYE while the other person is still responding." },
    ],
    checks: [
      { q: "What turns a greeting list into interaction?", options: ["More vocabulary", "Visible turn-taking and response", "Faster signs"], answer: 1, explain: "The exchange must leave and read response space." },
      { q: "Where should the question expression appear?", options: ["After the question", "Across the relevant question span", "Only on HOW"], answer: 1, explain: "Non-manual marking works with the whole question, not as a late decoration." },
    ],
    phrases: [
      { meaning: "Good morning. How are you?", gloss: "GOOD-MORNING · YOU HOW?", build: "Attention → greeting → point/reference → question → hold for reply.", focus: "Make the question boundary visible." },
      { meaning: "I’m fine, thank you. Goodbye.", gloss: "ME FINE · THANK-YOU · GOODBYE", build: "Answer → acknowledgement → separate closing.", focus: "Do not blend THANK-YOU and GOODBYE into one unclear movement." },
    ],
    reception: { title: "Find the turn boundary", setup: "Open a greeting model or use Mum’s signed/copy attempt without showing the label.", passes: ["Identify when attention is established.", "Identify where the question ends.", "Pause the video where the reply could begin."], evidence: "Mark all three boundaries and then reproduce the exchange with the same response space." },
  },
  {
    enquiry: "How do you organise a clear self-introduction in BSL?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["my name is", "I", "teacher", "live", "learn", "BSL"],
    teach: [
      { title: "Use meaning blocks", body: "Plan a short introduction as connected ideas rather than a written English script: greeting; name; role; place; reason for learning.", example: "HELLO · ME NAME W-I-L-L · ME TEACHER · ME LEARN BSL.", avoid: "Do not keep ‘is’, ‘am’, ‘a’ and other English function words simply because they appear in writing." },
      { title: "Fingerspelling needs a landing", body: "Pause before the name, fingerspell it clearly, then return eye gaze to the other person. The name is one unit inside the wider introduction.", example: "NAME → slight pause → W-I-L-L → gaze returns.", avoid: "Do not rush the name because the surrounding signs feel easier." },
      { title: "Invite a reply", body: "A useful introduction ends with a question or visible response space. The goal is interaction, not a performance delivered at someone.", example: "ME LEARN BSL · YOU?", avoid: "Do not look down at your prompt immediately after asking." },
    ],
    checks: [
      { q: "Which plan is most useful?", options: ["Every English word", "Greeting → name → role → place", "Alphabet first"], answer: 1, explain: "Meaning blocks reduce dependence on English structure." },
      { q: "What follows a question?", options: ["Look away", "Visible response space", "Repeat immediately"], answer: 1, explain: "The other person needs a clear turn." },
    ],
    phrases: [
      { meaning: "Hello, my name is Will. I’m a teacher.", gloss: "HELLO · ME NAME W-I-L-L · ME TEACHER", build: "Greeting block → name block → role block.", focus: "Keep one calm pause between blocks." },
      { meaning: "I live in Sydney and I’m learning BSL. Where do you live?", gloss: "ME LIVE S-Y-D-N-E-Y · ME LEARN BSL · YOU LIVE WHERE?", build: "Place → learning → WH-question.", focus: "Keep the WH non-manual pattern through the final question." },
    ],
    reception: { title: "Recover the order of ideas", setup: "Record your introduction once, then watch it without the written plan.", passes: ["List only the ideas you can see in order.", "Replay for the name and place.", "Replay for question marking and response space."], evidence: "All intended meaning blocks are recoverable without listening to speech." },
  },
  {
    enquiry: "How does signing space keep people clear?",
    source: ["signatureNotes", "signbank"],
    terms: ["I", "you", "person", "friend", "family", "we", "they"],
    teach: [
      { title: "Establish before referring", body: "Introduce a person or group and assign a stable location. Later pointing and eye gaze can return to that location without repeating the name.", example: "FRIEND [place left] · TEACHER [place right] · INDEX-left HAPPY.", avoid: "Do not assign both people to the same vague centre point." },
      { title: "Location is meaningful memory", body: "Signing space is not a stage prop. It tracks participants, objects and relationships so the receiver can follow who is involved.", example: "Once MUM is placed left, keep later reference to Mum on the left.", avoid: "Do not swap locations when your dominant hand changes direction." },
      { title: "Eye gaze supports reference", body: "A point becomes clearer when gaze, head and prior context agree. Respectful pointing in BSL can be grammatical and need not copy hearing-culture avoidance of pointing.", example: "Look briefly towards the established locus, then return to the receiver.", avoid: "Do not stare at an absent locus so long that you lose the conversation partner." },
    ],
    checks: [
      { q: "When can you point back to a person’s location?", options: ["Before introducing them", "After establishing them", "Only after fingerspelling"], answer: 1, explain: "The receiver needs the location-to-person link first." },
      { q: "What must remain stable?", options: ["The assigned locus", "The English sentence", "The exact body angle"], answer: 0, explain: "Stable loci make later reference recoverable." },
    ],
    phrases: [
      { meaning: "My friend is a teacher. They live there.", gloss: "FRIEND MINE [place-left] · TEACHER · INDEX-left LIVE THERE", build: "Identify → place → describe → point back.", focus: "Keep the friend’s location unchanged." },
      { meaning: "We are learning BSL; they are learning English.", gloss: "WE LEARN BSL · THEY [place-right] LEARN ENGLISH", build: "Establish the two groups, then contrast them.", focus: "Shift gaze enough to mark the contrast, not so far that the viewer loses your face." },
    ],
    reception: { title: "Follow two people", setup: "Place Friend on one side and Family on the other, then record four mixed references.", passes: ["Watch once and point to the locus you think is active.", "Replay for gaze and pointing agreement.", "Check whether any locus moved."], evidence: "Recover all four referents without names being repeated." },
  },
  {
    enquiry: "How do number signs stay clear when the context changes?",
    source: ["numbers", "signatureNotes"],
    terms: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    teach: [
      { title: "Learn the regional system you see", body: "Number forms vary across the UK. Use corpus examples to choose one consistent model for 0–12 while also noticing that another region may use a different orientation or movement.", example: "Record ‘model chosen: London/teacher’s version’ rather than ‘the only correct version’.", avoid: "Do not combine parts of several variants into a new form." },
      { title: "A number needs a referent", body: "A bare number can mean age, quantity, time, price or score. Establish the context first or immediately after the number.", example: "AGE 8; BOOK 5; TIME 12.", avoid: "Do not assume a receiver knows which quantity you mean." },
      { title: "Reception is separate from production", body: "Being able to make a number does not prove you can recognise it. Watch shuffled real signed models and identify meaning before copying.", example: "View 3, 8 and 11 in random order and write the values.", avoid: "Do not call written numerals receptive BSL practice." },
    ],
    checks: [
      { q: "Why might two number clips differ?", options: ["One must be fake", "Regional variation", "Numbers have no rules"], answer: 1, explain: "The BSL Corpus documents regional number variants." },
      { q: "Which is receptive practice?", options: ["Signing written 8", "Watching a signed number and identifying it", "Counting aloud"], answer: 1, explain: "Reception begins with signed input." },
    ],
    phrases: [
      { meaning: "I have five books.", gloss: "BOOK 5 · ME HAVE", build: "Establish object/quantity → owner.", focus: "Keep BOOK and 5 visually separate." },
      { meaning: "Are there eight books?", gloss: "BOOK 8?", build: "Previously learned object → quantity → yes/no non-manual pattern.", focus: "Hold the final question space for a reply." },
    ],
    reception: { title: "Identify before copying", setup: "Use SignBank regional number clips for six shuffled values from 0–12.", passes: ["Watch once and write only the value.", "Replay and note orientation or movement.", "Copy only after committing to an answer."], evidence: "Identify at least four of six values and save the two least secure for tomorrow." },
  },
  {
    enquiry: "How do number patterns express age, year, price and quantity?",
    source: ["numbers", "signatureNotes"],
    terms: ["20", "30", "40", "50", "60", "70", "80", "90", "100", "age", "year", "how many"],
    teach: [
      { title: "Do not invent a pattern", body: "Tens and larger numbers may not behave exactly as an English-speaking learner predicts. Learn the anchor forms from a reliable model before combining them.", example: "Secure 20, 30 and 40 before building mixed numbers.", avoid: "Do not assume every tens form is simply the unit sign plus zero." },
      { title: "Context can alter interpretation", body: "Age, years, money, clock time and cardinal quantity are different meanings. Put the number into a complete visual question or answer.", example: "YOU AGE HOW-MANY? / ME AGE 35.", avoid: "Do not drill 35 in isolation and assume it will transfer automatically." },
      { title: "Group long numbers", body: "Use a readable rhythm and tiny boundaries between meaningful groups. The receiver should be able to hold the tens before the units arrive.", example: "30 + 5 as one number, then a larger pause before the next number.", avoid: "Do not sign every digit as a disconnected item unless spelling a code truly requires it." },
    ],
    checks: [
      { q: "What should you learn first?", options: ["Random 2-digit numbers", "Reliable tens anchors", "Speed"], answer: 1, explain: "Stable anchors make later combinations more dependable." },
      { q: "What makes 35 understandable?", options: ["Only handshape", "Number form plus context", "Mouthing English loudly"], answer: 1, explain: "Context distinguishes age, price, quantity and other uses." },
    ],
    phrases: [
      { meaning: "How old are you? I am 35.", gloss: "YOU AGE HOW-MANY? · ME AGE 35", build: "Question → response space → self + age.", focus: "Keep the WH-question marking through HOW-MANY." },
      { meaning: "The bus costs £2 and arrives at 10.", gloss: "BUS PRICE £2 · ARRIVE TIME 10", build: "Transport/topic → price → arrival/time.", focus: "Separate money and clock-time contexts clearly." },
    ],
    reception: { title: "Distinguish number contexts", setup: "Record six number messages: two ages, two quantities and two times, then shuffle playback.", passes: ["Identify the number.", "Identify its context.", "Replay for grouping and boundaries."], evidence: "Recover both value and context for four of six messages." },
  },
  {
    enquiry: "How do colour signs describe real things rather than form a list?",
    source: ["colours", "signbank"],
    terms: ["red", "blue", "green", "yellow", "black", "white", "light", "dark"],
    teach: [
      { title: "Colour is attached to a referent", body: "Establish the object, person or area being described, then add colour. The receiver should not have to guess what the colour belongs to.", example: "BOOK [point-left] BLUE.", avoid: "Do not recite colour vocabulary with no visible object or locus." },
      { title: "Variation is especially visible here", body: "BSL SignBank documents regional variants for colour signs. Choose a model used by your teacher or community and learn to recognise other common forms.", example: "Label your chosen model by source or region in your note.", avoid: "Do not blend two colour variants into one movement." },
      { title: "Contrast sharpens description", body: "LIGHT/DARK and two nearby colours become clearer when placed against real contrasting examples.", example: "SHIRT BLUE DARK; BOOK BLUE LIGHT.", avoid: "Do not exaggerate intensity with an unrelated facial expression." },
    ],
    checks: [
      { q: "What should come before or with a colour?", options: ["A clear referent", "An English article", "A finger count"], answer: 0, explain: "Colour has to be attached to something visible or established." },
      { q: "What does a second regional form mean?", options: ["Automatic error", "A variant to recognise", "ASL"], answer: 1, explain: "Corpus evidence shows regional BSL variation." },
    ],
    phrases: [
      { meaning: "That book is dark blue.", gloss: "BOOK THERE · BLUE DARK", build: "Point/place object → colour → shade.", focus: "Keep the point and description anchored to the same object." },
      { meaning: "I want the red one, not the green one.", gloss: "RED [left] ME WANT · GREEN [right] NOT", build: "Place alternatives → preference → contrast/negation.", focus: "Use gaze and body shift to keep the two options separate." },
    ],
    reception: { title: "Recognise a regional colour", setup: "Use the SignBank colour page or quiz and select four corpus examples.", passes: ["Guess the meaning before copying.", "Notice the region information after answering.", "Compare two variants for the same colour."], evidence: "Identify three of four colours and explain one genuine variation without calling it wrong." },
  },
  {
    enquiry: "How does placement make a family description easy to follow?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["mother", "father", "parent", "brother", "sister", "child", "partner", "friend"],
    teach: [
      { title: "Map the family first", body: "Use a simple visual map and assign each person a stable locus. Establish relationships before adding details.", example: "MOTHER [left] · BROTHER [right] · CHILD [lower-centre].", avoid: "Do not introduce eight people without a spatial plan." },
      { title: "Reference replaces repetition", body: "After a person is established, pointing and gaze can refer back to them. Repeating every relationship label makes the message heavier and less visual.", example: "SISTER [place-right] · INDEX-right TEACHER.", avoid: "Do not move the sister to a new location when adding her job." },
      { title: "Identity is not a guessing task", body: "Use the relationships and labels people choose for themselves. Avoid assuming gender, family structure or preferred terminology from appearance.", example: "Ask or follow the model offered by the person/community.", avoid: "Do not turn family vocabulary into a rigid template for every household." },
    ],
    checks: [
      { q: "What should happen after placing ‘sister’ on the right?", options: ["Keep later references right", "Move her to centre", "Repeat SISTER every time"], answer: 0, explain: "A stable locus carries reference." },
      { q: "How should labels be chosen?", options: ["By assumption", "From the person/context", "By English word order"], answer: 1, explain: "Respectful description follows people’s own identities and the communication context." },
    ],
    phrases: [
      { meaning: "My sister is a teacher and my brother is a student.", gloss: "SISTER MINE [right] TEACHER · BROTHER MINE [left] STUDENT", build: "Relationship → possessive/reference → place → detail.", focus: "Maintain the two loci through the contrast." },
      { meaning: "My partner and I have one child.", gloss: "PARTNER MINE + ME · CHILD 1", build: "Establish pair → child/quantity.", focus: "Use an inclusive WE locus only after both people are clear." },
    ],
    reception: { title: "Reconstruct a family map", setup: "Record a four-person fictional family description with stable loci.", passes: ["Draw the people where you see them placed.", "Replay and add one fact per person.", "Check every later point against your map."], evidence: "Your reconstructed map matches all four references without relying on speech." },
  },
  {
    enquiry: "Why are feelings incomplete without non-manual meaning?",
    source: ["signatureNotes", "signbank"],
    terms: ["happy", "sad", "worried", "angry", "tired", "excited", "fine"],
    teach: [
      { title: "The face is linguistic", body: "In BSL, the head, eyebrows, eyes, cheeks, mouth and body can carry description, emotion, question type, negation and intensity. They are not optional performance extras.", example: "TIRED with a bright excited face gives conflicting information.", avoid: "Do not complete the hand sign first and paste an expression on afterwards." },
      { title: "Intensity is gradient", body: "Body tension, movement quality and non-manual features can show a weak or strong degree. The whole signal must remain coordinated.", example: "A little worried and extremely worried should not look identical.", avoid: "Do not make every strong feeling simply larger and faster." },
      { title: "Respond to the person", body: "A feelings exchange needs receptive attention and an appropriate follow-up, not just labels. Watch the answer before choosing your next question.", example: "YOU FEEL HOW? → response → WHY?/SUPPORT.", avoid: "Do not look at the next written prompt while the other person answers." },
    ],
    checks: [
      { q: "When should facial meaning begin?", options: ["After the hand sign", "With the relevant sign/span", "Only during recording"], answer: 1, explain: "Manual and non-manual features are coordinated." },
      { q: "What shows a genuine exchange?", options: ["Seven feeling signs", "A response and follow-up", "Speaking the English word"], answer: 1, explain: "Conversation uses the information the other person gives." },
    ],
    phrases: [
      { meaning: "How are you feeling today?", gloss: "TODAY · YOU FEEL HOW?", build: "Time → person → feeling/WH-question.", focus: "Carry the WH marking across the question and wait." },
      { meaning: "I’m tired but happy.", gloss: "ME TIRED · BUT HAPPY", build: "Self → first state → contrast → second state.", focus: "Let the face change with the contrast instead of holding one expression." },
    ],
    reception: { title: "Read the non-manual channel", setup: "Record three feeling signs twice: once accurately and once with a deliberately mismatched face.", passes: ["Watch the face only and guess the feeling.", "Watch the hands only.", "Watch the full signal and identify the mismatch."], evidence: "Explain which channel caused the ambiguous version and repair it." },
  },
  {
    enquiry: "How can a viewer see what kind of question you are asking?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["who", "what", "where", "when", "why", "how", "which"],
    teach: [
      { title: "Question type changes the face", body: "Closed yes/no questions and open information questions use different non-manual patterns. Learn the pattern from a qualified model and hold it across the relevant question span.", example: "YOU TEACHER? differs visibly from YOU WORK WHERE?", avoid: "Do not rely on a final question sign while the rest of the face stays neutral." },
      { title: "The question sign belongs to the meaning", body: "WH signs such as WHO, WHERE and WHY ask for different information. Place them according to the BSL model you are learning rather than copying English syntax automatically.", example: "YOU LIVE WHERE? is a useful beginner planning frame.", avoid: "Do not assume every regional signer uses identical ordering." },
      { title: "A question creates a turn", body: "Eye gaze, a slight hold and body availability show that the addressee should answer. If you immediately continue, the question becomes hard to participate in.", example: "WHERE? [hold] → receive → follow up.", avoid: "Do not answer your own question because the pause feels uncomfortable." },
    ],
    checks: [
      { q: "What distinguishes a visible question?", options: ["Manual sign alone", "Manual and non-manual pattern plus response space", "English word order"], answer: 1, explain: "The question spans several coordinated channels." },
      { q: "What should you do after asking?", options: ["Continue your script", "Yield the turn", "Look at your hands"], answer: 1, explain: "The addressee needs a visible invitation to answer." },
    ],
    phrases: [
      { meaning: "Where do you live?", gloss: "YOU LIVE WHERE?", build: "Addressee → action/state → WH sign.", focus: "Maintain the question pattern until the final hold." },
      { meaning: "Which colour do you like, blue or green?", gloss: "BLUE [left] · GREEN [right] · YOU LIKE WHICH?", build: "Place choices → addressee/preference → WHICH.", focus: "Keep both options available in space while asking." },
    ],
    reception: { title: "Classify the question before translating", setup: "Record one yes/no question and two WH questions without speech.", passes: ["Decide closed or open from the face and timing.", "Identify the WH sign.", "Only then state the full English meaning."], evidence: "Correctly classify all three question types before replay." },
  },
  {
    enquiry: "How does time organise a visual message?",
    source: ["signatureNotes", "signbank"],
    terms: ["today", "yesterday", "tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    teach: [
      { title: "Establish time early", body: "A useful beginner structure is to set the time frame before the event. Once TODAY, TOMORROW or a day is established, later signs can be interpreted inside that frame until it changes.", example: "TOMORROW · ME WORK SCHOOL.", avoid: "Do not repeat TOMORROW before every sign in the same short event." },
      { title: "BSL uses spatial timelines", body: "Time can be represented along lines in signing space, with past, present and future relationships visible in placement and movement. Learn the exact form from a model rather than inventing a gesture.", example: "Compare YESTERDAY, TODAY and TOMORROW as a set.", avoid: "Do not assume every time sign simply points behind or ahead." },
      { title: "Dates combine systems", body: "A clear date may combine day name, date number and month information. Separate each component enough for reception and keep your chosen regional number system consistent.", example: "MONDAY · DATE 3 · AUGUST.", avoid: "Do not run day and number together without a boundary." },
    ],
    checks: [
      { q: "What can happen after setting TOMORROW?", options: ["The frame can carry through the event", "Repeat it every sign", "Forget the event"], answer: 0, explain: "An established time frame reduces unnecessary repetition." },
      { q: "How should a date be signed?", options: ["As one blur", "With readable component boundaries", "Only fingerspelled"], answer: 1, explain: "The receiver needs day/date/month components to remain recoverable." },
    ],
    phrases: [
      { meaning: "Tomorrow I work at school.", gloss: "TOMORROW · ME WORK SCHOOL", build: "Time → person → event/place.", focus: "Keep the rest of the message inside tomorrow’s frame." },
      { meaning: "On Friday I am not working.", gloss: "FRIDAY · ME WORK NOT", build: "Day → person/event → negation.", focus: "Coordinate head/body negation with NOT." },
    ],
    reception: { title: "Catch time before detail", setup: "Record four short messages beginning with different days or time signs.", passes: ["Write only the time frame.", "Replay and add the action.", "Replay and check whether the frame changed."], evidence: "Recover all four time frames before translating the events." },
  },
  {
    enquiry: "How do routines become a visual sequence rather than a word list?",
    source: ["signatureLevel1", "signatureNotes"],
    terms: ["morning", "afternoon", "evening", "wake up", "eat", "work", "go home", "sleep"],
    teach: [
      { title: "Anchor the period", body: "Set MORNING, AFTERNOON or EVENING, then organise actions inside that time block. The viewer can follow the sequence without every English connector.", example: "MORNING · WAKE-UP · EAT · WORK.", avoid: "Do not sign ‘then’ mechanically between every action." },
      { title: "Movement and body can show action", body: "Action signs often carry meaningful rhythm and mouth patterns. Copy the full model, not only the handshape.", example: "WORK and SLEEP should remain visually distinct even in a faster routine.", avoid: "Do not mouth a full English narration to hold the sequence together." },
      { title: "Sequence needs boundaries", body: "Use short holds, changes in body orientation or established time blocks to show where one part ends and another begins.", example: "MORNING [block] … AFTERNOON [new block] …", avoid: "Do not stop so long between every sign that the routine loses flow." },
    ],
    checks: [
      { q: "What organises a routine most clearly?", options: ["English articles", "Time blocks and visual sequence", "Fingerspelling every action"], answer: 1, explain: "Visual time framing supports coherence." },
      { q: "What should be copied from an action model?", options: ["Hands only", "Full manual and non-manual form", "English pronunciation"], answer: 1, explain: "Movement quality and non-manual features contribute to meaning." },
    ],
    phrases: [
      { meaning: "In the morning I wake up, eat and go to work.", gloss: "MORNING · ME WAKE-UP · EAT · GO WORK", build: "Time block → person → ordered actions.", focus: "Keep actions connected but distinguishable." },
      { meaning: "In the evening I go home and sleep.", gloss: "EVENING · ME GO-HOME · SLEEP", build: "New time block → person → two actions.", focus: "Reset the time frame visibly before the evening sequence." },
    ],
    reception: { title: "Rebuild the order", setup: "Record a five-action routine, wait five minutes, then watch silently.", passes: ["Write the time block.", "Draw five empty boxes and fill actions in order.", "Replay only to repair missing boxes."], evidence: "Recover four of five actions in the correct order." },
  },
  {
    enquiry: "How do classroom instructions remain visible, calm and accessible?",
    source: ["ndcs", "signatureNotes"],
    terms: ["look", "wait", "stop", "sit", "stand", "again", "finished", "ready"],
    teach: [
      { title: "Gain attention respectfully", body: "Use a wave within the pupil’s sightline, an agreed visual signal or another appropriate attention method. Wait until visual attention is established before giving the instruction.", example: "Visual signal → gaze → WAIT.", avoid: "Do not shout, sign from behind or continue while the pupil looks at a resource." },
      { title: "One instruction, one pause", body: "Separate short instructions with visible pauses and check the response before adding another. This reduces the burden of watching hands, face, objects and peers at once.", example: "STAND [pause/check] · LOOK [pause/check] · READY?", avoid: "Do not sign a long chain while moving around the room." },
      { title: "Environment is part of access", body: "Keep your face well lit, avoid standing with a bright window behind you, and allow pupils to see each other during discussion.", example: "Use a horseshoe or clear sightlines for turn-taking.", avoid: "Do not ask a deaf pupil to watch the signer and read a worksheet simultaneously." },
    ],
    checks: [
      { q: "When should the instruction begin?", options: ["During divided attention", "After visual attention", "While facing away"], answer: 1, explain: "Access begins before the language itself." },
      { q: "What follows each instruction?", options: ["A checkable pause", "A faster instruction", "A hidden signal"], answer: 0, explain: "The pause gives processing and response space." },
    ],
    phrases: [
      { meaning: "Look at me. Wait. Are you ready?", gloss: "LOOK-ME · WAIT · READY?", build: "Attention → instruction → pause → readiness check.", focus: "Do not start the next sign until gaze returns." },
      { meaning: "Stand, move there, then sit.", gloss: "STAND · GO THERE · SIT", build: "One action → visible destination → final action.", focus: "Pause at the destination cue so it can be followed." },
    ],
    reception: { title: "Follow, then repeat", setup: "Ask Mum to choose three learnt instruction cards and show/copy them one at a time after gaining your attention.", passes: ["Carry out the action without speaking.", "Repeat the sign back.", "Ask AGAIN if one was unclear."], evidence: "Follow three instructions, using repair rather than guessing when needed." },
  },
  {
    enquiry: "How do you repair a misunderstanding without leaving the conversation?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["help", "understand", "not understand", "question", "answer", "again", "slower", "show me"],
    teach: [
      { title: "Repair is competent communication", body: "A learner is expected to request repetition or clarification. Keep eye contact, identify the problem if possible and hold the turn open for the response.", example: "SORRY · NOT-UNDERSTAND · AGAIN PLEASE.", avoid: "Do not nod as if you understood and let the conversation collapse later." },
      { title: "Ask for the repair you need", body: "AGAIN, SLOWER, FINGERSPELL, SHOW-ME and WHICH-SIGN solve different problems. Choose the smallest useful request.", example: "Caught the idea but missed the name? Ask FINGERSPELL PLEASE rather than repeating everything.", avoid: "Do not ask SLOWER when the real problem is an unknown sign." },
      { title: "Confirm the recovered meaning", body: "After the response, repeat or paraphrase the recovered information and wait for confirmation.", example: "D-U-R-H-A-M? [confirm] YES.", avoid: "Do not end repair immediately after the second viewing without checking what you recovered." },
    ],
    checks: [
      { q: "You missed only the place name. What is the best request?", options: ["Everything again", "Fingerspell the name", "Pretend to understand"], answer: 1, explain: "Specific repair is efficient and keeps the conversation moving." },
      { q: "What comes after the repair response?", options: ["Confirmation", "Look away", "Start a new topic"], answer: 0, explain: "Confirming closes the repair loop." },
    ],
    phrases: [
      { meaning: "I don’t understand. Again, please.", gloss: "SORRY · NOT-UNDERSTAND · AGAIN PLEASE", build: "Signal problem → state non-understanding → request repetition.", focus: "Keep the face open for the repeated message." },
      { meaning: "Which sign? Please show me slowly.", gloss: "SIGN WHICH? · SHOW-ME SLOW PLEASE", build: "Identify problem → specific request.", focus: "Use the WH-question pattern with WHICH." },
    ],
    reception: { title: "Choose the right repair", setup: "Mum reads one of four breakdown scenarios while you keep the BSL repair cards hidden.", passes: ["Identify what was missed: speed, sign, name or whole message.", "Produce the smallest repair request.", "Confirm the imagined answer."], evidence: "Choose an appropriate repair for three different breakdowns." },
  },
  {
    enquiry: "How can a timetable be communicated as a visual plan?",
    source: ["signatureLevel1", "ndcs"],
    terms: ["maths", "English", "science", "art", "music", "PE", "reading", "break"],
    teach: [
      { title: "Pair language with the visible timetable", body: "Place subject cards in sequence and point to the current or next slot before signing. The visual object and BSL message should support each other.", example: "NOW MATHS · NEXT BREAK · AFTER SCIENCE.", avoid: "Do not replace an accessible visual timetable with signing alone." },
      { title: "Mark NOW, NEXT and FINISH", body: "Transitions become clearer when the learner can see current activity, next activity and the boundary between them.", example: "MATHS FINISH · NEXT ART.", avoid: "Do not change the timetable orally while the visual display still shows the old plan." },
      { title: "Pre-teach specialist vocabulary", body: "Share topic-specific signs and key language with pupils and communication professionals before the lesson where possible.", example: "Provide the next science topic vocabulary in advance.", avoid: "Do not improvise technical signs and present them as established BSL." },
    ],
    checks: [
      { q: "What should accompany a signed timetable?", options: ["A visible timetable", "Nothing", "Only speech"], answer: 0, explain: "Multiple visual access routes reduce memory and attention demands." },
      { q: "What should happen with specialist signs?", options: ["Invent them", "Verify and pre-teach them", "Fingerspell everything"], answer: 1, explain: "Verified preparation protects language accuracy and access." },
    ],
    phrases: [
      { meaning: "Maths is finished. Next is break.", gloss: "MATHS FINISH · NEXT BREAK", build: "Current activity → boundary → next activity.", focus: "Point to the matching timetable slots." },
      { meaning: "After break we have science, then reading.", gloss: "BREAK AFTER · SCIENCE · NEXT READING", build: "Time relation → ordered subjects.", focus: "Keep the sequence aligned with visible cards." },
    ],
    reception: { title: "Build the timetable you receive", setup: "Lay out subject cards. Ask Mum to use your rehearsed subject signs in a three-item sequence.", passes: ["Move the cards into the received order.", "Ask AGAIN for one unclear item.", "Repeat the full sequence back."], evidence: "Reconstruct and confirm a three-subject timetable." },
  },
  {
    enquiry: "How can praise and correction remain visually clear and respectful?",
    source: ["ndcs", "signatureNotes"],
    terms: ["good", "well done", "try", "again", "careful", "kind", "share", "quiet"],
    teach: [
      { title: "Feedback needs a referent", body: "Make clear which action or person the feedback relates to. GOOD or an uncontextualised request for another attempt can be ambiguous in a busy room.", example: "Point to the specific work or action before offering feedback.", avoid: "Do not sign praise while looking at somebody else." },
      { title: "Tone is visible", body: "Face, movement quality and body posture communicate warmth, urgency or correction. Match the non-manual tone to the classroom purpose without exaggeration.", example: "CAREFUL can be calm and protective rather than angry.", avoid: "Do not use the same sharp movement for praise and correction." },
      { title: "Correction includes the next action", body: "A useful correction says what to do, not only that something is wrong. Give one clear retry instruction and then visibly yield the turn.", example: "TRY · AGAIN · SLOW [pause and offer response space].", avoid: "Do not stack several corrections before the pupil can respond." },
    ],
    checks: [
      { q: "What makes feedback specific?", options: ["Volume", "A clear person/action referent", "Speed"], answer: 1, explain: "The learner must know what the feedback concerns." },
      { q: "What should correction include?", options: ["A next action", "Only NOT", "More signs"], answer: 0, explain: "Actionable repair supports success." },
    ],
    phrases: [
      { meaning: "Your work is good. Well done.", gloss: "WORK YOUR GOOD · WELL-DONE", build: "Refer to work/person → judgement → social praise.", focus: "Coordinate warm facial tone and direct gaze." },
      { meaning: "After showing the specific part, invite another attempt and hand the task over visibly.", gloss: "[FEEDBACK REHEARSAL — TRY AND AGAIN ARE SEPARATE ITEMS]", build: "Identify the part → use only separately observed individual items → stop → offer the task and response space.", focus: "Do not treat TRY+AGAIN as one exact dictionary model or grade the learner’s BSL from this rehearsal." },
    ],
    reception: { title: "Compare the feedback attempt", setup: "Record one observed feedback item, then rehearse TRY and AGAIN as separately sourced items in a visible task context.", passes: ["Name the action the feedback refers to.", "Compare only the observable feature selected from each external example.", "Mark timing, connected delivery and non-manual scope for qualified review."], evidence: "Record one visible self-comparison change; this is not a linguistic accuracy or receptive-skill score." },
  },
  {
    enquiry: "How do food choices become a real question-and-answer exchange?",
    source: ["signatureLevel1", "signatureNotes"],
    terms: ["food", "drink", "water", "tea", "coffee", "milk", "fruit", "lunch"],
    teach: [
      { title: "Place alternatives", body: "Put two or three choices in distinct locations, then point back to them in the question and response.", example: "TEA [left] · COFFEE [right] · YOU WANT WHICH?", avoid: "Do not list choices in one indistinguishable centre space." },
      { title: "Preference is more than naming", body: "Combine the item with WANT, LIKE, NOT-LIKE or a quantity so the message communicates a decision.", example: "ME WANT WATER · COFFEE NOT.", avoid: "Do not present eight food signs and call it a conversation." },
      { title: "Confirm the selection", body: "Repeat or point to the chosen option and allow the other person to confirm. This matters when choices affect real needs.", example: "WATER? [confirm] YES.", avoid: "Do not rely on a quick nod when several choices remain visible." },
    ],
    checks: [
      { q: "How should two choices be organised?", options: ["Same locus", "Separate loci", "Only spoken"], answer: 1, explain: "Separate visual locations support selection and reference." },
      { q: "What completes a real choice?", options: ["A vocabulary list", "Selection and confirmation", "Fingerspelling"], answer: 1, explain: "The exchange must produce and verify a decision." },
    ],
    phrases: [
      { meaning: "Would you like tea or coffee?", gloss: "TEA [left] · COFFEE [right] · YOU WANT WHICH?", build: "Place options → addressee/want → WHICH.", focus: "Keep gaze available for the selection." },
      { meaning: "Water, please. I don’t like coffee.", gloss: "WATER PLEASE · COFFEE ME NOT-LIKE", build: "Choice → polite close → contrasting preference.", focus: "Coordinate negation with face/head." },
    ],
    reception: { title: "Select from signed choices", setup: "Place three drink objects/cards. Ask Mum to learn and show two item signs in random order.", passes: ["Point to the item you receive.", "Repeat the sign.", "Confirm with YES/NO if Mum changes the order."], evidence: "Make three accurate selections without seeing the English label during playback." },
  },
  {
    enquiry: "How does signing space describe a room?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["home", "room", "door", "table", "chair", "book", "phone", "key"],
    teach: [
      { title: "Create a viewpoint", body: "Choose where you are standing in the imagined room and keep that viewpoint stable while placing doors, furniture and objects.", example: "DOOR [left] · TABLE [centre] · CHAIR [right].", avoid: "Do not rotate the whole map halfway through without signalling a viewpoint change." },
      { title: "Place large anchors first", body: "Establish room and furniture before small objects. The receiver then has a map on which BOOK, PHONE and KEY can be located.", example: "TABLE [centre] first; BOOK ON-TABLE second.", avoid: "Do not place a key in empty space before the table exists." },
      { title: "Reference can carry through", body: "After an object is placed, point or direct gaze back to its locus instead of renaming it every time.", example: "BOOK [on-table] · INDEX-book MINE.", avoid: "Do not let object loci drift with each sentence." },
    ],
    checks: [
      { q: "What should be placed first?", options: ["Small key", "Large room/furniture anchors", "Every word"], answer: 1, explain: "Large anchors create the spatial frame for smaller objects." },
      { q: "What must stay consistent?", options: ["Viewpoint and loci", "English word order", "Room size"], answer: 0, explain: "Stable visual mapping makes the description followable." },
    ],
    phrases: [
      { meaning: "The table is in the centre and the chair is on the right.", gloss: "ROOM [map] · TABLE CENTRE · CHAIR RIGHT", build: "Set room → place large objects.", focus: "Use the same viewer perspective throughout." },
      { meaning: "The book is on the table; the phone is beside it.", gloss: "BOOK ON-TABLE · PHONE BESIDE", build: "Place first object → locate second relative to it.", focus: "Keep both locations available for later pointing." },
    ],
    reception: { title: "Draw the room you receive", setup: "Record a four-object room map or have Mum read the app’s placement sequence while you sign it for later playback.", passes: ["Draw only the large anchors.", "Replay and add small objects.", "Replay and check left/right from the signer’s chosen viewpoint."], evidence: "Your drawing matches all four object relationships." },
  },
  {
    enquiry: "How are routes built from landmarks, turns and confirmation?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["school", "shop", "park", "hospital", "bus", "train", "walk", "go"],
    teach: [
      { title: "Set the route map", body: "Place the start, destination and one or two landmarks before giving movement. A route is a spatial relationship, not a list of transport words.", example: "START SCHOOL [here] · PARK [ahead-left] · SHOP [beyond].", avoid: "Do not change left/right perspective without resetting the map." },
      { title: "Chunk directions", body: "Give one route segment, pause, then add the next. The receiver should repeat or trace the route back to show understanding.", example: "GO-AHEAD · LEFT · SHOP THERE?", avoid: "Do not give six turns in one uninterrupted chain." },
      { title: "Confirmation demonstrates reception", body: "Repeating the route in your own signing shows that you understood more clearly than simply nodding.", example: "UPSTAIRS · LEFT · SECOND-DOOR RIGHT?", avoid: "Do not confirm YES when you cannot reconstruct the route." },
    ],
    checks: [
      { q: "What shows you understood directions?", options: ["A nod", "Repeating/tracing the route", "Faster signing"], answer: 1, explain: "Route reconstruction provides visible receptive evidence." },
      { q: "How should a long route be delivered?", options: ["One chain", "Short chunks with pauses", "English only"], answer: 1, explain: "Chunking protects visual working memory." },
    ],
    phrases: [
      { meaning: "Where is the shop?", gloss: "SHOP WHERE?", build: "Destination/topic → WH-question.", focus: "Hold the question while awaiting the map." },
      { meaning: "Go ahead, turn left at the park; the shop is there.", gloss: "GO-AHEAD · PARK [landmark] LEFT · SHOP THERE", build: "Movement → landmark/turn → destination.", focus: "Keep the same viewpoint and show the landmark before the turn." },
    ],
    reception: { title: "Trace and repeat", setup: "Draw a simple route with three segments. Record it signed without showing the drawing.", passes: ["Trace the route on blank paper.", "Replay only the unclear segment.", "Repeat the route back in BSL."], evidence: "The repeated route reaches the correct destination." },
  },
  {
    enquiry: "How do you describe a person without reducing them to labels?",
    source: ["signatureLevel1", "signatureNotes"],
    terms: ["tall", "short", "hair", "glasses", "clothes", "young", "old"],
    teach: [
      { title: "Identify, place, then describe", body: "Establish the person or their locus before adding appearance. Group related information such as height, hair and clothing.", example: "PERSON [left] · TALL · HAIR DARK · GLASSES.", avoid: "Do not scatter details without a clear person reference." },
      { title: "Size and shape are visual", body: "Handshape, movement and signing space can depict size and shape. Copy an authentic model and keep the description proportional rather than theatrical.", example: "Use the modelled depiction for hair length or book thickness.", avoid: "Do not invent a gesture and label it established BSL." },
      { title: "Describe respectfully", body: "Use neutral, relevant details and the terms people prefer. Description should help identification or communication, not invite judgement.", example: "‘Person with glasses and a blue coat’ is functional in a locating task.", avoid: "Do not treat age, body or identity labels as comic features." },
    ],
    checks: [
      { q: "What comes before appearance details?", options: ["A person/locus", "A random colour", "An English article"], answer: 0, explain: "The viewer needs to know who is being described." },
      { q: "What is a safe use of description?", options: ["Mocking", "Identifying someone respectfully", "Guessing identity"], answer: 1, explain: "Relevant neutral description supports communication." },
    ],
    phrases: [
      { meaning: "The person on the left is tall and wears glasses.", gloss: "PERSON [left] · TALL · GLASSES", build: "Place person → height → feature.", focus: "Keep all details linked to the left locus." },
      { meaning: "Who has the blue coat?", gloss: "COAT BLUE · PERSON WHO?", build: "Visible feature/topic → person/WH-question.", focus: "Use face and gaze to invite identification." },
    ],
    reception: { title: "Identify from features", setup: "Choose three pictured fictional people. Record two neutral features for one person.", passes: ["Watch for the person’s locus.", "List the two features.", "Select the matching picture."], evidence: "Identify the intended person without spoken or written labels." },
  },
  {
    enquiry: "How do clothing descriptions connect item, colour and wearer?",
    source: ["signatureLevel1", "colours"],
    terms: ["shirt", "trousers", "dress", "shoes", "coat", "hat", "wear", "colour"],
    teach: [
      { title: "Ground signs on the body", body: "Clothing signs often relate to where an item is worn. Watch location and movement carefully, then attach colour or description to the established item.", example: "COAT · BLUE DARK rather than BLUE with no garment.", avoid: "Do not move every item to neutral space and lose its body relationship." },
      { title: "Separate wearer from item", body: "Place or identify the person, then describe what they wear. Keep reference stable when comparing two people.", example: "PERSON [left] · SHIRT RED; PERSON [right] · COAT BLUE.", avoid: "Do not swap the colours between loci during a long comparison." },
      { title: "Use contrast to check clarity", body: "Describe two outfits, then ask WHICH or WHO. A receiver’s selection reveals whether item and colour stayed linked.", example: "COAT BLUE WHO?", avoid: "Do not mark success only because you remembered all vocabulary." },
    ],
    checks: [
      { q: "What should colour attach to?", options: ["A clothing item", "Nothing", "The next sentence"], answer: 0, explain: "The viewer needs a clear item–colour relationship." },
      { q: "How can clarity be tested?", options: ["Recite faster", "Ask the viewer to identify an outfit", "Add speech"], answer: 1, explain: "A selection task provides communication evidence." },
    ],
    phrases: [
      { meaning: "I am wearing a blue shirt and black trousers.", gloss: "ME WEAR · SHIRT BLUE · TROUSERS BLACK", build: "Wearer → item/colour pair → item/colour pair.", focus: "Give each pair a visible boundary." },
      { meaning: "Which coat do you want, red or green?", gloss: "COAT RED [left] · GREEN [right] · YOU WANT WHICH?", build: "Place two garments → ask choice.", focus: "Keep variants and options distinct in space." },
    ],
    reception: { title: "Match the outfit", setup: "Lay out three outfit combinations. Record or partner-show two item–colour pairs.", passes: ["Identify the garment.", "Add the colour.", "Select the complete outfit."], evidence: "Match two complete outfits without relying on speech." },
  },
  {
    enquiry: "How do preferences create follow-up conversation?",
    source: ["signatureLevel1", "signatureNotes"],
    terms: ["like", "not like", "love", "sport", "run", "read", "music", "cook"],
    teach: [
      { title: "Topic before preference is useful", body: "Establish the activity, then show LIKE, NOT-LIKE or LOVE. This keeps the preference attached to the right topic.", example: "RUN · ME LOVE.", avoid: "Do not sign LIKE before the viewer knows what you are evaluating." },
      { title: "Degree lives across channels", body: "Preference strength can be shown through movement quality, facial expression and body posture. Learn the modelled differences rather than only adding VERY.", example: "LIKE and LOVE should differ as complete signals, not only in hand speed.", avoid: "Do not use the same neutral face for strong love and dislike." },
      { title: "Follow up from the answer", body: "Ask WHAT, WHEN, WHERE or WHY based on the person’s preference. This changes a vocabulary exchange into conversation.", example: "YOU LIKE RUN? → WHERE RUN?", avoid: "Do not ask a prewritten unrelated question after receiving an answer." },
    ],
    checks: [
      { q: "Which order keeps preference clear?", options: ["Preference then unknown topic", "Topic then preference", "Alphabetical"], answer: 1, explain: "The topic gives LIKE/NOT-LIKE a referent." },
      { q: "What should determine the follow-up?", options: ["The answer received", "The next flashcard", "English word order"], answer: 0, explain: "Responsive follow-up is a conversational skill." },
    ],
    phrases: [
      { meaning: "I love running but I don’t like cooking.", gloss: "RUN · ME LOVE · COOK · ME NOT-LIKE", build: "Topic/preference → contrast → new topic/preference.", focus: "Let face and body shift with the contrast." },
      { meaning: "Do you like reading? What do you read?", gloss: "READ · YOU LIKE? · YOU READ WHAT?", build: "Topic/closed question → response → follow-up WH-question.", focus: "Use different non-manual patterns for the two questions." },
    ],
    reception: { title: "Read preference strength", setup: "Record three activities with LIKE, LOVE or NOT-LIKE in random combinations.", passes: ["Identify the activity.", "Identify the preference from full signal.", "Replay for the non-manual evidence."], evidence: "Recover all three activity–preference pairs." },
  },
  {
    enquiry: "How does weather combine description, degree and response?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["weather", "sun", "rain", "cold", "hot", "wind", "summer", "winter"],
    teach: [
      { title: "Set time and place", body: "Weather belongs to a place and time. Establish TODAY, OUTSIDE or a location before the description when needed.", example: "TODAY · OUTSIDE RAIN · COLD.", avoid: "Do not give HOT and COLD as disconnected vocabulary." },
      { title: "Description uses non-manual degree", body: "Face, mouth pattern and movement quality can show mild, strong or unpleasant weather. Copy the whole modelled signal.", example: "Very windy should be visibly more intense than a light wind without becoming uncontrolled.", avoid: "Do not add an unrelated theatrical face." },
      { title: "Respond, do not echo", body: "Show reception by adding a related comment, preference or question—not merely repeating the same weather sign.", example: "RAIN COLD → ME NOT-LIKE; YOU?", avoid: "Do not treat repetition alone as full conversational understanding." },
    ],
    checks: [
      { q: "What anchors a weather description?", options: ["Time/place", "A name", "Fingerspelling"], answer: 0, explain: "The receiver needs to know when or where the weather applies." },
      { q: "How can understanding be shown?", options: ["A related response", "Silence", "English translation only"], answer: 0, explain: "A relevant response demonstrates meaning in interaction." },
    ],
    phrases: [
      { meaning: "Today it is raining and cold.", gloss: "TODAY · RAIN · COLD", build: "Time → conditions.", focus: "Coordinate the non-manual description with each condition." },
      { meaning: "I love summer because it is hot.", gloss: "SUMMER · ME LOVE · WHY? HOT", build: "Topic → preference → reason.", focus: "Keep the reason visibly linked to summer." },
    ],
    reception: { title: "Forecast from signed detail", setup: "Record three two-part weather descriptions in random order.", passes: ["Identify time or season.", "Identify both conditions.", "Choose a matching weather image."], evidence: "Match all three messages to the correct visual forecast." },
  },
  {
    enquiry: "What does ‘topic–comment’ help a beginner notice—and what does it not mean?",
    source: ["signatureNotes", "corpus"],
    terms: ["today", "tomorrow", "like", "not like", "who", "where"],
    teach: [
      { title: "Establish shared ground", body: "A topic can identify what the next information is about; the comment adds what matters about it. This is a useful visual planning lens, not a mechanical formula for every BSL sentence.", example: "BOOK [topic] · ME LIKE [comment].", avoid: "Do not rewrite every English sentence into one fixed ‘topic then comment’ recipe." },
      { title: "Time can frame the event", body: "Setting TOMORROW or YESTERDAY early lets the viewer interpret following events inside that frame. Time-first often reduces ambiguity for beginners.", example: "TOMORROW · SCHOOL ME GO.", avoid: "Do not claim BSL has one universal word order; natural ordering varies with discourse and construction." },
      { title: "Non-manual marking can signal the topic", body: "Eye gaze, eyebrow position, head/body movement and a brief hold may mark a topic boundary. Learn this from fluent models rather than punctuation on a gloss.", example: "BOOK [brief topic hold] · ME LIKE.", avoid: "Do not speak the English topic aloud to compensate for missing visual structure." },
    ],
    checks: [
      { q: "Is topic–comment a rigid rule for every BSL sentence?", options: ["Yes", "No, it is a useful pattern among others", "Only for numbers"], answer: 1, explain: "BSL structure is richer and more variable than one formula." },
      { q: "What can mark a topic boundary?", options: ["Only word order", "Non-manual features and a hold", "An English comma"], answer: 1, explain: "Visual prosody helps organise the message." },
    ],
    phrases: [
      { meaning: "That book, I like it.", gloss: "BOOK [topic] · ME LIKE", build: "Establish topic → brief boundary → comment.", focus: "Make the boundary visual rather than inserting an English pause everywhere." },
      { meaning: "Tomorrow, where are you going?", gloss: "TOMORROW [time-frame] · YOU GO WHERE?", build: "Set time → ask about event.", focus: "Carry WH-question marking across the question span." },
    ],
    reception: { title: "Find the frame and the comment", setup: "Record two messages: one with clear time/topic framing and one in a deliberately muddled order.", passes: ["Identify the topic or time frame.", "Identify the new information.", "Locate the visual boundary."], evidence: "Explain why one message is easier to follow without claiming it is the only grammatical order." },
  },
  {
    enquiry: "How do facial grammar, negation and intensity change a message?",
    source: ["signatureNotes", "signbank"],
    terms: ["question", "not understand", "not like", "happy", "worried", "again"],
    teach: [
      { title: "Non-manual features have scope", body: "A question, negation or topic marking pattern extends over the signs it modifies. Starting too late or ending too early can change how the message is read.", example: "YOU COFFEE LIKE? carries question marking across the relevant span.", avoid: "Do not add one eyebrow movement after the final sign." },
      { title: "Negation is coordinated", body: "Manual NOT/NOT-LIKE may combine with head movement, mouth pattern and body posture. Learn the authentic combination for the construction.", example: "COFFEE · ME NOT-LIKE with aligned negation.", avoid: "Do not shake the head continuously through unrelated later information." },
      { title: "Mouth patterns are not spoken subtitles", body: "BSL uses English-derived mouthings and sign-language-specific mouth gestures in patterned ways. A learner should copy the model observed, not speak full English while signing.", example: "Observe what appears on the mouth in the chosen clip and where it begins/ends.", avoid: "Do not assume every sign requires its whole English label mouthed." },
    ],
    checks: [
      { q: "What is ‘scope’?", options: ["The signs a non-manual pattern applies to", "Hand size", "Video length"], answer: 0, explain: "Non-manual features begin and end with the meaning they modify." },
      { q: "Are mouth patterns spoken subtitles?", options: ["Always", "No", "Only for numbers"], answer: 1, explain: "BSL mouthings and mouth gestures have their own patterned use." },
    ],
    phrases: [
      { meaning: "Don’t you like coffee?", gloss: "COFFEE · YOU NOT-LIKE?", build: "Topic → addressee/negated preference question.", focus: "Coordinate negation and question marking without turning them into random expression." },
      { meaning: "I didn’t understand; please show me again.", gloss: "ME NOT-UNDERSTAND · AGAIN SHOW-ME PLEASE", build: "State breakdown → request repair.", focus: "Release negation before the repair request begins." },
    ],
    reception: { title: "Watch where the face changes", setup: "Record a statement, question and negated statement using the same topic.", passes: ["Watch face/body only and classify the message.", "Watch hands and identify the topic.", "Mark the start and end of the non-manual pattern."], evidence: "Classify all three and repair any pattern whose scope is unclear." },
  },
  {
    enquiry: "How do you receive the gist before chasing every sign?",
    source: ["corpus", "signbank"],
    terms: ["hello", "name", "teacher", "today", "where", "again"],
    teach: [
      { title: "First pass: situation", body: "On the first viewing, identify who is involved, the setting, emotional tone and broad topic. Do not freeze the video after every unknown sign.", example: "You may recognise ‘greeting + personal information’ before catching NAME.", avoid: "Do not translate sign by sign on the first pass." },
      { title: "Second pass: anchors", body: "Look for names, numbers, time signs, repeated lexical items, placed people and question boundaries. These anchors constrain the possible meaning.", example: "TODAY plus RAIN plus a dislike expression gives a strong weather gist.", avoid: "Do not let one unfamiliar sign erase five understood anchors." },
      { title: "Third pass: targeted repair", body: "Replay only after deciding what information is missing. In live conversation, ask a specific repair question.", example: "Missed the place? Ask WHERE/AGAIN or FINGERSPELL PLACE.", avoid: "Do not request the whole message again when only one detail is missing." },
    ],
    checks: [
      { q: "What is the first-pass goal?", options: ["Perfect translation", "Situation and gist", "Every handshape"], answer: 1, explain: "Gist provides a frame for later details." },
      { q: "What should guide replay?", options: ["A specific missing detail", "Anxiety", "Always replay everything"], answer: 0, explain: "Targeted replay trains purposeful reception." },
    ],
    phrases: [
      { meaning: "I caught the topic but missed the place.", gloss: "TOPIC UNDERSTAND · PLACE MISS", build: "State what was understood → identify missing detail.", focus: "Keep the repair specific and visually open." },
      { meaning: "Where? Again, please.", gloss: "WHERE? · AGAIN PLEASE", build: "Target detail → request repetition.", focus: "Use WH-question marking for WHERE, then reset for the request." },
    ],
    reception: { title: "Three-pass natural viewing", setup: "Choose a short BSL Corpus clip or a previously studied signed model with several meaning blocks.", passes: ["Write the situation and topic only.", "Add three anchors: person, time, place, number or repeated sign.", "Replay one targeted section for a missing detail."], evidence: "State a defensible gist and separate what you know from what you are inferring." },
  },
  {
    enquiry: "How can repair keep you participating when reception fails?",
    source: ["signatureNotes", "signatureLevel1"],
    terms: ["again", "slower", "not understand", "which", "fingerspell please", "understand"],
    teach: [
      { title: "Stay visually present", body: "Keep eye contact, signal the breakdown promptly and remain available for the repeated message. Looking away can accidentally close the turn.", example: "NOT-UNDERSTAND · AGAIN PLEASE [hold receptive gaze].", avoid: "Do not apologise at length or withdraw." },
      { title: "Repair can be partial", body: "Show what you did understand and identify the gap. This lets the signer repeat less and gives you another context-rich attempt.", example: "BUS UNDERSTAND · TIME WHICH?", avoid: "Do not erase your partial understanding by saying ‘nothing’ when you caught most of it." },
      { title: "Close the loop", body: "Repeat the recovered information or answer appropriately. The other signer can then confirm or correct it.", example: "TIME 10? — YES.", avoid: "Do not nod and move on without testing the repaired meaning." },
    ],
    checks: [
      { q: "You understood BUS but missed the time. What should you request?", options: ["Everything again", "TIME WHICH?", "Nothing"], answer: 1, explain: "Specific repair preserves what you already understood." },
      { q: "How is repair completed?", options: ["By confirming recovered meaning", "By apologising", "By changing topic"], answer: 0, explain: "Confirmation shows the message is now shared." },
    ],
    phrases: [
      { meaning: "I understand ‘bus’, but what time?", gloss: "BUS UNDERSTAND · TIME WHICH?", build: "Known anchor → identify missing detail.", focus: "Use a visible contrast between understood and missing." },
      { meaning: "Please sign more slowly. Ten o’clock, right?", gloss: "SLOWER PLEASE · TIME 10?", build: "Request → recovered detail/confirmation.", focus: "Do not treat slower as exaggerated, disconnected signs." },
    ],
    reception: { title: "Repair a controlled breakdown", setup: "Ask Mum to show one of four rehearsed messages too quickly or with one item hidden.", passes: ["Signal the breakdown.", "Name the missing part.", "Confirm the repaired message."], evidence: "Complete three repair loops without reverting to spoken guessing." },
  },
  {
    enquiry: "How does a short personal story stay coherent in visual space?",
    source: ["signatureNotes", "corpus"],
    terms: ["when", "where", "who", "happened", "feel", "finish"],
    teach: [
      { title: "Set time, place and people", body: "Before the event, establish WHEN, WHERE and WHO. These anchors let later action and reference stay compact.", example: "YESTERDAY · PARK · FRIEND [left] · then event.", avoid: "Do not introduce a person halfway through and expect earlier points to refer to them." },
      { title: "Show event order", body: "Use visual boundaries, body shift and established time to move through beginning, change and outcome. Keep the story as a sequence of meaning blocks.", example: "ARRIVE → SEE → PROBLEM → REPAIR → FINISH.", avoid: "Do not narrate an English paragraph on the lips." },
      { title: "Constructed action is not pantomime", body: "Body, gaze and face can represent a participant’s action or reaction inside a signed narrative. Learn from fluent models and clearly enter/leave the represented perspective.", example: "Briefly take the friend’s perspective, then return to narrator position.", avoid: "Do not replace BSL structure with uncontrolled acting." },
    ],
    checks: [
      { q: "What should be established before the event?", options: ["Time/place/people", "Every adjective", "The ending"], answer: 0, explain: "Anchors make later action and reference coherent." },
      { q: "Is constructed action simply pantomime?", options: ["Yes", "No, it is integrated with language", "Only in English"], answer: 1, explain: "It is a structured visual resource used with BSL." },
    ],
    phrases: [
      { meaning: "Yesterday I went to the park with a friend.", gloss: "YESTERDAY · PARK · ME + FRIEND [left] GO", build: "Time → place → people → movement.", focus: "Maintain the friend’s locus for the next event." },
      { meaning: "It rained, we ran home, and I felt tired.", gloss: "RAIN · WE RUN HOME · FINISH ME TIRED", build: "Change/event → response → outcome/feeling.", focus: "Let non-manual meaning change with each story beat." },
    ],
    reception: { title: "Map the story beats", setup: "Record a 45-second three-event story using six keyword prompts only.", passes: ["Write time/place/people.", "Draw three event boxes.", "Add the final feeling or outcome."], evidence: "Recover all anchors and the correct event order from silent playback." },
  },
  {
    enquiry: "How can a one-minute classroom explanation stay accessible?",
    source: ["ndcs", "signatureNotes"],
    terms: ["look", "my turn", "you", "copy", "again", "understand", "good", "finish"],
    teach: [
      { title: "Separate looking from doing", body: "A learner cannot watch a signed explanation and inspect materials at exactly the same time. Signal LOOK, demonstrate, pause, then point to the learner and ask them to COPY.", example: "LOOK-ME → demonstration → YOU COPY.", avoid: "Do not continue signing while pupils copy or write." },
      { title: "Model one complete example", body: "Show the beginning, action and finish of a task at a calm pace. Use objects or visuals to carry meaning alongside BSL.", example: "MY-TURN [complete model] · FINISH · AFTER YOU COPY.", avoid: "Do not break the model into so many corrections that the whole task disappears." },
      { title: "Check understanding with action", body: "Ask the learner to repeat, point, order or perform—not simply answer ‘yes’ to UNDERSTAND?", example: "YOU COPY / SHOW-ME provides visible evidence.", avoid: "Do not treat a nod as proof when the action can be demonstrated." },
    ],
    checks: [
      { q: "When should pupils copy?", options: ["While you sign", "After the model and turn handover", "Before attention"], answer: 1, explain: "Separated attention protects access." },
      { q: "What is stronger than ‘understand?’", options: ["A demonstrated response", "A louder question", "No pause"], answer: 0, explain: "Action reveals what the learner understood." },
    ],
    phrases: [
      { meaning: "Look at me. I show first; then you copy.", gloss: "LOOK-ME · FIRST ME SHOW · AFTER YOU COPY", build: "Attention → model sequence → point to learner → action handover.", focus: "Pause fully before YOU COPY so watching and doing do not overlap." },
      { meaning: "Show me. Good. Finish.", gloss: "SHOW-ME · GOOD · FINISH", build: "Evidence request → feedback → boundary.", focus: "Make each consequence clear and calm." },
    ],
    reception: { title: "Follow the micro-lesson", setup: "Record a one-minute visual explanation using an object and three instructions.", passes: ["Follow only the attention and turn signals.", "Replay and perform the task.", "Check whether any signing overlapped with doing."], evidence: "A viewer can complete the task without spoken narration." },
  },
  {
    enquiry: "What does practical Deaf awareness change in a real classroom?",
    source: ["ndcs", "signbank"],
    terms: ["attention", "look", "light", "again", "understand", "help"],
    teach: [
      { title: "Access is environmental", body: "Lighting, seating, distance, background glare and sightlines determine whether a person can see faces, hands, peers and resources. Language skill cannot compensate for a visually inaccessible room.", example: "Move away from the bright window and arrange discussion so speakers are visible.", avoid: "Do not place all responsibility on the deaf pupil to ‘pay attention’." },
      { title: "Address the Deaf person directly", body: "Maintain communication with the Deaf person, not with an interpreter or communication professional as if they were the participant.", example: "Direct your gaze and question to the pupil/person while allowing interpretation to occur.", avoid: "Do not say ‘tell them…’ to the interpreter." },
      { title: "Ask about communication preferences", body: "Deaf people use varied languages, modalities and technologies. Ask what supports access and follow the person’s expressed preference.", example: "Offer BSL, spoken/written information, visuals and processing time as appropriate.", avoid: "Do not assume every deaf person uses BSL or lipreads." },
    ],
    checks: [
      { q: "Who should you address when an interpreter is present?", options: ["The interpreter", "The Deaf person", "The nearest colleague"], answer: 1, explain: "The Deaf person is the participant in the interaction." },
      { q: "Does every deaf person use BSL?", options: ["Yes", "No", "Only at school"], answer: 1, explain: "Communication preferences and language backgrounds vary." },
    ],
    phrases: [
      { meaning: "Please look at me; is the light okay?", gloss: "LOOK-ME PLEASE · LIGHT OK?", build: "Attention → access check.", focus: "Ask, then wait for the person’s response." },
      { meaning: "Do you understand, or should I show it again?", gloss: "UNDERSTAND? · AGAIN SHOW?", build: "Check → offer repair option.", focus: "Prefer a demonstration check when possible." },
    ],
    reception: { title: "Audit access before language", setup: "Stand in three classroom positions and record five seconds of signing in each.", passes: ["Check face and hand visibility.", "Check glare and background distraction.", "Check whether a seated pupil could see peer turns."], evidence: "Choose the best position and name two environmental changes." },
  },
  {
    enquiry: "How do you retrieve widely without turning forgetting into failure?",
    source: ["signatureLevel1", "signbank"],
    terms: ["hello", "name", "today", "where", "again", "understand"],
    teach: [
      { title: "Retrieve before reviewing", body: "Start each item from a meaning or scenario, wait several seconds, attempt it, then open the model. Effortful retrieval—not rereading—is the evidence-producing step.", example: "Scenario: you missed a place name → produce the repair before revealing AGAIN/FINGERSPELL.", avoid: "Do not browse the whole dictionary before making any attempt." },
      { title: "Test production and reception separately", body: "A sign you can produce may still be hard to recognise. Include signed video input, fingerspelling and number recognition alongside production prompts.", example: "Make 8 from a written prompt, then identify 8 from a shuffled signed model.", avoid: "Do not count English labels as receptive BSL." },
      { title: "Use errors to schedule practice", body: "A weak item should return soon in a different context; a secure item should return later. The goal is durable access, not a perfect session score.", example: "NOT-UNDERSTAND today → classroom repair tomorrow → conversation repair next week.", avoid: "Do not repeat one failed item until fatigue makes performance worse." },
    ],
    checks: [
      { q: "What must happen before opening the model?", options: ["A genuine attempt", "Mark complete", "Skip"], answer: 0, explain: "Retrieval requires trying before restudy." },
      { q: "Is producing a sign proof you can receive it?", options: ["Yes", "No", "Always"], answer: 1, explain: "Production and reception need separate evidence." },
    ],
    phrases: [
      { meaning: "Hello, my name is Will. Where do you live?", gloss: "HELLO · ME NAME W-I-L-L · YOU LIVE WHERE?", build: "Foundation conversation chain.", focus: "Keep name rhythm and WH-question marking clear." },
      { meaning: "I don’t understand. Again, please.", gloss: "ME NOT-UNDERSTAND · AGAIN PLEASE", build: "Breakdown → repair request.", focus: "Remain receptive for the answer." },
    ],
    reception: { title: "Mixed receptive circuit", setup: "Use six previously studied models: one greeting, one name, one number, one time sign, one question and one repair.", passes: ["Identify the category.", "Identify the meaning.", "Choose one item for targeted replay."], evidence: "Attempt all six and record clear/hesitant/not-yet honestly." },
  },
  {
    enquiry: "How do you complete a coherent signed sequence and choose the next learning path?",
    source: ["signatureLevel1", "corpus", "signbank"],
    terms: ["hello", "name", "teacher", "like", "where", "again", "goodbye"],
    teach: [
      { title: "Coherence beats vocabulary volume", body: "A strong beginner sequence uses clear meaning blocks, stable reference, appropriate non-manual features, response space and repair. More isolated signs do not automatically create better BSL.", example: "Introduction → question → response/follow-up → short story → repair → close.", avoid: "Do not force every course word into one monologue." },
      { title: "Review for visual evidence", body: "Watch the recording muted. Check whether a viewer can identify people, time, place, question boundaries and changes of topic without spoken English carrying the message.", example: "If the question is invisible, repair its non-manual scope before changing vocabulary.", avoid: "Do not judge only from how fluent the movement felt." },
      { title: "Thirty-five days is a foundation", body: "This companion can organise deliberate practice, but fluent BSL develops through sustained Deaf-led teaching, feedback and real interaction. Choose a qualified next step.", example: "Find a Signature-approved course or Deaf-led teacher and keep two spaced review sessions each week.", avoid: "Do not describe this completion as fluency or use uncertain signs as professional provision." },
    ],
    checks: [
      { q: "What is the strongest evidence of coherence?", options: ["Many signs", "Meaning, reference, questions and repair remain followable", "Fast fingerspelling"], answer: 1, explain: "Communication quality comes from organised visual language." },
      { q: "What should follow this course?", options: ["Claim fluency", "Sustained Deaf-led/qualified learning", "Stop reception practice"], answer: 1, explain: "A guided app cannot replace interaction and expert feedback." },
    ],
    phrases: [
      { meaning: "Hello. I’m Will, a teacher learning BSL. What do you like?", gloss: "HELLO · ME NAME W-I-L-L · ME TEACHER · LEARN BSL · YOU LIKE WHAT?", build: "Introduction → reason → open question.", focus: "Shift from monologue into genuine response space." },
      { meaning: "I missed that. Again, please … thank you, goodbye.", gloss: "MISS/NOT-UNDERSTAND · AGAIN PLEASE · THANK-YOU · GOODBYE", build: "Repair → receive/confirm → separate close.", focus: "Do not close until the repaired meaning is confirmed." },
    ],
    reception: { title: "Final two-pass review", setup: "Record the two-minute final sequence twice, keeping the first attempt.", passes: ["Attempt 1: map meaning blocks, reference and question/response space.", "Choose exactly two changes.", "Attempt 2: check whether those two changes are visible."], evidence: "Document the two improvements and one item for qualified teacher feedback." },
  },
];

const LEGACY_KNOWLEDGE_PACKS = KNOWLEDGE_PACKS.map((pack) => ({
  ...pack,
  source: [...pack.source],
  terms: [...pack.terms],
  teach: pack.teach.map((item) => ({ ...item })),
  checks: pack.checks.map((item) => ({ ...item, options: [...item.options] })),
  phrases: pack.phrases.map((item) => ({ ...item })),
  reception: {
    ...pack.reception,
    passes: [...pack.reception.passes],
  },
}));

/* Days whose classroom-readiness outcome needs teaching that did not exist in
 * the earlier general course receive a fully authored replacement pack here.
 * Other days reuse a closely aligned, already-audited pack and change only the
 * lesson-specific model set supplied by course.js. */
const READINESS_KNOWLEDGE = {
  1: {
    enquiry: "What must a beginner notice before trying to copy a BSL sign?",
    source: ["signatureLevel1", "signatureNotes", "signbank", "ndcs"],
    teach: [
      { title: "BSL is a visual language", body: "Meaning can be carried by handshape, orientation, location, movement, signing space, face, mouth pattern, body and gaze. These elements work together; BSL is not English transferred onto the hands.", example: "Watch a whole sign once for meaning, then replay for only its starting location and movement.", avoid: "Do not stare only at the hands or arrange English words into a guessed signed sentence." },
      { title: "Attention begins the interaction", body: "Before any sign can be received, both people need a shared visual-attention boundary and a clear view of face, shoulders and hands. Positioning, light and pauses are part of communication access.", example: "Settle your gaze, allow the other person to look up, then begin the greeting.", avoid: "Do not begin signing while the other person is reading, turning away or unable to see you." },
      { title: "Observation precedes qualified feedback", body: "Choose a consistent dominant hand, keep the signing window comfortable and compare one or two visible features at a time. External pages may contain several variants and no clip is selected; confirm intended and school-used forms through qualified or existing support.", example: "First compare handshape and location in one recorded example; record all accuracy questions for review.", avoid: "Do not treat a different documented variant as automatically wrong or invent a blended version." },
    ],
    checks: [
      { q: "Which can carry grammatical or lexical meaning in BSL?", options: ["Hands only", "Hands, face, body, gaze and space", "Spoken English word order"], answer: 1, explain: "BSL distributes meaning across the visible articulators and interaction space." },
      { q: "What should happen before a signed classroom message begins?", options: ["Shared visual attention", "A longer English explanation", "Faster hand movement"], answer: 0, explain: "A message cannot be received if visual attention has not been established." },
    ],
    phrases: [
      { meaning: "Establish attention, then offer one clear greeting.", gloss: "[ATTENTION] · HELLO", build: "Settle position → wait for shared gaze → greet → leave response space.", focus: "The hands begin only after attention is available." },
      { meaning: "If attention is lost, pause, regain it respectfully and offer the greeting again.", gloss: "[PAUSE / REGAIN ATTENTION] · HELLO", build: "Stop the message → use the agreed attention method → wait for shared gaze → greet again.", focus: "Do not continue signing while the other person is looking away." },
    ],
    reception: { title: "Observe before copying", setup: "Open the external greeting comparison page and choose one recorded example for observation only; no clip is selected or certified.", passes: ["First pass: note the intended English sense and overall visible form.", "Second pass: track starting location and movement only.", "Third pass: record face, gaze or interaction features that still need qualified interpretation."], evidence: "Name two visible features, attempt one self-comparison and mark linguistic accuracy pending qualified review." },
  },
  3: {
    enquiry: "What makes a fingerspelled name readable rather than merely fast?",
    source: ["fingerspelling", "signatureNotes", "signatureFrontline"],
    teach: [
      { title: "Fingerspell selectively", body: "Use the BSL manual alphabet for names, place names, brands or an unfamiliar word—not instead of an established sign. Fingerspelling your own name is useful; inventing a name sign is not.", example: "Use NAME, then fingerspell your own name as one whole word.", avoid: "Do not spell ordinary words such as BOOK or SCHOOL when a known sign is appropriate." },
      { title: "The whole word has rhythm", body: "Keep a consistent dominant hand and a stable signing window. Form the first letter clearly, move through direct transitions and mouth the whole name naturally rather than saying each letter aloud.", example: "Practise A–B, J–M and S–W as transitions before spelling a complete sample name.", avoid: "Do not bounce the hands back to neutral after every letter or chase speed before clarity." },
      { title: "Reception and repair are separate skills", body: "Recognising a fingerspelled name requires watching the pattern and recovering partial information. If it is missed, ask for repetition or a slower fingerspelling pace instead of guessing.", example: "Identify the first and last letter, then choose a separately observed AGAIN or SLOWER item for the missing centre.", avoid: "Do not pretend a guessed name was understood." },
    ],
    checks: [
      { q: "When is fingerspelling most appropriate here?", options: ["For every English word", "For a name or unfamiliar term", "Instead of learning signs"], answer: 1, explain: "Fingerspelling supports names and unknown terms; it does not replace vocabulary." },
      { q: "What should come before speed?", options: ["Stable shapes and readable transitions", "Large arm movement", "Saying each letter aloud"], answer: 0, explain: "A receiver needs consistent shape, position and rhythm." },
    ],
    phrases: [
      { meaning: "My name is …", gloss: "ME · NAME · [FINGERSPELL OWN NAME]", build: "Point to self → establish NAME → fingerspell your own name as one rhythmic unit.", focus: "Return gaze to the other person after the final letter." },
      { meaning: "I missed the name; choose a separately studied repetition or pace-repair item.", gloss: "[REPAIR INTENTION — NO CONNECTED BSL MODEL]", build: "Show what was missed → use one individually observed repair item → watch without copying.", focus: "Do not guess, combine the labels into an app-authored sentence or treat a comparison page as certification." },
    ],
    reception: { title: "Recognise a name pattern", setup: "Use UCL’s receptive fingerspelling practice or ask Mum to copy two short non-identifying sample names from the alphabet model.", passes: ["Watch the whole word without moving.", "Record the first and last letters you saw.", "Replay once for the missing middle, then ask for repetition if needed."], evidence: "Recover two short sample names or accurately state which letters remain uncertain." },
  },
  6: {
    enquiry: "How does a first encounter stay connected when one part is misunderstood?",
    source: ["signatureFrontline", "signatureNotes", "ndcs"],
    teach: [
      { title: "Give the encounter a visible shape", body: "A useful first meeting has a beginning, exchange and close: establish attention, greet, introduce yourself, invite a response, then close separately. The aim is relationship, not a memorised performance.", example: "Attention → HELLO → own name → simple choice or readiness question → THANK-YOU / GOODBYE.", avoid: "Do not deliver every practised sign as one uninterrupted monologue." },
      { title: "Receive as well as produce", body: "After a name or simple response, pause and watch. Use the context, pointing and visible choices; if meaning is incomplete, identify exactly what was missed.", example: "NAME missed → AGAIN or SLOWER rather than restarting the whole greeting.", avoid: "Do not look at the support adult instead of the child while waiting for the answer." },
      { title: "Repair keeps the relationship open", body: "NOT-UNDERSTAND, AGAIN, SLOWER and SHOW-ME are competent beginner tools. Make the request, receive the repair and confirm the recovered meaning before closing.", example: "NOT-UNDERSTAND → AGAIN PLEASE → receive → UNDERSTAND / THANK-YOU.", avoid: "Do not apologise repeatedly or pretend to understand to escape the interaction." },
    ],
    checks: [
      { q: "What should follow a greeting and introduction?", options: ["More vocabulary", "A genuine response space", "Looking away"], answer: 1, explain: "An encounter becomes interaction only when the other person can respond." },
      { q: "What is the best response to a missed name?", options: ["Guess", "Ask for focused repetition or fingerspelling", "End the interaction"], answer: 1, explain: "Specific repair preserves both meaning and rapport." },
    ],
    phrases: [
      { meaning: "Hello. My name is … What is your name?", gloss: "HELLO · ME NAME [OWN NAME] · YOU NAME WHAT?", build: "Attention → greeting → own introduction → clear question → wait.", focus: "The introduction ends before the question begins." },
      { meaning: "I did not understand. Again, please. Thank you—goodbye.", gloss: "ME NOT-UNDERSTAND · AGAIN PLEASE · THANK-YOU · GOODBYE", build: "State breakdown → request repair → confirm → separate close.", focus: "Do not close until the repaired meaning has been received." },
    ],
    reception: { title: "Rehearse the first encounter", setup: "Ask Mum to choose one simple response and one deliberate low-stakes misunderstanding from the app prompts.", passes: ["Check the attention and greeting boundary.", "Receive the visible choice or name pattern.", "Use one separately observed repair item, confirm meaning, then close."], evidence: "Complete the access rehearsal and list every connected-language feature requiring qualified review." },
  },
  7: {
    enquiry: "How can a small school map keep people and places visually clear?",
    source: ["signatureLevel1", "signatureNotes", "ndcs"],
    teach: [
      { title: "Choose only what supports interaction", body: "Begin with the people and places that are likely to matter repeatedly: teacher, friend, school, classroom and toilet. Use real context or a simple map rather than learning an unbounded school glossary.", example: "Show the classroom on a map, sign CLASSROOM, then keep that location available.", avoid: "Do not collect room labels that never enter a real interaction." },
      { title: "Establish before pointing back", body: "Establish a person or place with a real card, object or individually observed item, assign a clear location, and preserve it. Later pointing and gaze can return only after the referent is shared.", example: "Place a TEACHER card left and a FRIEND card right, then point back to the same location.", avoid: "Do not move every referent to the centre when the next prompt appears." },
      { title: "Local language needs confirmation", body: "School names, role titles and place conventions may be fingerspelled, signed or handled through an agreed local form. Confirm with the support team and record only a non-identifying variant note.", example: "Write ‘school version confirmed’ without entering the child’s or school’s name.", avoid: "Do not invent a sign for a school, person or room." },
    ],
    checks: [
      { q: "When can pointing refer back to a classroom?", options: ["After its location is established", "Before any context", "Only while speaking"], answer: 0, explain: "The location-to-place relationship must be shared first." },
      { q: "What belongs in the optional variant note?", options: ["The child’s name", "A brief non-identifying confirmation", "A full support plan"], answer: 1, explain: "The app is for teacher learning, not pupil records." },
    ],
    phrases: [
      { meaning: "This person is the teacher; that person is a friend.", gloss: "[PERSON-left] TEACHER · [PERSON-right] FRIEND", build: "Place first person → identify role → place second person → identify relationship.", focus: "Keep the two person locations unchanged." },
      { meaning: "The school has a classroom and a toilet; show both on the map.", gloss: "SCHOOL [map] · CLASSROOM [place] · TOILET [place]", build: "Establish map → place classroom → place toilet → point back to both.", focus: "Let the map carry location rather than adding guessed signs." },
    ],
    reception: { title: "Reconstruct a small school map", setup: "Place five non-identifying person or place cards, then use pointing and individually observed items in a hidden order.", passes: ["Identify the visible person or place referent.", "Mark its established location.", "Replay only to check whether later points return to the same anchor."], evidence: "Reconstruct the relationships and mark every uncertain linguistic form for support-team or qualified confirmation." },
  },
  8: {
    enquiry: "How do attention, readiness and turns become respectful classroom routines?",
    source: ["ndcs", "ndcsEnvironment", "signatureNotes"],
    teach: [
      { title: "Gain attention without demanding it", body: "Use the school-agreed visual signal, a small wave within peripheral vision, a light shoulder tap where appropriate or a shared environmental cue. Wait for gaze before signing.", example: "Signal → wait → LOOK/WATCH target → instruction.", avoid: "Do not grab, shout from behind or continue while the child is looking elsewhere." },
      { title: "Readiness is a real check", body: "READY must allow WAIT or NOT-YET as a valid answer. Show what is about to happen and give processing time before moving into the task.", example: "[show material] · YOU READY? → wait for response.", avoid: "Do not ask READY while already starting the next instruction." },
      { title: "Turns need visible handover", body: "Use gaze, body orientation, an agreed visible handover signal and a pause to show who acts next. One speaker or signer at a time protects visual access; no single lexical ‘your turn’ form is assumed here.", example: "Demonstrate → mark the action finished → orient to the next person and offer the object or working space.", avoid: "Do not overlap the handover with another spoken or signed instruction." },
    ],
    checks: [
      { q: "When should the instruction begin?", options: ["Before gaze arrives", "After attention is established", "While walking away"], answer: 1, explain: "Attention is part of the message, not an optional preface." },
      { q: "What makes READY a real question?", options: ["Accepting WAIT or NOT-YET", "Continuing immediately", "Repeating it faster"], answer: 0, explain: "The other person must have a genuine response route." },
    ],
    phrases: [
      { meaning: "Look here. Wait. Are you ready?", gloss: "LOOK [target] · WAIT · YOU READY?", build: "Gain gaze → place target → pause → readiness question.", focus: "Do not move the target while the child is answering." },
      { meaning: "Finish your own turn, then hand the activity over visibly.", gloss: "[ACCESS REHEARSAL — NO CONNECTED BSL MODEL]", build: "Mark the action finished → stop moving → orient to the next person → offer the object or working space.", focus: "The next turn begins only after the handover is visible; confirm the school-used sign separately." },
    ],
    reception: { title: "Follow the turn, not the word list", setup: "Use a simple object task with Mum and alternate three turns.", passes: ["Identify when attention becomes shared.", "Act only after the readiness boundary.", "Track three visible turn handovers without speech."], evidence: "Complete all three turns and repair one intentionally unclear handover." },
  },
  10: {
    enquiry: "How can real classroom objects reduce the amount of language needed?",
    source: ["ndcs", "signatureLevel1", "signbank"],
    teach: [
      { title: "Establish the object first", body: "Use the real book, pencil, pen or scissors and place it where both people can see it. The object and its location carry context before FIND, SHOW or WHERE is needed.", example: "BOOK [show] → place on table → point back to the same location.", avoid: "Do not sign a long equipment list while the learner is searching the room." },
      { title: "Keep locations stable", body: "Place the table, chair and equipment as visible anchors. Point back to the established location instead of moving every referent each time.", example: "PENCIL [left] · SCISSORS [right] · YOU CHOOSE WHICH?", avoid: "Do not swap the two item locations midway through the choice." },
      { title: "Organisation is a small interaction", body: "Show, choose, give, receive and put away are connected actions. Separate each action with a pause so the child can watch and then handle the object.", example: "SHOW-ME → choose object → handover → FINISHED → put away.", avoid: "Do not expect simultaneous watching and equipment handling." },
    ],
    checks: [
      { q: "What should happen before asking where an item belongs?", options: ["Establish the item and relevant locations", "Hide every object", "Speak more quickly"], answer: 0, explain: "Visible objects and anchors reduce ambiguity." },
      { q: "Why separate watching from handling equipment?", options: ["To slow the lesson", "Visual attention cannot fully serve both at once", "Because signs are optional"], answer: 1, explain: "The child needs a chance to watch first and act second." },
    ],
    phrases: [
      { meaning: "Show me the pencil. Where does it go?", gloss: "PENCIL SHOW-ME · GO WHERE?", build: "Establish visible choices → request object → establish storage locations → WHERE question.", focus: "Keep item and destination anchors unchanged." },
      { meaning: "Choose the book or scissors, then put it on the table.", gloss: "BOOK / SCISSORS CHOOSE WHICH? · TABLE [place]", build: "Place two choices → wait for selection → show table location → act.", focus: "Watch first, then handle the item." },
    ],
    reception: { title: "Organise a visible object routine", setup: "Place four real items and two destinations in view; Mum selects object cards in a hidden order.", passes: ["Identify the visible item or card.", "Move it only after the demonstration finishes.", "Point to the destination before placing it."], evidence: "Organise the items or use repair rather than guessing; no signed-input capability is inferred." },
  },
  11: {
    enquiry: "How can common needs be recognised without sacrificing privacy or safety?",
    source: ["ndcs", "ndcsSafeguarding", "signatureFrontline"],
    teach: [
      { title: "Respond to the need, not the list", body: "HELP, FINISHED, MORE, BREAK, DRINK, TOILET, AGAIN and DIFFERENT arise from a visible situation. Confirm what the request refers to before acting.", example: "HELP [task] / BREAK [now or later?] / MORE [what?].", avoid: "Do not drill sensitive needs publicly as a performance list." },
      { title: "Protect dignity and choice", body: "A toilet, drink or break request may be private. Acknowledge directly, avoid requiring a public explanation and use the school’s agreed routine.", example: "Receive TOILET → confirm discreetly → follow the established permission/access route.", avoid: "Do not ask the child to repeat a private request for the class." },
      { title: "Know where basic communication ends", body: "A routine need can become medical, safeguarding or emergency communication. State when you do not understand, follow school procedure and involve appropriate qualified support.", example: "NOT-UNDERSTAND → WAIT → get the named support adult or emergency response.", avoid: "Do not let familiarity with HELP create false confidence in a high-stakes conversation." },
    ],
    checks: [
      { q: "What should happen after a private routine request?", options: ["Public repetition", "Discreet confirmation and the agreed routine", "Ignore it until break"], answer: 1, explain: "Access and dignity belong together." },
      { q: "What if the meaning could be high-stakes?", options: ["Guess from context", "Use school procedure and qualified support", "Keep practising alone"], answer: 1, explain: "Beginner BSL is not safe interpretation." },
    ],
    phrases: [
      { meaning: "Do you need help, a drink or a break?", gloss: "YOU NEED WHICH · HELP / DRINK / BREAK?", build: "Private attention → show a small visible choice → wait for selection → confirm.", focus: "Do not crowd the child with several repeated questions." },
      { meaning: "Finished, or do you need more or something different?", gloss: "FINISHED? · MORE / DIFFERENT WHICH?", build: "Check completion → establish alternatives → receive one answer.", focus: "The response changes what happens next." },
    ],
    reception: { title: "Respond to a need safely", setup: "Use four written or pictured routine-need scenarios and one scenario that must be escalated.", passes: ["Identify the broad request from the scenario.", "Confirm the context without demanding detail.", "Choose direct response, repair or the qualified-support route."], evidence: "Choose an appropriate route in all five situations and identify the high-stakes boundary; no receptive BSL is assessed." },
  },
  15: {
    enquiry: "How do description and signing space identify the right classroom object?",
    source: ["colours", "signbank", "signatureNotes"],
    teach: [
      { title: "Establish before describing", body: "Place or point to the object first, then add colour, shape or size. The receiver should always know which referent the description belongs to.", example: "BOOK [left] · BLUE · SQUARE picture.", avoid: "Do not recite RED, BLUE, CIRCLE, SQUARE without visible objects." },
      { title: "Space shows position", body: "Use real locations and stable anchors for WHERE, SAME and DIFFERENT. Show the relationship rather than translating a written list of English prepositions.", example: "CIRCLE [left] · SQUARE [right] · SAME colour / DIFFERENT shape.", avoid: "Do not move the anchors during the comparison." },
      { title: "Variants need a clear source", body: "Colour and descriptive signs can vary. Observe one documented example at a time, record a non-identifying school-confirmed variant if needed and seek qualified review before classroom reliance.", example: "Note which RED example you observed; do not label it the selected course model.", avoid: "Do not combine variants into an invented form." },
    ],
    checks: [
      { q: "What should happen before a colour or shape description?", options: ["Establish the object", "List every adjective", "Hide the referent"], answer: 0, explain: "A description needs a stable referent." },
      { q: "How should position be taught?", options: ["As English prepositions", "With real spatial relationships", "By fingerspelling"], answer: 1, explain: "Signing space can show the relationship directly." },
    ],
    phrases: [
      { meaning: "Find the blue square, not the red circle.", gloss: "SQUARE BLUE [locate] · CIRCLE RED [contrast] · FIND WHICH?", build: "Place two objects → describe each → mark contrast → invite selection.", focus: "Keep each object in its own stable location." },
      { meaning: "These are the same colour but different shapes.", gloss: "TWO [objects] · COLOUR SAME · SHAPE DIFFERENT", build: "Establish both objects → compare colour → compare shape.", focus: "Return gaze to both objects during each comparison." },
    ],
    reception: { title: "Select the described object", setup: "Arrange four real objects that differ by colour, shape and size.", passes: ["Watch one complete description without moving.", "Select the object from colour and shape.", "Replay only to check location or the contrasting feature."], evidence: "Select three of four objects and explain which feature resolved any ambiguity." },
  },
  4: {
    enquiry: "How do short responses become part of an interaction rather than a word list?",
    source: ["signatureLevel1", "corpus"],
    teach: [
      { title: "A response answers visible context", body: "YES, NO, OKAY and READY are interpretable because a question, choice or situation has already been established. The same hand movement without shared context may not tell the receiver what has been accepted or refused.", example: "Establish the choice BOOK / DRAW, ask WHICH, then receive YES/NO only if the question genuinely supports it.", avoid: "Do not practise eight responses as disconnected English equivalents." },
      { title: "Politeness is an interaction", body: "PLEASE, THANK-YOU and SORRY work with gaze, timing, facial tone and the request or action they belong to. Politeness is not created by inserting one sign into English word order.", example: "Make the request visible, add PLEASE naturally, wait for the response, then use THANK-YOU.", avoid: "Do not smile mechanically through an apology or use PLEASE without making the request clear." },
      { title: "Readiness needs an honest answer", body: "A readiness check must leave response space and accept NOT-READY or WAIT without embarrassment. The teacher’s aim is access, not obtaining a convenient YES.", example: "YOU READY? [hold gaze] — WAIT / READY.", avoid: "Do not continue the instruction while asking whether the child is ready." },
    ],
    checks: [
      { q: "What gives a short YES or NO its meaning?", options: ["The hand movement alone", "The established question or choice", "An English sentence spoken at the same time"], answer: 1, explain: "Short responses depend on the visible interaction already in place." },
      { q: "What should follow a readiness question?", options: ["Immediate instruction", "Visible response space", "Looking back at the board"], answer: 1, explain: "The other person needs time and visual space to answer honestly." },
    ],
    phrases: [
      { meaning: "Use the visible task and one individually studied response to show whether you are ready; accept a pause or refusal.", gloss: "[ACCESS REHEARSAL — NO CONNECTED BSL MODEL]", build: "Show the task → establish attention → use one separately studied response → pause and receive the other person’s choice.", focus: "Do not assemble a readiness exchange from this English prompt or rush past a NO or pause." },
      { meaning: "Close a low-stakes interaction with one separately studied polite item after the shared outcome is clear.", gloss: "[ACCESS REHEARSAL — NO CONNECTED BSL MODEL]", build: "Confirm the outcome visibly → choose one reviewed polite item → create a separate closing boundary.", focus: "The external pages provide comparison examples for individual items, not a connected closing sequence." },
    ],
    reception: { title: "Rehearse response choices", setup: "Mum presents three low-stakes visible situations. Choose one individually studied response for each, then compare the relevant external page without treating any clip as selected or certified.", passes: ["Name the situation before choosing a response.", "Use one item only and leave genuine response space.", "Mark uncertain sense, form or variation for qualified review."], evidence: "Record which response was attempted and why; this is informal partner rehearsal, not evidence of receptive BSL competence." },
  },
  5: {
    source: ["signatureFrontline", "signatureNotes", "ndcs"],
    phrases: [
      { meaning: "When an ordinary classroom message is missed, signal non-understanding and choose one separately studied repair item.", gloss: "[REPAIR CHOICE — NO CONNECTED BSL MODEL]", build: "Keep visual attention → identify what was missed → choose AGAIN, SLOWER or SHOW-ME only if its individual form has been reviewed.", focus: "Do not guess, pretend to understand or turn the English instruction into a signed sentence." },
      { meaning: "After a repeated or slower example, indicate whether meaning is now clear; if it is not, stop and seek confirmation.", gloss: "[REPAIR LOOP — NO CONNECTED BSL MODEL]", build: "Receive the retry → check the intended meaning → confirm or repeat the repair → use the agreed support route when needed.", focus: "A successful repair is shared understanding, not a fluent-looking sequence." },
    ],
    reception: { title: "Choose the smallest safe repair", setup: "Mum reads three ordinary breakdown scenarios; no BSL interpretation or connected model is being assessed.", passes: ["Identify whether the gap is meaning, pace or a missed visual form.", "Select one separately studied repair item or a non-linguistic show/point strategy.", "State when the situation instead requires qualified support or school procedure."], evidence: "Choose an appropriate route in all three scenarios and label every form uncertainty for qualified review." },
  },
  14: {
    source: ["signatureNotes", "signbank", "ndcs"],
    phrases: [
      { meaning: "Use a visible timetable to identify today and the first activity; do not infer a connected BSL sentence from the labels.", gloss: "[VISIBLE TIMETABLE PLAN — NO CONNECTED BSL MODEL]", build: "Place the day card → place the first activity card → point between the real cards → pause before the activity begins.", focus: "The cards carry the sequence; individual time signs remain pending qualified review for this context." },
      { meaning: "Show one timetable change by moving a card and making the old and new positions clear.", gloss: "[ACCESS REHEARSAL — NO CONNECTED BSL MODEL]", build: "Regain attention → show the original position → move one card → show the replacement position → allow processing time.", focus: "Do not claim one written order or spatial timeline as universal BSL grammar." },
    ],
    reception: { title: "Check a visible timetable change", setup: "Build a four-card timetable with Mum; this lab tests whether the visual plan is followable, not signed-language reception.", passes: ["Mum identifies the first card from the visible layout.", "Move one card and allow time to compare old and new positions.", "Ask Mum to reconstruct the changed order without relying on a connected signed message."], evidence: "The changed timetable is reconstructed accurately; individual BSL forms remain practice evidence only until qualified review." },
  },
  16: {
    source: ["signatureNotes", "signatureLevel1", "corpus"],
    phrases: [
      { meaning: "Given a classroom situation, decide whether the missing information is a person, thing, place, option, reason or method.", gloss: "[QUESTION-INTENTION SORT — NO CONNECTED BSL MODEL]", build: "Establish the visible situation → identify the information gap → select the relevant individually studied question item → leave response space.", focus: "Do not construct a BSL question by rearranging the English prompt." },
      { meaning: "Establish one visible choice or referent, then invite a response without supplying an app-authored question sequence.", gloss: "[ACCESS REHEARSAL — NO CONNECTED BSL MODEL]", build: "Place the referent or choices → direct gaze to the addressee → use only a reviewed individual item if appropriate → wait.", focus: "Question scope, ordering and non-manual features require a fluent signed model and qualified feedback." },
    ],
    reception: { title: "Observe question items without claiming a question model", setup: "Open external comparison pages for two individual question items. No clip is selected and the pages do not model a connected classroom question.", passes: ["Identify the stated English sense and check that the recorded example appears to match it.", "Notice visible variation without choosing one form as authoritative.", "Record the connected question you would need a Deaf or qualified BSL teacher to model."], evidence: "Distinguish the communicative intentions and list the unresolved linguistic features; do not score receptive-question competence." },
  },
  12: {
    enquiry: "What makes a classroom arrival feel like one connected interaction?",
    source: ["ndcs", "signatureNotes"],
    teach: [
      { title: "Connection comes before organisation", body: "Begin by establishing visual attention and greeting the child directly. Only then introduce equipment or the first task; otherwise the routine can become a series of inaccessible instructions.", example: "Attention → HELLO → READY? → BOOK [show/locate].", avoid: "Do not greet the support adult while treating the child as an observer." },
      { title: "Objects remain visible referents", body: "Show or place the book, chair and work area before giving a short instruction. Pointing and stable location can carry more accessible information than repeating several signs while the child searches the room.", example: "BOOK [point-table] · YOU SIT [point-chair] · WAIT.", avoid: "Do not sign while walking away to fetch the object." },
      { title: "A need changes the route", body: "If HELP, BREAK or NOT-UNDERSTAND appears, pause the routine and respond to that meaning. Completing the planned sequence is less important than keeping communication real.", example: "HELP? → SHOW-ME / WAIT → confirm → continue or change plan.", avoid: "Do not treat a request as an interruption to be ignored until the routine is finished." },
    ],
    checks: [
      { q: "What should happen first at the classroom door?", options: ["Give the first instruction", "Establish attention and greet directly", "Ask the support adult to explain everything"], answer: 1, explain: "The teacher-child relationship begins with direct visual connection." },
      { q: "What should happen when a need is communicated?", options: ["Finish the script", "Pause and respond to the meaning", "Mark the routine wrong"], answer: 1, explain: "A routine serves communication; communication does not serve the routine." },
    ],
    phrases: [
      { meaning: "Good morning. Are you ready? Your book is on the table.", gloss: "GOOD-MORNING · YOU READY? · BOOK [table-locus]", build: "Greeting → readiness question → establish BOOK at the actual table.", focus: "Do not look away from the answer while reaching for equipment." },
      { meaning: "Do you need help? Show me. Finished—break next.", gloss: "YOU HELP NEED? · SHOW-ME · FINISHED · NEXT BREAK", build: "Need check → visible demonstration → completion boundary → next transition.", focus: "Leave processing space between the need question and the next instruction." },
    ],
    reception: { title: "Follow the miniature morning", setup: "Record the two arrival sequences with the real chair, table and book in view.", passes: ["Watch for the moment attention is established.", "Track where each object is placed.", "Pause where a child could request help and check that response space exists."], evidence: "A viewer can identify the greeting, object location, help point and transition without spoken narration." },
  },
  20: {
    enquiry: "How can a beginner recognise a basic physical need without pretending to conduct a medical conversation?",
    source: ["ndcs", "ndcsSafeguarding", "signatureFrontline"],
    teach: [
      { title: "Locate the meaning before adding detail", body: "HURT/PAIN needs a clearly indicated body location and an appropriate facial signal. ILL, TIRED, HUNGRY and THIRSTY describe different needs; do not collapse them into a vague ‘not okay’ response.", example: "PAIN [point to established location] / TIRED / THIRSTY.", avoid: "Do not exaggerate a sign until it appears medically precise." },
      { title: "A simple question is not a diagnosis", body: "A beginner may recognise that help is needed and ask WHERE or WHAT-HAPPENED, but should not infer severity, cause or treatment from limited signing.", example: "YOU ILL? / WHERE PAIN? → pause → involve the agreed adult or procedure.", avoid: "Do not keep questioning because the first answer was not understood." },
      { title: "High-stakes meaning requires qualified support", body: "Medical, emergency, safeguarding and complex pastoral communication must follow school procedures and use the appropriate qualified communication support. Stay direct and respectful, state when you do not understand and seek confirmation.", example: "Maintain eye contact with the child while bringing in the named support person.", avoid: "Do not use novice BSL as if it were safe interpretation." },
    ],
    checks: [
      { q: "What is the beginner’s safe role?", options: ["Diagnose from signs", "Recognise a need and involve appropriate support", "Translate a medical conversation"], answer: 1, explain: "Connection and basic recognition do not replace safe professional communication." },
      { q: "What makes PAIN more interpretable?", options: ["Signing faster", "A clearly established body location", "Mouthing a long English explanation"], answer: 1, explain: "Location is essential visual information." },
    ],
    phrases: [
      { meaning: "Acknowledge an everyday physical need privately and bring in the agreed support whenever meaning or risk is unclear.", gloss: "[PROFESSIONAL DECISION — NO MEDICAL BSL SCRIPT]", build: "Pause the activity → face the child directly → acknowledge the visible need → follow the school’s agreed response route.", focus: "Do not diagnose, ask a chain of novice questions or use these individual pages as a medical conversation model." },
      { meaning: "For a clearly indicated pain location, respond to the location only; if anything is uncertain, state non-understanding and seek qualified support.", gloss: "[SAFE RESPONSE PLAN — NO CONNECTED BSL MODEL]", build: "Notice the indicated location → keep the child in the interaction → stop at the limit of understanding → involve the appropriate adult or procedure.", focus: "The learner’s job is safe recognition and escalation, not interpretation or clinical assessment." },
    ],
    reception: { title: "Choose the safe response boundary", setup: "Use four written or pictured low- and high-stakes scenarios. This is a professional-decision exercise, not a test of receiving medical BSL.", passes: ["Identify the immediate access or safety need without diagnosing.", "Decide whether a routine school response is enough.", "For ambiguity, medical risk, emergency or safeguarding content, follow procedure and involve appropriate qualified support."], evidence: "Choose the safe route for all four scenarios and explain where beginner competence ends; do not record a receptive BSL score." },
  },
  21: {
    enquiry: "How do you invite participation without putting a child on display?",
    source: ["ndcsPlay", "ndcs", "ndcsPrimary"],
    teach: [
      { title: "Invitation leaves room for choice", body: "JOIN, PLAY and TOGETHER should open an opportunity, not pressure a public performance. Establish the activity, invite, then leave visible time for YES, NO, WAIT or a different choice.", example: "PLAY [point-activity] · YOU JOIN? → wait.", avoid: "Do not repeat the invitation more loudly or theatrically when the answer is not immediate." },
      { title: "Turns need visible boundaries", body: "In play and paired work, make the object, action and next person visible. Eye gaze, orientation, a pause and an agreed handover signal can transfer the turn without assuming one universal lexical ‘your turn’ form.", example: "Complete the action → stop → look to the partner → offer the object or space.", avoid: "Do not sign the next instruction while the child is still watching the previous action." },
      { title: "Access belongs to the group", body: "Arrange positions so faces and hands are visible, reduce competing distraction and address the child directly. The support adult can facilitate access without becoming the social partner in place of peers.", example: "Move the circle before starting rather than asking the child to keep repositioning.", avoid: "Do not make the child teach everyone signs or explain deafness to earn inclusion." },
    ],
    checks: [
      { q: "What makes an invitation respectful?", options: ["It guarantees a yes", "It leaves genuine response space and choice", "It is repeated until accepted"], answer: 1, explain: "An invitation is not a disguised instruction." },
      { q: "Who owns visual access in group play?", options: ["Only the deaf child", "The whole group and environment", "Only the support adult"], answer: 1, explain: "The group can change position, pace and turn structure." },
    ],
    phrases: [
      { meaning: "We are playing together. Would you like to join?", gloss: "WE PLAY TOGETHER · YOU JOIN?", build: "Establish the group/activity → invite the child directly → wait for the answer.", focus: "Gaze and body position include the child before the invitation is signed." },
      { meaning: "Demonstrate one turn, then hand the object or activity over visibly and leave room for a help request.", gloss: "[VISIBLE HANDOVER — NO CONNECTED BSL MODEL]", build: "Demonstrate → stop fully → orient to the next person → offer the object or working space → wait.", focus: "Do not overlap the handover with the child’s attempt; confirm any school-used turn sign separately." },
    ],
    reception: { title: "Find the invitation and handover", setup: "Record a three-turn activity with Mum or two placed objects representing partners.", passes: ["Identify the invitation boundary.", "Track whose turn is active.", "Find where a person can refuse, wait or request help."], evidence: "All three turn changes and one genuine choice point remain visible without speech." },
  },
  22: {
    enquiry: "How do you recognise a boundary or support request while staying inside professional limits?",
    source: ["ndcsSafeguarding", "ndcs", "signatureNotes"],
    teach: [
      { title: "Stop first; interpret later", body: "When STOP, WORRIED or HELP appears, make the immediate situation safe and give the child visual attention. Do not demand a complete explanation before responding to the boundary.", example: "STOP → pause activity → face the child → WAIT / HELP?", avoid: "Do not continue the task while asking what is wrong." },
      { title: "Repair is not disclosure-taking", body: "AGAIN, SLOWER, SHOW-ME and NOT-UNDERSTAND can repair ordinary meaning. They do not make a novice competent to receive a safeguarding disclosure or complex pastoral account.", example: "State NOT-UNDERSTAND, preserve calm, then follow the school’s named procedure.", avoid: "Do not guess, paraphrase uncertain meaning or ask leading questions." },
      { title: "Direct communication continues", body: "When appropriate support joins, continue addressing the child rather than transferring the relationship to the adult. Allow the time lag needed for the child to receive and respond.", example: "Face the child; pause while communication support renders the message; wait for the child’s answer.", avoid: "Do not say ‘tell them’ while looking only at the support adult." },
    ],
    checks: [
      { q: "What comes first after a clear STOP?", options: ["A detailed explanation", "Pause the situation and give attention", "Finish the current instruction"], answer: 1, explain: "The boundary must be respected before further communication." },
      { q: "What should happen when meaning may be safeguarding-related?", options: ["Guess from context", "Follow school procedure with appropriate qualified support", "Keep practising until confident"], answer: 1, explain: "Novice BSL must not become unsafe interpretation." },
    ],
    phrases: [
      { meaning: "Stop. Wait. Are you worried or do you need help?", gloss: "STOP · WAIT · YOU WORRIED / HELP NEED?", build: "Pause the environment → settle visual attention → small non-leading support check.", focus: "The child is not required to explain publicly." },
      { meaning: "I do not understand. I will get the right help.", gloss: "ME NOT-UNDERSTAND · RIGHT HELP GET", build: "Honest repair statement → preserve the interaction → follow the agreed procedure.", focus: "Do not pretend the uncertain meaning has been understood." },
    ],
    reception: { title: "Separate ordinary repair from high-stakes support", setup: "Read four short classroom situations: missed equipment instruction, playground STOP, feeling worried and an unclear serious concern.", passes: ["Choose the immediate safe action.", "Choose one ordinary repair if appropriate.", "Identify the point where qualified support or school procedure is required."], evidence: "Correctly distinguish all four response routes without claiming beginner BSL is sufficient." },
  },
  23: {
    enquiry: "How can group work make every contribution visually available?",
    source: ["ndcs", "ndcsEnvironment", "signatureNotes"],
    teach: [
      { title: "Arrange access before the discussion", body: "A circle or open horseshoe allows people to see faces, hands and turn changes. Move materials out of the sightline and agree one visible turn signal before ideas begin.", example: "Place the shared object centrally; use gaze, a pause and the agreed signal to transfer the floor.", avoid: "Do not ask the child to track several speakers hidden behind one another." },
      { title: "Establish the choices in space", body: "CHOICE, SAME, DIFFERENT and AGREE become clearer when the two ideas or objects have stable locations. Point back to those locations instead of repeating long labels.", example: "IDEA-A [left] · IDEA-B [right] · YOU CHOOSE WHICH?", avoid: "Do not move the options while people are comparing them." },
      { title: "Contribution needs response", body: "After a child SHOWS or SHARES an idea, pause, acknowledge the actual meaning and connect it to the group’s next action. Inclusion is not achieved by merely offering a turn.", example: "SHOW-ME → receive → GOOD/DIFFERENT → NEXT person or action.", avoid: "Do not praise automatically without showing what part of the contribution was understood." },
    ],
    checks: [
      { q: "What should be designed before group talk starts?", options: ["A fast pace", "Visible positions and a turn signal", "A longer spoken explanation"], answer: 1, explain: "Access is easier to build into the environment than repair after exclusion." },
      { q: "What completes an inclusive turn?", options: ["Offering the turn", "Receiving and responding to the contribution", "Moving on immediately"], answer: 1, explain: "Participation includes uptake, not only opportunity." },
    ],
    phrases: [
      { meaning: "Choose this idea or that idea. Show me why.", gloss: "IDEA-A / IDEA-B · YOU CHOOSE WHICH? · WHY SHOW-ME", build: "Place two ideas → invite selection → keep both loci → ask for visible reason.", focus: "The question face and gaze remain active across WHICH/WHY." },
      { meaning: "We agree on one part and have a different idea too.", gloss: "WE AGREE [idea-A] · ALSO DIFFERENT IDEA [idea-B]", build: "Return to agreed locus → place different idea separately → keep both available.", focus: "Difference is handled as content, not social rejection." },
    ],
    reception: { title: "Track four contributors", setup: "Place four names or objects in a semicircle and record four short turns in a mixed order.", passes: ["Identify the active contributor from gaze and pointing.", "Track which idea each person chooses.", "Locate the exact handover to the next turn."], evidence: "Reconstruct the turn order and each choice without relying on spoken names." },
  },
  24: {
    enquiry: "How do joining in, a disagreement, help and transition stay connected?",
    source: ["ndcsPlay", "ndcs", "ndcsSafeguarding"],
    teach: [
      { title: "Establish the activity before the invitation", body: "Show what is being played, who is involved and where a new participant can join. A clear activity map reduces the language needed for the first invitation.", example: "PLAY [centre] · WE [group] · YOU JOIN?", avoid: "Do not point vaguely across a noisy playground and expect the invitation to be obvious." },
      { title: "A small disagreement needs turn structure", body: "Use STOP or WAIT to pause, make the disputed object or action visible and offer an agreed next step. Keep the pace slow enough for every person to follow.", example: "Pause → show the object and current turn marker → place the next marker beside the next person.", avoid: "Do not sign over several children speaking or moving at once." },
      { title: "Return to class is a new visual event", body: "Gain attention again, mark FINISHED, establish GO/CLASSROOM and check readiness. Do not assume the child saw a distant bell, shouted instruction or group movement.", example: "PLAY FINISHED · CLASSROOM GO · YOU READY?", avoid: "Do not give the transition while facing away and beginning to walk." },
    ],
    checks: [
      { q: "What makes a playground invitation easiest to follow?", options: ["More vocabulary", "A visible map of the activity and people", "A shouted instruction"], answer: 1, explain: "Context carries much of the meaning." },
      { q: "What begins the return-to-class transition?", options: ["Walking away", "Regaining attention and marking the activity finished", "Assuming everyone saw others move"], answer: 1, explain: "A new visual attention boundary is required." },
    ],
    phrases: [
      { meaning: "Offer a choice to join, then show the next turn with an object, place or agreed visual marker.", gloss: "[INVITATION AND HANDOVER — NO CONNECTED BSL MODEL]", build: "Map the activity → offer a visible choice → receive the answer → place the next turn marker visibly.", focus: "The invitation remains a choice, not a command; no unreviewed ‘your turn’ sign is supplied." },
      { meaning: "Stop. Do you need help? Play is finished; we are going back.", gloss: "STOP · YOU HELP NEED? · PLAY FINISHED · WE GO", build: "Pause disagreement → private help check → close activity → regain group attention for transition.", focus: "Separate the wellbeing check from the public group instruction." },
    ],
    reception: { title: "Follow the complete social episode", setup: "Perform the scenario with Mum: invitation, two turns, a deliberate disputed turn, help check and return transition.", passes: ["Track the active turn.", "Identify the moment the disagreement is paused.", "Identify when attention is regained for the return transition."], evidence: "Mum can reconstruct the six events in order without hearing the English plan." },
  },
  25: {
    source: ["signatureNotes", "corpus", "signbank"],
    phrases: [
      { meaning: "Mark the shared time, topic or referent that a fluent signer would need to establish before adding new information.", gloss: "[ANALYSIS TASK — NO BSL ORDER IS SUPPLIED]", build: "Identify the intended meaning → mark the shared context on a card or diagram → list what a qualified model must demonstrate.", focus: "Do not convert ‘topic–comment’ into a mechanical English-to-BSL ordering rule." },
      { meaning: "Identify which parts of one classroom message require a fluent signed model before the message can be used.", gloss: "[LINGUISTIC REVIEW REQUIRED]", build: "Separate lexical items, reference in space, non-manual scope and turn boundary → mark each as reviewed or pending.", focus: "External lexical pages cannot verify connected ordering, direction, facial grammar or naturalness." },
    ],
    reception: { title: "Challenge a grammar claim", setup: "Review three written claims about BSL structure, including one rigid word-order claim. This is a professional-decision exercise, not a connected signing test.", passes: ["Identify what the claim says is universal.", "Compare it with the guidance that BSL organisation depends on construction and discourse.", "Write the exact fluent model or qualified feedback still needed before teaching it."], evidence: "Reject the rigid claim and produce a bounded review question; do not award a BSL grammar capability rating." },
  },
  26: {
    enquiry: "How do stable referents let a beginner describe who, what and where?",
    source: ["signatureNotes", "signatureLevel1", "ndcs"],
    teach: [
      { title: "Place the referent before describing it", body: "Establish a person or object with a real item, card, point or individually observed sign, then assign a stable location. Description becomes followable only when the receiver knows what the feature belongs to.", example: "Place a BOOK card left and a TABLE card right; point left before adding a feature or movement.", avoid: "Do not begin with TALL or GO before the referent is visible." },
      { title: "Movement connects locations", body: "An action such as GO needs an established start, path and destination. Keep the path consistent with the people or objects already placed; do not use movement as decoration.", example: "PERSON [left] · TABLE [right] · GO left-to-right.", avoid: "Do not reverse the path while keeping the same intended meaning." },
      { title: "Describe respectfully and only as needed", body: "Use neutral, task-relevant features and fictional people while practising. People choose how they describe themselves, and public comparison of pupils’ bodies is not an appropriate class exercise.", example: "Use a fictional tall character or a tall classroom object in a locating task.", avoid: "Do not turn appearance into judgement or identity into a guessing game." },
    ],
    checks: [
      { q: "What comes before a descriptive feature?", options: ["A clear referent", "A full English sentence", "A random location"], answer: 0, explain: "The receiver must know what the feature describes." },
      { q: "What makes GO directional here?", options: ["Louder speech", "An established start and destination", "A larger handshape"], answer: 1, explain: "The movement path connects locations in the shared signing space." },
    ],
    phrases: [
      { meaning: "The tall person goes to the table.", gloss: "PERSON [left] TALL · TABLE [right] · GO left-to-right", build: "Place person → add neutral feature → place destination → show movement path.", focus: "Keep both locations stable while movement connects them." },
      { meaning: "Where is the book? It is at the table.", gloss: "BOOK WHERE? · TABLE [place] · BOOK [same place]", build: "Ask for object location → establish table → return the book to that anchor.", focus: "The answer uses the same table location as the question context." },
    ],
    reception: { title: "Rebuild the object-and-action map", setup: "Use two objects and one fictional person in three stable locations, then record four short descriptions or movements.", passes: ["Identify the active referent.", "Mark the feature or movement path.", "Replay to check that every later point returns to the same location."], evidence: "Reconstruct three of four referent maps and repair any location that moved." },
  },
  27: {
    enquiry: "How can a short classroom process remain visible from outcome to finish?",
    source: ["ndcs", "ndcsEnvironment", "signatureNotes"],
    teach: [
      { title: "Show the outcome before the sequence", body: "Let the learner see the finished task or complete demonstration before dividing it into stages. The visual outcome gives FIRST, NEXT and FINISH a shared purpose.", example: "Show the completed arrangement → reset materials → mark FIRST.", avoid: "Do not begin with a sequence word while the task itself is still unknown." },
      { title: "Each stage needs a boundary", body: "Use a short pause, position change or visible material state so one action ends before the next begins. BEFORE and AFTER compare established events rather than replace the demonstration.", example: "FIRST [action] → visible result → NEXT [action] → FINISH.", avoid: "Do not sign every English connector between continuous hand movements." },
      { title: "Understanding is shown in action", body: "After modelling, invite the learner to SHOW-ME or complete the process. A performed sequence reveals which step is understood more honestly than a yes response.", example: "YOU SHOW-ME → watch complete attempt → repair only the missing stage.", avoid: "Do not ask UNDERSTAND? and move on without observable evidence." },
    ],
    checks: [
      { q: "What should the learner see before FIRST?", options: ["The intended outcome or complete demonstration", "A long English explanation", "A score"], answer: 0, explain: "The outcome makes the stages meaningful." },
      { q: "What is stronger evidence of understanding?", options: ["Saying yes", "Demonstrating the sequence", "Watching the teacher again"], answer: 1, explain: "Action shows where a sequence is secure or breaks down." },
    ],
    phrases: [
      { meaning: "First look; next show me; then finish.", gloss: "FIRST LOOK [demo] · NEXT YOU SHOW-ME · FINISH", build: "Mark observation turn → hand over action → close the process.", focus: "Keep watching and doing as separate visual turns." },
      { meaning: "Show what happens before this and what happens after.", gloss: "THIS [event] · BEFORE SHOW-ME · AFTER SHOW-ME", build: "Establish target event → request earlier stage → return → request later stage.", focus: "Keep the central event anchored while comparing both sides." },
    ],
    reception: { title: "Follow a visible sequence", setup: "Ask Mum to demonstrate a familiar three-stage object task using real materials and sequence cards; no signed sequence model is supplied.", passes: ["Watch once for the complete outcome.", "Record only the three visible event boundaries.", "Repeat the task, using a show/point strategy or one separately observed repair item if a stage is unclear."], evidence: "Complete the visual process twice and improve one repaired stage; connected BSL sequencing remains pending qualified review." },
  },
  28: {
    enquiry: "How can a beginner make comparison and reasoning visible?",
    source: ["signatureNotes", "signatureLevel1"],
    teach: [
      { title: "Place what is being compared", body: "Establish two objects, examples or ideas in separate stable locations before using SAME, DIFFERENT or CHOOSE. The comparison then has visible referents rather than floating vocabulary.", example: "MODEL-A [left] · MODEL-B [right] · SAME / DIFFERENT WHAT?", avoid: "Do not sign SAME without showing what is being compared." },
      { title: "WHY is more than a hand sign", body: "The question’s non-manual pattern, gaze and response space show that a reason is requested. Keep the alternatives or evidence visible while asking.", example: "YOU CHOOSE A WHY? [hold gaze].", avoid: "Do not return to a neutral face before the question span finishes." },
      { title: "Show thinking at beginner level", body: "A learner can point, order, demonstrate or select evidence even when extended signed explanation is not yet available. Ask for visible thinking without pretending a novice phrase equals full curricular reasoning.", example: "CHOOSE → SHOW-ME → SAME/DIFFERENT → WHY?", avoid: "Do not force an English sentence into a guessed BSL sequence." },
    ],
    checks: [
      { q: "What must happen before SAME or DIFFERENT?", options: ["Speak the whole question", "Establish the things being compared", "Ask WHY immediately"], answer: 1, explain: "The visual referents make the comparison interpretable." },
      { q: "What can count as visible beginner reasoning?", options: ["Only a long signed explanation", "A clear choice, ordering, demonstration or pointed evidence", "A yes/no tap"], answer: 1, explain: "Reasoning can be shown without overstating language competence." },
    ],
    phrases: [
      { meaning: "Look at these two. What is the same and what is different?", gloss: "LOOK · A [left] · B [right] · SAME WHAT? · DIFFERENT WHAT?", build: "Gain attention → place both examples → ask one comparison at a time.", focus: "Eye gaze returns to each stable example rather than drifting." },
      { meaning: "Which do you choose? Show me why.", gloss: "YOU CHOOSE WHICH? · WHY SHOW-ME", build: "Keep choices visible → mark WHICH → pause → request visible evidence.", focus: "Do not answer the question for the learner while waiting." },
    ],
    reception: { title: "Recover the comparison map", setup: "Record four comparisons using two objects placed left and right; change only one feature each time.", passes: ["Identify the active pair.", "Decide whether SAME or DIFFERENT is being communicated.", "Locate the evidence shown after WHY."], evidence: "Recover all four comparison decisions and the indicated evidence." },
  },
  29: {
    enquiry: "How do you stay in an interaction when the form, pace or variant is unfamiliar?",
    source: ["signbank", "corpus", "signatureNotes", "signatureFrontline"],
    teach: [
      { title: "Keep the meaning you did receive", body: "Before requesting repair, identify the topic, people, action or location already understood. Ask only for the missing sign, fingerspelled name or detail instead of erasing the whole interaction.", example: "I understood BOOK and TABLE; request AGAIN only for the missing action.", avoid: "Do not say ‘nothing’ when useful context was visible." },
      { title: "Match the repair to the breakdown", body: "Use AGAIN for a missed form, SLOWER for pace, WHICH for a specific choice and SHOW-ME when a visible demonstration will resolve meaning. For a name, point to the missed name context and request repetition; use a fuller fingerspelling request only after learning it from a qualified connected model.", example: "NAME missed → indicate the name + AGAIN/SLOWER; movement unclear → SHOW-ME/AGAIN.", avoid: "Do not request slower signing when the real problem is an unknown meaning." },
      { title: "Variation is expected", body: "Another documented regional or personal sign may be valid. Compare the full form and context, ask which meaning is intended and record a brief school-confirmed note without storing child-identifying information.", example: "DIFFERENT SIGN? MEANING SAME? → confirm with the support team.", avoid: "Do not label a different variant wrong or blend two variants into a new sign." },
    ],
    checks: [
      { q: "What should you do before requesting the whole message again?", options: ["Discard all context", "Identify what was already understood", "Guess the missing detail"], answer: 1, explain: "Partial understanding supports a smaller and more useful repair." },
      { q: "What does a different documented sign automatically mean?", options: ["It is wrong", "It may be a valid variant", "It is another language"], answer: 1, explain: "BSL varies regionally, socially and individually." },
    ],
    phrases: [
      { meaning: "I understood the book, but which action? Show me again, slowly.", gloss: "BOOK UNDERSTAND · ACTION WHICH? · AGAIN SLOWER SHOW-ME", build: "Confirm known topic → isolate missing detail → request the appropriate repair.", focus: "Keep the original referent and interaction open." },
      { meaning: "That sign is different. Does it mean the same thing?", gloss: "SIGN DIFFERENT · MEANING SAME?", build: "Point to or reproduce the unfamiliar form → mark contrast → ask one meaning question.", focus: "Curiosity replaces correction." },
    ],
    reception: { title: "Observe variation and choose repair", setup: "Use two recorded examples on one external comparison page and one deliberately fast familiar partner rehearsal. The app does not select or certify either example.", passes: ["First pass: identify any meaning or visible feature that remains available.", "Second pass: choose AGAIN, SLOWER, WHICH or SHOW-ME for the specific gap only if that item has been separately observed.", "Third pass: compare without deciding that one documented variant is wrong."], evidence: "Complete three focused repair decisions and record one non-identifying variant note for qualified confirmation; do not award receptive competence." },
  },
  30: {
    enquiry: "What evidence shows that a classroom task was understood?",
    source: ["ndcs", "ndcsEnvironment", "signatureNotes", "signatureFrontline"],
    teach: [
      { title: "Separate watching from doing", body: "Gain attention, state the small outcome and model the whole task while materials remain still. Pause, then hand over the materials or invite the learner to act.", example: "Gain gaze → show the complete example → stop → offer the materials and working space.", avoid: "Do not ask the child to manipulate materials while the essential signed model is still happening." },
      { title: "Check by visible action", body: "A nod or YES may reflect politeness, partial understanding or a wish to continue. Ask the learner to show, point, choose, order or complete the first step so understanding is evidenced without embarrassment.", example: "UNDERSTAND? is followed by SHOW-ME / CHOOSE / first action.", avoid: "Do not ask ‘understand?’ repeatedly and treat the answer as proof." },
      { title: "Repair one missing part", body: "If the action does not match the task, pause without public blame, identify the missing step, remodel only that part and give fresh processing time. Then offer specific feedback and transition clearly.", example: "Pause → show one step → stop fully → offer the task again → acknowledge the observable change.", avoid: "Do not restart a long explanation when only one visible detail was missed." },
    ],
    checks: [
      { q: "Which is the strongest beginner check of understanding?", options: ["A quick nod", "Showing or completing the first step", "Repeating the English instruction"], answer: 1, explain: "Visible action provides evidence tied to the actual task." },
      { q: "What should happen after one step is unclear?", options: ["Repeat everything faster", "Remodel the missing part and recheck", "Mark the lesson failed"], answer: 1, explain: "Focused repair reduces load and preserves dignity." },
    ],
    phrases: [
      { meaning: "Gain attention, show the complete example, then make the handover to the learner unmistakable.", gloss: "[TEACHING ROUTINE — NO CONNECTED BSL MODEL]", build: "Attention → complete visual model → full stop → offer materials and working space.", focus: "Materials move only after the model finishes; confirm any language for the handover with qualified support." },
      { meaning: "Show me the first step. Not yet—watch this part again, then try.", gloss: "FIRST SHOW-ME · NOT-YET · THIS PART AGAIN LOOK · TRY", build: "Visible check → calm mismatch signal → one-part remodel → fresh attempt.", focus: "Feedback identifies the next action rather than praising or correcting vaguely." },
    ],
    reception: { title: "Teach, check and repair one real task", setup: "Choose a simple three-step primary task with visible materials and record one complete teaching sequence.", passes: ["First pass: identify attention, model, handover and processing time.", "Second pass: complete the task from the signed/visual sequence.", "Third pass: introduce one controlled misunderstanding and repair only the missing step."], evidence: "The partner completes the sequence, and the repair changes one observable action without spoken English carrying the task." },
  },
  31: {
    enquiry: "How does the teacher work with support without outsourcing the relationship?",
    source: ["ndcsEnvironment", "ndcsPrimary", "nrcpdRoles", "signatureFrontline"],
    teach: [
      { title: "Address the child directly", body: "Face, greet and question the child—not the support adult. Keep the child in the interaction while an interpreter, communication support worker, Teacher of the Deaf or other agreed professional enables access.", example: "Use YOU and the child’s established locus while allowing the support professional’s processing time.", avoid: "Do not say ‘tell them’ while looking only at the adult." },
      { title: "Different roles are not interchangeable", body: "A Teacher of the Deaf, registered interpreter, communication support worker and teaching assistant have different training and responsibilities. Ask the school what role is in place and follow the agreed access arrangements.", example: "Clarify who prepares vocabulary, who interprets, who supports learning and how the teacher should pause.", avoid: "Do not assume every support adult is an interpreter or ask them to replace direct teaching." },
      { title: "Preparation improves access", body: "Share lesson purpose, key vocabulary, visuals and likely questions in advance where possible. Confirm regional, personal or school-used variants, allow interpreting or processing lag and know when to defer.", example: "Before a science lesson, agree the small repeated vocabulary set and visual materials with the support team.", avoid: "Do not introduce complex specialist language without preparation and expect live repair to solve everything." },
    ],
    checks: [
      { q: "Who should the teacher address?", options: ["Only the support adult", "The child directly", "Whoever answers fastest"], answer: 1, explain: "Support enables communication; it does not replace the teacher-child relationship." },
      { q: "What should happen before a vocabulary-heavy lesson?", options: ["Nothing", "Share purpose, visuals and key terms with the support team", "Ask the child to teach the class"], answer: 1, explain: "Preparation reduces avoidable access barriers." },
    ],
    phrases: [
      { meaning: "Address the child, ask one clear question and wait for the supported response.", gloss: "YOU [child-locus] · QUESTION · WAIT", build: "Face child → establish question → pause for access/processing → receive child’s answer.", focus: "Gaze and body orientation remain with the child." },
      { meaning: "I did not understand. Show me again, then we will confirm with the support team.", gloss: "ME NOT-UNDERSTAND · AGAIN SHOW-ME · SUPPORT CONFIRM", build: "Honest repair → one visible retry → appropriate confirmation route.", focus: "Do not make the child responsible for certifying the teacher’s BSL." },
    ],
    reception: { title: "Keep the relationship direct", setup: "Use four short scenarios with Mum acting only as the support professional’s position, not as the child.", passes: ["Identify where the teacher’s gaze and question should be directed.", "Insert adequate processing time before the response.", "Choose direct repair or deferral according to the communication stakes."], evidence: "Complete all four professional decisions without outsourcing the relationship or exceeding beginner competence." },
  },
  32: {
    source: ["ndcs", "ndcsEnvironment", "ndcsPrimary"],
  },
  33: {
    enquiry: "How can a book interaction remain visual, shared and genuinely conversational?",
    source: ["ndcsStory", "ndcs", "signatureNotes"],
    teach: [
      { title: "Show, pause, then communicate", body: "A child cannot study a page and watch signing at exactly the same moment. Establish the page or illustration, allow viewing time, then regain attention before signing about it.", example: "SHOW PAGE → pause → regain gaze → CHARACTER WHO?", avoid: "Do not sign the key question while the child is still looking down at the book." },
      { title: "Place characters consistently", body: "Establish each character in a stable location and return to that location through pointing and gaze. This allows events and relationships to remain followable without repeating names.", example: "CHARACTER-A [left] · CHARACTER-B [right] · INDEX-left GO.", avoid: "Do not swap character locations between beginning and end." },
      { title: "Sequence supports prediction", body: "Make BEGINNING, CENTRE and END visible as three stages. A prediction question belongs after the known sequence has been established and must leave real response space.", example: "BEGINNING [left] · CENTRE [middle] · NEXT PREDICT WHAT?", avoid: "Do not treat the English phrase ‘middle of the story’ as one guaranteed BSL form." },
    ],
    checks: [
      { q: "What should happen after showing an illustration?", options: ["Sign immediately", "Allow viewing, then regain attention", "Cover the page"], answer: 1, explain: "Visual attention can move between page and signer, not occupy both fully at once." },
      { q: "Why keep character locations stable?", options: ["Decoration", "So later reference remains followable", "To avoid facial grammar"], answer: 1, explain: "Space carries reference across the story interaction." },
    ],
    phrases: [
      { meaning: "Set up an accessible story interaction: show the page, allow viewing time, regain attention and establish one character visibly.", gloss: "[STORY ACCESS PLAN — NO CONNECTED BSL MODEL]", build: "Show page → pause for viewing → regain gaze → point to or place the character → leave response space.", focus: "Do not invent a connected character question from the English prompt." },
      { meaning: "Use three picture cards to make beginning, middle and end visible; reserve any prediction question for a fluent model.", gloss: "[VISUAL SEQUENCE — CONNECTED QUESTION PENDING REVIEW]", build: "Lay out three events → confirm the current event visually → invite a response through an agreed classroom method.", focus: "Question ordering, non-manual scope and character reference require qualified linguistic review." },
    ],
    reception: { title: "Audit story access", setup: "Use three picture cards or pages to test sightlines, attention shifts and response space. No connected signed story is supplied or assessed.", passes: ["Check that page viewing and watching the signer are separated.", "Check that one character or event remains visually stable.", "Identify the point where a fluent signed question or qualified support would be required."], evidence: "Document two access strengths and one language gap for qualified review; do not claim story-level BSL reception." },
  },
  34: {
    source: ["sscCurriculum", "ndcs", "signatureNotes"],
    phrases: [
      { meaning: "Prepare a visible subject timetable and indicate the current and next slots; use only individual subject forms confirmed for the school context.", gloss: "[CURRICULUM ACCESS PLAN — NO CONNECTED BSL MODEL]", build: "Place subject cards → mark current and next positions visually → note which individual forms are confirmed or pending.", focus: "The curriculum glossary and dictionary pages support further checking; they do not verify a classroom sentence or school-used variant." },
      { meaning: "Before a subject lesson, identify three repeated terms and agree how each will be communicated with the support team.", gloss: "[PRE-TEACHING DECISION — LINGUISTIC REVIEW REQUIRED]", build: "Choose three high-value terms → attach visuals or real objects → confirm the source and local form → rehearse access timing.", focus: "Do not improvise technical signs, build an enormous dictionary or make the child certify the teacher’s vocabulary." },
    ],
    reception: { title: "Prepare subject access without improvising", setup: "Use subject cards and the school’s existing support route. External pages are comparison or glossary resources; no clip is selected by this app.", passes: ["Choose three terms that will recur in one real lesson.", "Mark each term confirmed, pending support-team confirmation or unnecessary.", "Plan the visual, object or written support that remains available even when a sign is uncertain."], evidence: "Produce a three-term preparation note with no identifying pupil data and no claim that the app verified a connected BSL sequence." },
  },
  35: {
    enquiry: "Can visual-access habits and safe professional decisions remain available across a full school-day rehearsal?",
    source: ["ndcs", "ndcsEnvironment", "signatureLevel1", "signatureNotes"],
    teach: [
      { title: "Transitions need new attention", body: "Door greeting, timetable, teaching, group work, break and goodbye are separate visual events. Regain attention and establish the new context instead of carrying one continuous stream of signing across movement.", example: "FINISH learning → pause → NEXT group → regain gaze before the new instruction.", avoid: "Do not sign a transition while turning, walking or rearranging materials." },
      { title: "Separate four kinds of practice evidence", body: "Model observation, self-comparison, classroom rehearsal and repair decisions are different. None is a qualified linguistic assessment, and a smooth isolated attempt may still disappear in a real interaction.", example: "Observe HELP; self-compare one feature; rehearse a low-stakes response; choose repair when meaning is unclear.", avoid: "Do not reduce the day to one mastery percentage or label it receptive competence." },
      { title: "Boundaries travel through the whole day", body: "The teacher can connect, clarify and make access better, but safeguarding, medical, emergency and complex pastoral communication still require the agreed qualified support and school procedure.", example: "State NOT-UNDERSTAND, keep addressing the child, bring in the right person and seek confirmation.", avoid: "Do not let a successful rehearsal create false interpreting confidence." },
    ],
    checks: [
      { q: "What begins each new classroom event?", options: ["A longer sentence", "A fresh visual-attention and context boundary", "Walking to the next place"], answer: 1, explain: "The child needs to know that a new communicative event has begun." },
      { q: "Which result can override good isolated production?", options: ["A weak real-scenario performance", "A page visit", "Time spent"], answer: 0, explain: "Classroom use is stronger evidence than an isolated form." },
    ],
    phrases: [
      { meaning: "Good morning. Today: reading, maths, break. Are you ready?", gloss: "GOOD-MORNING · TODAY READING MATHS BREAK [timeline] · YOU READY?", build: "Greeting → three-point visible timetable → readiness question and response space.", focus: "Point to the visual timetable rather than delivering a memorised list." },
      { meaning: "I did not understand. Show me again. Thank you—goodbye.", gloss: "ME NOT-UNDERSTAND · AGAIN SHOW-ME · THANK-YOU · GOODBYE", build: "Honest breakdown → repair request → confirm meaning → separate end-of-day close.", focus: "Do not close until the repaired meaning has been checked." },
    ],
    reception: { title: "Full school-day access route", setup: "Perform twelve short access or professional-decision events from greeting to goodbye, including one deliberate low-stakes misunderstanding and one help scenario.", passes: ["First pass: identify each attention and event boundary.", "Second pass: record observation, self-comparison, partner rehearsal and professional decisions separately.", "Third pass: repeat only two weak access moments; do not reveal an app-authored connected model."], evidence: "Complete every event, document the practice type and name exactly what still needs qualified linguistic feedback." },
  },
  36: {
    enquiry: "What is genuinely secure, what remains fragile and how will responsible learning continue?",
    source: ["signatureLevel1", "signatureNotes", "corpus", "ndcs"],
    teach: [
      { title: "Compare evidence, not memory of effort", body: "Repeat selected Day 1 tasks under the same conditions and compare visible attention, signing space, pausing and repair choices. Improvement must be observable, not inferred from completing 36 pages.", example: "Keep both greeting rehearsals and compare gaze, timing, visibility and response space.", avoid: "Do not use elapsed hours or Mum’s rating as proof of linguistic competence." },
      { title: "Useful habits and language gaps can coexist", body: "Name the access habits that improved, then identify every individual or connected form still needing a selected model and qualified feedback. Honest uncertainty is useful planning information.", example: "Attention-before-message is consistent; WHY form and question scope remain pending review; medical communication is always deferred.", avoid: "Do not compress mixed evidence into one mastery score or claim receptive competence." },
      { title: "Completion is a beginning", body: "Around 108 guided hours can establish study habits and access awareness, but this unreviewed app cannot establish or certify a BSL foundation. Linguistic competence requires sustained Deaf-led or qualified teaching, feedback and real interaction. Choose a specific next 30-day route.", example: "Book a Signature-approved or Deaf-led course and protect two weekly retrieval sessions plus one real feedback opportunity.", avoid: "Do not describe yourself as fluent, classroom-ready in BSL or qualified to interpret; never use uncertain BSL as the child’s access provision." },
    ],
    checks: [
      { q: "What proves improvement from Day 1?", options: ["Completing every page", "A visible change under comparable conditions", "A high confidence rating"], answer: 1, explain: "Comparable performance evidence makes progress honest." },
      { q: "What is the responsible next step?", options: ["Stop because the course is complete", "Continue through Deaf-led or qualified teaching and real interaction", "Interpret complex conversations"], answer: 1, explain: "This course is a foundation, not fluency or certification." },
    ],
    phrases: [
      { meaning: "Rehearse a direct welcome using only individually observed items, then pause for a real response; send the connected sequence for qualified feedback.", gloss: "[FINAL REHEARSAL — NO CERTIFIED CONNECTED BSL]", build: "Establish access → use one observed greeting or identity item at a time → pause → record every uncertain transition.", focus: "Completion does not certify ordering, fluency or classroom-ready connected BSL." },
      { meaning: "In a planned low-stakes misunderstanding, use one separately studied repair item; for medical, safeguarding, emergency or complex communication, stop and follow procedure.", gloss: "[BOUNDARY REHEARSAL — NO INTERPRETING CLAIM]", build: "Name the low-stakes gap → choose one observed repair route → confirm meaning or defer → keep addressing the child directly.", focus: "The final task must preserve professional limits rather than reward a fluent-looking script." },
    ],
    reception: { title: "Baseline, access scenario and continuation", setup: "Repeat the Day 1 access-and-greeting setup, complete one professional classroom decision scenario and review saved Mum rehearsal evidence. No qualified linguistic assessment is supplied.", passes: ["Compare observable attention, visibility, pausing and repair behaviour under the same conditions.", "Separate self-reported recall, form comparison, classroom rehearsal and professional decisions; do not relabel them as receptive competence.", "Choose three useful habits, three language items pending qualified review and three dated continuation actions."], evidence: "Produce a realistic first-week access plan and dated 30-day continuation plan that explicitly states: beginner, not fluent, not an interpreter, linguistic release pending qualified review." },
  },
};

const READINESS_LAB_KINDS = {
  1: "model-observation",
  2: "partner-rehearsal",
  3: "model-observation",
  4: "partner-rehearsal",
  5: "partner-rehearsal",
  6: "partner-rehearsal",
  7: "partner-rehearsal",
  8: "partner-rehearsal",
  9: "partner-rehearsal",
  10: "partner-rehearsal",
  11: "professional-decision",
  12: "partner-rehearsal",
  13: "model-observation",
  14: "self-comparison",
  15: "partner-rehearsal",
  16: "model-observation",
  17: "self-comparison",
  18: "partner-rehearsal",
  19: "self-comparison",
  20: "professional-decision",
  21: "partner-rehearsal",
  22: "professional-decision",
  23: "partner-rehearsal",
  24: "partner-rehearsal",
  25: "professional-decision",
  26: "self-comparison",
  27: "self-comparison",
  28: "self-comparison",
  29: "model-observation",
  30: "partner-rehearsal",
  31: "professional-decision",
  32: "professional-decision",
  33: "professional-decision",
  34: "professional-decision",
  35: "partner-rehearsal",
  36: "self-comparison",
};

const LAB_SCOPE_COPY = {
  "model-observation": "Observe external recorded examples only. No clip is selected or linguistically certified by this app.",
  "self-comparison": "Compare only the named visible features in your own attempts; do not grade linguistic accuracy.",
  "partner-rehearsal": "Treat this as informal partner rehearsal, not receptive-skill assessment or formal BSL evidence.",
  "professional-decision": "Judge the safe professional or access response, not the accuracy of a BSL performance.",
};

const GUIDANCE_SOURCE_SCOPE = "Guidance and further study only. These sources do not verify app-authored connected phrases, select a dictionary clip or certify learner performance.";

const rebuiltKnowledge = COURSE.map((lesson) => {
  const base = LEGACY_KNOWLEDGE_PACKS[lesson.knowledgeSource - 1];
  const replacement = READINESS_KNOWLEDGE[lesson.day] || {};
  const reception = replacement.reception || base.reception;
  const labKind = reception.kind || READINESS_LAB_KINDS[lesson.day];
  if (!labKind) throw new Error(`Missing honest lab kind for Day ${lesson.day}`);
  return {
    ...base,
    ...replacement,
    lessonId: lesson.id,
    source: [...(replacement.source || base.source)],
    terms: [...lesson.vocab],
    teach: (replacement.teach || base.teach).map((item) => ({ ...item })),
    checks: (replacement.checks || base.checks).map((item) => ({ ...item, options: [...item.options] })),
    phrases: (replacement.phrases || base.phrases).map((item) => ({
      ...item,
      kind: item.kind || "access-rehearsal",
      connectedModel: null,
      linguisticReview: "pending-qualified-review",
    })),
    reception: {
      ...reception,
      kind: labKind,
      setup: `${LAB_SCOPE_COPY[labKind]} ${reception.setup}`,
      passes: [...reception.passes],
      evidence: `${reception.evidence} Record this as practice evidence only; it does not certify receptive BSL, connected production or classroom competence.`,
      assessmentStatus: "practice-only",
      linguisticReview: "pending-qualified-review",
    },
  };
});

KNOWLEDGE_PACKS.splice(0, KNOWLEDGE_PACKS.length, ...rebuiltKnowledge);

COURSE.forEach((lesson, index) => {
  const pack = KNOWLEDGE_PACKS[index];
  if (!pack) throw new Error(`Missing authored knowledge for Day ${lesson.day}`);
  if (pack.lessonId !== lesson.id)
    throw new Error(`Knowledge/lesson identity mismatch for Day ${lesson.day}`);
  lesson.enquiry = pack.enquiry;
  lesson.knowledge = pack.teach;
  lesson.knowledgeChecks = pack.checks;
  lesson.phrases = pack.phrases;
  lesson.receptionLab = pack.reception;
  lesson.sourceScope = GUIDANCE_SOURCE_SCOPE;
  lesson.linguisticReview = "pending-qualified-review";
  lesson.connectedLanguageStatus = "not-certified";
  lesson.evidenceSources = pack.source.map((key) => ({
    ...LEARNING_SOURCES[key],
    scope: GUIDANCE_SOURCE_SCOPE,
  }));
  lesson.vocab = pack.terms;
  lesson.items = pack.terms.map((term) => {
    const guide = itemGuidance(term, lesson);
    const itemId = `${lesson.id}:${String(term)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
    const modelType = term === "own-name fingerspelling" || /^[A-Z]$/.test(term)
      ? "fingerspelling-system"
      : term === "numbers 0–10" || /^\d+$/.test(term)
        ? "regional-number-system"
        : "external-comparison-page";
    return {
      id: itemId,
      term,
      ...guide,
      communicativeIntention: guide.meaning,
      classroomContext: lesson.purpose,
      sourcePageType: modelType,
      linkCheckedOn: "2026-08-04",
      selectedClip: null,
      linguisticReview: "pending-qualified-review",
      regionalVariation: "A documented regional, personal or school-used variant may also be valid. Confirm the child’s or school’s preferred form with the support team.",
      model: {
        id: `${modelType}:${modelType === "external-comparison-page" ? signSlug(term) : String(term).toLowerCase()}`,
        type: modelType,
        url: guide.url,
        source: guide.source,
        intendedSense: guide.meaning,
        linkCheckedOn: "2026-08-04",
        selectedClip: null,
        linguisticReview: "pending-qualified-review",
        verification: modelType === "external-comparison-page"
          ? "Link availability only. The page may contain multiple senses or variants; no clip is selected and no form is linguistically certified."
          : "Official system page linked for observation. No learner attempt or selected example is linguistically certified.",
        licence: "External link only; third-party media is not copied, cached or redistributed.",
      },
      resource: {
        label: `Compare recorded examples for “${term}”`,
        url: guide.url,
        source: guide.source,
        modelType,
        linkCheckedOn: "2026-08-04",
        selectedClip: null,
        linguisticReview: "pending-qualified-review",
        limitation: modelType === "external-comparison-page"
          ? "External comparison page only: the app has not selected or certified a clip. Confirm the intended sense and form through qualified Deaf/BSL review before classroom reliance."
          : "System resource for observation only: use it for the specified letter or number task and notice documented variation; performance remains unassessed.",
        variation: "Another regional or school-confirmed form may be valid.",
        purpose: `Compare recorded examples associated with ${guide.meaning}; the English label is only a route to the page and does not certify a BSL form.`,
        watch: guide.watch,
        returnCue: `Close the page, wait five seconds, then attempt “${term}” for self-comparison only. Record uncertainty instead of treating the page as certification.`,
      },
    };
  });
});

const FIRST_DAY_STARTER = [
  {
    term: "Visual attention",
    source: "Day 1 foundation",
    kind: "foundation",
    prompt: "Face the screen, look away, then bring your gaze back before raising your hands. Notice the exact moment communication becomes possible.",
    clue: "The goal is not a sign. It is a visible attention boundary before language begins.",
    check: "Your gaze is settled before your hands start moving.",
  },
  {
    term: "Signing window",
    source: "Day 1 foundation",
    kind: "foundation",
    prompt: "Position the device so your face, shoulders, elbows and both hands remain visible without leaning backwards.",
    clue: "Check the top, sides and bottom of the camera frame with one slow hand movement.",
    check: "No part of the face or hand movement leaves the frame.",
  },
  {
    term: "Dominant hand",
    source: "Day 1 foundation",
    kind: "foundation",
    prompt: "Choose the hand you will use as dominant today. Make two slow pretend letter shapes without swapping roles.",
    clue: "For most learners this is the writing hand, but comfort and consistency matter more than the label.",
    check: "The same hand leads both attempts.",
  },
];

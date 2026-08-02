/*
 * BSL Learner Companion · authored knowledge layer
 *
 * This file deliberately separates:
 *   - knowledge about BSL and Deaf communication;
 *   - a contextual meaning to express;
 *   - the external signed model needed to learn an exact form.
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
};

const SIGN_OVERRIDES = {
  "how are you": { slug: "hello-how-are-you", sense: "a social question about how someone is" },
  "my name is": { slug: "my-name-is", sense: "introducing your name" },
  "not understand": { slug: "dont-understand", sense: "saying that you have not understood" },
  "don't understand": { slug: "dont-understand", sense: "saying that you have not understood" },
  "show me": { slug: "show", sense: "asking someone to show or demonstrate" },
  "well done": { slug: "well-done", sense: "giving positive feedback" },
  "try again": { slug: "try", sense: "asking for another attempt; combine TRY with the separately learnt AGAIN sign" },
  "go home": { slug: "go-home", sense: "going home" },
  "wake up": { slug: "wake-up", sense: "waking from sleep" },
  "not like": { slug: "dislike", sense: "expressing dislike" },
  "yes/no question": { slug: "question", sense: "asking a closed question" },
  "wh-question": { slug: "question", sense: "asking for information" },
  "fingerspell please": { slug: "fingerspell", sense: "asking for a word to be fingerspelled" },
  "got it": { slug: "understand", sense: "confirming understanding" },
  "PE": { slug: "physical-education", sense: "the school subject physical education" },
  "I": { slug: "me", sense: "reference to yourself in the current interaction" },
  "BSL": { slug: "british-sign-language", sense: "British Sign Language, not another signed language or fingerspelled English" },
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
  "try again": "an instruction to make another attempt",
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
  "got it": "confirmation that the repaired meaning is now understood",
  happened: "asking or stating what happened in a story",
  feel: "asking or stating a feeling",
  finish: "the end or outcome of an event or task",
  "my turn": "claiming or marking the signer’s turn",
  copy: "an instruction to copy a demonstrated action or sign",
  attention: "gaining or holding visual attention",
};

const QUESTION_TERMS = new Set(["who", "what", "where", "when", "why", "how", "which", "how many", "question"]);
const FEELING_TERMS = new Set(["happy", "sad", "worried", "angry", "tired", "excited", "fine", "love", "like", "not like"]);
const TIME_TERMS = new Set(["today", "yesterday", "tomorrow", "morning", "afternoon", "evening", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "year"]);
const DIRECTIONAL_TERMS = new Set(["help", "show me", "give", "ask", "tell", "look", "visit", "phone"]);
const REPAIR_TERMS = new Set(["again", "slower", "not understand", "don't understand", "which sign", "fingerspell please", "got it", "understand"]);

function signSlug(term) {
  return (SIGN_OVERRIDES[term]?.slug || term)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function itemGuidance(term, lesson) {
  const lower = term.toLowerCase();
  const override = SIGN_OVERRIDES[term] || SIGN_OVERRIDES[lower] || {};
  if (/^[A-Z]$/.test(term)) {
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
      contrast: "A different regional version is not automatically an error. Keep one model consistent today and learn to recognise alternatives.",
      url: LEARNING_SOURCES.numbers.url,
      source: "UCL BSL SignBank number signs",
    };
  }
  let watch = "Watch the starting handshape, location and path of movement. Then replay once to notice the face, mouth pattern or body posture that belongs with the meaning.";
  let clue = `Put “${term}” into today’s smallest meaning block before trying to recall the sign.`;
  let contrast = "Choose the entry that matches today’s meaning; an English word can lead to several unrelated BSL signs.";
  if (QUESTION_TERMS.has(lower)) {
    watch = "Watch the manual sign and the whole question span: eyebrows, head position, eye gaze and the pause that invites an answer all contribute.";
    clue = `Imagine genuinely asking somebody “${term} …?” and set your face before retrieving the manual sign.`;
    contrast = "A question is not created by the manual question sign alone. The non-manual pattern must cover the relevant part of the question.";
  } else if (FEELING_TERMS.has(lower)) {
    watch = "Watch the face and body from the first frame. The non-manual expression is part of the meaning, not decoration added after the hand movement.";
    clue = `Adopt the feeling or attitude first, then retrieve “${term}” without mouthing a full English sentence.`;
    contrast = "Do not use one fixed smile or frown for every feeling; expression, intensity and context need to agree.";
  } else if (TIME_TERMS.has(term) || TIME_TERMS.has(lower)) {
    watch = "Notice where the sign sits on the BSL time line and whether its movement points behind, at or ahead of the signer’s current time.";
    clue = `Place the time “${term}” before the event in your mental plan, then retrieve its sign.`;
    contrast = "Time-first is a useful beginner planning frame, not a rule that every BSL sentence must follow identically.";
  } else if (DIRECTIONAL_TERMS.has(lower)) {
    watch = "Watch where the movement begins and ends. With indicating verbs, that path may show who acts on whom rather than merely decorate the citation form.";
    clue = `Place two people in space, then decide who is acting towards whom before retrieving “${term}”.`;
    contrast = "Do not practise only a neutral dictionary form if today’s task requires a clear source and destination in signing space.";
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
    use: `Use it inside today’s communication task: ${lesson.use}`,
    watch,
    clue,
    contrast,
    url: `https://www.signbsl.com/sign/${signSlug(term)}`,
    source: "SignBSL video dictionary",
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
      { meaning: "Are there eight children?", gloss: "CHILD 8?", build: "Topic → quantity → yes/no non-manual pattern.", focus: "Hold the final question space for a reply." },
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
      { title: "Feedback needs a referent", body: "Make clear which action or person the feedback relates to. GOOD or TRY-AGAIN alone can be ambiguous in a busy room.", example: "YOUR WORK GOOD · WELL-DONE.", avoid: "Do not sign praise while looking at somebody else." },
      { title: "Tone is visible", body: "Face, movement quality and body posture communicate warmth, urgency or correction. Match the non-manual tone to the classroom purpose without exaggeration.", example: "CAREFUL can be calm and protective rather than angry.", avoid: "Do not use the same sharp movement for praise and correction." },
      { title: "Correction includes the next action", body: "A useful correction says what to do, not only that something is wrong. Give one clear retry instruction and then visibly yield the turn.", example: "TRY · AGAIN · SLOW [pause and offer response space].", avoid: "Do not stack several corrections before the pupil can respond." },
    ],
    checks: [
      { q: "What makes feedback specific?", options: ["Volume", "A clear person/action referent", "Speed"], answer: 1, explain: "The learner must know what the feedback concerns." },
      { q: "What should correction include?", options: ["A next action", "Only NOT", "More signs"], answer: 0, explain: "Actionable repair supports success." },
    ],
    phrases: [
      { meaning: "Your work is good. Well done.", gloss: "WORK YOUR GOOD · WELL-DONE", build: "Refer to work/person → judgement → social praise.", focus: "Coordinate warm facial tone and direct gaze." },
      { meaning: "Try again slowly; I’m giving you the turn.", gloss: "TRY · AGAIN · SLOW · YOU [yield-turn]", build: "Retry → manner → point/reference → visible turn handover.", focus: "Stop signing, shift into receptive gaze and allow the attempt." },
    ],
    reception: { title: "Read the feedback tone", setup: "Record GOOD, CAREFUL and TRY-AGAIN with their appropriate classroom purpose.", passes: ["Watch the face only and label warm/urgent/corrective.", "Watch the hands and identify the message.", "Check whether both channels agree."], evidence: "Repair one version where tone and message conflict." },
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

COURSE.forEach((lesson, index) => {
  const pack = KNOWLEDGE_PACKS[index];
  if (!pack) throw new Error(`Missing authored knowledge for Day ${lesson.day}`);
  lesson.enquiry = pack.enquiry;
  lesson.knowledge = pack.teach;
  lesson.knowledgeChecks = pack.checks;
  lesson.phrases = pack.phrases;
  lesson.receptionLab = pack.reception;
  lesson.evidenceSources = pack.source.map((key) => LEARNING_SOURCES[key]);
  lesson.vocab = pack.terms;
  lesson.items = pack.terms.map((term) => {
    const guide = itemGuidance(term, lesson);
    return {
      term,
      ...guide,
      resource: {
        label: `Watch the signed model for “${term}”`,
        url: guide.url,
        source: guide.source,
        purpose: `Learn ${guide.meaning}; the English label is only a route to a signed model.`,
        watch: guide.watch,
        returnCue: `Close the model, wait five seconds, then use “${term}” in the lesson context before rating it.`,
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

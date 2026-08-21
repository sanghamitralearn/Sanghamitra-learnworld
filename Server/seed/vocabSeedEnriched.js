// seed/vocabSeedEnriched.js
//
// Demonstrates the misconception-diagnostic fields added to VocabQuestion
// (optionFeedback, optionMisconceptions, misconceptions, scaffoldingLevels,
// forwardRiskLinks, learningObjectives, skillId) with five fully-authored
// GRE-level vocabulary items.
//
// This is purely additive: it INSERTS new documents and does not touch or
// delete any existing vocab_questions content, since those were entered by
// hand and there is no prior seed script to safely overwrite.
//
// Run with: node seed/vocabSeedEnriched.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const VocabQuestion = require('../model/vocabSchema');

const questions = [
  {
    questionType: 'contextual_meaning',
    skillId: 'VOC-CONTEXT-01',
    question: "In the sentence \"Fame in this industry is often ephemeral, vanishing as quickly as it arrives,\" the word EPHEMERAL most nearly means:",
    options: {
      a: 'Lasting for a very short time',
      b: 'Extremely valuable',
      c: 'Impossible to obtain',
      d: 'Widely admired'
    },
    correctOption: 'a',
    explanation: 'Ephemeral describes something transient — here, fame that fades almost as fast as it appears.',
    optionFeedback: {
      a: 'Correct — ephemeral means fleeting or short-lived, which fits how quickly the fame vanishes in the sentence.',
      b: "Ephemeral describes duration, not worth — you may be thinking of 'invaluable' or 'precious'.",
      c: "Ephemeral says nothing about difficulty of obtaining something — you may be thinking of 'elusive'.",
      d: "Ephemeral doesn't describe how something is regarded by others — you may be thinking of 'esteemed' or 'renowned'."
    },
    optionMisconceptions: { a: '', b: 'E-ephemeral-b', c: 'E-ephemeral-c', d: 'E-ephemeral-d' },
    misconceptions: [
      {
        misconceptionId: 'E-ephemeral-b',
        description: "Student picks 'extremely valuable' for EPHEMERAL.",
        rootCause: "Sound/Register Association — 'ephemeral' has a refined, elevated tone similar to words like 'invaluable' or 'precious', so a student who knows the word only by its sophisticated feel guesses a similarly prestige-coded meaning rather than its literal sense of brevity.",
        remediation: "Anchor the word to its Greek root: 'epi-' (upon) + 'hemera' (day) — literally 'lasting only a day'. Pair it with a concrete image: a mayfly, morning dew, a sandcastle at high tide."
      },
      {
        misconceptionId: 'E-ephemeral-c',
        description: "Student picks 'impossible to obtain'.",
        rootCause: "Confusion With 'Elusive' — both words often appear in the same literary contexts (fame, happiness, success) and share a faintly negative, hard-to-hold connotation, so the two blur into one loosely-defined 'hard to keep' meaning.",
        remediation: "Contrast the pair directly: elusive = hard to catch or find; ephemeral = doesn't last once you have it. Fame can be both — hard to get (elusive) AND short-lived once gotten (ephemeral)."
      },
      {
        misconceptionId: 'E-ephemeral-d',
        description: "Student picks 'widely admired'.",
        rootCause: "Contextual Bleed — the surrounding sentence talks about fame, and fame is usually associated with admiration, so the answer is pulled from the sentence's topic rather than the target word's actual definition.",
        remediation: "Isolate the word from its sentence and test it in a neutral frame: 'The ___ nature of cherry blossoms.' Does 'widely admired' still fit? No — but 'short-lived' does."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the root', hint: "Ephemeral comes from Greek 'ephemeros' — 'lasting only a day'. What might that suggest about duration?" },
      { level: 2, description: 'Test in the sentence', hint: "Try substituting 'short-lived' for 'ephemeral'. Does the sentence still make sense?" },
      { level: 3, description: 'Eliminate distractors', hint: 'Which option describes how LONG something lasts, rather than its value, difficulty, or reputation?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'VOC-ROOT-01', probability: 0.5, condition: 'If not remediated before Greek/Latin root-based vocabulary units' }
    ],
    learningObjectives: [],
    synonyms: ['fleeting', 'transient', 'momentary', 'short-lived'],
    antonyms: ['permanent', 'enduring', 'everlasting', 'perpetual'],
    phonetic: '/ɪˈfem.ər.əl/',
    difficultyLevel: 'advanced',
    CEFRLevel: 'C1',
    topic: 'Descriptive Adjectives — Duration & Permanence',
    points: 2
  },
  {
    questionType: 'contextual_meaning',
    skillId: 'VOC-CONTEXT-01',
    question: "Her laconic reply — just \"No.\" — left no room for further discussion. LACONIC most nearly means:",
    options: {
      a: 'Using very few words',
      b: 'Deliberately rude',
      c: 'Full of hidden meaning',
      d: 'Angry and aggressive'
    },
    correctOption: 'a',
    explanation: 'Laconic describes a terse, economical style of speech, exactly what the one-word reply demonstrates.',
    optionFeedback: {
      a: 'Correct — laconic means using very few words, which is exactly what the one-word reply shows.',
      b: "Laconic describes brevity, not tone — a laconic reply can be perfectly polite; you may be thinking of 'brusque'.",
      c: "Laconic is about how MUCH is said, not how much is implied — you may be thinking of 'cryptic' or 'enigmatic'.",
      d: "Laconic says nothing about emotion — the word is neutral about tone; you may be thinking of an angry sense of 'terse'."
    },
    optionMisconceptions: { a: '', b: 'E-laconic-b', c: 'E-laconic-c', d: 'E-laconic-d' },
    misconceptions: [
      {
        misconceptionId: 'E-laconic-b',
        description: "Student picks 'deliberately rude'.",
        rootCause: "Tone Inference From Brevity — short answers can feel curt or dismissive in everyday conversation, so a student folds that social reading into the word's meaning, when laconic only describes word count, not attitude.",
        remediation: "Give a counter-example where laconic speech is warm, not rude: a monk's brief, peaceful 'Yes, child' — still laconic, not rude."
      },
      {
        misconceptionId: 'E-laconic-c',
        description: "Student picks 'full of hidden meaning'.",
        rootCause: "Confusion With 'Cryptic' — both words often describe short, striking replies in literature, so their meanings blur; laconic measures length, while cryptic measures how puzzling the content is.",
        remediation: "Contrast directly: a reply can be laconic AND cryptic ('Ask the river.'), or laconic without being cryptic at all ('Yes.'). Length and puzzle-value are independent."
      },
      {
        misconceptionId: 'E-laconic-d',
        description: "Student picks 'angry and aggressive'.",
        rootCause: "Contextual Bleed — 'left no room for further discussion' sounds confrontational, so the emotional tone of the surrounding sentence gets attributed to the word itself.",
        remediation: "Isolate the word: 'His laconic thank-you note' — still laconic, and clearly not angry. The word only ever describes length."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the root', hint: "Laconic comes from 'Laconia', the region of Sparta, whose people were famous for blunt, minimal speech. What does that suggest?" },
      { level: 2, description: "Count, don't judge", hint: 'Ask only: is the speech SHORT? Ignore whether it feels polite, rude, or mysterious.' },
      { level: 3, description: 'Test the example', hint: "The reply was just one word: 'No.' Which option is purely about word count?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'VOC-TONE-01', probability: 0.45, condition: 'If not remediated before tone/attitude vocabulary units' }
    ],
    learningObjectives: [],
    synonyms: ['terse', 'succinct', 'concise', 'curt'],
    antonyms: ['verbose', 'loquacious', 'wordy', 'garrulous'],
    phonetic: '/ləˈkɒn.ɪk/',
    difficultyLevel: 'advanced',
    CEFRLevel: 'C1',
    topic: 'Descriptive Adjectives — Speech & Communication Style',
    points: 2
  },
  {
    questionType: 'contextual_meaning',
    skillId: 'VOC-CONTEXT-01',
    question: "Smartphones have become so ubiquitous that it's rare to see anyone without one. UBIQUITOUS most nearly means:",
    options: {
      a: 'Present everywhere',
      b: 'Extremely expensive',
      c: 'Recently invented',
      d: 'Difficult to use'
    },
    correctOption: 'a',
    explanation: 'Ubiquitous means seeming to be everywhere at once — exactly how common smartphones have become.',
    optionFeedback: {
      a: 'Correct — ubiquitous means present or found everywhere, matching how common smartphones now are.',
      b: "Ubiquitous describes how WIDESPREAD something is, not its price — you may be thinking of 'exorbitant'.",
      c: "Ubiquitous says nothing about how new something is — you may be thinking of 'novel' or 'nascent'.",
      d: "Ubiquitous doesn't describe ease of use — you may be thinking of 'cumbersome' or 'unwieldy'."
    },
    optionMisconceptions: { a: '', b: 'E-ubiquitous-b', c: 'E-ubiquitous-c', d: 'E-ubiquitous-d' },
    misconceptions: [
      {
        misconceptionId: 'E-ubiquitous-b',
        description: "Student picks 'extremely expensive'.",
        rootCause: 'Feature Substitution — smartphones are commonly associated with high cost, so a student who half-remembers the word links it to that salient real-world feature of the example rather than the actual definition.',
        remediation: "Swap the example noun to break the association: 'Dust is ubiquitous in an old attic.' Dust isn't expensive, so 'present everywhere' is clearly the only fit."
      },
      {
        misconceptionId: 'E-ubiquitous-c',
        description: "Student picks 'recently invented'.",
        rootCause: "Contextual Bleed — smartphones are a relatively modern invention, so 'recently invented' feels contextually plausible even though the sentence describes prevalence, not novelty.",
        remediation: 'Ask: does the sentence say WHEN smartphones appeared, or HOW MANY places you see them? Only the second is being described.'
      },
      {
        misconceptionId: 'E-ubiquitous-d',
        description: "Student picks 'difficult to use'.",
        rootCause: "Negative-Association Guess — the unfamiliar, technical-sounding word gets guessed toward a mildly negative meaning associated with technology, like difficulty of use, in the absence of real knowledge.",
        remediation: "Break the word into its Latin root: 'ubique' means 'everywhere'. Anchor to that root rather than guessing from the sentence's technology theme."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the root', hint: "Ubiquitous comes from Latin 'ubique', meaning 'everywhere'. What might the word describe?" },
      { level: 2, description: 'Test in a neutral sentence', hint: "Try: 'Free Wi-Fi is now ___ in coffee shops.' Does 'present everywhere' fit better than the other options?" },
      { level: 3, description: 'Match to the clue', hint: "The sentence says 'rare to see anyone without one' — what does that tell you about how common smartphones are?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'VOC-ROOT-01', probability: 0.4, condition: 'If not remediated before Latin root-based vocabulary units' }
    ],
    learningObjectives: [],
    synonyms: ['omnipresent', 'pervasive', 'universal', 'widespread'],
    antonyms: ['rare', 'scarce', 'uncommon', 'sparse'],
    phonetic: '/juːˈbɪk.wɪ.təs/',
    difficultyLevel: 'intermediate',
    CEFRLevel: 'B2',
    topic: 'Descriptive Adjectives — Prevalence & Frequency',
    points: 1
  },
  {
    questionType: 'contextual_meaning',
    skillId: 'VOC-CONTEXT-01',
    question: 'She presented a cogent argument that left the panel with no valid counterpoint. COGENT most nearly means:',
    options: {
      a: 'Clear and convincing',
      b: 'Extremely long',
      c: 'Emotionally charged',
      d: 'Difficult to follow'
    },
    correctOption: 'a',
    explanation: 'Cogent describes an argument that is clear, logical, and compelling — precisely why the panel had no counterpoint.',
    optionFeedback: {
      a: 'Correct — cogent means clear, logical, and convincing, which is why the panel had no valid counterpoint.',
      b: "Cogent describes the QUALITY of reasoning, not its length — you may be thinking of 'exhaustive' or 'lengthy'.",
      c: "Cogent is about logical force, not emotion — you may be thinking of 'impassioned' or 'stirring'.",
      d: "This is close to the opposite — cogent means easy to follow because the logic is so clear; you may be thinking of 'convoluted'."
    },
    optionMisconceptions: { a: '', b: 'E-cogent-b', c: 'E-cogent-c', d: 'E-cogent-d' },
    misconceptions: [
      {
        misconceptionId: 'E-cogent-b',
        description: "Student picks 'extremely long'.",
        rootCause: "Effort-Length Conflation — students often assume a persuasive argument must be long and thorough, so 'convincing' gets mapped onto 'lengthy' rather than 'well-reasoned'.",
        remediation: "Give a one-line counter-example: 'The shortest, most cogent rebuttal was just three words.' Cogency can exist in a single sentence."
      },
      {
        misconceptionId: 'E-cogent-c',
        description: "Student picks 'emotionally charged'.",
        rootCause: 'Persuasion-Emotion Conflation — because emotional appeals are one common way arguments persuade, the student assumes all persuasive language must be emotional, missing that cogent specifically refers to logical force.',
        remediation: 'Contrast two persuasive styles: a tearful appeal (emotional, not necessarily cogent) versus a step-by-step proof (cogent, not necessarily emotional).'
      },
      {
        misconceptionId: 'E-cogent-d',
        description: "Student picks 'difficult to follow'.",
        rootCause: "Direct Antonym Confusion — the unfamiliar, academic-sounding word triggers a guess toward 'complicated' rather than its true sense of clarity, landing on close to the opposite meaning.",
        remediation: "Anchor to the Latin root 'cogere' — 'to drive together' — a cogent argument drives its points together so tightly that no gaps remain for confusion."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: 'Find the root', hint: "Cogent comes from Latin 'cogere', 'to compel or drive together'. What kind of argument would that describe?" },
      { level: 2, description: 'Check the consequence', hint: "The sentence says the panel had 'no valid counterpoint'. What quality of argument would cause that?" },
      { level: 3, description: 'Eliminate by category', hint: 'Which option describes the LOGICAL QUALITY of the argument, rather than its length, emotion, or clarity of delivery?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'WRITE-ARG-01', probability: 0.55, condition: 'If not remediated before persuasive-essay writing units' }
    ],
    learningObjectives: [],
    synonyms: ['compelling', 'convincing', 'persuasive', 'sound'],
    antonyms: ['weak', 'specious', 'unconvincing', 'flimsy'],
    phonetic: '/ˈkoʊ.dʒənt/',
    difficultyLevel: 'advanced',
    CEFRLevel: 'C1',
    topic: 'Descriptive Adjectives — Argumentation & Reasoning',
    points: 2
  },
  {
    questionType: 'contextual_meaning',
    skillId: 'VOC-CONTEXT-01',
    question: "Despite the setbacks, she remained sanguine about the project's chances of success. SANGUINE most nearly means:",
    options: {
      a: 'Optimistic and hopeful',
      b: 'Bloodthirsty and violent',
      c: 'Confused and uncertain',
      d: 'Angry and resentful'
    },
    correctOption: 'a',
    explanation: "Sanguine means cheerfully optimistic, especially in a difficult situation — matching her hopeful outlook despite the setbacks.",
    optionFeedback: {
      a: 'Correct — sanguine means cheerfully optimistic, especially given difficulty, which matches her outlook despite the setbacks.',
      b: "This is the word's literal Latin root ('sanguis' = blood) but not its modern meaning — you may be thinking of the related word 'sanguinary'.",
      c: "Sanguine is the opposite of uncertain — it describes confident optimism; you may be thinking of 'ambivalent'.",
      d: "Sanguine describes a positive, hopeful mood, not a negative one — you may be thinking of 'indignant' or 'embittered'."
    },
    optionMisconceptions: { a: '', b: 'E-sanguine-b', c: 'E-sanguine-c', d: 'E-sanguine-d' },
    misconceptions: [
      {
        misconceptionId: 'E-sanguine-b',
        description: "Student picks 'bloodthirsty and violent'.",
        rootCause: "Root-Word Trap — 'sanguine' and 'sanguinary' share the Latin root 'sanguis' (blood), so a student who half-remembers the root guesses the more literal, violent meaning instead of the figurative one that survived into modern English.",
        remediation: "Explain the historical shift: medieval physicians believed a person dominated by 'blood' (one of the four humours) was cheerful and confident — that meaning stuck as 'sanguine', while 'sanguinary' kept the literal, bloody sense."
      },
      {
        misconceptionId: 'E-sanguine-c',
        description: "Student picks 'confused and uncertain'.",
        rootCause: "Assumed Negative Register — the sentence mentions 'setbacks', a negative context, so the student assumes the target word must also carry a negative or uncertain tone, missing that it describes her resilient reaction TO the setbacks.",
        remediation: "Ask: is the word describing the setbacks, or her attitude despite them? The word 'despite' signals a contrast — her attitude is the opposite of the setbacks' negativity."
      },
      {
        misconceptionId: 'E-sanguine-d',
        description: "Student picks 'angry and resentful'.",
        rootCause: 'Negative-Contagion Guess — surrounded by talk of difficulty, the student guesses a generically negative emotion word without registering the specific meaning of hopeful confidence.',
        remediation: "Build a quick word-association chain aloud: sanguine → cheerful → confident → hopeful, to overwrite the instinct to guess negative."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Watch for 'despite'", hint: "'Despite the setbacks' signals a contrast. Is her attitude likely to match the setbacks, or oppose them?" },
      { level: 2, description: 'Recall the four humours', hint: "In old medicine, being 'sanguine' meant having a lot of blood — believed to make a person cheerful and confident." },
      { level: 3, description: 'Pick the opposite of gloomy', hint: 'Which option means the opposite of discouraged or uncertain?' }
    ],
    forwardRiskLinks: [
      { targetSkillId: 'VOC-ETYM-01', probability: 0.4, condition: 'If not remediated before etymology/word-history vocabulary units' }
    ],
    learningObjectives: [],
    synonyms: ['optimistic', 'hopeful', 'buoyant', 'confident'],
    antonyms: ['pessimistic', 'despondent', 'gloomy', 'downcast'],
    phonetic: '/ˈsæŋ.ɡwɪn/',
    difficultyLevel: 'advanced',
    CEFRLevel: 'C1',
    topic: 'Descriptive Adjectives — Mood & Temperament',
    points: 2
  }
];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  console.log('Connected to MongoDB');

  const inserted = await VocabQuestion.insertMany(questions);

  console.log(`Inserted ${inserted.length} enriched vocab questions.`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

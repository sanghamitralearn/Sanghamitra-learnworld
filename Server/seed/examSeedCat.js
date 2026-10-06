// seed/examSeedCat.js
//
// Populates exam_modules and cat_questions with two CAT papers, each split into the three CAT
// sections — VARC, DILR and Quantitative Ability — at 40 minutes apiece:
//   cat-1  CAT 2025 Practice Set 1 (66 questions)
//   cat-2  CAT 2025 Slot 1 (68 questions)
//
// Source: seed/exam-data/cat_questions.json — an export of the `sanghamitralearn.cat_questions`
// collection. Slot 1 figures live in Front/client/public/exam-images/cat-2/.
//
// TITA (type-in-the-answer) questions become student_produced_response. The Practice Set has no
// worked solutions, so its DILR and QA explanations are written below (every key was checked).
// Slot 1 uses the source solutions, except where they were garbled — those are rewritten.
//
// Run with: node seed/examSeedCat.js   (or: npm run seed:cat)

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const ExamQuestion = require('../model/ExamQuestion').forFamily('cat');
const { toHtml, PUBLIC_DIR } = require('./examSeedSat');

const SOURCE_FILE = path.join(__dirname, 'exam-data', 'cat_questions.json');

const EXAMS = {
  practice: { slug: 'cat-1', label: 'CAT · Practice Set 1', order: 1, citation: 'CAT 2025 Practice Set 1' },
  slot1: { slug: 'cat-2', label: 'CAT 2025 · Slot 1', order: 2, citation: 'CAT 2025 Slot 1 question paper (Cracku.in)' },
};

const SECTIONS = {
  VARC: { slug: 'varc', name: 'Verbal Ability & RC', order: 1, description: 'Reading comprehension, para-jumbles, odd sentence out and summaries.' },
  DILR: { slug: 'dilr', name: 'Data Interpretation & LR', order: 2, description: 'Data sets, tables, charts and logic puzzles.' },
  QA: { slug: 'qa', name: 'Quantitative Ability', order: 3, description: 'Arithmetic, algebra, geometry, number system and modern maths.' },
};
const SUBJECTS = {
  VARC: 'VARC',
  'Verbal Ability & Reading Comprehension': 'VARC',
  DILR: 'DILR',
  'Data Interpretation & Logical Reasoning': 'DILR',
  QA: 'QA',
  'Quantitative Ability': 'QA',
};
const SECTION_SECONDS = 40 * 60;

const SEATING = 'Number the seats 0–5 clockwise with A at 0. Facing the centre, "right" runs anticlockwise and "left" clockwise, so B (third to A\'s right) is at 3, C (second to B\'s left) at 5, D (immediately right of C) at 4, E (immediately left of A) at 1 and F at 2. Clockwise: A, E, F, B, D, C.';

const INNOVATEX = 'A, B and C start in Elite and are all in Novice by Quarter 4, so each was demoted exactly once and D, E and F were each promoted once. Lalu rated Bunty in Q2 and Asha and Dolly in Q3, so Bunty was demoted after Q1, Asha after Q2 and Chintu after Q3, and Dolly was promoted after Q3. Dolly\'s constant rating is 2. If Eklavya had been promoted after Q1 he would have rated 3 and Falguni 1 — but Falguni would then get 3 in Q2, breaking her constant rating. So Falguni (3 every quarter) went up after Q1, and Eklavya rated 1 then 3 and went up after Q2. In Elite, Bunty rated 1 in Q1; Asha needs 1 in Q2 to be demoted, with Asha/Chintu at 2/3 or 3/2 in Q1; in Q3 Chintu 1, Eklavya 2; in Novice Q3 Asha 1, Dolly 2, Bunty 3.';

const TAPS = 'Solved grid (respondent → asker): Alia → B 2, C 1, D 1, E 2; Badal → A 1, C 2, D 2, E 1; Clive → A 2, B 1, D 3, E 2; Dilshan → A 3, B 2, C 3, E 3; Ehsaan → A 3, B 3, C 1, D 2.';

// Explanations keyed "<exam slug> <section slug> <number>". "\\$" is a literal dollar sign.
const EXPLANATIONS = {
  // ── Practice Set 1 ──
  'cat-1 varc 13': '2 states the cause (faster ice melt), 3 its effect (rising seas), 1 the response ("As a result" — flood defences) and 4 the caveat about those investments: 2314.',
  'cat-1 varc 14': 'Sentences 1, 2, 4 and 5 trace the printing press\'s effects; 3 jumps to modern smartphones.',
  'cat-1 varc 50': '2 (the pandemic forced remote work) → 3 (employees came to value it) → 4 (a temporary measure became an expectation) → 1 ("Consequently", companies now offer it): 2341.',
  'cat-1 varc 51': 'Sentences 1, 2, 4 and 5 are about coral reefs; 3 is about solar panels.',
  'cat-1 dilr 16': '120 + 140 + 160 + 180 = 600.',
  'cat-1 dilr 17': '(190 − 150)/150 = 26.7% ≈ 27%.',
  'cat-1 dilr 18': 'Y − X by quarter: 30, 20, 20, 10 — smallest in Q4.',
  'cat-1 dilr 19': '180 × 1.15 = 207 in Q1 2025, then 207 × 1.15 = 238.05 ≈ 238 in Q2 2025.',
  'cat-1 dilr 20': 'Totals: P 250, Q 195, R 246, S 173, T 272 — T is highest.',
  'cat-1 dilr 21': '(90 + 60 + 82 + 58 + 95)/5 = 385/5 = 77.',
  'cat-1 dilr 22': 'Above 75 in at least two subjects: P (78, 82, 90), R (88, 76, 82) and T (92, 85, 95) — 3 students.',
  'cat-1 dilr 23': 'T = 272 and S = 173. (272 − 173)/173 = 99/173 ≈ 57.2% ≈ 57%.',
  'cat-1 dilr 24': `${SEATING} D's right neighbour (seat 3) is B.`,
  'cat-1 dilr 25': `${SEATING} Going clockwise from C you pass A and E before F: 2 people.`,
  'cat-1 dilr 26': `${SEATING} E is at seat 1; two seats to the left (clockwise) is seat 3, B.`,
  'cat-1 dilr 27': `${SEATING} After the swap A is at seat 4, immediately to the right of C (seat 5).`,
  'cat-1 dilr 28': 'Rohan\'s grandfather\'s only son is Rohan\'s father, and his daughter is Rohan\'s sister.',
  'cat-1 dilr 29': 'All pens are pencils and no pencil is an eraser, so no pen is an eraser (I). "All pens are pencils" also gives "some pencils are pens" (II). Both follow.',
  'cat-1 dilr 30': 'TRAIN → UQBHO shifts the letters +1, −1, +1, −1, +1. PLANE: P+1 = Q, L−1 = K, A+1 = B, N−1 = M, E+1 = F → QKBMF.',
  'cat-1 dilr 55': '35% of 2,00,000 = 70,000.',
  'cat-1 dilr 56': 'Beta : Gamma = 25% : 20% = 5 : 4.',
  'cat-1 dilr 57': 'Delta\'s share rises from 20% to 28%: 8% of 2,00,000 = 16,000 more units.',
  'cat-1 dilr 58': 'Gamma + Delta = 20% + 20% = 40%.',
  'cat-1 dilr 59': 'She walks 8 km north, 6 km east, then 8 km south — ending 6 km east of her house.',
  'cat-1 qa 31': 'Take CP = 100. Marked price 140; after 10% off, 126; after 5% off, 119.7. Profit = 19.7%.',
  'cat-1 qa 32': 'CI for 2 years at 10% = P(1.21 − 1) = 0.21P = 1050, so P = 5000. SI = 5000 × 10% × 2 = 1000.',
  'cat-1 qa 33': 'A does 1/12 and B 1/18 of the task a day: 5/36 together. In 4 days they finish 20/36 = 5/9. B does the remaining 4/9 in (4/9) × 18 = 8 days.',
  'cat-1 qa 34': 'Let the mixture be T litres. After removing 16 L: milk = (5/8)(T − 16), water = (3/8)(T − 16) + 16. Milk : water = 5 : 7 gives (35/8)(T − 16) = (15/8)(T − 16) + 80, so T − 16 = 32 and T = 48.',
  'cat-1 qa 35': 'x² − 7x + 12 = (x − 3)(x − 4), so x and y are 3 and 4: 9 + 16 = 25.',
  'cat-1 qa 36': 'Sum of roots = k + 3, product = 3k − 1. k + 3 = 2(3k − 1) gives 5k = 5, so k = 1.',
  'cat-1 qa 37': 'g(2) = 4 − 1 = 3, then f(3) = 2(3) + 3 = 9.',
  'cat-1 qa 38': '3 + 4 + 5 + 6 = 18 parts = 360°, so 1 part = 20° and the largest angle is 6 × 20° = 120°.',
  'cat-1 qa 39': 'Volume = (22/7) × 7² × 10 = 1540 m³. Time = 1540/44 = 35 minutes.',
  'cat-1 qa 40': 'The third side is √(13² − 5²) = 12, so the area is ½ × 5 × 12 = 30 cm².',
  'cat-1 qa 41': '360 = 2³ × 3² × 5, so it has (3 + 1)(2 + 1)(1 + 1) = 24 factors.',
  'cat-1 qa 42': '7 ≡ 2 (mod 5), and powers of 2 cycle 2, 4, 3, 1 mod 5. 100 is a multiple of 4, so the remainder is 1.',
  'cat-1 qa 43': 'LCM(12, 15, 18) = 180. 9999 ÷ 180 = 55.5…, so the answer is 55 × 180 = 9900.',
  'cat-1 qa 44': 'Treat the vowels O and E as one block: 5 units arrange in 5! = 120 ways, and the two vowels swap in 2 ways: 240.',
  'cat-1 qa 45': 'Sums of 9, 10, 11 and 12 occur in 4 + 3 + 2 + 1 = 10 of the 36 outcomes: 10/36 ≈ 27.8% ≈ 28%.',
  'cat-1 qa 60': 'Class total = 30 × 15 = 450. With the teacher, 31 × 16 = 496. Teacher = 496 − 450 = 46.',
  'cat-1 qa 61': 'Capital × months: A 2 × 12 = 24, B 3 × 8 = 24, C 5 × 6 = 30, i.e. 4 : 4 : 5. A\'s share = (4/13) × 46,800 = 14,400.',
  'cat-1 qa 62': 'a² + b² = (a + b)² − 2ab = 100 − 42 = 58.',
  'cat-1 qa 63': 'Area scales with r²: 1.2² = 1.44, a 44% increase.',
  'cat-1 qa 64': '√((7 − 3)² + (1 − 4)²) = √(16 + 9) = 5.',
  'cat-1 qa 65': 'Two-digit multiples of 7 run from 14 = 7 × 2 to 98 = 7 × 14: 13 numbers.',
  'cat-1 qa 66': 'S₂₀ = (20/2)[2(3) + 19(4)] = 10 × 82 = 820.',

  // ── CAT 2025 Slot 1 (the source solutions for these were garbled or incomplete) ──
  'cat-2 dilr 29': `${INNOVATEX} Eklavya's score after Q2 = 1 + 3 = 4.`,
  'cat-2 dilr 30': `${INNOVATEX} Each of A, B and C was demoted once and each of D, E and F promoted once — nobody moved twice: 0.`,
  'cat-2 dilr 31': `${INNOVATEX} Bunty: 1 (Q1) + 1 (Q2) + 3 (Q3) = 5.`,
  'cat-2 dilr 32': `${INNOVATEX} Asha (4 or 5) and Chintu (6 or 5) depend on how they split 2 and 3 in Q1; Bunty 5, Dolly 6, Eklavya 6 and Falguni 9 are fixed: 4 employees.`,
  'cat-2 dilr 33': `${INNOVATEX} Asha must take 1 in Q2 to be demoted, but her Q1 rating can be 2 or 3 — only II is necessary.`,
  'cat-2 dilr 34': 'India charges Japan 50% and collects 3.5 bn USD, so India imports 3.5/0.5 = 7 bn USD from Japan — which is Japan\'s export to India.',
  'cat-2 dilr 35': 'Trade value = tariff ÷ rate. (A) UK on Japan: 6/0.40 = 15. (B) US on France: 6/0.20 = 30. (C) Japan on France: 3/0.30 = 10. (D) France on India: 6.5/0.40 = 16.25. B is highest at 30 bn USD.',
  'cat-2 dilr 36': 'India\'s exports to UK = UK\'s imports from India = 3/0.30 = 10 bn USD. India\'s imports from UK = 5/0.20 = 25 bn USD. Surplus = 10 − 25 = −15: a deficit of 15 bn USD.',
  'cat-2 dilr 37': 'France: exports to US = 6/0.20 = 30, imports from US = 5.5/0.30 ≈ 18.3 — a surplus. UK: exports to US = 3/0.30 = 10, imports from US = 2.5/0.20 = 12.5 — a deficit. Only France.',
  'cat-2 dilr 43': 'Each question gets 4 answers including at least one 1, 2 and 3, so it receives 7, 8 or 9 taps. With at most two Yes, everyone taps at least 1 + 1 + 2 + 2 = 6 times. Alia, Dilshan and Ehsaan tapped 26, so Badal + Clive = 14 with Clive > Badal: Badal 6, Clive 8. Received: 9 + 3t + c = 40 with t, c in {7, 8, 9}, so t = 8 and Clive received 7.',
  'cat-2 dilr 44': `Totals tapped: Alia 6, Badal 6, Clive 8, Dilshan 11, Ehsaan 9 — Alia and Badal match. ${TAPS}`,
  'cat-2 dilr 45': `The grid has a unique solution, and Clive answered Ehsaan's question with 2 taps — No. ${TAPS}`,
  'cat-2 dilr 46': `Yes (1 tap): Alia → Clive, Alia → Dilshan, Badal → Alia, Badal → Ehsaan, Clive → Badal, Ehsaan → Clive — 6. ${TAPS}`,
  'cat-2 qa 47': 'f has its minimum at x = 2c: f(2c) = 8c − 4c². g has its maximum at x = 3c/2: g(3c/2) = c²/4. Need 8c − 4c² > c²/4, i.e. 17c² < 32c, so 0 < c < 32/17 ≈ 1.88. Only c = 1/2 qualifies.',
  'cat-2 qa 59': 'The set has 29 odd numbers totalling 29² = 841. If k is the m-th odd number (k = 2m − 1), the numbers below it sum to (m − 1)² and those above to 841 − m². Setting them equal gives m² − m − 420 = 0, so m = 21 and k = 41.',
  'cat-2 qa 62': 'Let t = b − c. Then a − 6t = 4 and 6a + 3t = 50. Substituting a = 4 + 6t: 24 + 39t = 50, so t = 2/3 and a = 8. 2a + 3b − 3c = 2a + 3t = 16 + 2 = 18.',
  'cat-2 qa 64': 'Triangle PCQ is isosceles (CP = CQ = 6√2) with base angle 45°, so ∠PCQ = 90°, PQ = 12 and PQ is 6 from C. In the ratio 3 : 2, SR is 4 from C, so half of SR = √(72 − 16) = 2√14 and SR = 4√14. The chords lie on opposite sides of the centre, 6 + 4 = 10 apart: area = ½(12 + 4√14) × 10 = 20(3 + √14).',
};

// Questions in a set show the set's full passage (the source trimmed some copies).
const PASSAGE_FROM = {
  'cat-2 varc 21': 'cat-2 varc 20',
  'cat-2 varc 22': 'cat-2 varc 20',
  'cat-2 varc 23': 'cat-2 varc 20',
  'cat-2 dilr 35': 'cat-2 dilr 34',
  'cat-2 dilr 36': 'cat-2 dilr 34',
  'cat-2 dilr 37': 'cat-2 dilr 34',
  'cat-2 dilr 39': 'cat-2 dilr 38',
  'cat-2 dilr 40': 'cat-2 dilr 38',
  'cat-2 dilr 41': 'cat-2 dilr 38',
  'cat-2 dilr 42': 'cat-2 dilr 38',
};

// Some Slot 1 text was saved as UTF-8 read as Windows-1252 ("â€œ" for “).
const MOJIBAKE = [
  ['â€œ', '“'], ['â€™', '’'], ['â€˜', '‘'], ['â€”', '—'], ['â€“', '–'], ['â€¢', '•'],
  ['â€¦', '…'], ['â€\u009d', '”'], ['â€', '”'], ['Â°', '°'], ['Â ', ' '],
];
function fixText(value) {
  if (typeof value === 'string') return MOJIBAKE.reduce((s, [bad, good]) => s.split(bad).join(good), value);
  if (Array.isArray(value)) return value.map(fixText);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fixText(v)]));
  return value;
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Passages may hold "a | b | c" rows; those become a table, the rest goes through toHtml.
function passageHtml(raw) {
  const lines = String(raw || '').split('\n');
  const out = [];
  let text = [];
  let rows = [];
  const flushText = () => { if (text.join('').trim()) out.push(toHtml(text.join('\n'))); text = []; };
  const flushRows = () => {
    if (!rows.length) return;
    const [head, ...body] = rows.map((r) => r.split('|').map((c) => escapeHtml(c.trim())));
    out.push(`<table class="exq-table"><thead><tr>${head.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    rows = [];
  };
  lines.forEach((line) => {
    if (/\S\s\|\s\S/.test(line)) { flushText(); rows.push(line); } else { flushRows(); text.push(line); }
  });
  flushRows();
  flushText();
  return out.join('');
}

const optionId = (id) => String(id).toUpperCase();

function publicImage(examSlug, file) {
  if (!file) return '';
  const rel = `/exam-images/${examSlug}/${path.basename(String(file))}`;
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  console.warn(`  ! missing image ${rel}`);
  return '';
}

function explanationHtml(key, q) {
  const parts = [];
  const own = EXPLANATIONS[key];
  if (own) parts.push(`<p>${toHtml(own)}</p>`);
  else if (q.solution_explanation) {
    parts.push(`<p>${toHtml(q.solution_explanation)}</p>`);
    const steps = q.step_by_step_solution || [];
    if (steps.length > 1) parts.push(`<ol class="exq-steps">${steps.map((s) => `<li>${toHtml(s)}</li>`).join('')}</ol>`);
  } else if ((q.concept_tags || []).length) parts.push(`<p><strong>Key idea:</strong> ${toHtml(q.concept_tags.join(', '))}.</p>`);
  const mistake = (q.common_mistakes || [])[0];
  if (mistake) parts.push(`<p class="exq-mistake"><strong>Common mistake:</strong> ${toHtml(mistake)}</p>`);
  return parts.join('');
}

const examOf = (q) => (q.paper === 'CAT 2025 Practice Set 1' ? EXAMS.practice : EXAMS.slot1);
const sectionOf = (q) => {
  const s = SECTIONS[SUBJECTS[q.subject]];
  if (!s) throw new Error(`Unknown subject: ${q.subject}`);
  return s;
};
const keyOf = (q) => `${examOf(q).slug} ${sectionOf(q).slug} ${q.question_number}`;

function buildQuestion(src, byKey) {
  const exam = examOf(src);
  const section = sectionOf(src);
  const key = keyOf(src);
  const q = { ...src };
  if (PASSAGE_FROM[key]) q.passage = byKey[PASSAGE_FROM[key]].passage;
  // Tariff amounts are written "($6)"; keep the dollar literal rather than opening math.
  q.passage = String(q.passage || '').replace(/\(\$(?=\d)/g, '(\\$');

  const spr = (q.options || []).length === 0;
  const correct = spr ? String(q.correct_answer).trim() : optionId(q.correct_answer);
  return {
    exam: exam.slug,
    section: section.slug,
    module: 1,
    questionNumber: q.question_number,
    itemId: `${exam.slug}:${section.slug}:m1:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type: spr ? 'student_produced_response' : 'multiple_choice',
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: passageHtml(q.passage),
    question: toHtml(q.question_text || ''),
    image: publicImage(exam.slug, q.image_url),
    imageAlt: (q.visual_assets && q.visual_assets.diagram_description) || `Figure for ${section.name} question ${q.question_number}`,
    options: (q.options || []).map((o) => ({
      id: optionId(o.option_id),
      text: toHtml(o.text || ''),
      image: publicImage(exam.slug, (q.option_images || {})[o.option_id]),
    })),
    correctAnswer: correct,
    acceptedAnswers: spr ? [correct] : [],
    explanation: explanationHtml(key, q),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 90,
    _meta: { exam, section },
  };
}

function buildAll(source) {
  const clean = source.map(fixText);
  const byKey = Object.fromEntries(clean.map((q) => [keyOf(q), q]));
  return clean.map((q) => buildQuestion(q, byKey));
}

async function seed() {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const built = buildAll(source);

  const groups = new Map();
  built.forEach((q) => {
    const k = `${q.exam}/${q.section}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(q);
  });

  const questionDocs = [];
  const moduleDocs = [];
  for (const items of groups.values()) {
    items.sort((a, b) => a.questionNumber - b.questionNumber);
    const { exam, section } = items[0]._meta;
    items.forEach((q, i) => {
      const { _meta, ...doc } = q;
      questionDocs.push({ ...doc, order: i + 1 });
    });
    moduleDocs.push({
      family: 'cat',
      familyLabel: 'CAT',
      exam: exam.slug,
      examLabel: exam.label,
      examOrder: exam.order,
      section: section.slug,
      sectionName: section.name,
      sectionOrder: section.order,
      module: 1,
      unitName: 'Section',
      unitNumber: section.order,
      title: `${exam.label} — ${section.name}`,
      description: section.description,
      questionCount: items.length,
      topics: [...new Set(items.map((q) => q.topic).filter(Boolean))],
      timedSeconds: SECTION_SECONDS,
      sourceCitation: exam.citation,
    });
  }

  await mongoose.connect(process.env.DATABASE);
  console.log(`Connected to ${mongoose.connection.db.databaseName}`);

  const slugs = Object.values(EXAMS).map((e) => e.slug);
  const delQ = await ExamQuestion.deleteMany({ exam: { $in: slugs } });
  const delM = await ExamModule.deleteMany({ exam: { $in: slugs } });
  console.log(`Removed ${delQ.deletedCount} old questions, ${delM.deletedCount} old modules`);

  await ExamQuestion.insertMany(questionDocs);
  await ExamModule.insertMany(moduleDocs);

  moduleDocs
    .sort((a, b) => a.examOrder - b.examOrder || a.sectionOrder - b.sectionOrder)
    .forEach((m) => console.log(`  ${m.examLabel.padEnd(22)} ${m.sectionName.padEnd(26)} ${m.questionCount} questions`));
  console.log(`Seeded ${questionDocs.length} CAT questions across ${moduleDocs.length} sections.`);

  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildAll };

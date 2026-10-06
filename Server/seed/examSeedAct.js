// seed/examSeedAct.js
//
// Populates exam_modules and act_questions with ACT Practice Test 1 (Form 25MC1, "Preparing for
// the ACT 2026-2027"): English (50), Mathematics (45), Reading (36) and Science (40), with the
// enhanced ACT timings — 35, 50, 40 and 40 minutes.
//
// Source: seed/exam-data/act_questions.json — an export of the `sanghamitralearn.act_questions`
// collection. Figures live in Front/client/public/exam-images/act-1/.
//
// The source has no worked solutions. Math and Science explanations are written below (every
// key was checked); English and Reading get the key idea and the source's common-mistake note.
// Option ids keep the ACT lettering: A-D on odd questions, F-J on even ones.
//
// Run with: node seed/examSeedAct.js   (or: npm run seed:act)

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const ExamQuestion = require('../model/ExamQuestion').forFamily('act');
const { toHtml, PUBLIC_DIR } = require('./examSeedSat');

const SOURCE_FILE = path.join(__dirname, 'exam-data', 'act_questions.json');

const EXAM = { slug: 'act-1', label: 'ACT · Practice Test 1', order: 1 };

const SECTIONS = {
  English: { slug: 'english', name: 'English', order: 1, timedSeconds: 35 * 60, description: 'Conventions of standard English, production of writing and knowledge of language.' },
  Mathematics: { slug: 'math', name: 'Mathematics', order: 2, timedSeconds: 50 * 60, description: 'Algebra, functions, geometry, statistics and number.' },
  Reading: { slug: 'reading', name: 'Reading', order: 3, timedSeconds: 40 * 60, description: 'Key ideas, craft and structure, and integration of knowledge across four passages.' },
  Science: { slug: 'science', name: 'Science', order: 4, timedSeconds: 40 * 60, description: 'Data interpretation, scientific investigation and evaluating models.' },
};

// Worked solutions keyed "Section number". "\\$" is a literal dollar sign.
const EXPLANATIONS = {
  'Mathematics 1': 'The 5 scores must total 5 × 72 = 360. The first four total 270, so x = 360 − 270 = 90.',
  'Mathematics 2': 'Farms outside circle C: S only (12) + S∩P only (2) + P only (5) = 19.',
  'Mathematics 3': 'With 500 spins each section should land about 125 times. Red is low (80) and blue is high (165), so enlarge red at blue\'s expense.',
  'Mathematics 4': '∠A = ∠C, so 2∠A = 180° − 143.6° = 36.4° and ∠A = 18.2°.',
  'Mathematics 5': 'Find two numbers with product −30 and sum −1: −6 and 5, so x² − x − 30 = (x − 6)(x + 5).',
  'Mathematics 6': 'Multiply every entry by 5: [[−20, 10], [0, −25]].',
  'Mathematics 7': 'The group size must divide both 30 and 75. Of the choices only 15 does.',
  'Mathematics 8': '√(35 × 108) = √3,780 = √(36 × 105) = 6√105.',
  'Mathematics 9': '5x = 6y + 1, so x = (6y + 1)/5.',
  'Mathematics 10': '30 mi/hr × 5,280 ft/mi ÷ 3,600 s/hr = 44 ft/s.',
  'Mathematics 11': 'h(3) = −4.9(9) + 30(3) + 55 = −44.1 + 90 + 55 = 100.9 m.',
  'Mathematics 12': 'The primes up to 30 are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — ten of them — so the probability is 10/30.',
  'Mathematics 13': 'sin α = 5/13 and tan α = 5/12 describe a 5-12-13 right triangle, so cos α = 12/13.',
  'Mathematics 14': 'Doubling the first equation gives 4x − 2y = 14, i.e. −4x + 2y = −14, which contradicts −4x + 2y = 2. The lines are parallel, so there is no solution.',
  'Mathematics 15': '(y + 7)³ = y³ + 3(7)y² + 3(49)y + 343 = y³ + 21y² + 147y + 343.',
  'Mathematics 16': '5 + 3 + 2 = 10 parts, so 1 part = 18 and the smallest integer is 2 × 18 = 36.',
  'Mathematics 17': 'x² − y² − 6x² − 4xy + y² = −5x² − 4xy.',
  'Mathematics 18': '√9 = 3 and √−16 = 4i, so the sum is 3 + 4i.',
  'Mathematics 19': 'The common difference is 14, so t₂₅ = 7 + 24 × 14 = 343.',
  'Mathematics 20': 'Height/shadow is the same for both: h/9.0 = 4.0/2.4, so h = 15.0 ft.',
  'Mathematics 21': 'In right triangle CDE, DC = √(25² − 7²) = 24, so AB = 24. In right triangle ABE, AE = √(26² − 24²) = 10. BC = AD = 10 + 7 = 17.',
  'Mathematics 22': '5 gallons = 20 quarts = 80 cups of water. Concentrate = 80 × 3/40 = 6 cups.',
  'Mathematics 23': 'f(5) = 7e¹⁵ + 1. e¹⁵ ≈ 3.27 × 10⁶, so f(5) ≈ 2.3 × 10⁷ — closest to 2 × 10⁷.',
  'Mathematics 24': '40° × π/180 = 2π/9.',
  'Mathematics 25': 'Subtracting 4 from the output, f(x) − 4, moves the graph down 4 units.',
  'Mathematics 26': '½ab² = d − c, so b² = 2(d − c)/a and b = √(2(d − c)/a).',
  'Mathematics 27': 'Given that the vehicle is a truck, the probability is black trucks over all trucks: 31/479.',
  'Mathematics 28': 'A regular hexagon\'s side equals the circle\'s radius, 9 in, so the perimeter is 6 × 9 = 54 in.',
  'Mathematics 29': 'The raise is (38,080 − 34,000)/3 = \\$1,360, so the salaries are 34,000, 35,360, 36,720 and 38,080, totalling \\$144,160.',
  'Mathematics 30': 'Points on x² + y² = 25 with y = ±2 give x = ±√21, so there are 4 points.',
  'Mathematics 31': 'The larger the angle, the longer the opposite side: BC (opposite A) < AC (opposite B) < AB (opposite C).',
  'Mathematics 32': 'Apple and pecan are ¾ of the pies, so the 24 + 8 = 32 others are ¼. The total is 4 × 32 = 128.',
  'Mathematics 33': 'The angles sum to 360°: 2(3x + 5) + 2(x + 3) = 360, so 8x + 16 = 360 and x = 43.',
  'Mathematics 34': 'a₅ = 16 + 4² = 32 and a₆ = 32 + 5² = 57.',
  'Mathematics 35': '−65/6 ≈ −10.8 and 75/2 = 37.5, so the integers run from −10 to 37: 48 of them.',
  'Mathematics 36': 'Mutually exclusive events cannot happen together, so P(A and B) = 0.',
  'Mathematics 37': 'Dividing by (x − 3) leaves x² + 4x + 4 = (x + 2)², so the zeros are −2 and 3.',
  'Mathematics 38': 'With 18 days the median averages the 9th and 10th values. Cumulative counts are 2, 6, 9, 15, 18, so the 9th is 4 and the 10th is 5: median 4.5.',
  'Mathematics 39': 'Weighted mean = (1 × 10 + 2 × 40 + 3 × 50)/100 = 240/100 = 2.4.',
  'Mathematics 40': 'A fourth root of a negative number is not real, so x must be a nonnegative real number.',
  'Mathematics 41': 'Make m as large as possible and n and p as small as possible: (4/4)(1/8) = 1/8.',
  'Mathematics 42': '0, 0, 10, 10 puts every value 5 away from the mean of 5 — the largest possible spread here.',
  'Mathematics 43': 'The radius is 9 in, so the gravel\'s volume is π × 9² × 2 = 162π in³.',
  'Mathematics 44': 'h(x) = 1 only at x = 2, f(x) = 2 only at x = 1, and g(x) = 1 only at x = 5, so a = 5.',
  'Mathematics 45': 'P(faceup) = ¾ and P(facedown) = ¼, so the expected value is ¾(\\$1) + ¼(\\$2) = \\$1.25.',

  'Science 1': 'Behavior 2 was displayed 3 times in Habitat X and 6 times in Habitat Y: 3:6 = 1:2.',
  'Science 2': 'Brown anoles perched at about 0.6 m in both Y and Z, but Behavior 4 counts (5 vs 17) and display times (49.6 s vs 33.1 s) differ. Only observation 1 is the same.',
  'Science 3': 'Table 3 gives only average display times, not how many displays were timed, so the number cannot be determined.',
  'Science 4': 'Green anoles perched at about 0.9 m in X and 1.6 m in Y: a difference of about 0.7 m.',
  'Science 5': 'Anoles are reptiles, and reptiles are ectotherms: they take heat from their surroundings rather than generating it.',
  'Science 6': 'Student 3 defines the basal cavity as the area underneath an ice shelf, where ocean water circulates — diagram F.',
  'Science 7': 'Student 1\'s explanation depends on surface ice melting. At −10 °C and 1 atm ice cannot melt, so the information does not support Student 1.',
  'Science 8': 'Ice is less dense than seawater, so the icebergs float.',
  'Science 9': 'Student 1 says fractures build up "over many summers" and Student 4 describes "several winter-summer cycles" — both take more than a year.',
  'Science 10': 'Student 2 involves summer melting and winter snowfall; Student 3 describes melting only during summer.',
  'Science 11': 'Student 2 agrees about surface melt pooling, and Student 4 describes summer melting of surface snow. Student 3 says shelves melt "only from below".',
  'Science 12': 'Average SGR fell from 0.50 to 0.35 to 0.25 to 0.20 as stocking density rose — it decreased only.',
  'Science 13': 'Diet Q had the highest protein (52.5%) and the lowest average SGR (0.30%/day).',
  'Science 14': 'In Experiment 1, Diet R gave 0.40%/day and Diet T 0.35%/day, so Diet R would likely raise each group\'s SGR by about 0.05%/day.',
  'Science 15': 'Each tank was fed 3 times a day, so 3 × 1 g = 3 g per day.',
  'Science 16': 'Each tank held 10 L of seawater at 1 fish/L, so 10 fish per tank.',
  'Science 17': 'The diet was varied on purpose (independent variable); specific growth rate was measured in response (dependent variable).',
  'Science 18': 'Sample 1 was not heated (0 min), so it shows the unheated vitamin C level — the control.',
  'Science 19': 'Lycopene reached about 5.5 mg/g after 15 min and stayed there at 30 min, so 20 min would most likely give between 5 and 6 mg/g.',
  'Science 20': 'Vitamin C fell with heating (0.75 → 0.55) but lycopene rose (2.0 → 5.5), so the claim fits vitamin C only.',
  'Science 21': 'Water boils at 100 °C at 1 atm; the bath was 88 °C, so it was not boiling.',
  'Science 22': 'All four vitamin C values (about 0.55 to 0.75 μmol/g) are below 1.0.',
  'Science 23': 'Sample 2 was incubated first, then frozen, and two days later thawed, mixed with solvent and filtered: 2, 1, 3.',
  'Science 24': 'The 550 °C curve rises steadily from its minimum near F = 10 × 10⁷ to its peak near 17 × 10⁷, so 10–20 × 10⁷ is the most nearly straight range.',
  'Science 25': 'From 40 to 48 × 10⁷ the 280 °C curve falls while the 550 °C curve rises; continuing both trends, they meet near F = 60 × 10⁷.',
  'Science 26': 'The lowest L on either curve is about 89.7 μm, on the 550 °C curve near F = 10 × 10⁷.',
  'Science 27': 'Alloy Q is 10.8% silicon, and 10.8% of 50 g is 5.4 g — Sample Z.',
  'Science 28': '0.22% of 200 g = 0.0022 × 200 = 0.44 g of magnesium.',
  'Science 29': 'Highest bars: CM1 — pine (≈44%), CM2 — magnolia (≈33%), CM3 — magnolia (≈55%).',
  'Science 30': 'CM3 values: 35, 50, 32, 55, 35. Their mean is 207/5 ≈ 41%, closest to 40%.',
  'Science 31': 'For maple, CM2 adsorbed about 7% and CM3 about 35%, so the statement is not supported.',
  'Science 32': 'For oak: CM1 ≈ 30%, CM2 ≈ 22%, CM3 ≈ 50%. None is more than 50%.',
  'Science 33': 'The clay particles stay suspended (they are filtered out afterwards), so they are not dissolved and the mixture is not a solution.',
  'Science 34': 'Visible light breaks DOC down; the leaf-and-water mixtures were kept in the dark for the 10 weeks of leaching.',
  'Science 35': 'Table 2 shows 19.8 mA at 50% relative intensity.',
  'Science 36': 'Experiment 2 used no filter, so the light\'s color was the same throughout; Experiment 1 changed it with each filter.',
  'Science 37': 'The figure shows electrons travelling from the plate toward the electrode, and electrons are negatively charged.',
  'Science 38': 'M = E − K. Green: 2.31 − 0.11 = 2.20 eV; blue (2.60 − 0.40) and violet (3.10 − 0.90) give the same 2.20 eV.',
  'Science 39': 'Yellow (5.2 × 10¹⁴ Hz) ejected no electrons but green (5.6 × 10¹⁴ Hz) did, so the cutoff lies between them.',
  'Science 40': 'E = hf gives h = E/f = 2.31 eV / (5.6 × 10¹⁴ Hz) for green light.',
};

// Corrections to the source, keyed "Section number".
const PATCHES = {
  // The table gives M = E − K = 2.20 eV (choice G); the source key said J (2.42 eV).
  'Science 38': { correct_answer: 'g' },
  // This placement question belongs to Passage III (A Musical Detour): "It is marvelously quiet."
  // fits at Point D, right after the boys are lulled by the song. The source attached it to
  // Passage IV and keyed Point A.
  'English 25': { passageFrom: 'English 24', correct_answer: 'd' },
  // Lines 21–36 are the Rembrandts paragraph, whose point is that today's tulips look clumsy next
  // to the seventeenth-century breaks (B); Semper Augustus is only an example within it.
  'Reading 11': { correct_answer: 'b' },
  // The four diagrams are shown as picture choices, so their text description is dropped.
  'Science 6': { questionReplace: [/\s*\(Four diagrams F, G, H, J[^()]*\)/, ''] },
};

const optionId = (id) => String(id).toUpperCase();

function publicImage(file) {
  if (!file) return '';
  const rel = `/exam-images/${EXAM.slug}/${path.basename(String(file))}`;
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  console.warn(`  ! missing image ${rel}`);
  return '';
}

function explanationHtml(key, q) {
  const parts = [];
  const text = EXPLANATIONS[key];
  if (text) parts.push(`<p>${toHtml(text)}</p>`);
  else if ((q.concept_tags || []).length) parts.push(`<p><strong>Key idea:</strong> ${toHtml(q.concept_tags.join(', '))}.</p>`);
  const mistake = (q.common_mistakes || [])[0];
  if (mistake) parts.push(`<p class="exq-mistake"><strong>Common mistake:</strong> ${toHtml(mistake)}</p>`);
  return parts.join('');
}

function buildQuestion(src, byKey) {
  const section = SECTIONS[src.subject];
  if (!section) throw new Error(`Unknown subject: ${src.subject}`);
  const key = `${src.subject} ${src.question_number}`;
  const patch = PATCHES[key] || {};
  const q = { ...src };
  if (patch.correct_answer) q.correct_answer = patch.correct_answer;
  if (patch.passageFrom) q.passage = byKey[patch.passageFrom].passage;
  if (patch.questionReplace) q.question_text = q.question_text.replace(...patch.questionReplace);

  return {
    exam: EXAM.slug,
    section: section.slug,
    module: 1,
    questionNumber: q.question_number,
    itemId: `${EXAM.slug}:${section.slug}:m1:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type: 'multiple_choice',
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: toHtml(q.passage || ''),
    question: toHtml(q.question_text || ''),
    image: publicImage(q.image_url),
    imageAlt: `Figure for ${section.name} question ${q.question_number}`,
    options: (q.options || []).map((o) => ({
      id: optionId(o.option_id),
      text: toHtml(o.text || ''),
      image: publicImage((q.option_images || {})[o.option_id]),
    })),
    correctAnswer: optionId(q.correct_answer),
    acceptedAnswers: [],
    explanation: explanationHtml(key, q),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 60,
    _meta: { section },
  };
}

function buildAll(source) {
  const byKey = Object.fromEntries(source.map((q) => [`${q.subject} ${q.question_number}`, q]));
  return source.map((q) => buildQuestion(q, byKey));
}

async function seed() {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const built = buildAll(source);

  const bySection = new Map();
  built.forEach((q) => {
    if (!bySection.has(q.section)) bySection.set(q.section, []);
    bySection.get(q.section).push(q);
  });

  const questionDocs = [];
  const moduleDocs = [];
  for (const items of bySection.values()) {
    items.sort((a, b) => a.questionNumber - b.questionNumber);
    const { section } = items[0]._meta;
    items.forEach((q, i) => {
      const { _meta, ...doc } = q;
      questionDocs.push({ ...doc, order: i + 1 });
    });
    moduleDocs.push({
      family: 'act',
      familyLabel: 'ACT',
      exam: EXAM.slug,
      examLabel: EXAM.label,
      examOrder: EXAM.order,
      section: section.slug,
      sectionName: section.name,
      sectionOrder: section.order,
      module: 1,
      unitName: 'Section',
      unitNumber: section.order,
      title: `${EXAM.label} — ${section.name}`,
      description: section.description,
      questionCount: items.length,
      topics: [...new Set(items.map((q) => q.topic).filter(Boolean))],
      timedSeconds: section.timedSeconds,
      sourceCitation: 'Preparing for the ACT 2026–2027, Practice Test 1 (Form 25MC1)',
    });
  }

  await mongoose.connect(process.env.DATABASE);
  console.log(`Connected to ${mongoose.connection.db.databaseName}`);

  const delQ = await ExamQuestion.deleteMany({ exam: EXAM.slug });
  const delM = await ExamModule.deleteMany({ exam: EXAM.slug });
  console.log(`Removed ${delQ.deletedCount} old questions, ${delM.deletedCount} old modules`);

  await ExamQuestion.insertMany(questionDocs);
  await ExamModule.insertMany(moduleDocs);

  moduleDocs
    .sort((a, b) => a.sectionOrder - b.sectionOrder)
    .forEach((m) => console.log(`  Section ${m.unitNumber}  ${m.sectionName.padEnd(12)} ${m.questionCount} questions`));
  console.log(`Seeded ${questionDocs.length} ACT questions across ${moduleDocs.length} sections.`);

  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildAll };

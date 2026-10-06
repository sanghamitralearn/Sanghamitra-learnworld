// seed/examSeedGmat.js
//
// Populates exam_modules and gmat_questions with GMAT Focus Edition Practice Set 1:
// Quantitative Reasoning (Q1-21), Verbal Reasoning (Q22-44) and Data Insights (Q45-64),
// 45 minutes each, as on the GMAT Focus Edition.
//
// Source: seed/exam-data/gmat_questions.json — an export of the `sanghamitralearn.gmat_questions`
// collection. The source has no worked solutions, so the explanations below were written for this
// seed after checking every answer key; the source's "common mistake" note is appended to each.
//
// GMAT-specific handling:
//   - option ids a-e become A-E; True/False statements become T/F;
//   - Two-Part Analysis becomes type "two_part": the columns share one option list and the answer is
//     one option per column, in column order ("B,D");
//   - Multi-Source Reasoning tab markers ("[Tab 1: Email]") become headings.
//
// Run with: node seed/examSeedGmat.js   (or: npm run seed:gmat)

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const ExamQuestion = require('../model/ExamQuestion').forFamily('gmat');
const { toHtml } = require('./examSeedSat');

const SOURCE_FILE = path.join(__dirname, 'exam-data', 'gmat_questions.json');

const EXAM = { slug: 'gmat-1', label: 'GMAT Focus · Practice Set 1', order: 1 };

const SECTIONS = {
  'Quantitative Reasoning': {
    slug: 'quant', name: 'Quantitative Reasoning', order: 1, timedSeconds: 45 * 60,
    description: 'Problem solving: arithmetic, algebra and word problems.',
  },
  'Verbal Reasoning': {
    slug: 'verbal', name: 'Verbal Reasoning', order: 2, timedSeconds: 45 * 60,
    description: 'Critical reasoning and reading comprehension.',
  },
  'Data Insights': {
    slug: 'data-insights', name: 'Data Insights', order: 3, timedSeconds: 45 * 60,
    description: 'Data sufficiency, two-part analysis, table analysis, graphics and multi-source reasoning.',
  },
};

// Worked solutions, keyed by question number. Plain text; "\\$" is a literal dollar sign.
const EXPLANATIONS = {
  1: 'Take the cost as 100. The marked price is 140, and after a 25% discount the sale price is 140 × 0.75 = 105, i.e. 105% of the cost.',
  2: '3x − 7 = 2x + 5 gives x = 12, so x² − 3 = 144 − 3 = 141.',
  3: '7 leaves remainder 2 on division by 5, and powers of 2 leave remainders 2, 4, 3, 1, repeating every 4 powers. 100 is a multiple of 4, so 7¹⁰⁰ leaves remainder 1.',
  4: 'Rates add: 1/6 + 1/4 = 5/12 of the job per hour, so together the machines need 12/5 = 2.4 hours.',
  5: '2πr = 18π gives r = 9, so the area is π × 9² = 81π.',
  6: 'The 5 numbers sum to 5 × 24 = 120 and the remaining 4 sum to 4 × 21 = 84, so the removed number is 120 − 84 = 36.',
  7: 'x − y is smallest at −3 − 4 = −7 and largest at 5 − (−2) = 7, so every value from −7 to 7 is possible. 8 is not.',
  8: 'Committees with 2 men and 1 woman: C(5,2) × C(4,1) = 10 × 4 = 40. All committees: C(9,3) = 84. Probability = 40/84 = 10/21.',
  9: 'GCD × LCM equals the product of the two numbers: 12 × 360 = 72 × n, so n = 4,320 / 72 = 60.',
  10: 'Acid balance: 0.30(10) + 0.60x = 0.50(10 + x), so 3 + 0.6x = 5 + 0.5x and x = 20 liters.',
  11: '4 = 2², so 4^(x−1) = 2^(2x−2). Equating exponents, x + 3 = 2x − 2 and x = 5.',
  12: '3 parts = 12 boys, so 1 part = 4. Girls = 5 × 4 = 20 and the class has 12 + 20 = 32 students.',
  13: 'Distance = √((7 − 2)² + (9 − (−3))²) = √(25 + 144) = √169 = 13.',
  14: 'The terms are 5, 2(5) + 3 = 13, 2(13) + 3 = 29 and 2(29) + 3 = 61.',
  15: '−9 < 2x − 5 < 9 gives −4 < 2x < 14, so −2 < x < 7. The integers −1, 0, 1, …, 6 make 8 values.',
  16: 'Take each half as 120 miles: 120/60 = 2 hours and 120/40 = 3 hours, so 240 miles in 5 hours is an average of 48 mph.',
  17: 'For a 25% profit the selling price is 1.25 × \\$80 = \\$100. That is 90% of the marked price, so the marked price is \\$100 / 0.9 ≈ \\$111.11.',
  18: 'The interest is \\$600 over 4 years, or \\$150 a year, which is 150 / 2,000 = 7.5% of the principal.',
  19: 'Tea or coffee: 60 + 45 − 20 = 85 people, so 100 − 85 = 15 like neither.',
  20: 'f(−2) = 2(4) − 3(−2) + 1 = 8 + 6 + 1 = 15.',
  21: 'Squaring both sides gives 3x + 4 = 49, so 3x = 45 and x = 15.',
  22: 'The officials cite the neighboring city\'s 20% drop as evidence, which only works if the cameras — not some other factor — caused that drop. That is (A); negate it and the argument collapses.',
  23: 'A difference between two groups shows the drug works only if the groups were alike to begin with. (A) rules out the explanation that the Zolarex patients were simply easier to treat.',
  24: 'A trial on flights that were only 60% full says little about full flights, where boarding congestion matters most, so (B) undercuts generalizing the 15% gain.',
  25: 'Hired before 2015 → completed the training → not eligible. Chaining the two statements gives (B); the other choices reverse a conditional or go beyond what is stated.',
  26: 'The argument says food trucks divert customers from restaurants. Whether nearby restaurant revenue actually declined (B) tests that claim directly.',
  27: 'More users but less premium revenue is explained if the new users mostly chose the free version (B).',
  28: 'Students choose whether to attend, so those who attend may already be more motivated or stronger (A). A correlation does not show that the program caused the higher scores.',
  29: 'The plan works only if the extra riders can actually be carried. If the buses lacked capacity (the negation of A), commuters could not switch and congestion would not fall.',
  30: 'Random assignment (B) removes self-selection, so the productivity gain can be attributed to the walking itself.',
  31: 'The economist refutes the claim that raising the minimum wage "always" costs jobs by citing regions where it did not — counterexamples to a universal claim (A).',
  32: 'The premises are that the packaging is far greener and that consumers increasingly prefer green products, so the conclusion that follows is better consumer perception of the brand (B).',
  33: 'The conclusion covers "all types of coursework", but the comparison included only introductory courses (B), so the generalization is unsupported.',
  34: 'The passage defines indirect network effects as value to one group rising with the size of a complementary group, and gives riders and drivers as the example (B).',
  35: 'The passage says a platform that reaches critical mass first is hard to dislodge "even if a competitor later offers a technically superior product" (B).',
  36: 'Congestion effects mean too many users degrade the experience. Slower responses and falling satisfaction past ten million users (A) is exactly that.',
  37: 'The SCN takes light information from the retina to synchronize the body\'s clock; peripheral clocks respond to other cues such as meals (C).',
  38: 'The passage ties time-restricted eating to the idea that the timing of food intake, "not merely its content", may matter for metabolic health (B).',
  39: 'The passage describes the clock system, then what happens when the clocks fall out of sync, and ends with the research idea of time-restricted eating (B).',
  40: 'Conventional systems become strained because roads and rooftops replace absorbent soil and vegetation, increasing the runoff the pipes must carry (B).',
  41: 'When combined sewer systems are overwhelmed during heavy rain they can discharge untreated sewage into nearby waterways (A).',
  42: 'The critics worry that underfunded maintenance lets installations lose effectiveness. Rain gardens working at 40% of capacity after years of insufficient maintenance funding (A) is direct evidence.',
  43: 'The passage explains how green infrastructure works, lists its benefits and then presents a maintenance limitation — a balanced description (B), not an argument to replace every system.',
  44: 'Critics note that installations lose effectiveness without upkeep, so long-term performance depends on consistent maintenance (B).',
  45: '(1) x² = 16 gives x = 4 or −4: not sufficient. (2) x³ = −64 gives x = −4, a definite "no": sufficient. Answer (B).',
  46: '(1) n could be 2, 3, 5 or 7. (2) (n − 2)(n − 3) = 0 gives n = 2 or 3. Together n is still 2 or 3, so the statements are not sufficient (E).',
  47: '(1) gives only L + W = 20; (2) gives only the ratio. Together W = 20/3 and L = 40/3, which fixes the area (C).',
  48: '12 and 18 are both multiples of 6, so either statement alone makes x divisible by 6 (D).',
  49: '(1) x = 5y + 3 leaves remainder 3 only when y > 3 (with y = 2, x = 13 leaves remainder 1). (2) alone says nothing about x. Together the remainder must be 3 (C).',
  50: '(1) x = 3k for an integer k, so x is an integer: sufficient. (2) x could be 1/3: not sufficient. Answer (A).',
  51: '(1) y = LCM(4, 6) = 12. (2) 2y = 24, so y = 12. Each statement alone gives y (D).',
  52: '(1) describes a rhombus and (2) a rectangle; neither alone forces a square. A quadrilateral that is both is a square, so together they are sufficient (C).',
  53: 'P + D = 84,000 and D = 2P + 12,000, so 3P + 12,000 = 84,000. Print P = \\$24,000 and digital D = \\$60,000.',
  54: 'The trains close 450 miles in 5 hours, so their speeds add to 90 mph: y + (y + 15) = 90 gives Train Y = 37.5 mph and Train X = 52.5 mph.',
  55: 'R = 3E + 500,000 and R + E = 2,900,000, so 4E = 2,400,000. Expenses = \\$600,000 and revenue = \\$2,300,000.',
  56: '2(L + W) = 116 gives L + W = 58. With L = W + 18, the width is 20 ft and the length 38 ft.',
  57: 'North rose 150 / 1,200 = 12.5%; East rose 120 / 1,600 = 7.5%. North\'s increase is greater, so the statement is True.',
  58: 'Q2 sales per store (\\$000): North 90, South 75, East 86, West 98, Central ≈ 83.9. West is highest, so the statement is True.',
  59: 'Only South fell (950 → 900); Central rose from 1,100 to 1,175. The statement is False.',
  60: 'Month-on-month rises: Feb +3, Mar +6, Apr +7, May +8, Jun +7, Jul +5. The largest increase is in May.',
  61: '(78 − 61) / 78 = 17/78 ≈ 21.8%, so October was about 22% lower than July.',
  62: 'After a 10-point rise: A reaches 95% (not above the limit), B 102% and C 78%. Only Warehouse B exceeds 95%.',
  63: '\\$210,000 / 40,800 units ≈ \\$5.147, which rounds to \\$5.15 per unit.',
  64: 'Inventory as a share of capacity: A 85%, B 92%, C 68%. Warehouse C has the most room (C).',
};

// ---------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------

const optionId = (id) => ({ true: 'T', false: 'F' }[String(id).toLowerCase()] || String(id).toUpperCase());

// "[Tab 1: Email] From: …" -> a heading per tab of a Multi-Source Reasoning prompt.
const tabHeadings = (html) => html.replace(/\[Tab \d+: ([^\]]+)\]\s*(?:<br>\s*)*/g, '<span class="exq-tab-title">$1</span>');

function explanationHtml(q) {
  const parts = [];
  const text = EXPLANATIONS[q.question_number];
  if (text) parts.push(`<p>${toHtml(text)}</p>`);
  const mistake = (q.common_mistakes || [])[0];
  if (mistake) parts.push(`<p class="exq-mistake"><strong>Common mistake:</strong> ${toHtml(mistake)}</p>`);
  return parts.join('');
}

function buildQuestion(q) {
  const section = SECTIONS[q.subject];
  if (!section) throw new Error(`Unknown subject: ${q.subject}`);

  const options = (q.options || []).map((o) => ({ id: optionId(o.option_id), text: toHtml(o.text || ''), image: '' }));

  let type = 'multiple_choice';
  let columns = [];
  let correctAnswer;
  if (q.display_type === 'two_part_table') {
    type = 'two_part';
    columns = Object.keys(q.correct_answer);
    correctAnswer = columns.map((c) => optionId(q.correct_answer[c])).join(',');
  } else {
    correctAnswer = optionId(q.correct_answer);
  }

  return {
    exam: EXAM.slug,
    section: section.slug,
    module: 1,
    questionNumber: q.question_number,
    itemId: `${EXAM.slug}:${section.slug}:m1:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type,
    columns,
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: tabHeadings(toHtml(q.passage || '')),
    question: toHtml(q.question_text || ''),
    image: '',
    imageAlt: '',
    options,
    correctAnswer,
    acceptedAnswers: [],
    explanation: explanationHtml(q),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 90,
    _meta: { section },
  };
}

async function seed() {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const missing = source.filter((q) => !EXPLANATIONS[q.question_number]).map((q) => q.question_number);
  if (missing.length) console.warn(`  ! no explanation for questions ${missing.join(', ')}`);

  const built = source.map(buildQuestion);
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
      family: 'gmat',
      familyLabel: 'GMAT',
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
      sourceCitation: 'GMAT Focus Edition Practice Set 1',
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
    .forEach((m) => console.log(`  Section ${m.unitNumber}  ${m.sectionName.padEnd(24)} ${m.questionCount} questions`));
  console.log(`Seeded ${questionDocs.length} GMAT questions across ${moduleDocs.length} sections.`);

  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildQuestion };

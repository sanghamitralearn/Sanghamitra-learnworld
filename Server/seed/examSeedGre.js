// seed/examSeedGre.js
//
// Populates exam_modules and gre_questions with ETS GRE Practice Test 1 (the paper-based
// revised GRE): Verbal Reasoning Sections 1 & 2, then Quantitative Reasoning Sections 3 & 4,
// 25 questions each.
//
// Source: seed/exam-data/gre_questions.json — an export of the `sanghamitralearn.gre_questions`
// collection. Diagrams live in Front/client/public/exam-images/gre-1/.
//
// Text goes through the same converter as the SAT seed (HTML + inline \( ... \) LaTeX). On top of
// that, GRE needs:
//   - multi-answer types: "select all", sentence equivalence (exactly two) and 2/3-blank text
//     completion; their answer is stored as sorted option ids, "D,F";
//   - Quantitative Comparison laid out as a Quantity A | Quantity B table;
//   - the given information of a quant question ("x > 1") shown above the question, not as a
//     reading passage.
//
// Run with: node seed/examSeedGre.js   (or: npm run seed:gre)

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ExamModule = require('../model/ExamModule');
const ExamQuestion = require('../model/ExamQuestion').forFamily('gre');
const { toHtml, PUBLIC_DIR } = require('./examSeedSat');

const SOURCE_FILE = path.join(__dirname, 'exam-data', 'gre_questions.json');

const EXAM = { slug: 'gre-1', label: 'GRE · Practice Test 1', order: 1 };

// Paper-based GRE timings: 35 min per Verbal section, 40 min per Quant section (2h 30m in all).
const SECTIONS = {
  Verbal: {
    slug: 'verbal', name: 'Verbal Reasoning', order: 1, timedSeconds: 35 * 60,
    description: 'Reading comprehension, text completion and sentence equivalence.',
  },
  Quantitative: {
    slug: 'quant', name: 'Quantitative Reasoning', order: 2, timedSeconds: 40 * 60,
    description: 'Quantitative comparison, arithmetic, algebra, geometry and data interpretation.',
  },
};

// The source's own explanations for the bar-graph set only say "per the official key"; these
// work the numbers from the graph (1988 total $630M, 1991 total $520M).
const BAR_GRAPH_NOTE = 'Percents from the graph (1988 → 1991): Financial/Insurance/Real Estate 5% → 26%, Services 17% → 22%, Manufacturing 31% → 20%, Retail 19% → 8%, Wholesale 8% → 6%, Other 20% → 18%.';
const PATCHES = {
  // The graph carries the title, totals and bars, so the text description is dropped.
  'S3-Q17': {
    passage: '',
    solution_explanation: `${BAR_GRAPH_NOTE} Only Financial/Insurance/Real Estate (\\$31.5M → \\$135.2M) and Services (\\$107.1M → \\$114.4M) gave more in 1991 than in 1988; every other sector gave less. In 1991 those two gave $(26\\% + 22\\%) \\times \\$520$ million $= 0.48 \\times 520 = 249.6$, about \\$250 million.`,
    step_by_step_solution: [
      'Convert each sector to dollars: 1988 amount = percent × \\$630M, 1991 amount = percent × \\$520M.',
      'Only Financial/Insurance/Real Estate (\\$31.5M → \\$135.2M) and Services (\\$107.1M → \\$114.4M) increased.',
      'Their 1991 total: $0.48 \\times 520 = 249.6 \\approx 250$ million dollars.',
    ],
    answer_explanation: '',
  },
  'S3-Q18': {
    passage: '',
    solution_explanation: `${BAR_GRAPH_NOTE} More than \\$60 million means more than $60/630 \\approx 9.5\\%$ in 1988 and more than $60/520 \\approx 11.5\\%$ in 1991. Services (\\$107.1M, \\$114.4M), Manufacturing (\\$195.3M, \\$104.0M) and Other (\\$126.0M, \\$93.6M) clear both; Financial/Insurance/Real Estate fails in 1988 (\\$31.5M), Retail fails in 1991 (\\$41.6M) and Wholesale fails in both. That is three sectors.`,
    step_by_step_solution: [
      'Thresholds: above 9.5% of the 1988 total and above 11.5% of the 1991 total.',
      'Services (17%, 22%), Manufacturing (31%, 20%) and Other (20%, 18%) are above both thresholds.',
      'Financial (5% in 1988), Retail (8% in 1991) and Wholesale (8%, 6%) are not — so the answer is three.',
    ],
    answer_explanation: '',
  },
  'S3-Q19': {
    passage: '',
    solution_explanation: `${BAR_GRAPH_NOTE} Dollar decreases: Manufacturing $195.3 - 104.0 = 91.3$, Retail $119.7 - 41.6 = 78.1$, Other $126.0 - 93.6 = 32.4$, Wholesale $50.4 - 31.2 = 19.2$ (million dollars); Services increased. Manufacturing had the greatest decrease.`,
    step_by_step_solution: [
      'Convert each listed sector to dollars in both years (percent × \\$630M and percent × \\$520M).',
      'Decreases: Manufacturing \\$91.3M, Retail \\$78.1M, Other \\$32.4M, Wholesale \\$19.2M; Services went up.',
      'The greatest decrease is Manufacturing.',
    ],
    answer_explanation: '',
  },
  'S3-Q20': { passage: '' },
};

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

// Notes written for whoever built the dataset, not for students.
function stripAuthoringNotes(s) {
  return String(s || '')
    .replace(/(\\\\)*\s*\\textit\{Note: (?:This question is based|See diagram note)[^{}]*\}/g, '')
    .trim();
}

function publicImage(file) {
  if (!file) return '';
  const rel = `/exam-images/${EXAM.slug}/${path.basename(String(file))}`;
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return rel;
  console.warn(`  ! missing image ${rel}`);
  return '';
}

// "Compare Quantity A and Quantity B. \textbf{Quantity A:} x \textbf{Quantity B:} y"
// -> lead-in text plus a two-column Quantity A | Quantity B table.
function quantitativeComparison(raw) {
  const m = raw.match(/^([\s\S]*?)\s*Compare Quantity A and Quantity B\.\s*\\textbf\{Quantity A:\}\s*([\s\S]*?)\s*\\textbf\{Quantity B:\}\s*([\s\S]*?)\s*$/);
  if (!m) return toHtml(raw);
  const [, lead, a, b] = m;
  return [
    lead ? `<p>${toHtml(lead)}</p>` : '',
    '<p class="exq-qc-lead">Compare Quantity A and Quantity B.</p>',
    '<table class="exq-table exq-qc"><thead><tr><th>Quantity A</th><th>Quantity B</th></tr></thead>',
    `<tbody><tr><td>${toHtml(a)}</td><td>${toHtml(b)}</td></tr></tbody></table>`,
  ].join('');
}

function explanationHtml(q) {
  const parts = [];
  if (q.solution_explanation) parts.push(`<p>${toHtml(q.solution_explanation)}</p>`);
  const steps = (q.step_by_step_solution || []).filter(Boolean);
  if (steps.length) parts.push(`<ol class="exq-steps">${steps.map((s) => `<li>${toHtml(s)}</li>`).join('')}</ol>`);
  if (/^Answer in Context/i.test(q.answer_explanation || '')) {
    parts.push(`<p class="exq-in-context">${toHtml(q.answer_explanation)}</p>`);
  }
  return parts.join('');
}

const sortedIds = (ids) => [...ids].map(String).sort().join(',');

// ---------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------

function buildQuestion(src) {
  const sm = String(src.section).match(/Section (\d) - (Verbal|Quantitative) Reasoning/);
  if (!sm) throw new Error(`Unknown section: ${src.section}`);
  const sectionNumber = Number(sm[1]);
  const section = SECTIONS[sm[2]];
  const module = section.slug === 'verbal' ? sectionNumber : sectionNumber - 2;

  const patchKey = `S${sectionNumber}-Q${String(src.question_number).padStart(2, '0')}`;
  const q = { ...src, ...(PATCHES[patchKey] || {}) };

  const image = publicImage(q.image_url);
  const report = {};
  // In the test booklet every boldfaced phrase of a passage is also underlined.
  const rawPassage = q.has_underlined_text
    ? String(q.passage || '').replace(/\\textbf\{([^{}]*)\}/g, '\\textbf{<u>$1</u>}')
    : q.passage || '';
  let passage = toHtml(rawPassage, { report });
  // A data table typed into the passage makes the table image redundant.
  const keepImage = image && !(report.table && /table/i.test(image));

  const rawQuestion = stripAuthoringNotes(q.question_text);
  let question = q.type === 'quantitative_comparison' ? quantitativeComparison(rawQuestion) : toHtml(rawQuestion);

  // Quant "passages" are the given information ("x > 1", a data table): show them with the question.
  if (section.slug === 'quant' && passage) {
    question = `<div class="exq-given">${passage}</div>${question}`;
    passage = '';
  }

  let type;
  let options = [];
  let blanks = [];
  let correctAnswer;
  let selectCount = 0;

  switch (q.type) {
    case 'numeric_entry':
      type = 'student_produced_response';
      correctAnswer = String(q.correct_answer).trim();
      break;
    case 'multiple_select':
    case 'sentence_equivalence':
      type = 'multiple_select';
      selectCount = q.type === 'sentence_equivalence' ? 2 : 0;
      correctAnswer = sortedIds(q.correct_answer);
      break;
    case 'text_completion_multi_blank':
      type = 'multi_blank';
      blanks = q.options.map((b) => ({ label: b.blank_label, optionIds: b.choices.map((c) => c.option_id) }));
      options = q.options.flatMap((b) => b.choices.map((c) => ({ id: c.option_id, text: toHtml(c.text), image: '' })));
      correctAnswer = sortedIds(Object.values(q.correct_answer));
      break;
    default: // multiple_choice_single, quantitative_comparison, select_in_passage
      type = 'multiple_choice';
      correctAnswer = String(q.correct_answer).trim();
  }
  if (type !== 'multi_blank') {
    options = (q.options || []).map((o) => ({ id: o.option_id, text: toHtml(o.text || ''), image: '' }));
  }

  return {
    exam: EXAM.slug,
    section: section.slug,
    module,
    questionNumber: q.question_number,
    itemId: `${EXAM.slug}:${section.slug}:m${module}:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q.question_id || q._id || ''),
    type,
    selectCount,
    blanks,
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage,
    question,
    image: keepImage ? image : '',
    imageAlt: q.diagram_description || 'Figure for this question',
    options,
    correctAnswer,
    acceptedAnswers: type === 'student_produced_response' ? [correctAnswer] : [],
    explanation: explanationHtml(q),
    points: q.points || 1,
    averageTimeSeconds: q.average_time_seconds || 60,
    _meta: { section, sectionNumber },
  };
}

async function seed() {
  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const built = source.map(buildQuestion);

  const modules = new Map();
  built.forEach((q) => {
    const key = `${q.section}|${q.module}`;
    if (!modules.has(key)) modules.set(key, []);
    modules.get(key).push(q);
  });

  const questionDocs = [];
  const moduleDocs = [];
  for (const items of modules.values()) {
    items.sort((a, b) => a.questionNumber - b.questionNumber);
    const { section, sectionNumber } = items[0]._meta;
    items.forEach((q, i) => {
      const { _meta, ...doc } = q;
      questionDocs.push({ ...doc, order: i + 1 });
    });
    moduleDocs.push({
      family: 'gre',
      familyLabel: 'GRE',
      exam: EXAM.slug,
      examLabel: EXAM.label,
      examOrder: EXAM.order,
      section: section.slug,
      sectionName: section.name,
      sectionOrder: section.order,
      module: items[0].module,
      unitName: 'Section',
      unitNumber: sectionNumber,
      title: `${EXAM.label} — Section ${sectionNumber}: ${section.name}`,
      description: section.description,
      questionCount: items.length,
      topics: [...new Set(items.map((q) => q.topic).filter(Boolean))],
      timedSeconds: section.timedSeconds,
      sourceCitation: 'ETS Official GRE Practice Test 1',
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
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.module - b.module)
    .forEach((m) => console.log(`  Section ${m.unitNumber}  ${m.sectionName.padEnd(24)} ${m.questionCount} questions`));
  console.log(`Seeded ${questionDocs.length} GRE questions across ${moduleDocs.length} sections.`);

  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildQuestion };

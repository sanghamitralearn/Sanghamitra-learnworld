// seed/examSeedJeeAdvanced.js
//
// JEE Advanced papers 2023 P1, 2023 P2, 2024 P1, 2025 P1 and 2025 P2, each with Physics,
// Chemistry and Mathematics sections. Written to the jee_advanced_questions collection.
// A full section gets 60 minutes (3 hours per paper); the partial 2025 physics sections get
// 3.5 minutes per question.
//
// Source: seed/exam-data/jee_questions.json — an export of `sanghamitralearn.jee_questions`.
// Figures live in Front/client/public/exam-images/jee-advanced/.
//
// Clean-up applied to the source:
//  - 2024 Paper 2 is left out: only 6 chemistry questions, none with an answer key.
//  - Two "Physics" items about sets and relations (no year or number) are left out.
//  - Nine Physics questions without year/paper are 2025 Paper 2 (their figure names say so).
//  - Types are taken from the data itself: no options → numerical answer; several keys →
//    multiple correct; picture-only options are built from option_images.
//
// Run with: node seed/examSeedJeeAdvanced.js   (or: npm run seed:jee-advanced)

const { html, publicImage, explanationHtml, numericAnswer, seedFamily, run } = require('./examSeedCommon');
const source = require('./exam-data/jee_questions.json');

const IMAGES = 'jee-advanced';

const PAPERS = {
  '2023 P1': { slug: 'jee-adv-2023-p1', label: 'JEE Advanced 2023 · Paper 1', order: 1 },
  '2023 P2': { slug: 'jee-adv-2023-p2', label: 'JEE Advanced 2023 · Paper 2', order: 2 },
  '2024 P1': { slug: 'jee-adv-2024-p1', label: 'JEE Advanced 2024 · Paper 1', order: 3 },
  '2025 P1': { slug: 'jee-adv-2025-p1', label: 'JEE Advanced 2025 · Paper 1', order: 4 },
  '2025 P2': { slug: 'jee-adv-2025-p2', label: 'JEE Advanced 2025 · Paper 2', order: 5 },
};
Object.values(PAPERS).forEach((p) => { p.citation = `${p.label.replace(' · ', ' ')} (IIT)`; });

const sectionSeconds = (n) => Math.min(60, Math.ceil(n * 3.5)) * 60;
const SECTIONS = {
  Physics: { slug: 'physics', name: 'Physics', order: 1, seconds: sectionSeconds },
  Chemistry: { slug: 'chemistry', name: 'Chemistry', order: 2, seconds: sectionSeconds },
  Mathematics: { slug: 'mathematics', name: 'Mathematics', order: 3, seconds: sectionSeconds },
};

const paperKey = (q) => (q.year ? `${q.year} ${q.paper}` : '2025 P2');
const keyOf = (q) => `${paperKey(q)} ${q.subject} ${q.question_number}`;

function skip(q) {
  if (q.question_number == null) return 'no question number';
  if (!PAPERS[paperKey(q)]) return `paper ${paperKey(q)} not included`;
  if (q.correct_answer == null) return 'no answer key';
  // The source copied Q16's answer range onto Q17 (a different quantity).
  if (keyOf(q) === '2023 P2 Physics 17') return 'answer key copied from Q16';
  return '';
}

const EXPLANATIONS = {
  '2025 P1 Mathematics 11': '∫₀ˣ dt/(1 − t²) = x + x³/3 + …, so the bracket is (α/2 + β)x + (α/6 − β/2)x³ + …. The x term must vanish: β = −α/2. Then α/6 + α/4 = 5α/12 = 2, so α = 4.8, β = −2.4 and α + β = 2.4.',
  '2025 P1 Chemistry 11': '144 g of water is 8 mol, giving 8 mol H₂ and 4 mol O₂ — 12 mol of gas. w = −Δn·RT = −12 × 8.3 × 300 J = −29.88 kJ.',
};

const PATCHES = {
  // The integrand is 1/(1 − t²) in the paper (the key, 2.4, depends on it); the source added a √.
  '2025 P1 Mathematics 11': { questionReplace: ['\\frac{1}{\\sqrt{1-t^2}}', '\\frac{1}{1-t^2}'] },
  // Expansion work is −29.88 kJ; the source range (−29.95 to 29.95) accepted almost anything.
  '2025 P1 Chemistry 11': { correct_answer: { min: -29.95, max: -29.8 } },
  // The set S nested $…$ inside \text{} inside math, which cannot render; same wording, flat math.
  '2023 P1 Mathematics 12': {
    questionReplace: [
      /let \$S=\\left\\\{[\s\S]*?\\right\\\}\$/,
      'let $S$ be the set of vectors $\\alpha\\hat{i}+\\beta\\hat{j}+\\gamma\\hat{k}$ with $\\alpha^2+\\beta^2+\\gamma^2=1$ such that the distance of $(\\alpha,\\beta,\\gamma)$ from the plane $P$ is $\\dfrac{7}{2}$',
    ],
  },
};

function buildQuestion(src) {
  const key = keyOf(src);
  const paper = PAPERS[paperKey(src)];
  const section = SECTIONS[src.subject];
  if (!section) throw new Error(`Unknown subject: ${src.subject}`);
  const patch = PATCHES[key] || {};
  const q = { ...src };
  if (patch.correct_answer) q.correct_answer = patch.correct_answer;
  if (patch.questionReplace) q.question_text = q.question_text.replace(...patch.questionReplace);

  const optionImages = q.option_images || {};
  let options = q.options || [];
  if (!options.length && Object.keys(optionImages).length) {
    options = Object.keys(optionImages).sort().map((id) => ({ option_id: id, text: '' }));
  }

  let type;
  let correct;
  if (!options.length) {
    type = 'student_produced_response';
    correct = numericAnswer(q.correct_answer);
  } else if (Array.isArray(q.correct_answer) && (q.correct_answer.length > 1 || q.type === 'multiple_select')) {
    type = 'multiple_select';
    correct = q.correct_answer.map((s) => String(s).toUpperCase()).sort().join(',');
  } else {
    type = 'multiple_choice';
    correct = String(Array.isArray(q.correct_answer) ? q.correct_answer[0] : q.correct_answer).toUpperCase();
  }

  const n = q.question_number;
  return {
    exam: paper.slug,
    section: section.slug,
    module: 1,
    questionNumber: n,
    itemId: `${paper.slug}:${section.slug}:m1:q${String(n).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type,
    selectCount: 0,
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: '',
    question: html(q.question_text),
    image: publicImage(IMAGES, q.image_url),
    imageAlt: `Figure for ${section.name} question ${n}`,
    options: options.map((o) => {
      const image = publicImage(IMAGES, optionImages[o.option_id]);
      return { id: String(o.option_id).toUpperCase(), text: image ? '' : html(o.text), image };
    }),
    correctAnswer: correct,
    acceptedAnswers: type === 'student_produced_response' ? [correct] : [],
    explanation: explanationHtml(q, EXPLANATIONS[key]),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 180,
    _meta: { exam: paper, section },
  };
}

// A question whose figure (or picture choices) is not in public/exam-images/jee-advanced/ yet is
// held back rather than shown without it; it is added on the next seed once the image is there.
function missingFigure(src, built) {
  if (src.image_url && !built.image) return src.image_url;
  const blank = built.options.find((o) => !o.image && (!o.text || /see (mo diagram|structures?) in image/i.test(o.text)));
  return blank ? `option ${blank.id} image` : '';
}

function buildAll({ report = false } = {}) {
  const kept = [];
  const held = [];
  source.forEach((q) => {
    const why = skip(q);
    if (why) { if (report) console.log(`  skip ${keyOf(q)}: ${why}`); return; }
    const built = buildQuestion(q);
    const missing = missingFigure(q, built);
    if (missing) { held.push(`${keyOf(q)} (${missing})`); return; }
    kept.push(built);
  });
  if (report && held.length) console.log(`  held back until their figures are added (${held.length}): ${held.join('; ')}`);
  return kept;
}

if (require.main === module) {
  run(() => seedFamily({ family: 'jee-advanced', familyLabel: 'JEE Advanced', built: buildAll({ report: true }), label: 'JEE Advanced' }));
}

module.exports = { buildAll };

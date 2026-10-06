// seed/examSeedGateDa.js
//
// GATE 2024 Data Science and Artificial Intelligence (DA): General Aptitude (Q1–10) and the
// DA subject paper (Q11–65). GATE has one 3-hour clock; here GA gets 30 minutes and DA 150.
// Written to the gate_da_questions collection.
//
// Source: seed/exam-data/gate_da_questions.json — an export of `sanghamitralearn.gate_da_questions`.
// Figures live in Front/client/public/exam-images/gate-da-2024/.
//
// Q15, 27, 29, 38 and 43 in the source are practice questions standing in for the official ones;
// their explanations are written below. The rest use the source's worked solutions.
//
// Run with: node seed/examSeedGateDa.js   (or: npm run seed:gate-da)

const { html, publicImage, explanationHtml, numericAnswer, seedFamily, run } = require('./examSeedCommon');
const source = require('./exam-data/gate_da_questions.json');

const EXAM = {
  slug: 'gate-da-2024',
  label: 'GATE DA 2024',
  order: 1,
  citation: 'GATE 2024 Data Science and Artificial Intelligence (DA), IISc Bengaluru',
};

const SECTIONS = {
  ga: { slug: 'general-aptitude', name: 'General Aptitude', order: 1, seconds: 30 * 60, description: 'Verbal, quantitative, analytical and spatial aptitude.' },
  da: { slug: 'data-science-ai', name: 'Data Science & AI', order: 2, seconds: 150 * 60, description: 'Probability, linear algebra, calculus, algorithms, databases, ML and AI.' },
};
const sectionOf = (q) => (/General Aptitude/.test(q.section || '') ? SECTIONS.ga : SECTIONS.da);

const EXPLANATIONS = {
  15: 'Trace the stack: push 10, push 20, pop → 20, push 30, push 40, pop → 40, pop → 30. The last pop returns 30.',
  27: 'C depends on the key A only through the non-key attribute B (A → B → C), a transitive dependency, so R is not in 3NF. The key is a single attribute, so there are no partial dependencies and R is in 2NF.',
  29: 'f(0) = f(1) = 1, f(2) = 2, f(3) = 3, f(4) = 5, f(5) = 8.',
  38: 'DATASET has 7 letters with A and T each appearing twice: 7!/(2! × 2!) = 5040/4 = 1260.',
  43: 'AC-3 makes every arc consistent, repeatedly removing domain values that have no supporting value in a neighbouring variable, before (or during) search.',
  59: 'The marginal is f_X(x) = x³, so f(y | x) = 2y/x² on (0, x) and E[Y | X = x] = 2x/3. At x = 1.5 this is 1. (The official key awarded marks to all for this question; 1 is accepted here.)',
};

// Rounded numerical answers: accept every value that rounds to the official one.
const ANSWER_RANGES = {
  62: '0.12 to 0.13',     // information gain = 0.1245…
  65: '0.062 to 0.063',   // covariance = 0.0625
};

function buildQuestion(q) {
  const section = sectionOf(q);
  const n = q.question_number;
  const type = q.type === 'multiple_choice_multiple' ? 'multiple_select'
    : (q.options || []).length ? 'multiple_choice' : 'student_produced_response';
  const optionImages = q.option_images || {};
  const hasFigure = Boolean(q.image_url) || Object.keys(optionImages).length > 0;

  let correct;
  if (type === 'multiple_select') correct = String(q.correct_answer).split(/[;,]/).map((s) => s.trim().toUpperCase()).sort().join(',');
  else if (type === 'multiple_choice') correct = String(q.correct_answer).trim().toUpperCase();
  else correct = ANSWER_RANGES[n] || numericAnswer(q.correct_answer);

  // "[see image: …]" notes describe the figure, which is shown instead. `…' is LaTeX quoting.
  let questionText = String(q.question_text).replace(/`([^`']*)'/g, '‘$1’');
  if (hasFigure) questionText = questionText.replace(/\s*\[see images?[^\]]*\]/gi, '');

  return {
    exam: EXAM.slug,
    section: section.slug,
    module: 1,
    questionNumber: n,
    itemId: `${EXAM.slug}:${section.slug}:m1:q${String(n).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type,
    selectCount: 0,
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: html(q.passage || ''),
    question: html(questionText),
    image: publicImage(EXAM.slug, q.image_url),
    imageAlt: `Figure for question ${n}`,
    options: (q.options || []).map((o) => {
      const image = publicImage(EXAM.slug, optionImages[o.option_id]);
      return { id: String(o.option_id).toUpperCase(), text: image ? '' : html(o.text), image };
    }),
    correctAnswer: correct,
    acceptedAnswers: type === 'student_produced_response' ? [correct] : [],
    explanation: explanationHtml(q, EXPLANATIONS[n]),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 120,
    _meta: { exam: EXAM, section },
  };
}

const buildAll = () => source.map(buildQuestion);

if (require.main === module) {
  run(() => seedFamily({ family: 'gate-da', familyLabel: 'GATE DA', built: buildAll(), label: 'GATE DA' }));
}

module.exports = { buildAll };

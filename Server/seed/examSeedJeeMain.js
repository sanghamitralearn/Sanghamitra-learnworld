// seed/examSeedJeeMain.js
//
// JEE Main 2025, 22 January (Shift 1): Mathematics (Q1–25), Physics (Q26–50) and Chemistry
// (Q51–75), 60 minutes per subject. Written to the jee_main_questions collection.
//
// Source: seed/exam-data/jee_main_questions.json — an export of `sanghamitralearn.jee_main_questions`.
// Figures live in Front/client/public/exam-images/jee-main-2025-jan22-s1/.
//
// Every key was checked. Mathematics explanations are worked below; Physics and Chemistry show
// the approach and key ideas from the source tags.
//
// Run with: node seed/examSeedJeeMain.js   (or: npm run seed:jee-main)

const { html, publicImage, explanationHtml, numericAnswer, seedFamily, run } = require('./examSeedCommon');
const source = require('./exam-data/jee_main_questions.json');

const EXAM = {
  slug: 'jee-main-2025-jan22-s1',
  label: 'JEE Main 2025 · 22 Jan Shift 1',
  order: 1,
  citation: 'JEE Main 2025, 22 January, Morning Shift (NTA)',
};
const IMAGES = EXAM.slug;

const SECTIONS = {
  Mathematics: { slug: 'mathematics', name: 'Mathematics', order: 1, seconds: 60 * 60, description: '20 multiple-choice and 5 numerical-value questions.' },
  Physics: { slug: 'physics', name: 'Physics', order: 2, seconds: 60 * 60, description: '20 multiple-choice and 5 numerical-value questions.' },
  Chemistry: { slug: 'chemistry', name: 'Chemistry', order: 3, seconds: 60 * 60, description: '20 multiple-choice and 5 numerical-value questions.' },
};

const EXPLANATIONS = {
  1: 'Equivalence relations on {1, 2, 3} correspond to partitions of the set: {1}{2}{3}, {1,2}{3}, {1,3}{2}, {2,3}{1} and {1,2,3} — 5 of them.',
  2: 'f(x + y) = f(x)f(y) gives f(x) = e^{λx} with λ = f′(0) = 4a. Then λ² − 3aλ − 1 = 0 gives 16a² − 12a² = 1, so a = ½ and λ = 2. f(ax) = e^{x}, and the area is ∫₀² eˣ dx = e² − 1.',
  3: 'The image of the centroid is the centroid of the image. The original centroid is (2, 8/3). Reflecting in x + 2y − 2 = 0 (factor (2 + 16/3 − 2)/5 = 16/15) gives (2 − 32/15, 8/3 − 64/15) = (−2/15, −24/15). So 15(α − β) = −2 + 24 = 22.',
  4: 'z₁z̄₂ = e^{−iπ/4}, z₂z̄₃ = e^{−iπ/4}, z₃z̄₁ = e^{iπ/2} = i. The sum is √2 + i(1 − √2), whose squared modulus is 2 + (1 − √2)² = 5 − 2√2. So α = 5, β = −2 and α² + β² = 29.',
  5: 'With t = sec⁻¹x, cosec⁻¹x = π/2 − t and t ∈ [0, π], t ≠ π/2. t² + (π/2 − t)² is least at t = π/4 (π²/8) and greatest at t = π (5π²/4). Times 16: 2π² + 20π² = 22π².',
  6: 'Outcomes with one "head followed by tail": HHT, HTH, HTT, THT, so X = 1 with probability ½ and 0 otherwise. μ = ½ and σ² = ½ − ¼ = ¼, so 64(μ + σ²) = 48.',
  7: 'a₁a₅ = a₃² = 28 and a₂ + a₄ = a₃(1/r + r) = 29 give 2√7 r² − 29r + 2√7 = 0, so r = 2√7 (increasing). a₆ = a₃r³ = (2√7)⁴ = 784.',
  8: 'Take general points on L₁ and L₂, make the joining vector perpendicular to both direction vectors, and solve. The common perpendicular passes through (14/3, −3, 22/3).',
  9: 'Taking logs: 5t² + 3 = 8t with t = ln x, so 5t² − 8t + 3 = 0. The product of the x-values is e^{t₁ + t₂} = e^{8/5}.',
  10: 'T_n = S_n − S_{n−1} = (2n − 1)(2n + 1)(2n + 3)/8. Then Σ 1/T_r = 8 Σ 1/((2r − 1)(2r + 1)(2r + 3)), which telescopes to 8 × (1/4)(1/3) = 2/3.',
  11: 'M is the 13th letter: choose 2 of the 12 letters before it and 2 of the 13 after it. ¹²C₂ × ¹³C₂ = 66 × 78 = 5148.',
  12: 'dx/dy + x/y² = 1/y³ with integrating factor e^{−1/y} gives x = 1 + 1/y + Ce^{1/y}. x(1) = 1 gives C = −1/e, so x(½) = 3 − e.',
  13: 'R = (0, −3) lies on the circle centred (−1, −1), so r² = 5. The circle meets the x-axis at x = 1 and −3, which must be the parabola\'s roots, so p = 2. Area = ½ × 4 × 3 = 6.',
  14: 'C has centre (−2, 2) and radius 2; its distance to (2, 5) is 5. Two intersection points need |r − 2| < 5 < r + 2, i.e. 3 < r < 7. 3β − 2α = 21 − 6 = 15.',
  15: 'f(x) = (7tan⁶x − 3tan²x)sec²x, so I₁ = ∫₀¹(7t⁶ − 3t²)dt = 0. By parts, I₂ = −∫₀^{π/4}(tan⁷x − tan³x)dx = −∫₀¹ t³(t² − 1)dt = 1/12. So 7I₁ + 12I₂ = 1.',
  16: 'x = y = 0 gives f′(0) = ½; y = 0 then gives f′(x) = f(x)/2, so f(x) = e^{x/2}. Σ ln f(n) = Σ n/2 = 5050/2 = 2525.',
  17: 'Count reduced fractions m/n < 1 with n ≤ 10: φ(2) + … + φ(10) = 1 + 2 + 2 + 4 + 2 + 6 + 4 + 6 + 4 = 31.',
  18: 'The curves meet at x = 0 and 2√3. Inside both: parabola part 2∫₀^{2√3}√(2√3x)dx = 16 plus the right half-disc 6π. Circle area 12π minus (16 + 6π) = 6π − 16.',
  19: 'P(both black) = (6/10)(5/9) = 1/3 and P(second black) = 6/10. P(first black | second black) = (1/3)/(3/5) = 5/9, so m + n = 14.',
  20: 'Centre (1, 1), c = 13. For P(1, 6): |PF₁ − PF₂| = |8 − 18| = 10 = 2a, so a = 5 and b² = 169 − 25 = 144. Latus rectum = 2b²/a = 288/5.',
  21: 'Continuity and equal derivatives at x = 1 give b = −6a and a² − 3a + 2 = 0, so a = 2, b = −12. y = −20 meets the curve at x = −√3 and x = 2. Area = (16 + 12√3) + 6 = 22 + 12√3, so α + β = 34.',
  22: 'Σ ¹¹C_{2r+1}/(2r + 2) = ½∫₀¹[(1 + x)¹¹ − (1 − x)¹¹]dx = (2¹² − 2)/24 = 2047/12, so m − n = 2035.',
  23: 'det(3A) = −54; det adj(3A) = 54²; det(−6 adj(3A)) = −216 × 54²; det adj of that = (216 × 54²)²; times 27 for the factor 3: 2¹⁰ · 3²¹. So m + n = 10, mn = 21: m = 7, n = 3 and 4m + 2n = 34.',
  24: 'L₁ and L₂ meet at B(4, 0, −1), which forces α = 3. The foot of the perpendicular from A to L₂ is P(40/13, 0, −31/13), so PB² = 468/169 and 26 × 3 × 468/169 = 216.',
  25: 'c = ((λ + 8)/9)a and |a + c| = 3(17 + λ)/9 = 7 gives λ = 4, so c = (4/3)(1, 2, 2). |b × c| = (4/3)|(−8, −4, 8)| = 16.',
  32: 'λ = 2πr/n, so λ ∝ r/n. Ground state: r₁/1; third excited state (n = 4): 16r₁/4 = 4r₁. The wavelengths differ by a factor of 4 — the official key gives 4, comparing the two magnitudes.',
  63: 'The acid group outranks the ester, so the chain is numbered from COOH: methyls at C2 and C5, and the −COOCH₃ group on C6 is named methoxycarbonyl — 6-methoxycarbonyl-2,5-dimethylhexanoic acid.',
  68: 'Br₂/AcOH brominates nitrobenzene meta to NO₂; Sn/HCl reduces NO₂ to NH₂; NaNO₂/HCl gives the diazonium salt; ethanol replaces N₂⁺ by H and is itself oxidised to acetaldehyde. Products: bromobenzene and acetaldehyde.',
};

const PATCHES = {
  // Ethanol reduces the diazonium salt to the arene (bromobenzene) and becomes acetaldehyde —
  // choice D. The source key said C (a bromophenol), which needs water, not ethanol.
  // question_68.png is the worked solution, so the reaction scheme (question_65.JPG) is shown instead.
  68: { correct_answer: 'D', image_url: 'question_65.JPG' },
  // The five structures for this question are in question_65_options.png.
  65: { image_url: 'question_65_options.png' },
  // Both images supplied for Q75 are worked solutions; the text states the full sequence.
  75: { image_url: null },
  // The structure lost a CH(CH3) group in transcription; the options (and the key, D) name
  // 6-methoxycarbonyl-2,5-dimethylhexanoic acid.
  63: { question_text: 'The IUPAC name of the following compound is: $HOOC-CH(CH_3)-CH_2-CH_2-CH(CH_3)-CH_2-COOCH_3$' },
};

function buildQuestion(src) {
  const section = SECTIONS[src.subject];
  if (!section) throw new Error(`Unknown subject: ${src.subject}`);
  const q = { ...src, ...(PATCHES[src.question_number] || {}) };
  const spr = !(q.options || []).length;
  const correct = spr ? numericAnswer(q.correct_answer) : String(q.correct_answer).toUpperCase();
  return {
    exam: EXAM.slug,
    section: section.slug,
    module: 1,
    questionNumber: q.question_number,
    itemId: `${EXAM.slug}:${section.slug}:m1:q${String(q.question_number).padStart(2, '0')}`,
    sourceId: String(q._id || ''),
    type: spr ? 'student_produced_response' : 'multiple_choice',
    topic: q.topic || '',
    subtopic: q.subtopic || '',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
    passage: '',
    question: html(q.question_text),
    image: publicImage(IMAGES, q.image_url),
    imageAlt: `Figure for ${section.name} question ${q.question_number}`,
    options: (q.options || []).map((o) => ({ id: String(o.option_id).toUpperCase(), text: html(o.text), image: '' })),
    correctAnswer: correct,
    acceptedAnswers: spr ? [correct] : [],
    explanation: explanationHtml(q, EXPLANATIONS[q.question_number]),
    points: 1,
    averageTimeSeconds: q.average_time_seconds || 150,
    _meta: { exam: EXAM, section },
  };
}

const buildAll = () => source.map(buildQuestion);

if (require.main === module) {
  run(() => seedFamily({ family: 'jee-main', familyLabel: 'JEE Main', built: buildAll(), label: 'JEE Main' }));
}

module.exports = { buildAll };

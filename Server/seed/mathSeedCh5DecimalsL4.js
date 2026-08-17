// seed/mathSeedCh5DecimalsL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 5
// (Decimals), Level 4 — converted from the standalone HTML file
// ch-5-decimals-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh5DecimalsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-5-decimals";
const CHAPTER_NAME = "Decimals";
const LEVEL = 4;

const CLUSTER_NAMES = {
  PLACE: "Place Value & Expanded Form",
  COMP: "Comparing & Ordering Decimals",
  ROUND: "Rounding Decimals",
  CONV: "Fractions → Decimals",
  ADDSUB: "Addition & Subtraction",
  MUL10: "× and ÷ by 10, 100, 1000"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 6.24, what digit is in the tenths place?",
    options: [
        { text: "2", correct: true, feedback: "The first digit after the decimal point is tenths: 2." },
        { text: "6", correct: false, feedback: "6 is in the ones place." },
        { text: "4", correct: false, feedback: "4 is in the hundredths place." },
        { text: "0", correct: false, feedback: "There is no 0 in the tenths place." }
      ]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? 0.7 or 0.69",
    options: [
        { text: "0.7", correct: true, feedback: "0.7 = 0.70 > 0.69." },
        { text: "0.69", correct: false, feedback: "0.70 is larger." },
        { text: "They are equal", correct: false, feedback: "0.70 ≠ 0.69." },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.7 and compare." }
      ]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 3.48 to the nearest tenth.",
    options: [
        { text: "3.5", correct: true, feedback: "Hundredths 8 ≥ 5 → round up tenths to 5." },
        { text: "3.4", correct: false, feedback: "You truncated instead of rounding up." },
        { text: "3.0", correct: false, feedback: "That's the nearest whole number." },
        { text: "3.48", correct: false, feedback: "Unchanged; rounding must be applied." }
      ]
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write \\(\\frac{3}{10}\\) as a decimal.",
    options: [
        { text: "0.3", correct: true, feedback: "Denominator 10 means one decimal place." },
        { text: "3.0", correct: false, feedback: "That's 3, not 3/10." },
        { text: "0.03", correct: false, feedback: "That would be 3/100." },
        { text: "0.003", correct: false, feedback: "That would be 3/1000." }
      ]
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "4.2 + 3.5 = ?",
    options: [
        { text: "7.7", correct: true, feedback: "Add tenths and ones." },
        { text: "7.0", correct: false, feedback: "You forgot to add the tenths." },
        { text: "7.07", correct: false, feedback: "Decimal point misplaced." },
        { text: "8.7", correct: false, feedback: "Incorrect addition." }
      ]
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.56 × 100 = ?",
    options: [
        { text: "56", correct: true, feedback: "Move decimal two places right." },
        { text: "5.6", correct: false, feedback: "That's ×10." },
        { text: "560", correct: false, feedback: "That's ×1000." },
        { text: "0.0056", correct: false, feedback: "You divided instead of multiplied." }
      ]
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.05 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{20}\\)", correct: true, feedback: "5/100 = 1/20." },
        { text: "\\(\\frac{5}{100}\\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2, not 0.05." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "1/2 = 0.5, not 0.05." }
      ]
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "6.0 - 2.4 = ?",
    options: [
        { text: "3.6", correct: true, feedback: "6.0 - 2.4 = 3.6." },
        { text: "4.4", correct: false, feedback: "Incorrect subtraction." },
        { text: "3.4", correct: false, feedback: "Incorrect." },
        { text: "8.4", correct: false, feedback: "You added instead of subtracting." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "S",
    question: "In 0.739, what digit is in the hundredths place?",
    options: [
        { text: "3", correct: true, feedback: "Hundredths is the second decimal place: 3." },
        { text: "7", correct: false, feedback: "7 is tenths." },
        { text: "9", correct: false, feedback: "9 is thousandths." },
        { text: "0", correct: false, feedback: "There is no 0 digit shown after the decimal." }
      ]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    question: "Which is smallest? 0.45, 0.5, 0.405, 0.455",
    options: [
        { text: "0.405", correct: true, feedback: "Align: 0.450, 0.500, 0.405, 0.455. 0.405 is smallest." },
        { text: "0.45", correct: false, feedback: "0.45 is larger than 0.405." },
        { text: "0.5", correct: false, feedback: "0.5 is the largest." },
        { text: "0.455", correct: false, feedback: "0.455 is larger than 0.405." }
      ]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "S",
    question: "Round 7.164 to the nearest hundredth.",
    options: [
        { text: "7.16", correct: true, feedback: "Thousandths 4 < 5 → keep hundredths 6." },
        { text: "7.17", correct: false, feedback: "You rounded up when you shouldn't have." },
        { text: "7.2", correct: false, feedback: "That's rounding to the nearest tenth." },
        { text: "7.164", correct: false, feedback: "Unchanged; rounding must be applied." }
      ]
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "S",
    question: "Write \\(\\frac{4}{5}\\) as a decimal.",
    options: [
        { text: "0.8", correct: true, feedback: "4/5 = 8/10 = 0.8." },
        { text: "0.4", correct: false, feedback: "That's 2/5, not 4/5." },
        { text: "0.45", correct: false, feedback: "Incorrect." },
        { text: "1.25", correct: false, feedback: "That's the reciprocal 5/4." }
      ]
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "S",
    question: "5.25 + 2.3 = ?",
    options: [
        { text: "7.55", correct: true, feedback: "5.25 + 2.30 = 7.55." },
        { text: "7.25", correct: false, feedback: "You forgot to add the tenths correctly." },
        { text: "7.28", correct: false, feedback: "Misaligned decimals." },
        { text: "7.0", correct: false, feedback: "Rough estimate, not exact." }
      ]
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "T",
    question: "0.07 × ? = 7. Find ?.",
    options: [
        { text: "100", correct: true, feedback: "7 ÷ 0.07 = 100." },
        { text: "10", correct: false, feedback: "0.07×10=0.7." },
        { text: "1000", correct: false, feedback: "0.07×1000=70." },
        { text: "0.01", correct: false, feedback: "0.07×0.01=0.0007." }
      ]
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "T",
    question: "Which number has 5 in the thousandths place? 0.352, 0.253, 0.235, 0.523",
    options: [
        { text: "0.235", correct: true, feedback: "Thousandths is the third decimal place: 5 in 0.235." },
        { text: "0.352", correct: false, feedback: "Thousandths digit here is 2." },
        { text: "0.253", correct: false, feedback: "Thousandths digit here is 3." },
        { text: "0.523", correct: false, feedback: "Thousandths digit here is 3." }
      ]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    question: "Arrange in descending order: 0.99, 0.909, 0.9, 0.099",
    options: [
        { text: "0.99, 0.909, 0.9, 0.099", correct: true, feedback: "0.990, 0.909, 0.900, 0.099." },
        { text: "0.9, 0.909, 0.99, 0.099", correct: false, feedback: "That's ascending, not descending." },
        { text: "0.099, 0.9, 0.909, 0.99", correct: false, feedback: "That's ascending." },
        { text: "0.99, 0.9, 0.909, 0.099", correct: false, feedback: "0.909 is larger than 0.9." }
      ]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "C",
    question: "Round 8.396 to the nearest tenth, then add 0.5.",
    options: [
        { text: "8.9", correct: true, feedback: "8.396 → 8.4 (hundredths 9≥5). 8.4+0.5=8.9." },
        { text: "8.8", correct: false, feedback: "You truncated instead of rounding up." },
        { text: "8.4", correct: false, feedback: "You only rounded, forgot to add." },
        { text: "8.896", correct: false, feedback: "You used the original number instead of the rounded one." }
      ]
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "C",
    question: "Convert \\(\\frac{3}{8}\\) to a decimal, then multiply by 4.",
    options: [
        { text: "1.5", correct: true, feedback: "3/8=0.375. 0.375×4=1.5." },
        { text: "0.375", correct: false, feedback: "You forgot to multiply by 4." },
        { text: "1.2", correct: false, feedback: "Incorrect multiplication." },
        { text: "1.6", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "C",
    question: "9.3 - 4.56 + 1.7 = ?",
    options: [
        { text: "6.44", correct: true, feedback: "9.30-4.56=4.74; +1.70=6.44." },
        { text: "6.54", correct: false, feedback: "Incorrect subtraction." },
        { text: "5.44", correct: false, feedback: "Incorrect." },
        { text: "7.44", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "C",
    question: "4.5 ÷ 1000 = ?",
    options: [
        { text: "0.0045", correct: true, feedback: "Move decimal three places left." },
        { text: "0.045", correct: false, feedback: "That's ÷100." },
        { text: "4.5", correct: false, feedback: "No operation performed." },
        { text: "4500", correct: false, feedback: "You multiplied instead of dividing." }
      ]
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "H",
    question: "Write the decimal for 2 ones + 3 tenths + 5 thousandths. Then add 0.04 to it.",
    options: [
        { text: "2.345", correct: true, feedback: "Number = 2.305. +0.04 = 2.345." },
        { text: "2.305", correct: false, feedback: "You forgot to add 0.04." },
        { text: "2.35", correct: false, feedback: "Misplaced digits." },
        { text: "2.309", correct: false, feedback: "You added 0.004 instead of 0.04." }
      ]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    question: "A number is between 2.4 and 2.5. Its hundredths digit is 7. What is the smallest possible number with three decimal places?",
    options: [
        { text: "2.470", correct: true, feedback: "Smallest between 2.4 and 2.5 with hundredths 7 is 2.470." },
        { text: "2.407", correct: false, feedback: "Hundredths digit here is 0, not 7." },
        { text: "2.471", correct: false, feedback: "Larger than 2.470." },
        { text: "2.417", correct: false, feedback: "Hundredths digit here is 1, not 7." }
      ]
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "H",
    question: "A number rounded to the nearest hundredth is 5.63. The thousandths digit is 8. What is the number?",
    options: [
        { text: "5.628", correct: true, feedback: "5.625-5.634 range, thousandths 8 → 5.628." },
        { text: "5.638", correct: false, feedback: "That rounds to 5.64." },
        { text: "5.624", correct: false, feedback: "Thousandths digit is 4, not 8." },
        { text: "5.632", correct: false, feedback: "Thousandths digit is 2, not 8." }
      ]
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "T",
    question: "Which fraction is equal to 0.625?",
    options: [
        { text: "\\(\\frac{5}{8}\\)", correct: true, feedback: "5/8 = 0.625." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "3/4 = 0.75." },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "5/6 ≈ 0.833." },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "4/7 ≈ 0.571." }
      ]
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    question: "(3.6 - 1.25) + (4.7 - 2.8) = ?",
    options: [
        { text: "4.25", correct: true, feedback: "3.6-1.25=2.35; 4.7-2.8=1.9; sum=4.25." },
        { text: "4.15", correct: false, feedback: "Incorrect." },
        { text: "5.25", correct: false, feedback: "Incorrect." },
        { text: "3.25", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "H",
    question: "A number divided by 100 gives 0.034. What is the number multiplied by 10?",
    options: [
        { text: "34", correct: true, feedback: "Original = 3.4. ×10 = 34." },
        { text: "3.4", correct: false, feedback: "That's the original number, not ×10." },
        { text: "0.34", correct: false, feedback: "Incorrect." },
        { text: "340", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "d19", order: 19, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "T",
    question: "A number rounded to the nearest whole number is 10. The tenths digit is 4. What could be the number? (Two decimal places, hundredths digit 5)",
    options: [
        { text: "10.45", correct: true, feedback: "10.45 rounds to 10 (tenths 4<5). Tenths 4, hundredths 5." },
        { text: "9.45", correct: false, feedback: "9.45 rounds to 9, not 10." },
        { text: "10.54", correct: false, feedback: "Tenths digit is 5, not 4; also rounds to 11." },
        { text: "9.54", correct: false, feedback: "Its tenths digit is 5, not 4." }
      ]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    question: "Which list is in ascending order? A) 0.6, 0.56, 0.65; B) 0.56, 0.6, 0.65; C) 0.65, 0.6, 0.56; D) 0.56, 0.65, 0.6",
    options: [
        { text: "B", correct: true, feedback: "0.56 < 0.6 < 0.65." },
        { text: "A", correct: false, feedback: "Not correctly ordered." },
        { text: "C", correct: false, feedback: "That's descending." },
        { text: "D", correct: false, feedback: "Not correctly ordered." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 4.081, what digit is in the thousandths place?",
    options: [
        { text: "1", correct: true, feedback: "The thousandths place is the third decimal digit." },
        { text: "8", correct: false, feedback: "8 is in the hundredths place." },
        { text: "0", correct: false, feedback: "0 is in the tenths place." },
        { text: "4", correct: false, feedback: "4 is in the ones place." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? 0.88 or 0.808",
    options: [
        { text: "0.88", correct: true, feedback: "0.88 = 0.880 > 0.808." },
        { text: "0.808", correct: false, feedback: "0.808 is smaller." },
        { text: "Equal", correct: false, feedback: "0.880 ≠ 0.808." },
        { text: "Cannot compare", correct: false, feedback: "Add zeros and compare." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 6.095 to the nearest hundredth.",
    options: [
        { text: "6.10", correct: true, feedback: "Thousandths 5 → round up hundredths 9 to 10, carry to tenths." },
        { text: "6.09", correct: false, feedback: "You did not round up." },
        { text: "6.1", correct: false, feedback: "That's the correct value but not fully written to hundredths precision." },
        { text: "6.095", correct: false, feedback: "Unchanged; rounding must be applied." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{2}{5}\\) to a decimal.",
    options: [
        { text: "0.4", correct: true, feedback: "2/5 = 4/10 = 0.4." },
        { text: "0.2", correct: false, feedback: "That's 1/5, not 2/5." },
        { text: "0.5", correct: false, feedback: "That's 1/2." },
        { text: "2.5", correct: false, feedback: "That's the reciprocal 5/2." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "7.6 - 2.78 = ?",
    options: [
        { text: "4.82", correct: true, feedback: "7.60 - 2.78 = 4.82." },
        { text: "4.22", correct: false, feedback: "Incorrect subtraction." },
        { text: "5.82", correct: false, feedback: "Incorrect." },
        { text: "5.22", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.03 × 1000 = ?",
    options: [
        { text: "30", correct: true, feedback: "Move decimal three places right." },
        { text: "3", correct: false, feedback: "That's ×100." },
        { text: "300", correct: false, feedback: "That's ×10000." },
        { text: "0.00003", correct: false, feedback: "You divided instead of multiplied." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write 0.506 in expanded form.",
    options: [
        { text: "\\(\\frac{5}{10} + \\frac{6}{1000}\\)", correct: true, feedback: "5 tenths, 0 hundredths, 6 thousandths." },
        { text: "\\(\\frac{5}{10} + \\frac{6}{100}\\)", correct: false, feedback: "That would be 0.56, not 0.506." },
        { text: "\\(\\frac{5}{100} + \\frac{6}{1000}\\)", correct: false, feedback: "5 is in the tenths place, not hundredths." },
        { text: "\\(5 + \\frac{6}{100}\\)", correct: false, feedback: "Missing the tenths digit 5 and wrong place for 6." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: 1.2, 1.02, 1.002, 1.22",
    options: [
        { text: "1.002, 1.02, 1.2, 1.22", correct: true, feedback: "1.002 < 1.020 < 1.200 < 1.220." },
        { text: "1.02, 1.002, 1.2, 1.22", correct: false, feedback: "1.002 is smaller than 1.02." },
        { text: "1.2, 1.22, 1.02, 1.002", correct: false, feedback: "That's descending." },
        { text: "1.002, 1.2, 1.02, 1.22", correct: false, feedback: "1.02 is smaller than 1.2." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 9.854 to the nearest tenth, then multiply by 10.",
    options: [
        { text: "99", correct: true, feedback: "9.854 → 9.9. ×10 = 99." },
        { text: "98.5", correct: false, feedback: "You multiplied the original number instead of the rounded one." },
        { text: "9.9", correct: false, feedback: "You only rounded, forgot to multiply." },
        { text: "990", correct: false, feedback: "You multiplied by 100 instead of 10." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "72 ÷ 100 = ?",
    options: [
        { text: "0.72", correct: true, feedback: "Move decimal two places left." },
        { text: "7.2", correct: false, feedback: "That's ÷10." },
        { text: "7200", correct: false, feedback: "You multiplied instead of dividing." },
        { text: "0.072", correct: false, feedback: "That's ÷1000." }
      ]
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({
    grade: GRADE,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    phase,
    ...item
  }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    title: "Decimals — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every decimals cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '',
    timedSeconds: 25 * 60
  }
];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  console.log('Connected to MongoDB');

  await Promise.all([
    MathChapter.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL }),
    MathQuestion.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL })
  ]);
  console.log('Cleared existing seed data for', GRADE, CHAPTER_SLUG, 'level', LEVEL);

  await MathChapter.insertMany(chapterDocs);
  await MathQuestion.insertMany(allQuestions);

  console.log(`Inserted ${chapterDocs.length} chapter/level catalog entries.`);
  console.log(`Inserted ${allQuestions.length} questions.`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

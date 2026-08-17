// seed/mathSeedCh9PatternsAlgebraL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 9
// (Patterns & Algebra), Level 4 — converted from the standalone HTML file
// ch-9-patterns-algebra-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh9PatternsAlgebraL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-9-patterns-algebra";
const CHAPTER_NAME = "Patterns & Algebra";
const LEVEL = 4;

const CLUSTER_NAMES = {
  PAT: "Patterns",
  FUNC: "Function Machines",
  EQN: "Equations",
  EXPR: "Expressions",
  SEQ: "Sequences",
  SYM: "Symbols & Word Problems"
};

const warmupItems = [
  {
    itemId: "w1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "2, 4, 6, 8, ___ — what comes next?",
    options: [
        { text: "10", correct: true, feedback: "Add 2 each time. 8+2 = 10." },
        { text: "12", correct: false, feedback: "You multiplied by 2 instead of adding." },
        { text: "9", correct: false, feedback: "You added 1." },
        { text: "16", correct: false, feedback: "You doubled 8." }
      ]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: add 4. Input = 7. What is the output?",
    options: [
        { text: "11", correct: true, feedback: "7 + 4 = 11." },
        { text: "3", correct: false, feedback: "You subtracted 4." },
        { text: "28", correct: false, feedback: "You multiplied by 4." },
        { text: "7", correct: false, feedback: "No operation." }
      ]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x + 5 = 12 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "12 − 5 = 7." },
        { text: "17", correct: false, feedback: "You added 12+5." },
        { text: "6", correct: false, feedback: "Incorrect subtraction." },
        { text: "5", correct: false, feedback: "You gave the number being added." }
      ]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '3 more than \\( n \\)' as an expression.",
    options: [
        { text: "\\( n + 3 \\)", correct: true, feedback: "More than means add." },
        { text: "\\( 3n \\)", correct: false, feedback: "That's 3 times n." },
        { text: "\\( n - 3 \\)", correct: false, feedback: "That's 3 less than n." },
        { text: "\\( 3 - n \\)", correct: false, feedback: "Order is wrong." }
      ]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 3, add 2 each time. What is the 3rd term?",
    options: [
        { text: "7", correct: true, feedback: "3, 5, 7. 3rd term = 7." },
        { text: "5", correct: false, feedback: "That's the 2nd term." },
        { text: "9", correct: false, feedback: "You added 2 twice? 3+2+4=9? No." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number minus 4 equals 10. Find the number.",
    options: [
        { text: "14", correct: true, feedback: "n − 4 = 10 → n = 14." },
        { text: "6", correct: false, feedback: "You subtracted 10−4." },
        { text: "10", correct: false, feedback: "You gave the right‑hand side." },
        { text: "40", correct: false, feedback: "You multiplied." }
      ]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "10, 20, 30, 40, ___ — next term?",
    options: [
        { text: "50", correct: true, feedback: "Add 10 each time." },
        { text: "60", correct: false, feedback: "You added 20." },
        { text: "45", correct: false, feedback: "You added 5." },
        { text: "80", correct: false, feedback: "You doubled 40." }
      ]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: multiply by 3. Input = 6. Output?",
    options: [
        { text: "18", correct: true, feedback: "6 × 3 = 18." },
        { text: "9", correct: false, feedback: "You added 3." },
        { text: "2", correct: false, feedback: "You divided by 3." },
        { text: "6", correct: false, feedback: "No operation." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "S",
    question: "3, 6, 9, 12, ___ — what comes next?",
    options: [
        { text: "15", correct: true, feedback: "Add 3 each time." },
        { text: "13", correct: false, feedback: "You added 1." },
        { text: "24", correct: false, feedback: "You multiplied by 2." },
        { text: "14", correct: false, feedback: "You added 2." }
      ]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "S",
    question: "Rule: subtract 5. Input = 13. What is the output?",
    options: [
        { text: "8", correct: true, feedback: "13 − 5 = 8." },
        { text: "18", correct: false, feedback: "You added 5." },
        { text: "65", correct: false, feedback: "You multiplied by 5." },
        { text: "5", correct: false, feedback: "You gave the subtracted number." }
      ]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "S",
    question: "Solve \\( 4 \\times x = 24 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "24 ÷ 4 = 6." },
        { text: "28", correct: false, feedback: "You added 24+4." },
        { text: "20", correct: false, feedback: "You subtracted." },
        { text: "96", correct: false, feedback: "You multiplied 24×4." }
      ]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "T",
    question: "Write '5 less than \\( y \\)' as an expression.",
    options: [
        { text: "\\( y - 5 \\)", correct: true, feedback: "Less than means subtract from the variable." },
        { text: "\\( 5 - y \\)", correct: false, feedback: "This is 'y less than 5', the opposite order." },
        { text: "\\( y + 5 \\)", correct: false, feedback: "That's '5 more than y'." },
        { text: "\\( 5y \\)", correct: false, feedback: "That's '5 times y'." }
      ]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "C",
    question: "Start at 2. Rule: multiply by 2, then add 1. Find the 3rd term.",
    options: [
        { text: "11", correct: true, feedback: "2 → 5 → 11." },
        { text: "5", correct: false, feedback: "That's the 2nd term." },
        { text: "9", correct: false, feedback: "You added 4 instead of 1? No." },
        { text: "10", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "T",
    question: "A number plus 6 equals 15. Find the number.",
    options: [
        { text: "9", correct: true, feedback: "x + 6 = 15 → x = 9." },
        { text: "21", correct: false, feedback: "You added 15+6." },
        { text: "90", correct: false, feedback: "You multiplied 15×6." },
        { text: "6", correct: false, feedback: "You gave the added number." }
      ]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "C",
    question: "Pattern: 1, 3, 7, 15, … (rule ×2+1). Find the 5th term.",
    options: [
        { text: "31", correct: true, feedback: "1→3→7→15→31." },
        { text: "15", correct: false, feedback: "That's the 4th term." },
        { text: "30", correct: false, feedback: "You doubled 15 but forgot +1." },
        { text: "32", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "T",
    question: "Output = 12. Rule: multiply by 3. Find the input.",
    options: [
        { text: "4", correct: true, feedback: "Reverse: 12 ÷ 3 = 4." },
        { text: "36", correct: false, feedback: "You multiplied 12×3 — wrong direction." },
        { text: "15", correct: false, feedback: "You added 3." },
        { text: "9", correct: false, feedback: "You subtracted 3." }
      ]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "C",
    question: "Solve \\( 2x + 3 = 13 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "2x = 10 → x = 5." },
        { text: "8", correct: false, feedback: "Incorrect solving." },
        { text: "16", correct: false, feedback: "You added 3 to 13." },
        { text: "10", correct: false, feedback: "You only subtracted 3." }
      ]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "H",
    question: "Evaluate \\( 3n - 2 \\) when \\( n = 5 \\).",
    options: [
        { text: "13", correct: true, feedback: "3×5 = 15; 15−2 = 13." },
        { text: "15", correct: false, feedback: "You forgot to subtract 2." },
        { text: "11", correct: false, feedback: "Incorrect." },
        { text: "17", correct: false, feedback: "You added 2." }
      ]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "H",
    question: "Sequence: 2, 5, 11, 23, … (rule ×2+1). Find the 6th term.",
    options: [
        { text: "95", correct: true, feedback: "2→5→11→23→47→95." },
        { text: "47", correct: false, feedback: "That's the 5th term." },
        { text: "93", correct: false, feedback: "You doubled and added 1? 47×2+1=95, not 93." },
        { text: "96", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "C",
    question: "A taxi charges ₹50 fixed plus ₹20 per km. The total fare is ₹110. How many km?",
    options: [
        { text: "3", correct: true, feedback: "50 + 20k = 110 → 20k = 60 → k = 3." },
        { text: "5", correct: false, feedback: "Incorrect solving." },
        { text: "6", correct: false, feedback: "You divided 110 by 20? Not correct." },
        { text: "2", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "T",
    question: "Find the missing term: 4, ___, 10, 13, 16",
    options: [
        { text: "7", correct: true, feedback: "Difference is +3. 4+3=7." },
        { text: "6", correct: false, feedback: "You added 2." },
        { text: "8", correct: false, feedback: "You added 4." },
        { text: "9", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "H",
    question: "Output = 18. Rule: add 4, then multiply by 2. Find the input.",
    options: [
        { text: "5", correct: true, feedback: "Reverse: 18÷2=9; 9−4=5." },
        { text: "13", correct: false, feedback: "You did 18−4=14 then ÷2=7? No." },
        { text: "32", correct: false, feedback: "You did 18×2−4=32 — wrong reversal." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "H",
    question: "Solve \\( 3x + 2 = x + 10 \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "3x+2 = x+10 → 2x = 8 → x = 4." },
        { text: "6", correct: false, feedback: "Incorrect collecting of terms." },
        { text: "8", correct: false, feedback: "Incorrect." },
        { text: "3", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "C",
    question: "Apples cost ₹15 each. Write an expression for the cost of \\( a \\) apples, then find the cost for 6 apples.",
    options: [
        { text: "15a; ₹90", correct: true, feedback: "15×6 = 90." },
        { text: "15a; ₹21", correct: false, feedback: "You added 15+6." },
        { text: "a+15; ₹21", correct: false, feedback: "Wrong expression." },
        { text: "15+a; ₹90", correct: false, feedback: "15+a is not 15 per apple; the correct rate expression is 15a." }
      ]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "T",
    question: "Start at 1. Rule: multiply by 3. What is the 4th term?",
    options: [
        { text: "27", correct: true, feedback: "1, 3, 9, 27." },
        { text: "9", correct: false, feedback: "That's the 3rd term." },
        { text: "81", correct: false, feedback: "That's the 5th term." },
        { text: "18", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "H",
    question: "A mother is 4 times as old as her daughter. In 5 years, she will be 3 times as old. Find the daughter's current age.",
    options: [
        { text: "10", correct: true, feedback: "D = d, M = 4d. 4d+5 = 3(d+5) → d = 10." },
        { text: "5", correct: false, feedback: "Then mother 20, in 5 yrs 25 and 10 — not 3 times." },
        { text: "15", correct: false, feedback: "Incorrect." },
        { text: "20", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "H",
    question: "Triangular numbers: 1, 3, 6, 10, … Find the 8th term.",
    options: [
        { text: "36", correct: true, feedback: "8×9÷2 = 36." },
        { text: "28", correct: false, feedback: "That's the 7th term." },
        { text: "45", correct: false, feedback: "That's the 9th term." },
        { text: "64", correct: false, feedback: "That's 8²." }
      ]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "C",
    question: "Rule: multiply by 2, then subtract 3. Input = 7. Output?",
    options: [
        { text: "11", correct: true, feedback: "7×2 = 14; 14−3 = 11." },
        { text: "8", correct: false, feedback: "You did 7×2−6? No." },
        { text: "17", correct: false, feedback: "You added 3." },
        { text: "5", correct: false, feedback: "Incorrect." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "5, 10, 15, 20, ___ — next term?",
    options: [
        { text: "25", correct: true, feedback: "Add 5 each time." },
        { text: "24", correct: false, feedback: "Not correct — try the next one." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "40", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: subtract 3. Input = 10. Output?",
    options: [
        { text: "7", correct: true, feedback: "10 − 3 = 7." },
        { text: "13", correct: false, feedback: "Not correct — try the next one." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x - 7 = 14 \\). Find \\( x \\).",
    options: [
        { text: "21", correct: true, feedback: "14 + 7 = 21." },
        { text: "7", correct: false, feedback: "Not correct — try the next one." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "14", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'twice a number \\( p \\), plus 1' as an expression.",
    options: [
        { text: "\\( 2p + 1 \\)", correct: true, feedback: "Twice p is 2p; plus 1 gives 2p+1." },
        { text: "\\( p + 2 \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( 2(p + 1) \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( p^2 + 1 \\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 5. Rule: ×2 + 1. Find the 4th term.",
    options: [
        { text: "47", correct: true, feedback: "5, 11, 23, 47." },
        { text: "23", correct: false, feedback: "Not correct — try the next one." },
        { text: "31", correct: false, feedback: "Not correct — try the next one." },
        { text: "95", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Solve \\( n + 8 = 20 \\). Find \\( n \\).",
    options: [
        { text: "12", correct: true, feedback: "20 − 8 = 12." },
        { text: "28", correct: false, feedback: "Not correct — try the next one." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "100, 90, 80, 70, ___ — next term?",
    options: [
        { text: "60", correct: true, feedback: "Subtract 10 each time." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." },
        { text: "75", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 20. Rule: add 5, then multiply by 2. Find the input.",
    options: [
        { text: "5", correct: true, feedback: "Reverse: 20÷2=10; 10−5=5." },
        { text: "15", correct: false, feedback: "Not correct — try the next one." },
        { text: "25", correct: false, feedback: "Not correct — try the next one." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 2x - 4 = 10 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "Add 4 → 2x=14; ÷2 → x=7." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 1. Rule: multiply by 3. Find the 5th term.",
    options: [
        { text: "81", correct: true, feedback: "1, 3, 9, 27, 81." },
        { text: "27", correct: false, feedback: "Not correct — try the next one." },
        { text: "243", correct: false, feedback: "Not correct — try the next one." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Patterns & Algebra — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every patterns and algebra cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "",
    timedSeconds: 1500
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

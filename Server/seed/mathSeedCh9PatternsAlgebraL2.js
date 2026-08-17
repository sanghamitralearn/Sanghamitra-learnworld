// seed/mathSeedCh9PatternsAlgebraL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 9
// (Patterns & Algebra), Level 2 — converted from the standalone HTML file
// ch-9-patterns-algebra-level-2.html.
//
// Run with: node seed/mathSeedCh9PatternsAlgebraL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-9-patterns-algebra";
const CHAPTER_NAME = "Patterns & Algebra";
const LEVEL = 2;

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
    question: "A pattern follows the rule ×3 each time: 2, 6, 18, 54, … What is the 6th term?",
    options: [
        { text: "486", correct: true, feedback: "4th=54, 5th=54×3=162, 6th=162×3=486." },
        { text: "162", correct: false, feedback: "That's the 5th term, not the 6th." },
        { text: "500", correct: false, feedback: "Not correct." },
        { text: "400", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "First find the 5th term, then multiply by 3 to get the 6th term."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: add 3, then multiply by 2. Input = 5. What is the output?",
    options: [
        { text: "16", correct: true, feedback: "(5 + 3) × 2 = 8 × 2 = 16." },
        { text: "13", correct: false, feedback: "You only added 3 and forgot to multiply." },
        { text: "10", correct: false, feedback: "You multiplied first then added? (5×2)+3=13? Actually 13, not 10. So incorrect." },
        { text: "8", correct: false, feedback: "You only added 3." }
      ],
    retryHint: "Do the operations in order: first add 3, then multiply the result by 2."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 3x + 5 = 20 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 5: 3x = 15. Divide by 3: x = 5." },
        { text: "15", correct: false, feedback: "You only subtracted 5." },
        { text: "6", correct: false, feedback: "Incorrect division." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "First subtract 5 from both sides, then divide by 3."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'twice a number \\( n \\), decreased by 7' as an expression.",
    options: [
        { text: "\\( 2n - 7 \\)", correct: true, feedback: "Twice n means 2n. Decreased by 7 means subtract 7." },
        { text: "\\( 2(n - 7) \\)", correct: false, feedback: "That means twice the result of n minus 7 — a different meaning." },
        { text: "\\( 2n + 7 \\)", correct: false, feedback: "That's increased by 7." },
        { text: "\\( 7 - 2n \\)", correct: false, feedback: "The order is wrong." }
      ],
    retryHint: "'Twice a number' means 2n. 'Decreased by' means subtract."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 4. Rule: multiply by 2, then add 1. Find the 3rd term.",
    options: [
        { text: "19", correct: true, feedback: "1st=4. 2nd=4×2+1=9. 3rd=9×2+1=19." },
        { text: "9", correct: false, feedback: "That's the 2nd term." },
        { text: "13", correct: false, feedback: "Incorrect rule applied." },
        { text: "15", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Apply the rule step by step: first 4×2+1=9, then 9×2+1=19."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number multiplied by 4, then 3 is subtracted, gives 13. Write an equation and find the number.",
    options: [
        { text: "\\( 4n - 3 = 13; n = 4 \\)", correct: true, feedback: "4n − 3 = 13 → add 3 → 4n = 16 → n = 4." },
        { text: "\\( 4n - 3 = 13; n = 5 \\)", correct: false, feedback: "Incorrect solution." },
        { text: "\\( 3n - 4 = 13; n = 6 \\)", correct: false, feedback: "Wrong order in the equation." },
        { text: "\\( 4n + 3 = 13; n = 2.5 \\)", correct: false, feedback: "Wrong operation (added instead of subtracted)." }
      ],
    retryHint: "Let the number be n. Multiply by 4 gives 4n. Subtract 3 gives 4n−3. Set equal to 13."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Identify the rule and find the 5th term: 10, 15, 25, 45, …",
    options: [
        { text: "85", correct: true, feedback: "Rule: ×2 − 5. 10×2−5=15, 15×2−5=25, 25×2−5=45, 45×2−5=85." },
        { text: "65", correct: false, feedback: "You added 20 to 45." },
        { text: "75", correct: false, feedback: "You used a wrong rule." },
        { text: "90", correct: false, feedback: "You doubled 45." }
      ],
    retryHint: "Check how each term relates to the previous one: 10×2−5=15, etc."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "The output is 22. The rule is: multiply by 3, then subtract 5. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: add 5 → 27; divide by 3 → 9." },
        { text: "71", correct: false, feedback: "You did 22×3+5 = 71 — wrong reversal." },
        { text: "6", correct: false, feedback: "Incorrect reversal." },
        { text: "12", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Reverse the operations in reverse order: first add 5 to the output, then divide by 3."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "A pattern follows the rule ×2+1: 1, 3, 7, 15, … What is the 6th term?",
    options: [
        { text: "63", correct: true, feedback: "4th=15, 5th=15×2+1=31, 6th=31×2+1=63." },
        { text: "31", correct: false, feedback: "That's the 5th term." },
        { text: "62", correct: false, feedback: "You doubled but forgot to add 1." },
        { text: "65", correct: false, feedback: "Incorrect." }
      ],
    backward: "Apply the rule to each term to get the next one.",
    forward: "Two‑step rules are common in real‑life growth patterns."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: subtract 4, then divide by 2. Input = 14. What is the output?",
    options: [
        { text: "5", correct: true, feedback: "(14 − 4) ÷ 2 = 10 ÷ 2 = 5." },
        { text: "10", correct: false, feedback: "You only subtracted 4." },
        { text: "7", correct: false, feedback: "You divided 14 by 2 then subtracted 4? That's 3." },
        { text: "9", correct: false, feedback: "Incorrect order of operations." }
      ],
    backward: "Follow the order: first subtract 4, then divide the result by 2.",
    forward: "Two‑step function machines model more complex processes."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 2x - 5 = 9 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "Add 5 → 2x = 14; divide by 2 → x = 7." },
        { text: "2", correct: false, feedback: "Incorrect." },
        { text: "14", correct: false, feedback: "You only added 5." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ],
    backward: "Add 5 to both sides, then divide by 2.",
    forward: "Two‑step equations combine two inverse operations."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'three times a number \\( y \\), increased by 2'. Then find its value when \\( y = 4 \\).",
    options: [
        { text: "\\( 3y + 2 = 14 \\)", correct: true, feedback: "3y+2 → 3×4+2 = 14." },
        { text: "\\( 3y + 2 = 12 \\)", correct: false, feedback: "You only evaluated 3y." },
        { text: "\\( 2y + 3 = 11 \\)", correct: false, feedback: "Expression is wrong order." },
        { text: "\\( 3(y+2) = 18 \\)", correct: false, feedback: "Wrong expression." }
      ],
    backward: "First write the expression: 3y + 2. Then substitute y=4.",
    forward: "Evaluating expressions prepares you for working with formulas."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 3. Rule: multiply by 3, then subtract 2. Find the 4th term.",
    options: [
        { text: "55", correct: true, feedback: "3→7→19→55. 4th=55." },
        { text: "7", correct: false, feedback: "1st? No, that's 2nd." },
        { text: "19", correct: false, feedback: "That's the 3rd term." },
        { text: "53", correct: false, feedback: "Incorrect final step." }
      ],
    backward: "Apply the rule step by step: 3→7→19→55.",
    forward: "Two‑step rules generate more interesting sequences."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A taxi charges ₹20 fixed fee plus ₹10 per kilometre. The total fare is ₹80. How many kilometres?",
    options: [
        { text: "6", correct: true, feedback: "20 + 10k = 80 → 10k = 60 → k = 6." },
        { text: "8", correct: false, feedback: "You divided 80 by 10." },
        { text: "10", correct: false, feedback: "Incorrect equation." },
        { text: "4", correct: false, feedback: "Incorrect." }
      ],
    backward: "Let kilometres = k. Fixed fee + rate×k = total. Solve the two‑step equation.",
    forward: "Real‑world problems often involve a fixed part and a variable part."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Pattern: 4, 9, 19, 39, __ (rule: ×2+1). Find the missing term.",
    options: [
        { text: "79", correct: true, feedback: "39×2+1 = 79." },
        { text: "78", correct: false, feedback: "You doubled but forgot +1." },
        { text: "80", correct: false, feedback: "You added 41." },
        { text: "49", correct: false, feedback: "Incorrect." }
      ],
    backward: "Apply the rule to the last known term.",
    forward: "Mastering two‑step rules helps with advanced patterns."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 8. Rule: add 5, then divide by 3. Find the input.",
    options: [
        { text: "19", correct: true, feedback: "Reverse: 8×3 = 24; 24 − 5 = 19." },
        { text: "29", correct: false, feedback: "You did 8×3+5=29 — wrong reversal order." },
        { text: "13", correct: false, feedback: "Incorrect." },
        { text: "24", correct: false, feedback: "You only multiplied by 3." }
      ],
    backward: "Reverse the operations in reverse order: multiply by 3, then subtract 5.",
    forward: "Reverse operations are the key to solving equations."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x \\div 4 + 3 = 8 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Subtract 3 → x/4 = 5; multiply by 4 → x = 20." },
        { text: "32", correct: false, feedback: "You multiplied 8×4? No." },
        { text: "5", correct: false, feedback: "You only subtracted 3." },
        { text: "15", correct: false, feedback: "Incorrect." }
      ],
    backward: "Subtract 3 from both sides, then multiply by 4.",
    forward: "Equations with division and addition appear in formulas."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'the quotient of a number \\( p \\) and 5, decreased by 2' as an expression.",
    options: [
        { text: "\\( p \\div 5 - 2 \\)", correct: true, feedback: "Quotient means divide. Decreased by means subtract." },
        { text: "\\( (p - 2) \\div 5 \\)", correct: false, feedback: "That's 'p decreased by 2, then divided by 5'." },
        { text: "\\( p \\div 5 + 2 \\)", correct: false, feedback: "Increased by 2." },
        { text: "\\( 5 \\div p - 2 \\)", correct: false, feedback: "The order of division is wrong." }
      ],
    backward: "Quotient means divide; decreased by means subtract.",
    forward: "Precise translation is crucial in algebra."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Sequence: 2, 5, 11, 23, … What is the rule? Use it to find the 5th term.",
    options: [
        { text: "×2+1; 47", correct: true, feedback: "23×2+1 = 47." },
        { text: "×2+1; 45", correct: false, feedback: "You doubled but didn't add 1 correctly? 23×2=46, +1=47." },
        { text: "×3−1; 68", correct: false, feedback: "Wrong rule." },
        { text: "×2+2; 48", correct: false, feedback: "Wrong rule." }
      ],
    backward: "Look at how each term is formed from the previous one.",
    forward: "Identifying rules is the first step in modelling."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Ravi saved ₹50 per week for some weeks plus ₹100 from his grandmother. Total savings ₹450. How many weeks?",
    options: [
        { text: "7", correct: true, feedback: "50w + 100 = 450 → 50w = 350 → w = 7." },
        { text: "9", correct: false, feedback: "Incorrect solving." },
        { text: "8", correct: false, feedback: "Incorrect." },
        { text: "10", correct: false, feedback: "Incorrect." }
      ],
    backward: "Weekly savings × weeks + gift = total. Solve the two‑step equation.",
    forward: "Saving plans are a real‑life use of algebra."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The pattern of square numbers: 1, 4, 9, 16, … What is the 10th term?",
    options: [
        { text: "100", correct: true, feedback: "These are n². 10th term = 10² = 100." },
        { text: "81", correct: false, feedback: "That's the 9th term (9²)." },
        { text: "121", correct: false, feedback: "That's the 11th term (11²)." },
        { text: "110", correct: false, feedback: "Not a square." }
      ],
    backward: "Identify the rule: nth term = n².",
    forward: "Square numbers appear in geometry and algebra."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: square the input, then add 4. Input = 6. What is the output?",
    options: [
        { text: "40", correct: true, feedback: "6² = 36; 36 + 4 = 40." },
        { text: "36", correct: false, feedback: "You forgot to add 4." },
        { text: "10", correct: false, feedback: "You added 6+4." },
        { text: "42", correct: false, feedback: "Incorrect." }
      ],
    backward: "First compute the square, then add 4.",
    forward: "This is like evaluating an algebraic expression."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 5x + 7 = 32 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 7 → 5x = 25; divide by 5 → x = 5." },
        { text: "6", correct: false, feedback: "Incorrect division." },
        { text: "7", correct: false, feedback: "Incorrect." },
        { text: "4", correct: false, feedback: "Incorrect." }
      ],
    backward: "Subtract 7, then divide by 5.",
    forward: "These equations model many everyday problems."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Evaluate \\( 4n - 3 \\) when \\( n = 6 \\).",
    options: [
        { text: "21", correct: true, feedback: "4×6 = 24; 24 − 3 = 21." },
        { text: "24", correct: false, feedback: "You only multiplied." },
        { text: "15", correct: false, feedback: "Incorrect." },
        { text: "27", correct: false, feedback: "You added 3." }
      ],
    backward: "Substitute n=6 into the expression and compute.",
    forward: "Evaluating expressions is the foundation of using formulas."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 2. Rule: multiply by 3, then add 1. Find the 4th term.",
    options: [
        { text: "67", correct: true, feedback: "2→7→22→67." },
        { text: "22", correct: false, feedback: "That's the 3rd term." },
        { text: "65", correct: false, feedback: "Incorrect." },
        { text: "70", correct: false, feedback: "Incorrect." }
      ],
    backward: "Apply the rule step by step: 2→7→22→67.",
    forward: "Sequences model growth in populations and investments."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "The product of a number and 4, plus 7, equals 31. Find the number.",
    options: [
        { text: "6", correct: true, feedback: "4n + 7 = 31 → 4n = 24 → n = 6." },
        { text: "8", correct: false, feedback: "Incorrect solving." },
        { text: "5", correct: false, feedback: "Incorrect." },
        { text: "10", correct: false, feedback: "Incorrect." }
      ],
    backward: "Write the equation: 4n + 7 = 31, then solve.",
    forward: "Translating words to equations is a core algebra skill."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Pattern: 3, 8, 18, 38, … (rule: ×2+2). Find the 5th term.",
    options: [
        { text: "78", correct: true, feedback: "38×2+2 = 76+2 = 78." },
        { text: "76", correct: false, feedback: "You doubled but forgot +2." },
        { text: "80", correct: false, feedback: "You added 42." },
        { text: "74", correct: false, feedback: "Incorrect." }
      ],
    backward: "Apply the rule to the last term.",
    forward: "Consistent rules generate predictable patterns."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 30. Rule: multiply by 4, then subtract 2. Find the input.",
    options: [
        { text: "8", correct: true, feedback: "Reverse: 30+2 = 32; 32÷4 = 8." },
        { text: "118", correct: false, feedback: "You did 30×4−2=118 — wrong reversal." },
        { text: "7", correct: false, feedback: "Incorrect division." },
        { text: "9", correct: false, feedback: "Incorrect." }
      ],
    backward: "Undo the operations in reverse order: add 2, then divide by 4.",
    forward: "This is the same reasoning used to solve two‑step equations."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x \\div 3 - 2 = 5 \\). Find \\( x \\).",
    options: [
        { text: "21", correct: true, feedback: "Add 2 → x/3 = 7; multiply by 3 → x = 21." },
        { text: "9", correct: false, feedback: "Incorrect." },
        { text: "15", correct: false, feedback: "Incorrect." },
        { text: "18", correct: false, feedback: "Incorrect." }
      ],
    backward: "Add 2 to both sides, then multiply by 3.",
    forward: "Equations with fractions are solved by multiplying."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'the sum of twice a number \\( m \\) and 8' as an expression.",
    options: [
        { text: "\\( 2m + 8 \\)", correct: true, feedback: "Twice m is 2m. Sum with 8 gives 2m+8." },
        { text: "\\( 2(m + 8) \\)", correct: false, feedback: "That's twice the sum of m and 8." },
        { text: "\\( m + 8 \\)", correct: false, feedback: "You forgot the twice." },
        { text: "\\( 2m - 8 \\)", correct: false, feedback: "That's the difference, not sum." }
      ],
    backward: "Twice the number is 2m; sum with 8 gives 2m+8.",
    forward: "Word phrases become algebraic expressions."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence follows the rule: multiply by 2, then subtract 3. The 3rd term is 15. Find the 1st term.",
    options: [
        { text: "6", correct: true, feedback: "Work backwards: 3rd=15. 2nd = (15+3)÷2 = 9. 1st = (9+3)÷2 = 6." },
        { text: "9", correct: false, feedback: "That's the 2nd term." },
        { text: "12", correct: false, feedback: "Incorrect reverse steps." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ],
    backward: "Work backwards step by step, or set up an equation: 1st=x, 2nd=2x−3, 3rd=2(2x−3)−3=15.",
    forward: "Reverse thinking is powerful in algebra."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number is halved, then 4 is added. The result is 11. Find the number.",
    options: [
        { text: "14", correct: true, feedback: "x/2 + 4 = 11 → x/2 = 7 → x = 14." },
        { text: "30", correct: false, feedback: "You did 11×2+4? Not correct." },
        { text: "7", correct: false, feedback: "You only solved x/2=7? Then x=14." },
        { text: "22", correct: false, feedback: "You added 4 before halving, in the wrong order." }
      ],
    backward: "Let the number be x. Halving means x/2. Then set up the equation and solve.",
    forward: "Word problems with fractions are common in real life."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "A pattern follows the rule ×2: 5, 10, 20, 40, … What is the 6th term?",
    options: [
        { text: "160", correct: true, feedback: "5th=80, 6th=80×2=160." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." },
        { text: "120", correct: false, feedback: "Not correct — try the next one." },
        { text: "200", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: add 6, then divide by 3. Input = 12. Output?",
    options: [
        { text: "6", correct: true, feedback: "(12+6)÷3 = 6." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 4x - 3 = 21 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "Add 3 → 4x=24; ÷4 → x=6." },
        { text: "5", correct: false, feedback: "Not correct — try the next one." },
        { text: "7", correct: false, feedback: "Not correct — try the next one." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '10 less than three times \\( k \\)' as an expression.",
    options: [
        { text: "\\( 3k - 10 \\)", correct: true, feedback: "Three times k is 3k. Less than means subtract from that." },
        { text: "\\( 10 - 3k \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( 3(k - 10) \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( 3k + 10 \\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 5. Rule: multiply by 2, then add 3. Find the 4th term.",
    options: [
        { text: "61", correct: true, feedback: "5→13→29→61." },
        { text: "13", correct: false, feedback: "Not correct — try the next one." },
        { text: "29", correct: false, feedback: "Not correct — try the next one." },
        { text: "63", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number plus 12, then the result is divided by 2, giving 10. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "(n+12)÷2 = 10 → n+12=20 → n=8." },
        { text: "14", correct: false, feedback: "Not correct — try the next one." },
        { text: "22", correct: false, feedback: "Not correct — try the next one." },
        { text: "16", correct: false, feedback: "You divided 12 by 2 first, then added, in the wrong order." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Pattern: 3, 12, 48, 192, … (rule ×4). Find the 5th term.",
    options: [
        { text: "768", correct: true, feedback: "192×4 = 768." },
        { text: "576", correct: false, feedback: "Not correct — try the next one." },
        { text: "700", correct: false, feedback: "Not correct — try the next one." },
        { text: "800", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 12. Rule: divide by 2, then subtract 1. Find the input.",
    options: [
        { text: "26", correct: true, feedback: "Reverse: (12+1)×2 = 26." },
        { text: "24", correct: false, feedback: "Not correct — try the next one." },
        { text: "22", correct: false, feedback: "Not correct — try the next one." },
        { text: "28", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x \\div 5 + 2 = 6 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Subtract 2 → x/5=4; ×5 → x=20." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "24", correct: false, feedback: "You multiplied 6 by 4 instead of 4 by 5." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Evaluate \\( 2n + 9 \\) when \\( n = 3 \\).",
    options: [
        { text: "15", correct: true, feedback: "2×3+9=6+9=15." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." },
        { text: "21", correct: false, feedback: "You used n=6 by mistake." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence follows the rule ×3−1. The 3rd term is 14. Find the 1st term.",
    options: [
        { text: "2", correct: true, feedback: "Reverse: 3rd=14, 2nd=(14+1)/3=5, 1st=(5+1)/3=2." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." },
        { text: "5", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Twice a number, minus 5, equals 15. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "2n − 5 = 15 → 2n = 20 → n = 10." },
        { text: "5", correct: false, feedback: "Not correct — try the next one." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." },
        { text: "15", correct: false, feedback: "You gave the right-hand side of the equation." }
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
    title: "Patterns & Algebra — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Two-step rules, function machines, and equations, plus expression evaluation and two-step word problems.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Multi‑Step Algebra</strong><br>\n        • Patterns: identify two‑step rules (like ×2+1 or ×3−4) and apply them to find terms.<br>\n        • Function machines: follow the order of operations. To reverse, undo steps in reverse order.<br>\n        • Equations: solve two‑step equations by undoing addition/subtraction first, then multiplication/division.<br>\n        • Expressions: translate phrases carefully — \"twice a number plus 5\" means 2n+5.<br>\n        • Sequences: apply a two‑step rule repeatedly; to work backwards, use inverse operations.<br>\n        • Word problems: write a two‑step equation, then solve it.",
    timedSeconds: 0
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

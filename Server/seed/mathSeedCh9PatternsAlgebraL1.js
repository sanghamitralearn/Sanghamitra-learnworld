// seed/mathSeedCh9PatternsAlgebraL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 9
// (Patterns & Algebra), Level 1 — converted from the standalone HTML file
// ch-9-patterns-algebra-level-1.html.
//
// Run with: node seed/mathSeedCh9PatternsAlgebraL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-9-patterns-algebra";
const CHAPTER_NAME = "Patterns & Algebra";
const LEVEL = 1;

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
    question: "Extend the pattern: 5, 10, 15, 20, ___",
    options: [
        { text: "25", correct: true, feedback: "Each term increases by 5. 20 + 5 = 25." },
        { text: "24", correct: false, feedback: "You added 4 instead of 5." },
        { text: "30", correct: false, feedback: "You added 10." },
        { text: "20", correct: false, feedback: "No change." }
      ],
    retryHint: "Look at the difference between consecutive terms. It's always the same."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: add 5. Input = 3. What is the output?",
    options: [
        { text: "8", correct: true, feedback: "3 + 5 = 8." },
        { text: "2", correct: false, feedback: "You subtracted 5." },
        { text: "15", correct: false, feedback: "You multiplied by 5." },
        { text: "3", correct: false, feedback: "No operation performed." }
      ],
    retryHint: "Apply the rule: take the input and add 5."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x + 7 = 12 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 7 from both sides: 12 − 7 = 5." },
        { text: "19", correct: false, feedback: "You added instead of subtracted." },
        { text: "6", correct: false, feedback: "Incorrect subtraction." },
        { text: "7", correct: false, feedback: "You only subtracted from the right side." }
      ],
    retryHint: "To undo adding 7, subtract 7 from both sides."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '4 more than \\( y \\)' as an algebraic expression.",
    options: [
        { text: "\\( y + 4 \\)", correct: true, feedback: "More than means add. So it's y + 4." },
        { text: "\\( 4y \\)", correct: false, feedback: "That means 4 times y." },
        { text: "\\( y - 4 \\)", correct: false, feedback: "That means 4 less than y." },
        { text: "\\( 4 - y \\)", correct: false, feedback: "That means y less than 4." }
      ],
    retryHint: "'More than' means you add to the variable."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 2. Add 3 each time. Write the first three terms.",
    options: [
        { text: "2, 5, 8", correct: true, feedback: "2, 2+3=5, 5+3=8." },
        { text: "2, 5, 7", correct: false, feedback: "The last term is wrong; 5+3=8." },
        { text: "2, 6, 10", correct: false, feedback: "You added 4 each time." },
        { text: "2, 4, 6", correct: false, feedback: "You added 2 instead of 3." }
      ],
    retryHint: "Start at 2. Apply the rule: add 3 to get the next term."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number plus 8 equals 15. Write an equation and find the number.",
    options: [
        { text: "\\( n + 8 = 15; n = 7 \\)", correct: true, feedback: "Let the number be n. n + 8 = 15 → n = 7." },
        { text: "\\( n = 23 \\)", correct: false, feedback: "You added 8 and 15." },
        { text: "\\( n = 8 \\)", correct: false, feedback: "You only wrote the added number." },
        { text: "\\( n = 15 \\)", correct: false, feedback: "That's the total, not the original number." }
      ],
    retryHint: "Let the unknown be n. Write the equation, then solve."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "100, 90, 80, 70, ___ — what comes next?",
    options: [
        { text: "60", correct: true, feedback: "The pattern decreases by 10 each time. 70 − 10 = 60." },
        { text: "80", correct: false, feedback: "No change." },
        { text: "50", correct: false, feedback: "You subtracted 20 instead of 10." },
        { text: "65", correct: false, feedback: "You subtracted 5." }
      ],
    retryHint: "Find the difference between two terms. It's −10 each time."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x - 4 = 9 \\). Find \\( x \\).",
    options: [
        { text: "13", correct: true, feedback: "Add 4 to both sides: 9 + 4 = 13." },
        { text: "5", correct: false, feedback: "You subtracted 4 from 9." },
        { text: "36", correct: false, feedback: "You multiplied by 4." },
        { text: "4", correct: false, feedback: "You only gave the subtracted number." }
      ],
    retryHint: "To undo subtracting 4, add 4 to both sides."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Extend the pattern: 3, 7, 11, 15, ___",
    options: [
        { text: "19", correct: true, feedback: "The difference is +4. 15 + 4 = 19." },
        { text: "18", correct: false, feedback: "You added 3 instead of 4." },
        { text: "20", correct: false, feedback: "You added 5." },
        { text: "16", correct: false, feedback: "You only added 1." }
      ],
    backward: "Find the constant difference between terms and add it to the last term.",
    forward: "Patterns help us predict future numbers in sequences."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: multiply by 4. Input = 6. What is the output?",
    options: [
        { text: "24", correct: true, feedback: "6 × 4 = 24." },
        { text: "10", correct: false, feedback: "You added 4 instead of multiplying." },
        { text: "2", correct: false, feedback: "You divided by 3? Not correct." },
        { text: "6", correct: false, feedback: "No operation performed." }
      ],
    backward: "Apply the rule to the input number: 6 × 4.",
    forward: "Function machines are used in computer programming."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x - 6 = 14 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Add 6 to both sides: 14 + 6 = 20." },
        { text: "8", correct: false, feedback: "You subtracted 6 from 14." },
        { text: "84", correct: false, feedback: "You multiplied 14 × 6." },
        { text: "6", correct: false, feedback: "You only gave the number being subtracted." }
      ],
    backward: "To isolate x, add 6 to both sides.",
    forward: "Solving equations is like finding the missing piece of a puzzle."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '3 less than \\( p \\)' as an algebraic expression.",
    options: [
        { text: "\\( p - 3 \\)", correct: true, feedback: "Less than means subtract from the variable: p − 3." },
        { text: "\\( 3 - p \\)", correct: false, feedback: "That's 'p less than 3', the order is reversed." },
        { text: "\\( p + 3 \\)", correct: false, feedback: "That's '3 more than p'." },
        { text: "\\( 3p \\)", correct: false, feedback: "That's '3 times p'." }
      ],
    backward: "'Less than' means you subtract from the variable.",
    forward: "Translating words into symbols is a key algebra skill."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 5, add 2 each time. What is the 3rd term?",
    options: [
        { text: "9", correct: true, feedback: "5 (1st), 7 (2nd), 9 (3rd)." },
        { text: "7", correct: false, feedback: "That's the 2nd term." },
        { text: "11", correct: false, feedback: "You added 2 twice incorrectly." },
        { text: "5", correct: false, feedback: "That's the 1st term." }
      ],
    backward: "List the terms step‑by‑step: 5, 5+2=7, 7+2=9.",
    forward: "Sequences are everywhere — from music rhythms to nature."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Ravi had some marbles. He bought 5 more and now has 12. Write an equation and find how many he had at first.",
    options: [
        { text: "\\( m + 5 = 12; m = 7 \\)", correct: true, feedback: "Let original = m. m + 5 = 12 → m = 7." },
        { text: "\\( m = 17 \\)", correct: false, feedback: "You added 12 + 5." },
        { text: "\\( m = 5 \\)", correct: false, feedback: "You only gave the bought amount." },
        { text: "\\( m = 12 \\)", correct: false, feedback: "You gave the final amount." }
      ],
    backward: "Let the unknown be m. Use the given information to write an equation.",
    forward: "Real‑life problems can be solved with algebra."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Find the missing term: 2, ___, 8, 11, 14",
    options: [
        { text: "5", correct: true, feedback: "The difference is +3. 2 + 3 = 5." },
        { text: "4", correct: false, feedback: "You added 2 instead of 3." },
        { text: "6", correct: false, feedback: "You added 4." },
        { text: "10", correct: false, feedback: "You used the 3rd term." }
      ],
    backward: "Look at the known terms to find the constant difference.",
    forward: "Filling gaps in patterns sharpens observation."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: subtract 3. Input = 15. What is the output?",
    options: [
        { text: "12", correct: true, feedback: "15 − 3 = 12." },
        { text: "18", correct: false, feedback: "You added 3 instead of subtracting." },
        { text: "5", correct: false, feedback: "You divided by 3." },
        { text: "3", correct: false, feedback: "You gave the subtracted amount." }
      ],
    backward: "Apply the rule: take the input and subtract 3.",
    forward: "Function machines can use any operation."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "\\( 7 \\times x = 42 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "Divide both sides by 7: 42 ÷ 7 = 6." },
        { text: "49", correct: false, feedback: "You added 7 to 42." },
        { text: "35", correct: false, feedback: "You subtracted 7 from 42." },
        { text: "7", correct: false, feedback: "You gave the multiplier." }
      ],
    backward: "Divide both sides by 7 to isolate x.",
    forward: "Multiplication equations are the reverse of division."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'the product of 6 and \\( k \\)' as an expression.",
    options: [
        { text: "\\( 6k \\)", correct: true, feedback: "Product means multiply: 6 × k, written as 6k." },
        { text: "\\( 6 + k \\)", correct: false, feedback: "That's the sum, not product." },
        { text: "\\( 6 - k \\)", correct: false, feedback: "That's the difference." },
        { text: "\\( k \\div 6 \\)", correct: false, feedback: "That's the quotient." }
      ],
    backward: "Product means multiply.",
    forward: "Algebraic expressions are a shorthand for repeated calculations."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 10, subtract 3 each time. What is the 4th term?",
    options: [
        { text: "1", correct: true, feedback: "10, 7, 4, 1." },
        { text: "13", correct: false, feedback: "You added 3 instead of subtracting." },
        { text: "7", correct: false, feedback: "That's the 2nd term." },
        { text: "4", correct: false, feedback: "That's the 3rd term." }
      ],
    backward: "Repeatedly apply the rule: 10 → 7 → 4 → 1.",
    forward: "Decreasing sequences model things like countdowns."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A pizza is cut into 8 slices. Sita ate some slices, and 5 slices are left. Write an equation and find how many she ate.",
    options: [
        { text: "\\( x + 5 = 8; x = 3 \\)", correct: true, feedback: "Eaten + left = total. x + 5 = 8 → x = 3." },
        { text: "\\( x = 13 \\)", correct: false, feedback: "You added 8 + 5." },
        { text: "\\( x = 5 \\)", correct: false, feedback: "That's the number left." },
        { text: "\\( x = 8 \\)", correct: false, feedback: "That's the total." }
      ],
    backward: "Total slices = eaten + left.",
    forward: "Word problems become easy when you write an equation."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "Extend the pattern: 1, 4, 9, 16, 25, ___",
    options: [
        { text: "36", correct: true, feedback: "These are square numbers: 1²,2²,3²,4²,5² → next is 6² = 36." },
        { text: "30", correct: false, feedback: "You added 5 to 25, but the pattern is squares." },
        { text: "35", correct: false, feedback: "Not a square number." },
        { text: "49", correct: false, feedback: "That's 7², skipping 6²." }
      ],
    backward: "These are square numbers: 1², 2², 3², …",
    forward: "Square numbers appear in area calculations."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: divide by 5. Input = 45. What is the output?",
    options: [
        { text: "9", correct: true, feedback: "45 ÷ 5 = 9." },
        { text: "50", correct: false, feedback: "You added 5." },
        { text: "40", correct: false, feedback: "You subtracted 5." },
        { text: "5", correct: false, feedback: "You gave the divisor." }
      ],
    backward: "Divide the input by 5.",
    forward: "Division function machines model sharing equally."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "\\( x \\div 4 = 7 \\). Find \\( x \\).",
    options: [
        { text: "28", correct: true, feedback: "Multiply both sides by 4: 7 × 4 = 28." },
        { text: "3", correct: false, feedback: "You subtracted 4 from 7." },
        { text: "11", correct: false, feedback: "You added 4 to 7." },
        { text: "7", correct: false, feedback: "You gave the right‑hand side." }
      ],
    backward: "Multiply both sides by 4 to undo the division.",
    forward: "Division equations are solved by multiplying."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'twice a number \\( n \\)' as an expression.",
    options: [
        { text: "\\( 2n \\)", correct: true, feedback: "Twice means 2 times: 2 × n = 2n." },
        { text: "\\( n + 2 \\)", correct: false, feedback: "That's '2 more than n'." },
        { text: "\\( n^2 \\)", correct: false, feedback: "That's 'n squared'." },
        { text: "\\( n \\div 2 \\)", correct: false, feedback: "That's 'half of n'." }
      ],
    backward: "Twice means 2 times.",
    forward: "Expressions like 2n are used in formulas."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 1, multiply by 2 each time. Write the first three terms.",
    options: [
        { text: "1, 2, 4", correct: true, feedback: "1, 1×2=2, 2×2=4." },
        { text: "1, 3, 5", correct: false, feedback: "You added 2 each time." },
        { text: "1, 2, 6", correct: false, feedback: "You multiplied by 3 at the last step." },
        { text: "1, 4, 8", correct: false, feedback: "You multiplied by 4 and then by 2." }
      ],
    backward: "Apply the rule to each term to get the next: 1 → 2 → 4.",
    forward: "Multiplicative sequences grow quickly — think of bacteria or compound interest."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A shopkeeper had 20 pens. He sold some and now has 8 left. Write an equation and find how many he sold.",
    options: [
        { text: "\\( 20 - s = 8; s = 12 \\)", correct: true, feedback: "Original − sold = left. 20 − s = 8 → s = 12." },
        { text: "\\( s = 28 \\)", correct: false, feedback: "You added 20 + 8." },
        { text: "\\( s = 8 \\)", correct: false, feedback: "That's the number left." },
        { text: "\\( s = 20 \\)", correct: false, feedback: "That's the original amount." }
      ],
    backward: "Total − sold = left.",
    forward: "Thinking algebraically helps solve everyday problems."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "50, 45, 40, 35, ___ — what comes next?",
    options: [
        { text: "30", correct: true, feedback: "The pattern decreases by 5 each time. 35 − 5 = 30." },
        { text: "40", correct: false, feedback: "No change." },
        { text: "25", correct: false, feedback: "You subtracted 10." },
        { text: "35", correct: false, feedback: "You gave the last term." }
      ],
    backward: "The constant difference is −5.",
    forward: "Patterns can increase or decrease."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: add 7. Input = 9. What is the output?",
    options: [
        { text: "16", correct: true, feedback: "9 + 7 = 16." },
        { text: "2", correct: false, feedback: "You subtracted 7." },
        { text: "63", correct: false, feedback: "You multiplied by 7." },
        { text: "9", correct: false, feedback: "No operation." }
      ],
    backward: "Simply add 7 to the input.",
    forward: "Function machines help understand operations."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "\\( 8 + x = 20 \\). Find \\( x \\).",
    options: [
        { text: "12", correct: true, feedback: "Subtract 8 from both sides: 20 − 8 = 12." },
        { text: "28", correct: false, feedback: "You added 8 + 20." },
        { text: "8", correct: false, feedback: "You gave the known number." },
        { text: "20", correct: false, feedback: "You gave the total." }
      ],
    backward: "Subtract 8 from both sides.",
    forward: "Equations with addition are solved by subtraction."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '5 less than \\( y \\)' as an expression.",
    options: [
        { text: "\\( y - 5 \\)", correct: true, feedback: "Less than means subtract from the variable: y − 5." },
        { text: "\\( 5 - y \\)", correct: false, feedback: "That's 'y less than 5'." },
        { text: "\\( y + 5 \\)", correct: false, feedback: "That's '5 more than y'." },
        { text: "\\( 5y \\)", correct: false, feedback: "That's '5 times y'." }
      ],
    backward: "Phrasing matters — '5 less than y' is not the same as '5 minus y'.",
    forward: "Correct translation is essential for solving word problems."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 6, add 4 each time. What is the 5th term?",
    options: [
        { text: "22", correct: true, feedback: "6 (1st), 10, 14, 18, 22 (5th)." },
        { text: "20", correct: false, feedback: "You missed one add." },
        { text: "24", correct: false, feedback: "You added 4 too many." },
        { text: "18", correct: false, feedback: "That's the 4th term." }
      ],
    backward: "List all terms to the 5th: 6, 10, 14, 18, 22.",
    forward: "Sequences are predictable once you know the rule."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A book costs ₹x. Two such books cost ₹50. Write an equation and find x.",
    options: [
        { text: "\\( 2x = 50; x = 25 \\)", correct: true, feedback: "Two books cost twice the price: 2x = 50 → x = 25." },
        { text: "\\( x = 50 \\)", correct: false, feedback: "That's the total for two books." },
        { text: "\\( x = 100 \\)", correct: false, feedback: "You doubled 50." },
        { text: "\\( x = 2 \\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Two books → 2 times the price = total cost.",
    forward: "Algebra lets you solve shopping problems quickly."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "2, 4, 6, 8, ___ — extend the pattern.",
    options: [
        { text: "10", correct: true, feedback: "Add 2 each time." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "16", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: multiply by 3. Input = 7. Output?",
    options: [
        { text: "21", correct: true, feedback: "7 × 3 = 21." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "7", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( x - 9 = 11 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "11 + 9 = 20." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." },
        { text: "11", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write '7 more than \\( t \\)' as an expression.",
    options: [
        { text: "\\( t + 7 \\)", correct: true, feedback: "More than means add." },
        { text: "\\( 7t \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( t - 7 \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( 7 - t \\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 3, add 5 each time. What is the 4th term?",
    options: [
        { text: "18", correct: true, feedback: "3, 8, 13, 18." },
        { text: "15", correct: false, feedback: "Not correct — try the next one." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." },
        { text: "23", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "\\( 3n = 21 \\). Find \\( n \\).",
    options: [
        { text: "7", correct: true, feedback: "21 ÷ 3 = 7." },
        { text: "24", correct: false, feedback: "Not correct — try the next one." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "21, 18, 15, 12, ___ — next term?",
    options: [
        { text: "9", correct: true, feedback: "Subtract 3 each time." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "15", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Rule: subtract 4. Input = 20. Output?",
    options: [
        { text: "16", correct: true, feedback: "20 − 4 = 16." },
        { text: "24", correct: false, feedback: "Not correct — try the next one." },
        { text: "5", correct: false, feedback: "Not correct — try the next one." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "\\( x \\div 3 = 6 \\). Find \\( x \\).",
    options: [
        { text: "18", correct: true, feedback: "6 × 3 = 18." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Write 'the quotient of \\( m \\) and 5' as an expression.",
    options: [
        { text: "\\( m \\div 5 \\)", correct: true, feedback: "Quotient means divide." },
        { text: "\\( 5m \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( m - 5 \\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\( 5 \\div m \\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 1, double each time. What is the 3rd term?",
    options: [
        { text: "4", correct: true, feedback: "1, 2, 4." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Some oranges plus 4 more equals 12. How many oranges at first?",
    options: [
        { text: "8", correct: true, feedback: "x + 4 = 12 → x = 8." },
        { text: "16", correct: false, feedback: "Not correct — try the next one." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Patterns & Algebra — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Single-step facts across patterns, function machines, one-step equations, expressions, sequences, and word problems.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review</strong><br>\n        • Patterns: find the constant difference between terms and extend the sequence.<br>\n        • Function machines: apply a one‑step rule (add, subtract, multiply, divide) to an input number.<br>\n        • Equations: solve one‑step equations by doing the inverse operation on both sides.<br>\n        • Expressions: translate words into algebra — \"more than\" means add, \"less than\" means subtract, \"product\" means multiply.<br>\n        • Sequences: generate terms by following a given rule from a starting number.<br>\n        • Word problems: write a simple equation to represent the problem and find the unknown.",
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

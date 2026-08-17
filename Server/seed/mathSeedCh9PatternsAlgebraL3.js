// seed/mathSeedCh9PatternsAlgebraL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 9
// (Patterns & Algebra), Level 3 — converted from the standalone HTML file
// ch-9-patterns-algebra-level-3.html.
//
// Run with: node seed/mathSeedCh9PatternsAlgebraL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-9-patterns-algebra";
const CHAPTER_NAME = "Patterns & Algebra";
const LEVEL = 3;

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
    question: "The pattern 4, 9, 19, 39, … follows the rule ×2+1. Find the 7th term.",
    options: [
        { text: "319", correct: true, feedback: "4→9→19→39→79→159→319." },
        { text: "159", correct: false, feedback: "That's the 6th term." },
        { text: "79", correct: false, feedback: "That's the 5th term." },
        { text: "320", correct: false, feedback: "Close, but check the final step." }
      ],
    retryHint: "Apply the rule repeatedly: start at 4, keep doing ×2+1 until you reach the 7th term."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 28. Rule: multiply by 4, then subtract 8. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: 28+8=36; 36÷4=9." },
        { text: "120", correct: false, feedback: "You did 28×4+8 — wrong reversal order." },
        { text: "6", correct: false, feedback: "Incorrect reversal." },
        { text: "12", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Undo the operations in reverse order: first add 8, then divide by 4."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 4(x - 3) = 20 \\). Find \\( x \\).",
    options: [
        { text: "8", correct: true, feedback: "Divide by 4 → x−3=5 → x=8." },
        { text: "2", correct: false, feedback: "Incorrect." },
        { text: "23", correct: false, feedback: "You added 3 to 20? 4x−12=20 → 4x=32 → x=8." },
        { text: "5", correct: false, feedback: "That's x−3, not x." }
      ],
    retryHint: "Divide both sides by 4 first, then add 3."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Evaluate \\( 2n^2 + 3n - 5 \\) when \\( n = 4 \\).",
    options: [
        { text: "39", correct: true, feedback: "2×16 + 12 − 5 = 32+12−5 = 39." },
        { text: "35", correct: false, feedback: "You forgot the +3n term." },
        { text: "45", correct: false, feedback: "You added instead of subtracted 5? No." },
        { text: "27", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Substitute n=4: compute 4²=16, then 2×16=32, 3×4=12. Then 32+12−5."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence follows the rule ×2+3. The 4th term is 61. Find the 2nd term.",
    options: [
        { text: "13", correct: true, feedback: "Reverse: 3rd=(61−3)÷2=29; 2nd=(29−3)÷2=13." },
        { text: "29", correct: false, feedback: "That's the 3rd term." },
        { text: "15", correct: false, feedback: "Incorrect reverse calculation." },
        { text: "11", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Work backwards: subtract 3, then divide by 2. Do this twice."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A pen costs ₹8 more than a pencil. Two pens and three pencils cost ₹41. Find the cost of one pencil.",
    options: [
        { text: "₹5", correct: true, feedback: "Pencil = p. Pen = p+8. 2(p+8)+3p=41 → 5p+16=41 → p=5." },
        { text: "₹8", correct: false, feedback: "That's the difference in price." },
        { text: "₹13", correct: false, feedback: "That's the price of a pen (5+8)." },
        { text: "₹10", correct: false, feedback: "Incorrect solving." }
      ],
    retryHint: "Let pencil = p. Write the cost of a pen. Set up total cost equation and solve."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The pattern 2, 6, 12, 20, 30, … has the rule n(n+1). Find the 8th term.",
    options: [
        { text: "72", correct: true, feedback: "8×(8+1) = 8×9 = 72." },
        { text: "56", correct: false, feedback: "That's 7×8, the 7th term." },
        { text: "90", correct: false, feedback: "That's 9×10, the 9th term." },
        { text: "42", correct: false, feedback: "That's 6×7." }
      ],
    retryHint: "The nth term is n(n+1). Substitute n=8."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Machine A: add 5. Machine B: multiply by 3. Input to A is 4. Output of A goes to B. Find the final output.",
    options: [
        { text: "27", correct: true, feedback: "4 → A → 9 → B → 27." },
        { text: "17", correct: false, feedback: "You added 5 to 12? Not correct." },
        { text: "12", correct: false, feedback: "You only multiplied 4 by 3, ignoring Machine A." },
        { text: "45", correct: false, feedback: "You did 4×3=12 then +5? Order matters — it's A then B." }
      ],
    retryHint: "First apply Machine A to the input, then feed the result into Machine B."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "A pattern starts at 1 and follows the rule ×3 − 1. Find the difference between the 5th term and the 3rd term.",
    options: [
        { text: "36", correct: true, feedback: "t1=1, t2=2, t3=5, t4=14, t5=41. 41−5 = 36." },
        { text: "30", correct: false, feedback: "Incorrect difference." },
        { text: "40", correct: false, feedback: "Close, but check 41−5." },
        { text: "14", correct: false, feedback: "That's the 4th term only." }
      ],
    backward: "Compute each term step‑by‑step, then subtract.",
    forward: "Comparing terms helps understand how quickly a sequence grows."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 15. Rule: add 7, then divide by 2. Find the input.",
    options: [
        { text: "23", correct: true, feedback: "Reverse: 15×2=30; 30−7=23." },
        { text: "37", correct: false, feedback: "You did 15×2+7=37 — wrong order." },
        { text: "8", correct: false, feedback: "Incorrect." },
        { text: "16", correct: false, feedback: "Incorrect." }
      ],
    backward: "Undo in reverse order: multiply by 2 first, then subtract 7.",
    forward: "Reversing functions is the same logic as solving equations."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 2(x + 5) = 32 \\). Find \\( x \\).",
    options: [
        { text: "11", correct: true, feedback: "Divide by 2 → x+5=16 → x=11." },
        { text: "27", correct: false, feedback: "You added 5 to 32? No." },
        { text: "21", correct: false, feedback: "Incorrect." },
        { text: "16", correct: false, feedback: "That's x+5, not x." }
      ],
    backward: "Divide both sides by 2 first, or expand the bracket.",
    forward: "Equations with brackets appear in many geometric formulas."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "A rectangle has length \\( 2x+1 \\) and width \\( x+3 \\). Find its perimeter when \\( x = 4 \\).",
    options: [
        { text: "32", correct: true, feedback: "Perimeter = 2[(2x+1)+(x+3)] = 2(3x+4) = 6x+8. At x=4 → 32." },
        { text: "24", correct: false, feedback: "You only summed the expressions without doubling." },
        { text: "40", correct: false, feedback: "Incorrect substitution." },
        { text: "28", correct: false, feedback: "Incorrect." }
      ],
    backward: "Write the perimeter formula, substitute, and simplify.",
    forward: "Algebraic expressions for perimeter are used in design."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "The 3rd term of a sequence is 25. The rule is ×3 − 5. Find the 1st term.",
    options: [
        { text: "5", correct: true, feedback: "2nd = (25+5)÷3 = 10; 1st = (10+5)÷3 = 5." },
        { text: "10", correct: false, feedback: "That's the 2nd term." },
        { text: "15", correct: false, feedback: "Incorrect reverse." },
        { text: "20", correct: false, feedback: "Incorrect." }
      ],
    backward: "Reverse the rule step‑by‑step.",
    forward: "Working backwards builds inverse‑thinking skills."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number multiplied by 3, plus 7, equals the number multiplied by 5, minus 3. Find the number.",
    options: [
        { text: "5", correct: true, feedback: "3n+7 = 5n−3 → 10 = 2n → n = 5." },
        { text: "10", correct: false, feedback: "Incorrect solving." },
        { text: "2", correct: false, feedback: "Incorrect." },
        { text: "8", correct: false, feedback: "Incorrect." }
      ],
    backward: "Collect like terms on each side.",
    forward: "Many real‑world situations lead to equations with variables on both sides."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The nth term of a pattern is \\( 2n^2 + 1 \\). Find the 5th term.",
    options: [
        { text: "51", correct: true, feedback: "2×25 + 1 = 51." },
        { text: "26", correct: false, feedback: "You used 5²=25 but forgot to multiply by 2." },
        { text: "41", correct: false, feedback: "Incorrect." },
        { text: "61", correct: false, feedback: "Incorrect." }
      ],
    backward: "Substitute n=5 into the formula.",
    forward: "Using formulas is faster than building the whole sequence."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 30. Rule: add 6, then multiply by 2. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: 30÷2=15; 15−6=9." },
        { text: "12", correct: false, feedback: "Incorrect reversal order." },
        { text: "18", correct: false, feedback: "Incorrect." },
        { text: "24", correct: false, feedback: "Incorrect." }
      ],
    backward: "Undo in reverse order: divide by 2 first, then subtract 6.",
    forward: "Understanding reverse operations is key to solving equations."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( \\frac{5x}{2} - 3 = 7 \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "Add 3 → 5x/2=10; ×2 → 5x=20; x=4." },
        { text: "2", correct: false, feedback: "Incorrect." },
        { text: "10", correct: false, feedback: "You only did the first step." },
        { text: "5", correct: false, feedback: "Incorrect." }
      ],
    backward: "Clear the fraction by multiplying both sides by 2, but only after isolating the fraction term.",
    forward: "Fraction equations model many real‑life sharing problems."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "The cost of hiring a bike is ₹50 plus ₹15 per hour. Find the total cost for 3 hours.",
    options: [
        { text: "₹95", correct: true, feedback: "Expression: 50+15h. At h=3 → 50+45 = 95." },
        { text: "₹65", correct: false, feedback: "You only used the hourly cost (15×3) and forgot the fixed fee." },
        { text: "₹105", correct: false, feedback: "Incorrect." },
        { text: "₹80", correct: false, feedback: "Incorrect." }
      ],
    backward: "Write the expression, then substitute.",
    forward: "Linear expressions model many service costs."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence follows the rule ×2+1. The 2nd term is 7. Find the 5th term.",
    options: [
        { text: "63", correct: true, feedback: "1st = (7−1)÷2 = 3. Then 3→7→15→31→63." },
        { text: "31", correct: false, feedback: "That's the 4th term." },
        { text: "15", correct: false, feedback: "That's the 3rd term." },
        { text: "127", correct: false, feedback: "That would be the 6th term." }
      ],
    backward: "First find the 1st term by reversing the rule, then build forward.",
    forward: "Sequences can be explored from any starting point."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A father is 3 times as old as his son. In 10 years, he will be twice as old. Find the son's current age.",
    options: [
        { text: "10", correct: true, feedback: "Son = s. Father = 3s. 3s+10 = 2(s+10) → s=10." },
        { text: "5", correct: false, feedback: "Then father 15, in 10 years 25 and 15 — not twice." },
        { text: "15", correct: false, feedback: "Incorrect." },
        { text: "20", correct: false, feedback: "Incorrect." }
      ],
    backward: "Set up expressions for their ages now and in the future, then form an equation.",
    forward: "Age problems are classic algebra puzzles."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The pattern 1, 3, 6, 10, … shows triangular numbers. Find the 7th term.",
    options: [
        { text: "28", correct: true, feedback: "7×8÷2 = 28." },
        { text: "21", correct: false, feedback: "That's the 6th term (6×7÷2)." },
        { text: "36", correct: false, feedback: "That's the 8th term." },
        { text: "15", correct: false, feedback: "That's the 5th term." }
      ],
    backward: "The nth triangular number = n(n+1)/2.",
    forward: "Triangular numbers appear in arrangements of objects."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Machine P: add 3. Machine Q: multiply by 4. The output of Q is 36. Find the input to P.",
    options: [
        { text: "6", correct: true, feedback: "Output of P = 36÷4 = 9. Input to P = 9−3 = 6." },
        { text: "9", correct: false, feedback: "That's the output of P, not the input." },
        { text: "33", correct: false, feedback: "Incorrect reversal." },
        { text: "12", correct: false, feedback: "Incorrect." }
      ],
    backward: "Work backwards through the machines in reverse order.",
    forward: "Chained functions are used in computer programming."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 4(x - 2) = 3(x + 1) \\). Find \\( x \\).",
    options: [
        { text: "11", correct: true, feedback: "4x−8 = 3x+3 → x = 11." },
        { text: "5", correct: false, feedback: "Incorrect expansion." },
        { text: "1", correct: false, feedback: "Incorrect." },
        { text: "7", correct: false, feedback: "Incorrect." }
      ],
    backward: "Expand the brackets, then collect like terms.",
    forward: "Equations with variables on both sides are the gateway to advanced algebra."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Area of a trapezium = \\( \\frac{1}{2} \\times (a+b) \\times h \\). Find the area when \\( a=6 \\), \\( b=10 \\), \\( h=4 \\).",
    options: [
        { text: "32", correct: true, feedback: "½ × 16 × 4 = 32." },
        { text: "64", correct: false, feedback: "You forgot to halve." },
        { text: "16", correct: false, feedback: "You only did 6+10." },
        { text: "24", correct: false, feedback: "Incorrect." }
      ],
    backward: "Substitute the values into the formula and simplify.",
    forward: "Formulas are used everywhere in geometry and science."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 2. Rule: square the previous term, then subtract 1. Find the 3rd term.",
    options: [
        { text: "8", correct: true, feedback: "t1=2, t2=2²−1=3, t3=3²−1=8." },
        { text: "3", correct: false, feedback: "That's the 2nd term." },
        { text: "15", correct: false, feedback: "Incorrect squaring." },
        { text: "7", correct: false, feedback: "Incorrect rule applied." }
      ],
    backward: "Apply the rule exactly as stated: square first, then subtract.",
    forward: "Recursive sequences can grow very fast."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "The sum of three consecutive numbers is 72. Find the middle number.",
    options: [
        { text: "24", correct: true, feedback: "(n−1)+n+(n+1)=3n=72 → n=24." },
        { text: "23", correct: false, feedback: "That's the smallest number." },
        { text: "25", correct: false, feedback: "That's the largest number." },
        { text: "72", correct: false, feedback: "That's the sum, not the number." }
      ],
    backward: "Let the middle number be n; the others are n−1 and n+1.",
    forward: "Consecutive number problems appear in many puzzles."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "First two terms: 3 and 4. Rule: multiply the last term by 2, then subtract the term before it. Find the 5th term.",
    options: [
        { text: "7", correct: true, feedback: "3,4 → 2×4−3=5 → 2×5−4=6 → 2×6−5=7." },
        { text: "8", correct: false, feedback: "Incorrect rule application." },
        { text: "10", correct: false, feedback: "Incorrect." },
        { text: "5", correct: false, feedback: "That's the 3rd term." }
      ],
    backward: "Build the sequence step‑by‑step using the two previous terms.",
    forward: "Some sequences depend on more than one previous term."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 35. Rule: square the input, then add 10. Find the positive input.",
    options: [
        { text: "5", correct: true, feedback: "x²+10=35 → x²=25 → x=5 (positive)." },
        { text: "25", correct: false, feedback: "That's x², not x." },
        { text: "45", correct: false, feedback: "You added 10 to 35." },
        { text: "15", correct: false, feedback: "Incorrect." }
      ],
    backward: "Subtract 10, then find the square root.",
    forward: "Inverse operations include square roots."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 2(3x - 1) = 4x + 10 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "6x−2 = 4x+10 → 2x=12 → x=6." },
        { text: "4", correct: false, feedback: "Incorrect expansion." },
        { text: "8", correct: false, feedback: "Incorrect." },
        { text: "12", correct: false, feedback: "Incorrect." }
      ],
    backward: "Expand the left side, then bring variable terms to one side.",
    forward: "Mastering these equations prepares you for high school algebra."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Notebooks cost ₹30 each; pens cost ₹15 each. Write an expression for the total cost of \\( n \\) notebooks and 1 pen. Then find the cost when \\( n=4 \\).",
    options: [
        { text: "₹135", correct: true, feedback: "Expression: 30n+15. At n=4 → 120+15 = 135." },
        { text: "₹120", correct: false, feedback: "You only calculated the notebooks." },
        { text: "₹150", correct: false, feedback: "Incorrect expression." },
        { text: "₹105", correct: false, feedback: "Incorrect." }
      ],
    backward: "Total = (cost per notebook × number) + cost of pen.",
    forward: "Writing expressions is the first step to building mathematical models."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 5. Rule: ×2 − 3. Find the sum of the first 4 terms.",
    options: [
        { text: "42", correct: true, feedback: "5,7,11,19 → sum = 42." },
        { text: "19", correct: false, feedback: "That's just the 4th term." },
        { text: "26", correct: false, feedback: "Sum of 5+7+11+? incorrect." },
        { text: "50", correct: false, feedback: "Incorrect." }
      ],
    backward: "List the terms, then add them.",
    forward: "Summing sequences is used in financial and scientific calculations."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Half a number plus 3 equals the number minus 1. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "x/2 + 3 = x−1 → ×2 → x+6 = 2x−2 → x=8." },
        { text: "4", correct: false, feedback: "Incorrect solving." },
        { text: "6", correct: false, feedback: "Incorrect." },
        { text: "10", correct: false, feedback: "Incorrect." }
      ],
    backward: "Clear the fraction by multiplying every term by 2.",
    forward: "Equations with fractions are common in physics and engineering."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The nth term of a sequence is \\( n^2 + n \\). Find the 6th term.",
    options: [
        { text: "42", correct: true, feedback: "6²+6 = 36+6 = 42." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "56", correct: false, feedback: "Not correct — try the next one." },
        { text: "48", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Output = 18. Rule: multiply by 3, then add 6. Find the input.",
    options: [
        { text: "4", correct: true, feedback: "Reverse: (18−6)÷3 = 4." },
        { text: "60", correct: false, feedback: "Not correct — try the next one." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 3(x+2) = 2(x+5) \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "3x+6 = 2x+10 → x=4." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." },
        { text: "16", correct: false, feedback: "Not correct — try the next one." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "Evaluate \\( 4n^2 - 3n + 2 \\) for \\( n = 3 \\).",
    options: [
        { text: "29", correct: true, feedback: "4×9 − 9 + 2 = 36−9+2 = 29." },
        { text: "35", correct: false, feedback: "Not correct — try the next one." },
        { text: "23", correct: false, feedback: "Not correct — try the next one." },
        { text: "41", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence follows the rule ×3−4. The 2nd term is 5. Find the 4th term.",
    options: [
        { text: "29", correct: true, feedback: "1st = (5+4)÷3 = 3. 3rd = 3×5−4 = 11. 4th = 3×11−4 = 29." },
        { text: "11", correct: false, feedback: "That's the 3rd term, not the 4th." },
        { text: "5", correct: false, feedback: "That's the 2nd term, which was given." },
        { text: "23", correct: false, feedback: "Incorrect calculation." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A number plus 7, then the result is doubled, giving 30. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "2(n+7)=30 → n+7=15 → n=8." },
        { text: "15", correct: false, feedback: "Not correct — try the next one." },
        { text: "22", correct: false, feedback: "Not correct — try the next one." },
        { text: "11", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    question: "The pattern 2, 8, 18, 32, … has the rule \\( 2n^2 \\). Find the 6th term.",
    options: [
        { text: "72", correct: true, feedback: "2×6² = 2×36 = 72." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." },
        { text: "98", correct: false, feedback: "Not correct — try the next one." },
        { text: "60", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    question: "Machine A: subtract 2. Machine B: multiply by 5. Input to A is 7. Output of B?",
    options: [
        { text: "25", correct: true, feedback: "7→5→25." },
        { text: "33", correct: false, feedback: "Not correct — try the next one." },
        { text: "35", correct: false, feedback: "Not correct — try the next one." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    question: "Solve \\( 5x - 7 = 3x + 9 \\). Find \\( x \\).",
    options: [
        { text: "8", correct: true, feedback: "2x = 16 → x = 8." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "1", correct: false, feedback: "Not correct — try the next one." },
        { text: "16", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    question: "A taxi charges ₹20 plus ₹12 per km. Find the cost for 5 km.",
    options: [
        { text: "₹80", correct: true, feedback: "20 + 12×5 = 20+60 = 80." },
        { text: "₹60", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹40", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹100", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    question: "Start at 1. Rule: ×3 + 2. Find the sum of the first 3 terms.",
    options: [
        { text: "23", correct: true, feedback: "1, 5, 17 → sum = 23." },
        { text: "17", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "29", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Three times a number, minus 4, equals twice the number, plus 6. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "3n−4 = 2n+6 → n = 10." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "14", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Patterns & Algebra — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems: formula-based patterns, chained function machines, equations with brackets and variables on both sides, and age/consecutive-number word problems.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Synthesis Tips</strong><br>\n        • Patterns: use the given rule to find any term; compare terms by subtracting.<br>\n        • Function machines: reverse operations in exact reverse order — last operation undone first.<br>\n        • Equations: expand brackets if needed, collect like terms, isolate the variable.<br>\n        • Expressions: substitute values carefully and follow BODMAS.<br>\n        • Sequences: to work backwards, apply the inverse of each operation in reverse order.<br>\n        • Word problems: define a variable, build expressions, set up an equation, then solve.",
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

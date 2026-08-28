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
    skillId: "PATARITH-01",
    question: "2, 4, 6, 8, ___ — what comes next?",
    options: [
        { text: "10", correct: true, feedback: "Add 2 each time. 8+2 = 10." },
        { text: "12", correct: false, feedback: "You multiplied by 2 instead of adding.", misconceptionId: "E-w1-a" },
        { text: "9", correct: false, feedback: "You added 1.", misconceptionId: "E-w1-b" },
        { text: "16", correct: false, feedback: "You doubled 8.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student multiplies the last term by 2 instead of adding the common difference (2).",
        rootCause: "Operation Confused With Common Difference — mistakes the value of the common difference for a multiplier.",
        remediation: "This pattern grows by ADDING 2 each time, not multiplying — 8+2=10, not 8×2=16 or 8×2=12 (a slip in that direction)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student uses the wrong common difference (1 instead of 2), underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 4-2=2, 6-4=2, 8-6=2 — the difference is 2, not 1; so 8+2=10, not 9."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student doubles the last term instead of adding the constant common difference.",
        rootCause: "Wrong Operation Applied — multiplies the last term instead of adding the common difference.",
        remediation: "This pattern grows by ADDING 2 each time, not doubling — 8+2=10, not 8×2=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "4-2=2, 6-4=2, 8-6=2." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 2." },
      { level: 3, description: "Add the difference to the last term", hint: "8 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCADD-01",
    question: "Rule: add 4. Input = 7. What is the output?",
    options: [
        { text: "11", correct: true, feedback: "7 + 4 = 11." },
        { text: "3", correct: false, feedback: "You subtracted 4.", misconceptionId: "E-w2-a" },
        { text: "28", correct: false, feedback: "You multiplied by 4.", misconceptionId: "E-w2-b" },
        { text: "7", correct: false, feedback: "No operation.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts 4 from the input instead of adding, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — subtracts when the rule specifies addition.",
        remediation: "The rule says ADD 4, not subtract — 7+4=11, not 7-4=3."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student multiplies the input by 4 instead of adding, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies addition.",
        remediation: "The rule says ADD 4, not multiply by 4 — 7+4=11, not 7×4=28."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (add 4) to the input — the output is not the same as the input: 7+4=11, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: add 4." },
      { level: 2, description: "Identify the input", hint: "The input is 7." },
      { level: 3, description: "Apply the rule", hint: "7 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNADD-01",
    question: "Solve \\( x + 5 = 12 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "12 − 5 = 7." },
        { text: "17", correct: false, feedback: "You added 12+5.", misconceptionId: "E-w3-a" },
        { text: "6", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w3-b" },
        { text: "5", correct: false, feedback: "You gave the number being added.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student adds 12 and 5 instead of subtracting to isolate x, applying the opposite of the required inverse operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 5, you must SUBTRACT 5 (the inverse operation) — 12-5=7, not 12+5=17."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student makes an arithmetic slip in the subtraction, landing on 6 instead of the correct 7.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: 12-5=7, not 6 — double-check your subtraction."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student reports the number being subtracted (5) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "5 is the number you SUBTRACT, not the answer itself — compute 12-5=7, that's the value of x, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 5 added to it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Subtract 5 from both sides." },
      { level: 3, description: "Compute", hint: "12 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRADD-01",
    question: "Write '3 more than \\( n \\)' as an expression.",
    options: [
        { text: "\\( n + 3 \\)", correct: true, feedback: "More than means add." },
        { text: "\\( 3n \\)", correct: false, feedback: "That's 3 times n.", misconceptionId: "E-w4-a" },
        { text: "\\( n - 3 \\)", correct: false, feedback: "That's 3 less than n.", misconceptionId: "E-w4-b" },
        { text: "\\( 3 - n \\)", correct: false, feedback: "Order is wrong.", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student translates 'more than' as multiplication, writing 3n instead of the correct addition n+3.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a multiplication expression.",
        remediation: "'More than' signals ADDITION, not multiplication — '3 more than n' means n+3, not 3×n (which would be phrased as '3 times n')."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student translates 'more than' as subtraction, writing n-3 instead of the correct addition n+3.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a subtraction expression.",
        remediation: "'More than' signals ADDITION, not subtraction — '3 more than n' means n+3, not n-3 (which would be phrased as '3 less than n')."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student reverses the order AND changes the operation, writing 3-n instead of the correct n+3.",
        rootCause: "Order and Operation Both Reversed — misreads both which term comes first and which operation applies.",
        remediation: "'3 more than n' means n+3 (add 3 to n) — 3-n would mean 'n less than 3' (subtract n from 3), a completely different expression."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'More than' signals addition." },
      { level: 2, description: "Identify the variable and the added amount", hint: "The variable is n; the amount added is 3." },
      { level: 3, description: "Write the expression", hint: "n + 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQADD-01",
    question: "Start at 3, add 2 each time. What is the 3rd term?",
    options: [
        { text: "7", correct: true, feedback: "3, 5, 7. 3rd term = 7." },
        { text: "5", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-w5-a" },
        { text: "9", correct: false, feedback: "You added 2 twice? 3+2+4=9? No.", misconceptionId: "E-w5-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student stops one term early, reporting the 2nd term (5) instead of the requested 3rd term (7).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 3 is the 1st term, 5 is the 2nd term, 7 is the 3RD term — the question asks for the 3rd term (7), not the 2nd (5)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student adds inconsistent amounts across the two steps (e.g., +2 then +4) instead of applying the same rule (+2) consistently.",
        rootCause: "Rule Applied Inconsistently — uses the correct rule for some terms but not all.",
        remediation: "Apply the SAME rule (add 2) to every term consistently: 3, 3+2=5, 5+2=7 — the third term is 7, not 9 (which would come from adding an inconsistent amount)."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student makes an arithmetic slip while applying the rule, landing on 8 instead of the correct 7.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3+2=5 (2nd term), then 5+2=7 (3rd term), not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 3; add 2 each time." },
      { level: 2, description: "Find the second term", hint: "3 + 2 = 5." },
      { level: 3, description: "Find the third term", hint: "5 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMSUB-01",
    question: "A number minus 4 equals 10. Find the number.",
    options: [
        { text: "14", correct: true, feedback: "n − 4 = 10 → n = 14." },
        { text: "6", correct: false, feedback: "You subtracted 10−4.", misconceptionId: "E-w6-a" },
        { text: "10", correct: false, feedback: "You gave the right‑hand side.", misconceptionId: "E-w6-b" },
        { text: "40", correct: false, feedback: "You multiplied.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student subtracts 10-4 instead of adding to isolate n, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO subtracting 4, you must ADD 4 (the inverse operation) — 10+4=14, not 10-4=6."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student reports the right-hand side value (10) instead of solving for n.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "10 is the RESULT of n-4, not n itself — to find n, add 4: 10+4=14, not 10."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student multiplies instead of adding to isolate n, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — multiplies when the inverse of subtraction is addition.",
        remediation: "The inverse of SUBTRACTING 4 is ADDING 4, not multiplying — 10+4=14, not 10×4=40."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be n and write the equation", hint: "n - 4 = 10." },
      { level: 2, description: "Identify the inverse operation", hint: "Add 4 to both sides." },
      { level: 3, description: "Solve for n", hint: "10 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-01",
    question: "10, 20, 30, 40, ___ — next term?",
    options: [
        { text: "50", correct: true, feedback: "Add 10 each time." },
        { text: "60", correct: false, feedback: "You added 20.", misconceptionId: "E-w7-a" },
        { text: "45", correct: false, feedback: "You added 5.", misconceptionId: "E-w7-b" },
        { text: "80", correct: false, feedback: "You doubled 40.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student uses double the actual common difference (20 instead of 10), overestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 20-10=10, 30-20=10, 40-30=10 — the difference is 10, not 20; so 40+10=50, not 40+20=60."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student uses an incorrect common difference (5 instead of 10), underestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 20-10=10, 30-20=10, 40-30=10 — the difference is 10, not 5; so 40+10=50, not 40+5=45."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student doubles the last term instead of adding the constant common difference.",
        rootCause: "Wrong Operation Applied — multiplies the last term instead of adding the common difference.",
        remediation: "This pattern grows by ADDING 10 each time, not doubling — 40+10=50, not 40×2=80."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "20-10=10, 30-20=10, 40-30=10." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 10." },
      { level: 3, description: "Add the difference to the last term", hint: "40 + 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCMULT-01",
    question: "Rule: multiply by 3. Input = 6. Output?",
    options: [
        { text: "18", correct: true, feedback: "6 × 3 = 18." },
        { text: "9", correct: false, feedback: "You added 3.", misconceptionId: "E-w8-a" },
        { text: "2", correct: false, feedback: "You divided by 3.", misconceptionId: "E-w8-b" },
        { text: "6", correct: false, feedback: "No operation.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student adds 3 to the input instead of multiplying, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — adds when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 3, not add 3 — 6×3=18, not 6+3=9."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student divides the input by 3 instead of multiplying, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — divides when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 3, not divide by 3 — 6×3=18, not 6÷3=2."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (multiply by 3) to the input — the output is not the same as the input: 6×3=18, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: multiply by 3." },
      { level: 2, description: "Identify the input", hint: "The input is 6." },
      { level: 3, description: "Apply the rule", hint: "6 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "S",
    skillId: "PATARITH-01",
    question: "3, 6, 9, 12, ___ — what comes next?",
    options: [
        { text: "15", correct: true, feedback: "Add 3 each time." },
        { text: "13", correct: false, feedback: "You added 1.", misconceptionId: "E-d1-a" },
        { text: "24", correct: false, feedback: "You multiplied by 2.", misconceptionId: "E-d1-b" },
        { text: "14", correct: false, feedback: "You added 2.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student uses the wrong common difference (1 instead of 3), drastically underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 6-3=3, 9-6=3, 12-9=3 — the difference is 3, not 1; so 12+3=15, not 13."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student doubles the last term instead of adding the constant common difference.",
        rootCause: "Wrong Operation Applied — multiplies the last term instead of adding the common difference.",
        remediation: "This pattern grows by ADDING 3 each time, not doubling — 12+3=15, not 12×2=24."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student uses the wrong common difference (2 instead of 3), underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 6-3=3, 9-6=3, 12-9=3 — the difference is 3, not 2; so 12+3=15, not 14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "6-3=3, 9-6=3, 12-9=3." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 3." },
      { level: 3, description: "Add the difference to the last term", hint: "12 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "S",
    skillId: "FUNCSUB-01",
    question: "Rule: subtract 5. Input = 13. What is the output?",
    options: [
        { text: "8", correct: true, feedback: "13 − 5 = 8." },
        { text: "18", correct: false, feedback: "You added 5.", misconceptionId: "E-d2-a" },
        { text: "65", correct: false, feedback: "You multiplied by 5.", misconceptionId: "E-d2-b" },
        { text: "5", correct: false, feedback: "You gave the subtracted number.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student adds 5 to the input instead of subtracting, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 5, not add 5 — 13-5=8, not 13+5=18."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student multiplies the input by 5 instead of subtracting, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 5, not multiply by 5 — 13-5=8, not 13×5=65."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student reports the number being subtracted (5) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "5 is the number you SUBTRACT, not the answer itself — compute 13-5=8, that's the output, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: subtract 5." },
      { level: 2, description: "Identify the input", hint: "The input is 13." },
      { level: 3, description: "Apply the rule", hint: "13 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "S",
    skillId: "EQNMULT-01",
    question: "Solve \\( 4 \\times x = 24 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "24 ÷ 4 = 6." },
        { text: "28", correct: false, feedback: "You added 24+4.", misconceptionId: "E-d3-a" },
        { text: "20", correct: false, feedback: "You subtracted.", misconceptionId: "E-d3-b" },
        { text: "96", correct: false, feedback: "You multiplied 24×4.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student adds 24 and 4 instead of dividing to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 4 is DIVIDING by 4, not adding 4 — 24÷4=6, not 24+4=28."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student subtracts instead of dividing to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — subtracts when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 4 is DIVIDING by 4, not subtracting — 24÷4=6, not 24-4=20."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student multiplies 24 by 4 instead of dividing, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO multiplying by 4, you must DIVIDE by 4 (the inverse operation) — 24÷4=6, not 24×4=96."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x is multiplied by 4." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Divide both sides by 4." },
      { level: 3, description: "Compute", hint: "24 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "T",
    skillId: "EXPRSUB-01",
    question: "Write '5 less than \\( y \\)' as an expression.",
    options: [
        { text: "\\( y - 5 \\)", correct: true, feedback: "Less than means subtract from the variable." },
        { text: "\\( 5 - y \\)", correct: false, feedback: "This is 'y less than 5', the opposite order.", misconceptionId: "E-d4-a" },
        { text: "\\( y + 5 \\)", correct: false, feedback: "That's '5 more than y'.", misconceptionId: "E-d4-b" },
        { text: "\\( 5y \\)", correct: false, feedback: "That's '5 times y'.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student reverses the order of subtraction, writing 5-y instead of the correct y-5.",
        rootCause: "Subtraction Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'5 less than y' means START with y and SUBTRACT 5: y-5 — not 5-y, which would mean 'y less than 5'."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student translates 'less than' as addition, writing y+5 instead of the correct subtraction y-5.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with an addition expression.",
        remediation: "'Less than' signals SUBTRACTION, not addition — '5 less than y' means y-5, not y+5 (which would be phrased as '5 more than y')."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student translates 'less than' as multiplication, writing 5y instead of the correct subtraction y-5.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with a multiplication expression.",
        remediation: "'Less than' signals SUBTRACTION, not multiplication — '5 less than y' means y-5, not 5×y (which would be phrased as '5 times y')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Less than' signals subtraction." },
      { level: 2, description: "Identify which term comes first", hint: "'5 less than y' starts with y, then subtracts 5." },
      { level: 3, description: "Write the expression", hint: "y - 5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "C",
    skillId: "SEQTWOSTEP-01",
    question: "Start at 2. Rule: multiply by 2, then add 1. Find the 3rd term.",
    options: [
        { text: "11", correct: true, feedback: "2 → 5 → 11." },
        { text: "5", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d5-a" },
        { text: "9", correct: false, feedback: "You added 4 instead of 1? No.", misconceptionId: "E-d5-b" },
        { text: "10", correct: false, feedback: "Incorrect.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student stops one term early, reporting the 2nd term (5) instead of the requested 3rd term (11).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 2 is the 1st term, 5 is the 2nd term, 11 is the 3RD term — the question asks for the 3rd term (11), not the 2nd (5)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student applies an incorrect increment on the second step instead of the stated 'add 1', leading to a wrong 3rd term.",
        rootCause: "Two-Step Rule Applied Incorrectly — omits a step or uses the wrong operation in the second step.",
        remediation: "The rule has TWO steps applied IN ORDER: multiply by 2, THEN add 1 — 2×2+1=5, then 5×2+1=11; don't add a different amount like 4."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student makes an arithmetic slip while applying the two-step rule twice, landing on 10 instead of the correct 11.",
        rootCause: "Computation Error — correct approach, but the repeated calculation is carried out incorrectly.",
        remediation: "Recompute step by step: 2×2+1=5 (2nd term), 5×2+1=11 (3rd term), not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the rule to get the 2nd term", hint: "2×2+1 = 5." },
      { level: 2, description: "Apply the rule to the 2nd term", hint: "5×2+1 = ?" },
      { level: 3, description: "Confirm this is the 3rd term", hint: "1st=2, 2nd=5, 3rd=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "T",
    skillId: "SYMADD-01",
    question: "A number plus 6 equals 15. Find the number.",
    options: [
        { text: "9", correct: true, feedback: "x + 6 = 15 → x = 9." },
        { text: "21", correct: false, feedback: "You added 15+6.", misconceptionId: "E-d6-a" },
        { text: "90", correct: false, feedback: "You multiplied 15×6.", misconceptionId: "E-d6-b" },
        { text: "6", correct: false, feedback: "You gave the added number.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student adds 15 and 6 instead of subtracting to isolate x, applying the opposite of the required inverse operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 6, you must SUBTRACT 6 (the inverse operation) — 15-6=9, not 15+6=21."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student multiplies instead of subtracting to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — multiplies when the inverse of addition is subtraction.",
        remediation: "The inverse of ADDING 6 is SUBTRACTING 6, not multiplying — 15-6=9, not 15×6=90."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student reports the number being added (6) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "6 is the number ADDED, not the answer itself — compute 15-6=9, that's the value of x, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be x and write the equation", hint: "x + 6 = 15." },
      { level: 2, description: "Identify the inverse operation", hint: "Subtract 6 from both sides." },
      { level: 3, description: "Solve for x", hint: "15 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "C",
    skillId: "PATTWOSTEP-01",
    question: "Pattern: 1, 3, 7, 15, … (rule ×2+1). Find the 5th term.",
    options: [
        { text: "31", correct: true, feedback: "1→3→7→15→31." },
        { text: "15", correct: false, feedback: "That's the 4th term.", misconceptionId: "E-d7-a" },
        { text: "30", correct: false, feedback: "You doubled 15 but forgot +1.", misconceptionId: "E-d7-b" },
        { text: "32", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student stops one term early, reporting the 4th term (15) instead of the requested 5th term (31).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 7 is the 3rd term, 15 is the 4TH term, 31 is the 5TH term — the question asks for the 5th term (31), not the 4th (15)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student doubles the last term but forgets to add 1, applying only half of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step (double) but forgets the second (add 1).",
        remediation: "The rule is ×2 THEN +1, not just ×2 — 15×2=30 is only the first step; you must also add 1: 30+1=31, not 30."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student makes a small arithmetic slip in the final application of the rule, landing on 32 instead of the correct 31.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 15×2=30, then 30+1=31, not 32."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Verify the rule against known terms", hint: "1×2+1=3, 3×2+1=7, 7×2+1=15." },
      { level: 2, description: "Apply the rule to the last known term", hint: "15×2 = 30." },
      { level: 3, description: "Complete the second step", hint: "30 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "T",
    skillId: "FUNCREVERSE-03",
    question: "Output = 12. Rule: multiply by 3. Find the input.",
    options: [
        { text: "4", correct: true, feedback: "Reverse: 12 ÷ 3 = 4." },
        { text: "36", correct: false, feedback: "You multiplied 12×3 — wrong direction.", misconceptionId: "E-d8-a" },
        { text: "15", correct: false, feedback: "You added 3.", misconceptionId: "E-d8-b" },
        { text: "9", correct: false, feedback: "You subtracted 3.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student applies the ORIGINAL rule (multiply by 3) to the output instead of reversing it with division, going the wrong direction.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operation instead of undoing it.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using the inverse operation: DIVIDE by 3 (undoing multiply by 3) — 12÷3=4, not 12×3=36."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student adds 3 to the output instead of dividing, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 3 is DIVIDING by 3, not adding 3 — 12÷3=4, not 12+3=15."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student subtracts 3 from the output instead of dividing, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — subtracts when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 3 is DIVIDING by 3, not subtracting 3 — 12÷3=4, not 12-3=9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the forward rule", hint: "The rule multiplies the input by 3." },
      { level: 2, description: "Identify the inverse operation", hint: "To reverse multiplication, divide." },
      { level: 3, description: "Compute", hint: "12 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "C",
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 2x + 3 = 13 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "2x = 10 → x = 5." },
        { text: "8", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d9-a" },
        { text: "16", correct: false, feedback: "You added 3 to 13.", misconceptionId: "E-d9-b" },
        { text: "10", correct: false, feedback: "You only subtracted 3.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 8 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 2x+3=13, subtract 3: 2x=10, divide by 2: x=5, not 8."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student adds 3 to 13 instead of subtracting to isolate the term with x, applying the wrong operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 3, you must SUBTRACT 3 (the inverse operation) — 13-3=10, giving 2x=10, not 13+3=16."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student correctly subtracts 3 to get 2x=10 but stops there, reporting 10 instead of dividing by 2 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "2x=10 is only PART of the solution — you must ALSO divide by 2 to isolate x: 10÷2=5, not just 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 3 from both sides: 13-3=10." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 2." },
      { level: 3, description: "Compute", hint: "10 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "H",
    skillId: "EXPREVAL-01",
    question: "Evaluate \\( 3n - 2 \\) when \\( n = 5 \\).",
    options: [
        { text: "13", correct: true, feedback: "3×5 = 15; 15−2 = 13." },
        { text: "15", correct: false, feedback: "You forgot to subtract 2.", misconceptionId: "E-d10-a" },
        { text: "11", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-b" },
        { text: "17", correct: false, feedback: "You added 2.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student computes 3×5=15 but forgets to subtract 2, applying only the multiplication part of the expression.",
        rootCause: "Second Step Omitted — completes the multiplication but forgets to subtract the constant term.",
        remediation: "The expression is 3n-2, not just 3n — after computing 3×5=15, you must ALSO subtract 2: 15-2=13, not 15."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student makes an arithmetic slip while evaluating the expression, landing on 11 instead of the correct 13.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3×5=15, then 15-2=13, not 11."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student adds 2 instead of subtracting, applying the wrong operation from the expression.",
        rootCause: "Operation Reversed — adds when the expression specifies subtraction.",
        remediation: "The expression says 3n MINUS 2, not plus 2 — 15-2=13, not 15+2=17."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute n=5 into 3n", hint: "3 × 5 = 15." },
      { level: 2, description: "Apply the second operation", hint: "Subtract 2 from the result." },
      { level: 3, description: "Compute", hint: "15 - 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "H",
    skillId: "SEQTWOSTEP-01",
    question: "Sequence: 2, 5, 11, 23, … (rule ×2+1). Find the 6th term.",
    options: [
        { text: "95", correct: true, feedback: "2→5→11→23→47→95." },
        { text: "47", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-d11-a" },
        { text: "93", correct: false, feedback: "You doubled and added 1? 47×2+1=95, not 93.", misconceptionId: "E-d11-b" },
        { text: "96", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student stops one term early, reporting the 5th term (47) instead of the requested 6th term (95).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 23 is the 4th term, 47 is the 5TH term, 95 is the 6TH term — the question asks for the 6th term (95), not the 5th (47)."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student makes a small arithmetic slip while doubling and adding 1, landing on 93 instead of the correct 95.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 47×2=94, then 94+1=95, not 93."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student makes a small arithmetic slip while doubling and adding 1, landing on 96 instead of the correct 95.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 47×2=94, then 94+1=95, not 96."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "2, 5, 11, 23, 23×2+1=47." },
      { level: 2, description: "Apply the rule once more", hint: "47×2+1 = ?" },
      { level: 3, description: "Confirm this is the 6th term", hint: "1st=2, 2nd=5, 3rd=11, 4th=23, 5th=47, 6th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "C",
    skillId: "SYMTWOSTEP-01",
    question: "A taxi charges ₹50 fixed plus ₹20 per km. The total fare is ₹110. How many km?",
    options: [
        { text: "3", correct: true, feedback: "50 + 20k = 110 → 20k = 60 → k = 3." },
        { text: "5", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d12-a" },
        { text: "6", correct: false, feedback: "You divided 110 by 20? Not correct.", misconceptionId: "E-d12-b" },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 5 instead of the correct 3.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 50+20k=110, subtract 50: 20k=60, divide by 20: k=3, not 5."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student divides the total fare (110) directly by the rate (20), ignoring the ₹50 fixed fee entirely.",
        rootCause: "Fixed Fee Ignored — treats the entire fare as proportional to distance, forgetting the flat starting charge.",
        remediation: "The total fare includes a FIXED ₹50 fee PLUS the per-km charge — first subtract the fixed fee: 110-50=60, THEN divide by the rate: 60÷20=3, not 110÷20=6 (approximately, or another slip)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 2 instead of the correct 3.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 50+20k=110, subtract 50: 20k=60, divide by 20: k=3, not 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "fixed fee + rate × km = total: 50 + 20k = 110." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 50 from both sides: 20k = 60." },
      { level: 3, description: "Undo the multiplication", hint: "60 ÷ 20 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "T",
    skillId: "PATMISSING-01",
    question: "Find the missing term: 4, ___, 10, 13, 16",
    options: [
        { text: "7", correct: true, feedback: "Difference is +3. 4+3=7." },
        { text: "6", correct: false, feedback: "You added 2.", misconceptionId: "E-d13-a" },
        { text: "8", correct: false, feedback: "You added 4.", misconceptionId: "E-d13-b" },
        { text: "9", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student uses the wrong common difference (2 instead of 3), not verifying it against the known later terms.",
        rootCause: "Common Difference Miscounted — computes the difference using an incomplete or incorrect part of the sequence.",
        remediation: "Verify the difference using the KNOWN terms: 13-10=3, 16-13=3 — the difference is 3, not 2; so the missing term is 4+3=7, not 6."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student uses the wrong common difference (4 instead of 3), overestimating the gap.",
        rootCause: "Common Difference Miscounted — computes the difference using an incomplete or incorrect part of the sequence.",
        remediation: "Verify the difference using the KNOWN terms: 13-10=3, 16-13=3 — the difference is 3, not 4; so the missing term is 4+3=7, not 8."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student uses an incorrect common difference (5 instead of 3), further overestimating the gap.",
        rootCause: "Common Difference Miscounted — computes the difference using an incomplete or incorrect part of the sequence.",
        remediation: "Verify the difference using the KNOWN terms: 13-10=3, 16-13=3 — the difference is 3, not 5; so the missing term is 4+3=7, not 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference using the known later terms", hint: "13-10=3, 16-13=3." },
      { level: 2, description: "Confirm this difference applies throughout", hint: "The common difference is 3." },
      { level: 3, description: "Add the difference to the term before the gap", hint: "4 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "H",
    skillId: "FUNCREVERSE-01",
    question: "Output = 18. Rule: add 4, then multiply by 2. Find the input.",
    options: [
        { text: "5", correct: true, feedback: "Reverse: 18÷2=9; 9−4=5." },
        { text: "13", correct: false, feedback: "You did 18−4=14 then ÷2=7? No.", misconceptionId: "E-d14-a" },
        { text: "32", correct: false, feedback: "You did 18×2−4=32 — wrong reversal.", misconceptionId: "E-d14-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student reverses the two steps but applies them in the wrong order (subtract then divide, instead of divide then subtract), leading to an incorrect input.",
        rootCause: "Reversal Steps Misordered — undoes the correct operations but doesn't apply them in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'multiply by 2' by dividing by 2 (18÷2=9), THEN undo 'add 4' by SUBTRACTING 4 (9-4=5) — not subtracting before dividing."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student applies the ORIGINAL rule (add 4 then ×2) to the output instead of reversing it, leading to a drastically wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: divide by 2 (undoing multiply by 2), then subtract 4 (undoing add 4) — 18÷2=9, 9-4=5, not 18×2-4=32."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 8 instead of the correct 5.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 18÷2=9, then 9-4=5, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'multiply by 2' — undo it by dividing by 2: 18÷2=9." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'add 4' — undo it by subtracting 4." },
      { level: 3, description: "Compute", hint: "9 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    tier: "H",
    skillId: "EQNBOTHSIDES-02",
    question: "Solve \\( 3x + 2 = x + 10 \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "3x+2 = x+10 → 2x = 8 → x = 4." },
        { text: "6", correct: false, feedback: "Incorrect collecting of terms.", misconceptionId: "E-d15-a" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-b" },
        { text: "3", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student makes a sign error while moving terms across the equals sign, landing on 6 instead of the correct 4.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "Move variable terms to one side and constants to the other, keeping signs consistent: 3x-x=10-2 → 2x=8 → x=4, not 6 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports a constant from the equation (8, the value of 2x) instead of dividing to solve for x.",
        rootCause: "Final Division Step Omitted — completes the collection of like terms but fails to divide out the coefficient.",
        remediation: "2x=8 is only PART of the solution — you must ALSO divide by 2 to isolate x: 8÷2=4, not just 8."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student makes an arithmetic slip while collecting like terms, landing on 3 instead of the correct 4.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3x-x=10-2, so 2x=8, and x=8÷2=4, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Move the variable terms to one side", hint: "3x+2=x+10 → subtract x: 2x+2=10." },
      { level: 2, description: "Move the constants to the other side", hint: "Subtract 2 from both sides: 2x=8." },
      { level: 3, description: "Divide to isolate x", hint: "8 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    tier: "C",
    skillId: "EXPRFORMULA-02",
    question: "Apples cost ₹15 each. Write an expression for the cost of \\( a \\) apples, then find the cost for 6 apples.",
    options: [
        { text: "15a; ₹90", correct: true, feedback: "15×6 = 90." },
        { text: "15a; ₹21", correct: false, feedback: "You added 15+6.", misconceptionId: "E-d16-a" },
        { text: "a+15; ₹21", correct: false, feedback: "Wrong expression.", misconceptionId: "E-d16-b" },
        { text: "15+a; ₹90", correct: false, feedback: "15+a is not 15 per apple; the correct rate expression is 15a.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student has the correct expression (15a) but adds 15 and 6 instead of multiplying when evaluating at a=6.",
        rootCause: "Operation Confused During Evaluation — adds the values instead of multiplying, despite having the correct expression.",
        remediation: "15a means 15 MULTIPLIED by a, not added — at a=6: 15×6=90, not 15+6=21."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student writes the expression as a+15 (addition) instead of the correct 15a (multiplication), since each apple costs a fixed rate that scales with quantity.",
        rootCause: "Expression Mistranslated — treats a per-unit rate as a fixed amount to be added instead of multiplied by quantity.",
        remediation: "Since EACH apple costs ₹15, the total for a apples is 15 MULTIPLIED by a (15a), not 15 ADDED to a — at a=6: 15×6=90, not 6+15=21."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student writes the expression as 15+a instead of the correct 15a, confusing a per-unit rate with a fixed addition, but evaluates using multiplication.",
        rootCause: "Expression Mistranslated — treats a per-unit rate as a fixed amount added to the quantity instead of multiplied by it.",
        remediation: "Since EACH apple costs ₹15, the total for a apples is 15 MULTIPLIED by a (15a), not 15 PLUS a — while 15×6=90 is the correct value, the expression 15+a does not represent this relationship for other values of a."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the expression", hint: "cost per apple × number of apples: 15a." },
      { level: 2, description: "Substitute a=6", hint: "15 × 6." },
      { level: 3, description: "Compute", hint: "15 × 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    tier: "T",
    skillId: "SEQMULT-01",
    question: "Start at 1. Rule: multiply by 3. What is the 4th term?",
    options: [
        { text: "27", correct: true, feedback: "1, 3, 9, 27." },
        { text: "9", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d17-a" },
        { text: "81", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-d17-b" },
        { text: "18", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student stops one term early, reporting the 3rd term (9) instead of the requested 4th term (27).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 1 is the 1st term, 3 is the 2nd, 9 is the 3rd, 27 is the 4TH term — the question asks for the 4th term (27), not the 3rd (9)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student computes one term too far, reporting the 5th term (81) instead of the requested 4th term (27).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 9 is the 3rd term, 27 is the 4TH term, 81 is the 5TH term — the question asks for the 4th term (27), not the 5th (81)."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student adds a constant amount (doubling instead of tripling, or a similar slip) instead of correctly applying the ×3 rule.",
        rootCause: "Wrong Rule Applied — uses an incorrect multiplier that doesn't match the stated rule.",
        remediation: "The rule explicitly states 'multiply by 3' — 1, 1×3=3, 3×3=9, 9×3=27 — not a different operation that gives 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 1; multiply by 3 each time." },
      { level: 2, description: "List the terms in order", hint: "1, 3, 9, ... continue to the 4th term." },
      { level: 3, description: "Confirm the 4th term", hint: "After 1, 3, 9, what comes next?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "H",
    skillId: "SYMAGE-01",
    question: "A mother is 4 times as old as her daughter. In 5 years, she will be 3 times as old. Find the daughter's current age.",
    options: [
        { text: "10", correct: true, feedback: "D = d, M = 4d. 4d+5 = 3(d+5) → d = 10." },
        { text: "5", correct: false, feedback: "Then mother 20, in 5 yrs 25 and 10 — not 3 times.", misconceptionId: "E-d18-a" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "20", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student guesses a value (5) without setting up and solving the actual equation, and it doesn't satisfy the 'three times as old in 5 years' condition.",
        rootCause: "Equation Not Set Up or Solved — guesses an answer instead of building and solving the algebraic model.",
        remediation: "Set up the equation properly: daughter=d, mother=4d, in 5 years mother=4d+5 and daughter=d+5, and mother will be 3 times the daughter: 4d+5=3(d+5) — solving gives d=10, not a guessed value like 5 that doesn't satisfy the condition."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student makes an error setting up or solving the equation, landing on 15 instead of the correct 10.",
        rootCause: "Computation Error — correct equation structure, but the algebra is carried out incorrectly.",
        remediation: "Recompute carefully: 4d+5=3(d+5) expands to 4d+5=3d+15, subtract 3d: d+5=15, subtract 5: d=10, not 15."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student makes an error setting up or solving the equation, landing on 20 instead of the correct 10.",
        rootCause: "Computation Error — correct equation structure, but the algebra is carried out incorrectly.",
        remediation: "Recompute carefully: 4d+5=3(d+5) expands to 4d+5=3d+15, subtract 3d: d+5=15, subtract 5: d=10, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Define variables for current ages", hint: "Daughter = d, Mother = 4d." },
      { level: 2, description: "Write the future-age equation", hint: "In 5 years: mother = 4d+5, daughter = d+5. Mother will be 3 times the daughter: 4d+5 = 3(d+5)." },
      { level: 3, description: "Expand and solve", hint: "4d+5=3d+15 → d+5=15 → d=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    tier: "H",
    skillId: "PATFORMULA-01",
    question: "Triangular numbers: 1, 3, 6, 10, … Find the 8th term.",
    options: [
        { text: "36", correct: true, feedback: "8×9÷2 = 36." },
        { text: "28", correct: false, feedback: "That's the 7th term.", misconceptionId: "E-d19-a" },
        { text: "45", correct: false, feedback: "That's the 9th term.", misconceptionId: "E-d19-b" },
        { text: "64", correct: false, feedback: "That's 8².", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student uses n=7 instead of n=8, computing the 7th term instead of the requested 8th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 8TH term, substitute n=8 into the formula: 8×9÷2=36, not n=7 which gives 7×8÷2=28 (the 7th term)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student uses n=9 instead of n=8, computing the 9th term instead of the requested 8th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 8TH term, substitute n=8 into the formula: 8×9÷2=36, not n=9 which gives 9×10÷2=45 (the 9th term)."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student uses the wrong formula (n² instead of the triangular number formula n(n+1)÷2), squaring 8 instead of applying the correct rule.",
        rootCause: "Wrong Formula Applied — confuses the triangular number formula with the square number formula.",
        remediation: "Triangular numbers follow n(n+1)÷2, NOT n² — 8×9÷2=36, not 8²=64 (which is the formula for SQUARE numbers, a different pattern)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the formula and the position asked for", hint: "nth triangular number = n(n+1)/2; the question asks for the 8th term, so n=8." },
      { level: 2, description: "Substitute n=8", hint: "8 × (8+1) ÷ 2." },
      { level: 3, description: "Compute", hint: "8 × 9 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    tier: "C",
    skillId: "FUNCTWOSTEP-01",
    question: "Rule: multiply by 2, then subtract 3. Input = 7. Output?",
    options: [
        { text: "11", correct: true, feedback: "7×2 = 14; 14−3 = 11." },
        { text: "8", correct: false, feedback: "You did 7×2−6? No.", misconceptionId: "E-d20-a" },
        { text: "17", correct: false, feedback: "You added 3.", misconceptionId: "E-d20-b" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student subtracts a different amount (6 instead of 3, perhaps doubling the subtracted value by mistake), leading to an incorrect result.",
        rootCause: "Second Operation Value Miscounted — uses an incorrect number for the subtraction step.",
        remediation: "The rule says subtract 3, not 6 — after 7×2=14, subtract exactly 3: 14-3=11, not 14-6=8."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student adds 3 instead of subtracting for the second step, applying the wrong operation.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The second step says SUBTRACT 3, not add 3 — 14-3=11, not 14+3=17."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes an arithmetic slip while applying the two-step rule, landing on 5 instead of the correct 11.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 7×2=14, then 14-3=11, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first step", hint: "7 × 2 = 14." },
      { level: 2, description: "Apply the second step to the result", hint: "Subtract 3 from the result (14)." },
      { level: 3, description: "Compute", hint: "14 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-01",
    question: "5, 10, 15, 20, ___ — next term?",
    options: [
        { text: "25", correct: true, feedback: "Add 5 each time." },
        { text: "24", correct: false, feedback: "You added 4 instead of 5.", misconceptionId: "E-r1-a" },
        { text: "30", correct: false, feedback: "You added 10 instead of 5.", misconceptionId: "E-r1-b" },
        { text: "40", correct: false, feedback: "You doubled 20.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student uses the wrong common difference (4 instead of 5), underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 10-5=5, 15-10=5, 20-15=5 — the difference is 5, not 4; so 20+5=25, not 24."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student uses double the actual common difference (10 instead of 5), overestimating the gap.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 10-5=5, 15-10=5, 20-15=5 — the difference is 5, not 10; so 20+5=25, not 30."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student doubles the last term instead of adding the constant common difference.",
        rootCause: "Wrong Operation Applied — multiplies the last term instead of adding the common difference.",
        remediation: "This pattern grows by ADDING 5 each time, not doubling — 20+5=25, not 20×2=40."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "10-5=5, 15-10=5, 20-15=5." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 5." },
      { level: 3, description: "Add the difference to the last term", hint: "20 + 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCSUB-01",
    question: "Rule: subtract 3. Input = 10. Output?",
    options: [
        { text: "7", correct: true, feedback: "10 − 3 = 7." },
        { text: "13", correct: false, feedback: "You added 3 instead of subtracting.", misconceptionId: "E-r2-a" },
        { text: "30", correct: false, feedback: "You multiplied by 3.", misconceptionId: "E-r2-b" },
        { text: "3", correct: false, feedback: "You gave the subtracted number.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student adds 3 to the input instead of subtracting, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 3, not add 3 — 10-3=7, not 10+3=13."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student multiplies the input by 3 instead of subtracting, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 3, not multiply by 3 — 10-3=7, not 10×3=30."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student reports the number being subtracted (3) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "3 is the number you SUBTRACT, not the answer itself — compute 10-3=7, that's the output, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: subtract 3." },
      { level: 2, description: "Identify the input", hint: "The input is 10." },
      { level: 3, description: "Apply the rule", hint: "10 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNSUB-01",
    question: "Solve \\( x - 7 = 14 \\). Find \\( x \\).",
    options: [
        { text: "21", correct: true, feedback: "14 + 7 = 21." },
        { text: "7", correct: false, feedback: "You gave the number being subtracted.", misconceptionId: "E-r3-a" },
        { text: "2", correct: false, feedback: "You divided instead of adding.", misconceptionId: "E-r3-b" },
        { text: "14", correct: false, feedback: "You gave the right-hand side, not the solved x.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports the number being subtracted (7) itself instead of the result of the addition.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "7 is the number you ADD, not the answer itself — compute 14+7=21, that's the value of x, not 7."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student divides instead of adding to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — divides when the inverse of subtraction is addition.",
        remediation: "The inverse of SUBTRACTING 7 is ADDING 7, not dividing — 14+7=21, not 14÷7=2."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student reports the right-hand side value (14) itself instead of solving for x.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "14 is the RESULT of x-7, not x itself — to find x, add 7: 14+7=21, not 14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 7 subtracted from it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Add 7 to both sides." },
      { level: 3, description: "Compute", hint: "14 + 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRTWOSTEP-01",
    question: "Write 'twice a number \\( p \\), plus 1' as an expression.",
    options: [
        { text: "\\( 2p + 1 \\)", correct: true, feedback: "Twice p is 2p; plus 1 gives 2p+1." },
        { text: "\\( p + 2 \\)", correct: false, feedback: "You forgot to double p first.", misconceptionId: "E-r4-a" },
        { text: "\\( 2(p + 1) \\)", correct: false, feedback: "That groups the +1 inside the doubling.", misconceptionId: "E-r4-b" },
        { text: "\\( p^2 + 1 \\)", correct: false, feedback: "'Twice' means times 2, not squared.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student forgets to double p, writing p+2 instead of the correct 2p+1, confusing which number gets doubled.",
        rootCause: "First Step Skipped — omits the 'twice' operation entirely and mixes up the constant.",
        remediation: "'Twice a number p' means 2p, not just p — the full expression is 2p+1, don't forget to double p before adding 1."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student groups the addition inside parentheses with the multiplication, writing 2(p+1) instead of the correct 2p+1.",
        rootCause: "Grouping Misapplied — applies the multiplier to the whole addition instead of just to p.",
        remediation: "'Twice p, plus 1' means take 2p FIRST, THEN add 1: 2p+1 — not 2(p+1), which means 'twice the result of (p plus 1)', a different quantity."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student confuses 'twice' (multiply by 2) with 'squared' (multiply by itself), writing p²+1 instead of 2p+1.",
        rootCause: "Multiplication Type Confused — mixes up multiplying by a constant with raising to a power.",
        remediation: "'Twice a number' means the number TIMES 2 (2×p=2p) — it does NOT mean the number times itself (p×p=p², which would be 'p squared')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'twice a number p'", hint: "Twice p means 2p." },
      { level: 2, description: "Identify the second operation", hint: "'Plus 1' means add 1, applied to 2p as a whole." },
      { level: 3, description: "Write the expression", hint: "2p + 1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQTWOSTEP-01",
    question: "Start at 5. Rule: ×2 + 1. Find the 4th term.",
    options: [
        { text: "47", correct: true, feedback: "5, 11, 23, 47." },
        { text: "23", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-r5-a" },
        { text: "31", correct: false, feedback: "Incorrect rule application.", misconceptionId: "E-r5-b" },
        { text: "95", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student stops one term early, reporting the 3rd term (23) instead of the requested 4th term (47).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 5 is the 1st term, 11 is the 2nd, 23 is the 3rd, 47 is the 4TH term — the question asks for the 4th term (47), not the 3rd (23)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student misapplies the two-step rule at some point, perhaps forgetting the +1 step, leading to an incorrect 4th term.",
        rootCause: "Two-Step Rule Applied Incorrectly — omits a step or applies the wrong operation partway through.",
        remediation: "The rule has TWO steps applied IN ORDER every time: multiply by 2, THEN add 1 — 5×2+1=11, 11×2+1=23, 23×2+1=47; don't skip the +1 step at any point."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student computes one term too far, reporting the 5th term (95) instead of the requested 4th term (47).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 23 is the 3rd term, 47 is the 4TH term, 95 is the 5TH term — the question asks for the 4th term (47), not the 5th (95)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "5, 5×2+1=11, 11×2+1=23." },
      { level: 2, description: "Apply the rule once more", hint: "23×2+1 = ?" },
      { level: 3, description: "Confirm this is the 4th term", hint: "1st=5, 2nd=11, 3rd=23, 4th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMADD-01",
    question: "Solve \\( n + 8 = 20 \\). Find \\( n \\).",
    options: [
        { text: "12", correct: true, feedback: "20 − 8 = 12." },
        { text: "28", correct: false, feedback: "You added 20+8.", misconceptionId: "E-r6-a" },
        { text: "8", correct: false, feedback: "You gave the added number.", misconceptionId: "E-r6-b" },
        { text: "20", correct: false, feedback: "You gave the right-hand side.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student adds 20 and 8 instead of subtracting to isolate n, applying the opposite of the required inverse operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 8, you must SUBTRACT 8 (the inverse operation) — 20-8=12, not 20+8=28."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student reports the number being added (8) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "8 is the number ADDED, not the answer itself — compute 20-8=12, that's the value of n, not 8."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reports the right-hand side value (20) itself instead of solving for n.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "20 is the RESULT of n+8, not n itself — to find n, subtract 8: 20-8=12, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "n has 8 added to it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Subtract 8 from both sides." },
      { level: 3, description: "Compute", hint: "20 - 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-02",
    question: "100, 90, 80, 70, ___ — next term?",
    options: [
        { text: "60", correct: true, feedback: "Subtract 10 each time." },
        { text: "50", correct: false, feedback: "You subtracted 20 instead of 10.", misconceptionId: "E-r7-a" },
        { text: "80", correct: false, feedback: "You repeated an earlier term.", misconceptionId: "E-r7-b" },
        { text: "75", correct: false, feedback: "You subtracted 5 instead of 10.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student uses double the actual common difference (20 instead of 10), overestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 100-90=10, 90-80=10, 80-70=10 — the difference is 10, not 20; so 70-10=60, not 70-20=50."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student repeats an earlier term instead of continuing the decreasing pattern by subtracting the common difference.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "To extend the pattern, SUBTRACT the common difference (10) from the last term — 70-10=60, don't repeat an earlier term (80)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student uses an incorrect common difference (5 instead of 10), underestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 100-90=10, 90-80=10, 80-70=10 — the difference is 10, not 5; so 70-10=60, not 70-5=75."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "100-90=10, 90-80=10, 80-70=10." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 10, and the pattern is decreasing." },
      { level: 3, description: "Subtract the difference from the last term", hint: "70 - 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 20. Rule: add 5, then multiply by 2. Find the input.",
    options: [
        { text: "5", correct: true, feedback: "Reverse: 20÷2=10; 10−5=5." },
        { text: "15", correct: false, feedback: "You forgot to subtract 5 after dividing.", misconceptionId: "E-r8-a" },
        { text: "25", correct: false, feedback: "You applied the forward rule instead of reversing it.", misconceptionId: "E-r8-b" },
        { text: "10", correct: false, feedback: "That's the result after dividing, not the input.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student divides by 2 to get 10 but then adds 5 instead of subtracting, applying the wrong operation for the second reversal step.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO 'add 5', you must SUBTRACT 5 (the inverse operation), not add — 10-5=5, not 10+5=15."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student applies the ORIGINAL rule (add 5 then ×2) to the output instead of reversing it, leading to a wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: divide by 2 (undoing multiply by 2), then subtract 5 (undoing add 5) — 20÷2=10, 10-5=5, not 20+5=25."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student correctly reverses the multiplication (20÷2=10) but stops there, reporting 10 instead of also subtracting 5.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps — after dividing by 2 (20÷2=10), you must ALSO subtract 5 (undoing the original 'add 5'): 10-5=5, not just 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'multiply by 2' — undo it by dividing by 2: 20÷2=10." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'add 5' — undo it by subtracting 5." },
      { level: 3, description: "Compute", hint: "10 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 2x - 4 = 10 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "Add 4 → 2x=14; ÷2 → x=7." },
        { text: "3", correct: false, feedback: "Incorrect.", misconceptionId: "E-r9-a" },
        { text: "12", correct: false, feedback: "You only added 4, forgot to divide.", misconceptionId: "E-r9-b" },
        { text: "6", correct: false, feedback: "Incorrect division.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student applies the inverse operations in the wrong order or with the wrong operation, landing on a much smaller incorrect value.",
        rootCause: "Inverse Operations Applied Incorrectly — doesn't correctly reverse the order of operations used to build the equation.",
        remediation: "To undo 2x-4=10: FIRST add 4 to both sides (2x=14), THEN divide by 2 (x=7) — following the reverse order of the original operations."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student adds 4 to get 2x=14 but stops there, reporting 12 (perhaps a slip) instead of dividing by 2 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving 2x-4=10 requires TWO steps — after adding 4 (2x=14), you must ALSO divide by 2: 14÷2=7, not 12."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student makes an arithmetic slip in the division step, landing on 6 instead of the correct 7.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 2x=14, then 14÷2=7, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the subtraction first", hint: "Add 4 to both sides: 10+4=14." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 2." },
      { level: 3, description: "Compute", hint: "14 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQMULT-01",
    question: "Start at 1. Rule: multiply by 3. Find the 5th term.",
    options: [
        { text: "81", correct: true, feedback: "1, 3, 9, 27, 81." },
        { text: "27", correct: false, feedback: "That's the 4th term.", misconceptionId: "E-r10-a" },
        { text: "243", correct: false, feedback: "That's the 6th term.", misconceptionId: "E-r10-b" },
        { text: "9", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student stops one term early, reporting the 4th term (27) instead of the requested 5th term (81).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 9 is the 3rd term, 27 is the 4th, 81 is the 5TH term — the question asks for the 5th term (81), not the 4th (27)."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student computes one term too far, reporting the 6th term (243) instead of the requested 5th term (81).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 27 is the 4th term, 81 is the 5TH term, 243 is the 6TH term — the question asks for the 5th term (81), not the 6th (243)."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student stops two terms early, reporting the 3rd term (9) instead of the requested 5th term (81).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 9 is the 3RD term, 27 is the 4th, 81 is the 5TH term — the question asks for the 5th term (81), not the 3rd (9)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 1; multiply by 3 each time." },
      { level: 2, description: "List the terms in order", hint: "1, 3, 9, 27, ... continue to the 5th term." },
      { level: 3, description: "Confirm the 5th term", hint: "After 1, 3, 9, 27, what comes next?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
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

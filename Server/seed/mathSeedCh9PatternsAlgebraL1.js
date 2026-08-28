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
    skillId: "PATARITH-01",
    question: "Extend the pattern: 5, 10, 15, 20, ___",
    options: [
        { text: "25", correct: true, feedback: "Each term increases by 5. 20 + 5 = 25." },
        { text: "24", correct: false, feedback: "You added 4 instead of 5.", misconceptionId: "E-w1-a" },
        { text: "30", correct: false, feedback: "You added 10.", misconceptionId: "E-w1-b" },
        { text: "20", correct: false, feedback: "No change.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Look at the difference between consecutive terms. It's always the same.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student uses the wrong common difference (4 instead of 5), miscounting the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between EVERY pair of consecutive terms: 10-5=5, 15-10=5, 20-15=5 — the difference is 5, not 4; so 20+5=25, not 24."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student uses double the actual common difference (10 instead of 5), perhaps confusing it with the first term's value.",
        rootCause: "Common Difference Miscounted — substitutes an unrelated number (like the first term) for the actual computed difference.",
        remediation: "The difference between consecutive terms is 5 (10-5=5), not 10 (which is just the second term) — 20+5=25, not 20+10=30."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student repeats the last term instead of extending the pattern by adding the common difference.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "To extend the pattern, ADD the common difference to the last term — 20+5=25, don't just repeat the last term (20)."
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
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCADD-01",
    question: "Rule: add 5. Input = 3. What is the output?",
    options: [
        { text: "8", correct: true, feedback: "3 + 5 = 8." },
        { text: "2", correct: false, feedback: "You subtracted 5.", misconceptionId: "E-w2-a" },
        { text: "15", correct: false, feedback: "You multiplied by 5.", misconceptionId: "E-w2-b" },
        { text: "3", correct: false, feedback: "No operation performed.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Apply the rule: take the input and add 5.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts 5 from the input instead of adding, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — subtracts when the rule specifies addition.",
        remediation: "The rule says ADD 5, not subtract — 3+5=8, not 3-5=2."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student multiplies the input by 5 instead of adding, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies addition.",
        remediation: "The rule says ADD 5, not multiply by 5 — 3+5=8, not 3×5=15."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (add 5) to the input — the output is not the same as the input: 3+5=8, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: add 5." },
      { level: 2, description: "Identify the input", hint: "The input is 3." },
      { level: 3, description: "Apply the rule", hint: "3 + 5 = ?" }
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
    question: "Solve \\( x + 7 = 12 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 7 from both sides: 12 − 7 = 5." },
        { text: "19", correct: false, feedback: "You added instead of subtracted.", misconceptionId: "E-w3-a" },
        { text: "6", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w3-b" },
        { text: "7", correct: false, feedback: "You only subtracted from the right side.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "To undo adding 7, subtract 7 from both sides.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student adds 7 and 12 instead of subtracting to isolate x, applying the opposite of the required inverse operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 7, you must SUBTRACT 7 (the inverse operation) — 12-7=5, not 12+7=19."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student makes an arithmetic slip in the subtraction, landing on 6 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: 12-7=5, not 6 — double-check your subtraction."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student reports the number being subtracted (7) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "7 is the number you SUBTRACT, not the answer itself — compute 12-7=5, that's the value of x, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 7 added to it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Subtract 7 from both sides." },
      { level: 3, description: "Compute", hint: "12 - 7 = ?" }
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
    question: "Write '4 more than \\( y \\)' as an algebraic expression.",
    options: [
        { text: "\\( y + 4 \\)", correct: true, feedback: "More than means add. So it's y + 4." },
        { text: "\\( 4y \\)", correct: false, feedback: "That means 4 times y.", misconceptionId: "E-w4-a" },
        { text: "\\( y - 4 \\)", correct: false, feedback: "That means 4 less than y.", misconceptionId: "E-w4-b" },
        { text: "\\( 4 - y \\)", correct: false, feedback: "That means y less than 4.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "'More than' means you add to the variable.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student translates 'more than' as multiplication, writing 4y instead of the correct addition y+4.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a multiplication expression.",
        remediation: "'More than' signals ADDITION, not multiplication — '4 more than y' means y+4, not 4×y (which would be phrased as '4 times y')."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student translates 'more than' as subtraction, writing y-4 instead of the correct addition y+4.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a subtraction expression.",
        remediation: "'More than' signals ADDITION, not subtraction — '4 more than y' means y+4, not y-4 (which would be phrased as '4 less than y')."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student reverses the order AND changes the operation, writing 4-y instead of the correct y+4.",
        rootCause: "Order and Operation Both Reversed — misreads both which term comes first and which operation applies.",
        remediation: "'4 more than y' means y+4 (add 4 to y) — 4-y would mean 'y less than 4' (subtract y from 4), a completely different expression."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'More than' signals addition." },
      { level: 2, description: "Identify the variable and the added amount", hint: "The variable is y; the amount added is 4." },
      { level: 3, description: "Write the expression", hint: "y + 4." }
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
    question: "Start at 2. Add 3 each time. Write the first three terms.",
    options: [
        { text: "2, 5, 8", correct: true, feedback: "2, 2+3=5, 5+3=8." },
        { text: "2, 5, 7", correct: false, feedback: "The last term is wrong; 5+3=8.", misconceptionId: "E-w5-a" },
        { text: "2, 6, 10", correct: false, feedback: "You added 4 each time.", misconceptionId: "E-w5-b" },
        { text: "2, 4, 6", correct: false, feedback: "You added 2 instead of 3.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Start at 2. Apply the rule: add 3 to get the next term.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student makes an arithmetic slip on the third term, adding only 2 instead of 3 to the second term.",
        rootCause: "Rule Applied Inconsistently — uses the correct rule for some terms but not all.",
        remediation: "Apply the SAME rule (add 3) to every term consistently: 2, 2+3=5, 5+3=8 — the third term is 8, not 7 (which would come from adding only 2)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student adds 4 each time instead of the stated rule of adding 3.",
        rootCause: "Wrong Rule Applied — uses an incorrect increment that doesn't match the stated rule.",
        remediation: "The rule explicitly states 'add 3', not 4 — 2, 2+3=5, 5+3=8, not 2, 2+4=6, 6+4=10."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student adds 2 each time instead of the stated rule of adding 3, perhaps confusing the increment with the starting value.",
        rootCause: "Wrong Rule Applied — uses an incorrect increment that doesn't match the stated rule.",
        remediation: "The rule explicitly states 'add 3', not 2 (which is just the starting value) — 2, 2+3=5, 5+3=8, not 2, 2+2=4, 4+2=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 2; add 3 each time." },
      { level: 2, description: "Find the second term", hint: "2 + 3 = 5." },
      { level: 3, description: "Find the third term", hint: "5 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMADD-01",
    question: "A number plus 8 equals 15. Write an equation and find the number.",
    options: [
        { text: "\\( n + 8 = 15; n = 7 \\)", correct: true, feedback: "Let the number be n. n + 8 = 15 → n = 7." },
        { text: "\\( n = 23 \\)", correct: false, feedback: "You added 8 and 15.", misconceptionId: "E-w6-a" },
        { text: "\\( n = 8 \\)", correct: false, feedback: "You only wrote the added number.", misconceptionId: "E-w6-b" },
        { text: "\\( n = 15 \\)", correct: false, feedback: "That's the total, not the original number.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Let the unknown be n. Write the equation, then solve.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student adds the two given numbers (8 and 15) instead of subtracting to isolate the unknown.",
        rootCause: "Inverse Operation Not Applied — adds when solving n+8=15 requires subtraction.",
        remediation: "To solve n+8=15, SUBTRACT 8 from both sides (the inverse of adding 8) — 15-8=7, not 15+8=23."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student reports the amount added (8) instead of solving for the original number n.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "8 is the amount ADDED, not the original number — solve n+8=15 by subtracting: n=15-8=7, not 8."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student reports the final total (15) instead of solving for the original number n.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "15 is the FINAL total, not the original number — solve n+8=15 by subtracting: n=15-8=7, not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be n and write the equation", hint: "n + 8 = 15." },
      { level: 2, description: "Identify the inverse operation", hint: "Subtract 8 from both sides." },
      { level: 3, description: "Solve for n", hint: "15 - 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-02",
    question: "100, 90, 80, 70, ___ — what comes next?",
    options: [
        { text: "60", correct: true, feedback: "The pattern decreases by 10 each time. 70 − 10 = 60." },
        { text: "80", correct: false, feedback: "No change.", misconceptionId: "E-w7-a" },
        { text: "50", correct: false, feedback: "You subtracted 20 instead of 10.", misconceptionId: "E-w7-b" },
        { text: "65", correct: false, feedback: "You subtracted 5.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Find the difference between two terms. It's −10 each time.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student repeats a previous term instead of continuing the decreasing pattern by subtracting the common difference.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "To extend the pattern, SUBTRACT the common difference (10) from the last term — 70-10=60, don't just repeat an earlier term (80)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student uses double the actual common difference (20 instead of 10), miscounting the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 100-90=10, 90-80=10, 80-70=10 — the difference is 10, not 20; so 70-10=60, not 70-20=50."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student uses an incorrect common difference (5 instead of 10), underestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 100-90=10, 90-80=10, 80-70=10 — the difference is 10, not 5; so 70-10=60, not 70-5=65."
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
    itemId: "w8",
    order: 8,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNSUB-01",
    question: "Solve \\( x - 4 = 9 \\). Find \\( x \\).",
    options: [
        { text: "13", correct: true, feedback: "Add 4 to both sides: 9 + 4 = 13." },
        { text: "5", correct: false, feedback: "You subtracted 4 from 9.", misconceptionId: "E-w8-a" },
        { text: "36", correct: false, feedback: "You multiplied by 4.", misconceptionId: "E-w8-b" },
        { text: "4", correct: false, feedback: "You only gave the subtracted number.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "To undo subtracting 4, add 4 to both sides.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student subtracts 4 from 9 instead of adding to isolate x, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO subtracting 4, you must ADD 4 (the inverse operation) — 9+4=13, not 9-4=5."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student multiplies 9 by 4 instead of adding to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — multiplies when the inverse of subtraction is addition.",
        remediation: "The inverse of SUBTRACTING 4 is ADDING 4, not multiplying by 4 — 9+4=13, not 9×4=36."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student reports the number being subtracted (4) itself instead of the result of the addition.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "4 is the number you ADD, not the answer itself — compute 9+4=13, that's the value of x, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 4 subtracted from it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Add 4 to both sides." },
      { level: 3, description: "Compute", hint: "9 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-01",
    question: "Extend the pattern: 3, 7, 11, 15, ___",
    options: [
        { text: "19", correct: true, feedback: "The difference is +4. 15 + 4 = 19." },
        { text: "18", correct: false, feedback: "You added 3 instead of 4.", misconceptionId: "E-d1-a" },
        { text: "20", correct: false, feedback: "You added 5.", misconceptionId: "E-d1-b" },
        { text: "16", correct: false, feedback: "You only added 1.", misconceptionId: "E-d1-c" }
      ],
    backward: "Find the constant difference between terms and add it to the last term.",
    forward: "Patterns help us predict future numbers in sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student uses the wrong common difference (3 instead of 4), miscounting the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between EVERY pair of consecutive terms: 7-3=4, 11-7=4, 15-11=4 — the difference is 4, not 3; so 15+4=19, not 18."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student uses the wrong common difference (5 instead of 4), overestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between EVERY pair of consecutive terms: 7-3=4, 11-7=4, 15-11=4 — the difference is 4, not 5; so 15+4=19, not 20."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student adds only 1 to the last term, drastically underestimating the actual common difference.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between EVERY pair of consecutive terms: 7-3=4, 11-7=4, 15-11=4 — the difference is 4, not 1; so 15+4=19, not 16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "7-3=4, 11-7=4, 15-11=4." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 4." },
      { level: 3, description: "Add the difference to the last term", hint: "15 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCMULT-01",
    question: "Rule: multiply by 4. Input = 6. What is the output?",
    options: [
        { text: "24", correct: true, feedback: "6 × 4 = 24." },
        { text: "10", correct: false, feedback: "You added 4 instead of multiplying.", misconceptionId: "E-d2-a" },
        { text: "2", correct: false, feedback: "You divided by 3? Not correct.", misconceptionId: "E-d2-b" },
        { text: "6", correct: false, feedback: "No operation performed.", misconceptionId: "E-d2-c" }
      ],
    backward: "Apply the rule to the input number: 6 × 4.",
    forward: "Function machines are used in computer programming.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student adds 4 to the input instead of multiplying, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — adds when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 4, not add 4 — 6×4=24, not 6+4=10."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student divides the input by an unrelated number instead of multiplying by 4 as the rule states.",
        rootCause: "Operation Substituted — divides when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 4, not divide — 6×4=24, not a division result."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (multiply by 4) to the input — the output is not the same as the input: 6×4=24, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: multiply by 4." },
      { level: 2, description: "Identify the input", hint: "The input is 6." },
      { level: 3, description: "Apply the rule", hint: "6 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNSUB-01",
    question: "Solve \\( x - 6 = 14 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Add 6 to both sides: 14 + 6 = 20." },
        { text: "8", correct: false, feedback: "You subtracted 6 from 14.", misconceptionId: "E-d3-a" },
        { text: "84", correct: false, feedback: "You multiplied 14 × 6.", misconceptionId: "E-d3-b" },
        { text: "6", correct: false, feedback: "You only gave the number being subtracted.", misconceptionId: "E-d3-c" }
      ],
    backward: "To isolate x, add 6 to both sides.",
    forward: "Solving equations is like finding the missing piece of a puzzle.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student subtracts 6 from 14 instead of adding to isolate x, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO subtracting 6, you must ADD 6 (the inverse operation) — 14+6=20, not 14-6=8."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student multiplies 14 by 6 instead of adding to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — multiplies when the inverse of subtraction is addition.",
        remediation: "The inverse of SUBTRACTING 6 is ADDING 6, not multiplying by 6 — 14+6=20, not 14×6=84."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student reports the number being subtracted (6) itself instead of the result of the addition.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "6 is the number you ADD, not the answer itself — compute 14+6=20, that's the value of x, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 6 subtracted from it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Add 6 to both sides." },
      { level: 3, description: "Compute", hint: "14 + 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRSUB-01",
    question: "Write '3 less than \\( p \\)' as an algebraic expression.",
    options: [
        { text: "\\( p - 3 \\)", correct: true, feedback: "Less than means subtract from the variable: p − 3." },
        { text: "\\( 3 - p \\)", correct: false, feedback: "That's 'p less than 3', the order is reversed.", misconceptionId: "E-d4-a" },
        { text: "\\( p + 3 \\)", correct: false, feedback: "That's '3 more than p'.", misconceptionId: "E-d4-b" },
        { text: "\\( 3p \\)", correct: false, feedback: "That's '3 times p'.", misconceptionId: "E-d4-c" }
      ],
    backward: "'Less than' means you subtract from the variable.",
    forward: "Translating words into symbols is a key algebra skill.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student reverses the order of subtraction, writing 3-p instead of the correct p-3.",
        rootCause: "Subtraction Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'3 less than p' means START with p and SUBTRACT 3: p-3 — not 3-p, which would mean 'p less than 3' (start with 3, subtract p)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student translates 'less than' as addition, writing p+3 instead of the correct subtraction p-3.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with an addition expression.",
        remediation: "'Less than' signals SUBTRACTION, not addition — '3 less than p' means p-3, not p+3 (which would be phrased as '3 more than p')."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student translates 'less than' as multiplication, writing 3p instead of the correct subtraction p-3.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with a multiplication expression.",
        remediation: "'Less than' signals SUBTRACTION, not multiplication — '3 less than p' means p-3, not 3×p (which would be phrased as '3 times p')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Less than' signals subtraction." },
      { level: 2, description: "Identify which term comes first", hint: "'3 less than p' starts with p, then subtracts 3." },
      { level: 3, description: "Write the expression", hint: "p - 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQADD-01",
    question: "Start at 5, add 2 each time. What is the 3rd term?",
    options: [
        { text: "9", correct: true, feedback: "5 (1st), 7 (2nd), 9 (3rd)." },
        { text: "7", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d5-a" },
        { text: "11", correct: false, feedback: "You added 2 twice incorrectly.", misconceptionId: "E-d5-b" },
        { text: "5", correct: false, feedback: "That's the 1st term.", misconceptionId: "E-d5-c" }
      ],
    backward: "List the terms step‑by‑step: 5, 5+2=7, 7+2=9.",
    forward: "Sequences are everywhere — from music rhythms to nature.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student stops one term early, reporting the 2nd term (7) instead of the requested 3rd term (9).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 5 is the 1st term, 7 is the 2nd term, 9 is the 3RD term — the question asks for the 3rd term (9), not the 2nd (7)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student makes an arithmetic slip while applying the rule twice, landing on 11 instead of the correct 9.",
        rootCause: "Computation Error — correct approach, but the repeated addition is carried out incorrectly.",
        remediation: "Recompute step by step: 5, 5+2=7 (2nd term), 7+2=9 (3rd term) — not 11."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student reports the starting value (5, the 1st term) instead of applying the rule to reach the 3rd term.",
        rootCause: "Rule Not Applied Enough Times — reports an earlier term without continuing to the requested position.",
        remediation: "5 is only the 1ST term — you must apply the rule (add 2) two more times to reach the 3rd term: 5→7→9, not just 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 5; add 2 each time." },
      { level: 2, description: "Find the second term", hint: "5 + 2 = 7." },
      { level: 3, description: "Find the third term", hint: "7 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMADD-01",
    question: "Ravi had some marbles. He bought 5 more and now has 12. Write an equation and find how many he had at first.",
    options: [
        { text: "\\( m + 5 = 12; m = 7 \\)", correct: true, feedback: "Let original = m. m + 5 = 12 → m = 7." },
        { text: "\\( m = 17 \\)", correct: false, feedback: "You added 12 + 5.", misconceptionId: "E-d6-a" },
        { text: "\\( m = 5 \\)", correct: false, feedback: "You only gave the bought amount.", misconceptionId: "E-d6-b" },
        { text: "\\( m = 12 \\)", correct: false, feedback: "You gave the final amount.", misconceptionId: "E-d6-c" }
      ],
    backward: "Let the unknown be m. Use the given information to write an equation.",
    forward: "Real‑life problems can be solved with algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student adds the two given numbers (12 and 5) instead of subtracting to isolate the unknown.",
        rootCause: "Inverse Operation Not Applied — adds when solving m+5=12 requires subtraction.",
        remediation: "To solve m+5=12, SUBTRACT 5 from both sides (the inverse of adding 5) — 12-5=7, not 12+5=17."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student reports the amount bought (5) instead of solving for the original number of marbles m.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "5 is the amount BOUGHT, not the original number — solve m+5=12 by subtracting: m=12-5=7, not 5."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student reports the final total (12) instead of solving for the original number of marbles m.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "12 is the FINAL total after buying more, not the original number — solve m+5=12 by subtracting: m=12-5=7, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be m and write the equation", hint: "m + 5 = 12." },
      { level: 2, description: "Identify the inverse operation", hint: "Subtract 5 from both sides." },
      { level: 3, description: "Solve for m", hint: "12 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATMISSING-01",
    question: "Find the missing term: 2, ___, 8, 11, 14",
    options: [
        { text: "5", correct: true, feedback: "The difference is +3. 2 + 3 = 5." },
        { text: "4", correct: false, feedback: "You added 2 instead of 3.", misconceptionId: "E-d7-a" },
        { text: "6", correct: false, feedback: "You added 4.", misconceptionId: "E-d7-b" },
        { text: "10", correct: false, feedback: "You used the 3rd term.", misconceptionId: "E-d7-c" }
      ],
    backward: "Look at the known terms to find the constant difference.",
    forward: "Filling gaps in patterns sharpens observation.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student uses the wrong common difference (2 instead of 3), not verifying it against the known later terms.",
        rootCause: "Common Difference Miscounted — computes the difference using an incomplete or incorrect part of the sequence.",
        remediation: "Verify the difference using the KNOWN terms: 11-8=3, 14-11=3 — the difference is 3, not 2; so the missing term is 2+3=5, not 4."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student uses the wrong common difference (4 instead of 3), overestimating the gap.",
        rootCause: "Common Difference Miscounted — computes the difference using an incomplete or incorrect part of the sequence.",
        remediation: "Verify the difference using the KNOWN terms: 11-8=3, 14-11=3 — the difference is 3, not 4; so the missing term is 2+3=5, not 6."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student copies a later known term (8, the 3rd position) into the missing 2nd position instead of computing it from the pattern.",
        rootCause: "Wrong Term Copied Into Gap — inserts an existing term from elsewhere in the sequence instead of computing the correct value.",
        remediation: "The missing term must be COMPUTED using the pattern's rule (add 3 to the term before it): 2+3=5 — don't copy the value of a different term (8) into the gap."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference using the known later terms", hint: "11-8=3, 14-11=3." },
      { level: 2, description: "Confirm this difference applies throughout", hint: "The common difference is 3." },
      { level: 3, description: "Add the difference to the term before the gap", hint: "2 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCSUB-01",
    question: "Rule: subtract 3. Input = 15. What is the output?",
    options: [
        { text: "12", correct: true, feedback: "15 − 3 = 12." },
        { text: "18", correct: false, feedback: "You added 3 instead of subtracting.", misconceptionId: "E-d8-a" },
        { text: "5", correct: false, feedback: "You divided by 3.", misconceptionId: "E-d8-b" },
        { text: "3", correct: false, feedback: "You gave the subtracted amount.", misconceptionId: "E-d8-c" }
      ],
    backward: "Apply the rule: take the input and subtract 3.",
    forward: "Function machines can use any operation.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student adds 3 to the input instead of subtracting, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 3, not add 3 — 15-3=12, not 15+3=18."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student divides the input by 3 instead of subtracting, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — divides when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 3, not divide by 3 — 15-3=12, not 15÷3=5."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student reports the number being subtracted (3) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "3 is the number you SUBTRACT, not the answer itself — compute 15-3=12, that's the output, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: subtract 3." },
      { level: 2, description: "Identify the input", hint: "The input is 15." },
      { level: 3, description: "Apply the rule", hint: "15 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNMULT-01",
    question: "\\( 7 \\times x = 42 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "Divide both sides by 7: 42 ÷ 7 = 6." },
        { text: "49", correct: false, feedback: "You added 7 to 42.", misconceptionId: "E-d9-a" },
        { text: "35", correct: false, feedback: "You subtracted 7 from 42.", misconceptionId: "E-d9-b" },
        { text: "7", correct: false, feedback: "You gave the multiplier.", misconceptionId: "E-d9-c" }
      ],
    backward: "Divide both sides by 7 to isolate x.",
    forward: "Multiplication equations are the reverse of division.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student adds 7 to 42 instead of dividing to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 7 is DIVIDING by 7, not adding 7 — 42÷7=6, not 42+7=49."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student subtracts 7 from 42 instead of dividing to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — subtracts when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 7 is DIVIDING by 7, not subtracting 7 — 42÷7=6, not 42-7=35."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student reports the multiplier (7) itself instead of the result of the division.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "7 is the number you DIVIDE by, not the answer itself — compute 42÷7=6, that's the value of x, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x is multiplied by 7." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Divide both sides by 7." },
      { level: 3, description: "Compute", hint: "42 ÷ 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRMULT-01",
    question: "Write 'the product of 6 and \\( k \\)' as an expression.",
    options: [
        { text: "\\( 6k \\)", correct: true, feedback: "Product means multiply: 6 × k, written as 6k." },
        { text: "\\( 6 + k \\)", correct: false, feedback: "That's the sum, not product.", misconceptionId: "E-d10-a" },
        { text: "\\( 6 - k \\)", correct: false, feedback: "That's the difference.", misconceptionId: "E-d10-b" },
        { text: "\\( k \\div 6 \\)", correct: false, feedback: "That's the quotient.", misconceptionId: "E-d10-c" }
      ],
    backward: "Product means multiply.",
    forward: "Algebraic expressions are a shorthand for repeated calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student translates 'product' as addition, writing 6+k instead of the correct multiplication 6k.",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with an addition expression.",
        remediation: "'Product' signals MULTIPLICATION, not addition — 'the product of 6 and k' means 6×k (written 6k), not 6+k (which would be 'the sum of 6 and k')."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student translates 'product' as subtraction, writing 6-k instead of the correct multiplication 6k.",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with a subtraction expression.",
        remediation: "'Product' signals MULTIPLICATION, not subtraction — 'the product of 6 and k' means 6×k (written 6k), not 6-k (which would be 'the difference of 6 and k')."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student translates 'product' as division, writing k÷6 instead of the correct multiplication 6k.",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('product') with a division expression.",
        remediation: "'Product' signals MULTIPLICATION, not division — 'the product of 6 and k' means 6×k (written 6k), not k÷6 (which would be 'the quotient of k and 6')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Product' signals multiplication." },
      { level: 2, description: "Identify the two factors", hint: "6 and k." },
      { level: 3, description: "Write the expression", hint: "6k." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQSUB-01",
    question: "Start at 10, subtract 3 each time. What is the 4th term?",
    options: [
        { text: "1", correct: true, feedback: "10, 7, 4, 1." },
        { text: "13", correct: false, feedback: "You added 3 instead of subtracting.", misconceptionId: "E-d11-a" },
        { text: "7", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d11-b" },
        { text: "4", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d11-c" }
      ],
    backward: "Repeatedly apply the rule: 10 → 7 → 4 → 1.",
    forward: "Decreasing sequences model things like countdowns.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student adds 3 instead of subtracting, applying the opposite of the stated rule.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 3 each time, not add — 10, 10-3=7, 7-3=4, 4-3=1 (the 4th term), not 10+3=13."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student stops two terms early, reporting the 2nd term (7) instead of the requested 4th term (1).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 10 is the 1st term, 7 is the 2nd, 4 is the 3rd, 1 is the 4TH term — the question asks for the 4th term (1), not the 2nd (7)."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student stops one term early, reporting the 3rd term (4) instead of the requested 4th term (1).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 10 is the 1st term, 7 is the 2nd, 4 is the 3rd, 1 is the 4TH term — the question asks for the 4th term (1), not the 3rd (4)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 10; subtract 3 each time." },
      { level: 2, description: "List the terms in order", hint: "10, 7, 4, ... continue the pattern." },
      { level: 3, description: "Find the 4th term", hint: "After 10, 7, 4, what comes next?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMSUB-01",
    question: "A pizza is cut into 8 slices. Sita ate some slices, and 5 slices are left. Write an equation and find how many she ate.",
    options: [
        { text: "\\( x + 5 = 8; x = 3 \\)", correct: true, feedback: "Eaten + left = total. x + 5 = 8 → x = 3." },
        { text: "\\( x = 13 \\)", correct: false, feedback: "You added 8 + 5.", misconceptionId: "E-d12-a" },
        { text: "\\( x = 5 \\)", correct: false, feedback: "That's the number left.", misconceptionId: "E-d12-b" },
        { text: "\\( x = 8 \\)", correct: false, feedback: "That's the total.", misconceptionId: "E-d12-c" }
      ],
    backward: "Total slices = eaten + left.",
    forward: "Word problems become easy when you write an equation.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student adds the two given numbers (8 and 5) instead of subtracting to isolate the unknown.",
        rootCause: "Inverse Operation Not Applied — adds when solving x+5=8 requires subtraction.",
        remediation: "To solve x+5=8, SUBTRACT 5 from both sides (the inverse of adding 5) — 8-5=3, not 8+5=13."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student reports the number of slices left (5) instead of solving for the number eaten x.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "5 is the number of slices LEFT, not the number eaten — solve x+5=8 by subtracting: x=8-5=3, not 5."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student reports the total number of slices (8) instead of solving for the number eaten x.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "8 is the TOTAL slices, not the number eaten — solve x+5=8 by subtracting: x=8-5=3, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be x and write the equation", hint: "eaten + left = total: x + 5 = 8." },
      { level: 2, description: "Identify the inverse operation", hint: "Subtract 5 from both sides." },
      { level: 3, description: "Solve for x", hint: "8 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATSQUARE-01",
    question: "Extend the pattern: 1, 4, 9, 16, 25, ___",
    options: [
        { text: "36", correct: true, feedback: "These are square numbers: 1²,2²,3²,4²,5² → next is 6² = 36." },
        { text: "30", correct: false, feedback: "You added 5 to 25, but the pattern is squares.", misconceptionId: "E-d13-a" },
        { text: "35", correct: false, feedback: "Not a square number.", misconceptionId: "E-d13-b" },
        { text: "49", correct: false, feedback: "That's 7², skipping 6².", misconceptionId: "E-d13-c" }
      ],
    backward: "These are square numbers: 1², 2², 3², …",
    forward: "Square numbers appear in area calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student assumes this is an arithmetic (constant-difference) pattern and adds 5 to the last term, not recognising the differences between terms are themselves increasing.",
        rootCause: "Non-Arithmetic Pattern Misidentified as Arithmetic — applies the constant-difference strategy to a pattern whose differences aren't constant.",
        remediation: "Check the differences: 4-1=3, 9-4=5, 16-9=7, 25-16=9 — these are NOT constant (they increase by 2 each time), so this isn't a simple add-the-same-amount pattern; instead, these are square numbers (1²,2²,3²,4²,5²), so the next term is 6²=36, not 25+5=30."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student guesses a value that doesn't follow the square-number rule at all.",
        rootCause: "Pattern Rule Not Identified — picks an arbitrary next value without recognising the underlying rule (squares).",
        remediation: "Recognise these ARE square numbers: 1=1², 4=2², 9=3², 16=4², 25=5² — the next term must also be a perfect square: 6²=36, not 35 (which isn't a perfect square)."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student skips ahead to 7² instead of continuing to the very next square number, 6².",
        rootCause: "Sequence Position Skipped — jumps past the next term in the pattern to a later one.",
        remediation: "After 5² (25), the NEXT square number is 6² (36), not 7² (49) — don't skip a position in the sequence of squares."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check whether the differences are constant", hint: "4-1=3, 9-4=5, 16-9=7, 25-16=9 — these are increasing, not constant." },
      { level: 2, description: "Recognise the pattern as square numbers", hint: "1=1², 4=2², 9=3², 16=4², 25=5²." },
      { level: 3, description: "Find the next square number", hint: "What is 6²?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCDIV-01",
    question: "Rule: divide by 5. Input = 45. What is the output?",
    options: [
        { text: "9", correct: true, feedback: "45 ÷ 5 = 9." },
        { text: "50", correct: false, feedback: "You added 5.", misconceptionId: "E-d14-a" },
        { text: "40", correct: false, feedback: "You subtracted 5.", misconceptionId: "E-d14-b" },
        { text: "5", correct: false, feedback: "You gave the divisor.", misconceptionId: "E-d14-c" }
      ],
    backward: "Divide the input by 5.",
    forward: "Division function machines model sharing equally.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student adds 5 to the input instead of dividing, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — adds when the rule specifies division.",
        remediation: "The rule says DIVIDE by 5, not add 5 — 45÷5=9, not 45+5=50."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student subtracts 5 from the input instead of dividing, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — subtracts when the rule specifies division.",
        remediation: "The rule says DIVIDE by 5, not subtract 5 — 45÷5=9, not 45-5=40."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student reports the divisor (5) itself instead of the result of the division.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "5 is the number you DIVIDE by, not the answer itself — compute 45÷5=9, that's the output, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: divide by 5." },
      { level: 2, description: "Identify the input", hint: "The input is 45." },
      { level: 3, description: "Apply the rule", hint: "45 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNDIV-01",
    question: "\\( x \\div 4 = 7 \\). Find \\( x \\).",
    options: [
        { text: "28", correct: true, feedback: "Multiply both sides by 4: 7 × 4 = 28." },
        { text: "3", correct: false, feedback: "You subtracted 4 from 7.", misconceptionId: "E-d15-a" },
        { text: "11", correct: false, feedback: "You added 4 to 7.", misconceptionId: "E-d15-b" },
        { text: "7", correct: false, feedback: "You gave the right‑hand side.", misconceptionId: "E-d15-c" }
      ],
    backward: "Multiply both sides by 4 to undo the division.",
    forward: "Division equations are solved by multiplying.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student subtracts 4 from 7 instead of multiplying to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — subtracts when the inverse of division is multiplication.",
        remediation: "The inverse of DIVIDING by 4 is MULTIPLYING by 4, not subtracting 4 — 7×4=28, not 7-4=3."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student adds 4 to 7 instead of multiplying to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of division is multiplication.",
        remediation: "The inverse of DIVIDING by 4 is MULTIPLYING by 4, not adding 4 — 7×4=28, not 7+4=11."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student reports the right-hand side value (7) itself instead of solving for x.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "7 is the RESULT of x÷4, not x itself — to find x, multiply: 7×4=28, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x is divided by 4." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Multiply both sides by 4." },
      { level: 3, description: "Compute", hint: "7 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRMULT-01",
    question: "Write 'twice a number \\( n \\)' as an expression.",
    options: [
        { text: "\\( 2n \\)", correct: true, feedback: "Twice means 2 times: 2 × n = 2n." },
        { text: "\\( n + 2 \\)", correct: false, feedback: "That's '2 more than n'.", misconceptionId: "E-d16-a" },
        { text: "\\( n^2 \\)", correct: false, feedback: "That's 'n squared'.", misconceptionId: "E-d16-b" },
        { text: "\\( n \\div 2 \\)", correct: false, feedback: "That's 'half of n'.", misconceptionId: "E-d16-c" }
      ],
    backward: "Twice means 2 times.",
    forward: "Expressions like 2n are used in formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student translates 'twice' as addition, writing n+2 instead of the correct multiplication 2n.",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('twice') with an addition expression.",
        remediation: "'Twice' signals MULTIPLICATION by 2, not addition — 'twice a number n' means 2×n (written 2n), not n+2 (which would be '2 more than n')."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student confuses 'twice' (multiply by 2) with 'squared' (multiply by itself), writing n² instead of 2n.",
        rootCause: "Multiplication Type Confused — mixes up multiplying by a constant with raising to a power.",
        remediation: "'Twice a number' means the number TIMES 2 (2×n=2n) — it does NOT mean the number times itself (n×n=n², which would be 'n squared')."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student translates 'twice' as division, writing n÷2 instead of the correct multiplication 2n.",
        rootCause: "Operation Keyword Misread — confuses a multiplication keyword ('twice') with a division expression.",
        remediation: "'Twice' signals MULTIPLICATION by 2, not division — 'twice a number n' means 2×n (written 2n), not n÷2 (which would be 'half of n')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Twice' means multiply by 2." },
      { level: 2, description: "Identify the variable", hint: "The number is n." },
      { level: 3, description: "Write the expression", hint: "2 × n, written as 2n." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQMULT-01",
    question: "Start at 1, multiply by 2 each time. Write the first three terms.",
    options: [
        { text: "1, 2, 4", correct: true, feedback: "1, 1×2=2, 2×2=4." },
        { text: "1, 3, 5", correct: false, feedback: "You added 2 each time.", misconceptionId: "E-d17-a" },
        { text: "1, 2, 6", correct: false, feedback: "You multiplied by 3 at the last step.", misconceptionId: "E-d17-b" },
        { text: "1, 4, 8", correct: false, feedback: "You multiplied by 4 and then by 2.", misconceptionId: "E-d17-c" }
      ],
    backward: "Apply the rule to each term to get the next: 1 → 2 → 4.",
    forward: "Multiplicative sequences grow quickly — think of bacteria or compound interest.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student applies an addition rule (add 2) instead of the stated multiplication rule (multiply by 2).",
        rootCause: "Wrong Rule Type Applied — uses arithmetic (additive) reasoning for a multiplicative (geometric) sequence.",
        remediation: "The rule says MULTIPLY by 2 each time, not add — 1, 1×2=2, 2×2=4, not 1, 1+2=3, 3+2=5."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student applies the multiplication rule inconsistently, using ×2 for one step but ×3 for another.",
        rootCause: "Rule Applied Inconsistently — uses the correct multiplier for some terms but not all.",
        remediation: "Apply the SAME rule (×2) to every term consistently: 1, 1×2=2, 2×2=4 — the third term is 4, not 6 (which would come from multiplying by 3 at that step)."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student uses an inconsistent or incorrect multiplier (×4 then ×2) instead of applying ×2 consistently.",
        rootCause: "Rule Applied Inconsistently — uses a different multiplier for different steps instead of the one stated rule.",
        remediation: "Apply the SAME rule (×2) to every term consistently: 1, 1×2=2, 2×2=4 — not 1, 1×4=4, 4×2=8 (which mixes two different multipliers)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 1; multiply by 2 each time." },
      { level: 2, description: "Find the second term", hint: "1 × 2 = 2." },
      { level: 3, description: "Find the third term", hint: "2 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMSUB-01",
    question: "A shopkeeper had 20 pens. He sold some and now has 8 left. Write an equation and find how many he sold.",
    options: [
        { text: "\\( 20 - s = 8; s = 12 \\)", correct: true, feedback: "Original − sold = left. 20 − s = 8 → s = 12." },
        { text: "\\( s = 28 \\)", correct: false, feedback: "You added 20 + 8.", misconceptionId: "E-d18-a" },
        { text: "\\( s = 8 \\)", correct: false, feedback: "That's the number left.", misconceptionId: "E-d18-b" },
        { text: "\\( s = 20 \\)", correct: false, feedback: "That's the original amount.", misconceptionId: "E-d18-c" }
      ],
    backward: "Total − sold = left.",
    forward: "Thinking algebraically helps solve everyday problems.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student adds the two given numbers (20 and 8) instead of subtracting to isolate the unknown.",
        rootCause: "Inverse Operation Not Applied — adds when solving 20-s=8 requires subtraction.",
        remediation: "To solve 20-s=8, SUBTRACT 8 from 20 (rearranged from the equation) — 20-8=12, not 20+8=28."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student reports the number of pens left (8) instead of solving for the number sold s.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "8 is the number LEFT, not the number sold — solve 20-s=8: s=20-8=12, not 8."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student reports the original number of pens (20) instead of solving for the number sold s.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "20 is the ORIGINAL amount, not the number sold — solve 20-s=8: s=20-8=12, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be s and write the equation", hint: "original - sold = left: 20 - s = 8." },
      { level: 2, description: "Rearrange to find s", hint: "s = original - left." },
      { level: 3, description: "Solve for s", hint: "20 - 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-02",
    question: "50, 45, 40, 35, ___ — what comes next?",
    options: [
        { text: "30", correct: true, feedback: "The pattern decreases by 5 each time. 35 − 5 = 30." },
        { text: "40", correct: false, feedback: "No change.", misconceptionId: "E-d19-a" },
        { text: "25", correct: false, feedback: "You subtracted 10.", misconceptionId: "E-d19-b" },
        { text: "35", correct: false, feedback: "You gave the last term.", misconceptionId: "E-d19-c" }
      ],
    backward: "The constant difference is −5.",
    forward: "Patterns can increase or decrease.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student repeats an earlier term instead of continuing the decreasing pattern by subtracting the common difference.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "To extend the pattern, SUBTRACT the common difference (5) from the last term — 35-5=30, don't just repeat an earlier term (40)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student uses double the actual common difference (10 instead of 5), miscounting the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 50-45=5, 45-40=5, 40-35=5 — the difference is 5, not 10; so 35-5=30, not 35-10=25."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student reports the last known term (35) instead of computing the next term in the pattern.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "The question asks for the NEXT term after 35, not 35 itself — subtract the common difference: 35-5=30, not just 35."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "50-45=5, 45-40=5, 40-35=5." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 5, and the pattern is decreasing." },
      { level: 3, description: "Subtract the difference from the last term", hint: "35 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCADD-01",
    question: "Rule: add 7. Input = 9. What is the output?",
    options: [
        { text: "16", correct: true, feedback: "9 + 7 = 16." },
        { text: "2", correct: false, feedback: "You subtracted 7.", misconceptionId: "E-d20-a" },
        { text: "63", correct: false, feedback: "You multiplied by 7.", misconceptionId: "E-d20-b" },
        { text: "9", correct: false, feedback: "No operation.", misconceptionId: "E-d20-c" }
      ],
    backward: "Simply add 7 to the input.",
    forward: "Function machines help understand operations.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student subtracts 7 from the input instead of adding, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — subtracts when the rule specifies addition.",
        remediation: "The rule says ADD 7, not subtract — 9+7=16, not 9-7=2."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student multiplies the input by 7 instead of adding, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies addition.",
        remediation: "The rule says ADD 7, not multiply by 7 — 9+7=16, not 9×7=63."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (add 7) to the input — the output is not the same as the input: 9+7=16, not 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: add 7." },
      { level: 2, description: "Identify the input", hint: "The input is 9." },
      { level: 3, description: "Apply the rule", hint: "9 + 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNADD-01",
    question: "\\( 8 + x = 20 \\). Find \\( x \\).",
    options: [
        { text: "12", correct: true, feedback: "Subtract 8 from both sides: 20 − 8 = 12." },
        { text: "28", correct: false, feedback: "You added 8 + 20.", misconceptionId: "E-d21-a" },
        { text: "8", correct: false, feedback: "You gave the known number.", misconceptionId: "E-d21-b" },
        { text: "20", correct: false, feedback: "You gave the total.", misconceptionId: "E-d21-c" }
      ],
    backward: "Subtract 8 from both sides.",
    forward: "Equations with addition are solved by subtraction.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student adds 8 and 20 instead of subtracting to isolate x, applying the opposite of the required inverse operation.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 8, you must SUBTRACT 8 (the inverse operation) — 20-8=12, not 20+8=28."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student reports the known number in the equation (8) itself instead of the result of the subtraction.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "8 is the number you SUBTRACT, not the answer itself — compute 20-8=12, that's the value of x, not 8."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student reports the total (20) instead of solving for x.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "20 is the TOTAL (8+x), not x itself — to find x, subtract: 20-8=12, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "8 is added to x." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Subtract 8 from both sides." },
      { level: 3, description: "Compute", hint: "20 - 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRSUB-01",
    question: "Write '5 less than \\( y \\)' as an expression.",
    options: [
        { text: "\\( y - 5 \\)", correct: true, feedback: "Less than means subtract from the variable: y − 5." },
        { text: "\\( 5 - y \\)", correct: false, feedback: "That's 'y less than 5'.", misconceptionId: "E-d22-a" },
        { text: "\\( y + 5 \\)", correct: false, feedback: "That's '5 more than y'.", misconceptionId: "E-d22-b" },
        { text: "\\( 5y \\)", correct: false, feedback: "That's '5 times y'.", misconceptionId: "E-d22-c" }
      ],
    backward: "Phrasing matters — '5 less than y' is not the same as '5 minus y'.",
    forward: "Correct translation is essential for solving word problems.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student reverses the order of subtraction, writing 5-y instead of the correct y-5.",
        rootCause: "Subtraction Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'5 less than y' means START with y and SUBTRACT 5: y-5 — not 5-y, which would mean 'y less than 5' (start with 5, subtract y)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student translates 'less than' as addition, writing y+5 instead of the correct subtraction y-5.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with an addition expression.",
        remediation: "'Less than' signals SUBTRACTION, not addition — '5 less than y' means y-5, not y+5 (which would be phrased as '5 more than y')."
      },
      {
        misconceptionId: "E-d22-c",
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
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQADD-01",
    question: "Start at 6, add 4 each time. What is the 5th term?",
    options: [
        { text: "22", correct: true, feedback: "6 (1st), 10, 14, 18, 22 (5th)." },
        { text: "20", correct: false, feedback: "You missed one add.", misconceptionId: "E-d23-a" },
        { text: "24", correct: false, feedback: "You added 4 too many.", misconceptionId: "E-d23-b" },
        { text: "18", correct: false, feedback: "That's the 4th term.", misconceptionId: "E-d23-c" }
      ],
    backward: "List all terms to the 5th: 6, 10, 14, 18, 22.",
    forward: "Sequences are predictable once you know the rule.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student makes an arithmetic slip, applying the rule one fewer time than needed and landing on 20 instead of 22.",
        rootCause: "Rule Applied Too Few Times — stops the repeated addition one step short of the requested term.",
        remediation: "List all terms carefully: 6, 6+4=10, 10+4=14, 14+4=18, 18+4=22 (5th term) — that's FOUR additions from the 1st term to reach the 5th, not three."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student applies the rule one extra time, landing on 24 instead of the correct 22.",
        rootCause: "Rule Applied Too Many Times — continues the repeated addition one step past the requested term.",
        remediation: "List all terms carefully: 6, 6+4=10, 10+4=14, 14+4=18, 18+4=22 (5th term) — stop at the 5th term (22), don't add once more to get 24."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student stops one term early, reporting the 4th term (18) instead of the requested 5th term (22).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 6, 10, 14, 18 is the 4TH term, 22 is the 5TH term — the question asks for the 5th term (22), not the 4th (18)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 6; add 4 each time." },
      { level: 2, description: "List the terms in order", hint: "6, 10, 14, 18, ... continue to the 5th term." },
      { level: 3, description: "Confirm the 5th term", hint: "After 6, 10, 14, 18, what comes next?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMMULT-01",
    question: "A book costs ₹x. Two such books cost ₹50. Write an equation and find x.",
    options: [
        { text: "\\( 2x = 50; x = 25 \\)", correct: true, feedback: "Two books cost twice the price: 2x = 50 → x = 25." },
        { text: "\\( x = 50 \\)", correct: false, feedback: "That's the total for two books.", misconceptionId: "E-d24-a" },
        { text: "\\( x = 100 \\)", correct: false, feedback: "You doubled 50.", misconceptionId: "E-d24-b" },
        { text: "\\( x = 2 \\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-c" }
      ],
    backward: "Two books → 2 times the price = total cost.",
    forward: "Algebra lets you solve shopping problems quickly.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student reports the total cost of two books (50) instead of solving for the cost of one book x.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "50 is the cost of TWO books, not one — solve 2x=50 by dividing: x=50÷2=25, not 50."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student multiplies 50 by 2 instead of dividing to isolate x, applying the wrong inverse operation.",
        rootCause: "Wrong Inverse Operation Selected — multiplies when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 2 is DIVIDING by 2, not multiplying again — 50÷2=25, not 50×2=100."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student reports the number of books (2) itself instead of solving for the price of one book x.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the equation with the answer.",
        remediation: "2 is the NUMBER OF BOOKS (the multiplier), not the price — solve 2x=50 by dividing: x=50÷2=25, not 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "2 books × price = total: 2x = 50." },
      { level: 2, description: "Identify the inverse operation", hint: "Divide both sides by 2." },
      { level: 3, description: "Solve for x", hint: "50 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATARITH-01",
    question: "2, 4, 6, 8, ___ — extend the pattern.",
    options: [
        { text: "10", correct: true, feedback: "Add 2 each time." },
        { text: "9", correct: false, feedback: "You added 1 instead of 2.", misconceptionId: "E-r1-a" },
        { text: "12", correct: false, feedback: "You added 4 instead of 2.", misconceptionId: "E-r1-b" },
        { text: "16", correct: false, feedback: "You doubled the last term instead of adding the common difference.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student uses the wrong common difference (1 instead of 2), underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 4-2=2, 6-4=2, 8-6=2 — the difference is 2, not 1; so 8+2=10, not 9."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student uses the wrong common difference (4 instead of 2), overestimating the gap.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 4-2=2, 6-4=2, 8-6=2 — the difference is 2, not 4; so 8+2=10, not 12."
      },
      {
        misconceptionId: "E-r1-c",
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
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCMULT-01",
    question: "Rule: multiply by 3. Input = 7. Output?",
    options: [
        { text: "21", correct: true, feedback: "7 × 3 = 21." },
        { text: "10", correct: false, feedback: "You added 3 instead of multiplying.", misconceptionId: "E-r2-a" },
        { text: "4", correct: false, feedback: "You subtracted 3 instead of multiplying.", misconceptionId: "E-r2-b" },
        { text: "7", correct: false, feedback: "No operation performed.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student adds 3 to the input instead of multiplying, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — adds when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 3, not add 3 — 7×3=21, not 7+3=10."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student subtracts 3 from the input instead of multiplying, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — subtracts when the rule specifies multiplication.",
        remediation: "The rule says MULTIPLY by 3, not subtract 3 — 7×3=21, not 7-3=4."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student reports the input itself as the output, without applying the rule at all.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operation.",
        remediation: "You must APPLY the rule (multiply by 3) to the input — the output is not the same as the input: 7×3=21, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: multiply by 3." },
      { level: 2, description: "Identify the input", hint: "The input is 7." },
      { level: 3, description: "Apply the rule", hint: "7 × 3 = ?" }
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
    question: "Solve \\( x - 9 = 11 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "11 + 9 = 20." },
        { text: "2", correct: false, feedback: "You subtracted 9 from 11.", misconceptionId: "E-r3-a" },
        { text: "9", correct: false, feedback: "You only gave the number being subtracted.", misconceptionId: "E-r3-b" },
        { text: "11", correct: false, feedback: "You gave the right-hand side, not the solved value.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student subtracts 9 from 11 instead of adding to isolate x, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO subtracting 9, you must ADD 9 (the inverse operation) — 11+9=20, not 11-9=2."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student reports the number being subtracted (9) itself instead of the result of the addition.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "9 is the number you ADD, not the answer itself — compute 11+9=20, that's the value of x, not 9."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student reports the right-hand side value (11) itself instead of solving for x.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "11 is the RESULT of x-9, not x itself — to find x, add: 11+9=20, not 11."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x has 9 subtracted from it." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Add 9 to both sides." },
      { level: 3, description: "Compute", hint: "11 + 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRADD-01",
    question: "Write '7 more than \\( t \\)' as an expression.",
    options: [
        { text: "\\( t + 7 \\)", correct: true, feedback: "More than means add." },
        { text: "\\( 7t \\)", correct: false, feedback: "That means 7 times t.", misconceptionId: "E-r4-a" },
        { text: "\\( t - 7 \\)", correct: false, feedback: "That means 7 less than t.", misconceptionId: "E-r4-b" },
        { text: "\\( 7 - t \\)", correct: false, feedback: "That means t less than 7.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student translates 'more than' as multiplication, writing 7t instead of the correct addition t+7.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a multiplication expression.",
        remediation: "'More than' signals ADDITION, not multiplication — '7 more than t' means t+7, not 7×t (which would be phrased as '7 times t')."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student translates 'more than' as subtraction, writing t-7 instead of the correct addition t+7.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('more than') with a subtraction expression.",
        remediation: "'More than' signals ADDITION, not subtraction — '7 more than t' means t+7, not t-7 (which would be phrased as '7 less than t')."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student reverses the order AND changes the operation, writing 7-t instead of the correct t+7.",
        rootCause: "Order and Operation Both Reversed — misreads both which term comes first and which operation applies.",
        remediation: "'7 more than t' means t+7 (add 7 to t) — 7-t would mean 't less than 7' (subtract t from 7), a completely different expression."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'More than' signals addition." },
      { level: 2, description: "Identify the variable and the added amount", hint: "The variable is t; the amount added is 7." },
      { level: 3, description: "Write the expression", hint: "t + 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQADD-01",
    question: "Start at 3, add 5 each time. What is the 4th term?",
    options: [
        { text: "18", correct: true, feedback: "3, 8, 13, 18." },
        { text: "15", correct: false, feedback: "You missed one add.", misconceptionId: "E-r5-a" },
        { text: "20", correct: false, feedback: "You added 5 too many.", misconceptionId: "E-r5-b" },
        { text: "23", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student applies the rule one fewer time than needed, landing on 15 instead of the correct 18.",
        rootCause: "Rule Applied Too Few Times — stops the repeated addition one step short of the requested term.",
        remediation: "List all terms carefully: 3, 3+5=8, 8+5=13, 13+5=18 (4th term) — that's THREE additions from the 1st term to reach the 4th, not two."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student applies the rule one extra time, landing on 20 instead of the correct 18.",
        rootCause: "Rule Applied Too Many Times — continues the repeated addition one step past the requested term.",
        remediation: "List all terms carefully: 3, 3+5=8, 8+5=13, 13+5=18 (4th term) — stop at the 4th term (18), don't add once more to get 20."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student computes one term too far, reporting the 5th term (23) instead of the requested 4th term (18).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 3, 8, 13, 18 is the 4TH term, 23 is the 5TH — the question asks for the 4th term (18), not the 5th (23)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 3; add 5 each time." },
      { level: 2, description: "List the terms in order", hint: "3, 8, 13, ... continue to the 4th term." },
      { level: 3, description: "Confirm the 4th term", hint: "After 3, 8, 13, what comes next?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "EQNMULT-01",
    question: "\\( 3n = 21 \\). Find \\( n \\).",
    options: [
        { text: "7", correct: true, feedback: "21 ÷ 3 = 7." },
        { text: "24", correct: false, feedback: "You added 3 to 21.", misconceptionId: "E-r6-a" },
        { text: "18", correct: false, feedback: "You subtracted 3 from 21.", misconceptionId: "E-r6-b" },
        { text: "3", correct: false, feedback: "You gave the multiplier.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student adds 3 to 21 instead of dividing to isolate n, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 3 is DIVIDING by 3, not adding 3 — 21÷3=7, not 21+3=24."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student subtracts 3 from 21 instead of dividing to isolate n, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — subtracts when the inverse of multiplication is division.",
        remediation: "The inverse of MULTIPLYING by 3 is DIVIDING by 3, not subtracting 3 — 21÷3=7, not 21-3=18."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reports the multiplier (3) itself instead of the result of the division.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "3 is the number you DIVIDE by, not the answer itself — compute 21÷3=7, that's the value of n, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "n is multiplied by 3." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Divide both sides by 3." },
      { level: 3, description: "Compute", hint: "21 ÷ 3 = ?" }
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
    question: "21, 18, 15, 12, ___ — next term?",
    options: [
        { text: "9", correct: true, feedback: "Subtract 3 each time." },
        { text: "10", correct: false, feedback: "You subtracted 2 instead of 3.", misconceptionId: "E-r7-a" },
        { text: "15", correct: false, feedback: "You repeated an earlier term instead of continuing the pattern.", misconceptionId: "E-r7-b" },
        { text: "6", correct: false, feedback: "You subtracted 6 instead of 3.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student uses the wrong common difference (2 instead of 3), underestimating the gap between consecutive terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 21-18=3, 18-15=3, 15-12=3 — the difference is 3, not 2; so 12-3=9, not 10."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student repeats an earlier term in the sequence instead of continuing the decreasing pattern.",
        rootCause: "Pattern Extension Step Omitted — fails to apply the rule to generate a new term.",
        remediation: "To extend the pattern, SUBTRACT the common difference (3) from the last term — 12-3=9, don't repeat an earlier term (15)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student uses double the actual common difference (6 instead of 3), overestimating the gap between terms.",
        rootCause: "Common Difference Miscounted — doesn't correctly verify the constant gap between terms before extending.",
        remediation: "Check the difference between consecutive terms: 21-18=3, 18-15=3, 15-12=3 — the difference is 3, not 6; so 12-3=9, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between consecutive terms", hint: "21-18=3, 18-15=3, 15-12=3." },
      { level: 2, description: "Confirm the pattern is constant", hint: "Every gap is 3, and the pattern is decreasing." },
      { level: 3, description: "Subtract the difference from the last term", hint: "12 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCSUB-01",
    question: "Rule: subtract 4. Input = 20. Output?",
    options: [
        { text: "16", correct: true, feedback: "20 − 4 = 16." },
        { text: "24", correct: false, feedback: "You added 4 instead of subtracting.", misconceptionId: "E-r8-a" },
        { text: "5", correct: false, feedback: "You divided by 4.", misconceptionId: "E-r8-b" },
        { text: "80", correct: false, feedback: "You multiplied by 4.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student adds 4 to the input instead of subtracting, applying the opposite operation to the rule.",
        rootCause: "Operation Reversed — adds when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 4, not add 4 — 20-4=16, not 20+4=24."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student divides the input by 4 instead of subtracting, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — divides when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 4, not divide by 4 — 20-4=16, not 20÷4=5."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student multiplies the input by 4 instead of subtracting, applying the wrong operation to the rule.",
        rootCause: "Operation Substituted — multiplies when the rule specifies subtraction.",
        remediation: "The rule says SUBTRACT 4, not multiply by 4 — 20-4=16, not 20×4=80."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The rule is: subtract 4." },
      { level: 2, description: "Identify the input", hint: "The input is 20." },
      { level: 3, description: "Apply the rule", hint: "20 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNDIV-01",
    question: "\\( x \\div 3 = 6 \\). Find \\( x \\).",
    options: [
        { text: "18", correct: true, feedback: "6 × 3 = 18." },
        { text: "2", correct: false, feedback: "You divided 6 by 3 instead of multiplying.", misconceptionId: "E-r9-a" },
        { text: "9", correct: false, feedback: "You added 3 to 6.", misconceptionId: "E-r9-b" },
        { text: "3", correct: false, feedback: "You gave the divisor, not the solved value.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student divides 6 by 3 instead of multiplying to isolate x, applying the same operation again instead of the inverse.",
        rootCause: "Inverse Operation Not Applied — repeats the operation in the equation instead of applying its inverse.",
        remediation: "To UNDO dividing by 3, you must MULTIPLY by 3 (the inverse operation) — 6×3=18, not 6÷3=2."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student adds 3 to 6 instead of multiplying to isolate x, applying an unrelated operation.",
        rootCause: "Wrong Inverse Operation Selected — adds when the inverse of division is multiplication.",
        remediation: "The inverse of DIVIDING by 3 is MULTIPLYING by 3, not adding 3 — 6×3=18, not 6+3=9."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student reports the divisor (3) itself instead of the result of the multiplication.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "3 is the number x is DIVIDED BY, not the answer itself — compute 6×3=18, that's the value of x, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation being undone", hint: "x is divided by 3." },
      { level: 2, description: "Apply the inverse operation to both sides", hint: "Multiply both sides by 3." },
      { level: 3, description: "Compute", hint: "6 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRDIV-01",
    question: "Write 'the quotient of \\( m \\) and 5' as an expression.",
    options: [
        { text: "\\( m \\div 5 \\)", correct: true, feedback: "Quotient means divide." },
        { text: "\\( 5m \\)", correct: false, feedback: "That's the product, not the quotient.", misconceptionId: "E-r10-a" },
        { text: "\\( m - 5 \\)", correct: false, feedback: "That's the difference, not the quotient.", misconceptionId: "E-r10-b" },
        { text: "\\( 5 \\div m \\)", correct: false, feedback: "That's the order reversed.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student translates 'quotient' as multiplication, writing 5m instead of the correct division m÷5.",
        rootCause: "Operation Keyword Misread — confuses a division keyword ('quotient') with a multiplication expression.",
        remediation: "'Quotient' signals DIVISION, not multiplication — 'the quotient of m and 5' means m÷5, not 5×m (which would be 'the product of 5 and m')."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student translates 'quotient' as subtraction, writing m-5 instead of the correct division m÷5.",
        rootCause: "Operation Keyword Misread — confuses a division keyword ('quotient') with a subtraction expression.",
        remediation: "'Quotient' signals DIVISION, not subtraction — 'the quotient of m and 5' means m÷5, not m-5 (which would be 'the difference of m and 5')."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student reverses the order of division, writing 5÷m instead of the correct m÷5.",
        rootCause: "Division Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'The quotient of m and 5' means m DIVIDED BY 5: m÷5 — not 5÷m, which would be 'the quotient of 5 and m' (5 divided by m)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the keyword", hint: "'Quotient' signals division." },
      { level: 2, description: "Identify which term is divided by which", hint: "'m and 5' means m divided by 5." },
      { level: 3, description: "Write the expression", hint: "m ÷ 5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQMULT-01",
    question: "Start at 1, double each time. What is the 3rd term?",
    options: [
        { text: "4", correct: true, feedback: "1, 2, 4." },
        { text: "2", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-r11-a" },
        { text: "6", correct: false, feedback: "You added 2 each time instead of doubling.", misconceptionId: "E-r11-b" },
        { text: "8", correct: false, feedback: "You doubled one extra time.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student stops one term early, reporting the 2nd term (2) instead of the requested 3rd term (4).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 1 is the 1st term, 2 is the 2nd term, 4 is the 3RD term — the question asks for the 3rd term (4), not the 2nd (2)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student applies an addition rule (add 2) instead of the stated multiplication rule (double).",
        rootCause: "Wrong Rule Type Applied — uses arithmetic (additive) reasoning for a multiplicative (geometric) sequence.",
        remediation: "'Double' means MULTIPLY by 2 each time, not add — 1, 1×2=2, 2×2=4, not 1, 1+2=3, 3+2=5."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student applies the doubling rule one extra time, landing on 8 (the 4th term) instead of the requested 3rd term (4).",
        rootCause: "Rule Applied Too Many Times — continues doubling one step past the requested term.",
        remediation: "List all terms carefully: 1, 1×2=2 (2nd), 2×2=4 (3rd) — stop at the 3rd term (4), don't double once more to get 8 (which would be the 4th term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting value and rule", hint: "Start at 1; double each time." },
      { level: 2, description: "Find the second term", hint: "1 × 2 = 2." },
      { level: 3, description: "Find the third term", hint: "2 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMADD-01",
    question: "Some oranges plus 4 more equals 12. How many oranges at first?",
    options: [
        { text: "8", correct: true, feedback: "x + 4 = 12 → x = 8." },
        { text: "16", correct: false, feedback: "You added 12 + 4.", misconceptionId: "E-r12-a" },
        { text: "4", correct: false, feedback: "That's the number added, not the original amount.", misconceptionId: "E-r12-b" },
        { text: "12", correct: false, feedback: "That's the final amount, not the original.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student adds the two given numbers (12 and 4) instead of subtracting to isolate the unknown.",
        rootCause: "Inverse Operation Not Applied — adds when solving x+4=12 requires subtraction.",
        remediation: "To solve x+4=12, SUBTRACT 4 from both sides (the inverse of adding 4) — 12-4=8, not 12+4=16."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student reports the number added (4) instead of solving for the original number of oranges x.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "4 is the amount ADDED, not the original number — solve x+4=12 by subtracting: x=12-4=8, not 4."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student reports the final total (12) instead of solving for the original number of oranges x.",
        rootCause: "Given Number Reported Instead of Unknown — confuses a value from the problem statement with the value being solved for.",
        remediation: "12 is the FINAL total, not the original number — solve x+4=12 by subtracting: x=12-4=8, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be x and write the equation", hint: "x + 4 = 12." },
      { level: 2, description: "Identify the inverse operation", hint: "Subtract 4 from both sides." },
      { level: 3, description: "Solve for x", hint: "12 - 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.B.7"]
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

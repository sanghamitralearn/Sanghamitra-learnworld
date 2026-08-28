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
    skillId: "PATGEOM-01",
    question: "A pattern follows the rule ×3 each time: 2, 6, 18, 54, … What is the 6th term?",
    options: [
        { text: "486", correct: true, feedback: "4th=54, 5th=54×3=162, 6th=162×3=486." },
        { text: "162", correct: false, feedback: "That's the 5th term, not the 6th.", misconceptionId: "E-w1-a" },
        { text: "500", correct: false, feedback: "Not correct.", misconceptionId: "E-w1-b" },
        { text: "400", correct: false, feedback: "Incorrect.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "First find the 5th term, then multiply by 3 to get the 6th term.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student stops one term early, reporting the 5th term (162) instead of the requested 6th term (486).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 54 is the 4th term, 162 is the 5TH term, 486 is the 6TH term — the question asks for the 6th term (486), not the 5th (162)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student guesses a nearby round number instead of correctly applying the ×3 rule from the 4th term.",
        rootCause: "Rule Not Applied Correctly — estimates the answer instead of computing it with the stated rule.",
        remediation: "Apply the rule (×3) precisely, not by estimation: 54×3=162 (5th term), then 162×3=486 (6th term) — not a rounded guess like 500."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student makes an arithmetic slip while multiplying, landing on an incorrect value.",
        rootCause: "Computation Error — correct approach, but the multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 54×3=162 (5th term), then 162×3=486 (6th term), not 400."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule and the last known term", hint: "Rule: ×3; 4th term = 54." },
      { level: 2, description: "Find the 5th term", hint: "54 × 3 = 162." },
      { level: 3, description: "Find the 6th term", hint: "162 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCTWOSTEP-01",
    question: "Rule: add 3, then multiply by 2. Input = 5. What is the output?",
    options: [
        { text: "16", correct: true, feedback: "(5 + 3) × 2 = 8 × 2 = 16." },
        { text: "13", correct: false, feedback: "You only added 3 and forgot to multiply.", misconceptionId: "E-w2-a" },
        { text: "10", correct: false, feedback: "You multiplied first then added? (5×2)+3=13? Actually 13, not 10. So incorrect.", misconceptionId: "E-w2-b" },
        { text: "8", correct: false, feedback: "You only added 3.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Do the operations in order: first add 3, then multiply the result by 2.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student adds 3 and 5 (getting 8) but then adds again instead of multiplying, or otherwise stops before applying the second operation correctly.",
        rootCause: "Second Step Omitted — completes the first step but fails to apply the second operation.",
        remediation: "The rule has TWO steps — after adding 3 (5+3=8), you must ALSO multiply by 2: 8×2=16, not just stop at 13."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student performs the two operations in the wrong order (multiply first, then add) instead of the stated order (add first, then multiply).",
        rootCause: "Operation Order Reversed — applies the two steps in the wrong sequence.",
        remediation: "The rule says ADD 3 FIRST, then multiply by 2 — (5+3)×2=16, not (5×2)+3, which reverses the stated order."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student performs only the first operation (add 3) and stops, without applying the second operation (multiply by 2).",
        rootCause: "Second Step Omitted — completes the first step but fails to apply the second operation.",
        remediation: "The rule has TWO steps — after adding 3 (5+3=8), you must ALSO multiply by 2: 8×2=16, not just the result of the first step (8)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first step", hint: "5 + 3 = 8." },
      { level: 2, description: "Apply the second step to the result", hint: "Multiply the result (8) by 2." },
      { level: 3, description: "Compute", hint: "8 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 3x + 5 = 20 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 5: 3x = 15. Divide by 3: x = 5." },
        { text: "15", correct: false, feedback: "You only subtracted 5.", misconceptionId: "E-w3-a" },
        { text: "6", correct: false, feedback: "Incorrect division.", misconceptionId: "E-w3-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "First subtract 5 from both sides, then divide by 3.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student subtracts 5 to get 3x=15 but stops there, reporting 15 instead of dividing by 3 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving 3x+5=20 requires TWO steps — after subtracting 5 (3x=15), you must ALSO divide by 3: 15÷3=5, not just 15."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student makes an arithmetic slip in the division step, landing on 6 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 3x=15, then 15÷3=5, not 6."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student applies the two inverse steps in the wrong order or with the wrong operation, landing on an incorrect value.",
        rootCause: "Inverse Operations Applied Incorrectly — doesn't correctly reverse the order of operations used to build the equation.",
        remediation: "To undo 3x+5=20: FIRST subtract 5 from both sides (3x=15), THEN divide by 3 (x=5) — following the reverse order of the original operations."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 5 from both sides: 20-5=15." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 3." },
      { level: 3, description: "Compute", hint: "15 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRTWOSTEP-01",
    question: "Write 'twice a number \\( n \\), decreased by 7' as an expression.",
    options: [
        { text: "\\( 2n - 7 \\)", correct: true, feedback: "Twice n means 2n. Decreased by 7 means subtract 7." },
        { text: "\\( 2(n - 7) \\)", correct: false, feedback: "That means twice the result of n minus 7 — a different meaning.", misconceptionId: "E-w4-a" },
        { text: "\\( 2n + 7 \\)", correct: false, feedback: "That's increased by 7.", misconceptionId: "E-w4-b" },
        { text: "\\( 7 - 2n \\)", correct: false, feedback: "The order is wrong.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "'Twice a number' means 2n. 'Decreased by' means subtract.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student groups the subtraction inside parentheses with the multiplication, writing 2(n-7) instead of the correct 2n-7.",
        rootCause: "Grouping Misapplied — applies the multiplier to the whole subtraction instead of just to n.",
        remediation: "'Twice n, decreased by 7' means take 2n FIRST, THEN subtract 7: 2n-7 — not 2(n-7), which means 'twice the result of (n minus 7)', a different quantity."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student translates 'decreased by' as addition, writing 2n+7 instead of the correct subtraction 2n-7.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('decreased by') with an addition expression.",
        remediation: "'Decreased by' signals SUBTRACTION, not addition — 'twice n, decreased by 7' means 2n-7, not 2n+7 (which would be 'increased by 7')."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student reverses the order of subtraction, writing 7-2n instead of the correct 2n-7.",
        rootCause: "Subtraction Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'Twice n, decreased by 7' means START with 2n and SUBTRACT 7: 2n-7 — not 7-2n, which would mean '2n less than 7'."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'twice a number n'", hint: "Twice n means 2n." },
      { level: 2, description: "Identify the second operation", hint: "'Decreased by 7' means subtract 7, applied to 2n as a whole (not just n)." },
      { level: 3, description: "Write the expression", hint: "2n - 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQTWOSTEP-01",
    question: "Start at 4. Rule: multiply by 2, then add 1. Find the 3rd term.",
    options: [
        { text: "19", correct: true, feedback: "1st=4. 2nd=4×2+1=9. 3rd=9×2+1=19." },
        { text: "9", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-w5-a" },
        { text: "13", correct: false, feedback: "Incorrect rule applied.", misconceptionId: "E-w5-b" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Apply the rule step by step: first 4×2+1=9, then 9×2+1=19.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student stops one term early, reporting the 2nd term (9) instead of the requested 3rd term (19).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 4 is the 1st term, 9 is the 2nd term, 19 is the 3RD term — the question asks for the 3rd term (19), not the 2nd (9)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student applies only one of the two operations, or applies them in the wrong order, leading to an incorrect term.",
        rootCause: "Two-Step Rule Applied Incorrectly — omits a step or reverses the operation order.",
        remediation: "The rule has TWO steps applied IN ORDER: multiply by 2, THEN add 1 — 4×2+1=9, then 9×2+1=19; don't skip a step or reverse the order."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student makes an arithmetic slip while applying the two-step rule twice, landing on an incorrect value.",
        rootCause: "Computation Error — correct approach, but the repeated calculation is carried out incorrectly.",
        remediation: "Recompute step by step: 4×2+1=9 (2nd term), 9×2+1=19 (3rd term), not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the rule to get the 2nd term", hint: "4×2+1 = 9." },
      { level: 2, description: "Apply the rule to the 2nd term", hint: "9×2+1 = ?" },
      { level: 3, description: "Confirm this is the 3rd term", hint: "1st=4, 2nd=9, 3rd=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-01",
    question: "A number multiplied by 4, then 3 is subtracted, gives 13. Write an equation and find the number.",
    options: [
        { text: "\\( 4n - 3 = 13; n = 4 \\)", correct: true, feedback: "4n − 3 = 13 → add 3 → 4n = 16 → n = 4." },
        { text: "\\( 4n - 3 = 13; n = 5 \\)", correct: false, feedback: "Incorrect solution.", misconceptionId: "E-w6-a" },
        { text: "\\( 3n - 4 = 13; n = 6 \\)", correct: false, feedback: "Wrong order in the equation.", misconceptionId: "E-w6-b" },
        { text: "\\( 4n + 3 = 13; n = 2.5 \\)", correct: false, feedback: "Wrong operation (added instead of subtracted).", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Let the number be n. Multiply by 4 gives 4n. Subtract 3 gives 4n−3. Set equal to 13.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student writes the correct equation but makes an arithmetic slip solving it, landing on n=5 instead of the correct n=4.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 4n-3=13, add 3 to both sides: 4n=16, divide by 4: n=4, not 5."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student swaps the multiplier and the subtracted amount, writing 3n-4 instead of the correct 4n-3.",
        rootCause: "Coefficients Swapped — mixes up which number is the multiplier and which is subtracted.",
        remediation: "The number is MULTIPLIED BY 4 (giving 4n), then 3 is SUBTRACTED (giving 4n-3) — not 3n-4, which swaps the roles of 4 and 3."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student translates 'subtracted' as addition, writing 4n+3 instead of the correct 4n-3.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('subtracted') with an addition expression.",
        remediation: "'Then 3 is subtracted' means SUBTRACT 3, not add — the equation should be 4n-3=13, not 4n+3=13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Let the unknown be n and write the equation", hint: "4n - 3 = 13." },
      { level: 2, description: "Undo the subtraction first", hint: "Add 3 to both sides: 4n = 16." },
      { level: 3, description: "Undo the multiplication", hint: "16 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATTWOSTEP-01",
    question: "Identify the rule and find the 5th term: 10, 15, 25, 45, …",
    options: [
        { text: "85", correct: true, feedback: "Rule: ×2 − 5. 10×2−5=15, 15×2−5=25, 25×2−5=45, 45×2−5=85." },
        { text: "65", correct: false, feedback: "You added 20 to 45.", misconceptionId: "E-w7-a" },
        { text: "75", correct: false, feedback: "You used a wrong rule.", misconceptionId: "E-w7-b" },
        { text: "90", correct: false, feedback: "You doubled 45.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Check how each term relates to the previous one: 10×2−5=15, etc.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student treats the pattern as arithmetic (constant addition), adding 20 to the last term instead of applying the actual two-step multiplicative rule.",
        rootCause: "Non-Arithmetic Pattern Misidentified as Arithmetic — applies a constant-difference strategy to a pattern that isn't arithmetic.",
        remediation: "Check the differences: 15-10=5, 25-15=10, 45-25=20 — these are NOT constant, so this isn't a simple add-the-same-amount pattern; the actual rule is ×2−5, so the next term is 45×2−5=85, not 45+20=65."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student identifies an incorrect rule that doesn't actually fit all the given terms.",
        rootCause: "Pattern Rule Not Verified — picks a rule without checking it against every given term.",
        remediation: "VERIFY the rule against every term: 10×2−5=15 ✓, 15×2−5=25 ✓, 25×2−5=45 ✓ — the rule ×2−5 fits all of them; applying it to 45 gives 85, not 75."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student doubles the last term without also subtracting 5, applying only half of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step (double) but forgets the second (subtract 5).",
        remediation: "The rule is ×2 THEN −5, not just ×2 — 45×2=90 is only the first step; you must also subtract 5: 90−5=85, not 90."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test a rule against the first two terms", hint: "10×2−5=15 — does this rule work?" },
      { level: 2, description: "Verify the rule against the remaining terms", hint: "15×2−5=25, 25×2−5=45 — confirmed." },
      { level: 3, description: "Apply the rule to the last term", hint: "45×2−5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "The output is 22. The rule is: multiply by 3, then subtract 5. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: add 5 → 27; divide by 3 → 9." },
        { text: "71", correct: false, feedback: "You did 22×3+5 = 71 — wrong reversal.", misconceptionId: "E-w8-a" },
        { text: "6", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-w8-b" },
        { text: "12", correct: false, feedback: "Incorrect.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Reverse the operations in reverse order: first add 5 to the output, then divide by 3.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student applies the ORIGINAL rule (×3 then −5) to the output instead of reversing it, leading to a drastically wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: add 5 (undoing subtract 5), then divide by 3 (undoing multiply by 3) — 22+5=27, 27÷3=9, not 22×3+5=71."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student reverses only one of the two steps, or applies the reversal in the wrong order, leading to an incorrect input.",
        rootCause: "Reversal Steps Incomplete or Misordered — doesn't correctly undo both operations in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'subtract 5' by adding 5 (22+5=27), THEN undo 'multiply by 3' by dividing by 3 (27÷3=9) — not skipping a step or reversing the order."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 12 instead of the correct 9.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 22+5=27, then 27÷3=9, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'subtract 5' — undo it by adding 5: 22+5=27." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'multiply by 3' — undo it by dividing by 3." },
      { level: 3, description: "Compute", hint: "27 ÷ 3 = ?" }
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
    skillId: "PATTWOSTEP-01",
    question: "A pattern follows the rule ×2+1: 1, 3, 7, 15, … What is the 6th term?",
    options: [
        { text: "63", correct: true, feedback: "4th=15, 5th=15×2+1=31, 6th=31×2+1=63." },
        { text: "31", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-d1-a" },
        { text: "62", correct: false, feedback: "You doubled but forgot to add 1.", misconceptionId: "E-d1-b" },
        { text: "65", correct: false, feedback: "Incorrect.", misconceptionId: "E-d1-c" }
      ],
    backward: "Apply the rule to each term to get the next one.",
    forward: "Two‑step rules are common in real‑life growth patterns.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student stops one term early, reporting the 5th term (31) instead of the requested 6th term (63).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 15 is the 4th term, 31 is the 5TH term, 63 is the 6TH term — the question asks for the 6th term (63), not the 5th (31)."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student doubles the 5th term but forgets to add 1, applying only half of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step (double) but forgets the second (add 1).",
        remediation: "The rule is ×2 THEN +1, not just ×2 — 31×2=62 is only the first step; you must also add 1: 62+1=63, not 62."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student makes an arithmetic slip while applying the two-step rule, landing on an incorrect value.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 31×2=62, then 62+1=63, not 65."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the 5th term", hint: "15×2+1 = 31." },
      { level: 2, description: "Apply the rule to the 5th term", hint: "31×2+1 = ?" },
      { level: 3, description: "Confirm this is the 6th term", hint: "4th=15, 5th=31, 6th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCTWOSTEP-01",
    question: "Rule: subtract 4, then divide by 2. Input = 14. What is the output?",
    options: [
        { text: "5", correct: true, feedback: "(14 − 4) ÷ 2 = 10 ÷ 2 = 5." },
        { text: "10", correct: false, feedback: "You only subtracted 4.", misconceptionId: "E-d2-a" },
        { text: "7", correct: false, feedback: "You divided 14 by 2 then subtracted 4? That's 3.", misconceptionId: "E-d2-b" },
        { text: "9", correct: false, feedback: "Incorrect order of operations.", misconceptionId: "E-d2-c" }
      ],
    backward: "Follow the order: first subtract 4, then divide the result by 2.",
    forward: "Two‑step function machines model more complex processes.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student performs only the first operation (subtract 4) and stops, without applying the second operation (divide by 2).",
        rootCause: "Second Step Omitted — completes the first step but fails to apply the second operation.",
        remediation: "The rule has TWO steps — after subtracting 4 (14-4=10), you must ALSO divide by 2: 10÷2=5, not just the result of the first step (10)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student performs the two operations in the wrong order (divide first, then subtract) instead of the stated order (subtract first, then divide).",
        rootCause: "Operation Order Reversed — applies the two steps in the wrong sequence.",
        remediation: "The rule says SUBTRACT 4 FIRST, then divide by 2 — (14-4)÷2=5, not (14÷2)-4, which reverses the stated order."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student makes an error in applying the sequence of operations, landing on an incorrect result.",
        rootCause: "Operation Order Reversed — doesn't correctly apply the two steps in the stated order.",
        remediation: "Follow the stated order exactly: SUBTRACT 4 first (14-4=10), THEN divide by 2 (10÷2=5) — not 9, which comes from a different (incorrect) sequence."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first step", hint: "14 - 4 = 10." },
      { level: 2, description: "Apply the second step to the result", hint: "Divide the result (10) by 2." },
      { level: 3, description: "Compute", hint: "10 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 2x - 5 = 9 \\). Find \\( x \\).",
    options: [
        { text: "7", correct: true, feedback: "Add 5 → 2x = 14; divide by 2 → x = 7." },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-d3-a" },
        { text: "14", correct: false, feedback: "You only added 5.", misconceptionId: "E-d3-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d3-c" }
      ],
    backward: "Add 5 to both sides, then divide by 2.",
    forward: "Two‑step equations combine two inverse operations.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student applies the inverse operations in the wrong order or with the wrong operation, landing on a much smaller incorrect value.",
        rootCause: "Inverse Operations Applied Incorrectly — doesn't correctly reverse the order of operations used to build the equation.",
        remediation: "To undo 2x-5=9: FIRST add 5 to both sides (2x=14), THEN divide by 2 (x=7) — following the reverse order of the original operations."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student adds 5 to get 2x=14 but stops there, reporting 14 instead of dividing by 2 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving 2x-5=9 requires TWO steps — after adding 5 (2x=14), you must ALSO divide by 2: 14÷2=7, not just 14."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student makes an arithmetic slip in the division step, landing on 8 instead of the correct 7.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 2x=14, then 14÷2=7, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the subtraction first", hint: "Add 5 to both sides: 9+5=14." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 2." },
      { level: 3, description: "Compute", hint: "14 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPREVAL-01",
    question: "Write 'three times a number \\( y \\), increased by 2'. Then find its value when \\( y = 4 \\).",
    options: [
        { text: "\\( 3y + 2 = 14 \\)", correct: true, feedback: "3y+2 → 3×4+2 = 14." },
        { text: "\\( 3y + 2 = 12 \\)", correct: false, feedback: "You only evaluated 3y.", misconceptionId: "E-d4-a" },
        { text: "\\( 2y + 3 = 11 \\)", correct: false, feedback: "Expression is wrong order.", misconceptionId: "E-d4-b" },
        { text: "\\( 3(y+2) = 18 \\)", correct: false, feedback: "Wrong expression.", misconceptionId: "E-d4-c" }
      ],
    backward: "First write the expression: 3y + 2. Then substitute y=4.",
    forward: "Evaluating expressions prepares you for working with formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student computes only 3y (3×4=12) and forgets to add the 2, evaluating only part of the expression.",
        rootCause: "Second Step Omitted — completes the multiplication but forgets to add the constant term.",
        remediation: "The expression is 3y+2, not just 3y — after computing 3×4=12, you must ALSO add 2: 12+2=14, not 12."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student writes and evaluates the wrong expression (2y+3 instead of 3y+2), swapping the coefficient and constant.",
        rootCause: "Coefficients Swapped — mixes up which number multiplies y and which is added.",
        remediation: "'Three times y' means 3y (3 multiplies y), and 'increased by 2' means add 2 — the expression is 3y+2, not 2y+3 which swaps the roles of 3 and 2."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student groups the addition inside parentheses with the multiplication, writing 3(y+2) instead of the correct 3y+2.",
        rootCause: "Grouping Misapplied — applies the multiplier to the whole addition instead of just to y.",
        remediation: "'Three times y, increased by 2' means take 3y FIRST, THEN add 2: 3y+2 — not 3(y+2), which means 'three times the result of (y plus 2)', a different quantity."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the expression", hint: "3 times y, plus 2: 3y + 2." },
      { level: 2, description: "Substitute y=4", hint: "3×4 + 2." },
      { level: 3, description: "Compute", hint: "12 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQTWOSTEP-01",
    question: "Start at 3. Rule: multiply by 3, then subtract 2. Find the 4th term.",
    options: [
        { text: "55", correct: true, feedback: "3→7→19→55. 4th=55." },
        { text: "7", correct: false, feedback: "1st? No, that's 2nd.", misconceptionId: "E-d5-a" },
        { text: "19", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d5-b" },
        { text: "53", correct: false, feedback: "Incorrect final step.", misconceptionId: "E-d5-c" }
      ],
    backward: "Apply the rule step by step: 3→7→19→55.",
    forward: "Two‑step rules generate more interesting sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student stops two terms early, reporting the 2nd term (7) instead of the requested 4th term (55).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 3 is the 1st term, 7 is the 2nd, 19 is the 3rd, 55 is the 4TH term — the question asks for the 4th term (55), not the 2nd (7)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student stops one term early, reporting the 3rd term (19) instead of the requested 4th term (55).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 3 is the 1st term, 7 is the 2nd, 19 is the 3rd, 55 is the 4TH term — the question asks for the 4th term (55), not the 3rd (19)."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student makes an arithmetic slip in the final application of the rule, landing on 53 instead of the correct 55.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 19×3=57, then 57-2=55, not 53."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "3, 3×3-2=7, 7×3-2=19." },
      { level: 2, description: "Apply the rule once more", hint: "19×3-2 = ?" },
      { level: 3, description: "Confirm this is the 4th term", hint: "1st=3, 2nd=7, 3rd=19, 4th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-01",
    question: "A taxi charges ₹20 fixed fee plus ₹10 per kilometre. The total fare is ₹80. How many kilometres?",
    options: [
        { text: "6", correct: true, feedback: "20 + 10k = 80 → 10k = 60 → k = 6." },
        { text: "8", correct: false, feedback: "You divided 80 by 10.", misconceptionId: "E-d6-a" },
        { text: "10", correct: false, feedback: "Incorrect equation.", misconceptionId: "E-d6-b" },
        { text: "4", correct: false, feedback: "Incorrect.", misconceptionId: "E-d6-c" }
      ],
    backward: "Let kilometres = k. Fixed fee + rate×k = total. Solve the two‑step equation.",
    forward: "Real‑world problems often involve a fixed part and a variable part.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student divides the total fare (80) directly by the rate (10), ignoring the ₹20 fixed fee entirely.",
        rootCause: "Fixed Fee Ignored — treats the entire fare as proportional to distance, forgetting the flat starting charge.",
        remediation: "The total fare includes a FIXED ₹20 fee PLUS the per-km charge — first subtract the fixed fee: 80-20=60, THEN divide by the rate: 60÷10=6, not 80÷10=8."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student sets up an incorrect equation that doesn't correctly represent the fixed fee plus variable rate structure.",
        rootCause: "Word Problem Mistranslated Into Equation — misrepresents the relationship between the fixed fee, rate, and total.",
        remediation: "The correct equation is: fixed fee + (rate × kilometres) = total, i.e., 20+10k=80 — solve by subtracting the fixed fee first (80-20=60), then dividing by the rate (60÷10=6), not 10."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 4 instead of the correct 6.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 20+10k=80, subtract 20: 10k=60, divide by 10: k=6, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "fixed fee + rate × km = total: 20 + 10k = 80." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 20 from both sides: 10k = 60." },
      { level: 3, description: "Undo the multiplication", hint: "60 ÷ 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATTWOSTEP-01",
    question: "Pattern: 4, 9, 19, 39, __ (rule: ×2+1). Find the missing term.",
    options: [
        { text: "79", correct: true, feedback: "39×2+1 = 79." },
        { text: "78", correct: false, feedback: "You doubled but forgot +1.", misconceptionId: "E-d7-a" },
        { text: "80", correct: false, feedback: "You added 41.", misconceptionId: "E-d7-b" },
        { text: "49", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    backward: "Apply the rule to the last known term.",
    forward: "Mastering two‑step rules helps with advanced patterns.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student doubles the last term but forgets to add 1, applying only half of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step (double) but forgets the second (add 1).",
        remediation: "The rule is ×2 THEN +1, not just ×2 — 39×2=78 is only the first step; you must also add 1: 78+1=79, not 78."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student treats the pattern as arithmetic and adds a constant amount (41) to the last term instead of applying the actual ×2+1 rule.",
        rootCause: "Non-Arithmetic Pattern Misidentified as Arithmetic — applies a constant-difference strategy to a pattern that isn't arithmetic.",
        remediation: "This pattern uses a MULTIPLICATIVE rule (×2+1), not a constant addition — apply the rule correctly: 39×2+1=79, not 39+41=80."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student adds only 10 to the last term instead of applying the ×2+1 rule.",
        rootCause: "Wrong Rule Applied — uses an unrelated operation instead of the stated rule.",
        remediation: "Apply the ACTUAL rule (×2+1), not a small addition — 39×2+1=79, not 39+10=49."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Verify the rule against known terms", hint: "4×2+1=9, 9×2+1=19, 19×2+1=39." },
      { level: 2, description: "Apply the rule to the last known term", hint: "39×2 = 78." },
      { level: 3, description: "Complete the second step", hint: "78 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 8. Rule: add 5, then divide by 3. Find the input.",
    options: [
        { text: "19", correct: true, feedback: "Reverse: 8×3 = 24; 24 − 5 = 19." },
        { text: "29", correct: false, feedback: "You did 8×3+5=29 — wrong reversal order.", misconceptionId: "E-d8-a" },
        { text: "13", correct: false, feedback: "Incorrect.", misconceptionId: "E-d8-b" },
        { text: "24", correct: false, feedback: "You only multiplied by 3.", misconceptionId: "E-d8-c" }
      ],
    backward: "Reverse the operations in reverse order: multiply by 3, then subtract 5.",
    forward: "Reverse operations are the key to solving equations.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student reverses the two steps but applies them in the wrong order (multiply then add, instead of multiply then subtract), leading to an incorrect input.",
        rootCause: "Reversal Steps Misordered — undoes the correct operations but doesn't apply them in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'divide by 3' by multiplying by 3 (8×3=24), THEN undo 'add 5' by SUBTRACTING 5 (24-5=19) — not adding 5 again."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 13 instead of the correct 19.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 8×3=24, then 24-5=19, not 13."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student reverses only the first step (multiply by 3) and stops, without also undoing the 'add 5' step.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps — after multiplying by 3 (8×3=24), you must ALSO subtract 5 (undoing the original 'add 5'): 24-5=19, not just 24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'divide by 3' — undo it by multiplying by 3: 8×3=24." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'add 5' — undo it by subtracting 5." },
      { level: 3, description: "Compute", hint: "24 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-02",
    question: "Solve \\( x \\div 4 + 3 = 8 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Subtract 3 → x/4 = 5; multiply by 4 → x = 20." },
        { text: "32", correct: false, feedback: "You multiplied 8×4? No.", misconceptionId: "E-d9-a" },
        { text: "5", correct: false, feedback: "You only subtracted 3.", misconceptionId: "E-d9-b" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-c" }
      ],
    backward: "Subtract 3 from both sides, then multiply by 4.",
    forward: "Equations with division and addition appear in formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student multiplies the total (8) by 4 without first subtracting 3, skipping the first inverse operation.",
        rootCause: "Inverse Operations Applied Out of Order — multiplies before undoing the addition first.",
        remediation: "To undo x÷4+3=8: FIRST subtract 3 from both sides (x÷4=5), THEN multiply by 4 (x=20) — not multiplying 8 by 4 before subtracting."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student subtracts 3 to get x÷4=5 but stops there, reporting 5 instead of multiplying by 4 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving x÷4+3=8 requires TWO steps — after subtracting 3 (x÷4=5), you must ALSO multiply by 4: 5×4=20, not just 5."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student makes an arithmetic slip in the final multiplication step, landing on 15 instead of the correct 20.",
        rootCause: "Computation Error — correct approach, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: x÷4=5, then 5×4=20, not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 3 from both sides: 8-3=5." },
      { level: 2, description: "Now undo the division", hint: "Multiply both sides by 4." },
      { level: 3, description: "Compute", hint: "5 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRTWOSTEP-02",
    question: "Write 'the quotient of a number \\( p \\) and 5, decreased by 2' as an expression.",
    options: [
        { text: "\\( p \\div 5 - 2 \\)", correct: true, feedback: "Quotient means divide. Decreased by means subtract." },
        { text: "\\( (p - 2) \\div 5 \\)", correct: false, feedback: "That's 'p decreased by 2, then divided by 5'.", misconceptionId: "E-d10-a" },
        { text: "\\( p \\div 5 + 2 \\)", correct: false, feedback: "Increased by 2.", misconceptionId: "E-d10-b" },
        { text: "\\( 5 \\div p - 2 \\)", correct: false, feedback: "The order of division is wrong.", misconceptionId: "E-d10-c" }
      ],
    backward: "Quotient means divide; decreased by means subtract.",
    forward: "Precise translation is crucial in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student groups the subtraction inside the division, writing (p-2)÷5 instead of the correct p÷5-2.",
        rootCause: "Grouping Misapplied — applies the division to the whole subtraction instead of just to p.",
        remediation: "'The quotient of p and 5, decreased by 2' means take p÷5 FIRST, THEN subtract 2: p÷5-2 — not (p-2)÷5, which means 'p decreased by 2, then divided by 5', a different quantity."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student translates 'decreased by' as addition, writing p÷5+2 instead of the correct subtraction p÷5-2.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('decreased by') with an addition expression.",
        remediation: "'Decreased by' signals SUBTRACTION, not addition — 'the quotient of p and 5, decreased by 2' means p÷5-2, not p÷5+2 (which would be 'increased by 2')."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student reverses the order of division, writing 5÷p-2 instead of the correct p÷5-2.",
        rootCause: "Division Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'The quotient of p and 5' means p DIVIDED BY 5: p÷5 — not 5÷p, which would be 'the quotient of 5 and p'."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'the quotient of p and 5'", hint: "Quotient means divide: p ÷ 5." },
      { level: 2, description: "Identify the second operation", hint: "'Decreased by 2' means subtract 2, applied to p÷5 as a whole (not just p)." },
      { level: 3, description: "Write the expression", hint: "p ÷ 5 - 2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQIDENTIFY-01",
    question: "Sequence: 2, 5, 11, 23, … What is the rule? Use it to find the 5th term.",
    options: [
        { text: "×2+1; 47", correct: true, feedback: "23×2+1 = 47." },
        { text: "×2+1; 45", correct: false, feedback: "You doubled but didn't add 1 correctly? 23×2=46, +1=47.", misconceptionId: "E-d11-a" },
        { text: "×3−1; 68", correct: false, feedback: "Wrong rule.", misconceptionId: "E-d11-b" },
        { text: "×2+2; 48", correct: false, feedback: "Wrong rule.", misconceptionId: "E-d11-c" }
      ],
    backward: "Look at how each term is formed from the previous one.",
    forward: "Identifying rules is the first step in modelling.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student identifies the correct rule (×2+1) but makes an arithmetic slip applying it to the last term, landing on 45 instead of the correct 47.",
        rootCause: "Computation Error — correct rule identified, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully with the correct rule: 23×2=46, then 46+1=47, not 45."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student identifies an incorrect rule (×3−1) that doesn't actually fit the given terms, leading to a wrong 5th term.",
        rootCause: "Pattern Rule Not Verified — picks a rule without checking it against every given term.",
        remediation: "VERIFY the rule against every term: does 2×3-1=5? Yes. But does 5×3-1=14? No, the actual next term is 11, not 14 — so ×3−1 does NOT fit; the correct rule is ×2+1 (2×2+1=5 ✓, 5×2+1=11 ✓, 11×2+1=23 ✓)."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student identifies an incorrect rule (×2+2) that doesn't actually fit the given terms, leading to a wrong 5th term.",
        rootCause: "Pattern Rule Not Verified — picks a rule without checking it against every given term.",
        remediation: "VERIFY the rule against every term: does 2×2+2=5? No, that gives 6, not 5 — so ×2+2 does NOT fit; the correct rule is ×2+1 (2×2+1=5 ✓, 5×2+1=11 ✓, 11×2+1=23 ✓), giving 23×2+1=47."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test a candidate rule on the first two terms", hint: "Does 2×2+1=5 work?" },
      { level: 2, description: "Verify the rule against the remaining terms", hint: "5×2+1=11, 11×2+1=23 — confirmed." },
      { level: 3, description: "Apply the rule to find the 5th term", hint: "23×2+1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-01",
    question: "Ravi saved ₹50 per week for some weeks plus ₹100 from his grandmother. Total savings ₹450. How many weeks?",
    options: [
        { text: "7", correct: true, feedback: "50w + 100 = 450 → 50w = 350 → w = 7." },
        { text: "9", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d12-a" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-b" },
        { text: "10", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    backward: "Weekly savings × weeks + gift = total. Solve the two‑step equation.",
    forward: "Saving plans are a real‑life use of algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student divides the total (450) directly by the weekly amount (50), ignoring the ₹100 gift entirely.",
        rootCause: "Fixed Amount Ignored — treats the entire total as proportional to weeks, forgetting the one-time gift.",
        remediation: "The total includes a ONE-TIME ₹100 gift PLUS weekly savings — first subtract the gift: 450-100=350, THEN divide by the weekly amount: 350÷50=7, not 450÷50=9."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 8 instead of the correct 7.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 50w+100=450, subtract 100: 50w=350, divide by 50: w=7, not 8."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 10 instead of the correct 7.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 50w+100=450, subtract 100: 50w=350, divide by 50: w=7, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "weekly savings × weeks + gift = total: 50w + 100 = 450." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 100 from both sides: 50w = 350." },
      { level: 3, description: "Undo the multiplication", hint: "350 ÷ 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATSQUARE-02",
    question: "The pattern of square numbers: 1, 4, 9, 16, … What is the 10th term?",
    options: [
        { text: "100", correct: true, feedback: "These are n². 10th term = 10² = 100." },
        { text: "81", correct: false, feedback: "That's the 9th term (9²).", misconceptionId: "E-d13-a" },
        { text: "121", correct: false, feedback: "That's the 11th term (11²).", misconceptionId: "E-d13-b" },
        { text: "110", correct: false, feedback: "Not a square.", misconceptionId: "E-d13-c" }
      ],
    backward: "Identify the rule: nth term = n².",
    forward: "Square numbers appear in geometry and algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student computes the 9th term (9²=81) instead of the requested 10th term (10²=100), off by one position.",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "The nth term is n² — for the 10TH term, use n=10: 10²=100, not 9²=81 (which is the 9th term)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student computes the 11th term (11²=121) instead of the requested 10th term (10²=100), off by one position in the other direction.",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "The nth term is n² — for the 10TH term, use n=10: 10²=100, not 11²=121 (which is the 11th term)."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student estimates a value near 100 that isn't actually a perfect square.",
        rootCause: "Pattern Rule Not Applied Precisely — approximates the answer instead of computing n² exactly.",
        remediation: "The nth term must be a PERFECT SQUARE (n×n) — for n=10, compute 10×10=100 exactly, not an estimate like 110 which isn't a perfect square."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule", hint: "The nth term equals n² (n squared)." },
      { level: 2, description: "Identify which term is being asked for", hint: "The question asks for the 10th term, so n=10." },
      { level: 3, description: "Compute", hint: "10² = 10 × 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCTWOSTEP-01",
    question: "Rule: square the input, then add 4. Input = 6. What is the output?",
    options: [
        { text: "40", correct: true, feedback: "6² = 36; 36 + 4 = 40." },
        { text: "36", correct: false, feedback: "You forgot to add 4.", misconceptionId: "E-d14-a" },
        { text: "10", correct: false, feedback: "You added 6+4.", misconceptionId: "E-d14-b" },
        { text: "42", correct: false, feedback: "Incorrect.", misconceptionId: "E-d14-c" }
      ],
    backward: "First compute the square, then add 4.",
    forward: "This is like evaluating an algebraic expression.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student squares the input (6²=36) but forgets to add 4, applying only the first step of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step but fails to apply the second operation.",
        remediation: "The rule has TWO steps — after squaring (6²=36), you must ALSO add 4: 36+4=40, not just 36."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student adds the input and 4 (6+4=10) instead of squaring the input first, skipping the squaring step entirely.",
        rootCause: "First Step Skipped — applies only the second operation without performing the first (squaring).",
        remediation: "The rule says SQUARE the input FIRST (6²=36), THEN add 4 (36+4=40) — don't skip the squaring step and just add 6+4=10."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes an arithmetic slip while computing the square or the addition, landing on 42 instead of the correct 40.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 6²=36, then 36+4=40, not 42."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first step", hint: "6² = 36." },
      { level: 2, description: "Apply the second step to the result", hint: "Add 4 to the result (36)." },
      { level: 3, description: "Compute", hint: "36 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 5x + 7 = 32 \\). Find \\( x \\).",
    options: [
        { text: "5", correct: true, feedback: "Subtract 7 → 5x = 25; divide by 5 → x = 5." },
        { text: "6", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d15-a" },
        { text: "7", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-b" },
        { text: "4", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-c" }
      ],
    backward: "Subtract 7, then divide by 5.",
    forward: "These equations model many everyday problems.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student makes an arithmetic slip in the division step, landing on 6 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 5x=25 (after subtracting 7), then 25÷5=5, not 6."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports the number being subtracted (7) instead of the actual solved value of x.",
        rootCause: "Operand Reported Instead of Result — confuses the number used in the operation with the answer.",
        remediation: "7 is the number you SUBTRACT, not the answer itself — after subtracting 7 (5x=25) and dividing by 5, x=5, not 7."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student makes an arithmetic slip in either the subtraction or division step, landing on 4 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 32-7=25, then 25÷5=5, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 7 from both sides: 32-7=25." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 5." },
      { level: 3, description: "Compute", hint: "25 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPREVAL-01",
    question: "Evaluate \\( 4n - 3 \\) when \\( n = 6 \\).",
    options: [
        { text: "21", correct: true, feedback: "4×6 = 24; 24 − 3 = 21." },
        { text: "24", correct: false, feedback: "You only multiplied.", misconceptionId: "E-d16-a" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-b" },
        { text: "27", correct: false, feedback: "You added 3.", misconceptionId: "E-d16-c" }
      ],
    backward: "Substitute n=6 into the expression and compute.",
    forward: "Evaluating expressions is the foundation of using formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student computes 4×6=24 but forgets to subtract 3, applying only the multiplication part of the expression.",
        rootCause: "Second Step Omitted — completes the multiplication but forgets to subtract the constant term.",
        remediation: "The expression is 4n-3, not just 4n — after computing 4×6=24, you must ALSO subtract 3: 24-3=21, not 24."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student makes an arithmetic slip while evaluating the expression, landing on 15 instead of the correct 21.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 4×6=24, then 24-3=21, not 15."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student adds 3 instead of subtracting, applying the wrong operation from the expression.",
        rootCause: "Operation Reversed — adds when the expression specifies subtraction.",
        remediation: "The expression says 4n MINUS 3, not plus 3 — 24-3=21, not 24+3=27."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute n=6 into 4n", hint: "4 × 6 = 24." },
      { level: 2, description: "Apply the second operation", hint: "Subtract 3 from the result." },
      { level: 3, description: "Compute", hint: "24 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQTWOSTEP-01",
    question: "Start at 2. Rule: multiply by 3, then add 1. Find the 4th term.",
    options: [
        { text: "67", correct: true, feedback: "2→7→22→67." },
        { text: "22", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d17-a" },
        { text: "65", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "70", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    backward: "Apply the rule step by step: 2→7→22→67.",
    forward: "Sequences model growth in populations and investments.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student stops one term early, reporting the 3rd term (22) instead of the requested 4th term (67).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 2 is the 1st term, 7 is the 2nd, 22 is the 3rd, 67 is the 4TH term — the question asks for the 4th term (67), not the 3rd (22)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student makes an arithmetic slip while applying the two-step rule to the 3rd term, landing on 65 instead of the correct 67.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 22×3=66, then 66+1=67, not 65."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student makes an arithmetic slip while applying the two-step rule to the 3rd term, landing on 70 instead of the correct 67.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 22×3=66, then 66+1=67, not 70."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "2, 2×3+1=7, 7×3+1=22." },
      { level: 2, description: "Apply the rule once more", hint: "22×3+1 = ?" },
      { level: 3, description: "Confirm this is the 4th term", hint: "1st=2, 2nd=7, 3rd=22, 4th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-01",
    question: "The product of a number and 4, plus 7, equals 31. Find the number.",
    options: [
        { text: "6", correct: true, feedback: "4n + 7 = 31 → 4n = 24 → n = 6." },
        { text: "8", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d18-a" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "10", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    backward: "Write the equation: 4n + 7 = 31, then solve.",
    forward: "Translating words to equations is a core algebra skill.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 8 instead of the correct 6.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 4n+7=31, subtract 7: 4n=24, divide by 4: n=6, not 8."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 5 instead of the correct 6.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 4n+7=31, subtract 7: 4n=24, divide by 4: n=6, not 5."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student divides the total (31) directly by 4 without first subtracting 7, skipping the first inverse operation.",
        rootCause: "Inverse Operations Applied Out of Order — divides before undoing the addition first.",
        remediation: "To solve 4n+7=31, FIRST subtract 7 (4n=24), THEN divide by 4 (n=6) — not dividing 31 by 4 directly, which skips the first step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "product of n and 4, plus 7: 4n + 7 = 31." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 7 from both sides: 4n = 24." },
      { level: 3, description: "Undo the multiplication", hint: "24 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATTWOSTEP-01",
    question: "Pattern: 3, 8, 18, 38, … (rule: ×2+2). Find the 5th term.",
    options: [
        { text: "78", correct: true, feedback: "38×2+2 = 76+2 = 78." },
        { text: "76", correct: false, feedback: "You doubled but forgot +2.", misconceptionId: "E-d19-a" },
        { text: "80", correct: false, feedback: "You added 42.", misconceptionId: "E-d19-b" },
        { text: "74", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-c" }
      ],
    backward: "Apply the rule to the last term.",
    forward: "Consistent rules generate predictable patterns.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student doubles the last term but forgets to add 2, applying only half of the two-step rule.",
        rootCause: "Second Step Omitted — completes the first step (double) but forgets the second (add 2).",
        remediation: "The rule is ×2 THEN +2, not just ×2 — 38×2=76 is only the first step; you must also add 2: 76+2=78, not 76."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student treats the pattern as arithmetic and adds a constant amount (42) instead of applying the actual ×2+2 rule.",
        rootCause: "Non-Arithmetic Pattern Misidentified as Arithmetic — applies a constant-difference strategy to a pattern that isn't arithmetic.",
        remediation: "This pattern uses a MULTIPLICATIVE rule (×2+2), not a constant addition — apply the rule correctly: 38×2+2=78, not 38+42=80."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an arithmetic slip while applying the two-step rule, landing on 74 instead of the correct 78.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 38×2=76, then 76+2=78, not 74."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Verify the rule against known terms", hint: "3×2+2=8, 8×2+2=18, 18×2+2=38." },
      { level: 2, description: "Apply the rule to the last known term", hint: "38×2 = 76." },
      { level: 3, description: "Complete the second step", hint: "76 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 30. Rule: multiply by 4, then subtract 2. Find the input.",
    options: [
        { text: "8", correct: true, feedback: "Reverse: 30+2 = 32; 32÷4 = 8." },
        { text: "118", correct: false, feedback: "You did 30×4−2=118 — wrong reversal.", misconceptionId: "E-d20-a" },
        { text: "7", correct: false, feedback: "Incorrect division.", misconceptionId: "E-d20-b" },
        { text: "9", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    backward: "Undo the operations in reverse order: add 2, then divide by 4.",
    forward: "This is the same reasoning used to solve two‑step equations.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student applies the ORIGINAL rule (×4 then −2) to the output instead of reversing it, leading to a drastically wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: add 2 (undoing subtract 2), then divide by 4 (undoing multiply by 4) — 30+2=32, 32÷4=8, not 30×4-2=118."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 7 instead of the correct 8.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 30+2=32, then 32÷4=8, not 7."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 9 instead of the correct 8.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 30+2=32, then 32÷4=8, not 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'subtract 2' — undo it by adding 2: 30+2=32." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'multiply by 4' — undo it by dividing by 4." },
      { level: 3, description: "Compute", hint: "32 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-02",
    question: "Solve \\( x \\div 3 - 2 = 5 \\). Find \\( x \\).",
    options: [
        { text: "21", correct: true, feedback: "Add 2 → x/3 = 7; multiply by 3 → x = 21." },
        { text: "9", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-a" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-b" },
        { text: "18", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-c" }
      ],
    backward: "Add 2 to both sides, then multiply by 3.",
    forward: "Equations with fractions are solved by multiplying.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student subtracts 2 further instead of adding to isolate x÷3, applying the wrong inverse operation.",
        rootCause: "Inverse Operation Reversed — subtracts when undoing subtraction requires addition.",
        remediation: "To UNDO subtracting 2, you must ADD 2 (the inverse operation) — 5+2=7, giving x÷3=7, not further subtraction."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student adds 2 to get x÷3=7 but stops there, reporting 15 (perhaps confusing steps) instead of multiplying by 3 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to correctly apply the second.",
        remediation: "Solving x÷3-2=5 requires TWO steps — after adding 2 (x÷3=7), you must ALSO multiply by 3: 7×3=21, not 15."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student makes an arithmetic slip in the final multiplication step, landing on 18 instead of the correct 21.",
        rootCause: "Computation Error — correct approach, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: x÷3=7, then 7×3=21, not 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the subtraction first", hint: "Add 2 to both sides: 5+2=7." },
      { level: 2, description: "Now undo the division", hint: "Multiply both sides by 3." },
      { level: 3, description: "Compute", hint: "7 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRTWOSTEP-01",
    question: "Write 'the sum of twice a number \\( m \\) and 8' as an expression.",
    options: [
        { text: "\\( 2m + 8 \\)", correct: true, feedback: "Twice m is 2m. Sum with 8 gives 2m+8." },
        { text: "\\( 2(m + 8) \\)", correct: false, feedback: "That's twice the sum of m and 8.", misconceptionId: "E-d22-a" },
        { text: "\\( m + 8 \\)", correct: false, feedback: "You forgot the twice.", misconceptionId: "E-d22-b" },
        { text: "\\( 2m - 8 \\)", correct: false, feedback: "That's the difference, not sum.", misconceptionId: "E-d22-c" }
      ],
    backward: "Twice the number is 2m; sum with 8 gives 2m+8.",
    forward: "Word phrases become algebraic expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student groups the addition inside parentheses with the multiplication, writing 2(m+8) instead of the correct 2m+8.",
        rootCause: "Grouping Misapplied — applies the multiplier to the whole addition instead of just to m.",
        remediation: "'The sum of twice m and 8' means take 2m FIRST, THEN add 8: 2m+8 — not 2(m+8), which means 'twice the result of (m plus 8)', a different quantity."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student forgets to double m, writing m+8 instead of the correct 2m+8.",
        rootCause: "First Step Skipped — omits the 'twice' operation entirely.",
        remediation: "'Twice a number m' means 2m, not just m — the full expression is 2m+8, don't forget to double m before adding 8."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student translates 'sum' as subtraction, writing 2m-8 instead of the correct addition 2m+8.",
        rootCause: "Operation Keyword Misread — confuses an addition keyword ('sum') with a subtraction expression.",
        remediation: "'Sum' signals ADDITION, not subtraction — 'the sum of twice m and 8' means 2m+8, not 2m-8 (which would be 'the difference of twice m and 8')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'twice a number m'", hint: "Twice m means 2m." },
      { level: 2, description: "Identify the second operation", hint: "'Sum with 8' means add 8, applied to 2m as a whole (not just m)." },
      { level: 3, description: "Write the expression", hint: "2m + 8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2A"]
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-01",
    question: "A sequence follows the rule: multiply by 2, then subtract 3. The 3rd term is 15. Find the 1st term.",
    options: [
        { text: "6", correct: true, feedback: "Work backwards: 3rd=15. 2nd = (15+3)÷2 = 9. 1st = (9+3)÷2 = 6." },
        { text: "9", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d23-a" },
        { text: "12", correct: false, feedback: "Incorrect reverse steps.", misconceptionId: "E-d23-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-c" }
      ],
    backward: "Work backwards step by step, or set up an equation: 1st=x, 2nd=2x−3, 3rd=2(2x−3)−3=15.",
    forward: "Reverse thinking is powerful in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student stops after computing the 2nd term (9) working backwards, instead of continuing one more reversal step to reach the 1st term.",
        rootCause: "Reversal Not Continued to the Requested Term — stops the backward process too early.",
        remediation: "You need to reverse TWICE to go from the 3rd term back to the 1st: 3rd(15)→2nd((15+3)÷2=9)→1st((9+3)÷2=6) — don't stop at the 2nd term (9)."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student reverses the two operations in the wrong order (e.g., dividing before adding) instead of correctly undoing 'subtract 3' first, then 'multiply by 2'.",
        rootCause: "Reversal Steps Misordered — undoes the operations in the wrong sequence.",
        remediation: "To reverse each step, undo 'subtract 3' by ADDING 3 first, THEN undo 'multiply by 2' by DIVIDING by 2 — (15+3)÷2=9, not dividing before adding."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 8 instead of the correct 6.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2nd=(15+3)÷2=9, then 1st=(9+3)÷2=6, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse from the 3rd term to the 2nd", hint: "Undo 'subtract 3' then 'multiply by 2': (15+3)÷2=9." },
      { level: 2, description: "Reverse from the 2nd term to the 1st", hint: "Apply the same reversal again to 9." },
      { level: 3, description: "Compute", hint: "(9+3)÷2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-02",
    question: "A number is halved, then 4 is added. The result is 11. Find the number.",
    options: [
        { text: "14", correct: true, feedback: "x/2 + 4 = 11 → x/2 = 7 → x = 14." },
        { text: "30", correct: false, feedback: "You did 11×2+4? Not correct.", misconceptionId: "E-d24-a" },
        { text: "7", correct: false, feedback: "You only solved x/2=7? Then x=14.", misconceptionId: "E-d24-b" },
        { text: "22", correct: false, feedback: "You added 4 before halving, in the wrong order.", misconceptionId: "E-d24-c" }
      ],
    backward: "Let the number be x. Halving means x/2. Then set up the equation and solve.",
    forward: "Word problems with fractions are common in real life.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student applies the forward operations to the result instead of correctly reversing them in order, landing on a drastically wrong value.",
        rootCause: "Forward Rule Applied Instead of Reversed — doesn't correctly undo the two steps in reverse order.",
        remediation: "To find x: FIRST undo 'add 4' by subtracting 4 (11-4=7), THEN undo 'halved' by multiplying by 2 (7×2=14) — not 11×2+4=30, which doesn't correctly reverse the steps."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student correctly finds x/2=7 but stops there, reporting 7 instead of multiplying by 2 to find x itself.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "x/2=7 is only PART of the solution — you must ALSO multiply by 2 to undo the halving: 7×2=14, not just 7."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student reverses the two steps in the wrong order (adding before halving) instead of the correct order (subtracting before doubling).",
        rootCause: "Reversal Steps Misordered — undoes the operations in the wrong sequence.",
        remediation: "Reverse the steps in the CORRECT order: undo 'add 4' FIRST (11-4=7), THEN undo 'halved' (7×2=14) — not adding 4 to 11 as if halving already happened."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "x/2 + 4 = 11." },
      { level: 2, description: "Undo the addition first", hint: "Subtract 4 from both sides: 11-4=7." },
      { level: 3, description: "Undo the halving", hint: "7 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATGEOM-01",
    question: "A pattern follows the rule ×2: 5, 10, 20, 40, … What is the 6th term?",
    options: [
        { text: "160", correct: true, feedback: "5th=80, 6th=80×2=160." },
        { text: "80", correct: false, feedback: "That's the 5th term, not the 6th.", misconceptionId: "E-r1-a" },
        { text: "120", correct: false, feedback: "You added 40+80 instead of doubling 80.", misconceptionId: "E-r1-b" },
        { text: "200", correct: false, feedback: "Incorrect.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student stops one term early, reporting the 5th term (80) instead of the requested 6th term (160).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 40 is the 4th term, 80 is the 5TH term, 160 is the 6TH term — the question asks for the 6th term (160), not the 5th (80)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student adds the previous two terms (40+80=120) instead of applying the ×2 rule to the last term.",
        rootCause: "Wrong Rule Applied — uses an unrelated operation (adding previous terms) instead of the stated multiplicative rule.",
        remediation: "The rule is MULTIPLY by 2, not add previous terms — 80×2=160, not 40+80=120."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student makes an arithmetic slip while multiplying, landing on an incorrect value.",
        rootCause: "Computation Error — correct approach, but the multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 40×2=80 (5th term), then 80×2=160 (6th term), not 200."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the rule and the last known term", hint: "Rule: ×2; 4th term = 40." },
      { level: 2, description: "Find the 5th term", hint: "40 × 2 = 80." },
      { level: 3, description: "Find the 6th term", hint: "80 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCTWOSTEP-01",
    question: "Rule: add 6, then divide by 3. Input = 12. Output?",
    options: [
        { text: "6", correct: true, feedback: "(12+6)÷3 = 6." },
        { text: "10", correct: false, feedback: "You subtracted instead of dividing.", misconceptionId: "E-r2-a" },
        { text: "12", correct: false, feedback: "No operation performed.", misconceptionId: "E-r2-b" },
        { text: "8", correct: false, feedback: "You divided first, then added, in the wrong order.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student subtracts instead of dividing for the second step, applying the wrong operation.",
        rootCause: "Operation Substituted — subtracts when the rule specifies division.",
        remediation: "The second step says DIVIDE by 3, not subtract — (12+6)÷3=6, not 18-8=10 or similar."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student reports the input itself as the output, without applying either rule step.",
        rootCause: "Rule Not Applied — copies the input unchanged instead of performing the stated operations.",
        remediation: "You must APPLY both steps (add 6, then divide by 3) to the input — the output is not the same as the input: (12+6)÷3=6, not 12."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student performs the two operations in the wrong order (divide first, then add) instead of the stated order (add first, then divide).",
        rootCause: "Operation Order Reversed — applies the two steps in the wrong sequence.",
        remediation: "The rule says ADD 6 FIRST, then divide by 3 — (12+6)÷3=6, not (12÷3)+6, which reverses the stated order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first step", hint: "12 + 6 = 18." },
      { level: 2, description: "Apply the second step to the result", hint: "Divide the result (18) by 3." },
      { level: 3, description: "Compute", hint: "18 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-01",
    question: "Solve \\( 4x - 3 = 21 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "Add 3 → 4x=24; ÷4 → x=6." },
        { text: "5", correct: false, feedback: "Incorrect division.", misconceptionId: "E-r3-a" },
        { text: "7", correct: false, feedback: "Incorrect.", misconceptionId: "E-r3-b" },
        { text: "18", correct: false, feedback: "You only added 3, forgot to divide.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student makes an arithmetic slip in the division step, landing on 5 instead of the correct 6.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 4x=24 (after adding 3), then 24÷4=6, not 5."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student makes an arithmetic slip in the division step, landing on 7 instead of the correct 6.",
        rootCause: "Computation Error — correct approach, but the final division is carried out incorrectly.",
        remediation: "Recompute carefully: 4x=24 (after adding 3), then 24÷4=6, not 7."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student adds 3 to get 4x=24 but stops there, reporting 18 (perhaps mixing up steps) instead of dividing by 4 to find x.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving 4x-3=21 requires TWO steps — after adding 3 (4x=24), you must ALSO divide by 4: 24÷4=6, not 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the subtraction first", hint: "Add 3 to both sides: 21+3=24." },
      { level: 2, description: "Now undo the multiplication", hint: "Divide both sides by 4." },
      { level: 3, description: "Compute", hint: "24 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRTWOSTEP-01",
    question: "Write '10 less than three times \\( k \\)' as an expression.",
    options: [
        { text: "\\( 3k - 10 \\)", correct: true, feedback: "Three times k is 3k. Less than means subtract from that." },
        { text: "\\( 10 - 3k \\)", correct: false, feedback: "That's the order reversed.", misconceptionId: "E-r4-a" },
        { text: "\\( 3(k - 10) \\)", correct: false, feedback: "That's three times the result of k minus 10.", misconceptionId: "E-r4-b" },
        { text: "\\( 3k + 10 \\)", correct: false, feedback: "That's increased by 10, not less than.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student reverses the order of subtraction, writing 10-3k instead of the correct 3k-10.",
        rootCause: "Subtraction Order Reversed — writes the terms in the order they appear in the sentence instead of by meaning.",
        remediation: "'10 less than three times k' means START with 3k and SUBTRACT 10: 3k-10 — not 10-3k, which would mean '3k less than 10'."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student groups the subtraction inside parentheses with the multiplication, writing 3(k-10) instead of the correct 3k-10.",
        rootCause: "Grouping Misapplied — applies the multiplier to the whole subtraction instead of just to k.",
        remediation: "'10 less than three times k' means take 3k FIRST, THEN subtract 10: 3k-10 — not 3(k-10), which means 'three times the result of (k minus 10)', a different quantity."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student translates 'less than' as addition, writing 3k+10 instead of the correct subtraction 3k-10.",
        rootCause: "Operation Keyword Misread — confuses a subtraction keyword ('less than') with an addition expression.",
        remediation: "'Less than' signals SUBTRACTION, not addition — '10 less than three times k' means 3k-10, not 3k+10 (which would be '10 more than three times k')."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate 'three times k'", hint: "Three times k means 3k." },
      { level: 2, description: "Identify which term comes first", hint: "'10 less than 3k' starts with 3k, then subtracts 10." },
      { level: 3, description: "Write the expression", hint: "3k - 10." }
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
    question: "Start at 5. Rule: multiply by 2, then add 3. Find the 4th term.",
    options: [
        { text: "61", correct: true, feedback: "5→13→29→61." },
        { text: "13", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-r5-a" },
        { text: "29", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-r5-b" },
        { text: "63", correct: false, feedback: "Incorrect final step.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student stops two terms early, reporting the 2nd term (13) instead of the requested 4th term (61).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 5 is the 1st term, 13 is the 2nd, 29 is the 3rd, 61 is the 4TH term — the question asks for the 4th term (61), not the 2nd (13)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student stops one term early, reporting the 3rd term (29) instead of the requested 4th term (61).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 5 is the 1st term, 13 is the 2nd, 29 is the 3rd, 61 is the 4TH term — the question asks for the 4th term (61), not the 3rd (29)."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes an arithmetic slip in the final application of the rule, landing on 63 instead of the correct 61.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 29×2=58, then 58+3=61, not 63."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "5, 5×2+3=13, 13×2+3=29." },
      { level: 2, description: "Apply the rule once more", hint: "29×2+3 = ?" },
      { level: 3, description: "Confirm this is the 4th term", hint: "1st=5, 2nd=13, 3rd=29, 4th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-02",
    question: "A number plus 12, then the result is divided by 2, giving 10. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "(n+12)÷2 = 10 → n+12=20 → n=8." },
        { text: "14", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-r6-a" },
        { text: "22", correct: false, feedback: "You only solved n+12=20 but reported the wrong value.", misconceptionId: "E-r6-b" },
        { text: "16", correct: false, feedback: "You divided 12 by 2 first, then added, in the wrong order.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 14 instead of the correct 8.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: (n+12)÷2=10, multiply by 2: n+12=20, subtract 12: n=8, not 14."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student correctly finds n+12=20 but then reports 22 (an incorrect final step) instead of subtracting 12 to isolate n.",
        rootCause: "Final Subtraction Step Miscalculated — doesn't correctly complete the last inverse operation.",
        remediation: "After finding n+12=20, subtract 12 from both sides: 20-12=8, not 22 (which isn't the result of that subtraction)."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reverses the order of the two steps, dividing 12 by 2 first and then adding, instead of following the equation's actual order.",
        rootCause: "Inverse Operations Applied Out of Order — undoes the operations in the wrong sequence.",
        remediation: "The equation is (n+12)÷2=10 — to undo it, FIRST multiply both sides by 2 (n+12=20), THEN subtract 12 (n=8) — don't divide 12 by 2 as a separate first step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "(n + 12) ÷ 2 = 10." },
      { level: 2, description: "Undo the division first", hint: "Multiply both sides by 2: n + 12 = 20." },
      { level: 3, description: "Undo the addition", hint: "20 - 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATGEOM-01",
    question: "Pattern: 3, 12, 48, 192, … (rule ×4). Find the 5th term.",
    options: [
        { text: "768", correct: true, feedback: "192×4 = 768." },
        { text: "576", correct: false, feedback: "You multiplied by 3 instead of 4.", misconceptionId: "E-r7-a" },
        { text: "700", correct: false, feedback: "Incorrect.", misconceptionId: "E-r7-b" },
        { text: "800", correct: false, feedback: "Incorrect.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student uses the wrong multiplier (3 instead of 4), miscounting the rule's factor.",
        rootCause: "Rule Multiplier Miscounted — doesn't correctly verify the constant ratio between terms before extending.",
        remediation: "Check the ratio between consecutive terms: 12÷3=4, 48÷12=4, 192÷48=4 — the multiplier is 4, not 3; so 192×4=768, not 192×3=576."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student estimates a value near the correct answer instead of precisely applying the ×4 rule.",
        rootCause: "Rule Not Applied Precisely — approximates the answer instead of computing it exactly.",
        remediation: "Apply the rule (×4) precisely, not by estimation: 192×4=768 exactly, not a rounded guess like 700."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student makes an arithmetic slip while multiplying, landing on 800 instead of the correct 768.",
        rootCause: "Computation Error — correct approach, but the multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 192×4=768, not 800."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Verify the multiplier", hint: "12÷3=4, 48÷12=4, 192÷48=4." },
      { level: 2, description: "Confirm the rule", hint: "The rule is ×4." },
      { level: 3, description: "Apply the rule to the last term", hint: "192 × 4 = ?" }
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
    question: "Output = 12. Rule: divide by 2, then subtract 1. Find the input.",
    options: [
        { text: "26", correct: true, feedback: "Reverse: (12+1)×2 = 26." },
        { text: "24", correct: false, feedback: "You forgot to add 1 before doubling.", misconceptionId: "E-r8-a" },
        { text: "22", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-r8-b" },
        { text: "28", correct: false, feedback: "Incorrect.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student reverses only one of the two steps (doubling the output directly) without first adding 1 to undo the subtraction.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps in order — first undo 'subtract 1' by adding 1 (12+1=13), THEN undo 'divide by 2' by multiplying by 2 (13×2=26), not just 12×2=24."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 22 instead of the correct 26.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 12+1=13, then 13×2=26, not 22."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 28 instead of the correct 26.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 12+1=13, then 13×2=26, not 28."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'subtract 1' — undo it by adding 1: 12+1=13." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'divide by 2' — undo it by multiplying by 2." },
      { level: 3, description: "Compute", hint: "13 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNTWOSTEP-02",
    question: "Solve \\( x \\div 5 + 2 = 6 \\). Find \\( x \\).",
    options: [
        { text: "20", correct: true, feedback: "Subtract 2 → x/5=4; ×5 → x=20." },
        { text: "10", correct: false, feedback: "You subtracted incorrectly before multiplying.", misconceptionId: "E-r9-a" },
        { text: "30", correct: false, feedback: "Incorrect.", misconceptionId: "E-r9-b" },
        { text: "24", correct: false, feedback: "You multiplied 6 by 4 instead of 4 by 5.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student makes an arithmetic slip in the subtraction or multiplication step, landing on 10 instead of the correct 20.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 6-2=4 (giving x÷5=4), then 4×5=20, not 10."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student makes an arithmetic slip in the final multiplication step, landing on 30 instead of the correct 20.",
        rootCause: "Computation Error — correct approach, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: x÷5=4 (after subtracting 2), then 4×5=20, not 30."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student multiplies the total (6) by 4 instead of multiplying the correctly-isolated x÷5 value (4) by 5.",
        rootCause: "Wrong Values Multiplied — uses the original total and an unrelated number instead of the correctly isolated values.",
        remediation: "After subtracting 2, x÷5=4 — multiply THIS value (4) by the divisor (5): 4×5=20, not the original total (6) by 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 2 from both sides: 6-2=4." },
      { level: 2, description: "Now undo the division", hint: "Multiply both sides by 5." },
      { level: 3, description: "Compute", hint: "4 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPREVAL-01",
    question: "Evaluate \\( 2n + 9 \\) when \\( n = 3 \\).",
    options: [
        { text: "15", correct: true, feedback: "2×3+9=6+9=15." },
        { text: "12", correct: false, feedback: "You only computed 2n and forgot to add 9.", misconceptionId: "E-r10-a" },
        { text: "18", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-b" },
        { text: "21", correct: false, feedback: "You used n=6 by mistake.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student computes only 2n (2×3=6) plus some extra amount, or otherwise forgets to correctly add 9 to complete the expression.",
        rootCause: "Second Step Omitted — completes the multiplication but forgets to add the constant term correctly.",
        remediation: "The expression is 2n+9, not just 2n — after computing 2×3=6, you must ALSO add 9: 6+9=15, not 12."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes an arithmetic slip while evaluating the expression, landing on 18 instead of the correct 15.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2×3=6, then 6+9=15, not 18."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student substitutes an incorrect value for n (using 6 instead of the given 3), leading to a wrong evaluation.",
        rootCause: "Wrong Substitution Value Used — substitutes a value other than the one given for the variable.",
        remediation: "The question states n=3, not n=6 — substitute the CORRECT value: 2×3+9=15, not 2×6+9=21."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute n=3 into 2n", hint: "2 × 3 = 6." },
      { level: 2, description: "Apply the second operation", hint: "Add 9 to the result." },
      { level: 3, description: "Compute", hint: "6 + 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-01",
    question: "A sequence follows the rule ×3−1. The 3rd term is 14. Find the 1st term.",
    options: [
        { text: "2", correct: true, feedback: "Reverse: 3rd=14, 2nd=(14+1)/3=5, 1st=(5+1)/3=2." },
        { text: "4", correct: false, feedback: "Incorrect reverse steps.", misconceptionId: "E-r11-a" },
        { text: "3", correct: false, feedback: "Incorrect reverse steps.", misconceptionId: "E-r11-b" },
        { text: "5", correct: false, feedback: "That's the 2nd term, not the 1st.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 4 instead of the correct 2.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2nd=(14+1)÷3=5, then 1st=(5+1)÷3=2, not 4."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 3 instead of the correct 2.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2nd=(14+1)÷3=5, then 1st=(5+1)÷3=2, not 3."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student stops after computing the 2nd term (5) working backwards, instead of continuing one more reversal step to reach the 1st term.",
        rootCause: "Reversal Not Continued to the Requested Term — stops the backward process too early.",
        remediation: "You need to reverse TWICE to go from the 3rd term back to the 1st: 3rd(14)→2nd((14+1)÷3=5)→1st((5+1)÷3=2) — don't stop at the 2nd term (5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse from the 3rd term to the 2nd", hint: "Undo 'subtract 1' then 'multiply by 3': (14+1)÷3=5." },
      { level: 2, description: "Reverse from the 2nd term to the 1st", hint: "Apply the same reversal again to 5." },
      { level: 3, description: "Compute", hint: "(5+1)÷3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMTWOSTEP-01",
    question: "Twice a number, minus 5, equals 15. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "2n − 5 = 15 → 2n = 20 → n = 10." },
        { text: "5", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-r12-a" },
        { text: "20", correct: false, feedback: "You only computed 2n's coefficient value, not solved for n.", misconceptionId: "E-r12-b" },
        { text: "15", correct: false, feedback: "You gave the right-hand side of the equation.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student makes an arithmetic slip while solving the two-step equation, landing on 5 instead of the correct 10.",
        rootCause: "Computation Error — correct equation, but the solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 2n-5=15, add 5: 2n=20, divide by 2: n=10, not 5."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student correctly finds 2n=20 but stops there, reporting 20 instead of dividing by 2 to find n.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "Solving 2n-5=15 requires TWO steps — after adding 5 (2n=20), you must ALSO divide by 2: 20÷2=10, not just 20."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student reports the right-hand side value (15) itself instead of solving for n.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a value from the equation with the value being solved for.",
        remediation: "15 is the RESULT of 2n-5, not n itself — to find n, add 5 (2n=20) then divide by 2 (n=10), not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "2n - 5 = 15." },
      { level: 2, description: "Undo the subtraction first", hint: "Add 5 to both sides: 2n = 20." },
      { level: 3, description: "Undo the multiplication", hint: "20 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
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

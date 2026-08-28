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
    skillId: "PATTWOSTEP-01",
    question: "The pattern 4, 9, 19, 39, … follows the rule ×2+1. Find the 7th term.",
    options: [
        { text: "319", correct: true, feedback: "4→9→19→39→79→159→319." },
        { text: "159", correct: false, feedback: "That's the 6th term.", misconceptionId: "E-w1-a" },
        { text: "79", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-w1-b" },
        { text: "320", correct: false, feedback: "Close, but check the final step.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Apply the rule repeatedly: start at 4, keep doing ×2+1 until you reach the 7th term.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student stops one term early, reporting the 6th term (159) instead of the requested 7th term (319).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 39 is the 4th term, 79 is the 5th, 159 is the 6TH, 319 is the 7TH term — the question asks for the 7th term (319), not the 6th (159)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student stops two terms early, reporting the 5th term (79) instead of the requested 7th term (319).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 39 is the 4th term, 79 is the 5TH, 159 is the 6th, 319 is the 7TH term — the question asks for the 7th term (319), not the 5th (79)."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student makes a small arithmetic slip in the final application of the rule, landing on 320 instead of the correct 319.",
        rootCause: "Computation Error — correct approach, but the final calculation is carried out incorrectly.",
        remediation: "Recompute carefully: 159×2=318, then 318+1=319, not 320."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the terms step by step", hint: "4, 9, 19, 39, 39×2+1=79, 79×2+1=159." },
      { level: 2, description: "Apply the rule once more", hint: "159×2+1 = ?" },
      { level: 3, description: "Confirm this is the 7th term", hint: "1st=4, 2nd=9, 3rd=19, 4th=39, 5th=79, 6th=159, 7th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 28. Rule: multiply by 4, then subtract 8. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: 28+8=36; 36÷4=9." },
        { text: "120", correct: false, feedback: "You did 28×4+8 — wrong reversal order.", misconceptionId: "E-w2-a" },
        { text: "6", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-w2-b" },
        { text: "12", correct: false, feedback: "Incorrect.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Undo the operations in reverse order: first add 8, then divide by 4.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student applies the ORIGINAL rule (×4 then −8) to the output instead of reversing it, leading to a drastically wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: add 8 (undoing subtract 8), then divide by 4 (undoing multiply by 4) — 28+8=36, 36÷4=9, not 28×4+8=120."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 6 instead of the correct 9.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 28+8=36, then 36÷4=9, not 6."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student reverses only one of the two steps, or applies the reversal in the wrong order, leading to an incorrect input.",
        rootCause: "Reversal Steps Incomplete or Misordered — doesn't correctly undo both operations in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'subtract 8' by adding 8 (28+8=36), THEN undo 'multiply by 4' by dividing by 4 (36÷4=9) — not skipping a step or reversing the order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'subtract 8' — undo it by adding 8: 28+8=36." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'multiply by 4' — undo it by dividing by 4." },
      { level: 3, description: "Compute", hint: "36 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBRACKET-01",
    question: "Solve \\( 4(x - 3) = 20 \\). Find \\( x \\).",
    options: [
        { text: "8", correct: true, feedback: "Divide by 4 → x−3=5 → x=8." },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-w3-a" },
        { text: "23", correct: false, feedback: "You added 3 to 20? 4x−12=20 → 4x=32 → x=8.", misconceptionId: "E-w3-b" },
        { text: "5", correct: false, feedback: "That's x−3, not x.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Divide both sides by 4 first, then add 3.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student divides both sides by 4 incorrectly or applies an unrelated operation, landing on 2 instead of the correct 8.",
        rootCause: "Computation Error — correct approach, but the division or addition is carried out incorrectly.",
        remediation: "Recompute carefully: 20÷4=5 (giving x-3=5), then add 3: 5+3=8, not 2."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student adds 3 directly to 20 instead of first dividing by 4, skipping the necessary first step.",
        rootCause: "Bracket Not Cleared First — attempts to undo the operations without first dividing out the multiplier applied to the whole bracket.",
        remediation: "The 4 multiplies the ENTIRE bracket (x-3) — you must first divide by 4 to isolate (x-3): 20÷4=5, THEN add 3: 5+3=8; don't add 3 to 20 directly."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student correctly finds x-3=5 but stops there, reporting 5 instead of adding 3 to find x itself.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "x-3=5 is only PART of the solution — you must ALSO add 3 to undo the subtraction: 5+3=8, not just 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the multiplication first", hint: "Divide both sides by 4: 20÷4=5, giving x-3=5." },
      { level: 2, description: "Now undo the subtraction", hint: "Add 3 to both sides." },
      { level: 3, description: "Compute", hint: "5 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPREVALQUAD-01",
    question: "Evaluate \\( 2n^2 + 3n - 5 \\) when \\( n = 4 \\).",
    options: [
        { text: "39", correct: true, feedback: "2×16 + 12 − 5 = 32+12−5 = 39." },
        { text: "35", correct: false, feedback: "You forgot the +3n term.", misconceptionId: "E-w4-a" },
        { text: "45", correct: false, feedback: "You added instead of subtracted 5? No.", misconceptionId: "E-w4-b" },
        { text: "27", correct: false, feedback: "Incorrect.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Substitute n=4: compute 4²=16, then 2×16=32, 3×4=12. Then 32+12−5.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student computes 2n² and subtracts 5 (32-5=27, or a similar slip) but forgets the +3n term entirely.",
        rootCause: "Term Omitted — drops one of the three terms in the expression during evaluation.",
        remediation: "The expression has THREE terms: 2n², 3n, AND -5 — you must include ALL of them: 32+12-5=39, not just 32-5 (which forgets 3n=12)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student adds 5 instead of subtracting, applying the wrong sign to the last term.",
        rootCause: "Sign Error — treats a subtraction term as addition.",
        remediation: "The expression is 2n²+3n-5, so the last term is SUBTRACTED — 32+12-5=39, not 32+12+5=49 (adding 5 by mistake)."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student makes an error computing n² or one of the multiplication steps, leading to an incorrect total.",
        rootCause: "Computation Error — correct approach, but the arithmetic in one or more steps is carried out incorrectly.",
        remediation: "Recompute each term carefully: n²=4×4=16, 2n²=2×16=32, 3n=3×4=12 — then 32+12-5=39, not 27."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each term separately", hint: "n²=16, so 2n²=32. 3n=12." },
      { level: 2, description: "Combine the terms with the correct signs", hint: "32 + 12 - 5." },
      { level: 3, description: "Compute", hint: "32 + 12 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-01",
    question: "A sequence follows the rule ×2+3. The 4th term is 61. Find the 2nd term.",
    options: [
        { text: "13", correct: true, feedback: "Reverse: 3rd=(61−3)÷2=29; 2nd=(29−3)÷2=13." },
        { text: "29", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-w5-a" },
        { text: "15", correct: false, feedback: "Incorrect reverse calculation.", misconceptionId: "E-w5-b" },
        { text: "11", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Work backwards: subtract 3, then divide by 2. Do this twice.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student stops after computing the 3rd term (29) working backwards, instead of continuing one more reversal step to reach the 2nd term.",
        rootCause: "Reversal Not Continued to the Requested Term — stops the backward process too early.",
        remediation: "You need to reverse TWICE to go from the 4th term back to the 2nd: 4th(61)→3rd((61-3)÷2=29)→2nd((29-3)÷2=13) — don't stop at the 3rd term (29)."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 15 instead of the correct 13.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3rd=(61-3)÷2=29, then 2nd=(29-3)÷2=13, not 15."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 11 instead of the correct 13.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3rd=(61-3)÷2=29, then 2nd=(29-3)÷2=13, not 11."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse from the 4th term to the 3rd", hint: "Undo 'add 3' then 'multiply by 2': (61-3)÷2=29." },
      { level: 2, description: "Reverse from the 3rd term to the 2nd", hint: "Apply the same reversal again to 29." },
      { level: 3, description: "Compute", hint: "(29-3)÷2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMLINEAR-01",
    question: "A pen costs ₹8 more than a pencil. Two pens and three pencils cost ₹41. Find the cost of one pencil.",
    options: [
        { text: "₹5", correct: true, feedback: "Pencil = p. Pen = p+8. 2(p+8)+3p=41 → 5p+16=41 → p=5." },
        { text: "₹8", correct: false, feedback: "That's the difference in price.", misconceptionId: "E-w6-a" },
        { text: "₹13", correct: false, feedback: "That's the price of a pen (5+8).", misconceptionId: "E-w6-b" },
        { text: "₹10", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Let pencil = p. Write the cost of a pen. Set up total cost equation and solve.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student reports the price DIFFERENCE between pen and pencil (8) instead of solving for the pencil's actual price.",
        rootCause: "Given Relationship Reported Instead of Solved Unknown — confuses the stated difference with the value being solved for.",
        remediation: "8 is just the PRICE DIFFERENCE between pen and pencil, not the pencil's price itself — you must set up and solve 2(p+8)+3p=41 to find p=5, not just report the difference (8)."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student correctly solves for the pencil's price (5) but then reports the pen's price (13) instead of the pencil's, as the question asks.",
        rootCause: "Wrong Quantity Reported — solves correctly but answers with the other item's value.",
        remediation: "The question asks for the PENCIL's cost, not the pen's — after solving p=5 (pencil), the pen would be p+8=13, but the question wants the pencil's price: 5, not 13."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student makes an arithmetic slip while setting up or solving the equation, landing on 10 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the equation-solving steps are carried out incorrectly.",
        remediation: "Recompute carefully: 2(p+8)+3p=41 expands to 2p+16+3p=41, combine like terms: 5p+16=41, subtract 16: 5p=25, divide by 5: p=5, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Define the variable and write the pen's price in terms of it", hint: "Let pencil = p. Pen = p + 8." },
      { level: 2, description: "Write the total cost equation", hint: "2 pens + 3 pencils = 41: 2(p+8) + 3p = 41." },
      { level: 3, description: "Expand and solve", hint: "2p+16+3p=41 → 5p+16=41 → 5p=25 → p=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATFORMULA-01",
    question: "The pattern 2, 6, 12, 20, 30, … has the rule n(n+1). Find the 8th term.",
    options: [
        { text: "72", correct: true, feedback: "8×(8+1) = 8×9 = 72." },
        { text: "56", correct: false, feedback: "That's 7×8, the 7th term.", misconceptionId: "E-w7-a" },
        { text: "90", correct: false, feedback: "That's 9×10, the 9th term.", misconceptionId: "E-w7-b" },
        { text: "42", correct: false, feedback: "That's 6×7.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "The nth term is n(n+1). Substitute n=8.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student uses n=7 instead of n=8, computing the 7th term instead of the requested 8th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 8TH term, substitute n=8 into the formula: 8×(8+1)=8×9=72, not n=7 which gives 7×8=56 (the 7th term)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student uses n=9 instead of n=8, computing the 9th term instead of the requested 8th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 8TH term, substitute n=8 into the formula: 8×(8+1)=8×9=72, not n=9 which gives 9×10=90 (the 9th term)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student uses n=6 instead of n=8, computing the 6th term instead of the requested 8th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 8TH term, substitute n=8 into the formula: 8×(8+1)=8×9=72, not n=6 which gives 6×7=42 (the 6th term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the formula and the position asked for", hint: "nth term = n(n+1); the question asks for the 8th term, so n=8." },
      { level: 2, description: "Substitute n=8", hint: "8 × (8+1)." },
      { level: 3, description: "Compute", hint: "8 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCCHAIN-01",
    question: "Machine A: add 5. Machine B: multiply by 3. Input to A is 4. Output of A goes to B. Find the final output.",
    options: [
        { text: "27", correct: true, feedback: "4 → A → 9 → B → 27." },
        { text: "17", correct: false, feedback: "You added 5 to 12? Not correct.", misconceptionId: "E-w8-a" },
        { text: "12", correct: false, feedback: "You only multiplied 4 by 3, ignoring Machine A.", misconceptionId: "E-w8-b" },
        { text: "45", correct: false, feedback: "You did 4×3=12 then +5? Order matters — it's A then B.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "First apply Machine A to the input, then feed the result into Machine B.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student computes Machine B's operation first (4×3=12) and then applies Machine A's operation, reversing the stated order.",
        rootCause: "Machine Order Reversed — applies Machine B before Machine A instead of following the stated A-then-B sequence.",
        remediation: "The question states the input goes to Machine A FIRST, then the result goes to Machine B — 4+5=9 (Machine A), THEN 9×3=27 (Machine B), not 4×3=12 then +5=17."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student applies only Machine B (multiply by 3) to the original input, completely skipping Machine A.",
        rootCause: "One Machine Skipped — ignores one of the two machines in the chain.",
        remediation: "The input must pass through BOTH machines — first Machine A (4+5=9), THEN Machine B (9×3=27) — don't skip Machine A and multiply 4×3=12 directly."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student applies Machine B first (4×3=12) then adds 5, reversing the stated order of the two machines.",
        rootCause: "Machine Order Reversed — applies Machine B before Machine A instead of following the stated A-then-B sequence.",
        remediation: "The chain is A THEN B — apply Machine A first (4+5=9), THEN Machine B (9×3=27) — not Machine B first (4×3=12) followed by Machine A's operation (+5=17), and not the sum 12+5+... etc."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply Machine A to the input", hint: "4 + 5 = 9." },
      { level: 2, description: "Feed the result into Machine B", hint: "Machine B multiplies by 3." },
      { level: 3, description: "Compute", hint: "9 × 3 = ?" }
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
    skillId: "PATCOMPARE-01",
    question: "A pattern starts at 1 and follows the rule ×3 − 1. Find the difference between the 5th term and the 3rd term.",
    options: [
        { text: "36", correct: true, feedback: "t1=1, t2=2, t3=5, t4=14, t5=41. 41−5 = 36." },
        { text: "30", correct: false, feedback: "Incorrect difference.", misconceptionId: "E-d1-a" },
        { text: "40", correct: false, feedback: "Close, but check 41−5.", misconceptionId: "E-d1-b" },
        { text: "14", correct: false, feedback: "That's the 4th term only.", misconceptionId: "E-d1-c" }
      ],
    backward: "Compute each term step‑by‑step, then subtract.",
    forward: "Comparing terms helps understand how quickly a sequence grows.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student makes an arithmetic slip while building the sequence or computing the final difference, landing on 30 instead of the correct 36.",
        rootCause: "Computation Error — correct approach, but the sequence-building or subtraction is carried out incorrectly.",
        remediation: "Recompute each term carefully: t1=1, t2=1×3-1=2, t3=2×3-1=5, t4=5×3-1=14, t5=14×3-1=41 — then 41-5=36, not 30."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student makes a small arithmetic slip in the final subtraction step, landing on 40 instead of the correct 36.",
        rootCause: "Computation Error — correct sequence, but the final subtraction is carried out incorrectly.",
        remediation: "Recompute the final step: t5=41, t3=5, so 41-5=36, not 40."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student reports a single term (the 4th, 14) instead of computing the DIFFERENCE between the 5th and 3rd terms.",
        rootCause: "Difference Step Omitted — reports an individual term instead of the requested comparison.",
        remediation: "The question asks for the DIFFERENCE between two specific terms (5th and 3rd), not any single term — compute t5=41 and t3=5, then subtract: 41-5=36, not just t4=14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Build the sequence up to the 3rd term", hint: "t1=1, t2=1×3-1=2, t3=2×3-1=5." },
      { level: 2, description: "Continue to the 5th term", hint: "t4=5×3-1=14, t5=14×3-1=41." },
      { level: 3, description: "Subtract the 3rd term from the 5th", hint: "41 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 15. Rule: add 7, then divide by 2. Find the input.",
    options: [
        { text: "23", correct: true, feedback: "Reverse: 15×2=30; 30−7=23." },
        { text: "37", correct: false, feedback: "You did 15×2+7=37 — wrong order.", misconceptionId: "E-d2-a" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d2-b" },
        { text: "16", correct: false, feedback: "Incorrect.", misconceptionId: "E-d2-c" }
      ],
    backward: "Undo in reverse order: multiply by 2 first, then subtract 7.",
    forward: "Reversing functions is the same logic as solving equations.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student reverses the two steps but applies them in the wrong order (multiply then add, instead of multiply then subtract), leading to an incorrect input.",
        rootCause: "Reversal Steps Misordered — undoes the correct operations but doesn't apply them in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'divide by 2' by multiplying by 2 (15×2=30), THEN undo 'add 7' by SUBTRACTING 7 (30-7=23) — not adding 7 again."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 8 instead of the correct 23.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 15×2=30, then 30-7=23, not 8."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student reverses only one of the two steps and stops, without correctly completing the second reversal.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps — after multiplying by 2 (15×2=30), you must ALSO subtract 7 (undoing the original 'add 7'): 30-7=23, not just 30 or a partial result."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'divide by 2' — undo it by multiplying by 2: 15×2=30." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'add 7' — undo it by subtracting 7." },
      { level: 3, description: "Compute", hint: "30 - 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBRACKET-01",
    question: "Solve \\( 2(x + 5) = 32 \\). Find \\( x \\).",
    options: [
        { text: "11", correct: true, feedback: "Divide by 2 → x+5=16 → x=11." },
        { text: "27", correct: false, feedback: "You added 5 to 32? No.", misconceptionId: "E-d3-a" },
        { text: "21", correct: false, feedback: "Incorrect.", misconceptionId: "E-d3-b" },
        { text: "16", correct: false, feedback: "That's x+5, not x.", misconceptionId: "E-d3-c" }
      ],
    backward: "Divide both sides by 2 first, or expand the bracket.",
    forward: "Equations with brackets appear in many geometric formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student adds 5 directly to 32 instead of first dividing by 2, skipping the necessary first step.",
        rootCause: "Bracket Not Cleared First — attempts to undo the operations without first dividing out the multiplier applied to the whole bracket.",
        remediation: "The 2 multiplies the ENTIRE bracket (x+5) — you must first divide by 2 to isolate (x+5): 32÷2=16, THEN subtract 5: 16-5=11; don't add 5 to 32 directly."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student makes an arithmetic slip while dividing or subtracting, landing on 21 instead of the correct 11.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 32÷2=16 (giving x+5=16), then 16-5=11, not 21."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student correctly finds x+5=16 but stops there, reporting 16 instead of subtracting 5 to find x itself.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "x+5=16 is only PART of the solution — you must ALSO subtract 5 to undo the addition: 16-5=11, not just 16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the multiplication first", hint: "Divide both sides by 2: 32÷2=16, giving x+5=16." },
      { level: 2, description: "Now undo the addition", hint: "Subtract 5 from both sides." },
      { level: 3, description: "Compute", hint: "16 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRFORMULA-01",
    question: "A rectangle has length \\( 2x+1 \\) and width \\( x+3 \\). Find its perimeter when \\( x = 4 \\).",
    options: [
        { text: "32", correct: true, feedback: "Perimeter = 2[(2x+1)+(x+3)] = 2(3x+4) = 6x+8. At x=4 → 32." },
        { text: "24", correct: false, feedback: "You only summed the expressions without doubling.", misconceptionId: "E-d4-a" },
        { text: "40", correct: false, feedback: "Incorrect substitution.", misconceptionId: "E-d4-b" },
        { text: "28", correct: false, feedback: "Incorrect.", misconceptionId: "E-d4-c" }
      ],
    backward: "Write the perimeter formula, substitute, and simplify.",
    forward: "Algebraic expressions for perimeter are used in design.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student computes length+width but forgets to double the sum (since perimeter = 2×(length+width)), reporting only the single sum.",
        rootCause: "Perimeter Doubling Step Omitted — treats perimeter as length+width instead of 2×(length+width).",
        remediation: "Perimeter of a rectangle is 2×(length+width), not just length+width — at x=4: length=9, width=7, sum=16, perimeter=2×16=32, not just 16+... (24 would come from a different miscalculation, but the key fix is: always double the sum)."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student substitutes x=4 incorrectly into the length or width expressions, leading to a wrong perimeter.",
        rootCause: "Substitution Error — miscalculates one or both side lengths when substituting x=4.",
        remediation: "Carefully substitute x=4: length=2(4)+1=9, width=4+3=7 — then perimeter=2×(9+7)=2×16=32, not 40 (check each substitution step)."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student makes an arithmetic slip in computing the sum or the final doubling, landing on 28 instead of the correct 32.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: length=2(4)+1=9, width=4+3=7, sum=16, perimeter=2×16=32, not 28."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute x=4 into length and width", hint: "Length = 2(4)+1=9. Width = 4+3=7." },
      { level: 2, description: "Add length and width", hint: "9 + 7 = 16." },
      { level: 3, description: "Double the sum for the perimeter", hint: "2 × 16 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-01",
    question: "The 3rd term of a sequence is 25. The rule is ×3 − 5. Find the 1st term.",
    options: [
        { text: "5", correct: true, feedback: "2nd = (25+5)÷3 = 10; 1st = (10+5)÷3 = 5." },
        { text: "10", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d5-a" },
        { text: "15", correct: false, feedback: "Incorrect reverse.", misconceptionId: "E-d5-b" },
        { text: "20", correct: false, feedback: "Incorrect.", misconceptionId: "E-d5-c" }
      ],
    backward: "Reverse the rule step‑by‑step.",
    forward: "Working backwards builds inverse‑thinking skills.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student stops after computing the 2nd term (10) working backwards, instead of continuing one more reversal step to reach the 1st term.",
        rootCause: "Reversal Not Continued to the Requested Term — stops the backward process too early.",
        remediation: "You need to reverse TWICE to go from the 3rd term back to the 1st: 3rd(25)→2nd((25+5)÷3=10)→1st((10+5)÷3=5) — don't stop at the 2nd term (10)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 15 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2nd=(25+5)÷3=10, then 1st=(10+5)÷3=5, not 15."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student makes an arithmetic slip while working backwards through the two reversal steps, landing on 20 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2nd=(25+5)÷3=10, then 1st=(10+5)÷3=5, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse from the 3rd term to the 2nd", hint: "Undo 'subtract 5' then 'multiply by 3': (25+5)÷3=10." },
      { level: 2, description: "Reverse from the 2nd term to the 1st", hint: "Apply the same reversal again to 10." },
      { level: 3, description: "Compute", hint: "(10+5)÷3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMBOTHSIDES-01",
    question: "A number multiplied by 3, plus 7, equals the number multiplied by 5, minus 3. Find the number.",
    options: [
        { text: "5", correct: true, feedback: "3n+7 = 5n−3 → 10 = 2n → n = 5." },
        { text: "10", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d6-a" },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-d6-b" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d6-c" }
      ],
    backward: "Collect like terms on each side.",
    forward: "Many real‑world situations lead to equations with variables on both sides.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student correctly finds 2n=10 but reports 10 (the value of 2n) instead of dividing by 2 to find n.",
        rootCause: "Second Step Omitted — completes the collection of like terms but fails to divide out the coefficient.",
        remediation: "2n=10 is only PART of the solution — you must ALSO divide by 2 to isolate n: 10÷2=5, not just 10."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student makes an error collecting the variable terms or constants onto the wrong sides, leading to an incorrect equation and answer.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "Move variable terms to one side and constants to the other, keeping signs consistent: 3n+7=5n-3 → 7+3=5n-3n → 10=2n → n=5, not 2 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student makes an arithmetic slip while collecting like terms, landing on 8 instead of the correct 5.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3n+7=5n-3, move terms: 7+3=5n-3n, so 10=2n, and n=5, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Move the variable terms to one side", hint: "3n+7=5n-3 → subtract 3n from both sides: 7=2n-3." },
      { level: 2, description: "Move the constants to the other side", hint: "Add 3 to both sides: 10=2n." },
      { level: 3, description: "Divide to isolate n", hint: "10 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATFORMULA-01",
    question: "The nth term of a pattern is \\( 2n^2 + 1 \\). Find the 5th term.",
    options: [
        { text: "51", correct: true, feedback: "2×25 + 1 = 51." },
        { text: "26", correct: false, feedback: "You used 5²=25 but forgot to multiply by 2.", misconceptionId: "E-d7-a" },
        { text: "41", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-b" },
        { text: "61", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    backward: "Substitute n=5 into the formula.",
    forward: "Using formulas is faster than building the whole sequence.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student computes n²=25 and adds 1 (getting 26) but forgets to multiply by 2, skipping part of the formula.",
        rootCause: "Coefficient Omitted — forgets to apply the multiplier in front of the squared term.",
        remediation: "The formula is 2n²+1, not just n²+1 — after computing n²=25, you must ALSO multiply by 2: 2×25=50, then add 1: 51, not just 25+1=26."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student makes an arithmetic slip while computing 2n² or adding 1, landing on 41 instead of the correct 51.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 5²=25, 2×25=50, then 50+1=51, not 41."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student makes an arithmetic slip while computing 2n² or adding 1, landing on 61 instead of the correct 51.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 5²=25, 2×25=50, then 50+1=51, not 61."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute n²", hint: "5² = 25." },
      { level: 2, description: "Multiply by the coefficient", hint: "2 × 25 = 50." },
      { level: 3, description: "Add the constant", hint: "50 + 1 = ?" }
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
    question: "Output = 30. Rule: add 6, then multiply by 2. Find the input.",
    options: [
        { text: "9", correct: true, feedback: "Reverse: 30÷2=15; 15−6=9." },
        { text: "12", correct: false, feedback: "Incorrect reversal order.", misconceptionId: "E-d8-a" },
        { text: "18", correct: false, feedback: "Incorrect.", misconceptionId: "E-d8-b" },
        { text: "24", correct: false, feedback: "Incorrect.", misconceptionId: "E-d8-c" }
      ],
    backward: "Undo in reverse order: divide by 2 first, then subtract 6.",
    forward: "Understanding reverse operations is key to solving equations.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student reverses the two steps but applies them in the wrong order (subtract then divide, instead of divide then subtract), leading to an incorrect input.",
        rootCause: "Reversal Steps Misordered — undoes the correct operations but doesn't apply them in the proper reverse sequence.",
        remediation: "Reverse BOTH steps in REVERSE order: first undo 'multiply by 2' by dividing by 2 (30÷2=15), THEN undo 'add 6' by SUBTRACTING 6 (15-6=9) — not subtracting before dividing."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student reverses only the division step and stops, without also subtracting 6 to fully undo the 'add 6' step.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps — after dividing by 2 (30÷2=15), you must ALSO subtract 6 (undoing the original 'add 6'): 15-6=9, not just 15+3 or another partial result (18)."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 24 instead of the correct 9.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 30÷2=15, then 15-6=9, not 24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'multiply by 2' — undo it by dividing by 2: 30÷2=15." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'add 6' — undo it by subtracting 6." },
      { level: 3, description: "Compute", hint: "15 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNFRACTION-01",
    question: "Solve \\( \\frac{5x}{2} - 3 = 7 \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "Add 3 → 5x/2=10; ×2 → 5x=20; x=4." },
        { text: "2", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-a" },
        { text: "10", correct: false, feedback: "You only did the first step.", misconceptionId: "E-d9-b" },
        { text: "5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-c" }
      ],
    backward: "Clear the fraction by multiplying both sides by 2, but only after isolating the fraction term.",
    forward: "Fraction equations model many real‑life sharing problems.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student makes an arithmetic slip in one of the multi-step operations, landing on 2 instead of the correct 4.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 5x/2=10 (after adding 3), then 5x=20 (multiplying by 2), then x=4 (dividing by 5), not 2."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student adds 3 to get 5x/2=10 but stops there, reporting 10 instead of completing the remaining steps to solve for x.",
        rootCause: "Later Steps Omitted — completes the first inverse operation but fails to clear the fraction and isolate x.",
        remediation: "5x/2=10 is only the FIRST step — you must ALSO multiply by 2 (5x=20) and then divide by 5 (x=4): don't stop at 10."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student correctly reaches 5x=20 but makes an error in the final division, landing on 5 instead of the correct 4.",
        rootCause: "Computation Error — correct approach through most steps, but the final division is carried out incorrectly.",
        remediation: "Recompute the final step: 5x=20, divide by 5: 20÷5=4, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Isolate the fraction term", hint: "Add 3 to both sides: 5x/2 = 10." },
      { level: 2, description: "Clear the fraction", hint: "Multiply both sides by 2: 5x = 20." },
      { level: 3, description: "Solve for x", hint: "20 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRFORMULA-02",
    question: "The cost of hiring a bike is ₹50 plus ₹15 per hour. Find the total cost for 3 hours.",
    options: [
        { text: "₹95", correct: true, feedback: "Expression: 50+15h. At h=3 → 50+45 = 95." },
        { text: "₹65", correct: false, feedback: "You only used the hourly cost (15×3) and forgot the fixed fee.", misconceptionId: "E-d10-a" },
        { text: "₹105", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-b" },
        { text: "₹80", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-c" }
      ],
    backward: "Write the expression, then substitute.",
    forward: "Linear expressions model many service costs.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student computes only the hourly charge (15×3=45, rounded/reported as 65 due to an added error) and forgets the fixed ₹50 fee.",
        rootCause: "Fixed Fee Omitted — computes only the variable (hourly) part of the cost, ignoring the flat starting charge.",
        remediation: "The total cost includes a FIXED ₹50 fee PLUS the hourly charge — 50+(15×3)=50+45=95, not just the hourly charge alone."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student makes an arithmetic slip while computing the total, landing on 105 instead of the correct 95.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 15×3=45, then 50+45=95, not 105."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student makes an arithmetic slip while computing the total, landing on 80 instead of the correct 95.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 15×3=45, then 50+45=95, not 80."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the expression", hint: "fixed fee + rate × hours: 50 + 15h." },
      { level: 2, description: "Substitute h=3", hint: "50 + 15×3." },
      { level: 3, description: "Compute", hint: "50 + 45 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-02",
    question: "A sequence follows the rule ×2+1. The 2nd term is 7. Find the 5th term.",
    options: [
        { text: "63", correct: true, feedback: "1st = (7−1)÷2 = 3. Then 3→7→15→31→63." },
        { text: "31", correct: false, feedback: "That's the 4th term.", misconceptionId: "E-d11-a" },
        { text: "15", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d11-b" },
        { text: "127", correct: false, feedback: "That would be the 6th term.", misconceptionId: "E-d11-c" }
      ],
    backward: "First find the 1st term by reversing the rule, then build forward.",
    forward: "Sequences can be explored from any starting point.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student stops one term early, reporting the 4th term (31) instead of the requested 5th term (63).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 1st=3, 2nd=7, 3rd=15, 4th=31, 5th=63 — the question asks for the 5th term (63), not the 4th (31)."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student stops two terms early, reporting the 3rd term (15) instead of the requested 5th term (63).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 1st=3, 2nd=7, 3rd=15, 4th=31, 5th=63 — the question asks for the 5th term (63), not the 3rd (15)."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student computes one term too far, reporting the 6th term (127) instead of the requested 5th term (63).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 1st=3, 2nd=7, 3rd=15, 4th=31, 5th=63 is the 5TH term, and 127 is the 6TH — the question asks for the 5th term (63), not the 6th (127)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the 1st term by reversing the rule from the 2nd", hint: "(7-1)÷2 = 3." },
      { level: 2, description: "Build forward from the 1st term", hint: "3, 3×2+1=7, 7×2+1=15, 15×2+1=31." },
      { level: 3, description: "Find the 5th term", hint: "31×2+1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMAGE-01",
    question: "A father is 3 times as old as his son. In 10 years, he will be twice as old. Find the son's current age.",
    options: [
        { text: "10", correct: true, feedback: "Son = s. Father = 3s. 3s+10 = 2(s+10) → s=10." },
        { text: "5", correct: false, feedback: "Then father 15, in 10 years 25 and 15 — not twice.", misconceptionId: "E-d12-a" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-b" },
        { text: "20", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-c" }
      ],
    backward: "Set up expressions for their ages now and in the future, then form an equation.",
    forward: "Age problems are classic algebra puzzles.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student guesses a value (5) without setting up and solving the actual equation, and it doesn't satisfy the 'twice as old in 10 years' condition.",
        rootCause: "Equation Not Set Up or Solved — guesses an answer instead of building and solving the algebraic model.",
        remediation: "Set up the equation properly: son=s, father=3s, in 10 years father=3s+10 and son=s+10, and father will be twice the son: 3s+10=2(s+10) — solving gives s=10, not a guessed value like 5 that doesn't satisfy the condition."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student makes an error setting up or solving the equation, landing on 15 instead of the correct 10.",
        rootCause: "Computation Error — correct equation structure, but the algebra is carried out incorrectly.",
        remediation: "Recompute carefully: 3s+10=2(s+10) expands to 3s+10=2s+20, subtract 2s: s+10=20, subtract 10: s=10, not 15."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes an error setting up or solving the equation, landing on 20 instead of the correct 10.",
        rootCause: "Computation Error — correct equation structure, but the algebra is carried out incorrectly.",
        remediation: "Recompute carefully: 3s+10=2(s+10) expands to 3s+10=2s+20, subtract 2s: s+10=20, subtract 10: s=10, not 20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Define variables for current ages", hint: "Son = s, Father = 3s." },
      { level: 2, description: "Write the future-age equation", hint: "In 10 years: father = 3s+10, son = s+10. Father will be twice the son: 3s+10 = 2(s+10)." },
      { level: 3, description: "Expand and solve", hint: "3s+10=2s+20 → s+10=20 → s=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATFORMULA-01",
    question: "The pattern 1, 3, 6, 10, … shows triangular numbers. Find the 7th term.",
    options: [
        { text: "28", correct: true, feedback: "7×8÷2 = 28." },
        { text: "21", correct: false, feedback: "That's the 6th term (6×7÷2).", misconceptionId: "E-d13-a" },
        { text: "36", correct: false, feedback: "That's the 8th term.", misconceptionId: "E-d13-b" },
        { text: "15", correct: false, feedback: "That's the 5th term.", misconceptionId: "E-d13-c" }
      ],
    backward: "The nth triangular number = n(n+1)/2.",
    forward: "Triangular numbers appear in arrangements of objects.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student uses n=6 instead of n=7, computing the 6th term instead of the requested 7th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 7TH term, substitute n=7 into the formula: 7×8÷2=28, not n=6 which gives 6×7÷2=21 (the 6th term)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student uses n=8 instead of n=7, computing the 8th term instead of the requested 7th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 7TH term, substitute n=7 into the formula: 7×8÷2=28, not n=8 which gives 8×9÷2=36 (the 8th term)."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student uses n=5 instead of n=7, computing the 5th term instead of the requested 7th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 7TH term, substitute n=7 into the formula: 7×8÷2=28, not n=5 which gives 5×6÷2=15 (the 5th term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the formula and the position asked for", hint: "nth term = n(n+1)/2; the question asks for the 7th term, so n=7." },
      { level: 2, description: "Substitute n=7", hint: "7 × (7+1) ÷ 2." },
      { level: 3, description: "Compute", hint: "7 × 8 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCCHAIN-02",
    question: "Machine P: add 3. Machine Q: multiply by 4. The output of Q is 36. Find the input to P.",
    options: [
        { text: "6", correct: true, feedback: "Output of P = 36÷4 = 9. Input to P = 9−3 = 6." },
        { text: "9", correct: false, feedback: "That's the output of P, not the input.", misconceptionId: "E-d14-a" },
        { text: "33", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-d14-b" },
        { text: "12", correct: false, feedback: "Incorrect.", misconceptionId: "E-d14-c" }
      ],
    backward: "Work backwards through the machines in reverse order.",
    forward: "Chained functions are used in computer programming.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student correctly reverses Machine Q to find P's output (9) but stops there, reporting 9 instead of continuing to reverse Machine P for its input.",
        rootCause: "Reversal Not Continued Through All Machines — stops the backward process before reaching the very first machine's input.",
        remediation: "9 is the OUTPUT of Machine P, not the INPUT — you must ALSO reverse Machine P (undo 'add 3' by subtracting 3): 9-3=6, not just 9."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student adds 3 to the output of Q (36) directly, instead of first reversing Machine Q to find P's output.",
        rootCause: "Machine Reversal Order Skipped — attempts to reverse the first machine before correctly reversing the second.",
        remediation: "Reverse the machines in REVERSE order — first undo Machine Q (36÷4=9), THEN undo Machine P (9-3=6) — don't add 3 to 36 directly (36+3=39, not even close to 33 either, so recheck the reversal order)."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes an arithmetic slip while reversing the two machines, landing on 12 instead of the correct 6.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 36÷4=9 (undoing Machine Q), then 9-3=6 (undoing Machine P), not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last machine first", hint: "Undo Machine Q (multiply by 4) by dividing: 36÷4=9." },
      { level: 2, description: "Reverse the first machine next", hint: "Undo Machine P (add 3) by subtracting 3." },
      { level: 3, description: "Compute", hint: "9 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBOTHSIDES-01",
    question: "Solve \\( 4(x - 2) = 3(x + 1) \\). Find \\( x \\).",
    options: [
        { text: "11", correct: true, feedback: "4x−8 = 3x+3 → x = 11." },
        { text: "5", correct: false, feedback: "Incorrect expansion.", misconceptionId: "E-d15-a" },
        { text: "1", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-b" },
        { text: "7", correct: false, feedback: "Incorrect.", misconceptionId: "E-d15-c" }
      ],
    backward: "Expand the brackets, then collect like terms.",
    forward: "Equations with variables on both sides are the gateway to advanced algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student expands one or both brackets incorrectly (e.g., 4(x-2)=4x-2 instead of 4x-8), leading to a wrong equation and answer.",
        rootCause: "Distributive Property Applied Incorrectly — doesn't multiply every term inside the bracket by the outside factor.",
        remediation: "Distribute CAREFULLY: 4(x-2)=4x-8 (4×x AND 4×(-2)), and 3(x+1)=3x+3 (3×x AND 3×1) — not partial distribution like 4x-2."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student makes a sign error or miscollects terms after expanding, landing on 1 instead of the correct 11.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "After expanding to 4x-8=3x+3, move variable terms to one side and constants to the other: 4x-3x=3+8 → x=11, not 1 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student makes an arithmetic slip while collecting like terms, landing on 7 instead of the correct 11.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 4x-8=3x+3, subtract 3x: x-8=3, add 8: x=11, not 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand both brackets", hint: "4(x-2)=4x-8. 3(x+1)=3x+3." },
      { level: 2, description: "Move variable terms to one side", hint: "4x-8=3x+3 → subtract 3x: x-8=3." },
      { level: 3, description: "Solve for x", hint: "x = 3 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRFORMULA-01",
    question: "Area of a trapezium = \\( \\frac{1}{2} \\times (a+b) \\times h \\). Find the area when \\( a=6 \\), \\( b=10 \\), \\( h=4 \\).",
    options: [
        { text: "32", correct: true, feedback: "½ × 16 × 4 = 32." },
        { text: "64", correct: false, feedback: "You forgot to halve.", misconceptionId: "E-d16-a" },
        { text: "16", correct: false, feedback: "You only did 6+10.", misconceptionId: "E-d16-b" },
        { text: "24", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-c" }
      ],
    backward: "Substitute the values into the formula and simplify.",
    forward: "Formulas are used everywhere in geometry and science.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student computes (a+b)×h=64 but forgets to multiply by ½, applying only part of the formula.",
        rootCause: "Halving Step Omitted — forgets the ½ factor at the start of the formula.",
        remediation: "The formula starts with ½ — after computing (6+10)×4=64, you must ALSO multiply by ½ (or divide by 2): 64÷2=32, not 64."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student computes only a+b (16) and stops, forgetting to multiply by h and by ½.",
        rootCause: "Later Steps Omitted — completes only the first part of the formula (a+b), not the multiplication by h or the halving.",
        remediation: "The formula is ½×(a+b)×h, not just (a+b) — after computing a+b=16, you must ALSO multiply by h (16×4=64) and then halve (64÷2=32), not stop at 16."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student makes an arithmetic slip while applying the formula's steps, landing on 24 instead of the correct 32.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: (6+10)=16, 16×4=64, then 64÷2=32, not 24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add a and b", hint: "6 + 10 = 16." },
      { level: 2, description: "Multiply by h", hint: "16 × 4 = 64." },
      { level: 3, description: "Multiply by ½ (halve the result)", hint: "64 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQRECURSIVE-01",
    question: "Start at 2. Rule: square the previous term, then subtract 1. Find the 3rd term.",
    options: [
        { text: "8", correct: true, feedback: "t1=2, t2=2²−1=3, t3=3²−1=8." },
        { text: "3", correct: false, feedback: "That's the 2nd term.", misconceptionId: "E-d17-a" },
        { text: "15", correct: false, feedback: "Incorrect squaring.", misconceptionId: "E-d17-b" },
        { text: "7", correct: false, feedback: "Incorrect rule applied.", misconceptionId: "E-d17-c" }
      ],
    backward: "Apply the rule exactly as stated: square first, then subtract.",
    forward: "Recursive sequences can grow very fast.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student stops one term early, reporting the 2nd term (3) instead of the requested 3rd term (8).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 2 is the 1st term, 3 is the 2nd term, 8 is the 3RD term — the question asks for the 3rd term (8), not the 2nd (3)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student makes an arithmetic slip while squaring the 2nd term, landing on 15 instead of the correct 8.",
        rootCause: "Computation Error — correct approach, but the squaring or subtraction is carried out incorrectly.",
        remediation: "Recompute carefully: t2=3, so t3=3²-1=9-1=8, not 15 (check that 3²=9, not a larger value)."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student applies the operations in the wrong order (subtract 1 first, then square) instead of the stated order (square first, then subtract 1).",
        rootCause: "Operation Order Reversed — applies the two steps in the wrong sequence.",
        remediation: "The rule says SQUARE FIRST, then subtract 1 — t3=3²-1=9-1=8, not (3-1)²=4 or another reversed-order result (7)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the 2nd term", hint: "t1=2, so t2=2²-1=3." },
      { level: 2, description: "Apply the rule to the 2nd term", hint: "t3=3²-1." },
      { level: 3, description: "Compute", hint: "3² - 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMCONSEC-01",
    question: "The sum of three consecutive numbers is 72. Find the middle number.",
    options: [
        { text: "24", correct: true, feedback: "(n−1)+n+(n+1)=3n=72 → n=24." },
        { text: "23", correct: false, feedback: "That's the smallest number.", misconceptionId: "E-d18-a" },
        { text: "25", correct: false, feedback: "That's the largest number.", misconceptionId: "E-d18-b" },
        { text: "72", correct: false, feedback: "That's the sum, not the number.", misconceptionId: "E-d18-c" }
      ],
    backward: "Let the middle number be n; the others are n−1 and n+1.",
    forward: "Consecutive number problems appear in many puzzles.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly solves for the middle number (24) but reports the smallest of the three consecutive numbers (23) instead.",
        rootCause: "Wrong Quantity Reported — solves correctly but answers with a different number in the sequence than asked.",
        remediation: "The question asks for the MIDDLE number — after solving n=24 (the middle number), don't report n-1=23 (the smallest), report n=24 itself."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student correctly solves for the middle number (24) but reports the largest of the three consecutive numbers (25) instead.",
        rootCause: "Wrong Quantity Reported — solves correctly but answers with a different number in the sequence than asked.",
        remediation: "The question asks for the MIDDLE number — after solving n=24 (the middle number), don't report n+1=25 (the largest), report n=24 itself."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student reports the given sum (72) instead of solving for the middle number.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses the total sum with the value being solved for.",
        remediation: "72 is the SUM of the three numbers, not any individual number — set up 3n=72 and solve: n=72÷3=24, not 72 itself."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent the three consecutive numbers using the middle one", hint: "Let the middle number be n; the others are n-1 and n+1." },
      { level: 2, description: "Write the sum equation", hint: "(n-1)+n+(n+1) = 72, which simplifies to 3n=72." },
      { level: 3, description: "Solve for n", hint: "72 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATRECURSIVE-01",
    question: "First two terms: 3 and 4. Rule: multiply the last term by 2, then subtract the term before it. Find the 5th term.",
    options: [
        { text: "7", correct: true, feedback: "3,4 → 2×4−3=5 → 2×5−4=6 → 2×6−5=7." },
        { text: "8", correct: false, feedback: "Incorrect rule application.", misconceptionId: "E-d19-a" },
        { text: "10", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-b" },
        { text: "5", correct: false, feedback: "That's the 3rd term.", misconceptionId: "E-d19-c" }
      ],
    backward: "Build the sequence step‑by‑step using the two previous terms.",
    forward: "Some sequences depend on more than one previous term.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student misapplies the rule, perhaps using the wrong pair of previous terms or doubling the wrong term, leading to an incorrect 5th term.",
        rootCause: "Two-Term Recursive Rule Misapplied — confuses which of the two previous terms to double and which to subtract.",
        remediation: "The rule says: double the LAST term, then subtract the term BEFORE it — for the 5th term: double t4(6) minus t3(5): 2×6-5=7, not a value from doubling the wrong term."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student makes an arithmetic slip while building the sequence step by step, landing on 10 instead of the correct 7.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute each term carefully: t3=2×4-3=5, t4=2×5-4=6, t5=2×6-5=7, not 10."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student stops two terms early, reporting the 3rd term (5) instead of the requested 5th term (7).",
        rootCause: "Off-By-Two Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: t1=3, t2=4, t3=5, t4=6, t5=7 — the question asks for the 5th term (7), not the 3rd (5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the 3rd term", hint: "2×t2-t1 = 2×4-3 = 5." },
      { level: 2, description: "Find the 4th term", hint: "2×t3-t2 = 2×5-4 = 6." },
      { level: 3, description: "Find the 5th term", hint: "2×t4-t3 = 2×6-5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-02",
    question: "Output = 35. Rule: square the input, then add 10. Find the positive input.",
    options: [
        { text: "5", correct: true, feedback: "x²+10=35 → x²=25 → x=5 (positive)." },
        { text: "25", correct: false, feedback: "That's x², not x.", misconceptionId: "E-d20-a" },
        { text: "45", correct: false, feedback: "You added 10 to 35.", misconceptionId: "E-d20-b" },
        { text: "15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    backward: "Subtract 10, then find the square root.",
    forward: "Inverse operations include square roots.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student correctly finds x²=25 but stops there, reporting 25 instead of taking the square root to find x.",
        rootCause: "Square Root Step Omitted — completes the subtraction but fails to reverse the squaring operation.",
        remediation: "x²=25 is only PART of the solution — you must ALSO take the square root to undo the squaring: √25=5, not 25 itself."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student adds 10 to the output instead of subtracting, applying the wrong inverse operation for the first reversal step.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 10, you must SUBTRACT 10 (the inverse operation) — 35-10=25, not 35+10=45."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 15 instead of the correct 5.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 35-10=25, then √25=5, not 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Undo the addition first", hint: "Subtract 10 from both sides: 35-10=25." },
      { level: 2, description: "Recognise this is x squared", hint: "x² = 25." },
      { level: 3, description: "Find the positive square root", hint: "√25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBOTHSIDES-01",
    question: "Solve \\( 2(3x - 1) = 4x + 10 \\). Find \\( x \\).",
    options: [
        { text: "6", correct: true, feedback: "6x−2 = 4x+10 → 2x=12 → x=6." },
        { text: "4", correct: false, feedback: "Incorrect expansion.", misconceptionId: "E-d21-a" },
        { text: "8", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-b" },
        { text: "12", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-c" }
      ],
    backward: "Expand the left side, then bring variable terms to one side.",
    forward: "Mastering these equations prepares you for high school algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student expands the bracket incorrectly (e.g., 2(3x-1)=6x-1 instead of 6x-2), leading to a wrong equation and answer.",
        rootCause: "Distributive Property Applied Incorrectly — doesn't multiply every term inside the bracket by the outside factor.",
        remediation: "Distribute CAREFULLY: 2(3x-1)=6x-2 (2×3x AND 2×(-1)) — not partial distribution like 6x-1 (which forgets to multiply the -1 by 2)."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student makes an error collecting like terms after expanding, landing on 8 instead of the correct 6.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "After expanding to 6x-2=4x+10, move variable terms to one side and constants to the other: 6x-4x=10+2 → 2x=12 → x=6, not 8 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student correctly reaches 2x=12 but stops there, reporting 12 instead of dividing by 2 to find x.",
        rootCause: "Final Division Step Omitted — completes the collection of like terms but fails to divide out the coefficient.",
        remediation: "2x=12 is only PART of the solution — you must ALSO divide by 2 to isolate x: 12÷2=6, not just 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand the bracket", hint: "2(3x-1)=6x-2." },
      { level: 2, description: "Move variable terms to one side", hint: "6x-2=4x+10 → subtract 4x: 2x-2=10." },
      { level: 3, description: "Solve for x", hint: "2x=12 → x=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRFORMULA-02",
    question: "Notebooks cost ₹30 each; pens cost ₹15 each. Write an expression for the total cost of \\( n \\) notebooks and 1 pen. Then find the cost when \\( n=4 \\).",
    options: [
        { text: "₹135", correct: true, feedback: "Expression: 30n+15. At n=4 → 120+15 = 135." },
        { text: "₹120", correct: false, feedback: "You only calculated the notebooks.", misconceptionId: "E-d22-a" },
        { text: "₹150", correct: false, feedback: "Incorrect expression.", misconceptionId: "E-d22-b" },
        { text: "₹105", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-c" }
      ],
    backward: "Total = (cost per notebook × number) + cost of pen.",
    forward: "Writing expressions is the first step to building mathematical models.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student computes only the notebooks' cost (30×4=120) and forgets to add the ₹15 for the pen.",
        rootCause: "Term Omitted — drops the fixed cost of the pen from the total.",
        remediation: "The total must include BOTH the notebooks AND the pen — 30×4=120 for notebooks, PLUS 15 for the pen: 120+15=135, not just 120."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student sets up an incorrect expression (e.g., treating the pen's cost as also multiplied by n), leading to an inflated total.",
        rootCause: "Expression Mistranslated — incorrectly applies the multiplier to the wrong term.",
        remediation: "Only the NOTEBOOKS' cost is multiplied by n (since there are n notebooks) — the pen is a SINGLE item at ₹15, not 15n: the correct expression is 30n+15, giving 30×4+15=135, not (30+15)×4=180 or 150."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student makes an arithmetic slip while computing the total, landing on 105 instead of the correct 135.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 30×4=120, then 120+15=135, not 105."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the expression", hint: "cost per notebook × n, plus cost of 1 pen: 30n + 15." },
      { level: 2, description: "Substitute n=4", hint: "30×4 + 15." },
      { level: 3, description: "Compute", hint: "120 + 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQSUM-01",
    question: "Start at 5. Rule: ×2 − 3. Find the sum of the first 4 terms.",
    options: [
        { text: "42", correct: true, feedback: "5,7,11,19 → sum = 42." },
        { text: "19", correct: false, feedback: "That's just the 4th term.", misconceptionId: "E-d23-a" },
        { text: "26", correct: false, feedback: "Sum of 5+7+11+? incorrect.", misconceptionId: "E-d23-b" },
        { text: "50", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-c" }
      ],
    backward: "List the terms, then add them.",
    forward: "Summing sequences is used in financial and scientific calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student reports only the 4th term (19) instead of computing the SUM of all four terms.",
        rootCause: "Sum Step Omitted — stops after finding the last term, without adding all the terms together.",
        remediation: "The question asks for the SUM of the first 4 terms, not just the last one — add ALL FOUR: 5+7+11+19=42, not just the 4th term (19)."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student adds only some of the four terms, or makes an error while listing them, leading to an incomplete or incorrect sum.",
        rootCause: "Incomplete Sum — omits one of the four terms from the total, or lists a term incorrectly.",
        remediation: "First list ALL FOUR terms correctly: 5, 5×2-3=7, 7×2-3=11, 11×2-3=19 — then add all four: 5+7+11+19=42, not a partial or incorrect sum (26)."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student makes an arithmetic slip while adding the four terms, landing on 50 instead of the correct 42.",
        rootCause: "Computation Error — correct terms, but the final addition is carried out incorrectly.",
        remediation: "Recompute the sum carefully: 5+7=12, 12+11=23, 23+19=42, not 50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the first four terms", hint: "5, 5×2-3=7, 7×2-3=11, 11×2-3=19." },
      { level: 2, description: "Add them step by step", hint: "5+7=12, 12+11=23." },
      { level: 3, description: "Add the last term", hint: "23 + 19 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMFRACTION-01",
    question: "Half a number plus 3 equals the number minus 1. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "x/2 + 3 = x−1 → ×2 → x+6 = 2x−2 → x=8." },
        { text: "4", correct: false, feedback: "Incorrect solving.", misconceptionId: "E-d24-a" },
        { text: "6", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-b" },
        { text: "10", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-c" }
      ],
    backward: "Clear the fraction by multiplying every term by 2.",
    forward: "Equations with fractions are common in physics and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student forgets to multiply EVERY term by 2 when clearing the fraction (e.g., only the fraction term, not the +3 or the right side), leading to an incorrect equation.",
        rootCause: "Fraction Clearing Applied Incompletely — multiplies only part of the equation by 2 instead of every term.",
        remediation: "When clearing the fraction, multiply EVERY term by 2: x/2×2 + 3×2 = (x-1)×2, giving x+6=2x-2 — not multiplying only the fraction term and leaving the others unchanged."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student makes an error collecting like terms after clearing the fraction, landing on 6 instead of the correct 8.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "After clearing the fraction (x+6=2x-2), move variable terms to one side and constants to the other: 6+2=2x-x → x=8, not 6 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student makes an arithmetic slip while solving, landing on 10 instead of the correct 8.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: x+6=2x-2, subtract x: 6=x-2, add 2: x=8, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "x/2 + 3 = x - 1." },
      { level: 2, description: "Clear the fraction by multiplying every term by 2", hint: "x + 6 = 2x - 2." },
      { level: 3, description: "Collect like terms and solve", hint: "6 + 2 = 2x - x → x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATFORMULA-01",
    question: "The nth term of a sequence is \\( n^2 + n \\). Find the 6th term.",
    options: [
        { text: "42", correct: true, feedback: "6²+6 = 36+6 = 42." },
        { text: "30", correct: false, feedback: "You used n=5 instead of n=6.", misconceptionId: "E-r1-a" },
        { text: "56", correct: false, feedback: "You used n=7 instead of n=6.", misconceptionId: "E-r1-b" },
        { text: "48", correct: false, feedback: "Incorrect addition after squaring.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student uses n=5 instead of n=6, computing the 5th term instead of the requested 6th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 6TH term, substitute n=6 into the formula: 6²+6=42, not n=5 which gives 5²+5=30 (the 5th term)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student uses n=7 instead of n=6, computing the 7th term instead of the requested 6th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 6TH term, substitute n=6 into the formula: 6²+6=42, not n=7 which gives 7²+7=56 (the 7th term)."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student makes an arithmetic slip after squaring, landing on 48 instead of the correct 42.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 6²=36, then 36+6=42, not 48."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the formula and the position asked for", hint: "nth term = n²+n; the question asks for the 6th term, so n=6." },
      { level: 2, description: "Compute n²", hint: "6² = 36." },
      { level: 3, description: "Add n", hint: "36 + 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCREVERSE-01",
    question: "Output = 18. Rule: multiply by 3, then add 6. Find the input.",
    options: [
        { text: "4", correct: true, feedback: "Reverse: (18−6)÷3 = 4." },
        { text: "60", correct: false, feedback: "You applied the forward rule to the output instead of reversing it.", misconceptionId: "E-r2-a" },
        { text: "8", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-r2-b" },
        { text: "12", correct: false, feedback: "You only subtracted 6, forgot to divide.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student applies the ORIGINAL rule (×3 then +6) to the output instead of reversing it, leading to a drastically wrong answer.",
        rootCause: "Forward Rule Applied Instead of Reversed — reuses the original rule's operations instead of undoing them in reverse.",
        remediation: "To find the INPUT from the output, you must REVERSE the rule using inverse operations in REVERSE order: subtract 6 (undoing add 6), then divide by 3 (undoing multiply by 3) — 18-6=12, 12÷3=4, not 18×3+6=60."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student makes an arithmetic slip while reversing the operations, landing on 8 instead of the correct 4.",
        rootCause: "Computation Error — correct reversal approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 18-6=12, then 12÷3=4, not 8."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student reverses only the subtraction step and stops, without also dividing by 3 to fully undo the 'multiply by 3' step.",
        rootCause: "Reversal Steps Incomplete — undoes only one of the two operations.",
        remediation: "You must reverse BOTH steps — after subtracting 6 (18-6=12), you must ALSO divide by 3 (undoing the original 'multiply by 3'): 12÷3=4, not just 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the last operation first", hint: "The last forward step was 'add 6' — undo it by subtracting 6: 18-6=12." },
      { level: 2, description: "Reverse the first operation next", hint: "The first forward step was 'multiply by 3' — undo it by dividing by 3." },
      { level: 3, description: "Compute", hint: "12 ÷ 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBOTHSIDES-01",
    question: "Solve \\( 3(x+2) = 2(x+5) \\). Find \\( x \\).",
    options: [
        { text: "4", correct: true, feedback: "3x+6 = 2x+10 → x=4." },
        { text: "8", correct: false, feedback: "You made a sign error collecting like terms.", misconceptionId: "E-r3-a" },
        { text: "16", correct: false, feedback: "You reported 3x+6's constant term incorrectly combined.", misconceptionId: "E-r3-b" },
        { text: "10", correct: false, feedback: "You gave the right-hand side's constant, not the solved x.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student makes a sign error while collecting like terms after expanding, landing on 8 instead of the correct 4.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "After expanding to 3x+6=2x+10, move variable terms to one side and constants to the other: 3x-2x=10-6 → x=4, not 8 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student expands the brackets incorrectly or miscombines terms, leading to an inflated incorrect value.",
        rootCause: "Distributive Property Applied Incorrectly — doesn't multiply every term inside the bracket by the outside factor.",
        remediation: "Distribute CAREFULLY: 3(x+2)=3x+6 (3×x AND 3×2), and 2(x+5)=2x+10 (2×x AND 2×5) — then solve 3x+6=2x+10 correctly to get x=4, not 16."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student reports a constant from the equation (10) instead of solving for x.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a number from the equation with the value being solved for.",
        remediation: "10 is just a constant term in the equation, not x — solve 3x+6=2x+10 by collecting like terms: 3x-2x=10-6, giving x=4, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Expand both brackets", hint: "3(x+2)=3x+6. 2(x+5)=2x+10." },
      { level: 2, description: "Move variable terms to one side", hint: "3x+6=2x+10 → subtract 2x: x+6=10." },
      { level: 3, description: "Solve for x", hint: "10 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPREVALQUAD-01",
    question: "Evaluate \\( 4n^2 - 3n + 2 \\) for \\( n = 3 \\).",
    options: [
        { text: "29", correct: true, feedback: "4×9 − 9 + 2 = 36−9+2 = 29." },
        { text: "35", correct: false, feedback: "You forgot to subtract the 3n term.", misconceptionId: "E-r4-a" },
        { text: "23", correct: false, feedback: "You subtracted 2 instead of adding.", misconceptionId: "E-r4-b" },
        { text: "41", correct: false, feedback: "Incorrect computation of a term.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student computes 4n²+2 but forgets to subtract 3n, dropping one of the three terms in the expression.",
        rootCause: "Term Omitted — drops one of the three terms in the expression during evaluation.",
        remediation: "The expression has THREE terms: 4n², -3n, AND +2 — you must include ALL of them: 36-9+2=29, not just 36+2=38 or similar (35 comes from a related omission)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student subtracts 2 instead of adding, applying the wrong sign to the last term.",
        rootCause: "Sign Error — treats an addition term as subtraction.",
        remediation: "The expression is 4n²-3n+2, so the last term is ADDED — 36-9+2=29, not 36-9-2=25 (subtracting 2 by mistake, giving a value near 23)."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student makes an error computing n² or one of the multiplication steps, leading to an incorrect total.",
        rootCause: "Computation Error — correct approach, but the arithmetic in one or more steps is carried out incorrectly.",
        remediation: "Recompute each term carefully: n²=3×3=9, 4n²=4×9=36, 3n=3×3=9 — then 36-9+2=29, not 41."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each term separately", hint: "n²=9, so 4n²=36. 3n=9." },
      { level: 2, description: "Combine the terms with the correct signs", hint: "36 - 9 + 2." },
      { level: 3, description: "Compute", hint: "36 - 9 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQREVERSE-02",
    question: "A sequence follows the rule ×3−4. The 2nd term is 5. Find the 4th term.",
    options: [
        { text: "29", correct: true, feedback: "1st = (5+4)÷3 = 3. 3rd = 3×5−4 = 11. 4th = 3×11−4 = 29." },
        { text: "11", correct: false, feedback: "That's the 3rd term, not the 4th.", misconceptionId: "E-r5-a" },
        { text: "5", correct: false, feedback: "That's the 2nd term, which was given.", misconceptionId: "E-r5-b" },
        { text: "23", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student stops one term early, reporting the 3rd term (11) instead of the requested 4th term (29).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "Count carefully: 2nd=5, 3rd=3×5-4=11, 4th=3×11-4=29 — the question asks for the 4th term (29), not the 3rd (11)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student reports the given 2nd term (5) instead of building forward to find the requested 4th term.",
        rootCause: "Given Term Reported Instead of Requested Term — reports the starting information instead of continuing the calculation.",
        remediation: "5 is the GIVEN 2nd term — you must build FORWARD two more steps to reach the 4th term: 3rd=3×5-4=11, 4th=3×11-4=29, not just report the given 5."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes an arithmetic slip while building forward from the 2nd term, landing on 23 instead of the correct 29.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3rd=3×5-4=11, then 4th=3×11-4=29, not 23."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the rule to the 2nd term to get the 3rd", hint: "3×5-4 = 11." },
      { level: 2, description: "Apply the rule to the 3rd term to get the 4th", hint: "3×11-4 = ?" },
      { level: 3, description: "Confirm the term count", hint: "2nd=5, 3rd=11, 4th=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMBRACKET-01",
    question: "A number plus 7, then the result is doubled, giving 30. Find the number.",
    options: [
        { text: "8", correct: true, feedback: "2(n+7)=30 → n+7=15 → n=8." },
        { text: "15", correct: false, feedback: "That's n+7, not n.", misconceptionId: "E-r6-a" },
        { text: "22", correct: false, feedback: "You added 7 to 15 instead of subtracting.", misconceptionId: "E-r6-b" },
        { text: "11", correct: false, feedback: "You added 7 to 30 first, in the wrong order.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student correctly finds n+7=15 but stops there, reporting 15 instead of subtracting 7 to find n itself.",
        rootCause: "Second Step Omitted — completes the first inverse operation but fails to apply the second.",
        remediation: "n+7=15 is only PART of the solution — you must ALSO subtract 7 to isolate n: 15-7=8, not just 15."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student adds 7 to 15 instead of subtracting, applying the wrong inverse operation for the second step.",
        rootCause: "Inverse Operation Reversed — adds when undoing addition requires subtraction.",
        remediation: "To UNDO adding 7, you must SUBTRACT 7 (the inverse operation) — 15-7=8, not 15+7=22."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student adds 7 to the original total (30) before dividing by 2, applying the operations in the wrong order.",
        rootCause: "Bracket Not Cleared First — attempts to undo the addition before first dividing out the doubling.",
        remediation: "The 2 multiplies the ENTIRE bracket (n+7) — you must first divide by 2 to isolate (n+7): 30÷2=15, THEN subtract 7: 15-7=8; don't add 7 to 30 directly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the equation", hint: "2(n + 7) = 30." },
      { level: 2, description: "Undo the doubling first", hint: "Divide both sides by 2: n + 7 = 15." },
      { level: 3, description: "Undo the addition", hint: "15 - 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.EE.B.4A"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PAT",
    clusterName: CLUSTER_NAMES.PAT,
    skillId: "PATFORMULA-01",
    question: "The pattern 2, 8, 18, 32, … has the rule \\( 2n^2 \\). Find the 6th term.",
    options: [
        { text: "72", correct: true, feedback: "2×6² = 2×36 = 72." },
        { text: "50", correct: false, feedback: "You used n=5 instead of n=6.", misconceptionId: "E-r7-a" },
        { text: "98", correct: false, feedback: "You used n=7 instead of n=6.", misconceptionId: "E-r7-b" },
        { text: "60", correct: false, feedback: "You forgot to square 6 before doubling.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student uses n=5 instead of n=6, computing the 5th term instead of the requested 6th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 6TH term, substitute n=6 into the formula: 2×6²=72, not n=5 which gives 2×5²=50 (the 5th term)."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student uses n=7 instead of n=6, computing the 7th term instead of the requested 6th term.",
        rootCause: "Wrong Value of n Used — substitutes an incorrect position number into the formula.",
        remediation: "For the 6TH term, substitute n=6 into the formula: 2×6²=72, not n=7 which gives 2×7²=98 (the 7th term)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student multiplies 2×6=12 and then does something else (like adding), or otherwise fails to square 6 before doubling, landing on 60.",
        rootCause: "Squaring Step Omitted — treats the formula as 2n instead of 2n².",
        remediation: "The formula is 2n² (2 times n SQUARED), not 2n — first square 6 (6²=36), THEN double: 2×36=72, not 2×6=12 followed by some other operation to reach 60."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the formula and the position asked for", hint: "nth term = 2n²; the question asks for the 6th term, so n=6." },
      { level: 2, description: "Compute n²", hint: "6² = 36." },
      { level: 3, description: "Multiply by 2", hint: "2 × 36 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "FUNC",
    clusterName: CLUSTER_NAMES.FUNC,
    skillId: "FUNCCHAIN-01",
    question: "Machine A: subtract 2. Machine B: multiply by 5. Input to A is 7. Output of B?",
    options: [
        { text: "25", correct: true, feedback: "7→5→25." },
        { text: "33", correct: false, feedback: "You multiplied first then subtracted, in the wrong order.", misconceptionId: "E-r8-a" },
        { text: "35", correct: false, feedback: "You only multiplied 7 by 5, ignoring Machine A.", misconceptionId: "E-r8-b" },
        { text: "10", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student applies Machine B (multiply by 5) first and then Machine A, reversing the stated order.",
        rootCause: "Machine Order Reversed — applies Machine B before Machine A instead of following the stated A-then-B sequence.",
        remediation: "The input goes to Machine A FIRST, then the result goes to Machine B — 7-2=5 (Machine A), THEN 5×5=25 (Machine B), not 7×5=35 then -2=33."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student applies only Machine B (multiply by 5) to the original input, completely skipping Machine A.",
        rootCause: "One Machine Skipped — ignores one of the two machines in the chain.",
        remediation: "The input must pass through BOTH machines — first Machine A (7-2=5), THEN Machine B (5×5=25) — don't skip Machine A and multiply 7×5=35 directly."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student makes an arithmetic slip while applying the two machines in order, landing on 10 instead of the correct 25.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 7-2=5 (Machine A), then 5×5=25 (Machine B), not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply Machine A to the input", hint: "7 - 2 = 5." },
      { level: 2, description: "Feed the result into Machine B", hint: "Machine B multiplies by 5." },
      { level: 3, description: "Compute", hint: "5 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "EQN",
    clusterName: CLUSTER_NAMES.EQN,
    skillId: "EQNBOTHSIDES-02",
    question: "Solve \\( 5x - 7 = 3x + 9 \\). Find \\( x \\).",
    options: [
        { text: "8", correct: true, feedback: "2x = 16 → x = 8." },
        { text: "2", correct: false, feedback: "You made a sign error collecting like terms.", misconceptionId: "E-r9-a" },
        { text: "1", correct: false, feedback: "Incorrect.", misconceptionId: "E-r9-b" },
        { text: "16", correct: false, feedback: "You only found 2x, forgot to divide by 2.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student makes a sign error while moving terms across the equals sign, landing on 2 instead of the correct 8.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "Move variable terms to one side and constants to the other, keeping signs consistent: 5x-3x=9+7 → 2x=16 → x=8, not 2 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student makes an arithmetic slip while collecting like terms, landing on 1 instead of the correct 8.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 5x-3x=9+7, so 2x=16, and x=16÷2=8, not 1."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student correctly finds 2x=16 but stops there, reporting 16 instead of dividing by 2 to find x.",
        rootCause: "Final Division Step Omitted — completes the collection of like terms but fails to divide out the coefficient.",
        remediation: "2x=16 is only PART of the solution — you must ALSO divide by 2 to isolate x: 16÷2=8, not just 16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Move the variable terms to one side", hint: "5x-7=3x+9 → subtract 3x: 2x-7=9." },
      { level: 2, description: "Move the constants to the other side", hint: "Add 7 to both sides: 2x=16." },
      { level: 3, description: "Divide to isolate x", hint: "16 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "EXPR",
    clusterName: CLUSTER_NAMES.EXPR,
    skillId: "EXPRFORMULA-02",
    question: "A taxi charges ₹20 plus ₹12 per km. Find the cost for 5 km.",
    options: [
        { text: "₹80", correct: true, feedback: "20 + 12×5 = 20+60 = 80." },
        { text: "₹60", correct: false, feedback: "You only used the per-km cost and forgot the fixed fee.", misconceptionId: "E-r10-a" },
        { text: "₹40", correct: false, feedback: "Incorrect computation.", misconceptionId: "E-r10-b" },
        { text: "₹100", correct: false, feedback: "Incorrect computation.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student computes only the per-km charge (12×5=60) and forgets the ₹20 fixed fee.",
        rootCause: "Fixed Fee Omitted — computes only the variable (per-km) part of the cost, ignoring the flat starting charge.",
        remediation: "The total cost includes a FIXED ₹20 fee PLUS the per-km charge — 20+(12×5)=20+60=80, not just the per-km charge alone (60)."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes an arithmetic slip while computing the total, landing on 40 instead of the correct 80.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 12×5=60, then 20+60=80, not 40."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student makes an arithmetic slip while computing the total, landing on 100 instead of the correct 80.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 12×5=60, then 20+60=80, not 100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the expression", hint: "fixed fee + rate × km: 20 + 12h." },
      { level: 2, description: "Substitute km=5", hint: "20 + 12×5." },
      { level: 3, description: "Compute", hint: "20 + 60 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SEQ",
    clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQSUM-01",
    question: "Start at 1. Rule: ×3 + 2. Find the sum of the first 3 terms.",
    options: [
        { text: "23", correct: true, feedback: "1, 5, 17 → sum = 23." },
        { text: "17", correct: false, feedback: "That's just the 3rd term.", misconceptionId: "E-r11-a" },
        { text: "6", correct: false, feedback: "That's the sum of only the first two terms.", misconceptionId: "E-r11-b" },
        { text: "29", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student reports only the 3rd term (17) instead of computing the SUM of all three terms.",
        rootCause: "Sum Step Omitted — stops after finding the last term, without adding all the terms together.",
        remediation: "The question asks for the SUM of the first 3 terms, not just the last one — add ALL THREE: 1+5+17=23, not just the 3rd term (17)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student adds only the first two terms (1+5=6) and forgets to include the 3rd term.",
        rootCause: "Incomplete Sum — omits one of the terms from the total.",
        remediation: "The sum must include ALL THREE terms, not just two — add 1, 5, AND 17: 1+5+17=23, not just 1+5=6."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student makes an arithmetic slip while adding the three terms, landing on 29 instead of the correct 23.",
        rootCause: "Computation Error — correct terms, but the final addition is carried out incorrectly.",
        remediation: "Recompute the sum carefully: 1+5=6, 6+17=23, not 29."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the first three terms", hint: "1, 1×3+2=5, 5×3+2=17." },
      { level: 2, description: "Add the first two", hint: "1 + 5 = 6." },
      { level: 3, description: "Add the third", hint: "6 + 17 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.OA.C.5"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "SYMBOTHSIDES-01",
    question: "Three times a number, minus 4, equals twice the number, plus 6. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "3n−4 = 2n+6 → n = 10." },
        { text: "2", correct: false, feedback: "You made a sign error collecting like terms.", misconceptionId: "E-r12-a" },
        { text: "6", correct: false, feedback: "You gave a constant from the equation, not the solved value.", misconceptionId: "E-r12-b" },
        { text: "14", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student makes a sign error while moving terms across the equals sign, landing on 2 instead of the correct 10.",
        rootCause: "Terms Collected Incorrectly — moves variable or constant terms to the wrong side, or with the wrong sign.",
        remediation: "Move variable terms to one side and constants to the other, keeping signs consistent: 3n-2n=6+4 → n=10, not 2 (check your sign changes when moving terms)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student reports a constant from the equation (6) instead of solving for n.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a number from the equation with the value being solved for.",
        remediation: "6 is just a constant term in the equation, not n — solve 3n-4=2n+6 by collecting like terms: 3n-2n=6+4, giving n=10, not 6."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student makes an arithmetic slip while collecting like terms, landing on 14 instead of the correct 10.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 3n-4=2n+6, subtract 2n: n-4=6, add 4: n=10, not 14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Move the variable terms to one side", hint: "3n-4=2n+6 → subtract 2n: n-4=6." },
      { level: 2, description: "Move the constants to the other side", hint: "Add 4 to both sides: n=10." },
      { level: 3, description: "Confirm", hint: "Does 3×10-4 equal 2×10+6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.C.7B"]
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

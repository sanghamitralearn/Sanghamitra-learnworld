// seed/mathSeedCh5DecimalsL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 5
// (Decimals), Level 3 — converted from the standalone HTML file
// ch-5-decimals-level-3.html.
//
// Run with: node seed/mathSeedCh5DecimalsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-5-decimals";
const CHAPTER_NAME = "Decimals";
const LEVEL = 3;

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
    skillId: "DECPLACE-05",
    question: "A decimal has 3 in the tenths place, 7 in the thousandths place, and 0 in all other places. What is the number? Then add 0.2 to it.",
    options: [
        { text: "0.307; 0.507", correct: true, feedback: "Number = 0.307. 0.307 + 0.200 = 0.507." },
        { text: "0.370; 0.570", correct: false, feedback: "You placed 7 in the hundredths place instead of thousandths.", misconceptionId: "E-w1-a" },
        { text: "0.037; 0.237", correct: false, feedback: "You misplaced the tenths digit.", misconceptionId: "E-w1-b" },
        { text: "0.307; 0.327", correct: false, feedback: "You added 0.02 instead of 0.2.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Write the number as 0.307 (3 tenths, 0 hundredths, 7 thousandths). Then add 0.200.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student builds the number as 0.370, placing 7 in hundredths instead of thousandths.",
        rootCause: "Column Shift Error — slides the thousandths digit into the hundredths column, since no hundredths value was named.",
        remediation: "Build the number column by column: tenths=3, hundredths=0 (unnamed, so zero), thousandths=7 — write out all three columns explicitly."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student builds the number as 0.037, misplacing the tenths digit.",
        rootCause: "Digit Order Reversal — swaps the tenths and thousandths digits.",
        remediation: "Match each named digit to its own column directly: 'tenths place' means column 1, 'thousandths place' means column 3 — don't reorder them."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student correctly builds 0.307 but adds 0.02 instead of 0.2 in the second step.",
        rootCause: "Wrong Decimal Place Added — misreads '0.2' as '0.02', adding to the wrong column.",
        remediation: "Confirm the value to add by reading it carefully: 0.2 means 2 TENTHS, not 2 hundredths."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Build the number column by column", hint: "Tenths=3, hundredths=0 (not named, so 0), thousandths=7." },
      { level: 2, description: "Assemble", hint: "0.307." },
      { level: 3, description: "Add 0.2", hint: "0.307 + 0.200 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-03",
    question: "A number is between 0.12 and 0.19. Its hundredths digit is twice its tenths digit. What is the number?",
    options: [
        { text: "0.12", correct: true, feedback: "Tenths=1, hundredths=2 (twice 1). 0.12 is between 0.12 and 0.19." },
        { text: "0.24", correct: false, feedback: "0.24 is outside the range (greater than 0.19).", misconceptionId: "E-w2-a" },
        { text: "0.21", correct: false, feedback: "Hundredths 1 is not twice tenths 2.", misconceptionId: "E-w2-b" },
        { text: "0.13", correct: false, feedback: "Hundredths 3 is not twice tenths 1.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "The tenths digit is 1 (since numbers are 0.12-0.19). If hundredths = 2 × tenths, hundredths = 2. So number = 0.12.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student satisfies the digit rule (hundredths=2×tenths, e.g. tenths=2, hundredths=4) but ignores the stated range entirely.",
        rootCause: "Constraint Tunnel Vision — focuses on the digit relationship and forgets to check the range constraint at the end.",
        remediation: "Treat every stated condition as a checklist item — after finding a candidate number, go back and verify it against EACH condition, including the range."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student reads the digit rule backwards, picking a number where tenths is twice hundredths instead of the reverse.",
        rootCause: "Relationship Reversal — swaps which digit is 'twice' which.",
        remediation: "Underline the exact wording: 'hundredths digit is twice tenths digit' means hundredths = 2 × tenths, not the other way round."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student picks the correct tenths digit (1, forced by the range) but miscalculates hundredths as 3 instead of 2×1=2.",
        rootCause: "Multiplication Slip — errs in computing 2 × 1.",
        remediation: "Compute the required digit explicitly: tenths is fixed by the range at 1, so hundredths = 2 × 1 = 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the tenths digit from the range", hint: "Numbers between 0.12 and 0.19 all have tenths digit 1." },
      { level: 2, description: "Apply the digit rule", hint: "Hundredths = 2 × tenths = 2 × 1 = 2." },
      { level: 3, description: "Assemble and check", hint: "0.12 — is it between 0.12 and 0.19? Yes." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-05", probability: 0.4, condition: "Struggles to track multiple simultaneous constraints in a single problem, which recurs in multi-step decimal word problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-06",
    question: "A number rounded to the nearest tenth is 4.5. When rounded to the nearest hundredth it is 4.53. The thousandths digit is 9. Find the number.",
    options: [
        { text: "4.529", correct: true, feedback: "4.529 rounds to 4.5 (tenth) and 4.53 (hundredth)." },
        { text: "4.534", correct: false, feedback: "4.534 also rounds to 4.5 and 4.53, but its thousandths digit is 4, not 9.", misconceptionId: "E-w3-a" },
        { text: "4.525", correct: false, feedback: "Thousandths digit is 5, not 9.", misconceptionId: "E-w3-b" },
        { text: "4.539", correct: false, feedback: "4.539 rounds to 4.5 (tenth) but to 4.54 (hundredth), not 4.53.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Numbers rounding to 4.5 (tenth) are 4.45-4.54. To also round to 4.53 (hundredth) they must be 4.525-4.534. With thousandths 9, the only possibility is 4.529.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student finds a number satisfying both rounding conditions (4.534) but ignores the thousandths-digit clue.",
        rootCause: "Partial Constraint Satisfaction — stops searching once ANY condition is met, instead of checking ALL stated conditions.",
        remediation: "List every condition separately, then test the final candidate against each one in turn, not just the first two."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student picks 4.525, which has thousandths digit 5, not 9.",
        rootCause: "Boundary Value Confusion — grabs the boundary of the hundredths-rounding range instead of applying the extra thousandths-digit condition.",
        remediation: "The rounding ranges only narrow down a set of possibilities — you still must apply every other stated clue (like 'thousandths digit is 9') to pick the exact number."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student picks 4.539, which does not round to 4.53 at the hundredths place (it rounds to 4.54).",
        rootCause: "Rounding Range Miscalculation — misjudges which numbers round to 4.53 at the hundredths place.",
        remediation: "Numbers rounding to 4.53 (hundredths) must be in the range 4.525 up to (but not including) 4.535 — check 4.539 falls outside this range."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tenths-rounding range", hint: "Rounds to 4.5 → number is between 4.45 and 4.54." },
      { level: 2, description: "Find the hundredths-rounding range and intersect", hint: "Rounds to 4.53 → between 4.525 and 4.534." },
      { level: 3, description: "Apply the thousandths clue", hint: "Within 4.525-4.534, which number has thousandths digit 9?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-01", probability: 0.45, condition: "Confuses rounding ranges at different place values, risking errors in significant-figure estimation later." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert \\(\\frac{7}{8}\\) to a decimal, round to the nearest hundredth, then add \\(\\frac{1}{4}\\) (as a decimal).",
    options: [
        { text: "1.13", correct: true, feedback: "7/8 = 0.875 → 0.88. 1/4 = 0.25. 0.88 + 0.25 = 1.13." },
        { text: "1.125", correct: false, feedback: "You used the exact value without rounding.", misconceptionId: "E-w4-a" },
        { text: "0.88", correct: false, feedback: "You forgot to add 1/4.", misconceptionId: "E-w4-b" },
        { text: "1.00", correct: false, feedback: "Incorrect rounding or addition.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Convert 7/8 to a decimal (0.875). Round to nearest hundredth (look at thousandths 5 → round up to 0.88). Then add 0.25.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student skips the rounding step and adds the exact value 0.875 + 0.25 = 1.125.",
        rootCause: "Instruction Skipping — ignores an explicit step in a multi-step instruction.",
        remediation: "Underline each verb in the instructions (convert, ROUND, add) and complete them strictly in order — do not skip the rounding step."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student correctly converts and rounds to 0.88 but stops before performing the final addition.",
        rootCause: "Final-Step Omission — treats an intermediate result as the final answer.",
        remediation: "Re-read the question after each step: 'convert, round, THEN add' has three actions — check off each one before submitting an answer."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student makes an error in either the rounding (e.g. rounding down to 0.87) or the final addition, landing on 1.00.",
        rootCause: "Compounded Rounding/Addition Error — a slip in one of the two arithmetic steps.",
        remediation: "Check the rounding step alone first (0.875 → 0.88, since thousandths digit 5 rounds up), then redo the addition separately: 0.88 + 0.25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "7 ÷ 8 = 0.875." },
      { level: 2, description: "Round to the nearest hundredth", hint: "Thousandths digit is 5, so round up: 0.88." },
      { level: 3, description: "Add the second fraction as a decimal", hint: "1/4 = 0.25. 0.88 + 0.25 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-05", probability: 0.35, condition: "Skips steps in multi-instruction word problems, a pattern that worsens in longer chained calculations." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4", "CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "12.7 - (4.35 + 2.8) = ?",
    options: [
        { text: "5.55", correct: true, feedback: "Inside brackets: 4.35+2.8=7.15. 12.7-7.15=5.55." },
        { text: "5.45", correct: false, feedback: "Subtraction error.", misconceptionId: "E-w5-a" },
        { text: "10.15", correct: false, feedback: "You subtracted 2.8 from 12.7 first, ignoring brackets.", misconceptionId: "E-w5-b" },
        { text: "5.65", correct: false, feedback: "Incorrect decimal alignment.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Follow BODMAS: first add inside brackets (4.35+2.8=7.15), then subtract from 12.7.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student correctly computes the bracket total (7.15) but makes a borrowing error in 12.7 - 7.15, landing on 5.45.",
        rootCause: "Subtraction Borrowing Error — mishandles regrouping across the decimal point.",
        remediation: "Align 12.70 and 7.15 by place value, then subtract column by column from the right, borrowing carefully: 0-5 needs a borrow from the tenths column."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student ignores the brackets and computes left-to-right: 12.7 - 4.35 + 2.8, or subtracts only one term.",
        rootCause: "Bracket-Ignoring Order of Operations — processes the expression left to right without respecting the grouping symbols.",
        remediation: "Brackets always come first: circle the bracketed part, solve it completely, then use that single result in the rest of the expression."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student adds inside the brackets but misaligns decimal points during either the addition or the final subtraction.",
        rootCause: "Decimal Point Misalignment — stacks digits without matching place values.",
        remediation: "Always line up the decimal points vertically before adding or subtracting, padding with trailing zeros if needed (4.35 and 2.80)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation order", hint: "Brackets first: solve 4.35 + 2.8." },
      { level: 2, description: "Solve the bracket", hint: "4.35 + 2.80 = 7.15." },
      { level: 3, description: "Subtract from the outer number", hint: "12.70 - 7.15 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-06", probability: 0.3, condition: "Bracket-order errors in addition/subtraction often reappear when brackets combine with multiplication/division." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7", "CCSS.MATH.CONTENT.5.OA.A.1"]
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "A number multiplied by 100 gives 6.5. What is the number? Then divide that number by 10.",
    options: [
        { text: "0.0065", correct: true, feedback: "Number = 6.5 ÷ 100 = 0.065. 0.065 ÷ 10 = 0.0065." },
        { text: "0.065", correct: false, feedback: "You only found the number, forgot to divide by 10.", misconceptionId: "E-w6-a" },
        { text: "0.65", correct: false, feedback: "You divided by 10 instead of 100.", misconceptionId: "E-w6-b" },
        { text: "650", correct: false, feedback: "You multiplied instead of divided.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Work backwards: 6.5 ÷ 100 = 0.065. Then 0.065 ÷ 10 = 0.0065.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student correctly reverses the ×100 step (getting 0.065) but stops before the final ÷10 step.",
        rootCause: "Final-Step Omission — treats the first reversal as the complete answer.",
        remediation: "Count the actions required: 'find the number' AND 'then divide by 10' are two separate steps — perform both before answering."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student divides 6.5 by 10 instead of 100 to find the original number.",
        rootCause: "Wrong Inverse Divisor — reverses a ×100 operation using ÷10 instead of ÷100.",
        remediation: "To undo 'multiplied by 100', you must divide by the SAME number, 100 — match the divisor to the multiplier exactly."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student multiplies instead of dividing at some stage, producing a much larger result.",
        rootCause: "Inverse Operation Confusion — applies the forward operation instead of its inverse when working backwards.",
        remediation: "'A number multiplied by 100 GIVES 6.5' means you must divide 6.5 by 100 to undo the multiplication and find the original number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the multiplication", hint: "6.5 ÷ 100 = 0.065." },
      { level: 2, description: "Apply the second operation", hint: "Now divide 0.065 by 10." },
      { level: 3, description: "Shift the decimal point", hint: "Dividing by 10 moves the decimal one place left: 0.065 → 0.0065." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-01", probability: 0.4, condition: "Confusing which power-of-ten divisor undoes a given multiplier compounds in unit-conversion problems (e.g. cm to km)." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-01",
    question: "Which is larger? 0.625 or \\(\\frac{5}{8}\\)?",
    options: [
        { text: "They are equal", correct: true, feedback: "5/8 = 0.625. They are exactly the same." },
        { text: "0.625", correct: false, feedback: "They are equal, so neither is larger.", misconceptionId: "E-w7-a" },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "They are equal.", misconceptionId: "E-w7-b" },
        { text: "Cannot compare", correct: false, feedback: "Convert 5/8 to 0.625; they are equal.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Convert 5/8 to a decimal by dividing 5 by 8.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student assumes a decimal written form must be larger than a fraction form without checking the actual value.",
        rootCause: "Format Bias — believes decimals are inherently 'more precise' or 'larger' than fractions representing the same value.",
        remediation: "Always convert both numbers to the same format (both decimals or both fractions) before comparing — never judge size by how a number is written."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student assumes a fraction form must be larger than a decimal form without checking the actual value.",
        rootCause: "Format Bias — believes fractions are inherently 'exact' and therefore larger than an equivalent decimal.",
        remediation: "Convert 5/8 by long division: 5 ÷ 8 = 0.625 exactly — compare this number directly to 0.625 to see they match."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student believes a fraction and a decimal cannot be directly compared.",
        rootCause: "Cross-Format Comparison Avoidance — doesn't realise fractions can always be converted to decimals for direct comparison.",
        remediation: "Any fraction can be converted to a decimal through division — do this first, then the comparison becomes straightforward."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction to a decimal", hint: "5 ÷ 8 = ?" },
      { level: 2, description: "Compare digit by digit", hint: "Line up 0.625 and your converted value." },
      { level: 3, description: "State the relationship", hint: "Are the two values the same, or is one bigger?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCOMP-01", probability: 0.3, condition: "Format bias between fractions and decimals causes ordering errors when a list mixes both formats." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "w8", order: 8, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-02",
    question: "0.04 × ? = 400. Find ?.",
    options: [
        { text: "10000", correct: true, feedback: "400 ÷ 0.04 = 10000." },
        { text: "1000", correct: false, feedback: "0.04 × 1000 = 40, not 400.", misconceptionId: "E-w8-a" },
        { text: "100", correct: false, feedback: "0.04 × 100 = 4.", misconceptionId: "E-w8-b" },
        { text: "10", correct: false, feedback: "0.04 × 10 = 0.4.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Divide 400 by 0.04 to find the missing multiplier.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student underestimates by a factor of 10, picking 1000 instead of 10000.",
        rootCause: "Power-of-Ten Miscount — loses track of one zero when dividing by a small decimal.",
        remediation: "Rewrite 400 ÷ 0.04 as 40000 ÷ 4 (multiply both numbers by 100 to clear the decimal), then divide: 40000 ÷ 4 = 10000."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student picks 100, badly underestimating the size of the missing factor.",
        rootCause: "Decimal Divisor Magnitude Confusion — doesn't recognise that dividing by a number smaller than 1 makes the result much LARGER than the dividend.",
        remediation: "Dividing by 0.04 (a small decimal) always produces a much bigger answer than 400 — check your answer is far larger than 400, not close to it."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student picks 10, drastically underestimating the missing factor.",
        rootCause: "Order-of-Magnitude Error — fails to reason about how many times 0.04 fits into 400.",
        remediation: "Estimate first: 0.04 is 1/25 of 1, so multiplying it by a number to reach 400 needs a multiplier in the thousands, not tens."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the inverse operation", hint: "? = 400 ÷ 0.04." },
      { level: 2, description: "Clear the decimal", hint: "Multiply both numbers by 100: 40000 ÷ 4." },
      { level: 3, description: "Divide", hint: "40000 ÷ 4 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-01", probability: 0.35, condition: "Underestimating the size of a quotient when dividing by a small decimal recurs in ratio and rate problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-06",
    question: "I am a decimal between 2 and 3. My tenths digit is twice my hundredths digit. The sum of all my digits is 12. The thousandths digit is the same as the tenths digit. What number am I?",
    options: [
        { text: "2.424", correct: true, feedback: "Digits: 2,4,2,4. Tenths=4, hundredths=2 (4=2×2), thousandths=4 (same as tenths). Sum=2+4+2+4=12." },
        { text: "2.215", correct: false, feedback: "Tenths=2, hundredths=1 (2=2×1) works, but thousandths 5 is not equal to tenths 2.", misconceptionId: "E-d1-a" },
        { text: "2.844", correct: false, feedback: "Sum = 2+8+4+4=18, not 12.", misconceptionId: "E-d1-b" },
        { text: "2.241", correct: false, feedback: "Tenths=2, hundredths=4, but 2 is not twice 4.", misconceptionId: "E-d1-c" }
      ],
    backward: "Set up equations for the digits. Use the equal thousandths/tenths condition to filter possibilities.",
    forward: "Digit-riddle puzzles build algebraic modelling skills.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student satisfies the 'twice' condition and gets close to the sum, but never checks the thousandths=tenths condition.",
        rootCause: "Incomplete Constraint Check — stops testing once two of the four conditions are satisfied.",
        remediation: "With four stated conditions, write all four down as a checklist and tick off each one against your candidate number before finalising."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student picks digits satisfying the 'twice' and 'thousandths=tenths' rules but the digit sum is wrong (18 instead of 12).",
        rootCause: "Sum Verification Skipped — never adds up the digits to confirm the total.",
        remediation: "After choosing digits that satisfy the ratio conditions, always add them up explicitly to check against the stated sum."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student reverses the multiplier, treating hundredths as twice tenths instead of tenths as twice hundredths.",
        rootCause: "Relationship Reversal — swaps which digit is described as 'twice' the other.",
        remediation: "Read carefully: 'tenths digit is twice hundredths digit' means tenths = 2 × hundredths — write the equation out symbolically before picking digits."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the digit relationship", hint: "Let hundredths = h, then tenths = 2h." },
      { level: 2, description: "Apply the sum condition", hint: "2 (units) + 2h (tenths) + h (hundredths) + 2h (thousandths, same as tenths) = 12, so 2+5h=12." },
      { level: 3, description: "Solve and assemble", hint: "5h=10, so h=2. Tenths=4, hundredths=2, thousandths=4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.5, condition: "Difficulty translating worded digit relationships into equations is a direct precursor to algebraic equation-setup struggles." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "In the ascending list: 0.3, ?, 0.45, 0.6, the missing number has two decimal places and its hundredths digit is 7. What is it?",
    options: [
        { text: "0.37", correct: true, feedback: "0.37 is between 0.30 and 0.45, and has two decimal places with hundredths digit 7." },
        { text: "0.57", correct: false, feedback: "0.57 > 0.45, so it wouldn't fit before 0.45.", misconceptionId: "E-d2-a" },
        { text: "0.27", correct: false, feedback: "0.27 < 0.3, would come before.", misconceptionId: "E-d2-b" },
        { text: "0.47", correct: false, feedback: "0.47 > 0.45, out of order.", misconceptionId: "E-d2-c" }
      ],
    backward: "A number between 0.3 and 0.45 with two decimal places can be 0.31 to 0.44. Pick the one with hundredths 7.",
    forward: "Placing numbers in order is a key skill for data handling.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student picks the hundredths-digit-7 number that is closest to the given digit but doesn't check it against the range 0.3-0.45.",
        rootCause: "Range Boundary Neglect — satisfies the digit clue while ignoring the ordering constraint.",
        remediation: "First find the valid RANGE from the list position (0.3 to 0.45), then search only within that range for a number ending in 7."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student picks a number below the lower bound of the range.",
        rootCause: "Lower Bound Violation — doesn't verify the candidate is greater than the preceding list value.",
        remediation: "The missing number must be greater than 0.3 (the value before it in the list) — check this inequality explicitly."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student picks a number just above the upper bound of the range (0.47 > 0.45).",
        rootCause: "Upper Bound Violation — doesn't verify the candidate is less than the following list value.",
        remediation: "The missing number must be less than 0.45 (the value after it in the list) — check this inequality explicitly before finalising."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the valid range", hint: "The number must be greater than 0.3 and less than 0.45." },
      { level: 2, description: "Apply the digit clue", hint: "It has two decimal places with hundredths digit 7 — so it looks like 0.X7." },
      { level: 3, description: "Test candidates in range", hint: "Which value of X gives a number between 0.30 and 0.45?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-06",
    question: "A number rounded to the nearest tenth is 7.5. When rounded to the nearest hundredth, it is 7.46. The sum of its digits (ignoring the decimal point) is 20. Find the number.",
    options: [
        { text: "7.463", correct: true, feedback: "Range: 7.455-7.464. Digit sum: 7+4+6+3=20." },
        { text: "7.458", correct: false, feedback: "Sum 7+4+5+8=24.", misconceptionId: "E-d3-a" },
        { text: "7.460", correct: false, feedback: "Sum 7+4+6+0=17.", misconceptionId: "E-d3-b" },
        { text: "7.462", correct: false, feedback: "Sum 7+4+6+2=19.", misconceptionId: "E-d3-c" }
      ],
    backward: "Intersect the two rounding ranges, then find the number whose digits sum to 20.",
    forward: "Multiple constraints on rounding are common in measurement and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student picks a number that isn't even within the intersected rounding range, then miscounts the digit sum too.",
        rootCause: "Range Intersection Skipped — never narrows down to the overlap of both rounding ranges before guessing digits.",
        remediation: "Find where the tenth-rounding range [7.45, 7.55) and hundredth-rounding range [7.455, 7.465) overlap FIRST, then test only numbers in that overlap."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student finds a valid number in range but its digit sum (17) doesn't match the stated total of 20.",
        rootCause: "Sum Verification Skipped — doesn't add up the digits of the final candidate to confirm.",
        remediation: "Once you have a candidate within the correct range, always add its digits and compare to the target sum before finalising."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student is close — the number is in range but the digit sum is 19, one short of the target 20.",
        rootCause: "Off-by-One Digit Search — stops testing at the first plausible candidate instead of the one matching the exact sum.",
        remediation: "Within the valid range, systematically test each thousandths digit (0-9) and compute the digit sum for each, stopping only when it equals the target."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tenths-rounding range", hint: "Rounds to 7.5 → between 7.45 and 7.55." },
      { level: 2, description: "Find the hundredths-rounding range and intersect", hint: "Rounds to 7.46 → between 7.455 and 7.465. Overlap: 7.455-7.464." },
      { level: 3, description: "Search for the digit sum", hint: "Try thousandths digits within the range until 7+4+6+x=20." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-01", probability: 0.4, condition: "Struggling to intersect two rounding ranges signals difficulty with compound inequalities used in tolerance/precision problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-07",
    question: "Convert \\(\\frac{3}{16}\\) to a decimal. Then find \\(\\frac{1}{5}\\) of that decimal.",
    options: [
        { text: "0.0375", correct: true, feedback: "3/16 = 0.1875. 1/5 of 0.1875 = 0.0375." },
        { text: "0.375", correct: false, feedback: "That's 3/8, not 3/16.", misconceptionId: "E-d4-a" },
        { text: "0.1875", correct: false, feedback: "You forgot to find 1/5 of it.", misconceptionId: "E-d4-b" },
        { text: "0.09375", correct: false, feedback: "That's half of 0.1875, not 1/5.", misconceptionId: "E-d4-c" }
      ],
    backward: "Divide 3 by 16 to get 0.1875. Then divide by 5.",
    forward: "Fraction-of-a-decimal problems appear in recipes and measurements.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student converts 3/16 incorrectly, arriving at 0.375 (which is actually 3/8, i.e. double the correct value).",
        rootCause: "Denominator Halving Error — mentally simplifies 3/16 to 3/8 before dividing.",
        remediation: "Divide the exact numbers given: 3 ÷ 16, not a simplified or approximate version of the fraction."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student correctly converts to 0.1875 but stops before finding 1/5 of that value.",
        rootCause: "Final-Step Omission — treats the conversion as the complete answer, ignoring the second instruction.",
        remediation: "The question has two actions — 'convert' AND 'then find 1/5 of that' — make sure both are completed."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student finds half (1/2) of 0.1875 instead of a fifth (1/5) of it.",
        rootCause: "Fraction Operator Confusion — substitutes a familiar fraction (1/2) for the less familiar one (1/5) requested.",
        remediation: "To find 1/5 of a number, divide by 5, not by 2 — double-check which fraction the question actually asked for."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "3 ÷ 16 = 0.1875." },
      { level: 2, description: "Identify the second operation", hint: "'1/5 of' means divide by 5." },
      { level: 3, description: "Divide", hint: "0.1875 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-05", probability: 0.3, condition: "Confusing which fraction operator to apply (halving vs. fifths) recurs in percentage-of-amount problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4"]
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "(8.6 - 3.25) + (4.7 - 1.85) = ?",
    options: [
        { text: "8.2", correct: true, feedback: "8.6-3.25=5.35; 4.7-1.85=2.85; sum = 8.2." },
        { text: "8.1", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-d5-a" },
        { text: "7.2", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d5-b" },
        { text: "8.3", correct: false, feedback: "Carry error.", misconceptionId: "E-d5-c" }
      ],
    backward: "Evaluate each bracket separately, then add.",
    forward: "Bracketed expressions prepare for algebraic substitution.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student makes a small borrowing slip in one bracket, landing 0.1 short of the correct total.",
        rootCause: "Subtraction Borrowing Error — a minor regrouping mistake in one of the two bracket subtractions.",
        remediation: "Redo each bracket subtraction separately, aligning decimal points and borrowing carefully column by column, then add the two results."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student makes a larger subtraction error in one or both brackets, landing a full 1.0 below the correct total.",
        rootCause: "Subtraction Computation Error — miscalculates one of the two bracket differences significantly.",
        remediation: "Verify each bracket result by adding back: 5.35 + 3.25 should equal 8.6, and 2.85 + 1.85 should equal 4.7."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student's final addition of the two bracket results carries incorrectly, landing 0.1 above the correct total.",
        rootCause: "Addition Carry Error — mishandles carrying when adding 5.35 + 2.85.",
        remediation: "Line up 5.35 and 2.85 by decimal place and add column by column from the right, carrying any value ≥10 to the next column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the first bracket", hint: "8.6 - 3.25 = ?" },
      { level: 2, description: "Solve the second bracket", hint: "4.7 - 1.85 = ?" },
      { level: 3, description: "Add the two results", hint: "5.35 + 2.85 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-06", probability: 0.25, condition: "Errors in multi-bracket addition/subtraction chains often reappear when brackets are combined with multiplication." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "A number is divided by 100, then the result is multiplied by 10 to give 0.56. What was the original number?",
    options: [
        { text: "5.6", correct: true, feedback: "Work backwards: 0.56 ÷ 10 = 0.056; 0.056 × 100 = 5.6." },
        { text: "0.056", correct: false, feedback: "That's after the first step backwards.", misconceptionId: "E-d6-a" },
        { text: "56", correct: false, feedback: "You multiplied by 100 at the wrong stage.", misconceptionId: "E-d6-b" },
        { text: "0.56", correct: false, feedback: "No operation reversed.", misconceptionId: "E-d6-c" }
      ],
    backward: "Reverse the steps: divide by 10, then multiply by 100.",
    forward: "Undoing power-of-ten shifts is common in unit conversions.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student correctly reverses the first step (÷10) but stops before reversing the second (×100).",
        rootCause: "Final-Step Omission — only undoes one of the two chained operations.",
        remediation: "Two forward operations were applied (÷100 then ×10), so two reverse operations are needed to fully undo them — check both are done."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student applies the reversal operations in the wrong order or to the wrong stage, overshooting to 56.",
        rootCause: "Reversal Order Error — doesn't reverse the chained operations in the correct (opposite) order.",
        remediation: "To undo 'divided by 100, then multiplied by 10', reverse in the OPPOSITE order: first undo the ×10 (divide by 10), then undo the ÷100 (multiply by 100)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student assumes the given result (0.56) IS the original number, applying no reversal at all.",
        rootCause: "Working-Backwards Skipped — doesn't recognise that the stated result is the END of a chain, not the start.",
        remediation: "The question describes what happened TO a starting number to produce 0.56 — you must work backwards through both steps to find that starting number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation chain", hint: "Original number → ÷100 → ×10 → 0.56. To reverse, work backwards." },
      { level: 2, description: "Reverse the last step first", hint: "Undo ×10 by dividing 0.56 by 10: 0.056." },
      { level: 3, description: "Reverse the first step", hint: "Undo ÷100 by multiplying 0.056 by 100." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-01", probability: 0.35, condition: "Reversing chained power-of-ten operations in the wrong order is a common source of error in multi-step unit conversions." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-07",
    question: "Use the digits 2, 0, 5, 7, 3 exactly once to form the smallest possible decimal between 20 and 30. The tenths digit must be odd. What is the number?",
    options: [
        { text: "20.357", correct: true, feedback: "Tens=2, ones=0. Smallest odd tenths digit from remaining {5,7,3} is 3. Then remaining digits 5 and 7 in ascending order: 5 then 7. Number = 20.357." },
        { text: "20.375", correct: false, feedback: "Tenths=3 is odd, but 20.357 is smaller.", misconceptionId: "E-d7-a" },
        { text: "20.537", correct: false, feedback: "Tenths=5, not the smallest odd possible.", misconceptionId: "E-d7-b" },
        { text: "23.057", correct: false, feedback: "Ones digit 3 makes the integer part larger.", misconceptionId: "E-d7-c" }
      ],
    backward: "Fix the integer part (20), then arrange the decimal digits to satisfy the constraint and minimise the value.",
    forward: "Optimisation under constraints is a key mathematical skill.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student correctly fixes the tenths digit at 3 but arranges the remaining digits (7, 5) in the wrong order, producing a larger number.",
        rootCause: "Sub-Optimal Digit Ordering — doesn't minimise the remaining digits after fixing the constrained one.",
        remediation: "After fixing the constrained digit, arrange ALL remaining digits in ascending order (smallest first) to get the smallest possible number."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student picks a larger odd tenths digit (5) instead of the smallest available odd digit (3).",
        rootCause: "Smallest-Value Search Incomplete — doesn't check all available odd digits {3, 5, 7} to find the minimum.",
        remediation: "List every odd digit available for the tenths place, then choose the SMALLEST one to minimise the overall number."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student places a nonzero digit in the ones place instead of the smallest available digit (0), inflating the integer part.",
        rootCause: "Integer-Part Priority Confusion — doesn't recognise the integer part should be minimised first, before any decimal digit choices.",
        remediation: "To minimise the whole number, first minimise the LEFTMOST digits (tens, then ones) using the smallest available digits, before touching the decimal part."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the integer part", hint: "Between 20 and 30 means tens=2. Use the smallest digit for ones: 0." },
      { level: 2, description: "Choose the tenths digit", hint: "From remaining digits {5,7,3}, pick the smallest ODD one." },
      { level: 3, description: "Arrange the rest to minimise", hint: "Place the two remaining digits in ascending order." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCOMP-01", probability: 0.3, condition: "Difficulty minimising/maximising multi-digit numbers under constraints recurs in optimisation-style comparison problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-04",
    question: "Multiply 0.25 by 3, and multiply 0.4 by 2. Which product is larger, and by how much?",
    options: [
        { text: "0.8 is larger by 0.05", correct: true, feedback: "0.25×3=0.75; 0.4×2=0.8. Difference = 0.05." },
        { text: "0.75 is larger by 0.05", correct: false, feedback: "0.75 < 0.8.", misconceptionId: "E-d8-a" },
        { text: "0.8 is larger by 0.5", correct: false, feedback: "The difference is 0.05, not 0.5.", misconceptionId: "E-d8-b" },
        { text: "They are equal", correct: false, feedback: "0.75 ≠ 0.8.", misconceptionId: "E-d8-c" }
      ],
    backward: "Compute each product, compare, and find the difference.",
    forward: "Comparing results of operations is a key checking strategy.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student computes both products correctly but names the wrong one as larger.",
        rootCause: "Comparison Direction Reversal — correctly finds the difference but swaps which value is described as larger.",
        remediation: "After computing both products (0.75 and 0.8), compare them directly: 0.8 > 0.75, so 0.8 is the larger one."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student identifies the correct larger product but misplaces the decimal point in the difference, giving 0.5 instead of 0.05.",
        rootCause: "Difference Decimal Misplacement — miscounts decimal places when subtracting 0.75 from 0.8.",
        remediation: "Align 0.80 and 0.75 by decimal place before subtracting: 0.80 - 0.75 = 0.05, not 0.5."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student assumes the two products are equal without computing them precisely.",
        rootCause: "Estimation Without Verification — judges the two expressions as 'similar' without doing the actual multiplication.",
        remediation: "Always compute both products exactly (0.25×3 and 0.4×2) before comparing — don't rely on a rough impression that they look similar."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first product", hint: "0.25 × 3 = ?" },
      { level: 2, description: "Compute the second product", hint: "0.4 × 2 = ?" },
      { level: 3, description: "Compare and subtract", hint: "Which is bigger? Subtract the smaller from the larger." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "Round 3.96 to the nearest tenth, and 8.15 to the nearest whole number. Find the product of the two rounded numbers.",
    options: [
        { text: "32", correct: true, feedback: "3.96 → 4.0; 8.15 → 8; 4×8 = 32." },
        { text: "31.6", correct: false, feedback: "3.96×8.15 ≈ 32.3, not 31.6; you multiplied the originals instead of the rounded values.", misconceptionId: "E-d9-a" },
        { text: "32.4", correct: false, feedback: "Incorrect rounding.", misconceptionId: "E-d9-b" },
        { text: "30", correct: false, feedback: "8.15 rounds to 8, not 7.", misconceptionId: "E-d9-c" }
      ],
    backward: "Round first, then multiply.",
    forward: "Estimating products is faster than exact multiplication in many contexts.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student multiplies the original unrounded values (3.96 × 8.15) instead of the rounded values.",
        rootCause: "Instruction Order Confusion — performs multiplication before rounding, ignoring the stated sequence.",
        remediation: "Round FIRST as instructed, then multiply the rounded values — never multiply the original numbers when rounding is explicitly requested first."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student rounds one or both numbers incorrectly (e.g. 3.96 to 3.9 instead of 4.0), producing a wrong product.",
        rootCause: "Rounding Digit Misread — looks at the wrong digit when deciding to round up or down.",
        remediation: "For 3.96 to the nearest tenth, check the hundredths digit (6) — since 6≥5, round the tenths digit up: 3.9 becomes 4.0."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student rounds 8.15 down to 7 instead of to 8.",
        rootCause: "Rounding Direction Error — rounds toward the wrong whole number despite the tenths digit indicating round-up.",
        remediation: "For 8.15 to the nearest whole number, check the tenths digit (1) — since 1<5, round down, but 8.15 is closer to 8 than 7, so it rounds to 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number first", hint: "3.96 to nearest tenth, 8.15 to nearest whole number." },
      { level: 2, description: "Check your rounding", hint: "3.96 → 4.0 (hundredths digit 6 rounds up). 8.15 → 8 (tenths digit 1 rounds down)." },
      { level: 3, description: "Multiply the rounded values", hint: "4 × 8 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-05", probability: 0.3, condition: "Multiplying original values instead of rounded ones when estimation is requested recurs in real-world estimation tasks." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-06",
    question: "Order from smallest to largest: 0.4, \\(\\frac{3}{8}\\), 0.35, \\(\\frac{2}{5}\\).",
    options: [
        { text: "0.35, \\(\\frac{3}{8}\\), 0.4, \\(\\frac{2}{5}\\)", correct: true, feedback: "0.35 = 0.35; 3/8 = 0.375; 0.4 = 0.4; 2/5 = 0.4. So 0.35 < 0.375 < 0.4 (equal to 2/5)." },
        { text: "0.4, \\(\\frac{3}{8}\\), 0.35, \\(\\frac{2}{5}\\)", correct: false, feedback: "That's not ascending.", misconceptionId: "E-d10-a" },
        { text: "0.35, 0.4, \\(\\frac{3}{8}\\), \\(\\frac{2}{5}\\)", correct: false, feedback: "3/8 = 0.375 < 0.4.", misconceptionId: "E-d10-b" },
        { text: "\\(\\frac{3}{8}\\), 0.35, 0.4, \\(\\frac{2}{5}\\)", correct: false, feedback: "0.35 is smaller than 0.375.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert all to decimals to compare.",
    forward: "Mixed-format comparisons are common in real-world data.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student does not convert the fractions before ordering, leaving the list in its original given order rather than ascending order.",
        rootCause: "Conversion Skipped — attempts to order fractions and decimals visually without converting to a common format.",
        remediation: "Convert every value to a decimal FIRST (3/8=0.375, 2/5=0.4), then compare all four decimals directly to order them."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student places 0.4 before 3/8, not realising 3/8 (0.375) is smaller than 0.4.",
        rootCause: "Fraction Value Underestimation — doesn't convert 3/8 to a decimal, misjudging its size relative to 0.4.",
        remediation: "Convert 3/8 by dividing 3 by 8 (=0.375) — this is less than 0.4, so it must come earlier in an ascending list."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student places 3/8 first, not realising it (0.375) is larger than 0.35.",
        rootCause: "Decimal-Fraction Comparison Reversal — misjudges which of 0.35 or 0.375 is smaller.",
        remediation: "Compare 0.35 and 0.375 by writing both to three decimal places: 0.350 vs 0.375 — 0.350 is smaller."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert all fractions to decimals", hint: "3/8 = ? and 2/5 = ?" },
      { level: 2, description: "List all four as decimals", hint: "0.4, 0.375, 0.35, 0.4." },
      { level: 3, description: "Sort ascending", hint: "Smallest to largest, keeping track of the original labels." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCOMP-02", probability: 0.3, condition: "Comparing mixed fraction/decimal formats without converting first recurs whenever data is presented in mixed notation." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-06",
    question: "? + 3.25 = 10.5 - 2.75. Find ?.",
    options: [
        { text: "4.5", correct: true, feedback: "10.5 - 2.75 = 7.75. ? = 7.75 - 3.25 = 4.5." },
        { text: "5.5", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d11-a" },
        { text: "4.0", correct: false, feedback: "Off by 0.5.", misconceptionId: "E-d11-b" },
        { text: "11.25", correct: false, feedback: "Incorrect combination of the operations.", misconceptionId: "E-d11-c" }
      ],
    backward: "First simplify the right side, then subtract the known addend.",
    forward: "Solving simple equations prepares for algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student miscalculates 10.5 - 2.75, arriving at a value 1.0 too high, which then propagates to a wrong final answer.",
        rootCause: "Subtraction Computation Error — errs in simplifying the right-hand side of the equation.",
        remediation: "Recompute 10.5 - 2.75 carefully by aligning decimal places and borrowing: 10.50 - 2.75 = 7.75."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student correctly simplifies the right side but makes a small error in the final subtraction, landing 0.5 below the correct answer.",
        rootCause: "Second-Step Subtraction Error — a borrowing slip in 7.75 - 3.25.",
        remediation: "After finding the right side equals 7.75, subtract 3.25 carefully: 7.75 - 3.25 = 4.50 — check by adding 4.5 + 3.25 to confirm it returns 7.75."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student adds 3.25 to 10.5 instead of isolating the unknown by subtracting it, mixing up the equation-solving steps.",
        rootCause: "Equation-Solving Step Confusion — doesn't isolate the unknown correctly, combining terms in the wrong way.",
        remediation: "To isolate ?, first simplify the known side of the equation (10.5-2.75), then SUBTRACT 3.25 from that result to undo the addition."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the right-hand side", hint: "10.5 - 2.75 = ?" },
      { level: 2, description: "Rewrite the equation", hint: "? + 3.25 = 7.75." },
      { level: 3, description: "Isolate the unknown", hint: "Subtract 3.25 from both sides: ? = 7.75 - 3.25." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Difficulty isolating an unknown in a simple decimal equation is a direct precursor to algebraic equation-solving." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.OA.A.1", "CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "0.05 × ? = 0.5. Then multiply the result (?) by 20.",
    options: [
        { text: "200", correct: true, feedback: "? = 0.5 ÷ 0.05 = 10. 10 × 20 = 200." },
        { text: "10", correct: false, feedback: "You only found ?.", misconceptionId: "E-d12-a" },
        { text: "20", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-b" },
        { text: "100", correct: false, feedback: "0.5 ÷ 0.05 = 10, not 5.", misconceptionId: "E-d12-c" }
      ],
    backward: "Find the missing multiplier first, then multiply by 20.",
    forward: "Two-step power-of-ten problems build fluency.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student correctly solves for ? (=10) but stops before the final multiplication by 20.",
        rootCause: "Final-Step Omission — treats the first equation's solution as the complete answer.",
        remediation: "The question has two parts: 'find ?' AND 'then multiply by 20' — both must be completed."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student mistakenly uses 1 (rather than the found value of ?=10) when multiplying by 20.",
        rootCause: "Value Substitution Error — loses track of the previously computed value of ? before the second operation.",
        remediation: "Write down the value of ? explicitly after solving the first equation (?=10), then use THAT number in the next step: 10 × 20."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student miscalculates ? as 5 instead of 10, then multiplies 5 × 20 = 100.",
        rootCause: "Division Computation Error — errs in dividing 0.5 by 0.05.",
        remediation: "Rewrite 0.5 ÷ 0.05 as 50 ÷ 5 (multiply both by 100 to clear decimals) — this gives 10, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the first equation", hint: "? = 0.5 ÷ 0.05." },
      { level: 2, description: "Clear the decimals to divide", hint: "0.5 ÷ 0.05 = 50 ÷ 5 = ?" },
      { level: 3, description: "Apply the second operation", hint: "Multiply your answer for ? by 20." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-02", probability: 0.3, condition: "Losing track of an intermediate result before a final step recurs in multi-step ratio and rate problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "In the number 4.257, the digit 5 represents 5 hundredths. What is the sum of the values of the digits 2, 5, and 7?",
    options: [
        { text: "0.257", correct: true, feedback: "2 tenths = 0.2; 5 hundredths = 0.05; 7 thousandths = 0.007. Sum = 0.257." },
        { text: "2.57", correct: false, feedback: "You read the digits as a whole number.", misconceptionId: "E-d13-a" },
        { text: "0.275", correct: false, feedback: "Swapped places.", misconceptionId: "E-d13-b" },
        { text: "2.507", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    backward: "Each digit's value is the digit multiplied by its place value.",
    forward: "Understanding digit values is essential for precise calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student concatenates the digits (2, 5, 7) as if reading them as a whole number, getting 2.57 instead of adding their place values.",
        rootCause: "Digit-vs-Value Confusion — treats 'the digits' as forming a new number rather than computing each digit's actual place value.",
        remediation: "Each digit has its OWN value based on its position: 2 in tenths = 0.2, 5 in hundredths = 0.05, 7 in thousandths = 0.007 — add these three separate values."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student swaps two of the place values, e.g. treating 7 as hundredths and 5 as thousandths.",
        rootCause: "Column Swap Error — mismatches a digit with the wrong place-value column.",
        remediation: "Recheck the original number 4.257 column by column: tenths=2, hundredths=5, thousandths=7 — match each digit to its true column before computing its value."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student makes an error in computing one of the three individual place values (e.g. miscounting zeros).",
        rootCause: "Place-Value Magnitude Error — miscounts the number of zeros when writing a digit's value (e.g. thousandths as 0.07 instead of 0.007).",
        remediation: "Write out each place value fully before adding: tenths = digit ÷ 10, hundredths = digit ÷ 100, thousandths = digit ÷ 1000."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each digit's place", hint: "In 4.257: 2 is tenths, 5 is hundredths, 7 is thousandths." },
      { level: 2, description: "Compute each digit's value", hint: "0.2, 0.05, 0.007." },
      { level: 3, description: "Add the three values", hint: "0.2 + 0.05 + 0.007 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-03",
    question: "A number lies between 3.4 and 3.5. It has three decimal places. Its tenths digit is the same as its thousandths digit. The hundredths digit is 6. What is the number?",
    options: [
        { text: "3.464", correct: true, feedback: "Tenths=4, hundredths=6, thousandths=4 (same as tenths). 3.464 is between 3.4 and 3.5." },
        { text: "3.466", correct: false, feedback: "Thousandths 6 ≠ tenths 4.", misconceptionId: "E-d14-a" },
        { text: "3.446", correct: false, feedback: "Hundredths is 4, not 6.", misconceptionId: "E-d14-b" },
        { text: "3.564", correct: false, feedback: "Tenths 5, but the number must be between 3.4 and 3.5 (tenths digit 4).", misconceptionId: "E-d14-c" }
      ],
    backward: "Fix the integer part (3) and tenths (4), apply the digit conditions.",
    forward: "Digit-constraint puzzles build logical reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student gets the hundredths digit right (6) but forgets to make the thousandths digit match the tenths digit.",
        rootCause: "Constraint Omission — applies the given hundredths digit but ignores the tenths=thousandths condition.",
        remediation: "List all conditions before assembling the number: range (tenths=4), hundredths=6, AND thousandths=tenths=4 — apply every one."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student swaps the hundredths and thousandths digits, placing 6 in the thousandths place instead of hundredths.",
        rootCause: "Column Swap Error — misassigns which named value goes in which place-value column.",
        remediation: "Assign digits to columns in the order they're named: tenths first (from the range), then hundredths (given as 6), then thousandths (matches tenths)."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student picks a tenths digit of 5 instead of 4, violating the range condition (between 3.4 and 3.5).",
        rootCause: "Range Boundary Misreading — doesn't correctly derive the tenths digit from the stated range.",
        remediation: "'Between 3.4 and 3.5' fixes the tenths digit at 4 — any number in this range starts with 3.4, so the tenths digit must be 4, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the tenths digit from the range", hint: "Between 3.4 and 3.5 means tenths digit = 4." },
      { level: 2, description: "Apply the given hundredths digit", hint: "Hundredths = 6." },
      { level: 3, description: "Apply the matching condition", hint: "Thousandths digit = tenths digit = 4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "Round 2.387 to the nearest hundredth, multiply by 100, then subtract 50.",
    options: [
        { text: "189", correct: true, feedback: "2.387 → 2.39 (thousandths 7≥5). 2.39×100=239. 239-50=189." },
        { text: "188", correct: false, feedback: "You truncated instead of rounding.", misconceptionId: "E-d15-a" },
        { text: "190", correct: false, feedback: "Rounding error.", misconceptionId: "E-d15-b" },
        { text: "2.39", correct: false, feedback: "You only rounded, forgot the rest.", misconceptionId: "E-d15-c" }
      ],
    backward: "Round first, then multiply by 100, then subtract 50.",
    forward: "Chaining operations after rounding is common in estimation.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student drops the thousandths digit instead of rounding, getting 2.38 instead of 2.39.",
        rootCause: "Truncation Instead of Rounding — simply chops off extra digits rather than checking whether to round up.",
        remediation: "To round, ALWAYS check the digit just past the target place: here the thousandths digit is 7, and since 7≥5, the hundredths digit rounds UP from 8 to 9."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student rounds correctly to 2.39 and multiplies correctly to 239, but makes an error in the final subtraction, landing on 190 instead of 189.",
        rootCause: "Final Subtraction Slip — a small arithmetic error in 239 - 50.",
        remediation: "Recompute the last step carefully: 239 - 50 = 189 — subtract only the tens and ones digits, leaving the hundreds digit (2) unchanged."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student rounds correctly to 2.39 but stops there, never performing the multiply-by-100 and subtract-50 steps.",
        rootCause: "Multi-Step Instruction Abandonment — treats the first action (rounding) as the complete answer.",
        remediation: "This question has THREE actions: round, multiply, subtract — check off each one against the question text before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest hundredth", hint: "Thousandths digit is 7, so round up: 2.39." },
      { level: 2, description: "Multiply by 100", hint: "2.39 × 100 = 239." },
      { level: 3, description: "Subtract 50", hint: "239 - 50 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-05", probability: 0.3, condition: "Truncating instead of properly rounding recurs in significant-figure and estimation problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert \\(1\\frac{3}{5}\\) to a decimal, then add 2.75.",
    options: [
        { text: "4.35", correct: true, feedback: "1 3/5 = 1.6. 1.6 + 2.75 = 4.35." },
        { text: "4.4", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d16-a" },
        { text: "3.35", correct: false, feedback: "You only used the decimal part (0.6) and added 2.75.", misconceptionId: "E-d16-b" },
        { text: "1.6", correct: false, feedback: "You only converted to decimal.", misconceptionId: "E-d16-c" }
      ],
    backward: "Convert the mixed number to a decimal, then add.",
    forward: "Mixed number conversions appear in recipes and construction.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student correctly converts to 1.6 but makes a small addition error when adding 2.75, landing on 4.4.",
        rootCause: "Addition Carry Error — mishandles the carry when adding 1.6 and 2.75.",
        remediation: "Align 1.60 and 2.75 by decimal place and add column by column from the right, carrying properly: 1.60 + 2.75 = 4.35."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student drops the whole-number part of the mixed number, using only 0.6 instead of 1.6 before adding.",
        rootCause: "Whole-Number Part Dropped — forgets that a mixed number includes both a whole number and a fraction.",
        remediation: "A mixed number like 1 3/5 means 1 + 3/5 = 1 + 0.6 = 1.6 — always keep the whole-number part when converting."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student correctly converts the mixed number to 1.6 but forgets to add 2.75 as instructed.",
        rootCause: "Final-Step Omission — treats the conversion as the complete answer.",
        remediation: "The question asks to convert AND THEN add — check both actions are completed before submitting an answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction part", hint: "3/5 = 0.6." },
      { level: 2, description: "Combine with the whole number", hint: "1 + 0.6 = 1.6." },
      { level: 3, description: "Add the second decimal", hint: "1.6 + 2.75 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3", "CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "Find 9.06 - 4.87, round the result to the nearest tenth, and multiply by 10.",
    options: [
        { text: "42", correct: true, feedback: "9.06-4.87=4.19. Nearest tenth: 4.2. ×10=42." },
        { text: "41.9", correct: false, feedback: "You multiplied the exact result by 10.", misconceptionId: "E-d17-a" },
        { text: "4.2", correct: false, feedback: "You only rounded.", misconceptionId: "E-d17-b" },
        { text: "419", correct: false, feedback: "You multiplied 4.19 by 100 instead of 4.2 by 10.", misconceptionId: "E-d17-c" }
      ],
    backward: "Subtract, round, then multiply.",
    forward: "Multi-step decimal operations appear in financial calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student skips the rounding step, multiplying the exact subtraction result (4.19) by 10 instead of the rounded value (4.2).",
        rootCause: "Instruction Skipping — ignores an explicit intermediate step (rounding) in a multi-step instruction.",
        remediation: "Perform the steps strictly in the stated order: subtract, THEN round, THEN multiply — use the rounded value in the final step, not the exact one."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student subtracts and rounds correctly (arriving at 4.2) but stops before multiplying by 10.",
        rootCause: "Final-Step Omission — treats the rounded intermediate value as the final answer.",
        remediation: "Count the required actions: subtract, round, AND multiply — three steps means three actions before answering."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student multiplies by 100 instead of 10, adding an extra zero to the final answer.",
        rootCause: "Wrong Multiplier Applied — confuses the requested multiplier (10) with a different power of ten.",
        remediation: "Re-read the instruction carefully — it says 'multiply by 10', not 100 — 4.2 × 10 shifts the decimal point just one place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract", hint: "9.06 - 4.87 = ?" },
      { level: 2, description: "Round to the nearest tenth", hint: "4.19 rounds to 4.2 (hundredths digit 9 rounds up)." },
      { level: 3, description: "Multiply by 10", hint: "4.2 × 10 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-05", probability: 0.3, condition: "Using an exact value instead of a rounded intermediate result recurs in multi-step financial/estimation calculations." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7", "CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "A number divided by 1000 gives 0.028. What is the number? Then divide that number by 100.",
    options: [
        { text: "0.28", correct: true, feedback: "Number = 0.028 × 1000 = 28. 28 ÷ 100 = 0.28." },
        { text: "2.8", correct: false, feedback: "28 ÷ 10 = 2.8, not ÷100.", misconceptionId: "E-d18-a" },
        { text: "0.028", correct: false, feedback: "That's the number after only the first step.", misconceptionId: "E-d18-b" },
        { text: "280", correct: false, feedback: "You multiplied by 1000 incorrectly.", misconceptionId: "E-d18-c" }
      ],
    backward: "Undo the division: multiply by 1000. Then perform the new division.",
    forward: "Working backwards through operations is a key problem-solving strategy.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly finds the original number (28) but divides it by 10 instead of the requested 100.",
        rootCause: "Wrong Divisor Applied — confuses the requested divisor (100) with a different power of ten.",
        remediation: "Re-read the instruction: 'divide by 100' — 28 ÷ 100 moves the decimal point two places, giving 0.28, not 2.8."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student never reverses the first division, using 0.028 (the given result) as if it were the original number.",
        rootCause: "Working-Backwards Skipped — doesn't recognise that 0.028 is the END result, not the starting number.",
        remediation: "The question says a number DIVIDED BY 1000 GIVES 0.028 — you must multiply 0.028 by 1000 to find that original number first."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student makes an error reversing the first step, computing the original number as 280 instead of 28.",
        rootCause: "Power-of-Ten Miscount — adds an extra zero when multiplying 0.028 by 1000.",
        remediation: "Multiplying by 1000 shifts the decimal point exactly three places right: 0.028 → 28 (not 280 — count the zeros in 1000 carefully)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the division", hint: "0.028 × 1000 = 28." },
      { level: 2, description: "Apply the new division", hint: "Now divide 28 by 100." },
      { level: 3, description: "Shift the decimal point", hint: "Dividing by 100 moves the decimal two places left: 28 → 0.28." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-01", probability: 0.35, condition: "Confusing which power-of-ten divisor to apply after reversing a chained operation recurs in metric unit conversions." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-06",
    question: "I am a decimal between 0 and 1. My tenths digit is the smallest prime number. My hundredths digit is the square of my tenths digit. My thousandths digit is the difference between my hundredths and tenths digits. What number am I? Then find \\(\\frac{1}{4}\\) of this number.",
    options: [
        { text: "0.0605", correct: true, feedback: "Number = 0.242. 1/4 of 0.242 = 0.0605." },
        { text: "0.242", correct: false, feedback: "You forgot to find 1/4 of it.", misconceptionId: "E-d19-a" },
        { text: "0.0242", correct: false, feedback: "Decimal misplaced.", misconceptionId: "E-d19-b" },
        { text: "0.0805", correct: false, feedback: "Incorrect number or fraction.", misconceptionId: "E-d19-c" }
      ],
    backward: "Smallest prime = 2. Tenths=2. Hundredths=2²=4. Thousandths=4-2=2. Number = 0.242. Then multiply by 1/4 (or divide by 4).",
    forward: "Descriptive digit puzzles build strong number sense.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student correctly finds the number (0.242) using the digit clues but forgets to compute 1/4 of it.",
        rootCause: "Final-Step Omission — treats the digit-riddle answer as the complete answer, ignoring the extra instruction.",
        remediation: "After solving the riddle, re-read the question — 'then find 1/4 of this number' is a required second step."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student computes 1/4 of 0.242 but misplaces the decimal point, getting 0.0242 (a factor of 10 too small).",
        rootCause: "Decimal Point Misplacement — errs in the number of places to shift when dividing by 4.",
        remediation: "Check by estimation: 1/4 of about 0.24 should be about 0.06 — compare your answer's size to this estimate to catch a misplaced decimal."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an error in solving the digit riddle itself (e.g. miscalculating the square or the difference), leading to a wrong starting number.",
        rootCause: "Riddle-Solving Arithmetic Error — a mistake in computing the square (2²=4) or the difference (4-2=2) that defines the digits.",
        remediation: "Solve the riddle step by step: smallest prime is 2 (tenths); its square is 2×2=4 (hundredths); the difference 4-2=2 (thousandths) — verify each computation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tenths digit", hint: "The smallest prime number is 2." },
      { level: 2, description: "Find hundredths and thousandths", hint: "Hundredths = 2² = 4. Thousandths = 4 - 2 = 2." },
      { level: 3, description: "Apply the fraction", hint: "Number = 0.242. Divide by 4 to find 1/4 of it." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-05", probability: 0.3, condition: "Misplacing the decimal point when finding a fraction of a small decimal recurs in percentage-of-amount problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3", "CCSS.MATH.CONTENT.5.NF.B.4"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "From the numbers 0.87, 0.8, 0.809, 0.88, find the difference between the largest and the smallest.",
    options: [
        { text: "0.08", correct: true, feedback: "Largest = 0.88, smallest = 0.8. Difference = 0.08." },
        { text: "0.07", correct: false, feedback: "Incorrect largest or smallest.", misconceptionId: "E-d20-a" },
        { text: "0.1", correct: false, feedback: "0.88 - 0.8 = 0.08, not 0.1.", misconceptionId: "E-d20-b" },
        { text: "0.01", correct: false, feedback: "Much too small.", misconceptionId: "E-d20-c" }
      ],
    backward: "Align all numbers to three decimal places, find max and min, subtract.",
    forward: "Range calculations are common in data analysis.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student misidentifies the largest or smallest value in the list (e.g. thinking 0.809 is larger than 0.87 because it has more digits), leading to a wrong difference.",
        rootCause: "Digit-Count Bias — assumes a number with more decimal digits is larger, without aligning place values.",
        remediation: "Rewrite all numbers to the same number of decimal places first: 0.870, 0.800, 0.809, 0.880 — now compare digit by digit from the left."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student correctly identifies largest and smallest (0.88 and 0.8) but miscalculates the subtraction, getting 0.1 instead of 0.08.",
        rootCause: "Subtraction Decimal Misalignment — doesn't line up decimal places correctly when subtracting.",
        remediation: "Align 0.88 and 0.80 by decimal place and subtract column by column: 0.88 - 0.80 = 0.08, not 0.10."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student picks values that are close together instead of the true largest and smallest, resulting in a difference far too small.",
        rootCause: "Extremes Misidentification — doesn't systematically compare ALL four values to find the true max and min.",
        remediation: "Compare all four numbers pairwise (after aligning decimal places) to be certain which is truly the largest and which is truly the smallest."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all numbers to 3 decimal places", hint: "0.870, 0.800, 0.809, 0.880." },
      { level: 2, description: "Find the largest and smallest", hint: "Compare column by column from the left." },
      { level: 3, description: "Subtract", hint: "Largest minus smallest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-06",
    question: "A number rounded to the nearest tenth is 6.3. Rounded to the nearest hundredth, it is 6.28. The digit sum is 18. Find the number.",
    options: [
        { text: "6.282", correct: true, feedback: "Range: 6.275-6.284. Digit sum: 6+2+8+2=18." },
        { text: "6.275", correct: false, feedback: "Sum = 6+2+7+5=20.", misconceptionId: "E-d21-a" },
        { text: "6.280", correct: false, feedback: "Sum = 16.", misconceptionId: "E-d21-b" },
        { text: "6.283", correct: false, feedback: "Sum = 19.", misconceptionId: "E-d21-c" }
      ],
    backward: "Intersect rounding ranges, then test digit sums.",
    forward: "Multiple constraints appear in measurement tolerances.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student picks the lower boundary of the intersected range without checking its digit sum matches the target 18.",
        rootCause: "Boundary Value Grabbed Without Verification — assumes a range boundary is automatically the answer.",
        remediation: "A rounding range gives many possible numbers — you must still test the digit sum condition to find the ONE that fits all clues."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student picks a number within the correct range but its digit sum (16) doesn't reach the target of 18.",
        rootCause: "Sum Verification Skipped — doesn't add up digits of the candidate before finalising.",
        remediation: "For each candidate within the valid range, add its digits explicitly and compare to 18 before selecting it as the answer."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student is close — the candidate is in range with digit sum 19, one more than the target.",
        rootCause: "Off-by-One Digit Search — stops at a near-miss candidate instead of systematically checking each option.",
        remediation: "Systematically list every number in the valid range (6.275 to 6.284) and compute each digit sum until you find the one equal to 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tenths-rounding range", hint: "Rounds to 6.3 → between 6.25 and 6.35." },
      { level: 2, description: "Find the hundredths-rounding range and intersect", hint: "Rounds to 6.28 → between 6.275 and 6.285. Overlap: 6.275-6.284." },
      { level: 3, description: "Test digit sums", hint: "Within the overlap, find the number whose digits add to 18." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-01", probability: 0.4, condition: "Struggling to intersect two rounding ranges signals difficulty with tolerance/precision reasoning in measurement." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-07",
    question: "Convert 0.075 to a fraction in simplest form. Then find \\(\\frac{2}{3}\\) of that fraction.",
    options: [
        { text: "\\(\\frac{1}{20}\\)", correct: true, feedback: "0.075 = 75/1000 = 3/40. 2/3 × 3/40 = 2/40 = 1/20." },
        { text: "\\(\\frac{3}{40}\\)", correct: false, feedback: "You forgot to find 2/3 of it.", misconceptionId: "E-d22-a" },
        { text: "\\(\\frac{1}{15}\\)", correct: false, feedback: "Incorrect fraction multiplication.", misconceptionId: "E-d22-b" },
        { text: "\\(\\frac{2}{15}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-c" }
      ],
    backward: "Convert decimal to fraction, simplify, then multiply by 2/3.",
    forward: "Linking decimals, fractions, and fraction-of-a-fraction operations.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student correctly converts 0.075 to 3/40 but stops before finding 2/3 of it.",
        rootCause: "Final-Step Omission — treats the decimal-to-fraction conversion as the complete answer.",
        remediation: "The question has two parts: convert AND THEN find 2/3 of the result — complete both actions."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student multiplies the fractions incorrectly (e.g. multiplying numerators and denominators without simplifying), landing on 1/15 instead of 1/20.",
        rootCause: "Fraction Multiplication Error — mishandles the numerator/denominator multiplication or the simplification step.",
        remediation: "Multiply straight across: 2/3 × 3/40 = (2×3)/(3×40) = 6/120, then simplify by dividing both by 6 to get 1/20."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student makes an error converting 0.075 to a fraction in the first place, starting from a wrong fraction like 3/20.",
        rootCause: "Decimal-to-Fraction Conversion Error — misplaces the denominator's power of ten when converting.",
        remediation: "0.075 has three decimal places, so write it as 75/1000 first, THEN simplify by dividing both by their GCF (25) to get 3/40."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to a fraction", hint: "0.075 = 75/1000. Simplify: divide by 25 to get 3/40." },
      { level: 2, description: "Set up the multiplication", hint: "2/3 × 3/40." },
      { level: 3, description: "Multiply and simplify", hint: "Cancel the common factor of 3 before multiplying." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-05", probability: 0.3, condition: "Errors in fraction-of-a-fraction multiplication recur in ratio and probability problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4"]
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-06",
    question: "Find the sum of 4.5, 3.25, and 2.75. Subtract this sum from 20, then divide the result by 2.",
    options: [
        { text: "4.75", correct: true, feedback: "Sum = 10.5. 20 - 10.5 = 9.5. 9.5 ÷ 2 = 4.75." },
        { text: "9.5", correct: false, feedback: "You only did the subtraction.", misconceptionId: "E-d23-a" },
        { text: "5.25", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-d23-b" },
        { text: "10.5", correct: false, feedback: "You only found the sum.", misconceptionId: "E-d23-c" }
      ],
    backward: "Add first, subtract from 20, then divide by 2.",
    forward: "Chained operations mirror real-world budgeting and averaging.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student correctly finds the sum and the subtraction from 20 (9.5) but forgets the final division by 2.",
        rootCause: "Final-Step Omission — stops after the second of three required actions.",
        remediation: "This problem has three actions in sequence: add, subtract, divide — check off each one before answering."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student makes an error adding 4.5 + 3.25 + 2.75, arriving at a wrong total that then propagates through the rest of the problem.",
        rootCause: "Multi-Addend Addition Error — miscarries or misaligns decimals when adding three numbers at once.",
        remediation: "Add two numbers at a time, aligning decimal points carefully: 4.5+3.25=7.75, then 7.75+2.75=10.5."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student correctly computes the sum (10.5) but stops there, never subtracting from 20 or dividing by 2.",
        rootCause: "Multi-Step Instruction Abandonment — treats the first computed value as the final answer.",
        remediation: "Re-read the full instruction: 'find the sum... subtract... then divide' names three separate steps — perform all three in order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the three numbers", hint: "4.5 + 3.25 + 2.75 = ?" },
      { level: 2, description: "Subtract from 20", hint: "20 - (your sum) = ?" },
      { level: 3, description: "Divide by 2", hint: "(your subtraction result) ÷ 2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-06", probability: 0.25, condition: "Abandoning a multi-step decimal chain part-way through recurs in longer real-world calculation chains (e.g. averaging, budgeting)." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "A number is divided by 1000, then by 10, giving 0.003. What is the original number?",
    options: [
        { text: "30", correct: true, feedback: "Work backwards: 0.003 × 10 = 0.03; 0.03 × 1000 = 30." },
        { text: "3", correct: false, feedback: "You only did one reverse step.", misconceptionId: "E-d24-a" },
        { text: "0.3", correct: false, feedback: "0.003 × 1000 = 3, not 0.3.", misconceptionId: "E-d24-b" },
        { text: "300", correct: false, feedback: "Over-corrected.", misconceptionId: "E-d24-c" }
      ],
    backward: "Reverse the operations: multiply by 10, then by 1000.",
    forward: "Reversing multiple power-of-ten shifts is used in metric conversions.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student reverses only one of the two chained divisions (e.g. only the ÷10), leaving the answer one step short.",
        rootCause: "Final-Step Omission — undoes only one of two chained operations.",
        remediation: "Two divisions happened (÷1000, then ÷10), so two multiplications are needed to reverse them both — check both are performed."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student reverses the operations but skips one reversal step, applying only the ×1000 to the original 0.003 without first undoing the ÷10.",
        rootCause: "Reversal Order Error — doesn't reverse the chained operations in the correct sequence.",
        remediation: "Reverse in the OPPOSITE order to how they were applied: the LAST operation done (÷10) must be undone FIRST (×10), then the ÷1000 undone (×1000)."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student overshoots, applying an extra power-of-ten multiplication and landing on 300 instead of 30.",
        rootCause: "Power-of-Ten Miscount — adds an extra zero somewhere in the two-step reversal.",
        remediation: "Track each reversal step's zeros carefully: 0.003 × 10 = 0.03 (one zero shift), then 0.03 × 1000 = 30 (three zero shift) — recount each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the operation chain", hint: "Original → ÷1000 → ÷10 → 0.003. Reverse in opposite order." },
      { level: 2, description: "Reverse the last step first", hint: "Undo ÷10 by multiplying 0.003 by 10: 0.03." },
      { level: 3, description: "Reverse the first step", hint: "Undo ÷1000 by multiplying 0.03 by 1000." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-01", probability: 0.35, condition: "Reversing chained divisions in the wrong order is a common source of error in multi-step metric conversions." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-06",
    question: "I am a decimal between 1 and 2. My tenths digit is 3 times my hundredths digit. The sum of all my digits is 8. All digits are greater than 0. Find me.",
    options: [
        { text: "1.313", correct: true, feedback: "Digits: 1,3,1,3. Tenths=3, hundredths=1 (3=3×1). All digits >0. Sum = 1+3+1+3=8." },
        { text: "1.007", correct: false, feedback: "Digits include 0, which is not allowed (all digits must be >0).", misconceptionId: "E-r1-a" },
        { text: "1.331", correct: false, feedback: "Tenths=3, hundredths=3, and 3 is not 3 times 3.", misconceptionId: "E-r1-b" },
        { text: "1.133", correct: false, feedback: "Tenths=1, hundredths=3, and 1 is not 3 times 3.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student finds a number matching the digit-sum condition but overlooks the 'all digits greater than 0' rule, allowing a zero digit.",
        rootCause: "Constraint Omission — satisfies some conditions while ignoring the 'no zero digits' rule.",
        remediation: "Treat every stated rule as a filter: after finding a candidate, check EACH digit individually to confirm none of them are zero."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student picks equal tenths and hundredths digits (3 and 3), not realising 3 is not three times itself.",
        rootCause: "Relationship Verification Skipped — doesn't check the 'tenths = 3 × hundredths' rule against the chosen digits.",
        remediation: "For any candidate, explicitly compute 3 × hundredths digit and confirm it equals the tenths digit before accepting the answer."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student reverses the relationship, treating hundredths as 3 times tenths instead of the other way round.",
        rootCause: "Relationship Reversal — swaps which digit is described as '3 times' the other.",
        remediation: "Read carefully: 'tenths digit is 3 times my hundredths digit' means tenths = 3 × hundredths — write this as an equation before choosing digits."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the digit relationship", hint: "Let hundredths = h, then tenths = 3h." },
      { level: 2, description: "Apply the sum condition", hint: "1 + 3h + h + thousandths = 8, and all digits must be >0." },
      { level: 3, description: "Test small values of h", hint: "Try h=1: tenths=3, so far sum=1+3+1=5, thousandths=3 to reach 8." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Difficulty translating worded digit relationships into equations is a direct precursor to algebraic equation-setup struggles." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-03",
    question: "A number is between 0.35 and 0.45. Its hundredths digit is twice its tenths digit. What is the number?",
    options: [
        { text: "0.36", correct: true, feedback: "Tenths=3, hundredths=6 (2×3). 0.36 is between 0.35 and 0.45." },
        { text: "0.48", correct: false, feedback: "0.48 > 0.45.", misconceptionId: "E-r2-a" },
        { text: "0.24", correct: false, feedback: "0.24 < 0.35.", misconceptionId: "E-r2-b" },
        { text: "0.63", correct: false, feedback: "0.63 > 0.45.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student satisfies the digit rule (hundredths=2×tenths) using tenths=4, but the resulting number falls outside the stated range.",
        rootCause: "Range Boundary Neglect — satisfies the digit relationship while ignoring the range constraint.",
        remediation: "The range 0.35-0.45 restricts the tenths digit to 3 or 4 (roughly) — test each possible tenths digit against BOTH the range and the digit rule."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student picks a tenths digit too small, producing a number below the lower bound of the range.",
        rootCause: "Lower Bound Violation — doesn't verify the candidate exceeds 0.35.",
        remediation: "Check the candidate is greater than 0.35 — a tenths digit of 2 gives a number in the 0.2 range, too small."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student swaps the tenths and hundredths digits, producing 0.63 which is outside the range and reverses the digit relationship.",
        rootCause: "Digit Order Reversal — writes the hundredths digit in the tenths place and vice versa.",
        remediation: "Keep track of which digit belongs in which column: the SMALLER original digit (tenths) goes first, the doubled value (hundredths) goes second."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the possible tenths digits from the range", hint: "Between 0.35 and 0.45 means tenths digit is 3 or 4." },
      { level: 2, description: "Apply the digit rule to each", hint: "If tenths=3, hundredths=6. If tenths=4, hundredths=8." },
      { level: 3, description: "Check which fits the range", hint: "Is 0.36 between 0.35 and 0.45? Is 0.48?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-06",
    question: "A number rounded to the nearest tenth is 9.2. Rounded to the nearest hundredth, it is 9.18. The sum of its digits is 23. Find the number.",
    options: [
        { text: "9.176", correct: true, feedback: "Range: 9.175-9.184. Digit sum: 9+1+7+6=23." },
        { text: "9.175", correct: false, feedback: "Sum = 22.", misconceptionId: "E-r3-a" },
        { text: "9.184", correct: false, feedback: "Sum = 22.", misconceptionId: "E-r3-b" },
        { text: "9.177", correct: false, feedback: "Sum = 24.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student picks the lower boundary of the intersected rounding range without checking its digit sum matches 23.",
        rootCause: "Boundary Value Grabbed Without Verification — assumes a range boundary is automatically the correct answer.",
        remediation: "Always verify the digit-sum condition separately, even after correctly finding the rounding range — a boundary value is not automatically the answer."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student picks the upper boundary of the intersected range without checking its digit sum matches 23.",
        rootCause: "Boundary Value Grabbed Without Verification — same pattern as choosing the low boundary, applied to the high boundary instead.",
        remediation: "Test the digit sum of EVERY candidate in the range, not just the boundaries — the correct answer may be an interior value."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student is close — the candidate is in the correct range with digit sum 24, one more than the target.",
        rootCause: "Off-by-One Digit Search — stops at a near-miss candidate instead of systematically testing each option.",
        remediation: "Systematically list each number in the valid range and compute its digit sum, stopping only when the sum exactly equals 23."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the tenths-rounding range", hint: "Rounds to 9.2 → between 9.15 and 9.25." },
      { level: 2, description: "Find the hundredths-rounding range and intersect", hint: "Rounds to 9.18 → between 9.175 and 9.185. Overlap: 9.175-9.184." },
      { level: 3, description: "Test digit sums", hint: "Within the overlap, find the number whose digits add to 23." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-01", probability: 0.4, condition: "Struggling to intersect two rounding ranges signals difficulty with compound tolerance/precision reasoning." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-07",
    question: "Convert 0.0625 to a fraction in simplest form, then add \\(\\frac{1}{8}\\).",
    options: [
        { text: "\\(\\frac{3}{16}\\)", correct: true, feedback: "0.0625 = 1/16. 1/16 + 2/16 = 3/16." },
        { text: "\\(\\frac{1}{16}\\)", correct: false, feedback: "You forgot to add 1/8.", misconceptionId: "E-r4-a" },
        { text: "\\(\\frac{5}{16}\\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r4-b" },
        { text: "\\(\\frac{1}{8}\\)", correct: false, feedback: "Only the added fraction.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student correctly converts 0.0625 to 1/16 but stops before adding 1/8.",
        rootCause: "Final-Step Omission — treats the conversion as the complete answer.",
        remediation: "The question has two parts: convert AND THEN add — check both actions are completed."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student adds the fractions incorrectly, perhaps adding numerators and denominators separately (1+1)/(16+8), or failing to find a common denominator properly.",
        rootCause: "Unlike-Denominator Addition Error — doesn't correctly convert to a common denominator before adding.",
        remediation: "To add 1/16 and 1/8, first rewrite 1/8 as 2/16 (common denominator 16), then add numerators: 1/16 + 2/16 = 3/16."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student reports only the fraction being added (1/8) instead of the sum of both fractions.",
        rootCause: "Wrong Term Reported — confuses the addend with the final sum.",
        remediation: "The final answer must be the SUM of the converted fraction (1/16) and 1/8, not either fraction alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the decimal to a fraction", hint: "0.0625 = 625/10000, which simplifies to 1/16." },
      { level: 2, description: "Find a common denominator", hint: "Rewrite 1/8 as an equivalent fraction with denominator 16: 2/16." },
      { level: 3, description: "Add the fractions", hint: "1/16 + 2/16 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-05", probability: 0.3, condition: "Errors adding fractions with unlike denominators after a decimal conversion recur throughout fraction-heavy word problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "(6.7 + 3.85) - (2.6 - 0.75) = ?",
    options: [
        { text: "8.7", correct: true, feedback: "6.7+3.85=10.55; 2.6-0.75=1.85; 10.55-1.85=8.7." },
        { text: "7.7", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-a" },
        { text: "9.7", correct: false, feedback: "Added the second bracket instead of subtracting.", misconceptionId: "E-r5-b" },
        { text: "8.6", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student makes a larger computational error in one of the two brackets, landing a full 1.0 below the correct total.",
        rootCause: "Bracket Subtraction Computation Error — miscalculates one of the two bracket results significantly.",
        remediation: "Verify each bracket separately: 6.7+3.85 should equal 10.55, and 2.6-0.75 should equal 1.85 — check both before combining."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student adds the two bracket results instead of subtracting the second from the first.",
        rootCause: "Bracket-Ignoring Order of Operations — misreads the minus sign between the two brackets as a plus.",
        remediation: "Look carefully at the operator BETWEEN the brackets — here it is a minus sign, so the second bracket's result must be SUBTRACTED, not added."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes a small borrowing slip in the final subtraction, landing 0.1 below the correct total.",
        rootCause: "Subtraction Borrowing Error — mishandles regrouping in 10.55 - 1.85.",
        remediation: "Align 10.55 and 1.85 by decimal place and subtract column by column from the right, borrowing carefully where needed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the first bracket", hint: "6.7 + 3.85 = ?" },
      { level: 2, description: "Solve the second bracket", hint: "2.6 - 0.75 = ?" },
      { level: 3, description: "Subtract the second result from the first", hint: "10.55 - 1.85 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "0.002 × ? = 0.2. Then divide ? by 10.",
    options: [
        { text: "10", correct: true, feedback: "? = 0.2 ÷ 0.002 = 100. 100 ÷ 10 = 10." },
        { text: "100", correct: false, feedback: "You only found ?.", misconceptionId: "E-r6-a" },
        { text: "1000", correct: false, feedback: "0.2 ÷ 0.002 = 100, not 1000.", misconceptionId: "E-r6-b" },
        { text: "1", correct: false, feedback: "Incorrect.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student correctly solves for ? (=100) but stops before dividing by 10.",
        rootCause: "Final-Step Omission — treats the first equation's solution as the complete answer.",
        remediation: "The question has two parts: 'find ?' AND 'then divide by 10' — both must be completed."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student miscalculates ? as 1000 instead of 100, overshooting by a factor of 10.",
        rootCause: "Power-of-Ten Miscount — loses track of a zero when dividing 0.2 by 0.002.",
        remediation: "Rewrite 0.2 ÷ 0.002 as 200 ÷ 2 (multiply both by 1000 to clear decimals), then divide: 200 ÷ 2 = 100, not 1000."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student severely underestimates ?, perhaps computing 0.2 ÷ 0.002 incorrectly as close to 1.",
        rootCause: "Decimal Divisor Magnitude Confusion — doesn't recognise that dividing by a very small decimal produces a much larger result.",
        remediation: "Estimate first: 0.002 is a very small number, so 0.2 ÷ 0.002 must be a much larger number than 0.2 — check your answer's size makes sense."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the first equation", hint: "? = 0.2 ÷ 0.002." },
      { level: 2, description: "Clear the decimals to divide", hint: "0.2 ÷ 0.002 = 200 ÷ 2 = ?" },
      { level: 3, description: "Apply the second operation", hint: "Divide your answer for ? by 10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-07",
    question: "Use the digits 4, 0, 1, 9, 6 exactly once to form the largest decimal between 0 and 1. The tenths digit must be even. What is the number?",
    options: [
        { text: "0.69410", correct: true, feedback: "Largest even tenths digit from {6,4,0} is 6. Then arrange remaining digits 9,4,1,0 in descending order: 0.69410." },
        { text: "0.96410", correct: false, feedback: "Tenths digit 9 is odd.", misconceptionId: "E-r7-a" },
        { text: "0.61490", correct: false, feedback: "Not the largest arrangement after fixing tenths=6.", misconceptionId: "E-r7-b" },
        { text: "0.96140", correct: false, feedback: "Tenths digit 9 is odd.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student ignores the even-tenths-digit constraint entirely, placing the largest available digit (9) in the tenths place.",
        rootCause: "Constraint Omission — maximises the number without checking the parity condition on the tenths digit.",
        remediation: "Before arranging digits for size, first filter to ONLY the digits allowed in the constrained position — here, only even digits {4,0,6} can go in the tenths place."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student correctly fixes tenths=6 but arranges the remaining digits (9,4,1,0) in a non-optimal order, producing a smaller number than possible.",
        rootCause: "Sub-Optimal Digit Ordering — doesn't maximise the remaining digits after fixing the constrained one.",
        remediation: "After fixing the tenths digit, arrange ALL remaining digits in DESCENDING order (largest first) to maximise the rest of the number."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student again picks the odd digit 9 for the tenths place, violating the even-digit constraint, while also misordering the rest.",
        rootCause: "Constraint Omission combined with Sub-Optimal Ordering — two compounded errors.",
        remediation: "Handle constraints in order: (1) filter to even digits for the tenths place, (2) pick the LARGEST even one (6), (3) arrange the rest in descending order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Filter to even digits for the tenths place", hint: "Even digits available: 4, 0, 6." },
      { level: 2, description: "Choose the largest one", hint: "6 is the largest even digit." },
      { level: 3, description: "Arrange the rest to maximise", hint: "Place the remaining digits 9,4,1,0 in descending order." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCOMP-01", probability: 0.3, condition: "Difficulty maximising/minimising numbers under digit constraints recurs in optimisation-style comparison problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-04",
    question: "Multiply 0.15 by 6, and multiply 0.9 by 1. Which is larger, and by how much?",
    options: [
        { text: "They are equal (difference 0)", correct: true, feedback: "0.15×6=0.9; 0.9×1=0.9." },
        { text: "0.9 is larger by 0.1", correct: false, feedback: "They are equal.", misconceptionId: "E-r8-a" },
        { text: "0.15×6 is larger by 0.1", correct: false, feedback: "Both are 0.9.", misconceptionId: "E-r8-b" },
        { text: "0.9×1 is larger by 0.01", correct: false, feedback: "No difference.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student assumes the two products differ without actually computing 0.15 × 6 precisely, guessing there's a difference of 0.1.",
        rootCause: "Estimation Without Verification — judges the products as different without doing the actual multiplication.",
        remediation: "Always compute 0.15 × 6 exactly (using long multiplication or repeated addition) before comparing — don't guess based on appearance."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student miscalculates 0.15 × 6 (e.g. as 1.0) and wrongly concludes it's larger than 0.9 × 1.",
        rootCause: "Multiplication Computation Error — errs in computing 0.15 × 6.",
        remediation: "Recompute 0.15 × 6 step by step: 15 × 6 = 90, then place the decimal point (two places from 0.15) to get 0.90."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student assumes multiplying by 1 changes a value, treating 0.9 × 1 as something other than 0.9.",
        rootCause: "Identity Property Misunderstanding — doesn't recognise that multiplying any number by 1 leaves it unchanged.",
        remediation: "Any number multiplied by 1 stays exactly the same — 0.9 × 1 = 0.9, with no change at all."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the first product", hint: "0.15 × 6 = ?" },
      { level: 2, description: "Compute the second product", hint: "0.9 × 1 = 0.9 (multiplying by 1 changes nothing)." },
      { level: 3, description: "Compare", hint: "Are the two results the same value?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "Round 5.697 to the nearest tenth, then add 2.3. Then round the sum to the nearest whole number.",
    options: [
        { text: "8", correct: true, feedback: "5.697 → 5.7. +2.3 = 8.0 → nearest whole is 8." },
        { text: "7.7", correct: false, feedback: "You only rounded and added, forgot the final rounding.", misconceptionId: "E-r9-a" },
        { text: "8.3", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r9-b" },
        { text: "9", correct: false, feedback: "5.697 rounds to 5.7 to the nearest tenth, not 6.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student correctly rounds and adds (getting 8.0) but forgets to state the final whole-number rounding.",
        rootCause: "Final-Step Omission — stops after the second of three required actions.",
        remediation: "This problem has three actions: round, add, round again — check off each one before answering."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student makes an error adding 5.7 + 2.3, arriving at a wrong intermediate sum that propagates to the final answer.",
        rootCause: "Addition Computation Error — miscalculates 5.7 + 2.3.",
        remediation: "Recompute 5.7 + 2.3 carefully: 5.7 + 2.3 = 8.0 exactly (the tenths digits 7 and 3 sum to 10, carrying 1 to the ones place)."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student incorrectly rounds 5.697 to 5.7 to the nearest tenth as 6 instead, confusing tenths-rounding with whole-number rounding.",
        rootCause: "Rounding Place Confusion — rounds to the wrong place value (whole number instead of tenth).",
        remediation: "Rounding 'to the nearest tenth' keeps one decimal place — check the hundredths digit (9) to round the tenths digit up: 5.697 → 5.7, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest tenth", hint: "5.697 → look at the hundredths digit (9) → round up to 5.7." },
      { level: 2, description: "Add", hint: "5.7 + 2.3 = ?" },
      { level: 3, description: "Round the sum to the nearest whole number", hint: "Is 8.0 already a whole number?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert \\(\\frac{2}{5}\\) to a decimal, multiply by 0.5, then add 0.1.",
    options: [
        { text: "0.3", correct: true, feedback: "2/5 = 0.4. 0.4×0.5=0.2. 0.2+0.1=0.3." },
        { text: "0.5", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-a" },
        { text: "0.6", correct: false, feedback: "0.4×0.5=0.2, not 0.5.", misconceptionId: "E-r10-b" },
        { text: "0.25", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student correctly converts 2/5 to 0.4 but skips the multiplication step, adding 0.1 directly to 0.4.",
        rootCause: "Instruction Skipping — ignores an explicit intermediate step (multiplying by 0.5).",
        remediation: "Perform each named action in order: convert, THEN multiply by 0.5, THEN add 0.1 — don't skip the multiplication."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student mistakes 'multiply by 0.5' for 'multiply by 1' or otherwise fails to halve the value, then adds 0.1 to the unhalved 0.4, yielding 0.6 instead of proceeding correctly.",
        rootCause: "Multiply-by-Half Confusion — doesn't recognise that multiplying by 0.5 is equivalent to halving.",
        remediation: "Multiplying by 0.5 always halves a number: 0.4 × 0.5 = 0.2 — check this equals half of 0.4 before moving to the next step."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student makes an error converting 2/5 to a decimal, perhaps computing it as 0.25 instead of 0.4.",
        rootCause: "Fraction-to-Decimal Conversion Error — confuses 2/5 with 1/4 or miscalculates the division.",
        remediation: "Convert by dividing the numerator by the denominator: 2 ÷ 5 = 0.4 — recompute this division carefully rather than assuming a familiar decimal."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "2 ÷ 5 = 0.4." },
      { level: 2, description: "Multiply by 0.5", hint: "0.4 × 0.5 = ? (this halves 0.4)." },
      { level: 3, description: "Add 0.1", hint: "Your result from step 2, plus 0.1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3", "CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "10 - (2.5 + 3.75) + 1.2 = ?",
    options: [
        { text: "4.95", correct: true, feedback: "2.5+3.75=6.25; 10-6.25=3.75; +1.2=4.95." },
        { text: "5.05", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-a" },
        { text: "4.85", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-r11-b" },
        { text: "5.95", correct: false, feedback: "Added 1.2 inside the bracket.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student makes a computation error somewhere in the chain, overshooting the correct total by 0.1.",
        rootCause: "Chained Arithmetic Error — a slip in one of the three sequential operations (bracket addition, subtraction, final addition).",
        remediation: "Verify each step separately: 2.5+3.75=6.25, then 10-6.25=3.75, then 3.75+1.2=4.95 — check each computation against the previous one."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student makes a small subtraction error computing 10 - 6.25, landing 0.1 below the correct intermediate value.",
        rootCause: "Subtraction Borrowing Error — mishandles regrouping in 10 - 6.25.",
        remediation: "To subtract 6.25 from 10, think of 10 as 9.99+0.01 or carefully borrow across the whole number: 10.00 - 6.25 = 3.75."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student incorrectly includes the +1.2 inside the bracket before subtracting, rather than adding it after the subtraction.",
        rootCause: "Bracket-Ignoring Order of Operations — misplaces which terms belong inside vs. outside the brackets.",
        remediation: "Only 2.5 and 3.75 are inside the brackets — solve that bracket completely first, subtract it from 10, and only THEN add 1.2 outside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the bracket", hint: "2.5 + 3.75 = ?" },
      { level: 2, description: "Subtract from 10", hint: "10 - 6.25 = ?" },
      { level: 3, description: "Add the final term", hint: "3.75 + 1.2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7", "CCSS.MATH.CONTENT.5.OA.A.1"]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "A number multiplied by 1000 gives 45. What is the number? Then add 0.5.",
    options: [
        { text: "0.545", correct: true, feedback: "45 ÷ 1000 = 0.045. +0.5 = 0.545." },
        { text: "0.045", correct: false, feedback: "You forgot to add 0.5.", misconceptionId: "E-r12-a" },
        { text: "45.5", correct: false, feedback: "You added 0.5 before dividing.", misconceptionId: "E-r12-b" },
        { text: "4.5", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student correctly finds the original number (0.045) but stops before adding 0.5.",
        rootCause: "Final-Step Omission — treats the reversed value as the complete answer.",
        remediation: "The question has two parts: 'find the number' AND 'then add 0.5' — both must be completed."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student adds 0.5 to the given result (45) before reversing the multiplication, doing the steps in the wrong order.",
        rootCause: "Working-Backwards Order Confusion — performs the addition before undoing the multiplication instead of after.",
        remediation: "First reverse the ×1000 to find the ORIGINAL number (45 ÷ 1000 = 0.045), and only THEN add 0.5 to that original number."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student divides 45 by the wrong power of ten (e.g. by 10 instead of 1000), getting an original number of 4.5, before adding 0.5.",
        rootCause: "Wrong Inverse Divisor — reverses a ×1000 operation using ÷10 instead of ÷1000.",
        remediation: "To undo 'multiplied by 1000', divide by exactly 1000 — match the divisor to the multiplier: 45 ÷ 1000 = 0.045."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the multiplication", hint: "45 ÷ 1000 = 0.045." },
      { level: 2, description: "Apply the second operation", hint: "Now add 0.5 to 0.045." },
      { level: 3, description: "Align and add", hint: "0.045 + 0.500 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
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
    title: "Decimals — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Digit-riddle puzzles, intersecting rounding ranges, fraction-decimal synthesis, and chained BODMAS-style decimal operations.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Synthesis Tips</strong><br>' +
      "&bull; Use place value to set up digit relationships and equations.<br>" +
      "&bull; Rounding ranges: find the intersection when two rounding conditions are given.<br>" +
      "&bull; Convert between fractions and decimals to compare or operate.<br>" +
      "&bull; Combine operations following BODMAS; align decimals carefully.<br>" +
      "&bull; Work backwards through power-of-ten steps to find an original number.<br>",
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

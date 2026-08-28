// seed/mathSeedCh5DecimalsL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 5
// (Decimals), Level 2 — converted from the standalone HTML file
// ch-5-decimals-level-2.html.
//
// Run with: node seed/mathSeedCh5DecimalsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-5-decimals";
const CHAPTER_NAME = "Decimals";
const LEVEL = 2;

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
    skillId: "DECPLACE-03",
    question: "Write the decimal for 3 tens + 4 ones + 2 tenths + 5 hundredths.",
    options: [
        { text: "34.25", correct: true, feedback: "3 tens=30, 4 ones=4, 2 tenths=0.2, 5 hundredths=0.05 → 34.25." },
        { text: "34.025", correct: false, feedback: "You placed 2 in hundredths and 5 in thousandths.", misconceptionId: "E-w1-a" },
        { text: "30.425", correct: false, feedback: "You misaligned the tens.", misconceptionId: "E-w1-b" },
        { text: "3.425", correct: false, feedback: "You lost the tens place.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Align the parts: tens (30), ones (4), tenths (0.2), hundredths (0.05). Add them.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers 34.025, shifting the tenths and hundredths digits one column too far right.",
        rootCause: "Column Shift Error — places 2 tenths in the hundredths column and 5 hundredths in the thousandths column, sliding both parts one place right.",
        remediation: "Build each part separately as its own decimal (0.2 for tenths, 0.05 for hundredths) before combining, rather than concatenating digits directly."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 30.425, misplacing the ones and tens.",
        rootCause: "Whole-Number Misalignment — combines the tens and ones incorrectly, perhaps treating '3 tens + 4 ones' as if it meant something other than 34.",
        remediation: "Compute the whole-number part first and independently: 3 tens = 30, plus 4 ones = 34 — verify this sum before attaching any decimal part."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 3.425, dropping the tens entirely.",
        rootCause: "Dropped Place Value — treats '3 tens' as if it were just '3 ones', losing a factor of ten.",
        remediation: "Compute the value of each named part explicitly: 3 tens = 3×10 = 30, not 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the whole-number part", hint: "3 tens + 4 ones = 30 + 4 = 34." },
      { level: 2, description: "Compute the decimal part", hint: "2 tenths + 5 hundredths = 0.2 + 0.05 = 0.25." },
      { level: 3, description: "Combine", hint: "34 + 0.25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is larger? 0.503 or 0.53",
    options: [
        { text: "0.53", correct: true, feedback: "0.53 = 0.530 > 0.503." },
        { text: "0.503", correct: false, feedback: "More digits does not mean larger; compare 0.530 vs 0.503.", misconceptionId: "E-w2-a" },
        { text: "They are equal", correct: false, feedback: "0.530 ≠ 0.503.", misconceptionId: "E-w2-b" },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.53 to make 0.530, then compare.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Write both with three decimal places: 0.530 and 0.503. Compare 530 vs 503.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student picks 0.503, the number with more decimal digits.",
        rootCause: "More-Digits-Means-Bigger — treats 0.503 as larger because it's written with three decimal digits versus 0.53's two.",
        remediation: "Pad 0.53 to 0.530 (matching decimal places) and compare digit by digit: hundredths 3 vs 0 — 0.530 wins already at the hundredths place."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 'They are equal'.",
        rootCause: "Visual Similarity — both numbers share the digits 5, 0, 3 in some order and look similar without a digit-by-digit check.",
        remediation: "Align to the same decimal places and compare — they differ starting at the hundredths place."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 'Cannot compare'.",
        rootCause: "Unequal-Length Avoidance — assumes decimals with different numbers of digits can't be compared directly.",
        remediation: "Padding with trailing zeros always allows direct comparison, regardless of original length."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 0.53 as 0.530." },
      { level: 2, description: "Compare digit by digit", hint: "Tenths: 5 vs 5 (tie). Hundredths: 3 vs 0." },
      { level: 3, description: "Conclude", hint: "Since hundredths differ (3 > 0), which number is larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-05",
    question: "Round 7.865 to the nearest hundredth, then add 0.1.",
    options: [
        { text: "7.97", correct: true, feedback: "7.865 → hundredth is 6, thousandths 5 → round up to 7.87. +0.10 = 7.97." },
        { text: "7.96", correct: false, feedback: "You might have truncated or rounded incorrectly.", misconceptionId: "E-w3-a" },
        { text: "7.87", correct: false, feedback: "You forgot to add 0.1.", misconceptionId: "E-w3-b" },
        { text: "7.86", correct: false, feedback: "You didn't round up (thousandths 5 means round up).", misconceptionId: "E-w3-c" }
      ],
    retryHint: "First look at the thousandths digit (5) to round the hundredths. Then add 0.1.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 7.96, an error in either the rounding or addition step.",
        rootCause: "Multi-Step Arithmetic Slip — makes a small error somewhere in the two-step process (round, then add), landing close to but not at the correct answer.",
        remediation: "Verify each step separately: first confirm the rounded value (7.87), then verify the addition (7.87+0.10) independently."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 7.87, correctly rounding but stopping before the addition.",
        rootCause: "Missing Final Step — completes the rounding correctly but forgets the question has a second required step (add 0.1).",
        remediation: "Treat multi-step questions as a checklist — after rounding, explicitly check whether any further operation is still required."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 7.86, failing to round up at all.",
        rootCause: "Truncation Instead of Rounding — drops the thousandths digit without checking it (5≥5 means round up), then adds 0.1 to the un-rounded value.",
        remediation: "Check the deciding digit (thousandths=5) before dropping it — 5≥5 always rounds up, never truncates."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round first", hint: "Round 7.865 to the nearest hundredth: check the thousandths digit (5)." },
      { level: 2, description: "Confirm the rounded value", hint: "Since the thousandths digit is 5≥5, round the hundredths up: 7.865 → 7.87." },
      { level: 3, description: "Add the second value", hint: "7.87 + 0.1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-04",
    question: "Convert \\(\\frac{3}{25}\\) to a decimal.",
    options: [
        { text: "0.12", correct: true, feedback: "3/25 = 12/100 = 0.12." },
        { text: "0.3", correct: false, feedback: "That's 3/10, not 3/25.", misconceptionId: "E-w4-a" },
        { text: "0.25", correct: false, feedback: "You wrote the denominator as decimal.", misconceptionId: "E-w4-b" },
        { text: "0.012", correct: false, feedback: "Decimal point misplaced.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Multiply numerator and denominator to get denominator 100: 3/25 = 12/100 = 0.12.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 0.3, mistaking the numerator alone for a tenths value.",
        rootCause: "Numerator-Only Conversion — writes the numerator (3) as tenths, ignoring the actual denominator (25) entirely.",
        remediation: "The denominator determines the conversion factor — 25 needs to become 100 (×4), and the SAME factor must be applied to the numerator too."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers 0.25, writing the denominator itself as the decimal.",
        rootCause: "Denominator-as-Answer — mistakes the denominator (25) for the answer, perhaps confusing it with the more familiar fact that 1/4=0.25.",
        remediation: "Focus on converting the GIVEN fraction (3/25), not recalling a different, more familiar fraction's decimal value."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 0.012, with the decimal point one place too far left.",
        rootCause: "Wrong Number of Decimal Places — treats the denominator as if it were 1000 instead of 100, adding an extra decimal place.",
        remediation: "Since 25×4=100 (not 1000), the fraction becomes twelfths of a hundred — two decimal places, not three."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the multiplier to reach denominator 100", hint: "25 × ? = 100." },
      { level: 2, description: "Apply the same multiplier to the numerator", hint: "3 × 4 = 12, so 3/25 = 12/100." },
      { level: 3, description: "Write as a decimal", hint: "12/100 has two decimal places: 0.12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "5.6 + 3.45 - 2.1 = ?",
    options: [
        { text: "6.95", correct: true, feedback: "5.60 + 3.45 = 9.05; 9.05 - 2.10 = 6.95." },
        { text: "6.85", correct: false, feedback: "Subtraction error.", misconceptionId: "E-w5-a" },
        { text: "7.95", correct: false, feedback: "You added 2.1 instead of subtracting.", misconceptionId: "E-w5-b" },
        { text: "6.0", correct: false, feedback: "Rough estimate, not exact.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Align decimal points; add first, then subtract. Treat 5.6 as 5.60 and 2.1 as 2.10.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 6.85, an arithmetic slip in the subtraction step.",
        rootCause: "Column Subtraction Slip — makes an error in the second step (9.05-2.10), landing 0.1 short of the correct answer.",
        remediation: "Verify the subtraction step independently: 9.05-2.10, aligning each column."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 7.95, adding 2.1 instead of subtracting it.",
        rootCause: "Wrong Operation — misreads the minus sign as a plus sign, adding all three numbers together instead of subtracting the last one.",
        remediation: "Underline each operation symbol (+ and -) before starting, and perform them in the exact order and direction given."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 6.0, a rough estimate rather than the exact value.",
        rootCause: "Premature Rounding — estimates using rounded values instead of computing the exact result.",
        remediation: "Perform the exact column-by-column arithmetic rather than rounding each number before combining."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align and add first", hint: "5.60 + 3.45 = ?" },
      { level: 2, description: "Then subtract", hint: "Take that result and subtract 2.10." },
      { level: 3, description: "Verify", hint: "Check each column carefully: does your final answer make sense given the starting values?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-05",
    question: "0.25 × ? = 250. Find ?.",
    options: [
        { text: "1000", correct: true, feedback: "250 ÷ 0.25 = 1000." },
        { text: "100", correct: false, feedback: "0.25 × 100 = 25, not 250.", misconceptionId: "E-w6-a" },
        { text: "10", correct: false, feedback: "0.25 × 10 = 2.5.", misconceptionId: "E-w6-b" },
        { text: "10000", correct: false, feedback: "0.25 × 10000 = 2500.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Divide 250 by 0.25 to find the missing multiplier.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 100, one power-of-ten level too small.",
        rootCause: "Shift-Count Undercount — underestimates the shift needed to turn 0.25 into 250, which actually requires shifting three places (×1000), not two.",
        remediation: "Verify by multiplying back: does 0.25×100 actually equal 250? Since it gives 25, 100 is too small — try a larger multiplier."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 10, far too small.",
        rootCause: "Shift-Count Undercount — significantly underestimates the required multiplier.",
        remediation: "Compare magnitudes: 0.25 needs to grow to 250, a thousand-fold increase, not a ten-fold one."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 10000, one power-of-ten level too large.",
        rootCause: "Shift-Count Overreach — overestimates the required multiplier.",
        remediation: "Verify by multiplying back: 0.25×10000=2500, ten times too large — try a smaller multiplier."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the inverse operation", hint: "The missing multiplier equals 250 ÷ 0.25." },
      { level: 2, description: "Compute the division", hint: "250 ÷ 0.25 = 250 × 4 = ? (dividing by 0.25 is the same as multiplying by 4)." },
      { level: 3, description: "Verify", hint: "Check: does 0.25 × your answer equal 250?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "In 45.678, which digit is in the thousandths place?",
    options: [
        { text: "8", correct: true, feedback: "The thousandths place is the third decimal digit: 8." },
        { text: "7", correct: false, feedback: "7 is in the hundredths place.", misconceptionId: "E-w7-a" },
        { text: "6", correct: false, feedback: "6 is in the tenths place.", misconceptionId: "E-w7-b" },
        { text: "5", correct: false, feedback: "5 is in the ones place.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Count three places to the right of the decimal point: tenths, hundredths, thousandths.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 7, the hundredths digit.",
        rootCause: "Adjacent-Column Slip — lands one column too early, on hundredths instead of thousandths.",
        remediation: "Count columns explicitly from the decimal point, stopping only at the third."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 6, the tenths digit.",
        rootCause: "Wrong Column Selected — picks the very first digit after the decimal instead of counting to the third.",
        remediation: "The thousandths place is always the THIRD digit after the decimal — count one, two, three before answering."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 5, a whole-number digit.",
        rootCause: "Wrong Side of Decimal — picks a digit before the decimal point instead of after it.",
        remediation: "Confirm which side of the decimal point the answer must come from — the thousandths place is always after it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the decimal digits", hint: "45.678 has three digits after the decimal point: 6, 7, 8." },
      { level: 2, description: "Number the columns", hint: "1st (tenths)=6, 2nd (hundredths)=7, 3rd (thousandths)=?" },
      { level: 3, description: "Identify the third digit", hint: "The third digit after the decimal point is the thousandths digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w8", order: 8, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "0.8 × 100 = ?, then write the answer as a fraction of 100 in simplest form.",
    options: [
        { text: "80; \\(\\frac{4}{5}\\)", correct: true, feedback: "0.8 × 100 = 80. 80/100 = 4/5." },
        { text: "8; \\(\\frac{4}{5}\\)", correct: false, feedback: "0.8 × 100 = 80, not 8.", misconceptionId: "E-w8-a" },
        { text: "80; \\(\\frac{80}{100}\\)", correct: false, feedback: "The fraction must be simplified.", misconceptionId: "E-w8-b" },
        { text: "0.008; \\(\\frac{1}{125}\\)", correct: false, feedback: "You divided instead of multiplying.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "First multiply by 100 (move decimal two places right). Then write as fraction over 100 and simplify.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student computes the multiplication incorrectly (getting 8) but simplifies the (wrong) fraction correctly.",
        rootCause: "Shift-Count Undercount — shifts the decimal point only one place instead of two, getting 8 instead of 80.",
        remediation: "Count the zeros in 100 (two) and match that to the number of shifts — 0.8 becomes 80, not 8."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student correctly computes 80 but doesn't simplify 80/100.",
        rootCause: "Missing Simplification Step — stops after forming the fraction over 100 without reducing it.",
        remediation: "Always check whether numerator and denominator share a common factor greater than 1 before finalising."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 0.008, dividing instead of multiplying.",
        rootCause: "Wrong Direction — shifts the decimal point left (division direction) instead of right (multiplication direction).",
        remediation: "Multiplying by 100 makes the number bigger — the decimal point moves right, not left."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply by 100", hint: "Move the decimal point in 0.8 two places to the right." },
      { level: 2, description: "Write as a fraction over 100", hint: "80 as a fraction of 100 is 80/100." },
      { level: 3, description: "Simplify", hint: "Find the HCF of 80 and 100, then divide both by it." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "Write the decimal number: 5 + \\(\\frac{3}{10}\\) + \\(\\frac{7}{1000}\\).",
    options: [
        { text: "5.307", correct: true, feedback: "5 ones + 3 tenths + 0 hundredths + 7 thousandths = 5.307." },
        { text: "5.37", correct: false, feedback: "You placed 7 in the hundredths place instead of thousandths.", misconceptionId: "E-d1-a" },
        { text: "5.037", correct: false, feedback: "You placed 3 in the hundredths place.", misconceptionId: "E-d1-b" },
        { text: "5.370", correct: false, feedback: "You swapped the tenths and thousandths.", misconceptionId: "E-d1-c" }
      ],
    backward: "Combine the parts according to place value.",
    forward: "This is the reverse of expanded form, used when interpreting measurements.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student answers 5.37, ignoring the missing hundredths placeholder.",
        rootCause: "Zero-Placeholder Skipped — since no hundredths term is given, assumes the thousandths digit slides left into the hundredths column instead of leaving a zero placeholder.",
        remediation: "Write out ALL three decimal columns explicitly (tenths, hundredths, thousandths), inserting a 0 for any place not mentioned — 3 tenths, 0 hundredths, 7 thousandths."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student answers 5.037, placing the 3 one column too far right.",
        rootCause: "Column Shift Error — shifts the tenths digit into the hundredths column.",
        remediation: "The tenths digit (3) always goes in the FIRST column after the decimal point — verify this before placing any other digit."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student answers 5.370, swapping the positions of the tenths and thousandths digits.",
        rootCause: "Digit Order Reversal — reverses the order of the two given fractional parts.",
        remediation: "Match each fraction to its named place value directly: 3/10 is tenths (goes first), 7/1000 is thousandths (goes third) — don't reorder them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each named place", hint: "3/10 is tenths. 7/1000 is thousandths. What about hundredths?" },
      { level: 2, description: "Fill in the missing placeholder", hint: "Since no hundredths term is given, that column is 0." },
      { level: 3, description: "Assemble the decimal", hint: "5 . (tenths=3)(hundredths=0)(thousandths=7)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Which is largest? 0.8, 0.08, 0.808, 0.088",
    options: [
        { text: "0.808", correct: true, feedback: "Align: 0.800, 0.080, 0.808, 0.088. Largest is 0.808." },
        { text: "0.8", correct: false, feedback: "0.8 = 0.800 < 0.808.", misconceptionId: "E-d2-a" },
        { text: "0.08", correct: false, feedback: "0.08 = 0.080, the smallest.", misconceptionId: "E-d2-b" },
        { text: "0.088", correct: false, feedback: "0.088 is less than 0.808.", misconceptionId: "E-d2-c" }
      ],
    backward: "Add zeros to make all have three decimal places.",
    forward: "Comparison skills are essential in data interpretation.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student picks 0.8, close to but not the actual largest.",
        rootCause: "Partial Comparison — compares 0.8 favorably against the smaller-looking options without checking it against 0.808, which is actually larger.",
        remediation: "Align ALL FOUR numbers to three decimal places (0.800, 0.080, 0.808, 0.088) and compare them together, not just some pairs."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student picks 0.08, actually the smallest value.",
        rootCause: "Direction Confusion — correctly aligns and compares but selects the smallest instead of the largest.",
        remediation: "Reread the question to confirm the direction (largest vs smallest) before selecting from the sorted list."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student picks 0.088, confusing digit patterns.",
        rootCause: "Digit-Pattern Confusion — 0.088 and 0.808 share similar digits (0,8,8) in different arrangements, leading to a mix-up about which is larger.",
        remediation: "Align to three decimal places explicitly and compare column by column: tenths first (0 vs 8) immediately shows 0.808 is far larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four numbers", hint: "Write with three decimal places: 0.800, 0.080, 0.808, 0.088." },
      { level: 2, description: "Compare tenths digits first", hint: "Tenths: 8, 0, 8, 0. Two candidates have tenths digit 8." },
      { level: 3, description: "Break the tie with hundredths", hint: "Between 0.800 and 0.808, compare hundredths: 0 vs 0, then thousandths: 0 vs 8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-05",
    question: "Round 12.349 to the nearest tenth and to the nearest whole number. Find the sum of these two rounded values.",
    options: [
        { text: "24.3", correct: true, feedback: "Nearest tenth: 12.3 (hundredths 4<5). Nearest whole: 12 (tenths 3<5). Sum = 12.3 + 12 = 24.3." },
        { text: "24.4", correct: false, feedback: "You might have rounded 12.349 to 12.4 for nearest tenth.", misconceptionId: "E-d3-a" },
        { text: "24.6", correct: false, feedback: "Rounded both up incorrectly.", misconceptionId: "E-d3-b" },
        { text: "24.0", correct: false, feedback: "Incorrect rounding.", misconceptionId: "E-d3-c" }
      ],
    backward: "Round each separately, then add.",
    forward: "Double rounding tests attention to detail.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student computes the nearest-tenth rounding incorrectly as 12.4.",
        rootCause: "Wrong Deciding Digit — uses the thousandths digit (9) instead of the hundredths digit (4) to decide the tenths rounding, incorrectly rounding up.",
        remediation: "For rounding to the nearest TENTH, only the very next digit (hundredths) decides — here that's 4, which is less than 5, so round down."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student rounds both values up incorrectly.",
        rootCause: "Direction Default — rounds up by habit for both roundings without checking either deciding digit (hundredths=4 for tenths rounding, tenths=3 for whole-number rounding — both call for rounding down).",
        remediation: "Check the deciding digit fresh for EACH rounding operation — don't assume the direction from one applies to the other."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 24.0, likely from an error in one of the two roundings or their sum.",
        rootCause: "Multi-Step Arithmetic Slip — makes an error somewhere across the two roundings and the final addition.",
        remediation: "Compute and verify each rounding separately, then add the two verified values."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest tenth", hint: "Check the hundredths digit (4) — is it 5 or more?" },
      { level: 2, description: "Round to the nearest whole number", hint: "Check the tenths digit (3) — is it 5 or more?" },
      { level: 3, description: "Add the two rounded values", hint: "12.3 + 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert 0.625 to a fraction in simplest form, then add \\(\\frac{1}{8}\\).",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "0.625 = 5/8. 5/8 + 1/8 = 6/8 = 3/4." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "You forgot to add 1/8.", misconceptionId: "E-d4-a" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect conversion.", misconceptionId: "E-d4-b" },
        { text: "\\(\\frac{7}{8}\\)", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-d4-c" }
      ],
    backward: "Convert decimal to fraction, simplify, then add like fractions.",
    forward: "This links decimals and fraction operations.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student answers 5/8, correctly converting but forgetting the addition step.",
        rootCause: "Missing Final Step — correctly converts 0.625 to 5/8 but stops before adding 1/8 as the question requires.",
        remediation: "Treat multi-step questions as a checklist — after converting, explicitly check whether a further operation is still required."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student answers 1/2, from an incorrect decimal-to-fraction conversion.",
        rootCause: "Wrong Conversion — doesn't correctly convert 0.625 (=625/1000=5/8), landing on an unrelated fraction instead.",
        remediation: "Write 0.625 as 625/1000 explicitly, then find the HCF (125) and simplify to 5/8 before doing anything else."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student answers 7/8, an addition error.",
        rootCause: "Numerator Miscount — adds the numerators incorrectly (5+1 should be 6, not 7) or misapplies the simplification.",
        remediation: "Add like fractions by adding only the numerators (5+1=6) while keeping the denominator (8) the same, then simplify the result."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the decimal", hint: "0.625 = 625/1000. Simplify by dividing by the HCF (125)." },
      { level: 2, description: "Add the fractions", hint: "5/8 + 1/8 = 6/8 (add only the numerators, since the denominators match)." },
      { level: 3, description: "Simplify the sum", hint: "Reduce 6/8 to lowest terms." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "4.25 + 3.8 - 2.05 = ?",
    options: [
        { text: "6", correct: true, feedback: "4.25 + 3.80 = 8.05; 8.05 - 2.05 = 6.00 = 6." },
        { text: "5.00", correct: false, feedback: "Mis-subtraction.", misconceptionId: "E-d5-a" },
        { text: "7.00", correct: false, feedback: "Added everything.", misconceptionId: "E-d5-b" },
        { text: "5.45", correct: false, feedback: "Incorrect decimal alignment.", misconceptionId: "E-d5-c" }
      ],
    backward: "Align decimals and perform operations in order.",
    forward: "Mixed operations with decimals are used in budgeting.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 5.00, an error in the subtraction step.",
        rootCause: "Column Subtraction Slip — makes an error in 8.05-2.05, landing one whole too low.",
        remediation: "Verify the subtraction independently: 8.05-2.05, column by column."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 7.00, adding all three numbers instead of subtracting the last.",
        rootCause: "Wrong Operation — misreads the minus sign, treating the expression as a pure addition.",
        remediation: "Underline the + and - symbols before starting, and follow the exact sequence of operations shown."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 5.45, from misaligned decimal columns.",
        rootCause: "Misaligned Columns — combines digits from mismatched decimal places, since 3.8 has one decimal digit while the others have two.",
        remediation: "Pad 3.8 to 3.80 before combining, so every number has the same number of decimal places."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align and add first", hint: "4.25 + 3.80 = ?" },
      { level: 2, description: "Then subtract", hint: "Take that result and subtract 2.05." },
      { level: 3, description: "Verify", hint: "Does your final answer make sense given the starting values?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-03",
    question: "A number multiplied by 100 gives 45.6. What is the number?",
    options: [
        { text: "0.456", correct: true, feedback: "45.6 ÷ 100 = 0.456 (move decimal two places left)." },
        { text: "4.56", correct: false, feedback: "That's 45.6 ÷ 10.", misconceptionId: "E-d6-a" },
        { text: "4560", correct: false, feedback: "That's 45.6 × 100.", misconceptionId: "E-d6-b" },
        { text: "0.0456", correct: false, feedback: "You moved the decimal too far.", misconceptionId: "E-d6-c" }
      ],
    backward: "Divide 45.6 by 100 (move decimal two places left).",
    forward: "Inverse operations with powers of ten are important for unit conversion.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 4.56, shifting only one place instead of two.",
        rootCause: "Shift-Count Undercount — recognises the inverse (division) is needed but only shifts one place, matching ÷10 not ÷100.",
        remediation: "Since the ORIGINAL operation was ×100 (two zeros), the inverse must shift the SAME number of places, just in the opposite direction."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 4560, multiplying instead of finding the inverse.",
        rootCause: "Wrong Operation — multiplies by 100 again instead of dividing to undo the original multiplication.",
        remediation: "To find the original number, UNDO the ×100 by doing the opposite operation: ÷100."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 0.0456, shifting three places instead of two.",
        rootCause: "Shift-Count Overreach — shifts one place too many.",
        remediation: "Match the shift count to the zeros in 100 (two), not three."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the inverse operation", hint: "If a number ×100 gives 45.6, then the number itself = 45.6 ÷ 100." },
      { level: 2, description: "Count the shift", hint: "100 has two zeros, so shift the decimal point two places." },
      { level: 3, description: "Apply it", hint: "Dividing makes the number smaller, so shift LEFT: 45.6 → 4.56 → 0.456." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-04",
    question: "In 0.039, what is the value of the digit 9? Write it as a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{9}{1000}\\)", correct: true, feedback: "9 is in the thousandths place → value = 9/1000 (already simplest)." },
        { text: "\\(\\frac{9}{10}\\)", correct: false, feedback: "That would be tenths.", misconceptionId: "E-d7-a" },
        { text: "\\(\\frac{9}{100}\\)", correct: false, feedback: "That would be hundredths.", misconceptionId: "E-d7-b" },
        { text: "\\(\\frac{3}{1000}\\)", correct: false, feedback: "The digit is 9, not 3.", misconceptionId: "E-d7-c" }
      ],
    backward: "Identify the place value, then write as a fraction.",
    forward: "Understanding digit values helps in precise calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student answers 9/10, treating 9 as the tenths digit.",
        rootCause: "Wrong Column Selected — picks the first digit after the decimal instead of counting to the third, where 9 actually sits.",
        remediation: "Count columns explicitly: 1st(tenths)=0, 2nd(hundredths)=3, 3rd(thousandths)=9."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student answers 9/100, treating 9 as the hundredths digit.",
        rootCause: "Adjacent-Column Slip — lands one column too early.",
        remediation: "Recount from the decimal point one column at a time before naming the digit's place."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student answers 3/1000, naming the wrong digit.",
        rootCause: "Wrong Digit Selected — reports the value of the 3 (hundredths digit) instead of the 9 (thousandths digit) that the question asked about.",
        remediation: "Reread the question to confirm which digit is being asked about (9, not 3) before assigning a place value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the digit 9", hint: "In 0.039, the 9 is the third digit after the decimal point." },
      { level: 2, description: "Name its place", hint: "The third digit after the decimal is the thousandths place." },
      { level: 3, description: "Write its value as a fraction", hint: "A digit in the thousandths place has value (digit)/1000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Arrange in descending order: 2.4, 2.35, 2.345, 2.45",
    options: [
        { text: "2.45, 2.4, 2.35, 2.345", correct: true, feedback: "Align with three places: 2.450, 2.400, 2.350, 2.345. Descending: 2.45, 2.4, 2.35, 2.345." },
        { text: "2.45, 2.345, 2.35, 2.4", correct: false, feedback: "2.35 > 2.345.", misconceptionId: "E-d8-a" },
        { text: "2.4, 2.45, 2.35, 2.345", correct: false, feedback: "2.45 > 2.4.", misconceptionId: "E-d8-b" },
        { text: "2.345, 2.35, 2.4, 2.45", correct: false, feedback: "That's ascending.", misconceptionId: "E-d8-c" }
      ],
    backward: "Align decimals with three places.",
    forward: "Ordering decimals is key in ranking.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student swaps the last two values, placing 2.345 before 2.35.",
        rootCause: "More-Digits-Means-Bigger — assumes 2.345 (three decimal digits) is larger than 2.35 (two decimal digits).",
        remediation: "Align both to three decimal places (2.350 vs 2.345) and compare the thousandths digit directly: 0 vs 5 — 2.350 is larger."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student swaps the first two values, placing 2.4 before 2.45.",
        rootCause: "Incomplete Comparison — doesn't fully compare 2.4 and 2.45 after aligning; 2.450 > 2.400 since the hundredths digit (5 vs 0) differs.",
        remediation: "Align to the same decimal places and compare every digit position, not just the first."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student writes the numbers smallest to largest instead of largest to smallest.",
        rootCause: "Direction Reversal — correctly sorts the values but in the wrong direction.",
        remediation: "Anchor the vocabulary: descending = largest first."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to three decimal places", hint: "2.450, 2.400, 2.350, 2.345." },
      { level: 2, description: "Compare systematically", hint: "Compare tenths first, then hundredths, then thousandths as needed to break ties." },
      { level: 3, description: "Sort fully descending", hint: "Order all four from largest to smallest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-05",
    question: "Round 6.095 to the nearest hundredth, then multiply the result by 100.",
    options: [
        { text: "610", correct: true, feedback: "6.095 → hundredth 9, thousandths 5 → round up to 6.10. 6.10 × 100 = 610." },
        { text: "609.5", correct: false, feedback: "You multiplied before rounding.", misconceptionId: "E-d9-a" },
        { text: "60.95", correct: false, feedback: "You multiplied by 10 instead of 100.", misconceptionId: "E-d9-b" },
        { text: "6.10", correct: false, feedback: "You only rounded, forgot to multiply.", misconceptionId: "E-d9-c" }
      ],
    backward: "First round, then multiply by 100.",
    forward: "Combining rounding with power-of-ten operations is common.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 609.5, multiplying the original number instead of the rounded one.",
        rootCause: "Wrong Order of Operations — multiplies 6.095 by 100 first, then treats the result as already answering the question, skipping the required rounding step entirely.",
        remediation: "Follow the exact order stated in the question: round FIRST, then multiply the ROUNDED result — not the original number."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 60.95, shifting only one place instead of two.",
        rootCause: "Shift-Count Undercount — applies a ×10 shift to a ×100 problem.",
        remediation: "Count the zeros in 100 (two) and match that to the number of shifts."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 6.10, correctly rounding but forgetting the multiplication.",
        rootCause: "Missing Final Step — completes the rounding but stops before the required ×100 step.",
        remediation: "Treat multi-step questions as a checklist — after rounding, check whether a further operation is still required."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round first", hint: "Round 6.095 to the nearest hundredth: check the thousandths digit (5)." },
      { level: 2, description: "Confirm the rounded value", hint: "Since 5≥5, round up: 6.095 → 6.10." },
      { level: 3, description: "Then multiply", hint: "6.10 × 100 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert 0.35 to a fraction in simplest form, then add \\(\\frac{1}{4}\\).",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "0.35 = 35/100 = 7/20. 1/4 = 5/20; sum = 12/20 = 3/5." },
        { text: "\\(\\frac{7}{20}\\)", correct: false, feedback: "You forgot to add 1/4.", misconceptionId: "E-d10-a" },
        { text: "\\(\\frac{9}{20}\\)", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d10-b" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-c" }
      ],
    backward: "Convert decimal to fraction, simplify, then add with common denominator.",
    forward: "This bridges decimals and fraction addition.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student answers 7/20, correctly converting but forgetting the addition.",
        rootCause: "Missing Final Step — correctly converts 0.35 to 7/20 but stops before adding 1/4.",
        remediation: "Treat multi-step questions as a checklist — check for a remaining operation after each step."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student answers 9/20, an addition error.",
        rootCause: "Common-Denominator Error — doesn't correctly convert 1/4 to twentieths (5/20) before adding, or adds the numerators incorrectly.",
        remediation: "Convert 1/4 to an equivalent fraction with denominator 20 first (1/4=5/20), then add numerators: 7+5=12, not a different value."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student answers 1/2, an unrelated result.",
        rootCause: "Wrong Conversion or Wrong Addition — likely errs in converting 0.35 to a fraction, or in finding the common denominator with 1/4.",
        remediation: "Work through each step explicitly: 0.35=35/100=7/20 (simplify by 5), then find a common denominator with 1/4 before adding."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the decimal", hint: "0.35 = 35/100. Simplify by dividing by the HCF (5)." },
      { level: 2, description: "Find a common denominator", hint: "7/20 and 1/4 — convert 1/4 to twentieths: 1/4 = 5/20." },
      { level: 3, description: "Add and simplify", hint: "7/20 + 5/20 = 12/20. Simplify to lowest terms." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-03",
    question: "12.3 - 4.56 + 1.2 = ?",
    options: [
        { text: "8.94", correct: true, feedback: "12.30 - 4.56 = 7.74; + 1.20 = 8.94." },
        { text: "9.06", correct: false, feedback: "Subtraction error.", misconceptionId: "E-d11-a" },
        { text: "8.04", correct: false, feedback: "Off by 0.9.", misconceptionId: "E-d11-b" },
        { text: "7.94", correct: false, feedback: "Incorrect decimal alignment.", misconceptionId: "E-d11-c" }
      ],
    backward: "Align decimals, perform operations left to right.",
    forward: "Mixed addition/subtraction is used in reconciling accounts.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student answers 9.06, an error in the borrow-across-zero subtraction.",
        rootCause: "Borrow-Across-Zero Error — 12.30-4.56 requires borrowing through the hundredths place (0-6), and mishandling this borrow shifts the result.",
        remediation: "Verify the first step independently: does 7.74+4.56 give back 12.30?"
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student answers 8.04, off by 0.9 from the correct answer.",
        rootCause: "Second-Step Slip — the first subtraction is likely correct, but the subsequent addition of 1.2 goes wrong.",
        remediation: "Verify the second step: take the confirmed result of the first subtraction and add 1.20 carefully."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student answers 7.94, forgetting to add the final 1.2.",
        rootCause: "Missing Final Step — completes the subtraction correctly but drops the '+1.2' entirely.",
        remediation: "Confirm all three numbers and both operations are used — check off each part of the expression as you use it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract first", hint: "12.30 - 4.56 = ? (Borrow across the zero as needed.)" },
      { level: 2, description: "Verify the subtraction", hint: "Check: does your result plus 4.56 give back 12.30?" },
      { level: 3, description: "Add the last term", hint: "Take your subtraction result and add 1.20." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-05",
    question: "0.05 × ? = 50",
    options: [
        { text: "1000", correct: true, feedback: "50 ÷ 0.05 = 1000." },
        { text: "100", correct: false, feedback: "0.05 × 100 = 5.", misconceptionId: "E-d12-a" },
        { text: "10", correct: false, feedback: "0.05 × 10 = 0.5.", misconceptionId: "E-d12-b" },
        { text: "10000", correct: false, feedback: "0.05 × 10000 = 500.", misconceptionId: "E-d12-c" }
      ],
    backward: "Divide 50 by 0.05.",
    forward: "Inverse operations with powers of ten.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 100, far too small a multiplier.",
        rootCause: "Shift-Count Undercount — significantly underestimates how much 0.05 must grow to reach 50 (a 1000-fold increase, not 100-fold).",
        remediation: "Verify by multiplying back: 0.05×100=5, far short of 50 — try a larger multiplier."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 10, far too small.",
        rootCause: "Shift-Count Undercount — a larger underestimate of the required multiplier.",
        remediation: "Compare magnitudes: 0.05 must grow a thousand-fold to reach 50."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 10000, too large.",
        rootCause: "Shift-Count Overreach — overestimates the required multiplier.",
        remediation: "Verify by multiplying back: 0.05×10000=500, ten times too large."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the inverse operation", hint: "The missing multiplier equals 50 ÷ 0.05." },
      { level: 2, description: "Compute the division", hint: "50 ÷ 0.05 = 50 × 20 = ? (dividing by 0.05 is the same as multiplying by 20)." },
      { level: 3, description: "Verify", hint: "Check: does 0.05 × your answer equal 50?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "Write the expanded form of 0.087.",
    options: [
        { text: "\\(\\frac{8}{100} + \\frac{7}{1000}\\)", correct: true, feedback: "0.087 = 0 tenths + 8 hundredths + 7 thousandths." },
        { text: "\\(\\frac{8}{10} + \\frac{7}{100}\\)", correct: false, feedback: "That's 0.87, not 0.087.", misconceptionId: "E-d13-a" },
        { text: "\\(\\frac{8}{10} + \\frac{7}{1000}\\)", correct: false, feedback: "That's 0.807.", misconceptionId: "E-d13-b" },
        { text: "\\(0.8 + 0.07\\)", correct: false, feedback: "That's 0.87.", misconceptionId: "E-d13-c" }
      ],
    backward: "0.087 = 0 tenths + 8 hundredths + 7 thousandths.",
    forward: "Expanded form helps understand decimal place values.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student writes 8/10+7/100, shifting both digits one column left.",
        rootCause: "Zero-Placeholder Skipped — ignores the leading 0 in the tenths place, sliding both remaining digits one column left.",
        remediation: "Read the digits in order: 0.087 has 0 in tenths, 8 in hundredths, 7 in thousandths — the leading zero placeholder can't be skipped."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student writes 8/10+7/1000, shifting only the 8 left while leaving 7 correct.",
        rootCause: "Partial Column Shift — shifts the hundredths digit into tenths but leaves the thousandths digit correctly placed, an inconsistent error.",
        remediation: "Verify each digit's place independently by counting from the decimal point, rather than shifting some digits and not others."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student writes 0.8+0.07, the same shift error expressed in decimal form.",
        rootCause: "Zero-Placeholder Skipped — same underlying error as the first distractor, written as decimals instead of fractions.",
        remediation: "Write out all three decimal columns explicitly (tenths=0, hundredths=8, thousandths=7) before forming the expanded form."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each digit's place", hint: "0.087: 0=tenths, 8=hundredths, 7=thousandths." },
      { level: 2, description: "Note the placeholder zero", hint: "The tenths digit is 0, contributing nothing, so it's skipped in the expanded form." },
      { level: 3, description: "Write the expanded form", hint: "8/100 (hundredths) + 7/1000 (thousandths)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-03",
    question: "Which number is exactly halfway between 2.4 and 2.5?",
    options: [
        { text: "2.45", correct: true, feedback: "(2.4 + 2.5)/2 = 4.9/2 = 2.45." },
        { text: "2.44", correct: false, feedback: "Slightly less.", misconceptionId: "E-d14-a" },
        { text: "2.46", correct: false, feedback: "Slightly more.", misconceptionId: "E-d14-b" },
        { text: "2.455", correct: false, feedback: "Not the exact midpoint.", misconceptionId: "E-d14-c" }
      ],
    backward: "Find the average.",
    forward: "Midpoint problems are common in statistics.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 2.44, an estimate slightly below the true midpoint.",
        rootCause: "Estimated Rather Than Computed — guesses a value close to halfway instead of actually computing the average (2.4+2.5)/2.",
        remediation: "Compute the exact midpoint using the formula (a+b)/2 rather than estimating visually."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 2.46, an estimate slightly above the true midpoint.",
        rootCause: "Estimated Rather Than Computed — similarly guesses instead of computing exactly.",
        remediation: "Add the two endpoints (2.4+2.5=4.9) and divide by 2 to get the exact midpoint, rather than eyeballing it."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 2.455, an arithmetic slip in the division step.",
        rootCause: "Division Slip — correctly sets up (2.4+2.5)/2 but makes an error dividing 4.9 by 2.",
        remediation: "Recompute 4.9÷2 carefully: 4.9÷2=2.45, not 2.455."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add the two endpoints", hint: "2.4 + 2.5 = ?" },
      { level: 2, description: "Divide by 2", hint: "The sum divided by 2 gives the midpoint." },
      { level: 3, description: "Compute", hint: "4.9 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "A number rounded to the nearest tenth is 3.6. The number has three decimal places, and its hundredths digit is 8. What is the smallest possible number?",
    options: [
        { text: "3.580", correct: true, feedback: "Range: 3.55 to 3.64. Hundredths=8 → 3.58x or 3.59x. Smallest is 3.580 (rounds to 3.6)." },
        { text: "3.581", correct: false, feedback: "Larger than 3.580.", misconceptionId: "E-d15-a" },
        { text: "3.589", correct: false, feedback: "Larger.", misconceptionId: "E-d15-b" },
        { text: "3.570", correct: false, feedback: "Hundredths 7, not 8.", misconceptionId: "E-d15-c" }
      ],
    backward: "Find the rounding range, then apply the digit constraint.",
    forward: "Reverse rounding with constraints is a challenging puzzle.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 3.581, a valid candidate but not the smallest.",
        rootCause: "Non-Minimal Candidate — finds a number satisfying both conditions (rounds to 3.6, hundredths=8) but doesn't check for a smaller valid thousandths digit.",
        remediation: "Among valid candidates 3.580 through 3.589, systematically try the smallest thousandths digit (0) first."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 3.589, the largest valid candidate instead of the smallest.",
        rootCause: "Direction Confusion — finds a valid candidate but selects from the wrong end of the range.",
        remediation: "Reread the question to confirm 'smallest' is asked, then pick the smallest thousandths digit among valid candidates."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 3.570, with the wrong hundredths digit.",
        rootCause: "Constraint Neglect — picks a number satisfying the rounding condition but ignores the stated hundredths-digit-8 requirement.",
        remediation: "Check every stated condition explicitly — a candidate must round to 3.6 AND have hundredths digit exactly 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the rounding range", hint: "Numbers from 3.55 up to (but not including) 3.65 round to 3.6 at the nearest tenth." },
      { level: 2, description: "Apply the hundredths condition", hint: "Within that range, which numbers have 8 as their hundredths digit? (3.58x)" },
      { level: 3, description: "Minimize the thousandths digit", hint: "Among 3.580-3.589, which is smallest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-06",
    question: "Convert \\(\\frac{1}{8}\\) to a decimal, then round to the nearest hundredth.",
    options: [
        { text: "0.13", correct: true, feedback: "1/8 = 0.125. Thousandths 5 → round up hundredths to 0.13." },
        { text: "0.12", correct: false, feedback: "You truncated; thousandths 5 means round up.", misconceptionId: "E-d16-a" },
        { text: "0.125", correct: false, feedback: "Not rounded.", misconceptionId: "E-d16-b" },
        { text: "0.1", correct: false, feedback: "That's to the nearest tenth.", misconceptionId: "E-d16-c" }
      ],
    backward: "First divide 1 by 8, then round to hundredths.",
    forward: "Combining conversion and rounding is used in measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student answers 0.12, truncating without checking the thousandths digit.",
        rootCause: "Truncation Instead of Rounding — drops the thousandths digit (5) without checking it calls for rounding up.",
        remediation: "Check the deciding digit before dropping — thousandths=5≥5 means round up."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student answers 0.125, correctly converting but forgetting to round.",
        rootCause: "Missing Final Step — completes the fraction-to-decimal conversion but skips the requested rounding.",
        remediation: "Treat the question as two steps: convert, THEN round — check both are done."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student answers 0.1, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest tenth instead of hundredth.",
        remediation: "Confirm the target place: 'nearest hundredth' means two digits remain after the decimal point."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "1 ÷ 8 = ?" },
      { level: 2, description: "Identify the deciding digit", hint: "Rounding 0.125 to the nearest hundredth means checking the thousandths digit (5)." },
      { level: 3, description: "Round", hint: "Since 5≥5, round the hundredths digit up from 2 to 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "3.6 + 2.75 - 1.9 = ?",
    options: [
        { text: "4.45", correct: true, feedback: "3.60 + 2.75 = 6.35; 6.35 - 1.90 = 4.45." },
        { text: "4.55", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-d17-a" },
        { text: "5.45", correct: false, feedback: "Added 1.9 instead of subtracting.", misconceptionId: "E-d17-b" },
        { text: "4.35", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d17-c" }
      ],
    backward: "Line up decimals, add, then subtract.",
    forward: "Sequential operations appear in shopping lists.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 4.55, off by 0.1 from the correct answer.",
        rootCause: "Column Subtraction Slip — a small error in the final subtraction step.",
        remediation: "Verify the subtraction independently: 6.35-1.90, column by column."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 5.45, adding 1.9 instead of subtracting.",
        rootCause: "Wrong Operation — misreads the minus sign as plus.",
        remediation: "Underline each operation symbol before starting and follow the exact sequence given."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 4.35, another subtraction error.",
        rootCause: "Column Subtraction Slip — a different arithmetic error in the final step.",
        remediation: "Verify by adding back: does 4.45+1.90 give 6.35?"
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add first", hint: "3.60 + 2.75 = ?" },
      { level: 2, description: "Then subtract", hint: "Take that result and subtract 1.90." },
      { level: 3, description: "Verify", hint: "Check each column of the final subtraction." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "72.4 ÷ 100 = ? Then multiply the result by 10.",
    options: [
        { text: "7.24", correct: true, feedback: "72.4 ÷ 100 = 0.724. 0.724 × 10 = 7.24." },
        { text: "0.724", correct: false, feedback: "You only did the division.", misconceptionId: "E-d18-a" },
        { text: "72.4", correct: false, feedback: "No operation.", misconceptionId: "E-d18-b" },
        { text: "724", correct: false, feedback: "Multiplied instead of divided.", misconceptionId: "E-d18-c" }
      ],
    backward: "First divide (move decimal left two), then multiply (move right one). Net effect: ÷10.",
    forward: "Combined power-of-ten shifts model unit conversions.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 0.724, correctly dividing but forgetting the multiplication.",
        rootCause: "Missing Final Step — completes the division correctly but stops before the required ×10 step.",
        remediation: "Treat multi-step questions as a checklist — after the division, check whether a further operation is still required."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 72.4, performing no operations at all.",
        rootCause: "No Operations Applied — restates the original number without dividing or multiplying.",
        remediation: "Work through each stated step explicitly: first ÷100, then ×10 — verify the value actually changes at each step."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 724, multiplying by 10 without first dividing by 100.",
        rootCause: "Skipped First Step — jumps directly to the second operation, ignoring the required division first.",
        remediation: "Perform the operations in the exact order given: divide by 100 FIRST, then multiply that result by 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide first", hint: "72.4 ÷ 100: shift the decimal point two places left." },
      { level: 2, description: "Confirm the division", hint: "72.4 ÷ 100 = 0.724." },
      { level: 3, description: "Then multiply", hint: "0.724 × 10: shift the decimal point one place right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "In 123.456, the digit 4 is in which place? What is its value as a decimal?",
    options: [
        { text: "Tenths, 0.4", correct: true, feedback: "4 is the first digit after the decimal → tenths → value 0.4." },
        { text: "Hundredths, 0.04", correct: false, feedback: "4 is tenths, not hundredths.", misconceptionId: "E-d19-a" },
        { text: "Thousandths, 0.004", correct: false, feedback: "4 is tenths.", misconceptionId: "E-d19-b" },
        { text: "Ones, 4", correct: false, feedback: "4 is after the decimal point.", misconceptionId: "E-d19-c" }
      ],
    backward: "Count places from the decimal point: 4 is the first digit → tenths.",
    forward: "Quick identification of place value is essential for mental arithmetic.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student answers hundredths, 0.04, one column too far right.",
        rootCause: "Adjacent-Column Slip — lands one column too late, on hundredths instead of tenths.",
        remediation: "The FIRST digit after the decimal point is always tenths — count from the decimal point directly."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student answers thousandths, 0.004, two columns too far right.",
        rootCause: "Adjacent-Column Slip — a larger miscount, landing on the third decimal column.",
        remediation: "Count one column at a time from the decimal point: 1st=tenths, not further."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student answers ones, 4, treating it as a whole-number digit.",
        rootCause: "Wrong Side of Decimal — confuses this decimal digit 4 with the whole-number digits in 123 (which happens to also contain the number 3 but no 4).",
        remediation: "Confirm which side of the decimal point the target digit sits on before naming any place value — this 4 is clearly after the point."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the decimal point", hint: "Locate the decimal point in 123.456." },
      { level: 2, description: "Identify the first digit after it", hint: "The digit immediately after the decimal point is 4." },
      { level: 3, description: "Name the place and value", hint: "The first digit after the decimal point is tenths — a value of 4 tenths is written 0.4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Which list is in ascending order? A) 5.6, 5.56, 5.066; B) 5.066, 5.56, 5.6; C) 5.6, 5.066, 5.56; D) 5.56, 5.066, 5.6",
    options: [
        { text: "B", correct: true, feedback: "5.066 < 5.56 < 5.6." },
        { text: "A", correct: false, feedback: "Descending.", misconceptionId: "E-d20-a" },
        { text: "C", correct: false, feedback: "Not ordered.", misconceptionId: "E-d20-b" },
        { text: "D", correct: false, feedback: "Not ordered.", misconceptionId: "E-d20-c" }
      ],
    backward: "Add zeros and compare.",
    forward: "Ordering decimals is a frequent test skill.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student picks list A, which is actually descending (the opposite direction).",
        rootCause: "Direction Confusion — correctly notices the list is monotonically sorted but confuses ascending with descending.",
        remediation: "Anchor the vocabulary: ascending = climbing upward = smallest first — check whether the FIRST value is actually the smallest."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student picks list C, a mixed (non-monotonic) order.",
        rootCause: "Incomplete Pairwise Check — checks only part of the sequence; C goes 5.6→5.066 (decrease) then 5.066→5.56 (increase), not consistently ascending.",
        remediation: "Check every consecutive pair in the list — a list is only ascending if every single step increases."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student picks list D, another mixed order.",
        rootCause: "Incomplete Pairwise Check — similarly, D goes 5.56→5.066 (decrease) then 5.066→5.6 (increase).",
        remediation: "Align all values to three decimal places (5.560, 5.066, 5.600) and verify the entire sequence increases at every step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all values", hint: "Write with three decimal places: 5.600, 5.560, 5.066." },
      { level: 2, description: "Check every consecutive pair", hint: "For a list to be ascending, EVERY step must increase — check all pairs, not just the first." },
      { level: 3, description: "Confirm the fully ascending list", hint: "Which list has every single step going from smaller to larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-05",
    question: "Round 0.897 to the nearest tenth, then add 2.5.",
    options: [
        { text: "3.4", correct: true, feedback: "0.897 → tenth 8, hundredths 9≥5 → round up to 0.9. 0.9 + 2.5 = 3.4." },
        { text: "3.397", correct: false, feedback: "You used the original number instead of rounding.", misconceptionId: "E-d21-a" },
        { text: "3.5", correct: false, feedback: "You rounded to nearest whole number.", misconceptionId: "E-d21-b" },
        { text: "2.8", correct: false, feedback: "You only rounded.", misconceptionId: "E-d21-c" }
      ],
    backward: "First round, then add.",
    forward: "Combining rounding with addition.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 3.397, adding the original unrounded number instead of the rounded one.",
        rootCause: "Skipped Rounding Step — adds 0.897 directly to 2.5 without ever rounding it first, missing the required first step.",
        remediation: "Round FIRST, then use the ROUNDED value (0.9) for the addition — never the original number."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers 3.5, rounding to the wrong place before adding.",
        rootCause: "Wrong Target Place — rounds 0.897 to the nearest whole number (1) instead of the nearest tenth (0.9).",
        remediation: "Confirm the target place before rounding: 'nearest tenth' means one digit remains after the decimal point."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 2.8, correctly rounding but with an addition error.",
        rootCause: "Second-Step Slip — the rounding is likely correct, but the addition of 2.5 goes wrong.",
        remediation: "Verify the addition step independently: 0.9 + 2.5 = ?"
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round first", hint: "Round 0.897 to the nearest tenth: check the hundredths digit (9)." },
      { level: 2, description: "Confirm the rounded value", hint: "Since 9≥5, round up: 0.897 → 0.9." },
      { level: 3, description: "Add the second value", hint: "0.9 + 2.5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-06",
    question: "Convert \\(\\frac{2}{5}\\) to a decimal, then multiply by 3.",
    options: [
        { text: "1.2", correct: true, feedback: "2/5 = 0.4; 0.4 × 3 = 1.2." },
        { text: "0.8", correct: false, feedback: "That's 0.4 × 2.", misconceptionId: "E-d22-a" },
        { text: "6.0", correct: false, feedback: "2/5 × 3 = 6/5 = 1.2, not 6.0.", misconceptionId: "E-d22-b" },
        { text: "2.4", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-c" }
      ],
    backward: "First convert, then multiply.",
    forward: "Fractions to decimals then operations are common in scaling.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student answers 0.8, multiplying by 2 instead of 3.",
        rootCause: "Wrong Multiplier — uses 2 instead of the stated multiplier 3, perhaps confusing it with the fraction's denominator (5) minus something, or a simple misread.",
        remediation: "Reread the question to confirm the multiplier is 3, then compute 0.4×3 explicitly."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student answers 6.0, likely multiplying the wrong values together.",
        rootCause: "Wrong Values Multiplied — combines the original fraction's numerator/denominator with the multiplier in an incorrect way rather than multiplying the converted decimal (0.4) by 3.",
        remediation: "Complete the conversion FIRST (2/5=0.4), then multiply that decimal value by 3 — don't operate on the original fraction parts."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student answers 2.4, an arithmetic slip.",
        rootCause: "Multiplication Slip — makes an error computing 0.4×3.",
        remediation: "Recompute 0.4×3 step by step: 4×3=12, so 0.4×3=1.2, not 2.4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "2 ÷ 5 = ?" },
      { level: 2, description: "Multiply by 3", hint: "0.4 × 3 = ?" },
      { level: 3, description: "Verify", hint: "Check: 4×3=12, so 0.4×3 should be 1.2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4"]
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "5.75 + 2.3 - 3.125 = ?",
    options: [
        { text: "4.925", correct: true, feedback: "5.750 + 2.300 = 8.050; 8.050 - 3.125 = 4.925." },
        { text: "4.875", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d23-a" },
        { text: "5.925", correct: false, feedback: "Added 3.125 instead of subtracting.", misconceptionId: "E-d23-b" },
        { text: "4.9", correct: false, feedback: "Estimate only.", misconceptionId: "E-d23-c" }
      ],
    backward: "Align to thousandths and perform operations.",
    forward: "Precision in decimal arithmetic matters in science.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 4.875, an error in the subtraction step.",
        rootCause: "Column Subtraction Slip — makes an error in 8.050-3.125, likely mishandling a borrow.",
        remediation: "Verify the subtraction independently, aligning all three decimal places and borrowing carefully."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 5.925, adding 3.125 instead of subtracting.",
        rootCause: "Wrong Operation — misreads the minus sign, adding all three numbers.",
        remediation: "Underline each operation symbol before starting and follow the exact sequence given."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 4.9, a rounded estimate rather than the exact value.",
        rootCause: "Premature Rounding — estimates using rounded values instead of computing the exact result.",
        remediation: "Compute the exact column-by-column arithmetic to the thousandths place, rather than rounding first."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to three decimal places and add first", hint: "5.750 + 2.300 = ?" },
      { level: 2, description: "Then subtract", hint: "Take that result and subtract 3.125." },
      { level: 3, description: "Verify", hint: "Check each column, borrowing as needed." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-02",
    question: "What is 3.2 × 1000? Then subtract 120 from the result.",
    options: [
        { text: "3080", correct: true, feedback: "3.2 × 1000 = 3200; 3200 - 120 = 3080." },
        { text: "3200", correct: false, feedback: "You forgot to subtract 120.", misconceptionId: "E-d24-a" },
        { text: "320", correct: false, feedback: "That's ×100.", misconceptionId: "E-d24-b" },
        { text: "3000", correct: false, feedback: "Estimate only.", misconceptionId: "E-d24-c" }
      ],
    backward: "Multiply by 1000 (move decimal three places right), then subtract.",
    forward: "Multi-step problems with powers of ten appear in finance.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student answers 3200, correctly multiplying but forgetting the subtraction.",
        rootCause: "Missing Final Step — completes the multiplication but skips the required '-120' step.",
        remediation: "Treat multi-step questions as a checklist — after multiplying, check whether a further operation is still required."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student answers 320, shifting only two places instead of three.",
        rootCause: "Shift-Count Undercount — applies a ×100 shift to a ×1000 problem.",
        remediation: "Count the zeros in 1000 (three) and match that to the number of shifts."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student answers 3000, a rough estimate.",
        rootCause: "Premature Rounding — estimates rather than computing the exact multiplication and subtraction.",
        remediation: "Compute exactly: 3.2×1000=3200, then 3200-120, rather than rounding along the way."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply first", hint: "3.2 × 1000: shift the decimal point three places right." },
      { level: 2, description: "Confirm the product", hint: "3.2 × 1000 = 3200." },
      { level: 3, description: "Subtract", hint: "3200 - 120 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "Write the decimal for 7 + \\(\\frac{2}{100}\\) + \\(\\frac{5}{1000}\\).",
    options: [
        { text: "7.025", correct: true, feedback: "7 ones + 0 tenths + 2 hundredths + 5 thousandths = 7.025." },
        { text: "7.25", correct: false, feedback: "You misplaced the decimal.", misconceptionId: "E-r1-a" },
        { text: "7.205", correct: false, feedback: "You placed 5 in hundredths.", misconceptionId: "E-r1-b" },
        { text: "7.052", correct: false, feedback: "Swapped hundredths and thousandths.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers 7.25, ignoring the missing tenths placeholder.",
        rootCause: "Zero-Placeholder Skipped — since no tenths term is given, slides the hundredths digit left into the tenths column.",
        remediation: "Write out all three decimal columns explicitly, inserting a 0 for tenths since no tenths term was given."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers 7.205, placing 5 in hundredths instead of thousandths.",
        rootCause: "Column Shift Error — misplaces the thousandths digit one column too early.",
        remediation: "Match each fraction to its named place directly: 2/100 is hundredths (2nd column), 5/1000 is thousandths (3rd column)."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers 7.052, swapping the hundredths and thousandths digits.",
        rootCause: "Digit Order Reversal — reverses the order of the two given fractional parts.",
        remediation: "Don't reorder the given parts — 2/100 goes in the hundredths (2nd) column, 5/1000 in the thousandths (3rd) column, in that order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each named place", hint: "2/100 is hundredths. 5/1000 is thousandths. What about tenths?" },
      { level: 2, description: "Fill in the missing placeholder", hint: "Since no tenths term is given, that column is 0." },
      { level: 3, description: "Assemble the decimal", hint: "7 . (tenths=0)(hundredths=2)(thousandths=5)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Which is smallest? 0.65, 0.6, 0.605, 0.56",
    options: [
        { text: "0.56", correct: true, feedback: "0.56 = 0.560, compared to 0.600, 0.605, 0.650." },
        { text: "0.6", correct: false, feedback: "0.6 = 0.600 > 0.560.", misconceptionId: "E-r2-a" },
        { text: "0.605", correct: false, feedback: "0.605 > 0.560.", misconceptionId: "E-r2-b" },
        { text: "0.65", correct: false, feedback: "0.65 is the largest.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student picks 0.6, close to but not the smallest.",
        rootCause: "Partial Comparison — compares 0.6 against some options but not all four together.",
        remediation: "Align ALL FOUR numbers to three decimal places (0.650, 0.600, 0.605, 0.560) and compare them as one group."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student picks 0.605, confusing it with a smaller-looking option.",
        rootCause: "More-Digits-Means-Bigger (Inverted) — assumes 0.605 (three decimal digits, ending near 5) is small, without properly comparing hundredths digits.",
        remediation: "Align and compare hundredths digits directly: 0.605 has hundredths digit 0, while 0.560 has hundredths digit 6 — comparing tenths first (6 vs 5) shows 0.560 is smaller."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student picks 0.65, actually the largest value.",
        rootCause: "Direction Confusion — correctly aligns and compares but selects the largest instead of the smallest.",
        remediation: "Reread the question to confirm the direction (smallest) before selecting."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four numbers", hint: "Write with three decimal places: 0.650, 0.600, 0.605, 0.560." },
      { level: 2, description: "Compare tenths digits first", hint: "Tenths: 6, 6, 6, 5. Which is smallest?" },
      { level: 3, description: "Confirm", hint: "Only one number has tenths digit 5 — is it the smallest overall?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-05",
    question: "Round 8.456 to the nearest tenth and nearest hundredth. Find the difference of the two rounded values.",
    options: [
        { text: "0.04", correct: true, feedback: "Nearest tenth: 8.5. Nearest hundredth: 8.46. Difference = 8.5 - 8.46 = 0.04." },
        { text: "0.1", correct: false, feedback: "Incorrect difference.", misconceptionId: "E-r3-a" },
        { text: "0.0", correct: false, feedback: "The two rounded values are not equal.", misconceptionId: "E-r3-b" },
        { text: "0.14", correct: false, feedback: "Incorrect difference.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 0.1, an error in computing the two roundings or their difference.",
        rootCause: "Multi-Step Arithmetic Slip — makes an error somewhere across the two roundings and the final subtraction.",
        remediation: "Compute and verify each rounding separately (nearest tenth, nearest hundredth), then subtract the two verified values."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 0.0, assuming the two rounded values are equal.",
        rootCause: "Assumed Equal Roundings — doesn't recognise that rounding to different places on the same number usually gives different results.",
        remediation: "Compute both roundings explicitly and compare: nearest tenth (8.5) and nearest hundredth (8.46) are different values."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 0.14, an arithmetic error in the final subtraction.",
        rootCause: "Column Subtraction Slip — makes an error subtracting 8.46 from 8.5.",
        remediation: "Align the two rounded values (8.50 and 8.46) and subtract column by column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest tenth", hint: "Check the hundredths digit (5) — round up." },
      { level: 2, description: "Round to the nearest hundredth", hint: "Check the thousandths digit (6) — round up." },
      { level: 3, description: "Find the difference", hint: "8.5 - 8.46 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-05",
    question: "Convert 0.45 to a fraction in simplest form, then subtract \\(\\frac{1}{5}\\).",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "0.45 = 9/20. 1/5 = 4/20. 9/20 - 4/20 = 5/20 = 1/4." },
        { text: "\\(\\frac{9}{20}\\)", correct: false, feedback: "You forgot to subtract 1/5.", misconceptionId: "E-r4-a" },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "That's the fraction subtracted, not the answer.", misconceptionId: "E-r4-b" },
        { text: "\\(\\frac{7}{20}\\)", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student answers 9/20, correctly converting but forgetting the subtraction.",
        rootCause: "Missing Final Step — correctly converts 0.45 to 9/20 but stops before subtracting 1/5.",
        remediation: "Treat multi-step questions as a checklist — after converting, check for a remaining operation."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student answers 1/5, restating the fraction being subtracted instead of computing the result.",
        rootCause: "Given-Value Restatement — reports one of the given fractions instead of performing the subtraction.",
        remediation: "Underline what's asked (the RESULT of the subtraction) versus what's given (the fraction being subtracted)."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student answers 7/20, a subtraction error.",
        rootCause: "Common-Denominator Error — doesn't correctly convert 1/5 to twentieths (4/20) before subtracting, or subtracts numerators incorrectly.",
        remediation: "Convert 1/5 to an equivalent fraction with denominator 20 first (1/5=4/20), then subtract numerators: 9-4=5, not a different value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the decimal", hint: "0.45 = 45/100. Simplify by dividing by the HCF (5)." },
      { level: 2, description: "Find a common denominator", hint: "9/20 and 1/5 — convert 1/5 to twentieths: 1/5 = 4/20." },
      { level: 3, description: "Subtract and simplify", hint: "9/20 - 4/20 = 5/20. Simplify to lowest terms." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.A.1"]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "7.8 + 1.25 - 4.6 = ?",
    options: [
        { text: "4.45", correct: true, feedback: "7.80 + 1.25 = 9.05; 9.05 - 4.60 = 4.45." },
        { text: "4.55", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r5-a" },
        { text: "3.45", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-b" },
        { text: "5.45", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 4.55, an error in the subtraction step.",
        rootCause: "Column Subtraction Slip — makes a small error in 9.05-4.60.",
        remediation: "Verify the subtraction independently, column by column."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 3.45, a larger subtraction error.",
        rootCause: "Column Subtraction Slip — a bigger arithmetic error in the final step.",
        remediation: "Verify by adding back: does 4.45+4.60 give 9.05?"
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 5.45, possibly from an error in the initial addition.",
        rootCause: "Column Addition Slip — makes an error in 7.80+1.25 before the subtraction even begins.",
        remediation: "Verify the addition step first: 7.80+1.25, column by column, before moving to the subtraction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Add first", hint: "7.80 + 1.25 = ?" },
      { level: 2, description: "Then subtract", hint: "Take that result and subtract 4.60." },
      { level: 3, description: "Verify", hint: "Check each column carefully." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-05",
    question: "0.004 × ? = 4. Find ?.",
    options: [
        { text: "1000", correct: true, feedback: "4 ÷ 0.004 = 1000." },
        { text: "100", correct: false, feedback: "0.004 × 100 = 0.4.", misconceptionId: "E-r6-a" },
        { text: "10", correct: false, feedback: "0.004 × 10 = 0.04.", misconceptionId: "E-r6-b" },
        { text: "10000", correct: false, feedback: "0.004 × 10000 = 40.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 100, too small a multiplier.",
        rootCause: "Shift-Count Undercount — underestimates how many places 0.004 must shift to reach 4 (three places, ×1000, not two).",
        remediation: "Verify by multiplying back: 0.004×100=0.4, far short of 4 — try a larger multiplier."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 10, far too small.",
        rootCause: "Shift-Count Undercount — a larger underestimate.",
        remediation: "Compare magnitudes: 0.004 must grow a thousand-fold to reach 4."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 10000, too large.",
        rootCause: "Shift-Count Overreach — overestimates the required multiplier.",
        remediation: "Verify by multiplying back: 0.004×10000=40, ten times too large."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the inverse operation", hint: "The missing multiplier equals 4 ÷ 0.004." },
      { level: 2, description: "Count the shift needed", hint: "How many places does the decimal point move from 0.004 to 4.000?" },
      { level: 3, description: "Match to a power of ten", hint: "A three-place shift right corresponds to multiplying by 1000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-04",
    question: "In 0.105, what is the value of the digit 1? Write as a fraction.",
    options: [
        { text: "\\(\\frac{1}{10}\\)", correct: true, feedback: "1 is in the tenths place → 1/10." },
        { text: "\\(\\frac{1}{100}\\)", correct: false, feedback: "That would be hundredths.", misconceptionId: "E-r7-a" },
        { text: "\\(\\frac{1}{1000}\\)", correct: false, feedback: "That would be thousandths.", misconceptionId: "E-r7-b" },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "Not the place value fraction.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student answers 1/100, one column too far right.",
        rootCause: "Adjacent-Column Slip — lands one column too late, on hundredths instead of tenths.",
        remediation: "The first digit after the decimal point is always tenths — count from the decimal point directly."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student answers 1/1000, two columns too far right.",
        rootCause: "Adjacent-Column Slip — a larger miscount, landing on thousandths.",
        remediation: "Count one column at a time: 1st=tenths, not further."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student answers 1/5, an unrelated fraction.",
        rootCause: "Place-Value Fraction Confusion — writes a simplified-looking fraction rather than the actual place-value fraction (1/10) the digit represents.",
        remediation: "The place value of a digit is always (digit)/(place value denominator) — for tenths, that's always a fraction over 10, not a simplified equivalent."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the decimal point", hint: "Locate the decimal point in 0.105." },
      { level: 2, description: "Identify the first digit after it", hint: "The digit immediately after the decimal point is 1." },
      { level: 3, description: "Write its value", hint: "The first digit after the decimal point is tenths — value = digit/10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Arrange in ascending order: 1.02, 1.002, 1.2, 1.022",
    options: [
        { text: "1.002, 1.02, 1.022, 1.2", correct: true, feedback: "1.002 < 1.020 < 1.022 < 1.200." },
        { text: "1.002, 1.022, 1.02, 1.2", correct: false, feedback: "1.02 is smaller than 1.022.", misconceptionId: "E-r8-a" },
        { text: "1.2, 1.022, 1.02, 1.002", correct: false, feedback: "That's descending.", misconceptionId: "E-r8-b" },
        { text: "1.02, 1.002, 1.022, 1.2", correct: false, feedback: "1.002 is the smallest, not second.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student swaps 1.02 and 1.022.",
        rootCause: "More-Digits-Means-Bigger — assumes 1.022 (three decimal digits) is automatically bigger than 1.02, without aligning and comparing directly.",
        remediation: "Align both to three decimal places (1.020 vs 1.022) and compare the thousandths digit: 0 vs 2 — 1.022 is indeed larger, so it should come AFTER 1.02, not before."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student writes the numbers largest to smallest instead of smallest to largest.",
        rootCause: "Direction Reversal — correctly sorts the values but in the wrong direction.",
        remediation: "Anchor the vocabulary: ascending = smallest first."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student places 1.002 in the second position instead of first.",
        rootCause: "Incomplete Comparison — doesn't fully verify which value is truly smallest across all four.",
        remediation: "Align all four to three decimal places (1.020, 1.002, 1.200, 1.022) and compare them together before ordering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four numbers", hint: "Write with three decimal places: 1.020, 1.002, 1.200, 1.022." },
      { level: 2, description: "Compare systematically", hint: "Compare tenths, then hundredths, then thousandths as needed." },
      { level: 3, description: "Sort fully ascending", hint: "Order all four from smallest to largest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "A number rounded to the nearest hundredth is 9.35. Its thousandths digit is 7. What is the number?",
    options: [
        { text: "9.347", correct: true, feedback: "Range: 9.345-9.354. Hundredths=5, thousandths=7 → 9.347." },
        { text: "9.357", correct: false, feedback: "That rounds to 9.36.", misconceptionId: "E-r9-a" },
        { text: "9.345", correct: false, feedback: "Thousandths is 5, not 7.", misconceptionId: "E-r9-b" },
        { text: "9.350", correct: false, feedback: "That rounds to 9.35 but its thousandths digit is 0.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student answers 9.357, which has thousandths digit 7 but rounds to 9.36, not 9.35.",
        rootCause: "Digit Match Without Range Check — matches the required thousandths digit without verifying the resulting number actually rounds to 9.35.",
        remediation: "After finding a candidate with the right thousandths digit, independently verify it rounds to the stated value."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student answers 9.345, in the correct range but with the wrong thousandths digit.",
        rootCause: "Range Boundary Default — picks the boundary of the valid range without checking its thousandths digit matches the required 7.",
        remediation: "Check both conditions: does it round to 9.35, AND is its thousandths digit exactly 7?"
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student answers 9.350, in range but with thousandths digit 0, not 7.",
        rootCause: "Range Match Without Digit Check — finds a number that rounds correctly but doesn't check the specific thousandths digit condition.",
        remediation: "Explicitly check the thousandths digit of each candidate against the stated requirement of 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the range that rounds to 9.35", hint: "Numbers from 9.345 up to (but not including) 9.355 round to 9.35 at the nearest hundredth." },
      { level: 2, description: "Apply the thousandths-digit condition", hint: "Within that range, which number has 7 as its thousandths digit?" },
      { level: 3, description: "Confirm uniqueness", hint: "Only one number in the range 9.345-9.354 has thousandths digit 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-06",
    question: "Convert \\(\\frac{3}{8}\\) to a decimal, then add 0.5.",
    options: [
        { text: "0.875", correct: true, feedback: "3/8 = 0.375; +0.5 = 0.875." },
        { text: "0.775", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-r10-a" },
        { text: "0.8", correct: false, feedback: "Incorrect.", misconceptionId: "E-r10-b" },
        { text: "0.375", correct: false, feedback: "You forgot to add 0.5.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student answers 0.775, an addition error.",
        rootCause: "Column Addition Slip — makes an error adding 0.375+0.5.",
        remediation: "Align the decimal points (0.375 + 0.500) and add column by column."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student answers 0.8, an incorrect fraction conversion or rounding.",
        rootCause: "Wrong Conversion or Premature Rounding — doesn't correctly compute 3÷8=0.375, or rounds before adding.",
        remediation: "Compute 3÷8 exactly (0.375) before adding, rather than estimating."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student answers 0.375, correctly converting but forgetting to add 0.5.",
        rootCause: "Missing Final Step — completes the conversion but skips the requested addition.",
        remediation: "Treat the question as two steps: convert, THEN add — check both are done."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "3 ÷ 8 = ?" },
      { level: 2, description: "Align for addition", hint: "Write 0.375 and 0.5 as 0.375 and 0.500." },
      { level: 3, description: "Add", hint: "0.375 + 0.500 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-05",
    question: "9.05 - 2.7 + 1.375 = ?",
    options: [
        { text: "7.725", correct: true, feedback: "9.050 - 2.700 = 6.350; +1.375 = 7.725." },
        { text: "7.625", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-a" },
        { text: "8.725", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r11-b" },
        { text: "6.725", correct: false, feedback: "Forgot to add 1.375.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 7.625, an arithmetic slip.",
        rootCause: "Multi-Step Arithmetic Slip — makes a small error in one of the two operations.",
        remediation: "Verify each step separately: first confirm 9.050-2.700=6.350, then confirm 6.350+1.375=7.725."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 8.725, a subtraction error.",
        rootCause: "Column Subtraction Slip — makes an error in 9.050-2.700.",
        remediation: "Verify by adding back: does your subtraction result plus 2.700 give back 9.050?"
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 6.725, correctly subtracting but forgetting to add 1.375.",
        rootCause: "Missing Final Step — completes the subtraction but drops the addition entirely.",
        remediation: "Confirm all three numbers and both operations are used before finalising an answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract first", hint: "9.050 - 2.700 = ?" },
      { level: 2, description: "Then add", hint: "Take that result and add 1.375." },
      { level: 3, description: "Verify", hint: "Check each step independently." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-06",
    question: "0.6 × 100 = ? Then divide the result by 10.",
    options: [
        { text: "6", correct: true, feedback: "0.6 × 100 = 60; 60 ÷ 10 = 6." },
        { text: "60", correct: false, feedback: "You forgot to divide by 10.", misconceptionId: "E-r12-a" },
        { text: "600", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-b" },
        { text: "0.6", correct: false, feedback: "No net operation applied.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers 60, correctly multiplying but forgetting the division.",
        rootCause: "Missing Final Step — completes the multiplication but skips the required ÷10 step.",
        remediation: "Treat multi-step questions as a checklist — after multiplying, check whether a further operation is still required."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers 600, multiplying twice instead of dividing.",
        rootCause: "Wrong Operation — applies another ×10 shift instead of the required ÷10.",
        remediation: "Reread the question: the second step is DIVISION, not multiplication."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers 0.6, performing no net operation.",
        rootCause: "No Operations Applied — restates the original number, perhaps mistakenly cancelling ×100 and ÷10 as if they were equal and opposite (they aren't — the net effect is ×10).",
        remediation: "Work through each step explicitly: ×100 first (0.6→60), then ÷10 (60→6) — verify the value actually changes at each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply first", hint: "0.6 × 100: shift the decimal point two places right." },
      { level: 2, description: "Confirm the product", hint: "0.6 × 100 = 60." },
      { level: 3, description: "Then divide", hint: "60 ÷ 10: shift the decimal point one place left." }
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
    title: "Decimals — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step decimal work: combining place value, rounding, fraction-decimal conversion, and chained addition/subtraction/multiplication/division by powers of ten.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Multi-Step Decimals</strong><br>' +
      "&bull; Place value: tenths (1st), hundredths (2nd), thousandths (3rd); know the value of each digit.<br>" +
      "&bull; Compare: align decimal points, add zeros to make the same number of places, then compare left to right.<br>" +
      "&bull; Rounding: look at the next digit; 5 or more &rarr; round up. Then use the rounded value in further steps.<br>" +
      "&bull; Fractions &rarr; decimals: convert using equivalent fractions or division, then operate.<br>" +
      "&bull; Add/subtract: align decimals; write zeros for missing places; perform operations in order.<br>" +
      "&bull; &times;/&divide; by powers of ten: move the decimal point right (&times;) or left (&divide;); fill empty places with zeros.<br>",
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

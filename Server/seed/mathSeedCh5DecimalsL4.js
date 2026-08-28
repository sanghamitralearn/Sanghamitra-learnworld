// seed/mathSeedCh5DecimalsL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 5
// (Decimals), Level 4 — converted from the standalone HTML file
// ch-5-decimals-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh5DecimalsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-5-decimals";
const CHAPTER_NAME = "Decimals";
const LEVEL = 4;

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
    skillId: "DECPLACE-01",
    question: "In 6.24, what digit is in the tenths place?",
    options: [
        { text: "2", correct: true, feedback: "The first digit after the decimal point is tenths: 2." },
        { text: "6", correct: false, feedback: "6 is in the ones place.", misconceptionId: "E-w1-a" },
        { text: "4", correct: false, feedback: "4 is in the hundredths place.", misconceptionId: "E-w1-b" },
        { text: "0", correct: false, feedback: "There is no 0 in the tenths place.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student names the ones digit (6) instead of the tenths digit.",
        rootCause: "Decimal Point Reference Confusion — doesn't use the decimal point as the anchor for naming place values.",
        remediation: "The decimal point separates whole numbers from decimal parts — the FIRST digit to the RIGHT of the point is always tenths."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student names the hundredths digit (4) instead of the tenths digit.",
        rootCause: "Column Miscounting — counts one column too far when identifying place value.",
        remediation: "Count columns from the decimal point outward: 1st column = tenths, 2nd column = hundredths — check which column you're pointing to."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student assumes there must be a hidden zero in a place value that isn't explicitly the first digit shown.",
        rootCause: "Place Value Misconception — doesn't trust that the digit immediately after the decimal point IS the tenths digit.",
        remediation: "In 6.24, the digit immediately after the decimal point (2) is the tenths digit — no digit is hidden or skipped."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the decimal point", hint: "Find the point in 6.24." },
      { level: 2, description: "Identify the first column after it", hint: "That column is the tenths place." },
      { level: 3, description: "Read the digit", hint: "What digit sits there?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is larger? 0.7 or 0.69",
    options: [
        { text: "0.7", correct: true, feedback: "0.7 = 0.70 > 0.69." },
        { text: "0.69", correct: false, feedback: "0.70 is larger.", misconceptionId: "E-w2-a" },
        { text: "They are equal", correct: false, feedback: "0.70 ≠ 0.69.", misconceptionId: "E-w2-b" },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.7 and compare.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student assumes 0.69 is larger because it has more digits than 0.7.",
        rootCause: "Digit-Count Bias — believes more decimal digits always means a larger value.",
        remediation: "Rewrite 0.7 as 0.70 (adding a trailing zero doesn't change its value) — now compare 0.70 to 0.69 digit by digit."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student believes 0.7 and 0.69 are equal because they 'round to the same thing' or look similar.",
        rootCause: "Approximate Equality Assumption — treats visually similar decimals as identical without precise comparison.",
        remediation: "Align both numbers to the same number of decimal places (0.70 vs 0.69) and compare each digit column — they are not equal."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student believes a one-decimal-place number and a two-decimal-place number cannot be directly compared.",
        rootCause: "Unlike-Length Comparison Avoidance — doesn't realise trailing zeros can be added to match decimal-place counts.",
        remediation: "Any decimal can be extended with trailing zeros without changing its value: 0.7 = 0.70 — this makes direct comparison always possible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 0.7 as 0.70." },
      { level: 2, description: "Compare column by column", hint: "Tenths: 7 vs 6." },
      { level: 3, description: "Decide", hint: "7 tenths is more than 6 tenths." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-01",
    question: "Round 3.48 to the nearest tenth.",
    options: [
        { text: "3.5", correct: true, feedback: "Hundredths 8 ≥ 5 → round up tenths to 5." },
        { text: "3.4", correct: false, feedback: "You truncated instead of rounding up.", misconceptionId: "E-w3-a" },
        { text: "3.0", correct: false, feedback: "That's the nearest whole number.", misconceptionId: "E-w3-b" },
        { text: "3.48", correct: false, feedback: "Unchanged; rounding must be applied.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student simply drops the hundredths digit instead of checking whether to round the tenths digit up.",
        rootCause: "Truncation Instead of Rounding — chops off extra digits without checking the rounding rule.",
        remediation: "To round, always check the digit just past the target place: the hundredths digit here is 8, and since 8≥5, the tenths digit rounds UP."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student rounds to the nearest whole number instead of the nearest tenth.",
        rootCause: "Rounding Place Confusion — targets the wrong place value.",
        remediation: "'Nearest tenth' means keep ONE decimal digit — look at the hundredths digit to decide whether that one digit rounds up or stays."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student leaves the number unchanged, not applying any rounding at all.",
        rootCause: "Rounding Action Omitted — doesn't perform any rounding operation.",
        remediation: "Rounding requires an action — decide whether the tenths digit stays the same or increases by 1, based on the hundredths digit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place", hint: "Nearest tenth means keep 1 decimal digit." },
      { level: 2, description: "Check the next digit", hint: "Hundredths digit is 8." },
      { level: 3, description: "Round", hint: "8 ≥ 5, so round the tenths digit up." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-01",
    question: "Write \\(\\frac{3}{10}\\) as a decimal.",
    options: [
        { text: "0.3", correct: true, feedback: "Denominator 10 means one decimal place." },
        { text: "3.0", correct: false, feedback: "That's 3, not 3/10.", misconceptionId: "E-w4-a" },
        { text: "0.03", correct: false, feedback: "That would be 3/100.", misconceptionId: "E-w4-b" },
        { text: "0.003", correct: false, feedback: "That would be 3/1000.", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student treats the fraction as if the numerator were the whole answer, ignoring the denominator's effect.",
        rootCause: "Fraction-as-Whole-Number Confusion — writes the numerator as a whole number rather than a decimal part.",
        remediation: "A fraction with denominator 10 always becomes a decimal with ONE digit after the point: 3/10 = 0.3, not the whole number 3."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student places the digit in the hundredths place instead of tenths, treating the denominator as 100.",
        rootCause: "Denominator Miscount — misreads /10 as /100.",
        remediation: "Count the zeros in the denominator: 10 has ONE zero, so the decimal has ONE decimal place: 3/10 = 0.3."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student places the digit in the thousandths place, treating the denominator as 1000.",
        rootCause: "Denominator Miscount — significantly overcounts the zeros in the denominator.",
        remediation: "Match the number of decimal places to the number of zeros in the denominator exactly: 10 → 1 decimal place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Look at the denominator", hint: "10 has one zero." },
      { level: 2, description: "Determine decimal places", hint: "One zero means one decimal place." },
      { level: 3, description: "Write the decimal", hint: "3/10 = 0.?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-01",
    question: "4.2 + 3.5 = ?",
    options: [
        { text: "7.7", correct: true, feedback: "Add tenths and ones." },
        { text: "7.0", correct: false, feedback: "You forgot to add the tenths.", misconceptionId: "E-w5-a" },
        { text: "7.07", correct: false, feedback: "Decimal point misplaced.", misconceptionId: "E-w5-b" },
        { text: "8.7", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student adds only the whole-number parts (4+3=7) and ignores the tenths digits entirely.",
        rootCause: "Decimal Part Ignored — treats the numbers as whole numbers, dropping everything after the decimal point.",
        remediation: "Add BOTH parts: whole numbers (4+3=7) AND tenths (0.2+0.5=0.7), then combine: 7+0.7=7.7."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student misplaces the decimal point, writing the tenths sum as hundredths.",
        rootCause: "Decimal Point Misplacement — doesn't align the decimal points correctly when adding.",
        remediation: "Stack the numbers vertically with decimal points aligned, then add each column — this keeps every digit in its correct place."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student makes a carrying error, adding an extra 1 to the whole-number part.",
        rootCause: "Addition Carry Error — incorrectly carries a value that shouldn't be carried (since 2+5=7, no carry is needed).",
        remediation: "Check whether the tenths sum (2+5=7) is less than 10 — if so, no carry is needed into the ones place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align the decimal points", hint: "4.2 and 3.5, stacked with points aligned." },
      { level: 2, description: "Add the tenths", hint: "2 + 5 = 7 tenths." },
      { level: 3, description: "Add the ones", hint: "4 + 3 = 7 ones." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-01",
    question: "0.56 × 100 = ?",
    options: [
        { text: "56", correct: true, feedback: "Move decimal two places right." },
        { text: "5.6", correct: false, feedback: "That's ×10.", misconceptionId: "E-w6-a" },
        { text: "560", correct: false, feedback: "That's ×1000.", misconceptionId: "E-w6-b" },
        { text: "0.0056", correct: false, feedback: "You divided instead of multiplied.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student shifts the decimal point only one place instead of two, applying a ×10 shift instead of ×100.",
        rootCause: "Power-of-Ten Shift Miscount — doesn't match the number of shift-places to the number of zeros in the multiplier.",
        remediation: "Count the zeros in 100 (two zeros) — the decimal point must move exactly that many places to the right."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student shifts the decimal point three places instead of two, applying a ×1000 shift instead of ×100.",
        rootCause: "Power-of-Ten Shift Miscount — overcounts the number of shift-places.",
        remediation: "100 has two zeros, so shift the decimal point exactly two places right: 0.56 → 56, not 560."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student moves the decimal point left instead of right, applying the inverse (division) operation.",
        rootCause: "Multiplication/Division Direction Confusion — reverses the direction of the decimal shift.",
        remediation: "Multiplying by a power of ten moves the decimal point RIGHT (making the number bigger); dividing moves it LEFT."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in 100", hint: "Two zeros." },
      { level: 2, description: "Determine shift direction", hint: "Multiplying moves the decimal point RIGHT." },
      { level: 3, description: "Shift", hint: "Move the decimal point two places right in 0.56." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Convert 0.05 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{20}\\)", correct: true, feedback: "5/100 = 1/20." },
        { text: "\\(\\frac{5}{100}\\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-w7-a" },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2, not 0.05.", misconceptionId: "E-w7-b" },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "1/2 = 0.5, not 0.05.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student writes the correct unsimplified fraction (5/100) but doesn't reduce it to simplest form.",
        rootCause: "Simplification Step Skipped — stops before dividing numerator and denominator by their greatest common factor.",
        remediation: "After writing the initial fraction 5/100, find the GCF of 5 and 100 (which is 5), then divide both by it: 5÷5=1, 100÷5=20."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student writes 1/5, confusing the visual '05' in 0.05 with a simpler fraction.",
        rootCause: "Digit Pattern Misreading — misreads the decimal's digits as forming a familiar fraction rather than computing it properly.",
        remediation: "0.05 means 5 hundredths, i.e. 5/100 — always write out the place-value fraction first before simplifying, rather than guessing from appearance."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student confuses 0.05 with 0.5, a tenfold error in magnitude.",
        rootCause: "Place Value Misreading — misjudges which decimal place the 5 occupies.",
        remediation: "Count the decimal places in 0.05 — there are TWO digits after the point (0 and 5), meaning hundredths, not tenths like 0.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write as a place-value fraction", hint: "0.05 = 5/100." },
      { level: 2, description: "Find the GCF", hint: "GCF of 5 and 100 is 5." },
      { level: 3, description: "Simplify", hint: "Divide both numerator and denominator by 5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-02",
    question: "6.0 - 2.4 = ?",
    options: [
        { text: "3.6", correct: true, feedback: "6.0 - 2.4 = 3.6." },
        { text: "4.4", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w8-a" },
        { text: "3.4", correct: false, feedback: "Incorrect.", misconceptionId: "E-w8-b" },
        { text: "8.4", correct: false, feedback: "You added instead of subtracting.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student mishandles borrowing when subtracting a nonzero tenths digit from a zero tenths digit, landing 1.0 too high.",
        rootCause: "Subtraction Borrowing Error — doesn't correctly borrow from the ones place when the tenths digit of the minuend is 0.",
        remediation: "Since 6.0 has a 0 in the tenths place and 2.4 has 4, borrow 1 from the ones place: 6.0 becomes 5 ones + 10 tenths, then subtract 4 tenths."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student makes a smaller borrowing slip, landing 0.2 below the correct answer.",
        rootCause: "Subtraction Borrowing Error — a minor miscalculation during the borrow-and-subtract process.",
        remediation: "Rewrite 6.0 as 5.10 (borrowing 1 from the ones place into the tenths place), then subtract 2.4 column by column."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student adds the two numbers instead of subtracting them.",
        rootCause: "Operation Sign Misread — performs addition when subtraction was requested.",
        remediation: "Check the operation symbol carefully — a minus sign means subtract, reducing the first number by the second."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite with matching decimal places", hint: "6.0 and 2.4 already match." },
      { level: 2, description: "Borrow if needed", hint: "Tenths: 0 - 4 needs a borrow from the ones place." },
      { level: 3, description: "Subtract", hint: "5.10 - 2.4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "S",
    skillId: "DECPLACE-02",
    question: "In 0.739, what digit is in the hundredths place?",
    options: [
        { text: "3", correct: true, feedback: "Hundredths is the second decimal place: 3." },
        { text: "7", correct: false, feedback: "7 is tenths.", misconceptionId: "E-d1-a" },
        { text: "9", correct: false, feedback: "9 is thousandths.", misconceptionId: "E-d1-b" },
        { text: "0", correct: false, feedback: "There is no 0 digit shown after the decimal.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student names the tenths digit (7) instead of the hundredths digit.",
        rootCause: "Column Miscounting — counts one column short when identifying place value.",
        remediation: "Count columns from the decimal point outward: 1st = tenths, 2nd = hundredths — check you land on the 2nd column, not the 1st."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student names the thousandths digit (9) instead of the hundredths digit.",
        rootCause: "Column Miscounting — counts one column too far when identifying place value.",
        remediation: "The hundredths column is the SECOND digit after the decimal point, not the third — recount carefully."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student assumes a leading zero exists that isn't actually part of the number's decimal digits.",
        rootCause: "Place Value Misconception — confuses the whole-number zero (before the point) with a decimal digit.",
        remediation: "In 0.739, the 0 is the ONES digit before the decimal point — the decimal digits start right after the point: 7, 3, 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the decimal point", hint: "Find the point in 0.739." },
      { level: 2, description: "Count to the second column", hint: "1st column (tenths) = 7. 2nd column (hundredths) = ?" },
      { level: 3, description: "Read the digit", hint: "What digit is in the second column?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    skillId: "DECCOMP-02",
    question: "Which is smallest? 0.45, 0.5, 0.405, 0.455",
    options: [
        { text: "0.405", correct: true, feedback: "Align: 0.450, 0.500, 0.405, 0.455. 0.405 is smallest." },
        { text: "0.45", correct: false, feedback: "0.45 is larger than 0.405.", misconceptionId: "E-d2-a" },
        { text: "0.5", correct: false, feedback: "0.5 is the largest.", misconceptionId: "E-d2-b" },
        { text: "0.455", correct: false, feedback: "0.455 is larger than 0.405.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student picks 0.45, misjudging it as smaller than 0.405 because it has fewer digits.",
        rootCause: "Digit-Count Bias — assumes a shorter decimal is automatically smaller.",
        remediation: "Align all numbers to three decimal places first: 0.450 vs 0.405 — comparing hundredths digits (5 vs 0) shows 0.405 is smaller."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student picks 0.5, the largest value, mistakenly believing fewer decimal digits means a smaller value.",
        rootCause: "Digit-Count Bias — the opposite error, assuming the shortest-looking decimal must be smallest without checking.",
        remediation: "0.5 = 0.500, which is larger than all the others — always align decimal places before judging size by appearance."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student picks 0.455 instead of 0.405, confusing which number has the smaller hundredths digit.",
        rootCause: "Digit Comparison Slip — misreads or miscompares the hundredths digits of the two similar-looking numbers.",
        remediation: "Compare 0.405 and 0.455 column by column: hundredths digit 0 vs 5 — 0 is smaller, so 0.405 is the smaller number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to the same number of decimal places", hint: "0.450, 0.500, 0.405, 0.455." },
      { level: 2, description: "Compare tenths digits first", hint: "All have tenths digit 4 or 5 — 0.405 and 0.450 share tenths 4." },
      { level: 3, description: "Compare hundredths digits", hint: "Between 0.450 and 0.405, which has the smaller hundredths digit?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "S",
    skillId: "DECROUND-02",
    question: "Round 7.164 to the nearest hundredth.",
    options: [
        { text: "7.16", correct: true, feedback: "Thousandths 4 < 5 → keep hundredths 6." },
        { text: "7.17", correct: false, feedback: "You rounded up when you shouldn't have.", misconceptionId: "E-d3-a" },
        { text: "7.2", correct: false, feedback: "That's rounding to the nearest tenth.", misconceptionId: "E-d3-b" },
        { text: "7.164", correct: false, feedback: "Unchanged; rounding must be applied.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student rounds the hundredths digit up even though the thousandths digit (4) is below 5.",
        rootCause: "Round-Up Default Bias — rounds up regardless of the actual digit, without checking the rule.",
        remediation: "Always check the digit AFTER the target place first: here the thousandths digit is 4, and since 4<5, the hundredths digit stays the same."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student rounds to the nearest tenth instead of the nearest hundredth.",
        rootCause: "Rounding Place Confusion — targets the wrong place value.",
        remediation: "'Nearest hundredth' means keep TWO decimal digits — check the THIRD digit (thousandths) to decide whether to round."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student leaves the number unchanged, not applying any rounding at all.",
        rootCause: "Rounding Action Omitted — doesn't perform the rounding decision.",
        remediation: "Rounding to the nearest hundredth means the number MUST be rewritten with only two decimal digits — decide up or down using the thousandths digit."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place", hint: "Nearest hundredth means keep 2 decimal digits." },
      { level: 2, description: "Check the next digit", hint: "Thousandths digit is 4." },
      { level: 3, description: "Round", hint: "4 < 5, so the hundredths digit stays the same." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "S",
    skillId: "DECCONV-01",
    question: "Write \\(\\frac{4}{5}\\) as a decimal.",
    options: [
        { text: "0.8", correct: true, feedback: "4/5 = 8/10 = 0.8." },
        { text: "0.4", correct: false, feedback: "That's 2/5, not 4/5.", misconceptionId: "E-d4-a" },
        { text: "0.45", correct: false, feedback: "Incorrect.", misconceptionId: "E-d4-b" },
        { text: "1.25", correct: false, feedback: "That's the reciprocal 5/4.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student writes the numerator directly as a decimal digit (0.4) without converting the fraction properly.",
        rootCause: "Numerator-as-Decimal-Digit Shortcut — mistakenly treats the numerator alone as the decimal value.",
        remediation: "Convert by finding an equivalent fraction with a denominator of 10 or 100: 4/5 = 8/10 (multiply top and bottom by 2) = 0.8."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student concatenates the numerator and denominator digits (4 and 5) to form 0.45.",
        rootCause: "Digit Concatenation Error — treats the fraction's two numbers as forming a decimal's digits rather than performing division.",
        remediation: "A fraction is NOT converted by writing its digits side by side — convert by division: 4 ÷ 5, or by finding an equivalent tenths fraction."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student computes the reciprocal (5/4=1.25) instead of the fraction as given (4/5).",
        rootCause: "Numerator/Denominator Swap — inverts the fraction before converting.",
        remediation: "Keep the numerator and denominator in their original positions: 4/5 means 4 divided by 5, not 5 divided by 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find an equivalent tenths fraction", hint: "Multiply numerator and denominator by 2: 4/5 = 8/10." },
      { level: 2, description: "Convert to decimal", hint: "8/10 has one decimal place." },
      { level: 3, description: "Write it", hint: "8 tenths = 0.?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "S",
    skillId: "DECADDSUB-01",
    question: "5.25 + 2.3 = ?",
    options: [
        { text: "7.55", correct: true, feedback: "5.25 + 2.30 = 7.55." },
        { text: "7.25", correct: false, feedback: "You forgot to add the tenths correctly.", misconceptionId: "E-d5-a" },
        { text: "7.28", correct: false, feedback: "Misaligned decimals.", misconceptionId: "E-d5-b" },
        { text: "7.0", correct: false, feedback: "Rough estimate, not exact.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student adds the whole numbers and hundredths correctly but omits the tenths contribution of 2.3.",
        rootCause: "Missing-Digit Alignment — since 5.25 has a hundredths digit and 2.3 doesn't, the tenths digit of 2.3 gets dropped.",
        remediation: "Rewrite 2.3 as 2.30 (adding a trailing zero) so both numbers have matching decimal places, then add column by column."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student misaligns the digits, perhaps lining up the last digit of each number instead of the decimal points.",
        rootCause: "Decimal Point Misalignment — stacks numbers by digit count rather than by decimal place.",
        remediation: "Always align by the DECIMAL POINT, not by the rightmost digit — pad 2.3 with a zero to become 2.30 to match 5.25's two decimal places."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student rounds both numbers before adding, giving an approximate rather than exact answer.",
        rootCause: "Premature Rounding — estimates instead of computing the exact sum requested.",
        remediation: "Unless a question asks for an estimate, add the EXACT values given: 5.25 + 2.30, not rounded versions of them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Rewrite 2.3 as 2.30." },
      { level: 2, description: "Align and add hundredths", hint: "5 + 0 = 5 hundredths." },
      { level: 3, description: "Add tenths and ones", hint: "2+3=5 tenths; 5+2=7 ones." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "T",
    skillId: "DECMUL10-02",
    question: "0.07 × ? = 7. Find ?.",
    options: [
        { text: "100", correct: true, feedback: "7 ÷ 0.07 = 100." },
        { text: "10", correct: false, feedback: "0.07×10=0.7.", misconceptionId: "E-d6-a" },
        { text: "1000", correct: false, feedback: "0.07×1000=70.", misconceptionId: "E-d6-b" },
        { text: "0.01", correct: false, feedback: "0.07×0.01=0.0007.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student underestimates the missing multiplier, picking 10 instead of 100.",
        rootCause: "Power-of-Ten Miscount — loses track of a zero when dividing by a small decimal.",
        remediation: "Rewrite 7 ÷ 0.07 as 700 ÷ 7 (multiply both by 100 to clear the decimal), then divide: 700 ÷ 7 = 100."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student overestimates the missing multiplier, picking 1000 instead of 100.",
        rootCause: "Power-of-Ten Miscount — overshoots by an extra zero.",
        remediation: "Check your answer by multiplying back: 0.07 × 1000 = 70, not 7 — this confirms 1000 is too large; try 100 instead."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student picks a value less than 1, not recognising that a large multiplier is needed to reach 7 from 0.07.",
        rootCause: "Decimal Divisor Magnitude Confusion — doesn't recognise that dividing by a small decimal produces a much larger quotient.",
        remediation: "Since 0.07 is much smaller than 7, the missing multiplier must be a large number — estimate first: 0.07 is about 1/100 of 7, so ? should be about 100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the inverse operation", hint: "? = 7 ÷ 0.07." },
      { level: 2, description: "Clear the decimal", hint: "Multiply both numbers by 100: 700 ÷ 7." },
      { level: 3, description: "Divide", hint: "700 ÷ 7 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-06", probability: 0.3, condition: "Miscounting decimal shifts when dividing by a small decimal recurs in ratio and rate problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "T",
    skillId: "DECPLACE-02",
    question: "Which number has 5 in the thousandths place? 0.352, 0.253, 0.235, 0.523",
    options: [
        { text: "0.235", correct: true, feedback: "Thousandths is the third decimal place: 5 in 0.235." },
        { text: "0.352", correct: false, feedback: "Thousandths digit here is 2.", misconceptionId: "E-d7-a" },
        { text: "0.253", correct: false, feedback: "Thousandths digit here is 3.", misconceptionId: "E-d7-b" },
        { text: "0.523", correct: false, feedback: "Thousandths digit here is 3.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student picks 0.352 based on the tenths digit (3) matching a pattern, without checking the thousandths digit specifically.",
        rootCause: "Wrong Column Checked — scans a different column (tenths) instead of the requested one (thousandths).",
        remediation: "For each number, explicitly identify the THIRD decimal digit only — ignore the first two digits when searching for the thousandths value."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student picks 0.253, perhaps because it 'contains' a 5 somewhere, without checking which specific column that 5 is in.",
        rootCause: "Digit Presence Confusion — assumes any occurrence of the digit 5 anywhere satisfies the condition, not just in the specified column.",
        remediation: "The digit 5 must be in the THIRD position after the decimal point specifically — check the exact column, not just whether 5 appears anywhere."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student picks 0.523, confusing the tenths digit (5) with the thousandths digit.",
        rootCause: "Column Miscounting — mistakes the first decimal digit (tenths) for the third (thousandths).",
        remediation: "Count three places from the decimal point to reach thousandths — in 0.523, the tenths digit is 5, but the thousandths digit is 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the thousandths column", hint: "It's the THIRD digit after the decimal point." },
      { level: 2, description: "Check each number's third digit", hint: "0.352→2, 0.253→3, 0.235→5, 0.523→3." },
      { level: 3, description: "Pick the match", hint: "Which number has 5 in that exact column?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    skillId: "DECCOMP-02",
    question: "Arrange in descending order: 0.99, 0.909, 0.9, 0.099",
    options: [
        { text: "0.99, 0.909, 0.9, 0.099", correct: true, feedback: "0.990, 0.909, 0.900, 0.099." },
        { text: "0.9, 0.909, 0.99, 0.099", correct: false, feedback: "That's ascending, not descending.", misconceptionId: "E-d8-a" },
        { text: "0.099, 0.9, 0.909, 0.99", correct: false, feedback: "That's ascending.", misconceptionId: "E-d8-b" },
        { text: "0.99, 0.9, 0.909, 0.099", correct: false, feedback: "0.909 is larger than 0.9.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student arranges the numbers in ascending order despite the question asking for descending.",
        rootCause: "Order Direction Reversal — confuses ascending with descending.",
        remediation: "'Descending' means largest FIRST, going down to smallest — reread the direction word before arranging."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student arranges the numbers in ascending order (smallest first) again, the reverse of what's requested.",
        rootCause: "Order Direction Reversal — same confusion between ascending and descending.",
        remediation: "Check your final list against the meaning of 'descending': each number should be SMALLER than the one before it."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student swaps 0.9 and 0.909, believing 0.9 is larger because it has fewer digits.",
        rootCause: "Digit-Count Bias — assumes a shorter decimal is larger than a longer one without aligning place values.",
        remediation: "Align 0.9 as 0.900 and compare to 0.909: hundredths digit 0 vs 0 (tie), thousandths digit 0 vs 9 — 0.909 is larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all to three decimal places", hint: "0.990, 0.909, 0.900, 0.099." },
      { level: 2, description: "Rank them by size", hint: "Compare each pair digit by digit." },
      { level: 3, description: "Write largest to smallest", hint: "Descending means biggest number first." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "C",
    skillId: "DECROUND-04",
    question: "Round 8.396 to the nearest tenth, then add 0.5.",
    options: [
        { text: "8.9", correct: true, feedback: "8.396 → 8.4 (hundredths 9≥5). 8.4+0.5=8.9." },
        { text: "8.8", correct: false, feedback: "You truncated instead of rounding up.", misconceptionId: "E-d9-a" },
        { text: "8.4", correct: false, feedback: "You only rounded, forgot to add.", misconceptionId: "E-d9-b" },
        { text: "8.896", correct: false, feedback: "You used the original number instead of the rounded one.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student drops the hundredths and thousandths digits without checking whether to round up, landing on 8.3 before adding 0.5.",
        rootCause: "Truncation Instead of Rounding — chops digits instead of applying the rounding rule.",
        remediation: "Check the hundredths digit (9) before rounding: since 9≥5, the tenths digit rounds UP from 3 to 4, giving 8.4, not 8.3."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student correctly rounds to 8.4 but forgets to add 0.5 as the second instruction.",
        rootCause: "Final-Step Omission — treats the rounded value as the complete answer.",
        remediation: "The question has two actions: round, THEN add 0.5 — both must be completed before answering."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student skips the rounding step entirely, adding 0.5 to the original unrounded value 8.396.",
        rootCause: "Instruction Skipping — ignores the explicit rounding instruction and uses the exact value instead.",
        remediation: "Perform the steps in the stated order: round FIRST, then use that ROUNDED value (not the original) in the addition."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest tenth", hint: "Check the hundredths digit (9) — round up." },
      { level: 2, description: "Confirm the rounded value", hint: "8.396 → 8.4." },
      { level: 3, description: "Add 0.5", hint: "8.4 + 0.5 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-05", probability: 0.3, condition: "Using an unrounded value in place of a required rounded intermediate recurs in multi-step estimation problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "C",
    skillId: "DECCONV-03",
    question: "Convert \\(\\frac{3}{8}\\) to a decimal, then multiply by 4.",
    options: [
        { text: "1.5", correct: true, feedback: "3/8=0.375. 0.375×4=1.5." },
        { text: "0.375", correct: false, feedback: "You forgot to multiply by 4.", misconceptionId: "E-d10-a" },
        { text: "1.2", correct: false, feedback: "Incorrect multiplication.", misconceptionId: "E-d10-b" },
        { text: "1.6", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student correctly converts 3/8 to 0.375 but stops before multiplying by 4.",
        rootCause: "Final-Step Omission — treats the conversion as the complete answer.",
        remediation: "The question requires both 'convert' AND 'multiply by 4' — complete both actions before answering."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student makes an error multiplying 0.375 by 4, undershooting the correct product.",
        rootCause: "Decimal Multiplication Computation Error — miscalculates 0.375 × 4.",
        remediation: "Multiply as whole numbers first (375 × 4 = 1500), then place the decimal point back (three places from the right): 1.500 = 1.5."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student makes a different multiplication error, overshooting the correct product slightly.",
        rootCause: "Decimal Multiplication Computation Error — a different miscalculation of 0.375 × 4.",
        remediation: "Break the multiplication into parts: 0.375 × 4 = 0.375 × 2 × 2 = 0.75 × 2 = 1.5 — verify each doubling step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert the fraction", hint: "3 ÷ 8 = 0.375." },
      { level: 2, description: "Set up the multiplication", hint: "0.375 × 4." },
      { level: 3, description: "Multiply", hint: "Try doubling twice: 0.375×2=0.75, then 0.75×2=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.4"]
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "C",
    skillId: "DECADDSUB-04",
    question: "9.3 - 4.56 + 1.7 = ?",
    options: [
        { text: "6.44", correct: true, feedback: "9.30-4.56=4.74; +1.70=6.44." },
        { text: "6.54", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d11-a" },
        { text: "5.44", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-b" },
        { text: "7.44", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student makes a small borrowing slip in the subtraction step, landing 0.1 above the correct intermediate value.",
        rootCause: "Subtraction Borrowing Error — mishandles regrouping in 9.30 - 4.56.",
        remediation: "Align 9.30 and 4.56 by decimal place and subtract column by column from the right, borrowing carefully across the tenths and ones columns."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student makes a larger subtraction error, landing 1.0 below the correct intermediate value.",
        rootCause: "Subtraction Computation Error — a bigger miscalculation in 9.3 - 4.56.",
        remediation: "Verify the subtraction by adding back: your result plus 4.56 should equal 9.3 — check this before adding 1.7."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student adds 4.56 instead of subtracting it, treating both operations in the expression as addition.",
        rootCause: "Operation Sign Misread — ignores the minus sign and adds all three numbers.",
        remediation: "Read the operators carefully left to right: 9.3 MINUS 4.56 PLUS 1.7 — the minus sign means subtract only 4.56, not add it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract first", hint: "9.30 - 4.56 = ?" },
      { level: 2, description: "Check your subtraction", hint: "Add 4.56 back to your result — does it equal 9.3?" },
      { level: 3, description: "Add the last term", hint: "Your subtraction result + 1.7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "C",
    skillId: "DECMUL10-03",
    question: "4.5 ÷ 1000 = ?",
    options: [
        { text: "0.0045", correct: true, feedback: "Move decimal three places left." },
        { text: "0.045", correct: false, feedback: "That's ÷100.", misconceptionId: "E-d12-a" },
        { text: "4.5", correct: false, feedback: "No operation performed.", misconceptionId: "E-d12-b" },
        { text: "4500", correct: false, feedback: "You multiplied instead of dividing.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student shifts the decimal point only two places instead of three, applying a ÷100 shift instead of ÷1000.",
        rootCause: "Power-of-Ten Shift Miscount — doesn't match the number of shift-places to the zeros in the divisor.",
        remediation: "Count the zeros in 1000 (three zeros) — the decimal point must move exactly that many places to the left."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student leaves the number unchanged, performing no division at all.",
        rootCause: "Operation Omitted — doesn't apply any shift to the decimal point.",
        remediation: "Dividing by 1000 is not optional — the decimal point must move three places left, changing the value of the number."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student moves the decimal point right instead of left, applying the inverse (multiplication) operation.",
        rootCause: "Multiplication/Division Direction Confusion — reverses the direction of the decimal shift.",
        remediation: "Dividing by a power of ten moves the decimal point LEFT (making the number smaller); multiplying moves it right."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in 1000", hint: "Three zeros." },
      { level: 2, description: "Determine shift direction", hint: "Dividing moves the decimal point LEFT." },
      { level: 3, description: "Shift", hint: "Move the decimal point three places left in 4.5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "H",
    skillId: "DECPLACE-04",
    question: "Write the decimal for 2 ones + 3 tenths + 5 thousandths. Then add 0.04 to it.",
    options: [
        { text: "2.345", correct: true, feedback: "Number = 2.305. +0.04 = 2.345." },
        { text: "2.305", correct: false, feedback: "You forgot to add 0.04.", misconceptionId: "E-d13-a" },
        { text: "2.35", correct: false, feedback: "Misplaced digits.", misconceptionId: "E-d13-b" },
        { text: "2.309", correct: false, feedback: "You added 0.004 instead of 0.04.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student correctly builds the number 2.305 but stops before adding 0.04.",
        rootCause: "Final-Step Omission — treats the number-building step as the complete answer.",
        remediation: "The question has two parts: 'write the decimal' AND 'then add 0.04' — complete both actions."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student places the thousandths digit (5) in the hundredths column instead, since no hundredths value was named, building 2.35 instead of 2.305.",
        rootCause: "Column Shift Error — slides the thousandths digit into the hundredths column, since hundredths wasn't explicitly named.",
        remediation: "Build the number column by column: ones=2, tenths=3, hundredths=0 (unnamed, so zero), thousandths=5 — write all four columns explicitly."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student correctly builds 2.305 but adds 0.004 instead of 0.04, misreading the value to add.",
        rootCause: "Wrong Decimal Place Added — misreads '0.04' as '0.004', adding to the wrong column.",
        remediation: "Confirm the value to add by reading it carefully: 0.04 means 4 HUNDREDTHS, not 4 thousandths."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Build the number column by column", hint: "Ones=2, tenths=3, hundredths=0 (not named), thousandths=5." },
      { level: 2, description: "Assemble", hint: "2.305." },
      { level: 3, description: "Add 0.04", hint: "2.305 + 0.040 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    skillId: "DECCOMP-03",
    question: "A number is between 2.4 and 2.5. Its hundredths digit is 7. What is the smallest possible number with three decimal places?",
    options: [
        { text: "2.470", correct: true, feedback: "Smallest between 2.4 and 2.5 with hundredths 7 is 2.470." },
        { text: "2.407", correct: false, feedback: "Hundredths digit here is 0, not 7.", misconceptionId: "E-d14-a" },
        { text: "2.471", correct: false, feedback: "Larger than 2.470.", misconceptionId: "E-d14-b" },
        { text: "2.417", correct: false, feedback: "Hundredths digit here is 1, not 7.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student swaps the hundredths and thousandths digits, placing 7 in the thousandths place instead of hundredths.",
        rootCause: "Column Swap Error — misassigns which named value goes in which place-value column.",
        remediation: "The question specifies the HUNDREDTHS digit is 7 — that's the SECOND decimal digit, not the third."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student correctly places 7 in hundredths but doesn't minimise the thousandths digit, picking 1 instead of the smallest possible (0).",
        rootCause: "Minimum-Value Search Incomplete — doesn't choose the smallest available digit for the unconstrained column.",
        remediation: "To make the SMALLEST number, any unconstrained digit (like the thousandths digit here) should be the smallest possible value: 0."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student places 7 in the thousandths place and uses the wrong hundredths digit (1), violating the stated hundredths condition.",
        rootCause: "Column Swap Error combined with Constraint Violation — misplaces the given digit entirely.",
        remediation: "Re-read: the hundredths digit MUST be 7 — check that your number's SECOND decimal digit is exactly 7 before minimising the rest."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the tenths digit from the range", hint: "Between 2.4 and 2.5 means tenths digit = 4." },
      { level: 2, description: "Apply the given hundredths digit", hint: "Hundredths = 7." },
      { level: 3, description: "Minimise the thousandths digit", hint: "To make the number smallest, use the smallest possible thousandths digit: 0." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "H",
    skillId: "DECROUND-05",
    question: "A number rounded to the nearest hundredth is 5.63. The thousandths digit is 8. What is the number?",
    options: [
        { text: "5.628", correct: true, feedback: "5.625-5.634 range, thousandths 8 → 5.628." },
        { text: "5.638", correct: false, feedback: "That rounds to 5.64.", misconceptionId: "E-d15-a" },
        { text: "5.624", correct: false, feedback: "Thousandths digit is 4, not 8.", misconceptionId: "E-d15-b" },
        { text: "5.632", correct: false, feedback: "Thousandths digit is 2, not 8.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student picks a number with thousandths digit 8 but outside the correct rounding range, since it actually rounds to 5.64, not 5.63.",
        rootCause: "Range Boundary Neglect — satisfies the thousandths-digit clue while not checking the number actually rounds to 5.63.",
        remediation: "Find the valid rounding RANGE first (5.625 to 5.634), then search WITHIN that range for a number with thousandths digit 8."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student picks a number in the correct range but with the wrong thousandths digit (4 instead of 8).",
        rootCause: "Constraint Verification Skipped — doesn't check the thousandths digit of the final candidate against the stated clue.",
        remediation: "After finding the rounding range, explicitly check the thousandths digit of your candidate matches the stated value of 8."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student picks a number in the correct range but with the wrong thousandths digit (2 instead of 8).",
        rootCause: "Constraint Verification Skipped — same pattern, a different mismatched thousandths digit.",
        remediation: "Within the range 5.625-5.634, only ONE number has thousandths digit exactly 8 — find that specific value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the rounding range", hint: "Rounds to 5.63 → between 5.625 and 5.635 (exclusive)." },
      { level: 2, description: "Narrow using the thousandths digit", hint: "Within that range, which number has thousandths digit 8?" },
      { level: 3, description: "Confirm", hint: "5.628 — is it in the range and does its thousandths digit match?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-06", probability: 0.4, condition: "Difficulty combining a rounding-range constraint with a specific digit clue signals struggles with tolerance/precision problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "T",
    skillId: "DECCONV-01",
    question: "Which fraction is equal to 0.625?",
    options: [
        { text: "\\(\\frac{5}{8}\\)", correct: true, feedback: "5/8 = 0.625." },
        { text: "\\(\\frac{3}{4}\\)", correct: false, feedback: "3/4 = 0.75.", misconceptionId: "E-d16-a" },
        { text: "\\(\\frac{5}{6}\\)", correct: false, feedback: "5/6 ≈ 0.833.", misconceptionId: "E-d16-b" },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "4/7 ≈ 0.571.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student picks a familiar fraction (3/4) without verifying its decimal value actually matches 0.625.",
        rootCause: "Familiar-Fraction Guessing — selects a commonly memorised fraction instead of computing or checking the actual value.",
        remediation: "Always verify by dividing the numerator by the denominator: 3 ÷ 4 = 0.75, which does not match 0.625 — this rules the option out."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks 5/6, perhaps confusing the denominator 8 with 6, without checking the actual decimal value.",
        rootCause: "Denominator Misreading — swaps the target denominator for a similar-looking one.",
        remediation: "Compute 5 ÷ 6 to check: it gives approximately 0.833, not 0.625 — verify each candidate by actual division."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks 4/7, a fraction with no clean decimal relationship to 0.625, likely guessing without computing.",
        rootCause: "Verification Skipped — picks an option without dividing to check.",
        remediation: "Convert 0.625 to eighths directly: 0.625 = 625/1000 = 5/8 — recognise 8 as the denominator that gives eighths of 0.125 each (1/8=0.125, so 5/8=0.625)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall eighths as decimals", hint: "1/8 = 0.125, so multiples of 0.125 are eighths." },
      { level: 2, description: "Find the multiple", hint: "0.625 ÷ 0.125 = 5." },
      { level: 3, description: "Write the fraction", hint: "5 × (1/8) = 5/8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    skillId: "DECADDSUB-05",
    question: "(3.6 - 1.25) + (4.7 - 2.8) = ?",
    options: [
        { text: "4.25", correct: true, feedback: "3.6-1.25=2.35; 4.7-2.8=1.9; sum=4.25." },
        { text: "4.15", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-a" },
        { text: "5.25", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "3.25", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student makes a small borrowing slip in one of the two bracket subtractions, landing 0.1 below the correct total.",
        rootCause: "Subtraction Borrowing Error — mishandles regrouping in one of the bracket calculations.",
        remediation: "Verify each bracket separately: 3.6-1.25 should equal 2.35, and 4.7-2.8 should equal 1.9 — check both before adding."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student makes a carrying error in the final addition, landing 1.0 above the correct total.",
        rootCause: "Addition Carry Error — mishandles carrying when adding 2.35 + 1.9.",
        remediation: "Align 2.35 and 1.90 by decimal place and add column by column from the right, carrying properly to the ones place."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student makes a larger computational error in one bracket, landing 1.0 below the correct total.",
        rootCause: "Bracket Subtraction Computation Error — a bigger miscalculation in one of the two brackets.",
        remediation: "Redo each bracket subtraction from scratch, aligning decimal points carefully, before combining the two results."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Solve the first bracket", hint: "3.6 - 1.25 = ?" },
      { level: 2, description: "Solve the second bracket", hint: "4.7 - 2.8 = ?" },
      { level: 3, description: "Add the two results", hint: "2.35 + 1.9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10, tier: "H",
    skillId: "DECMUL10-04",
    question: "A number divided by 100 gives 0.034. What is the number multiplied by 10?",
    options: [
        { text: "34", correct: true, feedback: "Original = 3.4. ×10 = 34." },
        { text: "3.4", correct: false, feedback: "That's the original number, not ×10.", misconceptionId: "E-d18-a" },
        { text: "0.34", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "340", correct: false, feedback: "Too large.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly finds the original number (3.4) but stops before multiplying by 10.",
        rootCause: "Final-Step Omission — treats the reversed value as the complete answer.",
        remediation: "The question asks for the original number MULTIPLIED BY 10, not just the original number — complete the final step."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student uses the given result (0.034) instead of reversing the division first, and then may apply the ×10 incorrectly to it.",
        rootCause: "Working-Backwards Skipped — doesn't recognise that 0.034 is the END result, not the starting number.",
        remediation: "The question says the number DIVIDED BY 100 GIVES 0.034 — multiply 0.034 by 100 first to find the original number (3.4), then by 10."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student multiplies the original number by 100 instead of 10, overshooting by a factor of 10.",
        rootCause: "Wrong Multiplier Applied — confuses the requested multiplier (10) with the divisor used earlier (100).",
        remediation: "Re-read the final instruction carefully — it asks to multiply by 10, not 100 — 3.4 × 10 shifts the decimal one place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Reverse the division", hint: "0.034 × 100 = 3.4." },
      { level: 2, description: "Apply the new multiplication", hint: "Now multiply 3.4 by 10." },
      { level: 3, description: "Shift the decimal point", hint: "Multiplying by 10 moves the decimal one place right: 3.4 → 34." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d19", order: 19, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "T",
    skillId: "DECROUND-03",
    question: "A number rounded to the nearest whole number is 10. The tenths digit is 4. What could be the number? (Two decimal places, hundredths digit 5)",
    options: [
        { text: "10.45", correct: true, feedback: "10.45 rounds to 10 (tenths 4<5). Tenths 4, hundredths 5." },
        { text: "9.45", correct: false, feedback: "9.45 rounds to 9, not 10.", misconceptionId: "E-d19-a" },
        { text: "10.54", correct: false, feedback: "Tenths digit is 5, not 4; also rounds to 11.", misconceptionId: "E-d19-b" },
        { text: "9.54", correct: false, feedback: "Its tenths digit is 5, not 4.", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student satisfies the digit conditions (tenths=4, hundredths=5) but picks a whole-number part that doesn't round to 10.",
        rootCause: "Constraint Omission — matches the digit clues while ignoring the whole-number rounding requirement.",
        remediation: "Check ALL conditions together: the number must round to 10 AND have tenths digit 4 AND hundredths digit 5 — verify each separately."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student swaps the tenths and hundredths digits, producing a number with tenths digit 5 instead of 4.",
        rootCause: "Digit Order Reversal — swaps which digit goes in the tenths vs. hundredths column.",
        remediation: "Assign digits to their named columns exactly: 'tenths digit is 4' means the FIRST decimal digit is 4, not the second."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student both swaps the digits AND picks a whole-number part that doesn't round to 10.",
        rootCause: "Digit Order Reversal combined with Constraint Omission — two compounded errors.",
        remediation: "Work through each condition one at a time: first fix the whole number so it rounds to 10, then place tenths=4, then hundredths=5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Determine the whole-number range", hint: "Rounds to 10 means the number is between 9.5 and 10.5." },
      { level: 2, description: "Apply the tenths digit", hint: "Tenths digit is 4 — this fits within 9.5-10.5 only near 10." },
      { level: 3, description: "Apply the hundredths digit", hint: "Hundredths digit is 5 — assemble the full number." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-06", probability: 0.3, condition: "Difficulty combining multiple digit constraints with a rounding condition recurs in tolerance/precision problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    skillId: "DECCOMP-01",
    question: "Which list is in ascending order? A) 0.6, 0.56, 0.65; B) 0.56, 0.6, 0.65; C) 0.65, 0.6, 0.56; D) 0.56, 0.65, 0.6",
    options: [
        { text: "B", correct: true, feedback: "0.56 < 0.6 < 0.65." },
        { text: "A", correct: false, feedback: "Not correctly ordered.", misconceptionId: "E-d20-a" },
        { text: "C", correct: false, feedback: "That's descending.", misconceptionId: "E-d20-b" },
        { text: "D", correct: false, feedback: "Not correctly ordered.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student picks list A, where 0.6 comes before 0.56, not realising 0.6 (0.60) is actually larger than 0.56.",
        rootCause: "Digit-Count Bias — assumes 0.6 is smaller than 0.56 because it has fewer digits.",
        remediation: "Align all values to two decimal places: 0.60 vs 0.56 — 0.60 is larger, so it cannot come first in an ascending list."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student picks list C, which is actually in descending order, confusing ascending with descending.",
        rootCause: "Order Direction Reversal — confuses 'ascending' (smallest first) with 'descending' (largest first).",
        remediation: "'Ascending' means going UP in value, smallest to largest — check that each number in the list is bigger than the one before it."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student picks list D, where the order is inconsistent (0.65 appears before 0.6, breaking the ascending pattern).",
        rootCause: "Partial Ordering Check — verifies only some adjacent pairs in the list rather than all of them.",
        remediation: "Check EVERY adjacent pair in the list, not just the first one — a list is only ascending if ALL pairs increase in order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all values to two decimal places", hint: "0.60, 0.56, 0.65." },
      { level: 2, description: "Compare pairs", hint: "Which is smallest? Which is largest?" },
      { level: 3, description: "Match to a list", hint: "Which option lists them smallest to largest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "In 4.081, what digit is in the thousandths place?",
    options: [
        { text: "1", correct: true, feedback: "The thousandths place is the third decimal digit." },
        { text: "8", correct: false, feedback: "8 is in the hundredths place.", misconceptionId: "E-r1-a" },
        { text: "0", correct: false, feedback: "0 is in the tenths place.", misconceptionId: "E-r1-b" },
        { text: "4", correct: false, feedback: "4 is in the ones place.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student names the hundredths digit (8) instead of the thousandths digit.",
        rootCause: "Column Miscounting — counts one column short when identifying place value.",
        remediation: "Count columns from the decimal point outward: 1st = tenths, 2nd = hundredths, 3rd = thousandths — land on the 3rd column."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student names the tenths digit (0) instead of the thousandths digit.",
        rootCause: "Column Miscounting — counts two columns short, mistaking the first decimal digit for the third.",
        remediation: "In 4.081, the digits after the point in order are 0 (tenths), 8 (hundredths), 1 (thousandths) — count carefully to the third."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student names the ones digit (4) instead of a decimal place value entirely.",
        rootCause: "Decimal Point Reference Confusion — doesn't use the decimal point as the anchor, looking at whole-number digits instead.",
        remediation: "All decimal place values (tenths, hundredths, thousandths) are to the RIGHT of the decimal point — the ones digit (4) is to the left and doesn't count."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the decimal point", hint: "Find the point in 4.081." },
      { level: 2, description: "Count three columns right", hint: "1st=tenths(0), 2nd=hundredths(8), 3rd=thousandths(?)." },
      { level: 3, description: "Read the digit", hint: "What digit is in the third column?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is larger? 0.88 or 0.808",
    options: [
        { text: "0.88", correct: true, feedback: "0.88 = 0.880 > 0.808." },
        { text: "0.808", correct: false, feedback: "0.808 is smaller.", misconceptionId: "E-r2-a" },
        { text: "Equal", correct: false, feedback: "0.880 ≠ 0.808.", misconceptionId: "E-r2-b" },
        { text: "Cannot compare", correct: false, feedback: "Add zeros and compare.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student assumes 0.808 is larger than 0.88 because it has more digits.",
        rootCause: "Digit-Count Bias — believes more decimal digits always means a larger value.",
        remediation: "Rewrite 0.88 as 0.880 (adding a trailing zero doesn't change its value) — now compare 0.880 to 0.808 digit by digit."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student believes 0.88 and 0.808 are equal because they look similar or both start with '8'.",
        rootCause: "Approximate Equality Assumption — treats visually similar decimals as identical without precise comparison.",
        remediation: "Align both to three decimal places (0.880 vs 0.808) and compare each digit column — the hundredths digits (8 vs 0) differ, so they are not equal."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student believes a two-decimal-place number and a three-decimal-place number cannot be directly compared.",
        rootCause: "Unlike-Length Comparison Avoidance — doesn't realise trailing zeros can be added to match decimal-place counts.",
        remediation: "Any decimal can be extended with trailing zeros without changing its value: 0.88 = 0.880 — this makes direct comparison always possible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 0.88 as 0.880." },
      { level: 2, description: "Compare column by column", hint: "Hundredths: 8 vs 0." },
      { level: 3, description: "Decide", hint: "8 hundredths is more than 0 hundredths." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-02",
    question: "Round 6.095 to the nearest hundredth.",
    options: [
        { text: "6.10", correct: true, feedback: "Thousandths 5 → round up hundredths 9 to 10, carry to tenths." },
        { text: "6.09", correct: false, feedback: "You did not round up.", misconceptionId: "E-r3-a" },
        { text: "6.1", correct: false, feedback: "That's the correct value but not fully written to hundredths precision.", misconceptionId: "E-r3-b" },
        { text: "6.095", correct: false, feedback: "Unchanged; rounding must be applied.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student truncates instead of rounding up, missing that the thousandths digit (5) requires rounding the hundredths digit up.",
        rootCause: "Truncation Instead of Rounding — chops off the thousandths digit without applying the round-up rule.",
        remediation: "Since the thousandths digit is 5, the hundredths digit must round UP — but 9 rounding up becomes 10, which carries into the tenths place."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student correctly computes the rounded value but writes it as 6.1 instead of 6.10, dropping the required hundredths-place precision.",
        rootCause: "Precision Notation Mismatch — doesn't retain two decimal places as 'nearest hundredth' requires.",
        remediation: "Rounding to the nearest HUNDREDTH means the answer must show exactly two decimal digits — write 6.10, not the shortened 6.1."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student leaves the number unchanged, not applying any rounding at all.",
        rootCause: "Rounding Action Omitted — doesn't perform the rounding decision.",
        remediation: "Rounding always requires a decision based on the digit past the target place — here, the thousandths digit 5 forces a carry."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the thousandths digit", hint: "It's 5, so round the hundredths digit up." },
      { level: 2, description: "Handle the carry", hint: "Hundredths digit 9 + 1 = 10 — this carries into the tenths place." },
      { level: 3, description: "Write the full result", hint: "Tenths 0+1=1, hundredths becomes 0: 6.10." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-05", probability: 0.35, condition: "Difficulty handling a carry during rounding recurs whenever a rounded digit is 9." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-01",
    question: "Convert \\(\\frac{2}{5}\\) to a decimal.",
    options: [
        { text: "0.4", correct: true, feedback: "2/5 = 4/10 = 0.4." },
        { text: "0.2", correct: false, feedback: "That's 1/5, not 2/5.", misconceptionId: "E-r4-a" },
        { text: "0.5", correct: false, feedback: "That's 1/2.", misconceptionId: "E-r4-b" },
        { text: "2.5", correct: false, feedback: "That's the reciprocal 5/2.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student writes the numerator directly as a decimal digit (0.2), effectively dividing by the wrong denominator equivalent.",
        rootCause: "Numerator-as-Decimal-Digit Shortcut — mistakenly treats the numerator alone as the decimal value.",
        remediation: "Convert by finding an equivalent fraction with denominator 10: 2/5 = 4/10 (multiply top and bottom by 2) = 0.4."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student confuses 2/5 with 1/2, perhaps because both fractions 'feel like half'.",
        rootCause: "Familiar-Fraction Substitution — swaps the given fraction for a more familiar one with a similar-looking numerator/denominator relationship.",
        remediation: "Divide the exact numbers given: 2 ÷ 5 = 0.4 — do not substitute a different, more familiar fraction."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student computes the reciprocal (5/2=2.5) instead of the fraction as given (2/5).",
        rootCause: "Numerator/Denominator Swap — inverts the fraction before converting.",
        remediation: "Keep the numerator and denominator in their original positions: 2/5 means 2 divided by 5, not 5 divided by 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find an equivalent tenths fraction", hint: "Multiply numerator and denominator by 2: 2/5 = 4/10." },
      { level: 2, description: "Convert to decimal", hint: "4/10 has one decimal place." },
      { level: 3, description: "Write it", hint: "4 tenths = 0.?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-02",
    question: "7.6 - 2.78 = ?",
    options: [
        { text: "4.82", correct: true, feedback: "7.60 - 2.78 = 4.82." },
        { text: "4.22", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r5-a" },
        { text: "5.82", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-b" },
        { text: "5.22", correct: false, feedback: "Incorrect.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student mishandles borrowing across two columns, landing 0.6 below the correct answer.",
        rootCause: "Subtraction Borrowing Error — mishandles the double regrouping needed when subtracting 2.78 from 7.60.",
        remediation: "Rewrite 7.6 as 7.60, then subtract column by column from the right, borrowing from the tenths and ones columns as needed."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student subtracts only the hundredths digit correctly but fails to borrow properly for the tenths column, landing 1.0 too high.",
        rootCause: "Subtraction Borrowing Error — a larger regrouping mistake.",
        remediation: "Verify by adding back: your result plus 2.78 should equal 7.6 — check this before finalising your answer."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes a partial borrowing error, landing 0.4 above the correct answer.",
        rootCause: "Subtraction Borrowing Error — an intermediate-severity regrouping mistake.",
        remediation: "Line up 7.60 and 2.78 by decimal place, and work through the subtraction from the rightmost column, borrowing carefully at each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Rewrite 7.6 as 7.60." },
      { level: 2, description: "Subtract hundredths with borrowing", hint: "0 - 8 needs a borrow from the tenths column." },
      { level: 3, description: "Continue through tenths and ones", hint: "Keep borrowing as needed across the remaining columns." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-01",
    question: "0.03 × 1000 = ?",
    options: [
        { text: "30", correct: true, feedback: "Move decimal three places right." },
        { text: "3", correct: false, feedback: "That's ×100.", misconceptionId: "E-r6-a" },
        { text: "300", correct: false, feedback: "That's ×10000.", misconceptionId: "E-r6-b" },
        { text: "0.00003", correct: false, feedback: "You divided instead of multiplied.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student shifts the decimal point only two places instead of three, applying a ×100 shift instead of ×1000.",
        rootCause: "Power-of-Ten Shift Miscount — doesn't match the number of shift-places to the zeros in the multiplier.",
        remediation: "Count the zeros in 1000 (three zeros) — the decimal point must move exactly that many places to the right."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student shifts the decimal point four places instead of three, applying a ×10000 shift instead of ×1000.",
        rootCause: "Power-of-Ten Shift Miscount — overcounts the number of shift-places.",
        remediation: "1000 has three zeros, so shift the decimal point exactly three places right: 0.03 → 30, not 300."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student moves the decimal point left instead of right, applying the inverse (division) operation.",
        rootCause: "Multiplication/Division Direction Confusion — reverses the direction of the decimal shift.",
        remediation: "Multiplying by a power of ten moves the decimal point RIGHT (making the number bigger); dividing moves it left."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in 1000", hint: "Three zeros." },
      { level: 2, description: "Determine shift direction", hint: "Multiplying moves the decimal point RIGHT." },
      { level: 3, description: "Shift", hint: "Move the decimal point three places right in 0.03." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-03",
    question: "Write 0.506 in expanded form.",
    options: [
        { text: "\\(\\frac{5}{10} + \\frac{6}{1000}\\)", correct: true, feedback: "5 tenths, 0 hundredths, 6 thousandths." },
        { text: "\\(\\frac{5}{10} + \\frac{6}{100}\\)", correct: false, feedback: "That would be 0.56, not 0.506.", misconceptionId: "E-r7-a" },
        { text: "\\(\\frac{5}{100} + \\frac{6}{1000}\\)", correct: false, feedback: "5 is in the tenths place, not hundredths.", misconceptionId: "E-r7-b" },
        { text: "\\(5 + \\frac{6}{100}\\)", correct: false, feedback: "Missing the tenths digit 5 and wrong place for 6.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student ignores the zero in the hundredths place, treating the 6 as if it were in the hundredths column rather than thousandths.",
        rootCause: "Silent-Zero Skipping — skips over a zero digit instead of counting it as an occupied place-value column.",
        remediation: "In 0.506, the hundredths digit IS 0 (not skipped) — the 6 comes AFTER that zero, making it the thousandths digit."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student misplaces the 5 in the hundredths position instead of tenths, shifting every digit one column over.",
        rootCause: "Column Shift Error — misreads which column the first digit belongs to.",
        remediation: "The FIRST digit after the decimal point is always tenths — in 0.506, that first digit is 5, so it belongs in the tenths column."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student drops the tenths digit (5) entirely and misplaces the 6 in hundredths instead of thousandths.",
        rootCause: "Digit Omission combined with Column Shift Error — two compounded errors in reading the number's structure.",
        remediation: "Write out ALL three decimal digits of 0.506 in order — tenths(5), hundredths(0), thousandths(6) — before forming the expanded form."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each digit's place", hint: "0.506: tenths=5, hundredths=0, thousandths=6." },
      { level: 2, description: "Note the zero", hint: "The hundredths digit is 0, so it contributes nothing to the expanded form." },
      { level: 3, description: "Write the expanded form", hint: "5/10 (tenths) + 6/1000 (thousandths)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Arrange in ascending order: 1.2, 1.02, 1.002, 1.22",
    options: [
        { text: "1.002, 1.02, 1.2, 1.22", correct: true, feedback: "1.002 < 1.020 < 1.200 < 1.220." },
        { text: "1.02, 1.002, 1.2, 1.22", correct: false, feedback: "1.002 is smaller than 1.02.", misconceptionId: "E-r8-a" },
        { text: "1.2, 1.22, 1.02, 1.002", correct: false, feedback: "That's descending.", misconceptionId: "E-r8-b" },
        { text: "1.002, 1.2, 1.02, 1.22", correct: false, feedback: "1.02 is smaller than 1.2.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student swaps 1.02 and 1.002, believing the longer decimal (1.002) is larger because it has more digits.",
        rootCause: "Digit-Count Bias — assumes more decimal digits means a larger value.",
        remediation: "Align both to three decimal places: 1.020 vs 1.002 — comparing hundredths digits (2 vs 0) shows 1.002 is smaller."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student arranges the numbers in descending order instead of ascending.",
        rootCause: "Order Direction Reversal — confuses ascending with descending.",
        remediation: "'Ascending' means smallest FIRST, increasing to largest — recheck the direction word before arranging."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student places 1.2 too early, not realising 1.02 (which has a smaller hundredths digit) should come before it.",
        rootCause: "Digit-Count Bias — misjudges 1.02 as larger than 1.2 due to the extra digit, reversing their true order.",
        remediation: "Align 1.02 as 1.020 and 1.2 as 1.200 — comparing hundredths digits (2 vs 0) shows 1.02 is actually smaller than 1.2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all to three decimal places", hint: "1.200, 1.020, 1.002, 1.220." },
      { level: 2, description: "Compare tenths digits first", hint: "All have tenths digit 0 or 2 — check each carefully." },
      { level: 3, description: "Rank smallest to largest", hint: "Order by hundredths and thousandths digits where tenths tie." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "Round 9.854 to the nearest tenth, then multiply by 10.",
    options: [
        { text: "99", correct: true, feedback: "9.854 → 9.9. ×10 = 99." },
        { text: "98.5", correct: false, feedback: "You multiplied the original number instead of the rounded one.", misconceptionId: "E-r9-a" },
        { text: "9.9", correct: false, feedback: "You only rounded, forgot to multiply.", misconceptionId: "E-r9-b" },
        { text: "990", correct: false, feedback: "You multiplied by 100 instead of 10.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student skips the rounding step, multiplying the exact original value (9.854) by 10 instead of the rounded value (9.9).",
        rootCause: "Instruction Skipping — ignores an explicit intermediate step (rounding).",
        remediation: "Perform the steps in the stated order: round FIRST, then multiply the ROUNDED value (not the original) by 10."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student correctly rounds to 9.9 but stops before multiplying by 10.",
        rootCause: "Final-Step Omission — treats the rounded value as the final answer.",
        remediation: "The question has two actions: round, THEN multiply by 10 — check both are completed before answering."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student multiplies by 100 instead of 10, adding an extra zero to the final answer.",
        rootCause: "Wrong Multiplier Applied — confuses the requested multiplier (10) with a different power of ten.",
        remediation: "Re-read the instruction — it says 'multiply by 10', not 100 — 9.9 × 10 shifts the decimal point just one place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round to the nearest tenth", hint: "Hundredths digit is 5, so round up: 9.9." },
      { level: 2, description: "Confirm the rounded value", hint: "9.854 → 9.9." },
      { level: 3, description: "Multiply by 10", hint: "9.9 × 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r10", order: 10, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-03",
    question: "72 ÷ 100 = ?",
    options: [
        { text: "0.72", correct: true, feedback: "Move decimal two places left." },
        { text: "7.2", correct: false, feedback: "That's ÷10.", misconceptionId: "E-r10-a" },
        { text: "7200", correct: false, feedback: "You multiplied instead of dividing.", misconceptionId: "E-r10-b" },
        { text: "0.072", correct: false, feedback: "That's ÷1000.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student shifts the decimal point only one place instead of two, applying a ÷10 shift instead of ÷100.",
        rootCause: "Power-of-Ten Shift Miscount — doesn't match the number of shift-places to the zeros in the divisor.",
        remediation: "Count the zeros in 100 (two zeros) — the decimal point must move exactly that many places to the left."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student moves the decimal point right instead of left, applying the inverse (multiplication) operation.",
        rootCause: "Multiplication/Division Direction Confusion — reverses the direction of the decimal shift.",
        remediation: "Dividing by a power of ten moves the decimal point LEFT (making the number smaller); multiplying moves it right."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student shifts the decimal point three places instead of two, applying a ÷1000 shift instead of ÷100.",
        rootCause: "Power-of-Ten Shift Miscount — overcounts the number of shift-places.",
        remediation: "100 has two zeros, so shift the decimal point exactly two places left: 72 → 0.72, not 0.072."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in 100", hint: "Two zeros." },
      { level: 2, description: "Determine shift direction", hint: "Dividing moves the decimal point LEFT." },
      { level: 3, description: "Shift", hint: "Move the decimal point two places left in 72 (i.e. 72.0)." }
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
    title: "Decimals — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every decimals cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '',
    timedSeconds: 25 * 60
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

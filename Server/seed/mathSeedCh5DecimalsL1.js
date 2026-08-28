// seed/mathSeedCh5DecimalsL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 5
// (Decimals), Level 1 — converted from the standalone HTML file
// ch-5-decimals-level-1.html.
//
// Run with: node seed/mathSeedCh5DecimalsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-5-decimals";
const CHAPTER_NAME = "Decimals";
const LEVEL = 1;

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
    question: "In 3.57, what digit is in the tenths place?",
    options: [
        { text: "5", correct: true, feedback: "The first digit after the decimal point is tenths, so 5." },
        { text: "3", correct: false, feedback: "3 is in the ones place.", misconceptionId: "E-w1-a" },
        { text: "7", correct: false, feedback: "7 is in the hundredths place.", misconceptionId: "E-w1-b" },
        { text: "0", correct: false, feedback: "There is no 0 in the tenths place.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "The tenths place is the first digit to the right of the decimal point.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers 3, the ones digit.",
        rootCause: "Wrong Side of Decimal — picks the digit immediately to the LEFT of the decimal point instead of the first digit to its right.",
        remediation: "Point directly at the decimal point and name the digit immediately to its right — that is always the tenths digit, never a digit before it."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 7, the hundredths digit.",
        rootCause: "Adjacent-Column Slip — picks the digit one column too far right, landing on hundredths instead of tenths.",
        remediation: "Count columns explicitly from the decimal point: 1st = tenths, 2nd = hundredths — check which count applies before answering."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 0, a digit not present in the number at all.",
        rootCause: "Fabricated Digit — assumes a placeholder zero exists in the tenths position without actually reading the number as written.",
        remediation: "Read the decimal digit by digit from left to right (3, point, 5, 7) before naming any place value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the decimal point", hint: "Locate the decimal point in 3.57." },
      { level: 2, description: "Identify the first digit after it", hint: "The digit immediately to the right of the decimal point is 5." },
      { level: 3, description: "Name the place", hint: "The first digit after the decimal point is always the tenths place." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCOMP-01", probability: 0.5, condition: "If not remediated before comparing decimals digit by digit." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is larger? 0.6 or 0.59",
    options: [
        { text: "0.6", correct: true, feedback: "Write both with two decimal places: 0.60 > 0.59." },
        { text: "0.59", correct: false, feedback: "More digits doesn't mean larger; 0.59 is smaller.", misconceptionId: "E-w2-a" },
        { text: "They are equal", correct: false, feedback: "0.60 ≠ 0.59.", misconceptionId: "E-w2-b" },
        { text: "Cannot compare", correct: false, feedback: "They can be compared by adding a zero to 0.6.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Write both numbers with the same number of decimal places, then compare.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student picks 0.59, the number with more decimal digits.",
        rootCause: "More-Digits-Means-Bigger — treats a decimal with more digits after the point as automatically larger, the way a whole number with more digits is larger (e.g. 59 > 6), which does NOT transfer to decimals.",
        remediation: "Pad the shorter decimal with a trailing zero (0.6 → 0.60) so both have the same number of decimal places, then compare digit by digit — this breaks the false 'more digits = bigger' intuition."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 'They are equal'.",
        rootCause: "Visual Similarity — sees both numbers start with '0.5' or '0.6' and assumes they represent the same value without checking the actual digits.",
        remediation: "Write both to the same number of decimal places (0.60 vs 0.59) and compare the hundredths digit directly: 0 vs 9."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 'Cannot compare'.",
        rootCause: "Unequal-Length Avoidance — assumes decimals with a different number of digits after the point can't be directly compared.",
        remediation: "Show that padding with trailing zeros never changes a decimal's value (0.6 = 0.60), so any two decimals can always be compared this way."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match the decimal places", hint: "Write 0.6 as 0.60 so both numbers have two decimal places." },
      { level: 2, description: "Compare digit by digit", hint: "Compare the tenths digits first: both are 6 and 5... wait, compare 0.60 and 0.59 tenths: 6 vs 5." },
      { level: 3, description: "Conclude", hint: "Since 6 > 5 in the tenths place, which number is larger?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-01", probability: 0.4, condition: "Comparing decimals correctly underlies deciding which way to round." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-01",
    question: "Round 4.73 to the nearest whole number.",
    options: [
        { text: "5", correct: true, feedback: "The tenths digit is 7 (≥5), so round up the ones digit from 4 to 5." },
        { text: "4", correct: false, feedback: "You truncated; the tenths digit 7 means you must round up.", misconceptionId: "E-w3-a" },
        { text: "4.7", correct: false, feedback: "That's rounding to the nearest tenth, not whole number.", misconceptionId: "E-w3-b" },
        { text: "47", correct: false, feedback: "The decimal point is not simply removed.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Look at the tenths digit. If it's 5 or more, increase the ones digit by 1.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 4, simply dropping everything after the decimal point.",
        rootCause: "Truncation Instead of Rounding — chops off the decimal part entirely rather than checking whether it's large enough to round the whole-number part up.",
        remediation: "Explicitly check the deciding digit (tenths) every time before dropping the decimal part — dropping without checking is truncation, not rounding."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 4.7, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest tenth instead of the nearest whole number, keeping one decimal digit when none should remain.",
        remediation: "Confirm the target place BEFORE rounding: 'nearest whole number' means the answer should have zero digits after the decimal point."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 47, treating the decimal point as removable.",
        rootCause: "Decimal-Point Removal — literally deletes the decimal point instead of rounding, conflating '4.73' with the digit string '473' shifted.",
        remediation: "Emphasise that the decimal point marks a real place-value boundary — removing it changes the number's magnitude entirely, it isn't a rounding operation at all."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place and the deciding digit", hint: "Rounding to the nearest whole number means looking at the tenths digit to decide." },
      { level: 2, description: "Check the deciding digit", hint: "The tenths digit in 4.73 is 7. Is 7 five or more?" },
      { level: 3, description: "Round accordingly", hint: "Since the tenths digit is 5 or more, round the ones digit up: 4 becomes 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECROUND-02", probability: 0.5, condition: "Rounding to other decimal places (tenths, hundredths) uses the same core rule." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-01",
    question: "Write \\(\\frac{7}{10}\\) as a decimal.",
    options: [
        { text: "0.7", correct: true, feedback: "Denominator 10 means one decimal place: 0.7." },
        { text: "7.0", correct: false, feedback: "That's 7, not 7/10.", misconceptionId: "E-w4-a" },
        { text: "0.07", correct: false, feedback: "That would be 7/100.", misconceptionId: "E-w4-b" },
        { text: "0.007", correct: false, feedback: "That's 7/1000.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "The denominator tells you how many decimal places: 10 means one place.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 7.0, placing the numerator before the decimal point.",
        rootCause: "Numerator-as-Whole-Number — writes the numerator (7) as if it were the whole-number part, ignoring that the fraction's value is less than 1.",
        remediation: "Since 7/10 is a proper fraction less than 1, the decimal must also be less than 1 — check that the whole-number part is 0."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers 0.07, placing the 7 one column too far right.",
        rootCause: "Wrong Number of Decimal Places — uses two decimal places (as if the denominator were 100) instead of one (matching the actual denominator, 10).",
        remediation: "Count the zeros in the denominator to determine decimal places: 10 has one zero → one decimal place."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 0.007, placing the 7 two columns too far right.",
        rootCause: "Wrong Number of Decimal Places — uses three decimal places instead of one, over-shifting the digit.",
        remediation: "Match the number of decimal places to the number of zeros in the denominator exactly: 10 → 1 place, 100 → 2 places, 1000 → 3 places."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in the denominator", hint: "10 has one zero." },
      { level: 2, description: "Use that as the number of decimal places", hint: "One zero means one digit after the decimal point." },
      { level: 3, description: "Place the numerator", hint: "Write 7 as the single digit after the decimal point: 0.?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECCONV-02", probability: 0.5, condition: "Fractions with denominator 100 or 1000 build directly on this same place-counting logic." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-01",
    question: "2.3 + 1.5 = ?",
    options: [
        { text: "3.8", correct: true, feedback: "Add the ones: 2+1=3; add the tenths: 3+5=8 → 3.8." },
        { text: "3.35", correct: false, feedback: "You added digits without aligning the decimal point.", misconceptionId: "E-w5-a" },
        { text: "2.8", correct: false, feedback: "You forgot to add the ones from 1.5.", misconceptionId: "E-w5-b" },
        { text: "3.0", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Align the decimal points and add each column, starting from the right.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 3.35, mixing digits from mismatched columns.",
        rootCause: "Misaligned Columns — adds the digits as if reading them left to right without lining up the decimal points, so tenths get combined with ones incorrectly.",
        remediation: "Write the numbers stacked with decimal points directly aligned before adding, exactly as with whole-number column addition."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 2.8, only combining the ones from one number and the tenths from both.",
        rootCause: "Dropped Whole-Number Part — adds the tenths correctly but forgets to include the '1' from 1.5's ones place.",
        remediation: "Add BOTH the ones column and the tenths column separately, checking that every digit from both numbers is included exactly once."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 3.0, dropping the decimal part entirely.",
        rootCause: "Whole-Number-Only Addition — adds only the whole-number parts (2+1=3) and ignores the tenths entirely.",
        remediation: "Add each column independently — ones with ones, tenths with tenths — and don't stop after just the whole-number column."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align the decimal points", hint: "Write 2.3 and 1.5 stacked with their decimal points lined up." },
      { level: 2, description: "Add the tenths column", hint: "3 tenths + 5 tenths = ?" },
      { level: 3, description: "Add the ones column", hint: "2 ones + 1 one = ?, then combine with the tenths result." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECADDSUB-02", probability: 0.6, condition: "Addition with carrying (e.g. tenths summing to 10 or more) builds directly on this alignment skill." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-01",
    question: "0.42 × 10 = ?",
    options: [
        { text: "4.2", correct: true, feedback: "Move the decimal point one place right → 4.2." },
        { text: "42", correct: false, feedback: "You moved the decimal point two places, which is ×100.", misconceptionId: "E-w6-a" },
        { text: "0.042", correct: false, feedback: "You moved the decimal point left.", misconceptionId: "E-w6-b" },
        { text: "0.420", correct: false, feedback: "The number didn't change.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Multiplying by 10 shifts the decimal point one place to the right.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 42, shifting the decimal point two places instead of one.",
        rootCause: "Shift-Count Overreach — moves the decimal point too many places, applying the ×100 shift amount to a ×10 problem.",
        remediation: "Match the number of shifts to the number of zeros in the multiplier: 10 has one zero → shift one place, not two."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 0.042, shifting the decimal point left instead of right.",
        rootCause: "Wrong Direction — moves the decimal point in the direction used for division, not multiplication.",
        remediation: "Anchor the rule with the effect: multiplying makes a number BIGGER, so the decimal point moves RIGHT; dividing makes it smaller, so it moves LEFT."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 0.420, leaving the value unchanged (just appending a zero).",
        rootCause: "No Shift Applied — appends a trailing zero without actually moving the decimal point, leaving the value mathematically unchanged.",
        remediation: "Physically move the decimal point one place to the right through the digits, rather than just adding a zero at the end."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in the multiplier", hint: "10 has one zero." },
      { level: 2, description: "Determine the shift direction", hint: "Multiplying makes the number bigger, so the decimal point moves to the RIGHT." },
      { level: 3, description: "Apply the shift", hint: "Move the decimal point in 0.42 one place to the right." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DECMUL10-02", probability: 0.6, condition: "×100 and ×1000 use the same shifting logic with more places." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Write 0.25 as a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "0.25 = 25/100 = 1/4." },
        { text: "\\(\\frac{25}{100}\\)", correct: false, feedback: "Not simplified; divide numerator and denominator by 25.", misconceptionId: "E-w7-a" },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "2/5 = 0.4, not 0.25.", misconceptionId: "E-w7-b" },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Write the decimal as a fraction over 100, then simplify.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 25/100, correctly forming the fraction but not simplifying it.",
        rootCause: "Missing Simplification Step — correctly translates the decimal into a fraction over 100 but stops without reducing it to lowest terms, missing the 'simplest form' instruction.",
        remediation: "Treat 'simplest form' as a required final step — always find the HCF of numerator and denominator and divide both by it before answering."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 2/5, an incorrect simplification.",
        rootCause: "Wrong-Divisor Simplification — divides numerator and denominator by a number that isn't a common factor, producing a fraction with a different value entirely (2/5=0.4≠0.25).",
        remediation: "After simplifying, verify by converting back to a decimal: does the simplified fraction still equal the original decimal?"
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 1/5, another incorrect simplification.",
        rootCause: "Wrong-Divisor Simplification — similarly divides by an incorrect factor, producing 1/5=0.2, a different value from 0.25.",
        remediation: "Find the actual HCF of 25 and 100 (which is 25) rather than guessing a divisor, then verify the result converts back to 0.25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write as a fraction over 100", hint: "0.25 has two decimal places, so write it as 25/100." },
      { level: 2, description: "Find the HCF", hint: "What is the highest common factor of 25 and 100?" },
      { level: 3, description: "Simplify", hint: "Divide both 25 and 100 by their HCF (25)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-01",
    question: "5.8 - 2.3 = ?",
    options: [
        { text: "3.5", correct: true, feedback: "5.8 - 2.3 = 3.5." },
        { text: "3.1", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w8-a" },
        { text: "2.5", correct: false, feedback: "Incorrect.", misconceptionId: "E-w8-b" },
        { text: "3.6", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Subtract digit by digit, keeping the decimal point aligned.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 3.1, an arithmetic slip in the tenths column.",
        rootCause: "Column Subtraction Slip — makes an error subtracting 8-3 in the tenths column, landing on 1 tenth short of the correct 5.",
        remediation: "Subtract each column separately and check: 8 tenths minus 3 tenths should equal 5 tenths, not 1."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 2.5, subtracting the ones column incorrectly.",
        rootCause: "Column Subtraction Slip — makes an error in the ones column (5-2 should be 3, not 2), possibly miscounting by one.",
        remediation: "Verify the ones column separately: 5 ones minus 2 ones equals 3 ones."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 3.6, off by 0.1.",
        rootCause: "Column Subtraction Slip — a small arithmetic error in the tenths column, one tenth too high.",
        remediation: "Recompute the tenths column carefully: 8-3=5, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align the decimal points", hint: "Write 5.8 and 2.3 stacked with decimal points aligned." },
      { level: 2, description: "Subtract the tenths column", hint: "8 tenths - 3 tenths = ?" },
      { level: 3, description: "Subtract the ones column", hint: "5 ones - 2 ones = ?, then combine with the tenths result." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "What is the value of the digit 4 in 2.047?",
    options: [
        { text: "4 hundredths", correct: true, feedback: "The digit 4 is in the hundredths place, so its value is 4 hundredths." },
        { text: "4 tenths", correct: false, feedback: "The tenths place is the first digit after the decimal (0 here).", misconceptionId: "E-d1-a" },
        { text: "4 thousandths", correct: false, feedback: "The thousandths place is the third digit (7 here).", misconceptionId: "E-d1-b" },
        { text: "4 ones", correct: false, feedback: "The ones place is before the decimal (2 here).", misconceptionId: "E-d1-c" }
      ],
    backward: "Place value chart: ones . tenths hundredths thousandths.",
    forward: "Knowing place values is essential for reading and writing decimals correctly.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student answers 4 tenths, one column too far left.",
        rootCause: "Adjacent-Column Slip — assumes the digit named in the question is always the first one after the decimal, without actually counting columns.",
        remediation: "Count each digit's position explicitly from the decimal point: 0=tenths (1st), 4=hundredths (2nd), 7=thousandths (3rd) — verify before answering."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student answers 4 thousandths, one column too far right.",
        rootCause: "Adjacent-Column Slip — miscounts in the other direction, landing on the third decimal column instead of the second.",
        remediation: "Write out the place-value chart (tenths, hundredths, thousandths) and place each digit of 2.047 into it before naming any single digit's place."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student answers 4 ones, confusing it with a whole-number place.",
        rootCause: "Wrong Side of Decimal — treats the digit as if it were before the decimal point, in the ones place, despite it being after.",
        remediation: "Confirm which side of the decimal point the digit 4 actually appears on before naming any place value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Locate the digit", hint: "Find the digit 4 in 2.047 — it's the second digit after the decimal point." },
      { level: 2, description: "Name the column", hint: "The second digit after the decimal point is the hundredths column." },
      { level: 3, description: "State the value", hint: "A digit in the hundredths column has a value of that many hundredths." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Which is the smallest? 0.8, 0.75, 0.9, 0.79",
    options: [
        { text: "0.75", correct: true, feedback: "Align: 0.80, 0.75, 0.90, 0.79. Smallest is 0.75." },
        { text: "0.8", correct: false, feedback: "0.8 = 0.80 > 0.75.", misconceptionId: "E-d2-a" },
        { text: "0.9", correct: false, feedback: "0.9 = 0.90, the largest.", misconceptionId: "E-d2-b" },
        { text: "0.79", correct: false, feedback: "0.79 > 0.75.", misconceptionId: "E-d2-c" }
      ],
    backward: "Compare digits from left to right, adding zeros to make the same number of decimal places.",
    forward: "Ordering decimals is used in ranking, prices, and measurements.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student picks 0.8, comparing only the number of digits rather than the actual values.",
        rootCause: "Shortest-Looks-Smallest — assumes the decimal written with the fewest digits (0.8) must be the smallest, without converting to a common number of decimal places first.",
        remediation: "Pad every number to the same number of decimal places (0.80, 0.75, 0.90, 0.79) before comparing — length alone says nothing about value."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student picks 0.9, the actual largest value.",
        rootCause: "Direction Reversal — correctly compares the aligned values but picks the largest instead of the smallest, confusing the two directions.",
        remediation: "Reread the question to confirm which direction is asked (smallest vs largest) before selecting from the ordered list."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student picks 0.79, close to but not the actual smallest.",
        rootCause: "Partial Comparison — compares only some of the four numbers rather than all of them together, missing that 0.75 is smaller than 0.79.",
        remediation: "Align and list ALL FOUR numbers together (0.80, 0.75, 0.90, 0.79) before picking the smallest — don't compare pairs in isolation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all numbers to the same decimal places", hint: "Write all four with two decimal places: 0.80, 0.75, 0.90, 0.79." },
      { level: 2, description: "Compare the tenths digits", hint: "Tenths digits: 8, 7, 9, 7. Which are the smallest?" },
      { level: 3, description: "Break the tie with hundredths", hint: "0.75 and 0.79 both have tenths digit 7 — compare their hundredths digits to find the smaller." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-02",
    question: "Round 6.28 to the nearest tenth.",
    options: [
        { text: "6.3", correct: true, feedback: "The hundredths digit is 8 (≥5), so round up the tenths from 2 to 3 → 6.3." },
        { text: "6.2", correct: false, feedback: "You truncated; the hundredths digit 8 means round up.", misconceptionId: "E-d3-a" },
        { text: "6.0", correct: false, feedback: "That's rounding to the nearest whole number.", misconceptionId: "E-d3-b" },
        { text: "6.28", correct: false, feedback: "The number is unchanged; rounding must be applied.", misconceptionId: "E-d3-c" }
      ],
    backward: "Look at the digit in the hundredths place to decide whether to round the tenths up or keep it.",
    forward: "Rounding is used in money (nearest 10 paise) and measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student answers 6.2, dropping the hundredths digit without checking it.",
        rootCause: "Truncation Instead of Rounding — chops off everything after the target place without checking whether the deciding digit calls for rounding up.",
        remediation: "Always check the deciding digit explicitly (here, the hundredths digit, 8) before dropping anything — 8≥5 means round up, not truncate."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student answers 6.0, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest whole number instead of the nearest tenth, dropping one place too many.",
        remediation: "Confirm the target place before rounding: 'nearest tenth' means exactly one digit should remain after the decimal point."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 6.28, leaving the number unchanged.",
        rootCause: "No Rounding Applied — doesn't perform any rounding operation at all, simply restating the original number.",
        remediation: "Remind the student that rounding always changes (or at least considers changing) the target digit — restating the original isn't a valid answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place and deciding digit", hint: "Rounding to the nearest tenth means checking the hundredths digit to decide." },
      { level: 2, description: "Check the deciding digit", hint: "The hundredths digit in 6.28 is 8. Is 8 five or more?" },
      { level: 3, description: "Round and drop", hint: "Since 8≥5, round the tenths digit up from 2 to 3, and drop everything after it." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Convert 0.6 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "0.6 = 6/10 = 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "Not simplified; divide by 2.", misconceptionId: "E-d4-a" },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Reciprocal confusion.", misconceptionId: "E-d4-b" },
        { text: "\\(\\frac{6}{100}\\)", correct: false, feedback: "0.6 is 6 tenths, not 6 hundredths.", misconceptionId: "E-d4-c" }
      ],
    backward: "Write the decimal as a fraction with denominator 10, then simplify.",
    forward: "Converting between fractions and decimals helps in comparing and calculating.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student answers 6/10, correctly forming the fraction but not simplifying.",
        rootCause: "Missing Simplification Step — stops after writing the decimal as a fraction over 10, without reducing to lowest terms.",
        remediation: "Always check whether numerator and denominator share a common factor greater than 1 before finalising the answer."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student answers 1/6, inverting the fraction.",
        rootCause: "Reciprocal-Flip — swaps the numerator and denominator, producing the reciprocal of the correct fraction rather than the fraction itself.",
        remediation: "Verify direction by converting back: 1/6 ≈ 0.167, not 0.6 — a quick sanity check catches an accidental flip."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student answers 6/100, using the wrong place-value denominator.",
        rootCause: "Wrong Denominator — treats 0.6 as if it had two decimal places (hundredths) instead of one (tenths).",
        remediation: "Count the actual number of digits after the decimal point in 0.6 — there's only one, so the denominator must be 10, not 100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write as a fraction over 10", hint: "0.6 has one decimal place, so write it as 6/10." },
      { level: 2, description: "Find the HCF", hint: "What is the highest common factor of 6 and 10?" },
      { level: 3, description: "Simplify", hint: "Divide both 6 and 10 by their HCF (2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-02",
    question: "3.45 + 2.1 = ?",
    options: [
        { text: "5.55", correct: true, feedback: "Align: 3.45 + 2.10 = 5.55." },
        { text: "5.46", correct: false, feedback: "You misaligned the tenths and hundredths.", misconceptionId: "E-d5-a" },
        { text: "3.66", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-d5-b" },
        { text: "5.56", correct: false, feedback: "Carry error in the hundredths column.", misconceptionId: "E-d5-c" }
      ],
    backward: "Align the decimal points; you can add a zero to 2.1 to make 2.10.",
    forward: "Addition with decimals is used in money and length calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 5.46, misaligning the columns.",
        rootCause: "Misaligned Columns — treats 2.1 as if its '1' lined up with 3.45's hundredths digit instead of its tenths digit, since the two numbers have different lengths.",
        remediation: "Pad 2.1 with a trailing zero to make 2.10 before adding, so both numbers have the same number of decimal places and align correctly."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 3.66, an unrelated miscalculation.",
        rootCause: "Column Addition Slip — makes an arithmetic error somewhere in the column-by-column addition process.",
        remediation: "Add each column separately (hundredths, tenths, ones) and check each running total before combining."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 5.56, a small carry error.",
        rootCause: "Carry Slip — makes a small error in a carry from one column to the next.",
        remediation: "Recompute column by column: hundredths (5+0=5), tenths (4+1=5), ones (3+2=5) — no carries are actually needed here, which helps isolate where the error crept in."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 2.1 as 2.10 so both numbers have two decimal places." },
      { level: 2, description: "Align and add column by column", hint: "Add hundredths (5+0), then tenths (4+1), then ones (3+2)." },
      { level: 3, description: "Combine the results", hint: "Put the column results together: ones.tenths hundredths." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-01",
    question: "0.09 × 100 = ?",
    options: [
        { text: "9", correct: true, feedback: "Move the decimal point two places right: 0.09 → 9." },
        { text: "0.9", correct: false, feedback: "That's multiplying by 10, not 100.", misconceptionId: "E-d6-a" },
        { text: "0.009", correct: false, feedback: "You moved the decimal point the wrong way.", misconceptionId: "E-d6-b" },
        { text: "900", correct: false, feedback: "You moved the point four places.", misconceptionId: "E-d6-c" }
      ],
    backward: "Multiplying by 100 moves the decimal point two places to the right.",
    forward: "Multiplying by powers of ten is used when converting units (e.g., metres to centimetres).",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 0.9, shifting only one place instead of two.",
        rootCause: "Shift-Count Undercount — moves the decimal point one place, matching ×10 instead of ×100.",
        remediation: "Count the zeros in the multiplier explicitly: 100 has two zeros → shift two places, not one."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 0.009, shifting the decimal point left instead of right.",
        rootCause: "Wrong Direction — applies the division shift direction to a multiplication problem.",
        remediation: "Reconfirm: multiplying makes the number bigger (decimal point moves right); dividing makes it smaller (decimal point moves left)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 900, shifting four places instead of two.",
        rootCause: "Shift-Count Overreach — moves the decimal point too many places, doubling the correct shift amount.",
        remediation: "Match shifts to zeros precisely: 100 (two zeros) means exactly two shifts, not four."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in the multiplier", hint: "100 has two zeros." },
      { level: 2, description: "Determine direction", hint: "Multiplying makes the number bigger, so shift the decimal point RIGHT." },
      { level: 3, description: "Apply the shift", hint: "Move the decimal point in 0.09 two places to the right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "Write the expanded form of 4.305.",
    options: [
        { text: "4 + \\(\\frac{3}{10}\\) + \\(\\frac{5}{1000}\\)", correct: true, feedback: "4 ones, 3 tenths, 0 hundredths, 5 thousandths." },
        { text: "4 + \\(\\frac{3}{10}\\) + \\(\\frac{5}{100}\\)", correct: false, feedback: "5 is in the thousandths place, not hundredths.", misconceptionId: "E-d7-a" },
        { text: "4 + \\(\\frac{3}{100}\\) + \\(\\frac{5}{1000}\\)", correct: false, feedback: "3 is in the tenths place, not hundredths.", misconceptionId: "E-d7-b" },
        { text: "4 + 0.3 + 0.05", correct: false, feedback: "Missing the thousandths part (0.005).", misconceptionId: "E-d7-c" }
      ],
    backward: "Break each digit according to its place value: 4 ones, 3 tenths, 0 hundredths, 5 thousandths.",
    forward: "Expanded form helps understand the value of each digit and is the basis for decimal operations.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student places the 5 in the hundredths position instead of thousandths.",
        rootCause: "Adjacent-Column Slip — miscounts the position of the last digit, placing it one column too early.",
        remediation: "Count positions explicitly: 3=tenths(1st), 0=hundredths(2nd), 5=thousandths(3rd) — the middle zero still counts as a column, it isn't skipped."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student places the 3 in the hundredths position instead of tenths.",
        rootCause: "Adjacent-Column Slip — miscounts the position of the first decimal digit, shifting it one column right.",
        remediation: "The FIRST digit after the decimal point is always tenths — verify this before assigning any place value."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student writes 4 + 0.3 + 0.05, omitting the thousandths part entirely.",
        rootCause: "Missing Digit — treats the zero in the hundredths place as if it meant the number stops there, dropping the final nonzero digit (5, thousandths) entirely.",
        remediation: "Include every nonzero digit in the expanded form, even when a middle digit is zero — the zero placeholder doesn't erase digits after it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List each digit with its place", hint: "4.305: 4=ones, 3=tenths, 0=hundredths, 5=thousandths." },
      { level: 2, description: "Write the value of each nonzero digit", hint: "4 ones = 4. 3 tenths = 3/10. 5 thousandths = 5/1000. (Skip the 0 hundredths, since it contributes nothing.)" },
      { level: 3, description: "Combine with plus signs", hint: "4 + 3/10 + 5/1000." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Arrange in ascending order: 1.05, 1.5, 1.005, 1.055",
    options: [
        { text: "1.005, 1.05, 1.055, 1.5", correct: true, feedback: "Align with three places: 1.005, 1.050, 1.055, 1.500." },
        { text: "1.5, 1.055, 1.05, 1.005", correct: false, feedback: "That's descending.", misconceptionId: "E-d8-a" },
        { text: "1.05, 1.005, 1.055, 1.5", correct: false, feedback: "1.005 is smaller than 1.05.", misconceptionId: "E-d8-b" },
        { text: "1.005, 1.5, 1.05, 1.055", correct: false, feedback: "1.05 is smaller than 1.5.", misconceptionId: "E-d8-c" }
      ],
    backward: "Add zeros to make all numbers have three decimal places, then compare.",
    forward: "Ordering decimals is important in data analysis and ranking.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student writes the numbers largest to smallest.",
        rootCause: "Direction Reversal — correctly ranks the numbers by size but writes the order largest-to-smallest, confusing 'ascending' with 'descending'.",
        remediation: "Anchor the vocabulary: ascending = climbing upward = smallest first. Say the meaning aloud before ordering."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student writes 1.05, 1.005, 1.055, 1.5, with the first two swapped.",
        rootCause: "More-Digits-Means-Bigger — assumes 1.005 (with more decimal digits) is larger than 1.05, the same false intuition that causes decimal comparison errors generally.",
        remediation: "Align all numbers to three decimal places (1.050 vs 1.005) before comparing — 1.005 is clearly smaller once aligned."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student writes 1.005, 1.5, 1.05, 1.055, with the middle two out of order.",
        rootCause: "Partial Sort — correctly places the smallest number first but doesn't fully sort the remaining three, leaving 1.5 out of its correct position.",
        remediation: "After finding the smallest, continue comparing the REMAINING numbers as their own group rather than assuming the rest are already in order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to the same number of decimal places", hint: "Write all four numbers with three decimal places: 1.050, 1.500, 1.005, 1.055." },
      { level: 2, description: "Compare digit by digit from the left", hint: "All start with '1.0' except 1.500 — compare the next digit for the rest." },
      { level: 3, description: "Sort fully", hint: "Order all four from smallest to largest, double-checking each pair." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-03",
    question: "Round 3.456 to the nearest hundredth.",
    options: [
        { text: "3.46", correct: true, feedback: "The thousandths digit is 6 (≥5), so round up the hundredths from 5 to 6 → 3.46." },
        { text: "3.45", correct: false, feedback: "You truncated; thousandths digit 6 means round up.", misconceptionId: "E-d9-a" },
        { text: "3.5", correct: false, feedback: "That's rounding to the nearest tenth.", misconceptionId: "E-d9-b" },
        { text: "3.456", correct: false, feedback: "Unchanged.", misconceptionId: "E-d9-c" }
      ],
    backward: "Look at the thousandths digit (6); if ≥ 5, increase the hundredths digit by 1.",
    forward: "Rounding to hundredths is used in money (nearest paisa/cent).",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 3.45, truncating without checking the thousandths digit.",
        rootCause: "Truncation Instead of Rounding — drops the thousandths digit without checking whether it calls for rounding up.",
        remediation: "Always check the deciding digit (here, thousandths=6) before dropping it — 6≥5 means round up, not truncate."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 3.5, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest tenth instead of hundredth, dropping one extra digit.",
        remediation: "Confirm the target place: 'nearest hundredth' means exactly two digits should remain after the decimal point."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 3.456, leaving the number unchanged.",
        rootCause: "No Rounding Applied — restates the original number without performing any rounding.",
        remediation: "Rounding should always produce a shorter number (fewer decimal places) than the target — an unchanged answer signals no rounding was actually done."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place and deciding digit", hint: "Rounding to the nearest hundredth means checking the thousandths digit." },
      { level: 2, description: "Check the deciding digit", hint: "The thousandths digit in 3.456 is 6. Is 6 five or more?" },
      { level: 3, description: "Round and drop", hint: "Since 6≥5, round the hundredths digit up from 5 to 6, and drop the thousandths digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-03",
    question: "Write \\(\\frac{3}{4}\\) as a decimal.",
    options: [
        { text: "0.75", correct: true, feedback: "3 ÷ 4 = 0.75." },
        { text: "0.34", correct: false, feedback: "You wrote the numerator and denominator next to each other.", misconceptionId: "E-d10-a" },
        { text: "0.5", correct: false, feedback: "That's 1/2.", misconceptionId: "E-d10-b" },
        { text: "0.7", correct: false, feedback: "Approximation, not exact.", misconceptionId: "E-d10-c" }
      ],
    backward: "Divide the numerator by the denominator: 3 ÷ 4 = 0.75.",
    forward: "Fractions like 1/2, 1/4, 3/4 are common; knowing their decimal equivalents is useful.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student answers 0.34, concatenating the digits instead of dividing.",
        rootCause: "Digit-Concatenation — writes the numerator and denominator side by side as decimal digits, rather than performing the division they represent.",
        remediation: "Remind the student that a fraction bar means DIVISION — 3/4 means 3÷4, not the digits '3' and '4' written together."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student answers 0.5, confusing 3/4 with a different common fraction.",
        rootCause: "Fraction Recall Confusion — recalls the decimal equivalent of a different familiar fraction (1/2=0.5) instead of computing 3/4 specifically.",
        remediation: "Compute the division directly rather than recalling from memory: 3÷4, using long division or the fact that 3/4 = 75/100."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student answers 0.7, a rough approximation rather than the exact value.",
        rootCause: "Premature Rounding — estimates roughly instead of computing the exact decimal value.",
        remediation: "Perform the actual division 3÷4 to get the exact value, rather than estimating from a rough sense of the fraction's size."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a fraction bar means", hint: "3/4 means 3 divided by 4." },
      { level: 2, description: "Perform the division", hint: "3 ÷ 4 = ? (Hint: 3/4 = 75/100.)" },
      { level: 3, description: "Write as a decimal", hint: "75/100 as a decimal is 0.75." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-03",
    question: "7.6 - 4.38 = ?",
    options: [
        { text: "3.22", correct: true, feedback: "7.60 - 4.38 = 3.22." },
        { text: "3.38", correct: false, feedback: "You forgot to borrow across the zero.", misconceptionId: "E-d11-a" },
        { text: "2.22", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d11-b" },
        { text: "3.18", correct: false, feedback: "Off by 0.04.", misconceptionId: "E-d11-c" }
      ],
    backward: "Align decimal points; add a zero to 7.6 → 7.60. Subtract column by column.",
    forward: "Subtracting decimals is used in calculating change and differences in measurements.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student answers 3.38, mishandling the borrow across the zero in the hundredths column.",
        rootCause: "Borrow-Across-Zero Error — 7.60 has a 0 in the hundredths place, and subtracting 8 from it requires borrowing from the tenths column too; skipping this produces a wrong hundredths digit.",
        remediation: "Rewrite 7.6 as 7.60 explicitly, then borrow step by step: since hundredths (0) can't subtract 8, borrow from tenths, which itself may need to borrow from ones — trace each borrow fully."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student answers 2.22, an error in the ones column.",
        rootCause: "Column Subtraction Slip — after borrowing, miscounts the ones column, landing one too low.",
        remediation: "After completing all borrows, re-verify the ones column specifically: it should reflect any borrow taken from it."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student answers 3.18, off by 0.04.",
        rootCause: "Column Subtraction Slip — a small arithmetic error in one of the decimal columns.",
        remediation: "Verify by adding back: does 3.22 + 4.38 = 7.60? Use this addition check to confirm which column has the error."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align and pad", hint: "Write 7.6 as 7.60 so both numbers have two decimal places." },
      { level: 2, description: "Borrow across the zero", hint: "Hundredths: 0-8 needs borrowing. Borrow from tenths (6), making it 5, and hundredths becomes 10." },
      { level: 3, description: "Complete the subtraction", hint: "Now subtract each column: hundredths (10-8), tenths (5-3, after the borrow), ones (7-4)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-02",
    question: "5.3 × 1000 = ?",
    options: [
        { text: "5300", correct: true, feedback: "Move the decimal point three places right; fill with zeros → 5300." },
        { text: "53", correct: false, feedback: "That's ×10.", misconceptionId: "E-d12-a" },
        { text: "530", correct: false, feedback: "That's ×100.", misconceptionId: "E-d12-b" },
        { text: "53000", correct: false, feedback: "You moved the point four places.", misconceptionId: "E-d12-c" }
      ],
    backward: "Multiplying by 1000 moves the decimal point three places right.",
    forward: "This is how we convert kilograms to grams, and kilometres to metres.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 53, shifting only one place instead of three.",
        rootCause: "Shift-Count Undercount — applies a ×10 shift to a ×1000 problem, moving only one place.",
        remediation: "Count the zeros in 1000 (three) and match that to the number of shifts."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 530, shifting only two places instead of three.",
        rootCause: "Shift-Count Undercount — applies a ×100 shift to a ×1000 problem.",
        remediation: "Recount the zeros in the multiplier explicitly before shifting: 1000 has three zeros, requiring three shifts."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 53000, shifting four places instead of three.",
        rootCause: "Shift-Count Overreach — moves one place too many.",
        remediation: "Double check by counting zeros again: 1,0,0,0 — that's three zeros, not four."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in the multiplier", hint: "1000 has three zeros." },
      { level: 2, description: "Determine direction", hint: "Multiplying makes the number bigger, so shift the decimal point RIGHT." },
      { level: 3, description: "Apply the shift and fill gaps with zeros", hint: "5.3 → 53. → 530. → 5300. — pad with a zero once you run out of digits." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "In 0.082, what digit is in the thousandths place?",
    options: [
        { text: "2", correct: true, feedback: "The thousandths place is the third digit after the decimal: 2." },
        { text: "0", correct: false, feedback: "0 is in the tenths place.", misconceptionId: "E-d13-a" },
        { text: "8", correct: false, feedback: "8 is in the hundredths place.", misconceptionId: "E-d13-b" },
        { text: "There is no thousandths place", correct: false, feedback: "There are three decimal places.", misconceptionId: "E-d13-c" }
      ],
    backward: "Count three places to the right of the decimal point.",
    forward: "Thousandths are used in precise measurements like medicine and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 0, the tenths digit.",
        rootCause: "Wrong Column Selected — picks the first digit after the decimal instead of counting to the third.",
        remediation: "Count columns explicitly: 1st=tenths(0), 2nd=hundredths(8), 3rd=thousandths(2) — verify the count before answering."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 8, the hundredths digit.",
        rootCause: "Adjacent-Column Slip — lands one column too early, on hundredths instead of thousandths.",
        remediation: "Recount from the decimal point one column at a time, stopping only at the third."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 'There is no thousandths place'.",
        rootCause: "Digit-Count Misjudgment — assumes the number only has two decimal places, perhaps miscounting the digits in 0.082.",
        remediation: "Count the actual digits after the decimal point in 0.082: 0, 8, 2 — that's three digits, so a thousandths place does exist."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the decimal digits", hint: "0.082 has three digits after the decimal point: 0, 8, 2." },
      { level: 2, description: "Number the columns", hint: "1st (tenths)=0, 2nd (hundredths)=8, 3rd (thousandths)=?" },
      { level: 3, description: "Identify the third digit", hint: "The third digit after the decimal point is the thousandths digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is greater? 0.099 or 0.1",
    options: [
        { text: "0.1", correct: true, feedback: "0.1 = 0.100 > 0.099." },
        { text: "0.099", correct: false, feedback: "More digits does not mean larger.", misconceptionId: "E-d14-a" },
        { text: "They are equal", correct: false, feedback: "0.100 ≠ 0.099.", misconceptionId: "E-d14-b" },
        { text: "Cannot compare", correct: false, feedback: "Add zeros to 0.1 to make 0.100, then compare.", misconceptionId: "E-d14-c" }
      ],
    backward: "Write both with three decimal places: 0.100 and 0.099. Compare 100 vs 99.",
    forward: "Comparing decimals accurately is crucial in science and finance.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student picks 0.099, the number with more decimal digits.",
        rootCause: "More-Digits-Means-Bigger — the classic decimal-comparison trap: 0.099 has three digits after the point versus 0.1's one digit, so it's mistaken for the larger number.",
        remediation: "Pad 0.1 to 0.100 (same number of decimal places as 0.099) and compare digit by digit: tenths 1 vs 0 — 0.1 wins immediately at the very first digit."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 'They are equal'.",
        rootCause: "Visual Similarity — both numbers start with '0.0' or '0.1' and look close enough to seem equal without a digit-by-digit check.",
        remediation: "Align to the same decimal places (0.100 vs 0.099) and compare each digit — they differ at the thousandths place, so they are NOT equal."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 'Cannot compare'.",
        rootCause: "Unequal-Length Avoidance — assumes decimals with a different number of digits after the point can't be compared directly.",
        remediation: "Show that padding with trailing zeros never changes value, making any two decimals directly comparable."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 0.1 as 0.100 so both numbers have three decimal places." },
      { level: 2, description: "Compare the tenths digit first", hint: "0.100 has tenths digit 1; 0.099 has tenths digit 0." },
      { level: 3, description: "Conclude from the first difference", hint: "Since the tenths digits already differ (1 > 0), you don't even need to check further columns — which is larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-02",
    question: "Round 5.096 to the nearest tenth.",
    options: [
        { text: "5.1", correct: true, feedback: "The hundredths digit is 9 (≥5), so round up the tenths from 0 to 1 → 5.1." },
        { text: "5.0", correct: false, feedback: "You truncated, ignoring the hundredths digit 9.", misconceptionId: "E-d15-a" },
        { text: "5.09", correct: false, feedback: "That's rounding to the nearest hundredth.", misconceptionId: "E-d15-b" },
        { text: "5.2", correct: false, feedback: "Over-rounded.", misconceptionId: "E-d15-c" }
      ],
    backward: "Look at the hundredths place (9); because 9 ≥ 5, increase the tenths place by 1.",
    forward: "Rounding is used in weather reports (temperatures) and scientific data.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 5.0, truncating without checking the hundredths digit.",
        rootCause: "Truncation Instead of Rounding — drops everything after the tenths place without checking whether the hundredths digit (9) calls for rounding up.",
        remediation: "Always check the deciding digit before dropping — hundredths=9≥5 means the tenths digit must round up."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 5.09, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest hundredth instead of the nearest tenth.",
        remediation: "Confirm the target place before rounding: 'nearest tenth' means exactly one digit remains after the decimal point."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 5.2, over-rounding by one extra tenth.",
        rootCause: "Double Round-Up — rounds up the tenths digit twice, or misreads the deciding digit as calling for a bigger jump than one.",
        remediation: "Rounding up always increases the target digit by exactly 1, never more — check that only the tenths digit changed from 0 to 1, not further."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target place and deciding digit", hint: "Rounding to the nearest tenth means checking the hundredths digit." },
      { level: 2, description: "Check the deciding digit", hint: "The hundredths digit in 5.096 is 9. Is 9 five or more?" },
      { level: 3, description: "Round and drop", hint: "Since 9≥5, round the tenths digit up from 0 to 1, and drop the rest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Convert 0.04 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{25}\\)", correct: true, feedback: "0.04 = 4/100 = 1/25." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "2/5 = 0.4, not 0.04.", misconceptionId: "E-d16-a" },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "4/10 = 0.4.", misconceptionId: "E-d16-b" },
        { text: "\\(\\frac{4}{100}\\)", correct: false, feedback: "Not simplified.", misconceptionId: "E-d16-c" }
      ],
    backward: "Write as 4/100, then divide numerator and denominator by 4.",
    forward: "Converting small decimals to fractions helps in probability and scaling.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student answers 2/5, a value ten times too large.",
        rootCause: "Wrong-Denominator Simplification — treats 0.04 as if it had one decimal place (tenths) rather than two (hundredths), producing a fraction equal to 0.4 instead of 0.04.",
        remediation: "Count the actual decimal places in 0.04 (two) before writing the fraction — it must be over 100, not 10."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student answers 4/10, also ten times too large.",
        rootCause: "Wrong Denominator — uses 10 as the denominator instead of 100, mismatching the number of decimal places.",
        remediation: "Match the denominator's zeros to the number of digits after the decimal point: 0.04 has two digits, so denominator 100."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student answers 4/100, correctly forming the fraction but not simplifying.",
        rootCause: "Missing Simplification Step — stops before reducing to lowest terms.",
        remediation: "Find the HCF of 4 and 100 (which is 4) and divide both by it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count decimal places", hint: "0.04 has two digits after the decimal point, so write it as 4/100." },
      { level: 2, description: "Find the HCF", hint: "What is the highest common factor of 4 and 100?" },
      { level: 3, description: "Simplify", hint: "Divide both 4 and 100 by their HCF (4)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-04",
    question: "0.8 + 0.25 + 0.125 = ?",
    options: [
        { text: "1.175", correct: true, feedback: "0.800 + 0.250 + 0.125 = 1.175." },
        { text: "1.075", correct: false, feedback: "You missed a carry.", misconceptionId: "E-d17-a" },
        { text: "0.1175", correct: false, feedback: "Decimal point misplaced.", misconceptionId: "E-d17-b" },
        { text: "1.165", correct: false, feedback: "Incorrect addition.", misconceptionId: "E-d17-c" }
      ],
    backward: "Align decimals; convert 0.8 to 0.800, 0.25 to 0.250, then add.",
    forward: "Adding multiple decimals is common in shopping bills and measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 1.075, missing a carry from one column to the next.",
        rootCause: "Dropped Carry — when a column sum reaches 10 or more (e.g. hundredths: 0+5+2=... actually tenths: 8+2+1=11), the carry into the next column gets lost.",
        remediation: "Add all three numbers column by column (thousandths, hundredths, tenths, ones), writing down any carry explicitly before moving to the next column."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 0.1175, with the decimal point shifted one place left.",
        rootCause: "Decimal-Point Misplacement — after adding the digits correctly, places the decimal point in the wrong position in the final answer.",
        remediation: "Keep the decimal point aligned throughout the entire addition, in the same column as in every row — never move it only in the final answer."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 1.165, an arithmetic slip in one column.",
        rootCause: "Column Addition Slip — makes an error summing one of the three columns.",
        remediation: "Add each column across all three numbers together (e.g. thousandths: 0+0+5=5) and verify each result before combining."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to three decimal places", hint: "Write 0.8 as 0.800 and 0.25 as 0.250, matching 0.125's three decimal places." },
      { level: 2, description: "Add column by column, tracking carries", hint: "Thousandths: 0+0+5=5. Hundredths: 0+5+2=7. Tenths: 8+2+1=11 — write 1, carry 1." },
      { level: 3, description: "Apply the carry to the ones column", hint: "Ones: 0+0+0+1(carry)=1. Combine all the columns into the final answer." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-03",
    question: "67.8 ÷ 10 = ?",
    options: [
        { text: "6.78", correct: true, feedback: "Divide by 10 → move the decimal point one place left: 6.78." },
        { text: "678", correct: false, feedback: "You moved the decimal point right (multiplied).", misconceptionId: "E-d18-a" },
        { text: "0.678", correct: false, feedback: "You moved two places left (÷100).", misconceptionId: "E-d18-b" },
        { text: "67.8", correct: false, feedback: "No operation performed.", misconceptionId: "E-d18-c" }
      ],
    backward: "Dividing by 10 moves the decimal point one place to the left.",
    forward: "This is how we convert centimetres to metres, or paise to rupees.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 678, moving the decimal point right instead of left.",
        rootCause: "Wrong Direction — applies the multiplication shift direction to a division problem.",
        remediation: "Anchor the rule with the effect: dividing makes a number SMALLER, so the decimal point moves LEFT."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 0.678, shifting two places instead of one.",
        rootCause: "Shift-Count Overreach — applies a ÷100 shift to a ÷10 problem.",
        remediation: "Count the zeros in the divisor: 10 has one zero → shift exactly one place."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 67.8, leaving the number unchanged.",
        rootCause: "No Shift Applied — doesn't perform any decimal-point movement at all.",
        remediation: "Physically move the decimal point one place to the left through the digits of 67.8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros in the divisor", hint: "10 has one zero." },
      { level: 2, description: "Determine direction", hint: "Dividing makes the number smaller, so shift the decimal point LEFT." },
      { level: 3, description: "Apply the shift", hint: "Move the decimal point in 67.8 one place to the left." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "Which number has 3 in the hundredths place? 0.435, 0.543, 0.354, 0.345",
    options: [
        { text: "0.435", correct: true, feedback: "Hundredths is the second decimal place: 0.435 → 3 in hundredths." },
        { text: "0.543", correct: false, feedback: "3 is in the thousandths place, not hundredths.", misconceptionId: "E-d19-a" },
        { text: "0.354", correct: false, feedback: "3 is in the tenths place.", misconceptionId: "E-d19-b" },
        { text: "0.345", correct: false, feedback: "3 is in the tenths place.", misconceptionId: "E-d19-c" }
      ],
    backward: "The hundredths place is the second digit after the decimal point.",
    forward: "Place value precision is essential when measuring length, weight, and volume.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student picks 0.543, where the digit 3 is actually in the thousandths place.",
        rootCause: "Digit-Spotting Without Position Check — sees the digit '3' present in the number and picks it without checking WHICH place it actually occupies (in 0.543, position 3 is thousandths, not hundredths).",
        remediation: "For every candidate, explicitly count which column the digit 3 falls in before accepting or rejecting the number — don't just check that '3' appears somewhere."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student picks 0.354, where the digit 3 is in the tenths place.",
        rootCause: "Digit-Spotting Without Position Check — the digit 3 is the very first digit after the decimal (tenths), not the second (hundredths).",
        remediation: "Count columns explicitly for 0.354: 1st=tenths=3, 2nd=hundredths=5 — the 3 is in the wrong column for this question."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student picks 0.345, where the digit 3 is in the tenths place.",
        rootCause: "Digit-Spotting Without Position Check — similarly, 3 is the first digit after the decimal here, not the second.",
        remediation: "Underline the SECOND digit after the decimal point in each candidate and check whether it's specifically a 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the target column", hint: "The hundredths place is the SECOND digit after the decimal point." },
      { level: 2, description: "Check each candidate's second digit", hint: "0.435→3, 0.543→4, 0.354→5, 0.345→4 — which of these second digits is a 3?" },
      { level: 3, description: "Confirm", hint: "Only one candidate has 3 as its second decimal digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Which list is in descending order? A) 2.3, 2.03, 2.33; B) 2.33, 2.3, 2.03; C) 2.03, 2.3, 2.33; D) 2.3, 2.33, 2.03",
    options: [
        { text: "B", correct: true, feedback: "2.33 > 2.30 > 2.03." },
        { text: "A", correct: false, feedback: "That's a mixed order — 2.3 to 2.03 decreases, then 2.03 to 2.33 increases; neither ascending nor descending.", misconceptionId: "E-d20-a" },
        { text: "C", correct: false, feedback: "Ascending order.", misconceptionId: "E-d20-b" },
        { text: "D", correct: false, feedback: "Mixed order (2.33 > 2.03 but placed after 2.3).", misconceptionId: "E-d20-c" }
      ],
    backward: "Write with two decimal places: 2.30, 2.03, 2.33. Then sort.",
    forward: "Recognising correct ordering is a quick test skill.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student picks list A, which is actually a mixed (non-monotonic) order.",
        rootCause: "Incomplete Pairwise Check — checks only the first pair of values in the list (2.3 vs 2.03, correctly decreasing) without checking the second pair (2.03 vs 2.33, which increases).",
        remediation: "Check EVERY consecutive pair in a list, not just the first one — a list is only descending if every single step decreases."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student picks list C, which is actually ascending, the opposite direction.",
        rootCause: "Direction Confusion — correctly notices the list is monotonically ordered but confuses ascending with descending.",
        remediation: "Anchor the vocabulary: descending = walking downstairs = largest first — check whether the FIRST value in the list is actually the largest."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student picks list D, another mixed order.",
        rootCause: "Incomplete Pairwise Check — similarly checks only part of the sequence; D goes 2.3→2.33 (increase) then 2.33→2.03 (decrease), also non-monotonic.",
        remediation: "Align all values to the same decimal places (2.30, 2.33, 2.03) and verify the entire sequence decreases at every single step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all values", hint: "Write with two decimal places: 2.30, 2.03, 2.33." },
      { level: 2, description: "Check every consecutive pair in each list", hint: "For a list to be descending, EVERY step from one number to the next must decrease — check all pairs, not just the first." },
      { level: 3, description: "Confirm the fully descending list", hint: "Which list has every single step going from larger to smaller?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-04",
    question: "A number rounded to the nearest tenth is 8.4. Its hundredths digit is 7. What is the number?",
    options: [
        { text: "8.37", correct: true, feedback: "Numbers rounding to 8.4 (nearest tenth) are between 8.35 and 8.44. The only one with hundredths digit 7 in that range is 8.37." },
        { text: "8.47", correct: false, feedback: "8.47 rounds to 8.5, not 8.4.", misconceptionId: "E-d21-a" },
        { text: "8.43", correct: false, feedback: "Hundredths digit is 3, not 7.", misconceptionId: "E-d21-b" },
        { text: "8.35", correct: false, feedback: "Hundredths digit is 5, not 7.", misconceptionId: "E-d21-c" }
      ],
    backward: "Find the range of numbers that round to 8.4 to the nearest tenth (8.35 to 8.44). Then find the one with hundredths 7.",
    forward: "This reverse rounding builds number sense.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 8.47, which has hundredths digit 7 but rounds to 8.5, not 8.4.",
        rootCause: "Digit Match Without Range Check — matches the required hundredths digit (7) without verifying the resulting number actually rounds to 8.4; 8.47's hundredths digit (7≥5) rounds the tenths up to 5.",
        remediation: "After finding a candidate with the right hundredths digit, verify it independently by rounding it and checking the result matches the stated 8.4."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers 8.43, which is in the correct range but has the wrong hundredths digit.",
        rootCause: "Range Match Without Digit Check — finds a number that correctly rounds to 8.4 but doesn't verify its hundredths digit is specifically 7.",
        remediation: "Check BOTH conditions explicitly: does it round to 8.4, AND is its hundredths digit exactly 7?"
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 8.35, in the correct range but with the wrong hundredths digit.",
        rootCause: "Boundary Value Default — picks the boundary of the valid range (8.35) without checking its hundredths digit matches the required 7.",
        remediation: "Don't default to a range's boundary value — check the specific digit condition against the actual candidate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the range that rounds to 8.4", hint: "Numbers from 8.35 up to (but not including) 8.45 all round to 8.4 at the nearest tenth." },
      { level: 2, description: "Apply the hundredths-digit condition", hint: "Within that range, which numbers have 7 as their hundredths digit?" },
      { level: 3, description: "Confirm uniqueness", hint: "Only one number in the range 8.35-8.44 has hundredths digit 7 — which is it?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Which fraction is equivalent to 0.125?",
    options: [
        { text: "\\(\\frac{1}{8}\\)", correct: true, feedback: "0.125 = 125/1000 = 1/8." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "1/6 ≈ 0.1667.", misconceptionId: "E-d22-a" },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "1/4 = 0.25.", misconceptionId: "E-d22-b" },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2.", misconceptionId: "E-d22-c" }
      ],
    backward: "Write as 125/1000 and simplify by dividing by 125.",
    forward: "1/8 is a common fraction in measurement (e.g., inches).",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student picks 1/6, an unrelated unit fraction.",
        rootCause: "Guessed Unit Fraction — picks a plausible-looking unit fraction without actually converting 0.125 to a fraction and simplifying.",
        remediation: "Write 0.125 as 125/1000 explicitly first, then simplify by dividing by the HCF, rather than guessing among familiar unit fractions."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student picks 1/4, confusing it with a more familiar decimal.",
        rootCause: "Fraction Recall Confusion — recalls that 1/4=0.25, a similar-looking decimal, instead of computing 0.125's actual fraction.",
        remediation: "Verify by converting 1/4 back to a decimal (0.25) and comparing to the target (0.125) — they don't match, ruling this out."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student picks 1/5, another unrelated unit fraction.",
        rootCause: "Guessed Unit Fraction — similarly guesses without deriving the fraction from 0.125 directly.",
        remediation: "Write 0.125 as 125/1000, find the HCF of 125 and 1000 (which is 125), and divide both by it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write as a fraction over 1000", hint: "0.125 has three decimal places, so write it as 125/1000." },
      { level: 2, description: "Find the HCF", hint: "What is the highest common factor of 125 and 1000?" },
      { level: 3, description: "Simplify", hint: "Divide both 125 and 1000 by their HCF (125)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-04",
    question: "12.5 - 3.75 + 2.1 = ?",
    options: [
        { text: "10.85", correct: true, feedback: "12.50 - 3.75 = 8.75; 8.75 + 2.10 = 10.85." },
        { text: "11.85", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-d23-a" },
        { text: "10.75", correct: false, feedback: "Off by 0.1.", misconceptionId: "E-d23-b" },
        { text: "9.85", correct: false, feedback: "Subtraction error.", misconceptionId: "E-d23-c" }
      ],
    backward: "Perform operations in order: subtract, then add.",
    forward: "Mixed addition and subtraction of decimals is common in financial calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 11.85, one whole too high, likely from a borrowing error in the first subtraction.",
        rootCause: "Multi-Step Borrow Error — mishandles the borrow in 12.50-3.75, producing a result one unit too large before the final addition compounds the error.",
        remediation: "Compute and verify each step separately: first confirm 12.50-3.75=8.75 by adding back (8.75+3.75 should equal 12.50), then proceed to the addition."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 10.75, off by 0.1 from the correct answer.",
        rootCause: "Column Slip in the Second Step — makes a small error in the final addition step (8.75+2.10).",
        remediation: "Verify the second step independently: 8.75+2.10, aligning columns carefully."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 9.85, a larger error likely from the first subtraction.",
        rootCause: "Multi-Step Borrow Error — a bigger error in the first subtraction step propagates into the final answer.",
        remediation: "Break the problem into its two operations explicitly and verify each one before combining, rather than trying to do it all in one pass."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Do the subtraction first", hint: "12.50 - 3.75 = ? (Align decimals, borrow as needed.)" },
      { level: 2, description: "Verify the subtraction", hint: "Check: does your subtraction result plus 3.75 give back 12.50?" },
      { level: 3, description: "Add the last term", hint: "Take your subtraction result and add 2.10." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-04",
    question: "0.07 × ? = 7. Fill in the blank.",
    options: [
        { text: "100", correct: true, feedback: "0.07 × 100 = 7." },
        { text: "10", correct: false, feedback: "0.07 × 10 = 0.7.", misconceptionId: "E-d24-a" },
        { text: "1000", correct: false, feedback: "0.07 × 1000 = 70.", misconceptionId: "E-d24-b" },
        { text: "0.01", correct: false, feedback: "0.07 × 0.01 = 0.0007.", misconceptionId: "E-d24-c" }
      ],
    backward: "Divide 7 by 0.07 to find the multiplier: 7 ÷ 0.07 = 100.",
    forward: "Inverse operations with powers of ten are used in unit conversions.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student answers 10, one shift-level too small.",
        rootCause: "Shift-Count Undercount — underestimates how many places the decimal point needs to move to turn 0.07 into 7 (two places, not one).",
        remediation: "Count how many places the decimal point must move from 0.07 to 7: it moves two places right, so the multiplier must be 100, not 10."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student answers 1000, one shift-level too large.",
        rootCause: "Shift-Count Overreach — overestimates the required shift, producing a result too large (0.07×1000=70, not 7).",
        remediation: "Verify by multiplying back: does 0.07×1000 actually equal 7? Since it gives 70, 1000 is too large — try a smaller multiplier."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student answers 0.01, moving in the wrong direction entirely.",
        rootCause: "Wrong Direction — since 7 is bigger than 0.07, the multiplier must be greater than 1, but this answer is less than 1, which would make the result smaller, not larger.",
        remediation: "Reason about magnitude first: since the target (7) is bigger than the start (0.07), the missing multiplier must be greater than 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the sizes", hint: "0.07 needs to become 7, a much bigger number — so the missing multiplier must be greater than 1." },
      { level: 2, description: "Count the shift needed", hint: "How many places does the decimal point move from 0.07 to 7.00?" },
      { level: 3, description: "Match to a power of ten", hint: "A two-place shift to the right corresponds to multiplying by 100." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-01",
    question: "In 2.961, what digit is in the tenths place?",
    options: [
        { text: "9", correct: true, feedback: "The tenths place is the first digit after the decimal: 9." },
        { text: "2", correct: false, feedback: "2 is in the ones place.", misconceptionId: "E-r1-a" },
        { text: "6", correct: false, feedback: "6 is in the hundredths place.", misconceptionId: "E-r1-b" },
        { text: "1", correct: false, feedback: "1 is in the thousandths place.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers 2, the ones digit.",
        rootCause: "Wrong Side of Decimal — picks the digit to the left of the decimal point instead of the right.",
        remediation: "Point at the decimal point and name the digit immediately to its right."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers 6, the hundredths digit.",
        rootCause: "Adjacent-Column Slip — lands one column too far right.",
        remediation: "Count columns explicitly from the decimal point before answering."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers 1, the thousandths digit.",
        rootCause: "Adjacent-Column Slip — lands two columns too far right.",
        remediation: "Write out the place-value chart and place each digit before naming any single one's place."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the decimal point", hint: "Locate the decimal point in 2.961." },
      { level: 2, description: "Identify the first digit after it", hint: "The digit immediately after the decimal point is 9." },
      { level: 3, description: "Name the place", hint: "The first digit after the decimal point is the tenths place." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-01",
    question: "Which is larger? 0.45 or 0.405",
    options: [
        { text: "0.45", correct: true, feedback: "0.45 = 0.450 > 0.405." },
        { text: "0.405", correct: false, feedback: "0.450 > 0.405.", misconceptionId: "E-r2-a" },
        { text: "They are equal", correct: false, feedback: "0.450 ≠ 0.405.", misconceptionId: "E-r2-b" },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.45 and compare.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student picks 0.405, the number with more decimal digits.",
        rootCause: "More-Digits-Means-Bigger — assumes the decimal with more digits (0.405) must be larger than the one with fewer (0.45).",
        remediation: "Pad 0.45 to 0.450 (matching decimal places) and compare digit by digit: hundredths 5 vs 0 — 0.450 wins."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 'They are equal'.",
        rootCause: "Visual Similarity — both numbers share the digits 4, 0, 5 and look similar without a digit-by-digit check.",
        remediation: "Align to the same decimal places and compare each digit — they differ at the hundredths place."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 'Cannot compare'.",
        rootCause: "Unequal-Length Avoidance — assumes decimals of different lengths can't be compared.",
        remediation: "Show that padding with trailing zeros makes any two decimals directly comparable."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match decimal places", hint: "Write 0.45 as 0.450." },
      { level: 2, description: "Compare digit by digit", hint: "Compare hundredths: 5 (in 0.450) vs 0 (in 0.405)." },
      { level: 3, description: "Conclude", hint: "Which is larger, 5 hundredths or 0 hundredths (at this position)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-03",
    question: "Round 7.862 to the nearest hundredth.",
    options: [
        { text: "7.86", correct: true, feedback: "The thousandths digit is 2 (<5), so keep the hundredths digit as 6." },
        { text: "7.87", correct: false, feedback: "You rounded up incorrectly.", misconceptionId: "E-r3-a" },
        { text: "7.8", correct: false, feedback: "That's to the nearest tenth.", misconceptionId: "E-r3-b" },
        { text: "7.862", correct: false, feedback: "Unchanged.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 7.87, rounding up when it should round down.",
        rootCause: "Direction Default — rounds up out of habit without checking that the thousandths digit (2) is actually less than 5.",
        remediation: "Check the deciding digit every time: 2<5 means round DOWN (keep the hundredths digit unchanged), never assume up."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 7.8, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest tenth instead of hundredth.",
        remediation: "Confirm the target place before rounding: 'nearest hundredth' means two digits remain after the decimal point."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 7.862, unchanged.",
        rootCause: "No Rounding Applied — doesn't drop the thousandths digit at all.",
        remediation: "Even when rounding down, the digits after the target place must still be dropped."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the deciding digit", hint: "Rounding to the nearest hundredth means checking the thousandths digit." },
      { level: 2, description: "Check it", hint: "The thousandths digit in 7.862 is 2. Is 2 five or more?" },
      { level: 3, description: "Round accordingly", hint: "Since 2<5, keep the hundredths digit as is and drop the thousandths digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-03",
    question: "Write \\(\\frac{1}{2}\\) as a decimal.",
    options: [
        { text: "0.5", correct: true, feedback: "1 ÷ 2 = 0.5." },
        { text: "0.2", correct: false, feedback: "That's not 1÷2.", misconceptionId: "E-r4-a" },
        { text: "1.2", correct: false, feedback: "Incorrect.", misconceptionId: "E-r4-b" },
        { text: "0.05", correct: false, feedback: "Decimal point misplaced.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student answers 0.2, confusing 1/2 with a different fraction.",
        rootCause: "Fraction Recall Confusion — recalls an unrelated decimal value instead of computing 1÷2.",
        remediation: "Perform the actual division: 1÷2=0.5, rather than guessing from memory."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student answers 1.2, combining the numerator and denominator incorrectly.",
        rootCause: "Digit-Concatenation — writes the numerator and denominator as if forming a number directly, rather than dividing.",
        remediation: "Remember that a fraction bar means division: 1/2 means 1÷2, not the digits '1' and '2' combined."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student answers 0.05, with the decimal point shifted.",
        rootCause: "Decimal-Point Misplacement — computes the right digits but places the decimal point in the wrong position.",
        remediation: "Verify by estimating first: 1/2 is exactly half of 1, so the decimal should be close to 0.5, not much smaller."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a fraction bar means", hint: "1/2 means 1 divided by 2." },
      { level: 2, description: "Perform the division", hint: "1 ÷ 2 = ?" },
      { level: 3, description: "Confirm", hint: "Half of 1 is 0.5 — does your answer match?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NF.B.3"]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-02",
    question: "4.7 + 3.25 = ?",
    options: [
        { text: "7.95", correct: true, feedback: "4.70 + 3.25 = 7.95." },
        { text: "7.70", correct: false, feedback: "You forgot the hundredths.", misconceptionId: "E-r5-a" },
        { text: "8.00", correct: false, feedback: "Estimate only.", misconceptionId: "E-r5-b" },
        { text: "7.9", correct: false, feedback: "Missing the 5 hundredths.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 7.70, dropping the hundredths digit from 3.25.",
        rootCause: "Dropped Digit — treats 3.25 as if it were just 3.2 or 3.7, losing the hundredths digit (5) entirely.",
        remediation: "Pad 4.7 to 4.70 so both numbers have two decimal places, ensuring every digit (including the hundredths 5) is included in the addition."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 8.00, a rounded estimate rather than the exact sum.",
        rootCause: "Premature Rounding — estimates the sum roughly instead of computing the exact value.",
        remediation: "Compute the exact column-by-column addition rather than rounding each number before adding."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 7.9, missing the hundredths contribution.",
        rootCause: "Dropped Digit — similarly loses the hundredths digit from 3.25.",
        remediation: "Align both numbers to two decimal places (4.70 + 3.25) and add every column, including hundredths."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align to two decimal places", hint: "Write 4.7 as 4.70." },
      { level: 2, description: "Add column by column", hint: "Hundredths: 0+5=5. Tenths: 7+2=9. Ones: 4+3=7." },
      { level: 3, description: "Combine", hint: "Put the columns together: ones.tenths hundredths." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-01",
    question: "3.05 × 100 = ?",
    options: [
        { text: "305", correct: true, feedback: "Move the decimal two places right → 305." },
        { text: "30.5", correct: false, feedback: "That's ×10.", misconceptionId: "E-r6-a" },
        { text: "0.0305", correct: false, feedback: "You divided instead of multiplied.", misconceptionId: "E-r6-b" },
        { text: "3050", correct: false, feedback: "That's ×1000.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 30.5, shifting one place instead of two.",
        rootCause: "Shift-Count Undercount — applies a ×10 shift to a ×100 problem.",
        remediation: "Count the zeros in 100 (two) and match that to the number of shifts."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 0.0305, shifting left instead of right.",
        rootCause: "Wrong Direction — applies the division shift direction to a multiplication problem.",
        remediation: "Multiplying makes the number bigger, so the decimal point moves RIGHT, not left."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 3050, shifting three places instead of two.",
        rootCause: "Shift-Count Overreach — applies a ×1000 shift to a ×100 problem.",
        remediation: "Recount the zeros in 100 explicitly: two zeros, two shifts, not three."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros", hint: "100 has two zeros." },
      { level: 2, description: "Determine direction", hint: "Multiplying makes the number bigger, so shift RIGHT." },
      { level: 3, description: "Apply the shift", hint: "Move the decimal point in 3.05 two places to the right." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.2"]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    skillId: "DECPLACE-02",
    question: "Write 5.08 in expanded form.",
    options: [
        { text: "5 + \\(\\frac{8}{100}\\)", correct: true, feedback: "5 ones + 8 hundredths." },
        { text: "5 + \\(\\frac{8}{10}\\)", correct: false, feedback: "That would be 5.8, not 5.08.", misconceptionId: "E-r7-a" },
        { text: "5 + 0.8", correct: false, feedback: "That's 5.8, not 5.08.", misconceptionId: "E-r7-b" },
        { text: "5 + \\(\\frac{8}{1000}\\)", correct: false, feedback: "8 is in the hundredths place, not thousandths.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student writes 5+8/10, placing the 8 in tenths instead of hundredths.",
        rootCause: "Zero-Placeholder Skipped — ignores the 0 in the tenths place, effectively sliding the 8 one column left into the tenths position.",
        remediation: "Read the digits in order: 5.08 has 0 in tenths and 8 in hundredths — the tenths placeholder can't be skipped."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student writes 5+0.8, making the same tenths/hundredths error in decimal form.",
        rootCause: "Zero-Placeholder Skipped — same underlying error as above, expressed as a decimal instead of a fraction.",
        remediation: "Write out both decimal places explicitly: 5.08 = 5 ones, 0 tenths, 8 hundredths — the middle zero must be represented."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student writes 5+8/1000, placing the 8 one column too far right.",
        rootCause: "Adjacent-Column Slip — miscounts the position of the 8, landing on thousandths instead of hundredths.",
        remediation: "Count the decimal digits in 5.08: only two (0 and 8), so there's no thousandths digit at all here."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify each digit's place", hint: "5.08: 5=ones, 0=tenths, 8=hundredths." },
      { level: 2, description: "Note the placeholder zero", hint: "The tenths digit is 0, which contributes nothing, so it's skipped in the expanded form." },
      { level: 3, description: "Write the expanded form", hint: "5 (ones) + 8/100 (hundredths)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.3"]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    skillId: "DECCOMP-02",
    question: "Arrange in descending order: 0.99, 0.9, 0.909, 0.099",
    options: [
        { text: "0.99, 0.909, 0.9, 0.099", correct: true, feedback: "0.990, 0.909, 0.900, 0.099." },
        { text: "0.9, 0.909, 0.99, 0.099", correct: false, feedback: "Not correctly ordered.", misconceptionId: "E-r8-a" },
        { text: "0.099, 0.9, 0.909, 0.99", correct: false, feedback: "That's ascending.", misconceptionId: "E-r8-b" },
        { text: "0.99, 0.9, 0.909, 0.099", correct: false, feedback: "0.909 is larger than 0.9.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student writes 0.9, 0.909, 0.99, 0.099 — a jumbled, non-monotonic order.",
        rootCause: "Unaligned Comparison — compares the numbers without first aligning them to the same number of decimal places, leading to an inconsistent sort.",
        remediation: "Align all four numbers to three decimal places (0.990, 0.900, 0.909, 0.099) before attempting to sort them."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student writes the numbers smallest to largest instead of largest to smallest.",
        rootCause: "Direction Reversal — correctly sorts the values but in the wrong direction, confusing descending with ascending.",
        remediation: "Anchor the vocabulary: descending = walking downstairs = largest first."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student writes 0.99, 0.9, 0.909, 0.099, with the middle two swapped.",
        rootCause: "More-Digits-Means-Bigger (Inverted) — assumes 0.9 (fewer digits) is automatically bigger than 0.909 (more digits), the mirror image of the classic decimal-comparison trap.",
        remediation: "Align 0.9 to 0.900 and 0.909 stays as is — compare hundredths digits (0 vs 0) then thousandths (0 vs 9) to see 0.909 is actually larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align all four numbers", hint: "Write with three decimal places: 0.990, 0.900, 0.909, 0.099." },
      { level: 2, description: "Compare digit by digit", hint: "All start with 0. — compare tenths, then hundredths, then thousandths as needed." },
      { level: 3, description: "Sort fully descending", hint: "Order all four from largest to smallest, double-checking each pair." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.7"]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    skillId: "DECROUND-02",
    question: "Round 3.045 to the nearest tenth.",
    options: [
        { text: "3.0", correct: true, feedback: "The hundredths digit is 4 (<5), so keep the tenths as 0." },
        { text: "3.1", correct: false, feedback: "That would require the hundredths digit to be ≥5.", misconceptionId: "E-r9-a" },
        { text: "3.05", correct: false, feedback: "That's rounding to the nearest hundredth.", misconceptionId: "E-r9-b" },
        { text: "3.04", correct: false, feedback: "Not rounded to the nearest tenth.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student answers 3.1, rounding up when it should round down.",
        rootCause: "Direction Default — rounds up out of habit without checking that the hundredths digit (4) is less than 5.",
        remediation: "Check the deciding digit every time: 4<5 means round down (keep the tenths digit as is)."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student answers 3.05, rounding to the wrong place.",
        rootCause: "Wrong Target Place — rounds to the nearest hundredth instead of tenth.",
        remediation: "Confirm the target place: 'nearest tenth' means one digit remains after the decimal point."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student answers 3.04, not fully rounded to the target place.",
        rootCause: "Incomplete Rounding — drops only the last digit instead of rounding all the way to the tenths place.",
        remediation: "Rounding to the nearest tenth means only ONE digit should remain after the decimal point — 3.04 still has two."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the deciding digit", hint: "Rounding to the nearest tenth means checking the hundredths digit." },
      { level: 2, description: "Check it", hint: "The hundredths digit in 3.045 is 4. Is 4 five or more?" },
      { level: 3, description: "Round accordingly", hint: "Since 4<5, keep the tenths digit as 0 and drop the rest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.A.4"]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    skillId: "DECCONV-02",
    question: "Convert 0.75 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "0.75 = 75/100 = 3/4." },
        { text: "\\(\\frac{75}{100}\\)", correct: false, feedback: "Not fully simplified.", misconceptionId: "E-r10-a" },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "3/5 = 0.6, not 0.75.", misconceptionId: "E-r10-b" },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "2/3 ≈ 0.667, not 0.75.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student answers 75/100, correctly forming the fraction but not simplifying.",
        rootCause: "Missing Simplification Step — stops before reducing to lowest terms.",
        remediation: "Find the HCF of 75 and 100 (which is 25) and divide both by it."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student answers 3/5, an incorrect simplification.",
        rootCause: "Wrong-Divisor Simplification — divides by a number that isn't the actual HCF, producing a fraction with a different value (3/5=0.6≠0.75).",
        remediation: "Verify the simplified fraction converts back to the original decimal before finalising the answer."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student answers 2/3, an unrelated fraction.",
        rootCause: "Guessed Fraction — picks a familiar-looking fraction without deriving it from 0.75 directly.",
        remediation: "Write 0.75 as 75/100 explicitly first, then simplify using the actual HCF, rather than guessing among familiar fractions."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write as a fraction over 100", hint: "0.75 has two decimal places, so write it as 75/100." },
      { level: 2, description: "Find the HCF", hint: "What is the highest common factor of 75 and 100?" },
      { level: 3, description: "Simplify", hint: "Divide both 75 and 100 by their HCF (25)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.NF.C.6"]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    skillId: "DECADDSUB-03",
    question: "9.6 - 2.78 = ?",
    options: [
        { text: "6.82", correct: true, feedback: "9.60 - 2.78 = 6.82." },
        { text: "6.22", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-r11-a" },
        { text: "7.82", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-b" },
        { text: "7.22", correct: false, feedback: "Incorrect.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 6.22, an error in the ones column.",
        rootCause: "Column Subtraction Slip — after borrowing across the zero in hundredths, miscounts the ones column.",
        remediation: "Rewrite 9.6 as 9.60, borrow step by step through hundredths and tenths, then verify the ones column separately."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 7.82, forgetting to borrow at all.",
        rootCause: "Borrow-Across-Zero Error — hundredths (0) can't subtract 8 without borrowing, but the borrow is skipped entirely.",
        remediation: "Since hundredths is 0-8, borrowing is required — trace the borrow from tenths, and if needed, from ones too."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 7.22, a partial borrowing error.",
        rootCause: "Borrow-Across-Zero Error — completes only part of the required multi-step borrow.",
        remediation: "Verify by adding back: does 6.82 + 2.78 = 9.60? Use this check to confirm the correct answer, then trace where the error occurred."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Align and pad", hint: "Write 9.6 as 9.60." },
      { level: 2, description: "Borrow across the zero", hint: "Hundredths: 0-8 needs borrowing from tenths, which itself may need to borrow from ones." },
      { level: 3, description: "Complete the subtraction", hint: "Work through each column after borrowing: hundredths, tenths, ones." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.NBT.B.7"]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    skillId: "DECMUL10-03",
    question: "48.5 ÷ 100 = ?",
    options: [
        { text: "0.485", correct: true, feedback: "Move the decimal point two places left → 0.485." },
        { text: "4850", correct: false, feedback: "You multiplied instead of dividing.", misconceptionId: "E-r12-a" },
        { text: "4.85", correct: false, feedback: "That's ÷10.", misconceptionId: "E-r12-b" },
        { text: "0.0485", correct: false, feedback: "That's ÷1000.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers 4850, shifting right instead of left.",
        rootCause: "Wrong Direction — applies the multiplication shift direction to a division problem.",
        remediation: "Dividing makes the number smaller, so the decimal point moves LEFT, not right."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers 4.85, shifting only one place instead of two.",
        rootCause: "Shift-Count Undercount — applies a ÷10 shift to a ÷100 problem.",
        remediation: "Count the zeros in 100 (two) and match that to the number of shifts."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers 0.0485, shifting three places instead of two.",
        rootCause: "Shift-Count Overreach — applies a ÷1000 shift to a ÷100 problem.",
        remediation: "Recount the zeros in 100 explicitly: two zeros, two shifts, not three."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the zeros", hint: "100 has two zeros." },
      { level: 2, description: "Determine direction", hint: "Dividing makes the number smaller, so shift LEFT." },
      { level: 3, description: "Apply the shift", hint: "Move the decimal point in 48.5 two places to the left." }
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
    title: "Decimals — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Place value, comparing and ordering, rounding, fraction-decimal conversion, addition/subtraction, and multiplying/dividing by powers of ten.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Place value: tenths (1st decimal place), hundredths (2nd), thousandths (3rd).<br>" +
      "&bull; Compare: align decimal points, add zeros to make the same number of decimal places, then compare digits left to right.<br>" +
      "&bull; Round: look at the digit to the right of the target place. 5 or more &rarr; round up.<br>" +
      "&bull; Fractions &rarr; decimals: denominator 10 = one decimal place, 100 = two places, 1000 = three places. Simplify fractions.<br>" +
      "&bull; Add/subtract: align the decimal points, then operate like whole numbers.<br>" +
      "&bull; &times;/&divide; by 10, 100, 1000: move the decimal point right (&times;) or left (&divide;).<br>",
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

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
    question: "Write the decimal for 3 tens + 4 ones + 2 tenths + 5 hundredths.",
    options: [
        { text: "34.25", correct: true, feedback: "3 tens=30, 4 ones=4, 2 tenths=0.2, 5 hundredths=0.05 → 34.25." },
        { text: "34.025", correct: false, feedback: "You placed 2 in hundredths and 5 in thousandths." },
        { text: "30.425", correct: false, feedback: "You misaligned the tens." },
        { text: "3.425", correct: false, feedback: "You lost the tens place." }
      ],
    retryHint: "Align the parts: tens (30), ones (4), tenths (0.2), hundredths (0.05). Add them."
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? 0.503 or 0.53",
    options: [
        { text: "0.53", correct: true, feedback: "0.53 = 0.530 > 0.503." },
        { text: "0.503", correct: false, feedback: "More digits does not mean larger; compare 0.530 vs 0.503." },
        { text: "They are equal", correct: false, feedback: "0.530 ≠ 0.503." },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.53 to make 0.530, then compare." }
      ],
    retryHint: "Write both with three decimal places: 0.530 and 0.503. Compare 530 vs 503."
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 7.865 to the nearest hundredth, then add 0.1.",
    options: [
        { text: "7.97", correct: true, feedback: "7.865 → hundredth is 6, thousandths 5 → round up to 7.87. +0.10 = 7.97." },
        { text: "7.96", correct: false, feedback: "You might have truncated or rounded incorrectly." },
        { text: "7.87", correct: false, feedback: "You forgot to add 0.1." },
        { text: "7.86", correct: false, feedback: "You didn't round up (thousandths 5 means round up)." }
      ],
    retryHint: "First look at the thousandths digit (5) to round the hundredths. Then add 0.1."
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{3}{25}\\) to a decimal.",
    options: [
        { text: "0.12", correct: true, feedback: "3/25 = 12/100 = 0.12." },
        { text: "0.3", correct: false, feedback: "That's 3/10, not 3/25." },
        { text: "0.25", correct: false, feedback: "You wrote the denominator as decimal." },
        { text: "0.012", correct: false, feedback: "Decimal point misplaced." }
      ],
    retryHint: "Multiply numerator and denominator to get denominator 100: 3/25 = 12/100 = 0.12."
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "5.6 + 3.45 - 2.1 = ?",
    options: [
        { text: "6.95", correct: true, feedback: "5.60 + 3.45 = 9.05; 9.05 - 2.10 = 6.95." },
        { text: "6.85", correct: false, feedback: "Subtraction error." },
        { text: "7.95", correct: false, feedback: "You added 2.1 instead of subtracting." },
        { text: "6.0", correct: false, feedback: "Rough estimate, not exact." }
      ],
    retryHint: "Align decimal points; add first, then subtract. Treat 5.6 as 5.60 and 2.1 as 2.10."
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.25 × ? = 250. Find ?.",
    options: [
        { text: "1000", correct: true, feedback: "250 ÷ 0.25 = 1000." },
        { text: "100", correct: false, feedback: "0.25 × 100 = 25, not 250." },
        { text: "10", correct: false, feedback: "0.25 × 10 = 2.5." },
        { text: "10000", correct: false, feedback: "0.25 × 10000 = 2500." }
      ],
    retryHint: "Divide 250 by 0.25 to find the missing multiplier."
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 45.678, which digit is in the thousandths place?",
    options: [
        { text: "8", correct: true, feedback: "The thousandths place is the third decimal digit: 8." },
        { text: "7", correct: false, feedback: "7 is in the hundredths place." },
        { text: "6", correct: false, feedback: "6 is in the tenths place." },
        { text: "5", correct: false, feedback: "5 is in the ones place." }
      ],
    retryHint: "Count three places to the right of the decimal point: tenths, hundredths, thousandths."
  },
  {
    itemId: "w8", order: 8, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.8 × 100 = ?, then write the answer as a fraction of 100 in simplest form.",
    options: [
        { text: "80; \\(\\frac{4}{5}\\)", correct: true, feedback: "0.8 × 100 = 80. 80/100 = 4/5." },
        { text: "8; \\(\\frac{4}{5}\\)", correct: false, feedback: "0.8 × 100 = 80, not 8." },
        { text: "80; \\(\\frac{80}{100}\\)", correct: false, feedback: "The fraction must be simplified." },
        { text: "0.008; \\(\\frac{1}{125}\\)", correct: false, feedback: "You divided instead of multiplying." }
      ],
    retryHint: "First multiply by 100 (move decimal two places right). Then write as fraction over 100 and simplify."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write the decimal number: 5 + \\(\\frac{3}{10}\\) + \\(\\frac{7}{1000}\\).",
    options: [
        { text: "5.307", correct: true, feedback: "5 ones + 3 tenths + 0 hundredths + 7 thousandths = 5.307." },
        { text: "5.37", correct: false, feedback: "You placed 7 in the hundredths place instead of thousandths." },
        { text: "5.037", correct: false, feedback: "You placed 3 in the hundredths place." },
        { text: "5.370", correct: false, feedback: "You swapped the tenths and thousandths." }
      ],
    backward: "Combine the parts according to place value.",
    forward: "This is the reverse of expanded form, used when interpreting measurements."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is largest? 0.8, 0.08, 0.808, 0.088",
    options: [
        { text: "0.808", correct: true, feedback: "Align: 0.800, 0.080, 0.808, 0.088. Largest is 0.808." },
        { text: "0.8", correct: false, feedback: "0.8 = 0.800 < 0.808." },
        { text: "0.08", correct: false, feedback: "0.08 = 0.080, the smallest." },
        { text: "0.088", correct: false, feedback: "0.088 is less than 0.808." }
      ],
    backward: "Add zeros to make all have three decimal places.",
    forward: "Comparison skills are essential in data interpretation."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 12.349 to the nearest tenth and to the nearest whole number. Find the sum of these two rounded values.",
    options: [
        { text: "24.3", correct: true, feedback: "Nearest tenth: 12.3 (hundredths 4<5). Nearest whole: 12 (tenths 3<5). Sum = 12.3 + 12 = 24.3." },
        { text: "24.4", correct: false, feedback: "You might have rounded 12.349 to 12.4 for nearest tenth." },
        { text: "24.6", correct: false, feedback: "Rounded both up incorrectly." },
        { text: "24.0", correct: false, feedback: "Incorrect rounding." }
      ],
    backward: "Round each separately, then add.",
    forward: "Double rounding tests attention to detail."
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.625 to a fraction in simplest form, then add \\(\\frac{1}{8}\\).",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "0.625 = 5/8. 5/8 + 1/8 = 6/8 = 3/4." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "You forgot to add 1/8." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect conversion." },
        { text: "\\(\\frac{7}{8}\\)", correct: false, feedback: "You added incorrectly." }
      ],
    backward: "Convert decimal to fraction, simplify, then add like fractions.",
    forward: "This links decimals and fraction operations."
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "4.25 + 3.8 - 2.05 = ?",
    options: [
        { text: "6", correct: true, feedback: "4.25 + 3.80 = 8.05; 8.05 - 2.05 = 6.00 = 6." },
        { text: "5.00", correct: false, feedback: "Mis-subtraction." },
        { text: "7.00", correct: false, feedback: "Added everything." },
        { text: "5.45", correct: false, feedback: "Incorrect decimal alignment." }
      ],
    backward: "Align decimals and perform operations in order.",
    forward: "Mixed operations with decimals are used in budgeting."
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number multiplied by 100 gives 45.6. What is the number?",
    options: [
        { text: "0.456", correct: true, feedback: "45.6 ÷ 100 = 0.456 (move decimal two places left)." },
        { text: "4.56", correct: false, feedback: "That's 45.6 ÷ 10." },
        { text: "4560", correct: false, feedback: "That's 45.6 × 100." },
        { text: "0.0456", correct: false, feedback: "You moved the decimal too far." }
      ],
    backward: "Divide 45.6 by 100 (move decimal two places left).",
    forward: "Inverse operations with powers of ten are important for unit conversion."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 0.039, what is the value of the digit 9? Write it as a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{9}{1000}\\)", correct: true, feedback: "9 is in the thousandths place → value = 9/1000 (already simplest)." },
        { text: "\\(\\frac{9}{10}\\)", correct: false, feedback: "That would be tenths." },
        { text: "\\(\\frac{9}{100}\\)", correct: false, feedback: "That would be hundredths." },
        { text: "\\(\\frac{3}{1000}\\)", correct: false, feedback: "The digit is 9, not 3." }
      ],
    backward: "Identify the place value, then write as a fraction.",
    forward: "Understanding digit values helps in precise calculations."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: 2.4, 2.35, 2.345, 2.45",
    options: [
        { text: "2.45, 2.4, 2.35, 2.345", correct: true, feedback: "Align with three places: 2.450, 2.400, 2.350, 2.345. Descending: 2.45, 2.4, 2.35, 2.345." },
        { text: "2.45, 2.345, 2.35, 2.4", correct: false, feedback: "2.35 > 2.345." },
        { text: "2.4, 2.45, 2.35, 2.345", correct: false, feedback: "2.45 > 2.4." },
        { text: "2.345, 2.35, 2.4, 2.45", correct: false, feedback: "That's ascending." }
      ],
    backward: "Align decimals with three places.",
    forward: "Ordering decimals is key in ranking."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 6.095 to the nearest hundredth, then multiply the result by 100.",
    options: [
        { text: "610", correct: true, feedback: "6.095 → hundredth 9, thousandths 5 → round up to 6.10. 6.10 × 100 = 610." },
        { text: "609.5", correct: false, feedback: "You multiplied before rounding." },
        { text: "60.95", correct: false, feedback: "You multiplied by 10 instead of 100." },
        { text: "6.10", correct: false, feedback: "You only rounded, forgot to multiply." }
      ],
    backward: "First round, then multiply by 100.",
    forward: "Combining rounding with power-of-ten operations is common."
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.35 to a fraction in simplest form, then add \\(\\frac{1}{4}\\).",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "0.35 = 35/100 = 7/20. 1/4 = 5/20; sum = 12/20 = 3/5." },
        { text: "\\(\\frac{7}{20}\\)", correct: false, feedback: "You forgot to add 1/4." },
        { text: "\\(\\frac{9}{20}\\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Convert decimal to fraction, simplify, then add with common denominator.",
    forward: "This bridges decimals and fraction addition."
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "12.3 - 4.56 + 1.2 = ?",
    options: [
        { text: "8.94", correct: true, feedback: "12.30 - 4.56 = 7.74; + 1.20 = 8.94." },
        { text: "9.06", correct: false, feedback: "Subtraction error." },
        { text: "8.04", correct: false, feedback: "Off by 0.9." },
        { text: "7.94", correct: false, feedback: "Incorrect decimal alignment." }
      ],
    backward: "Align decimals, perform operations left to right.",
    forward: "Mixed addition/subtraction is used in reconciling accounts."
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.05 × ? = 50",
    options: [
        { text: "1000", correct: true, feedback: "50 ÷ 0.05 = 1000." },
        { text: "100", correct: false, feedback: "0.05 × 100 = 5." },
        { text: "10", correct: false, feedback: "0.05 × 10 = 0.5." },
        { text: "10000", correct: false, feedback: "0.05 × 10000 = 500." }
      ],
    backward: "Divide 50 by 0.05.",
    forward: "Inverse operations with powers of ten."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write the expanded form of 0.087.",
    options: [
        { text: "\\(\\frac{8}{100} + \\frac{7}{1000}\\)", correct: true, feedback: "0.087 = 0 tenths + 8 hundredths + 7 thousandths." },
        { text: "\\(\\frac{8}{10} + \\frac{7}{100}\\)", correct: false, feedback: "That's 0.87, not 0.087." },
        { text: "\\(\\frac{8}{10} + \\frac{7}{1000}\\)", correct: false, feedback: "That's 0.807." },
        { text: "\\(0.8 + 0.07\\)", correct: false, feedback: "That's 0.87." }
      ],
    backward: "0.087 = 0 tenths + 8 hundredths + 7 thousandths.",
    forward: "Expanded form helps understand decimal place values."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which number is exactly halfway between 2.4 and 2.5?",
    options: [
        { text: "2.45", correct: true, feedback: "(2.4 + 2.5)/2 = 4.9/2 = 2.45." },
        { text: "2.44", correct: false, feedback: "Slightly less." },
        { text: "2.46", correct: false, feedback: "Slightly more." },
        { text: "2.455", correct: false, feedback: "Not the exact midpoint." }
      ],
    backward: "Find the average.",
    forward: "Midpoint problems are common in statistics."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 3.6. The number has three decimal places, and its hundredths digit is 8. What is the smallest possible number?",
    options: [
        { text: "3.580", correct: true, feedback: "Range: 3.55 to 3.64. Hundredths=8 → 3.58x or 3.59x. Smallest is 3.580 (rounds to 3.6)." },
        { text: "3.581", correct: false, feedback: "Larger than 3.580." },
        { text: "3.589", correct: false, feedback: "Larger." },
        { text: "3.570", correct: false, feedback: "Hundredths 7, not 8." }
      ],
    backward: "Find the rounding range, then apply the digit constraint.",
    forward: "Reverse rounding with constraints is a challenging puzzle."
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{1}{8}\\) to a decimal, then round to the nearest hundredth.",
    options: [
        { text: "0.13", correct: true, feedback: "1/8 = 0.125. Thousandths 5 → round up hundredths to 0.13." },
        { text: "0.12", correct: false, feedback: "You truncated; thousandths 5 means round up." },
        { text: "0.125", correct: false, feedback: "Not rounded." },
        { text: "0.1", correct: false, feedback: "That's to the nearest tenth." }
      ],
    backward: "First divide 1 by 8, then round to hundredths.",
    forward: "Combining conversion and rounding is used in measurement."
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "3.6 + 2.75 - 1.9 = ?",
    options: [
        { text: "4.45", correct: true, feedback: "3.60 + 2.75 = 6.35; 6.35 - 1.90 = 4.45." },
        { text: "4.55", correct: false, feedback: "Off by 0.1." },
        { text: "5.45", correct: false, feedback: "Added 1.9 instead of subtracting." },
        { text: "4.35", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Line up decimals, add, then subtract.",
    forward: "Sequential operations appear in shopping lists."
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "72.4 ÷ 100 = ? Then multiply the result by 10.",
    options: [
        { text: "7.24", correct: true, feedback: "72.4 ÷ 100 = 0.724. 0.724 × 10 = 7.24." },
        { text: "0.724", correct: false, feedback: "You only did the division." },
        { text: "72.4", correct: false, feedback: "No operation." },
        { text: "724", correct: false, feedback: "Multiplied instead of divided." }
      ],
    backward: "First divide (move decimal left two), then multiply (move right one). Net effect: ÷10.",
    forward: "Combined power-of-ten shifts model unit conversions."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 123.456, the digit 4 is in which place? What is its value as a decimal?",
    options: [
        { text: "Tenths, 0.4", correct: true, feedback: "4 is the first digit after the decimal → tenths → value 0.4." },
        { text: "Hundredths, 0.04", correct: false, feedback: "4 is tenths, not hundredths." },
        { text: "Thousandths, 0.004", correct: false, feedback: "4 is tenths." },
        { text: "Ones, 4", correct: false, feedback: "4 is after the decimal point." }
      ],
    backward: "Count places from the decimal point: 4 is the first digit → tenths.",
    forward: "Quick identification of place value is essential for mental arithmetic."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which list is in ascending order? A) 5.6, 5.56, 5.066; B) 5.066, 5.56, 5.6; C) 5.6, 5.066, 5.56; D) 5.56, 5.066, 5.6",
    options: [
        { text: "B", correct: true, feedback: "5.066 < 5.56 < 5.6." },
        { text: "A", correct: false, feedback: "Descending." },
        { text: "C", correct: false, feedback: "Not ordered." },
        { text: "D", correct: false, feedback: "Not ordered." }
      ],
    backward: "Add zeros and compare.",
    forward: "Ordering decimals is a frequent test skill."
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 0.897 to the nearest tenth, then add 2.5.",
    options: [
        { text: "3.4", correct: true, feedback: "0.897 → tenth 8, hundredths 9≥5 → round up to 0.9. 0.9 + 2.5 = 3.4." },
        { text: "3.397", correct: false, feedback: "You used the original number instead of rounding." },
        { text: "3.5", correct: false, feedback: "You rounded to nearest whole number." },
        { text: "2.8", correct: false, feedback: "You only rounded." }
      ],
    backward: "First round, then add.",
    forward: "Combining rounding with addition."
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{2}{5}\\) to a decimal, then multiply by 3.",
    options: [
        { text: "1.2", correct: true, feedback: "2/5 = 0.4; 0.4 × 3 = 1.2." },
        { text: "0.8", correct: false, feedback: "That's 0.4 × 2." },
        { text: "6.0", correct: false, feedback: "2/5 × 3 = 6/5 = 1.2, not 6.0." },
        { text: "2.4", correct: false, feedback: "Incorrect." }
      ],
    backward: "First convert, then multiply.",
    forward: "Fractions to decimals then operations are common in scaling."
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "5.75 + 2.3 - 3.125 = ?",
    options: [
        { text: "4.925", correct: true, feedback: "5.750 + 2.300 = 8.050; 8.050 - 3.125 = 4.925." },
        { text: "4.875", correct: false, feedback: "Incorrect subtraction." },
        { text: "5.925", correct: false, feedback: "Added 3.125 instead of subtracting." },
        { text: "4.9", correct: false, feedback: "Estimate only." }
      ],
    backward: "Align to thousandths and perform operations.",
    forward: "Precision in decimal arithmetic matters in science."
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "What is 3.2 × 1000? Then subtract 120 from the result.",
    options: [
        { text: "3080", correct: true, feedback: "3.2 × 1000 = 3200; 3200 - 120 = 3080." },
        { text: "3200", correct: false, feedback: "You forgot to subtract 120." },
        { text: "320", correct: false, feedback: "That's ×100." },
        { text: "3000", correct: false, feedback: "Estimate only." }
      ],
    backward: "Multiply by 1000 (move decimal three places right), then subtract.",
    forward: "Multi-step problems with powers of ten appear in finance."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write the decimal for 7 + \\(\\frac{2}{100}\\) + \\(\\frac{5}{1000}\\).",
    options: [
        { text: "7.025", correct: true, feedback: "7 ones + 0 tenths + 2 hundredths + 5 thousandths = 7.025." },
        { text: "7.25", correct: false, feedback: "You misplaced the decimal." },
        { text: "7.205", correct: false, feedback: "You placed 5 in hundredths." },
        { text: "7.052", correct: false, feedback: "Swapped hundredths and thousandths." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is smallest? 0.65, 0.6, 0.605, 0.56",
    options: [
        { text: "0.56", correct: true, feedback: "0.56 = 0.560, compared to 0.600, 0.605, 0.650." },
        { text: "0.6", correct: false, feedback: "0.6 = 0.600 > 0.560." },
        { text: "0.605", correct: false, feedback: "0.605 > 0.560." },
        { text: "0.65", correct: false, feedback: "0.65 is the largest." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 8.456 to the nearest tenth and nearest hundredth. Find the difference of the two rounded values.",
    options: [
        { text: "0.04", correct: true, feedback: "Nearest tenth: 8.5. Nearest hundredth: 8.46. Difference = 8.5 - 8.46 = 0.04." },
        { text: "0.1", correct: false, feedback: "Incorrect difference." },
        { text: "0.0", correct: false, feedback: "The two rounded values are not equal." },
        { text: "0.14", correct: false, feedback: "Incorrect difference." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.45 to a fraction in simplest form, then subtract \\(\\frac{1}{5}\\).",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "0.45 = 9/20. 1/5 = 4/20. 9/20 - 4/20 = 5/20 = 1/4." },
        { text: "\\(\\frac{9}{20}\\)", correct: false, feedback: "You forgot to subtract 1/5." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "That's the fraction subtracted, not the answer." },
        { text: "\\(\\frac{7}{20}\\)", correct: false, feedback: "Incorrect subtraction." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "7.8 + 1.25 - 4.6 = ?",
    options: [
        { text: "4.45", correct: true, feedback: "7.80 + 1.25 = 9.05; 9.05 - 4.60 = 4.45." },
        { text: "4.55", correct: false, feedback: "Incorrect subtraction." },
        { text: "3.45", correct: false, feedback: "Incorrect." },
        { text: "5.45", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.004 × ? = 4. Find ?.",
    options: [
        { text: "1000", correct: true, feedback: "4 ÷ 0.004 = 1000." },
        { text: "100", correct: false, feedback: "0.004 × 100 = 0.4." },
        { text: "10", correct: false, feedback: "0.004 × 10 = 0.04." },
        { text: "10000", correct: false, feedback: "0.004 × 10000 = 40." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 0.105, what is the value of the digit 1? Write as a fraction.",
    options: [
        { text: "\\(\\frac{1}{10}\\)", correct: true, feedback: "1 is in the tenths place → 1/10." },
        { text: "\\(\\frac{1}{100}\\)", correct: false, feedback: "That would be hundredths." },
        { text: "\\(\\frac{1}{1000}\\)", correct: false, feedback: "That would be thousandths." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "Not the place value fraction." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: 1.02, 1.002, 1.2, 1.022",
    options: [
        { text: "1.002, 1.02, 1.022, 1.2", correct: true, feedback: "1.002 < 1.020 < 1.022 < 1.200." },
        { text: "1.002, 1.022, 1.02, 1.2", correct: false, feedback: "1.02 is smaller than 1.022." },
        { text: "1.2, 1.022, 1.02, 1.002", correct: false, feedback: "That's descending." },
        { text: "1.02, 1.002, 1.022, 1.2", correct: false, feedback: "1.002 is the smallest, not second." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest hundredth is 9.35. Its thousandths digit is 7. What is the number?",
    options: [
        { text: "9.347", correct: true, feedback: "Range: 9.345-9.354. Hundredths=5, thousandths=7 → 9.347." },
        { text: "9.357", correct: false, feedback: "That rounds to 9.36." },
        { text: "9.345", correct: false, feedback: "Thousandths is 5, not 7." },
        { text: "9.350", correct: false, feedback: "That rounds to 9.35 but its thousandths digit is 0." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{3}{8}\\) to a decimal, then add 0.5.",
    options: [
        { text: "0.875", correct: true, feedback: "3/8 = 0.375; +0.5 = 0.875." },
        { text: "0.775", correct: false, feedback: "Incorrect addition." },
        { text: "0.8", correct: false, feedback: "Incorrect." },
        { text: "0.375", correct: false, feedback: "You forgot to add 0.5." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "9.05 - 2.7 + 1.375 = ?",
    options: [
        { text: "7.725", correct: true, feedback: "9.050 - 2.700 = 6.350; +1.375 = 7.725." },
        { text: "7.625", correct: false, feedback: "Incorrect." },
        { text: "8.725", correct: false, feedback: "Incorrect subtraction." },
        { text: "6.725", correct: false, feedback: "Forgot to add 1.375." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.6 × 100 = ? Then divide the result by 10.",
    options: [
        { text: "6", correct: true, feedback: "0.6 × 100 = 60; 60 ÷ 10 = 6." },
        { text: "60", correct: false, feedback: "You forgot to divide by 10." },
        { text: "600", correct: false, feedback: "Incorrect." },
        { text: "0.6", correct: false, feedback: "No net operation applied." }
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

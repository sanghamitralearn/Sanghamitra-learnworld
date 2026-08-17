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
    question: "In 3.57, what digit is in the tenths place?",
    options: [
        { text: "5", correct: true, feedback: "The first digit after the decimal point is tenths, so 5." },
        { text: "3", correct: false, feedback: "3 is in the ones place." },
        { text: "7", correct: false, feedback: "7 is in the hundredths place." },
        { text: "0", correct: false, feedback: "There is no 0 in the tenths place." }
      ],
    retryHint: "The tenths place is the first digit to the right of the decimal point."
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? 0.6 or 0.59",
    options: [
        { text: "0.6", correct: true, feedback: "Write both with two decimal places: 0.60 > 0.59." },
        { text: "0.59", correct: false, feedback: "More digits doesn't mean larger; 0.59 is smaller." },
        { text: "They are equal", correct: false, feedback: "0.60 ≠ 0.59." },
        { text: "Cannot compare", correct: false, feedback: "They can be compared by adding a zero to 0.6." }
      ],
    retryHint: "Write both numbers with the same number of decimal places, then compare."
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 4.73 to the nearest whole number.",
    options: [
        { text: "5", correct: true, feedback: "The tenths digit is 7 (≥5), so round up the ones digit from 4 to 5." },
        { text: "4", correct: false, feedback: "You truncated; the tenths digit 7 means you must round up." },
        { text: "4.7", correct: false, feedback: "That's rounding to the nearest tenth, not whole number." },
        { text: "47", correct: false, feedback: "The decimal point is not simply removed." }
      ],
    retryHint: "Look at the tenths digit. If it's 5 or more, increase the ones digit by 1."
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write \\(\\frac{7}{10}\\) as a decimal.",
    options: [
        { text: "0.7", correct: true, feedback: "Denominator 10 means one decimal place: 0.7." },
        { text: "7.0", correct: false, feedback: "That's 7, not 7/10." },
        { text: "0.07", correct: false, feedback: "That would be 7/100." },
        { text: "0.007", correct: false, feedback: "That's 7/1000." }
      ],
    retryHint: "The denominator tells you how many decimal places: 10 means one place."
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "2.3 + 1.5 = ?",
    options: [
        { text: "3.8", correct: true, feedback: "Add the ones: 2+1=3; add the tenths: 3+5=8 → 3.8." },
        { text: "3.35", correct: false, feedback: "You added digits without aligning the decimal point." },
        { text: "2.8", correct: false, feedback: "You forgot to add the ones from 1.5." },
        { text: "3.0", correct: false, feedback: "Incorrect addition." }
      ],
    retryHint: "Align the decimal points and add each column, starting from the right."
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.42 × 10 = ?",
    options: [
        { text: "4.2", correct: true, feedback: "Move the decimal point one place right → 4.2." },
        { text: "42", correct: false, feedback: "You moved the decimal point two places, which is ×100." },
        { text: "0.042", correct: false, feedback: "You moved the decimal point left." },
        { text: "0.420", correct: false, feedback: "The number didn't change." }
      ],
    retryHint: "Multiplying by 10 shifts the decimal point one place to the right."
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write 0.25 as a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{4}\\)", correct: true, feedback: "0.25 = 25/100 = 1/4." },
        { text: "\\(\\frac{25}{100}\\)", correct: false, feedback: "Not simplified; divide numerator and denominator by 25." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "2/5 = 0.4, not 0.25." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2." }
      ],
    retryHint: "Write the decimal as a fraction over 100, then simplify."
  },
  {
    itemId: "w8", order: 8, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "5.8 - 2.3 = ?",
    options: [
        { text: "3.5", correct: true, feedback: "5.8 - 2.3 = 3.5." },
        { text: "3.1", correct: false, feedback: "Incorrect subtraction." },
        { text: "2.5", correct: false, feedback: "Incorrect." },
        { text: "3.6", correct: false, feedback: "Off by 0.1." }
      ],
    retryHint: "Subtract digit by digit, keeping the decimal point aligned."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "What is the value of the digit 4 in 2.047?",
    options: [
        { text: "4 hundredths", correct: true, feedback: "The digit 4 is in the hundredths place, so its value is 4 hundredths." },
        { text: "4 tenths", correct: false, feedback: "The tenths place is the first digit after the decimal (0 here)." },
        { text: "4 thousandths", correct: false, feedback: "The thousandths place is the third digit (7 here)." },
        { text: "4 ones", correct: false, feedback: "The ones place is before the decimal (2 here)." }
      ],
    backward: "Place value chart: ones . tenths hundredths thousandths.",
    forward: "Knowing place values is essential for reading and writing decimals correctly."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is the smallest? 0.8, 0.75, 0.9, 0.79",
    options: [
        { text: "0.75", correct: true, feedback: "Align: 0.80, 0.75, 0.90, 0.79. Smallest is 0.75." },
        { text: "0.8", correct: false, feedback: "0.8 = 0.80 > 0.75." },
        { text: "0.9", correct: false, feedback: "0.9 = 0.90, the largest." },
        { text: "0.79", correct: false, feedback: "0.79 > 0.75." }
      ],
    backward: "Compare digits from left to right, adding zeros to make the same number of decimal places.",
    forward: "Ordering decimals is used in ranking, prices, and measurements."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 6.28 to the nearest tenth.",
    options: [
        { text: "6.3", correct: true, feedback: "The hundredths digit is 8 (≥5), so round up the tenths from 2 to 3 → 6.3." },
        { text: "6.2", correct: false, feedback: "You truncated; the hundredths digit 8 means round up." },
        { text: "6.0", correct: false, feedback: "That's rounding to the nearest whole number." },
        { text: "6.28", correct: false, feedback: "The number is unchanged; rounding must be applied." }
      ],
    backward: "Look at the digit in the hundredths place to decide whether to round the tenths up or keep it.",
    forward: "Rounding is used in money (nearest 10 paise) and measurement."
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.6 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "0.6 = 6/10 = 3/5." },
        { text: "\\(\\frac{6}{10}\\)", correct: false, feedback: "Not simplified; divide by 2." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Reciprocal confusion." },
        { text: "\\(\\frac{6}{100}\\)", correct: false, feedback: "0.6 is 6 tenths, not 6 hundredths." }
      ],
    backward: "Write the decimal as a fraction with denominator 10, then simplify.",
    forward: "Converting between fractions and decimals helps in comparing and calculating."
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "3.45 + 2.1 = ?",
    options: [
        { text: "5.55", correct: true, feedback: "Align: 3.45 + 2.10 = 5.55." },
        { text: "5.46", correct: false, feedback: "You misaligned the tenths and hundredths." },
        { text: "3.66", correct: false, feedback: "You added incorrectly." },
        { text: "5.56", correct: false, feedback: "Carry error in the hundredths column." }
      ],
    backward: "Align the decimal points; you can add a zero to 2.1 to make 2.10.",
    forward: "Addition with decimals is used in money and length calculations."
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.09 × 100 = ?",
    options: [
        { text: "9", correct: true, feedback: "Move the decimal point two places right: 0.09 → 9." },
        { text: "0.9", correct: false, feedback: "That's multiplying by 10, not 100." },
        { text: "0.009", correct: false, feedback: "You moved the decimal point the wrong way." },
        { text: "900", correct: false, feedback: "You moved the point four places." }
      ],
    backward: "Multiplying by 100 moves the decimal point two places to the right.",
    forward: "Multiplying by powers of ten is used when converting units (e.g., metres to centimetres)."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write the expanded form of 4.305.",
    options: [
        { text: "4 + \\(\\frac{3}{10}\\) + \\(\\frac{5}{1000}\\)", correct: true, feedback: "4 ones, 3 tenths, 0 hundredths, 5 thousandths." },
        { text: "4 + \\(\\frac{3}{10}\\) + \\(\\frac{5}{100}\\)", correct: false, feedback: "5 is in the thousandths place, not hundredths." },
        { text: "4 + \\(\\frac{3}{100}\\) + \\(\\frac{5}{1000}\\)", correct: false, feedback: "3 is in the tenths place, not hundredths." },
        { text: "4 + 0.3 + 0.05", correct: false, feedback: "Missing the thousandths part (0.005)." }
      ],
    backward: "Break each digit according to its place value: 4 ones, 3 tenths, 0 hundredths, 5 thousandths.",
    forward: "Expanded form helps understand the value of each digit and is the basis for decimal operations."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: 1.05, 1.5, 1.005, 1.055",
    options: [
        { text: "1.005, 1.05, 1.055, 1.5", correct: true, feedback: "Align with three places: 1.005, 1.050, 1.055, 1.500." },
        { text: "1.5, 1.055, 1.05, 1.005", correct: false, feedback: "That's descending." },
        { text: "1.05, 1.005, 1.055, 1.5", correct: false, feedback: "1.005 is smaller than 1.05." },
        { text: "1.005, 1.5, 1.05, 1.055", correct: false, feedback: "1.05 is smaller than 1.5." }
      ],
    backward: "Add zeros to make all numbers have three decimal places, then compare.",
    forward: "Ordering decimals is important in data analysis and ranking."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 3.456 to the nearest hundredth.",
    options: [
        { text: "3.46", correct: true, feedback: "The thousandths digit is 6 (≥5), so round up the hundredths from 5 to 6 → 3.46." },
        { text: "3.45", correct: false, feedback: "You truncated; thousandths digit 6 means round up." },
        { text: "3.5", correct: false, feedback: "That's rounding to the nearest tenth." },
        { text: "3.456", correct: false, feedback: "Unchanged." }
      ],
    backward: "Look at the thousandths digit (6); if ≥ 5, increase the hundredths digit by 1.",
    forward: "Rounding to hundredths is used in money (nearest paisa/cent)."
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write \\(\\frac{3}{4}\\) as a decimal.",
    options: [
        { text: "0.75", correct: true, feedback: "3 ÷ 4 = 0.75." },
        { text: "0.34", correct: false, feedback: "You wrote the numerator and denominator next to each other." },
        { text: "0.5", correct: false, feedback: "That's 1/2." },
        { text: "0.7", correct: false, feedback: "Approximation, not exact." }
      ],
    backward: "Divide the numerator by the denominator: 3 ÷ 4 = 0.75.",
    forward: "Fractions like 1/2, 1/4, 3/4 are common; knowing their decimal equivalents is useful."
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "7.6 - 4.38 = ?",
    options: [
        { text: "3.22", correct: true, feedback: "7.60 - 4.38 = 3.22." },
        { text: "3.38", correct: false, feedback: "You forgot to borrow across the zero." },
        { text: "2.22", correct: false, feedback: "Incorrect subtraction." },
        { text: "3.18", correct: false, feedback: "Off by 0.04." }
      ],
    backward: "Align decimal points; add a zero to 7.6 → 7.60. Subtract column by column.",
    forward: "Subtracting decimals is used in calculating change and differences in measurements."
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "5.3 × 1000 = ?",
    options: [
        { text: "5300", correct: true, feedback: "Move the decimal point three places right; fill with zeros → 5300." },
        { text: "53", correct: false, feedback: "That's ×10." },
        { text: "530", correct: false, feedback: "That's ×100." },
        { text: "53000", correct: false, feedback: "You moved the point four places." }
      ],
    backward: "Multiplying by 1000 moves the decimal point three places right.",
    forward: "This is how we convert kilograms to grams, and kilometres to metres."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 0.082, what digit is in the thousandths place?",
    options: [
        { text: "2", correct: true, feedback: "The thousandths place is the third digit after the decimal: 2." },
        { text: "0", correct: false, feedback: "0 is in the tenths place." },
        { text: "8", correct: false, feedback: "8 is in the hundredths place." },
        { text: "There is no thousandths place", correct: false, feedback: "There are three decimal places." }
      ],
    backward: "Count three places to the right of the decimal point.",
    forward: "Thousandths are used in precise measurements like medicine and engineering."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is greater? 0.099 or 0.1",
    options: [
        { text: "0.1", correct: true, feedback: "0.1 = 0.100 > 0.099." },
        { text: "0.099", correct: false, feedback: "More digits does not mean larger." },
        { text: "They are equal", correct: false, feedback: "0.100 ≠ 0.099." },
        { text: "Cannot compare", correct: false, feedback: "Add zeros to 0.1 to make 0.100, then compare." }
      ],
    backward: "Write both with three decimal places: 0.100 and 0.099. Compare 100 vs 99.",
    forward: "Comparing decimals accurately is crucial in science and finance."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 5.096 to the nearest tenth.",
    options: [
        { text: "5.1", correct: true, feedback: "The hundredths digit is 9 (≥5), so round up the tenths from 0 to 1 → 5.1." },
        { text: "5.0", correct: false, feedback: "You truncated, ignoring the hundredths digit 9." },
        { text: "5.09", correct: false, feedback: "That's rounding to the nearest hundredth." },
        { text: "5.2", correct: false, feedback: "Over-rounded." }
      ],
    backward: "Look at the hundredths place (9); because 9 ≥ 5, increase the tenths place by 1.",
    forward: "Rounding is used in weather reports (temperatures) and scientific data."
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.04 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{1}{25}\\)", correct: true, feedback: "0.04 = 4/100 = 1/25." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "2/5 = 0.4, not 0.04." },
        { text: "\\(\\frac{4}{10}\\)", correct: false, feedback: "4/10 = 0.4." },
        { text: "\\(\\frac{4}{100}\\)", correct: false, feedback: "Not simplified." }
      ],
    backward: "Write as 4/100, then divide numerator and denominator by 4.",
    forward: "Converting small decimals to fractions helps in probability and scaling."
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "0.8 + 0.25 + 0.125 = ?",
    options: [
        { text: "1.175", correct: true, feedback: "0.800 + 0.250 + 0.125 = 1.175." },
        { text: "1.075", correct: false, feedback: "You missed a carry." },
        { text: "0.1175", correct: false, feedback: "Decimal point misplaced." },
        { text: "1.165", correct: false, feedback: "Incorrect addition." }
      ],
    backward: "Align decimals; convert 0.8 to 0.800, 0.25 to 0.250, then add.",
    forward: "Adding multiple decimals is common in shopping bills and measurement."
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "67.8 ÷ 10 = ?",
    options: [
        { text: "6.78", correct: true, feedback: "Divide by 10 → move the decimal point one place left: 6.78." },
        { text: "678", correct: false, feedback: "You moved the decimal point right (multiplied)." },
        { text: "0.678", correct: false, feedback: "You moved two places left (÷100)." },
        { text: "67.8", correct: false, feedback: "No operation performed." }
      ],
    backward: "Dividing by 10 moves the decimal point one place to the left.",
    forward: "This is how we convert centimetres to metres, or paise to rupees."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Which number has 3 in the hundredths place? 0.435, 0.543, 0.354, 0.345",
    options: [
        { text: "0.435", correct: true, feedback: "Hundredths is the second decimal place: 0.435 → 3 in hundredths." },
        { text: "0.543", correct: false, feedback: "3 is in the tenths place." },
        { text: "0.354", correct: false, feedback: "3 is in the tenths place." },
        { text: "0.345", correct: false, feedback: "3 is in the tenths place." }
      ],
    backward: "The hundredths place is the second digit after the decimal point.",
    forward: "Place value precision is essential when measuring length, weight, and volume."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which list is in descending order? A) 2.3, 2.03, 2.33; B) 2.33, 2.3, 2.03; C) 2.03, 2.3, 2.33; D) 2.3, 2.33, 2.03",
    options: [
        { text: "B", correct: true, feedback: "2.33 > 2.30 > 2.03." },
        { text: "A", correct: false, feedback: "That's ascending order." },
        { text: "C", correct: false, feedback: "Ascending order." },
        { text: "D", correct: false, feedback: "Mixed order (2.33 > 2.03 but placed after 2.3)." }
      ],
    backward: "Write with two decimal places: 2.30, 2.03, 2.33. Then sort.",
    forward: "Recognising correct ordering is a quick test skill."
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 8.4. Its hundredths digit is 7. What is the number?",
    options: [
        { text: "8.37", correct: true, feedback: "Numbers rounding to 8.4 (nearest tenth) are between 8.35 and 8.44. The only one with hundredths digit 7 in that range is 8.37." },
        { text: "8.47", correct: false, feedback: "8.47 rounds to 8.5, not 8.4." },
        { text: "8.43", correct: false, feedback: "Hundredths digit is 3, not 7." },
        { text: "8.35", correct: false, feedback: "Hundredths digit is 5, not 7." }
      ],
    backward: "Find the range of numbers that round to 8.4 to the nearest tenth (8.35 to 8.44). Then find the one with hundredths 7.",
    forward: "This reverse rounding builds number sense."
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Which fraction is equivalent to 0.125?",
    options: [
        { text: "\\(\\frac{1}{8}\\)", correct: true, feedback: "0.125 = 125/1000 = 1/8." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "1/6 ≈ 0.1667." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "1/4 = 0.25." },
        { text: "\\(\\frac{1}{5}\\)", correct: false, feedback: "1/5 = 0.2." }
      ],
    backward: "Write as 125/1000 and simplify by dividing by 125.",
    forward: "1/8 is a common fraction in measurement (e.g., inches)."
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "12.5 - 3.75 + 2.1 = ?",
    options: [
        { text: "10.85", correct: true, feedback: "12.50 - 3.75 = 8.75; 8.75 + 2.10 = 10.85." },
        { text: "11.85", correct: false, feedback: "Incorrect subtraction." },
        { text: "10.75", correct: false, feedback: "Off by 0.1." },
        { text: "9.85", correct: false, feedback: "Subtraction error." }
      ],
    backward: "Perform operations in order: subtract, then add.",
    forward: "Mixed addition and subtraction of decimals is common in financial calculations."
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.07 × ? = 7. Fill in the blank.",
    options: [
        { text: "100", correct: true, feedback: "0.07 × 100 = 7." },
        { text: "10", correct: false, feedback: "0.07 × 10 = 0.7." },
        { text: "1000", correct: false, feedback: "0.07 × 1000 = 70." },
        { text: "0.01", correct: false, feedback: "0.07 × 0.01 = 0.0007." }
      ],
    backward: "Divide 7 by 0.07 to find the multiplier: 7 ÷ 0.07 = 100.",
    forward: "Inverse operations with powers of ten are used in unit conversions."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 2.961, what digit is in the tenths place?",
    options: [
        { text: "9", correct: true, feedback: "The tenths place is the first digit after the decimal: 9." },
        { text: "2", correct: false, feedback: "2 is in the ones place." },
        { text: "6", correct: false, feedback: "6 is in the hundredths place." },
        { text: "1", correct: false, feedback: "1 is in the thousandths place." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is larger? 0.45 or 0.405",
    options: [
        { text: "0.45", correct: true, feedback: "0.45 = 0.450 > 0.405." },
        { text: "0.405", correct: false, feedback: "0.450 > 0.405." },
        { text: "They are equal", correct: false, feedback: "0.450 ≠ 0.405." },
        { text: "Cannot compare", correct: false, feedback: "Add a zero to 0.45 and compare." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 7.862 to the nearest hundredth.",
    options: [
        { text: "7.86", correct: true, feedback: "The thousandths digit is 2 (<5), so keep the hundredths digit as 6." },
        { text: "7.87", correct: false, feedback: "You rounded up incorrectly." },
        { text: "7.8", correct: false, feedback: "That's to the nearest tenth." },
        { text: "7.862", correct: false, feedback: "Unchanged." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write \\(\\frac{1}{2}\\) as a decimal.",
    options: [
        { text: "0.5", correct: true, feedback: "1 ÷ 2 = 0.5." },
        { text: "0.2", correct: false, feedback: "That's not 1÷2." },
        { text: "1.2", correct: false, feedback: "Incorrect." },
        { text: "0.05", correct: false, feedback: "Decimal point misplaced." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "4.7 + 3.25 = ?",
    options: [
        { text: "7.95", correct: true, feedback: "4.70 + 3.25 = 7.95." },
        { text: "7.70", correct: false, feedback: "You forgot the hundredths." },
        { text: "8.00", correct: false, feedback: "Estimate only." },
        { text: "7.9", correct: false, feedback: "Missing the 5 hundredths." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "3.05 × 100 = ?",
    options: [
        { text: "305", correct: true, feedback: "Move the decimal two places right → 305." },
        { text: "30.5", correct: false, feedback: "That's ×10." },
        { text: "0.0305", correct: false, feedback: "You divided instead of multiplied." },
        { text: "3050", correct: false, feedback: "That's ×1000." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write 5.08 in expanded form.",
    options: [
        { text: "5 + \\(\\frac{8}{100}\\)", correct: true, feedback: "5 ones + 8 hundredths." },
        { text: "5 + \\(\\frac{8}{10}\\)", correct: false, feedback: "That would be 5.8, not 5.08." },
        { text: "5 + 0.8", correct: false, feedback: "That's 5.8, not 5.08." },
        { text: "5 + \\(\\frac{8}{1000}\\)", correct: false, feedback: "8 is in the hundredths place, not thousandths." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in descending order: 0.99, 0.9, 0.909, 0.099",
    options: [
        { text: "0.99, 0.909, 0.9, 0.099", correct: true, feedback: "0.990, 0.909, 0.900, 0.099." },
        { text: "0.9, 0.909, 0.99, 0.099", correct: false, feedback: "Not correctly ordered." },
        { text: "0.099, 0.9, 0.909, 0.99", correct: false, feedback: "That's ascending." },
        { text: "0.99, 0.9, 0.909, 0.099", correct: false, feedback: "0.909 is larger than 0.9." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 3.045 to the nearest tenth.",
    options: [
        { text: "3.0", correct: true, feedback: "The hundredths digit is 4 (<5), so keep the tenths as 0." },
        { text: "3.1", correct: false, feedback: "That would require the hundredths digit to be ≥5." },
        { text: "3.05", correct: false, feedback: "That's rounding to the nearest hundredth." },
        { text: "3.04", correct: false, feedback: "Not rounded to the nearest tenth." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.75 to a fraction in simplest form.",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "0.75 = 75/100 = 3/4." },
        { text: "\\(\\frac{75}{100}\\)", correct: false, feedback: "Not fully simplified." },
        { text: "\\(\\frac{3}{5}\\)", correct: false, feedback: "3/5 = 0.6, not 0.75." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "2/3 ≈ 0.667, not 0.75." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "9.6 - 2.78 = ?",
    options: [
        { text: "6.82", correct: true, feedback: "9.60 - 2.78 = 6.82." },
        { text: "6.22", correct: false, feedback: "Incorrect subtraction." },
        { text: "7.82", correct: false, feedback: "Incorrect." },
        { text: "7.22", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "48.5 ÷ 100 = ?",
    options: [
        { text: "0.485", correct: true, feedback: "Move the decimal point two places left → 0.485." },
        { text: "4850", correct: false, feedback: "You multiplied instead of dividing." },
        { text: "4.85", correct: false, feedback: "That's ÷10." },
        { text: "0.0485", correct: false, feedback: "That's ÷1000." }
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

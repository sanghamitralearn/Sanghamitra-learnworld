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
    question: "A decimal has 3 in the tenths place, 7 in the thousandths place, and 0 in all other places. What is the number? Then add 0.2 to it.",
    options: [
        { text: "0.307; 0.507", correct: true, feedback: "Number = 0.307. 0.307 + 0.200 = 0.507." },
        { text: "0.370; 0.570", correct: false, feedback: "You placed 7 in the hundredths place instead of thousandths." },
        { text: "0.037; 0.237", correct: false, feedback: "You misplaced the tenths digit." },
        { text: "0.307; 0.327", correct: false, feedback: "You added 0.02 instead of 0.2." }
      ],
    retryHint: "Write the number as 0.307 (3 tenths, 0 hundredths, 7 thousandths). Then add 0.200."
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "A number is between 0.12 and 0.19. Its hundredths digit is twice its tenths digit. What is the number?",
    options: [
        { text: "0.12", correct: true, feedback: "Tenths=1, hundredths=2 (twice 1). 0.12 is between 0.12 and 0.19." },
        { text: "0.24", correct: false, feedback: "0.24 is outside the range (greater than 0.19)." },
        { text: "0.21", correct: false, feedback: "Hundredths 1 is not twice tenths 2." },
        { text: "0.13", correct: false, feedback: "Hundredths 3 is not twice tenths 1." }
      ],
    retryHint: "The tenths digit is 1 (since numbers are 0.12-0.19). If hundredths = 2 × tenths, hundredths = 2. So number = 0.12."
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 4.5. When rounded to the nearest hundredth it is 4.53. The thousandths digit is 9. Find the number.",
    options: [
        { text: "4.529", correct: true, feedback: "4.529 rounds to 4.5 (tenth) and 4.53 (hundredth)." },
        { text: "4.534", correct: false, feedback: "4.534 also rounds to 4.5 and 4.53, but its thousandths digit is 4, not 9." },
        { text: "4.525", correct: false, feedback: "Thousandths digit is 5, not 9." },
        { text: "4.539", correct: false, feedback: "4.539 rounds to 4.5 (tenth) but to 4.54 (hundredth), not 4.53." }
      ],
    retryHint: "Numbers rounding to 4.5 (tenth) are 4.45-4.54. To also round to 4.53 (hundredth) they must be 4.525-4.534. With thousandths 9, the only possibility is 4.529."
  },
  {
    itemId: "w4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{7}{8}\\) to a decimal, round to the nearest hundredth, then add \\(\\frac{1}{4}\\) (as a decimal).",
    options: [
        { text: "1.13", correct: true, feedback: "7/8 = 0.875 → 0.88. 1/4 = 0.25. 0.88 + 0.25 = 1.13." },
        { text: "1.125", correct: false, feedback: "You used the exact value without rounding." },
        { text: "0.88", correct: false, feedback: "You forgot to add 1/4." },
        { text: "1.00", correct: false, feedback: "Incorrect rounding or addition." }
      ],
    retryHint: "Convert 7/8 to a decimal (0.875). Round to nearest hundredth (look at thousandths 5 → round up to 0.88). Then add 0.25."
  },
  {
    itemId: "w5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "12.7 - (4.35 + 2.8) = ?",
    options: [
        { text: "5.55", correct: true, feedback: "Inside brackets: 4.35+2.8=7.15. 12.7-7.15=5.55." },
        { text: "5.45", correct: false, feedback: "Subtraction error." },
        { text: "10.15", correct: false, feedback: "You subtracted 2.8 from 12.7 first, ignoring brackets." },
        { text: "5.65", correct: false, feedback: "Incorrect decimal alignment." }
      ],
    retryHint: "Follow BODMAS: first add inside brackets (4.35+2.8=7.15), then subtract from 12.7."
  },
  {
    itemId: "w6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number multiplied by 100 gives 6.5. What is the number? Then divide that number by 10.",
    options: [
        { text: "0.0065", correct: true, feedback: "Number = 6.5 ÷ 100 = 0.065. 0.065 ÷ 10 = 0.0065." },
        { text: "0.065", correct: false, feedback: "You only found the number, forgot to divide by 10." },
        { text: "0.65", correct: false, feedback: "You divided by 10 instead of 100." },
        { text: "650", correct: false, feedback: "You multiplied instead of divided." }
      ],
    retryHint: "Work backwards: 6.5 ÷ 100 = 0.065. Then 0.065 ÷ 10 = 0.0065."
  },
  {
    itemId: "w7", order: 7, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Which is larger? 0.625 or \\(\\frac{5}{8}\\)?",
    options: [
        { text: "They are equal", correct: true, feedback: "5/8 = 0.625. They are exactly the same." },
        { text: "0.625", correct: false, feedback: "They are equal, so neither is larger." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "They are equal." },
        { text: "Cannot compare", correct: false, feedback: "Convert 5/8 to 0.625; they are equal." }
      ],
    retryHint: "Convert 5/8 to a decimal by dividing 5 by 8."
  },
  {
    itemId: "w8", order: 8, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.04 × ? = 400. Find ?.",
    options: [
        { text: "10000", correct: true, feedback: "400 ÷ 0.04 = 10000." },
        { text: "1000", correct: false, feedback: "0.04 × 1000 = 40, not 400." },
        { text: "100", correct: false, feedback: "0.04 × 100 = 4." },
        { text: "10", correct: false, feedback: "0.04 × 10 = 0.4." }
      ],
    retryHint: "Divide 400 by 0.04 to find the missing multiplier."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "I am a decimal between 2 and 3. My tenths digit is twice my hundredths digit. The sum of all my digits is 10. The thousandths digit is the same as the tenths digit. What number am I?",
    options: [
        { text: "2.422", correct: true, feedback: "Digits: 2,4,2,2. Tenths=4, hundredths=2 (4=2×2), thousandths=4. Sum=2+4+2+2=10." },
        { text: "2.215", correct: false, feedback: "Tenths=2, hundredths=1 (2=2×1) works, but thousandths 5 is not equal to tenths 2." },
        { text: "2.844", correct: false, feedback: "Sum = 2+8+4+4=18, not 10." },
        { text: "2.241", correct: false, feedback: "Tenths=2, hundredths=4, but 2 is not twice 4." }
      ],
    backward: "Set up equations for the digits. Use the equal thousandths/tenths condition to filter possibilities.",
    forward: "Digit-riddle puzzles build algebraic modelling skills."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "In the ascending list: 0.3, ?, 0.45, 0.6, the missing number has two decimal places and its hundredths digit is 7. What is it?",
    options: [
        { text: "0.37", correct: true, feedback: "0.37 is between 0.30 and 0.45, and has two decimal places with hundredths digit 7." },
        { text: "0.57", correct: false, feedback: "0.57 > 0.45, so it wouldn't fit before 0.45." },
        { text: "0.27", correct: false, feedback: "0.27 < 0.3, would come before." },
        { text: "0.47", correct: false, feedback: "0.47 > 0.45, out of order." }
      ],
    backward: "A number between 0.3 and 0.45 with two decimal places can be 0.31 to 0.44. Pick the one with hundredths 7.",
    forward: "Placing numbers in order is a key skill for data handling."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 7.5. When rounded to the nearest hundredth, it is 7.46. The sum of its digits (ignoring the decimal point) is 20. Find the number.",
    options: [
        { text: "7.463", correct: true, feedback: "Range: 7.455-7.464. Digit sum: 7+4+6+3=20." },
        { text: "7.458", correct: false, feedback: "Sum 7+4+5+8=24." },
        { text: "7.460", correct: false, feedback: "Sum 7+4+6+0=17." },
        { text: "7.462", correct: false, feedback: "Sum 7+4+6+2=19." }
      ],
    backward: "Intersect the two rounding ranges, then find the number whose digits sum to 20.",
    forward: "Multiple constraints on rounding are common in measurement and engineering."
  },
  {
    itemId: "d4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{3}{16}\\) to a decimal. Then find \\(\\frac{1}{5}\\) of that decimal.",
    options: [
        { text: "0.0375", correct: true, feedback: "3/16 = 0.1875. 1/5 of 0.1875 = 0.0375." },
        { text: "0.375", correct: false, feedback: "That's 3/8, not 3/16." },
        { text: "0.1875", correct: false, feedback: "You forgot to find 1/5 of it." },
        { text: "0.09375", correct: false, feedback: "That's half of 0.1875, not 1/5." }
      ],
    backward: "Divide 3 by 16 to get 0.1875. Then divide by 5.",
    forward: "Fraction-of-a-decimal problems appear in recipes and measurements."
  },
  {
    itemId: "d5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "(8.6 - 3.25) + (4.7 - 1.85) = ?",
    options: [
        { text: "8.2", correct: true, feedback: "8.6-3.25=5.35; 4.7-1.85=2.85; sum = 8.2." },
        { text: "8.1", correct: false, feedback: "Off by 0.1." },
        { text: "7.2", correct: false, feedback: "Incorrect subtraction." },
        { text: "8.3", correct: false, feedback: "Carry error." }
      ],
    backward: "Evaluate each bracket separately, then add.",
    forward: "Bracketed expressions prepare for algebraic substitution."
  },
  {
    itemId: "d6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number is divided by 100, then the result is multiplied by 10 to give 0.56. What was the original number?",
    options: [
        { text: "5.6", correct: true, feedback: "Work backwards: 0.56 ÷ 10 = 0.056; 0.056 × 100 = 5.6." },
        { text: "0.056", correct: false, feedback: "That's after the first step backwards." },
        { text: "56", correct: false, feedback: "You multiplied by 100 at the wrong stage." },
        { text: "0.56", correct: false, feedback: "No operation reversed." }
      ],
    backward: "Reverse the steps: divide by 10, then multiply by 100.",
    forward: "Undoing power-of-ten shifts is common in unit conversions."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Use the digits 2, 0, 5, 7, 3 exactly once to form the smallest possible decimal between 20 and 30. The tenths digit must be odd. What is the number?",
    options: [
        { text: "20.357", correct: true, feedback: "Tens=2, ones=0. Smallest odd tenths digit from remaining {5,7,3} is 3. Then remaining digits 5 and 7 in ascending order: 5 then 7. Number = 20.357." },
        { text: "20.375", correct: false, feedback: "Tenths=3 is odd, but 20.357 is smaller." },
        { text: "20.537", correct: false, feedback: "Tenths=5, not the smallest odd possible." },
        { text: "23.057", correct: false, feedback: "Ones digit 3 makes the integer part larger." }
      ],
    backward: "Fix the integer part (20), then arrange the decimal digits to satisfy the constraint and minimise the value.",
    forward: "Optimisation under constraints is a key mathematical skill."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Multiply 0.25 by 3, and multiply 0.4 by 2. Which product is larger, and by how much?",
    options: [
        { text: "0.8 is larger by 0.05", correct: true, feedback: "0.25×3=0.75; 0.4×2=0.8. Difference = 0.05." },
        { text: "0.75 is larger by 0.05", correct: false, feedback: "0.75 < 0.8." },
        { text: "0.8 is larger by 0.5", correct: false, feedback: "The difference is 0.05, not 0.5." },
        { text: "They are equal", correct: false, feedback: "0.75 ≠ 0.8." }
      ],
    backward: "Compute each product, compare, and find the difference.",
    forward: "Comparing results of operations is a key checking strategy."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 3.96 to the nearest tenth, and 8.15 to the nearest whole number. Find the product of the two rounded numbers.",
    options: [
        { text: "32", correct: true, feedback: "3.96 → 4.0; 8.15 → 8; 4×8 = 32." },
        { text: "31.6", correct: false, feedback: "3.96×8.15 ≈ 32.3, not 31.6; you multiplied the originals instead of the rounded values." },
        { text: "32.4", correct: false, feedback: "Incorrect rounding." },
        { text: "30", correct: false, feedback: "8.15 rounds to 8, not 7." }
      ],
    backward: "Round first, then multiply.",
    forward: "Estimating products is faster than exact multiplication in many contexts."
  },
  {
    itemId: "d10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Order from smallest to largest: 0.4, \\(\\frac{3}{8}\\), 0.35, \\(\\frac{2}{5}\\).",
    options: [
        { text: "0.35, \\(\\frac{3}{8}\\), 0.4, \\(\\frac{2}{5}\\)", correct: true, feedback: "0.35 = 0.35; 3/8 = 0.375; 0.4 = 0.4; 2/5 = 0.4. So 0.35 < 0.375 < 0.4 (equal to 2/5)." },
        { text: "0.4, \\(\\frac{3}{8}\\), 0.35, \\(\\frac{2}{5}\\)", correct: false, feedback: "That's not ascending." },
        { text: "0.35, 0.4, \\(\\frac{3}{8}\\), \\(\\frac{2}{5}\\)", correct: false, feedback: "3/8 = 0.375 < 0.4." },
        { text: "\\(\\frac{3}{8}\\), 0.35, 0.4, \\(\\frac{2}{5}\\)", correct: false, feedback: "0.35 is smaller than 0.375." }
      ],
    backward: "Convert all to decimals to compare.",
    forward: "Mixed-format comparisons are common in real-world data."
  },
  {
    itemId: "d11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "? + 3.25 = 10.5 - 2.75. Find ?.",
    options: [
        { text: "4.5", correct: true, feedback: "10.5 - 2.75 = 7.75. ? = 7.75 - 3.25 = 4.5." },
        { text: "5.5", correct: false, feedback: "Incorrect subtraction." },
        { text: "4.0", correct: false, feedback: "Off by 0.5." },
        { text: "11.25", correct: false, feedback: "Incorrect combination of the operations." }
      ],
    backward: "First simplify the right side, then subtract the known addend.",
    forward: "Solving simple equations prepares for algebra."
  },
  {
    itemId: "d12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.05 × ? = 0.5. Then multiply the result (?) by 20.",
    options: [
        { text: "200", correct: true, feedback: "? = 0.5 ÷ 0.05 = 10. 10 × 20 = 200." },
        { text: "10", correct: false, feedback: "You only found ?." },
        { text: "20", correct: false, feedback: "Incorrect." },
        { text: "100", correct: false, feedback: "0.5 ÷ 0.05 = 10, not 5." }
      ],
    backward: "Find the missing multiplier first, then multiply by 20.",
    forward: "Two-step power-of-ten problems build fluency."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In the number 4.257, the digit 5 represents 5 hundredths. What is the sum of the values of the digits 2, 5, and 7?",
    options: [
        { text: "0.257", correct: true, feedback: "2 tenths = 0.2; 5 hundredths = 0.05; 7 thousandths = 0.007. Sum = 0.257." },
        { text: "2.57", correct: false, feedback: "You read the digits as a whole number." },
        { text: "0.275", correct: false, feedback: "Swapped places." },
        { text: "2.507", correct: false, feedback: "Incorrect." }
      ],
    backward: "Each digit's value is the digit multiplied by its place value.",
    forward: "Understanding digit values is essential for precise calculations."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "A number lies between 3.4 and 3.5. It has three decimal places. Its tenths digit is the same as its thousandths digit. The hundredths digit is 6. What is the number?",
    options: [
        { text: "3.464", correct: true, feedback: "Tenths=4, hundredths=6, thousandths=4 (same as tenths). 3.464 is between 3.4 and 3.5." },
        { text: "3.466", correct: false, feedback: "Thousandths 6 ≠ tenths 4." },
        { text: "3.446", correct: false, feedback: "Hundredths is 4, not 6." },
        { text: "3.564", correct: false, feedback: "Tenths 5, but the number must be between 3.4 and 3.5 (tenths digit 4)." }
      ],
    backward: "Fix the integer part (3) and tenths (4), apply the digit conditions.",
    forward: "Digit-constraint puzzles build logical reasoning."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 2.387 to the nearest hundredth, multiply by 100, then subtract 50.",
    options: [
        { text: "189", correct: true, feedback: "2.387 → 2.39 (thousandths 7≥5). 2.39×100=239. 239-50=189." },
        { text: "188", correct: false, feedback: "You truncated instead of rounding." },
        { text: "190", correct: false, feedback: "Rounding error." },
        { text: "2.39", correct: false, feedback: "You only rounded, forgot the rest." }
      ],
    backward: "Round first, then multiply by 100, then subtract 50.",
    forward: "Chaining operations after rounding is common in estimation."
  },
  {
    itemId: "d16", order: 16, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(1\\frac{3}{5}\\) to a decimal, then add 2.75.",
    options: [
        { text: "4.35", correct: true, feedback: "1 3/5 = 1.6. 1.6 + 2.75 = 4.35." },
        { text: "4.4", correct: false, feedback: "Incorrect addition." },
        { text: "3.35", correct: false, feedback: "You only used the decimal part (0.6) and added 2.75." },
        { text: "1.6", correct: false, feedback: "You only converted to decimal." }
      ],
    backward: "Convert the mixed number to a decimal, then add.",
    forward: "Mixed number conversions appear in recipes and construction."
  },
  {
    itemId: "d17", order: 17, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find 9.06 - 4.87, round the result to the nearest tenth, and multiply by 10.",
    options: [
        { text: "42", correct: true, feedback: "9.06-4.87=4.19. Nearest tenth: 4.2. ×10=42." },
        { text: "41.9", correct: false, feedback: "You multiplied the exact result by 10." },
        { text: "4.2", correct: false, feedback: "You only rounded." },
        { text: "419", correct: false, feedback: "You multiplied 4.19 by 100 instead of 4.2 by 10." }
      ],
    backward: "Subtract, round, then multiply.",
    forward: "Multi-step decimal operations appear in financial calculations."
  },
  {
    itemId: "d18", order: 18, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number divided by 1000 gives 0.028. What is the number? Then divide that number by 100.",
    options: [
        { text: "0.28", correct: true, feedback: "Number = 0.028 × 1000 = 28. 28 ÷ 100 = 0.28." },
        { text: "2.8", correct: false, feedback: "28 ÷ 10 = 2.8, not ÷100." },
        { text: "0.028", correct: false, feedback: "That's the number after only the first step." },
        { text: "280", correct: false, feedback: "You multiplied by 1000 incorrectly." }
      ],
    backward: "Undo the division: multiply by 1000. Then perform the new division.",
    forward: "Working backwards through operations is a key problem-solving strategy."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "I am a decimal between 0 and 1. My tenths digit is the smallest prime number. My hundredths digit is the square of my tenths digit. My thousandths digit is the difference between my hundredths and tenths digits. What number am I? Then find \\(\\frac{1}{4}\\) of this number.",
    options: [
        { text: "0.0605", correct: true, feedback: "Number = 0.242. 1/4 of 0.242 = 0.0605." },
        { text: "0.242", correct: false, feedback: "You forgot to find 1/4 of it." },
        { text: "0.0242", correct: false, feedback: "Decimal misplaced." },
        { text: "0.0805", correct: false, feedback: "Incorrect number or fraction." }
      ],
    backward: "Smallest prime = 2. Tenths=2. Hundredths=2²=4. Thousandths=4-2=2. Number = 0.242. Then multiply by 1/4 (or divide by 4).",
    forward: "Descriptive digit puzzles build strong number sense."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "From the numbers 0.87, 0.8, 0.809, 0.88, find the difference between the largest and the smallest.",
    options: [
        { text: "0.08", correct: true, feedback: "Largest = 0.88, smallest = 0.8. Difference = 0.08." },
        { text: "0.07", correct: false, feedback: "Incorrect largest or smallest." },
        { text: "0.1", correct: false, feedback: "0.88 - 0.8 = 0.08, not 0.1." },
        { text: "0.01", correct: false, feedback: "Much too small." }
      ],
    backward: "Align all numbers to three decimal places, find max and min, subtract.",
    forward: "Range calculations are common in data analysis."
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 6.3. Rounded to the nearest hundredth, it is 6.28. The digit sum is 18. Find the number.",
    options: [
        { text: "6.282", correct: true, feedback: "Range: 6.275-6.284. Digit sum: 6+2+8+2=18." },
        { text: "6.275", correct: false, feedback: "Sum = 6+2+7+5=20." },
        { text: "6.280", correct: false, feedback: "Sum = 16." },
        { text: "6.283", correct: false, feedback: "Sum = 19." }
      ],
    backward: "Intersect rounding ranges, then test digit sums.",
    forward: "Multiple constraints appear in measurement tolerances."
  },
  {
    itemId: "d22", order: 22, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.075 to a fraction in simplest form. Then find \\(\\frac{2}{3}\\) of that fraction.",
    options: [
        { text: "\\(\\frac{1}{20}\\)", correct: true, feedback: "0.075 = 75/1000 = 3/40. 2/3 × 3/40 = 2/40 = 1/20." },
        { text: "\\(\\frac{3}{40}\\)", correct: false, feedback: "You forgot to find 2/3 of it." },
        { text: "\\(\\frac{1}{15}\\)", correct: false, feedback: "Incorrect fraction multiplication." },
        { text: "\\(\\frac{2}{15}\\)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Convert decimal to fraction, simplify, then multiply by 2/3.",
    forward: "Linking decimals, fractions, and fraction-of-a-fraction operations."
  },
  {
    itemId: "d23", order: 23, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the sum of 4.5, 3.25, and 2.75. Subtract this sum from 20, then divide the result by 2.",
    options: [
        { text: "4.75", correct: true, feedback: "Sum = 10.5. 20 - 10.5 = 9.5. 9.5 ÷ 2 = 4.75." },
        { text: "9.5", correct: false, feedback: "You only did the subtraction." },
        { text: "5.25", correct: false, feedback: "Incorrect sum." },
        { text: "10.5", correct: false, feedback: "You only found the sum." }
      ],
    backward: "Add first, subtract from 20, then divide by 2.",
    forward: "Chained operations mirror real-world budgeting and averaging."
  },
  {
    itemId: "d24", order: 24, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number is divided by 1000, then by 10, giving 0.003. What is the original number?",
    options: [
        { text: "30", correct: true, feedback: "Work backwards: 0.003 × 10 = 0.03; 0.03 × 1000 = 30." },
        { text: "3", correct: false, feedback: "You only did one reverse step." },
        { text: "0.3", correct: false, feedback: "0.003 × 1000 = 3, not 0.3." },
        { text: "300", correct: false, feedback: "Over-corrected." }
      ],
    backward: "Reverse the operations: multiply by 10, then by 1000.",
    forward: "Reversing multiple power-of-ten shifts is used in metric conversions."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "I am a decimal between 1 and 2. My tenths digit is 3 times my hundredths digit. The sum of all my digits is 8. All digits are greater than 0. Find me.",
    options: [
        { text: "1.313", correct: true, feedback: "Digits: 1,3,1,3. Tenths=3, hundredths=1 (3=3×1). All digits >0. Sum = 1+3+1+3=8." },
        { text: "1.007", correct: false, feedback: "Digits include 0, which is not allowed (all digits must be >0)." },
        { text: "1.331", correct: false, feedback: "Tenths=3, hundredths=3, and 3 is not 3 times 3." },
        { text: "1.133", correct: false, feedback: "Tenths=1, hundredths=3, and 1 is not 3 times 3." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "A number is between 0.35 and 0.45. Its hundredths digit is twice its tenths digit. What is the number?",
    options: [
        { text: "0.36", correct: true, feedback: "Tenths=3, hundredths=6 (2×3). 0.36 is between 0.35 and 0.45." },
        { text: "0.48", correct: false, feedback: "0.48 > 0.45." },
        { text: "0.24", correct: false, feedback: "0.24 < 0.35." },
        { text: "0.63", correct: false, feedback: "0.63 > 0.45." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest tenth is 9.2. Rounded to the nearest hundredth, it is 9.18. The sum of its digits is 23. Find the number.",
    options: [
        { text: "9.176", correct: true, feedback: "Range: 9.175-9.184. Digit sum: 9+1+7+6=23." },
        { text: "9.175", correct: false, feedback: "Sum = 22." },
        { text: "9.184", correct: false, feedback: "Sum = 22." },
        { text: "9.177", correct: false, feedback: "Sum = 24." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 0.0625 to a fraction in simplest form, then add \\(\\frac{1}{8}\\).",
    options: [
        { text: "\\(\\frac{3}{16}\\)", correct: true, feedback: "0.0625 = 1/16. 1/16 + 2/16 = 3/16." },
        { text: "\\(\\frac{1}{16}\\)", correct: false, feedback: "You forgot to add 1/8." },
        { text: "\\(\\frac{5}{16}\\)", correct: false, feedback: "Incorrect addition." },
        { text: "\\(\\frac{1}{8}\\)", correct: false, feedback: "Only the added fraction." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "(6.7 + 3.85) - (2.6 - 0.75) = ?",
    options: [
        { text: "8.7", correct: true, feedback: "6.7+3.85=10.55; 2.6-0.75=1.85; 10.55-1.85=8.7." },
        { text: "7.7", correct: false, feedback: "Incorrect." },
        { text: "9.7", correct: false, feedback: "Added the second bracket instead of subtracting." },
        { text: "8.6", correct: false, feedback: "Off by 0.1." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "0.002 × ? = 0.2. Then divide ? by 10.",
    options: [
        { text: "10", correct: true, feedback: "? = 0.2 ÷ 0.002 = 100. 100 ÷ 10 = 10." },
        { text: "100", correct: false, feedback: "You only found ?." },
        { text: "1000", correct: false, feedback: "0.2 ÷ 0.002 = 100, not 1000." },
        { text: "1", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Use the digits 4, 0, 1, 9, 6 exactly once to form the largest decimal between 0 and 1. The tenths digit must be even. What is the number?",
    options: [
        { text: "0.69410", correct: true, feedback: "Largest even tenths digit from {6,4,0} is 6. Then arrange remaining digits 9,4,1,0 in descending order: 0.69410." },
        { text: "0.96410", correct: false, feedback: "Tenths digit 9 is odd." },
        { text: "0.61490", correct: false, feedback: "Not the largest arrangement after fixing tenths=6." },
        { text: "0.96140", correct: false, feedback: "Tenths digit 9 is odd." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Multiply 0.15 by 6, and multiply 0.9 by 1. Which is larger, and by how much?",
    options: [
        { text: "They are equal (difference 0)", correct: true, feedback: "0.15×6=0.9; 0.9×1=0.9." },
        { text: "0.9 is larger by 0.1", correct: false, feedback: "They are equal." },
        { text: "0.15×6 is larger by 0.1", correct: false, feedback: "Both are 0.9." },
        { text: "0.9×1 is larger by 0.01", correct: false, feedback: "No difference." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 5.697 to the nearest tenth, then add 2.3. Then round the sum to the nearest whole number.",
    options: [
        { text: "8", correct: true, feedback: "5.697 → 5.7. +2.3 = 8.0 → nearest whole is 8." },
        { text: "7.7", correct: false, feedback: "You only rounded and added, forgot the final rounding." },
        { text: "8.3", correct: false, feedback: "Incorrect addition." },
        { text: "9", correct: false, feedback: "5.697 rounds to 5.7 to the nearest tenth, not 6." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert \\(\\frac{2}{5}\\) to a decimal, multiply by 0.5, then add 0.1.",
    options: [
        { text: "0.3", correct: true, feedback: "2/5 = 0.4. 0.4×0.5=0.2. 0.2+0.1=0.3." },
        { text: "0.5", correct: false, feedback: "Incorrect." },
        { text: "0.6", correct: false, feedback: "0.4×0.5=0.2, not 0.5." },
        { text: "0.25", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "10 - (2.5 + 3.75) + 1.2 = ?",
    options: [
        { text: "4.95", correct: true, feedback: "2.5+3.75=6.25; 10-6.25=3.75; +1.2=4.95." },
        { text: "5.05", correct: false, feedback: "Incorrect." },
        { text: "4.85", correct: false, feedback: "Off by 0.1." },
        { text: "5.95", correct: false, feedback: "Added 1.2 inside the bracket." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "MUL10", clusterName: CLUSTER_NAMES.MUL10,
    question: "A number multiplied by 1000 gives 45. What is the number? Then add 0.5.",
    options: [
        { text: "0.545", correct: true, feedback: "45 ÷ 1000 = 0.045. +0.5 = 0.545." },
        { text: "0.045", correct: false, feedback: "You forgot to add 0.5." },
        { text: "45.5", correct: false, feedback: "You added 0.5 before dividing." },
        { text: "4.5", correct: false, feedback: "Incorrect." }
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

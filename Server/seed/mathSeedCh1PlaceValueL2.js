// seed/mathSeedCh1PlaceValueL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 2 — converted from the standalone
// HTML file ch-1-place-value-level-2.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 2;

const CLUSTER_NAMES = {
  PLACE: "Place Value & Expanded Form",
  COMP: "Comparing & Ordering Numbers",
  ROUND: "Rounding & Estimation",
  ROMAN: "Roman Numerals",
  NEG: "Negative Numbers in Context",
  CONV: "Indian – International System"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "What is the place value of 7 in 4,73,215?",
    options: [
        { text: "70,000", correct: true, feedback: "The 7 is in the ten-thousands place (Indian system)." },
        { text: "7,000", correct: false, feedback: "That would be the thousands place." },
        { text: "700", correct: false, feedback: "That's the hundreds place." },
        { text: "7,00,000", correct: false, feedback: "That's the lakhs place." }
      ],
    retryHint: "Identify the period of the digit 7: ones, thousands, or lakhs?"
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is the largest? \\( 3,45,678 \\) or \\( 3,54,678 \\)?",
    options: [
        { text: "\\( 3,54,678 \\)", correct: true, feedback: "Compare the ten-thousands place: 5 > 4." },
        { text: "\\( 3,45,678 \\)", correct: false, feedback: "Check the digit after 3,45…" },
        { text: "They are equal", correct: false, feedback: "They differ in the ten-thousands place." },
        { text: "Cannot compare", correct: false, feedback: "They have the same number of digits, so they can be compared." }
      ],
    retryHint: "Start from the left and compare the first digit that differs."
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 4,76,230 to the nearest 1,000.",
    options: [
        { text: "4,76,000", correct: true, feedback: "The hundreds digit is 2 (<5), so round down." },
        { text: "4,77,000", correct: false, feedback: "Rounding up would require a hundreds digit of 5 or more." },
        { text: "4,80,000", correct: false, feedback: "That's rounding to the nearest ten-thousand." },
        { text: "5,00,000", correct: false, feedback: "Rounding to the nearest lakh would give 5,00,000." }
      ],
    retryHint: "Look at the hundreds digit (the next smaller place)."
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Write 49 in Roman numerals.",
    options: [
        { text: "XLIX", correct: true, feedback: "40 (XL) + 9 (IX)." },
        { text: "IL", correct: false, feedback: "You can't subtract I from L; use XLIX." },
        { text: "XXXXIX", correct: false, feedback: "We never write four of the same symbol in a row." },
        { text: "XLIV", correct: false, feedback: "XLIV is 44." }
      ],
    retryHint: "Break it into 40 + 9 and convert each part."
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "Which temperature is colder: \\( -2^\\circ\\text{C} \\) or \\( -7^\\circ\\text{C} \\)?",
    options: [
        { text: "\\( -7^\\circ\\text{C} \\)", correct: true, feedback: "The more negative the number, the colder the temperature." },
        { text: "\\( -2^\\circ\\text{C} \\)", correct: false, feedback: "-2 is warmer than -7." },
        { text: "They are equally cold", correct: false, feedback: "Negative numbers represent different temperatures." },
        { text: "Cannot compare", correct: false, feedback: "Both are on the same scale, so they can be compared." }
      ],
    retryHint: "On a number line, numbers further left are smaller (colder)."
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write 6,78,345 in the International system.",
    options: [
        { text: "678,345", correct: true, feedback: "Indian 6,78,345 = 678 thousand 345." },
        { text: "6,783,450", correct: false, feedback: "You've shifted the digits incorrectly." },
        { text: "67,83,450", correct: false, feedback: "That's a mix of both systems." },
        { text: "6,78,345 (same)", correct: false, feedback: "Commas differ; international uses groups of three." }
      ],
    retryHint: "Indian: first comma after hundreds, then after thousands, etc. International: groups of three."
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In the number 9,05,432, what digit is in the ten-thousands place?",
    options: [
        { text: "0", correct: true, feedback: "The ten-thousands place is the second digit from the left (90,5…)." },
        { text: "9", correct: false, feedback: "9 is in the lakhs place." },
        { text: "5", correct: false, feedback: "5 is in the thousands place." },
        { text: "4", correct: false, feedback: "4 is in the hundreds place." }
      ],
    retryHint: "Write the number with place values: L T-Th Th H T O."
  },
  {
    itemId: "w8", order: 8, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 2,49,999 to the nearest 10,000.",
    options: [
        { text: "2,50,000", correct: true, feedback: "The thousands digit is 9, which is ≥5, so round up." },
        { text: "2,40,000", correct: false, feedback: "That would be rounding down." },
        { text: "2,49,000", correct: false, feedback: "Rounding to the nearest thousand would give this." },
        { text: "2,00,000", correct: false, feedback: "Rounding to the nearest lakh would give 2,00,000." }
      ],
    retryHint: "Look at the thousands digit; rounding to nearest 10,000."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "A number has 7 lakhs, 3 ten-thousands, 8 hundreds, and 5 ones. The thousands place is empty. What is the number?",
    options: [
        { text: "7,30,805", correct: true, feedback: "7,00,000 + 30,000 + 800 + 5 = 7,30,805." },
        { text: "7,38,005", correct: false, feedback: "You put the 8 in the thousands place instead of hundreds." },
        { text: "7,30,085", correct: false, feedback: "You swapped the hundreds and tens." },
        { text: "73,08,005", correct: false, feedback: "That's an incorrect grouping — mixing Indian and International commas." }
      ],
    backward: "Place value chart: L | T-Th | Th | H | T | O.",
    forward: "This place value awareness will help you master addition and subtraction of large numbers."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange these numbers in descending order: 5,43,210; 5,34,210; 5,43,201; 5,34,201.",
    options: [
        { text: "5,43,210; 5,43,201; 5,34,210; 5,34,201", correct: true, feedback: "Compare lakhs (all 5), then ten-thousands (43 vs 34), then thousands, then hundreds, etc." },
        { text: "5,34,210; 5,34,201; 5,43,210; 5,43,201", correct: false, feedback: "That's ascending order — smallest first." },
        { text: "5,43,210; 5,34,210; 5,43,201; 5,34,201", correct: false, feedback: "5,34,210 should come after 5,43,201, not before it." },
        { text: "5,43,201; 5,43,210; 5,34,201; 5,34,210", correct: false, feedback: "5,43,210 is larger than 5,43,201 because 210 > 201." }
      ],
    backward: "Start from the leftmost digit and compare; only move right when digits are equal.",
    forward: "Ordering numbers is essential for interpreting data and creating graphs."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A mystery number, when rounded to the nearest 1,000, becomes 48,000. The sum of its digits is 15. Which of these could be the number?",
    options: [
        { text: "48,120", correct: true, feedback: "48,120 rounds to 48,000 (hundreds digit 1 < 5). Digit sum: 4+8+1+2+0 = 15." },
        { text: "47,990", correct: false, feedback: "Rounds to 48,000 (hundreds 9 ≥ 5), but digit sum 4+7+9+9+0 = 29, not 15." },
        { text: "48,550", correct: false, feedback: "Rounds to 49,000 (hundreds 5 → round up), and sum = 22." },
        { text: "47,450", correct: false, feedback: "Rounds down to 47,000 (hundreds 4), sum = 20." }
      ],
    backward: "To round to nearest 1,000, look at the hundreds digit. Sum of digits is just adding each digit once.",
    forward: "This skill is used in real-life estimation: budgeting, distances, time."
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Which of these Roman numerals is written correctly for the number 99?",
    options: [
        { text: "XCIX", correct: true, feedback: "90 = XC (100-10), 9 = IX (10-1) → XCIX." },
        { text: "IC", correct: false, feedback: "You cannot subtract I (1) directly from C (100). The correct subtractive form uses XC for 90." },
        { text: "LXXXXIX", correct: false, feedback: "We never use four of the same symbol in a row; LXXXX should be XC." },
        { text: "LXXXIX", correct: false, feedback: "LXXXIX = 89, not 99." }
      ],
    backward: "Roman rules: I, X, C, M can be subtracted from the next two higher values only.",
    forward: "Roman numerals appear on clocks, book chapters, and movie sequels."
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "The temperature at 6 am was \\( -8^\\circ\\text{C} \\). By noon it had risen by \\( 15^\\circ\\text{C} \\). What was the noon temperature?",
    options: [
        { text: "\\( 7^\\circ\\text{C} \\)", correct: true, feedback: "Start at -8, add 15: -8 + 15 = 7." },
        { text: "\\( 23^\\circ\\text{C} \\)", correct: false, feedback: "You added 15 + 8 instead of considering the negative." },
        { text: "\\( -23^\\circ\\text{C} \\)", correct: false, feedback: "That would be -8 - 15." },
        { text: "\\( -7^\\circ\\text{C} \\)", correct: false, feedback: "You added incorrectly: -8 + 15 is positive 7." }
      ],
    backward: "Use a number line: move right for a rise, left for a fall.",
    forward: "This thinking is used in bank balances, altitude changes, and science."
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A newspaper reports a population of 'twelve lakh forty-five thousand six hundred'. Write this in the International system.",
    options: [
        { text: "1,245,600", correct: true, feedback: "12 lakh = 1,200,000; 45 thousand = 45,000; 600 → total 1,245,600." },
        { text: "12,45,600", correct: false, feedback: "That's still Indian notation." },
        { text: "1,024,560", correct: false, feedback: "You misread 'twelve lakh' as 1,024,560." },
        { text: "124,560", correct: false, feedback: "That's one lakh twenty-four thousand five hundred sixty — missing a zero." }
      ],
    backward: "1 lakh = 100,000; 10 lakh = 1,000,000.",
    forward: "Understanding both systems is vital for reading international news and data."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In the International number 4,309,017, what digit is in the hundred-thousands place?",
    options: [
        { text: "3", correct: true, feedback: "In 4,309,017: millions (4), hundred-thousands (3), ten-thousands (0), thousands (9), etc." },
        { text: "0", correct: false, feedback: "0 is in the ten-thousands place." },
        { text: "9", correct: false, feedback: "9 is in the thousands place." },
        { text: "4", correct: false, feedback: "4 is in the millions place." }
      ],
    backward: "International periods: Millions, Thousands, Ones (each group of three).",
    forward: "This precision is needed when interpreting large datasets like population or GDP."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which digit could replace the □ so that  8,4□,675 > 8,48,999 ?",
    options: [
        { text: "9", correct: true, feedback: "If □=9, the thousands digit becomes 9, making the number 8,49,675 which is indeed > 8,48,999." },
        { text: "7", correct: false, feedback: "8,47,675 < 8,48,999 because 7 < 8 in the thousands place." },
        { text: "8", correct: false, feedback: "If □=8, we compare next place: 8,48,675 vs 8,48,999 → hundreds 6 vs 9, so 8,48,675 < 8,48,999." },
        { text: "0", correct: false, feedback: "8,40,675 is much smaller than 8,48,999." }
      ],
    backward: "When the larger places are equal, move to the next place on the right.",
    forward: "This careful comparison is essential when sorting large datasets."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A shopkeeper rounded the price of a product to the nearest 100 and wrote ₹4,500. What is the maximum possible actual price?",
    options: [
        { text: "₹4,549", correct: true, feedback: "Numbers up to 4,549 round down to 4,500; 4,550 would round up to 4,600." },
        { text: "₹4,599", correct: false, feedback: "4,599 rounds to 4,600, because the tens digit is 9 (≥5)." },
        { text: "₹4,499", correct: false, feedback: "That's the maximum that rounds to 4,400, not 4,500." },
        { text: "₹4,500", correct: false, feedback: "That's the rounded value; the actual could be higher." }
      ],
    backward: "Rounding to nearest 100: if tens digit ≥ 5, round up; else down.",
    forward: "Understanding rounding errors is key in finance and science."
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "A book has chapter numbers in Roman numerals. The last chapter is CCXLVI. What is this in the usual number system?",
    options: [
        { text: "246", correct: true, feedback: "CC=200, XL=40, VI=6 → 246." },
        { text: "256", correct: false, feedback: "You might have misread XL as 50 (L) instead of 40." },
        { text: "446", correct: false, feedback: "CD would be 400, but here CC=200." },
        { text: "146", correct: false, feedback: "You might have subtracted C wrongly." }
      ],
    backward: "C=100, XL=40, VI=6.",
    forward: "Roman numerals are used in outlines, old buildings, and formal titles."
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A diver is 12 m below sea level. She ascends 5 m, then descends 3 m. What is her final position relative to sea level?",
    options: [
        { text: "10 m below sea level", correct: true, feedback: "Start at -12, up 5 → -7, down 3 → -10 (10 m below)." },
        { text: "4 m below sea level", correct: false, feedback: "You might have subtracted 12-5-3=4, ignoring the negative start." },
        { text: "10 m above sea level", correct: false, feedback: "Sign error: -12 + 5 - 3 = -10, not +10." },
        { text: "20 m below sea level", correct: false, feedback: "You added 12+5+3 instead of tracking direction." }
      ],
    backward: "Below sea level is negative; ascending means adding, descending means subtracting.",
    forward: "This logic applies to bank balances and elevation changes."
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert 3,450,000 (International) into the Indian system.",
    options: [
        { text: "34,50,000", correct: true, feedback: "3,450,000 = 3 million 450 thousand. In Indian: 34 lakh 50 thousand = 34,50,000." },
        { text: "3,45,00,000", correct: false, feedback: "That would be 3 crore 45 lakh, which is 34.5 million, not 3.45 million." },
        { text: "345,000", correct: false, feedback: "That's just 345 thousand." },
        { text: "3,45,000", correct: false, feedback: "You lost a zero; 3,45,000 is only 345 thousand." }
      ],
    backward: "1 million = 10 lakh; 1 hundred-thousand = 1 lakh.",
    forward: "Knowing conversions helps when reading Indian and international financial news."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Write the expanded form of 80,70,306 (Indian system).",
    options: [
        { text: "\\( 8 \\times 10,00,000 + 0 \\times 1,00,000 + 7 \\times 10,000 + 0 \\times 1,000 + 3 \\times 100 + 0 \\times 10 + 6 \\times 1 \\)", correct: true, feedback: "80,70,306 = 8×10,00,000 (80 lakh) + 7×10,000 + 3×100 + 6." },
        { text: "\\( 8 \\times 1,00,000 + 7 \\times 10,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "That would be 8,70,306, missing the zero in ten-lakhs place." },
        { text: "\\( 8 \\times 10,00,000 + 7 \\times 1,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "7 is in ten-thousands, not thousands." },
        { text: "\\( 8 \\times 10,00,000 + 7 \\times 1,00,000 + 3 \\times 100 + 6 \\)", correct: false, feedback: "That would be 87,00,306." }
      ],
    backward: "Use the place value chart to find what each digit multiplies.",
    forward: "Expanded form is the basis for algorithms like multiplication."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which number is exactly halfway between 3,45,000 and 3,55,000?",
    options: [
        { text: "3,50,000", correct: true, feedback: "Half the difference (10,000) is 5,000, added to the smaller gives 3,50,000." },
        { text: "3,45,500", correct: false, feedback: "That's the midpoint of 3,45,000 and 3,46,000." },
        { text: "3,52,500", correct: false, feedback: "That is closer to 3,55,000." },
        { text: "3,47,500", correct: false, feedback: "That's the midpoint of 3,45,000 and 3,50,000." }
      ],
    backward: "Midpoint = (small + large) ÷ 2.",
    forward: "Finding midpoints is useful for estimating and for understanding mean."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A stadium's capacity is 67,845. Round this to the nearest hundred and to the nearest thousand. What is the sum of the two rounded values?",
    options: [
        { text: "1,35,800", correct: true, feedback: "67,845 → nearest 100: 67,800 (tens digit 4). Nearest 1,000: 68,000 (hundreds 8). Sum = 67,800 + 68,000 = 1,35,800." },
        { text: "1,35,900", correct: false, feedback: "Check the rounding: nearest 100 is 67,800, not 67,900." },
        { text: "1,36,000", correct: false, feedback: "That would be if both rounded to the higher thousand (68,000+68,000)." },
        { text: "1,35,000", correct: false, feedback: "You might have rounded both down (67,000+68,000) or made a similar error." }
      ],
    backward: "Always check the digit to the right of the target place before rounding.",
    forward: "Double rounding is common when checking totals in budgets."
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "What is the difference between LXXXVIII and XLIV? (Write answer in Roman numerals.)",
    options: [
        { text: "XLIV", correct: true, feedback: "LXXXVIII = 88, XLIV = 44, difference = 44 = XLIV." },
        { text: "XLVI", correct: false, feedback: "That's 46, not the difference." },
        { text: "XXXXIV", correct: false, feedback: "Roman numeral rule broken; 44 is written XLIV." },
        { text: "XXXIV", correct: false, feedback: "That's 34, not 44." }
      ],
    backward: "Convert to numerals, subtract, then convert back.",
    forward: "Performing arithmetic with Roman numerals tests your place value understanding."
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "On a winter day, the temperature at midnight was \\( -12^\\circ\\text{C} \\). By 6 am it had fallen by \\( 7^\\circ\\text{C} \\). What was the temperature at 6 am?",
    options: [
        { text: "\\( -19^\\circ\\text{C} \\)", correct: true, feedback: "-12 - 7 = -19." },
        { text: "\\( -5^\\circ\\text{C} \\)", correct: false, feedback: "You added instead of subtracting (or thought fall means rise)." },
        { text: "\\( 19^\\circ\\text{C} \\)", correct: false, feedback: "You ignored the negative sign entirely." },
        { text: "\\( 5^\\circ\\text{C} \\)", correct: false, feedback: "You subtracted 12 - 7 and forgot the negative." }
      ],
    backward: "A fall means move left on the number line (more negative).",
    forward: "Negative temperature calculations are common in weather forecasting and science."
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A company's revenue is 4.6 million dollars. Write this number in the Indian system (no currency).",
    options: [
        { text: "46,00,000", correct: true, feedback: "4.6 million = 4,600,000 = 46 lakh = 46,00,000." },
        { text: "4,60,00,000", correct: false, feedback: "That's 46 million, not 4.6 million." },
        { text: "4,60,000", correct: false, feedback: "That's 4.6 lakh, not 4.6 million." },
        { text: "46,000", correct: false, feedback: "That's 46 thousand." }
      ],
    backward: "1 million = 10 lakh.",
    forward: "This conversion is vital for reading global economic data."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Which number has 3 in the hundred-thousands place (International system)?",
    options: [
        { text: "1,345,678", correct: true, feedback: "In 1,345,678, the hundred-thousands digit is 3 (1 million, 3 hundred-thousands)." },
        { text: "1,354,678", correct: false, feedback: "Here 3 is in the ten-thousands place." },
        { text: "3,145,678", correct: false, feedback: "3 is in the millions place." },
        { text: "1,435,678", correct: false, feedback: "Hundred-thousands digit is 4." }
      ],
    backward: "Break the number into groups of three, starting from the right.",
    forward: "This will help you read large datasets accurately."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Find the smallest number that you can form using all the digits 5, 0, 3, 8, 2, 4 exactly once (you cannot start with 0).",
    options: [
        { text: "2,03,458", correct: true, feedback: "Smallest non-zero leading digit is 2, then place remaining in ascending order: 0,3,4,5,8." },
        { text: "0,23,458", correct: false, feedback: "Cannot start with 0; that would be a 5-digit number." },
        { text: "2,30,458", correct: false, feedback: "That is larger than 2,03,458 because the second digit 3 > 0." },
        { text: "2,43,058", correct: false, feedback: "You misordered after the first digit." }
      ],
    backward: "Place the smallest non-zero digit first, then arrange the rest ascending.",
    forward: "Forming smallest/largest numbers is a foundation for permutations and combinations."
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "When rounded to the nearest 10 m, a train's length is 240 m. Its actual length is a multiple of 5. Which of these could be the actual length?",
    options: [
        { text: "235 m", correct: true, feedback: "235 rounds to 240 (since the ones digit is 5, we round up). Also it's a multiple of 5." },
        { text: "245 m", correct: false, feedback: "245 rounds to 250, not 240." },
        { text: "230 m", correct: false, feedback: "230 rounds to 230, not 240." },
        { text: "250 m", correct: false, feedback: "250 rounds to 250." }
      ],
    backward: "Rounding to nearest 10: look at the ones digit.",
    forward: "This reasoning is used in engineering tolerances and measurement uncertainty."
  },
  {
    itemId: "d22", order: 22, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Solve:  (CXL ÷ X) + IV",
    options: [
        { text: "XVIII", correct: true, feedback: "CXL=140, ÷ X=10 gives 14, + IV=4 gives 18 = XVIII." },
        { text: "XIIV", correct: false, feedback: "XIIV is not a valid Roman numeral (can't subtract I from V twice)." },
        { text: "XVI", correct: false, feedback: "You might have used CXL=120, giving 12+4=16." },
        { text: "XXII", correct: false, feedback: "That would be 22; check your arithmetic." }
      ],
    backward: "Convert to Hindu-Arabic, perform operations, convert back.",
    forward: "This exercises your ability to switch between numeral systems, important in programming."
  },
  {
    itemId: "d23", order: 23, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A lift is on the 5th floor. It goes down 8 floors. Which floor is it on now? (Use negative numbers for basement levels; ground floor is 0.)",
    options: [
        { text: "-3 (Basement 3)", correct: true, feedback: "5 - 8 = -3." },
        { text: "3rd floor", correct: false, feedback: "You subtracted 5-8= -3, but misinterpreted as positive." },
        { text: "13th floor", correct: false, feedback: "You added instead of subtracted." },
        { text: "-5", correct: false, feedback: "Check: 5-8 = -3, not -5." }
      ],
    backward: "Downward movement means subtraction; if result is negative, it's below ground.",
    forward: "Elevators in many countries label basement floors as -1, -2, etc."
  },
  {
    itemId: "d24", order: 24, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A cricket stadium seats 1,20,000 people. Express this capacity in the International system.",
    options: [
        { text: "120,000", correct: true, feedback: "1,20,000 Indian = 120,000 International (120 thousand)." },
        { text: "1,200,000", correct: false, feedback: "That would be 12 lakh, not 1.2 lakh." },
        { text: "12,000", correct: false, feedback: "You dropped a zero." },
        { text: "102,000", correct: false, feedback: "You misread 1,20,000." }
      ],
    backward: "Indian 1,20,000 → 1 lakh 20 thousand → 120,000.",
    forward: "Stadium capacities are often reported in international media."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "A number has 9 lakhs, 4 ten-thousands, 6 hundreds, and 3 ones. The thousands and tens places are zero. Write the number.",
    options: [
        { text: "9,40,603", correct: true, feedback: "9,00,000 + 40,000 + 600 + 3 = 9,40,603." },
        { text: "9,46,003", correct: false, feedback: "You placed the hundreds digit in the thousands place." },
        { text: "9,40,063", correct: false, feedback: "You swapped the hundreds and tens." },
        { text: "94,06,003", correct: false, feedback: "Incorrect grouping — mix of Indian and International." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange descending: 7,82,543; 7,28,534; 7,82,345; 7,28,543.",
    options: [
        { text: "7,82,543; 7,82,345; 7,28,543; 7,28,534", correct: true, feedback: "Compare ten-thousands: 82 vs 28, then thousands, etc." },
        { text: "7,28,543; 7,28,534; 7,82,345; 7,82,543", correct: false, feedback: "That's ascending." },
        { text: "7,82,345; 7,82,543; 7,28,534; 7,28,543", correct: false, feedback: "7,82,345 < 7,82,543." },
        { text: "7,28,534; 7,82,543; 7,28,543; 7,82,345", correct: false, feedback: "Mixed order." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A mystery number rounds to 74,000 when rounded to the nearest 1,000. Its digit sum is 17. Which could it be?",
    options: [
        { text: "73,610", correct: true, feedback: "73,610 rounds to 74,000 (hundreds 6 ≥5). Digit sum: 7+3+6+1+0 = 17." },
        { text: "73,450", correct: false, feedback: "Rounds to 73,000, sum=19." },
        { text: "74,210", correct: false, feedback: "Rounds to 74,000, but sum=14." },
        { text: "74,530", correct: false, feedback: "Rounds to 75,000, sum=19." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Which Roman numeral equals 199?",
    options: [
        { text: "CXCIX", correct: true, feedback: "100 (C) + 90 (XC) + 9 (IX) = CXCIX." },
        { text: "CIC", correct: false, feedback: "Can't subtract I from C directly." },
        { text: "CCXIX", correct: false, feedback: "CCXIX = 219." },
        { text: "CLXIX", correct: false, feedback: "CLXIX = 169." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "The temperature rose from \\( -5^\\circ\\text{C} \\) to \\( 9^\\circ\\text{C} \\). How many degrees did it rise?",
    options: [
        { text: "14°C", correct: true, feedback: "From -5 to 0 is 5°, then 0 to 9 is 9°; total 14°." },
        { text: "4°C", correct: false, feedback: "You subtracted 9-5=4, ignoring the sign." },
        { text: "-14°C", correct: false, feedback: "Rise is positive, not negative." },
        { text: "5°C", correct: false, feedback: "That's only the part from -5 to 0." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write 2,450,000 (International) in the Indian system.",
    options: [
        { text: "24,50,000", correct: true, feedback: "2.45 million = 24.5 lakh = 24,50,000." },
        { text: "2,45,00,000", correct: false, feedback: "That's 24.5 million, not 2.45 million." },
        { text: "245,000", correct: false, feedback: "Missing a zero." },
        { text: "2,45,000", correct: false, feedback: "That's 2.45 lakh." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In the International number 7,056,312, what digit is in the ten-thousands place?",
    options: [
        { text: "5", correct: true, feedback: "Millions:7, hundred-thousands:0, ten-thousands:5, thousands:6." },
        { text: "0", correct: false, feedback: "0 is hundred-thousands." },
        { text: "6", correct: false, feedback: "6 is thousands." },
        { text: "3", correct: false, feedback: "3 is hundreds." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which digit can replace the □ to make true?  9,2□,540 < 9,25,399",
    options: [
        { text: "4", correct: true, feedback: "If □=4, we have 9,24,540 vs 9,25,399 → thousands 4 < 5, so true." },
        { text: "5", correct: false, feedback: "If □=5, thousands equal 5; then compare hundreds 5 vs 3, making 9,25,540 > 9,25,399." },
        { text: "6", correct: false, feedback: "6 > 5, so 9,26,540 > 9,25,399." },
        { text: "9", correct: false, feedback: "9 > 5, so it would be larger." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A container holds 23,476 ml, rounded to the nearest 100 ml and to the nearest 1,000 ml. Find the sum of the rounded values.",
    options: [
        { text: "46,500 ml", correct: true, feedback: "23,476 → nearest 100: 23,500; nearest 1,000: 23,000. Sum = 46,500." },
        { text: "46,400 ml", correct: false, feedback: "Nearest 100 would be 23,500, not 23,400." },
        { text: "47,000 ml", correct: false, feedback: "That would be 23,500+23,500, but nearest 1000 is 23,000." },
        { text: "46,000 ml", correct: false, feedback: "Rounded both down: 23,400+23,000? Not correct." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Calculate DXL ÷ XII and write the answer in Roman numerals.",
    options: [
        { text: "XLV", correct: true, feedback: "DXL=540, XII=12, 540÷12=45 = XLV." },
        { text: "LIV", correct: false, feedback: "LIV=54, not 45." },
        { text: "XLIV", correct: false, feedback: "XLIV=44, close but wrong." },
        { text: "VL", correct: false, feedback: "VL is not a valid Roman numeral." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A submarine is at -200 m. It rises 75 m, then dives 120 m. What is its new depth?",
    options: [
        { text: "-245 m", correct: true, feedback: "-200 + 75 = -125; -125 - 120 = -245." },
        { text: "-45 m", correct: false, feedback: "You subtracted 200-75-120=5, wrong signs." },
        { text: "-155 m", correct: false, feedback: "Possibly 200-75+120=245? Not correct with signs." },
        { text: "-395 m", correct: false, feedback: "You added all as positives: 200+75+120=395, then made negative." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A city's population is 7.8 million. Write this in the Indian system.",
    options: [
        { text: "78,00,000", correct: true, feedback: "7.8 million = 7,800,000 = 78 lakh = 78,00,000." },
        { text: "7,80,00,000", correct: false, feedback: "That's 78 million." },
        { text: "7,80,000", correct: false, feedback: "That's 7.8 lakh." },
        { text: "7,08,00,000", correct: false, feedback: "Misplaced zeros." }
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
    title: "Number Sense & Place Value — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-clue place value and comparison puzzles, rupee-price rounding, subtractive Roman numerals, multi-step negative-number scenarios, and Indian–International conversions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Indian place value: Ones, Tens, Hundreds, Thousands, Ten-thousands, Lakhs, Ten-lakhs, Crores<br>" +
      "&bull; International: Ones, Tens, Hundreds, Thousands, Ten-thousands, Hundred-thousands, Millions<br>" +
      "&bull; Roman numerals: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. No symbol repeated more than 3 times.<br>" +
      "&bull; Rounding: Look at the digit to the right of the target place. 5 or more → round up.<br>" +
      "&bull; Negative numbers: Used for temperature, depth below sea level, bank overdrafts.<br>",
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

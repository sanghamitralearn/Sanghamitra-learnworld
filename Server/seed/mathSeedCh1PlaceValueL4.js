// seed/mathSeedCh1PlaceValueL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 4 — converted from the standalone
// HTML file ch-1-place-value-level-4.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 4;

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
    question: "What is the place value of 4 in 2,43,567?",
    options: [
        { text: "40,000", correct: true, feedback: "The 4 is in the ten-thousands place." },
        { text: "4,000", correct: false, feedback: "That's the thousands place." },
        { text: "400", correct: false, feedback: "That's the hundreds place." },
        { text: "4,00,000", correct: false, feedback: "That's the lakhs place." }
      ],
    retryHint: ""
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is smaller? 6,54,321 or 6,45,321?",
    options: [
        { text: "6,45,321", correct: true, feedback: "Compare the ten-thousands place: 4 < 5." },
        { text: "6,54,321", correct: false, feedback: "6,54,321 is larger." },
        { text: "Both are equal", correct: false, feedback: "They are different numbers." },
        { text: "Cannot compare", correct: false, feedback: "Both have six digits; comparison is straightforward." }
      ],
    retryHint: ""
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 5,678 to the nearest 100.",
    options: [
        { text: "5,700", correct: true, feedback: "The tens digit is 7 (≥5), so round up." },
        { text: "5,600", correct: false, feedback: "That would require the tens digit to be less than 5." },
        { text: "5,000", correct: false, feedback: "That's rounding to the nearest 1,000." },
        { text: "5,680", correct: false, feedback: "That's rounding to the nearest 10." }
      ],
    retryHint: ""
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Write 35 in Roman numerals.",
    options: [
        { text: "XXXV", correct: true, feedback: "30 (XXX) + 5 (V) = XXXV." },
        { text: "XXV", correct: false, feedback: "XXV = 25." },
        { text: "XLV", correct: false, feedback: "XLV = 45." },
        { text: "XXXIV", correct: false, feedback: "XXXIV = 34." }
      ],
    retryHint: ""
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "Which temperature is warmer? -8°C or -2°C?",
    options: [
        { text: "-2°C", correct: true, feedback: "-2 is closer to zero, so it's warmer." },
        { text: "-8°C", correct: false, feedback: "-8 is colder because it's more negative." },
        { text: "Both are the same", correct: false, feedback: "The numbers are different." },
        { text: "Cannot tell", correct: false, feedback: "Negative numbers can be compared on a number line." }
      ],
    retryHint: ""
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write 3,40,000 (Indian) in the International system.",
    options: [
        { text: "340,000", correct: true, feedback: "3 lakh 40 thousand = 340,000." },
        { text: "3,400,000", correct: false, feedback: "That would be 34 lakh." },
        { text: "34,000", correct: false, feedback: "You lost a zero." },
        { text: "3,04,000", correct: false, feedback: "Misplaced digits." }
      ],
    retryHint: ""
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 8,07,543, what digit is in the thousands place?",
    options: [
        { text: "7", correct: true, feedback: "The number is 8 lakh 7 thousand 543, so 7 is in the thousands place." },
        { text: "0", correct: false, feedback: "0 is in the ten-thousands place." },
        { text: "8", correct: false, feedback: "8 is in the lakhs place." },
        { text: "5", correct: false, feedback: "5 is in the hundreds place." }
      ],
    retryHint: ""
  },
  {
    itemId: "w8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange in ascending order: 1,23,456; 1,32,456; 1,22,456.",
    options: [
        { text: "1,22,456; 1,23,456; 1,32,456", correct: true, feedback: "22 thousand < 23 thousand < 32 thousand." },
        { text: "1,32,456; 1,23,456; 1,22,456", correct: false, feedback: "That's descending order." },
        { text: "1,23,456; 1,22,456; 1,32,456", correct: false, feedback: "1,22,456 is smaller than 1,23,456." },
        { text: "1,22,456; 1,32,456; 1,23,456", correct: false, feedback: "1,23,456 should come before 1,32,456." }
      ],
    retryHint: ""
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "S",
    question: "What is the place value of 9 in 19,08,765 (Indian system)?",
    options: [
        { text: "9,00,000", correct: true, feedback: "The 9 is in the lakhs place." },
        { text: "90,000", correct: false, feedback: "That's the ten-thousands place." },
        { text: "9,000", correct: false, feedback: "That's the thousands place." },
        { text: "9,00,00,000", correct: false, feedback: "That's crores." }
      ],
    backward: "Indian place value chart: … Crores, Lakhs, Ten-thousands, Thousands, Hundreds, Tens, Ones.",
    forward: "Quick place value identification saves time in more complex calculations."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "S",
    question: "Which of these numbers is the smallest? 8,76,543; 8,67,543; 8,76,435; 8,67,435.",
    options: [
        { text: "8,67,435", correct: true, feedback: "Ten-thousands digit 6 < 7; and 435 < 543." },
        { text: "8,67,543", correct: false, feedback: "435 is smaller than 543." },
        { text: "8,76,435", correct: false, feedback: "76 thousand is larger than 67 thousand." },
        { text: "8,76,543", correct: false, feedback: "This is the largest." }
      ],
    backward: "Start comparing from the leftmost digit.",
    forward: "Efficient comparison is vital for data interpretation."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "S",
    question: "Round 2,864 to the nearest 100.",
    options: [
        { text: "2,900", correct: true, feedback: "The tens digit is 6 (≥5), so round up." },
        { text: "2,800", correct: false, feedback: "That would need the tens digit to be ≤4." },
        { text: "3,000", correct: false, feedback: "That's rounding to the nearest 1,000." },
        { text: "2,860", correct: false, feedback: "That's rounding to the nearest 10." }
      ],
    backward: "When rounding to the nearest 100, look at the tens digit.",
    forward: "Rounding is a daily skill for estimation."
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "S",
    question: "What is XLIV in Hindu-Arabic numerals?",
    options: [
        { text: "44", correct: true, feedback: "XL = 40, IV = 4 → 44." },
        { text: "46", correct: false, feedback: "XLVI = 46." },
        { text: "54", correct: false, feedback: "LIV = 54." },
        { text: "64", correct: false, feedback: "LXIV = 64." }
      ],
    backward: "XL means 50-10, IV means 5-1.",
    forward: "Roman numerals appear on clocks and formal documents."
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "S",
    question: "Which temperature is colder? -5°C or -1°C?",
    options: [
        { text: "-5°C", correct: true, feedback: "The more negative the number, the colder it is." },
        { text: "-1°C", correct: false, feedback: "-1 is warmer than -5." },
        { text: "Both are the same", correct: false, feedback: "They are different numbers." },
        { text: "Cannot say", correct: false, feedback: "Negative numbers are easily compared." }
      ],
    backward: "On a number line, further left means smaller (colder).",
    forward: "Negative numbers describe temperatures, debts, and elevations."
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "S",
    question: "Write 2,50,000 (Indian) in the International system.",
    options: [
        { text: "250,000", correct: true, feedback: "2.5 lakh = 250,000." },
        { text: "2,500,000", correct: false, feedback: "That would be 25 lakh." },
        { text: "25,000", correct: false, feedback: "You lost a zero." },
        { text: "2,05,000", correct: false, feedback: "Incorrect grouping." }
      ],
    backward: "1 lakh = 100,000.",
    forward: "Converting between systems is needed for reading global data."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "C",
    question: "How many thousands are there in 45,00,000?",
    options: [
        { text: "4,500", correct: true, feedback: "45,00,000 ÷ 1,000 = 4,500." },
        { text: "450", correct: false, feedback: "You divided by 10,000." },
        { text: "45,000", correct: false, feedback: "You multiplied by 10." },
        { text: "45", correct: false, feedback: "You divided by 100,000." }
      ],
    backward: "Divide by 1,000 to find how many thousands.",
    forward: "This skill helps when converting between large units."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "C",
    question: "Find the largest 5-digit number with all digits different and a digit sum of 15.",
    options: [
        { text: "93,210", correct: true, feedback: "Digits 9,3,2,1,0 sum to 15, all different, and it's the largest possible." },
        { text: "95,310", correct: false, feedback: "Sum = 18, not 15." },
        { text: "94,320", correct: false, feedback: "Sum = 18." },
        { text: "98,610", correct: false, feedback: "Sum = 24." }
      ],
    backward: "Place the largest possible digit in the highest place, then adjust to meet the sum.",
    forward: "Digit constraints are common in logic and Olympiad problems."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "C",
    question: "A number, when rounded to the nearest 100, becomes 7,500. When rounded to the nearest 10, it also becomes 7,500. The number is greater than 7,500 and is odd. What is the number?",
    options: [
        { text: "7,501", correct: true, feedback: "7,501 rounds to 7,500 both ways, and is odd and >7,500." },
        { text: "7,495", correct: false, feedback: "7,495 works but is less than 7,500." },
        { text: "7,504", correct: false, feedback: "7,504 is even." },
        { text: "7,510", correct: false, feedback: "Rounds to 7,510 to the nearest 10." }
      ],
    backward: "Intersect the rounding ranges and apply extra conditions.",
    forward: "Overlapping conditions appear in tolerance analysis."
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "C",
    question: "Calculate XXV × III and write the answer in Roman numerals.",
    options: [
        { text: "LXXV", correct: true, feedback: "25 × 3 = 75 = LXXV." },
        { text: "L", correct: false, feedback: "50 is incorrect." },
        { text: "LXXX", correct: false, feedback: "80 is incorrect." },
        { text: "C", correct: false, feedback: "100 is incorrect." }
      ],
    backward: "Convert, multiply, convert back.",
    forward: "Arithmetic with Roman numerals tests mental flexibility."
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "C",
    question: "The temperature at midnight was -6°C. It fell by 8°C, then rose by 11°C. What was the final temperature?",
    options: [
        { text: "-3°C", correct: true, feedback: "-6 - 8 = -14; -14 + 11 = -3." },
        { text: "3°C", correct: false, feedback: "You missed the negative sign." },
        { text: "-9°C", correct: false, feedback: "Incorrect calculation." },
        { text: "-13°C", correct: false, feedback: "You might have done -6 - 8 + 11 incorrectly." }
      ],
    backward: "A fall means subtraction, a rise means addition.",
    forward: "These calculations model real weather changes."
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "C",
    question: "Express 56,00,000 (Indian) as a number of millions (International).",
    options: [
        { text: "5.6 million", correct: true, feedback: "56 lakh = 5.6 million." },
        { text: "56 million", correct: false, feedback: "10 lakh = 1 million." },
        { text: "0.56 million", correct: false, feedback: "Incorrect division." },
        { text: "560 million", correct: false, feedback: "Incorrect multiplication." }
      ],
    backward: "1 million = 10 lakh.",
    forward: "Large numbers are often expressed in millions internationally."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "T",
    question: "In the number 7,05,612 (Indian system), what is the value of the digit 0?",
    options: [
        { text: "0", correct: true, feedback: "The 0 is in the ten-thousands place, so its value is 0 × 10,000 = 0." },
        { text: "10,000", correct: false, feedback: "That's the place value, but the digit is 0." },
        { text: "0 thousands", correct: false, feedback: "The 0 is in the ten-thousands place, not thousands." },
        { text: "50,000", correct: false, feedback: "That would be the value if the digit were 5." }
      ],
    backward: "Value = digit × place value.",
    forward: "Confusing place value with digit value is a common error."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "H",
    question: "How many 5-digit numbers between 20,000 and 30,000 have an odd thousands digit and a tens digit that is a multiple of 3?",
    options: [
        { text: "2,000", correct: true, feedback: "Ten-thousands fixed 2. Thousands: 5 odd choices. Hundreds: 10. Tens: 4 multiples of 3. Units: 10. 5×10×4×10 = 2,000." },
        { text: "1,500", correct: false, feedback: "You undercounted." },
        { text: "1,000", correct: false, feedback: "Only counted some choices." },
        { text: "2,500", correct: false, feedback: "Overcounted." }
      ],
    backward: "Use the counting principle: multiply the number of choices for each place.",
    forward: "Combinatorial reasoning is fundamental in probability."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND, tier: "H",
    question: "A number rounds to 6,400 to the nearest 100, and to 6,000 to the nearest 1,000. Its hundreds digit is 3 and it is a multiple of 7. Find the number.",
    options: [
        { text: "6,356", correct: true, feedback: "Range for 100: 6,350-6,449; for 1,000: 5,500-6,499. Overlap 6,350-6,449. Hundreds=3 → 6,3xx. Multiple of 7: 6,356 (7×908)." },
        { text: "6,349", correct: false, feedback: "Too low; not in overlap (rounds to 6,300)." },
        { text: "6,447", correct: false, feedback: "Not a multiple of 7." },
        { text: "6,405", correct: false, feedback: "Hundreds digit is 4, not 3." }
      ],
    backward: "Intersect the two rounding ranges, apply the digit constraint, then test divisibility.",
    forward: "This type of problem appears in number theory contests."
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN, tier: "T",
    question: "Which of the following Roman numerals correctly represents 99?",
    options: [
        { text: "XCIX", correct: true, feedback: "XC = 90, IX = 9 → 99." },
        { text: "IC", correct: false, feedback: "You cannot subtract I directly from C; use XC instead." },
        { text: "VC", correct: false, feedback: "VC is not a valid Roman numeral." },
        { text: "XCIX is 89", correct: false, feedback: "XCIX is 99, not 89." }
      ],
    backward: "Only I, X, C, M can be used as subtractors, and only from the next two higher values.",
    forward: "Recognising invalid Roman numerals avoids common mistakes."
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG, tier: "H",
    question: "A diver starts at -45 m. He ascends 18 m, then descends 29 m. What is the total change in his depth from the start? (Negative means deeper.)",
    options: [
        { text: "-11 m", correct: true, feedback: "Final depth = -45+18-29 = -56 m. Change = -56 - (-45) = -11 m." },
        { text: "11 m shallower", correct: false, feedback: "The change is negative, meaning deeper." },
        { text: "-56 m", correct: false, feedback: "That's the final depth, not the change." },
        { text: "11 m deeper", correct: false, feedback: "The magnitude is correct, but the sign is wrong." }
      ],
    backward: "Change = final value - initial value.",
    forward: "Calculating change correctly is essential in physics and finance."
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV, tier: "H",
    question: "Which number is the largest? A: 2,345,678 (Intl); B: 23,45,678 (Indian); C: 2,465,789 (Intl); D: 24,75,689 (Indian).",
    options: [
        { text: "D", correct: true, feedback: "24,75,689 Indian = 2,475,689, larger than C (2,465,789), A (2,345,678), and B (2,345,678)." },
        { text: "A", correct: false, feedback: "A = 2,345,678." },
        { text: "B", correct: false, feedback: "B = 2,345,678." },
        { text: "C", correct: false, feedback: "C = 2,465,789, which is less than D." }
      ],
    backward: "Convert all to a common system before comparing.",
    forward: "Global data comparisons often require this skill."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE, tier: "H",
    question: "Use digits 2, 4, 5, 7, 8, 0, 3 (once each) to form the smallest 7-digit International number where the hundred-thousands digit is even. What is the number?",
    options: [
        { text: "2,034,578", correct: true, feedback: "Smallest lead non-zero 2, then even hundred-thousands: 0, then remaining digits ascending 3,4,5,7,8." },
        { text: "2,034,758", correct: false, feedback: "Not the smallest order after 0." },
        { text: "2,043,578", correct: false, feedback: "0 is smaller than 4 in the hundred-thousands place." },
        { text: "2,305,478", correct: false, feedback: "Hundred-thousands 3 is odd." }
      ],
    backward: "Place the smallest possible digit in each position while satisfying constraints.",
    forward: "Constrained optimization is a common advanced problem-solving skill."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP, tier: "T",
    question: "Arrange in ascending order: -2, 5, -7, 0, XL (Roman).",
    options: [
        { text: "-7, -2, 0, 5, XL", correct: true, feedback: "XL = 40, so -7 < -2 < 0 < 5 < 40." },
        { text: "-2, -7, 0, 5, XL", correct: false, feedback: "-7 is smaller than -2." },
        { text: "0, -2, -7, 5, XL", correct: false, feedback: "Negative numbers come before 0." },
        { text: "XL, 5, 0, -2, -7", correct: false, feedback: "That's descending." }
      ],
    backward: "Convert all numbers to Hindu-Arabic before ordering.",
    forward: "Mixing representations is a common trap in contests."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "How many ten-thousands are there in 98,00,000?",
    options: [
        { text: "980", correct: true, feedback: "98,00,000 ÷ 10,000 = 980." },
        { text: "98", correct: false, feedback: "You divided by 1,00,000." },
        { text: "9,800", correct: false, feedback: "You multiplied by 10." },
        { text: "9.8", correct: false, feedback: "Incorrect division." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Find the smallest 5-digit number with all digits different and a digit sum of 14.",
    options: [
        { text: "10,238", correct: true, feedback: "1+0+2+3+8 = 14, all digits distinct, smallest possible." },
        { text: "10,247", correct: false, feedback: "Sum 14 but larger than 10,238." },
        { text: "12,035", correct: false, feedback: "Sum = 11." },
        { text: "10,256", correct: false, feedback: "Sum 14 but larger than 10,238." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounds to 9,300 to the nearest 100, and to 9,340 to the nearest 10. It is also a multiple of 9. What is the number?",
    options: [
        { text: "9,342", correct: true, feedback: "Overlap range 9,335-9,344; 9,342 sum 18, so multiple of 9." },
        { text: "9,335", correct: false, feedback: "Not a multiple of 9 (sum 20)." },
        { text: "9,351", correct: false, feedback: "Rounds to 9,400 for nearest 100." },
        { text: "9,338", correct: false, feedback: "Sum 23, not multiple of 9." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Calculate LX ÷ IV and write the answer in Roman numerals.",
    options: [
        { text: "XV", correct: true, feedback: "60 ÷ 4 = 15 = XV." },
        { text: "XII", correct: false, feedback: "12 is incorrect." },
        { text: "XVI", correct: false, feedback: "16 is incorrect." },
        { text: "XX", correct: false, feedback: "20 is incorrect." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A lift starts at floor -3. It goes up 7 floors, down 5 floors, then up 2 floors. Final floor?",
    options: [
        { text: "1", correct: true, feedback: "-3 + 7 = 4; 4 - 5 = -1; -1 + 2 = 1." },
        { text: "-1", correct: false, feedback: "You stopped before the last move." },
        { text: "0", correct: false, feedback: "Incorrect calculation." },
        { text: "2", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Express 4,500,000 (International) in the Indian system.",
    options: [
        { text: "45,00,000", correct: true, feedback: "4.5 million = 45 lakh = 45,00,000." },
        { text: "4,50,00,000", correct: false, feedback: "That would be 45 million." },
        { text: "450,000", correct: false, feedback: "That's 4.5 lakh." },
        { text: "4,50,000", correct: false, feedback: "Misplaced digits." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "In 3,20,456 (Indian), what digit is in the ten-thousands place?",
    options: [
        { text: "2", correct: true, feedback: "The number is 3 lakh 20 thousand 456; the 2 is ten-thousands." },
        { text: "0", correct: false, feedback: "0 is in the thousands place." },
        { text: "3", correct: false, feedback: "3 is in the lakhs place." },
        { text: "4", correct: false, feedback: "4 is in the hundreds place." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which digit can go in the box: 2,4□,987 < 2,45,000 ?",
    options: [
        { text: "4", correct: true, feedback: "2,44,987 < 2,45,000." },
        { text: "5", correct: false, feedback: "2,45,987 > 2,45,000." },
        { text: "6", correct: false, feedback: "Any digit ≥5 makes it ≥ 2,45,000." },
        { text: "9", correct: false, feedback: "2,49,987 is much larger." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 1,56,789 to the nearest 10,000.",
    options: [
        { text: "1,60,000", correct: true, feedback: "Thousands digit 6 → round up." },
        { text: "1,50,000", correct: false, feedback: "Would need thousands <5." },
        { text: "1,57,000", correct: false, feedback: "That's to the nearest 1,000." },
        { text: "2,00,000", correct: false, feedback: "That's to the nearest lakh." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Write 76 in Roman numerals.",
    options: [
        { text: "LXXVI", correct: true, feedback: "50 + 20 + 6 = LXXVI." },
        { text: "LXXIV", correct: false, feedback: "74." },
        { text: "LXXXVI", correct: false, feedback: "86." },
        { text: "LXV", correct: false, feedback: "65." }
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
    title: "Number Sense & Place Value — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every place-value cluster.",
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

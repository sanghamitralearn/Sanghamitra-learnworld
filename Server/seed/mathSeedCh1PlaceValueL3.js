// seed/mathSeedCh1PlaceValueL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 1
// (Number Sense & Place Value), Level 3 — converted from the standalone
// HTML file ch-1-place-value-level-3.html.
//
// Run with: node seed/mathSeedCh1PlaceValueL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-1-place-value";
const CHAPTER_NAME = "Number Sense & Place Value";
const LEVEL = 3;

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
    question: "Write the number that has 4 lakhs, 8 ten-thousands, 2 thousands, 6 hundreds, 5 tens, and 3 ones.",
    options: [
        { text: "4,82,653", correct: true, feedback: "4,00,000 + 80,000 + 2,000 + 600 + 50 + 3 = 4,82,653." },
        { text: "4,82,563", correct: false, feedback: "You swapped the hundreds and tens." },
        { text: "4,80,263", correct: false, feedback: "The ten-thousands digit is 8, not 0." },
        { text: "4,28,653", correct: false, feedback: "You swapped lakhs and ten-thousands." }
      ],
    retryHint: "Align the digits: L, T-Th, Th, H, T, O."
  },
  {
    itemId: "w2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which is the largest? 7,65,432; 7,56,432; 7,65,423; 7,56,423.",
    options: [
        { text: "7,65,432", correct: true, feedback: "Ten-thousands digit 6 > 5, and among those, 432 > 423." },
        { text: "7,56,432", correct: false, feedback: "5 in ten-thousands is smaller than 6." },
        { text: "7,65,423", correct: false, feedback: "432 is larger than 423." },
        { text: "7,56,423", correct: false, feedback: "This is the smallest." }
      ],
    retryHint: "Compare from the left, digit by digit."
  },
  {
    itemId: "w3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "Round 5,67,890 to the nearest 1,000, then add 200.",
    options: [
        { text: "5,68,200", correct: true, feedback: "5,67,890 → nearest 1,000: 5,68,000 (hundreds 8 ≥5). +200 = 5,68,200." },
        { text: "5,68,090", correct: false, feedback: "You added 200 before rounding or miscalculated." },
        { text: "5,67,200", correct: false, feedback: "You didn't round up." },
        { text: "5,70,000", correct: false, feedback: "You rounded to the nearest 10,000." }
      ],
    retryHint: "First round, then add 200."
  },
  {
    itemId: "w4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "XXVII + XIV = ? (Write the answer in Roman numerals.)",
    options: [
        { text: "XLI", correct: true, feedback: "XXVII = 27, XIV = 14, sum = 41 = XLI." },
        { text: "XXXI", correct: false, feedback: "You might have miscalculated 27+14 as 31." },
        { text: "XL", correct: false, feedback: "40 is close but incorrect." },
        { text: "LXI", correct: false, feedback: "61 is far too high." }
      ],
    retryHint: "Convert each to a number, add, then convert back."
  },
  {
    itemId: "w5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "The temperature is -4°C. It rises by 9°C, then falls by 5°C. What is the final temperature?",
    options: [
        { text: "0°C", correct: true, feedback: "-4 + 9 = 5; 5 - 5 = 0." },
        { text: "8°C", correct: false, feedback: "You might have added 9+5-4 incorrectly." },
        { text: "-8°C", correct: false, feedback: "You subtracted both changes." },
        { text: "10°C", correct: false, feedback: "You ignored the negative start." }
      ],
    retryHint: "Start at -4 on a number line, move right 9, then left 5."
  },
  {
    itemId: "w6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write 45,67,890 (Indian system) in the International system.",
    options: [
        { text: "4,567,890", correct: true, feedback: "45 lakh 67 thousand 890 = 4,567,890." },
        { text: "45,678,900", correct: false, feedback: "Incorrect grouping." },
        { text: "456,789", correct: false, feedback: "You lost a zero." },
        { text: "4,567,89", correct: false, feedback: "Not a valid number." }
      ],
    retryHint: "Group the digits in sets of three from the right."
  },
  {
    itemId: "w7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "How many hundreds are there in 12,00,000?",
    options: [
        { text: "12,000", correct: true, feedback: "12,00,000 ÷ 100 = 12,000." },
        { text: "1,200", correct: false, feedback: "You divided by 1,000." },
        { text: "120", correct: false, feedback: "Divided by 10,000." },
        { text: "1,20,000", correct: false, feedback: "You multiplied by 10." }
      ],
    retryHint: "Divide by 100 to find the number of hundreds."
  },
  {
    itemId: "w8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange these from coldest to warmest: 2°C, -5°C, -1°C, 0°C.",
    options: [
        { text: "-5°C, -1°C, 0°C, 2°C", correct: true, feedback: "Coldest is the most negative." },
        { text: "2°C, 0°C, -1°C, -5°C", correct: false, feedback: "That's warmest to coldest." },
        { text: "-1°C, -5°C, 0°C, 2°C", correct: false, feedback: "-5 is colder than -1." },
        { text: "0°C, -1°C, -5°C, 2°C", correct: false, feedback: "Order is mixed." }
      ],
    retryHint: "Think of a number line: smaller numbers are colder."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "A number is between 4,50,000 and 5,00,000. The ten-thousands digit is the square of the thousands digit. The sum of all six digits is 20. Which number could it be?",
    options: [
        { text: "4,93,220", correct: true, feedback: "Ten-thousands 9 = 3² (thousands digit 3). Sum = 4+9+3+2+2+0 = 20." },
        { text: "4,93,401", correct: false, feedback: "Ten-thousands 9, thousands 3, but sum = 4+9+3+4+0+1 = 21." },
        { text: "4,94,301", correct: false, feedback: "Thousands digit 4, but 4² = 16, not 9." },
        { text: "4,92,420", correct: false, feedback: "Ten-thousands 9, thousands 2, but 2² = 4, not 9." }
      ],
    backward: "Use the condition to find possible thousands digits, then check the sum.",
    forward: "This type of puzzle builds algebraic reasoning with place value."
  },
  {
    itemId: "d2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Find the smallest 6-digit number in the Indian system that uses all the digits 0, 2, 4, 6, 8, 9 exactly once, and whose last three digits form a number that is a multiple of 8.",
    options: [
        { text: "2,04,896", correct: true, feedback: "The smallest arrangement: 2,04,896. Last three digits 896 = 8 × 112." },
        { text: "2,04,689", correct: false, feedback: "689 is not divisible by 8." },
        { text: "2,06,489", correct: false, feedback: "489 is not a multiple of 8." },
        { text: "2,08,469", correct: false, feedback: "469 is not a multiple of 8." }
      ],
    backward: "Place the smallest non-zero digit first, then arrange the rest to satisfy the condition.",
    forward: "Divisibility combined with ordering is a common Olympiad topic."
  },
  {
    itemId: "d3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number, when rounded to the nearest 100, gives 6,700, and when rounded to the nearest 10, gives 6,650. The number is also a multiple of 5. What is the number?",
    options: [
        { text: "6,650", correct: true, feedback: "Range for nearest 100: 6,650-6,749. For nearest 10: 6,645-6,654. Overlap 6,650-6,654. Multiples of 5: 6,650 works." },
        { text: "6,655", correct: false, feedback: "6,655 rounds to 6,660 to the nearest 10." },
        { text: "6,645", correct: false, feedback: "6,645 rounds to 6,640 to the nearest 10." },
        { text: "6,749", correct: false, feedback: "Rounds to 6,700 to the nearest 100, but to 6,750 to the nearest 10." }
      ],
    backward: "Find the intersection of the two rounding ranges, then apply the additional condition.",
    forward: "Overlapping conditions appear in measurement tolerances."
  },
  {
    itemId: "d4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Calculate LXXXIV + XLVI. Then round the result to the nearest 10 and write the answer in Roman numerals.",
    options: [
        { text: "CXXX", correct: true, feedback: "84 + 46 = 130. Rounded to nearest 10 is 130 = CXXX." },
        { text: "CXX", correct: false, feedback: "120 is the sum without rounding? 84+46=130, not 120." },
        { text: "CXL", correct: false, feedback: "140 would be rounding up to the next ten incorrectly." },
        { text: "C", correct: false, feedback: "100 is too low." }
      ],
    backward: "Convert, add, round, then convert back.",
    forward: "Combining Roman numerals with rounding tests flexibility."
  },
  {
    itemId: "d5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A bank account starts with a balance of -₹200. The owner deposits ₹500, then withdraws ₹350, then deposits ₹100. What is the final balance?",
    options: [
        { text: "₹50", correct: true, feedback: "-200 + 500 = 300; 300 - 350 = -50; -50 + 100 = 50." },
        { text: "-₹50", correct: false, feedback: "You stopped after the withdrawal." },
        { text: "₹150", correct: false, feedback: "You might have added all positive numbers and subtracted only once." },
        { text: "-₹150", correct: false, feedback: "Incorrect sign tracking." }
      ],
    backward: "Track each transaction step by step, keeping the signs correct.",
    forward: "This is the basis for managing personal finances."
  },
  {
    itemId: "d6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Which of these numbers is the largest? A = 3,456,789 (International); B = 34,56,789 (Indian); C = 3,465,798 (International); D = 34,65,789 (Indian).",
    options: [
        { text: "C", correct: true, feedback: "C = 3,465,798. B = 3,456,789, D = 3,465,789. Largest is C." },
        { text: "A", correct: false, feedback: "A = 3,456,789, which is smaller than C." },
        { text: "B", correct: false, feedback: "B equals A (3,456,789)." },
        { text: "D", correct: false, feedback: "D = 3,465,789, still slightly less than C." }
      ],
    backward: "Convert all numbers to a common system (International) before comparing.",
    forward: "Real-world datasets often mix formats."
  },
  {
    itemId: "d7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Using the digits 5, 0, 2, 7, 3, 9 exactly once, form the smallest 6-digit Indian system number such that the number formed by the first two digits is a multiple of 9.",
    options: [
        { text: "2,70,359", correct: true, feedback: "First two digits 27 (multiple of 9). Smallest arrangement after that gives 2,70,359." },
        { text: "2,07,359", correct: false, feedback: "First two digits 20, not a multiple of 9." },
        { text: "2,75,039", correct: false, feedback: "27 is a multiple of 9, but the remaining digits are not in the smallest order." },
        { text: "2,70,539", correct: false, feedback: "The last three digits are not the smallest possible." }
      ],
    backward: "Fix the first two digits so that they form a multiple of 9, then minimize the rest.",
    forward: "Digit constraint puzzles are common in math contests."
  },
  {
    itemId: "d8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "I am a 5-digit number less than 50,000. My ten-thousands digit is 3 less than my hundreds digit. My thousands digit is the sum of my hundreds digit and my tens digit. The sum of all my digits is 20. Which number could I be?",
    options: [
        { text: "19451", correct: true, feedback: "Digits: 1 (ten-thousands), 9 (thousands), 4 (hundreds), 5 (tens), 1 (ones). 1 = 4-3; 9 = 4+5; sum = 1+9+4+5+1=20." },
        { text: "28563", correct: false, feedback: "2 = 5-3, but 8 ≠ 5+6." },
        { text: "17452", correct: false, feedback: "1 = 4-3, but 7 ≠ 4+5." },
        { text: "20481", correct: false, feedback: "2 ≠ 4-3." }
      ],
    backward: "Set up equations for the digits and test the options.",
    forward: "Such riddles bridge arithmetic and algebra."
  },
  {
    itemId: "d9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest 100 is 8,200, and rounded to the nearest 10 is 8,250. The sum of its digits is a prime number. What is the number?",
    options: [
        { text: "8,245", correct: true, feedback: "8,245 → nearest 100: 8,200 (tens 4<5); nearest 10: 8,250 (ones 5). Sum = 8+2+4+5 = 19 (prime)." },
        { text: "8,235", correct: false, feedback: "Nearest 10: 8,240, not 8,250." },
        { text: "8,254", correct: false, feedback: "Nearest 100: 8,300 (tens 5)." },
        { text: "8,250", correct: false, feedback: "Nearest 100: 8,300." }
      ],
    backward: "Intersect the two rounding ranges, then check digit sums.",
    forward: "Prime numbers often appear as constraints in puzzles."
  },
  {
    itemId: "d10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "If XLV < N < LXX, and N is the largest multiple of 6 in this range, write N in Roman numerals.",
    options: [
        { text: "LXVI", correct: true, feedback: "Multiples of 6 between 45 and 70: 48, 54, 60, 66. Largest is 66 = LXVI." },
        { text: "LIV", correct: false, feedback: "54, but not the largest." },
        { text: "LX", correct: false, feedback: "60, but 66 is larger." },
        { text: "LXXII", correct: false, feedback: "72 is outside the range." }
      ],
    backward: "Convert to numbers, find the multiples, then pick the required one.",
    forward: "Roman numerals with inequalities test attention to detail."
  },
  {
    itemId: "d11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A submarine is at -150 m. It rises 80 m, then dives 60 m, then rises 40 m. What is its final depth?",
    options: [
        { text: "-90 m", correct: true, feedback: "-150 + 80 = -70; -70 - 60 = -130; -130 + 40 = -90." },
        { text: "-70 m", correct: false, feedback: "You stopped after the first ascent." },
        { text: "-110 m", correct: false, feedback: "A miscalculation." },
        { text: "-50 m", correct: false, feedback: "Incorrect sign handling." }
      ],
    backward: "Add rises and subtract dives step by step.",
    forward: "Underwater navigation uses negative numbers extensively."
  },
  {
    itemId: "d12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Convert the sum of 45 lakh and 2.3 million into the Indian system.",
    options: [
        { text: "68,00,000", correct: true, feedback: "45 lakh = 45,00,000; 2.3 million = 23,00,000; sum = 68,00,000." },
        { text: "68,000,000", correct: false, feedback: "That's International notation, not Indian." },
        { text: "6,80,00,000", correct: false, feedback: "That would be 68 million, not 68 lakh." },
        { text: "47,30,000", correct: false, feedback: "You added incorrectly." }
      ],
    backward: "Convert both to the same unit (lakh), then add.",
    forward: "Real-world financial sums often require this dual-system skill."
  },
  {
    itemId: "d13", order: 13, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Find the largest 7-digit International system number with millions digit 4, hundred-thousands digit equal to the sum of the millions and ten-thousands digits, and all digits different. What is the number?",
    options: [
        { text: "4,958,763", correct: true, feedback: "Millions=4, hundred-thousands=9 (4+5), ten-thousands=5. Remaining digits 8,7,6,3 in descending order." },
        { text: "4,859,763", correct: false, feedback: "Hundred-thousands 8 = 4+4, but ten-thousands 4 not largest possible." },
        { text: "4,957,863", correct: false, feedback: "Not the largest arrangement of the last four digits." },
        { text: "4,985,763", correct: false, feedback: "Hundred-thousands 9=4+5, but ten-thousands 8? 4+8=12, not 9." }
      ],
    backward: "Maximize the hundred-thousands digit by choosing the largest possible ten-thousands digit that satisfies the condition.",
    forward: "Optimization with constraints is a key mathematical skill."
  },
  {
    itemId: "d14", order: 14, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Which number is exactly halfway between 7,50,000 and 8,50,000, when both are written in the Indian system?",
    options: [
        { text: "8,00,000", correct: true, feedback: "(7,50,000 + 8,50,000) ÷ 2 = 16,00,000 ÷ 2 = 8,00,000." },
        { text: "8,50,000", correct: false, feedback: "That's the larger endpoint." },
        { text: "7,50,000", correct: false, feedback: "The smaller endpoint." },
        { text: "7,00,000", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Add the two numbers and divide by 2.",
    forward: "Finding midpoints is essential for understanding averages."
  },
  {
    itemId: "d15", order: 15, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number when rounded to the nearest 1,000 becomes 35,000, and when rounded to the nearest 10 becomes 34,970. The sum of its digits is 27 and the number is odd. What is the number?",
    options: [
        { text: "34,965", correct: true, feedback: "34,965 → nearest 1,000: 35,000 (hundreds 9≥5); nearest 10: 34,970 (ones 5). Sum=3+4+9+6+5=27, odd." },
        { text: "34,974", correct: false, feedback: "Sum is also 27, but it is even." },
        { text: "35,965", correct: false, feedback: "Rounds to 36,000 for nearest 1,000." },
        { text: "34,955", correct: false, feedback: "Nearest 10 would be 34,960." }
      ],
    backward: "The intersection of the ranges is 34,965-34,974; the digit sum and odd condition then pin it down.",
    forward: "Multiple constraints lead to a unique solution, a common problem-solving pattern."
  },
  {
    itemId: "d16", order: 16, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Calculate (CLX ÷ IV) + XXX and write the answer in Roman numerals.",
    options: [
        { text: "LXX", correct: true, feedback: "CLX=160, IV=4, 160÷4=40; +XXX=30 gives 70 = LXX." },
        { text: "LXXX", correct: false, feedback: "80 is incorrect." },
        { text: "LX", correct: false, feedback: "60." },
        { text: "C", correct: false, feedback: "100." }
      ],
    backward: "Perform division first, then addition, following BODMAS.",
    forward: "Mixed operations with Roman numerals build confidence with multiple representations."
  },
  {
    itemId: "d17", order: 17, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "On Monday, the temperature dropped by 8°C from Sunday's high of 5°C. On Tuesday, it rose by 12°C from Monday's temperature. What was Tuesday's temperature?",
    options: [
        { text: "9°C", correct: true, feedback: "Monday: 5 - 8 = -3°C. Tuesday: -3 + 12 = 9°C." },
        { text: "1°C", correct: false, feedback: "You might have done 5-8+12 incorrectly." },
        { text: "-3°C", correct: false, feedback: "You only found Monday's temperature." },
        { text: "17°C", correct: false, feedback: "You added 8+12-5?" }
      ],
    backward: "Work out the temperature step by step.",
    forward: "Temperature changes are a daily example of integer arithmetic."
  },
  {
    itemId: "d18", order: 18, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "Write the number 'two crore thirty-five lakh' in the International system.",
    options: [
        { text: "23,500,000", correct: true, feedback: "2 crore = 20,000,000; 35 lakh = 3,500,000; total = 23,500,000." },
        { text: "2,350,000", correct: false, feedback: "That would be 23.5 lakh." },
        { text: "235,000,000", correct: false, feedback: "That's 23.5 crore." },
        { text: "20,350,000", correct: false, feedback: "You added 2 crore and 35 lakh incorrectly." }
      ],
    backward: "1 crore = 10 million, 1 lakh = 100,000.",
    forward: "Large numbers in Indian reports often need to be converted for an international audience."
  },
  {
    itemId: "d19", order: 19, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "Using the digits 3, 0, 8, 5, 2, 7, 1 (each exactly once), form the smallest possible 7-digit number in the International system such that the digit in the thousands place is a multiple of 3.",
    options: [
        { text: "1,023,578", correct: true, feedback: "Smallest start is 1, then 0,2 in the next places; thousands digit must be a multiple of 3 → 3. Then arrange remaining 5,7,8 in smallest order: 578. So 1,023,578." },
        { text: "1,023,587", correct: false, feedback: "Last three digits are not in the smallest order." },
        { text: "1,203,578", correct: false, feedback: "Hundred-thousands digit 2 instead of 0 makes the number larger." },
        { text: "1,032,578", correct: false, feedback: "The ten-thousands and thousands are swapped; 0 in ten-thousands is smaller." }
      ],
    backward: "Place the smallest possible digits from left to right while satisfying the thousands condition.",
    forward: "This exercise sharpens logical sequencing under constraints."
  },
  {
    itemId: "d20", order: 20, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "Arrange the following in descending order: XL (Roman), 36, -5, 0.",
    options: [
        { text: "XL, 36, 0, -5", correct: true, feedback: "XL = 40, then 36, then 0, then -5." },
        { text: "36, XL, 0, -5", correct: false, feedback: "40 is larger than 36." },
        { text: "0, -5, XL, 36", correct: false, feedback: "That's not descending." },
        { text: "-5, 0, 36, XL", correct: false, feedback: "That's ascending." }
      ],
    backward: "Convert all values to the same system before comparing.",
    forward: "Comparing mixed representations is common in data analysis."
  },
  {
    itemId: "d21", order: 21, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number between 500 and 600 is rounded to the nearest 100 and also to the nearest 10. The difference between the two rounded values is 40. The sum of its digits is 13 and the number is odd. What is the number?",
    options: [
        { text: "535", correct: true, feedback: "Rounded to 100: 500, to 10: 540. Difference 40. Sum 5+3+5=13, odd." },
        { text: "544", correct: false, feedback: "Sum is 13, but it's even." },
        { text: "540", correct: false, feedback: "Sum = 9, not 13, and even." },
        { text: "525", correct: false, feedback: "Rounded to 10: 530, not 540 (difference would be 30)." }
      ],
    backward: "Find the numbers in the intersection that give a difference of 40, then apply the digit sum and odd condition.",
    forward: "Solving a problem with multiple overlapping conditions is a valuable skill."
  },
  {
    itemId: "d22", order: 22, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Solve: XC ÷ V + XII and write the answer in Roman numerals.",
    options: [
        { text: "XXX", correct: true, feedback: "90 ÷ 5 = 18, 18 + 12 = 30 = XXX." },
        { text: "XX", correct: false, feedback: "20 is too low." },
        { text: "XL", correct: false, feedback: "40 is incorrect." },
        { text: "L", correct: false, feedback: "50 is too high." }
      ],
    backward: "Division first, then addition.",
    forward: "Remembering order of operations across numeral systems is important."
  },
  {
    itemId: "d23", order: 23, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A lift starts at floor 2. It goes down 5 floors, up 3 floors, down 2 floors, and finally up 4 floors. What floor does it reach?",
    options: [
        { text: "2", correct: true, feedback: "2 - 5 = -3; -3 + 3 = 0; 0 - 2 = -2; -2 + 4 = 2." },
        { text: "0", correct: false, feedback: "You missed the final up 4." },
        { text: "-2", correct: false, feedback: "You stopped before the last step." },
        { text: "4", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Track the floor number step by step, using negative numbers for basements.",
    forward: "Lift logic appears in programming and real-world building navigation."
  },
  {
    itemId: "d24", order: 24, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A state's population is 8,765,432 (International). Express this in the Indian system and then round it to the nearest lakh.",
    options: [
        { text: "88,00,000", correct: true, feedback: "8,765,432 International = 87,65,432 Indian. Nearest lakh: ten-thousands digit 6 ≥5 → round up to 88,00,000." },
        { text: "87,65,000", correct: false, feedback: "You rounded to the nearest thousand instead." },
        { text: "87,00,000", correct: false, feedback: "You rounded down incorrectly." },
        { text: "8,800,000", correct: false, feedback: "That's International notation, not Indian." }
      ],
    backward: "Convert, then round using the ten-thousands digit.",
    forward: "Census data often needs to be converted and rounded."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "A number lies between 3,20,000 and 3,30,000. The thousands digit is the square of the hundreds digit. The sum of all six digits is 16. Which number could it be?",
    options: [
        { text: "3,24,250", correct: true, feedback: "Thousands=4, hundreds=2 (2²=4). Sum=3+2+4+2+5+0=16." },
        { text: "3,24,105", correct: false, feedback: "Sum=3+2+4+1+0+5=15, not 16, and hundreds 1, but 1²=1≠4." },
        { text: "3,25,150", correct: false, feedback: "Thousands=5, but 5 is not a square of any digit (5²=25)." },
        { text: "3,23,350", correct: false, feedback: "Thousands=3, 3²=9, not 3." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "What is the smallest 5-digit number (Indian system) that uses all the digits 1, 2, 3, 4, 5 exactly once, and where the number formed by the first two digits is a multiple of 4?",
    options: [
        { text: "12,345", correct: true, feedback: "First two digits 12, a multiple of 4. Smallest arrangement then 12,345." },
        { text: "13,245", correct: false, feedback: "13 is not a multiple of 4." },
        { text: "12,354", correct: false, feedback: "Not the smallest order of the last three digits." },
        { text: "21,345", correct: false, feedback: "21 is not a multiple of 4, and 21,345 is larger." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number rounded to the nearest 100 is 9,400, and rounded to the nearest 10 is 9,350. The number is a multiple of 10. What is it?",
    options: [
        { text: "9,350", correct: true, feedback: "9,350 → nearest 100: 9,400 (tens 5); nearest 10: 9,350; and it's a multiple of 10." },
        { text: "9,345", correct: false, feedback: "Nearest 10: 9,350? 9,345 rounds to 9,350 (ones 5), but not a multiple of 10." },
        { text: "9,449", correct: false, feedback: "Nearest 10: 9,450." },
        { text: "9,355", correct: false, feedback: "Nearest 10: 9,360." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Find the difference between CXL and LXXIX, then round down to the nearest X and write in Roman numerals.",
    options: [
        { text: "LX", correct: true, feedback: "140 - 79 = 61. Rounded down to nearest 10 is 60 = LX." },
        { text: "L", correct: false, feedback: "50 is too low; the difference is 61, rounding down to 60." },
        { text: "LXX", correct: false, feedback: "70 is too high." },
        { text: "XLI", correct: false, feedback: "41 is far too low." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A hiker starts at 150 m above sea level. She descends 200 m, then climbs 80 m, then descends 30 m. What is her final elevation?",
    options: [
        { text: "0 m", correct: true, feedback: "150 - 200 = -50; -50 + 80 = 30; 30 - 30 = 0." },
        { text: "-20 m", correct: false, feedback: "Incorrect calculation." },
        { text: "60 m", correct: false, feedback: "Ignored the negative." },
        { text: "-80 m", correct: false, feedback: "Sign error." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "A river is 12,34,000 m long (Indian system). Write its length in km using the International system.",
    options: [
        { text: "1,234 km", correct: true, feedback: "12,34,000 m = 1,234 km. International: 1,234 km." },
        { text: "1,23,400 km", correct: false, feedback: "That's Indian grouping and wrong conversion." },
        { text: "12.34 km", correct: false, feedback: "Divided by 100,000 by mistake." },
        { text: "123.4 km", correct: false, feedback: "Divided by 10,000 incorrectly." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "PLACE", clusterName: CLUSTER_NAMES.PLACE,
    question: "What is the greatest 6-digit Indian system number where the lakhs digit is 7, the ten-thousands digit is a prime, the thousands digit is a cube number, and all digits are different?",
    options: [
        { text: "7,58,963", correct: true, feedback: "7,5 (prime), 8 (cube), then 9,6,3 descending." },
        { text: "7,85,963", correct: false, feedback: "Ten-thousands 8 is not prime." },
        { text: "7,57,963", correct: false, feedback: "Thousands 7 is not a cube." },
        { text: "7,59,863", correct: false, feedback: "Thousands 9 not a cube." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "COMP", clusterName: CLUSTER_NAMES.COMP,
    question: "I am a 4-digit number. My thousands digit is twice my tens digit. My hundreds digit is the sum of my thousands and units digits. The tens digit is odd. The number is less than 5,000. Which could I be?",
    options: [
        { text: "2412", correct: true, feedback: "2 = 2×1 (tens 1 odd), hundreds 4 = 2+2, 2412<5000." },
        { text: "4824", correct: false, feedback: "Tens digit 2 is even, so fails the odd condition." },
        { text: "3621", correct: false, feedback: "3 ≠ 2×2." },
        { text: "1206", correct: false, feedback: "Thousands 1, tens 0.5 not integer." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "ROUND", clusterName: CLUSTER_NAMES.ROUND,
    question: "A number is rounded to the nearest 100 to get 3,200, and to the nearest 10 to get 3,180. The number is a multiple of 9. What is it?",
    options: [
        { text: "3,177", correct: true, feedback: "Range for 100: 3,150-3,249; for 10: 3,175-3,184. Intersection 3,175-3,184. Multiples of 9 in that range: 3,177 (9×353)." },
        { text: "3,186", correct: false, feedback: "Multiple of 9 but outside the intersection." },
        { text: "3,181", correct: false, feedback: "Not a multiple of 9." },
        { text: "3,175", correct: false, feedback: "Not a multiple of 9." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "ROMAN", clusterName: CLUSTER_NAMES.ROMAN,
    question: "Calculate (C + XXV) ÷ V and write the answer in Roman numerals.",
    options: [
        { text: "XXV", correct: true, feedback: "100+25=125, ÷5=25 = XXV." },
        { text: "V", correct: false, feedback: "5, too small." },
        { text: "XX", correct: false, feedback: "20, not correct." },
        { text: "XXX", correct: false, feedback: "30." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "NEG", clusterName: CLUSTER_NAMES.NEG,
    question: "A bank balance is -₹800. The owner deposits ₹1,500, withdraws ₹1,000, then deposits ₹200. Final balance?",
    options: [
        { text: "-₹100", correct: true, feedback: "-800+1500=700; 700-1000=-300; -300+200=-100." },
        { text: "₹100", correct: false, feedback: "Sign error." },
        { text: "-₹500", correct: false, feedback: "Miscalculation." },
        { text: "₹500", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "CONV", clusterName: CLUSTER_NAMES.CONV,
    question: "The area of a farm is 56,78,900 sq m (Indian). Round this area to the nearest lakh sq m and write the result in the International system.",
    options: [
        { text: "5,700,000", correct: true, feedback: "56,78,900 → nearest lakh: ten-thousands 7≥5 → round up to 57,00,000 Indian. International = 5,700,000." },
        { text: "5,600,000", correct: false, feedback: "Rounded down incorrectly." },
        { text: "56,00,000", correct: false, feedback: "Indian notation, not International." },
        { text: "57,000,000", correct: false, feedback: "57 lakh in Indian is 57,00,000, which is 5,700,000, not 57 million." }
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
    title: "Number Sense & Place Value — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step synthesis problems that combine place value, rounding ranges, Roman-numeral arithmetic, multi-transaction negative numbers, and cross-system conversions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review – Synthesis Tips</strong><br>' +
      "&bull; Combine place value with comparisons to crack digit puzzles.<br>" +
      "&bull; Use rounding to find possible ranges, then narrow down with digit rules.<br>" +
      "&bull; Convert Roman numerals to numbers, perform operations, and round results.<br>" +
      "&bull; Negative numbers can be part of multi-step problems (temperature, depth, lifts).<br>" +
      "&bull; Switch between Indian and International systems to compare populations or data.<br>",
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

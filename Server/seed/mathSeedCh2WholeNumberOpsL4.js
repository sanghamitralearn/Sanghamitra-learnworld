// seed/mathSeedCh2WholeNumberOpsL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 2
// (Operations on Whole Numbers), Level 4 — converted from the standalone
// HTML file ch-2-whole-number-ops-4.html.
//
// Run with: node seed/mathSeedCh2WholeNumberOpsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-2-whole-number-ops";
const CHAPTER_NAME = "Operations on Whole Numbers";
const LEVEL = 4;

const CLUSTER_NAMES = {
  ADDSUB: "Addition & Subtraction",
  MULT: "Multiplication",
  DIV: "Division",
  POW10: "× and ÷ by 10, 100, 1000",
  EST: "Estimation",
  WORD: "Word Problems"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "56,789 + 43,211",
    options: [
        { text: "1,00,000", correct: true, feedback: "56,789 + 43,211 = 1,00,000." },
        { text: "99,000", correct: false, feedback: "You forgot to carry in the ten-thousands column." },
        { text: "1,00,100", correct: false, feedback: "Off by 100; check the hundreds addition." },
        { text: "99,990", correct: false, feedback: "Carry error in the last step." }
      ],
    retryHint: ""
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "250 × 40",
    options: [
        { text: "10,000", correct: true, feedback: "250 × 4 = 1,000, then append two zeros → 10,000." },
        { text: "1,000", correct: false, feedback: "You forgot the zero from 40." },
        { text: "100,000", correct: false, feedback: "You added an extra zero." },
        { text: "1,00,000", correct: false, feedback: "Far too large." }
      ],
    retryHint: ""
  },
  {
    itemId: "w3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "9,600 ÷ 80",
    options: [
        { text: "120", correct: true, feedback: "9,600 ÷ 8 = 1,200? Actually 9,600 ÷ 80 = 120. Think: 96÷8=12, so 9,600÷80=120." },
        { text: "12", correct: false, feedback: "You lost a zero." },
        { text: "1,200", correct: false, feedback: "You divided by 8, not 80." },
        { text: "1,000", correct: false, feedback: "Estimate only." }
      ],
    retryHint: ""
  },
  {
    itemId: "w4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "3,400 × 100",
    options: [
        { text: "3,40,000", correct: true, feedback: "3,400 × 100 = 3,40,000 (append two zeros)." },
        { text: "34,000", correct: false, feedback: "That's ×10." },
        { text: "3,400,000", correct: false, feedback: "That's ×1000." },
        { text: "3,40,00,000", correct: false, feedback: "Far too large." }
      ],
    retryHint: ""
  },
  {
    itemId: "w5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 4,678 + 3,219 by rounding to the nearest 100.",
    options: [
        { text: "7,900", correct: true, feedback: "4,700 + 3,200 = 7,900." },
        { text: "7,800", correct: false, feedback: "You rounded 4,678 down instead of up." },
        { text: "7,897", correct: false, feedback: "That's the exact sum, not an estimate." },
        { text: "8,000", correct: false, feedback: "Rounded to the nearest 1,000." }
      ],
    retryHint: ""
  },
  {
    itemId: "w6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "1,200 beads are packed in bags of 60 beads each. How many bags?",
    options: [
        { text: "20", correct: true, feedback: "1,200 ÷ 60 = 20." },
        { text: "72,000", correct: false, feedback: "You multiplied instead of dividing." },
        { text: "200", correct: false, feedback: "You divided by 6, not 60." },
        { text: "2", correct: false, feedback: "Lost a zero." }
      ],
    retryHint: ""
  },
  {
    itemId: "w7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "80,000 - 45,678",
    options: [
        { text: "34,322", correct: true, feedback: "80,000 - 45,678 = 34,322." },
        { text: "35,322", correct: false, feedback: "Borrowing error across the zeros." },
        { text: "34,222", correct: false, feedback: "Off by 100." },
        { text: "44,322", correct: false, feedback: "You subtracted incorrectly." }
      ],
    retryHint: ""
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "125 × 8",
    options: [
        { text: "1,000", correct: true, feedback: "125 × 8 = 1,000." },
        { text: "100", correct: false, feedback: "Way too small." },
        { text: "10,000", correct: false, feedback: "You added an extra zero." },
        { text: "800", correct: false, feedback: "You did 100 × 8." }
      ],
    retryHint: ""
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "T",
    question: "A student calculated 45,678 + 29,999 and got 74,677. What mistake did he most likely make?",
    options: [
        { text: "Forgot to carry 1 into the ten-thousands place", correct: true, feedback: "45,678 + 29,999 = 75,677. The student's answer is 1,000 less, indicating a missing carry." },
        { text: "Added an extra 1 in the hundreds", correct: false, feedback: "That would give a larger answer, not smaller." },
        { text: "Subtracted instead of adding", correct: false, feedback: "Subtracting would give a much smaller number." },
        { text: "Misaligned the digits", correct: false, feedback: "Misalignment would cause a different pattern of error." }
      ],
    backward: "Always check carries when adding numbers with many 9s.",
    forward: "Error detection is a crucial skill in exams and real life."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "S",
    question: "Multiply: 45 × 99",
    options: [
        { text: "4,455", correct: true, feedback: "45 × 100 = 4,500; minus 45 = 4,455." },
        { text: "4,500", correct: false, feedback: "You forgot to subtract 45." },
        { text: "4,545", correct: false, feedback: "45 × 101, not 99." },
        { text: "4,950", correct: false, feedback: "That's 45 × 110." }
      ],
    backward: "Use the shortcut: 99 = 100 - 1.",
    forward: "Multiplying by 99, 999, etc., is common in mental maths."
  },
  {
    itemId: "d3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "T",
    question: "Divide 8,000 by 25.",
    options: [
        { text: "320", correct: true, feedback: "8,000 ÷ 100 = 80, then ×4 = 320." },
        { text: "32", correct: false, feedback: "You lost a zero." },
        { text: "3,200", correct: false, feedback: "You multiplied by 10 instead of dividing." },
        { text: "200", correct: false, feedback: "That's 8,000 ÷ 40." }
      ],
    backward: "Dividing by 25 is the same as multiplying by 4 and dividing by 100.",
    forward: "This trick is useful for money calculations (paise to rupees)."
  },
  {
    itemId: "d4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10, tier: "S",
    question: "How many thousands are there in 45,00,000?",
    options: [
        { text: "4,500", correct: true, feedback: "45,00,000 ÷ 1,000 = 4,500." },
        { text: "450", correct: false, feedback: "You divided by 10,000." },
        { text: "45", correct: false, feedback: "Divided by 1,00,000." },
        { text: "45,000", correct: false, feedback: "You multiplied by 10." }
      ],
    backward: "Removing three zeros gives the number of thousands.",
    forward: "Unit conversions rely on this quick shift."
  },
  {
    itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST, tier: "C",
    question: "Estimate 4,832 ÷ 78 by rounding each number to the nearest ten.",
    options: [
        { text: "60", correct: true, feedback: "4,830 ÷ 80 → 60.375, so about 60." },
        { text: "50", correct: false, feedback: "You rounded 78 down to 70 instead of up to 80." },
        { text: "70", correct: false, feedback: "You used 4,900 ÷ 70." },
        { text: "6", correct: false, feedback: "You lost a zero in the quotient." }
      ],
    backward: "Round both numbers to the nearest ten, then divide.",
    forward: "Estimation helps quickly check division results."
  },
  {
    itemId: "d6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD, tier: "C",
    question: "A shopkeeper bought 15 dozen bananas. 12 bananas were rotten. How many good bananas were left?",
    options: [
        { text: "168", correct: true, feedback: "15 × 12 = 180; 180 - 12 = 168." },
        { text: "180", correct: false, feedback: "You forgot to subtract the rotten ones." },
        { text: "192", correct: false, feedback: "You added 12 instead of subtracting." },
        { text: "150", correct: false, feedback: "You did 15 × 10 = 150, ignoring the 2 extra per dozen." }
      ],
    backward: "First find total, then subtract the bad ones.",
    forward: "Inventory problems are common in business."
  },
  {
    itemId: "d7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    question: "Find the missing digit: 7,__3,456 - 2,45,678 = 5,27,778",
    options: [
        { text: "7", correct: true, feedback: "Add the difference and subtrahend: 5,27,778 + 2,45,678 = 7,73,456. The missing ten-thousands digit is 7." },
        { text: "6", correct: false, feedback: "You forgot a carry from the thousands." },
        { text: "8", correct: false, feedback: "Too large; the sum would exceed 8,00,000." },
        { text: "5", correct: false, feedback: "Too small; the sum would be 7,53,456." }
      ],
    backward: "Reverse the subtraction: add the result to the subtracted number.",
    forward: "Missing-digit puzzles build logical reasoning."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "H",
    question: "A number multiplied by itself gives 5,929. What is the number?",
    options: [
        { text: "77", correct: true, feedback: "77 × 77 = 5,929." },
        { text: "73", correct: false, feedback: "73² = 5,329." },
        { text: "83", correct: false, feedback: "83² = 6,889." },
        { text: "87", correct: false, feedback: "87² = 7,569." }
      ],
    backward: "Look for the square root; 5,929 ends in 9, so the number ends in 3 or 7.",
    forward: "Square numbers appear in geometry and algebra."
  },
  {
    itemId: "d9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "C",
    question: "Divide 6,789 by 32. What is the remainder?",
    options: [
        { text: "5", correct: true, feedback: "32 × 212 = 6,784; remainder = 6,789 - 6,784 = 5." },
        { text: "212", correct: false, feedback: "That's the quotient, not the remainder." },
        { text: "21", correct: false, feedback: "You might have mis-divided." },
        { text: "0", correct: false, feedback: "The division is not exact." }
      ],
    backward: "Multiply divisor by quotient and subtract from dividend.",
    forward: "Remainders are important in modular arithmetic."
  },
  {
    itemId: "d10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10, tier: "T",
    question: "4,500 ÷ 100 = ?",
    options: [
        { text: "45", correct: true, feedback: "Dividing by 100 removes two zeros: 4,500 → 45." },
        { text: "450", correct: false, feedback: "That's dividing by 10." },
        { text: "4.5", correct: false, feedback: "Decimal answer, but we are working with whole numbers; the exact whole number is 45." },
        { text: "4,500", correct: false, feedback: "You didn't perform the operation." }
      ],
    backward: "Remove two zeros when dividing by 100.",
    forward: "Quick division by powers of ten is a key skill."
  },
  {
    itemId: "d11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST, tier: "T",
    question: "Which is the best estimate for 5,123 × 29?",
    options: [
        { text: "5,000 × 30 = 1,50,000", correct: true, feedback: "Rounding to nearest 1,000 and 10 gives this estimate." },
        { text: "5,100 × 30 = 1,53,000", correct: false, feedback: "That's a finer estimate, but 5,123 to nearest 1,000 is 5,000, not 5,100." },
        { text: "5,000 × 20 = 1,00,000", correct: false, feedback: "29 rounds to 30, not 20." },
        { text: "5,123 × 29 = 1,48,567", correct: false, feedback: "That's the exact product, not an estimate." }
      ],
    backward: "Round to convenient place values, then multiply.",
    forward: "Choosing the right rounding level is crucial for quick estimation."
  },
  {
    itemId: "d12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD, tier: "H",
    question: "A train leaves with 1,250 passengers. At the first stop, 350 get off and 480 get on. At the second stop, 620 get off and 290 get on. How many passengers are now on the train?",
    options: [
        { text: "1,050", correct: true, feedback: "1,250 - 350 + 480 = 1,380; 1,380 - 620 + 290 = 1,050." },
        { text: "1,380", correct: false, feedback: "That's after the first stop only." },
        { text: "670", correct: false, feedback: "You only calculated net change incorrectly." },
        { text: "1,200", correct: false, feedback: "Estimate, not exact." }
      ],
    backward: "Process each stop: subtract off, add on.",
    forward: "Passenger flow problems are common in transport planning."
  },
  {
    itemId: "d13", order: 13, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "S",
    question: "12,345 + 87,655",
    options: [
        { text: "1,00,000", correct: true, feedback: "12,345 + 87,655 = 1,00,000." },
        { text: "99,990", correct: false, feedback: "Forgot the final carry." },
        { text: "1,00,100", correct: false, feedback: "Off by 100." },
        { text: "99,000", correct: false, feedback: "Way too small." }
      ],
    backward: "These numbers are complements to 1,00,000.",
    forward: "Complementary addition is a quick mental check."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "T",
    question: "Multiply 305 × 204.",
    options: [
        { text: "62,220", correct: true, feedback: "305 × 200 = 61,000; 305 × 4 = 1,220; sum = 62,220." },
        { text: "62,000", correct: false, feedback: "You forgot to add 305 × 4." },
        { text: "62,200", correct: false, feedback: "Partial product misalignment." },
        { text: "6,220", correct: false, feedback: "You lost a zero in the product." }
      ],
    backward: "Watch the zeros: 305 × 4 = 1,220, align carefully.",
    forward: "Multiplication with zeros tests place-value discipline."
  },
  {
    itemId: "d15", order: 15, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV, tier: "S",
    question: "9,999 ÷ 33",
    options: [
        { text: "303", correct: true, feedback: "33 × 300 = 9,900; remainder 99; 33 × 3 = 99 → 303." },
        { text: "33", correct: false, feedback: "Way too small." },
        { text: "300", correct: false, feedback: "Forgot the remainder part." },
        { text: "330", correct: false, feedback: "Too large." }
      ],
    backward: "Break the dividend into easy multiples of 33.",
    forward: "Quick division by 33 is good for mental maths."
  },
  {
    itemId: "d16", order: 16, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10, tier: "C",
    question: "Convert 7.5 lakh into thousands. (1 lakh = 1,00,000)",
    options: [
        { text: "750", correct: true, feedback: "7.5 lakh = 7,50,000; number of thousands = 7,50,000 ÷ 1,000 = 750." },
        { text: "7,500", correct: false, feedback: "That's the number of hundreds." },
        { text: "75,000", correct: false, feedback: "That's the number of tens." },
        { text: "7.5", correct: false, feedback: "You forgot to multiply and divide correctly." }
      ],
    backward: "First convert lakh to units, then divide by 1,000.",
    forward: "Large-scale conversions are used in economics."
  },
  {
    itemId: "d17", order: 17, cluster: "EST", clusterName: CLUSTER_NAMES.EST, tier: "C",
    question: "Estimate 19,876 ÷ 49 by rounding to the nearest 1,000 and 10.",
    options: [
        { text: "20,000 ÷ 50 = 400", correct: true, feedback: "19,876 → 20,000; 49 → 50. 20,000 ÷ 50 = 400." },
        { text: "10,000 ÷ 50 = 200", correct: false, feedback: "19,876 rounds to 20,000, not 10,000." },
        { text: "20,000 ÷ 40 = 500", correct: false, feedback: "49 rounds to 50, not 40." },
        { text: "19,000 ÷ 50 = 380", correct: false, feedback: "19,876 rounds to 20,000, not 19,000." }
      ],
    backward: "Round to the specified place, then divide.",
    forward: "This gives a quick check for exact division."
  },
  {
    itemId: "d18", order: 18, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD, tier: "S",
    question: "A packet of biscuits costs ₹45. How many packets can be bought for ₹2,025?",
    options: [
        { text: "45", correct: true, feedback: "2,025 ÷ 45 = 45 packets." },
        { text: "40", correct: false, feedback: "Estimate only." },
        { text: "50", correct: false, feedback: "Overestimate." },
        { text: "2,025", correct: false, feedback: "No operation performed." }
      ],
    backward: "Total money ÷ cost per item = number of items.",
    forward: "Unit price problems are everywhere in shopping."
  },
  {
    itemId: "d19", order: 19, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB, tier: "H",
    question: "Find the sum of the largest 5-digit number and the smallest 5-digit number.",
    options: [
        { text: "1,09,999", correct: true, feedback: "99,999 + 10,000 = 1,09,999." },
        { text: "1,00,000", correct: false, feedback: "That's 99,999 + 1." },
        { text: "1,10,000", correct: false, feedback: "Overestimate." },
        { text: "99,999", correct: false, feedback: "Only the largest number." }
      ],
    backward: "Identify the numbers first: 99,999 and 10,000.",
    forward: "Working with extremes helps build number sense."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "C",
    question: "Multiply 478 by 25. (Hint: 25 = 100 ÷ 4)",
    options: [
        { text: "11,950", correct: true, feedback: "478 × 100 = 47,800; ÷ 4 = 11,950." },
        { text: "11,900", correct: false, feedback: "You mis-divided 47,800 by 4." },
        { text: "47,800", correct: false, feedback: "You forgot to divide by 4." },
        { text: "1,195", correct: false, feedback: "You lost a zero." }
      ],
    backward: "Use the shortcut: multiply by 100 and divide by 4.",
    forward: "Multiplying by 25 is a common mental-maths trick."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "67,890 + 32,110",
    options: [
        { text: "1,00,000", correct: true, feedback: "67,890 + 32,110 = 1,00,000." },
        { text: "99,990", correct: false, feedback: "Forgot the final carry." },
        { text: "1,00,100", correct: false, feedback: "Off by 100." },
        { text: "99,000", correct: false, feedback: "Way off." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "35 × 99",
    options: [
        { text: "3,465", correct: true, feedback: "35 × 100 = 3,500; minus 35 = 3,465." },
        { text: "3,500", correct: false, feedback: "Forgot to subtract 35." },
        { text: "3,565", correct: false, feedback: "35 × 101." },
        { text: "3,150", correct: false, feedback: "35 × 90." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "7,500 ÷ 25",
    options: [
        { text: "300", correct: true, feedback: "7,500 ÷ 100 = 75; ×4 = 300." },
        { text: "30", correct: false, feedback: "Lost a zero." },
        { text: "3,000", correct: false, feedback: "Multiplied by 10." },
        { text: "200", correct: false, feedback: "7,500 ÷ 40." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many hundreds are there in 56,000?",
    options: [
        { text: "560", correct: true, feedback: "56,000 ÷ 100 = 560." },
        { text: "5,600", correct: false, feedback: "That's the number of tens." },
        { text: "56", correct: false, feedback: "Divided by 1,000." },
        { text: "5.6", correct: false, feedback: "Decimal confusion." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 6,789 × 31 by rounding to the nearest 1,000 and 10.",
    options: [
        { text: "7,000 × 30 = 2,10,000", correct: true, feedback: "6,789 → 7,000; 31 → 30." },
        { text: "6,000 × 30 = 1,80,000", correct: false, feedback: "6,789 rounds to 7,000, not 6,000." },
        { text: "7,000 × 40 = 2,80,000", correct: false, feedback: "31 rounds to 30, not 40." },
        { text: "6,789 × 31 = 2,10,459", correct: false, feedback: "That's the exact value." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "2,000 sweets are packed in boxes of 40 sweets each. How many boxes?",
    options: [
        { text: "50", correct: true, feedback: "2,000 ÷ 40 = 50." },
        { text: "500", correct: false, feedback: "You divided by 4." },
        { text: "80,000", correct: false, feedback: "You multiplied." },
        { text: "5", correct: false, feedback: "Lost a zero." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the missing digit: 8,__4,321 - 2,56,789 = 5,87,532",
    options: [
        { text: "4", correct: true, feedback: "5,87,532 + 2,56,789 = 8,44,321; missing digit is 4." },
        { text: "3", correct: false, feedback: "Forgot a carry." },
        { text: "5", correct: false, feedback: "Too large." },
        { text: "2", correct: false, feedback: "Too small." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "125 × 16 (Hint: 125 × 8 = 1,000)",
    options: [
        { text: "2,000", correct: true, feedback: "125 × 16 = 125 × 8 × 2 = 1,000 × 2 = 2,000." },
        { text: "1,000", correct: false, feedback: "That's 125 × 8." },
        { text: "1,500", correct: false, feedback: "125 × 12." },
        { text: "2,500", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 9,876 by 36. What is the remainder?",
    options: [
        { text: "12", correct: true, feedback: "36 × 274 = 9,864; 9,876 - 9,864 = 12." },
        { text: "274", correct: false, feedback: "That's the quotient." },
        { text: "0", correct: false, feedback: "Not exact." },
        { text: "24", correct: false, feedback: "Incorrect remainder." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "3.6 lakh = how many tens?",
    options: [
        { text: "36,000", correct: true, feedback: "3.6 lakh = 3,60,000; ÷ 10 = 36,000." },
        { text: "3,600", correct: false, feedback: "That's the number of hundreds." },
        { text: "360", correct: false, feedback: "The number of thousands." },
        { text: "3,60,000", correct: false, feedback: "The number of ones." }
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
    title: "Operations on Whole Numbers — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every whole-number-operations cluster.",
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

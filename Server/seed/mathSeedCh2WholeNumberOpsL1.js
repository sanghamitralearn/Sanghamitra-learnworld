// seed/mathSeedCh2WholeNumberOpsL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 2
// (Operations on Whole Numbers), Level 1 — converted from the standalone
// HTML file ch-2-whole-number-ops-1.html.
//
// Run with: node seed/mathSeedCh2WholeNumberOpsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-2-whole-number-ops";
const CHAPTER_NAME = "Operations on Whole Numbers";
const LEVEL = 1;

const CLUSTER_NAMES = {
  ADDSUB: "Addition & Subtraction",
  MULT: "Multiplication",
  DIV: "Division",
  POW10: "× and ÷ by 10, 100, 1000",
  EST: "Estimation",
  WORD: "One-step Word Problems"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Add: 2,34,567 + 1,23,456",
    options: [
        { text: "3,58,023", correct: true, feedback: "2,34,567 + 1,23,456 = 3,58,023." },
        { text: "3,58,123", correct: false, feedback: "You forgot to carry 1 from the hundreds column." },
        { text: "3,57,023", correct: false, feedback: "The ten-thousands column was added incorrectly." },
        { text: "3,58,013", correct: false, feedback: "The tens column was miscalculated." }
      ],
    retryHint: "Line up the digits by place value and add from right to left, carrying when a column sum is 10 or more."
  },
  {
    itemId: "w2", order: 2, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Subtract: 5,00,000 - 2,34,567",
    options: [
        { text: "2,65,433", correct: true, feedback: "Borrow across the zeros correctly: 5,00,000 - 2,34,567 = 2,65,433." },
        { text: "2,65,543", correct: false, feedback: "You made a borrowing error in the hundreds column." },
        { text: "2,75,433", correct: false, feedback: "You didn't borrow enough from the ten-thousands place." },
        { text: "2,64,433", correct: false, feedback: "The thousands digit is off by 1; check your subtraction steps." }
      ],
    retryHint: "When subtracting across zeros, borrow from the first non-zero digit to the left, turning zeros into 9s."
  },
  {
    itemId: "w3", order: 3, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 345 × 27",
    options: [
        { text: "9,315", correct: true, feedback: "345 × 20 = 6,900; 345 × 7 = 2,415; sum = 9,315." },
        { text: "9,215", correct: false, feedback: "You forgot to carry when multiplying 345 by 7." },
        { text: "7,315", correct: false, feedback: "You only multiplied 345 by 20 and forgot to add the 345 × 7 part." },
        { text: "9,300", correct: false, feedback: "You rounded 27 to 20 and missed the 7 entirely." }
      ],
    retryHint: "Break 27 into 20 + 7. Multiply 345 by each, then add the two products."
  },
  {
    itemId: "w4", order: 4, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 8,976 ÷ 24",
    options: [
        { text: "374", correct: true, feedback: "24 × 300 = 7,200; subtract to get 1,776; 24 × 74 = 1,776. Quotient = 374." },
        { text: "364", correct: false, feedback: "You made an error in the last subtraction step." },
        { text: "374 R 0", correct: false, feedback: "The remainder is 0; answer is just 374." },
        { text: "384", correct: false, feedback: "You guessed the tens digit too high." }
      ],
    retryHint: "Estimate: 24 × 300 = 7,200. Subtract from 8,976, then divide the remainder by 24."
  },
  {
    itemId: "w5", order: 5, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "56 × 100 = ?",
    options: [
        { text: "5,600", correct: true, feedback: "Multiplying by 100 appends two zeros: 5,600." },
        { text: "560", correct: false, feedback: "That's multiplying by 10, not 100." },
        { text: "56,000", correct: false, feedback: "Too many zeros — that's × 1,000." },
        { text: "5,060", correct: false, feedback: "You placed a zero incorrectly inside the number." }
      ],
    retryHint: "When multiplying a whole number by 100, just write two zeros at the end of the number."
  },
  {
    itemId: "w6", order: 6, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "4,500 ÷ 10 = ?",
    options: [
        { text: "450", correct: true, feedback: "Dividing by 10 removes one zero: 4,500 → 450." },
        { text: "45", correct: false, feedback: "That's dividing by 100, not 10." },
        { text: "4,500", correct: false, feedback: "The number didn't change — you forgot to divide." },
        { text: "4,510", correct: false, feedback: "You added instead of dividing." }
      ],
    retryHint: "To divide by 10, remove one zero from the end. 4,500 has two zeros, remove one → you get 450."
  },
  {
    itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the sum by rounding to the nearest 1,000: 4,672 + 2,389",
    options: [
        { text: "5,000 + 2,000 = 7,000", correct: true, feedback: "4,672 rounds down to 5,000; 2,389 rounds down to 2,000. Estimated sum: 7,000." },
        { text: "4,000 + 2,000 = 6,000", correct: false, feedback: "4,672 is closer to 5,000 than to 4,000." },
        { text: "5,000 + 3,000 = 8,000", correct: false, feedback: "2,389 is closer to 2,000 than 3,000." },
        { text: "4,672 + 2,389 = 7,061", correct: false, feedback: "That's the exact sum, not an estimate." }
      ],
    retryHint: "Look at the hundreds digit. If it's 5 or more, round up; if 4 or less, round down."
  },
  {
    itemId: "w8", order: 8, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A shop sold 1,250 books on Monday and 980 on Tuesday. How many books were sold in total?",
    options: [
        { text: "2,230", correct: true, feedback: "Total = 1,250 + 980 = 2,230." },
        { text: "270", correct: false, feedback: "You subtracted instead of adding." },
        { text: "2,130", correct: false, feedback: "You added incorrectly: 1,250 + 980 = 2,230, not 2,130." },
        { text: "2,200", correct: false, feedback: "You rounded and forgot to add the remaining parts." }
      ],
    retryHint: "'Total' means you need to add the two numbers."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the sum: 4,56,789 + 2,87,654",
    options: [
        { text: "7,44,443", correct: true, feedback: "4,56,789 + 2,87,654 = 7,44,443." },
        { text: "7,44,343", correct: false, feedback: "You forgot to carry 1 from the ten-thousands column." },
        { text: "7,43,443", correct: false, feedback: "The lakhs column was added incorrectly." },
        { text: "7,44,543", correct: false, feedback: "The hundreds column carry was missed." }
      ],
    backward: "Add column by column from right, carrying when a column sum ≥ 10.",
    forward: "Accurate addition is the foundation for larger calculations and word problems."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 438 × 52",
    options: [
        { text: "22,776", correct: true, feedback: "438 × 50 = 21,900; 438 × 2 = 876; sum = 22,776." },
        { text: "21,900", correct: false, feedback: "You only multiplied by 50 and forgot the ×2 part." },
        { text: "22,000", correct: false, feedback: "That's an estimate, not the exact product." },
        { text: "22,676", correct: false, feedback: "You made an error in adding the partial products." }
      ],
    backward: "Break into 438 × 50 and 438 × 2, then add.",
    forward: "This method scales to multiplying even larger numbers."
  },
  {
    itemId: "d3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 9,315 ÷ 45",
    options: [
        { text: "207", correct: true, feedback: "45 × 200 = 9,000; subtract to get 315; 45 × 7 = 315. Quotient = 207." },
        { text: "27", correct: false, feedback: "You forgot to write the zero in the tens place of the quotient." },
        { text: "217", correct: false, feedback: "The tens digit is off; 45 × 10 = 450, not 315." },
        { text: "200 R 315", correct: false, feedback: "The division is exact; there is no remainder." }
      ],
    backward: "Estimate how many times 45 goes into 93, then 315, etc.",
    forward: "Division is the inverse of multiplication — crucial for fractions later."
  },
  {
    itemId: "d4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Fill in the blank: _____ × 100 = 8,900",
    options: [
        { text: "89", correct: true, feedback: "89 × 100 = 8,900. To find the missing number, divide 8,900 by 100 → 89." },
        { text: "890", correct: false, feedback: "890 × 100 = 89,000, not 8,900. You multiplied by 10." },
        { text: "8.9", correct: false, feedback: "We're working with whole numbers; 8.9 × 100 = 890." },
        { text: "8,900", correct: false, feedback: "8,900 × 100 = 8,90,000, not 8,900." }
      ],
    backward: "Dividing by 100 moves digits two places right.",
    forward: "Place-value shifts are the basis for metric conversions."
  },
  {
    itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the product by rounding each number to the nearest 10: 62 × 38",
    options: [
        { text: "60 × 40 = 2,400", correct: true, feedback: "62 rounds down to 60; 38 rounds up to 40. 60 × 40 = 2,400." },
        { text: "60 × 30 = 1,800", correct: false, feedback: "38 is closer to 40 than 30." },
        { text: "70 × 40 = 2,800", correct: false, feedback: "62 rounds down to 60, not up to 70." },
        { text: "62 × 38 = 2,356", correct: false, feedback: "That's the exact product, not an estimate." }
      ],
    backward: "Round each number first, then multiply.",
    forward: "Estimation helps check if exact answers are reasonable."
  },
  {
    itemId: "d6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A stadium has 15,000 seats. 8,765 tickets were sold. How many seats are still available?",
    options: [
        { text: "6,235", correct: true, feedback: "15,000 - 8,765 = 6,235 seats left." },
        { text: "23,765", correct: false, feedback: "You added instead of subtracted." },
        { text: "6,245", correct: false, feedback: "You made a small subtraction error in the tens column." },
        { text: "7,235", correct: false, feedback: "The borrowing across zeros was incorrect." }
      ],
    backward: "Words like 'still available' or 'left' usually mean subtract.",
    forward: "Reading problems carefully is the first step in data handling."
  },
  {
    itemId: "d7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the difference: 7,00,500 - 3,28,999",
    options: [
        { text: "3,71,501", correct: true, feedback: "7,00,500 - 3,28,999 = 3,71,501." },
        { text: "3,71,601", correct: false, feedback: "You forgot to reduce the hundreds after borrowing." },
        { text: "3,72,501", correct: false, feedback: "The thousands column was off by 1." },
        { text: "3,81,501", correct: false, feedback: "You didn't borrow enough from the ten-thousands place." }
      ],
    backward: "When subtracting across zeros, think of regrouping from the first non-zero digit.",
    forward: "This skill is used in banking and calculating change."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 780 × 40",
    options: [
        { text: "31,200", correct: true, feedback: "78 × 4 = 312; attach two zeros → 31,200." },
        { text: "3,120", correct: false, feedback: "You forgot to attach both zeros. 780 has one zero, 40 has one zero → total two zeros." },
        { text: "31,000", correct: false, feedback: "That's an estimate, not the exact product." },
        { text: "3,12,000", correct: false, feedback: "That's 780 × 400, not 40." }
      ],
    backward: "Multiply the non-zero digits (78 × 4), then append the zeros.",
    forward: "Multiplying by multiples of 10 is a shortcut you'll use often."
  },
  {
    itemId: "d9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 5,678 by 28. What is the quotient and remainder?",
    options: [
        { text: "202 R 22", correct: true, feedback: "28 × 202 = 5,656; 5,678 - 5,656 = 22. Quotient 202, remainder 22." },
        { text: "202 R 12", correct: false, feedback: "The subtraction at the end was incorrect." },
        { text: "201 R 50", correct: false, feedback: "The quotient is too small; the remainder cannot be larger than the divisor." },
        { text: "203 R 6", correct: false, feedback: "The quotient is too large." }
      ],
    backward: "Check: 28 × 202 = 5,656, then add remainder 22 to get 5,678.",
    forward: "Remainders will later become fractions and decimals."
  },
  {
    itemId: "d10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "45,000 ÷ 1,000 = ?",
    options: [
        { text: "45", correct: true, feedback: "Dividing by 1,000 removes three zeros: 45,000 → 45." },
        { text: "450", correct: false, feedback: "That's dividing by 100." },
        { text: "4.5", correct: false, feedback: "We are working with whole numbers; the answer is 45." },
        { text: "4,500", correct: false, feedback: "That's dividing by 10." }
      ],
    backward: "Dividing by 1,000 removes three zeros.",
    forward: "This is how we convert metres to kilometres."
  },
  {
    itemId: "d11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the difference by rounding to the nearest 100: 8,345 - 2,167",
    options: [
        { text: "8,300 - 2,200 = 6,100", correct: true, feedback: "8,345 rounds to 8,300; 2,167 rounds to 2,200. Difference ≈ 6,100." },
        { text: "8,300 - 2,100 = 6,200", correct: false, feedback: "2,167 is closer to 2,200 than 2,100 (tens digit 6 ≥ 5)." },
        { text: "8,000 - 2,000 = 6,000", correct: false, feedback: "That's rounding to the nearest 1,000, not 100." },
        { text: "8,345 - 2,167 = 6,178", correct: false, feedback: "That's the exact difference, not an estimate." }
      ],
    backward: "Round both numbers to the specified place, then subtract.",
    forward: "Estimation helps catch gross errors in calculations."
  },
  {
    itemId: "d12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A box contains 144 pencils. How many pencils are there in 25 boxes?",
    options: [
        { text: "3,600", correct: true, feedback: "144 × 25 = 144 × 100 ÷ 4 = 14,400 ÷ 4 = 3,600." },
        { text: "3,000", correct: false, feedback: "That's an estimate, not the exact answer." },
        { text: "3,500", correct: false, feedback: "You made a calculation error." },
        { text: "169", correct: false, feedback: "You added instead of multiplying." }
      ],
    backward: "Total = number of groups × items per group.",
    forward: "Multiplication word problems appear everywhere — money, area, rates."
  },
  {
    itemId: "d13", order: 13, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Fill in the blank: ______ + 2,45,678 = 5,00,000",
    options: [
        { text: "2,54,322", correct: true, feedback: "5,00,000 - 2,45,678 = 2,54,322." },
        { text: "2,54,422", correct: false, feedback: "You made a subtraction error in the hundreds column." },
        { text: "7,45,678", correct: false, feedback: "You added the numbers instead of finding the missing addend." },
        { text: "2,44,322", correct: false, feedback: "The ten-thousands place is off by 1." }
      ],
    backward: "To find the missing part, subtract the known part from the total.",
    forward: "Missing number problems prepare you for algebra."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 567 × 234",
    options: [
        { text: "1,32,678", correct: true, feedback: "567 × 200 = 1,13,400; × 30 = 17,010; × 4 = 2,268; sum = 1,32,678." },
        { text: "1,32,578", correct: false, feedback: "The last partial product was miscalculated." },
        { text: "1,32,668", correct: false, feedback: "You forgot a carry in the addition step." },
        { text: "1,31,678", correct: false, feedback: "The partial product for 567 × 30 is off." }
      ],
    backward: "Break into 567 × 200, 567 × 30, 567 × 4, then sum.",
    forward: "This method extends to any size numbers."
  },
  {
    itemId: "d15", order: 15, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 9,984 ÷ 48",
    options: [
        { text: "208", correct: true, feedback: "48 × 200 = 9,600; subtract to get 384; 48 × 8 = 384. Quotient = 208." },
        { text: "28", correct: false, feedback: "You forgot the zero in the tens place of the quotient." },
        { text: "218", correct: false, feedback: "You made an error in the final subtraction." },
        { text: "200 R 384", correct: false, feedback: "The division is exact." }
      ],
    backward: "Guess and check each digit of the quotient.",
    forward: "Long division is a building block for algebra later."
  },
  {
    itemId: "d16", order: 16, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Multiply: 320 × 10,000",
    options: [
        { text: "32,00,000", correct: true, feedback: "32 × 1 = 32; attach total zeros from 320 (1) and 10,000 (4) → 5 zeros → 32,00,000." },
        { text: "3,20,000", correct: false, feedback: "That's 320 × 1,000, not 10,000." },
        { text: "3,200", correct: false, feedback: "You lost most of the zeros." },
        { text: "3,20,00,000", correct: false, feedback: "Too many zeros — that's 320 × 1,00,000." }
      ],
    backward: "Multiply the non-zero digits (32 × 1), then attach the total number of zeros (1+4=5).",
    forward: "Multiplying by powers of ten is essential in science and geography."
  },
  {
    itemId: "d17", order: 17, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the product by rounding to the nearest 100 and 10: 297 × 53",
    options: [
        { text: "300 × 50 = 15,000", correct: true, feedback: "297 rounds to 300; 53 rounds to 50. 300 × 50 = 15,000." },
        { text: "300 × 60 = 18,000", correct: false, feedback: "53 rounds down to 50, not up to 60." },
        { text: "200 × 50 = 10,000", correct: false, feedback: "297 rounds up to 300, not down to 200." },
        { text: "297 × 53 = 15,741", correct: false, feedback: "That's the exact product, not an estimate." }
      ],
    backward: "Round each number to a place that makes mental multiplication easy.",
    forward: "Estimation is faster than exact calculation when you only need an approximate answer."
  },
  {
    itemId: "d18", order: 18, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "4,500 sweets are packed equally into 15 boxes. How many sweets are in each box?",
    options: [
        { text: "300", correct: true, feedback: "4,500 ÷ 15 = 300 sweets per box." },
        { text: "4,485", correct: false, feedback: "You subtracted instead of dividing." },
        { text: "4,515", correct: false, feedback: "You added instead of dividing." },
        { text: "30", correct: false, feedback: "You lost a zero in the division." }
      ],
    backward: "Equal sharing means division.",
    forward: "Division word problems are the foundation of rate and ratio concepts."
  },
  {
    itemId: "d19", order: 19, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Add: 12,345 + 67,890 + 9,876",
    options: [
        { text: "90,111", correct: true, feedback: "12,345 + 67,890 = 80,235; + 9,876 = 90,111." },
        { text: "90,011", correct: false, feedback: "You forgot to carry 1 from the hundreds column." },
        { text: "89,111", correct: false, feedback: "The thousands column was off by 1." },
        { text: "90,101", correct: false, feedback: "The tens column was miscalculated." }
      ],
    backward: "Add the first two numbers, then add the third, or add all columns at once.",
    forward: "Adding more than two numbers is common in budgeting."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 89 × 1,000",
    options: [
        { text: "89,000", correct: true, feedback: "89 × 1,000 = 89,000 (attach three zeros)." },
        { text: "8,900", correct: false, feedback: "That's 89 × 100." },
        { text: "890", correct: false, feedback: "That's 89 × 10." },
        { text: "8,90,000", correct: false, feedback: "That's 890 × 1,000." }
      ],
    backward: "Attach three zeros to the number when multiplying by 1,000.",
    forward: "This is used in converting kilograms to grams."
  },
  {
    itemId: "d21", order: 21, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 6,048 ÷ 12",
    options: [
        { text: "504", correct: true, feedback: "12 × 500 = 6,000; remainder 48; 12 × 4 = 48. Quotient = 504." },
        { text: "54", correct: false, feedback: "You forgot the zero in the tens place of the quotient." },
        { text: "540", correct: false, feedback: "You added an extra zero." },
        { text: "524", correct: false, feedback: "The division step for the tens was incorrect." }
      ],
    backward: "Watch for zeros in the quotient — they hold place values.",
    forward: "Place-holding zeros are crucial in all calculations."
  },
  {
    itemId: "d22", order: 22, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Complete the pattern: 34 × 10 = 340, 34 × 100 = 3,400, 34 × 1,000 = ?",
    options: [
        { text: "34,000", correct: true, feedback: "Each extra zero in the multiplier adds one zero to the product. 34 × 1,000 = 34,000." },
        { text: "3,400", correct: false, feedback: "That's 34 × 100, not 1,000." },
        { text: "340", correct: false, feedback: "That's 34 × 10." },
        { text: "3,40,000", correct: false, feedback: "Too many zeros." }
      ],
    backward: "Each zero in the multiplier adds one zero to the product.",
    forward: "Patterns like this reveal the structure of the decimal system."
  },
  {
    itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 2,834 ÷ 47 by rounding 2,834 to the nearest 100 and 47 to the nearest 10. What is the estimated quotient?",
    options: [
        { text: "2,800 ÷ 50 = 56", correct: true, feedback: "2,834 → 2,800; 47 → 50. 2,800 ÷ 50 = 56." },
        { text: "3,000 ÷ 50 = 60", correct: false, feedback: "2,834 rounds to 2,800 to the nearest 100, not 3,000 (hundreds digit 3)." },
        { text: "2,800 ÷ 40 = 70", correct: false, feedback: "47 rounds up to 50, not down to 40." },
        { text: "2,834 ÷ 47 = 60 (approx)", correct: false, feedback: "That's the actual quotient rounded, not the estimate using the requested rounding." }
      ],
    backward: "Round both numbers as directed, then divide.",
    forward: "Estimating quotients helps check if your long division answer is reasonable."
  },
  {
    itemId: "d24", order: 24, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A book costs ₹475. How much do 4 such books cost?",
    options: [
        { text: "₹1,900", correct: true, feedback: "475 × 4 = 1,900." },
        { text: "₹1,800", correct: false, feedback: "You estimated 450 × 4 = 1,800 instead of calculating exactly." },
        { text: "₹479", correct: false, feedback: "You added 4 instead of multiplying." },
        { text: "₹475", correct: false, feedback: "You didn't perform any operation." }
      ],
    backward: "Total cost = price per item × number of items.",
    forward: "Multiplication word problems are used in shopping, area calculations, and many real-life situations."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Subtract: 3,00,000 - 1,45,678",
    options: [
        { text: "1,54,322", correct: true, feedback: "3,00,000 - 1,45,678 = 1,54,322." },
        { text: "1,54,422", correct: false, feedback: "Borrowing error in the hundreds." },
        { text: "1,55,322", correct: false, feedback: "Thousands column off by 1." },
        { text: "1,44,322", correct: false, feedback: "Incorrect borrowing across multiple zeros." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 625 × 34",
    options: [
        { text: "21,250", correct: true, feedback: "625 × 30 = 18,750; 625 × 4 = 2,500; sum = 21,250." },
        { text: "21,200", correct: false, feedback: "You only multiplied by 30 and forgot the ×4." },
        { text: "21,150", correct: false, feedback: "Error in the partial product." },
        { text: "18,750", correct: false, feedback: "Only multiplied by 30." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 7,176 ÷ 26",
    options: [
        { text: "276", correct: true, feedback: "26 × 200 = 5,200; remainder 1,976; 26 × 76 = 1,976. Quotient 276." },
        { text: "266", correct: false, feedback: "The tens digit is wrong." },
        { text: "276 R 0", correct: false, feedback: "The remainder is 0; answer is just 276." },
        { text: "286", correct: false, feedback: "Too high." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "72 × 10,000 = ?",
    options: [
        { text: "7,20,000", correct: true, feedback: "72 × 10,000 = 7,20,000 (four zeros appended)." },
        { text: "72,000", correct: false, feedback: "That's × 1,000." },
        { text: "7,200", correct: false, feedback: "That's × 100." },
        { text: "72,00,000", correct: false, feedback: "Too many zeros." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the product by rounding to the nearest 100 and 10: 498 × 21",
    options: [
        { text: "500 × 20 = 10,000", correct: true, feedback: "498 → 500; 21 → 20. 500 × 20 = 10,000." },
        { text: "500 × 30 = 15,000", correct: false, feedback: "21 rounds down to 20, not up to 30." },
        { text: "400 × 20 = 8,000", correct: false, feedback: "498 rounds up to 500, not down to 400." },
        { text: "498 × 21 = 10,458", correct: false, feedback: "That's the exact product." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A train has 12 coaches, each with 72 seats. How many seats in total?",
    options: [
        { text: "864", correct: true, feedback: "12 × 72 = 864 seats." },
        { text: "84", correct: false, feedback: "You added instead of multiplied." },
        { text: "800", correct: false, feedback: "That's an estimate, not exact." },
        { text: "8640", correct: false, feedback: "You added an extra zero." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Add: 2,30,000 + 1,85,000 + 45,000",
    options: [
        { text: "4,60,000", correct: true, feedback: "2,30,000 + 1,85,000 = 4,15,000; + 45,000 = 4,60,000." },
        { text: "4,50,000", correct: false, feedback: "You forgot to carry in the thousands." },
        { text: "4,70,000", correct: false, feedback: "Too high." },
        { text: "4,55,000", correct: false, feedback: "Off by 5,000." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 309 × 42",
    options: [
        { text: "12,978", correct: true, feedback: "309 × 40 = 12,360; 309 × 2 = 618; sum = 12,978." },
        { text: "12,878", correct: false, feedback: "Error in adding partial products." },
        { text: "12,360", correct: false, feedback: "Only multiplied by 40." },
        { text: "12,000", correct: false, feedback: "Estimate only." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide: 8,100 ÷ 36",
    options: [
        { text: "225", correct: true, feedback: "36 × 200 = 7,200; remainder 900; 36 × 25 = 900. Quotient 225." },
        { text: "125", correct: false, feedback: "Missing a hundred in the quotient." },
        { text: "215", correct: false, feedback: "The tens digit is off." },
        { text: "225 R 0", correct: false, feedback: "Remainder is 0." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "9,300 ÷ 100 = ?",
    options: [
        { text: "93", correct: true, feedback: "Dividing by 100 removes two zeros: 9,300 → 93." },
        { text: "930", correct: false, feedback: "That's dividing by 10." },
        { text: "9.3", correct: false, feedback: "We are working with whole numbers." },
        { text: "9,300", correct: false, feedback: "No operation performed." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the difference by rounding to the nearest 100: 7,654 - 2,345",
    options: [
        { text: "7,700 - 2,300 = 5,400", correct: true, feedback: "7,654 → 7,700; 2,345 → 2,300. Difference ≈ 5,400." },
        { text: "7,600 - 2,300 = 5,300", correct: false, feedback: "7,654 rounds up to 7,700 (tens digit 5)." },
        { text: "7,000 - 2,000 = 5,000", correct: false, feedback: "That's rounding to the nearest 1,000." },
        { text: "7,654 - 2,345 = 5,309", correct: false, feedback: "Exact difference." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A farmer harvested 2,345 apples on Monday and 1,678 on Tuesday. How many apples were harvested in total?",
    options: [
        { text: "4,023", correct: true, feedback: "2,345 + 1,678 = 4,023." },
        { text: "667", correct: false, feedback: "You subtracted instead of added." },
        { text: "4,000", correct: false, feedback: "Estimate only." },
        { text: "4,123", correct: false, feedback: "Addition error." }
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
    title: "Operations on Whole Numbers — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Addition, subtraction, multiplication, division, powers of 10, estimation, and one-step word problems.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Addition & Subtraction: align digits by place value, carry/borrow carefully across zeros.<br>" +
      "&bull; Multiplication: break into partial products and sum; watch for place-value shifts.<br>" +
      "&bull; Division: guess the quotient digit, multiply, subtract, bring down.<br>" +
      "&bull; ×/÷ by 10, 100, 1000: move digits left (×) or right (÷) without a decimal point.<br>" +
      "&bull; Estimation: round numbers first, then operate — check if your answer is reasonable.<br>" +
      "&bull; Word problems: underline the numbers and the key word (total, left, each, etc.) to choose the right operation.<br>",
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

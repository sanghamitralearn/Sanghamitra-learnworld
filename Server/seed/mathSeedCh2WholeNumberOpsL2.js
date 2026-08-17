// seed/mathSeedCh2WholeNumberOpsL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 2
// (Operations on Whole Numbers), Level 2 — converted from the standalone
// HTML file ch-2-whole-number-ops-2.html.
//
// Run with: node seed/mathSeedCh2WholeNumberOpsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-2-whole-number-ops";
const CHAPTER_NAME = "Operations on Whole Numbers";
const LEVEL = 2;

const CLUSTER_NAMES = {
  ADDSUB: "Addition & Subtraction",
  MULT: "Multiplication",
  DIV: "Division",
  POW10: "× and ÷ by 10, 100, 1000",
  EST: "Estimation",
  WORD: "Two-step Word Problems"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the missing digit: 3,__5,678 + 2,34,567 = 6,20,245",
    options: [
        { text: "8", correct: true, feedback: "3,85,678 + 2,34,567 = 6,20,245. The missing ten-thousands digit is 8 (with a carry from the thousands)." },
        { text: "7", correct: false, feedback: "You forgot to include the carry from the thousands column." },
        { text: "9", correct: false, feedback: "You added a carry where there wasn't one, making the sum too large." },
        { text: "6", correct: false, feedback: "The hundreds column carry wasn't accounted for correctly." }
      ],
    retryHint: "Add the two known numbers as if the blank were 0 first, then see what the missing digit plus any carry must be to reach the sum."
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Calculate (234 × 25) + 500",
    options: [
        { text: "6,350", correct: true, feedback: "234 × 25 = 5,850; + 500 = 6,350." },
        { text: "5,850", correct: false, feedback: "You forgot to add the 500 at the end." },
        { text: "6,850", correct: false, feedback: "You added 1,000 instead of 500." },
        { text: "6,300", correct: false, feedback: "The multiplication was incorrect; check 234 × 25." }
      ],
    retryHint: "First multiply 234 by 25 (which is 234 × 100 ÷ 4), then add 500 to that result."
  },
  {
    itemId: "w3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 2,345 by 12. Then add the remainder to the quotient. What do you get?",
    options: [
        { text: "200", correct: true, feedback: "2,345 ÷ 12 = 195 R 5. Quotient 195 + remainder 5 = 200." },
        { text: "195", correct: false, feedback: "That's only the quotient. Remember to add the remainder." },
        { text: "5", correct: false, feedback: "That's only the remainder, not the sum." },
        { text: "190", correct: false, feedback: "Division error: 12 × 195 = 2,340, remainder 5." }
      ],
    retryHint: "Do the long division carefully. The remainder must be less than the divisor. Then add quotient and remainder."
  },
  {
    itemId: "w4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "A factory packs pencils in boxes of 100. Then 10 boxes go into a carton. How many pencils are in 5 cartons?",
    options: [
        { text: "5,000", correct: true, feedback: "Pencils per carton = 100 × 10 = 1,000. 5 cartons = 5 × 1,000 = 5,000." },
        { text: "500", correct: false, feedback: "You forgot to multiply by 10 boxes per carton." },
        { text: "50,000", correct: false, feedback: "You multiplied by an extra 10 somewhere." },
        { text: "1,000", correct: false, feedback: "That's the number in one carton, not five." }
      ],
    retryHint: "Step 1: pencils in one carton = 100 × 10. Step 2: multiply that by the number of cartons."
  },
  {
    itemId: "w5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 4,789 - 2,123 by rounding each number to the nearest 100.",
    options: [
        { text: "4,800 - 2,100 = 2,700", correct: true, feedback: "4,789 → 4,800; 2,123 → 2,100. Difference ≈ 2,700." },
        { text: "4,800 - 2,200 = 2,600", correct: false, feedback: "2,123 rounds down to 2,100, not up to 2,200 (tens digit 2)." },
        { text: "4,789 - 2,123 = 2,666", correct: false, feedback: "That's the exact difference, not an estimate." },
        { text: "5,000 - 2,000 = 3,000", correct: false, feedback: "That's rounding to the nearest 1,000, not 100." }
      ],
    retryHint: "Look at the tens digit to decide whether to round the hundreds up or down."
  },
  {
    itemId: "w6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A bookshop had 5,000 pencils. They sold 35 boxes with 12 pencils each. How many pencils remain?",
    options: [
        { text: "4,580", correct: true, feedback: "Pencils sold = 35 × 12 = 420. Remaining = 5,000 - 420 = 4,580." },
        { text: "4,650", correct: false, feedback: "You miscalculated 35 × 12 (it's 420, not 350)." },
        { text: "5,420", correct: false, feedback: "You added instead of subtracted." },
        { text: "4,600", correct: false, feedback: "That's an estimate, not the exact answer." }
      ],
    retryHint: "First find the total number of pencils sold, then subtract from the starting amount."
  },
  {
    itemId: "w7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of two numbers is 8,00,000. One number is 3,45,678. What is the other?",
    options: [
        { text: "4,54,322", correct: true, feedback: "8,00,000 - 3,45,678 = 4,54,322." },
        { text: "4,55,322", correct: false, feedback: "You made a borrowing error across the zeros in the thousands place." },
        { text: "4,44,322", correct: false, feedback: "Off by 10,000; check the ten-thousands column." },
        { text: "5,54,322", correct: false, feedback: "You added the numbers instead of subtracting." }
      ],
    retryHint: "To find the missing addend, subtract the known number from the total. Be careful with zeros."
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply 567 by 34, then subtract 2,000.",
    options: [
        { text: "17,278", correct: true, feedback: "567 × 34 = 19,278; - 2,000 = 17,278." },
        { text: "19,278", correct: false, feedback: "You forgot to subtract the 2,000." },
        { text: "17,000", correct: false, feedback: "That's just an estimate." },
        { text: "17,378", correct: false, feedback: "You subtracted 1,900 instead of 2,000." }
      ],
    retryHint: "First compute 567 × 34 using partial products, then subtract 2,000 from the product."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the missing digit: 4,__5,678 + 2,34,567 = 6,80,245",
    options: [
        { text: "4", correct: true, feedback: "Adding the thousands column gives 9, plus a carry makes 10? Let's check: units: 8+7=15 (carry 1); tens: 7+6+1=14 (carry 1); hundreds: 6+5+1=12 (carry 1); thousands: 5+4+1=10 (carry 1); ten-thousands: ? + 3 + 1 = 8 → ? = 4. The missing digit is 4." },
        { text: "5", correct: false, feedback: "You forgot the carry from the thousands column." },
        { text: "3", correct: false, feedback: "You underestimated the carry from the hundreds." },
        { text: "2", correct: false, feedback: "You missed the carry from the thousands and also miscalculated the hundreds." }
      ],
    backward: "Work column by column from right to left, tracking carries carefully.",
    forward: "Missing-digit puzzles appear in Olympiads and build mental arithmetic."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 345 × 267",
    options: [
        { text: "92,115", correct: true, feedback: "345 × 200 = 69,000; × 60 = 20,700; × 7 = 2,415; sum = 92,115." },
        { text: "92,015", correct: false, feedback: "You forgot to carry when adding the partial products in the hundreds." },
        { text: "91,115", correct: false, feedback: "The thousands place is off by 1,000; check the partial product for ×60." },
        { text: "92,000", correct: false, feedback: "That's an estimate, not the exact product." }
      ],
    backward: "Break into three partial products (×200, ×60, ×7) and align correctly.",
    forward: "Long multiplication is the foundation for algebra and area calculations."
  },
  {
    itemId: "d3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 5,432 by 29. Then add the remainder to the quotient.",
    options: [
        { text: "196", correct: true, feedback: "5,432 ÷ 29 = 187 R 9. 187 + 9 = 196." },
        { text: "187", correct: false, feedback: "That's only the quotient. Remember to add the remainder." },
        { text: "9", correct: false, feedback: "That's only the remainder." },
        { text: "205", correct: false, feedback: "You added incorrectly or miscalculated the division." }
      ],
    backward: "Use long division; the remainder must be less than 29. Then add.",
    forward: "Working with remainders prepares you for fractions and modular arithmetic."
  },
  {
    itemId: "d4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many tens are there in 45 thousands?",
    options: [
        { text: "4,500", correct: true, feedback: "45 thousands = 45,000. 45,000 ÷ 10 = 4,500 tens." },
        { text: "450", correct: false, feedback: "You divided by 100 instead of 10." },
        { text: "45,000", correct: false, feedback: "That's the number of ones, not tens." },
        { text: "4.5", correct: false, feedback: "We are working with whole numbers; the answer is 4,500." }
      ],
    backward: "Divide the total number by 10 to count how many tens.",
    forward: "This thinking is used when converting between metric units like cm and mm."
  },
  {
    itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the product of 612 and 389 by rounding each to the nearest 100.",
    options: [
        { text: "600 × 400 = 2,40,000", correct: true, feedback: "612 → 600; 389 → 400. 600 × 400 = 2,40,000." },
        { text: "600 × 300 = 1,80,000", correct: false, feedback: "389 rounds up to 400, not down to 300 (tens digit 8 ≥ 5)." },
        { text: "700 × 400 = 2,80,000", correct: false, feedback: "612 rounds down to 600, not up to 700 (tens digit 1)." },
        { text: "610 × 390 = 2,37,900", correct: false, feedback: "That's rounding to the nearest 10, not 100." }
      ],
    backward: "Round each factor to the specified place value, then multiply.",
    forward: "Estimation helps you quickly check if an exact answer is plausible."
  },
  {
    itemId: "d6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A library has 2,400 books arranged equally on 15 shelves. The librarian removes 120 books, taking the same number from each shelf. How many books are left on each shelf?",
    options: [
        { text: "152", correct: true, feedback: "New total = 2,400 - 120 = 2,280. 2,280 ÷ 15 = 152." },
        { text: "160", correct: false, feedback: "You divided the original 2,400 by 15, ignoring the removal." },
        { text: "8", correct: false, feedback: "You divided 120 by 15 but forgot to subtract from the original amount per shelf." },
        { text: "240", correct: false, feedback: "This is not a logical result of the steps." }
      ],
    backward: "First find the new total after removal, then divide equally.",
    forward: "Two-step problems are common in everyday planning and budgeting."
  },
  {
    itemId: "d7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of three numbers is 15,00,000. Two numbers are 4,56,789 and 5,43,210. Find the third number.",
    options: [
        { text: "5,00,001", correct: true, feedback: "Sum of known = 4,56,789 + 5,43,210 = 9,99,999. Third = 15,00,000 - 9,99,999 = 5,00,001." },
        { text: "5,00,000", correct: false, feedback: "Off by 1; 9,99,999 + 5,00,000 = 14,99,999, not 15,00,000." },
        { text: "4,99,999", correct: false, feedback: "You subtracted incorrectly." },
        { text: "5,01,001", correct: false, feedback: "The addition of the two known numbers gives 9,99,999, so the third is 5,00,001." }
      ],
    backward: "Add the known numbers, then subtract from the total.",
    forward: "This is the foundation of solving simple equations."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 789 × 456",
    options: [
        { text: "3,59,784", correct: true, feedback: "789 × 400 = 3,15,600; × 50 = 39,450; × 6 = 4,734; sum = 3,59,784." },
        { text: "3,59,684", correct: false, feedback: "You made an error in the last partial product (789 × 6 = 4,734, not 4,634)." },
        { text: "3,60,000", correct: false, feedback: "That's an estimate." },
        { text: "3,58,784", correct: false, feedback: "The tens partial product is off." }
      ],
    backward: "Use three partial products and align them by place value.",
    forward: "Multiplying large numbers is essential in science and commerce."
  },
  {
    itemId: "d9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "When a number is divided by 32, the quotient is 105 and the remainder is 17. Find the original number.",
    options: [
        { text: "3,377", correct: true, feedback: "Number = (32 × 105) + 17 = 3,360 + 17 = 3,377." },
        { text: "3,360", correct: false, feedback: "You forgot to add the remainder." },
        { text: "3,393", correct: false, feedback: "You miscalculated the multiplication or addition." },
        { text: "3,500", correct: false, feedback: "That's just a rough estimate." }
      ],
    backward: "Multiply the divisor by the quotient, then add the remainder.",
    forward: "This uses the inverse relationship of division and multiplication."
  },
  {
    itemId: "d10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many hundreds are there in 1 lakh?",
    options: [
        { text: "1,000", correct: true, feedback: "1 lakh = 1,00,000. 1,00,000 ÷ 100 = 1,000." },
        { text: "100", correct: false, feedback: "You divided by 1,000 instead of 100." },
        { text: "10,000", correct: false, feedback: "You multiplied by 10 instead of dividing." },
        { text: "10", correct: false, feedback: "You divided by 10,000." }
      ],
    backward: "1 lakh = 100,000; divide by 100 to count hundreds.",
    forward: "Converting between Indian place values and smaller units is a practical skill."
  },
  {
    itemId: "d11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 9,876 ÷ 48 by rounding 9,876 to the nearest 1,000 and 48 to the nearest 10.",
    options: [
        { text: "10,000 ÷ 50 = 200", correct: true, feedback: "9,876 → 10,000; 48 → 50. 10,000 ÷ 50 = 200." },
        { text: "10,000 ÷ 40 = 250", correct: false, feedback: "48 rounds up to 50, not down to 40." },
        { text: "9,000 ÷ 50 = 180", correct: false, feedback: "9,876 rounds up to 10,000, not down to 9,000 (hundreds digit 8 ≥ 5)." },
        { text: "9,876 ÷ 48 = 205 (approx)", correct: false, feedback: "That's the actual quotient, not an estimate using the requested rounding." }
      ],
    backward: "Round both numbers as directed, then divide.",
    forward: "Estimating quotients helps check if your long division answer is reasonable."
  },
  {
    itemId: "d12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "Ravi earns ₹350 per day. He works for 24 days in a month and spends ₹4,500 on rent. How much does he save that month?",
    options: [
        { text: "₹3,900", correct: true, feedback: "Total earnings = 350 × 24 = 8,400. Savings = 8,400 - 4,500 = 3,900." },
        { text: "₹8,400", correct: false, feedback: "That's the total earnings before rent." },
        { text: "₹4,100", correct: false, feedback: "You made a calculation error in multiplication or subtraction." },
        { text: "₹3,500", correct: false, feedback: "Off by 400; check 350 × 24." }
      ],
    backward: "Calculate total earnings first, then subtract the expense.",
    forward: "This is exactly how monthly budgeting works in real life."
  },
  {
    itemId: "d13", order: 13, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Calculate (2,34,567 + 4,56,789) - (1,23,456 + 2,34,567).",
    options: [
        { text: "3,33,333", correct: true, feedback: "First sum = 6,91,356; second sum = 3,58,023. Difference = 3,33,333." },
        { text: "3,33,233", correct: false, feedback: "Subtraction error in the thousands column." },
        { text: "3,33,433", correct: false, feedback: "Off by 100; check the hundreds subtraction." },
        { text: "3,32,333", correct: false, feedback: "Error in the first or second sum." }
      ],
    backward: "Compute each sum inside the brackets first, then subtract.",
    forward: "Evaluating expressions with brackets is a key part of BODMAS."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply the largest 3-digit number by the smallest 2-digit number.",
    options: [
        { text: "9,990", correct: true, feedback: "Largest 3-digit = 999; smallest 2-digit = 10. 999 × 10 = 9,990." },
        { text: "9,999", correct: false, feedback: "You added instead of multiplying." },
        { text: "99,900", correct: false, feedback: "That's 999 × 100, not 10." },
        { text: "9,000", correct: false, feedback: "That's an estimate; 1,000 × 9 = 9,000, not exact." }
      ],
    backward: "Identify the numbers first: 999 and 10. Multiply by 10 by appending a zero.",
    forward: "Working with largest/smallest numbers helps build number sense."
  },
  {
    itemId: "d15", order: 15, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 8,765 by 23. How much less is the remainder than the divisor?",
    options: [
        { text: "21", correct: true, feedback: "8,765 ÷ 23 = 381 R 2. Divisor (23) - remainder (2) = 21." },
        { text: "2", correct: false, feedback: "That's the remainder, not the difference." },
        { text: "23", correct: false, feedback: "That's the divisor itself." },
        { text: "25", correct: false, feedback: "You added instead of subtracted." }
      ],
    backward: "Do the division, then subtract the remainder from the divisor.",
    forward: "Remainder analysis is important in modular arithmetic."
  },
  {
    itemId: "d16", order: 16, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "A box contains 10 packs of pens. Each pack has 10 pens. How many pens are there in 100 boxes?",
    options: [
        { text: "10,000", correct: true, feedback: "Pens per box = 10 × 10 = 100. 100 boxes = 100 × 100 = 10,000." },
        { text: "1,000", correct: false, feedback: "You missed multiplying by 10 packs per box." },
        { text: "100,000", correct: false, feedback: "You multiplied an extra 10 somewhere." },
        { text: "10,100", correct: false, feedback: "You added instead of multiplying." }
      ],
    backward: "Multiply items per pack × packs per box × number of boxes.",
    forward: "Such scaling problems are common in warehouses and manufacturing."
  },
  {
    itemId: "d17", order: 17, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (2,345 + 6,789) × 2 by rounding each number inside the brackets to the nearest 1,000.",
    options: [
        { text: "18,000", correct: true, feedback: "2,345 → 2,000; 6,789 → 7,000. Sum = 9,000. × 2 = 18,000." },
        { text: "20,000", correct: false, feedback: "You rounded both up: 3,000 + 7,000 = 10,000; ×2 = 20,000." },
        { text: "16,000", correct: false, feedback: "You rounded both down: 2,000 + 6,000 = 8,000; ×2 = 16,000." },
        { text: "18,268", correct: false, feedback: "That's the exact value, not an estimate." }
      ],
    backward: "Round each number inside the brackets first, then add, then multiply.",
    forward: "Estimating multi-step expressions is a valuable checking strategy."
  },
  {
    itemId: "d18", order: 18, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A school ordered 45 boxes of pencils (144 pencils each) and 30 boxes of erasers (60 erasers each). How many items total?",
    options: [
        { text: "8,280", correct: true, feedback: "Pencils: 45 × 144 = 6,480. Erasers: 30 × 60 = 1,800. Total = 8,280." },
        { text: "7,080", correct: false, feedback: "You miscalculated 30 × 60 as 600 instead of 1,800." },
        { text: "7,200", correct: false, feedback: "You only counted the pencils (45×144 → 7,200?) — that's not correct." },
        { text: "9,000", correct: false, feedback: "That's an estimate." }
      ],
    backward: "Calculate the total for each item separately, then add.",
    forward: "Large orders and inventories are handled this way."
  },
  {
    itemId: "d19", order: 19, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the missing digit: 9,__5,432 - 3,45,678 = 5,79,754",
    options: [
        { text: "2", correct: true, feedback: "Add the subtrahend and difference: 3,45,678 + 5,79,754 = 9,25,432. So the missing ten-thousands digit is 2." },
        { text: "3", correct: false, feedback: "You made a carry error in the thousands column." },
        { text: "1", correct: false, feedback: "The hundreds column carry was not added correctly." },
        { text: "0", correct: false, feedback: "The sum of the known parts is larger; the missing digit cannot be 0." }
      ],
    backward: "Add the subtrahend and the difference to reconstruct the minuend.",
    forward: "Missing-digit problems strengthen logical reasoning."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 405 × 306",
    options: [
        { text: "1,23,930", correct: true, feedback: "405 × 300 = 1,21,500; 405 × 6 = 2,430; sum = 1,23,930." },
        { text: "1,23,000", correct: false, feedback: "You ignored the ×6 part entirely." },
        { text: "1,24,000", correct: false, feedback: "Estimate only; exact product is 1,23,930." },
        { text: "1,22,930", correct: false, feedback: "The partial product for ×300 is off by 1,000." }
      ],
    backward: "Watch the zeros — 405 × 6 = 2,430; align carefully when adding.",
    forward: "Multiplication with zeros appears in calculating areas and volumes."
  },
  {
    itemId: "d21", order: 21, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number divided by 45 gives quotient 67 and remainder 29. Find the number, then subtract 1,000.",
    options: [
        { text: "2,044", correct: true, feedback: "Number = 45 × 67 + 29 = 3,015 + 29 = 3,044. Then 3,044 - 1,000 = 2,044." },
        { text: "3,044", correct: false, feedback: "You forgot to subtract 1,000." },
        { text: "3,015", correct: false, feedback: "That's just 45 × 67; you forgot the remainder." },
        { text: "2,000", correct: false, feedback: "That's a rough estimate." }
      ],
    backward: "Reconstruct the dividend first, then perform the second operation.",
    forward: "This kind of multi-step calculation is used in reverse-engineering problems."
  },
  {
    itemId: "d22", order: 22, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Convert 5 km into centimetres. (1 km = 1,000 m; 1 m = 100 cm)",
    options: [
        { text: "5,00,000 cm", correct: true, feedback: "5 km = 5,000 m; 5,000 m = 5,00,000 cm (multiply by 100)." },
        { text: "50,000 cm", correct: false, feedback: "You forgot to multiply by 100 to convert m to cm." },
        { text: "5,000,000 cm", correct: false, feedback: "You added an extra zero." },
        { text: "5,00,00,000 cm", correct: false, feedback: "Far too large." }
      ],
    backward: "First convert km to m, then m to cm.",
    forward: "Metric conversions are a constant in science and daily life."
  },
  {
    itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 4,567 × 32 by rounding 4,567 to the nearest 1,000 and 32 to the nearest 10.",
    options: [
        { text: "5,000 × 30 = 1,50,000", correct: true, feedback: "4,567 → 5,000; 32 → 30. 5,000 × 30 = 1,50,000." },
        { text: "5,000 × 32 = 1,60,000", correct: false, feedback: "You forgot to round 32 to 30." },
        { text: "4,000 × 30 = 1,20,000", correct: false, feedback: "4,567 rounds up to 5,000, not down to 4,000 (hundreds digit 5)." },
        { text: "4,567 × 32 = 1,46,144", correct: false, feedback: "That's the exact product, not an estimate." }
      ],
    backward: "Round each factor to a convenient place value, then multiply.",
    forward: "Rapid estimation is a key skill in multiple-choice exams."
  },
  {
    itemId: "d24", order: 24, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A train has 18 coaches, each with 72 seats. On a journey, 895 seats were empty. How many seats were occupied?",
    options: [
        { text: "401", correct: true, feedback: "Total seats = 18 × 72 = 1,296. Occupied = 1,296 - 895 = 401." },
        { text: "1,296", correct: false, feedback: "That's the total capacity, not the occupied seats." },
        { text: "1,191", correct: false, feedback: "You miscalculated the subtraction." },
        { text: "391", correct: false, feedback: "Off by 10; check 1,296 - 895." }
      ],
    backward: "Find the total capacity, then subtract the empty seats.",
    forward: "Transport problems often involve capacity and occupancy."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "Find the missing digit: 8,__3,456 - 2,34,567 = 5,98,889",
    options: [
        { text: "3", correct: true, feedback: "5,98,889 + 2,34,567 = 8,33,456. The missing ten-thousands digit is 3." },
        { text: "4", correct: false, feedback: "You made a carry error in the thousands column." },
        { text: "1", correct: false, feedback: "You miscalculated the addition." },
        { text: "0", correct: false, feedback: "The sum is larger; 0 cannot be correct." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 678 × 234",
    options: [
        { text: "1,58,652", correct: true, feedback: "678 × 200 = 1,35,600; ×30 = 20,340; ×4 = 2,712; sum = 1,58,652." },
        { text: "1,58,552", correct: false, feedback: "One of the partial products is off by 100." },
        { text: "1,57,652", correct: false, feedback: "The thousands place is incorrect." },
        { text: "1,59,000", correct: false, feedback: "Estimate only." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Divide 7,890 by 34. Then add the quotient and the remainder.",
    options: [
        { text: "234", correct: true, feedback: "7,890 ÷ 34 = 232 R 2. 232 + 2 = 234." },
        { text: "232", correct: false, feedback: "Quotient only." },
        { text: "2", correct: false, feedback: "Remainder only." },
        { text: "230", correct: false, feedback: "Division error." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many thousands are there in 1 crore?",
    options: [
        { text: "10,000", correct: true, feedback: "1 crore = 1,00,00,000. Divide by 1,000 → 10,000." },
        { text: "1,000", correct: false, feedback: "You divided by 10,000." },
        { text: "100", correct: false, feedback: "Divided by 1,00,000." },
        { text: "1,00,000", correct: false, feedback: "Multiplied by 10." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (4,123 + 5,879) × 3 by rounding each number inside to the nearest 100.",
    options: [
        { text: "30,000", correct: true, feedback: "4,123 → 4,100; 5,879 → 5,900. Sum = 10,000. × 3 = 30,000." },
        { text: "33,000", correct: false, feedback: "That's close to the exact value, not the estimate using rounding." },
        { text: "28,000", correct: false, feedback: "Rounded both down too much." },
        { text: "27,000", correct: false, feedback: "Incorrect rounding." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A shopkeeper bought 25 dozen eggs. 8 eggs were broken. How many good eggs are left?",
    options: [
        { text: "292", correct: true, feedback: "25 dozen = 25 × 12 = 300 eggs. 300 - 8 = 292." },
        { text: "300", correct: false, feedback: "That's the total before removing broken ones." },
        { text: "242", correct: false, feedback: "You subtracted incorrectly." },
        { text: "192", correct: false, feedback: "You multiplied 25 × 8 = 200, then subtracted from 300? No, that's wrong." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of three numbers is 20,00,000. Two numbers are 7,89,012 and 6,54,321. Find the third.",
    options: [
        { text: "5,56,667", correct: true, feedback: "Sum of known = 7,89,012 + 6,54,321 = 14,43,333. Third = 20,00,000 - 14,43,333 = 5,56,667." },
        { text: "5,56,567", correct: false, feedback: "Off by 100; check the subtraction." },
        { text: "5,55,667", correct: false, feedback: "Off by 1,000." },
        { text: "6,56,667", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply: 320 × 150",
    options: [
        { text: "48,000", correct: true, feedback: "32 × 15 = 480; attach three zeros (one from 320, two from 150?) Actually 320 × 150 = 32 × 15 × 100 = 480 × 100 = 48,000. Alternatively, 320 × 100 = 32,000 and ×50 = 16,000; sum = 48,000." },
        { text: "4,800", correct: false, feedback: "You lost a zero." },
        { text: "480,000", correct: false, feedback: "Too many zeros." },
        { text: "4,80,000", correct: false, feedback: "That's 480,000, still too large." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number divided by 27 gives quotient 83 and remainder 14. Find the number, then subtract 500.",
    options: [
        { text: "1,755", correct: true, feedback: "Number = 27 × 83 + 14 = 2,241 + 14 = 2,255. 2,255 - 500 = 1,755." },
        { text: "2,255", correct: false, feedback: "Forgot to subtract 500." },
        { text: "2,241", correct: false, feedback: "Forgot the remainder." },
        { text: "1,800", correct: false, feedback: "Estimate only." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many tens are in 2.5 lakh?",
    options: [
        { text: "25,000", correct: true, feedback: "2.5 lakh = 2,50,000. 2,50,000 ÷ 10 = 25,000." },
        { text: "2,500", correct: false, feedback: "Divided by 100." },
        { text: "250,000", correct: false, feedback: "That's the number of ones." },
        { text: "250", correct: false, feedback: "Divided by 1,000." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 7,654 ÷ 38 by rounding 7,654 to nearest 1,000 and 38 to nearest 10.",
    options: [
        { text: "8,000 ÷ 40 = 200", correct: true, feedback: "7,654 → 8,000; 38 → 40. 8,000 ÷ 40 = 200." },
        { text: "7,000 ÷ 40 = 175", correct: false, feedback: "7,654 rounds up to 8,000, not down to 7,000." },
        { text: "8,000 ÷ 30 = 266", correct: false, feedback: "38 rounds up to 40, not down to 30." },
        { text: "7,654 ÷ 38 ≈ 201", correct: false, feedback: "That's the actual, not the rounded estimate." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A factory makes 450 toys per day. In one week (7 days), 120 toys were defective. How many good toys were produced?",
    options: [
        { text: "3,030", correct: true, feedback: "Total = 450 × 7 = 3,150. Good = 3,150 - 120 = 3,030." },
        { text: "3,150", correct: false, feedback: "That's total toys, not taking out defects." },
        { text: "2,900", correct: false, feedback: "Miscalculation." },
        { text: "3,270", correct: false, feedback: "You added 120 instead of subtracting." }
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
    title: "Operations on Whole Numbers — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Missing-digit puzzles, multi-step multiplication and division, two-step word problems, and multi-step estimation.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review – Multi-Step Operations</strong><br>' +
      "&bull; Addition & Subtraction: solve missing-digit puzzles by working column-by-column and tracking carries.<br>" +
      "&bull; Multiplication: break numbers into partial products, watch for place-value alignment, and then add.<br>" +
      "&bull; Division: find quotient and remainder, then use them in a follow-up step (e.g., sum or difference).<br>" +
      "&bull; ×/÷ by 10, 100, 1000: use these to convert between units like hundreds, thousands, lakhs, and crores.<br>" +
      "&bull; Estimation: round first, then operate — even when the expression has two steps.<br>" +
      "&bull; Word problems: read carefully — you often need to multiply first, then add or subtract.<br>",
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

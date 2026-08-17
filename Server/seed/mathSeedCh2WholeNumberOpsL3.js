// seed/mathSeedCh2WholeNumberOpsL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 2
// (Operations on Whole Numbers), Level 3 — converted from the standalone
// HTML file ch-2-whole-number-ops-3.html.
//
// Run with: node seed/mathSeedCh2WholeNumberOpsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-2-whole-number-ops";
const CHAPTER_NAME = "Operations on Whole Numbers";
const LEVEL = 3;

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
    question: "The sum of two numbers is 9,87,654 and their difference is 1,23,456. What is the smaller number?",
    options: [
        { text: "4,32,099", correct: true, feedback: "Larger = (sum + diff)/2 = (9,87,654+1,23,456)/2 = 5,55,555; smaller = sum - larger = 4,32,099." },
        { text: "5,55,555", correct: false, feedback: "That's the larger number." },
        { text: "4,32,000", correct: false, feedback: "Approximation; exact value is needed." },
        { text: "5,55,000", correct: false, feedback: "Rough estimate, not exact." }
      ],
    retryHint: "Find the larger number first: (sum + difference) ÷ 2."
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Multiply 999 by 99, then divide the result by 9. What is the final answer?",
    options: [
        { text: "10,989", correct: true, feedback: "999 × 99 = 98,901; ÷9 = 10,989." },
        { text: "1,09,989", correct: false, feedback: "You forgot to divide by 9." },
        { text: "9,999", correct: false, feedback: "That's 999 × 10, not 99." },
        { text: "11,000", correct: false, feedback: "Estimate only." }
      ],
    retryHint: "999 × 99 = 999 × (100 - 1) = 99,900 - 999 = 98,901; then divide by 9."
  },
  {
    itemId: "w3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number divided by 37 gives quotient 123 and remainder 29. Multiply that number by 10. What do you get?",
    options: [
        { text: "45,800", correct: true, feedback: "Number = 37×123+29 = 4,551+29 = 4,580; ×10 = 45,800." },
        { text: "4,580", correct: false, feedback: "That's the original number, not multiplied by 10." },
        { text: "4,551", correct: false, feedback: "You forgot to add the remainder." },
        { text: "45,790", correct: false, feedback: "Miscalculation: 37×123 = 4,551, remainder 29, so number = 4,580." }
      ],
    retryHint: "First reconstruct the dividend: divisor × quotient + remainder. Then multiply by 10."
  },
  {
    itemId: "w4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many ₹50 notes make ₹2,50,000?",
    options: [
        { text: "5,000", correct: true, feedback: "2,50,000 ÷ 50 = 5,000 notes." },
        { text: "500", correct: false, feedback: "You divided by 500 instead of 50." },
        { text: "50,000", correct: false, feedback: "You multiplied by 10 instead of dividing." },
        { text: "5,500", correct: false, feedback: "Incorrect calculation." }
      ],
    retryHint: "Divide the total amount by the value of one note."
  },
  {
    itemId: "w5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 498 × 312 by rounding both to the nearest 100. Then find the difference between the exact product and your estimate.",
    options: [
        { text: "5,376", correct: true, feedback: "Estimate: 500×300=1,50,000. Exact: 498×312=1,55,376. Difference = 5,376." },
        { text: "1,50,000", correct: false, feedback: "That's the estimate, not the difference." },
        { text: "1,55,376", correct: false, feedback: "That's the exact product, not the difference." },
        { text: "5,000", correct: false, feedback: "Approximation of the difference, not exact." }
      ],
    retryHint: "Compute the estimate, then compute the exact product, then subtract."
  },
  {
    itemId: "w6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "Rita bought 4 shirts at ₹475 each and 3 trousers at ₹825 each. She gave ₹5,000. How much change did she get?",
    options: [
        { text: "₹625", correct: true, feedback: "4×475=1,900; 3×825=2,475; total=4,375; change=5,000-4,375=625." },
        { text: "₹4,375", correct: false, feedback: "That's the total cost, not the change." },
        { text: "₹5,000", correct: false, feedback: "No change at all would mean nothing was purchased." },
        { text: "₹1,900", correct: false, feedback: "That's only the cost of shirts." }
      ],
    retryHint: "Add the cost of all items, then subtract from the amount paid."
  },
  {
    itemId: "w7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "A 5-digit number has ten-thousands digit 3. Adding 15,000 changes the ten-thousands digit to 5. What is the smallest possible thousands digit of the original number?",
    options: [
        { text: "5", correct: true, feedback: "Adding 15,000 means adding 1 to the ten-thousands and 5 to the thousands. So the thousands digit must have been 5 (or more) to cause a carry into the ten-thousands, giving a net increase of 2 in the ten-thousands (3-5). Thus the smallest thousands digit causing a carry from thousands to ten-thousands when adding 5 is 5." },
        { text: "4", correct: false, feedback: "If thousands = 4, adding 5 gives 9, no carry; ten-thousands would stay 4 (3+1=4), not 5." },
        { text: "0", correct: false, feedback: "Then adding 5 would give 5 in thousands, no carry, ten-thousands would become 4 (3+1)." },
        { text: "9", correct: false, feedback: "That would cause a carry, but it's not the smallest possible." }
      ],
    retryHint: "Think about the carry: 15,000 = 1 ten-thousand + 5 thousands. Adding this will increase the ten-thousands digit by 1, plus an additional carry if thousands + 5 ≥ 10."
  },
  {
    itemId: "w8", order: 8, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 2,345 + 6,789 by rounding each to the nearest 100. Then find the exact sum, and calculate the difference between the exact sum and the estimate.",
    options: [
        { text: "34", correct: true, feedback: "Estimate: 2,300+6,800=9,100. Exact: 9,134. Difference = 34." },
        { text: "9,100", correct: false, feedback: "That's the estimate." },
        { text: "9,134", correct: false, feedback: "That's the exact sum." },
        { text: "66", correct: false, feedback: "You might have rounded incorrectly." }
      ],
    retryHint: "Round each number, add, then compare with the real sum."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "In the addition 2,3A,456 + 4,B6,789 = 6,C7,245, the digits A, B, C are all different. If A is as small as possible, what is C?",
    options: [
        { text: "4", correct: true, feedback: "Units: 6+9=15 (carry 1). Tens: 5+8+1=14 (carry 1). Hundreds: 4+7+1=12 (carry 1). Thousands: A+6+1 = A+7 must give 7 in the sum → A=0 (no carry). Ten-thousands: 3+B+0 = C. Since lakhs sum 2+4=6, no carry. Smallest B distinct from A=0 is 1, giving C=4." },
        { text: "3", correct: false, feedback: "That would require B=0, but A=0 already, so digits not distinct." },
        { text: "5", correct: false, feedback: "If B=2, C=5; but A=0, B=2, C=5 are distinct, but A could be 0 (smallest), B can be 1 (smaller), so C=4 is smaller." },
        { text: "6", correct: false, feedback: "That would mean B=3, C=6, but smaller B possible." }
      ],
    backward: "Work column by column tracking carries; the letters stand for single digits.",
    forward: "Such puzzles build the logical reasoning needed for algebra."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The product of two numbers is 48,600. One number is 24 times the other. What is the larger number?",
    options: [
        { text: "1,080", correct: true, feedback: "Let small = x, large = 24x. Product = 24x² = 48,600 → x² = 2,025 → x = 45, large = 1,080." },
        { text: "45", correct: false, feedback: "That's the smaller number." },
        { text: "2,025", correct: false, feedback: "That's the square of the smaller number, not the larger." },
        { text: "540", correct: false, feedback: "Miscalculation; 48,600 ÷ 24 = 2,025, then square root is 45." }
      ],
    backward: "Divide the product by the ratio to find the square of the smaller number.",
    forward: "This is the foundation of solving equations with squares."
  },
  {
    itemId: "d3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number divided by 28 gives quotient 56 and remainder R. Adding 5 to the number makes it exactly divisible by 28. What is R?",
    options: [
        { text: "23", correct: true, feedback: "Number = 28×56 + R. Adding 5 gives 28×57 = 28×56 + R + 5, so R+5 = 28 → R = 23." },
        { text: "5", correct: false, feedback: "That's the amount added, not the remainder." },
        { text: "28", correct: false, feedback: "The divisor, not the remainder." },
        { text: "33", correct: false, feedback: "R+5=28, not 33." }
      ],
    backward: "Express the number with remainder, then set up the equation for the new number.",
    forward: "This type of reasoning is used in modular arithmetic."
  },
  {
    itemId: "d4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many 25-paise coins make ₹5,000? (1 rupee = 100 paise)",
    options: [
        { text: "20,000", correct: true, feedback: "₹5,000 = 5,00,000 paise. ÷ 25 = 20,000 coins." },
        { text: "2,000", correct: false, feedback: "You divided by 250 instead of 25." },
        { text: "1,25,000", correct: false, feedback: "You multiplied by 25 instead of dividing." },
        { text: "50,000", correct: false, feedback: "That's the number of 10-paise coins, not 25-paise." }
      ],
    backward: "Convert to the same unit (paise), then divide.",
    forward: "Currency and unit conversions are everyday applications of powers of ten."
  },
  {
    itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (4,567 + 8,932) × 3 by rounding each number inside the brackets to the nearest 1,000. Then find the exact value, and calculate the difference between the estimate and the exact.",
    options: [
        { text: "1,503", correct: true, feedback: "Estimate: (5,000+9,000)=14,000; ×3 = 42,000. Exact: 4,567+8,932=13,499; ×3=40,497. Difference = 42,000 - 40,497 = 1,503." },
        { text: "42,000", correct: false, feedback: "That's the estimate." },
        { text: "40,497", correct: false, feedback: "That's the exact value." },
        { text: "1,500", correct: false, feedback: "Approximately correct but not the exact difference." }
      ],
    backward: "Round first, then operate; compare with exact calculation.",
    forward: "Error analysis is critical in science and engineering."
  },
  {
    itemId: "d6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A train starts with 2,450 passengers. At station B, 1,230 get off and 980 get on. At station C, 560 get off and 1,100 get on. How many passengers are now on the train?",
    options: [
        { text: "2,740", correct: true, feedback: "After B: 2,450-1,230+980=2,200. After C: 2,200-560+1,100=2,740." },
        { text: "2,200", correct: false, feedback: "That's only after station B." },
        { text: "3,300", correct: false, feedback: "You added all numbers without considering order." },
        { text: "1,740", correct: false, feedback: "Incorrect addition or subtraction." }
      ],
    backward: "Work step-by-step; each stop involves both subtraction and addition.",
    forward: "Such problems model real inventory and passenger flow."
  },
  {
    itemId: "d7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of four consecutive numbers is 2,346. What is the smallest of these numbers?",
    options: [
        { text: "585", correct: true, feedback: "Let numbers be x, x+1, x+2, x+3. Sum = 4x+6 = 2,346 → x = 585." },
        { text: "586", correct: false, feedback: "That's the second number." },
        { text: "584", correct: false, feedback: "Off by 1." },
        { text: "1,173", correct: false, feedback: "That's half the sum, not the smallest." }
      ],
    backward: "Represent the numbers with a variable; the average is the middle value.",
    forward: "This is a gentle introduction to algebraic sequences."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "A number is multiplied by 15, and then 4,500 is subtracted. The result is 7,800. Find the original number.",
    options: [
        { text: "820", correct: true, feedback: "Work backwards: 7,800 + 4,500 = 12,300; ÷ 15 = 820." },
        { text: "520", correct: false, feedback: "You might have done 7,800-4,500 = 3,300, then ÷15." },
        { text: "12,300", correct: false, feedback: "That's the number before dividing by 15." },
        { text: "8,200", correct: false, feedback: "Incorrect reverse operation." }
      ],
    backward: "Undo each operation in reverse order: add back, then divide.",
    forward: "Solving two-step equations follows this exact logic."
  },
  {
    itemId: "d9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Find a number between 200 and 300 that leaves remainder 2 when divided by 7, and remainder 5 when divided by 9.",
    options: [
        { text: "212", correct: true, feedback: "212 ÷ 7 = 30 R2; 212 ÷ 9 = 23 R5." },
        { text: "205", correct: false, feedback: "205 ÷ 7 = 29 R2; 205 ÷ 9 = 22 R7 (not 5)." },
        { text: "207", correct: false, feedback: "207 ÷ 7 = 29 R4; 207 ÷ 9 = 23 R0." },
        { text: "219", correct: false, feedback: "219 ÷ 7 = 31 R2; 219 ÷ 9 = 24 R3." }
      ],
    backward: "List numbers satisfying one condition, then test the second.",
    forward: "This is the basis of the Chinese Remainder Theorem."
  },
  {
    itemId: "d10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "A pool holds 25,000 litres. A bucket holds 5 litres. How many buckets are needed to empty half the pool?",
    options: [
        { text: "2,500", correct: true, feedback: "Half of 25,000 = 12,500 litres; ÷ 5 = 2,500 buckets." },
        { text: "5,000", correct: false, feedback: "That's for the full pool." },
        { text: "1,250", correct: false, feedback: "You divided by 10 instead of 5." },
        { text: "25,000", correct: false, feedback: "That's the total litres, not buckets." }
      ],
    backward: "First find the volume to empty, then divide by bucket size.",
    forward: "Capacity problems are common in everyday life and industry."
  },
  {
    itemId: "d11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 8,765 ÷ 39 by rounding 8,765 to the nearest 1,000 and 39 to the nearest 10. Then find the exact quotient (ignoring remainder) and calculate the difference between the estimate and the exact quotient.",
    options: [
        { text: "1", correct: true, feedback: "Estimate: 9,000 ÷ 40 = 225. Exact quotient: 8,765 ÷ 39 = 224 (since 39×224=8,736, remainder 29). Difference = 225-224 = 1." },
        { text: "225", correct: false, feedback: "That's the estimate." },
        { text: "224", correct: false, feedback: "That's the exact quotient." },
        { text: "29", correct: false, feedback: "That's the remainder, not the difference." }
      ],
    backward: "Round both numbers, divide, then do the exact division and compare.",
    forward: "Estimation accuracy improves with practice."
  },
  {
    itemId: "d12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "Rita bought 3.5 kg of apples at ₹80 per kg and 2.5 kg of oranges at ₹60 per kg. She gave a ₹500 note. How much change did she get?",
    options: [
        { text: "₹70", correct: true, feedback: "Apples: 3.5×80 = 280; oranges: 2.5×60 = 150; total = 430; change = 500-430 = 70." },
        { text: "₹430", correct: false, feedback: "That's the total cost, not change." },
        { text: "₹500", correct: false, feedback: "No change at all." },
        { text: "₹30", correct: false, feedback: "Miscalculated total." }
      ],
    backward: "Multiply weight by price per kg, then sum and subtract from amount tendered.",
    forward: "Shopping bills often involve mixed decimals."
  },
  {
    itemId: "d13", order: 13, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of the digits of a 3-digit number is 14. The number is 198 less than the number formed by reversing its digits. Find the original number.",
    options: [
        { text: "365", correct: true, feedback: "Let number = 100a+10b+c; reverse = 100c+10b+a. Difference = 99(c-a) = 198 → c-a = 2. Also a+b+c=14. Trying a=3, c=5 gives b=6 → 365." },
        { text: "563", correct: false, feedback: "That's the reversed number." },
        { text: "257", correct: false, feedback: "2+5+7=14, but 752-257=495, not 198." },
        { text: "455", correct: false, feedback: "4+5+5=14, but 554-455=99, not 198." }
      ],
    backward: "Set up equations for the digits using place value.",
    forward: "Digit problems are classic algebraic puzzles."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the product of the largest 2-digit even number and the smallest 3-digit number that is divisible by 7.",
    options: [
        { text: "10,290", correct: true, feedback: "Largest 2-digit even = 98. Smallest 3-digit divisible by 7 = 105. 98 × 105 = 10,290." },
        { text: "10,190", correct: false, feedback: "Miscalculation." },
        { text: "9,800", correct: false, feedback: "98 × 100 = 9,800, not 105." },
        { text: "10,390", correct: false, feedback: "Wrong product." }
      ],
    backward: "Identify the numbers first, then multiply.",
    forward: "Working with multiples and largest/smallest constraints sharpens number sense."
  },
  {
    itemId: "d15", order: 15, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number N divided by 25 gives quotient Q and remainder 12. Q itself divided by 10 gives quotient 4 and remainder 3. Find N.",
    options: [
        { text: "1,087", correct: true, feedback: "Q = 10×4+3 = 43. N = 25×43+12 = 1,075+12 = 1,087." },
        { text: "1,075", correct: false, feedback: "You forgot the remainder." },
        { text: "1,000", correct: false, feedback: "Estimate only." },
        { text: "43", correct: false, feedback: "That's Q, not N." }
      ],
    backward: "Work from the innermost division outward.",
    forward: "Composing and decomposing numbers is essential in algorithms."
  },
  {
    itemId: "d16", order: 16, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Convert 3.2 lakh into tens. (1 lakh = 1,00,000)",
    options: [
        { text: "32,000", correct: true, feedback: "3.2 lakh = 3,20,000; ÷10 = 32,000 tens." },
        { text: "3,200", correct: false, feedback: "You divided by 100 instead of 10." },
        { text: "3,20,000", correct: false, feedback: "That's the number of ones." },
        { text: "32", correct: false, feedback: "You divided by 10,000." }
      ],
    backward: "Convert to the base unit, then divide by 10.",
    forward: "Large-scale unit conversions are used in geography and economics."
  },
  {
    itemId: "d17", order: 17, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (8,234 - 2,345) × 5 by rounding each number inside the brackets to the nearest 1,000. Then find the exact value and the difference between the estimate and the exact.",
    options: [
        { text: "555", correct: true, feedback: "Estimate: (8,000-2,000)=6,000; ×5=30,000. Exact: 8,234-2,345=5,889; ×5=29,445. Difference = 30,000-29,445 = 555." },
        { text: "30,000", correct: false, feedback: "That's the estimate." },
        { text: "29,445", correct: false, feedback: "That's the exact value." },
        { text: "600", correct: false, feedback: "Approximation; exact difference is 555." }
      ],
    backward: "Round first, then operate; compare with the exact result.",
    forward: "Understanding estimation error is key in finance and measurement."
  },
  {
    itemId: "d18", order: 18, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A bookshop sold 15 copies of Book A at ₹245 each and 20 copies of Book B at ₹180 each. They gave a discount of ₹500 on the total bill. How much did they receive?",
    options: [
        { text: "₹6,775", correct: true, feedback: "A: 15×245=3,675; B: 20×180=3,600; total=7,275; after discount=6,775." },
        { text: "₹7,275", correct: false, feedback: "That's before discount." },
        { text: "₹7,775", correct: false, feedback: "Added discount instead of subtracting." },
        { text: "₹5,775", correct: false, feedback: "Miscalculated." }
      ],
    backward: "Calculate subtotals, sum, then subtract the discount.",
    forward: "Discounts and taxes are part of everyday commerce."
  },
  {
    itemId: "d19", order: 19, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "I am a 4-digit number. My thousands digit is twice the hundreds digit. The tens digit is the sum of the thousands and hundreds digit. The ones digit is the difference between the thousands and hundreds digit. Find the smallest such number.",
    options: [
        { text: "2,131", correct: true, feedback: "Let hundreds=x, thousands=2x, tens=3x, ones=x. x must be 1,2,3. Smallest x=1 → 2,131." },
        { text: "4,262", correct: false, feedback: "x=2 gives 4,262, which is larger." },
        { text: "6,393", correct: false, feedback: "x=3 gives 6,393, larger still." },
        { text: "1,231", correct: false, feedback: "Thousands = 1 (not twice hundreds)." }
      ],
    backward: "Express all digits in terms of one variable; test possible values.",
    forward: "This builds the habit of using variables to model relationships."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the smallest 2-digit number that, when multiplied by 18, gives a perfect square.",
    options: [
        { text: "18", correct: true, feedback: "18 = 2×3². To make a perfect square, we need another factor 2. So the smallest 2-digit multiplier is 18 itself (18×18 = 324 = 18²)." },
        { text: "2", correct: false, feedback: "2 is not a 2-digit number." },
        { text: "8", correct: false, feedback: "8 is not 2-digit." },
        { text: "36", correct: false, feedback: "36 does not give a perfect square: 18×36=648, which is not a perfect square." }
      ],
    backward: "Prime factorisation helps understand when a product is a perfect square.",
    forward: "This is the foundation of surds and square roots in algebra."
  },
  {
    itemId: "d21", order: 21, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number N divided by 28 leaves remainder 19. What is the remainder when N is divided by 14?",
    options: [
        { text: "5", correct: true, feedback: "N = 28k+19 = 14×(2k) + 19. 19 ÷ 14 = 1 remainder 5. So remainder 5." },
        { text: "19", correct: false, feedback: "Remainder must be less than divisor 14." },
        { text: "9", correct: false, feedback: "19-14 = 5, not 9." },
        { text: "14", correct: false, feedback: "That's the divisor." }
      ],
    backward: "Express N in terms of the divisor and remainder, then analyse with the new divisor.",
    forward: "This idea is used in modular arithmetic and cryptography."
  },
  {
    itemId: "d22", order: 22, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "A sheet of paper is 0.1 mm thick. How many sheets make a stack 1 metre high? (1 m = 1,000 mm)",
    options: [
        { text: "10,000", correct: true, feedback: "1,000 mm ÷ 0.1 mm = 10,000 sheets." },
        { text: "100", correct: false, feedback: "Divided by 10 incorrectly." },
        { text: "1,000", correct: false, feedback: "Divided by 1 mm per sheet, not 0.1." },
        { text: "10,00,000", correct: false, feedback: "Far too large." }
      ],
    backward: "Convert to the same unit, then divide.",
    forward: "Working with very small and very large units is common in science."
  },
  {
    itemId: "d23", order: 23, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate 6,789 × 123 by rounding 6,789 to the nearest 1,000 and 123 to the nearest 10. Then find the exact product and the difference between the estimate and the exact.",
    options: [
        { text: "4,953", correct: true, feedback: "Estimate: 7,000 × 120 = 8,40,000. Exact: 6,789×123 = 8,35,047. Difference = 8,40,000 - 8,35,047 = 4,953." },
        { text: "8,40,000", correct: false, feedback: "That's the estimate." },
        { text: "8,35,047", correct: false, feedback: "That's the exact product." },
        { text: "5,000", correct: false, feedback: "Approximation, not exact difference." }
      ],
    backward: "Multiply rounded numbers; compare with the exact result.",
    forward: "Error analysis of estimates is vital in engineering."
  },
  {
    itemId: "d24", order: 24, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "A farmer has 2,400 eggs. He packs them in trays of 30 eggs each. He sells each tray for ₹120. He also sells 500 loose eggs at ₹4 each. How much money does he make in total?",
    options: [
        { text: "₹11,600", correct: true, feedback: "Trays: 2,400÷30=80; 80×₹120=₹9,600. Loose: 500×₹4=₹2,000. Total=₹11,600." },
        { text: "₹9,600", correct: false, feedback: "That's only the tray sales." },
        { text: "₹2,000", correct: false, feedback: "Only the loose eggs." },
        { text: "₹10,000", correct: false, feedback: "Approximation." }
      ],
    backward: "Calculate packed and loose sales separately, then sum.",
    forward: "Mixed sales models are used in business and farming."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of two numbers is 8,76,543 and their difference is 2,34,567. What is the larger number?",
    options: [
        { text: "5,55,555", correct: true, feedback: "Larger = (sum + diff)/2 = (8,76,543+2,34,567)/2 = 5,55,555." },
        { text: "3,20,988", correct: false, feedback: "That's the smaller number." },
        { text: "5,55,000", correct: false, feedback: "Rounded." },
        { text: "6,55,555", correct: false, feedback: "Miscalculated." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The product of two numbers is 97,200. One number is 27 times the other. Find the larger number.",
    options: [
        { text: "1,620", correct: true, feedback: "27x²=97,200 → x²=3,600 → x=60, large=27×60=1,620." },
        { text: "60", correct: false, feedback: "That's the small number." },
        { text: "1,350", correct: false, feedback: "Incorrect calculation." },
        { text: "2,700", correct: false, feedback: "That's x², not the larger number." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "A number divided by 35 gives quotient 62 and remainder 18. Multiply that number by 2. What do you get?",
    options: [
        { text: "4,376", correct: true, feedback: "N = 35×62+18 = 2,170+18 = 2,188. ×2 = 4,376." },
        { text: "2,188", correct: false, feedback: "That's N, not multiplied by 2." },
        { text: "2,170", correct: false, feedback: "Forgot remainder." },
        { text: "4,000", correct: false, feedback: "Estimate." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "How many ₹20 notes make ₹4,00,000?",
    options: [
        { text: "20,000", correct: true, feedback: "4,00,000 ÷ 20 = 20,000." },
        { text: "2,000", correct: false, feedback: "Divided by 200." },
        { text: "40,000", correct: false, feedback: "Multiplied by 10." },
        { text: "20,00,000", correct: false, feedback: "Multiplied instead of divided." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (3,456 + 7,890) × 2 by rounding each number inside to the nearest 1,000. Then find the exact value and the difference.",
    options: [
        { text: "692", correct: true, feedback: "Estimate: (3,000+8,000)×2=22,000. Exact: 11,346×2=22,692. Difference = 692." },
        { text: "22,000", correct: false, feedback: "That's the estimate." },
        { text: "22,692", correct: false, feedback: "That's the exact value." },
        { text: "700", correct: false, feedback: "Approximation." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "Ravi bought 5 pens at ₹35 each and 4 notebooks at ₹75 each. He paid with a ₹500 note. How much change did he get?",
    options: [
        { text: "₹25", correct: true, feedback: "Pens: 5×35=175; notebooks: 4×75=300; total=475; change=500-475=25." },
        { text: "₹475", correct: false, feedback: "Total cost, not change." },
        { text: "₹500", correct: false, feedback: "No change." },
        { text: "₹75", correct: false, feedback: "Miscalculated." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "ADDSUB", clusterName: CLUSTER_NAMES.ADDSUB,
    question: "The sum of three consecutive numbers is 369. Find the middle number.",
    options: [
        { text: "123", correct: true, feedback: "x + (x+1) + (x+2) = 3x+3 = 369 → x=122, middle = 123." },
        { text: "122", correct: false, feedback: "That's the smallest." },
        { text: "124", correct: false, feedback: "The largest." },
        { text: "121", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "A number is multiplied by 12, then 2,400 is subtracted, leaving 3,600. Find the original number.",
    options: [
        { text: "500", correct: true, feedback: "3,600+2,400=6,000; ÷12=500." },
        { text: "300", correct: false, feedback: "Incorrect reverse." },
        { text: "600", correct: false, feedback: "Off by 100." },
        { text: "6,000", correct: false, feedback: "That's before dividing." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "DIV", clusterName: CLUSTER_NAMES.DIV,
    question: "Find a number between 100 and 200 that leaves remainder 3 when divided by 8, and remainder 2 when divided by 5.",
    options: [
        { text: "187", correct: true, feedback: "187 ÷ 8 = 23 R3; 187 ÷ 5 = 37 R2." },
        { text: "163", correct: false, feedback: "163 ÷ 8 = 20 R3; 163 ÷ 5 = 32 R3 (not 2)." },
        { text: "155", correct: false, feedback: "155 ÷ 8 = 19 R3; 155 ÷ 5 = 31 R0." },
        { text: "171", correct: false, feedback: "171 ÷ 8 = 21 R3; 171 ÷ 5 = 34 R1." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "POW10", clusterName: CLUSTER_NAMES.POW10,
    question: "Convert 4.5 lakh into hundreds. (1 lakh = 1,00,000)",
    options: [
        { text: "4,500", correct: true, feedback: "4.5 lakh = 4,50,000; ÷100 = 4,500." },
        { text: "45,000", correct: false, feedback: "That's the number of tens." },
        { text: "45", correct: false, feedback: "Divided by 10,000." },
        { text: "4,50,000", correct: false, feedback: "That's the number of ones." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate (9,876 - 3,210) × 4 by rounding each inside number to the nearest 1,000. Then find the exact value and the difference.",
    options: [
        { text: "1,336", correct: true, feedback: "Estimate: (10,000-3,000)×4=28,000. Exact: 6,666×4=26,664. Difference = 1,336." },
        { text: "28,000", correct: false, feedback: "That's the estimate." },
        { text: "26,664", correct: false, feedback: "Exact value." },
        { text: "1,300", correct: false, feedback: "Approximation." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "WORD", clusterName: CLUSTER_NAMES.WORD,
    question: "2,500 oranges are packed in bags of 50. Each bag is sold for ₹150. Also 300 loose oranges are sold at ₹5 each. Find the total money received.",
    options: [
        { text: "₹9,000", correct: true, feedback: "Bags: 2,500÷50=50; 50×₹150=₹7,500. Loose: 300×₹5=₹1,500. Total=₹9,000." },
        { text: "₹7,500", correct: false, feedback: "Only bags." },
        { text: "₹1,500", correct: false, feedback: "Only loose oranges." },
        { text: "₹8,000", correct: false, feedback: "Estimate." }
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
    title: "Operations on Whole Numbers — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems combining addition, subtraction, multiplication, division, and estimation in sequence, with reverse-operation reasoning.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review – Non-Routine Synthesis</strong><br>' +
      "&bull; Combine operations to construct a solution path — there is often more than one way.<br>" +
      "&bull; Work backwards when needed; reverse operations carefully.<br>" +
      "&bull; Use estimation to check if your final answer is reasonable.<br>" +
      "&bull; Multi-step problems may require addition, multiplication, subtraction, or division in sequence.<br>" +
      "&bull; Read each problem fully — sometimes you need to find an intermediate value first.<br>",
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

// seed/mathSeedCh3FactorsMultiplesL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 1 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-1.html.
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 1;

const CLUSTER_NAMES = {
  FACT: "Factors & Prime Factorisation",
  MULT: "Multiples & LCM",
  HCF: "Highest Common Factor",
  DIVR: "Divisibility Rules",
  SQNUM: "Square Numbers",
  PATT: "Number Patterns & Sequences"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "List all the factors of 24.",
    options: [
        { text: "1, 2, 3, 4, 6, 8, 12, 24", correct: true, feedback: "Factors come in pairs: 1×24, 2×12, 3×8, 4×6. All are included." },
        { text: "2, 3, 4, 6, 8, 12", correct: false, feedback: "You missed 1 and 24 — every number has 1 and itself as factors." },
        { text: "1, 2, 3, 4, 6, 8, 12, 24, 48", correct: false, feedback: "48 is not a factor of 24; 48 is a multiple, not a factor." },
        { text: "1, 2, 4, 6, 8, 12", correct: false, feedback: "You missed 3 (3×8=24)." }
      ],
    retryHint: "Find all pairs of numbers that multiply to 24. Write all numbers from those pairs without repeating."
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "List the first five multiples of 7.",
    options: [
        { text: "7, 14, 21, 28, 35", correct: true, feedback: "Start at 7 and keep adding 7: 7,14,21,28,35." },
        { text: "7, 17, 27, 37, 47", correct: false, feedback: "You added 10 each time instead of 7." },
        { text: "0, 7, 14, 21, 28", correct: false, feedback: "0 is a multiple, but usually we list the first five starting from the number itself." },
        { text: "7, 14, 28, 56, 112", correct: false, feedback: "You doubled each time instead of adding 7." }
      ],
    retryHint: "Multiples of 7 are found by skip counting: 7, then 7+7=14, then 14+7=21, and so on."
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 12 and 18 by listing the factors.",
    options: [
        { text: "6", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. Common: 1,2,3,6. Highest is 6." },
        { text: "2", correct: false, feedback: "2 is a common factor, but not the highest." },
        { text: "12", correct: false, feedback: "12 is not a factor of 18." },
        { text: "3", correct: false, feedback: "3 is common, but 6 is larger and also common." }
      ],
    retryHint: "Write all factors of each number. Circle the common ones and pick the largest."
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Is 51 prime or composite?",
    options: [
        { text: "Composite (3 × 17)", correct: true, feedback: "51 = 3 × 17, so it has factors other than 1 and itself." },
        { text: "Prime", correct: false, feedback: "51 is divisible by 3 (digit sum 6), so it is not prime." },
        { text: "Neither", correct: false, feedback: "Every integer greater than 1 is either prime or composite." },
        { text: "Both", correct: false, feedback: "A number cannot be both prime and composite." }
      ],
    retryHint: "Check if 51 has any factors other than 1 and 51. Try dividing by small primes: 3 works."
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Find the square of 9.",
    options: [
        { text: "81", correct: true, feedback: "9² = 9 × 9 = 81." },
        { text: "18", correct: false, feedback: "You multiplied by 2 instead of squaring." },
        { text: "99", correct: false, feedback: "You wrote 9 twice, not multiplied." },
        { text: "72", correct: false, feedback: "That's 9 × 8." }
      ],
    retryHint: "Square means multiply the number by itself: 9 × 9."
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "Complete the pattern: 3, 6, 9, 12, ___",
    options: [
        { text: "15", correct: true, feedback: "Each term increases by 3: 12 + 3 = 15." },
        { text: "14", correct: false, feedback: "Adding 2 gives 14, but the difference is 3." },
        { text: "16", correct: false, feedback: "Adding 4 would give 16, not the pattern." },
        { text: "36", correct: false, feedback: "You multiplied 12 by 3 instead of adding 3." }
      ],
    retryHint: "Find the difference: 6-3=3, 9-6=3. So add 3 to the last term."
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Write the prime factorisation of 36.",
    options: [
        { text: "2² × 3²", correct: true, feedback: "36 = 6×6 = (2×3)×(2×3) = 2²×3²." },
        { text: "4 × 9", correct: false, feedback: "4 and 9 are not prime numbers; you must break them down further." },
        { text: "6 × 6", correct: false, feedback: "6 is not prime; use a factor tree to break into primes." },
        { text: "2 × 18", correct: false, feedback: "18 is composite; 36 = 2 × 2 × 3 × 3 = 2²×3²." }
      ],
    retryHint: "Break 36 into 6×6, then break each 6 into 2×3. Collect the primes: two 2s and two 3s."
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the LCM of 4 and 6 by listing multiples.",
    options: [
        { text: "12", correct: true, feedback: "Multiples of 4: 4,8,12,16… Multiples of 6: 6,12,18… First common is 12." },
        { text: "24", correct: false, feedback: "24 is a common multiple, but not the least." },
        { text: "4", correct: false, feedback: "4 is not a multiple of 6." },
        { text: "6", correct: false, feedback: "6 is not a multiple of 4." }
      ],
    retryHint: "Write the first few multiples of each number and find the smallest number that appears in both lists."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Which of these is NOT a factor of 48?",
    options: [
        { text: "7", correct: true, feedback: "48 ÷ 7 = 6 remainder 6, so 7 is not a factor." },
        { text: "16", correct: false, feedback: "48 ÷ 16 = 3 exactly; 16 is a factor." },
        { text: "24", correct: false, feedback: "48 ÷ 24 = 2; 24 is a factor." },
        { text: "8", correct: false, feedback: "48 ÷ 8 = 6; 8 is a factor." }
      ],
    backward: "A factor divides the number exactly with no remainder.",
    forward: "Knowing factors helps simplify fractions and find HCF."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "What is the 6th multiple of 9?",
    options: [
        { text: "54", correct: true, feedback: "9 × 6 = 54." },
        { text: "45", correct: false, feedback: "That's the 5th multiple (9×5)." },
        { text: "63", correct: false, feedback: "The 7th multiple (9×7)." },
        { text: "60", correct: false, feedback: "60 is a multiple of 10, not 9." }
      ],
    backward: "Multiply 9 by the position number: 9,18,27,36,45,54.",
    forward: "Multiples help find common denominators in fractions."
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 12 and 20.",
    options: [
        { text: "4", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. Factors of 20: 1,2,4,5,10,20. Highest common = 4." },
        { text: "2", correct: false, feedback: "2 is common, but 4 is larger and also common." },
        { text: "6", correct: false, feedback: "6 is a factor of 12 but not of 20." },
        { text: "10", correct: false, feedback: "10 is a factor of 20 but not of 12." }
      ],
    backward: "List factors of each and find the greatest that appears in both lists.",
    forward: "HCF is used to simplify fractions to lowest terms."
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by 3?",
    options: [
        { text: "312", correct: true, feedback: "Digit sum = 3+1+2 = 6, which is divisible by 3." },
        { text: "214", correct: false, feedback: "Digit sum = 2+1+4 = 7, not divisible by 3." },
        { text: "401", correct: false, feedback: "Digit sum = 5, not divisible by 3." },
        { text: "520", correct: false, feedback: "Digit sum = 7, not divisible by 3." }
      ],
    backward: "Sum the digits; if the sum is a multiple of 3, the number is divisible by 3.",
    forward: "Divisibility rules speed up factorisation and fraction work."
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "What is 8²?",
    options: [
        { text: "64", correct: true, feedback: "8² = 8 × 8 = 64." },
        { text: "16", correct: false, feedback: "That's 8 × 2 (double), not square." },
        { text: "72", correct: false, feedback: "That's 8 × 9." },
        { text: "56", correct: false, feedback: "That's 8 × 7." }
      ],
    backward: "8² means 8 multiplied by itself.",
    forward: "Square numbers appear in area calculations and Pythagoras' theorem."
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "Complete the pattern: 2, 4, 8, 16, ___",
    options: [
        { text: "32", correct: true, feedback: "Each term is multiplied by 2: 16 × 2 = 32." },
        { text: "24", correct: false, feedback: "Adding 8 would give 24, but the pattern is multiplicative." },
        { text: "30", correct: false, feedback: "No clear pattern yields 30." },
        { text: "20", correct: false, feedback: "Adding 4 would give 20, but the pattern is doubling." }
      ],
    backward: "Notice that 4=2×2, 8=4×2, 16=8×2. So multiply by 2 each step.",
    forward: "Recognising multiplicative patterns prepares for exponential growth."
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many factors does 36 have?",
    options: [
        { text: "9", correct: true, feedback: "Factors: 1,2,3,4,6,9,12,18,36 — that's 9 factors." },
        { text: "8", correct: false, feedback: "You might have missed 1 or 36; check the complete list." },
        { text: "10", correct: false, feedback: "You double-counted a factor pair." },
        { text: "7", correct: false, feedback: "You missed at least two factors." }
      ],
    backward: "List factor pairs: 1×36, 2×18, 3×12, 4×9, 6×6 — 9 distinct factors.",
    forward: "Counting factors is useful in number theory."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "What is the 12th multiple of 8?",
    options: [
        { text: "96", correct: true, feedback: "8 × 12 = 96." },
        { text: "88", correct: false, feedback: "The 11th multiple (8×11)." },
        { text: "104", correct: false, feedback: "The 13th multiple (8×13)." },
        { text: "80", correct: false, feedback: "The 10th multiple (8×10)." }
      ],
    backward: "Multiply 8 by 12.",
    forward: "Multiples are used when finding common schedules or beats."
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 24 and 36.",
    options: [
        { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3² — HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "6 is a common factor, but 12 is larger." },
        { text: "18", correct: false, feedback: "18 is not a factor of 24." },
        { text: "8", correct: false, feedback: "8 is a factor of 24 but not 36." }
      ],
    backward: "Use prime factorisation: take the lowest power of each common prime.",
    forward: "HCF helps divide quantities into equal groups."
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by both 2 and 5?",
    options: [
        { text: "210", correct: true, feedback: "Ends in 0, so divisible by 2 and 5." },
        { text: "205", correct: false, feedback: "Ends in 5, so divisible by 5 but not by 2." },
        { text: "212", correct: false, feedback: "Ends in 2, so divisible by 2 but not by 5." },
        { text: "215", correct: false, feedback: "Ends in 5, not by 2." }
      ],
    backward: "A number divisible by both 2 and 5 must end in 0.",
    forward: "Divisibility by 10 is the same condition."
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Which of these is a square number?",
    options: [
        { text: "49", correct: true, feedback: "49 = 7 × 7." },
        { text: "50", correct: false, feedback: "50 is not a square (7²=49, 8²=64)." },
        { text: "51", correct: false, feedback: "51 is not a perfect square." },
        { text: "52", correct: false, feedback: "52 is not a perfect square." }
      ],
    backward: "A square number is the product of an integer with itself.",
    forward: "Recognising squares helps with quick area and root calculations."
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the next term? 1, 4, 9, 16, ___",
    options: [
        { text: "25", correct: true, feedback: "These are square numbers: 1²,2²,3²,4²,5²=25." },
        { text: "20", correct: false, feedback: "The difference between 16 and 20 is 4, but the pattern is not additive." },
        { text: "24", correct: false, feedback: "24 is not a square." },
        { text: "30", correct: false, feedback: "30 is not a square." }
      ],
    backward: "1=1², 4=2², 9=3², 16=4². Next is 5²=25.",
    forward: "Square number patterns lead to quadratic sequences."
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "What is the prime factorisation of 90?",
    options: [
        { text: "2 × 3² × 5", correct: true, feedback: "90 = 9×10 = (3×3)×(2×5) = 2×3²×5." },
        { text: "2 × 3 × 15", correct: false, feedback: "15 is composite; must be broken into 3×5." },
        { text: "2 × 5 × 9", correct: false, feedback: "9 is composite; 9=3²." },
        { text: "3 × 30", correct: false, feedback: "30 is composite; 30=2×3×5." }
      ],
    backward: "Use a factor tree and write only prime factors, using exponents for repeats.",
    forward: "Prime factorisation is the foundation of HCF and LCM calculations."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "What is the LCM of 5 and 7?",
    options: [
        { text: "35", correct: true, feedback: "5 and 7 are prime; LCM = 5×7 = 35." },
        { text: "5", correct: false, feedback: "5 is not a multiple of 7." },
        { text: "7", correct: false, feedback: "7 is not a multiple of 5." },
        { text: "70", correct: false, feedback: "70 is a common multiple, but not the least (35 is smaller)." }
      ],
    backward: "For primes, LCM is simply their product.",
    forward: "LCM helps add fractions with different denominators."
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Two numbers have HCF 6. Which pair could they be?",
    options: [
        { text: "12 and 18", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. 18: 1,2,3,6,9,18. HCF=6." },
        { text: "12 and 24", correct: false, feedback: "HCF of 12 and 24 is 12, not 6." },
        { text: "18 and 27", correct: false, feedback: "HCF is 9." },
        { text: "6 and 9", correct: false, feedback: "HCF is 3." }
      ],
    backward: "Check the HCF of each pair by listing common factors.",
    forward: "This logic is used to solve problems with equal groups."
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by 4?",
    options: [
        { text: "312", correct: true, feedback: "Last two digits = 12, which is divisible by 4." },
        { text: "313", correct: false, feedback: "Last two digits 13, not divisible by 4." },
        { text: "314", correct: false, feedback: "Last two digits 14, not divisible by 4." },
        { text: "315", correct: false, feedback: "Last two digits 15, not divisible by 4." }
      ],
    backward: "If the last two digits form a number divisible by 4, the whole number is.",
    forward: "Divisibility by 4 helps when working with leap years."
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "√81 = ?",
    options: [
        { text: "9", correct: true, feedback: "9 × 9 = 81, so √81 = 9." },
        { text: "8", correct: false, feedback: "8² = 64, not 81." },
        { text: "10", correct: false, feedback: "10² = 100." },
        { text: "7", correct: false, feedback: "7² = 49." }
      ],
    backward: "The square root of a number is the value that, when squared, gives the number.",
    forward: "Square roots are the inverse of squares."
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 3, 6, 10, 15, ___ — what is the next term?",
    options: [
        { text: "21", correct: true, feedback: "Differences: +2, +3, +4, +5, so next +6 → 21." },
        { text: "20", correct: false, feedback: "Adding 5 would be 20, but the increase is +6 now." },
        { text: "22", correct: false, feedback: "Does not follow the triangular number pattern." },
        { text: "18", correct: false, feedback: "Adding 3 is too small." }
      ],
    backward: "These are triangular numbers. Look at how much each term increases.",
    forward: "Triangular numbers appear in many visual patterns."
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Which statement is true?",
    options: [
        { text: "2 is the only even prime number.", correct: true, feedback: "Every other even number has at least 1, itself, and 2 as factors." },
        { text: "1 is a prime number.", correct: false, feedback: "1 has only one factor (1), so it is neither prime nor composite." },
        { text: "All prime numbers are odd.", correct: false, feedback: "2 is an even prime." },
        { text: "9 is a prime number.", correct: false, feedback: "9 = 3 × 3, so it is composite." }
      ],
    backward: "A prime number has exactly two distinct factors: 1 and itself.",
    forward: "Understanding primes is crucial in cryptography."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the smallest number that is a multiple of both 3 and 8.",
    options: [
        { text: "24", correct: true, feedback: "LCM of 3 and 8 = 24." },
        { text: "12", correct: false, feedback: "12 is a multiple of 3 but not of 8." },
        { text: "48", correct: false, feedback: "48 is a common multiple, but 24 is smaller." },
        { text: "16", correct: false, feedback: "16 is a multiple of 8 but not of 3." }
      ],
    backward: "Find the LCM: the smallest number that is in both multiplication tables.",
    forward: "LCM is used to find common denominators."
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "What is the HCF of two consecutive numbers?",
    options: [
        { text: "1", correct: true, feedback: "Consecutive numbers share no common factor greater than 1." },
        { text: "2", correct: false, feedback: "Consecutive numbers cannot both be even." },
        { text: "The larger number", correct: false, feedback: "The larger number cannot divide the smaller one exactly." },
        { text: "0", correct: false, feedback: "HCF cannot be 0." }
      ],
    backward: "Try examples: 8 and 9 — HCF 1; 14 and 15 — HCF 1.",
    forward: "Consecutive numbers are always co-prime."
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "If a number is divisible by 9, which of the following must also be true?",
    options: [
        { text: "It is also divisible by 3.", correct: true, feedback: "Any multiple of 9 has a digit sum divisible by 9, hence also divisible by 3." },
        { text: "It is even.", correct: false, feedback: "9 is odd, so not all multiples of 9 are even." },
        { text: "It ends in 9.", correct: false, feedback: "Not all multiples of 9 end in 9 (e.g., 18, 27)." },
        { text: "It is divisible by 6.", correct: false, feedback: "9 is not necessarily even, so may not be divisible by 2." }
      ],
    backward: "Divisibility by 9 implies the digit sum is a multiple of 9, which is also a multiple of 3.",
    forward: "This relationship helps in simplifying fractions quickly."
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "What is the square of 12?",
    options: [
        { text: "144", correct: true, feedback: "12 × 12 = 144." },
        { text: "124", correct: false, feedback: "Recompute: 12 × 12, not 12 × 10 + 4." },
        { text: "142", correct: false, feedback: "Miscalculated." },
        { text: "164", correct: false, feedback: "Miscalculated." }
      ],
    backward: "12 × 12 = 144.",
    forward: "Squares of larger numbers build mental maths."
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "5, 10, 15, 20, … This pattern shows:",
    options: [
        { text: "Multiples of 5", correct: true, feedback: "Each term is 5 times the position: 5×1, 5×2, 5×3, 5×4, …" },
        { text: "Powers of 5", correct: false, feedback: "Powers of 5 would be 5, 25, 125, …" },
        { text: "Odd numbers", correct: false, feedback: "Odd numbers are 1,3,5,…; this pattern has even numbers too." },
        { text: "Square numbers", correct: false, feedback: "Square numbers are 1,4,9,16,…" }
      ],
    backward: "The difference is constant: 5 each time. It's the 5 times table.",
    forward: "Identifying patterns helps in generalising rules."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many factors does 30 have?",
    options: [
        { text: "8", correct: true, feedback: "Factors: 1,2,3,5,6,10,15,30 — 8 factors." },
        { text: "7", correct: false, feedback: "Missed one; check the factor pairs again." },
        { text: "9", correct: false, feedback: "Overcounted." },
        { text: "6", correct: false, feedback: "Missed at least two factors." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "What is the 8th multiple of 6?",
    options: [
        { text: "48", correct: true, feedback: "6 × 8 = 48." },
        { text: "42", correct: false, feedback: "7th multiple." },
        { text: "54", correct: false, feedback: "9th multiple." },
        { text: "40", correct: false, feedback: "Not a multiple of 6." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 18 and 27.",
    options: [
        { text: "9", correct: true, feedback: "18=2×3², 27=3³ — HCF=3²=9." },
        { text: "3", correct: false, feedback: "3 is common but 9 is larger." },
        { text: "6", correct: false, feedback: "6 is not a factor of 27." },
        { text: "18", correct: false, feedback: "18 is not a factor of 27." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by 6? (Recall: must be even and digit sum divisible by 3.)",
    options: [
        { text: "312", correct: true, feedback: "Even, digit sum 6 — divisible by 3. So divisible by 6." },
        { text: "321", correct: false, feedback: "Not even." },
        { text: "313", correct: false, feedback: "Not even." },
        { text: "314", correct: false, feedback: "Digit sum 8, not multiple of 3." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "√64 = ?",
    options: [
        { text: "8", correct: true, feedback: "8 × 8 = 64." },
        { text: "6", correct: false, feedback: "6² = 36." },
        { text: "7", correct: false, feedback: "7² = 49." },
        { text: "9", correct: false, feedback: "9² = 81." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "2, 6, 10, 14, ___ — next term?",
    options: [
        { text: "18", correct: true, feedback: "Add 4 each time: 14+4=18." },
        { text: "16", correct: false, feedback: "Adding 2 would be 16, but the difference is 4." },
        { text: "20", correct: false, feedback: "Adding 6 would be 20." },
        { text: "17", correct: false, feedback: "Not following the pattern." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Which of these is a prime number?",
    options: [
        { text: "23", correct: true, feedback: "23 has only factors 1 and 23." },
        { text: "21", correct: false, feedback: "21 = 3 × 7." },
        { text: "27", correct: false, feedback: "27 = 3 × 9." },
        { text: "33", correct: false, feedback: "33 = 3 × 11." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the LCM of 4 and 10.",
    options: [
        { text: "20", correct: true, feedback: "Multiples of 10: 10,20,… 20 is also a multiple of 4." },
        { text: "40", correct: false, feedback: "Common multiple but not least." },
        { text: "10", correct: false, feedback: "10 is not a multiple of 4." },
        { text: "4", correct: false, feedback: "4 is not a multiple of 10." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 16 and 24.",
    options: [
        { text: "8", correct: true, feedback: "16=2⁴, 24=2³×3 — HCF=2³=8." },
        { text: "4", correct: false, feedback: "4 is common, but 8 is larger." },
        { text: "12", correct: false, feedback: "12 is not a factor of 16." },
        { text: "6", correct: false, feedback: "6 is not a factor of 16." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by 5 but NOT by 2?",
    options: [
        { text: "135", correct: true, feedback: "Ends in 5, so divisible by 5; odd, so not by 2." },
        { text: "130", correct: false, feedback: "Ends in 0, so divisible by both 2 and 5." },
        { text: "142", correct: false, feedback: "Ends in 2, so divisible by 2 but not 5." },
        { text: "158", correct: false, feedback: "Ends in 8, divisible by 2 but not 5." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "The square of which number is 121?",
    options: [
        { text: "11", correct: true, feedback: "11 × 11 = 121." },
        { text: "10", correct: false, feedback: "10² = 100." },
        { text: "12", correct: false, feedback: "12² = 144." },
        { text: "9", correct: false, feedback: "9² = 81." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 4, 7, 10, ___ — next term?",
    options: [
        { text: "13", correct: true, feedback: "Add 3 each time: 10+3=13." },
        { text: "12", correct: false, feedback: "Adding 2 would be 12." },
        { text: "14", correct: false, feedback: "Adding 4 would be 14." },
        { text: "15", correct: false, feedback: "Adding 5 would be 15." }
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
    title: "Factors, Multiples & Number Properties — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Factors, prime factorisation, multiples, LCM, HCF, divisibility rules, square numbers, and number patterns — single-step retrieval questions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Factors: numbers that divide exactly. List in pairs.<br>" +
      "&bull; Prime factorisation: break a number into prime factors using a factor tree.<br>" +
      "&bull; Multiples: skip counting. LCM = smallest common multiple.<br>" +
      "&bull; HCF: highest common factor from factor lists or prime factors.<br>" +
      "&bull; Divisibility rules: 2 (last digit even), 3 (digit sum ÷ 3), 4 (last two digits ÷ 4), 5 (ends 0/5), 6 (divisible by 2 and 3), 9 (digit sum ÷ 9), 10 (ends 0).<br>" +
      "&bull; Square numbers: a number times itself. √ is the inverse.<br>" +
      "&bull; Patterns: constant difference, doubling, or square/triangular numbers.<br>",
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

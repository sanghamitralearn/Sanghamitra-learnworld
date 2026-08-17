// seed/mathSeedCh3FactorsMultiplesL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 3 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-3.html.
//
// A few questions use MathJax-style \( ... \) LaTeX delimiters (matching
// the source HTML); the Math hub client already loads MathJax and typesets
// question/option text after each render, so these render correctly.
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 3;

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
    question: "A number has prime factorisation \\( 2^a \\times 3 \\times 5 \\) and has exactly 8 factors. Find \\( a \\).",
    options: [
        { text: "1", correct: true, feedback: "Factors = (a+1)×2×2 = 4(a+1) = 8 → a+1 = 2 → a = 1." },
        { text: "2", correct: false, feedback: "If a=2, factors = 4×3 = 12, not 8." },
        { text: "0", correct: false, feedback: "a=0 gives factors = 4×1 = 4." },
        { text: "3", correct: false, feedback: "a=3 gives factors = 4×4 = 16." }
      ],
    retryHint: "Number of factors = (exponent+1) multiplied for each prime. Set up the equation."
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The LCM of two numbers is 72 and their product is 864. Find their HCF.",
    options: [
        { text: "12", correct: true, feedback: "Product = HCF × LCM → 864 = HCF × 72 → HCF = 864 ÷ 72 = 12." },
        { text: "6", correct: false, feedback: "6×72 = 432, not 864." },
        { text: "72", correct: false, feedback: "That's the LCM." },
        { text: "24", correct: false, feedback: "24×72 = 1728, too large." }
      ],
    retryHint: "Use the identity: product of two numbers = HCF × LCM."
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Two numbers have HCF 8. The larger number is twice the smaller. Their sum is 72. Find the larger number.",
    options: [
        { text: "48", correct: true, feedback: "Let numbers = 8a, 8b with b = 2a. Sum 8a+16a = 24a = 72 → a=3, numbers 24 and 48; larger = 48." },
        { text: "24", correct: false, feedback: "That's the smaller number." },
        { text: "56", correct: false, feedback: "56+28=84, not 72." },
        { text: "64", correct: false, feedback: "64+32=96, not 72." }
      ],
    retryHint: "Express both numbers as 8 times co-prime factors, with one factor double the other."
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest 3-digit number that is divisible by 4, 5, and 6, and has a digit sum of 9.",
    options: [
        { text: "180", correct: true, feedback: "LCM(4,5,6)=60. Multiples: 120 (sum 3), 180 (sum 9). Smallest with sum 9 is 180." },
        { text: "120", correct: false, feedback: "Digit sum 1+2+0=3, not 9." },
        { text: "240", correct: false, feedback: "Digit sum 6; also larger than 180." },
        { text: "150", correct: false, feedback: "Not a multiple of 4 (150÷4=37.5)." }
      ],
    retryHint: "First find multiples of LCM(4,5,6)=60, then check digit sum."
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "The square of a number is between 300 and 400. The number is a multiple of 3. Find the number.",
    options: [
        { text: "18", correct: true, feedback: "17²=289 (too small), 18²=324 (in range, 18 is a multiple of 3), 19²=361 (in range but 19 is not a multiple of 3). So 18." },
        { text: "17", correct: false, feedback: "17²=289 < 300." },
        { text: "19", correct: false, feedback: "19 is not a multiple of 3." },
        { text: "20", correct: false, feedback: "20²=400, not between 300 and 400 (exclusive)." }
      ],
    retryHint: "List squares: 17²=289, 18²=324, 19²=361. Check which root is a multiple of 3."
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "2, 6, 12, 20, 30, … (these are n(n+1)). Find the 8th term.",
    options: [
        { text: "72", correct: true, feedback: "8th term = 8×9 = 72." },
        { text: "56", correct: false, feedback: "That's 7×8, the 7th term." },
        { text: "90", correct: false, feedback: "That's 9×10, the 9th term." },
        { text: "42", correct: false, feedback: "That's 6×7, the 6th term." }
      ],
    retryHint: "The sequence is products of consecutive integers: 1×2, 2×3, 3×4, … So nth term = n(n+1)."
  },
  {
    itemId: "w7", order: 7, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Two numbers are in the ratio 2:3. Their LCM is 48. Find the smaller number.",
    options: [
        { text: "16", correct: true, feedback: "Numbers = 2x, 3x. HCF = x. LCM = 2×3×x = 6x = 48 → x = 8. Smaller = 2×8 = 16." },
        { text: "24", correct: false, feedback: "That's the larger number (3×8)." },
        { text: "12", correct: false, feedback: "Would give LCM = 6×6 = 36." },
        { text: "32", correct: false, feedback: "Would require x=16, LCM=96." }
      ],
    retryHint: "If numbers are 2x and 3x and they are co-prime in the ratio, LCM = 6x."
  },
  {
    itemId: "w8", order: 8, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Three ribbons are 48 cm, 72 cm, and 96 cm long. They are cut into equal pieces of the greatest possible length. What is that length?",
    options: [
        { text: "24 cm", correct: true, feedback: "HCF(48,72,96) = 24. Greatest equal piece length = 24 cm." },
        { text: "12 cm", correct: false, feedback: "12 cm is possible, but 24 cm is longer." },
        { text: "36 cm", correct: false, feedback: "36 does not divide 48 or 96 evenly." },
        { text: "48 cm", correct: false, feedback: "48 does not divide 72." }
      ],
    retryHint: "The greatest possible equal length is the HCF of the three lengths."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number between 100 and 200 has three distinct prime factors. The sum of the exponents in its prime factorisation is 5. The exponent of 2 is 3 and the number is a multiple of 5. Find the number.",
    options: [
        { text: "120", correct: true, feedback: "2³×3×5 = 8×3×5 = 120, exponents 3+1+1=5, multiple of 5, in range." },
        { text: "168", correct: false, feedback: "2³×3×7 = 168, but not a multiple of 5." },
        { text: "180", correct: false, feedback: "2²×3²×5 = 180, exponent of 2 is 2, not 3." },
        { text: "210", correct: false, feedback: "Out of range (>200)." }
      ],
    backward: "Use the exponent sum and distinct prime condition; list possibilities, filter by range and extra conditions.",
    forward: "Such descriptive puzzles build algebraic modelling skills."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Two numbers are in the ratio 5:7. Their LCM is 420. Find the sum of the numbers.",
    options: [
        { text: "144", correct: true, feedback: "Numbers = 5x, 7x. HCF = x. LCM = 5×7×x = 35x = 420 → x = 12. Numbers 60, 84; sum = 144." },
        { text: "24", correct: false, feedback: "That's just the value of x." },
        { text: "35", correct: false, feedback: "That's the product of the ratio parts." },
        { text: "420", correct: false, feedback: "That's the LCM, not the sum." }
      ],
    backward: "For co-prime ratio parts, LCM = product of ratio parts × HCF.",
    forward: "Ratio-LCM problems appear in scheduling and gear ratios."
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "The HCF of two numbers is 6. Their sum is 48. The product of the numbers is as large as possible. Find the larger number.",
    options: [
        { text: "30", correct: true, feedback: "Numbers = 6a, 6b, a,b co-prime, a+b=8. Co-prime pairs: (1,7) product 42; (3,5) product 90. Max product with a=5,b=3 gives numbers 30,18; larger = 30." },
        { text: "24", correct: false, feedback: "If a=4,b=4, they are not co-prime, so HCF would be 24, not 6." },
        { text: "42", correct: false, feedback: "That would need the pair (1,7): numbers 42,6 — a valid HCF=6 pair, but its product is far smaller than 30×18." },
        { text: "18", correct: false, feedback: "That's the smaller number." }
      ],
    backward: "Express numbers as HCF × co-prime factors. Maximise the co-prime product under the sum constraint.",
    forward: "Optimisation with number theory constraints leads to integer programming."
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest 4-digit number of the form 5□2□ that is divisible by 3, 4, and 5.",
    options: [
        { text: "5220", correct: true, feedback: "Divisible by 5 → last digit 0 or 5. By 4 → last two digits divisible by 4; 20 works, 25 doesn't. So last digit 0. Number 5□20. Divisible by 3 → digit sum 5+□+2+0 = 7+□ multiple of 3. Smallest □ = 2 (sum 9). Number 5220." },
        { text: "5020", correct: false, feedback: "Digit sum 7, not a multiple of 3." },
        { text: "5120", correct: false, feedback: "Digit sum 8, not a multiple of 3." },
        { text: "5320", correct: false, feedback: "Larger than 5220; also its digit sum 10 is not a multiple of 3." }
      ],
    backward: "Apply each divisibility rule sequentially; start with the most restrictive (4 and 5).",
    forward: "Multi-constraint puzzles appear in logic and coding challenges."
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "\\( \\sqrt{2^2 \\times 3^4 \\times 5^2} \\) = ?",
    options: [
        { text: "90", correct: true, feedback: "Halve each exponent: 2¹ × 3² × 5¹ = 2 × 9 × 5 = 90." },
        { text: "30", correct: false, feedback: "You used exponent 1 for all primes." },
        { text: "180", correct: false, feedback: "That's twice 90; you didn't halve the exponents correctly." },
        { text: "45", correct: false, feedback: "You forgot the factor of 2." }
      ],
    backward: "√(aⁿ) = aⁿ/². Halve each exponent.",
    forward: "Simplifying radicals with exponents is essential in algebra."
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 3, 7, 13, 21, ___ (differences +2, +4, +6, +8, +10). Find the next term.",
    options: [
        { text: "31", correct: true, feedback: "Differences increase by 2 each time. 21 + 10 = 31." },
        { text: "29", correct: false, feedback: "Adding only 8 would be 29, but the increase accelerates." },
        { text: "33", correct: false, feedback: "Adding 12 would skip a step." },
        { text: "30", correct: false, feedback: "Not following the +2, +4, +6… pattern." }
      ],
    backward: "Find the pattern of differences; they increase by 2 each time.",
    forward: "Quadratic sequences like n² - n + 1 appear in many problems."
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many factors does \\( 2^3 \\times 3^2 \\times 5^1 \\) have?",
    options: [
        { text: "24", correct: true, feedback: "(3+1)(2+1)(1+1) = 4×3×2 = 24." },
        { text: "12", correct: false, feedback: "Adding the exponents (3+2+1=6) is not the right method." },
        { text: "18", correct: false, feedback: "The formula multiplies (exponent+1) for each prime — it doesn't sum them." },
        { text: "30", correct: false, feedback: "Off by several." }
      ],
    backward: "Multiply (exponent+1) for each prime factor.",
    forward: "Factor counting is fundamental in combinatorics."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The HCF of two numbers is 2, and their LCM is 72. If one number is 18, what is the other?",
    options: [
        { text: "8", correct: true, feedback: "Other = (HCF × LCM) ÷ known = (2×72) ÷ 18 = 144 ÷ 18 = 8." },
        { text: "12", correct: false, feedback: "12×18=216, but HCF×LCM=144, a mismatch." },
        { text: "24", correct: false, feedback: "24×18=432." },
        { text: "36", correct: false, feedback: "36×18=648." }
      ],
    backward: "Product of numbers = HCF × LCM. Rearrange to find the unknown.",
    forward: "This relationship is a powerful tool in number theory."
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "The HCF of two numbers is 7. Their product is 1,470. Both numbers are less than 50. Find their sum.",
    options: [
        { text: "77", correct: true, feedback: "Numbers = 7a, 7b, a,b co-prime. 49ab = 1,470 → ab = 30. Co-prime pairs: (1,30) → 7,210 (too big); (2,15) → 14,105 (too big); (3,10) → 21,70 (too big); (5,6) → 35,42 (both <50). Sum = 35+42 = 77." },
        { text: "49", correct: false, feedback: "That's 7², not the sum." },
        { text: "70", correct: false, feedback: "Off by 7." },
        { text: "84", correct: false, feedback: "Check the co-prime pair again — the valid pair under 50 is (5,6), giving 35 and 42." }
      ],
    backward: "Express numbers as HCF × co-prime factors. Find pairs satisfying product and bound.",
    forward: "Bounded solutions are common in optimisation problems."
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "A number between 1 and 100 leaves remainder 1 when divided by 2, remainder 2 when divided by 3, remainder 3 when divided by 4, and remainder 4 when divided by 5. Find the number.",
    options: [
        { text: "59", correct: true, feedback: "Notice: remainder = divisor − 1 each time. So number+1 is divisible by 2,3,4,5. LCM(2,3,4,5)=60. Number = 60−1 = 59." },
        { text: "29", correct: false, feedback: "29+1=30, not divisible by 4." },
        { text: "119", correct: false, feedback: "Out of range (>100)." },
        { text: "60", correct: false, feedback: "60 leaves remainder 0 when divided by these, not the required remainders." }
      ],
    backward: "Notice the pattern: remainder = divisor - 1 each time. So number+1 is a multiple of all divisors.",
    forward: "This leads to the Chinese Remainder Theorem."
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "A square has area \\( 2^4 \\times 3^2 \\) cm². What is its perimeter?",
    options: [
        { text: "48 cm", correct: true, feedback: "Area = 16×9 = 144 cm². Side = √144 = 12 cm. Perimeter = 4×12 = 48 cm." },
        { text: "12 cm", correct: false, feedback: "That's the side length, not the perimeter." },
        { text: "24 cm", correct: false, feedback: "That's the sum of two sides, or 2×12." },
        { text: "36 cm", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Side = √area. Then perimeter = 4 × side.",
    forward: "Geometry and prime factorisation are directly linked."
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "First term is 1. Each term is the sum of all previous terms plus 1. Find the 5th term.",
    options: [
        { text: "16", correct: true, feedback: "t1=1; t2=1+1=2; t3=1+2+1=4; t4=1+2+4+1=8; t5=1+2+4+8+1=16." },
        { text: "15", correct: false, feedback: "1+2+4+8=15, but you must add 1 again." },
        { text: "31", correct: false, feedback: "1+2+4+8+16=31, that's the sum of the first 5 terms, not the 5th term itself." },
        { text: "10", correct: false, feedback: "Incorrect pattern." }
      ],
    backward: "Build the sequence step-by-step. It doubles each time.",
    forward: "Recursive sequences are the basis of fractals and programming."
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "What is the smallest positive integer that has exactly 9 factors?",
    options: [
        { text: "36", correct: true, feedback: "9 factors: either p⁸ or p²q². Smallest is 2²×3² = 4×9 = 36. 2⁸=256, which is larger." },
        { text: "100", correct: false, feedback: "100=2²×5² also has 9 factors, but it's larger than 36." },
        { text: "48", correct: false, feedback: "48=2⁴×3 → (4+1)(1+1)=10 factors." },
        { text: "64", correct: false, feedback: "64=2⁶ → 7 factors." }
      ],
    backward: "Factor count 9 → either p⁸ or p²q². Take the smallest primes.",
    forward: "Factor count patterns lead to the concept of divisor functions."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The product of two numbers is 2,160. Their HCF is 6. What is their LCM?",
    options: [
        { text: "360", correct: true, feedback: "LCM = product ÷ HCF = 2,160 ÷ 6 = 360." },
        { text: "36", correct: false, feedback: "You divided by 60 instead of 6." },
        { text: "60", correct: false, feedback: "That's 2,160 ÷ 36." },
        { text: "2,160", correct: false, feedback: "That's the product, not the LCM." }
      ],
    backward: "LCM = product ÷ HCF.",
    forward: "This identity is key to solving many number puzzles."
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "What is the largest perfect square that divides \\( 2^3 \\times 3^4 \\times 5 \\)?",
    options: [
        { text: "324", correct: true, feedback: "For a square divisor, exponents must be even and ≤ given: 2² (≤3), 3⁴ (≤4), 5⁰ (≤1). So 2²×3⁴ = 4×81 = 324." },
        { text: "648", correct: false, feedback: "2³×3⁴=648, not a square (exponent of 2 is odd)." },
        { text: "18", correct: false, feedback: "2×3²=18, a square divisor but not the largest." },
        { text: "2⁴×3⁴", correct: false, feedback: "Exponent of 2 is too high (4 > 3)." }
      ],
    backward: "For a perfect square divisor, every exponent must be even and at most the given exponent.",
    forward: "This idea is used when simplifying radicals."
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which statement is FALSE? A) Divisible by 6 → divisible by 3. B) Divisible by 3 and 5 → divisible by 15. C) Divisible by 4 and 6 → divisible by 24. D) Divisible by 9 → divisible by 3.",
    options: [
        { text: "C", correct: true, feedback: "Counterexample: 12 is divisible by 4 and 6, but not by 24. So C is false." },
        { text: "A", correct: false, feedback: "True: if a number is divisible by 6, it's divisible by 2 and 3, hence certainly by 3." },
        { text: "B", correct: false, feedback: "True: 3 and 5 are co-prime, so divisibility by both implies divisibility by 15." },
        { text: "D", correct: false, feedback: "True: any multiple of 9 is also a multiple of 3." }
      ],
    backward: "Test each statement with a counterexample. For C, 12 is divisible by 4 and 6 but not 24.",
    forward: "Logical implications with divisibility build proof skills."
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "\\( \\sqrt{2^6 \\times 5^4 \\times 7^2} \\) = ?",
    options: [
        { text: "1,400", correct: true, feedback: "Halve exponents: 2³ × 5² × 7 = 8 × 25 × 7 = 1,400." },
        { text: "700", correct: false, feedback: "You halved the final result instead of the exponents." },
        { text: "2,800", correct: false, feedback: "You doubled instead of halving the exponents." },
        { text: "1,000", correct: false, feedback: "Off by several factors." }
      ],
    backward: "Halve each exponent and multiply.",
    forward: "This technique is essential for simplifying large radicals."
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "The nth term of a sequence is \\( n^2 + n \\). Find the 7th term.",
    options: [
        { text: "56", correct: true, feedback: "7² + 7 = 49 + 7 = 56." },
        { text: "42", correct: false, feedback: "That's 6²+6, the 6th term." },
        { text: "72", correct: false, feedback: "That's 8²+8, the 8th term." },
        { text: "49", correct: false, feedback: "That's just 7², forgot the +n." }
      ],
    backward: "Substitute n=7 into the formula.",
    forward: "Quadratic sequences model area and projectile motion."
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "What is the smallest positive integer by which \\( 2^5 \\times 3^2 \\times 7^2 \\) must be multiplied to become a perfect square?",
    options: [
        { text: "2", correct: true, feedback: "Exponents: 5 (odd), 2 (even), 2 (even). Need one more 2 to make the exponent 6 (even). Multiply by 2." },
        { text: "4", correct: false, feedback: "Multiplying by 4 (=2²) would make the exponent of 2 equal to 7, still odd." },
        { text: "3", correct: false, feedback: "The exponent of 3 is already even (2)." },
        { text: "1", correct: false, feedback: "The number is not a perfect square as is." }
      ],
    backward: "To make a perfect square, all exponents must be even. Find the missing prime factors.",
    forward: "This is used in rationalising denominators and solving Diophantine equations."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Three bells ring every 12 min, 18 min, and 20 min. They ring together at 10:00 AM. When will they next ring together?",
    options: [
        { text: "1:00 PM", correct: true, feedback: "LCM(12,18,20) = 180 min = 3 hours. 10:00 AM + 3 h = 1:00 PM." },
        { text: "12:00 PM", correct: false, feedback: "The LCM is not 120 minutes." },
        { text: "12:30 PM", correct: false, feedback: "150 minutes is not a common multiple of 12,18,20." },
        { text: "2:00 PM", correct: false, feedback: "240 minutes is a common multiple but not the next (least)." }
      ],
    backward: "Find the LCM of the three intervals.",
    forward: "Scheduling problems with multiple periods use LCM."
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Ribbons are 252 cm, 308 cm, and 364 cm long. They are cut into equal pieces of the greatest possible length. How many pieces are there in total?",
    options: [
        { text: "33", correct: true, feedback: "HCF(252,308,364) = 28 cm. Total pieces = (252+308+364) ÷ 28 = 924 ÷ 28 = 33." },
        { text: "28", correct: false, feedback: "That's the length of each piece, not the number of pieces." },
        { text: "66", correct: false, feedback: "That would be the count if the piece length were 14 cm." },
        { text: "924", correct: false, feedback: "That's the total length, not the number of pieces." }
      ],
    backward: "Greatest piece length = HCF. Total pieces = sum of lengths ÷ piece length.",
    forward: "This is a classic application of HCF in measurement."
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the largest digit □ such that 3,45□ is divisible by 12.",
    options: [
        { text: "6", correct: true, feedback: "Divisible by 12 means divisible by 3 and 4. For 4: last two digits 5□ divisible by 4 → □=2 or 6. For 3: digit sum 3+4+5+□ = 12+□ multiple of 3 → □=6 (sum 18). Largest = 6." },
        { text: "2", correct: false, feedback: "2 works for 4 (52÷4=13), but the digit sum 14 is not a multiple of 3." },
        { text: "8", correct: false, feedback: "58 is not divisible by 4." },
        { text: "4", correct: false, feedback: "54 is not divisible by 4." }
      ],
    backward: "Divisible by 12 → divisible by 3 and 4. Check 4 first (last two digits), then 3.",
    forward: "Combining divisibility rules is a frequent puzzle type."
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Find the smallest perfect square greater than 500 that ends in 4.",
    options: [
        { text: "784", correct: true, feedback: "Squares ending in 4 come from numbers ending in 2 or 8. 22²=484 (<500). 28²=784 (ends in 4, >500). 32²=1024 (larger). So 784." },
        { text: "484", correct: false, feedback: "484 < 500." },
        { text: "676", correct: false, feedback: "26²=676, ends in 6, not 4." },
        { text: "1024", correct: false, feedback: "32²=1024, larger than 784." }
      ],
    backward: "Numbers ending in 2 or 8 produce squares ending in 4. Test from 22² upward.",
    forward: "Square root estimation and ending-digit analysis."
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 4, 10, 19, 31, ___ (differences +3, +6, +9, +12, next +15). Find the 6th term.",
    options: [
        { text: "46", correct: true, feedback: "31 + 15 = 46." },
        { text: "43", correct: false, feedback: "Adding only 12 gives 43, but the next difference is 15." },
        { text: "45", correct: false, feedback: "Adding 14 doesn't follow the +3 jump pattern." },
        { text: "50", correct: false, feedback: "Adding 19 is too large." }
      ],
    backward: "Look at differences: +3, +6, +9, +12. They increase by 3 each time.",
    forward: "Quadratic sequences often appear as patterns of dots or blocks."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number between 50 and 100 has three distinct prime factors, sum of exponents 4, smallest prime factor 2, is a multiple of 5, and its tens digit is even. Find the number.",
    options: [
        { text: "60", correct: true, feedback: "60 = 2²×3×5, tens digit 6 (even), meets all conditions." },
        { text: "84", correct: false, feedback: "84 = 2²×3×7, not a multiple of 5." },
        { text: "90", correct: false, feedback: "90 = 2×3²×5, exponent sum 4, but tens digit 9 (odd)." },
        { text: "70", correct: false, feedback: "70 = 2×5×7, three distinct primes but exponent sum 3, not 4." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "HCF = 4, LCM = 120. One number is 24. Find the other.",
    options: [
        { text: "20", correct: true, feedback: "(4×120) ÷ 24 = 480 ÷ 24 = 20." },
        { text: "30", correct: false, feedback: "Product would be 30×24=720, but HCF×LCM=480, a mismatch." },
        { text: "120", correct: false, feedback: "That's the LCM." },
        { text: "4", correct: false, feedback: "That's the HCF." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "HCF = 9. Product = 1,215. Both numbers are less than 100 and greater than 10. Find their sum.",
    options: [
        { text: "72", correct: true, feedback: "Numbers 9a,9b, a,b co-prime. 81ab = 1215 → ab = 15. Co-prime pairs: (1,15) → 9,135 (135>100); (3,5) → 27,45 (both between 10 and 100). Sum = 27+45 = 72." },
        { text: "36", correct: false, feedback: "That doesn't match a valid co-prime pair." },
        { text: "54", correct: false, feedback: "If the numbers were 18,36, their HCF would be 18, not 9." },
        { text: "108", correct: false, feedback: "Too large." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest 3-digit number divisible by 7 that leaves remainder 5 when divided by 6.",
    options: [
        { text: "119", correct: true, feedback: "Multiples of 7: 105 (105÷6=17 R3), 112 (112÷6=18 R4), 119 (119÷6=19 R5). Smallest is 119." },
        { text: "105", correct: false, feedback: "Remainder 3, not 5." },
        { text: "125", correct: false, feedback: "Not a multiple of 7." },
        { text: "113", correct: false, feedback: "Not a multiple of 7." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "\\( \\sqrt{3^4 \\times 5^2 \\times 2^2} \\) = ?",
    options: [
        { text: "90", correct: true, feedback: "3² × 5 × 2 = 9 × 10 = 90." },
        { text: "45", correct: false, feedback: "Halving the result again loses a factor of 2." },
        { text: "180", correct: false, feedback: "That's twice 90." },
        { text: "30", correct: false, feedback: "Missing the factor of 3." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "2, 5, 11, 23, ___ (×2 + 1). Find the next term.",
    options: [
        { text: "47", correct: true, feedback: "23×2+1 = 46+1 = 47." },
        { text: "46", correct: false, feedback: "×2 without +1." },
        { text: "48", correct: false, feedback: "×2+2, not the rule." },
        { text: "45", correct: false, feedback: "Doesn't follow the rule." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many factors of \\( 2^4 \\times 3^2 \\) are perfect squares?",
    options: [
        { text: "6", correct: true, feedback: "For 2: even exponents 0,2,4 (3 choices). For 3: even exponents 0,2 (2 choices). Total = 3×2 = 6." },
        { text: "4", correct: false, feedback: "You might have missed some even exponents." },
        { text: "8", correct: false, feedback: "Overcount." },
        { text: "12", correct: false, feedback: "That's the total factor count, not just the square factors." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Three bells ring every 15 min, 25 min, and 30 min. They ring together at 12:00 PM. Next together?",
    options: [
        { text: "2:30 PM", correct: true, feedback: "LCM(15,25,30) = 150 min = 2.5 hours. 12:00 + 2:30 = 2:30 PM." },
        { text: "1:00 PM", correct: false, feedback: "60 min is not a common multiple." },
        { text: "2:00 PM", correct: false, feedback: "120 min is not the LCM." },
        { text: "3:00 PM", correct: false, feedback: "180 min is a common multiple but not the least." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Largest perfect square dividing \\( 2^5 \\times 3^3 \\times 7 \\) is:",
    options: [
        { text: "144", correct: true, feedback: "Even exponents ≤ given: 2⁴ (≤5), 3² (≤3), 7⁰. 2⁴×3² = 16×9 = 144." },
        { text: "72", correct: false, feedback: "2³×3²=72, not a square (exponent of 2 odd)." },
        { text: "288", correct: false, feedback: "2⁵×3²=288, exponent of 2 odd." },
        { text: "432", correct: false, feedback: "2⁴×3³=432, exponent of 3 odd." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which is FALSE? A) Divisible by 10 → divisible by 2 and 5. B) Divisible by 6 → divisible by 2 and 3. C) Divisible by 9 → divisible by 3. D) Divisible by 3 and 6 → divisible by 9.",
    options: [
        { text: "D", correct: true, feedback: "Counterexample: 6 is divisible by 3 and 6, but not by 9." },
        { text: "A", correct: false, feedback: "True." },
        { text: "B", correct: false, feedback: "True." },
        { text: "C", correct: false, feedback: "True." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Smallest perfect square >200 ending in 6.",
    options: [
        { text: "256", correct: true, feedback: "16²=256, ends in 6, >200. 14²=196 (<200)." },
        { text: "196", correct: false, feedback: "196 < 200." },
        { text: "216", correct: false, feedback: "Not a perfect square." },
        { text: "324", correct: false, feedback: "18²=324, larger than 256." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "nth term = \\( 3n^2 - 2n + 1 \\). Find the 4th term.",
    options: [
        { text: "41", correct: true, feedback: "3×16 − 2×4 + 1 = 48 − 8 + 1 = 41." },
        { text: "33", correct: false, feedback: "Doesn't match the formula for n=4." },
        { text: "49", correct: false, feedback: "That's 7², not the formula's result." },
        { text: "25", correct: false, feedback: "Incorrect." }
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
    title: "Factors, Multiples & Number Properties — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning: factor-count equations, HCF/LCM identities, combined divisibility constraints, radicals with exponents, and non-routine sequences.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Synthesis Tips</strong><br>' +
      "&bull; Factor count = (exponent+1) multiplied for each prime.<br>" +
      "&bull; Product of two numbers = HCF × LCM — use to find unknowns.<br>" +
      "&bull; For co-prime numbers, HCF=1; LCM is their product.<br>" +
      "&bull; When multiple divisibility rules apply, first find the LCM of the divisors.<br>" +
      "&bull; A number is a perfect square if every exponent in its prime factorisation is even.<br>" +
      "&bull; Sequences: look for pattern in differences, recursive rules (×2+1), or formulas like n².<br>",
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

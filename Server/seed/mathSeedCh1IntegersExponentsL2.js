// seed/mathSeedCh1IntegersExponentsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 1
// (Integers, Powers & Roots), Level 2 — converted from the standalone
// HTML file ch1-integers-exponents-level-2.html.
//
// Run with: node seed/mathSeedCh1IntegersExponentsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-1-integers-exponents";
const CHAPTER_NAME = "Integers, Powers & Roots";
const LEVEL = 2;

const CLUSTER_NAMES = {
  A: "Adding/Subtracting Negatives",
  M: "Multiplying/Dividing Negatives",
  P: "Powers",
  R: "Roots",
  O: "Order of Operations",
  PR: "Prime Factorisation",
  E: "Estimation",
  X: "Extension"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "Evaluate: \\(-5 + (-3) - (-2)\\)",
    options: [
      { text: "-6", correct: true, feedback: "Correct. -5-3+2 = -6." },
      { text: "0", correct: false, feedback: "You added all numbers as positive." },
      { text: "-4", correct: false, feedback: "Check the signs carefully." },
      { text: "6", correct: false, feedback: "You changed all signs to positive." }
    ],
    retryHint: "Subtracting a negative is adding a positive." },
  { itemId: "w2", order: 2, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "\\((-2) \\times 3 \\times (-1) \\times (-2) =\\)",
    options: [
      { text: "-12", correct: true, feedback: "Correct. Three negatives give a negative product." },
      { text: "12", correct: false, feedback: "You counted the negatives incorrectly." },
      { text: "-8", correct: false, feedback: "You multiplied incorrectly." },
      { text: "8", correct: false, feedback: "You dropped all negatives." }
    ],
    retryHint: "Count the negative signs: three → odd → negative." },
  { itemId: "w3", order: 3, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Which is larger: \\(2^5\\) or \\(3^3\\)?",
    options: [
      { text: "2⁵", correct: true, feedback: "Correct. 2⁵=32, 3³=27." },
      { text: "3³", correct: false, feedback: "27 < 32." },
      { text: "They are equal", correct: false, feedback: "They are not equal." }
    ],
    retryHint: "Calculate both: 2×2×2×2×2 = 32, 3×3×3 = 27." },
  { itemId: "w4", order: 4, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "\\(\\sqrt{144} - \\sqrt{36} =\\)",
    options: [
      { text: "6", correct: true, feedback: "Correct. 12 - 6 = 6." },
      { text: "18", correct: false, feedback: "You added the roots." },
      { text: "-6", correct: false, feedback: "You subtracted 36 from 144." },
      { text: "108", correct: false, feedback: "You multiplied the roots." }
    ],
    retryHint: "√144 = 12, √36 = 6." },
  { itemId: "w5", order: 5, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "Insert brackets to make \\(12 \\div 2 + 4 \\times 3 = 6\\) true.",
    options: [
      { text: "12 ÷ (2 + 4) × 3", correct: true, feedback: "Correct. 12 ÷ 6 × 3 = 6." },
      { text: "(12 ÷ 2) + 4 × 3", correct: false, feedback: "That gives 6+12=18." },
      { text: "12 ÷ 2 + (4 × 3)", correct: false, feedback: "That's 6+12=18." },
      { text: "(12 ÷ 2 + 4) × 3", correct: false, feedback: "(6+4)×3=30." }
    ],
    retryHint: "Try making the denominator 6." },
  { itemId: "w6", order: 6, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Write the prime factorisation of 100 using indices.",
    options: [
      { text: "2² × 5²", correct: true, feedback: "Correct." },
      { text: "2 × 2 × 5 × 5", correct: false, feedback: "This is correct but should use index notation." },
      { text: "10²", correct: false, feedback: "10 is not prime." },
      { text: "2⁵ × 5", correct: false, feedback: "2⁵=32, not a factor of 100." }
    ],
    retryHint: "100 = 2×50 = 2×2×25 = 2²×5²." },
  { itemId: "w7", order: 7, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "Estimate \\(\\frac{98 + 103}{5.1}\\) to the nearest integer.",
    options: [
      { text: "40", correct: true, feedback: "Correct. (100+100)/5 = 200/5 = 40." },
      { text: "20", correct: false, feedback: "You halved the answer." },
      { text: "80", correct: false, feedback: "You doubled the answer." },
      { text: "100", correct: false, feedback: "You only added the numerators." }
    ],
    retryHint: "Round 98→100, 103→100, 5.1→5." },
  { itemId: "w8", order: 8, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "If \\(a = -2\\), evaluate \\(3a^2 - 2a\\).",
    options: [
      { text: "16", correct: true, feedback: "Correct. 3×4 + 4 = 16." },
      { text: "-16", correct: false, feedback: "You squared -2 as -4." },
      { text: "8", correct: false, feedback: "You did 3×4 - 2×(-2) incorrectly." },
      { text: "-8", correct: false, feedback: "Sign errors." }
    ],
    retryHint: "a² = 4; -2a = +4." },
  { itemId: "w9", order: 9, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Find the HCF of 18 and 24.",
    options: [
      { text: "6", correct: true, feedback: "Correct. 18=2×3², 24=2³×3; HCF=2×3=6." },
      { text: "12", correct: false, feedback: "12 is not a factor of 18." },
      { text: "3", correct: false, feedback: "3 is a common factor, but not the highest." },
      { text: "72", correct: false, feedback: "That's the LCM." }
    ],
    retryHint: "List factors: 18 (1,2,3,6,9,18); 24 (1,2,3,4,6,8,12,24); highest common is 6." },
  { itemId: "w10", order: 10, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Find the LCM of 6 and 8.",
    options: [
      { text: "24", correct: true, feedback: "Correct. 6=2×3, 8=2³; LCM=2³×3=24." },
      { text: "48", correct: false, feedback: "You multiplied them directly." },
      { text: "12", correct: false, feedback: "12 is a multiple of 6 but not 8." },
      { text: "2", correct: false, feedback: "That's the HCF." }
    ],
    retryHint: "Multiples of 8: 8,16,24,… which is also a multiple of 6." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "Find the missing digit: \\(-1\\square + 7 - (-4) = -1\\).",
    options: [
      { text: "2", correct: true, feedback: "Correct. -12+7+4 = -1." },
      { text: "3", correct: false, feedback: "-13+11 = -2." },
      { text: "5", correct: false, feedback: "-15+11 = -4." },
      { text: "0", correct: false, feedback: "-10+11 = 1." }
    ],
    backward: "Work backwards through the operations.",
    forward: "This is the first step towards solving algebraic equations." },
  { itemId: "d2", order: 2, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "What is the sign of \\((-1) \\times 2 \\times (-3) \\times 4 \\times (-5) \\times \\dots \\times (-99) \\times 100\\)?",
    options: [
      { text: "Positive", correct: true, feedback: "Correct. There are 50 negative terms (odd numbers), an even count → positive." },
      { text: "Negative", correct: false, feedback: "50 negatives is an even number, so the product is positive." },
      { text: "Zero", correct: false, feedback: "None of the factors are zero." },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined by the parity of the negative count." }
    ],
    backward: "Counting negative terms in a product chain.",
    forward: "Parity arguments are used in many areas of mathematics." },
  { itemId: "d3", order: 3, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Which of the following equals \\(8^2\\)?",
    options: [
      { text: "2⁶", correct: true, feedback: "Correct. 8=2³, so 8²=(2³)²=2⁶=64." },
      { text: "4⁴", correct: false, feedback: "4⁴=256." },
      { text: "(-8)³", correct: false, feedback: "-512." },
      { text: "2³ × 4", correct: false, feedback: "8×4=32." }
    ],
    backward: "Rewriting powers with a common base.",
    forward: "This skill is essential for exponent rules in algebra." },
  { itemId: "d4", order: 4, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "Between which two consecutive integers does \\(\\sqrt{200}\\) lie?",
    options: [
      { text: "14 and 15", correct: true, feedback: "Correct. 14²=196, 15²=225." },
      { text: "13 and 14", correct: false, feedback: "13²=169, too low." },
      { text: "15 and 16", correct: false, feedback: "15²=225, already above 200." },
      { text: "10 and 20", correct: false, feedback: "Too wide; the question asks for consecutive integers." }
    ],
    backward: "Use perfect squares to bound the root.",
    forward: "Estimating irrationals is important in geometry and measurement." },
  { itemId: "d5", order: 5, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "Insert one pair of brackets to make \\(6 + 4 \\times 3 - 2 = 28\\) true.",
    options: [
      { text: "(6 + 4) × 3 - 2", correct: true, feedback: "Correct. 10×3-2=28." },
      { text: "6 + 4 × (3 - 2)", correct: false, feedback: "6+4×1=10." },
      { text: "(6 + 4 × 3) - 2", correct: false, feedback: "(6+12)-2=16." },
      { text: "6 + (4 × 3 - 2)", correct: false, feedback: "6+10=16." }
    ],
    backward: "Brackets change the order of operations.",
    forward: "This skill is vital for writing correct formulas." },
  { itemId: "d6", order: 6, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "How many distinct prime factors does 210 have?",
    options: [
      { text: "4", correct: true, feedback: "Correct. 210 = 2×3×5×7 → four distinct primes." },
      { text: "3", correct: false, feedback: "You missed one prime factor." },
      { text: "5", correct: false, feedback: "There aren't five distinct primes." },
      { text: "6", correct: false, feedback: "Too many." }
    ],
    backward: "Prime factorisation of a number into distinct primes.",
    forward: "This is used in cryptography and number theory." },
  { itemId: "d7", order: 7, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "Estimate \\(\\sqrt{99 \\times 101}\\) to the nearest integer.",
    options: [
      { text: "100", correct: true, feedback: "Correct. 99×101≈100×100=10000, √10000=100." },
      { text: "99", correct: false, feedback: "The product is near 10000, not 99²." },
      { text: "101", correct: false, feedback: "The product is slightly less than 10000." },
      { text: "1000", correct: false, feedback: "√10000 is 100, not 1000." }
    ],
    backward: "Rounding to simplify before taking a square root.",
    forward: "Estimation helps check the reasonableness of answers." },
  { itemId: "d8", order: 8, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "Prove that \\((-1)^n + (-1)^{n+1} = 0\\) for any integer \\(n\\). Which statement completes the proof?",
    options: [
      { text: "One term is 1 and the other is -1", correct: true, feedback: "Correct. If n is even, (-1)^n=1 and (-1)^(n+1)=-1; if n is odd, the reverse; sum is 0." },
      { text: "The two terms are always equal", correct: false, feedback: "They have opposite signs." },
      { text: "The sum is 0 only when n is even", correct: false, feedback: "It is 0 for all n." },
      { text: "The exponents are consecutive so the terms cancel", correct: false, feedback: "That is true, but option 1 is more precise." }
    ],
    backward: "Parity of exponents for powers of -1.",
    forward: "This pattern appears in alternating series." },
  { itemId: "d9", order: 9, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "Which expression has a value closest to zero?",
    options: [
      { text: "-6 + 8", correct: true, feedback: "Correct. 2 is closest to zero." },
      { text: "5 - (-3)", correct: false, feedback: "8." },
      { text: "-4 - 6", correct: false, feedback: "-10." },
      { text: "-2 + (-3)", correct: false, feedback: "-5." }
    ],
    backward: "Evaluate and compare absolute values.",
    forward: "Comparing magnitudes is useful in error analysis." },
  { itemId: "d10", order: 10, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "If \\(a \\times b \\times c\\) is positive and \\(a \\times b\\) is negative, what must be true about \\(c\\)?",
    options: [
      { text: "c is negative", correct: true, feedback: "Correct. Negative (a×b) times c must be positive, so c must be negative." },
      { text: "c is positive", correct: false, feedback: "Then the product would be negative." },
      { text: "c is zero", correct: false, feedback: "Zero would make the product zero." },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined." }
    ],
    backward: "Sign rules for products.",
    forward: "Logical reasoning about unknown signs is used in inequalities." },
  { itemId: "d11", order: 11, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Without direct calculation, which is larger: \\(2^{20}\\) or \\(3^{12}\\)?",
    options: [
      { text: "2²⁰", correct: true, feedback: "Correct. 2²⁰=(2⁵)⁴=32⁴, 3¹²=(3³)⁴=27⁴, and 32⁴ > 27⁴." },
      { text: "3¹²", correct: false, feedback: "27⁴ < 32⁴." },
      { text: "They are equal", correct: false, feedback: "They are not." },
      { text: "Cannot be determined", correct: false, feedback: "We can compare by rewriting with the same exponent." }
    ],
    backward: "Rewriting powers to compare them.",
    forward: "Exponential comparisons are common in science and finance." },
  { itemId: "d12", order: 12, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "Simplify: \\(\\sqrt{(-4)^2} + \\sqrt[3]{-27}\\)",
    options: [
      { text: "1", correct: true, feedback: "Correct. √16=4, cube root of -27 = -3, sum = 1." },
      { text: "-1", correct: false, feedback: "4 + (-3) = 1, not -1." },
      { text: "7", correct: false, feedback: "You added absolute values." },
      { text: "-7", correct: false, feedback: "Both roots are not negative." }
    ],
    backward: "Principal square root and cube root of a negative.",
    forward: "Handling multiple root types is important in advanced algebra." },
  { itemId: "d13", order: 13, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "In the expression \\(4 + 6 \\div 2 \\times 3\\), which operation should be performed first to follow BIDMAS correctly?",
    options: [
      { text: "Division", correct: true, feedback: "Correct. Division and multiplication left to right; division comes first." },
      { text: "Addition", correct: false, feedback: "Addition has lower precedence." },
      { text: "Multiplication", correct: false, feedback: "Multiplication has equal precedence, but division is to its left." },
      { text: "Subtraction", correct: false, feedback: "There is no subtraction." }
    ],
    backward: "Order of operations rules.",
    forward: "Correct precedence is essential for accurate formula evaluation." },
  { itemId: "d14", order: 14, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Find the smallest positive integer that has exactly 6 positive factors.",
    options: [
      { text: "12", correct: true, feedback: "Correct. 12=2²×3 has 6 factors: 1,2,3,4,6,12." },
      { text: "16", correct: false, feedback: "16=2⁴ has 5 factors." },
      { text: "18", correct: false, feedback: "18=2×3² also has 6 factors, but 12 is smaller." },
      { text: "64", correct: false, feedback: "You multiplied the exponents (2×3=6) and used 2⁶=64. Factor counting requires adding 1 to each exponent and multiplying: (2+1)×(1+1)=6." }
    ],
    backward: "Number of factors from prime factorisation.",
    forward: "This leads to understanding divisor functions in number theory." },
  { itemId: "d15", order: 15, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "Without adding, which sum is larger: \\(1+2+3+\\dots+20\\) or \\(2+4+6+\\dots+40\\)?",
    options: [
      { text: "The second", correct: true, feedback: "Correct. The second series is double the first." },
      { text: "The first", correct: false, feedback: "The first is half of the second." },
      { text: "They are equal", correct: false, feedback: "Doubling each term doubles the sum." },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined without adding." }
    ],
    backward: "Comparing sums by recognising factors.",
    forward: "This kind of reasoning is used in series and sequences." },
  { itemId: "d16", order: 16, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "Find all integer values of \\(x\\) such that \\(x^2 < 10\\).",
    options: [
      { text: "-3, -2, -1, 0, 1, 2, 3", correct: true, feedback: "Correct. Squares of these are ≤9." },
      { text: "-4, -3, -2, -1, 0, 1, 2, 3, 4", correct: false, feedback: "4²=16, not <10." },
      { text: "-3, -2, -1, 1, 2, 3", correct: false, feedback: "0 is missing; 0²=0 <10." },
      { text: "0, 1, 2, 3", correct: false, feedback: "Negative integers also satisfy the inequality." }
    ],
    backward: "Solving simple quadratic inequalities.",
    forward: "This is a foundation for solving more complex inequalities." },
  { itemId: "d17", order: 17, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "If \\(a\\) is a negative integer and \\(a + b = 3\\), which of the following could be the value of \\(b\\)?",
    options: [
      { text: "5", correct: true, feedback: "Correct. If a is negative, b must be greater than 3; 5 is possible (e.g., a=-2)." },
      { text: "-5", correct: false, feedback: "That would give a negative sum." },
      { text: "3", correct: false, feedback: "Then a would be 0, not negative." },
      { text: "-3", correct: false, feedback: "Then a would be 6, not negative." }
    ],
    backward: "Reasoning about negative numbers in equations.",
    forward: "This informal reasoning leads to solving linear equations." },
  { itemId: "d18", order: 18, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "Evaluate: \\(\\frac{(-2)^3 \\times (-3)^2}{(-1)^5}\\)",
    options: [
      { text: "72", correct: true, feedback: "Correct. (-8)×9/(-1)= -72/(-1)=72." },
      { text: "-72", correct: false, feedback: "You forgot the division by -1 flips the sign." },
      { text: "36", correct: false, feedback: "You miscalculated a power." },
      { text: "-36", correct: false, feedback: "Sign and power error." }
    ],
    backward: "Combining powers with division and signs.",
    forward: "Evaluating complex expressions prepares for algebraic fractions." },
  { itemId: "d19", order: 19, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Solve for \\(x\\): \\(2^x = 8^4\\)",
    options: [
      { text: "12", correct: true, feedback: "Correct. 8⁴=(2³)⁴=2¹², so x=12." },
      { text: "4", correct: false, feedback: "You equated the exponents without converting bases." },
      { text: "8", correct: false, feedback: "You multiplied the base by the exponent." },
      { text: "16", correct: false, feedback: "2¹⁶ is not 8⁴." }
    ],
    backward: "Rewriting numbers as powers of a common base.",
    forward: "This technique is used when solving exponential equations." },
  { itemId: "d20", order: 20, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "A square has area 50 cm². Estimate its side length to one decimal place.",
    options: [
      { text: "7.1", correct: true, feedback: "Correct. √50 ≈ 7.07, which rounds to 7.1." },
      { text: "7.0", correct: false, feedback: "7.0²=49, but the side is slightly larger." },
      { text: "7.5", correct: false, feedback: "7.5²=56.25, too high." },
      { text: "7.07", correct: false, feedback: "This is a more precise value, but the question asks for one decimal place." }
    ],
    backward: "Estimating square roots in a geometric context.",
    forward: "This skill is used when working with lengths and areas." },
  { itemId: "d21", order: 21, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "Evaluate: \\(-2 \\times (3 - 5)^2 + 4 \\times (-1)^3\\)",
    options: [
      { text: "-12", correct: true, feedback: "Correct. (-2)²=4, -2×4=-8; (-1)³=-1, 4×(-1)=-4; sum -12." },
      { text: "4", correct: false, feedback: "You missed a negative sign." },
      { text: "-4", correct: false, feedback: "You mishandled the powers." },
      { text: "12", correct: false, feedback: "You dropped the negatives." }
    ],
    backward: "Order of operations with powers and negatives.",
    forward: "Multi-step evaluations like this appear in coordinate geometry." },
  { itemId: "d22", order: 22, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "If \\(a = 2^3 \\times 3^2\\) and \\(b = 2^2 \\times 3^3\\), find the HCF of \\(a\\) and \\(b\\).",
    options: [
      { text: "36", correct: true, feedback: "Correct. HCF = 2²×3² = 36." },
      { text: "6", correct: false, feedback: "That's only 2×3." },
      { text: "12", correct: false, feedback: "That's 2²×3." },
      { text: "72", correct: false, feedback: "That's the LCM." }
    ],
    backward: "Finding HCF from prime factorisation.",
    forward: "HCF is essential for simplifying algebraic fractions." },
  { itemId: "d23", order: 23, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "How many digits does \\(2^8 \\times 5^8\\) have?",
    options: [
      { text: "9", correct: true, feedback: "Correct. 2⁸×5⁸=10⁸, which is 1 followed by 8 zeros → 9 digits." },
      { text: "8", correct: false, feedback: "10⁸ has 9 digits (100,000,000)." },
      { text: "10", correct: false, feedback: "10⁸ has 9 digits." },
      { text: "16", correct: false, feedback: "You added the exponents 8+8=16 instead of recognising that 2⁸×5⁸ = (2×5)⁸ = 10⁸." }
    ],
    backward: "Using properties of powers to find digit count.",
    forward: "This connects powers with place value and scientific notation." },
  { itemId: "d24", order: 24, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "Find the smallest integer greater than 1 that is both a perfect square and a perfect cube.",
    options: [
      { text: "64", correct: true, feedback: "Correct. 64 = 8² = 4³." },
      { text: "8", correct: false, feedback: "8 = 2³ but not a perfect square." },
      { text: "16", correct: false, feedback: "16 = 4² but not a perfect cube." },
      { text: "256", correct: false, feedback: "256=16², but 256 is not a perfect cube; 64 is the smallest." }
    ],
    backward: "Smallest number that is a 6th power.",
    forward: "This type of problem appears in number theory and Olympiad maths." },
  { itemId: "d25", order: 25, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "A sequence starts at -10. Each term is obtained by adding 3, then multiplying by -1. Find the third term.",
    options: [
      { text: "-10", correct: true, feedback: "Correct. 1st: -10; 2nd: (-10+3)×(-1)=7; 3rd: (7+3)×(-1)=-10." },
      { text: "10", correct: false, feedback: "You might have dropped the negative at the end." },
      { text: "-4", correct: false, feedback: "You skipped a multiplication." },
      { text: "4", correct: false, feedback: "Sign errors." }
    ],
    backward: "Sequence with alternating signs.",
    forward: "This leads to understanding recursive sequences." },
  { itemId: "d26", order: 26, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Two numbers have an LCM of 60 and an HCF of 6. One number is 12. What is the other number?",
    options: [
      { text: "30", correct: true, feedback: "Correct. Product = HCF×LCM = 360; 360÷12 = 30." },
      { text: "20", correct: false, feedback: "12×20=240, not 360." },
      { text: "18", correct: false, feedback: "12×18=216, not 360." },
      { text: "36", correct: false, feedback: "12×36=432, not 360." }
    ],
    backward: "Relationship between HCF, LCM, and the product.",
    forward: "This relationship is used in number theory and algebra." },
  { itemId: "d27", order: 27, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "Find the missing number: \\((-2) \\times 3 \\times \\square \\times (-4) = -24\\)",
    options: [
      { text: "-1", correct: true, feedback: "Correct. (-2)×3=-6; -6×(-4)=24; 24×(-1)=-24." },
      { text: "1", correct: false, feedback: "24×1=24, not -24." },
      { text: "2", correct: false, feedback: "24×2=48." },
      { text: "-2", correct: false, feedback: "24×(-2)=-48." }
    ],
    backward: "Balancing a product with a missing factor.",
    forward: "This is a precursor to solving equations by dividing." },
  { itemId: "d28", order: 28, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "Calculate the sum of the digits of \\(2^{10} \\times 5^8 \\times 3\\).",
    options: [
      { text: "3", correct: true, feedback: "Correct. 2¹⁰×5⁸ = 2²×(2⁸×5⁸)=4×10⁸=400,000,000; ×3=1,200,000,000; sum=1+2=3." },
      { text: "12", correct: false, feedback: "You added all digits individually? 1+2=3." },
      { text: "0", correct: false, feedback: "The number is not zero." },
      { text: "6", correct: false, feedback: "You might have doubled the sum." }
    ],
    backward: "Combining powers and place value.",
    forward: "This type of clever simplification is common in contest problems." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "Which expression has a value furthest from zero?",
    options: [
      { text: "-3 - 8", correct: true, feedback: "-11 is furthest." },
      { text: "-9+5", correct: false, feedback: "-4." },
      { text: "4-(-6)", correct: false, feedback: "10." },
      { text: "-1+(-7)", correct: false, feedback: "-8." }
    ] },
  { itemId: "r2", order: 2, cluster: "A", clusterName: CLUSTER_NAMES.A,
    question: "Evaluate: \\(-7 - (-4) + (-2)\\)",
    options: [
      { text: "-5", correct: true, feedback: "-7+4-2 = -5." },
      { text: "-1", correct: false, feedback: "You added incorrectly." },
      { text: "-9", correct: false, feedback: "You subtracted 2 instead of adding." },
      { text: "5", correct: false, feedback: "You changed all signs to positive." }
    ] },
  { itemId: "r3", order: 3, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "What is the sign of \\((-2) \\times 4 \\times (-6) \\times (-8)\\)?",
    options: [
      { text: "Negative", correct: true, feedback: "Three negatives → negative." },
      { text: "Positive", correct: false, feedback: "Odd negatives → negative." },
      { text: "Zero", correct: false, feedback: "No zero factor." },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined." }
    ] },
  { itemId: "r4", order: 4, cluster: "M", clusterName: CLUSTER_NAMES.M,
    question: "Evaluate: \\((-3) \\times (-4) \\div (-2)\\)",
    options: [
      { text: "-6", correct: true, feedback: "12 ÷ (-2) = -6." },
      { text: "6", correct: false, feedback: "You forgot the division sign." },
      { text: "-1.5", correct: false, feedback: "You divided incorrectly." },
      { text: "1.5", correct: false, feedback: "Sign and division errors." }
    ] },
  { itemId: "r5", order: 5, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Which is larger: \\(3^6\\) or \\(6^3\\)?",
    options: [
      { text: "3⁶", correct: true, feedback: "3⁶=729, 6³=216." },
      { text: "6³", correct: false, feedback: "216 < 729." },
      { text: "They are equal", correct: false, feedback: "They are not." }
    ] },
  { itemId: "r6", order: 6, cluster: "P", clusterName: CLUSTER_NAMES.P,
    question: "Solve for \\(x\\): \\(5^x = 125^2\\)",
    options: [
      { text: "6", correct: true, feedback: "125=5³, so 125²=(5³)²=5⁶." },
      { text: "2", correct: false, feedback: "You equated exponents incorrectly." },
      { text: "3", correct: false, feedback: "That would be 125=5³." },
      { text: "9", correct: false, feedback: "3²=9, not the right base." }
    ] },
  { itemId: "r7", order: 7, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "Between which integers does \\(\\sqrt{300}\\) lie?",
    options: [
      { text: "17 and 18", correct: true, feedback: "17²=289, 18²=324." },
      { text: "16 and 17", correct: false, feedback: "16²=256, too low." },
      { text: "18 and 19", correct: false, feedback: "18²=324, already above 300." },
      { text: "15 and 16", correct: false, feedback: "Too low." }
    ] },
  { itemId: "r8", order: 8, cluster: "R", clusterName: CLUSTER_NAMES.R,
    question: "Simplify \\(\\sqrt{3^2 + 4^2}\\)",
    options: [
      { text: "5", correct: true, feedback: "√(9+16)=√25=5." },
      { text: "7", correct: false, feedback: "You added 3+4." },
      { text: "25", correct: false, feedback: "You forgot the square root." },
      { text: "12", correct: false, feedback: "You multiplied 3×4." }
    ] },
  { itemId: "r9", order: 9, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "Insert brackets to make \\(8 + 4 \\div 2 \\times 3 = 18\\) true.",
    options: [
      { text: "(8 + 4) ÷ 2 × 3", correct: true, feedback: "12÷2×3=18." },
      { text: "8 + 4 ÷ (2 × 3)", correct: false, feedback: "8+4/6 not 18." },
      { text: "(8 + 4 ÷ 2) × 3", correct: false, feedback: "(8+2)×3=30." },
      { text: "8 + (4 ÷ 2 × 3)", correct: false, feedback: "8+6=14." }
    ] },
  { itemId: "r10", order: 10, cluster: "O", clusterName: CLUSTER_NAMES.O,
    question: "Evaluate: \\(10 - 3 \\times (2 + 4) \\div 3\\)",
    options: [
      { text: "4", correct: true, feedback: "10 - 3×6÷3 = 10 - 6 = 4." },
      { text: "2", correct: false, feedback: "You made an arithmetic error." },
      { text: "8", correct: false, feedback: "You forgot the subtraction." },
      { text: "6", correct: false, feedback: "You multiplied incorrectly." }
    ] },
  { itemId: "r11", order: 11, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "How many distinct prime factors does 330 have?",
    options: [
      { text: "4", correct: true, feedback: "330 = 2×3×5×11." },
      { text: "3", correct: false, feedback: "You missed one." },
      { text: "5", correct: false, feedback: "Only four." },
      { text: "6", correct: false, feedback: "Too many." }
    ] },
  { itemId: "r12", order: 12, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    question: "Find the HCF of \\(2^3 \\times 3^2\\) and \\(2^2 \\times 3^4\\).",
    options: [
      { text: "36", correct: true, feedback: "2²×3²=36." },
      { text: "6", correct: false, feedback: "2×3=6, not highest." },
      { text: "12", correct: false, feedback: "2²×3=12." },
      { text: "72", correct: false, feedback: "That's 2³×3²." }
    ] },
  { itemId: "r13", order: 13, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "Estimate \\(\\frac{198 + 303}{0.5}\\) by rounding to 1 significant figure.",
    options: [
      { text: "1000", correct: true, feedback: "200+300=500, ÷0.5=1000." },
      { text: "500", correct: false, feedback: "You forgot to divide." },
      { text: "2000", correct: false, feedback: "You doubled." },
      { text: "250", correct: false, feedback: "You halved." }
    ] },
  { itemId: "r14", order: 14, cluster: "E", clusterName: CLUSTER_NAMES.E,
    question: "How many digits does \\(4^5 \\times 5^4\\) have?",
    options: [
      { text: "6", correct: true, feedback: "4⁵×5⁴ = 2¹⁰×5⁴ = 2⁶×(2⁴×5⁴)=64×10⁴=640,000 (6 digits)." },
      { text: "5", correct: false, feedback: "640,000 has 6 digits." },
      { text: "7", correct: false, feedback: "Too many." },
      { text: "8", correct: false, feedback: "Too many." }
    ] },
  { itemId: "r15", order: 15, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "Find all integer values of \\(x\\) such that \\(x^2 \\le 5\\).",
    options: [
      { text: "-2, -1, 0, 1, 2", correct: true, feedback: "Squares ≤5." },
      { text: "-3, -2, -1, 0, 1, 2, 3", correct: false, feedback: "3²=9 >5." },
      { text: "0, 1, 2", correct: false, feedback: "Negatives also work." },
      { text: "-2, -1, 1, 2", correct: false, feedback: "0 is missing." }
    ] },
  { itemId: "r16", order: 16, cluster: "X", clusterName: CLUSTER_NAMES.X,
    question: "If \\(2^a = 8\\) and \\(3^b = 9\\), what is \\(a + b\\)?",
    options: [
      { text: "5", correct: true, feedback: "a=3, b=2." },
      { text: "6", correct: false, feedback: "3+2=5." },
      { text: "4", correct: false, feedback: "Incorrect." },
      { text: "3", correct: false, feedback: "Incorrect." }
    ] }
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
    title: "Integers, Powers & Roots — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Advanced integer operations, exponent comparisons, roots, order of operations, and HCF/LCM reasoning — a tougher warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Negative numbers: two negatives multiply to positive; odd negatives stay negative.<br>" +
      "&bull; Powers: (&minus;2)&sup3; = &minus;8; &minus;2&sup2; = &minus;(2&sup2;) = &minus;4. Parentheses matter.<br>" +
      "&bull; Roots: &radic;(&minus;) not real; cube root of negative is negative.<br>" +
      "&bull; Order of operations: brackets &rarr; exponents &rarr; multiply/divide &rarr; add/subtract.<br>" +
      "&bull; Prime factorisation: break down to primes, use index notation.<br>",
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

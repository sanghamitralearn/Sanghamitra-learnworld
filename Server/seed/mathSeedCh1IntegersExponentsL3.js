// seed/mathSeedCh1IntegersExponentsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 1
// (Integers, Powers & Roots), Level 3 — converted from the standalone
// HTML file ch1-integers-exponents-level-3.html.
//
// Run with: node seed/mathSeedCh1IntegersExponentsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-1-integers-exponents";
const CHAPTER_NAME = "Integers, Powers & Roots";
const LEVEL = 3;

const CLUSTER_NAMES = {
  SYNTH: "Synthesis",
  PATT: "Pattern & Parity",
  EXP: "Exponent Tricks",
  PRIME: "Prime Puzzles",
  EST: "Strategic Estimation",
  PROOF: "Proof & Justification",
  SEQ: "Sequences & Recursion"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "\\((-2)^4 + (-2)^3 =\\)",
    options: [
      { text: "8", correct: true, feedback: "Correct. 16 + (-8) = 8." },
      { text: "-8", correct: false, feedback: "You added 16 and 8 with the wrong sign." },
      { text: "24", correct: false, feedback: "You added the absolute values." },
      { text: "-24", correct: false, feedback: "You added with wrong signs." }
    ],
    retryHint: "Even exponent → positive; odd exponent preserves the negative sign." },
  { itemId: "w2", order: 2, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Which of these is a perfect square?",
    options: [
      { text: "\\(2^4 \\times 3^2\\)", correct: true, feedback: "Correct. \\(2^4 = (2^2)^2\\), \\(3^2\\) is a square, so the product is a perfect square." },
      { text: "\\(2^5 \\times 3^2\\)", correct: false, feedback: "The exponent on 2 is odd, so it is not a perfect square." },
      { text: "Both", correct: false, feedback: "Only the first is a perfect square." },
      { text: "Neither", correct: false, feedback: "The first is a perfect square." }
    ],
    retryHint: "A perfect square has all prime exponents even." },
  { itemId: "w3", order: 3, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the last digit of \\(3^{10}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Correct. The cycle of last digits is 3,9,7,1. The 10th term in the cycle is 9." },
      { text: "3", correct: false, feedback: "That's the first in the cycle." },
      { text: "7", correct: false, feedback: "That's the third." },
      { text: "1", correct: false, feedback: "That's the fourth." }
    ],
    retryHint: "List the last digits of powers: 3,9,7,1, repeating every 4." },
  { itemId: "w4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Which number has exactly 4 factors?",
    options: [
      { text: "8", correct: true, feedback: "Correct. 8 = \\(2^3\\) has 4 factors: 1,2,4,8." },
      { text: "5", correct: false, feedback: "5 is prime, so it has only 2 factors." },
      { text: "12", correct: false, feedback: "12 has 6 factors." },
      { text: "18", correct: false, feedback: "18 has 6 factors." }
    ],
    retryHint: "Numbers with exactly 4 factors are either \\(p^3\\) or \\(p \\times q\\) with distinct primes." },
  { itemId: "w5", order: 5, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "Without dividing, is \\(\\frac{120}{-15}\\) positive or negative?",
    options: [
      { text: "Negative", correct: true, feedback: "Correct. Positive divided by negative is negative." },
      { text: "Positive", correct: false, feedback: "One negative sign makes the quotient negative." },
      { text: "Zero", correct: false, feedback: "The numerator is not zero." },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined by the signs of the numbers." }
    ],
    retryHint: "One negative → negative result." },
  { itemId: "w6", order: 6, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "Insert brackets to make \\(2 + 3 \\times 4 - 6 = 14\\) true.",
    options: [
      { text: "(2 + 3) × 4 - 6", correct: true, feedback: "Correct. 5 × 4 - 6 = 14." },
      { text: "2 + 3 × (4 - 6)", correct: false, feedback: "2 + 3×(-2) = -4." },
      { text: "(2 + 3 × 4) - 6", correct: false, feedback: "(2+12)-6=8." },
      { text: "2 + (3 × 4 - 6)", correct: false, feedback: "2+6=8." }
    ],
    retryHint: "Try putting brackets around the addition." },
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(\\sqrt{999}\\) to the nearest integer.",
    options: [
      { text: "32", correct: true, feedback: "Correct. 31²=961, 32²=1024; 999 is closer to 1024." },
      { text: "31", correct: false, feedback: "31²=961, but 999 is closer to 32²." },
      { text: "30", correct: false, feedback: "30²=900, too low." },
      { text: "33", correct: false, feedback: "33²=1089, too high." }
    ],
    retryHint: "Find the perfect squares either side: 31²=961, 32²=1024." },
  { itemId: "w8", order: 8, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the HCF of \\(2^3 \\times 3\\) and \\(2^2 \\times 3^2\\).",
    options: [
      { text: "12", correct: true, feedback: "Correct. HCF = \\(2^2 \\times 3 = 12\\)." },
      { text: "6", correct: false, feedback: "That's \\(2 \\times 3\\)." },
      { text: "24", correct: false, feedback: "That's \\(2^3 \\times 3\\)." },
      { text: "18", correct: false, feedback: "That's \\(2 \\times 3^2\\)." }
    ],
    retryHint: "Take the lower power of each prime factor." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "Find the smallest positive integer \\(n\\) such that \\((-2)^n > 1000\\).",
    options: [
      { text: "10", correct: true, feedback: "Correct. For even n, \\((-2)^n = 2^n\\). \\(2^{10}=1024 > 1000\\), while \\(2^9=512\\). Odd n gives a negative result, which cannot be >1000. Strategy: test even n only." },
      { text: "9", correct: false, feedback: "\\(2^9 = 512\\), not > 1000." },
      { text: "11", correct: false, feedback: "11 is odd, \\((-2)^{11}\\) is negative." },
      { text: "12", correct: false, feedback: "Works but not the smallest." }
    ],
    backward: "Powers of negative numbers alternate sign.",
    forward: "This type of trial-and-improvement appears in exponential growth problems." },
  { itemId: "d2", order: 2, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the last digit of \\(7^{2026}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Correct. The cycle is 7,9,3,1. 2026 ÷ 4 leaves remainder 2 → second term is 9. Strategy: find the cycle of last digits." },
      { text: "7", correct: false, feedback: "That's the first term in the cycle." },
      { text: "3", correct: false, feedback: "That's the third." },
      { text: "1", correct: false, feedback: "That's the fourth." }
    ],
    backward: "Cyclic patterns in powers.",
    forward: "Last-digit problems are common in Olympiad maths." },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Which is larger: \\(2^{30}\\) or \\(3^{20}\\)?",
    options: [
      { text: "\\(3^{20}\\)", correct: true, feedback: "Correct. Rewrite both with exponent 10: \\(2^{30}=(2^3)^{10}=8^{10}\\), \\(3^{20}=(3^2)^{10}=9^{10}\\). Since 9>8, \\(3^{20}\\) is larger. Strategy: rewrite with the same exponent." },
      { text: "\\(2^{30}\\)", correct: false, feedback: "\\(8^{10} < 9^{10}\\)." },
      { text: "They are equal", correct: false, feedback: "8 ≠ 9." },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined." }
    ],
    backward: "Rewriting powers with common bases/exponents.",
    forward: "Exponential comparison is key in growth problems." },
  { itemId: "d4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "How many positive divisors does 72 have?",
    options: [
      { text: "12", correct: true, feedback: "Correct. 72 = \\(2^3 \\times 3^2\\); number of divisors = (3+1)(2+1)=12. Strategy: add 1 to each exponent and multiply." },
      { text: "10", correct: false, feedback: "You might have added exponents incorrectly." },
      { text: "6", correct: false, feedback: "That's the number of factors of a smaller number." },
      { text: "8", correct: false, feedback: "Not correct." }
    ],
    backward: "Prime factorisation gives divisor count.",
    forward: "Divisor functions appear in number theory." },
  { itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Without calculation, which is larger: \\(\\sqrt{10} + \\sqrt{20}\\) or \\(\\sqrt{30}\\)?",
    options: [
      { text: "\\(\\sqrt{10} + \\sqrt{20}\\)", correct: true, feedback: "Correct. \\(\\sqrt{10} \\approx 3.2\\), \\(\\sqrt{20} \\approx 4.5\\), sum ≈7.7; \\(\\sqrt{30} \\approx 5.5\\). The sum is larger. Strategy: approximate each square root." },
      { text: "\\(\\sqrt{30}\\)", correct: false, feedback: "5.5 < 7.7." },
      { text: "They are equal", correct: false, feedback: "They are not." },
      { text: "Cannot be determined", correct: false, feedback: "We can approximate." }
    ],
    backward: "Estimating irrationals.",
    forward: "Comparison of expressions is vital in inequality problems." },
  { itemId: "d6", order: 6, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    question: "Is it always true that if \\(n\\) is odd, \\((-1)^n = -1\\)?",
    options: [
      { text: "Yes, always true", correct: true, feedback: "Correct. An odd power of -1 is -1. There is no counter-example. Strategy: test with n=1,3,5." },
      { text: "No, n=0 is a counter-example", correct: false, feedback: "0 is not odd." },
      { text: "No, n=2 is a counter-example", correct: false, feedback: "2 is even." },
      { text: "No, it depends on the value of n", correct: false, feedback: "For any odd integer, the result is always -1." }
    ],
    backward: "Parity of exponents.",
    forward: "Proof by exhaustion of cases is a fundamental skill." },
  { itemId: "d7", order: 7, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence is defined by \\(a_1 = -2\\), \\(a_{n+1} = -a_n + 3\\). Find \\(a_5\\).",
    options: [
      { text: "-2", correct: true, feedback: "Correct. a1=-2; a2= -(-2)+3=5; a3= -5+3=-2; a4=5; a5=-2. Strategy: compute term by term." },
      { text: "5", correct: false, feedback: "That's a2." },
      { text: "-5", correct: false, feedback: "Not a value in the sequence." },
      { text: "2", correct: false, feedback: "Sign error." }
    ],
    backward: "Recursive sequences.",
    forward: "Understanding recursion is important in programming and mathematics." },
  { itemId: "d8", order: 8, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "If \\(a\\) and \\(b\\) are negative integers and \\(a^2 + b^2 = 50\\), what is the smallest possible value of \\(a + b\\)?",
    options: [
      { text: "-10", correct: true, feedback: "Correct. Pairs: (-1,-7) sum -8; (-5,-5) sum -10. -10 is the smallest. Strategy: list negative integer pairs whose squares sum to 50." },
      { text: "-8", correct: false, feedback: "That's the sum for (-1,-7)." },
      { text: "10", correct: false, feedback: "Positive sum." },
      { text: "-14", correct: false, feedback: "No pair gives that sum." }
    ],
    backward: "Integer solutions to equations.",
    forward: "This leads to Diophantine reasoning." },
  { itemId: "d9", order: 9, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "A sequence is: -1, 2, -3, 4, -5, 6, … What is the 101st term?",
    options: [
      { text: "-101", correct: true, feedback: "Correct. The nth term is \\(n \\times (-1)^n\\). For odd n it is negative. Strategy: find the pattern for the sign and magnitude." },
      { text: "101", correct: false, feedback: "Sign is negative for odd n." },
      { text: "-100", correct: false, feedback: "Off by one." },
      { text: "-102", correct: false, feedback: "Off by one." }
    ],
    backward: "Alternating sequences.",
    forward: "Pattern recognition is essential in series." },
  { itemId: "d10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "How many digits does \\(2^{12} \\times 5^{10}\\) have?",
    options: [
      { text: "11", correct: true, feedback: "Correct. \\(2^{12} \\times 5^{10} = 2^2 \\times (2^{10} \\times 5^{10}) = 4 \\times 10^{10} = 40,000,000,000\\) (11 digits). Strategy: factor powers of ten." },
      { text: "10", correct: false, feedback: "That would be 4 × 10^9." },
      { text: "12", correct: false, feedback: "Too many." },
      { text: "22", correct: false, feedback: "You added the exponents." }
    ],
    backward: "Combining powers into powers of ten.",
    forward: "This connects exponents with place value." },
  { itemId: "d11", order: 11, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the smallest positive integer that has exactly 8 factors.",
    options: [
      { text: "24", correct: true, feedback: "Correct. 24 = \\(2^3 \\times 3\\) has 8 factors. 30 also has 8 factors, but 24 is smaller. Strategy: either \\(p^7\\) (minimum 2^7=128) or \\(p^3 q\\) (minimum 2^3×3=24) or \\(p q r\\) (2×3×5=30)." },
      { text: "30", correct: false, feedback: "30 has 8 factors but is larger than 24." },
      { text: "16", correct: false, feedback: "16 has 5 factors." },
      { text: "36", correct: false, feedback: "36 has 9 factors." }
    ],
    backward: "Number of factors from prime form.",
    forward: "Factor counting is used in cryptography." },
  { itemId: "d12", order: 12, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(\\frac{999^2 - 1}{1000}\\) to the nearest integer.",
    options: [
      { text: "998", correct: true, feedback: "Correct. \\(999^2-1 = (999-1)(999+1) = 998 \\times 1000\\), divided by 1000 gives 998. Strategy: use difference of squares." },
      { text: "999", correct: false, feedback: "You forgot to subtract the 1." },
      { text: "1000", correct: false, feedback: "Not correct." },
      { text: "997", correct: false, feedback: "Off by one." }
    ],
    backward: "Algebraic manipulation for estimation.",
    forward: "Difference of squares is a powerful simplification tool." },
  { itemId: "d13", order: 13, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    question: "A student claims that \\((a + b)^2 = a^2 + b^2\\) for all integers \\(a, b\\). Which of the following pairs disproves this claim?",
    options: [
      { text: "\\(a=1, b=1\\)", correct: true, feedback: "Correct. (1+1)²=4 but 1²+1²=2, so the statement is false. Strategy: find a simple counter-example." },
      { text: "\\(a=0, b=0\\)", correct: false, feedback: "(0+0)²=0, 0²+0²=0 → the statement holds for this pair." },
      { text: "\\(a=2, b=0\\)", correct: false, feedback: "(2+0)²=4, 2²+0²=4 → the statement holds." },
      { text: "\\(a=0, b=2\\)", correct: false, feedback: "(0+2)²=4, 0²+2²=4 → the statement holds." }
    ],
    backward: "Counter-examples in algebra.",
    forward: "Disproving with a single counter-example is a key proof technique." },
  { itemId: "d14", order: 14, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "What is the sum of the first 50 terms of 1, -2, 3, -4, 5, -6, …?",
    options: [
      { text: "-25", correct: true, feedback: "Correct. Pair terms: (1-2)+(3-4)+…+(49-50) = -1×25 = -25. Strategy: group into pairs." },
      { text: "25", correct: false, feedback: "Sign error." },
      { text: "0", correct: false, feedback: "The pairs don't cancel to zero." },
      { text: "-50", correct: false, feedback: "You forgot to halve the number of pairs." }
    ],
    backward: "Summing alternating series.",
    forward: "Pairing terms is a common series technique." },
  { itemId: "d15", order: 15, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "A number \\(N\\) leaves a remainder of 3 when divided by 4 and a remainder of 1 when divided by 6. What is the smallest positive \\(N\\)?",
    options: [
      { text: "7", correct: true, feedback: "Correct. N=7: 7÷4=1 rem 3, 7÷6=1 rem 1. Strategy: list numbers congruent to 3 mod 4 and check mod 6." },
      { text: "3", correct: false, feedback: "3 mod4=3 but mod6=3, not 1." },
      { text: "11", correct: false, feedback: "11 mod4=3, mod6=5." },
      { text: "13", correct: false, feedback: "13 mod4=1, not 3." }
    ],
    backward: "Modular reasoning.",
    forward: "Chinese Remainder Theorem idea." },
  { itemId: "d16", order: 16, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "Which of the following numbers, when squared, ends in 6?",
    options: [
      { text: "14", correct: true, feedback: "Correct. 14²=196 ends in 6. Only numbers ending in 4 or 6 give a square ending in 6. Strategy: check the last digit of the number." },
      { text: "13", correct: false, feedback: "13²=169 ends in 9." },
      { text: "17", correct: false, feedback: "17²=289 ends in 9." },
      { text: "19", correct: false, feedback: "19²=361 ends in 1." }
    ],
    backward: "Last-digit patterns in squares.",
    forward: "Digit patterns are useful in number theory." },
  { itemId: "d17", order: 17, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Solve for \\(x\\): \\(4^x = 2^{x+3}\\)",
    options: [
      { text: "3", correct: true, feedback: "Correct. \\(4^x = (2^2)^x = 2^{2x}\\). Equate exponents: \\(2x = x+3\\) → \\(x=3\\). Strategy: rewrite to the same base." },
      { text: "2", correct: false, feedback: "2²=4, 2^(2+3)=32, not equal." },
      { text: "1", correct: false, feedback: "4¹=4, 2^(1+3)=16, not equal." },
      { text: "4", correct: false, feedback: "4⁴=256, 2⁷=128, not equal." }
    ],
    backward: "Equating exponents with common base.",
    forward: "Solving exponential equations." },
  { itemId: "d18", order: 18, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "The HCF of two numbers is 12 and their product is 864. What is their LCM?",
    options: [
      { text: "72", correct: true, feedback: "Correct. Product = HCF × LCM → LCM = 864/12 = 72. Strategy: use the relationship." },
      { text: "12", correct: false, feedback: "That's the HCF." },
      { text: "864", correct: false, feedback: "That's the product." },
      { text: "144", correct: false, feedback: "Not correct." }
    ],
    backward: "HCF × LCM = product.",
    forward: "This relationship is fundamental in number theory." },
  { itemId: "d19", order: 19, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "A cube has volume 500 cm³. Estimate its surface area to the nearest 50 cm².",
    options: [
      { text: "400", correct: true, feedback: "Correct. Side ≈ ³√500 ≈ 7.94; surface area ≈ 6 × (7.94)² ≈ 378 → nearest 50 is 400. Strategy: estimate cube root, then square and multiply by 6." },
      { text: "350", correct: false, feedback: "378 is closer to 400 than 350." },
      { text: "300", correct: false, feedback: "Too low." },
      { text: "450", correct: false, feedback: "Too high." }
    ],
    backward: "Estimation with roots and geometry.",
    forward: "Real-world estimation combines multiple skills." },
  { itemId: "d20", order: 20, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    question: "Prove that the product of two consecutive integers is always even. Which statement completes the proof?",
    options: [
      { text: "One of the two integers must be even.", correct: true, feedback: "Correct. If one integer is even, the product is even. Strategy: even × any integer = even." },
      { text: "Both integers must be odd.", correct: false, feedback: "Then product would be odd." },
      { text: "The product of any two integers is even.", correct: false, feedback: "False." },
      { text: "Consecutive integers have the same parity.", correct: false, feedback: "They have opposite parity." }
    ],
    backward: "Parity arguments.",
    forward: "This is a classic proof in number theory." },
  { itemId: "d21", order: 21, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "The Fibonacci sequence starts 1,1,2,3,5,8,… What is the parity (odd/even) of the 100th term?",
    options: [
      { text: "Odd", correct: true, feedback: "Correct. The parity pattern is odd, odd, even, repeating every 3. 100 mod 3 = 1 → odd. Strategy: find the parity cycle." },
      { text: "Even", correct: false, feedback: "100 mod 3 ≠ 2 or 0 in this pattern." },
      { text: "Cannot be determined", correct: false, feedback: "The pattern is deterministic." },
      { text: "It alternates", correct: false, feedback: "It doesn't alternate each term." }
    ],
    backward: "Patterns in sequences.",
    forward: "Fibonacci parity appears in contest problems." },
  { itemId: "d22", order: 22, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "Evaluate: \\((-3)^2 \\times \\sqrt{64} + (-2)^3 \\div (-1)^4\\)",
    options: [
      { text: "64", correct: true, feedback: "Correct. 9 × 8 + (-8) ÷ 1 = 72 - 8 = 64. Strategy: handle signs, powers, and order of operations." },
      { text: "80", correct: false, feedback: "72+8 = 80, but division of -8 is subtraction." },
      { text: "-64", correct: false, feedback: "Sign error." },
      { text: "56", correct: false, feedback: "You might have miscalculated a power." }
    ],
    backward: "Synthesis of multiple operations.",
    forward: "Complex expressions test overall fluency." },
  { itemId: "d23", order: 23, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "A number is of the form \\(2^a \\times 3^b\\) and has exactly 15 factors. What is the smallest possible value?",
    options: [
      { text: "144", correct: true, feedback: "Correct. 15=3×5. If (a+1)(b+1)=15, possibilities: (a,b)=(2,4) or (4,2). Smallest is \\(2^4 \\times 3^2 = 144\\). Strategy: factor 15 and assign exponents." },
      { text: "324", correct: false, feedback: "That's \\(2^2 \\times 3^4 = 324\\)." },
      { text: "64", correct: false, feedback: "64 = 2^6 has 7 factors." },
      { text: "108", correct: false, feedback: "108 = 2^2 × 3^3 has 12 factors." }
    ],
    backward: "Exponent and factor count relationship.",
    forward: "This type of optimisation appears in Olympiad number theory." },
  { itemId: "d24", order: 24, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence begins 3, 6, 12, 24, … What is the 10th term?",
    options: [
      { text: "1536", correct: true, feedback: "Correct. This is a geometric sequence with ratio 2. The 10th term = \\(3 \\times 2^9 = 1536\\). Strategy: identify the pattern and use the formula." },
      { text: "3072", correct: false, feedback: "That's the 11th term." },
      { text: "768", correct: false, feedback: "That's the 9th term." },
      { text: "30", correct: false, feedback: "You added 27? Not geometric." }
    ],
    backward: "Geometric sequences.",
    forward: "Geometric growth appears in finance and science." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "If \\(x\\) is a negative integer such that \\(x^2 + x = 6\\), find \\(x\\).",
    options: [
      { text: "-3", correct: true, feedback: "(-3)²+(-3)=9-3=6. Strategy: test negative values." },
      { text: "2", correct: false, feedback: "2²+2=6 but x is negative." },
      { text: "-2", correct: false, feedback: "4-2=2." },
      { text: "3", correct: false, feedback: "3²+3=12, and x is negative." }
    ] },
  { itemId: "r2", order: 2, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the last digit of \\(2^{50}\\)?",
    options: [
      { text: "4", correct: true, feedback: "Cycle 2,4,8,6. 50 mod4=2 → second digit 4." },
      { text: "2", correct: false, feedback: "First." },
      { text: "8", correct: false, feedback: "Third." },
      { text: "6", correct: false, feedback: "Fourth." }
    ] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Which is larger: \\(5^{20}\\) or \\(25^{11}\\)?",
    options: [
      { text: "\\(25^{11}\\)", correct: true, feedback: "25^11 = (5^2)^11 = 5^22, which is larger than 5^20." },
      { text: "\\(5^{20}\\)", correct: false, feedback: "5^20 < 5^22." },
      { text: "Equal", correct: false, feedback: "They are not." },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined." }
    ] },
  { itemId: "r4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "How many factors does 36 have?",
    options: [
      { text: "9", correct: true, feedback: "36=2²×3² → (2+1)(2+1)=9." },
      { text: "6", correct: false, feedback: "That would be 2¹×3¹." },
      { text: "8", correct: false, feedback: "Not correct." },
      { text: "12", correct: false, feedback: "Not correct." }
    ] },
  { itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate \\(\\sqrt{2500 - 1}\\) to the nearest integer.",
    options: [
      { text: "50", correct: true, feedback: "√2499 is just under 50; 50²=2500, so nearest integer is 50." },
      { text: "49", correct: false, feedback: "49²=2401, further away." },
      { text: "51", correct: false, feedback: "51²=2601." },
      { text: "48", correct: false, feedback: "48²=2304, further away." }
    ] },
  { itemId: "r6", order: 6, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    question: "Is it always true that \\((-n)^2 = n^2\\) for any integer n?",
    options: [
      { text: "Yes, always true", correct: true, feedback: "The square eliminates the sign." },
      { text: "No, only when n is positive", correct: false, feedback: "The square of a negative is also positive." },
      { text: "No, only when n is negative", correct: false, feedback: "The square of a positive is also positive." },
      { text: "No, it depends on n", correct: false, feedback: "It's always true." }
    ] },
  { itemId: "r7", order: 7, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence starts 5, 8, 11, 14, … What is the 20th term?",
    options: [
      { text: "62", correct: true, feedback: "Arithmetic: 5 + 19×3 = 62." },
      { text: "65", correct: false, feedback: "5+19×3=62, not 65." },
      { text: "60", correct: false, feedback: "Off by 2." },
      { text: "59", correct: false, feedback: "5 + 18×3 = 59, off by one term." }
    ] },
  { itemId: "r8", order: 8, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "Solve for \\(x\\): \\((-3)^x = -27\\)",
    options: [
      { text: "3", correct: true, feedback: "(-3)³ = -27." },
      { text: "-3", correct: false, feedback: "(-3)^(-3) = -1/27." },
      { text: "2", correct: false, feedback: "(-3)² = 9." },
      { text: "9", correct: false, feedback: "(-3)^9 is a large negative, but not -27." }
    ] },
  { itemId: "r9", order: 9, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the last digit of \\(6^{100}\\)?",
    options: [
      { text: "6", correct: true, feedback: "Any power of a number ending in 6 ends in 6." },
      { text: "0", correct: false, feedback: "Only numbers ending in 0." },
      { text: "2", correct: false, feedback: "No." },
      { text: "8", correct: false, feedback: "No." }
    ] },
  { itemId: "r10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    question: "Simplify \\(\\frac{2^5 \\times 4^3}{8^2}\\)",
    options: [
      { text: "32", correct: true, feedback: "Rewrite: 2^5 × (2^2)^3 = 2^5×2^6=2^11; 8^2=(2^3)^2=2^6; result 2^5=32." },
      { text: "64", correct: false, feedback: "2^6." },
      { text: "16", correct: false, feedback: "2^4." },
      { text: "8", correct: false, feedback: "2^3." }
    ] },
  { itemId: "r11", order: 11, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the LCM of \\(2^2 \\times 3\\) and \\(2 \\times 3^2\\).",
    options: [
      { text: "36", correct: true, feedback: "LCM = 2^2 × 3^2 = 36." },
      { text: "12", correct: false, feedback: "That's 2^2×3." },
      { text: "18", correct: false, feedback: "2×3^2." },
      { text: "6", correct: false, feedback: "2×3." }
    ] },
  { itemId: "r12", order: 12, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    question: "Estimate the value of \\(\\sqrt{80} + \\sqrt{20}\\) to the nearest integer.",
    options: [
      { text: "13", correct: true, feedback: "√80≈8.94, √20≈4.47, sum≈13.4 → nearest 13." },
      { text: "12", correct: false, feedback: "Too low." },
      { text: "14", correct: false, feedback: "Too high." },
      { text: "10", correct: false, feedback: "Too low." }
    ] },
  { itemId: "r13", order: 13, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    question: "Is the sum of two odd numbers always even?",
    options: [
      { text: "Yes", correct: true, feedback: "Odd + odd = even." },
      { text: "No", correct: false, feedback: "It is always even." },
      { text: "Only if the numbers are different", correct: false, feedback: "Same odd numbers also sum to even." },
      { text: "Only if the numbers are the same", correct: false, feedback: "Different odds also sum to even." }
    ] },
  { itemId: "r14", order: 14, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    question: "A sequence begins 100, 97, 94, … What is the 15th term?",
    options: [
      { text: "58", correct: true, feedback: "100 + (15-1)×(-3) = 100 - 42 = 58." },
      { text: "55", correct: false, feedback: "100 - 45 = 55, off by 3." },
      { text: "61", correct: false, feedback: "100 - 39 = 61." },
      { text: "52", correct: false, feedback: "100 - 48 = 52, off by one term." }
    ] },
  { itemId: "r15", order: 15, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    question: "If \\(a = -2^2\\) and \\(b = (-2)^2\\), find \\(a + b\\).",
    options: [
      { text: "0", correct: true, feedback: "a = -4, b = 4, sum 0." },
      { text: "8", correct: false, feedback: "-4+4=0." },
      { text: "-8", correct: false, feedback: "Wrong." },
      { text: "4", correct: false, feedback: "Wrong." }
    ] },
  { itemId: "r16", order: 16, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "What is the last digit of \\(9^{99}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Cycle of last digit of powers of 9: 9,1,9,1,… odd exponent gives 9." },
      { text: "1", correct: false, feedback: "Even exponent gives 1." },
      { text: "0", correct: false, feedback: "No." },
      { text: "8", correct: false, feedback: "No." }
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
    title: "Integers, Powers & Roots — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine problem-solving across integers, powers, roots, primes, sequences, and proof — synthesis-level warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; All Chapter 1 tools are now in play &mdash; your job is to decide which ones to use.<br>" +
      "&bull; Look for patterns, rewrite powers, count carefully, and reason backwards.<br>" +
      "&bull; If you're stuck, try a smaller case or list the first few terms.<br>",
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

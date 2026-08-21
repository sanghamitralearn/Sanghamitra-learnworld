// seed/mathSeedCh1IntegersExponentsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 1
// (Integers, Powers & Roots), Level 4 — converted from the standalone
// HTML file ch1-integers-exponents-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh1IntegersExponentsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-1-integers-exponents";
const CHAPTER_NAME = "Integers, Powers & Roots";
const LEVEL = 4;

const CLUSTER_NAMES = {
  NEG_ADDSUB: "Adding/Subtracting Negatives",
  NEG_MULDIV: "Multiplying/Dividing Negatives",
  POWERS: "Powers",
  ROOTS: "Roots",
  ORDER_OPS: "Order of Operations",
  PRIME: "Prime Factors",
  ESTIMATION: "Estimation",
  SYNTH: "Synthesis"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    question: "\\((-4) \\times (-5) =\\)",
    options: [
      { text: "20", correct: true, feedback: "Correct." },
      { text: "-20", correct: false, feedback: "Negative × negative = positive." },
      { text: "9", correct: false, feedback: "You added." },
      { text: "-9", correct: false, feedback: "You added with wrong sign." }
    ],
    retryHint: "Two negatives make a positive." },
  { itemId: "w2", order: 2, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "\\(\\sqrt{121} =\\)",
    options: [
      { text: "11", correct: true, feedback: "Correct." },
      { text: "-11", correct: false, feedback: "Principal square root is positive." },
      { text: "60.5", correct: false, feedback: "You halved." }
    ],
    retryHint: "11² = 121." },
  { itemId: "w3", order: 3, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Write 45 as a product of primes.",
    options: [
      { text: "3² × 5", correct: true, feedback: "Correct." },
      { text: "5 × 9", correct: false, feedback: "9 is not prime." },
      { text: "3 × 15", correct: false, feedback: "15 is not prime." }
    ],
    retryHint: "45 = 3 × 15 = 3 × 3 × 5." },
  { itemId: "w4", order: 4, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "\\(2^4 =\\)",
    options: [
      { text: "16", correct: true, feedback: "Correct." },
      { text: "8", correct: false, feedback: "2³=8." },
      { text: "32", correct: false, feedback: "2⁵=32." }
    ],
    retryHint: "2×2×2×2 = 16." },
  { itemId: "w5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "\\(10 - 3 \\times 2 =\\)",
    options: [
      { text: "4", correct: true, feedback: "Correct. 10 - 6 = 4." },
      { text: "14", correct: false, feedback: "You added before multiplying." },
      { text: "-16", correct: false, feedback: "Sign error." }
    ],
    retryHint: "Multiply first: 3×2=6." },
  { itemId: "w6", order: 6, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "\\(-6 + (-2) =\\)",
    options: [
      { text: "-8", correct: true, feedback: "Correct." },
      { text: "8", correct: false, feedback: "You added absolute values and lost sign." },
      { text: "-4", correct: false, feedback: "You subtracted." }
    ],
    retryHint: "Adding a negative moves left." },
  { itemId: "w7", order: 7, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "\\((-3)^3 =\\)",
    options: [
      { text: "-27", correct: true, feedback: "Correct. Odd exponent preserves sign." },
      { text: "27", correct: false, feedback: "Sign error." },
      { text: "-9", correct: false, feedback: "3×3=9, then sign?" }
    ],
    retryHint: "(-3)×(-3)×(-3) = -27." },
  { itemId: "w8", order: 8, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the HCF of 16 and 24.",
    options: [
      { text: "8", correct: true, feedback: "Correct." },
      { text: "4", correct: false, feedback: "Not the highest." },
      { text: "48", correct: false, feedback: "That's LCM." }
    ],
    retryHint: "16=2⁴, 24=2³×3; HCF=2³=8." }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    question: "\\(-8 + 5 - (-2) =\\)",
    options: [
      { text: "-1", correct: true, feedback: "-8+5+2=-1." },
      { text: "-5", correct: false, feedback: "Check your signs." },
      { text: "-11", correct: false, feedback: "Check your signs." },
      { text: "1", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "d2", order: 2, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    question: "Simplify \\((2 \\times 5)^3\\).",
    options: [
      { text: "1000", correct: true, feedback: "(2×5)³ = 10³ = 1000. Also (ab)³ = a³b³ = 8×125 = 1000." },
      { text: "40", correct: false, feedback: "Check the exponent applies to the whole product." },
      { text: "250", correct: false, feedback: "Check your calculation." },
      { text: "133", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d3", order: 3, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "How many trailing zeros does \\(2^{12} \\times 5^{10}\\) have?",
    options: [
      { text: "10", correct: true, feedback: "2¹²×5¹⁰ = 2²×(2¹⁰×5¹⁰)=4×10¹⁰ → 10 zeros." },
      { text: "12", correct: false, feedback: "Check your working." },
      { text: "22", correct: false, feedback: "You added the exponents; that's not the number of trailing zeros." },
      { text: "1", correct: false, feedback: "Check your working." }
    ] },
  { itemId: "d4", order: 4, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "T",
    question: "Evaluate: \\(-3^2 + 4 \\times 2\\)",
    options: [
      { text: "-1", correct: true, feedback: "-3² = -9; 4×2=8; -9+8=-1. Trap: -3² is -(3²)." },
      { text: "17", correct: false, feedback: "Check the order of operations." },
      { text: "-2", correct: false, feedback: "Check your calculation." },
      { text: "2", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "S",
    question: "\\(\\sqrt{64} + \\sqrt[3]{-8} =\\)",
    options: [
      { text: "6", correct: true, feedback: "8 + (-2) = 6." },
      { text: "10", correct: false, feedback: "Check the sign of the cube root." },
      { text: "-6", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "d6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    question: "How many distinct prime factors does 60 have?",
    options: [
      { text: "3", correct: true, feedback: "60 = 2×2×3×5; distinct: 2,3,5." },
      { text: "4", correct: false, feedback: "Count only distinct primes, not repeats." },
      { text: "2", correct: false, feedback: "You missed a prime factor." }
    ] },
  { itemId: "d7", order: 7, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "If \\(x = -2\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "15", correct: true, feedback: "2×4 + 6 + 1 = 15." },
      { text: "-1", correct: false, feedback: "Check your substitution." },
      { text: "7", correct: false, feedback: "Check your substitution." },
      { text: "-9", correct: false, feedback: "Check your substitution." }
    ] },
  { itemId: "d8", order: 8, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "C",
    question: "\\((-2) \\times 3 \\times (-4) \\div (-6) =\\)",
    options: [
      { text: "-4", correct: true, feedback: "24 ÷ (-6) = -4." },
      { text: "4", correct: false, feedback: "Check your signs." },
      { text: "-2", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d9", order: 9, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "S",
    question: "\\(2^3 \\times 2^4 =\\)",
    options: [
      { text: "2⁷", correct: true, feedback: "Add exponents: 3+4=7." },
      { text: "2¹²", correct: false, feedback: "You multiplied the exponents; add them instead." },
      { text: "6⁷", correct: false, feedback: "The base stays the same; only exponents add." }
    ] },
  { itemId: "d10", order: 10, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    question: "Estimate \\(\\sqrt{82}\\) to the nearest integer.",
    options: [
      { text: "9", correct: true, feedback: "9²=81, very close to 82." },
      { text: "8", correct: false, feedback: "8²=64, too far." },
      { text: "10", correct: false, feedback: "10²=100, too far." }
    ] },
  { itemId: "d11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "T",
    question: "\\(-4 - (-3) + (-2) \\times 2 =\\)",
    options: [
      { text: "-5", correct: true, feedback: "-4+3-4=-5. Trap: multiplication before addition." },
      { text: "-3", correct: false, feedback: "Check the order of operations." },
      { text: "-9", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d12", order: 12, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "H",
    question: "Find the smallest positive integer that has exactly 10 factors.",
    options: [
      { text: "48", correct: true, feedback: "48=2⁴×3 → (4+1)(1+1)=10." },
      { text: "36", correct: false, feedback: "36 has 9 factors." },
      { text: "60", correct: false, feedback: "60 has 12 factors." },
      { text: "16", correct: false, feedback: "You multiplied exponents: 4×1=4, 2⁴=16. Factor counting requires adding 1 to each exponent and multiplying." }
    ] },
  { itemId: "d13", order: 13, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "S",
    question: "\\(6 + 2 \\times (5 - 3) =\\)",
    options: [
      { text: "10", correct: true, feedback: "6+2×2=10." },
      { text: "16", correct: false, feedback: "Check the order of operations." },
      { text: "8", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d14", order: 14, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    question: "Between which two integers does \\(\\sqrt{150}\\) lie?",
    options: [
      { text: "12 and 13", correct: true, feedback: "12²=144, 13²=169." },
      { text: "11 and 12", correct: false, feedback: "11²=121, too low." },
      { text: "13 and 14", correct: false, feedback: "13²=169, already above 150." }
    ] },
  { itemId: "d21", order: 15, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    question: "The temperature at dawn was -5°C. By noon it had risen 12°C, then dropped 8°C by evening. What was the evening temperature?",
    options: [
      { text: "-1°C", correct: true, feedback: "-5 + 12 - 8 = -1." },
      { text: "15°C", correct: false, feedback: "Check your signs." },
      { text: "-25°C", correct: false, feedback: "Check your signs." },
      { text: "-9°C", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "d15", order: 16, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    question: "\\((-5) \\div 5 \\times (-2) =\\)",
    options: [
      { text: "2", correct: true, feedback: "-1 × -2 = 2." },
      { text: "-2", correct: false, feedback: "Check your signs." },
      { text: "0", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d16", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    question: "Find the LCM of 10 and 15.",
    options: [
      { text: "30", correct: true, feedback: "10=2×5, 15=3×5; LCM=2×3×5=30." },
      { text: "5", correct: false, feedback: "That's the HCF, not the LCM." },
      { text: "150", correct: false, feedback: "That's the product, not the LCM." }
    ] },
  { itemId: "d17", order: 18, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "If \\(a=-1, b=2, c=-3\\), evaluate \\(a^2 b - b c^2\\).",
    options: [
      { text: "-16", correct: true, feedback: "1×2 - 2×9 = 2 - 18 = -16." },
      { text: "20", correct: false, feedback: "Check your substitution." },
      { text: "-20", correct: false, feedback: "Check your substitution." },
      { text: "16", correct: false, feedback: "Check your substitution." }
    ] },
  { itemId: "d18", order: 19, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    question: "Estimate \\(\\frac{98 \\times 21}{49}\\) by rounding to 1 s.f.",
    options: [
      { text: "40", correct: true, feedback: "100×20÷50 = 40." },
      { text: "30", correct: false, feedback: "Check your rounding." },
      { text: "50", correct: false, feedback: "Check your rounding." }
    ] },
  { itemId: "d23", order: 20, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    question: "Which statement about -5 and -3 is true?",
    options: [
      { text: "-5 < -3", correct: true, feedback: "On the number line, -5 is to the left of -3, so it is smaller." },
      { text: "-5 > -3", correct: false, feedback: "-5 is further left, so it is smaller." },
      { text: "-5 = -3", correct: false, feedback: "They are different numbers." },
      { text: "-5 ≥ -3", correct: false, feedback: "-5 is not greater than or equal to -3." }
    ] },
  { itemId: "d24", order: 21, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    question: "How far apart are -3 and 4 on the number line?",
    options: [
      { text: "7", correct: true, feedback: "Distance from -3 to 4 is 7 units." },
      { text: "-7", correct: false, feedback: "Distance is always positive." },
      { text: "1", correct: false, feedback: "Check your subtraction." },
      { text: "-1", correct: false, feedback: "Distance is always positive." }
    ] },
  { itemId: "d22", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{16+9} = 5\\)", correct: true, feedback: "16+9=25, √25=5." },
      { text: "\\(\\sqrt{16+9} = 7\\)", correct: false, feedback: "The square root does not distribute over addition." },
      { text: "\\(\\sqrt{16+9} = 12\\)", correct: false, feedback: "Multiplication does not apply here either." },
      { text: "\\(\\sqrt{16+9} = 25\\)", correct: false, feedback: "You forgot to take the square root." }
    ] },
  { itemId: "d19", order: 23, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    question: "\\((-3) \\times 5 \\div (-1) =\\)",
    options: [
      { text: "15", correct: true, feedback: "-15 ÷ -1 = 15." },
      { text: "-15", correct: false, feedback: "Check your signs." },
      { text: "-8", correct: false, feedback: "Check your calculation." },
      { text: "8", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "d20", order: 24, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    question: "Which is equal to \\(4^3\\)?",
    options: [
      { text: "2⁶", correct: true, feedback: "4=2², so 4³=(2²)³=2⁶=64." },
      { text: "2⁵", correct: false, feedback: "Check the exponent rule for powers of a power." },
      { text: "4⁴", correct: false, feedback: "Check your working." },
      { text: "12", correct: false, feedback: "You multiplied the base by the exponent: 4×3=12." }
    ] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    question: "\\(-9 + 6 - (-3) =\\)",
    options: [
      { text: "0", correct: true, feedback: "-9+6+3=0." },
      { text: "-6", correct: false, feedback: "Check your signs." },
      { text: "-12", correct: false, feedback: "Check your signs." },
      { text: "6", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "r2", order: 2, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    question: "Simplify \\((3 \\times 4)^2\\).",
    options: [
      { text: "144", correct: true, feedback: "12² = 144. Also (3×4)² = 3²×4² = 9×16 = 144." },
      { text: "48", correct: false, feedback: "Check the exponent applies to the whole product." },
      { text: "36", correct: false, feedback: "Check your calculation." },
      { text: "25", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r3", order: 3, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "How many trailing zeros does \\(2^8 \\times 5^6\\) have?",
    options: [
      { text: "6", correct: true, feedback: "2⁸×5⁶ = 2²×(2⁶×5⁶)=4×10⁶ → 6 zeros." },
      { text: "8", correct: false, feedback: "Check your working." },
      { text: "14", correct: false, feedback: "You added the exponents; that's not the number of trailing zeros." },
      { text: "1", correct: false, feedback: "Check your working." }
    ] },
  { itemId: "r4", order: 4, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "T",
    question: "Evaluate: \\(-2^3 + 3 \\times (-2)\\)",
    options: [
      { text: "-14", correct: true, feedback: "-2³=-8; 3×(-2)=-6; -8-6=-14. Trap: -2³=-(2³)=-8." },
      { text: "2", correct: false, feedback: "Check the order of operations." },
      { text: "-2", correct: false, feedback: "Check your calculation." },
      { text: "14", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "r5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "S",
    question: "\\(\\sqrt{100} + \\sqrt[3]{-27} =\\)",
    options: [
      { text: "7", correct: true, feedback: "10 + (-3) = 7." },
      { text: "13", correct: false, feedback: "Check the sign of the cube root." },
      { text: "-7", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "r6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    question: "How many distinct prime factors does 84 have?",
    options: [
      { text: "3", correct: true, feedback: "84=2²×3×7; distinct: 2,3,7." },
      { text: "4", correct: false, feedback: "Count only distinct primes, not repeats." },
      { text: "2", correct: false, feedback: "You missed a prime factor." }
    ] },
  { itemId: "r7", order: 7, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "If \\(x = -3\\), evaluate \\(3x^2 - 2x + 4\\).",
    options: [
      { text: "37", correct: true, feedback: "3×9 + 6 + 4 = 37." },
      { text: "-5", correct: false, feedback: "Check your substitution." },
      { text: "31", correct: false, feedback: "Check your substitution." },
      { text: "-23", correct: false, feedback: "Check your substitution." }
    ] },
  { itemId: "r8", order: 8, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "C",
    question: "\\((-3) \\times 4 \\times (-2) \\div (-8) =\\)",
    options: [
      { text: "-3", correct: true, feedback: "24 ÷ (-8) = -3." },
      { text: "3", correct: false, feedback: "Check your signs." },
      { text: "-1", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r9", order: 9, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "S",
    question: "\\(3^2 \\times 3^3 =\\)",
    options: [
      { text: "3⁵", correct: true, feedback: "Add exponents: 2+3=5." },
      { text: "3⁶", correct: false, feedback: "You multiplied the exponents; add them instead." },
      { text: "9⁵", correct: false, feedback: "The base stays the same; only exponents add." }
    ] },
  { itemId: "r10", order: 10, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    question: "Estimate \\(\\sqrt{63}\\) to the nearest integer.",
    options: [
      { text: "8", correct: true, feedback: "8²=64, very close to 63." },
      { text: "7", correct: false, feedback: "7²=49, too far." },
      { text: "9", correct: false, feedback: "9²=81, too far." }
    ] },
  { itemId: "r11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "T",
    question: "\\(-5 - (-2) + (-3) \\times 2 =\\)",
    options: [
      { text: "-9", correct: true, feedback: "-5+2-6=-9. Trap: multiplication before addition." },
      { text: "-3", correct: false, feedback: "Check the order of operations." },
      { text: "-15", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r12", order: 12, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "H",
    question: "Find the smallest positive integer that has exactly 12 factors.",
    options: [
      { text: "60", correct: true, feedback: "60=2²×3×5 → (2+1)(1+1)(1+1)=12." },
      { text: "72", correct: false, feedback: "72 has more than 12 factors; check smaller options." },
      { text: "48", correct: false, feedback: "48 has 10 factors, not 12." },
      { text: "16", correct: false, feedback: "16 has only 5 factors." }
    ] },
  { itemId: "r13", order: 13, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "S",
    question: "\\(8 + 3 \\times (4 - 2) =\\)",
    options: [
      { text: "14", correct: true, feedback: "8+3×2=14." },
      { text: "22", correct: false, feedback: "Check the order of operations." },
      { text: "10", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r14", order: 14, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    question: "Between which two integers does \\(\\sqrt{200}\\) lie?",
    options: [
      { text: "14 and 15", correct: true, feedback: "14²=196, 15²=225." },
      { text: "13 and 14", correct: false, feedback: "13²=169, too low." },
      { text: "15 and 16", correct: false, feedback: "15²=225, already above 200." }
    ] },
  { itemId: "r21", order: 15, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    question: "The temperature at midnight was -3°C. It rose 9°C by morning, then fell 5°C by midday. What was the midday temperature?",
    options: [
      { text: "1°C", correct: true, feedback: "-3 + 9 - 5 = 1." },
      { text: "11°C", correct: false, feedback: "Check your signs." },
      { text: "-17°C", correct: false, feedback: "Check your signs." },
      { text: "-7°C", correct: false, feedback: "Check your signs." }
    ] },
  { itemId: "r15", order: 16, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    question: "\\((-6) \\div 3 \\times (-4) =\\)",
    options: [
      { text: "8", correct: true, feedback: "-2 × -4 = 8." },
      { text: "-8", correct: false, feedback: "Check your signs." },
      { text: "0", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r16", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    question: "Find the LCM of 12 and 18.",
    options: [
      { text: "36", correct: true, feedback: "12=2²×3, 18=2×3²; LCM=2²×3²=36." },
      { text: "6", correct: false, feedback: "That's the HCF, not the LCM." },
      { text: "216", correct: false, feedback: "That's the product, not the LCM." }
    ] },
  { itemId: "r17", order: 18, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    question: "If \\(a=2, b=-1, c=-4\\), evaluate \\(a b^2 - b c^2\\).",
    options: [
      { text: "18", correct: true, feedback: "2×1 - (-1)×16 = 2 + 16 = 18." },
      { text: "-14", correct: false, feedback: "Check your substitution." },
      { text: "-18", correct: false, feedback: "Check your substitution." },
      { text: "14", correct: false, feedback: "Check your substitution." }
    ] },
  { itemId: "r18", order: 19, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    question: "Estimate \\(\\frac{198 \\times 32}{49}\\) by rounding to 1 s.f.",
    options: [
      { text: "120", correct: true, feedback: "200×30÷50 = 120." },
      { text: "100", correct: false, feedback: "Check your rounding." },
      { text: "150", correct: false, feedback: "Check your rounding." }
    ] },
  { itemId: "r23", order: 20, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    question: "Which statement about -2 and -6 is true?",
    options: [
      { text: "-2 > -6", correct: true, feedback: "-2 is to the right of -6 on the number line, so it is larger." },
      { text: "-2 < -6", correct: false, feedback: "-2 is to the right of -6, so it is larger." },
      { text: "-2 = -6", correct: false, feedback: "They are different numbers." },
      { text: "-2 ≤ -6", correct: false, feedback: "-2 is not less than or equal to -6." }
    ] },
  { itemId: "r24", order: 21, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    question: "How far apart are -7 and 2 on the number line?",
    options: [
      { text: "9", correct: true, feedback: "Distance = |-7 - 2| = 9." },
      { text: "-9", correct: false, feedback: "Distance is always positive." },
      { text: "5", correct: false, feedback: "Check your subtraction." },
      { text: "-5", correct: false, feedback: "Distance is always positive." }
    ] },
  { itemId: "r22", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{9+16} = 5\\)", correct: true, feedback: "√25 = 5." },
      { text: "\\(\\sqrt{9+16} = 7\\)", correct: false, feedback: "The square root does not distribute over addition." },
      { text: "\\(\\sqrt{9+16} = 12\\)", correct: false, feedback: "Multiplication does not apply here either." },
      { text: "\\(\\sqrt{9+16} = 25\\)", correct: false, feedback: "You forgot to take the square root." }
    ] },
  { itemId: "r19", order: 23, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    question: "\\((-4) \\times 6 \\div (-2) =\\)",
    options: [
      { text: "12", correct: true, feedback: "-24 ÷ -2 = 12." },
      { text: "-12", correct: false, feedback: "Check your signs." },
      { text: "-10", correct: false, feedback: "Check your calculation." },
      { text: "10", correct: false, feedback: "Check your calculation." }
    ] },
  { itemId: "r20", order: 24, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    question: "Which is equal to \\(9^2\\)?",
    options: [
      { text: "3⁴", correct: true, feedback: "9=3², so 9²=(3²)²=3⁴=81." },
      { text: "3³", correct: false, feedback: "Check the exponent rule for powers of a power." },
      { text: "9³", correct: false, feedback: "Check your working." },
      { text: "18", correct: false, feedback: "You multiplied the base by the exponent: 9×2=18." }
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
    title: "Integers, Powers & Roots — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every Integers, Powers & Roots cluster, with skip/review and a personalised recheck.",
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

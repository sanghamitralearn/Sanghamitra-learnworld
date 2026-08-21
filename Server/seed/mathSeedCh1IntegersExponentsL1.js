// seed/mathSeedCh1IntegersExponentsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 1
// (Integers, Powers & Roots), Level 1 — converted from the standalone
// HTML file ch1-integers-exponents-level-1.html.
//
// Run with: node seed/mathSeedCh1IntegersExponentsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-1-integers-exponents";
const CHAPTER_NAME = "Integers, Powers & Roots";
const LEVEL = 1;

const CLUSTER_NAMES = {
  NEG_ADDSUB: "Adding/Subtracting Negatives",
  NEG_MULDIV: "Multiplying/Dividing Negatives",
  POWERS: "Powers",
  ROOTS: "Roots",
  ORDER_OPS: "Order of Operations",
  PRIME: "Prime Factorisation",
  ESTIMATION: "Estimation",
  EXTENSION: "Extension"
};

const warmupItems = [
  { itemId: "w1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Calculate: 5 + (-3)",
    options: [
      { text: "2", correct: true, feedback: "Correct. Adding a negative is like subtracting." },
      { text: "8", correct: false, feedback: "You added 3 instead of subtracting." }
    ],
    retryHint: "Adding a negative number moves left on the number line." },
  { itemId: "w2", order: 2, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Calculate: -7 - (-2)",
    options: [
      { text: "-5", correct: true, feedback: "Correct. -7 + 2 = -5." },
      { text: "-9", correct: false, feedback: "You subtracted 2 instead of adding 2." }
    ],
    retryHint: "Subtracting a negative is the same as adding the positive." },
  { itemId: "w3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "What is 3²?",
    options: [
      { text: "9", correct: true, feedback: "Correct. 3×3 = 9." },
      { text: "6", correct: false, feedback: "That's 3×2, not 3 squared." }
    ],
    retryHint: "Square means multiply the number by itself." },
  { itemId: "w4", order: 4, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "What is (-2)³?",
    options: [
      { text: "-8", correct: true, feedback: "Correct. (-2)×(-2)×(-2) = -8." },
      { text: "8", correct: false, feedback: "A negative cubed stays negative." },
      { text: "-6", correct: false, feedback: "That would be -2×3." }
    ],
    retryHint: "An odd exponent keeps the sign of the base." },
  { itemId: "w5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "√81 equals:",
    options: [
      { text: "9", correct: true, feedback: "Correct. 9×9 = 81." },
      { text: "-9", correct: false, feedback: "The principal square root is positive." },
      { text: "40.5", correct: false, feedback: "You halved the number instead of finding the root." }
    ],
    retryHint: "What number multiplied by itself gives 81?" },
  { itemId: "w6", order: 6, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "³√27 equals:",
    options: [
      { text: "3", correct: true, feedback: "Correct. 3×3×3 = 27." },
      { text: "9", correct: false, feedback: "9 is the square root of 81, not cube root of 27." }
    ],
    retryHint: "Which number cubed is 27?" },
  { itemId: "w7", order: 7, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "Evaluate: 2 + 3 × 4",
    options: [
      { text: "14", correct: true, feedback: "Correct. Multiplication before addition: 2+12=14." },
      { text: "20", correct: false, feedback: "You added before multiplying." }
    ],
    retryHint: "Remember PEMDAS/BIDMAS: multiplication comes before addition." },
  { itemId: "w8", order: 8, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "Simplify: 10 - (4+2)",
    options: [
      { text: "4", correct: true, feedback: "Correct. Inside parentheses first: 10-6=4." },
      { text: "8", correct: false, feedback: "You did 10-4+2=8, but subtraction isn't associative." }
    ],
    retryHint: "Always do inside the parentheses first." },
  { itemId: "w9", order: 9, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "What is the prime factorisation of 12?",
    options: [
      { text: "2² × 3", correct: true, feedback: "Correct. 12 = 2×2×3 = 2²×3." },
      { text: "3×4", correct: false, feedback: "4 is not prime." }
    ],
    retryHint: "Break down into prime factors: 12 = 2×6 = 2×2×3." },
  { itemId: "w10", order: 10, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Write 20 as a product of primes, using indices.",
    options: [
      { text: "2² × 5", correct: true, feedback: "Correct. 20 = 2×2×5." },
      { text: "2×10", correct: false, feedback: "10 is not prime." }
    ],
    retryHint: "20 ÷ 2 = 10, 10 ÷ 2 = 5 → 2²×5." },
  { itemId: "w11", order: 11, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "√10 lies between which two consecutive whole numbers?",
    options: [
      { text: "3 and 4", correct: true, feedback: "Correct. 3²=9, 4²=16, so √10 is between." },
      { text: "2 and 3", correct: false, feedback: "2²=4, 3²=9, too low." }
    ],
    retryHint: "Square 3 and 4: 9 and 16." },
  { itemId: "w12", order: 12, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "Estimate ³√30 to the nearest whole number.",
    options: [
      { text: "3", correct: true, feedback: "Correct. 3³=27, 4³=64, so 3 is nearer." },
      { text: "4", correct: false, feedback: "4³=64, much further from 30." }
    ],
    retryHint: "3³=27, 4³=64. Which is closer to 30?" }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Compute: -12 + 7 - (-4)",
    options: [
      { text: "-1", correct: true, feedback: "Correct. -12+7=-5, then -5+4=-1." },
      { text: "-9", correct: false, feedback: "You likely missed the double negative." },
      { text: "-23", correct: false, feedback: "You added all as negatives." },
      { text: "-17", correct: false, feedback: "Check the sign of 4." }
    ],
    backward: "Subtracting a negative is adding a positive.",
    forward: "This skill is essential for solving equations with negative coefficients later." },
  { itemId: "d2", order: 2, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    question: "What is (-3) × (-4) × (-2)?",
    options: [
      { text: "-24", correct: true, feedback: "Correct. Two negatives make a positive, then times -2 gives -24." },
      { text: "24", correct: false, feedback: "Three negatives give a negative." },
      { text: "-9", correct: false, feedback: "You added instead of multiplied?" },
      { text: "-12", correct: false, feedback: "You only multiplied two numbers." }
    ],
    backward: "Odd number of negatives → negative product.",
    forward: "This rule will help when simplifying algebraic expressions like -a×b×c." },
  { itemId: "d3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "Which expression equals 16?",
    options: [
      { text: "(-2)⁴", correct: true, feedback: "Correct. (-2)×(-2)×(-2)×(-2)=16." },
      { text: "-2⁴", correct: false, feedback: "-2⁴ = -(2⁴) = -16." },
      { text: "2³", correct: false, feedback: "2³=8." },
      { text: "(-1)⁶", correct: false, feedback: "(-1)⁶ = 1, not 16." }
    ],
    backward: "Parentheses matter: (-2)⁴ = 16, -2⁴ = -16.",
    forward: "This distinction is vital when graphing functions like y = x² versus y = -x²." },
  { itemId: "d4", order: 4, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "What is √((-5)²)?",
    options: [
      { text: "5", correct: true, feedback: "Correct. √(25)=5, the absolute value." },
      { text: "-5", correct: false, feedback: "The square root symbol always gives the principal (non-negative) root." },
      { text: "±5", correct: false, feedback: "The √ symbol does not mean ± unless solving an equation." }
    ],
    backward: "√(a²) = |a|, not ±a.",
    forward: "This precision is needed when solving quadratic equations and distance formulas." },
  { itemId: "d5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "Evaluate: 4 + 2² × 3 - (-2)",
    options: [
      { text: "18", correct: true, feedback: "Correct. 2²=4, 4×3=12, 4+12=16, then minus -2 = 18." },
      { text: "22", correct: false, feedback: "You might have added before multiplying." },
      { text: "14", correct: false, feedback: "Check the subtraction of a negative." }
    ],
    backward: "Order: exponents → multiplication → addition/subtraction.",
    forward: "Complex expressions like this appear in physics formulas and algebraic manipulations." },
  { itemId: "d6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Write 72 as a product of prime factors, using index notation.",
    options: [
      { text: "2³ × 3²", correct: true, feedback: "Correct. 72=8×9=2³×3². Remember: 1 is neither prime nor composite, so it never appears in prime factorisation." },
      { text: "2² × 3³", correct: false, feedback: "That gives 4×27=108." },
      { text: "2×36", correct: false, feedback: "36 is not prime." }
    ],
    backward: "Prime factorization helps with finding HCF and LCM.",
    forward: "This skill is crucial for simplifying fractions and algebraic fractions later." },
  { itemId: "d7", order: 7, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "Estimate: (-4.8) × 2.1 ≈ ?",
    options: [
      { text: "-10", correct: true, feedback: "Correct. -5×2 = -10, a reasonable estimate." },
      { text: "-7", correct: false, feedback: "That would be -3.5×2, far off." },
      { text: "-12", correct: false, feedback: "-6×2 = -12, but -4.8 is closer to -5 than -6." }
    ],
    backward: "Round numbers to one significant figure for quick approximation.",
    forward: "Estimation with negatives is useful for checking answers in measurement and finance." },
  { itemId: "d8", order: 8, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    question: "Evaluate: (-2)³ + √81 - (-5)",
    options: [
      { text: "6", correct: true, feedback: "Correct. (-2)³=-8, √81=9, -8+9+5=6." },
      { text: "-6", correct: false, feedback: "Check the sign of 5." },
      { text: "16", correct: false, feedback: "Did you treat √81 as 9 and ignore the negative cube?" }
    ],
    backward: "Combine separate skills: powers, roots, and sign rules.",
    forward: "Multi-step problems like this appear in algebraic expressions and will be expanded to include variables." },
  { itemId: "d9", order: 9, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "The temperature drops from -5°C to -12°C. What is the change?",
    options: [
      { text: "-7°C", correct: true, feedback: "Correct. -12 - (-5) = -7." },
      { text: "7°C", correct: false, feedback: "You subtracted in the wrong order." },
      { text: "-17°C", correct: false, feedback: "You added the absolute values." }
    ],
    backward: "Change = final - initial.",
    forward: "Understanding signed numbers is essential for science and finance." },
  { itemId: "d10", order: 10, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    question: "(-15) ÷ (-5) × (-2) equals:",
    options: [
      { text: "-6", correct: true, feedback: "Correct. -15 ÷ -5 = 3, then 3 × -2 = -6." },
      { text: "6", correct: false, feedback: "Watch the sign on the last multiplication." },
      { text: "-4", correct: false, feedback: "Check the division." }
    ],
    backward: "Division and multiplication same precedence, left to right.",
    forward: "This pattern appears in fraction simplification and rational expressions." },
  { itemId: "d11", order: 11, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "Which is larger: 2⁵ or 5²?",
    options: [
      { text: "2⁵", correct: true, feedback: "Correct. 2⁵=32, 5²=25." },
      { text: "5²", correct: false, feedback: "25 < 32." },
      { text: "They are equal", correct: false, feedback: "32 ≠ 25." }
    ],
    backward: "Powers grow quickly.",
    forward: "Understanding exponential growth is key for compound interest and science." },
  { itemId: "d12", order: 12, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "The cube root of -64 is:",
    options: [
      { text: "-4", correct: true, feedback: "Correct. (-4)³ = -64." },
      { text: "4", correct: false, feedback: "4³ = 64, not -64." },
      { text: "-8", correct: false, feedback: "(-8)³ = -512." },
      { text: "Not a real number", correct: false, feedback: "Cube roots of negatives are real." }
    ],
    backward: "Cube root of a negative is negative.",
    forward: "This contrasts with square roots, where √(-1) is not real (coming later)." },
  { itemId: "d28", order: 13, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Find the distance between -3 and 2 on the number line.",
    options: [
      { text: "5", correct: true, feedback: "Correct. Distance is |-3 - 2| = 5." },
      { text: "-5", correct: false, feedback: "Distance cannot be negative." },
      { text: "1", correct: false, feedback: "You subtracted the numbers incorrectly." },
      { text: "-1", correct: false, feedback: "You found a directed difference, but distance is always positive." }
    ],
    backward: "Distance is always positive.",
    forward: "This idea of absolute distance extends to coordinate geometry." },
  { itemId: "d13", order: 14, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "Insert brackets to make true: 12 ÷ 2 + 4 × 3 = 6",
    options: [
      { text: "12 ÷ (2 + 4) × 3", correct: true, feedback: "Correct. 12 ÷ 6 × 3 = 2×3=6." },
      { text: "(12 ÷ 2) + 4 × 3", correct: false, feedback: "That gives 6+12=18." },
      { text: "12 ÷ 2 + (4 × 3)", correct: false, feedback: "That's 6+12=18." }
    ],
    backward: "Brackets change the order of operations.",
    forward: "Mastering order of operations is critical for writing correct formulas in spreadsheets and programming." },
  { itemId: "d14", order: 15, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "Simplify \\((2 \\times 3)^2\\).",
    options: [
      { text: "36", correct: true, feedback: "Correct. (2×3)² = 6² = 36. Also, (ab)² = a²b² = 4×9 = 36." },
      { text: "12", correct: false, feedback: "You multiplied 2² by 3. The exponent applies to the whole product, so both 2 and 3 must be squared." },
      { text: "18", correct: false, feedback: "You multiplied 2 by 3². The exponent applies to both numbers." },
      { text: "6", correct: false, feedback: "You forgot the exponent and just multiplied 2×3. The ² means square the entire product." }
    ],
    backward: "The rule (ab)^m = a^m b^m is a key exponent law.",
    forward: "This rule will be used when simplifying algebraic expressions like (2x)³." },
  { itemId: "d15", order: 16, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "Estimate √50 to the nearest whole number.",
    options: [
      { text: "7", correct: true, feedback: "Correct. 7²=49, close to 50." },
      { text: "5", correct: false, feedback: "5²=25." },
      { text: "8", correct: false, feedback: "8²=64, further away." }
    ],
    backward: "Find the nearest perfect square.",
    forward: "Estimation of roots is useful when checking calculator results and in geometry." },
  { itemId: "d26", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the highest common factor (HCF) of 36 and 60 using prime factorisation.",
    options: [
      { text: "12", correct: true, feedback: "Correct. 36=2²×3², 60=2²×3×5; common primes: 2²×3=12." },
      { text: "6", correct: false, feedback: "You took the smallest powers; 2²×3=12, not 2×3=6." },
      { text: "18", correct: false, feedback: "You used 2×3²=18; the common power of 2 is 2²." },
      { text: "180", correct: false, feedback: "You multiplied all prime factors as if finding the LCM." }
    ],
    backward: "Prime factorisation makes finding the HCF systematic.",
    forward: "HCF is essential when simplifying fractions and algebraic fractions." },
  { itemId: "d16", order: 18, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    question: "If 2ˣ = 64, what is x?",
    options: [
      { text: "6", correct: true, feedback: "Correct. 2⁶=64." },
      { text: "8", correct: false, feedback: "2⁸=256." },
      { text: "5", correct: false, feedback: "2⁵=32." }
    ],
    backward: "Powers can be reversed with roots or logarithms.",
    forward: "This idea leads to logarithms later." },
  { itemId: "d17", order: 19, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Simplify: -(-(-5))",
    options: [
      { text: "-5", correct: true, feedback: "Correct. Three negatives make negative." },
      { text: "5", correct: false, feedback: "Two negatives would make positive, but here there are three." }
    ],
    backward: "Count the number of negative signs.",
    forward: "This pattern appears in algebraic simplifications like -(-x) = x, but -(-(-x)) = -x." },
  { itemId: "d18", order: 20, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    question: "What is the product of all integers from -3 to 3?",
    options: [
      { text: "0", correct: true, feedback: "Correct. The list includes 0, so the product is 0." },
      { text: "36", correct: false, feedback: "You ignored the zero." },
      { text: "-36", correct: false, feedback: "Zero makes the product zero." }
    ],
    backward: "Multiplying by zero yields zero.",
    forward: "This property is used when factoring polynomials: if any factor is zero, the product is zero." },
  { itemId: "d19", order: 21, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "Simplify: (3²)³",
    options: [
      { text: "3⁶", correct: true, feedback: "Correct. (3²)³ = 3^(2×3)=3⁶." },
      { text: "3⁵", correct: false, feedback: "That would be 3²×3³." },
      { text: "3⁸", correct: false, feedback: "2³=8, but the base is 3, not 2." }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws will be extended to algebra and negative exponents later." },
  { itemId: "d20", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{16+9} = 5\\)", correct: true, feedback: "Correct. 16+9=25, and √25 = 5." },
      { text: "\\(\\sqrt{16+9} = \\sqrt{16} + \\sqrt{9} = 7\\)", correct: false, feedback: "The square root does not distribute over addition. √16+√9 = 4+3 = 7, but √(16+9) = √25 = 5." },
      { text: "\\(\\sqrt{16+9} = \\sqrt{16} \\times \\sqrt{9} = 12\\)", correct: false, feedback: "Multiplication also does not apply. √(a+b) is not √a × √b." },
      { text: "\\(\\sqrt{16+9} = 25\\)", correct: false, feedback: "You forgot to take the square root. 16+9=25, but the question asks for the square root of the sum." }
    ],
    backward: "The square root applies to the entire expression inside it.",
    forward: "This distinction is vital when simplifying algebraic expressions under a radical." },
  { itemId: "d27", order: 23, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the lowest common multiple (LCM) of 12 and 20 using prime factorisation.",
    options: [
      { text: "60", correct: true, feedback: "Correct. 12=2²×3, 20=2²×5; LCM=2²×3×5=60." },
      { text: "120", correct: false, feedback: "You doubled the correct LCM; check the prime factorisation." },
      { text: "4", correct: false, feedback: "You found the HCF, not the LCM." },
      { text: "240", correct: false, feedback: "You multiplied the numbers and divided incorrectly; use prime factorisation." }
    ],
    backward: "LCM uses the highest power of each prime that appears in either number.",
    forward: "LCM is crucial for adding and subtracting fractions with different denominators." },
  { itemId: "d21", order: 24, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "Evaluate: -3² + 4 × 2",
    options: [
      { text: "-1", correct: true, feedback: "Correct. -3² = -9, 4×2=8, -9+8=-1." },
      { text: "-2", correct: false, feedback: "You might have calculated -3² as 9." },
      { text: "-17", correct: false, feedback: "Check the order." }
    ],
    backward: "Exponent before multiplication, and note -3² = -(3²).",
    forward: "This exact trap appears in many algebra problems." },
  { itemId: "d22", order: 25, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "How many prime factors (with multiplicity) does 48 have?",
    options: [
      { text: "5", correct: true, feedback: "Correct. 48=2⁴×3 → 4+1=5 factors." },
      { text: "4", correct: false, feedback: "That's only the exponent of 2." },
      { text: "6", correct: false, feedback: "48=2×2×2×2×3, exactly 5 factors." }
    ],
    backward: "Count each occurrence of a prime factor.",
    forward: "The total number of prime factors is used in number theory and cryptography." },
  { itemId: "d23", order: 26, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "A cube has volume 60 cm³. Estimate its side length to the nearest whole number.",
    options: [
      { text: "4 cm", correct: true, feedback: "Correct. 4³=64, close to 60." },
      { text: "3 cm", correct: false, feedback: "3³=27, too small." },
      { text: "5 cm", correct: false, feedback: "5³=125, too big." }
    ],
    backward: "Side = ³√volume.",
    forward: "Estimation of cube roots is useful in physics and engineering." },
  { itemId: "d24", order: 27, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    question: "If a = -2, b = 3, find the value of a² + b² - 2ab.",
    options: [
      { text: "25", correct: true, feedback: "Correct. (-2)²=4, 3²=9, -2ab=-2(-2)(3)=12, total 4+9+12=25." },
      { text: "1", correct: false, feedback: "Check the sign of 2ab." },
      { text: "13", correct: false, feedback: "You might have missed the -2ab term." }
    ],
    backward: "Substitute carefully, then use order of operations.",
    forward: "This expression is (a-b)², an important algebraic identity." },
  { itemId: "d25", order: 28, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "Which statement about -5 and -3 is true?",
    options: [
      { text: "-5 < -3", correct: true, feedback: "Correct. On the number line, -5 is to the left of -3, so it is smaller." },
      { text: "-5 > -3", correct: false, feedback: "-5 is further left on the number line, so it is smaller, not larger." },
      { text: "-5 = -3", correct: false, feedback: "They are different numbers." },
      { text: "-5 ≥ -3", correct: false, feedback: "-5 is not greater than or equal to -3." }
    ],
    backward: "Further left on the number line means smaller.",
    forward: "Comparing signed numbers is essential for inequalities and ordering." }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "-8 - (-3) + 2 =",
    options: [
      { text: "-3", correct: true, feedback: "-8+3+2 = -3." },
      { text: "-7", correct: false, feedback: "-8+3+2 = -3, not -7." }
    ],
    backward: "Subtracting a negative adds the positive." },
  { itemId: "r2", order: 2, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    question: "(-2) × 5 × (-1) =",
    options: [
      { text: "10", correct: true, feedback: "Two negatives give positive: -2×5 = -10, -10×-1 = 10." },
      { text: "-10", correct: false, feedback: "You missed the second negative." }
    ],
    backward: "Even number of negatives → positive." },
  { itemId: "r3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    question: "Which is correct?",
    options: [
      { text: "(-3)² = 9", correct: true, feedback: "Yes." },
      { text: "-3² = 9", correct: false, feedback: "-3² = -9." },
      { text: "Both are equal", correct: false, feedback: "They differ." }
    ],
    backward: "Parentheses matter." },
  { itemId: "r4", order: 4, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    question: "³√(-8) =",
    options: [
      { text: "-2", correct: true, feedback: "(-2)³ = -8." },
      { text: "2", correct: false, feedback: "2³=8." },
      { text: "not real", correct: false, feedback: "Cube roots of negatives are real." }
    ],
    backward: "Odd roots preserve sign." },
  { itemId: "r5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    question: "15 - 3 × 2² =",
    options: [
      { text: "3", correct: true, feedback: "15 - 3×4 = 15-12=3." },
      { text: "-9", correct: false, feedback: "You might have done (15-3)×4=48." }
    ],
    backward: "Exponent first, then multiply, then subtract." },
  { itemId: "r6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Prime factorization of 50:",
    options: [
      { text: "2 × 5²", correct: true, feedback: "50 = 2×25." },
      { text: "5 × 10", correct: false, feedback: "10 not prime." }
    ],
    backward: "Break into primes." },
  { itemId: "r7", order: 7, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "Estimate √20 to nearest whole.",
    options: [
      { text: "4", correct: true, feedback: "4²=16, close." },
      { text: "5", correct: false, feedback: "5²=25, too high." }
    ],
    backward: "Which perfect square is nearest?" },
  { itemId: "r8", order: 8, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    question: "If x = -4, what is x³ + x²?",
    options: [
      { text: "-48", correct: true, feedback: "(-4)³=-64, (-4)²=16, sum -48." },
      { text: "-80", correct: false, feedback: "Check the square term." }
    ],
    backward: "Substitute and evaluate." },
  { itemId: "r9", order: 9, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the HCF of 24 and 36.",
    options: [
      { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3²; HCF=2²×3=12." },
      { text: "6", correct: false, feedback: "Not the highest." },
      { text: "72", correct: false, feedback: "That's LCM." }
    ],
    backward: "Use prime factorisation." },
  { itemId: "r10", order: 10, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    question: "Find the LCM of 8 and 12.",
    options: [
      { text: "24", correct: true, feedback: "8=2³, 12=2²×3; LCM=2³×3=24." },
      { text: "48", correct: false, feedback: "That's larger than necessary — check your multiples." },
      { text: "4", correct: false, feedback: "That's HCF." }
    ],
    backward: "LCM uses highest powers." },
  { itemId: "r11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    question: "On a number line, what is the distance between -4 and 3?",
    options: [
      { text: "7", correct: true, feedback: "|-4-3|=7." },
      { text: "-7", correct: false, feedback: "Distance is positive." },
      { text: "1", correct: false, feedback: "Check your subtraction." }
    ],
    backward: "Distance = absolute difference." },
  { itemId: "r12", order: 12, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    question: "Estimate √40 to the nearest whole number.",
    options: [
      { text: "6", correct: true, feedback: "6²=36, close to 40." },
      { text: "7", correct: false, feedback: "7²=49, too high." },
      { text: "5", correct: false, feedback: "5²=25, too low." }
    ],
    backward: "Find the nearest perfect square." }
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
    title: "Integers, Powers & Roots — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Integer arithmetic, powers, roots, order of operations, and prime factorisation — warm-up, diagnostic, and spaced recheck for core fluency.",
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

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
    skillId: "INTADD-01",
    question: "Calculate: 5 + (-3)",
    options: [
      { text: "2", correct: true, feedback: "Correct. Adding a negative is like subtracting." },
      { text: "8", correct: false, feedback: "You added 3 instead of subtracting.", misconceptionId: "E-w1-a" }
    ],
    retryHint: "Adding a negative number moves left on the number line.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student adds the absolute value of the negative number instead of subtracting it, treating +(-3) as if it were +3.",
        rootCause: "Sign Ignored During Addition — drops the negative sign and adds the magnitude instead.",
        remediation: "Adding a negative number means SUBTRACTING its magnitude — 5+(-3) is the same as 5-3=2, not 5+3=8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise the operation", hint: "Adding a negative number is the same as subtracting." },
      { level: 2, description: "Rewrite as subtraction", hint: "5 + (-3) = 5 - 3." },
      { level: 3, description: "Compute", hint: "5 - 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "w2", order: 2, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-02",
    question: "Calculate: -7 - (-2)",
    options: [
      { text: "-5", correct: true, feedback: "Correct. -7 + 2 = -5." },
      { text: "-9", correct: false, feedback: "You subtracted 2 instead of adding 2.", misconceptionId: "E-w2-a" }
    ],
    retryHint: "Subtracting a negative is the same as adding the positive.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student subtracts the magnitude of the negative number instead of adding it, treating -(-2) as if it were -2.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "Subtracting a negative number means ADDING its magnitude — -7-(-2) is the same as -7+2=-5, not -7-2=-9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise the double negative", hint: "Subtracting a negative flips to adding a positive." },
      { level: 2, description: "Rewrite as addition", hint: "-7 - (-2) = -7 + 2." },
      { level: 3, description: "Compute", hint: "-7 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "w3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-01",
    question: "What is 3²?",
    options: [
      { text: "9", correct: true, feedback: "Correct. 3×3 = 9." },
      { text: "6", correct: false, feedback: "That's 3×2, not 3 squared.", misconceptionId: "E-w3-a" }
    ],
    retryHint: "Square means multiply the number by itself.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies the base by the exponent (3×2=6) instead of using the base as a repeated factor.",
        rootCause: "Exponent Misread As Multiplier — treats the exponent as something to multiply by rather than a repeat count.",
        remediation: "3² means 3 MULTIPLIED BY ITSELF (3×3), not 3 times the exponent (3×2) — 3×3=9, not 3×2=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what an exponent means", hint: "3² means 3 used as a factor 2 times." },
      { level: 2, description: "Write it as repeated multiplication", hint: "3 × 3." },
      { level: 3, description: "Compute", hint: "3 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-02",
    question: "What is (-2)³?",
    options: [
      { text: "-8", correct: true, feedback: "Correct. (-2)×(-2)×(-2) = -8." },
      { text: "8", correct: false, feedback: "A negative cubed stays negative.", misconceptionId: "E-w4-a" },
      { text: "-6", correct: false, feedback: "That would be -2×3.", misconceptionId: "E-w4-b" }
    ],
    retryHint: "An odd exponent keeps the sign of the base.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student assumes any exponentiated negative number becomes positive, not distinguishing odd from even exponents.",
        rootCause: "Odd/Even Exponent Rule Not Applied — applies the even-exponent sign rule (negative→positive) to an odd exponent.",
        remediation: "An ODD exponent (like 3) KEEPS the negative sign — (-2)×(-2)×(-2)=-8, not 8 (which would result from an EVEN exponent like 2 or 4)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student multiplies the base by the exponent (-2×3=-6) instead of using the base as a repeated factor.",
        rootCause: "Exponent Misread As Multiplier — treats the exponent as something to multiply by rather than a repeat count.",
        remediation: "(-2)³ means -2 MULTIPLIED BY ITSELF three times ((-2)×(-2)×(-2)), not -2 times the exponent (-2×3) — the correct value is -8, not -6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write it as repeated multiplication", hint: "(-2) × (-2) × (-2)." },
      { level: 2, description: "Multiply the first two factors", hint: "(-2)×(-2) = 4." },
      { level: 3, description: "Multiply by the third factor", hint: "4 × (-2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-01",
    question: "√81 equals:",
    options: [
      { text: "9", correct: true, feedback: "Correct. 9×9 = 81." },
      { text: "-9", correct: false, feedback: "The principal square root is positive.", misconceptionId: "E-w5-a" },
      { text: "40.5", correct: false, feedback: "You halved the number instead of finding the root.", misconceptionId: "E-w5-b" }
    ],
    retryHint: "What number multiplied by itself gives 81?",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student reports the negative root instead of the principal (non-negative) root that the √ symbol represents.",
        rootCause: "Principal Root Convention Not Applied — doesn't recognise that √ always denotes the non-negative root.",
        remediation: "The √ SYMBOL always means the PRINCIPAL (non-negative) root — √81=9, not -9, even though (-9)² also equals 81."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student divides the number by 2 instead of finding its square root, confusing 'root' with 'half'.",
        rootCause: "Root Operation Confused With Division — performs an unrelated halving operation instead of finding the square root.",
        remediation: "√81 asks 'what number times itself gives 81', not 'what is 81 divided by 2' — 9×9=81, so √81=9, not 40.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a square root means", hint: "√81 asks: what number times itself gives 81?" },
      { level: 2, description: "Test candidate numbers", hint: "9×9 = ?" },
      { level: 3, description: "Confirm", hint: "Does 9×9 equal 81?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "w6", order: 6, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-02",
    question: "³√27 equals:",
    options: [
      { text: "3", correct: true, feedback: "Correct. 3×3×3 = 27." },
      { text: "9", correct: false, feedback: "9 is the square root of 81, not cube root of 27.", misconceptionId: "E-w6-a" }
    ],
    retryHint: "Which number cubed is 27?",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student confuses the cube root with a related but different fact (9² is close to some numbers, or misremembers a square root fact), reporting 9 instead of 3.",
        rootCause: "Root Type Confused — applies a fact about a different root/number to this cube root problem.",
        remediation: "³√27 asks 'what number CUBED gives 27' — 3×3×3=27, so the answer is 3, not 9 (which is unrelated to cubing 27)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a cube root means", hint: "³√27 asks: what number cubed gives 27?" },
      { level: 2, description: "Test candidate numbers", hint: "3×3×3 = ?" },
      { level: 3, description: "Confirm", hint: "Does 3×3×3 equal 27?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "w7", order: 7, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-01",
    question: "Evaluate: 2 + 3 × 4",
    options: [
      { text: "14", correct: true, feedback: "Correct. Multiplication before addition: 2+12=14." },
      { text: "20", correct: false, feedback: "You added before multiplying.", misconceptionId: "E-w7-a" }
    ],
    retryHint: "Remember PEMDAS/BIDMAS: multiplication comes before addition.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student evaluates strictly left to right (2+3=5, then 5×4=20) instead of applying operator precedence.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "MULTIPLICATION happens before ADDITION, regardless of left-to-right position — compute 3×4=12 first, then 2+12=14, not (2+3)×4=20."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which operation comes first", hint: "Multiplication comes before addition." },
      { level: 2, description: "Compute the multiplication", hint: "3 × 4 = 12." },
      { level: 3, description: "Complete the addition", hint: "2 + 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w8", order: 8, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-02",
    question: "Simplify: 10 - (4+2)",
    options: [
      { text: "4", correct: true, feedback: "Correct. Inside parentheses first: 10-6=4." },
      { text: "8", correct: false, feedback: "You did 10-4+2=8, but subtraction isn't associative.", misconceptionId: "E-w8-a" }
    ],
    retryHint: "Always do inside the parentheses first.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student drops the parentheses and evaluates as 10-4+2 instead of computing the bracketed sum first.",
        rootCause: "Parentheses Ignored — treats the bracketed expression as if it weren't grouped, changing the operation's meaning.",
        remediation: "The parentheses group (4+2) together — compute that FIRST (4+2=6), THEN subtract from 10: 10-6=4, not 10-4+2=8 (which incorrectly distributes the subtraction)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's inside the parentheses", hint: "4 + 2." },
      { level: 2, description: "Compute the parentheses first", hint: "4 + 2 = 6." },
      { level: 3, description: "Subtract from 10", hint: "10 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w9", order: 9, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-01",
    question: "What is the prime factorisation of 12?",
    options: [
      { text: "2² × 3", correct: true, feedback: "Correct. 12 = 2×2×3 = 2²×3." },
      { text: "3×4", correct: false, feedback: "4 is not prime.", misconceptionId: "E-w9-a" }
    ],
    retryHint: "Break down into prime factors: 12 = 2×6 = 2×2×3.",
    misconceptions: [
      {
        misconceptionId: "E-w9-a",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "3×4 IS a factor pair of 12, but 4 is NOT prime (4=2×2) — keep breaking down until every factor is prime: 12=2×2×3=2²×3, not 3×4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find any factor pair", hint: "12 = 2 × 6." },
      { level: 2, description: "Check if each factor is prime", hint: "2 is prime, but 6 is not — break 6 down further: 6=2×3." },
      { level: 3, description: "Write using index notation", hint: "12 = 2×2×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w10", order: 10, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-01",
    question: "Write 20 as a product of primes, using indices.",
    options: [
      { text: "2² × 5", correct: true, feedback: "Correct. 20 = 2×2×5." },
      { text: "2×10", correct: false, feedback: "10 is not prime.", misconceptionId: "E-w10-a" }
    ],
    retryHint: "20 ÷ 2 = 10, 10 ÷ 2 = 5 → 2²×5.",
    misconceptions: [
      {
        misconceptionId: "E-w10-a",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "2×10 IS a factor pair of 20, but 10 is NOT prime (10=2×5) — keep breaking down until every factor is prime: 20=2×2×5=2²×5, not 2×10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find any factor pair", hint: "20 = 2 × 10." },
      { level: 2, description: "Check if each factor is prime", hint: "2 is prime, but 10 is not — break 10 down further: 10=2×5." },
      { level: 3, description: "Write using index notation", hint: "20 = 2×2×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w11", order: 11, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-01",
    question: "√10 lies between which two consecutive whole numbers?",
    options: [
      { text: "3 and 4", correct: true, feedback: "Correct. 3²=9, 4²=16, so √10 is between." },
      { text: "2 and 3", correct: false, feedback: "2²=4, 3²=9, too low.", misconceptionId: "E-w11-a" }
    ],
    retryHint: "Square 3 and 4: 9 and 16.",
    misconceptions: [
      {
        misconceptionId: "E-w11-a",
        description: "Student picks a lower pair of consecutive integers (2 and 3) whose squares (4 and 9) don't actually bracket 10.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 10 falls between the squares of its endpoints.",
        remediation: "Check: 2²=4 and 3²=9 — 10 is NOT between 4 and 9 (10>9) — instead check 3²=9 and 4²=16: 10 IS between 9 and 16, so √10 is between 3 and 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List squares of nearby whole numbers", hint: "3²=9, 4²=16." },
      { level: 2, description: "Check where 10 falls", hint: "Is 10 between 9 and 16?" },
      { level: 3, description: "Identify the bracketing whole numbers", hint: "Since 9<10<16, √10 is between which two numbers?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "w12", order: 12, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-03",
    question: "Estimate ³√30 to the nearest whole number.",
    options: [
      { text: "3", correct: true, feedback: "Correct. 3³=27, 4³=64, so 3 is nearer." },
      { text: "4", correct: false, feedback: "4³=64, much further from 30.", misconceptionId: "E-w12-a" }
    ],
    retryHint: "3³=27, 4³=64. Which is closer to 30?",
    misconceptions: [
      {
        misconceptionId: "E-w12-a",
        description: "Student rounds up to the next whole number without comparing which cube is actually closer to 30.",
        rootCause: "Nearest-Value Comparison Skipped — rounds up by default instead of checking both nearby cubes' distances.",
        remediation: "Compare the DISTANCES: 30-27=3 (distance to 3³), while 64-30=34 (distance to 4³) — 3 is much closer to 30 than 4 is, so ³√30≈3, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cubes of nearby whole numbers", hint: "3³=27, 4³=64." },
      { level: 2, description: "Compare the distances to 30", hint: "30-27=3, while 64-30=34." },
      { level: 3, description: "Choose the closer cube", hint: "Which cube (27 or 64) is closer to 30?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-03",
    question: "Compute: -12 + 7 - (-4)",
    options: [
      { text: "-1", correct: true, feedback: "Correct. -12+7=-5, then -5+4=-1." },
      { text: "-9", correct: false, feedback: "You likely missed the double negative.", misconceptionId: "E-d1-a" },
      { text: "-23", correct: false, feedback: "You added all as negatives.", misconceptionId: "E-d1-b" },
      { text: "-17", correct: false, feedback: "Check the sign of 4.", misconceptionId: "E-d1-c" }
    ],
    backward: "Subtracting a negative is adding a positive.",
    forward: "This skill is essential for solving equations with negative coefficients later.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student computes -12+7-4=-9, treating the final term as subtract-4 instead of applying the double negative correctly.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "Subtracting a negative (-(-4)) means ADDING 4 — -12+7=-5, then -5+4=-1, not -5-4=-9."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student treats every term as negative, computing -12-7-4=-23 instead of correctly applying each operation's sign.",
        rootCause: "Signs Not Tracked Per Term — loses track of which operations are addition versus subtraction.",
        remediation: "Track each operation separately: -12+7=-5 (this is ADDITION of 7), then -5-(-4)=-5+4=-1 (subtracting a negative) — not -12-7-4=-23, which incorrectly treats 7 as negative too."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student subtracts 4 instead of adding it, misreading the sign after the double negative.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "-(-4) means ADD 4, not subtract 4 — -5+4=-1, not -5-... leading to -17 (a different sign error)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the first two terms", hint: "-12 + 7 = -5." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-4) becomes +4." },
      { level: 3, description: "Complete the calculation", hint: "-5 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d2", order: 2, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    skillId: "INTMUL-01",
    question: "What is (-3) × (-4) × (-2)?",
    options: [
      { text: "-24", correct: true, feedback: "Correct. Two negatives make a positive, then times -2 gives -24." },
      { text: "24", correct: false, feedback: "Three negatives give a negative.", misconceptionId: "E-d2-a" },
      { text: "-9", correct: false, feedback: "You added instead of multiplied?", misconceptionId: "E-d2-b" },
      { text: "-12", correct: false, feedback: "You only multiplied two numbers.", misconceptionId: "E-d2-c" }
    ],
    backward: "Odd number of negatives → negative product.",
    forward: "This rule will help when simplifying algebraic expressions like -a×b×c.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student assumes multiplying three negatives gives a positive, applying the two-negatives-make-positive rule without checking the total count.",
        rootCause: "Sign Rule Miscounted — doesn't correctly track whether the number of negative factors is odd or even.",
        remediation: "Count the negative signs: THREE negatives (odd count) multiply to a NEGATIVE result — (-3)×(-4)=12 (positive, even so far), then 12×(-2)=-24 (now odd, negative), not 24."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student adds the numbers (-3-4-2=-9) instead of multiplying them.",
        rootCause: "Operation Confused — performs addition instead of the required multiplication.",
        remediation: "The question asks for the PRODUCT (multiply), not the sum — (-3)×(-4)×(-2)=-24, not (-3)+(-4)+(-2)=-9."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student multiplies only the first two factors and stops, ignoring the third factor entirely.",
        rootCause: "Term Omitted — drops one of the three factors from the multiplication.",
        remediation: "There are THREE factors to multiply, not two — (-3)×(-4)=12, THEN you must ALSO multiply by (-2): 12×(-2)=-24, not just 12 (or -12, which doesn't even match the first two factors' true product)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the first two factors", hint: "(-3) × (-4) = 12." },
      { level: 2, description: "Determine the sign of the final multiplication", hint: "12 (positive) × (-2) will be negative." },
      { level: 3, description: "Compute", hint: "12 × 2 = ? (then apply the negative sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-03",
    question: "Which expression equals 16?",
    options: [
      { text: "(-2)⁴", correct: true, feedback: "Correct. (-2)×(-2)×(-2)×(-2)=16." },
      { text: "-2⁴", correct: false, feedback: "-2⁴ = -(2⁴) = -16.", misconceptionId: "E-d3-a" },
      { text: "2³", correct: false, feedback: "2³=8.", misconceptionId: "E-d3-b" },
      { text: "(-1)⁶", correct: false, feedback: "(-1)⁶ = 1, not 16.", misconceptionId: "E-d3-c" }
    ],
    backward: "Parentheses matter: (-2)⁴ = 16, -2⁴ = -16.",
    forward: "This distinction is vital when graphing functions like y = x² versus y = -x².",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student assumes -2⁴ and (-2)⁴ are equal, not recognising that without parentheses the negative sign is applied AFTER exponentiation.",
        rootCause: "Parentheses/Sign Scope Confused — doesn't distinguish whether the negative sign is part of the base being raised to the power.",
        remediation: "Without parentheses, -2⁴ means -(2⁴)=-16 (the negative applies AFTER squaring) — only (-2)⁴, with parentheses making -2 the base, equals 16."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student computes 2³=8, incorrectly assuming this expression equals 16.",
        rootCause: "Value Miscalculated or Misremembered — reports an incorrect value for the given expression.",
        remediation: "2³=2×2×2=8, not 16 — this expression does NOT equal 16; only (-2)⁴=16."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student computes (-1)⁶=1, incorrectly assuming this expression equals 16.",
        rootCause: "Value Miscalculated or Misremembered — reports an incorrect value for the given expression.",
        remediation: "(-1)⁶ means -1 multiplied by itself 6 times, which equals 1 (since an even number of negative ones cancel to positive 1), not 16 — this expression does NOT equal 16; only (-2)⁴=16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each option carefully, noting parentheses", hint: "(-2)⁴ means (-2) is the base; -2⁴ means only 2 is the base." },
      { level: 2, description: "Compute (-2)⁴", hint: "(-2)×(-2)×(-2)×(-2) = ?" },
      { level: 3, description: "Confirm it equals 16", hint: "Does your result equal 16?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-03",
    question: "What is √((-5)²)?",
    options: [
      { text: "5", correct: true, feedback: "Correct. √(25)=5, the absolute value." },
      { text: "-5", correct: false, feedback: "The square root symbol always gives the principal (non-negative) root.", misconceptionId: "E-d4-a" },
      { text: "±5", correct: false, feedback: "The √ symbol does not mean ± unless solving an equation.", misconceptionId: "E-d4-b" }
    ],
    backward: "√(a²) = |a|, not ±a.",
    forward: "This precision is needed when solving quadratic equations and distance formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student assumes the result keeps the original sign of -5, reporting -5 instead of the principal (non-negative) root.",
        rootCause: "Principal Root Convention Not Applied — doesn't recognise that √ always denotes the non-negative root regardless of what's inside.",
        remediation: "The √ SYMBOL always gives the PRINCIPAL (non-negative) root — (-5)²=25, and √25=5, not -5, even though the original number inside was negative."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student assumes the square root symbol produces both positive and negative answers (±), confusing it with solving an equation like x²=25.",
        rootCause: "Root Symbol Confused With Equation Solving — conflates the single-valued √ symbol with the two solutions of a squared equation.",
        remediation: "The √ SYMBOL itself gives ONE value (the non-negative root): √25=5, not ±5 — the ± only appears when SOLVING an equation like x²=25 (which has two solutions, x=5 and x=-5), not when evaluating √25 directly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the inside expression first", hint: "(-5)² = 25." },
      { level: 2, description: "Take the square root", hint: "√25 = ?" },
      { level: 3, description: "Recall the principal root convention", hint: "The √ symbol always gives the non-negative root." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-03",
    question: "Evaluate: 4 + 2² × 3 - (-2)",
    options: [
      { text: "18", correct: true, feedback: "Correct. 2²=4, 4×3=12, 4+12=16, then minus -2 = 18." },
      { text: "22", correct: false, feedback: "You might have added before multiplying.", misconceptionId: "E-d5-a" },
      { text: "14", correct: false, feedback: "Check the subtraction of a negative.", misconceptionId: "E-d5-b" }
    ],
    backward: "Order: exponents → multiplication → addition/subtraction.",
    forward: "Complex expressions like this appear in physics formulas and algebraic manipulations.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student adds 4+2²=8 (or similar) before multiplying by 3, applying operations left to right instead of following precedence.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "Follow the correct order: exponent FIRST (2²=4), then multiplication (4×3=12), THEN addition/subtraction (4+12-(-2)=18) — don't add before completing the multiplication."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student subtracts the negative incorrectly (e.g., treating -(-2) as -2), landing on 14 instead of the correct 18.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "The final step is -(-2), which means ADD 2, not subtract — 16-(-2)=16+2=18, not 16-2=14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the exponent", hint: "2² = 4." },
      { level: 2, description: "Compute the multiplication", hint: "4 × 3 = 12." },
      { level: 3, description: "Complete the addition and subtraction", hint: "4 + 12 - (-2) = 4 + 12 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-01",
    question: "Write 72 as a product of prime factors, using index notation.",
    options: [
      { text: "2³ × 3²", correct: true, feedback: "Correct. 72=8×9=2³×3². Remember: 1 is neither prime nor composite, so it never appears in prime factorisation." },
      { text: "2² × 3³", correct: false, feedback: "That gives 4×27=108.", misconceptionId: "E-d6-a" },
      { text: "2×36", correct: false, feedback: "36 is not prime.", misconceptionId: "E-d6-b" }
    ],
    backward: "Prime factorization helps with finding HCF and LCM.",
    forward: "This skill is crucial for simplifying fractions and algebraic fractions later.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student swaps the exponents of 2 and 3, writing 2²×3³ instead of the correct 2³×3².",
        rootCause: "Exponents Swapped Between Prime Factors — mixes up which prime has which power.",
        remediation: "Carefully divide out each prime: 72÷2=36, 36÷2=18, 18÷2=9 (three 2's), then 9÷3=3, 3÷3=1 (two 3's) — this gives 2³×3² (8×9=72), not 2²×3³ (4×27=108, which is wrong)."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "2×36 IS a factor pair of 72, but 36 is NOT prime — keep breaking down until every factor is prime: 72=2×2×2×3×3=2³×3², not 2×36."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide by 2 repeatedly", hint: "72÷2=36, 36÷2=18, 18÷2=9 — three factors of 2." },
      { level: 2, description: "Continue with the next prime", hint: "9÷3=3, 3÷3=1 — two factors of 3." },
      { level: 3, description: "Write using index notation", hint: "2×2×2×3×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d7", order: 7, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROUND-01",
    question: "Estimate: (-4.8) × 2.1 ≈ ?",
    options: [
      { text: "-10", correct: true, feedback: "Correct. -5×2 = -10, a reasonable estimate." },
      { text: "-7", correct: false, feedback: "That would be -3.5×2, far off.", misconceptionId: "E-d7-a" },
      { text: "-12", correct: false, feedback: "-6×2 = -12, but -4.8 is closer to -5 than -6.", misconceptionId: "E-d7-b" }
    ],
    backward: "Round numbers to one significant figure for quick approximation.",
    forward: "Estimation with negatives is useful for checking answers in measurement and finance.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student rounds -4.8 to an inaccurate value (like -3.5) instead of rounding to the nearest whole number for estimation.",
        rootCause: "Rounding Value Inaccurate — rounds to a number that isn't close to the original value.",
        remediation: "Round -4.8 to the NEAREST whole number, which is -5 (not -3.5, which is much further away) — -5×2=-10, a reasonable estimate."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student rounds -4.8 down to -6 instead of the nearer -5, overestimating the rounding.",
        rootCause: "Rounding Direction Incorrect — rounds away from the nearest whole number instead of to it.",
        remediation: "-4.8 is closer to -5 than to -6 (since 4.8 is closer to 5 than to 6) — round to -5, not -6: -5×2=-10, not -6×2=-12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to the nearest whole number", hint: "-4.8 rounds to -5. 2.1 rounds to 2." },
      { level: 2, description: "Multiply the rounded values", hint: "-5 × 2." },
      { level: 3, description: "Confirm this is a reasonable estimate", hint: "-5 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d8", order: 8, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    skillId: "EXTMIX-01",
    question: "Evaluate: (-2)³ + √81 - (-5)",
    options: [
      { text: "6", correct: true, feedback: "Correct. (-2)³=-8, √81=9, -8+9+5=6." },
      { text: "-6", correct: false, feedback: "Check the sign of 5.", misconceptionId: "E-d8-a" },
      { text: "16", correct: false, feedback: "Did you treat √81 as 9 and ignore the negative cube?", misconceptionId: "E-d8-b" }
    ],
    backward: "Combine separate skills: powers, roots, and sign rules.",
    forward: "Multi-step problems like this appear in algebraic expressions and will be expanded to include variables.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student subtracts 5 instead of adding it, misreading the final -(-5) as -5.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "The final term is -(-5), which means ADD 5, not subtract — -8+9=1, then 1+5=6, not 1-5=-6."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student ignores the negative sign on (-2)³, treating it as if it were positive 8 instead of -8, then computes 8+9-(-5)=22 or a similar variant landing on 16.",
        rootCause: "Odd Exponent Sign Dropped — forgets that an odd power of a negative number stays negative.",
        remediation: "(-2)³ = -8 (odd exponent keeps the negative sign), NOT 8 — the full computation is -8+9+5=6, not treating the first term as positive to get 16."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each piece separately", hint: "(-2)³=-8. √81=9." },
      { level: 2, description: "Rewrite the subtraction of a negative", hint: "-(-5) becomes +5." },
      { level: 3, description: "Combine all three values", hint: "-8 + 9 + 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d9", order: 9, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-04",
    question: "The temperature drops from -5°C to -12°C. What is the change?",
    options: [
      { text: "-7°C", correct: true, feedback: "Correct. -12 - (-5) = -7." },
      { text: "7°C", correct: false, feedback: "You subtracted in the wrong order.", misconceptionId: "E-d9-a" },
      { text: "-17°C", correct: false, feedback: "You added the absolute values.", misconceptionId: "E-d9-b" }
    ],
    backward: "Change = final - initial.",
    forward: "Understanding signed numbers is essential for science and finance.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student computes initial-final (-5-(-12)=7) instead of final-initial, getting the correct magnitude but the wrong sign.",
        rootCause: "Subtraction Order Reversed — computes initial minus final instead of final minus initial.",
        remediation: "Change is always FINAL minus INITIAL, not the other way — -12-(-5)=-7 (a drop, correctly negative), not -5-(-12)=7 (which would incorrectly suggest a rise)."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student adds the absolute values of the two temperatures (5+12=17) instead of finding the signed difference.",
        rootCause: "Absolute Values Added Instead of Signed Difference Computed — ignores the actual signs and combines magnitudes.",
        remediation: "The change is the SIGNED difference (final-initial), not the sum of magnitudes — -12-(-5)=-7, not -(5+12)=-17."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify initial and final temperatures", hint: "Initial = -5°C, Final = -12°C." },
      { level: 2, description: "Recall the change formula", hint: "Change = final - initial." },
      { level: 3, description: "Compute", hint: "-12 - (-5) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d10", order: 10, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    skillId: "INTMUL-02",
    question: "(-15) ÷ (-5) × (-2) equals:",
    options: [
      { text: "-6", correct: true, feedback: "Correct. -15 ÷ -5 = 3, then 3 × -2 = -6." },
      { text: "6", correct: false, feedback: "Watch the sign on the last multiplication.", misconceptionId: "E-d10-a" },
      { text: "-4", correct: false, feedback: "Check the division.", misconceptionId: "E-d10-b" }
    ],
    backward: "Division and multiplication same precedence, left to right.",
    forward: "This pattern appears in fraction simplification and rational expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student correctly computes -15÷-5=3, but then ignores the sign of the last factor, treating 3×(-2) as if it were positive.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last multiplication step.",
        remediation: "The final step is 3×(-2), which is POSITIVE times NEGATIVE, giving a NEGATIVE result — 3×(-2)=-6, not 6."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student computes the division incorrectly, perhaps getting -3 or a similar wrong quotient, leading to -4 instead of the correct -6.",
        rootCause: "Computation Error — the division step is carried out incorrectly.",
        remediation: "Recompute the division carefully: -15÷(-5)=3 (negative divided by negative is positive), then 3×(-2)=-6, not -4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the division first (left to right)", hint: "-15 ÷ (-5) = 3." },
      { level: 2, description: "Determine the sign of the multiplication", hint: "3 (positive) × (-2) will be negative." },
      { level: 3, description: "Compute", hint: "3 × 2 = ? (then apply the negative sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d11", order: 11, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-04",
    question: "Which is larger: 2⁵ or 5²?",
    options: [
      { text: "2⁵", correct: true, feedback: "Correct. 2⁵=32, 5²=25." },
      { text: "5²", correct: false, feedback: "25 < 32.", misconceptionId: "E-d11-a" },
      { text: "They are equal", correct: false, feedback: "32 ≠ 25.", misconceptionId: "E-d11-b" }
    ],
    backward: "Powers grow quickly.",
    forward: "Understanding exponential growth is key for compound interest and science.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student assumes the larger BASE (5 vs 2) means the larger power, without actually computing both values.",
        rootCause: "Values Not Actually Computed — compares bases or exponents directly instead of evaluating each expression.",
        remediation: "Actually COMPUTE both values before comparing: 2⁵=2×2×2×2×2=32, and 5²=5×5=25 — 32>25, so 2⁵ is larger, even though 5 is the larger base."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student assumes 2⁵ and 5² are equal because they use the same two digits (2 and 5) swapped, without actually computing either value.",
        rootCause: "Values Not Actually Computed — assumes symmetry implies equality instead of evaluating each expression.",
        remediation: "Swapping the base and exponent does NOT give equal results — actually compute: 2⁵=32 and 5²=25, which are NOT equal (32≠25)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute 2⁵", hint: "2×2×2×2×2 = 32." },
      { level: 2, description: "Compute 5²", hint: "5×5 = 25." },
      { level: 3, description: "Compare", hint: "Is 32 or 25 larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d12", order: 12, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-04",
    question: "The cube root of -64 is:",
    options: [
      { text: "-4", correct: true, feedback: "Correct. (-4)³ = -64." },
      { text: "4", correct: false, feedback: "4³ = 64, not -64.", misconceptionId: "E-d12-a" },
      { text: "-8", correct: false, feedback: "(-8)³ = -512.", misconceptionId: "E-d12-b" },
      { text: "Not a real number", correct: false, feedback: "Cube roots of negatives are real.", misconceptionId: "E-d12-c" }
    ],
    backward: "Cube root of a negative is negative.",
    forward: "This contrasts with square roots, where √(-1) is not real (coming later).",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student drops the negative sign, reporting the positive cube root (4) instead of the negative one that actually cubes to -64.",
        rootCause: "Sign Dropped — ignores that the original number is negative and its cube root must also be negative.",
        remediation: "Since the original number is NEGATIVE (-64), its cube root must ALSO be negative — (-4)³=-64, not 4³=64 (which is positive 64, not -64)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student guesses a related negative number without verifying it actually cubes to -64.",
        rootCause: "Answer Not Verified — picks a plausible-looking value without checking that it actually cubes to the target.",
        remediation: "Verify by cubing: (-8)³=-8×-8×-8=-512, NOT -64 — the correct cube root of -64 is -4, since (-4)³=-4×-4×-4=-64."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student incorrectly assumes cube roots of negative numbers don't exist as real numbers, confusing this with square roots of negatives.",
        rootCause: "Cube Root Confused With Square Root Behaviour — applies the 'no real root for negatives' rule that only applies to even-index roots.",
        remediation: "CUBE roots (odd-index) of negative numbers ARE real — (-4)³=-64, so ³√(-64)=-4 is a real number; only EVEN-index roots (like square roots) of negatives are not real."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the sign rule for odd roots", hint: "The cube root of a negative number is negative." },
      { level: 2, description: "Find the magnitude", hint: "³√64 = 4 (since 4³=64)." },
      { level: 3, description: "Apply the sign", hint: "So ³√(-64) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d28", order: 13, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-05",
    question: "Find the distance between -3 and 2 on the number line.",
    options: [
      { text: "5", correct: true, feedback: "Correct. Distance is |-3 - 2| = 5." },
      { text: "-5", correct: false, feedback: "Distance cannot be negative.", misconceptionId: "E-d28-a" },
      { text: "1", correct: false, feedback: "You subtracted the numbers incorrectly.", misconceptionId: "E-d28-b" },
      { text: "-1", correct: false, feedback: "You found a directed difference, but distance is always positive.", misconceptionId: "E-d28-c" }
    ],
    backward: "Distance is always positive.",
    forward: "This idea of absolute distance extends to coordinate geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d28-a",
        description: "Student computes the directed (signed) difference correctly in magnitude but reports a negative value for distance.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "Distance is ALWAYS non-negative — take the absolute value of the difference: |-3-2|=|-5|=5, not -5."
      },
      {
        misconceptionId: "E-d28-b",
        description: "Student makes an arithmetic slip while subtracting the two numbers, landing on 1 instead of the correct 5.",
        rootCause: "Computation Error — the subtraction itself is carried out incorrectly.",
        remediation: "Recompute carefully: -3-2=-5, so the distance is |-5|=5, not 1."
      },
      {
        misconceptionId: "E-d28-c",
        description: "Student correctly computes a directed difference but gets the wrong magnitude and doesn't take the absolute value.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "The distance is the ABSOLUTE VALUE of the difference between the two points — |-3-2|=|-5|=5, not -1 (which is neither the correct magnitude nor non-negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between the two points", hint: "-3 - 2 = -5." },
      { level: 2, description: "Take the absolute value", hint: "Distance is always non-negative." },
      { level: 3, description: "Compute", hint: "|-5| = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d13", order: 14, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-04",
    question: "Insert brackets to make true: 12 ÷ 2 + 4 × 3 = 6",
    options: [
      { text: "12 ÷ (2 + 4) × 3", correct: true, feedback: "Correct. 12 ÷ 6 × 3 = 2×3=6." },
      { text: "(12 ÷ 2) + 4 × 3", correct: false, feedback: "That gives 6+12=18.", misconceptionId: "E-d13-a" },
      { text: "12 ÷ 2 + (4 × 3)", correct: false, feedback: "That's 6+12=18.", misconceptionId: "E-d13-b" }
    ],
    backward: "Brackets change the order of operations.",
    forward: "Mastering order of operations is critical for writing correct formulas in spreadsheets and programming.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student adds brackets around a part of the expression that doesn't actually change the standard order of operations, so the result stays at 18 instead of 6.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (12÷2) don't change anything, since division already happens before addition by default — you need brackets that FORCE a different grouping, like (2+4), which changes 12÷2+4×3 (=18) into 12÷(2+4)×3 (=6)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student adds brackets around a part of the expression that doesn't actually change the standard order of operations, so the result stays at 18 instead of 6.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (4×3) don't change anything, since multiplication already happens before addition by default — you need brackets that FORCE a different grouping, like (2+4), which changes the expression's value from 18 to 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original expression without brackets", hint: "12÷2+4×3 = 6+12 = 18 (not the target)." },
      { level: 2, description: "Try grouping 2 and 4 together", hint: "12÷(2+4)×3 = 12÷6×3." },
      { level: 3, description: "Compute", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d14", order: 15, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-05",
    question: "Simplify \\((2 \\times 3)^2\\).",
    options: [
      { text: "36", correct: true, feedback: "Correct. (2×3)² = 6² = 36. Also, (ab)² = a²b² = 4×9 = 36." },
      { text: "12", correct: false, feedback: "You multiplied 2² by 3. The exponent applies to the whole product, so both 2 and 3 must be squared.", misconceptionId: "E-d14-a" },
      { text: "18", correct: false, feedback: "You multiplied 2 by 3². The exponent applies to both numbers.", misconceptionId: "E-d14-b" },
      { text: "6", correct: false, feedback: "You forgot the exponent and just multiplied 2×3. The ² means square the entire product.", misconceptionId: "E-d14-c" }
    ],
    backward: "The rule (ab)^m = a^m b^m is a key exponent law.",
    forward: "This rule will be used when simplifying algebraic expressions like (2x)³.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student applies the exponent to only the first factor (2²=4, then ×3=12) instead of the entire product inside the parentheses.",
        rootCause: "Exponent Applied to Only One Factor — doesn't recognise the exponent applies to the WHOLE bracketed expression.",
        remediation: "The exponent applies to the ENTIRE product (2×3), not just the 2 — (2×3)²=6²=36, not 2²×3=12 (which only squares the 2)."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student applies the exponent to only the second factor (3²=9, then 2×9=18) instead of the entire product inside the parentheses.",
        rootCause: "Exponent Applied to Only One Factor — doesn't recognise the exponent applies to the WHOLE bracketed expression.",
        remediation: "The exponent applies to the ENTIRE product (2×3), not just the 3 — (2×3)²=6²=36, not 2×3²=18 (which only squares the 3)."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student computes 2×3=6 but forgets to apply the exponent (²) at all.",
        rootCause: "Exponent Omitted Entirely — evaluates the inside of the parentheses but drops the outer exponent.",
        remediation: "The ² OUTSIDE the parentheses means you must SQUARE the whole result — 2×3=6, then 6²=36, not just stopping at 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "2 × 3 = 6." },
      { level: 2, description: "Apply the exponent to the entire result", hint: "6² means 6 × 6." },
      { level: 3, description: "Compute", hint: "6 × 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d15", order: 16, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-02",
    question: "Estimate √50 to the nearest whole number.",
    options: [
      { text: "7", correct: true, feedback: "Correct. 7²=49, close to 50." },
      { text: "5", correct: false, feedback: "5²=25.", misconceptionId: "E-d15-a" },
      { text: "8", correct: false, feedback: "8²=64, further away.", misconceptionId: "E-d15-b" }
    ],
    backward: "Find the nearest perfect square.",
    forward: "Estimation of roots is useful when checking calculator results and in geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student picks a perfect square (25) that's far too low, perhaps confusing 5²=25 with something closer to 50.",
        rootCause: "Wrong Perfect Square Selected — doesn't identify the perfect squares actually bracketing the target number.",
        remediation: "5²=25 is much less than 50 — find the perfect squares closest to 50: 7²=49 and 8²=64 — 49 is very close to 50, so √50≈7, not 5."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student picks the next perfect square up (8²=64) without checking that 7²=49 is actually closer to 50.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 50-49=1 (distance to 7²), while 64-50=14 (distance to 8²) — 49 is much closer to 50, so √50≈7, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "7²=49, 8²=64." },
      { level: 2, description: "Compare the distances to 50", hint: "50-49=1, while 64-50=14." },
      { level: 3, description: "Choose the closer perfect square", hint: "Which perfect square (49 or 64) is closer to 50?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d26", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-02",
    question: "Find the highest common factor (HCF) of 36 and 60 using prime factorisation.",
    options: [
      { text: "12", correct: true, feedback: "Correct. 36=2²×3², 60=2²×3×5; common primes: 2²×3=12." },
      { text: "6", correct: false, feedback: "You took the smallest powers; 2²×3=12, not 2×3=6.", misconceptionId: "E-d26-a" },
      { text: "18", correct: false, feedback: "You used 2×3²=18; the common power of 2 is 2².", misconceptionId: "E-d26-b" },
      { text: "180", correct: false, feedback: "You multiplied all prime factors as if finding the LCM.", misconceptionId: "E-d26-c" }
    ],
    backward: "Prime factorisation makes finding the HCF systematic.",
    forward: "HCF is essential when simplifying fractions and algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d26-a",
        description: "Student uses the wrong (too-small) power of 2 when combining the common prime factors, using 2¹ instead of the correct 2².",
        rootCause: "Lowest Common Power Miscounted — doesn't correctly identify the LOWEST shared power of each common prime.",
        remediation: "36=2²×3² and 60=2²×3×5 — both numbers share 2² (not just 2¹) and 3¹ (the lower of 3² and 3¹) — HCF=2²×3=12, not 2×3=6."
      },
      {
        misconceptionId: "E-d26-b",
        description: "Student uses the wrong power of 3 (the higher power from 36 instead of the lower shared power from 60), giving 2×3²=18.",
        rootCause: "Lowest Common Power Miscounted — uses the HIGHER power of a prime instead of the lowest power shared by both numbers.",
        remediation: "36 has 3² but 60 only has 3¹ — the HCF uses the LOWER shared power (3¹, not 3²) — HCF=2²×3=12, not 2×3²=18."
      },
      {
        misconceptionId: "E-d26-c",
        description: "Student multiplies ALL prime factors from both numbers together (as if finding the LCM) instead of only the common ones at their lowest shared power.",
        rootCause: "HCF Method Confused With LCM Method — applies the LCM procedure (highest powers, all primes) instead of the HCF procedure (lowest powers, common primes only).",
        remediation: "HCF uses only the COMMON primes at their LOWEST shared power (2²×3=12) — multiplying ALL prime factors from both numbers (2²×3²×5=180) is the method for LCM, not HCF."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "36=2²×3². 60=2²×3×5." },
      { level: 2, description: "Identify the common prime factors", hint: "Both share 2 and 3." },
      { level: 3, description: "Use the lowest shared power of each common prime", hint: "Lowest power of 2 shared: 2². Lowest power of 3 shared: 3¹. Multiply: 2²×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d16", order: 18, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    skillId: "EXTEXP-01",
    question: "If 2ˣ = 64, what is x?",
    options: [
      { text: "6", correct: true, feedback: "Correct. 2⁶=64." },
      { text: "8", correct: false, feedback: "2⁸=256.", misconceptionId: "E-d16-a" },
      { text: "5", correct: false, feedback: "2⁵=32.", misconceptionId: "E-d16-b" }
    ],
    backward: "Powers can be reversed with roots or logarithms.",
    forward: "This idea leads to logarithms later.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student overshoots, testing an exponent that's too large without checking the actual result against 64.",
        rootCause: "Trial Exponent Not Verified — picks a value without checking whether it actually produces the target result.",
        remediation: "Test your answer: 2⁸=2×2×2×2×2×2×2×2=256, not 64 — that's too large; the correct exponent is 6, since 2⁶=64."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student undershoots, testing an exponent that's too small without checking the actual result against 64.",
        rootCause: "Trial Exponent Not Verified — picks a value without checking whether it actually produces the target result.",
        remediation: "Test your answer: 2⁵=2×2×2×2×2=32, not 64 — that's too small; the correct exponent is 6, since 2⁶=64."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List powers of 2", hint: "2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64." },
      { level: 2, description: "Find which power equals 64", hint: "Which exponent gives 64?" },
      { level: 3, description: "Confirm", hint: "Does 2⁶ equal 64?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d17", order: 19, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-06",
    question: "Simplify: -(-(-5))",
    options: [
      { text: "-5", correct: true, feedback: "Correct. Three negatives make negative." },
      { text: "5", correct: false, feedback: "Two negatives would make positive, but here there are three.", misconceptionId: "E-d17-a" }
    ],
    backward: "Count the number of negative signs.",
    forward: "This pattern appears in algebraic simplifications like -(-x) = x, but -(-(-x)) = -x.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student miscounts the negation signs, applying the even-negatives-make-positive rule to a case with an odd number of negatives.",
        rootCause: "Negation Count Miscounted — loses track of how many negation signs are actually present.",
        remediation: "Count the negation signs carefully: -(-(-5)) has THREE negatives — work from the inside out: -5 → -(-5)=5 (two negatives so far, positive) → -(5)=-5 (three negatives, negative) — not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Work from the innermost negative outward", hint: "Start with -5." },
      { level: 2, description: "Apply the middle negation", hint: "-(-5) = 5." },
      { level: 3, description: "Apply the outer negation", hint: "-(5) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d18", order: 20, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    skillId: "INTMUL-03",
    question: "What is the product of all integers from -3 to 3?",
    options: [
      { text: "0", correct: true, feedback: "Correct. The list includes 0, so the product is 0." },
      { text: "36", correct: false, feedback: "You ignored the zero.", misconceptionId: "E-d18-a" },
      { text: "-36", correct: false, feedback: "Zero makes the product zero.", misconceptionId: "E-d18-b" }
    ],
    backward: "Multiplying by zero yields zero.",
    forward: "This property is used when factoring polynomials: if any factor is zero, the product is zero.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student multiplies only the nonzero integers in the list, skipping zero entirely, and reports a nonzero product.",
        rootCause: "Zero Factor Omitted — leaves zero out of the multiplication even though it's part of the given list.",
        remediation: "The list from -3 to 3 INCLUDES 0 — since ANY number multiplied by 0 equals 0, the entire product must be 0, not 36 (which comes from ignoring the 0)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student computes the product of the nonzero integers and applies a sign but still doesn't include the zero factor.",
        rootCause: "Zero Factor Omitted — leaves zero out of the multiplication even though it's part of the given list.",
        remediation: "The list from -3 to 3 INCLUDES 0 — since ANY number multiplied by 0 equals 0, the entire product must be 0, not -36 (which comes from ignoring the 0 and picking a sign for the rest)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all the integers from -3 to 3", hint: "-3, -2, -1, 0, 1, 2, 3." },
      { level: 2, description: "Notice that 0 is in the list", hint: "Any number times 0 equals 0." },
      { level: 3, description: "Determine the product", hint: "Since 0 is a factor, what is the product?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d19", order: 21, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-06",
    question: "Simplify: (3²)³",
    options: [
      { text: "3⁶", correct: true, feedback: "Correct. (3²)³ = 3^(2×3)=3⁶." },
      { text: "3⁵", correct: false, feedback: "That would be 3²×3³.", misconceptionId: "E-d19-a" },
      { text: "3⁸", correct: false, feedback: "2³=8, but the base is 3, not 2.", misconceptionId: "E-d19-b" }
    ],
    backward: "Power of a power: multiply exponents.",
    forward: "Index laws will be extended to algebra and negative exponents later.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student adds the exponents (2+3=5) instead of multiplying them, confusing the power-of-a-power rule with the product rule for like bases.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the MULTIPLY-exponents rule (for a power raised to another power).",
        remediation: "For a POWER raised to ANOTHER POWER, MULTIPLY the exponents: (3²)³=3^(2×3)=3⁶ — adding them (2+3=5) would be the rule for MULTIPLYING two separate powers with the same base (3²×3³), not for this expression."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student computes 2³=8 as if the inner exponent (2) were the base, confusing it with the actual base (3).",
        rootCause: "Base and Exponent Confused — treats the exponent as if it were the base of the expression.",
        remediation: "The BASE of this expression is 3 (not 2, which is just the inner exponent) — (3²)³=3^(2×3)=3⁶, not 2³=8, which uses the wrong number as the base."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the base and the two exponents", hint: "Base = 3; exponents are 2 and 3." },
      { level: 2, description: "Recall the power-of-a-power rule", hint: "Multiply the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d20", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-05",
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{16+9} = 5\\)", correct: true, feedback: "Correct. 16+9=25, and √25 = 5." },
      { text: "\\(\\sqrt{16+9} = \\sqrt{16} + \\sqrt{9} = 7\\)", correct: false, feedback: "The square root does not distribute over addition. √16+√9 = 4+3 = 7, but √(16+9) = √25 = 5.", misconceptionId: "E-d20-a" },
      { text: "\\(\\sqrt{16+9} = \\sqrt{16} \\times \\sqrt{9} = 12\\)", correct: false, feedback: "Multiplication also does not apply. √(a+b) is not √a × √b.", misconceptionId: "E-d20-b" },
      { text: "\\(\\sqrt{16+9} = 25\\)", correct: false, feedback: "You forgot to take the square root. 16+9=25, but the question asks for the square root of the sum.", misconceptionId: "E-d20-c" }
    ],
    backward: "The square root applies to the entire expression inside it.",
    forward: "This distinction is vital when simplifying algebraic expressions under a radical.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student distributes the square root over the addition, computing √16+√9 instead of √(16+9).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — treats √(a+b) as if it equalled √a+√b.",
        remediation: "The square root does NOT distribute over addition — √(16+9) means take the square root of the SUM (16+9=25, √25=5), not the sum of the individual square roots (√16+√9=4+3=7)."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student incorrectly distributes the square root as if it worked like multiplication, computing √16×√9 instead of √(16+9).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — applies a rule that only works for multiplication (√(ab)=√a×√b) to an addition expression.",
        remediation: "√(a+b) does NOT equal √a×√b — that distribution rule only applies to MULTIPLICATION inside the root (√(ab)=√a×√b), not addition; √(16+9)=√25=5, not √16×√9=12."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student computes the sum inside the radical (16+9=25) but forgets to take the square root of that sum.",
        rootCause: "Square Root Step Omitted — stops after computing the sum, without taking its root.",
        remediation: "16+9=25 is only the value INSIDE the radical — you must ALSO take the square root: √25=5, not just 25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the sum inside the radical first", hint: "16 + 9 = 25." },
      { level: 2, description: "Take the square root of the sum", hint: "√25 = ?" },
      { level: 3, description: "Confirm the root doesn't distribute over addition", hint: "√16+√9=4+3=7 is a DIFFERENT value — the root applies to the whole sum, not each term separately." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d27", order: 23, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-03",
    question: "Find the lowest common multiple (LCM) of 12 and 20 using prime factorisation.",
    options: [
      { text: "60", correct: true, feedback: "Correct. 12=2²×3, 20=2²×5; LCM=2²×3×5=60." },
      { text: "120", correct: false, feedback: "You doubled the correct LCM; check the prime factorisation.", misconceptionId: "E-d27-a" },
      { text: "4", correct: false, feedback: "You found the HCF, not the LCM.", misconceptionId: "E-d27-b" },
      { text: "240", correct: false, feedback: "You multiplied the numbers and divided incorrectly; use prime factorisation.", misconceptionId: "E-d27-c" }
    ],
    backward: "LCM uses the highest power of each prime that appears in either number.",
    forward: "LCM is crucial for adding and subtracting fractions with different denominators.",
    misconceptions: [
      {
        misconceptionId: "E-d27-a",
        description: "Student makes an arithmetic slip combining the highest powers of each prime, landing on double the correct LCM.",
        rootCause: "Computation Error — correct method, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 12=2²×3, 20=2²×5 — the LCM uses the HIGHEST power of each prime: 2²×3×5=60, not 120 (double the correct value)."
      },
      {
        misconceptionId: "E-d27-b",
        description: "Student computes the HCF (using the lowest shared power, 2²=4) instead of the LCM (which needs the highest power of every prime that appears).",
        rootCause: "HCF Method Confused With LCM Method — applies the HCF procedure (lowest shared powers, common primes only) instead of the LCM procedure (highest powers, all primes).",
        remediation: "LCM requires the HIGHEST power of EVERY prime that appears in EITHER number (2²×3×5=60), not just the common part (2²=4, which is actually the HCF)."
      },
      {
        misconceptionId: "E-d27-c",
        description: "Student multiplies the two original numbers together (12×20=240) instead of using prime factorisation to find the LCM.",
        rootCause: "LCM Approximated as Product of the Two Numbers — assumes the LCM is always the product of the numbers, ignoring shared factors.",
        remediation: "The LCM is NOT simply the product of the two numbers (12×20=240) — since 12 and 20 share a common factor (2²=4), the actual LCM (60) is smaller than their product; use prime factorisation: 2²×3×5=60, not 240."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "12=2²×3. 20=2²×5." },
      { level: 2, description: "Identify every prime that appears in either number", hint: "The primes involved are 2, 3, and 5." },
      { level: 3, description: "Use the highest power of each prime", hint: "Highest power of 2: 2². Highest power of 3: 3¹. Highest power of 5: 5¹. Multiply: 2²×3×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d21", order: 24, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-05",
    question: "Evaluate: -3² + 4 × 2",
    options: [
      { text: "-1", correct: true, feedback: "Correct. -3² = -9, 4×2=8, -9+8=-1." },
      { text: "-2", correct: false, feedback: "You might have calculated -3² as 9.", misconceptionId: "E-d21-a" },
      { text: "-17", correct: false, feedback: "Check the order.", misconceptionId: "E-d21-b" }
    ],
    backward: "Exponent before multiplication, and note -3² = -(3²).",
    forward: "This exact trap appears in many algebra problems.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student treats -3² as if the parentheses were around -3, computing (-3)²=9 instead of -(3²)=-9.",
        rootCause: "Sign Scope Confused — assumes the negative sign is part of the base being squared, without parentheses to justify that.",
        remediation: "Without parentheses, -3² means -(3²)=-9 (the negative applies AFTER squaring), not (-3)²=9 — this changes the final answer to -9+8=-1, not 9+8=17 (or a related slip giving -2)."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student applies operations in an incorrect order, perhaps adding before multiplying or mishandling the exponent, landing on -17.",
        rootCause: "Order of Operations Not Applied — doesn't correctly sequence exponent, multiplication, and addition.",
        remediation: "Follow the correct order: exponent FIRST (-3²=-9), then multiplication (4×2=8), THEN addition (-9+8=-1) — not a different sequence that leads to -17."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the exponent, noting no parentheses around -3", hint: "-3² means -(3²) = -9." },
      { level: 2, description: "Compute the multiplication", hint: "4 × 2 = 8." },
      { level: 3, description: "Add", hint: "-9 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d22", order: 25, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-04",
    question: "How many prime factors (with multiplicity) does 48 have?",
    options: [
      { text: "5", correct: true, feedback: "Correct. 48=2⁴×3 → 4+1=5 factors." },
      { text: "4", correct: false, feedback: "That's only the exponent of 2.", misconceptionId: "E-d22-a" },
      { text: "6", correct: false, feedback: "48=2×2×2×2×3, exactly 5 factors.", misconceptionId: "E-d22-b" }
    ],
    backward: "Count each occurrence of a prime factor.",
    forward: "The total number of prime factors is used in number theory and cryptography.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student counts only the four factors of 2, forgetting to include the factor of 3 in the total count.",
        rootCause: "Count Incomplete — omits one of the distinct prime factors from the total.",
        remediation: "48=2⁴×3 has FOUR factors of 2 AND ONE factor of 3 — the total WITH multiplicity is 4+1=5, not just the 4 factors of 2."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student overcounts, perhaps double-counting a factor or miscounting the factorisation, landing on 6 instead of the correct 5.",
        rootCause: "Computation Error — miscounts the total number of prime factors.",
        remediation: "List them out: 48=2×2×2×2×3 — that's exactly FIVE factors (four 2's and one 3), not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation with index notation", hint: "48 = 2⁴ × 3." },
      { level: 2, description: "Identify the exponents", hint: "2 has exponent 4; 3 has exponent 1." },
      { level: 3, description: "Add the exponents for the total count", hint: "4 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d23", order: 26, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-03",
    question: "A cube has volume 60 cm³. Estimate its side length to the nearest whole number.",
    options: [
      { text: "4 cm", correct: true, feedback: "Correct. 4³=64, close to 60." },
      { text: "3 cm", correct: false, feedback: "3³=27, too small.", misconceptionId: "E-d23-a" },
      { text: "5 cm", correct: false, feedback: "5³=125, too big.", misconceptionId: "E-d23-b" }
    ],
    backward: "Side = ³√volume.",
    forward: "Estimation of cube roots is useful in physics and engineering.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student picks a side length whose cube (27) is far below the target volume (60) without checking a closer candidate.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to find the closest cube.",
        remediation: "Check: 3³=27 is far from 60 (distance 33) — try 4³=64, which is much closer to 60 (distance only 4) — so the estimate should be 4 cm, not 3 cm."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student picks a side length whose cube (125) is far above the target volume (60) without checking a closer candidate.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to find the closest cube.",
        remediation: "Check: 5³=125 is far from 60 (distance 65) — try 4³=64, which is much closer to 60 (distance only 4) — so the estimate should be 4 cm, not 5 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find cubes of nearby whole numbers", hint: "3³=27, 4³=64, 5³=125." },
      { level: 2, description: "Compare the distances to 60", hint: "60-27=33 (too far); 64-60=4 (close); 125-60=65 (too far)." },
      { level: 3, description: "Choose the closest cube", hint: "Which cube (27, 64, or 125) is closest to 60?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d24", order: 27, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    skillId: "EXTALG-01",
    question: "If a = -2, b = 3, find the value of a² + b² - 2ab.",
    options: [
      { text: "25", correct: true, feedback: "Correct. (-2)²=4, 3²=9, -2ab=-2(-2)(3)=12, total 4+9+12=25." },
      { text: "1", correct: false, feedback: "Check the sign of 2ab.", misconceptionId: "E-d24-a" },
      { text: "13", correct: false, feedback: "You might have missed the -2ab term.", misconceptionId: "E-d24-b" }
    ],
    backward: "Substitute carefully, then use order of operations.",
    forward: "This expression is (a-b)², an important algebraic identity.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student mishandles the sign of the -2ab term, perhaps subtracting it instead of computing it correctly as a positive contribution (since a is negative), leading to 4+9-12=1.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the sign when substituting a negative value into -2ab.",
        remediation: "Compute -2ab carefully with a=-2, b=3: -2×(-2)×3 = 4×3 = 12 (POSITIVE, because two negatives make a positive) — the total is 4+9+12=25, not 4+9-12=1 (which incorrectly treats -2ab as negative)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student computes only a²+b² (4+9=13) and forgets to include the -2ab term entirely.",
        rootCause: "Term Omitted — drops one of the three terms in the expression during evaluation.",
        remediation: "The expression has THREE terms: a², b², AND -2ab — you must include ALL of them: 4+9+12=25, not just a²+b²=4+9=13 (which forgets -2ab)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute a² and b² separately", hint: "a²=(-2)²=4. b²=3²=9." },
      { level: 2, description: "Compute -2ab carefully", hint: "-2×(-2)×3 = 4×3 = 12 (positive, since two negatives cancel)." },
      { level: 3, description: "Add all three terms", hint: "4 + 9 + 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d25", order: 28, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-07",
    question: "Which statement about -5 and -3 is true?",
    options: [
      { text: "-5 < -3", correct: true, feedback: "Correct. On the number line, -5 is to the left of -3, so it is smaller." },
      { text: "-5 > -3", correct: false, feedback: "-5 is further left on the number line, so it is smaller, not larger.", misconceptionId: "E-d25-a" },
      { text: "-5 = -3", correct: false, feedback: "They are different numbers.", misconceptionId: "E-d25-b" },
      { text: "-5 ≥ -3", correct: false, feedback: "-5 is not greater than or equal to -3.", misconceptionId: "E-d25-c" }
    ],
    backward: "Further left on the number line means smaller.",
    forward: "Comparing signed numbers is essential for inequalities and ordering.",
    misconceptions: [
      {
        misconceptionId: "E-d25-a",
        description: "Student compares the magnitudes (5>3) and concludes -5>-3, not accounting for the fact that larger magnitude negative numbers are actually SMALLER.",
        rootCause: "Magnitude Comparison Applied Without Sign Adjustment — compares absolute values directly instead of considering the negative sign's effect on ordering.",
        remediation: "For NEGATIVE numbers, a LARGER magnitude means a SMALLER value — since |-5|=5 is larger than |-3|=3, -5 is actually further left on the number line and therefore SMALLER: -5<-3, not -5>-3."
      },
      {
        misconceptionId: "E-d25-b",
        description: "Student assumes -5 and -3 are equal, perhaps not fully distinguishing between the two distinct negative values.",
        rootCause: "Values Not Actually Compared — fails to notice the numbers are different.",
        remediation: "-5 and -3 are two DIFFERENT numbers, not equal — on the number line, -5 is to the left of -3, so -5<-3, not -5=-3."
      },
      {
        misconceptionId: "E-d25-c",
        description: "Student selects the 'greater than or equal to' statement without correctly determining that -5 is actually the smaller value.",
        rootCause: "Magnitude Comparison Applied Without Sign Adjustment — compares absolute values directly instead of considering the negative sign's effect on ordering.",
        remediation: "Since -5 is further LEFT on the number line than -3, -5 is SMALLER — -5≥-3 is false; the correct relationship is -5<-3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Picture both numbers on a number line", hint: "-5 is further left than -3." },
      { level: 2, description: "Recall the number line rule", hint: "Numbers further left are smaller." },
      { level: 3, description: "Compare", hint: "Is -5 smaller or larger than -3?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-03",
    question: "-8 - (-3) + 2 =",
    options: [
      { text: "-3", correct: true, feedback: "-8+3+2 = -3." },
      { text: "-7", correct: false, feedback: "-8+3+2 = -3, not -7.", misconceptionId: "E-r1-a" }
    ],
    backward: "Subtracting a negative adds the positive.",
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student subtracts 3 instead of adding it, misreading -(-3) as -3 instead of +3.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "-(-3) means ADD 3, not subtract — -8+3=-5, then -5+2=-3, not -8-3+2=-9 (or a related slip giving -7)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite the double negative", hint: "-(-3) becomes +3." },
      { level: 2, description: "Combine the first two terms", hint: "-8 + 3 = -5." },
      { level: 3, description: "Add the last term", hint: "-5 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r2", order: 2, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV,
    skillId: "INTMUL-01",
    question: "(-2) × 5 × (-1) =",
    options: [
      { text: "10", correct: true, feedback: "Two negatives give positive: -2×5 = -10, -10×-1 = 10." },
      { text: "-10", correct: false, feedback: "You missed the second negative.", misconceptionId: "E-r2-a" }
    ],
    backward: "Even number of negatives → positive.",
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student stops after multiplying the first two factors (-2×5=-10) and forgets to also multiply by the third factor (-1).",
        rootCause: "Term Omitted — drops one of the three factors from the multiplication.",
        remediation: "There are THREE factors to multiply, not two — -2×5=-10, THEN you must ALSO multiply by -1: -10×(-1)=10 (two negatives overall, positive result), not just -10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the first two factors", hint: "-2 × 5 = -10." },
      { level: 2, description: "Determine the sign of the final multiplication", hint: "-10 (negative) × (-1) will be positive." },
      { level: 3, description: "Compute", hint: "-10 × -1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r3", order: 3, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-03",
    question: "Which is correct?",
    options: [
      { text: "(-3)² = 9", correct: true, feedback: "Yes." },
      { text: "-3² = 9", correct: false, feedback: "-3² = -9.", misconceptionId: "E-r3-a" },
      { text: "Both are equal", correct: false, feedback: "They differ.", misconceptionId: "E-r3-b" }
    ],
    backward: "Parentheses matter.",
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student assumes -3² and (-3)² are equal, not recognising that without parentheses the negative sign is applied AFTER exponentiation.",
        rootCause: "Parentheses/Sign Scope Confused — doesn't distinguish whether the negative sign is part of the base being raised to the power.",
        remediation: "Without parentheses, -3² means -(3²)=-9 (the negative applies AFTER squaring) — only (-3)², with parentheses making -3 the base, equals 9."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student assumes both expressions give the same result, without checking that the placement of parentheses changes the outcome.",
        rootCause: "Values Not Actually Compared — assumes equality instead of evaluating both expressions.",
        remediation: "Actually evaluate both: (-3)²=9 (parentheses make -3 the base), but -3²=-(3²)=-9 (no parentheses, negative applies after) — these are NOT equal (9≠-9)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate (-3)² with parentheses", hint: "(-3)×(-3) = 9." },
      { level: 2, description: "Evaluate -3² without parentheses", hint: "-3² = -(3²) = -9." },
      { level: 3, description: "Compare the two results", hint: "Are 9 and -9 the same?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r4", order: 4, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-04",
    question: "³√(-8) =",
    options: [
      { text: "-2", correct: true, feedback: "(-2)³ = -8." },
      { text: "2", correct: false, feedback: "2³=8.", misconceptionId: "E-r4-a" },
      { text: "not real", correct: false, feedback: "Cube roots of negatives are real.", misconceptionId: "E-r4-b" }
    ],
    backward: "Odd roots preserve sign.",
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student drops the negative sign, reporting the positive cube root (2) instead of the negative one that actually cubes to -8.",
        rootCause: "Sign Dropped — ignores that the original number is negative and its cube root must also be negative.",
        remediation: "Since the original number is NEGATIVE (-8), its cube root must ALSO be negative — (-2)³=-8, not 2³=8 (which is positive 8, not -8)."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student incorrectly assumes cube roots of negative numbers don't exist as real numbers, confusing this with square roots of negatives.",
        rootCause: "Cube Root Confused With Square Root Behaviour — applies the 'no real root for negatives' rule that only applies to even-index roots.",
        remediation: "CUBE roots (odd-index) of negative numbers ARE real — (-2)³=-8, so ³√(-8)=-2 is a real number; only EVEN-index roots (like square roots) of negatives are not real."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the sign rule for odd roots", hint: "The cube root of a negative number is negative." },
      { level: 2, description: "Find the magnitude", hint: "³√8 = 2 (since 2³=8)." },
      { level: 3, description: "Apply the sign", hint: "So ³√(-8) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "r5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-03",
    question: "15 - 3 × 2² =",
    options: [
      { text: "3", correct: true, feedback: "15 - 3×4 = 15-12=3." },
      { text: "-9", correct: false, feedback: "You might have done (15-3)×4=48.", misconceptionId: "E-r5-a" }
    ],
    backward: "Exponent first, then multiply, then subtract.",
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student subtracts before multiplying, evaluating (15-3)×2²=48 or a similar left-to-right miscalculation instead of following operator precedence.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "EXPONENTS come first, then MULTIPLICATION, THEN subtraction — compute 2²=4, then 3×4=12, THEN 15-12=3, not (15-3)×4=48 (which subtracts before multiplying)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the exponent first", hint: "2² = 4." },
      { level: 2, description: "Compute the multiplication", hint: "3 × 4 = 12." },
      { level: 3, description: "Subtract", hint: "15 - 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-01",
    question: "Prime factorization of 50:",
    options: [
      { text: "2 × 5²", correct: true, feedback: "50 = 2×25." },
      { text: "5 × 10", correct: false, feedback: "10 not prime.", misconceptionId: "E-r6-a" }
    ],
    backward: "Break into primes.",
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "5×10 IS a factor pair of 50, but 10 is NOT prime (10=2×5) — keep breaking down until every factor is prime: 50=2×5×5=2×5², not 5×10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find any factor pair", hint: "50 = 2 × 25." },
      { level: 2, description: "Check if each factor is prime", hint: "2 is prime, but 25 is not — break 25 down further: 25=5×5." },
      { level: 3, description: "Write using index notation", hint: "50 = 2×5×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r7", order: 7, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-02",
    question: "Estimate √20 to nearest whole.",
    options: [
      { text: "4", correct: true, feedback: "4²=16, close." },
      { text: "5", correct: false, feedback: "5²=25, too high.", misconceptionId: "E-r7-a" }
    ],
    backward: "Which perfect square is nearest?",
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student rounds up to the next perfect square (25) without checking that 16 is actually closer to 20.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 20-16=4 (distance to 4²), while 25-20=5 (distance to 5²) — 16 is closer to 20, so √20≈4, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "4²=16, 5²=25." },
      { level: 2, description: "Compare the distances to 20", hint: "20-16=4, while 25-20=5." },
      { level: 3, description: "Choose the closer perfect square", hint: "Which perfect square (16 or 25) is closer to 20?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r8", order: 8, cluster: "EXTENSION", clusterName: CLUSTER_NAMES.EXTENSION,
    skillId: "EXTALG-02",
    question: "If x = -4, what is x³ + x²?",
    options: [
      { text: "-48", correct: true, feedback: "(-4)³=-64, (-4)²=16, sum -48." },
      { text: "-80", correct: false, feedback: "Check the square term.", misconceptionId: "E-r8-a" }
    ],
    backward: "Substitute and evaluate.",
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student mishandles the sign of x² (treating (-4)² as -16 instead of the correct +16), leading to -64-16=-80.",
        rootCause: "Even Exponent Sign Error — incorrectly keeps a negative sign on an even power of a negative number.",
        remediation: "(-4)² means -4 MULTIPLIED BY ITSELF, and a negative times a negative is POSITIVE: (-4)×(-4)=16, not -16 — the correct sum is -64+16=-48, not -64-16=-80."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute x³", hint: "(-4)³ = -64 (odd exponent, keeps the negative sign)." },
      { level: 2, description: "Compute x²", hint: "(-4)² = 16 (even exponent, becomes positive)." },
      { level: 3, description: "Add", hint: "-64 + 16 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r9", order: 9, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-02",
    question: "Find the HCF of 24 and 36.",
    options: [
      { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3²; HCF=2²×3=12." },
      { text: "6", correct: false, feedback: "Not the highest.", misconceptionId: "E-r9-a" },
      { text: "72", correct: false, feedback: "That's LCM.", misconceptionId: "E-r9-b" }
    ],
    backward: "Use prime factorisation.",
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student uses the wrong (too-small) power of 2 when combining the common prime factors, using 2¹ instead of the correct 2².",
        rootCause: "Lowest Common Power Miscounted — doesn't correctly identify the LOWEST shared power of each common prime.",
        remediation: "24=2³×3 and 36=2²×3² — both numbers share 2² (the LOWER of 2³ and 2²) and 3¹ (the lower of 3¹ and 3²) — HCF=2²×3=12, not 2×3=6."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student multiplies ALL prime factors from both numbers together (as if finding the LCM) instead of only the common ones at their lowest shared power.",
        rootCause: "HCF Method Confused With LCM Method — applies the LCM procedure (highest powers, all primes) instead of the HCF procedure (lowest powers, common primes only).",
        remediation: "HCF uses only the COMMON primes at their LOWEST shared power (2²×3=12) — computing the LCM (2³×3²=72) is a different calculation, not the HCF."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "24=2³×3. 36=2²×3²." },
      { level: 2, description: "Identify the common prime factors", hint: "Both share 2 and 3." },
      { level: 3, description: "Use the lowest shared power of each common prime", hint: "Lowest power of 2 shared: 2². Lowest power of 3 shared: 3¹. Multiply: 2²×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r10", order: 10, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-03",
    question: "Find the LCM of 8 and 12.",
    options: [
      { text: "24", correct: true, feedback: "8=2³, 12=2²×3; LCM=2³×3=24." },
      { text: "48", correct: false, feedback: "That's larger than necessary — check your multiples.", misconceptionId: "E-r10-a" },
      { text: "4", correct: false, feedback: "That's HCF.", misconceptionId: "E-r10-b" }
    ],
    backward: "LCM uses highest powers.",
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student multiplies the two original numbers together (8×12=96) or makes a related overcounting error, instead of using prime factorisation to find the actual LCM.",
        rootCause: "LCM Approximated as Product of the Two Numbers — assumes the LCM is always the product of the numbers, ignoring shared factors.",
        remediation: "The LCM is NOT simply the product of the two numbers — since 8 and 12 share a common factor, the actual LCM (24) is smaller than their product; use prime factorisation: 8=2³, 12=2²×3, LCM=2³×3=24, not 48."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student computes the HCF (using the lowest shared power, 2²=4) instead of the LCM (which needs the highest power of every prime that appears).",
        rootCause: "HCF Method Confused With LCM Method — applies the HCF procedure (lowest shared powers, common primes only) instead of the LCM procedure (highest powers, all primes).",
        remediation: "LCM requires the HIGHEST power of EVERY prime that appears in EITHER number (2³×3=24), not just the common part (2²=4, which is actually the HCF)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "8=2³. 12=2²×3." },
      { level: 2, description: "Identify every prime that appears in either number", hint: "The primes involved are 2 and 3." },
      { level: 3, description: "Use the highest power of each prime", hint: "Highest power of 2: 2³. Highest power of 3: 3¹. Multiply: 2³×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-05",
    question: "On a number line, what is the distance between -4 and 3?",
    options: [
      { text: "7", correct: true, feedback: "|-4-3|=7." },
      { text: "-7", correct: false, feedback: "Distance is positive.", misconceptionId: "E-r11-a" },
      { text: "1", correct: false, feedback: "Check your subtraction.", misconceptionId: "E-r11-b" }
    ],
    backward: "Distance = absolute difference.",
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student computes the directed (signed) difference correctly in magnitude but reports a negative value for distance.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "Distance is ALWAYS non-negative — take the absolute value of the difference: |-4-3|=|-7|=7, not -7."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student makes an arithmetic slip while subtracting the two numbers, landing on 1 instead of the correct 7.",
        rootCause: "Computation Error — the subtraction itself is carried out incorrectly.",
        remediation: "Recompute carefully: -4-3=-7, so the distance is |-7|=7, not 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between the two points", hint: "-4 - 3 = -7." },
      { level: 2, description: "Take the absolute value", hint: "Distance is always non-negative." },
      { level: 3, description: "Compute", hint: "|-7| = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r12", order: 12, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION,
    skillId: "ESTROOT-02",
    question: "Estimate √40 to the nearest whole number.",
    options: [
      { text: "6", correct: true, feedback: "6²=36, close to 40." },
      { text: "7", correct: false, feedback: "7²=49, too high.", misconceptionId: "E-r12-a" },
      { text: "5", correct: false, feedback: "5²=25, too low.", misconceptionId: "E-r12-b" }
    ],
    backward: "Find the nearest perfect square.",
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student rounds up to the next perfect square (49) without checking that 36 is actually closer to 40.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 40-36=4 (distance to 6²), while 49-40=9 (distance to 7²) — 36 is closer to 40, so √40≈6, not 7."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student picks a perfect square (25) that's too far below 40, without comparing it to the closer 36.",
        rootCause: "Wrong Perfect Square Selected — doesn't identify the perfect squares actually bracketing the target number.",
        remediation: "5²=25 is further from 40 than 6²=36 — find the perfect squares closest to 40: 36 (distance 4) is much closer than 25 (distance 15), so √40≈6, not 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "6²=36, 7²=49." },
      { level: 2, description: "Compare the distances to 40", hint: "40-36=4, while 49-40=9." },
      { level: 3, description: "Choose the closer perfect square", hint: "Which perfect square (36 or 49) is closer to 40?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] }
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

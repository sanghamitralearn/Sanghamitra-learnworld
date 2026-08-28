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
    skillId: "PATTSIGN-01",
    question: "\\((-2)^4 + (-2)^3 =\\)",
    options: [
      { text: "8", correct: true, feedback: "Correct. 16 + (-8) = 8." },
      { text: "-8", correct: false, feedback: "You added 16 and 8 with the wrong sign.", misconceptionId: "E-w1-a" },
      { text: "24", correct: false, feedback: "You added the absolute values.", misconceptionId: "E-w1-b" },
      { text: "-24", correct: false, feedback: "You added with wrong signs.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "Even exponent → positive; odd exponent preserves the negative sign.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student mishandles the sign of one term, perhaps treating (-2)⁴ as negative, landing on -8 instead of the correct 8.",
        rootCause: "Even/Odd Exponent Sign Rule Confused — applies the wrong sign rule to one of the two terms.",
        remediation: "(-2)⁴=16 (EVEN exponent, positive), and (-2)³=-8 (ODD exponent, negative) — 16+(-8)=8, not -8 (which would come from treating 16 as negative)."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student adds the absolute values of both terms (16+8=24) instead of respecting the actual sign of (-2)³.",
        rootCause: "Sign of Odd-Exponent Term Dropped — treats the negative term as if it were positive before adding.",
        remediation: "(-2)³=-8 is NEGATIVE, not positive — keep the sign when adding: 16+(-8)=8, not 16+8=24 (which incorrectly treats -8 as +8)."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student treats both terms as negative, perhaps computing (-2)⁴ as -16, landing on -24 instead of the correct 8.",
        rootCause: "Even Exponent Sign Error — incorrectly keeps a negative sign on an even power of a negative number.",
        remediation: "(-2)⁴ is POSITIVE (even exponent): (-2)×(-2)×(-2)×(-2)=16, not -16 — the sum is 16+(-8)=8, not -24 (which treats both terms as negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute (-2)⁴", hint: "(-2)⁴ = 16 (even exponent, positive)." },
      { level: 2, description: "Compute (-2)³", hint: "(-2)³ = -8 (odd exponent, negative)." },
      { level: 3, description: "Add the two results", hint: "16 + (-8) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w2", order: 2, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "EXPPERFSQ-01",
    question: "Which of these is a perfect square?",
    options: [
      { text: "\\(2^4 \\times 3^2\\)", correct: true, feedback: "Correct. \\(2^4 = (2^2)^2\\), \\(3^2\\) is a square, so the product is a perfect square." },
      { text: "\\(2^5 \\times 3^2\\)", correct: false, feedback: "The exponent on 2 is odd, so it is not a perfect square.", misconceptionId: "E-w2-a" },
      { text: "Both", correct: false, feedback: "Only the first is a perfect square.", misconceptionId: "E-w2-b" },
      { text: "Neither", correct: false, feedback: "The first is a perfect square.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "A perfect square has all prime exponents even.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student selects the expression with an odd exponent (2⁵×3²), not checking that ALL prime exponents must be even for a perfect square.",
        rootCause: "Perfect Square Condition Not Fully Checked — doesn't verify EVERY prime factor has an even exponent.",
        remediation: "For a perfect square, EVERY prime's exponent must be EVEN — 2⁵×3² has an ODD exponent on 2 (5), so it is NOT a perfect square; only 2⁴×3² (both exponents even: 4 and 2) qualifies."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student assumes both expressions are perfect squares without checking each one's exponents individually.",
        rootCause: "Values Not Actually Checked — assumes both qualify without verifying the exponent parity condition for each.",
        remediation: "Check EACH expression separately: 2⁴×3² has exponents 4 and 2 (both even) — a perfect square; 2⁵×3² has exponents 5 and 2 (5 is ODD) — NOT a perfect square; only the first qualifies, not both."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student assumes neither expression is a perfect square, missing that the first one (2⁴×3²) does satisfy the even-exponent condition.",
        rootCause: "Values Not Actually Checked — assumes neither qualifies without verifying the exponent parity condition.",
        remediation: "Check the first expression: 2⁴×3² has exponents 4 and 2, BOTH even — this DOES qualify as a perfect square (2⁴=(2²)², 3² is already a square), so it's not 'neither'."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the perfect square condition", hint: "A number is a perfect square if every prime's exponent in its factorisation is even." },
      { level: 2, description: "Check the first expression's exponents", hint: "2⁴×3² has exponents 4 and 2 — both even." },
      { level: 3, description: "Check the second expression's exponents", hint: "2⁵×3² has exponents 5 and 2 — is 5 even?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w3", order: 3, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTCYCLE-01",
    question: "What is the last digit of \\(3^{10}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Correct. The cycle of last digits is 3,9,7,1. The 10th term in the cycle is 9." },
      { text: "3", correct: false, feedback: "That's the first in the cycle.", misconceptionId: "E-w3-a" },
      { text: "7", correct: false, feedback: "That's the third.", misconceptionId: "E-w3-b" },
      { text: "1", correct: false, feedback: "That's the fourth.", misconceptionId: "E-w3-c" }
    ],
    retryHint: "List the last digits of powers: 3,9,7,1, repeating every 4.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student picks the FIRST position in the 4-digit cycle instead of correctly finding which position the 10th power falls into.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "The cycle (3,9,7,1) repeats every 4 powers — for the 10th power, compute 10 mod 4 = 2, meaning it lands on the 2ND position in the cycle (9), not the 1st position (3)."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student picks the THIRD position in the 4-digit cycle instead of correctly finding which position the 10th power falls into.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "The cycle (3,9,7,1) repeats every 4 powers — for the 10th power, compute 10 mod 4 = 2, meaning it lands on the 2ND position in the cycle (9), not the 3rd position (7)."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student picks the FOURTH position in the 4-digit cycle instead of correctly finding which position the 10th power falls into.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "The cycle (3,9,7,1) repeats every 4 powers — for the 10th power, compute 10 mod 4 = 2, meaning it lands on the 2ND position in the cycle (9), not the 4th position (1)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the repeating cycle of last digits", hint: "3¹=3, 3²=9, 3³=27(→7), 3⁴=81(→1), then it repeats." },
      { level: 2, description: "Determine the cycle length", hint: "The cycle has 4 terms: 3, 9, 7, 1." },
      { level: 3, description: "Find the position for the 10th power", hint: "10 ÷ 4 leaves what remainder? That remainder tells you the position." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMECOUNT-01",
    question: "Which number has exactly 4 factors?",
    options: [
      { text: "8", correct: true, feedback: "Correct. 8 = \\(2^3\\) has 4 factors: 1,2,4,8." },
      { text: "5", correct: false, feedback: "5 is prime, so it has only 2 factors.", misconceptionId: "E-w4-a" },
      { text: "12", correct: false, feedback: "12 has 6 factors.", misconceptionId: "E-w4-b" },
      { text: "18", correct: false, feedback: "18 has 6 factors.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "Numbers with exactly 4 factors are either \\(p^3\\) or \\(p \\times q\\) with distinct primes.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student picks a prime number (5), not recognising that primes have only 2 factors (1 and themselves), not 4.",
        rootCause: "Factor Count Not Actually Computed — picks a candidate without counting its actual factors.",
        remediation: "5 is PRIME, meaning it has only 2 factors (1 and 5) — count the factors of 8=2³: 1,2,4,8, that's 4 factors, not 2."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student picks 12, not recognising it actually has 6 factors, not 4.",
        rootCause: "Factor Count Not Actually Computed — picks a candidate without counting its actual factors.",
        remediation: "12=2²×3 has (2+1)(1+1)=6 factors (1,2,3,4,6,12), not 4 — 8=2³ has (3+1)=4 factors (1,2,4,8), which is the correct answer."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student picks 18, not recognising it actually has 6 factors, not 4.",
        rootCause: "Factor Count Not Actually Computed — picks a candidate without counting its actual factors.",
        remediation: "18=2×3² has (1+1)(2+1)=6 factors (1,2,3,6,9,18), not 4 — 8=2³ has (3+1)=4 factors (1,2,4,8), which is the correct answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each candidate", hint: "8=2³. 5 is prime. 12=2²×3. 18=2×3²." },
      { level: 2, description: "Apply the divisor-count formula", hint: "For p^a×q^b, the count is (a+1)(b+1)." },
      { level: 3, description: "Check which candidate gives exactly 4", hint: "8=2³ gives (3+1)=4 — does any other candidate also give 4?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w5", order: 5, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "INTDIV-01",
    question: "Without dividing, is \\(\\frac{120}{-15}\\) positive or negative?",
    options: [
      { text: "Negative", correct: true, feedback: "Correct. Positive divided by negative is negative." },
      { text: "Positive", correct: false, feedback: "One negative sign makes the quotient negative.", misconceptionId: "E-w5-a" },
      { text: "Zero", correct: false, feedback: "The numerator is not zero.", misconceptionId: "E-w5-b" },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined by the signs of the numbers.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "One negative → negative result.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student assumes the quotient is positive, perhaps not tracking that exactly one of the two numbers (the denominator) is negative.",
        rootCause: "Sign Rule Miscounted — doesn't correctly count that only ONE of the two numbers is negative.",
        remediation: "120 is POSITIVE and -15 is NEGATIVE — one positive and one negative divided together gives a NEGATIVE result, not positive."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student assumes the quotient is zero, perhaps confusing this with a different property.",
        rootCause: "Zero Assumed Without Basis — assumes a zero result without any numerator being zero.",
        remediation: "The numerator (120) is NOT zero, so the quotient cannot be zero — dividing a nonzero positive number by a negative number gives a negative (nonzero) result."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student assumes the sign cannot be determined without actually performing the division.",
        rootCause: "Available Reasoning Underused — treats a determinable sign as impossible to find without full division.",
        remediation: "The sign CAN be determined without dividing — a POSITIVE number divided by a NEGATIVE number always gives a NEGATIVE result, regardless of the exact magnitudes involved."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the sign of each number", hint: "120 is positive; -15 is negative." },
      { level: 2, description: "Recall the sign rule for division", hint: "Positive ÷ negative = negative." },
      { level: 3, description: "Apply the rule", hint: "What sign results from dividing a positive by a negative?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "w6", order: 6, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "ORDEROPS-04",
    question: "Insert brackets to make \\(2 + 3 \\times 4 - 6 = 14\\) true.",
    options: [
      { text: "(2 + 3) × 4 - 6", correct: true, feedback: "Correct. 5 × 4 - 6 = 14." },
      { text: "2 + 3 × (4 - 6)", correct: false, feedback: "2 + 3×(-2) = -4.", misconceptionId: "E-w6-a" },
      { text: "(2 + 3 × 4) - 6", correct: false, feedback: "(2+12)-6=8.", misconceptionId: "E-w6-b" },
      { text: "2 + (3 × 4 - 6)", correct: false, feedback: "2+6=8.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "Try putting brackets around the addition.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student places brackets around a grouping that produces a negative result (-4) instead of the target 14.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually produce the target value.",
        remediation: "Test the result: 2+3×(4-6)=2+3×(-2)=2-6=-4, not 14 — try grouping the 2 and 3 together instead: (2+3)×4-6=5×4-6=14."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student groups a part of the expression that doesn't actually change the standard order of operations, so the result stays at 8 instead of 14.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (2+3×4) don't force a new order (multiplication still happens first inside), giving 8 — try grouping just the 2 and 3 together: (2+3)×4-6=14."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student groups a part of the expression that doesn't actually change the standard order of operations, so the result stays at 8 instead of 14.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (3×4-6) don't change the standard order, giving 8 — try grouping just the 2 and 3 together: (2+3)×4-6=14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original expression without brackets", hint: "2+3×4-6 = 2+12-6 = 8 (not the target)." },
      { level: 2, description: "Try grouping 2 and 3 together", hint: "(2+3)×4-6 = 5×4-6." },
      { level: 3, description: "Compute", hint: "5×4=20, then 20-6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w7", order: 7, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROOT-02",
    question: "Estimate \\(\\sqrt{999}\\) to the nearest integer.",
    options: [
      { text: "32", correct: true, feedback: "Correct. 31²=961, 32²=1024; 999 is closer to 1024." },
      { text: "31", correct: false, feedback: "31²=961, but 999 is closer to 32².", misconceptionId: "E-w7-a" },
      { text: "30", correct: false, feedback: "30²=900, too low.", misconceptionId: "E-w7-b" },
      { text: "33", correct: false, feedback: "33²=1089, too high.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Find the perfect squares either side: 31²=961, 32²=1024.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student rounds down to 31 without checking that 999 is actually closer to 32²=1024 than to 31²=961.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 999-961=38 (distance to 31²), while 1024-999=25 (distance to 32²) — 999 is closer to 1024, so √999≈32, not 31."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student picks a perfect square (900) that's far too low, not close to the actual nearby perfect squares.",
        rootCause: "Wrong Perfect Square Selected — doesn't identify the perfect squares actually bracketing the target number.",
        remediation: "30²=900 is much less than 999 — find the perfect squares closest to 999: 31²=961 and 32²=1024 — 999 is closer to 1024, so √999≈32, not 30."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student picks a perfect square (1089) that's too high, overshooting the nearest bracket.",
        rootCause: "Wrong Perfect Square Selected — doesn't identify the perfect squares actually bracketing the target number.",
        remediation: "33²=1089 is well above 999 — find the perfect squares closest to 999: 31²=961 and 32²=1024 — 999 is closer to 1024, so √999≈32, not 33."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "31²=961, 32²=1024." },
      { level: 2, description: "Compare the distances to 999", hint: "999-961=38, while 1024-999=25." },
      { level: 3, description: "Choose the closer perfect square", hint: "Which perfect square (961 or 1024) is closer to 999?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "w8", order: 8, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-07",
    question: "Find the HCF of \\(2^3 \\times 3\\) and \\(2^2 \\times 3^2\\).",
    options: [
      { text: "12", correct: true, feedback: "Correct. HCF = \\(2^2 \\times 3 = 12\\)." },
      { text: "6", correct: false, feedback: "That's \\(2 \\times 3\\).", misconceptionId: "E-w8-a" },
      { text: "24", correct: false, feedback: "That's \\(2^3 \\times 3\\).", misconceptionId: "E-w8-b" },
      { text: "18", correct: false, feedback: "That's \\(2 \\times 3^2\\).", misconceptionId: "E-w8-c" }
    ],
    retryHint: "Take the lower power of each prime factor.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student uses exponent 1 for both primes (2¹×3¹=6) instead of correctly identifying the lowest shared power for each.",
        rootCause: "Lowest Common Power Miscounted — uses too-small powers instead of the actual lowest shared power of each prime.",
        remediation: "For 2³×3 and 2²×3², the LOWEST shared power of 2 is 2² (min of 3 and 2), and the LOWEST shared power of 3 is 3¹ (min of 1 and 2) — HCF=2²×3=12, not 2×3=6."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student uses the higher power of 2 (2³ instead of 2²), mixing up which number's exponent is lower.",
        rootCause: "Lowest Common Power Miscounted — uses the HIGHER power of a prime instead of the lowest power shared by both numbers.",
        remediation: "Compare the exponents of 2: 2³ (in the first number) vs 2² (in the second) — the LOWEST shared power is 2² (not 2³) — HCF=2²×3=12, not 2³×3=24."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student uses the higher power of 3 (3² instead of 3¹), mixing up which number's exponent is lower.",
        rootCause: "Lowest Common Power Miscounted — uses the HIGHER power of a prime instead of the lowest power shared by both numbers.",
        remediation: "Compare the exponents of 3: 3¹ (in the first number) vs 3² (in the second) — the LOWEST shared power is 3¹ (not 3²) — HCF=2²×3=12, not 2×3²=18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the exponents of 2", hint: "2³ vs 2² — the lower power is 2²." },
      { level: 2, description: "Compare the exponents of 3", hint: "3¹ vs 3² — the lower power is 3¹." },
      { level: 3, description: "Multiply the lowest shared powers", hint: "2² × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "EXPINEQ-01",
    question: "Find the smallest positive integer \\(n\\) such that \\((-2)^n > 1000\\).",
    options: [
      { text: "10", correct: true, feedback: "Correct. For even n, \\((-2)^n = 2^n\\). \\(2^{10}=1024 > 1000\\), while \\(2^9=512\\). Odd n gives a negative result, which cannot be >1000. Strategy: test even n only." },
      { text: "9", correct: false, feedback: "\\(2^9 = 512\\), not > 1000.", misconceptionId: "E-d1-a" },
      { text: "11", correct: false, feedback: "11 is odd, \\((-2)^{11}\\) is negative.", misconceptionId: "E-d1-b" },
      { text: "12", correct: false, feedback: "Works but not the smallest.", misconceptionId: "E-d1-c" }
    ],
    backward: "Powers of negative numbers alternate sign.",
    forward: "This type of trial-and-improvement appears in exponential growth problems.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student picks n=9 without checking that (-2)⁹=-512, which is negative and therefore NOT greater than 1000.",
        rootCause: "Odd Exponent Result Not Checked — doesn't verify that odd exponents on a negative base give a negative (and thus invalid) result.",
        remediation: "n=9 is ODD, so (-2)⁹=-512, which is NEGATIVE and NOT greater than 1000 — you need an EVEN n where 2ⁿ>1000: 2¹⁰=1024>1000, so n=10 is the answer, not 9."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student picks n=11, an odd exponent, without recognising this makes (-2)¹¹ negative and therefore invalid.",
        rootCause: "Odd Exponent Result Not Checked — doesn't verify that odd exponents on a negative base give a negative (and thus invalid) result.",
        remediation: "n=11 is ODD, so (-2)¹¹ is NEGATIVE, which can never be greater than 1000 — you need an EVEN n: 2¹⁰=1024>1000, so n=10 is the smallest valid answer, not the odd n=11."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student finds a valid n=12 that satisfies the inequality but doesn't check whether a SMALLER even n also works.",
        rootCause: "Smallest Value Not Verified — finds A valid answer but doesn't check for a smaller one.",
        remediation: "n=12 DOES satisfy (-2)¹²=4096>1000, but it's not the SMALLEST — check n=10 first: (-2)¹⁰=1024>1000, which also works and is smaller than 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise that odd n always gives a negative result", hint: "Only EVEN n can give (-2)ⁿ>1000, since odd n gives a negative number." },
      { level: 2, description: "Test even values of n starting small", hint: "2⁸=256, 2⁹... wait, test only even: 2⁸=256, 2¹⁰=1024." },
      { level: 3, description: "Find the smallest even n where 2ⁿ exceeds 1000", hint: "Is 2⁸ or 2¹⁰ greater than 1000?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d2", order: 2, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTCYCLE-01",
    question: "What is the last digit of \\(7^{2026}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Correct. The cycle is 7,9,3,1. 2026 ÷ 4 leaves remainder 2 → second term is 9. Strategy: find the cycle of last digits." },
      { text: "7", correct: false, feedback: "That's the first term in the cycle.", misconceptionId: "E-d2-a" },
      { text: "3", correct: false, feedback: "That's the third.", misconceptionId: "E-d2-b" },
      { text: "1", correct: false, feedback: "That's the fourth.", misconceptionId: "E-d2-c" }
    ],
    backward: "Cyclic patterns in powers.",
    forward: "Last-digit problems are common in Olympiad maths.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student picks the FIRST position in the cycle without correctly computing 2026 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the large exponent to its position within the repeating cycle.",
        remediation: "Compute 2026 mod 4: 2026=4×506+2, remainder 2 — this means the 2026th power lands on the 2ND position in the cycle (7,9,3,1), which is 9, not the 1st position (7)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student picks the THIRD position in the cycle without correctly computing 2026 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the large exponent to its position within the repeating cycle.",
        remediation: "Compute 2026 mod 4: 2026=4×506+2, remainder 2 — this means the 2026th power lands on the 2ND position in the cycle (7,9,3,1), which is 9, not the 3rd position (3)."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student picks the FOURTH position in the cycle without correctly computing 2026 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the large exponent to its position within the repeating cycle.",
        remediation: "Compute 2026 mod 4: 2026=4×506+2, remainder 2 — this means the 2026th power lands on the 2ND position in the cycle (7,9,3,1), which is 9, not the 4th position (1)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the repeating cycle of last digits", hint: "7¹=7, 7²=49(→9), 7³=343(→3), 7⁴=2401(→1), then it repeats." },
      { level: 2, description: "Divide the large exponent by the cycle length", hint: "2026 ÷ 4 = 506 remainder 2." },
      { level: 3, description: "Find the digit at that position in the cycle", hint: "The remainder is 2 — what's the 2nd term in the cycle (7,9,3,1)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "POWEXP-09",
    question: "Which is larger: \\(2^{30}\\) or \\(3^{20}\\)?",
    options: [
      { text: "\\(3^{20}\\)", correct: true, feedback: "Correct. Rewrite both with exponent 10: \\(2^{30}=(2^3)^{10}=8^{10}\\), \\(3^{20}=(3^2)^{10}=9^{10}\\). Since 9>8, \\(3^{20}\\) is larger. Strategy: rewrite with the same exponent." },
      { text: "\\(2^{30}\\)", correct: false, feedback: "\\(8^{10} < 9^{10}\\).", misconceptionId: "E-d3-a" },
      { text: "They are equal", correct: false, feedback: "8 ≠ 9.", misconceptionId: "E-d3-b" },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined.", misconceptionId: "E-d3-c" }
    ],
    backward: "Rewriting powers with common bases/exponents.",
    forward: "Exponential comparison is key in growth problems.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student assumes the larger raw exponent (30 vs 20) means the larger value, without rewriting both expressions with a common exponent to compare fairly.",
        rootCause: "Values Not Rewritten For Fair Comparison — compares the raw expressions without converting to a common exponent or base.",
        remediation: "Rewrite BOTH with the same exponent: 2³⁰=(2³)¹⁰=8¹⁰, and 3²⁰=(3²)¹⁰=9¹⁰ — now compare the BASES with the same exponent: 9>8, so 9¹⁰>8¹⁰, meaning 3²⁰ is larger, not 2³⁰."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student assumes the two expressions are equal without actually rewriting and comparing them.",
        rootCause: "Values Not Actually Compared — assumes equality instead of evaluating or rewriting the expressions.",
        remediation: "Rewrite with a common exponent: 2³⁰=8¹⁰ and 3²⁰=9¹⁰ — since 8≠9, these are NOT equal; 9¹⁰>8¹⁰, so 3²⁰ is larger."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student assumes the comparison cannot be made without direct (full) calculation, missing that rewriting with a common exponent allows a comparison.",
        rootCause: "Available Reasoning Underused — treats a determinable comparison as impossible without full computation.",
        remediation: "The comparison CAN be made without computing the full values — rewrite both with a common exponent (2³⁰=8¹⁰, 3²⁰=9¹⁰), then simply compare the bases (8 vs 9) to determine which power is larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common exponent for both expressions", hint: "30=3×10 and 20=2×10 — both are multiples of 10." },
      { level: 2, description: "Rewrite each as a power raised to the 10th power", hint: "2³⁰=(2³)¹⁰=8¹⁰. 3²⁰=(3²)¹⁰=9¹⁰." },
      { level: 3, description: "Compare the bases", hint: "Since both are raised to the same power (10), compare 8 and 9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-06",
    question: "How many positive divisors does 72 have?",
    options: [
      { text: "12", correct: true, feedback: "Correct. 72 = \\(2^3 \\times 3^2\\); number of divisors = (3+1)(2+1)=12. Strategy: add 1 to each exponent and multiply." },
      { text: "10", correct: false, feedback: "You might have added exponents incorrectly.", misconceptionId: "E-d4-a" },
      { text: "6", correct: false, feedback: "That's the number of factors of a smaller number.", misconceptionId: "E-d4-b" },
      { text: "8", correct: false, feedback: "Not correct.", misconceptionId: "E-d4-c" }
    ],
    backward: "Prime factorisation gives divisor count.",
    forward: "Divisor functions appear in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student adds the exponents (3+2=5) instead of adding 1 to EACH exponent before multiplying, or otherwise miscombines them.",
        rootCause: "Divisor-Count Formula Misapplied — confuses the correct formula (add 1 to each exponent, then multiply) with a different combination.",
        remediation: "The formula is (exponent+1) for EACH prime, THEN multiply those results — for 72=2³×3²: (3+1)×(2+1)=4×3=12, not simply adding exponents (3+2=5) or another miscombination giving 10."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student computes the divisor count for a different (smaller) number instead of 72, perhaps miscounting the exponents.",
        rootCause: "Wrong Exponents Used — applies the formula with incorrect exponent values.",
        remediation: "Double-check the prime factorisation of 72: 72=2³×3² (NOT 2¹×3¹, which would give (1+1)(1+1)=4, or some other smaller number's factorisation) — using the CORRECT exponents: (3+1)(2+1)=12, not 6."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student makes an arithmetic slip in the final multiplication of the divisor-count formula, landing on 8 instead of the correct 12.",
        rootCause: "Computation Error — correct formula, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 72=2³×3², so (3+1)×(2+1)=4×3=12, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of 72", hint: "72 = 2³ × 3²." },
      { level: 2, description: "Add 1 to each exponent", hint: "3+1=4. 2+1=3." },
      { level: 3, description: "Multiply the results", hint: "4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTCOMPARE-02",
    question: "Without calculation, which is larger: \\(\\sqrt{10} + \\sqrt{20}\\) or \\(\\sqrt{30}\\)?",
    options: [
      { text: "\\(\\sqrt{10} + \\sqrt{20}\\)", correct: true, feedback: "Correct. \\(\\sqrt{10} \\approx 3.2\\), \\(\\sqrt{20} \\approx 4.5\\), sum ≈7.7; \\(\\sqrt{30} \\approx 5.5\\). The sum is larger. Strategy: approximate each square root." },
      { text: "\\(\\sqrt{30}\\)", correct: false, feedback: "5.5 < 7.7.", misconceptionId: "E-d5-a" },
      { text: "They are equal", correct: false, feedback: "They are not.", misconceptionId: "E-d5-b" },
      { text: "Cannot be determined", correct: false, feedback: "We can approximate.", misconceptionId: "E-d5-c" }
    ],
    backward: "Estimating irrationals.",
    forward: "Comparison of expressions is vital in inequality problems.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student assumes √30 is larger, perhaps thinking √(10+20)=√30 should equal √10+√20, which is a common but incorrect assumption about square roots.",
        rootCause: "Square Root Incorrectly Assumed to Distribute Over Addition — assumes √a+√b=√(a+b), which is false.",
        remediation: "√10+√20 does NOT equal √30 — approximate each separately: √10≈3.2, √20≈4.5, sum≈7.7, while √30≈5.5 — the SUM (7.7) is much larger than √30 (5.5), since square roots don't add like that."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student assumes the two expressions are equal, incorrectly believing √a+√b=√(a+b).",
        rootCause: "Square Root Incorrectly Assumed to Distribute Over Addition — assumes √a+√b=√(a+b), which is false.",
        remediation: "√10+√20 is NOT the same as √30 — approximate: √10≈3.2, √20≈4.5, sum≈7.7, while √30≈5.5 — these are clearly different values, not equal."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student assumes the comparison cannot be made without exact calculation, missing that rough approximation is sufficient.",
        rootCause: "Available Reasoning Underused — treats a determinable comparison as impossible without exact computation.",
        remediation: "The comparison CAN be made using rough approximations — √10≈3.2 and √20≈4.5 sum to about 7.7, while √30≈5.5 — this level of estimation is enough to determine the sum is larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Approximate each square root", hint: "√10≈3.2, √20≈4.5, √30≈5.5." },
      { level: 2, description: "Add the first two approximations", hint: "3.2 + 4.5 ≈ 7.7." },
      { level: 3, description: "Compare to √30", hint: "Is 7.7 or 5.5 larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d6", order: 6, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    skillId: "PROOFPARITY-01",
    question: "Is it always true that if \\(n\\) is odd, \\((-1)^n = -1\\)?",
    options: [
      { text: "Yes, always true", correct: true, feedback: "Correct. An odd power of -1 is -1. There is no counter-example. Strategy: test with n=1,3,5." },
      { text: "No, n=0 is a counter-example", correct: false, feedback: "0 is not odd.", misconceptionId: "E-d6-a" },
      { text: "No, n=2 is a counter-example", correct: false, feedback: "2 is even.", misconceptionId: "E-d6-b" },
      { text: "No, it depends on the value of n", correct: false, feedback: "For any odd integer, the result is always -1.", misconceptionId: "E-d6-c" }
    ],
    backward: "Parity of exponents.",
    forward: "Proof by exhaustion of cases is a fundamental skill.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student proposes n=0 as a counter-example without checking that 0 is actually EVEN, not odd, so it doesn't apply to the claim at all.",
        rootCause: "Counter-Example Doesn't Satisfy the Premise — proposes an example that doesn't actually meet the stated condition (n odd).",
        remediation: "The claim is specifically about ODD n — but 0 is EVEN, not odd, so it's not even a valid test case for this claim; check actual odd values like n=1,3,5, and you'll find (-1)ⁿ=-1 holds every time."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student proposes n=2 as a counter-example without checking that 2 is EVEN, not odd, so it doesn't apply to the claim.",
        rootCause: "Counter-Example Doesn't Satisfy the Premise — proposes an example that doesn't actually meet the stated condition (n odd).",
        remediation: "The claim is specifically about ODD n — but 2 is EVEN, not odd, so it's not a valid test case; check actual odd values like n=1,3,5, and you'll find (-1)ⁿ=-1 holds every time."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student assumes the truth of the claim varies depending on which odd n is chosen, without testing multiple odd values to see the pattern holds universally.",
        rootCause: "Claim Not Tested Across Multiple Cases — assumes variability without checking several odd values.",
        remediation: "Test SEVERAL odd values: n=1: (-1)¹=-1; n=3: (-1)³=-1; n=5: (-1)⁵=-1 — the result is ALWAYS -1 for odd n, it does NOT depend on which specific odd n you choose."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with n=1", hint: "(-1)¹ = -1." },
      { level: 2, description: "Test with n=3 and n=5", hint: "(-1)³=-1. (-1)⁵=-1." },
      { level: 3, description: "Generalise", hint: "Does the pattern ever break for any odd n?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d7", order: 7, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "INTADD-12",
    question: "A sequence is defined by \\(a_1 = -2\\), \\(a_{n+1} = -a_n + 3\\). Find \\(a_5\\).",
    options: [
      { text: "-2", correct: true, feedback: "Correct. a1=-2; a2= -(-2)+3=5; a3= -5+3=-2; a4=5; a5=-2. Strategy: compute term by term." },
      { text: "5", correct: false, feedback: "That's a2.", misconceptionId: "E-d7-a" },
      { text: "-5", correct: false, feedback: "Not a value in the sequence.", misconceptionId: "E-d7-b" },
      { text: "2", correct: false, feedback: "Sign error.", misconceptionId: "E-d7-c" }
    ],
    backward: "Recursive sequences.",
    forward: "Understanding recursion is important in programming and mathematics.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student stops after computing a2 (or miscounts the term index), reporting 5 instead of continuing to a5.",
        rootCause: "Off-By-Several Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "The sequence alternates: a1=-2, a2=5, a3=-2, a4=5, a5=-2 — the question asks for a5 (the 5TH term), not a2 (5)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student computes a value not actually present in the sequence, perhaps making a sign error while applying the recursive rule.",
        rootCause: "Recursive Rule Applied Incorrectly — misapplies the rule aₙ₊₁=-aₙ+3 at some step.",
        remediation: "Apply the rule CAREFULLY at each step: a2=-(-2)+3=2+3=5; a3=-(5)+3=-5+3=-2; a4=-(-2)+3=5; a5=-(5)+3=-2 — the sequence alternates between -2 and 5, never reaching -5."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student makes a sign error while applying the recursive rule, landing on 2 instead of the correct -2.",
        rootCause: "Sign Error in Recursive Rule — mishandles a negation while computing successive terms.",
        remediation: "Recompute carefully: a2=-(-2)+3=5, a3=-(5)+3=-2, a4=-(-2)+3=5, a5=-(5)+3=-2 — not 2 (check each negation step)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute a2 from a1", hint: "a2 = -(-2)+3 = 2+3 = 5." },
      { level: 2, description: "Compute a3 and a4", hint: "a3 = -(5)+3 = -2. a4 = -(-2)+3 = 5." },
      { level: 3, description: "Compute a5", hint: "a5 = -(5)+3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d8", order: 8, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "SYNTHOPT-01",
    question: "If \\(a\\) and \\(b\\) are negative integers and \\(a^2 + b^2 = 50\\), what is the smallest possible value of \\(a + b\\)?",
    options: [
      { text: "-10", correct: true, feedback: "Correct. Pairs: (-1,-7) sum -8; (-5,-5) sum -10. -10 is the smallest. Strategy: list negative integer pairs whose squares sum to 50." },
      { text: "-8", correct: false, feedback: "That's the sum for (-1,-7).", misconceptionId: "E-d8-a" },
      { text: "10", correct: false, feedback: "Positive sum.", misconceptionId: "E-d8-b" },
      { text: "-14", correct: false, feedback: "No pair gives that sum.", misconceptionId: "E-d8-c" }
    ],
    backward: "Integer solutions to equations.",
    forward: "This leads to Diophantine reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student finds one valid pair (-1,-7) giving sum -8 but doesn't check for OTHER pairs that might give a smaller (more negative) sum.",
        rootCause: "Not All Valid Pairs Checked — stops after finding one solution instead of checking all possibilities.",
        remediation: "There's MORE than one pair of negative integers whose squares sum to 50 — besides (-1,-7) giving -8, there's also (-5,-5) giving -10, which is SMALLER (more negative) — you must check ALL pairs to find the smallest sum."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student forgets that both a and b must be NEGATIVE, computing a positive sum instead.",
        rootCause: "Sign Constraint Ignored — doesn't apply the given constraint that both integers are negative.",
        remediation: "The question specifies a and b are BOTH NEGATIVE integers — using negative values like (-5,-5), the sum is -5+(-5)=-10, not a positive sum like 10 (which would come from using positive values, violating the constraint)."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student assumes an even smaller sum is possible without verifying that any actual integer pair produces it.",
        rootCause: "Answer Not Verified Against Actual Pairs — assumes a value without checking it comes from a real solution.",
        remediation: "Check which pairs of negative integers actually satisfy a²+b²=50: only (-1,-7) [sum -8] and (-5,-5) [sum -10] work — no pair gives a sum of -14, so -10 is the smallest achievable, not -14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List perfect square pairs summing to 50", hint: "1+49=50 and 25+25=50 are the only ways to write 50 as a sum of two perfect squares." },
      { level: 2, description: "Convert to negative integer pairs", hint: "(-1,-7) and (-5,-5), since (-1)²+(-7)²=50 and (-5)²+(-5)²=50." },
      { level: 3, description: "Compute the sum for each pair and find the smallest", hint: "-1+(-7)=-8. -5+(-5)=-10. Which is smaller?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d9", order: 9, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTFORMULA-01",
    question: "A sequence is: -1, 2, -3, 4, -5, 6, … What is the 101st term?",
    options: [
      { text: "-101", correct: true, feedback: "Correct. The nth term is \\(n \\times (-1)^n\\). For odd n it is negative. Strategy: find the pattern for the sign and magnitude." },
      { text: "101", correct: false, feedback: "Sign is negative for odd n.", misconceptionId: "E-d9-a" },
      { text: "-100", correct: false, feedback: "Off by one.", misconceptionId: "E-d9-b" },
      { text: "-102", correct: false, feedback: "Off by one.", misconceptionId: "E-d9-c" }
    ],
    backward: "Alternating sequences.",
    forward: "Pattern recognition is essential in series.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student gets the correct magnitude (101) but drops the negative sign, not recognising that odd-position terms in this sequence are negative.",
        rootCause: "Sign Pattern Not Applied — computes the magnitude correctly but ignores the alternating sign rule.",
        remediation: "In this sequence, ODD-position terms are NEGATIVE (like the 1st term, -1) and EVEN-position terms are POSITIVE (like the 2nd term, 2) — the 101st position is ODD, so the term is NEGATIVE: -101, not 101."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student computes the wrong magnitude, using 100 instead of the correct 101, perhaps confusing the position with a nearby value.",
        rootCause: "Magnitude Miscounted — uses an incorrect number for the term's magnitude.",
        remediation: "The magnitude of the nth term always equals n itself — for the 101st term, the magnitude is 101, not 100; combined with the negative sign (since 101 is odd): -101, not -100."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student computes the wrong magnitude, using 102 instead of the correct 101, perhaps confusing the position with an adjacent term.",
        rootCause: "Magnitude Miscounted — uses an incorrect number for the term's magnitude.",
        remediation: "The magnitude of the nth term always equals n itself — for the 101st term, the magnitude is 101, not 102; combined with the negative sign (since 101 is odd): -101, not -102."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the pattern's magnitude rule", hint: "The magnitude of the nth term equals n." },
      { level: 2, description: "Identify the sign rule", hint: "Odd-position terms are negative; even-position terms are positive." },
      { level: 3, description: "Apply both rules to the 101st term", hint: "Is 101 odd or even? What sign and magnitude does that give?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "ESTDIGIT-01",
    question: "How many digits does \\(2^{12} \\times 5^{10}\\) have?",
    options: [
      { text: "11", correct: true, feedback: "Correct. \\(2^{12} \\times 5^{10} = 2^2 \\times (2^{10} \\times 5^{10}) = 4 \\times 10^{10} = 40,000,000,000\\) (11 digits). Strategy: factor powers of ten." },
      { text: "10", correct: false, feedback: "That would be 4 × 10^9.", misconceptionId: "E-d10-a" },
      { text: "12", correct: false, feedback: "Too many.", misconceptionId: "E-d10-b" },
      { text: "22", correct: false, feedback: "You added the exponents.", misconceptionId: "E-d10-c" }
    ],
    backward: "Combining powers into powers of ten.",
    forward: "This connects exponents with place value.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student miscounts the power of 10, using 10⁹ instead of the correct 10¹⁰, leading to an undercounted digit total.",
        rootCause: "Power of Ten Miscounted — uses an incorrect exponent when combining 2's and 5's into a power of 10.",
        remediation: "2¹²×5¹⁰=2²×(2¹⁰×5¹⁰)=4×10¹⁰, not 4×10⁹ — 10¹⁰ has 10 zeros, and with the leading 4, that's 11 digits total (40,000,000,000), not 10."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student overcounts the digits, perhaps confusing the exponent with the digit count directly.",
        rootCause: "Digit Count Miscounted — miscounts the total number of digits in the final number.",
        remediation: "Write it out: 4×10¹⁰=40,000,000,000 — count the digits: 4-0-0-0-0-0-0-0-0-0-0, that's exactly 11 digits, not 12."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student adds the exponents (12+10=22) as if they were the digit count, instead of correctly combining the powers into a power of 10.",
        rootCause: "Exponent Sum Confused With Digit Count — treats the sum of the original exponents as if it directly gave the number of digits.",
        remediation: "Adding 12+10=22 is NOT the digit count — instead, rewrite the expression as a power of 10: 2¹²×5¹⁰=2²×(2¹⁰×5¹⁰)=4×10¹⁰, which has 11 digits, not 22."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split off the extra factor of 2", hint: "2¹²×5¹⁰ = 2² × (2¹⁰×5¹⁰)." },
      { level: 2, description: "Combine the matching powers into a power of 10", hint: "2¹⁰×5¹⁰ = 10¹⁰." },
      { level: 3, description: "Write out the full number and count digits", hint: "4×10¹⁰ = 40,000,000,000 — how many digits is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d11", order: 11, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-06",
    question: "Find the smallest positive integer that has exactly 8 factors.",
    options: [
      { text: "24", correct: true, feedback: "Correct. 24 = \\(2^3 \\times 3\\) has 8 factors. 30 also has 8 factors, but 24 is smaller. Strategy: either \\(p^7\\) (minimum 2^7=128) or \\(p^3 q\\) (minimum 2^3×3=24) or \\(p q r\\) (2×3×5=30)." },
      { text: "30", correct: false, feedback: "30 has 8 factors but is larger than 24.", misconceptionId: "E-d11-a" },
      { text: "16", correct: false, feedback: "16 has 5 factors.", misconceptionId: "E-d11-b" },
      { text: "36", correct: false, feedback: "36 has 9 factors.", misconceptionId: "E-d11-c" }
    ],
    backward: "Number of factors from prime form.",
    forward: "Factor counting is used in cryptography.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student correctly finds a number with 8 factors (30=2×3×5) but doesn't check the other exponent-combination possibilities for a smaller one.",
        rootCause: "Not All Exponent Combinations Checked — finds ONE valid form for the factor count without checking others that might give a smaller number.",
        remediation: "8=(a+1)(b+1)... can be formed multiple ways: p⁷ (min 2⁷=128), p³q (min 2³×3=24), or pqr (min 2×3×5=30) — comparing ALL three forms, 24 is the SMALLEST, not 30."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student picks 16=2⁴, which actually has only 5 factors (1,2,4,8,16), not verifying the factor count matches the requirement of exactly 8.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 8 factors.",
        remediation: "Count the factors of 16=2⁴: using the formula (exponent+1)=(4+1)=5 factors, not 8 — 16 doesn't satisfy the condition; 24=2³×3 has (3+1)(1+1)=8 factors, which does."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student picks 36=2²×3², which actually has 9 factors, not 8.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 8 factors.",
        remediation: "Count the factors of 36=2²×3²: using the formula (2+1)(2+1)=9 factors, not 8 — 36 doesn't satisfy the condition; 24=2³×3 has (3+1)(1+1)=8 factors, which does."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the ways to factor 8 for the divisor-count formula", hint: "8 = 8×1, or 4×2, or 2×2×2." },
      { level: 2, description: "Build the smallest number for each factoring", hint: "8×1 → p⁷=128. 4×2 → p³q=2³×3=24. 2×2×2 → pqr=2×3×5=30." },
      { level: 3, description: "Compare the three candidates", hint: "Which of 128, 24, and 30 is smallest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d12", order: 12, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTALGTRICK-01",
    question: "Estimate \\(\\frac{999^2 - 1}{1000}\\) to the nearest integer.",
    options: [
      { text: "998", correct: true, feedback: "Correct. \\(999^2-1 = (999-1)(999+1) = 998 \\times 1000\\), divided by 1000 gives 998. Strategy: use difference of squares." },
      { text: "999", correct: false, feedback: "You forgot to subtract the 1.", misconceptionId: "E-d12-a" },
      { text: "1000", correct: false, feedback: "Not correct.", misconceptionId: "E-d12-b" },
      { text: "997", correct: false, feedback: "Off by one.", misconceptionId: "E-d12-c" }
    ],
    backward: "Algebraic manipulation for estimation.",
    forward: "Difference of squares is a powerful simplification tool.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student computes 999²/1000≈999 and forgets to account for the -1 in the numerator, which shifts the answer down by 1.",
        rootCause: "Numerator Term Omitted — drops the -1 from the numerator during the simplification.",
        remediation: "The numerator is 999²-1, NOT just 999² — use the difference of squares: 999²-1=(999-1)(999+1)=998×1000, giving 998 after dividing by 1000, not 999 (which ignores the -1)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student assumes the expression simplifies directly to 1000 without correctly applying the difference-of-squares factoring.",
        rootCause: "Difference of Squares Not Applied — doesn't recognise or correctly apply the (a-b)(a+b) factoring pattern.",
        remediation: "Apply the difference of squares: 999²-1=(999-1)(999+1)=998×1000 — dividing by 1000 gives 998, not 1000 (which would only be correct if the numerator were exactly 1000×1000)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student makes a small arithmetic slip in the factoring or division, landing on 997 instead of the correct 998.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 999²-1=(999-1)(999+1)=998×1000, then 998×1000÷1000=998, not 997."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise the difference-of-squares pattern", hint: "999²-1 = 999²-1² = (999-1)(999+1)." },
      { level: 2, description: "Compute the factored form", hint: "(999-1)(999+1) = 998 × 1000." },
      { level: 3, description: "Divide by 1000", hint: "998 × 1000 ÷ 1000 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d13", order: 13, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    skillId: "PROOFCOUNTER-01",
    question: "A student claims that \\((a + b)^2 = a^2 + b^2\\) for all integers \\(a, b\\). Which of the following pairs disproves this claim?",
    options: [
      { text: "\\(a=1, b=1\\)", correct: true, feedback: "Correct. (1+1)²=4 but 1²+1²=2, so the statement is false. Strategy: find a simple counter-example." },
      { text: "\\(a=0, b=0\\)", correct: false, feedback: "(0+0)²=0, 0²+0²=0 → the statement holds for this pair.", misconceptionId: "E-d13-a" },
      { text: "\\(a=2, b=0\\)", correct: false, feedback: "(2+0)²=4, 2²+0²=4 → the statement holds.", misconceptionId: "E-d13-b" },
      { text: "\\(a=0, b=2\\)", correct: false, feedback: "(0+2)²=4, 0²+2²=4 → the statement holds.", misconceptionId: "E-d13-c" }
    ],
    backward: "Counter-examples in algebra.",
    forward: "Disproving with a single counter-example is a key proof technique.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student picks a=0,b=0 without checking that this pair actually makes the claimed equation TRUE (both sides equal 0), so it fails to disprove anything.",
        rootCause: "Counter-Example Not Verified — picks a pair without checking it actually breaks the claimed equality.",
        remediation: "Check: with a=0,b=0, (0+0)²=0 AND 0²+0²=0 — both sides are EQUAL, so this pair does NOT disprove the claim; a=1,b=1 gives (1+1)²=4 but 1²+1²=2, which ARE different, disproving the claim."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student picks a=2,b=0 without checking that this pair actually makes the claimed equation TRUE, so it fails to disprove anything.",
        rootCause: "Counter-Example Not Verified — picks a pair without checking it actually breaks the claimed equality.",
        remediation: "Check: with a=2,b=0, (2+0)²=4 AND 2²+0²=4 — both sides are EQUAL, so this pair does NOT disprove the claim (having b=0 makes the cross term 2ab vanish); a=1,b=1 gives 4≠2, disproving the claim."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student picks a=0,b=2 without checking that this pair actually makes the claimed equation TRUE, so it fails to disprove anything.",
        rootCause: "Counter-Example Not Verified — picks a pair without checking it actually breaks the claimed equality.",
        remediation: "Check: with a=0,b=2, (0+2)²=4 AND 0²+2²=4 — both sides are EQUAL, so this pair does NOT disprove the claim (having a=0 makes the cross term 2ab vanish); a=1,b=1 gives 4≠2, disproving the claim."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Understand what a counter-example needs to do", hint: "A counter-example must make the two sides of the equation DIFFERENT." },
      { level: 2, description: "Test a pair where both a and b are nonzero", hint: "With a=1, b=1: compute both (a+b)² and a²+b²." },
      { level: 3, description: "Compare the two sides", hint: "Is (1+1)² equal to 1²+1²?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d14", order: 14, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQSUM-02",
    question: "What is the sum of the first 50 terms of 1, -2, 3, -4, 5, -6, …?",
    options: [
      { text: "-25", correct: true, feedback: "Correct. Pair terms: (1-2)+(3-4)+…+(49-50) = -1×25 = -25. Strategy: group into pairs." },
      { text: "25", correct: false, feedback: "Sign error.", misconceptionId: "E-d14-a" },
      { text: "0", correct: false, feedback: "The pairs don't cancel to zero.", misconceptionId: "E-d14-b" },
      { text: "-50", correct: false, feedback: "You forgot to halve the number of pairs.", misconceptionId: "E-d14-c" }
    ],
    backward: "Summing alternating series.",
    forward: "Pairing terms is a common series technique.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student computes the magnitude correctly (25) but drops the negative sign, not recognising each pair (odd-even) sums to -1.",
        rootCause: "Sign of Paired Sum Dropped — treats each pair's sum as positive instead of correctly negative.",
        remediation: "Each pair like (1-2) equals -1, NOT +1 — with 25 such pairs, the total is 25×(-1)=-25, not +25 (which incorrectly treats each pair as positive)."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student assumes the alternating positive and negative terms cancel out completely to zero, without correctly computing what each pair actually sums to.",
        rootCause: "Pairing Sum Miscalculated — assumes pairs cancel to 0 instead of correctly computing each pair's actual sum.",
        remediation: "Each pair does NOT cancel to 0 — for example, 1+(-2)=-1, not 0 (since the magnitudes increase each time, unlike a simple +n,-n pattern) — with 25 pairs each summing to -1, the total is -25, not 0."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student correctly finds that each pair sums to -1 but uses the wrong number of pairs, using 50 instead of the correct 25.",
        rootCause: "Number of Pairs Miscounted — forgets that 50 terms make only 25 pairs (2 terms per pair).",
        remediation: "50 terms make 50÷2=25 PAIRS (not 50 pairs) — each pair sums to -1, so the total is 25×(-1)=-25, not 50×(-1)=-50 (which incorrectly uses the term count instead of the pair count)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Group the terms into pairs", hint: "(1-2), (3-4), (5-6), ..., (49-50)." },
      { level: 2, description: "Find the sum of one pair", hint: "1-2 = -1. Every pair sums to -1." },
      { level: 3, description: "Count the pairs and multiply", hint: "50 terms make how many pairs? Multiply that by -1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d15", order: 15, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "SYNTHMOD-01",
    question: "A number \\(N\\) leaves a remainder of 3 when divided by 4 and a remainder of 1 when divided by 6. What is the smallest positive \\(N\\)?",
    options: [
      { text: "7", correct: true, feedback: "Correct. N=7: 7÷4=1 rem 3, 7÷6=1 rem 1. Strategy: list numbers congruent to 3 mod 4 and check mod 6." },
      { text: "3", correct: false, feedback: "3 mod4=3 but mod6=3, not 1.", misconceptionId: "E-d15-a" },
      { text: "11", correct: false, feedback: "11 mod4=3, mod6=5.", misconceptionId: "E-d15-b" },
      { text: "13", correct: false, feedback: "13 mod4=1, not 3.", misconceptionId: "E-d15-c" }
    ],
    backward: "Modular reasoning.",
    forward: "Chinese Remainder Theorem idea.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student checks only the first condition (remainder 3 mod 4) and stops, without also verifying the second condition (remainder 1 mod 6).",
        rootCause: "Only One Condition Verified — checks only one of the two required remainder conditions.",
        remediation: "N=3 satisfies 3 mod 4=3, but you must ALSO check 3 mod 6: 3÷6=0 remainder 3, NOT 1 — so 3 fails the SECOND condition; keep testing candidates until BOTH conditions hold, which happens at N=7 (7 mod 4=3 AND 7 mod 6=1)."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student picks a candidate (11) that satisfies the first condition but not the second, without fully verifying both.",
        rootCause: "Only One Condition Verified — checks only one of the two required remainder conditions.",
        remediation: "N=11 satisfies 11 mod 4=3, but check 11 mod 6: 11÷6=1 remainder 5, NOT 1 — so 11 fails the SECOND condition; the smallest N satisfying BOTH is 7."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student picks a candidate (13) that doesn't even satisfy the first condition, without checking both remainder conditions carefully.",
        rootCause: "Condition Not Actually Verified — picks a candidate without checking it against the stated remainder conditions.",
        remediation: "N=13 mod 4: 13÷4=3 remainder 1, NOT 3 — so 13 fails the FIRST condition already; the smallest N satisfying BOTH conditions (3 mod 4 AND 1 mod 6) is 7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List numbers with remainder 3 when divided by 4", hint: "3, 7, 11, 15, 19, ..." },
      { level: 2, description: "Check each one against the second condition (remainder 1 mod 6)", hint: "3 mod 6=3 (fails). 7 mod 6=1 (check!)." },
      { level: 3, description: "Confirm the first number that satisfies both", hint: "Does 7 satisfy remainder 3 mod 4 AND remainder 1 mod 6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d16", order: 16, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTLASTSQ-01",
    question: "Which of the following numbers, when squared, ends in 6?",
    options: [
      { text: "14", correct: true, feedback: "Correct. 14²=196 ends in 6. Only numbers ending in 4 or 6 give a square ending in 6. Strategy: check the last digit of the number." },
      { text: "13", correct: false, feedback: "13²=169 ends in 9.", misconceptionId: "E-d16-a" },
      { text: "17", correct: false, feedback: "17²=289 ends in 9.", misconceptionId: "E-d16-b" },
      { text: "19", correct: false, feedback: "19²=361 ends in 1.", misconceptionId: "E-d16-c" }
    ],
    backward: "Last-digit patterns in squares.",
    forward: "Digit patterns are useful in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student picks 13, whose square (169) actually ends in 9, without verifying the actual last digit.",
        rootCause: "Result Not Actually Computed or Verified — picks a candidate without checking its square's last digit.",
        remediation: "Compute 13²=169 — the last digit is 9, NOT 6 — this doesn't satisfy the condition; 14²=196 ends in 6, which is the correct answer."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks 17, whose square (289) actually ends in 9, without verifying the actual last digit.",
        rootCause: "Result Not Actually Computed or Verified — picks a candidate without checking its square's last digit.",
        remediation: "Compute 17²=289 — the last digit is 9, NOT 6 — this doesn't satisfy the condition; 14²=196 ends in 6, which is the correct answer."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks 19, whose square (361) actually ends in 1, without verifying the actual last digit.",
        rootCause: "Result Not Actually Computed or Verified — picks a candidate without checking its square's last digit.",
        remediation: "Compute 19²=361 — the last digit is 1, NOT 6 — this doesn't satisfy the condition; 14²=196 ends in 6, which is the correct answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall which last digits produce a square ending in 6", hint: "Only numbers ending in 4 or 6 give squares ending in 6 (since 4²=16, 6²=36)." },
      { level: 2, description: "Check the last digit of each candidate", hint: "14 ends in 4; 13, 17, 19 end in 3, 7, 9." },
      { level: 3, description: "Confirm by squaring the correct candidate", hint: "Does 14² actually end in 6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d17", order: 17, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "POWEXP-08",
    question: "Solve for \\(x\\): \\(4^x = 2^{x+3}\\)",
    options: [
      { text: "3", correct: true, feedback: "Correct. \\(4^x = (2^2)^x = 2^{2x}\\). Equate exponents: \\(2x = x+3\\) → \\(x=3\\). Strategy: rewrite to the same base." },
      { text: "2", correct: false, feedback: "2²=4, 2^(2+3)=32, not equal.", misconceptionId: "E-d17-a" },
      { text: "1", correct: false, feedback: "4¹=4, 2^(1+3)=16, not equal.", misconceptionId: "E-d17-b" },
      { text: "4", correct: false, feedback: "4⁴=256, 2⁷=128, not equal.", misconceptionId: "E-d17-c" }
    ],
    backward: "Equating exponents with common base.",
    forward: "Solving exponential equations.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student picks x=2 without correctly rewriting 4^x as 2^(2x) and solving the resulting linear equation.",
        rootCause: "Base Conversion Skipped — doesn't rewrite 4^x with base 2 before attempting to solve for x.",
        remediation: "Rewrite 4^x=(2²)^x=2^(2x) — now both sides have base 2, so equate exponents: 2x=x+3, giving x=3, not x=2 (verify: 4²=16≠2⁵=32)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student picks x=1 without correctly setting up and solving the equation 2x=x+3.",
        rootCause: "Equation Not Correctly Solved — doesn't correctly set up or solve the linear equation from the equated exponents.",
        remediation: "After rewriting 4^x=2^(2x), equate exponents: 2x=x+3 — solve by subtracting x from both sides: x=3, not x=1 (verify: 4¹=4≠2⁴=16)."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student picks x=4 without correctly solving the equation, perhaps confusing it with a coefficient in the problem.",
        rootCause: "Equation Not Correctly Solved — doesn't correctly set up or solve the linear equation from the equated exponents.",
        remediation: "After rewriting 4^x=2^(2x), equate exponents: 2x=x+3 — solve: x=3, not x=4 (verify: 4⁴=256≠2⁷=128)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 4 as a power of 2", hint: "4 = 2²." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "4^x = (2²)^x = 2^(2x)." },
      { level: 3, description: "Equate exponents and solve", hint: "2x = x+3 → x = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d18", order: 18, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-09",
    question: "The HCF of two numbers is 12 and their product is 864. What is their LCM?",
    options: [
      { text: "72", correct: true, feedback: "Correct. Product = HCF × LCM → LCM = 864/12 = 72. Strategy: use the relationship." },
      { text: "12", correct: false, feedback: "That's the HCF.", misconceptionId: "E-d18-a" },
      { text: "864", correct: false, feedback: "That's the product.", misconceptionId: "E-d18-b" },
      { text: "144", correct: false, feedback: "Not correct.", misconceptionId: "E-d18-c" }
    ],
    backward: "HCF × LCM = product.",
    forward: "This relationship is fundamental in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student reports the given HCF (12) instead of using the HCF-LCM-product relationship to solve for the LCM.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a given value with the value being solved for.",
        remediation: "12 is the GIVEN HCF, not the LCM you're solving for — use the relationship HCF×LCM=product: 12×LCM=864, so LCM=864÷12=72, not 12."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student reports the given product (864) instead of using the HCF-LCM-product relationship to solve for the LCM.",
        rootCause: "Given Value Reported Instead of Solved Unknown — confuses a given value with the value being solved for.",
        remediation: "864 is the GIVEN product, not the LCM you're solving for — use the relationship HCF×LCM=product: 12×LCM=864, so LCM=864÷12=72, not 864."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student makes an arithmetic slip in the division step, landing on 144 instead of the correct 72.",
        rootCause: "Computation Error — correct approach, but the division is carried out incorrectly.",
        remediation: "Recompute carefully: LCM=864÷12=72, not 144 (double-check your division: 12×72=864, confirming 72 is correct)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the HCF-LCM-product relationship", hint: "HCF × LCM = the product of the two numbers." },
      { level: 2, description: "Set up the equation", hint: "12 × LCM = 864." },
      { level: 3, description: "Solve for LCM", hint: "864 ÷ 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d19", order: 19, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTGEOM-01",
    question: "A cube has volume 500 cm³. Estimate its surface area to the nearest 50 cm².",
    options: [
      { text: "400", correct: true, feedback: "Correct. Side ≈ ³√500 ≈ 7.94; surface area ≈ 6 × (7.94)² ≈ 378 → nearest 50 is 400. Strategy: estimate cube root, then square and multiply by 6." },
      { text: "350", correct: false, feedback: "378 is closer to 400 than 350.", misconceptionId: "E-d19-a" },
      { text: "300", correct: false, feedback: "Too low.", misconceptionId: "E-d19-b" },
      { text: "450", correct: false, feedback: "Too high.", misconceptionId: "E-d19-c" }
    ],
    backward: "Estimation with roots and geometry.",
    forward: "Real-world estimation combines multiple skills.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student computes the actual surface area correctly (≈378) but rounds to the wrong nearest 50, choosing 350 instead of 400.",
        rootCause: "Rounding to Nearest 50 Incorrect — rounds to the wrong multiple of 50 despite computing the correct raw value.",
        remediation: "378 is closer to 400 than to 350 (378-350=28, while 400-378=22) — round to the NEAREST 50, which is 400, not 350."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student underestimates the side length or surface area calculation, landing on a value too low (300) instead of the correct estimate.",
        rootCause: "Multi-Step Estimation Error — one of the intermediate steps (cube root, squaring, or multiplying by 6) is underestimated.",
        remediation: "Work through each step carefully: side≈³√500≈7.94, side²≈63, surface area≈6×63≈378 — this rounds to 400, not 300 (check each intermediate step for underestimation)."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student overestimates the side length or surface area calculation, landing on a value too high (450) instead of the correct estimate.",
        rootCause: "Multi-Step Estimation Error — one of the intermediate steps (cube root, squaring, or multiplying by 6) is overestimated.",
        remediation: "Work through each step carefully: side≈³√500≈7.94, side²≈63, surface area≈6×63≈378 — this rounds to 400, not 450 (check each intermediate step for overestimation)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate the side length", hint: "³√500 ≈ 7.94 (since 8³=512, close to 500)." },
      { level: 2, description: "Square the side and multiply by 6 (for 6 faces)", hint: "7.94² ≈ 63, then 6 × 63 ≈ 378." },
      { level: 3, description: "Round to the nearest 50", hint: "Is 378 closer to 350 or 400?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d20", order: 20, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    skillId: "PROOFPARITY-02",
    question: "Prove that the product of two consecutive integers is always even. Which statement completes the proof?",
    options: [
      { text: "One of the two integers must be even.", correct: true, feedback: "Correct. If one integer is even, the product is even. Strategy: even × any integer = even." },
      { text: "Both integers must be odd.", correct: false, feedback: "Then product would be odd.", misconceptionId: "E-d20-a" },
      { text: "The product of any two integers is even.", correct: false, feedback: "False.", misconceptionId: "E-d20-b" },
      { text: "Consecutive integers have the same parity.", correct: false, feedback: "They have opposite parity.", misconceptionId: "E-d20-c" }
    ],
    backward: "Parity arguments.",
    forward: "This is a classic proof in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student claims both consecutive integers must be odd, when actually consecutive integers always have OPPOSITE parity (one odd, one even).",
        rootCause: "Parity of Consecutive Integers Misunderstood — doesn't recognise that consecutive integers always alternate between odd and even.",
        remediation: "Consecutive integers (like n and n+1) ALWAYS have opposite parity — if n is odd, n+1 is even, and vice versa — they can NEVER both be odd; this is exactly why one of them is always even, making the product even."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student overgeneralises, claiming ANY two integers' product is always even, which is false (e.g., 3×5=15 is odd).",
        rootCause: "Overgeneralisation Beyond the Given Claim — extends the specific claim about CONSECUTIVE integers to ALL integers, which is false.",
        remediation: "The claim is specifically about CONSECUTIVE integers, not just any two integers — two arbitrary integers (like 3 and 5) can both be odd, giving an odd product (15) — the key insight for CONSECUTIVE integers is that they always have opposite parity, guaranteeing one is even."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student claims consecutive integers have the SAME parity, when they actually always have OPPOSITE parity.",
        rootCause: "Parity of Consecutive Integers Misunderstood — reverses the actual relationship between consecutive integers' parities.",
        remediation: "Consecutive integers have OPPOSITE parity, not the same — n and n+1 always differ by 1, meaning if one is even the other is odd — this is why the product is always even: one factor is always even."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with a few examples", hint: "3×4=12 (even). 4×5=20 (even). 5×6=30 (even)." },
      { level: 2, description: "Identify the pattern in each pair", hint: "In each pair, one number is even and the other is odd." },
      { level: 3, description: "Generalise why this guarantees an even product", hint: "What happens when you multiply by an even number?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d21", order: 21, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQPARITY-01",
    question: "The Fibonacci sequence starts 1,1,2,3,5,8,… What is the parity (odd/even) of the 100th term?",
    options: [
      { text: "Odd", correct: true, feedback: "Correct. The parity pattern is odd, odd, even, repeating every 3. 100 mod 3 = 1 → odd. Strategy: find the parity cycle." },
      { text: "Even", correct: false, feedback: "100 mod 3 ≠ 2 or 0 in this pattern.", misconceptionId: "E-d21-a" },
      { text: "Cannot be determined", correct: false, feedback: "The pattern is deterministic.", misconceptionId: "E-d21-b" },
      { text: "It alternates", correct: false, feedback: "It doesn't alternate each term.", misconceptionId: "E-d21-c" }
    ],
    backward: "Patterns in sequences.",
    forward: "Fibonacci parity appears in contest problems.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student miscomputes 100 mod 3, landing on a position in the cycle that gives 'even' instead of the correct 'odd'.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the term number to its position within the repeating parity cycle.",
        remediation: "Compute 100 mod 3: 100=3×33+1, remainder 1 — this means the 100th term lands on the 1ST position in the cycle (odd, odd, even), which is ODD, not even."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student assumes the parity of a specific Fibonacci term cannot be determined without computing the entire sequence up to that point.",
        rootCause: "Available Reasoning Underused — treats a determinable pattern as impossible to find without full computation.",
        remediation: "The parity pattern IS determinable — Fibonacci parities repeat in a cycle of 3 (odd, odd, even) — using 100 mod 3=1, the 100th term's parity matches the 1st position in the cycle (odd), without needing to compute the actual 100th Fibonacci number."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student assumes the parity simply alternates term by term (odd, even, odd, even, ...), not recognising the actual 3-term cycle (odd, odd, even).",
        rootCause: "Wrong Cycle Pattern Assumed — assumes a simple alternating pattern instead of verifying the actual cycle from the sequence.",
        remediation: "Check the actual sequence's parities: 1(odd), 1(odd), 2(even), 3(odd), 5(odd), 8(even) — the pattern is ODD, ODD, EVEN repeating every 3 terms, NOT a simple odd-even alternation every term."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the parities of the first several terms", hint: "1(odd), 1(odd), 2(even), 3(odd), 5(odd), 8(even) — a pattern of 3." },
      { level: 2, description: "Determine the cycle length", hint: "The pattern (odd, odd, even) repeats every 3 terms." },
      { level: 3, description: "Find the position of the 100th term in the cycle", hint: "100 mod 3 = ? Which position does that correspond to?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "d22", order: 22, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "EXTMIX-01",
    question: "Evaluate: \\((-3)^2 \\times \\sqrt{64} + (-2)^3 \\div (-1)^4\\)",
    options: [
      { text: "64", correct: true, feedback: "Correct. 9 × 8 + (-8) ÷ 1 = 72 - 8 = 64. Strategy: handle signs, powers, and order of operations." },
      { text: "80", correct: false, feedback: "72+8 = 80, but division of -8 is subtraction.", misconceptionId: "E-d22-a" },
      { text: "-64", correct: false, feedback: "Sign error.", misconceptionId: "E-d22-b" },
      { text: "56", correct: false, feedback: "You might have miscalculated a power.", misconceptionId: "E-d22-c" }
    ],
    backward: "Synthesis of multiple operations.",
    forward: "Complex expressions test overall fluency.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student drops the negative sign on the second term, computing 72+8=80 instead of correctly adding the negative result of the division.",
        rootCause: "Sign of Division Result Dropped — treats (-2)³÷(-1)⁴ as if it were positive instead of correctly negative.",
        remediation: "(-2)³÷(-1)⁴ = -8÷1 = -8 (NEGATIVE) — you must ADD this negative value: 72+(-8)=64, not 72+8=80 (which incorrectly treats -8 as +8)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student mishandles a sign somewhere in the first term, perhaps treating (-3)² as negative, leading to an overall negative result.",
        rootCause: "Even Exponent Sign Error — incorrectly keeps a negative sign on an even power of a negative number.",
        remediation: "(-3)²=9 is POSITIVE (even exponent) — the first term is 9×8=72 (positive), not -72 — the full computation is 72+(-8)=64, not -64."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student miscalculates one of the powers (perhaps (-3)² or (-2)³ or (-1)⁴), leading to an incorrect final total of 56.",
        rootCause: "Computation Error — one of the power evaluations is carried out incorrectly.",
        remediation: "Recompute each power carefully: (-3)²=9, √64=8, (-2)³=-8, (-1)⁴=1 — then 9×8+(-8)÷1=72+(-8)=64, not 56."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each piece separately", hint: "(-3)²=9. √64=8. (-2)³=-8. (-1)⁴=1." },
      { level: 2, description: "Compute the multiplication and division", hint: "9×8=72. -8÷1=-8." },
      { level: 3, description: "Combine the two results", hint: "72 + (-8) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d23", order: 23, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-06",
    question: "A number is of the form \\(2^a \\times 3^b\\) and has exactly 15 factors. What is the smallest possible value?",
    options: [
      { text: "144", correct: true, feedback: "Correct. 15=3×5. If (a+1)(b+1)=15, possibilities: (a,b)=(2,4) or (4,2). Smallest is \\(2^4 \\times 3^2 = 144\\). Strategy: factor 15 and assign exponents." },
      { text: "324", correct: false, feedback: "That's \\(2^2 \\times 3^4 = 324\\).", misconceptionId: "E-d23-a" },
      { text: "64", correct: false, feedback: "64 = 2^6 has 7 factors.", misconceptionId: "E-d23-b" },
      { text: "108", correct: false, feedback: "108 = 2^2 × 3^3 has 12 factors.", misconceptionId: "E-d23-c" }
    ],
    backward: "Exponent and factor count relationship.",
    forward: "This type of optimisation appears in Olympiad number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student assigns the larger exponent to the larger prime (3⁴) and the smaller exponent to the smaller prime (2²), producing a LARGER result than necessary.",
        rootCause: "Exponent-to-Prime Assignment Not Optimised — assigns exponents to primes in the wrong order to minimise the final value.",
        remediation: "To MINIMISE the value, put the LARGER exponent on the SMALLER prime — 2⁴×3²=16×9=144 is SMALLER than 2²×3⁴=4×81=324, so 144 is correct, not 324."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student picks 64=2⁶, which actually has 7 factors, not 15, and also doesn't have the required form 2^a×3^b with both a and b nonzero contributing to reach 15 factors.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 15 factors.",
        remediation: "64=2⁶ has (6+1)=7 factors, not 15 — this doesn't satisfy the condition; 144=2⁴×3² has (4+1)(2+1)=15 factors, which does."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student picks 108=2²×3³, which actually has 12 factors, not 15.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 15 factors.",
        remediation: "108=2²×3³ has (2+1)(3+1)=12 factors, not 15 — this doesn't satisfy the condition; 144=2⁴×3² has (4+1)(2+1)=15 factors, which does."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Factor 15 into two factors for the divisor formula", hint: "15 = 3 × 5, so (a+1)(b+1)=15 could be 3×5 or 5×3." },
      { level: 2, description: "Find the two exponent combinations", hint: "(a+1,b+1)=(3,5) gives (a,b)=(2,4); (a+1,b+1)=(5,3) gives (a,b)=(4,2)." },
      { level: 3, description: "Compute both and choose the smaller", hint: "2²×3⁴=324 vs 2⁴×3²=144 — which is smaller?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d24", order: 24, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQGEOM-01",
    question: "A sequence begins 3, 6, 12, 24, … What is the 10th term?",
    options: [
      { text: "1536", correct: true, feedback: "Correct. This is a geometric sequence with ratio 2. The 10th term = \\(3 \\times 2^9 = 1536\\). Strategy: identify the pattern and use the formula." },
      { text: "3072", correct: false, feedback: "That's the 11th term.", misconceptionId: "E-d24-a" },
      { text: "768", correct: false, feedback: "That's the 9th term.", misconceptionId: "E-d24-b" },
      { text: "30", correct: false, feedback: "You added 27? Not geometric.", misconceptionId: "E-d24-c" }
    ],
    backward: "Geometric sequences.",
    forward: "Geometric growth appears in finance and science.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student uses one exponent too many in the geometric formula, computing the 11th term instead of the requested 10th.",
        rootCause: "Off-By-One Exponent — uses n instead of n-1 in the geometric sequence formula, or vice versa.",
        remediation: "The formula for the nth term is 3×2^(n-1) — for the 10TH term, use exponent 10-1=9: 3×2⁹=1536, not 3×2¹⁰=3072 (which is the 11th term)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student uses one exponent too few in the geometric formula, computing the 9th term instead of the requested 10th.",
        rootCause: "Off-By-One Exponent — uses n-2 instead of n-1 in the geometric sequence formula.",
        remediation: "The formula for the nth term is 3×2^(n-1) — for the 10TH term, use exponent 10-1=9: 3×2⁹=1536, not 3×2⁸=768 (which is the 9th term)."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student treats the sequence as arithmetic (adding a constant) instead of geometric (multiplying by a constant ratio), leading to an incorrect small value.",
        rootCause: "Sequence Type Misidentified — treats a geometric (multiplicative) sequence as if it were arithmetic (additive).",
        remediation: "Check the pattern: 3→6→12→24 — each term is DOUBLED (×2), not increased by a constant amount (+3, +6, +12...) — this is a GEOMETRIC sequence with ratio 2, so the 10th term is 3×2⁹=1536, not found by simple addition (30)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the type of sequence and its ratio", hint: "Each term is double the previous one — geometric with ratio 2." },
      { level: 2, description: "Recall the geometric sequence formula", hint: "nth term = first term × ratio^(n-1)." },
      { level: 3, description: "Apply the formula for the 10th term", hint: "3 × 2^(10-1) = 3 × 2⁹ = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSF-BF.A.2"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "SYNTHTEST-01",
    question: "If \\(x\\) is a negative integer such that \\(x^2 + x = 6\\), find \\(x\\).",
    options: [
      { text: "-3", correct: true, feedback: "(-3)²+(-3)=9-3=6. Strategy: test negative values." },
      { text: "2", correct: false, feedback: "2²+2=6 but x is negative.", misconceptionId: "E-r1-a" },
      { text: "-2", correct: false, feedback: "4-2=2.", misconceptionId: "E-r1-b" },
      { text: "3", correct: false, feedback: "3²+3=12, and x is negative.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student finds a value (2) that satisfies the equation x²+x=6 but ignores the constraint that x must be negative.",
        rootCause: "Sign Constraint Ignored — doesn't apply the given constraint that x must be negative.",
        remediation: "2 DOES satisfy 2²+2=6, but the question specifies x is NEGATIVE — 2 is positive, so it's excluded; test negative values: (-3)²+(-3)=9-3=6, so x=-3 satisfies both the equation AND the negative constraint."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student tests x=-2 without verifying it actually satisfies the equation, since (-2)²+(-2)=4-2=2, not 6.",
        rootCause: "Trial Value Not Verified — picks a candidate without checking it satisfies the full equation.",
        remediation: "Test x=-2: (-2)²+(-2)=4-2=2, which does NOT equal 6 — this value doesn't work; try x=-3: (-3)²+(-3)=9-3=6, which DOES satisfy the equation."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student picks x=3, which satisfies neither the equation (3²+3=12≠6) nor the negative constraint.",
        rootCause: "Trial Value Not Verified — picks a candidate without checking it satisfies the equation or the sign constraint.",
        remediation: "Test x=3: 3²+3=9+3=12, which does NOT equal 6, AND 3 is positive, not negative — both conditions fail; x=-3 gives (-3)²+(-3)=9-3=6, satisfying both."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the constraint", hint: "x must be a negative integer." },
      { level: 2, description: "Test negative integer candidates", hint: "Try x=-1, x=-2, x=-3 in the equation x²+x." },
      { level: 3, description: "Confirm which one gives 6", hint: "Does (-3)²+(-3) equal 6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "r2", order: 2, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTCYCLE-01",
    question: "What is the last digit of \\(2^{50}\\)?",
    options: [
      { text: "4", correct: true, feedback: "Cycle 2,4,8,6. 50 mod4=2 → second digit 4." },
      { text: "2", correct: false, feedback: "First.", misconceptionId: "E-r2-a" },
      { text: "8", correct: false, feedback: "Third.", misconceptionId: "E-r2-b" },
      { text: "6", correct: false, feedback: "Fourth.", misconceptionId: "E-r2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student picks the FIRST position in the cycle without correctly computing 50 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "Compute 50 mod 4: 50=4×12+2, remainder 2 — this means the 50th power lands on the 2ND position in the cycle (2,4,8,6), which is 4, not the 1st position (2)."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student picks the THIRD position in the cycle without correctly computing 50 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "Compute 50 mod 4: 50=4×12+2, remainder 2 — this means the 50th power lands on the 2ND position in the cycle (2,4,8,6), which is 4, not the 3rd position (8)."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student picks the FOURTH position in the cycle without correctly computing 50 mod 4.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly map the exponent to its position within the repeating cycle.",
        remediation: "Compute 50 mod 4: 50=4×12+2, remainder 2 — this means the 50th power lands on the 2ND position in the cycle (2,4,8,6), which is 4, not the 4th position (6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the repeating cycle of last digits", hint: "2¹=2, 2²=4, 2³=8, 2⁴=16(→6), then it repeats." },
      { level: 2, description: "Divide the exponent by the cycle length", hint: "50 ÷ 4 = 12 remainder 2." },
      { level: 3, description: "Find the digit at that position", hint: "The remainder is 2 — what's the 2nd term in the cycle (2,4,8,6)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r3", order: 3, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "POWEXP-09",
    question: "Which is larger: \\(5^{20}\\) or \\(25^{11}\\)?",
    options: [
      { text: "\\(25^{11}\\)", correct: true, feedback: "25^11 = (5^2)^11 = 5^22, which is larger than 5^20." },
      { text: "\\(5^{20}\\)", correct: false, feedback: "5^20 < 5^22.", misconceptionId: "E-r3-a" },
      { text: "Equal", correct: false, feedback: "They are not.", misconceptionId: "E-r3-b" },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined.", misconceptionId: "E-r3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student assumes the larger raw exponent (20) means the larger value, without rewriting 25¹¹ with base 5 to compare fairly.",
        rootCause: "Values Not Rewritten For Fair Comparison — compares the raw expressions without converting to a common base.",
        remediation: "Rewrite 25¹¹ with base 5: 25¹¹=(5²)¹¹=5²² — now both expressions share base 5, so compare exponents: 22>20, meaning 5²²>5²⁰, so 25¹¹ is larger, not 5²⁰."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student assumes the two expressions are equal without actually rewriting and comparing them.",
        rootCause: "Values Not Actually Compared — assumes equality instead of evaluating or rewriting the expressions.",
        remediation: "Rewrite with a common base: 5²⁰ stays as is, and 25¹¹=(5²)¹¹=5²² — since 20≠22, these are NOT equal; 5²²>5²⁰, so 25¹¹ is larger."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student assumes the comparison cannot be made without direct (full) calculation, missing that rewriting with a common base allows a comparison.",
        rootCause: "Available Reasoning Underused — treats a determinable comparison as impossible without full computation.",
        remediation: "The comparison CAN be made without computing the full values — rewrite 25¹¹ as 5²², then simply compare the exponents (20 vs 22) since both now share base 5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 25 as a power of 5", hint: "25 = 5²." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "25¹¹ = (5²)¹¹ = 5^(2×11)." },
      { level: 3, description: "Compare the exponents", hint: "Is 20 or 22 larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r4", order: 4, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-06",
    question: "How many factors does 36 have?",
    options: [
      { text: "9", correct: true, feedback: "36=2²×3² → (2+1)(2+1)=9." },
      { text: "6", correct: false, feedback: "That would be 2¹×3¹.", misconceptionId: "E-r4-a" },
      { text: "8", correct: false, feedback: "Not correct.", misconceptionId: "E-r4-b" },
      { text: "12", correct: false, feedback: "Not correct.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student uses the wrong exponents (treating 36 as 2¹×3¹) instead of the correct 2²×3², leading to an undercounted factor total.",
        rootCause: "Wrong Exponents Used — applies the formula with incorrect exponent values.",
        remediation: "36 is actually 2²×3² (NOT 2¹×3¹) — using the correct exponents: (2+1)(2+1)=9, not (1+1)(1+1)=4 or a similar undercounting giving 6."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student makes an arithmetic slip in the divisor-count formula, landing on 8 instead of the correct 9.",
        rootCause: "Computation Error — correct formula, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 36=2²×3², so (2+1)×(2+1)=3×3=9, not 8."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student makes an arithmetic slip in the divisor-count formula, landing on 12 instead of the correct 9.",
        rootCause: "Computation Error — correct formula, but the final multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 36=2²×3², so (2+1)×(2+1)=3×3=9, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of 36", hint: "36 = 2² × 3²." },
      { level: 2, description: "Add 1 to each exponent", hint: "2+1=3. 2+1=3." },
      { level: 3, description: "Multiply the results", hint: "3 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r5", order: 5, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTROOT-02",
    question: "Estimate \\(\\sqrt{2500 - 1}\\) to the nearest integer.",
    options: [
      { text: "50", correct: true, feedback: "√2499 is just under 50; 50²=2500, so nearest integer is 50." },
      { text: "49", correct: false, feedback: "49²=2401, further away.", misconceptionId: "E-r5-a" },
      { text: "51", correct: false, feedback: "51²=2601.", misconceptionId: "E-r5-b" },
      { text: "48", correct: false, feedback: "48²=2304, further away.", misconceptionId: "E-r5-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student rounds down to 49 without checking that 2499 is actually much closer to 50²=2500 than to 49²=2401.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 2499-2401=98 (distance to 49²), while 2500-2499=1 (distance to 50²) — 2499 is MUCH closer to 2500, so √2499≈50, not 49."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student rounds up to 51 without checking that 2499 is actually much closer to 50²=2500 than to 51²=2601.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 2601-2499=102 (distance to 51²), while 2500-2499=1 (distance to 50²) — 2499 is MUCH closer to 2500, so √2499≈50, not 51."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student picks a perfect square (2304) that's far too low, not close to the actual nearby perfect square.",
        rootCause: "Wrong Perfect Square Selected — doesn't identify the perfect square actually closest to the target number.",
        remediation: "48²=2304 is far below 2499 — the closest perfect square is 50²=2500, since 2499 is only 1 less than 2500 — √2499≈50, not 48."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise 2500 is a perfect square", hint: "50²=2500." },
      { level: 2, description: "Note how close 2499 is to 2500", hint: "2499 is only 1 less than the perfect square 2500." },
      { level: 3, description: "Determine the nearest integer square root", hint: "Since 2499 is extremely close to 2500, what does √2499 round to?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r6", order: 6, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    skillId: "PROOFPARITY-01",
    question: "Is it always true that \\((-n)^2 = n^2\\) for any integer n?",
    options: [
      { text: "Yes, always true", correct: true, feedback: "The square eliminates the sign." },
      { text: "No, only when n is positive", correct: false, feedback: "The square of a negative is also positive.", misconceptionId: "E-r6-a" },
      { text: "No, only when n is negative", correct: false, feedback: "The square of a positive is also positive.", misconceptionId: "E-r6-b" },
      { text: "No, it depends on n", correct: false, feedback: "It's always true.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student assumes the claim only holds when n is positive, not testing whether it also holds for negative n.",
        rootCause: "Case Analysis Incomplete — only verifies one case (n positive) instead of checking all cases (positive, negative, zero).",
        remediation: "Test with a NEGATIVE n too: if n=-3, (-n)²=(-(-3))²=3²=9, and n²=(-3)²=9 — they're EQUAL, just as with positive n — the claim holds for ALL integers, not just positive ones."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student assumes the claim only holds when n is negative, not testing whether it also holds for positive n.",
        rootCause: "Case Analysis Incomplete — only verifies one case (n negative) instead of checking all cases (positive, negative, zero).",
        remediation: "Test with a POSITIVE n too: if n=3, (-n)²=(-3)²=9, and n²=3²=9 — they're EQUAL, just as with negative n — the claim holds for ALL integers, not just negative ones."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student assumes the truth of the claim varies depending on n, without testing multiple values (positive, negative, zero) to see the pattern holds universally.",
        rootCause: "Claim Not Tested Across Multiple Cases — assumes variability without checking several representative values.",
        remediation: "Test SEVERAL values: n=3: (-3)²=9=3²; n=-3: (3)²=9=(-3)²; n=0: 0²=0=0² — the result is ALWAYS equal, it does NOT depend on which specific n you choose."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with a positive n", hint: "n=3: (-3)²=9, and 3²=9." },
      { level: 2, description: "Test with a negative n", hint: "n=-3: (-(-3))²=3²=9, and (-3)²=9." },
      { level: 3, description: "Generalise", hint: "Does squaring ever produce a different result depending on the sign of n?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "r7", order: 7, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQARITH-01",
    question: "A sequence starts 5, 8, 11, 14, … What is the 20th term?",
    options: [
      { text: "62", correct: true, feedback: "Arithmetic: 5 + 19×3 = 62." },
      { text: "65", correct: false, feedback: "5+19×3=62, not 65.", misconceptionId: "E-r7-a" },
      { text: "60", correct: false, feedback: "Off by 2.", misconceptionId: "E-r7-b" },
      { text: "59", correct: false, feedback: "5 + 18×3 = 59, off by one term.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student makes an arithmetic slip applying the arithmetic sequence formula, landing on 65 instead of the correct 62.",
        rootCause: "Computation Error — correct formula, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: first term=5, common difference=3, 20th term=5+(20-1)×3=5+19×3=5+57=62, not 65."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student makes an arithmetic slip in the final addition, landing on 60 instead of the correct 62.",
        rootCause: "Computation Error — correct formula, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: 5+19×3=5+57=62, not 60 (check your multiplication and addition)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student uses one fewer step than needed in the formula, computing 5+18×3=59 (the 19th term) instead of the 20th term.",
        rootCause: "Off-By-One in the Formula — uses (n-2) instead of (n-1) as the number of common differences applied.",
        remediation: "For the nth term of an arithmetic sequence, use (n-1) common differences, not (n-2) — for the 20TH term: 5+(20-1)×3=5+19×3=62, not 5+18×3=59 (which computes the 19th term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the first term and common difference", hint: "First term = 5; common difference = 3." },
      { level: 2, description: "Recall the arithmetic sequence formula", hint: "nth term = first term + (n-1) × common difference." },
      { level: 3, description: "Apply the formula for the 20th term", hint: "5 + (20-1) × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSF-BF.A.2"] },
  { itemId: "r8", order: 8, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "EXPSOLVE-01",
    question: "Solve for \\(x\\): \\((-3)^x = -27\\)",
    options: [
      { text: "3", correct: true, feedback: "(-3)³ = -27." },
      { text: "-3", correct: false, feedback: "(-3)^(-3) = -1/27.", misconceptionId: "E-r8-a" },
      { text: "2", correct: false, feedback: "(-3)² = 9.", misconceptionId: "E-r8-b" },
      { text: "9", correct: false, feedback: "(-3)^9 is a large negative, but not -27.", misconceptionId: "E-r8-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student assumes x should be negative to produce a negative result, not recognising that a POSITIVE odd exponent on a negative base already gives a negative result.",
        rootCause: "Sign of Result Confused With Sign of Exponent — assumes a negative result requires a negative exponent.",
        remediation: "The result is negative because the BASE is negative and the exponent is ODD, not because the exponent itself is negative — (-3)³=-27 uses x=3 (a POSITIVE, odd exponent), not x=-3 (which would give a fraction, -3^(-3)=-1/27, not -27)."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student picks x=2 without checking that (-3)²=9 (positive, since 2 is even), which doesn't match the target of -27.",
        rootCause: "Trial Exponent Not Verified — picks a value without checking whether it actually produces the target result.",
        remediation: "Test x=2: (-3)²=9, which is POSITIVE, not -27 — an EVEN exponent on a negative base gives a positive result; you need an ODD exponent: (-3)³=-27, so x=3."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student picks x=9 without verifying that (-3)⁹ is a much larger negative number, not equal to -27.",
        rootCause: "Trial Exponent Not Verified — picks a value without checking whether it actually produces the target result.",
        remediation: "Test x=9: (-3)⁹ is a large negative number (-19683), NOT -27 — the correct exponent is much smaller: (-3)³=-27, so x=3, not 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall that odd exponents preserve the negative sign", hint: "For (-3)^x to be negative, x must be odd." },
      { level: 2, description: "Test small odd exponents", hint: "(-3)¹=-3. (-3)³=?" },
      { level: 3, description: "Confirm which exponent gives -27", hint: "Does (-3)³ equal -27?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r9", order: 9, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTCYCLE-01",
    question: "What is the last digit of \\(6^{100}\\)?",
    options: [
      { text: "6", correct: true, feedback: "Any power of a number ending in 6 ends in 6." },
      { text: "0", correct: false, feedback: "Only numbers ending in 0.", misconceptionId: "E-r9-a" },
      { text: "2", correct: false, feedback: "No.", misconceptionId: "E-r9-b" },
      { text: "8", correct: false, feedback: "No.", misconceptionId: "E-r9-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student confuses the rule for numbers ending in 0 (which always end in 0 when raised to a power) with numbers ending in 6.",
        rootCause: "Last-Digit Rule Confused With a Different Digit — applies the rule for a different ending digit.",
        remediation: "Only numbers ENDING IN 0 always produce powers ending in 0 — numbers ending in 6 behave differently: 6×6=36 (ends in 6), and this pattern continues, so 6 raised to ANY power still ends in 6, not 0."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student assumes the last digit cycles through multiple values instead of recognising that 6 is a special case that stays constant.",
        rootCause: "Constant Last-Digit Pattern Not Recognised — assumes a longer cycle exists when the actual cycle length is 1.",
        remediation: "Check the pattern: 6¹=6, 6²=36(→6), 6³=216(→6) — the last digit STAYS 6 for every power, it doesn't cycle through other digits like 2."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student assumes the last digit cycles through multiple values instead of recognising that 6 is a special case that stays constant.",
        rootCause: "Constant Last-Digit Pattern Not Recognised — assumes a longer cycle exists when the actual cycle length is 1.",
        remediation: "Check the pattern: 6¹=6, 6²=36(→6), 6³=216(→6) — the last digit STAYS 6 for every power, it doesn't cycle through other digits like 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the last digit of the first few powers of 6", hint: "6¹=6, 6²=36, 6³=216 — what's the last digit each time?" },
      { level: 2, description: "Recognise the pattern", hint: "The last digit stays the same for every power of 6." },
      { level: 3, description: "Apply this to the 100th power", hint: "If the last digit never changes, what is it for 6¹⁰⁰?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r10", order: 10, cluster: "EXP", clusterName: CLUSTER_NAMES.EXP,
    skillId: "POWEXP-10",
    question: "Simplify \\(\\frac{2^5 \\times 4^3}{8^2}\\)",
    options: [
      { text: "32", correct: true, feedback: "Rewrite: 2^5 × (2^2)^3 = 2^5×2^6=2^11; 8^2=(2^3)^2=2^6; result 2^5=32." },
      { text: "64", correct: false, feedback: "2^6.", misconceptionId: "E-r10-a" },
      { text: "16", correct: false, feedback: "2^4.", misconceptionId: "E-r10-b" },
      { text: "8", correct: false, feedback: "2^3.", misconceptionId: "E-r10-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student makes an error rewriting one of the bases (4 or 8) as a power of 2, or miscombines the exponents, landing on 2⁶=64 instead of the correct 2⁵=32.",
        rootCause: "Base Conversion or Exponent Combination Error — one of the rewriting or combining steps is carried out incorrectly.",
        remediation: "Recompute carefully: 4³=(2²)³=2⁶, so numerator=2⁵×2⁶=2¹¹; 8²=(2³)²=2⁶ — dividing: 2¹¹÷2⁶=2⁵=32, not 2⁶=64."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student makes an error in the final exponent subtraction, landing on 2⁴=16 instead of the correct 2⁵=32.",
        rootCause: "Computation Error — the final subtraction of exponents (dividing powers with the same base) is carried out incorrectly.",
        remediation: "Recompute the final step: numerator exponent=11, denominator exponent=6, so 11-6=5, giving 2⁵=32, not 2⁴=16."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student makes an error in the final exponent subtraction, landing on 2³=8 instead of the correct 2⁵=32.",
        rootCause: "Computation Error — the final subtraction of exponents (dividing powers with the same base) is carried out incorrectly.",
        remediation: "Recompute the final step: numerator exponent=11, denominator exponent=6, so 11-6=5, giving 2⁵=32, not 2³=8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 4³ and 8² as powers of 2", hint: "4³=(2²)³=2⁶. 8²=(2³)²=2⁶." },
      { level: 2, description: "Combine the numerator", hint: "2⁵×2⁶=2^(5+6)=2¹¹." },
      { level: 3, description: "Divide by the denominator", hint: "2¹¹÷2⁶=2^(11-6)=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r11", order: 11, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-10",
    question: "Find the LCM of \\(2^2 \\times 3\\) and \\(2 \\times 3^2\\).",
    options: [
      { text: "36", correct: true, feedback: "LCM = 2^2 × 3^2 = 36." },
      { text: "12", correct: false, feedback: "That's 2^2×3.", misconceptionId: "E-r11-a" },
      { text: "18", correct: false, feedback: "2×3^2.", misconceptionId: "E-r11-b" },
      { text: "6", correct: false, feedback: "2×3.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student uses only the FIRST number's exponents (2²×3) instead of taking the HIGHEST power of each prime from BOTH numbers.",
        rootCause: "Only One Number's Exponents Used — doesn't compare exponents across both numbers to find the highest.",
        remediation: "For LCM, use the HIGHEST power of EACH prime found in EITHER number — comparing 2² (first) vs 2¹ (second), the highest is 2²; comparing 3¹ (first) vs 3² (second), the highest is 3² — LCM=2²×3²=36, not just the first number's form (2²×3=12)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student uses only the SECOND number's exponents (2×3²) instead of taking the HIGHEST power of each prime from BOTH numbers.",
        rootCause: "Only One Number's Exponents Used — doesn't compare exponents across both numbers to find the highest.",
        remediation: "For LCM, use the HIGHEST power of EACH prime found in EITHER number — comparing 2² (first) vs 2¹ (second), the highest is 2²; comparing 3¹ (first) vs 3² (second), the highest is 3² — LCM=2²×3²=36, not just the second number's form (2×3²=18)."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student uses the LOWEST power of each prime (as if computing the HCF) instead of the HIGHEST power (needed for the LCM).",
        rootCause: "HCF Method Confused With LCM Method — applies the HCF procedure (lowest powers) instead of the LCM procedure (highest powers).",
        remediation: "LCM requires the HIGHEST power of each prime (2²×3²=36), not the lowest shared power (2×3=6, which is actually the HCF)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the exponents of 2", hint: "2² vs 2¹ — the higher power is 2²." },
      { level: 2, description: "Compare the exponents of 3", hint: "3¹ vs 3² — the higher power is 3²." },
      { level: 3, description: "Multiply the highest powers", hint: "2² × 3² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r12", order: 12, cluster: "EST", clusterName: CLUSTER_NAMES.EST,
    skillId: "ESTCOMPARE-02",
    question: "Estimate the value of \\(\\sqrt{80} + \\sqrt{20}\\) to the nearest integer.",
    options: [
      { text: "13", correct: true, feedback: "√80≈8.94, √20≈4.47, sum≈13.4 → nearest 13." },
      { text: "12", correct: false, feedback: "Too low.", misconceptionId: "E-r12-a" },
      { text: "14", correct: false, feedback: "Too high.", misconceptionId: "E-r12-b" },
      { text: "10", correct: false, feedback: "Too low.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student underestimates one or both square roots, landing on a sum too low (12) instead of the correct estimate (13).",
        rootCause: "Root Approximation Too Low — underestimates one or both of the individual square root values.",
        remediation: "Recompute each approximation carefully: √80≈8.94 (not lower, since 9²=81 is very close to 80), √20≈4.47 (not lower, since 4.5²≈20.25 is close) — sum≈13.4, rounding to 13, not 12."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student overestimates one or both square roots, landing on a sum too high (14) instead of the correct estimate (13).",
        rootCause: "Root Approximation Too High — overestimates one or both of the individual square root values.",
        remediation: "Recompute each approximation carefully: √80≈8.94 (not higher, since 9²=81 is very close), √20≈4.47 (not higher, since 4.5²≈20.25 is close) — sum≈13.4, rounding to 13, not 14."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student significantly underestimates, perhaps confusing √80 with a much smaller value, landing on 10 instead of the correct 13.",
        rootCause: "Root Approximation Significantly Too Low — one of the square root approximations is far off from the actual value.",
        remediation: "√80 is close to 9 (since 9²=81, very close to 80), not a much smaller number — recompute: √80≈8.94, √20≈4.47, sum≈13.4, rounding to 13, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Approximate each square root", hint: "√80≈8.94 (since 9²=81, close to 80). √20≈4.47 (since 4.5²≈20.25, close to 20)." },
      { level: 2, description: "Add the two approximations", hint: "8.94 + 4.47 ≈ 13.4." },
      { level: 3, description: "Round to the nearest integer", hint: "Does 13.4 round to 13 or 14?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r13", order: 13, cluster: "PROOF", clusterName: CLUSTER_NAMES.PROOF,
    skillId: "PROOFPARITY-01",
    question: "Is the sum of two odd numbers always even?",
    options: [
      { text: "Yes", correct: true, feedback: "Odd + odd = even." },
      { text: "No", correct: false, feedback: "It is always even.", misconceptionId: "E-r13-a" },
      { text: "Only if the numbers are different", correct: false, feedback: "Same odd numbers also sum to even.", misconceptionId: "E-r13-b" },
      { text: "Only if the numbers are the same", correct: false, feedback: "Different odds also sum to even.", misconceptionId: "E-r13-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r13-a",
        description: "Student assumes the sum of two odd numbers isn't always even, without testing multiple pairs to verify the claim.",
        rootCause: "Claim Not Tested Across Multiple Cases — assumes the claim is false without checking any actual examples.",
        remediation: "Test several pairs: 3+5=8 (even), 7+9=16 (even), 1+1=2 (even) — the sum of TWO ODD numbers is ALWAYS even, regardless of which odd numbers you pick."
      },
      {
        misconceptionId: "E-r13-b",
        description: "Student assumes the claim only holds when the two odd numbers are different, not testing whether it also holds for two identical odd numbers.",
        rootCause: "Case Analysis Incomplete — only verifies one case (different numbers) instead of checking same-number pairs too.",
        remediation: "Test with the SAME odd number twice: 3+3=6 (even), 5+5=10 (even) — the claim holds even when the two odd numbers are identical, not just when they're different."
      },
      {
        misconceptionId: "E-r13-c",
        description: "Student assumes the claim only holds when the two odd numbers are the same, not testing whether it also holds for different odd numbers.",
        rootCause: "Case Analysis Incomplete — only verifies one case (same numbers) instead of checking different-number pairs too.",
        remediation: "Test with DIFFERENT odd numbers: 3+5=8 (even), 7+9=16 (even) — the claim holds even when the two odd numbers are different, not just when they're the same."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with two different odd numbers", hint: "3+5=8 (even)." },
      { level: 2, description: "Test with two identical odd numbers", hint: "3+3=6 (even)." },
      { level: 3, description: "Generalise", hint: "Does the sum of two odd numbers ever come out odd?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: [] },
  { itemId: "r14", order: 14, cluster: "SEQ", clusterName: CLUSTER_NAMES.SEQ,
    skillId: "SEQARITH-01",
    question: "A sequence begins 100, 97, 94, … What is the 15th term?",
    options: [
      { text: "58", correct: true, feedback: "100 + (15-1)×(-3) = 100 - 42 = 58." },
      { text: "55", correct: false, feedback: "100 - 45 = 55, off by 3.", misconceptionId: "E-r14-a" },
      { text: "61", correct: false, feedback: "100 - 39 = 61.", misconceptionId: "E-r14-b" },
      { text: "52", correct: false, feedback: "100 - 48 = 52, off by one term.", misconceptionId: "E-r14-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r14-a",
        description: "Student uses (n) instead of (n-1) common differences, computing 100-15×3=55 instead of the correct 100-14×3=58.",
        rootCause: "Off-By-One in the Formula — uses n instead of (n-1) as the number of common differences applied.",
        remediation: "For the nth term, use (n-1) common differences, not n — for the 15TH term: 100+(15-1)×(-3)=100-42=58, not 100+15×(-3)=100-45=55."
      },
      {
        misconceptionId: "E-r14-b",
        description: "Student uses (n-2) instead of (n-1) common differences, computing 100-13×3=61 instead of the correct 100-14×3=58.",
        rootCause: "Off-By-One in the Formula — uses (n-2) instead of (n-1) as the number of common differences applied.",
        remediation: "For the nth term, use (n-1) common differences, not (n-2) — for the 15TH term: 100+(15-1)×(-3)=100-42=58, not 100+13×(-3)=100-39=61."
      },
      {
        misconceptionId: "E-r14-c",
        description: "Student uses one extra common difference, computing the 16th term (52) instead of the requested 15th term (58).",
        rootCause: "Off-By-One Term Count — miscounts which term in the sequence is being asked for.",
        remediation: "For the 15TH term, use (15-1)=14 common differences: 100+14×(-3)=100-42=58 — using 16 differences (100+16×(-3)=100-48=52) would give the 17th term, not the 15th."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the first term and common difference", hint: "First term = 100; common difference = -3." },
      { level: 2, description: "Recall the arithmetic sequence formula", hint: "nth term = first term + (n-1) × common difference." },
      { level: 3, description: "Apply the formula for the 15th term", hint: "100 + (15-1) × (-3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.HSF-BF.A.2"] },
  { itemId: "r15", order: 15, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH,
    skillId: "POWEXP-03",
    question: "If \\(a = -2^2\\) and \\(b = (-2)^2\\), find \\(a + b\\).",
    options: [
      { text: "0", correct: true, feedback: "a = -4, b = 4, sum 0." },
      { text: "8", correct: false, feedback: "-4+4=0.", misconceptionId: "E-r15-a" },
      { text: "-8", correct: false, feedback: "Wrong.", misconceptionId: "E-r15-b" },
      { text: "4", correct: false, feedback: "Wrong.", misconceptionId: "E-r15-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r15-a",
        description: "Student adds the ABSOLUTE VALUES of a and b (4+4=8) instead of respecting the actual sign of a, which is negative.",
        rootCause: "Sign of a Dropped — treats a=-2² as if it were positive before adding.",
        remediation: "a=-2²=-4 is NEGATIVE (the negative sign applies AFTER squaring, since there are no parentheses around -2) — keep the sign when adding: -4+4=0, not 4+4=8 (which incorrectly treats -4 as +4)."
      },
      {
        misconceptionId: "E-r15-b",
        description: "Student assumes BOTH a and b are negative, not recognising that b=(-2)² has parentheses and is therefore positive.",
        rootCause: "Parentheses/Sign Scope Confused — doesn't distinguish that b's parentheses make it positive.",
        remediation: "b=(-2)² has PARENTHESES around -2, making it the base — (-2)×(-2)=4, which is POSITIVE — a=-2²=-4 is negative, so a+b=-4+4=0, not -4+(-4)=-8 (which incorrectly treats b as negative too)."
      },
      {
        misconceptionId: "E-r15-c",
        description: "Student assumes BOTH a and b are positive, not recognising that a=-2² (without parentheses) is negative.",
        rootCause: "Parentheses/Sign Scope Confused — doesn't distinguish that a lacks parentheses and is therefore negative.",
        remediation: "a=-2² has NO parentheses around -2, so the negative sign applies AFTER squaring: -(2²)=-4, which is NEGATIVE — b=(-2)²=4 is positive, so a+b=-4+4=0, not 4+4=8 (which incorrectly treats a as positive too, landing near 4 or a similar miscalculation)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate a carefully, noting no parentheses", hint: "a = -2² = -(2²) = -4." },
      { level: 2, description: "Evaluate b carefully, noting the parentheses", hint: "b = (-2)² = (-2)×(-2) = 4." },
      { level: 3, description: "Add the two results", hint: "-4 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r16", order: 16, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATTCYCLE-01",
    question: "What is the last digit of \\(9^{99}\\)?",
    options: [
      { text: "9", correct: true, feedback: "Cycle of last digit of powers of 9: 9,1,9,1,… odd exponent gives 9." },
      { text: "1", correct: false, feedback: "Even exponent gives 1.", misconceptionId: "E-r16-a" },
      { text: "0", correct: false, feedback: "No.", misconceptionId: "E-r16-b" },
      { text: "8", correct: false, feedback: "No.", misconceptionId: "E-r16-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r16-a",
        description: "Student uses the EVEN-exponent value (1) for this ODD exponent (99), mixing up which position in the 2-term cycle applies.",
        rootCause: "Cycle Position Not Correctly Computed — doesn't correctly determine whether the exponent is odd or even to select the right cycle position.",
        remediation: "The cycle (9,1) alternates based on ODD/EVEN exponent — 99 is ODD, so the last digit is 9 (the first cycle position, used for odd exponents), not 1 (which is used for EVEN exponents)."
      },
      {
        misconceptionId: "E-r16-b",
        description: "Student picks a digit (0) that doesn't appear anywhere in the actual last-digit cycle of powers of 9.",
        rootCause: "Cycle Values Not Actually Checked — picks a digit outside the established cycle.",
        remediation: "The last digit of powers of 9 only ever cycles between 9 and 1 (9¹=9, 9²=81→1, 9³=729→9, ...) — 0 never appears in this cycle; for the odd exponent 99, the last digit is 9."
      },
      {
        misconceptionId: "E-r16-c",
        description: "Student picks a digit (8) that doesn't appear anywhere in the actual last-digit cycle of powers of 9.",
        rootCause: "Cycle Values Not Actually Checked — picks a digit outside the established cycle.",
        remediation: "The last digit of powers of 9 only ever cycles between 9 and 1 (9¹=9, 9²=81→1, 9³=729→9, ...) — 8 never appears in this cycle; for the odd exponent 99, the last digit is 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cycle of last digits for powers of 9", hint: "9¹=9, 9²=81(→1), 9³=729(→9), 9⁴=6561(→1) — cycle of length 2." },
      { level: 2, description: "Determine whether the exponent is odd or even", hint: "99 is odd." },
      { level: 3, description: "Apply the pattern", hint: "Odd exponents give which digit — 9 or 1?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] }
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

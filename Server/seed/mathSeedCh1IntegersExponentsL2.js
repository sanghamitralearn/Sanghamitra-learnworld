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
    skillId: "INTADD-03",
    question: "Evaluate: \\(-5 + (-3) - (-2)\\)",
    options: [
      { text: "-6", correct: true, feedback: "Correct. -5-3+2 = -6." },
      { text: "0", correct: false, feedback: "You added all numbers as positive.", misconceptionId: "E-w1-a" },
      { text: "-4", correct: false, feedback: "Check the signs carefully.", misconceptionId: "E-w1-b" },
      { text: "6", correct: false, feedback: "You changed all signs to positive.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "Subtracting a negative is adding a positive.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student drops all the negative signs and adds the magnitudes as if every term were positive (5+3+2=10, or a similar slip leading to 0).",
        rootCause: "Signs Ignored Entirely — treats every number as positive regardless of its actual sign.",
        remediation: "Track each sign carefully: -5+(-3)-(-2) = -5-3+2 = -6, not treating every number as positive."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student makes a sign-tracking slip on one term, landing on -4 instead of the correct -6.",
        rootCause: "Computation Error — one sign or step is mishandled during the calculation.",
        remediation: "Recompute step by step: -5+(-3)=-8, then -8-(-2)=-8+2=-6, not -4."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student flips every sign to positive, computing 5+3+2=10 or a related variant that lands on 6.",
        rootCause: "Signs Flipped Entirely — treats every operation and number as positive.",
        remediation: "Keep the actual signs: -5+(-3)-(-2) = -5-3+2 = -6, not 5+3-2=6 (which flips every sign to positive)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the first two terms", hint: "-5 + (-3) = -8." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-2) becomes +2." },
      { level: 3, description: "Complete the calculation", hint: "-8 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "w2", order: 2, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-01",
    question: "\\((-2) \\times 3 \\times (-1) \\times (-2) =\\)",
    options: [
      { text: "-12", correct: true, feedback: "Correct. Three negatives give a negative product." },
      { text: "12", correct: false, feedback: "You counted the negatives incorrectly.", misconceptionId: "E-w2-a" },
      { text: "-8", correct: false, feedback: "You multiplied incorrectly.", misconceptionId: "E-w2-b" },
      { text: "8", correct: false, feedback: "You dropped all negatives.", misconceptionId: "E-w2-c" }
    ],
    retryHint: "Count the negative signs: three → odd → negative.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student miscounts the number of negative factors (three: -2, -1, -2), assuming an even count and reporting a positive result.",
        rootCause: "Sign Rule Miscounted — doesn't correctly track whether the number of negative factors is odd or even.",
        remediation: "Count the negative factors: -2, -1, and -2 — that's THREE negatives (odd), so the product is NEGATIVE — the correct answer is -12, not 12."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student makes an arithmetic slip while multiplying the four factors, landing on -8 instead of the correct -12.",
        rootCause: "Computation Error — correct sign, but the magnitude is computed incorrectly.",
        remediation: "Recompute the magnitude carefully: 2×3×1×2=12, then apply the negative sign (three negatives, odd): -12, not -8."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student ignores all the negative signs and multiplies only the magnitudes, reporting a positive result.",
        rootCause: "Signs Ignored Entirely — treats every factor as positive regardless of its actual sign.",
        remediation: "You must account for EVERY negative sign — 2×3×1×2=12 (magnitude only), but three of the four factors are negative (odd count), so the actual product is -12, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the negative factors", hint: "-2, -1, and -2 are negative — that's three (odd)." },
      { level: 2, description: "Determine the overall sign", hint: "An odd number of negative factors gives a negative product." },
      { level: 3, description: "Compute the magnitude and apply the sign", hint: "2×3×1×2 = 12, then make it negative." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "w3", order: 3, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-04",
    question: "Which is larger: \\(2^5\\) or \\(3^3\\)?",
    options: [
      { text: "2⁵", correct: true, feedback: "Correct. 2⁵=32, 3³=27." },
      { text: "3³", correct: false, feedback: "27 < 32.", misconceptionId: "E-w3-a" },
      { text: "They are equal", correct: false, feedback: "They are not equal.", misconceptionId: "E-w3-b" }
    ],
    retryHint: "Calculate both: 2×2×2×2×2 = 32, 3×3×3 = 27.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student assumes the larger BASE (3 vs 2) means the larger power, without actually computing both values.",
        rootCause: "Values Not Actually Computed — compares bases or exponents directly instead of evaluating each expression.",
        remediation: "Actually COMPUTE both values before comparing: 2⁵=2×2×2×2×2=32, and 3³=3×3×3=27 — 32>27, so 2⁵ is larger, even though 3 is the larger base."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student assumes the two expressions are equal without actually computing and comparing their values.",
        rootCause: "Values Not Actually Compared — assumes equality instead of evaluating both expressions.",
        remediation: "Actually compute: 2⁵=32 and 3³=27, which are NOT equal (32≠27)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute 2⁵", hint: "2×2×2×2×2 = 32." },
      { level: 2, description: "Compute 3³", hint: "3×3×3 = 27." },
      { level: 3, description: "Compare", hint: "Is 32 or 27 larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w4", order: 4, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ROOT-06",
    question: "\\(\\sqrt{144} - \\sqrt{36} =\\)",
    options: [
      { text: "6", correct: true, feedback: "Correct. 12 - 6 = 6." },
      { text: "18", correct: false, feedback: "You added the roots.", misconceptionId: "E-w4-a" },
      { text: "-6", correct: false, feedback: "You subtracted 36 from 144.", misconceptionId: "E-w4-b" },
      { text: "108", correct: false, feedback: "You multiplied the roots.", misconceptionId: "E-w4-c" }
    ],
    retryHint: "√144 = 12, √36 = 6.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student adds the two square roots instead of subtracting, applying the wrong operation.",
        rootCause: "Operation Reversed — adds when the expression specifies subtraction.",
        remediation: "The expression says √144 MINUS √36, not plus — 12-6=6, not 12+6=18."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student subtracts the numbers UNDER the radicals (144-36=108, or in this case takes the wrong step) before taking roots, instead of taking each square root first.",
        rootCause: "Root Applied After Combining Instead Of Before — subtracts inside the radicals as if they were a single expression instead of evaluating each root separately.",
        remediation: "Each square root must be evaluated SEPARATELY first (√144=12, √36=6), THEN subtracted (12-6=6) — don't subtract the numbers under the radicals (144-36=108) before taking any roots."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student multiplies the two square roots instead of subtracting, applying the wrong operation.",
        rootCause: "Operation Confused — multiplies when the expression specifies subtraction.",
        remediation: "The expression says √144 MINUS √36, not times — 12-6=6, not 12×6=72 (or a related miscalculation like 108)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each square root separately", hint: "√144=12. √36=6." },
      { level: 2, description: "Identify the operation to apply", hint: "Subtract the second root from the first." },
      { level: 3, description: "Compute", hint: "12 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "w5", order: 5, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-04",
    question: "Insert brackets to make \\(12 \\div 2 + 4 \\times 3 = 6\\) true.",
    options: [
      { text: "12 ÷ (2 + 4) × 3", correct: true, feedback: "Correct. 12 ÷ 6 × 3 = 6." },
      { text: "(12 ÷ 2) + 4 × 3", correct: false, feedback: "That gives 6+12=18.", misconceptionId: "E-w5-a" },
      { text: "12 ÷ 2 + (4 × 3)", correct: false, feedback: "That's 6+12=18.", misconceptionId: "E-w5-b" },
      { text: "(12 ÷ 2 + 4) × 3", correct: false, feedback: "(6+4)×3=30.", misconceptionId: "E-w5-c" }
    ],
    retryHint: "Try making the denominator 6.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student adds brackets around a part of the expression that doesn't actually change the standard order of operations, so the result stays at 18 instead of 6.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (12÷2) don't change anything, since division already happens before addition by default — you need brackets that FORCE a different grouping, like (2+4), which changes the value from 18 to 6."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student adds brackets around a part of the expression that doesn't actually change the standard order of operations, so the result stays at 18 instead of 6.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (4×3) don't change anything, since multiplication already happens before addition by default — you need brackets that FORCE a different grouping, like (2+4), which changes the value from 18 to 6."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student groups three terms together instead of the correct two, producing a different (and wrong) result of 30.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually produce the target value.",
        remediation: "Test the result: (12÷2+4)×3=(6+4)×3=30, not 6 — try grouping just the 2 and 4 together instead: 12÷(2+4)×3=12÷6×3=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original expression without brackets", hint: "12÷2+4×3 = 6+12 = 18 (not the target)." },
      { level: 2, description: "Try grouping 2 and 4 together", hint: "12÷(2+4)×3 = 12÷6×3." },
      { level: 3, description: "Compute", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w6", order: 6, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-01",
    question: "Write the prime factorisation of 100 using indices.",
    options: [
      { text: "2² × 5²", correct: true, feedback: "Correct." },
      { text: "2 × 2 × 5 × 5", correct: false, feedback: "This is correct but should use index notation.", misconceptionId: "E-w6-a" },
      { text: "10²", correct: false, feedback: "10 is not prime.", misconceptionId: "E-w6-b" },
      { text: "2⁵ × 5", correct: false, feedback: "2⁵=32, not a factor of 100.", misconceptionId: "E-w6-c" }
    ],
    retryHint: "100 = 2×50 = 2×2×25 = 2²×5².",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student writes out the correct prime factors but doesn't convert repeated factors into index (exponent) notation as the question requests.",
        rootCause: "Index Notation Not Applied — leaves the factorisation in expanded form instead of using exponents.",
        remediation: "The question specifically asks for INDEX notation — rewrite repeated factors using exponents: 2×2×5×5 becomes 2²×5², not left in expanded form."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student writes 10² instead of breaking 10 down further, not recognising that 10 itself is not prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "10 is NOT prime (10=2×5) — you must break it down further: 100=10×10=(2×5)×(2×5)=2²×5², not 10²."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student writes an expression using the wrong exponent for 2, giving 2⁵×5=160, which doesn't equal 100.",
        rootCause: "Exponent Miscounted — uses an incorrect power for one of the prime factors.",
        remediation: "Check by dividing: 100÷2=50, 50÷2=25 — that's only TWO factors of 2 (2²), not five — 100=2²×5²=4×25=100, not 2⁵×5=32×5=160."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide by 2 repeatedly", hint: "100÷2=50, 50÷2=25 — two factors of 2." },
      { level: 2, description: "Continue with the next prime", hint: "25÷5=5, 5÷5=1 — two factors of 5." },
      { level: 3, description: "Write using index notation", hint: "2×2×5×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w7", order: 7, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTROUND-02",
    question: "Estimate \\(\\frac{98 + 103}{5.1}\\) to the nearest integer.",
    options: [
      { text: "40", correct: true, feedback: "Correct. (100+100)/5 = 200/5 = 40." },
      { text: "20", correct: false, feedback: "You halved the answer.", misconceptionId: "E-w7-a" },
      { text: "80", correct: false, feedback: "You doubled the answer.", misconceptionId: "E-w7-b" },
      { text: "100", correct: false, feedback: "You only added the numerators.", misconceptionId: "E-w7-c" }
    ],
    retryHint: "Round 98→100, 103→100, 5.1→5.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student makes an error in the division step, perhaps dividing by 10 instead of 5, landing on half the correct estimate.",
        rootCause: "Computation Error — the rounded division is carried out incorrectly.",
        remediation: "Recompute: (100+100)÷5=200÷5=40, not 20 (check you're dividing by the rounded denominator, 5, not something larger)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student makes an error in the division step, perhaps multiplying somewhere instead of dividing, landing on double the correct estimate.",
        rootCause: "Computation Error — the rounded division is carried out incorrectly.",
        remediation: "Recompute: (100+100)÷5=200÷5=40, not 80 (check your division, not a doubling)."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student adds the two rounded numerators (100+100=200, reported incompletely as 100) or otherwise forgets to divide by the denominator entirely.",
        rootCause: "Division Step Omitted — stops after computing the numerator, without dividing by the denominator.",
        remediation: "The expression is a FRACTION — after adding the numerator (98+103≈200), you must ALSO divide by the denominator (≈5): 200÷5=40, not just the numerator sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to a convenient value", hint: "98≈100, 103≈100, 5.1≈5." },
      { level: 2, description: "Add the rounded numerator values", hint: "100 + 100 = 200." },
      { level: 3, description: "Divide by the rounded denominator", hint: "200 ÷ 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "w8", order: 8, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-08",
    question: "If \\(a = -2\\), evaluate \\(3a^2 - 2a\\).",
    options: [
      { text: "16", correct: true, feedback: "Correct. 3×4 + 4 = 16." },
      { text: "-16", correct: false, feedback: "You squared -2 as -4.", misconceptionId: "E-w8-a" },
      { text: "8", correct: false, feedback: "You did 3×4 - 2×(-2) incorrectly.", misconceptionId: "E-w8-b" },
      { text: "-8", correct: false, feedback: "Sign errors.", misconceptionId: "E-w8-c" }
    ],
    retryHint: "a² = 4; -2a = +4.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student computes (-2)² as -4 instead of the correct +4, dropping the fact that squaring a negative gives a positive result.",
        rootCause: "Even Exponent Sign Error — incorrectly keeps a negative sign on an even power of a negative number.",
        remediation: "a² means a MULTIPLIED BY ITSELF, and a negative times a negative is POSITIVE: (-2)×(-2)=4, not -4 — this changes the whole computation from -16 to 16."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student mishandles the -2a term's sign when a is negative, computing -2×(-2) incorrectly and arriving at 8 instead of 16.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the sign when substituting a negative value into -2a.",
        remediation: "Compute -2a carefully with a=-2: -2×(-2)=4 (POSITIVE, since two negatives make a positive) — the full expression is 3(4)-2(-2)=12+4=16, not 12-4=8."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student makes multiple sign errors across both terms, landing on -8 instead of the correct 16.",
        rootCause: "Sign Error In Substitution — doesn't correctly track signs when substituting a negative value into both terms.",
        remediation: "Substitute carefully: a²=(-2)²=4 (positive), and -2a=-2×(-2)=4 (positive) — so 3(4)+4=16, not -8 (which comes from treating both terms as negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute a²", hint: "(-2)² = 4 (a negative squared is positive)." },
      { level: 2, description: "Compute -2a", hint: "-2 × (-2) = 4 (also positive)." },
      { level: 3, description: "Combine using the expression", hint: "3(4) + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w9", order: 9, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-02",
    question: "Find the HCF of 18 and 24.",
    options: [
      { text: "6", correct: true, feedback: "Correct. 18=2×3², 24=2³×3; HCF=2×3=6." },
      { text: "12", correct: false, feedback: "12 is not a factor of 18.", misconceptionId: "E-w9-a" },
      { text: "3", correct: false, feedback: "3 is a common factor, but not the highest.", misconceptionId: "E-w9-b" },
      { text: "72", correct: false, feedback: "That's the LCM.", misconceptionId: "E-w9-c" }
    ],
    retryHint: "List factors: 18 (1,2,3,6,9,18); 24 (1,2,3,4,6,8,12,24); highest common is 6.",
    misconceptions: [
      {
        misconceptionId: "E-w9-a",
        description: "Student reports a factor of 24 (12) without checking that it also divides 18, which it doesn't.",
        rootCause: "Common Factor Not Verified — doesn't check that the chosen value actually divides BOTH numbers.",
        remediation: "Check that your answer divides BOTH numbers — 12 divides 24 but does NOT divide 18 (18÷12 isn't a whole number) — the actual HCF is 6, which divides both 18 and 24."
      },
      {
        misconceptionId: "E-w9-b",
        description: "Student identifies a common factor (3) but doesn't check whether a LARGER common factor also exists.",
        rootCause: "Not the Highest Common Factor — finds A common factor but not the HIGHEST one.",
        remediation: "3 IS a common factor, but it's not the HIGHEST — 6 is also common to both 18 and 24 (18÷6=3, 24÷6=4) and is larger than 3, so HCF=6, not 3."
      },
      {
        misconceptionId: "E-w9-c",
        description: "Student computes the LCM (72) instead of the HCF, confusing the two related concepts.",
        rootCause: "HCF Method Confused With LCM Method — computes the wrong one of the two related quantities.",
        remediation: "72 is the LCM (lowest common MULTIPLE) of 18 and 24, not the HCF (highest common FACTOR) — the HCF is 6, using the lowest shared powers of common primes: 2×3=6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "18=2×3². 24=2³×3." },
      { level: 2, description: "Identify the common prime factors", hint: "Both share 2 and 3." },
      { level: 3, description: "Use the lowest shared power of each common prime", hint: "Lowest power of 2 shared: 2¹. Lowest power of 3 shared: 3¹. Multiply: 2×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w10", order: 10, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-03",
    question: "Find the LCM of 6 and 8.",
    options: [
      { text: "24", correct: true, feedback: "Correct. 6=2×3, 8=2³; LCM=2³×3=24." },
      { text: "48", correct: false, feedback: "You multiplied them directly.", misconceptionId: "E-w10-a" },
      { text: "12", correct: false, feedback: "12 is a multiple of 6 but not 8.", misconceptionId: "E-w10-b" },
      { text: "2", correct: false, feedback: "That's the HCF.", misconceptionId: "E-w10-c" }
    ],
    retryHint: "Multiples of 8: 8,16,24,… which is also a multiple of 6.",
    misconceptions: [
      {
        misconceptionId: "E-w10-a",
        description: "Student multiplies the two original numbers together (6×8=48) instead of using prime factorisation to find the actual LCM.",
        rootCause: "LCM Approximated as Product of the Two Numbers — assumes the LCM is always the product of the numbers, ignoring shared factors.",
        remediation: "The LCM is NOT simply the product of the two numbers — since 6 and 8 share a common factor (2), the actual LCM (24) is smaller than their product (48); use prime factorisation: 2³×3=24, not 48."
      },
      {
        misconceptionId: "E-w10-b",
        description: "Student reports a multiple of one number (12, a multiple of 6) without checking that it's also a multiple of the other (8).",
        rootCause: "Common Multiple Not Verified — doesn't check that the chosen value is actually a multiple of BOTH numbers.",
        remediation: "Check that your answer is a multiple of BOTH numbers — 12 is a multiple of 6 but NOT of 8 (8 doesn't divide 12 evenly) — the actual LCM is 24, which IS a multiple of both 6 and 8."
      },
      {
        misconceptionId: "E-w10-c",
        description: "Student computes the HCF (2) instead of the LCM, confusing the two related concepts.",
        rootCause: "HCF Method Confused With LCM Method — computes the wrong one of the two related quantities.",
        remediation: "2 is the HCF (highest common FACTOR) of 6 and 8, not the LCM (lowest common MULTIPLE) — the LCM is 24, using the highest power of every prime: 2³×3=24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "6=2×3. 8=2³." },
      { level: 2, description: "Identify every prime that appears in either number", hint: "The primes involved are 2 and 3." },
      { level: 3, description: "Use the highest power of each prime", hint: "Highest power of 2: 2³. Highest power of 3: 3¹. Multiply: 2³×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-09",
    question: "Find the missing digit: \\(-1\\square + 7 - (-4) = -1\\).",
    options: [
      { text: "2", correct: true, feedback: "Correct. -12+7+4 = -1." },
      { text: "3", correct: false, feedback: "-13+11 = -2.", misconceptionId: "E-d1-a" },
      { text: "5", correct: false, feedback: "-15+11 = -4.", misconceptionId: "E-d1-b" },
      { text: "0", correct: false, feedback: "-10+11 = 1.", misconceptionId: "E-d1-c" }
    ],
    backward: "Work backwards through the operations.",
    forward: "This is the first step towards solving algebraic equations.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student tries a digit that's close but doesn't verify the result actually equals -1, landing on -13 (giving -2, not -1).",
        rootCause: "Trial Digit Not Verified — picks a candidate without checking it satisfies the full equation.",
        remediation: "Test the digit by computing the FULL equation: with digit 3, -13+7+4=-2, not -1 — the correct digit is 2, since -12+7+4=-1."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student tries a digit without verifying the result, landing on -15 (giving -4, not -1).",
        rootCause: "Trial Digit Not Verified — picks a candidate without checking it satisfies the full equation.",
        remediation: "Test the digit by computing the FULL equation: with digit 5, -15+7+4=-4, not -1 — the correct digit is 2, since -12+7+4=-1."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student tries a digit without verifying the result, landing on -10 (giving 1, not -1).",
        rootCause: "Trial Digit Not Verified — picks a candidate without checking it satisfies the full equation.",
        remediation: "Test the digit by computing the FULL equation: with digit 0, -10+7+4=1, not -1 — the correct digit is 2, since -12+7+4=-1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify the known parts of the equation", hint: "7 - (-4) = 7 + 4 = 11." },
      { level: 2, description: "Set up the simplified equation", hint: "-1□ + 11 = -1." },
      { level: 3, description: "Solve for the missing digit", hint: "-1□ must equal -12 — what digit makes that true?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d2", order: 2, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-04",
    question: "What is the sign of \\((-1) \\times 2 \\times (-3) \\times 4 \\times (-5) \\times \\dots \\times (-99) \\times 100\\)?",
    options: [
      { text: "Positive", correct: true, feedback: "Correct. There are 50 negative terms (odd numbers), an even count → positive." },
      { text: "Negative", correct: false, feedback: "50 negatives is an even number, so the product is positive.", misconceptionId: "E-d2-a" },
      { text: "Zero", correct: false, feedback: "None of the factors are zero.", misconceptionId: "E-d2-b" },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined by the parity of the negative count.", misconceptionId: "E-d2-c" }
    ],
    backward: "Counting negative terms in a product chain.",
    forward: "Parity arguments are used in many areas of mathematics.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student assumes a large or long product with many negative terms is automatically negative, without actually counting whether the total is odd or even.",
        rootCause: "Negative Count Not Actually Determined — assumes a sign without counting the negative terms.",
        remediation: "COUNT the negative terms: the negative factors are the odd numbers 1,3,5,...,99 — that's 50 terms, an EVEN count, so the product is POSITIVE, not negative."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student assumes a long product chain must include a zero factor somewhere, without checking the actual list of factors.",
        rootCause: "Zero Factor Assumed Without Verification — assumes zero is present without confirming it from the given sequence.",
        remediation: "Check the actual factors in the sequence: they are 1,2,3,4,...,99,100 with alternating signs — NONE of these are zero, so the product cannot be zero."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student assumes the sign of such a long, complex product cannot be determined without full calculation.",
        rootCause: "Available Reasoning Underused — treats a determinable sign as impossible to find without complete multiplication.",
        remediation: "The sign CAN be determined by counting negative factors: there are 50 negative terms (the odd numbers 1 through 99), an EVEN count, so the product is POSITIVE — you don't need to compute the actual value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which factors are negative", hint: "The odd-numbered terms (-1, -3, -5, ..., -99) are negative." },
      { level: 2, description: "Count how many negative factors there are", hint: "The odd numbers from 1 to 99 total 50 terms." },
      { level: 3, description: "Determine the sign from the count", hint: "Is 50 an odd or even count? What sign results?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d3", order: 3, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-08",
    question: "Which of the following equals \\(8^2\\)?",
    options: [
      { text: "2⁶", correct: true, feedback: "Correct. 8=2³, so 8²=(2³)²=2⁶=64." },
      { text: "4⁴", correct: false, feedback: "4⁴=256.", misconceptionId: "E-d3-a" },
      { text: "(-8)³", correct: false, feedback: "-512.", misconceptionId: "E-d3-b" },
      { text: "2³ × 4", correct: false, feedback: "8×4=32.", misconceptionId: "E-d3-c" }
    ],
    backward: "Rewriting powers with a common base.",
    forward: "This skill is essential for exponent rules in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student picks an expression (4⁴=256) that doesn't actually equal 8²=64, without verifying the computed value.",
        rootCause: "Value Not Verified — selects an option without checking whether it actually equals the target.",
        remediation: "Actually compute: 4⁴=4×4×4×4=256, which does NOT equal 8²=64 — the correct match is 2⁶=64 (since 8=2³, so 8²=(2³)²=2⁶)."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student picks an expression ((-8)³=-512) that doesn't actually equal 8²=64, without verifying the computed value.",
        rootCause: "Value Not Verified — selects an option without checking whether it actually equals the target.",
        remediation: "Actually compute: (-8)³=-8×-8×-8=-512, which does NOT equal 8²=64 (it's negative, and 8² is positive) — the correct match is 2⁶=64."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student picks an expression (2³×4=32) that doesn't actually equal 8²=64, without verifying the computed value.",
        rootCause: "Value Not Verified — selects an option without checking whether it actually equals the target.",
        remediation: "Actually compute: 2³×4=8×4=32, which does NOT equal 8²=64 — the correct match is 2⁶=64 (since 8=2³, so 8²=(2³)²=2⁶)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 8 as a power of 2", hint: "8 = 2³." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "8² = (2³)² = 2^(3×2)." },
      { level: 3, description: "Confirm the new exponent", hint: "3 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d4", order: 4, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ESTROOT-01",
    question: "Between which two consecutive integers does \\(\\sqrt{200}\\) lie?",
    options: [
      { text: "14 and 15", correct: true, feedback: "Correct. 14²=196, 15²=225." },
      { text: "13 and 14", correct: false, feedback: "13²=169, too low.", misconceptionId: "E-d4-a" },
      { text: "15 and 16", correct: false, feedback: "15²=225, already above 200.", misconceptionId: "E-d4-b" },
      { text: "10 and 20", correct: false, feedback: "Too wide; the question asks for consecutive integers.", misconceptionId: "E-d4-c" }
    ],
    backward: "Use perfect squares to bound the root.",
    forward: "Estimating irrationals is important in geometry and measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student picks a lower pair of consecutive integers (13 and 14) whose squares (169 and 196) don't actually bracket 200.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 200 falls between the squares of its endpoints.",
        remediation: "Check: 13²=169 and 14²=196 — 200 is NOT between 169 and 196 (200>196) — instead check 14²=196 and 15²=225: 200 IS between 196 and 225, so √200 is between 14 and 15."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student picks an upper pair of consecutive integers (15 and 16) whose squares (225 and 256) don't actually bracket 200.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 200 falls between the squares of its endpoints.",
        remediation: "Check: 15²=225 and 16²=256 — 200 is NOT between 225 and 256 (200<225) — instead check 14²=196 and 15²=225: 200 IS between 196 and 225, so √200 is between 14 and 15."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student gives a technically-true but overly wide interval (10 and 20) instead of the specific consecutive integers requested.",
        rootCause: "Interval Not Narrowed to Consecutive Integers — doesn't tighten the bound to adjacent whole numbers as asked.",
        remediation: "The question asks for CONSECUTIVE integers (numbers next to each other, like 14 and 15), not just any wide range — narrow down to 14²=196 and 15²=225, which tightly bracket 200."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate roughly where √200 falls", hint: "200 is close to 196, which is a perfect square." },
      { level: 2, description: "Check the perfect squares nearby", hint: "14²=196, 15²=225." },
      { level: 3, description: "Confirm which pair brackets 200", hint: "Is 200 between 196 and 225?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d5", order: 5, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-04",
    question: "Insert one pair of brackets to make \\(6 + 4 \\times 3 - 2 = 28\\) true.",
    options: [
      { text: "(6 + 4) × 3 - 2", correct: true, feedback: "Correct. 10×3-2=28." },
      { text: "6 + 4 × (3 - 2)", correct: false, feedback: "6+4×1=10.", misconceptionId: "E-d5-a" },
      { text: "(6 + 4 × 3) - 2", correct: false, feedback: "(6+12)-2=16.", misconceptionId: "E-d5-b" },
      { text: "6 + (4 × 3 - 2)", correct: false, feedback: "6+10=16.", misconceptionId: "E-d5-c" }
    ],
    backward: "Brackets change the order of operations.",
    forward: "This skill is vital for writing correct formulas.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student places brackets around a grouping that produces a much smaller result (10) instead of the target 28.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually produce the target value.",
        remediation: "Test the result: 6+4×(3-2)=6+4×1=10, not 28 — try grouping the 6 and 4 together instead: (6+4)×3-2=10×3-2=28."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student groups a part of the expression that doesn't actually change the standard order of operations, so the result stays at 16 instead of 28.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (6+4×3) don't force a new order (multiplication still happens first inside), giving 16 — try grouping just the 6 and 4 together: (6+4)×3-2=28."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student groups a part of the expression that doesn't actually change the standard order of operations, so the result stays at 16 instead of 28.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (4×3-2) don't change the standard order much, giving 16 — try grouping just the 6 and 4 together: (6+4)×3-2=28."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original expression without brackets", hint: "6+4×3-2 = 6+12-2 = 16 (not the target)." },
      { level: 2, description: "Try grouping 6 and 4 together", hint: "(6+4)×3-2 = 10×3-2." },
      { level: 3, description: "Compute", hint: "10×3=30, then 30-2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d6", order: 6, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-05",
    question: "How many distinct prime factors does 210 have?",
    options: [
      { text: "4", correct: true, feedback: "Correct. 210 = 2×3×5×7 → four distinct primes." },
      { text: "3", correct: false, feedback: "You missed one prime factor.", misconceptionId: "E-d6-a" },
      { text: "5", correct: false, feedback: "There aren't five distinct primes.", misconceptionId: "E-d6-b" },
      { text: "6", correct: false, feedback: "Too many.", misconceptionId: "E-d6-c" }
    ],
    backward: "Prime factorisation of a number into distinct primes.",
    forward: "This is used in cryptography and number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student stops the prime factorisation too early, missing one of the four distinct primes (2, 3, 5, or 7).",
        rootCause: "Factorisation Incomplete — stops dividing before fully breaking the number into all its prime factors.",
        remediation: "Fully divide out: 210÷2=105, 105÷3=35, 35÷5=7, 7÷7=1 — that's FOUR distinct primes (2, 3, 5, 7), not three."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student overcounts, perhaps counting a prime factor twice or including a non-prime, landing on 5 instead of the correct 4.",
        rootCause: "Count Includes a Non-Distinct or Non-Prime Factor — miscounts by including an extra or repeated factor.",
        remediation: "210=2×3×5×7 has exactly FOUR distinct primes — double check you haven't counted any prime twice or included a non-prime number."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student significantly overcounts the distinct prime factors, landing on 6 instead of the correct 4.",
        rootCause: "Count Includes a Non-Distinct or Non-Prime Factor — miscounts by including extra or repeated factors.",
        remediation: "List the actual prime factorisation: 210=2×3×5×7 — that's exactly FOUR distinct primes, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide by the smallest primes in turn", hint: "210÷2=105. 105÷3=35." },
      { level: 2, description: "Continue dividing", hint: "35÷5=7. 7÷7=1." },
      { level: 3, description: "Count the distinct primes used", hint: "2, 3, 5, 7 — how many distinct primes is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d7", order: 7, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTROOT-04",
    question: "Estimate \\(\\sqrt{99 \\times 101}\\) to the nearest integer.",
    options: [
      { text: "100", correct: true, feedback: "Correct. 99×101≈100×100=10000, √10000=100." },
      { text: "99", correct: false, feedback: "The product is near 10000, not 99².", misconceptionId: "E-d7-a" },
      { text: "101", correct: false, feedback: "The product is slightly less than 10000.", misconceptionId: "E-d7-b" },
      { text: "1000", correct: false, feedback: "√10000 is 100, not 1000.", misconceptionId: "E-d7-c" }
    ],
    backward: "Rounding to simplify before taking a square root.",
    forward: "Estimation helps check the reasonableness of answers.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student picks one of the two original factors (99) instead of computing the actual estimated square root of their product.",
        rootCause: "Factor Reported Instead of Root Computed — confuses one of the multiplicands with the answer to the square root question.",
        remediation: "99 is just ONE of the numbers being multiplied — round both (99≈100, 101≈100), multiply (100×100=10000), THEN take the square root: √10000=100, not just 99."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student picks the other original factor (101) instead of computing the actual estimated square root of their product.",
        rootCause: "Factor Reported Instead of Root Computed — confuses one of the multiplicands with the answer to the square root question.",
        remediation: "101 is just ONE of the numbers being multiplied — round both (99≈100, 101≈100), multiply (100×100=10000), THEN take the square root: √10000=100, not just 101."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student computes the product correctly (≈10000) but takes the wrong root or miscalculates √10000, landing on 1000 instead of 100.",
        rootCause: "Square Root Computed Incorrectly — misapplies the root operation to the estimated product.",
        remediation: "√10000=100, not 1000 — check: 100×100=10000 (correct), but 1000×1000=1,000,000 (way too large), so the square root of 10000 must be 100."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round both numbers", hint: "99≈100, 101≈100." },
      { level: 2, description: "Multiply the rounded numbers", hint: "100 × 100 = 10000." },
      { level: 3, description: "Take the square root", hint: "√10000 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d8", order: 8, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "EXTPARITY-01",
    question: "Prove that \\((-1)^n + (-1)^{n+1} = 0\\) for any integer \\(n\\). Which statement completes the proof?",
    options: [
      { text: "One term is 1 and the other is -1", correct: true, feedback: "Correct. If n is even, (-1)^n=1 and (-1)^(n+1)=-1; if n is odd, the reverse; sum is 0." },
      { text: "The two terms are always equal", correct: false, feedback: "They have opposite signs.", misconceptionId: "E-d8-a" },
      { text: "The sum is 0 only when n is even", correct: false, feedback: "It is 0 for all n.", misconceptionId: "E-d8-b" },
      { text: "The exponents are consecutive so the terms cancel", correct: false, feedback: "That is true, but option 1 is more precise.", misconceptionId: "E-d8-c" }
    ],
    backward: "Parity of exponents for powers of -1.",
    forward: "This pattern appears in alternating series.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student assumes both terms have the same value, not recognising that consecutive exponents on -1 always produce opposite signs.",
        rootCause: "Parity Relationship Not Recognised — doesn't see that n and n+1 always have opposite parity, giving opposite-signed terms.",
        remediation: "n and n+1 are always CONSECUTIVE integers, so one is even and the other is odd — this means (-1)^n and (-1)^(n+1) are always OPPOSITE in sign (one is +1, the other -1), never equal."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student assumes the identity only holds for even n, without checking that it also holds for odd n.",
        rootCause: "Case Analysis Incomplete — only verifies one parity case instead of checking both even and odd n.",
        remediation: "Check BOTH cases: if n is even, (-1)^n=1 and (-1)^(n+1)=-1, sum=0; if n is odd, (-1)^n=-1 and (-1)^(n+1)=1, sum=0 — the identity holds for ALL n, not just even n."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student picks a true but less precise statement about consecutive exponents, instead of the more specific and complete explanation.",
        rootCause: "Less Precise Justification Selected — chooses a vaguer explanation over the more rigorous one.",
        remediation: "While it's true the exponents are consecutive, the PRECISE reason the sum is 0 is that one term equals 1 and the other equals -1 (they are additive inverses) — this specific fact is what completes the proof most rigorously."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with n even", hint: "If n=2: (-1)²+(-1)³ = 1+(-1) = 0." },
      { level: 2, description: "Test with n odd", hint: "If n=3: (-1)³+(-1)⁴ = -1+1 = 0." },
      { level: 3, description: "Generalise the pattern", hint: "In both cases, one term is +1 and the other is -1 — why?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d9", order: 9, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-10",
    question: "Which expression has a value closest to zero?",
    options: [
      { text: "-6 + 8", correct: true, feedback: "Correct. 2 is closest to zero." },
      { text: "5 - (-3)", correct: false, feedback: "8.", misconceptionId: "E-d9-a" },
      { text: "-4 - 6", correct: false, feedback: "-10.", misconceptionId: "E-d9-b" },
      { text: "-2 + (-3)", correct: false, feedback: "-5.", misconceptionId: "E-d9-c" }
    ],
    backward: "Evaluate and compare absolute values.",
    forward: "Comparing magnitudes is useful in error analysis.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student computes 5-(-3)=8 correctly but doesn't compare its distance from zero (8) against the other options' distances (2, 10, 5).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the smallest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -6+8=2, 5-(-3)=8, -4-6=-10, -2+(-3)=-5 — |2| is the SMALLEST, so -6+8 is closest to zero, not 5-(-3) (which is |8|, further away)."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student computes -4-6=-10 correctly but doesn't compare its distance from zero (10) against the other options' distances (2, 8, 5).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the smallest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -6+8=2, 5-(-3)=8, -4-6=-10, -2+(-3)=-5 — |2| is the SMALLEST, so -6+8 is closest to zero, not -4-6 (which is |-10|, much further away)."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student computes -2+(-3)=-5 correctly but doesn't compare its distance from zero (5) against the other options' distances (2, 8, 10).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the smallest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -6+8=2, 5-(-3)=8, -4-6=-10, -2+(-3)=-5 — |2| is the SMALLEST, so -6+8 is closest to zero, not -2+(-3) (which is |-5|, further away)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each expression", hint: "-6+8=2, 5-(-3)=8, -4-6=-10, -2+(-3)=-5." },
      { level: 2, description: "Find the absolute value of each result", hint: "|2|=2, |8|=8, |-10|=10, |-5|=5." },
      { level: 3, description: "Identify the smallest absolute value", hint: "Which absolute value is smallest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d10", order: 10, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-05",
    question: "If \\(a \\times b \\times c\\) is positive and \\(a \\times b\\) is negative, what must be true about \\(c\\)?",
    options: [
      { text: "c is negative", correct: true, feedback: "Correct. Negative (a×b) times c must be positive, so c must be negative." },
      { text: "c is positive", correct: false, feedback: "Then the product would be negative.", misconceptionId: "E-d10-a" },
      { text: "c is zero", correct: false, feedback: "Zero would make the product zero.", misconceptionId: "E-d10-b" },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined.", misconceptionId: "E-d10-c" }
    ],
    backward: "Sign rules for products.",
    forward: "Logical reasoning about unknown signs is used in inequalities.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student assumes c must be positive without checking that a negative (a×b) times a positive c would give a negative overall product, contradicting the given information.",
        rootCause: "Sign Implication Not Traced Through — doesn't work through what sign of c is needed for the final product to be positive.",
        remediation: "If (a×b) is NEGATIVE, and the OVERALL product must be POSITIVE, then c must make NEGATIVE×c=POSITIVE — this requires c to be NEGATIVE (negative×negative=positive), not positive (negative×positive=negative)."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student assumes c could be zero, without recognising that this would make the entire product zero, contradicting the given information that the product is positive.",
        rootCause: "Zero Case Not Ruled Out — doesn't recognise that c=0 would contradict the stated positive product.",
        remediation: "If c were 0, the product a×b×c would be 0, NOT positive — since the product IS positive (as given), c cannot be 0; c must be negative."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student assumes there isn't enough information to determine the sign of c, when the given facts actually do determine it uniquely.",
        rootCause: "Available Reasoning Underused — treats a determinable sign as impossible to find.",
        remediation: "The sign of c CAN be determined: since (a×b) is negative and the full product (a×b×c) is positive, c must be NEGATIVE (negative×negative=positive) — this is fully determined by the given information."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Restate what's given", hint: "a×b is negative; a×b×c is positive." },
      { level: 2, description: "Think of a×b×c as (a×b)×c", hint: "Negative × c = Positive." },
      { level: 3, description: "Determine the sign of c", hint: "What sign of c makes negative×c positive?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d11", order: 11, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-09",
    question: "Without direct calculation, which is larger: \\(2^{20}\\) or \\(3^{12}\\)?",
    options: [
      { text: "2²⁰", correct: true, feedback: "Correct. 2²⁰=(2⁵)⁴=32⁴, 3¹²=(3³)⁴=27⁴, and 32⁴ > 27⁴." },
      { text: "3¹²", correct: false, feedback: "27⁴ < 32⁴.", misconceptionId: "E-d11-a" },
      { text: "They are equal", correct: false, feedback: "They are not.", misconceptionId: "E-d11-b" },
      { text: "Cannot be determined", correct: false, feedback: "We can compare by rewriting with the same exponent.", misconceptionId: "E-d11-c" }
    ],
    backward: "Rewriting powers to compare them.",
    forward: "Exponential comparisons are common in science and finance.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student assumes the larger BASE and reasonable-looking exponent (3¹²) means the larger value, without rewriting both expressions with a common exponent to compare fairly.",
        rootCause: "Values Not Rewritten For Fair Comparison — compares the raw expressions without converting to a common exponent or base.",
        remediation: "Rewrite BOTH with the same exponent: 2²⁰=(2⁵)⁴=32⁴, and 3¹²=(3³)⁴=27⁴ — now compare the BASES with the same exponent: 32>27, so 32⁴>27⁴, meaning 2²⁰ is larger, not 3¹²."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student assumes the two expressions are equal without actually rewriting and comparing them.",
        rootCause: "Values Not Actually Compared — assumes equality instead of evaluating or rewriting the expressions.",
        remediation: "Rewrite with a common exponent: 2²⁰=32⁴ and 3¹²=27⁴ — since 32≠27, these are NOT equal; 32⁴>27⁴, so 2²⁰ is larger."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student assumes the comparison cannot be made without direct (full) calculation, missing that rewriting with a common exponent allows a comparison.",
        rootCause: "Available Reasoning Underused — treats a determinable comparison as impossible without full computation.",
        remediation: "The comparison CAN be made without computing the full values — rewrite both with a common exponent (2²⁰=32⁴, 3¹²=27⁴), then simply compare the bases (32 vs 27) to determine which power is larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a common exponent for both expressions", hint: "20=5×4 and 12=3×4 — both are multiples of 4." },
      { level: 2, description: "Rewrite each as a power raised to the 4th power", hint: "2²⁰=(2⁵)⁴=32⁴. 3¹²=(3³)⁴=27⁴." },
      { level: 3, description: "Compare the bases", hint: "Since both are raised to the same power (4), compare 32 and 27." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d12", order: 12, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ROOT-06",
    question: "Simplify: \\(\\sqrt{(-4)^2} + \\sqrt[3]{-27}\\)",
    options: [
      { text: "1", correct: true, feedback: "Correct. √16=4, cube root of -27 = -3, sum = 1." },
      { text: "-1", correct: false, feedback: "4 + (-3) = 1, not -1.", misconceptionId: "E-d12-a" },
      { text: "7", correct: false, feedback: "You added absolute values.", misconceptionId: "E-d12-b" },
      { text: "-7", correct: false, feedback: "Both roots are not negative.", misconceptionId: "E-d12-c" }
    ],
    backward: "Principal square root and cube root of a negative.",
    forward: "Handling multiple root types is important in advanced algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student mishandles a sign somewhere in the computation, landing on -1 instead of the correct 1.",
        rootCause: "Computation Error — one of the root evaluations or the final sign is mishandled.",
        remediation: "Recompute carefully: √((-4)²)=√16=4 (principal root is positive), and ³√(-27)=-3 (cube root of a negative is negative) — 4+(-3)=1, not -1."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student adds the ABSOLUTE VALUES of both roots (4+3=7) instead of respecting the actual sign of the cube root term.",
        rootCause: "Sign of Cube Root Dropped — treats the negative cube root as if it were positive before adding.",
        remediation: "³√(-27)=-3 is NEGATIVE, not positive — keep the sign when adding: 4+(-3)=1, not 4+3=7 (which incorrectly treats -3 as +3)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student assumes both roots should be negative, perhaps applying the square-root-of-a-square rule incorrectly, landing on -7.",
        rootCause: "Principal Root Convention Not Applied — incorrectly makes the square root term negative when it should be positive.",
        remediation: "√((-4)²)=√16=4 is POSITIVE (the principal root is always non-negative) — only the cube root (³√(-27)=-3) is negative; the sum is 4+(-3)=1, not -7 (which treats both as negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Simplify inside the square root first", hint: "(-4)²=16, so √((-4)²)=√16=4." },
      { level: 2, description: "Evaluate the cube root", hint: "³√(-27)=-3 (since (-3)³=-27)." },
      { level: 3, description: "Add the two results", hint: "4 + (-3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d13", order: 13, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-06",
    question: "In the expression \\(4 + 6 \\div 2 \\times 3\\), which operation should be performed first to follow BIDMAS correctly?",
    options: [
      { text: "Division", correct: true, feedback: "Correct. Division and multiplication left to right; division comes first." },
      { text: "Addition", correct: false, feedback: "Addition has lower precedence.", misconceptionId: "E-d13-a" },
      { text: "Multiplication", correct: false, feedback: "Multiplication has equal precedence, but division is to its left.", misconceptionId: "E-d13-b" },
      { text: "Subtraction", correct: false, feedback: "There is no subtraction.", misconceptionId: "E-d13-c" }
    ],
    backward: "Order of operations rules.",
    forward: "Correct precedence is essential for accurate formula evaluation.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student assumes addition (the first operation appearing left to right) should be performed first, ignoring operator precedence entirely.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "ADDITION has LOWER precedence than division and multiplication — it must wait until after those are done; division (leftmost of the two equal-precedence operations) comes first."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student picks multiplication instead of division, not recognising that when division and multiplication have equal precedence, the LEFTMOST one is performed first.",
        rootCause: "Left-to-Right Tiebreak Rule Not Applied — doesn't know that equal-precedence operations are resolved left to right.",
        remediation: "Division and multiplication have EQUAL precedence — when that happens, work LEFT TO RIGHT: division (6÷2) appears before multiplication (×3) in the expression, so division comes first."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student picks subtraction, an operation that doesn't even appear in this expression.",
        rootCause: "Operation Not Actually Present In Expression — selects an operation not found in the given expression.",
        remediation: "There is NO subtraction in 4+6÷2×3 — the operations present are addition, division, and multiplication; among these, division (leftmost of the equal-precedence pair) comes first."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the operations present", hint: "Addition, division, and multiplication." },
      { level: 2, description: "Rank them by precedence", hint: "Division and multiplication (equal) come before addition." },
      { level: 3, description: "Break the tie between division and multiplication", hint: "When precedence is equal, work left to right — which comes first in the expression?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d14", order: 14, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-06",
    question: "Find the smallest positive integer that has exactly 6 positive factors.",
    options: [
      { text: "12", correct: true, feedback: "Correct. 12=2²×3 has 6 factors: 1,2,3,4,6,12." },
      { text: "16", correct: false, feedback: "16=2⁴ has 5 factors.", misconceptionId: "E-d14-a" },
      { text: "18", correct: false, feedback: "18=2×3² also has 6 factors, but 12 is smaller.", misconceptionId: "E-d14-b" },
      { text: "64", correct: false, feedback: "You multiplied the exponents (2×3=6) and used 2⁶=64. Factor counting requires adding 1 to each exponent and multiplying: (2+1)×(1+1)=6.", misconceptionId: "E-d14-c" }
    ],
    backward: "Number of factors from prime factorisation.",
    forward: "This leads to understanding divisor functions in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student picks 16=2⁴, which actually has only 5 factors (1,2,4,8,16), not verifying the factor count matches the requirement of exactly 6.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 6 factors.",
        remediation: "Count the factors of 16=2⁴: using the formula (exponent+1)=(4+1)=5 factors, not 6 — 16 doesn't satisfy the condition; 12=2²×3 has (2+1)(1+1)=6 factors, which does."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student correctly finds a number with 6 factors (18) but doesn't check whether a SMALLER number also satisfies the condition.",
        rootCause: "Smallest Value Not Verified — finds A valid answer but doesn't check for a smaller one.",
        remediation: "18 DOES have 6 factors, but it's not the SMALLEST — 12 (=2²×3) also has exactly 6 factors (1,2,3,4,6,12) and is smaller than 18, so 12 is the correct answer."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student multiplies the exponents together (2×3=6) and uses that as the new single exponent, computing 2⁶=64 instead of using the divisor-counting formula correctly.",
        rootCause: "Divisor-Count Formula Misapplied — confuses 'multiply the exponents' with the correct formula of 'add 1 to each exponent, then multiply'.",
        remediation: "The number of factors is found by ADDING 1 to EACH exponent in the prime factorisation, THEN multiplying those results — for 12=2²×3¹, that's (2+1)×(1+1)=3×2=6 factors, not by multiplying the exponents directly (2×3=6) and using THAT as a new exponent on 2 (2⁶=64, which is unrelated)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the factor-counting formula", hint: "For a number = p^a × q^b, the factor count is (a+1)×(b+1)." },
      { level: 2, description: "Find exponent combinations that give 6 factors", hint: "(a+1)×(b+1)=6 could be 3×2, meaning exponents 2 and 1." },
      { level: 3, description: "Build the smallest number using those exponents", hint: "Use the smallest primes: 2²×3¹ = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d15", order: 15, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTCOMPARE-01",
    question: "Without adding, which sum is larger: \\(1+2+3+\\dots+20\\) or \\(2+4+6+\\dots+40\\)?",
    options: [
      { text: "The second", correct: true, feedback: "Correct. The second series is double the first." },
      { text: "The first", correct: false, feedback: "The first is half of the second.", misconceptionId: "E-d15-a" },
      { text: "They are equal", correct: false, feedback: "Doubling each term doubles the sum.", misconceptionId: "E-d15-b" },
      { text: "Cannot be determined", correct: false, feedback: "It can be determined without adding.", misconceptionId: "E-d15-c" }
    ],
    backward: "Comparing sums by recognising factors.",
    forward: "This kind of reasoning is used in series and sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student picks the first series as larger, reversing the actual relationship between the two sums.",
        rootCause: "Comparison Direction Reversed — picks the smaller sum instead of the larger one.",
        remediation: "The second series (2+4+...+40) is EACH TERM DOUBLED compared to the first (1+2+...+20) — doubling every term makes the SECOND sum larger, not the first."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student assumes the two sums are equal, not recognising that doubling every term in a series doubles the total sum.",
        rootCause: "Scaling Relationship Not Recognised — doesn't see that each term of the second series is twice the corresponding term of the first.",
        remediation: "Each term of the second series (2,4,6,...,40) is exactly DOUBLE the corresponding term of the first series (1,2,3,...,20) — doubling every term DOUBLES the total sum, so the second sum is NOT equal to the first; it's twice as large."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student assumes the comparison cannot be made without actually adding up both series.",
        rootCause: "Available Reasoning Underused — treats a determinable comparison as impossible without full addition.",
        remediation: "The comparison CAN be made without adding — notice that the second series's terms (2,4,...,40) are each exactly double the first series's terms (1,2,...,20), so the second sum must be exactly double the first, making it larger."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare corresponding terms", hint: "1 vs 2, 2 vs 4, 3 vs 6, ... — each second-series term is double the first." },
      { level: 2, description: "Apply this relationship to the whole sum", hint: "If every term doubles, what happens to the total sum?" },
      { level: 3, description: "Determine which sum is larger", hint: "Doubling every term makes the sum...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d16", order: 16, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "EXTINEQ-01",
    question: "Find all integer values of \\(x\\) such that \\(x^2 < 10\\).",
    options: [
      { text: "-3, -2, -1, 0, 1, 2, 3", correct: true, feedback: "Correct. Squares of these are ≤9." },
      { text: "-4, -3, -2, -1, 0, 1, 2, 3, 4", correct: false, feedback: "4²=16, not <10.", misconceptionId: "E-d16-a" },
      { text: "-3, -2, -1, 1, 2, 3", correct: false, feedback: "0 is missing; 0²=0 <10.", misconceptionId: "E-d16-b" },
      { text: "0, 1, 2, 3", correct: false, feedback: "Negative integers also satisfy the inequality.", misconceptionId: "E-d16-c" }
    ],
    backward: "Solving simple quadratic inequalities.",
    forward: "This is a foundation for solving more complex inequalities.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student includes ±4 in the solution set without checking that 4²=16, which is NOT less than 10.",
        rootCause: "Boundary Value Not Verified — includes a value without checking it actually satisfies the inequality.",
        remediation: "Check each candidate: 4²=16, which is NOT less than 10 — so ±4 must be EXCLUDED; the correct set stops at ±3, since 3²=9<10."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student omits 0 from the solution set, perhaps assuming 0 doesn't count or forgetting to check it.",
        rootCause: "Zero Value Overlooked — forgets to include 0 as a valid solution.",
        remediation: "0² = 0, and 0 IS less than 10 — so 0 MUST be included in the solution set: -3,-2,-1,0,1,2,3, not skipping 0."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student only considers positive integers and 0, forgetting that negative integers also satisfy x²<10 (since squaring removes the sign).",
        rootCause: "Negative Solutions Overlooked — only checks non-negative values, missing that negative x also satisfies a squared inequality.",
        remediation: "Squaring a NEGATIVE number also gives a positive result — (-3)²=9<10, so -3 is a valid solution too; the full solution set includes negatives: -3,-2,-1,0,1,2,3, not just 0,1,2,3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test positive integers", hint: "1²=1, 2²=4, 3²=9, 4²=16 — which are less than 10?" },
      { level: 2, description: "Test negative integers", hint: "Squaring removes the sign, so negative integers behave the same way as their positive counterparts." },
      { level: 3, description: "Don't forget zero", hint: "0²=0, which is less than 10 — include it too." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d17", order: 17, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-11",
    question: "If \\(a\\) is a negative integer and \\(a + b = 3\\), which of the following could be the value of \\(b\\)?",
    options: [
      { text: "5", correct: true, feedback: "Correct. If a is negative, b must be greater than 3; 5 is possible (e.g., a=-2)." },
      { text: "-5", correct: false, feedback: "That would give a negative sum.", misconceptionId: "E-d17-a" },
      { text: "3", correct: false, feedback: "Then a would be 0, not negative.", misconceptionId: "E-d17-b" },
      { text: "-3", correct: false, feedback: "Then a would be 6, not negative.", misconceptionId: "E-d17-c" }
    ],
    backward: "Reasoning about negative numbers in equations.",
    forward: "This informal reasoning leads to solving linear equations.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student picks a value for b without checking that it would still satisfy a+b=3 with a negative — with b=-5, a would need to be 8, which is positive, but even setting that aside, a negative a plus a negative b like -5 could never reach a positive sum of 3.",
        rootCause: "Candidate Not Checked Against Both Constraints — picks a value without verifying it satisfies BOTH the equation and the sign constraint on a.",
        remediation: "If b=-5, then a=3-(-5)=8, which is POSITIVE, not negative — this violates the constraint that a must be negative; try b=5 instead: a=3-5=-2, which IS negative, satisfying both conditions."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student picks b=3, not checking that this would force a=0, which doesn't satisfy the requirement that a is negative.",
        rootCause: "Candidate Not Checked Against Both Constraints — picks a value without verifying it satisfies BOTH the equation and the sign constraint on a.",
        remediation: "If b=3, then a=3-3=0, but 0 is NOT negative — this violates the given condition; try b=5 instead: a=3-5=-2, which IS negative."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student picks b=-3, not checking that this would force a=6, which is positive, not negative as required.",
        rootCause: "Candidate Not Checked Against Both Constraints — picks a value without verifying it satisfies BOTH the equation and the sign constraint on a.",
        remediation: "If b=-3, then a=3-(-3)=6, which is POSITIVE, not negative — this violates the given condition; try b=5 instead: a=3-5=-2, which IS negative."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rearrange the equation to solve for a", hint: "a = 3 - b." },
      { level: 2, description: "Test each candidate value of b", hint: "For each option, compute a=3-b and check if it's negative." },
      { level: 3, description: "Identify which b makes a negative", hint: "Which value of b gives a negative result for a?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d18", order: 18, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-06",
    question: "Evaluate: \\(\\frac{(-2)^3 \\times (-3)^2}{(-1)^5}\\)",
    options: [
      { text: "72", correct: true, feedback: "Correct. (-8)×9/(-1)= -72/(-1)=72." },
      { text: "-72", correct: false, feedback: "You forgot the division by -1 flips the sign.", misconceptionId: "E-d18-a" },
      { text: "36", correct: false, feedback: "You miscalculated a power.", misconceptionId: "E-d18-b" },
      { text: "-36", correct: false, feedback: "Sign and power error.", misconceptionId: "E-d18-c" }
    ],
    backward: "Combining powers with division and signs.",
    forward: "Evaluating complex expressions prepares for algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student correctly computes the numerator (-72) but forgets to divide by (-1)⁵=-1, which would flip the sign to positive.",
        rootCause: "Division Step Omitted or Sign Not Flipped — stops after computing the numerator without completing the division.",
        remediation: "You must ALSO divide by (-1)⁵=-1 — dividing -72 by -1 flips the sign to POSITIVE: -72÷(-1)=72, not just -72 (the numerator alone)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student miscalculates one of the powers, perhaps computing (-2)³ or (-3)² incorrectly, leading to 36 instead of the correct 72.",
        rootCause: "Computation Error — one of the power evaluations is carried out incorrectly.",
        remediation: "Recompute each power carefully: (-2)³=-8 (odd exponent, negative), (-3)²=9 (even exponent, positive) — -8×9=-72, then ÷(-1)=72, not 36."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student makes multiple sign or power errors, landing on -36 instead of the correct 72.",
        rootCause: "Computation Error — multiple sign and/or power evaluations are carried out incorrectly.",
        remediation: "Recompute step by step: (-2)³=-8, (-3)²=9, numerator=-8×9=-72, (-1)⁵=-1, then -72÷(-1)=72, not -36."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each power", hint: "(-2)³=-8. (-3)²=9. (-1)⁵=-1." },
      { level: 2, description: "Compute the numerator", hint: "-8 × 9 = -72." },
      { level: 3, description: "Divide by the denominator", hint: "-72 ÷ (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d19", order: 19, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-08",
    question: "Solve for \\(x\\): \\(2^x = 8^4\\)",
    options: [
      { text: "12", correct: true, feedback: "Correct. 8⁴=(2³)⁴=2¹², so x=12." },
      { text: "4", correct: false, feedback: "You equated the exponents without converting bases.", misconceptionId: "E-d19-a" },
      { text: "8", correct: false, feedback: "You multiplied the base by the exponent.", misconceptionId: "E-d19-b" },
      { text: "16", correct: false, feedback: "2¹⁶ is not 8⁴.", misconceptionId: "E-d19-c" }
    ],
    backward: "Rewriting numbers as powers of a common base.",
    forward: "This technique is used when solving exponential equations.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student directly equates the given exponent (4) to x without first converting 8 into a power of 2.",
        rootCause: "Base Conversion Skipped — assumes the exponents can be equated even though the bases (2 and 8) are different.",
        remediation: "You can only equate exponents when the BASES match — first rewrite 8 as 2³, so 8⁴=(2³)⁴=2¹², and NOW the bases match (both are 2): x=12, not just copying the original exponent (4)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student multiplies the base (8) by its exponent (4) instead of correctly rewriting 8⁴ as a power of 2.",
        rootCause: "Exponent Rule Misapplied — treats the base and exponent as something to multiply instead of applying the power-of-a-power rule.",
        remediation: "8×4=32 is NOT the correct way to rewrite 8⁴ — instead, rewrite 8 as 2³ and apply the power-of-a-power rule: 8⁴=(2³)⁴=2^(3×4)=2¹², giving x=12, not 8."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an arithmetic slip computing 3×4, landing on 16 instead of the correct 12.",
        rootCause: "Computation Error — the exponent multiplication is carried out incorrectly.",
        remediation: "Recompute carefully: 8=2³, so 8⁴=(2³)⁴=2^(3×4)=2¹², not 2¹⁶ (which would need the exponent product to be 16, not 12)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 8 as a power of 2", hint: "8 = 2³." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "8⁴ = (2³)⁴ = 2^(3×4)." },
      { level: 3, description: "Solve for x", hint: "3 × 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d20", order: 20, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ESTROOT-05",
    question: "A square has area 50 cm². Estimate its side length to one decimal place.",
    options: [
      { text: "7.1", correct: true, feedback: "Correct. √50 ≈ 7.07, which rounds to 7.1." },
      { text: "7.0", correct: false, feedback: "7.0²=49, but the side is slightly larger.", misconceptionId: "E-d20-a" },
      { text: "7.5", correct: false, feedback: "7.5²=56.25, too high.", misconceptionId: "E-d20-b" },
      { text: "7.07", correct: false, feedback: "This is a more precise value, but the question asks for one decimal place.", misconceptionId: "E-d20-c" }
    ],
    backward: "Estimating square roots in a geometric context.",
    forward: "This skill is used when working with lengths and areas.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student rounds down to 7.0, not recognising that √50 is slightly greater than 7.0 (since 7.0²=49<50).",
        rootCause: "Rounding Direction Incorrect — rounds toward the nearer whole number instead of correctly to one decimal place.",
        remediation: "7.0²=49, which is LESS than 50 — since the actual value of √50≈7.07, rounding to ONE DECIMAL PLACE gives 7.1, not 7.0."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student picks a value (7.5) that's too far from the actual square root of 50, since 7.5²=56.25 is well above 50.",
        rootCause: "Estimate Not Verified — picks a candidate without checking that its square is reasonably close to the target.",
        remediation: "Check: 7.5²=56.25, which is much MORE than 50 — the actual square root is closer to 7.1 (since 7.1²≈50.41, much closer to 50 than 56.25)."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student gives the more precise unrounded value (7.07) instead of rounding to the one-decimal-place precision the question specifically requests.",
        rootCause: "Rounding Precision Not Applied — provides a more precise value than the question asks for instead of rounding as instructed.",
        remediation: "The question asks for ONE DECIMAL PLACE specifically — 7.07 has TWO decimal places; round it to one: 7.07 rounds to 7.1, not left as 7.07."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the square root of 50", hint: "√50 ≈ 7.07." },
      { level: 2, description: "Round to one decimal place", hint: "Look at the second decimal digit (7) to decide how to round." },
      { level: 3, description: "Confirm your rounding", hint: "Does 7.07 round up or down to one decimal place?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d21", order: 21, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-03",
    question: "Evaluate: \\(-2 \\times (3 - 5)^2 + 4 \\times (-1)^3\\)",
    options: [
      { text: "-12", correct: true, feedback: "Correct. (-2)²=4, -2×4=-8; (-1)³=-1, 4×(-1)=-4; sum -12." },
      { text: "4", correct: false, feedback: "You missed a negative sign.", misconceptionId: "E-d21-a" },
      { text: "-4", correct: false, feedback: "You mishandled the powers.", misconceptionId: "E-d21-b" },
      { text: "12", correct: false, feedback: "You dropped the negatives.", misconceptionId: "E-d21-c" }
    ],
    backward: "Order of operations with powers and negatives.",
    forward: "Multi-step evaluations like this appear in coordinate geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student drops a negative sign somewhere in the calculation, landing on 4 instead of the correct -12.",
        rootCause: "Sign Dropped During Multi-Step Calculation — loses track of a negative sign partway through.",
        remediation: "Track every sign carefully: (3-5)²=(-2)²=4, then -2×4=-8; (-1)³=-1, then 4×(-1)=-4; finally -8+(-4)=-12, not 4."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student mishandles one of the exponent evaluations, perhaps computing (3-5)² or (-1)³ incorrectly, leading to -4 instead of the correct -12.",
        rootCause: "Exponent Evaluated Incorrectly — one of the power computations is carried out incorrectly.",
        remediation: "Recompute each power carefully: (3-5)²=(-2)²=4 (even exponent, positive), (-1)³=-1 (odd exponent, negative) — then -2×4=-8, and 4×(-1)=-4, sum=-8+(-4)=-12, not -4."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student drops all negative signs throughout the calculation, landing on 12 instead of the correct -12.",
        rootCause: "Signs Dropped Entirely — ignores negative signs throughout the multi-step calculation.",
        remediation: "Every negative sign matters: -2×4=-8 (not 8), and 4×(-1)=-4 (not 4) — the sum is -8+(-4)=-12, not 12 (which drops both negatives)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses and the exponent", hint: "(3-5)²=(-2)²=4." },
      { level: 2, description: "Compute both multiplication terms", hint: "-2×4=-8. Also, (-1)³=-1, so 4×(-1)=-4." },
      { level: 3, description: "Add the two results", hint: "-8 + (-4) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d22", order: 22, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-07",
    question: "If \\(a = 2^3 \\times 3^2\\) and \\(b = 2^2 \\times 3^3\\), find the HCF of \\(a\\) and \\(b\\).",
    options: [
      { text: "36", correct: true, feedback: "Correct. HCF = 2²×3² = 36." },
      { text: "6", correct: false, feedback: "That's only 2×3.", misconceptionId: "E-d22-a" },
      { text: "12", correct: false, feedback: "That's 2²×3.", misconceptionId: "E-d22-b" },
      { text: "72", correct: false, feedback: "That's the LCM.", misconceptionId: "E-d22-c" }
    ],
    backward: "Finding HCF from prime factorisation.",
    forward: "HCF is essential for simplifying algebraic fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student uses exponent 1 for both primes (2¹×3¹=6) instead of correctly identifying the lowest shared power for each.",
        rootCause: "Lowest Common Power Miscounted — uses too-small powers instead of the actual lowest shared power of each prime.",
        remediation: "For a=2³×3² and b=2²×3³, the LOWEST shared power of 2 is 2² (min of 3 and 2), and the LOWEST shared power of 3 is 3² (min of 2 and 3) — HCF=2²×3²=36, not 2×3=6."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student uses the correct power for 2 (2²) but the wrong (too-small) power for 3 (3¹ instead of 3²), giving 12.",
        rootCause: "Lowest Common Power Miscounted — uses the wrong power for one of the two primes.",
        remediation: "For the prime 3, compare the exponents in a (3²) and b (3³) — the LOWEST is 3² (not 3¹) — HCF=2²×3²=36, not 2²×3=12."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student computes the LCM (using the HIGHEST power of each prime) instead of the HCF (using the LOWEST shared power).",
        rootCause: "HCF Method Confused With LCM Method — applies the LCM procedure (highest powers) instead of the HCF procedure (lowest shared powers).",
        remediation: "HCF uses the LOWEST shared power of each common prime (2²×3²=36) — using the HIGHEST powers (2³×3³=72) gives the LCM instead, not the HCF."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the exponents of 2", hint: "a has 2³, b has 2² — the lower power is 2²." },
      { level: 2, description: "Compare the exponents of 3", hint: "a has 3², b has 3³ — the lower power is 3²." },
      { level: 3, description: "Multiply the lowest shared powers", hint: "2² × 3² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d23", order: 23, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTDIGIT-01",
    question: "How many digits does \\(2^8 \\times 5^8\\) have?",
    options: [
      { text: "9", correct: true, feedback: "Correct. 2⁸×5⁸=10⁸, which is 1 followed by 8 zeros → 9 digits." },
      { text: "8", correct: false, feedback: "10⁸ has 9 digits (100,000,000).", misconceptionId: "E-d23-a" },
      { text: "10", correct: false, feedback: "10⁸ has 9 digits.", misconceptionId: "E-d23-b" },
      { text: "16", correct: false, feedback: "You added the exponents 8+8=16 instead of recognising that 2⁸×5⁸ = (2×5)⁸ = 10⁸.", misconceptionId: "E-d23-c" }
    ],
    backward: "Using properties of powers to find digit count.",
    forward: "This connects powers with place value and scientific notation.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student assumes 10⁸ has as many digits as its exponent (8), forgetting the leading '1' digit before the zeros.",
        rootCause: "Leading Digit Not Counted — counts only the zeros, forgetting the initial '1'.",
        remediation: "10⁸ means '1' followed by 8 ZEROS: 100,000,000 — counting ALL the digits (the 1 AND the 8 zeros) gives 9 digits total, not just 8 (the zero count alone)."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student overcounts, perhaps confusing the exponent with the digit count in a different way, landing on 10 instead of the correct 9.",
        rootCause: "Digit Count Miscounted — miscounts the total number of digits in 10⁸.",
        remediation: "Write it out: 10⁸ = 100,000,000 — count the digits: 1-0-0-0-0-0-0-0-0, that's exactly 9 digits, not 10."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student adds the exponents (8+8=16) instead of recognising that 2⁸×5⁸ can be combined as (2×5)⁸=10⁸.",
        rootCause: "Exponent Combination Rule Misapplied — adds exponents of DIFFERENT bases as if they were the same base.",
        remediation: "2⁸ and 5⁸ have DIFFERENT bases, so you can't just add exponents like same-base multiplication — instead, combine the bases FIRST: 2⁸×5⁸=(2×5)⁸=10⁸, which has 9 digits, not use 8+8=16 as if it were a digit count."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the two powers using a common exponent", hint: "2⁸×5⁸ = (2×5)⁸ = 10⁸." },
      { level: 2, description: "Write out 10⁸", hint: "10⁸ = 1 followed by 8 zeros: 100,000,000." },
      { level: 3, description: "Count the digits", hint: "How many digits total, including the leading 1?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d24", order: 24, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "EXTPOWID-01",
    question: "Find the smallest integer greater than 1 that is both a perfect square and a perfect cube.",
    options: [
      { text: "64", correct: true, feedback: "Correct. 64 = 8² = 4³." },
      { text: "8", correct: false, feedback: "8 = 2³ but not a perfect square.", misconceptionId: "E-d24-a" },
      { text: "16", correct: false, feedback: "16 = 4² but not a perfect cube.", misconceptionId: "E-d24-b" },
      { text: "256", correct: false, feedback: "256=16², but 256 is not a perfect cube; 64 is the smallest.", misconceptionId: "E-d24-c" }
    ],
    backward: "Smallest number that is a 6th power.",
    forward: "This type of problem appears in number theory and Olympiad maths.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student picks 8, which is a perfect cube (2³) but NOT a perfect square, without checking that both conditions must hold.",
        rootCause: "Only One Condition Checked — verifies only one of the two required properties (square AND cube).",
        remediation: "8=2³ IS a perfect cube, but is it ALSO a perfect square? √8≈2.83, not a whole number — so 8 is NOT a perfect square; you need a number that satisfies BOTH conditions, like 64=8²=4³."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student picks 16, which is a perfect square (4²) but NOT a perfect cube, without checking that both conditions must hold.",
        rootCause: "Only One Condition Checked — verifies only one of the two required properties (square AND cube).",
        remediation: "16=4² IS a perfect square, but is it ALSO a perfect cube? ³√16≈2.52, not a whole number — so 16 is NOT a perfect cube; you need a number that satisfies BOTH conditions, like 64=8²=4³."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student picks a larger number (256) that IS a perfect square but not a perfect cube, without checking for a smaller number that satisfies both conditions.",
        rootCause: "Both Conditions Not Verified For Smallest Candidate — doesn't check whether the found number actually satisfies both conditions, or whether a smaller valid number exists.",
        remediation: "256=16² is a perfect square, but is it a perfect cube? ³√256≈6.35, not a whole number — so 256 does NOT satisfy both conditions; 64=8²=4³ DOES satisfy both and is smaller."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise what 'both square and cube' means", hint: "The number must be a PERFECT SIXTH POWER (n⁶), since (n²)³=(n³)²=n⁶." },
      { level: 2, description: "Find the smallest sixth power greater than 1", hint: "2⁶ = ?" },
      { level: 3, description: "Verify it's both a square and a cube", hint: "Is 64 a perfect square (8²) AND a perfect cube (4³)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d25", order: 25, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-12",
    question: "A sequence starts at -10. Each term is obtained by adding 3, then multiplying by -1. Find the third term.",
    options: [
      { text: "-10", correct: true, feedback: "Correct. 1st: -10; 2nd: (-10+3)×(-1)=7; 3rd: (7+3)×(-1)=-10." },
      { text: "10", correct: false, feedback: "You might have dropped the negative at the end.", misconceptionId: "E-d25-a" },
      { text: "-4", correct: false, feedback: "You skipped a multiplication.", misconceptionId: "E-d25-b" },
      { text: "4", correct: false, feedback: "Sign errors.", misconceptionId: "E-d25-c" }
    ],
    backward: "Sequence with alternating signs.",
    forward: "This leads to understanding recursive sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d25-a",
        description: "Student correctly reaches the magnitude 10 for the third term but drops the negative sign from the final multiplication by -1.",
        rootCause: "Sign Dropped in Final Step — forgets to apply the ×(-1) operation's sign-flipping effect at the last step.",
        remediation: "The rule includes MULTIPLYING BY -1 each time, which flips the sign — the 3rd term is (7+3)×(-1)=10×(-1)=-10, not 10 (which forgets the final sign flip)."
      },
      {
        misconceptionId: "E-d25-b",
        description: "Student applies the 'add 3' step but forgets to also multiply by -1 at one or more stages, leading to an incorrect intermediate value.",
        rootCause: "Rule Applied Incompletely — omits one of the two steps (add 3, then multiply by -1) at some point in the sequence.",
        remediation: "EACH term requires BOTH steps: add 3, THEN multiply by -1 — 2nd term: (-10+3)×(-1)=(-7)×(-1)=7; 3rd term: (7+3)×(-1)=10×(-1)=-10 — don't skip the multiplication at any step."
      },
      {
        misconceptionId: "E-d25-c",
        description: "Student makes sign errors at multiple points while applying the two-step rule, landing on 4 instead of the correct -10.",
        rootCause: "Computation Error — signs are mishandled across multiple steps of the calculation.",
        remediation: "Recompute step by step: 1st=-10; 2nd=(-10+3)×(-1)=(-7)×(-1)=7; 3rd=(7+3)×(-1)=10×(-1)=-10, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the 2nd term from the 1st", hint: "(-10+3)×(-1) = (-7)×(-1) = 7." },
      { level: 2, description: "Find the 3rd term from the 2nd", hint: "(7+3)×(-1) = 10×(-1)." },
      { level: 3, description: "Compute", hint: "10 × (-1) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d26", order: 26, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-08",
    question: "Two numbers have an LCM of 60 and an HCF of 6. One number is 12. What is the other number?",
    options: [
      { text: "30", correct: true, feedback: "Correct. Product = HCF×LCM = 360; 360÷12 = 30." },
      { text: "20", correct: false, feedback: "12×20=240, not 360.", misconceptionId: "E-d26-a" },
      { text: "18", correct: false, feedback: "12×18=216, not 360.", misconceptionId: "E-d26-b" },
      { text: "36", correct: false, feedback: "12×36=432, not 360.", misconceptionId: "E-d26-c" }
    ],
    backward: "Relationship between HCF, LCM, and the product.",
    forward: "This relationship is used in number theory and algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d26-a",
        description: "Student guesses a value for the other number without using the HCF×LCM=product relationship to solve for it precisely.",
        rootCause: "HCF-LCM-Product Relationship Not Applied — guesses instead of using the formula that connects HCF, LCM, and the two numbers' product.",
        remediation: "Use the relationship: HCF×LCM = product of the two numbers — 6×60=360; the other number is 360÷12=30, not a guessed value like 20 (since 12×20=240≠360)."
      },
      {
        misconceptionId: "E-d26-b",
        description: "Student guesses a value for the other number without using the HCF×LCM=product relationship to solve for it precisely.",
        rootCause: "HCF-LCM-Product Relationship Not Applied — guesses instead of using the formula that connects HCF, LCM, and the two numbers' product.",
        remediation: "Use the relationship: HCF×LCM = product of the two numbers — 6×60=360; the other number is 360÷12=30, not a guessed value like 18 (since 12×18=216≠360)."
      },
      {
        misconceptionId: "E-d26-c",
        description: "Student guesses a value for the other number without using the HCF×LCM=product relationship to solve for it precisely.",
        rootCause: "HCF-LCM-Product Relationship Not Applied — guesses instead of using the formula that connects HCF, LCM, and the two numbers' product.",
        remediation: "Use the relationship: HCF×LCM = product of the two numbers — 6×60=360; the other number is 360÷12=30, not a guessed value like 36 (since 12×36=432≠360)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the HCF-LCM-product relationship", hint: "HCF × LCM = the product of the two numbers." },
      { level: 2, description: "Compute the product", hint: "6 × 60 = 360." },
      { level: 3, description: "Divide by the known number to find the other", hint: "360 ÷ 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d27", order: 27, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-07",
    question: "Find the missing number: \\((-2) \\times 3 \\times \\square \\times (-4) = -24\\)",
    options: [
      { text: "-1", correct: true, feedback: "Correct. (-2)×3=-6; -6×(-4)=24; 24×(-1)=-24." },
      { text: "1", correct: false, feedback: "24×1=24, not -24.", misconceptionId: "E-d27-a" },
      { text: "2", correct: false, feedback: "24×2=48.", misconceptionId: "E-d27-b" },
      { text: "-2", correct: false, feedback: "24×(-2)=-48.", misconceptionId: "E-d27-c" }
    ],
    backward: "Balancing a product with a missing factor.",
    forward: "This is a precursor to solving equations by dividing.",
    misconceptions: [
      {
        misconceptionId: "E-d27-a",
        description: "Student picks a positive missing factor without checking that it produces the target negative result.",
        rootCause: "Missing Factor Not Verified — picks a value without checking the full product matches the target.",
        remediation: "Test your answer: the product of the known factors is (-2)×3×(-4)=24 — to reach the target -24, the missing factor must make 24×□=-24, which requires □=-1, not 1 (since 24×1=24, not -24)."
      },
      {
        misconceptionId: "E-d27-b",
        description: "Student picks a value without checking that it produces the target result, landing on a magnitude that's twice too large.",
        rootCause: "Missing Factor Not Verified — picks a value without checking the full product matches the target.",
        remediation: "The product of the known factors is (-2)×3×(-4)=24 — to reach -24, the missing factor must satisfy 24×□=-24, so □=-1, not 2 (since 24×2=48, not -24)."
      },
      {
        misconceptionId: "E-d27-c",
        description: "Student picks the right sign but wrong magnitude, landing on -2 which overshoots the target.",
        rootCause: "Missing Factor Not Verified — picks a value without checking the full product matches the target.",
        remediation: "The product of the known factors is (-2)×3×(-4)=24 — to reach -24, the missing factor must satisfy 24×□=-24, so □=-1, not -2 (since 24×(-2)=-48, not -24)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the known factors together", hint: "(-2)×3×(-4) = 24." },
      { level: 2, description: "Set up the balance equation", hint: "24 × □ = -24." },
      { level: 3, description: "Solve for the missing factor", hint: "-24 ÷ 24 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d28", order: 28, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "ESTDIGIT-01",
    question: "Calculate the sum of the digits of \\(2^{10} \\times 5^8 \\times 3\\).",
    options: [
      { text: "3", correct: true, feedback: "Correct. 2¹⁰×5⁸ = 2²×(2⁸×5⁸)=4×10⁸=400,000,000; ×3=1,200,000,000; sum=1+2=3." },
      { text: "12", correct: false, feedback: "You added all digits individually? 1+2=3.", misconceptionId: "E-d28-a" },
      { text: "0", correct: false, feedback: "The number is not zero.", misconceptionId: "E-d28-b" },
      { text: "6", correct: false, feedback: "You might have doubled the sum.", misconceptionId: "E-d28-c" }
    ],
    backward: "Combining powers and place value.",
    forward: "This type of clever simplification is common in contest problems.",
    misconceptions: [
      {
        misconceptionId: "E-d28-a",
        description: "Student miscounts or misidentifies the actual nonzero digits of the final number, landing on 12 instead of the correct 3.",
        rootCause: "Digit Sum Miscounted — doesn't correctly identify which digits in the large number are actually nonzero.",
        remediation: "Break it down: 2¹⁰×5⁸=2²×(2⁸×5⁸)=4×10⁸=400,000,000, then ×3=1,200,000,000 — the digits are 1,2,0,0,0,0,0,0,0,0, and only 1 and 2 are nonzero: 1+2=3, not 12."
      },
      {
        misconceptionId: "E-d28-b",
        description: "Student assumes the result is somehow zero, perhaps confusing this with a different property of the expression.",
        rootCause: "Result Value Not Actually Computed — assumes a value without working through the simplification.",
        remediation: "The expression 2¹⁰×5⁸×3 is a real, nonzero number: 1,200,000,000 — its digit sum is 1+2=3, not 0 (the number itself is clearly not zero)."
      },
      {
        misconceptionId: "E-d28-c",
        description: "Student doubles the correct digit sum, landing on 6 instead of the correct 3.",
        rootCause: "Computation Error — the correct digits are found but the sum is doubled or otherwise miscalculated.",
        remediation: "The nonzero digits of 1,200,000,000 are 1 and 2 — their sum is 1+2=3, not 6 (don't double the correct sum)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite the expression using a power of 10", hint: "2¹⁰×5⁸ = 2² × (2⁸×5⁸) = 4 × 10⁸." },
      { level: 2, description: "Compute the full value", hint: "4×10⁸=400,000,000, then ×3=1,200,000,000." },
      { level: 3, description: "Sum the nonzero digits", hint: "Which digits in 1,200,000,000 are not zero? Add them." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-13",
    question: "Which expression has a value furthest from zero?",
    options: [
      { text: "-3 - 8", correct: true, feedback: "-11 is furthest." },
      { text: "-9+5", correct: false, feedback: "-4.", misconceptionId: "E-r1-a" },
      { text: "4-(-6)", correct: false, feedback: "10.", misconceptionId: "E-r1-b" },
      { text: "-1+(-7)", correct: false, feedback: "-8.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student computes -9+5=-4 correctly but doesn't compare its distance from zero (4) against the other options' distances (11, 10, 8).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the largest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -3-8=-11, -9+5=-4, 4-(-6)=10, -1+(-7)=-8 — |-11|=11 is the LARGEST, so -3-8 is furthest from zero, not -9+5 (which is only |-4|=4)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student computes 4-(-6)=10 correctly but doesn't compare its distance from zero (10) against the other options' distances (11, 4, 8).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the largest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -3-8=-11, -9+5=-4, 4-(-6)=10, -1+(-7)=-8 — |-11|=11 is the LARGEST, so -3-8 is furthest from zero, not 4-(-6) (which is |10|=10, slightly less)."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student computes -1+(-7)=-8 correctly but doesn't compare its distance from zero (8) against the other options' distances (11, 4, 10).",
        rootCause: "Values Not Actually Compared — evaluates expressions but doesn't compare their magnitudes to find the largest.",
        remediation: "Compute ALL four expressions and compare their absolute values: -3-8=-11, -9+5=-4, 4-(-6)=10, -1+(-7)=-8 — |-11|=11 is the LARGEST, so -3-8 is furthest from zero, not -1+(-7) (which is |-8|=8, less)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate each expression", hint: "-3-8=-11, -9+5=-4, 4-(-6)=10, -1+(-7)=-8." },
      { level: 2, description: "Find the absolute value of each result", hint: "|-11|=11, |-4|=4, |10|=10, |-8|=8." },
      { level: 3, description: "Identify the largest absolute value", hint: "Which absolute value is largest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r2", order: 2, cluster: "A", clusterName: CLUSTER_NAMES.A,
    skillId: "INTADD-03",
    question: "Evaluate: \\(-7 - (-4) + (-2)\\)",
    options: [
      { text: "-5", correct: true, feedback: "-7+4-2 = -5." },
      { text: "-1", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-r2-a" },
      { text: "-9", correct: false, feedback: "You subtracted 2 instead of adding.", misconceptionId: "E-r2-b" },
      { text: "5", correct: false, feedback: "You changed all signs to positive.", misconceptionId: "E-r2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student makes an arithmetic slip while combining the terms, landing on -1 instead of the correct -5.",
        rootCause: "Computation Error — one of the steps in the calculation is carried out incorrectly.",
        remediation: "Recompute step by step: -7-(-4)=-7+4=-3, then -3+(-2)=-5, not -1."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student subtracts 2 instead of adding it, misreading +(-2) as if it required an extra subtraction.",
        rootCause: "Sign Misread — treats +(-2) as -2 subtracted an extra time instead of correctly as adding -2.",
        remediation: "+(-2) means ADD -2 (which is the same as subtracting 2 once) — -3+(-2)=-5, not -3-2-2=-7 or similar double-subtraction errors giving -9."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student flips every sign to positive, computing 7+4+2=13 or a related variant that lands on 5.",
        rootCause: "Signs Flipped Entirely — treats every operation and number as positive.",
        remediation: "Keep the actual signs: -7-(-4)+(-2) = -7+4-2 = -5, not 7+4-... leading to 5 (which flips signs incorrectly)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite the double negative", hint: "-(-4) becomes +4." },
      { level: 2, description: "Combine the first two terms", hint: "-7 + 4 = -3." },
      { level: 3, description: "Add the last term", hint: "-3 + (-2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r3", order: 3, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-01",
    question: "What is the sign of \\((-2) \\times 4 \\times (-6) \\times (-8)\\)?",
    options: [
      { text: "Negative", correct: true, feedback: "Three negatives → negative." },
      { text: "Positive", correct: false, feedback: "Odd negatives → negative.", misconceptionId: "E-r3-a" },
      { text: "Zero", correct: false, feedback: "No zero factor.", misconceptionId: "E-r3-b" },
      { text: "Cannot be determined", correct: false, feedback: "The sign is determined.", misconceptionId: "E-r3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student miscounts the number of negative factors (three: -2, -6, -8), assuming an even count and reporting a positive result.",
        rootCause: "Sign Rule Miscounted — doesn't correctly track whether the number of negative factors is odd or even.",
        remediation: "Count the negative factors: -2, -6, and -8 — that's THREE negatives (odd), so the product is NEGATIVE, not positive."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student assumes there must be a zero factor somewhere, without checking the actual list of factors.",
        rootCause: "Zero Factor Assumed Without Verification — assumes zero is present without confirming it from the given factors.",
        remediation: "Check the actual factors: -2, 4, -6, -8 — NONE of these are zero, so the product cannot be zero."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student assumes the sign cannot be determined without full calculation, missing that counting negatives is sufficient.",
        rootCause: "Available Reasoning Underused — treats a determinable sign as impossible to find without complete multiplication.",
        remediation: "The sign CAN be determined by counting negative factors: -2, -6, -8 are three negatives (odd), so the product is NEGATIVE — you don't need to compute the actual value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which factors are negative", hint: "-2, -6, and -8 are negative; 4 is positive." },
      { level: 2, description: "Count the negative factors", hint: "There are three negative factors." },
      { level: 3, description: "Determine the sign from the count", hint: "Is three an odd or even count? What sign results?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r4", order: 4, cluster: "M", clusterName: CLUSTER_NAMES.M,
    skillId: "INTMUL-02",
    question: "Evaluate: \\((-3) \\times (-4) \\div (-2)\\)",
    options: [
      { text: "-6", correct: true, feedback: "12 ÷ (-2) = -6." },
      { text: "6", correct: false, feedback: "You forgot the division sign.", misconceptionId: "E-r4-a" },
      { text: "-1.5", correct: false, feedback: "You divided incorrectly.", misconceptionId: "E-r4-b" },
      { text: "1.5", correct: false, feedback: "Sign and division errors.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student correctly computes (-3)×(-4)=12 but then ignores the sign of the division by -2, treating it as if it were positive.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last division step.",
        remediation: "The final step is 12÷(-2), which is POSITIVE divided by NEGATIVE, giving a NEGATIVE result — 12÷(-2)=-6, not 6."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student divides incorrectly, perhaps inverting the division or making an arithmetic slip, landing on -1.5 instead of -6.",
        rootCause: "Computation Error — the division step is carried out incorrectly.",
        remediation: "Recompute carefully: (-3)×(-4)=12, then 12÷(-2)=-6, not -1.5 (which would come from dividing in the wrong direction, like -2÷12)."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student both mishandles the sign and inverts the division, landing on 1.5 instead of -6.",
        rootCause: "Computation Error — multiple sign and division errors compound.",
        remediation: "Recompute carefully: (-3)×(-4)=12 (two negatives, positive), then 12÷(-2)=-6 (positive÷negative=negative), not 1.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the multiplication first (left to right)", hint: "(-3) × (-4) = 12." },
      { level: 2, description: "Determine the sign of the division", hint: "12 (positive) ÷ (-2) will be negative." },
      { level: 3, description: "Compute", hint: "12 ÷ 2 = ? (then apply the negative sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r5", order: 5, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-04",
    question: "Which is larger: \\(3^6\\) or \\(6^3\\)?",
    options: [
      { text: "3⁶", correct: true, feedback: "3⁶=729, 6³=216." },
      { text: "6³", correct: false, feedback: "216 < 729.", misconceptionId: "E-r5-a" },
      { text: "They are equal", correct: false, feedback: "They are not.", misconceptionId: "E-r5-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student assumes the larger BASE (6 vs 3) means the larger power, without actually computing both values.",
        rootCause: "Values Not Actually Computed — compares bases or exponents directly instead of evaluating each expression.",
        remediation: "Actually COMPUTE both values before comparing: 3⁶=3×3×3×3×3×3=729, and 6³=6×6×6=216 — 729>216, so 3⁶ is larger, even though 6 is the larger base."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student assumes the two expressions are equal because they use the same two digits (3 and 6) swapped, without actually computing either value.",
        rootCause: "Values Not Actually Computed — assumes symmetry implies equality instead of evaluating each expression.",
        remediation: "Swapping the base and exponent does NOT give equal results — actually compute: 3⁶=729 and 6³=216, which are NOT equal (729≠216)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute 3⁶", hint: "3×3×3×3×3×3 = 729." },
      { level: 2, description: "Compute 6³", hint: "6×6×6 = 216." },
      { level: 3, description: "Compare", hint: "Is 729 or 216 larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r6", order: 6, cluster: "P", clusterName: CLUSTER_NAMES.P,
    skillId: "POWEXP-08",
    question: "Solve for \\(x\\): \\(5^x = 125^2\\)",
    options: [
      { text: "6", correct: true, feedback: "125=5³, so 125²=(5³)²=5⁶." },
      { text: "2", correct: false, feedback: "You equated exponents incorrectly.", misconceptionId: "E-r6-a" },
      { text: "3", correct: false, feedback: "That would be 125=5³.", misconceptionId: "E-r6-b" },
      { text: "9", correct: false, feedback: "3²=9, not the right base.", misconceptionId: "E-r6-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student directly equates the given exponent (2) to x without first converting 125 into a power of 5.",
        rootCause: "Base Conversion Skipped — assumes the exponents can be equated even though the bases (5 and 125) are different.",
        remediation: "You can only equate exponents when the BASES match — first rewrite 125 as 5³, so 125²=(5³)²=5⁶, and NOW the bases match (both are 5): x=6, not just copying the original exponent (2)."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student reports the intermediate exponent (3, from rewriting 125=5³) instead of completing the power-of-a-power calculation to find x.",
        rootCause: "Calculation Stopped Midway — reports an intermediate result instead of completing the full calculation.",
        remediation: "125=5³ is only the FIRST step — you must ALSO apply the power-of-a-power rule: 125²=(5³)²=5^(3×2)=5⁶, so x=6, not just 3 (the intermediate exponent)."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student confuses the bases, computing 3²=9 instead of correctly working with base 5.",
        rootCause: "Wrong Base Used — performs the calculation with an unrelated base instead of the actual base 5.",
        remediation: "The base in this problem is 5, not 3 — rewrite 125 as 5³, then 125²=(5³)²=5⁶, giving x=6, not computing 3²=9 (which uses the wrong base entirely)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 125 as a power of 5", hint: "125 = 5³." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "125² = (5³)² = 5^(3×2)." },
      { level: 3, description: "Solve for x", hint: "3 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r7", order: 7, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ESTROOT-01",
    question: "Between which integers does \\(\\sqrt{300}\\) lie?",
    options: [
      { text: "17 and 18", correct: true, feedback: "17²=289, 18²=324." },
      { text: "16 and 17", correct: false, feedback: "16²=256, too low.", misconceptionId: "E-r7-a" },
      { text: "18 and 19", correct: false, feedback: "18²=324, already above 300.", misconceptionId: "E-r7-b" },
      { text: "15 and 16", correct: false, feedback: "Too low.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student picks a lower pair of consecutive integers (16 and 17) whose squares (256 and 289) don't actually bracket 300.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 300 falls between the squares of its endpoints.",
        remediation: "Check: 16²=256 and 17²=289 — 300 is NOT between 256 and 289 (300>289) — instead check 17²=289 and 18²=324: 300 IS between 289 and 324, so √300 is between 17 and 18."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student picks an upper pair of consecutive integers (18 and 19) whose squares (324 and 361) don't actually bracket 300.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 300 falls between the squares of its endpoints.",
        remediation: "Check: 18²=324 and 19²=361 — 300 is NOT between 324 and 361 (300<324) — instead check 17²=289 and 18²=324: 300 IS between 289 and 324, so √300 is between 17 and 18."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student picks an even lower pair of consecutive integers (15 and 16) whose squares (225 and 256) don't bracket 300 at all.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 300 falls between the squares of its endpoints.",
        remediation: "Check: 15²=225 and 16²=256 — both are far below 300 — instead check 17²=289 and 18²=324: 300 IS between 289 and 324, so √300 is between 17 and 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate roughly where √300 falls", hint: "300 is between 289 and 324, both perfect squares." },
      { level: 2, description: "Check the perfect squares nearby", hint: "17²=289, 18²=324." },
      { level: 3, description: "Confirm which pair brackets 300", hint: "Is 300 between 289 and 324?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r8", order: 8, cluster: "R", clusterName: CLUSTER_NAMES.R,
    skillId: "ROOT-07",
    question: "Simplify \\(\\sqrt{3^2 + 4^2}\\)",
    options: [
      { text: "5", correct: true, feedback: "√(9+16)=√25=5." },
      { text: "7", correct: false, feedback: "You added 3+4.", misconceptionId: "E-r8-a" },
      { text: "25", correct: false, feedback: "You forgot the square root.", misconceptionId: "E-r8-b" },
      { text: "12", correct: false, feedback: "You multiplied 3×4.", misconceptionId: "E-r8-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student adds 3+4=7 directly, distributing the square root over the sum of squares instead of computing each square first.",
        rootCause: "Square Root Incorrectly Distributed — treats √(a²+b²) as if it equalled a+b, skipping the squaring step entirely.",
        remediation: "You must SQUARE each number FIRST (3²=9, 4²=16), THEN add (9+16=25), THEN take the square root (√25=5) — don't just add 3+4=7, which skips the squaring entirely."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student computes the sum inside the radical (9+16=25) but forgets to take the square root of that sum.",
        rootCause: "Square Root Step Omitted — stops after computing the sum, without taking its root.",
        remediation: "9+16=25 is only the value INSIDE the radical — you must ALSO take the square root: √25=5, not just 25."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student multiplies 3×4=12 instead of squaring each number and adding, misreading the expression.",
        rootCause: "Expression Misread — performs an unrelated operation (multiplication of the bases) instead of squaring and adding.",
        remediation: "The expression is 3² PLUS 4² (9+16=25), not 3 TIMES 4 (12) — square each number first, add, then take the square root: √25=5, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute each square separately", hint: "3²=9. 4²=16." },
      { level: 2, description: "Add the two squares", hint: "9 + 16 = 25." },
      { level: 3, description: "Take the square root of the sum", hint: "√25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "r9", order: 9, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-04",
    question: "Insert brackets to make \\(8 + 4 \\div 2 \\times 3 = 18\\) true.",
    options: [
      { text: "(8 + 4) ÷ 2 × 3", correct: true, feedback: "12÷2×3=18." },
      { text: "8 + 4 ÷ (2 × 3)", correct: false, feedback: "8+4/6 not 18.", misconceptionId: "E-r9-a" },
      { text: "(8 + 4 ÷ 2) × 3", correct: false, feedback: "(8+2)×3=30.", misconceptionId: "E-r9-b" },
      { text: "8 + (4 ÷ 2 × 3)", correct: false, feedback: "8+6=14.", misconceptionId: "E-r9-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student groups 2×3 together inside the division, producing a fraction that doesn't simplify to the target 18.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually produce the target value.",
        remediation: "Test the result: 8+4÷(2×3)=8+4÷6=8+0.67≈8.67, not 18 — try grouping the 8 and 4 together instead: (8+4)÷2×3=12÷2×3=18."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student groups a part of the expression that produces a different (larger) wrong result, 30, instead of the target 18.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually produce the target value.",
        remediation: "Test the result: (8+4÷2)×3=(8+2)×3=10×3=30, not 18 — try grouping just the 8 and 4 together: (8+4)÷2×3=18."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student groups a part of the expression that doesn't actually change the standard order of operations, so the result stays at 14 instead of 18.",
        rootCause: "Brackets Placed Without Verifying the Result — inserts brackets without checking whether they actually change the computed value.",
        remediation: "Brackets around (4÷2×3) don't change anything, since division and multiplication already happen before addition by default, giving 14 — try grouping the 8 and 4 together instead: (8+4)÷2×3=18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the original expression without brackets", hint: "8+4÷2×3 = 8+2×3 = 8+6 = 14 (not the target)." },
      { level: 2, description: "Try grouping 8 and 4 together", hint: "(8+4)÷2×3 = 12÷2×3." },
      { level: 3, description: "Compute", hint: "12÷2=6, then 6×3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r10", order: 10, cluster: "O", clusterName: CLUSTER_NAMES.O,
    skillId: "ORDEROPS-03",
    question: "Evaluate: \\(10 - 3 \\times (2 + 4) \\div 3\\)",
    options: [
      { text: "4", correct: true, feedback: "10 - 3×6÷3 = 10 - 6 = 4." },
      { text: "2", correct: false, feedback: "You made an arithmetic error.", misconceptionId: "E-r10-a" },
      { text: "8", correct: false, feedback: "You forgot the subtraction.", misconceptionId: "E-r10-b" },
      { text: "6", correct: false, feedback: "You multiplied incorrectly.", misconceptionId: "E-r10-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student makes an arithmetic slip somewhere in the multi-step calculation, landing on 2 instead of the correct 4.",
        rootCause: "Computation Error — one of the steps in the calculation is carried out incorrectly.",
        remediation: "Recompute step by step: (2+4)=6, then 3×6=18, then 18÷3=6, then 10-6=4, not 2."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student computes the multiplication and division correctly but forgets the final subtraction from 10, reporting 6 instead of 4 — or in this variant, misreports the intermediate value 8.",
        rootCause: "Final Subtraction Step Omitted — stops before completing the last operation.",
        remediation: "After computing 3×6÷3=6, you must ALSO subtract from 10: 10-6=4, not stopping at an intermediate or unrelated value like 8."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student mishandles the multiplication or division step, landing on 6 (an intermediate value) instead of completing the calculation to reach 4.",
        rootCause: "Final Subtraction Step Omitted — reports the intermediate result (3×6÷3=6) instead of completing the subtraction from 10.",
        remediation: "3×6÷3=6 is only an INTERMEDIATE result — you must still subtract it from 10: 10-6=4, not stop at 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "2+4 = 6." },
      { level: 2, description: "Compute the multiplication and division (left to right)", hint: "3×6=18, then 18÷3=6." },
      { level: 3, description: "Complete the subtraction", hint: "10 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r11", order: 11, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-05",
    question: "How many distinct prime factors does 330 have?",
    options: [
      { text: "4", correct: true, feedback: "330 = 2×3×5×11." },
      { text: "3", correct: false, feedback: "You missed one.", misconceptionId: "E-r11-a" },
      { text: "5", correct: false, feedback: "Only four.", misconceptionId: "E-r11-b" },
      { text: "6", correct: false, feedback: "Too many.", misconceptionId: "E-r11-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student stops the prime factorisation too early, missing one of the four distinct primes (2, 3, 5, or 11).",
        rootCause: "Factorisation Incomplete — stops dividing before fully breaking the number into all its prime factors.",
        remediation: "Fully divide out: 330÷2=165, 165÷3=55, 55÷5=11, 11÷11=1 — that's FOUR distinct primes (2, 3, 5, 11), not three."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student overcounts, perhaps counting a prime factor twice, landing on 5 instead of the correct 4.",
        rootCause: "Count Includes a Non-Distinct or Non-Prime Factor — miscounts by including an extra or repeated factor.",
        remediation: "330=2×3×5×11 has exactly FOUR distinct primes — double check you haven't counted any prime twice."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student significantly overcounts the distinct prime factors, landing on 6 instead of the correct 4.",
        rootCause: "Count Includes a Non-Distinct or Non-Prime Factor — miscounts by including extra or repeated factors.",
        remediation: "List the actual prime factorisation: 330=2×3×5×11 — that's exactly FOUR distinct primes, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide by the smallest primes in turn", hint: "330÷2=165. 165÷3=55." },
      { level: 2, description: "Continue dividing", hint: "55÷5=11. 11÷11=1." },
      { level: 3, description: "Count the distinct primes used", hint: "2, 3, 5, 11 — how many distinct primes is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r12", order: 12, cluster: "PR", clusterName: CLUSTER_NAMES.PR,
    skillId: "PRIMEFACT-07",
    question: "Find the HCF of \\(2^3 \\times 3^2\\) and \\(2^2 \\times 3^4\\).",
    options: [
      { text: "36", correct: true, feedback: "2²×3²=36." },
      { text: "6", correct: false, feedback: "2×3=6, not highest.", misconceptionId: "E-r12-a" },
      { text: "12", correct: false, feedback: "2²×3=12.", misconceptionId: "E-r12-b" },
      { text: "72", correct: false, feedback: "That's 2³×3².", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student uses exponent 1 for both primes (2¹×3¹=6) instead of correctly identifying the lowest shared power for each.",
        rootCause: "Lowest Common Power Miscounted — uses too-small powers instead of the actual lowest shared power of each prime.",
        remediation: "For 2³×3² and 2²×3⁴, the LOWEST shared power of 2 is 2² (min of 3 and 2), and the LOWEST shared power of 3 is 3² (min of 2 and 4) — HCF=2²×3²=36, not 2×3=6."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student uses the correct power for 2 (2²) but the wrong (too-small) power for 3 (3¹ instead of 3²), giving 12.",
        rootCause: "Lowest Common Power Miscounted — uses the wrong power for one of the two primes.",
        remediation: "For the prime 3, compare the exponents (3² and 3⁴) — the LOWEST is 3² (not 3¹) — HCF=2²×3²=36, not 2²×3=12."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student uses the higher power of 2 (2³ instead of 2²), mixing up which number's exponent is lower.",
        rootCause: "Lowest Common Power Miscounted — uses the HIGHER power of a prime instead of the lowest power shared by both numbers.",
        remediation: "Compare the exponents of 2: 2³ (in the first number) vs 2² (in the second) — the LOWEST shared power is 2² (not 2³) — HCF=2²×3²=36, not 2³×3²=72."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the exponents of 2", hint: "2³ vs 2² — the lower power is 2²." },
      { level: 2, description: "Compare the exponents of 3", hint: "3² vs 3⁴ — the lower power is 3²." },
      { level: 3, description: "Multiply the lowest shared powers", hint: "2² × 3² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r13", order: 13, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTROUND-02",
    question: "Estimate \\(\\frac{198 + 303}{0.5}\\) by rounding to 1 significant figure.",
    options: [
      { text: "1000", correct: true, feedback: "200+300=500, ÷0.5=1000." },
      { text: "500", correct: false, feedback: "You forgot to divide.", misconceptionId: "E-r13-a" },
      { text: "2000", correct: false, feedback: "You doubled.", misconceptionId: "E-r13-b" },
      { text: "250", correct: false, feedback: "You halved.", misconceptionId: "E-r13-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r13-a",
        description: "Student adds the rounded numerator values (200+300=500) but forgets to divide by the rounded denominator (0.5).",
        rootCause: "Division Step Omitted — stops after computing the numerator, without dividing by the denominator.",
        remediation: "The expression is a FRACTION — after adding the numerator (198+303≈500), you must ALSO divide by the denominator (≈0.5): 500÷0.5=1000, not just 500."
      },
      {
        misconceptionId: "E-r13-b",
        description: "Student makes an error in the division-by-0.5 step, doubling the numerator incorrectly and overshooting to a value double the correct answer.",
        rootCause: "Computation Error — dividing by 0.5 (which doubles a number) is applied inconsistently or an extra doubling occurs.",
        remediation: "Dividing by 0.5 is the same as multiplying by 2: 500÷0.5=500×2=1000, not 2000 (which would come from doubling an already-doubled value)."
      },
      {
        misconceptionId: "E-r13-c",
        description: "Student divides by 2 instead of by 0.5, effectively halving instead of doubling.",
        rootCause: "Division by a Decimal Less Than 1 Confused With Multiplication — treats dividing by 0.5 as if it were dividing by 2.",
        remediation: "Dividing by 0.5 makes a number LARGER (it's the same as multiplying by 2), not smaller — 500÷0.5=1000, not 500÷2=250 (which incorrectly halves instead)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to 1 significant figure", hint: "198≈200, 303≈300, 0.5 stays as is." },
      { level: 2, description: "Add the rounded numerator values", hint: "200 + 300 = 500." },
      { level: 3, description: "Divide by the rounded denominator", hint: "500 ÷ 0.5 = ? (dividing by 0.5 doubles the number)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r14", order: 14, cluster: "E", clusterName: CLUSTER_NAMES.E,
    skillId: "ESTDIGIT-01",
    question: "How many digits does \\(4^5 \\times 5^4\\) have?",
    options: [
      { text: "6", correct: true, feedback: "4⁵×5⁴ = 2¹⁰×5⁴ = 2⁶×(2⁴×5⁴)=64×10⁴=640,000 (6 digits)." },
      { text: "5", correct: false, feedback: "640,000 has 6 digits.", misconceptionId: "E-r14-a" },
      { text: "7", correct: false, feedback: "Too many.", misconceptionId: "E-r14-b" },
      { text: "8", correct: false, feedback: "Too many.", misconceptionId: "E-r14-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r14-a",
        description: "Student undercounts the digits of 640,000, perhaps forgetting one of the trailing zeros or the leading digits.",
        rootCause: "Digit Count Miscounted — miscounts the total number of digits in the final number.",
        remediation: "Write it out fully: 640,000 — count ALL the digits: 6-4-0-0-0-0, that's 6 digits total, not 5."
      },
      {
        misconceptionId: "E-r14-b",
        description: "Student overcounts the digits or makes an error in the power simplification, landing on 7 instead of the correct 6.",
        rootCause: "Computation Error — the power simplification or digit count is carried out incorrectly.",
        remediation: "Recompute carefully: 4⁵×5⁴=2¹⁰×5⁴=2⁶×(2⁴×5⁴)=64×10⁴=640,000 — count the digits: 6-4-0-0-0-0, that's 6, not 7."
      },
      {
        misconceptionId: "E-r14-c",
        description: "Student significantly overcounts, perhaps confusing this with a larger power expression, landing on 8 instead of 6.",
        rootCause: "Computation Error — the power simplification or digit count is carried out incorrectly.",
        remediation: "Recompute carefully: 4⁵×5⁴=64×10⁴=640,000 — count the digits: 6-4-0-0-0-0, that's exactly 6, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 4⁵ using powers of 2", hint: "4⁵=(2²)⁵=2¹⁰." },
      { level: 2, description: "Combine with a power of 10", hint: "2¹⁰×5⁴=2⁶×(2⁴×5⁴)=64×10⁴." },
      { level: 3, description: "Write out the full number and count digits", hint: "64×10⁴=640,000 — how many digits is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r15", order: 15, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "EXTINEQ-01",
    question: "Find all integer values of \\(x\\) such that \\(x^2 \\le 5\\).",
    options: [
      { text: "-2, -1, 0, 1, 2", correct: true, feedback: "Squares ≤5." },
      { text: "-3, -2, -1, 0, 1, 2, 3", correct: false, feedback: "3²=9 >5.", misconceptionId: "E-r15-a" },
      { text: "0, 1, 2", correct: false, feedback: "Negatives also work.", misconceptionId: "E-r15-b" },
      { text: "-2, -1, 1, 2", correct: false, feedback: "0 is missing.", misconceptionId: "E-r15-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r15-a",
        description: "Student includes ±3 in the solution set without checking that 3²=9, which is NOT less than or equal to 5.",
        rootCause: "Boundary Value Not Verified — includes a value without checking it actually satisfies the inequality.",
        remediation: "Check each candidate: 3²=9, which is NOT ≤5 — so ±3 must be EXCLUDED; the correct set stops at ±2, since 2²=4≤5."
      },
      {
        misconceptionId: "E-r15-b",
        description: "Student only considers non-negative integers, forgetting that negative integers also satisfy x²≤5 (since squaring removes the sign).",
        rootCause: "Negative Solutions Overlooked — only checks non-negative values, missing that negative x also satisfies a squared inequality.",
        remediation: "Squaring a NEGATIVE number also gives a positive result — (-2)²=4≤5, so -2 is a valid solution too; the full solution set includes negatives: -2,-1,0,1,2, not just 0,1,2."
      },
      {
        misconceptionId: "E-r15-c",
        description: "Student omits 0 from the solution set, perhaps assuming 0 doesn't count or forgetting to check it.",
        rootCause: "Zero Value Overlooked — forgets to include 0 as a valid solution.",
        remediation: "0² = 0, and 0 IS ≤5 — so 0 MUST be included in the solution set: -2,-1,0,1,2, not skipping 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test positive integers", hint: "1²=1, 2²=4, 3²=9 — which are ≤5?" },
      { level: 2, description: "Test negative integers", hint: "Squaring removes the sign, so negative integers behave the same way as their positive counterparts." },
      { level: 3, description: "Don't forget zero", hint: "0²=0, which is ≤5 — include it too." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r16", order: 16, cluster: "X", clusterName: CLUSTER_NAMES.X,
    skillId: "EXTPOWID-02",
    question: "If \\(2^a = 8\\) and \\(3^b = 9\\), what is \\(a + b\\)?",
    options: [
      { text: "5", correct: true, feedback: "a=3, b=2." },
      { text: "6", correct: false, feedback: "3+2=5.", misconceptionId: "E-r16-a" },
      { text: "4", correct: false, feedback: "Incorrect.", misconceptionId: "E-r16-b" },
      { text: "3", correct: false, feedback: "Incorrect.", misconceptionId: "E-r16-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r16-a",
        description: "Student makes an arithmetic slip adding the two correctly-found exponents, landing on 6 instead of the correct 5.",
        rootCause: "Computation Error — the two exponents are found correctly but added incorrectly.",
        remediation: "Recompute: a=3 (since 2³=8) and b=2 (since 3²=9) — 3+2=5, not 6."
      },
      {
        misconceptionId: "E-r16-b",
        description: "Student finds one or both exponents incorrectly, leading to an incorrect sum of 4 instead of 5.",
        rootCause: "One Exponent Found Incorrectly — miscalculates either a or b before adding.",
        remediation: "Verify each exponent separately: 2^a=8 means a=3 (since 2³=8), and 3^b=9 means b=2 (since 3²=9) — 3+2=5, not 4."
      },
      {
        misconceptionId: "E-r16-c",
        description: "Student reports only one of the two exponents (like a=3) instead of adding both a and b together.",
        rootCause: "Second Exponent Omitted — finds one exponent but forgets to add the other.",
        remediation: "The question asks for a+b, not just a — a=3 and b=2, so a+b=3+2=5, not just a=3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find a", hint: "2^a=8 — what power of 2 gives 8?" },
      { level: 2, description: "Find b", hint: "3^b=9 — what power of 3 gives 9?" },
      { level: 3, description: "Add the two exponents", hint: "3 + 2 = ?" }
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

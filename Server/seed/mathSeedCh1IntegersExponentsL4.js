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
    skillId: "INTMUL-01",
    question: "\\((-4) \\times (-5) =\\)",
    options: [
      { text: "20", correct: true, feedback: "Correct." },
      { text: "-20", correct: false, feedback: "Negative × negative = positive.", misconceptionId: "E-w1-a" },
      { text: "9", correct: false, feedback: "You added.", misconceptionId: "E-w1-b" },
      { text: "-9", correct: false, feedback: "You added with wrong sign.", misconceptionId: "E-w1-c" }
    ],
    retryHint: "Two negatives make a positive.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student computes the magnitude correctly (20) but keeps a negative sign, not recognising that TWO negatives multiply to a positive.",
        rootCause: "Sign Rule Miscounted — doesn't correctly apply the even-negatives-give-positive rule.",
        remediation: "TWO negative factors (an even count) multiply to a POSITIVE result — (-4)×(-5)=20, not -20."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student adds the two numbers (-4+(-5)=-9, reported as 9) instead of multiplying them.",
        rootCause: "Operation Confused — performs addition instead of the required multiplication.",
        remediation: "The question asks for the PRODUCT (multiply), not the sum — (-4)×(-5)=20, not (-4)+(-5)=-9."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student adds the two numbers with the correct sign (-4+(-5)=-9) instead of multiplying them.",
        rootCause: "Operation Confused — performs addition instead of the required multiplication.",
        remediation: "The question asks for the PRODUCT (multiply), not the sum — (-4)×(-5)=20, not (-4)+(-5)=-9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the negative factors", hint: "-4 and -5 are both negative — that's two (even)." },
      { level: 2, description: "Determine the sign", hint: "An even number of negative factors gives a positive product." },
      { level: 3, description: "Compute the magnitude", hint: "4 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "w2", order: 2, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS,
    skillId: "ROOT-01",
    question: "\\(\\sqrt{121} =\\)",
    options: [
      { text: "11", correct: true, feedback: "Correct." },
      { text: "-11", correct: false, feedback: "Principal square root is positive.", misconceptionId: "E-w2-a" },
      { text: "60.5", correct: false, feedback: "You halved.", misconceptionId: "E-w2-b" }
    ],
    retryHint: "11² = 121.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student reports the negative root instead of the principal (non-negative) root that the √ symbol represents.",
        rootCause: "Principal Root Convention Not Applied — doesn't recognise that √ always denotes the non-negative root.",
        remediation: "The √ SYMBOL always means the PRINCIPAL (non-negative) root — √121=11, not -11, even though (-11)² also equals 121."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student divides the number by 2 instead of finding its square root, confusing 'root' with 'half'.",
        rootCause: "Root Operation Confused With Division — performs an unrelated halving operation instead of finding the square root.",
        remediation: "√121 asks 'what number times itself gives 121', not 'what is 121 divided by 2' — 11×11=121, so √121=11, not 60.5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a square root means", hint: "√121 asks: what number times itself gives 121?" },
      { level: 2, description: "Test candidate numbers", hint: "11×11 = ?" },
      { level: 3, description: "Confirm", hint: "Does 11×11 equal 121?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "w3", order: 3, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-01",
    question: "Write 45 as a product of primes.",
    options: [
      { text: "3² × 5", correct: true, feedback: "Correct." },
      { text: "5 × 9", correct: false, feedback: "9 is not prime.", misconceptionId: "E-w3-a" },
      { text: "3 × 15", correct: false, feedback: "15 is not prime.", misconceptionId: "E-w3-b" }
    ],
    retryHint: "45 = 3 × 15 = 3 × 3 × 5.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "5×9 IS a factor pair of 45, but 9 is NOT prime (9=3×3) — keep breaking down until every factor is prime: 45=3×3×5=3²×5, not 5×9."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student stops factoring once any two factors multiply to the target number, without checking that every factor is itself prime.",
        rootCause: "Factorisation Stopped Early — doesn't verify all factors are prime before stopping.",
        remediation: "3×15 IS a factor pair of 45, but 15 is NOT prime (15=3×5) — keep breaking down until every factor is prime: 45=3×3×5=3²×5, not 3×15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find any factor pair", hint: "45 = 3 × 15." },
      { level: 2, description: "Check if each factor is prime", hint: "3 is prime, but 15 is not — break 15 down further: 15=3×5." },
      { level: 3, description: "Write using index notation", hint: "3×3×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "w4", order: 4, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-01",
    question: "\\(2^4 =\\)",
    options: [
      { text: "16", correct: true, feedback: "Correct." },
      { text: "8", correct: false, feedback: "2³=8.", misconceptionId: "E-w4-a" },
      { text: "32", correct: false, feedback: "2⁵=32.", misconceptionId: "E-w4-b" }
    ],
    retryHint: "2×2×2×2 = 16.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student uses one fewer factor of 2 than needed, computing 2³=8 instead of 2⁴=16.",
        rootCause: "Exponent Off By One — multiplies the base one fewer time than the exponent specifies.",
        remediation: "2⁴ means 2 used as a factor FOUR times: 2×2×2×2=16, not three times (2×2×2=8, which is 2³)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student uses one extra factor of 2 than needed, computing 2⁵=32 instead of 2⁴=16.",
        rootCause: "Exponent Off By One — multiplies the base one extra time beyond what the exponent specifies.",
        remediation: "2⁴ means 2 used as a factor FOUR times: 2×2×2×2=16, not five times (2×2×2×2×2=32, which is 2⁵)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what an exponent means", hint: "2⁴ means 2 used as a factor 4 times." },
      { level: 2, description: "Write it as repeated multiplication", hint: "2 × 2 × 2 × 2." },
      { level: 3, description: "Compute", hint: "2×2=4, 4×2=8, 8×2=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w5", order: 5, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS,
    skillId: "ORDEROPS-01",
    question: "\\(10 - 3 \\times 2 =\\)",
    options: [
      { text: "4", correct: true, feedback: "Correct. 10 - 6 = 4." },
      { text: "14", correct: false, feedback: "You added before multiplying.", misconceptionId: "E-w5-a" },
      { text: "-16", correct: false, feedback: "Sign error.", misconceptionId: "E-w5-b" }
    ],
    retryHint: "Multiply first: 3×2=6.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student evaluates strictly left to right (10-3=7, then 7×2=14) instead of applying operator precedence.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "MULTIPLICATION happens before SUBTRACTION, regardless of left-to-right position — compute 3×2=6 first, then 10-6=4, not (10-3)×2=14."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student makes a sign error while combining the multiplication result with 10, landing on a large negative value.",
        rootCause: "Computation Error — mishandles the subtraction after correctly computing the multiplication.",
        remediation: "After computing 3×2=6, subtract from 10: 10-6=4, not -16 (which would come from an unrelated sign error, like -10-6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which operation comes first", hint: "Multiplication comes before subtraction." },
      { level: 2, description: "Compute the multiplication", hint: "3 × 2 = 6." },
      { level: 3, description: "Complete the subtraction", hint: "10 - 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "w6", order: 6, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB,
    skillId: "INTADD-01",
    question: "\\(-6 + (-2) =\\)",
    options: [
      { text: "-8", correct: true, feedback: "Correct." },
      { text: "8", correct: false, feedback: "You added absolute values and lost sign.", misconceptionId: "E-w6-a" },
      { text: "-4", correct: false, feedback: "You subtracted.", misconceptionId: "E-w6-b" }
    ],
    retryHint: "Adding a negative moves left.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student adds the magnitudes (6+2=8) but reports a positive result, dropping the negative sign that both numbers share.",
        rootCause: "Sign Dropped — computes the correct magnitude but loses track of the shared negative sign.",
        remediation: "BOTH numbers are negative — when adding two negatives, the result is ALSO negative: -6+(-2)=-8, not 8."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student subtracts the magnitudes (6-2=4) instead of adding them, applying the wrong operation.",
        rootCause: "Operation Confused — subtracts when the expression specifies addition.",
        remediation: "The expression is ADDITION of two negatives, not subtraction — -6+(-2)=-8 (combine the magnitudes: 6+2=8, keep the negative sign), not -6-2 treated differently to give -4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recognise both numbers are negative", hint: "-6 and -2 are both negative." },
      { level: 2, description: "Add their magnitudes", hint: "6 + 2 = 8." },
      { level: 3, description: "Apply the shared negative sign", hint: "Since both were negative, the sum is also negative: -8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "w7", order: 7, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS,
    skillId: "POWEXP-02",
    question: "\\((-3)^3 =\\)",
    options: [
      { text: "-27", correct: true, feedback: "Correct. Odd exponent preserves sign." },
      { text: "27", correct: false, feedback: "Sign error.", misconceptionId: "E-w7-a" },
      { text: "-9", correct: false, feedback: "3×3=9, then sign?", misconceptionId: "E-w7-b" }
    ],
    retryHint: "(-3)×(-3)×(-3) = -27.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student assumes any exponentiated negative number becomes positive, not distinguishing odd from even exponents.",
        rootCause: "Odd/Even Exponent Rule Not Applied — applies the even-exponent sign rule (negative→positive) to an odd exponent.",
        remediation: "An ODD exponent (like 3) KEEPS the negative sign — (-3)×(-3)×(-3)=-27, not 27 (which would result from an EVEN exponent like 2 or 4)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student multiplies the base by the exponent (-3×3=-9) instead of using the base as a repeated factor.",
        rootCause: "Exponent Misread As Multiplier — treats the exponent as something to multiply by rather than a repeat count.",
        remediation: "(-3)³ means -3 MULTIPLIED BY ITSELF three times ((-3)×(-3)×(-3)), not -3 times the exponent (-3×3) — the correct value is -27, not -9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write it as repeated multiplication", hint: "(-3) × (-3) × (-3)." },
      { level: 2, description: "Multiply the first two factors", hint: "(-3)×(-3) = 9." },
      { level: 3, description: "Multiply by the third factor", hint: "9 × (-3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "w8", order: 8, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME,
    skillId: "PRIMEFACT-02",
    question: "Find the HCF of 16 and 24.",
    options: [
      { text: "8", correct: true, feedback: "Correct." },
      { text: "4", correct: false, feedback: "Not the highest.", misconceptionId: "E-w8-a" },
      { text: "48", correct: false, feedback: "That's LCM.", misconceptionId: "E-w8-b" }
    ],
    retryHint: "16=2⁴, 24=2³×3; HCF=2³=8.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student identifies a common factor (4) but doesn't check whether a LARGER common factor also exists.",
        rootCause: "Not the Highest Common Factor — finds A common factor but not the HIGHEST one.",
        remediation: "4 IS a common factor, but it's not the HIGHEST — 8 is also common to both 16 and 24 (16÷8=2, 24÷8=3) and is larger than 4, so HCF=8, not 4."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student computes the LCM (48) instead of the HCF, confusing the two related concepts.",
        rootCause: "HCF Method Confused With LCM Method — computes the wrong one of the two related quantities.",
        remediation: "48 is the LCM (lowest common MULTIPLE) of 16 and 24, not the HCF (highest common FACTOR) — the HCF is 8, using the lowest shared power of common primes: 2³=8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "16=2⁴. 24=2³×3." },
      { level: 2, description: "Identify the common prime factors", hint: "Both share the prime 2." },
      { level: 3, description: "Use the lowest shared power", hint: "Lowest power of 2 shared: 2³ — what is 2³?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] }
];

const diagnosticItems = [
  { itemId: "d1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    skillId: "INTADD-03",
    question: "\\(-8 + 5 - (-2) =\\)",
    options: [
      { text: "-1", correct: true, feedback: "-8+5+2=-1." },
      { text: "-5", correct: false, feedback: "Check your signs.", misconceptionId: "E-d1-a" },
      { text: "-11", correct: false, feedback: "Check your signs.", misconceptionId: "E-d1-b" },
      { text: "1", correct: false, feedback: "Check your signs.", misconceptionId: "E-d1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student subtracts 2 instead of adding it, misreading -(-2) as -2, landing on -5 instead of -1.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "-(-2) means ADD 2, not subtract — -8+5=-3, then -3+2=-1, not -3-2=-5."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student treats every term as negative, computing -8-5-2=-15 or a similar variant, landing on -11.",
        rootCause: "Signs Not Tracked Per Term — loses track of which operations are addition versus subtraction.",
        remediation: "Track each operation separately: -8+5=-3 (this is ADDITION of 5), then -3-(-2)=-3+2=-1 (subtracting a negative) — not treating 5 as negative too."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student flips signs incorrectly, landing on a positive 1 instead of the correct -1.",
        rootCause: "Computation Error — a sign is mishandled somewhere in the calculation.",
        remediation: "Recompute carefully: -8+5=-3, then -3-(-2)=-3+2=-1, not 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the first two terms", hint: "-8 + 5 = -3." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-2) becomes +2." },
      { level: 3, description: "Complete the calculation", hint: "-3 + 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d2", order: 2, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    skillId: "POWEXP-05",
    question: "Simplify \\((2 \\times 5)^3\\).",
    options: [
      { text: "1000", correct: true, feedback: "(2×5)³ = 10³ = 1000. Also (ab)³ = a³b³ = 8×125 = 1000." },
      { text: "40", correct: false, feedback: "Check the exponent applies to the whole product.", misconceptionId: "E-d2-a" },
      { text: "250", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d2-b" },
      { text: "133", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student applies the exponent to only one factor (e.g., 2³×5=40) instead of the entire product inside the parentheses.",
        rootCause: "Exponent Applied to Only One Factor — doesn't recognise the exponent applies to the WHOLE bracketed expression.",
        remediation: "The exponent applies to the ENTIRE product (2×5), not just one factor — (2×5)³=10³=1000, not 2³×5=40 (which only cubes the 2)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student makes an arithmetic slip computing 10³ or an intermediate step, landing on 250 instead of the correct 1000.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2×5=10, then 10³=10×10×10=1000, not 250."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student makes an arithmetic slip computing 10³, landing on 133 instead of the correct 1000.",
        rootCause: "Computation Error — correct approach, but the arithmetic is carried out incorrectly.",
        remediation: "Recompute carefully: 2×5=10, then 10³=10×10×10=1000, not 133."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "2 × 5 = 10." },
      { level: 2, description: "Apply the exponent to the entire result", hint: "10³ means 10×10×10." },
      { level: 3, description: "Compute", hint: "10×10=100, then 100×10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d3", order: 3, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "ESTDIGIT-02",
    question: "How many trailing zeros does \\(2^{12} \\times 5^{10}\\) have?",
    options: [
      { text: "10", correct: true, feedback: "2¹²×5¹⁰ = 2²×(2¹⁰×5¹⁰)=4×10¹⁰ → 10 zeros." },
      { text: "12", correct: false, feedback: "Check your working.", misconceptionId: "E-d3-a" },
      { text: "22", correct: false, feedback: "You added the exponents; that's not the number of trailing zeros.", misconceptionId: "E-d3-b" },
      { text: "1", correct: false, feedback: "Check your working.", misconceptionId: "E-d3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student uses the exponent of 2 (12) directly as the trailing-zero count, without correctly pairing 2's and 5's into factors of 10.",
        rootCause: "Trailing Zero Count Confused With Raw Exponent — doesn't recognise that trailing zeros come from matched pairs of 2 and 5.",
        remediation: "Trailing zeros come from PAIRS of 2 and 5 (each pair makes a 10) — with 2¹² and 5¹⁰, only 10 PAIRS can be formed (limited by the smaller exponent, 10), giving 10 trailing zeros, not 12 (the exponent of 2 alone)."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student adds the two exponents (12+10=22) as if that directly gave the number of trailing zeros.",
        rootCause: "Exponent Sum Confused With Trailing Zero Count — treats the sum of the original exponents as if it directly gave the number of zeros.",
        remediation: "Adding 12+10=22 is NOT the number of trailing zeros — instead, find how many PAIRS of (2,5) can be formed: min(12,10)=10 pairs, giving 10 trailing zeros, not 22."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student drastically undercounts, perhaps confusing this with a single power of 10 instead of correctly combining the powers.",
        rootCause: "Power Combination Not Correctly Worked Through — doesn't correctly factor the expression into a power of 10 with leftover factors.",
        remediation: "Work through the combination: 2¹²×5¹⁰=2²×(2¹⁰×5¹⁰)=4×10¹⁰ — the 10¹⁰ contributes 10 trailing zeros (the leftover 4 doesn't add more), not just 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify how many pairs of 2 and 5 can be formed", hint: "With 2¹² and 5¹⁰, the limiting factor is the smaller exponent: 10." },
      { level: 2, description: "Combine those pairs into a power of 10", hint: "2¹⁰×5¹⁰=10¹⁰." },
      { level: 3, description: "Account for the leftover factors", hint: "2¹²÷2¹⁰=2² leftover — does this add more trailing zeros?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d4", order: 4, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "T",
    skillId: "ORDEROPS-05",
    question: "Evaluate: \\(-3^2 + 4 \\times 2\\)",
    options: [
      { text: "-1", correct: true, feedback: "-3² = -9; 4×2=8; -9+8=-1. Trap: -3² is -(3²)." },
      { text: "17", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-d4-a" },
      { text: "-2", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d4-b" },
      { text: "2", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student treats -3² as if the parentheses were around -3, computing (-3)²=9 instead of -(3²)=-9, leading to 9+8=17.",
        rootCause: "Sign Scope Confused — assumes the negative sign is part of the base being squared, without parentheses to justify that.",
        remediation: "Without parentheses, -3² means -(3²)=-9 (the negative applies AFTER squaring), not (-3)²=9 — this changes the final answer to -9+8=-1, not 9+8=17."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student makes an arithmetic slip while combining -9 and 8, landing on -2 instead of the correct -1.",
        rootCause: "Computation Error — correct approach, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: -3²=-9, 4×2=8, then -9+8=-1, not -2."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student makes an arithmetic slip while combining -9 and 8, landing on 2 instead of the correct -1.",
        rootCause: "Computation Error — correct approach, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: -3²=-9, 4×2=8, then -9+8=-1, not 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the exponent, noting no parentheses around -3", hint: "-3² means -(3²) = -9." },
      { level: 2, description: "Compute the multiplication", hint: "4 × 2 = 8." },
      { level: 3, description: "Add", hint: "-9 + 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "S",
    skillId: "ROOT-06",
    question: "\\(\\sqrt{64} + \\sqrt[3]{-8} =\\)",
    options: [
      { text: "6", correct: true, feedback: "8 + (-2) = 6." },
      { text: "10", correct: false, feedback: "Check the sign of the cube root.", misconceptionId: "E-d5-a" },
      { text: "-6", correct: false, feedback: "Check your signs.", misconceptionId: "E-d5-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student drops the negative sign on the cube root, adding 8+2=10 instead of 8+(-2)=6.",
        rootCause: "Sign of Cube Root Dropped — treats the negative cube root as if it were positive before adding.",
        remediation: "³√(-8)=-2 is NEGATIVE, not positive — keep the sign when adding: 8+(-2)=6, not 8+2=10 (which incorrectly treats -2 as +2)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student assumes both roots should be negative, perhaps making √64 negative, landing on -6 instead of the correct 6.",
        rootCause: "Principal Root Convention Not Applied — incorrectly makes the square root term negative when it should be positive.",
        remediation: "√64=8 is POSITIVE (the principal root is always non-negative) — only the cube root (³√(-8)=-2) is negative; the sum is 8+(-2)=6, not -6 (which treats both as negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate the square root", hint: "√64 = 8." },
      { level: 2, description: "Evaluate the cube root", hint: "³√(-8) = -2 (since (-2)³=-8)." },
      { level: 3, description: "Add the two results", hint: "8 + (-2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "d6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    skillId: "PRIMEFACT-05",
    question: "How many distinct prime factors does 60 have?",
    options: [
      { text: "3", correct: true, feedback: "60 = 2×2×3×5; distinct: 2,3,5." },
      { text: "4", correct: false, feedback: "Count only distinct primes, not repeats.", misconceptionId: "E-d6-a" },
      { text: "2", correct: false, feedback: "You missed a prime factor.", misconceptionId: "E-d6-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student counts the repeated factor of 2 twice, treating 60's full factorisation (2,2,3,5) as 4 distinct primes instead of 3.",
        rootCause: "Repeated Factor Counted Twice — counts a prime once for each occurrence instead of once per distinct value.",
        remediation: "60=2×2×3×5 has FOUR total factors, but only THREE are DISTINCT (unique) primes: 2, 3, and 5 — the repeated 2 is still just ONE distinct prime, not counted twice."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student stops the prime factorisation too early, missing one of the three distinct primes (2, 3, or 5).",
        rootCause: "Factorisation Incomplete — stops dividing before fully breaking the number into all its prime factors.",
        remediation: "Fully divide out: 60÷2=30, 30÷2=15, 15÷3=5, 5÷5=1 — the DISTINCT primes used are 2, 3, and 5, that's THREE, not two."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the full prime factorisation", hint: "60 = 2×2×3×5." },
      { level: 2, description: "Identify the unique (distinct) primes", hint: "2, 3, and 5 — even though 2 appears twice, it's still one distinct prime." },
      { level: 3, description: "Count the distinct primes", hint: "How many different prime numbers appear?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d7", order: 7, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "EXTALG-01",
    question: "If \\(x = -2\\), evaluate \\(2x^2 - 3x + 1\\).",
    options: [
      { text: "15", correct: true, feedback: "2×4 + 6 + 1 = 15." },
      { text: "-1", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d7-a" },
      { text: "7", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d7-b" },
      { text: "-9", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student mishandles the sign of x² or -3x, leading to a total that's off by a large amount, landing on -1.",
        rootCause: "Sign Error In Substitution — doesn't correctly track signs when substituting a negative value.",
        remediation: "Compute each term carefully: x²=(-2)²=4 (positive, even exponent), 2x²=2×4=8; -3x=-3×(-2)=6 (positive, since two negatives multiply to positive) — total: 8+6+1=15, not -1."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student computes only part of the expression, perhaps forgetting one term, landing on 7 instead of the correct 15.",
        rootCause: "Term Omitted — drops one of the three terms in the expression during evaluation.",
        remediation: "The expression has THREE terms: 2x², -3x, AND +1 — you must include ALL of them: 8+6+1=15, not just two of them summing to 7."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student mishandles the sign of -3x, treating it as negative when it should be positive (since x is negative), landing on -9.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the sign when substituting a negative value into -3x.",
        remediation: "-3x with x=-2 means -3×(-2)=6 (POSITIVE, since two negatives make a positive) — the full computation is 8+6+1=15, not 8-6+1... leading to a negative total like -9 (check your sign on the -3x term)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute x² and 2x²", hint: "(-2)²=4, so 2x²=2×4=8." },
      { level: 2, description: "Compute -3x", hint: "-3×(-2)=6 (positive, since two negatives make a positive)." },
      { level: 3, description: "Add all three terms", hint: "8 + 6 + 1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d8", order: 8, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "C",
    skillId: "INTMUL-02",
    question: "\\((-2) \\times 3 \\times (-4) \\div (-6) =\\)",
    options: [
      { text: "-4", correct: true, feedback: "24 ÷ (-6) = -4." },
      { text: "4", correct: false, feedback: "Check your signs.", misconceptionId: "E-d8-a" },
      { text: "-2", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d8-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student correctly computes the magnitude but drops the final negative sign, landing on 4 instead of -4.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last division step.",
        remediation: "Compute step by step, tracking signs: (-2)×3=-6, ×(-4)=24, then 24÷(-6)=-4 (positive divided by negative is negative), not 4."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student makes an arithmetic slip in one of the multi-step operations, landing on -2 instead of the correct -4.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-2)×3=-6, ×(-4)=24, then 24÷(-6)=-4, not -2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the first two factors", hint: "(-2) × 3 = -6." },
      { level: 2, description: "Multiply by the third factor", hint: "-6 × (-4) = 24." },
      { level: 3, description: "Divide by the last factor", hint: "24 ÷ (-6) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d9", order: 9, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "S",
    skillId: "POWEXP-11",
    question: "\\(2^3 \\times 2^4 =\\)",
    options: [
      { text: "2⁷", correct: true, feedback: "Add exponents: 3+4=7." },
      { text: "2¹²", correct: false, feedback: "You multiplied the exponents; add them instead.", misconceptionId: "E-d9-a" },
      { text: "6⁷", correct: false, feedback: "The base stays the same; only exponents add.", misconceptionId: "E-d9-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student multiplies the exponents (3×4=12) instead of adding them when multiplying two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the ADD-exponents rule (for multiplying same-base powers).",
        remediation: "When MULTIPLYING two powers with the SAME base, ADD the exponents: 2³×2⁴=2^(3+4)=2⁷ — multiplying them (3×4=12) would be the rule for a power raised to another power, like (2³)⁴, not for this expression."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student multiplies the bases together (2×3=6, treating the exponents as separate numbers) instead of keeping the base the same and adding exponents.",
        rootCause: "Base Incorrectly Combined — changes the base instead of keeping it the same and adding the exponents.",
        remediation: "The BASE stays the SAME (2) when multiplying same-base powers — only the EXPONENTS add: 2³×2⁴=2⁷, not 6⁷ (which incorrectly changes the base by combining it with an exponent)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base 2." },
      { level: 2, description: "Recall the product-of-powers rule", hint: "Add the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "3 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "d10", order: 10, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    skillId: "ESTROOT-02",
    question: "Estimate \\(\\sqrt{82}\\) to the nearest integer.",
    options: [
      { text: "9", correct: true, feedback: "9²=81, very close to 82." },
      { text: "8", correct: false, feedback: "8²=64, too far.", misconceptionId: "E-d10-a" },
      { text: "10", correct: false, feedback: "10²=100, too far.", misconceptionId: "E-d10-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student rounds down to 8 without checking that 82 is actually much closer to 9²=81 than to 8²=64.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 82-64=18 (distance to 8²), while 82-81=1 (distance to 9²) — 82 is MUCH closer to 81, so √82≈9, not 8."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student rounds up to 10 without checking that 82 is actually much closer to 9²=81 than to 10²=100.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 100-82=18 (distance to 10²), while 82-81=1 (distance to 9²) — 82 is MUCH closer to 81, so √82≈9, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "9²=81, 8²=64, 10²=100." },
      { level: 2, description: "Compare the distances to 82", hint: "82-81=1, which is much smaller than 82-64=18 or 100-82=18." },
      { level: 3, description: "Choose the closest perfect square", hint: "Which perfect square (64, 81, or 100) is closest to 82?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "T",
    skillId: "INTADDMULT-01",
    question: "\\(-4 - (-3) + (-2) \\times 2 =\\)",
    options: [
      { text: "-5", correct: true, feedback: "-4+3-4=-5. Trap: multiplication before addition." },
      { text: "-3", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-d11-a" },
      { text: "-9", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d11-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student evaluates strictly left to right, computing -4-(-3)+(-2)=-3, then multiplying by 2 at the end, instead of applying multiplication before addition/subtraction.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "MULTIPLICATION happens BEFORE addition/subtraction — compute (-2)×2=-4 first, THEN combine: -4-(-3)+(-4)=-4+3-4=-5, not treating it as a simple left-to-right chain giving -3."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student makes a sign error somewhere in the calculation, perhaps mishandling -(-3) or the multiplication, landing on -9.",
        rootCause: "Sign Error During Multi-Step Calculation — a sign is mishandled somewhere in the expression.",
        remediation: "Recompute step by step: -4-(-3)=-4+3=-1, then (-2)×2=-4, then -1+(-4)=-5, not -9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the multiplication first", hint: "(-2) × 2 = -4." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-3) becomes +3." },
      { level: 3, description: "Combine all terms in order", hint: "-4 + 3 + (-4) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d12", order: 12, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "H",
    skillId: "PRIMEFACT-06",
    question: "Find the smallest positive integer that has exactly 10 factors.",
    options: [
      { text: "48", correct: true, feedback: "48=2⁴×3 → (4+1)(1+1)=10." },
      { text: "36", correct: false, feedback: "36 has 9 factors.", misconceptionId: "E-d12-a" },
      { text: "60", correct: false, feedback: "60 has 12 factors.", misconceptionId: "E-d12-b" },
      { text: "16", correct: false, feedback: "You multiplied exponents: 4×1=4, 2⁴=16. Factor counting requires adding 1 to each exponent and multiplying.", misconceptionId: "E-d12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student picks 36=2²×3², which actually has 9 factors, not 10.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 10 factors.",
        remediation: "Count the factors of 36=2²×3²: using the formula (2+1)(2+1)=9 factors, not 10 — 36 doesn't satisfy the condition; 48=2⁴×3 has (4+1)(1+1)=10 factors, which does."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student correctly finds a number with 12 factors (60) but confuses it with the target of exactly 10 factors.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 10 factors (not 12).",
        remediation: "Count the factors of 60=2²×3×5: using the formula (2+1)(1+1)(1+1)=12 factors, not 10 — 60 doesn't satisfy the condition; 48=2⁴×3 has (4+1)(1+1)=10 factors, which does."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student multiplies the exponents together (4×1=4) and uses that as a new single exponent on 2 (2⁴=16), instead of correctly applying the divisor-counting formula.",
        rootCause: "Divisor-Count Formula Misapplied — confuses 'multiply the exponents' with the correct formula of 'add 1 to each exponent, then multiply'.",
        remediation: "The number of factors is found by ADDING 1 to EACH exponent, THEN multiplying those results — for a number with exponents 4 and 1: (4+1)×(1+1)=5×2=10 factors, giving 2⁴×3=48, not multiplying the exponents directly (4×1=4) and using THAT as a new exponent on 2 (2⁴=16, which is unrelated to the factor count)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the ways to factor 10 for the divisor-count formula", hint: "10 = 10×1, or 5×2." },
      { level: 2, description: "Build the smallest number for each factoring", hint: "10×1 → p⁹=512. 5×2 → p⁴q=2⁴×3=48." },
      { level: 3, description: "Choose the smaller candidate", hint: "Which is smaller, 512 or 48?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d13", order: 13, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "S",
    skillId: "ORDEROPS-02",
    question: "\\(6 + 2 \\times (5 - 3) =\\)",
    options: [
      { text: "10", correct: true, feedback: "6+2×2=10." },
      { text: "16", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-d13-a" },
      { text: "8", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d13-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student adds 6+2 before handling the parentheses, computing 8×(5-3)=16 instead of following the correct order.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "PARENTHESES come first: 5-3=2, then MULTIPLICATION: 2×2=4, THEN addition: 6+4=10 — not adding 6+2 first (which would incorrectly give (6+2)×(5-3)=16)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student makes an arithmetic slip in the final addition, landing on 8 instead of the correct 10.",
        rootCause: "Computation Error — correct approach, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: 5-3=2, 2×2=4, then 6+4=10, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "5 - 3 = 2." },
      { level: 2, description: "Compute the multiplication", hint: "2 × 2 = 4." },
      { level: 3, description: "Complete the addition", hint: "6 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d14", order: 14, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    skillId: "ESTROOT-01",
    question: "Between which two integers does \\(\\sqrt{150}\\) lie?",
    options: [
      { text: "12 and 13", correct: true, feedback: "12²=144, 13²=169." },
      { text: "11 and 12", correct: false, feedback: "11²=121, too low.", misconceptionId: "E-d14-a" },
      { text: "13 and 14", correct: false, feedback: "13²=169, already above 150.", misconceptionId: "E-d14-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student picks a lower pair of consecutive integers (11 and 12) whose squares (121 and 144) don't actually bracket 150.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 150 falls between the squares of its endpoints.",
        remediation: "Check: 11²=121 and 12²=144 — 150 is NOT between 121 and 144 (150>144) — instead check 12²=144 and 13²=169: 150 IS between 144 and 169, so √150 is between 12 and 13."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student picks an upper pair of consecutive integers (13 and 14) whose squares (169 and 196) don't actually bracket 150.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 150 falls between the squares of its endpoints.",
        remediation: "Check: 13²=169 and 14²=196 — 150 is NOT between 169 and 196 (150<169) — instead check 12²=144 and 13²=169: 150 IS between 144 and 169, so √150 is between 12 and 13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate roughly where √150 falls", hint: "150 is between 144 and 169, both perfect squares." },
      { level: 2, description: "Check the perfect squares nearby", hint: "12²=144, 13²=169." },
      { level: 3, description: "Confirm which pair brackets 150", hint: "Is 150 between 144 and 169?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d21", order: 15, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    skillId: "INTADD-14",
    question: "The temperature at dawn was -5°C. By noon it had risen 12°C, then dropped 8°C by evening. What was the evening temperature?",
    options: [
      { text: "-1°C", correct: true, feedback: "-5 + 12 - 8 = -1." },
      { text: "15°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-d21-a" },
      { text: "-25°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-d21-b" },
      { text: "-9°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-d21-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student adds all the magnitudes together (5+12+8=25, or drops the starting negative to get 15) instead of correctly tracking each change's direction.",
        rootCause: "Direction of Change Not Tracked — treats 'rise' and 'drop' as if they were both additions, ignoring the starting negative temperature.",
        remediation: "Start at -5°C, then RISE 12°C (add): -5+12=7, then DROP 8°C (subtract): 7-8=-1 — not simply adding all magnitudes together to get 15 (which ignores the starting negative and the drop's direction)."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student treats both the rise and the drop as decreases, subtracting both from the starting temperature, landing on -25.",
        rootCause: "Direction of Change Not Tracked — treats a 'rise' as a decrease instead of an increase.",
        remediation: "A 'rise' of 12°C means ADD 12, not subtract — start at -5, rise 12: -5+12=7, then drop 8: 7-8=-1, not -5-12-8=-25 (which incorrectly treats the rise as a drop too)."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student makes an error in one of the two steps, perhaps computing the rise or drop incorrectly, landing on -9.",
        rootCause: "Computation Error — one of the addition or subtraction steps is carried out incorrectly.",
        remediation: "Recompute step by step: -5+12=7 (after the rise), then 7-8=-1 (after the drop), not -9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Start with the dawn temperature", hint: "-5°C." },
      { level: 2, description: "Apply the rise", hint: "-5 + 12 = 7." },
      { level: 3, description: "Apply the drop", hint: "7 - 8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d15", order: 16, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    skillId: "INTMUL-02",
    question: "\\((-5) \\div 5 \\times (-2) =\\)",
    options: [
      { text: "2", correct: true, feedback: "-1 × -2 = 2." },
      { text: "-2", correct: false, feedback: "Check your signs.", misconceptionId: "E-d15-a" },
      { text: "0", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d15-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student correctly computes the magnitude but drops the sign flip from the final multiplication, landing on -2 instead of 2.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last multiplication step.",
        remediation: "Compute step by step: (-5)÷5=-1, then -1×(-2)=2 (negative times negative is positive), not -2."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student assumes the expression somehow evaluates to zero, perhaps confusing this with an unrelated property.",
        rootCause: "Result Value Not Actually Computed — assumes a value without working through the calculation.",
        remediation: "Work through the actual computation: (-5)÷5=-1, then -1×(-2)=2 — this is a real, nonzero result, not 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the division first (left to right)", hint: "(-5) ÷ 5 = -1." },
      { level: 2, description: "Determine the sign of the multiplication", hint: "-1 (negative) × (-2) will be positive." },
      { level: 3, description: "Compute", hint: "1 × 2 = ? (then apply the positive sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d16", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    skillId: "PRIMEFACT-03",
    question: "Find the LCM of 10 and 15.",
    options: [
      { text: "30", correct: true, feedback: "10=2×5, 15=3×5; LCM=2×3×5=30." },
      { text: "5", correct: false, feedback: "That's the HCF, not the LCM.", misconceptionId: "E-d16-a" },
      { text: "150", correct: false, feedback: "That's the product, not the LCM.", misconceptionId: "E-d16-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student computes the HCF (5) instead of the LCM, confusing the two related concepts.",
        rootCause: "HCF Method Confused With LCM Method — computes the wrong one of the two related quantities.",
        remediation: "5 is the HCF (highest common FACTOR) of 10 and 15, not the LCM (lowest common MULTIPLE) — the LCM is 30, using the highest power of every prime: 2×3×5=30."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student multiplies the two original numbers together (10×15=150) instead of using prime factorisation to find the actual LCM.",
        rootCause: "LCM Approximated as Product of the Two Numbers — assumes the LCM is always the product of the numbers, ignoring shared factors.",
        remediation: "The LCM is NOT simply the product of the two numbers — since 10 and 15 share a common factor (5), the actual LCM (30) is smaller than their product (150); use prime factorisation: 2×3×5=30, not 150."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "10=2×5. 15=3×5." },
      { level: 2, description: "Identify every prime that appears in either number", hint: "The primes involved are 2, 3, and 5." },
      { level: 3, description: "Use the highest power of each prime", hint: "2×3×5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "d17", order: 18, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "EXTALG-01",
    question: "If \\(a=-1, b=2, c=-3\\), evaluate \\(a^2 b - b c^2\\).",
    options: [
      { text: "-16", correct: true, feedback: "1×2 - 2×9 = 2 - 18 = -16." },
      { text: "20", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d17-a" },
      { text: "-20", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d17-b" },
      { text: "16", correct: false, feedback: "Check your substitution.", misconceptionId: "E-d17-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student mishandles a sign in the bc² term, treating -bc² as +bc², landing on a positive 20 instead of the correct -16.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the sign of the subtraction term.",
        remediation: "The expression is a²b MINUS bc² — a²b=1×2=2, bc²=2×9=18, so the result is 2-18=-16, not 2+18=20 (which incorrectly adds instead of subtracts)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student computes a²b with the wrong sign, treating a² as negative, leading to -20 instead of the correct -16.",
        rootCause: "Even Exponent Sign Error — incorrectly keeps a negative sign on a²=(-1)², which should be positive.",
        remediation: "a²=(-1)²=1 is POSITIVE (even exponent) — a²b=1×2=2 (positive), and bc²=2×9=18, so the result is 2-18=-16, not -2-18=-20 (which incorrectly treats a²b as negative)."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student mishandles the sign of the bc² term, computing a²b+bc² instead of a²b-bc², or otherwise makes an error leading to 16.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the subtraction in the expression.",
        remediation: "Recompute carefully: a²b=1×2=2, bc²=2×9=18, then a²b-bc²=2-18=-16, not 16 (check that you're subtracting bc², not adding a mis-signed version of it)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute a²b", hint: "a²=(-1)²=1, so a²b=1×2=2." },
      { level: 2, description: "Compute bc²", hint: "c²=(-3)²=9, so bc²=2×9=18." },
      { level: 3, description: "Subtract", hint: "2 - 18 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "d18", order: 19, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    skillId: "ESTROUND-03",
    question: "Estimate \\(\\frac{98 \\times 21}{49}\\) by rounding to 1 s.f.",
    options: [
      { text: "40", correct: true, feedback: "100×20÷50 = 40." },
      { text: "30", correct: false, feedback: "Check your rounding.", misconceptionId: "E-d18-a" },
      { text: "50", correct: false, feedback: "Check your rounding.", misconceptionId: "E-d18-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student rounds one of the numbers incorrectly or makes a calculation error, landing on 30 instead of the correct 40.",
        rootCause: "Rounding or Computation Error — one of the rounding or arithmetic steps is carried out incorrectly.",
        remediation: "Round each number to 1 significant figure: 98≈100, 21≈20, 49≈50 — then compute (100×20)÷50=2000÷50=40, not 30."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student rounds one of the numbers incorrectly or makes a calculation error, landing on 50 instead of the correct 40.",
        rootCause: "Rounding or Computation Error — one of the rounding or arithmetic steps is carried out incorrectly.",
        remediation: "Round each number to 1 significant figure: 98≈100, 21≈20, 49≈50 — then compute (100×20)÷50=2000÷50=40, not 50."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to 1 significant figure", hint: "98≈100, 21≈20, 49≈50." },
      { level: 2, description: "Multiply the rounded numerator values", hint: "100 × 20 = 2000." },
      { level: 3, description: "Divide by the rounded denominator", hint: "2000 ÷ 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "d23", order: 20, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    skillId: "INTADD-07",
    question: "Which statement about -5 and -3 is true?",
    options: [
      { text: "-5 < -3", correct: true, feedback: "On the number line, -5 is to the left of -3, so it is smaller." },
      { text: "-5 > -3", correct: false, feedback: "-5 is further left, so it is smaller.", misconceptionId: "E-d23-a" },
      { text: "-5 = -3", correct: false, feedback: "They are different numbers.", misconceptionId: "E-d23-b" },
      { text: "-5 ≥ -3", correct: false, feedback: "-5 is not greater than or equal to -3.", misconceptionId: "E-d23-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student compares the magnitudes (5>3) and concludes -5>-3, not accounting for the fact that larger magnitude negative numbers are actually SMALLER.",
        rootCause: "Magnitude Comparison Applied Without Sign Adjustment — compares absolute values directly instead of considering the negative sign's effect on ordering.",
        remediation: "For NEGATIVE numbers, a LARGER magnitude means a SMALLER value — since |-5|=5 is larger than |-3|=3, -5 is actually further left on the number line and therefore SMALLER: -5<-3, not -5>-3."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student assumes -5 and -3 are equal, perhaps not fully distinguishing between the two distinct negative values.",
        rootCause: "Values Not Actually Compared — fails to notice the numbers are different.",
        remediation: "-5 and -3 are two DIFFERENT numbers, not equal — on the number line, -5 is to the left of -3, so -5<-3, not -5=-3."
      },
      {
        misconceptionId: "E-d23-c",
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
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d24", order: 21, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    skillId: "INTADD-05",
    question: "How far apart are -3 and 4 on the number line?",
    options: [
      { text: "7", correct: true, feedback: "Distance from -3 to 4 is 7 units." },
      { text: "-7", correct: false, feedback: "Distance is always positive.", misconceptionId: "E-d24-a" },
      { text: "1", correct: false, feedback: "Check your subtraction.", misconceptionId: "E-d24-b" },
      { text: "-1", correct: false, feedback: "Distance is always positive.", misconceptionId: "E-d24-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student computes the directed (signed) difference correctly in magnitude but reports a negative value for distance.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "Distance is ALWAYS non-negative — take the absolute value of the difference: |-3-4|=|-7|=7, not -7."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student makes an arithmetic slip while subtracting the two numbers, landing on 1 instead of the correct 7.",
        rootCause: "Computation Error — the subtraction itself is carried out incorrectly.",
        remediation: "Recompute carefully: -3-4=-7, so the distance is |-7|=7, not 1."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student correctly computes a directed difference but gets the wrong magnitude and doesn't take the absolute value.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "The distance is the ABSOLUTE VALUE of the difference between the two points — |-3-4|=|-7|=7, not -1 (which is neither the correct magnitude nor non-negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between the two points", hint: "-3 - 4 = -7." },
      { level: 2, description: "Take the absolute value", hint: "Distance is always non-negative." },
      { level: 3, description: "Compute", hint: "|-7| = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "d22", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    skillId: "ROOT-05",
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{16+9} = 5\\)", correct: true, feedback: "16+9=25, √25=5." },
      { text: "\\(\\sqrt{16+9} = 7\\)", correct: false, feedback: "The square root does not distribute over addition.", misconceptionId: "E-d22-a" },
      { text: "\\(\\sqrt{16+9} = 12\\)", correct: false, feedback: "Multiplication does not apply here either.", misconceptionId: "E-d22-b" },
      { text: "\\(\\sqrt{16+9} = 25\\)", correct: false, feedback: "You forgot to take the square root.", misconceptionId: "E-d22-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student distributes the square root over the addition, computing √16+√9 instead of √(16+9).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — treats √(a+b) as if it equalled √a+√b.",
        remediation: "The square root does NOT distribute over addition — √(16+9) means take the square root of the SUM (16+9=25, √25=5), not the sum of the individual square roots (√16+√9=4+3=7)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student incorrectly distributes the square root as if it worked like multiplication, computing √16×√9 instead of √(16+9).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — applies a rule that only works for multiplication (√(ab)=√a×√b) to an addition expression.",
        remediation: "√(a+b) does NOT equal √a×√b — that distribution rule only applies to MULTIPLICATION inside the root (√(ab)=√a×√b), not addition; √(16+9)=√25=5, not √16×√9=12."
      },
      {
        misconceptionId: "E-d22-c",
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
  { itemId: "d19", order: 23, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    skillId: "INTMUL-02",
    question: "\\((-3) \\times 5 \\div (-1) =\\)",
    options: [
      { text: "15", correct: true, feedback: "-15 ÷ -1 = 15." },
      { text: "-15", correct: false, feedback: "Check your signs.", misconceptionId: "E-d19-a" },
      { text: "-8", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d19-b" },
      { text: "8", correct: false, feedback: "Check your calculation.", misconceptionId: "E-d19-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student correctly computes (-3)×5=-15 but forgets to divide by (-1), reporting the intermediate result.",
        rootCause: "Division Step Omitted or Sign Not Flipped — stops after the multiplication without completing the division.",
        remediation: "You must ALSO divide by (-1) — dividing -15 by -1 flips the sign to POSITIVE: -15÷(-1)=15, not just -15 (the multiplication result alone)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student makes an arithmetic slip somewhere in the calculation, landing on -8 instead of the correct 15.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-3)×5=-15, then -15÷(-1)=15, not -8."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an arithmetic slip somewhere in the calculation, landing on 8 instead of the correct 15.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-3)×5=-15, then -15÷(-1)=15, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the multiplication first (left to right)", hint: "(-3) × 5 = -15." },
      { level: 2, description: "Determine the sign of the division", hint: "-15 (negative) ÷ (-1) will be positive." },
      { level: 3, description: "Compute", hint: "15 ÷ 1 = ? (then apply the positive sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "d20", order: 24, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    skillId: "POWEXP-08",
    question: "Which is equal to \\(4^3\\)?",
    options: [
      { text: "2⁶", correct: true, feedback: "4=2², so 4³=(2²)³=2⁶=64." },
      { text: "2⁵", correct: false, feedback: "Check the exponent rule for powers of a power.", misconceptionId: "E-d20-a" },
      { text: "4⁴", correct: false, feedback: "Check your working.", misconceptionId: "E-d20-b" },
      { text: "12", correct: false, feedback: "You multiplied the base by the exponent: 4×3=12.", misconceptionId: "E-d20-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student adds the exponents (2+3=5) instead of multiplying them when rewriting 4³ as a power of 2.",
        rootCause: "Exponent Rule Confused — applies the ADD-exponents rule (for multiplying same-base powers) instead of the MULTIPLY-exponents rule (for a power raised to another power).",
        remediation: "For a POWER raised to ANOTHER POWER, MULTIPLY the exponents: 4³=(2²)³=2^(2×3)=2⁶ — adding them (2+3=5) would be the rule for MULTIPLYING two separate powers with the same base, not for this expression."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student changes the exponent without correctly converting the base to 2, landing on 4⁴ instead of the correctly rewritten 2⁶.",
        rootCause: "Base Conversion Not Applied — doesn't rewrite 4 as a power of 2 before combining exponents.",
        remediation: "Rewrite 4 as 2² FIRST, then apply the power-of-a-power rule: 4³=(2²)³=2⁶=64 — not simply changing the exponent on the original base 4 (4⁴=256, unrelated)."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student multiplies the base by the exponent (4×3=12) instead of using the base as a repeated factor.",
        rootCause: "Exponent Misread As Multiplier — treats the exponent as something to multiply by rather than a repeat count.",
        remediation: "4³ means 4 MULTIPLIED BY ITSELF three times (4×4×4=64), not 4 times the exponent (4×3=12) — rewritten with base 2: 4³=2⁶=64, not 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 4 as a power of 2", hint: "4 = 2²." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "4³ = (2²)³ = 2^(2×3)." },
      { level: 3, description: "Confirm the new exponent", hint: "2 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] }
];

const recheckItems = [
  { itemId: "r1", order: 1, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    skillId: "INTADD-03",
    question: "\\(-9 + 6 - (-3) =\\)",
    options: [
      { text: "0", correct: true, feedback: "-9+6+3=0." },
      { text: "-6", correct: false, feedback: "Check your signs.", misconceptionId: "E-r1-a" },
      { text: "-12", correct: false, feedback: "Check your signs.", misconceptionId: "E-r1-b" },
      { text: "6", correct: false, feedback: "Check your signs.", misconceptionId: "E-r1-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student subtracts 3 instead of adding it, misreading -(-3) as -3, landing on -6 instead of 0.",
        rootCause: "Double-Negative Rule Not Applied — misses that subtracting a negative flips to addition.",
        remediation: "-(-3) means ADD 3, not subtract — -9+6=-3, then -3+3=0, not -3-3=-6."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student treats every term as negative, computing -9-6-3=-18 or a similar variant, landing on -12.",
        rootCause: "Signs Not Tracked Per Term — loses track of which operations are addition versus subtraction.",
        remediation: "Track each operation separately: -9+6=-3 (ADDITION of 6), then -3-(-3)=-3+3=0 (subtracting a negative) — not treating 6 as negative too."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student flips signs incorrectly, landing on a positive 6 instead of the correct 0.",
        rootCause: "Computation Error — a sign is mishandled somewhere in the calculation.",
        remediation: "Recompute carefully: -9+6=-3, then -3-(-3)=-3+3=0, not 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the first two terms", hint: "-9 + 6 = -3." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-3) becomes +3." },
      { level: 3, description: "Complete the calculation", hint: "-3 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r2", order: 2, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    skillId: "POWEXP-05",
    question: "Simplify \\((3 \\times 4)^2\\).",
    options: [
      { text: "144", correct: true, feedback: "12² = 144. Also (3×4)² = 3²×4² = 9×16 = 144." },
      { text: "48", correct: false, feedback: "Check the exponent applies to the whole product.", misconceptionId: "E-r2-a" },
      { text: "36", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r2-b" },
      { text: "25", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r2-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student applies the exponent to only one factor (e.g., 3²×4=36 or 3×4²=48) instead of the entire product inside the parentheses.",
        rootCause: "Exponent Applied to Only One Factor — doesn't recognise the exponent applies to the WHOLE bracketed expression.",
        remediation: "The exponent applies to the ENTIRE product (3×4), not just one factor — (3×4)²=12²=144, not 3×4²=48 (which only squares the 4)."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student squares only the first factor (3²=9, then forgets or mishandles the 4), landing on 36 instead of 144.",
        rootCause: "Exponent Applied to Only One Factor — doesn't recognise the exponent applies to the WHOLE bracketed expression.",
        remediation: "The exponent applies to the ENTIRE product (3×4), not just the 3 — (3×4)²=12²=144, not 3²×4=36 (which only squares the 3)."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student forgets the exponent and just multiplies 3×4=12, or makes another slip, landing on 25 instead of the correct 144.",
        rootCause: "Exponent Omitted Entirely — evaluates the inside of the parentheses but drops the outer exponent, or makes an unrelated error.",
        remediation: "The ² OUTSIDE the parentheses means you must SQUARE the whole result — 3×4=12, then 12²=144, not just stopping at 12 or making an unrelated computation like 25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "3 × 4 = 12." },
      { level: 2, description: "Apply the exponent to the entire result", hint: "12² means 12 × 12." },
      { level: 3, description: "Compute", hint: "12 × 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r3", order: 3, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "ESTDIGIT-02",
    question: "How many trailing zeros does \\(2^8 \\times 5^6\\) have?",
    options: [
      { text: "6", correct: true, feedback: "2⁸×5⁶ = 2²×(2⁶×5⁶)=4×10⁶ → 6 zeros." },
      { text: "8", correct: false, feedback: "Check your working.", misconceptionId: "E-r3-a" },
      { text: "14", correct: false, feedback: "You added the exponents; that's not the number of trailing zeros.", misconceptionId: "E-r3-b" },
      { text: "1", correct: false, feedback: "Check your working.", misconceptionId: "E-r3-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student uses the exponent of 2 (8) directly as the trailing-zero count, without correctly pairing 2's and 5's into factors of 10.",
        rootCause: "Trailing Zero Count Confused With Raw Exponent — doesn't recognise that trailing zeros come from matched pairs of 2 and 5.",
        remediation: "Trailing zeros come from PAIRS of 2 and 5 (each pair makes a 10) — with 2⁸ and 5⁶, only 6 PAIRS can be formed (limited by the smaller exponent, 6), giving 6 trailing zeros, not 8 (the exponent of 2 alone)."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student adds the two exponents (8+6=14) as if that directly gave the number of trailing zeros.",
        rootCause: "Exponent Sum Confused With Trailing Zero Count — treats the sum of the original exponents as if it directly gave the number of zeros.",
        remediation: "Adding 8+6=14 is NOT the number of trailing zeros — instead, find how many PAIRS of (2,5) can be formed: min(8,6)=6 pairs, giving 6 trailing zeros, not 14."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student drastically undercounts, perhaps confusing this with a single power of 10 instead of correctly combining the powers.",
        rootCause: "Power Combination Not Correctly Worked Through — doesn't correctly factor the expression into a power of 10 with leftover factors.",
        remediation: "Work through the combination: 2⁸×5⁶=2²×(2⁶×5⁶)=4×10⁶ — the 10⁶ contributes 6 trailing zeros (the leftover 4 doesn't add more), not just 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify how many pairs of 2 and 5 can be formed", hint: "With 2⁸ and 5⁶, the limiting factor is the smaller exponent: 6." },
      { level: 2, description: "Combine those pairs into a power of 10", hint: "2⁶×5⁶=10⁶." },
      { level: 3, description: "Account for the leftover factors", hint: "2⁸÷2⁶=2² leftover — does this add more trailing zeros?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r4", order: 4, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "T",
    skillId: "ORDEROPS-05",
    question: "Evaluate: \\(-2^3 + 3 \\times (-2)\\)",
    options: [
      { text: "-14", correct: true, feedback: "-2³=-8; 3×(-2)=-6; -8-6=-14. Trap: -2³=-(2³)=-8." },
      { text: "2", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-r4-a" },
      { text: "-2", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r4-b" },
      { text: "14", correct: false, feedback: "Check your signs.", misconceptionId: "E-r4-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student treats -2³ as if the parentheses were around -2, computing (-2)³=-8 the same way but then mishandling the addition with 3×(-2)=-6, landing on 2.",
        rootCause: "Computation Error — a sign or step is mishandled while combining the two terms.",
        remediation: "Compute each piece carefully: -2³=-(2³)=-8, and 3×(-2)=-6 — then -8+(-6)=-14, not 2."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student makes an arithmetic slip while combining -8 and -6, landing on -2 instead of the correct -14.",
        rootCause: "Computation Error — correct approach, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: -2³=-8, 3×(-2)=-6, then -8+(-6)=-14, not -2."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student drops one or both negative signs, landing on a positive 14 instead of the correct -14.",
        rootCause: "Signs Dropped — loses track of negative signs during the multi-step calculation.",
        remediation: "Both terms are NEGATIVE: -2³=-8 and 3×(-2)=-6 — their sum is -8+(-6)=-14, not 14 (which drops both negative signs)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the exponent, noting no parentheses around -2", hint: "-2³ means -(2³) = -8." },
      { level: 2, description: "Compute the multiplication", hint: "3 × (-2) = -6." },
      { level: 3, description: "Add", hint: "-8 + (-6) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r5", order: 5, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "S",
    skillId: "ROOT-06",
    question: "\\(\\sqrt{100} + \\sqrt[3]{-27} =\\)",
    options: [
      { text: "7", correct: true, feedback: "10 + (-3) = 7." },
      { text: "13", correct: false, feedback: "Check the sign of the cube root.", misconceptionId: "E-r5-a" },
      { text: "-7", correct: false, feedback: "Check your signs.", misconceptionId: "E-r5-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student drops the negative sign on the cube root, adding 10+3=13 instead of 10+(-3)=7.",
        rootCause: "Sign of Cube Root Dropped — treats the negative cube root as if it were positive before adding.",
        remediation: "³√(-27)=-3 is NEGATIVE, not positive — keep the sign when adding: 10+(-3)=7, not 10+3=13 (which incorrectly treats -3 as +3)."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student assumes both roots should be negative, perhaps making √100 negative, landing on -7 instead of the correct 7.",
        rootCause: "Principal Root Convention Not Applied — incorrectly makes the square root term negative when it should be positive.",
        remediation: "√100=10 is POSITIVE (the principal root is always non-negative) — only the cube root (³√(-27)=-3) is negative; the sum is 10+(-3)=7, not -7 (which treats both as negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Evaluate the square root", hint: "√100 = 10." },
      { level: 2, description: "Evaluate the cube root", hint: "³√(-27) = -3 (since (-3)³=-27)." },
      { level: 3, description: "Add the two results", hint: "10 + (-3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "r6", order: 6, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    skillId: "PRIMEFACT-05",
    question: "How many distinct prime factors does 84 have?",
    options: [
      { text: "3", correct: true, feedback: "84=2²×3×7; distinct: 2,3,7." },
      { text: "4", correct: false, feedback: "Count only distinct primes, not repeats.", misconceptionId: "E-r6-a" },
      { text: "2", correct: false, feedback: "You missed a prime factor.", misconceptionId: "E-r6-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student counts the repeated factor of 2 twice, treating 84's full factorisation (2,2,3,7) as 4 distinct primes instead of 3.",
        rootCause: "Repeated Factor Counted Twice — counts a prime once for each occurrence instead of once per distinct value.",
        remediation: "84=2²×3×7 has FOUR total factors (counting the repeated 2 twice), but only THREE are DISTINCT (unique) primes: 2, 3, and 7 — the repeated 2 is still just ONE distinct prime, not counted twice."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student stops the prime factorisation too early, missing one of the three distinct primes (2, 3, or 7).",
        rootCause: "Factorisation Incomplete — stops dividing before fully breaking the number into all its prime factors.",
        remediation: "Fully divide out: 84÷2=42, 42÷2=21, 21÷3=7, 7÷7=1 — the DISTINCT primes used are 2, 3, and 7, that's THREE, not two."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the full prime factorisation", hint: "84 = 2×2×3×7." },
      { level: 2, description: "Identify the unique (distinct) primes", hint: "2, 3, and 7 — even though 2 appears twice, it's still one distinct prime." },
      { level: 3, description: "Count the distinct primes", hint: "How many different prime numbers appear?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r7", order: 7, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "EXTALG-01",
    question: "If \\(x = -3\\), evaluate \\(3x^2 - 2x + 4\\).",
    options: [
      { text: "37", correct: true, feedback: "3×9 + 6 + 4 = 37." },
      { text: "-5", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r7-a" },
      { text: "31", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r7-b" },
      { text: "-23", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r7-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student mishandles the sign of x² or -2x, leading to a total that's off by a large amount, landing on -5.",
        rootCause: "Sign Error In Substitution — doesn't correctly track signs when substituting a negative value.",
        remediation: "Compute each term carefully: x²=(-3)²=9 (positive, even exponent), 3x²=3×9=27; -2x=-2×(-3)=6 (positive, since two negatives multiply to positive) — total: 27+6+4=37, not -5."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student computes only part of the expression, perhaps forgetting one term, landing on 31 instead of the correct 37.",
        rootCause: "Term Omitted — drops one of the three terms in the expression during evaluation.",
        remediation: "The expression has THREE terms: 3x², -2x, AND +4 — you must include ALL of them: 27+6+4=37, not just two of them summing to 31."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student mishandles the sign of -2x, treating it as negative when it should be positive (since x is negative), landing on -23.",
        rootCause: "Sign Error In Substitution — doesn't correctly track the sign when substituting a negative value into -2x.",
        remediation: "-2x with x=-3 means -2×(-3)=6 (POSITIVE, since two negatives make a positive) — the full computation is 27+6+4=37, not treating -2x as negative and getting -23."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute x² and 3x²", hint: "(-3)²=9, so 3x²=3×9=27." },
      { level: 2, description: "Compute -2x", hint: "-2×(-3)=6 (positive, since two negatives make a positive)." },
      { level: 3, description: "Add all three terms", hint: "27 + 6 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r8", order: 8, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "C",
    skillId: "INTMUL-02",
    question: "\\((-3) \\times 4 \\times (-2) \\div (-8) =\\)",
    options: [
      { text: "-3", correct: true, feedback: "24 ÷ (-8) = -3." },
      { text: "3", correct: false, feedback: "Check your signs.", misconceptionId: "E-r8-a" },
      { text: "-1", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r8-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student correctly computes the magnitude but drops the final negative sign, landing on 3 instead of -3.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last division step.",
        remediation: "Compute step by step, tracking signs: (-3)×4=-12, ×(-2)=24, then 24÷(-8)=-3 (positive divided by negative is negative), not 3."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student makes an arithmetic slip in one of the multi-step operations, landing on -1 instead of the correct -3.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-3)×4=-12, ×(-2)=24, then 24÷(-8)=-3, not -1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Multiply the first two factors", hint: "(-3) × 4 = -12." },
      { level: 2, description: "Multiply by the third factor", hint: "-12 × (-2) = 24." },
      { level: 3, description: "Divide by the last factor", hint: "24 ÷ (-8) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r9", order: 9, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "S",
    skillId: "POWEXP-11",
    question: "\\(3^2 \\times 3^3 =\\)",
    options: [
      { text: "3⁵", correct: true, feedback: "Add exponents: 2+3=5." },
      { text: "3⁶", correct: false, feedback: "You multiplied the exponents; add them instead.", misconceptionId: "E-r9-a" },
      { text: "9⁵", correct: false, feedback: "The base stays the same; only exponents add.", misconceptionId: "E-r9-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student multiplies the exponents (2×3=6) instead of adding them when multiplying two powers with the same base.",
        rootCause: "Exponent Rule Confused — applies the MULTIPLY-exponents rule (for a power raised to another power) instead of the ADD-exponents rule (for multiplying same-base powers).",
        remediation: "When MULTIPLYING two powers with the SAME base, ADD the exponents: 3²×3³=3^(2+3)=3⁵ — multiplying them (2×3=6) would be the rule for a power raised to another power, like (3²)³, not for this expression."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student multiplies the bases together (3×3=9, treating the exponents as separate numbers) instead of keeping the base the same and adding exponents.",
        rootCause: "Base Incorrectly Combined — changes the base instead of keeping it the same and adding the exponents.",
        remediation: "The BASE stays the SAME (3) when multiplying same-base powers — only the EXPONENTS add: 3²×3³=3⁵, not 9⁵ (which incorrectly changes the base by combining it with itself)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify that the bases are the same", hint: "Both terms have base 3." },
      { level: 2, description: "Recall the product-of-powers rule", hint: "Add the exponents together." },
      { level: 3, description: "Compute the new exponent", hint: "2 + 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.1"] },
  { itemId: "r10", order: 10, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    skillId: "ESTROOT-02",
    question: "Estimate \\(\\sqrt{63}\\) to the nearest integer.",
    options: [
      { text: "8", correct: true, feedback: "8²=64, very close to 63." },
      { text: "7", correct: false, feedback: "7²=49, too far.", misconceptionId: "E-r10-a" },
      { text: "9", correct: false, feedback: "9²=81, too far.", misconceptionId: "E-r10-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student rounds down to 7 without checking that 63 is actually much closer to 8²=64 than to 7²=49.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 63-49=14 (distance to 7²), while 64-63=1 (distance to 8²) — 63 is MUCH closer to 64, so √63≈8, not 7."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student rounds up to 9 without checking that 63 is actually much closer to 8²=64 than to 9²=81.",
        rootCause: "Nearest-Value Comparison Skipped — doesn't compare distances to determine which perfect square is closer.",
        remediation: "Compare the distances: 81-63=18 (distance to 9²), while 64-63=1 (distance to 8²) — 63 is MUCH closer to 64, so √63≈8, not 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find nearby perfect squares", hint: "7²=49, 8²=64, 9²=81." },
      { level: 2, description: "Compare the distances to 63", hint: "63-64=-1 (so 1 away), which is much smaller than 63-49=14 or 81-63=18." },
      { level: 3, description: "Choose the closest perfect square", hint: "Which perfect square (49, 64, or 81) is closest to 63?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r11", order: 11, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "T",
    skillId: "INTADDMULT-01",
    question: "\\(-5 - (-2) + (-3) \\times 2 =\\)",
    options: [
      { text: "-9", correct: true, feedback: "-5+2-6=-9. Trap: multiplication before addition." },
      { text: "-3", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-r11-a" },
      { text: "-15", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r11-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student evaluates strictly left to right, computing -5-(-2)+(-3)=-6, then multiplying by 2 at the end, instead of applying multiplication before addition/subtraction.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "MULTIPLICATION happens BEFORE addition/subtraction — compute (-3)×2=-6 first, THEN combine: -5-(-2)+(-6)=-5+2-6=-9, not treating it as a simple left-to-right chain giving -3."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student makes a sign error somewhere in the calculation, perhaps mishandling -(-2) or the multiplication, landing on -15.",
        rootCause: "Sign Error During Multi-Step Calculation — a sign is mishandled somewhere in the expression.",
        remediation: "Recompute step by step: -5-(-2)=-5+2=-3, then (-3)×2=-6, then -3+(-6)=-9, not -15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the multiplication first", hint: "(-3) × 2 = -6." },
      { level: 2, description: "Rewrite the double negative", hint: "-(-2) becomes +2." },
      { level: 3, description: "Combine all terms in order", hint: "-5 + 2 + (-6) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r12", order: 12, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "H",
    skillId: "PRIMEFACT-06",
    question: "Find the smallest positive integer that has exactly 12 factors.",
    options: [
      { text: "60", correct: true, feedback: "60=2²×3×5 → (2+1)(1+1)(1+1)=12." },
      { text: "72", correct: false, feedback: "72=2³×3² also has exactly 12 factors, but 60 is smaller.", misconceptionId: "E-r12-a" },
      { text: "48", correct: false, feedback: "48 has 10 factors, not 12.", misconceptionId: "E-r12-b" },
      { text: "16", correct: false, feedback: "16 has only 5 factors.", misconceptionId: "E-r12-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student correctly finds a number with exactly 12 factors (72) but doesn't check for a SMALLER number that also satisfies the condition.",
        rootCause: "Smallest Value Not Verified — finds A valid answer but doesn't check for a smaller one.",
        remediation: "72=2³×3² DOES have exactly 12 factors ((3+1)(2+1)=12), but it's not the SMALLEST — 60=2²×3×5 also has exactly 12 factors ((2+1)(1+1)(1+1)=12) and is smaller than 72, so 60 is correct."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student picks 48=2⁴×3, which actually has 10 factors, not 12.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 12 factors.",
        remediation: "Count the factors of 48=2⁴×3: using the formula (4+1)(1+1)=10 factors, not 12 — 48 doesn't satisfy the condition; 60=2²×3×5 has (2+1)(1+1)(1+1)=12 factors, which does."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student picks 16=2⁴, which actually has only 5 factors, far short of 12.",
        rootCause: "Factor Count Not Verified — doesn't check that the candidate number actually has exactly 12 factors.",
        remediation: "Count the factors of 16=2⁴: using the formula (4+1)=5 factors, not 12 — 16 doesn't satisfy the condition; 60=2²×3×5 has (2+1)(1+1)(1+1)=12 factors, which does."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the ways to factor 12 for the divisor-count formula", hint: "12 = 12×1, or 6×2, or 4×3, or 3×2×2." },
      { level: 2, description: "Build the smallest number for the most promising factoring", hint: "3×2×2 → p²qr = 2²×3×5 = 60. 4×3 → p³q² = 2³×3² = 72." },
      { level: 3, description: "Compare the candidates and choose the smallest", hint: "Which is smaller, 60 or 72?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r13", order: 13, cluster: "ORDER_OPS", clusterName: CLUSTER_NAMES.ORDER_OPS, tier: "S",
    skillId: "ORDEROPS-02",
    question: "\\(8 + 3 \\times (4 - 2) =\\)",
    options: [
      { text: "14", correct: true, feedback: "8+3×2=14." },
      { text: "22", correct: false, feedback: "Check the order of operations.", misconceptionId: "E-r13-a" },
      { text: "10", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r13-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r13-a",
        description: "Student adds 8+3 before handling the parentheses, computing 11×(4-2)=22 instead of following the correct order.",
        rootCause: "Order of Operations Not Applied — evaluates in reading order instead of following precedence rules.",
        remediation: "PARENTHESES come first: 4-2=2, then MULTIPLICATION: 3×2=6, THEN addition: 8+6=14 — not adding 8+3 first (which would incorrectly give (8+3)×(4-2)=22)."
      },
      {
        misconceptionId: "E-r13-b",
        description: "Student makes an arithmetic slip in the final addition, landing on 10 instead of the correct 14.",
        rootCause: "Computation Error — correct approach, but the final addition is carried out incorrectly.",
        remediation: "Recompute carefully: 4-2=2, 3×2=6, then 8+6=14, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute inside the parentheses first", hint: "4 - 2 = 2." },
      { level: 2, description: "Compute the multiplication", hint: "3 × 2 = 6." },
      { level: 3, description: "Complete the addition", hint: "8 + 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r14", order: 14, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    skillId: "ESTROOT-01",
    question: "Between which two integers does \\(\\sqrt{200}\\) lie?",
    options: [
      { text: "14 and 15", correct: true, feedback: "14²=196, 15²=225." },
      { text: "13 and 14", correct: false, feedback: "13²=169, too low.", misconceptionId: "E-r14-a" },
      { text: "15 and 16", correct: false, feedback: "15²=225, already above 200.", misconceptionId: "E-r14-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r14-a",
        description: "Student picks a lower pair of consecutive integers (13 and 14) whose squares (169 and 196) don't actually bracket 200.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 200 falls between the squares of its endpoints.",
        remediation: "Check: 13²=169 and 14²=196 — 200 is NOT between 169 and 196 (200>196) — instead check 14²=196 and 15²=225: 200 IS between 196 and 225, so √200 is between 14 and 15."
      },
      {
        misconceptionId: "E-r14-b",
        description: "Student picks an upper pair of consecutive integers (15 and 16) whose squares (225 and 256) don't actually bracket 200.",
        rootCause: "Bracketing Interval Not Verified — selects an interval without checking that 200 falls between the squares of its endpoints.",
        remediation: "Check: 15²=225 and 16²=256 — 200 is NOT between 225 and 256 (200<225) — instead check 14²=196 and 15²=225: 200 IS between 196 and 225, so √200 is between 14 and 15."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate roughly where √200 falls", hint: "200 is close to 196, which is a perfect square." },
      { level: 2, description: "Check the perfect squares nearby", hint: "14²=196, 15²=225." },
      { level: 3, description: "Confirm which pair brackets 200", hint: "Is 200 between 196 and 225?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r21", order: 15, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    skillId: "INTADD-14",
    question: "The temperature at midnight was -3°C. It rose 9°C by morning, then fell 5°C by midday. What was the midday temperature?",
    options: [
      { text: "1°C", correct: true, feedback: "-3 + 9 - 5 = 1." },
      { text: "11°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-r21-a" },
      { text: "-17°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-r21-b" },
      { text: "-7°C", correct: false, feedback: "Check your signs.", misconceptionId: "E-r21-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r21-a",
        description: "Student adds all the magnitudes together (3+9-5=... or drops the starting negative) instead of correctly tracking each change's direction.",
        rootCause: "Direction of Change Not Tracked — treats 'rise' and 'fall' as if they were both additions, ignoring the starting negative temperature.",
        remediation: "Start at -3°C, then RISE 9°C (add): -3+9=6, then FALL 5°C (subtract): 6-5=1 — not simply adding all magnitudes together to get 11 (which ignores the starting negative)."
      },
      {
        misconceptionId: "E-r21-b",
        description: "Student treats both the rise and the fall as decreases, subtracting both from the starting temperature, landing on -17.",
        rootCause: "Direction of Change Not Tracked — treats a 'rise' as a decrease instead of an increase.",
        remediation: "A 'rise' of 9°C means ADD 9, not subtract — start at -3, rise 9: -3+9=6, then fall 5: 6-5=1, not -3-9-5=-17 (which incorrectly treats the rise as a fall too)."
      },
      {
        misconceptionId: "E-r21-c",
        description: "Student makes an error in one of the two steps, perhaps computing the rise or fall incorrectly, landing on -7.",
        rootCause: "Computation Error — one of the addition or subtraction steps is carried out incorrectly.",
        remediation: "Recompute step by step: -3+9=6 (after the rise), then 6-5=1 (after the fall), not -7."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Start with the midnight temperature", hint: "-3°C." },
      { level: 2, description: "Apply the rise", hint: "-3 + 9 = 6." },
      { level: 3, description: "Apply the fall", hint: "6 - 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r15", order: 16, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    skillId: "INTMUL-02",
    question: "\\((-6) \\div 3 \\times (-4) =\\)",
    options: [
      { text: "8", correct: true, feedback: "-2 × -4 = 8." },
      { text: "-8", correct: false, feedback: "Check your signs.", misconceptionId: "E-r15-a" },
      { text: "0", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r15-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r15-a",
        description: "Student correctly computes the magnitude but drops the sign flip from the final multiplication, landing on -8 instead of 8.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last multiplication step.",
        remediation: "Compute step by step: (-6)÷3=-2, then -2×(-4)=8 (negative times negative is positive), not -8."
      },
      {
        misconceptionId: "E-r15-b",
        description: "Student assumes the expression somehow evaluates to zero, perhaps confusing this with an unrelated property.",
        rootCause: "Result Value Not Actually Computed — assumes a value without working through the calculation.",
        remediation: "Work through the actual computation: (-6)÷3=-2, then -2×(-4)=8 — this is a real, nonzero result, not 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the division first (left to right)", hint: "(-6) ÷ 3 = -2." },
      { level: 2, description: "Determine the sign of the multiplication", hint: "-2 (negative) × (-4) will be positive." },
      { level: 3, description: "Compute", hint: "2 × 4 = ? (then apply the positive sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r16", order: 17, cluster: "PRIME", clusterName: CLUSTER_NAMES.PRIME, tier: "C",
    skillId: "PRIMEFACT-03",
    question: "Find the LCM of 12 and 18.",
    options: [
      { text: "36", correct: true, feedback: "12=2²×3, 18=2×3²; LCM=2²×3²=36." },
      { text: "6", correct: false, feedback: "That's the HCF, not the LCM.", misconceptionId: "E-r16-a" },
      { text: "216", correct: false, feedback: "That's the product, not the LCM.", misconceptionId: "E-r16-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r16-a",
        description: "Student computes the HCF (6) instead of the LCM, confusing the two related concepts.",
        rootCause: "HCF Method Confused With LCM Method — computes the wrong one of the two related quantities.",
        remediation: "6 is the HCF (highest common FACTOR) of 12 and 18, not the LCM (lowest common MULTIPLE) — the LCM is 36, using the highest power of every prime: 2²×3²=36."
      },
      {
        misconceptionId: "E-r16-b",
        description: "Student multiplies the two original numbers together (12×18=216) instead of using prime factorisation to find the actual LCM.",
        rootCause: "LCM Approximated as Product of the Two Numbers — assumes the LCM is always the product of the numbers, ignoring shared factors.",
        remediation: "The LCM is NOT simply the product of the two numbers — since 12 and 18 share common factors, the actual LCM (36) is much smaller than their product (216); use prime factorisation: 2²×3²=36, not 216."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation of each number", hint: "12=2²×3. 18=2×3²." },
      { level: 2, description: "Identify every prime that appears in either number", hint: "The primes involved are 2 and 3." },
      { level: 3, description: "Use the highest power of each prime", hint: "Highest power of 2: 2². Highest power of 3: 3². Multiply: 2²×3² = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.NS.B.4"] },
  { itemId: "r17", order: 18, cluster: "SYNTH", clusterName: CLUSTER_NAMES.SYNTH, tier: "H",
    skillId: "EXTALG-01",
    question: "If \\(a=2, b=-1, c=-4\\), evaluate \\(a b^2 - b c^2\\).",
    options: [
      { text: "18", correct: true, feedback: "2×1 - (-1)×16 = 2 + 16 = 18." },
      { text: "-14", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r17-a" },
      { text: "-18", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r17-b" },
      { text: "14", correct: false, feedback: "Check your substitution.", misconceptionId: "E-r17-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r17-a",
        description: "Student mishandles the sign of the -bc² term, treating -(-1)×16 as -16 instead of +16, landing on -14.",
        rootCause: "Double Negative Not Correctly Applied — mishandles subtracting a negative times a positive.",
        remediation: "The expression is ab²-bc² — ab²=2×1=2, and bc²=(-1)×16=-16, so -bc²=-(-16)=+16 — the result is 2+16=18, not 2-16=-14 (which drops the double-negative flip)."
      },
      {
        misconceptionId: "E-r17-b",
        description: "Student mishandles the sign of ab², treating it as negative, and also mishandles -bc², landing on -18.",
        rootCause: "Sign Error In Substitution — doesn't correctly track signs when substituting a negative value.",
        remediation: "ab²=2×(-1)²=2×1=2 is POSITIVE (b² is positive since squaring removes the sign) — bc²=(-1)×(-4)²=(-1)×16=-16, so -bc²=+16 — result: 2+16=18, not -18."
      },
      {
        misconceptionId: "E-r17-c",
        description: "Student mishandles one sign in the calculation, landing on 14 instead of the correct 18.",
        rootCause: "Computation Error — a sign is mishandled somewhere in the substitution.",
        remediation: "Recompute carefully: ab²=2×1=2, bc²=(-1)×16=-16, -bc²=16, so ab²-bc²=2-(-16)=2+16=18, not 14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute ab²", hint: "b²=(-1)²=1, so ab²=2×1=2." },
      { level: 2, description: "Compute bc²", hint: "c²=(-4)²=16, so bc²=(-1)×16=-16." },
      { level: 3, description: "Subtract bc² from ab²", hint: "2 - (-16) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.EE.A.2C"] },
  { itemId: "r18", order: 19, cluster: "ESTIMATION", clusterName: CLUSTER_NAMES.ESTIMATION, tier: "C",
    skillId: "ESTROUND-03",
    question: "Estimate \\(\\frac{198 \\times 32}{49}\\) by rounding to 1 s.f.",
    options: [
      { text: "120", correct: true, feedback: "200×30÷50 = 120." },
      { text: "100", correct: false, feedback: "Check your rounding.", misconceptionId: "E-r18-a" },
      { text: "150", correct: false, feedback: "Check your rounding.", misconceptionId: "E-r18-b" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r18-a",
        description: "Student rounds one of the numbers incorrectly or makes a calculation error, landing on 100 instead of the correct 120.",
        rootCause: "Rounding or Computation Error — one of the rounding or arithmetic steps is carried out incorrectly.",
        remediation: "Round each number to 1 significant figure: 198≈200, 32≈30, 49≈50 — then compute (200×30)÷50=6000÷50=120, not 100."
      },
      {
        misconceptionId: "E-r18-b",
        description: "Student rounds one of the numbers incorrectly or makes a calculation error, landing on 150 instead of the correct 120.",
        rootCause: "Rounding or Computation Error — one of the rounding or arithmetic steps is carried out incorrectly.",
        remediation: "Round each number to 1 significant figure: 198≈200, 32≈30, 49≈50 — then compute (200×30)÷50=6000÷50=120, not 150."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Round each number to 1 significant figure", hint: "198≈200, 32≈30, 49≈50." },
      { level: 2, description: "Multiply the rounded numerator values", hint: "200 × 30 = 6000." },
      { level: 3, description: "Divide by the rounded denominator", hint: "6000 ÷ 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.NS.A.2"] },
  { itemId: "r23", order: 20, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "S",
    skillId: "INTADD-07",
    question: "Which statement about -2 and -6 is true?",
    options: [
      { text: "-2 > -6", correct: true, feedback: "-2 is to the right of -6 on the number line, so it is larger." },
      { text: "-2 < -6", correct: false, feedback: "-2 is to the right of -6, so it is larger.", misconceptionId: "E-r23-a" },
      { text: "-2 = -6", correct: false, feedback: "They are different numbers.", misconceptionId: "E-r23-b" },
      { text: "-2 ≤ -6", correct: false, feedback: "-2 is not less than or equal to -6.", misconceptionId: "E-r23-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r23-a",
        description: "Student compares the magnitudes (2<6) and concludes -2<-6, not accounting for the fact that smaller magnitude negative numbers are actually LARGER.",
        rootCause: "Magnitude Comparison Applied Without Sign Adjustment — compares absolute values directly instead of considering the negative sign's effect on ordering.",
        remediation: "For NEGATIVE numbers, a SMALLER magnitude means a LARGER value — since |-2|=2 is smaller than |-6|=6, -2 is actually further right on the number line and therefore LARGER: -2>-6, not -2<-6."
      },
      {
        misconceptionId: "E-r23-b",
        description: "Student assumes -2 and -6 are equal, perhaps not fully distinguishing between the two distinct negative values.",
        rootCause: "Values Not Actually Compared — fails to notice the numbers are different.",
        remediation: "-2 and -6 are two DIFFERENT numbers, not equal — on the number line, -2 is to the right of -6, so -2>-6, not -2=-6."
      },
      {
        misconceptionId: "E-r23-c",
        description: "Student selects the 'less than or equal to' statement without correctly determining that -2 is actually the larger value.",
        rootCause: "Magnitude Comparison Applied Without Sign Adjustment — compares absolute values directly instead of considering the negative sign's effect on ordering.",
        remediation: "Since -2 is further RIGHT on the number line than -6, -2 is LARGER — -2≤-6 is false; the correct relationship is -2>-6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Picture both numbers on a number line", hint: "-2 is further right than -6." },
      { level: 2, description: "Recall the number line rule", hint: "Numbers further right are larger." },
      { level: 3, description: "Compare", hint: "Is -2 smaller or larger than -6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r24", order: 21, cluster: "NEG_ADDSUB", clusterName: CLUSTER_NAMES.NEG_ADDSUB, tier: "C",
    skillId: "INTADD-05",
    question: "How far apart are -7 and 2 on the number line?",
    options: [
      { text: "9", correct: true, feedback: "Distance = |-7 - 2| = 9." },
      { text: "-9", correct: false, feedback: "Distance is always positive.", misconceptionId: "E-r24-a" },
      { text: "5", correct: false, feedback: "Check your subtraction.", misconceptionId: "E-r24-b" },
      { text: "-5", correct: false, feedback: "Distance is always positive.", misconceptionId: "E-r24-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r24-a",
        description: "Student computes the directed (signed) difference correctly in magnitude but reports a negative value for distance.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "Distance is ALWAYS non-negative — take the absolute value of the difference: |-7-2|=|-9|=9, not -9."
      },
      {
        misconceptionId: "E-r24-b",
        description: "Student makes an arithmetic slip while subtracting the two numbers, landing on 5 instead of the correct 9.",
        rootCause: "Computation Error — the subtraction itself is carried out incorrectly.",
        remediation: "Recompute carefully: -7-2=-9, so the distance is |-9|=9, not 5."
      },
      {
        misconceptionId: "E-r24-c",
        description: "Student correctly computes a directed difference but gets the wrong magnitude and doesn't take the absolute value.",
        rootCause: "Absolute Value Not Applied — reports a signed difference instead of taking its absolute value.",
        remediation: "The distance is the ABSOLUTE VALUE of the difference between the two points — |-7-2|=|-9|=9, not -5 (which is neither the correct magnitude nor non-negative)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between the two points", hint: "-7 - 2 = -9." },
      { level: 2, description: "Take the absolute value", hint: "Distance is always non-negative." },
      { level: 3, description: "Compute", hint: "|-9| = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.1"] },
  { itemId: "r22", order: 22, cluster: "ROOTS", clusterName: CLUSTER_NAMES.ROOTS, tier: "C",
    skillId: "ROOT-05",
    question: "Which of the following is true?",
    options: [
      { text: "\\(\\sqrt{9+16} = 5\\)", correct: true, feedback: "√25 = 5." },
      { text: "\\(\\sqrt{9+16} = 7\\)", correct: false, feedback: "The square root does not distribute over addition.", misconceptionId: "E-r22-a" },
      { text: "\\(\\sqrt{9+16} = 12\\)", correct: false, feedback: "Multiplication does not apply here either.", misconceptionId: "E-r22-b" },
      { text: "\\(\\sqrt{9+16} = 25\\)", correct: false, feedback: "You forgot to take the square root.", misconceptionId: "E-r22-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r22-a",
        description: "Student distributes the square root over the addition, computing √9+√16 instead of √(9+16).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — treats √(a+b) as if it equalled √a+√b.",
        remediation: "The square root does NOT distribute over addition — √(9+16) means take the square root of the SUM (9+16=25, √25=5), not the sum of the individual square roots (√9+√16=3+4=7)."
      },
      {
        misconceptionId: "E-r22-b",
        description: "Student incorrectly distributes the square root as if it worked like multiplication, computing √9×√16 instead of √(9+16).",
        rootCause: "Square Root Incorrectly Distributed Over Addition — applies a rule that only works for multiplication (√(ab)=√a×√b) to an addition expression.",
        remediation: "√(a+b) does NOT equal √a×√b — that distribution rule only applies to MULTIPLICATION inside the root (√(ab)=√a×√b), not addition; √(9+16)=√25=5, not √9×√16=12."
      },
      {
        misconceptionId: "E-r22-c",
        description: "Student computes the sum inside the radical (9+16=25) but forgets to take the square root of that sum.",
        rootCause: "Square Root Step Omitted — stops after computing the sum, without taking its root.",
        remediation: "9+16=25 is only the value INSIDE the radical — you must ALSO take the square root: √25=5, not just 25."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the sum inside the radical first", hint: "9 + 16 = 25." },
      { level: 2, description: "Take the square root of the sum", hint: "√25 = ?" },
      { level: 3, description: "Confirm the root doesn't distribute over addition", hint: "√9+√16=3+4=7 is a DIFFERENT value — the root applies to the whole sum, not each term separately." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.8.EE.A.2"] },
  { itemId: "r19", order: 23, cluster: "NEG_MULDIV", clusterName: CLUSTER_NAMES.NEG_MULDIV, tier: "S",
    skillId: "INTMUL-02",
    question: "\\((-4) \\times 6 \\div (-2) =\\)",
    options: [
      { text: "12", correct: true, feedback: "-24 ÷ -2 = 12." },
      { text: "-12", correct: false, feedback: "Check your signs.", misconceptionId: "E-r19-a" },
      { text: "-10", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r19-b" },
      { text: "10", correct: false, feedback: "Check your calculation.", misconceptionId: "E-r19-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r19-a",
        description: "Student correctly computes the magnitude but drops the final sign flip, landing on -12 instead of 12.",
        rootCause: "Sign Dropped On Final Operation — loses track of the negative sign during the last division step.",
        remediation: "Compute step by step: (-4)×6=-24, then -24÷(-2)=12 (negative divided by negative is positive), not -12."
      },
      {
        misconceptionId: "E-r19-b",
        description: "Student makes an arithmetic slip somewhere in the calculation, landing on -10 instead of the correct 12.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-4)×6=-24, then -24÷(-2)=12, not -10."
      },
      {
        misconceptionId: "E-r19-c",
        description: "Student makes an arithmetic slip somewhere in the calculation, landing on 10 instead of the correct 12.",
        rootCause: "Computation Error — one of the multiplication or division steps is carried out incorrectly.",
        remediation: "Recompute step by step: (-4)×6=-24, then -24÷(-2)=12, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the multiplication first (left to right)", hint: "(-4) × 6 = -24." },
      { level: 2, description: "Determine the sign of the division", hint: "-24 (negative) ÷ (-2) will be positive." },
      { level: 3, description: "Compute", hint: "24 ÷ 2 = ? (then apply the positive sign)" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.7.NS.A.2"] },
  { itemId: "r20", order: 24, cluster: "POWERS", clusterName: CLUSTER_NAMES.POWERS, tier: "C",
    skillId: "POWEXP-08",
    question: "Which is equal to \\(9^2\\)?",
    options: [
      { text: "3⁴", correct: true, feedback: "9=3², so 9²=(3²)²=3⁴=81." },
      { text: "3³", correct: false, feedback: "Check the exponent rule for powers of a power.", misconceptionId: "E-r20-a" },
      { text: "9³", correct: false, feedback: "Check your working.", misconceptionId: "E-r20-b" },
      { text: "18", correct: false, feedback: "You multiplied the base by the exponent: 9×2=18.", misconceptionId: "E-r20-c" }
    ],
    misconceptions: [
      {
        misconceptionId: "E-r20-a",
        description: "Student adds the exponents (2+2=4, but writes 3³ perhaps confusing which exponent goes where) instead of correctly multiplying, or otherwise misapplies the power-of-a-power rule.",
        rootCause: "Exponent Rule Confused — misapplies the power-of-a-power rule, landing on the wrong exponent.",
        remediation: "For a POWER raised to ANOTHER POWER, MULTIPLY the exponents: 9²=(3²)²=3^(2×2)=3⁴ — not 3³, which doesn't come from correctly multiplying 2×2."
      },
      {
        misconceptionId: "E-r20-b",
        description: "Student changes the exponent without correctly converting the base to 3, landing on 9³ instead of the correctly rewritten 3⁴.",
        rootCause: "Base Conversion Not Applied — doesn't rewrite 9 as a power of 3 before combining exponents.",
        remediation: "Rewrite 9 as 3² FIRST, then apply the power-of-a-power rule: 9²=(3²)²=3⁴=81 — not simply changing the exponent on the original base 9 (9³=729, unrelated)."
      },
      {
        misconceptionId: "E-r20-c",
        description: "Student multiplies the base by the exponent (9×2=18) instead of using the base as a repeated factor.",
        rootCause: "Exponent Misread As Multiplier — treats the exponent as something to multiply by rather than a repeat count.",
        remediation: "9² means 9 MULTIPLIED BY ITSELF (9×9=81), not 9 times the exponent (9×2=18) — rewritten with base 3: 9²=3⁴=81, not 18."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Rewrite 9 as a power of 3", hint: "9 = 3²." },
      { level: 2, description: "Apply the power-of-a-power rule", hint: "9² = (3²)² = 3^(2×2)." },
      { level: 3, description: "Confirm the new exponent", hint: "2 × 2 = ?" }
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

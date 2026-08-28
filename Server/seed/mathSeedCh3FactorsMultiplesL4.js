// seed/mathSeedCh3FactorsMultiplesL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 4 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 4;

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
    skillId: "FACT-08",
    question: "Is 37 prime or composite?",
    options: [
        { text: "Prime", correct: true, feedback: "37 has no divisors other than 1 and 37." },
        { text: "Composite", correct: false, feedback: "37 is not a product of smaller integers.", misconceptionId: "E-w1-a" },
        { text: "Neither", correct: false, feedback: "Every integer >1 is either prime or composite.", misconceptionId: "E-w1-b" },
        { text: "Both", correct: false, feedback: "Impossible.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers composite without finding an actual factor pair.",
        rootCause: "Untested Guess — assumes 37 is composite because it looks like a 'big' or 'unfamiliar' number, without actually testing any divisors.",
        remediation: "Test divisibility by every prime up to √37 (≈6.1): 2, 3, 5. None divide 37 evenly, confirming it's prime."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 'Neither'.",
        rootCause: "Category Confusion — doesn't recognise that every integer greater than 1 falls into exactly one of the two categories, prime or composite.",
        remediation: "Restate the definitions: prime = exactly 2 factors (1 and itself); composite = more than 2 factors. Every integer >1 fits one of these."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 'Both'.",
        rootCause: "Category Confusion — misunderstands that prime and composite are mutually exclusive categories.",
        remediation: "Clarify that a number can never be both — the two definitions are opposites by design."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the boundary to test", hint: "You only need to test prime divisors up to √37, which is a little over 6." },
      { level: 2, description: "Test each prime", hint: "Does 2 divide 37? Does 3? Does 5?" },
      { level: 3, description: "Conclude", hint: "If none of 2, 3, or 5 divide 37 evenly, it has no factors besides 1 and itself." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-07",
    question: "LCM of 6 and 9?",
    options: [
        { text: "18", correct: true, feedback: "Multiples of 6: 6,12,18; of 9: 9,18. Smallest common is 18." },
        { text: "3", correct: false, feedback: "That's the HCF.", misconceptionId: "E-w2-a" },
        { text: "36", correct: false, feedback: "Common multiple but not least.", misconceptionId: "E-w2-b" },
        { text: "54", correct: false, feedback: "Another common multiple.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student answers 3, the HCF instead of the LCM.",
        rootCause: "LCM/HCF Label Confusion — computes the highest common factor correctly but reports it for an LCM question.",
        remediation: "Anchor the two terms: HCF is the biggest number dividing BOTH; LCM is the smallest number BOTH divide into."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 36, a valid but non-least common multiple.",
        rootCause: "Non-Least Common Multiple — finds a number both 6 and 9 divide into, but doesn't check for a smaller one.",
        remediation: "List multiples of both numbers in order and stop at the FIRST one appearing in both lists."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 54, using the product 6×9 instead of the LCM.",
        rootCause: "Product-for-LCM Substitution — multiplies the two numbers together, which only equals the LCM when they're co-prime; 6 and 9 share a factor of 3.",
        remediation: "Since 6 and 9 share a factor of 3, their LCM is smaller than their product — divide the product by their HCF to get the true LCM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each", hint: "6, 12, 18, 24... and 9, 18, 27..." },
      { level: 2, description: "Find the first shared one", hint: "Which number appears in both lists first?" },
      { level: 3, description: "Confirm", hint: "Is 18 divisible by both 6 and 9?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-07",
    question: "HCF of 15 and 25?",
    options: [
        { text: "5", correct: true, feedback: "15=3×5, 25=5²; HCF=5." },
        { text: "3", correct: false, feedback: "3 is not a factor of 25.", misconceptionId: "E-w3-a" },
        { text: "25", correct: false, feedback: "25 is not a factor of 15.", misconceptionId: "E-w3-b" },
        { text: "75", correct: false, feedback: "That's the LCM.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 3, a factor of 15 but not of 25.",
        rootCause: "Single-Number Factor Check — checks the candidate divides one number and stops, without checking the other; 25÷3 is not a whole number.",
        remediation: "Require a divisibility check against BOTH numbers before accepting a common factor."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 25, a factor of itself but not of 15.",
        rootCause: "Larger-Number Default — assumes the smaller of two given numbers is automatically a common factor, without checking; 15÷25 is not a whole number.",
        remediation: "Never assume a given number is automatically a common factor — check it divides the OTHER number too."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 75, the LCM instead of the HCF.",
        rootCause: "LCM/HCF Label Confusion — computes the LCM (75) but reports it for an HCF question.",
        remediation: "Restate which is asked for before answering: HCF (largest shared factor) or LCM (smallest shared multiple)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List factors of each", hint: "Factors of 15: 1,3,5,15. Factors of 25: 1,5,25." },
      { level: 2, description: "Find common factors", hint: "Which numbers appear in BOTH lists?" },
      { level: 3, description: "Pick the highest", hint: "Among the common factors, which is the largest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-02",
    question: "Is 312 divisible by 3?",
    options: [
        { text: "Yes (digit sum 6)", correct: true, feedback: "3+1+2=6, which is divisible by 3." },
        { text: "No", correct: false, feedback: "Check the digit sum.", misconceptionId: "E-w4-a" },
        { text: "Only if it ends in 3", correct: false, feedback: "Divisibility by 3 is about digit sum, not the last digit.", misconceptionId: "E-w4-b" },
        { text: "Cannot say", correct: false, feedback: "We can easily check.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 'No' without computing the digit sum.",
        rootCause: "Untested Guess — answers without applying the digit-sum rule at all.",
        remediation: "Always compute the digit sum explicitly and check it against the multiple-of-3 rule before answering yes or no."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers based on the last digit instead of the digit sum.",
        rootCause: "Rule Confusion — confuses the divisibility-by-3 rule (digit sum) with a last-digit-based rule (which applies to divisibility by 2, 5, or 10, not 3).",
        remediation: "Memorise which rule applies to which divisor: 2/5/10 look at the last digit; 3/9 look at the digit sum."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 'Cannot say'.",
        rootCause: "Rule Unfamiliarity — doesn't know the digit-sum shortcut exists, and assumes checking divisibility requires long division.",
        remediation: "Introduce the digit-sum rule as a quick shortcut that avoids long division entirely for checking divisibility by 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "A number is divisible by 3 if its digit sum is divisible by 3." },
      { level: 2, description: "Compute the digit sum", hint: "3+1+2 = ?" },
      { level: 3, description: "Check the sum", hint: "Is that sum divisible by 3?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-01",
    question: "11² = ?",
    options: [
        { text: "121", correct: true, feedback: "11 × 11 = 121." },
        { text: "111", correct: false, feedback: "Not the square.", misconceptionId: "E-w5-a" },
        { text: "144", correct: false, feedback: "That's 12².", misconceptionId: "E-w5-b" },
        { text: "110", correct: false, feedback: "11×10, not squared.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 111, likely a digit-repetition guess rather than an actual computation.",
        rootCause: "Pattern Guess Instead of Computation — writes down a number that 'looks like' it involves repeated 1's instead of actually multiplying 11×11.",
        remediation: "Compute 11×11 explicitly using the standard algorithm or by breaking it into 11×10+11×1."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 144, the square of 12 instead of 11.",
        rootCause: "Off-By-One Base — squares the wrong number, one more than intended.",
        remediation: "Double-check which number is being squared before multiplying — write '11 × 11' explicitly."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 110, computing 11×10 instead of 11×11.",
        rootCause: "Doubling-for-Squaring Substitution — multiplies by 10 (a common, easy multiplier) instead of by the number itself.",
        remediation: "Reiterate that squaring means multiplying a number by ITSELF, not by 10 or any other convenient number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the multiplication", hint: "11² means 11 × 11." },
      { level: 2, description: "Break it apart", hint: "11 × 11 = 11 × (10+1) = 11×10 + 11×1." },
      { level: 3, description: "Add the parts", hint: "110 + 11 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-01",
    question: "5, 10, 15, 20, … next?",
    options: [
        { text: "25", correct: true, feedback: "Add 5 each time: 20+5=25." },
        { text: "30", correct: false, feedback: "That would need doubling, but the pattern is additive.", misconceptionId: "E-w6-a" },
        { text: "24", correct: false, feedback: "Not following the +5 rule.", misconceptionId: "E-w6-b" },
        { text: "50", correct: false, feedback: "Not the pattern.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 30, doubling the last term instead of adding 5.",
        rootCause: "Wrong Operation Type — applies a multiplicative rule (doubling) to a sequence that is actually additive.",
        remediation: "Check the relationship between consecutive terms: is each term a fixed AMOUNT more (additive) or a fixed MULTIPLE (multiplicative) of the previous one? Here, 10-5=5, 15-10=5 — constant addition."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 24, adding an incorrect amount.",
        rootCause: "Wrong Constant Added — doesn't correctly identify the constant difference (5) between terms.",
        remediation: "Verify the difference between EVERY consecutive pair (10-5, 15-10, 20-15) before extending the pattern."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 50, an unrelated jump.",
        rootCause: "Guess Without Verification — proposes a number without checking it against the established +5 pattern.",
        remediation: "Confirm the pattern rule against the given terms before applying it to find the next one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the difference between terms", hint: "10-5=5. 15-10=5. 20-15=5." },
      { level: 2, description: "Confirm it's constant", hint: "The difference is always 5 — this is an additive (arithmetic) sequence." },
      { level: 3, description: "Apply it", hint: "20 + 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-01",
    question: "Which is NOT a factor of 28? 4, 14, 8, 7",
    options: [
        { text: "8", correct: true, feedback: "28 ÷ 8 = 3.5, not an integer." },
        { text: "4", correct: false, feedback: "28 ÷ 4 = 7.", misconceptionId: "E-w7-a" },
        { text: "14", correct: false, feedback: "28 ÷ 14 = 2.", misconceptionId: "E-w7-b" },
        { text: "7", correct: false, feedback: "28 ÷ 7 = 4.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student picks 4, which IS a valid factor of 28.",
        rootCause: "Untested Selection — picks a number without checking whether 28÷4 divides evenly; it does (=7), so 4 is not the answer.",
        remediation: "Divide 28 by each candidate explicitly and check for a whole-number result before deciding which one ISN'T a factor."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student picks 14, which IS a valid factor of 28.",
        rootCause: "Untested Selection — doesn't verify 28÷14=2 exactly, missing that 14 is indeed a factor.",
        remediation: "Check every candidate systematically rather than picking one that 'looks' unusual."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student picks 7, which IS a valid factor of 28.",
        rootCause: "Untested Selection — doesn't verify 28÷7=4 exactly.",
        remediation: "Divide 28 by each of the four options and identify the ONLY one that doesn't give a whole number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Divide by each candidate", hint: "28÷4, 28÷14, 28÷8, 28÷7 — compute each." },
      { level: 2, description: "Check for whole numbers", hint: "Which of these divisions doesn't give a whole number?" },
      { level: 3, description: "Confirm", hint: "28÷8 = 3.5 — is that a whole number?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-07",
    question: "First common multiple of 4 and 5?",
    options: [
        { text: "20", correct: true, feedback: "4,8,12,16,20; 5,10,15,20. LCM=20." },
        { text: "9", correct: false, feedback: "Not a multiple of either.", misconceptionId: "E-w8-a" },
        { text: "40", correct: false, feedback: "Common but not the first.", misconceptionId: "E-w8-b" },
        { text: "1", correct: false, feedback: "Not a common multiple.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 9, which isn't a multiple of either number.",
        rootCause: "Sum Substitution — adds the two numbers (4+5=9) instead of finding a common multiple.",
        remediation: "Check: is 9 divisible by 4? By 5? Neither, so it can't be a common multiple at all."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 40, a valid but non-first common multiple.",
        rootCause: "Non-Least Common Multiple — finds a valid shared multiple but doesn't check for a smaller one.",
        remediation: "List multiples of both numbers in order and stop at the FIRST shared one."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 1, not an actual common multiple.",
        rootCause: "Confusion With HCF-Style Thinking — perhaps confuses 'common multiple' with looking for the smallest possible number overall (1), rather than a number both 4 and 5 actually divide into.",
        remediation: "A common multiple must be a number that BOTH 4 and 5 divide into evenly — check whether 1÷4 and 1÷5 give whole numbers (they don't, since 1 is smaller than both)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each", hint: "4, 8, 12, 16, 20... and 5, 10, 15, 20..." },
      { level: 2, description: "Find the first shared one", hint: "Which number appears in both lists first?" },
      { level: 3, description: "Confirm", hint: "Is 20 divisible by both 4 and 5?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "S",
    skillId: "FACT-08",
    question: "Which of these is a prime number? 51, 57, 61, 69",
    options: [
        { text: "61", correct: true, feedback: "61 = prime. 51=3×17, 57=3×19, 69=3×23." },
        { text: "51", correct: false, feedback: "51 = 3 × 17.", misconceptionId: "E-d1-a" },
        { text: "57", correct: false, feedback: "57 = 3 × 19.", misconceptionId: "E-d1-b" },
        { text: "69", correct: false, feedback: "69 = 3 × 23.", misconceptionId: "E-d1-c" }
      ],
    backward: "A prime has exactly two distinct factors: 1 and itself.",
    forward: "Prime recognition speeds up factorisation.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student picks 51, not recognising it as composite.",
        rootCause: "Missing Divisibility Check — doesn't test 51 against small primes; 51÷3=17 exactly, so it's composite.",
        remediation: "Test each candidate against small primes (2,3,5,7...) up to its square root before deciding it's prime — 51's digit sum (5+1=6) already signals divisibility by 3."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student picks 57, not recognising it as composite.",
        rootCause: "Missing Divisibility Check — doesn't test 57 against small primes; 57÷3=19 exactly.",
        remediation: "Check the digit sum first as a quick filter: 5+7=12, divisible by 3, so 57 must be composite."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student picks 69, not recognising it as composite.",
        rootCause: "Missing Divisibility Check — doesn't test 69 against small primes; 69÷3=23 exactly.",
        remediation: "Digit sum 6+9=15, divisible by 3, signals 69 is composite before any further checking is needed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check digit sums for divisibility by 3", hint: "Compute the digit sum of each number — a sum divisible by 3 means the number is divisible by 3." },
      { level: 2, description: "Eliminate composites", hint: "51, 57, and 69 all have digit sums divisible by 3 — eliminate them." },
      { level: 3, description: "Confirm the remaining one is prime", hint: "Check 61 against small primes up to √61≈7.8: 2, 3, 5, 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "S",
    skillId: "MULT-07",
    question: "LCM of 8 and 12?",
    options: [
        { text: "24", correct: true, feedback: "8=2³, 12=2²×3; LCM=2³×3=24." },
        { text: "4", correct: false, feedback: "That's the HCF.", misconceptionId: "E-d2-a" },
        { text: "48", correct: false, feedback: "That's 4×12 (HCF times one of the numbers) — not a meaningful step toward the LCM.", misconceptionId: "E-d2-b" },
        { text: "96", correct: false, feedback: "Common multiple but not least.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student answers 4, the HCF instead of the LCM.",
        rootCause: "LCM/HCF Label Confusion — computes the highest common factor but reports it for an LCM question.",
        remediation: "Restate which direction is asked: HCF (biggest shared factor) vs LCM (smallest shared multiple)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student answers 48, from multiplying HCF by one of the numbers.",
        rootCause: "Formula Misapplication — combines the HCF (4) and one number (12) incorrectly instead of using the proper LCM formula (highest prime powers, or product÷HCF).",
        remediation: "Use LCM = product ÷ HCF = (8×12)÷4 = 96÷4 = 24, or take the highest power of each prime directly from the factorisations."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student answers 96, the product of 8 and 12, a valid but non-least common multiple.",
        rootCause: "Product-for-LCM Substitution — multiplies the numbers directly, which overcounts their shared factor of 4.",
        remediation: "Since 8 and 12 share a factor of 4, divide the product by 4 to get the true LCM: 96÷4=24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both", hint: "8=2³. 12=2²×3." },
      { level: 2, description: "Take the highest power of each prime", hint: "For 2: highest of 2³,2² is 2³. For 3: only in 12, as 3¹." },
      { level: 3, description: "Multiply", hint: "8 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "S",
    skillId: "HCF-07",
    question: "HCF of 24 and 36?",
    options: [
        { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3²; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "Common but not the highest.", misconceptionId: "E-d3-a" },
        { text: "72", correct: false, feedback: "That's the LCM.", misconceptionId: "E-d3-b" },
        { text: "48", correct: false, feedback: "Not a factor of 36.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student answers 6, a valid but non-maximal common factor.",
        rootCause: "Premature Stop — finds a shared factor and stops without checking for a larger one.",
        remediation: "Take the lowest power of EACH shared prime, not just any common combination — for 2, that's 2² (comparing 2³ and 2²)."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student answers 72, the LCM instead of the HCF.",
        rootCause: "LCM/HCF Label Confusion — takes the highest power of each prime instead of the lowest.",
        remediation: "HCF takes the LOWEST shared power; LCM takes the HIGHEST needed power — apply the correct direction."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 48, which doesn't divide 36 evenly.",
        rootCause: "Single-Number Factor Check — verifies the candidate divides 24 but not 36; 36÷48<1.",
        remediation: "Check the candidate against BOTH numbers before accepting it as a common factor."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both", hint: "24=2³×3. 36=2²×3²." },
      { level: 2, description: "Find shared primes' lowest powers", hint: "For 2: lowest of 2³,2² is 2². For 3: lowest of 3¹,3² is 3¹." },
      { level: 3, description: "Multiply", hint: "4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "S",
    skillId: "DIVR-04",
    question: "Which number is divisible by 6? 214, 312, 411, 500",
    options: [
        { text: "312", correct: true, feedback: "Even, digit sum 6 → divisible by 2 and 3." },
        { text: "214", correct: false, feedback: "Even, but digit sum 7 (not ×3).", misconceptionId: "E-d4-a" },
        { text: "411", correct: false, feedback: "Digit sum 6, but odd.", misconceptionId: "E-d4-b" },
        { text: "500", correct: false, feedback: "Even, digit sum 5.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student picks 214, checking only that it's even.",
        rootCause: "Single-Rule Check — verifies divisibility by 2 (even) but doesn't check the digit-sum rule for 3; 2+1+4=7 is not divisible by 3.",
        remediation: "Divisibility by 6 requires BOTH rules to pass — check divisibility by 2 (even) AND by 3 (digit sum) separately."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student picks 411, checking only the digit-sum rule.",
        rootCause: "Single-Rule Check — verifies divisibility by 3 (digit sum 6) but doesn't check that the number is even; 411 is odd.",
        remediation: "Check the last digit for evenness FIRST — 411 ends in 1, odd, immediately disqualifying it from being divisible by 6, regardless of its digit sum."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student picks 500, checking only that it's even.",
        rootCause: "Single-Rule Check — verifies divisibility by 2 but not by 3; 5+0+0=5 is not divisible by 3.",
        remediation: "Always check both required rules (even AND digit sum divisible by 3) before concluding divisibility by 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Break 6 into its factors", hint: "Divisible by 6 means divisible by BOTH 2 and 3." },
      { level: 2, description: "Check evenness", hint: "Which of the four numbers are even?" },
      { level: 3, description: "Check digit sum among survivors", hint: "Among the even ones, which has a digit sum divisible by 3?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "S",
    skillId: "SQNUM-02",
    question: "√196 = ?",
    options: [
        { text: "14", correct: true, feedback: "14 × 14 = 196." },
        { text: "13", correct: false, feedback: "13² = 169.", misconceptionId: "E-d5-a" },
        { text: "15", correct: false, feedback: "15² = 225.", misconceptionId: "E-d5-b" },
        { text: "16", correct: false, feedback: "16² = 256.", misconceptionId: "E-d5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 13, one less than the correct root.",
        rootCause: "Off-By-One Estimate — estimates the square root without verifying by squaring back, landing one too low.",
        remediation: "Always verify by squaring the candidate answer: 13²=169, which doesn't match 196, signalling the estimate is off."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 15, one more than the correct root.",
        rootCause: "Off-By-One Estimate — similarly estimates without verification, overshooting by one.",
        remediation: "Square the candidate to check: 15²=225≠196, so 15 is too high."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 16, two more than the correct root.",
        rootCause: "Off-By-Two Estimate — a larger estimation error, uncorrected by verification.",
        remediation: "Bracket the answer using known squares: 13²=169 and 15²=225 — since 196 is between these, the root must be 14."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate the range", hint: "10²=100 and 20²=400 — the root is between 10 and 20, likely closer to the middle." },
      { level: 2, description: "Narrow down", hint: "Try 14²: does it equal 196?" },
      { level: 3, description: "Verify", hint: "14 × 14 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "S",
    skillId: "PATT-04",
    question: "2, 4, 8, 16, … next?",
    options: [
        { text: "32", correct: true, feedback: "Multiply by 2 each time." },
        { text: "24", correct: false, feedback: "Adding 8 is not the pattern.", misconceptionId: "E-d6-a" },
        { text: "30", correct: false, feedback: "Not doubling.", misconceptionId: "E-d6-b" },
        { text: "64", correct: false, feedback: "That would be the term after next.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 24, adding a fixed amount instead of doubling.",
        rootCause: "Wrong Operation Type — treats a multiplicative (doubling) sequence as if it were additive.",
        remediation: "Check whether each term is a fixed AMOUNT more, or a fixed MULTIPLE, of the previous term — here, 4÷2=2, 8÷4=2, confirming doubling, not adding."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 30, not following the doubling rule.",
        rootCause: "Guess Without Verification — proposes a number without checking it against the confirmed ×2 pattern.",
        remediation: "Verify the doubling rule against every given term pair before applying it to find the next one."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 64, the term AFTER the next one.",
        rootCause: "Off-By-One Position Error — doubles twice instead of once, skipping ahead one extra step.",
        remediation: "Apply the doubling rule exactly ONE more time from the last given term (16), not twice."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the ratio between terms", hint: "4÷2=2. 8÷4=2. 16÷8=2." },
      { level: 2, description: "Confirm it's constant", hint: "Every term is double the one before — a multiplicative (geometric) sequence." },
      { level: 3, description: "Apply it once more", hint: "16 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "T",
    skillId: "FACT-04",
    question: "How many factors does 72 have?",
    options: [
        { text: "12", correct: true, feedback: "72=2³×3² → (3+1)(2+1)=12." },
        { text: "6", correct: false, feedback: "That comes from multiplying the exponents directly (3×2=6) instead of adding 1 to each first.", misconceptionId: "E-d7-a" },
        { text: "8", correct: false, feedback: "Not correct.", misconceptionId: "E-d7-b" },
        { text: "10", correct: false, feedback: "Close, but off by 2.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student answers 6, multiplying the exponents directly instead of adding 1 to each first.",
        rootCause: "Missing Plus-One — computes 3×2=6 (the raw exponents multiplied) instead of (3+1)×(2+1)=12.",
        remediation: "Apply the +1 rule to EVERY exponent before multiplying: (3+1) and (2+1), not the exponents themselves."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student answers 8, an arithmetic or formula slip.",
        rootCause: "Formula Misapplication — doesn't correctly apply the multiply-(exponent+1)-for-each-prime rule.",
        remediation: "Write out each factor of the formula separately: (3+1)=4, (2+1)=3, then multiply 4×3 step by step."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student answers 10, close to but not matching the correct 12.",
        rootCause: "Multiplication Slip — makes a small arithmetic error computing 4×3.",
        remediation: "Recompute 4×3 carefully and compare to the given answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise 72", hint: "72 = 2³ × 3²." },
      { level: 2, description: "Add 1 to each exponent", hint: "(3+1) and (2+1) = 4 and 3." },
      { level: 3, description: "Multiply", hint: "4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "T",
    skillId: "MULT-08",
    question: "Two numbers have LCM 60 and HCF 5. If one number is 15, the other is?",
    options: [
        { text: "20", correct: true, feedback: "Product = 5×60 = 300; other = 300÷15 = 20." },
        { text: "60", correct: false, feedback: "That's the LCM.", misconceptionId: "E-d8-a" },
        { text: "5", correct: false, feedback: "That's the HCF.", misconceptionId: "E-d8-b" },
        { text: "30", correct: false, feedback: "Product 15×30=450, but HCF×LCM=300.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student answers 60, restating the given LCM instead of computing the missing number.",
        rootCause: "Given-Value Restatement — reports one of the given values instead of applying the formula.",
        remediation: "Underline what's asked (the other number) versus what's given (HCF, LCM, and one number)."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student answers 5, restating the given HCF.",
        rootCause: "Given-Value Restatement — similarly reports a given value instead of computing.",
        remediation: "Apply the formula: other number = (HCF×LCM)÷known number, rather than repeating a given value."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student answers 30, an unverified guess.",
        rootCause: "Untested Guess — proposes a value without checking it against HCF×LCM=300.",
        remediation: "Verify: does your answer × 15 equal HCF×LCM (300)? 30×15=450≠300, revealing the error."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "Product of two numbers = HCF × LCM." },
      { level: 2, description: "Substitute known values", hint: "15 × (other number) = 5 × 60 = 300." },
      { level: 3, description: "Solve", hint: "Other number = 300 ÷ 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "T",
    skillId: "MULT-04",
    question: "Product of two numbers is 540, HCF is 6. Find LCM.",
    options: [
        { text: "90", correct: true, feedback: "LCM = product ÷ HCF = 540 ÷ 6 = 90." },
        { text: "6", correct: false, feedback: "That's the HCF.", misconceptionId: "E-d9-a" },
        { text: "540", correct: false, feedback: "That's the product.", misconceptionId: "E-d9-b" },
        { text: "3240", correct: false, feedback: "That's product × HCF, not correct.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 6, restating the given HCF.",
        rootCause: "Given-Value Restatement — reports the HCF instead of computing the LCM.",
        remediation: "Apply the formula LCM = product ÷ HCF, rather than repeating a given value."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 540, restating the given product.",
        rootCause: "Given-Value Restatement — reports the product instead of dividing by the HCF.",
        remediation: "Underline what's asked (LCM) versus what's given (product and HCF)."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 3240, multiplying instead of dividing.",
        rootCause: "Wrong Operation — multiplies the product by the HCF instead of dividing.",
        remediation: "Recall LCM = product ÷ HCF, a DIVISION, not a multiplication."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "LCM = product ÷ HCF." },
      { level: 2, description: "Substitute the values", hint: "LCM = 540 ÷ 6." },
      { level: 3, description: "Compute", hint: "540 ÷ 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "T",
    skillId: "DIVR-06",
    question: "Which number is divisible by 2, 3, and 5? 210, 225, 232, 250",
    options: [
        { text: "210", correct: true, feedback: "Ends in 0 (by 2,5), digit sum 3 (by 3)." },
        { text: "225", correct: false, feedback: "Ends in 5, odd (not by 2).", misconceptionId: "E-d10-a" },
        { text: "232", correct: false, feedback: "Digit sum 7, not by 3; also not by 5.", misconceptionId: "E-d10-b" },
        { text: "250", correct: false, feedback: "Digit sum 7, not by 3.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student picks 225, checking divisibility by 5 and 3 but not by 2.",
        rootCause: "Partial Rule Check — verifies two of the three required rules (ends in 5→div by 5; digit sum 9→div by 3) but misses that 225 is odd, so not divisible by 2.",
        remediation: "Check ALL THREE divisors (2, 3, and 5) individually — a number ending in 5 (not 0) is never divisible by 2."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student picks 232, checking only divisibility by 2.",
        rootCause: "Partial Rule Check — verifies 232 is even but doesn't check the digit sum for 3 or the last digit for 5.",
        remediation: "Check all three rules: is it even? Is the digit sum divisible by 3? Does it end in 0 or 5?"
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student picks 250, checking divisibility by 2 and 5 but not by 3.",
        rootCause: "Partial Rule Check — verifies 250 is even and ends in 0 (div by 5) but misses the digit sum check for 3.",
        remediation: "Compute the digit sum explicitly for every candidate and check it against the multiple-of-3 rule, even when the other two rules pass."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the easiest rule first: ends in 0 or 5", hint: "For divisibility by 2 AND 5 together, the number must end in 0 specifically (not just 5)." },
      { level: 2, description: "Narrow the candidates", hint: "Which numbers end in 0?" },
      { level: 3, description: "Check digit sum for 3", hint: "Among those, which has a digit sum divisible by 3?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "T",
    skillId: "SQNUM-03",
    question: "Which is a perfect square? 2³×3², 2⁴×3², 2²×3³, 2×3⁴",
    options: [
        { text: "2⁴ × 3²", correct: true, feedback: "Exponents 4 and 2 are even → perfect square." },
        { text: "2³ × 3²", correct: false, feedback: "Exponent 3 is odd.", misconceptionId: "E-d11-a" },
        { text: "2² × 3³", correct: false, feedback: "Exponent 3 is odd.", misconceptionId: "E-d11-b" },
        { text: "2 × 3⁴", correct: false, feedback: "Exponent of 2 is 1 (odd).", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student picks 2³×3², checking only the exponent of 3.",
        rootCause: "Partial Exponent Check — verifies one exponent is even (3²) and concludes 'perfect square' without checking the other (2³, odd).",
        remediation: "Check EVERY exponent in the expression, not just one — a single odd exponent disqualifies the whole number."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student picks 2²×3³, checking only the exponent of 2.",
        rootCause: "Partial Exponent Check — similarly checks only one exponent (2², even) and misses the other (3³, odd).",
        remediation: "Underline every exponent before judging, and only conclude 'perfect square' once ALL are confirmed even."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student picks 2×3⁴, missing the implicit exponent of 1 on the bare '2'.",
        rootCause: "Implicit-Exponent Blindness — a prime written without a visible exponent (like '2') actually has exponent 1, which is odd, but is easy to overlook.",
        remediation: "Rewrite every 'bare' prime with its exponent shown explicitly (2 becomes 2¹) so its odd exponent is visible."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "A number is a perfect square exactly when EVERY exponent in its prime factorisation is even." },
      { level: 2, description: "Check each option's exponents, including implicit ones", hint: "Write out every exponent explicitly, even bare primes (treat '2' as '2¹')." },
      { level: 3, description: "Confirm all pass", hint: "Only the option where ALL exponents are even qualifies." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "T",
    skillId: "PATT-10",
    question: "1, 1, 2, 3, 5, … next?",
    options: [
        { text: "8", correct: true, feedback: "Fibonacci: each term is the sum of the previous two." },
        { text: "7", correct: false, feedback: "Not following the rule.", misconceptionId: "E-d12-a" },
        { text: "10", correct: false, feedback: "Not following the rule.", misconceptionId: "E-d12-b" },
        { text: "13", correct: false, feedback: "That would be the term after next.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 7, not applying the sum-of-previous-two rule.",
        rootCause: "Guess Without Rule Verification — proposes a number without checking the Fibonacci rule against the given terms.",
        remediation: "Verify the rule against multiple pairs first: 1+1=2 ✓, 1+2=3 ✓, 2+3=5 ✓ — before applying it once more."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 10, not applying the rule.",
        rootCause: "Guess Without Rule Verification — similarly doesn't derive the answer from the confirmed rule.",
        remediation: "State the rule explicitly ('each term is the sum of the two before it') and apply it to the last two terms, 3 and 5."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 13, the term AFTER the next one.",
        rootCause: "Off-By-One Position Error — applies the rule one extra time, skipping ahead.",
        remediation: "Apply the rule exactly once from the last two given terms (3 and 5): 3+5=8, not 5+8=13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check pairs of terms", hint: "1+1=2, 1+2=3, 2+3=5 — each term is the sum of the two before it." },
      { level: 2, description: "Identify the last two terms", hint: "The last two given terms are 3 and 5." },
      { level: 3, description: "Apply the rule once", hint: "3 + 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "C",
    skillId: "FACT-04",
    question: "If 2ᵃ × 3² has 12 factors, find a.",
    options: [
        { text: "3", correct: true, feedback: "(a+1)×(2+1) = 12 → a+1 = 4 → a = 3." },
        { text: "2", correct: false, feedback: "Then factors = 3×3 = 9.", misconceptionId: "E-d13-a" },
        { text: "4", correct: false, feedback: "Then factors = 5×3 = 15.", misconceptionId: "E-d13-b" },
        { text: "1", correct: false, feedback: "Then factors = 2×3 = 6.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 2, one too low.",
        rootCause: "Formula Misapplication — doesn't correctly solve (a+1)×3=12 for a+1=4.",
        remediation: "Isolate step by step: (a+1)×3=12, so (a+1)=4, so a=3 — verify by substituting back."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 4, one too high.",
        rootCause: "Guess Without Verification — tries a plausible value without solving the equation algebraically.",
        remediation: "Solve (a+1)×3=12 directly rather than guessing, then verify the result gives exactly 12 factors."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 1, too low.",
        rootCause: "Off-By-Several — significantly miscounts the required exponent.",
        remediation: "Plug a=1 into the formula: (1+1)×3=6, and compare to the required 12 — the mismatch shows a=1 is too low."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the factor-count formula", hint: "For 2ᵃ×3², total factors = (a+1)(2+1)." },
      { level: 2, description: "Simplify", hint: "(2+1)=3. So the formula is 3×(a+1)." },
      { level: 3, description: "Solve for a", hint: "3×(a+1)=12. Divide by 3: (a+1)=4. What is a?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "C",
    skillId: "MULT-05",
    question: "Three bells ring every 6, 8, and 10 min. They ring together at 12:00. Next together?",
    options: [
        { text: "2:00 PM", correct: true, feedback: "LCM(6,8,10)=120 min = 2 hours." },
        { text: "1:00 PM", correct: false, feedback: "60 min is not the LCM.", misconceptionId: "E-d14-a" },
        { text: "1:30 PM", correct: false, feedback: "90 min is not the LCM.", misconceptionId: "E-d14-b" },
        { text: "4:00 PM", correct: false, feedback: "240 min is a common multiple but not the least (least is 120).", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 1:00 PM, using 60 minutes, a round-looking interval.",
        rootCause: "Round-Number Substitution — defaults to a familiar 1-hour interval rather than computing the actual LCM of 6, 8, and 10.",
        remediation: "Prime-factorise each interval (6=2×3, 8=2³, 10=2×5) and take the highest power of each prime, rather than guessing a round number."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 1:30 PM, using 90 minutes, which isn't even a common multiple.",
        rootCause: "Untested Candidate — proposes an interval without checking it divides evenly by all three periods.",
        remediation: "Check the candidate against ALL THREE periods before accepting it."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 4:00 PM, using 240 minutes — a valid common multiple, but not the smallest.",
        rootCause: "Non-Least Common Multiple — correctly finds a common multiple but doesn't check for a smaller one.",
        remediation: "Compute the LCM systematically via prime factorisation to guarantee the smallest common multiple."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise the three intervals", hint: "6=2×3. 8=2³. 10=2×5." },
      { level: 2, description: "Take the highest power of each prime", hint: "For 2: highest of 2¹,2³,2¹ is 2³. For 3: only in 6, as 3¹. For 5: only in 10, as 5¹." },
      { level: 3, description: "Multiply and convert to time", hint: "8×3×5 = 120 minutes. Convert to hours." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "C",
    skillId: "HCF-08",
    question: "HCF of two numbers is 9. Sum = 63, difference = 9. Find the larger number.",
    options: [
        { text: "36", correct: true, feedback: "Larger = (sum + diff)/2 = (63+9)/2 = 36." },
        { text: "27", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-d15-a" },
        { text: "18", correct: false, feedback: "Not consistent with a sum of 63.", misconceptionId: "E-d15-b" },
        { text: "45", correct: false, feedback: "The pair sum would be 45+36=81.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 27, correctly finding both numbers but reporting the smaller one.",
        rootCause: "Wrong Number Selected — correctly computes both larger=(sum+diff)/2=36 and smaller=(sum-diff)/2=27, but reports the smaller instead of the larger asked for.",
        remediation: "Label which formula gives the larger number ((sum+diff)/2) versus the smaller ((sum-diff)/2) before answering."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 18, an unverified guess.",
        rootCause: "Untested Guess — proposes a value without applying the sum/difference formula.",
        remediation: "Use larger=(sum+diff)/2 directly: (63+9)/2, rather than guessing."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 45, which doesn't satisfy the given sum condition with its pair.",
        rootCause: "Formula Misapplication — computes a value that, when paired with its complement, doesn't actually sum to 63.",
        remediation: "After finding a candidate, verify it against BOTH the sum and difference conditions with its actual pair — 45's pair would need to sum to 63, meaning the pair is 45 and 18, but 45-18=27≠9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the sum/difference formulas", hint: "Larger = (sum+difference)/2. Smaller = (sum-difference)/2." },
      { level: 2, description: "Substitute the values", hint: "Larger = (63+9)/2." },
      { level: 3, description: "Compute", hint: "72/2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "C",
    skillId: "DIVR-02",
    question: "Find the largest digit x such that 4x5 is divisible by 3.",
    options: [
        { text: "9", correct: true, feedback: "Digit sum 4+9+5=18, divisible by 3." },
        { text: "8", correct: false, feedback: "Sum 17, not divisible by 3.", misconceptionId: "E-d16-a" },
        { text: "7", correct: false, feedback: "Sum 16, not divisible by 3.", misconceptionId: "E-d16-b" },
        { text: "6", correct: false, feedback: "6 works (sum 15) but 9 is larger.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student answers 8, an untested guess.",
        rootCause: "Untested Guess — picks a large digit without computing the resulting digit sum (17) and checking it against the multiple-of-3 rule.",
        remediation: "Test each candidate digit from 9 downward, computing the digit sum each time, and stop at the FIRST one that's a multiple of 3."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student answers 7, an untested guess.",
        rootCause: "Untested Guess — similarly doesn't check the resulting digit sum (16) against the rule.",
        remediation: "Build a quick table of digit sums for x=9,8,7,6... and mark which are multiples of 3."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student answers 6, a valid digit but not the largest.",
        rootCause: "Premature Stop — finds a valid digit and stops without checking whether a LARGER digit also works.",
        remediation: "Since the question asks for the LARGEST valid digit, test from 9 downward and stop at the first success — don't stop at the first valid digit found when testing in the wrong direction."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the digit-sum expression", hint: "Digit sum = 4+x+5 = 9+x." },
      { level: 2, description: "Test from the largest digit down", hint: "Start with x=9: is 9+9=18 a multiple of 3?" },
      { level: 3, description: "Confirm it's the largest", hint: "Since 9 is the largest possible digit and it works, you're done." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "C",
    skillId: "SQNUM-06",
    question: "Area of a square is 121 cm². Perimeter?",
    options: [
        { text: "44 cm", correct: true, feedback: "Side = √121 = 11 cm; perimeter = 4×11 = 44 cm." },
        { text: "11 cm", correct: false, feedback: "That's the side.", misconceptionId: "E-d17-a" },
        { text: "22 cm", correct: false, feedback: "That's only half the perimeter.", misconceptionId: "E-d17-b" },
        { text: "121 cm", correct: false, feedback: "That's the area.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 11 cm, the side length, without computing the perimeter.",
        rootCause: "Missing Final Step — correctly finds the side but stops there.",
        remediation: "Underline what's asked (perimeter) versus what's found so far (side) — treat finding the side as step one of two."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 22 cm, doubling the side instead of quadrupling it.",
        rootCause: "Wrong Multiplier — multiplies by 2 instead of 4.",
        remediation: "Sketch a square and label all FOUR sides to reinforce perimeter = 4 × side."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 121 cm, restating the given area instead of computing the perimeter.",
        rootCause: "Given-Value Restatement — reports the area (already given in the units cm²) mislabeled as cm, without computing anything.",
        remediation: "Notice the units mismatch — area is measured in cm², perimeter in cm — this is a strong signal that 121 cannot be the perimeter."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = √area = √121." },
      { level: 2, description: "Compute the square root", hint: "What number times itself gives 121?" },
      { level: 3, description: "Compute the perimeter", hint: "Perimeter = 4 × side." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "C",
    skillId: "PATT-06",
    question: "nth term = n² − 1. Find the 6th term.",
    options: [
        { text: "35", correct: true, feedback: "6² = 36, minus 1 = 35." },
        { text: "34", correct: false, feedback: "36−2=34, not the formula.", misconceptionId: "E-d18-a" },
        { text: "36", correct: false, feedback: "That's just 6².", misconceptionId: "E-d18-b" },
        { text: "25", correct: false, feedback: "That's 5².", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 34, subtracting 2 instead of 1.",
        rootCause: "Wrong Constant Subtracted — misremembers or miscalculates the constant in the formula, subtracting 2 instead of 1.",
        remediation: "Re-read the formula carefully: n²−1 means subtract exactly 1, not 2."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 36, computing n² but forgetting the −1.",
        rootCause: "Incomplete Formula Application — computes 6²=36 correctly but drops the '−1' part of the formula.",
        remediation: "Write the full formula before substituting, and treat the '−1' as a required final step."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 25, using n=5 instead of n=6.",
        rootCause: "Off-By-One Position Error — substitutes the wrong value of n.",
        remediation: "Confirm n=6 (the 6th term) before substituting into the formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify n", hint: "You want the 6th term, so n=6." },
      { level: 2, description: "Compute n²", hint: "6² = ?" },
      { level: 3, description: "Subtract 1", hint: "Take your answer to n² and subtract 1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "H",
    skillId: "FACT-08",
    question: "A number between 50 and 60 has exactly 2 factors and digit sum 8. Find it.",
    options: [
        { text: "53", correct: true, feedback: "Primes in range: 53,59. Digit sum: 5+3=8 (yes), 5+9=14 (no). So 53." },
        { text: "59", correct: false, feedback: "Digit sum 14.", misconceptionId: "E-d19-a" },
        { text: "51", correct: false, feedback: "Composite (3×17).", misconceptionId: "E-d19-b" },
        { text: "57", correct: false, feedback: "Composite (3×19).", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student picks 59, correctly prime but failing the digit-sum condition.",
        rootCause: "Partial Condition Check — verifies 'exactly 2 factors' (prime) but doesn't check the digit-sum-8 condition; 5+9=14≠8.",
        remediation: "Check EVERY stated condition, not just the first one satisfied — list both conditions and verify a candidate against both."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student picks 51, which isn't actually prime.",
        rootCause: "Missing Divisibility Check — doesn't verify 51 has exactly 2 factors; 51=3×17, so it has more than 2 factors.",
        remediation: "Test each candidate against small primes before accepting it as having 'exactly 2 factors' — digit sum 5+1=6 signals divisibility by 3."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student picks 57, which isn't actually prime.",
        rootCause: "Missing Divisibility Check — doesn't verify 57 has exactly 2 factors; 57=3×19.",
        remediation: "Digit sum 5+7=12 signals divisibility by 3, confirming 57 is composite before checking anything else."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find primes in the range", hint: "List numbers 51-59 and test each for primality." },
      { level: 2, description: "Narrow to just the primes", hint: "Among 51-59, which numbers have exactly 2 factors (are prime)?" },
      { level: 3, description: "Apply the digit-sum condition", hint: "Among the primes found, which has digit sum 8?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "H",
    skillId: "DIVR-08",
    question: "Find the smallest 2-digit number that leaves remainder 5 when divided by 7 and remainder 7 when divided by 9.",
    options: [
        { text: "61", correct: true, feedback: "61÷7=8 R5, 61÷9=6 R7." },
        { text: "47", correct: false, feedback: "47÷9=5 R2, not R7.", misconceptionId: "E-d20-a" },
        { text: "68", correct: false, feedback: "68÷7=9 R5, but 68÷9=7 R5, not R7.", misconceptionId: "E-d20-b" },
        { text: "75", correct: false, feedback: "75÷7=10 R5, 75÷9=8 R3.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student picks 47, satisfying the remainder-by-7 condition but not the remainder-by-9 condition.",
        rootCause: "Partial Condition Check — verifies one remainder condition (47÷7=6 R5) and stops, without checking the second (47÷9 gives R2, not R7).",
        remediation: "Check BOTH remainder conditions for every candidate — a number satisfying only one of the two isn't valid."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student picks 68, satisfying the remainder-by-7 condition but giving the wrong remainder for 9.",
        rootCause: "Partial Condition Check — verifies 68÷7=9 R5 but doesn't correctly check 68÷9, which gives R5, not the required R7.",
        remediation: "Compute both remainders explicitly for every candidate before accepting it."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student picks 75, satisfying the remainder-by-7 condition but not by-9.",
        rootCause: "Partial Condition Check — verifies 75÷7=10 R5 but 75÷9 gives R3, not R7.",
        remediation: "List multiples of 7 plus 5 (12,19,26,33,40,47,54,61,68,75...) and check EACH against the remainder-by-9 condition systematically, rather than testing candidates out of order."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List numbers satisfying the first condition", hint: "Numbers leaving remainder 5 when divided by 7: 12, 19, 26, 33, 40, 47, 54, 61, 68, 75..." },
      { level: 2, description: "Check the second condition for each", hint: "For each number in that list, divide by 9 and check the remainder." },
      { level: 3, description: "Find the first that satisfies both", hint: "Which number in the list gives remainder 7 when divided by 9?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "How many factors does 96 have? (96 = 2⁵ × 3)",
    options: [
        { text: "12", correct: true, feedback: "(5+1)(1+1)=12." },
        { text: "6", correct: false, feedback: "Too few; recompute (exponent+1) for each prime and multiply.", misconceptionId: "E-r1-a" },
        { text: "8", correct: false, feedback: "Recheck the formula: (5+1)×(1+1).", misconceptionId: "E-r1-b" },
        { text: "10", correct: false, feedback: "Close, but not (5+1)×(1+1).", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers 6, using the exponent of 2 directly instead of adding 1.",
        rootCause: "Missing Plus-One — uses the raw exponent (5) or (5+1) inconsistently, landing on 6 instead of 12.",
        remediation: "Apply +1 to EVERY exponent explicitly: (5+1) and (1+1), then multiply."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers 8, an arithmetic slip.",
        rootCause: "Formula Misapplication — doesn't correctly compute (5+1)×(1+1).",
        remediation: "Write out each part of the formula separately before multiplying."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers 10, close to but not matching 12.",
        rootCause: "Multiplication Slip — makes a small error in the final multiplication.",
        remediation: "Recompute 6×2 carefully."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the exponents", hint: "2⁵×3¹ has exponents 5 and 1." },
      { level: 2, description: "Add 1 to each", hint: "(5+1) and (1+1) = 6 and 2." },
      { level: 3, description: "Multiply", hint: "6 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-07",
    question: "LCM of 10 and 15?",
    options: [
        { text: "30", correct: true, feedback: "10=2×5, 15=3×5; LCM=2×3×5=30." },
        { text: "5", correct: false, feedback: "That's the HCF, not the LCM.", misconceptionId: "E-r2-a" },
        { text: "150", correct: false, feedback: "That's the product, not the LCM.", misconceptionId: "E-r2-b" },
        { text: "60", correct: false, feedback: "A common multiple, but not the least.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student answers 5, the HCF instead of the LCM.",
        rootCause: "LCM/HCF Label Confusion — computes the shared factor but reports it for an LCM question.",
        remediation: "Restate which is asked before answering: HCF or LCM."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 150, the plain product.",
        rootCause: "Product-for-LCM Substitution — multiplies directly instead of accounting for the shared factor of 5.",
        remediation: "Since 10 and 15 share a factor of 5, divide the product by 5 to get the true LCM."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 60, a valid but non-least common multiple.",
        rootCause: "Non-Least Common Multiple — finds a common multiple but doesn't check for a smaller one.",
        remediation: "List multiples of both numbers and take the first one that appears in both lists."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both", hint: "10=2×5. 15=3×5." },
      { level: 2, description: "Take the highest power of each prime", hint: "2 (only in 10), 3 (only in 15), 5 (shared, take once)." },
      { level: 3, description: "Multiply", hint: "2 × 3 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-07",
    question: "HCF of 36 and 48?",
    options: [
        { text: "12", correct: true, feedback: "36=2²×3², 48=2⁴×3; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "Common but not the highest.", misconceptionId: "E-r3-a" },
        { text: "24", correct: false, feedback: "24 is not a factor of 36.", misconceptionId: "E-r3-b" },
        { text: "144", correct: false, feedback: "That's the LCM.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 6, a valid but non-maximal common factor.",
        rootCause: "Premature Stop — finds a shared factor and stops without checking for a larger one.",
        remediation: "Take the lowest power of each shared prime: for 2, compare 2² and 2⁴, taking the smaller exponent, 2²."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 24, which doesn't divide 36 evenly.",
        rootCause: "Single-Number Factor Check — verifies the candidate divides 48 but not 36; 36÷24=1.5.",
        remediation: "Check the candidate against BOTH numbers before accepting it."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 144, the LCM instead of the HCF.",
        rootCause: "LCM/HCF Label Confusion — takes the highest power of each prime instead of the lowest.",
        remediation: "HCF takes the lowest shared power; LCM takes the highest needed power."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both", hint: "36=2²×3². 48=2⁴×3." },
      { level: 2, description: "Find shared primes' lowest powers", hint: "For 2: lowest of 2²,2⁴ is 2². For 3: lowest of 3²,3¹ is 3¹." },
      { level: 3, description: "Multiply", hint: "4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-03",
    question: "Which number is divisible by 4? 516, 514, 518, 522",
    options: [
        { text: "516", correct: true, feedback: "Last two digits 16, divisible by 4." },
        { text: "514", correct: false, feedback: "Last two digits 14, not divisible by 4.", misconceptionId: "E-r4-a" },
        { text: "518", correct: false, feedback: "Last two digits 18, not divisible by 4.", misconceptionId: "E-r4-b" },
        { text: "522", correct: false, feedback: "Last two digits 22, not divisible by 4.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student picks 514, likely just checking that it's even rather than applying the last-two-digits rule.",
        rootCause: "Wrong Rule Applied — checks divisibility by 2 (even) instead of the specific last-two-digits-divisible-by-4 rule; 14÷4=3.5 is not a whole number.",
        remediation: "For divisibility by 4, check only the LAST TWO digits as their own number and test whether THAT is divisible by 4 — not just whether the whole number is even."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student picks 518, similarly not applying the correct rule.",
        rootCause: "Wrong Rule Applied — checks evenness instead of the last-two-digits rule; 18÷4=4.5 is not a whole number.",
        remediation: "Isolate the last two digits (18) and test that number alone against divisibility by 4."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student picks 522, similarly not applying the correct rule.",
        rootCause: "Wrong Rule Applied — checks evenness instead of the last-two-digits rule; 22÷4=5.5 is not a whole number.",
        remediation: "Test the last two digits (22) directly against divisibility by 4, rather than just checking if the number is even."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "A number is divisible by 4 exactly when its LAST TWO digits, read as their own number, are divisible by 4." },
      { level: 2, description: "Isolate the last two digits", hint: "For 516, 514, 518, 522: the last two digits are 16, 14, 18, 22." },
      { level: 3, description: "Test each", hint: "Which of 16, 14, 18, 22 is divisible by 4?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "√225 = ?",
    options: [
        { text: "15", correct: true, feedback: "15×15=225." },
        { text: "14", correct: false, feedback: "14² = 196.", misconceptionId: "E-r5-a" },
        { text: "16", correct: false, feedback: "16² = 256.", misconceptionId: "E-r5-b" },
        { text: "25", correct: false, feedback: "That's a different number entirely, not the square root.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 14, one less than the correct root.",
        rootCause: "Off-By-One Estimate — estimates without verifying by squaring back.",
        remediation: "Square the candidate to check: 14²=196≠225, so 14 is too low."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 16, one more than the correct root.",
        rootCause: "Off-By-One Estimate — similarly estimates without verification.",
        remediation: "Square the candidate: 16²=256≠225, so 16 is too high."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 25, an unrelated number.",
        rootCause: "Digit Confusion — perhaps notices '25' visually resembles part of 225 and guesses it, without any actual square-root computation.",
        remediation: "The square root of 225 asks 'what number times itself gives 225?' — 25² would be 625, far too large; test smaller candidates instead."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate the range", hint: "10²=100 and 20²=400 — the root is between 10 and 20." },
      { level: 2, description: "Narrow down", hint: "Try 15²: does it equal 225?" },
      { level: 3, description: "Verify", hint: "15 × 15 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-04",
    question: "3, 9, 27, … next?",
    options: [
        { text: "81", correct: true, feedback: "Multiply by 3 each time." },
        { text: "30", correct: false, feedback: "Adding, not multiplying.", misconceptionId: "E-r6-a" },
        { text: "54", correct: false, feedback: "That's ×2, not ×3.", misconceptionId: "E-r6-b" },
        { text: "243", correct: false, feedback: "That's the term after next.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 30, adding a fixed amount instead of tripling.",
        rootCause: "Wrong Operation Type — treats a multiplicative sequence as additive.",
        remediation: "Check the ratio between terms: 9÷3=3, 27÷9=3 — a constant ratio signals multiplication, not addition."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 54, doubling instead of tripling.",
        rootCause: "Wrong Multiplier — applies ×2 instead of the correct ×3.",
        remediation: "Verify the multiplier against the given terms: 3×3=9 ✓, 9×3=27 ✓ — confirming ×3, not ×2."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 243, the term AFTER the next one.",
        rootCause: "Off-By-One Position Error — multiplies twice instead of once.",
        remediation: "Apply the ×3 rule exactly ONE more time from the last given term (27), not twice."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the ratio between terms", hint: "9÷3=3. 27÷9=3." },
      { level: 2, description: "Confirm it's constant", hint: "Every term is triple the one before." },
      { level: 3, description: "Apply it once more", hint: "27 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-02",
    question: "Prime factorisation of 84.",
    options: [
        { text: "2² × 3 × 7", correct: true, feedback: "84 = 4×21 = 2²×3×7." },
        { text: "2 × 3 × 14", correct: false, feedback: "14 is not prime; break it into 2×7.", misconceptionId: "E-r7-a" },
        { text: "4 × 21", correct: false, feedback: "Neither 4 nor 21 is prime.", misconceptionId: "E-r7-b" },
        { text: "2³ × 3 × 7", correct: false, feedback: "That would be 168, not 84.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student stops at 2×3×14, leaving a composite factor (14) unfactored.",
        rootCause: "Incomplete Factor Tree — stops before every factor is prime.",
        remediation: "Circle every number in the factorisation and ask 'is this prime?' — 14 isn't, so break it into 2×7."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student stops at 4×21, an early factor pair with no primes fully broken down.",
        rootCause: "Incomplete Factor Tree — stops at the first level of factoring.",
        remediation: "Continue factoring until every number in the product is itself prime — 4=2² and 21=3×7."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student answers 2³×3×7, which multiplies out to 168, not 84.",
        rootCause: "Factor-Tree Miscount — over-counts a branch while building the factor tree, inflating the exponent of 2.",
        remediation: "Verify by multiplying back: 2³×3×7=8×21=168 — comparing to the original 84 reveals the miscount."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into a factor pair", hint: "84 = 4 × 21. Are 4 and 21 prime?" },
      { level: 2, description: "Break each down further", hint: "4 = 2×2 = 2². 21 = 3×7." },
      { level: 3, description: "Combine", hint: "2² × 3 × 7." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-07",
    question: "LCM of 12 and 18?",
    options: [
        { text: "36", correct: true, feedback: "12=2²×3, 18=2×3²; LCM=2²×3²=36." },
        { text: "6", correct: false, feedback: "That's the HCF.", misconceptionId: "E-r8-a" },
        { text: "72", correct: false, feedback: "A common multiple, but not the least.", misconceptionId: "E-r8-b" },
        { text: "216", correct: false, feedback: "That's the product, not the LCM.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student answers 6, the HCF instead of the LCM.",
        rootCause: "LCM/HCF Label Confusion — computes the shared factor but reports it for an LCM question.",
        remediation: "Restate which is asked before answering."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student answers 72, a valid but non-least common multiple.",
        rootCause: "Non-Least Common Multiple — finds a common multiple but doesn't check for a smaller one.",
        remediation: "Compute the LCM via prime factorisation (highest power of each prime) to guarantee the smallest common multiple."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student answers 216, the plain product.",
        rootCause: "Product-for-LCM Substitution — multiplies directly instead of accounting for the shared factor.",
        remediation: "Since 12 and 18 share a factor of 6, divide the product by 6 to get the true LCM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both", hint: "12=2²×3. 18=2×3²." },
      { level: 2, description: "Take the highest power of each prime", hint: "For 2: highest of 2²,2¹ is 2². For 3: highest of 3¹,3² is 3²." },
      { level: 3, description: "Multiply", hint: "4 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9", order: 9, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-05",
    question: "If a number is divisible by 9, which must be true?",
    options: [
        { text: "It is also divisible by 3.", correct: true, feedback: "Any multiple of 9 is a multiple of 3." },
        { text: "It is even.", correct: false, feedback: "9 is odd, so not every multiple of 9 is even.", misconceptionId: "E-r9-a" },
        { text: "It ends in 9.", correct: false, feedback: "Not all multiples of 9 end in 9 (e.g., 18, 27).", misconceptionId: "E-r9-b" },
        { text: "It is divisible by 6.", correct: false, feedback: "It may not be even, so it may not be divisible by 6.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student picks 'It is even', assuming divisibility by 9 implies evenness.",
        rootCause: "False Property Assumption — assumes a property (evenness) follows from divisibility by 9, without testing a counter-example; 9 itself is odd and divisible by 9.",
        remediation: "Test with the number 9 itself: is it even? No — this disproves the claim immediately."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student picks 'It ends in 9', overgeneralizing from the divisor's own last digit.",
        rootCause: "Last-Digit Overgeneralization — assumes multiples of 9 must end in the digit 9, confusing the divisor's digit with a property of its multiples.",
        remediation: "List several multiples of 9 (9, 18, 27, 36, 45...) and observe their last digits vary — the ending-digit pattern doesn't hold."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student picks 'It is divisible by 6', assuming divisibility by 9 implies divisibility by 6.",
        rootCause: "False Implication — assumes divisibility by 9 (3²) implies divisibility by 6 (2×3), without checking that 6 requires a factor of 2 which 9 doesn't guarantee.",
        remediation: "Test with 9 itself: is it divisible by 6? No (9÷6=1.5) — since 9 isn't even, it can't be divisible by 6."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test with the number 9 itself", hint: "9 is divisible by 9 (trivially). Is 9 even? Does it end in 9? Is it divisible by 6?" },
      { level: 2, description: "Test with another multiple", hint: "18 is also divisible by 9. Check the same properties for 18." },
      { level: 3, description: "Find what's TRUE in both cases", hint: "Which property holds for BOTH 9 and 18 (and every other multiple of 9)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10", order: 10, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "The square of a number is 169. Find the number.",
    options: [
        { text: "13", correct: true, feedback: "13 × 13 = 169." },
        { text: "12", correct: false, feedback: "12² = 144.", misconceptionId: "E-r10-a" },
        { text: "14", correct: false, feedback: "14² = 196.", misconceptionId: "E-r10-b" },
        { text: "17", correct: false, feedback: "17² = 289.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student answers 12, one less than the correct root.",
        rootCause: "Off-By-One Estimate — estimates without verifying by squaring back.",
        remediation: "Square the candidate: 12²=144≠169, so 12 is too low."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student answers 14, one more than the correct root.",
        rootCause: "Off-By-One Estimate — similarly estimates without verification.",
        remediation: "Square the candidate: 14²=196≠169, so 14 is too high."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student answers 17, significantly overshooting.",
        rootCause: "Poor Estimation — guesses a value far from the correct root without bracketing it using known squares.",
        remediation: "Bracket the answer: 10²=100 and 20²=400 — 169 is between these, closer to the lower end, suggesting a value near 13."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Estimate the range", hint: "10²=100 and 20²=400 — the number is between 10 and 20." },
      { level: 2, description: "Narrow down", hint: "Try 13²: does it equal 169?" },
      { level: 3, description: "Verify", hint: "13 × 13 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
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
    title: "Factors, Multiples & Number Properties — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every factors-and-multiples cluster.",
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

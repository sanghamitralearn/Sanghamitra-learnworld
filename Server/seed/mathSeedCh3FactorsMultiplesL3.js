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
    skillId: "FACT-04",
    question: "A number has prime factorisation \\( 2^a \\times 3 \\times 5 \\) and has exactly 8 factors. Find \\( a \\).",
    options: [
        { text: "1", correct: true, feedback: "Factors = (a+1)×2×2 = 4(a+1) = 8 → a+1 = 2 → a = 1." },
        { text: "2", correct: false, feedback: "If a=2, factors = 4×3 = 12, not 8.", misconceptionId: "E-w1-a" },
        { text: "0", correct: false, feedback: "a=0 gives factors = 4×1 = 4.", misconceptionId: "E-w1-b" },
        { text: "3", correct: false, feedback: "a=3 gives factors = 4×4 = 16.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Number of factors = (exponent+1) multiplied for each prime. Set up the equation.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers a=2, one too high.",
        rootCause: "Formula Misapplication — doesn't correctly solve 4(a+1)=8 for a+1=2, guessing a value instead of isolating the unknown algebraically.",
        remediation: "Isolate step by step: 4(a+1)=8, so (a+1)=8÷4=2, so a=1 — write each algebraic step rather than jumping to a guess."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers a=0.",
        rootCause: "Off-By-One in the Formula — miscounts what value of a makes the total equal 8, assuming the smallest exponent is automatically the answer.",
        remediation: "Plug a=0 into the formula: (0+1)×2×2=4, and compare to the required 8 — the mismatch shows a=0 is too low."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers a=3, one too high in the other direction.",
        rootCause: "Guess Without Verification — tries a plausible value without solving 4(a+1)=8 algebraically or checking the result.",
        remediation: "Solve the equation directly and verify by substituting the result back into the original formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the factor-count formula", hint: "For 2ᵃ×3¹×5¹, total factors = (a+1)(1+1)(1+1)." },
      { level: 2, description: "Simplify the known parts", hint: "(1+1)(1+1) = 2×2 = 4. So the formula becomes 4×(a+1)." },
      { level: 3, description: "Solve for a", hint: "4×(a+1) = 8. Divide both sides by 4: (a+1) = 2. What is a?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "The LCM of two numbers is 72 and their product is 864. Find their HCF.",
    options: [
        { text: "12", correct: true, feedback: "Product = HCF × LCM → 864 = HCF × 72 → HCF = 864 ÷ 72 = 12." },
        { text: "6", correct: false, feedback: "6×72 = 432, not 864.", misconceptionId: "E-w2-a" },
        { text: "72", correct: false, feedback: "That's the LCM.", misconceptionId: "E-w2-b" },
        { text: "24", correct: false, feedback: "24×72 = 1728, too large.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Use the identity: product of two numbers = HCF × LCM.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student answers 6, half of the correct HCF.",
        rootCause: "Division Slip — attempts 864÷72 but makes an arithmetic error, landing on 6 instead of 12.",
        remediation: "Verify by multiplying back: does HCF×LCM=product? 6×72=432≠864, so 6 must be wrong — always check the answer against the original relationship."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 72, confusing HCF with the given LCM.",
        rootCause: "HCF/LCM Label Confusion — restates one of the given numbers (the LCM) instead of computing the HCF from the formula.",
        remediation: "Underline which value the question asks for (HCF) versus which values are given (product and LCM), then apply the formula."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 24, an unverified guess.",
        rootCause: "Untested Guess — proposes a value without computing 864÷72 or checking the answer against the product=HCF×LCM identity.",
        remediation: "Compute 864÷72 directly by long division or by breaking 72 into 8×9 and dividing in two steps: 864÷8=108, then 108÷9=12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "Product of two numbers = HCF × LCM." },
      { level: 2, description: "Substitute known values", hint: "864 = HCF × 72." },
      { level: 3, description: "Solve for HCF", hint: "Divide both sides by 72: HCF = 864 ÷ 72 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-03",
    question: "Two numbers have HCF 8. They are in the ratio 4:5. Their sum is 72. Find the larger number.",
    options: [
        { text: "40", correct: true, feedback: "Let numbers = 8a, 8b with a:b=4:5 (co-prime). Sum 8a+8b = 8(a+b) = 72 → a+b=9, matching a=4,b=5. Numbers 32 and 40; larger = 40." },
        { text: "32", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-w3-a" },
        { text: "36", correct: false, feedback: "That assumes both numbers are equal (72÷2), but the ratio 4:5 means they aren't.", misconceptionId: "E-w3-b" },
        { text: "48", correct: false, feedback: "That comes from assuming the larger is double the smaller (24 and 48) — but 24 and 48 actually have HCF 24, not 8, so that pair doesn't satisfy the question at all.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Express both numbers as 8 times co-prime factors in the ratio 4:5, then use the sum to find the multiplier.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 32, correctly finding both numbers but reporting the smaller one.",
        rootCause: "Wrong Number Selected — solves correctly and finds both numbers (32 and 40) but reports the smaller instead of the larger one asked for.",
        remediation: "Have the student explicitly label which found number is larger before answering."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 36, treating the two numbers as equal.",
        rootCause: "Ratio Neglect — ignores the stated 4:5 ratio entirely and simply halves the sum, as if the two numbers had to be equal.",
        remediation: "Anchor the ratio explicitly: the numbers are 4 parts and 5 parts of some multiplier, NOT two equal halves — set up 4x+5x=sum, not sum÷2."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 48, assuming the larger number is simply double the smaller.",
        rootCause: "Ratio Substitution Error — replaces the stated 4:5 ratio with a simpler, more familiar 'double' relationship, arriving at a pair (24, 48) that doesn't actually have HCF 8 at all (its real HCF is 24).",
        remediation: "Use the EXACT ratio given (4:5, not 1:2) to set up the equation 8a+8b=72 with a=4,b=5 specifically, and verify afterward that the resulting HCF matches what was given."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the HCF and ratio", hint: "Since HCF=8 and the ratio is 4:5, write the numbers as 8×4=32-part and 8×5=40-part multiples of a common factor." },
      { level: 2, description: "Set up the sum equation", hint: "8a + 8b = 72, where a:b = 4:5. Since 4 and 5 are already co-prime, try a=4, b=5 directly." },
      { level: 3, description: "Verify and identify the larger", hint: "Check: 8×4 + 8×5 = 32+40 = 72 ✓. Which of 32 and 40 is larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-06",
    question: "Find the smallest 3-digit number that is divisible by 4, 5, and 6, and has a digit sum of 9.",
    options: [
        { text: "180", correct: true, feedback: "LCM(4,5,6)=60. Multiples: 120 (sum 3), 180 (sum 9). Smallest with sum 9 is 180." },
        { text: "120", correct: false, feedback: "Digit sum 1+2+0=3, not 9.", misconceptionId: "E-w4-a" },
        { text: "240", correct: false, feedback: "Digit sum 6; also larger than 180.", misconceptionId: "E-w4-b" },
        { text: "150", correct: false, feedback: "Not a multiple of 4 (150÷4=37.5).", misconceptionId: "E-w4-c" }
      ],
    retryHint: "First find multiples of LCM(4,5,6)=60, then check digit sum.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 120, the smallest 3-digit multiple of 60, without checking the digit-sum condition.",
        rootCause: "Single-Condition Stop — combines the three divisibility conditions correctly into 'multiple of 60' but stops at the first such multiple without checking it against the separate digit-sum-9 requirement.",
        remediation: "Treat the digit-sum condition as a SEPARATE filter applied after finding multiples of 60 — list several multiples of 60 and check each one's digit sum before picking the smallest that qualifies."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers 240, a multiple of 60 with the wrong digit sum, and not the smallest such number anyway.",
        rootCause: "Untested Skip — jumps to a later multiple of 60 without systematically checking the digit sum of each one in order starting from the smallest.",
        remediation: "Check multiples of 60 in increasing order (60, 120, 180, 240...) and stop at the FIRST one whose digit sum is 9, rather than jumping ahead."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 150, which has digit sum 6 but isn't even a multiple of 4.",
        rootCause: "Incomplete Divisibility Check — only verifies divisibility by 5 (or 5 and 6) and misses that 150 isn't divisible by 4, missing one of the three required conditions entirely.",
        remediation: "Check the candidate against ALL THREE divisors (4, 5, and 6) individually, not just one or two of them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the three divisibility conditions", hint: "A number divisible by 4, 5, AND 6 must be a multiple of LCM(4,5,6) = 60." },
      { level: 2, description: "List multiples of 60 in order", hint: "60, 120, 180, 240... check the digit sum of each." },
      { level: 3, description: "Find the first one with digit sum 9", hint: "120 has digit sum 3. What's the digit sum of 180?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-05",
    question: "The square of a number is between 300 and 400. The number is a multiple of 3. Find the number.",
    options: [
        { text: "18", correct: true, feedback: "17²=289 (too small), 18²=324 (in range, 18 is a multiple of 3), 19²=361 (in range but 19 is not a multiple of 3). So 18." },
        { text: "17", correct: false, feedback: "17²=289 < 300.", misconceptionId: "E-w5-a" },
        { text: "19", correct: false, feedback: "19 is not a multiple of 3.", misconceptionId: "E-w5-b" },
        { text: "20", correct: false, feedback: "20²=400, not between 300 and 400 (exclusive).", misconceptionId: "E-w5-c" }
      ],
    retryHint: "List squares: 17²=289, 18²=324, 19²=361. Check which root is a multiple of 3.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 17, whose square falls below the required range.",
        rootCause: "Boundary Undercheck — doesn't verify that 17²=289 actually falls within 300-400; 289 is below the lower bound.",
        remediation: "Compute the square of each candidate explicitly and check it against BOTH boundaries (greater than 300 AND less than 400) before accepting it."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 19, whose square is in range but who isn't a multiple of 3.",
        rootCause: "Single-Condition Check — verifies the square falls in the right range (361 is between 300 and 400) but doesn't check the SECOND condition, that the number itself must be a multiple of 3.",
        remediation: "List every candidate whose square is in range first, then filter that list by the multiple-of-3 condition, rather than stopping once the range condition is satisfied."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 20, whose square lands exactly on the boundary.",
        rootCause: "Boundary Inclusion Error — treats 400 as within the range 'between 300 and 400', when the wording implies strictly between, excluding the boundary value itself.",
        remediation: "Treat 'between X and Y' as excluding X and Y themselves unless the problem says 'inclusive' — check whether 20²=400 is strictly LESS than 400, which it is not."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List squares near the range", hint: "Compute 17², 18², 19², and 20². Which fall strictly between 300 and 400?" },
      { level: 2, description: "Filter by the multiple-of-3 condition", hint: "Among the numbers whose squares are in range, which one is itself a multiple of 3?" },
      { level: 3, description: "Confirm the unique answer", hint: "Check that only one candidate satisfies both the range condition and the multiple-of-3 condition." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-06",
    question: "2, 6, 12, 20, 30, … (these are n(n+1)). Find the 8th term.",
    options: [
        { text: "72", correct: true, feedback: "8th term = 8×9 = 72." },
        { text: "56", correct: false, feedback: "That's 7×8, the 7th term.", misconceptionId: "E-w6-a" },
        { text: "90", correct: false, feedback: "That's 9×10, the 9th term.", misconceptionId: "E-w6-b" },
        { text: "42", correct: false, feedback: "That's 6×7, the 6th term.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "The sequence is products of consecutive integers: 1×2, 2×3, 3×4, … So nth term = n(n+1).",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 56, the 7th term instead of the 8th.",
        rootCause: "Off-By-One Position Error — computes n(n+1) for n=7 instead of n=8, miscounting the position.",
        remediation: "Explicitly match each given term to its position (1st=1×2, 2nd=2×3, 3rd=3×4...) before substituting n=8 into the formula."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 90, the 9th term instead of the 8th.",
        rootCause: "Off-By-One Position Error (other direction) — computes n(n+1) for n=9, overshooting the target position by one.",
        remediation: "Substitute n=8 explicitly into n(n+1): 8×(8+1)=8×9, writing out n and n+1 separately to avoid an off-by-one slip."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 42, the 6th term.",
        rootCause: "Position Miscount — significantly undercounts the position, perhaps starting the count from the wrong given term.",
        remediation: "Count the given terms against the sequence 2,6,12,20,30 explicitly (positions 1 through 5) before extrapolating three more positions to reach the 8th."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Confirm the formula", hint: "Check: does 1×2=2? Does 2×3=6? Does 3×4=12? The nth term is n×(n+1)." },
      { level: 2, description: "Substitute n=8", hint: "8th term = 8 × (8+1)." },
      { level: 3, description: "Compute", hint: "8 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-06",
    question: "Two numbers are in the ratio 2:3. Their LCM is 48. Find the smaller number.",
    options: [
        { text: "16", correct: true, feedback: "Numbers = 2x, 3x. HCF = x. LCM = 2×3×x = 6x = 48 → x = 8. Smaller = 2×8 = 16." },
        { text: "24", correct: false, feedback: "That's the larger number (3×8).", misconceptionId: "E-w7-a" },
        { text: "12", correct: false, feedback: "Would give LCM = 6×6 = 36.", misconceptionId: "E-w7-b" },
        { text: "32", correct: false, feedback: "Would require x=16, LCM=96.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "If numbers are 2x and 3x and they are co-prime in the ratio, LCM = 6x.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 24, correctly solving for x but reporting the larger number.",
        rootCause: "Wrong Number Selected — solves correctly (x=8, numbers 16 and 24) but reports the larger one instead of the smaller one asked for.",
        remediation: "Have the student explicitly label which of the two ratio parts (2x or 3x) is smaller before answering."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 12, using an incorrect value of x.",
        rootCause: "Wrong x Value — solves 6x=48 incorrectly, perhaps computing x=6 instead of x=8, then uses 2×6=12.",
        remediation: "Solve 6x=48 carefully: divide both sides by 6 to get x=8, then verify by substituting back: 6×8=48 ✓."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 32, using x=16 instead of the correct x=8.",
        rootCause: "Doubled x Value — miscalculates x as twice its correct value, perhaps confusing 6x=48 with x=48÷3=16 (dividing by only one ratio part instead of the combined 6).",
        remediation: "Use the full combined multiplier 6 (=2×3, since the numbers are co-prime multiples) when dividing into the LCM, not just one of the ratio parts alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the ratio", hint: "Write the numbers as 2x and 3x, where x is their HCF." },
      { level: 2, description: "Set up the LCM equation", hint: "Since 2 and 3 are co-prime, LCM(2x,3x) = 2×3×x = 6x. Set 6x=48." },
      { level: 3, description: "Solve and identify the smaller", hint: "x = 48÷6 = 8. The two numbers are 2×8 and 3×8 — which is smaller?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w8", order: 8, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-05",
    question: "Three ribbons are 48 cm, 72 cm, and 96 cm long. They are cut into equal pieces of the greatest possible length. What is that length?",
    options: [
        { text: "24 cm", correct: true, feedback: "HCF(48,72,96) = 24. Greatest equal piece length = 24 cm." },
        { text: "12 cm", correct: false, feedback: "12 cm is possible, but 24 cm is longer.", misconceptionId: "E-w8-a" },
        { text: "36 cm", correct: false, feedback: "36 does not divide 48 or 96 evenly.", misconceptionId: "E-w8-b" },
        { text: "48 cm", correct: false, feedback: "48 does not divide 72.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "The greatest possible equal length is the HCF of the three lengths.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 12 cm, a valid but non-maximal common divisor.",
        rootCause: "Premature Stop — finds a length that divides all three ribbons evenly and stops, without checking whether a larger common divisor (24) also works.",
        remediation: "Prime-factorise all three lengths and take the lowest shared power of each common prime, rather than stopping at the first shared factor found."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 36 cm, which doesn't divide two of the three ribbons.",
        rootCause: "Incomplete Divisor Check — verifies the candidate divides one ribbon length but doesn't check it against all three; 48÷36 and 96÷36 are not whole numbers.",
        remediation: "Check the candidate length against ALL THREE ribbon lengths explicitly before accepting it as a valid equal-piece length."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 48 cm, the length of the shortest ribbon itself.",
        rootCause: "Shortest-Length Default — assumes the shortest given length is automatically the answer, without checking it actually divides the other two evenly; 72÷48 is not a whole number.",
        remediation: "Never assume the smallest given value is the answer — explicitly check whether it divides every other length evenly first."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise all three lengths", hint: "48=2⁴×3. 72=2³×3². 96=2⁵×3." },
      { level: 2, description: "Find the lowest shared power of each prime", hint: "For 2: lowest of 2⁴,2³,2⁵ is 2³. For 3: lowest of 3¹,3²,3¹ is 3¹." },
      { level: 3, description: "Multiply to get the HCF", hint: "2³ × 3 = 8 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-06",
    question: "A number between 100 and 200 has three distinct prime factors. The sum of the exponents in its prime factorisation is 5. The exponent of 2 is 3 and the number is a multiple of 5. Find the number.",
    options: [
        { text: "120", correct: true, feedback: "2³×3×5 = 8×3×5 = 120, exponents 3+1+1=5, multiple of 5, in range." },
        { text: "168", correct: false, feedback: "2³×3×7 = 168, but not a multiple of 5.", misconceptionId: "E-d1-a" },
        { text: "180", correct: false, feedback: "2²×3²×5 = 180, exponent of 2 is 2, not 3.", misconceptionId: "E-d1-b" },
        { text: "210", correct: false, feedback: "Out of range (>200).", misconceptionId: "E-d1-c" }
      ],
    backward: "Use the exponent sum and distinct prime condition; list possibilities, filter by range and extra conditions.",
    forward: "Such descriptive puzzles build algebraic modelling skills.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student picks 168, satisfying the exponent and prime-count conditions but not the multiple-of-5 condition.",
        rootCause: "Partial Condition Check — finds a valid number matching the exponent-sum and distinct-prime conditions but doesn't check it against EVERY stated condition; 168 isn't divisible by 5.",
        remediation: "List every condition before searching for candidates, and check each candidate found against the FULL list, not just the conditions used to construct it."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student picks 180, which satisfies most conditions but has the wrong exponent of 2.",
        rootCause: "Exponent Assignment Slip — builds a valid-looking number with the right exponent sum and prime count, but assigns the exponent of 3 to 2 instead of 3 to 2, mixing up which prime gets which exponent.",
        remediation: "Fix the exponent of 2 (given as 3) FIRST, before choosing exponents for the remaining primes — don't let the total sum condition override the explicitly stated individual exponent."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student picks 210, outside the stated numeric range.",
        rootCause: "Range Condition Neglect — focuses on the prime-factorisation conditions while disregarding the 'between 100 and 200' range requirement.",
        remediation: "Apply the range condition as a final filter after generating candidates from the other conditions, explicitly checking each one falls between 100 and 200."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the given exponent", hint: "The exponent of 2 is given as 3, so 2³=8 is part of the number for certain." },
      { level: 2, description: "Distribute the remaining exponent sum", hint: "Total exponent sum is 5, and 2 already uses 3, so the other two (distinct) primes must have exponents summing to 2 — each getting exactly 1." },
      { level: 3, description: "Apply the remaining conditions", hint: "One of the other primes must be 5 (multiple-of-5 condition). What's the smallest choice for the third prime that keeps 8×3×5=120 in range 100-200?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-06",
    question: "Two numbers are in the ratio 5:7. Their LCM is 420. Find the sum of the numbers.",
    options: [
        { text: "144", correct: true, feedback: "Numbers = 5x, 7x. HCF = x. LCM = 5×7×x = 35x = 420 → x = 12. Numbers 60, 84; sum = 144." },
        { text: "12", correct: false, feedback: "That's just the value of x, not the sum of the two numbers.", misconceptionId: "E-d2-a" },
        { text: "35", correct: false, feedback: "That's the product of the ratio parts.", misconceptionId: "E-d2-b" },
        { text: "420", correct: false, feedback: "That's the LCM, not the sum.", misconceptionId: "E-d2-c" }
      ],
    backward: "For co-prime ratio parts, LCM = product of ratio parts × HCF.",
    forward: "Ratio-LCM problems appear in scheduling and gear ratios.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student answers 12, correctly solving for x but stopping before finding the actual numbers.",
        rootCause: "Missing Final Step — correctly solves 35x=420 for x=12, but treats this intermediate value as the final answer instead of continuing to find the numbers (60, 84) and their sum.",
        remediation: "After solving for x, always take the extra step of substituting back to find the actual quantities the question asks about — here, the two numbers and their sum."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student answers 35, restating the product of the ratio parts (5×7) instead of solving the problem.",
        rootCause: "Ratio-Part Product Confusion — computes 5×7=35, a quantity that's part of the LCM formula, but mistakes it for the final answer without ever solving for x or the actual numbers.",
        remediation: "Recognise that 5×7=35 is only the CO-PRIME FACTOR used inside the formula LCM=35x — it isn't itself a meaningful answer to 'find the sum of the numbers.'"
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student answers 420, restating the given LCM instead of computing the sum.",
        rootCause: "Given-Value Restatement — reports one of the numbers given in the question (the LCM) instead of working through to find the actual two numbers and their sum.",
        remediation: "Underline what's asked (the sum of the two numbers) versus what's given (the ratio and the LCM) before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the ratio", hint: "Write the numbers as 5x and 7x, where x is their HCF." },
      { level: 2, description: "Set up and solve the LCM equation", hint: "Since 5 and 7 are co-prime, LCM = 5×7×x = 35x. Set 35x=420 and solve for x." },
      { level: 3, description: "Find the numbers and sum them", hint: "The numbers are 5×x and 7×x. Add them together." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-06",
    question: "The HCF of two numbers is 6. Their sum is 48. The product of the numbers is as large as possible. Find the larger number.",
    options: [
        { text: "30", correct: true, feedback: "Numbers = 6a, 6b, a,b co-prime, a+b=8. Co-prime pairs: (1,7) and (3,5). The (3,5) pair gives the larger product, with numbers 18,30; larger = 30." },
        { text: "24", correct: false, feedback: "If a=4,b=4, they are not co-prime, so HCF would be 24, not 6.", misconceptionId: "E-d3-a" },
        { text: "42", correct: false, feedback: "That would need the pair (1,7): numbers 42,6 — a valid HCF=6 pair, but its product is far smaller than 30×18.", misconceptionId: "E-d3-b" },
        { text: "18", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-d3-c" }
      ],
    backward: "Express numbers as HCF × co-prime factors. Maximise the co-prime product under the sum constraint.",
    forward: "Optimisation with number theory constraints leads to integer programming.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student picks a split (like a=4,b=4) that violates the co-prime requirement.",
        rootCause: "Coprimality Neglect — picks a pair of ratio parts summing to 8 without checking they're actually co-prime; equal parts (4,4) share a common factor of 4, which would make the true HCF 24, not the required 6.",
        remediation: "Check every candidate pair (a,b) for gcd(a,b)=1 before accepting it — only truly co-prime pairs keep the HCF exactly at the stated value."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student picks 42, from the valid but non-maximal pair (1,7).",
        rootCause: "Non-Maximal Pair Selected — correctly identifies a valid co-prime pair (1,7) summing to 8, but doesn't compare it against the OTHER valid pair (3,5) to check which gives the larger product.",
        remediation: "List ALL co-prime pairs summing to the target (here, both (1,7) and (3,5)), compute the product for each, and choose the one that maximises it — don't stop at the first valid pair found."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student picks 18, correctly finding the optimal pair but reporting the smaller number.",
        rootCause: "Wrong Number Selected — correctly identifies the maximising pair (18, 30) but reports the smaller one instead of the larger one asked for.",
        remediation: "Label which of the two found numbers is larger before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the HCF", hint: "Write the numbers as 6a and 6b, where a and b are co-prime and a+b=8 (since 6a+6b=48)." },
      { level: 2, description: "List all co-prime pairs summing to 8", hint: "Check each pair (1,7), (2,6), (3,5), (4,4) for gcd=1. Which ones qualify?" },
      { level: 3, description: "Maximise the product", hint: "Among the co-prime pairs, which gives the larger product a×b — and correspondingly, the larger actual numbers?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-07",
    question: "Find the smallest 4-digit number of the form 5□2□ that is divisible by 3, 4, and 5. (The two □ are independent digits — they don't need to match.)",
    options: [
        { text: "5220", correct: true, feedback: "Divisible by 5 → last digit 0 or 5. By 4 → last two digits divisible by 4; 20 works, 25 doesn't. So last digit 0. Number 5□20. Divisible by 3 → digit sum 5+□+2+0 = 7+□ multiple of 3. Smallest □ = 2 (sum 9). Number 5220." },
        { text: "5020", correct: false, feedback: "Digit sum 7, not a multiple of 3.", misconceptionId: "E-d4-a" },
        { text: "5120", correct: false, feedback: "Digit sum 8, not a multiple of 3.", misconceptionId: "E-d4-b" },
        { text: "5320", correct: false, feedback: "Larger than 5220; also its digit sum 10 is not a multiple of 3.", misconceptionId: "E-d4-c" }
      ],
    backward: "Apply each divisibility rule sequentially; start with the most restrictive (4 and 5).",
    forward: "Multi-constraint puzzles appear in logic and coding challenges.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student answers 5020, using the smallest possible digit (0) for the hundreds □ without checking the digit-sum condition.",
        rootCause: "Untested Smallest Guess — assumes the smallest digit is automatically correct without checking the resulting digit sum against the divisible-by-3 rule; 7 is not a multiple of 3.",
        remediation: "Solve for the ones-digit □ first (using the div-by-4-and-5 rules, which fix it at 0), then solve for the hundreds-digit □ separately using the div-by-3 rule — don't assume either blank is 0 by default."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student answers 5120, a digit sum of 8, one short of a multiple of 3.",
        rootCause: "Untested Guess — picks a plausible digit without computing the resulting digit sum (8) and checking it against the multiple-of-3 rule.",
        remediation: "Compute the digit sum 7+□ for each candidate hundreds-digit explicitly and check which gives a multiple of 3, rather than guessing."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student answers 5320, which is both larger than necessary and still fails the digit-sum rule.",
        rootCause: "Untested Guess (larger) — picks a larger digit without checking either that it's the smallest valid choice or that it satisfies the digit-sum rule; 10 is not a multiple of 3.",
        remediation: "Test candidate digits for the hundreds place starting from 0 upward, stopping at the FIRST one whose digit sum is a multiple of 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Fix the ones digit first", hint: "For divisibility by 5, the ones digit must be 0 or 5. For divisibility by 4, the last two digits (□2 becomes 2 then ones) must form a multiple of 4 — test both options for the ones digit." },
      { level: 2, description: "Confirm the ones digit", hint: "With ones digit 0, the last two digits are '20' — is 20 divisible by 4? With ones digit 5, they'd be '25' — is that divisible by 4?" },
      { level: 3, description: "Solve for the hundreds digit using divisibility by 3", hint: "With the number now 5□20, the digit sum is 5+□+2+0=7+□. Find the smallest □ making this a multiple of 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-04",
    question: "\\( \\sqrt{2^2 \\times 3^4 \\times 5^2} \\) = ?",
    options: [
        { text: "90", correct: true, feedback: "Halve each exponent: 2¹ × 3² × 5¹ = 2 × 9 × 5 = 90." },
        { text: "30", correct: false, feedback: "You used exponent 1 for all primes.", misconceptionId: "E-d5-a" },
        { text: "180", correct: false, feedback: "That's twice 90; you didn't halve the exponents correctly.", misconceptionId: "E-d5-b" },
        { text: "45", correct: false, feedback: "You forgot the factor of 2.", misconceptionId: "E-d5-c" }
      ],
    backward: "√(aⁿ) = aⁿ/². Halve each exponent.",
    forward: "Simplifying radicals with exponents is essential in algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 30, using exponent 1 for every prime regardless of its original exponent.",
        rootCause: "Uniform-Exponent Substitution — treats every prime as if it appeared to the first power under the root, ignoring that halving 3⁴ actually gives 3² (not 3¹), only correctly halving 2² and 5² by coincidence.",
        remediation: "Halve EACH exponent individually and explicitly: 2²→2¹, 3⁴→3², 5²→5¹ — don't default every prime to the same exponent."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 180, exactly double the correct answer.",
        rootCause: "Halving Skipped Entirely — computes the full product 2²×3⁴×5²=8100... actually likely computes an intermediate value and forgets to take the square root at all, or makes an error that doubles the correctly-halved result.",
        remediation: "After halving each exponent to get 2¹×3²×5¹, multiply these out step by step (2×9=18, 18×5=90) and compare — a doubled answer (180) signals a halving step was skipped somewhere."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 45, missing the factor of 2 entirely.",
        rootCause: "Prime Omission — correctly halves the exponents of 3 and 5 (getting 3²×5¹=45) but drops the prime 2 from the final product entirely.",
        remediation: "List every distinct prime under the root before halving exponents, so none can be silently dropped from the final multiplication: 2¹ × 3² × 5¹, all three factors."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the primes and their exponents", hint: "Under the root: 2², 3⁴, 5²." },
      { level: 2, description: "Halve each exponent", hint: "2²→2¹. 3⁴→3². 5²→5¹." },
      { level: 3, description: "Multiply the results", hint: "2 × 9 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-07",
    question: "1, 3, 7, 13, 21, ___ (differences +2, +4, +6, +8, +10). Find the next term.",
    options: [
        { text: "31", correct: true, feedback: "Differences increase by 2 each time. 21 + 10 = 31." },
        { text: "29", correct: false, feedback: "Adding only 8 would be 29, but the increase accelerates.", misconceptionId: "E-d6-a" },
        { text: "33", correct: false, feedback: "Adding 12 would skip a step.", misconceptionId: "E-d6-b" },
        { text: "30", correct: false, feedback: "Not following the +2, +4, +6… pattern.", misconceptionId: "E-d6-c" }
      ],
    backward: "Find the pattern of differences; they increase by 2 each time.",
    forward: "Quadratic sequences like n² - n + 1 appear in many problems.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 29, reusing the previous difference (+8) instead of the next one in the growing sequence.",
        rootCause: "Static Difference Reuse — applies the most recent difference again instead of recognising the differences themselves are increasing by 2 each step.",
        remediation: "List out the difference sequence explicitly (2,4,6,8,10...) and confirm it's growing by 2 each time before applying the NEXT value in that list, not the last one used."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 33, skipping ahead to a difference of 12 instead of 10.",
        rootCause: "Difference-Sequence Overshoot — jumps one step too far in the difference sequence (using 12 instead of the correct next difference, 10).",
        remediation: "Count the difference sequence term by term (2,4,6,8, then what comes next?) rather than jumping to a later value."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 30, not following the established difference pattern at all.",
        rootCause: "Guess Without Verification — proposes a number without deriving it from the confirmed pattern of increasing differences.",
        remediation: "Verify the difference pattern against all given terms (3-1=2, 7-3=4, 13-7=6, 21-13=8) before predicting the next difference and applying it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the differences", hint: "1→3 is +2. 3→7 is +4. 7→13 is +6. 13→21 is +8." },
      { level: 2, description: "Find the pattern in the differences", hint: "The differences are 2,4,6,8 — increasing by 2 each time. What's the next difference?" },
      { level: 3, description: "Apply it", hint: "21 + 10 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-04", probability: 0.4, condition: "Quadratic sequences (constant second difference) are a direct precursor to writing and recognising quadratic formulas." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "How many factors does \\( 2^3 \\times 3^2 \\times 5^1 \\) have?",
    options: [
        { text: "24", correct: true, feedback: "(3+1)(2+1)(1+1) = 4×3×2 = 24." },
        { text: "12", correct: false, feedback: "That's using (2+1) instead of (3+1) for the exponent of 2: 3×3×2 = wrong start; more precisely, forgetting to add 1 to the first two exponents gives 3×2×2=12.", misconceptionId: "E-d7-a" },
        { text: "18", correct: false, feedback: "The formula multiplies (exponent+1) for each prime — it doesn't sum them.", misconceptionId: "E-d7-b" },
        { text: "30", correct: false, feedback: "Off by several.", misconceptionId: "E-d7-c" }
      ],
    backward: "Multiply (exponent+1) for each prime factor.",
    forward: "Factor counting is fundamental in combinatorics.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student answers 12, forgetting to add 1 to the exponents of 2 and 3 while correctly adding 1 for 5.",
        rootCause: "Partial Plus-One Application — applies the '+1' rule inconsistently, using the raw exponents (3 and 2) directly for the first two primes but correctly adding 1 for the last (1+1=2), giving 3×2×2=12 instead of 4×3×2=24.",
        remediation: "Apply the +1 rule to EVERY exponent, one at a time, writing out (3+1), (2+1), (1+1) explicitly before multiplying — never skip it for any prime."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student answers 18, likely from a different miscombination of the exponents.",
        rootCause: "Formula Misapplication — doesn't correctly apply the multiply-(exponent+1)-for-each-prime rule, arriving at an intermediate value that doesn't match the correct product 4×3×2=24.",
        remediation: "Write out each factor of the formula on its own before multiplying: (3+1)=4, (2+1)=3, (1+1)=2, then multiply 4×3×2 step by step, checking the running product."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student answers 30, an arithmetic slip in the final multiplication.",
        rootCause: "Multiplication Slip — correctly sets up 4×3×2 but makes an arithmetic error computing the product.",
        remediation: "Multiply in stages and check each: 4×3=12, then 12×2=24 — verify each intermediate step rather than computing all at once."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the exponents", hint: "2³×3²×5¹ has exponents 3, 2, and 1." },
      { level: 2, description: "Add 1 to each", hint: "(3+1), (2+1), (1+1) = 4, 3, 2." },
      { level: 3, description: "Multiply", hint: "4 × 3 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "The HCF of two numbers is 2, and their LCM is 72. If one number is 18, what is the other?",
    options: [
        { text: "8", correct: true, feedback: "Other = (HCF × LCM) ÷ known = (2×72) ÷ 18 = 144 ÷ 18 = 8." },
        { text: "12", correct: false, feedback: "12×18=216, but HCF×LCM=144, a mismatch.", misconceptionId: "E-d8-a" },
        { text: "24", correct: false, feedback: "24×18=432.", misconceptionId: "E-d8-b" },
        { text: "36", correct: false, feedback: "36×18=648.", misconceptionId: "E-d8-c" }
      ],
    backward: "Product of numbers = HCF × LCM. Rearrange to find the unknown.",
    forward: "This relationship is a powerful tool in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student answers 12, an unverified guess whose product with 18 doesn't match HCF×LCM.",
        rootCause: "Untested Guess — proposes a plausible-looking number without computing (HCF×LCM)÷known and checking it matches.",
        remediation: "Always verify: does your answer × the known number equal HCF × LCM? 12×18=216≠144, revealing the error."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student answers 24, another unverified guess.",
        rootCause: "Untested Guess — similarly doesn't compute the required division (2×72)÷18 to find the actual missing number.",
        remediation: "Compute (HCF×LCM)÷known directly: (2×72)÷18 = 144÷18, rather than guessing a plausible-sounding factor."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student answers 36, half of the given LCM.",
        rootCause: "LCM-Halving Substitution — guesses the other number by simply halving the LCM (72÷2=36), rather than applying the actual product=HCF×LCM formula.",
        remediation: "Use the formula explicitly: other number = (HCF × LCM) ÷ known number = (2×72)÷18, not an arbitrary operation on the LCM alone."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "Product of two numbers = HCF × LCM." },
      { level: 2, description: "Substitute known values", hint: "18 × (other number) = 2 × 72 = 144." },
      { level: 3, description: "Solve for the unknown", hint: "Other number = 144 ÷ 18 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-06",
    question: "The HCF of two numbers is 7. Their product is 1,470. Both numbers are less than 50. Find their sum.",
    options: [
        { text: "77", correct: true, feedback: "Numbers = 7a, 7b, a,b co-prime. 49ab = 1,470 → ab = 30. Co-prime pairs: (1,30) → 7,210 (too big); (2,15) → 14,105 (too big); (3,10) → 21,70 (too big); (5,6) → 35,42 (both <50). Sum = 35+42 = 77." },
        { text: "49", correct: false, feedback: "That's 7², not the sum.", misconceptionId: "E-d9-a" },
        { text: "70", correct: false, feedback: "Off by 7.", misconceptionId: "E-d9-b" },
        { text: "84", correct: false, feedback: "Check the co-prime pair again — the valid pair under 50 is (5,6), giving 35 and 42.", misconceptionId: "E-d9-c" }
      ],
    backward: "Express numbers as HCF × co-prime factors. Find pairs satisfying product and bound.",
    forward: "Bounded solutions are common in optimisation problems.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 49, confusing the HCF squared with the actual sum.",
        rootCause: "HCF-Squared Substitution — computes 7²=49, a value that appears naturally in the algebra (49ab=1470) but has no direct meaning as the answer, instead of continuing to find the actual numbers.",
        remediation: "Recognise that 49=7² is only a coefficient in the equation 49ab=1470 used to solve for ab — it is not itself the sum of the two numbers."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 70, close to but not matching the correct sum of 77.",
        rootCause: "Wrong Co-prime Pair Used — picks a co-prime pair of ab=30 (like (3,10), giving numbers 21 and 70) without checking BOTH resulting numbers stay under the 50 limit; 70 itself exceeds 50.",
        remediation: "Check every candidate pair against the 'both less than 50' condition explicitly before accepting it — list all co-prime factor pairs of 30 and test each one."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 84, an unverified sum not matching any valid pair.",
        rootCause: "Untested Guess — proposes a sum without deriving it from the actual valid co-prime pair (5,6) that keeps both numbers under 50.",
        remediation: "Systematically list every co-prime factor pair of 30 — (1,30), (2,15), (3,10), (5,6) — and check each against the size constraint before computing a sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "Numbers = 7a, 7b with a,b co-prime. Product = 49ab = 1,470." },
      { level: 2, description: "Solve for ab, then list co-prime pairs", hint: "ab = 1,470÷49 = 30. List every co-prime pair of factors of 30: (1,30), (2,15), (3,10), (5,6)." },
      { level: 3, description: "Apply the size constraint", hint: "For each pair, multiply by 7 to get the actual numbers. Which pair keeps BOTH numbers under 50?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-08",
    question: "A number between 1 and 100 leaves remainder 1 when divided by 2, remainder 2 when divided by 3, remainder 3 when divided by 4, and remainder 4 when divided by 5. Find the number.",
    options: [
        { text: "59", correct: true, feedback: "Notice: remainder = divisor − 1 each time. So number+1 is divisible by 2,3,4,5. LCM(2,3,4,5)=60. Number = 60−1 = 59." },
        { text: "29", correct: false, feedback: "29+1=30, not divisible by 4.", misconceptionId: "E-d10-a" },
        { text: "119", correct: false, feedback: "Out of range (>100).", misconceptionId: "E-d10-b" },
        { text: "60", correct: false, feedback: "60 leaves remainder 0 when divided by these, not the required remainders.", misconceptionId: "E-d10-c" }
      ],
    backward: "Notice the pattern: remainder = divisor - 1 each time. So number+1 is a multiple of all divisors.",
    forward: "This leads to the Chinese Remainder Theorem.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student answers 29, close to but not satisfying all four remainder conditions.",
        rootCause: "Incomplete Verification — doesn't notice the key pattern (remainder = divisor - 1) and instead guesses a plausible-looking number without checking it against every divisor; 29+1=30 isn't divisible by 4.",
        remediation: "Spot the pattern first: since each remainder is exactly one less than its divisor, number+1 must be exactly divisible by 2, 3, 4, AND 5 simultaneously — use this to find the number directly rather than guessing."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student answers 119, the NEXT valid solution but outside the stated range.",
        rootCause: "Range Condition Neglect — correctly applies the pattern (119+1=120=2×LCM(2,3,4,5)) but doesn't check the '1 and 100' range restriction, missing that 119 exceeds 100.",
        remediation: "After finding a general form for the answer (multiples of the LCM, minus 1), check each candidate against the stated range and pick the one that fits."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student answers 60, the LCM itself rather than one less than it.",
        rootCause: "Missing Final Step — correctly computes LCM(2,3,4,5)=60 but forgets to subtract 1, which is the key insight connecting the LCM to the actual answer.",
        remediation: "Re-derive why subtracting 1 matters: if number+1 is divisible by all four divisors, then number itself is ONE LESS than a common multiple — don't stop at finding the LCM."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Spot the remainder pattern", hint: "Notice: remainder is always exactly one less than the divisor (1 vs 2, 2 vs 3, 3 vs 4, 4 vs 5)." },
      { level: 2, description: "Reframe the problem", hint: "If remainder = divisor - 1 every time, then number+1 must be exactly divisible by 2, 3, 4, AND 5." },
      { level: 3, description: "Find the LCM and subtract 1", hint: "LCM(2,3,4,5) = 60. So number+1 = 60, meaning number = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-06",
    question: "A square has area \\( 2^4 \\times 3^2 \\) cm². What is its perimeter?",
    options: [
        { text: "48 cm", correct: true, feedback: "Area = 16×9 = 144 cm². Side = √144 = 12 cm. Perimeter = 4×12 = 48 cm." },
        { text: "12 cm", correct: false, feedback: "That's the side length, not the perimeter.", misconceptionId: "E-d11-a" },
        { text: "24 cm", correct: false, feedback: "That's the sum of two sides, or 2×12.", misconceptionId: "E-d11-b" },
        { text: "36 cm", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d11-c" }
      ],
    backward: "Side = √area. Then perimeter = 4 × side.",
    forward: "Geometry and prime factorisation are directly linked.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student answers 12 cm, the side length, without computing the perimeter.",
        rootCause: "Missing Final Step — correctly finds the side (√144=12) but stops there, forgetting the question asks for the perimeter.",
        remediation: "Underline exactly what's asked (perimeter) versus what's found so far (side length) — treat finding the side as only step one of two."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student answers 24 cm, doubling the side instead of quadrupling it.",
        rootCause: "Wrong Multiplier — multiplies the side by 2 instead of 4, confusing the square's four-sided perimeter with a two-sided calculation.",
        remediation: "Sketch a square and label all FOUR sides to reinforce that perimeter = 4 × side, not 2 × side."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student answers 36 cm, an arithmetic or conceptual slip.",
        rootCause: "Multiplication Slip — makes an error either in computing the side length or in the final ×4 step.",
        remediation: "Break the computation into explicit checked steps: area→16×9=144, side→√144=12, perimeter→4×12=48, verifying each before moving to the next."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute the area as a number", hint: "2⁴×3² = 16×9 = ?" },
      { level: 2, description: "Find the side length", hint: "Side = √area. What number times itself gives 144?" },
      { level: 3, description: "Compute the perimeter", hint: "Perimeter = 4 × side." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-08",
    question: "First term is 1. Each term is the sum of all previous terms plus 1. Find the 5th term.",
    options: [
        { text: "16", correct: true, feedback: "t1=1; t2=1+1=2; t3=1+2+1=4; t4=1+2+4+1=8; t5=1+2+4+8+1=16." },
        { text: "15", correct: false, feedback: "1+2+4+8=15, but you must add 1 again.", misconceptionId: "E-d12-a" },
        { text: "31", correct: false, feedback: "1+2+4+8+16=31, that's the sum of the first 5 terms, not the 5th term itself.", misconceptionId: "E-d12-b" },
        { text: "10", correct: false, feedback: "Incorrect pattern.", misconceptionId: "E-d12-c" }
      ],
    backward: "Build the sequence step-by-step. It doubles each time.",
    forward: "Recursive sequences are the basis of fractals and programming.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 15, summing the first four terms but forgetting the '+1' step.",
        rootCause: "Missing Plus-One — correctly sums t1 through t4 (1+2+4+8=15) but forgets the rule requires adding 1 more to get t5.",
        remediation: "Restate the rule explicitly before each step: 'next term = sum of all previous terms, PLUS 1' — treat the +1 as a mandatory final step every time, not optional."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 31, computing the sum of the first FIVE terms instead of the 5th term itself.",
        rootCause: "Term-vs-Running-Sum Confusion — confuses 'the 5th term' with 'the sum of the first 5 terms,' two different quantities.",
        remediation: "Keep a clear running list labeled by term number (t1=1, t2=2, t3=4, t4=8, t5=?) and answer with the SPECIFIC term value, not a cumulative total."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 10, not following the actual recursive rule.",
        rootCause: "Rule Misapplication — computes terms using an incorrect or simplified rule (e.g. just adding a constant) instead of the stated 'sum of all previous plus 1.'",
        remediation: "Rebuild the sequence from scratch, term by term, explicitly summing ALL previous terms (not just the last one) and adding 1 at each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Build the sequence step by step", hint: "t1=1. t2 = (sum of previous terms, just t1) + 1 = 1+1=2." },
      { level: 2, description: "Continue the pattern", hint: "t3 = (t1+t2) + 1 = (1+2)+1. t4 = (t1+t2+t3) + 1." },
      { level: 3, description: "Find t5", hint: "t5 = (t1+t2+t3+t4) + 1 = (1+2+4+8) + 1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-07",
    question: "What is the smallest positive integer that has exactly 9 factors?",
    options: [
        { text: "36", correct: true, feedback: "9 factors: either p⁸ or p²q². Smallest is 2²×3² = 4×9 = 36. 2⁸=256, which is larger." },
        { text: "100", correct: false, feedback: "100=2²×5² also has 9 factors, but it's larger than 36.", misconceptionId: "E-d13-a" },
        { text: "48", correct: false, feedback: "48=2⁴×3 → (4+1)(1+1)=10 factors.", misconceptionId: "E-d13-b" },
        { text: "64", correct: false, feedback: "64=2⁶ → 7 factors.", misconceptionId: "E-d13-c" }
      ],
    backward: "Factor count 9 → either p⁸ or p²q². Take the smallest primes.",
    forward: "Factor count patterns lead to the concept of divisor functions.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 100, a valid number with exactly 9 factors but not the smallest one.",
        rootCause: "Non-Minimal Candidate — finds a correct p²q² form (2²×5²=100) but uses non-minimal primes (2 and 5 instead of the smaller pair 2 and 3), missing that swapping in the smallest available primes gives a smaller result.",
        remediation: "When building a number with a target factor-count structure, always use the SMALLEST available primes for the bases to minimise the result — try 2 and 3 before trying 2 and 5."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 48, which actually has 10 factors, not 9.",
        rootCause: "Factor-Count Mischeck — picks a number without verifying its actual factor count matches the required 9; 48=2⁴×3¹ gives (4+1)(1+1)=10 factors.",
        remediation: "Compute the factor count of any candidate explicitly using the (exponent+1) formula before accepting it, rather than picking numbers that merely look plausible."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 64, which actually has 7 factors, not 9.",
        rootCause: "Factor-Count Mischeck — similarly doesn't verify; 64=2⁶ gives (6+1)=7 factors, not 9.",
        remediation: "Always compute (exponent+1) for the actual prime factorisation of the candidate and compare it to the target factor count of 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find factorisations of 9", hint: "9 = 9×1 or 9 = 3×3. These correspond to (exponent+1) patterns p⁸ or p²q²." },
      { level: 2, description: "Build the smallest number for each pattern", hint: "p⁸ with smallest prime: 2⁸=256. p²q² with smallest two primes: 2²×3²=?" },
      { level: 3, description: "Compare and pick the smaller", hint: "Compare 256 and your p²q² result — which is smaller?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "The product of two numbers is 2,160. Their HCF is 6. What is their LCM?",
    options: [
        { text: "360", correct: true, feedback: "LCM = product ÷ HCF = 2,160 ÷ 6 = 360." },
        { text: "36", correct: false, feedback: "You divided by 60 instead of 6.", misconceptionId: "E-d14-a" },
        { text: "60", correct: false, feedback: "That's 2,160 ÷ 36.", misconceptionId: "E-d14-b" },
        { text: "2,160", correct: false, feedback: "That's the product, not the LCM.", misconceptionId: "E-d14-c" }
      ],
    backward: "LCM = product ÷ HCF.",
    forward: "This identity is key to solving many number puzzles.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 36, dividing by 60 instead of the given HCF of 6.",
        rootCause: "Wrong Divisor Used — divides the product by an incorrect value (60) instead of the actual given HCF (6), perhaps confusing digits or misreading the problem.",
        remediation: "Re-read the given HCF value carefully before dividing, and write it down explicitly before performing the division: 2,160 ÷ 6, not ÷60."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 60, dividing by 36 instead of 6.",
        rootCause: "Wrong Divisor Used — divides by 36 (perhaps confusing it with the correct answer to a different, similar problem) instead of the actual given HCF.",
        remediation: "Substitute the given values into the formula LCM = product ÷ HCF explicitly before dividing, to avoid substituting the wrong number."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 2,160, restating the given product instead of computing the LCM.",
        rootCause: "Given-Value Restatement — reports the product itself, given in the question, instead of applying the formula to find the LCM.",
        remediation: "Underline what's asked (LCM) versus what's given (product and HCF) before answering."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "LCM = product ÷ HCF." },
      { level: 2, description: "Substitute the given values", hint: "LCM = 2,160 ÷ 6." },
      { level: 3, description: "Compute", hint: "2,160 ÷ 6 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "SQNUM-07",
    question: "What is the largest perfect square that divides \\( 2^3 \\times 3^4 \\times 5 \\)?",
    options: [
        { text: "324", correct: true, feedback: "For a square divisor, exponents must be even and ≤ given: 2² (≤3), 3⁴ (≤4), 5⁰ (≤1). So 2²×3⁴ = 4×81 = 324." },
        { text: "648", correct: false, feedback: "2³×3⁴=648, not a square (exponent of 2 is odd).", misconceptionId: "E-d15-a" },
        { text: "36", correct: false, feedback: "2²×3²=36, a square divisor but not the largest.", misconceptionId: "E-d15-b" },
        { text: "2⁴×3⁴", correct: false, feedback: "Exponent of 2 is too high (4 > 3).", misconceptionId: "E-d15-c" }
      ],
    backward: "For a perfect square divisor, every exponent must be even and at most the given exponent.",
    forward: "This idea is used when simplifying radicals.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 648, using the full given exponent of 2 (3) instead of rounding it down to the nearest even number.",
        rootCause: "Even-Exponent Rule Skipped — uses the original exponent of 2 (which is 3, odd) directly instead of rounding DOWN to the nearest even value (2), producing a number that isn't actually a perfect square.",
        remediation: "For each prime, explicitly check: is the given exponent even? If not, round DOWN to the nearest even number before including it in the square divisor."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 36, a valid square divisor but not the largest possible one.",
        rootCause: "Under-Maximised Exponent — correctly rounds the exponent of 2 down to 2 (even), but doesn't maximise the exponent of 3, using 3² instead of the larger valid 3⁴ (which is already even and fully available).",
        remediation: "For each prime, use the LARGEST even exponent that doesn't exceed the given exponent — don't stop at a smaller valid choice when a bigger one is available."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 2⁴×3⁴, exceeding the available exponent of 2 in the original number.",
        rootCause: "Exponent Overreach — picks an exponent for 2 (4) that is LARGER than what's actually available in the original number (3), producing a value that doesn't even divide the original number.",
        remediation: "A divisor's exponent can never exceed the original number's exponent for that prime — check 2⁴ against the original 2³ and notice 4>3 makes this invalid before rounding for evenness."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check each exponent's parity", hint: "2³: exponent 3 is odd. 3⁴: exponent 4 is even. 5¹: exponent 1 is odd." },
      { level: 2, description: "Round down to the nearest even exponent where needed", hint: "For 2³, round down to 2² (even, ≤3). For 3⁴, keep 3⁴ (already even). For 5¹, round down to 5⁰ (drop it)." },
      { level: 3, description: "Multiply the results", hint: "2² × 3⁴ = 4 × 81 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-05",
    question: "Which statement is FALSE? A) Divisible by 6 → divisible by 3. B) Divisible by 3 and 5 → divisible by 15. C) Divisible by 4 and 6 → divisible by 24. D) Divisible by 9 → divisible by 3.",
    options: [
        { text: "C", correct: true, feedback: "Counterexample: 12 is divisible by 4 and 6, but not by 24. So C is false." },
        { text: "A", correct: false, feedback: "True: if a number is divisible by 6, it's divisible by 2 and 3, hence certainly by 3.", misconceptionId: "E-d16-a" },
        { text: "B", correct: false, feedback: "True: 3 and 5 are co-prime, so divisibility by both implies divisibility by 15.", misconceptionId: "E-d16-b" },
        { text: "D", correct: false, feedback: "True: any multiple of 9 is also a multiple of 3.", misconceptionId: "E-d16-c" }
      ],
    backward: "Test each statement with a counterexample. For C, 12 is divisible by 4 and 6 but not 24.",
    forward: "Logical implications with divisibility build proof skills.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student picks A as false, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify statement A against a real number; since 6=2×3, any multiple of 6 genuinely is a multiple of 3.",
        remediation: "Test each implication against a concrete example before judging — for A, any multiple of 6 (like 12 or 18) confirms it's also a multiple of 3."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks B as false, when it is actually true.",
        rootCause: "Missing Co-primality Insight — doesn't recognise that because 3 and 5 share no common factors, divisibility by both DOES guarantee divisibility by their product 15 — unlike the 4-and-6 case in statement C, where 4 and 6 share a factor of 2.",
        remediation: "Distinguish co-prime pairs (like 3,5) from non-co-prime pairs (like 4,6) — only for co-prime divisors does 'divisible by both' guarantee 'divisible by their product.'"
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks D as false, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify that since 9=3², any multiple of 9 is automatically also a multiple of 3.",
        remediation: "Test with a concrete multiple of 9 (like 18 or 27) and confirm it's also a multiple of 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test each with a real number", hint: "For each of A, B, C, D, pick a concrete example and check whether the implication holds." },
      { level: 2, description: "Notice the co-primality difference", hint: "3 and 5 share no common factor (co-prime), but 4 and 6 do (both share a factor of 2) — this difference matters." },
      { level: 3, description: "Find the one true counter-example", hint: "Try 12 for statement C: is 12 divisible by 4 and 6? Is 12 divisible by 24?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-04",
    question: "\\( \\sqrt{2^6 \\times 5^4 \\times 7^2} \\) = ?",
    options: [
        { text: "1,400", correct: true, feedback: "Halve exponents: 2³ × 5² × 7 = 8 × 25 × 7 = 1,400." },
        { text: "700", correct: false, feedback: "You halved the final result instead of the exponents.", misconceptionId: "E-d17-a" },
        { text: "2,800", correct: false, feedback: "You doubled instead of halving the exponents.", misconceptionId: "E-d17-b" },
        { text: "1,000", correct: false, feedback: "Off by several factors.", misconceptionId: "E-d17-c" }
      ],
    backward: "Halve each exponent and multiply.",
    forward: "This technique is essential for simplifying large radicals.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 700, half of the correct result.",
        rootCause: "Wrong Halving Target — halves the FINAL multiplied-out result (2⁶×5⁴×7²'s square root, computed some other way) instead of halving each EXPONENT before multiplying, producing an answer that's off by a factor of 2.",
        remediation: "Halve each exponent FIRST — 2⁶→2³, 5⁴→5², 7²→7¹ — then multiply those halved values together, rather than computing something else and halving the end result."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 2,800, exactly double the correct answer.",
        rootCause: "Exponents Doubled Instead of Halved — mistakenly doubles each exponent (2⁶→2¹², etc.) or otherwise inverts the halving operation.",
        remediation: "Recall that √(aⁿ)=aⁿ/², meaning exponents get DIVIDED by 2, not multiplied — write 'n ÷ 2' explicitly for each exponent to avoid inverting the operation."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 1,000, an arithmetic slip.",
        rootCause: "Multiplication Slip — correctly halves the exponents to get 2³×5²×7¹ but makes an error multiplying 8×25×7 together.",
        remediation: "Multiply in stages and check each: 8×25=200, then 200×7=1,400 — verify each intermediate product."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the primes and exponents", hint: "Under the root: 2⁶, 5⁴, 7²." },
      { level: 2, description: "Halve each exponent", hint: "2⁶→2³. 5⁴→5². 7²→7¹." },
      { level: 3, description: "Multiply", hint: "8 × 25 × 7 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-06",
    question: "The nth term of a sequence is \\( n^2 + n \\). Find the 7th term.",
    options: [
        { text: "56", correct: true, feedback: "7² + 7 = 49 + 7 = 56." },
        { text: "42", correct: false, feedback: "That's 6²+6, the 6th term.", misconceptionId: "E-d18-a" },
        { text: "72", correct: false, feedback: "That's 8²+8, the 8th term.", misconceptionId: "E-d18-b" },
        { text: "49", correct: false, feedback: "That's just 7², forgot the +n.", misconceptionId: "E-d18-c" }
      ],
    backward: "Substitute n=7 into the formula.",
    forward: "Quadratic sequences model area and projectile motion.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 42, the 6th term instead of the 7th.",
        rootCause: "Off-By-One Position Error — substitutes n=6 instead of n=7 into the formula.",
        remediation: "Write n=7 explicitly before substituting, and double check the position matches what was asked."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 72, the 8th term instead of the 7th.",
        rootCause: "Off-By-One Position Error (other direction) — substitutes n=8 instead of n=7.",
        remediation: "Substitute n=7 carefully: 7²+7, writing out each part before adding."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 49, computing n² but forgetting the +n term.",
        rootCause: "Incomplete Formula Application — computes 7²=49 correctly but drops the '+n' part of the formula.",
        remediation: "Write the full formula n²+n before substituting, and treat the '+n' as a required second step, not optional."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify n", hint: "You want the 7th term, so n=7." },
      { level: 2, description: "Compute n²", hint: "7² = ?" },
      { level: 3, description: "Add n", hint: "Take your answer to n² and add n (which is 7)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "SQNUM-08",
    question: "What is the smallest positive integer by which \\( 2^5 \\times 3^2 \\times 7^2 \\) must be multiplied to become a perfect square?",
    options: [
        { text: "2", correct: true, feedback: "Exponents: 5 (odd), 2 (even), 2 (even). Need one more 2 to make the exponent 6 (even). Multiply by 2." },
        { text: "4", correct: false, feedback: "Multiplying by 4 (=2²) would make the exponent of 2 equal to 7, still odd.", misconceptionId: "E-d19-a" },
        { text: "3", correct: false, feedback: "The exponent of 3 is already even (2).", misconceptionId: "E-d19-b" },
        { text: "1", correct: false, feedback: "The number is not a perfect square as is.", misconceptionId: "E-d19-c" }
      ],
    backward: "To make a perfect square, all exponents must be even. Find the missing prime factors.",
    forward: "This is used in rationalising denominators and solving Diophantine equations.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student answers 4, adding two factors of 2 instead of one.",
        rootCause: "Overcorrection — assumes a bigger multiplier is needed to 'fix' the odd exponent, without checking that adding just ONE factor of 2 (5→6) already makes it even; adding two (5→7) makes it odd again.",
        remediation: "Add exactly ONE factor of the prime with an odd exponent to make it even — check the new exponent's parity after each addition, and stop as soon as it becomes even."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student answers 3, targeting a prime whose exponent is already even.",
        rootCause: "Unnecessary Correction — multiplies by a prime (3) that doesn't need fixing, since its exponent (2) is already even, without checking which prime's exponent actually needs adjustment.",
        remediation: "Check the parity of EVERY exponent first, and only multiply by factors needed to fix the ODD ones — leave already-even exponents alone."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student answers 1, assuming the number is already a perfect square.",
        rootCause: "Parity Check Skipped — doesn't verify whether every exponent in the factorisation is actually even before concluding no multiplier is needed; the exponent of 2 (5) is odd.",
        remediation: "Check each exponent's parity individually (5 is odd, 2 is even, 2 is even) before concluding whether the number is already a perfect square."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check each exponent's parity", hint: "2⁵: exponent 5 is odd. 3²: exponent 2 is even. 7²: exponent 2 is even." },
      { level: 2, description: "Identify which prime needs fixing", hint: "Only the exponent of 2 is odd — that's the one that needs an extra factor." },
      { level: 3, description: "Find the smallest fix", hint: "Adding one more factor of 2 changes the exponent from 5 to 6 (even). What's the smallest multiplier that adds exactly one factor of 2?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Three bells ring every 12 min, 18 min, and 20 min. They ring together at 10:00 AM. When will they next ring together?",
    options: [
        { text: "1:00 PM", correct: true, feedback: "LCM(12,18,20) = 180 min = 3 hours. 10:00 AM + 3 h = 1:00 PM." },
        { text: "12:00 PM", correct: false, feedback: "The LCM is not 120 minutes.", misconceptionId: "E-d20-a" },
        { text: "12:30 PM", correct: false, feedback: "150 minutes is not a common multiple of 12,18,20.", misconceptionId: "E-d20-b" },
        { text: "4:00 PM", correct: false, feedback: "360 minutes is a common multiple but not the least — it's twice the LCM (180), not the LCM itself.", misconceptionId: "E-d20-c" }
      ],
    backward: "Find the LCM of the three intervals.",
    forward: "Scheduling problems with multiple periods use LCM.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student answers 12:00 PM, using 120 minutes (2 hours), a round-looking but incorrect interval.",
        rootCause: "Round-Number Substitution — defaults to a familiar 2-hour interval rather than computing the actual LCM of 12, 18, and 20.",
        remediation: "Prime-factorise all three intervals (12=2²×3, 18=2×3², 20=2²×5) and take the highest power of each prime to find the true LCM, rather than guessing a round number."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student answers 12:30 PM, using 150 minutes, which isn't actually a common multiple.",
        rootCause: "Untested Candidate — proposes an interval without checking it divides evenly by all three given periods; 150 is not divisible by 12 or 18.",
        remediation: "Check any candidate interval against ALL THREE given periods (does it divide evenly by 12? By 18? By 20?) before accepting it."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student answers 4:00 PM, using 360 minutes — a valid common multiple, but not the smallest one.",
        rootCause: "Non-Least Common Multiple — correctly finds A common multiple of all three intervals, but doesn't check whether a smaller one (180) also works.",
        remediation: "Find the LCM systematically via prime factorisation rather than testing multiples informally, to guarantee you land on the SMALLEST common multiple, not just any common multiple."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise all three intervals", hint: "12=2²×3. 18=2×3². 20=2²×5." },
      { level: 2, description: "Take the highest power of each prime", hint: "For 2: highest of 2²,2¹,2² is 2². For 3: highest of 3¹,3² is 3². For 5: only in 20, as 5¹." },
      { level: 3, description: "Multiply and convert to time", hint: "2²×3²×5 = 4×9×5 = 180 minutes. Convert to hours and add to 10:00 AM." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-05",
    question: "Ribbons are 252 cm, 308 cm, and 364 cm long. They are cut into equal pieces of the greatest possible length. How many pieces are there in total?",
    options: [
        { text: "33", correct: true, feedback: "HCF(252,308,364) = 28 cm. Total pieces = (252+308+364) ÷ 28 = 924 ÷ 28 = 33." },
        { text: "28", correct: false, feedback: "That's the length of each piece, not the number of pieces.", misconceptionId: "E-d21-a" },
        { text: "66", correct: false, feedback: "That would be the count if the piece length were 14 cm.", misconceptionId: "E-d21-b" },
        { text: "924", correct: false, feedback: "That's the total length, not the number of pieces.", misconceptionId: "E-d21-c" }
      ],
    backward: "Greatest piece length = HCF. Total pieces = sum of lengths ÷ piece length.",
    forward: "This is a classic application of HCF in measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 28, correctly finding the HCF but stopping before computing the piece count.",
        rootCause: "Missing Final Step — correctly computes the HCF (28 cm, the piece length) but the question asks for the NUMBER of pieces, requiring one more division step.",
        remediation: "Underline exactly what's asked (number of pieces) versus what's found so far (piece length) — treat finding the HCF as only step one of two."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers 66, using a smaller (non-maximal) common divisor for the piece length.",
        rootCause: "Non-Maximal Divisor Used — divides by a valid but not-greatest common factor (14, half of 28) instead of the true HCF, giving twice as many (smaller) pieces.",
        remediation: "Compute the TRUE HCF via prime factorisation of all three lengths before dividing, rather than using an arbitrary smaller common factor."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 924, the total ribbon length rather than the piece count.",
        rootCause: "Missing Division Step — correctly sums the three lengths (924 cm) but stops there instead of dividing by the piece length to find how many pieces that makes.",
        remediation: "Complete both steps: (1) sum the lengths, (2) divide that sum by the HCF (piece length) — 924 alone is only the total length, not a count."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the greatest possible piece length", hint: "The greatest equal piece length is the HCF of 252, 308, and 364." },
      { level: 2, description: "Sum the total ribbon length", hint: "252 + 308 + 364 = ?" },
      { level: 3, description: "Divide to find the piece count", hint: "Total length ÷ piece length = number of pieces." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-07",
    question: "Find the largest digit □ such that 3,45□ is divisible by 12.",
    options: [
        { text: "6", correct: true, feedback: "Divisible by 12 means divisible by 3 and 4. For 4: last two digits 5□ divisible by 4 → □=2 or 6. For 3: digit sum 3+4+5+□ = 12+□ multiple of 3 → □=6 (sum 18). Largest = 6." },
        { text: "2", correct: false, feedback: "2 works for 4 (52÷4=13), but the digit sum 14 is not a multiple of 3.", misconceptionId: "E-d22-a" },
        { text: "8", correct: false, feedback: "58 is not divisible by 4.", misconceptionId: "E-d22-b" },
        { text: "4", correct: false, feedback: "54 is not divisible by 4.", misconceptionId: "E-d22-c" }
      ],
    backward: "Divisible by 12 → divisible by 3 and 4. Check 4 first (last two digits), then 3.",
    forward: "Combining divisibility rules is a frequent puzzle type.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student answers 2, which satisfies the divisible-by-4 rule but not the divisible-by-3 rule.",
        rootCause: "Partial Rule Check — verifies the last-two-digits rule for 4 (52÷4=13) and stops, without checking the digit-sum rule for 3 (14 is not a multiple of 3).",
        remediation: "Check candidates against BOTH rules (4 and 3) before accepting — a digit passing only one of the two required rules isn't valid for divisibility by 12."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student answers 8, without checking the divisible-by-4 rule.",
        rootCause: "Rule Skipped — picks a large digit without verifying the last-two-digits rule for 4; 58÷4=14.5 is not a whole number.",
        remediation: "Always test the last-two-digits rule for 4 FIRST (since it narrows candidates quickly), before checking the digit-sum rule for 3."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student answers 4, without checking the divisible-by-4 rule.",
        rootCause: "Rule Skipped — similarly doesn't verify 54÷4=13.5 is not a whole number.",
        remediation: "Build a quick table testing each digit 0-9 against the divisible-by-4 rule first (last two digits 50,51,52,...,59), narrowing the candidate list before applying the digit-sum-by-3 rule."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Break 12 into its factors", hint: "Divisible by 12 means divisible by BOTH 4 and 3." },
      { level: 2, description: "Apply the divisible-by-4 rule", hint: "The last two digits are 5□. Which digits make 5□ divisible by 4?" },
      { level: 3, description: "Apply the divisible-by-3 rule to survivors, then maximise", hint: "Among the digits that passed step 2, which gives a digit sum divisible by 3? Pick the LARGEST such digit." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-09",
    question: "Find the smallest perfect square greater than 500 that ends in 4.",
    options: [
        { text: "784", correct: true, feedback: "Squares ending in 4 come from numbers ending in 2 or 8. 22²=484 (<500). 28²=784 (ends in 4, >500). 32²=1024 (larger). So 784." },
        { text: "484", correct: false, feedback: "484 < 500.", misconceptionId: "E-d23-a" },
        { text: "676", correct: false, feedback: "26²=676, ends in 6, not 4.", misconceptionId: "E-d23-b" },
        { text: "1024", correct: false, feedback: "32²=1024, larger than 784.", misconceptionId: "E-d23-c" }
      ],
    backward: "Numbers ending in 2 or 8 produce squares ending in 4. Test from 22² upward.",
    forward: "Square root estimation and ending-digit analysis.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 484, correctly ending in 4 but below the required 500.",
        rootCause: "Boundary Check Skipped — finds a square ending in the right digit but doesn't verify it's actually greater than 500.",
        remediation: "Check each candidate against BOTH conditions (ends in 4 AND greater than 500), not just the ending-digit condition."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 676, which doesn't actually end in 4.",
        rootCause: "Ending-Digit Check Skipped — picks a square greater than 500 without verifying it actually ends in 4; 676 ends in 6.",
        remediation: "Explicitly check the last digit of each candidate square before accepting it — don't just check the size condition."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 1024, a valid square ending in 4 and greater than 500, but not the smallest such one.",
        rootCause: "Non-Minimal Candidate — finds a number satisfying both conditions but doesn't check whether a smaller one (784) also qualifies.",
        remediation: "Test candidates in increasing order (numbers ending in 2 or 8, starting just above where the square crosses 500) and stop at the FIRST one satisfying both conditions."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which numbers square to end in 4", hint: "A square ends in 4 only when the original number ends in 2 or 8 (check: 2²=4, 8²=64)." },
      { level: 2, description: "Find where squares cross 500", hint: "22²=484 (just under 500). What's the next candidate ending in 2 or 8?" },
      { level: 3, description: "Test candidates in order", hint: "Try 28² — is it greater than 500? Does it end in 4?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-07",
    question: "1, 4, 10, 19, 31, ___ (differences +3, +6, +9, +12, next +15). Find the 6th term.",
    options: [
        { text: "46", correct: true, feedback: "31 + 15 = 46." },
        { text: "43", correct: false, feedback: "Adding only 12 gives 43, but the next difference is 15.", misconceptionId: "E-d24-a" },
        { text: "45", correct: false, feedback: "Adding 14 doesn't follow the +3 jump pattern.", misconceptionId: "E-d24-b" },
        { text: "50", correct: false, feedback: "Adding 19 is too large.", misconceptionId: "E-d24-c" }
      ],
    backward: "Look at differences: +3, +6, +9, +12. They increase by 3 each time.",
    forward: "Quadratic sequences often appear as patterns of dots or blocks.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student answers 43, reusing the previous difference (+12) instead of the next one.",
        rootCause: "Static Difference Reuse — applies the most recent difference again instead of recognising the differences are increasing by 3 each step.",
        remediation: "List the difference sequence explicitly (3,6,9,12...) and confirm it's growing by 3 each time before applying the NEXT value, not the last one used."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student answers 45, using a difference of 14 instead of 15.",
        rootCause: "Difference Miscalculation — computes the next difference incorrectly (14 instead of 15), perhaps adding 2 instead of 3 to the previous difference.",
        remediation: "Confirm the difference-of-differences pattern explicitly: 6-3=3, 9-6=3, 12-9=3 — the differences grow by exactly 3 each time, so the next one is 12+3=15, not 14."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student answers 50, using a difference of 19.",
        rootCause: "Guess Without Verification — proposes a jump without deriving it from the confirmed increasing-by-3 difference pattern.",
        remediation: "Verify the difference pattern against all given terms before predicting the next difference and applying it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the differences", hint: "1→4 is +3. 4→10 is +6. 10→19 is +9. 19→31 is +12." },
      { level: 2, description: "Find the pattern in the differences", hint: "The differences are 3,6,9,12 — increasing by 3 each time. What's next?" },
      { level: 3, description: "Apply it", hint: "31 + 15 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-04", probability: 0.4, condition: "Quadratic sequences (constant second difference) are a direct precursor to writing quadratic formulas." }
    ],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-06",
    question: "A number between 50 and 100 has three distinct prime factors, sum of exponents 4, smallest prime factor 2, is a multiple of 5, and its tens digit is even. Find the number.",
    options: [
        { text: "60", correct: true, feedback: "60 = 2²×3×5, tens digit 6 (even), meets all conditions." },
        { text: "84", correct: false, feedback: "84 = 2²×3×7, not a multiple of 5.", misconceptionId: "E-r1-a" },
        { text: "90", correct: false, feedback: "90 = 2×3²×5, exponent sum 4, but tens digit 9 (odd).", misconceptionId: "E-r1-b" },
        { text: "70", correct: false, feedback: "70 = 2×5×7, three distinct primes but exponent sum 3, not 4.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student picks 84, satisfying most conditions but not the multiple-of-5 requirement.",
        rootCause: "Partial Condition Check — finds a number matching the exponent-sum and prime-count conditions but doesn't check every stated condition; 84 isn't divisible by 5.",
        remediation: "List every condition before searching, and check each candidate against the FULL list, not just the conditions used to build it."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student picks 90, satisfying every numeric condition except the tens-digit parity.",
        rootCause: "Last-Condition Neglect — verifies the exponent sum, prime count, and multiple-of-5 conditions but overlooks the final tens-digit-even requirement; 90 has tens digit 9, which is odd.",
        remediation: "Treat the LAST stated condition with the same weight as the first — a number can pass every earlier check and still fail on the final one, so verify all conditions, not just the first few."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student picks 70, which has the wrong exponent sum.",
        rootCause: "Exponent Sum Mischeck — assumes 70=2×5×7 satisfies the exponent-sum-4 condition without actually adding its exponents (1+1+1=3, not 4).",
        remediation: "Compute the actual exponent sum for any candidate explicitly by writing out its full prime factorisation and adding the exponents."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Narrow using the prime and exponent conditions", hint: "The number has 3 distinct primes, exponent sum 4, and smallest prime 2 — so it's of the form 2^a×p×q or 2×p²×q with exponents summing to 4." },
      { level: 2, description: "Apply the multiple-of-5 condition", hint: "One of the primes must be 5, since the number is a multiple of 5." },
      { level: 3, description: "Apply the range and tens-digit conditions", hint: "Among candidates in range 50-100, which one has an EVEN tens digit?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "HCF = 4, LCM = 120. One number is 24. Find the other.",
    options: [
        { text: "20", correct: true, feedback: "(4×120) ÷ 24 = 480 ÷ 24 = 20." },
        { text: "30", correct: false, feedback: "Product would be 30×24=720, but HCF×LCM=480, a mismatch.", misconceptionId: "E-r2-a" },
        { text: "120", correct: false, feedback: "That's the LCM.", misconceptionId: "E-r2-b" },
        { text: "4", correct: false, feedback: "That's the HCF.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student answers 30, an unverified guess whose product with 24 doesn't match HCF×LCM.",
        rootCause: "Untested Guess — proposes a plausible number without computing (HCF×LCM)÷known and checking it.",
        remediation: "Verify: does your answer × 24 equal HCF×LCM (480)? 30×24=720≠480, revealing the error."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 120, confusing the other number with the given LCM.",
        rootCause: "Given-Value Restatement — reports the LCM itself instead of computing the missing number.",
        remediation: "Underline what's asked (the other number) versus what's given (HCF and LCM) before answering."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 4, confusing the other number with the given HCF.",
        rootCause: "Given-Value Restatement — similarly reports the HCF instead of computing the missing number.",
        remediation: "Apply the formula: other number = (HCF × LCM) ÷ known number, rather than repeating a given value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "Product of two numbers = HCF × LCM." },
      { level: 2, description: "Substitute known values", hint: "24 × (other number) = 4 × 120 = 480." },
      { level: 3, description: "Solve", hint: "Other number = 480 ÷ 24 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-06",
    question: "HCF = 9. Product = 1,215. Both numbers are less than 100 and greater than 10. Find their sum.",
    options: [
        { text: "72", correct: true, feedback: "Numbers 9a,9b, a,b co-prime. 81ab = 1215 → ab = 15. Co-prime pairs: (1,15) → 9,135 (135>100); (3,5) → 27,45 (both between 10 and 100). Sum = 27+45 = 72." },
        { text: "36", correct: false, feedback: "That doesn't match a valid co-prime pair.", misconceptionId: "E-r3-a" },
        { text: "54", correct: false, feedback: "If the numbers were 18,36, their HCF would be 18, not 9.", misconceptionId: "E-r3-b" },
        { text: "108", correct: false, feedback: "Too large.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 36, an unverified sum not derived from a valid co-prime pair.",
        rootCause: "Untested Guess — proposes a sum without systematically finding the co-prime factor pairs of 15 and checking which satisfies the range constraint.",
        remediation: "List every co-prime factor pair of 15 — (1,15) and (3,5) — multiply each by 9, and check both numbers fall in the required range before computing a sum."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 54, from a pair (18,36) that doesn't actually have HCF 9.",
        rootCause: "Coprimality Violation — picks numbers without checking gcd(a,b)=1; 18=9×2 and 36=9×4, but gcd(2,4)=2, so the true HCF of 18 and 36 is 18, not 9.",
        remediation: "Always verify gcd(a,b)=1 for the ratio parts before finalising a pair — an invalid co-prime assumption changes the actual HCF of the resulting numbers."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 108, an unverified overshoot.",
        rootCause: "Untested Guess — proposes a sum without deriving it from the valid pair (27,45) that satisfies both the product and range constraints.",
        remediation: "Systematically test each co-prime pair of 15 against the range constraint (both numbers between 10 and 100) before computing a sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "Numbers = 9a, 9b with a,b co-prime. Product = 81ab = 1,215." },
      { level: 2, description: "Solve for ab, then list co-prime pairs", hint: "ab = 1,215÷81 = 15. List co-prime pairs of 15: (1,15), (3,5)." },
      { level: 3, description: "Apply the range constraint", hint: "Multiply each pair by 9. Which pair keeps BOTH numbers between 10 and 100?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-08",
    question: "Find the smallest 3-digit number divisible by 7 that leaves remainder 5 when divided by 6.",
    options: [
        { text: "119", correct: true, feedback: "Multiples of 7: 105 (105÷6=17 R3), 112 (112÷6=18 R4), 119 (119÷6=19 R5). Smallest is 119." },
        { text: "105", correct: false, feedback: "Remainder 3, not 5.", misconceptionId: "E-r4-a" },
        { text: "125", correct: false, feedback: "Not a multiple of 7.", misconceptionId: "E-r4-b" },
        { text: "113", correct: false, feedback: "Not a multiple of 7.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student answers 105, the smallest 3-digit multiple of 7, without checking the remainder condition.",
        rootCause: "Single-Condition Stop — finds the smallest multiple of 7 that is 3 digits long but stops without checking it against the SECOND condition (remainder 5 when divided by 6).",
        remediation: "Treat the remainder condition as a separate filter applied after listing multiples of 7 — check the remainder of each multiple in turn."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student answers 125, which isn't even a multiple of 7.",
        rootCause: "Multiple-of-7 Check Skipped — picks a number that might satisfy the remainder condition by coincidence, without verifying it's actually a multiple of 7 first; 125÷7 is not a whole number.",
        remediation: "Always confirm the candidate is a multiple of 7 first (the primary condition), then check the remainder-by-6 condition among only those candidates."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student answers 113, which isn't a multiple of 7.",
        rootCause: "Multiple-of-7 Check Skipped — similarly picks a number without verifying divisibility by 7; 113÷7 is not a whole number.",
        remediation: "List actual multiples of 7 near 100 (98, 105, 112, 119...) and only check the remainder condition among those."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of 7 near 100", hint: "105, 112, 119, 126... these are all multiples of 7." },
      { level: 2, description: "Check the remainder when divided by 6", hint: "For each multiple, divide by 6 and find the remainder: 105÷6, 112÷6, 119÷6." },
      { level: 3, description: "Find the smallest with remainder 5", hint: "Which of these multiples gives exactly remainder 5?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-04",
    question: "\\( \\sqrt{3^4 \\times 5^2 \\times 2^2} \\) = ?",
    options: [
        { text: "90", correct: true, feedback: "3² × 5 × 2 = 9 × 10 = 90." },
        { text: "45", correct: false, feedback: "Halving the result again loses a factor of 2.", misconceptionId: "E-r5-a" },
        { text: "180", correct: false, feedback: "That's twice 90.", misconceptionId: "E-r5-b" },
        { text: "30", correct: false, feedback: "Missing the factor of 3.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 45, half of the correct answer.",
        rootCause: "Extra Halving Step — correctly halves the exponents once, but then halves the resulting product AGAIN by mistake, dropping the factor of 2.",
        remediation: "Halve each exponent exactly ONCE (2²→2¹) and multiply the results together — don't apply any additional halving after that."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 180, exactly double the correct answer.",
        rootCause: "Exponents Not Halved — uses the original exponents instead of halved ones for at least one prime, inflating the result.",
        remediation: "Explicitly halve EVERY exponent before multiplying: 3⁴→3², 5²→5¹, 2²→2¹."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 30, missing the factor of 3 entirely.",
        rootCause: "Prime Omission — correctly computes 5×2=10 but drops the 3² factor from the final product.",
        remediation: "List every distinct prime under the root before halving exponents, so none can be silently dropped: 3² × 5¹ × 2¹."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the primes and exponents", hint: "Under the root: 3⁴, 5², 2²." },
      { level: 2, description: "Halve each exponent once", hint: "3⁴→3². 5²→5¹. 2²→2¹." },
      { level: 3, description: "Multiply", hint: "9 × 5 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-05",
    question: "2, 5, 11, 23, ___ (×2 + 1). Find the next term.",
    options: [
        { text: "47", correct: true, feedback: "23×2+1 = 46+1 = 47." },
        { text: "46", correct: false, feedback: "×2 without +1.", misconceptionId: "E-r6-a" },
        { text: "48", correct: false, feedback: "×2+2, not the rule.", misconceptionId: "E-r6-b" },
        { text: "45", correct: false, feedback: "Doesn't follow the rule.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 46, applying only the doubling step and forgetting the +1.",
        rootCause: "Incomplete Two-Step Rule — correctly doubles (23×2=46) but drops the second part of the rule.",
        remediation: "Verify the full rule against an earlier term pair: does 11×2+1=23? Both the ×2 AND the +1 are needed every time."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 48, adding 2 instead of 1 after doubling.",
        rootCause: "Wrong Constant Added — correctly doubles but adds the wrong constant.",
        remediation: "Derive the added constant from an early term: 2×2=4, and the next term is 5, so 5-4=1 confirms the constant to add is 1, not 2."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 45, not following the ×2+1 rule at all.",
        rootCause: "No Consistent Rule Applied — proposes a term without deriving or testing a rule against the given sequence.",
        remediation: "Test a hypothesis rule against at least two consecutive term-pairs before applying it to find the next term."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test a doubling-based rule", hint: "Check: is each term roughly double the one before? 2→5, 5→11..." },
      { level: 2, description: "Find the exact rule", hint: "2×2=4, but the next term is 5. What's added to get from 4 to 5?" },
      { level: 3, description: "Apply the rule", hint: "23×2+1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "SQNUM-08",
    question: "How many factors of \\( 2^4 \\times 3^2 \\) are perfect squares?",
    options: [
        { text: "6", correct: true, feedback: "For 2: even exponents 0,2,4 (3 choices). For 3: even exponents 0,2 (2 choices). Total = 3×2 = 6." },
        { text: "4", correct: false, feedback: "You might have missed some even exponents.", misconceptionId: "E-r7-a" },
        { text: "8", correct: false, feedback: "Overcount.", misconceptionId: "E-r7-b" },
        { text: "15", correct: false, feedback: "That's the total factor count (5×3=15), not just the square factors.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student answers 4, undercounting the valid even-exponent choices.",
        rootCause: "Incomplete Even-Exponent List — misses one of the valid even exponents for 2 (0,2,4 — three choices, not two), leading to an undercount.",
        remediation: "List every even exponent from 0 up to the given exponent explicitly for each prime: for 2⁴, that's 0,2,4 — three values, not two."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student answers 8, overcounting the valid combinations.",
        rootCause: "Overcounted Combinations — includes an exponent value that isn't actually even or valid, inflating the count beyond the true 3×2=6.",
        remediation: "Recount systematically: list the 3 valid exponents for 2 (0,2,4) and the 2 valid exponents for 3 (0,2), then multiply — don't just estimate."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student answers 15, the TOTAL factor count of 2⁴×3², not just the square ones.",
        rootCause: "Total-vs-Square-Factors Confusion — computes the full factor count using (exponent+1) for each prime (5×3=15) instead of restricting to only EVEN exponents (which give perfect-square factors).",
        remediation: "Distinguish the two questions: total factors uses ALL exponents 0 through n; square factors uses only the EVEN exponents in that range."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List valid exponents for each prime", hint: "For a factor to be a perfect square, its own exponent of 2 must be even (0,2,4) and its exponent of 3 must be even (0,2)." },
      { level: 2, description: "Count the choices for each prime", hint: "3 valid choices for 2's exponent, 2 valid choices for 3's exponent." },
      { level: 3, description: "Multiply the counts", hint: "3 × 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Three bells ring every 15 min, 25 min, and 30 min. They ring together at 12:00 PM. Next together?",
    options: [
        { text: "2:30 PM", correct: true, feedback: "LCM(15,25,30) = 150 min = 2.5 hours. 12:00 + 2:30 = 2:30 PM." },
        { text: "1:00 PM", correct: false, feedback: "60 min is not a common multiple.", misconceptionId: "E-r8-a" },
        { text: "2:00 PM", correct: false, feedback: "120 min is not the LCM.", misconceptionId: "E-r8-b" },
        { text: "5:00 PM", correct: false, feedback: "300 min is a common multiple but not the least (least is 150).", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student answers 1:00 PM, using 60 minutes, a round-looking but non-common-multiple interval.",
        rootCause: "Round-Number Substitution — defaults to a familiar 1-hour interval rather than computing the true LCM of 15, 25, and 30.",
        remediation: "List actual multiples of 15, 25, and 30 and find the first number common to all three, rather than assuming a round-looking answer."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student answers 2:00 PM, using 120 minutes, which isn't the LCM.",
        rootCause: "Untested Candidate — proposes an interval without checking it against all three ring periods.",
        remediation: "Check the candidate interval against ALL THREE given periods (divisible by 15? 25? 30?) before accepting it."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student answers 5:00 PM, using 300 minutes — a valid common multiple, but not the smallest.",
        rootCause: "Non-Least Common Multiple — correctly finds a common multiple of all three periods but doesn't check for a smaller one (150).",
        remediation: "Find the LCM via prime factorisation to guarantee the SMALLEST common multiple, rather than testing multiples informally."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise the three intervals", hint: "15=3×5. 25=5². 30=2×3×5." },
      { level: 2, description: "Take the highest power of each prime", hint: "For 2: only in 30, as 2¹. For 3: highest of 3¹,3¹ is 3¹. For 5: highest of 5¹,5²,5¹ is 5²." },
      { level: 3, description: "Multiply and convert to time", hint: "2×3×25 = 150 minutes. Convert to hours and add to 12:00 PM." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "SQNUM-07",
    question: "Largest perfect square dividing \\( 2^5 \\times 3^3 \\times 7 \\) is:",
    options: [
        { text: "144", correct: true, feedback: "Even exponents ≤ given: 2⁴ (≤5), 3² (≤3), 7⁰. 2⁴×3² = 16×9 = 144." },
        { text: "72", correct: false, feedback: "2³×3²=72, not a square (exponent of 2 odd).", misconceptionId: "E-r9-a" },
        { text: "288", correct: false, feedback: "2⁵×3²=288, exponent of 2 odd.", misconceptionId: "E-r9-b" },
        { text: "432", correct: false, feedback: "2⁴×3³=432, exponent of 3 odd.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student picks 72, using an even exponent for 2 that isn't maximised.",
        rootCause: "Under-Maximised Exponent — rounds the exponent of 2 down to 3 (still odd, and not even the maximal even choice), instead of the correct maximal even value 4.",
        remediation: "For each prime, find the LARGEST even exponent that doesn't exceed the given exponent — for 2⁵, that's 2⁴ (since 5 itself is odd, round down to 4)."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student picks 288, using the full given exponent of 2 (5) instead of rounding down to even.",
        rootCause: "Even-Exponent Rule Skipped — uses the original odd exponent (5) directly instead of rounding down to the nearest even value (4).",
        remediation: "Check each exponent's parity first: is 5 even? No, so round DOWN to 4 before including it in the square divisor."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student picks 432, using the full given exponent of 3 (3) instead of rounding down to even.",
        rootCause: "Even-Exponent Rule Skipped — uses the original odd exponent of 3 (3) directly instead of rounding down to 2.",
        remediation: "Check the exponent of 3 (3, odd) and round down to the nearest even value (2) before including it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check each exponent's parity", hint: "2⁵: exponent 5 is odd. 3³: exponent 3 is odd. 7¹: exponent 1 is odd." },
      { level: 2, description: "Round down to the nearest even exponent", hint: "2⁵→2⁴. 3³→3². 7¹→7⁰ (drop it)." },
      { level: 3, description: "Multiply", hint: "16 × 9 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-05",
    question: "Which is FALSE? A) Divisible by 10 → divisible by 2 and 5. B) Divisible by 6 → divisible by 2 and 3. C) Divisible by 9 → divisible by 3. D) Divisible by 3 and 6 → divisible by 9.",
    options: [
        { text: "D", correct: true, feedback: "Counterexample: 6 is divisible by 3 and 6, but not by 9." },
        { text: "A", correct: false, feedback: "True.", misconceptionId: "E-r10-a" },
        { text: "B", correct: false, feedback: "True.", misconceptionId: "E-r10-b" },
        { text: "C", correct: false, feedback: "True.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks A as false, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify statement A against a real number; since 10=2×5, any multiple of 10 genuinely is divisible by both 2 and 5.",
        remediation: "Test with a concrete multiple of 10 (like 20 or 30) and confirm it's divisible by both 2 and 5."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks B as false, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify that since 6=2×3, any multiple of 6 is divisible by both 2 and 3.",
        remediation: "Test with a concrete multiple of 6 (like 12 or 18) and confirm it's divisible by both 2 and 3."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks C as false, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify that since 9=3², any multiple of 9 is automatically also a multiple of 3.",
        remediation: "Test with a concrete multiple of 9 (like 18 or 27) and confirm it's also a multiple of 3."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test each with a real number", hint: "Pick a concrete example for each statement and check whether the implication holds." },
      { level: 2, description: "Notice the co-primality issue in D", hint: "3 and 6 share a common factor (3) — they aren't co-prime, so 'divisible by both' doesn't guarantee 'divisible by their product' (18), let alone by 9." },
      { level: 3, description: "Find the counter-example for D", hint: "Try 6: is it divisible by 3? By 6? By 9?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-09",
    question: "Smallest perfect square >200 ending in 6.",
    options: [
        { text: "256", correct: true, feedback: "16²=256, ends in 6, >200. 14²=196 (<200)." },
        { text: "196", correct: false, feedback: "196 < 200.", misconceptionId: "E-r11-a" },
        { text: "216", correct: false, feedback: "Not a perfect square.", misconceptionId: "E-r11-b" },
        { text: "324", correct: false, feedback: "18²=324, larger than 256.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 196, correctly ending in 6 but below the required 200.",
        rootCause: "Boundary Check Skipped — finds a square ending in the right digit but doesn't verify it's greater than 200.",
        remediation: "Check each candidate against BOTH conditions (ends in 6 AND greater than 200)."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 216, which isn't a perfect square at all.",
        rootCause: "Non-Square Number Picked — picks a number ending in 6 and greater than 200 without checking whether it's actually a perfect square; √216 is not a whole number.",
        remediation: "Only consider numbers that are actual squares of integers (14², 15², 16²...) rather than any number that happens to end in 6."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 324, a valid square ending in... actually ending in 4, not 6, and also not the smallest.",
        rootCause: "Ending-Digit Check Skipped — picks a larger square without checking either that it ends in 6 or that it's the smallest valid one; 18²=324 actually ends in 4.",
        remediation: "Check the LAST DIGIT of each candidate square explicitly, and test candidates in increasing order to find the smallest that satisfies both conditions."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which numbers square to end in 6", hint: "A square ends in 6 when the original number ends in 4 or 6 (check: 4²=16, 6²=36)." },
      { level: 2, description: "Find where squares cross 200", hint: "14²=196 (just under 200). What's the next candidate ending in 4 or 6?" },
      { level: 3, description: "Test in order", hint: "Try 16² — is it greater than 200? Does it end in 6?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-09",
    question: "nth term = \\( 3n^2 - 2n + 1 \\). Find the 4th term.",
    options: [
        { text: "41", correct: true, feedback: "3×16 − 2×4 + 1 = 48 − 8 + 1 = 41." },
        { text: "33", correct: false, feedback: "Doesn't match the formula for n=4.", misconceptionId: "E-r12-a" },
        { text: "49", correct: false, feedback: "That's 7², not the formula's result.", misconceptionId: "E-r12-b" },
        { text: "25", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers 33, an arithmetic slip in the multi-term formula.",
        rootCause: "Arithmetic Slip in a Multi-Term Formula — makes an error in one of the three terms (3n², -2n, or +1) when substituting n=4, leading to a value short of the correct 41.",
        remediation: "Compute each of the three terms SEPARATELY and label them: 3n²=3×16=48, -2n=-2×4=-8, +1=1, then combine: 48-8+1."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers 49, unrelated to the actual formula.",
        rootCause: "Wrong Formula Substituted — computes an unrelated value (7²) rather than substituting n=4 into the given formula 3n²-2n+1.",
        remediation: "Write the formula explicitly with n=4 substituted at every occurrence: 3×(4)²-2×(4)+1, before doing any arithmetic."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers 25, an unverified computation.",
        rootCause: "Formula Misapplication — doesn't correctly substitute and evaluate all three terms of the quadratic formula.",
        remediation: "Break the substitution into three separate, checked steps (3n², then -2n, then +1) before combining them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Substitute n=4 into each term", hint: "3n² = 3×4² = 3×16. -2n = -2×4. +1 stays +1." },
      { level: 2, description: "Compute each term", hint: "3×16=48. -2×4=-8." },
      { level: 3, description: "Combine", hint: "48 - 8 + 1 = ?" }
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

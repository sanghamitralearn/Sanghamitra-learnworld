// seed/mathSeedCh3FactorsMultiplesL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 1 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-1.html.
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 1;

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
    skillId: "FACT-01",
    question: "List all the factors of 24.",
    options: [
        { text: "1, 2, 3, 4, 6, 8, 12, 24", correct: true, feedback: "Factors come in pairs: 1×24, 2×12, 3×8, 4×6. All are included." },
        { text: "2, 3, 4, 6, 8, 12", correct: false, feedback: "You missed 1 and 24 — every number has 1 and itself as factors.", misconceptionId: "E-w1-a" },
        { text: "1, 2, 3, 4, 6, 8, 12, 24, 48", correct: false, feedback: "48 is not a factor of 24; 48 is a multiple, not a factor.", misconceptionId: "E-w1-b" },
        { text: "1, 2, 4, 6, 8, 12", correct: false, feedback: "You missed 3 (3×8=24).", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Find all pairs of numbers that multiply to 24. Write all numbers from those pairs without repeating.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers 2, 3, 4, 6, 8, 12 — omits 1 and 24 from the factor list.",
        rootCause: "Trivial-Factor Omission — 1 and the number itself feel like \"not real\" factors since they come from the trivial pair 1×24, so students often forget to write them down.",
        remediation: "Have the student always write the pair \"1 × [the number]\" first before hunting for any other factor pairs, so it is never skipped."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 1, 2, 3, 4, 6, 8, 12, 24, 48 — includes 48 in the factor list.",
        rootCause: "Factor-Multiple Confusion — the student mixed up \"factor\" (divides the number) with \"multiple\" (the number divides into it), including a number that 24 divides into rather than one that divides 24.",
        remediation: "Ask directly: \"does 24 divide 48, or does 48 divide 24?\" and reinforce that every factor of a number must be less than or equal to it."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 1, 2, 4, 6, 8, 12 — omits 3.",
        rootCause: "Incomplete Pair Search — the student stopped systematically testing divisors before reaching 3, missing the pair 3×8=24.",
        remediation: "Teach the systematic pair method: test each integer in order starting at 1 (1, 2, 3, 4...) up to the square root of the number, pairing each with its complement."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Think in pairs", hint: "Two numbers multiply together to give 24. Start with 1×24, then try 2, 3, 4..." },
      { level: 2, description: "Test every integer up to the square root", hint: "Check each whole number from 1 up to about 5 (since 5×5=25>24): does it divide 24 exactly?" },
      { level: 3, description: "List and confirm every pair", hint: "Write out 1×24, 2×12, 3×8, 4×6 — since 5 doesn't divide 24, you've found every pair. Collect all 8 numbers." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-01", probability: 0.6, condition: "If factor lists are incomplete, HCF comparisons that rely on listed factors will also miss the true highest common factor." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.B.4"]
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-01",
    question: "List the first five multiples of 7.",
    options: [
        { text: "7, 14, 21, 28, 35", correct: true, feedback: "Start at 7 and keep adding 7: 7,14,21,28,35." },
        { text: "7, 17, 27, 37, 47", correct: false, feedback: "You added 10 each time instead of 7.", misconceptionId: "E-w2-a" },
        { text: "0, 7, 14, 21, 28", correct: false, feedback: "0 is a multiple, but usually we list the first five starting from the number itself.", misconceptionId: "E-w2-b" },
        { text: "7, 14, 28, 56, 112", correct: false, feedback: "You doubled each time instead of adding 7.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Multiples of 7 are found by skip counting: 7, then 7+7=14, then 14+7=21, and so on.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student answers 7, 17, 27, 37, 47 — each term is 10 more than the last instead of 7 more.",
        rootCause: "Skip-Count Interval Substitution — the student defaulted to the very familiar \"add 10\" pattern from place-value practice instead of adding the target number 7.",
        remediation: "Have the student state the multiplication fact for each term (7×1, 7×2, 7×3...) rather than relying on repeated addition alone, to anchor the correct interval."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 0, 7, 14, 21, 28 — starts the list at 0, so the fifth term listed is only the fourth true multiple.",
        rootCause: "Off-by-One Starting Index — including 0 as the \"first\" multiple shifts the whole list back by one position.",
        remediation: "Clarify the convention explicitly: the first multiple of a number is the number itself (7×1), not 0 (7×0), when asked for \"the first five multiples.\""
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 7, 14, 28, 56, 112 — each term doubles the previous one instead of adding 7.",
        rootCause: "Additive-to-Multiplicative Rule Slip — after 7 and 14 (which also fit a doubling rule), the student locked onto doubling instead of continuing to add a constant 7.",
        remediation: "After each new term, have the student explicitly check \"previous term + 7 = ?\" and compare it to their answer before moving on."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a multiple is", hint: "A multiple of 7 is 7 times a whole number: 7×1, 7×2, 7×3..." },
      { level: 2, description: "Skip count by 7", hint: "Start at 7 and keep adding 7 each time: 7, then 7+7, then that +7 again..." },
      { level: 3, description: "Check with multiplication", hint: "Confirm each term equals 7 times its position: 7×1=7, 7×2=14, 7×3=21, 7×4=28, 7×5=35." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-02", probability: 0.5, condition: "If multiple lists use the wrong step size, finding the LCM by listing multiples will also go wrong." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.B.4"]
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-01",
    question: "Find the HCF of 12 and 18 by listing the factors.",
    options: [
        { text: "6", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. Common: 1,2,3,6. Highest is 6." },
        { text: "2", correct: false, feedback: "2 is a common factor, but not the highest.", misconceptionId: "E-w3-a" },
        { text: "12", correct: false, feedback: "12 is not a factor of 18.", misconceptionId: "E-w3-b" },
        { text: "3", correct: false, feedback: "3 is common, but 6 is larger and also common.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Write all factors of each number. Circle the common ones and pick the largest.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 2 — a common factor of 12 and 18, but not the highest one.",
        rootCause: "Premature-Stop Comparison — the student found the first common factor after 1 while scanning the lists and stopped without checking for a larger one.",
        remediation: "Require students to list ALL common factors first, circle every one, and only then choose the largest — never stop at the first match."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 12 — a factor of 12 itself, but not a factor of 18.",
        rootCause: "Self-Factor Assumption — the student assumed the smaller original number is automatically the HCF without checking whether it actually divides the other number (18÷12 is not exact).",
        remediation: "Have the student verify any candidate HCF by dividing BOTH original numbers by it and confirming both divisions come out exact."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 3 — a common factor, but not the greatest one, since 6 is also common and larger.",
        rootCause: "Incomplete Common-Factor List — the student found some but not all common factors, missing that 6 also divides both 12 and 18.",
        remediation: "Cross-check the full factor lists side by side: 12→{1,2,3,4,6,12}, 18→{1,2,3,6,9,18}; underline every number that appears in both before picking the largest."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List factors of each number", hint: "Write all factors of 12 and all factors of 18 separately." },
      { level: 2, description: "Find the common factors", hint: "Compare the two lists and mark every number that appears in both." },
      { level: 3, description: "Pick the highest", hint: "Among the common factors you marked, choose the largest one — that is the HCF." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-03", probability: 0.4, condition: "If common factors aren't found exhaustively, HCF word problems involving equal grouping will also come out incomplete." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-03",
    question: "Is 51 prime or composite?",
    options: [
        { text: "Composite (3 × 17)", correct: true, feedback: "51 = 3 × 17, so it has factors other than 1 and itself." },
        { text: "Prime", correct: false, feedback: "51 is divisible by 3 (digit sum 6), so it is not prime.", misconceptionId: "E-w4-a" },
        { text: "Neither", correct: false, feedback: "Every integer greater than 1 is either prime or composite.", misconceptionId: "E-w4-b" },
        { text: "Both", correct: false, feedback: "A number cannot be both prime and composite.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Check if 51 has any factors other than 1 and 51. Try dividing by small primes: 3 works.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers \"Prime\" for 51.",
        rootCause: "Odd-Number-Looks-Prime Bias — 51 is odd and doesn't end in an obviously composite digit, so the student assumed it was prime without testing divisibility by 3, 7, and so on.",
        remediation: "Teach a quick divisibility screen (2, 3, 5, 7...) up to the square root before declaring any number prime; for 51, checking 3 via the digit sum (5+1=6) settles it immediately."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers \"Neither\" for 51.",
        rootCause: "Category-Confusion — the student didn't recognise that every whole number greater than 1 must be classified as either prime or composite, treating \"neither\" as a safe third option.",
        remediation: "Reinforce the definitions directly: any integer >1 with more than two factors is composite, and any with exactly two factors is prime — there is no third category."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers \"Both\" for 51.",
        rootCause: "Category-Confusion — the student thought prime and composite might overlap for some numbers, not recognising the two categories are mutually exclusive.",
        remediation: "Explicitly drill the mutual-exclusivity rule: a number cannot have \"exactly two factors\" and \"more than two factors\" at the same time."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definitions", hint: "A prime number has exactly two factors: 1 and itself. A composite number has more than two." },
      { level: 2, description: "Test small prime divisors", hint: "Check if 51 is divisible by 2, 3, 5, or 7." },
      { level: 3, description: "Confirm with a factor pair", hint: "51 ÷ 3 = 17 exactly, so 51 = 3 × 17 — it has factors besides 1 and itself, making it composite." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FACT-02", probability: 0.5, condition: "If a composite number is mistaken for prime, its prime factorisation will be skipped or done incorrectly." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-01",
    question: "Find the square of 9.",
    options: [
        { text: "81", correct: true, feedback: "9² = 9 × 9 = 81." },
        { text: "18", correct: false, feedback: "You multiplied by 2 instead of squaring.", misconceptionId: "E-w5-a" },
        { text: "99", correct: false, feedback: "You wrote 9 twice, not multiplied.", misconceptionId: "E-w5-b" },
        { text: "72", correct: false, feedback: "That's 9 × 8.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Square means multiply the number by itself: 9 × 9.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 18 — exactly double 9, not squared.",
        rootCause: "Square-as-Double Confusion — the student computed 9×2 instead of 9×9, confusing \"square\" with \"double.\"",
        remediation: "Model \"square\" as the area of a 9-by-9 grid versus a 9-by-2 rectangle, so the two operations look visibly different."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 99 — wrote the digit 9 twice side by side instead of multiplying.",
        rootCause: "Symbol Misinterpretation — the student read the exponent notation 9² as \"write the number twice\" rather than \"multiply the number by itself.\"",
        remediation: "Translate exponent notation explicitly every time: \"9² means 9 × 9,\" writing out the multiplication before evaluating it."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 72 — this is 9×8, one factor short of 9×9.",
        rootCause: "Off-by-One Multiplicand — the student multiplied 9 by one less than 9 (8), likely pulling a neighbouring fact from the multiplication table instead of 9×9.",
        remediation: "Have the student say the full multiplication sentence aloud (\"nine times nine\") before computing, to avoid substituting a neighbouring table fact."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what squaring means", hint: "Squaring a number means multiplying it by itself, not by 2." },
      { level: 2, description: "Write the multiplication", hint: "Write 9 × 9 and solve it directly." },
      { level: 3, description: "Compute step by step", hint: "9 × 9 = 9×10 − 9 = 90 − 9 = 81." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "SQNUM-02", probability: 0.5, condition: "If squaring is confused with doubling, finding square roots (the inverse operation) will also be error-prone." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-01",
    question: "Complete the pattern: 3, 6, 9, 12, ___",
    options: [
        { text: "15", correct: true, feedback: "Each term increases by 3: 12 + 3 = 15." },
        { text: "14", correct: false, feedback: "Adding 2 gives 14, but the difference is 3.", misconceptionId: "E-w6-a" },
        { text: "16", correct: false, feedback: "Adding 4 would give 16, not the pattern.", misconceptionId: "E-w6-b" },
        { text: "36", correct: false, feedback: "You multiplied 12 by 3 instead of adding 3.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Find the difference: 6-3=3, 9-6=3. So add 3 to the last term.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 14 — adds only 2 to the last term instead of 3.",
        rootCause: "Difference Miscount (Undershoot) — the student misjudged the constant difference between consecutive terms as 2 instead of 3.",
        remediation: "Have the student explicitly subtract consecutive terms (6−3, 9−6, 12−9) to confirm the constant difference before extending the pattern."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 16 — adds 4 to the last term instead of 3.",
        rootCause: "Difference Miscount (Overshoot) — the student overestimated the constant difference as 4 rather than verifying it from the given terms.",
        remediation: "Same fix: verify the difference between each consecutive pair of given terms before applying it to generate the next one."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 36 — multiplied the last term by 3 instead of adding 3.",
        rootCause: "Additive-Multiplicative Rule Confusion — the student misapplied the number 3 (the common difference) as a multiplier instead of an addend.",
        remediation: "Contrast explicitly: \"this sequence adds 3 each time, it does not multiply by 3\" — test the addition rule against an earlier pair of terms to confirm it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the pattern rule", hint: "Look at how each term changes from the one before it." },
      { level: 2, description: "Check the difference is constant", hint: "6−3=3, 9−6=3, 12−9=3. The pattern adds 3 each time." },
      { level: 3, description: "Apply the rule", hint: "Add 3 to the last given term: 12+3=15." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PATT-03", probability: 0.3, condition: "If constant-difference patterns aren't secure, more complex sequences built on them (like triangular numbers) will be harder to analyse." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-02",
    question: "Write the prime factorisation of 36.",
    options: [
        { text: "2² × 3²", correct: true, feedback: "36 = 6×6 = (2×3)×(2×3) = 2²×3²." },
        { text: "4 × 9", correct: false, feedback: "4 and 9 are not prime numbers; you must break them down further.", misconceptionId: "E-w7-a" },
        { text: "6 × 6", correct: false, feedback: "6 is not prime; use a factor tree to break into primes.", misconceptionId: "E-w7-b" },
        { text: "2 × 18", correct: false, feedback: "18 is composite; 36 = 2 × 2 × 3 × 3 = 2²×3².", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Break 36 into 6×6, then break each 6 into 2×3. Collect the primes: two 2s and two 3s.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 4 × 9 — leaves both factors as unfactored composite numbers.",
        rootCause: "Incomplete Factor-Tree Termination — the student stopped factoring once reaching a \"nice\" pair of factors without checking whether each one was prime.",
        remediation: "Teach the rule \"keep branching every non-prime factor until every leaf of the factor tree is prime,\" checking each leaf against a short list of primes."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 6 × 6 — leaves both 6s unfactored, but 6 is composite (2×3).",
        rootCause: "Incomplete Factor-Tree Termination — from a different first split (6×6), the student didn't recognise that 6 itself still needs to be broken into 2×3.",
        remediation: "Same fix: check every branch tip against a memorised list of primes under 20 before stopping."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 2 × 18 — leaves 18 unfactored, but 18 is composite (2×3²).",
        rootCause: "Single-Branch Termination — the student stopped the factor tree after pulling out only one prime factor (2), without continuing to factor the remaining composite 18.",
        remediation: "Reinforce continuing the tree on EVERY branch that isn't yet prime, not just the first one split off."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Start a factor tree", hint: "Split 36 into any two factors, e.g. 6×6 or 4×9." },
      { level: 2, description: "Keep splitting composite branches", hint: "If a branch number is not prime, split it again until every branch is a prime number." },
      { level: 3, description: "Collect the primes", hint: "Gather every prime leaf and write it using exponents: two 2s and two 3s → 2²×3²." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-02", probability: 0.6, condition: "If prime factorisation stops at composite branches, HCF/LCM calculated from prime factors will also be wrong." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "Find the LCM of 4 and 6 by listing multiples.",
    options: [
        { text: "12", correct: true, feedback: "Multiples of 4: 4,8,12,16… Multiples of 6: 6,12,18… First common is 12." },
        { text: "24", correct: false, feedback: "24 is a common multiple, but not the least.", misconceptionId: "E-w8-a" },
        { text: "4", correct: false, feedback: "4 is not a multiple of 6.", misconceptionId: "E-w8-b" },
        { text: "6", correct: false, feedback: "6 is not a multiple of 4.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Write the first few multiples of each number and find the smallest number that appears in both lists.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 24 — a common multiple of 4 and 6, but not the smallest one.",
        rootCause: "Least-vs-Common Confusion — the student found a common multiple (perhaps by multiplying 4×6) but didn't check for a smaller one appearing earlier in both lists.",
        remediation: "Insist on listing multiples of both numbers in increasing order and marking the FIRST value common to both lists, not any later match."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 4 — but 4 is not a multiple of 6.",
        rootCause: "Single-List Check Only — the student checked only that 4 is a multiple of 4 (trivially true) without confirming it's also a multiple of 6.",
        remediation: "Require explicit verification against BOTH lists: \"is this number in the 4-times table AND in the 6-times table?\""
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 6 — but 6 is not a multiple of 4.",
        rootCause: "Single-List Check Only — the student checked only that 6 is a multiple of 6, without confirming divisibility by 4.",
        remediation: "Same fix: always cross-check a candidate against both original numbers' multiple lists before accepting it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each number", hint: "Write out several multiples of 4 and several multiples of 6." },
      { level: 2, description: "Find the first shared value", hint: "Scan both lists for the smallest number that appears in both." },
      { level: 3, description: "Confirm the LCM", hint: "4,8,12,16... and 6,12,18... — 12 is the first number in both lists, so LCM=12." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-03", probability: 0.4, condition: "If LCM-by-listing is unreliable, LCM word problems (like recurring events) will also be error-prone." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-01",
    question: "Which of these is NOT a factor of 48?",
    options: [
        { text: "7", correct: true, feedback: "48 ÷ 7 = 6 remainder 6, so 7 is not a factor." },
        { text: "16", correct: false, feedback: "48 ÷ 16 = 3 exactly; 16 is a factor.", misconceptionId: "E-d1-a" },
        { text: "24", correct: false, feedback: "48 ÷ 24 = 2; 24 is a factor.", misconceptionId: "E-d1-b" },
        { text: "8", correct: false, feedback: "48 ÷ 8 = 6; 8 is a factor.", misconceptionId: "E-d1-c" }
      ],
    backward: "A factor divides the number exactly with no remainder.",
    forward: "Knowing factors helps simplify fractions and find HCF.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student picks 16, believing it is not a factor of 48.",
        rootCause: "Division-Without-Checking — the student guessed based on 16 \"feeling\" like an unusual divisor rather than actually dividing 48 by 16 (which gives exactly 3).",
        remediation: "Insist on an actual division check for every candidate: 48 ÷ 16 = 3 with no remainder confirms 16 IS a factor."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student picks 24, believing it is not a factor of 48.",
        rootCause: "Division-Without-Checking — the student didn't verify that 48 ÷ 24 = 2 exactly, so missed that 24 is indeed a factor.",
        remediation: "Same fix: always perform the division rather than judging by \"does this number look like a factor.\""
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student picks 8, believing it is not a factor of 48.",
        rootCause: "Division-Without-Checking — the student overlooked that 48 ÷ 8 = 6 exactly, an easily recalled multiplication fact.",
        remediation: "Reinforce known multiplication facts (6×8=48) as a fast way to confirm factor pairs without long division."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the factor test", hint: "A factor divides the number with no remainder left over." },
      { level: 2, description: "Divide each option into 48", hint: "Work out 48 ÷ 16, 48 ÷ 24, 48 ÷ 8, and 48 ÷ 7 one at a time." },
      { level: 3, description: "Spot the exception", hint: "Three of the four divisions come out exact; the one that leaves a remainder is the answer." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-01", probability: 0.4, condition: "If factor-checking by division isn't reliable, comparing factor lists to find HCF will carry the same errors forward." }
    ],
    learningObjectives: ["CCSS.MATH.4.OA.B.4"]
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-01",
    question: "What is the 6th multiple of 9?",
    options: [
        { text: "54", correct: true, feedback: "9 × 6 = 54." },
        { text: "45", correct: false, feedback: "That's the 5th multiple (9×5).", misconceptionId: "E-d2-a" },
        { text: "63", correct: false, feedback: "The 7th multiple (9×7).", misconceptionId: "E-d2-b" },
        { text: "60", correct: false, feedback: "60 is a multiple of 10, not 9.", misconceptionId: "E-d2-c" }
      ],
    backward: "Multiply 9 by the position number: 9,18,27,36,45,54.",
    forward: "Multiples help find common denominators in fractions.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student answers 45 — the 5th multiple of 9, one position too early.",
        rootCause: "Off-by-One Position Error — the student used position 5 instead of position 6, likely miscounting while skip-counting up the list.",
        remediation: "Have the student number each multiple as they list it (9=1st, 18=2nd, ...) so the position and value stay paired."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student answers 63 — the 7th multiple of 9, one position too late.",
        rootCause: "Off-by-One Position Error — the student overshot to position 7 instead of stopping at position 6.",
        remediation: "Same fix: number each term explicitly while skip-counting, and stop as soon as the target position is reached."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student answers 60 — a round number that is actually a multiple of 10, not 9.",
        rootCause: "Nearby-Round-Number Substitution — the student estimated a \"nice\" nearby number instead of computing 9×6 precisely.",
        remediation: "Require the exact multiplication fact to be written out (9×6) rather than estimating toward a round number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the meaning of \"nth multiple\"", hint: "The 6th multiple of a number is that number multiplied by 6." },
      { level: 2, description: "Set up the multiplication", hint: "Write 9 × 6." },
      { level: 3, description: "Compute and check", hint: "9 × 6 = 54. Double-check by listing: 9,18,27,36,45,54 — the 6th term is 54." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.OA.B.4"]
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-01",
    question: "Find the HCF of 12 and 20.",
    options: [
        { text: "4", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. Factors of 20: 1,2,4,5,10,20. Highest common = 4." },
        { text: "2", correct: false, feedback: "2 is common, but 4 is larger and also common.", misconceptionId: "E-d3-a" },
        { text: "6", correct: false, feedback: "6 is a factor of 12 but not of 20.", misconceptionId: "E-d3-b" },
        { text: "10", correct: false, feedback: "10 is a factor of 20 but not of 12.", misconceptionId: "E-d3-c" }
      ],
    backward: "List factors of each and find the greatest that appears in both lists.",
    forward: "HCF is used to simplify fractions to lowest terms.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student answers 2 — a common factor, but not the highest one.",
        rootCause: "Premature-Stop Comparison — the student stopped scanning the factor lists as soon as a common value (2) was found, without checking for a larger match.",
        remediation: "Require the full common-factor list to be written out before selecting the maximum."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student answers 6 — a factor of 12, but 20 is not divisible by 6.",
        rootCause: "Single-Number Factor Check — the student only confirmed 6 divides 12 and assumed it must also divide 20 without checking.",
        remediation: "Insist on testing every HCF candidate against BOTH original numbers: 20 ÷ 6 is not exact, so 6 is disqualified."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 10 — a factor of 20, but 12 is not divisible by 10.",
        rootCause: "Single-Number Factor Check — the student only confirmed 10 divides 20 and assumed it must also divide 12 without checking.",
        remediation: "Same fix: check both original numbers, not just one, before accepting a common-factor candidate."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List factors of each number", hint: "Write all factors of 12 and all factors of 20." },
      { level: 2, description: "Mark the common factors", hint: "Compare the lists and mark every number that appears in both." },
      { level: 3, description: "Choose the greatest", hint: "Among 1, 2, 4 (the common factors), the greatest is 4." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-03", probability: 0.4, condition: "If HCF candidates aren't checked against both numbers, HCF word problems (equal sharing, simplifying ratios) will inherit the same error." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-01",
    question: "Which number is divisible by 3?",
    options: [
        { text: "312", correct: true, feedback: "Digit sum = 3+1+2 = 6, which is divisible by 3." },
        { text: "214", correct: false, feedback: "Digit sum = 2+1+4 = 7, not divisible by 3.", misconceptionId: "E-d4-a" },
        { text: "401", correct: false, feedback: "Digit sum = 5, not divisible by 3.", misconceptionId: "E-d4-b" },
        { text: "520", correct: false, feedback: "Digit sum = 7, not divisible by 3.", misconceptionId: "E-d4-c" }
      ],
    backward: "Sum the digits; if the sum is a multiple of 3, the number is divisible by 3.",
    forward: "Divisibility rules speed up factorisation and fraction work.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student picks 214, whose digit sum is 7 — not a multiple of 3.",
        rootCause: "Rule Misapplication — the student likely applied the \"even last digit\" rule (for divisibility by 2) instead of summing digits for divisibility by 3.",
        remediation: "Have the student state which rule they are using before applying it, and practise the digit-sum rule with several examples until it's automatic for 3."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student picks 401, whose digit sum is 5 — not a multiple of 3.",
        rootCause: "Digit-Sum Arithmetic Slip — the student may have miscomputed 4+0+1 (or skipped a digit) rather than getting 5, and 5 was mistaken for divisible by 3.",
        remediation: "Have the student write out each digit being added on a separate line before totalling, to avoid dropping or misreading a digit."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student picks 520, whose digit sum is 7 — not a multiple of 3.",
        rootCause: "Digit-Sum Arithmetic Slip — the student likely miscalculated 5+2+0, or confused this number with one ending in a \"friendlier\" digit.",
        remediation: "Reinforce checking the digit sum against the 3-times table directly (3,6,9,12...) to decide divisibility."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the divisibility rule for 3", hint: "A number is divisible by 3 if the sum of its digits is divisible by 3." },
      { level: 2, description: "Add the digits of each option", hint: "Find the digit sum of 312, 214, 401, and 520." },
      { level: 3, description: "Test each sum against the 3-times table", hint: "Only one of the four digit sums (6) is a multiple of 3." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIVR-02", probability: 0.5, condition: "If the digit-sum rule for 3 isn't secure, combined rules like divisibility by 6 or 9 will also be unreliable." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-01",
    question: "What is 8²?",
    options: [
        { text: "64", correct: true, feedback: "8² = 8 × 8 = 64." },
        { text: "16", correct: false, feedback: "That's 8 × 2 (double), not square.", misconceptionId: "E-d5-a" },
        { text: "72", correct: false, feedback: "That's 8 × 9.", misconceptionId: "E-d5-b" },
        { text: "56", correct: false, feedback: "That's 8 × 7.", misconceptionId: "E-d5-c" }
      ],
    backward: "8² means 8 multiplied by itself.",
    forward: "Square numbers appear in area calculations and Pythagoras' theorem.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student answers 16 — double 8, not squared.",
        rootCause: "Square-as-Double Confusion — the exponent 2 was interpreted as \"multiply by 2\" rather than \"multiply by itself.\"",
        remediation: "Model squaring as the area of an 8-by-8 grid to visually contrast it with doubling (an 8-by-2 rectangle)."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student answers 72 — this is 8×9, one factor too many.",
        rootCause: "Off-by-One Multiplicand (Overshoot) — the student multiplied 8 by the next number up (9) instead of by 8 itself.",
        remediation: "Have the student say the full fact aloud (\"eight times eight\") before computing to avoid substituting a neighbouring table fact."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student answers 56 — this is 8×7, one factor too few.",
        rootCause: "Off-by-One Multiplicand (Undershoot) — the student multiplied 8 by one less than 8 (7) instead of by 8 itself.",
        remediation: "Same fix: verbalise the full multiplication fact before computing, rather than pulling a nearby table answer from memory."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what squaring means", hint: "8² means 8 multiplied by itself, not by 2." },
      { level: 2, description: "Write the multiplication", hint: "Write 8 × 8." },
      { level: 3, description: "Compute carefully", hint: "8 × 8 = 8×10 − 8×2 = 80 − 16 = 64." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-02",
    question: "Complete the pattern: 2, 4, 8, 16, ___",
    options: [
        { text: "32", correct: true, feedback: "Each term is multiplied by 2: 16 × 2 = 32." },
        { text: "24", correct: false, feedback: "Adding 8 would give 24, but the pattern is multiplicative.", misconceptionId: "E-d6-a" },
        { text: "30", correct: false, feedback: "No clear pattern yields 30.", misconceptionId: "E-d6-b" },
        { text: "20", correct: false, feedback: "Adding 4 would give 20, but the pattern is doubling.", misconceptionId: "E-d6-c" }
      ],
    backward: "Notice that 4=2×2, 8=4×2, 16=8×2. So multiply by 2 each step.",
    forward: "Recognising multiplicative patterns prepares for exponential growth.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 24 — adds the fixed amount 8 (the difference between the last two given terms) instead of doubling.",
        rootCause: "Additive Pattern Override — the student treated the most recent gap (16−8=8) as a constant difference to keep adding, rather than checking whether the pattern is multiplicative.",
        remediation: "Before extending any sequence, have the student test both a constant-difference AND a constant-ratio hypothesis against every given pair of terms."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 30 — does not follow from any consistent additive or multiplicative rule applied to 16.",
        rootCause: "Guess Without Rule Verification — the student picked a plausible-looking nearby number without testing it against the pattern established by the earlier terms.",
        remediation: "Require the student to state the rule in words first (\"each term is ___ the previous one\") and verify it against at least two consecutive pairs before applying it."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 20 — adds 4 (the difference between the first two given terms) instead of doubling.",
        rootCause: "Additive Pattern Override — the student anchored on an early, smaller gap (4−2=2, or a related increment) and extended it additively rather than recognising the doubling rule.",
        remediation: "Same fix: test a constant-ratio hypothesis by dividing each term by the one before it (4÷2=2, 8÷4=2, 16÷8=2) to confirm doubling."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the terms", hint: "Look at how each term relates to the one before it — by adding or by multiplying." },
      { level: 2, description: "Test for a constant ratio", hint: "Divide each term by the previous one: 4÷2, 8÷4, 16÷8. Are they all the same?" },
      { level: 3, description: "Apply the doubling rule", hint: "Since each term is double the one before, 16 × 2 = 32." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "PATT-03", probability: 0.4, condition: "If multiplicative patterns are mistaken for additive ones, more complex geometric or recursive sequences will be misread the same way." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-03",
    question: "How many factors does 36 have?",
    options: [
        { text: "9", correct: true, feedback: "Factors: 1,2,3,4,6,9,12,18,36 — that's 9 factors." },
        { text: "8", correct: false, feedback: "You might have missed 1 or 36; check the complete list.", misconceptionId: "E-d7-a" },
        { text: "10", correct: false, feedback: "You double-counted a factor pair.", misconceptionId: "E-d7-b" },
        { text: "7", correct: false, feedback: "You missed at least two factors.", misconceptionId: "E-d7-c" }
      ],
    backward: "List factor pairs: 1×36, 2×18, 3×12, 4×9, 6×6 — 9 distinct factors.",
    forward: "Counting factors is useful in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student answers 8 — one factor short of the correct count of 9.",
        rootCause: "Trivial-Factor Omission — the student's list likely left out 1 or 36 (the trivial factor pair), the two easiest to forget when scanning for \"interesting\" divisors.",
        remediation: "Always begin any factor list with the pair 1×[number] before searching further, so the trivial factors are never dropped."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student answers 10 — one more than the correct count of 9.",
        rootCause: "Repeated-Square-Root Factor Double-Count — 36 is a perfect square, so its middle factor pair is 6×6; counting 6 twice (once from each side of the pair) inflates the total by one.",
        remediation: "When a number is a perfect square, remind the student that the square-root factor (6 here) is listed only ONCE, not twice."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student answers 7 — two factors short of the correct count of 9.",
        rootCause: "Incomplete Pair Search — the student's systematic search for factor pairs (1×36, 2×18, 3×12...) stopped early, missing one or more pairs such as 4×9.",
        remediation: "Test every integer in order from 1 up to the square root of the number (here, up to 6) to guarantee no pair is skipped."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List factor pairs systematically", hint: "Start from 1×36 and test each integer in order: does it divide 36 exactly?" },
      { level: 2, description: "Stop at the square root", hint: "You only need to test up to 6 (since 6×6=36); beyond that, pairs repeat in reverse." },
      { level: 3, description: "Count distinct factors, watch the square root", hint: "1,2,3,4,6,9,12,18,36 — since 36 is a perfect square, 6 is counted once, giving 9 factors total." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-01",
    question: "What is the 12th multiple of 8?",
    options: [
        { text: "96", correct: true, feedback: "8 × 12 = 96." },
        { text: "88", correct: false, feedback: "The 11th multiple (8×11).", misconceptionId: "E-d8-a" },
        { text: "104", correct: false, feedback: "The 13th multiple (8×13).", misconceptionId: "E-d8-b" },
        { text: "80", correct: false, feedback: "The 10th multiple (8×10).", misconceptionId: "E-d8-c" }
      ],
    backward: "Multiply 8 by 12.",
    forward: "Multiples are used when finding common schedules or beats.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student answers 88 — the 11th multiple of 8, one position too early.",
        rootCause: "Off-by-One Position Error — the student stopped counting positions one step short of 12.",
        remediation: "Number each multiple as it's generated (8=1st, 16=2nd...) so the count and value stay in sync up to the 12th term."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student answers 104 — the 13th multiple of 8, one position too late.",
        rootCause: "Off-by-One Position Error — the student overshot by one position past 12.",
        remediation: "Same fix: number each multiple explicitly and stop exactly at the requested position."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student answers 80 — the 10th multiple of 8, two positions too early.",
        rootCause: "Position-Value Substitution — the student may have confused \"12th multiple\" with \"multiple close to 10×8,\" a common round-number anchor.",
        remediation: "Require the exact multiplication 8×12 to be computed directly, rather than estimating from a nearby round multiple like 8×10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the meaning of \"nth multiple\"", hint: "The 12th multiple of 8 is 8 multiplied by 12." },
      { level: 2, description: "Set up the multiplication", hint: "Write 8 × 12." },
      { level: 3, description: "Compute using a friendly split", hint: "8×12 = 8×10 + 8×2 = 80 + 16 = 96." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.4.OA.B.4"]
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Find the HCF of 24 and 36.",
    options: [
        { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3² — HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "6 is a common factor, but 12 is larger.", misconceptionId: "E-d9-a" },
        { text: "18", correct: false, feedback: "18 is not a factor of 24.", misconceptionId: "E-d9-b" },
        { text: "8", correct: false, feedback: "8 is a factor of 24 but not 36.", misconceptionId: "E-d9-c" }
      ],
    backward: "Use prime factorisation: take the lowest power of each common prime.",
    forward: "HCF helps divide quantities into equal groups.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 6 — a common factor of 24 and 36, but not the highest one.",
        rootCause: "Lowest-Power Under-Extraction — the student took only 2¹ instead of the full common lowest power 2², so their candidate HCF (2×3=6) is short by a factor of 2.",
        remediation: "For each common prime, explicitly compare the exponents in both factorisations and take the smaller exponent, not just \"a\" shared prime factor."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 18 — a factor of 36, but 24 is not evenly divisible by 18.",
        rootCause: "Single-Number Factor Check — the student verified 18 divides 36 but didn't check whether 18 also divides 24 (24÷18 is not exact).",
        remediation: "Insist on testing any HCF candidate against BOTH original numbers before accepting it."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 8 — a factor of 24, but 36 is not evenly divisible by 8.",
        rootCause: "Single-Number Factor Check — the student verified 8 divides 24 but didn't check that 36÷8 is not exact.",
        remediation: "Same fix: always confirm the candidate divides both original numbers exactly, not just one of them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime-factorise both numbers", hint: "24 = 2³×3 and 36 = 2²×3²." },
      { level: 2, description: "Find common primes and their lowest powers", hint: "Both have 2 and 3 in common. The lowest power of 2 is 2² (from 36); the lowest power of 3 is 3¹ (from 24)." },
      { level: 3, description: "Multiply to get the HCF", hint: "HCF = 2² × 3 = 4 × 3 = 12." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "HCF-03", probability: 0.4, condition: "If lowest-power extraction for HCF isn't secure, HCF word problems built on prime factorisation will carry the same error." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-01",
    question: "Which number is divisible by both 2 and 5?",
    options: [
        { text: "210", correct: true, feedback: "Ends in 0, so divisible by 2 and 5." },
        { text: "205", correct: false, feedback: "Ends in 5, so divisible by 5 but not by 2.", misconceptionId: "E-d10-a" },
        { text: "212", correct: false, feedback: "Ends in 2, so divisible by 2 but not by 5.", misconceptionId: "E-d10-b" },
        { text: "215", correct: false, feedback: "Ends in 5, not by 2.", misconceptionId: "E-d10-c" }
      ],
    backward: "A number divisible by both 2 and 5 must end in 0.",
    forward: "Divisibility by 10 is the same condition.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student picks 205 — satisfies divisibility by 5 but not by 2.",
        rootCause: "Single-Rule Application — the student checked only the rule for 5 (ends in 0 or 5) and stopped, without also confirming the number is even.",
        remediation: "When a question asks for divisibility by TWO numbers, require both rules to be checked and both boxes ticked before selecting an answer."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student picks 212 — satisfies divisibility by 2 but not by 5.",
        rootCause: "Single-Rule Application — the student checked only the rule for 2 (even last digit) and stopped, without also confirming the last digit is 0 or 5.",
        remediation: "Same fix: checklist both conditions explicitly rather than stopping once one rule passes."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student picks 215 — satisfies divisibility by 5 but not by 2 (it's odd).",
        rootCause: "Single-Rule Application — the student focused on the \"ends in 5\" rule for divisibility by 5 and didn't check that the number must also be even for divisibility by 2.",
        remediation: "Reinforce that \"divisible by both 2 and 5\" is equivalent to \"ends in 0\" specifically — ending in 5 alone is not enough."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall both rules", hint: "Divisible by 2 means the number is even. Divisible by 5 means it ends in 0 or 5." },
      { level: 2, description: "Apply both rules to each option", hint: "Check the last digit of each number against both conditions." },
      { level: 3, description: "Combine the conditions", hint: "A number satisfies both only if it ends in 0 — check which option does." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-03",
    question: "Which of these is a square number?",
    options: [
        { text: "49", correct: true, feedback: "49 = 7 × 7." },
        { text: "50", correct: false, feedback: "50 is not a square (7²=49, 8²=64).", misconceptionId: "E-d11-a" },
        { text: "51", correct: false, feedback: "51 is not a perfect square.", misconceptionId: "E-d11-b" },
        { text: "52", correct: false, feedback: "52 is not a perfect square.", misconceptionId: "E-d11-c" }
      ],
    backward: "A square number is the product of an integer with itself.",
    forward: "Recognising squares helps with quick area and root calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student picks 50, mistaking it for a perfect square because it's close to 49.",
        rootCause: "Nearby-Square Rounding — the student recognised 50 is near 49 (7²) and assumed proximity to a known square makes it one too.",
        remediation: "Have the student list the squares near the target value (49, 64) and confirm the exact value falls ON the list, not just near it."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student picks 51, mistaking it for a perfect square.",
        rootCause: "No-Verification Guess — the student picked a plausible-looking number in the 49–64 range without testing whether any whole number squares to exactly 51.",
        remediation: "Teach a quick check: find the nearest integers whose squares bracket the number (7²=49, 8²=64) and confirm the number equals neither."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student picks 52, mistaking it for a perfect square.",
        rootCause: "No-Verification Guess — same as above, a number was chosen from the range between two consecutive squares without checking it equals one exactly.",
        remediation: "Same fix: bracket the candidate between consecutive squares and confirm it matches neither before calling it a square."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "A square number is n × n for some whole number n." },
      { level: 2, description: "List nearby squares", hint: "7² = 49 and 8² = 64. Any number strictly between these is not a perfect square." },
      { level: 3, description: "Match exactly", hint: "Only 49 exactly matches a square (7×7); 50, 51, and 52 fall between 49 and 64." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-03",
    question: "What is the next term? 1, 4, 9, 16, ___",
    options: [
        { text: "25", correct: true, feedback: "These are square numbers: 1²,2²,3²,4²,5²=25." },
        { text: "20", correct: false, feedback: "The difference between 16 and 20 is 4, but the pattern is not additive.", misconceptionId: "E-d12-a" },
        { text: "24", correct: false, feedback: "24 is not a square.", misconceptionId: "E-d12-b" },
        { text: "30", correct: false, feedback: "30 is not a square.", misconceptionId: "E-d12-c" }
      ],
    backward: "1=1², 4=2², 9=3², 16=4². Next is 5²=25.",
    forward: "Square number patterns lead to quadratic sequences.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 20 — extends the most recent gap (16−9=7, mistaken as 4) additively instead of recognising the square-number pattern.",
        rootCause: "Additive Pattern Override — the student assumed a constant difference should be added to the last term, missing that the true differences (3,5,7...) are themselves growing.",
        remediation: "Have the student compute ALL consecutive differences (4−1=3, 9−4=5, 16−9=7) to notice they are not constant, ruling out a simple additive rule."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 24 — not a perfect square and doesn't follow from the actual difference pattern either.",
        rootCause: "Guess Without Rule Verification — the student picked a number without checking it against either an additive or square-number rule.",
        remediation: "Require the rule to be stated explicitly (\"these are 1²,2²,3²,4²...\") and the next term derived from that rule, not estimated."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 30 — not a perfect square.",
        rootCause: "Guess Without Rule Verification — a plausible-looking larger number was chosen without testing it against the square-number rule.",
        remediation: "Same fix: identify the pattern as \"n²\" explicitly, then compute 5²=25 directly rather than estimating."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Look for a special pattern", hint: "Check if each term is a square number: 1=1², 4=2², 9=3²..." },
      { level: 2, description: "Confirm the pattern", hint: "16 = 4². What would 5² be?" },
      { level: 3, description: "Compute the next square", hint: "5² = 25." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "SQNUM-01", probability: 0.3, condition: "If square-number sequences aren't recognised, computing individual squares on demand may also be shaky." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-02",
    question: "What is the prime factorisation of 90?",
    options: [
        { text: "2 × 3² × 5", correct: true, feedback: "90 = 9×10 = (3×3)×(2×5) = 2×3²×5." },
        { text: "2 × 3 × 15", correct: false, feedback: "15 is composite; must be broken into 3×5.", misconceptionId: "E-d13-a" },
        { text: "2 × 5 × 9", correct: false, feedback: "9 is composite; 9=3².", misconceptionId: "E-d13-b" },
        { text: "3 × 30", correct: false, feedback: "30 is composite; 30=2×3×5.", misconceptionId: "E-d13-c" }
      ],
    backward: "Use a factor tree and write only prime factors, using exponents for repeats.",
    forward: "Prime factorisation is the foundation of HCF and LCM calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 2 × 3 × 15 — leaves 15 unfactored, but 15 is composite (3×5).",
        rootCause: "Incomplete Factor-Tree Termination — the tree was stopped as soon as one branch reached a small-looking number (15), without checking whether it was actually prime.",
        remediation: "Check every leaf of the factor tree against a list of primes under 20; 15 fails this check and must be split into 3×5."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 2 × 5 × 9 — leaves 9 unfactored, but 9 is composite (3²).",
        rootCause: "Incomplete Factor-Tree Termination — 9 was treated as a stopping point because it's small, without verifying it against the prime list.",
        remediation: "Same fix: every branch must terminate in a confirmed prime; 9 is not prime and must become 3×3."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 3 × 30 — this is only the first level of splitting; 30 is still composite (2×3×5).",
        rootCause: "Single-Split Termination — the student split 90 once (3×30) and stopped, treating the first split as the final factorisation.",
        remediation: "Emphasize that a factor tree isn't finished until every single branch terminates in a prime number — one split is rarely enough."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Start a factor tree", hint: "Split 90 into any two factors, e.g. 9×10." },
      { level: 2, description: "Keep splitting composite branches", hint: "9 is not prime (3×3); 10 is not prime (2×5). Keep going until every branch is prime." },
      { level: 3, description: "Collect and write with exponents", hint: "The prime leaves are 3, 3, 2, 5 → write as 2 × 3² × 5." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-02", probability: 0.5, condition: "If prime factorisation leaves composite branches unfactored, LCM computed from those factorisations will also be wrong." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "What is the LCM of 5 and 7?",
    options: [
        { text: "35", correct: true, feedback: "5 and 7 are prime; LCM = 5×7 = 35." },
        { text: "5", correct: false, feedback: "5 is not a multiple of 7.", misconceptionId: "E-d14-a" },
        { text: "7", correct: false, feedback: "7 is not a multiple of 5.", misconceptionId: "E-d14-b" },
        { text: "70", correct: false, feedback: "70 is a common multiple, but not the least (35 is smaller).", misconceptionId: "E-d14-c" }
      ],
    backward: "For primes, LCM is simply their product.",
    forward: "LCM helps add fractions with different denominators.",
    misconceptionId: "",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 5 — but 5 is not a multiple of 7.",
        rootCause: "Larger-Number-Isn't-Considered — the student picked one of the given numbers itself, not checking that the LCM must be a multiple of BOTH numbers.",
        remediation: "Require verification: divide the candidate answer by each original number and confirm both divisions are exact."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 7 — but 7 is not a multiple of 5.",
        rootCause: "Larger-Number-Isn't-Considered — same pattern, picking the other original number without checking it's a multiple of both.",
        remediation: "Same fix: always confirm the candidate LCM divides evenly by both starting numbers."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 70 — a common multiple of 5 and 7, but double the least common multiple.",
        rootCause: "Least-vs-Common Confusion — the student found A common multiple but didn't check for a smaller one (35) before answering.",
        remediation: "For co-prime numbers like 5 and 7, teach the shortcut that their LCM is simply their product (5×7=35) — no larger multiple is needed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check if the numbers share any factors", hint: "5 and 7 are both prime, so they share no common factors besides 1." },
      { level: 2, description: "Apply the co-prime shortcut", hint: "When two numbers share no common factors, their LCM is just their product." },
      { level: 3, description: "Multiply", hint: "5 × 7 = 35." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-01",
    question: "Two numbers have HCF 6. Which pair could they be?",
    options: [
        { text: "12 and 18", correct: true, feedback: "Factors of 12: 1,2,3,4,6,12. 18: 1,2,3,6,9,18. HCF=6." },
        { text: "12 and 24", correct: false, feedback: "HCF of 12 and 24 is 12, not 6.", misconceptionId: "E-d15-a" },
        { text: "18 and 27", correct: false, feedback: "HCF is 9.", misconceptionId: "E-d15-b" },
        { text: "6 and 9", correct: false, feedback: "HCF is 3.", misconceptionId: "E-d15-c" }
      ],
    backward: "Check the HCF of each pair by listing common factors.",
    forward: "This logic is used to solve problems with equal groups.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student picks 12 and 24, whose actual HCF is 12 (since 12 divides 24 exactly).",
        rootCause: "Smaller-Number-Assumed-HCF — the student assumed 6 (half of 12) sounded reasonable without actually computing that 12 itself divides 24, making 12 the true HCF.",
        remediation: "Always compute the HCF of a candidate pair explicitly (via factor lists or prime factorisation) rather than estimating from the numbers' size."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student picks 18 and 27, whose actual HCF is 9, not 6.",
        rootCause: "Common-Factor Overreach — 6 is a factor of neither 18 nor 27 individually in the way assumed; the student likely spotted 18=6×3 without checking 27÷6, which is not exact.",
        remediation: "Test the specific candidate (6) by dividing both numbers by it directly: 27 ÷ 6 is not a whole number, ruling it out immediately."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student picks 6 and 9, whose actual HCF is 3, not 6.",
        rootCause: "Number-Present-Assumed-HCF — because 6 is one of the two numbers in the pair, the student assumed it must also be the HCF, without checking common factors with 9.",
        remediation: "Clarify that the HCF can only be as large as the SMALLER of the two numbers, but must still be verified to divide both — here 6 does not divide 9."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the HCF test", hint: "For a pair to have HCF 6, the number 6 must divide both numbers exactly, and no larger number should divide both." },
      { level: 2, description: "Test 6 as a divisor first", hint: "Check whether 6 divides both numbers in each pair." },
      { level: 3, description: "Confirm no larger common factor exists", hint: "For the pair that passes, list all common factors to confirm 6 truly is the highest." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-01",
    question: "Which number is divisible by 4?",
    options: [
        { text: "312", correct: true, feedback: "Last two digits = 12, which is divisible by 4." },
        { text: "313", correct: false, feedback: "Last two digits 13, not divisible by 4.", misconceptionId: "E-d16-a" },
        { text: "314", correct: false, feedback: "Last two digits 14, not divisible by 4.", misconceptionId: "E-d16-b" },
        { text: "315", correct: false, feedback: "Last two digits 15, not divisible by 4.", misconceptionId: "E-d16-c" }
      ],
    backward: "If the last two digits form a number divisible by 4, the whole number is.",
    forward: "Divisibility by 4 helps when working with leap years.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student picks 313, whose last two digits (13) are not divisible by 4.",
        rootCause: "Whole-Number Division Attempt — the student may have tried to judge divisibility from the whole number's \"feel\" rather than isolating and testing the last two digits.",
        remediation: "Teach the shortcut explicitly: only the number formed by the last two digits needs to be checked against the 4-times table."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks 314, whose last two digits (14) are not divisible by 4.",
        rootCause: "Even-Number Confusion — the student may have confused divisibility by 2 (even last digit, which 314 satisfies) with the stricter rule for divisibility by 4.",
        remediation: "Contrast the two rules directly: \"even\" is enough for divisibility by 2, but divisibility by 4 needs the last TWO digits to form a multiple of 4."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks 315, whose last two digits (15) are not divisible by 4 (and the number is odd).",
        rootCause: "Rule Confusion — the student may have applied a different divisibility rule (like digit sum, used for 3 or 9) instead of the last-two-digits rule for 4.",
        remediation: "Practice isolating just the tens and units digits before testing, to keep the rule for 4 separate from digit-sum rules."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule for 4", hint: "A number is divisible by 4 if its last two digits form a number divisible by 4." },
      { level: 2, description: "Isolate the last two digits", hint: "Look only at the tens and units digits of each option." },
      { level: 3, description: "Test against the 4-times table", hint: "Check whether 12, 13, 14, and 15 are each divisible by 4 — only 12 is." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "√81 = ?",
    options: [
        { text: "9", correct: true, feedback: "9 × 9 = 81, so √81 = 9." },
        { text: "8", correct: false, feedback: "8² = 64, not 81.", misconceptionId: "E-d17-a" },
        { text: "10", correct: false, feedback: "10² = 100.", misconceptionId: "E-d17-b" },
        { text: "7", correct: false, feedback: "7² = 49.", misconceptionId: "E-d17-c" }
      ],
    backward: "The square root of a number is the value that, when squared, gives the number.",
    forward: "Square roots are the inverse of squares.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 8 — one less than the correct root, since 8²=64, not 81.",
        rootCause: "Off-by-One Root Estimate — the student estimated the root without checking it precisely, landing one integer too low.",
        remediation: "Have the student verify by squaring their answer back: if 8²≠81, the estimate must be adjusted up or down until it matches exactly."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 10 — one more than the correct root, since 10²=100, not 81.",
        rootCause: "Off-by-One Root Estimate — the student overestimated the root, landing one integer too high.",
        remediation: "Same fix: square the candidate answer to check it lands exactly on 81 before finalising."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 7 — since 7²=49, well below 81, this is a memorised square fact confused with a different number.",
        rootCause: "Square-Fact Table Mix-Up — the student recalled a different memorised square (49) and attached it to the wrong root.",
        remediation: "Build a quick reference of squares 1² through 12² and have the student scan it methodically rather than recalling from memory under pressure."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a square root means", hint: "√81 asks: what number, multiplied by itself, gives 81?" },
      { level: 2, description: "Test nearby whole numbers", hint: "Try squaring 8, 9, and 10 to see which lands exactly on 81." },
      { level: 3, description: "Confirm the match", hint: "9 × 9 = 81 exactly, so √81 = 9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-03",
    question: "1, 3, 6, 10, 15, ___ — what is the next term?",
    options: [
        { text: "21", correct: true, feedback: "Differences: +2, +3, +4, +5, so next +6 → 21." },
        { text: "20", correct: false, feedback: "Adding 5 would be 20, but the increase is +6 now.", misconceptionId: "E-d18-a" },
        { text: "22", correct: false, feedback: "Does not follow the triangular number pattern.", misconceptionId: "E-d18-b" },
        { text: "18", correct: false, feedback: "Adding 3 is too small.", misconceptionId: "E-d18-c" }
      ],
    backward: "These are triangular numbers. Look at how much each term increases.",
    forward: "Triangular numbers appear in many visual patterns.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 20 — repeats the PREVIOUS increment (+5) instead of the next one in the growing sequence of differences.",
        rootCause: "Static-Difference Assumption — the student noticed the most recent gap (+5) but didn't realise the gaps themselves are increasing by 1 each time.",
        remediation: "Have the student list every difference in a row (2,3,4,5) and notice the differences themselves form their own +1 pattern before predicting the next one (+6)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 22 — does not match the triangular-number pattern at all.",
        rootCause: "Guess Without Rule Verification — a plausible nearby number was chosen without deriving it from the actual difference-of-differences rule.",
        remediation: "Require the student to compute the specific next difference (+6) and add it to 15, rather than estimating an answer."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 18 — adds only 3, an increment from earlier in the sequence, not the current required increment of 6.",
        rootCause: "Wrong-Increment Recall — the student picked up an increment value (+3) from an earlier step in the sequence instead of tracking which increment applies next.",
        remediation: "Have the student label each increment with the step number it belongs to (term 2→3 uses +2, term 3→4 uses +3, etc.) so the correct next increment (+6) is clear."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the differences between terms", hint: "Compute 3−1, 6−3, 10−6, 15−10." },
      { level: 2, description: "Notice the pattern in the differences", hint: "The differences are 2, 3, 4, 5 — each one is one more than the last." },
      { level: 3, description: "Apply the next difference", hint: "The next difference should be 6. Add it to 15: 15+6=21." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "Which statement is true?",
    options: [
        { text: "2 is the only even prime number.", correct: true, feedback: "Every other even number has at least 1, itself, and 2 as factors." },
        { text: "1 is a prime number.", correct: false, feedback: "1 has only one factor (1), so it is neither prime nor composite.", misconceptionId: "E-d19-a" },
        { text: "All prime numbers are odd.", correct: false, feedback: "2 is an even prime.", misconceptionId: "E-d19-b" },
        { text: "9 is a prime number.", correct: false, feedback: "9 = 3 × 3, so it is composite.", misconceptionId: "E-d19-c" }
      ],
    backward: "A prime number has exactly two distinct factors: 1 and itself.",
    forward: "Understanding primes is crucial in cryptography.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student selects \"1 is a prime number\" as the true statement.",
        rootCause: "Trivial-Case Miscategorisation — 1 only has one factor (itself), so it fails the \"exactly two distinct factors\" definition of prime, but students often assume the smallest number in a list must be prime.",
        remediation: "Directly test the definition on 1: it has only one factor, not two, so it is excluded from being prime by definition, and is also excluded from being composite."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student selects \"All prime numbers are odd\" as the true statement.",
        rootCause: "Overgeneralisation from Pattern — most small primes the student has memorised (3,5,7,11...) are odd, so the pattern was overgeneralised without checking the single exception, 2.",
        remediation: "Explicitly test the counterexample: 2 has exactly two factors (1 and 2), so it IS prime, disproving the \"all primes are odd\" claim."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student selects \"9 is a prime number\" as the true statement.",
        rootCause: "Odd-Number-Looks-Prime Bias — 9 is odd and not obviously composite at a glance, so the student assumed primality without testing divisibility by 3.",
        remediation: "Have the student test small divisors (starting with 3) on any odd number before calling it prime; 9÷3=3 exactly disqualifies it."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition of prime", hint: "A prime number has exactly two distinct factors: 1 and itself." },
      { level: 2, description: "Test each statement against the definition", hint: "Check 1, 9, and the claim about all primes being odd against the definition of prime." },
      { level: 3, description: "Identify the one true statement", hint: "2 has exactly two factors (1 and 2) and is even — it is the only even prime, making that statement true." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "Find the smallest number that is a multiple of both 3 and 8.",
    options: [
        { text: "24", correct: true, feedback: "LCM of 3 and 8 = 24." },
        { text: "12", correct: false, feedback: "12 is a multiple of 3 but not of 8.", misconceptionId: "E-d20-a" },
        { text: "48", correct: false, feedback: "48 is a common multiple, but 24 is smaller.", misconceptionId: "E-d20-b" },
        { text: "16", correct: false, feedback: "16 is a multiple of 8 but not of 3.", misconceptionId: "E-d20-c" }
      ],
    backward: "Find the LCM: the smallest number that is in both multiplication tables.",
    forward: "LCM is used to find common denominators.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student answers 12 — a multiple of 3, but 8 does not divide 12.",
        rootCause: "Single-List Check Only — the student verified 12 is a multiple of 3 and stopped, without checking it's also a multiple of 8.",
        remediation: "Require checking a candidate against BOTH numbers' multiplication tables before accepting it as a common multiple."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student answers 48 — a genuine common multiple of 3 and 8, but not the smallest one.",
        rootCause: "Least-vs-Common Confusion — the student found a valid common multiple (perhaps by doubling 24, or from a longer multiples list) without checking for a smaller one first.",
        remediation: "List multiples of both numbers in increasing order and stop at the FIRST shared value, rather than any later match."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student answers 16 — a multiple of 8, but 3 does not divide 16.",
        rootCause: "Single-List Check Only — the student verified 16 is a multiple of 8 and stopped, without checking it's also a multiple of 3.",
        remediation: "Same fix: cross-check every candidate against both original numbers, not just one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each number", hint: "Write out multiples of 3 and multiples of 8." },
      { level: 2, description: "Find the first shared value", hint: "Scan both lists for the smallest number appearing in both." },
      { level: 3, description: "Confirm the LCM", hint: "3,6,9,12,15,18,21,24... and 8,16,24... — 24 is the first common value." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-01",
    question: "What is the HCF of two consecutive numbers?",
    options: [
        { text: "1", correct: true, feedback: "Consecutive numbers share no common factor greater than 1." },
        { text: "2", correct: false, feedback: "Consecutive numbers cannot both be even.", misconceptionId: "E-d21-a" },
        { text: "The larger number", correct: false, feedback: "The larger number cannot divide the smaller one exactly.", misconceptionId: "E-d21-b" },
        { text: "0", correct: false, feedback: "HCF cannot be 0.", misconceptionId: "E-d21-c" }
      ],
    backward: "Try examples: 8 and 9 — HCF 1; 14 and 15 — HCF 1.",
    forward: "Consecutive numbers are always co-prime.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 2, assuming consecutive numbers always share the factor 2.",
        rootCause: "Parity Overgeneralisation — the student may have tested only one pair of consecutive numbers where doubling coincidentally seemed to fit, without recognising that consecutive integers always differ in parity (one odd, one even), so they can never both be divisible by 2.",
        remediation: "Test the claim on a specific pair, like 8 and 9: 9 is odd, so 2 cannot be a common factor — generalise from there."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers \"the larger number,\" assuming it always divides the smaller one.",
        rootCause: "Divisor-Direction Confusion — the student assumed the larger number could be a factor of the smaller, when in fact a factor must be less than or equal to the number it divides.",
        remediation: "Directly test with an example: does 9 divide 8 exactly? No — a number can never be a proper factor of a smaller number."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 0, perhaps thinking of it as the \"difference\" between two consecutive numbers.",
        rootCause: "Difference-HCF Conflation — the student may have confused the arithmetic difference between consecutive numbers (which is 1, not 0) or misunderstood that HCF must be a positive divisor, never 0.",
        remediation: "Clarify that HCF is always a positive whole number that divides both numbers, and by definition can never be 0."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Try a specific example", hint: "List the factors of 8 and 9. What do they have in common?" },
      { level: 2, description: "Generalise", hint: "Any two consecutive numbers differ by exactly 1 — could any number greater than 1 divide both?" },
      { level: 3, description: "Conclude", hint: "Since only 1 divides both numbers in every consecutive pair, the HCF is always 1." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-02",
    question: "If a number is divisible by 9, which of the following must also be true?",
    options: [
        { text: "It is also divisible by 3.", correct: true, feedback: "Any multiple of 9 has a digit sum divisible by 9, hence also divisible by 3." },
        { text: "It is even.", correct: false, feedback: "9 is odd, so not all multiples of 9 are even.", misconceptionId: "E-d22-a" },
        { text: "It ends in 9.", correct: false, feedback: "Not all multiples of 9 end in 9 (e.g., 18, 27).", misconceptionId: "E-d22-b" },
        { text: "It is divisible by 6.", correct: false, feedback: "9 is not necessarily even, so may not be divisible by 2.", misconceptionId: "E-d22-c" }
      ],
    backward: "Divisibility by 9 implies the digit sum is a multiple of 9, which is also a multiple of 3.",
    forward: "This relationship helps in simplifying fractions quickly.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student selects \"It is even\" as something that must be true.",
        rootCause: "Even-Divisor Overgeneralisation — the student assumed all divisibility facts imply evenness, not recognising that 9 itself is odd, so its multiples alternate between even and odd (e.g. 9, 27 are odd; 18, 36 are even).",
        remediation: "Provide a counterexample directly: 9 × 1 = 9, which is divisible by 9 but is odd — this alone disproves the claim."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student selects \"It ends in 9\" as something that must be true.",
        rootCause: "Surface-Pattern Overgeneralisation — the student noticed 9 and 9× itself both \"end in 9\" for the first multiple and wrongly generalised this as a rule for all multiples.",
        remediation: "List several multiples of 9 (9,18,27,36,45...) and show the last digit cycles through many different values, not just 9."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student selects \"It is divisible by 6\" as something that must be true.",
        rootCause: "Divisor-Chain Overreach — the student assumed divisibility by a larger number (9) implies divisibility by any related smaller number (6), without checking that 6 = 2×3 requires evenness, which 9's multiples don't guarantee.",
        remediation: "Test with a specific counterexample: 27 is divisible by 9 but not by 6 (27÷6 is not exact) since 27 is odd."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what divisibility by 9 guarantees", hint: "If the digit sum of a number is a multiple of 9, the number is divisible by 9." },
      { level: 2, description: "Connect to divisibility by 3", hint: "A multiple of 9 is automatically a multiple of 3, since 9 itself is 3×3." },
      { level: 3, description: "Rule out the other claims", hint: "Test a specific multiple of 9, like 27, against \"even,\" \"ends in 9,\" and \"divisible by 6\" — none of these hold for 27." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-01",
    question: "What is the square of 12?",
    options: [
        { text: "144", correct: true, feedback: "12 × 12 = 144." },
        { text: "124", correct: false, feedback: "Recompute: 12 × 12, not 12 × 10 + 4.", misconceptionId: "E-d23-a" },
        { text: "142", correct: false, feedback: "Miscalculated.", misconceptionId: "E-d23-b" },
        { text: "164", correct: false, feedback: "Miscalculated.", misconceptionId: "E-d23-c" }
      ],
    backward: "12 × 12 = 144.",
    forward: "Squares of larger numbers build mental maths.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 124 — as if computing 12×10+4 rather than 12×12.",
        rootCause: "Partial-Multiplication Slip — the student began a split-multiplication strategy (12×10) but added the ones digit (4, from 12) instead of completing 12×2 and adding that.",
        remediation: "Model the split method fully: 12×12 = 12×10 + 12×2 = 120 + 24 = 144, making sure the second part is a full multiplication, not just a digit."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 142 — a value close to but not equal to the correct 144.",
        rootCause: "Arithmetic Slip in Multi-Digit Multiplication — a computational error occurred while carrying out 12×12, likely in adding partial products.",
        remediation: "Have the student redo the multiplication using the standard column method and check each partial product before summing."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 164 — a value further from the correct 144, suggesting a larger computational error.",
        rootCause: "Arithmetic Slip in Multi-Digit Multiplication — an error in one of the partial products (e.g. 12×2 computed as 20 instead of 24, or a carrying mistake) inflated the total.",
        remediation: "Break the multiplication into 12×12 = (10+2)×12 = 120+24, verifying each partial product separately before adding."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what squaring means", hint: "12² means 12 multiplied by itself." },
      { level: 2, description: "Split the multiplication", hint: "12 × 12 = 12 × 10 + 12 × 2." },
      { level: 3, description: "Add the partial products", hint: "120 + 24 = 144." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-01",
    question: "5, 10, 15, 20, … This pattern shows:",
    options: [
        { text: "Multiples of 5", correct: true, feedback: "Each term is 5 times the position: 5×1, 5×2, 5×3, 5×4, …" },
        { text: "Powers of 5", correct: false, feedback: "Powers of 5 would be 5, 25, 125, …", misconceptionId: "E-d24-a" },
        { text: "Odd numbers", correct: false, feedback: "Odd numbers are 1,3,5,…; this pattern has even numbers too.", misconceptionId: "E-d24-b" },
        { text: "Square numbers", correct: false, feedback: "Square numbers are 1,4,9,16,…", misconceptionId: "E-d24-c" }
      ],
    backward: "The difference is constant: 5 each time. It's the 5 times table.",
    forward: "Identifying patterns helps in generalising rules.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student selects \"Powers of 5\" to describe 5, 10, 15, 20.",
        rootCause: "Terminology Mix-Up — the student confused \"multiple\" (repeated addition/multiplication by a constant) with \"power\" (repeated multiplication of the number by itself), likely because both terms involve the number 5.",
        remediation: "Contrast the two directly side by side: multiples of 5 are 5,10,15,20 (adding 5 each time); powers of 5 are 5,25,125 (multiplying by 5 each time)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student selects \"Odd numbers\" to describe 5, 10, 15, 20.",
        rootCause: "Partial-List Bias — the student may have focused only on the first term (5, which is odd) without checking that 10 and 20 in the list are even.",
        remediation: "Check every term in the list against the proposed rule, not just the first one — 10 is even, immediately ruling out \"all odd.\""
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student selects \"Square numbers\" to describe 5, 10, 15, 20.",
        rootCause: "Category Mix-Up — the student may have generally associated \"patterns with a rule\" with square numbers without testing whether 5, 10, 15, or 20 are actually squares of any whole number.",
        remediation: "Test each term against the square-number list (1,4,9,16,25...) to show none of 5, 10, 15, 20 appear there."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the constant difference", hint: "Each term is 5 more than the one before it." },
      { level: 2, description: "Connect to multiplication", hint: "5=5×1, 10=5×2, 15=5×3, 20=5×4 — these are all multiples of 5." },
      { level: 3, description: "Rule out other categories", hint: "Check against odd numbers, squares, and powers of 5 — none of those lists match 5,10,15,20 exactly." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-03",
    question: "How many factors does 30 have?",
    options: [
        { text: "8", correct: true, feedback: "Factors: 1,2,3,5,6,10,15,30 — 8 factors." },
        { text: "7", correct: false, feedback: "Missed one; check the factor pairs again.", misconceptionId: "E-r1-a" },
        { text: "9", correct: false, feedback: "Overcounted.", misconceptionId: "E-r1-b" },
        { text: "6", correct: false, feedback: "Missed at least two factors.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers 7 — one factor short of the correct count of 8.",
        rootCause: "Incomplete Pair Search — one factor pair (such as 3×10 or 5×6) was missed while systematically searching.",
        remediation: "Test every integer from 1 up to the square root of 30 (up to 5) in order, pairing each divisor with its complement."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers 9 — one more than the correct count of 8.",
        rootCause: "Duplicate Counting — a factor was likely listed twice (for example, counting both members of a pair separately in a way that double-counted one value).",
        remediation: "Write the final factor list in increasing order once, then count the entries — this prevents any value being tallied twice."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers 6 — two factors short of the correct count of 8.",
        rootCause: "Incomplete Pair Search — the search for factor pairs stopped early, missing two of the five pairs (1×30, 2×15, 3×10, 5×6).",
        remediation: "List all factor pairs systematically starting from 1×30, testing every integer in order up to the square root of 30."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List factor pairs systematically", hint: "Start from 1×30 and test each integer in order." },
      { level: 2, description: "Stop at the square root", hint: "You only need to test up to about 5 or 6 (since 5×6=30)." },
      { level: 3, description: "Count all distinct factors", hint: "1,2,3,5,6,10,15,30 — that's 8 factors total." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-01",
    question: "What is the 8th multiple of 6?",
    options: [
        { text: "48", correct: true, feedback: "6 × 8 = 48." },
        { text: "42", correct: false, feedback: "7th multiple.", misconceptionId: "E-r2-a" },
        { text: "54", correct: false, feedback: "9th multiple.", misconceptionId: "E-r2-b" },
        { text: "40", correct: false, feedback: "Not a multiple of 6.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student answers 42 — the 7th multiple of 6, one position too early.",
        rootCause: "Off-by-One Position Error — the student stopped counting one position short of the 8th term.",
        remediation: "Number each multiple as it's generated so the position and value stay paired up to the target position."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 54 — the 9th multiple of 6, one position too late.",
        rootCause: "Off-by-One Position Error — the student overshot by one position past the 8th term.",
        remediation: "Same fix: track the position number explicitly while skip-counting."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 40 — not a multiple of 6 at all.",
        rootCause: "Nearby-Round-Number Substitution — an estimated round number was given instead of computing 6×8 exactly.",
        remediation: "Require the exact multiplication fact 6×8 to be written and computed, not estimated."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the meaning of \"nth multiple\"", hint: "The 8th multiple of 6 is 6 multiplied by 8." },
      { level: 2, description: "Set up the multiplication", hint: "Write 6 × 8." },
      { level: 3, description: "Compute and check", hint: "6 × 8 = 48." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Find the HCF of 18 and 27.",
    options: [
        { text: "9", correct: true, feedback: "18=2×3², 27=3³ — HCF=3²=9." },
        { text: "3", correct: false, feedback: "3 is common but 9 is larger.", misconceptionId: "E-r3-a" },
        { text: "6", correct: false, feedback: "6 is not a factor of 27.", misconceptionId: "E-r3-b" },
        { text: "18", correct: false, feedback: "18 is not a factor of 27.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 3 — a common factor of 18 and 27, but not the highest one.",
        rootCause: "Lowest-Power Under-Extraction — the student took only 3¹ instead of comparing exponents fully (18 has 3², 27 has 3³), missing that the common lowest power is 3².",
        remediation: "For each common prime, compare the exponents in both factorisations directly and take the smaller one, rather than picking any shared prime."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 6 — a factor of 18, but 27 is not divisible by 6.",
        rootCause: "Single-Number Factor Check — the student verified 6 divides 18 but didn't check that 27÷6 is not exact (27 is odd, 6 is even).",
        remediation: "Insist on testing any HCF candidate against BOTH original numbers before accepting it."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 18 — assuming the smaller original number is automatically the HCF.",
        rootCause: "Self-Factor Assumption — the student didn't check whether 18 actually divides 27 (27÷18 is not exact).",
        remediation: "Verify any candidate HCF by dividing both original numbers by it and confirming both come out exact."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime-factorise both numbers", hint: "18 = 2×3² and 27 = 3³." },
      { level: 2, description: "Find the common prime and its lowest power", hint: "Both share the prime 3. The lowest power present in either is 3² (from 18)." },
      { level: 3, description: "State the HCF", hint: "HCF = 3² = 9." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-02",
    question: "Which number is divisible by 6? (Recall: must be even and digit sum divisible by 3.)",
    options: [
        { text: "312", correct: true, feedback: "Even, digit sum 6 — divisible by 3. So divisible by 6." },
        { text: "321", correct: false, feedback: "Not even.", misconceptionId: "E-r4-a" },
        { text: "313", correct: false, feedback: "Not even.", misconceptionId: "E-r4-b" },
        { text: "314", correct: false, feedback: "Digit sum 8, not multiple of 3.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student picks 321 — its digit sum (6) is divisible by 3, but the number itself is odd.",
        rootCause: "Single-Rule Application — the student checked only the digit-sum rule for 3 and skipped verifying the number is even.",
        remediation: "Require both conditions (even AND digit sum divisible by 3) to be checked and confirmed before selecting an answer for divisibility by 6."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student picks 313 — neither even nor has a digit sum divisible by 3.",
        rootCause: "No-Rule-Applied Guess — the student selected an option without testing either condition required for divisibility by 6.",
        remediation: "Walk through both checks explicitly for every option: is it even? is the digit sum a multiple of 3?"
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student picks 314 — it is even, but its digit sum (8) is not divisible by 3.",
        rootCause: "Single-Rule Application — the student checked only that the number is even and skipped the digit-sum test for 3.",
        remediation: "Reinforce that BOTH conditions are required for divisibility by 6, not just evenness."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall both required conditions", hint: "Divisible by 6 means divisible by both 2 (even) and 3 (digit sum divisible by 3)." },
      { level: 2, description: "Check evenness first", hint: "Rule out any option that is odd." },
      { level: 3, description: "Check the digit sum of what remains", hint: "Among the even options, find the one whose digit sum is also a multiple of 3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "√64 = ?",
    options: [
        { text: "8", correct: true, feedback: "8 × 8 = 64." },
        { text: "6", correct: false, feedback: "6² = 36.", misconceptionId: "E-r5-a" },
        { text: "7", correct: false, feedback: "7² = 49.", misconceptionId: "E-r5-b" },
        { text: "9", correct: false, feedback: "9² = 81.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student answers 6, whose square (36) is well below 64.",
        rootCause: "Square-Fact Table Mix-Up — a different memorised square was recalled and mistakenly attached to 64.",
        remediation: "Build and use a reference table of squares 1² through 12² and scan it methodically rather than recalling from memory under pressure."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student answers 7 — one less than the correct root, since 7²=49, not 64.",
        rootCause: "Off-by-One Root Estimate — the student estimated the root without precisely checking it, landing one integer too low.",
        remediation: "Verify by squaring the answer back: if the result doesn't match 64 exactly, adjust up or down until it does."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student answers 9 — one more than the correct root, since 9²=81, not 64.",
        rootCause: "Off-by-One Root Estimate — the student overestimated the root, landing one integer too high.",
        remediation: "Same fix: square the candidate answer and check it matches 64 exactly before finalising."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a square root means", hint: "√64 asks: what number, multiplied by itself, gives 64?" },
      { level: 2, description: "Test nearby whole numbers", hint: "Try squaring 7, 8, and 9." },
      { level: 3, description: "Confirm the match", hint: "8 × 8 = 64 exactly, so √64 = 8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-01",
    question: "2, 6, 10, 14, ___ — next term?",
    options: [
        { text: "18", correct: true, feedback: "Add 4 each time: 14+4=18." },
        { text: "16", correct: false, feedback: "Adding 2 would be 16, but the difference is 4.", misconceptionId: "E-r6-a" },
        { text: "20", correct: false, feedback: "Adding 6 would be 20.", misconceptionId: "E-r6-b" },
        { text: "17", correct: false, feedback: "Not following the pattern.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 16 — adds only 2 to the last term instead of 4.",
        rootCause: "Difference Miscount (Undershoot) — the student misjudged the constant difference as 2 instead of 4.",
        remediation: "Have the student subtract consecutive terms (6−2, 10−6, 14−10) to confirm the constant difference before extending."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 20 — adds 6 to the last term instead of 4.",
        rootCause: "Difference Miscount (Overshoot) — the student overestimated the constant difference as 6.",
        remediation: "Same fix: verify the difference between each consecutive pair of given terms before extending the pattern."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 17 — does not match adding any consistent difference to 14.",
        rootCause: "Guess Without Rule Verification — a plausible-looking number was chosen without computing the actual constant difference first.",
        remediation: "Require the difference to be computed explicitly from the given terms before predicting the next one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the pattern rule", hint: "Look at how each term changes from the one before it." },
      { level: 2, description: "Check the difference is constant", hint: "6−2=4, 10−6=4, 14−10=4. The pattern adds 4 each time." },
      { level: 3, description: "Apply the rule", hint: "Add 4 to the last given term: 14+4=18." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "Which of these is a prime number?",
    options: [
        { text: "23", correct: true, feedback: "23 has only factors 1 and 23." },
        { text: "21", correct: false, feedback: "21 = 3 × 7.", misconceptionId: "E-r7-a" },
        { text: "27", correct: false, feedback: "27 = 3 × 9.", misconceptionId: "E-r7-b" },
        { text: "33", correct: false, feedback: "33 = 3 × 11.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student picks 21, believing it is prime.",
        rootCause: "Odd-Number-Looks-Prime Bias — 21 is odd and doesn't end in an obviously composite digit, so the student assumed primality without testing divisibility by 3 or 7.",
        remediation: "Test small divisors systematically (2,3,5,7...) before declaring any odd number prime; the digit sum of 21 (2+1=3) flags divisibility by 3 immediately."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student picks 27, believing it is prime.",
        rootCause: "Odd-Number-Looks-Prime Bias — 27 is odd, and the student didn't check the digit sum (2+7=9), which flags divisibility by 3.",
        remediation: "Same fix: always check the digit-sum rule for 3 as a first quick test before assuming an odd number is prime."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student picks 33, believing it is prime.",
        rootCause: "Odd-Number-Looks-Prime Bias — 33 is odd, and the student didn't test divisibility by 3 (digit sum 3+3=6) or 11.",
        remediation: "Reinforce testing every prime divisor up to the square root of the number (here, up to about 5-6) before concluding primality."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition of prime", hint: "A prime number has exactly two factors: 1 and itself." },
      { level: 2, description: "Test small divisors on each option", hint: "Check each number for divisibility by 3, 7, and 11." },
      { level: 3, description: "Identify the one with no other factors", hint: "21, 27, and 33 are all divisible by 3; only 23 has no factors besides 1 and itself." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "Find the LCM of 4 and 10.",
    options: [
        { text: "20", correct: true, feedback: "Multiples of 10: 10,20,… 20 is also a multiple of 4." },
        { text: "40", correct: false, feedback: "Common multiple but not least.", misconceptionId: "E-r8-a" },
        { text: "10", correct: false, feedback: "10 is not a multiple of 4.", misconceptionId: "E-r8-b" },
        { text: "4", correct: false, feedback: "4 is not a multiple of 10.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student answers 40 — a common multiple of 4 and 10 (their product), but not the least one.",
        rootCause: "Least-vs-Common Confusion — the student multiplied the two numbers together instead of checking for a smaller common multiple first.",
        remediation: "List multiples of both numbers in increasing order and stop at the FIRST shared value, rather than defaulting to the product."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student answers 10 — but 4 does not divide 10 evenly.",
        rootCause: "Single-List Check Only — the student verified 10 is a multiple of 10 (trivially true) without checking it's also a multiple of 4.",
        remediation: "Cross-check any candidate against both original numbers' multiplication tables before accepting it."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student answers 4 — but 10 does not divide 4 evenly.",
        rootCause: "Single-List Check Only — the student verified 4 is a multiple of 4, without checking it's also a multiple of 10.",
        remediation: "Same fix: always check the candidate against both numbers, not just one."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each number", hint: "Write multiples of 4 and multiples of 10." },
      { level: 2, description: "Find the first shared value", hint: "Scan both lists for the smallest common number." },
      { level: 3, description: "Confirm the LCM", hint: "4,8,12,16,20... and 10,20... — 20 is the first common value." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Find the HCF of 16 and 24.",
    options: [
        { text: "8", correct: true, feedback: "16=2⁴, 24=2³×3 — HCF=2³=8." },
        { text: "4", correct: false, feedback: "4 is common, but 8 is larger.", misconceptionId: "E-r9-a" },
        { text: "12", correct: false, feedback: "12 is not a factor of 16.", misconceptionId: "E-r9-b" },
        { text: "6", correct: false, feedback: "6 is not a factor of 16.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student answers 4 — a common factor of 16 and 24, but not the highest one.",
        rootCause: "Lowest-Power Under-Extraction — the student took 2² instead of comparing exponents fully (16 has 2⁴, 24 has 2³), missing that the common lowest power is 2³.",
        remediation: "Compare the exponents of the common prime (2) in both factorisations directly and take the smaller one (2³ here), not an arbitrary shared factor."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student answers 12 — a factor of 24, but 16 is not divisible by 12.",
        rootCause: "Single-Number Factor Check — the student verified 12 divides 24 but didn't check 16÷12, which is not exact.",
        remediation: "Insist on testing any HCF candidate against BOTH original numbers before accepting it."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student answers 6 — a factor of neither 16 nor cleanly related to it; 16÷6 is not exact.",
        rootCause: "Single-Number Factor Check — the student may have verified 6 relates to 24 (24÷6=4) without checking 16÷6, which is not exact.",
        remediation: "Same fix: always confirm the candidate divides both original numbers exactly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime-factorise both numbers", hint: "16 = 2⁴ and 24 = 2³×3." },
      { level: 2, description: "Find the common prime and its lowest power", hint: "Both share the prime 2. The lowest power present in either is 2³ (from 24)." },
      { level: 3, description: "State the HCF", hint: "HCF = 2³ = 8." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-01",
    question: "Which number is divisible by 5 but NOT by 2?",
    options: [
        { text: "135", correct: true, feedback: "Ends in 5, so divisible by 5; odd, so not by 2." },
        { text: "130", correct: false, feedback: "Ends in 0, so divisible by both 2 and 5.", misconceptionId: "E-r10-a" },
        { text: "142", correct: false, feedback: "Ends in 2, so divisible by 2 but not 5.", misconceptionId: "E-r10-b" },
        { text: "158", correct: false, feedback: "Ends in 8, divisible by 2 but not 5.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks 130 — divisible by 5, but also divisible by 2, failing the \"not by 2\" condition.",
        rootCause: "Partial-Condition Check — the student confirmed divisibility by 5 (ends in 0) but overlooked that the question also requires the number to NOT be divisible by 2.",
        remediation: "Require every condition in a compound question to be checked separately: first confirm divisibility by 5, then separately confirm the number is odd."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks 142 — divisible by 2, but not divisible by 5 at all.",
        rootCause: "Rule Confusion — the student may have applied the divisibility-by-2 rule (even last digit) while intending to check for divisibility by 5, mixing up the two rules.",
        remediation: "Keep the two rules visually distinct: divisible by 5 means the last digit is 0 or 5; divisible by 2 means the last digit is even — check them one at a time."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks 158 — divisible by 2, but not divisible by 5 at all.",
        rootCause: "Rule Confusion — same as above, the even-last-digit rule was checked instead of the ends-in-0-or-5 rule for 5.",
        remediation: "Same fix: separately test the last digit against \"0 or 5\" (for divisibility by 5) before checking evenness."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall both rules", hint: "Divisible by 5 means the number ends in 0 or 5. Divisible by 2 means it's even." },
      { level: 2, description: "Apply the first condition", hint: "Find which options end in 0 or 5." },
      { level: 3, description: "Apply the second condition to what remains", hint: "Among those, find the one that is odd (not divisible by 2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "The square of which number is 121?",
    options: [
        { text: "11", correct: true, feedback: "11 × 11 = 121." },
        { text: "10", correct: false, feedback: "10² = 100.", misconceptionId: "E-r11-a" },
        { text: "12", correct: false, feedback: "12² = 144.", misconceptionId: "E-r11-b" },
        { text: "9", correct: false, feedback: "9² = 81.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 10 — one less than the correct root, since 10²=100, not 121.",
        rootCause: "Off-by-One Root Estimate — the student estimated the root without checking precisely, landing one integer too low.",
        remediation: "Verify by squaring the candidate answer back; if it doesn't match 121 exactly, adjust up or down until it does."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 12 — one more than the correct root, since 12²=144, not 121.",
        rootCause: "Off-by-One Root Estimate — the student overestimated the root, landing one integer too high.",
        remediation: "Same fix: square the candidate answer and check it matches 121 exactly before finalising."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 9 — since 9²=81, well below 121, this is a memorised square fact confused with a different number.",
        rootCause: "Square-Fact Table Mix-Up — a different memorised square was recalled and mistakenly attached to 121.",
        remediation: "Use a reference table of squares 1² through 12² and scan it methodically rather than relying on memory under pressure."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what \"square of a number\" means", hint: "We need a number that, multiplied by itself, gives 121." },
      { level: 2, description: "Test nearby whole numbers", hint: "Try squaring 10, 11, and 12." },
      { level: 3, description: "Confirm the match", hint: "11 × 11 = 121 exactly." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-01",
    question: "1, 4, 7, 10, ___ — next term?",
    options: [
        { text: "13", correct: true, feedback: "Add 3 each time: 10+3=13." },
        { text: "12", correct: false, feedback: "Adding 2 would be 12.", misconceptionId: "E-r12-a" },
        { text: "14", correct: false, feedback: "Adding 4 would be 14.", misconceptionId: "E-r12-b" },
        { text: "15", correct: false, feedback: "Adding 5 would be 15.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers 12 — adds only 2 to the last term instead of 3.",
        rootCause: "Difference Miscount (Undershoot) — the student misjudged the constant difference as 2 instead of 3.",
        remediation: "Have the student subtract consecutive terms (4−1, 7−4, 10−7) to confirm the constant difference before extending."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers 14 — adds 4 to the last term instead of 3.",
        rootCause: "Difference Miscount (Overshoot) — the student overestimated the constant difference as 4.",
        remediation: "Same fix: verify the difference between each consecutive pair of given terms before extending the pattern."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers 15 — adds 5 to the last term instead of 3.",
        rootCause: "Difference Miscount (Overshoot) — the student overestimated the constant difference as 5, possibly confusing it with a different sequence.",
        remediation: "Reinforce computing the difference directly from the given terms (7−4=3, 10−7=3) rather than guessing."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the pattern rule", hint: "Look at how each term changes from the one before it." },
      { level: 2, description: "Check the difference is constant", hint: "4−1=3, 7−4=3, 10−7=3. The pattern adds 3 each time." },
      { level: 3, description: "Apply the rule", hint: "Add 3 to the last given term: 10+3=13." }
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
    title: "Factors, Multiples & Number Properties — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Factors, prime factorisation, multiples, LCM, HCF, divisibility rules, square numbers, and number patterns — single-step retrieval questions.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review</strong><br>' +
      "&bull; Factors: numbers that divide exactly. List in pairs.<br>" +
      "&bull; Prime factorisation: break a number into prime factors using a factor tree.<br>" +
      "&bull; Multiples: skip counting. LCM = smallest common multiple.<br>" +
      "&bull; HCF: highest common factor from factor lists or prime factors.<br>" +
      "&bull; Divisibility rules: 2 (last digit even), 3 (digit sum ÷ 3), 4 (last two digits ÷ 4), 5 (ends 0/5), 6 (divisible by 2 and 3), 9 (digit sum ÷ 9), 10 (ends 0).<br>" +
      "&bull; Square numbers: a number times itself. √ is the inverse.<br>" +
      "&bull; Patterns: constant difference, doubling, or square/triangular numbers.<br>",
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

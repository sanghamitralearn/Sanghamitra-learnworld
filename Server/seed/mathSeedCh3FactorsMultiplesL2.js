// seed/mathSeedCh3FactorsMultiplesL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 2 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-2.html.
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 2;

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
    skillId: "FACT-02",
    question: "Write the prime factorisation of 72.",
    options: [
        { text: "2³ × 3²", correct: true, feedback: "72 = 8×9 = 2³×3²." },
        { text: "2² × 3³", correct: false, feedback: "That's 4×27 = 108, not 72.", misconceptionId: "E-w1-a" },
        { text: "8 × 9", correct: false, feedback: "8 and 9 are not prime numbers; you must break them down further.", misconceptionId: "E-w1-b" },
        { text: "2⁶ × 3", correct: false, feedback: "2⁶=64, 64×3=192, not 72.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Break 72 into 8×9, then factor 8 (2³) and 9 (3²).",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student answers 2²×3³, swapping the exponents of 2 and 3.",
        rootCause: "Exponent Swap — the student correctly identifies that 2 and 3 are the prime factors and that the exponents are 3 and 2, but attaches them to the wrong base, giving 2² instead of 2³ and 3³ instead of 3².",
        remediation: "Have the student build the factor tree fully and count how many times EACH prime actually appears as a leaf, rather than recalling '3 and 2' as a pair of numbers detached from which base they belong to."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student answers 8×9, stopping at the first level of factoring.",
        rootCause: "Incomplete Factor Tree — 8 and 9 are correctly identified as a factor pair of 72, but the process stops there instead of continuing until every factor is prime.",
        remediation: "Remind the student that prime factorisation is only finished when every number in the product is itself prime — circle 8 and 9 and ask 'is this prime?' before stopping."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student answers 2⁶×3, over-counting the factors of 2.",
        rootCause: "Factor-Tree Miscount — likely double-counted a branch while building the factor tree (e.g. counting the 2 inside both 8 and part of 9's breakdown), inflating the exponent of 2 from 3 to 6.",
        remediation: "Have the student verify by multiplying their answer back out (2⁶×3 = 64×3 = 192) and compare to the original number (72) — a mismatch signals a miscount in the tree."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Split into a factor pair", hint: "72 = 8 × 9. Are 8 and 9 prime numbers?" },
      { level: 2, description: "Break each factor down further", hint: "8 = 2×2×2 = 2³. 9 = 3×3 = 3²." },
      { level: 3, description: "Combine", hint: "Multiply the prime factorisations of 8 and 9 together: 2³ × 3²." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FACT-04", probability: 0.6, condition: "If not remediated before factor-counting problems that rely on correct exponents." },
      { targetSkillId: "MULT-02", probability: 0.5, condition: "LCM/HCF via prime factorisation depends on getting exponents right first." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "Find the LCM of 6 and 8 using prime factorisation.",
    options: [
        { text: "24", correct: true, feedback: "6=2×3, 8=2³; LCM = 2³×3 = 24." },
        { text: "48", correct: false, feedback: "That's the product 6×8, not the LCM.", misconceptionId: "E-w2-a" },
        { text: "2", correct: false, feedback: "That's the HCF, not the LCM.", misconceptionId: "E-w2-b" },
        { text: "12", correct: false, feedback: "12 is a multiple of 6 but not of 8.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "For LCM, take the highest power of each prime: 2³ (from 8) and 3 (from 6).",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student answers 48, the plain product of 6 and 8.",
        rootCause: "Product-for-LCM Substitution — defaults to simply multiplying the two numbers together, which only equals the true LCM when the numbers are co-prime (share no common factors); 6 and 8 share a factor of 2, so the real LCM is smaller than the product.",
        remediation: "Show the relationship LCM × HCF = product explicitly: since HCF(6,8)=2, LCM = 48÷2 = 24, not 48 itself — multiplying alone overcounts the shared factor of 2."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student answers 2, the HCF of 6 and 8.",
        rootCause: "LCM/HCF Label Swap — correctly computes the highest common factor (2) but reports it as the answer to an LCM question, confusing which of the two related quantities was asked for.",
        remediation: "Anchor the two terms to their meaning every time: HCF is the biggest number that divides BOTH; LCM is the smallest number that BOTH divide into. Ask which direction the question points before answering."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student answers 12, a common multiple of 6 but not of 8.",
        rootCause: "Single-Number Multiple Check — checks that 12 is a multiple of 6 and stops, without verifying it's also a multiple of the second number (8); 12÷8 is not a whole number.",
        remediation: "Require the student to check EVERY given number divides the candidate evenly, not just the first one, before accepting a common multiple."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both numbers", hint: "6 = 2×3. 8 = 2×2×2 = 2³." },
      { level: 2, description: "Take the highest power of each prime", hint: "The prime 2 appears as 2¹ in 6 and 2³ in 8 — take the higher power, 2³. The prime 3 appears only in 6, as 3¹." },
      { level: 3, description: "Multiply the highest powers", hint: "LCM = 2³ × 3 = 8 × 3 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-05", probability: 0.6, condition: "LCM word problems (e.g. bells ringing together) rely on this skill directly." },
      { targetSkillId: "FRA-01", probability: 0.5, condition: "Finding a common denominator for unlike fractions is the same LCM skill applied to fraction denominators." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Find the HCF of 48 and 60 using prime factorisation.",
    options: [
        { text: "12", correct: true, feedback: "48=2⁴×3, 60=2²×3×5; HCF = 2²×3 = 12." },
        { text: "6", correct: false, feedback: "6 is common, but 12 is larger and also common.", misconceptionId: "E-w3-a" },
        { text: "24", correct: false, feedback: "24 is a factor of 48 but not of 60.", misconceptionId: "E-w3-b" },
        { text: "240", correct: false, feedback: "That's the LCM, not the HCF.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "For HCF, take the lowest power of each common prime: 2² (not 2⁴) and 3.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student answers 6, a common factor but not the highest one.",
        rootCause: "Premature Stop — finds a valid common factor (6 = 2×3) and stops searching, without checking whether a higher power of a shared prime is also common to both.",
        remediation: "Insist on taking the LOWEST power of EACH prime that appears in both factorisations, not just any common combination — for 2, that means comparing 2⁴ (in 48) against 2² (in 60) and taking the smaller exponent, 2²."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student answers 24, a factor of 48 but not of 60.",
        rootCause: "Single-Number Factor Check — verifies the candidate divides 48 and stops, without checking it also divides 60; 60÷24 is not a whole number.",
        remediation: "Require an explicit divisibility check against BOTH numbers before accepting any HCF candidate, not just the first one."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student answers 240, the LCM of 48 and 60.",
        rootCause: "LCM/HCF Label Swap — takes the HIGHEST power of each prime (2⁴, 3, 5) instead of the lowest, computing the LCM (240) when the HCF was asked for.",
        remediation: "Say the rule as a contrasting pair every time: HCF takes the LOWEST shared power (the floor both numbers share); LCM takes the HIGHEST power needed (the ceiling that covers both)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise both numbers", hint: "48 = 2⁴×3. 60 = 2²×3×5." },
      { level: 2, description: "Find the shared primes", hint: "Both numbers share the primes 2 and 3 (5 only appears in 60, so it's excluded)." },
      { level: 3, description: "Take the lowest power of each shared prime", hint: "For 2: lowest of 2⁴ and 2² is 2². For 3: lowest of 3¹ and 3¹ is 3¹. Multiply: 2²×3 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-02", probability: 0.5, condition: "Simplifying fractions to lowest terms uses HCF of numerator and denominator directly." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-02",
    question: "Find the smallest digit □ so that the number 5□4 is divisible by 3.",
    options: [
        { text: "0", correct: true, feedback: "Digit sum = 5+0+4 = 9, divisible by 3." },
        { text: "1", correct: false, feedback: "Sum = 10, not a multiple of 3.", misconceptionId: "E-w4-a" },
        { text: "2", correct: false, feedback: "Sum = 11.", misconceptionId: "E-w4-b" },
        { text: "4", correct: false, feedback: "Sum = 13.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "The digit sum 5+□+4 = 9+□ must be a multiple of 3. Smallest □ is 0.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student answers 1, giving a digit sum of 10.",
        rootCause: "Smallest-Digit Guess Without Verification — picks the smallest digit that ISN'T zero, assuming zero doesn't count as a valid 'digit' to place, without actually testing whether zero satisfies the divisibility condition.",
        remediation: "Remind the student that 0 is a perfectly valid digit to place in a blank square, and it must be tested first when searching for the smallest valid digit."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student answers 2, giving a digit sum of 11.",
        rootCause: "Untested Guess — picks a plausible-looking small digit without actually computing the resulting digit sum and checking it against the divisibility-by-3 rule.",
        remediation: "Have the student compute the digit sum for EVERY candidate digit from 0 upward, in order, and check each one against 'is this a multiple of 3?' before settling on an answer."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student answers 4, giving a digit sum of 13.",
        rootCause: "Untested Guess — similarly guesses a digit without checking the resulting sum (13) is not a multiple of 3.",
        remediation: "Build a quick table: digit 0→sum9, 1→sum10, 2→sum11, 3→sum12, 4→sum13... and circle which sums are multiples of 3, rather than testing digits one at a time from memory."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the digit-sum expression", hint: "The digits are 5, □, and 4. Their sum is 5+□+4 = 9+□." },
      { level: 2, description: "Test digits from smallest", hint: "Starting at □=0, compute 9+□ and check: is it a multiple of 3?" },
      { level: 3, description: "Confirm and stop at the first success", hint: "9+0=9, which is divisible by 3. Since 0 is the smallest possible digit, you can stop here." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIVR-04", probability: 0.55, condition: "Combined-rule divisibility puzzles build directly on single-rule digit searches like this one." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-02",
    question: "√? = 15. Find the number.",
    options: [
        { text: "225", correct: true, feedback: "15² = 15 × 15 = 225." },
        { text: "30", correct: false, feedback: "That's 2×15, not 15².", misconceptionId: "E-w5-a" },
        { text: "150", correct: false, feedback: "That's 10×15.", misconceptionId: "E-w5-b" },
        { text: "125", correct: false, feedback: "Incorrect square.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Square root asks: what number multiplied by itself gives the number? 15² = 225.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student answers 30, doubling 15 instead of squaring it.",
        rootCause: "Doubling-for-Squaring Substitution — confuses 'squaring' (multiplying a number by itself) with 'doubling' (multiplying by 2), a common mix-up since both involve the number appearing twice in some sense.",
        remediation: "Say the definition explicitly every time: squaring means the number times ITSELF, not times 2. Write 15×15, not 15×2, before computing."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student answers 150, computing 15×10 instead of 15×15.",
        rootCause: "Round-Number Substitution — multiplies by a familiar round number (10) instead of the number itself, possibly from habitually multiplying by 10 in other contexts.",
        remediation: "Have the student write out 15×15 as a full multiplication (e.g. using the standard algorithm or 15×15 = 15×10 + 15×5 = 150+75) rather than substituting a different, easier-to-multiply number."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student answers 125, an arithmetic slip in computing 15×15.",
        rootCause: "Multiplication Slip — attempts to square 15 correctly but makes an arithmetic error partway through (125 is 25 short of the correct 225, consistent with only adding one partial product instead of two: 15×10=150 and 15×5=75, but perhaps only using 15×5 twice or dropping a partial product).",
        remediation: "Break the multiplication into parts explicitly: 15×15 = 15×(10+5) = 15×10 + 15×5 = 150+75, and add both partial products together, checking each one before combining."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Translate the question", hint: "'√? = 15' means: what number, when you take its square root, gives 15? That number is 15²." },
      { level: 2, description: "Set up the multiplication", hint: "15² means 15 × 15, not 15 × 2 or 15 × 10." },
      { level: 3, description: "Compute using parts", hint: "15×15 = 15×10 + 15×5 = 150 + 75 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "SQNUM-04", probability: 0.4, condition: "Square-root-of-a-product problems assume fluent squaring in the reverse direction." }
    ],
    learningObjectives: []
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-04",
    question: "1, 1, 2, 3, 5, 8, ___ — what comes next?",
    options: [
        { text: "13", correct: true, feedback: "Fibonacci: each term is the sum of the previous two. 5+8 = 13." },
        { text: "11", correct: false, feedback: "Adding 3 to 8 gives 11, but that's not the rule.", misconceptionId: "E-w6-a" },
        { text: "10", correct: false, feedback: "No, check the pattern again.", misconceptionId: "E-w6-b" },
        { text: "12", correct: false, feedback: "8+4=12, but the rule is adding the previous term.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Look at pairs: 1+1=2, 1+2=3, 2+3=5, 3+5=8, so 5+8 = ?",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student answers 11, adding a constant difference (3) to the last term.",
        rootCause: "Constant-Difference Default — treats the sequence as a simple arithmetic pattern (add the same amount each time) using the most recent difference (8-5=3) as that constant, missing that the actual rule involves BOTH previous terms, not a fixed gap.",
        remediation: "Have the student check the differences between consecutive terms (1,1,2,3): since they are NOT constant (1,1,1,2,3 — the gaps themselves are growing), rule out simple addition and look for a two-term rule instead."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student answers 10, without a clear consistent rule.",
        rootCause: "Guess Without Rule Verification — proposes a plausible-looking next number without testing it against the pattern established by the earlier terms.",
        remediation: "Require the student to state the rule in words first ('each term equals the sum of the two before it') and verify it against at least three consecutive pairs before applying it to find the next term."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student answers 12, adding 4 to the last term.",
        rootCause: "Constant-Difference Default (different constant) — similarly assumes a fixed addition amount, this time guessing 4, without deriving it from an actual examination of the sequence's true two-term summing rule.",
        remediation: "Have the student explicitly write out the sum for each term: 1+1=2, 1+2=3, 2+3=5, 3+5=8, then apply the same operation (sum of previous two) to get 5+8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Look at two terms at a time", hint: "Check: does 1+1=2? Does 1+2=3? Does 2+3=5? Does 3+5=8?" },
      { level: 2, description: "State the rule", hint: "Each term is the SUM of the two terms right before it." },
      { level: 3, description: "Apply the rule", hint: "The last two terms are 5 and 8. What is 5+8?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-03",
    question: "How many distinct prime factors does 100 have?",
    options: [
        { text: "2", correct: true, feedback: "100 = 2² × 5². Distinct primes: 2 and 5. So 2 distinct primes." },
        { text: "4", correct: false, feedback: "You counted the total exponents, not distinct primes.", misconceptionId: "E-w7-a" },
        { text: "1", correct: false, feedback: "100 has more than one prime factor.", misconceptionId: "E-w7-b" },
        { text: "3", correct: false, feedback: "Only 2 and 5 appear.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Prime factorise: 100=2²×5². List the unique primes: {2,5}.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student answers 4, adding the exponents (2+2) instead of counting distinct prime bases.",
        rootCause: "Exponent-Sum Confusion — conflates 'how many distinct primes' with 'how many total prime factors when repeats are counted' (2×2×5×5 has 4 factors total), rather than counting only the different prime VALUES that appear.",
        remediation: "Have the student underline each different prime BASE once in the factorisation 2²×5² (just '2' and '5'), ignoring the exponents entirely, then count the underlines."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student answers 1, likely fixating on only one of the two primes.",
        rootCause: "Incomplete Factorisation Scan — either didn't fully factorise 100 or only noticed one of the two distinct primes (2 or 5) present in 2²×5².",
        remediation: "Have the student write out the full prime factorisation first (100 = 2×2×5×5) before answering, so both distinct primes are visibly present."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student answers 3, over-counting the distinct primes.",
        rootCause: "Phantom Prime — likely introduces an extra prime that isn't actually part of 100's factorisation (e.g. mistakenly including 10, which is not prime, as if it were a separate prime factor).",
        remediation: "Have the student check each number they've listed against a known list of primes (2,3,5,7,11...) and confirm every one of them individually divides 100 with no remainder."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise fully", hint: "100 = 2×2×5×5 = 2²×5²." },
      { level: 2, description: "Identify which primes appear", hint: "Ignoring how many times each appears, which prime NUMBERS show up in the factorisation?" },
      { level: 3, description: "Count the distinct ones", hint: "2 and 5 are different primes. How many different primes is that in total?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FACT-04", probability: 0.4, condition: "Factor-counting formulas require correctly separating distinct primes from their exponents." }
    ],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-03",
    question: "The LCM of 9 and another number is 36. The other number is between 1 and 10. Find it.",
    options: [
        { text: "4", correct: true, feedback: "LCM(9,4) = 36. 9=3², 4=2²; LCM = 2²×3² = 36." },
        { text: "6", correct: false, feedback: "LCM(9,6) = 18, not 36.", misconceptionId: "E-w8-a" },
        { text: "12", correct: false, feedback: "12 is not between 1 and 10.", misconceptionId: "E-w8-b" },
        { text: "2", correct: false, feedback: "LCM(9,2) = 18.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Test each option: which number gives LCM=36 with 9? 9=3², 36=2²×3², so the number must provide 2².",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student answers 6, without checking that LCM(9,6) actually equals 36.",
        rootCause: "Untested Candidate — picks a number that 'feels' related to both 9 and 36 (6 divides 36, and is somewhat close to 9) without actually computing LCM(9,6), which comes out to 18, not 36.",
        remediation: "Require the student to actually compute the LCM for each candidate they consider (prime factorise both numbers, take the highest powers) rather than picking by feel."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student answers 12, which does satisfy LCM(9,12)=36 but violates the range constraint.",
        rootCause: "Constraint Neglect — correctly finds a number that produces the right LCM but doesn't check it against the OTHER stated condition (between 1 and 10), missing that 12 is outside that range.",
        remediation: "List every condition in the question before searching for candidates, and check each one found against the FULL list, not just the LCM condition."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student answers 2, without checking that LCM(9,2) actually equals 36.",
        rootCause: "Untested Candidate — similarly picks a plausible small number without computing LCM(9,2), which is actually 18, not 36.",
        remediation: "Work backward systematically: since 9=3² and the target LCM is 36=2²×3², the missing number must supply the 2² that 9 lacks — test which numbers between 1 and 10 equal or contain 2²=4 as a factor."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the prime factorisations", hint: "9 = 3². The target LCM, 36, = 2²×3². What's missing from 9 that the LCM needs?" },
      { level: 2, description: "Identify what the missing number must supply", hint: "The other number must contribute the 2² that 9 doesn't have — so it must be divisible by 4." },
      { level: 3, description: "Test candidates in range", hint: "Which number between 1 and 10 has 2² as a factor and makes LCM(9, that number) = 36 exactly?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "MULT-02", probability: 0.4, condition: "Reverse LCM problems build on being able to compute LCM forward first." }
    ],
    learningObjectives: []
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "A number has prime factorisation 2ᵃ × 3² × 5. It has exactly 12 factors. Find a.",
    options: [
        { text: "1", correct: true, feedback: "Number of factors = (a+1)(2+1)(1+1) = (a+1)×3×2 = 6(a+1). Set =12 → a+1=2 → a=1." },
        { text: "2", correct: false, feedback: "If a=2, factors = (3)×3×2 = 18, not 12.", misconceptionId: "E-d1-a" },
        { text: "0", correct: false, feedback: "If a=0, factors = (1)×3×2 = 6.", misconceptionId: "E-d1-b" },
        { text: "3", correct: false, feedback: "a=3 gives (4)×3×2 = 24.", misconceptionId: "E-d1-c" }
      ],
    backward: "Formula: (exponent+1) multiplied across all primes gives total factor count.",
    forward: "Factor counting is used in combinatorics and number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student answers a=2, one too high.",
        rootCause: "Formula Misapplication — likely sets (a+1)=3 directly (matching the coincidental appearance of 3 elsewhere in the problem) rather than correctly solving 6(a+1)=12 for a+1=2.",
        remediation: "Have the student isolate the unknown factor step by step: 6(a+1)=12, so (a+1)=12÷6=2, so a=2-1=1 — write out each algebraic step rather than jumping to a value."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student answers a=0, treating the exponent of 2 as absent entirely.",
        rootCause: "Off-By-One in the Formula — forgets that even an exponent of 0 still contributes a factor of (0+1)=1 to the product, and separately miscounts what value of a makes the total equal 12, landing on 0 instead of solving the equation properly.",
        remediation: "Plug a=0 back into the formula explicitly: (0+1)×3×2 = 1×3×2 = 6, and compare to the required 12 — showing the mismatch makes clear a=0 is too low."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student answers a=3, one too high in the other direction.",
        rootCause: "Guess-and-Check Without Full Verification — tries a plausible value without solving the equation 6(a+1)=12 algebraically, and doesn't verify by plugging a=3 back in (which gives 24 factors, not 12).",
        remediation: "Set up and solve the equation directly: (a+1)×3×2=12 → (a+1)=2 → a=1, then verify by substituting a=1 back into the original formula to confirm it gives exactly 12."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the factor-count formula", hint: "For 2ᵃ×3²×5¹, the total factor count is (a+1)(2+1)(1+1)." },
      { level: 2, description: "Simplify the known parts", hint: "(2+1)(1+1) = 3×2 = 6. So the formula becomes 6×(a+1)." },
      { level: 3, description: "Solve for a", hint: "6×(a+1) = 12. Divide both sides by 6: (a+1) = 2. What is a?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-01", probability: 0.4, condition: "Solving for an unknown exponent given a total is early algebraic reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "Two numbers have product 180 and LCM 60. What is their HCF?",
    options: [
        { text: "3", correct: true, feedback: "Product = HCF × LCM → 180 = HCF × 60 → HCF = 180 ÷ 60 = 3." },
        { text: "6", correct: false, feedback: "6×60 = 360, not 180.", misconceptionId: "E-d2-a" },
        { text: "30", correct: false, feedback: "30×60 = 1800.", misconceptionId: "E-d2-b" },
        { text: "60", correct: false, feedback: "60×60 = 3600.", misconceptionId: "E-d2-c" }
      ],
    backward: "Remember: product of two numbers = HCF × LCM.",
    forward: "This relationship is a fundamental number-theory identity.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student answers 6, roughly double the correct HCF of 3.",
        rootCause: "Division Slip — attempts 180÷60 but makes an arithmetic error, or divides by a wrong intermediate value, landing on 6 instead of the correct 3.",
        remediation: "Have the student verify by multiplying back: does HCF × LCM = product? 6×60=360≠180, so 6 must be wrong — always check the answer against the original relationship."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student answers 30, half of the LCM.",
        rootCause: "Wrong Operation Chosen — instead of dividing the product by the LCM, halves the LCM (60÷2=30) or performs some other unrelated operation not derived from the product=HCF×LCM formula.",
        remediation: "Write the formula explicitly first — product = HCF × LCM — then rearrange it to HCF = product ÷ LCM before doing any arithmetic, so the correct operation (division of product by LCM) is locked in."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student answers 60, confusing HCF with the given LCM.",
        rootCause: "HCF/LCM Label Confusion — simply restates one of the two given numbers (the LCM, 60) as the answer instead of computing the HCF from the formula.",
        remediation: "Underline which value the question actually asks for (HCF) versus which values are GIVEN (product and LCM), then apply the formula rather than repeating a given number."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "For any two numbers, product = HCF × LCM." },
      { level: 2, description: "Substitute the known values", hint: "180 = HCF × 60." },
      { level: 3, description: "Solve for HCF", hint: "Divide both sides by 60: HCF = 180 ÷ 60 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-01", probability: 0.3, condition: "This identity is a useful shortcut check when working with fraction simplification and common denominators." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-03",
    question: "The HCF of two numbers is 9. Their sum is 63 and their difference is 9. Find the larger number.",
    options: [
        { text: "36", correct: true, feedback: "Let numbers = 9a,9b. a+b=7, a-b=1 → a=4,b=3. Numbers 36,27; larger = 36." },
        { text: "27", correct: false, feedback: "That's the smaller number.", misconceptionId: "E-d3-a" },
        { text: "45", correct: false, feedback: "45+18=63, but difference 27, not 9.", misconceptionId: "E-d3-b" },
        { text: "18", correct: false, feedback: "18+? =63, difference not 9.", misconceptionId: "E-d3-c" }
      ],
    backward: "Represent numbers as HCF × co-prime factors, then use sum/difference to find the factors.",
    forward: "Leads to solving linear equations in two variables.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student answers 27, correctly finding the pair but reporting the smaller number.",
        rootCause: "Wrong Number Selected — solves the system correctly and finds both numbers (36 and 27) but reports the smaller one instead of the larger one the question actually asked for.",
        remediation: "Have the student explicitly label which of their two found numbers is larger before answering, since the question specifically asks for 'the larger number.'"
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student answers 45, which doesn't actually satisfy the stated difference condition.",
        rootCause: "Sum-Only Verification — finds a pair that adds to 63 (45+18) without checking that the DIFFERENCE also equals the required 9; 45-18=27, not 9.",
        remediation: "After finding any candidate pair, check BOTH the sum condition and the difference condition explicitly — a pair satisfying only one of the two given clues is not a valid answer."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student answers 18, another value that doesn't satisfy both conditions together.",
        rootCause: "Incomplete System Solving — attempts to find a pair summing to 63 without setting up and solving the actual system of equations (a+b=7, a-b=1) that the HCF representation requires.",
        remediation: "Represent both numbers as 9a and 9b (since their HCF is 9), turning the problem into a+b=7 and a-b=1 — a clean system of two equations to solve for a and b directly, rather than guessing pairs that sum to 63."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the HCF", hint: "Since the HCF is 9, write the two numbers as 9a and 9b, where a and b share no common factor." },
      { level: 2, description: "Set up the equations", hint: "9a+9b=63 → a+b=7. 9a-9b=9 → a-b=1." },
      { level: 3, description: "Solve and identify the larger", hint: "Adding the two equations: 2a=8, so a=4, and b=3. The numbers are 9×4=36 and 9×3=27 — which is larger?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-02", probability: 0.5, condition: "Solving simultaneous linear equations is the direct next step from this sum/difference reasoning." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-04",
    question: "Find the smallest digit □ so that 4,□32 is divisible by both 3 and 4.",
    options: [
        { text: "0", correct: true, feedback: "Last two digits 32 → divisible by 4. Digit sum 4+□+3+2 = 9+□ must be multiple of 3. Smallest □=0." },
        { text: "3", correct: false, feedback: "3 works (sum 12), but 0 is smaller.", misconceptionId: "E-d4-a" },
        { text: "2", correct: false, feedback: "Sum = 11, not multiple of 3.", misconceptionId: "E-d4-b" },
        { text: "1", correct: false, feedback: "Sum = 10, not multiple of 3.", misconceptionId: "E-d4-c" }
      ],
    backward: "Apply each divisibility rule separately, then find the smallest digit that satisfies both.",
    forward: "Combining rules is common in puzzle and Olympiad problems.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student answers 3, a digit that does satisfy both rules but isn't the smallest one that does.",
        rootCause: "First-Valid-Answer Stopping — finds a digit that satisfies both divisibility conditions and stops searching, without checking whether a smaller digit (like 0) also works.",
        remediation: "Always test candidate digits starting from 0 and moving upward, and stop at the FIRST one that works — don't stop at an arbitrary starting point and accept the first success found from there."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student answers 2, without checking the digit-sum condition.",
        rootCause: "Single-Rule Application — checks only the divisibility-by-4 rule (which is automatically satisfied since it depends only on the fixed last two digits, '32') and picks a digit without also checking the divisibility-by-3 digit-sum condition.",
        remediation: "List both rules explicitly before testing digits: rule 1 (last two digits divisible by 4) is already satisfied for ANY □ here since it doesn't involve □; rule 2 (digit sum divisible by 3) is the one that actually constrains □."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student answers 1, without checking the digit-sum condition.",
        rootCause: "Single-Rule Application — similarly picks a digit without verifying the digit-sum-divisible-by-3 condition; digit sum 9+1=10 is not a multiple of 3.",
        remediation: "Compute the digit sum 9+□ for each candidate digit explicitly and check it against the 'multiple of 3' rule before accepting any answer."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check which rule actually constrains □", hint: "Divisibility by 4 depends only on the last two digits, '32' — that's fixed and doesn't involve □ at all. So which rule actually limits your choice of □?" },
      { level: 2, description: "Apply the digit-sum rule", hint: "Digit sum = 4+□+3+2 = 9+□. This must be a multiple of 3." },
      { level: 3, description: "Test from the smallest digit up", hint: "Try □=0 first: is 9+0=9 a multiple of 3? If yes, you're done — 0 is already the smallest possible digit." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "DIVR-06", probability: 0.45, condition: "Multi-condition 'smallest number' searches recur throughout number-theory puzzles." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-03",
    question: "Which of these is a perfect square?",
    options: [
        { text: "2⁴ × 5²", correct: true, feedback: "All exponents (4,2) are even, so it's a perfect square." },
        { text: "2² × 3³", correct: false, feedback: "Exponent of 3 is 3 (odd), not a perfect square.", misconceptionId: "E-d5-a" },
        { text: "2³ × 3²", correct: false, feedback: "Exponent of 2 is 3 (odd).", misconceptionId: "E-d5-b" },
        { text: "2² × 3 × 5", correct: false, feedback: "Exponents of 3 and 5 are 1 (odd).", misconceptionId: "E-d5-c" }
      ],
    backward: "In prime factorisation, every exponent must be even for the number to be a perfect square.",
    forward: "Connects squares to prime factors; used when simplifying radicals.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student picks 2²×3³, checking only the exponent of 2 (which is even) and not the exponent of 3.",
        rootCause: "Partial Exponent Check — verifies that ONE exponent (2² has an even exponent) is even and concludes the whole number is a perfect square, without checking every prime's exponent individually.",
        remediation: "Require the student to check EVERY exponent in the factorisation, one at a time, and only conclude 'perfect square' if ALL of them are even — a single odd exponent disqualifies the whole number."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student picks 2³×3², checking only the exponent of 3 (which is even) and not the exponent of 2.",
        rootCause: "Partial Exponent Check — similarly verifies only one prime's exponent (3² is even) and overlooks that 2³ has an odd exponent, which disqualifies the number.",
        remediation: "Underline every exponent in the expression before making a judgment, and only proceed once each one has been individually confirmed even."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student picks 2²×3×5, correctly checking 2² but missing that 3 and 5 have an implicit exponent of 1.",
        rootCause: "Implicit-Exponent Blindness — a prime written without a visible exponent (like '3' or '5') actually has an exponent of 1, which is odd; the student may not recognise this and skip checking it as if it weren't a factor with an exponent at all.",
        remediation: "Rewrite every prime factor with its exponent explicitly shown, even when it's 1 (so '3' becomes '3¹'), so no factor's odd exponent goes unnoticed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "A number is a perfect square exactly when EVERY exponent in its prime factorisation is even." },
      { level: 2, description: "Check each exponent individually", hint: "For each option, write out every prime's exponent (including implicit 1's) and check: is it even?" },
      { level: 3, description: "Confirm all exponents pass", hint: "Only the option where ALL exponents are even qualifies — even one odd exponent disqualifies it." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "SQNUM-04", probability: 0.35, condition: "Simplifying square roots relies on recognising which factors form perfect-square pairs." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-05",
    question: "Find the next term: 2, 5, 11, 23, 47, ___",
    options: [
        { text: "95", correct: true, feedback: "Rule: ×2 + 1. 47×2 = 94; 94+1 = 95." },
        { text: "94", correct: false, feedback: "You only doubled 47, forgot to add 1.", misconceptionId: "E-d6-a" },
        { text: "96", correct: false, feedback: "47×2 + 2 = 96, not the rule.", misconceptionId: "E-d6-b" },
        { text: "70", correct: false, feedback: "Not following the ×2+1 pattern.", misconceptionId: "E-d6-c" }
      ],
    backward: "Check the step: 2×2+1=5, 5×2+1=11, 11×2+1=23. So multiply by 2 then add 1.",
    forward: "Two-step rules prepare for functions and algebraic expressions.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student answers 94, applying only the doubling step and forgetting the +1.",
        rootCause: "Incomplete Two-Step Rule — correctly identifies that the pattern involves doubling but drops the second step (add 1), applying only half of the two-part rule.",
        remediation: "Have the student verify the FULL rule against multiple existing terms before applying it: 2×2+1=5 ✓, 5×2+1=11 ✓ — both steps (×2 AND +1) are needed every time, not just the first."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student answers 96, adding 2 instead of 1 after doubling.",
        rootCause: "Wrong Constant Added — correctly doubles but adds the wrong constant (2 instead of 1), possibly guessing rather than deriving the exact constant from the earlier terms.",
        remediation: "Derive the added constant directly from an early term: 2×2=4, and the next term is 5, so 5-4=1 — that confirms the constant to add is 1, not a guessed value."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student answers 70, not following the ×2+1 rule at all.",
        rootCause: "No Consistent Rule Applied — proposes a term without deriving or testing any rule against the given sequence.",
        remediation: "Before guessing the next term, explicitly test a hypothesis rule against at least three consecutive term-pairs in the sequence, confirming it holds every time before applying it once more."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test a doubling-based rule", hint: "Check: is each term roughly double the one before it? 2→5, 5→11, 11→23..." },
      { level: 2, description: "Find the exact rule", hint: "2×2=4, but the next term is 5. What do you need to add to 4 to get 5?" },
      { level: 3, description: "Apply the confirmed rule", hint: "The rule is ×2 then +1. Apply it to 47: 47×2 = ?, then add 1." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-03", probability: 0.4, condition: "Two-step recursive rules are a direct precursor to writing algebraic function rules." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-02",
    question: "A number between 40 and 50 is divisible by 7 but not by 2. What is its prime factorisation?",
    options: [
        { text: "7²", correct: true, feedback: "Numbers in range: 41-49. Divisible by 7: 42 (even, excluded), 49 (odd, 7²)." },
        { text: "2 × 23", correct: false, feedback: "46 is in range and even, but the condition says not divisible by 2.", misconceptionId: "E-d7-a" },
        { text: "2 × 3 × 7", correct: false, feedback: "42 is in range but even.", misconceptionId: "E-d7-b" },
        { text: "7", correct: false, feedback: "7 is not between 40 and 50.", misconceptionId: "E-d7-c" }
      ],
    backward: "List numbers in the range, filter by the conditions, then prime factorise.",
    forward: "Descriptive problems build logical filtering and number sense.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student picks 2×23 (46), a number in range but violating the 'not divisible by 2' condition.",
        rootCause: "Range-Only Filtering — picks a number that falls in the numeric range (40-50) without checking it against BOTH stated conditions (divisible by 7, and not divisible by 2); 46 fails both checks (not divisible by 7, and is even).",
        remediation: "List every condition first, then filter numbers in the range against ALL of them together, not just the range itself."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student picks 2×3×7 (42), which is divisible by 7 but also by 2.",
        rootCause: "Partial Condition Check — correctly finds a number divisible by 7 within the range but doesn't check the second condition (not divisible by 2); 42 is even, so it should be excluded.",
        remediation: "After finding numbers divisible by 7 in the range, explicitly test each one against the SECOND condition (odd/even) before finalising — don't stop checking after the first condition passes."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student picks 7 itself, ignoring the range condition entirely.",
        rootCause: "Range Condition Neglect — focuses on the divisibility conditions (divisible by 7, not by 2 — both true of 7 itself) while completely disregarding the 'between 40 and 50' requirement.",
        remediation: "Apply the range condition FIRST to narrow down the candidate list (only 41-49 qualify), then apply the divisibility conditions within that narrowed list."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the range", hint: "Numbers strictly between 40 and 50 are 41 through 49." },
      { level: 2, description: "Filter by divisibility by 7", hint: "Which numbers in that list are multiples of 7? (7×6=42, 7×7=49)" },
      { level: 3, description: "Apply the 'not divisible by 2' condition", hint: "Between 42 and 49, which one is odd (not divisible by 2)? Prime-factorise that one." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Two bells ring every 15 minutes and 25 minutes. They ring together at 12 noon. When will they next ring together?",
    options: [
        { text: "1:15 PM", correct: true, feedback: "LCM(15,25) = 75 minutes. 12:00 + 75 min = 1:15 PM." },
        { text: "12:40 PM", correct: false, feedback: "That's 40 minutes, not a common multiple.", misconceptionId: "E-d8-a" },
        { text: "1:00 PM", correct: false, feedback: "60 minutes, not a multiple of 25.", misconceptionId: "E-d8-b" },
        { text: "12:50 PM", correct: false, feedback: "50 minutes, not a multiple of 15.", misconceptionId: "E-d8-c" }
      ],
    backward: "Find the LCM of the two intervals to know when they coincide again.",
    forward: "Scheduling and rhythm problems use LCM regularly.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student answers 12:40 PM, adding the two intervals together (15+25=40) instead of finding their LCM.",
        rootCause: "Sum-Instead-of-LCM Substitution — adds the two ring intervals together to get 40 minutes, treating 'when do they next align' as a simple addition rather than finding the smallest time that is a multiple of BOTH intervals.",
        remediation: "Clarify with a timeline: bell A rings at 15,30,45,60,75... and bell B rings at 25,50,75... The next time BOTH ring is the first number appearing in both lists — the LCM, not the sum."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student answers 1:00 PM, using 60 minutes (a round, familiar interval) instead of the actual LCM.",
        rootCause: "Round-Number Substitution — defaults to a familiar time interval (60 minutes = 1 hour) rather than computing the true least common multiple of 15 and 25.",
        remediation: "List actual multiples of both 15 and 25 side by side and find the first number that appears in both lists, rather than assuming a 'round' answer like 60 minutes."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student answers 12:50 PM, using a multiple of 25 that is not a multiple of 15.",
        rootCause: "Single-Number Multiple Check — verifies the candidate time (50 minutes) is a multiple of one interval (25) and stops, without checking it's also a multiple of the other (15); 50÷15 is not a whole number.",
        remediation: "Require the student to check the candidate against BOTH intervals before accepting it as the answer, not just one of them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each interval", hint: "Bell A (every 15 min): 15,30,45,60,75... Bell B (every 25 min): 25,50,75..." },
      { level: 2, description: "Find the first shared multiple", hint: "Which number appears in both lists first? That's the LCM of 15 and 25." },
      { level: 3, description: "Convert to a clock time", hint: "75 minutes = 1 hour 15 minutes. Add that to 12:00 noon." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Find the largest number that divides 56, 98, and 126 exactly.",
    options: [
        { text: "14", correct: true, feedback: "56=2³×7, 98=2×7², 126=2×3²×7; HCF = 2×7 = 14." },
        { text: "7", correct: false, feedback: "7 is a divisor, but 14 is larger and also divides all.", misconceptionId: "E-d9-a" },
        { text: "28", correct: false, feedback: "28 does not divide 98 (98÷28=3.5).", misconceptionId: "E-d9-b" },
        { text: "2", correct: false, feedback: "2 divides all, but 14 is larger.", misconceptionId: "E-d9-c" }
      ],
    backward: "The greatest common divisor is the HCF of the three numbers.",
    forward: "Used to simplify ratios and fractions with multiple numbers.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student answers 7, a valid common divisor but not the largest one.",
        rootCause: "Premature Stop — finds a number (7) that divides all three given numbers and stops, without checking whether a larger common divisor (14 = 2×7) also works.",
        remediation: "After finding one common factor, always check whether combining it with other shared primes gives an even larger common divisor, comparing against the full prime factorisations of all three numbers."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student answers 28, which divides two of the numbers but not the third.",
        rootCause: "Incomplete Divisor Check — verifies the candidate divides some of the given numbers (e.g. 56=28×2, 126=28×4.5 which is wrong too, or another partial subset) without checking it against EVERY number in the set; 98÷28=3.5 is not a whole number.",
        remediation: "Require an explicit divisibility check of the candidate against ALL THREE numbers, not just one or two of them, before accepting it as a common divisor."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student answers 2, a valid common divisor but far from the largest.",
        rootCause: "Premature Stop (extreme case) — finds the most obvious shared factor (2, since all three numbers are even) and stops immediately, without exploring whether other shared primes (like 7) push the HCF higher.",
        remediation: "Prime-factorise all three numbers fully first, then compare across ALL prime bases (not just the most obvious one) to find every shared prime and its lowest common power."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise all three numbers", hint: "56=2³×7. 98=2×7². 126=2×3²×7." },
      { level: 2, description: "Find primes common to all three", hint: "Which primes appear in ALL THREE factorisations? (Check 2, 3, and 7 individually.)" },
      { level: 3, description: "Take the lowest shared power of each", hint: "For 2: lowest power among 2³, 2¹, 2¹ is 2¹. For 7: lowest power among 7¹, 7², 7¹ is 7¹. Multiply these together." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-02", probability: 0.4, condition: "Simplifying a ratio of three or more quantities uses this same three-number HCF skill." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-04",
    question: "Find the digit □ so that 7□,345 is divisible by 9 and ends with 5.",
    options: [
        { text: "8", correct: true, feedback: "Digit sum = 7+□+3+4+5 = 19+□. Divisible by 9 → sum=27 → □=8. Already ends in 5." },
        { text: "0", correct: false, feedback: "Sum = 19, not multiple of 9.", misconceptionId: "E-d10-a" },
        { text: "1", correct: false, feedback: "Sum = 20.", misconceptionId: "E-d10-b" },
        { text: "2", correct: false, feedback: "Sum = 21.", misconceptionId: "E-d10-c" }
      ],
    backward: "Apply divisibility by 9 (digit sum multiple of 9) and by 5 (ends in 0 or 5).",
    forward: "Multiple constraints in one puzzle sharpen logical thinking.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student answers 0, without checking that the digit sum (19) is a multiple of 9.",
        rootCause: "Untested Digit — picks a plausible-looking digit (perhaps assuming smallest is always right, echoing habits from other 'smallest digit' problems) without actually computing the digit sum and checking it against the rule.",
        remediation: "Compute the digit sum for the chosen digit explicitly (19+0=19) and check: is 19 a multiple of 9? Since it isn't, this digit must be rejected regardless of any other assumption."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student answers 1, giving a digit sum of 20.",
        rootCause: "Untested Digit — similarly guesses without computing and checking the resulting digit sum (20) against the multiple-of-9 rule.",
        remediation: "Build a small table of digit sum values for each candidate 0-9 (19,20,21,...,28) and circle which ones are multiples of 9 before choosing."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student answers 2, giving a digit sum of 21.",
        rootCause: "Untested Digit — again guesses without verifying the digit sum (21) is a multiple of 9; 21÷9 is not a whole number.",
        remediation: "Find the nearest multiple of 9 that is at least 19 (the base sum without □): that's 27. Then solve 19+□=27 directly for □, rather than testing digits one at a time by guesswork."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Note the 'ends in 5' condition is already met", hint: "The number already ends in 5, so that condition doesn't constrain □ at all — focus on the divisible-by-9 condition." },
      { level: 2, description: "Set up the digit-sum equation", hint: "Digit sum = 7+□+3+4+5 = 19+□. This must be a multiple of 9." },
      { level: 3, description: "Find the target multiple of 9", hint: "The smallest multiple of 9 that is at least 19 is 27. Solve 19+□=27 for □." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-04",
    question: "√(16 × 25) = ?",
    options: [
        { text: "20", correct: true, feedback: "16×25 = 400; √400 = 20. Or √16×√25 = 4×5 = 20." },
        { text: "40", correct: false, feedback: "You might have doubled 20.", misconceptionId: "E-d11-a" },
        { text: "200", correct: false, feedback: "You multiplied 16 and 25 and divided by 2? Not correct.", misconceptionId: "E-d11-b" },
        { text: "400", correct: false, feedback: "That's the product, not the square root.", misconceptionId: "E-d11-c" }
      ],
    backward: "Either multiply first then square root, or square root each factor then multiply.",
    forward: "Simplifying radicals and working with square roots.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student answers 40, exactly double the correct answer.",
        rootCause: "Square-Root Step Skipped for One Factor — takes √16=4 correctly but treats 25 as if its square root were 10 (doubling instead of the true √25=5), or otherwise mishandles one of the two square-root steps, leading to a doubled result.",
        remediation: "Have the student compute √16 and √25 as two SEPARATE, independent steps and write down each result (4 and 5) before multiplying them, rather than combining the numbers first in a way that risks doubling."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student answers 200, roughly half of the full product 400.",
        rootCause: "Wrong Operation Order — multiplies 16×25=400 correctly but then applies an incorrect operation (like dividing by 2) instead of taking the square root, confusing 'square root' with 'half.'",
        remediation: "Clarify explicitly: square root is NOT the same as dividing by 2 — √400 means 'what number times itself gives 400?', and the answer is 20, since 20×20=400."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student answers 400, the product itself without taking the square root at all.",
        rootCause: "Missing Final Step — correctly multiplies 16×25=400 but stops there, forgetting the question asked for the SQUARE ROOT of that product, not the product itself.",
        remediation: "Underline the √ symbol in the question before starting, and treat 'find the product' as only the first of two required steps — always take the square root of the product as the final step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Choose a method", hint: "You can either multiply 16×25 first then take the square root, or take √16 and √25 separately then multiply." },
      { level: 2, description: "Compute the individual square roots", hint: "√16 = 4 (since 4×4=16). √25 = 5 (since 5×5=25)." },
      { level: 3, description: "Multiply the results", hint: "4 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-03",
    question: "1, 4, 9, 16, 25, … What is the 10th term?",
    options: [
        { text: "100", correct: true, feedback: "The sequence is n². 10² = 100." },
        { text: "90", correct: false, feedback: "Not a square.", misconceptionId: "E-d12-a" },
        { text: "110", correct: false, feedback: "Not a square.", misconceptionId: "E-d12-b" },
        { text: "121", correct: false, feedback: "That's 11², the 11th term.", misconceptionId: "E-d12-c" }
      ],
    backward: "Recognise the pattern: 1², 2², 3², 4², 5², … The nth term is n².",
    forward: "Explicit formulas for sequences are the beginning of algebraic thinking.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student answers 90, likely by continuing an additive pattern instead of recognising the square-number rule.",
        rootCause: "Additive Pattern Substitution — notices the differences between early terms (3,5,7,9...) are growing and extrapolates additively/roughly rather than recognising the underlying rule is nth term = n², which grows differently.",
        remediation: "Have the student explicitly label each given term with its position: 1=1², 4=2², 9=3², 16=4², 25=5² — once the n² pattern is visible by position, the 10th term follows directly as 10²."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student answers 110, another non-square guess.",
        rootCause: "Guess Without Formula — proposes a plausible-sounding number without deriving it from the explicit nth-term rule (n²).",
        remediation: "Require the student to state the rule as a formula (nth term = n²) before computing any specific term, then substitute n=10 directly: 10²=100."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student answers 121, which is the 11th term (11²), not the 10th.",
        rootCause: "Off-By-One Position Error — correctly identifies the square-number rule but miscounts which position corresponds to the 10th term, computing 11² instead of 10².",
        remediation: "Have the student explicitly count out positions against the given terms (1st=1², 2nd=2², 3rd=3², 4th=4², 5th=5²) to confirm the position-to-exponent correspondence before jumping ahead to the 10th."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Match each term to its position", hint: "1st term=1=1², 2nd term=4=2², 3rd term=9=3²... What's the pattern between position and term?" },
      { level: 2, description: "Write the formula", hint: "The nth term equals n²." },
      { level: 3, description: "Substitute n=10", hint: "10th term = 10² = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-03", probability: 0.45, condition: "Writing and using explicit nth-term formulas is foundational for algebraic function notation." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "A number = 2² × 3 × 5². How many factors does it have?",
    options: [
        { text: "18", correct: true, feedback: "(2+1)(1+1)(2+1) = 3×2×3 = 18." },
        { text: "12", correct: false, feedback: "You might have used (2)(1)(2)=4? Incorrect formula.", misconceptionId: "E-d13-a" },
        { text: "15", correct: false, feedback: "Off by 3.", misconceptionId: "E-d13-b" },
        { text: "24", correct: false, feedback: "Maybe you added exponents instead of multiplying (exponent+1).", misconceptionId: "E-d13-c" }
      ],
    backward: "Use (a+1)(b+1)(c+1) where a,b,c are exponents.",
    forward: "Direct application of combinatorics: choosing how many of each prime factor to include.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student answers 12, using the exponents directly instead of exponent+1.",
        rootCause: "Missing-Plus-One Error — multiplies the exponents themselves (2×1×2=4, or some similar direct combination) instead of adding 1 to each exponent first, forgetting that even an exponent of 0 (i.e. the factor not included) counts as one valid choice.",
        remediation: "Explain the +1 concretely: for the prime 2 with exponent 2, a factor can include 2⁰, 2¹, or 2² — that's THREE choices, not two, which is exactly (exponent+1)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student answers 15, close to but not matching the correct 18.",
        rootCause: "Partial Formula Application — correctly adds 1 to some exponents but not all of them, or makes an arithmetic slip while multiplying (2+1)(1+1)(2+1), landing 3 short of the correct 18.",
        remediation: "Write out each factor of the formula separately before multiplying: (2+1)=3, (1+1)=2, (2+1)=3, then multiply 3×2×3 step by step, checking the running product after each multiplication."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student answers 24, likely adding exponents instead of multiplying (exponent+1) terms.",
        rootCause: "Addition-Instead-of-Multiplication Error — combines the (exponent+1) values by adding them (3+2+3=8, not 24 exactly, but some similar additive miscombination) rather than multiplying them together as the formula requires.",
        remediation: "State the rule explicitly as a multiplication: total factors = (a+1) × (b+1) × (c+1), never a sum — practice with a simple two-prime example first to lock in that it's a product."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the exponents", hint: "2² × 3¹ × 5² has exponents 2, 1, and 2." },
      { level: 2, description: "Add 1 to each exponent", hint: "(2+1), (1+1), (2+1) = 3, 2, 3." },
      { level: 3, description: "Multiply the results", hint: "3 × 2 × 3 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FACT-05", probability: 0.5, condition: "Counting even/odd factors builds directly on the total factor-count formula." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-02",
    question: "Find the LCM of 2³ × 3 and 2 × 3² × 5.",
    options: [
        { text: "360", correct: true, feedback: "Highest powers: 2³, 3², 5. 2³×3²×5 = 8×9×5 = 360." },
        { text: "2³ × 3²", correct: false, feedback: "You missed the factor 5.", misconceptionId: "E-d14-a" },
        { text: "2 × 3", correct: false, feedback: "That's the HCF.", misconceptionId: "E-d14-b" },
        { text: "2³ × 3 × 5", correct: false, feedback: "You missed the 3² (only took 3¹).", misconceptionId: "E-d14-c" }
      ],
    backward: "For LCM, take the maximum exponent for each prime that appears.",
    forward: "Prime factorisation simplifies LCM for large numbers.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student answers 2³×3², omitting the prime 5 entirely.",
        rootCause: "Prime Omission — correctly takes the highest powers of 2 and 3 that appear in either factorisation, but overlooks that 5 also appears (in the second number) and must be included in the LCM even though it doesn't appear in the first.",
        remediation: "List every DISTINCT prime that appears in EITHER factorisation first (2, 3, and 5), before taking the highest power of each — this ensures no prime is silently dropped."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student answers 2×3, the HCF instead of the LCM.",
        rootCause: "LCM/HCF Label Swap — takes the LOWEST shared power of each common prime (giving the HCF) instead of the HIGHEST power needed to cover both numbers (the LCM).",
        remediation: "Restate the rule as a contrast: LCM takes the highest power of every prime that appears ANYWHERE; HCF takes the lowest power of primes shared by BOTH — apply the correct direction based on which was asked for."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student answers 2³×3×5, using the lower power of 3 (3¹) instead of the higher (3²).",
        rootCause: "Wrong-Direction Exponent Choice for One Prime — correctly maximizes the exponent of 2 (taking 2³ over 2¹) but incorrectly takes the LOWER exponent of 3 (3¹ instead of 3²), inconsistently applying the 'take the highest' rule.",
        remediation: "Go prime by prime, systematically, and for EACH one independently compare its exponent across both factorisations, taking the higher value every single time — don't let the choice for one prime bleed into the choice for another."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all distinct primes involved", hint: "The two numbers use primes 2, 3, and 5 between them." },
      { level: 2, description: "Compare exponents prime by prime", hint: "For 2: powers are 2³ and 2¹ — take the higher, 2³. For 3: powers are 3¹ and 3² — take the higher, 3². For 5: only appears as 5¹ in one number — include it as 5¹." },
      { level: 3, description: "Multiply the highest powers together", hint: "2³ × 3² × 5 = 8 × 9 × 5 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.6.NS.B.4"]
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-04",
    question: "Two co-prime numbers multiply to 35. Both are greater than 1. What is their sum?",
    options: [
        { text: "12", correct: true, feedback: "Co-prime with product 35: 5×7. Sum = 5+7 = 12." },
        { text: "6", correct: false, feedback: "That would be 1×35, but both >1.", misconceptionId: "E-d15-a" },
        { text: "10", correct: false, feedback: "2×5=10, not 35.", misconceptionId: "E-d15-b" },
        { text: "35", correct: false, feedback: "That's the product, not the sum.", misconceptionId: "E-d15-c" }
      ],
    backward: "Co-prime means HCF=1. The prime factors give the numbers directly.",
    forward: "Co-primality is used in fraction simplification.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student answers 6, the sum you'd get from the pair (1, 35) instead of (5, 7).",
        rootCause: "Trivial-Pair Default — uses the trivial factor pair 1×35 (which technically has product 35 and is co-prime, since gcd(1,35)=1) without checking the 'both greater than 1' condition that rules this pair out.",
        remediation: "Explicitly cross out the pair (1, 35) once the 'both greater than 1' condition is read, and search only among factor pairs where neither number is 1."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student answers 10, from an unrelated pair (2, 5) whose product isn't even 35.",
        rootCause: "Wrong Product Used — picks a pair of small numbers (2 and 5) that happen to be co-prime but doesn't actually verify their product equals the required 35 (2×5=10≠35).",
        remediation: "Always verify the chosen pair's product matches the number given in the question BEFORE computing the sum — 2×5=10 should immediately signal this pair doesn't fit."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student answers 35, restating the product instead of computing the sum.",
        rootCause: "Sum/Product Confusion — correctly identifies that the numbers multiply to 35 but reports that given product back as the answer instead of finding the two numbers and adding them.",
        remediation: "Underline exactly what's asked (the SUM) versus what's given (the PRODUCT) before answering — these are two different operations on the same pair of numbers."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the prime factorisation", hint: "35 = 5 × 7. Both 5 and 7 are prime, so they share no common factors." },
      { level: 2, description: "Check the co-prime and >1 conditions", hint: "Is gcd(5,7)=1? Yes, co-prime. Are both greater than 1? Yes." },
      { level: 3, description: "Compute the sum", hint: "5 + 7 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "FRA-02", probability: 0.35, condition: "Co-prime numerator/denominator pairs signal a fraction is already in lowest terms." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-05",
    question: "Which statement is FALSE? A) Divisible by 6 → divisible by 2 and 3. B) Divisible by 4 → divisible by 8. C) Divisible by 9 → divisible by 3. D) Ending in 0 → divisible by 2 and 5.",
    options: [
        { text: "B", correct: true, feedback: "Example: 12 is divisible by 4 but not by 8. The implication is false." },
        { text: "A", correct: false, feedback: "True: if divisible by 6, it's even (so by 2) and digit sum multiple of 3.", misconceptionId: "E-d16-a" },
        { text: "C", correct: false, feedback: "True: 9 is a multiple of 3, so any multiple of 9 is also a multiple of 3.", misconceptionId: "E-d16-b" },
        { text: "D", correct: false, feedback: "True: ending in 0 means it's even (by 2) and ends in 0 (by 5).", misconceptionId: "E-d16-c" }
      ],
    backward: "Test each statement with a counter-example. 12 is divisible by 4 but not by 8.",
    forward: "Critical thinking about divisibility implications is important in number theory.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student picks A as the false statement, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't test statement A against a real number to check it, and mistakenly judges it false without verifying; since 6=2×3, any multiple of 6 genuinely is a multiple of both 2 and 3.",
        remediation: "For every implication statement, test it against at least one concrete example number before deciding true or false — for A, pick any multiple of 6 (like 12 or 18) and confirm it really is divisible by both 2 and 3."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks C as the false statement, when it is actually true.",
        rootCause: "Missing Counter-Example Test — fails to verify that since 9 is itself a multiple of 3 (9=3×3), any multiple of 9 is automatically also a multiple of 3, making statement C true rather than false.",
        remediation: "Test with a concrete multiple of 9 (like 27 or 45) and check: is it also a multiple of 3? Confirming this shows C is true, not the false statement being sought."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks D as the false statement, when it is actually true.",
        rootCause: "Missing Counter-Example Test — doesn't verify that a number ending in 0 (like 30 or 100) is indeed divisible by both 2 (it's even) and 5 (it ends in 0), incorrectly judging this true statement as the false one.",
        remediation: "Pick a specific number ending in 0 and check both divisibility rules on it directly, rather than judging the statement's truth from a quick guess."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test each statement with a real number", hint: "For each of A, B, C, D, pick a concrete example number and check whether the implication actually holds." },
      { level: 2, description: "Look for a counter-example to disprove one", hint: "A counter-example is a number where the 'if' part is true but the 'then' part is false. Try 12 for statement B: is 12 divisible by 4? Is 12 divisible by 8?" },
      { level: 3, description: "Confirm the others are true", hint: "For the remaining three statements, confirm you can't find any counter-example — that means they're true, and only the one with a counter-example is false." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-05",
    question: "How many square numbers lie between 50 and 150?",
    options: [
        { text: "5", correct: true, feedback: "8²=64, 9²=81, 10²=100, 11²=121, 12²=144. That's 5 squares." },
        { text: "4", correct: false, feedback: "You might have missed one; list them carefully.", misconceptionId: "E-d17-a" },
        { text: "6", correct: false, feedback: "13²=169 >150, so not included.", misconceptionId: "E-d17-b" },
        { text: "7", correct: false, feedback: "Way too many.", misconceptionId: "E-d17-c" }
      ],
    backward: "Find the smallest integer whose square >50 (8), and the largest whose square <150 (12). Count inclusive.",
    forward: "Estimating square roots and understanding square distributions.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student answers 4, undercounting by one.",
        rootCause: "Boundary Undercounting — likely starts the search from 9² instead of 8² (64), incorrectly assuming 64 falls below 50 or otherwise excluding a valid square from the count.",
        remediation: "List EVERY square starting from a number clearly below the lower boundary (e.g. 7²=49) and cross off only the ones that don't actually fall in range, rather than guessing a starting point."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student answers 6, overcounting by including 13² (169), which exceeds 150.",
        rootCause: "Boundary Overcounting — includes 13²=169 in the list without checking it against the upper bound (150), since 169 is clearly greater than 150 and should be excluded.",
        remediation: "After listing candidate squares, check EACH one explicitly against both boundaries (is it greater than 50 AND less than 150?) rather than assuming the list naturally stops at the right place."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student answers 7, significantly overcounting.",
        rootCause: "No Boundary Check At All — lists a broad range of squares without checking any of them against the actual 50-150 boundaries, resulting in a much larger (and incorrect) count.",
        remediation: "Write out each candidate square individually (7²=49, 8²=64, 9²=81, ...) and mark each one 'in range' or 'out of range' before counting, rather than counting an unfiltered list."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the starting point", hint: "What is the smallest whole number whose square is greater than 50? (7²=49 is too small, 8²=64 works.)" },
      { level: 2, description: "Find the ending point", hint: "What is the largest whole number whose square is less than 150? (12²=144 works, 13²=169 is too big.)" },
      { level: 3, description: "Count inclusively", hint: "List every square from 8² to 12²: 64, 81, 100, 121, 144. How many is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-06",
    question: "1, 3, 6, 10, 15, … What is the 8th term? (Triangular numbers)",
    options: [
        { text: "36", correct: true, feedback: "T₈ = 8×9÷2 = 72÷2 = 36." },
        { text: "28", correct: false, feedback: "That's T₇.", misconceptionId: "E-d18-a" },
        { text: "45", correct: false, feedback: "That's T₉.", misconceptionId: "E-d18-b" },
        { text: "64", correct: false, feedback: "That's 8², not the triangular number.", misconceptionId: "E-d18-c" }
      ],
    backward: "Triangular number formula: Tₙ = n(n+1)/2.",
    forward: "Formula-based sequences are a key part of algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student answers 28, which is actually the 7th triangular number.",
        rootCause: "Off-By-One Position Error — computes T₇ = 7×8÷2 = 28 instead of T₈, likely miscounting the position by one (perhaps counting the first given term, 1, as position 0 instead of position 1).",
        remediation: "Have the student explicitly count the given terms against their positions (1st=1, 2nd=3, 3rd=6, 4th=10, 5th=15) to fix the correspondence before substituting n=8 into the formula."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student answers 45, which is actually the 9th triangular number.",
        rootCause: "Off-By-One Position Error (other direction) — computes T₉ = 9×10÷2 = 45 instead of T₈, overshooting the target position by one.",
        remediation: "Substitute n=8 explicitly and carefully into the formula Tₙ=n(n+1)/2 step by step: T₈ = 8×(8+1)/2 = 8×9/2, writing out n and n+1 separately to avoid an off-by-one slip."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student answers 64, which is 8² rather than the 8th triangular number.",
        rootCause: "Wrong-Sequence Confusion — confuses the triangular-number rule (Tₙ=n(n+1)/2) with the square-number rule (n²), applying the wrong formula for this sequence.",
        remediation: "Verify the rule against the GIVEN terms first: does n²  match 1,3,6,10,15? (1²=1 matches by coincidence, but 2²=4≠3) — this check reveals n² is the wrong rule, and n(n+1)/2 is the correct one for this specific sequence."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the formula", hint: "Triangular numbers follow Tₙ = n(n+1)/2." },
      { level: 2, description: "Substitute n=8 carefully", hint: "T₈ = 8×(8+1)/2 = 8×9/2." },
      { level: 3, description: "Compute the result", hint: "8×9 = 72. 72÷2 = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-03", probability: 0.35, condition: "Formula-based sequences like this are a stepping stone to general algebraic function notation." }
    ],
    learningObjectives: []
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-05",
    question: "How many even factors does 72 have? (Hint: total factors minus odd factors.)",
    options: [
        { text: "9", correct: true, feedback: "72=2³×3²; total factors = (3+1)(2+1)=12. Odd factors come from 3² only: (2+1)=3. Even factors = 12-3 = 9." },
        { text: "6", correct: false, feedback: "That's half of 12, but not correct.", misconceptionId: "E-d19-a" },
        { text: "12", correct: false, feedback: "That includes both even and odd.", misconceptionId: "E-d19-b" },
        { text: "8", correct: false, feedback: "Off by 1; check the calculation.", misconceptionId: "E-d19-c" }
      ],
    backward: "Even factors = total factors minus number of odd factors. Odd factors come from the odd part of the number.",
    forward: "Classifying factors by parity is a deeper number-theory concept.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student answers 6, assuming exactly half of all factors are even.",
        rootCause: "Even-Split Assumption — assumes factors split evenly between even and odd (half of 12 is 6) without actually computing how many odd factors exist from the number's odd part (3²), which gives only 3 odd factors, not 6.",
        remediation: "Show that the split isn't always 50/50 — compute the actual odd-factor count from the odd part of the number's factorisation (here, just the 3² part gives (2+1)=3 odd factors) rather than assuming an even split."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student answers 12, the total factor count without subtracting the odd ones.",
        rootCause: "Missing Subtraction Step — correctly computes the total number of factors (12) but stops there, forgetting the question specifically asks for EVEN factors only, which requires subtracting the odd-factor count.",
        remediation: "Follow the two-step process explicitly: (1) compute total factors, (2) compute odd factors (from the odd primes only), (3) subtract step 2 from step 1 — don't stop after step 1."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student answers 8, one less than the correct 9.",
        rootCause: "Odd-Factor Miscount — likely miscounts the number of odd factors (perhaps computing 4 instead of 3 for the 3² part), leading to 12-4=8 instead of the correct 12-3=9.",
        remediation: "Recompute the odd-factor count carefully: odd factors of 72 come only from its odd part, 3², which has (2+1)=3 factors (1, 3, 9) — count these three explicitly by listing them out."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total factor count", hint: "72=2³×3². Total factors = (3+1)(2+1) = 12." },
      { level: 2, description: "Find the odd factors", hint: "Odd factors can't include any factor of 2, so they only come from the 3² part: (2+1)=3 odd factors (1, 3, 9)." },
      { level: 3, description: "Subtract to find even factors", hint: "Even factors = total − odd = 12 − 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-03",
    question: "The LCM of 12 and a two-digit number is 60. The number is a multiple of 5, less than 20, and not a multiple of 3. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "10 is <20, multiple of 5, not multiple of 3. LCM(12,10)=60." },
        { text: "15", correct: false, feedback: "15 is a multiple of 3, so excluded.", misconceptionId: "E-d20-a" },
        { text: "20", correct: false, feedback: "20 is not less than 20.", misconceptionId: "E-d20-b" },
        { text: "5", correct: false, feedback: "5 is not a two-digit number.", misconceptionId: "E-d20-c" }
      ],
    backward: "Use the conditions to narrow down, then check LCM.",
    forward: "Reverse LCM problems with constraints build algebraic reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student answers 15, which is a multiple of 5 but violates the 'not a multiple of 3' condition.",
        rootCause: "Partial Constraint Check — verifies the candidate is a multiple of 5 and stops, without checking it against the OTHER stated condition (not a multiple of 3); 15=3×5 is indeed a multiple of 3.",
        remediation: "List every condition given in the question before testing candidates, and check each candidate against the FULL list, not just the first condition that comes to mind."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student answers 20, which fails the 'less than 20' condition.",
        rootCause: "Boundary Misreading — treats 'less than 20' as if it meant 'less than or equal to 20', including the boundary value itself when it should be strictly excluded.",
        remediation: "Underline strict inequality language ('less than', 'greater than') versus inclusive language ('at most', 'no more than') to distinguish whether the boundary value itself counts."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student answers 5, which fails the 'two-digit number' condition.",
        rootCause: "Constraint Neglect — finds a number satisfying the multiple-of-5 and not-multiple-of-3 conditions but overlooks that the question specifically requires a TWO-DIGIT number, and 5 is only one digit.",
        remediation: "Treat 'two-digit number' as a hard filter applied FIRST (narrowing candidates to 10-19, given the 'less than 20' condition), before checking the other numeric conditions."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Narrow using the digit and range clues", hint: "The number is two digits and less than 20, so it must be between 10 and 19." },
      { level: 2, description: "Apply the multiple-of-5 and not-multiple-of-3 clues", hint: "Among 10-19, which numbers are multiples of 5? Of those, which are NOT also multiples of 3?" },
      { level: 3, description: "Verify with the LCM condition", hint: "Check: does LCM(12, your candidate) actually equal 60?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-04",
    question: "A and B are co-prime, both greater than 1. A × B = 91. Find A + B.",
    options: [
        { text: "20", correct: true, feedback: "91 = 7×13, co-prime. 7+13 = 20." },
        { text: "14", correct: false, feedback: "7+7=14, but product 49, not 91.", misconceptionId: "E-d21-a" },
        { text: "91", correct: false, feedback: "That's the product.", misconceptionId: "E-d21-b" },
        { text: "12", correct: false, feedback: "Incorrect.", misconceptionId: "E-d21-c" }
      ],
    backward: "Co-prime numbers whose product is given are the prime factors of the product.",
    forward: "Unique factorisation with co-prime condition.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student answers 14, from an unrelated pair (7,7) whose product isn't even 91.",
        rootCause: "Wrong Pair Assumed — guesses a pair without actually finding the true prime factorisation of 91 first, landing on a pair (7,7) that doesn't even multiply to the required 91 (7×7=49) and also isn't co-prime with itself.",
        remediation: "Prime-factorise 91 directly first (try dividing by small primes: 91÷7=13, and 13 is prime) before guessing any pair — this guarantees the pair actually multiplies to 91."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student answers 91, restating the product instead of computing the sum.",
        rootCause: "Sum/Product Confusion — correctly identifies that A×B=91 but reports that given product as the final answer instead of finding A and B individually and adding them.",
        remediation: "Underline what's asked (A+B) versus what's given (A×B) — these require finding the actual values of A and B first, not just repeating the given product."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student answers 12, an unverified guess.",
        rootCause: "Guess Without Factorisation — proposes a sum without first finding the actual factor pair of 91 that multiplies to 91 and satisfies the co-prime, both-greater-than-1 conditions.",
        remediation: "Systematically test small primes as divisors of 91 (2, 3, 5, 7, 11, 13...) to find its actual prime factorisation, rather than guessing a final sum directly."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise 91", hint: "Try dividing 91 by small primes: 91 ÷ 7 = 13. Is 13 prime?" },
      { level: 2, description: "Confirm the conditions", hint: "Are 7 and 13 co-prime (share no common factors)? Are both greater than 1?" },
      { level: 3, description: "Compute the sum", hint: "7 + 13 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-06",
    question: "Find the smallest number between 200 and 300 that is divisible by 2, 3, and 5.",
    options: [
        { text: "210", correct: true, feedback: "Divisible by 2,3,5 → divisible by 30. Multiples of 30: 210,240,270,300. Smallest in range is 210." },
        { text: "200", correct: false, feedback: "200 not divisible by 3.", misconceptionId: "E-d22-a" },
        { text: "240", correct: false, feedback: "240 is in range but not the smallest.", misconceptionId: "E-d22-b" },
        { text: "300", correct: false, feedback: "300 is in range but not the smallest; also 300 is not <300.", misconceptionId: "E-d22-c" }
      ],
    backward: "If a number is divisible by 2,3,5, it must be a multiple of 2×3×5 = 30.",
    forward: "Combining divisibility rules into LCM is a powerful shortcut.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student answers 200, the lower boundary itself, without checking all three divisibility conditions.",
        rootCause: "Boundary Default — assumes the range's starting value must be the answer without actually checking it against every stated condition; 200 is divisible by 2 and 5 but not by 3 (digit sum 2 is not a multiple of 3).",
        remediation: "Never assume a boundary value is automatically the answer — check EVERY stated condition against it explicitly, just like any other candidate."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student answers 240, a valid multiple of 30 in range but not the smallest.",
        rootCause: "Incomplete Search — correctly identifies a number divisible by 2, 3, and 5 within the range, but doesn't check whether a smaller valid multiple of 30 also exists in the range before settling on this one.",
        remediation: "List ALL multiples of 30 within the range systematically, starting from the smallest, and stop at the very first one found — don't stop at an arbitrary later one."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student answers 300, both not the smallest and possibly outside the intended range.",
        rootCause: "Endpoint Confusion — picks the largest boundary-adjacent multiple of 30 instead of the smallest, and may also misjudge whether 300 itself is included in 'between 200 and 300.'",
        remediation: "Start the search from the LOWER boundary and move upward, stopping at the first valid multiple found — searching from the upper end risks landing on the largest instead of smallest valid value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the divisibility rules", hint: "A number divisible by 2, 3, AND 5 must be divisible by their product: 2×3×5=30." },
      { level: 2, description: "List multiples of 30 near the range", hint: "Multiples of 30: ..., 180, 210, 240, 270, 300, ... Which of these fall between 200 and 300?" },
      { level: 3, description: "Pick the smallest one in range", hint: "Among the multiples of 30 that fall in the range, which is the smallest?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-06",
    question: "The area of a square is 289 cm². What is its perimeter?",
    options: [
        { text: "68 cm", correct: true, feedback: "Side = √289 = 17 cm. Perimeter = 4×17 = 68 cm." },
        { text: "17 cm", correct: false, feedback: "That's the side length, not the perimeter.", misconceptionId: "E-d23-a" },
        { text: "34 cm", correct: false, feedback: "That's only 2 sides.", misconceptionId: "E-d23-b" },
        { text: "72 cm", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d23-c" }
      ],
    backward: "First find the side using square root, then perimeter = 4 × side.",
    forward: "Geometry and square roots are directly linked.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student answers 17 cm, the side length, stopping before computing the perimeter.",
        rootCause: "Missing Final Step — correctly finds the side length (√289=17) but stops there, forgetting the question asked for the PERIMETER, which requires one more step (×4).",
        remediation: "Underline exactly what the question asks for (perimeter) versus what you've found so far (side length) — treat 'find the side' as only step one of a two-step problem."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student answers 34 cm, doubling the side length instead of quadrupling it.",
        rootCause: "Wrong Multiplier — multiplies the side by 2 instead of 4, possibly confusing a square's perimeter formula with that of a two-sided shape or simply making an arithmetic slip on the multiplier.",
        remediation: "Remind the student that a square has FOUR equal sides, so perimeter = 4 × side, not 2 × side — sketch a square and label all four sides to reinforce the count."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student answers 72 cm, an arithmetic slip in the final multiplication.",
        rootCause: "Multiplication Slip — correctly sets up perimeter = 4×17 but makes an arithmetic error computing the product, landing on 72 instead of the correct 68.",
        remediation: "Recompute 4×17 by breaking it apart: 4×17 = 4×10 + 4×7 = 40+28 = 68, and compare this step-by-step result to the quick-computed answer to catch slips."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Area of a square = side². So side = √(area) = √289." },
      { level: 2, description: "Compute the square root", hint: "What number times itself gives 289? (Hint: it's between 15 and 20.)" },
      { level: 3, description: "Compute the perimeter", hint: "Perimeter = 4 × side = 4 × 17 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-05",
    question: "First term = 3. Each term = 2 × previous term - 1. Find the 4th term.",
    options: [
        { text: "17", correct: true, feedback: "t1=3; t2=2×3-1=5; t3=2×5-1=9; t4=2×9-1=17." },
        { text: "15", correct: false, feedback: "3,5,9,15? That would be +2,+4,+6, not the rule.", misconceptionId: "E-d24-a" },
        { text: "13", correct: false, feedback: "Incorrect recursive calculation.", misconceptionId: "E-d24-b" },
        { text: "31", correct: false, feedback: "That's using the rule 2×previous+1 instead of 2×previous-1: 3,7,15,31.", misconceptionId: "E-d24-c" }
      ],
    backward: "Apply the rule step-by-step: start with 3, then use the formula to get each next term.",
    forward: "Recursive rules are the foundation of programming and iterative processes.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student answers 15, following a growing-difference pattern (+2,+4,+6) instead of the stated recursive rule.",
        rootCause: "Difference-Pattern Substitution — after computing the first couple of terms correctly, notices the differences seem to be growing and continues by extrapolating that difference pattern instead of re-applying the actual rule (2×previous-1) each time.",
        remediation: "Re-apply the EXACT stated rule at every single step, computed fresh from the previous term, rather than extrapolating from the differences between terms already found."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student answers 13, an arithmetic slip somewhere in the recursive chain.",
        rootCause: "Recursive Chain Slip — makes an arithmetic error at one step of the multi-step recursive calculation (e.g. computing 2×5-1 incorrectly), which then propagates to a wrong final term.",
        remediation: "Write out each step of the recursion on its own line — t1=3, t2=2×3-1=?, t3=2×t2-1=?, t4=2×t3-1=? — checking each computed value before using it in the next step."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student answers 31, applying the rule 2×previous+1 instead of 2×previous-1.",
        rootCause: "Sign Confusion in the Rule — swaps the subtraction in the stated rule (×2, then −1) for addition (×2, then +1), possibly confusing it with a similar-looking rule from a different problem.",
        remediation: "Re-read the rule carefully before starting and write it down explicitly as 'multiply by 2, THEN subtract 1' — say the operation and its sign out loud at each step to avoid silently swapping + for −."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compute term 2", hint: "t1=3. Apply the rule: t2 = 2×3-1 = ?" },
      { level: 2, description: "Compute term 3", hint: "t3 = 2×t2-1. Use the value of t2 you just found." },
      { level: 3, description: "Compute term 4", hint: "t4 = 2×t3-1. Use the value of t3 you just found." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALG-03", probability: 0.4, condition: "Recursive rules are a natural precursor to iterative programming and recurrence relations." }
    ],
    learningObjectives: []
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-04",
    question: "A number = 3ᵃ × 5 × 7 has exactly 8 factors. Find a.",
    options: [
        { text: "1", correct: true, feedback: "Factors = (a+1)×2×2 = 4(a+1)=8 → a+1=2 → a=1." },
        { text: "2", correct: false, feedback: "Then 4(3)=12 factors.", misconceptionId: "E-r1-a" },
        { text: "0", correct: false, feedback: "4(1)=4 factors.", misconceptionId: "E-r1-b" },
        { text: "3", correct: false, feedback: "4(4)=16 factors.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student answers a=2, one too high.",
        rootCause: "Formula Misapplication — doesn't correctly solve 4(a+1)=8 for a+1=2, instead guessing a value or misreading a coefficient elsewhere in the problem.",
        remediation: "Isolate the unknown step by step: 4(a+1)=8, so (a+1)=8÷4=2, so a=2-1=1 — write each algebraic step out rather than jumping to a guess."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student answers a=0, treating the exponent as absent.",
        rootCause: "Off-By-One in the Formula — miscounts what value of a makes the total equal 8, perhaps assuming the smallest possible exponent is automatically the answer without solving the equation.",
        remediation: "Plug a=0 into the formula: (0+1)×2×2=4, and compare to the required 8 — the mismatch shows a=0 is too low, and the equation must be solved properly."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student answers a=3, one too high in the other direction.",
        rootCause: "Guess Without Verification — tries a plausible value without solving 4(a+1)=8 algebraically or checking the result (a=3 gives 16 factors, not 8).",
        remediation: "Solve the equation directly: 4(a+1)=8 → a+1=2 → a=1, then verify by substituting back into the original formula."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Write the factor-count formula", hint: "For 3ᵃ×5¹×7¹, total factors = (a+1)(1+1)(1+1)." },
      { level: 2, description: "Simplify the known parts", hint: "(1+1)(1+1) = 2×2 = 4. So the formula is 4×(a+1)." },
      { level: 3, description: "Solve for a", hint: "4×(a+1)=8. Divide both sides by 4: a+1=2. What is a?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-04",
    question: "Product of two numbers is 240 and LCM is 120. Find their HCF.",
    options: [
        { text: "2", correct: true, feedback: "HCF = 240 ÷ 120 = 2." },
        { text: "60", correct: false, feedback: "Product isn't 60×120.", misconceptionId: "E-r2-a" },
        { text: "120", correct: false, feedback: "That's the LCM.", misconceptionId: "E-r2-b" },
        { text: "4", correct: false, feedback: "4×120=480.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student answers 60, half of the LCM.",
        rootCause: "Wrong Operation Chosen — halves the LCM instead of dividing the product by the LCM, not deriving the operation from the product=HCF×LCM formula.",
        remediation: "Write the formula explicitly first — product = HCF × LCM — then rearrange to HCF = product ÷ LCM before computing anything."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student answers 120, confusing HCF with the given LCM.",
        rootCause: "HCF/LCM Label Confusion — simply restates one of the given numbers (the LCM) instead of computing the HCF from the formula.",
        remediation: "Underline what's asked (HCF) versus what's given (product and LCM) before answering, then apply the formula rather than repeating a given value."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student answers 4, an unverified guess.",
        rootCause: "Untested Guess — proposes a plausible small number without actually computing 240÷120 or checking the answer against the product=HCF×LCM identity.",
        remediation: "Compute 240÷120 directly and then verify: does HCF×LCM (your answer times 120) equal the given product of 240?"
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the identity", hint: "Product of two numbers = HCF × LCM." },
      { level: 2, description: "Substitute known values", hint: "240 = HCF × 120." },
      { level: 3, description: "Solve for HCF", hint: "Divide both sides by 120: HCF = 240 ÷ 120 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-03",
    question: "HCF of two numbers is 12. Sum = 84, difference = 12. Find the larger number.",
    options: [
        { text: "48", correct: true, feedback: "Let numbers = 12a,12b. a+b=7, a-b=1 → a=4,b=3 → numbers 48,36." },
        { text: "36", correct: false, feedback: "Smaller number.", misconceptionId: "E-r3-a" },
        { text: "60", correct: false, feedback: "Sum and diff don't match.", misconceptionId: "E-r3-b" },
        { text: "24", correct: false, feedback: "Not consistent.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student answers 36, correctly finding the pair but reporting the smaller number.",
        rootCause: "Wrong Number Selected — solves the system correctly and finds both numbers (48 and 36) but reports the smaller one instead of the larger one asked for.",
        remediation: "Have the student explicitly label which found number is larger before answering, since the question asks specifically for the larger one."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student answers 60, a value that doesn't satisfy both the sum and difference conditions together.",
        rootCause: "Incomplete Verification — proposes a candidate without checking it against BOTH stated conditions (sum=84 and difference=12) simultaneously.",
        remediation: "Represent the numbers as 12a and 12b (since HCF=12) and solve the system a+b=7, a-b=1 directly, rather than guessing a value for the larger number."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student answers 24, another value inconsistent with the given conditions.",
        rootCause: "Incomplete System Solving — doesn't set up and solve the actual system of equations that the HCF representation requires.",
        remediation: "Set up a+b=7 and a-b=1 (from dividing the sum and difference by the HCF, 12), add the two equations to find a=4, then find b=3, giving numbers 48 and 36."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Represent using the HCF", hint: "Write the two numbers as 12a and 12b, where a and b share no common factor." },
      { level: 2, description: "Set up the equations", hint: "12a+12b=84 → a+b=7. 12a-12b=12 → a-b=1." },
      { level: 3, description: "Solve and identify the larger", hint: "Adding the equations: 2a=8, so a=4, and b=3. The numbers are 12×4=48 and 12×3=36 — which is larger?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-04",
    question: "Find the smallest digit □ so that 3,2□4 is divisible by both 4 and 9.",
    options: [
        { text: "0", correct: true, feedback: "Last two digits must be divisible by 4: 04 works. Digit sum 3+2+□+4=9+□ must be a multiple of 9 → □=0 (sum 9)." },
        { text: "6", correct: false, feedback: "64 divisible by 4, but sum 15 not a multiple of 9.", misconceptionId: "E-r4-a" },
        { text: "9", correct: false, feedback: "94 not divisible by 4.", misconceptionId: "E-r4-b" },
        { text: "3", correct: false, feedback: "34 not divisible by 4.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student answers 6, checking only the divisible-by-4 rule and not the divisible-by-9 rule.",
        rootCause: "Single-Rule Application — verifies the last-two-digits rule for 4 (□4=64, divisible by 4) but doesn't check the digit-sum rule for 9 (sum=15, not a multiple of 9).",
        remediation: "Check candidates against BOTH stated rules before accepting any digit — a digit that passes only one of two required rules is not a valid answer."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student answers 9, without checking the divisible-by-4 rule.",
        rootCause: "Single-Rule Application — possibly checks the digit-sum rule (which happens to fail here too) or picks arbitrarily, without properly verifying the last-two-digits rule for 4; 94÷4=23.5 is not a whole number.",
        remediation: "Explicitly test the last two digits (□4) for divisibility by 4 for each candidate digit before moving on to check the digit-sum rule."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student answers 3, without checking the divisible-by-4 rule.",
        rootCause: "Single-Rule Application — similarly fails to verify that 34 (the last two digits with □=3) is divisible by 4; 34÷4=8.5 is not a whole number.",
        remediation: "Build a quick table testing □4 for divisibility by 4 across all digits 0-9 first, narrowing the candidate list before applying the digit-sum-by-9 rule to what remains."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the divisible-by-4 rule first", hint: "The last two digits are □4. Which digits □ make □4 divisible by 4?" },
      { level: 2, description: "Apply the divisible-by-9 rule to survivors", hint: "Among the digits that passed step 1, compute the full digit sum 3+2+□+4=9+□ and check which is a multiple of 9." },
      { level: 3, description: "Pick the smallest that satisfies both", hint: "Which digit satisfies both rules, and is it the smallest such digit?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-03",
    question: "Which is a perfect square?",
    options: [
        { text: "2⁴ × 3²", correct: true, feedback: "Exponents 4 and 2 are even." },
        { text: "2⁶ × 5", correct: false, feedback: "Exponent of 5 is 1 (odd).", misconceptionId: "E-r5-a" },
        { text: "2³ × 3²", correct: false, feedback: "Exponent of 2 is 3.", misconceptionId: "E-r5-b" },
        { text: "2 × 3⁴", correct: false, feedback: "Exponent of 2 is 1.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student picks 2⁶×5, checking only the exponent of 2 (even) and missing the implicit exponent of 1 on 5.",
        rootCause: "Implicit-Exponent Blindness — a prime written without a visible exponent (like '5') has an implicit exponent of 1, which is odd; the student may not check it as carefully as the explicitly-written exponents.",
        remediation: "Rewrite every prime factor with its exponent shown explicitly, even when it's 1, so no factor's odd exponent goes unnoticed."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student picks 2³×3², checking only the exponent of 3 (even) and missing that 2³ has an odd exponent.",
        rootCause: "Partial Exponent Check — verifies only one prime's exponent and overlooks another, concluding 'perfect square' without checking every exponent.",
        remediation: "Underline every exponent in the expression before judging, and only conclude 'perfect square' once ALL of them are confirmed even."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student picks 2×3⁴, missing that the implicit exponent of 1 on the un-written '2' is odd.",
        rootCause: "Implicit-Exponent Blindness — similarly overlooks that '2' alone means 2¹, an odd exponent, focusing instead on the explicitly even exponent of 3⁴.",
        remediation: "Treat every prime factor as having an explicit exponent, writing '2' as '2¹', so its odd exponent is visible and checked just like any other."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "A number is a perfect square exactly when every exponent in its prime factorisation is even." },
      { level: 2, description: "Check each exponent, including implicit ones", hint: "Rewrite any 'bare' prime (like '5' or '2' with no visible exponent) as having exponent 1, then check it too." },
      { level: 3, description: "Confirm all pass", hint: "Only the option where every single exponent (including implicit 1's) is even qualifies as a perfect square." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-05",
    question: "3, 7, 15, 31, ___ — what comes next?",
    options: [
        { text: "63", correct: true, feedback: "Rule: ×2 + 1. 31×2+1=63." },
        { text: "62", correct: false, feedback: "That's ×2 only.", misconceptionId: "E-r6-a" },
        { text: "60", correct: false, feedback: "Doesn't follow the rule.", misconceptionId: "E-r6-b" },
        { text: "47", correct: false, feedback: "Doesn't follow the rule.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student answers 62, applying only the doubling step and forgetting the +1.",
        rootCause: "Incomplete Two-Step Rule — correctly doubles the last term (31×2=62) but drops the second part of the rule (add 1).",
        remediation: "Verify the FULL rule against an earlier term pair before applying it: 15×2+1=31 ✓ — both the ×2 AND the +1 are needed every time."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student answers 60, not following any clear consistent rule.",
        rootCause: "Guess Without Rule Verification — proposes a plausible-looking number without deriving or testing the actual ×2+1 rule against the given sequence.",
        remediation: "Test a hypothesis rule against at least two consecutive term-pairs (e.g. does 7=2×3+1? Does 15=2×7+1?) before applying it to find the next term."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student answers 47, adding a fixed amount instead of applying the multiplicative rule.",
        rootCause: "Constant-Difference Default — treats the sequence as simple addition (perhaps adding 16, the most recent difference) instead of recognising the true doubling-plus-one rule.",
        remediation: "Check whether the differences between terms are constant (4, 8, 16 — they are NOT constant, they double each time) to rule out simple addition and confirm a multiplicative rule is needed."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test a doubling-based rule", hint: "Check: 3×2=6, next term is 7. What's the difference between 6 and 7?" },
      { level: 2, description: "Confirm the rule on another pair", hint: "Does 7×2+1=15? Does 15×2+1=31?" },
      { level: 3, description: "Apply the rule to the last term", hint: "31×2+1 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    skillId: "FACT-02",
    question: "A number between 30 and 40 is divisible by both 4 and 6. Give its prime factorisation.",
    options: [
        { text: "2² × 3²", correct: true, feedback: "36 = 4×9 = 2²×3²." },
        { text: "2⁵", correct: false, feedback: "32 is 2⁵, not divisible by 6.", misconceptionId: "E-r7-a" },
        { text: "2 × 17", correct: false, feedback: "34, not divisible by 4 or 6.", misconceptionId: "E-r7-b" },
        { text: "3 × 11", correct: false, feedback: "33, not divisible by 4 or 6.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student picks 2⁵ (32), divisible by 4 but not by 6.",
        rootCause: "Single-Condition Check — verifies the number is divisible by 4 (32÷4=8) and stops, without checking the second condition (divisible by 6); 32÷6 is not a whole number.",
        remediation: "Check every candidate number against BOTH stated divisibility conditions before accepting it, not just the first one tested."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student picks 2×17 (34), which satisfies neither divisibility condition.",
        rootCause: "Range-Only Filtering — picks a number that falls in the numeric range (30-40) without properly checking it against either divisibility condition.",
        remediation: "List multiples of 4 AND multiples of 6 within the range separately, then find the number that appears in both lists, rather than picking any number in range."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student picks 3×11 (33), which satisfies neither divisibility condition.",
        rootCause: "Range-Only Filtering — similarly picks a number in range without checking either divisibility condition against it; 33 is not divisible by 4 or 6.",
        remediation: "Since a number divisible by both 4 and 6 must be divisible by their LCM (12), list multiples of 12 directly and find the one in range (30-40)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the LCM of 4 and 6", hint: "A number divisible by both 4 and 6 must be divisible by LCM(4,6) = 12." },
      { level: 2, description: "Find the multiple of 12 in range", hint: "Multiples of 12: 12,24,36,48... Which one is between 30 and 40?" },
      { level: 3, description: "Prime factorise it", hint: "36 = 4×9. Break each of those down into primes." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    skillId: "MULT-05",
    question: "Two bells ring every 12 min and 18 min. They ring together at 10:00 AM. Next together?",
    options: [
        { text: "10:36 AM", correct: true, feedback: "LCM(12,18)=36 minutes." },
        { text: "10:30 AM", correct: false, feedback: "30 is not the LCM.", misconceptionId: "E-r8-a" },
        { text: "10:24 AM", correct: false, feedback: "24 is not the LCM.", misconceptionId: "E-r8-b" },
        { text: "10:48 AM", correct: false, feedback: "48 is a common multiple but not the least.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student answers 10:30 AM, using 30 minutes (a round, familiar interval) instead of the actual LCM.",
        rootCause: "Round-Number Substitution — defaults to a familiar time interval rather than computing the true LCM of 12 and 18.",
        remediation: "List actual multiples of 12 and 18 side by side and find the first shared number, rather than assuming a round-looking answer."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student answers 10:24 AM, using a multiple of 12 that is not a multiple of 18.",
        rootCause: "Single-Number Multiple Check — verifies the candidate is a multiple of one interval (12) and stops, without checking it's also a multiple of the other (18); 24÷18 is not a whole number.",
        remediation: "Check the candidate against BOTH intervals before accepting it — a multiple of only one of the two bells doesn't mean they ring together."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student answers 10:48 AM, a valid common multiple but not the smallest one.",
        rootCause: "Non-Least Common Multiple — correctly finds A common multiple of both 12 and 18 (48) but doesn't check for a smaller one; 36 is smaller and also works.",
        remediation: "List multiples of both numbers starting from the smallest and take the FIRST one that appears in both lists — don't stop at a later common multiple."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List multiples of each interval", hint: "Bell A (every 12 min): 12,24,36,48... Bell B (every 18 min): 18,36,54..." },
      { level: 2, description: "Find the first shared multiple", hint: "Which number appears in both lists first?" },
      { level: 3, description: "Add to the start time", hint: "Add that many minutes to 10:00 AM." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    skillId: "HCF-02",
    question: "Greatest number that divides 36, 60, and 84 exactly?",
    options: [
        { text: "12", correct: true, feedback: "36=2²×3², 60=2²×3×5, 84=2²×3×7; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "6 divides all but 12 is larger.", misconceptionId: "E-r9-a" },
        { text: "18", correct: false, feedback: "18 does not divide 60 exactly.", misconceptionId: "E-r9-b" },
        { text: "24", correct: false, feedback: "24 does not divide 36 or 60.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student answers 6, a valid common divisor but not the largest.",
        rootCause: "Premature Stop — finds a shared factor (6) and stops, without checking whether a larger common divisor (12) also divides all three numbers.",
        remediation: "Prime-factorise all three numbers and compare across every shared prime, taking the lowest common power of each, rather than stopping at the first shared factor found."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student answers 18, which doesn't divide 60 exactly.",
        rootCause: "Incomplete Divisor Check — verifies the candidate divides some of the numbers but not all three; 60÷18 is not a whole number.",
        remediation: "Require an explicit divisibility check of the candidate against ALL THREE numbers before accepting it as a common divisor."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student answers 24, which doesn't divide 36 or 60.",
        rootCause: "Overreach From a Partial Match — perhaps notices 24 divides 84 (84÷24 is actually not exact either — 84÷24=3.5) or another number and assumes it's a valid common factor without checking all three fully.",
        remediation: "Check the candidate against each of the three numbers one at a time, writing out each division explicitly, before concluding it's a common divisor."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Prime factorise all three numbers", hint: "36=2²×3². 60=2²×3×5. 84=2²×3×7." },
      { level: 2, description: "Find primes common to all three", hint: "Which primes appear in all three factorisations?" },
      { level: 3, description: "Take the lowest shared power", hint: "For 2: lowest power among 2²,2²,2² is 2². For 3: lowest power among 3²,3¹,3¹ is 3¹. Multiply." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    skillId: "DIVR-05",
    question: "Which statement is TRUE? A) Divisible by 8 → divisible by 4. B) Divisible by 4 → divisible by 8. C) Ending in 5 → divisible by 10. D) Divisible by 3 → divisible by 9.",
    options: [
        { text: "A", correct: true, feedback: "If divisible by 8, it's divisible by 2³, so certainly by 2²=4." },
        { text: "B", correct: false, feedback: "12 is divisible by 4 but not 8.", misconceptionId: "E-r10-a" },
        { text: "C", correct: false, feedback: "Ends in 5 means not divisible by 2, so not by 10.", misconceptionId: "E-r10-b" },
        { text: "D", correct: false, feedback: "3 is divisible by 3 but not 9.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks B as the true statement, when it is actually false.",
        rootCause: "Missing Counter-Example Test — doesn't test statement B against a concrete number (like 12: divisible by 4, but 12÷8=1.5, not divisible by 8), incorrectly judging the false statement as true.",
        remediation: "Test every implication statement against a concrete example before deciding — for B, 12 immediately disproves it since it's divisible by 4 but not by 8."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks C as the true statement, when it is actually false.",
        rootCause: "Overgeneralizing the 'ends in 0 or 5' Rule — confuses the rule for divisibility by 5 (ends in 0 or 5) with divisibility by 10 (must end in 0 specifically), missing that a number ending in 5 is odd and therefore can't be divisible by 10.",
        remediation: "Test with a specific number ending in 5, like 15 or 25: is it divisible by 10? Since 15÷10=1.5, this shows the statement is false."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks D as the true statement, when it is actually false.",
        rootCause: "Missing Counter-Example Test — doesn't verify that being divisible by 3 doesn't guarantee divisibility by 9; the number 3 itself is divisible by 3 but not by 9.",
        remediation: "Pick a specific multiple of 3 that ISN'T a multiple of 9 (like 3, 6, 12, or 15) to test statement D and confirm it's false."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test each statement with a real number", hint: "For each of A, B, C, D, pick a concrete example number and check whether the implication holds." },
      { level: 2, description: "Look for counter-examples", hint: "A counter-example is a number where the 'if' part is true but the 'then' part is false. Try 12 for B, 15 for C, and 3 for D." },
      { level: 3, description: "Confirm the remaining one is true", hint: "The one statement where you can't find a counter-example is the true one." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    skillId: "SQNUM-05",
    question: "How many square numbers between 1 and 100 inclusive?",
    options: [
        { text: "10", correct: true, feedback: "1² to 10²: 1,4,9,…,100. That's 10 squares." },
        { text: "9", correct: false, feedback: "You might have excluded 1 or 100.", misconceptionId: "E-r11-a" },
        { text: "11", correct: false, feedback: "Too many.", misconceptionId: "E-r11-b" },
        { text: "8", correct: false, feedback: "Missing some.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student answers 9, likely excluding one of the boundary squares (1 or 100).",
        rootCause: "Boundary Exclusion Error — treats 'inclusive' as if it meant excluding one of the endpoint values (1²=1 or 10²=100), when the question explicitly says both boundaries should be counted.",
        remediation: "List every square from 1² to 10² explicitly (1,4,9,16,25,36,49,64,81,100) and count them one by one, confirming the first (1) and last (100) are both included."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student answers 11, likely including a square outside the range (like 11²=121).",
        rootCause: "Boundary Overcounting — includes a square beyond the upper limit (121>100), not checking each listed square against the actual boundary.",
        remediation: "Check the largest candidate square explicitly against the upper bound: is 11²=121 ≤ 100? Since it isn't, exclude it from the count."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student answers 8, missing two of the valid squares.",
        rootCause: "Incomplete Listing — doesn't systematically list every square from 1² upward, skipping some in the middle of the range.",
        remediation: "List squares systematically starting from 1²: 1²=1, 2²=4, 3²=9... continuing until exceeding 100, checking off each one rather than trying to count them from memory."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List squares from the start", hint: "1²=1, 2²=4, 3²=9, 4²=16, 5²=25..." },
      { level: 2, description: "Continue to the boundary", hint: "Keep going until you reach or pass 100: 9²=81, 10²=100." },
      { level: 3, description: "Count inclusively", hint: "How many squares did you list from 1² to 10², including both ends?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    skillId: "PATT-03",
    question: "nth term = n² + 1. Find the 5th term.",
    options: [
        { text: "26", correct: true, feedback: "5²+1 = 25+1 = 26." },
        { text: "25", correct: false, feedback: "That's just 5².", misconceptionId: "E-r12-a" },
        { text: "24", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-b" },
        { text: "30", correct: false, feedback: "Incorrect.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student answers 25, computing n² but forgetting the '+1' part of the formula.",
        rootCause: "Incomplete Formula Application — correctly computes 5²=25 but drops the '+1' term from the formula, applying only part of the given rule.",
        remediation: "Write out the full formula before substituting: nth term = n²+1, so 5th term = 5²+1, not just 5² — treat the '+1' as a required second step, not optional."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student answers 24, one less than the correct 26.",
        rootCause: "Arithmetic Slip — makes an error either in computing 5²(=25, not 24) or in the final addition, landing one short of the correct answer.",
        remediation: "Break the computation into two explicit checked steps: first 5×5=25, then 25+1=26, verifying each step before moving to the next."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student answers 30, several more than the correct 26.",
        rootCause: "Wrong Operation on n — possibly computes 5×(5+1)=30 (multiplying n by n+1, confusing this with a different formula pattern like the triangular-number rule) instead of correctly computing n² then adding 1.",
        remediation: "Substitute n=5 into the EXACT given formula n²+1 step by step: first square n (5²=25), THEN add 1 — don't substitute n into a different-looking formula from memory."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify n", hint: "You want the 5th term, so n=5." },
      { level: 2, description: "Compute n²", hint: "5² = 5×5 = ?" },
      { level: 3, description: "Add 1", hint: "Take your answer to n² and add 1, since the formula is n²+1." }
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
    title: "Factors, Multiples & Number Properties — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Prime factorisation with exponents, factor counting, LCM/HCF via prime factors, combined divisibility rules, perfect squares, and multi-step patterns.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Multi-Step Number Properties</strong><br>' +
      "&bull; Prime factorisation with exponents: use factor trees; 2³ means 2×2×2.<br>" +
      "&bull; Number of factors = (exponent+1) multiplied across all primes.<br>" +
      "&bull; LCM: take the highest power of each prime factor. HCF: take the lowest power.<br>" +
      "&bull; Useful trick: product of two numbers = LCM × HCF.<br>" +
      "&bull; Combining divisibility rules: for 6, check 2 and 3; for 12, check 4 and 3.<br>" +
      "&bull; Square numbers: all exponents in prime factorisation must be even.<br>" +
      "&bull; Sequences: look for constant difference, doubling, or recursive rules like ×2+1.<br>" +
      "&bull; Triangular numbers: nth term = n(n+1)/2.<br>",
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

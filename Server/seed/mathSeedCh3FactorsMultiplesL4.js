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
    question: "Is 37 prime or composite?",
    options: [
        { text: "Prime", correct: true, feedback: "37 has no divisors other than 1 and 37." },
        { text: "Composite", correct: false, feedback: "37 is not a product of smaller integers." },
        { text: "Neither", correct: false, feedback: "Every integer >1 is either prime or composite." },
        { text: "Both", correct: false, feedback: "Impossible." }
      ],
    retryHint: ""
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "LCM of 6 and 9?",
    options: [
        { text: "18", correct: true, feedback: "Multiples of 6: 6,12,18; of 9: 9,18. Smallest common is 18." },
        { text: "3", correct: false, feedback: "That's the HCF." },
        { text: "36", correct: false, feedback: "Common multiple but not least." },
        { text: "54", correct: false, feedback: "Another common multiple." }
      ],
    retryHint: ""
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "HCF of 15 and 25?",
    options: [
        { text: "5", correct: true, feedback: "15=3×5, 25=5²; HCF=5." },
        { text: "3", correct: false, feedback: "3 is not a factor of 25." },
        { text: "25", correct: false, feedback: "25 is not a factor of 15." },
        { text: "75", correct: false, feedback: "That's the LCM." }
      ],
    retryHint: ""
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Is 312 divisible by 3?",
    options: [
        { text: "Yes (digit sum 6)", correct: true, feedback: "3+1+2=6, which is divisible by 3." },
        { text: "No", correct: false, feedback: "Check the digit sum." },
        { text: "Only if it ends in 3", correct: false, feedback: "Divisibility by 3 is about digit sum, not the last digit." },
        { text: "Cannot say", correct: false, feedback: "We can easily check." }
      ],
    retryHint: ""
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "11² = ?",
    options: [
        { text: "121", correct: true, feedback: "11 × 11 = 121." },
        { text: "111", correct: false, feedback: "Not the square." },
        { text: "144", correct: false, feedback: "That's 12²." },
        { text: "110", correct: false, feedback: "11×10, not squared." }
      ],
    retryHint: ""
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "5, 10, 15, 20, … next?",
    options: [
        { text: "25", correct: true, feedback: "Add 5 each time: 20+5=25." },
        { text: "30", correct: false, feedback: "That would need doubling, but the pattern is additive." },
        { text: "24", correct: false, feedback: "Not following the +5 rule." },
        { text: "50", correct: false, feedback: "Not the pattern." }
      ],
    retryHint: ""
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Which is NOT a factor of 28? 4, 14, 8, 7",
    options: [
        { text: "8", correct: true, feedback: "28 ÷ 8 = 3.5, not an integer." },
        { text: "4", correct: false, feedback: "28 ÷ 4 = 7." },
        { text: "14", correct: false, feedback: "28 ÷ 14 = 2." },
        { text: "7", correct: false, feedback: "28 ÷ 7 = 4." }
      ],
    retryHint: ""
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "First common multiple of 4 and 5?",
    options: [
        { text: "20", correct: true, feedback: "4,8,12,16,20; 5,10,15,20. LCM=20." },
        { text: "9", correct: false, feedback: "Not a multiple of either." },
        { text: "40", correct: false, feedback: "Common but not the first." },
        { text: "1", correct: false, feedback: "Not a common multiple." }
      ],
    retryHint: ""
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "S",
    question: "Which of these is a prime number? 51, 57, 61, 69",
    options: [
        { text: "61", correct: true, feedback: "61 = prime. 51=3×17, 57=3×19, 69=3×23." },
        { text: "51", correct: false, feedback: "51 = 3 × 17." },
        { text: "57", correct: false, feedback: "57 = 3 × 19." },
        { text: "69", correct: false, feedback: "69 = 3 × 23." }
      ],
    backward: "A prime has exactly two distinct factors: 1 and itself.",
    forward: "Prime recognition speeds up factorisation."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "S",
    question: "LCM of 8 and 12?",
    options: [
        { text: "24", correct: true, feedback: "8=2³, 12=2²×3; LCM=2³×3=24." },
        { text: "4", correct: false, feedback: "That's the HCF." },
        { text: "48", correct: false, feedback: "That's the product, not the LCM." },
        { text: "96", correct: false, feedback: "Common multiple but not least." }
      ]
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "S",
    question: "HCF of 24 and 36?",
    options: [
        { text: "12", correct: true, feedback: "24=2³×3, 36=2²×3²; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "Common but not the highest." },
        { text: "72", correct: false, feedback: "That's the LCM." },
        { text: "48", correct: false, feedback: "Not a factor of 36." }
      ]
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "S",
    question: "Which number is divisible by 6? 214, 312, 411, 500",
    options: [
        { text: "312", correct: true, feedback: "Even, digit sum 6 → divisible by 2 and 3." },
        { text: "214", correct: false, feedback: "Even, but digit sum 7 (not ×3)." },
        { text: "411", correct: false, feedback: "Digit sum 6, but odd." },
        { text: "500", correct: false, feedback: "Even, digit sum 5." }
      ]
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "S",
    question: "√196 = ?",
    options: [
        { text: "14", correct: true, feedback: "14 × 14 = 196." },
        { text: "13", correct: false, feedback: "13² = 169." },
        { text: "15", correct: false, feedback: "15² = 225." },
        { text: "16", correct: false, feedback: "16² = 256." }
      ]
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "S",
    question: "2, 4, 8, 16, … next?",
    options: [
        { text: "32", correct: true, feedback: "Multiply by 2 each time." },
        { text: "24", correct: false, feedback: "Adding 8 is not the pattern." },
        { text: "30", correct: false, feedback: "Not doubling." },
        { text: "64", correct: false, feedback: "That would be the term after next." }
      ]
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "T",
    question: "How many factors does 72 have?",
    options: [
        { text: "12", correct: true, feedback: "72=2³×3² → (3+1)(2+1)=12." },
        { text: "6", correct: false, feedback: "That's just the number of prime factors counted with repeats, not the total factor count." },
        { text: "8", correct: false, feedback: "Not correct." },
        { text: "10", correct: false, feedback: "Close, but off by 2." }
      ]
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "T",
    question: "Two numbers have LCM 60 and HCF 5. If one number is 15, the other is?",
    options: [
        { text: "20", correct: true, feedback: "Product = 5×60 = 300; other = 300÷15 = 20." },
        { text: "60", correct: false, feedback: "That's the LCM." },
        { text: "5", correct: false, feedback: "That's the HCF." },
        { text: "30", correct: false, feedback: "Product 15×30=450, but HCF×LCM=300." }
      ]
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "T",
    question: "Product of two numbers is 540, HCF is 6. Find LCM.",
    options: [
        { text: "90", correct: true, feedback: "LCM = product ÷ HCF = 540 ÷ 6 = 90." },
        { text: "6", correct: false, feedback: "That's the HCF." },
        { text: "540", correct: false, feedback: "That's the product." },
        { text: "3240", correct: false, feedback: "That's product × HCF, not correct." }
      ]
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "T",
    question: "Which number is divisible by 2, 3, and 5? 210, 225, 232, 250",
    options: [
        { text: "210", correct: true, feedback: "Ends in 0 (by 2,5), digit sum 3 (by 3)." },
        { text: "225", correct: false, feedback: "Ends in 5, odd (not by 2)." },
        { text: "232", correct: false, feedback: "Digit sum 7, not by 3; also not by 5." },
        { text: "250", correct: false, feedback: "Digit sum 7, not by 3." }
      ]
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "T",
    question: "Which is a perfect square? 2³×3², 2⁴×3², 2²×3³, 2×3⁴",
    options: [
        { text: "2⁴ × 3²", correct: true, feedback: "Exponents 4 and 2 are even → perfect square." },
        { text: "2³ × 3²", correct: false, feedback: "Exponent 3 is odd." },
        { text: "2² × 3³", correct: false, feedback: "Exponent 3 is odd." },
        { text: "2 × 3⁴", correct: false, feedback: "Exponent of 2 is 1 (odd)." }
      ]
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "T",
    question: "1, 1, 2, 3, 5, … next?",
    options: [
        { text: "8", correct: true, feedback: "Fibonacci: each term is the sum of the previous two." },
        { text: "7", correct: false, feedback: "Not following the rule." },
        { text: "10", correct: false, feedback: "Not following the rule." },
        { text: "13", correct: false, feedback: "That would be the term after next." }
      ]
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "C",
    question: "If 2ᵃ × 3² has 12 factors, find a.",
    options: [
        { text: "3", correct: true, feedback: "(a+1)×(2+1) = 12 → a+1 = 4 → a = 3." },
        { text: "2", correct: false, feedback: "Then factors = 3×3 = 9." },
        { text: "4", correct: false, feedback: "Then factors = 5×3 = 15." },
        { text: "1", correct: false, feedback: "Then factors = 2×3 = 6." }
      ]
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "C",
    question: "Three bells ring every 6, 8, and 10 min. They ring together at 12:00. Next together?",
    options: [
        { text: "2:00 PM", correct: true, feedback: "LCM(6,8,10)=120 min = 2 hours." },
        { text: "1:00 PM", correct: false, feedback: "60 min is not the LCM." },
        { text: "1:30 PM", correct: false, feedback: "90 min is not the LCM." },
        { text: "2:30 PM", correct: false, feedback: "150 min is a common multiple but not the least." }
      ]
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF, tier: "C",
    question: "HCF of two numbers is 9. Sum = 63, difference = 9. Find the larger number.",
    options: [
        { text: "36", correct: true, feedback: "Larger = (sum + diff)/2 = (63+9)/2 = 36." },
        { text: "27", correct: false, feedback: "That's the smaller number." },
        { text: "18", correct: false, feedback: "Not consistent with a sum of 63." },
        { text: "45", correct: false, feedback: "The pair sum would be 45+36=81." }
      ]
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR, tier: "C",
    question: "Find the largest digit x such that 4x5 is divisible by 3.",
    options: [
        { text: "9", correct: true, feedback: "Digit sum 4+9+5=18, divisible by 3." },
        { text: "8", correct: false, feedback: "Sum 17, not divisible by 3." },
        { text: "7", correct: false, feedback: "Sum 16, not divisible by 3." },
        { text: "6", correct: false, feedback: "6 works (sum 15) but 9 is larger." }
      ]
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM, tier: "C",
    question: "Area of a square is 121 cm². Perimeter?",
    options: [
        { text: "44 cm", correct: true, feedback: "Side = √121 = 11 cm; perimeter = 4×11 = 44 cm." },
        { text: "11 cm", correct: false, feedback: "That's the side." },
        { text: "22 cm", correct: false, feedback: "That's only half the perimeter." },
        { text: "121 cm", correct: false, feedback: "That's the area." }
      ]
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT, tier: "C",
    question: "nth term = n² − 1. Find the 6th term.",
    options: [
        { text: "35", correct: true, feedback: "6² = 36, minus 1 = 35." },
        { text: "34", correct: false, feedback: "36−2=34, not the formula." },
        { text: "36", correct: false, feedback: "That's just 6²." },
        { text: "25", correct: false, feedback: "That's 5²." }
      ]
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT, tier: "H",
    question: "A number between 50 and 60 has exactly 2 factors and digit sum 8. Find it.",
    options: [
        { text: "53", correct: true, feedback: "Primes in range: 53,59. Digit sum: 5+3=8 (yes), 5+9=14 (no). So 53." },
        { text: "59", correct: false, feedback: "Digit sum 14." },
        { text: "51", correct: false, feedback: "Composite (3×17)." },
        { text: "57", correct: false, feedback: "Composite (3×19)." }
      ]
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT, tier: "H",
    question: "Find the smallest 2-digit number that leaves remainder 5 when divided by 7 and remainder 7 when divided by 9.",
    options: [
        { text: "61", correct: true, feedback: "61÷7=8 R5, 61÷9=6 R7." },
        { text: "47", correct: false, feedback: "47÷9=5 R2, not R7." },
        { text: "68", correct: false, feedback: "68÷7=9 R5, but 68÷9=7 R5, not R7." },
        { text: "75", correct: false, feedback: "75÷7=10 R5, 75÷9=8 R3." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many factors does 96 have? (96 = 2⁵ × 3)",
    options: [
        { text: "12", correct: true, feedback: "(5+1)(1+1)=12." },
        { text: "6", correct: false, feedback: "Too few; recompute (exponent+1) for each prime and multiply." },
        { text: "8", correct: false, feedback: "Recheck the formula: (5+1)×(1+1)." },
        { text: "10", correct: false, feedback: "Close, but not (5+1)×(1+1)." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "LCM of 10 and 15?",
    options: [
        { text: "30", correct: true, feedback: "10=2×5, 15=3×5; LCM=2×3×5=30." },
        { text: "5", correct: false, feedback: "That's the HCF, not the LCM." },
        { text: "150", correct: false, feedback: "That's the product, not the LCM." },
        { text: "60", correct: false, feedback: "A common multiple, but not the least." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "HCF of 36 and 48?",
    options: [
        { text: "12", correct: true, feedback: "36=2²×3², 48=2⁴×3; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "Common but not the highest." },
        { text: "24", correct: false, feedback: "24 is not a factor of 36." },
        { text: "144", correct: false, feedback: "That's the LCM." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which number is divisible by 4? 516, 514, 518, 522",
    options: [
        { text: "516", correct: true, feedback: "Last two digits 16, divisible by 4." },
        { text: "514", correct: false, feedback: "Last two digits 14, not divisible by 4." },
        { text: "518", correct: false, feedback: "Last two digits 18, not divisible by 4." },
        { text: "522", correct: false, feedback: "Last two digits 22, not divisible by 4." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "√225 = ?",
    options: [
        { text: "15", correct: true, feedback: "15×15=225." },
        { text: "14", correct: false, feedback: "14² = 196." },
        { text: "16", correct: false, feedback: "16² = 256." },
        { text: "25", correct: false, feedback: "That's a different number entirely, not the square root." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "3, 9, 27, … next?",
    options: [
        { text: "81", correct: true, feedback: "Multiply by 3 each time." },
        { text: "30", correct: false, feedback: "Adding, not multiplying." },
        { text: "54", correct: false, feedback: "That's ×2, not ×3." },
        { text: "243", correct: false, feedback: "That's the term after next." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Prime factorisation of 84.",
    options: [
        { text: "2² × 3 × 7", correct: true, feedback: "84 = 4×21 = 2²×3×7." },
        { text: "2 × 3 × 14", correct: false, feedback: "14 is not prime; break it into 2×7." },
        { text: "4 × 21", correct: false, feedback: "Neither 4 nor 21 is prime." },
        { text: "2³ × 3 × 7", correct: false, feedback: "That would be 168, not 84." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "LCM of 12 and 18?",
    options: [
        { text: "36", correct: true, feedback: "12=2²×3, 18=2×3²; LCM=2²×3²=36." },
        { text: "6", correct: false, feedback: "That's the HCF." },
        { text: "72", correct: false, feedback: "A common multiple, but not the least." },
        { text: "216", correct: false, feedback: "That's the product, not the LCM." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "If a number is divisible by 9, which must be true?",
    options: [
        { text: "It is also divisible by 3.", correct: true, feedback: "Any multiple of 9 is a multiple of 3." },
        { text: "It is even.", correct: false, feedback: "9 is odd, so not every multiple of 9 is even." },
        { text: "It ends in 9.", correct: false, feedback: "Not all multiples of 9 end in 9 (e.g., 18, 27)." },
        { text: "It is divisible by 6.", correct: false, feedback: "It may not be even, so it may not be divisible by 6." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "The square of a number is 169. Find the number.",
    options: [
        { text: "13", correct: true, feedback: "13 × 13 = 169." },
        { text: "12", correct: false, feedback: "12² = 144." },
        { text: "14", correct: false, feedback: "14² = 196." },
        { text: "17", correct: false, feedback: "17² = 289." }
      ]
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

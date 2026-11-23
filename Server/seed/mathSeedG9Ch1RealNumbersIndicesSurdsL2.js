// Real Numbers, Indices and Surds — Grade 9, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch01-real-numbers-indices-surds-level-2.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch1RealNumbersIndicesSurdsL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-1-real-numbers-indices-surds";
const CHAPTER_NAME = "Real Numbers, Indices and Surds";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "C1": "Number systems and rational numbers",
  "C2": "Decimal expansions",
  "C3": "Irrational numbers and the real line",
  "C4": "Laws of exponents",
  "C5": "Surds",
  "C6": "Mixed real-number problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which list shows these fractions in order, smallest first: \\(\\frac{1}{4}\\), \\(\\frac{10}{11}\\), \\(\\frac{1}{5}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{5}\\), \\(\\frac{1}{4}\\), \\(\\frac{10}{11}\\)",
        "correct": true,
        "feedback": "Correct. Over a common denominator \\(220\\): \\(\\frac{1}{4} = \\frac{55}{220}\\), \\(\\frac{10}{11} = \\frac{200}{220}\\), \\(\\frac{1}{5} = \\frac{44}{220}\\). Smallest first: \\(\\frac{1}{5}\\), \\(\\frac{1}{4}\\), \\(\\frac{10}{11}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\), \\(\\frac{1}{5}\\), \\(\\frac{10}{11}\\)",
        "correct": false,
        "feedback": "Put the fractions in order of their tops, giving \\(\\frac{1}{4}\\), \\(\\frac{1}{5}\\), \\(\\frac{10}{11}\\). A bigger top does not make a bigger fraction: compare using a common denominator."
      },
      {
        "text": "\\(\\frac{10}{11}\\), \\(\\frac{1}{5}\\), \\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Put the fractions in order of their bottoms (biggest bottom first), giving \\(\\frac{10}{11}\\), \\(\\frac{1}{5}\\), \\(\\frac{1}{4}\\). A bigger bottom does not make a bigger fraction: compare using a common denominator."
      },
      {
        "text": "\\(\\frac{10}{11}\\), \\(\\frac{1}{4}\\), \\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Put the fractions in order from largest to smallest, giving \\(\\frac{10}{11}\\), \\(\\frac{1}{4}\\), \\(\\frac{1}{5}\\). The question asks for smallest first."
      }
    ],
    "retryHint": "Write every fraction with the same bottom number, or change each to a decimal, then compare.",
    "backward": "Comparing fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you order decimals and surds by estimating their size."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\((\\frac{4}{5})^{−3}\\)?",
    "options": [
      {
        "text": "\\(−\\frac{12}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{12}{5}\\), multiplying \\((\\frac{4}{5})\\) by \\(−3\\). A power is repeated multiplication, not a product with the power."
      },
      {
        "text": "\\(\\frac{125}{64}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\frac{4}{5})^{−3} = (\\frac{5}{4})^{3} = \\frac{125}{64}\\)."
      },
      {
        "text": "\\(\\frac{64}{125}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{64}{125}\\), ignoring the negative sign in the power and just raising to the power \\(3\\). A negative power turns the fraction upside down first."
      },
      {
        "text": "\\(\\frac{64}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{64}{5}\\), applying the power \\(3\\) only to the top number. The power applies to the whole fraction, top and bottom."
      }
    ],
    "retryHint": "Flip the fraction to remove the negative sign from the power, then apply the power to the top and the bottom.",
    "backward": "Taking the reciprocal of a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you combine negative and fractional powers in one expression."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Choose the fraction whose decimal stops.",
    "options": [
      {
        "text": "\\(\\frac{7}{30}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7}{30}\\). The bottom, \\(30\\), is a multiple of \\(10\\), which can mislead. \\(\\frac{7}{30}\\) cannot be simplified, and a factor of \\(3\\) stays in the bottom, so the decimal recurs."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{12}\\). The bottom, \\(12\\), has a factor of \\(3\\) that does not cancel, so the decimal recurs."
      },
      {
        "text": "\\(\\frac{99}{220}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{99}{220}\\) simplifies to \\(\\frac{9}{20}\\). The bottom \\(20\\) is made only of \\(2s\\) and \\(5s\\), so the decimal terminates. The other fractions keep a factor of \\(3\\) or \\(7\\) in the bottom after simplifying."
      },
      {
        "text": "\\(\\frac{11}{60}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{11}{60}\\). The bottom, \\(60\\), is a multiple of \\(10\\), which can mislead. \\(\\frac{11}{60}\\) cannot be simplified, and a factor of \\(3\\) stays in the bottom, so the decimal recurs."
      }
    ],
    "retryHint": "Simplify each fraction first, then look at the prime factors of the bottom number.",
    "backward": "The decimals that different denominators give, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use powers of \\(2\\) and \\(5\\) to explain which decimals stop."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Write \\(4\\sqrt{32}\\) in the form \\(a\\sqrt{b}\\), where \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(16\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{32} = 4\\sqrt{2}\\), so \\(4\\sqrt{32} = 4 × 4\\sqrt{2} = 16\\sqrt{2}\\)."
      },
      {
        "text": "\\(4\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{2}\\), simplifying \\(\\sqrt{32}\\) but then leaving out the \\(4\\) in front. The \\(4\\) still multiplies the result: \\(4 × 4 = 16\\)."
      },
      {
        "text": "\\(64\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(64\\sqrt{2}\\), using \\(16\\) instead of its root \\(4\\). Only the root of the square factor goes outside."
      },
      {
        "text": "\\(8\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(8\\sqrt{2}\\), adding the \\(4\\) and the \\(4\\). The \\(4\\) in front multiplies the root: \\(4 × 4 = 16\\)."
      }
    ],
    "retryHint": "Simplify \\(\\sqrt{32}\\) first, then multiply the whole numbers outside.",
    "backward": "Taking a square factor out of a root (earlier in this chapter).",
    "forward": "In a later chapter you use the same idea when you simplify the roots in the quadratic formula."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Between which two consecutive whole numbers does \\(\\sqrt{72}\\) lie?",
    "options": [
      {
        "text": "\\(9\\) and \\(10\\)",
        "correct": false,
        "feedback": "Chose \\(9\\) and \\(10\\). \\(9^{2} = 81\\) is already bigger than \\(72\\), so \\(\\sqrt{72}\\) is smaller than \\(9\\) and cannot lie above it."
      },
      {
        "text": "\\(8\\) and \\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(8^{2} = 64\\) and \\(9^{2} = 81\\), and \\(64 &lt; 72 &lt; 81\\), so \\(8 &lt; \\sqrt{72} &lt; 9\\)."
      },
      {
        "text": "\\(64\\) and \\(81\\)",
        "correct": false,
        "feedback": "Chose \\(64\\) and \\(81\\), which are the two perfect squares around \\(72\\). The question asks about \\(\\sqrt{72}\\), so give the square roots of those: \\(8\\) and \\(9\\)."
      },
      {
        "text": "\\(7\\) and \\(8\\)",
        "correct": false,
        "feedback": "Chose \\(7\\) and \\(8\\). \\(8^{2} = 64\\) is already smaller than \\(72\\), so \\(\\sqrt{72}\\) is bigger than \\(8\\) and cannot lie below it."
      }
    ],
    "retryHint": "Find the perfect squares just below and just above the number under the root.",
    "backward": "Estimating a square root between two whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place \\(2\\sqrt{3}\\) and other surds between whole numbers."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "How many of these numbers are integers? \\(\\frac{7}{2}\\), \\(\\frac{0}{3}\\), \\(\\frac{20}{5}\\), \\(2.5\\), \\(0\\), \\(5\\)",
    "options": [
      {
        "text": "\\(4\\) numbers",
        "correct": true,
        "feedback": "Correct. The integers are \\(0\\), \\(5\\), together with \\(\\frac{20}{5} = 4\\) and \\(\\frac{0}{3} = 0\\). That makes \\(4\\) numbers."
      },
      {
        "text": "\\(2\\) numbers",
        "correct": false,
        "feedback": "Chose \\(2\\) numbers. Counted the numbers that are not integers, \\(2\\), instead of the ones that are. The question asks how many are integers."
      },
      {
        "text": "\\(3\\) numbers",
        "correct": false,
        "feedback": "Chose \\(3\\) numbers. Left out one of the integers, giving \\(3\\). Simplify every fraction first: a fraction is an integer when the bottom divides the top exactly."
      },
      {
        "text": "\\(5\\) numbers",
        "correct": false,
        "feedback": "Chose \\(5\\) numbers. Counted \\(2.5\\) as well, giving \\(5\\). \\(2.5\\) lies between two integers, so it is not an integer."
      }
    ],
    "retryHint": "Simplify each fraction first. A number is an integer when it equals a whole number or a negative whole number.",
    "backward": "Integers, decimals and negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you list the integers that satisfy an inequality."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\(25^{5} × 5^{5}\\) as a single power of \\(5\\).",
    "options": [
      {
        "text": "\\(125^{10}\\)",
        "correct": false,
        "feedback": "Chose \\(125^{10}\\), adding the powers and multiplying the bases \\(25 × 5\\). The base stays \\(5\\) once both are written with the same base."
      },
      {
        "text": "\\(5^{15}\\)",
        "correct": true,
        "feedback": "Correct. \\(25 = 5^{2}\\), so \\(25^{5} = 5^{2×5} = 5^{10}\\). Then \\(5^{10} × 5^{5} = 5^{15}\\)."
      },
      {
        "text": "\\(5^{10}\\)",
        "correct": false,
        "feedback": "Chose \\(5^{10}\\), adding the powers \\(5 + 5\\) without changing \\(25\\) to a power of \\(5\\). \\(25 = 5^{2}\\), so \\(25^{5} = 5^{10}\\)."
      },
      {
        "text": "\\(5^{25}\\)",
        "correct": false,
        "feedback": "Chose \\(5^{25}\\), multiplying the powers. When you multiply powers of the same base you add them, after writing \\(25\\) as \\(5^{2}\\)."
      }
    ],
    "retryHint": "First write \\(25\\) as a power of \\(5\\), then use the laws of indices.",
    "backward": "Writing a number as a power of a smaller base, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same idea to solve equations with different bases."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(\\sqrt{50} − \\sqrt{8}\\).",
    "options": [
      {
        "text": "\\(3\\sqrt{4}\\)",
        "correct": false,
        "feedback": "Chose \\(3\\sqrt{4}\\), combining the numbers in front but also adding the numbers under the roots \\((2 + 2)\\). After simplifying, both roots are \\(\\sqrt{2}\\), and that part stays the same."
      },
      {
        "text": "\\(10\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(10\\sqrt{2}\\), multiplying \\(5 × 2\\). After simplifying, the surds are like surds, so only the numbers in front combine: \\(5 − 2 = 3\\)."
      },
      {
        "text": "\\(\\sqrt{42}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{42}\\), subtracting the numbers under the roots. Roots cannot be combined like that: simplify each one first."
      },
      {
        "text": "\\(3\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{50} = 5\\sqrt{2}\\) and \\(\\sqrt{8} = 2\\sqrt{2}\\), so \\(\\sqrt{50} − \\sqrt{8} = (5 − 2)\\sqrt{2} = 3\\sqrt{2}\\)."
      }
    ],
    "retryHint": "Simplify each root first. If the surds then match, combine the numbers in front.",
    "backward": "Simplifying roots before adding them (earlier in this chapter).",
    "forward": "Later in this chapter you use this in mixed problems with decimals and indices."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Here, natural numbers start at \\(1\\) and whole numbers start at \\(0\\). What is the smallest of these sets that contains all of the numbers \\(6\\), \\(0\\), \\(31\\)?",
    "options": [
      {
        "text": "Whole numbers",
        "correct": true,
        "feedback": "Correct. \\(0\\) is a whole number that is not natural, and it needs the biggest set of the numbers shown. That set also contains all the others."
      },
      {
        "text": "Rational numbers",
        "correct": false,
        "feedback": "Chose Rational numbers. It does contain all of the numbers, but the widest number, \\(0\\), only needs whole numbers, so a narrower set fits."
      },
      {
        "text": "Integers",
        "correct": false,
        "feedback": "Chose Integers. It does contain all of the numbers, but the widest number, \\(0\\), only needs whole numbers, so a narrower set fits."
      },
      {
        "text": "Natural numbers",
        "correct": false,
        "feedback": "Chose Natural numbers. \\(0\\) is not in this set, so it cannot contain all of the numbers."
      }
    ],
    "backward": "What each number set contains, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you sort roots and decimals into these sets."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "A learner works out \\(2^{4} × 2^{5} ÷ 2^{2}\\) in three steps. Step 1: \\(2^{4} × 2^{5} = 2^{9}\\); Step 2: \\(2^{9} ÷ 2^{2} = 2^{11}\\); Step 3: \\(2^{11} = 2048\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 2 is wrong: dividing subtracts the powers: \\(9 − 2 = 7\\), not \\(9 + 2 = 11\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: \\(2^{11}\\) means \\(2\\) multiplied by itself \\(11\\) times, which is \\(2048\\)."
      },
      {
        "text": "Step 2",
        "correct": true,
        "feedback": "Correct. Step 2 is where the working goes wrong: dividing subtracts the powers: \\(9 − 2 = 7\\), not \\(9 + 2 = 11\\). The remaining steps all check out, so this is the step to choose."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: multiplying powers of the same base adds the powers, \\(4 + 5 = 9\\)."
      }
    ],
    "backward": "Checking a calculation with powers line by line, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same laws with letters in place of numbers, such as \\(x^{3} × x^{4}\\)."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.181818\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is \\(\\frac{18}{9}\\) simplified: it uses a single \\(9\\) in the bottom although two digits repeat. Two repeating digits need \\(99\\) in the bottom."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.181818\\ldots\\). Then \\(100x = 18.181818\\ldots\\), so \\(100x − x = 18\\), so \\(99x = 18\\) and \\(x = \\frac{18}{99} = \\frac{2}{11}\\)."
      },
      {
        "text": "\\(\\frac{11}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{11}{2}\\), which is the correct fraction upside down. The decimal is less than \\(1\\), so the top must be smaller than the bottom."
      },
      {
        "text": "\\(\\frac{9}{50}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9}{50}\\), which is the decimal \\(0.18\\) written as a fraction. It treats the decimal as if it stopped, but it keeps going, so the value is not exact."
      }
    ],
    "backward": "Multiplying by \\(10\\) or \\(100\\) and subtracting, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use this method on blocks of two and three digits."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(3\\sqrt{6} × 4\\sqrt{3}\\).",
    "options": [
      {
        "text": "\\(36\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(3\\sqrt{6} × 4\\sqrt{3} = (3 × 4) × \\sqrt{6 × 3} = 12\\sqrt{18} = 12×3\\sqrt{2} = 36\\sqrt{2}\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Chose \\(12\\), multiplying the numbers in front and dropping the roots. The product of the roots is \\(\\sqrt{18}\\), which stays in the answer."
      },
      {
        "text": "\\(21\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(21\\sqrt{2}\\), adding the numbers in front \\((3 + 4 = 7)\\) instead of multiplying them. When you multiply, multiply them: \\(3 × 4 = 12\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), adding the numbers under the roots \\((6 + 3 = 9)\\). When you multiply roots you multiply them: \\(6 × 3 = 18\\)."
      }
    ],
    "backward": "Multiplying the numbers in front and the numbers under the roots (earlier in this chapter).",
    "forward": "Later in this chapter you multiply brackets that contain surds."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Between which two consecutive whole numbers does \\(2\\sqrt{73}\\) lie?",
    "options": [
      {
        "text": "\\(17\\) and \\(18\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\sqrt{73} = \\sqrt{2^{2} × 73} = \\sqrt{292}\\), and \\(17^{2} = 289 &lt; 292 &lt; 324 = 18^{2}\\), so it lies between \\(17\\) and \\(18\\)."
      },
      {
        "text": "\\(18\\) and \\(19\\)",
        "correct": false,
        "feedback": "Chose \\(18\\) and \\(19\\), which is one interval too high. \\(18^{2} = 324\\) is already bigger than \\(292 = 2^{2} × 73\\)."
      },
      {
        "text": "\\(16\\) and \\(17\\)",
        "correct": false,
        "feedback": "Chose \\(16\\) and \\(17\\). \\(17^{2} = 289\\) is already smaller than \\(292 = 2^{2} × 73\\), so the value is above \\(17\\)."
      },
      {
        "text": "\\(10\\) and \\(11\\)",
        "correct": false,
        "feedback": "Chose \\(10\\) and \\(11\\), adding \\(2 + 8 = 10\\). The notation \\(2\\sqrt{73}\\) means \\(2 × \\sqrt{73}\\), a product, so the value is much bigger than \\(2 + 8\\)."
      }
    ],
    "backward": "Estimating a square root and then doubling it, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you write \\(a\\sqrt{b}\\) as a single root, \\(\\sqrt{a^{2} × b}\\), and compare surds that way."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Write \\(2^{\\frac{5}{2}}\\) in the form \\(p\\sqrt{q}\\), where \\(q\\) is as small as possible.",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Chose \\(10\\), multiplying \\(2\\) by \\(5\\). A fractional power is not a multiplication."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Chose \\(32\\), using only the top of the fraction as a power and ignoring the square root from the bottom."
      },
      {
        "text": "\\(4\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(2^{\\frac{5}{2}} = (\\sqrt{2})^{5} = 2^{2} × \\sqrt{2} = 4\\sqrt{2}\\)."
      },
      {
        "text": "\\(5\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(5\\sqrt{2}\\), using the top of the fraction \\(5\\) as a number in front. The power \\(\\frac{5}{2}\\) means a square root and a power \\(5\\)."
      }
    ],
    "backward": "A power of one half as a square root (earlier in this chapter).",
    "forward": "In a later chapter you use fractional powers in formulae with square roots."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which fraction lies between \\(\\frac{5}{8}\\) and \\(\\frac{2}{3}\\)?",
    "options": [
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{9}\\), which is smaller than \\(\\frac{5}{8}\\), so it lies below the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{8}\\). That is one of the two end values. Between means strictly inside, so an end value does not count."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2}\\), which is smaller than \\(\\frac{5}{8}\\), so it lies below the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(\\frac{7}{11}\\)",
        "correct": true,
        "feedback": "Correct. With a common denominator \\(24\\), \\(\\frac{5}{8} = \\frac{15}{24}\\) and \\(\\frac{2}{3} = \\frac{16}{24}\\). \\(\\frac{7}{11}\\) is about \\(0.636\\), which is between \\(0.625\\) and \\(0.667\\)."
      }
    ],
    "backward": "Writing equivalent fractions with a larger denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you meet the density of the rational numbers on the number line."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Simplify \\((4x^{3})^{2}\\).",
    "options": [
      {
        "text": "\\(4x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{6}\\), raising only \\(x^{3}\\) to the power \\(2\\) and leaving the coefficient \\(4\\) alone. The power \\(2\\) applies to everything inside the bracket: \\(4^{2} = 16\\)."
      },
      {
        "text": "\\(8x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(8x^{6}\\), multiplying \\(4\\) by \\(2\\). Raising \\(4\\) to the power \\(2\\) means \\(4^{2} = 16\\), not \\(4 × 2\\)."
      },
      {
        "text": "\\(8x^{5}\\)",
        "correct": false,
        "feedback": "Chose \\(8x^{5}\\), multiplying the coefficient by \\(2\\) and adding the powers. Both parts are off: raise \\(4\\) to the power \\(2\\), and multiply the powers of \\(x\\)."
      },
      {
        "text": "\\(16x^{6}\\)",
        "correct": true,
        "feedback": "Correct. \\((4x^{3})^{2} = 4^{2} × x^{3×2} = 16x^{6}\\)."
      }
    ],
    "backward": "Raising a product to a power, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same rule when you expand brackets with powers."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "A learner adds \\(0.333\\ldots\\) and \\(0.111\\ldots\\), writing each as a fraction first, in three steps. Step 1: \\(0.333\\ldots = \\frac{3}{9}\\); Step 2: \\(0.111\\ldots = \\frac{1}{9}\\); Step 3: \\(\\frac{3}{9} + \\frac{1}{9} = \\frac{4}{18}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: fractions are combined over a common bottom, not by adding the tops and adding the bottoms; the result is \\(\\frac{4}{9}\\)."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: one repeating digit gives a \\(9\\) on the bottom: \\(0.111\\ldots = \\frac{1}{9}\\)."
      },
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: fractions are combined over a common bottom, not by adding the tops and adding the bottoms; the result is \\(\\frac{4}{9}\\). Every other step is a correct calculation, so this is the only step to mark."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: one repeating digit gives a \\(9\\) on the bottom: \\(0.333\\ldots = \\frac{3}{9}\\)."
      }
    ],
    "backward": "Adding fractions that have the same denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you turn recurring decimals with longer blocks into fractions."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Write \\(\\frac{3}{\\sqrt{5}}\\) with a whole-number denominator, in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{5}\\), cancelling the root away. The top is multiplied by \\(\\sqrt{5}\\), so the root stays on the top: \\(3\\sqrt{5} ÷ 5\\)."
      },
      {
        "text": "\\(\\frac{3\\sqrt{5}}{5}\\)",
        "correct": true,
        "feedback": "Correct. Multiply top and bottom by \\(\\sqrt{5}\\): \\(\\frac{3}{\\sqrt{5}} = \\frac{3\\sqrt{5}}{5}\\)."
      },
      {
        "text": "\\(3\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(3\\sqrt{5}\\), multiplying the top by \\(\\sqrt{5}\\) but not dividing by the \\(5\\) from \\(\\sqrt{5} × \\sqrt{5}\\). The bottom becomes \\(5\\), so divide by \\(5\\)."
      },
      {
        "text": "\\(15\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(15\\sqrt{5}\\), multiplying by \\(5\\) where you should divide by \\(5\\). After multiplying top and bottom by \\(\\sqrt{5}\\), the bottom is \\(5\\)."
      }
    ],
    "backward": "Equivalent fractions and a root times itself, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you rationalise denominators with two terms."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Use these squares: \\(2.1^{2} = 4.41\\), \\(2.2^{2} = 4.84\\), \\(2.3^{2} = 5.29\\), \\(2.4^{2} = 5.76\\). Between which two numbers, one decimal place apart, does \\(\\sqrt{5}\\) lie?",
    "options": [
      {
        "text": "\\(2.3\\) and \\(2.4\\)",
        "correct": false,
        "feedback": "Chose \\(2.3\\) and \\(2.4\\). Both squares, \\(5.29\\) and \\(5.76\\), are bigger than \\(5\\), so \\(\\sqrt{5}\\) is smaller than both."
      },
      {
        "text": "\\(2.1\\) and \\(2.2\\)",
        "correct": false,
        "feedback": "Chose \\(2.1\\) and \\(2.2\\). Both squares, \\(4.41\\) and \\(4.84\\), are smaller than \\(5\\), so \\(\\sqrt{5}\\) is bigger than both."
      },
      {
        "text": "\\(2.2\\) and \\(2.3\\)",
        "correct": true,
        "feedback": "Correct. \\(4.84 &lt; 5 &lt; 5.29\\), so \\(2.2 &lt; \\sqrt{5} &lt; 2.3\\)."
      },
      {
        "text": "\\(2\\) and \\(3\\)",
        "correct": false,
        "feedback": "Chose \\(2\\) and \\(3\\). \\(\\sqrt{5}\\) does lie there, but those numbers are a whole unit apart. The question asks for two numbers one decimal place apart."
      }
    ],
    "backward": "Squaring decimals and reading from a table, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use a table of squares to bracket a root between two decimals."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Evaluate \\(0.222\\ldots × 27\\sqrt{5}\\). Write the answer as a surd in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{27\\sqrt{5}}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{27\\sqrt{5}}{5}\\), using \\(0.2\\) as \\(\\frac{2}{10}\\). The recurring decimal \\(0.222\\ldots\\) equals \\(\\frac{2}{9}\\), not \\(\\frac{2}{10}\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), working out \\((\\frac{2}{9}) × 27 = 6\\) and dropping the \\(\\sqrt{5}\\). The root stays in the answer."
      },
      {
        "text": "\\(6\\sqrt{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.222\\ldots = \\frac{2}{9}\\), so \\(0.222\\ldots × 27\\sqrt{5} = (\\frac{2}{9}) × 27\\sqrt{5} = 6\\sqrt{5}\\)."
      },
      {
        "text": "\\(54\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(54\\sqrt{5}\\), multiplying by \\(2\\) instead of \\(\\frac{2}{9}\\). The decimal \\(0.222\\ldots\\) equals \\(\\frac{2}{9}\\)."
      }
    ],
    "backward": "Recurring decimals as fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you combine fractions and roots in problems with exact answers."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which rational number is exactly halfway between \\(\\frac{1}{3}\\) and \\(\\frac{3}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{13}{24}\\)",
        "correct": true,
        "feedback": "Correct. \\(((\\frac{1}{3}) + (\\frac{3}{4})) ÷ 2 = \\frac{13}{12} ÷ 2 = \\frac{13}{24}\\)."
      },
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Added the tops and added the bottoms, giving \\(\\frac{4}{7}\\). That is not the halfway value: add the two fractions properly, then halve."
      },
      {
        "text": "\\(\\frac{5}{24}\\)",
        "correct": false,
        "feedback": "Halved the difference, giving \\(\\frac{5}{24}\\). That is half the gap between them, not the number halfway along. Add it to the smaller fraction, or average the pair."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{4}\\), the larger of the two fractions. Halfway lies between them, not at one of them."
      }
    ],
    "backward": "Finding a common denominator, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you find the midpoint of a line segment in coordinate geometry."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Find \\(x\\) when \\(2^{x} = 64\\).",
    "options": [
      {
        "text": "\\(62\\)",
        "correct": false,
        "feedback": "Chose \\(62\\), subtracting \\(2\\) from \\(64\\). The unknown is the power, not a number you subtract."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(2^{1} = 2\\), \\(2^{2} = 4\\), \\(2^{3} = 8\\), \\(2^{4} = 16\\), \\(2^{5} = 32\\), \\(2^{6} = 64\\). So \\(2^{x} = 64\\) gives \\(x = 6\\)."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Chose \\(32\\), dividing \\(64\\) by \\(2\\). The unknown is the power: how many times \\(2\\) is multiplied to reach \\(64\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Chose \\(7\\), counting the list \\(1\\), \\(2\\), \\(4\\), \\(8\\), \\(16\\), \\(32\\), \\(64\\), which has \\(7\\) numbers, not \\(6\\) multiplications of \\(2\\)."
      }
    ],
    "backward": "Powers of \\(2\\), \\(3\\) and \\(5\\) as whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same idea when different bases hide the same power."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Work out \\(0.1111\\ldots + 0.3333\\ldots\\) and give the answer as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{9}\\) by adding the tops and adding the bottoms, \\(\\frac{4}{18}\\). For fractions with the same bottom, the bottom stays \\(9\\)."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Added the decimals as if they stopped after one digit: \\(0.1 + 0.3 = 0.4\\), which is \\(\\frac{2}{5}\\). Both decimals recur, so they are really \\(\\frac{1}{9}\\) and \\(\\frac{3}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{99}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{99}\\), using \\(99\\) in the bottom. A single repeating digit gives a bottom of \\(9\\), not \\(99\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.1111\\ldots = \\frac{1}{9}\\) and \\(0.3333\\ldots = \\frac{3}{9}\\), so the sum is \\(\\frac{1}{9} + \\frac{3}{9} = \\frac{4}{9}\\)."
      }
    ],
    "backward": "Recurring decimals written as fractions over \\(9\\), from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use fractions to show that a recurring decimal is rational."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "A learner simplifies \\(\\sqrt{125} + \\sqrt{45}\\) in three steps. Step 1: \\(\\sqrt{125} = 5\\sqrt{5}\\); Step 2: \\(\\sqrt{45} = 3\\sqrt{5}\\); Step 3: \\(5\\sqrt{5} + 3\\sqrt{5} = 8\\sqrt{10}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: like surds add only the numbers in front: \\(5 + 3 = 8\\), and the root stays \\(\\sqrt{5}\\). The other steps are correct."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: like surds add only the numbers in front: \\(5 + 3 = 8\\), and the root stays \\(\\sqrt{5}\\)."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: \\(\\sqrt{125} = \\sqrt{25 × 5} = 5\\sqrt{5}\\)."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: \\(\\sqrt{45} = \\sqrt{9 × 5} = 3\\sqrt{5}\\)."
      }
    ],
    "backward": "Simplifying roots and adding like terms (earlier in this chapter).",
    "forward": "Later in this chapter you add and subtract surds after simplifying each one."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these facts is NOT correct?",
    "options": [
      {
        "text": "The square root of any perfect square is rational.",
        "correct": false,
        "feedback": "Chose \"The square root of any perfect square is rational.\" This statement is true. For example \\(\\sqrt{169} = 13\\), which is a whole number. So it is not the false one."
      },
      {
        "text": "The decimal expansion of an irrational number never ends and never repeats.",
        "correct": false,
        "feedback": "Chose \"The decimal expansion of an irrational number never ends and never repeats.\" This statement is true. That is exactly what separates irrational numbers from rational ones. So it is not the false one."
      },
      {
        "text": "The decimal \\(0.333\\) is exactly equal to \\(\\frac{1}{3}\\).",
        "correct": true,
        "feedback": "Correct. Counter-example: \\(0.333\\) stops after three places, while \\(\\frac{1}{3} = 0.3333\\ldots\\) never stops, so they are not equal."
      },
      {
        "text": "Every recurring decimal is a rational number.",
        "correct": false,
        "feedback": "Chose \"Every recurring decimal is a rational number.\" This statement is true. A repeating block can always be turned into a fraction, as in \\(0.7777\\ldots = \\frac{7}{9}\\). So it is not the false one."
      }
    ],
    "backward": "Checking a statement against an example, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you decide whether sums and products of surds are rational."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Write \\((\\sqrt{5})^{7}\\) in the form \\(a\\sqrt{b}\\), where \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(625\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(625\\sqrt{5}\\), one pair of roots too many. \\((\\sqrt{5})^{6} = 125\\), so the answer is \\(125\\sqrt{5}\\)."
      },
      {
        "text": "\\(125\\sqrt{5}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{5})^{2} = 5\\), so \\((\\sqrt{5})^{7} = (\\sqrt{5})^{6} × \\sqrt{5} = 5^{3} × \\sqrt{5} = 125\\sqrt{5}\\)."
      },
      {
        "text": "\\(7\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(7\\sqrt{5}\\), treating the power \\(7\\) as a number in front. \\((\\sqrt{5})^{7}\\) means \\(\\sqrt{5}\\) multiplied \\(7\\) times, not \\(7 × \\sqrt{5}\\)."
      },
      {
        "text": "\\(125\\)",
        "correct": false,
        "feedback": "Chose \\(125\\), stopping at \\((\\sqrt{5})^{6} = 125\\). There is still one more \\(\\sqrt{5}\\) to multiply in."
      }
    ],
    "backward": "Pairs of a root multiplying to a whole number (earlier in this chapter).",
    "forward": "Later in this chapter you combine powers of roots with other surds."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which statement is false?",
    "options": [
      {
        "text": "Every integer is a rational number.",
        "correct": false,
        "feedback": "Chose \"Every integer is a rational number.\" This statement is true: every integer is also a rational number, because the sets are nested, so it is not the false one."
      },
      {
        "text": "Every whole number is an integer.",
        "correct": false,
        "feedback": "Chose \"Every whole number is an integer.\" This statement is true: every whole number is also an integer, because the sets are nested, so it is not the false one."
      },
      {
        "text": "Every natural number is an integer.",
        "correct": false,
        "feedback": "Chose \"Every natural number is an integer.\" This statement is true: every natural number is also an integer, because the sets are nested, so it is not the false one."
      },
      {
        "text": "Every integer is a natural number.",
        "correct": true,
        "feedback": "Correct. Counter-example: \\(−2\\) is an integer but not a natural number, so \"Every integer is a natural number.\" is false."
      }
    ],
    "backward": "Testing a statement with an example, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you test statements about roots and recurring decimals."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Simplify \\(9x^{5} ÷ 3x^{2}\\).",
    "options": [
      {
        "text": "\\(3x^{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(9 ÷ 3 = 3\\) and \\(x^{5} ÷ x^{2} = x^{3}\\), so the answer is \\(3x^{3}\\)."
      },
      {
        "text": "\\(3x^{10}\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{10}\\), dividing or multiplying the powers. When you divide, you subtract the powers: \\(5 − 2 = 3\\)."
      },
      {
        "text": "\\(6x^{3}\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{3}\\), subtracting the coefficients \\(9 − 3\\). Dividing terms divides the coefficients: \\(9 ÷ 3 = 3\\)."
      },
      {
        "text": "\\(27x^{3}\\)",
        "correct": false,
        "feedback": "Chose \\(27x^{3}\\), multiplying \\(9 × 3\\). Dividing terms divides the coefficients: \\(9 ÷ 3 = 3\\)."
      }
    ],
    "backward": "Dividing the numbers in front and subtracting the powers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same rules when you cancel algebraic fractions."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "The decimal expansion of \\(\\frac{3}{13}\\) is \\(0.230769230769\\ldots\\) The block of digits repeats for ever. What is the 76th digit after the decimal point?",
    "options": [
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), which is digit number \\(3\\) of the block, one place too early. The remainder \\(4\\) from \\(76 ÷ 6\\) gives digit number \\(4\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), which is digit number \\(5\\) of the block. The remainder \\(4\\) from \\(76 ÷ 6\\) gives the position directly: digit number \\(4\\), not one further on."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. The block \\(230\\,769\\) repeats every \\(6\\) digits. \\(76 ÷ 6\\) leaves remainder \\(4\\), so the 76th digit is digit number \\(4\\) of the block, which is \\(7\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), the first digit of the block. Use the remainder when you divide \\(76\\) by \\(6\\) to find the position."
      }
    ],
    "backward": "Finding a pattern in a repeating block, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the length of a repeating block to see why every fraction gives a repeating or terminating decimal."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Expand and simplify \\((6 + \\sqrt{7})(6 − \\sqrt{7})\\).",
    "options": [
      {
        "text": "\\(29\\)",
        "correct": true,
        "feedback": "Correct. \\((6 + \\sqrt{7})(6 − \\sqrt{7}) = 36 − 6\\sqrt{7} + 6\\sqrt{7} − 7 = 36 − 7 = 29\\)."
      },
      {
        "text": "\\(36 − \\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(36 − \\sqrt{7}\\), forgetting to square \\(\\sqrt{7}\\). \\((\\sqrt{7})^{2} = 7\\), so the answer is \\(36 − 7\\)."
      },
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "Chose \\(43\\), adding \\(36\\) and \\(7\\). The two middle terms cancel, and the last term is \\(−(\\sqrt{7})^{2} = −7\\), so it is \\(36 − 7\\)."
      },
      {
        "text": "\\(43 + 12\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(43 + 12\\sqrt{7}\\), treating the product as a perfect square. The brackets have opposite signs, so the middle terms \\(6\\sqrt{7}\\) and \\(−6\\sqrt{7}\\) cancel."
      }
    ],
    "backward": "Multiplying two brackets that differ only in sign (earlier in this chapter).",
    "forward": "Later in this chapter you use this to rationalise a denominator with two terms."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these numbers is the position of \\(P\\) on the number line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 508 100\" width=\"508\" height=\"100\" role=\"img\" aria-label=\"A number line from 0 to 6 with a tick and label at each whole number; a point P is marked between 3 and 4, clearly nearer 3 than 4.\" font-family=\"Helvetica, Arial, sans-serif\">\n<title>A number line from 0 to 6 with a tick and label at each whole number; a point P is marked between 3 and 4, clearly nearer 3 than 4.</title>\n<line x1=\"18\" y1=\"58\" x2=\"490\" y2=\"58\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<polygon points=\"12,58 22,53 22,63\" fill=\"#1f2937\"/>\n<polygon points=\"496,58 486,53 486,63\" fill=\"#1f2937\"/>\n<line class=\"tick\" x1=\"44\" y1=\"50\" x2=\"44\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"44\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">0</text>\n<line class=\"tick\" x1=\"114\" y1=\"50\" x2=\"114\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"114\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">1</text>\n<line class=\"tick\" x1=\"184\" y1=\"50\" x2=\"184\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"184\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">2</text>\n<line class=\"tick\" x1=\"254\" y1=\"50\" x2=\"254\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"254\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">3</text>\n<line class=\"tick\" x1=\"324\" y1=\"50\" x2=\"324\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"324\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">4</text>\n<line class=\"tick\" x1=\"394\" y1=\"50\" x2=\"394\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"394\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">5</text>\n<line class=\"tick\" x1=\"464\" y1=\"50\" x2=\"464\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"464\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">6</text>\n<circle id=\"P\" cx=\"276.16\" cy=\"58\" r=\"6.5\" fill=\"#1d4ed8\"/>\n<text class=\"point-label\" x=\"276.16\" y=\"40\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"bold\" fill=\"#1d4ed8\">P</text>\n</svg></div>",
    "options": [
      {
        "text": "\\(\\sqrt{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{8}\\). \\(8\\) is less than \\(3^{2} = 9\\), so \\(\\sqrt{8}\\) is less than \\(3\\): it lies to the left of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{18}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{18}\\). \\(18\\) is more than \\(4^{2} = 16\\), so \\(\\sqrt{18}\\) is more than \\(4\\): it lies to the right of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{15}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{15}\\). It lies between \\(3\\) and \\(4\\), but on the other side of the halfway mark: \\(15\\) is more than \\(3.5^{2} = 12.25\\), so \\(\\sqrt{15}\\) is more than \\(3.5\\), the halfway mark, and is nearer \\(4\\). \\(P\\) is nearer \\(3\\)."
      },
      {
        "text": "\\(\\sqrt{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(P\\) is between \\(3\\) and \\(4\\), nearer \\(3\\). \\(3^{2} = 9 &lt; 11 &lt; 16 = 4^{2}\\), and \\(11\\) is less than \\(3.5^{2} = 12.25\\), so \\(\\sqrt{11}\\) is less than \\(3.5\\), the halfway mark, and is nearer \\(3\\). The other roots are in a different interval or nearer \\(4\\)."
      }
    ],
    "backward": "Reading a position on a number line, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place surds such as these on a number line by squaring."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Here, natural numbers start at \\(1\\) and whole numbers start at \\(0\\). What is the smallest of these sets that contains the number \\(0.6 ÷ 0.4\\)?",
    "options": [
      {
        "text": "Natural numbers",
        "correct": false,
        "feedback": "Chose Natural numbers. \\(0.6 ÷ 0.4 = \\frac{3}{2}\\) is not in this set: natural numbers are counting numbers with no fractional part."
      },
      {
        "text": "Integers",
        "correct": false,
        "feedback": "Chose Integers. \\(0.6 ÷ 0.4 = \\frac{3}{2}\\) is not in this set: integers have no fractional part, and this number lies between two integers."
      },
      {
        "text": "Rational numbers",
        "correct": true,
        "feedback": "Correct. \\(0.6 ÷ 0.4 = \\frac{3}{2}\\), which is a rational number that is not an integer."
      },
      {
        "text": "Whole numbers",
        "correct": false,
        "feedback": "Chose Whole numbers. \\(0.6 ÷ 0.4 = \\frac{3}{2}\\) is not in this set: whole numbers have no fractional part."
      }
    ],
    "backward": "Simplifying a number before you name its set, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use these sets to describe the values a letter can take."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "How many integers lie between \\(−5.5\\) and \\(3.25\\)?",
    "options": [
      {
        "text": "\\(5\\) integers",
        "correct": false,
        "feedback": "Counted only the integers below \\(0\\), giving \\(5\\) integers. Zero and the positive integers up to \\(3\\) count as well."
      },
      {
        "text": "\\(4\\) integers",
        "correct": false,
        "feedback": "Counted only from \\(0\\) upwards, giving \\(4\\) integers. The negative integers between \\(−5.5\\) and \\(0\\) count as well."
      },
      {
        "text": "\\(8\\) integers",
        "correct": false,
        "feedback": "Subtracted the end integers, \\(3 − (−5) = 8\\), giving \\(8\\) integers. That counts the gaps, not the integers: there is one more integer than there are gaps."
      },
      {
        "text": "\\(9\\) integers",
        "correct": true,
        "feedback": "Correct. The integers are \\(−5\\), \\(−4\\), \\(−3\\), \\(−2\\), \\(−1\\), \\(0\\), \\(1\\), \\(2\\), \\(3\\), which is \\(9\\) integers."
      }
    ],
    "backward": "Counting integers on a number line, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you describe a set of integers with an inequality such as \\(−3 &lt; n &lt; 2\\)."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which of these operations on two integers can give a number that is NOT an integer?",
    "options": [
      {
        "text": "Adding them",
        "correct": false,
        "feedback": "Chose Adding them. The sum of two integers, such as \\(3 + 5 = 8\\) or \\(−2 + 7 = 5\\), is always an integer."
      },
      {
        "text": "Multiplying them",
        "correct": false,
        "feedback": "Chose Multiplying them. The product of two integers, such as \\(4 × (−3) = −12\\), is always an integer."
      },
      {
        "text": "Subtracting them",
        "correct": false,
        "feedback": "Chose Subtracting them. \\(3 − 5 = −2\\) is negative, but \\(−2\\) is still an integer, so subtracting never leaves the integers."
      },
      {
        "text": "Dividing the first by the second (second ≠ \\(0\\))",
        "correct": true,
        "feedback": "Correct. Dividing can leave the integers: \\(3 ÷ 4 = \\frac{3}{4}\\) is not an integer, although it is rational. Adding, subtracting and multiplying integers always give integers."
      }
    ],
    "backward": "Adding, subtracting, multiplying and dividing whole numbers and fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you see why dividing by a polynomial can leave you outside polynomials in the same way."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Choose the fraction whose decimal repeats for ever.",
    "options": [
      {
        "text": "\\(\\frac{27}{72}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{27}{72}\\). The bottom, \\(72\\), has a factor of \\(3\\) that looks like it makes the decimal recur, but \\(\\frac{27}{72}\\) simplifies to \\(\\frac{3}{8}\\), whose bottom \\(8\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      },
      {
        "text": "\\(\\frac{7}{15}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{15}\\) cannot be simplified, and its bottom \\(15\\) has a factor other than \\(2\\) or \\(5\\), so the decimal recurs. The other fractions simplify to a bottom of only \\(2s\\) and \\(5s\\)."
      },
      {
        "text": "\\(\\frac{11}{44}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{11}{44}\\). The bottom, \\(44\\), has a factor of \\(11\\) that looks like it makes the decimal recur, but \\(\\frac{11}{44}\\) simplifies to \\(\\frac{1}{4}\\), whose bottom \\(4\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      },
      {
        "text": "\\(\\frac{77}{220}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{77}{220}\\). The bottom, \\(220\\), has a factor of \\(11\\) that looks like it makes the decimal recur, but \\(\\frac{77}{220}\\) simplifies to \\(\\frac{7}{20}\\), whose bottom \\(20\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      }
    ],
    "backward": "The decimals that different denominators give, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you meet recurring decimals that this test rules out."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(0.125\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{1}{125}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{125}\\), putting \\(1\\) over the digits \\(125\\). The digits \\(125\\) go on the top, over \\(1000\\): \\(\\frac{125}{1000}\\)."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.125 = \\frac{125}{1000}\\), and dividing top and bottom by their highest common factor gives \\(\\frac{1}{8}\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), which is the fraction upside down. \\(0.125\\) is less than \\(1\\), so the top must be smaller than the bottom."
      },
      {
        "text": "\\(\\frac{25}{1000}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{25}{1000}\\), dividing only the top by \\(5\\). To keep the value, divide the top and the bottom by the same number: \\(\\frac{125}{1000} = \\frac{1}{8}\\)."
      }
    ],
    "backward": "Place value in decimals and simplifying fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you meet decimals that repeat and need a different method."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these numbers cannot be written as a fraction of two integers?",
    "options": [
      {
        "text": "\\(\\sqrt{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(3\\) lies between \\(1\\) and \\(4\\), so it is not a perfect square, and \\(\\sqrt{3}\\) is irrational. The other roots all simplify to fractions or whole numbers."
      },
      {
        "text": "\\(\\sqrt{49}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{49}\\). It looks like a root, but \\(\\sqrt{49} = 7\\), because \\(7 × 7 = 49\\), so it is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt[3]{\\frac{64}{27}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt[3]{\\frac{64}{27}}\\). It looks like a root, but \\(\\sqrt[3]{\\frac{64}{27}} = \\frac{4}{3}\\), because \\((\\frac{4}{3}) × (\\frac{4}{3}) × (\\frac{4}{3}) = \\frac{64}{27}\\), so it is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt{\\frac{25}{9}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{\\frac{25}{9}}\\). It looks like a root, but \\(\\sqrt{\\frac{25}{9}} = \\frac{5}{3}\\), because \\((\\frac{5}{3}) × (\\frac{5}{3}) = \\frac{25}{9}\\), so it is rational, not irrational."
      }
    ],
    "backward": "Simplifying a root before you judge it, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place irrational numbers such as this between two whole numbers on the number line."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these is an irrational number between \\(3\\) and \\(4\\)?",
    "options": [
      {
        "text": "\\(\\sqrt{16}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{16}\\). This equals \\(4\\), which is an end of the interval, not strictly between \\(3\\) and \\(4\\), and it is rational."
      },
      {
        "text": "\\(\\sqrt{18}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{18}\\). This is irrational, but \\(18\\) is bigger than \\(16\\), so \\(\\sqrt{18}\\) is bigger than \\(4\\): it lies outside the interval."
      },
      {
        "text": "\\(\\sqrt{14}\\)",
        "correct": true,
        "feedback": "Correct. \\(9 &lt; 14 &lt; 16\\) and \\(14\\) is not a perfect square, so \\(\\sqrt{14}\\) is irrational and lies between \\(3\\) and \\(4\\)."
      },
      {
        "text": "\\(\\sqrt{12.25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{12.25}\\). This equals \\(3.5 = \\frac{7}{2}\\), which lies between \\(3\\) and \\(4\\) but is rational, not irrational."
      }
    ],
    "backward": "Squares of whole numbers and square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you build irrational numbers between two rational numbers."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(16^{\\frac{3}{2}}\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), which is the top of the fraction on its own. The base \\(16\\) is still there: take the square root of \\(16\\), then raise it to the power \\(3\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), taking only the square root and forgetting the power \\(3\\). \\(16^{\\frac{3}{2}}\\) means root first, then power \\(3\\): \\(4^{3} = 64\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the bottom of the fraction on its own. The bottom is the root; it is not the answer."
      },
      {
        "text": "\\(64\\)",
        "correct": true,
        "feedback": "Correct. \\(16^{\\frac{3}{2}} = (\\sqrt{16})^{3} = 4^{3} = 64\\)."
      }
    ],
    "backward": "Roots of perfect squares and cubes, then powers (earlier in this chapter).",
    "forward": "Later in this chapter you also meet negative fractional powers."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "A culture starts with \\(1\\) bacterium. The number of bacteria doubles every hour. How many bacteria are there after \\(9\\) hours?",
    "options": [
      {
        "text": "\\(256\\)",
        "correct": false,
        "feedback": "Chose \\(256\\), which is \\(2^{8}\\). After \\(9\\) doublings the number is \\(2^{9}\\), one more doubling than that."
      },
      {
        "text": "\\(81\\)",
        "correct": false,
        "feedback": "Chose \\(81\\), working out \\(9^{2}\\). The base is \\(2\\) (it doubles) and the power is \\(9\\) (hours): \\(2^{9}\\)."
      },
      {
        "text": "\\(512\\)",
        "correct": true,
        "feedback": "Correct. The number doubles \\(9\\) times, so it is \\(2^{9} = 512\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Chose \\(18\\), working out \\(2 × 9\\). Doubling \\(9\\) times is \\(2^{9} = 512\\), not \\(2 × 9\\)."
      }
    ],
    "backward": "Repeated doubling, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use powers to model growth and to find how long growth takes."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "A square has area \\(54\\) cm². What is the length of one side, in simplest surd form?",
    "options": [
      {
        "text": "\\(\\frac{27}{2}\\) cm",
        "correct": false,
        "feedback": "Chose \\(\\frac{27}{2}\\) cm, dividing the area by \\(4\\) as if it were a perimeter. The side is the square root of the area."
      },
      {
        "text": "\\(3\\sqrt{6}\\) cm",
        "correct": true,
        "feedback": "Correct. Side = \\(\\sqrt{54} = \\sqrt{9 × 6} = 3\\sqrt{6}\\) cm."
      },
      {
        "text": "\\(6\\sqrt{3}\\) cm",
        "correct": false,
        "feedback": "Chose \\(6\\sqrt{3}\\) cm, swapping the \\(3\\) and the \\(6\\). The square factor \\(9\\) gives \\(3\\) outside; \\(6\\) stays inside."
      },
      {
        "text": "\\(9\\sqrt{6}\\) cm",
        "correct": false,
        "feedback": "Chose \\(9\\sqrt{6}\\) cm, putting \\(9\\) outside the root. Only the root of \\(9\\) comes outside: \\(3\\)."
      }
    ],
    "backward": "Area of a square and its side length, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you also meet lengths that come from areas in mixed problems."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Expand and simplify \\((4 + \\sqrt{2})^{2}\\).",
    "options": [
      {
        "text": "\\(16 + 9\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(16 + 9\\sqrt{2}\\), forgetting to square \\(\\sqrt{2}\\) in the last term. \\((\\sqrt{2})^{2} = 2\\), so the last term is \\(2\\)."
      },
      {
        "text": "\\(18 + 8\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\((4 + \\sqrt{2})^{2} = 4^{2} + 2 × 4 × \\sqrt{2} + (\\sqrt{2})^{2} = 16 + 8\\sqrt{2} + 2 = 18 + 8\\sqrt{2}\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Chose \\(18\\), squaring each term and leaving out the middle term. \\((4 + \\sqrt{2})^{2}\\) has the cross term \\(2 × 4 × \\sqrt{2}\\)."
      },
      {
        "text": "\\(18 + 4\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(18 + 4\\sqrt{2}\\), with only one copy of the cross term. There are two: \\(4 × \\sqrt{2}\\) twice, giving \\(8\\sqrt{2}\\)."
      }
    ],
    "backward": "Squaring a bracket (earlier in this chapter).",
    "forward": "In a later chapter you expand pairs of brackets in the same way with letters."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Between which two consecutive whole numbers does \\(3\\sqrt{2}\\) lie?",
    "options": [
      {
        "text": "\\(3\\) and \\(4\\)",
        "correct": false,
        "feedback": "Chose \\(3\\) and \\(4\\), multiplying \\(3\\) by the whole number below \\(\\sqrt{2}\\). \\(\\sqrt{2}\\) is more than \\(1\\), so \\(3\\sqrt{2}\\) is further along than that."
      },
      {
        "text": "\\(5\\) and \\(6\\)",
        "correct": false,
        "feedback": "Chose \\(5\\) and \\(6\\), one interval too high. \\(5^{2} = 25\\) is bigger than \\(18\\)."
      },
      {
        "text": "\\(16\\) and \\(25\\)",
        "correct": false,
        "feedback": "Chose \\(16\\) and \\(25\\), which are the squares around \\(18\\). The question asks about the root, so give \\(4\\) and \\(5\\)."
      },
      {
        "text": "\\(4\\) and \\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(3\\sqrt{2} = \\sqrt{9 × 2} = \\sqrt{18}\\), and \\(16 &lt; 18 &lt; 25\\), so it lies between \\(4\\) and \\(5\\)."
      }
    ],
    "backward": "Estimating a square root, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you compare surds by estimating them."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\(1.44^{\\frac{1}{2}}\\)?",
    "options": [
      {
        "text": "\\(0.12\\)",
        "correct": false,
        "feedback": "Chose \\(0.12\\), with one decimal place too many. \\(1.44\\) has \\(2\\) decimal places, so its square root has \\(2 ÷ 2 = 1\\)."
      },
      {
        "text": "\\(0.72\\)",
        "correct": false,
        "feedback": "Chose \\(0.72\\), halving \\(1.44\\). A power of \\(\\frac{1}{2}\\) is a square root, not half."
      },
      {
        "text": "\\(1.44\\)",
        "correct": false,
        "feedback": "Chose \\(1.44\\), leaving the number as it is. A power of \\(\\frac{1}{2}\\) means take the square root."
      },
      {
        "text": "\\(1.2\\)",
        "correct": true,
        "feedback": "Correct. \\(1.44 = \\frac{144}{100}\\), so its square root is \\(\\frac{\\sqrt{144}}{\\sqrt{100}} = \\frac{12}{10} = 1.2\\)."
      }
    ],
    "backward": "Square roots of decimals, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet decimals and fractions raised to fractional powers."
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({ grade: GRADE, chapterSlug: CHAPTER_SLUG, chapterName: CHAPTER_NAME, level: LEVEL, phase, ...item }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [{
  grade: GRADE,
  gradeLabel: GRADE_LABEL,
  chapterSlug: CHAPTER_SLUG,
  chapterName: CHAPTER_NAME,
  level: LEVEL,
  title: "Real Numbers, Indices and Surds — Advanced Core",
  subtitle: "Grade 9 · Level 2 · Advanced Core",
  description: "Number sets and rational numbers, decimal expansions, irrational numbers and the real line, laws of indices, and surds — warm-up, diagnostic, and spaced recheck for advanced core.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic that follows is not timed, but the questions now take two steps: for example, simplify first and then combine, or write both numbers with the same base and then use a law of indices. Write each step on paper before you choose. Some options are a half-finished step, so check what form the question asks for. Some questions show a learner's working and ask for the first step that goes wrong. Every wrong option describes a common route, so reading the feedback after each question is part of the work.</p><p>You will meet all six topics, mixed together.</p>",
  timedSeconds: 0
}];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  const filter = { grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL };
  await MathChapter.deleteMany(filter);
  await MathQuestion.deleteMany(filter);
  await MathChapter.insertMany(chapterDocs);
  const inserted = await MathQuestion.insertMany(allQuestions);
  console.log(`Seeded ${CHAPTER_NAME} L${LEVEL}: ${inserted.length} questions (${warmupItems.length} warm-up, ${diagnosticItems.length} diagnostic, ${recheckItems.length} recheck)`);
  await mongoose.disconnect();
}

if (require.main === module) {
  run().catch(err => { console.error('Seed failed:', err); process.exit(1); });
}

module.exports = { chapterDocs, allQuestions };

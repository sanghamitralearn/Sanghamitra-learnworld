// Real Numbers, Indices and Surds — Grade 9, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch01-real-numbers-indices-surds-level-1.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch1RealNumbersIndicesSurdsL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-1-real-numbers-indices-surds";
const CHAPTER_NAME = "Real Numbers, Indices and Surds";
const LEVEL = 1;

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
    "question": "Here, natural numbers start at \\(1\\) and whole numbers start at \\(0\\). What is the smallest of these sets that contains the number \\(48\\)?",
    "options": [
      {
        "text": "Rational numbers",
        "correct": false,
        "feedback": "Chose Rational numbers. Rational numbers include fractions as well as integers, but \\(48\\) needs no fraction, so a narrower set fits: natural numbers."
      },
      {
        "text": "Whole numbers",
        "correct": false,
        "feedback": "Chose Whole numbers. Whole numbers add \\(0\\) to the natural numbers, but \\(48\\) is not \\(0\\), so a narrower set fits: natural numbers."
      },
      {
        "text": "Natural numbers",
        "correct": true,
        "feedback": "Correct. \\(48\\) is a natural number."
      },
      {
        "text": "Integers",
        "correct": false,
        "feedback": "Chose Integers. Integers include negative numbers, but \\(48\\) is not negative, so a narrower set fits: natural numbers."
      }
    ],
    "retryHint": "Work out what the number equals first. Then ask: is it a counting number, zero, a negative whole number, or a fraction?",
    "backward": "Sorting numbers into natural, whole and integer sets, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you decide whether numbers such as roots and decimals are rational."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\(10^{6} × 10^{7}\\) as a single power of \\(10\\).",
    "options": [
      {
        "text": "\\(10^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(10^{6}\\), keeping only the first power. Both powers count: \\(6 + 7 = 13\\)."
      },
      {
        "text": "\\(10^{42}\\)",
        "correct": false,
        "feedback": "Chose \\(10^{42}\\), multiplying the powers: \\(6 × 7 = 42\\). When you multiply numbers with the same base, you add the powers."
      },
      {
        "text": "\\(100^{13}\\)",
        "correct": false,
        "feedback": "Chose \\(100^{13}\\), adding the powers but also multiplying the bases, \\(10 × 10 = 100\\). The base stays \\(10\\); only the powers are added."
      },
      {
        "text": "\\(10^{13}\\)",
        "correct": true,
        "feedback": "Correct. \\(10^{6} × 10^{7} = 10^{6+7} = 10^{13}\\)."
      }
    ],
    "retryHint": "Same base: what do you do with the powers when you multiply?",
    "backward": "What a power means as repeated multiplication, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this law with negative and fractional powers."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Which of these fractions gives a terminating decimal?",
    "options": [
      {
        "text": "\\(\\frac{8}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8}{9}\\). \\(9 = 3 × 3\\), which has the factor \\(3\\), so \\(\\frac{8}{9}\\) cannot stop: its decimal recurs."
      },
      {
        "text": "\\(\\frac{11}{18}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{11}{18}\\). \\(18 = 2 × 3 × 3\\), which has the factor \\(3\\), so \\(\\frac{11}{18}\\) cannot stop: its decimal recurs."
      },
      {
        "text": "\\(\\frac{13}{24}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{13}{24}\\). \\(24 = 2 × 2 × 2 × 3\\), which has the factor \\(3\\), so \\(\\frac{13}{24}\\) cannot stop: its decimal recurs."
      },
      {
        "text": "\\(\\frac{23}{50}\\)",
        "correct": true,
        "feedback": "Correct. \\(50 = 2 × 5 × 5\\), made only of \\(2s\\) and \\(5s\\), so \\(\\frac{23}{50}\\) gives a terminating decimal."
      }
    ],
    "retryHint": "Look at the bottom number. Which prime factors does it have? Only \\(2s\\) and \\(5s\\) give a decimal that stops.",
    "backward": "Prime factors of a number, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you convert recurring decimals back into fractions."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "A surd is a root whose value is irrational. Which of these is a surd?",
    "options": [
      {
        "text": "\\(\\sqrt{0.25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{0.25}\\). This simplifies to \\(\\frac{1}{2}\\), an exact whole number or fraction, so it is not a surd. A surd is a root whose value is irrational."
      },
      {
        "text": "\\(\\sqrt{36}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{36}\\). This simplifies to \\(6\\), an exact whole number or fraction, so it is not a surd. A surd is a root whose value is irrational."
      },
      {
        "text": "\\(\\sqrt{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{6}\\) is a square root and \\(6\\) is not a perfect square (it lies between \\(4\\) and \\(9\\)), so its value is irrational: \\(\\sqrt{6}\\) is a surd."
      },
      {
        "text": "\\(\\pi\\)",
        "correct": false,
        "feedback": "Chose \\(\\pi\\). \\(\\pi\\) is irrational, but it is not a root, so it is not a surd. A surd must be a root that cannot be simplified to a fraction."
      }
    ],
    "retryHint": "Work out each root if you can. A surd is a root you cannot write exactly as a whole number or a fraction.",
    "backward": "Perfect squares and their roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you simplify surds and combine them."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these numbers cannot be written as a fraction of two integers?",
    "options": [
      {
        "text": "\\(\\sqrt{144}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{144}\\). It looks like a root, but \\(\\sqrt{144} = 12\\), because \\(12 × 12 = 144\\), so it is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt{49}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{49}\\). It looks like a root, but \\(\\sqrt{49} = 7\\), because \\(7 × 7 = 49\\), so it is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt[3]{125}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt[3]{125}\\). It looks like a root, but \\(\\sqrt[3]{125} = 5\\), because \\(5 × 5 × 5 = 125\\), so it is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt{30}\\)",
        "correct": true,
        "feedback": "Correct. \\(30\\) lies between \\(25\\) and \\(36\\), so it is not a perfect square, and \\(\\sqrt{30}\\) is irrational. The other roots all simplify to fractions or whole numbers."
      }
    ],
    "retryHint": "Simplify each root if you can. A root that comes out as a whole number or a fraction is rational.",
    "backward": "Square roots of perfect squares, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place irrational numbers such as this between two whole numbers on the number line."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which of these numbers can be written in the form \\(\\frac{p}{q}\\), where \\(p\\) and \\(q\\) are integers and \\(q ≠ 0\\)?",
    "options": [
      {
        "text": "\\(−\\frac{3}{7}\\)",
        "correct": true,
        "feedback": "Correct. \\(−\\frac{3}{7}\\) can be written as a fraction with integer top and bottom, so it is rational."
      },
      {
        "text": "\\(\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{7}\\). \\(7\\) lies between \\(2^{2} = 4\\) and \\(3^{2} = 9\\), so it is not a perfect square and \\(\\sqrt{7}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\pi\\)",
        "correct": false,
        "feedback": "Chose \\(\\pi\\). \\(\\pi\\) is irrational: its decimal never ends and never repeats, so it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\sqrt{19}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{19}\\). \\(19\\) lies between \\(4^{2} = 16\\) and \\(5^{2} = 25\\), so it is not a perfect square and \\(\\sqrt{19}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      }
    ],
    "retryHint": "Ask of each number: does it equal a fraction of two whole numbers? A root of a perfect square does.",
    "backward": "Fractions as numbers of the form \\(\\frac{p}{q}\\), from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you tell rational and irrational numbers apart from their decimal expansions."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\(3^{5} ÷ 3^{2}\\) as a single power of \\(3\\).",
    "options": [
      {
        "text": "\\(3^{10}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{10}\\), multiplying the powers: \\(5 × 2 = 10\\). For division of the same base you subtract the powers."
      },
      {
        "text": "\\(3^{7}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{7}\\), adding the powers: \\(5 + 2 = 7\\). Adding is for multiplying; when you divide, you subtract the powers."
      },
      {
        "text": "\\(3^{5}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{5}\\), leaving out the division by \\(3^{2}\\). Dividing takes \\(2\\) away from the power: \\(5 − 2 = 3\\)."
      },
      {
        "text": "\\(3^{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(3^{5} ÷ 3^{2} = 3^{5−2} = 3^{3}\\)."
      }
    ],
    "retryHint": "Same base: what do you do with the powers when you divide?",
    "backward": "Dividing powers of the same base, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you divide powers where the answer has a negative power."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Write \\(\\sqrt{24}\\) in the form \\(a\\sqrt{b}\\), where \\(a\\) and \\(b\\) are whole numbers and \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(4\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{6}\\), writing \\(4\\) outside the root. Only the root of \\(4\\) comes out: \\(\\sqrt{4} = 2\\), so the number outside is \\(2\\)."
      },
      {
        "text": "\\(2 + \\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(2 + \\sqrt{6}\\), adding. \\(\\sqrt{4 × 6} = \\sqrt{4} × \\sqrt{6}\\): the parts are multiplied, so it is \\(2\\sqrt{6}\\)."
      },
      {
        "text": "\\(6\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(6\\sqrt{2}\\), swapping the numbers. \\(\\sqrt{24} = \\sqrt{4 × 6}\\), and the root of \\(4\\) is \\(2\\), which goes outside; \\(6\\) stays inside the root."
      },
      {
        "text": "\\(2\\sqrt{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(24 = 4 × 6\\) and \\(4\\) is a perfect square, so \\(\\sqrt{24} = \\sqrt{4} × \\sqrt{6} = 2\\sqrt{6}\\)."
      }
    ],
    "retryHint": "Find the largest square number that divides \\(24\\), take its root outside, and leave the rest inside.",
    "backward": "Square factors of a number, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this to add and subtract surds."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "How many of these numbers are integers? \\(2.5\\), \\(−0.25\\), \\(\\frac{12}{4}\\), \\(−4\\), \\(\\frac{0}{3}\\), \\(−\\frac{5}{3}\\)",
    "options": [
      {
        "text": "\\(3\\) numbers",
        "correct": true,
        "feedback": "Correct. The integers are \\(−4\\), together with \\(\\frac{12}{4} = 3\\) and \\(\\frac{0}{3} = 0\\). That makes \\(3\\) numbers."
      },
      {
        "text": "\\(4\\) numbers",
        "correct": false,
        "feedback": "Chose \\(4\\) numbers. Counted \\(2.5\\) as well, giving \\(4\\). \\(2.5\\) lies between two integers, so it is not an integer."
      },
      {
        "text": "\\(5\\) numbers",
        "correct": false,
        "feedback": "Chose \\(5\\) numbers. Counted two of the numbers that are not integers as well, giving \\(5\\). Each of them lies between two integers."
      },
      {
        "text": "\\(1\\) number",
        "correct": false,
        "feedback": "Chose \\(1\\) number. Counted only the numbers written without a fraction bar, \\(1\\). But a fraction such as \\(\\frac{12}{4}\\) simplifies to \\(3\\), which is an integer, so it counts too."
      }
    ],
    "backward": "Simplifying fractions to see whether they are whole numbers, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you count which numbers in a list are rational, irrational or integers."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\((10^{2})^{4}\\) as a single power of \\(10\\).",
    "options": [
      {
        "text": "\\(10^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(10^{6}\\), adding the powers: \\(2 + 4 = 6\\). Adding is for multiplying two powers; for a power of a power you multiply the powers."
      },
      {
        "text": "\\(10^{16}\\)",
        "correct": false,
        "feedback": "Chose \\(10^{16}\\), working out \\(2^{4} = 16\\) for the new power. The two powers are multiplied, \\(2 × 4\\), not raised to one another."
      },
      {
        "text": "\\(10^{8}\\)",
        "correct": true,
        "feedback": "Correct. \\((10^{2})^{4} = 10^{2×4} = 10^{8}\\)."
      },
      {
        "text": "\\(10^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(10^{2}\\), subtracting the powers: \\(4 − 2 = 2\\). For a power of a power you multiply the powers."
      }
    ],
    "backward": "A power of a power, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this law to change a power with a fractional exponent."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(\\frac{7}{25}\\) as a decimal.",
    "options": [
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "Chose \\(0.3\\), which is the decimal rounded to \\(1\\) decimal place. The fraction \\(\\frac{7}{25}\\) gives exactly \\(0.28\\), so do not round it."
      },
      {
        "text": "\\(0.28\\)",
        "correct": true,
        "feedback": "Correct. \\(7 ÷ 25 = 0.28\\)."
      },
      {
        "text": "\\(7.25\\)",
        "correct": false,
        "feedback": "Chose \\(7.25\\), writing the top, a point, then the bottom. The fraction bar means divide: \\(7 ÷ 25\\)."
      },
      {
        "text": "\\(2.8\\)",
        "correct": false,
        "feedback": "Chose \\(2.8\\), which has the decimal point one place too far right. \\(\\frac{7}{25}\\) is less than \\(1\\), so its decimal cannot be bigger than \\(1\\) here."
      }
    ],
    "backward": "Turning a fraction into a decimal with an equivalent fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you check whether a decimal stops or repeats before turning it into a fraction."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(\\sqrt{15} × \\sqrt{7}\\).",
    "options": [
      {
        "text": "\\(\\sqrt{105}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{15} × \\sqrt{7} = \\sqrt{15 × 7} = \\sqrt{105}\\)."
      },
      {
        "text": "\\(\\sqrt{15} + \\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{15} + \\sqrt{7}\\), adding the two roots. The sign is multiply, and the product of two roots is one root: \\(\\sqrt{15 × 7}\\)."
      },
      {
        "text": "\\(\\sqrt{22}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{22}\\), adding the numbers under the roots. When you multiply roots you multiply the numbers: \\(15 × 7 = 105\\)."
      },
      {
        "text": "\\(15\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(15\\sqrt{7}\\), treating \\(\\sqrt{15}\\) as \\(15\\). \\(\\sqrt{15}\\) is not \\(15\\); the two roots multiply as one root, \\(\\sqrt{105}\\)."
      }
    ],
    "backward": "Multiplying numbers under one root sign, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this rule to rationalise a denominator."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Between which two consecutive whole numbers does \\(\\sqrt{107}\\) lie?",
    "options": [
      {
        "text": "\\(11\\) and \\(12\\)",
        "correct": false,
        "feedback": "Chose \\(11\\) and \\(12\\). \\(11^{2} = 121\\) is already bigger than \\(107\\), so \\(\\sqrt{107}\\) is smaller than \\(11\\) and cannot lie above it."
      },
      {
        "text": "\\(100\\) and \\(121\\)",
        "correct": false,
        "feedback": "Chose \\(100\\) and \\(121\\), which are the two perfect squares around \\(107\\). The question asks about \\(\\sqrt{107}\\), so give the square roots of those: \\(10\\) and \\(11\\)."
      },
      {
        "text": "\\(9\\) and \\(10\\)",
        "correct": false,
        "feedback": "Chose \\(9\\) and \\(10\\). \\(10^{2} = 100\\) is already smaller than \\(107\\), so \\(\\sqrt{107}\\) is bigger than \\(10\\) and cannot lie below it."
      },
      {
        "text": "\\(10\\) and \\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(10^{2} = 100\\) and \\(11^{2} = 121\\), and \\(100 &lt; 107 &lt; 121\\), so \\(10 &lt; \\sqrt{107} &lt; 11\\)."
      }
    ],
    "backward": "Square numbers up to \\(15\\) squared, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same squares to place square roots on a number line."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Write \\((\\sqrt{6})^{3}\\) in the form \\(a\\sqrt{b}\\), where \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(216\\)",
        "correct": false,
        "feedback": "Chose \\(216\\), working out \\(6^{3}\\) and dropping the root. \\((\\sqrt{6})^{3}\\) still contains a root when the power is odd."
      },
      {
        "text": "\\(6\\sqrt{6}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{6})^{2} = 6\\), so \\((\\sqrt{6})^{3} = (\\sqrt{6})^{2} × \\sqrt{6} = 6^{1} × \\sqrt{6} = 6\\sqrt{6}\\)."
      },
      {
        "text": "\\(3\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(3\\sqrt{6}\\), treating the power \\(3\\) as a number in front. \\((\\sqrt{6})^{3}\\) means \\(\\sqrt{6}\\) multiplied \\(3\\) times, not \\(3 × \\sqrt{6}\\)."
      },
      {
        "text": "\\(36\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(36\\sqrt{6}\\), one pair of roots too many. \\((\\sqrt{6})^{2} = 6\\), so the answer is \\(6\\sqrt{6}\\)."
      }
    ],
    "backward": "Powers of a square root (earlier in this chapter).",
    "forward": "In a later chapter you meet powers and roots again in quadratic equations."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Only one of these statements is true. Which one?",
    "options": [
      {
        "text": "Every whole number is a rational number.",
        "correct": true,
        "feedback": "Correct. Every whole number is also a rational number, because the sets are nested: natural ⊂ whole ⊂ integers ⊂ rational."
      },
      {
        "text": "Every integer is a whole number.",
        "correct": false,
        "feedback": "Chose \"Every integer is a whole number.\" Counter-example: \\(−2\\) is an integer but not a whole number, so the statement is false."
      },
      {
        "text": "Every rational number is an integer.",
        "correct": false,
        "feedback": "Chose \"Every rational number is an integer.\" Counter-example: \\(\\frac{3}{4}\\) is rational but not an integer, so the statement is false."
      },
      {
        "text": "Every rational number is a natural number.",
        "correct": false,
        "feedback": "Chose \"Every rational number is a natural number.\" Counter-example: \\(\\frac{3}{4}\\) is rational but not a natural number, so the statement is false."
      }
    ],
    "backward": "True and false statements about number sets, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place square roots and decimals into these sets or outside them."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(9^{0} + 4^{0}\\)?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(9^{0} = 1\\) and \\(4^{0} = 1\\), so \\(9^{0} + 4^{0} = 1 + 1 = 2\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Chose \\(13\\), reading the power \\(0\\) as \"do nothing\" and adding \\(9 + 4\\). The power \\(0\\) makes each part \\(1\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), reading \\(4^{0}\\) as \\(4\\) but \\(9^{0}\\) as \\(1\\). Each power \\(0\\) is \\(1\\), so the sum is \\(1 + 1\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Chose \\(10\\), reading \\(9^{0}\\) as \\(9\\) but \\(4^{0}\\) as \\(1\\). Each power \\(0\\) is \\(1\\), so the sum is \\(1 + 1\\)."
      }
    ],
    "backward": "A number to the power zero, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet expressions where the zero power hides inside an algebraic term."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Which of these fractions cannot be written as a decimal that stops?",
    "options": [
      {
        "text": "\\(\\frac{22}{25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{22}{25}\\). \\(25 = 5 × 5\\), made only of \\(2s\\) and \\(5s\\), so \\(\\frac{22}{25}\\) can be scaled up to a power of \\(10\\): its decimal stops."
      },
      {
        "text": "\\(\\frac{5}{21}\\)",
        "correct": true,
        "feedback": "Correct. \\(21 = 3 × 7\\), which has a factor other than \\(2\\) or \\(5\\), so \\(\\frac{5}{21}\\) gives a recurring decimal."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{5}\\). \\(5\\) is a power of \\(2\\) or \\(5\\), made only of \\(2s\\) and \\(5s\\), so \\(\\frac{3}{5}\\) can be scaled up to a power of \\(10\\): its decimal stops."
      },
      {
        "text": "\\(\\frac{3}{16}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{16}\\). \\(16 = 2 × 2 × 2 × 2\\), made only of \\(2s\\) and \\(5s\\), so \\(\\frac{3}{16}\\) can be scaled up to a power of \\(10\\): its decimal stops."
      }
    ],
    "backward": "Simplifying a fraction before you decide, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you decide whether a fraction in an equation gives a terminating decimal."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(8\\sqrt{10} + 3\\sqrt{10}\\).",
    "options": [
      {
        "text": "\\(110\\)",
        "correct": false,
        "feedback": "Chose \\(110\\), treating \\(\\sqrt{10}\\) as \\(10\\). \\(\\sqrt{10}\\) is a surd, not the number \\(10\\); it stays as \\(\\sqrt{10}\\)."
      },
      {
        "text": "\\(24\\sqrt{10}\\)",
        "correct": false,
        "feedback": "Chose \\(24\\sqrt{10}\\), multiplying the numbers \\(8 × 3\\). Adding or subtracting like surds changes only the number in front: \\(8 + 3 = 11\\)."
      },
      {
        "text": "\\(11\\sqrt{20}\\)",
        "correct": false,
        "feedback": "Chose \\(11\\sqrt{20}\\), also adding the numbers under the roots \\((10 + 10)\\). The root part \\(\\sqrt{10}\\) stays the same; only the numbers in front combine."
      },
      {
        "text": "\\(11\\sqrt{10}\\)",
        "correct": true,
        "feedback": "Correct. \\(8\\sqrt{10} + 3\\sqrt{10} = (8 + 3)\\sqrt{10} = 11\\sqrt{10}\\)."
      }
    ],
    "backward": "Adding like terms in algebra, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you simplify each surd first so that unlike-looking surds can be combined."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these facts is correct?",
    "options": [
      {
        "text": "The decimal expansion of an irrational number never ends and never repeats.",
        "correct": true,
        "feedback": "Correct. That is exactly what separates irrational numbers from rational ones."
      },
      {
        "text": "A decimal with a repeating block is irrational.",
        "correct": false,
        "feedback": "Chose \"A decimal with a repeating block is irrational.\" This is false. Counter-example: \\(0.2727\\ldots\\) repeats a block but equals \\(\\frac{3}{11}\\), which is rational."
      },
      {
        "text": "Every square root of a whole number is irrational.",
        "correct": false,
        "feedback": "Chose \"Every square root of a whole number is irrational.\" This is false. Counter-example: \\(\\sqrt{9} = 3\\), which is rational."
      },
      {
        "text": "The sum of two irrational numbers is always irrational.",
        "correct": false,
        "feedback": "Chose \"The sum of two irrational numbers is always irrational.\" This is false. Counter-example: \\(\\sqrt{2} + (−\\sqrt{2}) = 0\\), which is rational."
      }
    ],
    "backward": "Facts about square roots and decimals, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use these facts to decide whether the result of a surd calculation is rational."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\(0.09^{\\frac{1}{2}}\\)?",
    "options": [
      {
        "text": "\\(0.3\\)",
        "correct": true,
        "feedback": "Correct. \\(0.09 = \\frac{9}{100}\\), so its square root is \\(\\frac{\\sqrt{9}}{\\sqrt{100}} = \\frac{3}{10} = 0.3\\)."
      },
      {
        "text": "\\(0.09\\)",
        "correct": false,
        "feedback": "Chose \\(0.09\\), leaving the number as it is. A power of \\(\\frac{1}{2}\\) means take the square root."
      },
      {
        "text": "\\(0.03\\)",
        "correct": false,
        "feedback": "Chose \\(0.03\\), with one decimal place too many. \\(0.09\\) has \\(2\\) decimal places, so its square root has \\(2 ÷ 2 = 1\\)."
      },
      {
        "text": "\\(0.045\\)",
        "correct": false,
        "feedback": "Chose \\(0.045\\), halving \\(0.09\\). A power of \\(\\frac{1}{2}\\) is a square root, not half."
      }
    ],
    "backward": "Decimals as fractions and their roots, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you work with decimals and roots again in percentage and rounding problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which of these is not allowed as a rational number \\(\\frac{p}{q}\\), with \\(p\\) and \\(q\\) integers?",
    "options": [
      {
        "text": "\\(\\frac{0}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{0}{3}\\). This is zero divided by \\(3\\), which equals \\(0\\), and \\(0 = \\frac{0}{1}\\) is rational. Only a bottom of \\(0\\) is not allowed."
      },
      {
        "text": "\\(\\frac{3}{0}\\)",
        "correct": true,
        "feedback": "Correct. The bottom of \\(\\frac{3}{0}\\) is \\(0\\), and dividing by \\(0\\) is not defined, so \\(\\frac{3}{0}\\) is not a number at all. In \\(\\frac{p}{q}\\) the bottom \\(q\\) must not be \\(0\\)."
      },
      {
        "text": "\\(−\\frac{3}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{3}{3}\\). This equals \\(−1\\), a fraction of two integers with a bottom that is not \\(0\\), so it is rational."
      },
      {
        "text": "\\(\\frac{3}{1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{1}\\). This is the whole number \\(3\\) written as a fraction, so it is rational."
      }
    ],
    "backward": "Why you cannot divide by zero, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you meet algebraic fractions and must say which values make the bottom zero."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(2^{−4}\\)?",
    "options": [
      {
        "text": "\\(−8\\)",
        "correct": false,
        "feedback": "Chose \\(−8\\), multiplying \\(2\\) by \\(−4\\). A power is repeated multiplication, not \\(2 × 4\\)."
      },
      {
        "text": "\\(−2\\)",
        "correct": false,
        "feedback": "Chose \\(−2\\), reading \\(2^{−4}\\) as \\(2 − 4\\). The small raised number is a power, not something to subtract."
      },
      {
        "text": "\\(\\frac{1}{16}\\)",
        "correct": true,
        "feedback": "Correct. \\(2^{−4} = \\frac{1}{2^{4}} = \\frac{1}{16}\\)."
      },
      {
        "text": "\\(−16\\)",
        "correct": false,
        "feedback": "Chose \\(−16\\), treating the negative power as a negative number. A negative power means \"reciprocal\": \\(2^{−4} = \\frac{1}{16}\\)."
      }
    ],
    "backward": "Negative powers as reciprocals, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use negative powers in fractions and in standard form."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(0.65\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{13}{100}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{13}{100}\\), dividing only the top by \\(5\\). To keep the value, divide the top and the bottom by the same number: \\(\\frac{65}{100} = \\frac{13}{20}\\)."
      },
      {
        "text": "\\(\\frac{13}{20}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.65 = \\frac{65}{100}\\), and dividing top and bottom by their highest common factor gives \\(\\frac{13}{20}\\)."
      },
      {
        "text": "\\(\\frac{65}{1000}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{65}{1000}\\), using \\(1000\\) for the bottom. \\(0.65\\) has \\(2\\) decimal places, so the bottom is \\(1\\) followed by \\(2\\) zeros, not \\(3\\): \\(100\\)."
      },
      {
        "text": "\\(\\frac{1}{65}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{65}\\), putting \\(1\\) over the digits \\(65\\). The digits \\(65\\) go on the top, over \\(100\\): \\(\\frac{65}{100}\\)."
      }
    ],
    "backward": "Place value in decimals and simplifying fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you use the same place-value idea to write recurring decimals as fractions."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(\\sqrt{14} ÷ \\sqrt{2}\\).",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Chose \\(7\\), dividing the numbers but forgetting the root. The answer is \\(\\sqrt{7}\\)."
      },
      {
        "text": "\\(\\sqrt{12}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{12}\\), subtracting the numbers under the roots. When you divide roots you divide the numbers: \\(14 ÷ 2 = 7\\)."
      },
      {
        "text": "\\(\\sqrt{7}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{14} ÷ \\sqrt{2} = \\sqrt{14 ÷ 2} = \\sqrt{7}\\)."
      },
      {
        "text": "\\(\\frac{\\sqrt{14}}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{\\sqrt{14}}{2}\\), dividing by \\(2\\) outside the root instead of by \\(\\sqrt{2}\\). The divisor is \\(\\sqrt{2}\\), so divide under the root: \\(14 ÷ 2 = 7\\)."
      }
    ],
    "backward": "Dividing numbers under one root sign, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use division of surds to rationalise denominators."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these decimals cannot be written as a fraction?",
    "options": [
      {
        "text": "\\(0.123456789101112\\ldots\\) (the whole numbers in order)",
        "correct": true,
        "feedback": "Correct. In \\(0.123456789101112\\ldots\\), the digits are the whole numbers written one after another, so the pattern never repeats. A decimal that never ends and never repeats is irrational."
      },
      {
        "text": "\\(2.718\\) (the decimal stops here)",
        "correct": false,
        "feedback": "Chose \\(2.718\\) (the decimal stops here). This is rational: the decimal stops, so it equals \\(\\frac{2718}{1000}\\) and is rational."
      },
      {
        "text": "\\(0.142857142857\\ldots\\) (the block \\(142\\,857\\) repeats)",
        "correct": false,
        "feedback": "Chose \\(0.142857142857\\ldots\\) (the block \\(142\\,857\\) repeats). This is rational: the block \\(142\\,857\\) repeats for ever, so it is recurring and rational, equal to \\(\\frac{1}{7}\\)."
      },
      {
        "text": "\\(0.363636\\ldots\\) (the block \\(36\\) repeats)",
        "correct": false,
        "feedback": "Chose \\(0.363636\\ldots\\) (the block \\(36\\) repeats). This is rational: the block \\(36\\) repeats for ever, so the decimal is recurring and rational, equal to \\(\\frac{4}{11}\\)."
      }
    ],
    "backward": "Terminating and recurring decimals, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use these decimal patterns to decide which numbers on the real line are irrational."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\((\\sqrt{6})^{−4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{6})^{−4} = \\frac{1}{(\\sqrt{6})^{4}} = \\frac{1}{36}\\)."
      },
      {
        "text": "\\(\\frac{1}{24}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{24}\\), taking \\(\\frac{1}{4 × 6}\\). The power \\(4\\) means multiply \\(\\sqrt{6}\\) by itself, not multiply \\(6\\) by \\(4\\): \\((\\sqrt{6})^{4} = 36\\)."
      },
      {
        "text": "\\(\\frac{1}{1296}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{1296}\\), raising \\(6\\) to the power \\(4\\) instead of \\(\\sqrt{6}\\). \\((\\sqrt{6})^{4} = 36\\), so the answer is \\(\\frac{1}{36}\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), ignoring the negative sign in the power. A negative power means take the reciprocal."
      }
    ],
    "backward": "Negative powers and powers of a root (earlier in this chapter).",
    "forward": "Later in this chapter you meet negative powers again in standard form."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Exactly one of these roots is rational. Which one?",
    "options": [
      {
        "text": "\\(\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{2}\\). \\(2\\) lies between \\(1^{2} = 1\\) and \\(2^{2} = 4\\), so it is not a perfect square and \\(\\sqrt{2}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{3}\\). \\(3\\) lies between \\(1^{2} = 1\\) and \\(2^{2} = 4\\), so it is not a perfect square and \\(\\sqrt{3}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\sqrt{\\frac{1}{9}}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{\\frac{1}{9}} = \\frac{1}{3}\\), a fraction of two integers, so it is rational even though it is written with a root."
      },
      {
        "text": "\\(\\sqrt{21}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{21}\\). \\(21\\) lies between \\(4^{2} = 16\\) and \\(5^{2} = 25\\), so it is not a perfect square and \\(\\sqrt{21}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      }
    ],
    "backward": "Square roots of perfect squares, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you check whether roots and recurring decimals can be written as fractions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Simplify \\(4x^{4} × 3x^{5}\\).",
    "options": [
      {
        "text": "\\(12x^{20}\\)",
        "correct": false,
        "feedback": "Chose \\(12x^{20}\\), multiplying the powers \\(4 × 5\\). When you multiply, you add the powers: \\(4 + 5 = 9\\)."
      },
      {
        "text": "\\(12x^{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(4 × 3 = 12\\) and \\(x^{4} × x^{5} = x^{9}\\), so the answer is \\(12x^{9}\\)."
      },
      {
        "text": "\\(7x^{20}\\)",
        "correct": false,
        "feedback": "Chose \\(7x^{20}\\), adding the coefficients and multiplying the powers. Do the opposite: multiply the coefficients, add the powers."
      },
      {
        "text": "\\(12x^{1}\\)",
        "correct": false,
        "feedback": "Chose \\(12x^{1}\\), subtracting the powers. Subtracting is for dividing; here you multiply, so you add: \\(9\\)."
      }
    ],
    "backward": "Multiplying the numbers in front and adding the powers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same rules when you expand and factorise."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(\\frac{5}{9}\\) as a decimal.",
    "options": [
      {
        "text": "\\(0.55\\)",
        "correct": false,
        "feedback": "Chose \\(0.55\\), which stops after two blocks. The block \\(5\\) repeats for ever."
      },
      {
        "text": "\\(0.5\\)",
        "correct": false,
        "feedback": "Chose \\(0.5\\), stopping after the digits shown as if the decimal ended. \\(\\frac{5}{9}\\) never ends: the digit \\(5\\) keeps repeating, so the decimal is not terminating."
      },
      {
        "text": "\\(0.555\\ldots\\)",
        "correct": true,
        "feedback": "Correct. \\(5 ÷ 9 = 0.555\\ldots\\): the digit \\(5\\) repeats for ever."
      },
      {
        "text": "\\(0.56\\)",
        "correct": false,
        "feedback": "Chose \\(0.56\\), which is the decimal rounded to \\(2\\) decimal places. A rounded decimal ends, but \\(\\frac{5}{9}\\) does not: its exact form repeats for ever."
      }
    ],
    "backward": "Dividing the top number by the bottom when digits repeat, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you convert recurring decimals such as this back into fractions."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "What is the value of \\((4\\sqrt{7})^{2}\\)?",
    "options": [
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Chose \\(23\\), adding \\(4^{2}\\) and \\(7\\). The square of a product is a product: \\(16 × 7\\)."
      },
      {
        "text": "\\(112\\)",
        "correct": true,
        "feedback": "Correct. \\((4\\sqrt{7})^{2} = 4^{2} × (\\sqrt{7})^{2} = 16 × 7 = 112\\)."
      },
      {
        "text": "\\(16\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(16\\sqrt{7}\\), squaring the \\(4\\) but not the \\(\\sqrt{7}\\). Squaring \\(\\sqrt{7}\\) gives \\(7\\), so the whole answer is \\(16 × 7 = 112\\)."
      },
      {
        "text": "\\(8\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(8\\sqrt{7}\\), doubling instead of squaring. Squaring means multiplying the whole thing by itself."
      }
    ],
    "backward": "Squaring a product, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you square brackets such as \\((2 + \\sqrt{3})^{2}\\)."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Use these squares: \\(3.6^{2} = 12.96\\), \\(3.7^{2} = 13.69\\), \\(3.8^{2} = 14.44\\), \\(3.9^{2} = 15.21\\). Between which two numbers, one decimal place apart, does \\(\\sqrt{14}\\) lie?",
    "options": [
      {
        "text": "\\(3.6\\) and \\(3.7\\)",
        "correct": false,
        "feedback": "Chose \\(3.6\\) and \\(3.7\\). Both squares, \\(12.96\\) and \\(13.69\\), are smaller than \\(14\\), so \\(\\sqrt{14}\\) is bigger than both."
      },
      {
        "text": "\\(3.8\\) and \\(3.9\\)",
        "correct": false,
        "feedback": "Chose \\(3.8\\) and \\(3.9\\). Both squares, \\(14.44\\) and \\(15.21\\), are bigger than \\(14\\), so \\(\\sqrt{14}\\) is smaller than both."
      },
      {
        "text": "\\(3\\) and \\(4\\)",
        "correct": false,
        "feedback": "Chose \\(3\\) and \\(4\\). \\(\\sqrt{14}\\) does lie there, but those numbers are a whole unit apart. The question asks for two numbers one decimal place apart."
      },
      {
        "text": "\\(3.7\\) and \\(3.8\\)",
        "correct": true,
        "feedback": "Correct. \\(13.69 &lt; 14 &lt; 14.44\\), so \\(3.7 &lt; \\sqrt{14} &lt; 3.8\\)."
      }
    ],
    "backward": "Squaring decimals and reading from a table, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same idea of squeezing a number between two close values to solve equations numerically."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Between which two consecutive whole numbers does \\(2\\sqrt{2}\\) lie?",
    "options": [
      {
        "text": "\\(4\\) and \\(9\\)",
        "correct": false,
        "feedback": "Chose \\(4\\) and \\(9\\), which are the squares around \\(8\\). The question asks about the root, so give \\(2\\) and \\(3\\)."
      },
      {
        "text": "\\(1\\) and \\(2\\)",
        "correct": false,
        "feedback": "Chose \\(1\\) and \\(2\\), one interval too low. \\(2^{2} = 4\\) is smaller than \\(8\\), so the value is above \\(2\\)."
      },
      {
        "text": "\\(3\\) and \\(4\\)",
        "correct": false,
        "feedback": "Chose \\(3\\) and \\(4\\), one interval too high. \\(3^{2} = 9\\) is bigger than \\(8\\)."
      },
      {
        "text": "\\(2\\) and \\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\sqrt{2} = \\sqrt{4 × 2} = \\sqrt{8}\\), and \\(4 &lt; 8 &lt; 9\\), so it lies between \\(2\\) and \\(3\\)."
      }
    ],
    "backward": "Estimating a square root, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you estimate lengths with surds in geometry."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which fraction lies between \\(\\frac{2}{9}\\) and \\(\\frac{1}{3}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{5}\\), which is smaller than \\(\\frac{2}{9}\\), so it lies below the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{11}\\), which is smaller than \\(\\frac{2}{9}\\), so it lies below the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. With a common denominator \\(27\\), \\(\\frac{2}{9} = \\frac{6}{27}\\) and \\(\\frac{1}{3} = \\frac{9}{27}\\). \\(\\frac{1}{4}\\) is about \\(0.250\\), which is between \\(0.222\\) and \\(0.333\\)."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{9}\\). That is one of the two end values. Between means strictly inside, so an end value does not count."
      }
    ],
    "backward": "Comparing fractions over a common denominator, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you find rational numbers on a number line between two given points."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which rational number is exactly halfway between \\(\\frac{2}{3}\\) and \\(\\frac{5}{6}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Added the two fractions and stopped, giving \\(\\frac{3}{2}\\). Halfway means half of the sum, so divide by \\(2\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(((\\frac{2}{3}) + (\\frac{5}{6})) ÷ 2 = \\frac{3}{2} ÷ 2 = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Halved the difference, giving \\(\\frac{1}{12}\\). That is half the gap between them, not the number halfway along. Add it to the smaller fraction, or average the pair."
      },
      {
        "text": "\\(\\frac{7}{9}\\)",
        "correct": false,
        "feedback": "Added the tops and added the bottoms, giving \\(\\frac{7}{9}\\). That is not the halfway value: add the two fractions properly, then halve."
      }
    ],
    "backward": "Adding and halving fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the idea that there is always another rational number between two rational numbers."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.777\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{9}{7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9}{7}\\), which is the correct fraction upside down. The decimal is less than \\(1\\), so the top must be smaller than the bottom."
      },
      {
        "text": "\\(\\frac{7}{9}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.777\\ldots\\). Then \\(10x = 7.777\\ldots\\), so \\(10x − x = 7\\), so \\(9x = 7\\) and \\(x = \\frac{7}{9}\\)."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7}{10}\\), which is the decimal \\(0.7\\) written as a fraction. It treats the decimal as if it stopped, but it keeps going, so the value is not exact."
      },
      {
        "text": "\\(\\frac{7}{99}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7}{99}\\), using \\(99\\) in the bottom although only one digit repeats. One repeating digit needs a single \\(9\\) in the bottom."
      }
    ],
    "backward": "Recurring decimals and their repeating blocks, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you add and compare such numbers as exact fractions instead of rounded decimals."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "How many digits come after the decimal point when \\(\\frac{33}{40}\\) is written as a decimal?",
    "options": [
      {
        "text": "\\(3\\) decimal places",
        "correct": true,
        "feedback": "Correct. \\(40 = 2^{3} × 5^{1}\\). Scaling to a power of \\(10\\) needs \\(10^{3}\\), so the decimal has \\(3\\) decimal places: \\(\\frac{33}{40} = 0.825\\)."
      },
      {
        "text": "\\(4\\) decimal places",
        "correct": false,
        "feedback": "Added the two powers, \\(3 + 1 = 4\\), giving \\(4\\) decimal places. The decimal needs as many places as the LARGER of the two powers, not the total."
      },
      {
        "text": "\\(1\\) decimal place",
        "correct": false,
        "feedback": "Used the smaller power, giving \\(1\\) decimal place. You need enough places for the larger power, because the bottom must be scaled up to a power of \\(10\\)."
      },
      {
        "text": "\\(2\\) decimal places",
        "correct": false,
        "feedback": "Counted the digits of the bottom number \\(40\\), giving \\(2\\) decimal places. The number of places depends on the powers of \\(2\\) and \\(5\\) in \\(40\\), not on how many digits it has."
      }
    ],
    "backward": "Prime factors \\(2\\) and \\(5\\) in a denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use powers of \\(2\\) and \\(5\\) to predict whether a decimal terminates."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these is an irrational number between \\(4\\) and \\(5\\)?",
    "options": [
      {
        "text": "\\(\\sqrt{20.25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{20.25}\\). This equals \\(4.5 = \\frac{9}{2}\\), which lies between \\(4\\) and \\(5\\) but is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt{33}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{33}\\). This is irrational, but \\(33\\) is bigger than \\(25\\), so \\(\\sqrt{33}\\) is bigger than \\(5\\): it lies outside the interval."
      },
      {
        "text": "\\(\\sqrt{25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{25}\\). This equals \\(5\\), which is an end of the interval, not strictly between \\(4\\) and \\(5\\), and it is rational."
      },
      {
        "text": "\\(\\sqrt{24}\\)",
        "correct": true,
        "feedback": "Correct. \\(16 &lt; 24 &lt; 25\\) and \\(24\\) is not a perfect square, so \\(\\sqrt{24}\\) is irrational and lies between \\(4\\) and \\(5\\)."
      }
    ],
    "backward": "Squares of whole numbers and square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you find irrational numbers between given rational numbers using squares."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Exactly one of these expressions is irrational. Which one?",
    "options": [
      {
        "text": "\\((\\sqrt{2} + 1)(\\sqrt{2} − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((\\sqrt{2} + 1)(\\sqrt{2} − 1)\\). This simplifies to \\(2 − 1 = 1\\), a whole number, so it is rational."
      },
      {
        "text": "\\(\\sqrt{5} + \\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{5} + \\sqrt{2}\\) cannot be simplified to a whole number or a fraction: it still contains a root that is not a perfect square, so it is irrational. The other three simplify to whole numbers."
      },
      {
        "text": "\\((\\sqrt{5})^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((\\sqrt{5})^{2}\\). This simplifies to \\(5\\), a whole number, so it is rational."
      },
      {
        "text": "\\((\\sqrt{7})^{2} − 3\\)",
        "correct": false,
        "feedback": "Chose \\((\\sqrt{7})^{2} − 3\\). This simplifies to \\(7 − 3 = 4\\), a whole number, so it is rational."
      }
    ],
    "backward": "Sums and products of square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you simplify surds like these and see when a product of surds is rational."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(27^{\\frac{1}{3}}\\)?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), dividing \\(27\\) by \\(3\\). A power of \\(\\frac{1}{3}\\) is not division by \\(3\\): it is the cube root."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(27^{\\frac{1}{3}}\\) is the cube root of \\(27\\), and \\(3^{3} = 27\\), so it equals \\(3\\)."
      },
      {
        "text": "\\(81\\)",
        "correct": false,
        "feedback": "Chose \\(81\\), multiplying \\(27\\) by \\(3\\). A power of \\(\\frac{1}{3}\\) is a root, not a multiple."
      },
      {
        "text": "\\(19\\,683\\)",
        "correct": false,
        "feedback": "Chose \\(19\\,683\\), reading the power \\(\\frac{1}{3}\\) as \\(3\\). A power of \\(\\frac{1}{3}\\) means \"the cube root\", not \"to the power \\(3\\)\"."
      }
    ],
    "backward": "Square roots and cube roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you combine this with powers such as \\(8^{\\frac{2}{3}}\\)."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\((\\frac{1}{2})^{−3}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2}\\), applying the power \\(3\\) only to the top number. The power applies to the whole fraction, top and bottom."
      },
      {
        "text": "\\(−\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{3}{2}\\), multiplying \\((\\frac{1}{2})\\) by \\(−3\\). A power is repeated multiplication, not a product with the power."
      },
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\((\\frac{1}{2})^{−3} = (2)^{3} = 8\\)."
      },
      {
        "text": "\\(−\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{1}{8}\\), treating the negative power as a negative number. The answer is the reciprocal fraction to the power \\(3\\), which is positive."
      }
    ],
    "backward": "Taking the reciprocal of a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you combine negative and fractional powers in one expression."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(2\\sqrt{7} + 4\\sqrt{7}\\).",
    "options": [
      {
        "text": "\\(6\\sqrt{7}\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\sqrt{7} + 4\\sqrt{7} = (2 + 4)\\sqrt{7} = 6\\sqrt{7}\\)."
      },
      {
        "text": "\\(6\\sqrt{14}\\)",
        "correct": false,
        "feedback": "Chose \\(6\\sqrt{14}\\), also adding the numbers under the roots \\((7 + 7)\\). The root part \\(\\sqrt{7}\\) stays the same; only the numbers in front combine."
      },
      {
        "text": "\\(8\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(8\\sqrt{7}\\), multiplying the numbers \\(2 × 4\\). Adding or subtracting like surds changes only the number in front: \\(2 + 4 = 6\\)."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "Chose \\(42\\), treating \\(\\sqrt{7}\\) as \\(7\\). \\(\\sqrt{7}\\) is a surd, not the number \\(7\\); it stays as \\(\\sqrt{7}\\)."
      }
    ],
    "backward": "Adding like terms in algebra, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet surds that must be simplified before they can be added."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(\\sqrt{5} × \\sqrt{14}\\).",
    "options": [
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Chose \\(70\\), multiplying \\(5 × 14\\) and forgetting the root. The product of the roots is the root of the product: \\(\\sqrt{70}\\)."
      },
      {
        "text": "\\(5\\sqrt{14}\\)",
        "correct": false,
        "feedback": "Chose \\(5\\sqrt{14}\\), treating \\(\\sqrt{5}\\) as \\(5\\). \\(\\sqrt{5}\\) is not \\(5\\); the two roots multiply as one root, \\(\\sqrt{70}\\)."
      },
      {
        "text": "\\(\\sqrt{5} + \\sqrt{14}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{5} + \\sqrt{14}\\), adding the two roots. The sign is multiply, and the product of two roots is one root: \\(\\sqrt{5 × 14}\\)."
      },
      {
        "text": "\\(\\sqrt{70}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{5} × \\sqrt{14} = \\sqrt{5 × 14} = \\sqrt{70}\\)."
      }
    ],
    "backward": "Multiplying numbers under one root sign, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this rule to rationalise a denominator."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Which of these numbers is irrational?",
    "options": [
      {
        "text": "\\(9^{−\\frac{1}{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(9^{−\\frac{1}{2}}\\). This equals \\(\\frac{1}{3}\\), which is rational, so it is not the irrational one."
      },
      {
        "text": "\\(8^{\\frac{1}{3}}\\)",
        "correct": false,
        "feedback": "Chose \\(8^{\\frac{1}{3}}\\). This equals \\(2\\), which is rational, so it is not the irrational one."
      },
      {
        "text": "\\(2^{\\frac{1}{2}}\\)",
        "correct": true,
        "feedback": "Correct. \\(2^{\\frac{1}{2}}\\) is a root of a number that is not a perfect power, and \\(\\sqrt{2}\\) is irrational. The other three work out to whole numbers or fractions."
      },
      {
        "text": "\\(25^{\\frac{1}{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(25^{\\frac{1}{2}}\\). This equals \\(5\\), which is rational, so it is not the irrational one."
      }
    ],
    "backward": "Roots and powers that give whole numbers (earlier in this chapter).",
    "forward": "In a later chapter you use fractional powers in algebra."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "A square has sides of length \\(3\\sqrt{5}\\) cm. What is its perimeter?",
    "options": [
      {
        "text": "\\(45\\) cm",
        "correct": false,
        "feedback": "Chose \\(45\\) cm, working out the area \\((3\\sqrt{5})^{2} = 45\\). The perimeter adds the four sides: \\(4 × 3\\sqrt{5}\\)."
      },
      {
        "text": "\\(4\\sqrt{5}\\) cm",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{5}\\) cm, leaving out the \\(3\\) in front of the root. Every side is \\(3\\sqrt{5}\\), so the perimeter is \\(4 × 3\\sqrt{5}\\)."
      },
      {
        "text": "\\(12\\sqrt{5}\\) cm",
        "correct": true,
        "feedback": "Correct. Perimeter = \\(4 × 3\\sqrt{5} = 12\\sqrt{5}\\) cm."
      },
      {
        "text": "\\(9\\sqrt{5}\\) cm",
        "correct": false,
        "feedback": "Chose \\(9\\sqrt{5}\\) cm, adding only three sides. A square has four equal sides: \\(4 × 3\\sqrt{5}\\)."
      }
    ],
    "backward": "Perimeter of a square, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use perimeters and areas with exact values in algebra problems."
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
  title: "Real Numbers, Indices and Surds — Core Fluency",
  subtitle: "Grade 9 · Level 1 · Core Fluency",
  description: "Number sets and rational numbers, decimal expansions, irrational numbers and the real line, laws of indices, and surds — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: the number sets and rational numbers, decimal expansions, irrational numbers and the real line, the laws of indices, and simplifying surds. No calculator is needed. For each question, ask yourself first what kind of number or expression you are looking at, then work it out on paper before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

// Real Numbers, Indices and Surds — Grade 9, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch01-real-numbers-indices-surds-level-4.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch1RealNumbersIndicesSurdsL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-1-real-numbers-indices-surds";
const CHAPTER_NAME = "Real Numbers, Indices and Surds";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Which of these is not allowed as a rational number \\(\\frac{p}{q}\\), with \\(p\\) and \\(q\\) integers?",
    "options": [
      {
        "text": "\\(\\frac{0}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{0}{5}\\). This is zero divided by \\(5\\), which equals \\(0\\), and \\(0 = \\frac{0}{1}\\) is rational. Only a bottom of \\(0\\) is not allowed."
      },
      {
        "text": "\\(−\\frac{5}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{5}{5}\\). This equals \\(−1\\), a fraction of two integers with a bottom that is not \\(0\\), so it is rational."
      },
      {
        "text": "\\(\\frac{5}{0}\\)",
        "correct": true,
        "feedback": "Correct. The bottom of \\(\\frac{5}{0}\\) is \\(0\\), and dividing by \\(0\\) is not defined, so \\(\\frac{5}{0}\\) is not a number at all. In \\(\\frac{p}{q}\\) the bottom \\(q\\) must not be \\(0\\)."
      },
      {
        "text": "\\(\\frac{5}{1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{1}\\). This is the whole number \\(5\\) written as a fraction, so it is rational."
      }
    ],
    "retryHint": "A fraction \\(\\frac{p}{q}\\) is only a rational number if \\(q\\) is not zero. Which option has a zero in the bottom?",
    "backward": "Why you cannot divide by zero, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you meet algebraic fractions and must say which values make the bottom zero."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "S",
    "question": "Write \\((3^{2})^{5}\\) as a single power of \\(3\\).",
    "options": [
      {
        "text": "\\(3^{5}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{5}\\), keeping only the outer power \\(5\\). The inner power \\(2\\) is multiplied by the outer power \\(5\\), giving \\(2 × 5 = 10\\)."
      },
      {
        "text": "\\(3^{10}\\)",
        "correct": true,
        "feedback": "Correct. \\((3^{2})^{5} = 3^{2×5} = 3^{10}\\)."
      },
      {
        "text": "\\(3^{3}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{3}\\), subtracting the powers: \\(5 − 2 = 3\\). For a power of a power you multiply the powers."
      },
      {
        "text": "\\(3^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{2}\\), leaving the outer power \\(5\\) out. The outer power \\(5\\) multiplies the inner power \\(2\\), giving \\(2 × 5 = 10\\)."
      }
    ],
    "retryHint": "Brackets around a power with another power outside: multiply the two powers.",
    "backward": "A power of a power, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this law to change a power with a fractional exponent."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "tier": "S",
    "question": "Write \\(\\frac{13}{80}\\) as a decimal.",
    "options": [
      {
        "text": "\\(0.1625\\)",
        "correct": true,
        "feedback": "Correct. \\(13 ÷ 80 = 0.1625\\)."
      },
      {
        "text": "\\(0.163\\)",
        "correct": false,
        "feedback": "Chose \\(0.163\\), which is the decimal rounded to \\(3\\) decimal places. The fraction \\(\\frac{13}{80}\\) gives exactly \\(0.1625\\), so do not round it."
      },
      {
        "text": "\\(0.01625\\)",
        "correct": false,
        "feedback": "Chose \\(0.01625\\), which has the decimal point one place too far left. \\(13 ÷ 80\\) is between \\(0\\) and \\(1\\), and about \\(0.16\\) in size, not \\(0.016\\)."
      },
      {
        "text": "\\(13.80\\)",
        "correct": false,
        "feedback": "Chose \\(13.80\\), writing the top, a point, then the bottom. The fraction bar means divide: \\(13 ÷ 80\\)."
      }
    ],
    "retryHint": "Divide the top number by the bottom number, or find an equivalent fraction with a bottom of \\(10\\), \\(100\\) or \\(1000\\) if you can.",
    "backward": "Turning a fraction into a decimal with an equivalent fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you check whether a decimal stops or repeats before turning it into a fraction."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "tier": "S",
    "question": "Simplify \\(8\\sqrt{7} − 6\\sqrt{7}\\).",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Chose \\(14\\), treating \\(\\sqrt{7}\\) as \\(7\\). \\(\\sqrt{7}\\) is a surd, not the number \\(7\\); it stays as \\(\\sqrt{7}\\)."
      },
      {
        "text": "\\(48\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(48\\sqrt{7}\\), multiplying the numbers \\(8 × 6\\). Adding or subtracting like surds changes only the number in front: \\(8 − 6 = 2\\)."
      },
      {
        "text": "\\(14\\sqrt{7}\\)",
        "correct": false,
        "feedback": "Chose \\(14\\sqrt{7}\\), using the wrong operation on the numbers in front. \\(8 − 6 = 2\\)."
      },
      {
        "text": "\\(2\\sqrt{7}\\)",
        "correct": true,
        "feedback": "Correct. \\(8\\sqrt{7} − 6\\sqrt{7} = (8 − 6)\\sqrt{7} = 2\\sqrt{7}\\)."
      }
    ],
    "retryHint": "The roots under the sign are the same, so combine only the numbers in front, adding or subtracting as the sign says, and keep the root.",
    "backward": "Adding like terms in algebra, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you add and subtract surds in the answers to quadratic equations."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "tier": "S",
    "question": "Which of these decimals is irrational?",
    "options": [
      {
        "text": "\\(0.083333\\ldots\\) (the \\(3\\) repeats)",
        "correct": false,
        "feedback": "Chose \\(0.083333\\ldots\\) (the \\(3\\) repeats). This is rational: the digit \\(3\\) repeats for ever, so the decimal is recurring and rational, equal to \\(\\frac{1}{12}\\)."
      },
      {
        "text": "\\(0.2020020002\\ldots\\) (the \\(0s\\) between the \\(2s\\) keep growing)",
        "correct": true,
        "feedback": "Correct. In \\(0.2020020002\\ldots\\), the number of \\(0s\\) between the \\(2s\\) grows every time, so no block of digits ever repeats. A decimal that never ends and never repeats is irrational."
      },
      {
        "text": "\\(0.4545\\ldots\\) (the block \\(45\\) repeats)",
        "correct": false,
        "feedback": "Chose \\(0.4545\\ldots\\) (the block \\(45\\) repeats). This is rational: the block \\(45\\) repeats for ever, so the decimal is recurring and rational, equal to \\(\\frac{5}{11}\\)."
      },
      {
        "text": "\\(3.14159\\) (the decimal stops here)",
        "correct": false,
        "feedback": "Chose \\(3.14159\\) (the decimal stops here). This is rational: the decimal stops, so it equals \\(\\frac{314\\,159}{100\\,000}\\) and is rational. It only looks like \\(\\pi\\): \\(\\pi\\) itself never stops."
      }
    ],
    "retryHint": "A decimal that stops or repeats a block can be written as a fraction. Which decimal never does either?",
    "backward": "Terminating and recurring decimals, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you decide whether a decimal answer is exact or rounded."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "tier": "C",
    "question": "What is the value of \\((\\sqrt{7})^{−4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{28}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{28}\\), taking \\(\\frac{1}{4 × 7}\\). The power \\(4\\) means multiply \\(\\sqrt{7}\\) by itself, not multiply \\(7\\) by \\(4\\): \\((\\sqrt{7})^{4} = 49\\)."
      },
      {
        "text": "\\(\\frac{1}{49}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{7})^{−4} = \\frac{1}{(\\sqrt{7})^{4}} = \\frac{1}{49}\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Chose \\(49\\), ignoring the negative sign in the power. A negative power means take the reciprocal."
      },
      {
        "text": "\\(\\frac{1}{2401}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2401}\\), raising \\(7\\) to the power \\(4\\) instead of \\(\\sqrt{7}\\). \\((\\sqrt{7})^{4} = 49\\), so the answer is \\(\\frac{1}{49}\\)."
      }
    ],
    "retryHint": "Take the reciprocal to remove the minus sign, then work out \\((\\sqrt{7})^{4}\\).",
    "backward": "Negative powers and powers of a root (earlier in this chapter).",
    "forward": "In a later chapter you use negative powers in standard form."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "tier": "S",
    "question": "Only one of these statements is true. Which one?",
    "options": [
      {
        "text": "Every rational number is a whole number.",
        "correct": false,
        "feedback": "Chose \"Every rational number is a whole number.\" Counter-example: \\(\\frac{3}{4}\\) is rational but not a whole number, so the statement is false."
      },
      {
        "text": "Every rational number is a natural number.",
        "correct": false,
        "feedback": "Chose \"Every rational number is a natural number.\" Counter-example: \\(\\frac{3}{4}\\) is rational but not a natural number, so the statement is false."
      },
      {
        "text": "Every whole number is a natural number.",
        "correct": false,
        "feedback": "Chose \"Every whole number is a natural number.\" Counter-example: \\(0\\) is a whole number but not a natural number, so the statement is false."
      },
      {
        "text": "Every integer is a rational number.",
        "correct": true,
        "feedback": "Correct. Every integer is also a rational number, because the sets are nested: natural ⊂ whole ⊂ integers ⊂ rational."
      }
    ],
    "retryHint": "Test each statement with an example, such as a negative number or a fraction. A true statement works for every example.",
    "backward": "The number sets and how they nest, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you decide whether a statement about surds is always true."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "S",
    "question": "Simplify \\(4x^{6} × 5x^{3}\\).",
    "options": [
      {
        "text": "\\(20x^{3}\\)",
        "correct": false,
        "feedback": "Chose \\(20x^{3}\\), subtracting the powers. Subtracting is for dividing; here you multiply, so you add: \\(9\\)."
      },
      {
        "text": "\\(9x^{9}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{9}\\), adding the coefficients: \\(4 + 5\\). Multiplying terms multiplies the coefficients: \\(4 × 5 = 20\\)."
      },
      {
        "text": "\\(9x^{18}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{18}\\), adding the coefficients and multiplying the powers. Do the opposite: multiply the coefficients, add the powers."
      },
      {
        "text": "\\(20x^{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(4 × 5 = 20\\) and \\(x^{6} × x^{3} = x^{9}\\), so the answer is \\(20x^{9}\\)."
      }
    ],
    "retryHint": "Multiply the numbers in front of the letters first. Then add the powers of \\(x\\).",
    "backward": "Multiplying the numbers in front and adding the powers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same rules when you expand and factorise."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "tier": "T",
    "question": "How many of these numbers are integers? \\(\\frac{7}{2}\\), \\(\\frac{9}{4}\\), \\(\\frac{12}{4}\\), \\(−\\frac{5}{3}\\), \\(−0.25\\), \\(2.5\\)",
    "options": [
      {
        "text": "\\(5\\) numbers",
        "correct": false,
        "feedback": "Chose \\(5\\) numbers. Counted the numbers that are not integers, \\(5\\), instead of the ones that are. The question asks how many are integers."
      },
      {
        "text": "\\(3\\) numbers",
        "correct": false,
        "feedback": "Chose \\(3\\) numbers. Counted two of the numbers that are not integers as well, giving \\(3\\). Each of them lies between two integers."
      },
      {
        "text": "\\(1\\) number",
        "correct": true,
        "feedback": "Correct. The integers are \\(\\frac{12}{4} = 3\\), because the bottom divides the top exactly. That makes \\(1\\) number."
      },
      {
        "text": "\\(2\\) numbers",
        "correct": false,
        "feedback": "Chose \\(2\\) numbers. Counted \\(\\frac{9}{4}\\) as well, giving \\(2\\). \\(\\frac{9}{4}\\) lies between two integers, so it is not an integer."
      }
    ],
    "backward": "Integers, decimals and negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet numbers that look like integers but are not."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "T",
    "question": "What is the value of \\(4 + 7^{0}\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), reading \\(7^{0}\\) as \\(0\\). Any non-zero number to the power \\(0\\) equals \\(1\\), so \\(4 + 1 = 5\\)."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), treating the whole expression as \\(0\\) because of the power \\(0\\). Only \\(7^{0}\\) is affected, and it equals \\(1\\): \\(4 + 1 = 5\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(7^{0} = 1\\), so \\(4 + 7^{0} = 4 + 1 = 5\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), reading \\(7^{0}\\) as \\(7\\). The power \\(0\\) does not leave the base alone: \\(7^{0} = 1\\)."
      }
    ],
    "backward": "The value of a zero power in a sum, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the zero power in algebra, such as \\(3x^{0}\\)."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "tier": "T",
    "question": "The decimal expansion of \\(\\frac{3}{13}\\) is \\(0.230769230769\\ldots\\) The block of digits repeats for ever. What is the 78th digit after the decimal point?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), the second digit of the block. The remainder \\(0\\) means the end of a block, which is the last digit, not the second."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. The block \\(230\\,769\\) has \\(6\\) digits and \\(78\\) is a multiple of \\(6\\), so the 78th digit is the last digit of a complete block, which is \\(9\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), the first digit of the block. When the remainder is \\(0\\) the 78th digit is the LAST digit of a complete block, not the first."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), the second-last digit of the block, one place too early. A multiple of \\(6\\) ends exactly at the end of a block, so the digit is the last one."
      }
    ],
    "backward": "Dividing a whole number and reading the remainder, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use patterns in repeating blocks to find any digit."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "tier": "S",
    "question": "Simplify \\(\\sqrt{135} ÷ \\sqrt{3}\\).",
    "options": [
      {
        "text": "\\(3\\sqrt{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{135} ÷ \\sqrt{3} = \\sqrt{135 ÷ 3} = \\sqrt{45} = 3\\sqrt{5}\\)."
      },
      {
        "text": "\\(\\sqrt{132}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{132}\\), subtracting the numbers under the roots. When you divide roots you divide the numbers: \\(135 ÷ 3 = 45\\)."
      },
      {
        "text": "\\(\\frac{\\sqrt{135}}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{\\sqrt{135}}{3}\\), dividing by \\(3\\) outside the root instead of by \\(\\sqrt{3}\\). The divisor is \\(\\sqrt{3}\\), so divide under the root: \\(135 ÷ 3 = 45\\)."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "Chose \\(45\\), dividing the numbers but forgetting the root. The answer is \\(\\sqrt{45}\\), which simplifies to \\(3\\sqrt{5}\\)."
      }
    ],
    "backward": "Dividing numbers under one root sign, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use division of surds to rationalise denominators."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "tier": "T",
    "question": "Which of these numbers is irrational?",
    "options": [
      {
        "text": "\\(\\sqrt{5} × \\sqrt{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{5} × \\sqrt{20}\\). This simplifies to \\(\\sqrt{100} = 10\\), a whole number, so it is rational."
      },
      {
        "text": "\\(\\sqrt{15} − 1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\sqrt{15} − 1\\) cannot be simplified to a whole number or a fraction: it still contains a root that is not a perfect square, so it is irrational. The other three simplify to whole numbers."
      },
      {
        "text": "\\(\\sqrt{12} ÷ \\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{12} ÷ \\sqrt{3}\\). This simplifies to \\(\\sqrt{4} = 2\\), a whole number, so it is rational."
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
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "tier": "T",
    "question": "Between which two consecutive whole numbers does \\(4\\sqrt{3}\\) lie?",
    "options": [
      {
        "text": "\\(6\\) and \\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(4\\sqrt{3} = \\sqrt{16 × 3} = \\sqrt{48}\\), and \\(36 &lt; 48 &lt; 49\\), so it lies between \\(6\\) and \\(7\\)."
      },
      {
        "text": "\\(4\\) and \\(5\\)",
        "correct": false,
        "feedback": "Chose \\(4\\) and \\(5\\), multiplying \\(4\\) by the whole number below \\(\\sqrt{3}\\). \\(\\sqrt{3}\\) is more than \\(1\\), so \\(4\\sqrt{3}\\) is further along than that."
      },
      {
        "text": "\\(7\\) and \\(8\\)",
        "correct": false,
        "feedback": "Chose \\(7\\) and \\(8\\), one interval too high. \\(7^{2} = 49\\) is bigger than \\(48\\)."
      },
      {
        "text": "\\(5\\) and \\(6\\)",
        "correct": false,
        "feedback": "Chose \\(5\\) and \\(6\\), one interval too low. \\(6^{2} = 36\\) is smaller than \\(48\\), so the value is above \\(6\\)."
      }
    ],
    "backward": "Estimating a square root, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you place sums of surds on the number line."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "tier": "C",
    "question": "Which of these operations on two integers can give a number that is NOT an integer?",
    "options": [
      {
        "text": "Subtracting them",
        "correct": false,
        "feedback": "Chose Subtracting them. \\(3 − 5 = −2\\) is negative, but \\(−2\\) is still an integer, so subtracting never leaves the integers."
      },
      {
        "text": "Dividing the first by the second (second ≠ \\(0\\))",
        "correct": true,
        "feedback": "Correct. Dividing can leave the integers: \\(3 ÷ 4 = \\frac{3}{4}\\) is not an integer, although it is rational. Adding, subtracting and multiplying integers always give integers."
      },
      {
        "text": "Adding them",
        "correct": false,
        "feedback": "Chose Adding them. The sum of two integers, such as \\(3 + 5 = 8\\) or \\(−2 + 7 = 5\\), is always an integer."
      },
      {
        "text": "Multiplying them",
        "correct": false,
        "feedback": "Chose Multiplying them. The product of two integers, such as \\(4 × (−3) = −12\\), is always an integer."
      }
    ],
    "backward": "Adding, subtracting, multiplying and dividing whole numbers and fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you see why dividing by a polynomial can leave you outside polynomials in the same way."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "C",
    "question": "What is the value of \\(125^{\\frac{2}{3}}\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), which is the bottom of the fraction on its own. The bottom is the root; it is not the answer."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), taking only the cube root and forgetting the power \\(2\\). \\(125^{\\frac{2}{3}}\\) means root first, then power \\(2\\): \\(5^{2} = 25\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": true,
        "feedback": "Correct. \\(125^{\\frac{2}{3}} = (\\sqrt[3]{125})^{2} = 5^{2} = 25\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the top of the fraction on its own. The base \\(125\\) is still there: take the cube root of \\(125\\), then raise it to the power \\(2\\)."
      }
    ],
    "backward": "Roots of perfect squares and cubes, then powers (earlier in this chapter).",
    "forward": "Later in this chapter you also meet negative fractional powers."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "tier": "T",
    "question": "Which fraction has a decimal expansion that never ends?",
    "options": [
      {
        "text": "\\(\\frac{14}{35}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{14}{35}\\). The bottom, \\(35\\), has a factor of \\(7\\) that looks like it makes the decimal recur, but \\(\\frac{14}{35}\\) simplifies to \\(\\frac{2}{5}\\), whose bottom \\(5\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      },
      {
        "text": "\\(\\frac{33}{44}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{33}{44}\\). The bottom, \\(44\\), has a factor of \\(11\\) that looks like it makes the decimal recur, but \\(\\frac{33}{44}\\) simplifies to \\(\\frac{3}{4}\\), whose bottom \\(4\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      },
      {
        "text": "\\(\\frac{11}{15}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{11}{15}\\) cannot be simplified, and its bottom \\(15\\) has a factor other than \\(2\\) or \\(5\\), so the decimal recurs. The other fractions simplify to a bottom of only \\(2s\\) and \\(5s\\)."
      },
      {
        "text": "\\(\\frac{77}{110}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{77}{110}\\). The bottom, \\(110\\), has a factor of \\(11\\) that looks like it makes the decimal recur, but \\(\\frac{77}{110}\\) simplifies to \\(\\frac{7}{10}\\), whose bottom \\(10\\) is made only of \\(2s\\) and \\(5s\\). It terminates."
      }
    ],
    "backward": "The decimals that different denominators give, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the same test to predict the decimal for any fraction."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "tier": "C",
    "question": "Write \\(\\frac{8}{\\sqrt{6}}\\) with a whole-number denominator, in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{4\\sqrt{6}}{3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply top and bottom by \\(\\sqrt{6}\\): \\(\\frac{8}{\\sqrt{6}} = \\frac{8\\sqrt{6}}{6} = \\frac{4\\sqrt{6}}{3}\\)."
      },
      {
        "text": "\\(48\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(48\\sqrt{6}\\), multiplying by \\(6\\) where you should divide by \\(6\\). After multiplying top and bottom by \\(\\sqrt{6}\\), the bottom is \\(6\\)."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{3}\\), cancelling the root away. The top is multiplied by \\(\\sqrt{6}\\), so the root stays on the top: \\(8\\sqrt{6} ÷ 6\\)."
      },
      {
        "text": "\\(8\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(8\\sqrt{6}\\), multiplying the top by \\(\\sqrt{6}\\) but not dividing by the \\(6\\) from \\(\\sqrt{6} × \\sqrt{6}\\). The bottom becomes \\(6\\), so divide by \\(6\\)."
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
    "tier": "C",
    "question": "Which of these numbers is the position of \\(P\\) on the number line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 648 100\" width=\"648\" height=\"100\" role=\"img\" aria-label=\"A number line from 0 to 8 with a tick and label at each whole number; a point P is marked between 5 and 6, clearly nearer 5 than 6.\" font-family=\"Helvetica, Arial, sans-serif\">\n<title>A number line from 0 to 8 with a tick and label at each whole number; a point P is marked between 5 and 6, clearly nearer 5 than 6.</title>\n<line x1=\"18\" y1=\"58\" x2=\"630\" y2=\"58\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<polygon points=\"12,58 22,53 22,63\" fill=\"#1f2937\"/>\n<polygon points=\"636,58 626,53 626,63\" fill=\"#1f2937\"/>\n<line class=\"tick\" x1=\"44\" y1=\"50\" x2=\"44\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"44\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">0</text>\n<line class=\"tick\" x1=\"114\" y1=\"50\" x2=\"114\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"114\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">1</text>\n<line class=\"tick\" x1=\"184\" y1=\"50\" x2=\"184\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"184\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">2</text>\n<line class=\"tick\" x1=\"254\" y1=\"50\" x2=\"254\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"254\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">3</text>\n<line class=\"tick\" x1=\"324\" y1=\"50\" x2=\"324\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"324\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">4</text>\n<line class=\"tick\" x1=\"394\" y1=\"50\" x2=\"394\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"394\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">5</text>\n<line class=\"tick\" x1=\"464\" y1=\"50\" x2=\"464\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"464\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">6</text>\n<line class=\"tick\" x1=\"534\" y1=\"50\" x2=\"534\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"534\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">7</text>\n<line class=\"tick\" x1=\"604\" y1=\"50\" x2=\"604\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"604\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">8</text>\n<circle id=\"P\" cx=\"420.96\" cy=\"58\" r=\"6.5\" fill=\"#1d4ed8\"/>\n<text class=\"point-label\" x=\"420.96\" y=\"40\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"bold\" fill=\"#1d4ed8\">P</text>\n</svg></div>",
    "options": [
      {
        "text": "\\(\\sqrt{42}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{42}\\). \\(42\\) is more than \\(6^{2} = 36\\), so \\(\\sqrt{42}\\) is more than \\(6\\): it lies to the right of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{48}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{48}\\). \\(48\\) is more than \\(6^{2} = 36\\), so \\(\\sqrt{48}\\) is more than \\(6\\): it lies to the right of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{33}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{33}\\). It lies between \\(5\\) and \\(6\\), but on the other side of the halfway mark: \\(33\\) is more than \\(5.5^{2} = 30.25\\), so \\(\\sqrt{33}\\) is more than \\(5.5\\), the halfway mark, and is nearer \\(6\\). \\(P\\) is nearer \\(5\\)."
      },
      {
        "text": "\\(\\sqrt{29}\\)",
        "correct": true,
        "feedback": "Correct. \\(P\\) is between \\(5\\) and \\(6\\), nearer \\(5\\). \\(5^{2} = 25 &lt; 29 &lt; 36 = 6^{2}\\), and \\(29\\) is less than \\(5.5^{2} = 30.25\\), so \\(\\sqrt{29}\\) is less than \\(5.5\\), the halfway mark, and is nearer \\(5\\). The other roots are in a different interval or nearer \\(6\\)."
      }
    ],
    "backward": "Reading a position on a number line, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you read values from scales on graph axes."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "tier": "H",
    "question": "Write \\((\\sqrt{2})^{7}\\) in the form \\(a\\sqrt{b}\\), where \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(7\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(7\\sqrt{2}\\), treating the power \\(7\\) as a number in front. \\((\\sqrt{2})^{7}\\) means \\(\\sqrt{2}\\) multiplied \\(7\\) times, not \\(7 × \\sqrt{2}\\)."
      },
      {
        "text": "\\(8\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{2})^{2} = 2\\), so \\((\\sqrt{2})^{7} = (\\sqrt{2})^{6} × \\sqrt{2} = 2^{3} × \\sqrt{2} = 8\\sqrt{2}\\)."
      },
      {
        "text": "\\(16\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(16\\sqrt{2}\\), one pair of roots too many. \\((\\sqrt{2})^{6} = 8\\), so the answer is \\(8\\sqrt{2}\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), stopping at \\((\\sqrt{2})^{6} = 8\\). There is still one more \\(\\sqrt{2}\\) to multiply in."
      }
    ],
    "backward": "Pairs of a root multiplying to a whole number (earlier in this chapter).",
    "forward": "Later in this chapter you meet roots raised to larger powers in mixed problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "tier": "C",
    "question": "How many integers lie between \\(−3.5\\) and \\(1.75\\)?",
    "options": [
      {
        "text": "\\(4\\) integers",
        "correct": false,
        "feedback": "Subtracted the end integers, \\(1 − (−3) = 4\\), giving \\(4\\) integers. That counts the gaps, not the integers: there is one more integer than there are gaps."
      },
      {
        "text": "\\(5\\) integers",
        "correct": true,
        "feedback": "Correct. The integers are \\(−3\\), \\(−2\\), \\(−1\\), \\(0\\), \\(1\\), which is \\(5\\) integers."
      },
      {
        "text": "\\(2\\) integers",
        "correct": false,
        "feedback": "Counted only from \\(0\\) upwards, giving \\(2\\) integers. The negative integers between \\(−3.5\\) and \\(0\\) count as well."
      },
      {
        "text": "\\(3\\) integers",
        "correct": false,
        "feedback": "Counted only the integers below \\(0\\), giving \\(3\\) integers. Zero and the positive integers up to \\(1\\) count as well."
      }
    ],
    "backward": "Negative numbers and decimals on a number line, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve inequalities whose solutions are integers."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "C",
    "question": "Simplify \\((5x^{4})^{3}\\).",
    "options": [
      {
        "text": "\\(125x^{12}\\)",
        "correct": true,
        "feedback": "Correct. \\((5x^{4})^{3} = 5^{3} × x^{4×3} = 125x^{12}\\)."
      },
      {
        "text": "\\(15x^{7}\\)",
        "correct": false,
        "feedback": "Chose \\(15x^{7}\\), multiplying the coefficient by \\(3\\) and adding the powers. Both parts are off: raise \\(5\\) to the power \\(3\\), and multiply the powers of \\(x\\)."
      },
      {
        "text": "\\(15x^{12}\\)",
        "correct": false,
        "feedback": "Chose \\(15x^{12}\\), multiplying \\(5\\) by \\(3\\). Raising \\(5\\) to the power \\(3\\) means \\(5^{3} = 125\\), not \\(5 × 3\\)."
      },
      {
        "text": "\\(5x^{12}\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{12}\\), raising only \\(x^{4}\\) to the power \\(3\\) and leaving the coefficient \\(5\\) alone. The power \\(3\\) applies to everything inside the bracket: \\(5^{3} = 125\\)."
      }
    ],
    "backward": "Raising a product to a power, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you expand brackets that contain powers."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "tier": "H",
    "question": "Work out \\(0.8888\\ldots − 0.7777\\ldots\\) and give the answer as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Subtracted the decimals as if they stopped after one digit: \\(0.8 − 0.7 = 0.1\\), which is \\(\\frac{1}{10}\\). Both decimals recur, so they are really \\(\\frac{8}{9}\\) and \\(\\frac{7}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{99}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{99}\\), using \\(99\\) in the bottom. A single repeating digit gives a bottom of \\(9\\), not \\(99\\)."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.8888\\ldots = \\frac{8}{9}\\) and \\(0.7777\\ldots = \\frac{7}{9}\\), so the difference is \\(\\frac{8}{9} − \\frac{7}{9} = \\frac{1}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{18}\\) by subtracting the tops and adding the bottoms, \\(\\frac{1}{18}\\). For fractions with the same bottom, the bottom stays \\(9\\)."
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
    "tier": "H",
    "question": "Expand and simplify \\((3 + \\sqrt{5})(2 + \\sqrt{5})\\).",
    "options": [
      {
        "text": "\\(11 + 6\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(11 + 6\\sqrt{5}\\), multiplying \\(3 × 2\\) for the surd terms. The two cross terms are \\(3\\sqrt{5}\\) and \\(2\\sqrt{5}\\), which add to \\(5\\sqrt{5}\\)."
      },
      {
        "text": "\\(6 + 5\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(6 + 5\\sqrt{5}\\), forgetting \\(\\sqrt{5} × \\sqrt{5} = 5\\). The last product adds \\(5\\) to the number part: \\(6 + 5 = 11\\)."
      },
      {
        "text": "\\(11 + 3\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(11 + 3\\sqrt{5}\\), with only one cross term. Both \\(3\\sqrt{5}\\) and \\(2\\sqrt{5}\\) appear, and they add to \\(5\\sqrt{5}\\)."
      },
      {
        "text": "\\(11 + 5\\sqrt{5}\\)",
        "correct": true,
        "feedback": "Correct. \\((3 + \\sqrt{5})(2 + \\sqrt{5}) = 6 + 3\\sqrt{5} + 2\\sqrt{5} + 5 = 11 + 5\\sqrt{5}\\)."
      }
    ],
    "backward": "Multiplying two brackets term by term (earlier in this chapter).",
    "forward": "Later in this chapter you use this in problems with areas and lengths that involve surds."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "tier": "C",
    "question": "Which list shows these numbers in order, smallest first: \\(\\sqrt{5}\\), \\(\\frac{13}{6}\\), \\(2.6\\)?",
    "options": [
      {
        "text": "\\(\\frac{13}{6}\\), \\(2.6\\), \\(\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{13}{6}\\), \\(2.6\\), \\(\\sqrt{5}\\), putting \\(\\sqrt{5}\\) last as if it were the biggest. \\(\\sqrt{5}\\) is only about \\(2.2\\), because \\(2^{2} = 4 &lt; 5 &lt; 9\\)."
      },
      {
        "text": "\\(\\frac{13}{6}\\), \\(\\sqrt{5}\\), \\(2.6\\)",
        "correct": true,
        "feedback": "Correct. Using squares for \\(\\sqrt{5}\\) (between \\(2\\) and \\(3\\)) and dividing for \\(\\frac{13}{6}\\), the values are about \\(\\frac{13}{6} ≈ 2.17\\), \\(\\sqrt{5} ≈ 2.24\\), \\(2.6 ≈ 2.60\\). Smallest first: \\(\\frac{13}{6}\\), \\(\\sqrt{5}\\), \\(2.6\\)."
      },
      {
        "text": "\\(2.6\\), \\(\\sqrt{5}\\), \\(\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(2.6\\), \\(\\sqrt{5}\\), \\(\\frac{13}{6}\\), which is largest first. The question asks for smallest first."
      },
      {
        "text": "\\(\\sqrt{5}\\), \\(2.6\\), \\(\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{5}\\), \\(2.6\\), \\(\\frac{13}{6}\\), which orders \\(\\frac{13}{6}\\) by its top number \\(13\\) as if it were \\(13\\). A fraction is worth its top divided by its bottom, which is about \\(2.17\\)."
      }
    ],
    "backward": "Comparing decimals, fractions and roots by size, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you order surds in problems by comparing them with nearby squares."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "tier": "H",
    "question": "Write \\(4^{\\frac{3}{2}} × \\sqrt{12}\\) in the form \\(p\\sqrt{q}\\), where \\(q\\) is as small as possible.",
    "options": [
      {
        "text": "\\(16\\sqrt{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(4^{\\frac{3}{2}} = (\\sqrt{4})^{3} = 2^{3} = 8\\), and \\(\\sqrt{12} = \\sqrt{4 × 3} = 2\\sqrt{3}\\), so the product is \\(8 × 2\\sqrt{3} = 16\\sqrt{3}\\)."
      },
      {
        "text": "\\(8 + 2\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(8 + 2\\sqrt{3}\\), adding the two parts. The sign between them is multiply: \\(8 × 2\\sqrt{3}\\)."
      },
      {
        "text": "\\(12\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(12\\sqrt{3}\\), working out \\(4 × 3 ÷ 2 = 6\\). A fractional index is not multiplication and division: the bottom is a root and the top is a power."
      },
      {
        "text": "\\(4\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{3}\\), taking only the square root, \\(2\\), and leaving out the power \\(3\\). \\(2^{3} = 8\\)."
      }
    ],
    "backward": "Fractional powers and simplifying a root (earlier in this chapter).",
    "forward": "In a later chapter you combine powers and roots like this when you solve equations with exact answers."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "tier": "C",
    "question": "Which rational number is exactly halfway between \\(\\frac{1}{4}\\) and \\(\\frac{1}{2}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2}\\), the larger of the two fractions. Halfway lies between them, not at one of them."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{4}\\), the smaller of the two fractions. Halfway lies between them, not at one of them."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Added the tops and added the bottoms, giving \\(\\frac{1}{3}\\). That is not the halfway value: add the two fractions properly, then halve."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(((\\frac{1}{4}) + (\\frac{1}{2})) ÷ 2 = \\frac{3}{4} ÷ 2 = \\frac{3}{8}\\)."
      }
    ],
    "backward": "Finding a common denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the same averaging idea to build numbers between two fractions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "tier": "H",
    "question": "Find \\(x\\) when \\(10^{x} = \\frac{1}{1000}\\).",
    "options": [
      {
        "text": "\\(−10\\)",
        "correct": false,
        "feedback": "Chose \\(−10\\), using the base \\(10\\) as the power with a minus sign. \\(10^{−10} = \\frac{1}{10\\,000\\,000\\,000}\\), not \\(\\frac{1}{1000}\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), ignoring the minus sign. \\(10^{3} = 1000\\), which is bigger than \\(1\\), not \\(\\frac{1}{1000}\\)."
      },
      {
        "text": "\\(−1000\\)",
        "correct": false,
        "feedback": "Chose \\(−1000\\), using the bottom number \\(1000\\) as the power with a minus sign. \\(10^{−1000}\\) is far smaller than \\(\\frac{1}{1000}\\)."
      },
      {
        "text": "\\(−3\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{1000} = \\frac{1}{10^{3}} = 10^{−3}\\), so \\(x = −3\\)."
      }
    ],
    "backward": "Negative powers written as fractions (earlier in this chapter).",
    "forward": "Later in this chapter you solve equations like this with fractional and negative powers."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which fraction lies between \\(\\frac{1}{5}\\) and \\(\\frac{1}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{4}\\), which is larger than \\(\\frac{1}{4}\\), so it lies above the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{4}\\). That is one of the two end values. Between means strictly inside, so an end value does not count."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": true,
        "feedback": "Correct. With a common denominator \\(20\\), \\(\\frac{1}{5} = \\frac{4}{20}\\) and \\(\\frac{1}{4} = \\frac{5}{20}\\). \\(\\frac{2}{9}\\) is about \\(0.222\\), which is between \\(0.200\\) and \\(0.250\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2}\\), which is larger than \\(\\frac{1}{4}\\), so it lies above the pair, not between them. Compare using a common denominator or decimals."
      }
    ],
    "backward": "Ordering fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you show there are always more rational numbers between two given ones."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.888\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{8}{9}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.888\\ldots\\). Then \\(10x = 8.888\\ldots\\), so \\(10x − x = 8\\), so \\(9x = 8\\) and \\(x = \\frac{8}{9}\\)."
      },
      {
        "text": "\\(\\frac{9}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9}{8}\\), which is the correct fraction upside down. The decimal is less than \\(1\\), so the top must be smaller than the bottom."
      },
      {
        "text": "\\(\\frac{8}{99}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8}{99}\\), using \\(99\\) in the bottom although only one digit repeats. One repeating digit needs a single \\(9\\) in the bottom."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{5}\\), which is the decimal \\(0.8\\) written as a fraction. It treats the decimal as if it stopped, but it keeps going, so the value is not exact."
      }
    ],
    "backward": "Simplifying a fraction to lowest terms, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you give exact fractions instead of rounded decimals."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(0.225\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{9}{40}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.225 = \\frac{225}{1000}\\), and dividing top and bottom by their highest common factor gives \\(\\frac{9}{40}\\)."
      },
      {
        "text": "\\(\\frac{225}{10\\,000}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{225}{10\\,000}\\), using \\(10\\,000\\) for the bottom. \\(0.225\\) has \\(3\\) decimal places, so the bottom is \\(1\\) followed by \\(3\\) zeros, not \\(4\\): \\(1000\\)."
      },
      {
        "text": "\\(\\frac{1}{225}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{225}\\), putting \\(1\\) over the digits \\(225\\). The digits \\(225\\) go on the top, over \\(1000\\): \\(\\frac{225}{1000}\\)."
      },
      {
        "text": "\\(\\frac{45}{1000}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{45}{1000}\\), dividing only the top by \\(5\\). To keep the value, divide the top and the bottom by the same number: \\(\\frac{225}{1000} = \\frac{9}{40}\\)."
      }
    ],
    "backward": "Place value in decimals and simplifying fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you give exact fractions instead of rounded decimals in your answers."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Between which two consecutive whole numbers does \\(\\sqrt{130}\\) lie?",
    "options": [
      {
        "text": "\\(10\\) and \\(11\\)",
        "correct": false,
        "feedback": "Chose \\(10\\) and \\(11\\). \\(11^{2} = 121\\) is already smaller than \\(130\\), so \\(\\sqrt{130}\\) is bigger than \\(11\\) and cannot lie below it."
      },
      {
        "text": "\\(121\\) and \\(144\\)",
        "correct": false,
        "feedback": "Chose \\(121\\) and \\(144\\), which are the two perfect squares around \\(130\\). The question asks about \\(\\sqrt{130}\\), so give the square roots of those: \\(11\\) and \\(12\\)."
      },
      {
        "text": "\\(11\\) and \\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(11^{2} = 121\\) and \\(12^{2} = 144\\), and \\(121 &lt; 130 &lt; 144\\), so \\(11 &lt; \\sqrt{130} &lt; 12\\)."
      },
      {
        "text": "\\(12\\) and \\(13\\)",
        "correct": false,
        "feedback": "Chose \\(12\\) and \\(13\\). \\(12^{2} = 144\\) is already bigger than \\(130\\), so \\(\\sqrt{130}\\) is smaller than \\(12\\) and cannot lie above it."
      }
    ],
    "backward": "Estimating a square root between two whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same estimate to check an answer for a length."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Use these squares: \\(3.3^{2} = 10.89\\), \\(3.4^{2} = 11.56\\), \\(3.5^{2} = 12.25\\), \\(3.6^{2} = 12.96\\). Between which two numbers, one decimal place apart, does \\(\\sqrt{12}\\) lie?",
    "options": [
      {
        "text": "\\(3\\) and \\(4\\)",
        "correct": false,
        "feedback": "Chose \\(3\\) and \\(4\\). \\(\\sqrt{12}\\) does lie there, but those numbers are a whole unit apart. The question asks for two numbers one decimal place apart."
      },
      {
        "text": "\\(3.4\\) and \\(3.5\\)",
        "correct": true,
        "feedback": "Correct. \\(11.56 &lt; 12 &lt; 12.25\\), so \\(3.4 &lt; \\sqrt{12} &lt; 3.5\\)."
      },
      {
        "text": "\\(3.3\\) and \\(3.4\\)",
        "correct": false,
        "feedback": "Chose \\(3.3\\) and \\(3.4\\). Both squares, \\(10.89\\) and \\(11.56\\), are smaller than \\(12\\), so \\(\\sqrt{12}\\) is bigger than both."
      },
      {
        "text": "\\(3.5\\) and \\(3.6\\)",
        "correct": false,
        "feedback": "Chose \\(3.5\\) and \\(3.6\\). Both squares, \\(12.25\\) and \\(12.96\\), are bigger than \\(12\\), so \\(\\sqrt{12}\\) is smaller than both."
      }
    ],
    "backward": "Squaring decimals and reading from a table, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you narrow an estimate of a root to two decimal places."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Find \\(x\\) when \\(5^{x} = 125\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(5^{1} = 5\\), \\(5^{2} = 25\\), \\(5^{3} = 125\\). So \\(5^{x} = 125\\) gives \\(x = 3\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), counting the list \\(1\\), \\(5\\), \\(25\\), \\(125\\), which has \\(4\\) numbers, not \\(3\\) multiplications of \\(5\\)."
      },
      {
        "text": "\\(120\\)",
        "correct": false,
        "feedback": "Chose \\(120\\), subtracting \\(5\\) from \\(125\\). The unknown is the power, not a number you subtract."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Chose \\(25\\), dividing \\(125\\) by \\(5\\). The unknown is the power: how many times \\(5\\) is multiplied to reach \\(125\\)."
      }
    ],
    "backward": "Powers of \\(2\\), \\(3\\) and \\(5\\) as whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same idea when different bases hide the same power."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\(125^{5} × 5^{4}\\) as a single power of \\(5\\).",
    "options": [
      {
        "text": "\\(625^{9}\\)",
        "correct": false,
        "feedback": "Chose \\(625^{9}\\), adding the powers and multiplying the bases \\(125 × 5\\). The base stays \\(5\\) once both are written with the same base."
      },
      {
        "text": "\\(5^{9}\\)",
        "correct": false,
        "feedback": "Chose \\(5^{9}\\), adding the powers \\(5 + 4\\) without changing \\(125\\) to a power of \\(5\\). \\(125 = 5^{3}\\), so \\(125^{5} = 5^{15}\\)."
      },
      {
        "text": "\\(5^{20}\\)",
        "correct": false,
        "feedback": "Chose \\(5^{20}\\), multiplying the powers. When you multiply powers of the same base you add them, after writing \\(125\\) as \\(5^{3}\\)."
      },
      {
        "text": "\\(5^{19}\\)",
        "correct": true,
        "feedback": "Correct. \\(125 = 5^{3}\\), so \\(125^{5} = 5^{3×5} = 5^{15}\\). Then \\(5^{15} × 5^{4} = 5^{19}\\)."
      }
    ],
    "backward": "Writing a number as a power of a smaller base, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same idea to solve equations with different bases."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "What is the value of \\((2\\sqrt{5})^{2}\\)?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. \\((2\\sqrt{5})^{2} = 2^{2} × (\\sqrt{5})^{2} = 4 × 5 = 20\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), adding \\(2^{2}\\) and \\(5\\). The square of a product is a product: \\(4 × 5\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Chose \\(10\\), squaring only the \\(\\sqrt{5}\\). The \\(2\\) in front is also squared: \\(2^{2} = 4\\)."
      },
      {
        "text": "\\(4\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{5}\\), doubling instead of squaring. Squaring means multiplying the whole thing by itself."
      }
    ],
    "backward": "Squaring a product, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you square brackets such as \\((2 + \\sqrt{3})^{2}\\)."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\(0.0016^{\\frac{1}{2}}\\)?",
    "options": [
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "Chose \\(0.4\\), with one decimal place too few. \\(0.0016\\) has \\(4\\) decimal places, so its square root has \\(2\\)."
      },
      {
        "text": "\\(0.0016\\)",
        "correct": false,
        "feedback": "Chose \\(0.0016\\), leaving the number as it is. A power of \\(\\frac{1}{2}\\) means take the square root."
      },
      {
        "text": "\\(0.0008\\)",
        "correct": false,
        "feedback": "Chose \\(0.0008\\), halving \\(0.0016\\). A power of \\(\\frac{1}{2}\\) is a square root, not half."
      },
      {
        "text": "\\(0.04\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0016 = \\frac{16}{10\\,000}\\), so its square root is \\(\\frac{\\sqrt{16}}{\\sqrt{10\\,000}} = \\frac{4}{100} = 0.04\\)."
      }
    ],
    "backward": "Square roots of decimals, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you evaluate decimal powers in mixed problems."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "A square has sides of length \\(5\\sqrt{2}\\) cm. What is its perimeter?",
    "options": [
      {
        "text": "\\(50\\) cm",
        "correct": false,
        "feedback": "Chose \\(50\\) cm, working out the area \\((5\\sqrt{2})^{2} = 50\\). The perimeter adds the four sides: \\(4 × 5\\sqrt{2}\\)."
      },
      {
        "text": "\\(4\\sqrt{2}\\) cm",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{2}\\) cm, leaving out the \\(5\\) in front of the root. Every side is \\(5\\sqrt{2}\\), so the perimeter is \\(4 × 5\\sqrt{2}\\)."
      },
      {
        "text": "\\(20\\sqrt{2}\\) cm",
        "correct": true,
        "feedback": "Correct. Perimeter = \\(4 × 5\\sqrt{2} = 20\\sqrt{2}\\) cm."
      },
      {
        "text": "\\(15\\sqrt{2}\\) cm",
        "correct": false,
        "feedback": "Chose \\(15\\sqrt{2}\\) cm, adding only three sides. A square has four equal sides: \\(4 × 5\\sqrt{2}\\)."
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
  title: "Real Numbers, Indices and Surds — Speed & Strategy",
  subtitle: "Grade 9 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every real numbers, indices and surds cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: you have 25 minutes for its 20 questions, about 75 seconds each, so strategy matters. The re-check questions after it are not timed. Move quickly on the one-step questions. Slow down on traps, which look easy but hide a common pitfall: a power of zero, a repeating block, a fraction that simplifies, a root that is not a perfect square. If a challenge question is eating your time, mark it, move on, and come back. A wrong answer here shows which pitfalls still catch you, so it is useful information.</p><p>You will meet all six topics, mixed together. The clock starts when you continue.</p>",
  timedSeconds: 1500
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

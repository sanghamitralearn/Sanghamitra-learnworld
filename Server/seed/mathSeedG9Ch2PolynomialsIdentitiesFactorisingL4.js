// Polynomials, Identities and Factorising — Grade 9, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch02-polynomials-identities-factorising-level-4.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch2PolynomialsIdentitiesFactorisingL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-2-polynomials-identities-factorising";
const CHAPTER_NAME = "Polynomials, Identities and Factorising";
const LEVEL = 4;

const CLUSTER_NAMES = {
  "C1": "Polynomial basics and substitution",
  "C2": "Collecting and expanding",
  "C3": "Factorising I: common factors, grouping, squares",
  "C4": "Factorising quadratics",
  "C5": "Identities",
  "C6": "Remainder and factor theorems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "S",
    "question": "If \\(p(x) = −3x^{2} + 3x − 3\\), find \\(p(4)\\).",
    "options": [
      {
        "text": "\\(153\\)",
        "correct": false,
        "feedback": "Chose \\(153\\), by applying the power \\(2\\) to the coefficient as well, as if the term were \\((−3x)^{2}\\). The power applies to \\(x\\) only: \\(−3 × (4)^{2}\\)."
      },
      {
        "text": "\\(−15\\)",
        "correct": false,
        "feedback": "Chose \\(−15\\), by reading \\(x^{2}\\) as \\(2x\\), so \\((4)^{2}\\) became \\(2 × (4) = 8\\). A power means repeated multiplication: \\((4)^{2} = 16\\)."
      },
      {
        "text": "\\(−39\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = 4\\) into every term: \\(−3(4)^{2} + 3(4) − 3 = −39\\)."
      },
      {
        "text": "\\(−36\\)",
        "correct": false,
        "feedback": "Chose \\(−36\\), by leaving out the constant term \\(−3\\). Every term counts, including the number on its own."
      }
    ],
    "retryHint": "Replace every \\(x\\) by the number, work out the power first, then multiply and add.",
    "backward": "Substituting into expressions, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter the remainder theorem turns division by \\((x − a)\\) into this kind of substitution."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "S",
    "question": "\\(x^{2} + kx + 12 = (x + 3)(x + 4)\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−7\\)",
        "correct": false,
        "feedback": "Chose \\(−7\\), by getting the sign wrong. The brackets give \\(3x + 4x = 7x\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(x^{2} + (3 + 4)x + 3 × 4\\). The coefficient of \\(x\\) is \\(3 + 4 = 7\\), so \\(k = 7\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), by subtracting the numbers. Both cross terms are added: \\(3x + 4x\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Chose \\(12\\), by multiplying \\(3\\) and \\(4\\). The coefficient of \\(x\\) comes from adding the numbers."
      }
    ],
    "retryHint": "Expand the two brackets and compare the coefficient of \\(x\\) with the one in the quadratic.",
    "backward": "Expanding two brackets, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you compare coefficients to solve problems about quadratics."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "tier": "S",
    "question": "Expand \\(3x^{2}(−6x^{2} − 5)\\).",
    "options": [
      {
        "text": "\\(−18x^{4} − 15x^{2}\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term in the bracket by \\(3x^{2}\\): \\(3x^{2} × (−6x^{2}) = −18x^{4}\\); \\(3x^{2} × (−5) = −15x^{2}\\). The result is \\(−18x^{4} − 15x^{2}\\)."
      },
      {
        "text": "\\(−18x^{4} − 15\\)",
        "correct": false,
        "feedback": "Chose \\(−18x^{4} − 15\\), by writing the new powers as the product of the old ones. When you multiply by \\(x^{2}\\) you add \\(2\\) to each power."
      },
      {
        "text": "\\(−18x^{4} − 5\\)",
        "correct": false,
        "feedback": "Chose \\(−18x^{4} − 5\\), by forgetting to multiply the last term. Every term inside the bracket is multiplied, including the last."
      },
      {
        "text": "\\(−3x^{4} − 2x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−3x^{4} − 2x^{2}\\), by adding the coefficients instead of multiplying them. Multiply every term inside the bracket by \\(3x^{2}\\)."
      }
    ],
    "retryHint": "Multiply the term outside by every term inside the bracket, one at a time, and keep each sign.",
    "backward": "Multiplying a term over a bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise by taking out a common factor, which is this step run backwards."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "tier": "S",
    "question": "Expand \\((x − 2)^{2}\\).",
    "options": [
      {
        "text": "\\(x^{2} − 2x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 2x + 4\\), using \\(−2x\\) for the middle term. The middle term is twice the product, \\(−4x\\)."
      },
      {
        "text": "\\(x^{2} + 4x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 4x + 4\\), getting the sign of the middle term wrong. It has the same sign as the term \\(−2\\) in the bracket."
      },
      {
        "text": "\\(x^{2} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 4\\), squaring each term and leaving out the middle term. \\((x − 2)^{2}\\) means \\((x − 2)(x − 2)\\), so there is a middle term \\(−4x\\)."
      },
      {
        "text": "\\(x^{2} − 4x + 4\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\) with \\(a = x\\) and \\(b = 2\\) gives \\(x^{2} − 4x + 4\\)."
      }
    ],
    "retryHint": "The middle term of \\((a − b)^{2}\\) is negative and the last term is positive. Multiply the bracket by itself to check.",
    "backward": "Multiplying brackets that contain a minus, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet the matching factorisation of a perfect square with a minus."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "tier": "S",
    "question": "One of these expressions is a difference of two squares. Which one?",
    "options": [
      {
        "text": "\\(x^{3} − 16\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} − 16\\), but \\(x^{3}\\) is not a square term: its power is odd."
      },
      {
        "text": "\\(25x^{2} − 16\\)",
        "correct": true,
        "feedback": "Correct. \\(25x^{2} − 16 = (5x)^{2} − 4^{2}\\), one square minus another square, so it is a difference of two squares."
      },
      {
        "text": "\\(25x^{2} + 16\\)",
        "correct": false,
        "feedback": "Chose \\(25x^{2} + 16\\), but it is a sum of two squares, not a difference. A difference of two squares has a minus sign between the squares."
      },
      {
        "text": "\\(6x^{2} − 16\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2} − 16\\), but the coefficient \\(6\\) is not a perfect square, so \\(6x^{2}\\) is not a square term."
      }
    ],
    "retryHint": "Check each option for two things: both terms are squares and there is a minus between them.",
    "backward": "Recognising square numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise any difference of two squares as \\((a − b)(a + b)\\)."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "tier": "S",
    "question": "When \\(f(x)\\) is divided by \\((x + 3)\\) the remainder is \\(0\\). Which statement must be true?",
    "options": [
      {
        "text": "\\(f(3) = 0\\)",
        "correct": false,
        "feedback": "Chose \\(f(3) = 0\\), but it uses \\(x = 3\\). The divisor \\((x + 3)\\) is zero when \\(x = −3\\)."
      },
      {
        "text": "\\(f(−3) = 0\\)",
        "correct": true,
        "feedback": "Correct. The remainder when dividing by \\((x + 3)\\) is \\(f(−3)\\), so \\(f(−3) = 0\\). This also means \\((x + 3)\\) is a factor of \\(f(x)\\)."
      },
      {
        "text": "\\(f(0) = −3\\)",
        "correct": false,
        "feedback": "Chose \\(f(0) = −3\\), but it mixes up the divisor with the value of the polynomial. The remainder theorem is about \\(f\\) at the number that makes the divisor zero."
      },
      {
        "text": "\\(f(x) = −3\\)",
        "correct": false,
        "feedback": "Chose \\(f(x) = −3\\), but it confuses the number in the divisor with the value of the polynomial."
      }
    ],
    "retryHint": "Find the number that makes the divisor zero. The remainder equals the value of the polynomial at that number.",
    "backward": "What a zero remainder means in a division, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use statements like this to find unknown coefficients."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "S",
    "question": "Which of these values is a zero of \\(p(x) = x^{2} − 4x − 12\\)?",
    "options": [
      {
        "text": "\\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\), which has the wrong sign. \\(p(−6) = 48\\), not \\(0\\)."
      },
      {
        "text": "\\(−4\\)",
        "correct": false,
        "feedback": "Chose \\(−4\\), which is the coefficient of \\(x\\). \\(p(−4) = 20\\), not \\(0\\)."
      },
      {
        "text": "\\(−12\\)",
        "correct": false,
        "feedback": "Chose \\(−12\\), which is the constant term. \\(p(−12) = 180\\), not \\(0\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. A zero is a value of \\(x\\) that makes \\(p(x)\\) equal to \\(0\\). Substituting \\(x = 6\\) gives \\(p(6) = 0\\), so it is a zero."
      }
    ],
    "retryHint": "Substitute each value into the polynomial in turn. A zero is a value that gives exactly \\(0\\).",
    "backward": "Squares and square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter a zero of a polynomial gives you a factor, and a factor gives you a zero."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "S",
    "question": "\\(x^{2} + 12x + k = (x + 4)(x + 8)\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Chose \\(12\\), by adding \\(4\\) and \\(8\\). The last term comes from multiplying the numbers."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Chose \\(44\\), by adding the sum to the product. The last term is the product only."
      },
      {
        "text": "\\(−32\\)",
        "correct": false,
        "feedback": "Chose \\(−32\\), by getting the sign wrong. Multiplying \\(4 × 8\\) gives \\(32\\)."
      },
      {
        "text": "\\(32\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(x^{2} + (4 + 8)x + 4 × 8\\). The constant term is \\(4 × 8 = 32\\), so \\(k = 32\\)."
      }
    ],
    "retryHint": "Expand the two brackets and compare the number term with the one in the quadratic. Multiply the two numbers, keeping their signs.",
    "backward": "Multiplying numbers with signs, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same comparison of the number term to find unknown constants."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "T",
    "question": "Which expression below is not a polynomial?",
    "options": [
      {
        "text": "\\(3x^{2} − 5x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2} − 5x + 3\\), but it is a polynomial. Its powers of \\(x\\) are \\(2\\), \\(1\\), \\(0\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      },
      {
        "text": "\\(−x^{3} + 4x^{2} + 6\\)",
        "correct": false,
        "feedback": "Chose \\(−x^{3} + 4x^{2} + 6\\), but it is a polynomial. Its powers of \\(x\\) are \\(3\\), \\(2\\), \\(0\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      },
      {
        "text": "\\(3x^{3} + 5^{x}\\)",
        "correct": true,
        "feedback": "Correct. A polynomial only has whole-number powers of \\(x\\), none below zero. Here \\(x\\) is in the exponent, not a whole-number power, so this is not a polynomial."
      },
      {
        "text": "\\(−2x^{4} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(−2x^{4} + 4\\), but it is a polynomial. Its powers of \\(x\\) are \\(4\\), \\(0\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      }
    ],
    "backward": "Whole-number powers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you check that an expression is a polynomial before you use the remainder theorem on it."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "T",
    "question": "Which of the following cannot be written as a product of two brackets with whole numbers?",
    "options": [
      {
        "text": "\\(x^{2} − 4x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 4x + 3\\), but it does factorise: \\(x^{2} − 4x + 3 = (x − 3)(x − 1)\\)."
      },
      {
        "text": "\\(x^{2} + 2x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 2x − 3\\), but it does factorise: \\(x^{2} + 2x − 3 = (x − 1)(x + 3)\\)."
      },
      {
        "text": "\\(x^{2} − 7x − 2\\)",
        "correct": true,
        "feedback": "Correct. For \\(x^{2} − 7x − 2\\) you need two whole numbers that multiply to \\(−2\\) and add to \\(−7\\), and there are none, so it does not factorise with whole numbers."
      },
      {
        "text": "\\(x^{2} + 6x + 8\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 6x + 8\\), but it does factorise: \\(x^{2} + 6x + 8 = (x + 2)(x + 4)\\)."
      }
    ],
    "backward": "Factor pairs of whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet quadratics that need a different method, and in a later chapter you solve them with a formula."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "tier": "T",
    "question": "Simplify \\((6x^{2} + 6x − 5) − (x^{2} + x + 2)\\).",
    "options": [
      {
        "text": "\\(−5x^{2} − 5x + 7\\)",
        "correct": false,
        "feedback": "Chose \\(−5x^{2} − 5x + 7\\), by subtracting in the wrong order. The first polynomial comes first: (first) − (second)."
      },
      {
        "text": "\\(5x^{2} + 5x − 7\\)",
        "correct": true,
        "feedback": "Correct. The minus sign changes every term in the second bracket: \\(6 − 1 = 5\\) for \\(x^{2}\\), \\(6 − 1 = 5\\) for \\(x\\), and \\(−5 − 2 = −7\\) for the constants."
      },
      {
        "text": "\\(5x^{2} + 5x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} + 5x − 3\\), by changing the signs of the first two terms of the second bracket but not the constant. The minus sign changes all three terms."
      },
      {
        "text": "\\(5x^{2} + 7x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} + 7x − 3\\), by changing the sign of the first term of the second bracket only. The minus in front of the bracket changes every term inside it."
      }
    ],
    "backward": "Subtracting a bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you need the same care with signs when you expand a bracket that follows a minus."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "tier": "T",
    "question": "Exactly one of these equations is true for every value of \\(x\\). Which one?",
    "options": [
      {
        "text": "\\((x + 6)^{2} = x^{2} + 12x + 36\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 6)^{2} = x^{2} + 12x + 36\\) is true for every value of \\(x\\) because the right side is the full expansion of the left side. The other three have a term missing or the wrong sign."
      },
      {
        "text": "\\((x + 6)^{3} = x^{3} + 216\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{3} = x^{3} + 216\\), but it is not an identity: cubing a bracket gives two extra middle terms."
      },
      {
        "text": "\\((x − 6)^{2} = x^{2} − 36\\)",
        "correct": false,
        "feedback": "Chose \\((x − 6)^{2} = x^{2} − 36\\), but it is not an identity: it is \\((x − 6)^{2} = x^{2} − 12x + 36\\), not a difference of squares."
      },
      {
        "text": "\\((x − 6)^{3} = x^{3} − 18x^{2} + 108x + 216\\)",
        "correct": false,
        "feedback": "Chose \\((x − 6)^{3} = x^{3} − 18x^{2} + 108x + 216\\), but it is not an identity: the last term should be \\(−216\\)."
      }
    ],
    "backward": "Testing an equation with a value, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet identities that look like equations but hold for every value."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "tier": "T",
    "question": "Exactly one of these is a perfect square. Which one?",
    "options": [
      {
        "text": "\\(x^{2} − 8x + 17\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 8x + 17\\), but the last term \\(17\\) is not a perfect square."
      },
      {
        "text": "\\(x^{2} − 8x + 16\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} − 8x + 16 = (x − 4)^{2}\\), because the end terms are squares and the middle term is twice the product of their roots."
      },
      {
        "text": "\\(x^{2} − 9x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 9x + 16\\), but the middle term should be twice the product of \\(1x\\) and \\(−4\\), which is \\(−8x\\), not \\(−9x\\)."
      },
      {
        "text": "\\(x^{2} − 16x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 16x + 16\\), but the middle term should be \\(−8x\\). \\(−16x\\) is twice as large."
      }
    ],
    "backward": "Checking a middle term against twice a product (earlier in this chapter).",
    "forward": "In a later chapter you complete the square, which builds a perfect square on purpose."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "tier": "T",
    "question": "Which of these is a factor of \\(3x^{3} − 5x^{2} + 10x + 4\\)?",
    "options": [
      {
        "text": "\\(3x + 1\\)",
        "correct": true,
        "feedback": "Correct. The bracket \\((3x + 1)\\) is zero when \\(x = −\\frac{1}{3}\\). Substituting gives \\(0\\), so by the factor theorem \\((3x + 1)\\) is a factor."
      },
      {
        "text": "\\(x − 1\\)",
        "correct": false,
        "feedback": "Chose \\(x − 1\\), but substituting the value that makes \\((x − 1)\\) zero gives \\(12\\), which is not \\(0\\), so \\((x − 1)\\) is not a factor."
      },
      {
        "text": "\\(x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x + 1\\), but substituting the value that makes \\((x + 1)\\) zero gives \\(−14\\), which is not \\(0\\), so \\((x + 1)\\) is not a factor."
      },
      {
        "text": "\\(3x − 1\\)",
        "correct": false,
        "feedback": "Chose \\(3x − 1\\), but substituting the value that makes \\((3x − 1)\\) zero gives a number that is not \\(0\\), so \\((3x − 1)\\) is not a factor."
      }
    ],
    "backward": "Finding the value that makes a bracket zero (earlier in this chapter).",
    "forward": "Later in this chapter you factorise cubics whose first term has a number in front."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "C",
    "question": "For \\(p(x) = 3x^{2} + x + 4\\), which statement is false?",
    "options": [
      {
        "text": "The degree of \\(p(x)\\) is \\(2\\)",
        "correct": false,
        "feedback": "Chose \"The degree of \\(p(x)\\) is \\(2\\)\", which is true: its degree is \\(2\\), the highest power of \\(x\\). The question asks for the false statement."
      },
      {
        "text": "\\(p(0) = −4\\)",
        "correct": true,
        "feedback": "Correct. This statement is false. In fact \\(p(0)\\) is the constant term, \\(4\\), because every term with \\(x\\) becomes \\(0\\)."
      },
      {
        "text": "The leading coefficient of \\(p(x)\\) is \\(3\\)",
        "correct": false,
        "feedback": "Chose \"The leading coefficient of \\(p(x)\\) is \\(3\\)\", which is true: the leading coefficient is \\(3\\), the number multiplying \\(x^{2}\\). The question asks for the false statement."
      },
      {
        "text": "\\(p(1) = 8\\)",
        "correct": false,
        "feedback": "Chose \"\\(p(1) = 8\\)\", which is true: \\(p(1)\\) is the sum of the coefficients: \\(3 + 1 + 4 = 8\\). The question asks for the false statement."
      }
    ],
    "backward": "Testing statements one at a time, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you test a claim about a polynomial by substituting one value."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "C",
    "question": "Factorise \\(3x^{2} + 8x + 5\\) completely.",
    "options": [
      {
        "text": "\\((3x + 5)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 5)(x − 1)\\), changing the sign of one number. Expanding gives \\(3x^{2} + 2x − 5\\), not the original."
      },
      {
        "text": "\\((3x + 1)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 1)(x + 5)\\), putting the numbers \\(5\\) and \\(1\\) in the wrong brackets. Expanding gives \\(3x^{2} + 16x + 5\\), not the original."
      },
      {
        "text": "\\((3x + 5)(x + 1)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(3 × 5 = 15\\) and add to \\(8\\): \\(3\\) and \\(5\\). Splitting the middle term and grouping gives \\(3x^{2} + 8x + 5 = (3x + 5)(x + 1)\\). Check by expanding."
      },
      {
        "text": "\\((3x − 5)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 5)(x − 1)\\), the signs the wrong way round. Expanding gives \\(3x^{2} − 8x + 5\\), not the original."
      }
    ],
    "backward": "Factor pairs of larger numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve quadratic equations by factorising them like this."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "tier": "C",
    "question": "Expand and simplify \\((x − 6)(x − 1)\\).",
    "options": [
      {
        "text": "\\(x^{2} + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 6\\), by multiplying only the first terms and the last terms. The two cross products \\(−x\\) and \\(−6x\\) are missing."
      },
      {
        "text": "\\(x^{2} − 7x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 7x − 6\\), by writing the last term as \\(−6\\). Multiplying the last terms gives \\(−6 × (−1) = 6\\)."
      },
      {
        "text": "\\(x^{2} − 7x + 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply each term in the first bracket by each term in the second: \\(x^{2} − x − 6x + 6\\). Collecting the \\(x\\) terms gives \\(x^{2} − 7x + 6\\)."
      },
      {
        "text": "\\(x^{2} − x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − x + 6\\), by including only one of the two cross products. Both must be added: \\(−1x\\) and \\(−6x\\)."
      }
    ],
    "backward": "Multiplying two negative terms, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the signs of this expansion to decide the signs in a factorisation."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "tier": "C",
    "question": "\\(a − b = 1\\) and \\(ab = 12\\). Find \\(a^{2} + b^{2}\\).",
    "options": [
      {
        "text": "\\(25\\)",
        "correct": true,
        "feedback": "Correct. \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\), so \\(a^{2} + b^{2} = (a − b)^{2} + 2ab = 1^{2} + 2 × 12 = 1 + 24 = 25\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), by squaring \\(a − b\\) and stopping. \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\), so \\(2ab = 24\\) must be added."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Chose \\(49\\), by adding \\(4ab\\). That is the formula for \\((a + b)^{2}\\), not \\(a^{2} + b^{2}\\)."
      },
      {
        "text": "\\(−23\\)",
        "correct": false,
        "feedback": "Chose \\(−23\\), by subtracting \\(2ab\\). \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\), so \\(a^{2} + b^{2} = (a − b)^{2} + 2ab\\)."
      }
    ],
    "backward": "Squaring a difference (earlier in this chapter).",
    "forward": "Later in this chapter you meet sum and product problems that need cubes."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "tier": "C",
    "question": "Factorise \\(4x^{2} − 36\\) completely.",
    "options": [
      {
        "text": "\\(4(x − 3)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(4(x − 3)^{2}\\), treating it as a perfect square. Expanding gives \\(4x^{2} − 24x + 36\\), which has a middle term the original does not have."
      },
      {
        "text": "\\((4x − 3)(4x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((4x − 3)(4x + 3)\\), treating \\(4x^{2}\\) as \\((4x)^{2}\\). Expanding gives \\(16x^{2} − 9\\), not the original."
      },
      {
        "text": "\\(4(x^{2} − 9)\\)",
        "correct": false,
        "feedback": "Chose \\(4(x^{2} − 9)\\), taking out the \\(4\\) but stopping there. The bracket is a difference of two squares, so it factorises again."
      },
      {
        "text": "\\(4(x − 3)(x + 3)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(4\\) first: \\(4(x^{2} − 9)\\). Then \\(x^{2} − 9\\) is a difference of two squares, so it factorises as \\((x − 3)(x + 3)\\). The answer is \\(4(x − 3)(x + 3)\\)."
      }
    ],
    "backward": "Taking out a common factor first (earlier in this chapter).",
    "forward": "Later in this chapter you meet quadratics that need a common factor and then a second factorisation."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "tier": "C",
    "question": "\\((x + 3)\\) is a factor of \\(x^{3} + x^{2} + kx + 12\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\), by leaving out the number term \\(12\\), so the equation became \\(−3k − 18 = 0\\). The whole polynomial must equal zero."
      },
      {
        "text": "\\(−2\\)",
        "correct": true,
        "feedback": "Correct. Since \\((x + 3)\\) is a factor, \\(f(−3) = 0\\). Substituting \\(x = −3\\) gives \\(−3k − 6 = 0\\), so \\(k = −2\\)."
      },
      {
        "text": "\\(−16\\)",
        "correct": false,
        "feedback": "Chose \\(−16\\), by substituting \\(x = 3\\). The factor \\((x + 3)\\) is zero when \\(x = −3\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), by solving \\(−3k − 6 = 0\\) with a sign slip, so \\(k = 2\\). Move the number term to the other side and change its sign before dividing."
      }
    ],
    "backward": "Substituting into a polynomial and solving for a letter (earlier in this chapter).",
    "forward": "Later in this chapter you use two conditions at once to find two unknown coefficients."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "C",
    "question": "The polynomial \\(p(x) = x^{3} + kx^{2} + 2x + 2\\) satisfies \\(p(−2) = −22\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−8\\)",
        "correct": false,
        "feedback": "Chose \\(−8\\), by moving \\(−10\\) across the equals sign without changing its sign, so \\(4k = −32\\) instead of \\(4k = −12\\)."
      },
      {
        "text": "\\(−3\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = −2\\) into \\(p(x)\\): \\(4k − 10 = −22\\). So \\(4k = −12\\) and \\(k = −3\\)."
      },
      {
        "text": "\\(−12\\)",
        "correct": false,
        "feedback": "Chose \\(−12\\), by stopping at \\(4k = −12\\) and not dividing by \\(4\\). Divide both sides by \\(4\\) to get \\(k\\)."
      },
      {
        "text": "\\(−9\\)",
        "correct": false,
        "feedback": "Chose \\(−9\\), by substituting \\(x = 2\\) instead of \\(x = −2\\). The condition \\(p(−2) = −22\\) says to use \\(x = −2\\)."
      }
    ],
    "backward": "Powers of negative numbers and solving for a letter, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you find an unknown coefficient from a remainder in the same way."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "C",
    "question": "A rectangle has area \\(x^{2} + 12x + 27\\) cm² and length \\((x + 9)\\) cm. Which expression gives its width in cm?",
    "options": [
      {
        "text": "\\(x + 3\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} + 12x + 27 = (x + 9)(x + 3)\\), because \\(9 × 3 = 27\\) and \\(9 + 3 = 12\\). The length is \\((x + 9)\\) cm, so the width is \\(x + 3\\) cm."
      },
      {
        "text": "\\(x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x − 3\\), by getting the sign wrong. Check: \\((x + 9)(x − 3) = x^{2} + 6x − 27\\), not \\(x^{2} + 12x + 27\\)."
      },
      {
        "text": "\\(x + 12\\)",
        "correct": false,
        "feedback": "Chose \\(x + 12\\), by using the coefficient \\(12\\) of \\(x\\) as the second number. The number must multiply with \\(9\\) to make \\(27\\)."
      },
      {
        "text": "\\(x + 27\\)",
        "correct": false,
        "feedback": "Chose \\(x + 27\\), by using the constant term \\(27\\) as the second number. It must multiply with \\(9\\) to make \\(27\\), so it is \\(3\\)."
      }
    ],
    "backward": "Writing an area as a product of two lengths, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use factorising to simplify fractions with quadratics in them."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "tier": "H",
    "question": "Expand and simplify \\((2x + 1)(x − 6)\\).",
    "options": [
      {
        "text": "\\(2x^{2} + 13x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(2x^{2} + 13x − 6\\), by ignoring the minus signs when adding the cross products. Keep the signs: \\(−12x\\) and \\(1x\\)."
      },
      {
        "text": "\\(2x^{2} − 12x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(2x^{2} − 12x − 6\\), by including only one of the two cross products. Both must be added: \\(−12x\\) and \\(1x\\)."
      },
      {
        "text": "\\(2x^{2} − 11x − 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply each term in the first bracket by each term in the second: \\(2x^{2} − 12x + x − 6\\). Collecting the \\(x\\) terms gives \\(2x^{2} − 11x − 6\\)."
      },
      {
        "text": "\\(3x^{2} − 11x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2} − 11x − 6\\), by adding \\(2\\) and \\(1\\) for the \\(x^{2}\\) term. Multiply them: \\(2 × 1 = 2\\)."
      }
    ],
    "backward": "Multiplying brackets with a number in front of \\(x\\), from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise quadratics with a number in front of \\(x^{2}\\), which is this expansion run backwards."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Identities",
    "tier": "H",
    "question": "\\(a + b = 9\\) and \\(ab = 20\\). Find \\(a^{3} + b^{3}\\).",
    "options": [
      {
        "text": "\\(1269\\)",
        "correct": false,
        "feedback": "Chose \\(1269\\), by adding \\(3ab(a + b)\\) instead of subtracting it."
      },
      {
        "text": "\\(729\\)",
        "correct": false,
        "feedback": "Chose \\(729\\), by cubing \\(a + b\\) and stopping. \\((a + b)^{3} = a^{3} + b^{3} + 3ab(a + b)\\), so \\(540\\) must be taken off."
      },
      {
        "text": "\\(669\\)",
        "correct": false,
        "feedback": "Chose \\(669\\), by subtracting \\(3ab\\) instead of \\(3ab(a + b)\\). The term is \\(3ab × (a + b) = 540\\)."
      },
      {
        "text": "\\(189\\)",
        "correct": true,
        "feedback": "Correct. \\((a + b)^{3} = a^{3} + b^{3} + 3ab(a + b)\\), so \\(a^{3} + b^{3} = 9^{3} − 3 × 20 × 9 = 729 − 540 = 189\\)."
      }
    ],
    "backward": "The cube of a sum (earlier in this chapter).",
    "forward": "In a later chapter you use sums and products of roots to avoid solving a quadratic."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "tier": "H",
    "question": "Factorise completely \\(5x^{4} − 80\\).",
    "options": [
      {
        "text": "\\(5(x^{2} − 2)(x^{2} + 2)\\)",
        "correct": false,
        "feedback": "Chose \\(5(x^{2} − 2)(x^{2} + 2)\\), using \\(2\\) where the square root of \\(16\\) is needed, which is \\(4\\). Expanding gives \\(5x^{4} − 20\\), not the original."
      },
      {
        "text": "\\(5(x^{2} + 4)(x − 2)(x + 2)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(5\\): \\(5(x^{4} − 16)\\). Then \\(x^{4} = (x^{2})^{2}\\) and \\(16 = 4^{2}\\), so \\(x^{4} − 16 = (x^{2} − 4)(x^{2} + 4)\\), and \\(x^{2} − 4 = (x − 2)(x + 2)\\). The answer is \\(5(x^{2} + 4)(x − 2)(x + 2)\\)."
      },
      {
        "text": "\\(5(x^{2} − 4)(x^{2} + 4)\\)",
        "correct": false,
        "feedback": "Chose \\(5(x^{2} − 4)(x^{2} + 4)\\), taking out the \\(5\\) and stopping after one difference of squares. \\(x^{2} − 4\\) is another difference of two squares, so it factorises again."
      },
      {
        "text": "\\(5(x^{2} − 4)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(5(x^{2} − 4)^{2}\\), treating it as a perfect square. Expanding gives \\(5x^{4} − 40x^{2} + 80\\), not the original."
      }
    ],
    "backward": "A common factor and writing \\(x^{4}\\) as a square (earlier in this chapter).",
    "forward": "Later in this chapter you carry out the same two stages in questions that mix several methods."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "tier": "H",
    "question": "Show that \\((x − 2)\\) is a factor of \\(2x^{3} + 9x^{2} − 11x − 30\\), then factorise it completely. Which is the complete factorisation?",
    "options": [
      {
        "text": "\\((x − 2)(2x + 3)(x + 5)\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 0\\), so \\((x − 2)\\) is a factor. Dividing gives \\(2x^{2} + 13x + 15 = (2x + 3)(x + 5)\\). So \\(2x^{3} + 9x^{2} − 11x − 30 = (x − 2)(2x + 3)(x + 5)\\)."
      },
      {
        "text": "\\((x − 2)(2x − 3)(x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)(2x − 3)(x − 5)\\), changing the signs of the last two factors. Expanding gives \\(2x^{3} − 17x^{2} + 41x − 30\\), not the original."
      },
      {
        "text": "\\((x + 2)(2x + 3)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(2x + 3)(x + 5)\\), changing the sign of the first factor. Expanding gives \\(2x^{3} + 17x^{2} + 41x + 30\\), not the original."
      },
      {
        "text": "\\((x − 2)(2x^{2} + 13x + 15)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)(2x^{2} + 13x + 15)\\), stopping after one division. The quadratic factor can be factorised again."
      }
    ],
    "backward": "Splitting the middle term of a quadratic with a number in front (earlier in this chapter).",
    "forward": "In a later chapter you find the roots of a cubic whose first term has a number in front."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "tier": "C",
    "question": "A rectangle has length \\((x + 4)\\) cm and width \\((x − 4)\\) cm. Find its perimeter when \\(x = 8\\).",
    "options": [
      {
        "text": "\\(16\\) cm",
        "correct": false,
        "feedback": "Chose \\(16\\) cm, by adding the length and width only: \\(12 + 4\\). The perimeter goes all the way round, so double it."
      },
      {
        "text": "\\(40\\) cm",
        "correct": false,
        "feedback": "Chose \\(40\\) cm, by using \\(x = 8\\) as the width instead of \\(4\\). The width is \\((x − 4)\\), which is \\(4\\)."
      },
      {
        "text": "\\(48\\) cm",
        "correct": false,
        "feedback": "Chose \\(48\\) cm, by multiplying \\(12 × 4\\), which is the area. The perimeter adds the four sides."
      },
      {
        "text": "\\(32\\) cm",
        "correct": true,
        "feedback": "Correct. Length = \\(8 + 4 = 12\\) cm and width = \\(8 − 4 = 4\\) cm. Perimeter = \\(2 × (12 + 4) = 32\\) cm."
      }
    ],
    "backward": "Writing a perimeter as an algebraic expression, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you expand \\((x + a)(x − b)\\) so that the area becomes one polynomial."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "tier": "H",
    "question": "Factorise \\(x^{2} + 2xy − 8y^{2}\\) completely.",
    "options": [
      {
        "text": "\\((x + 2y)(x + 4y)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2y)(x + 4y)\\), changing the sign of one number. Expanding gives \\(x^{2} + 6xy + 8y^{2}\\), not the original."
      },
      {
        "text": "\\((x − 4y)(x + 2y)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 4y)(x + 2y)\\), the signs the wrong way round. Expanding gives \\(x^{2} − 2xy − 8y^{2}\\), not the original."
      },
      {
        "text": "\\((x − 8y)(x + y)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 8y)(x + y)\\), using \\(−8\\) and \\(1\\), which multiply to \\(−8\\) but add to \\(−7\\), not \\(2\\)."
      },
      {
        "text": "\\((x − 2y)(x + 4y)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−8\\) and add to \\(2\\): \\(−2\\) and \\(4\\). So \\(x^{2} + 2xy − 8y^{2} = (x − 2y)(x + 4y)\\)."
      }
    ],
    "backward": "Expanding two brackets with two letters, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use factorising like this to simplify algebraic fractions."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Find the value of \\(−x^{2} + 3xy − 5y\\) when \\(x = 2\\) and \\(y = −3\\).",
    "options": [
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), by ignoring the minus sign of \\(y = −3\\). Use \\(y = −3\\) as given."
      },
      {
        "text": "\\(−37\\)",
        "correct": false,
        "feedback": "Chose \\(−37\\), by swapping the values, using \\(x = −3\\) and \\(y = 2\\). Match each value to its own letter."
      },
      {
        "text": "\\(−7\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = 2\\) and \\(y = −3\\): \\(−1 × (2)^{2} + 3 × (2) × (−3) − 5 × (−3) = −7\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), by reading the \\(xy\\) term as \\(x + y\\). In \\(3xy\\) the letters are multiplied: \\(2 × (−3)\\)."
      }
    ],
    "backward": "Substituting two letters at once, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you substitute into identities with two letters to check them."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "In the expansion of \\((x + 5)(−2x^{2} − 4x + 1)\\), what is the coefficient of \\(x\\)?",
    "options": [
      {
        "text": "\\(−19\\)",
        "correct": true,
        "feedback": "Correct. Only products that give \\(x\\) count: \\((x) × (1) = x\\) and \\((5) × (−4x) = −20x\\). Their sum is \\(−19\\), so the coefficient is \\(−19\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), by including only the product \\((x) × (1)\\). The product \\((5) × (−4x)\\) also gives an \\(x\\) term."
      },
      {
        "text": "\\(−14\\)",
        "correct": false,
        "feedback": "Chose \\(−14\\), by reading off the coefficient of \\(x^{2}\\) instead of \\(x\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), by reading off the constant term instead of the coefficient of \\(x\\)."
      }
    ],
    "backward": "Choosing pairs of terms from two brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check a factorisation by looking at one coefficient of its expansion."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(9x^{2} + 12x + 4\\).",
    "options": [
      {
        "text": "\\((3x + 2)^{2}\\)",
        "correct": true,
        "feedback": "Correct. The first and last terms are squares: \\(9x^{2} = (3x)^{2}\\) and \\(4 = 2^{2}\\), and the middle term \\(12x\\) is twice \\(3x × 2\\). So \\(9x^{2} + 12x + 4 = (3x + 2)^{2}\\)."
      },
      {
        "text": "\\((9x + 2)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((9x + 2)^{2}\\), using \\(9x\\) instead of \\(3x\\), the square root of \\(9x^{2}\\). Expanding gives \\(81x^{2} + 36x + 4\\), not the original."
      },
      {
        "text": "\\((3x − 2)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 2)^{2}\\), getting the sign wrong. Expanding gives \\(9x^{2} − 12x + 4\\), not the original."
      },
      {
        "text": "\\((3x + 2)(3x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 2)(3x − 2)\\), using the difference-of-squares pattern. Expanding gives \\(9x^{2} − 4\\), which has no middle term."
      }
    ],
    "backward": "Square roots of numbers and twice a product, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise other quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(x^{3} − 2x^{2} − 5x + 10\\).",
    "options": [
      {
        "text": "\\(x^{2}(x − 2) − 5(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2}(x − 2) − 5(x − 2)\\), stopping half-way. The expression \\(x^{2}\\)(...) + ... is not a product until the common bracket is taken out as a factor."
      },
      {
        "text": "\\((x + 2)(x^{2} − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(x^{2} − 5)\\), getting the sign of \\(−2\\) wrong in the common bracket. Expanding gives \\(x^{3} + 2x^{2} − 5x − 10\\), not the original."
      },
      {
        "text": "\\((x − 2)(x^{2} − 5)\\)",
        "correct": true,
        "feedback": "Correct. Group in pairs: \\(x^{2}(x − 2) − 5(x − 2)\\). The bracket \\((x − 2)\\) is common, so \\(x^{3} − 2x^{2} − 5x + 10 = (x − 2)(x^{2} − 5)\\)."
      },
      {
        "text": "\\((x^{2} − 2)(x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x^{2} − 2)(x − 5)\\), swapping the two numbers \\(−2\\) and \\(−5\\). Expanding gives \\(x^{3} − 5x^{2} − 2x + 10\\), not the original."
      }
    ],
    "backward": "Common factors of pairs of terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use grouping again when you factorise quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(3x^{2} + 11x − 4\\).",
    "options": [
      {
        "text": "\\((3x − 1)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 1)(x − 4)\\), changing the sign of one number. Expanding gives \\(3x^{2} − 13x + 4\\), not the original."
      },
      {
        "text": "\\((3x − 1)(x + 4)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(3 × (−4) = −12\\) and add to \\(11\\): \\(12\\) and \\(−1\\). Splitting the middle term and grouping gives \\(3x^{2} + 11x − 4 = (3x − 1)(x + 4)\\). Check by expanding."
      },
      {
        "text": "\\((3x + 4)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 4)(x − 1)\\), putting the numbers \\(−1\\) and \\(4\\) in the wrong brackets. Expanding gives \\(3x^{2} + x − 4\\), not the original."
      },
      {
        "text": "\\((3x + 1)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 1)(x − 4)\\), the signs the wrong way round. Expanding gives \\(3x^{2} − 11x − 4\\), not the original."
      }
    ],
    "backward": "Factor pairs with negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use these factorisations to find where a curve crosses the \\(x\\)-axis."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise completely \\(4x^{2} + 12x − 72\\).",
    "options": [
      {
        "text": "\\(4(x − 3)(x + 6)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(4\\): \\(4(x^{2} + 3x − 18)\\). Then find two numbers that multiply to \\(−18\\) and add to \\(3\\): \\(−3\\) and \\(6\\). The answer is \\(4(x − 3)(x + 6)\\)."
      },
      {
        "text": "\\((4x − 12)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((4x − 12)(x + 6)\\), multiplying the \\(4\\) into one bracket only. This is correct but not fully factorised, because \\(4x − 12\\) still has the common factor \\(4\\)."
      },
      {
        "text": "\\(4(x^{2} + 3x − 18)\\)",
        "correct": false,
        "feedback": "Chose \\(4(x^{2} + 3x − 18)\\), taking out the \\(4\\) but stopping there. The bracket is a quadratic that factorises again."
      },
      {
        "text": "\\((x − 3)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 3)(x + 6)\\), leaving out the common factor \\(4\\). Expanding gives \\(x^{2} + 3x − 18\\), which is \\(4\\) times too small."
      }
    ],
    "backward": "Taking out a common factor, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you combine a common factor with a difference of two squares or a perfect square."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "\\(x^{2} + kx + 100\\) is a perfect square and \\(k\\) is positive. Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "Chose \\(100\\), by using the last term. The middle term is twice the square root of the last term."
      },
      {
        "text": "\\(200\\)",
        "correct": false,
        "feedback": "Chose \\(200\\), by doubling the last term. The middle term is twice the square root, not twice the last term."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Chose \\(40\\), by doubling twice. The middle term is \\(2 × 10 = 20\\) only."
      },
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. A perfect square has the form \\((x + 10)^{2} = x^{2} + 20x + 100\\). So \\(k = 2 × 10 = 20\\)."
      }
    ],
    "backward": "Square roots and doubling, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you complete the square, which builds a perfect square on purpose."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Without a calculator, work out \\(7 × 13\\) using an identity.",
    "options": [
      {
        "text": "\\(91\\)",
        "correct": true,
        "feedback": "Correct. Write \\(7 = 10 − 3\\) and \\(13 = 10 + 3\\). Then \\(7 × 13 = 10^{2} − 3^{2} = 100 − 9 = 91\\)."
      },
      {
        "text": "\\(97\\)",
        "correct": false,
        "feedback": "Chose \\(97\\), by not squaring \\(3\\). The identity gives \\(10^{2} − 3^{2}\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Chose \\(49\\), by treating \\(7 × 13\\) as \\(7^{2}\\). The two numbers are different, so the identity is \\(a^{2} − b^{2}\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "Chose \\(100\\), by leaving out the second square. \\(7 × 13 = 10^{2} − 3^{2}\\), not \\(10^{2}\\)."
      }
    ],
    "backward": "Products near a round number, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet the same shortcut written with letters."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Find the remainder when \\(f(x) = x^{3} + x^{2} − 7x + 5\\) is divided by \\((x − 2)\\).",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), by adding the number from the divisor to the value. The remainder is \\(f(2)\\) exactly."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), by substituting into the quotient instead. The remainder is the value of the original polynomial at \\(x = 2\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Chose \\(15\\), by substituting \\(x = −2\\) instead of \\(x = 2\\). The divisor is \\((x − 2)\\), which is zero when \\(x = 2\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. The divisor \\((x − 2)\\) is zero when \\(x = 2\\). By the remainder theorem the remainder is \\(f(2) = 3\\)."
      }
    ],
    "backward": "Substituting into expressions, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use a zero remainder to prove that a bracket is a factor."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "\\((x − 3)\\) and \\((x − 1)\\) are both factors of \\(x^{3} + px^{2} + qx − 6\\). Find the value of \\(q\\).",
    "options": [
      {
        "text": "\\(−7\\)",
        "correct": false,
        "feedback": "Chose \\(−7\\), by substituting \\(x = 3\\) and \\(x = −1\\). The factors \\((x − 3)\\) and \\((x − 1)\\) are zero when \\(x = 3\\) and \\(x = 1\\)."
      },
      {
        "text": "\\(−11\\)",
        "correct": false,
        "feedback": "Chose \\(−11\\), by a sign slip when subtracting the two equations to remove one letter, which gives \\(−11\\) instead of \\(11\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(f(3) = 0\\) gives \\(9p + 3q + 21 = 0\\), and \\(f(1) = 0\\) gives \\(p + q − 5 = 0\\). Solving the two equations gives \\(p = −6\\) and \\(q = 11\\), so the answer is \\(11\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), by substituting \\(x = −3\\) and \\(x = 1\\). The factors \\((x − 3)\\) and \\((x − 1)\\) are zero when \\(x = 3\\) and \\(x = 1\\)."
      }
    ],
    "backward": "Substituting values into polynomials and solving for a letter (earlier in this chapter).",
    "forward": "In a later chapter you solve two equations in two letters by elimination."
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
  title: "Polynomials, Identities and Factorising — Speed & Strategy",
  subtitle: "Grade 9 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every polynomials, identities and factorising cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: you have 25 minutes for its 20 questions, about 75 seconds each, so strategy matters. The re-check questions after it are not timed. Move quickly on the one-step questions. Slow down on traps, which look easy but hide a common pitfall: a factorisation that is not complete, a minus sign in an identity, a quadratic that does not factorise, a root that has the wrong sign. If a challenge question is eating your time, mark it, move on, and come back. A wrong answer here shows which pitfalls still catch you, so it is useful information.</p><p>You will meet all six topics, mixed together. The clock starts when you continue.</p>",
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

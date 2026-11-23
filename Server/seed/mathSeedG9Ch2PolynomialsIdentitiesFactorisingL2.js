// Polynomials, Identities and Factorising — Grade 9, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch02-polynomials-identities-factorising-level-2.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch2PolynomialsIdentitiesFactorisingL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-2-polynomials-identities-factorising";
const CHAPTER_NAME = "Polynomials, Identities and Factorising";
const LEVEL = 2;

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
    "question": "Which expression below has degree \\(5\\)?",
    "options": [
      {
        "text": "\\(−4x^{5} − 4\\)",
        "correct": true,
        "feedback": "Correct. The degree is the highest power of \\(x\\). In this polynomial the highest power is \\(x^{5}\\)."
      },
      {
        "text": "\\(−4 − x^{4}\\)",
        "correct": false,
        "feedback": "Chose \\(−4 − x^{4}\\), but its highest power is \\(x^{4}\\), so its degree is \\(4\\), not \\(5\\)."
      },
      {
        "text": "\\(x^{6} + x^{3} + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{6} + x^{3} + 6\\), but its highest power is \\(x^{6}\\), so its degree is \\(6\\), not \\(5\\)."
      },
      {
        "text": "\\(−3x^{2} − 4\\)",
        "correct": false,
        "feedback": "Chose \\(−3x^{2} − 4\\), but its highest power is \\(x^{2}\\), so its degree is \\(2\\), not \\(5\\)."
      }
    ],
    "retryHint": "Find the highest power of \\(x\\) in each option, wherever it is written. That power is the degree.",
    "backward": "Powers of a letter, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you name quadratics and cubics by their degree when you factorise and divide."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} − 12x + 32\\).",
    "options": [
      {
        "text": "\\((x − 32)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 32)(x − 1)\\), using \\(−32\\) and \\(−1\\), which multiply to \\(32\\) but add to \\(−33\\), not \\(−12\\)."
      },
      {
        "text": "\\((x − 8)(x − 4)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(32\\) and add to \\(−12\\): \\(−8\\) and \\(−4\\). So \\(x^{2} − 12x + 32 = (x − 8)(x − 4)\\)."
      },
      {
        "text": "\\((x + 8)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 8)(x − 4)\\), changing the sign of one number. Expanding gives \\(x^{2} + 4x − 32\\), not the original."
      },
      {
        "text": "\\((x + 4)(x + 8)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 4)(x + 8)\\), the signs the wrong way round. Expanding gives \\(x^{2} + 12x + 32\\), not the original."
      }
    ],
    "retryHint": "The last term is positive and the middle term is negative, so both numbers are negative. List the factor pairs of the last term and test their sum.",
    "backward": "Adding negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet the same sign pattern in quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Expand \\(−2x(−5x^{2} − 3x + 3)\\).",
    "options": [
      {
        "text": "\\(10x^{3} − 3x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(10x^{3} − 3x + 3\\), by multiplying the first term only and leaving the others as they were. Every term inside the bracket is multiplied."
      },
      {
        "text": "\\(10x^{2} + 6x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(10x^{2} + 6x − 6\\), by writing the new powers as the product of the old ones. When you multiply by \\(x\\) you add \\(1\\) to each power."
      },
      {
        "text": "\\(10x^{3} + 6x^{2} − 6x\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term in the bracket by \\(−2x\\): \\(−2x × (−5x^{2}) = 10x^{3}\\); \\(−2x × (−3x) = 6x^{2}\\); \\(−2x × (3) = −6x\\). The result is \\(10x^{3} + 6x^{2} − 6x\\)."
      },
      {
        "text": "\\(10x^{3} + 6x^{2} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(10x^{3} + 6x^{2} + 3\\), by forgetting to multiply the last term. Every term inside the bracket is multiplied, including the last."
      }
    ],
    "retryHint": "Multiply every term in the bracket by the term outside, one at a time. A negative times a negative is positive.",
    "backward": "Multiplying by a negative term, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you take out a negative common factor, which undoes a product like this."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((4x − 5)^{2}\\).",
    "options": [
      {
        "text": "\\(16x^{2} − 40x + 25\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\) with \\(a = 4x\\) and \\(b = 5\\) gives \\(16x^{2} − 40x + 25\\)."
      },
      {
        "text": "\\(4x^{2} − 40x + 25\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{2} − 40x + 25\\), not squaring the \\(4\\) in the first term. \\((4x)^{2} = 16x^{2}\\)."
      },
      {
        "text": "\\(16x^{2} + 40x + 25\\)",
        "correct": false,
        "feedback": "Chose \\(16x^{2} + 40x + 25\\), getting the sign of the middle term wrong. It has the same sign as the term \\(−5\\) in the bracket."
      },
      {
        "text": "\\(16x^{2} − 20x + 25\\)",
        "correct": false,
        "feedback": "Chose \\(16x^{2} − 20x + 25\\), using \\(−20x\\) for the middle term. The middle term is twice the product, \\(−40x\\)."
      }
    ],
    "retryHint": "Square the whole first term, including its number. Then find twice the product of the two terms, and square the last term.",
    "backward": "Squaring a product such as \\(4x\\), from the laws of indices (Ch1).",
    "forward": "Later in this chapter you factorise perfect squares that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(5x^{3} − 15x^{2}\\).",
    "options": [
      {
        "text": "\\(5x^{2}(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2}(x + 3)\\), getting a sign wrong inside the bracket. Expanding gives \\(5x^{3} + 15x^{2}\\), not the original."
      },
      {
        "text": "\\(5x^{2}(x − 3)\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor is \\(5x^{2}\\). Dividing each term by \\(5x^{2}\\) leaves \\(x − 3\\), so \\(5x^{3} − 15x^{2} = 5x^{2}(x − 3)\\)."
      },
      {
        "text": "\\(5x^{2}(x − 15)\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2}(x − 15)\\), dividing the last term by \\(x^{2}\\) but not by \\(5\\). Every term must be divided by the whole common factor \\(5x^{2}\\)."
      },
      {
        "text": "\\(x^{2}(5x − 15)\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2}(5x − 15)\\), taking out only \\(x^{2}\\). The bracket still has the common factor \\(5\\), so it is not fully factorised."
      }
    ],
    "retryHint": "Find the largest number and the highest power of \\(x\\) that divide both terms. Take them out, then expand to check.",
    "backward": "Taking out a common factor, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you take out common factors before you use other methods."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "What is the leading coefficient of \\(−3 + x^{4} + 6x^{2}\\)?",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. The highest power is \\(x^{4}\\), in the term \\(x^{4}\\), so the leading coefficient is \\(1\\), even though that term is not written first."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), which is the highest power, not the number in front of it. The leading coefficient is the number multiplying \\(x^{4}\\)."
      },
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), which is the coefficient of the first term written. The leading term is the one with the highest power, wherever it is written."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), which is the coefficient of the last term written. The leading term is the one with the highest power."
      }
    ],
    "retryHint": "The leading term has the highest power of \\(x\\), wherever it is written. Its coefficient is the number in front of it.",
    "backward": "Writing a polynomial in order of powers, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you write polynomials in descending order before you divide, so the leading term comes first."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Which two numbers multiply to \\(−54\\) and add to \\(−3\\)?",
    "options": [
      {
        "text": "\\(5\\) and \\(−8\\)",
        "correct": false,
        "feedback": "Chose \\(5\\) and \\(−8\\), which add to \\(−3\\) but multiply to \\(−40\\), not \\(−54\\)."
      },
      {
        "text": "\\(6\\) and \\(−9\\)",
        "correct": true,
        "feedback": "Correct. \\(6 × (−9) = −54\\) and \\(6 + (−9) = −3\\), so the pair is \\(6\\) and \\(−9\\)."
      },
      {
        "text": "\\(−6\\) and \\(−9\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\) and \\(−9\\), which multiply to \\(54\\) and add to \\(−15\\). Neither matches."
      },
      {
        "text": "\\(9\\) and \\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(9\\) and \\(−6\\), which multiply to \\(−54\\) but add to \\(3\\), not \\(−3\\). The signs are the wrong way round."
      }
    ],
    "retryHint": "Rule out pairs by their product first. Then add the pairs that are left and look for the sum you need.",
    "backward": "Calculating with negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this pair to split the middle term of harder quadratics."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand and simplify \\((3x − 8)(3x + 8)\\).",
    "options": [
      {
        "text": "\\(9x^{2} − 48x + 64\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 48x + 64\\), treating it as a square. There are two different brackets, so the middle terms cancel."
      },
      {
        "text": "\\(9x^{2} − 8\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 8\\), not squaring the second term. \\(8^{2} = 64\\)."
      },
      {
        "text": "\\(9x^{2} + 64\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} + 64\\), adding the squares. The last term is \\(−8 × 8\\), which is negative: \\(−64\\)."
      },
      {
        "text": "\\(9x^{2} − 64\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)(a + b) = a^{2} − b^{2}\\) with \\(a = 3x\\) and \\(b = 8\\) gives \\(9x^{2} − 64\\). The middle terms cancel."
      }
    ],
    "retryHint": "The two brackets differ only in the sign between the terms. Square each term and put a minus between the squares.",
    "backward": "Squaring terms with a number in front, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you reverse this pattern to factorise a difference of two squares with a number in front."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Find the value of \\(2x^{3} − 2x + 2\\) when \\(x = −2\\).",
    "options": [
      {
        "text": "\\(−10\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = −2\\) into every term: \\(2(−2)^{3} − 2(−2) + 2 = −10\\)."
      },
      {
        "text": "\\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\), by reading \\(x^{3}\\) as \\(3x\\), so \\((−2)^{3}\\) became \\(3 × (−2) = −6\\). A power means repeated multiplication: \\((−2)^{3} = −8\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Chose \\(14\\), by ignoring the minus sign and substituting \\(2\\) instead of \\(−2\\). Substitute exactly the value given, keeping its sign."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Chose \\(22\\), by reading \\((−2)^{3}\\) as \\(8\\). A negative number to an odd power stays negative: \\((−2)^{3} = −8\\)."
      }
    ],
    "backward": "Powers of negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you find remainders by putting negative numbers into cubics."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(2x^{2} + 13x + 20\\) completely.",
    "options": [
      {
        "text": "\\((2x + 4)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 4)(x + 5)\\), putting the numbers \\(5\\) and \\(4\\) in the wrong brackets. Expanding gives \\(2x^{2} + 14x + 20\\), not the original."
      },
      {
        "text": "\\((2x − 5)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 5)(x − 4)\\), the signs the wrong way round. Expanding gives \\(2x^{2} − 13x + 20\\), not the original."
      },
      {
        "text": "\\((2x + 5)(x + 4)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(2 × 20 = 40\\) and add to \\(13\\): \\(8\\) and \\(5\\). Splitting the middle term and grouping gives \\(2x^{2} + 13x + 20 = (2x + 5)(x + 4)\\). Check by expanding."
      },
      {
        "text": "\\((2x + 5)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 5)(x − 4)\\), changing the sign of one number. Expanding gives \\(2x^{2} − 3x − 20\\), not the original."
      }
    ],
    "backward": "Factor pairs of larger numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve quadratic equations by factorising them like this."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Multiply out and simplify \\((2x + 1)(3x − 5)\\).",
    "options": [
      {
        "text": "\\(6x^{2} + 13x − 5\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2} + 13x − 5\\), by ignoring the minus signs when adding the cross products. Keep the signs: \\(−10x\\) and \\(3x\\)."
      },
      {
        "text": "\\(6x^{2} − 7x − 5\\)",
        "correct": true,
        "feedback": "Correct. Multiply each term in the first bracket by each term in the second: \\(6x^{2} − 10x + 3x − 5\\). Collecting the \\(x\\) terms gives \\(6x^{2} − 7x − 5\\)."
      },
      {
        "text": "\\(6x^{2} − 7x + 5\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2} − 7x + 5\\), by writing the last term as \\(5\\). Multiplying the last terms gives \\(1 × (−5) = −5\\)."
      },
      {
        "text": "\\(5x^{2} − 7x − 5\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} − 7x − 5\\), by adding \\(2\\) and \\(3\\) for the \\(x^{2}\\) term. Multiply them: \\(2 × 3 = 6\\)."
      }
    ],
    "backward": "Multiplying brackets with a number in front of \\(x\\), from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise quadratics with a number in front of \\(x^{2}\\), which is this expansion run backwards."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((x + 1)^{3}\\).",
    "options": [
      {
        "text": "\\(x^{3} + 3x^{2} + 3x + 1\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a + b)^{3} = a^{3} + 3a^{2}b + 3ab^{2} + b^{3}\\) with \\(a = x\\) and \\(b = 1\\) gives \\(x^{3} + 3x^{2} + 3x + 1\\)."
      },
      {
        "text": "\\(x^{3} + 2x^{2} + 2x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} + 2x^{2} + 2x + 1\\), using \\(2\\) as the coefficient of both middle terms. They are \\(3a^{2}b\\) and \\(3ab^{2}\\)."
      },
      {
        "text": "\\(x^{3} + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} + 1\\), cubing each term and leaving out the middle terms. \\((x + 1)^{3}\\) has two more terms."
      },
      {
        "text": "\\(x^{3} + 3x^{2} − 3x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} + 3x^{2} − 3x + 1\\), getting the sign of the third term wrong. When the bracket has a plus sign, every term of the expansion is added."
      }
    ],
    "backward": "Multiplying three brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use the cube identities in problems about numbers such as \\(a^{3} + b^{3}\\)."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(25x^{2} − 36\\).",
    "options": [
      {
        "text": "\\((5x − 6)(5x + 6)\\)",
        "correct": true,
        "feedback": "Correct. \\(25x^{2} − 36 = (5x)^{2} − 6^{2}\\), a difference of two squares, so it equals \\((5x − 6)(5x + 6)\\)."
      },
      {
        "text": "\\((25x − 6)(25x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((25x − 6)(25x + 6)\\), using \\(25x\\) instead of its square root \\(5x\\). Expanding gives \\(625x^{2} − 36\\), not the original."
      },
      {
        "text": "\\((5x + 6)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((5x + 6)^{2}\\), treating it as a perfect square. Expanding gives \\(25x^{2} + 60x + 36\\), which has a middle term the original does not have."
      },
      {
        "text": "\\((5x − 6)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((5x − 6)^{2}\\), treating it as a perfect square. Expanding gives \\(25x^{2} − 60x + 36\\), which has a middle term the original does not have."
      }
    ],
    "backward": "Square roots of numbers such as \\(25\\) and \\(36\\), from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise a difference of two squares that has a common factor as well."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Find the remainder when \\(f(x) = 3x^{3} + 14x^{2} + 5x − 11\\) is divided by \\((3x + 2)\\).",
    "options": [
      {
        "text": "\\(79\\)",
        "correct": false,
        "feedback": "Chose \\(79\\), by substituting \\(x = 2\\). The divisor \\((3x + 2)\\) is zero when \\(x = −\\frac{2}{3}\\)."
      },
      {
        "text": "\\(−11\\)",
        "correct": false,
        "feedback": "Chose \\(−11\\), by giving the constant term, which is the value at \\(x = 0\\). Substitute the number that makes the divisor zero."
      },
      {
        "text": "\\(−9\\)",
        "correct": true,
        "feedback": "Correct. The divisor \\((3x + 2)\\) is zero when \\(x = −\\frac{2}{3}\\). By the remainder theorem the remainder is \\(f(−\\frac{2}{3}) = −9\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), by substituting \\(x = −2\\). The divisor \\((3x + 2)\\) is zero when \\(x = −\\frac{2}{3}\\), not when \\(x = −2\\)."
      }
    ],
    "backward": "Solving a simple equation for \\(x\\), from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use a zero remainder to prove that a bracket with a number in front of \\(x\\) is a factor."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Which option fails to be a polynomial?",
    "options": [
      {
        "text": "\\(−5x^{4} − 5x^{2} − 6x\\)",
        "correct": false,
        "feedback": "Chose \\(−5x^{4} − 5x^{2} − 6x\\), but it is a polynomial. Its powers of \\(x\\) are \\(4\\), \\(2\\), \\(1\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      },
      {
        "text": "\\(3x^{3} − 2x^{2} + x\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{3} − 2x^{2} + x\\), but it is a polynomial. Its powers of \\(x\\) are \\(3\\), \\(2\\), \\(1\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      },
      {
        "text": "\\(6x^{2} − 4x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2} − 4x − 2\\), but it is a polynomial. Its powers of \\(x\\) are \\(2\\), \\(1\\), \\(0\\), all whole numbers, and \\(x\\) is in no denominator. Look for the option that breaks that rule."
      },
      {
        "text": "\\(x^{3} − \\frac{2}{x^{2}}\\)",
        "correct": true,
        "feedback": "Correct. A polynomial only has whole-number powers of \\(x\\), none below zero. Here it has \\(x\\) in a denominator, so this is not a polynomial."
      }
    ],
    "backward": "Whole-number powers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you check that an expression is a polynomial before you use the remainder theorem on it."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} − 4xy − 12y^{2}\\).",
    "options": [
      {
        "text": "\\((x + 6y)(x + 2y)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6y)(x + 2y)\\), changing the sign of one number. Expanding gives \\(x^{2} + 8xy + 12y^{2}\\), not the original."
      },
      {
        "text": "\\((x − 2y)(x + 6y)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2y)(x + 6y)\\), the signs the wrong way round. Expanding gives \\(x^{2} + 4xy − 12y^{2}\\), not the original."
      },
      {
        "text": "\\((x − 5y)(x + y)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 5y)(x + y)\\), using \\(−5\\) and \\(1\\), which add to \\(−4\\) but multiply to \\(−5\\), not \\(−12\\)."
      },
      {
        "text": "\\((x − 6y)(x + 2y)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−12\\) and add to \\(−4\\): \\(−6\\) and \\(2\\). So \\(x^{2} − 4xy − 12y^{2} = (x − 6y)(x + 2y)\\)."
      }
    ],
    "backward": "Expanding two brackets with two letters, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use factorising like this to simplify algebraic fractions."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Expand and simplify \\((−2x^{2} − 4x − 2)(x − 1)\\).",
    "options": [
      {
        "text": "\\(−2x^{3} − 4x^{2} − 2x\\)",
        "correct": false,
        "feedback": "Chose \\(−2x^{3} − 4x^{2} − 2x\\), by multiplying only by the first term of \\((x − 1)\\) and leaving out \\(−1\\). Both terms of the second bracket are used."
      },
      {
        "text": "\\(−x^{3} − 2x^{2} + 2x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(−x^{3} − 2x^{2} + 2x + 2\\), by adding the coefficients \\(−2\\) and \\(1\\) for the \\(x^{3}\\) term. Multiply them: \\(−2\\)."
      },
      {
        "text": "\\(−2x^{3} − 2x^{2} + 2x + 2\\)",
        "correct": true,
        "feedback": "Correct. Multiply each of the three terms in the first bracket by each term in the second: \\(−2x^{3} − 4x^{2} − 2x + 2x^{2} + 4x + 2\\). Collecting like terms gives \\(−2x^{3} − 2x^{2} + 2x + 2\\)."
      },
      {
        "text": "\\(−2x^{3} − 2x^{2} − 6x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(−2x^{3} − 2x^{2} − 6x + 2\\), by a sign slip in the product \\(−1 × −4x\\). Check the sign of each of the six products."
      }
    ],
    "backward": "Multiplying a longer bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you divide cubics by linear factors, which undoes a product like this."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Use \\(a^{2} − b^{2} = (a − b)(a + b)\\) to work out \\(43^{2} − 7^{2}\\) without a calculator.",
    "options": [
      {
        "text": "\\(180\\)",
        "correct": false,
        "feedback": "Chose \\(180\\), by a place-value slip in \\(36 × 50\\). Check the multiplication."
      },
      {
        "text": "\\(1800\\)",
        "correct": true,
        "feedback": "Correct. \\(43^{2} − 7^{2} = (43 − 7)(43 + 7) = 36 × 50 = 1800\\)."
      },
      {
        "text": "\\(1842\\)",
        "correct": false,
        "feedback": "Chose \\(1842\\), by not squaring \\(7\\). Both numbers are squared before subtracting."
      },
      {
        "text": "\\(1296\\)",
        "correct": false,
        "feedback": "Chose \\(1296\\), by squaring the difference. \\(43^{2} − 7^{2} = (43 − 7)(43 + 7)\\), not \\((43 − 7)^{2}\\)."
      }
    ],
    "backward": "Factors and products of whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise a difference of squares with letters in the same way."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(x^{3} − 4x^{2} + 3x − 12\\).",
    "options": [
      {
        "text": "\\((x + 4)(x^{2} + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 4)(x^{2} + 3)\\), getting the sign of \\(−4\\) wrong in the common bracket. Expanding gives \\(x^{3} + 4x^{2} + 3x + 12\\), not the original."
      },
      {
        "text": "\\((x^{2} − 4)(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x^{2} − 4)(x + 3)\\), swapping the two numbers \\(−4\\) and \\(3\\). Expanding gives \\(x^{3} + 3x^{2} − 4x − 12\\), not the original."
      },
      {
        "text": "\\((x − 4)(x^{2} + 3)\\)",
        "correct": true,
        "feedback": "Correct. Group in pairs: \\(x^{2}(x − 4) + 3(x − 4)\\). The bracket \\((x − 4)\\) is common, so \\(x^{3} − 4x^{2} + 3x − 12 = (x − 4)(x^{2} + 3)\\)."
      },
      {
        "text": "\\((x − 4)(x^{2} − 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 4)(x^{2} − 3)\\), getting the sign of \\(3\\) wrong when taking out the second common factor. Expanding gives \\(x^{3} − 4x^{2} − 3x + 12\\), not the original."
      }
    ],
    "backward": "Common factors of pairs of terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use grouping again when you factorise quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Divide \\(x^{3} + 2x^{2} − 5x − 10\\) by \\((x + 2)\\). What is the quotient?",
    "options": [
      {
        "text": "\\(x^{2} − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 3\\), by a slip with the last coefficient. Multiplying the answer by the divisor should give the original polynomial back; here it does not."
      },
      {
        "text": "\\(x^{2} + 4x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 4x + 3\\), by dividing by \\((x − 2)\\) instead of \\((x + 2)\\). Check by multiplying back: \\((x + 2) × (x^{2} + 4x + 3)\\) does not give \\(x^{3} + 2x^{2} − 5x − 10\\)."
      },
      {
        "text": "\\(x^{2} − 5\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{3} + 2x^{2} − 5x − 10 = (x + 2)(x^{2} − 5)\\), so the quotient is \\(x^{2} − 5\\). Check: expanding \\((x + 2)(x^{2} − 5)\\) gives \\(x^{3} + 2x^{2} − 5x − 10\\)."
      },
      {
        "text": "\\(x^{2} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 5\\), by the wrong constant term in the quotient. Multiplying back by the divisor does not return the original polynomial."
      }
    ],
    "backward": "Long division of numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use division to factorise a cubic once one factor is known."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Which of these values is a zero of \\(p(x) = x^{2} − 4\\)?",
    "options": [
      {
        "text": "\\(−2\\)",
        "correct": true,
        "feedback": "Correct. A zero is a value of \\(x\\) that makes \\(p(x)\\) equal to \\(0\\). Substituting \\(x = −2\\) gives \\(p(−2) = 0\\), so it is a zero."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), which is the coefficient of \\(x\\). \\(p(0) = −4\\), not \\(0\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), which does not make the polynomial zero: \\(p(1) = −3\\), not \\(0\\)."
      },
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), which does not make the polynomial zero: \\(p(−1) = −3\\), not \\(0\\)."
      }
    ],
    "backward": "Squares and square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter a zero of a polynomial gives you a factor, and a factor gives you a zero."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "\\(x^{2} + 5x + k = (x − 3)(x + 8)\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−19\\)",
        "correct": false,
        "feedback": "Chose \\(−19\\), by adding the sum to the product. The last term is the product only."
      },
      {
        "text": "\\(−24\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(x^{2} + (−3 + 8)x + (−3) × 8\\). The constant term is \\(−3 × 8 = −24\\), so \\(k = −24\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Chose \\(24\\), by ignoring the signs. A positive times a negative is negative; two of the same sign give a positive."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), by adding \\(−3\\) and \\(8\\). The last term comes from multiplying the numbers."
      }
    ],
    "backward": "Multiplying numbers with signs, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same comparison of the number term to find unknown constants."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\((4x^{2} − 5x + 5) + (3x^{2} − 2x − 1) − (3x^{2} + x + 3)\\).",
    "options": [
      {
        "text": "\\(4x^{2} − 8x + 7\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{2} − 8x + 7\\), by changing the signs of the first two terms of the third bracket but not its constant. All three terms change."
      },
      {
        "text": "\\(−2x^{2} − 4x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(−2x^{2} − 4x + 3\\), by applying the minus sign to the second bracket as well. Only the third bracket has a minus in front."
      },
      {
        "text": "\\(10x^{2} − 6x + 7\\)",
        "correct": false,
        "feedback": "Chose \\(10x^{2} − 6x + 7\\), by leaving the sign of the third bracket unchanged. The minus in front of it changes every term inside."
      },
      {
        "text": "\\(4x^{2} − 8x + 1\\)",
        "correct": true,
        "feedback": "Correct. Remove the brackets, changing every sign in the third one, then collect like terms. The \\(x^{2}\\) terms give \\(4 + 3 − 3 = 4\\), the \\(x\\) terms give \\(−8\\) and the constants give \\(1\\)."
      }
    ],
    "backward": "Collecting like terms across three brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you combine three expanded brackets in the same way."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "\\(x^{2} + kx + 121\\) is a perfect square and \\(k\\) is positive. Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(22\\)",
        "correct": true,
        "feedback": "Correct. A perfect square has the form \\((x + 11)^{2} = x^{2} + 22x + 121\\). So \\(k = 2 × 11 = 22\\)."
      },
      {
        "text": "\\(242\\)",
        "correct": false,
        "feedback": "Chose \\(242\\), by doubling the last term. The middle term is twice the square root, not twice the last term."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), by taking the square root of \\(121\\) and stopping. The middle term is twice that: \\(2 × 11\\)."
      },
      {
        "text": "\\(121\\)",
        "correct": false,
        "feedback": "Chose \\(121\\), by using the last term. The middle term is twice the square root of the last term."
      }
    ],
    "backward": "Square roots and doubling, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you complete the square, which builds a perfect square on purpose."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(9x^{2} + 30x + 25\\).",
    "options": [
      {
        "text": "\\((9x + 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((9x + 5)^{2}\\), using \\(9x\\) instead of \\(3x\\), the square root of \\(9x^{2}\\). Expanding gives \\(81x^{2} + 90x + 25\\), not the original."
      },
      {
        "text": "\\((3x + 5)(3x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 5)(3x − 5)\\), using the difference-of-squares pattern. Expanding gives \\(9x^{2} − 25\\), which has no middle term."
      },
      {
        "text": "\\((3x + 5)^{2}\\)",
        "correct": true,
        "feedback": "Correct. The first and last terms are squares: \\(9x^{2} = (3x)^{2}\\) and \\(25 = 5^{2}\\), and the middle term \\(30x\\) is twice \\(3x × 5\\). So \\(9x^{2} + 30x + 25 = (3x + 5)^{2}\\)."
      },
      {
        "text": "\\((3x − 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 5)^{2}\\), getting the sign wrong. Expanding gives \\(9x^{2} − 30x + 25\\), not the original."
      }
    ],
    "backward": "Square roots of numbers and twice a product, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise other quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Exactly one of these brackets is a factor of \\(3x^{3} + 17x^{2} + 25x + 10\\). Which one?",
    "options": [
      {
        "text": "\\(x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x − 2\\), but substituting the value that makes \\((x − 2)\\) zero gives \\(152\\), which is not \\(0\\), so \\((x − 2)\\) is not a factor."
      },
      {
        "text": "\\(3x + 2\\)",
        "correct": true,
        "feedback": "Correct. The bracket \\((3x + 2)\\) is zero when \\(x = −\\frac{2}{3}\\). Substituting gives \\(0\\), so by the factor theorem \\((3x + 2)\\) is a factor."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), but substituting the value that makes \\((x + 2)\\) zero gives \\(4\\), which is not \\(0\\), so \\((x + 2)\\) is not a factor."
      },
      {
        "text": "\\(3x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(3x − 2\\), but substituting the value that makes \\((3x − 2)\\) zero gives a number that is not \\(0\\), so \\((3x − 2)\\) is not a factor."
      }
    ],
    "backward": "Finding the value that makes a bracket zero (earlier in this chapter).",
    "forward": "Later in this chapter you factorise cubics whose first term has a number in front."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "A rectangle has length \\((x + 4)\\) cm and width \\((x − 3)\\) cm. Find its perimeter when \\(x = 9\\).",
    "options": [
      {
        "text": "\\(32\\) cm",
        "correct": false,
        "feedback": "Chose \\(32\\) cm, by doubling the length but not the width: \\(2 × 13 + 6\\). Both pairs of sides count."
      },
      {
        "text": "\\(78\\) cm",
        "correct": false,
        "feedback": "Chose \\(78\\) cm, by multiplying \\(13 × 6\\), which is the area. The perimeter adds the four sides."
      },
      {
        "text": "\\(44\\) cm",
        "correct": false,
        "feedback": "Chose \\(44\\) cm, by using \\(x = 9\\) as the width instead of \\(6\\). The width is \\((x − 3)\\), which is \\(6\\)."
      },
      {
        "text": "\\(38\\) cm",
        "correct": true,
        "feedback": "Correct. Length = \\(9 + 4 = 13\\) cm and width = \\(9 − 3 = 6\\) cm. Perimeter = \\(2 × (13 + 6) = 38\\) cm."
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
    "question": "A learner factorises \\(x^{2} − 7x + 10\\) and checks the answer by expanding. Step 1: \\(x^{2} − 7x + 10 = (x − 5)(x − 2)\\); Step 2: \\((x − 5)(x − 2) = x^{2} − 2x − 5x + 10\\); Step 3: \\(x^{2} − 2x − 5x + 10 = x^{2} − 7x + 10\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": true,
        "feedback": "Correct. Every step is correct: step 1 writes the factorised form; step 2 multiplies out the two brackets correctly; step 3 collects the like terms correctly."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it multiplies out the two brackets correctly."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it collects the like terms correctly."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it writes the factorised form."
      }
    ],
    "backward": "Checking a factorisation by expanding, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check a factorisation by expanding, as the last step of every question."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "A learner expands \\((x − 6)(x − 5)\\) like this. Step 1: \\((x − 6)(x − 5) = x(x − 5) − 6(x + 5)\\); Step 2: \\(x(x − 5) − 6(x + 5) = x^{2} − 5x − 6x − 30\\); Step 3: \\(x^{2} − 5x − 6x − 30 = x^{2} − 11x − 30\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: the bracket after \\(−6\\) should be \\((x − 5)\\), the same as in the first part, but its sign was changed to \\((x + 5)\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it collects the like terms correctly."
      },
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: the bracket after \\(−6\\) should be \\((x − 5)\\), the same as in the first part, but its sign was changed to \\((x + 5)\\). The steps after it are carried out correctly on the wrong line, so the mistake is the first false line."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it multiplies out each part correctly."
      }
    ],
    "backward": "Expanding two brackets term by term, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check factorisations by expanding in the same careful steps."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((3x + y)^{2}\\).",
    "options": [
      {
        "text": "\\(9x^{2} + 6xy + y^{2}\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\) with \\(a = 3x\\) and \\(b = y\\) gives \\(9x^{2} + 6xy + y^{2}\\)."
      },
      {
        "text": "\\(9x^{2} − 6xy + y^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 6xy + y^{2}\\), getting the sign of the middle term wrong. It has the same sign as the term \\(y\\) in the bracket."
      },
      {
        "text": "\\(9x^{2} + 3xy + y^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} + 3xy + y^{2}\\), using \\(3xy\\) for the middle term. The middle term is twice the product, \\(6xy\\)."
      },
      {
        "text": "\\(9x^{2} + y^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} + y^{2}\\), squaring each term and leaving out the middle term. \\((3x + y)^{2}\\) means \\((3x + y)(3x + y)\\), so there is a middle term \\(6xy\\)."
      }
    ],
    "backward": "Squaring a sum of two letters, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you expand squares of two-letter brackets when you work with the identities."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "A learner factorises \\(−9x^{2} + 15x\\) and checks the answer by expanding. Step 1: \\(−9x^{2} + 15x = 3(−3x^{2} + 5x)\\); Step 2: \\(3(−3x^{2} + 5x) = 3x(−3x + 5)\\); Step 3: \\(3x(−3x + 5) = −9x^{2} + 5x\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it takes out the common number correctly."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it takes the common \\(x\\) out of the bracket correctly."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: multiplying \\(3x\\) by \\(5\\) gives \\(15x\\), but the last term was written as \\(5x\\)."
      },
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: multiplying \\(3x\\) by \\(5\\) gives \\(15x\\), but the last term was written as \\(5x\\). Everything after that step follows from the slip, so this is the step to mark as the first mistake."
      }
    ],
    "backward": "Taking out a common factor and checking by expanding, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use this check by expanding after every factorisation."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "\\((x − 2)\\) is a factor of \\(x^{3} + 4x^{2} + kx − 12\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−2\\)",
        "correct": false,
        "feedback": "Chose \\(−2\\), by substituting \\(x = −2\\). The factor \\((x − 2)\\) is zero when \\(x = 2\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), by solving \\(2k + 12 = 0\\) with a sign slip, so \\(k = 6\\). Move the number term to the other side and change its sign before dividing."
      },
      {
        "text": "\\(−6\\)",
        "correct": true,
        "feedback": "Correct. Since \\((x − 2)\\) is a factor, \\(f(2) = 0\\). Substituting \\(x = 2\\) gives \\(2k + 12 = 0\\), so \\(k = −6\\)."
      },
      {
        "text": "\\(−12\\)",
        "correct": false,
        "feedback": "Chose \\(−12\\), by leaving out the number term \\(−12\\), so the equation became \\(2k + 24 = 0\\). The whole polynomial must equal zero."
      }
    ],
    "backward": "Substituting into a polynomial and solving for a letter (earlier in this chapter).",
    "forward": "Later in this chapter you use two conditions at once to find two unknown coefficients."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Find the value of \\(2x^{2} − 2xy − 5y\\) when \\(x = −1\\) and \\(y = 2\\).",
    "options": [
      {
        "text": "\\(−10\\)",
        "correct": false,
        "feedback": "Chose \\(−10\\), by reading the \\(xy\\) term as \\(x + y\\). In \\(−2xy\\) the letters are multiplied: \\((−1) × 2\\)."
      },
      {
        "text": "\\(−12\\)",
        "correct": false,
        "feedback": "Chose \\(−12\\), by substituting \\(1\\) for \\(x\\), ignoring its minus sign. Use \\(x = −1\\) as given."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Chose \\(17\\), by swapping the values, using \\(x = 2\\) and \\(y = −1\\). Match each value to its own letter."
      },
      {
        "text": "\\(−4\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = −1\\) and \\(y = 2\\): \\(2 × (−1)^{2} − 2 × (−1) × (2) − 5 × (2) = −4\\)."
      }
    ],
    "backward": "Substituting two letters at once, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you substitute into identities with two letters to check them."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "For \\(p(x) = −4x^{4} + 2x^{3} − 3\\), which statement is false?",
    "options": [
      {
        "text": "\\(p(x)\\) has \\(3\\) terms",
        "correct": false,
        "feedback": "Chose \"\\(p(x)\\) has \\(3\\) terms\", which is true: it has \\(3\\) terms. The question asks for the false statement."
      },
      {
        "text": "\\(p(1) = −5\\)",
        "correct": false,
        "feedback": "Chose \"\\(p(1) = −5\\)\", which is true: \\(p(1)\\) is the sum of the coefficients: \\(−4 + 2 − 3 = −5\\). The question asks for the false statement."
      },
      {
        "text": "The leading coefficient of \\(p(x)\\) is \\(−4\\)",
        "correct": false,
        "feedback": "Chose \"The leading coefficient of \\(p(x)\\) is \\(−4\\)\", which is true: the leading coefficient is \\(−4\\), the number multiplying \\(x^{4}\\). The question asks for the false statement."
      },
      {
        "text": "The degree of \\(p(x)\\) is \\(6\\)",
        "correct": true,
        "feedback": "Correct. This statement is false. In fact its degree is \\(4\\), the highest power of \\(x\\)."
      }
    ],
    "backward": "Testing statements one at a time, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you test a claim about a polynomial by substituting one value."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "In the expansion of \\((x + 5)(4x^{2} − x + 1)\\), what is the coefficient of \\(x^{2}\\)?",
    "options": [
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), by including only the product \\((x) × (−x)\\). The product \\((5) × (4x^{2})\\) also gives an \\(x^{2}\\) term."
      },
      {
        "text": "\\(19\\)",
        "correct": true,
        "feedback": "Correct. Only products that give \\(x^{2}\\) count: \\((x) × (−x) = −x^{2}\\) and \\((5) × (4x^{2}) = 20x^{2}\\). Their sum is \\(19\\), so the coefficient is \\(19\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), by reading off the coefficient of \\(x^{3}\\) instead of \\(x^{2}\\)."
      },
      {
        "text": "\\(−4\\)",
        "correct": false,
        "feedback": "Chose \\(−4\\), by reading off the coefficient of \\(x\\) instead of \\(x^{2}\\)."
      }
    ],
    "backward": "Choosing pairs of terms from two brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check a factorisation by looking at one coefficient of its expansion."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "A rectangle has length \\((x + 4)\\) cm and width \\((x − 4)\\) cm. Which expression gives its area in cm²?",
    "options": [
      {
        "text": "\\(4x\\)",
        "correct": false,
        "feedback": "Chose \\(4x\\), by adding the length and width and doubling, which is the perimeter. Area is length times width."
      },
      {
        "text": "\\(x^{2} − 16\\)",
        "correct": true,
        "feedback": "Correct. Area = length times width = \\((x + 4)(x − 4) = x^{2} − 4x + 4x − 16 = x^{2} − 16\\) cm²."
      },
      {
        "text": "\\(x^{2} + 16\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 16\\), by getting the sign of the last term wrong: \\(4 × (−4) = −16\\)."
      },
      {
        "text": "\\(2x\\)",
        "correct": false,
        "feedback": "Chose \\(2x\\), by adding the length and the width. Area multiplies them."
      }
    ],
    "backward": "Multiplying algebraic lengths to get an area, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you reverse a result like this to find the sides of a rectangle from its area."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(2x^{2} − 50\\) completely.",
    "options": [
      {
        "text": "\\(2(x − 5)(x + 5)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(2\\) first: \\(2(x^{2} − 25)\\). Then \\(x^{2} − 25\\) is a difference of two squares, so it factorises as \\((x − 5)(x + 5)\\). The answer is \\(2(x − 5)(x + 5)\\)."
      },
      {
        "text": "\\((2x − 10)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 10)(x + 5)\\), multiplying the \\(2\\) into one bracket only. This is correct but not fully factorised, because \\(2x − 10\\) still has the common factor \\(2\\)."
      },
      {
        "text": "\\((2x − 5)(2x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 5)(2x + 5)\\), treating \\(2x^{2}\\) as \\((2x)^{2}\\). Expanding gives \\(4x^{2} − 25\\), not the original."
      },
      {
        "text": "\\(2(x − 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(2(x − 5)^{2}\\), treating it as a perfect square. Expanding gives \\(2x^{2} − 20x + 50\\), which has a middle term the original does not have."
      }
    ],
    "backward": "Taking out a common factor first (earlier in this chapter).",
    "forward": "Later in this chapter you meet quadratics that need a common factor and then a second factorisation."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "A rectangle has area \\(x^{2} − 4\\) cm² and length \\((x + 2)\\) cm. Which expression gives its width in cm?",
    "options": [
      {
        "text": "\\(x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x − 4\\), by using \\(4\\) instead of its square root \\(2\\)."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), by using the same factor again. The factors of \\(x^{2} − 4\\) are \\((x − 2)\\) and \\((x + 2)\\), and the length given is \\((x + 2)\\)."
      },
      {
        "text": "\\(x − 2\\)",
        "correct": true,
        "feedback": "Correct. The width is the area divided by the length. \\(x^{2} − 4 = (x − 2)(x + 2)\\), so the width is \\(x − 2\\) cm."
      },
      {
        "text": "\\(x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x + 4\\), by using \\(4\\) instead of its square root \\(2\\), with the wrong sign."
      }
    ],
    "backward": "The difference of two squares (earlier in this chapter).",
    "forward": "In a later chapter you use this factorisation to simplify algebraic fractions."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} − 6x − 16\\) completely.",
    "options": [
      {
        "text": "\\((x + 8)(x + 2)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 8)(x + 2)\\), changing the sign of one number. Expanding gives \\(x^{2} + 10x + 16\\), not the original."
      },
      {
        "text": "\\((x − 7)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 7)(x + 1)\\), using \\(−7\\) and \\(1\\), which add to \\(−6\\) but multiply to \\(−7\\), not \\(−16\\)."
      },
      {
        "text": "\\((x − 16)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 16)(x + 1)\\), using \\(−16\\) and \\(1\\), which multiply to \\(−16\\) but add to \\(−15\\), not \\(−6\\)."
      },
      {
        "text": "\\((x − 8)(x + 2)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−16\\) and add to \\(−6\\): \\(−8\\) and \\(2\\). So \\(x^{2} − 6x − 16 = (x − 8)(x + 2)\\)."
      }
    ],
    "backward": "Adding numbers with different signs, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise mixed-sign quadratics that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(2x^{2} + 11x + 5\\) completely.",
    "options": [
      {
        "text": "\\((2x − 1)(x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 1)(x − 5)\\), the signs the wrong way round. Expanding gives \\(2x^{2} − 11x + 5\\), not the original."
      },
      {
        "text": "\\((2x + 5)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 5)(x + 1)\\), putting the numbers \\(1\\) and \\(5\\) in the wrong brackets. Expanding gives \\(2x^{2} + 7x + 5\\), not the original."
      },
      {
        "text": "\\((2x + 1)(x + 5)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(2 × 5 = 10\\) and add to \\(11\\): \\(10\\) and \\(1\\). Splitting the middle term and grouping gives \\(2x^{2} + 11x + 5 = (2x + 1)(x + 5)\\). Check by expanding."
      },
      {
        "text": "\\((2x + 1)(x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 1)(x − 5)\\), changing the sign of one number. Expanding gives \\(2x^{2} − 9x − 5\\), not the original."
      }
    ],
    "backward": "Factor pairs of larger numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve quadratic equations by factorising them like this."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Which of these is an identity, true for every value of \\(x\\)?",
    "options": [
      {
        "text": "\\((x − 2)(x + 2) = x^{2} − 4x + 4\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)(x + 2) = x^{2} − 4x + 4\\), but it is not an identity: the middle terms cancel, so there is no \\(x\\) term."
      },
      {
        "text": "\\((x + 2)^{2} = x^{2} + 4x + 4\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 2)^{2} = x^{2} + 4x + 4\\) is true for every value of \\(x\\) because the right side is the full expansion of the left side. The other three have a term missing or the wrong sign."
      },
      {
        "text": "\\((x + 2)^{3} = x^{3} + 8\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)^{3} = x^{3} + 8\\), but it is not an identity: cubing a bracket gives two extra middle terms."
      },
      {
        "text": "\\((x − 2)^{2} = x^{2} − 4\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)^{2} = x^{2} − 4\\), but it is not an identity: it is \\((x − 2)^{2} = x^{2} − 4x + 4\\), not a difference of squares."
      }
    ],
    "backward": "Testing an equation with a value, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet identities that look like equations but hold for every value."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Without a calculator, work out \\(46 × 54\\) using an identity.",
    "options": [
      {
        "text": "\\(2500\\)",
        "correct": false,
        "feedback": "Chose \\(2500\\), by leaving out the second square. \\(46 × 54 = 50^{2} − 4^{2}\\), not \\(50^{2}\\)."
      },
      {
        "text": "\\(2484\\)",
        "correct": true,
        "feedback": "Correct. Write \\(46 = 50 − 4\\) and \\(54 = 50 + 4\\). Then \\(46 × 54 = 50^{2} − 4^{2} = 2500 − 16 = 2484\\)."
      },
      {
        "text": "\\(2496\\)",
        "correct": false,
        "feedback": "Chose \\(2496\\), by not squaring \\(4\\). The identity gives \\(50^{2} − 4^{2}\\)."
      },
      {
        "text": "\\(2516\\)",
        "correct": false,
        "feedback": "Chose \\(2516\\), by adding the squares. \\(50^{2} − 4^{2}\\) has a minus sign, because the middle terms cancel."
      }
    ],
    "backward": "Products near a round number, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet the same shortcut written with letters."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "When \\(f(x)\\) is divided by \\((x + 2)\\) the remainder is \\(−4\\). Which statement must be true?",
    "options": [
      {
        "text": "\\(f(−4) = −2\\)",
        "correct": false,
        "feedback": "Chose \\(f(−4) = −2\\), but it swaps the roles of the remainder and the number. The remainder is the value of \\(f\\)."
      },
      {
        "text": "\\(f(−2) = 0\\)",
        "correct": false,
        "feedback": "Chose \\(f(−2) = 0\\), but it treats the remainder as \\(0\\). Here the remainder is \\(−4\\)."
      },
      {
        "text": "\\(f(2) = −4\\)",
        "correct": false,
        "feedback": "Chose \\(f(2) = −4\\), but it uses \\(x = 2\\). The divisor \\((x + 2)\\) is zero when \\(x = −2\\)."
      },
      {
        "text": "\\(f(−2) = −4\\)",
        "correct": true,
        "feedback": "Correct. The remainder when dividing by \\((x + 2)\\) is \\(f(−2)\\), so \\(f(−2) = −4\\)."
      }
    ],
    "backward": "Linking a remainder to a value (earlier in this chapter).",
    "forward": "Later in this chapter you write a statement like this before you solve for a missing number."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "\\((x + 2)\\) is a factor of \\(x^{3} + 2x^{2} − 16x − 32\\). Factorise it completely.",
    "options": [
      {
        "text": "\\((x + 2)(x − 4)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(x − 4)(x − 4)\\), changing the sign of one factor. Expanding gives \\(x^{3} − 6x^{2} + 32\\), not the original."
      },
      {
        "text": "\\((x − 2)(x + 4)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)(x + 4)(x − 4)\\), getting every sign wrong. Expanding gives \\(x^{3} − 2x^{2} − 16x + 32\\), not the original."
      },
      {
        "text": "\\((x + 2)(x − 3)(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(x − 3)(x + 3)\\), a slip when finding the factors of the quadratic. Expanding gives \\(x^{3} + 2x^{2} − 9x − 18\\), not the original."
      },
      {
        "text": "\\((x + 2)(x − 4)(x + 4)\\)",
        "correct": true,
        "feedback": "Correct. Divide by \\((x + 2)\\) to get \\(x^{2} − 16\\). This factorises as \\((x − 4)(x + 4)\\). So \\(x^{3} + 2x^{2} − 16x − 32 = (x + 2)(x − 4)(x + 4)\\)."
      }
    ],
    "backward": "Factorising a quadratic after a division (earlier in this chapter).",
    "forward": "In a later chapter you solve cubic equations by factorising them in this way."
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
  title: "Polynomials, Identities and Factorising — Advanced Core",
  subtitle: "Grade 9 · Level 2 · Advanced Core",
  description: "Polynomial basics and substitution, collecting and expanding, factorising, the standard identities, and the remainder and factor theorems — warm-up, diagnostic, and spaced recheck for advanced core.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic that follows is not timed, but the questions now take two steps: for example, expand and then collect, or take out a common factor and then factorise what is left. Write each step on paper before you choose. Some options are a half-finished step, so check that a factorisation is complete. Some questions show a learner's working and ask for the first step that goes wrong. Every wrong option describes a common route, so reading the feedback after each question is part of the work.</p><p>You will meet all six topics, mixed together.</p>",
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

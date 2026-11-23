// Polynomials, Identities and Factorising — Grade 9, Level 3 (Synthesis).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch02-polynomials-identities-factorising-level-3.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch2PolynomialsIdentitiesFactorisingL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-2-polynomials-identities-factorising";
const CHAPTER_NAME = "Polynomials, Identities and Factorising";
const LEVEL = 3;

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
    "question": "What is the degree of the polynomial \\(7x^{3}y^{2}\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), which is the power of \\(x\\) in the top term only. Both letters count: \\(3 + 2 = 5\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), which is the number of terms. The degree is found from the powers."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), multiplying the powers \\(3 × 2\\). The powers in a term are added, not multiplied: \\(3 + 2 = 5\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. In a term with two letters, add the powers. The term with the largest total is \\(7x^{3}y^{2}\\), with \\(3 + 2 = 5\\), so the degree is \\(5\\)."
      }
    ],
    "retryHint": "In each term add the power of \\(x\\) to the power of \\(y\\). The degree is the largest of these totals.",
    "backward": "Adding powers when you multiply, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you add powers in the same way when you expand products with two letters."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} + x − 30\\) completely.",
    "options": [
      {
        "text": "\\((x − 4)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 4)(x + 5)\\), using \\(−4\\) and \\(5\\), which add to \\(1\\) but multiply to \\(−20\\), not \\(−30\\)."
      },
      {
        "text": "\\((x − 5)(x + 6)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−30\\) and add to \\(1\\): \\(−5\\) and \\(6\\). So \\(x^{2} + x − 30 = (x − 5)(x + 6)\\)."
      },
      {
        "text": "\\((x − 6)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 6)(x + 5)\\), the signs the wrong way round. Expanding gives \\(x^{2} − x − 30\\), not the original."
      },
      {
        "text": "\\((x + 5)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 5)(x + 6)\\), changing the sign of one number. Expanding gives \\(x^{2} + 11x + 30\\), not the original."
      }
    ],
    "retryHint": "The last term is negative, so the two numbers have different signs. The one with the larger size takes the sign of the middle term; test factor pairs of the last term.",
    "backward": "Adding numbers with different signs, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise mixed-sign quadratics that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\((3x^{2} + 4x − 4) + (−2x^{2} − 3x + 5) − (−2x^{2} + x − 1)\\).",
    "options": [
      {
        "text": "\\(3x^{2} + 2x\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2} + 2x\\), by changing the sign of the first term of the third bracket only. All three terms change."
      },
      {
        "text": "\\(3x^{2} + 2\\)",
        "correct": true,
        "feedback": "Correct. Remove the brackets, changing every sign in the third one, then collect like terms. The \\(x^{2}\\) terms give \\(3 + (−2) − (−2) = 3\\), the \\(x\\) terms give \\(0\\) and the constants give \\(2\\)."
      },
      {
        "text": "\\(3x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2}\\), by changing the signs of the first two terms of the third bracket but not its constant. All three terms change."
      },
      {
        "text": "\\(−x^{2} + 2x\\)",
        "correct": false,
        "feedback": "Chose \\(−x^{2} + 2x\\), by leaving the sign of the third bracket unchanged. The minus in front of it changes every term inside."
      }
    ],
    "retryHint": "Deal with the bracket that follows a minus first by changing every sign inside it. Then collect like terms power by power.",
    "backward": "Collecting like terms across three brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you combine three expanded brackets in the same way."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand and simplify \\((3x + 4)^{2}\\).",
    "options": [
      {
        "text": "\\(9x^{2} + 24x + 16\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\) with \\(a = 3x\\) and \\(b = 4\\) gives \\(9x^{2} + 24x + 16\\)."
      },
      {
        "text": "\\(3x^{2} + 24x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2} + 24x + 16\\), not squaring the \\(3\\) in the first term. \\((3x)^{2} = 9x^{2}\\)."
      },
      {
        "text": "\\(9x^{2} + 12x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} + 12x + 16\\), using \\(12x\\) for the middle term. The middle term is twice the product, \\(24x\\)."
      },
      {
        "text": "\\(9x^{2} − 24x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 24x + 16\\), getting the sign of the middle term wrong. It has the same sign as the term \\(4\\) in the bracket."
      }
    ],
    "retryHint": "The first term of the answer is the square of the first term in the bracket. The middle term is twice the product of the two terms.",
    "backward": "Squaring a product such as \\(4x\\), from the laws of indices (Ch1).",
    "forward": "Later in this chapter you factorise perfect squares that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(6x^{3} + 24x^{2} − 6x\\).",
    "options": [
      {
        "text": "\\(6(x^{3} + 4x^{2} − x)\\)",
        "correct": false,
        "feedback": "Chose \\(6(x^{3} + 4x^{2} − x)\\), taking out only the number \\(6\\). The bracket still has the common factor \\(x\\), so it is not fully factorised."
      },
      {
        "text": "\\(6x(x^{2} + 4x − 6)\\)",
        "correct": false,
        "feedback": "Chose \\(6x(x^{2} + 4x − 6)\\), dividing the last term by \\(x\\) but not by \\(6\\). Every term must be divided by the whole common factor \\(6x\\)."
      },
      {
        "text": "\\(6x(x^{2} + 4x − 1)\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor is \\(6x\\). Dividing each term by \\(6x\\) leaves \\(x^{2} + 4x − 1\\), so \\(6x^{3} + 24x^{2} − 6x = 6x(x^{2} + 4x − 1)\\)."
      },
      {
        "text": "\\(x(6x^{2} + 24x − 6)\\)",
        "correct": false,
        "feedback": "Chose \\(x(6x^{2} + 24x − 6)\\), taking out only \\(x\\). The bracket still has the common factor \\(6\\), so it is not fully factorised."
      }
    ],
    "retryHint": "The common factor must divide all three terms, so use the smallest power of \\(x\\) that appears in every term. The bracket should still have three terms.",
    "backward": "Common factors of three terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise the quadratic that is left inside the bracket."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Find the remainder when \\(f(x) = x^{4} + 7x^{3} + 8x^{2} − 3x − 6\\) is divided by \\((x + 2)\\).",
    "options": [
      {
        "text": "\\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\), by giving the constant term, which is the value at \\(x = 0\\). Substitute the number that makes the divisor zero."
      },
      {
        "text": "\\(−8\\)",
        "correct": true,
        "feedback": "Correct. The divisor \\((x + 2)\\) is zero when \\(x = −2\\). By the remainder theorem the remainder is \\(f(−2) = −8\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Chose \\(17\\), by substituting into the quotient instead. The remainder is the value of the original polynomial at \\(x = −2\\)."
      },
      {
        "text": "\\(92\\)",
        "correct": false,
        "feedback": "Chose \\(92\\), by substituting \\(x = 2\\) instead of \\(x = −2\\). The divisor is \\((x + 2)\\), which is zero when \\(x = −2\\)."
      }
    ],
    "retryHint": "Find the value of \\(x\\) that makes the divisor zero, then substitute it into the polynomial.",
    "backward": "Substituting into expressions, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use a zero remainder to prove that a bracket is a factor."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "What is the coefficient of \\(x^{3}\\) in \\(4x^{4} − x^{3} + 6\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), which is the power of \\(x\\). The coefficient is the number multiplying \\(x^{3}\\), here \\(−1\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), taking the opposite sign. The term is \\(−x^{3}\\), so the coefficient is \\(−1\\)."
      },
      {
        "text": "\\(−1\\)",
        "correct": true,
        "feedback": "Correct. The term in \\(x^{3}\\) is \\(−x^{3}\\). A term with no number written has coefficient \\(1\\), and the sign is part of it, so the coefficient is \\(−1\\)."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), thinking no number is written, so there is none. A term such as \\(−x^{3}\\) has an unwritten coefficient of \\(−1\\)."
      }
    ],
    "retryHint": "When no number is written in front of a power, the coefficient is \\(1\\) or minus \\(1\\). Look at the sign in front of the term.",
    "backward": "Terms with no number written in front, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet unwritten coefficients again when you collect like terms after an expansion."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(2x^{2} + 11x + 12\\) completely.",
    "options": [
      {
        "text": "\\((2x + 3)(x + 4)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(2 × 12 = 24\\) and add to \\(11\\): \\(8\\) and \\(3\\). Splitting the middle term and grouping gives \\(2x^{2} + 11x + 12 = (2x + 3)(x + 4)\\). Check by expanding."
      },
      {
        "text": "\\((2x + 4)(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 4)(x + 3)\\), putting the numbers \\(3\\) and \\(4\\) in the wrong brackets. Expanding gives \\(2x^{2} + 10x + 12\\), not the original."
      },
      {
        "text": "\\((2x − 3)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 3)(x − 4)\\), the signs the wrong way round. Expanding gives \\(2x^{2} − 11x + 12\\), not the original."
      },
      {
        "text": "\\((2x + 3)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 3)(x − 4)\\), changing the sign of one number. Expanding gives \\(2x^{2} − 5x − 12\\), not the original."
      }
    ],
    "retryHint": "Multiply the number in front of \\(x^{2}\\) by the last term. Find two numbers with that product that add to the middle number, split the middle term, then group.",
    "backward": "Factor pairs of larger numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve quadratic equations by factorising them like this."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "The polynomial \\(p(x) = x^{2} + kx + 4\\) satisfies \\(p(−2) = 18\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), by using \\(p(−2) = 0\\) instead of \\(p(−2) = 18\\). The right-hand side is \\(18\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), by substituting \\(x = 2\\) instead of \\(x = −2\\). The condition \\(p(−2) = 18\\) says to use \\(x = −2\\)."
      },
      {
        "text": "\\(−5\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = −2\\) into \\(p(x)\\): \\(−2k + 8 = 18\\). So \\(−2k = 10\\) and \\(k = −5\\)."
      },
      {
        "text": "\\(−13\\)",
        "correct": false,
        "feedback": "Chose \\(−13\\), by moving \\(8\\) across the equals sign without changing its sign, so \\(−2k = 26\\) instead of \\(−2k = 10\\)."
      }
    ],
    "backward": "Solving a one-step equation after substituting, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you solve equations for unknown constants in exactly this way."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(3x^{2} − 20x + 12\\) completely.",
    "options": [
      {
        "text": "\\((3x − 2)(x − 6)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(3 × 12 = 36\\) and add to \\(−20\\): \\(−18\\) and \\(−2\\). Splitting the middle term and grouping gives \\(3x^{2} − 20x + 12 = (3x − 2)(x − 6)\\). Check by expanding."
      },
      {
        "text": "\\((3x − 6)(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 6)(x − 2)\\), putting the numbers \\(−2\\) and \\(−6\\) in the wrong brackets. Expanding gives \\(3x^{2} − 12x + 12\\), not the original."
      },
      {
        "text": "\\((3x − 2)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((3x − 2)(x + 6)\\), changing the sign of one number. Expanding gives \\(3x^{2} + 16x − 12\\), not the original."
      },
      {
        "text": "\\((3x + 2)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((3x + 2)(x + 6)\\), the signs the wrong way round. Expanding gives \\(3x^{2} + 20x + 12\\), not the original."
      }
    ],
    "backward": "Factor pairs with negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use these factorisations to find where a curve crosses the \\(x\\)-axis."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Expand and simplify \\((2x^{2} + 3x − 1)(2x + 4)\\).",
    "options": [
      {
        "text": "\\(4x^{3} + 6x^{2} − 2x\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{3} + 6x^{2} − 2x\\), by multiplying only by the first term of \\((2x + 4)\\) and leaving out \\(4\\). Both terms of the second bracket are used."
      },
      {
        "text": "\\(4x^{3} + 14x^{2} + 10x − 4\\)",
        "correct": true,
        "feedback": "Correct. Multiply each of the three terms in the first bracket by each term in the second: \\(4x^{3} + 6x^{2} − 2x + 8x^{2} + 12x − 4\\). Collecting like terms gives \\(4x^{3} + 14x^{2} + 10x − 4\\)."
      },
      {
        "text": "\\(4x^{3} + 14x^{2} − 14x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{3} + 14x^{2} − 14x − 4\\), by a sign slip in the product \\(4 × 3x\\). Check the sign of each of the six products."
      },
      {
        "text": "\\(4x^{3} + 14x^{2} + 10x\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{3} + 14x^{2} + 10x\\), by leaving out the product of \\(4\\) and the constant \\(−1\\). Each of the three terms is multiplied by both terms of the second bracket."
      }
    ],
    "backward": "Multiplying a longer bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you divide cubics by linear factors, which undoes a product like this."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "\\(a + b = 7\\) and \\(ab = 12\\). Find \\(a^{2} + b^{2}\\).",
    "options": [
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "Chose \\(37\\), by subtracting \\(ab\\) once instead of \\(2ab\\). \\((a + b)^{2}\\) contains \\(2ab\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), by subtracting \\(4ab\\). That is the formula for \\((a − b)^{2}\\), not \\(a^{2} + b^{2}\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": true,
        "feedback": "Correct. \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\), so \\(a^{2} + b^{2} = (a + b)^{2} − 2ab = 7^{2} − 2 × 12 = 49 − 24 = 25\\)."
      },
      {
        "text": "\\(73\\)",
        "correct": false,
        "feedback": "Chose \\(73\\), by adding \\(2ab\\) instead of subtracting it. \\(a^{2} + b^{2} = (a + b)^{2} − 2ab\\)."
      }
    ],
    "backward": "Squaring a sum (earlier in this chapter).",
    "forward": "Later in this chapter you use these identities to find values without solving for each letter."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(4x^{2} − 9y^{2}\\).",
    "options": [
      {
        "text": "\\((2x − 3y)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 3y)^{2}\\), treating it as a perfect square. Expanding gives \\(4x^{2} − 12xy + 9y^{2}\\), which has a middle term the original does not have."
      },
      {
        "text": "\\((2x − 3y)(2x + 3y)\\)",
        "correct": true,
        "feedback": "Correct. \\(4x^{2} − 9y^{2} = (2x)^{2} − (3y)^{2}\\), a difference of two squares, so it equals \\((2x − 3y)(2x + 3y)\\)."
      },
      {
        "text": "\\((4x − 9y)(4x + 9y)\\)",
        "correct": false,
        "feedback": "Chose \\((4x − 9y)(4x + 9y)\\), not taking the square roots of the coefficients. Expanding gives \\(16x^{2} − 81y^{2}\\), not the original."
      },
      {
        "text": "\\((2x + 3y)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 3y)^{2}\\), treating it as a perfect square. Expanding gives \\(4x^{2} + 12xy + 9y^{2}\\), which has a middle term the original does not have."
      }
    ],
    "backward": "Squaring a product such as \\(3y\\), from the laws of indices (Ch1).",
    "forward": "Later in this chapter you use the pattern with two letters in harder factorisations."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "The remainder when \\(x^{3} + 5x^{2} + kx + 3\\) is divided by \\((x − 2)\\) is \\(33\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−\\frac{31}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{31}{2}\\), by setting the value at \\(x = 2\\) equal to \\(0\\) instead of to the remainder \\(33\\)."
      },
      {
        "text": "\\(−9\\)",
        "correct": false,
        "feedback": "Chose \\(−9\\), by substituting \\(x = −2\\). The divisor \\((x − 2)\\) is zero when \\(x = 2\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. The remainder is \\(f(2) = 33\\). Substituting \\(x = 2\\) gives \\(2k + 31 = 33\\), so \\(k = 1\\)."
      },
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), by solving \\(2k + 31 = 33\\) with a sign slip, so \\(k = −1\\). Move the number term to the other side and change its sign before dividing."
      }
    ],
    "backward": "The remainder theorem (earlier in this chapter).",
    "forward": "Later in this chapter you find two unknown coefficients from two remainders."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Which of these is a binomial of degree \\(3\\)?",
    "options": [
      {
        "text": "\\(2x^{5} − 6x^{3} + 2x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(2x^{5} − 6x^{3} + 2x^{2}\\), but it has \\(3\\) terms, not \\(2\\) and its degree is \\(5\\), not \\(3\\). A binomial of degree \\(3\\) needs both."
      },
      {
        "text": "\\(6x^{4} − 5x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{4} − 5x^{2}\\), but its degree is \\(4\\), not \\(3\\). A binomial of degree \\(3\\) needs both."
      },
      {
        "text": "\\(−5x^{3} + 2x^{2} + x\\)",
        "correct": false,
        "feedback": "Chose \\(−5x^{3} + 2x^{2} + x\\), but it has \\(3\\) terms, not \\(2\\). A binomial of degree \\(3\\) needs both."
      },
      {
        "text": "\\(2x^{3} + 6x^{2}\\)",
        "correct": true,
        "feedback": "Correct. It has \\(2\\) terms, so it is a binomial, and its highest power is \\(x^{3}\\), so its degree is \\(3\\)."
      }
    ],
    "backward": "Counting terms and reading powers, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you describe a polynomial by its degree and its number of terms before you choose a method."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise completely \\(3x^{2} + 15x − 18\\).",
    "options": [
      {
        "text": "\\(3(x − 1)(x + 6)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(3\\): \\(3(x^{2} + 5x − 6)\\). Then find two numbers that multiply to \\(−6\\) and add to \\(5\\): \\(−1\\) and \\(6\\). The answer is \\(3(x − 1)(x + 6)\\)."
      },
      {
        "text": "\\(3(x^{2} + 5x − 6)\\)",
        "correct": false,
        "feedback": "Chose \\(3(x^{2} + 5x − 6)\\), taking out the \\(3\\) but stopping there. The bracket is a quadratic that factorises again."
      },
      {
        "text": "\\((x − 1)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x + 6)\\), leaving out the common factor \\(3\\). Expanding gives \\(x^{2} + 5x − 6\\), which is \\(3\\) times too small."
      },
      {
        "text": "\\(3(x + 1)(x − 6)\\)",
        "correct": false,
        "feedback": "Chose \\(3(x + 1)(x − 6)\\), the signs the wrong way round. Expanding gives \\(3x^{2} − 15x − 18\\), not the original."
      }
    ],
    "backward": "Taking out a common factor, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you combine a common factor with a difference of two squares or a perfect square."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Expand and simplify \\((x − 5)(x − 3)(x + 2)\\).",
    "options": [
      {
        "text": "\\(x^{3} − 6x^{2} − x + 30\\)",
        "correct": true,
        "feedback": "Correct. Multiply two brackets first: \\((x − 5)(x − 3) = x^{2} − 8x + 15\\). Then multiply by \\((x + 2)\\) and collect like terms to get \\(x^{3} − 6x^{2} − x + 30\\)."
      },
      {
        "text": "\\(x^{2} − 8x + 15\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 8x + 15\\), by multiplying only two of the three brackets. All three brackets must be multiplied together."
      },
      {
        "text": "\\(x^{3} + 30\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} + 30\\), by multiplying the letters together and the numbers together, as if the brackets were single terms. Expand two brackets first, then multiply by the third."
      },
      {
        "text": "\\(x^{3} − 6x^{2} − x\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} − 6x^{2} − x\\), by leaving out the product of the two constants \\(15\\) and \\(2\\)."
      }
    ],
    "backward": "Multiplying three brackets one pair at a time, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check a cubic factorisation by expanding all three brackets."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((x − 3)^{3}\\).",
    "options": [
      {
        "text": "\\(x^{3} + 9x^{2} + 27x + 27\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} + 9x^{2} + 27x + 27\\), ignoring the minus sign. The signs alternate when the bracket has a minus."
      },
      {
        "text": "\\(x^{3} − 27\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} − 27\\), cubing each term and leaving out the middle terms. \\((x − 3)^{3}\\) has two more terms."
      },
      {
        "text": "\\(x^{3} − 6x^{2} + 18x − 27\\)",
        "correct": false,
        "feedback": "Chose \\(x^{3} − 6x^{2} + 18x − 27\\), using \\(2\\) as the coefficient of both middle terms. They are \\(3a^{2}b\\) and \\(3ab^{2}\\)."
      },
      {
        "text": "\\(x^{3} − 9x^{2} + 27x − 27\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)^{3} = a^{3} − 3a^{2}b + 3ab^{2} − b^{3}\\) with \\(a = x\\) and \\(b = 3\\) gives \\(x^{3} − 9x^{2} + 27x − 27\\)."
      }
    ],
    "backward": "Powers of negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the minus form of the cube identity to factorise differences of cubes."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(x^{2} + xy + 3x + 3y\\).",
    "options": [
      {
        "text": "\\((x − y)(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x − y)(x + 3)\\), getting the sign of \\(y\\) wrong in the first bracket. Expanding gives \\(x^{2} − xy + 3x − 3y\\), not the original."
      },
      {
        "text": "\\((x + y)(x + 3)\\)",
        "correct": true,
        "feedback": "Correct. Group in pairs: \\(x(x + y) + 3(x + y)\\). The bracket \\((x + y)\\) is common, so \\(x^{2} + xy + 3x + 3y = (x + y)(x + 3)\\)."
      },
      {
        "text": "\\(x(x + y) + 3(x + y)\\)",
        "correct": false,
        "feedback": "Chose \\(x(x + y) + 3(x + y)\\), stopping half-way. The expression is a sum of two products, not yet one product."
      },
      {
        "text": "\\((x + 3)(y + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 3)(y + 1)\\), pairing the wrong terms. Expanding gives \\(xy + x + 3y + 3\\), not the original."
      }
    ],
    "backward": "Common factors with two letters, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use grouping in harder factorisations with two letters."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Show that \\((x − 1)\\) is a factor of \\(x^{3} + 4x^{2} + x − 6\\), then factorise it completely. Which is the complete factorisation?",
    "options": [
      {
        "text": "\\((x − 1)(x^{2} + 5x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x^{2} + 5x + 6)\\), stopping after one division. The quadratic factor can be factorised again."
      },
      {
        "text": "\\((x − 1)(x − 2)(x − 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x − 2)(x − 3)\\), changing the signs of the last two factors. Expanding gives \\(x^{3} − 6x^{2} + 11x − 6\\), not the original."
      },
      {
        "text": "\\((x − 1)(x + 1)(x + 4)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x + 1)(x + 4)\\), a slip when finding the factors of the quadratic. Expanding gives \\(x^{3} + 4x^{2} − x − 4\\), not the original."
      },
      {
        "text": "\\((x − 1)(x + 2)(x + 3)\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 0\\), so \\((x − 1)\\) is a factor. Dividing gives \\(x^{2} + 5x + 6 = (x + 2)(x + 3)\\). So \\(x^{3} + 4x^{2} + x − 6 = (x − 1)(x + 2)(x + 3)\\)."
      }
    ],
    "backward": "Testing a factor and then dividing (earlier in this chapter).",
    "forward": "In a later chapter you solve cubic equations by factorising them in this way."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "A model rocket is launched. Its height \\(H\\) metres after \\(t\\) seconds is \\(H = 30t − 3t^{2}\\). Find \\(H\\) when \\(t = 3\\).",
    "options": [
      {
        "text": "\\(63\\)",
        "correct": true,
        "feedback": "Correct. \\(H = 30 × 3 − 3 × 3^{2} = 90 − 27 = 63\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), by squaring the whole of \\(3t\\), as in \\((3t)^{2} = 81\\). Only \\(t\\) is squared: \\(3 × 3^{2} = 27\\)."
      },
      {
        "text": "\\(117\\)",
        "correct": false,
        "feedback": "Chose \\(117\\), by adding the terms. The formula has a minus sign: \\(90 − 27\\)."
      },
      {
        "text": "\\(72\\)",
        "correct": false,
        "feedback": "Chose \\(72\\), by reading \\(3t^{2}\\) as \\(3 × 2t = 18\\). The power means \\(t × t\\): \\(3 × 3^{2} = 27\\)."
      }
    ],
    "backward": "Substituting into a formula, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use formulae like this when you draw graphs of curves."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Exactly one of these quadratics cannot be factorised using whole numbers. Which one?",
    "options": [
      {
        "text": "\\(x^{2} + 3x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 3x − 4\\), but it does factorise: \\(x^{2} + 3x − 4 = (x − 1)(x + 4)\\)."
      },
      {
        "text": "\\(x^{2} − x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − x − 2\\), but it does factorise: \\(x^{2} − x − 2 = (x − 2)(x + 1)\\)."
      },
      {
        "text": "\\(x^{2} + 2x − 5\\)",
        "correct": true,
        "feedback": "Correct. For \\(x^{2} + 2x − 5\\) you need two whole numbers that multiply to \\(−5\\) and add to \\(2\\), and there are none, so it does not factorise with whole numbers."
      },
      {
        "text": "\\(x^{2} − 5x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 5x + 6\\), but it does factorise: \\(x^{2} − 5x + 6 = (x − 3)(x − 2)\\)."
      }
    ],
    "backward": "Factor pairs of whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet quadratics that need a different method, and in a later chapter you solve them with a formula."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "In the expansion of \\((x + 2)(x + 3)(x − 5)\\), what is the coefficient of \\(x\\)?",
    "options": [
      {
        "text": "\\(−4\\)",
        "correct": false,
        "feedback": "Chose \\(−4\\), by leaving out the pair \\(3 × (−5)\\). All three pairs of constants give an \\(x\\) term."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), by working out the coefficient of \\(x^{2}\\) instead of \\(x\\)."
      },
      {
        "text": "\\(−19\\)",
        "correct": true,
        "feedback": "Correct. To get \\(x\\) you take \\(x\\) from one bracket and the numbers from the other two. The three pairs give \\(2 × 3 + 2 × (−5) + 3 × (−5) = −19\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), by a sign slip on the pair \\(3 × (−5)\\)."
      }
    ],
    "backward": "Combining three brackets term by term, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet the same sums and products of constants in the cubic identities."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Use \\(a^{3} + b^{3} + c^{3} − 3abc = (a + b + c)(a^{2} + b^{2} + c^{2} − ab − bc − ca)\\) to find the value of \\(a^{3} + b^{3} + c^{3} − 3abc\\) when \\(a = 1\\), \\(b = 2\\) and \\(c = 4\\).",
    "options": [
      {
        "text": "\\(49\\)",
        "correct": true,
        "feedback": "Correct. \\(a + b + c = 7\\) and \\(a^{2} + b^{2} + c^{2} − ab − bc − ca = 21 − 14 = 7\\). So the value is \\(7 × 7 = 49\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Chose \\(14\\), by adding the factors instead of multiplying them."
      },
      {
        "text": "\\(245\\)",
        "correct": false,
        "feedback": "Chose \\(245\\), by adding \\(ab + bc + ca\\) instead of subtracting it in the second factor."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Chose \\(7\\), by using only the second factor, \\(7\\). Both factors are multiplied."
      }
    ],
    "backward": "The square and difference-of-squares patterns (earlier in this chapter).",
    "forward": "In a later chapter you meet identities like this again when you simplify expressions in several letters."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(2x^{2} − 20x + 50\\).",
    "options": [
      {
        "text": "\\(2(x^{2} − 10x + 25)\\)",
        "correct": false,
        "feedback": "Chose \\(2(x^{2} − 10x + 25)\\), taking out the \\(2\\) but stopping there. The bracket is a perfect square, so it factorises again."
      },
      {
        "text": "\\(2(x − 5)^{2}\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(2\\): \\(2(x^{2} − 10x + 25)\\). The bracket is a perfect square, \\((x − 5)^{2}\\), so the answer is \\(2(x − 5)^{2}\\)."
      },
      {
        "text": "\\(2(x + 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(2(x + 5)^{2}\\), getting the sign wrong. Expanding gives \\(2x^{2} + 20x + 50\\), not the original."
      },
      {
        "text": "\\((2x − 10)(x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 10)(x − 5)\\), multiplying the \\(2\\) into one bracket only. This is correct but not fully factorised, because \\(2x − 10\\) still has the common factor \\(2\\)."
      }
    ],
    "backward": "Taking out a common factor first (earlier in this chapter).",
    "forward": "Later in this chapter you combine a common factor with another method in this way."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Find the remainder when \\((x + 1)^{2}(x + 4)\\) is divided by \\((x − 1)\\). You do not need to expand the brackets.",
    "options": [
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), by substituting \\(x = −1\\) instead of \\(x = 1\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), by adding the two factors instead of multiplying: \\((x + 1)^{2}\\) and \\((x + 4)\\) are multiplied."
      },
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. The remainder is the value at \\(x = 1\\): \\((1 + 1)^{2} × (1 + 4) = 2^{2} × 5 = 20\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Chose \\(10\\), by forgetting to square \\((x + 1)\\)."
      }
    ],
    "backward": "Products of brackets (earlier in this chapter).",
    "forward": "In a later chapter you use the same substitution to test roots of polynomial equations."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Three of these values are zeros of \\(p(x) = x^{3} − 4x^{2} + 3x\\). Which one is not a zero?",
    "options": [
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), but every term of \\(p(x)\\) contains \\(x\\), so \\(p(0) = 0\\) and \\(0\\) is a zero. The question asks for the value that is not a zero."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), but \\(p(3) = 27 − 36 + 9 = 0\\), so \\(3\\) is a zero. The question asks for the value that is not a zero."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), but \\(p(1) = 1 − 4 + 3 = 0\\), so \\(1\\) is a zero. The question asks for the value that is not a zero."
      },
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(p(2) = −2\\), which is not \\(0\\), so \\(2\\) is not a zero. The other three each give \\(p = 0\\)."
      }
    ],
    "backward": "Trying several values in turn, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use zeros like these to build the factors of a cubic."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "A learner factorises \\(2x^{2} − 9x − 5\\) and checks the answer by expanding. Step 1: \\(2x^{2} − 9x − 5 = (2x + 1)(x − 5)\\); Step 2: \\((2x + 1)(x − 5) = 2x^{2} − 10x + x + 5\\); Step 3: \\(2x^{2} − 10x + x + 5 = 2x^{2} − 9x + 5\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 2 is wrong: \\(1 × (−5) = −5\\), but the last term was written as \\(5\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it collects the like terms correctly."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it gives two brackets that multiply to the right quadratic."
      },
      {
        "text": "Step 2",
        "correct": true,
        "feedback": "Correct. Step 2 is where the working goes wrong: \\(1 × (−5) = −5\\), but the last term was written as \\(5\\). Everything after that step follows from the slip, so this is the step to mark as the first mistake."
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
    "question": "How many terms does \\((x − 6)(x + 1)(x + 5)\\) have after it is expanded and like terms are collected?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. The \\(x^{2}\\) terms cancel, so the expansion collects to \\(x^{3} − 31x − 30\\), which has \\(3\\) terms."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), by counting the \\(2 × 2 × 2 = 8\\) products before collecting like terms. After collecting, fewer terms remain."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), by assuming every power from \\(x^{3}\\) down to the constant appears. Here the \\(x^{2}\\) terms cancel, because \\(−6 + 1 + 5 = 0\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), by counting only six of the eight products. After collecting, the answer has fewer terms."
      }
    ],
    "backward": "Collecting like terms after expanding, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you notice when terms cancel and an expansion is shorter than you expect."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Factorise \\(x^{3} + 1\\).",
    "options": [
      {
        "text": "\\((x − 1)(x^{2} − x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x^{2} − x + 1)\\), getting the sign in the first bracket wrong. Expanding gives \\(x^{3} − 2x^{2} + 2x − 1\\), not the original."
      },
      {
        "text": "\\((x + 1)^{3}\\)",
        "correct": false,
        "feedback": "Chose \\((x + 1)^{3}\\), treating it as a cube of a bracket. Expanding gives \\(x^{3} + 3x^{2} + 3x + 1\\), which has extra terms."
      },
      {
        "text": "\\((x + 1)(x^{2} − x + 1)\\)",
        "correct": true,
        "feedback": "Correct. \\(a^{3} + b^{3} = (a + b)(a^{2} − ab + b^{2})\\). Here \\(a = x\\) and \\(b = 1\\), so \\(x^{3} + 1 = (x + 1)(x^{2} − x + 1)\\)."
      },
      {
        "text": "\\((x + 1)(x^{2} + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 1)(x^{2} + 1)\\), leaving out the middle term of the second bracket. Expanding gives \\(x^{3} + x^{2} + x + 1\\), not the original."
      }
    ],
    "backward": "Factorising a difference of two squares (earlier in this chapter).",
    "forward": "In a later chapter you meet these factorisations again when you simplify algebraic fractions."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "A learner factorises \\(12x^{2} + 15x\\) and checks the answer by expanding. Step 1: \\(12x^{2} + 15x = 3(4x^{2} + 5x)\\); Step 2: \\(3(4x^{2} + 5x) = 3x(4x + 5)\\); Step 3: \\(3x(4x + 5) = 12x^{2} + 15x\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it takes the common \\(x\\) out of the bracket correctly."
      },
      {
        "text": "There is no mistake",
        "correct": true,
        "feedback": "Correct. Every step is correct: step 1 takes out the common number correctly; step 2 takes the common \\(x\\) out of the bracket correctly; step 3 expands the factorised form correctly to check it."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it expands the factorised form correctly to check it."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it takes out the common number correctly."
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
    "question": "\\((x − 1)\\) and \\((x − 3)\\) are both factors of \\(x^{3} + px^{2} + qx − 6\\). Find the value of \\(p\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), by a sign slip when subtracting the two equations to remove one letter, which gives \\(6\\) instead of \\(−6\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), by substituting \\(x = 1\\) and \\(x = −3\\). The factors \\((x − 1)\\) and \\((x − 3)\\) are zero when \\(x = 1\\) and \\(x = 3\\)."
      },
      {
        "text": "\\(−6\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 0\\) gives \\(p + q − 5 = 0\\), and \\(f(3) = 0\\) gives \\(9p + 3q + 21 = 0\\). Solving the two equations gives \\(p = −6\\) and \\(q = 11\\), so the answer is \\(−6\\)."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Chose \\(0\\), by substituting \\(x = −1\\) and \\(x = 3\\). The factors \\((x − 1)\\) and \\((x − 3)\\) are zero when \\(x = 1\\) and \\(x = 3\\)."
      }
    ],
    "backward": "Substituting values into polynomials (earlier in this chapter).",
    "forward": "In a later chapter you solve simultaneous equations like these more quickly."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "A rectangle has length \\((x + 6)\\) cm and width \\((x − 4)\\) cm. Find its area when \\(x = 7\\).",
    "options": [
      {
        "text": "\\(10\\) cm²",
        "correct": false,
        "feedback": "Chose \\(10\\) cm², by subtracting \\(13 − 3\\). Area multiplies the length and the width."
      },
      {
        "text": "\\(91\\) cm²",
        "correct": false,
        "feedback": "Chose \\(91\\) cm², by using \\(x = 7\\) as the width instead of \\(3\\). The width is \\((x − 4)\\), which is \\(3\\)."
      },
      {
        "text": "\\(16\\) cm²",
        "correct": false,
        "feedback": "Chose \\(16\\) cm², by adding \\(13 + 3\\). Area multiplies the length and width."
      },
      {
        "text": "\\(39\\) cm²",
        "correct": true,
        "feedback": "Correct. Length = \\(7 + 6 = 13\\) cm and width = \\(7 − 4 = 3\\) cm. Area = \\(13 × 3 = 39\\) cm²."
      }
    ],
    "backward": "Multiplying a length by a width in algebra, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you multiply two brackets and compare the result with the area you found by substituting."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Which of these is a polynomial in \\(x\\)?",
    "options": [
      {
        "text": "\\(3x^{−2} − 2x\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{−2} − 2x\\), but it has a negative power of \\(x\\), so it is not a polynomial."
      },
      {
        "text": "\\((\\frac{1}{2})x^{3} − 2x\\)",
        "correct": true,
        "feedback": "Correct. Every power of \\(x\\) is a whole number, \\(0\\) or more, and \\(x\\) is in no denominator or exponent, so this is a polynomial. Dividing by a number only changes a coefficient."
      },
      {
        "text": "\\(2x^{3} + 3^{x}\\)",
        "correct": false,
        "feedback": "Chose \\(2x^{3} + 3^{x}\\), but \\(x\\) is in the exponent, not a whole-number power, so it is not a polynomial."
      },
      {
        "text": "\\(x^{\\frac{1}{2}} + 4x\\)",
        "correct": false,
        "feedback": "Chose \\(x^{\\frac{1}{2}} + 4x\\), but it has a fractional power of \\(x\\), so it is not a polynomial."
      }
    ],
    "backward": "Negative and fractional powers, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you divide only expressions that are polynomials, so you check the powers first."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\(−3x^{2}y × (−3x^{2}y)\\).",
    "options": [
      {
        "text": "\\(−6x^{4}y^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−6x^{4}y^{2}\\), by adding the coefficients \\(−3\\) and \\(−3\\). When you multiply terms, multiply the coefficients: \\(−3 × (−3) = 9\\)."
      },
      {
        "text": "\\(9x^{4}y^{2}\\)",
        "correct": true,
        "feedback": "Correct. Multiply the coefficients: \\(−3 × (−3) = 9\\). Add the powers of \\(x\\): \\(2 + 2 = 4\\). Add the powers of \\(y\\): \\(1 + 1 = 2\\). The result is \\(9x^{4}y^{2}\\)."
      },
      {
        "text": "\\(9x^{4}y\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{4}y\\), by not adding the powers of \\(y\\): \\(y^{1} × y^{1} = y^{2}\\)."
      },
      {
        "text": "\\(−9x^{4}y^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−9x^{4}y^{2}\\), by getting the sign wrong: \\(−3 × (−3) = 9\\)."
      }
    ],
    "backward": "Multiplying powers of two letters, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you meet products like this in expansions with two letters."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "A square of side \\((2x + 2)\\) cm has a square of side \\((x − 3)\\) cm cut from one corner. Which expression gives the area that is left, in cm²?",
    "options": [
      {
        "text": "\\(3x^{2} + 2x + 13\\)",
        "correct": false,
        "feedback": "Chose \\(3x^{2} + 2x + 13\\), by changing the sign of the first term of the expanded second square only. The minus sign changes every term of it."
      },
      {
        "text": "\\(x^{2} + 10x + 25\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 10x + 25\\), by subtracting the side lengths first and squaring that. The areas are subtracted, not the sides."
      },
      {
        "text": "\\(5x^{2} + 2x + 13\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} + 2x + 13\\), by adding the two areas instead of subtracting the cut-out."
      },
      {
        "text": "\\(3x^{2} + 14x − 5\\)",
        "correct": true,
        "feedback": "Correct. Area left = \\((2x + 2)^{2} − (x − 3)^{2} = 4x^{2} + 8x + 4 − (x^{2} − 6x + 9) = 3x^{2} + 14x − 5\\) cm²."
      }
    ],
    "backward": "Subtracting one algebraic area from another, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet a shortcut for squares of brackets and for a difference of two squares."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(x^{4} − 16\\).",
    "options": [
      {
        "text": "\\((x^{2} + 4)(x − 2)(x + 2)\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{4} = (x^{2})^{2}\\) and \\(16 = 4^{2}\\), so \\(x^{4} − 16 = (x^{2} − 4)(x^{2} + 4)\\). Then \\(x^{2} − 4 = (x − 2)(x + 2)\\), which gives \\((x^{2} + 4)(x − 2)(x + 2)\\). The factor \\(x^{2} + 4\\) cannot be factorised."
      },
      {
        "text": "\\((x^{2} − 4)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x^{2} − 4)^{2}\\), treating it as a perfect square. Expanding gives \\(x^{4} − 8x^{2} + 16\\), not the original."
      },
      {
        "text": "\\((x^{2} − 2)(x^{2} + 2)\\)",
        "correct": false,
        "feedback": "Chose \\((x^{2} − 2)(x^{2} + 2)\\), using \\(2\\) where the square root of \\(16\\) is needed, which is \\(4\\). Expanding gives \\(x^{4} − 4\\), not the original."
      },
      {
        "text": "\\((x − 2)^{4}\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)^{4}\\), treating it as a fourth power of one bracket. Expanding gives \\(x^{4} − 8x^{3} + 24x^{2} − 32x + 16\\), which has extra terms."
      }
    ],
    "backward": "The power of a power, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you use repeated differences of squares to factorise higher powers."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(15x^{2}y − 5xy^{2}\\).",
    "options": [
      {
        "text": "\\(xy(15x − 5y)\\)",
        "correct": false,
        "feedback": "Chose \\(xy(15x − 5y)\\), taking out only \\(xy\\). The bracket still has the common factor \\(5\\), so it is not fully factorised."
      },
      {
        "text": "\\(5xy(3x − 5y)\\)",
        "correct": false,
        "feedback": "Chose \\(5xy(3x − 5y)\\), dividing the second term by \\(xy\\) but not by \\(5\\). Every term must be divided by the whole common factor \\(5xy\\)."
      },
      {
        "text": "\\(5(3x^{2}y − xy^{2})\\)",
        "correct": false,
        "feedback": "Chose \\(5(3x^{2}y − xy^{2})\\), taking out only the number \\(5\\). The bracket still has the common factor \\(xy\\), so it is not fully factorised."
      },
      {
        "text": "\\(5xy(3x − y)\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of the terms is \\(5xy\\). Dividing each term by \\(5xy\\) leaves \\(3x − y\\), so \\(15x^{2}y − 5xy^{2} = 5xy(3x − y)\\)."
      }
    ],
    "backward": "Common factors with two letters, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet common factors again inside harder factorisations."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(6x^{2} + x − 40\\) completely.",
    "options": [
      {
        "text": "\\((2x + 5)(3x − 8)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 5)(3x − 8)\\), the signs the wrong way round. Expanding gives \\(6x^{2} − x − 40\\), not the original."
      },
      {
        "text": "\\((2x + 8)(3x − 5)\\)",
        "correct": false,
        "feedback": "Chose \\((2x + 8)(3x − 5)\\), putting the numbers \\(−5\\) and \\(8\\) in the wrong brackets. Expanding gives \\(6x^{2} + 14x − 40\\), not the original."
      },
      {
        "text": "\\((2x − 5)(3x − 8)\\)",
        "correct": false,
        "feedback": "Chose \\((2x − 5)(3x − 8)\\), changing the sign of one number. Expanding gives \\(6x^{2} − 31x + 40\\), not the original."
      },
      {
        "text": "\\((2x − 5)(3x + 8)\\)",
        "correct": true,
        "feedback": "Correct. Look for two numbers that multiply to \\(6 × (−40) = −240\\) and add to \\(1\\): \\(16\\) and \\(−15\\). Splitting the middle term and grouping gives \\(6x^{2} + x − 40 = (2x − 5)(3x + 8)\\). Check by expanding."
      }
    ],
    "backward": "Factor pairs of larger numbers, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you solve harder quadratic equations by factorising them."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "A rectangle has area \\(x^{2} + 13x + 40\\) cm² and length \\((x + 8)\\) cm. Which expression gives its width in cm?",
    "options": [
      {
        "text": "\\(x + 5\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} + 13x + 40 = (x + 8)(x + 5)\\), because \\(8 × 5 = 40\\) and \\(8 + 5 = 13\\). The length is \\((x + 8)\\) cm, so the width is \\(x + 5\\) cm."
      },
      {
        "text": "\\(x − 5\\)",
        "correct": false,
        "feedback": "Chose \\(x − 5\\), by getting the sign wrong. Check: \\((x + 8)(x − 5) = x^{2} + 3x − 40\\), not \\(x^{2} + 13x + 40\\)."
      },
      {
        "text": "\\(x + 40\\)",
        "correct": false,
        "feedback": "Chose \\(x + 40\\), by using the constant term \\(40\\) as the second number. It must multiply with \\(8\\) to make \\(40\\), so it is \\(5\\)."
      },
      {
        "text": "\\(x + 13\\)",
        "correct": false,
        "feedback": "Chose \\(x + 13\\), by using the coefficient \\(13\\) of \\(x\\) as the second number. The number must multiply with \\(8\\) to make \\(40\\)."
      }
    ],
    "backward": "Writing an area as a product of two lengths, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use factorising to simplify fractions with quadratics in them."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Without a calculator, work out \\(18^{2} − 12^{2}\\) using an identity.",
    "options": [
      {
        "text": "\\(180\\)",
        "correct": true,
        "feedback": "Correct. \\(18^{2} − 12^{2} = (18 − 12)(18 + 12) = 6 × 30 = 180\\)."
      },
      {
        "text": "\\(312\\)",
        "correct": false,
        "feedback": "Chose \\(312\\), by not squaring \\(12\\). Both numbers are squared before subtracting."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), by squaring the difference. \\(18^{2} − 12^{2} = (18 − 12)(18 + 12)\\), not \\((18 − 12)^{2}\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Chose \\(18\\), by a place-value slip in \\(6 × 30\\). Check the multiplication."
      }
    ],
    "backward": "Factors and products of whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise a difference of squares with letters in the same way."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "\\(x^{2} + 18x + k\\) is a perfect square. Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Chose \\(18\\), by copying the coefficient of \\(x\\). The last term is the square of half of \\(18\\)."
      },
      {
        "text": "\\(162\\)",
        "correct": false,
        "feedback": "Chose \\(162\\), by squaring the whole coefficient \\(18\\) and halving. Square half of \\(18\\) instead."
      },
      {
        "text": "\\(81\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} + 18x + k = (x + 9)^{2} = x^{2} + 18x + 81\\), because \\(9\\) is half of \\(18\\). So \\(k = 81\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), by halving \\(18\\) but not squaring. The last term is \\(9^{2}\\)."
      }
    ],
    "backward": "Halving a number and squaring it, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you find the missing number when you complete the square."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Divide \\(x^{3} + x^{2} − 8x − 14\\) by \\((x − 3)\\). Which gives the quotient and the remainder?",
    "options": [
      {
        "text": "quotient \\(x^{2} − 2x − 2\\), remainder \\(−8\\)",
        "correct": false,
        "feedback": "Chose quotient \\(x^{2} − 2x − 2\\), remainder \\(−8\\), dividing by \\((x + 3)\\) instead of \\((x − 3)\\). The remainder \\(f(3)\\) is \\(−2\\), not \\(−8\\)."
      },
      {
        "text": "quotient \\(x^{2} + 4x + 4\\), remainder \\(−2\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{3} + x^{2} − 8x − 14 = (x − 3)(x^{2} + 4x + 4) − 2\\), so the quotient is \\(x^{2} + 4x + 4\\) and the remainder is \\(−2\\). The remainder agrees with \\(f(3)\\)."
      },
      {
        "text": "quotient \\(x^{2} + 4x + 4\\), remainder \\(2\\)",
        "correct": false,
        "feedback": "Chose quotient \\(x^{2} + 4x + 4\\), remainder \\(2\\), with the sign of the remainder changed. The remainder is \\(f(3) = −2\\)."
      },
      {
        "text": "quotient \\(x^{2} + 4x + 2\\), remainder \\(0\\)",
        "correct": false,
        "feedback": "Chose quotient \\(x^{2} + 4x + 2\\), remainder \\(0\\), adding the remainder into the quotient, which is not allowed: \\((x − 3)\\) times the quotient plus the remainder must give the original."
      }
    ],
    "backward": "Dividing and writing a remainder, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the quotient and remainder together to rebuild the original polynomial."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "A learner divides \\(x^{3} − 7x + 5\\) by \\((x + 3)\\) and gets quotient \\(x^{2} − 3x + 2\\) and remainder \\(−1\\). To check, the learner works out \\((x + 3)(x^{2} − 3x + 2) − 1\\). Step 1: \\((x + 3)(x^{2} − 3x + 2) − 1 = x(x^{2} − 3x + 2) − 3(x^{2} − 3x + 2) − 1\\); Step 2: \\(x(x^{2} − 3x + 2) − 3(x^{2} − 3x + 2) − 1 = x^{3} − 3x^{2} + 2x − 3x^{2} + 9x − 6 − 1\\); Step 3: \\(x^{3} − 3x^{2} + 2x − 3x^{2} + 9x − 6 − 1 = x^{3} − 6x^{2} + 11x − 7\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: \\((x + 3)\\) has \\(3\\), so the second product is \\(3(x^{2} − 3x + 2)\\), but the line has \\(−3(x^{2} − 3x + 2)\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it collects the like terms correctly."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it writes out the products term by term correctly."
      },
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: \\((x + 3)\\) has \\(3\\), so the second product is \\(3(x^{2} − 3x + 2)\\), but the line has \\(−3(x^{2} − 3x + 2)\\). Later lines can look tidy because they build on the wrong line; the mistake is still the first line that is false."
      }
    ],
    "backward": "Checking a division by multiplying back, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you check every division by multiplying back in this way."
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
  title: "Polynomials, Identities and Factorising — Synthesis",
  subtitle: "Grade 9 · Level 3 · Synthesis",
  description: "Polynomial basics and substitution, collecting and expanding, factorising, the standard identities, and the remainder and factor theorems — warm-up, diagnostic, and spaced recheck for synthesis.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> This diagnostic mixes the ideas. A factorising question may need an identity, and a remainder question may be easier if you notice a factor first. Before you calculate, decide what the question is really asking and which topics it needs, then plan the order of your steps. There is no calculator and no time limit: the thinking is the point. If you get stuck, look for the common factor or the pattern you can see first.</p><p>Some questions show a learner's working: look for the first line that is not equal to the line before it. You will meet all six topics, mixed together, and some items need two of them at once.</p>",
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

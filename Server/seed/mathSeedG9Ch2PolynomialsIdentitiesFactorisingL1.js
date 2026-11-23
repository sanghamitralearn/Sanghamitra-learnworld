// Polynomials, Identities and Factorising — Grade 9, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch02-polynomials-identities-factorising-level-1.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch2PolynomialsIdentitiesFactorisingL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-2-polynomials-identities-factorising";
const CHAPTER_NAME = "Polynomials, Identities and Factorising";
const LEVEL = 1;

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
    "question": "What is the degree of \\(−2x^{3} − 3x^{2} + 4x − 2\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), counting the powers from \\(0\\) up to \\(3\\). The degree is the highest power itself, \\(3\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), adding all the powers: \\(3 + 2 + 1 + 0\\). The degree is only the largest power, \\(3\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. The degree is the highest power of \\(x\\). The highest power here is \\(x^{3}\\), so the degree is \\(3\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the power in the second term. The degree is the highest power, and that is \\(3\\)."
      }
    ],
    "retryHint": "Ignore the numbers in front and compare the powers of \\(x\\). The degree is the largest power, wherever that term is written.",
    "backward": "Powers of a letter, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter the degree tells you how high the power of an expansion or a quotient will be."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} + 8x + 12\\) completely.",
    "options": [
      {
        "text": "\\((x + 3)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 3)(x + 5)\\), using \\(3\\) and \\(5\\), which add to \\(8\\) but multiply to \\(15\\), not \\(12\\)."
      },
      {
        "text": "\\((x − 6)(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 6)(x − 2)\\), the signs the wrong way round. Expanding gives \\(x^{2} − 8x + 12\\), not the original."
      },
      {
        "text": "\\((x − 2)(x + 6)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)(x + 6)\\), changing the sign of one number. Expanding gives \\(x^{2} + 4x − 12\\), not the original."
      },
      {
        "text": "\\((x + 2)(x + 6)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(12\\) and add to \\(8\\): \\(2\\) and \\(6\\). So \\(x^{2} + 8x + 12 = (x + 2)(x + 6)\\)."
      }
    ],
    "retryHint": "Both numbers are positive here. List the factor pairs of the last term and pick the pair that adds to the number in front of \\(x\\).",
    "backward": "Factor pairs of whole numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise quadratics with a number in front of \\(x^{2}\\) using the same idea."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\((−x^{2} − 6x − 2) + (6x^{2} − 5x + 3)\\).",
    "options": [
      {
        "text": "\\(5x^{2} − 11x\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} − 11x\\), by leaving out the constants. They are added as well: \\(−2 + 3 = 1\\)."
      },
      {
        "text": "\\(−6x^{2} + 1\\)",
        "correct": false,
        "feedback": "Chose \\(−6x^{2} + 1\\), by adding the \\(x^{2}\\) terms and the \\(x\\) terms together as if they were like terms. Only terms with the same power of \\(x\\) can be combined."
      },
      {
        "text": "\\(5x^{4} − 11x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{4} − 11x + 1\\), by adding the powers as well: \\(x^{2} + x^{2} = 2x^{2}\\), not \\(2x^{4}\\). Adding like terms changes the coefficient, not the power."
      },
      {
        "text": "\\(5x^{2} − 11x + 1\\)",
        "correct": true,
        "feedback": "Correct. Collect like terms: the \\(x^{2}\\) terms give \\(−1 + 6 = 5\\), the \\(x\\) terms give \\(−6 + (−5) = −11\\) and the constants give \\(−2 + 3 = 1\\)."
      }
    ],
    "retryHint": "Put the terms with the same power of \\(x\\) together and add their coefficients, keeping every sign.",
    "backward": "Collecting like terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you collect like terms after every expansion."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((x + 2)^{2}\\).",
    "options": [
      {
        "text": "\\(x^{2} + 2x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 2x + 4\\), using \\(2x\\) for the middle term. The middle term is twice the product, \\(4x\\)."
      },
      {
        "text": "\\(x^{2} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 4\\), squaring each term and leaving out the middle term. \\((x + 2)^{2}\\) means \\((x + 2)(x + 2)\\), so there is a middle term \\(4x\\)."
      },
      {
        "text": "\\(x^{2} + 4x + 4\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\) with \\(a = x\\) and \\(b = 2\\) gives \\(x^{2} + 4x + 4\\)."
      },
      {
        "text": "\\(x^{2} − 4x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 4x + 4\\), getting the sign of the middle term wrong. It has the same sign as the term \\(2\\) in the bracket."
      }
    ],
    "retryHint": "Write the bracket twice and multiply term by term, or use the pattern for \\((a + b)^{2}\\). The middle term is twice the product of the two terms.",
    "backward": "Multiplying a bracket by itself, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you reverse this identity to factorise perfect squares."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "What is the highest common factor of \\(20x^{3}\\) and \\(15x^{4}\\)?",
    "options": [
      {
        "text": "\\(20x^{3}\\)",
        "correct": false,
        "feedback": "Chose \\(20x^{3}\\), by using the larger coefficient, \\(20\\). It does not divide the other term; the highest common factor of the numbers is \\(5\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), by finding the common number but leaving out \\(x^{3}\\). Both terms contain \\(x^{3}\\)."
      },
      {
        "text": "\\(5x^{4}\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{4}\\), by taking the larger power. The highest common factor uses the smaller power of \\(x\\), which is \\(x^{3}\\)."
      },
      {
        "text": "\\(5x^{3}\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of the numbers \\(20\\) and \\(15\\) is \\(5\\). The highest power of \\(x\\) in both terms is \\(x^{3}\\). So the highest common factor is \\(5x^{3}\\)."
      }
    ],
    "retryHint": "Find the highest common factor of the two numbers, then the smaller of the two powers of \\(x\\).",
    "backward": "Highest common factor of two numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you take this factor out of a whole expression."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "In \\(−5x^{4} − 2x^{3} − 5x^{2} − 5x − 1\\), what is the coefficient of \\(x^{2}\\)?",
    "options": [
      {
        "text": "\\(−5\\)",
        "correct": true,
        "feedback": "Correct. The term in \\(x^{2}\\) is \\(−5x^{2}\\), so the coefficient is \\(−5\\), sign included."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the power of \\(x\\), not the number in front. The coefficient is the number multiplying \\(x^{2}\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), dropping the minus sign. The sign belongs to the term, so the coefficient is \\(−5\\)."
      },
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), which is the constant term, a number on its own. The coefficient of \\(x^{2}\\) is the number multiplying it."
      }
    ],
    "retryHint": "Find the term with exactly that power of \\(x\\) and read the number in front of it, keeping its sign.",
    "backward": "Reading the terms of an expression, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you read one coefficient from an expansion to check your working."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Which pair of numbers has product \\(−6\\) and sum \\(1\\)?",
    "options": [
      {
        "text": "\\(4\\) and \\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(4\\) and \\(−3\\), which add to \\(1\\) but multiply to \\(−12\\), not \\(−6\\)."
      },
      {
        "text": "\\(1\\) and \\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(1\\) and \\(−6\\), which multiply to \\(−6\\) but add to \\(−5\\), not \\(1\\)."
      },
      {
        "text": "\\(−2\\) and \\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−2\\) and \\(−3\\), which multiply to \\(6\\) and add to \\(−5\\). Neither matches."
      },
      {
        "text": "\\(3\\) and \\(−2\\)",
        "correct": true,
        "feedback": "Correct. \\(3 × (−2) = −6\\) and \\(3 + (−2) = 1\\), so the pair is \\(3\\) and \\(−2\\)."
      }
    ],
    "retryHint": "Check each pair twice: multiply the two numbers, then add them. Both results must match.",
    "backward": "Calculating with negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this pair to split the middle term of harder quadratics."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand and simplify \\((x − 9)(x + 9)\\).",
    "options": [
      {
        "text": "\\(x^{2} − 9\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 9\\), not squaring the second term. \\(9^{2} = 81\\)."
      },
      {
        "text": "\\(x^{2} + 81\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 81\\), adding the squares. The last term is \\(−9 × 9\\), which is negative: \\(−81\\)."
      },
      {
        "text": "\\(x^{2} − 18x + 81\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 18x + 81\\), treating it as a square. There are two different brackets, so the middle terms cancel."
      },
      {
        "text": "\\(x^{2} − 81\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)(a + b) = a^{2} − b^{2}\\) with \\(a = x\\) and \\(b = 9\\) gives \\(x^{2} − 81\\). The middle terms cancel."
      }
    ],
    "retryHint": "Multiply out and watch the two middle terms cancel. What is left is the first term squared minus the last term squared.",
    "backward": "Multiplying brackets that differ only in sign, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use this pattern to calculate \\(98 × 102\\) without a calculator."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "One of these polynomials is a binomial. Which is it?",
    "options": [
      {
        "text": "\\(−x^{2} − 6x\\)",
        "correct": true,
        "feedback": "Correct. A binomial is a polynomial with exactly \\(2\\) terms. This expression has \\(2\\)."
      },
      {
        "text": "\\(5x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2}\\), but it has \\(1\\) term, so it is a monomial. A binomial has exactly \\(2\\) terms."
      },
      {
        "text": "\\(5x^{2} + \\frac{5}{x}\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{2} + \\frac{5}{x}\\), but it has \\(x\\) in a denominator, which is a power of \\(x\\) below zero, so it is not a polynomial and cannot be called a binomial, even though it has two terms."
      },
      {
        "text": "\\(6x^{4} − 2x^{3} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{4} − 2x^{3} + 3\\), but it has \\(3\\) terms, so it is a trinomial. A binomial has exactly \\(2\\) terms."
      }
    ],
    "backward": "Counting the terms of an expression, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use the words monomial, binomial and trinomial to describe what you expand and factorise."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} + 7x − 18\\) completely.",
    "options": [
      {
        "text": "\\((x − 1)(x + 8)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x + 8)\\), using \\(−1\\) and \\(8\\), which add to \\(7\\) but multiply to \\(−8\\), not \\(−18\\)."
      },
      {
        "text": "\\((x + 2)(x + 9)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(x + 9)\\), changing the sign of one number. Expanding gives \\(x^{2} + 11x + 18\\), not the original."
      },
      {
        "text": "\\((x − 2)(x + 9)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−18\\) and add to \\(7\\): \\(−2\\) and \\(9\\). So \\(x^{2} + 7x − 18 = (x − 2)(x + 9)\\)."
      },
      {
        "text": "\\((x − 18)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 18)(x + 1)\\), using \\(−18\\) and \\(1\\), which multiply to \\(−18\\) but add to \\(−17\\), not \\(7\\)."
      }
    ],
    "backward": "Adding numbers with different signs, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise mixed-sign quadratics that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Expand \\(5x^{2}(−3x + 1)\\).",
    "options": [
      {
        "text": "\\(2x^{3} + 6x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(2x^{3} + 6x^{2}\\), by adding the coefficients instead of multiplying them. Multiply every term inside the bracket by \\(5x^{2}\\)."
      },
      {
        "text": "\\(−15x^{3} + 5x^{2}\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term in the bracket by \\(5x^{2}\\): \\(5x^{2} × (−3x) = −15x^{3}\\); \\(5x^{2} × (1) = 5x^{2}\\). The result is \\(−15x^{3} + 5x^{2}\\)."
      },
      {
        "text": "\\(−15x^{3} + 1\\)",
        "correct": false,
        "feedback": "Chose \\(−15x^{3} + 1\\), by forgetting to multiply the last term. Every term inside the bracket is multiplied, including the last."
      },
      {
        "text": "\\(−15x^{2} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(−15x^{2} + 5\\), by writing the new powers as the product of the old ones. When you multiply by \\(x^{2}\\) you add \\(2\\) to each power."
      }
    ],
    "backward": "Multiplying a term over a bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise by taking out a common factor, which is this step run backwards."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((x − 8)^{2}\\).",
    "options": [
      {
        "text": "\\(x^{2} − 16x + 64\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)^{2} = a^{2} − 2ab + b^{2}\\) with \\(a = x\\) and \\(b = 8\\) gives \\(x^{2} − 16x + 64\\)."
      },
      {
        "text": "\\(x^{2} + 16x + 64\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 16x + 64\\), getting the sign of the middle term wrong. It has the same sign as the term \\(−8\\) in the bracket."
      },
      {
        "text": "\\(x^{2} − 8x + 64\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 8x + 64\\), using \\(−8x\\) for the middle term. The middle term is twice the product, \\(−16x\\)."
      },
      {
        "text": "\\(x^{2} + 64\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 64\\), squaring each term and leaving out the middle term. \\((x − 8)^{2}\\) means \\((x − 8)(x − 8)\\), so there is a middle term \\(−16x\\)."
      }
    ],
    "backward": "Multiplying brackets that contain a minus, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet the matching factorisation of a perfect square with a minus."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise completely \\(6x^{3} + 12x^{2}\\).",
    "options": [
      {
        "text": "\\(6x^{2}(x + 12)\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2}(x + 12)\\), dividing the last term by \\(x^{2}\\) but not by \\(6\\). Every term must be divided by the whole common factor \\(6x^{2}\\)."
      },
      {
        "text": "\\(6x^{2}(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\(6x^{2}(x − 2)\\), getting a sign wrong inside the bracket. Expanding gives \\(6x^{3} − 12x^{2}\\), not the original."
      },
      {
        "text": "\\(6(x^{3} + 2x^{2})\\)",
        "correct": false,
        "feedback": "Chose \\(6(x^{3} + 2x^{2})\\), taking out only the number \\(6\\). The bracket still has the common factor \\(x^{2}\\), so it is not fully factorised."
      },
      {
        "text": "\\(6x^{2}(x + 2)\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor is \\(6x^{2}\\). Dividing each term by \\(6x^{2}\\) leaves \\(x + 2\\), so \\(6x^{3} + 12x^{2} = 6x^{2}(x + 2)\\)."
      }
    ],
    "backward": "Taking out a common factor, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you take out common factors before you use other methods."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Find the remainder when \\(f(x) = x^{4} − 2x^{2} − 5x + 3\\) is divided by \\((x − 2)\\).",
    "options": [
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Chose \\(21\\), by substituting \\(x = −2\\) instead of \\(x = 2\\). The divisor is \\((x − 2)\\), which is zero when \\(x = 2\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. The divisor \\((x − 2)\\) is zero when \\(x = 2\\). By the remainder theorem the remainder is \\(f(2) = 1\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Chose \\(19\\), by substituting into the quotient instead. The remainder is the value of the original polynomial at \\(x = 2\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), by adding the number from the divisor to the value. The remainder is \\(f(2)\\) exactly."
      }
    ],
    "backward": "Substituting into expressions, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use a zero remainder to prove that a bracket is a factor."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Find the value of \\(3x^{2} + 3x + 5\\) when \\(x = 3\\).",
    "options": [
      {
        "text": "\\(41\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = 3\\) into every term: \\(3(3)^{2} + 3(3) + 5 = 41\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), by leaving out the constant term \\(5\\). Every term counts, including the number on its own."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Chose \\(32\\), by reading \\(x^{2}\\) as \\(2x\\), so \\((3)^{2}\\) became \\(2 × (3) = 6\\). A power means repeated multiplication: \\((3)^{2} = 9\\)."
      },
      {
        "text": "\\(95\\)",
        "correct": false,
        "feedback": "Chose \\(95\\), by applying the power \\(2\\) to the coefficient as well, as if the term were \\((3x)^{2}\\). The power applies to \\(x\\) only: \\(3 × (3)^{2}\\)."
      }
    ],
    "backward": "Substituting into expressions, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter the remainder theorem turns division by \\((x − a)\\) into this kind of substitution."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} − 9x + 20\\).",
    "options": [
      {
        "text": "\\((x − 5)(x − 4)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(20\\) and add to \\(−9\\): \\(−5\\) and \\(−4\\). So \\(x^{2} − 9x + 20 = (x − 5)(x − 4)\\)."
      },
      {
        "text": "\\((x + 4)(x + 5)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 4)(x + 5)\\), the signs the wrong way round. Expanding gives \\(x^{2} + 9x + 20\\), not the original."
      },
      {
        "text": "\\((x − 20)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 20)(x − 1)\\), using \\(−20\\) and \\(−1\\), which multiply to \\(20\\) but add to \\(−21\\), not \\(−9\\)."
      },
      {
        "text": "\\((x + 5)(x − 4)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 5)(x − 4)\\), changing the sign of one number. Expanding gives \\(x^{2} + x − 20\\), not the original."
      }
    ],
    "backward": "Adding negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet the same sign pattern in quadratics with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Multiply out and simplify \\((x − 3)(x + 2)\\).",
    "options": [
      {
        "text": "\\(x^{2} + 2x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 2x − 6\\), by including only one of the two cross products. Both must be added: \\(2x\\) and \\(−3x\\)."
      },
      {
        "text": "\\(x^{2} − x − 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply each term in the first bracket by each term in the second: \\(x^{2} + 2x − 3x − 6\\). Collecting the \\(x\\) terms gives \\(x^{2} − x − 6\\)."
      },
      {
        "text": "\\(x^{2} + 5x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 5x − 6\\), by ignoring the minus signs when adding the cross products. Keep the signs: \\(2x\\) and \\(−3x\\)."
      },
      {
        "text": "\\(x^{2} − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 6\\), by multiplying only the first terms and the last terms. The two cross products \\(2x\\) and \\(−3x\\) are missing."
      }
    ],
    "backward": "Multiplying two brackets, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you run this backwards to factorise quadratics."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Without a calculator, work out \\(52^{2}\\) using an identity.",
    "options": [
      {
        "text": "\\(104\\)",
        "correct": false,
        "feedback": "Chose \\(104\\), by doubling \\(52\\) instead of squaring it."
      },
      {
        "text": "\\(2304\\)",
        "correct": false,
        "feedback": "Chose \\(2304\\), by getting the sign of the middle term wrong. For \\(52 = 50 + 2\\) the middle term is + \\(200\\)."
      },
      {
        "text": "\\(2504\\)",
        "correct": false,
        "feedback": "Chose \\(2504\\), by squaring each part and leaving out the middle term: \\(50^{2} + 2 × 50 × 2 + 2^{2}\\) has a middle term \\(200\\)."
      },
      {
        "text": "\\(2704\\)",
        "correct": true,
        "feedback": "Correct. Write \\(52 = 50 + 2\\). Then \\(52^{2} = 50^{2} + 2 × 50 × 2 + 2^{2} = 2500 + 200 + 4 = 2704\\)."
      }
    ],
    "backward": "Square numbers and mental calculation, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the same identities with letters instead of numbers."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(x^{2} − 9\\).",
    "options": [
      {
        "text": "\\((x − 3)(x + 3)\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} − 9 = x^{2} − 3^{2}\\), a difference of two squares, so it equals \\((x − 3)(x + 3)\\)."
      },
      {
        "text": "\\((x − 3)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x − 3)^{2}\\), treating it as a perfect square. Expanding gives \\(x^{2} − 6x + 9\\), which has a middle term the original does not have."
      },
      {
        "text": "\\((x + 3)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x + 3)^{2}\\), treating it as a perfect square. Expanding gives \\(x^{2} + 6x + 9\\), which has a middle term the original does not have."
      },
      {
        "text": "\\((x − 9)(x + 9)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 9)(x + 9)\\), using \\(9\\) instead of its square root \\(3\\). Expanding gives \\(x^{2} − 81\\), not the original."
      }
    ],
    "backward": "Square numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use this pattern to do arithmetic quickly, as in \\(98 × 102\\)."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Exactly one of these brackets is a factor of \\(x^{3} + 5x^{2} − 16\\). Which one?",
    "options": [
      {
        "text": "\\(x + 4\\)",
        "correct": true,
        "feedback": "Correct. The bracket \\((x + 4)\\) is zero when \\(x = −4\\). Substituting gives \\(0\\), so by the factor theorem \\((x + 4)\\) is a factor."
      },
      {
        "text": "\\(x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x − 4\\), but substituting: \\(f(4) = 128\\), which is not \\(0\\), so \\((x − 4)\\) is not a factor."
      },
      {
        "text": "\\(x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x − 2\\), but substituting: \\(f(2) = 12\\), which is not \\(0\\), so \\((x − 2)\\) is not a factor."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), but substituting: \\(f(−2) = −4\\), which is not \\(0\\), so \\((x + 2)\\) is not a factor."
      }
    ],
    "backward": "Trying values in turn, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use one known factor to factorise a cubic completely."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "What is the constant term of \\(−4x − 6 + 2x^{2}\\)?",
    "options": [
      {
        "text": "\\(−4\\)",
        "correct": false,
        "feedback": "Chose \\(−4\\), which is the coefficient of the first term written. The constant term is the number on its own, with no \\(x\\)."
      },
      {
        "text": "\\(−6\\)",
        "correct": true,
        "feedback": "Correct. The constant term is the term with no \\(x\\). Here it is \\(−6\\), even though it is not written last."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the leading coefficient. The constant term is the number on its own, with no \\(x\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), dropping the minus sign. The constant term keeps its sign: \\(−6\\)."
      }
    ],
    "backward": "Terms and their signs, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter the constant term helps you guess factors when you factorise a quadratic."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "\\(x^{2} + kx − 28 = (x − 7)(x + 4)\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), by getting the sign wrong. The brackets give \\(−7x + 4x = −3x\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), by ignoring the minus signs. Add the numbers with their signs."
      },
      {
        "text": "\\(−3\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(x^{2} + (−7 + 4)x + (−7) × 4\\). The coefficient of \\(x\\) is \\(−7 + 4 = −3\\), so \\(k = −3\\)."
      },
      {
        "text": "\\(−28\\)",
        "correct": false,
        "feedback": "Chose \\(−28\\), by multiplying \\(−7\\) and \\(4\\). The coefficient of \\(x\\) comes from adding the numbers."
      }
    ],
    "backward": "Expanding two brackets, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you compare coefficients to solve problems about quadratics."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\((−3x^{3})^{2}\\).",
    "options": [
      {
        "text": "\\(−9x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(−9x^{6}\\), by getting the sign wrong: \\((−3)^{2} = 9\\). An even power of a negative number is positive."
      },
      {
        "text": "\\(9x^{6}\\)",
        "correct": true,
        "feedback": "Correct. Raise every part of the bracket to the power \\(2\\): \\((−3)^{2} = 9\\) and \\((x^{3})^{2} = x^{6}\\), so the answer is \\(9x^{6}\\)."
      },
      {
        "text": "\\(−6x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(−6x^{6}\\), by multiplying the coefficient by \\(2\\). Raise it to the power instead: \\((−3)^{2} = 9\\)."
      },
      {
        "text": "\\(9x^{5}\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{5}\\), by adding the powers \\(3\\) and \\(2\\). A power of a power multiplies them: \\(3 × 2 = 6\\)."
      }
    ],
    "backward": "The power of a power, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you meet cubes of brackets, such as \\((x + 2)^{3}\\), which need these index laws."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand \\((3x − 3)(3x + 3)\\).",
    "options": [
      {
        "text": "\\(9x^{2} − 3\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 3\\), not squaring the second term. \\(3^{2} = 9\\)."
      },
      {
        "text": "\\(9x^{2} − 18x + 9\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} − 18x + 9\\), treating it as a square. There are two different brackets, so the middle terms cancel."
      },
      {
        "text": "\\(9x^{2} − 9\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a − b)(a + b) = a^{2} − b^{2}\\) with \\(a = 3x\\) and \\(b = 3\\) gives \\(9x^{2} − 9\\). The middle terms cancel."
      },
      {
        "text": "\\(9x^{2} + 9\\)",
        "correct": false,
        "feedback": "Chose \\(9x^{2} + 9\\), adding the squares. The last term is \\(−3 × 3\\), which is negative: \\(−9\\)."
      }
    ],
    "backward": "Squaring terms with a number in front, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you reverse this pattern to factorise a difference of two squares with a number in front."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Factorise \\(x^{2} + 4x + 4\\).",
    "options": [
      {
        "text": "\\((x + 2)^{2}\\)",
        "correct": true,
        "feedback": "Correct. The first and last terms are squares, \\(x^{2}\\) and \\(4 = 2^{2}\\), and the middle term \\(4x\\) is twice the product of \\(x\\) and \\(2\\). So \\(x^{2} + 4x + 4 = (x + 2)^{2}\\)."
      },
      {
        "text": "\\((x + 2)(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)(x − 2)\\), using the difference-of-squares pattern. Expanding gives \\(x^{2} − 4\\), which has no middle term."
      },
      {
        "text": "\\((x − 2)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)^{2}\\), getting the sign wrong. Expanding gives \\(x^{2} − 4x + 4\\), not the original."
      },
      {
        "text": "\\((x + 4)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 4)(x + 1)\\), using the factor pair \\(4\\) and \\(1\\) of the last term. They add to \\(5\\), not \\(4\\), so the middle term is wrong."
      }
    ],
    "backward": "Squares and square roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet perfect squares again as the pattern \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\)."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "When \\(f(x)\\) is divided by \\((x − 4)\\) the remainder is \\(0\\). Which statement must be true?",
    "options": [
      {
        "text": "\\(f(4) = 0\\)",
        "correct": true,
        "feedback": "Correct. The remainder when dividing by \\((x − 4)\\) is \\(f(4)\\), so \\(f(4) = 0\\). This also means \\((x − 4)\\) is a factor of \\(f(x)\\)."
      },
      {
        "text": "\\(f(0) = 4\\)",
        "correct": false,
        "feedback": "Chose \\(f(0) = 4\\), but it mixes up the divisor with the value of the polynomial. The remainder theorem is about \\(f\\) at the number that makes the divisor zero."
      },
      {
        "text": "\\(f(x) = 4\\)",
        "correct": false,
        "feedback": "Chose \\(f(x) = 4\\), but it confuses the number in the divisor with the value of the polynomial."
      },
      {
        "text": "\\(f(−4) = 0\\)",
        "correct": false,
        "feedback": "Chose \\(f(−4) = 0\\), but it uses \\(x = −4\\). The divisor \\((x − 4)\\) is zero when \\(x = 4\\)."
      }
    ],
    "backward": "What a zero remainder means in a division, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use statements like this to find unknown coefficients."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "For \\(p(x) = 2x^{3} − x^{2} − 6x − 3\\), which statement is true?",
    "options": [
      {
        "text": "\\(p(1) = −7\\)",
        "correct": false,
        "feedback": "Chose \"\\(p(1) = −7\\)\", which is false. In fact \\(p(1)\\) is the sum of the coefficients: \\(2 − 1 − 6 − 3 = −8\\)."
      },
      {
        "text": "The leading coefficient of \\(p(x)\\) is \\(−2\\)",
        "correct": false,
        "feedback": "Chose \"The leading coefficient of \\(p(x)\\) is \\(−2\\)\", which is false. In fact the leading coefficient is \\(2\\), the number multiplying \\(x^{3}\\)."
      },
      {
        "text": "The degree of \\(p(x)\\) is \\(3\\)",
        "correct": true,
        "feedback": "Correct. This statement is true: its degree is \\(3\\), the highest power of \\(x\\)."
      },
      {
        "text": "The constant term of \\(p(x)\\) is \\(−4\\)",
        "correct": false,
        "feedback": "Chose \"The constant term of \\(p(x)\\) is \\(−4\\)\", which is false. In fact the constant term is \\(−3\\), the number with no \\(x\\)."
      }
    ],
    "backward": "Checking a claim by substitution, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use \\(p(1)\\), \\(p(0)\\) and the constant term to test possible factors quickly."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise completely \\(4x^{2} − 4x − 8\\).",
    "options": [
      {
        "text": "\\(4(x + 2)(x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\(4(x + 2)(x − 1)\\), the signs the wrong way round. Expanding gives \\(4x^{2} + 4x − 8\\), not the original."
      },
      {
        "text": "\\(4(x − 2)(x + 1)\\)",
        "correct": true,
        "feedback": "Correct. Take out the common factor \\(4\\): \\(4(x^{2} − x − 2)\\). Then find two numbers that multiply to \\(−2\\) and add to \\(−1\\): \\(−2\\) and \\(1\\). The answer is \\(4(x − 2)(x + 1)\\)."
      },
      {
        "text": "\\((4x − 8)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((4x − 8)(x + 1)\\), multiplying the \\(4\\) into one bracket only. This is correct but not fully factorised, because \\(4x − 8\\) still has the common factor \\(4\\)."
      },
      {
        "text": "\\(4(x^{2} − x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\(4(x^{2} − x − 2)\\), taking out the \\(4\\) but stopping there. The bracket is a quadratic that factorises again."
      }
    ],
    "backward": "Taking out a common factor, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you combine a common factor with a difference of two squares or a perfect square."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "How many terms does \\((x − 3)(x − 1)(x + 3)\\) have after it is expanded and like terms are collected?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), by counting only six of the eight products. After collecting, the answer has fewer terms."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), by counting the \\(2 × 2 × 2 = 8\\) products before collecting like terms. After collecting, fewer terms remain."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. The expansion collects to \\(x^{3} − x^{2} − 9x + 9\\), which has \\(4\\) terms."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), by counting the brackets. The number of terms comes from the expanded and collected answer."
      }
    ],
    "backward": "Collecting like terms after expanding, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use the shape of an expansion to check a factorisation."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Exactly one of these equations is true for every value of \\(x\\). Which one?",
    "options": [
      {
        "text": "\\((x + 6)^{2} = x^{2} + 36\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{2} = x^{2} + 36\\), but it is not an identity: the middle term \\(2ax\\) is missing."
      },
      {
        "text": "\\((x − 6)^{2} = x^{2} − 12x + 36\\)",
        "correct": true,
        "feedback": "Correct. \\((x − 6)^{2} = x^{2} − 12x + 36\\) is true for every value of \\(x\\) because the right side is the full expansion of the left side. The other three have a term missing or the wrong sign."
      },
      {
        "text": "\\((x + 6)^{3} = x^{3} + 216\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{3} = x^{3} + 216\\), but it is not an identity: cubing a bracket gives two extra middle terms."
      },
      {
        "text": "\\((x − 6)(x + 6) = x^{2} − 12x + 36\\)",
        "correct": false,
        "feedback": "Chose \\((x − 6)(x + 6) = x^{2} − 12x + 36\\), but it is not an identity: the middle terms cancel, so there is no \\(x\\) term."
      }
    ],
    "backward": "Testing an equation with a value, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet identities that look like equations but hold for every value."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "Which expression below is a difference of two squares?",
    "options": [
      {
        "text": "\\(x^{2} − 20\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 20\\), but \\(20\\) is not a perfect square, so this is not a difference of two squares."
      },
      {
        "text": "\\(25x^{2} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(25x^{2} + 4\\), but it is a sum of two squares, not a difference. A difference of two squares has a minus sign between the squares."
      },
      {
        "text": "\\(25x^{2} − 20x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(25x^{2} − 20x + 4\\), but it has three terms. A difference of two squares has exactly two terms."
      },
      {
        "text": "\\(25x^{2} − 4\\)",
        "correct": true,
        "feedback": "Correct. \\(25x^{2} − 4 = (5x)^{2} − 2^{2}\\), one square minus another square, so it is a difference of two squares."
      }
    ],
    "backward": "Recognising square numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise any difference of two squares as \\((a − b)(a + b)\\)."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "Divide \\(x^{3} + x^{2} − 15x − 12\\) by \\((x + 4)\\). What is the quotient?",
    "options": [
      {
        "text": "\\(x^{2} − 3x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 3x + 3\\), by the wrong constant term in the quotient. Multiplying back by the divisor does not return the original polynomial."
      },
      {
        "text": "\\(x^{2} − 3x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 3x − 2\\), by a slip with the last coefficient. Multiplying the answer by the divisor should give the original polynomial back; here it does not."
      },
      {
        "text": "\\(x^{2} + 5x + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 5x + 5\\), by dividing by \\((x − 4)\\) instead of \\((x + 4)\\). Check by multiplying back: \\((x + 4) × (x^{2} + 5x + 5)\\) does not give \\(x^{3} + x^{2} − 15x − 12\\)."
      },
      {
        "text": "\\(x^{2} − 3x − 3\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{3} + x^{2} − 15x − 12 = (x + 4)(x^{2} − 3x − 3)\\), so the quotient is \\(x^{2} − 3x − 3\\). Check: expanding \\((x + 4)(x^{2} − 3x − 3)\\) gives \\(x^{3} + x^{2} − 15x − 12\\)."
      }
    ],
    "backward": "Long division of numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use division to factorise a cubic once one factor is known."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "What is the degree of the polynomial \\(7x^{2}y^{4} + 7x^{3} − 2\\)?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), adding the powers of every term. The degree is the largest total in a single term, \\(6\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), which is the power of \\(x\\) in the top term only. Both letters count: \\(2 + 4 = 6\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. In a term with two letters, add the powers. The term with the largest total is \\(7x^{2}y^{4}\\), with \\(2 + 4 = 6\\), so the degree is \\(6\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), which is the largest single power. In more than one letter the degree adds the powers in one term: \\(2 + 4 = 6\\)."
      }
    ],
    "backward": "Adding powers when you multiply, from the laws of indices (Ch1).",
    "forward": "Later in this chapter you add powers in the same way when you expand products with two letters."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Polynomial basics and substitution",
    "question": "Find the value of \\(5x^{3} − 2x^{2} − 4x\\) when \\(x = −2\\).",
    "options": [
      {
        "text": "\\(−14\\)",
        "correct": false,
        "feedback": "Chose \\(−14\\), by reading \\(x^{3}\\) as \\(3x\\), so \\((−2)^{3}\\) became \\(3 × (−2) = −6\\). A power means repeated multiplication: \\((−2)^{3} = −8\\)."
      },
      {
        "text": "\\(−40\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(x = −2\\) into every term: \\(5(−2)^{3} − 2(−2)^{2} − 4(−2) = −40\\)."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Chose \\(40\\), by reading \\((−2)^{3}\\) as \\(8\\). A negative number to an odd power stays negative: \\((−2)^{3} = −8\\)."
      },
      {
        "text": "\\(−24\\)",
        "correct": false,
        "feedback": "Chose \\(−24\\), by reading \\((−2)^{2}\\) as \\(−4\\) for the even powers. A negative number to an even power is positive: \\((−2)^{2} = 4\\)."
      }
    ],
    "backward": "Calculating with negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you substitute negative values when you test whether \\((x + a)\\) is a factor."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "Simplify \\((5x^{2} − 6x − 1) − (x^{2} + 4x − 4)\\).",
    "options": [
      {
        "text": "\\(4x^{2} − 2x − 5\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{2} − 2x − 5\\), by changing the sign of the first term of the second bracket only. The minus in front of the bracket changes every term inside it."
      },
      {
        "text": "\\(4x^{2} − 10x + 3\\)",
        "correct": true,
        "feedback": "Correct. The minus sign changes every term in the second bracket: \\(5 − 1 = 4\\) for \\(x^{2}\\), \\(−6 − 4 = −10\\) for \\(x\\), and \\(−1 − (−4) = 3\\) for the constants."
      },
      {
        "text": "\\(4x^{2} − 10x − 5\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{2} − 10x − 5\\), by changing the signs of the first two terms of the second bracket but not the constant. The minus sign changes all three terms."
      },
      {
        "text": "\\(−4x^{2} + 10x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(−4x^{2} + 10x − 3\\), by subtracting in the wrong order. The first polynomial comes first: (first) − (second)."
      }
    ],
    "backward": "Subtracting a bracket, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you need the same care with signs when you expand a bracket that follows a minus."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Collecting and expanding",
    "question": "A rectangle has length \\((x + 2)\\) cm and width \\((x − 4)\\) cm. Which expression gives its area in cm²?",
    "options": [
      {
        "text": "\\(x^{2} − 2x − 8\\)",
        "correct": true,
        "feedback": "Correct. Area = length times width = \\((x + 2)(x − 4) = x^{2} − 4x + 2x − 8 = x^{2} − 2x − 8\\) cm²."
      },
      {
        "text": "\\(4x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(4x − 4\\), by adding the length and width and doubling, which is the perimeter. Area is length times width."
      },
      {
        "text": "\\(x^{2} − 2x + 8\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 2x + 8\\), by getting the sign of the last term wrong: \\(2 × (−4) = −8\\)."
      },
      {
        "text": "\\(2x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(2x − 2\\), by adding the length and the width. Area multiplies them."
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
    "question": "Factorise completely \\(2x^{3} − 10x^{2} + 2x\\).",
    "options": [
      {
        "text": "\\(2(x^{3} − 5x^{2} + x)\\)",
        "correct": false,
        "feedback": "Chose \\(2(x^{3} − 5x^{2} + x)\\), taking out only the number \\(2\\). The bracket still has the common factor \\(x\\), so it is not fully factorised."
      },
      {
        "text": "\\(x(2x^{2} − 10x + 2)\\)",
        "correct": false,
        "feedback": "Chose \\(x(2x^{2} − 10x + 2)\\), taking out only \\(x\\). The bracket still has the common factor \\(2\\), so it is not fully factorised."
      },
      {
        "text": "\\(2x(x^{2} − 5x − 1)\\)",
        "correct": false,
        "feedback": "Chose \\(2x(x^{2} − 5x − 1)\\), getting a sign wrong inside the bracket. Expanding gives \\(2x^{3} − 10x^{2} − 2x\\), not the original."
      },
      {
        "text": "\\(2x(x^{2} − 5x + 1)\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor is \\(2x\\). Dividing each term by \\(2x\\) leaves \\(x^{2} − 5x + 1\\), so \\(2x^{3} − 10x^{2} + 2x = 2x(x^{2} − 5x + 1)\\)."
      }
    ],
    "backward": "Common factors of three terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you factorise the quadratic that is left inside the bracket."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Factorising I: common factors, grouping, squares",
    "question": "A rectangle has area \\(2x^{2} + 12x\\) cm² and width \\(2x\\) cm. Which expression gives its length in cm?",
    "options": [
      {
        "text": "\\(x + 12\\)",
        "correct": false,
        "feedback": "Chose \\(x + 12\\), by dividing the first term by \\(2x\\) but the second only by \\(x\\). Divide each term by \\(2x\\)."
      },
      {
        "text": "\\(x + 6\\)",
        "correct": true,
        "feedback": "Correct. Area = length times width, so the length is the area divided by the width. Taking out \\(2x\\) gives \\(2x^{2} + 12x = 2x(x + 6)\\), so the length is \\(x + 6\\) cm."
      },
      {
        "text": "\\(2x + 12\\)",
        "correct": false,
        "feedback": "Chose \\(2x + 12\\), by dividing by \\(x\\) but not by \\(2\\). The width is \\(2x\\), so divide each term by \\(2x\\)."
      },
      {
        "text": "\\(2x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(2x + 6\\), by dividing by \\(x\\) only. The width is \\(2x\\), so each term is divided by \\(2x\\) as well."
      }
    ],
    "backward": "Expanding brackets and common factors, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you meet this idea again when you divide polynomials."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "A rectangle has area \\(x^{2} + 10x + 16\\) cm² and length \\((x + 8)\\) cm. Which expression gives its width in cm?",
    "options": [
      {
        "text": "\\(x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x − 2\\), by getting the sign wrong. Check: \\((x + 8)(x − 2) = x^{2} + 6x − 16\\), not \\(x^{2} + 10x + 16\\)."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} + 10x + 16 = (x + 8)(x + 2)\\), because \\(8 × 2 = 16\\) and \\(8 + 2 = 10\\). The length is \\((x + 8)\\) cm, so the width is \\(x + 2\\) cm."
      },
      {
        "text": "\\(x + 10\\)",
        "correct": false,
        "feedback": "Chose \\(x + 10\\), by using the coefficient \\(10\\) of \\(x\\) as the second number. The number must multiply with \\(8\\) to make \\(16\\)."
      },
      {
        "text": "\\(x + 16\\)",
        "correct": false,
        "feedback": "Chose \\(x + 16\\), by using the constant term \\(16\\) as the second number. It must multiply with \\(8\\) to make \\(16\\), so it is \\(2\\)."
      }
    ],
    "backward": "Writing an area as a product of two lengths, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you use factorising to simplify fractions with quadratics in them."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Factorising quadratics",
    "question": "Factorise \\(x^{2} − 8x − 9\\).",
    "options": [
      {
        "text": "\\((x + 9)(x + 1)\\)",
        "correct": false,
        "feedback": "Chose \\((x + 9)(x + 1)\\), changing the sign of one number. Expanding gives \\(x^{2} + 10x + 9\\), not the original."
      },
      {
        "text": "\\((x − 3)(x + 3)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 3)(x + 3)\\), using \\(−3\\) and \\(3\\), which multiply to \\(−9\\) but add to \\(0\\), not \\(−8\\)."
      },
      {
        "text": "\\((x − 9)(x + 1)\\)",
        "correct": true,
        "feedback": "Correct. Find two numbers that multiply to \\(−9\\) and add to \\(−8\\): \\(−9\\) and \\(1\\). So \\(x^{2} − 8x − 9 = (x − 9)(x + 1)\\)."
      },
      {
        "text": "\\((x − 1)(x + 9)\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)(x + 9)\\), the signs the wrong way round. Expanding gives \\(x^{2} + 8x − 9\\), not the original."
      }
    ],
    "backward": "Adding numbers with different signs, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you factorise mixed-sign quadratics that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Use \\((a − b)(a + b) = a^{2} − b^{2}\\) to work out \\(97 × 103\\) without a calculator.",
    "options": [
      {
        "text": "\\(9991\\)",
        "correct": true,
        "feedback": "Correct. Write \\(97 = 100 − 3\\) and \\(103 = 100 + 3\\). Then \\(97 × 103 = 100^{2} − 3^{2} = 10\\,000 − 9 = 9991\\)."
      },
      {
        "text": "\\(9997\\)",
        "correct": false,
        "feedback": "Chose \\(9997\\), by not squaring \\(3\\). The identity gives \\(100^{2} − 3^{2}\\)."
      },
      {
        "text": "\\(10\\,009\\)",
        "correct": false,
        "feedback": "Chose \\(10\\,009\\), by adding the squares. \\(100^{2} − 3^{2}\\) has a minus sign, because the middle terms cancel."
      },
      {
        "text": "\\(9409\\)",
        "correct": false,
        "feedback": "Chose \\(9409\\), by treating \\(97 × 103\\) as \\(97^{2}\\). The two numbers are different, so the identity is \\(a^{2} − b^{2}\\)."
      }
    ],
    "backward": "Products near a round number, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet the same shortcut written with letters."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Identities",
    "question": "Expand and simplify \\((4x + 3)^{2}\\).",
    "options": [
      {
        "text": "\\(4x^{2} + 24x + 9\\)",
        "correct": false,
        "feedback": "Chose \\(4x^{2} + 24x + 9\\), not squaring the \\(4\\) in the first term. \\((4x)^{2} = 16x^{2}\\)."
      },
      {
        "text": "\\(16x^{2} + 12x + 9\\)",
        "correct": false,
        "feedback": "Chose \\(16x^{2} + 12x + 9\\), using \\(12x\\) for the middle term. The middle term is twice the product, \\(24x\\)."
      },
      {
        "text": "\\(16x^{2} − 24x + 9\\)",
        "correct": false,
        "feedback": "Chose \\(16x^{2} − 24x + 9\\), getting the sign of the middle term wrong. It has the same sign as the term \\(3\\) in the bracket."
      },
      {
        "text": "\\(16x^{2} + 24x + 9\\)",
        "correct": true,
        "feedback": "Correct. Using \\((a + b)^{2} = a^{2} + 2ab + b^{2}\\) with \\(a = 4x\\) and \\(b = 3\\) gives \\(16x^{2} + 24x + 9\\)."
      }
    ],
    "backward": "Squaring a product such as \\(4x\\), from the laws of indices (Ch1).",
    "forward": "Later in this chapter you factorise perfect squares that have a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "\\((x + 1)\\) is a factor of \\(x^{3} + 4x^{2} + kx + 3\\). Find the value of \\(k\\).",
    "options": [
      {
        "text": "\\(−6\\)",
        "correct": false,
        "feedback": "Chose \\(−6\\), by solving \\(−k + 6 = 0\\) with a sign slip, so \\(k = −6\\). Move the number term to the other side and change its sign before dividing."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), by leaving out the number term \\(3\\), so the equation became \\(−k + 3 = 0\\). The whole polynomial must equal zero."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. Since \\((x + 1)\\) is a factor, \\(f(−1) = 0\\). Substituting \\(x = −1\\) gives \\(−k + 6 = 0\\), so \\(k = 6\\)."
      },
      {
        "text": "\\(−8\\)",
        "correct": false,
        "feedback": "Chose \\(−8\\), by substituting \\(x = 1\\). The factor \\((x + 1)\\) is zero when \\(x = −1\\)."
      }
    ],
    "backward": "Substituting into a polynomial and solving for a letter (earlier in this chapter).",
    "forward": "Later in this chapter you use two conditions at once to find two unknown coefficients."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Remainder and factor theorems",
    "question": "A box has volume \\(x^{3} + 5x^{2} + 7x + 3\\) cm³ and height \\((x + 1)\\) cm. Which expression gives the area of its base in cm²?",
    "options": [
      {
        "text": "\\(x^{2} + 4x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 4x + 4\\), by adding \\(1\\) to the base area instead of dividing the volume by the height."
      },
      {
        "text": "\\(x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x + 4\\), by adding the two other numbers. The two other brackets are multiplied."
      },
      {
        "text": "\\(x^{2} + 4x + 3\\)",
        "correct": true,
        "feedback": "Correct. Volume = base area times height, so base area = volume divided by height. \\(x^{3} + 5x^{2} + 7x + 3 = (x + 1)(x + 3)(x + 1)\\), so the base area is \\((x + 3)(x + 1) = x^{2} + 4x + 3\\) cm²."
      },
      {
        "text": "\\(x^{2} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 3\\), by leaving out the middle term when multiplying the two brackets."
      }
    ],
    "backward": "Multiplying three algebraic lengths, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you use the same idea to find a missing dimension from a polynomial volume."
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
  title: "Polynomials, Identities and Factorising — Core Fluency",
  subtitle: "Grade 9 · Level 1 · Core Fluency",
  description: "Polynomial basics and substitution, collecting and expanding, factorising, the standard identities, and the remainder and factor theorems — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: polynomial terms and degree, substituting values, collecting and expanding, factorising, the standard identities, and the remainder and factor theorems. No calculator is needed. For each question, ask yourself first what kind of expression you are looking at, then work it out on paper before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

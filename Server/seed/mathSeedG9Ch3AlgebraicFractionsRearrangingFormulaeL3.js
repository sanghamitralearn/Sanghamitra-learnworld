// Algebraic Fractions and Rearranging Formulae — Grade 9, Level 3 (Synthesis).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch03-algebraic-fractions-rearranging-formulae-level-3.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch3AlgebraicFractionsRearrangingFormulaeL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-3-algebraic-fractions-rearranging-formulae";
const CHAPTER_NAME = "Algebraic Fractions and Rearranging Formulae";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "C1": "Simplifying algebraic fractions",
  "C2": "Multiplying and dividing algebraic fractions",
  "C3": "Adding and subtracting algebraic fractions",
  "C4": "Completing the square",
  "C5": "Changing the subject I",
  "C6": "Changing the subject II"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x^{2} + x − 42}{x^{2} + 10x + 21}\\).",
    "options": [
      {
        "text": "\\(\\frac{(x + 7)(x − 6)}{(x + 7)(x + 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 7)(x − 6)}{(x + 7)(x + 3)}\\), factorising correctly but not cancelling the common factor \\((x + 7)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{x + 6}{x + 3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 6}{x + 3}\\), getting the sign wrong in the bracket that is left on the top. The top factorises as \\((x + 7)(x − 6)\\), so \\((x − 6)\\) is left."
      },
      {
        "text": "\\(\\frac{x + 3}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 3}{x − 6}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{x − 6}{x + 3}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(x^{2} + x − 42 = (x + 7)(x − 6)\\). The bottom factorises: \\(x^{2} + 10x + 21 = (x + 7)(x + 3)\\). The common factor \\((x + 7)\\) cancels from the top and the bottom, leaving \\(\\frac{x − 6}{x + 3}\\)."
      }
    ],
    "retryHint": "Factorise the top and the bottom into two brackets each. Find the bracket they share and cancel it.",
    "backward": "Factorising quadratics with a number in front of \\(x\\) (Ch2).",
    "forward": "Later in this chapter you factorise two quadratics in a row when you multiply fractions."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2} − 4x − 5}{x^{2} − 6x + 8}) × (\\frac{x^{2} − 2x − 8}{x − 5})\\).",
    "options": [
      {
        "text": "\\(x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x + 1\\), getting a sign wrong in the bracket \\((x + 2)\\). The second top factorises as \\((x − 4)(x + 2)\\)."
      },
      {
        "text": "\\(\\frac{(x + 1)(x + 2)}{x − 2}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} − 4x − 5 = (x + 1)(x − 5)\\); \\(x^{2} − 6x + 8 = (x − 4)(x − 2)\\); \\(x^{2} − 2x − 8 = (x − 4)(x + 2)\\). Multiply across: \\(\\frac{(x + 1)(x − 5)(x − 4)(x + 2)}{(x − 4)(x − 2)(x − 5)}\\). Then cancel the common factors to get \\(\\frac{(x + 1)(x + 2)}{x − 2}\\)."
      },
      {
        "text": "\\(\\frac{x + 1}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 1}{x − 2}\\), losing the bracket \\((x + 2)\\). Only \\((x − 5)\\) and \\((x − 4)\\) cancel; \\((x + 2)\\) is still on the top."
      },
      {
        "text": "\\(\\frac{(x + 1)(x − 5)(x − 4)(x + 2)}{(x − 4)(x − 2)(x − 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 1)(x − 5)(x − 4)(x + 2)}{(x − 4)(x − 2)(x − 5)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      }
    ],
    "retryHint": "Factorise every top and bottom into brackets, then cancel any bracket that is on a top and on a bottom.",
    "backward": "Factorising two quadratics (Ch2).",
    "forward": "Later in this chapter you use this in a division of two quadratic fractions."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x − 3}{x − 6} − \\frac{x + 1}{x + 4}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{−4x − 18}{(x − 6)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−4x − 18}{(x − 6)(x + 4)}\\), subtracting only the first term of \\(x^{2} − 5x − 6\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(\\frac{6x − 6}{(x − 6)(x + 4)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 6)(x + 4)\\). Rewrite both fractions over it: the first top is multiplied by \\((x + 4)\\) and the second top is multiplied by \\((x − 6)\\). Then subtract the tops, taking care with every sign: \\(\\frac{6x − 6}{(x − 6)(x + 4)}\\)."
      },
      {
        "text": "\\(\\frac{x^{2} − 13}{(x − 6)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} − 13}{(x − 6)(x + 4)}\\), multiplying the first top by \\((x + 4)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(−\\frac{4}{(x − 6)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{4}{(x − 6)(x + 4)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      }
    ],
    "retryHint": "Make the common denominator from both bottoms. Multiply out each top carefully, then subtract, keeping the minus sign with every term.",
    "backward": "Expanding brackets (Ch2).",
    "forward": "Later in this chapter you use this when you rearrange a formula that has a fraction on both sides."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(5x^{2} − 20x − 2\\) in the form \\(a(x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\(5(x − 2)^{2} − 22\\)",
        "correct": true,
        "feedback": "Correct. Take out \\(5\\): \\(5x^{2} − 20x − 2 = 5(x^{2} − 4x) − 2\\). Half of \\(−4\\) is \\(−2\\), so \\((x − 2)^{2}\\) gives \\(x^{2} − 4x + 4\\), an extra \\(4\\) inside the bracket, which is \\(20\\) once the \\(5\\) is multiplied in. So \\(5x^{2} − 20x − 2 = 5(x − 2)^{2} − 22\\)."
      },
      {
        "text": "\\(5(x − 10)^{2} − 102\\)",
        "correct": false,
        "feedback": "Chose \\(5(x − 10)^{2} − 102\\), halving \\(−20\\) to get \\(−10\\). The \\(5\\) in front of \\(x^{2}\\) must be taken out first: \\(5x^{2} − 20x = 5(x^{2} − 4x)\\), and half of \\(−4\\) is \\(−2\\). Expanding gives \\(5x^{2} − 100x + 398\\), not the original."
      },
      {
        "text": "\\(5(x − 2)^{2} + 18\\)",
        "correct": false,
        "feedback": "Chose \\(5(x − 2)^{2} + 18\\), adding \\(20\\) instead of subtracting it. The square gives an extra \\(20\\), which must be taken away. Expanding gives \\(5x^{2} − 20x + 38\\), not the original."
      },
      {
        "text": "\\(5(x − 2)^{2} − 6\\)",
        "correct": false,
        "feedback": "Chose \\(5(x − 2)^{2} − 6\\), subtracting \\(4\\) instead of \\(20\\). The bracket is multiplied by \\(5\\), so \\(5 × 4 = 20\\) must be taken away. Expanding gives \\(5x^{2} − 20x + 14\\), not the original."
      }
    ],
    "retryHint": "Take the number in front of \\(x^{2}\\) out of the first two terms only. Complete the square inside the bracket, then fix the constant.",
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you find the least value of expressions with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{3x − 2}{7}\\).",
    "options": [
      {
        "text": "\\(x = 7y + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x = 7y + 2\\), forgetting to divide by \\(3\\). After taking \\(−2\\) away, \\(7y + 2 = 3x\\)."
      },
      {
        "text": "\\(x = \\frac{7y − 2}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{7y − 2}{3}\\), getting the sign wrong. After multiplying by \\(7\\), \\(7y = 3x − 2\\), so \\(2\\) is added."
      },
      {
        "text": "\\(x = \\frac{7y + 2}{3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(7\\): \\(7y = 3x − 2\\). Add \\(2\\): \\(7y + 2 = 3x\\). Divide by \\(3\\): \\(x = \\frac{7y + 2}{3}\\)."
      },
      {
        "text": "\\(x = \\frac{7y}{3} + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{7y}{3} + 2\\), dividing only \\(7y\\) by \\(3\\). The whole of \\(7y + 2\\) must be divided by \\(3\\)."
      }
    ],
    "retryHint": "Multiply both sides to clear the fraction. Then add or subtract, and divide by the number in front of \\(x\\).",
    "backward": "Fractions, from Stage 9 (S9-Ch8) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject is under a power or a root."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = 5x^{2} − 5\\), where \\(x\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{y + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y + 5}\\), forgetting to divide by \\(5\\). After adding \\(5\\), \\(x^{2} = \\frac{y + 5}{5}\\)."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y + 5}{5}}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(5\\) on both sides: \\(y + 5 = 5x^{2}\\). Divide by \\(5\\): \\(x^{2} = \\frac{y + 5}{5}\\). Take the positive square root: \\(x = \\sqrt{\\frac{y + 5}{5}}\\)."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y}{5}} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{\\frac{y}{5}} + 5\\), dividing only \\(y\\) by \\(5\\) and moving \\(5\\) outside the root. The whole of \\(y + 5\\) is divided by \\(5\\) inside the root."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y − 5}{5}}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{\\frac{y − 5}{5}}\\), getting the sign wrong. To undo − \\(5\\), do the opposite: add \\(5\\)."
      }
    ],
    "retryHint": "Add or subtract first so that \\(x^{2}\\) is on its own. Then divide, and take the square root last.",
    "backward": "Square roots (Ch1) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "In a later chapter you solve equations of the form \\(ax^{2} + b = c\\)."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify fully \\(\\frac{2x^{2} − 4x}{x^{2} − 5x + 6}\\).",
    "options": [
      {
        "text": "\\(\\frac{x − 3}{2x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 3}{2x}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{2x(x − 2)}{(x − 2)(x − 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x(x − 2)}{(x − 2)(x − 3)}\\), factorising correctly but not cancelling the common factor \\((x − 2)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{2x}{x − 3}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(2x^{2} − 4x = 2x(x − 2)\\). The bottom factorises: \\(x^{2} − 5x + 6 = (x − 2)(x − 3)\\). The common factor \\((x − 2)\\) cancels from the top and the bottom, leaving \\(\\frac{2x}{x − 3}\\)."
      },
      {
        "text": "\\(\\frac{x}{x − 3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x}{x − 3}\\), forgetting the common factor \\(2\\), which stays on the top."
      }
    ],
    "retryHint": "Take the common factor out of the top first. Then factorise the quadratic on the bottom and cancel the shared bracket.",
    "backward": "Taking out a common factor, then factorising a quadratic (Ch2).",
    "forward": "Later in this chapter you need the same two-stage factorising to find a common denominator."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{5}{x − 4}\\).",
    "options": [
      {
        "text": "\\(x = \\frac{5}{y} + 4\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\((x − 4)\\): \\(y(x − 4) = 5\\). Divide both sides by \\(y\\): \\(x − 4 = \\frac{5}{y}\\). Then add \\(4\\): \\(x = \\frac{5}{y} + 4\\)."
      },
      {
        "text": "\\(x = \\frac{5 + 4}{y}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{5 + 4}{y}\\), moving \\(4\\) only on the top. After multiplying out, \\(x − 4 = \\frac{5}{y}\\), so \\(4\\) is moved from the whole fraction."
      },
      {
        "text": "\\(x = \\frac{5}{y} − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{5}{y} − 4\\), getting the sign wrong. From \\(y(x − 4) = 5\\), \\(x − 4 = \\frac{5}{y}\\), so \\(4\\) is added at the end."
      },
      {
        "text": "\\(x = \\frac{y}{5} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{5} + 4\\), turning the fraction upside down. The equation gives \\(x − 4 = \\frac{5}{y}\\), not \\(\\frac{y}{5}\\)."
      }
    ],
    "retryHint": "Multiply both sides by the bracket on the bottom. Divide by \\(y\\), then add or subtract the number.",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (reciprocals) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject appears twice."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{3x^{2} − 7x + 4}{6x^{2} − 11x + 4}\\).",
    "options": [
      {
        "text": "\\(x − 1\\)",
        "correct": false,
        "feedback": "Chose \\(x − 1\\), dropping the bracket \\((2x − 1)\\) that is left on the bottom after cancelling."
      },
      {
        "text": "\\(\\frac{2x − 1}{x − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 1}{x − 1}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{x − 1}{2x − 1}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(3x^{2} − 7x + 4 = (3x − 4)(x − 1)\\). The bottom factorises: \\(6x^{2} − 11x + 4 = (3x − 4)(2x − 1)\\). The common factor \\((3x − 4)\\) cancels from the top and the bottom, leaving \\(\\frac{x − 1}{2x − 1}\\)."
      },
      {
        "text": "\\(\\frac{x + 1}{2x − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 1}{2x − 1}\\), getting the sign wrong in the bracket that is left on the top. The top factorises as \\((3x − 4)(x − 1)\\), so \\((x − 1)\\) is left."
      }
    ],
    "backward": "Factorising a quadratic with a number in front of \\(x^{2}\\) (Ch2).",
    "forward": "Later in this chapter you use these harder factorisations when you divide fractions."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{2x − 6}{x − 6}) ÷ (\\frac{5x − 15}{x + 1})\\).",
    "options": [
      {
        "text": "\\(\\frac{2(x + 1)}{5(x − 6)}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(2x − 6 = 2(x − 3)\\); \\(5x − 15 = 5(x − 3)\\). Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{2(x − 3)(x + 1)}{5(x − 6)(x − 3)}\\). Then cancel the common factors to get \\(\\frac{2(x + 1)}{5(x − 6)}\\)."
      },
      {
        "text": "\\(\\frac{2(x − 3)(x + 1)}{5(x − 6)(x − 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2(x − 3)(x + 1)}{5(x − 6)(x − 3)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{2(x − 6)}{5(x + 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2(x − 6)}{5(x + 1)}\\), flipping only the brackets and not the numbers. The second fraction turned upside down is \\(\\frac{x + 1}{5(x − 3)}\\)."
      },
      {
        "text": "\\(\\frac{10(x − 3)^{2}}{(x − 6)(x + 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{10(x − 3)^{2}}{(x − 6)(x + 1)}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      }
    ],
    "backward": "Taking out a common factor and factorising a quadratic (Ch2).",
    "forward": "Later in this chapter you use this when you simplify before you add fractions."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{7}{x^{2} − 36} + \\frac{5}{x − 6}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{12}{(x − 6)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{12}{(x − 6)(x + 6)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{5x + 37}{(x − 6)(x + 6)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 6)(x + 6)\\). Rewrite both fractions over it: the second top is multiplied by \\((x + 6)\\). Then add the tops: \\(\\frac{5x + 37}{(x − 6)(x + 6)}\\)."
      },
      {
        "text": "\\(\\frac{5x^{2} + 7x − 222}{(x^{2} − 36)(x − 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x^{2} + 7x − 222}{(x^{2} − 36)(x − 6)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\((x − 6)(x + 6)\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{5x − 23}{(x − 6)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x − 23}{(x − 6)(x + 6)}\\), multiplying the second top by \\((x − 6)\\) instead of \\((x + 6)\\). The factor missing from its bottom is \\((x + 6)\\), with the sign it has in the other bottom."
      }
    ],
    "backward": "The difference of two squares (Ch2).",
    "forward": "Later in this chapter you use a shorter common denominator in the harder fractions."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(4x^{2} − 16x − 9\\) in the form \\(a(x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\(4(x − 2)^{2} + 7\\)",
        "correct": false,
        "feedback": "Chose \\(4(x − 2)^{2} + 7\\), adding \\(16\\) instead of subtracting it. The square gives an extra \\(16\\), which must be taken away. Expanding gives \\(4x^{2} − 16x + 23\\), not the original."
      },
      {
        "text": "\\(4(x + 2)^{2} − 25\\)",
        "correct": false,
        "feedback": "Chose \\(4(x + 2)^{2} − 25\\), getting the sign of the number in the bracket wrong. The bracket is \\((x − 2)\\). Expanding gives \\(4x^{2} + 16x − 9\\), not the original."
      },
      {
        "text": "\\(4(x − 2)^{2} − 25\\)",
        "correct": true,
        "feedback": "Correct. Take out \\(4\\): \\(4x^{2} − 16x − 9 = 4(x^{2} − 4x) − 9\\). Half of \\(−4\\) is \\(−2\\), so \\((x − 2)^{2}\\) gives \\(x^{2} − 4x + 4\\), an extra \\(4\\) inside the bracket, which is \\(16\\) once the \\(4\\) is multiplied in. So \\(4x^{2} − 16x − 9 = 4(x − 2)^{2} − 25\\)."
      },
      {
        "text": "\\(4(x − 2)^{2} − 13\\)",
        "correct": false,
        "feedback": "Chose \\(4(x − 2)^{2} − 13\\), subtracting \\(4\\) instead of \\(16\\). The bracket is multiplied by \\(4\\), so \\(4 × 4 = 16\\) must be taken away. Expanding gives \\(4x^{2} − 16x + 3\\), not the original."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you find the least value of expressions with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Temperatures in degrees Fahrenheit and Celsius are linked by \\(C = \\frac{5(F − 32)}{9}\\). Make \\(F\\) the subject.",
    "options": [
      {
        "text": "\\(F = \\frac{5C}{9} + 32\\)",
        "correct": false,
        "feedback": "Chose \\(F = \\frac{5C}{9} + 32\\), dividing by \\(9\\) instead of multiplying by \\(9\\) (and multiplying by \\(5\\)). Multiply both sides by \\(9\\), then divide by \\(5\\)."
      },
      {
        "text": "\\(F = \\frac{9C}{5} + 32\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(9\\): \\(9C = 5(F − 32)\\). Divide both sides by \\(5\\): \\(\\frac{9C}{5} = F − 32\\). Add \\(32\\): \\(F = \\frac{9C}{5} + 32\\)."
      },
      {
        "text": "\\(F = \\frac{9C + 32}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(F = \\frac{9C + 32}{5}\\), adding \\(32\\) before dividing by \\(5\\). The \\(32\\) belongs to \\(F\\), not to \\(9C\\), so divide by \\(5\\) first."
      },
      {
        "text": "\\(F = \\frac{9C}{5 + 32}\\)",
        "correct": false,
        "feedback": "Chose \\(F = \\frac{9C}{5 + 32}\\), adding \\(32\\) to the \\(5\\). The \\(32\\) is added to \\(F\\) after dividing, not added to the denominator."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae) and fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you convert between temperature scales using the rearranged formula."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The time for one swing of a pendulum of length \\(l\\) is \\(T = 2\\pi\\sqrt{\\frac{l}{g}}\\). Make \\(l\\) the subject.",
    "options": [
      {
        "text": "\\(l = \\frac{gT}{2\\pi}\\)",
        "correct": false,
        "feedback": "Chose \\(l = \\frac{gT}{2\\pi}\\), forgetting to square. To undo the square root, square both sides, which gives \\(T^{2}\\)."
      },
      {
        "text": "\\(l = gT^{2} − 4\\pi^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(l = gT^{2} − 4\\pi^{2}\\), subtracting \\(4\\pi^{2}\\). The \\(4\\pi^{2}\\) multiplies \\(\\frac{l}{g}\\), so it is undone by dividing."
      },
      {
        "text": "\\(l = \\frac{gT^{2}}{4\\pi^{2}}\\)",
        "correct": true,
        "feedback": "Correct. Divide by \\(2\\pi\\): \\(\\frac{T}{2\\pi} = \\sqrt{\\frac{l}{g}}\\). Square both sides: \\(\\frac{T^{2}}{4\\pi^{2}} = \\frac{l}{g}\\). Multiply by \\(g\\): \\(l = \\frac{gT^{2}}{4\\pi^{2}}\\)."
      },
      {
        "text": "\\(l = \\frac{T^{2}}{4\\pi^{2}g}\\)",
        "correct": false,
        "feedback": "Chose \\(l = \\frac{T^{2}}{4\\pi^{2}g}\\), putting \\(g\\) on the bottom. The equation has \\(\\frac{l}{g}\\), so multiplying by \\(g\\) puts \\(g\\) on the top."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you rearrange formulae with roots in science problems."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify fully \\(\\frac{3x^{2} − 48}{x^{2} + 3x − 4}\\).",
    "options": [
      {
        "text": "\\(\\frac{3(x + 4)}{x − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3(x + 4)}{x − 1}\\), getting the sign wrong in the bracket that is left. The factors of \\(x^{2} − 16\\) are \\((x − 4)\\) and \\((x + 4)\\); after cancelling \\((x + 4)\\), \\((x − 4)\\) is left."
      },
      {
        "text": "\\(\\frac{x − 4}{x − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{x − 1}\\), forgetting the common factor \\(3\\). The top is \\(3x^{2} − 48 = 3(x^{2} − 16)\\), so the \\(3\\) stays on the top."
      },
      {
        "text": "\\(\\frac{3(x − 4)(x + 4)}{(x + 4)(x − 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3(x − 4)(x + 4)}{(x + 4)(x − 1)}\\), factorising correctly but not cancelling the common factor \\((x + 4)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{3(x − 4)}{x − 1}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(3x^{2} − 48 = 3(x − 4)(x + 4)\\). The bottom factorises: \\(x^{2} + 3x − 4 = (x + 4)(x − 1)\\). The common factor \\((x + 4)\\) cancels from the top and the bottom, leaving \\(\\frac{3(x − 4)}{x − 1}\\)."
      }
    ],
    "backward": "A common factor and the difference of two squares (Ch2).",
    "forward": "Later in this chapter you combine factorising with cancelling in the middle of a longer multiplication."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2} + 7x + 6}{x^{2} − 8x + 15}) × (\\frac{x^{2} + 2x − 15}{x + 1})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x + 5)(x + 6)}{x − 5}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} + 7x + 6 = (x + 6)(x + 1)\\); \\(x^{2} − 8x + 15 = (x − 3)(x − 5)\\); \\(x^{2} + 2x − 15 = (x − 3)(x + 5)\\). Multiply across: \\(\\frac{(x + 6)(x + 1)(x − 3)(x + 5)}{(x − 3)(x − 5)(x + 1)}\\). Then cancel the common factors to get \\(\\frac{(x + 5)(x + 6)}{x − 5}\\)."
      },
      {
        "text": "\\(\\frac{(x + 6)(x + 1)(x − 3)(x + 5)}{(x − 3)(x − 5)(x + 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 6)(x + 1)(x − 3)(x + 5)}{(x − 3)(x − 5)(x + 1)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x + 6}{x − 5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 6}{x − 5}\\), losing the bracket \\((x + 5)\\). Only \\((x + 1)\\) and \\((x − 3)\\) cancel; \\((x + 5)\\) is still on the top."
      },
      {
        "text": "\\(\\frac{x − 5}{(x + 5)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 5}{(x + 5)(x + 6)}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      }
    ],
    "backward": "Factorising two quadratics (Ch2).",
    "forward": "Later in this chapter you use this in a division of two quadratic fractions."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{1}{4x + 20} − \\frac{5}{x + 5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(−\\frac{19}{4(x + 5)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(4(x + 5)\\). Rewrite both fractions over it: the second top is multiplied by \\(4\\). Then subtract the tops, taking care with every sign: \\(−\\frac{19}{4(x + 5)}\\)."
      },
      {
        "text": "\\(−\\frac{4}{3x + 15}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{4}{3x + 15}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(−\\frac{4}{4(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{4}{4(x + 5)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{−19x − 95}{(4x + 20)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−19x − 95}{(4x + 20)(x + 5)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(4(x + 5)\\), exists, so the answer is not fully simplified."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you simplify a bottom before you look for the common denominator."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "What is the minimum value of \\(5x^{2} + 30x − 2\\)?",
    "options": [
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "Chose \\(43\\), adding \\(45\\) instead of subtracting it. The square has an extra \\(45\\), which must be taken away."
      },
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), the value of \\(x\\) where the minimum occurs. The question asks for the minimum value of the expression."
      },
      {
        "text": "\\(−2\\)",
        "correct": false,
        "feedback": "Chose \\(−2\\), the constant term. The minimum value is the number added after the completed square."
      },
      {
        "text": "\\(−47\\)",
        "correct": true,
        "feedback": "Correct. \\(5x^{2} + 30x − 2 = 5(x + 3)^{2} − 47\\). The bracket squared is never negative, so the least value is the number added at the end, \\(−47\\), when \\(x = −3\\)."
      }
    ],
    "backward": "Completing the square (earlier in this chapter) and squares never being negative.",
    "forward": "In a later chapter you find turning points of curves in the same way."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The area of a trapezium is \\(A = \\frac{(a + b)h}{2}\\). Make \\(a\\) the subject.",
    "options": [
      {
        "text": "\\(a = \\frac{2A − b}{h}\\)",
        "correct": false,
        "feedback": "Chose \\(a = \\frac{2A − b}{h}\\), subtracting \\(b\\) before dividing by \\(h\\). The \\(b\\) is inside the bracket with \\(a\\), so divide by \\(h\\) first."
      },
      {
        "text": "\\(a = \\frac{2A}{h} − b\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2A = (a + b)h\\). Divide both sides by \\(h\\): \\(\\frac{2A}{h} = a + b\\). Subtract \\(b\\): \\(a = \\frac{2A}{h} − b\\)."
      },
      {
        "text": "\\(a = \\frac{2A}{h} + b\\)",
        "correct": false,
        "feedback": "Chose \\(a = \\frac{2A}{h} + b\\), getting the sign wrong. After \\(\\frac{2A}{h} = a + b\\), subtract \\(b\\) from both sides."
      },
      {
        "text": "\\(a = \\frac{A}{2h} − b\\)",
        "correct": false,
        "feedback": "Chose \\(a = \\frac{A}{2h} − b\\), dividing by \\(2\\) instead of multiplying by \\(2\\). The \\(2\\) is under the fraction."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (area of a trapezium).",
    "forward": "In a later chapter you use the area of a trapezium when you find areas of compound shapes."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(ax + b = cx + d\\).",
    "options": [
      {
        "text": "\\(x = \\frac{d − b}{a + c}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{d − b}{a + c}\\), adding the \\(x\\) terms. \\(ax\\) and \\(cx\\) are on opposite sides, so \\(cx\\) is subtracted from both sides, which gives \\((a − c)x\\)."
      },
      {
        "text": "\\(x = \\frac{b − d}{a − c}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{b − d}{a − c}\\), getting the signs wrong when moving terms across. Subtracting \\(cx\\) and \\(b\\) from both sides gives \\(ax − cx = d − b\\)."
      },
      {
        "text": "\\(x = \\frac{d + b}{a − c}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{d + b}{a − c}\\), adding \\(b\\) to the right instead of subtracting it. To move +\\(b\\) to the right, subtract it from both sides."
      },
      {
        "text": "\\(x = \\frac{d − b}{a − c}\\)",
        "correct": true,
        "feedback": "Correct. Collect the \\(x\\) terms on one side and the other terms on the other: \\(ax − cx = d − b\\). Factorise: \\(x(a − c) = d − b\\). Divide by \\((a − c)\\): \\(x = \\frac{d − b}{a − c}\\)."
      }
    ],
    "backward": "Factorising by taking out a common factor (Ch2).",
    "forward": "In a later chapter you use this when you solve simultaneous equations by rearranging."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x^{2} − 4x − 12}{6 − x}\\).",
    "options": [
      {
        "text": "\\(−(x + 2)\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(x^{2} − 4x − 12 = (x − 6)(x + 2)\\). The bottom is the opposite of \\((x − 6)\\): \\(6 − x = −(x − 6)\\). Cancel \\((x − 6)\\), which leaves a minus sign: the answer is \\(−(x + 2)\\)."
      },
      {
        "text": "\\(\\frac{(x − 6)(x + 2)}{6 − x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 6)(x + 2)}{6 − x}\\), factorising the top but not cancelling. The factor \\((x − 6)\\) is on the top, and \\(6 − x\\) is its opposite, so they cancel with a minus sign. The fraction is not fully simplified."
      },
      {
        "text": "\\(−(x − 2)\\)",
        "correct": false,
        "feedback": "Chose \\(−(x − 2)\\), getting the sign wrong in the bracket that is left. The top factorises as \\((x − 6)(x + 2)\\), so \\((x + 2)\\) is left."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), ignoring the sign. The bottom is \\(6 − x\\), which is \\(−(x − 6)\\), the opposite of \\((x − 6)\\), so cancelling leaves a minus sign."
      }
    ],
    "backward": "Factorising a quadratic and negative signs in brackets (Ch2).",
    "forward": "Later in this chapter you meet the same reversed bracket when you find a common denominator."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "To divide by \\(\\frac{x + 2}{x + 4}\\), what do you multiply by?",
    "options": [
      {
        "text": "\\(\\frac{x + 2}{x + 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 2}{x + 4}\\), which leaves the fraction unchanged. Dividing by a fraction means multiplying by its reciprocal, so the top and bottom must swap places."
      },
      {
        "text": "\\(−\\frac{x + 4}{x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{x + 4}{x + 2}\\), which has an extra minus sign. The reciprocal of a fraction has the same sign as the fraction."
      },
      {
        "text": "\\(\\frac{x + 4}{x + 2}\\)",
        "correct": true,
        "feedback": "Correct. The reciprocal of \\(\\frac{x + 2}{x + 4}\\) is \\(\\frac{x + 4}{x + 2}\\): the top and the bottom swap places and nothing else changes. Dividing by \\(\\frac{x + 2}{x + 4}\\) is the same as multiplying by this reciprocal."
      },
      {
        "text": "\\(\\frac{x − 4}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{x − 2}\\), which swaps the top and bottom but also changes the signs inside the brackets. The reciprocal swaps the two expressions and keeps each one unchanged."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you spot, without working it out, what a division needs before it can be cancelled."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x − 5}{x − 3} − \\frac{x + 3}{x + 5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(−\\frac{34}{(x − 3)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{34}{(x − 3)(x + 5)}\\), subtracting only the first term of \\(x^{2} − 9\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(\\frac{x^{2} − x − 28}{(x − 3)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} − x − 28}{(x − 3)(x + 5)}\\), multiplying the first top by \\((x + 5)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(−\\frac{16}{(x − 3)(x + 5)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 3)(x + 5)\\). Rewrite both fractions over it: the first top is multiplied by \\((x + 5)\\) and the second top is multiplied by \\((x − 3)\\). Then subtract the tops, taking care with every sign: \\(−\\frac{16}{(x − 3)(x + 5)}\\)."
      },
      {
        "text": "\\(−\\frac{8}{(x − 3)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{8}{(x − 3)(x + 5)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      }
    ],
    "backward": "Expanding brackets (Ch2).",
    "forward": "Later in this chapter you use this when you rearrange a formula that has a fraction on both sides."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "What is the maximum value of \\(−x^{2} + 4x + 3\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(−x^{2} + 4x + 3 = 7 − (x − 2)^{2}\\). The bracket squared is at least \\(0\\), so \\(7 − (x − 2)^{2}\\) is at most \\(7\\). The maximum value is \\(7\\), when \\(x = 2\\)."
      },
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), subtracting \\(4\\) instead of adding it. \\(−x^{2} + 4x = −(x − 2)^{2} + 4\\), so \\(4\\) is added to \\(3\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), the value of \\(x\\) where the maximum occurs. The question asks for the maximum value of the expression."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), the constant term. The maximum is the constant plus the extra from completing the square."
      }
    ],
    "backward": "Completing the square (earlier in this chapter) and squares never being negative.",
    "forward": "In a later chapter you find the highest point of a curve that opens downwards."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{2}{x − 6}\\).",
    "options": [
      {
        "text": "\\(x = \\frac{2}{y − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2}{y − 6}\\), dividing by \\(y − 6\\). The \\(−6\\) belongs with \\(x\\), not with \\(y\\)."
      },
      {
        "text": "\\(x = \\frac{2}{y} + 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\((x − 6)\\): \\(y(x − 6) = 2\\). Divide both sides by \\(y\\): \\(x − 6 = \\frac{2}{y}\\). Then add \\(6\\): \\(x = \\frac{2}{y} + 6\\)."
      },
      {
        "text": "\\(x = \\frac{2 + 6}{y}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2 + 6}{y}\\), moving \\(6\\) only on the top. After multiplying out, \\(x − 6 = \\frac{2}{y}\\), so \\(6\\) is moved from the whole fraction."
      },
      {
        "text": "\\(x = \\frac{2}{y} − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2}{y} − 6\\), getting the sign wrong. From \\(y(x − 6) = 2\\), \\(x − 6 = \\frac{2}{y}\\), so \\(6\\) is added at the end."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (reciprocals) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject appears twice."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = x^{2} + 6x − 7\\), where \\(x + 3\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{y + 16} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y + 16} + 3\\), getting the sign of the bracket number wrong. After the square root, \\(x + 3 = \\sqrt{y + 16}\\), so \\(3\\) is subtracted."
      },
      {
        "text": "\\(x = \\sqrt{y − 16} − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y − 16} − 3\\), getting the sign of \\(16\\) wrong. After completing the square, \\(y = (x + 3)^{2} − 16\\), so \\(16\\) is added to move it across."
      },
      {
        "text": "\\(x = \\sqrt{y + 16} − 3\\)",
        "correct": true,
        "feedback": "Correct. Complete the square: \\(x^{2} + 6x − 7 = (x + 3)^{2} − 16\\), so \\(y = (x + 3)^{2} − 16\\). Add \\(16\\) on both sides: \\((x + 3)^{2} = y + 16\\). Take the square root, using the positive root: \\(x + 3 = \\sqrt{y + 16}\\). Then subtract \\(3\\): \\(x = \\sqrt{y + 16} − 3\\)."
      },
      {
        "text": "\\(x = \\sqrt{y} + 13\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} + 13\\), taking the square root of \\(y\\) only. The whole of \\(y + 16\\) must be square-rooted."
      }
    ],
    "backward": "Completing the square, earlier in this chapter.",
    "forward": "In a later chapter you use the same two steps to solve quadratics by completing the square."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "A learner simplifies \\(\\frac{x^{2} − 36}{x^{2} + 6x}\\). Step 1: \\(\\frac{x^{2} − 36}{x^{2} + 6x} = \\frac{(x − 6)(x + 6)}{x(x + 6)}\\); Step 2: \\(\\frac{(x − 6)(x + 6)}{x(x + 6)} = \\frac{(x − 6)(x + 6)}{x}\\); Step 3: \\(\\frac{(x − 6)(x + 6)}{x} = \\frac{x^{2} − 36}{x}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 2 is wrong: the bracket \\((x + 6)\\) was removed from the bottom only. A common factor must be cancelled from the top as well, which would leave \\(x − 6\\) on the top."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it multiplies out the top."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it factorises the top and the bottom."
      },
      {
        "text": "Step 2",
        "correct": true,
        "feedback": "Correct. Step 2 is where the working goes wrong: the bracket \\((x + 6)\\) was removed from the bottom only. A common factor must be cancelled from the top as well, which would leave \\(x − 6\\) on the top. Later lines can look tidy because they build on the wrong line; the mistake is still the first line that is false."
      }
    ],
    "backward": "Factorising and cancelling (Ch2).",
    "forward": "Later in this chapter you check your own working line by line in the same way."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "A learner works out \\((\\frac{x + 2}{x − 4}) ÷ (\\frac{x + 3}{x − 4})\\). Step 1: \\((\\frac{x + 2}{x − 4}) ÷ (\\frac{x + 3}{x − 4}) = (\\frac{x + 2}{x − 4}) × (\\frac{x + 3}{x − 4})\\); Step 2: \\((\\frac{x + 2}{x − 4}) × (\\frac{x + 3}{x − 4}) = \\frac{(x + 2)(x + 3)}{(x − 4)^{2}}\\); Step 3: \\(\\frac{(x + 2)(x + 3)}{(x − 4)^{2}} = \\frac{x^{2} + 5x + 6}{(x − 4)^{2}}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it multiplies out the top."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: the second fraction was not flipped. Dividing by \\((\\frac{x + 3}{x − 4})\\) means multiplying by \\((\\frac{x − 4}{x + 3})\\)."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it multiplies the tops and multiplies the bottoms."
      },
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: the second fraction was not flipped. Dividing by \\((\\frac{x + 3}{x − 4})\\) means multiplying by \\((\\frac{x − 4}{x + 3})\\). Later lines can look tidy because they build on the wrong line; the mistake is still the first line that is false."
      }
    ],
    "backward": "Dividing fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you check each line of your own working against the line before it."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "A learner writes \\(\\frac{4}{x − 6} + \\frac{4}{x − 1}\\) as one fraction. Step 1: \\(\\frac{4}{x − 6} + \\frac{4}{x − 1} = \\frac{4(x − 1)}{(x − 6)(x − 1)} + \\frac{4(x − 6)}{(x − 6)(x − 1)}\\); Step 2: \\(\\frac{4(x − 1)}{(x − 6)(x − 1)} + \\frac{4(x − 6)}{(x − 6)(x − 1)} = \\frac{4(x − 1) + 4(x − 6)}{(x − 6)(x − 1)}\\); Step 3: \\(\\frac{4(x − 1) + 4(x − 6)}{(x − 6)(x − 1)} = \\frac{8x − 28}{(x − 6)(x − 1)}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": true,
        "feedback": "Correct. Every step is correct: step 1 rewrites each fraction with the common denominator; step 2 puts both tops over the one bottom; step 3 multiplies out and collects like terms."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it rewrites each fraction with the common denominator."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it puts both tops over the one bottom."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it multiplies out and collects like terms."
      }
    ],
    "backward": "Adding fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you check each line of your own working for the same slip."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "A learner completes the square for \\(4x^{2} + 8x + 10\\). Step 1: \\(4x^{2} + 8x + 10 = 4(x^{2} + 2x) + 10\\); Step 2: \\(4(x^{2} + 2x) + 10 = 4((x + 1)^{2} − 1) + 10\\); Step 3: \\(4((x + 1)^{2} − 1) + 10 = 4(x + 1)^{2} − 14\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: \\(−4 + 10 = 6\\), not \\(−14\\)."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it takes out the factor \\(4\\) from the \\(x^{2}\\) and \\(x\\) terms."
      },
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: \\(−4 + 10 = 6\\), not \\(−14\\). The steps after it are carried out correctly on the wrong line, so the mistake is the first false line."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it completes the square inside the bracket."
      }
    ],
    "backward": "Expanding brackets (Ch2).",
    "forward": "Later in this chapter you check each line when a number sits in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "A learner makes \\(x\\) the subject of \\(y = 4x + 9\\). Step 1: \\(y + 9 = 4x\\); Step 2: \\(\\frac{y + 9}{4} = x\\); Step 3: \\(x = \\frac{y + 9}{4}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: the sign is wrong. To undo + \\(9\\), do the opposite: subtract \\(9\\) on both sides."
      },
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: the sign is wrong. To undo + \\(9\\), do the opposite: subtract \\(9\\) on both sides. The steps after it are carried out correctly on the wrong line, so the mistake is the first false line."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it writes \\(x\\) on the left."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it divides both sides by \\(4\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you check your own rearranging line by line."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "A learner makes \\(x\\) the subject of \\(y = \\sqrt{x − 9}\\), where \\(y\\) is positive. Step 1: \\(y = x − 9\\); Step 2: \\(y + 9 = x\\); Step 3: \\(x = y + 9\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it writes \\(x\\) on the left."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: the square was left out. Squaring both sides of \\(y = \\sqrt{x − 9}\\) gives \\(y^{2} = x − 9\\), not \\(y = x − 9\\)."
      },
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: the square was left out. Squaring both sides of \\(y = \\sqrt{x − 9}\\) gives \\(y^{2} = x − 9\\), not \\(y = x − 9\\). The steps after it are carried out correctly on the wrong line, so the mistake is the first false line."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it adds \\(9\\) on both sides."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you check your own working when you solve equations with roots."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify fully \\(\\frac{3x^{2} − 33x + 90}{x^{2} − 25}\\).",
    "options": [
      {
        "text": "\\(\\frac{3(x − 5)(x − 6)}{(x − 5)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3(x − 5)(x − 6)}{(x − 5)(x + 5)}\\), factorising correctly but not cancelling the common factor \\((x − 5)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{x + 5}{3(x − 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 5}{3(x − 6)}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{3(x + 6)}{x + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3(x + 6)}{x + 5}\\), getting the sign wrong in the bracket that is left. The top factorises as \\(3(x − 5)(x − 6)\\), so \\((x − 6)\\) is left, with the \\(3\\)."
      },
      {
        "text": "\\(\\frac{3(x − 6)}{x + 5}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(3x^{2} − 33x + 90 = 3(x − 5)(x − 6)\\). The bottom factorises: \\(x^{2} − 25 = (x − 5)(x + 5)\\). The common factor \\((x − 5)\\) cancels from the top and the bottom, leaving \\(\\frac{3(x − 6)}{x + 5}\\)."
      }
    ],
    "backward": "A common factor, then a quadratic with a number in front (Ch2).",
    "forward": "Later in this chapter you carry out this factorising inside an addition of fractions."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{25x^{2} − 16}{5x − 4}\\).",
    "options": [
      {
        "text": "\\(5x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(5x − 4\\), giving the bracket that was cancelled. After cancelling \\((5x − 4)\\), the bracket left on the top is \\((5x + 4)\\)."
      },
      {
        "text": "\\(5x + 4\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(25x^{2} − 16 = (5x − 4)(5x + 4)\\). The common factor \\((5x − 4)\\) cancels from the top and the bottom, leaving \\(5x + 4\\)."
      },
      {
        "text": "\\(\\frac{(5x − 4)(5x + 4)}{5x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(5x − 4)(5x + 4)}{5x − 4}\\), factorising correctly but not cancelling the common factor \\((5x − 4)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(25x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(25x + 4\\), using \\(25x\\) instead of \\(5x\\). The square root of \\(25x^{2}\\) is \\(5x\\)."
      }
    ],
    "backward": "The difference of two squares with a number in front (Ch2).",
    "forward": "Later in this chapter you combine a common factor with the difference of two squares in one fraction."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "What must \\(\\frac{x − 2}{x + 4}\\) be multiplied by to give \\(\\frac{x − 2}{x − 7}\\)?",
    "options": [
      {
        "text": "\\(\\frac{x + 4}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{x − 2}\\), giving the reciprocal of the given fraction. That would only make the product \\(1\\), not \\(\\frac{x − 2}{x − 7}\\)."
      },
      {
        "text": "\\(\\frac{x + 4}{x − 7}\\)",
        "correct": true,
        "feedback": "Correct. Divide the target by the given fraction: \\((\\frac{x − 2}{x − 7}) ÷ (\\frac{x − 2}{x + 4}) = (\\frac{x − 2}{x − 7}) × (\\frac{x + 4}{x − 2}) = \\frac{x + 4}{x − 7}\\). Check: \\((\\frac{x − 2}{x + 4}) × (\\frac{x + 4}{x − 7})\\) cancels to \\(\\frac{x − 2}{x − 7}\\)."
      },
      {
        "text": "\\(\\frac{x − 7}{x + 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 7}{x + 4}\\), turning the answer upside down. The bracket \\((x + 4)\\) on the bottom of the given fraction has to be cancelled, so it belongs on the top of the answer, not the bottom."
      },
      {
        "text": "\\(\\frac{x − 2}{x − 7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 2}{x − 7}\\), giving the target itself. Multiplying the given fraction by this would not return the target."
      }
    ],
    "backward": "Multiplying and dividing fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the idea of undoing a multiplication when you rearrange formulae."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2} + 9x + 18}{x − 5}) ÷ (\\frac{x^{2} − 36}{x^{2} − x − 20})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x − 4)(x + 3)}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 4)(x + 3)}{x − 6}\\), getting a sign wrong in the bracket \\((x + 4)\\). The second bottom factorises as \\((x − 5)(x + 4)\\)."
      },
      {
        "text": "\\(\\frac{x + 3}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 3}{x − 6}\\), losing the bracket \\((x + 4)\\). When the second fraction is flipped, \\((x + 4)\\) moves to the top of the answer."
      },
      {
        "text": "\\(\\frac{(x − 6)(x + 3)(x + 6)^{2}}{(x + 4)(x − 5)^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 6)(x + 3)(x + 6)^{2}}{(x + 4)(x − 5)^{2}}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      },
      {
        "text": "\\(\\frac{(x + 3)(x + 4)}{x − 6}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} + 9x + 18 = (x + 3)(x + 6)\\); \\(x^{2} − 36 = (x + 6)(x − 6)\\); \\(x^{2} − x − 20 = (x − 5)(x + 4)\\). Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{(x + 3)(x + 6)(x − 5)(x + 4)}{(x − 5)(x + 6)(x − 6)}\\). Then cancel the common factors to get \\(\\frac{(x + 3)(x + 4)}{x − 6}\\)."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you follow the same steps when the fraction you divide by has a common factor to take out first."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "What is the lowest common denominator of \\(\\frac{1}{x^{2} − 9} + \\frac{1}{x + 3}\\)?",
    "options": [
      {
        "text": "\\((x − 3)(x + 3)\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} − 9 = (x − 3)(x + 3)\\), which already contains the other bottom \\((x + 3)\\). So the lowest common denominator is \\((x − 3)(x + 3)\\)."
      },
      {
        "text": "\\(x + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x + 3\\), using only the smaller bottom. The common denominator must be divisible by \\(x^{2} − 9\\) too, and \\(x + 3\\) is not."
      },
      {
        "text": "\\((x − 3)(x + 3)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x − 3)(x + 3)^{2}\\), multiplying the two bottoms together. The bottom \\(x + 3\\) is already a factor of \\(x^{2} − 9\\), so it does not need to be included again."
      },
      {
        "text": "\\(x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x − 3\\), using the factor of \\(x^{2} − 9\\) that is not in \\(x + 3\\). The common denominator needs both factors of \\(x^{2} − 9\\)."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you use the lowest common denominator to keep the working short."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2}{x^{2} − 25} − \\frac{4}{x − 5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(−\\frac{2}{x^{2} − x − 20}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{2}{x^{2} − x − 20}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{−4x + 22}{(x − 5)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−4x + 22}{(x − 5)(x + 5)}\\), multiplying the second top by \\((x − 5)\\) instead of \\((x + 5)\\). The factor missing from its bottom is \\((x + 5)\\), with the sign it has in the other bottom."
      },
      {
        "text": "\\(\\frac{−4x^{2} + 2x + 90}{(x^{2} − 25)(x − 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−4x^{2} + 2x + 90}{(x^{2} − 25)(x − 5)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\((x − 5)(x + 5)\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{−4x − 18}{(x − 5)(x + 5)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 5)(x + 5)\\). Rewrite both fractions over it: the second top is multiplied by \\((x + 5)\\). Then subtract the tops, taking care with every sign: \\(\\frac{−4x − 18}{(x − 5)(x + 5)}\\)."
      }
    ],
    "backward": "The difference of two squares (Ch2).",
    "forward": "Later in this chapter you use a shorter common denominator in the harder fractions."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(3x^{2} + 24x − 5\\) in the form \\(a(x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\(3(x + 4)^{2} + 43\\)",
        "correct": false,
        "feedback": "Chose \\(3(x + 4)^{2} + 43\\), adding \\(48\\) instead of subtracting it. The square gives an extra \\(48\\), which must be taken away. Expanding gives \\(3x^{2} + 24x + 91\\), not the original."
      },
      {
        "text": "\\(3(x + 4)^{2} − 21\\)",
        "correct": false,
        "feedback": "Chose \\(3(x + 4)^{2} − 21\\), subtracting \\(16\\) instead of \\(48\\). The bracket is multiplied by \\(3\\), so \\(3 × 16 = 48\\) must be taken away. Expanding gives \\(3x^{2} + 24x + 27\\), not the original."
      },
      {
        "text": "\\(3(x + 12)^{2} − 149\\)",
        "correct": false,
        "feedback": "Chose \\(3(x + 12)^{2} − 149\\), halving \\(24\\) to get \\(12\\). The \\(3\\) in front of \\(x^{2}\\) must be taken out first: \\(3x^{2} + 24x = 3(x^{2} + 8x)\\), and half of \\(8\\) is \\(4\\). Expanding gives \\(3x^{2} + 72x + 283\\), not the original."
      },
      {
        "text": "\\(3(x + 4)^{2} − 53\\)",
        "correct": true,
        "feedback": "Correct. Take out \\(3\\): \\(3x^{2} + 24x − 5 = 3(x^{2} + 8x) − 5\\). Half of \\(8\\) is \\(4\\), so \\((x + 4)^{2}\\) gives \\(x^{2} + 8x + 16\\), an extra \\(16\\) inside the bracket, which is \\(48\\) once the \\(3\\) is multiplied in. So \\(3x^{2} + 24x − 5 = 3(x + 4)^{2} − 53\\)."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "In a later chapter you use this form to find turning points of curves."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} + 4x + 11 = (x + p)^{2} + q\\). What is the value of \\(q\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(4\\) is \\(2\\), so \\(p = 2\\). Then \\((x + 2)^{2} = x^{2} + 4x + 4\\), so \\(q = 11 − 4 = 7\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), the number in the bracket, \\(p\\). The question asks for \\(q\\), the number added after the bracket."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Chose \\(15\\), adding \\(4\\) instead of subtracting it. \\(11 − 4 = 7\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Chose \\(11\\), the original constant. The square \\((x + 2)^{2}\\) contributes \\(4\\), so the constant after the bracket is \\(11 − 4 = 7\\)."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you use the constant outside the bracket as a least value."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The distance travelled by an object that speeds up steadily is \\(s = \\frac{(u + v)t}{2}\\). Make \\(u\\) the subject.",
    "options": [
      {
        "text": "\\(u = \\frac{2s}{t} − v\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2s = (u + v)t\\). Divide both sides by \\(t\\): \\(\\frac{2s}{t} = u + v\\). Subtract \\(v\\): \\(u = \\frac{2s}{t} − v\\)."
      },
      {
        "text": "\\(u = \\frac{2s − v}{t}\\)",
        "correct": false,
        "feedback": "Chose \\(u = \\frac{2s − v}{t}\\), subtracting \\(v\\) before dividing by \\(t\\). The \\(v\\) is inside the bracket with \\(u\\), so divide by \\(t\\) first."
      },
      {
        "text": "\\(u = \\frac{2s}{t} + v\\)",
        "correct": false,
        "feedback": "Chose \\(u = \\frac{2s}{t} + v\\), getting the sign wrong. After \\(\\frac{2s}{t} = u + v\\), subtract \\(v\\) from both sides."
      },
      {
        "text": "\\(u = \\frac{s}{2t} − v\\)",
        "correct": false,
        "feedback": "Chose \\(u = \\frac{s}{2t} − v\\), dividing by \\(2\\) instead of multiplying by \\(2\\). The \\(2\\) is under the fraction."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "Later in this chapter you rearrange a formula where the subject appears in two places."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Rearrange \\(y = \\frac{5x − 8}{7}\\) to make \\(x\\) the subject.",
    "options": [
      {
        "text": "\\(x = \\frac{7y − 8}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{7y − 8}{5}\\), getting the sign wrong. After multiplying by \\(7\\), \\(7y = 5x − 8\\), so \\(8\\) is added."
      },
      {
        "text": "\\(x = \\frac{7y}{5} + 8\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{7y}{5} + 8\\), dividing only \\(7y\\) by \\(5\\). The whole of \\(7y + 8\\) must be divided by \\(5\\)."
      },
      {
        "text": "\\(x = \\frac{7y + 8}{5}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(7\\): \\(7y = 5x − 8\\). Add \\(8\\): \\(7y + 8 = 5x\\). Divide by \\(5\\): \\(x = \\frac{7y + 8}{5}\\)."
      },
      {
        "text": "\\(x = \\frac{y + 8}{35}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y + 8}{35}\\), dividing by \\(7\\) instead of multiplying by \\(7\\), and subtracting \\(−8\\) from \\(y\\) too early. Multiply both sides by \\(7\\) first."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject is under a power or a root."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "For an object that accelerates steadily, \\(v^{2} = u^{2} + 2as\\). Make \\(u\\) the subject, where \\(u\\) is positive.",
    "options": [
      {
        "text": "\\(u = v − \\sqrt{2as}\\)",
        "correct": false,
        "feedback": "Chose \\(u = v − \\sqrt{2as}\\), taking the square root of each term. The root of \\(v^{2} − 2as\\) is not \\(v − \\sqrt{2as}\\)."
      },
      {
        "text": "\\(u = \\sqrt{v^{2} − 2as}\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(2as\\) from both sides: \\(u^{2} = v^{2} − 2as\\). Take the positive square root: \\(u = \\sqrt{v^{2} − 2as}\\)."
      },
      {
        "text": "\\(u = v^{2} − 2as\\)",
        "correct": false,
        "feedback": "Chose \\(u = v^{2} − 2as\\), forgetting the square root. The equation gives \\(u^{2} = v^{2} − 2as\\)."
      },
      {
        "text": "\\(u = v − 2as\\)",
        "correct": false,
        "feedback": "Chose \\(u = v − 2as\\), taking the square root of \\(v^{2}\\) only, which gives \\(v\\). The root applies to the whole of \\(v^{2} − 2as\\)."
      }
    ],
    "backward": "Square roots (Ch1) and expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "In a later chapter you rearrange motion formulae with a square to find a speed."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = (x − 3)^{2}\\), where \\(x − 3\\) is positive.",
    "options": [
      {
        "text": "\\(x = y − 9\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 9\\), subtracting instead of taking the square root. A square is undone by a square root."
      },
      {
        "text": "\\(x = \\sqrt{y} − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 3\\), getting the sign wrong. To undo − \\(3\\), do the opposite: add \\(3\\)."
      },
      {
        "text": "\\(x = \\sqrt{y} − 9\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 9\\), subtracting \\(9\\) instead of \\(3\\). After the square root, the bracket is just \\(x − 3\\), so \\(3\\) is moved."
      },
      {
        "text": "\\(x = \\sqrt{y} + 3\\)",
        "correct": true,
        "feedback": "Correct. Take the square root of both sides, using the positive root where \\(x − 3\\) is positive: \\(\\sqrt{y} = x − 3\\). Then add \\(3\\): \\(x = \\sqrt{y} + 3\\)."
      }
    ],
    "backward": "Laws of indices and square roots (Ch1).",
    "forward": "In a later chapter you use the idea of undoing a power to find inverse functions."
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
  title: "Algebraic Fractions and Rearranging Formulae — Synthesis",
  subtitle: "Grade 9 · Level 3 · Synthesis",
  description: "Simplifying, multiplying, dividing, adding and subtracting algebraic fractions, completing the square, and changing the subject of a formula — warm-up, diagnostic, and spaced recheck for synthesis.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> This diagnostic mixes the ideas. A fraction question may need a factorisation first, and a formula question may need a completed square or a fraction cleared. Before you calculate, decide what the question is really asking and which topics it needs, then plan the order of your steps. There is no calculator and no time limit: the thinking is the point. If you get stuck, look for the common factor or the operation you can undo first.</p><p>Some questions show a learner's working: look for the first line that is not equal to the line before it. You will meet all six topics, mixed together, and some items need two of them at once.</p>",
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

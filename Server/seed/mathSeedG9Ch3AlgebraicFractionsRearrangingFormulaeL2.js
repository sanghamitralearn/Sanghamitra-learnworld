// Algebraic Fractions and Rearranging Formulae — Grade 9, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch03-algebraic-fractions-rearranging-formulae-level-2.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch3AlgebraicFractionsRearrangingFormulaeL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-3-algebraic-fractions-rearranging-formulae";
const CHAPTER_NAME = "Algebraic Fractions and Rearranging Formulae";
const LEVEL = 2;

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
    "question": "Simplify \\(\\frac{9x}{18x^{3}}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{2x^{2}}\\)",
        "correct": true,
        "feedback": "Correct. Divide the top and the bottom by their highest common factor \\(9x\\): the numbers become \\(1\\) and \\(2\\), and \\(x ÷ x^{3}\\) leaves \\(x^{2}\\) on the bottom. The answer is \\(\\frac{1}{2x^{2}}\\)."
      },
      {
        "text": "\\(\\frac{9}{18x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9}{18x^{2}}\\), cancelling the powers of \\(x\\) but not the numbers \\(9\\) and \\(18\\), which have the common factor \\(9\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{1}{2x^{4}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{2x^{4}}\\), adding the powers, \\(1 + 3 = 4\\), instead of subtracting them. Dividing \\(x\\) by \\(x^{3}\\) subtracts the powers."
      },
      {
        "text": "\\(\\frac{x}{2x^{3}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x}{2x^{3}}\\), cancelling the numbers \\(9\\) and \\(18\\) but not the powers of \\(x\\). The fraction is not fully simplified."
      }
    ],
    "retryHint": "Divide the numbers first. Then subtract the powers of \\(x\\): the bottom has more \\(x\\), so some \\(x\\) stays on the bottom.",
    "backward": "The laws of indices for dividing powers (Ch1).",
    "forward": "Later in this chapter you meet fractions where the bracket left over sits on the bottom after cancelling."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x − 4}{x − 6}) × (\\frac{x − 6}{x − 3})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x − 4)(x − 6)}{(x − 6)(x − 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 4)(x − 6)}{(x − 6)(x − 3)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x − 4}{x − 3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{(x − 4)(x − 6)}{(x − 6)(x − 3)}\\). Then cancel the common factors to get \\(\\frac{x − 4}{x − 3}\\)."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{3}\\), cancelling the \\(x\\) terms. They are parts of brackets, so only whole brackets can be cancelled."
      },
      {
        "text": "\\(\\frac{x + 4}{x − 3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{x − 3}\\), getting a sign wrong in the bracket that is left on the top. The bracket left is \\((x − 4)\\)."
      }
    ],
    "retryHint": "Look for a bracket on a top that matches a bracket on the bottom of the other fraction, and cancel it before you multiply.",
    "backward": "Fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you do the same with quadratics that have to be factorised first."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} − 2x − 4\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x − 2)^{2} − 8\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)^{2} − 8\\), using \\(−2\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(−1\\). Expanding gives \\(x^{2} − 4x − 4\\), not the original."
      },
      {
        "text": "\\((x − 1)^{2} + 5\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)^{2} + 5\\), getting the sign of the last number wrong. \\(−4 − 1 = −5\\), so the constant after the bracket is \\(−5\\). Expanding gives \\(x^{2} − 2x + 6\\), not the original."
      },
      {
        "text": "\\((x − 1)^{2} − 5\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(−2\\) is \\(−1\\), so write \\((x − 1)^{2}\\). This equals \\(x^{2} − 2x + 1\\), which has an extra \\(1\\). Take it away: \\(x^{2} − 2x − 4 = (x − 1)^{2} − 5\\)."
      },
      {
        "text": "\\((x + 1)^{2} − 5\\)",
        "correct": false,
        "feedback": "Chose \\((x + 1)^{2} − 5\\), getting the sign of the number in the bracket wrong. The bracket is \\((x − 1)\\), because \\(−2\\) is the number in front of \\(x\\) and half of it is \\(−1\\). Expanding gives \\(x^{2} + 2x − 4\\), not the original."
      }
    ],
    "retryHint": "Halve the number in front of \\(x\\). Put it in the bracket. Take its square away from the constant term.",
    "backward": "Squaring a bracket (Ch2).",
    "forward": "Later in this chapter you complete the square when the number in front of \\(x\\) is odd."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = 1 − 2x\\).",
    "options": [
      {
        "text": "\\(x = \\frac{1 − y}{2}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(2x\\) to both sides: \\(2x + y = 1\\). Subtract \\(y\\) from both sides: \\(2x = 1 − y\\). Divide by \\(2\\): \\(x = \\frac{1 − y}{2}\\)."
      },
      {
        "text": "\\(x = 1 − \\frac{y}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = 1 − \\frac{y}{2}\\), dividing only \\(y\\) by \\(2\\). The whole of \\(1 − y\\) must be divided by \\(2\\)."
      },
      {
        "text": "\\(x = \\frac{y − 1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y − 1}{2}\\), writing \\(y − 1\\) instead of \\(1 − y\\). From \\(y = 1 − 2x\\), the equation \\(2x = 1 − y\\) is the result, so the top is \\(1 − y\\)."
      },
      {
        "text": "\\(x = 1 − y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 1 − y\\), forgetting to divide by \\(2\\). The equation \\(2x = 1 − y\\) must be divided by \\(2\\)."
      }
    ],
    "retryHint": "Subtract the constant from both sides first. Then divide both sides by the number in front of \\(x\\), keeping the minus sign.",
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject has a negative sign."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{4}{x − 7} − \\frac{1}{x − 2}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{3x − 15}{(x − 7)(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3x − 15}{(x − 7)(x − 2)}\\), subtracting only the first term of \\(x − 7\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(\\frac{3x − 1}{(x − 7)(x − 2)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 7)(x − 2)\\). Rewrite both fractions over it: the first top is multiplied by \\((x − 2)\\) and the second top is multiplied by \\((x − 7)\\). Then subtract the tops, taking care with every sign: \\(\\frac{3x − 1}{(x − 7)(x − 2)}\\)."
      },
      {
        "text": "\\(\\frac{4x − 9}{(x − 7)(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x − 9}{(x − 7)(x − 2)}\\), multiplying the first top by \\((x − 2)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(\\frac{3}{(x − 7)(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{(x − 7)(x − 2)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      }
    ],
    "retryHint": "Multiply the two bottoms together to make the common denominator. Multiply each top by the bracket it was missing, then combine.",
    "backward": "Common denominators, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use a common denominator made of two brackets."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{6x^{2} + 8x}{6x}\\).",
    "options": [
      {
        "text": "\\(\\frac{3x + 4}{3}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(6x^{2} + 8x = 2x(3x + 4)\\). The common factor \\(2x\\) cancels from the top and the bottom, leaving \\(\\frac{3x + 4}{3}\\)."
      },
      {
        "text": "\\(\\frac{6x^{2} + 4}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x^{2} + 4}{3}\\), dividing only the last term of the top by \\(2x\\). Every term on the top must be divided by \\(2x\\)."
      },
      {
        "text": "\\(\\frac{2x(3x + 4)}{6x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x(3x + 4)}{6x}\\), factorising correctly but not cancelling the common factor \\(2x\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{6x + 8}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x + 8}{6}\\), cancelling only the \\(x\\). The top and the bottom still have the common factor \\(2\\), so the fraction is not fully simplified."
      }
    ],
    "retryHint": "Take the common factor out of the top, then cancel it with the same factor on the bottom.",
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you factorise tops and bottoms that are quadratics and cancel whole brackets."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = 4(x + 2)\\).",
    "options": [
      {
        "text": "\\(x = \\frac{y}{4} − 8\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{4} − 8\\), multiplying \\(2\\) by \\(4\\). After dividing both sides by \\(4\\), the bracket is just \\(x + 2\\), so only \\(2\\) is moved."
      },
      {
        "text": "\\(x = \\frac{y}{4} − 2\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(4\\): \\(\\frac{y}{4} = x + 2\\). Then subtract \\(2\\) from both sides: \\(x = \\frac{y}{4} − 2\\)."
      },
      {
        "text": "\\(x = y − 4 − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 4 − 2\\), subtracting \\(4\\) instead of dividing by \\(4\\). The \\(4\\) multiplies the whole bracket, so both sides must be divided by \\(4\\)."
      },
      {
        "text": "\\(x = \\frac{y − 2}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y − 2}{4}\\), subtracting \\(2\\) from \\(y\\) before dividing. The \\(2\\) is inside the bracket with \\(x\\), so it is not part of \\(y\\). Divide by \\(4\\) first, then deal with the \\(2\\)."
      }
    ],
    "retryHint": "Either divide both sides by the number outside the bracket, or expand the bracket first. Then subtract the number.",
    "backward": "Solving equations, from Stage 9 (S9-Ch4) (equations with brackets).",
    "forward": "Later in this chapter you rearrange formulae with a bracket and a fraction together."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x − 4}{x + 8}) ÷ (\\frac{x + 2}{x + 8})\\).",
    "options": [
      {
        "text": "\\(\\frac{x + 2}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 2}{x − 4}\\), flipping the first fraction instead of the second. The answer is turned upside down."
      },
      {
        "text": "\\(\\frac{(x − 4)(x + 8)}{(x + 8)(x + 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 4)(x + 8)}{(x + 8)(x + 2)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{(x − 4)(x + 2)}{(x + 8)^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 4)(x + 2)}{(x + 8)^{2}}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      },
      {
        "text": "\\(\\frac{x − 4}{x + 2}\\)",
        "correct": true,
        "feedback": "Correct. Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{(x − 4)(x + 8)}{(x + 8)(x + 2)}\\). Then cancel the common factors to get \\(\\frac{x − 4}{x + 2}\\)."
      }
    ],
    "retryHint": "Flip the second fraction and change to a multiplication. Then cancel the bracket that appears twice.",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (dividing by a fraction).",
    "forward": "Later in this chapter you divide fractions that contain quadratics."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x^{2} − 16}{x + 4}\\).",
    "options": [
      {
        "text": "\\(x − 4\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(x^{2} − 16 = (x − 4)(x + 4)\\). The common factor \\((x + 4)\\) cancels from the top and the bottom, leaving \\(x − 4\\)."
      },
      {
        "text": "\\(x^{2} − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 4\\), dividing only the last term, \\(16\\), by \\(4\\). The whole top must be factorised first, not divided term by term."
      },
      {
        "text": "\\(x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x + 4\\), giving the bracket that was cancelled. After cancelling \\((x + 4)\\), the bracket left on the top is \\((x − 4)\\)."
      },
      {
        "text": "\\(\\frac{(x − 4)(x + 4)}{x + 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 4)(x + 4)}{x + 4}\\), factorising correctly but not cancelling the common factor \\((x + 4)\\). The fraction is not fully simplified."
      }
    ],
    "backward": "The difference of two squares (Ch2).",
    "forward": "Later in this chapter you use the same pattern when the squares have a number in front."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2} − 9x + 14}{x − 3}) × (\\frac{x − 3}{x − 7})\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{x − 2}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      },
      {
        "text": "\\(\\frac{(x − 7)(x − 2)(x − 3)}{(x − 3)(x − 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 7)(x − 2)(x − 3)}{(x − 3)(x − 7)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(x − 2\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} − 9x + 14 = (x − 7)(x − 2)\\). Multiply across: \\(\\frac{(x − 7)(x − 2)(x − 3)}{(x − 3)(x − 7)}\\). Then cancel the common factors to get \\(x − 2\\)."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), getting the sign wrong in the bracket that is left. The factors of the first top are \\((x − 7)\\) and \\((x − 2)\\); \\((x − 7)\\) cancels, leaving \\((x − 2)\\)."
      }
    ],
    "backward": "Factorising a quadratic (Ch2).",
    "forward": "Later in this chapter you factorise two quadratics in one multiplication."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{5}{x} − \\frac{2}{x − 6}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{5x − 32}{x(x − 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x − 32}{x(x − 6)}\\), multiplying the first top by \\((x − 6)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(\\frac{3x − 30}{x(x − 6)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(x(x − 6)\\). Rewrite both fractions over it: the first top is multiplied by \\((x − 6)\\) and the second top is multiplied by \\(x\\). Then subtract the tops, taking care with every sign: \\(\\frac{3x − 30}{x(x − 6)}\\)."
      },
      {
        "text": "\\(\\frac{3}{x(x − 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{x(x − 6)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{3}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{6}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you do the same when the tops are also brackets."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} − 2x − 6\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x − 1)^{2} − 7\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(−2\\) is \\(−1\\), so write \\((x − 1)^{2}\\). This equals \\(x^{2} − 2x + 1\\), which has an extra \\(1\\). Take it away: \\(x^{2} − 2x − 6 = (x − 1)^{2} − 7\\)."
      },
      {
        "text": "\\((x − 1)^{2} − 5\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)^{2} − 5\\), adding \\(1\\) instead of subtracting it. The square \\((x − 1)^{2}\\) has an extra \\(1\\), so \\(1\\) must be taken away from the constant. Expanding gives \\(x^{2} − 2x − 4\\), not the original."
      },
      {
        "text": "\\((x − 2)^{2} − 10\\)",
        "correct": false,
        "feedback": "Chose \\((x − 2)^{2} − 10\\), using \\(−2\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(−1\\). Expanding gives \\(x^{2} − 4x − 6\\), not the original."
      },
      {
        "text": "\\((x − 1)^{2} + 7\\)",
        "correct": false,
        "feedback": "Chose \\((x − 1)^{2} + 7\\), getting the sign of the last number wrong. \\(−6 − 1 = −7\\), so the constant after the bracket is \\(−7\\). Expanding gives \\(x^{2} − 2x + 8\\), not the original."
      }
    ],
    "backward": "Squaring a bracket (Ch2).",
    "forward": "Later in this chapter you complete the square when the number in front of \\(x\\) is odd."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Rearrange \\(y = \\frac{3x − 4}{2}\\) to make \\(x\\) the subject.",
    "options": [
      {
        "text": "\\(x = \\frac{2y + 4}{3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2y = 3x − 4\\). Add \\(4\\): \\(2y + 4 = 3x\\). Divide by \\(3\\): \\(x = \\frac{2y + 4}{3}\\)."
      },
      {
        "text": "\\(x = 2y + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x = 2y + 4\\), forgetting to divide by \\(3\\). After taking \\(−4\\) away, \\(2y + 4 = 3x\\)."
      },
      {
        "text": "\\(x = \\frac{2y}{3} + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2y}{3} + 4\\), dividing only \\(2y\\) by \\(3\\). The whole of \\(2y + 4\\) must be divided by \\(3\\)."
      },
      {
        "text": "\\(x = \\frac{y + 4}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y + 4}{6}\\), dividing by \\(2\\) instead of multiplying by \\(2\\), and subtracting \\(−4\\) from \\(y\\) too early. Multiply both sides by \\(2\\) first."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject is under a power or a root."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = 2x^{2} − 6\\), where \\(x\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{\\frac{y − 6}{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{\\frac{y − 6}{2}}\\), getting the sign wrong. To undo − \\(6\\), do the opposite: add \\(6\\)."
      },
      {
        "text": "\\(x = \\frac{\\sqrt{y + 6}}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{\\sqrt{y + 6}}{2}\\), taking the root of the top only. The whole of \\(\\frac{y + 6}{2}\\) must be square-rooted."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y + 6}{2}}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(6\\) on both sides: \\(y + 6 = 2x^{2}\\). Divide by \\(2\\): \\(x^{2} = \\frac{y + 6}{2}\\). Take the positive square root: \\(x = \\sqrt{\\frac{y + 6}{2}}\\)."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y}{2}} + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{\\frac{y}{2}} + 6\\), dividing only \\(y\\) by \\(2\\) and moving \\(6\\) outside the root. The whole of \\(y + 6\\) is divided by \\(2\\) inside the root."
      }
    ],
    "backward": "Square roots (Ch1) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "In a later chapter you solve equations of the form \\(ax^{2} + b = c\\)."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x^{2} − 2x − 48}{x + 6}\\).",
    "options": [
      {
        "text": "\\(x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x + 6\\), giving the bracket that was cancelled. After cancelling \\((x + 6)\\), the bracket left on the top is \\((x − 8)\\)."
      },
      {
        "text": "\\(x + 8\\)",
        "correct": false,
        "feedback": "Chose \\(x + 8\\), getting the sign wrong in the bracket that is left. The top factorises as \\((x − 8)(x + 6)\\), so \\((x − 8)\\) is left."
      },
      {
        "text": "\\(x^{2} − 2x − 8\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 2x − 8\\), dividing only the last term, \\(−48\\), by \\(6\\). The whole top must be factorised first, not divided term by term."
      },
      {
        "text": "\\(x − 8\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(x^{2} − 2x − 48 = (x − 8)(x + 6)\\). The common factor \\((x + 6)\\) cancels from the top and the bottom, leaving \\(x − 8\\)."
      }
    ],
    "backward": "Factorising a quadratic (Ch2).",
    "forward": "Later in this chapter you multiply and divide fractions where a quadratic on one top cancels a bracket on another bottom."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2} − 7x + 6}{x + 3}) ÷ (\\frac{x^{2} − 5x + 4}{x^{2} + 8x + 15})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x − 6)(x − 4)(x − 1)^{2}}{(x + 5)(x + 3)^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 6)(x − 4)(x − 1)^{2}}{(x + 5)(x + 3)^{2}}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      },
      {
        "text": "\\(\\frac{(x − 6)(x − 1)(x + 3)(x + 5)}{(x + 3)(x − 1)(x − 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 6)(x − 1)(x + 3)(x + 5)}{(x + 3)(x − 1)(x − 4)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x − 6}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 6}{x − 4}\\), losing the bracket \\((x + 5)\\). When the second fraction is flipped, \\((x + 5)\\) moves to the top of the answer."
      },
      {
        "text": "\\(\\frac{(x − 6)(x + 5)}{x − 4}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} − 7x + 6 = (x − 6)(x − 1)\\); \\(x^{2} − 5x + 4 = (x − 1)(x − 4)\\); \\(x^{2} + 8x + 15 = (x + 3)(x + 5)\\). Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{(x − 6)(x − 1)(x + 3)(x + 5)}{(x + 3)(x − 1)(x − 4)}\\). Then cancel the common factors to get \\(\\frac{(x − 6)(x + 5)}{x − 4}\\)."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you follow the same steps when the fraction you divide by has a common factor to take out first."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x + 5}{x + 1} − \\frac{4x + 8}{x + 1}\\) as a single fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{−3x − 3}{2x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−3x − 3}{2x + 2}\\), adding the bottoms as well as the tops. When the bottoms are already the same, they stay the same."
      },
      {
        "text": "\\(\\frac{−3x + 13}{x + 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−3x + 13}{x + 1}\\), subtracting only the first term of \\(4x + 8\\). The minus must apply to every term of the second top, so every sign in it changes."
      },
      {
        "text": "\\(−3\\)",
        "correct": true,
        "feedback": "Correct. The bottoms are the same, so combine the tops: \\(x + 5 − (4x + 8) = −3x − 3\\). The top is \\(−3(x + 1)\\), so the bracket cancels with the bottom and the answer is \\(−3\\)."
      },
      {
        "text": "\\(\\frac{−3x − 3}{x + 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−3x − 3}{x + 1}\\), combining the tops correctly but not simplifying. The top \\(−3x − 3 = −3(x + 1)\\) has the factor \\((x + 1)\\), which cancels with the bottom."
      }
    ],
    "backward": "Subtracting a bracket and cancelling, from Stage 9 (S9-Ch8) and Ch2.",
    "forward": "Later in this chapter you meet answers that need factorising once the tops are combined."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} − 6x − 5 = (x − 3)^{2} − 14\\). At what value of \\(x\\) does \\(x^{2} − 6x − 5\\) have its minimum value?",
    "options": [
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), the number in the bracket exactly as it is written. The minimum is where the bracket equals \\(0\\): \\(x − 3 = 0\\), so \\(x = 3\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. The bracket \\((x − 3)^{2}\\) is \\(0\\) when \\(x − 3 = 0\\), so \\(x = 3\\). That is where the minimum occurs, and the minimum value is \\(−14\\)."
      },
      {
        "text": "\\(−14\\)",
        "correct": false,
        "feedback": "Chose \\(−14\\), the minimum value of the expression. The question asks for the value of \\(x\\) where it occurs, which is \\(3\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Chose \\(14\\), the wrong sign of the minimum value. The question asks for the value of \\(x\\) where the minimum occurs."
      }
    ],
    "backward": "Squares are never negative, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you give the coordinates of a turning point from a completed square."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Rearrange \\(y = \\frac{4}{x}\\) to make \\(x\\) the subject.",
    "options": [
      {
        "text": "\\(x = 4y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 4y\\), multiplying by \\(y\\) instead of dividing. From \\(xy = 4\\), divide both sides by \\(y\\)."
      },
      {
        "text": "\\(x = 4 − y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 4 − y\\), subtracting. The equation \\(y = \\frac{4}{x}\\) means \\(xy = 4\\), so \\(x = \\frac{4}{y}\\)."
      },
      {
        "text": "\\(x = \\frac{4}{y}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(x\\): \\(xy = 4\\). Divide both sides by \\(y\\): \\(x = \\frac{4}{y}\\)."
      },
      {
        "text": "\\(x = \\frac{y}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{4}\\), turning the fraction upside down. Multiply both sides by \\(x\\) to get \\(xy = 4\\), then divide by \\(y\\)."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (reciprocals).",
    "forward": "Later in this chapter you rearrange when the subject is in the bottom of a fraction with a bracket."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The volume of a cylinder is \\(V = \\pi r^{2}h\\). Make \\(r\\) the subject, where \\(r\\) is positive.",
    "options": [
      {
        "text": "\\(r = \\frac{\\sqrt{\\frac{V}{\\pi}}}{h}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\frac{\\sqrt{\\frac{V}{\\pi}}}{h}\\), taking \\(h\\) outside the root. The \\(h\\) divides \\(r^{2}\\) along with \\(\\pi\\), so it is inside the square root."
      },
      {
        "text": "\\(r = \\frac{\\sqrt{V}}{\\pi h}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\frac{\\sqrt{V}}{\\pi h}\\), taking the square root of \\(V\\) only. The whole of \\(\\frac{V}{\\pi h}\\) must be square-rooted."
      },
      {
        "text": "\\(r = \\sqrt{\\frac{V}{\\pi h}}\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(\\pi h\\): \\(r^{2} = \\frac{V}{\\pi h}\\). Take the square root of both sides, using the positive root: \\(r = \\sqrt{\\frac{V}{\\pi h}}\\)."
      },
      {
        "text": "\\(r = \\sqrt{V\\pi h}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\sqrt{V\\pi h}\\), multiplying by \\(\\pi\\) and \\(h\\) instead of dividing. They multiply \\(r^{2}\\), so they are undone by dividing."
      }
    ],
    "backward": "Square roots (Ch1) and volume of a cylinder, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you find the radius of a cylinder from its volume."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x^{2} − 4}{x + 8}\\) as far as possible.",
    "options": [
      {
        "text": "It cannot be simplified",
        "correct": true,
        "feedback": "Correct. The top factorises as \\(x^{2} − 4 = (x − 2)(x + 2)\\). The bottom is \\(x + 8\\), which is not the same as either bracket. There is no common factor, so the fraction cannot be simplified."
      },
      {
        "text": "\\(\\frac{x^{2} − 4}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} − 4}{8}\\), cancelling the \\(x\\) on the bottom with an \\(x\\) on the top. The \\(x\\) on the bottom is part of a sum, so it cannot be cancelled."
      },
      {
        "text": "\\(x − 2\\)",
        "correct": false,
        "feedback": "Chose \\(x − 2\\), cancelling \\((x + 2)\\) on the top with \\((x + 8)\\) on the bottom as if they were the same. They are different brackets, so nothing cancels."
      },
      {
        "text": "\\(x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x + 2\\), cancelling \\((x − 2)\\) on the top with \\((x + 8)\\) on the bottom as if they were the same. They are different brackets, so nothing cancels."
      }
    ],
    "backward": "The difference of two squares (Ch2).",
    "forward": "Later in this chapter you check that a bracket really appears on both lines before you cancel."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "What must \\(\\frac{x + 3}{x + 1}\\) be multiplied by to give \\(\\frac{x + 3}{x − 4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{x + 1}{x + 3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 1}{x + 3}\\), giving the reciprocal of the given fraction. That would only make the product \\(1\\), not \\(\\frac{x + 3}{x − 4}\\)."
      },
      {
        "text": "\\(\\frac{x + 1}{x − 4}\\)",
        "correct": true,
        "feedback": "Correct. Divide the target by the given fraction: \\((\\frac{x + 3}{x − 4}) ÷ (\\frac{x + 3}{x + 1}) = (\\frac{x + 3}{x − 4}) × (\\frac{x + 1}{x + 3}) = \\frac{x + 1}{x − 4}\\). Check: \\((\\frac{x + 3}{x + 1}) × (\\frac{x + 1}{x − 4})\\) cancels to \\(\\frac{x + 3}{x − 4}\\)."
      },
      {
        "text": "\\(\\frac{x + 3}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 3}{x − 4}\\), giving the target itself. Multiplying the given fraction by this would not return the target."
      },
      {
        "text": "\\(\\frac{x − 4}{x + 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{x + 1}\\), turning the answer upside down. The bracket \\((x + 1)\\) on the bottom of the given fraction has to be cancelled, so it belongs on the top of the answer, not the bottom."
      }
    ],
    "backward": "Multiplying and dividing fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the idea of undoing a multiplication when you rearrange formulae."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2}{x + 6} − \\frac{5}{x − 5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{−3x + 20}{(x − 5)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−3x + 20}{(x − 5)(x + 6)}\\), subtracting only the first term of \\(5x + 30\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(−\\frac{3}{(x − 5)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{3}{(x − 5)(x + 6)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(−\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{3}{11}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{−3x − 40}{(x − 5)(x + 6)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 5)(x + 6)\\). Rewrite both fractions over it: the first top is multiplied by \\((x − 5)\\) and the second top is multiplied by \\((x + 6)\\). Then subtract the tops, taking care with every sign: \\(\\frac{−3x − 40}{(x − 5)(x + 6)}\\)."
      }
    ],
    "backward": "Common denominators, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use a common denominator made of two brackets."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} + 8x + 9 = (x + p)^{2} + q\\). What is the value of \\(p\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\((x + p)^{2} = x^{2} + 2px + p^{2}\\), so \\(2p = 8\\) and \\(p = 4\\). Then \\(q = 9 − 16 = −7\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), the whole number in front of \\(x\\). \\(p\\) is half of \\(8\\), which is \\(4\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Chose \\(9\\), the constant term. \\(p\\) comes from the number in front of \\(x\\), not from the constant."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Chose \\(16\\), the square of \\(p\\). \\(p\\) itself is half of \\(8\\), which is \\(4\\)."
      }
    ],
    "backward": "Squaring a bracket (Ch2).",
    "forward": "Later in this chapter you read the bracket number straight from the middle term."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The speed of an object that accelerates steadily is \\(v = u + at\\). Make \\(t\\) the subject.",
    "options": [
      {
        "text": "\\(t = a(v − u)\\)",
        "correct": false,
        "feedback": "Chose \\(t = a(v − u)\\), multiplying by \\(a\\) instead of dividing. The \\(a\\) multiplies \\(t\\), so it is undone by dividing by \\(a\\)."
      },
      {
        "text": "\\(t = \\frac{v + u}{a}\\)",
        "correct": false,
        "feedback": "Chose \\(t = \\frac{v + u}{a}\\), getting the sign wrong. To undo + \\(u\\), subtract \\(u\\) from both sides."
      },
      {
        "text": "\\(t = \\frac{v − u}{a}\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(u\\) from both sides: \\(v − u = at\\). Divide both sides by \\(a\\): \\(t = \\frac{v − u}{a}\\)."
      },
      {
        "text": "\\(t = v − \\frac{u}{a}\\)",
        "correct": false,
        "feedback": "Chose \\(t = v − \\frac{u}{a}\\), dividing only \\(u\\) by \\(a\\). The whole of \\(v − u\\) must be divided by \\(a\\)."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "In a later chapter you use rearranged motion formulae in problems about speed and time."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = \\sqrt{x} − 2\\).",
    "options": [
      {
        "text": "\\(x = y^{2} + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x = y^{2} + 2\\), squaring \\(y\\) before dealing with the \\(2\\). First add \\(2\\) to isolate \\(\\sqrt{x}\\), then square both sides."
      },
      {
        "text": "\\(x = (y + 2)^{2}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(2\\) on both sides: \\(\\sqrt{x} = y + 2\\). Square both sides: \\(x = (y + 2)^{2}\\)."
      },
      {
        "text": "\\(x = (y − 2)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = (y − 2)^{2}\\), getting the sign wrong. To undo − \\(2\\), do the opposite: add \\(2\\)."
      },
      {
        "text": "\\(x = \\sqrt{y + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y + 2}\\), taking a square root instead of squaring. \\(\\sqrt{x}\\) is undone by squaring."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you work with inverse functions that contain roots."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "A learner simplifies \\(\\frac{x^{2} − 25}{x^{2} + 5x}\\). Step 1: \\(\\frac{x^{2} − 25}{x^{2} + 5x} = \\frac{(x − 5)(x + 5)}{x(x + 5)}\\); Step 2: \\(\\frac{(x − 5)(x + 5)}{x(x + 5)} = \\frac{x − 5}{x}\\); Step 3: \\(\\frac{x − 5}{x} = 1 − \\frac{5}{x}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it splits the fraction into two parts."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it factorises the top and the bottom."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it cancels the common bracket."
      },
      {
        "text": "There is no mistake",
        "correct": true,
        "feedback": "Correct. Every step is correct: step 1 factorises the top and the bottom; step 2 cancels the common bracket; step 3 splits the fraction into two parts."
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
    "question": "A learner works out \\((\\frac{x − 7}{x + 6}) ÷ (\\frac{x − 2}{x + 6})\\). Step 1: \\((\\frac{x − 7}{x + 6}) ÷ (\\frac{x − 2}{x + 6}) = (\\frac{x − 7}{x + 6}) × (\\frac{x + 6}{x − 2})\\); Step 2: \\((\\frac{x − 7}{x + 6}) × (\\frac{x + 6}{x − 2}) = \\frac{(x − 7)(x + 6)}{(x + 6)(x − 2)}\\); Step 3: \\(\\frac{(x − 7)(x + 6)}{(x + 6)(x − 2)} = \\frac{7}{2}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: the \\(x\\) terms are parts of brackets, so they cannot be cancelled. Cancelling the whole bracket \\((x + 6)\\) leaves \\(\\frac{x − 7}{x − 2}\\). Everything after that step follows from the slip, so this is the step to mark as the first mistake."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it changes the division into a multiplication by the reciprocal."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it multiplies the tops and multiplies the bottoms."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: the \\(x\\) terms are parts of brackets, so they cannot be cancelled. Cancelling the whole bracket \\((x + 6)\\) leaves \\(\\frac{x − 7}{x − 2}\\)."
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
    "question": "What is the lowest common denominator of \\(\\frac{1}{x^{2} − 16} + \\frac{1}{x + 4}\\)?",
    "options": [
      {
        "text": "\\(x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x − 4\\), using the factor of \\(x^{2} − 16\\) that is not in \\(x + 4\\). The common denominator needs both factors of \\(x^{2} − 16\\)."
      },
      {
        "text": "\\((x − 4)(x + 4)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x − 4)(x + 4)^{2}\\), multiplying the two bottoms together. The bottom \\(x + 4\\) is already a factor of \\(x^{2} − 16\\), so it does not need to be included again."
      },
      {
        "text": "\\((x − 4)(x + 4)\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} − 16 = (x − 4)(x + 4)\\), which already contains the other bottom \\((x + 4)\\). So the lowest common denominator is \\((x − 4)(x + 4)\\)."
      },
      {
        "text": "\\(x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x + 4\\), using only the smaller bottom. The common denominator must be divisible by \\(x^{2} − 16\\) too, and \\(x + 4\\) is not."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you use the lowest common denominator to keep the working short."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "A learner completes the square for \\(x^{2} + 12x + 11\\). Step 1: \\(x^{2} + 12x + 11 = (x + 12)^{2} − 144 + 11\\); Step 2: \\((x + 12)^{2} − 144 + 11 = (x + 12)^{2} − 133\\); Step 3: \\((x + 12)^{2} − 133 = x^{2} + 24x + 11\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: the number in the bracket must be half of \\(12\\), which is \\(6\\), not \\(12\\). Everything after that step follows from the slip, so this is the step to mark as the first mistake."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it collects the constant terms."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: the number in the bracket must be half of \\(12\\), which is \\(6\\), not \\(12\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: it expands the answer to check it."
      }
    ],
    "backward": "Expanding brackets (Ch2).",
    "forward": "Later in this chapter you check a completed square by expanding it."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "A learner makes \\(x\\) the subject of \\(y = 2(x + 9)\\). Step 1: \\(\\frac{y}{2} = x + 9\\); Step 2: \\(\\frac{y}{2} − 9 = x\\); Step 3: \\(x = \\frac{y}{2} − 18\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: it divides both sides by \\(2\\)."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: it subtracts \\(9\\) on both sides."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: the \\(9\\) was multiplied by \\(2\\). After dividing both sides by \\(2\\) the bracket is just \\(x + 9\\), so only \\(9\\) is moved."
      },
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: the \\(9\\) was multiplied by \\(2\\). After dividing both sides by \\(2\\) the bracket is just \\(x + 9\\), so only \\(9\\) is moved. Everything after that step follows from the slip, so this is the step to mark as the first mistake."
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
    "question": "Which equation is equivalent to \\(y = \\sqrt{x + 5}\\), where \\(y\\) is positive?",
    "options": [
      {
        "text": "\\(\\sqrt{y} = x + 5\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{y} = x + 5\\), which takes a root instead of squaring. A square root is undone by squaring both sides."
      },
      {
        "text": "\\(y^{2} = x + 25\\)",
        "correct": false,
        "feedback": "Chose \\(y^{2} = x + 25\\), which squares the \\(5\\) as well. Squaring a square root gives back what was inside it, \\(x + 5\\)."
      },
      {
        "text": "\\(y^{2} = x + 5\\)",
        "correct": true,
        "feedback": "Correct. Squaring both sides of \\(y = \\sqrt{x + 5}\\) gives \\(y^{2} = x + 5\\). The square root and the square cancel."
      },
      {
        "text": "\\(y^{2} = x^{2} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(y^{2} = x^{2} + 5\\), which squares \\(x\\) but not the \\(5\\). The whole of \\(x + 5\\) is under the root, so squaring gives \\(x + 5\\)."
      }
    ],
    "backward": "Squares and square roots (Ch1).",
    "forward": "In a later chapter you check an inverse function by substituting numbers."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{5x − 20}{x^{2} − 4x}\\).",
    "options": [
      {
        "text": "\\(\\frac{5(x − 4)}{x(x − 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5(x − 4)}{x(x − 4)}\\), factorising correctly but not cancelling the common factor \\((x − 4)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{5}{x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{x^{2}}\\), squaring the \\(x\\). After the bracket is cancelled, the bottom is \\(x\\), not \\(x^{2}\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), cancelling the \\(x\\) as well. The \\(x\\) on the bottom is multiplied by the bracket, but there is no \\(x\\) factor on the top to cancel with."
      },
      {
        "text": "\\(\\frac{5}{x}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(5x − 20 = 5(x − 4)\\). The bottom factorises: \\(x^{2} − 4x = x(x − 4)\\). The common factor \\((x − 4)\\) cancels from the top and the bottom, leaving \\(\\frac{5}{x}\\)."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you simplify fractions with a quadratic on one line and a single bracket on the other."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Only one of these lines is true. Which one?",
    "options": [
      {
        "text": "\\(\\frac{x + 4}{x + 2} = 2\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{x + 2} = 2\\), cancelling the \\(x\\) terms. They are parts of sums, not factors."
      },
      {
        "text": "\\(\\frac{4x + 2}{4} = x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x + 2}{4} = x + 2\\), dividing only the first term by \\(4\\). Every term on the top must be divided by \\(4\\)."
      },
      {
        "text": "\\(\\frac{x^{2} + 4}{x} = x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} + 4}{x} = x + 4\\), cancelling the \\(x\\) on the bottom with the \\(x\\) in \\(x^{2}\\) only. Every term on the top must be divided by \\(x\\)."
      },
      {
        "text": "\\(\\frac{x^{2} + 4x}{x} = x + 4\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{x^{2} + 4x}{x} = x + 4\\) is true: take the factor \\(x\\) out of the top, then cancel. In each wrong line a term, not a factor, was cancelled, or only part of the top was divided."
      }
    ],
    "backward": "Cancelling factors, not terms (Ch2).",
    "forward": "Later in this chapter you test whether a cancelling step is allowed before you write it."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{3x}{x + 3}) × (\\frac{x + 3}{9})\\).",
    "options": [
      {
        "text": "\\(\\frac{3x(x + 3)}{9(x + 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3x(x + 3)}{9(x + 3)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x}{3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{3x(x + 3)}{9(x + 3)}\\). Then cancel the common factors to get \\(\\frac{x}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{x}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      },
      {
        "text": "\\(\\frac{x(x + 3)}{3(x + 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x(x + 3)}{3(x + 3)}\\), cancelling only the numbers. The bracket \\((x + 3)\\) is still on the top and the bottom, so the answer is not fully simplified."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you factorise a quadratic as well before cancelling across two fractions."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Which of these is equal to \\((\\frac{x + 3}{x − 3}) ÷ (\\frac{x + 4}{x − 4})\\)?",
    "options": [
      {
        "text": "\\((\\frac{x − 3}{x + 3}) × (\\frac{x + 4}{x − 4})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 3}{x + 3}) × (\\frac{x + 4}{x − 4})\\), which flips the first fraction instead of the second. Only the fraction you divide by is flipped."
      },
      {
        "text": "\\((\\frac{x + 3}{x − 3}) × (\\frac{x − 4}{x + 4})\\)",
        "correct": true,
        "feedback": "Correct. Dividing by \\((\\frac{x + 4}{x − 4})\\) means multiplying by its reciprocal \\((\\frac{x − 4}{x + 4})\\), and the first fraction stays as it is. So \\((\\frac{x + 3}{x − 3}) ÷ (\\frac{x + 4}{x − 4}) = (\\frac{x + 3}{x − 3}) × (\\frac{x − 4}{x + 4})\\)."
      },
      {
        "text": "\\((\\frac{x − 3}{x + 3}) × (\\frac{x − 4}{x + 4})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 3}{x + 3}) × (\\frac{x − 4}{x + 4})\\), which flips both fractions. Only the second fraction, the one you divide by, is flipped."
      },
      {
        "text": "\\((\\frac{x + 3}{x − 3}) × (\\frac{x + 4}{x − 4})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x + 3}{x − 3}) × (\\frac{x + 4}{x − 4})\\), which multiplies without flipping the second fraction. The second fraction must be turned upside down."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you rewrite a division as a multiplication as the first line of your working."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x + 6}{3} + \\frac{x + 2}{5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{8x + 36}{15}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(15\\). Rewrite both fractions over it: the first top is multiplied by \\(5\\) and the second top is multiplied by \\(3\\). Then add the tops: \\(\\frac{8x + 36}{15}\\)."
      },
      {
        "text": "\\(\\frac{2x + 8}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x + 8}{8}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{2x + 8}{15}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x + 8}{15}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{6x + 32}{15}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x + 32}{15}\\), multiplying the first top by \\(5\\) but not the second top by what its bottom needed. Both tops must be scaled."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you use a common denominator in the same way with brackets on the bottom."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2}{4x + 28} + \\frac{4}{x + 7}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{6}{5x + 35}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6}{5x + 35}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{6}{x + 7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6}{x + 7}\\), using \\(x + 7\\) as the common denominator. The first bottom, \\(4x + 28\\), is not a factor of \\(x + 7\\), so the common denominator must be \\(4(x + 7)\\)."
      },
      {
        "text": "\\(\\frac{9}{2(x + 7)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(4(x + 7)\\). Rewrite both fractions over it: the second top is multiplied by \\(4\\). Then add the tops: \\(\\frac{18}{4(x + 7)}\\), which simplifies to \\(\\frac{9}{2(x + 7)}\\)."
      },
      {
        "text": "\\(\\frac{18x + 126}{(4x + 28)(x + 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{18x + 126}{(4x + 28)(x + 7)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(4(x + 7)\\), exists, so the answer is not fully simplified."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you simplify a bottom before you look for the common denominator."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Which expression is equal to \\((x + 8)^{2} − 8\\)?",
    "options": [
      {
        "text": "\\(x^{2} + 16x − 8\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 16x − 8\\), forgetting the constant \\(64\\) from squaring. \\((x + 8)^{2}\\) has a last term of \\(64\\)."
      },
      {
        "text": "\\(x^{2} + 8x + 56\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 8x + 56\\), getting the middle term as \\(8x\\). \\((x + 8)^{2} = x^{2} + 16x + 64\\), so the middle term is \\(16x\\)."
      },
      {
        "text": "\\(x^{2} + 56\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 56\\), squaring each term separately and missing the middle term. \\((x + 8)^{2} = x^{2} + 16x + 64\\)."
      },
      {
        "text": "\\(x^{2} + 16x + 56\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 8)^{2} = x^{2} + 16x + 64\\), so \\((x + 8)^{2} − 8 = x^{2} + 16x + 56\\)."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you check a completed square by expanding it back."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} + 2x + 13\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x + 1)^{2} − 12\\)",
        "correct": false,
        "feedback": "Chose \\((x + 1)^{2} − 12\\), getting the sign of the last number wrong. \\(13 − 1 = 12\\), so the constant after the bracket is \\(12\\). Expanding gives \\(x^{2} + 2x − 11\\), not the original."
      },
      {
        "text": "\\((x + 2)^{2} + 9\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)^{2} + 9\\), using \\(2\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(1\\). Expanding gives \\(x^{2} + 4x + 13\\), not the original."
      },
      {
        "text": "\\((x + 1)^{2} + 12\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(2\\) is \\(1\\), so write \\((x + 1)^{2}\\). This equals \\(x^{2} + 2x + 1\\), which has an extra \\(1\\). Take it away: \\(x^{2} + 2x + 13 = (x + 1)^{2} + 12\\)."
      },
      {
        "text": "\\((x + 1)^{2} + 13\\)",
        "correct": false,
        "feedback": "Chose \\((x + 1)^{2} + 13\\), forgetting to subtract \\(1\\). The square \\((x + 1)^{2}\\) contains an extra \\(1\\), which must be taken away. Expanding gives \\(x^{2} + 2x + 14\\), not the original."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you use the completed square to find the least value of an expression."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The area of a trapezium is \\(A = \\frac{(a + b)h}{2}\\). Make \\(h\\) the subject.",
    "options": [
      {
        "text": "\\(h = \\frac{2A}{a} − b\\)",
        "correct": false,
        "feedback": "Chose \\(h = \\frac{2A}{a} − b\\), dividing by \\(a\\) and then subtracting \\(b\\). The bracket \\((a + b)\\) multiplies \\(h\\) as a whole, so divide by the whole bracket."
      },
      {
        "text": "\\(h = \\frac{2A}{a + b}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2A = (a + b)h\\). Divide both sides by \\((a + b)\\): \\(h = \\frac{2A}{a + b}\\)."
      },
      {
        "text": "\\(h = 2A − a − b\\)",
        "correct": false,
        "feedback": "Chose \\(h = 2A − a − b\\), subtracting \\(a\\) and \\(b\\). They are multiplied by \\(h\\), not added to it, so divide by \\((a + b)\\)."
      },
      {
        "text": "\\(h = \\frac{a + b}{2A}\\)",
        "correct": false,
        "feedback": "Chose \\(h = \\frac{a + b}{2A}\\), turning the answer upside down. \\(h\\) is found by dividing \\(2A\\) by \\((a + b)\\)."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (area of a trapezium).",
    "forward": "Later in this chapter you meet a formula where the subject is inside a bracket."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Which equation is equivalent to \\(y = 6x − 9\\)?",
    "options": [
      {
        "text": "\\(\\frac{y}{6} + 9 = x\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{y}{6} + 9 = x\\), which divides only \\(y\\) by \\(6\\). The whole of \\(y + 9\\) would have to be divided by \\(6\\)."
      },
      {
        "text": "\\(y + 9 = 6x\\)",
        "correct": true,
        "feedback": "Correct. Add \\(9\\) on both sides of \\(y = 6x − 9\\): \\(y + 9 = 6x\\). The other equations change the sign, lose the \\(6\\), or divide only one term."
      },
      {
        "text": "\\(y − 9 = 6x\\)",
        "correct": false,
        "feedback": "Chose \\(y − 9 = 6x\\), which has the wrong sign. To undo − \\(9\\), do the opposite: add \\(9\\) on both sides."
      },
      {
        "text": "\\(y + 9 = x\\)",
        "correct": false,
        "feedback": "Chose \\(y + 9 = x\\), which has lost the \\(6\\). The \\(6x\\) term stays as \\(6x\\) until both sides are divided by \\(6\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you check a rearranged formula by putting in numbers."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The kinetic energy of a moving object is \\(E = \\frac{mv^{2}}{2}\\). Make \\(v\\) the subject, where \\(v\\) is positive.",
    "options": [
      {
        "text": "\\(v = \\sqrt{2Em}\\)",
        "correct": false,
        "feedback": "Chose \\(v = \\sqrt{2Em}\\), multiplying by \\(m\\) instead of dividing. The \\(m\\) multiplies \\(v^{2}\\), so it is undone by dividing by \\(m\\)."
      },
      {
        "text": "\\(v = \\sqrt{\\frac{E}{2m}}\\)",
        "correct": false,
        "feedback": "Chose \\(v = \\sqrt{\\frac{E}{2m}}\\), dividing by \\(2\\) instead of multiplying by \\(2\\). The \\(2\\) is under the fraction, so it is undone by multiplying both sides by \\(2\\)."
      },
      {
        "text": "\\(v = \\frac{2E}{m}\\)",
        "correct": false,
        "feedback": "Chose \\(v = \\frac{2E}{m}\\), forgetting the square root. The equation gives \\(v^{2} = \\frac{2E}{m}\\)."
      },
      {
        "text": "\\(v = \\sqrt{\\frac{2E}{m}}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2E = mv^{2}\\). Divide by \\(m\\): \\(v^{2} = \\frac{2E}{m}\\). Take the positive square root: \\(v = \\sqrt{\\frac{2E}{m}}\\)."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you rearrange the kinetic energy formula to find speed."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = (x − 7)^{2}\\), where \\(x − 7\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{y} − 7\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 7\\), getting the sign wrong. To undo − \\(7\\), do the opposite: add \\(7\\)."
      },
      {
        "text": "\\(x = y − 49\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 49\\), subtracting instead of taking the square root. A square is undone by a square root."
      },
      {
        "text": "\\(x = \\sqrt{y} − 49\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 49\\), subtracting \\(49\\) instead of \\(7\\). After the square root, the bracket is just \\(x − 7\\), so \\(7\\) is moved."
      },
      {
        "text": "\\(x = \\sqrt{y} + 7\\)",
        "correct": true,
        "feedback": "Correct. Take the square root of both sides, using the positive root where \\(x − 7\\) is positive: \\(\\sqrt{y} = x − 7\\). Then add \\(7\\): \\(x = \\sqrt{y} + 7\\)."
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
  title: "Algebraic Fractions and Rearranging Formulae — Advanced Core",
  subtitle: "Grade 9 · Level 2 · Advanced Core",
  description: "Simplifying, multiplying, dividing, adding and subtracting algebraic fractions, completing the square, and changing the subject of a formula — warm-up, diagnostic, and spaced recheck for advanced core.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic that follows is not timed, but the questions now take two steps: for example, factorise and then cancel, or multiply out and then collect. Write each step on paper before you choose. Some options are a half-finished step, so check that a fraction is fully simplified. Some questions show a learner's working and ask for the first step that goes wrong. Every wrong option describes a common route, so reading the feedback after each question is part of the work.</p><p>You will meet all six topics, mixed together.</p>",
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

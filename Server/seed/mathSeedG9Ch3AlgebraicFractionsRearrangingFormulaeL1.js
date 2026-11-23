// Algebraic Fractions and Rearranging Formulae — Grade 9, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch03-algebraic-fractions-rearranging-formulae-level-1.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch3AlgebraicFractionsRearrangingFormulaeL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-3-algebraic-fractions-rearranging-formulae";
const CHAPTER_NAME = "Algebraic Fractions and Rearranging Formulae";
const LEVEL = 1;

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
    "question": "Simplify \\(\\frac{4x^{3}}{14x}\\).",
    "options": [
      {
        "text": "\\(\\frac{4x^{2}}{14}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x^{2}}{14}\\), cancelling the powers of \\(x\\) but not the numbers \\(4\\) and \\(14\\), which have the common factor \\(2\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{2x^{3}}{7x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x^{3}}{7x}\\), cancelling the numbers \\(4\\) and \\(14\\) but not the powers of \\(x\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{2x^{2}}{7}\\)",
        "correct": true,
        "feedback": "Correct. Divide the top and the bottom by their highest common factor \\(2x\\): the numbers become \\(2\\) and \\(7\\), and \\(x^{3} ÷ x\\) leaves \\(x^{2}\\) on the top. The answer is \\(\\frac{2x^{2}}{7}\\)."
      },
      {
        "text": "\\(−10x^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−10x^{2}\\), subtracting the numbers, \\(4 − 14 = −10\\), instead of dividing them. The numbers are divided, the powers are subtracted."
      }
    ],
    "retryHint": "Divide the numbers first. Then subtract the powers of \\(x\\): the top has more \\(x\\), so some \\(x\\) stays on the top.",
    "backward": "Cancelling a common factor in a fraction, and the laws of indices (Ch1).",
    "forward": "Later in this chapter you cancel brackets in the same way, once the top and bottom are factorised."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x^{2}}{8x}) × (\\frac{5x^{2}}{2x})\\).",
    "options": [
      {
        "text": "\\(\\frac{16}{5x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{16}{5x^{2}}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      },
      {
        "text": "\\(\\frac{5x^{2}}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x^{2}}{8}\\), multiplying the tops but using only one of the bottom numbers. Both bottoms, \\(8\\) and \\(2\\), must be multiplied."
      },
      {
        "text": "\\(\\frac{5x^{4}}{16x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x^{4}}{16x^{2}}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{5x^{2}}{16}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{5x^{4}}{16x^{2}}\\). Then cancel the common factors to get \\(\\frac{5x^{2}}{16}\\)."
      }
    ],
    "retryHint": "Multiply the tops, multiply the bottoms, then cancel the numbers and the powers of \\(x\\).",
    "backward": "Fractions, from Stage 9 (S9-Ch8) and the laws of indices (Ch1).",
    "forward": "Later in this chapter you cancel brackets across two fractions in the same way you cancel powers of \\(x\\) here."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} + 6x − 5\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x + 6)^{2} − 41\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{2} − 41\\), using \\(6\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(3\\). Expanding gives \\(x^{2} + 12x − 5\\), not the original."
      },
      {
        "text": "\\((x + 3)^{2} − 5\\)",
        "correct": false,
        "feedback": "Chose \\((x + 3)^{2} − 5\\), forgetting to subtract \\(9\\). The square \\((x + 3)^{2}\\) contains an extra \\(9\\), which must be taken away. Expanding gives \\(x^{2} + 6x + 4\\), not the original."
      },
      {
        "text": "\\((x + 3)^{2} + 14\\)",
        "correct": false,
        "feedback": "Chose \\((x + 3)^{2} + 14\\), getting the sign of the last number wrong. \\(−5 − 9 = −14\\), so the constant after the bracket is \\(−14\\). Expanding gives \\(x^{2} + 6x + 23\\), not the original."
      },
      {
        "text": "\\((x + 3)^{2} − 14\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(6\\) is \\(3\\), so write \\((x + 3)^{2}\\). This equals \\(x^{2} + 6x + 9\\), which has an extra \\(9\\). Take it away: \\(x^{2} + 6x − 5 = (x + 3)^{2} − 14\\)."
      }
    ],
    "retryHint": "Halve the number in front of \\(x\\) for the bracket. Square it and subtract that square from the constant.",
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you use the completed square to find the least value of an expression."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = 5x + 6\\).",
    "options": [
      {
        "text": "\\(x = y − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 6\\), forgetting to divide by \\(5\\). After taking away \\(6\\), the equation is \\(y − 6 = 5x\\), so both sides must be divided by \\(5\\)."
      },
      {
        "text": "\\(x = 5(y − 6)\\)",
        "correct": false,
        "feedback": "Chose \\(x = 5(y − 6)\\), multiplying by \\(5\\) instead of dividing. The \\(5\\) is multiplying \\(x\\), so it is undone by dividing by \\(5\\)."
      },
      {
        "text": "\\(x = \\frac{y − 6}{5}\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(6\\) from both sides: \\(y − 6 = 5x\\). Then divide both sides by \\(5\\): \\(x = \\frac{y − 6}{5}\\)."
      },
      {
        "text": "\\(x = y − \\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − \\frac{6}{5}\\), dividing only the \\(6\\) by \\(5\\). The whole of \\(y − 6\\) must be divided by \\(5\\)."
      }
    ],
    "retryHint": "Undo the operations on \\(x\\) in reverse order: first undo the addition, then undo the multiplication.",
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae with brackets and fractions in them."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x − 3}{4} − \\frac{3x − 6}{5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{−7x − 39}{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−7x − 39}{20}\\), subtracting only the first term of \\(12x − 24\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(\\frac{2x − 9}{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 9}{20}\\), multiplying the first top by \\(5\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(\\frac{−2x + 3}{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−2x + 3}{20}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{−7x + 9}{20}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(20\\). Rewrite both fractions over it: the first top is multiplied by \\(5\\) and the second top is multiplied by \\(4\\). Then subtract the tops, taking care with every sign: \\(\\frac{−7x + 9}{20}\\)."
      }
    ],
    "retryHint": "Find the smallest number that both bottoms go into. Rewrite each fraction with it, then combine the tops, taking care with the minus sign.",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you use a common denominator in the same way with brackets on the bottom."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{16x + 20}{20}\\).",
    "options": [
      {
        "text": "\\(\\frac{4x + 5}{5}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(16x + 20 = 4(4x + 5)\\). The common factor \\(4\\) cancels from the top and the bottom, leaving \\(\\frac{4x + 5}{5}\\)."
      },
      {
        "text": "\\(\\frac{4(4x + 5)}{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4(4x + 5)}{20}\\), factorising correctly but not cancelling the common factor \\(4\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{4x + 20}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x + 20}{5}\\), dividing only the first term of the top by \\(4\\). Every term on the top must be divided by \\(4\\)."
      },
      {
        "text": "\\(\\frac{5}{4x + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{4x + 5}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      }
    ],
    "retryHint": "Find the biggest number that divides every term on the top and also the bottom, then divide both by it.",
    "backward": "Fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you take a common factor out of a top and bottom before cancelling a bracket."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{x}{6} + 7\\).",
    "options": [
      {
        "text": "\\(x = \\frac{y − 7}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y − 7}{6}\\), dividing by \\(6\\) instead of multiplying. The \\(x\\) is divided by \\(6\\), so it is undone by multiplying by \\(6\\)."
      },
      {
        "text": "\\(x = 6(y + 7)\\)",
        "correct": false,
        "feedback": "Chose \\(x = 6(y + 7)\\), getting the sign wrong. To undo + \\(7\\), do the opposite: subtract \\(7\\)."
      },
      {
        "text": "\\(x = 6y − 7\\)",
        "correct": false,
        "feedback": "Chose \\(x = 6y − 7\\), multiplying only \\(y\\) by \\(6\\). After subtracting \\(7\\), the whole of \\(y − 7\\) is multiplied by \\(6\\), so the bracket is needed."
      },
      {
        "text": "\\(x = 6(y − 7)\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(7\\) on both sides: \\(\\frac{x}{6} = y − 7\\). Multiply both sides by \\(6\\): \\(x = 6(y − 7)\\)."
      }
    ],
    "retryHint": "Subtract the number from both sides, then multiply both sides by the number \\(x\\) is divided by.",
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject is divided by a number and a term is added."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x + 5}{5}) ÷ (\\frac{x + 5}{6})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x + 5)^{2}}{30}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 5)^{2}}{30}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{6}\\), flipping the first fraction instead of the second. The answer is turned upside down."
      },
      {
        "text": "\\(\\frac{6(x + 5)}{5(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6(x + 5)}{5(x + 5)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": true,
        "feedback": "Correct. Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{6(x + 5)}{5(x + 5)}\\). Then cancel the common factors to get \\(\\frac{6}{5}\\)."
      }
    ],
    "retryHint": "Turn the second fraction upside down and multiply. Then cancel what is shared.",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (dividing by a fraction).",
    "forward": "Later in this chapter you divide by a fraction that has brackets in it."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{14x}{2x^{3}}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{x^{2}}\\)",
        "correct": true,
        "feedback": "Correct. Divide the top and the bottom by their highest common factor \\(2x\\): the numbers become \\(7\\) and \\(1\\), and \\(x ÷ x^{3}\\) leaves \\(x^{2}\\) on the bottom. The answer is \\(\\frac{7}{x^{2}}\\)."
      },
      {
        "text": "\\(\\frac{7x}{x^{3}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7x}{x^{3}}\\), cancelling the numbers \\(14\\) and \\(2\\) but not the powers of \\(x\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{7}{x^{3}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7}{x^{3}}\\), getting the power wrong: \\(3 − 1 = 2\\), not \\(3\\)."
      },
      {
        "text": "\\(\\frac{14}{2x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{14}{2x^{2}}\\), cancelling the powers of \\(x\\) but not the numbers \\(14\\) and \\(2\\), which have the common factor \\(2\\). The fraction is not fully simplified."
      }
    ],
    "backward": "The laws of indices for dividing powers (Ch1).",
    "forward": "Later in this chapter you meet fractions where the bracket left over sits on the bottom after cancelling."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x − 8}{x + 8}) × (\\frac{x + 8}{x + 6})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x − 8)(x + 8)}{(x + 8)(x + 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 8)(x + 8)}{(x + 8)(x + 6)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x + 6}{x − 8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 6}{x − 8}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      },
      {
        "text": "\\(\\frac{x − 8}{x + 6}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{(x − 8)(x + 8)}{(x + 8)(x + 6)}\\). Then cancel the common factors to get \\(\\frac{x − 8}{x + 6}\\)."
      },
      {
        "text": "\\(\\frac{x + 8}{x + 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 8}{x + 6}\\), getting a sign wrong in the bracket that is left on the top. The bracket left is \\((x − 8)\\)."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you do the same with quadratics that have to be factorised first."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{4x + 8}{x − 6} − \\frac{2x − 5}{x − 6}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{2x + 3}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x + 3}{x − 6}\\), subtracting only the first term of \\(2x − 5\\). The minus must apply to every term of the second top, so every sign in it changes."
      },
      {
        "text": "\\(\\frac{2x + 13}{x − 6}\\)",
        "correct": true,
        "feedback": "Correct. The bottoms are the same, so combine the tops and keep the bottom: \\(4x + 8 − (2x − 5) = 2x + 13\\). The answer is \\(\\frac{2x + 13}{x − 6}\\)."
      },
      {
        "text": "\\(\\frac{2x + 13}{2x − 12}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x + 13}{2x − 12}\\), adding the bottoms as well as the tops. When the bottoms are already the same, they stay the same."
      },
      {
        "text": "\\(2x + 13\\)",
        "correct": false,
        "feedback": "Chose \\(2x + 13\\), dropping the bottom \\(x − 6\\). The bottom stays when the tops are combined."
      }
    ],
    "backward": "Subtracting fractions with the same denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you simplify the answer after combining, which uses factorising."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} + 12x + 9\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x + 6)^{2} − 27\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(12\\) is \\(6\\), so write \\((x + 6)^{2}\\). This equals \\(x^{2} + 12x + 36\\), which has an extra \\(36\\). Take it away: \\(x^{2} + 12x + 9 = (x + 6)^{2} − 27\\)."
      },
      {
        "text": "\\((x + 12)^{2} − 135\\)",
        "correct": false,
        "feedback": "Chose \\((x + 12)^{2} − 135\\), using \\(12\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(6\\). Expanding gives \\(x^{2} + 24x + 9\\), not the original."
      },
      {
        "text": "\\((x + 6)^{2} + 45\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{2} + 45\\), adding \\(36\\) instead of subtracting it. The square \\((x + 6)^{2}\\) has an extra \\(36\\), so \\(36\\) must be taken away from the constant. Expanding gives \\(x^{2} + 12x + 81\\), not the original."
      },
      {
        "text": "\\((x + 6)^{2} + 9\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)^{2} + 9\\), forgetting to subtract \\(36\\). The square \\((x + 6)^{2}\\) contains an extra \\(36\\), which must be taken away. Expanding gives \\(x^{2} + 12x + 45\\), not the original."
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
    "question": "Make \\(x\\) the subject of \\(y = 4(x + 3)\\).",
    "options": [
      {
        "text": "\\(x = \\frac{y}{4} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{4} + 3\\), getting the sign wrong. Dividing both sides by \\(4\\) gives \\(\\frac{y}{4} = x + 3\\), so \\(3\\) must then be subtracted."
      },
      {
        "text": "\\(x = \\frac{y}{4} − 12\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{4} − 12\\), multiplying \\(3\\) by \\(4\\). After dividing both sides by \\(4\\), the bracket is just \\(x + 3\\), so only \\(3\\) is moved."
      },
      {
        "text": "\\(x = y − 4 − 3\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 4 − 3\\), subtracting \\(4\\) instead of dividing by \\(4\\). The \\(4\\) multiplies the whole bracket, so both sides must be divided by \\(4\\)."
      },
      {
        "text": "\\(x = \\frac{y}{4} − 3\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(4\\): \\(\\frac{y}{4} = x + 3\\). Then subtract \\(3\\) from both sides: \\(x = \\frac{y}{4} − 3\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4) (equations with brackets).",
    "forward": "Later in this chapter you rearrange formulae with a bracket and a fraction together."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = 3x^{2}\\), where \\(x\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\frac{y}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{3}\\), forgetting the square root. The equation gives \\(x^{2} = \\frac{y}{3}\\), and \\(x\\) is the square root of that."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y}{3}}\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(3\\): \\(x^{2} = \\frac{y}{3}\\). Take the square root of both sides, using the positive root: \\(x = \\sqrt{\\frac{y}{3}}\\)."
      },
      {
        "text": "\\(x = \\sqrt{3y}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{3y}\\), multiplying by \\(3\\) instead of dividing. The \\(3\\) multiplies \\(x^{2}\\), so it is undone by dividing by \\(3\\)."
      },
      {
        "text": "\\(x = \\frac{\\sqrt{y}}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{\\sqrt{y}}{3}\\), taking the square root of \\(y\\) only. The whole of \\(\\frac{y}{3}\\) must be square-rooted."
      }
    ],
    "backward": "Square roots (Ch1).",
    "forward": "In a later chapter you use square roots to solve quadratic equations."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{8x − 8}{2x − 2}\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(8x − 8 = 8(x − 1)\\). The bottom factorises: \\(2x − 2 = 2(x − 1)\\). The common factor \\(2(x − 1)\\) cancels from the top and the bottom, leaving \\(4\\)."
      },
      {
        "text": "\\(\\frac{8(x − 1)}{2(x − 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8(x − 1)}{2(x − 1)}\\), factorising correctly but not cancelling the common factor \\(2(x − 1)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{4x − 4}{x − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x − 4}{x − 1}\\), cancelling only the common factor \\(2\\) of the numbers. The same bracket is still on the top and the bottom, so the fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{4x − 8}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x − 8}{x − 2}\\), dividing only the \\(x\\) terms by \\(2\\). Each whole bracket must be divided, not one term of it."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you recognise the same bracket on a top and a bottom when it is hidden inside a quadratic."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "To divide by \\(\\frac{x + 2}{x − 6}\\), what do you multiply by?",
    "options": [
      {
        "text": "\\(\\frac{x − 6}{x + 2}\\)",
        "correct": true,
        "feedback": "Correct. The reciprocal of \\(\\frac{x + 2}{x − 6}\\) is \\(\\frac{x − 6}{x + 2}\\): the top and the bottom swap places and nothing else changes. Dividing by \\(\\frac{x + 2}{x − 6}\\) is the same as multiplying by this reciprocal."
      },
      {
        "text": "\\(−\\frac{x − 6}{x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{x − 6}{x + 2}\\), which has an extra minus sign. The reciprocal of a fraction has the same sign as the fraction."
      },
      {
        "text": "\\(\\frac{x + 6}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 6}{x − 2}\\), which swaps the top and bottom but also changes the signs inside the brackets. The reciprocal swaps the two expressions and keeps each one unchanged."
      },
      {
        "text": "\\(\\frac{x + 2}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 2}{x − 6}\\), which leaves the fraction unchanged. Dividing by a fraction means multiplying by its reciprocal, so the top and bottom must swap places."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you spot, without working it out, what a division needs before it can be cancelled."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{7}{6x} + \\frac{3}{4x}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{46x}{24x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{46x}{24x^{2}}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(12x\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{23}{12x}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(12x\\). Rewrite both fractions over it: the first top is multiplied by \\(2\\) and the second top is multiplied by \\(3\\). Then add the tops: \\(\\frac{23}{12x}\\)."
      },
      {
        "text": "\\(\\frac{10}{12x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{10}{12x}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{10}{10x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{10}{10x}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      }
    ],
    "backward": "Finding a common multiple of two numbers, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use a common denominator when one of the bottoms is a bracket."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} + 10x + 7 = (x + 5)^{2} − 18\\). What is the minimum value of \\(x^{2} + 10x + 7\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Chose \\(7\\), the original constant term. The completed square has a different constant, \\(−18\\), and that is the minimum value."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Chose \\(18\\), the value with the wrong sign. The minimum value is the number added at the end of the form, \\(−18\\), not \\(18\\)."
      },
      {
        "text": "\\(−5\\)",
        "correct": false,
        "feedback": "Chose \\(−5\\), the value of \\(x\\) where the minimum occurs. The question asks for the minimum value of the expression, which is \\(−18\\)."
      },
      {
        "text": "\\(−18\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 5)^{2}\\) is never negative and is \\(0\\) when \\(x = −5\\). So the least value of \\(x^{2} + 10x + 7\\) is the number added at the end: \\(−18\\)."
      }
    ],
    "backward": "Squares are never negative, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you find greatest values as well as least values."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{x − 5}{2}\\).",
    "options": [
      {
        "text": "\\(x = 2y + 5\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2y = x − 5\\). Then add \\(5\\) on both sides: \\(x = 2y + 5\\)."
      },
      {
        "text": "\\(x = \\frac{y + 5}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y + 5}{2}\\), dividing by \\(2\\) instead of multiplying. The \\(2\\) is under \\(x − 5\\), so it is undone by multiplying by \\(2\\)."
      },
      {
        "text": "\\(x = 2(y + 5)\\)",
        "correct": false,
        "feedback": "Chose \\(x = 2(y + 5)\\), combining the \\(5\\) with \\(y\\) before multiplying. The \\(5\\) is inside the fraction with \\(x\\), so multiply both sides by \\(2\\) first."
      },
      {
        "text": "\\(x = y + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x = y + 5\\), forgetting to multiply by \\(2\\). Multiply both sides by \\(2\\): \\(2y = x − 5\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the fraction has a bracket on top."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The area of a circle is \\(A = \\pi r^{2}\\). Make \\(r\\) the subject, where \\(r\\) is positive.",
    "options": [
      {
        "text": "\\(r = \\sqrt{\\frac{A}{\\pi}}\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(\\pi\\): \\(r^{2} = \\frac{A}{\\pi}\\). Take the square root of both sides, using the positive root: \\(r = \\sqrt{\\frac{A}{\\pi}}\\)."
      },
      {
        "text": "\\(r = \\frac{A}{2\\pi}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\frac{A}{2\\pi}\\), treating \\(r^{2}\\) as \\(2r\\). Squaring is undone by a square root, not by dividing by \\(2\\)."
      },
      {
        "text": "\\(r = \\frac{\\sqrt{A}}{\\pi}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\frac{\\sqrt{A}}{\\pi}\\), taking the square root of \\(A\\) only. The whole of \\(\\frac{A}{\\pi}\\) must be square-rooted, because \\(r^{2} = \\frac{A}{\\pi}\\)."
      },
      {
        "text": "\\(r = \\sqrt{A\\pi}\\)",
        "correct": false,
        "feedback": "Chose \\(r = \\sqrt{A\\pi}\\), multiplying by \\(\\pi\\) instead of dividing. The \\(\\pi\\) multiplies \\(r^{2}\\), so it is undone by dividing by \\(\\pi\\)."
      }
    ],
    "backward": "Square roots (Ch1) and the area of a circle, from Stage 9 (S9-Ch2).",
    "forward": "In a later chapter you find the radius of a circle when you know its area."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{6x^{2} + 10x}{10x}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{3x + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{3x + 5}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{3x + 5}{5}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(6x^{2} + 10x = 2x(3x + 5)\\). The common factor \\(2x\\) cancels from the top and the bottom, leaving \\(\\frac{3x + 5}{5}\\)."
      },
      {
        "text": "\\(\\frac{6x + 10}{10}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x + 10}{10}\\), cancelling only the \\(x\\). The top and the bottom still have the common factor \\(2\\), so the fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{6x^{2} + 5}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x^{2} + 5}{5}\\), dividing only the last term of the top by \\(2x\\). Every term on the top must be divided by \\(2x\\)."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you factorise tops and bottoms that are quadratics and cancel whole brackets."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{2x}{x − 5}) × (\\frac{x − 5}{8})\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{x}\\), writing the answer upside down. The top and bottom of the answer have swapped places."
      },
      {
        "text": "\\(\\frac{x(x − 5)}{4(x − 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x(x − 5)}{4(x − 5)}\\), cancelling only the numbers. The bracket \\((x − 5)\\) is still on the top and the bottom, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x}{4}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{2x(x − 5)}{8(x − 5)}\\). Then cancel the common factors to get \\(\\frac{x}{4}\\)."
      },
      {
        "text": "\\(\\frac{2x(x − 5)}{8(x − 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x(x − 5)}{8(x − 5)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you factorise a quadratic as well before cancelling across two fractions."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{x − 3}{6} + \\frac{3x + 4}{4}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{22x + 12}{24}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{22x + 12}{24}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(12\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{11x + 6}{12}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(12\\). Rewrite both fractions over it: the first top is multiplied by \\(2\\) and the second top is multiplied by \\(3\\). Then add the tops: \\(\\frac{11x + 6}{12}\\)."
      },
      {
        "text": "\\(\\frac{5x − 2}{12}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5x − 2}{12}\\), multiplying the first top by \\(2\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(\\frac{4x + 1}{10}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x + 1}{10}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you use a common denominator in the same way with brackets on the bottom."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} − 6x − 5 = (x + p)^{2} + q\\). What is the value of \\(q\\)?",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Chose \\(14\\), the answer with the wrong sign. \\(−5 − 9 = −14\\)."
      },
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), the number in the bracket, \\(p\\). The question asks for \\(q\\), the number added after the bracket."
      },
      {
        "text": "\\(−14\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(−6\\) is \\(−3\\), so \\(p = −3\\). Then \\((x − 3)^{2} = x^{2} − 6x + 9\\), so \\(q = −5 − 9 = −14\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), adding \\(9\\) instead of subtracting it. \\(−5 − 9 = −14\\)."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you use the constant outside the bracket as a least value."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The speed of an object that accelerates steadily is \\(v = u + at\\). Make \\(u\\) the subject.",
    "options": [
      {
        "text": "\\(u = v − at\\)",
        "correct": true,
        "feedback": "Correct. Subtract at from both sides: \\(u = v − at\\)."
      },
      {
        "text": "\\(u = v + at\\)",
        "correct": false,
        "feedback": "Chose \\(u = v + at\\), getting the sign wrong. To undo + \\(at\\), subtract at from both sides."
      },
      {
        "text": "\\(u = at − v\\)",
        "correct": false,
        "feedback": "Chose \\(u = at − v\\), writing the terms in the wrong order. \\(u = v − at\\), which is not the same as \\(at − v\\)."
      },
      {
        "text": "\\(u = v − a − t\\)",
        "correct": false,
        "feedback": "Chose \\(u = v − a − t\\), treating at as two separate terms. \\(at\\) is one term, \\(a\\) multiplied by \\(t\\), so it is subtracted as a whole."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "Later in this chapter you use the same steps for formulae with a square or a root."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = \\sqrt{x − 5}\\).",
    "options": [
      {
        "text": "\\(x = y^{2} + 5\\)",
        "correct": true,
        "feedback": "Correct. Square both sides: \\(y^{2} = x − 5\\). Add \\(5\\) on both sides: \\(x = y^{2} + 5\\)."
      },
      {
        "text": "\\(x = \\sqrt{y} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} + 5\\), taking the square root of \\(y\\) instead of squaring. A square root is undone by squaring."
      },
      {
        "text": "\\(x = (y + 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = (y + 5)^{2}\\), subtracting \\(5\\) before squaring. The \\(5\\) is inside the root, so square both sides first."
      },
      {
        "text": "\\(x = y − 25\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 25\\), squaring only the \\(5\\). To undo the square root, square the whole of both sides: \\(y^{2} = x − 5\\)."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you rearrange to find the inverse of a function."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Which of these is a correct simplification?",
    "options": [
      {
        "text": "\\(\\frac{4x + 5}{4} = x + 5\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x + 5}{4} = x + 5\\), dividing only the first term by \\(4\\). Every term on the top must be divided by \\(4\\)."
      },
      {
        "text": "\\(\\frac{x + 4}{4} = x\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{4} = x\\), cancelling the \\(4\\) on the bottom with the \\(4\\) in the sum on the top. Only a factor of the whole top can be cancelled, and \\(4\\) is not a factor of \\(x + 4\\)."
      },
      {
        "text": "\\(\\frac{x^{2} + 4x}{x} = x + 4\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{x^{2} + 4x}{x} = x + 4\\) is true: take the factor \\(x\\) out of the top, then cancel. In each wrong line a term, not a factor, was cancelled, or only part of the top was divided."
      },
      {
        "text": "\\(\\frac{x + 4}{x + 5} = \\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{x + 5} = \\frac{4}{5}\\), cancelling the \\(x\\) terms. They are parts of sums, not factors."
      }
    ],
    "backward": "Cancelling factors, not terms (Ch2).",
    "forward": "Later in this chapter you test whether a cancelling step is allowed before you write it."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Which of these is equal to \\((\\frac{x − 7}{x − 1}) ÷ (\\frac{x + 6}{x + 5})\\)?",
    "options": [
      {
        "text": "\\((\\frac{x − 7}{x − 1}) × (\\frac{x + 6}{x + 5})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 7}{x − 1}) × (\\frac{x + 6}{x + 5})\\), which multiplies without flipping the second fraction. The second fraction must be turned upside down."
      },
      {
        "text": "\\((\\frac{x − 7}{x − 1}) × (\\frac{x + 5}{x + 6})\\)",
        "correct": true,
        "feedback": "Correct. Dividing by \\((\\frac{x + 6}{x + 5})\\) means multiplying by its reciprocal \\((\\frac{x + 5}{x + 6})\\), and the first fraction stays as it is. So \\((\\frac{x − 7}{x − 1}) ÷ (\\frac{x + 6}{x + 5}) = (\\frac{x − 7}{x − 1}) × (\\frac{x + 5}{x + 6})\\)."
      },
      {
        "text": "\\((\\frac{x − 1}{x − 7}) × (\\frac{x + 6}{x + 5})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 1}{x − 7}) × (\\frac{x + 6}{x + 5})\\), which flips the first fraction instead of the second. Only the fraction you divide by is flipped."
      },
      {
        "text": "\\((\\frac{x − 1}{x − 7}) × (\\frac{x + 5}{x + 6})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 1}{x − 7}) × (\\frac{x + 5}{x + 6})\\), which flips both fractions. Only the second fraction, the one you divide by, is flipped."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you rewrite a division as a multiplication as the first line of your working."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{4x − 1}{x + 5} + \\frac{3x − 2}{x + 5}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{7x − 3}{2x + 10}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7x − 3}{2x + 10}\\), adding the bottoms as well as the tops. When the bottoms are already the same, they stay the same."
      },
      {
        "text": "\\(\\frac{x + 1}{x + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 1}{x + 5}\\), doing the opposite operation on the tops: the question has +, so the tops must be added."
      },
      {
        "text": "\\(\\frac{7x − 3}{x + 5}\\)",
        "correct": true,
        "feedback": "Correct. The bottoms are the same, so combine the tops and keep the bottom: \\(4x − 1 + (3x − 2) = 7x − 3\\). The answer is \\(\\frac{7x − 3}{x + 5}\\)."
      },
      {
        "text": "\\(7x − 3\\)",
        "correct": false,
        "feedback": "Chose \\(7x − 3\\), dropping the bottom \\(x + 5\\). The bottom stays when the tops are combined."
      }
    ],
    "backward": "Subtracting fractions with the same denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you simplify the answer after combining, which uses factorising."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Which expression is equal to \\((x + 5)^{2} + 11\\)?",
    "options": [
      {
        "text": "\\(x^{2} + 5x + 36\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 5x + 36\\), getting the middle term as \\(5x\\). \\((x + 5)^{2} = x^{2} + 10x + 25\\), so the middle term is \\(10x\\)."
      },
      {
        "text": "\\(x^{2} + 10x + 36\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 5)^{2} = x^{2} + 10x + 25\\), so \\((x + 5)^{2} + 11 = x^{2} + 10x + 36\\)."
      },
      {
        "text": "\\(x^{2} + 36\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 36\\), squaring each term separately and missing the middle term. \\((x + 5)^{2} = x^{2} + 10x + 25\\)."
      },
      {
        "text": "\\(x^{2} + 10x + 11\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} + 10x + 11\\), forgetting the constant \\(25\\) from squaring. \\((x + 5)^{2}\\) has a last term of \\(25\\)."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you check a completed square by expanding it back."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Which equation is equivalent to \\(y = 3x + 3\\)?",
    "options": [
      {
        "text": "\\(y + 3 = 3x\\)",
        "correct": false,
        "feedback": "Chose \\(y + 3 = 3x\\), which has the wrong sign. To undo + \\(3\\), do the opposite: subtract \\(3\\) on both sides."
      },
      {
        "text": "\\(y − 3 = x\\)",
        "correct": false,
        "feedback": "Chose \\(y − 3 = x\\), which has lost the \\(3\\). The \\(3x\\) term stays as \\(3x\\) until both sides are divided by \\(3\\)."
      },
      {
        "text": "\\(\\frac{y}{3} − 3 = x\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{y}{3} − 3 = x\\), which divides only \\(y\\) by \\(3\\). The whole of \\(y − 3\\) would have to be divided by \\(3\\)."
      },
      {
        "text": "\\(y − 3 = 3x\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(3\\) on both sides of \\(y = 3x + 3\\): \\(y − 3 = 3x\\). The other equations change the sign, lose the \\(3\\), or divide only one term."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you check a rearranged formula by putting in numbers."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Which equation is equivalent to \\(y = (x + 2)^{2}\\), where \\(x + 2\\) is positive?",
    "options": [
      {
        "text": "\\(\\sqrt{y} = x^{2} + 2\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{y} = x^{2} + 2\\), which squares \\(x\\) on its own. The square root of \\((x + 2)^{2}\\) is \\(x + 2\\)."
      },
      {
        "text": "\\(y^{2} = x + 2\\)",
        "correct": false,
        "feedback": "Chose \\(y^{2} = x + 2\\), which squares \\(y\\) instead of taking its root. A square is undone by a square root."
      },
      {
        "text": "\\(\\sqrt{y} = x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{y} = x + 4\\), which squares the \\(2\\). The square root of \\((x + 2)^{2}\\) is \\(x + 2\\)."
      },
      {
        "text": "\\(\\sqrt{y} = x + 2\\)",
        "correct": true,
        "feedback": "Correct. Taking the square root of both sides of \\(y = (x + 2)^{2}\\) gives \\(\\sqrt{y} = x + 2\\), using the positive root because \\(x + 2\\) is positive."
      }
    ],
    "backward": "Squares and square roots (Ch1).",
    "forward": "In a later chapter you decide whether a rearranged formula is equivalent by testing values."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x + 3}{x + 8}\\) as far as possible.",
    "options": [
      {
        "text": "\\(1 + \\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(1 + \\frac{3}{8}\\), cancelling the \\(x\\) terms and then adding the leftover numbers on top of \\(1\\). Parts of a sum cannot be cancelled, so nothing changes."
      },
      {
        "text": "\\(−5\\)",
        "correct": false,
        "feedback": "Chose \\(−5\\), subtracting the bottom from the top, \\(3 − 8\\). Fractions are simplified by dividing out common factors, not by subtracting."
      },
      {
        "text": "It cannot be simplified",
        "correct": true,
        "feedback": "Correct. Neither \\(x + 3\\) nor \\(x + 8\\) can be factorised, and they have no common factor, so nothing cancels. The fraction cannot be simplified."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{8}\\), cancelling the \\(x\\) terms. The \\(x\\) terms are parts of sums, not factors, so they cannot be cancelled."
      }
    ],
    "backward": "Factors and terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you decide quickly whether a fraction can be simplified before you start work on it."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{3x + 9}{6x + 18}\\).",
    "options": [
      {
        "text": "\\(\\frac{3(x + 3)}{6(x + 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3(x + 3)}{6(x + 3)}\\), factorising correctly but not cancelling the common factor \\(3(x + 3)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(3x + 9 = 3(x + 3)\\). The bottom factorises: \\(6x + 18 = 6(x + 3)\\). The common factor \\(3(x + 3)\\) cancels from the top and the bottom, leaving \\(\\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{x + 9}{2x + 18}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 9}{2x + 18}\\), dividing only the \\(x\\) terms by \\(3\\). Each whole bracket must be divided, not one term of it."
      },
      {
        "text": "\\(\\frac{x + 3}{2x + 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 3}{2x + 6}\\), cancelling only the common factor \\(3\\) of the numbers. The same bracket is still on the top and the bottom, so the fraction is not fully simplified."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you recognise the same bracket on a top and a bottom when it is hidden inside a quadratic."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{x − 6}{x + 6}) ÷ (\\frac{x − 8}{x + 6})\\).",
    "options": [
      {
        "text": "\\(\\frac{x − 8}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 8}{x − 6}\\), flipping the first fraction instead of the second. The answer is turned upside down."
      },
      {
        "text": "\\(\\frac{x − 6}{x − 8}\\)",
        "correct": true,
        "feedback": "Correct. Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{(x − 6)(x + 6)}{(x + 6)(x − 8)}\\). Then cancel the common factors to get \\(\\frac{x − 6}{x − 8}\\)."
      },
      {
        "text": "\\(\\frac{(x − 8)(x − 6)}{(x + 6)^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 8)(x − 6)}{(x + 6)^{2}}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
      },
      {
        "text": "\\(\\frac{(x − 6)(x + 6)}{(x + 6)(x − 8)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 6)(x + 6)}{(x + 6)(x − 8)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (dividing by a fraction).",
    "forward": "Later in this chapter you divide fractions that contain quadratics."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "Simplify \\((\\frac{2x}{5}) × (\\frac{x}{6x^{2}})\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{15}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{2x^{2}}{30x^{2}}\\). Then cancel the common factors to get \\(\\frac{1}{15}\\)."
      },
      {
        "text": "\\(\\frac{x^{4}}{15}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{4}}{15}\\), adding the powers on the top and on the bottom, instead of subtracting the bottom power from the top power."
      },
      {
        "text": "\\(\\frac{2x^{2}}{30x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x^{2}}{30x^{2}}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{5}\\), multiplying the tops but using only one of the bottom numbers. Both bottoms, \\(5\\) and \\(6\\), must be multiplied."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) and the laws of indices (Ch1).",
    "forward": "Later in this chapter you cancel brackets across two fractions in the same way you cancel powers of \\(x\\) here."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{3}{5x} + \\frac{5}{4x}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{8}{20x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8}{20x}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{8}{9x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8}{9x}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{37x}{20x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{37x}{20x^{2}}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(20x\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{37}{20x}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(20x\\). Rewrite both fractions over it: the first top is multiplied by \\(4\\) and the second top is multiplied by \\(5\\). Then add the tops: \\(\\frac{37}{20x}\\)."
      }
    ],
    "backward": "Finding a common multiple of two numbers, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use a common denominator when one of the bottoms is a bracket."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2x − 6}{2} − \\frac{2x + 4}{3}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{2x − 10}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 10}{6}\\), subtracting only the first term of \\(4x + 8\\). The minus must apply to every term of the second top, so the signs of all its terms change."
      },
      {
        "text": "\\(\\frac{x − 13}{3}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(6\\). Rewrite both fractions over it: the first top is multiplied by \\(3\\) and the second top is multiplied by \\(2\\). Then subtract the tops, taking care with every sign: \\(\\frac{2x − 26}{6}\\), which simplifies to \\(\\frac{x − 13}{3}\\)."
      },
      {
        "text": "\\(\\frac{4x − 22}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x − 22}{6}\\), multiplying the first top by \\(3\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(−\\frac{10}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{10}{6}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you use a common denominator in the same way with brackets on the bottom."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "Write \\(x^{2} + 4x − 8\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x + 4)^{2} − 24\\)",
        "correct": false,
        "feedback": "Chose \\((x + 4)^{2} − 24\\), using \\(4\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(2\\). Expanding gives \\(x^{2} + 8x − 8\\), not the original."
      },
      {
        "text": "\\((x + 2)^{2} − 12\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(4\\) is \\(2\\), so write \\((x + 2)^{2}\\). This equals \\(x^{2} + 4x + 4\\), which has an extra \\(4\\). Take it away: \\(x^{2} + 4x − 8 = (x + 2)^{2} − 12\\)."
      },
      {
        "text": "\\((x + 2)^{2} − 8\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)^{2} − 8\\), forgetting to subtract \\(4\\). The square \\((x + 2)^{2}\\) contains an extra \\(4\\), which must be taken away. Expanding gives \\(x^{2} + 4x − 4\\), not the original."
      },
      {
        "text": "\\((x + 2)^{2} − 4\\)",
        "correct": false,
        "feedback": "Chose \\((x + 2)^{2} − 4\\), adding \\(4\\) instead of subtracting it. The square \\((x + 2)^{2}\\) has an extra \\(4\\), so \\(4\\) must be taken away from the constant. Expanding gives \\(x^{2} + 4x\\), not the original."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you use the completed square to find the least value of an expression."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "What number must be added to \\(x^{2} − 16x\\) to make a perfect square?",
    "options": [
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Chose \\(16\\), the number in front of \\(x\\). The number to add is the square of half of it, so \\(64\\)."
      },
      {
        "text": "\\(256\\)",
        "correct": false,
        "feedback": "Chose \\(256\\), the square of \\(16\\). The number to add is the square of half of \\(16\\), so \\(64\\)."
      },
      {
        "text": "\\(64\\)",
        "correct": true,
        "feedback": "Correct. \\((x − 8)^{2} = x^{2} − 16x + 64\\). Compared with \\(x^{2} − 16x\\), the extra term is \\(64\\), so \\(64\\) must be added to make a perfect square."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Chose \\(32\\), doubling \\(16\\). The number to add is the square of half of \\(16\\), so \\(64\\)."
      }
    ],
    "backward": "Perfect squares such as \\((x + 3)^{2}\\) (Ch2).",
    "forward": "Later in this chapter you use the number that completes the square to write a quadratic in a new form."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Make \\(x\\) the subject of \\(y = 9 − 5x\\).",
    "options": [
      {
        "text": "\\(x = \\frac{9 − y}{5}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(5x\\) to both sides: \\(5x + y = 9\\). Subtract \\(y\\) from both sides: \\(5x = 9 − y\\). Divide by \\(5\\): \\(x = \\frac{9 − y}{5}\\)."
      },
      {
        "text": "\\(x = 9 − y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 9 − y\\), forgetting to divide by \\(5\\). The equation \\(5x = 9 − y\\) must be divided by \\(5\\)."
      },
      {
        "text": "\\(x = \\frac{9 + y}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{9 + y}{5}\\), adding \\(y\\) instead of subtracting it. From \\(y = 9 − 5x\\), add \\(5x\\) to both sides to get \\(5x + y = 9\\), then subtract \\(y\\)."
      },
      {
        "text": "\\(x = 9 − \\frac{y}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = 9 − \\frac{y}{5}\\), dividing only \\(y\\) by \\(5\\). The whole of \\(9 − y\\) must be divided by \\(5\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject has a negative sign."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "The perimeter of a rectangle is \\(P = 2(l + w)\\). Make \\(l\\) the subject.",
    "options": [
      {
        "text": "\\(l = P − 2 − w\\)",
        "correct": false,
        "feedback": "Chose \\(l = P − 2 − w\\), subtracting \\(2\\) instead of dividing by \\(2\\). The \\(2\\) multiplies the bracket, so divide both sides by \\(2\\)."
      },
      {
        "text": "\\(l = \\frac{P}{2} − 2w\\)",
        "correct": false,
        "feedback": "Chose \\(l = \\frac{P}{2} − 2w\\), multiplying \\(w\\) by \\(2\\). After dividing both sides by \\(2\\) the bracket is just \\(l + w\\), so only \\(w\\) is moved."
      },
      {
        "text": "\\(l = \\frac{P − w}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(l = \\frac{P − w}{2}\\), subtracting \\(w\\) before dividing by \\(2\\). The \\(w\\) is inside the bracket with \\(l\\), so divide by \\(2\\) first."
      },
      {
        "text": "\\(l = \\frac{P}{2} − w\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(2\\): \\(\\frac{P}{2} = l + w\\). Subtract \\(w\\) from both sides: \\(l = \\frac{P}{2} − w\\)."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "Later in this chapter you rearrange the area of a trapezium in the same way."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The energy equivalent of a mass \\(m\\) is \\(E = mc^{2}\\). Make \\(c\\) the subject, where \\(c\\) is positive.",
    "options": [
      {
        "text": "\\(c = \\sqrt{Em}\\)",
        "correct": false,
        "feedback": "Chose \\(c = \\sqrt{Em}\\), multiplying by \\(m\\) instead of dividing. The \\(m\\) multiplies \\(c^{2}\\), so it is undone by dividing by \\(m\\)."
      },
      {
        "text": "\\(c = \\frac{E}{m^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(c = \\frac{E}{m^{2}}\\), dividing by \\(m\\) twice. Divide by \\(m\\) once to get \\(c^{2} = \\frac{E}{m}\\), then take the square root."
      },
      {
        "text": "\\(c = \\sqrt{\\frac{E}{m}}\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(m\\): \\(c^{2} = \\frac{E}{m}\\). Take the square root of both sides, using the positive root: \\(c = \\sqrt{\\frac{E}{m}}\\)."
      },
      {
        "text": "\\(c = \\frac{E}{m}\\)",
        "correct": false,
        "feedback": "Chose \\(c = \\frac{E}{m}\\), forgetting the square root. The equation gives \\(c^{2} = \\frac{E}{m}\\), and \\(c\\) is the square root of that."
      }
    ],
    "backward": "Square roots (Ch1).",
    "forward": "In a later chapter you rearrange formulae from science with a square in them."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "The speed of an object falling from rest through a height \\(h\\) is \\(v = \\sqrt{2gh}\\). Make \\(h\\) the subject.",
    "options": [
      {
        "text": "\\(h = \\frac{v}{2g}\\)",
        "correct": false,
        "feedback": "Chose \\(h = \\frac{v}{2g}\\), forgetting to square \\(v\\). To undo the square root, square both sides: \\(v^{2} = 2gh\\)."
      },
      {
        "text": "\\(h = \\frac{2g}{v^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(h = \\frac{2g}{v^{2}}\\), turning the answer upside down. \\(v^{2} = 2gh\\) means \\(h = v^{2} ÷ 2g\\)."
      },
      {
        "text": "\\(h = \\frac{v^{2}}{2g}\\)",
        "correct": true,
        "feedback": "Correct. Square both sides: \\(v^{2} = 2gh\\). Divide both sides by \\(2g\\): \\(h = \\frac{v^{2}}{2g}\\)."
      },
      {
        "text": "\\(h = \\frac{v^{2}}{g}\\)",
        "correct": false,
        "feedback": "Chose \\(h = \\frac{v^{2}}{g}\\), forgetting the \\(2\\). The right side is \\(2gh\\), so divide by \\(2g\\), not just \\(g\\)."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you find the height from a speed in free-fall problems."
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
  title: "Algebraic Fractions and Rearranging Formulae — Core Fluency",
  subtitle: "Grade 9 · Level 1 · Core Fluency",
  description: "Simplifying, multiplying, dividing, adding and subtracting algebraic fractions, completing the square, and changing the subject of a formula — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: simplifying algebraic fractions, multiplying and dividing them, adding and subtracting them, completing the square, and changing the subject of a formula. No calculator is needed. For each question, ask yourself first what kind of fraction or formula you are looking at, then work it out on paper before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

// Algebraic Fractions and Rearranging Formulae — Grade 9, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch03-algebraic-fractions-rearranging-formulae-level-4.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch3AlgebraicFractionsRearrangingFormulaeL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-3-algebraic-fractions-rearranging-formulae";
const CHAPTER_NAME = "Algebraic Fractions and Rearranging Formulae";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Simplify \\(\\frac{8x − 16}{4x − 8}\\).",
    "options": [
      {
        "text": "\\(\\frac{2x − 16}{x − 8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 16}{x − 8}\\), dividing only the \\(x\\) terms by \\(4\\). Each whole bracket must be divided, not one term of it."
      },
      {
        "text": "\\(\\frac{8(x − 2)}{4(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{8(x − 2)}{4(x − 2)}\\), factorising correctly but not cancelling the common factor \\(4(x − 2)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(8x − 16 = 8(x − 2)\\). The bottom factorises: \\(4x − 8 = 4(x − 2)\\). The common factor \\(4(x − 2)\\) cancels from the top and the bottom, leaving \\(2\\)."
      },
      {
        "text": "\\(\\frac{2x − 4}{x − 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 4}{x − 2}\\), cancelling only the common factor \\(4\\) of the numbers. The same bracket is still on the top and the bottom, so the fraction is not fully simplified."
      }
    ],
    "retryHint": "Factorise the top and the bottom separately. Spot the bracket that appears on both, and cancel it.",
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you recognise the same bracket on a top and a bottom when it is hidden inside a quadratic."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "tier": "S",
    "question": "Simplify \\((\\frac{2x}{x − 7}) × (\\frac{x − 7}{4})\\).",
    "options": [
      {
        "text": "\\(\\frac{2x(x − 7)}{4(x − 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x(x − 7)}{4(x − 7)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x}{2}\\)",
        "correct": true,
        "feedback": "Correct. Multiply across: \\(\\frac{2x(x − 7)}{4(x − 7)}\\). Then cancel the common factors to get \\(\\frac{x}{2}\\)."
      },
      {
        "text": "\\(\\frac{2x}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x}{4}\\), cancelling only the bracket \\((x − 7)\\). The numbers \\(2\\) and \\(4\\) have a common factor \\(2\\), so the answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{x(x − 7)}{2(x − 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x(x − 7)}{2(x − 7)}\\), cancelling only the numbers. The bracket \\((x − 7)\\) is still on the top and the bottom, so the answer is not fully simplified."
      }
    ],
    "retryHint": "Cancel the common bracket across the two fractions first. Then deal with the numbers and the \\(x\\) on top and bottom.",
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you factorise a quadratic as well before cancelling across two fractions."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "tier": "S",
    "question": "Write \\(\\frac{1}{x} − \\frac{2}{x − 2}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{−x − 2}{x(x − 2)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(x(x − 2)\\). Rewrite both fractions over it: the first top is multiplied by \\((x − 2)\\) and the second top is multiplied by \\(x\\). Then subtract the tops, taking care with every sign: \\(\\frac{−x − 2}{x(x − 2)}\\)."
      },
      {
        "text": "\\(−\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{1}{2}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      },
      {
        "text": "\\(\\frac{x − 4}{x(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{x(x − 2)}\\), multiplying the first top by \\((x − 2)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(−\\frac{1}{x(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{1}{x(x − 2)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      }
    ],
    "retryHint": "The common denominator is the product of the two bottoms. Multiply each top by the part its bottom was missing.",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (common denominators).",
    "forward": "Later in this chapter you do the same when the tops are also brackets."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "tier": "S",
    "question": "What number must be added to \\(x^{2} + 6x\\) to make a perfect square?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), half of \\(6\\). The number to add is the square of half the number in front of \\(x\\), so \\(9\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), the square of \\(6\\). The number to add is the square of half of \\(6\\), so \\(9\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), the number in front of \\(x\\). The number to add is the square of half of it, so \\(9\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\((x + 3)^{2} = x^{2} + 6x + 9\\). Compared with \\(x^{2} + 6x\\), the extra term is \\(9\\), so \\(9\\) must be added to make a perfect square."
      }
    ],
    "retryHint": "Half the number in front of \\(x\\), then square it. That is the number to add.",
    "backward": "Perfect squares such as \\((x + 3)^{2}\\) (Ch2).",
    "forward": "Later in this chapter you use the number that completes the square to write a quadratic in a new form."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "S",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{x − 6}{2}\\).",
    "options": [
      {
        "text": "\\(x = y + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x = y + 6\\), forgetting to multiply by \\(2\\). Multiply both sides by \\(2\\): \\(2y = x − 6\\)."
      },
      {
        "text": "\\(x = 2y + 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2y = x − 6\\). Then add \\(6\\) on both sides: \\(x = 2y + 6\\)."
      },
      {
        "text": "\\(x = \\frac{y + 6}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y + 6}{2}\\), dividing by \\(2\\) instead of multiplying. The \\(2\\) is under \\(x − 6\\), so it is undone by multiplying by \\(2\\)."
      },
      {
        "text": "\\(x = 2(y + 6)\\)",
        "correct": false,
        "feedback": "Chose \\(x = 2(y + 6)\\), combining the \\(6\\) with \\(y\\) before multiplying. The \\(6\\) is inside the fraction with \\(x\\), so multiply both sides by \\(2\\) first."
      }
    ],
    "retryHint": "Multiply both sides by the number on the bottom first. Then undo the number that is added to or taken away from \\(x\\).",
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the fraction has a bracket on top."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "tier": "S",
    "question": "Make \\(x\\) the subject of \\(y = 5x^{2}\\), where \\(x\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{5y}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{5y}\\), multiplying by \\(5\\) instead of dividing. The \\(5\\) multiplies \\(x^{2}\\), so it is undone by dividing by \\(5\\)."
      },
      {
        "text": "\\(x = \\sqrt{\\frac{y}{5}}\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by \\(5\\): \\(x^{2} = \\frac{y}{5}\\). Take the square root of both sides, using the positive root: \\(x = \\sqrt{\\frac{y}{5}}\\)."
      },
      {
        "text": "\\(x = \\frac{\\sqrt{y}}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{\\sqrt{y}}{5}\\), taking the square root of \\(y\\) only. The whole of \\(\\frac{y}{5}\\) must be square-rooted."
      },
      {
        "text": "\\(x = \\frac{y}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{5}\\), forgetting the square root. The equation gives \\(x^{2} = \\frac{y}{5}\\), and \\(x\\) is the square root of that."
      }
    ],
    "retryHint": "Divide both sides by the number in front of \\(x^{2}\\). Then take the square root of both sides.",
    "backward": "Square roots (Ch1).",
    "forward": "In a later chapter you use square roots to solve quadratic equations."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "tier": "S",
    "question": "Simplify \\(\\frac{6x − 36}{x^{2} − 6x}\\).",
    "options": [
      {
        "text": "\\(\\frac{x}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x}{6}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{6(x − 6)}{x(x − 6)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6(x − 6)}{x(x − 6)}\\), factorising correctly but not cancelling the common factor \\((x − 6)\\). The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{6}{x^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6}{x^{2}}\\), squaring the \\(x\\). After the bracket is cancelled, the bottom is \\(x\\), not \\(x^{2}\\)."
      },
      {
        "text": "\\(\\frac{6}{x}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(6x − 36 = 6(x − 6)\\). The bottom factorises: \\(x^{2} − 6x = x(x − 6)\\). The common factor \\((x − 6)\\) cancels from the top and the bottom, leaving \\(\\frac{6}{x}\\)."
      }
    ],
    "retryHint": "Take the common factor out of the top. Then factorise the bottom: look for an \\(x\\) you can take out. Cancel what is shared.",
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you simplify fractions with a quadratic on one line and a single bracket on the other."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "S",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{12}{x}\\).",
    "options": [
      {
        "text": "\\(x = 12 − y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 12 − y\\), subtracting. The equation \\(y = \\frac{12}{x}\\) means \\(xy = 12\\), so \\(x = \\frac{12}{y}\\)."
      },
      {
        "text": "\\(x = \\frac{y}{12}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y}{12}\\), turning the fraction upside down. Multiply both sides by \\(x\\) to get \\(xy = 12\\), then divide by \\(y\\)."
      },
      {
        "text": "\\(x = 12y\\)",
        "correct": false,
        "feedback": "Chose \\(x = 12y\\), multiplying by \\(y\\) instead of dividing. From \\(xy = 12\\), divide both sides by \\(y\\)."
      },
      {
        "text": "\\(x = \\frac{12}{y}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(x\\): \\(xy = 12\\). Divide both sides by \\(y\\): \\(x = \\frac{12}{y}\\)."
      }
    ],
    "retryHint": "Multiply both sides by \\(x\\) to get it off the bottom. Then divide both sides by \\(y\\).",
    "backward": "Fractions, from Stage 9 (S9-Ch8) (reciprocals).",
    "forward": "Later in this chapter you rearrange when the subject is in the bottom of a fraction with a bracket."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "tier": "T",
    "question": "Simplify \\(\\frac{x^{2} − 16}{x + 5}\\) as far as possible.",
    "options": [
      {
        "text": "\\(x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(x + 4\\), cancelling \\((x − 4)\\) on the top with \\((x + 5)\\) on the bottom as if they were the same. They are different brackets, so nothing cancels."
      },
      {
        "text": "\\(x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x − 4\\), cancelling \\((x + 4)\\) on the top with \\((x + 5)\\) on the bottom as if they were the same. They are different brackets, so nothing cancels."
      },
      {
        "text": "It cannot be simplified",
        "correct": true,
        "feedback": "Correct. The top factorises as \\(x^{2} − 16 = (x − 4)(x + 4)\\). The bottom is \\(x + 5\\), which is not the same as either bracket. There is no common factor, so the fraction cannot be simplified."
      },
      {
        "text": "\\(\\frac{x^{2} − 16}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} − 16}{5}\\), cancelling the \\(x\\) on the bottom with an \\(x\\) on the top. The \\(x\\) on the bottom is part of a sum, so it cannot be cancelled."
      }
    ],
    "backward": "The difference of two squares (Ch2).",
    "forward": "Later in this chapter you check that a bracket really appears on both lines before you cancel."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "tier": "T",
    "question": "Which of these is equal to \\((\\frac{x + 2}{x − 6}) ÷ (\\frac{x − 4}{x − 7})\\)?",
    "options": [
      {
        "text": "\\((\\frac{x − 6}{x + 2}) × (\\frac{x − 4}{x − 7})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 6}{x + 2}) × (\\frac{x − 4}{x − 7})\\), which flips the first fraction instead of the second. Only the fraction you divide by is flipped."
      },
      {
        "text": "\\((\\frac{x − 6}{x + 2}) × (\\frac{x − 7}{x − 4})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x − 6}{x + 2}) × (\\frac{x − 7}{x − 4})\\), which flips both fractions. Only the second fraction, the one you divide by, is flipped."
      },
      {
        "text": "\\((\\frac{x + 2}{x − 6}) × (\\frac{x − 7}{x − 4})\\)",
        "correct": true,
        "feedback": "Correct. Dividing by \\((\\frac{x − 4}{x − 7})\\) means multiplying by its reciprocal \\((\\frac{x − 7}{x − 4})\\), and the first fraction stays as it is. So \\((\\frac{x + 2}{x − 6}) ÷ (\\frac{x − 4}{x − 7}) = (\\frac{x + 2}{x − 6}) × (\\frac{x − 7}{x − 4})\\)."
      },
      {
        "text": "\\((\\frac{x + 2}{x − 6}) × (\\frac{x − 4}{x − 7})\\)",
        "correct": false,
        "feedback": "Chose \\((\\frac{x + 2}{x − 6}) × (\\frac{x − 4}{x − 7})\\), which multiplies without flipping the second fraction. The second fraction must be turned upside down."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you rewrite a division as a multiplication as the first line of your working."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "tier": "T",
    "question": "What is the lowest common denominator of \\(\\frac{1}{x^{2} − 36} + \\frac{1}{x − 6}\\)?",
    "options": [
      {
        "text": "\\(x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(x + 6\\), using the factor of \\(x^{2} − 36\\) that is not in \\(x − 6\\). The common denominator needs both factors of \\(x^{2} − 36\\)."
      },
      {
        "text": "\\((x − 6)(x + 6)\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{2} − 36 = (x − 6)(x + 6)\\), which already contains the other bottom \\((x − 6)\\). So the lowest common denominator is \\((x − 6)(x + 6)\\)."
      },
      {
        "text": "\\((x + 6)(x − 6)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\((x + 6)(x − 6)^{2}\\), multiplying the two bottoms together. The bottom \\(x − 6\\) is already a factor of \\(x^{2} − 36\\), so it does not need to be included again."
      },
      {
        "text": "\\(x − 6\\)",
        "correct": false,
        "feedback": "Chose \\(x − 6\\), using only the smaller bottom. The common denominator must be divisible by \\(x^{2} − 36\\) too, and \\(x − 6\\) is not."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you use the lowest common denominator to keep the working short."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "tier": "T",
    "question": "Which expression is equal to \\((x − 2)^{2} − 8\\)?",
    "options": [
      {
        "text": "\\(x^{2} − 4x − 4\\)",
        "correct": true,
        "feedback": "Correct. \\((x − 2)^{2} = x^{2} − 4x + 4\\), so \\((x − 2)^{2} − 8 = x^{2} − 4x − 4\\)."
      },
      {
        "text": "\\(x^{2} − 4x − 8\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 4x − 8\\), forgetting the constant \\(4\\) from squaring. \\((x − 2)^{2}\\) has a last term of \\(4\\)."
      },
      {
        "text": "\\(x^{2} − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 4\\), squaring each term separately and missing the middle term. \\((x − 2)^{2} = x^{2} − 4x + 4\\)."
      },
      {
        "text": "\\(x^{2} − 2x − 4\\)",
        "correct": false,
        "feedback": "Chose \\(x^{2} − 2x − 4\\), getting the middle term as \\(−2x\\). \\((x − 2)^{2} = x^{2} − 4x + 4\\), so the middle term is \\(−4x\\)."
      }
    ],
    "backward": "Expanding a squared bracket (Ch2).",
    "forward": "Later in this chapter you check a completed square by expanding it back."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "T",
    "question": "Which equation is equivalent to \\(y = 2x − 5\\)?",
    "options": [
      {
        "text": "\\(\\frac{y}{2} + 5 = x\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{y}{2} + 5 = x\\), which divides only \\(y\\) by \\(2\\). The whole of \\(y + 5\\) would have to be divided by \\(2\\)."
      },
      {
        "text": "\\(y + 5 = 2x\\)",
        "correct": true,
        "feedback": "Correct. Add \\(5\\) on both sides of \\(y = 2x − 5\\): \\(y + 5 = 2x\\). The other equations change the sign, lose the \\(2\\), or divide only one term."
      },
      {
        "text": "\\(y + 5 = x\\)",
        "correct": false,
        "feedback": "Chose \\(y + 5 = x\\), which has lost the \\(2\\). The \\(2x\\) term stays as \\(2x\\) until both sides are divided by \\(2\\)."
      },
      {
        "text": "\\(y − 5 = 2x\\)",
        "correct": false,
        "feedback": "Chose \\(y − 5 = 2x\\), which has the wrong sign. To undo − \\(5\\), do the opposite: add \\(5\\) on both sides."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you check a rearranged formula by putting in numbers."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "tier": "T",
    "question": "Which equation is equivalent to \\(y = (x + 6)^{2}\\), where \\(x + 6\\) is positive?",
    "options": [
      {
        "text": "\\(\\sqrt{y} = x + 6\\)",
        "correct": true,
        "feedback": "Correct. Taking the square root of both sides of \\(y = (x + 6)^{2}\\) gives \\(\\sqrt{y} = x + 6\\), using the positive root because \\(x + 6\\) is positive."
      },
      {
        "text": "\\(\\sqrt{y} = x^{2} + 6\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{y} = x^{2} + 6\\), which squares \\(x\\) on its own. The square root of \\((x + 6)^{2}\\) is \\(x + 6\\)."
      },
      {
        "text": "\\(\\sqrt{y} = x + 36\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{y} = x + 36\\), which squares the \\(6\\). The square root of \\((x + 6)^{2}\\) is \\(x + 6\\)."
      },
      {
        "text": "\\(y^{2} = x + 6\\)",
        "correct": false,
        "feedback": "Chose \\(y^{2} = x + 6\\), which squares \\(y\\) instead of taking its root. A square is undone by a square root."
      }
    ],
    "backward": "Squares and square roots (Ch1).",
    "forward": "In a later chapter you decide whether a rearranged formula is equivalent by testing values."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "tier": "C",
    "question": "What is the common factor of the top and the bottom of \\(\\frac{x^{2} − 64}{x^{2} + 9x + 8}\\)?",
    "options": [
      {
        "text": "\\(x + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x + 1\\), taking the other factor of the bottom, \\((x + 1)\\). It does not divide the top, \\(x^{2} − 64\\)."
      },
      {
        "text": "\\(x + 8\\)",
        "correct": true,
        "feedback": "Correct. The top factorises as \\(x^{2} − 64 = (x − 8)(x + 8)\\) and the bottom as \\(x^{2} + 9x + 8 = (x + 8)(x + 1)\\). The factor on both is \\((x + 8)\\)."
      },
      {
        "text": "\\(x\\)",
        "correct": false,
        "feedback": "Chose \\(x\\), taking out \\(x\\). The last term of the top has no \\(x\\), so \\(x\\) is not a factor of the top."
      },
      {
        "text": "\\(x − 8\\)",
        "correct": false,
        "feedback": "Chose \\(x − 8\\), taking the other factor of the top, \\((x − 8)\\). It does not divide the bottom, \\(x^{2} + 9x + 8\\)."
      }
    ],
    "backward": "Finding factors of a top and a bottom (Ch2).",
    "forward": "Later in this chapter you use the common factor you find here to cancel in a longer fraction."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "tier": "C",
    "question": "Simplify \\((\\frac{x^{2} + 2x − 15}{x − 1}) ÷ (\\frac{x^{2} − 2x − 3}{x^{2} − 7x + 6})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x + 5)(x − 3)(x − 1)(x − 6)}{(x − 1)(x − 3)(x + 1)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 5)(x − 3)(x − 1)(x − 6)}{(x − 1)(x − 3)(x + 1)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      },
      {
        "text": "\\(\\frac{(x + 5)(x + 6)}{x + 1}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 5)(x + 6)}{x + 1}\\), getting a sign wrong in the bracket \\((x − 6)\\). The second bottom factorises as \\((x − 1)(x − 6)\\)."
      },
      {
        "text": "\\(\\frac{(x − 6)(x + 5)}{x + 1}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(x^{2} + 2x − 15 = (x + 5)(x − 3)\\); \\(x^{2} − 2x − 3 = (x − 3)(x + 1)\\); \\(x^{2} − 7x + 6 = (x − 1)(x − 6)\\). Dividing means multiplying by the reciprocal of the second fraction, so the second fraction is turned upside down. Multiply across: \\(\\frac{(x + 5)(x − 3)(x − 1)(x − 6)}{(x − 1)(x − 3)(x + 1)}\\). Then cancel the common factors to get \\(\\frac{(x − 6)(x + 5)}{x + 1}\\)."
      },
      {
        "text": "\\(\\frac{(x + 1)(x + 5)(x − 3)^{2}}{(x − 6)(x − 1)^{2}}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x + 1)(x + 5)(x − 3)^{2}}{(x − 6)(x − 1)^{2}}\\), multiplying without flipping the second fraction. Dividing by a fraction means multiplying by its reciprocal."
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
    "tier": "C",
    "question": "Write \\(\\frac{6}{3x + 21} − \\frac{4}{x + 7}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{2}{3(x + 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{3(x + 7)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{−6x − 42}{(3x + 21)(x + 7)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−6x − 42}{(3x + 21)(x + 7)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\(3(x + 7)\\), exists, so the answer is not fully simplified."
      },
      {
        "text": "\\(−\\frac{2}{x + 7}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\(3(x + 7)\\). Rewrite both fractions over it: the second top is multiplied by \\(3\\). Then subtract the tops, taking care with every sign: \\(−\\frac{6}{3(x + 7)}\\), which simplifies to \\(−\\frac{2}{x + 7}\\)."
      },
      {
        "text": "\\(\\frac{2}{x + 7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2}{x + 7}\\), using \\(x + 7\\) as the common denominator. The first bottom, \\(3x + 21\\), is not a factor of \\(x + 7\\), so the common denominator must be \\(3(x + 7)\\)."
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
    "tier": "C",
    "question": "Write \\(3x^{2} − 18x + 12\\) in the form \\(a(x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\(3(x − 3)^{2} − 15\\)",
        "correct": true,
        "feedback": "Correct. Take out \\(3\\): \\(3x^{2} − 18x + 12 = 3(x^{2} − 6x) + 12\\). Half of \\(−6\\) is \\(−3\\), so \\((x − 3)^{2}\\) gives \\(x^{2} − 6x + 9\\), an extra \\(9\\) inside the bracket, which is \\(27\\) once the \\(3\\) is multiplied in. So \\(3x^{2} − 18x + 12 = 3(x − 3)^{2} − 15\\)."
      },
      {
        "text": "\\(3(x − 9)^{2} − 69\\)",
        "correct": false,
        "feedback": "Chose \\(3(x − 9)^{2} − 69\\), halving \\(−18\\) to get \\(−9\\). The \\(3\\) in front of \\(x^{2}\\) must be taken out first: \\(3x^{2} − 18x = 3(x^{2} − 6x)\\), and half of \\(−6\\) is \\(−3\\). Expanding gives \\(3x^{2} − 54x + 174\\), not the original."
      },
      {
        "text": "\\(3(x − 3)^{2} + 39\\)",
        "correct": false,
        "feedback": "Chose \\(3(x − 3)^{2} + 39\\), adding \\(27\\) instead of subtracting it. The square gives an extra \\(27\\), which must be taken away. Expanding gives \\(3x^{2} − 18x + 66\\), not the original."
      },
      {
        "text": "\\(3(x − 3)^{2} + 3\\)",
        "correct": false,
        "feedback": "Chose \\(3(x − 3)^{2} + 3\\), subtracting \\(9\\) instead of \\(27\\). The bracket is multiplied by \\(3\\), so \\(3 × 9 = 27\\) must be taken away. Expanding gives \\(3x^{2} − 18x + 30\\), not the original."
      }
    ],
    "backward": "Taking out a common factor (Ch2).",
    "forward": "Later in this chapter you find the least value of expressions with a number in front of \\(x^{2}\\)."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "C",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{5x − 1}{2}\\).",
    "options": [
      {
        "text": "\\(x = \\frac{2y − 1}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2y − 1}{5}\\), getting the sign wrong. After multiplying by \\(2\\), \\(2y = 5x − 1\\), so \\(1\\) is added."
      },
      {
        "text": "\\(x = 2y + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x = 2y + 1\\), forgetting to divide by \\(5\\). After taking \\(−1\\) away, \\(2y + 1 = 5x\\)."
      },
      {
        "text": "\\(x = \\frac{2y}{5} + 1\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{2y}{5} + 1\\), dividing only \\(2y\\) by \\(5\\). The whole of \\(2y + 1\\) must be divided by \\(5\\)."
      },
      {
        "text": "\\(x = \\frac{2y + 1}{5}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\(2\\): \\(2y = 5x − 1\\). Add \\(1\\): \\(2y + 1 = 5x\\). Divide by \\(5\\): \\(x = \\frac{2y + 1}{5}\\)."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject is under a power or a root."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "tier": "C",
    "question": "Make \\(x\\) the subject of \\(y = (x − 5)^{2}\\), where \\(x − 5\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{y} − 25\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 25\\), subtracting \\(25\\) instead of \\(5\\). After the square root, the bracket is just \\(x − 5\\), so \\(5\\) is moved."
      },
      {
        "text": "\\(x = \\sqrt{y} + 5\\)",
        "correct": true,
        "feedback": "Correct. Take the square root of both sides, using the positive root where \\(x − 5\\) is positive: \\(\\sqrt{y} = x − 5\\). Then add \\(5\\): \\(x = \\sqrt{y} + 5\\)."
      },
      {
        "text": "\\(x = \\sqrt{y + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y + 5}\\), taking \\(5\\) away from \\(y\\) before the square root. The \\(5\\) is inside the bracket that is squared, so take the root first."
      },
      {
        "text": "\\(x = y − 25\\)",
        "correct": false,
        "feedback": "Chose \\(x = y − 25\\), subtracting instead of taking the square root. A square is undone by a square root."
      }
    ],
    "backward": "Laws of indices and square roots (Ch1).",
    "forward": "In a later chapter you use the idea of undoing a power to find inverse functions."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "tier": "C",
    "question": "Simplify fully \\(\\frac{5x^{2} − 20}{x^{2} + 6x + 8}\\).",
    "options": [
      {
        "text": "\\(\\frac{x + 4}{5(x − 2)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{5(x − 2)}\\), writing the answer upside down. The top of the answer is what is left of the numerator, not of the denominator."
      },
      {
        "text": "\\(\\frac{5(x − 2)}{x + 4}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(5x^{2} − 20 = 5(x − 2)(x + 2)\\). The bottom factorises: \\(x^{2} + 6x + 8 = (x + 2)(x + 4)\\). The common factor \\((x + 2)\\) cancels from the top and the bottom, leaving \\(\\frac{5(x − 2)}{x + 4}\\)."
      },
      {
        "text": "\\(\\frac{x − 2}{x + 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 2}{x + 4}\\), forgetting the common factor \\(5\\). The top is \\(5x^{2} − 20 = 5(x^{2} − 4)\\), so the \\(5\\) stays on the top."
      },
      {
        "text": "\\(\\frac{5(x − 2)(x + 2)}{(x + 2)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5(x − 2)(x + 2)}{(x + 2)(x + 4)}\\), factorising correctly but not cancelling the common factor \\((x + 2)\\). The fraction is not fully simplified."
      }
    ],
    "backward": "A common factor and the difference of two squares (Ch2).",
    "forward": "Later in this chapter you combine factorising with cancelling in the middle of a longer multiplication."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "tier": "H",
    "question": "Simplify \\((\\frac{2x^{2} − 9x + 4}{x^{2} − 4}) × (\\frac{x^{2} + 3x − 10}{x − 4})\\).",
    "options": [
      {
        "text": "\\(\\frac{(x + 5)(2x − 1)}{x + 2}\\)",
        "correct": true,
        "feedback": "Correct. Factorise: \\(2x^{2} − 9x + 4 = (2x − 1)(x − 4)\\); \\(x^{2} − 4 = (x − 2)(x + 2)\\); \\(x^{2} + 3x − 10 = (x − 2)(x + 5)\\). Multiply across: \\(\\frac{(2x − 1)(x − 4)(x − 2)(x + 5)}{(x − 2)(x + 2)(x − 4)}\\). Then cancel the common factors to get \\(\\frac{(x + 5)(2x − 1)}{x + 2}\\)."
      },
      {
        "text": "\\(\\frac{2x − 1}{x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x − 1}{x + 2}\\), losing the bracket \\((x + 5)\\). Only \\((x − 4)\\) and \\((x − 2)\\) cancel; \\((x + 5)\\) is still on the top."
      },
      {
        "text": "\\(\\frac{(x − 5)(2x − 1)}{x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 5)(2x − 1)}{x + 2}\\), getting a sign wrong in the bracket \\((x + 5)\\). The second top factorises as \\((x − 2)(x + 5)\\)."
      },
      {
        "text": "\\(\\frac{(2x − 1)(x − 4)(x − 2)(x + 5)}{(x − 2)(x + 2)(x − 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(2x − 1)(x − 4)(x − 2)(x + 5)}{(x − 2)(x + 2)(x − 4)}\\), multiplying correctly but not cancelling the factors that appear on both the top and the bottom. The answer is not fully simplified."
      }
    ],
    "backward": "Factorising a quadratic with a number in front of \\(x^{2}\\) (Ch2).",
    "forward": "Later in this chapter you use this full method on the most demanding fractions."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "tier": "H",
    "question": "Write \\(\\frac{4}{x^{2} + 8x + 15} + \\frac{5}{x^{2} + 2x − 3}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{9}{(x − 1)(x + 3)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9}{(x − 1)(x + 3)(x + 5)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{9x − 29}{(x − 1)(x + 3)(x + 5)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9x − 29}{(x − 1)(x + 3)(x + 5)}\\), multiplying the second top by \\((x − 5)\\) instead of \\((x + 5)\\). The factor missing from its bottom is \\((x + 5)\\), with the sign it has in the other bottom."
      },
      {
        "text": "\\(\\frac{9x + 21}{(x − 1)(x + 3)(x + 5)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 1)(x + 3)(x + 5)\\). Rewrite both fractions over it: the first top is multiplied by \\((x − 1)\\) and the second top is multiplied by \\((x + 5)\\). Then add the tops: \\(\\frac{9x + 21}{(x − 1)(x + 3)(x + 5)}\\)."
      },
      {
        "text": "\\(\\frac{9x^{2} + 48x + 63}{(x^{2} + 8x + 15)(x^{2} + 2x − 3)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{9x^{2} + 48x + 63}{(x^{2} + 8x + 15)(x^{2} + 2x − 3)}\\), using the product of the bottoms as the common denominator. This is correct, but a smaller common denominator, \\((x − 1)(x + 3)(x + 5)\\), exists, so the answer is not fully simplified."
      }
    ],
    "backward": "Factorising quadratics (Ch2).",
    "forward": "Later in this chapter you use the factorised bottoms when you work with fractions in formulae."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "tier": "H",
    "question": "Write \\(x^{2} − 5x − 3\\) in the form \\((x + p)^{2} + q\\).",
    "options": [
      {
        "text": "\\((x + \\frac{5}{2})^{2} − \\frac{37}{4}\\)",
        "correct": false,
        "feedback": "Chose \\((x + \\frac{5}{2})^{2} − \\frac{37}{4}\\), getting the sign of the number in the bracket wrong. The bracket is \\((x − \\frac{5}{2})\\). Expanding gives \\(x^{2} + 5x − 3\\), not the original."
      },
      {
        "text": "\\((x − \\frac{5}{2})^{2} − 3\\)",
        "correct": false,
        "feedback": "Chose \\((x − \\frac{5}{2})^{2} − 3\\), forgetting to subtract \\(\\frac{25}{4}\\). The square \\((x − \\frac{5}{2})^{2}\\) contains an extra \\(\\frac{25}{4}\\), which must be taken away. Expanding gives \\(x^{2} − 5x + \\frac{13}{4}\\), not the original."
      },
      {
        "text": "\\((x − 5)^{2} − 28\\)",
        "correct": false,
        "feedback": "Chose \\((x − 5)^{2} − 28\\), using \\(−5\\) in the bracket instead of half of it. The number in the bracket is half the number in front of \\(x\\), which is \\(−\\frac{5}{2}\\). Expanding gives \\(x^{2} − 10x − 3\\), not the original."
      },
      {
        "text": "\\((x − \\frac{5}{2})^{2} − \\frac{37}{4}\\)",
        "correct": true,
        "feedback": "Correct. Half of \\(−5\\) is \\(−\\frac{5}{2}\\), so write \\((x − \\frac{5}{2})^{2}\\). This equals \\(x^{2} − 5x + \\frac{25}{4}\\), which has an extra \\(\\frac{25}{4}\\). Take it away: \\(x^{2} − 5x − 3 = (x − \\frac{5}{2})^{2} − \\frac{37}{4}\\)."
      }
    ],
    "backward": "Squaring a bracket (Ch2).",
    "forward": "In a later chapter you use completing the square to solve quadratics that do not factorise."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "C",
    "question": "The speed of an object that accelerates steadily is \\(v = u + at\\). Make \\(a\\) the subject.",
    "options": [
      {
        "text": "\\(a = v − \\frac{u}{t}\\)",
        "correct": false,
        "feedback": "Chose \\(a = v − \\frac{u}{t}\\), dividing only \\(u\\) by \\(t\\). The whole of \\(v − u\\) must be divided by \\(t\\)."
      },
      {
        "text": "\\(a = \\frac{v − u}{t}\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(u\\) from both sides: \\(v − u = at\\). Divide both sides by \\(t\\): \\(a = \\frac{v − u}{t}\\)."
      },
      {
        "text": "\\(a = v − u − t\\)",
        "correct": false,
        "feedback": "Chose \\(a = v − u − t\\), subtracting \\(t\\) instead of dividing by \\(t\\). The \\(t\\) is multiplying \\(a\\), so both sides must be divided by \\(t\\)."
      },
      {
        "text": "\\(a = t(v − u)\\)",
        "correct": false,
        "feedback": "Chose \\(a = t(v − u)\\), multiplying by \\(t\\) instead of dividing. The \\(t\\) multiplies \\(a\\), so it is undone by dividing by \\(t\\)."
      }
    ],
    "backward": "Expressions and formulae, from Stage 9 (S9-Ch2) (substituting into formulae).",
    "forward": "In a later chapter you use rearranged formulae to find acceleration from measurements."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "tier": "H",
    "question": "Make \\(x\\) the subject of \\(y = \\frac{x + 1}{x − 5}\\).",
    "options": [
      {
        "text": "\\(x = \\frac{5y + 1}{y − 1}\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by \\((x − 5)\\): \\(y(x − 5) = x + 1\\). Multiply out: \\(xy − 5y = x + 1\\). Get the \\(x\\) terms on one side: \\(xy − x = 5y + 1\\). Factorise: \\(x(y − 1) = 5y + 1\\). Divide: \\(x = \\frac{5y + 1}{y − 1}\\)."
      },
      {
        "text": "\\(x = \\frac{6}{y − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{6}{y − 1}\\), forgetting to multiply \\(5\\) by \\(y\\). Multiplying out \\(y(x − 5)\\) gives \\(xy − 5y\\)."
      },
      {
        "text": "\\(x = \\frac{−5y + 1}{y − 1}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{−5y + 1}{y − 1}\\), getting the sign of the \\(y\\) term wrong. From \\(xy − 5y = x + 1\\), moving \\(−5y\\) across changes its sign."
      },
      {
        "text": "\\(x = \\frac{5y + 1}{y + 1}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{5y + 1}{y + 1}\\), getting the sign wrong in the bracket. Collecting \\(x\\) terms gives \\(xy − x = x(y − 1)\\), not \\(x(y + 1)\\)."
      }
    ],
    "backward": "Adding fractions earlier in this chapter and factorising (Ch2).",
    "forward": "In a later chapter you find inverse functions that are fractions."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "tier": "H",
    "question": "Simplify \\(\\frac{x^{2} − 6x + 8}{4 − 2x}\\).",
    "options": [
      {
        "text": "\\(\\frac{(x − 2)(x − 4)}{4 − 2x}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{(x − 2)(x − 4)}{4 − 2x}\\), factorising the top but not cancelling. The factor \\((x − 2)\\) is on the top, and \\(4 − 2x\\) is its opposite times \\(2\\), so they cancel with a minus sign. The fraction is not fully simplified."
      },
      {
        "text": "\\(\\frac{x − 4}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{2}\\), ignoring the sign. The bottom is \\(4 − 2x\\), which is \\(−2(x − 2)\\), the opposite of \\((x − 2)\\), so cancelling leaves a minus sign."
      },
      {
        "text": "\\(−\\frac{x + 4}{2}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{x + 4}{2}\\), getting the sign wrong in the bracket that is left. The top factorises as \\((x − 2)(x − 4)\\), so \\((x − 4)\\) is left."
      },
      {
        "text": "\\(−\\frac{x − 4}{2}\\)",
        "correct": true,
        "feedback": "Correct. The top factorises: \\(x^{2} − 6x + 8 = (x − 2)(x − 4)\\). The bottom is the opposite of \\((x − 2)\\): \\(4 − 2x = −2(x − 2)\\). Cancel \\((x − 2)\\), which leaves a minus sign: the answer is \\(−\\frac{x − 4}{2}\\)."
      }
    ],
    "backward": "Taking out a negative common factor (Ch2).",
    "forward": "Later in this chapter you use opposite brackets again when you subtract algebraic fractions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "tier": "H",
    "question": "The thin-lens formula is \\(\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}\\). Make \\(v\\) the subject.",
    "options": [
      {
        "text": "\\(v = \\frac{fu}{f − u}\\)",
        "correct": false,
        "feedback": "Chose \\(v = \\frac{fu}{f − u}\\), getting the order of the subtraction wrong. \\(\\frac{1}{f} − \\frac{1}{u} = \\frac{u − f}{fu}\\), not \\(\\frac{f − u}{fu}\\)."
      },
      {
        "text": "\\(v = \\frac{u − f}{fu}\\)",
        "correct": false,
        "feedback": "Chose \\(v = \\frac{u − f}{fu}\\), stopping at \\(\\frac{1}{v}\\). The working gives \\(\\frac{1}{v} = \\frac{u − f}{fu}\\), so \\(v\\) is the reciprocal of this."
      },
      {
        "text": "\\(v = f − u\\)",
        "correct": false,
        "feedback": "Chose \\(v = f − u\\), turning each term upside down separately. From \\(\\frac{1}{v} = \\frac{1}{f} − \\frac{1}{u}\\) you cannot turn each term over on its own: first write the right side as one fraction, then turn it over."
      },
      {
        "text": "\\(v = \\frac{fu}{u − f}\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(\\frac{1}{u}\\) from both sides: \\(\\frac{1}{v} = \\frac{1}{f} − \\frac{1}{u}\\). Write the right side over a common denominator: \\(\\frac{1}{v} = \\frac{u − f}{fu}\\). Turn both sides over: \\(v = \\frac{fu}{u − f}\\)."
      }
    ],
    "backward": "Fractions, from Stage 9 (S9-Ch8) (adding fractions) and solving equations, from Stage 9 (S9-Ch4).",
    "forward": "In a later chapter you rearrange reciprocal formulae in physics problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying algebraic fractions",
    "question": "Simplify \\(\\frac{x + 5}{x + 8}\\) as far as possible.",
    "options": [
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{8}\\), cancelling the \\(x\\) terms. The \\(x\\) terms are parts of sums, not factors, so they cannot be cancelled."
      },
      {
        "text": "\\(1 + \\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Chose \\(1 + \\frac{5}{8}\\), cancelling the \\(x\\) terms and then adding the leftover numbers on top of \\(1\\). Parts of a sum cannot be cancelled, so nothing changes."
      },
      {
        "text": "It cannot be simplified",
        "correct": true,
        "feedback": "Correct. Neither \\(x + 5\\) nor \\(x + 8\\) can be factorised, and they have no common factor, so nothing cancels. The fraction cannot be simplified."
      },
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), subtracting the bottom from the top, \\(5 − 8\\). Fractions are simplified by dividing out common factors, not by subtracting."
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
    "question": "Which of these lines has been simplified correctly?",
    "options": [
      {
        "text": "\\(\\frac{x^{2} − 16}{x − 4} = x + 4\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{x^{2} − 16}{x − 4} = x + 4\\) is true: factorise the top as \\((x − 4)(x + 4)\\), then cancel. In each wrong line a term, not a factor, was cancelled, or only part of the top was divided."
      },
      {
        "text": "\\(\\frac{4x + 4}{4} = x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4x + 4}{4} = x + 4\\), dividing only the first term by \\(4\\). Every term on the top must be divided by \\(4\\)."
      },
      {
        "text": "\\(\\frac{x^{2} + 4}{x} = x + 4\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x^{2} + 4}{x} = x + 4\\), cancelling the \\(x\\) on the bottom with the \\(x\\) in \\(x^{2}\\) only. Every term on the top must be divided by \\(x\\)."
      },
      {
        "text": "\\(\\frac{x + 4}{4} = x\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{4} = x\\), cancelling the \\(4\\) on the bottom with the \\(4\\) in the sum on the top. Only a factor of the whole top can be cancelled, and \\(4\\) is not a factor of \\(x + 4\\)."
      }
    ],
    "backward": "Factors and terms, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you spot invalid cancelling in your own working."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "To divide by \\(\\frac{x − 6}{x − 7}\\), what do you multiply by?",
    "options": [
      {
        "text": "\\(\\frac{x − 7}{x − 6}\\)",
        "correct": true,
        "feedback": "Correct. The reciprocal of \\(\\frac{x − 6}{x − 7}\\) is \\(\\frac{x − 7}{x − 6}\\): the top and the bottom swap places and nothing else changes. Dividing by \\(\\frac{x − 6}{x − 7}\\) is the same as multiplying by this reciprocal."
      },
      {
        "text": "\\(\\frac{x − 6}{x − 7}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 6}{x − 7}\\), which leaves the fraction unchanged. Dividing by a fraction means multiplying by its reciprocal, so the top and bottom must swap places."
      },
      {
        "text": "\\(−\\frac{x − 7}{x − 6}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{x − 7}{x − 6}\\), which has an extra minus sign. The reciprocal of a fraction has the same sign as the fraction."
      },
      {
        "text": "\\(\\frac{x + 7}{x + 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 7}{x + 6}\\), which swaps the top and bottom but also changes the signs inside the brackets. The reciprocal swaps the two expressions and keeps each one unchanged."
      }
    ],
    "backward": "Dividing by a fraction, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you spot, without working it out, what a division needs before it can be cancelled."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Multiplying and dividing algebraic fractions",
    "question": "What must \\(\\frac{x − 4}{x + 4}\\) be multiplied by to give \\(\\frac{x − 4}{x + 6}\\)?",
    "options": [
      {
        "text": "\\(\\frac{x + 4}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 4}{x − 4}\\), giving the reciprocal of the given fraction. That would only make the product \\(1\\), not \\(\\frac{x − 4}{x + 6}\\)."
      },
      {
        "text": "\\(\\frac{x + 6}{x + 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x + 6}{x + 4}\\), turning the answer upside down. The bracket \\((x + 4)\\) on the bottom of the given fraction has to be cancelled, so it belongs on the top of the answer, not the bottom."
      },
      {
        "text": "\\(\\frac{x + 4}{x + 6}\\)",
        "correct": true,
        "feedback": "Correct. Divide the target by the given fraction: \\((\\frac{x − 4}{x + 6}) ÷ (\\frac{x − 4}{x + 4}) = (\\frac{x − 4}{x + 6}) × (\\frac{x + 4}{x − 4}) = \\frac{x + 4}{x + 6}\\). Check: \\((\\frac{x − 4}{x + 4}) × (\\frac{x + 4}{x + 6})\\) cancels to \\(\\frac{x − 4}{x + 6}\\)."
      },
      {
        "text": "\\(\\frac{x − 4}{x + 6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{x − 4}{x + 6}\\), giving the target itself. Multiplying the given fraction by this would not return the target."
      }
    ],
    "backward": "Multiplying and dividing fractions, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use the idea of undoing a multiplication when you rearrange formulae."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2}{x − 2} + \\frac{1}{x + 4}\\) as a single fraction.",
    "options": [
      {
        "text": "\\(\\frac{3}{(x − 2)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{(x − 2)(x + 4)}\\), using the common denominator but not multiplying the tops by the factors that were missing. Each top must be multiplied by the same thing as its bottom."
      },
      {
        "text": "\\(\\frac{3x + 6}{(x − 2)(x + 4)}\\)",
        "correct": true,
        "feedback": "Correct. The common denominator is \\((x − 2)(x + 4)\\). Rewrite both fractions over it: the first top is multiplied by \\((x + 4)\\) and the second top is multiplied by \\((x − 2)\\). Then add the tops: \\(\\frac{3x + 6}{(x − 2)(x + 4)}\\)."
      },
      {
        "text": "\\(\\frac{2x + 9}{(x − 2)(x + 4)}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{2x + 9}{(x − 2)(x + 4)}\\), multiplying the first top by \\((x + 4)\\) but not the second top by what its bottom needed. Both tops must be scaled."
      },
      {
        "text": "\\(\\frac{3}{2x + 2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{2x + 2}\\), combining the tops and combining the bottoms. Fractions with different bottoms cannot be combined like this: they need a common denominator first."
      }
    ],
    "backward": "Common denominators, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use a common denominator made of two brackets."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Adding and subtracting algebraic fractions",
    "question": "Write \\(\\frac{2x + 6}{x − 4} + \\frac{−4x + 2}{x − 4}\\) as a single fraction in its simplest form.",
    "options": [
      {
        "text": "\\(−2\\)",
        "correct": true,
        "feedback": "Correct. The bottoms are the same, so add the tops: \\(−2x + 8\\). The top is \\(−2(x − 4)\\), so the bracket cancels with the bottom and the answer is \\(−2\\)."
      },
      {
        "text": "\\(\\frac{6x + 4}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{6x + 4}{x − 4}\\), doing the opposite operation on the tops: the question has +, so the tops must be added."
      },
      {
        "text": "\\(\\frac{−2x + 8}{2x − 8}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−2x + 8}{2x − 8}\\), adding the bottoms as well as the tops. When the bottoms are already the same, they stay the same."
      },
      {
        "text": "\\(\\frac{−2x + 8}{x − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{−2x + 8}{x − 4}\\), combining the tops correctly but not simplifying. The top \\(−2x + 8 = −2(x − 4)\\) has the factor \\((x − 4)\\), which cancels with the bottom."
      }
    ],
    "backward": "Subtracting a bracket and cancelling, from Stage 9 (S9-Ch8) and Ch2.",
    "forward": "Later in this chapter you meet answers that need factorising once the tops are combined."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Completing the square",
    "question": "\\(x^{2} − 6x − 1 = (x − 3)^{2} − 10\\). What is the minimum value of \\(x^{2} − 6x − 1\\)?",
    "options": [
      {
        "text": "\\(−1\\)",
        "correct": false,
        "feedback": "Chose \\(−1\\), the original constant term. The completed square has a different constant, \\(−10\\), and that is the minimum value."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), the value of \\(x\\) where the minimum occurs. The question asks for the minimum value of the expression, which is \\(−10\\)."
      },
      {
        "text": "\\(−3\\)",
        "correct": false,
        "feedback": "Chose \\(−3\\), the number in the bracket. The minimum value is the number added at the end, \\(−10\\)."
      },
      {
        "text": "\\(−10\\)",
        "correct": true,
        "feedback": "Correct. \\((x − 3)^{2}\\) is never negative and is \\(0\\) when \\(x = 3\\). So the least value of \\(x^{2} − 6x − 1\\) is the number added at the end: \\(−10\\)."
      }
    ],
    "backward": "Squares are never negative, from Stage 9 (S9-Ch2).",
    "forward": "Later in this chapter you find greatest values as well as least values."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Changing the subject I",
    "question": "Rearrange \\(y = 11 − 4x\\) to make \\(x\\) the subject.",
    "options": [
      {
        "text": "\\(x = \\frac{11 − y}{4}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(4x\\) to both sides: \\(4x + y = 11\\). Subtract \\(y\\) from both sides: \\(4x = 11 − y\\). Divide by \\(4\\): \\(x = \\frac{11 − y}{4}\\)."
      },
      {
        "text": "\\(x = 11 − \\frac{y}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = 11 − \\frac{y}{4}\\), dividing only \\(y\\) by \\(4\\). The whole of \\(11 − y\\) must be divided by \\(4\\)."
      },
      {
        "text": "\\(x = \\frac{y − 11}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{y − 11}{4}\\), writing \\(y − 11\\) instead of \\(11 − y\\). From \\(y = 11 − 4x\\), the equation \\(4x = 11 − y\\) is the result, so the top is \\(11 − y\\)."
      },
      {
        "text": "\\(x = \\frac{11 + y}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\frac{11 + y}{4}\\), adding \\(y\\) instead of subtracting it. From \\(y = 11 − 4x\\), add \\(4x\\) to both sides to get \\(4x + y = 11\\), then subtract \\(y\\)."
      }
    ],
    "backward": "Solving equations, from Stage 9 (S9-Ch4).",
    "forward": "Later in this chapter you rearrange formulae where the subject has a negative sign."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = \\sqrt{x} − 5\\).",
    "options": [
      {
        "text": "\\(x = y^{2} + 5\\)",
        "correct": false,
        "feedback": "Chose \\(x = y^{2} + 5\\), squaring \\(y\\) before dealing with the \\(5\\). First add \\(5\\) to isolate \\(\\sqrt{x}\\), then square both sides."
      },
      {
        "text": "\\(x = \\sqrt{y + 5}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y + 5}\\), taking a square root instead of squaring. \\(\\sqrt{x}\\) is undone by squaring."
      },
      {
        "text": "\\(x = (y − 5)^{2}\\)",
        "correct": false,
        "feedback": "Chose \\(x = (y − 5)^{2}\\), getting the sign wrong. To undo − \\(5\\), do the opposite: add \\(5\\)."
      },
      {
        "text": "\\(x = (y + 5)^{2}\\)",
        "correct": true,
        "feedback": "Correct. Add \\(5\\) on both sides: \\(\\sqrt{x} = y + 5\\). Square both sides: \\(x = (y + 5)^{2}\\)."
      }
    ],
    "backward": "Square roots and squaring (Ch1).",
    "forward": "In a later chapter you work with inverse functions that contain roots."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Changing the subject II",
    "question": "Make \\(x\\) the subject of \\(y = x^{2} + 4x + 11\\), where \\(x + 2\\) is positive.",
    "options": [
      {
        "text": "\\(x = \\sqrt{y − 7} + 2\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y − 7} + 2\\), getting the sign of the bracket number wrong. After the square root, \\(x + 2 = \\sqrt{y − 7}\\), so \\(2\\) is subtracted."
      },
      {
        "text": "\\(x = \\sqrt{y} − 9\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y} − 9\\), taking the square root of \\(y\\) only. The whole of \\(y − 7\\) must be square-rooted."
      },
      {
        "text": "\\(x = \\sqrt{y − 7} − 2\\)",
        "correct": true,
        "feedback": "Correct. Complete the square: \\(x^{2} + 4x + 11 = (x + 2)^{2} + 7\\), so \\(y = (x + 2)^{2} + 7\\). Subtract \\(7\\) on both sides: \\((x + 2)^{2} = y − 7\\). Take the square root, using the positive root: \\(x + 2 = \\sqrt{y − 7}\\). Then subtract \\(2\\): \\(x = \\sqrt{y − 7} − 2\\)."
      },
      {
        "text": "\\(x = \\sqrt{y − 7 − 4}\\)",
        "correct": false,
        "feedback": "Chose \\(x = \\sqrt{y − 7 − 4}\\), subtracting \\(4\\) inside the root. The \\(2\\) in the bracket is not squared again: \\(x + 2 = \\sqrt{y − 7}\\), so \\(2\\) is moved outside the root."
      }
    ],
    "backward": "Completing the square, earlier in this chapter.",
    "forward": "In a later chapter you use the same two steps to solve quadratics by completing the square."
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
  title: "Algebraic Fractions and Rearranging Formulae — Speed & Strategy",
  subtitle: "Grade 9 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every algebraic fractions and rearranging formulae cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: you have 25 minutes for its 20 questions, about 75 seconds each, so strategy matters. The re-check questions after it are not timed. Move quickly on the one-step questions. Slow down on traps, which look easy but hide a common pitfall: a fraction that is not fully simplified, a sign that changes when a bracket is taken out, a root that has the wrong sign, a term moved across without changing its sign. If a challenge question is eating your time, mark it, move on, and come back. A wrong answer here shows which pitfalls still catch you, so it is useful information.</p><p>You will meet all six topics, mixed together. The clock starts when you continue.</p>",
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

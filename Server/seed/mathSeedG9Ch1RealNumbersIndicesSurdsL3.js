// Real Numbers, Indices and Surds — Grade 9, Level 3 (Synthesis).
// Warm-up, diagnostic and spaced recheck items, converted from
// ch01-real-numbers-indices-surds-level-3.json (v3 text bank).
// Run with: node seed/mathSeedG9Ch1RealNumbersIndicesSurdsL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-9";
const GRADE_LABEL = "Grade 9";
const CHAPTER_SLUG = "ch-1-real-numbers-indices-surds";
const CHAPTER_NAME = "Real Numbers, Indices and Surds";
const LEVEL = 3;

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
    "question": "Exactly one of these numbers is rational. Which one?",
    "options": [
      {
        "text": "\\(\\sqrt{21}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{21}\\). \\(21\\) lies between \\(4^{2} = 16\\) and \\(5^{2} = 25\\), so it is not a perfect square and \\(\\sqrt{21}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\sqrt{19}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{19}\\). \\(19\\) lies between \\(4^{2} = 16\\) and \\(5^{2} = 25\\), so it is not a perfect square and \\(\\sqrt{19}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{5}\\). \\(5\\) lies between \\(2^{2} = 4\\) and \\(3^{2} = 9\\), so it is not a perfect square and \\(\\sqrt{5}\\) is irrational: it cannot be written as \\(\\frac{p}{q}\\)."
      },
      {
        "text": "\\(0.125\\)",
        "correct": true,
        "feedback": "Correct. \\(0.125\\) can be written as a fraction with integer top and bottom, so it is rational."
      }
    ],
    "retryHint": "Test each number in turn: can you write it as one whole number over another whole number? Simplify any root first.",
    "backward": "Writing a number as a fraction of two integers, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you work with fractions that contain letters."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(169^{\\frac{1}{2}}\\)?",
    "options": [
      {
        "text": "\\(28\\,561\\)",
        "correct": false,
        "feedback": "Chose \\(28\\,561\\), reading the power \\(\\frac{1}{2}\\) as \\(2\\). A power of \\(\\frac{1}{2}\\) means \"the square root\", not \"to the power \\(2\\)\"."
      },
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(169^{\\frac{1}{2}}\\) is the square root of \\(169\\), and \\(13^{2} = 169\\), so it equals \\(13\\)."
      },
      {
        "text": "\\(−13\\)",
        "correct": false,
        "feedback": "Chose \\(−13\\), taking the negative square root. A power of \\(\\frac{1}{2}\\) means the positive square root."
      },
      {
        "text": "\\(84.5\\)",
        "correct": false,
        "feedback": "Chose \\(84.5\\), halving \\(169\\). A power of \\(\\frac{1}{2}\\) is a square root, not half of the number."
      }
    ],
    "retryHint": "A power of \\(\\frac{1}{2}\\) means the square root. Which number multiplies by itself \\(2\\) times to give \\(169\\)?",
    "backward": "Square roots and cube roots, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you combine this with powers such as \\(8^{\\frac{2}{3}}\\)."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "How many digits come after the decimal point when \\(\\frac{69}{400}\\) is written as a decimal?",
    "options": [
      {
        "text": "\\(3\\) decimal places",
        "correct": false,
        "feedback": "Counted the digits of the bottom number \\(400\\), giving \\(3\\) decimal places. The number of places depends on the powers of \\(2\\) and \\(5\\) in \\(400\\), not on how many digits it has."
      },
      {
        "text": "\\(4\\) decimal places",
        "correct": true,
        "feedback": "Correct. \\(400 = 2^{4} × 5^{2}\\). Scaling to a power of \\(10\\) needs \\(10^{4}\\), so the decimal has \\(4\\) decimal places: \\(\\frac{69}{400} = 0.1725\\)."
      },
      {
        "text": "\\(6\\) decimal places",
        "correct": false,
        "feedback": "Added the two powers, \\(4 + 2 = 6\\), giving \\(6\\) decimal places. The decimal needs as many places as the LARGER of the two powers, not the total."
      },
      {
        "text": "\\(2\\) decimal places",
        "correct": false,
        "feedback": "Used the smaller power, giving \\(2\\) decimal places. You need enough places for the larger power, because the bottom must be scaled up to a power of \\(10\\)."
      }
    ],
    "retryHint": "Write the bottom number as powers of \\(2\\) and \\(5\\), then ask what power of \\(10\\) it must be scaled to.",
    "backward": "Prime factors \\(2\\) and \\(5\\) in a denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use powers of \\(2\\) and \\(5\\) to predict whether a decimal terminates."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(4\\sqrt{3} × 5\\sqrt{7}\\).",
    "options": [
      {
        "text": "\\(20\\sqrt{21}\\)",
        "correct": true,
        "feedback": "Correct. \\(4\\sqrt{3} × 5\\sqrt{7} = (4 × 5) × \\sqrt{3 × 7} = 20\\sqrt{21}\\)."
      },
      {
        "text": "\\(20\\sqrt{10}\\)",
        "correct": false,
        "feedback": "Chose \\(20\\sqrt{10}\\), adding the numbers under the roots \\((3 + 7 = 10)\\). When you multiply roots you multiply them: \\(3 × 7 = 21\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Chose \\(20\\), multiplying the numbers in front and dropping the roots. The product of the roots is \\(\\sqrt{21}\\), which stays in the answer."
      },
      {
        "text": "\\(9\\sqrt{21}\\)",
        "correct": false,
        "feedback": "Chose \\(9\\sqrt{21}\\), adding the numbers in front \\((4 + 5 = 9)\\) instead of multiplying them. When you multiply, multiply them: \\(4 × 5 = 20\\)."
      }
    ],
    "retryHint": "Multiply the numbers in front, multiply the numbers under the roots, then simplify.",
    "backward": "Multiplying the numbers in front and the numbers under the roots (earlier in this chapter).",
    "forward": "Later in this chapter you multiply brackets that contain surds."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which list shows these numbers in order, smallest first: \\(\\frac{13}{4}\\), \\(3.5\\), \\(\\sqrt{10}\\)?",
    "options": [
      {
        "text": "\\(\\frac{13}{4}\\), \\(3.5\\), \\(\\sqrt{10}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{13}{4}\\), \\(3.5\\), \\(\\sqrt{10}\\), putting \\(\\sqrt{10}\\) last as if it were the biggest. \\(\\sqrt{10}\\) is only about \\(3.2\\), because \\(3^{2} = 9 &lt; 10 &lt; 16\\)."
      },
      {
        "text": "\\(\\sqrt{10}\\), \\(3.5\\), \\(\\frac{13}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{10}\\), \\(3.5\\), \\(\\frac{13}{4}\\), which orders \\(\\frac{13}{4}\\) by its top number \\(13\\) as if it were \\(13\\). A fraction is worth its top divided by its bottom, which is about \\(3.25\\)."
      },
      {
        "text": "\\(\\sqrt{10}\\), \\(\\frac{13}{4}\\), \\(3.5\\)",
        "correct": true,
        "feedback": "Correct. Using squares for \\(\\sqrt{10}\\) (between \\(3\\) and \\(4\\)) and dividing for \\(\\frac{13}{4}\\), the values are about \\(\\sqrt{10} ≈ 3.16\\), \\(\\frac{13}{4} ≈ 3.25\\), \\(3.5 ≈ 3.50\\). Smallest first: \\(\\sqrt{10}\\), \\(\\frac{13}{4}\\), \\(3.5\\)."
      },
      {
        "text": "\\(3.5\\), \\(\\frac{13}{4}\\), \\(\\sqrt{10}\\)",
        "correct": false,
        "feedback": "Chose \\(3.5\\), \\(\\frac{13}{4}\\), \\(\\sqrt{10}\\), which is largest first. The question asks for smallest first."
      }
    ],
    "retryHint": "Change every number to a decimal you can compare. For the root, use the perfect squares on either side.",
    "backward": "Comparing decimals, fractions and roots by size, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you order surds in problems by comparing them with nearby squares."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Write \\((\\sqrt{2})^{3}\\) in the form \\(a\\sqrt{b}\\), where \\(b\\) is as small as possible.",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Chose \\(2\\), stopping at \\((\\sqrt{2})^{2} = 2\\). There is still one more \\(\\sqrt{2}\\) to multiply in."
      },
      {
        "text": "\\(2\\sqrt{2}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{2})^{2} = 2\\), so \\((\\sqrt{2})^{3} = (\\sqrt{2})^{2} × \\sqrt{2} = 2^{1} × \\sqrt{2} = 2\\sqrt{2}\\)."
      },
      {
        "text": "\\(4\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{2}\\), one pair of roots too many. \\((\\sqrt{2})^{2} = 2\\), so the answer is \\(2\\sqrt{2}\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Chose \\(8\\), working out \\(2^{3}\\) and dropping the root. \\((\\sqrt{2})^{3}\\) still contains a root when the power is odd."
      }
    ],
    "retryHint": "Split \\((\\sqrt{2})^{3}\\) into pairs of \\(\\sqrt{2}\\). Each pair equals \\(2\\).",
    "backward": "Pairs of a root multiplying to a whole number (earlier in this chapter).",
    "forward": "In a later chapter you simplify powers of roots in the quadratic formula."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "How many of these numbers are integers? \\(−\\frac{5}{3}\\), \\(−\\frac{27}{9}\\), \\(−4\\), \\(\\frac{20}{5}\\), \\(12\\), \\(5\\)",
    "options": [
      {
        "text": "\\(3\\) numbers",
        "correct": false,
        "feedback": "Chose \\(3\\) numbers. Counted only the numbers written without a fraction bar, \\(3\\). But a fraction such as \\(−\\frac{27}{9}\\) simplifies to \\(−3\\), which is an integer, so it counts too."
      },
      {
        "text": "\\(1\\) number",
        "correct": false,
        "feedback": "Chose \\(1\\) number. Counted the numbers that are not integers, \\(1\\), instead of the ones that are. The question asks how many are integers."
      },
      {
        "text": "\\(5\\) numbers",
        "correct": true,
        "feedback": "Correct. The integers are \\(−4\\), \\(5\\), \\(12\\), together with \\(−\\frac{27}{9} = −3\\) and \\(\\frac{20}{5} = 4\\). That makes \\(5\\) numbers."
      },
      {
        "text": "\\(4\\) numbers",
        "correct": false,
        "feedback": "Chose \\(4\\) numbers. Left out one of the integers, giving \\(4\\). Simplify every fraction first: a fraction is an integer when the bottom divides the top exactly."
      }
    ],
    "retryHint": "Work out the value of each number. Count it only if it is a whole number, a negative whole number or zero.",
    "backward": "Integers, decimals and negative numbers, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you decide whether roots and recurring decimals are integers."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Write \\(3^{9} ÷ 3^{5}\\) as a single power of \\(3\\).",
    "options": [
      {
        "text": "\\(3^{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(3^{9} ÷ 3^{5} = 3^{9−5} = 3^{4}\\)."
      },
      {
        "text": "\\(3^{45}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{45}\\), multiplying the powers: \\(9 × 5 = 45\\). For division of the same base you subtract the powers."
      },
      {
        "text": "\\(3^{14}\\)",
        "correct": false,
        "feedback": "Chose \\(3^{14}\\), adding the powers: \\(9 + 5 = 14\\). Adding is for multiplying; when you divide, you subtract the powers."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), dividing the bases first: \\(3 ÷ 3 = 1\\), and \\(1\\) to any power is \\(1\\). The bases are the same, so keep the base and subtract the powers: \\(3^{4}\\)."
      }
    ],
    "retryHint": "Both numbers are powers of the same base, so write the answer as that base to one power. Subtract the bottom power from the top.",
    "backward": "Cancelling repeated factors in a fraction, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you divide powers where the answer has a negative power."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which list shows these fractions in order, smallest first: \\(\\frac{6}{11}\\), \\(\\frac{7}{8}\\), \\(\\frac{5}{6}\\)?",
    "options": [
      {
        "text": "\\(\\frac{5}{6}\\), \\(\\frac{6}{11}\\), \\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Put the fractions in order of their tops, giving \\(\\frac{5}{6}\\), \\(\\frac{6}{11}\\), \\(\\frac{7}{8}\\). A bigger top does not make a bigger fraction: compare using a common denominator."
      },
      {
        "text": "\\(\\frac{6}{11}\\), \\(\\frac{7}{8}\\), \\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Put the fractions in order of their bottoms (biggest bottom first), giving \\(\\frac{6}{11}\\), \\(\\frac{7}{8}\\), \\(\\frac{5}{6}\\). A bigger bottom does not make a bigger fraction: compare using a common denominator."
      },
      {
        "text": "\\(\\frac{6}{11}\\), \\(\\frac{5}{6}\\), \\(\\frac{7}{8}\\)",
        "correct": true,
        "feedback": "Correct. Over a common denominator \\(264\\): \\(\\frac{6}{11} = \\frac{144}{264}\\), \\(\\frac{7}{8} = \\frac{231}{264}\\), \\(\\frac{5}{6} = \\frac{220}{264}\\). Smallest first: \\(\\frac{6}{11}\\), \\(\\frac{5}{6}\\), \\(\\frac{7}{8}\\)."
      },
      {
        "text": "\\(\\frac{7}{8}\\), \\(\\frac{5}{6}\\), \\(\\frac{6}{11}\\)",
        "correct": false,
        "feedback": "Put the fractions in order from largest to smallest, giving \\(\\frac{7}{8}\\), \\(\\frac{5}{6}\\), \\(\\frac{6}{11}\\). The question asks for smallest first."
      }
    ],
    "backward": "Changing fractions to decimals to compare them, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you order decimals and surds by estimating their size."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "A learner works out \\((3^{3})^{2} ÷ 3^{2}\\) in three steps. Step 1: \\((3^{3})^{2} = 3^{5}\\); Step 2: \\(3^{5} ÷ 3^{2} = 3^{3}\\); Step 3: \\(3^{3} = 27\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: a power of a power multiplies the powers: \\(3 × 2 = 6\\), not \\(3 + 2 = 5\\). Every other step is a correct calculation, so this is the only step to mark."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: dividing subtracts the powers, \\(5 − 2 = 3\\)."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: a power of a power multiplies the powers: \\(3 × 2 = 6\\), not \\(3 + 2 = 5\\)."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: \\(3^{3}\\) means \\(3\\) multiplied by itself \\(3\\) times, which is \\(27\\)."
      }
    ],
    "backward": "A power of a power, checked line by line, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet powers of powers with fractional and negative indices."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.5222\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{13}{25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{13}{25}\\), which is the decimal \\(0.52\\) written as a fraction. It treats the decimal as if it stopped, but it keeps going, so the value is not exact."
      },
      {
        "text": "\\(\\frac{47}{90}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.5222\\ldots\\). Then \\(10x = 5.222\\ldots\\) and \\(100x = 52.222\\ldots\\). Subtracting, \\(90x = 47\\), so \\(x = \\frac{47}{90}\\)."
      },
      {
        "text": "\\(\\frac{52}{99}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{52}{99}\\), using one \\(9\\) in the bottom for every digit written. Use one \\(9\\) for each repeating digit only, then deal with the digits before the repeat separately."
      },
      {
        "text": "\\(\\frac{90}{47}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{90}{47}\\), which is the correct fraction upside down. The decimal is less than \\(1\\), so the top must be smaller than the bottom."
      }
    ],
    "backward": "Simplifying a fraction to lowest terms, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use this to show that a recurring decimal is rational."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Write \\(\\frac{6}{3 + \\sqrt{6}}\\) in the form \\(p + q\\sqrt{r}\\), where \\(p\\), \\(q\\) and \\(r\\) are integers.",
    "options": [
      {
        "text": "\\(\\frac{18 − 6\\sqrt{6}}{15}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{18 − 6\\sqrt{6}}{15}\\), using \\(9 + 6 = 15\\) as the new bottom. The bottom is \\((3 + \\sqrt{6})(3 − \\sqrt{6}) = 9 − 6 = 3\\), with a minus."
      },
      {
        "text": "\\(18 − 6\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(18 − 6\\sqrt{6}\\), multiplying the top by \\((3 − \\sqrt{6})\\) but forgetting to divide by the new bottom, \\(9 − 6 = 3\\)."
      },
      {
        "text": "\\(6 − 2\\sqrt{6}\\)",
        "correct": true,
        "feedback": "Correct. Multiply top and bottom by \\((3 − \\sqrt{6})\\): the bottom is \\(9 − 6 = 3\\), and \\(\\frac{6(3 − \\sqrt{6})}{3} = 2(3 − \\sqrt{6}) = 6 − 2\\sqrt{6}\\)."
      },
      {
        "text": "\\(6 + 2\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(6 + 2\\sqrt{6}\\), multiplying top and bottom by \\(3 + \\sqrt{6}\\) instead of \\(3 − \\sqrt{6}\\). To remove the root, change the sign in the bracket."
      }
    ],
    "backward": "Multiplying two brackets and a numerator (earlier in this chapter).",
    "forward": "In a later chapter you use conjugates to simplify fractions with surds in coordinate geometry."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these is an irrational number between \\(5\\) and \\(6\\)?",
    "options": [
      {
        "text": "\\(\\sqrt{42}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{42}\\). This is irrational, but \\(42\\) is bigger than \\(36\\), so \\(\\sqrt{42}\\) is bigger than \\(6\\): it lies outside the interval."
      },
      {
        "text": "\\(\\sqrt{27}\\)",
        "correct": true,
        "feedback": "Correct. \\(25 &lt; 27 &lt; 36\\) and \\(27\\) is not a perfect square, so \\(\\sqrt{27}\\) is irrational and lies between \\(5\\) and \\(6\\)."
      },
      {
        "text": "\\(\\sqrt{30.25}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{30.25}\\). This equals \\(5.5 = \\frac{11}{2}\\), which lies between \\(5\\) and \\(6\\) but is rational, not irrational."
      },
      {
        "text": "\\(\\sqrt{36}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{36}\\). This equals \\(6\\), which is an end of the interval, not strictly between \\(5\\) and \\(6\\), and it is rational."
      }
    ],
    "backward": "Squares of whole numbers and square roots, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you place irrational numbers on a graph axis."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "The recurring decimal \\(0.222\\ldots\\) is multiplied by \\(27\\sqrt{3}\\). Which surd is the result, in simplest form?",
    "options": [
      {
        "text": "\\(\\frac{27\\sqrt{3}}{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{27\\sqrt{3}}{5}\\), using \\(0.2\\) as \\(\\frac{2}{10}\\). The recurring decimal \\(0.222\\ldots\\) equals \\(\\frac{2}{9}\\), not \\(\\frac{2}{10}\\)."
      },
      {
        "text": "\\(54\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(54\\sqrt{3}\\), multiplying by \\(2\\) instead of \\(\\frac{2}{9}\\). The decimal \\(0.222\\ldots\\) equals \\(\\frac{2}{9}\\)."
      },
      {
        "text": "\\(6\\sqrt{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.222\\ldots = \\frac{2}{9}\\), so \\(0.222\\ldots × 27\\sqrt{3} = (\\frac{2}{9}) × 27\\sqrt{3} = 6\\sqrt{3}\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), working out \\((\\frac{2}{9}) × 27 = 6\\) and dropping the \\(\\sqrt{3}\\). The root stays in the answer."
      }
    ],
    "backward": "Recurring decimals as fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you combine fractions and roots in problems with exact answers."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Here, natural numbers start at \\(1\\) and whole numbers start at \\(0\\). What is the smallest of these sets that contains all of the numbers \\(−8\\), \\(6\\), \\(0\\)?",
    "options": [
      {
        "text": "Whole numbers",
        "correct": false,
        "feedback": "Chose Whole numbers. \\(−8\\) is not in this set, so it cannot contain all of the numbers."
      },
      {
        "text": "Rational numbers",
        "correct": false,
        "feedback": "Chose Rational numbers. It does contain all of the numbers, but the widest number, \\(−8\\), only needs integers, so a narrower set fits."
      },
      {
        "text": "Natural numbers",
        "correct": false,
        "feedback": "Chose Natural numbers. \\(−8\\) is not in this set, so it cannot contain all of the numbers."
      },
      {
        "text": "Integers",
        "correct": true,
        "feedback": "Correct. \\(−8\\) is an integer that is not whole, and it needs the biggest set of the numbers shown. That set also contains all the others."
      }
    ],
    "backward": "Simplifying a number before you name its set, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you name the set that a calculation result belongs to."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Simplify \\(x^{−2} × x^{5}\\).",
    "options": [
      {
        "text": "\\(x^{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(x^{−2} × x^{5} = x^{−2+5} = x^{3}\\)."
      },
      {
        "text": "\\(x^{−10}\\)",
        "correct": false,
        "feedback": "Chose \\(x^{−10}\\), multiplying the powers \\(−2 × 5\\). When you multiply, you add the powers: \\(−2 + 5 = 3\\)."
      },
      {
        "text": "\\(x^{7}\\)",
        "correct": false,
        "feedback": "Chose \\(x^{7}\\), adding \\(2\\) and \\(5\\) and ignoring the minus sign. The power is \\(−2\\), so you add \\(−2 + 5 = 3\\)."
      },
      {
        "text": "\\(x^{−3}\\)",
        "correct": false,
        "feedback": "Chose \\(x^{−3}\\), getting the sign of the answer the wrong way round: \\(−2 + 5 = 3\\), not \\(−3\\)."
      }
    ],
    "backward": "Negative powers in algebra (earlier in this chapter).",
    "forward": "In a later chapter you use negative powers when you simplify algebraic fractions."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "The decimal expansion of \\(\\frac{8}{13}\\) is \\(0.615384615384\\ldots\\) The block of digits repeats for ever. What is the 56th digit after the decimal point?",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. The block \\(615\\,384\\) repeats every \\(6\\) digits. \\(56 ÷ 6\\) leaves remainder \\(2\\), so the 56th digit is digit number \\(2\\) of the block, which is \\(1\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Chose \\(4\\), the last digit of the block, as if \\(56\\) were a complete number of blocks. \\(56 ÷ 6\\) leaves remainder \\(2\\), so the 56th digit is digit number \\(2\\) of the block."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Chose \\(5\\), which is digit number \\(3\\) of the block. The remainder \\(2\\) from \\(56 ÷ 6\\) gives the position directly: digit number \\(2\\), not one further on."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Chose \\(6\\), which is digit number \\(1\\) of the block, one place too early. The remainder \\(2\\) from \\(56 ÷ 6\\) gives digit number \\(2\\)."
      }
    ],
    "backward": "Dividing a whole number and reading the remainder, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use the block length to see why recurring decimals repeat."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Write \\(\\frac{1}{5 + \\sqrt{6}}\\) with a whole-number denominator, in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{5 + \\sqrt{6}}{19}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5 + \\sqrt{6}}{19}\\), multiplying top and bottom by \\(5 + \\sqrt{6}\\) instead of \\(5 − \\sqrt{6}\\). To remove the root, change the sign in the bracket."
      },
      {
        "text": "\\(−5 + \\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(−5 + \\sqrt{6}\\), working out the bottom as \\(5 − 6\\). Both terms are squared: \\(5^{2} − (\\sqrt{6})^{2} = 25 − 6 = 19\\)."
      },
      {
        "text": "\\(\\frac{5 − \\sqrt{6}}{31}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5 − \\sqrt{6}}{31}\\), getting \\(25 + 6\\) for the new bottom. \\((5 + \\sqrt{6})(5 − \\sqrt{6}) = 25 − 6 = 19\\), with a minus."
      },
      {
        "text": "\\(\\frac{5 − \\sqrt{6}}{19}\\)",
        "correct": true,
        "feedback": "Correct. Multiply top and bottom by \\((5 − \\sqrt{6})\\): the bottom is \\((5 + \\sqrt{6})(5 − \\sqrt{6}) = 25 − 6 = 19\\), so the result is \\(\\frac{5 − \\sqrt{6}}{19}\\)."
      }
    ],
    "backward": "Multiplying two brackets (earlier in this chapter).",
    "forward": "In a later chapter you use the same idea of the conjugate when you meet the difference of two squares."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "The number line shows a point \\(P\\). Which of these numbers is marked \\(P\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 438 100\" width=\"438\" height=\"100\" role=\"img\" aria-label=\"A number line from 0 to 5 with a tick and label at each whole number; a point P is marked between 2 and 3, clearly nearer 3 than 2.\" font-family=\"Helvetica, Arial, sans-serif\">\n<title>A number line from 0 to 5 with a tick and label at each whole number; a point P is marked between 2 and 3, clearly nearer 3 than 2.</title>\n<line x1=\"18\" y1=\"58\" x2=\"420\" y2=\"58\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<polygon points=\"12,58 22,53 22,63\" fill=\"#1f2937\"/>\n<polygon points=\"426,58 416,53 416,63\" fill=\"#1f2937\"/>\n<line class=\"tick\" x1=\"44\" y1=\"50\" x2=\"44\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"44\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">0</text>\n<line class=\"tick\" x1=\"114\" y1=\"50\" x2=\"114\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"114\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">1</text>\n<line class=\"tick\" x1=\"184\" y1=\"50\" x2=\"184\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"184\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">2</text>\n<line class=\"tick\" x1=\"254\" y1=\"50\" x2=\"254\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"254\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">3</text>\n<line class=\"tick\" x1=\"324\" y1=\"50\" x2=\"324\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"324\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">4</text>\n<line class=\"tick\" x1=\"394\" y1=\"50\" x2=\"394\" y2=\"66\" stroke=\"#1f2937\" stroke-width=\"2\"/>\n<text class=\"tick-label\" x=\"394\" y=\"88\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1f2937\">5</text>\n<circle id=\"P\" cx=\"241.99\" cy=\"58\" r=\"6.5\" fill=\"#1d4ed8\"/>\n<text class=\"point-label\" x=\"241.99\" y=\"40\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"bold\" fill=\"#1d4ed8\">P</text>\n</svg></div>",
    "options": [
      {
        "text": "\\(\\sqrt{2}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{2}\\). \\(2\\) is less than \\(2^{2} = 4\\), so \\(\\sqrt{2}\\) is less than \\(2\\): it lies to the left of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(P\\) is between \\(2\\) and \\(3\\), nearer \\(3\\). \\(2^{2} = 4 &lt; 8 &lt; 9 = 3^{2}\\), and \\(8\\) is more than \\(2.5^{2} = 6.25\\), so \\(\\sqrt{8}\\) is more than \\(2.5\\), the halfway mark, and is nearer \\(3\\). The other roots are in a different interval or nearer \\(2\\)."
      },
      {
        "text": "\\(\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{3}\\). \\(3\\) is less than \\(2^{2} = 4\\), so \\(\\sqrt{3}\\) is less than \\(2\\): it lies to the left of the interval where \\(P\\) is."
      },
      {
        "text": "\\(\\sqrt{5}\\)",
        "correct": false,
        "feedback": "Chose \\(\\sqrt{5}\\). It lies between \\(2\\) and \\(3\\), but on the other side of the halfway mark: \\(5\\) is less than \\(2.5^{2} = 6.25\\), so \\(\\sqrt{5}\\) is less than \\(2.5\\), the halfway mark, and is nearer \\(2\\). \\(P\\) is nearer \\(3\\)."
      }
    ],
    "backward": "Reading a position on a number line, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you compare surds by marking them on a number line."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Write \\(3^{\\frac{5}{2}}\\) in the form \\(p\\sqrt{q}\\), where \\(q\\) is as small as possible.",
    "options": [
      {
        "text": "\\(243\\)",
        "correct": false,
        "feedback": "Chose \\(243\\), using only the top of the fraction as a power and ignoring the square root from the bottom."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Chose \\(15\\), multiplying \\(3\\) by \\(5\\). A fractional power is not a multiplication."
      },
      {
        "text": "\\(5\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(5\\sqrt{3}\\), using the top of the fraction \\(5\\) as a number in front. The power \\(\\frac{5}{2}\\) means a square root and a power \\(5\\)."
      },
      {
        "text": "\\(9\\sqrt{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(3^{\\frac{5}{2}} = (\\sqrt{3})^{5} = 3^{2} × \\sqrt{3} = 9\\sqrt{3}\\)."
      }
    ],
    "backward": "A power of one half as a square root (earlier in this chapter).",
    "forward": "In a later chapter you use fractional powers in formulae with square roots."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which fraction lies between \\(\\frac{4}{5}\\) and \\(\\frac{5}{6}\\)?",
    "options": [
      {
        "text": "\\(\\frac{9}{11}\\)",
        "correct": true,
        "feedback": "Correct. With a common denominator \\(30\\), \\(\\frac{4}{5} = \\frac{24}{30}\\) and \\(\\frac{5}{6} = \\frac{25}{30}\\). \\(\\frac{9}{11}\\) is about \\(0.818\\), which is between \\(0.800\\) and \\(0.833\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{5}{6}\\). That is one of the two end values. Between means strictly inside, so an end value does not count."
      },
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{7}{6}\\), which is larger than \\(\\frac{5}{6}\\), so it lies above the pair, not between them. Compare using a common denominator or decimals."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Chose \\(1\\), which is larger than \\(\\frac{5}{6}\\), so it lies above the pair, not between them. Compare using a common denominator or decimals."
      }
    ],
    "backward": "Ordering fractions, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you find numbers between two algebraic fractions."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(9^{−\\frac{3}{2}}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{3}\\), taking the square root and the reciprocal but leaving out the power \\(3\\). The top of the fraction, \\(3\\), is the power: \\(3^{3} = 27\\)."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{9}\\), taking \\(\\frac{1}{3 × 3}\\). The power \\(3\\) means multiply \\(3\\) by itself \\(3\\) times: \\(3^{3} = 27\\)."
      },
      {
        "text": "\\(\\frac{1}{27}\\)",
        "correct": true,
        "feedback": "Correct. \\(9^{−\\frac{3}{2}} = \\frac{1}{9^{\\frac{3}{2}}} = \\frac{1}{(\\sqrt{9})^{3}} = \\frac{1}{3^{3}} = \\frac{1}{27}\\)."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "Chose \\(27\\), ignoring the negative sign in the power. A negative power means take the reciprocal, so the answer is \\(1\\) over \\(27\\)."
      }
    ],
    "backward": "Negative powers and fractional powers together (earlier in this chapter).",
    "forward": "Later in this chapter you meet powers like this in mixed problems with surds and decimals."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.4999\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{49}{100}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{49}{100}\\), which is \\(0.49\\) and stops after two digits. The \\(9s\\) go on for ever, so this is too small."
      },
      {
        "text": "\\(\\frac{499}{1000}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{499}{1000}\\), which is \\(0.499\\) and stops after three digits. The \\(9s\\) go on for ever, so this is too small."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.4999\\ldots\\). Then \\(10x = 4.999\\ldots\\) and \\(100x = 49.999\\ldots\\), so \\(100x − 10x = 49 − 4 = 45\\) and \\(90x = 45\\), so \\(x = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{9}\\), which is the value of \\(0.4444\\ldots\\). The digits after the \\(4\\) are \\(9s\\), not \\(4s\\), so the repeating digit is \\(9\\)."
      }
    ],
    "backward": "Recurring decimals written as fractions (earlier in this chapter).",
    "forward": "Later in this chapter you meet numbers with two different decimal forms and see why that happens."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "A learner expands \\((3 + \\sqrt{7})^{2}\\) in three steps. Step 1: \\((3 + \\sqrt{7})^{2} = 3^{2} + (\\sqrt{7})^{2}\\); Step 2: \\(3^{2} + (\\sqrt{7})^{2} = 9 + 7\\); Step 3: \\(9 + 7 = 16\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 1",
        "correct": true,
        "feedback": "Correct. Step 1 is where the working goes wrong: squaring a bracket also gives the middle term \\(2 × 3 × \\sqrt{7} = 6\\sqrt{7}\\), and it is missing. The other steps are correct."
      },
      {
        "text": "Step 3",
        "correct": false,
        "feedback": "Chose Step 3. Step 3 is correct: \\(9 + 7 = 16\\)."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 1 is wrong: squaring a bracket also gives the middle term \\(2 × 3 × \\sqrt{7} = 6\\sqrt{7}\\), and it is missing."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: \\(3^{2} = 9\\) and \\((\\sqrt{7})^{2} = 7\\)."
      }
    ],
    "backward": "Squaring a bracket (earlier in this chapter).",
    "forward": "Later in this chapter you rationalise denominators using the same expansion idea."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Between which two consecutive whole numbers does \\(5\\sqrt{59}\\) lie?",
    "options": [
      {
        "text": "\\(37\\) and \\(38\\)",
        "correct": false,
        "feedback": "Chose \\(37\\) and \\(38\\). \\(38^{2} = 1444\\) is already smaller than \\(1475 = 5^{2} × 59\\), so the value is above \\(38\\)."
      },
      {
        "text": "\\(38\\) and \\(39\\)",
        "correct": true,
        "feedback": "Correct. \\(5\\sqrt{59} = \\sqrt{5^{2} × 59} = \\sqrt{1475}\\), and \\(38^{2} = 1444 &lt; 1475 &lt; 1521 = 39^{2}\\), so it lies between \\(38\\) and \\(39\\)."
      },
      {
        "text": "\\(35\\) and \\(36\\)",
        "correct": false,
        "feedback": "Chose \\(35\\) and \\(36\\), multiplying the whole numbers \\(5 × 7 = 35\\) only. \\(\\sqrt{59}\\) is not exactly \\(7\\): it is a little more, so \\(5\\sqrt{59}\\) is further along than that."
      },
      {
        "text": "\\(12\\) and \\(13\\)",
        "correct": false,
        "feedback": "Chose \\(12\\) and \\(13\\), adding \\(5 + 7 = 12\\). The notation \\(5\\sqrt{59}\\) means \\(5 × \\sqrt{59}\\), a product, so the value is much bigger than \\(5 + 7\\)."
      }
    ],
    "backward": "Estimating a square root and then doubling it, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you write \\(a\\sqrt{b}\\) as a single root, \\(\\sqrt{a^{2} × b}\\), and compare surds that way."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Work out \\(0.444\\ldots × 27^{\\frac{2}{3}}\\).",
    "options": [
      {
        "text": "\\(324\\)",
        "correct": false,
        "feedback": "Chose \\(324\\), using only the top of the index as a power: \\(27^{2} = 729\\). The bottom, \\(3\\), is a cube root as well."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{4}{3}\\), taking only the cube root, \\(3\\), and leaving out the power \\(2\\). \\(3^{2} = 9\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(0.444\\ldots = \\frac{4}{9}\\) and \\(27^{\\frac{2}{3}} = 3^{2} = 9\\), so \\(0.444\\ldots × 27^{\\frac{2}{3}} = (\\frac{4}{9}) × 9 = 4\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Chose \\(36\\), using \\(0.444\\ldots\\) as \\(4\\). The recurring decimal \\(0.444\\ldots\\) equals \\(\\frac{4}{9}\\), which is less than \\(1\\)."
      }
    ],
    "backward": "Recurring decimals as fractions, then fractional powers, from Stage 9 (S9-Ch8).",
    "forward": "In a later chapter you use exact fractions and indices together in equations."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which statement is true?",
    "options": [
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
        "text": "Every rational number is a whole number.",
        "correct": false,
        "feedback": "Chose \"Every rational number is a whole number.\" Counter-example: \\(\\frac{3}{4}\\) is rational but not a whole number, so the statement is false."
      },
      {
        "text": "Every whole number is an integer.",
        "correct": true,
        "feedback": "Correct. Every whole number is also an integer, because the sets are nested: natural ⊂ whole ⊂ integers ⊂ rational."
      }
    ],
    "backward": "The number sets and how they nest, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you test whether a statement about numbers holds for every value."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "A culture starts with \\(1\\) bacterium. The number of bacteria doubles every hour. After how many hours are there \\(256\\) bacteria?",
    "options": [
      {
        "text": "\\(16\\) hours",
        "correct": false,
        "feedback": "Chose \\(16\\) hours, working out \\(2 × 8\\). The power is \\(8\\) because \\(2^{8} = 256\\); \\(2 × 8\\) is not a power."
      },
      {
        "text": "\\(9\\) hours",
        "correct": false,
        "feedback": "Chose \\(9\\) hours, counting the starting \\(1\\) as a number in the list \\(1\\), \\(2\\), \\(4\\), …, \\(256\\). That list has \\(9\\) numbers, but only \\(8\\) doublings."
      },
      {
        "text": "\\(64\\) hours",
        "correct": false,
        "feedback": "Chose \\(64\\) hours, working out \\(8^{2}\\). The base is \\(2\\) (it doubles) and the power is the number of hours: \\(2^{x} = 256\\)."
      },
      {
        "text": "\\(8\\) hours",
        "correct": true,
        "feedback": "Correct. \\(2^{8} = 256\\), so it takes \\(8\\) hours."
      }
    ],
    "backward": "Powers of \\(2\\) and doubling, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet equations where the unknown is a power."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "A learner subtracts \\(0.111\\ldots\\) from \\(0.666\\ldots\\), writing each as a fraction first, in three steps. Step 1: \\(0.666\\ldots = \\frac{6}{9}\\); Step 2: \\(0.111\\ldots = \\frac{1}{9}\\); Step 3: \\(\\frac{6}{9} − \\frac{1}{9} = \\frac{5}{18}\\). Which step contains the first mistake?",
    "options": [
      {
        "text": "Step 3",
        "correct": true,
        "feedback": "Correct. Step 3 is where the working goes wrong: fractions are combined over a common bottom, not by subtracting the tops and adding the bottoms; the result is \\(\\frac{5}{9}\\). The other steps are correct."
      },
      {
        "text": "Step 2",
        "correct": false,
        "feedback": "Chose Step 2. Step 2 is correct: one repeating digit gives a \\(9\\) on the bottom: \\(0.111\\ldots = \\frac{1}{9}\\)."
      },
      {
        "text": "There is no mistake",
        "correct": false,
        "feedback": "Chose There is no mistake. Step 3 is wrong: fractions are combined over a common bottom, not by subtracting the tops and adding the bottoms; the result is \\(\\frac{5}{9}\\)."
      },
      {
        "text": "Step 1",
        "correct": false,
        "feedback": "Chose Step 1. Step 1 is correct: one repeating digit gives a \\(9\\) on the bottom: \\(0.666\\ldots = \\frac{6}{9}\\)."
      }
    ],
    "backward": "Subtracting fractions that have the same denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you turn recurring decimals with longer blocks into fractions."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "A rectangle has length \\(4\\sqrt{2}\\) cm and width \\(\\sqrt{7}\\) cm. What is its area?",
    "options": [
      {
        "text": "\\(4\\sqrt{9}\\) cm²",
        "correct": false,
        "feedback": "Chose \\(4\\sqrt{9}\\) cm², adding \\(2 + 7\\) under the root. Multiplying roots multiplies the numbers: \\(2 × 7 = 14\\)."
      },
      {
        "text": "\\(56\\) cm²",
        "correct": false,
        "feedback": "Chose \\(56\\) cm², multiplying \\(4 × 2 × 7\\) with no roots at all. The lengths still contain \\(\\sqrt{2}\\) and \\(\\sqrt{7}\\), which multiply to \\(\\sqrt{14}\\)."
      },
      {
        "text": "\\(4\\sqrt{14}\\) cm²",
        "correct": true,
        "feedback": "Correct. Area = \\(4\\sqrt{2} × \\sqrt{7} = 4\\sqrt{14}\\) cm²."
      },
      {
        "text": "\\(8\\sqrt{2} + 2\\sqrt{7}\\) cm²",
        "correct": false,
        "feedback": "Chose \\(8\\sqrt{2} + 2\\sqrt{7}\\) cm², which is the perimeter: two lengths plus two widths. Area is length times width."
      }
    ],
    "backward": "Area of a rectangle, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet lengths and areas that involve surds in mixed problems."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these statements about irrational numbers is correct?",
    "options": [
      {
        "text": "A decimal with a repeating block is irrational.",
        "correct": false,
        "feedback": "Chose \"A decimal with a repeating block is irrational.\" This is false. Counter-example: \\(0.2727\\ldots\\) repeats a block but equals \\(\\frac{3}{11}\\), which is rational."
      },
      {
        "text": "Every terminating decimal is a rational number.",
        "correct": true,
        "feedback": "Correct. A terminating decimal such as \\(0.375\\) equals \\(\\frac{375}{1000}\\), a fraction of two integers."
      },
      {
        "text": "\\(\\pi\\) is exactly equal to \\(\\frac{22}{7}\\).",
        "correct": false,
        "feedback": "Chose \"\\(\\pi\\) is exactly equal to \\(\\frac{22}{7}\\).\" This is false. Counter-example: \\(\\frac{22}{7} = 3.142857\\ldots\\) recurs, while \\(\\pi\\) does not repeat. \\(\\frac{22}{7}\\) is only a rational approximation of \\(\\pi\\)."
      },
      {
        "text": "Every decimal that never ends is irrational.",
        "correct": false,
        "feedback": "Chose \"Every decimal that never ends is irrational.\" This is false. Counter-example: \\(0.3333\\ldots\\) never ends, but it equals \\(\\frac{1}{3}\\), which is rational."
      }
    ],
    "backward": "Checking a statement against an example, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you test claims about numbers with examples and counter-examples."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\((\\sqrt{5})^{−4}\\)?",
    "options": [
      {
        "text": "\\(−25\\)",
        "correct": false,
        "feedback": "Chose \\(−25\\), treating the negative power as a negative number. It means reciprocal, not negative."
      },
      {
        "text": "\\(\\frac{1}{20}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{20}\\), taking \\(\\frac{1}{4 × 5}\\). The power \\(4\\) means multiply \\(\\sqrt{5}\\) by itself, not multiply \\(5\\) by \\(4\\): \\((\\sqrt{5})^{4} = 25\\)."
      },
      {
        "text": "\\(\\frac{1}{25}\\)",
        "correct": true,
        "feedback": "Correct. \\((\\sqrt{5})^{−4} = \\frac{1}{(\\sqrt{5})^{4}} = \\frac{1}{25}\\)."
      },
      {
        "text": "\\(\\frac{1}{625}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{625}\\), raising \\(5\\) to the power \\(4\\) instead of \\(\\sqrt{5}\\). \\((\\sqrt{5})^{4} = 25\\), so the answer is \\(\\frac{1}{25}\\)."
      }
    ],
    "backward": "Negative powers and powers of a root (earlier in this chapter).",
    "forward": "Later in this chapter you meet negative powers of surds in rationalising problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "Which rational number is exactly halfway between \\(\\frac{1}{2}\\) and \\(\\frac{3}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Added the tops and added the bottoms, giving \\(\\frac{2}{3}\\). That is not the halfway value: add the two fractions properly, then halve."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{3}{4}\\), the larger of the two fractions. Halfway lies between them, not at one of them."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Added the two fractions and stopped, giving \\(\\frac{5}{4}\\). Halfway means half of the sum, so divide by \\(2\\)."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(((\\frac{1}{2}) + (\\frac{3}{4})) ÷ 2 = \\frac{5}{4} ÷ 2 = \\frac{5}{8}\\)."
      }
    ],
    "backward": "Finding a common denominator, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you find a rational number between any two rational numbers."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Number systems and rational numbers",
    "question": "How many integers lie between \\(−2.5\\) and \\(3.5\\)?",
    "options": [
      {
        "text": "\\(2\\) integers",
        "correct": false,
        "feedback": "Counted only the integers below \\(0\\), giving \\(2\\) integers. Zero and the positive integers up to \\(3\\) count as well."
      },
      {
        "text": "\\(6\\) integers",
        "correct": true,
        "feedback": "Correct. The integers are \\(−2\\), \\(−1\\), \\(0\\), \\(1\\), \\(2\\), \\(3\\), which is \\(6\\) integers."
      },
      {
        "text": "\\(4\\) integers",
        "correct": false,
        "feedback": "Counted only from \\(0\\) upwards, giving \\(4\\) integers. The negative integers between \\(−2.5\\) and \\(0\\) count as well."
      },
      {
        "text": "\\(5\\) integers",
        "correct": false,
        "feedback": "Subtracted the end integers, \\(3 − (−2) = 5\\), giving \\(5\\) integers. That counts the gaps, not the integers: there is one more integer than there are gaps."
      }
    ],
    "backward": "Negative numbers and decimals on a number line, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you count integers between roots as well as decimals."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write the recurring decimal \\(0.272727\\ldots\\) as a fraction in its simplest form.",
    "options": [
      {
        "text": "\\(\\frac{27}{100}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{27}{100}\\), which is the decimal \\(0.27\\) written as a fraction. It treats the decimal as if it stopped, but it keeps going, so the value is not exact."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.272727\\ldots\\). Then \\(100x = 27.272727\\ldots\\), so \\(100x − x = 27\\), so \\(99x = 27\\) and \\(x = \\frac{27}{99} = \\frac{3}{11}\\)."
      },
      {
        "text": "\\(\\frac{11}{3}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{11}{3}\\), which is the correct fraction upside down. The decimal is less than \\(1\\), so the top must be smaller than the bottom."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Chose \\(3\\), which is \\(\\frac{27}{9}\\) simplified: it uses a single \\(9\\) in the bottom although two digits repeat. Two repeating digits need \\(99\\) in the bottom."
      }
    ],
    "backward": "Simplifying a fraction to lowest terms, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you use this conversion inside bigger calculations."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Decimal expansions",
    "question": "Write \\(\\frac{8}{9}\\) as a decimal.",
    "options": [
      {
        "text": "\\(0.8\\)",
        "correct": false,
        "feedback": "Chose \\(0.8\\), stopping after the digits shown as if the decimal ended. \\(\\frac{8}{9}\\) never ends: the digit \\(8\\) keeps repeating, so the decimal is not terminating."
      },
      {
        "text": "\\(0.88\\)",
        "correct": false,
        "feedback": "Chose \\(0.88\\), which stops after two blocks. The block \\(8\\) repeats for ever."
      },
      {
        "text": "\\(0.89\\)",
        "correct": false,
        "feedback": "Chose \\(0.89\\), which is the decimal rounded to \\(2\\) decimal places. A rounded decimal ends, but \\(\\frac{8}{9}\\) does not: its exact form repeats for ever."
      },
      {
        "text": "\\(0.888\\ldots\\)",
        "correct": true,
        "feedback": "Correct. \\(8 ÷ 9 = 0.888\\ldots\\): the digit \\(8\\) repeats for ever."
      }
    ],
    "backward": "Dividing the top number by the bottom when digits repeat, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you convert recurring decimals such as this back into fractions."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Use these squares: \\(3.0^{2} = 9.00\\), \\(3.1^{2} = 9.61\\), \\(3.2^{2} = 10.24\\), \\(3.3^{2} = 10.89\\). Between which two numbers, one decimal place apart, does \\(\\sqrt{10}\\) lie?",
    "options": [
      {
        "text": "\\(3.1\\) and \\(3.2\\)",
        "correct": true,
        "feedback": "Correct. \\(9.61 &lt; 10 &lt; 10.24\\), so \\(3.1 &lt; \\sqrt{10} &lt; 3.2\\)."
      },
      {
        "text": "\\(3.0\\) and \\(3.1\\)",
        "correct": false,
        "feedback": "Chose \\(3.0\\) and \\(3.1\\). Both squares, \\(9.00\\) and \\(9.61\\), are smaller than \\(10\\), so \\(\\sqrt{10}\\) is bigger than both."
      },
      {
        "text": "\\(3\\) and \\(4\\)",
        "correct": false,
        "feedback": "Chose \\(3\\) and \\(4\\). \\(\\sqrt{10}\\) does lie there, but those numbers are a whole unit apart. The question asks for two numbers one decimal place apart."
      },
      {
        "text": "\\(3.2\\) and \\(3.3\\)",
        "correct": false,
        "feedback": "Chose \\(3.2\\) and \\(3.3\\). Both squares, \\(10.24\\) and \\(10.89\\), are bigger than \\(10\\), so \\(\\sqrt{10}\\) is smaller than both."
      }
    ],
    "backward": "Squaring decimals and reading from a table, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use the same bracketing idea to solve equations by trial."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Irrational numbers and the real line",
    "question": "Which of these decimals is irrational?",
    "options": [
      {
        "text": "\\(0.083333\\ldots\\) (the \\(3\\) repeats)",
        "correct": false,
        "feedback": "Chose \\(0.083333\\ldots\\) (the \\(3\\) repeats). This is rational: the digit \\(3\\) repeats for ever, so the decimal is recurring and rational, equal to \\(\\frac{1}{12}\\)."
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
      },
      {
        "text": "\\(0.101001000100001\\ldots\\) (the \\(0s\\) between the \\(1s\\) keep growing)",
        "correct": true,
        "feedback": "Correct. In \\(0.101001000100001\\ldots\\), the number of \\(0s\\) between the \\(1s\\) grows every time, so no block of digits ever repeats. A decimal that never ends and never repeats is irrational."
      }
    ],
    "backward": "Terminating and recurring decimals, from Stage 9 (S9-Ch8).",
    "forward": "Later in this chapter you identify irrational decimals from their patterns."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "Simplify \\((5x^{3})^{3}\\).",
    "options": [
      {
        "text": "\\(125x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(125x^{6}\\), adding the powers \\(3 + 3\\). A power of a power multiplies: \\(3 × 3 = 9\\)."
      },
      {
        "text": "\\(5x^{9}\\)",
        "correct": false,
        "feedback": "Chose \\(5x^{9}\\), raising only \\(x^{3}\\) to the power \\(3\\) and leaving the coefficient \\(5\\) alone. The power \\(3\\) applies to everything inside the bracket: \\(5^{3} = 125\\)."
      },
      {
        "text": "\\(15x^{6}\\)",
        "correct": false,
        "feedback": "Chose \\(15x^{6}\\), multiplying the coefficient by \\(3\\) and adding the powers. Both parts are off: raise \\(5\\) to the power \\(3\\), and multiply the powers of \\(x\\)."
      },
      {
        "text": "\\(125x^{9}\\)",
        "correct": true,
        "feedback": "Correct. \\((5x^{3})^{3} = 5^{3} × x^{3×3} = 125x^{9}\\)."
      }
    ],
    "backward": "Raising a product to a power, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you meet negative and fractional powers of products."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Laws of exponents",
    "question": "What is the value of \\(4^{−3}\\)?",
    "options": [
      {
        "text": "\\(\\frac{1}{64}\\)",
        "correct": true,
        "feedback": "Correct. \\(4^{−3} = \\frac{1}{4^{3}} = \\frac{1}{64}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Chose \\(\\frac{1}{12}\\), taking \\(\\frac{1}{4 × 3}\\). The negative power gives \\(1\\) over \\(4^{3} = 64\\), not over \\(4 × 3\\)."
      },
      {
        "text": "\\(−\\frac{1}{64}\\)",
        "correct": false,
        "feedback": "Chose \\(−\\frac{1}{64}\\), taking the reciprocal but keeping a minus sign. The negative sign in the power only means \"reciprocal\"; the answer stays positive."
      },
      {
        "text": "\\(−12\\)",
        "correct": false,
        "feedback": "Chose \\(−12\\), multiplying \\(4\\) by \\(−3\\). A power is repeated multiplication, not \\(4 × 3\\)."
      }
    ],
    "backward": "Negative powers as reciprocals, from Stage 9 (S9-Ch1).",
    "forward": "Later in this chapter you use negative powers in fractions and in standard form."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Expand and simplify \\((2 + \\sqrt{6})^{2}\\).",
    "options": [
      {
        "text": "\\(10 + 4\\sqrt{6}\\)",
        "correct": true,
        "feedback": "Correct. \\((2 + \\sqrt{6})^{2} = 2^{2} + 2 × 2 × \\sqrt{6} + (\\sqrt{6})^{2} = 4 + 4\\sqrt{6} + 6 = 10 + 4\\sqrt{6}\\)."
      },
      {
        "text": "\\(4 + 5\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(4 + 5\\sqrt{6}\\), forgetting to square \\(\\sqrt{6}\\) in the last term. \\((\\sqrt{6})^{2} = 6\\), so the last term is \\(6\\)."
      },
      {
        "text": "\\(10 + 2\\sqrt{6}\\)",
        "correct": false,
        "feedback": "Chose \\(10 + 2\\sqrt{6}\\), with only one copy of the cross term. There are two: \\(2 × \\sqrt{6}\\) twice, giving \\(4\\sqrt{6}\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Chose \\(10\\), squaring each term and leaving out the middle term. \\((2 + \\sqrt{6})^{2}\\) has the cross term \\(2 × 2 × \\sqrt{6}\\)."
      }
    ],
    "backward": "Squaring a bracket (earlier in this chapter).",
    "forward": "In a later chapter you expand pairs of brackets in the same way with letters."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Surds",
    "question": "Simplify \\(6\\sqrt{15} ÷ 3\\sqrt{5}\\).",
    "options": [
      {
        "text": "\\(2\\sqrt{15}\\)",
        "correct": false,
        "feedback": "Chose \\(2\\sqrt{15}\\), dividing the numbers in front but not the numbers under the roots. \\(\\sqrt{15} ÷ \\sqrt{5} = \\sqrt{3}\\)."
      },
      {
        "text": "\\(18\\sqrt{3}\\)",
        "correct": false,
        "feedback": "Chose \\(18\\sqrt{3}\\), multiplying the numbers in front instead of dividing: \\(6 ÷ 3 = 2\\)."
      },
      {
        "text": "\\(2\\sqrt{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(6\\sqrt{15} ÷ 3\\sqrt{5} = (6 ÷ 3)\\sqrt{15 ÷ 5} = 2\\sqrt{3}\\)."
      },
      {
        "text": "\\(2\\sqrt{8}\\)",
        "correct": false,
        "feedback": "Chose \\(2\\sqrt{8}\\), adding the numbers under the roots. Dividing roots divides the numbers: \\(15 ÷ 5 = 3\\)."
      }
    ],
    "backward": "Dividing the numbers in front and the numbers under the roots (earlier in this chapter).",
    "forward": "Later in this chapter you use this when you rationalise and simplify surd fractions."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "What is the value of \\(0.16^{\\frac{1}{2}}\\)?",
    "options": [
      {
        "text": "\\(0.04\\)",
        "correct": false,
        "feedback": "Chose \\(0.04\\), with one decimal place too many. \\(0.16\\) has \\(2\\) decimal places, so its square root has \\(2 ÷ 2 = 1\\)."
      },
      {
        "text": "\\(0.4\\)",
        "correct": true,
        "feedback": "Correct. \\(0.16 = \\frac{16}{100}\\), so its square root is \\(\\frac{\\sqrt{16}}{\\sqrt{100}} = \\frac{4}{10} = 0.4\\)."
      },
      {
        "text": "\\(0.08\\)",
        "correct": false,
        "feedback": "Chose \\(0.08\\), halving \\(0.16\\). A power of \\(\\frac{1}{2}\\) is a square root, not half."
      },
      {
        "text": "\\(0.16\\)",
        "correct": false,
        "feedback": "Chose \\(0.16\\), leaving the number as it is. A power of \\(\\frac{1}{2}\\) means take the square root."
      }
    ],
    "backward": "Square roots of decimals, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you use roots of decimals in area and length problems."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed real-number problems",
    "question": "Between which two consecutive whole numbers does \\(2\\sqrt{7}\\) lie?",
    "options": [
      {
        "text": "\\(6\\) and \\(7\\)",
        "correct": false,
        "feedback": "Chose \\(6\\) and \\(7\\), one interval too high. \\(6^{2} = 36\\) is bigger than \\(28\\)."
      },
      {
        "text": "\\(25\\) and \\(36\\)",
        "correct": false,
        "feedback": "Chose \\(25\\) and \\(36\\), which are the squares around \\(28\\). The question asks about the root, so give \\(5\\) and \\(6\\)."
      },
      {
        "text": "\\(4\\) and \\(5\\)",
        "correct": false,
        "feedback": "Chose \\(4\\) and \\(5\\), one interval too low. \\(5^{2} = 25\\) is smaller than \\(28\\), so the value is above \\(5\\)."
      },
      {
        "text": "\\(5\\) and \\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\sqrt{7} = \\sqrt{4 × 7} = \\sqrt{28}\\), and \\(25 &lt; 28 &lt; 36\\), so it lies between \\(5\\) and \\(6\\)."
      }
    ],
    "backward": "Estimating a square root, from Stage 9 (S9-Ch1).",
    "forward": "In a later chapter you estimate lengths with surds in right-angled triangles."
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
  title: "Real Numbers, Indices and Surds — Synthesis",
  subtitle: "Grade 9 · Level 3 · Synthesis",
  description: "Number sets and rational numbers, decimal expansions, irrational numbers and the real line, laws of indices, and surds — warm-up, diagnostic, and spaced recheck for synthesis.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> This diagnostic mixes the ideas. A question about number sets may hide a power, and a surd problem may need a recurring decimal first. Before you calculate, decide what the question is really asking and which topics it needs, then plan the order of your steps. There is no calculator and no time limit: the thinking is the point. If you get stuck, look for the number or expression you can simplify first.</p><p>Some questions show a learner's working: look for the first line that is not equal to the line before it. You will meet all six topics, mixed together, and some items need two of them at once.</p>",
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

// seed/mathSeedCh3DecimalsPercentagesRoundingL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 3
// (Decimals, Percentages & Rounding), Level 2 — converted from the
// standalone diagnostic JSON ch3-decimals-percentages-rounding-level-2.json.
//
// Run with: node seed/mathSeedCh3DecimalsPercentagesRoundingL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-3-decimals-percentages-rounding";
const CHAPTER_NAME = "Decimals, Percentages & Rounding";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "powers10": "Multiplying and dividing by powers of 10",
  "multDec": "Multiplying decimals",
  "divDec": "Dividing decimals",
  "percentages": "Understanding percentages (including compound)",
  "bounds": "Understanding upper and lower bounds",
  "mixed": "Mixed applications (synthesis)"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(4.5 \\times 100 \\div 1000\\).",
    "options": [
      {
        "text": "\\(0.45\\)",
        "correct": true,
        "feedback": "Correct. \\(4.5 \\times 100 = 450\\); \\(450 \\div 1000 = 0.45\\)."
      },
      {
        "text": "\\(4.5\\)",
        "correct": false,
        "feedback": "You may have shifted the decimal back to its original position — for example, multiplying by 100 and then dividing by 100 instead of 1000. Check both operations."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "You multiplied by 100 and divided by 10 (one place too few overall)."
      },
      {
        "text": "\\(0.045\\)",
        "correct": false,
        "feedback": "You shifted one place too far left — the net shift should be 1 place left, not 2."
      }
    ],
    "retryHint": "Do the operations in order — multiply first, then divide. Track the decimal point at each step.",
    "backward": "Multiplying then dividing by powers of 10.",
    "forward": "Chained shifts appear whenever units are converted through multiple steps."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A number is multiplied by 1000 and the result is 72. What was the number?",
    "options": [
      {
        "text": "\\(0.072\\)",
        "correct": true,
        "feedback": "Correct. Undo the ×1000 by dividing: \\(72 \\div 1000 = 0.072\\)."
      },
      {
        "text": "\\(72000\\)",
        "correct": false,
        "feedback": "You multiplied by 1000 instead of dividing."
      },
      {
        "text": "\\(0.72\\)",
        "correct": false,
        "feedback": "You divided by 100 (one place too few)."
      },
      {
        "text": "\\(7200\\)",
        "correct": false,
        "feedback": "You multiplied by 100."
      }
    ],
    "retryHint": "Multiplication by 1000 is undone by division by 1000 (shift the decimal 3 places left).",
    "backward": "Inverse operations with powers of 10.",
    "forward": "Working backwards is essential for solving equations."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.25 \\times 0.4 \\times 3\\).",
    "options": [
      {
        "text": "\\(0.3\\)",
        "correct": true,
        "feedback": "Correct. \\(0.25 \\times 0.4 = 0.1\\); \\(0.1 \\times 3 = 0.3\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You may have multiplied \\(0.25 \\times 4 = 1\\), then \\(1 \\times 3 = 3\\) (used 4 instead of 0.4)."
      },
      {
        "text": "\\(0.03\\)",
        "correct": false,
        "feedback": "You placed the decimal point one place too far left. The raw product is 0.300, which simplifies to 0.3 — not 0.03."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "retryHint": "Work left to right. Multiply the first two decimals, then multiply the result by 3.",
    "backward": "Combining decimal multiplication with a whole‑number factor.",
    "forward": "Multiple factors appear often in volume and scaling problems."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(1.5 \\times 0.06\\).",
    "options": [
      {
        "text": "\\(0.09\\)",
        "correct": true,
        "feedback": "Correct. \\(15 \\times 6 = 90\\); total decimal places = 1 + 2 = 3 → \\(0.090 = 0.09\\)."
      },
      {
        "text": "\\(0.9\\)",
        "correct": false,
        "feedback": "One decimal place too few — you may have counted only 2 decimal places instead of 3."
      },
      {
        "text": "\\(0.009\\)",
        "correct": false,
        "feedback": "One decimal place too many — the total decimal places in the question is 3, not 4."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "retryHint": "Multiply \\(15 \\times 6 = 90\\), then count decimal places: 1 in 1.5 plus 2 in 0.06 gives 3.",
    "backward": "Counting decimal places.",
    "forward": "Used when multiplying any two decimals with different place values."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(0.36 \\div 0.12 \\times 5\\).",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": true,
        "feedback": "Correct. \\(0.36 \\div 0.12 = 3\\); \\(3 \\times 5 = 15\\)."
      },
      {
        "text": "\\(1.5\\)",
        "correct": false,
        "feedback": "The first division should give 3, then \\(3 \\times 5 = 15\\). You appear to have shifted one place too few — check that \\(0.36 \\div 0.12 = 3\\) before multiplying."
      },
      {
        "text": "\\(150\\)",
        "correct": false,
        "feedback": "The multiplication by 5 does not add an extra zero to the result. \\(3 \\times 5 = 15\\), not 150."
      },
      {
        "text": "\\(0.15\\)",
        "correct": false,
        "feedback": "Verify each step separately: \\(0.36 \\div 0.12 = 3\\), then \\(3 \\times 5 = 15\\). A shift of two places in the wrong direction gives 0.15."
      }
    ],
    "retryHint": "First do the division (multiply both by 100 to make them whole), then multiply the result by 5.",
    "backward": "Dividing decimals, then multiplying by a whole number.",
    "forward": "This chain appears in rate and unit price problems."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 20% increase, a price is \\$72. What was the original price?",
    "options": [
      {
        "text": "\\(\\$60\\)",
        "correct": true,
        "feedback": "Correct. The multiplier for a 20% increase is 1.2; \\(72 \\div 1.2 = 60\\)."
      },
      {
        "text": "\\(\\$57.60\\)",
        "correct": false,
        "feedback": "You applied a further 20% decrease instead of reversing the increase."
      },
      {
        "text": "\\(\\$86.40\\)",
        "correct": false,
        "feedback": "You increased 72 by 20% again."
      },
      {
        "text": "\\(\\$90\\)",
        "correct": false,
        "feedback": "You divided by 0.8 (treating the change as a decrease)."
      }
    ],
    "retryHint": "Use the multiplier. For a 20% increase, multiply by 1.2. To reverse it, divide by 1.2.",
    "backward": "Reverse percentage problems.",
    "forward": "Finding the original price after a change is essential in finance and shopping."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 7.4 cm when rounded to 1 decimal place. Find the lower bound.",
    "options": [
      {
        "text": "\\(7.35\\)",
        "correct": true,
        "feedback": "Correct. The lower bound is 7.35, halfway to the next 1 d.p. value down."
      },
      {
        "text": "\\(7.3\\)",
        "correct": false,
        "feedback": "7.3 would round to 7.3, not 7.4."
      },
      {
        "text": "\\(7.45\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      },
      {
        "text": "\\(7.4\\)",
        "correct": false,
        "feedback": "7.4 is the rounded value, not the lower bound."
      }
    ],
    "retryHint": "The lower bound is the rounded value minus half of the rounding unit (here, 0.05).",
    "backward": "Rounding to 1 d.p.",
    "forward": "Bounds express measurement precision in science and engineering."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 0.25 kg packet of nuts costs \\$1.20. Find the price per kg, then reduce that price by 10%.",
    "options": [
      {
        "text": "\\(\\$4.32\\)",
        "correct": true,
        "feedback": "Correct. Price per kg = \\(1.20 \\div 0.25 = 4.80\\). Reduced by 10%: \\(4.80 \\times 0.9 = 4.32\\)."
      },
      {
        "text": "\\(\\$4.80\\)",
        "correct": false,
        "feedback": "This is the price per kg before the reduction. You stopped one step early."
      },
      {
        "text": "\\(\\$0.48\\)",
        "correct": false,
        "feedback": "You divided 1.20 by 2.5 instead of 0.25."
      },
      {
        "text": "\\(\\$3.60\\)",
        "correct": false,
        "feedback": "You applied a 25% reduction instead of 10% (\\(4.80 \\times 0.75 = 3.60\\))."
      }
    ],
    "retryHint": "First divide the total cost by the weight in kg to find the price per kg. Then apply the 10% reduction.",
    "backward": "Decimal division followed by percentage decrease.",
    "forward": "Real‑world problems chain a unit rate onto a percentage change."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.084 \\times 1000 \\div 100\\).",
    "options": [
      {
        "text": "\\(0.84\\)",
        "correct": true,
        "feedback": "Correct. \\(0.084 \\times 1000 = 84\\); \\(84 \\div 100 = 0.84\\)."
      },
      {
        "text": "\\(8.4\\)",
        "correct": false,
        "feedback": "You divided by 10 instead of 100 (one fewer zero), so the net shift is two places right instead of one. The correct answer is 0.84."
      },
      {
        "text": "\\(84\\)",
        "correct": false,
        "feedback": "You forgot the division by 100."
      },
      {
        "text": "\\(0.084\\)",
        "correct": false,
        "feedback": "You shifted one place too far left — the net shift should be 1 place right."
      }
    ],
    "backward": "Chained shifts of the decimal point.",
    "forward": "Essential for handling measurements with mixed units."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price increases by 25%, then the result decreases by 20%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(0\\%\\) change",
        "correct": true,
        "feedback": "Correct. \\(1.25 \\times 0.8 = 1.00\\), so the price is unchanged overall."
      },
      {
        "text": "\\(5\\%\\) increase",
        "correct": false,
        "feedback": "You added the changes (25% − 20% = 5%). Multiply the multipliers instead."
      },
      {
        "text": "\\(5\\%\\) decrease",
        "correct": false,
        "feedback": "You assumed the decrease dominated; the multipliers cancel exactly."
      },
      {
        "text": "\\(45\\%\\) change",
        "correct": false,
        "feedback": "You added the absolute values of the changes."
      }
    ],
    "backward": "Using multipliers to combine successive changes.",
    "forward": "This demonstrates why percentages never simply add."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.15 \\times 0.4 \\times 2.5\\).",
    "options": [
      {
        "text": "\\(0.15\\)",
        "correct": true,
        "feedback": "Correct. \\(0.15 \\times 0.4 = 0.06\\); \\(0.06 \\times 2.5 = 0.15\\)."
      },
      {
        "text": "\\(1.5\\)",
        "correct": false,
        "feedback": "One decimal place too few — check the total decimal places across all factors."
      },
      {
        "text": "\\(0.015\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used when computing volumes and weighted averages."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has sides 5.4 cm and 3.2 cm, each measured to 1 decimal place. Find the lower bound of its area.",
    "options": [
      {
        "text": "\\(16.8525\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Lower bounds: \\(5.35\\) and \\(3.15\\). \\(5.35 \\times 3.15 = 16.8525\\) cm²."
      },
      {
        "text": "\\(17.28\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the stated values (\\(5.4 \\times 3.2\\)), giving the nominal area, not the lower bound."
      },
      {
        "text": "\\(17.7125\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both upper bounds (\\(5.45 \\times 3.25\\)), giving the maximum area."
      },
      {
        "text": "\\(17.3875\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You mixed upper and lower bounds (\\(5.35 \\times 3.25\\)), giving neither extreme."
      }
    ],
    "backward": "Lower bounds applied to a product.",
    "forward": "Used for worst‑case scenarios in engineering and construction."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(1.44 \\div 0.12 \\div 0.4\\).",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. \\(1.44 \\div 0.12 = 12\\); \\(12 \\div 0.4 = 30\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall. At each division step, multiply both dividend and divisor by the same power of 10."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "You shifted one place too many. Recheck each division step separately."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "You shifted two places too far. Track the decimal point after each operation."
      }
    ],
    "backward": "Chained division with decimals.",
    "forward": "Multi‑step division appears in rate and density problems."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 1.5 kg bag of rice costs \\$4.50. Find the price per kg, then increase that price by 20%.",
    "options": [
      {
        "text": "\\(\\$3.60\\)",
        "correct": true,
        "feedback": "Correct. Price per kg = \\(4.50 \\div 1.5 = 3.00\\). Increased by 20%: \\(3.00 \\times 1.2 = 3.60\\)."
      },
      {
        "text": "\\(\\$3.00\\)",
        "correct": false,
        "feedback": "This is the price per kg before the increase. You stopped one step early."
      },
      {
        "text": "\\(\\$5.40\\)",
        "correct": false,
        "feedback": "You increased the total cost \\(4.50 \\times 1.2 = 5.40\\) instead of the unit price."
      },
      {
        "text": "\\(\\$3.75\\)",
        "correct": false,
        "feedback": "You applied a 25% increase instead of 20% (\\(3.00 \\times 1.25 = 3.75\\))."
      }
    ],
    "backward": "Decimal division followed by percentage increase.",
    "forward": "Unit price calculations with a markup are common in retail and finance."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(3.7 \\div 10 \\times 1000\\).",
    "options": [
      {
        "text": "\\(370\\)",
        "correct": true,
        "feedback": "Correct. \\(3.7 \\div 10 = 0.37\\); \\(0.37 \\times 1000 = 370\\)."
      },
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall."
      },
      {
        "text": "\\(3700\\)",
        "correct": false,
        "feedback": "You shifted one place too many overall."
      },
      {
        "text": "\\(0.37\\)",
        "correct": false,
        "feedback": "You forgot the multiplication."
      }
    ],
    "backward": "Chained shifts of the decimal.",
    "forward": "Used in unit conversions through multiple steps."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A population decreases by 10% and then increases by 10%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(1\\%\\) decrease",
        "correct": true,
        "feedback": "Correct. \\(0.9 \\times 1.1 = 0.99\\), a 1% decrease."
      },
      {
        "text": "No change",
        "correct": false,
        "feedback": "You assumed the changes cancel, but they apply to different bases."
      },
      {
        "text": "\\(1\\%\\) increase",
        "correct": false,
        "feedback": "You reversed the direction of the net change."
      },
      {
        "text": "\\(10\\%\\) decrease",
        "correct": false,
        "feedback": "You only applied one change."
      }
    ],
    "backward": "Combining successive multipliers.",
    "forward": "This is why “10% off then 10% on” does not restore the original."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(2.4 \\times 0.05 \\times 0.5\\).",
    "options": [
      {
        "text": "\\(0.06\\)",
        "correct": true,
        "feedback": "Correct. \\(2.4 \\times 0.05 = 0.12\\); \\(0.12 \\times 0.5 = 0.06\\)."
      },
      {
        "text": "\\(0.6\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.006\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used when combining partial fractions in calculations."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number \\(x\\) rounded to 1 decimal place is 4.7. Which of these could NOT be the value of \\(x\\)?",
    "options": [
      {
        "text": "\\(4.748\\)",
        "correct": false,
        "feedback": "4.748 lies in the interval \\(4.65 \\leq x < 4.75\\), so it rounds to 4.7."
      },
      {
        "text": "\\(4.751\\)",
        "correct": true,
        "feedback": "Correct. 4.751 is greater than or equal to 4.75, so it rounds up to 4.8, not 4.7."
      },
      {
        "text": "\\(4.652\\)",
        "correct": false,
        "feedback": "4.652 is inside the interval and rounds to 4.7."
      },
      {
        "text": "\\(4.699\\)",
        "correct": false,
        "feedback": "4.699 is inside the interval and rounds to 4.7."
      }
    ],
    "backward": "Using the rounding interval to test a value.",
    "forward": "This type of reasoning is used in numerical analysis and error checking."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(9.6 \\div 0.4 \\div 0.8\\).",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. \\(9.6 \\div 0.4 = 24\\); \\(24 \\div 0.8 = 30\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall. Multiply both numbers by the same power of 10 at each step."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "You shifted two places too far. Work through each division step separately."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "You shifted one place too many."
      }
    ],
    "backward": "Chained division with decimals.",
    "forward": "This appears in average rate problems."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 2.5 kg bag of rice costs \\$6.00 and a 1.5 kg bag costs \\$3.90. Which is better value per kg, and by how much?",
    "options": [
      {
        "text": "2.5 kg bag, by \\$0.20/kg",
        "correct": true,
        "feedback": "Correct. 2.5 kg: \\(6.00 \\div 2.5 = 2.40\\)/kg; 1.5 kg: \\(3.90 \\div 1.5 = 2.60\\)/kg. The 2.5 kg bag is cheaper by \\$0.20/kg."
      },
      {
        "text": "1.5 kg bag, by \\$0.20/kg",
        "correct": false,
        "feedback": "You chose the smaller bag, which is actually more expensive per kg."
      },
      {
        "text": "2.5 kg bag, by \\$0.40/kg",
        "correct": false,
        "feedback": "You may have subtracted the total prices (6.00 − 3.90 = 2.10) and mis‑divided."
      },
      {
        "text": "They are equal value",
        "correct": false,
        "feedback": "The unit prices differ."
      }
    ],
    "backward": "Unit price comparison.",
    "forward": "This reasoning is used in every shopping decision."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.0006 \\times 10000 \\div 100\\).",
    "options": [
      {
        "text": "\\(0.06\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0006 \\times 10000 = 6\\); \\(6 \\div 100 = 0.06\\)."
      },
      {
        "text": "\\(0.6\\)",
        "correct": false,
        "feedback": "One place off overall."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You forgot the division by 100."
      },
      {
        "text": "\\(0.006\\)",
        "correct": false,
        "feedback": "One place too far left."
      }
    ],
    "backward": "Combined shifts of the decimal.",
    "forward": "Used when converting very small units."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price of \\$250 is reduced by 12%, then the sale price is reduced by a further 5%. What is the final price?",
    "options": [
      {
        "text": "\\(\\$209\\)",
        "correct": true,
        "feedback": "Correct. \\(250 \\times 0.88 = 220\\); \\(220 \\times 0.95 = 209\\)."
      },
      {
        "text": "\\(\\$207.50\\)",
        "correct": false,
        "feedback": "You subtracted 17% from 250. Compound changes are not additive."
      },
      {
        "text": "\\(\\$212.50\\)",
        "correct": false,
        "feedback": "You applied a single 15% reduction (\\(250 \\times 0.85 = 212.50\\)) instead of two successive reductions of 12% and 5%."
      },
      {
        "text": "\\(\\$220\\)",
        "correct": false,
        "feedback": "You applied only the first reduction."
      }
    ],
    "backward": "Compound percentage decrease.",
    "forward": "Multi‑stage discounting is common in retail."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.35 \\times 0.2 \\times 0.4\\).",
    "options": [
      {
        "text": "\\(0.028\\)",
        "correct": true,
        "feedback": "Correct. \\(0.35 \\times 0.2 = 0.07\\); \\(0.07 \\times 0.4 = 0.028\\)."
      },
      {
        "text": "\\(0.28\\)",
        "correct": false,
        "feedback": "One decimal place too few — check the total decimal places across all factors."
      },
      {
        "text": "\\(0.0028\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(2.8\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Multi‑factor multiplication of small decimals.",
    "forward": "Essential in probability and weighted averages."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A measurement is 6.8 m to 1 decimal place. Find the upper bound of \\(3 \\times\\) this measurement.",
    "options": [
      {
        "text": "\\(20.55\\)",
        "correct": true,
        "feedback": "Correct. Upper bound of measurement = 6.85; \\(3 \\times 6.85 = 20.55\\)."
      },
      {
        "text": "\\(20.4\\)",
        "correct": false,
        "feedback": "You multiplied the nominal value (\\(3 \\times 6.8\\))."
      },
      {
        "text": "\\(20.25\\)",
        "correct": false,
        "feedback": "You multiplied the lower bound (\\(3 \\times 6.75\\))."
      },
      {
        "text": "\\(20.6\\)",
        "correct": false,
        "feedback": "You rounded to 1 d.p. (20.6) instead of giving the exact upper bound."
      }
    ],
    "backward": "Applying an upper bound through multiplication.",
    "forward": "Worst‑case estimates use this idea in project planning."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(0.9 \\div 0.15 \\div 0.2\\).",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. \\(0.9 \\div 0.15 = 6\\); \\(6 \\div 0.2 = 30\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall. Multiply both numbers by the same factor at each division step."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "You shifted two places too far. Track the decimal point after each step."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "You shifted one place too many."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "Used when dividing a quantity by two successive rates."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A car travels 240 km on 15 litres of fuel. How many litres are needed for 400 km?",
    "options": [
      {
        "text": "\\(25\\) L",
        "correct": true,
        "feedback": "Correct. Fuel per km \\(= 15 \\div 240 = 0.0625\\) L. For 400 km: \\(0.0625 \\times 400 = 25\\) L."
      },
      {
        "text": "\\(24\\) L",
        "correct": false,
        "feedback": "You assumed 240 km needs 15 L, so 400 km needs 24 L by rounding."
      },
      {
        "text": "\\(30\\) L",
        "correct": false,
        "feedback": "You added 15 L (the fuel for the extra 160 km was overestimated)."
      },
      {
        "text": "\\(20\\) L",
        "correct": false,
        "feedback": "You used 0.05 L/km instead of 0.0625 L/km (\\(400 \\times 0.05 = 20\\)). Find the fuel per km first by dividing."
      }
    ],
    "backward": "Proportional reasoning with decimals.",
    "forward": "Used in fuel economy and cost estimation."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.45 \\div 100 \\times 10000\\).",
    "options": [
      {
        "text": "\\(45\\)",
        "correct": true,
        "feedback": "Correct. \\(0.45 \\div 100 = 0.0045\\); \\(0.0045 \\times 10000 = 45\\)."
      },
      {
        "text": "\\(4.5\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(450\\)",
        "correct": false,
        "feedback": "One place too many overall."
      },
      {
        "text": "\\(0.45\\)",
        "correct": false,
        "feedback": "You forgot the multiplication."
      }
    ],
    "backward": "Chained shifts of the decimal point.",
    "forward": "Important for correctly handling unit conversions across multiple prefixes."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 30% discount, a jacket costs \\$63. What was the original price?",
    "options": [
      {
        "text": "\\(\\$90\\)",
        "correct": true,
        "feedback": "Correct. Multiplier for a 30% decrease is 0.7; \\(63 \\div 0.7 = 90\\)."
      },
      {
        "text": "\\(\\$81.90\\)",
        "correct": false,
        "feedback": "You increased the sale price by 30% (\\(63 \\times 1.3 = 81.90\\)) instead of dividing by 0.7. To reverse a 30% discount, divide by 0.7."
      },
      {
        "text": "\\(\\$93\\)",
        "correct": false,
        "feedback": "You added 30 to 63."
      },
      {
        "text": "\\(\\$100\\)",
        "correct": false,
        "feedback": "You divided by 0.63 instead of 0.7."
      }
    ],
    "backward": "Reverse percentage.",
    "forward": "Used to check sale prices and margins."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(1.2 \\times 0.25 \\times 0.4\\).",
    "options": [
      {
        "text": "\\(0.12\\)",
        "correct": true,
        "feedback": "Correct. \\(1.2 \\times 0.25 = 0.3\\); \\(0.3 \\times 0.4 = 0.12\\)."
      },
      {
        "text": "\\(1.2\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.012\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used in volume and probability calculations."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A weight is 12.5 kg to 1 decimal place. Write the error interval.",
    "options": [
      {
        "text": "\\(12.45 \\leq w < 12.55\\)",
        "correct": true,
        "feedback": "Correct. The lower bound is 12.45 and the upper bound is 12.55 (excluded, since 12.55 rounds up to 12.6)."
      },
      {
        "text": "\\(12.4 \\leq w < 12.6\\)",
        "correct": false,
        "feedback": "You used ±0.1 instead of ±0.05."
      },
      {
        "text": "\\(12.45 \\leq w \\leq 12.55\\)",
        "correct": false,
        "feedback": "The upper bound is strictly less than 12.55."
      },
      {
        "text": "\\(12.5 \\leq w < 12.6\\)",
        "correct": false,
        "feedback": "The interval is too narrow."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Error intervals are standard notation in science and engineering."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(4.8 \\div 0.06 \\div 0.8\\).",
    "options": [
      {
        "text": "\\(100\\)",
        "correct": true,
        "feedback": "Correct. \\(4.8 \\div 0.06 = 80\\); \\(80 \\div 0.8 = 100\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall. Multiply both numbers by the same power of 10 at each step."
      },
      {
        "text": "\\(1000\\)",
        "correct": false,
        "feedback": "You shifted one place too many. Recheck each division step."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "You shifted two places too far. Work through the divisions one at a time."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "This arises in cost‑per‑unit problems."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A recipe uses 0.35 kg of flour for 5 cakes. A lighter version of the recipe uses 20% less flour per cake. How much flour is needed for 8 cakes of the lighter version?",
    "options": [
      {
        "text": "\\(0.448\\) kg",
        "correct": true,
        "feedback": "Correct. Per cake originally: \\(0.35 \\div 5 = 0.07\\) kg. Scaled down by 20%: \\(0.07 \\times 0.8 = 0.056\\) kg. For 8 cakes: \\(0.056 \\times 8 = 0.448\\) kg."
      },
      {
        "text": "\\(0.56\\) kg",
        "correct": false,
        "feedback": "You multiplied \\(0.07 \\times 8\\) without applying the 20% reduction."
      },
      {
        "text": "\\(0.4\\) kg",
        "correct": false,
        "feedback": "You may have divided 0.35 by 7 instead of 5, giving 0.05 per cake. Remember the recipe is for 5 cakes, not 7."
      },
      {
        "text": "\\(0.35\\) kg",
        "correct": false,
        "feedback": "You used the original 0.35 kg directly."
      }
    ],
    "backward": "Division, percentage decrease and multiplication chained together.",
    "forward": "Real‑life scaling problems often chain several operations like this."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.75 \\times 100 \\div 10000\\).",
    "options": [
      {
        "text": "\\(0.0075\\)",
        "correct": true,
        "feedback": "Correct. \\(0.75 \\times 100 = 75\\); \\(75 \\div 10000 = 0.0075\\)."
      },
      {
        "text": "\\(0.075\\)",
        "correct": false,
        "feedback": "One place off overall."
      },
      {
        "text": "\\(0.75\\)",
        "correct": false,
        "feedback": "You only multiplied."
      },
      {
        "text": "\\(7.5\\)",
        "correct": false,
        "feedback": "You shifted the wrong way."
      }
    ],
    "backward": "Combined shifts of the decimal.",
    "forward": "Used in small‑unit conversions."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A number is divided by 100 and the result is 0.037. What was the number?",
    "options": [
      {
        "text": "\\(3.7\\)",
        "correct": true,
        "feedback": "Correct. Undo the ÷100 by multiplying: \\(0.037 \\times 100 = 3.7\\)."
      },
      {
        "text": "\\(0.37\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(370\\)",
        "correct": false,
        "feedback": "You multiplied by 10000."
      },
      {
        "text": "\\(0.00037\\)",
        "correct": false,
        "feedback": "You divided again."
      }
    ],
    "backward": "Inverse operations with powers of 10.",
    "forward": "Essential when solving equations."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.45 \\times 0.2 \\times 3\\).",
    "options": [
      {
        "text": "\\(0.27\\)",
        "correct": true,
        "feedback": "Correct. \\(0.45 \\times 0.2 = 0.09\\); \\(0.09 \\times 3 = 0.27\\)."
      },
      {
        "text": "\\(2.7\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.027\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used in weighted averages and probabilities."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(3.5 \\times 0.04\\).",
    "options": [
      {
        "text": "\\(0.14\\)",
        "correct": true,
        "feedback": "Correct. \\(35 \\times 4 = 140\\); total decimal places = 3 → \\(0.140 = 0.14\\)."
      },
      {
        "text": "\\(1.4\\)",
        "correct": false,
        "feedback": "One decimal place too few — you may have counted only 2 decimal places instead of 3."
      },
      {
        "text": "\\(0.014\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Counting decimal places.",
    "forward": "Used for any decimal multiplication."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(0.48 \\div 0.08 \\times 4\\).",
    "options": [
      {
        "text": "\\(24\\)",
        "correct": true,
        "feedback": "Correct. \\(0.48 \\div 0.08 = 6\\); \\(6 \\times 4 = 24\\)."
      },
      {
        "text": "\\(2.4\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(240\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(0.24\\)",
        "correct": false,
        "feedback": "Two places off."
      }
    ],
    "backward": "Dividing decimals, then multiplying.",
    "forward": "Used in rate problems."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(2.7 \\div 0.3 \\div 0.9\\).",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(2.7 \\div 0.3 = 9\\); \\(9 \\div 0.9 = 10\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(0.1\\)",
        "correct": false,
        "feedback": "Two places off."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "Used when dividing by two successive rates."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 15% decrease, a price is \\$68. What was the original price?",
    "options": [
      {
        "text": "\\(\\$80\\)",
        "correct": true,
        "feedback": "Correct. Multiplier for a 15% decrease is 0.85; \\(68 \\div 0.85 = 80\\)."
      },
      {
        "text": "\\(\\$78.20\\)",
        "correct": false,
        "feedback": "You subtracted 15% of 68 from 68."
      },
      {
        "text": "\\(\\$58.48\\)",
        "correct": false,
        "feedback": "You subtracted 15% of 68 twice."
      },
      {
        "text": "\\(\\$81\\)",
        "correct": false,
        "feedback": "You divided by 0.84 instead of 0.85."
      }
    ],
    "backward": "Reverse percentage.",
    "forward": "Used to find original prices and check discounts."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 25% increase, a price is \\$75. What was the original price?",
    "options": [
      {
        "text": "\\(\\$60\\)",
        "correct": true,
        "feedback": "Correct. Multiplier for 25% increase is 1.25; \\(75 \\div 1.25 = 60\\)."
      },
      {
        "text": "\\(\\$56.25\\)",
        "correct": false,
        "feedback": "You applied 25% of 75 to reduce it incorrectly."
      },
      {
        "text": "\\(\\$93.75\\)",
        "correct": false,
        "feedback": "You increased 75 by 25%."
      },
      {
        "text": "\\(\\$62.50\\)",
        "correct": false,
        "feedback": "You divided by 1.2 instead of 1.25."
      }
    ],
    "backward": "Reverse percentage.",
    "forward": "Used in discount and margin checks."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 9.3 cm to 1 decimal place. Find the upper bound.",
    "options": [
      {
        "text": "\\(9.35\\)",
        "correct": true,
        "feedback": "Correct. The upper bound is 9.35, halfway to the next 1 d.p. value."
      },
      {
        "text": "\\(9.4\\)",
        "correct": false,
        "feedback": "9.4 would round to 9.4."
      },
      {
        "text": "\\(9.25\\)",
        "correct": false,
        "feedback": "This is the lower bound."
      },
      {
        "text": "\\(9.3\\)",
        "correct": false,
        "feedback": "9.3 is the rounded value, not the upper bound."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Error intervals in measurement."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has length 8.4 cm and width 2.6 cm, each to 1 decimal place. Find the lower bound of its area.",
    "options": [
      {
        "text": "\\(21.2925\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Lower bounds: \\(8.35\\) and \\(2.55\\); \\(8.35 \\times 2.55 = 21.2925\\) cm²."
      },
      {
        "text": "\\(21.84\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the stated values (nominal area)."
      },
      {
        "text": "\\(22.3925\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both upper bounds."
      },
      {
        "text": "\\(22.1275\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You mixed an upper and a lower bound."
      }
    ],
    "backward": "Lower bounds applied to a product.",
    "forward": "Used for worst‑case scenario analysis."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 3 kg bag of sugar costs \\$4.50. Find the price per kg, then apply a 20% discount to that price.",
    "options": [
      {
        "text": "\\(\\$1.20\\)",
        "correct": true,
        "feedback": "Correct. Price per kg = \\(4.50 \\div 3 = 1.50\\). Discounted by 20%: \\(1.50 \\times 0.8 = 1.20\\)."
      },
      {
        "text": "\\(\\$1.50\\)",
        "correct": false,
        "feedback": "This is the price per kg before the discount. You stopped one step early."
      },
      {
        "text": "\\(\\$3.60\\)",
        "correct": false,
        "feedback": "You applied the discount to the total cost (\\(4.50 \\times 0.8 = 3.60\\)) instead of the unit price."
      },
      {
        "text": "\\(\\$1.35\\)",
        "correct": false,
        "feedback": "You applied a 10% discount instead of 20% (\\(1.50 \\times 0.9 = 1.35\\))."
      }
    ],
    "backward": "Decimal division followed by percentage decrease.",
    "forward": "Unit price with a discount is a common real‑world calculation."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A car travels 300 km on 20 litres of fuel. How many litres are needed for 450 km?",
    "options": [
      {
        "text": "\\(30\\) L",
        "correct": true,
        "feedback": "Correct. Fuel per km \\(= 20 \\div 300 = \\frac{1}{15}\\) L. For 450 km: \\(450 \\div 15 = 30\\) L."
      },
      {
        "text": "\\(25\\) L",
        "correct": false,
        "feedback": "You added 5 L for the extra 150 km (approximation)."
      },
      {
        "text": "\\(35\\) L",
        "correct": false,
        "feedback": "You overestimated the additional fuel."
      },
      {
        "text": "\\(22.5\\) L",
        "correct": false,
        "feedback": "You added 2.5 L to 20 L instead of finding the correct proportional increase."
      }
    ],
    "backward": "Proportional reasoning.",
    "forward": "Used in fuel economy and cost estimation."
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({
    grade: GRADE,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    phase,
    ...item
  }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [
  {
    grade: GRADE,
    gradeLabel: GRADE_LABEL,
    chapterSlug: CHAPTER_SLUG,
    chapterName: CHAPTER_NAME,
    level: LEVEL,
    title: "Decimals, Percentages & Rounding — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Chained decimal operations, compound percentage change, reverse percentages, and bounds applied to products and measurements — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Advanced Core diagnostic for decimals, percentages and rounding. Each question asks you to chain two or more steps — work through them carefully, keeping track of the decimal point and applying each operation in order. Use the feedback to sharpen your understanding.</p>",
    timedSeconds: 0
  }
];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  console.log('Connected to MongoDB');

  await Promise.all([
    MathChapter.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL }),
    MathQuestion.deleteMany({ grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL })
  ]);
  console.log('Cleared existing seed data for', GRADE, CHAPTER_SLUG, 'level', LEVEL);

  await MathChapter.insertMany(chapterDocs);
  await MathQuestion.insertMany(allQuestions);

  console.log(`Inserted ${chapterDocs.length} chapter/level catalog entries.`);
  console.log(`Inserted ${allQuestions.length} questions.`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

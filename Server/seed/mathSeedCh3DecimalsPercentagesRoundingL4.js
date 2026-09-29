// seed/mathSeedCh3DecimalsPercentagesRoundingL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 3
// (Decimals, Percentages & Rounding), Level 4 — converted from the
// standalone diagnostic JSON ch3-decimals-percentages-rounding-level-4.json.
//
// Run with: node seed/mathSeedCh3DecimalsPercentagesRoundingL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-3-decimals-percentages-rounding";
const CHAPTER_NAME = "Decimals, Percentages & Rounding";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Evaluate \\(3.6 \\times 100\\).",
    "options": [
      {
        "text": "\\(360\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 100 shifts the decimal 2 places right."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "You moved 1 place (that's ×10)."
      },
      {
        "text": "\\(0.36\\)",
        "correct": false,
        "feedback": "You divided by 10."
      },
      {
        "text": "\\(3600\\)",
        "correct": false,
        "feedback": "You moved 3 places (that's ×1000)."
      }
    ],
    "retryHint": "Multiplying by 100 shifts the decimal 2 places right.",
    "backward": "Place value with powers of 10.",
    "forward": "Used in every metric conversion."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "S",
    "question": "Increase 80 by 25%.",
    "options": [
      {
        "text": "\\(100\\)",
        "correct": true,
        "feedback": "Correct. \\(80 \\times 1.25 = 100\\)."
      },
      {
        "text": "\\(105\\)",
        "correct": false,
        "feedback": "You added 25 to 80."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You found only the increase (25% of 80 = 20)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You decreased by 25%."
      }
    ],
    "retryHint": "For a 25% increase, multiply by 1.25.",
    "backward": "Percentage multipliers.",
    "forward": "Used for prices, salaries, and interest."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "tier": "S",
    "question": "Evaluate \\(0.5 \\times 0.4\\).",
    "options": [
      {
        "text": "\\(0.2\\)",
        "correct": true,
        "feedback": "Correct. \\(5 \\times 4 = 20\\); 2 decimal places → 0.20 = 0.2."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.02\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "retryHint": "Multiply \\(5 \\times 4 = 20\\), then move the decimal 2 places left.",
    "backward": "Decimal place counting.",
    "forward": "Used in area, volume and probability."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "tier": "S",
    "question": "Evaluate \\(1.2 \\div 0.4\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10: \\(12 \\div 4 = 3\\)."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "You divided \\(1.2 \\div 4\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You multiplied by 10 too many times."
      },
      {
        "text": "\\(0.03\\)",
        "correct": false,
        "feedback": "Two place errors."
      }
    ],
    "retryHint": "Multiply both numbers by 10 to make the divisor a whole number.",
    "backward": "Making the divisor whole.",
    "forward": "Applies to all decimal division."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "tier": "C",
    "question": "A length is 5.8 cm to 1 d.p. Find the upper bound.",
    "options": [
      {
        "text": "\\(5.85\\)",
        "correct": true,
        "feedback": "Correct. The upper bound is 5.85, halfway to the next 1 d.p. value up."
      },
      {
        "text": "\\(5.9\\)",
        "correct": false,
        "feedback": "5.9 would round to 5.9, not 5.8."
      },
      {
        "text": "\\(5.75\\)",
        "correct": false,
        "feedback": "This is the lower bound."
      },
      {
        "text": "\\(5.8\\)",
        "correct": false,
        "feedback": "5.8 is the rounded value itself."
      }
    ],
    "retryHint": "For 1 d.p., the interval half‑width is 0.05.",
    "backward": "Rounding to 1 d.p.",
    "forward": "Bounds quantify measurement uncertainty."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "C",
    "question": "After a 20% decrease, a price is \\$64. What was the original price?",
    "options": [
      {
        "text": "\\(\\$80\\)",
        "correct": true,
        "feedback": "Correct. Multiplier for a 20% decrease is 0.8; \\(64 \\div 0.8 = 80\\)."
      },
      {
        "text": "\\(\\$76.80\\)",
        "correct": false,
        "feedback": "You subtracted 20% of 64 from 64."
      },
      {
        "text": "\\(\\$84\\)",
        "correct": false,
        "feedback": "You added 20 to 64."
      },
      {
        "text": "\\(\\$128\\)",
        "correct": false,
        "feedback": "You doubled the final price."
      }
    ],
    "retryHint": "For a 20% decrease, the multiplier is 0.8. Reverse by dividing.",
    "backward": "Reverse percentage.",
    "forward": "Used to find original prices and salary bases."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "T",
    "question": "A price is increased by 10%, then the new price is decreased by 10%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(1\\%\\) decrease",
        "correct": true,
        "feedback": "Correct. \\(1.1 \\times 0.9 = 0.99\\), a 1% decrease."
      },
      {
        "text": "No change",
        "correct": false,
        "feedback": "You assumed the changes cancel, but they apply to different bases."
      },
      {
        "text": "\\(1\\%\\) increase",
        "correct": false,
        "feedback": "You reversed the direction — the combined multiplier is less than 1."
      },
      {
        "text": "\\(20\\%\\) decrease",
        "correct": false,
        "feedback": "You added the percentages."
      }
    ],
    "retryHint": "Multiply the multipliers (\\(1.1 \\times 0.9\\)) and compare the result with 1.",
    "backward": "Compound multipliers.",
    "forward": "This is why “10% off then 10% on” does not restore the original."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "tier": "H",
    "question": "A 0.5 kg bag of coffee costs \\$6.00. Find the price per kg, then increase that price by 5%.",
    "options": [
      {
        "text": "\\(\\$12.60\\)",
        "correct": true,
        "feedback": "Correct. Price per kg = \\(6.00 \\div 0.5 = 12.00\\). Increased by 5%: \\(12.00 \\times 1.05 = 12.60\\)."
      },
      {
        "text": "\\(\\$12.00\\)",
        "correct": false,
        "feedback": "This is the price per kg before the increase. You stopped one step early."
      },
      {
        "text": "\\(\\$6.30\\)",
        "correct": false,
        "feedback": "You applied the 5% increase to the total cost, not to the unit price."
      },
      {
        "text": "\\(\\$11.40\\)",
        "correct": false,
        "feedback": "You applied a 5% decrease instead of increase."
      }
    ],
    "retryHint": "First find the price per kg by dividing. Then apply the 5% increase.",
    "backward": "Division followed by percentage increase.",
    "forward": "Unit price with a markup is a common business calculation."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "tier": "S",
    "question": "Evaluate \\(4.7 \\div 100\\).",
    "options": [
      {
        "text": "\\(0.047\\)",
        "correct": true,
        "feedback": "Correct. Dividing by 100 shifts the decimal 2 places left."
      },
      {
        "text": "\\(0.47\\)",
        "correct": false,
        "feedback": "You moved 1 place."
      },
      {
        "text": "\\(470\\)",
        "correct": false,
        "feedback": "You multiplied by 100."
      },
      {
        "text": "\\(47\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      }
    ],
    "backward": "Place value.",
    "forward": "Used in unit conversions."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "S",
    "question": "Decrease 60 by 10%.",
    "options": [
      {
        "text": "\\(54\\)",
        "correct": true,
        "feedback": "Correct. \\(60 \\times 0.9 = 54\\)."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You subtracted 10 rather than 10%."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You found only the decrease (10% of 60)."
      },
      {
        "text": "\\(66\\)",
        "correct": false,
        "feedback": "You increased instead of decreased."
      }
    ],
    "backward": "Percentage multiplier.",
    "forward": "Used for discounts and depreciation."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "tier": "C",
    "question": "Evaluate \\(1.5 \\times 0.06\\).",
    "options": [
      {
        "text": "\\(0.09\\)",
        "correct": true,
        "feedback": "Correct. \\(15 \\times 6 = 90\\); 3 decimal places → 0.090 = 0.09."
      },
      {
        "text": "\\(0.9\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(0.009\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Used in any decimal product."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "tier": "C",
    "question": "A number rounded to 1 d.p. is 8.6. What is the lower bound?",
    "options": [
      {
        "text": "\\(8.55\\)",
        "correct": true,
        "feedback": "Correct. Lower bound = 8.55, halfway to the next 1 d.p. value down."
      },
      {
        "text": "\\(8.5\\)",
        "correct": false,
        "feedback": "8.5 would round to 8.5."
      },
      {
        "text": "\\(8.65\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      },
      {
        "text": "\\(8.6\\)",
        "correct": false,
        "feedback": "8.6 is the rounded value itself."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Interval notation in measurement."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "tier": "S",
    "question": "Evaluate \\(4.8 \\div 0.6\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(48 \\div 6 = 8\\)."
      },
      {
        "text": "\\(0.8\\)",
        "correct": false,
        "feedback": "You divided \\(4.8 \\div 6\\)."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "Multiplied by 10 twice."
      },
      {
        "text": "\\(0.08\\)",
        "correct": false,
        "feedback": "Two place errors."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "Standard decimal division."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "tier": "H",
    "question": "A rectangle has sides 6.2 cm and 4.8 cm, each to 1 d.p. Find the upper bound of its area.",
    "options": [
      {
        "text": "\\(30.3125\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Upper bounds: 6.25 and 4.85; \\(6.25 \\times 4.85 = 30.3125\\) cm²."
      },
      {
        "text": "\\(29.76\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the nominal values (\\(6.2 \\times 4.8 = 29.76\\))."
      },
      {
        "text": "\\(29.2125\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both lower bounds (\\(6.15 \\times 4.75 = 29.2125\\))."
      },
      {
        "text": "\\(30.00\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the upper bound of the length with the nominal width (\\(6.25 \\times 4.8 = 30.00\\))."
      }
    ],
    "backward": "Bounds applied to area.",
    "forward": "Worst‑case error analysis in engineering."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "tier": "T",
    "question": "Evaluate \\(0.0047 \\times 10^3 \\div 10^{-1}\\).",
    "options": [
      {
        "text": "\\(47\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0047 \\times 1000 = 4.7\\); \\(4.7 \\div 0.1 = 47\\)."
      },
      {
        "text": "\\(4.7\\)",
        "correct": false,
        "feedback": "You forgot the last step and stopped at \\(0.0047 \\times 10^3 = 4.7\\)."
      },
      {
        "text": "\\(470\\)",
        "correct": false,
        "feedback": "You multiplied by 100 in the final step instead of by 10 (treating \\(10^{-1}\\) as \\(10^{-2}\\)). \\(4.7 \\times 100 = 470\\)."
      },
      {
        "text": "\\(0.47\\)",
        "correct": false,
        "feedback": "You divided by 10 in the final step instead of multiplying by 10. \\(4.7 \\div 10 = 0.47\\)."
      }
    ],
    "backward": "Negative index notation.",
    "forward": "Scientific and engineering calculation."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "C",
    "question": "A price of \\$200 is increased by 15%, then the new price is decreased by 10%. What is the final price?",
    "options": [
      {
        "text": "\\(\\$207\\)",
        "correct": true,
        "feedback": "Correct. \\(200 \\times 1.15 \\times 0.9 = 207\\)."
      },
      {
        "text": "\\(\\$230\\)",
        "correct": false,
        "feedback": "You applied only the 15% increase (\\(200 \\times 1.15 = 230\\)) and forgot the 10% decrease."
      },
      {
        "text": "\\(\\$210\\)",
        "correct": false,
        "feedback": "You added the net change (15 − 10 = 5) and applied \\(200 \\times 1.05 = 210\\). Compound changes are not additive."
      },
      {
        "text": "\\(\\$180\\)",
        "correct": false,
        "feedback": "You applied only the 10% decrease (\\(200 \\times 0.9 = 180\\)) and forgot the increase."
      }
    ],
    "backward": "Compound multipliers.",
    "forward": "Multi‑step price changes."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "tier": "S",
    "question": "Evaluate \\(0.6 \\times 0.3\\).",
    "options": [
      {
        "text": "\\(0.18\\)",
        "correct": true,
        "feedback": "Correct. \\(6 \\times 3 = 18\\); 2 decimal places → 0.18."
      },
      {
        "text": "\\(1.8\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(0.018\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Standard decimal multiplication."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "tier": "T",
    "question": "A length is 4.3 cm to 1 d.p. Which of the following could NOT be the true length?",
    "options": [
      {
        "text": "\\(4.251\\)",
        "correct": false,
        "feedback": "4.251 is inside [4.25, 4.35) and rounds to 4.3."
      },
      {
        "text": "\\(4.349\\)",
        "correct": false,
        "feedback": "4.349 is inside and rounds to 4.3."
      },
      {
        "text": "\\(4.35\\)",
        "correct": true,
        "feedback": "Correct. 4.35 rounds up to 4.4, not 4.3."
      },
      {
        "text": "\\(4.299\\)",
        "correct": false,
        "feedback": "4.299 is inside and rounds to 4.3."
      }
    ],
    "backward": "Using the rounding interval to test values.",
    "forward": "Numerical analysis and error checking."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "tier": "C",
    "question": "Evaluate \\(0.72 \\div 0.09 \\div 2\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(0.72 \\div 0.09 = 8\\); \\(8 \\div 2 = 4\\)."
      },
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(0.04\\)",
        "correct": false,
        "feedback": "Two places off."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "Rate problems with successive divisors."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "tier": "H",
    "question": "A car travels 180 km on 12 litres of fuel. Fuel costs \\$1.50 per litre. How much does the fuel for 300 km cost?",
    "options": [
      {
        "text": "\\(\\$30\\)",
        "correct": true,
        "feedback": "Correct. Fuel per km \\(= 12 \\div 180 = \\frac{1}{15}\\) L. For 300 km: \\(300 \\div 15 = 20\\) L. Cost \\(= 20 \\times 1.50 = \\$30\\)."
      },
      {
        "text": "\\(\\$25\\)",
        "correct": false,
        "feedback": "You used \\$1.25/L instead of \\$1.50/L."
      },
      {
        "text": "\\(\\$36\\)",
        "correct": false,
        "feedback": "You used 24 L for 300 km (assuming 150 km per 12 L) instead of 20 L."
      },
      {
        "text": "\\(\\$27\\)",
        "correct": false,
        "feedback": "You used 18 L for 300 km (using \\(12 \\times 1.5 = 18\\) L)."
      }
    ],
    "backward": "Proportional reasoning and unit rate.",
    "forward": "Real‑world fuel and cost estimation."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "tier": "C",
    "question": "A number is multiplied by 1000 and the result is divided by 100, giving 45. What was the number?",
    "options": [
      {
        "text": "\\(4.5\\)",
        "correct": true,
        "feedback": "Correct. Work backwards: \\(45 \\times 100 \\div 1000 = 4500 \\div 1000 = 4.5\\)."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "You reversed only one operation."
      },
      {
        "text": "\\(0.45\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(450\\)",
        "correct": false,
        "feedback": "One place too far right."
      }
    ],
    "backward": "Inverse operations with powers of 10.",
    "forward": "Solving equations involving scaling."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "H",
    "question": "A jacket is reduced by 20%, then reduced again by 25% off the sale price. The final price is \\$54. What was the original price?",
    "options": [
      {
        "text": "\\(\\$90\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 0.8 \\times 0.75 = 0.6\\). \\(54 \\div 0.6 = 90\\)."
      },
      {
        "text": "\\(\\$72\\)",
        "correct": false,
        "feedback": "You reversed only the 25% discount (\\(54 \\div 0.75 = 72\\))."
      },
      {
        "text": "\\(\\$67.50\\)",
        "correct": false,
        "feedback": "You reversed only the 20% discount (\\(54 \\div 0.8 = 67.50\\))."
      },
      {
        "text": "\\(\\$100\\)",
        "correct": false,
        "feedback": "You used 0.54 instead of 0.60 as the combined multiplier."
      }
    ],
    "backward": "Reverse compound percentage.",
    "forward": "Multi‑stage discounts in retail."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "tier": "T",
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
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.015\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Weighted averages and probability."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "tier": "S",
    "question": "A number rounded to the nearest 100 is 700. What is the lower bound?",
    "options": [
      {
        "text": "\\(650\\)",
        "correct": true,
        "feedback": "Correct. Lower bound = 650, halfway to the next hundred down."
      },
      {
        "text": "\\(600\\)",
        "correct": false,
        "feedback": "600 would round to 600."
      },
      {
        "text": "\\(699\\)",
        "correct": false,
        "feedback": "699 rounds to 700 but isn't the lowest value that does."
      },
      {
        "text": "\\(750\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      }
    ],
    "backward": "Rounding to nearest 100.",
    "forward": "Large‑scale estimation."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "tier": "T",
    "question": "Evaluate \\(0.084 \\div 0.0021\\).",
    "options": [
      {
        "text": "\\(40\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10 000: \\(840 \\div 21 = 40\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You multiplied the dividend by 1 000 and the divisor by 10 000 (a mismatch). Multiply both by the same power of 10."
      },
      {
        "text": "\\(400\\)",
        "correct": false,
        "feedback": "You multiplied the dividend and divisor by different powers of 10 — for example, 100 000 and 10 000 — giving \\(8400 \\div 21 = 400\\). Multiply both by the same power."
      },
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "One place too far left overall."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "Used when the divisor is a small decimal."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "tier": "C",
    "question": "A 2 kg bag of flour costs \\$3.60. A 3 kg bag costs \\$5.10. The 3 kg bag's unit price is then increased by 10%. What is the new unit price?",
    "options": [
      {
        "text": "\\(\\$1.87\\)",
        "correct": true,
        "feedback": "Correct. 3 kg unit price \\(= 5.10 \\div 3 = 1.70\\). Increased by 10%: \\(1.70 \\times 1.1 = 1.87\\)."
      },
      {
        "text": "\\(\\$1.70\\)",
        "correct": false,
        "feedback": "You stopped at the unit price without applying the 10% increase."
      },
      {
        "text": "\\(\\$1.98\\)",
        "correct": false,
        "feedback": "You applied the 10% increase to the 2 kg unit price (\\$1.80 × 1.1 = \\$1.98)."
      },
      {
        "text": "\\(\\$1.53\\)",
        "correct": false,
        "feedback": "You applied a 10% decrease instead of increase."
      }
    ],
    "backward": "Unit price combined with percentage increase.",
    "forward": "Retail markup on a per‑unit basis."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "tier": "S",
    "question": "Evaluate \\(0.09 \\times 100\\).",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 100 shifts the decimal 2 places right."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "You moved 3 places."
      },
      {
        "text": "\\(0.9\\)",
        "correct": false,
        "feedback": "You moved 1 place."
      },
      {
        "text": "\\(900\\)",
        "correct": false,
        "feedback": "You moved 4 places."
      }
    ],
    "backward": "Place value.",
    "forward": "Unit conversions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "tier": "C",
    "question": "After a 30% discount, a jacket costs \\$63. What was the original price?",
    "options": [
      {
        "text": "\\(\\$90\\)",
        "correct": true,
        "feedback": "Correct. Multiplier for 30% decrease is 0.7; \\(63 \\div 0.7 = 90\\)."
      },
      {
        "text": "\\(\\$81.90\\)",
        "correct": false,
        "feedback": "You increased the sale price by 30% (\\(63 \\times 1.3 = 81.90\\)) instead of dividing by 0.7."
      },
      {
        "text": "\\(\\$93\\)",
        "correct": false,
        "feedback": "You added 30 to 63."
      },
      {
        "text": "\\(\\$100\\)",
        "correct": false,
        "feedback": "You used 0.63 instead of 0.7."
      }
    ],
    "backward": "Reverse percentage.",
    "forward": "Used to check sale prices."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(6.3 \\times 100\\).",
    "options": [
      {
        "text": "\\(630\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 100 → shift 2 places right."
      },
      {
        "text": "\\(63\\)",
        "correct": false,
        "feedback": "Moved 1 place."
      },
      {
        "text": "\\(0.63\\)",
        "correct": false,
        "feedback": "Divided by 10."
      },
      {
        "text": "\\(6300\\)",
        "correct": false,
        "feedback": "Moved 3 places."
      }
    ],
    "backward": "Place value.",
    "forward": "Metric conversions."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "Increase 250 by 20%.",
    "options": [
      {
        "text": "\\(300\\)",
        "correct": true,
        "feedback": "Correct. \\(250 \\times 1.2 = 300\\)."
      },
      {
        "text": "\\(270\\)",
        "correct": false,
        "feedback": "You added 20 instead of 20%."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You found only the increase (20% of 250 = 50)."
      },
      {
        "text": "\\(320\\)",
        "correct": false,
        "feedback": "You increased by 28%."
      }
    ],
    "backward": "Percentage multiplier.",
    "forward": "Used for prices and interest."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.8 \\times 0.7\\).",
    "options": [
      {
        "text": "\\(0.56\\)",
        "correct": true,
        "feedback": "Correct. \\(8 \\times 7 = 56\\); 2 decimal places → 0.56."
      },
      {
        "text": "\\(5.6\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(0.056\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Standard decimal product."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(2.7 \\div 0.3\\).",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(27 \\div 3 = 9\\)."
      },
      {
        "text": "\\(0.9\\)",
        "correct": false,
        "feedback": "You divided \\(2.7 \\div 3\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Multiplied by 10 twice."
      },
      {
        "text": "\\(0.09\\)",
        "correct": false,
        "feedback": "Two place errors."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "Standard decimal division."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 9.4 cm to 1 d.p. Find the lower bound.",
    "options": [
      {
        "text": "\\(9.35\\)",
        "correct": true,
        "feedback": "Correct. Lower bound = 9.35."
      },
      {
        "text": "\\(9.3\\)",
        "correct": false,
        "feedback": "9.3 would round to 9.3."
      },
      {
        "text": "\\(9.45\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      },
      {
        "text": "\\(9.4\\)",
        "correct": false,
        "feedback": "9.4 is the rounded value itself."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Measurement tolerance."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 0.4 kg bag of pasta costs \\$2.80. Find the price per kg, then increase it by 15%.",
    "options": [
      {
        "text": "\\(\\$8.05\\)",
        "correct": true,
        "feedback": "Correct. Price per kg \\(= 2.80 \\div 0.4 = 7.00\\). Increased by 15%: \\(7.00 \\times 1.15 = 8.05\\)."
      },
      {
        "text": "\\(\\$7.00\\)",
        "correct": false,
        "feedback": "This is the price per kg before the increase. You stopped one step early."
      },
      {
        "text": "\\(\\$8.40\\)",
        "correct": false,
        "feedback": "You applied a 20% increase instead of 15% (\\(7.00 \\times 1.2 = 8.40\\))."
      },
      {
        "text": "\\(\\$6.44\\)",
        "correct": false,
        "feedback": "You applied an 8% decrease instead of a 15% increase (\\(7.00 \\times 0.92 = 6.44\\))."
      }
    ],
    "backward": "Division followed by percentage increase.",
    "forward": "Unit price with markup."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price is increased by 20% and then decreased by 20%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(4\\%\\) decrease",
        "correct": true,
        "feedback": "Correct. \\(1.2 \\times 0.8 = 0.96\\), a 4% decrease."
      },
      {
        "text": "No change",
        "correct": false,
        "feedback": "You assumed the changes cancel, but they apply to different bases."
      },
      {
        "text": "\\(4\\%\\) increase",
        "correct": false,
        "feedback": "You reversed the direction — the combined multiplier is less than 1."
      },
      {
        "text": "\\(40\\%\\) decrease",
        "correct": false,
        "feedback": "You added the percentages."
      }
    ],
    "backward": "Compound multipliers.",
    "forward": "Prevents faulty additive assumptions."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.006 \\times 10^4 \\div 10^{-2}\\).",
    "options": [
      {
        "text": "\\(600\\)",
        "correct": false,
        "feedback": "You multiplied by 10 in the final step instead of by 100 (treating \\(10^{-2}\\) as \\(10^{-1}\\)). \\(60 \\times 10 = 600\\), not 6000."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You forgot the final step and stopped at \\(0.006 \\times 10^4 = 60\\)."
      },
      {
        "text": "\\(6000\\)",
        "correct": true,
        "feedback": "Correct. \\(0.006 \\times 10^4 = 60\\); \\(60 \\div 10^{-2} = 60 \\times 100 = 6000\\)."
      },
      {
        "text": "\\(60000\\)",
        "correct": false,
        "feedback": "You multiplied by 1000 instead of 100 in the final step."
      }
    ],
    "backward": "Negative index notation.",
    "forward": "Scientific notation conversion."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "A rectangle has length 0.4 m and width 0.75 m. Find its area.",
    "options": [
      {
        "text": "\\(0.3\\text{ m}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(0.4 \\times 0.75 = 0.3\\) m²."
      },
      {
        "text": "\\(3.0\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.03\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(1.15\\text{ m}^2\\)",
        "correct": false,
        "feedback": "You added the sides (\\(0.4 + 0.75 = 1.15\\))."
      }
    ],
    "backward": "Decimal multiplication.",
    "forward": "Area calculations."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "A car travels 16.8 km on 0.7 litres of fuel. How far does it travel on 1 litre?",
    "options": [
      {
        "text": "\\(24\\) km",
        "correct": true,
        "feedback": "Correct. \\(16.8 \\div 0.7 = 24\\) km."
      },
      {
        "text": "\\(11.76\\) km",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      },
      {
        "text": "\\(2.4\\) km",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(240\\) km",
        "correct": false,
        "feedback": "One place too far right."
      }
    ],
    "backward": "Decimal division for unit rate.",
    "forward": "Fuel economy."
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
    title: "Decimals, Percentages & Rounding — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every decimals/percentages/rounding cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve completed the warm‑up. The next 20 questions are the <strong>Speed &amp; Strategy diagnostic</strong>. You have <strong>25 minutes</strong> in total — a timer starts when you enter. You can <strong>skip</strong> any question and come back later. Items are tiered: <strong>S</strong> (Speed) — answer fast, <strong>C</strong> (Core) — multi‑step, <strong>H</strong> (Challenge) — deeper synthesis, <strong>T</strong> (Trap) — read carefully. Move fast on easy items, slow down on traps, and don’t get stuck.</p>",
    timedSeconds: 1500
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

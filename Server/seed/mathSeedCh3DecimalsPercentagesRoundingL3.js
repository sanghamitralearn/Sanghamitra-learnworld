// seed/mathSeedCh3DecimalsPercentagesRoundingL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 3
// (Decimals, Percentages & Rounding), Level 3 — converted from the
// standalone diagnostic JSON ch3-decimals-percentages-rounding-level-3.json.
//
// Run with: node seed/mathSeedCh3DecimalsPercentagesRoundingL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-3-decimals-percentages-rounding";
const CHAPTER_NAME = "Decimals, Percentages & Rounding";
const LEVEL = 3;

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
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price is increased by 20% and then decreased by 10%. The final price is \\$108. What was the original price?",
    "options": [
      {
        "text": "\\(\\$100\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 1.2 \\times 0.9 = 1.08\\). Reverse: \\(108 \\div 1.08 = 100\\)."
      },
      {
        "text": "\\(\\$98\\)",
        "correct": false,
        "feedback": "You assumed the net change was 10% (multiplier 1.1) by adding the percentages instead of multiplying. \\(108 \\div 1.1 \\approx 98.18\\)."
      },
      {
        "text": "\\(\\$120\\)",
        "correct": false,
        "feedback": "You undid only the decrease by dividing by 0.9 (\\(108 \\div 0.9 = 120\\)). You must also reverse the 20% increase."
      },
      {
        "text": "\\(\\$90\\)",
        "correct": false,
        "feedback": "You undid only the increase by dividing by 1.2 (\\(108 \\div 1.2 = 90\\)). You must also reverse the 10% decrease."
      }
    ],
    "retryHint": "Build the combined multiplier first, then divide the final value by it.",
    "backward": "Compound multipliers and reverse percentage.",
    "forward": "Real‑world price changes never simply add."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A length is \\(0.045\\) km. How many millimetres is this? (1 km = \\(10^6\\) mm)",
    "options": [
      {
        "text": "\\(45000\\)",
        "correct": true,
        "feedback": "Correct. \\(0.045 \\times 10^6 = 45000\\) mm."
      },
      {
        "text": "\\(4500\\)",
        "correct": false,
        "feedback": "You multiplied by \\(10^5\\) — one place too few."
      },
      {
        "text": "\\(450000\\)",
        "correct": false,
        "feedback": "You multiplied by \\(10^7\\) — one place too many."
      },
      {
        "text": "\\(450\\)",
        "correct": false,
        "feedback": "You multiplied by \\(10^4\\) — two places too few."
      }
    ],
    "retryHint": "Multiplying by \\(10^6\\) shifts the decimal 6 places right.",
    "backward": "Multiplying by powers of 10 shifts the decimal.",
    "forward": "Multi‑step unit conversions appear in every science context."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\((2.4 \\div 0.06) \\div 0.5\\).",
    "options": [
      {
        "text": "\\(80\\)",
        "correct": true,
        "feedback": "Correct. \\(2.4 \\div 0.06 = 40\\); \\(40 \\div 0.5 = 80\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "One place too few overall — check that \\(2.4 \\div 0.06 = 40\\), not 4."
      },
      {
        "text": "\\(800\\)",
        "correct": false,
        "feedback": "One place too many overall — dividing by 0.5 doubles the value, not multiplies by 10."
      },
      {
        "text": "\\(0.8\\)",
        "correct": false,
        "feedback": "Two places off — verify each division step separately."
      }
    ],
    "retryHint": "Multiply both numbers by the same power of 10 at each step.",
    "backward": "Chained decimal division.",
    "forward": "Essential for dividing a quantity through successive rates."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 6.5 m to 1 d.p. Find the upper bound of \\(4 \\times\\) this length.",
    "options": [
      {
        "text": "\\(26.2\\)",
        "correct": true,
        "feedback": "Correct. Upper bound of length \\(= 6.55\\); \\(4 \\times 6.55 = 26.2\\)."
      },
      {
        "text": "\\(26.0\\)",
        "correct": false,
        "feedback": "You used the nominal value (\\(6.5 \\times 4 = 26.0\\)) instead of the upper bound."
      },
      {
        "text": "\\(26.24\\)",
        "correct": false,
        "feedback": "You used 6.56 instead of 6.55."
      },
      {
        "text": "\\(26.4\\)",
        "correct": false,
        "feedback": "You rounded the upper bound to 1 d.p. (6.6) before multiplying."
      }
    ],
    "retryHint": "Find the upper bound of the measurement first, then multiply.",
    "backward": "Upper bound applied to a product.",
    "forward": "Worst‑case estimation uses this idea in engineering."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.25 \\times 0.4 \\times 8\\).",
    "options": [
      {
        "text": "\\(0.8\\)",
        "correct": true,
        "feedback": "Correct. \\(0.25 \\times 0.4 = 0.1\\); \\(0.1 \\times 8 = 0.8\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      },
      {
        "text": "\\(0.08\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "Two places too far right."
      }
    ],
    "retryHint": "Work left to right, tracking the decimal after each multiplication.",
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used in volume, scaling and probability."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A quantity is increased by 40% and then decreased by 25%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(5\\%\\) increase",
        "correct": true,
        "feedback": "Correct. \\(1.4 \\times 0.75 = 1.05\\), a 5% increase."
      },
      {
        "text": "\\(15\\%\\) increase",
        "correct": false,
        "feedback": "You added the changes (40 − 25 = 15). Multiply the multipliers instead."
      },
      {
        "text": "\\(15\\%\\) decrease",
        "correct": false,
        "feedback": "You reversed the direction — the combined multiplier is greater than 1."
      },
      {
        "text": "No change",
        "correct": false,
        "feedback": "You assumed the changes cancel. \\(1.4 \\times 0.75 = 1.05 \\neq 1\\)."
      }
    ],
    "retryHint": "Multiply the multipliers, then compare with 1.",
    "backward": "Compound multipliers.",
    "forward": "Percentages never simply add — always multiply the multipliers."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number rounded to 2 decimal places is 3.47. What is the lower bound?",
    "options": [
      {
        "text": "\\(3.465\\)",
        "correct": true,
        "feedback": "Correct. The lower bound is \\(3.465\\), halfway to the next 2 d.p. value down."
      },
      {
        "text": "\\(3.46\\)",
        "correct": false,
        "feedback": "3.46 would round to 3.46, not 3.47."
      },
      {
        "text": "\\(3.475\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      },
      {
        "text": "\\(3.470\\)",
        "correct": false,
        "feedback": "3.470 is the rounded value itself, not the lower bound."
      }
    ],
    "retryHint": "For 2 d.p., the interval width is 0.005 on each side.",
    "backward": "Rounding to 2 d.p.",
    "forward": "Interval notation is used in measurement and numerical methods."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A mass is 4.2 kg to 1 d.p. Find the upper bound of a 25% increase on this mass.",
    "options": [
      {
        "text": "\\(5.3125\\)",
        "correct": true,
        "feedback": "Correct. Upper bound of mass \\(= 4.25\\) kg; \\(4.25 \\times 1.25 = 5.3125\\) kg."
      },
      {
        "text": "\\(5.25\\)",
        "correct": false,
        "feedback": "You used the nominal mass (\\(4.2 \\times 1.25 = 5.25\\))."
      },
      {
        "text": "\\(5.1875\\)",
        "correct": false,
        "feedback": "You used the lower bound of the mass (\\(4.15 \\times 1.25 = 5.1875\\))."
      },
      {
        "text": "\\(5.5\\)",
        "correct": false,
        "feedback": "You used 4.4 as the upper bound instead of 4.25."
      }
    ],
    "retryHint": "Find the upper bound of the measurement first, then apply the percentage increase.",
    "backward": "Bounds applied through a percentage multiplier.",
    "forward": "Used when the true value is uncertain and the outcome depends on a percentage change."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A number is multiplied by 100, then divided by 10 000, giving 0.035. What was the original number?",
    "options": [
      {
        "text": "\\(3.5\\)",
        "correct": true,
        "feedback": "Correct. Work backwards: \\(0.035 \\times 10000 \\div 100 = 350 \\div 100 = 3.5\\)."
      },
      {
        "text": "\\(0.35\\)",
        "correct": false,
        "feedback": "You shifted one place too few overall."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "You shifted one place too many overall."
      },
      {
        "text": "\\(0.035\\)",
        "correct": false,
        "feedback": "You reversed the operations incorrectly (using the same direction for both)."
      }
    ],
    "backward": "Inverse operations with powers of 10.",
    "forward": "Working backwards is essential when solving equations."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 40% increase and then a 25% decrease, a quantity is 126. What was the original quantity?",
    "options": [
      {
        "text": "\\(120\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 1.4 \\times 0.75 = 1.05\\). Reverse: \\(126 \\div 1.05 = 120\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "You divided by 1.26 instead of 1.05 — you may have added the percentages."
      },
      {
        "text": "\\(132.3\\)",
        "correct": false,
        "feedback": "You multiplied 126 by 1.05 instead of dividing by 1.05. The reverse of a 5% increase is division, not multiplication."
      },
      {
        "text": "\\(150\\)",
        "correct": false,
        "feedback": "You divided by 0.84 instead of 1.05."
      }
    ],
    "backward": "Reverse compound percentage.",
    "forward": "Used in finance for reconstructing original values."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "A rectangle has length \\(0.45\\) m and width \\(0.28\\) m. Find its area.",
    "options": [
      {
        "text": "\\(0.126\\text{ m}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(0.45 \\times 0.28 = 0.126\\) m²."
      },
      {
        "text": "\\(0.0126\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(1.26\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.73\\text{ m}^2\\)",
        "correct": false,
        "feedback": "You found the semi‑perimeter (\\(0.45 + 0.28 = 0.73\\)) instead of the area."
      }
    ],
    "backward": "Decimal multiplication applied to area.",
    "forward": "Multi‑step geometry often uses decimals."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has sides 7.5 cm and 4.2 cm, each to 1 d.p. Find the upper bound of its area.",
    "options": [
      {
        "text": "\\(32.0875\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Upper bounds: \\(7.55\\) and \\(4.25\\); \\(7.55 \\times 4.25 = 32.0875\\) cm²."
      },
      {
        "text": "\\(31.5\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the nominal values (\\(7.5 \\times 4.2 = 31.5\\))."
      },
      {
        "text": "\\(30.9175\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both lower bounds (\\(7.45 \\times 4.15 = 30.9175\\))."
      },
      {
        "text": "\\(31.875\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the nominal length (7.5) with the upper bound of the width (4.25): \\(7.5 \\times 4.25 = 31.875\\)."
      }
    ],
    "backward": "Upper bounds applied to a product.",
    "forward": "Used for worst‑case error analysis."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "A car travels 12.6 km on 0.75 litres of fuel. How far does it travel on 1 litre?",
    "options": [
      {
        "text": "\\(16.8\\) km",
        "correct": true,
        "feedback": "Correct. \\(12.6 \\div 0.75 = 16.8\\) km."
      },
      {
        "text": "\\(9.45\\) km",
        "correct": false,
        "feedback": "You multiplied \\(12.6 \\times 0.75\\)."
      },
      {
        "text": "\\(1.68\\) km",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(168\\) km",
        "correct": false,
        "feedback": "One place too far right."
      }
    ],
    "backward": "Decimal division in context.",
    "forward": "Rate problems require dividing by the divisor."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A square has side length 5.6 cm to 1 d.p. Find the difference between the upper bound and lower bound of its area.",
    "options": [
      {
        "text": "\\(1.12\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Upper bound: \\(5.65^2 = 31.9225\\). Lower bound: \\(5.55^2 = 30.8025\\). Difference \\(= 1.12\\) cm²."
      },
      {
        "text": "\\(1.11\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You rounded the bounds to 1 d.p. before squaring (\\(5.6^2 - 5.5^2 = 1.11\\))."
      },
      {
        "text": "\\(0.56\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You halved the difference."
      },
      {
        "text": "\\(2.24\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You doubled the difference."
      }
    ],
    "backward": "Bounds and squaring combined.",
    "forward": "Quantifying uncertainty in area is used in surveying and design."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.0035 \\times 10^4 \\div 10^{-2}\\).",
    "options": [
      {
        "text": "\\(3500\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0035 \\times 10^4 = 35\\); \\(35 \\div 10^{-2} = 35 \\times 100 = 3500\\)."
      },
      {
        "text": "\\(350\\)",
        "correct": false,
        "feedback": "You multiplied by 10 in the final step instead of by 100 (treating \\(10^{-2}\\) as \\(10^1\\) rather than 0.01). \\(35 \\times 10 = 350\\), not 3500."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "You forgot the last step and stopped at \\(0.0035 \\times 10^4 = 35\\)."
      },
      {
        "text": "\\(35000\\)",
        "correct": false,
        "feedback": "You multiplied by an extra power of 10 in the final step."
      }
    ],
    "backward": "Negative index notation with powers of 10.",
    "forward": "Used in scientific and engineering calculations."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A quantity is reduced by 30% and then the result is increased by 15%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(19.5\\%\\) decrease",
        "correct": true,
        "feedback": "Correct. \\(0.7 \\times 1.15 = 0.805\\), a 19.5% decrease."
      },
      {
        "text": "\\(15\\%\\) decrease",
        "correct": false,
        "feedback": "You subtracted the percentages (30 − 15 = 15). Multiply the multipliers instead."
      },
      {
        "text": "\\(19.5\\%\\) increase",
        "correct": false,
        "feedback": "You calculated the magnitude correctly but reversed the direction. \\(0.805 < 1\\), so it is a decrease."
      },
      {
        "text": "\\(30\\%\\) decrease",
        "correct": false,
        "feedback": "You applied only the first change."
      }
    ],
    "backward": "Compound multipliers with mixed operations.",
    "forward": "Understanding that reductions and increases do not cancel."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Find the volume of a cuboid with length 1.2 m, width 0.5 m and height 0.25 m.",
    "options": [
      {
        "text": "\\(0.15\\text{ m}^3\\)",
        "correct": true,
        "feedback": "Correct. \\(1.2 \\times 0.5 \\times 0.25 = 0.15\\) m³."
      },
      {
        "text": "\\(1.5\\text{ m}^3\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.015\\text{ m}^3\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(1.95\\text{ m}^3\\)",
        "correct": false,
        "feedback": "You added the three dimensions (\\(1.2 + 0.5 + 0.25 = 1.95\\))."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Volume and density calculations use this heavily."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has length 12 cm and width 8 cm, both to the nearest cm. Find the upper bound of the difference between its length and width.",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. Maximum difference \\(=\\) upper length − lower width \\(= 12.5 - 7.5 = 5\\) cm."
      },
      {
        "text": "\\(4.5\\) cm",
        "correct": false,
        "feedback": "You used the nominal length (12) minus the upper width (7.5): \\(12 - 7.5 = 4.5\\)."
      },
      {
        "text": "\\(4\\) cm",
        "correct": false,
        "feedback": "You used the nominal values (\\(12 - 8 = 4\\)), which gives the stated difference, not the upper bound."
      },
      {
        "text": "\\(3\\) cm",
        "correct": false,
        "feedback": "This is the lower bound of the difference (\\(11.5 - 8.5 = 3\\)). You found the minimum, not the maximum."
      }
    ],
    "backward": "Bounds applied to subtraction.",
    "forward": "Measurement tolerances are essential in manufacturing."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
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
        "feedback": "You multiplied both by 100 000 — one place too many."
      },
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "One place too far left overall."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "Used whenever the divisor is a small decimal."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "After a 20% discount, a price is \\$40 (to the nearest dollar). Find the lower bound of the original price.",
    "options": [
      {
        "text": "\\(\\$49.375\\)",
        "correct": true,
        "feedback": "Correct. Lower bound of discounted price \\(= \\$39.50\\). Original \\(= 39.50 \\div 0.8 = 49.375\\)."
      },
      {
        "text": "\\(\\$50\\)",
        "correct": false,
        "feedback": "You used the nominal discounted price (\\(40 \\div 0.8 = 50\\))."
      },
      {
        "text": "\\(\\$48\\)",
        "correct": false,
        "feedback": "You multiplied by 1.2 instead of dividing by 0.8."
      },
      {
        "text": "\\(\\$49.50\\)",
        "correct": false,
        "feedback": "You subtracted 0.50 from 50 instead of adjusting the input to the division."
      }
    ],
    "backward": "Bounds combined with reverse percentage.",
    "forward": "Used whenever a sale price has been rounded."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(45 \\div 10^3 \\times 10^5\\).",
    "options": [
      {
        "text": "\\(4500\\)",
        "correct": true,
        "feedback": "Correct. \\(45 \\div 1000 = 0.045\\); \\(0.045 \\times 100000 = 4500\\)."
      },
      {
        "text": "\\(450\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(45000\\)",
        "correct": false,
        "feedback": "One place too many overall."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "You forgot the multiplication."
      }
    ],
    "backward": "Chained shifts with powers of 10.",
    "forward": "Used in scientific notation conversion."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price is increased by 10%, then the new price is increased by 10% again, then decreased by 20%. What is the overall percentage change?",
    "options": [
      {
        "text": "\\(3.2\\%\\) decrease",
        "correct": true,
        "feedback": "Correct. \\(1.1 \\times 1.1 \\times 0.8 = 0.968\\), a 3.2% decrease."
      },
      {
        "text": "\\(3.2\\%\\) increase",
        "correct": false,
        "feedback": "You calculated the magnitude correctly but reversed the direction. \\(0.968 < 1\\), so it is a decrease."
      },
      {
        "text": "No change",
        "correct": false,
        "feedback": "You assumed the changes cancel, but \\(1.1 \\times 1.1 \\times 0.8 \\neq 1\\)."
      },
      {
        "text": "\\(20\\%\\) decrease",
        "correct": false,
        "feedback": "You used only the final multiplier (0.8), ignoring the two increases."
      }
    ],
    "backward": "Three successive multipliers.",
    "forward": "Compound interest and inflation use this chain of multipliers."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "A rectangle has length 0.35 m and width 0.4 m. Find its area.",
    "options": [
      {
        "text": "\\(0.14\\text{ m}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(0.35 \\times 0.4 = 0.14\\) m²."
      },
      {
        "text": "\\(1.4\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.014\\text{ m}^2\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(0.75\\text{ m}^2\\)",
        "correct": false,
        "feedback": "You added the dimensions (\\(0.35 + 0.4 = 0.75\\))."
      }
    ],
    "backward": "Decimal multiplication for area.",
    "forward": "Used in all geometric measurement."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has sides 4.5 cm and 2.3 cm, each to 1 d.p. Find the lower bound of its perimeter.",
    "options": [
      {
        "text": "\\(13.4\\) cm",
        "correct": true,
        "feedback": "Correct. Lower bounds: \\(4.45\\) and \\(2.25\\). Perimeter \\(= 2(4.45 + 2.25) = 2 \\times 6.7 = 13.4\\) cm."
      },
      {
        "text": "\\(13.6\\) cm",
        "correct": false,
        "feedback": "You used the nominal sides (\\(2(4.5+2.3) = 13.6\\))."
      },
      {
        "text": "\\(6.7\\) cm",
        "correct": false,
        "feedback": "You found only half the perimeter (the sum of the lower bounds, without doubling)."
      },
      {
        "text": "\\(13.8\\) cm",
        "correct": false,
        "feedback": "You used the upper bounds (\\(2(4.55+2.35) = 13.8\\))."
      }
    ],
    "backward": "Bounds applied to a sum.",
    "forward": "Tolerance analysis in production."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\((0.36 \\div 0.9) \\times 0.25\\).",
    "options": [
      {
        "text": "\\(0.1\\)",
        "correct": true,
        "feedback": "Correct. \\(0.36 \\div 0.9 = 0.4\\); \\(0.4 \\times 0.25 = 0.1\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.01\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "You stopped after the division and forgot to multiply by 0.25."
      }
    ],
    "backward": "Chained division and multiplication with decimals.",
    "forward": "Used in scaling and probability."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 1.5 kg bag of nuts costs \\$4.50. A 2.5 kg bag costs \\$7.00. The 2.5 kg bag's unit price is what percentage less than the 1.5 kg bag's unit price? (Give your answer to 3 s.f.)",
    "options": [
      {
        "text": "\\(6.67\\%\\)",
        "correct": true,
        "feedback": "Correct. Unit prices: \\(3.00\\)/kg and \\(2.80\\)/kg. Difference \\(= 0.20\\). \\(0.20 \\div 3.00 = 6.67\\%\\)."
      },
      {
        "text": "\\(7.14\\%\\)",
        "correct": false,
        "feedback": "You divided by 2.80 instead of 3.00 (wrong base)."
      },
      {
        "text": "\\(5.00\\%\\)",
        "correct": false,
        "feedback": "You used a difference of 0.15 instead of 0.20."
      },
      {
        "text": "\\(6.25\\%\\)",
        "correct": false,
        "feedback": "You divided by 3.20 instead of 3.00."
      }
    ],
    "backward": "Unit price comparison combined with percentage change.",
    "forward": "Real‑world value comparisons work exactly this way."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A length of 0.0075 km is converted to cm. How many cm is this? (1 km = 100 000 cm)",
    "options": [
      {
        "text": "\\(750\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0075 \\times 100000 = 750\\) cm."
      },
      {
        "text": "\\(75\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(7500\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(7.5\\)",
        "correct": false,
        "feedback": "Two places too few."
      }
    ],
    "backward": "Multiplying by a power of 10.",
    "forward": "Multi‑prefix unit conversion is standard in science."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A jacket is reduced by 30% in a sale. A further 10% is taken off the sale price at the till. The final price is \\$63. What was the original price?",
    "options": [
      {
        "text": "\\(\\$100\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 0.7 \\times 0.9 = 0.63\\). \\(63 \\div 0.63 = 100\\)."
      },
      {
        "text": "\\(\\$90\\)",
        "correct": false,
        "feedback": "You reversed only the 30% discount (\\(63 \\div 0.7 = 90\\)), forgetting the 10% till discount."
      },
      {
        "text": "\\(\\$103\\)",
        "correct": false,
        "feedback": "You added 40 to the final price rather than reversing the multipliers."
      },
      {
        "text": "\\(\\$131.25\\)",
        "correct": false,
        "feedback": "You divided by 0.48 instead of 0.63."
      }
    ],
    "backward": "Reverse compound percentage in a real context.",
    "forward": "Used to verify multi‑stage discounts."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.7 \\times 0.05 \\times 4\\).",
    "options": [
      {
        "text": "\\(0.14\\)",
        "correct": true,
        "feedback": "Correct. \\(0.7 \\times 0.05 = 0.035\\); \\(0.035 \\times 4 = 0.14\\)."
      },
      {
        "text": "\\(1.4\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.014\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "You dropped the decimal."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Used in probability and weighted averages."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A square has side length 9.5 cm to 1 d.p. Find the lower bound of its area.",
    "options": [
      {
        "text": "\\(89.3025\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Lower bound of side \\(= 9.45\\); \\(9.45^2 = 89.3025\\) cm²."
      },
      {
        "text": "\\(90.25\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the nominal side (\\(9.5^2 = 90.25\\))."
      },
      {
        "text": "\\(91.2025\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the upper bound of the side (\\(9.55^2 = 91.2025\\))."
      },
      {
        "text": "\\(89.40\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You made an arithmetic slip — \\(9.45^2 = 89.3025\\), not 89.40."
      }
    ],
    "backward": "Lower bound applied to a square.",
    "forward": "Used to bound areas from approximate measurements."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(5.4 \\div 0.09 \\div 2\\).",
    "options": [
      {
        "text": "\\(30\\)",
        "correct": true,
        "feedback": "Correct. \\(5.4 \\div 0.09 = 60\\); \\(60 \\div 2 = 30\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "One place too many overall."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "Two places off."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "Used in rate problems where the divisor has two parts."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 2.0 kg bag of flour costs \\$3.60. A 1.5 kg bag of the same flour costs \\$2.85. The more expensive unit price is what percentage greater than the cheaper one? (Give your answer to 3 s.f.)",
    "options": [
      {
        "text": "\\(5.56\\%\\)",
        "correct": true,
        "feedback": "Correct. Unit prices: \\(1.80\\)/kg and \\(1.90\\)/kg. Difference \\(= 0.10\\). \\(0.10 \\div 1.80 = 5.56\\%\\)."
      },
      {
        "text": "\\(5.26\\%\\)",
        "correct": false,
        "feedback": "You divided by the larger unit price (1.90) instead of the smaller (1.80)."
      },
      {
        "text": "\\(20.8\\%\\)",
        "correct": false,
        "feedback": "You divided the difference in total prices by the larger total (\\(0.75 \\div 3.60 \\approx 20.8\\%\\))."
      },
      {
        "text": "\\(0.10\\%\\)",
        "correct": false,
        "feedback": "You treated the raw difference (0.10) as if it were already a percentage."
      }
    ],
    "backward": "Unit price comparison and percentage change.",
    "forward": "Used to compare package deals."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "A number is divided by 1000, then multiplied by 10 000, giving 35. What was the original number?",
    "options": [
      {
        "text": "\\(3.5\\)",
        "correct": true,
        "feedback": "Correct. Work backwards: \\(35 \\div 10000 \\times 1000 = 0.0035 \\times 1000 = 3.5\\)."
      },
      {
        "text": "\\(0.35\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "You forgot to reverse the ÷1000 step."
      },
      {
        "text": "\\(350\\)",
        "correct": false,
        "feedback": "One place too many overall."
      }
    ],
    "backward": "Inverse operations with powers of 10.",
    "forward": "Used to solve equations involving scaling."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "After a 25% increase and then a 20% decrease, a quantity is 150. What was the original quantity?",
    "options": [
      {
        "text": "\\(150\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 1.25 \\times 0.8 = 1.00\\), so the value is unchanged."
      },
      {
        "text": "\\(160\\)",
        "correct": false,
        "feedback": "You added 10 — but the combined multiplier is exactly 1, so no adjustment is needed."
      },
      {
        "text": "\\(125\\)",
        "correct": false,
        "feedback": "You applied only the increase in reverse (\\(150 \\div 1.2 = 125\\))."
      },
      {
        "text": "\\(140\\)",
        "correct": false,
        "feedback": "You subtracted 10 — the multipliers cancel exactly."
      }
    ],
    "backward": "Recognising when multipliers cancel.",
    "forward": "Prevents faulty assumptions in compound change problems."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "A rectangle has length 0.75 m and width 0.4 m. Find its area.",
    "options": [
      {
        "text": "\\(0.3\\text{ m}^2\\)",
        "correct": true,
        "feedback": "Correct. \\(0.75 \\times 0.4 = 0.3\\) m²."
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
        "feedback": "You added the sides (\\(0.75 + 0.4 = 1.15\\))."
      }
    ],
    "backward": "Decimal multiplication.",
    "forward": "Area calculations with decimals are common in construction."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has sides 6.3 cm and 2.8 cm, each to 1 d.p. Find the upper bound of its area.",
    "options": [
      {
        "text": "\\(18.0975\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Upper bounds: \\(6.35\\) and \\(2.85\\); \\(6.35 \\times 2.85 = 18.0975\\) cm²."
      },
      {
        "text": "\\(17.64\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the nominal values (\\(6.3 \\times 2.8 = 17.64\\))."
      },
      {
        "text": "\\(17.1875\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both lower bounds (\\(6.25 \\times 2.75 = 17.1875\\))."
      },
      {
        "text": "\\(18.10\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You rounded the exact upper bound (18.0975) to 2 d.p. instead of giving the exact value."
      }
    ],
    "backward": "Upper bounds applied to area.",
    "forward": "Used in quality control."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "A car travels 22.5 km on 0.9 litres of fuel. How far on 1 litre?",
    "options": [
      {
        "text": "\\(25\\) km",
        "correct": true,
        "feedback": "Correct. \\(22.5 \\div 0.9 = 25\\) km."
      },
      {
        "text": "\\(20.25\\) km",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      },
      {
        "text": "\\(2.5\\) km",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(250\\) km",
        "correct": false,
        "feedback": "One place too far right."
      }
    ],
    "backward": "Decimal division for a unit rate.",
    "forward": "Used in fuel economy."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A square has side length 8.4 cm to 1 d.p. Find the difference between the upper bound and lower bound of its area.",
    "options": [
      {
        "text": "\\(1.68\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Upper bound: \\(8.45^2 = 71.4025\\). Lower bound: \\(8.35^2 = 69.7225\\). Difference \\(= 1.68\\) cm²."
      },
      {
        "text": "\\(1.70\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You rounded each square to 1 d.p. before subtracting (\\(71.4 - 69.7 = 1.7\\))."
      },
      {
        "text": "\\(0.84\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You halved the difference."
      },
      {
        "text": "\\(3.36\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You doubled the difference."
      }
    ],
    "backward": "Bounds and squaring.",
    "forward": "Uncertainty propagation in measurement."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.0024 \\times 10^4 \\div 10^{-1}\\).",
    "options": [
      {
        "text": "\\(240\\)",
        "correct": true,
        "feedback": "Correct. \\(0.0024 \\times 10^4 = 24\\); \\(24 \\div 10^{-1} = 240\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "You forgot the last step and stopped at 24."
      },
      {
        "text": "\\(2400\\)",
        "correct": false,
        "feedback": "You multiplied by 100 instead of by 10 (dividing by \\(10^{-1}\\) is the same as multiplying by 10, not 100)."
      },
      {
        "text": "\\(2.4\\)",
        "correct": false,
        "feedback": "One place too far left."
      }
    ],
    "backward": "Negative indices with powers of 10.",
    "forward": "Used in scientific notation."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price is reduced by 15%, then the sale price is reduced by 20%. The final price is \\$68. What was the original price?",
    "options": [
      {
        "text": "\\(\\$100\\)",
        "correct": true,
        "feedback": "Correct. Combined multiplier \\(= 0.85 \\times 0.8 = 0.68\\). \\(68 \\div 0.68 = 100\\)."
      },
      {
        "text": "\\(\\$85\\)",
        "correct": false,
        "feedback": "You reversed only the 20% discount (\\(68 \\div 0.8 = 85\\))."
      },
      {
        "text": "\\(\\$88\\)",
        "correct": false,
        "feedback": "You added 20 to the final price rather than reversing the multipliers."
      },
      {
        "text": "\\(\\$94.40\\)",
        "correct": false,
        "feedback": "You divided by 0.72 instead of 0.68."
      }
    ],
    "backward": "Reverse compound percentage.",
    "forward": "Multi‑stage discounts in retail."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Find the volume of a cuboid with length 0.8 m, width 0.6 m and height 0.5 m.",
    "options": [
      {
        "text": "\\(0.24\\text{ m}^3\\)",
        "correct": true,
        "feedback": "Correct. \\(0.8 \\times 0.6 \\times 0.5 = 0.24\\) m³."
      },
      {
        "text": "\\(2.4\\text{ m}^3\\)",
        "correct": false,
        "feedback": "One place too far right."
      },
      {
        "text": "\\(0.024\\text{ m}^3\\)",
        "correct": false,
        "feedback": "One place too far left."
      },
      {
        "text": "\\(1.9\\text{ m}^3\\)",
        "correct": false,
        "feedback": "You added the dimensions (\\(0.8 + 0.6 + 0.5 = 1.9\\))."
      }
    ],
    "backward": "Multi‑factor decimal multiplication.",
    "forward": "Volume and capacity calculations."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has length 15 cm and width 9 cm, both to the nearest cm. Find the lower bound of the difference between its length and width.",
    "options": [
      {
        "text": "\\(5\\) cm",
        "correct": true,
        "feedback": "Correct. Minimum difference \\(=\\) lower length − upper width \\(= 14.5 - 9.5 = 5\\) cm."
      },
      {
        "text": "\\(7\\) cm",
        "correct": false,
        "feedback": "You found the upper bound of the difference (\\(15.5 - 8.5 = 7\\))."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "You used the nominal values (\\(15 - 9 = 6\\))."
      },
      {
        "text": "\\(5.5\\) cm",
        "correct": false,
        "feedback": "You used the nominal length with the upper bound of the width (\\(15 - 9.5 = 5.5\\))."
      }
    ],
    "backward": "Bounds applied to subtraction.",
    "forward": "Measurement tolerance in engineering."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\((0.72 \\div 0.09) \\div 0.4\\).",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. \\(0.72 \\div 0.09 = 8\\); \\(8 \\div 0.4 = 20\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "One place too few overall."
      },
      {
        "text": "\\(200\\)",
        "correct": false,
        "feedback": "One place too many overall."
      },
      {
        "text": "\\(0.2\\)",
        "correct": false,
        "feedback": "Two places off."
      }
    ],
    "backward": "Chained decimal division.",
    "forward": "Used in rate problems where a quantity is divided by successive rates."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A 3 kg bag of potatoes costs \\$4.20. A 5 kg bag costs \\$6.50. The 5 kg bag's unit price is what percentage less than the 3 kg bag's unit price? (Give your answer to 3 s.f.)",
    "options": [
      {
        "text": "\\(7.14\\%\\)",
        "correct": true,
        "feedback": "Correct. Unit prices: \\$1.40/kg and \\$1.30/kg. Difference \\(= 0.10\\). \\(0.10 \\div 1.40 = 7.14\\%\\)."
      },
      {
        "text": "\\(7.69\\%\\)",
        "correct": false,
        "feedback": "You divided by 1.30 (wrong base)."
      },
      {
        "text": "\\(10.0\\%\\)",
        "correct": false,
        "feedback": "You treated the raw difference (0.10) as a percentage without dividing by the base."
      },
      {
        "text": "\\(14.3\\%\\)",
        "correct": false,
        "feedback": "You used 0.20 as the difference instead of 0.10."
      }
    ],
    "backward": "Unit price comparison plus percentage change.",
    "forward": "Shopping value comparisons."
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
    title: "Decimals, Percentages & Rounding — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning combining decimals, compound percentages, and bounds in unfamiliar contexts — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Problem‑Solving & Synthesis diagnostic for decimals, percentages and rounding. Each question asks you to build your own path — combining ideas from different topics, reasoning through uncertainty, and deciding which method to apply. Take your time, construct each solution step by step, and use the feedback to deepen your understanding.</p>",
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

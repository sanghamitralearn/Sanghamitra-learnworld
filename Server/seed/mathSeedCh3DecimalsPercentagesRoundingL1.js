// seed/mathSeedCh3DecimalsPercentagesRoundingL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 3
// (Decimals, Percentages & Rounding), Level 1 — converted from the
// standalone diagnostic JSON ch3-decimals-percentages-rounding-level-1.json.
//
// Run with: node seed/mathSeedCh3DecimalsPercentagesRoundingL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-3-decimals-percentages-rounding";
const CHAPTER_NAME = "Decimals, Percentages & Rounding";
const LEVEL = 1;

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
    "question": "Evaluate \\(3.45 \\times 100\\).",
    "options": [
      {
        "text": "\\(345\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 100 moves the decimal point 2 places right."
      },
      {
        "text": "\\(34.5\\)",
        "correct": false,
        "feedback": "You moved only 1 place (that’s ×10)."
      },
      {
        "text": "\\(0.345\\)",
        "correct": false,
        "feedback": "You divided by 10 instead of multiplying."
      },
      {
        "text": "\\(3450\\)",
        "correct": false,
        "feedback": "You moved 3 places (that’s ×1000)."
      }
    ],
    "retryHint": "Multiplying by 100 shifts the decimal point 2 places to the right.",
    "backward": "Place value — each digit shifts left.",
    "forward": "This shortcut is used constantly when converting units."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.62 \\div 10\\).",
    "options": [
      {
        "text": "\\(0.062\\)",
        "correct": true,
        "feedback": "Correct. Dividing by 10 moves the decimal point 1 place left."
      },
      {
        "text": "\\(6.2\\)",
        "correct": false,
        "feedback": "You multiplied by 10 instead of dividing."
      },
      {
        "text": "\\(0.0062\\)",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(62\\)",
        "correct": false,
        "feedback": "You multiplied by 100."
      }
    ],
    "retryHint": "Dividing by 10 moves the decimal point one place to the left.",
    "backward": "Place value with small numbers.",
    "forward": "Used when converting between metric units such as mm and cm."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.4 \\times 0.3\\).",
    "options": [
      {
        "text": "\\(0.12\\)",
        "correct": true,
        "feedback": "Correct. \\(4 \\times 3 = 12\\); the question has 2 decimal places in total, so the answer has 2."
      },
      {
        "text": "\\(1.2\\)",
        "correct": false,
        "feedback": "You used only 1 decimal place."
      },
      {
        "text": "\\(0.012\\)",
        "correct": false,
        "feedback": "You used 3 decimal places."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "retryHint": "Multiply the digits (\\(4 \\times 3 = 12\\)), then count the total decimal places in the question (1 + 1 = 2).",
    "backward": "Counting decimal places.",
    "forward": "This rule prevents place‑value errors in all decimal multiplication."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(2.5 \\times 0.4\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(25 \\times 4 = 100\\); 2 decimal places in the question → \\(1.00 = 1\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You placed the decimal point too far to the right — the answer is 1, not 10."
      },
      {
        "text": "\\(0.1\\)",
        "correct": false,
        "feedback": "You placed the decimal point one place too far to the left — the answer is 1, not 0.1."
      },
      {
        "text": "\\(0.01\\)",
        "correct": false,
        "feedback": "You placed the decimal point two places too far to the left."
      }
    ],
    "retryHint": "Multiply \\(25 \\times 4 = 100\\), then place the decimal point 2 places from the right.",
    "backward": "Decimal place counting.",
    "forward": "This process is the same for all decimal multiplications."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(4.8 \\div 0.6\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Multiply both numbers by 10: \\(48 \\div 6 = 8\\)."
      },
      {
        "text": "\\(0.8\\)",
        "correct": false,
        "feedback": "You divided \\(4.8 \\div 6\\) instead of \\(48 \\div 6\\)."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "You multiplied by 10 too many times."
      },
      {
        "text": "\\(0.08\\)",
        "correct": false,
        "feedback": "Decimal point misplaced."
      }
    ],
    "retryHint": "Multiply both the divisor and dividend by 10 until the divisor is a whole number.",
    "backward": "Making the divisor whole before dividing.",
    "forward": "This method works for any decimal division."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "Increase 200 by 10%.",
    "options": [
      {
        "text": "\\(220\\)",
        "correct": true,
        "feedback": "Correct. 10% of 200 = 20; \\(200 + 20 = 220\\)."
      },
      {
        "text": "\\(210\\)",
        "correct": false,
        "feedback": "You added 10 (the percentage number) rather than 10% of 200."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You found the increase but didn’t add it on."
      },
      {
        "text": "\\(202\\)",
        "correct": false,
        "feedback": "You added 2 rather than 20."
      }
    ],
    "retryHint": "Find 10% first (divide by 10), then add it to the original amount.",
    "backward": "Finding a percentage of an amount.",
    "forward": "Percentage increase is used for prices, populations, and interest."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number rounded to the nearest 10 is 40. What is the lower bound?",
    "options": [
      {
        "text": "\\(35\\)",
        "correct": true,
        "feedback": "Correct. The lower bound is 35, because 35 rounds up to 40."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "30 would round to 30, not 40."
      },
      {
        "text": "\\(39\\)",
        "correct": false,
        "feedback": "39 rounds to 40, but it isn’t the lowest value that does."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "40 is the rounded value, not the lower bound."
      }
    ],
    "retryHint": "The lower bound is halfway between the rounded value and the next value down.",
    "backward": "Rounding rules.",
    "forward": "Bounds are used to quantify error in measurements."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A recipe uses \\(0.25\\) kg of flour per cake. If the recipe is scaled up by 20%, how much flour is needed for 6 cakes?",
    "options": [
      {
        "text": "\\(1.8\\) kg",
        "correct": true,
        "feedback": "Correct. Scaled amount per cake: \\(0.25 \\times 1.2 = 0.3\\) kg. For 6 cakes: \\(0.3 \\times 6 = 1.8\\) kg."
      },
      {
        "text": "\\(1.5\\) kg",
        "correct": false,
        "feedback": "You used the original 0.25 kg per cake without applying the 20% increase."
      },
      {
        "text": "\\(2.1\\) kg",
        "correct": false,
        "feedback": "You added 0.1 kg per cake instead of multiplying by 1.2."
      },
      {
        "text": "\\(1.2\\) kg",
        "correct": false,
        "feedback": "You multiplied 0.25 × 6 = 1.5, then reduced by 20% instead of increasing."
      }
    ],
    "retryHint": "First apply the 20% increase to the per‑cake amount. Then multiply by 6.",
    "backward": "Percentage increase and decimal multiplication.",
    "forward": "Real‑world scaling combines percentage change with quantity calculation."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(7.8 \\times 1000\\).",
    "options": [
      {
        "text": "\\(7800\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 1000 moves the decimal 3 places right."
      },
      {
        "text": "\\(780\\)",
        "correct": false,
        "feedback": "You moved 2 places (×100)."
      },
      {
        "text": "\\(0.0078\\)",
        "correct": false,
        "feedback": "You divided instead of multiplying."
      },
      {
        "text": "\\(78000\\)",
        "correct": false,
        "feedback": "You moved 4 places."
      }
    ],
    "backward": "Place value with powers of 10.",
    "forward": "Essential for unit conversions like km to m."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price of \\$80 is increased by 10% and then increased by 10% again. Find the final price.",
    "options": [
      {
        "text": "\\(\\$96.80\\)",
        "correct": true,
        "feedback": "Correct. \\(80 \\times 1.1 = 88\\); \\(88 \\times 1.1 = 96.80\\)."
      },
      {
        "text": "\\(\\$96\\)",
        "correct": false,
        "feedback": "You added 20% to 80 — compound change is not additive."
      },
      {
        "text": "\\(\\$88\\)",
        "correct": false,
        "feedback": "You only applied one increase."
      },
      {
        "text": "\\(\\$100\\)",
        "correct": false,
        "feedback": "You rounded to the nearest ten."
      }
    ],
    "backward": "Percentage multipliers.",
    "forward": "Compound change is the basis for compound interest."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(1.2 \\times 0.5\\).",
    "options": [
      {
        "text": "\\(0.6\\)",
        "correct": true,
        "feedback": "Correct. \\(12 \\times 5 = 60\\); 2 decimal places → \\(0.60 = 0.6\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You used only 1 decimal place."
      },
      {
        "text": "\\(0.06\\)",
        "correct": false,
        "feedback": "You used 3 decimal places."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "A key step when scaling in measurement."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number rounded to 1 decimal place is 3.5. What is the upper bound?",
    "options": [
      {
        "text": "\\(3.55\\)",
        "correct": true,
        "feedback": "Correct. The upper bound is halfway to the next 1 d.p. value: \\(3.55\\)."
      },
      {
        "text": "\\(3.6\\)",
        "correct": false,
        "feedback": "3.6 would round to 3.6, not 3.5."
      },
      {
        "text": "\\(3.45\\)",
        "correct": false,
        "feedback": "This is the lower bound."
      },
      {
        "text": "\\(3.51\\)",
        "correct": false,
        "feedback": "Too close — the actual upper bound is 3.55."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Bounds are used for measurement precision."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(0.36 \\div 0.4\\).",
    "options": [
      {
        "text": "\\(0.9\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10: \\(3.6 \\div 4 = 0.9\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You multiplied the dividend by 10 but not the divisor: \\(3.6 \\div 0.4 = 9\\). Remember to multiply both numbers by the same power of 10."
      },
      {
        "text": "\\(0.09\\)",
        "correct": false,
        "feedback": "You divided by 4 without shifting correctly."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Two errors in place value."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "The same method handles any decimal division."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A rectangle has length \\(4.6\\) cm and width \\(2.3\\) cm, both measured to 1 decimal place. What is the maximum possible area?",
    "options": [
      {
        "text": "\\(10.9275\\text{ cm}^2\\)",
        "correct": true,
        "feedback": "Correct. Maximum area uses both upper bounds: \\(4.65 \\times 2.35 = 10.9275\\) cm²."
      },
      {
        "text": "\\(10.58\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used the stated values \\(4.6 \\times 2.3 = 10.58\\), which gives the nominal area, not the maximum."
      },
      {
        "text": "\\(10.2375\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You used both lower bounds \\(4.55 \\times 2.25 = 10.2375\\), which gives the minimum area."
      },
      {
        "text": "\\(10.6925\\text{ cm}^2\\)",
        "correct": false,
        "feedback": "You mixed upper and lower bounds (\\(4.55 \\times 2.35 = 10.6925\\)), which is neither maximum nor minimum."
      }
    ],
    "backward": "Upper bounds and decimal multiplication.",
    "forward": "This is essential for worst‑case error analysis in engineering."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(45.6 \\div 100\\).",
    "options": [
      {
        "text": "\\(0.456\\)",
        "correct": true,
        "feedback": "Correct. Dividing by 100 moves the decimal 2 places left."
      },
      {
        "text": "\\(4.56\\)",
        "correct": false,
        "feedback": "You moved only 1 place."
      },
      {
        "text": "\\(456\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(0.0456\\)",
        "correct": false,
        "feedback": "You moved 3 places."
      }
    ],
    "backward": "Place value with powers of 10.",
    "forward": "Used in converting cm to m, etc."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "Decrease 500 by 20%, then increase the result by 10%. Find the final value.",
    "options": [
      {
        "text": "\\(440\\)",
        "correct": true,
        "feedback": "Correct. \\(500 \\times 0.8 = 400\\); \\(400 \\times 1.1 = 440\\)."
      },
      {
        "text": "\\(450\\)",
        "correct": false,
        "feedback": "You assumed the changes cancel to −10%. They don’t, because they apply to different bases."
      },
      {
        "text": "\\(400\\)",
        "correct": false,
        "feedback": "You applied only the 20% decrease."
      },
      {
        "text": "\\(550\\)",
        "correct": false,
        "feedback": "You added the two percentage changes."
      }
    ],
    "backward": "Two successive percentage changes applied to different bases.",
    "forward": "This is why “20% off then 10% on” is not the same as “10% off”."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.7 \\times 0.8\\).",
    "options": [
      {
        "text": "\\(0.56\\)",
        "correct": true,
        "feedback": "Correct. \\(7 \\times 8 = 56\\); 2 decimal places → \\(0.56\\)."
      },
      {
        "text": "\\(5.6\\)",
        "correct": false,
        "feedback": "You used only 1 decimal place."
      },
      {
        "text": "\\(0.056\\)",
        "correct": false,
        "feedback": "You used 3 decimal places."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Used when multiplying any two decimals."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 12 cm when rounded to the nearest centimetre. What is the lower bound?",
    "options": [
      {
        "text": "\\(11.5\\) cm",
        "correct": true,
        "feedback": "Correct. The lower bound is 11.5 cm, halfway to the next lower whole number."
      },
      {
        "text": "\\(11\\) cm",
        "correct": false,
        "feedback": "11 rounds to 11, not 12."
      },
      {
        "text": "\\(12.5\\) cm",
        "correct": false,
        "feedback": "This is the upper bound."
      },
      {
        "text": "\\(11.9\\) cm",
        "correct": false,
        "feedback": "Too close — 11.9 is above the lower bound."
      }
    ],
    "backward": "Rounding to nearest 1.",
    "forward": "Bounds matter for measurement tolerances."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(7.2 \\div 0.9\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10: \\(72 \\div 9 = 8\\)."
      },
      {
        "text": "\\(0.8\\)",
        "correct": false,
        "feedback": "You divided \\(7.2 \\div 9\\)."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "You multiplied by 10 too many times."
      },
      {
        "text": "\\(0.08\\)",
        "correct": false,
        "feedback": "Two place‑value errors."
      }
    ],
    "backward": "Whole‑number divisor method.",
    "forward": "Applies to all decimal division."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A car travels \\(0.75\\) km in \\(0.5\\) minutes. At the same speed, how far does it travel in \\(1.2\\) minutes?",
    "options": [
      {
        "text": "\\(1.8\\) km",
        "correct": true,
        "feedback": "Correct. Speed \\(= 0.75 \\div 0.5 = 1.5\\) km/min. Distance \\(= 1.5 \\times 1.2 = 1.8\\) km."
      },
      {
        "text": "\\(0.9\\) km",
        "correct": false,
        "feedback": "You multiplied the distance by the new time directly (\\(0.75 \\times 1.2 = 0.9\\)) instead of finding the speed first. Divide to find speed, then multiply by time."
      },
      {
        "text": "\\(2.25\\) km",
        "correct": false,
        "feedback": "You multiplied 0.75 × 3 instead of finding speed first."
      },
      {
        "text": "\\(1.5\\) km",
        "correct": false,
        "feedback": "You multiplied 0.75 × 2 = 1.5, which corresponds to 1 minute, not 1.2 minutes."
      }
    ],
    "backward": "Dividing and multiplying decimals.",
    "forward": "Rate problems require combining division and multiplication."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.09 \\times 100\\).",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 100 moves the decimal 2 places right: \\(0.09 \\to 9\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "You moved 3 places (×1000)."
      },
      {
        "text": "\\(0.9\\)",
        "correct": false,
        "feedback": "You moved only 1 place (×10)."
      },
      {
        "text": "\\(900\\)",
        "correct": false,
        "feedback": "You moved 4 places."
      }
    ],
    "backward": "Place value.",
    "forward": "Used when converting between units."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A population of 2000 increases by 5% in one year, then by 5% again the next year. Find the final population.",
    "options": [
      {
        "text": "\\(2205\\)",
        "correct": true,
        "feedback": "Correct. \\(2000 \\times 1.05 = 2100\\); \\(2100 \\times 1.05 = 2205\\)."
      },
      {
        "text": "\\(2200\\)",
        "correct": false,
        "feedback": "You added 10% — compound change is not additive."
      },
      {
        "text": "\\(2100\\)",
        "correct": false,
        "feedback": "You only applied one increase."
      },
      {
        "text": "\\(2400\\)",
        "correct": false,
        "feedback": "You used 20% instead of compound 5% twice."
      }
    ],
    "backward": "Two‑step percentage growth.",
    "forward": "Compound growth is used in interest and population models."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(3.5 \\times 0.2\\).",
    "options": [
      {
        "text": "\\(0.7\\)",
        "correct": true,
        "feedback": "Correct. \\(35 \\times 2 = 70\\); 2 decimal places → \\(0.70 = 0.7\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.07\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Applied in any decimal multiplication."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A mass is 4.6 kg to 1 decimal place. Write the error interval.",
    "options": [
      {
        "text": "\\(4.55 \\leq m < 4.65\\)",
        "correct": true,
        "feedback": "Correct. Lower bound \\(= 4.55\\), upper bound \\(= 4.65\\) (excluded)."
      },
      {
        "text": "\\(4.5 \\leq m < 4.7\\)",
        "correct": false,
        "feedback": "You used ±0.1 rather than ±0.05."
      },
      {
        "text": "\\(4.55 \\leq m \\leq 4.65\\)",
        "correct": false,
        "feedback": "The upper bound is strictly less than 4.65, because 4.65 would round up."
      },
      {
        "text": "\\(4.6 \\leq m < 4.7\\)",
        "correct": false,
        "feedback": "The interval is too narrow."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Error intervals express measurement uncertainty."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(1.44 \\div 0.12\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 100: \\(144 \\div 12 = 12\\)."
      },
      {
        "text": "\\(1.2\\)",
        "correct": false,
        "feedback": "Place value error."
      },
      {
        "text": "\\(120\\)",
        "correct": false,
        "feedback": "You multiplied by 1000 instead of 100."
      },
      {
        "text": "\\(0.12\\)",
        "correct": false,
        "feedback": "You divided the wrong way."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "This method generalises to any decimal division."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A bottle contains \\(1.5\\) litres. After 20% is spilled, how many \\(0.3\\) litre glasses can be filled completely?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Remaining liquid \\(= 1.5 \\times 0.8 = 1.2\\) L. Glasses \\(= 1.2 \\div 0.3 = 4\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You divided \\(1.5 \\div 0.3 = 5\\) without applying the 20% spillage."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You may have applied a 40% spillage instead of 20% (\\(1.5 \\times 0.6 = 0.9\\), then \\(0.9 \\div 0.3 = 3\\))."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You increased instead of decreasing by 20%."
      }
    ],
    "backward": "Percentage decrease followed by decimal division.",
    "forward": "Real‑world problems often chain a percentage change onto a division."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(6.3 \\div 10\\).",
    "options": [
      {
        "text": "\\(0.63\\)",
        "correct": true,
        "feedback": "Correct. Dividing by 10 moves the decimal 1 place left."
      },
      {
        "text": "\\(63\\)",
        "correct": false,
        "feedback": "You multiplied by 10."
      },
      {
        "text": "\\(0.063\\)",
        "correct": false,
        "feedback": "You divided by 100."
      },
      {
        "text": "\\(630\\)",
        "correct": false,
        "feedback": "You multiplied by 100 instead of dividing by 10."
      }
    ],
    "backward": "Place value.",
    "forward": "Used in unit conversions such as cm to mm."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A jacket costs \\$120. The price is reduced by 15%, then reduced by a further 15% of the new price. Find the final price.",
    "options": [
      {
        "text": "\\(\\$86.70\\)",
        "correct": true,
        "feedback": "Correct. \\(120 \\times 0.85 = 102\\); \\(102 \\times 0.85 = 86.70\\)."
      },
      {
        "text": "\\(\\$84\\)",
        "correct": false,
        "feedback": "You subtracted 30% of 120 = 36 — compound change is not additive."
      },
      {
        "text": "\\(\\$90\\)",
        "correct": false,
        "feedback": "You subtracted 25% instead of applying 15% twice."
      },
      {
        "text": "\\(\\$102\\)",
        "correct": false,
        "feedback": "You applied only the first reduction."
      }
    ],
    "backward": "Compound percentage decrease.",
    "forward": "“Double discount” sales use this calculation."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.6 \\times 0.05\\).",
    "options": [
      {
        "text": "\\(0.03\\)",
        "correct": true,
        "feedback": "Correct. \\(6 \\times 5 = 30\\); 3 decimal places → \\(0.030 = 0.03\\)."
      },
      {
        "text": "\\(0.3\\)",
        "correct": false,
        "feedback": "One decimal place too few."
      },
      {
        "text": "\\(0.003\\)",
        "correct": false,
        "feedback": "One decimal place too many."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You dropped the decimal point."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Used whenever small decimals multiply."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number rounded to the nearest 100 is 500. What is the lower bound?",
    "options": [
      {
        "text": "\\(450\\)",
        "correct": true,
        "feedback": "Correct. The lower bound is 450, halfway to the next hundred down."
      },
      {
        "text": "\\(400\\)",
        "correct": false,
        "feedback": "400 rounds to 400."
      },
      {
        "text": "\\(499\\)",
        "correct": false,
        "feedback": "499 rounds to 500 but isn’t the lower bound."
      },
      {
        "text": "\\(550\\)",
        "correct": false,
        "feedback": "This is the upper bound."
      }
    ],
    "backward": "Rounding to nearest 100.",
    "forward": "Bounds are used for large‑scale estimates."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(9.6 \\div 0.08\\).",
    "options": [
      {
        "text": "\\(120\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 100: \\(960 \\div 8 = 120\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You multiplied by 10 instead of 100."
      },
      {
        "text": "\\(1200\\)",
        "correct": false,
        "feedback": "You multiplied by 1000."
      },
      {
        "text": "\\(1.2\\)",
        "correct": false,
        "feedback": "Place value error."
      }
    ],
    "backward": "Making the divisor whole.",
    "forward": "Same rule for any decimal division."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A plank is \\(2.4\\) m long. It is cut into 8 equal pieces. Each piece is then shortened by 10%. What is the final length of each piece?",
    "options": [
      {
        "text": "\\(0.27\\) m",
        "correct": true,
        "feedback": "Correct. Original piece \\(= 2.4 \\div 8 = 0.3\\) m. After 10% reduction: \\(0.3 \\times 0.9 = 0.27\\) m."
      },
      {
        "text": "\\(0.3\\) m",
        "correct": false,
        "feedback": "You stopped at 0.3 m without applying the 10% reduction."
      },
      {
        "text": "\\(0.24\\) m",
        "correct": false,
        "feedback": "You applied a 20% reduction instead of 10%."
      },
      {
        "text": "\\(0.33\\) m",
        "correct": false,
        "feedback": "You increased by 10% instead of decreasing."
      }
    ],
    "backward": "Decimal division followed by percentage decrease.",
    "forward": "Multi‑step measurement problems chain operations in this way."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(8.4 \\times 100\\).",
    "options": [
      {
        "text": "\\(840\\)",
        "correct": true,
        "feedback": "Correct. Move the decimal 2 places right."
      },
      {
        "text": "\\(84\\)",
        "correct": false,
        "feedback": "Moved 1 place."
      },
      {
        "text": "\\(0.84\\)",
        "correct": false,
        "feedback": "Divided by 10."
      },
      {
        "text": "\\(8400\\)",
        "correct": false,
        "feedback": "Moved 3 places."
      }
    ],
    "backward": "Place value.",
    "forward": "Used in metric conversions."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "powers10",
    "clusterName": "Multiplying and dividing by powers of 10",
    "question": "Evaluate \\(0.75 \\div 100\\).",
    "options": [
      {
        "text": "\\(0.0075\\)",
        "correct": true,
        "feedback": "Correct. Move the decimal 2 places left."
      },
      {
        "text": "\\(0.075\\)",
        "correct": false,
        "feedback": "Moved 1 place."
      },
      {
        "text": "\\(7.5\\)",
        "correct": false,
        "feedback": "Multiplied instead of divided."
      },
      {
        "text": "\\(75\\)",
        "correct": false,
        "feedback": "Multiplied by 100."
      }
    ],
    "backward": "Place value with small numbers.",
    "forward": "Used when converting small units."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(0.9 \\times 0.7\\).",
    "options": [
      {
        "text": "\\(0.63\\)",
        "correct": true,
        "feedback": "Correct. \\(9 \\times 7 = 63\\); 2 decimal places → \\(0.63\\)."
      },
      {
        "text": "\\(6.3\\)",
        "correct": false,
        "feedback": "Used 1 decimal place."
      },
      {
        "text": "\\(0.063\\)",
        "correct": false,
        "feedback": "Used 3 decimal places."
      },
      {
        "text": "\\(63\\)",
        "correct": false,
        "feedback": "Dropped the decimal."
      }
    ],
    "backward": "Counting decimal places.",
    "forward": "Rule for all decimal multiplication."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "multDec",
    "clusterName": "Multiplying decimals",
    "question": "Evaluate \\(4.5 \\times 0.2\\).",
    "options": [
      {
        "text": "\\(0.9\\)",
        "correct": true,
        "feedback": "Correct. \\(45 \\times 2 = 90\\); 2 decimal places → \\(0.90 = 0.9\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "One place too few."
      },
      {
        "text": "\\(0.09\\)",
        "correct": false,
        "feedback": "One place too many."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Dropped the decimal."
      }
    ],
    "backward": "Decimal place counting.",
    "forward": "Used in any decimal multiplication."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(2.4 \\div 0.6\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10: \\(24 \\div 6 = 4\\)."
      },
      {
        "text": "\\(0.4\\)",
        "correct": false,
        "feedback": "You divided \\(2.4 \\div 6\\)."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Multiplied by 10 twice."
      },
      {
        "text": "\\(0.04\\)",
        "correct": false,
        "feedback": "Two place errors."
      }
    ],
    "backward": "Whole‑number divisor method.",
    "forward": "General decimal division."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "divDec",
    "clusterName": "Dividing decimals",
    "question": "Evaluate \\(0.81 \\div 0.9\\).",
    "options": [
      {
        "text": "\\(0.9\\)",
        "correct": true,
        "feedback": "Correct. Multiply both by 10: \\(8.1 \\div 9 = 0.9\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You multiplied by 10 too many times."
      },
      {
        "text": "\\(0.09\\)",
        "correct": false,
        "feedback": "You divided \\(8.1 \\div 90\\) incorrectly."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Two place errors."
      }
    ],
    "backward": "Whole‑number divisor method.",
    "forward": "Same process for any decimal division."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "Increase 300 by 20% and then decrease the result by 20%.",
    "options": [
      {
        "text": "\\(288\\)",
        "correct": true,
        "feedback": "Correct. \\(300 \\times 1.2 = 360\\); \\(360 \\times 0.8 = 288\\)."
      },
      {
        "text": "\\(300\\)",
        "correct": false,
        "feedback": "You assumed the changes cancel — they don’t, because they apply to different bases."
      },
      {
        "text": "\\(280\\)",
        "correct": false,
        "feedback": "You subtracted 20 rather than applied 20%."
      },
      {
        "text": "\\(320\\)",
        "correct": false,
        "feedback": "You only applied the increase."
      }
    ],
    "backward": "Two successive percentage changes.",
    "forward": "Loss and gain in finance use this same method."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "percentages",
    "clusterName": "Understanding percentages (including compound)",
    "question": "A price of \\$50 is increased by 10% and then increased by 10% again. Find the final price.",
    "options": [
      {
        "text": "\\(\\$60.50\\)",
        "correct": true,
        "feedback": "Correct. \\(50 \\times 1.1 = 55\\); \\(55 \\times 1.1 = 60.50\\)."
      },
      {
        "text": "\\(\\$60\\)",
        "correct": false,
        "feedback": "You added 20% (additive fallacy)."
      },
      {
        "text": "\\(\\$55\\)",
        "correct": false,
        "feedback": "One increase only."
      },
      {
        "text": "\\(\\$70\\)",
        "correct": false,
        "feedback": "You added 40%."
      }
    ],
    "backward": "Compound percentage increase.",
    "forward": "Basis of compound interest."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A number rounded to the nearest 10 is 70. What is the lower bound?",
    "options": [
      {
        "text": "\\(65\\)",
        "correct": true,
        "feedback": "Correct. Lower bound is 65, halfway to the next ten down."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "60 rounds to 60."
      },
      {
        "text": "\\(69\\)",
        "correct": false,
        "feedback": "69 rounds to 70 but isn’t the lowest."
      },
      {
        "text": "\\(75\\)",
        "correct": false,
        "feedback": "That’s the upper bound."
      }
    ],
    "backward": "Rounding to nearest 10.",
    "forward": "Bounds quantify rounding error."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "bounds",
    "clusterName": "Understanding upper and lower bounds",
    "question": "A length is 8.2 cm to 1 decimal place. What is the upper bound?",
    "options": [
      {
        "text": "\\(8.25\\)",
        "correct": true,
        "feedback": "Correct. Upper bound is 8.25, halfway to the next 1 d.p. value."
      },
      {
        "text": "\\(8.3\\)",
        "correct": false,
        "feedback": "8.3 would round to 8.3."
      },
      {
        "text": "\\(8.15\\)",
        "correct": false,
        "feedback": "This is the lower bound."
      },
      {
        "text": "\\(8.21\\)",
        "correct": false,
        "feedback": "Too close — the upper bound is 8.25."
      }
    ],
    "backward": "Rounding to 1 d.p.",
    "forward": "Error intervals in measurement."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A recipe uses \\(0.15\\) kg of sugar per batch. If you make 8 batches and then increase the total by 10% for extra sweetness, how much sugar is needed?",
    "options": [
      {
        "text": "\\(1.32\\) kg",
        "correct": true,
        "feedback": "Correct. Base total: \\(0.15 \\times 8 = 1.2\\) kg. Increased by 10%: \\(1.2 \\times 1.1 = 1.32\\) kg."
      },
      {
        "text": "\\(1.2\\) kg",
        "correct": false,
        "feedback": "You stopped at 1.2 kg without applying the 10% increase."
      },
      {
        "text": "\\(1.5\\) kg",
        "correct": false,
        "feedback": "You added 0.3 instead of applying a percentage."
      },
      {
        "text": "\\(1.08\\) kg",
        "correct": false,
        "feedback": "You decreased by 10% instead of increasing."
      }
    ],
    "backward": "Decimal multiplication followed by percentage increase.",
    "forward": "Real‑world scaling often chains a percentage onto a quantity."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed applications (synthesis)",
    "question": "A rope is \\(3.6\\) m long. After 10% is wasted, the remaining rope is cut into \\(0.4\\) m pieces. How many full pieces can be made?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Usable rope \\(= 3.6 \\times 0.9 = 3.24\\) m. Full pieces \\(= 3.24 \\div 0.4 = 8.1 \\to 8\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "You divided \\(3.6 \\div 0.4 = 9\\) without applying the 10% waste."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You may have applied a 20% loss instead of 10% (\\(3.6 \\times 0.8 = 2.88\\), then \\(2.88 \\div 0.4 = 7.2 \\to 7\\))."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You may have added 10% instead of subtracting it (\\(3.6 \\times 1.1 = 3.96\\), then \\(3.96 \\div 0.4 = 9.9 \\to 10\\)). Remember, waste reduces the rope."
      }
    ],
    "backward": "Percentage decrease followed by decimal division.",
    "forward": "Real‑world problems often require discarding a fraction and rounding down."
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
    title: "Decimals, Percentages & Rounding — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Shifting decimal points by powers of 10, multiplying and dividing decimals, percentages (including compound change), and upper/lower bounds — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Core Fluency diagnostic for decimals, percentages and rounding. You’ll shift decimal points, multiply and divide decimals, work with percentages, and find bounds. Take your time and use the feedback to sharpen your understanding.</p>",
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

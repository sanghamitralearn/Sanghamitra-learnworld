

// seed/mathSeedCh11RatioProportionL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 11
// (Ratio and Proportion), Level 4 — converted from the standalone diagnostic
// JSON ch11-ratio-proportion-level-4.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh11RatioProportionL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-11-ratio-proportion";
const CHAPTER_NAME = "Ratio and Proportion";
const LEVEL = 4;

const CLUSTER_NAMES = {
  "C1": "Simplifying and comparing ratios",
  "C2": "Sharing in a given ratio",
  "C3": "Ratios from partial information",
  "C4": "Direct proportion",
  "C5": "Inverse proportion",
  "C6": "Mixed ratio and proportion"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "S",
    "question": "Write \\(36:48\\) in simplest form.",
    "options": [
      {
        "text": "\\(18:24\\)",
        "correct": false,
        "feedback": "Divided every term by 2 (\\(18:24\\)) but not by the highest common factor. The terms still share a factor of 6."
      },
      {
        "text": "\\(12:16\\)",
        "correct": false,
        "feedback": "Divided every term by 3 (\\(12:16\\)) but not by the highest common factor. The terms still share a factor of 4."
      },
      {
        "text": "\\(3:4\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of 36 and 48 is 12, so divide both terms by 12 to get \\(3:4\\)."
      },
      {
        "text": "\\(4:3\\)",
        "correct": false,
        "feedback": "Wrote the terms in reverse order (\\(4:3\\)). The order must stay the same as in the question."
      }
    ],
    "retryHint": "Find the biggest number that divides into both terms, then divide both terms by it.",
    "backward": "Highest common factor, Ch1.",
    "forward": "Simplifying a ratio is the first step in comparing or scaling it, as in scale drawings, Ch13."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "tier": "S",
    "question": "A machine packs 24 boxes in 6 minutes. How many boxes does it pack in 9 minutes?",
    "options": [
      {
        "text": "36",
        "correct": true,
        "feedback": "Correct. It packs \\(24 \\div 6 = 4\\) boxes per minute, so in 9 minutes it packs \\(9 \\times 4 = 36\\)."
      },
      {
        "text": "4",
        "correct": false,
        "feedback": "Found the number of boxes per minute (\\(24 \\div 6 = 4\\)) and stopped. The question asks about 9 minutes."
      },
      {
        "text": "27",
        "correct": false,
        "feedback": "Added the 3 extra minutes to 24 (\\(24+3 = 27\\)). The amount grows by a factor, not by the number of minutes added."
      },
      {
        "text": "16",
        "correct": false,
        "feedback": "Divided in the wrong direction (\\(24 \\times 6 \\div 9 = 16\\)). More time means more boxes, so the answer must be more than 24."
      }
    ],
    "retryHint": "Find how many boxes the machine packs in one minute first, then multiply by the number of minutes.",
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "A rate per unit of time is the same idea as speed, used in science and later chapters."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "tier": "S",
    "question": "£60 is shared in the ratio \\(1:5\\). How much is the larger share?",
    "options": [
      {
        "text": "£50.00",
        "correct": true,
        "feedback": "Correct. The ratio \\(1:5\\) has \\(1+5 = 6\\) parts, so one part is £60.00 ÷ 6 = £10.00. The larger share is 5 × £10.00 = £50.00."
      },
      {
        "text": "£10.00",
        "correct": false,
        "feedback": "Gave the smaller share (£10.00). The question asks for the larger share."
      },
      {
        "text": "£30.00",
        "correct": false,
        "feedback": "Split the £60.00 equally (£30.00 each). A ratio of \\(1:5\\) is not an equal split."
      },
      {
        "text": "£12.00",
        "correct": false,
        "feedback": "Divided £60.00 by 5, the second term (£12.00). Divide by the total number of parts, \\(1+5 = 6\\)."
      }
    ],
    "retryHint": "Add the terms of the ratio to find the number of parts, then divide the amount by that number.",
    "backward": "Dividing decimals, Ch3.",
    "forward": "Sharing in a ratio is used in the harder problems that follow."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "tier": "C",
    "question": "4 cleaners take 30 minutes to clean a hall. How many minutes would 10 cleaners take, all working at the same rate?",
    "options": [
      {
        "text": "75",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(30 \\times 10 \\div 4 = 75\\)). More cleaners finish sooner, so the time must be less than 30 minutes."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Subtracted the 6 extra cleaners from the minutes (\\(30-6 = 24\\)). Inverse proportion works by dividing a fixed total, not by subtracting."
      },
      {
        "text": "120",
        "correct": false,
        "feedback": "Found the total work (\\(4 \\times 30 = 120\\) cleaner-minutes) and stopped. Divide by the 10 cleaners."
      },
      {
        "text": "12",
        "correct": true,
        "feedback": "Correct. The job is \\(4 \\times 30 = 120\\) cleaner-minutes, so 10 cleaners take \\(120 \\div 10 = 12\\) minutes."
      }
    ],
    "retryHint": "More workers means less time. Find the total amount of work first (workers × time), then divide by the new number of workers.",
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Recognising a fixed total is the key move in inverse proportion problems later in this course."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "tier": "S",
    "question": "The ratio of cats to dogs is \\(2:5\\). There are 8 cats. How many dogs are there?",
    "options": [
      {
        "text": "3.2",
        "correct": false,
        "feedback": "Scaled the wrong way (\\(8 \\times 2 \\div 5 = 3.2\\)). Dogs have more parts than cats, so there must be more dogs."
      },
      {
        "text": "11",
        "correct": false,
        "feedback": "Added the difference in parts (\\(5-2 = 3\\)) to 8 (\\(8+3 = 11\\)). A ratio is scaled by multiplying, not by adding."
      },
      {
        "text": "28",
        "correct": false,
        "feedback": "Found the total (\\(4 \\times 7 = 28\\)) instead of the number of dogs."
      },
      {
        "text": "20",
        "correct": true,
        "feedback": "Correct. 8 is 4 times 2, so there are \\(4 \\times 5 = 20\\) dogs."
      }
    ],
    "retryHint": "Find what you multiply the known term by to get the number in the question, then multiply the other term by the same number.",
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Finding a missing quantity from a ratio is used when completing frequency tables, Ch12."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "tier": "C",
    "question": "Concentrate and water are mixed in the ratio \\(1:4\\) to make 2 litres of orange squash. Concentrate costs £3 per litre. What is the cost of the concentrate?",
    "options": [
      {
        "text": "£6.00",
        "correct": false,
        "feedback": "Priced all 2 litres at the concentrate price (2 × £3.00 = £6.00). Only 1 of the 5 parts is concentrate."
      },
      {
        "text": "£1.50",
        "correct": false,
        "feedback": "Divided by 4, the second term, instead of the total of 5 parts (\\(2 \\div 4 \\times 1 = 0.5\\) litres, so £1.50)."
      },
      {
        "text": "£1.20",
        "correct": true,
        "feedback": "Correct. The ratio \\(1:4\\) has \\(1+4 = 5\\) parts, so one part is \\(2 \\div 5 = 0.4\\) litres and the concentrate is \\(1 \\times 0.4 = 0.4\\) litres. The cost is 0.4 × £3.00 = £1.20."
      },
      {
        "text": "£4.80",
        "correct": false,
        "feedback": "Used the amount of water (\\(4 \\times 0.4 = 1.6\\) litres) at the concentrate price (£4.80). The concentrate has 1 part."
      }
    ],
    "retryHint": "Find the number of parts in total, then the amount of the first ingredient, then its cost.",
    "backward": "Dividing decimals, Ch3.",
    "forward": "Costing a mixture from a ratio is how recipes and building materials are priced."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "S",
    "question": "Write \\(2.4:0.6\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(24:6\\)",
        "correct": false,
        "feedback": "Multiplied every term by 10 (\\(24:6\\)) but did not simplify. The terms still share a common factor."
      },
      {
        "text": "\\(4:1\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term by 10 to clear the decimals: \\(24:6\\). Then divide by the highest common factor, 6, to get \\(4:1\\)."
      },
      {
        "text": "\\(24:0.6\\)",
        "correct": false,
        "feedback": "Multiplied only the first term by 10 (\\(24:0.6\\)). Every term must be multiplied by the same number."
      },
      {
        "text": "\\(1:4\\)",
        "correct": false,
        "feedback": "Wrote the terms in reverse order (\\(1:4\\)). The order must stay the same as in the question."
      }
    ],
    "retryHint": "Multiply both terms by 10 to remove the decimals, then simplify.",
    "backward": "Multiplying decimals by 10, Ch3, and simplifying ratios, Ch1.",
    "forward": "Ratios with decimal terms appear in scale drawings, Ch13."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "tier": "C",
    "question": "6 batteries cost £4.50. How much do 10 batteries cost?",
    "options": [
      {
        "text": "£0.75",
        "correct": false,
        "feedback": "Found the cost of one (£4.50 ÷ 6 = £0.75) and stopped. The question asks for 10."
      },
      {
        "text": "£7.50",
        "correct": true,
        "feedback": "Correct. One of the batteries costs £4.50 ÷ 6 = £0.75, so 10 cost 10 × £0.75 = £7.50."
      },
      {
        "text": "£8.50",
        "correct": false,
        "feedback": "Added the 4 extra batteries to the price (£4.50+4 = £8.50). Each extra one costs £0.75, not £1."
      },
      {
        "text": "£45.00",
        "correct": false,
        "feedback": "Multiplied the price of 6 by 10 (£4.50 × 10 = £45.00). That is the cost of 60 batteries."
      }
    ],
    "retryHint": "Find the cost of one first. Then multiply by the number you want.",
    "backward": "Dividing decimals, Ch3.",
    "forward": "Scaling a cost up or down is the same idea as scaling a drawing, Ch13."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "S",
    "question": "Write \\(18:42:30\\) in simplest form.",
    "options": [
      {
        "text": "\\(9:21:15\\)",
        "correct": false,
        "feedback": "Divided every term by 2 (\\(9:21:15\\)) but not by the highest common factor. The terms still share a factor of 3."
      },
      {
        "text": "\\(3:7:5\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of 18, 42 and 30 is 6, so divide every term by 6 to get \\(3:7:5\\)."
      },
      {
        "text": "\\(6:14:10\\)",
        "correct": false,
        "feedback": "Divided every term by 3 (\\(6:14:10\\)) but not by the highest common factor. The terms still share a factor of 2."
      },
      {
        "text": "\\(5:7:3\\)",
        "correct": false,
        "feedback": "Wrote the terms in reverse order (\\(5:7:3\\)). The order must stay the same as in the question."
      }
    ],
    "backward": "Highest common factor, Ch1.",
    "forward": "Simplifying a ratio is the first step in comparing or scaling it, as in scale drawings, Ch13."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "tier": "S",
    "question": "4 markers cost £3.20. How much do 7 markers cost?",
    "options": [
      {
        "text": "£0.80",
        "correct": false,
        "feedback": "Found the cost of one (£3.20 ÷ 4 = £0.80) and stopped. The question asks for 7."
      },
      {
        "text": "£5.60",
        "correct": true,
        "feedback": "Correct. One of the markers costs £3.20 ÷ 4 = £0.80, so 7 cost 7 × £0.80 = £5.60."
      },
      {
        "text": "£6.20",
        "correct": false,
        "feedback": "Added the 3 extra markers to the price (£3.20+3 = £6.20). Each extra one costs £0.80, not £1."
      },
      {
        "text": "£22.40",
        "correct": false,
        "feedback": "Multiplied the price of 4 by 7 (£3.20 × 7 = £22.40). That is the cost of 28 markers."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "Scaling a cost up or down is the same idea as scaling a drawing, Ch13."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "tier": "S",
    "question": "£48 is shared in the ratio \\(1:3\\). How much is the smaller share?",
    "options": [
      {
        "text": "£36.00",
        "correct": false,
        "feedback": "Gave the larger share (£36.00). The question asks for the smaller share."
      },
      {
        "text": "£24.00",
        "correct": false,
        "feedback": "Split the £48.00 equally (£24.00 each). A ratio of \\(1:3\\) is not an equal split."
      },
      {
        "text": "£12.00",
        "correct": true,
        "feedback": "Correct. The ratio \\(1:3\\) has \\(1+3 = 4\\) parts, so one part is £48.00 ÷ 4 = £12.00. The smaller share is 1 × £12.00 = £12.00."
      },
      {
        "text": "£16.00",
        "correct": false,
        "feedback": "Divided £48.00 by 3, the second term (£16.00). Divide by the total number of parts, \\(1+3 = 4\\)."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "Sharing in a ratio is used in the harder problems that follow."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "tier": "C",
    "question": "A stock of food lasts 24 campers for 10 days. For how many days would the same stock last 30 campers?",
    "options": [
      {
        "text": "12.5",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(10 \\times 30 \\div 24 = 12.5\\)). More campers use the food faster, so it must last fewer days."
      },
      {
        "text": "8",
        "correct": true,
        "feedback": "Correct. The stock is \\(24 \\times 10 = 240\\) camper-days of food (one camper for one day is 1 camper-day), so for 30 campers it lasts \\(240 \\div 30 = 8\\) days."
      },
      {
        "text": "4",
        "correct": false,
        "feedback": "Subtracted the 6 extra campers from the days (\\(10-6 = 4\\)). Inverse proportion works by dividing a fixed total, not by subtracting."
      },
      {
        "text": "240",
        "correct": false,
        "feedback": "Found the total amount of food (\\(24 \\times 10 = 240\\) camper-days) and stopped. Divide by the 30 campers."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Recognising a fixed total is the key move in inverse proportion problems later in this course."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "tier": "S",
    "question": "The ratio of violins to cellos is \\(3:4\\). There are 12 violins. How many cellos are there?",
    "options": [
      {
        "text": "9",
        "correct": false,
        "feedback": "Scaled the wrong way (\\(12 \\times 3 \\div 4 = 9\\)). Cellos have more parts than violins, so there must be more cellos."
      },
      {
        "text": "13",
        "correct": false,
        "feedback": "Added the difference in parts (\\(4-3 = 1\\)) to 12 (\\(12+1 = 13\\)). A ratio is scaled by multiplying, not by adding."
      },
      {
        "text": "28",
        "correct": false,
        "feedback": "Found the total (\\(4 \\times 7 = 28\\)) instead of the number of cellos."
      },
      {
        "text": "16",
        "correct": true,
        "feedback": "Correct. 12 is 4 times 3, so there are \\(4 \\times 4 = 16\\) cellos."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Finding a missing quantity from a ratio is used when completing frequency tables, Ch12."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "tier": "C",
    "question": "Cement and sand are mixed in the ratio \\(1:3\\) to make 80 kg of mortar. Cement costs £0.45 per kg. What is the cost of the cement?",
    "options": [
      {
        "text": "£9.00",
        "correct": true,
        "feedback": "Correct. The ratio \\(1:3\\) has \\(1+3 = 4\\) parts, so one part is \\(80 \\div 4 = 20\\) kg and the cement is \\(1 \\times 20 = 20\\) kg. The cost is 20 × £0.45 = £9.00."
      },
      {
        "text": "£36.00",
        "correct": false,
        "feedback": "Priced all 80 kg at the cement price (80 × £0.45 = £36.00). Only 1 of the 4 parts is cement."
      },
      {
        "text": "£12.00",
        "correct": false,
        "feedback": "Divided by 3, the second term, instead of the total of 4 parts (\\(80 \\div 3 \\times 1 = 26.6667\\) kg, so £12.00)."
      },
      {
        "text": "£27.00",
        "correct": false,
        "feedback": "Used the amount of sand (\\(3 \\times 20 = 60\\) kg) at the cement price (£27.00). The cement has 1 part."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "Costing a mixture from a ratio is how recipes and building materials are priced."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "T",
    "question": "Write 40 cm : 1.6 m as a ratio in simplest form.",
    "options": [
      {
        "text": "\\(25:1\\)",
        "correct": false,
        "feedback": "Simplified \\(40:1.6\\) without converting the units (\\(25:1\\)). A ratio can only be simplified when both quantities are in the same unit."
      },
      {
        "text": "\\(5:2\\)",
        "correct": false,
        "feedback": "Converted 1.6 m to 16 cm instead of 160 cm (1 m is 100 cm), then simplified \\(40:16\\) to get \\(5:2\\)."
      },
      {
        "text": "\\(4:1\\)",
        "correct": false,
        "feedback": "Wrote the ratio the wrong way round (\\(4:1\\)). The question puts 40 cm first."
      },
      {
        "text": "\\(1:4\\)",
        "correct": true,
        "feedback": "Correct. The units must match first. 1.6 m = 160 cm, so the ratio is \\(40:160\\). Divide both terms by their highest common factor to get \\(1:4\\)."
      }
    ],
    "backward": "Converting metres to centimetres, Ch7, and simplifying ratios, Ch1.",
    "forward": "Ratios in scale drawings need matching units before they can be simplified, Ch13."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "tier": "C",
    "question": "A machine makes 450 bolts in 25 minutes. How many bolts does it make in 1 hour 10 minutes?",
    "options": [
      {
        "text": "1980",
        "correct": false,
        "feedback": "Read 1 hour 10 minutes as 110 minutes (1 hour is 60 minutes, not 100): \\(18 \\times 110 = 1980\\)."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Found the number of bolts per minute (18) and stopped. The question asks about 70 minutes."
      },
      {
        "text": "495",
        "correct": false,
        "feedback": "Added the 45 extra minutes to 450 (\\(450+45 = 495\\)). The amount grows by a factor, not by the number of minutes added."
      },
      {
        "text": "1260",
        "correct": true,
        "feedback": "Correct. 1 hour 10 minutes = 70 minutes. The machine makes \\(450 \\div 25 = 18\\) bolts per minute, so in 70 minutes it makes \\(70 \\times 18 = 1260\\)."
      }
    ],
    "backward": "Converting hours to minutes, Ch7, and dividing whole numbers, Ch1.",
    "forward": "A rate per unit of time is the same idea as speed, used in science and later chapters."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "tier": "H",
    "question": "£240 is shared between Ali and Bea in the ratio \\(3:5\\) (Ali : Bea). Bea then gives \\(\\frac{1}{4}\\) of her share to Ali. Write the new ratio Ali : Bea in simplest form.",
    "options": [
      {
        "text": "\\(17:15\\)",
        "correct": true,
        "feedback": "Correct. One part is £240.00 ÷ 8 = £30.00, so Ali has £90.00 and Bea has £150.00. Bea gives \\(\\frac{1}{4}\\) of £150.00 = £37.50, so Ali has £90.00+£37.50 = £127.50 and Bea has £150.00−£37.50 = £112.50. The new ratio is \\(17:15\\) in simplest form."
      },
      {
        "text": "\\(3:5\\)",
        "correct": false,
        "feedback": "Gave the original ratio (\\(3:5\\)). The shares change after Bea gives money away."
      },
      {
        "text": "\\(17:20\\)",
        "correct": false,
        "feedback": "Added £37.50 to Ali's share (£127.50) but did not take it from Bea's share (£150.00), giving the ratio \\(17:20\\)."
      },
      {
        "text": "\\(5:3\\)",
        "correct": false,
        "feedback": "Took \\(\\frac{1}{4}\\) of the whole £240.00 (£60.00) instead of \\(\\frac{1}{4}\\) of Bea's share, giving the ratio \\(5:3\\)."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and simplifying ratios, Ch1.",
    "forward": "Updating a ratio after a change is the pattern in later mixture and probability problems."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "tier": "T",
    "question": "6 painters take 8 days to paint a hall. How many days would 12 painters take, all working at the same rate?",
    "options": [
      {
        "text": "16",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(8 \\times 12 \\div 6 = 16\\)). More painters finish sooner, so the time must be less than 8 days."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Subtracted the 6 extra painters from the days (\\(8-6 = 2\\)). Inverse proportion works by dividing a fixed total, not by subtracting."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. The job is \\(6 \\times 8 = 48\\) painter-days, so 12 painters take \\(48 \\div 12 = 4\\) days."
      },
      {
        "text": "48",
        "correct": false,
        "feedback": "Found the total work (\\(6 \\times 8 = 48\\) painter-days) and stopped. Divide by the 12 painters."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Recognising a fixed total is the key move in inverse proportion problems later in this course."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "tier": "C",
    "question": "The ratio of red counters to blue counters is \\(5:3\\). There are 12 more red counters than blue counters. How many blue counters are there?",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Gave the difference in the question (12) as the number of blue counters. The difference is 2 parts, not 3 parts."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Found the number of red counters (\\(5 \\times 6 = 30\\)) instead of the number of blue counters."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Found the value of one part (6) and stopped. Blue counters have 3 parts."
      },
      {
        "text": "18",
        "correct": true,
        "feedback": "Correct. Red counters have \\(5-3 = 2\\) more parts than blue counters, and that is 12, so one part is \\(12 \\div 2 = 6\\). There are \\(3 \\times 6 = 18\\) blue counters."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Using a known difference to find an unknown amount is the same step as finding a missing frequency, Ch12."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "tier": "H",
    "question": "A, B and C share £1488. The ratio of A to B is \\(3:4\\) and the ratio of B to C is \\(6:5\\). How much does C get?",
    "options": [
      {
        "text": "£620.00",
        "correct": false,
        "feedback": "Joined the ratios without matching B (\\(3:4:5\\), 12 parts), so C got 5 × £124.00 = £620.00. B is 4 in one ratio and 6 in the other."
      },
      {
        "text": "£576.00",
        "correct": false,
        "feedback": "Found B's share (12 × £48.00 = £576.00) instead of C's."
      },
      {
        "text": "£480.00",
        "correct": true,
        "feedback": "Correct. B is 4 parts in the first ratio but 6 in the second, so make B equal to 12: A:B = \\(9:12\\) and B:C = \\(12:10\\). So A:B:C = \\(9:12:10\\), which has 31 parts. One part is £1488.00 ÷ 31 = £48.00 and C gets 10 × £48.00 = £480.00."
      },
      {
        "text": "£48.00",
        "correct": false,
        "feedback": "Found the value of one part (£48.00) and stopped. C has 10 parts."
      }
    ],
    "backward": "Equivalent fractions, Ch8, and dividing decimals, Ch3.",
    "forward": "Combining ratios through a common term is used for scale factors and mixtures with three parts, Ch13."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "C",
    "question": "Write \\(1.5:2.5:4\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(15:25:40\\)",
        "correct": false,
        "feedback": "Multiplied every term by 10 (\\(15:25:40\\)) but did not simplify. The terms still share a common factor."
      },
      {
        "text": "\\(15:25:4\\)",
        "correct": false,
        "feedback": "Multiplied only the decimal terms by 10 (\\(15:25:4\\)). Every term must be multiplied by the same number."
      },
      {
        "text": "\\(8:5:3\\)",
        "correct": false,
        "feedback": "Wrote the terms in reverse order (\\(8:5:3\\)). The order must stay the same as in the question."
      },
      {
        "text": "\\(3:5:8\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term by 10 to clear the decimals: \\(15:25:40\\). Then divide by the highest common factor, 5, to get \\(3:5:8\\)."
      }
    ],
    "backward": "Multiplying decimals by 10, Ch3, and simplifying ratios, Ch1.",
    "forward": "Ratios with decimal terms appear in scale drawings, Ch13."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "tier": "H",
    "question": "Car P travels 12 km on each litre of petrol. Car Q travels 15 km on each litre. Petrol costs £1.40 per litre. How much more does it cost car P than car Q to travel 300 km?",
    "options": [
      {
        "text": "£7.00",
        "correct": true,
        "feedback": "Correct. Car P uses \\(300 \\div 12 = 25\\) litres and car Q uses \\(300 \\div 15 = 20\\) litres. The costs are 25 × £1.40 = £35.00 and 20 × £1.40 = £28.00, so car P costs £35.00−£28.00 = £7.00 more."
      },
      {
        "text": "£35.00",
        "correct": false,
        "feedback": "Found the cost for car P only (25 × £1.40 = £35.00). The question asks for the difference between the two cars."
      },
      {
        "text": "£28.00",
        "correct": false,
        "feedback": "Found the cost for car Q only (20 × £1.40 = £28.00). The question asks for the difference between the two cars."
      },
      {
        "text": "£4.20",
        "correct": false,
        "feedback": "Used the difference in distance per litre (\\(15-12 = 3\\)) as a number of litres (3 × £1.40 = £4.20). The difference in litres used over 300 km is 5."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "Comparing two rates over the same distance is the idea behind comparing speeds and prices per unit."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "tier": "T",
    "question": "£60 is shared in the ratio \\(2:3\\). How much is the smaller share?",
    "options": [
      {
        "text": "£40.00",
        "correct": false,
        "feedback": "Took \\(\\frac{2}{3}\\) of £60.00 (£40.00), reading the ratio \\(2:3\\) as a fraction. The whole is 5 parts, so the smaller share is \\(\\frac{2}{5}\\) of £60.00."
      },
      {
        "text": "£30.00",
        "correct": false,
        "feedback": "Split the £60.00 equally (£30.00 each). A ratio of \\(2:3\\) is not an equal split."
      },
      {
        "text": "£24.00",
        "correct": true,
        "feedback": "Correct. The ratio \\(2:3\\) has \\(2+3 = 5\\) parts, so one part is £60.00 ÷ 5 = £12.00 and the smaller share is 2 × £12.00 = £24.00."
      },
      {
        "text": "£12.00",
        "correct": false,
        "feedback": "Found the value of one part (£12.00) and stopped. The smaller share has 2 parts."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "A ratio compares parts with parts, while a fraction compares a part with the whole, as in relative frequency, Ch12."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "tier": "C",
    "question": "A journey takes 3 hours at 60 km/h. How long, in hours, does the same journey take at 90 km/h?",
    "options": [
      {
        "text": "4.5",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(3 \\times 90 \\div 60 = 4.5\\)). A faster speed means a shorter time, so the answer must be less than 3 hours."
      },
      {
        "text": "2",
        "correct": true,
        "feedback": "Correct. The distance is \\(3 \\times 60 = 180\\) km, so at 90 km/h the time is \\(180 \\div 90 = 2\\) hours."
      },
      {
        "text": "180",
        "correct": false,
        "feedback": "Found the distance (\\(3 \\times 60 = 180\\) km) and stopped. Divide it by the new speed."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Divided the distance by the original speed again (\\(180 \\div 60 = 3\\)). The journey is now at 90 km/h."
      }
    ],
    "backward": "Multiplying whole numbers, Ch1.",
    "forward": "Speed, distance and time use the same fixed-total idea in science."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "tier": "H",
    "question": "Two numbers are in the ratio \\(2:5\\). When 9 is added to the smaller number and 9 is subtracted from the larger number, the results are equal. What is the sum of the original two numbers?",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Found the smaller original number (\\(2 \\times 6 = 12\\)) and stopped. The question asks for the sum."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Found the larger original number (\\(5 \\times 6 = 30\\)) and stopped. The question asks for the sum."
      },
      {
        "text": "42",
        "correct": true,
        "feedback": "Correct. Call the numbers 2p and 5p. Then 2p+9 = 5p−9, so 3p = 18 and p = 6. The numbers are \\(2 \\times 6 = 12\\) and \\(5 \\times 6 = 30\\), so the sum is \\(12+30 = 42\\)."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Found the value of one part (6) and stopped. The sum of the numbers is 7 parts."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Turning a ratio into an equation with one unknown is used in later mixture problems."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "tier": "T",
    "question": "2 kg of nuts, at £6 per kg, are mixed with 3 kg of raisins, at £4 per kg. What is the cost per kg of the mixture?",
    "options": [
      {
        "text": "£4.80",
        "correct": true,
        "feedback": "Correct. The nuts cost 2 × £6.00 = £12.00 and the raisins cost 3 × £4.00 = £12.00, so the total cost is £24.00 for \\(2+3 = 5\\) kg. The cost per kg is £24.00 ÷ 5 = £4.80."
      },
      {
        "text": "£5.00",
        "correct": false,
        "feedback": "Averaged the two prices ((£6.00+£4.00)÷2 = £5.00). The mixture has 2 kg of one and 3 kg of the other, so the prices are not equally weighted."
      },
      {
        "text": "£24.00",
        "correct": false,
        "feedback": "Found the total cost (£24.00) and stopped. The question asks for the cost per kg."
      },
      {
        "text": "£10.00",
        "correct": false,
        "feedback": "Added the two prices per kg (£6.00+£4.00 = £10.00). That is the cost of 1 kg of each, not the cost per kg of the mixture."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "A combined rate depends on how much of each part there is, as in pooling frequencies, Ch12."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "tier": "C",
    "question": "Write \\(\\frac{2}{3} : \\frac{5}{6}\\) in simplest form.",
    "options": [
      {
        "text": "\\(2:5\\)",
        "correct": false,
        "feedback": "Used the numerators only (\\(2:5\\)) and ignored the denominators. The denominators change the size of each term."
      },
      {
        "text": "\\(4:5\\)",
        "correct": true,
        "feedback": "Correct. Multiply both terms by the common denominator, 6: (\\(\\frac{2}{3}\\))×\\(6 = 4\\) and (\\(\\frac{5}{6}\\))×\\(6 = 5\\). So the ratio is \\(4:5\\)."
      },
      {
        "text": "\\(3:6\\)",
        "correct": false,
        "feedback": "Used the denominators only (\\(3:6\\)) and ignored the numerators."
      },
      {
        "text": "\\(12:15\\)",
        "correct": false,
        "feedback": "Multiplied both terms by 18 (\\(12:15\\)) but did not simplify. Both terms still have a common factor."
      }
    ],
    "backward": "Common denominators, Ch8.",
    "forward": "Ratios of fractions are simplified the same way as ratios of whole numbers, as in scale factors, Ch13."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "tier": "T",
    "question": "A tap fills 12 litres in 4 minutes. How many litres does it fill in 10 minutes?",
    "options": [
      {
        "text": "30",
        "correct": true,
        "feedback": "Correct. It fills \\(12 \\div 4 = 3\\) litres per minute, so in 10 minutes it fills \\(10 \\times 3 = 30\\)."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Found the number of litres per minute (\\(12 \\div 4 = 3\\)) and stopped. The question asks about 10 minutes."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Added the 6 extra minutes to 12 (\\(12+6 = 18\\)). The amount grows by a factor, not by the number of minutes added."
      },
      {
        "text": "4.8",
        "correct": false,
        "feedback": "Divided in the wrong direction (\\(12 \\times 4 \\div 10 = 4.8\\)). More time means more litres, so the answer must be more than 12."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "A rate per unit of time is the same idea as speed, used in science and later chapters."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write 90 cm : 1.5 m as a ratio in simplest form.",
    "options": [
      {
        "text": "\\(60:1\\)",
        "correct": false,
        "feedback": "Simplified \\(90:1.5\\) without converting the units (\\(60:1\\)). A ratio can only be simplified when both quantities are in the same unit."
      },
      {
        "text": "\\(6:1\\)",
        "correct": false,
        "feedback": "Converted 1.5 m to 15 cm instead of 150 cm (1 m is 100 cm), then simplified \\(90:15\\) to get \\(6:1\\)."
      },
      {
        "text": "\\(3:5\\)",
        "correct": true,
        "feedback": "Correct. The units must match first. 1.5 m = 150 cm, so the ratio is \\(90:150\\). Divide both terms by their highest common factor to get \\(3:5\\)."
      },
      {
        "text": "\\(5:3\\)",
        "correct": false,
        "feedback": "Wrote the ratio the wrong way round (\\(5:3\\)). The question puts 90 cm first."
      }
    ],
    "backward": "Converting metres to centimetres, Ch7, and simplifying ratios, Ch1.",
    "forward": "Ratios in scale drawings need matching units before they can be simplified, Ch13."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A pump moves 360 litres in 15 minutes. How many litres does it move in 1 hour 20 minutes?",
    "options": [
      {
        "text": "2880",
        "correct": false,
        "feedback": "Read 1 hour 20 minutes as 120 minutes (1 hour is 60 minutes, not 100): \\(24 \\times 120 = 2880\\)."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Found the number of litres per minute (24) and stopped. The question asks about 80 minutes."
      },
      {
        "text": "425",
        "correct": false,
        "feedback": "Added the 65 extra minutes to 360 (\\(360+65 = 425\\)). The amount grows by a factor, not by the number of minutes added."
      },
      {
        "text": "1920",
        "correct": true,
        "feedback": "Correct. 1 hour 20 minutes = 80 minutes. The pump moves \\(360 \\div 15 = 24\\) litres per minute, so in 80 minutes it moves \\(80 \\times 24 = 1920\\)."
      }
    ],
    "backward": "Converting hours to minutes, Ch7, and dividing whole numbers, Ch1.",
    "forward": "A rate per unit of time is the same idea as speed, used in science and later chapters."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£90 is shared in the ratio \\(4:5\\). How much is the smaller share?",
    "options": [
      {
        "text": "£72.00",
        "correct": false,
        "feedback": "Took \\(\\frac{4}{5}\\) of £90.00 (£72.00), reading the ratio \\(4:5\\) as a fraction. The whole is 9 parts, so the smaller share is \\(\\frac{4}{9}\\) of £90.00."
      },
      {
        "text": "£40.00",
        "correct": true,
        "feedback": "Correct. The ratio \\(4:5\\) has \\(4+5 = 9\\) parts, so one part is £90.00 ÷ 9 = £10.00 and the smaller share is 4 × £10.00 = £40.00."
      },
      {
        "text": "£45.00",
        "correct": false,
        "feedback": "Split the £90.00 equally (£45.00 each). A ratio of \\(4:5\\) is not an equal split."
      },
      {
        "text": "£10.00",
        "correct": false,
        "feedback": "Found the value of one part (£10.00) and stopped. The smaller share has 4 parts."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "A ratio compares parts with parts, while a fraction compares a part with the whole, as in relative frequency, Ch12."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "9 gardeners take 12 days to plant a field. How many days would 18 gardeners take, all working at the same rate?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(12 \\times 18 \\div 9 = 24\\)). More gardeners finish sooner, so the time must be less than 12 days."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Subtracted the 9 extra gardeners from the days (\\(12-9 = 3\\)). Inverse proportion works by dividing a fixed total, not by subtracting."
      },
      {
        "text": "6",
        "correct": true,
        "feedback": "Correct. The job is \\(9 \\times 12 = 108\\) gardener-days, so 18 gardeners take \\(108 \\div 18 = 6\\) days."
      },
      {
        "text": "108",
        "correct": false,
        "feedback": "Found the total work (\\(9 \\times 12 = 108\\) gardener-days) and stopped. Divide by the 18 gardeners."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Recognising a fixed total is the key move in inverse proportion problems later in this course."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of green beads to yellow beads is \\(7:4\\). There are 21 more green beads than yellow beads. How many yellow beads are there?",
    "options": [
      {
        "text": "21",
        "correct": false,
        "feedback": "Gave the difference in the question (21) as the number of yellow beads. The difference is 3 parts, not 4 parts."
      },
      {
        "text": "28",
        "correct": true,
        "feedback": "Correct. Green beads have \\(7-4 = 3\\) more parts than yellow beads, and that is 21, so one part is \\(21 \\div 3 = 7\\). There are \\(4 \\times 7 = 28\\) yellow beads."
      },
      {
        "text": "49",
        "correct": false,
        "feedback": "Found the number of green beads (\\(7 \\times 7 = 49\\)) instead of the number of yellow beads."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Found the value of one part (7) and stopped. Yellow beads have 4 parts."
      }
    ],
    "backward": "Dividing whole numbers, Ch1.",
    "forward": "Using a known difference to find an unknown amount is the same step as finding a missing frequency, Ch12."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "3 kg of pecans, at £5 per kg, are mixed with 2 kg of dates, at £8 per kg. What is the cost per kg of the mixture?",
    "options": [
      {
        "text": "£6.20",
        "correct": true,
        "feedback": "Correct. The pecans cost 3 × £5.00 = £15.00 and the dates cost 2 × £8.00 = £16.00, so the total cost is £31.00 for \\(3+2 = 5\\) kg. The cost per kg is £31.00 ÷ 5 = £6.20."
      },
      {
        "text": "£6.50",
        "correct": false,
        "feedback": "Averaged the two prices ((£5.00+£8.00)÷2 = £6.50). The mixture has 3 kg of one and 2 kg of the other, so the prices are not equally weighted."
      },
      {
        "text": "£31.00",
        "correct": false,
        "feedback": "Found the total cost (£31.00) and stopped. The question asks for the cost per kg."
      },
      {
        "text": "£13.00",
        "correct": false,
        "feedback": "Added the two prices per kg (£5.00+£8.00 = £13.00). That is the cost of 1 kg of each, not the cost per kg of the mixture."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "A combined rate depends on how much of each part there is, as in pooling frequencies, Ch12."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write \\(0.8:1.2:2\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(8:12:20\\)",
        "correct": false,
        "feedback": "Multiplied every term by 10 (\\(8:12:20\\)) but did not simplify. The terms still share a common factor."
      },
      {
        "text": "\\(8:12:2\\)",
        "correct": false,
        "feedback": "Multiplied only the decimal terms by 10 (\\(8:12:2\\)). Every term must be multiplied by the same number."
      },
      {
        "text": "\\(5:3:2\\)",
        "correct": false,
        "feedback": "Wrote the terms in reverse order (\\(5:3:2\\)). The order must stay the same as in the question."
      },
      {
        "text": "\\(2:3:5\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term by 10 to clear the decimals: \\(8:12:20\\). Then divide by the highest common factor, 4, to get \\(2:3:5\\)."
      }
    ],
    "backward": "Multiplying decimals by 10, Ch3, and simplifying ratios, Ch1.",
    "forward": "Ratios with decimal terms appear in scale drawings, Ch13."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "Car P travels 10 km on each litre of petrol. Car Q travels 16 km on each litre. Petrol costs £1.50 per litre. How much more does it cost car P than car Q to travel 320 km?",
    "options": [
      {
        "text": "£18.00",
        "correct": true,
        "feedback": "Correct. Car P uses \\(320 \\div 10 = 32\\) litres and car Q uses \\(320 \\div 16 = 20\\) litres. The costs are 32 × £1.50 = £48.00 and 20 × £1.50 = £30.00, so car P costs £48.00−£30.00 = £18.00 more."
      },
      {
        "text": "£48.00",
        "correct": false,
        "feedback": "Found the cost for car P only (32 × £1.50 = £48.00). The question asks for the difference between the two cars."
      },
      {
        "text": "£30.00",
        "correct": false,
        "feedback": "Found the cost for car Q only (20 × £1.50 = £30.00). The question asks for the difference between the two cars."
      },
      {
        "text": "£9.00",
        "correct": false,
        "feedback": "Used the difference in distance per litre (\\(16-10 = 6\\)) as a number of litres (6 × £1.50 = £9.00). The difference in litres used over 320 km is 12."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "Comparing two rates over the same distance is the idea behind comparing speeds and prices per unit."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "£300 is shared between Dev and Ella in the ratio \\(2:3\\) (Dev : Ella). Ella then gives \\(\\frac{1}{6}\\) of her share to Dev. Write the new ratio Dev : Ella in simplest form.",
    "options": [
      {
        "text": "\\(1:1\\)",
        "correct": true,
        "feedback": "Correct. One part is £300.00 ÷ 5 = £60.00, so Dev has £120.00 and Ella has £180.00. Ella gives \\(\\frac{1}{6}\\) of £180.00 = £30.00, so Dev has £120.00+£30.00 = £150.00 and Ella has £180.00−£30.00 = £150.00. The new ratio is \\(1:1\\) in simplest form."
      },
      {
        "text": "\\(2:3\\)",
        "correct": false,
        "feedback": "Gave the original ratio (\\(2:3\\)). The shares change after Ella gives money away."
      },
      {
        "text": "\\(5:6\\)",
        "correct": false,
        "feedback": "Added £30.00 to Dev's share (£150.00) but did not take it from Ella's share (£180.00), giving the ratio \\(5:6\\)."
      },
      {
        "text": "\\(17:13\\)",
        "correct": false,
        "feedback": "Took \\(\\frac{1}{6}\\) of the whole £300.00 (£50.00) instead of \\(\\frac{1}{6}\\) of Ella's share, giving the ratio \\(17:13\\)."
      }
    ],
    "backward": "Fractions of an amount, Ch8, and simplifying ratios, Ch1.",
    "forward": "Updating a ratio after a change is the pattern in later mixture and probability problems."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "A journey takes 6 hours at 45 km/h. How long, in hours, does the same journey take at 54 km/h?",
    "options": [
      {
        "text": "7.2",
        "correct": false,
        "feedback": "Treated it as direct proportion (\\(6 \\times 54 \\div 45 = 7.2\\)). A faster speed means a shorter time, so the answer must be less than 6 hours."
      },
      {
        "text": "5",
        "correct": true,
        "feedback": "Correct. The distance is \\(6 \\times 45 = 270\\) km, so at 54 km/h the time is \\(270 \\div 54 = 5\\) hours."
      },
      {
        "text": "270",
        "correct": false,
        "feedback": "Found the distance (\\(6 \\times 45 = 270\\) km) and stopped. Divide it by the new speed."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Divided the distance by the original speed again (\\(270 \\div 45 = 6\\)). The journey is now at 54 km/h."
      }
    ],
    "backward": "Multiplying whole numbers, Ch1.",
    "forward": "Speed, distance and time use the same fixed-total idea in science."
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
    title: "Ratio and Proportion — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every ratio and proportion cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a timed diagnostic: 25 minutes, 20 questions. It checks whether you can work with ratio and proportion accurately and quickly. It is not graded, so use it to find out where you slip under time pressure.</p><p>Strategy: answer the quick questions straight away. If a question is taking longer than about a minute and a half, skip it and come back. Slow down for questions that look simple, because some are built to catch a common slip: scaling by adding instead of multiplying, treating inverse proportion as direct, reading a ratio as a fraction of the whole, or mixing units. Before you choose an answer, ask: should my answer be bigger or smaller than the number I started with, and does it match what the question asks for?</p>",
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

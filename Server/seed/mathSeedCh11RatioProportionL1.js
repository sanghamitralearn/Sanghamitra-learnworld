

// seed/mathSeedCh11RatioProportionL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 11
// (Ratio and Proportion), Level 1 — converted from the standalone diagnostic
// JSON ch11-ratio-proportion-level-1.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh11RatioProportionL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-11-ratio-proportion";
const CHAPTER_NAME = "Ratio and Proportion";
const LEVEL = 1;

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
    "question": "Write the ratio \\(6:9\\) in its simplest form.",
    "options": [
      {
        "text": "\\(2:3\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of 6 and 9 is 3: \\(6 \\div 3 = 2\\) and \\(9 \\div 3 = 3\\), so \\(6:9 = 2:3\\)."
      },
      {
        "text": "\\(12:18\\)",
        "correct": false,
        "feedback": "Multiplied both terms by 2 instead of dividing. \\(12:18\\) is an equivalent ratio, but it is bigger, not simpler."
      },
      {
        "text": "\\(3:4.5\\)",
        "correct": false,
        "feedback": "Divided both terms by 2 because 6 is even, but 2 does not go into 9 exactly (\\(9 \\div 2 = 4.5\\)). Divide by a number that goes into both terms exactly."
      },
      {
        "text": "\\(3:2\\)",
        "correct": false,
        "feedback": "Reversed the order. The first term 6 becomes 2 and the second term 9 becomes 3, so the order stays the same."
      }
    ],
    "retryHint": "Find a number that divides exactly into both 6 and 9, then divide both terms by it.",
    "backward": "Simplifying the fraction \\(\\frac{6}{9}\\), Ch8.",
    "forward": "Scale drawings state their scale as a ratio in simplest form, Ch13."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "3 pens cost £6. How much do 9 pens cost?",
    "options": [
      {
        "text": "£18",
        "correct": true,
        "feedback": "Correct. 9 pens is 3 times as many as 3 pens, so the cost is 3 × £6 = £18."
      },
      {
        "text": "£54",
        "correct": false,
        "feedback": "Multiplied 9 × £6. The £6 is the cost of 3 pens, not of 1 pen."
      },
      {
        "text": "£12",
        "correct": false,
        "feedback": "Added. \\(9-3 = 6\\) extra pens, so added £6 to the £6 to get £12. Cost scales by multiplying, not adding."
      },
      {
        "text": "£2",
        "correct": false,
        "feedback": "Found the cost of one pen (£6 ÷ 3 = £2) and stopped. The question asks for 9 pens."
      }
    ],
    "retryHint": "How many times as many pens is 9 compared with 3? The cost changes by the same factor.",
    "backward": "Equivalent ratios work like equivalent fractions, Ch8, and \\(y = mx\\) from Ch10.",
    "forward": "Later in this chapter this relationship is drawn as a straight line through the origin."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Share £20 in the ratio \\(1:3\\). How much is the larger share?",
    "options": [
      {
        "text": "£10",
        "correct": false,
        "feedback": "Split the £20 equally (£20 ÷ 2 = £10 each). A ratio of \\(1:3\\) is not an equal split."
      },
      {
        "text": "£15",
        "correct": true,
        "feedback": "Correct. \\(1+3 = 4\\) parts in total. £20 ÷ 4 = £5 for one part. The larger share is 3 parts: 3 × £5 = £15."
      },
      {
        "text": "£5",
        "correct": false,
        "feedback": "Gave the smaller share. £5 is the value of one part (£20 ÷ 4), but the larger share is 3 parts."
      },
      {
        "text": "£60",
        "correct": false,
        "feedback": "Multiplied the total by 3 (3 × £20). The £20 is split between the two shares, so no share can be bigger than £20."
      }
    ],
    "retryHint": "Add the parts of the ratio to find the total number of parts, divide £20 by that, then multiply by the larger term.",
    "backward": "Finding a fraction of an amount, Ch8 — the larger share is \\(\\frac{3}{4}\\) of £20.",
    "forward": "Parts out of a total is the idea behind relative frequency, Ch12."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "4 workers can paint a fence in 6 days. How many days would 8 workers take, working at the same rate?",
    "options": [
      {
        "text": "10",
        "correct": false,
        "feedback": "Added: \\(8-4 = 4\\) extra workers, so added 4 days to get 10. More workers should shorten the time."
      },
      {
        "text": "48",
        "correct": false,
        "feedback": "Multiplied 8 workers by 6 days. The constant product is \\(4 \\times 6 = 24\\), and \\(8 \\times 6\\) mixes the new number of workers with the old number of days."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Doubled the days. More workers share the job, so it takes less time, not more."
      },
      {
        "text": "3",
        "correct": true,
        "feedback": "Correct. 8 workers is 2 times as many as 4, so the job takes half as long: \\(6 \\div 2 = 3\\) days. Check: \\(4 \\times 6 = 24\\) worker-days and \\(24 \\div 8 = 3\\)."
      }
    ],
    "retryHint": "More workers share the job, so the time goes down. By what factor does the number of workers change?",
    "backward": "Halving is finding \\(\\frac{1}{2}\\) of a quantity, Ch8.",
    "forward": "The constant product \\(x \\times y = k\\) is how inverse proportion is written later in this chapter."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of boys to girls in a club is \\(2:3\\). There are 8 boys. How many girls are there?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Multiplied the 8 boys by the girls' term 3 (\\(8 \\times 3 = 24\\)). The scale factor is \\(8 \\div 2 = 4\\), and it multiplies the girls' term 3."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Used addition. Boys went from 2 to 8 (+6), so added 6 to the girls' 3 to get 9. Ratios scale by multiplying, not adding."
      },
      {
        "text": "12",
        "correct": true,
        "feedback": "Correct. The boys' term 2 is multiplied by 4 to give 8 (\\(8 \\div 2 = 4\\)), so the girls' term 3 is multiplied by 4 too: \\(3 \\times 4 = 12\\)."
      },
      {
        "text": "4",
        "correct": false,
        "feedback": "Found the scale factor (\\(8 \\div 2 = 4\\)) and stopped. The scale factor must still be applied to the girls' term 3."
      }
    ],
    "retryHint": "Find what you multiply 2 by to get 8, then multiply the 3 by the same number.",
    "backward": "Equivalent fractions, \\(\\frac{2}{3} = \\frac{8}{12}\\), Ch8.",
    "forward": "The same multiplier enlarges a shape in Ch13."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Which ratio is equivalent to \\(3:4\\)?",
    "options": [
      {
        "text": "\\(4:3\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. \\(4:3\\) compares the quantities the other way round."
      },
      {
        "text": "\\(6:8\\)",
        "correct": true,
        "feedback": "Correct. Both terms are multiplied by 2: \\(3 \\times 2 = 6\\) and \\(4 \\times 2 = 8\\)."
      },
      {
        "text": "\\(9:8\\)",
        "correct": false,
        "feedback": "Multiplied the first term by 3 (\\(3 \\times 3 = 9\\)) but the second term by 2 (\\(4 \\times 2 = 8\\)). Both terms must be multiplied by the same number."
      },
      {
        "text": "\\(6:7\\)",
        "correct": false,
        "feedback": "Added 3 to both terms (\\(3+3 = 6\\), \\(4+3 = 7\\)). Equivalent ratios come from multiplying both terms by the same number, not from adding."
      }
    ],
    "retryHint": "Multiply both terms of \\(3:4\\) by the same number. Which option does that?",
    "backward": "Equivalent fractions, \\(\\frac{3}{4} = \\frac{6}{8}\\), Ch8.",
    "forward": "Later in this chapter, finding a missing quantity depends on spotting the common multiplier."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\), and \\(y = 5x\\). Find \\(y\\) when \\(x = 7\\).",
    "options": [
      {
        "text": "1.4",
        "correct": false,
        "feedback": "Divided: \\(7 \\div 5 = 1.4\\). \\(y = 5x\\) means multiply \\(x\\) by 5, not divide."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Subtracted: \\(7-5 = 2\\). In \\(y = 5x\\) the 5 multiplies \\(x\\)."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Added: \\(5+7 = 12\\). In \\(y = 5x\\) the 5 multiplies \\(x\\)."
      },
      {
        "text": "35",
        "correct": true,
        "feedback": "Correct. \\(y = 5 \\times 7 = 35\\)."
      }
    ],
    "retryHint": "Replace \\(x\\) with 7 in \\(y = 5x\\). The term \\(5x\\) means 5 multiplied by \\(x\\).",
    "backward": "This is \\(y = mx\\) from Ch10 with no constant term, so the line passes through the origin.",
    "forward": "The 5 is the constant of proportionality \\(k\\), which you will find from data in the diagnostic."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "\\(x\\) and \\(y\\) are inversely proportional. When \\(x\\) doubles, what happens to \\(y\\)?",
    "options": [
      {
        "text": "\\(y\\) stays the same",
        "correct": false,
        "feedback": "If \\(y\\) stayed the same while \\(x\\) doubled, the product \\(x \\times y\\) would double. In inverse proportion the product stays constant."
      },
      {
        "text": "\\(y\\) decreases by the same amount that \\(x\\) increased",
        "correct": false,
        "feedback": "Used subtraction. Inverse proportion works by multiplying and dividing, not by taking away a fixed amount."
      },
      {
        "text": "\\(y\\) halves",
        "correct": true,
        "feedback": "Correct. In inverse proportion \\(x \\times y\\) stays constant, so if \\(x\\) is multiplied by 2, \\(y\\) is divided by 2."
      },
      {
        "text": "\\(y\\) doubles",
        "correct": false,
        "feedback": "That describes direct proportion, where both quantities are multiplied by the same factor."
      }
    ],
    "retryHint": "In inverse proportion the product \\(x \\times y\\) stays constant. If \\(x\\) gets bigger, what must \\(y\\) do to keep the product the same?",
    "backward": "Halving, Ch8.",
    "forward": "This is the idea behind every 'more workers, less time' problem later in this chapter."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(32:40\\) in its simplest form.",
    "options": [
      {
        "text": "\\(4:5\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of 32 and 40 is 8: \\(32 \\div 8 = 4\\) and \\(40 \\div 8 = 5\\)."
      },
      {
        "text": "\\(5:4\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(8:10\\)",
        "correct": false,
        "feedback": "Divided both terms by 4 only. 8 and 10 still have a common factor of 2, so \\(8:10\\) is not in simplest form."
      },
      {
        "text": "\\(16:20\\)",
        "correct": false,
        "feedback": "Divided both terms by 2 only. 16 and 20 still have a common factor of 4, so \\(16:20\\) is not in simplest form."
      }
    ],
    "backward": "Simplifying the fraction \\(\\frac{32}{40}\\), Ch8.",
    "forward": "Simplifying first keeps the numbers small when sharing and scaling later in this chapter."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\). When \\(x = 3\\), \\(y = 12\\). What is the constant of proportionality \\(k\\) in \\(y = kx\\)?",
    "options": [
      {
        "text": "36",
        "correct": false,
        "feedback": "Multiplied \\(x\\) and \\(y\\) (\\(3 \\times 12 = 36\\)). In \\(y = kx\\), the constant \\(k = y \\div x\\), so divide \\(y\\) by \\(x\\)."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. \\(y = kx\\), so \\(k = y \\div x = 12 \\div 3 = 4\\)."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Subtracted: \\(12-3 = 9\\). In \\(y = kx\\) the \\(k\\) multiplies \\(x\\), so find \\(k\\) by dividing \\(y\\) by \\(x\\)."
      },
      {
        "text": "0.25",
        "correct": false,
        "feedback": "Divided the wrong way round: \\(3 \\div 12 = 0.25\\). \\(k = y \\div x = 12 \\div 3\\)."
      }
    ],
    "backward": "Solving the one-step equation \\(12 = 3k\\), Ch4, and the gradient of a line through the origin, Ch10.",
    "forward": "With \\(k\\) known, \\(y = kx\\) gives any \\(y\\) from any \\(x\\), used on tables and graphs later in this chapter."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£40 is shared in the ratio \\(3:2\\). How much more does the larger share get than the smaller share?",
    "options": [
      {
        "text": "£24",
        "correct": false,
        "feedback": "Found the larger share (3 × £8 = £24) and stopped. The question asks how much more it is than the smaller share."
      },
      {
        "text": "£1",
        "correct": false,
        "feedback": "Subtracted the ratio terms (\\(3-2 = 1\\)) and gave £1. That is the difference in parts, not in pounds: each part is £8."
      },
      {
        "text": "£8",
        "correct": true,
        "feedback": "Correct. \\(3+2 = 5\\) parts. £40 ÷ 5 = £8 for one part. The shares differ by \\(3-2 = 1\\) part, so by £8. Check: \\(3 \\times 8 = 24\\), \\(2 \\times 8 = 16\\) and \\(24-16 = 8\\)."
      },
      {
        "text": "£16",
        "correct": false,
        "feedback": "Found the smaller share (2 × £8 = £16) and stopped. The question asks for the difference between the shares."
      }
    ],
    "backward": "Dividing an amount into equal parts, Ch8 — one part is \\(\\frac{1}{5}\\) of £40.",
    "forward": "Comparing shares by the number of parts between them is used later in this chapter."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "3 pumps empty a tank in 16 hours. How long will 12 pumps take, all working at the same rate?",
    "options": [
      {
        "text": "64 hours",
        "correct": false,
        "feedback": "Treated it as direct proportion: \\(16 \\times 4 = 64\\). More pumps empty the tank faster, so the time must go down."
      },
      {
        "text": "48 hours",
        "correct": false,
        "feedback": "Found \\(3 \\times 16 = 48\\) and stopped. The 48 must still be divided by the 12 pumps."
      },
      {
        "text": "4 hours",
        "correct": true,
        "feedback": "Correct. 12 pumps is 4 times as many as 3, so the time is \\(16 \\div 4 = 4\\) hours. Check: \\(3 \\times 16 = 48\\) and \\(12 \\times 4 = 48\\)."
      },
      {
        "text": "192 hours",
        "correct": false,
        "feedback": "Multiplied the 12 pumps by the 16 hours (\\(12 \\times 16 = 192\\)), mixing the new number of pumps with the old time. Inverse proportion divides the total pump-hours (48) by the number of pumps."
      }
    ],
    "backward": "Dividing a quantity by a whole number, Ch8.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule for every inverse-proportion problem later in this chapter."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of red to blue counters is \\(3:5\\). There are 12 red counters. How many blue counters are there?",
    "options": [
      {
        "text": "60",
        "correct": false,
        "feedback": "Multiplied the 12 red counters by the blue term 5 (\\(12 \\times 5 = 60\\)). The scale factor is \\(12 \\div 3 = 4\\), and it multiplies the blue term 5."
      },
      {
        "text": "20",
        "correct": true,
        "feedback": "Correct. The red term 3 is multiplied by 4 to give 12 (\\(12 \\div 3 = 4\\)), so the blue term 5 is multiplied by 4: \\(5 \\times 4 = 20\\)."
      },
      {
        "text": "14",
        "correct": false,
        "feedback": "Used addition. Red went from 3 to 12 (+9), so added 9 to the blue term 5 to get 14. Ratios scale by multiplying, not adding."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Read off the blue term from the ratio (5) without scaling it up to match 12 red counters."
      }
    ],
    "backward": "Equivalent fractions, \\(\\frac{3}{5} = \\frac{12}{20}\\), Ch8.",
    "forward": "Scaling both parts by one factor is what enlargement does to lengths, Ch13."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "The ratio of sand to cement in a mix is 500 g : 2 kg. A builder uses 1.5 kg of sand. How much cement does she need, in kg?",
    "options": [
      {
        "text": "6 kg",
        "correct": true,
        "feedback": "Correct. Put both in kg: 500 g = 0.5 kg, so the ratio is \\(0.5 : 2\\). The sand used, 1.5 kg, is 3 times 0.5 kg (\\(1.5 \\div 0.5 = 3\\)), so the cement is 3 times 2 kg: \\(3 \\times 2 = 6\\) kg."
      },
      {
        "text": "0.75 kg",
        "correct": false,
        "feedback": "Divided the sand used by the cement term (\\(1.5 \\div 2 = 0.75\\)) instead of scaling the ratio. Both amounts must be in kg and then multiplied by the same scale factor."
      },
      {
        "text": "6000 kg",
        "correct": false,
        "feedback": "Found the scale factor correctly (\\(1500 \\div 500 = 3\\)) but multiplied it by 2000, the cement in grams, and kept the number. The question asks for kg, so use the cement as 2 kg: \\(3 \\times 2 = 6\\)."
      },
      {
        "text": "2 kg",
        "correct": false,
        "feedback": "Read off the cement term from the ratio (2 kg) without scaling it up to match 1.5 kg of sand."
      }
    ],
    "backward": "Converting grams to kilograms by ÷1000, Ch3, and equivalent fractions, Ch8.",
    "forward": "Converting units before scaling is needed for every map and model scale in Ch13."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write 50 cm : 2 m in its simplest form.",
    "options": [
      {
        "text": "\\(1:4\\)",
        "correct": true,
        "feedback": "Correct. Put both in the same unit: 2 m = 200 cm. Then \\(50:200 = 1:4\\) (\\(\\div 50\\))."
      },
      {
        "text": "\\(1:40\\)",
        "correct": false,
        "feedback": "Converted 2 m using 1 m = 1000 cm (2 m = 2000 cm), giving \\(50:2000 = 1:40\\). There are 100 cm in 1 m."
      },
      {
        "text": "\\(25:1\\)",
        "correct": false,
        "feedback": "Did not convert the units. Treated 50 cm : 2 m as \\(50:2 = 25:1\\). Both terms must be in the same unit before simplifying."
      },
      {
        "text": "\\(4:1\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      }
    ],
    "backward": "Converting metres to centimetres by ×100, Ch3.",
    "forward": "Maps and scale drawings mix units, so convert first, Ch13."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A car uses 4 litres of petrol to travel 48 km. How far can it travel on 20 litres of petrol?",
    "options": [
      {
        "text": "12 km",
        "correct": false,
        "feedback": "Found the distance per litre (\\(48 \\div 4 = 12\\)) and stopped. This must be multiplied by the 20 litres."
      },
      {
        "text": "960 km",
        "correct": false,
        "feedback": "Multiplied \\(20 \\times 48\\). The 48 km goes with 4 litres, not with 1 litre."
      },
      {
        "text": "240 km",
        "correct": true,
        "feedback": "Correct. 20 litres is 5 times as much as 4 litres, so the distance is \\(5 \\times 48 = 240\\) km."
      },
      {
        "text": "192 km",
        "correct": false,
        "feedback": "Multiplied the 48 km by 4, the original litres, instead of by the scale factor 5 (\\(20 \\div 4\\)). \\(48 \\times 4 = 192\\)."
      }
    ],
    "backward": "Equivalent ratios as equivalent fractions, Ch8.",
    "forward": "The distance for one litre (12 km) is a unit rate, used throughout the rest of this chapter."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "A prize of £54 is shared in the ratio \\(4:5\\). How much is one part worth?",
    "options": [
      {
        "text": "£6",
        "correct": true,
        "feedback": "Correct. \\(4+5 = 9\\) parts in total. £54 ÷ 9 = £6 for one part."
      },
      {
        "text": "£27",
        "correct": false,
        "feedback": "Split the £54 equally between two people (£27 each). That is a whole share, not one part: the £54 is divided into \\(4+5 = 9\\) equal parts."
      },
      {
        "text": "£13.50",
        "correct": false,
        "feedback": "Divided the £54 by 4 only (\\(54 \\div 4 = 13.5\\)). The total is split into \\(4+5 = 9\\) parts, so divide by 9."
      },
      {
        "text": "£10.80",
        "correct": false,
        "feedback": "Divided the £54 by 5 only (\\(54 \\div 5 = 10.8\\)). The total is split into \\(4+5 = 9\\) parts, so divide by 9."
      }
    ],
    "backward": "Dividing a total into equal parts, Ch8 — one part is \\(\\frac{1}{9}\\) of £54.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "\\(y\\) is inversely proportional to \\(x\\). When \\(x = 4\\), \\(y = 9\\). Find the value of \\(k\\) in \\(xy = k\\).",
    "options": [
      {
        "text": "13",
        "correct": false,
        "feedback": "Added: \\(4+9 = 13\\). In inverse proportion the quantities are multiplied, not added."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Subtracted: \\(9-4 = 5\\). In inverse proportion the quantities are multiplied, not subtracted."
      },
      {
        "text": "2.25",
        "correct": false,
        "feedback": "Divided: \\(9 \\div 4 = 2.25\\). That is the method for direct proportion (\\(k = y \\div x\\)). For inverse proportion, multiply \\(x\\) and \\(y\\)."
      },
      {
        "text": "36",
        "correct": true,
        "feedback": "Correct. \\(xy = k\\), so \\(k = 4 \\times 9 = 36\\)."
      }
    ],
    "backward": "Multiplication facts, and the contrast with the gradient \\(y \\div x\\) from Ch10, which is how direct proportion finds \\(k\\).",
    "forward": "Once \\(k\\) is known, \\(y = k \\div x\\) gives \\(y\\) for any \\(x\\), used later in this chapter."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of adults to children at a show is \\(4:7\\). There are 56 children. How many adults are there?",
    "options": [
      {
        "text": "14",
        "correct": false,
        "feedback": "Divided 56 by the adults' term 4 (\\(56 \\div 4 = 14\\)). The scale factor comes from the children's term: \\(56 \\div 7 = 8\\)."
      },
      {
        "text": "32",
        "correct": true,
        "feedback": "Correct. The children's term 7 is multiplied by 8 to give 56 (\\(56 \\div 7 = 8\\)), so the adults' term 4 is multiplied by 8: \\(4 \\times 8 = 32\\)."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Found the scale factor (\\(56 \\div 7 = 8\\)) and stopped. The scale factor must still be applied to the adults' term 4."
      },
      {
        "text": "98",
        "correct": false,
        "feedback": "Turned the ratio upside down (multiplied 56 by 7, then divided by 4, to get 98). There are fewer adults than children, so the answer must be less than 56."
      }
    ],
    "backward": "Equivalent fractions, \\(\\frac{4}{7} = \\frac{32}{56}\\), Ch8.",
    "forward": "The same scaling finds a missing length on a scale drawing, Ch13."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "Two situations: (i) the cost of 4 tickets and the cost of 8 tickets at the same price per ticket; (ii) the time taken by 4 painters and by 8 painters to paint the same wall at the same speed. Which pair of descriptions is correct?",
    "options": [
      {
        "text": "(i) direct proportion, (ii) direct proportion",
        "correct": false,
        "feedback": "Treated 'more' as always meaning 'more'. With more painters the wall is finished sooner, so the time goes down: that is inverse proportion."
      },
      {
        "text": "(i) inverse proportion, (ii) direct proportion",
        "correct": false,
        "feedback": "Swapped the two. More tickets cost more (direct), and more painters take less time (inverse)."
      },
      {
        "text": "(i) direct proportion, (ii) inverse proportion",
        "correct": true,
        "feedback": "Correct. Doubling the tickets doubles the cost (direct). Doubling the painters halves the time (inverse)."
      },
      {
        "text": "(i) inverse proportion, (ii) inverse proportion",
        "correct": false,
        "feedback": "Treated both as 'one quantity goes up, the other goes down'. Buying more tickets makes the cost go up, so that is direct proportion."
      }
    ],
    "backward": "The times-as-many idea from equivalent fractions, Ch8.",
    "forward": "Deciding direct or inverse comes first in every proportion problem."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(4:10\\) in the form \\(1:n\\).",
    "options": [
      {
        "text": "\\(0.4:1\\)",
        "correct": false,
        "feedback": "Divided both terms by 10 to make the second term 1 (\\(4 \\div 10 = 0.4\\)). The form \\(1:n\\) needs the first term to be 1, so divide by 4."
      },
      {
        "text": "\\(1:2.5\\)",
        "correct": true,
        "feedback": "Correct. Divide both terms by 4 so the first term becomes 1: \\(4 \\div 4 = 1\\) and \\(10 \\div 4 = 2.5\\)."
      },
      {
        "text": "\\(1:2\\)",
        "correct": false,
        "feedback": "Divided 10 by 4 but kept only the whole-number part, 2, and ignored the remainder. \\(10 \\div 4 = 2.5\\)."
      },
      {
        "text": "\\(2:5\\)",
        "correct": false,
        "feedback": "Divided both terms by 2. That is the simplest whole-number form, but the first term is 2, not 1."
      }
    ],
    "backward": "Dividing to give a decimal, Ch3.",
    "forward": "The \\(1:n\\) form is how map and model scales are written, Ch13."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The tables show pairs of values. In which table is \\(y\\) directly proportional to \\(x\\)?",
    "options": [
      {
        "text": "\\(x\\): 2, 4, 6 and \\(y\\): 3, 6, 12",
        "correct": false,
        "feedback": "Between \\(x = 2\\) and \\(x = 4\\), \\(y\\) doubles (3 to 6), so it looks proportional. But \\(y \\div x\\) is 1.5, 1.5, 2: at \\(x = 6\\) the ratio changes. Checking one pair is not enough."
      },
      {
        "text": "\\(x\\): 2, 4, 6 and \\(y\\): 12, 6, 4",
        "correct": false,
        "feedback": "\\(y\\) goes down as \\(x\\) goes up. Here \\(x \\times y\\) is constant (24), which is inverse proportion, not direct."
      },
      {
        "text": "\\(x\\): 2, 4, 6 and \\(y\\): 5, 9, 13",
        "correct": false,
        "feedback": "\\(y\\) goes up by the same amount each time (+4), but doubling \\(x\\) from 2 to 4 does not double \\(y\\) (5 to 9). The line would not pass through the origin."
      },
      {
        "text": "\\(x\\): 2, 4, 6 and \\(y\\): 3, 6, 9",
        "correct": true,
        "feedback": "Correct. \\(3 \\div 2\\), \\(6 \\div 4\\) and \\(9 \\div 6\\) all equal 1.5, so \\(y = 1.5x\\) and doubling \\(x\\) doubles \\(y\\)."
      }
    ],
    "backward": "Equivalent fractions, \\(\\frac{3}{2} = \\frac{6}{4} = \\frac{9}{6}\\), Ch8.",
    "forward": "The points of a proportional table lie on a straight line through the origin, drawn in the graph question that follows later in this chapter."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "The ratio of boys to girls in a class is \\(2:3\\). What fraction of the class are boys?",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Turned the ratio upside down. Boys are the smaller group, so their fraction of the class must be less than 1."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(2+3 = 5\\) parts in the whole class, and boys are 2 of those parts, so boys are \\(\\frac{2}{5}\\) of the class."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Gave the fraction of girls (3 of the 5 parts). The question asks for boys, which is 2 of the 5 parts."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Used the ratio terms as the fraction. \\(2:3\\) compares boys with girls (part to part), not boys with the whole class."
      }
    ],
    "backward": "Writing a part as a fraction of the whole, Ch8.",
    "forward": "The fraction \\(\\frac{2}{5}\\) is the probability of picking a boy, Ch12."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "The tables show pairs of values. In which table is \\(y\\) inversely proportional to \\(x\\)?",
    "options": [
      {
        "text": "\\(x\\): 1, 2, 4 and \\(y\\): 2, 4, 8",
        "correct": false,
        "feedback": "\\(y\\) goes up as \\(x\\) goes up. Here \\(y \\div x\\) is 2 each time, which is direct proportion, not inverse."
      },
      {
        "text": "\\(x\\): 1, 2, 4 and \\(y\\): 8, 8, 8",
        "correct": false,
        "feedback": "\\(y\\) does not change at all. \\(x \\times y\\) is 8, 16, 32, which is not constant."
      },
      {
        "text": "\\(x\\): 1, 2, 4 and \\(y\\): 8, 4, 2",
        "correct": true,
        "feedback": "Correct. \\(1 \\times 8\\), \\(2 \\times 4\\) and \\(4 \\times 2\\) all equal 8, so \\(x \\times y\\) is constant. When \\(x\\) doubles, \\(y\\) halves."
      },
      {
        "text": "\\(x\\): 1, 2, 4 and \\(y\\): 9, 8, 6",
        "correct": false,
        "feedback": "\\(y\\) goes down as \\(x\\) goes up, but \\(x \\times y\\) is 9, 16, 24, which is not constant. Falling alone does not make it inverse proportion."
      }
    ],
    "backward": "Multiplication facts and halving, Ch8.",
    "forward": "Inverse proportion becomes the formula \\(y = \\frac{k}{x}\\) later in this chapter."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of cats to dogs in a shelter is \\(3:4\\). There are 15 cats. How many animals are there altogether?",
    "options": [
      {
        "text": "7",
        "correct": false,
        "feedback": "Added the ratio terms (\\(3+4 = 7\\)). That is the number of parts in the ratio, not the number of animals."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Found the number of dogs (\\(4 \\times 5 = 20\\)) and stopped. The question asks for cats and dogs together."
      },
      {
        "text": "105",
        "correct": false,
        "feedback": "Multiplied 15 by 7, where 7 is the total number of parts (\\(3+4\\)). The scale factor is \\(15 \\div 3 = 5\\), applied to each term before adding."
      },
      {
        "text": "35",
        "correct": true,
        "feedback": "Correct. The cats' term 3 is multiplied by 5 to give 15 (\\(15 \\div 3 = 5\\)), so the dogs' term 4 is multiplied by 5: \\(4 \\times 5 = 20\\) dogs. Altogether \\(15+20 = 35\\)."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction of the whole, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "The exchange rate is £5 : €6. Using the form £1 : €n, how many euros does £30 buy?",
    "options": [
      {
        "text": "€180",
        "correct": false,
        "feedback": "Multiplied £30 by 6, the euro term of the ratio. €6 is the value of £5, not of £1; the multiplier for £1 is \\(6 \\div 5 = 1.2\\)."
      },
      {
        "text": "€31",
        "correct": false,
        "feedback": "Used addition. £30 is £25 more than £5, so added 25 to €6 to get €31. Currency converts by multiplying, not adding."
      },
      {
        "text": "€25",
        "correct": false,
        "feedback": "Turned the rate upside down (multiplied 30 by 5, then divided by 6, to get 25). That converts euros into pounds. Pounds to euros uses the multiplier \\(6 \\div 5 = 1.2\\)."
      },
      {
        "text": "€36",
        "correct": true,
        "feedback": "Correct. Divide both terms by 5: £1 : €1.2. Then £30 buys 30 × 1.2 = €36."
      }
    ],
    "backward": "Multiplying decimals, Ch3.",
    "forward": "Unit rates convert between any two quantities, including map and model scales in Ch13."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Mia mixes juice and water in the ratio \\(2:3\\). Ravi mixes 4 cups of juice with 6 cups of water. Which statement is true?",
    "options": [
      {
        "text": "They cannot be compared because the amounts are different",
        "correct": false,
        "feedback": "Thought ratios can only be compared when the amounts are equal. Simplifying \\(4:6\\) to \\(2:3\\) makes the comparison possible."
      },
      {
        "text": "The two mixtures have the same strength",
        "correct": true,
        "feedback": "Correct. Mia's ratio \\(2:3\\) is already in simplest form. Ravi's \\(4:6\\) simplifies to \\(2:3\\) (\\(\\div 2\\)). The ratios are equivalent, so the mixtures have the same strength."
      },
      {
        "text": "Ravi's mixture is stronger",
        "correct": false,
        "feedback": "Compared the amounts of juice (4 cups against 2 cups) instead of the ratios. Ravi uses more of both ingredients, so the mixture is not necessarily stronger."
      },
      {
        "text": "Mia's mixture is stronger",
        "correct": false,
        "feedback": "Compared the gaps between the terms (\\(3-2 = 1\\) for Mia, \\(6-4 = 2\\) for Ravi) and decided the smaller gap means stronger. Ratios are compared by simplifying them, not by subtracting."
      }
    ],
    "backward": "Simplifying \\(\\frac{4}{6}\\) to \\(\\frac{2}{3}\\), Ch8.",
    "forward": "Comparing ratios by simplifying first is needed for scale factors, Ch13."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The graph shows the cost of loose rice against its weight. How much does 1 kg of rice cost?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 380\" width=\"420\" height=\"380\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"380\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"140\" y1=\"32\" x2=\"140\" y2=\"320\"/><line x1=\"220\" y1=\"32\" x2=\"220\" y2=\"320\"/><line x1=\"300\" y1=\"32\" x2=\"300\" y2=\"320\"/><line x1=\"380\" y1=\"32\" x2=\"380\" y2=\"320\"/><line x1=\"60\" y1=\"272\" x2=\"380\" y2=\"272\"/><line x1=\"60\" y1=\"224\" x2=\"380\" y2=\"224\"/><line x1=\"60\" y1=\"176\" x2=\"380\" y2=\"176\"/><line x1=\"60\" y1=\"128\" x2=\"380\" y2=\"128\"/><line x1=\"60\" y1=\"80\" x2=\"380\" y2=\"80\"/><line x1=\"60\" y1=\"32\" x2=\"380\" y2=\"32\"/></g><line x1=\"60\" y1=\"320\" x2=\"380\" y2=\"320\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"60\" y2=\"32\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"380\" y2=\"32\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"220\" cy=\"176\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"60\" y=\"336\">0</text><text x=\"140\" y=\"336\">2</text><text x=\"220\" y=\"336\">4</text><text x=\"300\" y=\"336\">6</text><text x=\"380\" y=\"336\">8</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"54\" y=\"323.5\">0</text><text x=\"54\" y=\"275.5\">4</text><text x=\"54\" y=\"227.5\">8</text><text x=\"54\" y=\"179.5\">12</text><text x=\"54\" y=\"131.5\">16</text><text x=\"54\" y=\"83.5\">20</text><text x=\"54\" y=\"35.5\">24</text></g><text x=\"220\" y=\"364\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\">Weight (kg)</text><text x=\"16\" y=\"176\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 16 176)\">Cost (£)</text></svg></div>",
    "options": [
      {
        "text": "£12",
        "correct": false,
        "feedback": "Read the cost at the marked point (£12), but that is the cost of 4 kg, not of 1 kg."
      },
      {
        "text": "£48",
        "correct": false,
        "feedback": "Multiplied the cost by the weight (\\(12 \\times 4 = 48\\)). The cost per kg is found by dividing the cost by the weight."
      },
      {
        "text": "£3",
        "correct": true,
        "feedback": "Correct. The marked point is (4 kg, £12), so 1 kg costs £12 ÷ 4 = £3."
      },
      {
        "text": "£4",
        "correct": false,
        "feedback": "Read the weight at the marked point (4 kg) as if it were the cost."
      }
    ],
    "backward": "The gradient of a line through the origin is rise ÷ run, Ch10.",
    "forward": "The cost per kg is the constant of proportionality \\(k\\) in \\(y = kx\\)."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£45 is shared between Ali and Bea in the ratio \\(2:7\\) (Ali : Bea). How much does each person get?",
    "options": [
      {
        "text": "Ali £35, Bea £10",
        "correct": false,
        "feedback": "Matched the terms to the wrong people. The first term 2 belongs to Ali, so Ali gets 2 parts, not 7."
      },
      {
        "text": "Ali £5, Bea £40",
        "correct": false,
        "feedback": "Found the value of one part (£5), used it as Ali's share, and gave the rest (£40) to Bea. Ali's share is 2 parts, not 1 part."
      },
      {
        "text": "Ali £22.50, Bea £22.50",
        "correct": false,
        "feedback": "Split the £45 equally between the two people. A ratio of \\(2:7\\) is not an equal split."
      },
      {
        "text": "Ali £10, Bea £35",
        "correct": true,
        "feedback": "Correct. \\(2+7 = 9\\) parts. £45 ÷ 9 = £5 for one part. Ali gets 2 × £5 = £10 and Bea gets 7 × £5 = £35."
      }
    ],
    "backward": "Dividing an amount into equal parts, Ch8.",
    "forward": "Checking that the shares add back to the total is a habit for every ratio problem."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Which situation is an example of inverse proportion?",
    "options": [
      {
        "text": "The more workers there are on a job, the less time it takes to finish.",
        "correct": true,
        "feedback": "Correct. Doubling the workers halves the time, so workers × time stays constant."
      },
      {
        "text": "A taxi charges a £3 fixed fee plus £2 per mile, so the more miles, the more it costs.",
        "correct": false,
        "feedback": "Cost goes up with distance, so it is not inverse. It is not direct proportion either: the fixed fee means doubling the miles does not double the cost."
      },
      {
        "text": "A candle gets 2 cm shorter for every hour that it burns.",
        "correct": false,
        "feedback": "The height goes down as time goes up, but by a fixed amount each hour. Height × time is not constant, so this is not inverse proportion."
      },
      {
        "text": "The more pens you buy, the more they cost in total.",
        "correct": false,
        "feedback": "Cost and number of pens go up together at a fixed price per pen. That is direct proportion, not inverse."
      }
    ],
    "backward": "Dividing by a scale factor, Ch8.",
    "forward": "Spotting inverse proportion from the wording comes before using \\(xy = k\\)."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of milk to water in a mixture is \\(3:2\\). 12 litres of water are used. How many litres of milk are needed?",
    "options": [
      {
        "text": "8",
        "correct": false,
        "feedback": "Turned the ratio upside down (multiplied 12 by 2, then divided by 3, to get 8). There is more milk than water, so the answer must be more than 12."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Found the scale factor (\\(12 \\div 2 = 6\\)) and stopped. The scale factor must still be applied to the milk term 3."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Multiplied the 12 litres of water by the milk term 3 (\\(12 \\times 3 = 36\\)). The scale factor is \\(12 \\div 2 = 6\\), and it multiplies the milk term 3."
      },
      {
        "text": "18",
        "correct": true,
        "feedback": "Correct. The water term 2 is multiplied by 6 to give 12 (\\(12 \\div 2 = 6\\)), so the milk term 3 is multiplied by 6: \\(3 \\times 6 = 18\\) litres."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "The same method scales a recipe or mixture to any size."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "4 notebooks cost £6. Ali and Bea buy 12 notebooks and share the cost in the ratio \\(1:5\\) (Ali : Bea). How much does Ali pay?",
    "options": [
      {
        "text": "£3",
        "correct": true,
        "feedback": "Correct. 12 notebooks is 3 times as many as 4, so they cost 3 × £6 = £18. The ratio \\(1:5\\) has \\(1+5 = 6\\) parts, so one part is £18 ÷ 6 = £3 and Ali pays 1 × £3 = £3."
      },
      {
        "text": "£15",
        "correct": false,
        "feedback": "Gave Bea's share (5 parts: 5 × £3 = £15). The question asks for Ali, who has 1 part."
      },
      {
        "text": "£9",
        "correct": false,
        "feedback": "Split the £18 equally (£18 ÷ 2 = £9 each). A ratio of \\(1:5\\) is not an equal split."
      },
      {
        "text": "£18",
        "correct": false,
        "feedback": "Found the cost of 12 notebooks (3 × £6 = £18) and stopped. The question asks for Ali's share of that cost."
      }
    ],
    "backward": "Dividing an amount into equal parts, Ch8, and the cost of more items from direct proportion.",
    "forward": "A proportion step followed by a sharing step is the pattern behind the mixed problems in the harder levels."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(45:30\\) in its simplest form.",
    "options": [
      {
        "text": "\\(15:10\\)",
        "correct": false,
        "feedback": "Divided both terms by 3 only. 15 and 10 still have a common factor of 5, so \\(15:10\\) is not in simplest form."
      },
      {
        "text": "\\(9:6\\)",
        "correct": false,
        "feedback": "Divided both terms by 5 only. 9 and 6 still have a common factor of 3, so \\(9:6\\) is not in simplest form."
      },
      {
        "text": "\\(2:3\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(3:2\\)",
        "correct": true,
        "feedback": "Correct. The highest common factor of 45 and 30 is 15: \\(45 \\div 15 = 3\\) and \\(30 \\div 15 = 2\\)."
      }
    ],
    "backward": "Simplifying the fraction \\(\\frac{45}{30}\\), Ch8.",
    "forward": "Simplifying first keeps the numbers small when sharing and scaling later in this chapter."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write 60 cm : 2 m in its simplest form.",
    "options": [
      {
        "text": "\\(10:3\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(3:10\\)",
        "correct": true,
        "feedback": "Correct. Put both in the same unit: 2 m = 200 cm. Then \\(60:200 = 3:10\\) (\\(\\div 20\\))."
      },
      {
        "text": "\\(30:1\\)",
        "correct": false,
        "feedback": "Did not convert the units. Treated 60 cm : 2 m as \\(60:2 = 30:1\\). Both terms must be in the same unit before simplifying."
      },
      {
        "text": "\\(3:100\\)",
        "correct": false,
        "feedback": "Converted 2 m using 1 m = 1000 cm (2 m = 2000 cm), giving \\(60:2000 = 3:100\\). There are 100 cm in 1 m."
      }
    ],
    "backward": "Converting metres to centimetres by ×100, Ch3.",
    "forward": "Maps and scale drawings mix units, so convert first, Ch13."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\). When \\(x = 4\\), \\(y = 20\\). What is the constant of proportionality \\(k\\) in \\(y = kx\\)?",
    "options": [
      {
        "text": "0.2",
        "correct": false,
        "feedback": "Divided the wrong way round: \\(4 \\div 20 = 0.2\\). \\(k = y \\div x = 20 \\div 4\\)."
      },
      {
        "text": "5",
        "correct": true,
        "feedback": "Correct. \\(y = kx\\), so \\(k = y \\div x = 20 \\div 4 = 5\\)."
      },
      {
        "text": "80",
        "correct": false,
        "feedback": "Multiplied \\(x\\) and \\(y\\) (\\(4 \\times 20 = 80\\)). In \\(y = kx\\), the constant \\(k = y \\div x\\), so divide \\(y\\) by \\(x\\)."
      },
      {
        "text": "16",
        "correct": false,
        "feedback": "Subtracted: \\(20-4 = 16\\). In \\(y = kx\\) the \\(k\\) multiplies \\(x\\), so find \\(k\\) by dividing \\(y\\) by \\(x\\)."
      }
    ],
    "backward": "Solving the one-step equation \\(20 = 4k\\), Ch4, and the gradient of a line through the origin, Ch10.",
    "forward": "With \\(k\\) known, \\(y = kx\\) gives any \\(y\\) from any \\(x\\), used on tables and graphs later in this chapter."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The graph shows the cost of loose pasta against its weight. How much does 1 kg of pasta cost?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 380\" width=\"420\" height=\"380\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"380\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"140\" y1=\"40\" x2=\"140\" y2=\"320\"/><line x1=\"220\" y1=\"40\" x2=\"220\" y2=\"320\"/><line x1=\"300\" y1=\"40\" x2=\"300\" y2=\"320\"/><line x1=\"380\" y1=\"40\" x2=\"380\" y2=\"320\"/><line x1=\"60\" y1=\"292\" x2=\"380\" y2=\"292\"/><line x1=\"60\" y1=\"264\" x2=\"380\" y2=\"264\"/><line x1=\"60\" y1=\"236\" x2=\"380\" y2=\"236\"/><line x1=\"60\" y1=\"208\" x2=\"380\" y2=\"208\"/><line x1=\"60\" y1=\"180\" x2=\"380\" y2=\"180\"/><line x1=\"60\" y1=\"152\" x2=\"380\" y2=\"152\"/><line x1=\"60\" y1=\"124\" x2=\"380\" y2=\"124\"/><line x1=\"60\" y1=\"96\" x2=\"380\" y2=\"96\"/><line x1=\"60\" y1=\"68\" x2=\"380\" y2=\"68\"/><line x1=\"60\" y1=\"40\" x2=\"380\" y2=\"40\"/></g><line x1=\"60\" y1=\"320\" x2=\"380\" y2=\"320\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"60\" y2=\"40\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"380\" y2=\"40\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"220\" cy=\"180\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"60\" y=\"336\">0</text><text x=\"140\" y=\"336\">2</text><text x=\"220\" y=\"336\">4</text><text x=\"300\" y=\"336\">6</text><text x=\"380\" y=\"336\">8</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"54\" y=\"323.5\">0</text><text x=\"54\" y=\"295.5\">2</text><text x=\"54\" y=\"267.5\">4</text><text x=\"54\" y=\"239.5\">6</text><text x=\"54\" y=\"211.5\">8</text><text x=\"54\" y=\"183.5\">10</text><text x=\"54\" y=\"155.5\">12</text><text x=\"54\" y=\"127.5\">14</text><text x=\"54\" y=\"99.5\">16</text><text x=\"54\" y=\"71.5\">18</text><text x=\"54\" y=\"43.5\">20</text></g><text x=\"220\" y=\"364\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\">Weight (kg)</text><text x=\"16\" y=\"180\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 16 180)\">Cost (£)</text></svg></div>",
    "options": [
      {
        "text": "£4",
        "correct": false,
        "feedback": "Read the weight at the marked point (4 kg) as if it were the cost."
      },
      {
        "text": "£10",
        "correct": false,
        "feedback": "Read the cost at the marked point (£10), but that is the cost of 4 kg, not of 1 kg."
      },
      {
        "text": "£2.50",
        "correct": true,
        "feedback": "Correct. The marked point is (4 kg, £10), so 1 kg costs £10 ÷ 4 = £2.50."
      },
      {
        "text": "£40",
        "correct": false,
        "feedback": "Multiplied the cost by the weight (\\(10 \\times 4 = 40\\)). The cost per kg is found by dividing the cost by the weight."
      }
    ],
    "backward": "The gradient of a line through the origin is rise ÷ run, Ch10.",
    "forward": "The cost per kg is the constant of proportionality \\(k\\) in \\(y = kx\\)."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "The ratio of red to blue counters in a bag is \\(3:4\\). What fraction of the counters are red?",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Used the ratio terms as the fraction. \\(3:4\\) compares red with blue (part to part), not red with the whole bag."
      },
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Gave the fraction of blue counters (4 of the 7 parts). The question asks for red, which is 3 of the 7 parts."
      },
      {
        "text": "\\(\\frac{3}{7}\\)",
        "correct": true,
        "feedback": "Correct. \\(3+4 = 7\\) parts in the whole bag, and red counters are 3 of those parts, so red counters are \\(\\frac{3}{7}\\) of the bag."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Turned the ratio upside down. Red is the smaller group, so its fraction of the bag must be less than 1."
      }
    ],
    "backward": "Writing a part as a fraction of the whole, Ch8.",
    "forward": "The fraction \\(\\frac{3}{7}\\) is the probability of picking a red counter, Ch12."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£56 is shared between Cara and Dev in the ratio \\(3:5\\) (Cara : Dev). How much does each person get?",
    "options": [
      {
        "text": "Cara £21, Dev £35",
        "correct": true,
        "feedback": "Correct. \\(3+5 = 8\\) parts. £56 ÷ 8 = £7 for one part. Cara gets 3 × £7 = £21 and Dev gets 5 × £7 = £35."
      },
      {
        "text": "Cara £35, Dev £21",
        "correct": false,
        "feedback": "Matched the terms to the wrong people. The first term 3 belongs to Cara, so Cara gets 3 parts, not 5."
      },
      {
        "text": "Cara £28, Dev £28",
        "correct": false,
        "feedback": "Split the £56 equally between the two people. A ratio of \\(3:5\\) is not an equal split."
      },
      {
        "text": "Cara £7, Dev £49",
        "correct": false,
        "feedback": "Found the value of one part (£7), used it as Cara's share, and gave the rest (£49) to Dev. Cara's share is 3 parts, not 1 part."
      }
    ],
    "backward": "Dividing an amount into equal parts, Ch8.",
    "forward": "The part-to-total idea is the one behind relative frequency in Ch12."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "4 machines finish a batch of orders in 15 hours. How long will 12 machines take, all working at the same rate?",
    "options": [
      {
        "text": "45 hours",
        "correct": false,
        "feedback": "Treated it as direct proportion: \\(15 \\times 3 = 45\\). More machines finish the batch faster, so the time must go down."
      },
      {
        "text": "60 hours",
        "correct": false,
        "feedback": "Found \\(4 \\times 15 = 60\\) and stopped. The 60 must still be divided by the 12 machines."
      },
      {
        "text": "180 hours",
        "correct": false,
        "feedback": "Multiplied the 12 machines by the 15 hours (\\(12 \\times 15 = 180\\)), mixing the new number of machines with the old time. Inverse proportion divides the total machine-hours (60) by the number of machines."
      },
      {
        "text": "5 hours",
        "correct": true,
        "feedback": "Correct. 12 machines is 3 times as many as 4, so the time is \\(15 \\div 3 = 5\\) hours. Check: \\(4 \\times 15 = 60\\) and \\(12 \\times 5 = 60\\)."
      }
    ],
    "backward": "Dividing a quantity by a whole number, Ch8.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule for every inverse-proportion problem later in this chapter."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "\\(y\\) is inversely proportional to \\(x\\). When \\(x = 6\\), \\(y = 5\\). Find the value of \\(k\\) in \\(xy = k\\).",
    "options": [
      {
        "text": "1",
        "correct": false,
        "feedback": "Subtracted: \\(6-5 = 1\\). In inverse proportion the quantities are multiplied, not subtracted."
      },
      {
        "text": "11",
        "correct": false,
        "feedback": "Added: \\(6+5 = 11\\). In inverse proportion the quantities are multiplied, not added."
      },
      {
        "text": "30",
        "correct": true,
        "feedback": "Correct. \\(xy = k\\), so \\(k = 6 \\times 5 = 30\\)."
      },
      {
        "text": "1.2",
        "correct": false,
        "feedback": "Divided: \\(6 \\div 5 = 1.2\\). Dividing is the method for direct proportion. For inverse proportion, multiply \\(x\\) and \\(y\\)."
      }
    ],
    "backward": "Multiplication facts, and the contrast with the gradient \\(y \\div x\\) from Ch10, which is how direct proportion finds \\(k\\).",
    "forward": "Once \\(k\\) is known, \\(y = k \\div x\\) gives \\(y\\) for any \\(x\\), used later in this chapter."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of green to yellow beads is \\(2:7\\). There are 10 green beads. How many yellow beads are there?",
    "options": [
      {
        "text": "7",
        "correct": false,
        "feedback": "Read off the yellow term from the ratio (7) without scaling it up to match 10 green beads."
      },
      {
        "text": "15",
        "correct": false,
        "feedback": "Used addition. Green went from 2 to 10 (+8), so added 8 to the yellow term 7 to get 15. Ratios scale by multiplying, not adding."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Found the scale factor (\\(10 \\div 2 = 5\\)) and stopped. The scale factor must still be applied to the yellow term 7."
      },
      {
        "text": "35",
        "correct": true,
        "feedback": "Correct. The green term 2 is multiplied by 5 to give 10 (\\(10 \\div 2 = 5\\)), so the yellow term 7 is multiplied by 5: \\(7 \\times 5 = 35\\)."
      }
    ],
    "backward": "Equivalent fractions, \\(\\frac{2}{7} = \\frac{10}{35}\\), Ch8.",
    "forward": "The scale factor is the key idea in enlargement, Ch13."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of fiction to non-fiction books on a shelf is \\(5:2\\). There are 20 fiction books. How many books are on the shelf altogether?",
    "options": [
      {
        "text": "28",
        "correct": true,
        "feedback": "Correct. The fiction term 5 is multiplied by 4 to give 20 (\\(20 \\div 5 = 4\\)), so the non-fiction term 2 is multiplied by 4: \\(2 \\times 4 = 8\\). Altogether \\(20+8 = 28\\)."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Added the ratio terms (\\(5+2 = 7\\)). That is the number of parts in the ratio, not the number of books."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Found the number of non-fiction books (\\(2 \\times 4 = 8\\)) and stopped. The question asks for all the books."
      },
      {
        "text": "140",
        "correct": false,
        "feedback": "Multiplied 20 by 7, where 7 is the total number of parts (\\(5+2\\)). The scale factor is \\(20 \\div 5 = 4\\), applied to each term before adding."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction of the whole, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "The ratio of blue paint to white paint is 250 ml : 2 litres. A decorator uses 1.5 litres of blue paint. How many litres of white paint are needed?",
    "options": [
      {
        "text": "2 litres",
        "correct": false,
        "feedback": "Read off the white paint term from the ratio (2 litres) without scaling it up to match 1.5 litres of blue paint."
      },
      {
        "text": "12 litres",
        "correct": true,
        "feedback": "Correct. Put both in litres: 250 ml = 0.25 litres, so the ratio is \\(0.25 : 2\\). The blue paint used, 1.5 litres, is 6 times 0.25 litres (\\(1.5 \\div 0.25 = 6\\)), so the white paint is 6 times 2 litres: \\(6 \\times 2 = 12\\) litres."
      },
      {
        "text": "0.75 litres",
        "correct": false,
        "feedback": "Divided the blue paint used by the white paint term (\\(1.5 \\div 2 = 0.75\\)) instead of scaling the ratio. Both amounts must be in litres and then multiplied by the same scale factor."
      },
      {
        "text": "12000 litres",
        "correct": false,
        "feedback": "Found the scale factor correctly (\\(1500 \\div 250 = 6\\)) but multiplied it by 2000, the white paint in millilitres, and kept the number. The question asks for litres, so use the white paint as 2 litres: \\(6 \\times 2 = 12\\)."
      }
    ],
    "backward": "Converting millilitres to litres by ÷1000, Ch3, and equivalent fractions, Ch8.",
    "forward": "Converting units before scaling is needed for every map and model scale in Ch13."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "Two situations: (i) the time taken by 3 taps and by 6 taps to fill the same tank at the same flow rate; (ii) the amount of flour needed for 12 muffins and for 24 muffins with the same recipe. Which pair of descriptions is correct?",
    "options": [
      {
        "text": "(i) inverse proportion, (ii) direct proportion",
        "correct": true,
        "feedback": "Correct. Doubling the taps halves the time (inverse). Doubling the muffins doubles the flour (direct)."
      },
      {
        "text": "(i) direct proportion, (ii) inverse proportion",
        "correct": false,
        "feedback": "Swapped the two. More taps take less time (inverse), and more muffins need more flour (direct)."
      },
      {
        "text": "(i) direct proportion, (ii) direct proportion",
        "correct": false,
        "feedback": "Treated 'more' as always meaning 'more'. With more taps the tank fills sooner, so the time goes down: that is inverse proportion."
      },
      {
        "text": "(i) inverse proportion, (ii) inverse proportion",
        "correct": false,
        "feedback": "Treated both as 'one quantity goes up, the other goes down'. Making more muffins needs more flour, so that is direct proportion."
      }
    ],
    "backward": "The times-as-many idea from equivalent fractions, Ch8.",
    "forward": "Deciding direct or inverse comes first in every proportion problem."
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
    title: "Ratio and Proportion — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Simplifying and comparing ratios, sharing in a ratio, scaling from partial information, and recognising direct and inverse proportion — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your ratio and proportion skills already are: simplifying and comparing ratios, sharing amounts, scaling up, and spotting when quantities grow together or pull in opposite directions. For each question, ask yourself first: do the quantities scale up together, or does one go down as the other goes up? Then write your working before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

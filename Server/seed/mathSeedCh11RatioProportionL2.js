

// seed/mathSeedCh11RatioProportionL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 11
// (Ratio and Proportion), Level 2 — converted from the standalone diagnostic
// JSON ch11-ratio-proportion-level-2.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh11RatioProportionL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-11-ratio-proportion";
const CHAPTER_NAME = "Ratio and Proportion";
const LEVEL = 2;

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
    "question": "Write the ratio \\(0.9 : 1.5\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(3:5\\)",
        "correct": true,
        "feedback": "Correct. Multiply both terms by 10 to clear the decimals: \\(0.9 \\times 10 = 9\\) and \\(1.5 \\times 10 = 15\\). Then divide both by 3: \\(9 \\div 3 = 3\\) and \\(15 \\div 3 = 5\\), so the ratio is \\(3:5\\)."
      },
      {
        "text": "\\(9:15\\)",
        "correct": false,
        "feedback": "Multiplied by 10 to clear the decimals but stopped. 9 and 15 still have a common factor of 3, so \\(9:15\\) is not in simplest form."
      },
      {
        "text": "\\(5:3\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(6:1\\)",
        "correct": false,
        "feedback": "Multiplied only the first term by 10 (\\(0.9 \\times 10 = 9\\)) and left 1.5 unchanged, so \\(9:1.5 = 6:1\\). Both terms must be multiplied by the same number."
      }
    ],
    "retryHint": "Multiply both terms by the same power of 10 to get whole numbers, then look for a common factor.",
    "backward": "Multiplying decimals by 10, Ch3, and simplifying fractions, Ch8.",
    "forward": "Ratios with decimal lengths appear in scale drawings, Ch13."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "5 kg of apples cost £12.50. How much do 8 kg of apples cost?",
    "options": [
      {
        "text": "£2.50",
        "correct": false,
        "feedback": "Found the cost of 1 kg (£12.50 ÷ 5 = £2.50) and stopped. The question asks for 8 kg."
      },
      {
        "text": "£20",
        "correct": true,
        "feedback": "Correct. 5 kg costs £12.50, so 1 kg costs 12.50 ÷ 5 = £2.50. Then 8 kg costs 8 × 2.50 = £20."
      },
      {
        "text": "£15.50",
        "correct": false,
        "feedback": "Used addition. \\(8-5 = 3\\) extra kg, so added £3 to the £12.50 to get £15.50. Cost scales by multiplying, not adding."
      },
      {
        "text": "£100",
        "correct": false,
        "feedback": "Multiplied 8 × £12.50. The £12.50 is the cost of 5 kg, not of 1 kg."
      }
    ],
    "retryHint": "Find the cost of 1 kg first, then multiply by 8.",
    "backward": "Dividing decimals, Ch3.",
    "forward": "The cost of 1 kg is the constant of proportionality \\(k\\) in \\(y = kx\\), drawn on graphs later in this chapter."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Share 48 sweets in the ratio \\(1:2:3\\). How many sweets are in the largest share?",
    "options": [
      {
        "text": "8",
        "correct": false,
        "feedback": "Gave the value of one part (\\(48 \\div 6 = 8\\)). The largest share is 3 parts."
      },
      {
        "text": "16",
        "correct": false,
        "feedback": "Gave the middle share (2 parts: \\(2 \\times 8 = 16\\)). The question asks for the largest share, which is 3 parts."
      },
      {
        "text": "24",
        "correct": true,
        "feedback": "Correct. \\(1+2+3 = 6\\) parts in total. \\(48 \\div 6 = 8\\) sweets for one part. The largest share is 3 parts: \\(3 \\times 8 = 24\\)."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Gave the number of parts (\\(1+2+3 = 6\\)) as the number of sweets. Each part is 8 sweets, and the largest share is 3 parts."
      }
    ],
    "retryHint": "Add all three terms to find the number of parts, divide 48 by that, then multiply by the largest term.",
    "backward": "Finding a fraction of an amount, Ch8 — the largest share is \\(\\frac{3}{6}\\) of 48.",
    "forward": "Parts out of a total is the idea behind relative frequency, Ch12."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "4 taps can fill a tank in 15 minutes. How many minutes would 6 taps take, if every tap runs at the same rate?",
    "options": [
      {
        "text": "60",
        "correct": false,
        "feedback": "Found \\(4 \\times 15 = 60\\) and stopped. The 60 must still be divided by the 6 taps."
      },
      {
        "text": "10",
        "correct": true,
        "feedback": "Correct. 4 taps take 15 minutes, so filling the tank takes \\(4 \\times 15 = 60\\) minutes of tap time in total. 6 taps share that between them: \\(60 \\div 6 = 10\\) minutes."
      },
      {
        "text": "22.5",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 15 by 6, then divided by 4, to get 22.5). More taps fill the tank sooner, so the time must go down."
      },
      {
        "text": "13",
        "correct": false,
        "feedback": "Used subtraction. \\(6-4 = 2\\) more taps, so took 2 minutes off to get 13. Inverse proportion works by dividing the total, not by taking away a fixed amount."
      }
    ],
    "retryHint": "Find the total tap time (taps × minutes), then divide by the new number of taps.",
    "backward": "Solving the one-step equation 6t = 60, Ch4.",
    "forward": "The constant product \\(x \\times y = k\\) is how every inverse-proportion problem in this chapter is solved."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of red to blue to green marbles is \\(2:3:5\\). There are 12 red marbles. How many green marbles are there?",
    "options": [
      {
        "text": "15",
        "correct": false,
        "feedback": "Used addition. Red went from 2 to 12 (+10), so added 10 to the green term 5 to get 15. Ratios scale by multiplying, not adding."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Found the scale factor (\\(12 \\div 2 = 6\\)) and stopped. It must still be applied to the green term 5."
      },
      {
        "text": "30",
        "correct": true,
        "feedback": "Correct. The red term 2 is multiplied by 6 to give 12 (\\(12 \\div 2 = 6\\)), so the green term 5 is multiplied by 6: \\(5 \\times 6 = 30\\)."
      },
      {
        "text": "60",
        "correct": false,
        "feedback": "Found the total number of marbles (\\(2+3+5 = 10\\) parts, \\(10 \\times 6 = 60\\)) instead of the number of green ones. Green is only 5 of the 10 parts."
      }
    ],
    "retryHint": "Find what you multiply the red term by to get 12, then multiply the green term by the same number.",
    "backward": "Equivalent fractions, Ch8.",
    "forward": "The same scaling step is used to enlarge shapes, Ch13."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio 3 hours : 45 minutes in simplest form.",
    "options": [
      {
        "text": "\\(1:15\\)",
        "correct": false,
        "feedback": "Did not convert the units. Treated 3 hours : 45 minutes as \\(3:45 = 1:15\\). Both terms must be in the same unit."
      },
      {
        "text": "\\(1:4\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(12:3\\)",
        "correct": false,
        "feedback": "Converted correctly (\\(180:45\\)) but divided both terms by 15 only (\\(180 \\div 15 = 12\\) and \\(45 \\div 15 = 3\\)). 12 and 3 still have a common factor of 3, so \\(12:3\\) is not in simplest form."
      },
      {
        "text": "\\(4:1\\)",
        "correct": true,
        "feedback": "Correct. Put both in minutes: 3 hours = 180 minutes. Then \\(180:45 = 4:1\\) (\\(\\div 45\\))."
      }
    ],
    "retryHint": "Write both quantities in the same unit first, then simplify.",
    "backward": "Converting hours to minutes by ×60, and simplifying fractions, Ch8.",
    "forward": "Ratios of mixed units come back in the mixed problems later in this chapter."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\). When \\(x = 4\\), \\(y = 6\\). Find \\(y\\) when \\(x = 6\\).",
    "options": [
      {
        "text": "1.5",
        "correct": false,
        "feedback": "Found \\(k\\) (\\(6 \\div 4 = 1.5\\)) and stopped. The question asks for \\(y\\) when \\(x = 6\\)."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Used addition. \\(x\\) went from 4 to 6 (+2), so added 2 to \\(y\\) to get 8. In direct proportion \\(y\\) is multiplied, not shifted."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Multiplied \\(y\\) by \\(x\\) (\\(6 \\times 6 = 36\\)). The \\(y\\)-value 6 belongs to \\(x = 4\\), not to \\(x = 1\\)."
      },
      {
        "text": "9",
        "correct": true,
        "feedback": "Correct. \\(y = kx\\), so \\(k = y \\div x = 6 \\div 4 = 1.5\\). Then \\(y = 1.5 \\times 6 = 9\\)."
      }
    ],
    "retryHint": "Find \\(k\\) from \\(y \\div x\\) first, then substitute \\(x = 6\\) into \\(y = kx\\).",
    "backward": "Solving the one-step equation \\(6 = 4k\\), Ch4, and \\(y = mx\\) from Ch10.",
    "forward": "\\(k\\) is the gradient of the straight-line graph through the origin, drawn later in this chapter."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "6 friends share the cost of a minibus equally and each pays £15. How much would each friend pay if 9 friends shared the cost?",
    "options": [
      {
        "text": "£10",
        "correct": true,
        "feedback": "Correct. The total cost is 6 × £15 = £90 and it stays the same. 9 friends each pay £90 ÷ 9 = £10."
      },
      {
        "text": "£90",
        "correct": false,
        "feedback": "Found the total cost (6 × £15 = £90) and stopped. The total must still be divided by the 9 friends."
      },
      {
        "text": "£22.50",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied £15 by 9, then divided by 6, to get £22.50). More friends sharing the cost means each pays less, so the amount must go down."
      },
      {
        "text": "£12",
        "correct": false,
        "feedback": "Used subtraction. \\(9-6 = 3\\) more friends, so took £3 off the £15 to get £12. Inverse proportion works by dividing the total, not by taking away a fixed amount."
      }
    ],
    "retryHint": "The total cost stays the same. Find it first (friends × cost each), then divide by the new number of friends.",
    "backward": "Solving the one-step equation 9c = 90, Ch4.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule for every inverse-proportion problem in this chapter."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(\\frac{1}{2} : \\frac{3}{4}\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(3:2\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(1:3\\)",
        "correct": false,
        "feedback": "Used the numerators only (1 and 3) and ignored the denominators. \\(\\frac{1}{2}\\) and \\(\\frac{3}{4}\\) have different denominators, so they cannot be compared that way."
      },
      {
        "text": "\\(6:9\\)",
        "correct": false,
        "feedback": "Multiplied both terms by 12 (both denominators go into 12): one half of 12 is 6 and three quarters of 12 is 9. That clears the fractions, but \\(6:9\\) can still be simplified, so it is not in simplest form."
      },
      {
        "text": "\\(2:3\\)",
        "correct": true,
        "feedback": "Correct. Multiply both terms by 4 to clear the fractions: one half of 4 is 2 and three quarters of 4 is 3, so the ratio is \\(2:3\\)."
      }
    ],
    "backward": "Finding a common denominator, Ch8.",
    "forward": "Scale drawings with fractional measurements use ratios like this, Ch13."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A recipe uses 150 g of butter for 6 muffins. How much butter is needed for 15 muffins?",
    "options": [
      {
        "text": "60 g",
        "correct": false,
        "feedback": "Used the scale factor the wrong way up: \\(6 \\div 15 = 0.4\\), so \\(0.4 \\times 150 = 60\\) g. More muffins need more butter, so the factor must be \\(15 \\div 6 = 2.5\\)."
      },
      {
        "text": "159 g",
        "correct": false,
        "feedback": "Used addition. \\(15-6 = 9\\) extra muffins, so added 9 g to the 150 g to get 159 g. Amounts scale by multiplying, not adding."
      },
      {
        "text": "375 g",
        "correct": true,
        "feedback": "Correct. 6 muffins use 150 g, so 1 muffin uses \\(150 \\div 6 = 25\\) g. Then 15 muffins use \\(15 \\times 25 = 375\\) g."
      },
      {
        "text": "10 g",
        "correct": false,
        "feedback": "Divided the 150 g by the 15 muffins (\\(150 \\div 15 = 10\\) g). The 150 g is the butter for 6 muffins, so divide by 6 to find the butter for 1 muffin, then multiply by 15."
      }
    ],
    "backward": "Unit fractions, Ch8 — 1 muffin is \\(\\frac{1}{6}\\) of 6 muffins.",
    "forward": "Recipes scale the way drawings do, by a scale factor, Ch13."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£120 is shared between three people in the ratio \\(2:3:7\\). How much do the two people with the smaller shares get altogether?",
    "options": [
      {
        "text": "£70",
        "correct": false,
        "feedback": "Gave the largest share only (7 parts: 7 × £10). The question asks for the two smaller shares together."
      },
      {
        "text": "£100",
        "correct": false,
        "feedback": "Added the two larger shares (\\(3+7 = 10\\) parts: 10 × £10) instead of the two smaller ones."
      },
      {
        "text": "£50",
        "correct": true,
        "feedback": "Correct. \\(2+3+7 = 12\\) parts. £120 ÷ 12 = £10 for one part. The two smaller shares are \\(2+3 = 5\\) parts, so together they get 5 × £10 = £50."
      },
      {
        "text": "£80",
        "correct": false,
        "feedback": "Split the £120 equally between three people and took two of the equal shares (2 × £40 = £80). A ratio of \\(2:3:7\\) is not an equal split."
      }
    ],
    "backward": "Adding fractions of an amount, Ch8 — the two smaller shares are \\(\\frac{5}{12}\\) of £120.",
    "forward": "Parts out of a total is the idea behind relative frequency, Ch12."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Enough feed for 24 cows lasts 15 days. How long would the same feed last for 20 cows?",
    "options": [
      {
        "text": "18 days",
        "correct": true,
        "feedback": "Correct. 24 cows for 15 days is \\(24 \\times 15 = 360\\) cow-days of feed. 20 cows would use it up in \\(360 \\div 20 = 18\\) days."
      },
      {
        "text": "12.5 days",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 15 by 20, then divided by 24, to get 12.5). Fewer cows make the feed last longer, so the time must go up."
      },
      {
        "text": "19 days",
        "correct": false,
        "feedback": "Used addition. \\(24-20 = 4\\) fewer cows, so added 4 days to get 19. Inverse proportion works by dividing the total, not by adding a fixed amount."
      },
      {
        "text": "90 days",
        "correct": false,
        "feedback": "Found \\(24 \\times 15 = 360\\) cow-days, then divided by the 4 fewer cows (\\(24-20 = 4\\)) instead of by the 20 cows now eating the feed, giving 90."
      }
    ],
    "backward": "Solving the one-step equation 20d = 360, Ch4.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule behind every inverse-proportion problem in this chapter."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of boys to girls in a school club is \\(4:5\\). There are 18 more girls than boys. How many students are in the club?",
    "options": [
      {
        "text": "72",
        "correct": false,
        "feedback": "Found the number of boys (\\(4 \\times 18 = 72\\)) and stopped. The question asks for all the students."
      },
      {
        "text": "90",
        "correct": false,
        "feedback": "Found the number of girls (\\(5 \\times 18 = 90\\)) and stopped. The question asks for all the students."
      },
      {
        "text": "162",
        "correct": true,
        "feedback": "Correct. The girls have \\(5-4 = 1\\) more part than the boys, and that 1 part is 18 students. There are \\(4+5 = 9\\) parts in all, so the club has \\(9 \\times 18 = 162\\) students."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Read the difference (18) as the total. 18 is only the value of one part."
      }
    ],
    "backward": "Subtracting fractions of a whole, Ch8 — the girls' \\(\\frac{5}{9}\\) minus the boys' \\(\\frac{4}{9}\\) leaves \\(\\frac{1}{9}\\) of the club.",
    "forward": "Using a known difference to find the whole is how problems such as 'there are 18 more girls than boys' are solved in the mixed problems later in this chapter."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "£1.20 buys 4 pencils. Zara spends £6.00 on pencils and shares them with her friend in the ratio \\(3:2\\) (Zara : friend). How many pencils does Zara keep?",
    "options": [
      {
        "text": "12",
        "correct": true,
        "feedback": "Correct. £6.00 ÷ £1.20 = 5 lots of 4 pencils, so Zara buys \\(5 \\times 4 = 20\\) pencils. In the ratio \\(3:2\\) there are 5 parts, so one part is \\(20 \\div 5 = 4\\) pencils and Zara keeps \\(3 \\times 4 = 12\\)."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Gave the friend's pencils (2 parts: \\(2 \\times 4 = 8\\)). Zara has the larger share, which is 3 parts."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Found the total number of pencils (20) and did not share them."
      },
      {
        "text": "3.6",
        "correct": false,
        "feedback": "Shared the £6.00 in the ratio \\(3:2\\) (Zara's part of the money is £3.60) instead of the pencils. The question asks for a number of pencils."
      }
    ],
    "backward": "Dividing decimals, Ch3, and finding a fraction of an amount, Ch8.",
    "forward": "A proportion step followed by sharing in a ratio is how costs are split in the mixed problems later in this chapter."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(2.4 : 1.8 : 3\\) in simplest form.",
    "options": [
      {
        "text": "\\(24:18:30\\)",
        "correct": false,
        "feedback": "Multiplied by 10 to clear the decimals but stopped. All three terms still share a factor of 6, so \\(24:18:30\\) is not in simplest form."
      },
      {
        "text": "\\(4:3:5\\)",
        "correct": true,
        "feedback": "Correct. Multiply every term by 10 to clear the decimals: \\(24:18:30\\). Then divide all three terms by 6: \\(24 \\div 6 = 4\\), \\(18 \\div 6 = 3\\) and \\(30 \\div 6 = 5\\)."
      },
      {
        "text": "\\(12:9:15\\)",
        "correct": false,
        "feedback": "Divided by 2 only. 12, 9 and 15 still share a factor of 3, so \\(12:9:15\\) is not in simplest form."
      },
      {
        "text": "\\(8:6:1\\)",
        "correct": false,
        "feedback": "Multiplied only the first two terms by 10 and left the 3 unchanged, so \\(24:18:3\\) simplifies to \\(8:6:1\\). Every term must be multiplied by the same number."
      }
    ],
    "backward": "Multiplying decimals by 10, Ch3, and simplifying fractions, Ch8.",
    "forward": "Three-part ratios return when amounts are shared three ways in the mixed problems later in this chapter."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\). When \\(x = 6\\), \\(y = 15\\). Find \\(x\\) when \\(y = 40\\).",
    "options": [
      {
        "text": "100",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(40 \\times 2.5 = 100\\). Since \\(y = kx\\), \\(x = y \\div k\\)."
      },
      {
        "text": "31",
        "correct": false,
        "feedback": "Used addition. \\(y\\) went from 15 to 40 (+25), so added 25 to \\(x = 6\\) to get 31. In direct proportion \\(x\\) scales by multiplying, not adding."
      },
      {
        "text": "2.5",
        "correct": false,
        "feedback": "Found \\(k\\) (\\(15 \\div 6 = 2.5\\)) and stopped. The question asks for \\(x\\)."
      },
      {
        "text": "16",
        "correct": true,
        "feedback": "Correct. \\(y = kx\\), so \\(k = 15 \\div 6 = 2.5\\). To find \\(x\\), divide: \\(40 \\div 2.5 = 16\\)."
      }
    ],
    "backward": "Solving the equation \\(40 = 2.5x\\), Ch4.",
    "forward": "Reading \\(x\\) from \\(y\\) is how a graph through the origin is used backwards, as in the graph questions in this chapter."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "3.5 kg of flour is divided in the ratio \\(3:7\\). How much is the larger share, in grams?",
    "options": [
      {
        "text": "2450 g",
        "correct": true,
        "feedback": "Correct. 3.5 kg = 3500 g. \\(3+7 = 10\\) parts, so one part is \\(3500 \\div 10 = 350\\) g and the larger share is \\(7 \\times 350 = 2450\\) g."
      },
      {
        "text": "1050 g",
        "correct": false,
        "feedback": "Gave the smaller share (3 parts: \\(3 \\times 350 = 1050\\)). The question asks for the larger share, which is 7 parts."
      },
      {
        "text": "1500 g",
        "correct": false,
        "feedback": "Read the ratio \\(3:7\\) as the fraction \\(\\frac{3}{7}\\) and took \\(\\frac{3}{7}\\) of 3500 g = 1500 g. The ratio \\(3:7\\) has \\(3+7 = 10\\) parts, so the larger share is \\(\\frac{7}{10}\\) of the total."
      },
      {
        "text": "2.45 g",
        "correct": false,
        "feedback": "Did not convert to grams. \\(3.5 \\div 10 = 0.35\\) and \\(7 \\times 0.35 = 2.45\\), which is the larger share in kilograms, not in grams."
      }
    ],
    "backward": "Converting kilograms to grams by ×1000, Ch3.",
    "forward": "Converting units before sharing or scaling is needed for scale drawings, Ch13."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "\\(y\\) is inversely proportional to \\(x\\). When \\(x = 2\\), \\(y = 15\\). Find \\(y\\) when \\(x = 10\\).",
    "options": [
      {
        "text": "75",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 15 by 10, then divided by 2, to get 75). In inverse proportion \\(y\\) goes down when \\(x\\) goes up."
      },
      {
        "text": "7.5",
        "correct": false,
        "feedback": "Divided \\(y\\) by \\(x\\) (\\(15 \\div 2 = 7.5\\)), which is the method for direct proportion. For inverse proportion, multiply \\(x\\) and \\(y\\) to find \\(k\\)."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Multiplied \\(y\\) by the new value of \\(x\\) (\\(15 \\times 10 = 150\\)). In inverse proportion, find \\(k = 2 \\times 15 = 30\\) first and then divide it by 10."
      },
      {
        "text": "3",
        "correct": true,
        "feedback": "Correct. \\(xy = k\\), so \\(k = 2 \\times 15 = 30\\). Then \\(y = 30 \\div 10 = 3\\)."
      }
    ],
    "backward": "Solving the one-step equation \\(10y = 30\\), Ch4.",
    "forward": "The formula \\(y = \\frac{k}{x}\\) lets you find \\(y\\) for any \\(x\\), used in the proportion problems later in this chapter."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "Students at a club choose chess, drama or art in the ratio \\(5:2:3\\). 20 students choose chess. How many students are in the club altogether?",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Found the number of students who choose art (\\(3 \\times 4 = 12\\)) and stopped. The question asks for all the students."
      },
      {
        "text": "40",
        "correct": true,
        "feedback": "Correct. The chess term 5 is multiplied by 4 to give 20 (\\(20 \\div 5 = 4\\)). The total number of parts is \\(5+2+3 = 10\\), so there are \\(10 \\times 4 = 40\\) students."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Added the ratio terms (\\(5+2+3 = 10\\)). That is the number of parts, not the number of students."
      },
      {
        "text": "200",
        "correct": false,
        "feedback": "Multiplied 20 by 10, where 10 is the total number of parts. The scale factor is \\(20 \\div 5 = 4\\), applied to each term before adding."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction of the whole, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "6 workers can build a wall in 10 days. Working at the same rate, 15 workers build the same wall. Write the ratio of the time taken by 6 workers to the time taken by 15 workers in simplest form.",
    "options": [
      {
        "text": "\\(2:5\\)",
        "correct": false,
        "feedback": "Wrote the ratio of the workers (\\(6:15 = 2:5\\)) instead of the ratio of the times. With inverse proportion the ratio of the times is the reverse of the ratio of the workers."
      },
      {
        "text": "\\(5:2\\)",
        "correct": true,
        "feedback": "Correct. 6 workers take 10 days, so the wall is \\(6 \\times 10 = 60\\) worker-days. 15 workers take \\(60 \\div 15 = 4\\) days. The ratio of the times is \\(10:4\\), and dividing both terms by 2 gives \\(5:2\\)."
      },
      {
        "text": "\\(10:4\\)",
        "correct": false,
        "feedback": "Found the two times correctly (10 days and 4 days) but did not simplify. Both terms are divisible by 2, so \\(10:4\\) is not in simplest form."
      },
      {
        "text": "\\(10:1\\)",
        "correct": false,
        "feedback": "Used subtraction. \\(15-6 = 9\\) more workers, so took 9 days off to get 1 day. Inverse proportion works by dividing the total work, not by taking away a fixed amount."
      }
    ],
    "backward": "Simplifying fractions, Ch8, and solving the one-step equation 15d = 60, Ch4.",
    "forward": "Comparing two results of an inverse-proportion problem as a ratio is the kind of step used in the mixed problems later in this chapter."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio 30 minutes : 1.5 hours in the form \\(1:n\\).",
    "options": [
      {
        "text": "\\(1:5\\)",
        "correct": false,
        "feedback": "Converted 1.5 hours to 150 minutes (using 100 minutes in an hour), giving \\(30:150 = 1:5\\). There are 60 minutes in 1 hour."
      },
      {
        "text": "\\(20:1\\)",
        "correct": false,
        "feedback": "Did not convert the units. \\(30:1.5 = 20:1\\). Both terms must be in the same unit."
      },
      {
        "text": "\\(1:3\\)",
        "correct": true,
        "feedback": "Correct. Put both in minutes: 1.5 hours = 90 minutes. Then \\(30:90 = 1:3\\) (\\(\\div 30\\))."
      },
      {
        "text": "\\(3:1\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      }
    ],
    "backward": "Converting hours to minutes by ×60, Ch3.",
    "forward": "The \\(1:n\\) form is how map and model scales are written, Ch13."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The graph shows the cost of cotton fabric against its length. How much would 15 m of fabric cost?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 460 380\" width=\"460\" height=\"380\"><rect x=\"0\" y=\"0\" width=\"460\" height=\"380\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"120\" y1=\"50\" x2=\"120\" y2=\"320\"/><line x1=\"180\" y1=\"50\" x2=\"180\" y2=\"320\"/><line x1=\"240\" y1=\"50\" x2=\"240\" y2=\"320\"/><line x1=\"300\" y1=\"50\" x2=\"300\" y2=\"320\"/><line x1=\"360\" y1=\"50\" x2=\"360\" y2=\"320\"/><line x1=\"420\" y1=\"50\" x2=\"420\" y2=\"320\"/><line x1=\"60\" y1=\"275\" x2=\"420\" y2=\"275\"/><line x1=\"60\" y1=\"230\" x2=\"420\" y2=\"230\"/><line x1=\"60\" y1=\"185\" x2=\"420\" y2=\"185\"/><line x1=\"60\" y1=\"140\" x2=\"420\" y2=\"140\"/><line x1=\"60\" y1=\"95\" x2=\"420\" y2=\"95\"/><line x1=\"60\" y1=\"50\" x2=\"420\" y2=\"50\"/></g><line x1=\"60\" y1=\"320\" x2=\"420\" y2=\"320\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"60\" y2=\"50\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"420\" y2=\"50\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"240\" cy=\"185\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"60\" y=\"336\">0</text><text x=\"120\" y=\"336\">2</text><text x=\"180\" y=\"336\">4</text><text x=\"240\" y=\"336\">6</text><text x=\"300\" y=\"336\">8</text><text x=\"360\" y=\"336\">10</text><text x=\"420\" y=\"336\">12</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"54\" y=\"323.5\">0</text><text x=\"54\" y=\"278.5\">3</text><text x=\"54\" y=\"233.5\">6</text><text x=\"54\" y=\"188.5\">9</text><text x=\"54\" y=\"143.5\">12</text><text x=\"54\" y=\"98.5\">15</text><text x=\"54\" y=\"53.5\">18</text></g><text x=\"240\" y=\"364\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\">Length (m)</text><text x=\"16\" y=\"185\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 16 185)\">Cost (£)</text></svg></div>",
    "options": [
      {
        "text": "£22.50",
        "correct": true,
        "feedback": "Correct. The marked point is (6 m, £9), so 1 m costs 9 ÷ 6 = £1.50. Then 15 m costs 15 × 1.50 = £22.50."
      },
      {
        "text": "£1.50",
        "correct": false,
        "feedback": "Found the cost of 1 m (9 ÷ 6 = £1.50) and stopped. The question asks for 15 m."
      },
      {
        "text": "£18",
        "correct": false,
        "feedback": "Read the cost where the line ends, at 12 m (£18), and gave that for 15 m. The graph stops before 15 m, so the cost of 1 m (£1.50) is needed."
      },
      {
        "text": "£135",
        "correct": false,
        "feedback": "Multiplied \\(15 \\times 9\\). The £9 is the cost of 6 m, not of 1 m."
      }
    ],
    "backward": "The gradient of a line through the origin is rise ÷ run, Ch10.",
    "forward": "The cost per metre is the constant of proportionality \\(k\\) in \\(y = kx\\)."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£240 is shared between three people in the ratio \\(2:5:9\\). How much more does the person with the largest share get than the person with the smallest share?",
    "options": [
      {
        "text": "£135",
        "correct": false,
        "feedback": "Found the largest share (9 × £15 = £135) and stopped. The question asks how much more it is than the smallest share."
      },
      {
        "text": "£105",
        "correct": true,
        "feedback": "Correct. \\(2+5+9 = 16\\) parts. £240 ÷ 16 = £15 for one part. The largest share has \\(9-2 = 7\\) more parts than the smallest, so it is 7 × £15 = £105 more. Check: \\(9 \\times 15 = 135\\), \\(2 \\times 15 = 30\\) and \\(135-30 = 105\\)."
      },
      {
        "text": "£60",
        "correct": false,
        "feedback": "Compared the largest share with the middle share instead of the smallest: \\(9-5 = 4\\) parts, and 4 × £15 = £60."
      },
      {
        "text": "£7",
        "correct": false,
        "feedback": "Subtracted the ratio terms (\\(9-2 = 7\\)) and gave £7. That is the difference in parts, not in pounds: each part is £15."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "The same value-of-one-part method finds the whole when only a difference is known."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "10 workers can finish a job in 15 days. How many days would the job take with 4 fewer workers, all working at the same rate?",
    "options": [
      {
        "text": "9 days",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 15 by 6, then divided by 10, to get 9). Fewer workers need more days, so the time must go up."
      },
      {
        "text": "19 days",
        "correct": false,
        "feedback": "Used addition. 4 fewer workers, so added 4 days to get 19. Inverse proportion works by dividing the total work, not by adding a fixed amount."
      },
      {
        "text": "15 days",
        "correct": false,
        "feedback": "Divided the 150 worker-days by the original 10 workers and ignored that 4 workers are missing, which just gives back the original 15 days."
      },
      {
        "text": "25 days",
        "correct": true,
        "feedback": "Correct. The job is \\(10 \\times 15 = 150\\) worker-days. With 4 fewer workers there are \\(10-4 = 6\\) workers, so the job takes \\(150 \\div 6 = 25\\) days."
      }
    ],
    "backward": "Solving the one-step equation 6d = 150, Ch4.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule behind every inverse-proportion problem in this chapter."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of red to white to blue ribbons is \\(3:5:9\\). There are 20 white ribbons. How many red and blue ribbons are there altogether?",
    "options": [
      {
        "text": "68",
        "correct": false,
        "feedback": "Included the 20 white ribbons as well (\\(12+20+36 = 68\\)). The question asks for red and blue only."
      },
      {
        "text": "48",
        "correct": true,
        "feedback": "Correct. The white term 5 is multiplied by 4 to give 20 (\\(20 \\div 5 = 4\\)), so there are \\(3 \\times 4 = 12\\) red and \\(9 \\times 4 = 36\\) blue ribbons. Together that is \\(12+36 = 48\\) ribbons."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Found the number of blue ribbons (\\(9 \\times 4 = 36\\)) and stopped. The question asks for red and blue together."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Found the number of red ribbons (\\(3 \\times 4 = 12\\)) and stopped. The question asks for red and blue together."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "Scaling every term by one factor is what enlargement does to lengths, Ch13."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "A mix of red and blue paint is in the ratio \\(3:5\\) (red : blue). The mix has 6 litres of red paint, which cost £15. At the same price per litre, how much does the blue paint in the mix cost?",
    "options": [
      {
        "text": "£25",
        "correct": true,
        "feedback": "Correct. The red term 3 is multiplied by 2 to give 6 litres (\\(6 \\div 3 = 2\\)), so the blue paint is \\(5 \\times 2 = 10\\) litres. Red paint costs £15 ÷ 6 = £2.50 per litre, so 10 litres of blue cost 10 × £2.50 = £25."
      },
      {
        "text": "£9",
        "correct": false,
        "feedback": "Scaled the £15 by \\(3 \\div 5\\) instead of \\(5 \\div 3\\) (\\(15 \\times 3 \\div 5 = 9\\)). The blue paint is more than the red paint, so it must cost more."
      },
      {
        "text": "£10",
        "correct": false,
        "feedback": "Found the number of litres of blue paint (10) and gave that as the cost in pounds."
      },
      {
        "text": "£40",
        "correct": false,
        "feedback": "Found the cost of all the paint, red and blue (\\(15+25 = 40\\)), not just the blue."
      }
    ],
    "backward": "Dividing decimals, Ch3, and equivalent fractions, Ch8.",
    "forward": "Finding an amount from a ratio and then pricing it is how the cost of a mixture is worked out in the mixed problems later in this chapter."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "In class A the ratio of boys to girls is \\(4:3\\). In class B it is \\(8:7\\). Which class has more boys for each girl?",
    "options": [
      {
        "text": "Class B",
        "correct": false,
        "feedback": "Compared the numbers of boys in the ratios (8 against 4) instead of the boys for each girl. A larger first term does not make a larger ratio when the second term is larger too."
      },
      {
        "text": "Neither: the proportions are equal",
        "correct": false,
        "feedback": "Compared the gaps between the terms (\\(4-3 = 1\\) and \\(8-7 = 1\\)), found them equal and decided the ratios are equal. Ratios are compared by dividing, not by subtracting."
      },
      {
        "text": "It cannot be decided without the class sizes",
        "correct": false,
        "feedback": "Thought ratios cannot be compared without knowing how many students there are. Each ratio already compares boys with girls, so finding the boys for each girl lets you compare them directly."
      },
      {
        "text": "Class A",
        "correct": true,
        "feedback": "Correct. Divide each ratio by its girls' term to get the boys for each girl: class A is \\(4 \\div 3\\) ≈ 1.33 boys per girl and class B is \\(8 \\div 7\\) ≈ 1.14 boys per girl. Class A has more boys for each girl."
      }
    ],
    "backward": "Converting fractions to decimals to compare, Ch3 and Ch8.",
    "forward": "Comparing ratios as unit rates is how scales and rates are compared in Ch13."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "\\(y\\) is directly proportional to \\(x\\). When \\(x\\) increases from 4 to 10, \\(y\\) increases by 12. What is the constant of proportionality \\(k\\)?",
    "options": [
      {
        "text": "1.2",
        "correct": false,
        "feedback": "Divided the increase in \\(y\\) by the new value of \\(x\\) (\\(12 \\div 10 = 1.2\\)). The increase in \\(y\\) goes with the increase in \\(x\\), which is 6."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Divided the increase in \\(y\\) by the starting value of \\(x\\) (\\(12 \\div 4 = 3\\)). The increase in \\(y\\) goes with the increase in \\(x\\), which is 6."
      },
      {
        "text": "0.5",
        "correct": false,
        "feedback": "Divided the change in \\(x\\) by the change in \\(y\\) (\\(6 \\div 12 = 0.5\\)), which is \\(1 \\div k\\). \\(k\\) is the change in \\(y\\) divided by the change in \\(x\\)."
      },
      {
        "text": "2",
        "correct": true,
        "feedback": "Correct. \\(x\\) increases by \\(10-4 = 6\\) and \\(y\\) increases by 12. Since \\(y = kx\\), the increases are in the same ratio, so \\(k = 12 \\div 6 = 2\\)."
      }
    ],
    "backward": "Gradient = rise ÷ run, Ch10.",
    "forward": "With \\(k\\) known, \\(y = kx\\) gives any \\(y\\) from any \\(x\\), used later in this chapter."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£7.50 is shared between Mo and Tia in the ratio \\(2:3\\) (Mo : Tia). How much does Mo get, in pence?",
    "options": [
      {
        "text": "450p",
        "correct": false,
        "feedback": "Gave Tia's share (3 parts: \\(3 \\times 150 = 450\\)). The question asks for Mo's share, which is 2 parts."
      },
      {
        "text": "300p",
        "correct": true,
        "feedback": "Correct. £7.50 = 750p. \\(2+3 = 5\\) parts, so one part is \\(750 \\div 5\\) = 150p and Mo's 2 parts are \\(2 \\times 150\\) = 300p."
      },
      {
        "text": "500p",
        "correct": false,
        "feedback": "Read the ratio \\(2:3\\) as the fraction \\(\\frac{2}{3}\\) and took \\(\\frac{2}{3}\\) of 750p = 500p. The ratio \\(2:3\\) has \\(2+3 = 5\\) parts, so Mo's share is \\(\\frac{2}{5}\\) of the total."
      },
      {
        "text": "3p",
        "correct": false,
        "feedback": "Did not convert to pence. \\(7.5 \\div 5 = 1.5\\) and \\(2 \\times 1.5 = 3\\), which is Mo's share in pounds, not in pence."
      }
    ],
    "backward": "Converting pounds to pence by ×100, Ch3.",
    "forward": "The same part-value method finds the whole when only a difference is known."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "In the table, \\(y\\) is inversely proportional to \\(x\\): \\(x = 2\\), 5, 10 and \\(y = 30\\), 12, ? Find the missing value.",
    "options": [
      {
        "text": "6",
        "correct": true,
        "feedback": "Correct. \\(x \\times y\\) is constant: \\(2 \\times 30 = 60\\) and \\(5 \\times 12 = 60\\), so \\(k = 60\\). The missing value is \\(y = 60 \\div 10 = 6\\)."
      },
      {
        "text": "60",
        "correct": false,
        "feedback": "Found \\(k\\) (60) and stopped. The missing value is \\(y = k \\div x\\), which is \\(60 \\div 10\\)."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Treated it as direct proportion: \\(x\\) is 5 times as big (2 to 10), so multiplied 30 by 5 to get 150. In inverse proportion \\(y\\) goes down when \\(x\\) goes up."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Used subtraction. \\(x\\) went from 5 to 10 (+5), so took 5 from 12 to get 7. Inverse proportion works by dividing, not by taking away a fixed amount."
      }
    ],
    "backward": "Solving the one-step equation \\(10y = 60\\), Ch4.",
    "forward": "Completing a table this way is the first step of the formula \\(y = \\frac{k}{x}\\)."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of red to blue to green sweets is \\(2:3:7\\). Red and blue sweets together make 40. How many green sweets are there?",
    "options": [
      {
        "text": "140",
        "correct": false,
        "feedback": "Used 40 as the number of red sweets. Then one part would be \\(40 \\div 2 = 20\\) and green would be \\(7 \\times 20 = 140\\). But 40 is red and blue together."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Found the value of one part (\\(40 \\div 5 = 8\\)) and stopped. Green is 7 parts."
      },
      {
        "text": "56",
        "correct": true,
        "feedback": "Correct. Red and blue are \\(2+3 = 5\\) parts, and those parts make 40, so one part is \\(40 \\div 5 = 8\\). Green is 7 parts: \\(7 \\times 8 = 56\\)."
      },
      {
        "text": "96",
        "correct": false,
        "feedback": "Found the total number of sweets (\\(2+3+7 = 12\\) parts, \\(12 \\times 8 = 96\\)) instead of the green sweets."
      }
    ],
    "backward": "Solving the one-step equation 5p = 40, Ch4.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction of the whole, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "The ratio of red to blue counters in a bag is \\(3:7\\). There are 12 red counters. 5 more blue counters are then added to the bag. What is the new ratio of red to blue counters in simplest form?",
    "options": [
      {
        "text": "\\(12:33\\)",
        "correct": false,
        "feedback": "Found the new ratio \\(12:33\\) but did not simplify. Both terms are divisible by 3, so \\(12:33\\) is not in simplest form."
      },
      {
        "text": "\\(1:4\\)",
        "correct": false,
        "feedback": "Added the 5 counters to the blue term of the ratio (\\(7+5 = 12\\)) instead of to the 28 blue counters, giving \\(3:12 = 1:4\\)."
      },
      {
        "text": "\\(4:11\\)",
        "correct": true,
        "feedback": "Correct. The red term 3 is multiplied by 4 to give 12 (\\(12 \\div 3 = 4\\)), so there are \\(4 \\times 7 = 28\\) blue counters. After 5 more are added there are \\(28+5 = 33\\) blue counters. The new ratio is \\(12:33\\), and dividing both terms by 3 gives \\(4:11\\)."
      },
      {
        "text": "\\(11:4\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      }
    ],
    "backward": "Equivalent fractions and simplifying fractions, Ch8.",
    "forward": "Updating a ratio after one quantity changes is how mixtures and scale models are adjusted, Ch13."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio \\(\\frac{1}{3} : \\frac{5}{6}\\) in simplest form using whole numbers.",
    "options": [
      {
        "text": "\\(2:5\\)",
        "correct": true,
        "feedback": "Correct. Multiply both terms by 6 to clear the fractions: one third of 6 is 2 and five sixths of 6 is 5, so the ratio is \\(2:5\\)."
      },
      {
        "text": "\\(5:2\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(1:5\\)",
        "correct": false,
        "feedback": "Used the numerators only (1 and 5) and ignored the denominators. \\(\\frac{1}{3}\\) and \\(\\frac{5}{6}\\) have different denominators, so they cannot be compared that way."
      },
      {
        "text": "\\(4:10\\)",
        "correct": false,
        "feedback": "Multiplied both terms by 12 (both denominators go into 12): one third of 12 is 4 and five sixths of 12 is 10. That clears the fractions, but \\(4:10\\) can still be simplified, so it is not in simplest form."
      }
    ],
    "backward": "Finding a common denominator, Ch8.",
    "forward": "Scale drawings with fractional measurements use ratios like this, Ch13."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Write the ratio 20 minutes : 2.5 hours in the form \\(1:n\\).",
    "options": [
      {
        "text": "\\(1:12.5\\)",
        "correct": false,
        "feedback": "Converted 2.5 hours to 250 minutes (using 100 minutes in an hour), giving \\(20:250 = 1:12.5\\). There are 60 minutes in 1 hour."
      },
      {
        "text": "\\(8:1\\)",
        "correct": false,
        "feedback": "Did not convert the units. \\(20:2.5 = 8:1\\). Both terms must be in the same unit."
      },
      {
        "text": "\\(7.5:1\\)",
        "correct": false,
        "feedback": "Reversed the order of the terms. A ratio keeps the quantities in the order they are named, so the first term stays first."
      },
      {
        "text": "\\(1:7.5\\)",
        "correct": true,
        "feedback": "Correct. Put both in minutes: 2.5 hours = 150 minutes. Then \\(20:150 = 1:7.5\\) (\\(\\div 20\\))."
      }
    ],
    "backward": "Converting hours to minutes by ×60, Ch3.",
    "forward": "The \\(1:n\\) form is how map and model scales are written, Ch13."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A recipe uses 240 g of rice for 8 portions. How much rice is needed for 12 portions?",
    "options": [
      {
        "text": "160 g",
        "correct": false,
        "feedback": "Used the scale factor the wrong way up: \\(8 \\div 12\\) is two thirds, so two thirds of \\(240 = 160\\) g. More portions need more rice, so the factor must be \\(12 \\div 8 = 1.5\\)."
      },
      {
        "text": "244 g",
        "correct": false,
        "feedback": "Used addition. \\(12-8 = 4\\) extra portions, so added 4 g to the 240 g to get 244 g. Amounts scale by multiplying, not adding."
      },
      {
        "text": "360 g",
        "correct": true,
        "feedback": "Correct. 8 portions use 240 g, so 1 portion uses \\(240 \\div 8 = 30\\) g. Then 12 portions use \\(12 \\times 30 = 360\\) g."
      },
      {
        "text": "2880 g",
        "correct": false,
        "feedback": "Multiplied \\(12 \\times 240\\). The 240 g is the rice for 8 portions, not for 1 portion."
      }
    ],
    "backward": "Unit fractions, Ch8 — 1 portion is \\(\\frac{1}{8}\\) of 8 portions.",
    "forward": "Recipes scale the way drawings do, by a scale factor, Ch13."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The graph shows the cost of rope against its length. How much would 14 m of rope cost?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 460 380\" width=\"460\" height=\"380\"><rect x=\"0\" y=\"0\" width=\"460\" height=\"380\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"120\" y1=\"50\" x2=\"120\" y2=\"320\"/><line x1=\"180\" y1=\"50\" x2=\"180\" y2=\"320\"/><line x1=\"240\" y1=\"50\" x2=\"240\" y2=\"320\"/><line x1=\"300\" y1=\"50\" x2=\"300\" y2=\"320\"/><line x1=\"360\" y1=\"50\" x2=\"360\" y2=\"320\"/><line x1=\"420\" y1=\"50\" x2=\"420\" y2=\"320\"/><line x1=\"60\" y1=\"275\" x2=\"420\" y2=\"275\"/><line x1=\"60\" y1=\"230\" x2=\"420\" y2=\"230\"/><line x1=\"60\" y1=\"185\" x2=\"420\" y2=\"185\"/><line x1=\"60\" y1=\"140\" x2=\"420\" y2=\"140\"/><line x1=\"60\" y1=\"95\" x2=\"420\" y2=\"95\"/><line x1=\"60\" y1=\"50\" x2=\"420\" y2=\"50\"/></g><line x1=\"60\" y1=\"320\" x2=\"420\" y2=\"320\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"60\" y2=\"50\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"420\" y2=\"50\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"240\" cy=\"185\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"60\" y=\"336\">0</text><text x=\"120\" y=\"336\">2</text><text x=\"180\" y=\"336\">4</text><text x=\"240\" y=\"336\">6</text><text x=\"300\" y=\"336\">8</text><text x=\"360\" y=\"336\">10</text><text x=\"420\" y=\"336\">12</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"54\" y=\"323.5\">0</text><text x=\"54\" y=\"278.5\">5</text><text x=\"54\" y=\"233.5\">10</text><text x=\"54\" y=\"188.5\">15</text><text x=\"54\" y=\"143.5\">20</text><text x=\"54\" y=\"98.5\">25</text><text x=\"54\" y=\"53.5\">30</text></g><text x=\"240\" y=\"364\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\">Length (m)</text><text x=\"16\" y=\"185\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 16 185)\">Cost (£)</text></svg></div>",
    "options": [
      {
        "text": "£2.50",
        "correct": false,
        "feedback": "Found the cost of 1 m (15 ÷ 6 = £2.50) and stopped. The question asks for 14 m."
      },
      {
        "text": "£35",
        "correct": true,
        "feedback": "Correct. The marked point is (6 m, £15), so 1 m costs 15 ÷ 6 = £2.50. Then 14 m costs 14 × 2.50 = £35."
      },
      {
        "text": "£30",
        "correct": false,
        "feedback": "Read the cost where the line ends, at 12 m (£30), and gave that for 14 m. The graph stops before 14 m, so the cost of 1 m (£2.50) is needed."
      },
      {
        "text": "£210",
        "correct": false,
        "feedback": "Multiplied \\(14 \\times 15\\). The £15 is the cost of 6 m, not of 1 m."
      }
    ],
    "backward": "The gradient of a line through the origin is rise ÷ run, Ch10.",
    "forward": "The cost per metre is the constant of proportionality \\(k\\) in \\(y = kx\\)."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£96 is shared between three people in the ratio \\(1:2:5\\). How much do the two people with the smaller shares get altogether?",
    "options": [
      {
        "text": "£60",
        "correct": false,
        "feedback": "Gave the largest share only (5 parts: 5 × £12). The question asks for the two smaller shares together."
      },
      {
        "text": "£84",
        "correct": false,
        "feedback": "Added the two larger shares (\\(2+5 = 7\\) parts: 7 × £12) instead of the two smaller ones."
      },
      {
        "text": "£36",
        "correct": true,
        "feedback": "Correct. \\(1+2+5 = 8\\) parts. £96 ÷ 8 = £12 for one part. The two smaller shares are \\(1+2 = 3\\) parts, so together they get 3 × £12 = £36."
      },
      {
        "text": "£64",
        "correct": false,
        "feedback": "Split the £96 equally between three people and took two of the equal shares (2 × £32 = £64). A ratio of \\(1:2:5\\) is not an equal split."
      }
    ],
    "backward": "Adding fractions of an amount, Ch8 — the two smaller shares are \\(\\frac{3}{8}\\) of £96.",
    "forward": "Parts out of a total is the idea behind relative frequency, Ch12."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£180 is shared between three people in the ratio \\(1:3:5\\). How much more does the person with the largest share get than the person with the smallest share?",
    "options": [
      {
        "text": "£80",
        "correct": true,
        "feedback": "Correct. \\(1+3+5 = 9\\) parts. £180 ÷ 9 = £20 for one part. The largest share has \\(5-1 = 4\\) more parts than the smallest, so it is 4 × £20 = £80 more. Check: \\(5 \\times 20 = 100\\), \\(1 \\times 20 = 20\\) and \\(100-20 = 80\\)."
      },
      {
        "text": "£100",
        "correct": false,
        "feedback": "Found the largest share (5 × £20 = £100) and stopped. The question asks how much more it is than the smallest share."
      },
      {
        "text": "£40",
        "correct": false,
        "feedback": "Compared the largest share with the middle share instead of the smallest: \\(5-3 = 2\\) parts, and 2 × £20 = £40."
      },
      {
        "text": "£4",
        "correct": false,
        "feedback": "Subtracted the ratio terms (\\(5-1 = 4\\)) and gave £4. That is the difference in parts, not in pounds: each part is £20."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "The same value-of-one-part method finds the whole when only a difference is known."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "A shop packs biscuits into 30 boxes, with 12 biscuits in each box. If each box held 15 biscuits instead, how many boxes would be needed for the same biscuits?",
    "options": [
      {
        "text": "37.5 boxes",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 30 by 15, then divided by 12, to get 37.5). More biscuits per box means fewer boxes, so the number must go down."
      },
      {
        "text": "24 boxes",
        "correct": true,
        "feedback": "Correct. 30 boxes of 12 is \\(30 \\times 12 = 360\\) biscuits. At 15 biscuits per box, \\(360 \\div 15 = 24\\) boxes."
      },
      {
        "text": "27 boxes",
        "correct": false,
        "feedback": "Used subtraction. \\(15-12 = 3\\) more biscuits per box, so took 3 boxes off to get 27. Inverse proportion works by dividing the total, not by taking away a fixed amount."
      },
      {
        "text": "120 boxes",
        "correct": false,
        "feedback": "Found \\(30 \\times 12 = 360\\) biscuits, then divided by the 3 extra biscuits per box (\\(15-12 = 3\\)) instead of by the 15 biscuits in each new box, giving 120."
      }
    ],
    "backward": "Solving the one-step equation 15b = 360, Ch4.",
    "forward": "The constant product \\(x \\times y = k\\) is the rule behind every inverse-proportion problem in this chapter."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "\\(y\\) is inversely proportional to \\(x\\). When \\(x = 4\\), \\(y = 30\\). Find \\(y\\) when \\(x = 24\\).",
    "options": [
      {
        "text": "180",
        "correct": false,
        "feedback": "Treated it as direct proportion (multiplied 30 by 24, then divided by 4, to get 180). In inverse proportion \\(y\\) goes down when \\(x\\) goes up."
      },
      {
        "text": "7.5",
        "correct": false,
        "feedback": "Divided \\(y\\) by \\(x\\) (\\(30 \\div 4 = 7.5\\)), which is the method for direct proportion. For inverse proportion, multiply \\(x\\) and \\(y\\) to find \\(k\\)."
      },
      {
        "text": "720",
        "correct": false,
        "feedback": "Multiplied \\(y\\) by the new value of \\(x\\) (\\(30 \\times 24 = 720\\)). In inverse proportion, find \\(k = 4 \\times 30 = 120\\) first and then divide it by 24."
      },
      {
        "text": "5",
        "correct": true,
        "feedback": "Correct. \\(xy = k\\), so \\(k = 4 \\times 30 = 120\\). Then \\(y = 120 \\div 24 = 5\\)."
      }
    ],
    "backward": "Solving the one-step equation \\(24y = 120\\), Ch4.",
    "forward": "The formula \\(y = \\frac{k}{x}\\) lets you find \\(y\\) for any \\(x\\), used in the proportion problems later in this chapter."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of cats to dogs at a rescue centre is \\(7:9\\). There are 10 more dogs than cats. How many animals are there altogether?",
    "options": [
      {
        "text": "80",
        "correct": true,
        "feedback": "Correct. The dogs have \\(9-7 = 2\\) more parts than the cats, and that is 10 animals, so one part is \\(10 \\div 2 = 5\\). There are \\(7+9 = 16\\) parts in all, so there are \\(16 \\times 5 = 80\\) animals."
      },
      {
        "text": "35",
        "correct": false,
        "feedback": "Found the number of cats (\\(7 \\times 5 = 35\\)) and stopped. The question asks for all the animals."
      },
      {
        "text": "45",
        "correct": false,
        "feedback": "Found the number of dogs (\\(9 \\times 5 = 45\\)) and stopped. The question asks for all the animals."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Found the value of one part (\\(10 \\div 2 = 5\\)) and stopped. The question asks for all the animals."
      }
    ],
    "backward": "Subtracting fractions of a whole, Ch8 — the dogs' \\(\\frac{9}{16}\\) minus the cats' \\(\\frac{7}{16}\\) leaves \\(\\frac{2}{16}\\) of the animals.",
    "forward": "Using a known difference to find the whole is how problems such as 'there are 18 more girls than boys' are solved in the mixed problems later in this chapter."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of pens to pencils to rulers in a box is \\(1:4:6\\). Pens and pencils together number 45. How many rulers are there?",
    "options": [
      {
        "text": "270",
        "correct": false,
        "feedback": "Used 45 as the number of pens. Then one part would be \\(45 \\div 1 = 45\\) and rulers would be \\(6 \\times 45 = 270\\). But 45 is pens and pencils together."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Found the value of one part (\\(45 \\div 5 = 9\\)) and stopped. Rulers are 6 parts."
      },
      {
        "text": "99",
        "correct": false,
        "feedback": "Found the total number of items (\\(1+4+6 = 11\\) parts, \\(11 \\times 9 = 99\\)) instead of the rulers."
      },
      {
        "text": "54",
        "correct": true,
        "feedback": "Correct. Pens and pencils are \\(1+4 = 5\\) parts, and those parts make 45, so one part is \\(45 \\div 5 = 9\\). Rulers are 6 parts: \\(6 \\times 9 = 54\\)."
      }
    ],
    "backward": "Solving the one-step equation 5p = 45, Ch4.",
    "forward": "The total number of parts is the denominator when a ratio becomes a fraction of the whole, the idea behind relative frequency in Ch12."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "£1.50 buys 5 stickers. Dev spends £12 on stickers and shares them with his sister in the ratio \\(3:5\\) (Dev : sister). How many stickers does Dev keep?",
    "options": [
      {
        "text": "25",
        "correct": false,
        "feedback": "Gave his sister's stickers (5 parts: \\(5 \\times 5 = 25\\)). Dev has the smaller share, which is 3 parts."
      },
      {
        "text": "40",
        "correct": false,
        "feedback": "Found the total number of stickers (40) and did not share them."
      },
      {
        "text": "15",
        "correct": true,
        "feedback": "Correct. £12.00 ÷ £1.50 = 8 lots of 5 stickers, so Dev buys \\(8 \\times 5 = 40\\) stickers. In the ratio \\(3:5\\) there are 8 parts, so one part is \\(40 \\div 8 = 5\\) stickers and Dev keeps \\(3 \\times 5 = 15\\)."
      },
      {
        "text": "4.5",
        "correct": false,
        "feedback": "Shared the £12 in the ratio \\(3:5\\) (Dev's part of the money is £4.50) instead of the stickers. The question asks for a number of stickers."
      }
    ],
    "backward": "Dividing decimals, Ch3, and finding a fraction of an amount, Ch8.",
    "forward": "A proportion step followed by sharing in a ratio is how costs are split in the mixed problems later in this chapter."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "8 machines can fill an order in 9 days. Working at the same rate, 12 machines fill the same order. Write the ratio of the time taken by 8 machines to the time taken by 12 machines in simplest form.",
    "options": [
      {
        "text": "\\(2:3\\)",
        "correct": false,
        "feedback": "Wrote the ratio of the machines (\\(8:12 = 2:3\\)) instead of the ratio of the times. With inverse proportion the ratio of the times is the reverse of the ratio of the machines."
      },
      {
        "text": "\\(3:2\\)",
        "correct": true,
        "feedback": "Correct. 8 machines take 9 days, so the order is \\(8 \\times 9 = 72\\) machine-days. 12 machines take \\(72 \\div 12 = 6\\) days. The ratio of the times is \\(9:6\\), and dividing both terms by 3 gives \\(3:2\\)."
      },
      {
        "text": "\\(9:6\\)",
        "correct": false,
        "feedback": "Found the two times correctly (9 days and 6 days) but did not simplify. Both terms are divisible by 3, so \\(9:6\\) is not in simplest form."
      },
      {
        "text": "\\(9:5\\)",
        "correct": false,
        "feedback": "Used subtraction. \\(12-8 = 4\\) more machines, so took 4 days off to get 5 days. Inverse proportion works by dividing the total work, not by taking away a fixed amount."
      }
    ],
    "backward": "Simplifying fractions, Ch8, and solving the one-step equation 12d = 72, Ch4.",
    "forward": "Comparing two results of an inverse-proportion problem as a ratio is the kind of step used in the mixed problems later in this chapter."
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
    title: "Ratio and Proportion — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Two-step ratio and proportion reasoning — three-part ratios, mixed units, finding a constant and then using it, and sharing after a proportion step — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed. Most questions take two steps inside one topic: find one unit and then scale it, convert and then compare, find a constant and then use it. A few take one step from each of two topics, so decide which two ideas you need before you start. Write down your first step before you start the second. When an answer goes wrong, it is usually in the step that was done in your head, and that is exactly what this section is designed to show us.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

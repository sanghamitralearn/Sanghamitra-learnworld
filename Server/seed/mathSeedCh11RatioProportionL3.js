

// seed/mathSeedCh11RatioProportionL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 11
// (Ratio and Proportion), Level 3 — converted from the standalone diagnostic
// JSON ch11-ratio-proportion-level-3.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh11RatioProportionL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-11-ratio-proportion";
const CHAPTER_NAME = "Ratio and Proportion";
const LEVEL = 3;

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
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "£84 is shared in the ratio \\(6:8\\). How much is the smaller share?",
    "options": [
      {
        "text": "£36",
        "correct": true,
        "feedback": "Correct. Divide both terms by 2 to get \\(3:4\\). There are \\(3+4 = 7\\) parts, so one part is £84 ÷ 7 = £12 and the smaller share is 3 × £12 = £36."
      },
      {
        "text": "£48",
        "correct": false,
        "feedback": "Gave the larger share (4 parts: 4 × £12 = £48). The question asks for the smaller share."
      },
      {
        "text": "£63",
        "correct": false,
        "feedback": "Took \\(\\frac{3}{4}\\) of £84 (£63), treating the ratio terms as a fraction of the whole. The whole is 7 parts, so the smaller share is \\(\\frac{3}{7}\\) of £84."
      },
      {
        "text": "£42",
        "correct": false,
        "feedback": "Split the £84 equally (£42 each). A ratio of \\(6:8\\) is not an equal split."
      }
    ],
    "retryHint": "Simplify the ratio first. Then add the terms to find the number of parts and divide the amount by that.",
    "backward": "Simplifying fractions, Ch8, and dividing an amount into equal parts, Ch8.",
    "forward": "Sharing in a ratio is used in the harder problems that follow."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A bag costs £40 in the UK and €42 in France. £1 buys €1.20. In which country is the bag cheaper, and by how much?",
    "options": [
      {
        "text": "France, by £5",
        "correct": true,
        "feedback": "Correct. £1 buys €1.20, so €42 is 42 ÷ 1.20 = £35. That is less than £40, so the bag is £40−£35 = £5 cheaper in France."
      },
      {
        "text": "The UK, by £2",
        "correct": false,
        "feedback": "Compared the numbers without converting (\\(42-40 = 2\\)) and decided the UK is cheaper. Pounds and euros are different units."
      },
      {
        "text": "France, by £6",
        "correct": false,
        "feedback": "Converted the £40 into euros (40 × 1.20 = €48) and subtracted €42, then wrote the answer in pounds. The difference of €6 must be converted back to pounds."
      },
      {
        "text": "The UK, by £10.40",
        "correct": false,
        "feedback": "Converted euros to pounds by multiplying instead of dividing (42 × 1.20 = £50.40) and then compared £50.40 with £40 (£50.40−£40 = £10.40). A pound buys more than one euro here, so €42 is worth less than £42."
      }
    ],
    "retryHint": "Convert one price into the other currency first. £1 buys €1.20, so divide the euro price by 1.20 to get pounds.",
    "backward": "Dividing decimals, Ch3.",
    "forward": "An exchange rate is a conversion factor, like a map scale in Ch13."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "A mixture of 0.5 litres of juice and water is in the ratio \\(1:4\\) (juice : water). How much more juice must be added to make the ratio \\(1:1\\)?",
    "options": [
      {
        "text": "100 ml",
        "correct": false,
        "feedback": "Gave the juice already in the mixture (100 ml), not the amount to add."
      },
      {
        "text": "300 ml",
        "correct": true,
        "feedback": "Correct. 0.5 litres = 500 ml. The ratio \\(1:4\\) has \\(1+4 = 5\\) parts, so one part is \\(500 \\div 5 = 100\\) ml: juice \\(1 \\times 100 = 100\\) ml and water \\(4 \\times 100 = 400\\) ml. For a ratio of \\(1:1\\) there must be 400 ml of juice, so add \\(400-100 = 300\\) ml."
      },
      {
        "text": "400 ml",
        "correct": false,
        "feedback": "Gave the amount of juice needed in total (400 ml), not the extra juice. 100 ml is already there."
      },
      {
        "text": "150 ml",
        "correct": false,
        "feedback": "Split the 500 ml into two equal halves (250 ml of juice) and subtracted the 100 ml already there (\\(250-100 = 150\\) ml). Adding juice does not remove any water, so the total does not stay at 500 ml."
      }
    ],
    "retryHint": "Convert litres to millilitres first. Share the mixture in the ratio, then work out how much juice is needed to match the water.",
    "backward": "Converting litres to millilitres, Ch7, and dividing a total into equal parts, Ch8.",
    "forward": "Adjusting a mixture to reach a target ratio is the pattern behind dilution and recipe problems."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Pumps A, B and C can each empty the same pool alone in 2 hours, 3 hours and 6 hours. Write the ratio of the speeds of A:B:C in simplest form.",
    "options": [
      {
        "text": "\\(2:3:6\\)",
        "correct": false,
        "feedback": "Wrote the ratio of the times (\\(2:3:6\\)) instead of the speeds. A shorter time means a faster pump, so the speeds are in the opposite pattern."
      },
      {
        "text": "\\(1:2:3\\)",
        "correct": false,
        "feedback": "Found the right speeds but wrote them in the order C, B, A (\\(1:2:3\\)). The ratio must be in the order A:B:C."
      },
      {
        "text": "\\(3:2:1\\)",
        "correct": true,
        "feedback": "Correct. In 1 hour the pumps empty \\(\\frac{1}{2}\\), \\(\\frac{1}{3}\\) and \\(\\frac{1}{6}\\) of the pool. Over a common denominator of 6 that is \\(\\frac{3}{6}\\), \\(\\frac{2}{6}\\) and \\(\\frac{1}{6}\\), so the speeds are in the ratio \\(3:2:1\\)."
      },
      {
        "text": "\\(6:3:2\\)",
        "correct": false,
        "feedback": "Reversed the list of times (\\(6:3:2\\)). Speed is the reciprocal of time, not the times in reverse order."
      }
    ],
    "retryHint": "A pump that takes less time is faster. Write each speed as a fraction of the pool per hour over a common denominator.",
    "backward": "Common denominators, Ch8, and simplifying ratios.",
    "forward": "Comparing rates by writing them over a common denominator is used in speed and flow problems."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of cars to vans to buses in a car park is \\(5:3:2\\). There are 12 more cars than buses. How many more cars than vans are there?",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Gave the difference in the question (12). That is the difference between cars and buses, not between cars and vans."
      },
      {
        "text": "8",
        "correct": true,
        "feedback": "Correct. The cars have \\(5-2 = 3\\) more parts than the buses, and that is 12, so one part is \\(12 \\div 3 = 4\\). The cars have \\(5-3 = 2\\) more parts than the vans, so there are \\(2 \\times 4 = 8\\) more cars than vans."
      },
      {
        "text": "4",
        "correct": false,
        "feedback": "Found the value of one part (4) and stopped. The cars have 2 more parts than the vans."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Subtracted the ratio terms (\\(5-3 = 2\\)) and gave that as the number of cars. It is the difference in parts, and each part is 4."
      }
    ],
    "retryHint": "The difference you are told is between two of the terms. Find the value of one part from that difference first.",
    "backward": "Subtracting fractions of a whole, Ch8.",
    "forward": "Using a known difference to find an unknown difference is the same step as finding a missing frequency, Ch12."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Asha runs 60 m in 12 seconds. Ben runs at \\(\\frac{3}{4}\\) of Asha's speed. How long does Ben take to run 120 m, in seconds?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Used Asha's speed (5 m/s) for Ben: \\(120 \\div 5 = 24\\). Ben is slower, so the time must be longer."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Multiplied the time by \\(\\frac{3}{4}\\) (\\(12 \\times 3/4 = 9\\)) because the speed is \\(\\frac{3}{4}\\) as big, then scaled to 120 m (\\(9 \\times 2 = 18\\)). A slower runner takes longer, so divide by the fraction."
      },
      {
        "text": "32",
        "correct": true,
        "feedback": "Correct. Asha runs \\(60 \\div 12 = 5\\) m/s. Ben runs at \\(\\frac{3}{4}\\) of that, which is 3.75 m/s, so Ben takes \\(120 \\div 3.75 = 32\\) seconds."
      },
      {
        "text": "16",
        "correct": false,
        "feedback": "Found Ben's time for 60 m (\\(12 \\div (\\frac{3}{4}) = 16\\) seconds) and stopped. The question asks for 120 m."
      }
    ],
    "retryHint": "Find Asha's speed first. Then find Ben's speed as a fraction of it, and divide the distance by his speed.",
    "backward": "Fractions of an amount, Ch8.",
    "forward": "Speed, distance and time problems use the same proportion thinking in science and later maths."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Three friends aged 6, 8 and 10 share a prize of £72 in the ratio of their ages. How much more does the oldest get than the youngest?",
    "options": [
      {
        "text": "£30",
        "correct": false,
        "feedback": "Gave the oldest friend's share (5 parts: 5 × £6 = £30). The question asks how much more the oldest gets than the youngest."
      },
      {
        "text": "£2",
        "correct": false,
        "feedback": "Gave the difference in parts (\\(5-3 = 2\\)) as pounds. Each part is worth £6."
      },
      {
        "text": "£4",
        "correct": false,
        "feedback": "Gave the difference in ages (\\(10-6 = 4\\)) as pounds. The difference in shares depends on the value of one part."
      },
      {
        "text": "£12",
        "correct": true,
        "feedback": "Correct. The ratio of the ages \\(6:8:10\\) simplifies (\\(\\div 2\\)) to \\(3:4:5\\). There are \\(3+4+5 = 12\\) parts, so one part is £72 ÷ 12 = £6. The oldest has \\(5-3 = 2\\) more parts than the youngest, so gets 2 × £6 = £12 more."
      }
    ],
    "retryHint": "Simplify the ratio of the ages first. Find the value of one part, then use the difference in parts.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Sharing in the ratio of a measured quantity is used for dividing costs and profits."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "A printer prints 120 pages in 6 minutes. How long, in minutes, would 4 such printers take to print 600 pages, all working at the same rate?",
    "options": [
      {
        "text": "30",
        "correct": false,
        "feedback": "Scaled the time by the pages only (\\(600 \\div 120 = 5\\), so \\(6 \\times 5 = 30\\)) and ignored that 4 printers share the work."
      },
      {
        "text": "1.5",
        "correct": false,
        "feedback": "Divided the 6 minutes by the 4 printers (\\(6 \\div 4 = 1.5\\)) and ignored that there are 600 pages to do, not 120."
      },
      {
        "text": "120",
        "correct": false,
        "feedback": "Scaled the time by the pages (30 minutes) and then multiplied by the 4 printers instead of dividing (\\(30 \\times 4 = 120\\))."
      },
      {
        "text": "7.5",
        "correct": true,
        "feedback": "Correct. One printer prints \\(120 \\div 6 = 20\\) pages per minute, so 4 printers print \\(4 \\times 20 = 80\\) pages per minute. 600 pages take \\(600 \\div 80 = 7.5\\) minutes."
      }
    ],
    "retryHint": "Find how many pages one printer prints per minute. Then work out how many all the printers print per minute.",
    "backward": "Dividing a quantity by a rate, Ch3.",
    "forward": "When both the amount of work and the number of workers change, each is a separate proportion."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "The ratio of red to blue is \\(2:3\\). The ratio of blue to green is \\(4:5\\). Write the ratio red:blue:green.",
    "options": [
      {
        "text": "\\(8:12:15\\)",
        "correct": true,
        "feedback": "Correct. The number for blue is 3 in the first ratio but 4 in the second, so the two ratios do not match. Multiply the first ratio by 4 so that blue is 12: \\(2:3 = 8:12\\). Multiply the second ratio by 3 so that blue is 12: \\(4:5 = 12:15\\). Then red:blue:green = \\(8:12:15\\)."
      },
      {
        "text": "\\(2:3:5\\)",
        "correct": false,
        "feedback": "Joined the ratios without matching blue (\\(2:3:5\\)): in the first ratio blue is 3, but in the second it is 4."
      },
      {
        "text": "\\(2:4:5\\)",
        "correct": false,
        "feedback": "Matched blue by using 4 (\\(2:4:5\\)) but did not scale red to match (2 should become 8)."
      },
      {
        "text": "\\(8:12:20\\)",
        "correct": false,
        "feedback": "Multiplied both ratios by 4, the factor used for the first one (\\(8:12:20\\)). The second ratio needs to be multiplied by 3 to make blue = 12, so green is \\(5 \\times 3 = 15\\)."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "Combining ratios through a common term is used for scale factors and for mixtures with three parts, Ch13."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Rice A costs £4.80 for 2 kg. Rice B costs £5.40 for 1.5 kg. Write the ratio of the price per kg of A to the price per kg of B in simplest form.",
    "options": [
      {
        "text": "\\(3:2\\)",
        "correct": false,
        "feedback": "Found both prices per kg correctly but wrote the ratio the wrong way round (\\(3:2\\), which is B to A)."
      },
      {
        "text": "\\(240:360\\)",
        "correct": false,
        "feedback": "Cleared the decimals (\\(240:360\\)) but did not simplify. Both terms are still divisible by 120."
      },
      {
        "text": "\\(8:9\\)",
        "correct": false,
        "feedback": "Wrote the ratio of the total prices (£4.80:£5.40 = \\(8:9\\)) without dividing by the weights. The question asks for the price per kg."
      },
      {
        "text": "\\(2:3\\)",
        "correct": true,
        "feedback": "Correct. Rice A costs £4.80 ÷ 2 = £2.40 per kg and rice B costs £5.40 ÷ 1.5 = £3.60 per kg, so the ratio is \\(2.4:3.6\\). Multiply both terms by 100 to clear the decimals (\\(240:360\\)), then divide both by 120 to get \\(2:3\\)."
      }
    ],
    "backward": "Dividing decimals, Ch3, and simplifying fractions, Ch8.",
    "forward": "Comparing unit rates is how exchange rates and scales are compared, Ch13."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "A 5 kg bag of flour costs £8. Pat buys 3 kg of flour. The cost is shared between Pat and Quinn in the ratio \\(5:3\\) (Pat : Quinn). How much does Quinn pay?",
    "options": [
      {
        "text": "£3.00",
        "correct": false,
        "feedback": "Gave Pat's share (5 parts: 5 × £0.60 = £3). The question asks for Quinn's share, which is 3 parts."
      },
      {
        "text": "£1.80",
        "correct": true,
        "feedback": "Correct. 5 kg costs £8, so 1 kg costs £8 ÷ 5 = £1.60, and 3 kg costs 3 × £1.60 = £4.80. The ratio \\(5:3\\) has \\(5+3 = 8\\) parts, so one part is £4.80 ÷ 8 = £0.60 and Quinn pays 3 × £0.60 = £1.80."
      },
      {
        "text": "£2.40",
        "correct": false,
        "feedback": "Split the £4.80 equally (£4.80 ÷ 2 = £2.40 each). A ratio of \\(5:3\\) is not an equal split."
      },
      {
        "text": "£4.80",
        "correct": false,
        "feedback": "Found the total cost of 3 kg (£4.80) and stopped. The question asks for Quinn's share."
      }
    ],
    "backward": "Dividing decimals, Ch3, and dividing a total into equal parts, Ch8.",
    "forward": "Working out a cost and then splitting it is the pattern behind sharing bills and budgets."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Pipe A fills a tank in 4 hours. Pipe B fills the same tank in 6 hours. Both pipes work together at their own rates. How long do they take to fill the tank?",
    "options": [
      {
        "text": "5 hours",
        "correct": false,
        "feedback": "Averaged the two times ((\\(4+6\\))÷\\(2 = 5\\)). Working together must be faster than either pipe alone, so the time must be less than 4 hours."
      },
      {
        "text": "10 hours",
        "correct": false,
        "feedback": "Added the two times (\\(4+6 = 10\\)). Working together must be faster than either pipe alone, not slower."
      },
      {
        "text": "2.4 hours",
        "correct": true,
        "feedback": "Correct. In 1 hour pipe A fills \\(\\frac{1}{4}\\) of the tank and pipe B fills \\(\\frac{1}{6}\\). Over a common denominator of 12 that is \\(\\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}\\) of the tank each hour, so the tank takes \\(12 \\div 5 = 2.4\\) hours."
      },
      {
        "text": "4 hours",
        "correct": false,
        "feedback": "Gave the time of the faster pipe alone (4 hours), ignoring the other pipe. Two pipes together must take less than 4 hours."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "Adding rates is the idea behind combined-work and flow problems later in this course."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "Some money is shared between Zoe and Yan in the ratio \\(2:5\\). Yan gets £36 more than Zoe. Yan then shares his money with his sister in the ratio \\(1:5\\) (Yan : sister). How much does his sister get?",
    "options": [
      {
        "text": "£50",
        "correct": true,
        "feedback": "Correct. Yan has \\(5-2 = 3\\) more parts than Zoe, and that is £36, so one part is £36 ÷ 3 = £12 and Yan has 5 × £12 = £60. The ratio \\(1:5\\) has \\(1+5 = 6\\) parts, so one part is £60 ÷ 6 = £10 and the sister gets 5 × £10 = £50."
      },
      {
        "text": "£10",
        "correct": false,
        "feedback": "Gave Yan's own share (1 part: 1 × £10 = £10). The sister gets 5 parts of Yan's money."
      },
      {
        "text": "£12",
        "correct": false,
        "feedback": "Found the value of one part of the first sharing (£36 ÷ 3 = £12) and stopped. The question asks how much the sister gets."
      },
      {
        "text": "£30",
        "correct": false,
        "feedback": "Shared the £36 difference in the ratio \\(1:5\\) instead of Yan's £60: £36 ÷ 6 = £6 per part, so 5 × £6 = £30."
      }
    ],
    "backward": "Dividing a total into equal parts, Ch8.",
    "forward": "The same value-of-one-part idea is used when a probability is a part of a total, Ch12."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "200 g of flour makes 8 muffins. The recipe uses flour, sugar and butter in the ratio \\(4:3:2\\). How much butter is needed to make 20 muffins?",
    "options": [
      {
        "text": "100 g",
        "correct": false,
        "feedback": "Found the butter for 8 muffins (100 g) and did not scale it up to 20 muffins."
      },
      {
        "text": "500 g",
        "correct": false,
        "feedback": "Found the flour for 20 muffins (500 g) and stopped. The question asks for the butter."
      },
      {
        "text": "250 g",
        "correct": true,
        "feedback": "Correct. 20 muffins is \\(20 \\div 8 = 2.5\\) times as many as 8, so the flour is \\(2.5 \\times 200 = 500\\) g. The flour is 4 parts of the ratio \\(4:3:2\\), so one part is \\(500 \\div 4 = 125\\) g and the butter is \\(2 \\times 125 = 250\\) g."
      },
      {
        "text": "1125 g",
        "correct": false,
        "feedback": "Found the mass of all three ingredients for 20 muffins (1125 g) instead of just the butter."
      }
    ],
    "backward": "Dividing decimals, Ch3, and equivalent fractions, Ch8.",
    "forward": "Scaling a recipe and then splitting it by a ratio is the pattern behind mixture and cost problems in later chapters."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Class A has 40 students and the ratio of boys to girls is \\(3:5\\). Class B has 36 students and the ratio of boys to girls is \\(4:5\\). Write the ratio of boys to girls for both classes together in simplest form.",
    "options": [
      {
        "text": "\\(31:45\\)",
        "correct": true,
        "feedback": "Correct. Class A: \\(3+5 = 8\\) parts, so one part is \\(40 \\div 8 = 5\\), giving 15 boys and 25 girls. Class B: \\(4+5 = 9\\) parts, so one part is \\(36 \\div 9 = 4\\), giving 16 boys and 20 girls. Together there are \\(15+16 = 31\\) boys and \\(25+20 = 45\\) girls, so the ratio is \\(31:45\\)."
      },
      {
        "text": "\\(7:10\\)",
        "correct": false,
        "feedback": "Added the ratio terms (\\(3+4 = 7\\) and \\(5+5 = 10\\)). Ratios from groups of different sizes cannot be added term by term."
      },
      {
        "text": "\\(45:31\\)",
        "correct": false,
        "feedback": "Found the right numbers but wrote the ratio as girls to boys (\\(45:31\\)). The question asks for boys to girls."
      },
      {
        "text": "\\(31:76\\)",
        "correct": false,
        "feedback": "Used the total number of students (76) as the second term (\\(31:76\\)) instead of the number of girls (45)."
      }
    ],
    "backward": "Dividing a total into equal parts, Ch8.",
    "forward": "Combining groups and then comparing them is the step used when frequencies are pooled, Ch12."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "The graph shows how pounds convert to euros. A jacket costs £75 in the UK and €84 in France. In which country is the jacket cheaper, and by how much?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 450 380\" width=\"450\" height=\"380\"><rect x=\"0\" y=\"0\" width=\"450\" height=\"380\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"147.5\" y1=\"50\" x2=\"147.5\" y2=\"320\"/><line x1=\"235\" y1=\"50\" x2=\"235\" y2=\"320\"/><line x1=\"322.5\" y1=\"50\" x2=\"322.5\" y2=\"320\"/><line x1=\"410\" y1=\"50\" x2=\"410\" y2=\"320\"/><line x1=\"60\" y1=\"252.5\" x2=\"410\" y2=\"252.5\"/><line x1=\"60\" y1=\"185\" x2=\"410\" y2=\"185\"/><line x1=\"60\" y1=\"117.5\" x2=\"410\" y2=\"117.5\"/><line x1=\"60\" y1=\"50\" x2=\"410\" y2=\"50\"/></g><line x1=\"60\" y1=\"320\" x2=\"410\" y2=\"320\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"60\" y2=\"50\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"320\" x2=\"410\" y2=\"50\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"235\" cy=\"185\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"60\" y=\"336\">0</text><text x=\"147.5\" y=\"336\">25</text><text x=\"235\" y=\"336\">50</text><text x=\"322.5\" y=\"336\">75</text><text x=\"410\" y=\"336\">100</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"54\" y=\"323.5\">0</text><text x=\"54\" y=\"256\">30</text><text x=\"54\" y=\"188.5\">60</text><text x=\"54\" y=\"121\">90</text><text x=\"54\" y=\"53.5\">120</text></g><text x=\"235\" y=\"364\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\">Pounds (£)</text><text x=\"16\" y=\"185\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 16 185)\">Euros (€)</text></svg></div>",
    "options": [
      {
        "text": "The UK, by £9",
        "correct": false,
        "feedback": "Compared the numbers without converting (\\(84-75 = 9\\)) and decided the UK is cheaper. Pounds and euros are different units."
      },
      {
        "text": "France, by £6",
        "correct": false,
        "feedback": "Converted the £75 into euros (75 × 1.20 = €90) and subtracted €84, then wrote the answer in pounds. The difference of €6 must be converted back to pounds."
      },
      {
        "text": "The UK, by £25.80",
        "correct": false,
        "feedback": "Converted euros to pounds by multiplying instead of dividing (84 × 1.20 = £100.80) and then compared £100.80 with £75 (£100.80−£75 = £25.80). A pound buys more than one euro here, so €84 is worth less than £84."
      },
      {
        "text": "France, by £5",
        "correct": true,
        "feedback": "Correct. The point (50, 60) shows that £50 buys €60, so £1 buys 60 ÷ 50 = €1.20. €84 is 84 ÷ 1.20 = £70. That is less than £75, so the jacket is £75−£70 = £5 cheaper in France."
      }
    ],
    "backward": "Reading a rate from a straight-line graph, Ch10, and dividing decimals, Ch3.",
    "forward": "An exchange rate is a conversion factor, like a map scale in Ch13."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "A mixture of 1.5 litres of juice and water is in the ratio \\(2:3\\) (juice : water). How much more juice must be added to make the ratio \\(1:1\\)?",
    "options": [
      {
        "text": "600 ml",
        "correct": false,
        "feedback": "Gave the juice already in the mixture (600 ml), not the amount to add."
      },
      {
        "text": "900 ml",
        "correct": false,
        "feedback": "Gave the amount of juice needed in total (900 ml), not the extra juice. 600 ml is already there."
      },
      {
        "text": "150 ml",
        "correct": false,
        "feedback": "Split the 1500 ml into two equal halves (750 ml of juice) and subtracted the 600 ml already there (\\(750-600 = 150\\) ml). Adding juice does not remove any water, so the total does not stay at 1500 ml."
      },
      {
        "text": "300 ml",
        "correct": true,
        "feedback": "Correct. 1.5 litres = 1500 ml. The ratio \\(2:3\\) has \\(2+3 = 5\\) parts, so one part is \\(1500 \\div 5 = 300\\) ml: juice \\(2 \\times 300 = 600\\) ml and water \\(3 \\times 300 = 900\\) ml. For a ratio of \\(1:1\\) there must be 900 ml of juice, so add \\(900-600 = 300\\) ml."
      }
    ],
    "backward": "Converting litres to millilitres, Ch7, and dividing a total into equal parts, Ch8.",
    "forward": "Adjusting a mixture to reach a target ratio is the pattern behind dilution and recipe problems."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "The speeds of car P and car Q are in the ratio \\(3:4\\). Car P takes 2 h 24 min for a journey. How long does car Q take for the same journey at its own constant speed?",
    "options": [
      {
        "text": "1 h 48 min",
        "correct": true,
        "feedback": "Correct. For the same distance, the faster car takes less time, so the times are in the opposite ratio: time for car P : time for car Q = \\(4:3\\). 2 h 24 min = 144 min, so one part is \\(144 \\div 4 = 36\\) min and car Q takes \\(3 \\times 36 = 108\\) min, which is 1 h 48 min."
      },
      {
        "text": "3 h 12 min",
        "correct": false,
        "feedback": "Treated it as direct proportion: \\(144 \\times 4/3 = 192\\) min, which is 3 h 12 min. Car Q is faster, so it must take less time than car P."
      },
      {
        "text": "1 h 68 min",
        "correct": false,
        "feedback": "Wrote 2 h 24 min as 2.24 hours (24 minutes is not 0.24 of an hour) and got \\(2.24 \\times 3/4 = 1.68\\), read as 1 h 68 min. Convert to minutes first: 1 hour is 60 minutes."
      },
      {
        "text": "36 min",
        "correct": false,
        "feedback": "Found the value of one part (\\(144 \\div 4 = 36\\) min) and stopped. Car Q has 3 parts."
      }
    ],
    "backward": "Converting hours to minutes, Ch7, and equivalent fractions, Ch8.",
    "forward": "Relating a ratio of rates to a ratio of times is used in speed, distance and time problems."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of cars to vans to lorries in a depot is \\(7:4:3\\). There are 24 more cars than lorries. How many more cars than vans are there?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Gave the difference in the question (24). That is the difference between cars and lorries, not between cars and vans."
      },
      {
        "text": "18",
        "correct": true,
        "feedback": "Correct. The cars have \\(7-3 = 4\\) more parts than the lorries, and that is 24, so one part is \\(24 \\div 4 = 6\\). The cars have \\(7-4 = 3\\) more parts than the vans, so there are \\(3 \\times 6 = 18\\) more cars than vans."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Found the value of one part (6) and stopped. The cars have 3 more parts than the vans."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Subtracted the ratio terms (\\(7-4 = 3\\)) and gave that as the number of cars. It is the difference in parts, and each part is 6."
      }
    ],
    "backward": "Subtracting fractions of a whole, Ch8.",
    "forward": "Using a known difference to find an unknown difference is the same step as finding a missing frequency, Ch12."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "Fruit punch is made from juice and soda in the ratio \\(2:3\\). Juice costs £1.50 per litre and soda costs £0.80 per litre. What is the cost of 10 litres of punch?",
    "options": [
      {
        "text": "£11.50",
        "correct": false,
        "feedback": "Averaged the two prices per litre ((£1.50+£0.80)÷2 = £1.15) and multiplied by 10 (£1.15 × 10 = £11.50). The ratio means there is more soda than juice, so the prices cannot be averaged equally."
      },
      {
        "text": "£23.00",
        "correct": false,
        "feedback": "Added the two prices per litre (£2.30) and multiplied by 10 (£2.30 × 10 = £23.00). That would charge for 10 litres of juice and 10 litres of soda."
      },
      {
        "text": "£10.80",
        "correct": true,
        "feedback": "Correct. The ratio \\(2:3\\) has \\(2+3 = 5\\) parts, so 10 litres is 4 litres of juice and 6 litres of soda. The juice costs 4 × £1.50 = £6.00 and the soda costs 6 × £0.80 = £4.80, so the total is £6.00+£4.80 = £10.80."
      },
      {
        "text": "£6.00",
        "correct": false,
        "feedback": "Found the cost of the juice only (4 × £1.50 = £6.00) and left out the soda."
      }
    ],
    "backward": "Multiplying decimals, Ch3, and finding a fraction of an amount, Ch8.",
    "forward": "Costing a mixture from a ratio is how recipes and building materials are priced."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Mix A has squash and water in the ratio \\(3:5\\). Mix B has squash and water in the ratio \\(4:7\\). Which mix is stronger (has the greater fraction of squash), and what fraction of that mix is squash?",
    "options": [
      {
        "text": "A, \\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Chose the right mix but wrote the part-to-part ratio \\(3:5\\) as the fraction \\(\\frac{3}{5}\\). The whole is \\(3+5 = 8\\) parts."
      },
      {
        "text": "A, \\(\\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. A ratio of squash to water is part to part, so squash is a fraction of the whole: \\(\\frac{3}{8}\\) for mix A and \\(\\frac{4}{11}\\) for mix B. Over a common denominator of 88 these are \\(\\frac{33}{88}\\) and \\(\\frac{32}{88}\\), so mix A is stronger and \\(\\frac{3}{8}\\) of it is squash."
      },
      {
        "text": "B, \\(\\frac{4}{11}\\)",
        "correct": false,
        "feedback": "Chose mix B because it has more squash (4 parts compared with 3) without looking at how much water there is. Compare the fraction of the whole."
      },
      {
        "text": "B, \\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Chose mix B for having more squash parts and wrote the ratio \\(4:7\\) as the fraction \\(\\frac{4}{7}\\). Both steps are wrong."
      }
    ],
    "backward": "Comparing fractions, Ch8.",
    "forward": "Writing a part as a fraction of a whole is the basis of relative frequency, Ch12."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "Sam pays £4.50 for 9 sweets. Tia buys sweets at the same price each and pays £2 more than Sam. How many sweets does Tia buy?",
    "options": [
      {
        "text": "4",
        "correct": false,
        "feedback": "Found how many sweets the extra £2 buys (£2 ÷ £0.50 = 4) and stopped. Tia also buys the 9 sweets that Sam buys."
      },
      {
        "text": "11",
        "correct": false,
        "feedback": "Added the extra £2 to the 9 sweets as if each extra pound bought one more item (\\(9+2 = 11\\)). Each sweet costs £0.50."
      },
      {
        "text": "22",
        "correct": false,
        "feedback": "Added Sam's 9 sweets to Tia's 13 (\\(9+13 = 22\\)). The 13 already includes the 9."
      },
      {
        "text": "13",
        "correct": true,
        "feedback": "Correct. 9 sweets cost £4.50, so one costs £4.50 ÷ 9 = £0.50. Tia pays £4.50+£2 = £6.50, which buys £6.50 ÷ £0.50 = 13 sweets."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "When two quantities are in direct proportion, a difference in one gives a difference in the other."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Machine A makes 40 bottles per hour and machine B makes 60 bottles per hour. A job of 1500 bottles is shared between them in the ratio of their speeds, so that they finish at the same time. How many bottles does machine B make?",
    "options": [
      {
        "text": "600",
        "correct": false,
        "feedback": "Gave machine A's share (2 parts: \\(2 \\times 300 = 600\\)). The question asks for machine B."
      },
      {
        "text": "900",
        "correct": true,
        "feedback": "Correct. The speeds \\(40:60\\) simplify (\\(\\div 20\\)) to \\(2:3\\). There are \\(2+3 = 5\\) parts, so one part is \\(1500 \\div 5 = 300\\) and machine B makes \\(3 \\times 300 = 900\\) bottles."
      },
      {
        "text": "25",
        "correct": false,
        "feedback": "Divided the job by machine B's speed (\\(1500 \\div 60 = 25\\)). That is the number of hours machine B would take to do the whole job alone, not its share."
      },
      {
        "text": "300",
        "correct": false,
        "feedback": "Found the value of one part (300) and stopped. Machine B has 3 parts."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Sharing a task in proportion to rates is how work and costs are divided fairly."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "12 builders can build a wall in 20 days. After 5 days, 2 of the builders leave. How many more days do the remaining builders need to finish the job, all working at the same rate?",
    "options": [
      {
        "text": "15",
        "correct": false,
        "feedback": "Divided the 180 builder-days still to do by the original 12 builders (\\(180 \\div 12 = 15\\)). 2 of them have left."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Found how long the whole job would take 10 builders (\\(240 \\div 10 = 24\\)) and did not allow for the 5 days already worked."
      },
      {
        "text": "29",
        "correct": false,
        "feedback": "Added the 5 days already worked to the 24 days the whole job would take 10 builders (\\(5+24 = 29\\)). The work already done must be taken off first."
      },
      {
        "text": "18",
        "correct": true,
        "feedback": "Correct. The job is \\(12 \\times 20 = 240\\) builder-days (one builder working for one day is 1 builder-day). In 5 days 12 builders do \\(12 \\times 5 = 60\\) builder-days, leaving \\(240-60 = 180\\). \\(12-2 = 10\\) builders remain, so they need \\(180 \\div 10 = 18\\) more days."
      }
    ],
    "backward": "Solving one-step equations, Ch4.",
    "forward": "Tracking how much work is left and then how fast it is done is the pattern in rate problems."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of red to blue counters in a bag is \\(3:5\\). 12 more red counters are added, and now there are equal numbers of red and blue counters. How many blue counters are in the bag?",
    "options": [
      {
        "text": "30",
        "correct": true,
        "feedback": "Correct. The blue have \\(5-3 = 2\\) more parts than the red, and 12 more red close that gap, so 2 parts = 12 and one part is \\(12 \\div 2 = 6\\). There are \\(5 \\times 6 = 30\\) blue counters."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Found the number of red counters at the start (\\(3 \\times 6 = 18\\)), not the number of blue."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Gave the number of red counters added (12). That is the gap, which equals 2 parts, not the number of blue."
      },
      {
        "text": "48",
        "correct": false,
        "feedback": "Found the total at the start (\\(8 \\times 6 = 48\\)) instead of the number of blue."
      }
    ],
    "backward": "Solving one-step equations, Ch4, and subtracting fractions, Ch8.",
    "forward": "Turning a change in a quantity into a number of parts is used when a ratio is updated, as in later mixture problems."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A smoothie for 4 people uses 3 cups of milk and 2 cups of yogurt. Mo has 18 cups of milk and 7 cups of yogurt. What is the largest number of people that Mo can serve?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Used the milk only, which would serve 24 people. The yogurt runs out first, at 14 people."
      },
      {
        "text": "3.5",
        "correct": false,
        "feedback": "Found the number of lots (3.5) and stopped. Each lot serves 4 people."
      },
      {
        "text": "14",
        "correct": true,
        "feedback": "Correct. One lot of smoothie for 4 people uses 3 cups of milk and 2 cups of yogurt. 18 cups of milk makes \\(18 \\div 3 = 6\\) lots and 7 cups of yogurt makes \\(7 \\div 2 = 3.5\\). Every serving needs both, so only 3.5 lots can be made, which is \\(3.5 \\times 4 = 14\\) people."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Added the milk and yogurt together (25 cups) and divided by the 5 cups in one lot (5 lots, so 20 people). The ingredients cannot be swapped for each other, so the one that runs out first sets the limit."
      }
    ],
    "backward": "Dividing decimals, Ch3, and comparing numbers, Ch1.",
    "forward": "Finding the limiting quantity is used in recipes, mixtures and manufacturing problems."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Three friends aged 12, 16 and 20 share a prize of £144 in the ratio of their ages. How much more does the oldest get than the youngest?",
    "options": [
      {
        "text": "£24",
        "correct": true,
        "feedback": "Correct. The ratio of the ages \\(12:16:20\\) simplifies (\\(\\div 4\\)) to \\(3:4:5\\). There are \\(3+4+5 = 12\\) parts, so one part is £144 ÷ 12 = £12. The oldest has \\(5-3 = 2\\) more parts than the youngest, so gets 2 × £12 = £24 more."
      },
      {
        "text": "£60",
        "correct": false,
        "feedback": "Gave the oldest friend's share (5 parts: 5 × £12 = £60). The question asks how much more the oldest gets than the youngest."
      },
      {
        "text": "£2",
        "correct": false,
        "feedback": "Gave the difference in parts (\\(5-3 = 2\\)) as pounds. Each part is worth £12."
      },
      {
        "text": "£8",
        "correct": false,
        "feedback": "Gave the difference in ages (\\(20-12 = 8\\)) as pounds. The difference in shares depends on the value of one part."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Sharing in the ratio of a measured quantity is used for dividing costs and profits."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "A copier copies 60 sheets in 12 minutes. How long, in minutes, would 4 such copiers take to copy 40 sheets, all working at the same rate?",
    "options": [
      {
        "text": "8",
        "correct": false,
        "feedback": "Scaled the time by the pages only (\\(40 \\div 60 = 0.6667\\), so \\(12 \\times 0.6667 = 8\\)) and ignored that 4 copiers share the work."
      },
      {
        "text": "2",
        "correct": true,
        "feedback": "Correct. One copier copies \\(60 \\div 12 = 5\\) sheets per minute, so 4 copiers copy \\(4 \\times 5 = 20\\) sheets per minute. 40 sheets take \\(40 \\div 20 = 2\\) minutes."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Divided the 12 minutes by the 4 copiers (\\(12 \\div 4 = 3\\)) and ignored that there are 40 sheets to do, not 60."
      },
      {
        "text": "32",
        "correct": false,
        "feedback": "Scaled the time by the pages (8 minutes) and then multiplied by the 4 copiers instead of dividing (\\(8 \\times 4 = 32\\))."
      }
    ],
    "backward": "Dividing a quantity by a rate, Ch3.",
    "forward": "When both the amount of work and the number of workers change, each is a separate proportion."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "A job would take one worker 120 days to do alone. The job is split between team X and team Y in the ratio \\(2:3\\) (X : Y). Team X has 6 workers. How many days does team X need to finish its part, all working at the same rate?",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Used team Y's part of the work (72 worker-days) instead of team X's: \\(72 \\div 6 = 12\\)."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Divided the whole job (120 worker-days) by 6 workers (20). Team X does only 2 of the 5 parts."
      },
      {
        "text": "8",
        "correct": true,
        "feedback": "Correct. The whole job is 120 worker-days (one worker working for one day is 1 worker-day). The ratio \\(2:3\\) has \\(2+3 = 5\\) parts, so one part is \\(120 \\div 5 = 24\\) worker-days and team X's part is \\(2 \\times 24 = 48\\) worker-days. With 6 workers, team X needs \\(48 \\div 6 = 8\\) days."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Divided team X's 48 worker-days by its ratio term 2 (\\(48 \\div 2 = 24\\)) instead of by its 6 workers."
      }
    ],
    "backward": "Dividing a total into equal parts, Ch8, and equations, Ch4.",
    "forward": "Splitting work by a ratio and then finding the time is the pattern behind project planning."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Gear A has 40 teeth and turns 30 times a minute. It drives gear B, which has 24 teeth. How many complete turns does gear B make in 6 minutes?",
    "options": [
      {
        "text": "108",
        "correct": false,
        "feedback": "Treated it as direct proportion: \\(30 \\times 24 \\div 40 = 18\\) turns per minute, so 108 in 6 minutes. A smaller gear turns faster, not slower."
      },
      {
        "text": "180",
        "correct": false,
        "feedback": "Assumed gear B turns at the same rate as gear A (30 turns per minute), giving \\(30 \\times 6 = 180\\). The gears have different numbers of teeth."
      },
      {
        "text": "276",
        "correct": false,
        "feedback": "Used addition: 16 fewer teeth, so 16 more turns per minute (46), giving 276 in 6 minutes. Inverse proportion works by dividing a fixed product."
      },
      {
        "text": "300",
        "correct": true,
        "feedback": "Correct. Each minute gear A moves \\(40 \\times 30 = 1200\\) teeth, and gear B moves the same number of teeth. Gear B has 24 teeth, so it turns \\(1200 \\div 24 = 50\\) times per minute, and \\(6 \\times 50 = 300\\) turns in 6 minutes."
      }
    ],
    "backward": "Multiplying and dividing whole numbers, Ch1.",
    "forward": "A fixed product shared between two linked quantities is the idea behind gear and pulley ratios in science."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "A bag has red, blue and green counters in the ratio \\(2:3:5\\). There are 18 more green counters than red counters. Each red counter has a mass of 5 g, each blue counter 4 g and each green counter 3 g. What is the total mass of the counters?",
    "options": [
      {
        "text": "60 g",
        "correct": false,
        "feedback": "Found the number of counters (60) and gave that as the mass. The question asks for the total mass in grams."
      },
      {
        "text": "222 g",
        "correct": true,
        "feedback": "Correct. Green has \\(5-2 = 3\\) more parts than red, and that is 18, so one part is \\(18 \\div 3 = 6\\) counters. There are \\(2 \\times 6 = 12\\) red, \\(3 \\times 6 = 18\\) blue and \\(5 \\times 6 = 30\\) green counters. Masses: \\(12 \\times 5 = 60\\) g, \\(18 \\times 4 = 72\\) g and \\(30 \\times 3 = 90\\) g, so the total is 60 g + 72 g + 90 g = 222 g."
      },
      {
        "text": "37 g",
        "correct": false,
        "feedback": "Found the mass of one part (\\(2 \\times 5+3 \\times 4+5 \\times 3 = 37\\)) and stopped. There are 6 such parts."
      },
      {
        "text": "90 g",
        "correct": false,
        "feedback": "Found the mass of the green counters only (\\(30 \\times 3 = 90\\) g) and left out the red and blue."
      }
    ],
    "backward": "Solving one-step equations, Ch4.",
    "forward": "Using a known difference to find counts, then combining measurements, is the pattern in mixed ratio and measure problems."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "6 painters can paint a building in 12 days. Each one is paid £55 for each day worked. What is the total labour cost if 9 painters do the job instead, all working at the same rate?",
    "options": [
      {
        "text": "£5940",
        "correct": false,
        "feedback": "Used the original 12 days for 9 painters: \\(9 \\times 12 = 108\\) painter-days, and 108 × £55 = £5940. With more painters the job takes fewer days."
      },
      {
        "text": "£495",
        "correct": false,
        "feedback": "Found the cost of one day only (9 × £55 = £495). The job takes more than one day."
      },
      {
        "text": "£3960",
        "correct": true,
        "feedback": "Correct. 6 painters for 12 days is \\(6 \\times 12 = 72\\) painter-days (one painter working for one day is 1 painter-day). 9 painters take \\(72 \\div 9 = 8\\) days, which is \\(9 \\times 8 = 72\\) painter-days again. Each painter-day costs £55, so the cost is 72 × £55 = £3960."
      },
      {
        "text": "£8910",
        "correct": false,
        "feedback": "Treated the days as direct proportion: 9 is 1.5 times as many as 6, so \\(1.5 \\times 12 = 18\\) days, which is 162 painter-days, and 162 × £55 = £8910."
      }
    ],
    "backward": "Multiplying whole numbers, Ch1, and equations, Ch4.",
    "forward": "Noticing which quantity stays fixed is the key move in the mixed proportion problems later in this course."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "The ratio of tea to milk is \\(3:4\\). The ratio of milk to sugar is \\(5:2\\). Write the ratio tea:milk:sugar.",
    "options": [
      {
        "text": "\\(3:4:2\\)",
        "correct": false,
        "feedback": "Joined the ratios without matching milk (\\(3:4:2\\)): in the first ratio milk is 4, but in the second it is 5."
      },
      {
        "text": "\\(3:5:2\\)",
        "correct": false,
        "feedback": "Matched milk by using 5 (\\(3:5:2\\)) but did not scale tea to match (3 should become 15)."
      },
      {
        "text": "\\(15:20:8\\)",
        "correct": true,
        "feedback": "Correct. The number for milk is 4 in the first ratio but 5 in the second, so the two ratios do not match. Multiply the first ratio by 5 so that milk is 20: \\(3:4 = 15:20\\). Multiply the second ratio by 4 so that milk is 20: \\(5:2 = 20:8\\). Then tea:milk:sugar = \\(15:20:8\\)."
      },
      {
        "text": "\\(15:20:10\\)",
        "correct": false,
        "feedback": "Multiplied both ratios by 5, the factor used for the first one (\\(15:20:10\\)). The second ratio needs to be multiplied by 4 to make milk = 20, so sugar is \\(2 \\times 4 = 8\\)."
      }
    ],
    "backward": "Equivalent fractions, Ch8.",
    "forward": "Combining ratios through a common term is used for scale factors and for mixtures with three parts, Ch13."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Rice A costs £3.60 for 1.5 kg. Rice B costs £6.30 for 3 kg. Write the ratio of the price per kg of A to the price per kg of B in simplest form.",
    "options": [
      {
        "text": "\\(7:8\\)",
        "correct": false,
        "feedback": "Found both prices per kg correctly but wrote the ratio the wrong way round (\\(7:8\\), which is B to A)."
      },
      {
        "text": "\\(240:210\\)",
        "correct": false,
        "feedback": "Cleared the decimals (\\(240:210\\)) but did not simplify. Both terms are still divisible by 30."
      },
      {
        "text": "\\(8:7\\)",
        "correct": true,
        "feedback": "Correct. Rice A costs £3.60 ÷ 1.5 = £2.40 per kg and rice B costs £6.30 ÷ 3 = £2.10 per kg, so the ratio is \\(2.4:2.1\\). Multiply both terms by 100 to clear the decimals (\\(240:210\\)), then divide both by 30 to get \\(8:7\\)."
      },
      {
        "text": "\\(4:7\\)",
        "correct": false,
        "feedback": "Wrote the ratio of the total prices (£3.60:£6.30 = \\(4:7\\)) without dividing by the weights. The question asks for the price per kg."
      }
    ],
    "backward": "Dividing decimals, Ch3, and simplifying fractions, Ch8.",
    "forward": "Comparing unit rates is how exchange rates and scales are compared, Ch13."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "A 4 kg bag of sugar costs £7. Ravi buys 6 kg of sugar. The cost is shared between Ravi and Sana in the ratio \\(3:2\\) (Ravi : Sana). How much does Sana pay?",
    "options": [
      {
        "text": "£4.20",
        "correct": true,
        "feedback": "Correct. 4 kg costs £7, so 1 kg costs £7 ÷ 4 = £1.75, and 6 kg costs 6 × £1.75 = £10.50. The ratio \\(3:2\\) has \\(3+2 = 5\\) parts, so one part is £10.50 ÷ 5 = £2.10 and Sana pays 2 × £2.10 = £4.20."
      },
      {
        "text": "£6.30",
        "correct": false,
        "feedback": "Gave Ravi's share (3 parts: 3 × £2.10 = £6.30). The question asks for Sana's share, which is 2 parts."
      },
      {
        "text": "£5.25",
        "correct": false,
        "feedback": "Split the £10.50 equally (£10.50 ÷ 2 = £5.25 each). A ratio of \\(3:2\\) is not an equal split."
      },
      {
        "text": "£10.50",
        "correct": false,
        "feedback": "Found the total cost of 6 kg (£10.50) and stopped. The question asks for Sana's share."
      }
    ],
    "backward": "Dividing decimals, Ch3, and dividing a total into equal parts, Ch8.",
    "forward": "Working out a cost and then splitting it is the pattern behind sharing bills and budgets."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "Pipe A fills a tank in 3 hours. Pipe B fills the same tank in 6 hours. Both pipes work together at their own rates. How long do they take to fill the tank?",
    "options": [
      {
        "text": "4.5 hours",
        "correct": false,
        "feedback": "Averaged the two times ((\\(3+6\\))÷\\(2 = 4.5\\)). Working together must be faster than either pipe alone, so the time must be less than 3 hours."
      },
      {
        "text": "9 hours",
        "correct": false,
        "feedback": "Added the two times (\\(3+6 = 9\\)). Working together must be faster than either pipe alone, not slower."
      },
      {
        "text": "3 hours",
        "correct": false,
        "feedback": "Gave the time of the faster pipe alone (3 hours), ignoring the other pipe. Two pipes together must take less than 3 hours."
      },
      {
        "text": "2 hours",
        "correct": true,
        "feedback": "Correct. In 1 hour pipe A fills \\(\\frac{1}{3}\\) of the tank and pipe B fills \\(\\frac{1}{6}\\). Over a common denominator of 6 that is \\(\\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6}\\) of the tank each hour, so the tank takes \\(6 \\div 3 = 2\\) hours."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "Adding rates is the idea behind combined-work and flow problems later in this course."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "Some money is shared between Tim and Uma in the ratio \\(3:7\\). Uma gets £48 more than Tim. Uma then shares her money with her brother in the ratio \\(1:3\\) (Uma : brother). How much does her brother get?",
    "options": [
      {
        "text": "£21",
        "correct": false,
        "feedback": "Gave Uma's own share (1 part: 1 × £21 = £21). The brother gets 3 parts of Uma's money."
      },
      {
        "text": "£63",
        "correct": true,
        "feedback": "Correct. Uma has \\(7-3 = 4\\) more parts than Tim, and that is £48, so one part is £48 ÷ 4 = £12 and Uma has 7 × £12 = £84. The ratio \\(1:3\\) has \\(1+3 = 4\\) parts, so one part is £84 ÷ 4 = £21 and the brother gets 3 × £21 = £63."
      },
      {
        "text": "£12",
        "correct": false,
        "feedback": "Found the value of one part of the first sharing (£48 ÷ 4 = £12) and stopped. The question asks how much the brother gets."
      },
      {
        "text": "£36",
        "correct": false,
        "feedback": "Shared the £48 difference in the ratio \\(1:3\\) instead of Uma's £84: £48 ÷ 4 = £12 per part, so 3 × £12 = £36."
      }
    ],
    "backward": "Dividing a total into equal parts, Ch8.",
    "forward": "The same value-of-one-part idea is used when a probability is a part of a total, Ch12."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed ratio and proportion",
    "question": "150 g of flour makes 6 scones. The recipe uses flour, sugar and butter in the ratio \\(5:2:3\\). How much butter is needed to make 15 scones?",
    "options": [
      {
        "text": "225 g",
        "correct": true,
        "feedback": "Correct. 15 scones is \\(15 \\div 6 = 2.5\\) times as many as 6, so the flour is \\(2.5 \\times 150 = 375\\) g. The flour is 5 parts of the ratio \\(5:2:3\\), so one part is \\(375 \\div 5 = 75\\) g and the butter is \\(3 \\times 75 = 225\\) g."
      },
      {
        "text": "90 g",
        "correct": false,
        "feedback": "Found the butter for 6 scones (90 g) and did not scale it up to 15 scones."
      },
      {
        "text": "375 g",
        "correct": false,
        "feedback": "Found the flour for 15 scones (375 g) and stopped. The question asks for the butter."
      },
      {
        "text": "750 g",
        "correct": false,
        "feedback": "Found the mass of all three ingredients for 15 scones (750 g) instead of just the butter."
      }
    ],
    "backward": "Dividing decimals, Ch3, and equivalent fractions, Ch8.",
    "forward": "Scaling a recipe and then splitting it by a ratio is the pattern behind mixture and cost problems in later chapters."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Simplifying and comparing ratios",
    "question": "Mix A has squash and water in the ratio \\(5:7\\). Mix B has squash and water in the ratio \\(3:4\\). Which mix is stronger (has the greater fraction of squash), and what fraction of that mix is squash?",
    "options": [
      {
        "text": "B, \\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Chose the right mix but wrote the part-to-part ratio \\(3:4\\) as the fraction \\(\\frac{3}{4}\\). The whole is \\(3+4 = 7\\) parts."
      },
      {
        "text": "A, \\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Chose mix A because it has more squash (5 parts compared with 3) without looking at how much water there is. Compare the fraction of the whole."
      },
      {
        "text": "B, \\(\\frac{3}{7}\\)",
        "correct": true,
        "feedback": "Correct. A ratio of squash to water is part to part, so squash is a fraction of the whole: \\(\\frac{5}{12}\\) for mix A and \\(\\frac{3}{7}\\) for mix B. Over a common denominator of 84 these are \\(\\frac{35}{84}\\) and \\(\\frac{36}{84}\\), so mix B is stronger and \\(\\frac{3}{7}\\) of it is squash."
      },
      {
        "text": "A, \\(\\frac{5}{7}\\)",
        "correct": false,
        "feedback": "Chose mix A for having more squash parts and wrote the ratio \\(5:7\\) as the fraction \\(\\frac{5}{7}\\). Both steps are wrong."
      }
    ],
    "backward": "Comparing fractions, Ch8.",
    "forward": "Writing a part as a fraction of a whole is the basis of relative frequency, Ch12."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "Dev pays £3.60 for 6 pencils. Ella buys pencils at the same price each and pays £3 more than Dev. How many pencils does Ella buy?",
    "options": [
      {
        "text": "5",
        "correct": false,
        "feedback": "Found how many pencils the extra £3 buys (£3 ÷ £0.60 = 5) and stopped. Ella also buys the 6 pencils that Dev buys."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Added the extra £3 to the 6 pencils as if each extra pound bought one more item (\\(6+3 = 9\\)). Each pencil costs £0.60."
      },
      {
        "text": "17",
        "correct": false,
        "feedback": "Added Dev's 6 pencils to Ella's 11 (\\(6+11 = 17\\)). The 11 already includes the 6."
      },
      {
        "text": "11",
        "correct": true,
        "feedback": "Correct. 6 pencils cost £3.60, so one costs £3.60 ÷ 6 = £0.60. Ella pays £3.60+£3 = £6.60, which buys £6.60 ÷ £0.60 = 11 pencils."
      }
    ],
    "backward": "Dividing decimals, Ch3.",
    "forward": "When two quantities are in direct proportion, a difference in one gives a difference in the other."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Sharing in a given ratio",
    "question": "Machine A prints 30 pages per hour and machine B prints 50 pages per hour. A job of 1200 pages is shared between them in the ratio of their speeds, so that they finish at the same time. How many pages does machine B print?",
    "options": [
      {
        "text": "450",
        "correct": false,
        "feedback": "Gave machine A's share (3 parts: \\(3 \\times 150 = 450\\)). The question asks for machine B."
      },
      {
        "text": "750",
        "correct": true,
        "feedback": "Correct. The speeds \\(30:50\\) simplify (\\(\\div 10\\)) to \\(3:5\\). There are \\(3+5 = 8\\) parts, so one part is \\(1200 \\div 8 = 150\\) and machine B prints \\(5 \\times 150 = 750\\) pages."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Divided the job by machine B's speed (\\(1200 \\div 50 = 24\\)). That is the number of hours machine B would take to do the whole job alone, not its share."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Found the value of one part (150) and stopped. Machine B has 5 parts."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Sharing a task in proportion to rates is how work and costs are divided fairly."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Inverse proportion",
    "question": "8 gardeners can plant a field in 18 days. After 6 days, 2 of the gardeners leave. How many more days do the remaining gardeners need to finish the job, all working at the same rate?",
    "options": [
      {
        "text": "16",
        "correct": true,
        "feedback": "Correct. The job is \\(8 \\times 18 = 144\\) gardener-days (one gardener working for one day is 1 gardener-day). In 6 days 8 gardeners do \\(8 \\times 6 = 48\\) gardener-days, leaving \\(144-48 = 96\\). \\(8-2 = 6\\) gardeners remain, so they need \\(96 \\div 6 = 16\\) more days."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Divided the 96 gardener-days still to do by the original 8 gardeners (\\(96 \\div 8 = 12\\)). 2 of them have left."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Found how long the whole job would take 6 gardeners (\\(144 \\div 6 = 24\\)) and did not allow for the 6 days already worked."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Added the 6 days already worked to the 24 days the whole job would take 6 gardeners (\\(6+24 = 30\\)). The work already done must be taken off first."
      }
    ],
    "backward": "Solving one-step equations, Ch4.",
    "forward": "Tracking how much work is left and then how fast it is done is the pattern in rate problems."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Ratios from partial information",
    "question": "The ratio of green to yellow beads in a bag is \\(4:7\\). 15 more green beads are added, and now there are equal numbers of green and yellow beads. How many yellow beads are in the bag?",
    "options": [
      {
        "text": "20",
        "correct": false,
        "feedback": "Found the number of green beads at the start (\\(4 \\times 5 = 20\\)), not the number of yellow."
      },
      {
        "text": "15",
        "correct": false,
        "feedback": "Gave the number of green beads added (15). That is the gap, which equals 3 parts, not the number of yellow."
      },
      {
        "text": "55",
        "correct": false,
        "feedback": "Found the total at the start (\\(11 \\times 5 = 55\\)) instead of the number of yellow."
      },
      {
        "text": "35",
        "correct": true,
        "feedback": "Correct. The yellow have \\(7-4 = 3\\) more parts than the green, and 15 more green close that gap, so 3 parts = 15 and one part is \\(15 \\div 3 = 5\\). There are \\(7 \\times 5 = 35\\) yellow beads."
      }
    ],
    "backward": "Solving one-step equations, Ch4, and subtracting fractions, Ch8.",
    "forward": "Turning a change in a quantity into a number of parts is used when a ratio is updated, as in later mixture problems."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Direct proportion",
    "question": "A hot chocolate for 6 people uses 4 spoons of cocoa and 2 spoons of sugar. Eli has 22 spoons of cocoa and 14 spoons of sugar. What is the largest number of people that Eli can serve?",
    "options": [
      {
        "text": "42",
        "correct": false,
        "feedback": "Used the sugar only, which would serve 42 people. The cocoa runs out first, at 33 people."
      },
      {
        "text": "33",
        "correct": true,
        "feedback": "Correct. One lot of hot chocolate for 6 people uses 4 spoons of cocoa and 2 spoons of sugar. 22 spoons of cocoa makes \\(22 \\div 4 = 5.5\\) lots and 14 spoons of sugar makes \\(14 \\div 2 = 7\\). Every serving needs both, so only 5.5 lots can be made, which is \\(5.5 \\times 6 = 33\\) people."
      },
      {
        "text": "5.5",
        "correct": false,
        "feedback": "Found the number of lots (5.5) and stopped. Each lot serves 6 people."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Added the cocoa and sugar together (36 spoons) and divided by the 6 spoons in one lot (6 lots, so 36 people). The ingredients cannot be swapped for each other, so the one that runs out first sets the limit."
      }
    ],
    "backward": "Dividing decimals, Ch3, and comparing numbers, Ch1.",
    "forward": "Finding the limiting quantity is used in recipes, mixtures and manufacturing problems."
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
    title: "Ratio and Proportion — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Synthesis items combining ratios, comparing unit rates, adjusting mixtures, combined work rates, and multi-step proportion problems — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> This section is harder. Most questions need two or more ideas, and the topic is not named for you. Before you calculate, say in a few words what each step is: for example, find the value of one part, then share it; or find the rate, then use it. Look for what stays fixed (the total, the amount of work, the value of one part) and what you are being asked for at the end. Many wrong answers here are correct answers to an earlier step, so check that your answer is what the question asks for.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

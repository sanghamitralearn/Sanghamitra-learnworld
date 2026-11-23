

// seed/mathSeedCh12ProbabilityL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 12
// (Probability), Level 3 — converted from the standalone diagnostic
// JSON ch12-probability-level-3.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh12ProbabilityL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-12-probability";
const CHAPTER_NAME = "Probability";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "C1": "Probability of a single event",
  "C2": "Mutually exclusive events",
  "C3": "Independent events",
  "C4": "Listing outcomes of combined events",
  "C5": "Chance experiments",
  "C6": "Mixed probability problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag holds 9 red, 14 blue and some green counters. There are 36 counters in total. One counter is picked at random. What is the probability that it is red or green?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Counted only the red counters: \\(\\frac{9}{36} = \\frac{1}{4}\\). The green counters count too."
      },
      {
        "text": "\\(\\frac{11}{18}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(36-9-14 = 13\\) green counters. Red or green is \\(9+13 = 22\\) counters, so P = \\(\\frac{22}{36} = \\frac{11}{18}\\)."
      },
      {
        "text": "\\(\\frac{13}{36}\\)",
        "correct": false,
        "feedback": "Found the 13 green counters but counted only those: \\(\\frac{13}{36}\\). The red counters count too."
      },
      {
        "text": "\\(\\frac{23}{36}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red or blue}) = \\frac{9+14}{36} = \\frac{23}{36}\\). The question asks for red or green."
      }
    ],
    "retryHint": "Find how many green counters there are first. Then count the counters that are red or green.",
    "backward": "A part of a whole, and simplifying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter combine counting with adding in the same way."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are added. What is the probability that the total is 3 or 11?",
    "options": [
      {
        "text": "\\(\\frac{1}{324}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{2}{36} \\times \\frac{2}{36} = \\frac{4}{1296} = \\frac{1}{324}\\). A total cannot be 3 and 11 at once; 'or' with events that cannot both happen needs adding."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Used the 11 different totals as the outcomes, with 2 favourable totals (3 and 11): \\(\\frac{2}{11}\\). The 36 pairs of scores are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": false,
        "feedback": "Found only one of the totals: \\(\\frac{2}{36} = \\frac{1}{18}\\). Both a total of 3 and a total of 11 count."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": true,
        "feedback": "Correct. Total 3: (1,2) and (2,1), which is 2 of the 36 outcomes. Total 11: (5,6) and (6,5), which is another 2. The totals cannot both happen, so P = \\(\\frac{2}{36}+\\frac{2}{36} = \\frac{4}{36} = \\frac{1}{9}\\)."
      }
    ],
    "retryHint": "List the pairs for each total and count them. Then decide whether to add or multiply the two probabilities: can both totals happen on the same roll?",
    "backward": "Listing outcomes, and adding probabilities of events that cannot happen together.",
    "forward": "The same two skills combine in tree diagrams later in this chapter."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A café sells ham, cheese, egg and tuna sandwiches. A customer buys exactly one. \\(P(\\text{ham}) = 0.3\\), \\(P(\\text{cheese}) = 0.25\\) and \\(P(\\text{egg}) = 0.2\\). What is the probability that the sandwich is not ham or cheese?",
    "options": [
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{cheese})\\): \\(1-0.25 = 0.75\\). Ham must be left out too."
      },
      {
        "text": "0.55",
        "correct": false,
        "feedback": "Found \\(P(\\text{ham or cheese}) = 0.3+0.25 = 0.55\\). The question asks for NOT ham or cheese."
      },
      {
        "text": "0.45",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{ham or cheese}) = 0.3+0.25 = 0.55\\), so \\(P(\\text{not ham or cheese}) = 1-0.55 = 0.45\\). (Check: \\(P(\\text{tuna}) = 1-0.75 = 0.25\\), and egg or tuna is \\(0.2+0.25 = 0.45\\).)"
      },
      {
        "text": "0.7",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{ham})\\): \\(1-0.3 = 0.7\\). Cheese must be left out too."
      }
    ],
    "retryHint": "Add up the probabilities of the outcomes you want to leave out, then subtract from 1.",
    "backward": "The 'not' rule.",
    "forward": "'neither' probabilities are used for 'at least one' problems later in this chapter."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A spinner landed on blue 18 times in 60 spins. Use the relative frequency as the probability of blue. The spinner is spun twice, and this pair of spins is repeated 400 times. How many of the 400 pairs would you expect to be blue both times?",
    "options": [
      {
        "text": "36",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{blue}) = \\frac{18}{60} = 0.3\\). Both blue: \\(0.3 \\times 0.3 = 0.09\\). Expected number = \\(0.09 \\times 400 = 36\\)."
      },
      {
        "text": "120",
        "correct": false,
        "feedback": "Found the expected number of blues on one spin: \\(0.3 \\times 400 = 120\\). Both spins must be blue, so find \\(0.3 \\times 0.3 = 0.09\\) first."
      },
      {
        "text": "240",
        "correct": false,
        "feedback": "Added \\(0.3+0.3 = 0.6\\) and found \\(0.6 \\times 400 = 240\\). For both spins, multiply the probabilities: \\(0.3 \\times 0.3\\)."
      },
      {
        "text": "360",
        "correct": false,
        "feedback": "Worked out \\(0.3 \\times 0.3\\) as 0.9 (\\(3 \\times 3 = 9\\) with one decimal place) and \\(0.9 \\times 400 = 360\\). Two decimal places give 0.09."
      }
    ],
    "retryHint": "Find the relative frequency of blue first. Then find the probability of two blues, then multiply by 400.",
    "backward": "Relative frequency as a ratio, Ch11, and multiplying decimals.",
    "forward": "Estimated probabilities feed combined-event questions throughout this chapter."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A fair die is rolled three times. What is the probability that none of the three rolls is a 6?",
    "options": [
      {
        "text": "\\(\\frac{25}{36}\\)",
        "correct": false,
        "feedback": "Multiplied only two rolls: \\(\\frac{5}{6} \\times \\frac{5}{6} = \\frac{25}{36}\\). There are three rolls."
      },
      {
        "text": "\\(\\frac{91}{216}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one 6}) = 1-\\frac{125}{216} = \\frac{91}{216}\\). The question asks for none."
      },
      {
        "text": "\\(\\frac{125}{216}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{not 6}) = \\frac{5}{6}\\) on each roll. The rolls are independent, so multiply: \\(\\frac{5}{6} \\times \\frac{5}{6} \\times \\frac{5}{6} = \\frac{125}{216}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{not 6})\\) for a single roll, \\(\\frac{5}{6}\\). All three rolls must be non-6, so multiply three times."
      }
    ],
    "retryHint": "Find the probability that one roll is not a 6, then multiply for the three independent rolls.",
    "backward": "The 'not' rule, and multiplying fractions, Ch8.",
    "forward": "'at least one' problems in this chapter use 1 minus this 'none' probability."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A biased coin lands on heads with probability 0.6. It is flipped three times. What is the probability of exactly two heads?",
    "options": [
      {
        "text": "0.432",
        "correct": true,
        "feedback": "Correct. Each order with two heads and one tail, such as HHT, has probability \\(0.6 \\times 0.6 \\times 0.4 = 0.144\\). There are 3 orders (HHT, HTH, THH) that cannot happen together, so P = \\(3 \\times 0.144 = 0.432\\)."
      },
      {
        "text": "0.648",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least two heads})\\): \\(0.432+0.216 = 0.648\\). 'Exactly two' leaves out the case of three heads."
      },
      {
        "text": "0.144",
        "correct": false,
        "feedback": "Found only one order (HHT): \\(0.6 \\times 0.6 \\times 0.4 = 0.144\\). HTH and THH also give exactly two heads."
      },
      {
        "text": "0.216",
        "correct": false,
        "feedback": "Found the probability of three heads: \\(0.6 \\times 0.6 \\times 0.6 = 0.216\\). The question asks for exactly two heads."
      }
    ],
    "retryHint": "List the orders that give exactly two heads. Find the probability of one order, then count how many orders there are.",
    "backward": "Multiplying decimals, and the 'not' rule.",
    "forward": "Tree diagrams later in this chapter organise exactly this working."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "The probability that a bus is late is 0.15. In 200 journeys, how many on-time journeys would you expect?",
    "options": [
      {
        "text": "30",
        "correct": false,
        "feedback": "Found the expected number of late journeys: \\(0.15 \\times 200 = 30\\). The question asks for on-time journeys."
      },
      {
        "text": "170",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{on time}) = 1-0.15 = 0.85\\), so the expected number is \\(0.85 \\times 200 = 170\\)."
      },
      {
        "text": "185",
        "correct": false,
        "feedback": "Subtracted \\(200-15 = 185\\), treating 0.15 as 15 journeys. \\(0.15 \\times 200 = 30\\) journeys are late, so 170 are on time."
      },
      {
        "text": "199.85",
        "correct": false,
        "feedback": "Subtracted \\(200-0.15 = 199.85\\). The probability 0.15 is a fraction of the journeys: multiply, then subtract from the total."
      }
    ],
    "retryHint": "Find \\(P(\\text{on time})\\) first, then multiply it by the number of journeys.",
    "backward": "The 'not' rule, and finding a percentage of an amount, Ch3.",
    "forward": "Expected numbers are compared with real data in Ch15."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 3-sided spinner numbered 1, 2, 3 is spun twice. What is the probability that the second score is greater than the first?",
    "options": [
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Counted only (1,2), giving \\(\\frac{1}{9}\\). (1,3) and (2,3) also have a greater second score."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Missed (2,3), counting 2 pairs: \\(\\frac{2}{9}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Counted the pairs where the second score is greater or equal, \\(3+3 = 6\\) pairs: \\(\\frac{6}{9} = \\frac{2}{3}\\). Equal pairs such as (2,2) do not count."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3 \\times 3 = 9\\) equally likely pairs. The second score is greater in (1,2), (1,3) and (2,3), which is 3 pairs. P = \\(\\frac{3}{9} = \\frac{1}{3}\\)."
      }
    ],
    "retryHint": "List all 9 pairs of scores, then pick out the pairs where the second score is larger.",
    "backward": "Listing outcomes systematically.",
    "forward": "Shading conditions on a sample space grid is used later in this chapter."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag has 60 counters. 40% of them are red. The rest are blue or green, with twice as many blue as green. One counter is picked at random. What is the probability that it is blue?",
    "options": [
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{green}) = \\frac{12}{60} = \\frac{1}{5}\\) (1 part of the 3 parts of the 36 non-red counters). The question asks for blue."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not red}) = \\frac{36}{60} = \\frac{3}{5}\\). That is blue or green together."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Gave blue as a fraction of the non-red counters, \\(\\frac{24}{36} = \\frac{2}{3}\\). The probability uses all 60 counters."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": true,
        "feedback": "Correct. 40% of \\(60 = 24\\) red counters. The other 36 counters are blue or green in the ratio \\(2:1\\), so blue is \\(\\frac{2}{3}\\) of \\(36 = 24\\). \\(P(\\text{blue}) = \\frac{24}{60} = \\frac{2}{5}\\)."
      }
    ],
    "backward": "Percentages, Ch3, and sharing in a ratio, Ch11.",
    "forward": "Probabilities from ratios and percentages appear in data questions in Ch15."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair 4-sided spinners numbered 1 to 4 are spun and the scores are multiplied. The grid shows every possible product. What is the probability that the product is at least 8?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 296 276\" width=\"296\" height=\"276\"><rect x=\"0\" y=\"0\" width=\"296\" height=\"276\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"59\" font-family=\"sans-serif\" font-size=\"16\" fill=\"#666666\" text-anchor=\"middle\">×</text><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"52\" y=\"164\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"140\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"184\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"228\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"52\" y=\"208\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"96\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"140\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"184\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"228\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">16</text><text x=\"184\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Second spinner</text><text x=\"18\" y=\"164\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 164)\">First spinner</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. The grid has 16 cells. The products that are at least 8 are 8, 8, 9, 12, 12 and 16, which is 6 cells. P = \\(\\frac{6}{16} = \\frac{3}{8}\\)."
      },
      {
        "text": "\\(\\frac{5}{16}\\)",
        "correct": false,
        "feedback": "Counted 5 cells, missing one of the two cells showing 8: \\(\\frac{5}{16}\\). Both \\(2 \\times 4\\) and \\(4 \\times 2\\) give 8."
      },
      {
        "text": "\\(\\frac{1}{16}\\)",
        "correct": false,
        "feedback": "Counted only the cell showing 16, giving \\(\\frac{1}{16}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Read 'at least 8' as 'more than 8', counting only 9, 12, 12, 16 (4 cells): \\(\\frac{4}{16} = \\frac{1}{4}\\). A product of 8 counts too."
      }
    ],
    "backward": "Multiplication tables, and simplifying fractions, Ch8.",
    "forward": "Later in this chapter you shade conditions on bigger grids the same way."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "Events A and B cannot happen at the same time. \\(P(\\text{A}) = 0.35\\) and \\(P(\\text{B}) = 0.4\\). The situation is repeated 200 times. How many times would you expect neither A nor B to happen?",
    "options": [
      {
        "text": "80",
        "correct": false,
        "feedback": "Found the expected number of times B happens: \\(0.4 \\times 200 = 80\\). Neither A nor B is what is left after taking away both events."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Found the expected number of times A or B happens: \\(0.75 \\times 200 = 150\\). The question asks for neither."
      },
      {
        "text": "50",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{A or B}) = 0.35+0.4 = 0.75\\), so \\(P(\\text{neither}) = 1-0.75 = 0.25\\). Expected number = \\(0.25 \\times 200 = 50\\)."
      },
      {
        "text": "70",
        "correct": false,
        "feedback": "Found the expected number of times A happens: \\(0.35 \\times 200 = 70\\). Neither A nor B is what is left after taking away both events."
      }
    ],
    "backward": "The addition rule for events that cannot happen together.",
    "forward": "Expected numbers are compared with real data in Ch15."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A biased coin lands on heads with probability 0.7. It is flipped twice, and this pair of flips is repeated 300 times. How many of the 300 pairs would you expect to give two heads?",
    "options": [
      {
        "text": "210",
        "correct": false,
        "feedback": "Found the expected number of heads on a single flip: \\(0.7 \\times 300 = 210\\). Both flips must be heads: use \\(0.7 \\times 0.7 = 0.49\\)."
      },
      {
        "text": "147",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{two heads}) = 0.7 \\times 0.7 = 0.49\\). Expected number = \\(0.49 \\times 300 = 147\\)."
      },
      {
        "text": "420",
        "correct": false,
        "feedback": "Added \\(0.7+0.7 = 1.4\\) and found \\(1.4 \\times 300 = 420\\). For both flips, multiply the probabilities."
      },
      {
        "text": "63",
        "correct": false,
        "feedback": "Found heads then tails: \\(0.7 \\times 0.3 = 0.21\\), and \\(0.21 \\times 300 = 63\\). Two heads needs heads then heads: \\(0.7 \\times 0.7\\)."
      }
    ],
    "backward": "Multiplying decimals, and finding a percentage of an amount, Ch3.",
    "forward": "Expected numbers are compared with real data in Ch15."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Each of three independent bulbs fails within a year with probability 0.1. What is the probability that at least one of the three bulbs fails?",
    "options": [
      {
        "text": "0.271",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{a bulb lasts}) = 0.9\\), so \\(P(\\text{none fail}) = 0.9 \\times 0.9 \\times 0.9 = 0.729\\). \\(P(\\text{at least one fails}) = 1-0.729 = 0.271\\)."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Added \\(0.1+0.1+0.1 = 0.3\\). Failures can overlap, so adding overcounts; use 1 minus the probability that none fail."
      },
      {
        "text": "0.001",
        "correct": false,
        "feedback": "Found \\(P(\\text{all three fail}) = 0.1 \\times 0.1 \\times 0.1 = 0.001\\). At least one includes cases where only one or two fail."
      },
      {
        "text": "0.729",
        "correct": false,
        "feedback": "Found \\(P(\\text{none fail}) = 0.729\\) and stopped. 'At least one' is the opposite of 'none': \\(1-0.729\\)."
      }
    ],
    "backward": "The 'not' rule, and multiplying decimals.",
    "forward": "'at least one' is the quick route in tree diagram problems later in this chapter."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "The probability of rain on Saturday is 0.3 and on Sunday is 0.3, independently. The tree diagram shows the possible weather on the two days. What is the probability that it rains on exactly one of the two days?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 372\" width=\"580\" height=\"372\"><rect x=\"0\" y=\"0\" width=\"580\" height=\"372\" fill=\"#ffffff\"/><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"94\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"132.42\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.3</text><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"278\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"247.58\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.7</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"54\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"65.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.3</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"134\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"130.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.7</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"238\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"249.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.3</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"318\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"314.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.7</text><circle cx=\"56\" cy=\"186\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"236\" cy=\"94\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"84\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">Rain</text><circle cx=\"236\" cy=\"278\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"298\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">Dry</text><circle cx=\"420\" cy=\"54\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Rain-Rain</text><circle cx=\"420\" cy=\"134\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"139\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Rain-Dry</text><circle cx=\"420\" cy=\"238\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"243\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Dry-Rain</text><circle cx=\"420\" cy=\"318\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Dry-Dry</text><text x=\"236\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Saturday</text><text x=\"420\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Sunday</text></svg></div>",
    "options": [
      {
        "text": "0.51",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one wet day})\\): \\(0.42+0.09 = 0.51\\). 'Exactly one' leaves out rain on both days."
      },
      {
        "text": "0.42",
        "correct": true,
        "feedback": "Correct. Rain then dry: \\(0.3 \\times 0.7 = 0.21\\). Dry then rain: \\(0.7 \\times 0.3 = 0.21\\). These paths cannot both happen, so add: \\(0.21+0.21 = 0.42\\)."
      },
      {
        "text": "0.21",
        "correct": false,
        "feedback": "Found only one path (rain then dry): \\(0.3 \\times 0.7 = 0.21\\). Dry then rain also gives exactly one wet day."
      },
      {
        "text": "0.09",
        "correct": false,
        "feedback": "Found the path rain then rain: \\(0.3 \\times 0.3 = 0.09\\). That is rain on both days."
      }
    ],
    "backward": "Multiplying along branches and adding across paths.",
    "forward": "The same two steps solve every tree diagram problem, including three-stage ones."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A card is picked at random from cards numbered 1 to 20. What is the probability that the number is neither a multiple of 3 nor a multiple of 5?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Added \\(6+4 = 10\\) without noticing that 15 is in both lists, so thought 10 numbers were multiples: \\(\\frac{10}{20} = \\frac{1}{2}\\). The number 15 must be counted once."
      },
      {
        "text": "\\(\\frac{9}{20}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{multiple of 3 or 5}) = \\frac{9}{20}\\). The question asks for neither."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{multiple of 3}) = \\frac{6}{20} = \\frac{3}{10}\\). The question asks for neither a multiple of 3 nor of 5."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": true,
        "feedback": "Correct. Multiples of 3: 3, 6, 9, 12, 15, 18 (6 numbers). Multiples of 5: 5, 10, 15, 20 (4 numbers). 15 is in both lists, so \\(6+4-1 = 9\\) numbers are multiples of 3 or 5. Neither: \\(20-9 = 11\\), so P = \\(\\frac{11}{20}\\)."
      }
    ],
    "backward": "Multiples, and listing carefully.",
    "forward": "Noticing overlapping events matters before adding probabilities later in this chapter."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled. What is the probability that the two scores differ by exactly 2?",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Used the 6 possible differences (0 to 5) as the outcomes, giving \\(\\frac{1}{6}\\). The 36 pairs are equally likely; the differences are not."
      },
      {
        "text": "\\(\\frac{5}{18}\\)",
        "correct": false,
        "feedback": "Counted the pairs that differ by exactly 1 instead: \\(\\frac{10}{36} = \\frac{5}{18}\\). The question asks for a difference of 2."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": true,
        "feedback": "Correct. The pairs are (1,3), (3,1), (2,4), (4,2), (3,5), (5,3), (4,6), (6,4), which is 8 of the 36 outcomes. P = \\(\\frac{8}{36} = \\frac{2}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Counted each pair once, (1,3), (2,4), (3,5), (4,6): \\(\\frac{4}{36} = \\frac{1}{9}\\). The reversed pairs such as (3,1) are different outcomes."
      }
    ],
    "backward": "Listing outcomes systematically.",
    "forward": "Sample space grids later in this chapter make this kind of count easier."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A spinner lands on A, B, C or D. \\(P(\\text{A}) = x\\), \\(P(\\text{B}) = 2x\\), \\(P(\\text{C}) = 3x\\) and \\(P(\\text{D}) = 0.4\\). What is the probability that it lands on C or D?",
    "options": [
      {
        "text": "0.5",
        "correct": false,
        "feedback": "Used \\(x = 0.1\\) for C: \\(0.1+0.4 = 0.5\\). \\(P(\\text{C})\\) is \\(3x = 0.3\\), not \\(x\\)."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found \\(P(\\text{C}) = 0.3\\) and stopped. D counts too: add 0.4."
      },
      {
        "text": "0.7",
        "correct": true,
        "feedback": "Correct. The probabilities add up to 1: \\(x+2x+3x+0.4 = 1\\), so \\(6x = 0.6\\) and \\(x = 0.1\\). \\(P(\\text{C}) = 3x = 0.3\\), so \\(P(\\text{C or D}) = 0.3+0.4 = 0.7\\)."
      },
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Found \\(6x = 0.6\\) and used it as \\(P(\\text{C or D})\\). 0.6 is the total of A, B and C together."
      }
    ],
    "backward": "Forming and solving equations, Ch4.",
    "forward": "Unknown branch probabilities in tree diagrams are found the same way."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A drawing pin landed point up 24 times in 60 drops. Use this relative frequency as the probability that it lands point up. The pin is dropped twice, and this pair of drops is repeated 500 times. How many of the 500 pairs would you expect to have exactly one point-up landing?",
    "options": [
      {
        "text": "80",
        "correct": false,
        "feedback": "Found the expected number with both drops point up: \\(0.4 \\times 0.4 = 0.16\\), and \\(0.16 \\times 500 = 80\\). The question asks for exactly one."
      },
      {
        "text": "180",
        "correct": false,
        "feedback": "Found the expected number with both drops point down: \\(0.6 \\times 0.6 = 0.36\\), and \\(0.36 \\times 500 = 180\\). The question asks for exactly one."
      },
      {
        "text": "200",
        "correct": false,
        "feedback": "Found the expected number of point-up landings on one drop: \\(0.4 \\times 500 = 200\\). For two drops, exactly one up can happen in two orders."
      },
      {
        "text": "240",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{up}) = \\frac{24}{60} = 0.4\\) and \\(P(\\text{down}) = 0.6\\). Up then down: \\(0.4 \\times 0.6 = 0.24\\). Down then up: \\(0.6 \\times 0.4 = 0.24\\). Exactly one: \\(0.24+0.24 = 0.48\\). Expected number = \\(0.48 \\times 500 = 240\\)."
      }
    ],
    "backward": "Relative frequency as a decimal, Ch11.",
    "forward": "Interpreting estimates like this is part of Ch15."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Event A has probability 0.6 and event B has probability 0.5. The events are independent. What is the probability that A or B happens (or both)?",
    "options": [
      {
        "text": "0.2",
        "correct": false,
        "feedback": "Found \\(P(\\text{neither}) = 0.4 \\times 0.5 = 0.2\\) and stopped. 'A or B' is the opposite of neither: \\(1-0.2\\)."
      },
      {
        "text": "0.8",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{neither}) = 0.4 \\times 0.5 = 0.2\\), so \\(P(\\text{A or B}) = 1-0.2 = 0.8\\)."
      },
      {
        "text": "0.1",
        "correct": false,
        "feedback": "Subtracted \\(0.6-0.5 = 0.1\\). For independent events that can happen together, find \\(P(\\text{neither})\\) and subtract it from 1."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found \\(P(\\text{both}) = 0.6 \\times 0.5 = 0.3\\). The question asks for at least one of them."
      }
    ],
    "backward": "The 'not' rule and multiplying decimals.",
    "forward": "'at least one' problems in this chapter use the same route."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A bag has 3 red and 2 blue counters. A counter is picked at random, put back, and another is picked. The tree diagram shows the possible results. What is the probability that the two counters are different colours?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 372\" width=\"580\" height=\"372\"><rect x=\"0\" y=\"0\" width=\"580\" height=\"372\" fill=\"#ffffff\"/><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"94\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"132.42\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">3/5</text><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"278\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"247.58\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">2/5</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"54\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"65.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">3/5</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"134\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"130.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">2/5</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"238\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"249.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">3/5</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"318\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"314.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">2/5</text><circle cx=\"56\" cy=\"186\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"236\" cy=\"94\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"84\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">R</text><circle cx=\"236\" cy=\"278\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"298\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">B</text><circle cx=\"420\" cy=\"54\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">RR</text><circle cx=\"420\" cy=\"134\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"139\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">RB</text><circle cx=\"420\" cy=\"238\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"243\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">BR</text><circle cx=\"420\" cy=\"318\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">BB</text><text x=\"236\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">First pick</text><text x=\"420\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Second pick</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{12}{25}\\)",
        "correct": true,
        "feedback": "Correct. Red then blue: \\(\\frac{3}{5} \\times \\frac{2}{5} = \\frac{6}{25}\\). Blue then red: \\(\\frac{2}{5} \\times \\frac{3}{5} = \\frac{6}{25}\\). These paths cannot both happen, so add: \\(\\frac{6}{25}+\\frac{6}{25} = \\frac{12}{25}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Assumed 'same' and 'different' are equally likely, \\(\\frac{1}{2}\\). Follow the branches: the counters are not equally split between the colours."
      },
      {
        "text": "\\(\\frac{6}{25}\\)",
        "correct": false,
        "feedback": "Found only one order (red then blue): \\(\\frac{6}{25}\\). Blue then red also gives different colours."
      },
      {
        "text": "\\(\\frac{13}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{same colour})\\): \\(\\frac{3}{5} \\times \\frac{3}{5}+\\frac{2}{5} \\times \\frac{2}{5} = \\frac{9}{25}+\\frac{4}{25} = \\frac{13}{25}\\). The question asks for different colours."
      }
    ],
    "backward": "Multiplying fractions, Ch8.",
    "forward": "Tree diagrams with unequal branches appear throughout this chapter."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "In a class of 25 students, 40% walk to school, 8 cycle and the rest come by bus. One student is chosen at random. What is the probability that the student comes by bus?",
    "options": [
      {
        "text": "\\(\\frac{18}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not bus}) = \\frac{10+8}{25} = \\frac{18}{25}\\). The question asks for the bus."
      },
      {
        "text": "\\(\\frac{7}{25}\\)",
        "correct": true,
        "feedback": "Correct. 40% of \\(25 = 10\\) students walk. Walkers and cyclists make \\(10+8 = 18\\), so \\(25-18 = 7\\) come by bus. \\(P(\\text{bus}) = \\frac{7}{25}\\)."
      },
      {
        "text": "\\(\\frac{7}{18}\\)",
        "correct": false,
        "feedback": "Compared the 7 bus students with the 18 who walk or cycle: \\(\\frac{7}{18}\\). The total is all 25 students."
      },
      {
        "text": "\\(\\frac{8}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{cycle}) = \\frac{8}{25}\\). The question asks for the bus."
      }
    ],
    "backward": "Percentages of an amount, Ch3.",
    "forward": "Probabilities from frequency tables are used in Ch15."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped and a fair die is rolled. What is the probability of heads or a 6?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Counted only H6 (heads and a 6): \\(\\frac{1}{12}\\). 'Or' counts every outcome in either event."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{heads}) = \\frac{1}{2}\\) only. T6 has a 6 and counts too."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": true,
        "feedback": "Correct. The 12 outcomes are H1 to H6 and T1 to T6. Heads gives 6 outcomes and T6 adds 1 more (H6 is already counted), so 7 outcomes. P = \\(\\frac{7}{12}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{2}+\\frac{1}{6} = \\frac{2}{3}\\). H6 is in both events, so adding counts it twice."
      }
    ],
    "backward": "Listing outcomes.",
    "forward": "Noticing overlap is why the simple addition rule needs events that cannot both happen."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A bag has red, blue and green counters. \\(P(\\text{red or blue}) = 0.7\\) and \\(P(\\text{blue or green}) = 0.8\\). What is the probability that a counter is blue?",
    "options": [
      {
        "text": "0.5",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{green}) = 1-0.7 = 0.3\\) and \\(P(\\text{red}) = 1-0.8 = 0.2\\), so \\(P(\\text{blue}) = 1-(0.3+0.2) = 0.5\\)."
      },
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Averaged 0.7 and 0.8 to get 0.75. Find \\(P(\\text{green})\\) and \\(P(\\text{red})\\) from the two 'or' probabilities first."
      },
      {
        "text": "0.7",
        "correct": false,
        "feedback": "Gave \\(P(\\text{red or blue}) = 0.7\\). That includes red as well as blue."
      },
      {
        "text": "0.1",
        "correct": false,
        "feedback": "Subtracted \\(0.8-0.7 = 0.1\\). That equals \\(P(\\text{green})-P(\\text{red})\\), not \\(P(\\text{blue})\\)."
      }
    ],
    "backward": "Probabilities of all outcomes add up to 1.",
    "forward": "Working backwards from combined probabilities is common in Ch15 data questions."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "After 50 drops of a drawing pin, 31 were point up. After 200 drops (which include those first 50), 118 were point up. How many point-up landings would you expect in 1000 drops?",
    "options": [
      {
        "text": "620",
        "correct": false,
        "feedback": "Used the first 50 drops: \\(\\frac{31}{50} = 0.62\\), and \\(0.62 \\times 1000 = 620\\). The 200 drops give the more reliable estimate."
      },
      {
        "text": "596",
        "correct": false,
        "feedback": "Added the two results (\\(31+118 = 149\\) out of \\(50+200 = 250\\)), counting the first 50 drops twice: \\(\\frac{149}{250} = 0.596\\), so 596. The 200 drops already include the first 50."
      },
      {
        "text": "605",
        "correct": false,
        "feedback": "Averaged the two relative frequencies: \\((0.62+0.59) \\div 2 = 0.605\\), so 605. The larger set of drops is more reliable, so use it alone."
      },
      {
        "text": "590",
        "correct": true,
        "feedback": "Correct. More drops give a more reliable estimate, so use \\(\\frac{118}{200} = 0.59\\). Expected number = \\(0.59 \\times 1000 = 590\\)."
      }
    ],
    "backward": "Relative frequency as a decimal, Ch11.",
    "forward": "Why larger samples are more reliable is a theme of Ch15."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Raj hits a target with probability \\(\\frac{2}{3}\\) and Sam hits it with probability \\(\\frac{3}{4}\\). Their shots are independent. What is the probability that exactly one of them hits?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{both hit})\\): \\(\\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{2}\\). Exactly one hitting leaves out both hitting."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{neither hits})\\): \\(\\frac{1}{3} \\times \\frac{1}{4} = \\frac{1}{12}\\). The question asks for exactly one."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one hits}) = 1-\\frac{1}{3} \\times \\frac{1}{4} = \\frac{11}{12}\\). That includes the case where both hit."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": true,
        "feedback": "Correct. Raj hits and Sam misses: \\(\\frac{2}{3} \\times \\frac{1}{4} = \\frac{2}{12}\\). Raj misses and Sam hits: \\(\\frac{1}{3} \\times \\frac{3}{4} = \\frac{3}{12}\\). These cannot both happen, so add: \\(\\frac{2}{12}+\\frac{3}{12} = \\frac{5}{12}\\)."
      }
    ],
    "backward": "The 'not' rule, and multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter organise exactly this working."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Spinner A lands on 1 with probability 0.5 and on 2 with probability 0.5. Spinner B lands on 1 with probability 0.4, on 2 with probability 0.1 and on 3 with probability 0.5. Each is spun once, independently, and the scores are added. What is the probability that the total is 4?",
    "options": [
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Added the probabilities of the scores, \\(0.5+0.1 = 0.6\\), instead of multiplying along each pair first."
      },
      {
        "text": "0.3",
        "correct": true,
        "feedback": "Correct. Total 4 comes from A=1 and B=3: \\(0.5 \\times 0.5 = 0.25\\), or A=2 and B=2: \\(0.5 \\times 0.1 = 0.05\\). These cannot both happen, so add: \\(0.25+0.05 = 0.3\\)."
      },
      {
        "text": "0.25",
        "correct": false,
        "feedback": "Found only A=1 and B=3: 0.25. The pair A=2 and B=2 also gives a total of 4."
      },
      {
        "text": "0.05",
        "correct": false,
        "feedback": "Found only A=2 and B=2: 0.05. The pair A=1 and B=3 also gives a total of 4."
      }
    ],
    "backward": "Multiplying along each pair, and adding.",
    "forward": "Tree diagrams later in this chapter organise this kind of working."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "In a game, a player can win, draw or lose. \\(P(\\text{the player does not lose}) = 0.6\\) and \\(P(\\text{the player wins}) = 0.25\\). The player plays 80 games. How many draws would you expect?",
    "options": [
      {
        "text": "32",
        "correct": false,
        "feedback": "Found the expected number of losses: \\(0.4 \\times 80 = 32\\). The question asks for draws."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Found the expected number of wins: \\(0.25 \\times 80 = 20\\). The question asks for draws."
      },
      {
        "text": "28",
        "correct": true,
        "feedback": "Correct. 'Does not lose' means win or draw, so \\(P(\\text{draw}) = 0.6-0.25 = 0.35\\). Expected draws = \\(0.35 \\times 80 = 28\\)."
      },
      {
        "text": "68",
        "correct": false,
        "feedback": "Added \\(0.6+0.25 = 0.85\\) and found \\(0.85 \\times 80 = 68\\). 'Does not lose' already includes winning, so subtract the win probability from 0.6."
      }
    ],
    "backward": "The 'not' rule and subtracting decimals.",
    "forward": "Working backwards from combined probabilities is common in Ch15 data questions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled. What is the probability that the second score is exactly double the first?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": true,
        "feedback": "Correct. The pairs are (1,2), (2,4) and (3,6), which is 3 of the 36 outcomes. P = \\(\\frac{3}{36} = \\frac{1}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": false,
        "feedback": "Counted only (1,2) and (2,4): \\(\\frac{2}{36} = \\frac{1}{18}\\). (3,6) also works."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Counted only (1,2), giving \\(\\frac{1}{36}\\). (2,4) and (3,6) also work."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Counted pairs where either score is double the other, (1,2), (2,1), (2,4), (4,2), (3,6), (6,3): \\(\\frac{6}{36} = \\frac{1}{6}\\). Only the second score being double counts."
      }
    ],
    "backward": "Listing outcomes systematically.",
    "forward": "Sample space grids later in this chapter make conditions like this easy to spot."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "In a survey, 200 people each chose one drink: 84 chose coffee, 56 chose tea, 40 chose juice and 20 chose water. Use the relative frequencies as probabilities. What is the probability that a person chosen at random chose coffee or juice?",
    "options": [
      {
        "text": "0.62",
        "correct": true,
        "feedback": "Correct. Each person chose only one drink, so add: \\(\\frac{84+40}{200} = \\frac{124}{200} = 0.62\\)."
      },
      {
        "text": "0.2",
        "correct": false,
        "feedback": "Counted only juice: \\(\\frac{40}{200} = 0.2\\). Coffee counts too."
      },
      {
        "text": "0.38",
        "correct": false,
        "feedback": "Found \\(P(\\text{tea or water}) = \\frac{56+20}{200} = 0.38\\). The question asks for coffee or juice."
      },
      {
        "text": "0.42",
        "correct": false,
        "feedback": "Counted only coffee: \\(\\frac{84}{200} = 0.42\\). Juice counts too."
      }
    ],
    "backward": "Relative frequency as a decimal, Ch11.",
    "forward": "Reading probabilities from survey tables is part of Ch15."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A bag holds 80 counters, some red and the rest blue. A counter is picked, its colour is noted, and it is put back. After 30 picks, red has appeared 9 times. Use these results to estimate how many red counters are in the bag.",
    "options": [
      {
        "text": "9",
        "correct": false,
        "feedback": "Gave the number of reds picked, 9. The bag holds 80 counters, so scale the relative frequency up: \\(0.3 \\times 80\\)."
      },
      {
        "text": "50",
        "correct": false,
        "feedback": "Subtracted \\(80-30 = 50\\). The 30 picks were put back, so they do not remove any counters."
      },
      {
        "text": "24",
        "correct": true,
        "feedback": "Correct. The relative frequency of red is \\(\\frac{9}{30} = 0.3\\), so the estimate is \\(0.3 \\times 80 = 24\\) red counters."
      },
      {
        "text": "21",
        "correct": false,
        "feedback": "Found the number of picks that were not red, \\(30-9 = 21\\). The question asks for red counters in the whole bag of 80."
      }
    ],
    "backward": "Relative frequency as a decimal, and finding a fraction of an amount, Ch8.",
    "forward": "Estimating a population from a sample is a theme of Ch15."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A bag has 4 red, 3 blue and 3 green counters. A counter is picked at random, put back, and another is picked. What is the probability that the first is red and the second is not red?",
    "options": [
      {
        "text": "0.36",
        "correct": false,
        "feedback": "Found not red then not red: \\(0.6 \\times 0.6 = 0.36\\). The first counter must be red."
      },
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Gave \\(P(\\text{red}) = 0.4\\) for the first pick only. The second pick must be not red: multiply by 0.6."
      },
      {
        "text": "0.16",
        "correct": false,
        "feedback": "Found red then red: \\(0.4 \\times 0.4 = 0.16\\). The second counter must not be red."
      },
      {
        "text": "0.24",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{red}) = \\frac{4}{10} = 0.4\\) and \\(P(\\text{not red}) = 0.6\\). The picks are independent, so \\(0.4 \\times 0.6 = 0.24\\)."
      }
    ],
    "backward": "The 'not' rule and multiplying decimals.",
    "forward": "Tree diagrams later in this chapter have branches like these."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "In a survey of 80 commuters, 20 cycle to work. Use the relative frequency as the probability that a commuter cycles. Two commuters are chosen at random, independently. What is the probability that they make the same choice (both cycle or neither cycles)?",
    "options": [
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{exactly one cycles})\\): \\(2 \\times \\frac{1}{4} \\times \\frac{3}{4} = \\frac{6}{16} = \\frac{3}{8}\\). That is the opposite of making the same choice."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{cycles}) = \\frac{20}{80} = \\frac{1}{4}\\) and \\(P(\\text{does not}) = \\frac{3}{4}\\). Both cycle: \\(\\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}\\). Neither cycles: \\(\\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}\\). These cannot both happen, so add: \\(\\frac{1}{16}+\\frac{9}{16} = \\frac{10}{16} = \\frac{5}{8}\\)."
      },
      {
        "text": "\\(\\frac{9}{16}\\)",
        "correct": false,
        "feedback": "Found only 'neither cycles': \\(\\frac{9}{16}\\). Both cycling is also the same choice."
      },
      {
        "text": "\\(\\frac{1}{16}\\)",
        "correct": false,
        "feedback": "Found only 'both cycle': \\(\\frac{1}{16}\\). Neither cycling is also the same choice."
      }
    ],
    "backward": "Relative frequency as a fraction, Ch11, and the 'not' rule.",
    "forward": "The same route handles larger samples in Ch15."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A box holds red, blue and green sweets in the ratio \\(1:3:4\\). There are 16 green sweets. One sweet is picked at random. What is the probability that it is red?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Compared red with green only (4 out of 16): \\(\\frac{1}{4}\\). The total includes every colour: 32 sweets."
      },
      {
        "text": "\\(\\frac{1}{7}\\)",
        "correct": false,
        "feedback": "Compared red with the other parts (1 to \\(3+4 = 7\\)): \\(\\frac{1}{7}\\). Probability compares with all 8 parts."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": true,
        "feedback": "Correct. 4 parts are 16 sweets, so 1 part is 4 sweets. The total is 8 parts = 32 sweets and red is 1 part = 4 sweets. \\(P(\\text{red}) = \\frac{4}{32} = \\frac{1}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Wrote the red : blue ratio \\(1:3\\) as the fraction \\(\\frac{1}{3}\\). The total is \\(1+3+4 = 8\\) parts."
      }
    ],
    "backward": "Sharing in a ratio, Ch11.",
    "forward": "Probabilities from ratios appear in Ch15."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 4-sided spinner numbered 1 to 4 and a fair 5-sided spinner numbered 1 to 5 are spun and the scores are added. What is the probability that the total is 6?",
    "options": [
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": false,
        "feedback": "Counted three pairs and missed one: \\(\\frac{3}{20}\\). List them in order: (1,5), (2,4), (3,3), (4,2)."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(4 \\times 5 = 20\\) equally likely pairs. Total 6: (1,5), (2,4), (3,3), (4,2), which is 4 pairs. P = \\(\\frac{4}{20} = \\frac{1}{5}\\)."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Used the 8 different totals (2 to 9) as the outcomes, giving \\(\\frac{1}{8}\\). The 20 pairs are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{1}{20}\\)",
        "correct": false,
        "feedback": "Counted a single pair, giving \\(\\frac{1}{20}\\). Four pairs add to 6."
      }
    ],
    "backward": "Multiplying to count outcomes.",
    "forward": "Grids later in this chapter list outcomes like this."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A bag has red, blue and green counters. \\(P(\\text{red})\\) = 2p, \\(P(\\text{blue})\\) = p and \\(P(\\text{green})\\) = 3p. What is the probability that a counter is blue or green?",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red})\\) = 2p = \\(\\frac{1}{3}\\). The question asks for blue or green."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Found p = \\(\\frac{1}{6}\\), the probability of blue only. Green counts too."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{green})\\) = 3p = \\(\\frac{1}{2}\\) only. Blue counts too."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. 2p+p+3p = 1, so 6p = 1 and p = \\(\\frac{1}{6}\\). Blue or green = p+3p = 4p = \\(\\frac{4}{6} = \\frac{2}{3}\\)."
      }
    ],
    "backward": "Forming and solving equations, Ch4.",
    "forward": "Unknown branch probabilities in tree diagrams are found the same way."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "Event A happened 140 times in 400 trials. Use the relative frequency as the probability of A. How many times would you expect A to happen in 1500 trials?",
    "options": [
      {
        "text": "525",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{140}{400} = 0.35\\). Expected number = \\(0.35 \\times 1500 = 525\\)."
      },
      {
        "text": "140",
        "correct": false,
        "feedback": "Repeated the 140 from the first 400 trials. The question asks about 1500 trials."
      },
      {
        "text": "1640",
        "correct": false,
        "feedback": "Added \\(1500+140 = 1640\\). Expected number = probability × trials."
      },
      {
        "text": "560",
        "correct": false,
        "feedback": "Rounded \\(1500 \\div 400 = 3.75\\) up to 4 and found \\(140 \\times 4 = 560\\). Use the exact relative frequency 0.35 instead."
      }
    ],
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Estimates from experiments are interpreted in Ch15."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Sam is on time with probability 0.9 and Tia is on time with probability 0.8, independently. What is the probability that Sam is late and Tia is on time?",
    "options": [
      {
        "text": "0.18",
        "correct": false,
        "feedback": "Found Sam on time and Tia late: \\(0.9 \\times 0.2 = 0.18\\). The question has Sam late and Tia on time."
      },
      {
        "text": "0.08",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{Sam late}) = 1-0.9 = 0.1\\). Independent: \\(0.1 \\times 0.8 = 0.08\\)."
      },
      {
        "text": "0.02",
        "correct": false,
        "feedback": "Found both late: \\(0.1 \\times 0.2 = 0.02\\). Tia must be on time."
      },
      {
        "text": "0.72",
        "correct": false,
        "feedback": "Found both on time: \\(0.9 \\times 0.8 = 0.72\\). Sam must be late."
      }
    ],
    "backward": "The 'not' rule and multiplying decimals.",
    "forward": "Tree diagrams later in this chapter have branches like these."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A fair die is rolled twice. What is the probability that the first roll is a 6 or the second roll is a 6 (or both)?",
    "options": [
      {
        "text": "\\(\\frac{5}{18}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{exactly one 6})\\): \\(\\frac{5}{36}+\\frac{5}{36} = \\frac{10}{36} = \\frac{5}{18}\\). 'Or (or both)' includes two 6s as well."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{6}+\\frac{1}{6} = \\frac{1}{3}\\). Both rolls can be 6, so adding counts that case twice."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{both 6}) = \\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\). 'Or' also includes the cases with only one 6."
      },
      {
        "text": "\\(\\frac{11}{36}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{no 6 on either roll}) = \\frac{5}{6} \\times \\frac{5}{6} = \\frac{25}{36}\\), so \\(P(\\text{at least one 6}) = 1-\\frac{25}{36} = \\frac{11}{36}\\)."
      }
    ],
    "backward": "The 'not' rule, and multiplying fractions, Ch8.",
    "forward": "The 'none, then subtract' route is used for larger numbers of rolls."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A drawer has 6 black socks and 10 white socks. Four black socks are removed. A sock is then picked at random, its colour is noted and it is put back. A second sock is picked. What is the probability that both socks are white?",
    "options": [
      {
        "text": "\\(\\frac{25}{36}\\)",
        "correct": true,
        "feedback": "Correct. After removing 4 black socks there are 2 black and 10 white, which is 12 socks. \\(P(\\text{white}) = \\frac{10}{12} = \\frac{5}{6}\\). The sock is put back, so the picks are independent: \\(\\frac{5}{6} \\times \\frac{5}{6} = \\frac{25}{36}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{white}) = \\frac{5}{6}\\) for one pick. Both picks must be white, so multiply."
      },
      {
        "text": "\\(\\frac{25}{64}\\)",
        "correct": false,
        "feedback": "Ignored the removal: \\((\\frac{10}{16}) \\times (\\frac{10}{16}) = \\frac{25}{64}\\). The drawer now has 12 socks."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{both black}) = \\frac{2}{12} \\times \\frac{2}{12} = \\frac{1}{36}\\). The question asks for both white."
      }
    ],
    "backward": "Simplifying and multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along branches in the same way."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are added. What is the probability that the total is a multiple of 5?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Counted only total 10: \\(\\frac{3}{36} = \\frac{1}{12}\\). A total of 5 counts too."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Used the 11 different totals as the outcomes, with 2 favourable totals (5 and 10): \\(\\frac{2}{11}\\). The 36 pairs are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{7}{36}\\)",
        "correct": true,
        "feedback": "Correct. Total 5: (1,4), (2,3), (3,2), (4,1) is 4 pairs. Total 10: (4,6), (5,5), (6,4) is 3 pairs. That is 7 of the 36 outcomes, so P = \\(\\frac{7}{36}\\)."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Counted only total 5: \\(\\frac{4}{36} = \\frac{1}{9}\\). A total of 10 counts too."
      }
    ],
    "backward": "Listing outcomes, and adding.",
    "forward": "Grids later in this chapter make this count easier."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "Events A and B cannot happen at the same time. \\(P(\\text{A or B}) = 0.8\\) and \\(P(\\text{A}) = 0.55\\). Event C is independent of B and \\(P(\\text{C}) = 0.5\\). What is the probability that B and C both happen?",
    "options": [
      {
        "text": "0.125",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{B}) = 0.8-0.55 = 0.25\\), because A and B cannot both happen. B and C are independent, so \\(P(\\text{B and C}) = 0.25 \\times 0.5 = 0.125\\)."
      },
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Multiplied \\(P(\\text{A or B})\\) by \\(P(\\text{C})\\): \\(0.8 \\times 0.5 = 0.4\\). The question asks about B only, and \\(P(\\text{B}) = 0.8-0.55\\)."
      },
      {
        "text": "0.25",
        "correct": false,
        "feedback": "Found \\(P(\\text{B}) = 0.25\\) and stopped. C must happen too: multiply by 0.5."
      },
      {
        "text": "0.275",
        "correct": false,
        "feedback": "Multiplied \\(P(\\text{A})\\) by \\(P(\\text{C})\\): \\(0.55 \\times 0.5 = 0.275\\). The question asks about B, and \\(P(\\text{B}) = 0.8-0.55\\)."
      }
    ],
    "backward": "The addition rule for events that cannot happen together.",
    "forward": "Finding a missing probability before combining is common in Ch15 data questions."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A weighted spinner lands on red with probability 0.2. It is spun twice, and this pair of spins is repeated 150 times. How many of the 150 pairs would you expect to be red both times?",
    "options": [
      {
        "text": "30",
        "correct": false,
        "feedback": "Found the expected number of reds on one spin: \\(0.2 \\times 150 = 30\\). Both spins must be red: use \\(0.2 \\times 0.2 = 0.04\\)."
      },
      {
        "text": "60",
        "correct": false,
        "feedback": "Added \\(0.2+0.2 = 0.4\\) and found \\(0.4 \\times 150 = 60\\). For both spins, multiply the probabilities."
      },
      {
        "text": "144",
        "correct": false,
        "feedback": "Found the expected number of pairs that are NOT red both times: \\(150-6 = 144\\). The question asks for red both times."
      },
      {
        "text": "6",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{red both times}) = 0.2 \\times 0.2 = 0.04\\). Expected number = \\(0.04 \\times 150 = 6\\)."
      }
    ],
    "backward": "Multiplying decimals, and finding a percentage of an amount, Ch3.",
    "forward": "Expected numbers are compared with real data in Ch15."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Machines A, B and C work independently with probabilities 0.9, 0.8 and 0.6. What is the probability that A and B work but C does not?",
    "options": [
      {
        "text": "0.72",
        "correct": false,
        "feedback": "Multiplied only A and B: \\(0.9 \\times 0.8 = 0.72\\). C's failure, with probability 0.4, must be included."
      },
      {
        "text": "0.32",
        "correct": false,
        "feedback": "Multiplied B's success and C's failure: \\(0.8 \\times 0.4 = 0.32\\). A must work too: multiply by 0.9."
      },
      {
        "text": "0.288",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{C does not work}) = 1-0.6 = 0.4\\). Independent: \\(0.9 \\times 0.8 \\times 0.4 = 0.288\\)."
      },
      {
        "text": "0.432",
        "correct": false,
        "feedback": "Found all three working: \\(0.9 \\times 0.8 \\times 0.6 = 0.432\\). C must NOT work, so use \\(1-0.6 = 0.4\\)."
      }
    ],
    "backward": "The 'not' rule and multiplying decimals.",
    "forward": "Three-stage tree diagram paths work the same way."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A spinner has sections 1, 2 and 3. In 100 spins it landed on 1 twenty times, on 2 fifty times and on 3 thirty times. Use the relative frequencies as probabilities. The spinner is spun twice. What is the probability that both spins give the same score?",
    "options": [
      {
        "text": "0.04",
        "correct": false,
        "feedback": "Found only both 1s: \\(0.2 \\times 0.2 = 0.04\\). Both 2s and both 3s count too."
      },
      {
        "text": "0.38",
        "correct": true,
        "feedback": "Correct. \\(P(1) = 0.2\\), \\(P(2) = 0.5\\), \\(P(3) = 0.3\\). Both 1: 0.04. Both 2: 0.25. Both 3: 0.09. These cannot happen together, so add: \\(0.04+0.25+0.09 = 0.38\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Assumed all 9 pairs are equally likely, so 3 of \\(9 = \\frac{1}{3}\\). The sections do not come up equally often, so multiply along each pair."
      },
      {
        "text": "0.25",
        "correct": false,
        "feedback": "Found only both 2s: \\(0.5 \\times 0.5 = 0.25\\). Both 1s and both 3s count too."
      }
    ],
    "backward": "Relative frequency, multiplying decimals, Ch11.",
    "forward": "Tree diagrams later in this chapter organise this working."
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
    title: "Probability — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Synthesis items mixing tree diagrams, overlapping events, at-least-one problems, and estimates from experiments — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. This level mixes the six topics inside single questions, so the first job is to build the path: what exactly is the event, which events can happen together, and which rules (add, multiply, 'not') do I need, and in what order? Sketch a tree, a grid or a list before you calculate, and watch for traps such as events that overlap, or 'at least one'. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

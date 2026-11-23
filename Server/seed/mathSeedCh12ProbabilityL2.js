

// seed/mathSeedCh12ProbabilityL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 12
// (Probability), Level 2 — converted from the standalone diagnostic
// JSON ch12-probability-level-2.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh12ProbabilityL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-12-probability";
const CHAPTER_NAME = "Probability";
const LEVEL = 2;

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
    "question": "A bag holds 5 red, 8 blue and 7 green counters. Two red counters are removed. One counter is then picked at random. What is the probability that it is blue?",
    "options": [
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Ignored the removal and used all 20 counters: \\(\\frac{8}{20} = \\frac{2}{5}\\). After the removal there are only 18."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Took the 2 removed counters off the blue count as well: \\(\\frac{8-2}{18} = \\frac{6}{18} = \\frac{1}{3}\\). The removed counters were red, so blue stays at 8."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Compared blue with the \\(3+7 = 10\\) other counters: \\(\\frac{8}{10} = \\frac{4}{5}\\). The total must include the blue counters: 18."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": true,
        "feedback": "Correct. After removing 2 red there are 3 red, 8 blue and 7 green, so \\(3+8+7 = 18\\) counters. \\(P(\\text{blue}) = \\frac{8}{18} = \\frac{4}{9}\\)."
      }
    ],
    "retryHint": "Work out how many counters are in the bag after the removal, then count the blue ones.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "The same question, 'how many equally likely outcomes are there now?', comes first in every sample space problem later in this chapter."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 4-sided spinner numbered 1 to 4 is spun twice and the two scores are added. What is the probability that the total is at least 7?",
    "options": [
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Counted (3,4) and (4,4) but forgot that (4,3) is a different outcome, giving \\(\\frac{2}{16} = \\frac{1}{8}\\)."
      },
      {
        "text": "\\(\\frac{3}{16}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(4 \\times 4 = 16\\) equally likely pairs of scores. The totals of 7 or more come from (3,4), (4,3) and (4,4), which is 3 pairs, so P = \\(\\frac{3}{16}\\)."
      },
      {
        "text": "\\(\\frac{2}{7}\\)",
        "correct": false,
        "feedback": "Used the 7 different totals (2 to 8) as the outcomes, with 2 favourable totals (7 and 8), giving \\(\\frac{2}{7}\\). The 16 pairs of scores are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{1}{16}\\)",
        "correct": false,
        "feedback": "Counted only (4,4), the pair with total 8, giving \\(\\frac{1}{16}\\). 'At least 7' includes a total of 7 as well."
      }
    ],
    "retryHint": "How many equally likely pairs are there in all? Then list the pairs with a total of 7 or more.",
    "backward": "Multiplying to count outcomes.",
    "forward": "Larger sample space grids later in this chapter work the same way."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A bag contains red, blue, green and yellow counters. \\(P(\\text{red}) = 0.1\\), \\(P(\\text{blue}) = 0.25\\) and \\(P(\\text{green}) = 0.4\\). What is the probability that a counter is red or yellow?",
    "options": [
      {
        "text": "0.35",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{yellow}) = 1-(0.1+0.25+0.4) = 0.25\\). A counter cannot be both red and yellow, so \\(P(\\text{red or yellow}) = 0.1+0.25 = 0.35\\)."
      },
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Added the three given probabilities, \\(0.1+0.25+0.4 = 0.75\\), and never found yellow. Yellow is what is left: \\(1-0.75 = 0.25\\)."
      },
      {
        "text": "0.25",
        "correct": false,
        "feedback": "Found \\(P(\\text{yellow}) = 0.25\\) but stopped. Red counts as well, so add 0.1."
      },
      {
        "text": "0.65",
        "correct": false,
        "feedback": "Found \\(P(\\text{blue or green}) = 0.25+0.4 = 0.65\\). The question asks for red or yellow."
      }
    ],
    "retryHint": "The four probabilities add up to 1. Find \\(P(\\text{yellow})\\) first, then combine it with \\(P(\\text{red})\\).",
    "backward": "Probabilities of all outcomes add up to 1.",
    "forward": "Tree diagrams later in this chapter use the same 'fill in the missing branch, then add' steps."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A spinner landed on red 24 times in 80 spins. It is spun another 500 times. Using the relative frequency as the probability of red, how many reds would you expect in the 500 spins?",
    "options": [
      {
        "text": "250",
        "correct": false,
        "feedback": "Assumed red comes up half the time: \\(500 \\div 2 = 250\\). The first 80 spins show how often red really comes up: \\(\\frac{24}{80} = \\frac{3}{10}\\)."
      },
      {
        "text": "524",
        "correct": false,
        "feedback": "Added \\(500+24 = 524\\). Expected number = probability × spins: \\(\\frac{3}{10} \\times 500\\)."
      },
      {
        "text": "150",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{24}{80} = \\frac{3}{10}\\). Expected reds = \\(\\frac{3}{10} \\times 500 = 150\\)."
      },
      {
        "text": "1667",
        "correct": false,
        "feedback": "Divided \\(500 \\div 0.3 \\approx 1666.67\\), about 1667. Multiply the probability by the number of spins instead."
      }
    ],
    "retryHint": "First turn the first 80 spins into a relative frequency, then use it as the probability for the next 500 spins.",
    "backward": "A ratio as a fraction, Ch11.",
    "forward": "Estimated probabilities from experiments feed into tree diagrams later in this chapter."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Anna, Ben and Cai each take a test, independently of each other. Their chances of passing are \\(\\frac{1}{2}\\), \\(\\frac{1}{3}\\) and \\(\\frac{3}{4}\\). What is the probability that all three pass?",
    "options": [
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": true,
        "feedback": "Correct. The events are independent, so multiply all three: \\(\\frac{1}{2} \\times \\frac{1}{3} \\times \\frac{3}{4} = \\frac{3}{24} = \\frac{1}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Multiplied only Ben's and Cai's chances: \\(\\frac{1}{3} \\times \\frac{3}{4} = \\frac{1}{4}\\). Anna's \\(\\frac{1}{2}\\) must be included."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Multiplied only Anna's and Cai's chances: \\(\\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}\\). Ben's \\(\\frac{1}{3}\\) must be included."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Multiplied only Anna's and Ben's chances: \\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\). Cai's \\(\\frac{3}{4}\\) must be included."
      }
    ],
    "retryHint": "All three must pass, so multiply the three probabilities together, then simplify.",
    "backward": "Multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along three-stage paths in the same way."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A fair spinner has 20 equal sections numbered 1 to 20. What is the probability that the number is not a multiple of 3?",
    "options": [
      {
        "text": "\\(\\frac{13}{20}\\)",
        "correct": false,
        "feedback": "Rounded \\(20 \\div 3 \\approx 6.67\\) up to 7 multiples of 3, so counted 13 non-multiples: \\(\\frac{13}{20}\\). The multiples are 3, 6, 9, 12, 15, 18, which is 6."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{multiple of 3}) = \\frac{6}{20} = \\frac{3}{10}\\). The question asks for NOT a multiple of 3."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": true,
        "feedback": "Correct. The multiples of 3 up to 20 are 3, 6, 9, 12, 15, 18 (6 numbers), so \\(20-6 = 14\\) numbers are not multiples. P = \\(\\frac{14}{20} = \\frac{7}{10}\\)."
      },
      {
        "text": "\\(\\frac{3}{7}\\)",
        "correct": false,
        "feedback": "Compared the 6 multiples of 3 with the 14 other numbers: \\(\\frac{6}{14} = \\frac{3}{7}\\). The total is all 20 sections."
      }
    ],
    "retryHint": "List the multiples of 3 up to 20 and count them. How many of the 20 numbers are not on the list?",
    "backward": "Multiples, and simplifying fractions, Ch8.",
    "forward": "'not' probabilities are used for 'at least one' problems later in this chapter."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped and a fair die is rolled. The grid shows all 12 outcomes. What is the probability of heads and a number greater than 4?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 188\" width=\"384\" height=\"188\"><rect x=\"0\" y=\"0\" width=\"384\" height=\"188\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"272\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"316\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">H</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H1</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H2</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H3</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H4</text><rect x=\"272\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H5</text><rect x=\"316\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">H6</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">T</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T1</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T2</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T3</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T4</text><rect x=\"272\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T5</text><rect x=\"316\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">T6</text><text x=\"228\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Die</text><text x=\"18\" y=\"120\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 120)\">Coin</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Gave the probability of a score greater than 4, \\(\\frac{2}{6} = \\frac{1}{3}\\), and ignored the coin. The outcome must also have heads."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Heads with a score greater than 4: H5 and H6, which is 2 of the 12 outcomes. P = \\(\\frac{2}{12} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Counted only one favourable outcome (H5), giving \\(\\frac{1}{12}\\). H6 also has heads and a score greater than 4."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave the probability of heads, \\(\\frac{1}{2}\\), and ignored the die. The score must be greater than 4 too."
      }
    ],
    "retryHint": "Find the cells that show heads and a score greater than 4 (a 4 does not count), then divide by the total number of cells.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Later in this chapter you check this by multiplying \\(\\frac{1}{2} \\times \\frac{1}{3}\\)."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A fair die was rolled 60 times and a 3 appeared 14 times. How many more 3s appeared than the number you would expect?",
    "options": [
      {
        "text": "14",
        "correct": false,
        "feedback": "Gave the actual number of 3s (14). The question asks how many more than the expected number appeared."
      },
      {
        "text": "46",
        "correct": false,
        "feedback": "Subtracted \\(60-14 = 46\\), the number of rolls that were not a 3. Compare the actual 14 with the expected 10."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Gave the expected number of 3s (10) but not how it compares with the 14 that appeared."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. Expected number of 3s = \\(\\frac{1}{6} \\times 60 = 10\\). The actual number was 14, so \\(14-10 = 4\\) more than expected."
      }
    ],
    "retryHint": "Work out the expected number of 3s first (probability × number of rolls), then compare it with 14.",
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Comparing actual and expected results is how you judge fairness later in this chapter."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag has 6 red counters and some blue counters. \\(P(\\text{red}) = \\frac{2}{7}\\). How many blue counters are in the bag?",
    "options": [
      {
        "text": "3",
        "correct": false,
        "feedback": "Found the size of one part (\\(6 \\div 2 = 3\\) counters) and stopped. The total is 7 parts, and the blue counters are 5 of them."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Used the \\(7-2 = 5\\) blue parts as the number of counters. Each part is 3 counters, so blue is \\(5 \\times 3 = 15\\)."
      },
      {
        "text": "15",
        "correct": true,
        "feedback": "Correct. 6 red counters are 2 of the 7 equal parts, so 1 part is 3 counters. The total is \\(7 \\times 3 = 21\\), so there are \\(21-6 = 15\\) blue counters."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Multiplied the 6 red counters by the 2 in \\(\\frac{2}{7}\\) to get 12. The 6 counters are 2 parts, so each part is \\(6 \\div 2 = 3\\)."
      }
    ],
    "backward": "Equal parts of a ratio, Ch11.",
    "forward": "Finding totals from probabilities is used when reading survey data in Ch15."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are multiplied. What is the probability that the product is 12?",
    "options": [
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": true,
        "feedback": "Correct. The pairs with product 12 are (2,6), (3,4), (4,3) and (6,2), which is 4 of the 36 equally likely pairs. P = \\(\\frac{4}{36} = \\frac{1}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Counted a single pair, giving \\(\\frac{1}{36}\\). Four pairs multiply to 12."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Counted (2,6), (3,4) and (4,3) but missed (6,2), giving \\(\\frac{3}{36} = \\frac{1}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": false,
        "feedback": "Counted only (2,6) and (3,4), giving \\(\\frac{2}{36} = \\frac{1}{18}\\). The reversed pairs (6,2) and (4,3) are different outcomes."
      }
    ],
    "backward": "Factor pairs of 12.",
    "forward": "Larger sample spaces later in this chapter are counted the same way."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A bag has red, blue and green counters. \\(P(\\text{red}) = x\\), \\(P(\\text{blue}) = 2x\\) and \\(P(\\text{green}) = 0.1\\). Every counter is red, blue or green. What is the probability that a counter is blue?",
    "options": [
      {
        "text": "0.9",
        "correct": false,
        "feedback": "Found \\(P(\\text{red or blue}) = 1-0.1 = 0.9\\) and stopped. That total still has to be split between red and blue in the ratio \\(1:2\\)."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found \\(x = 0.3\\), the probability of red, and stopped. Blue is \\(2x\\)."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Split \\(1-0.1 = 0.9\\) into 2 equal parts, \\(0.9 \\div 2 = 0.45\\). Red and blue make \\(x+2x = 3\\) parts, so \\(0.9 \\div 3 = 0.3\\) per part."
      },
      {
        "text": "0.6",
        "correct": true,
        "feedback": "Correct. The probabilities add up to 1: \\(x+2x+0.1 = 1\\), so \\(3x = 0.9\\) and \\(x = 0.3\\). \\(P(\\text{blue}) = 2x = 0.6\\)."
      }
    ],
    "backward": "Solving equations, Ch4.",
    "forward": "Unknown probabilities in tree diagrams are found the same way."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A coin was flipped 25 times and landed on heads 11 times. It was then flipped 75 more times and landed on heads 46 times. What is the relative frequency of heads for all 100 flips?",
    "options": [
      {
        "text": "0.44",
        "correct": false,
        "feedback": "Used only the first 25 flips: \\(\\frac{11}{25} = 0.44\\). The question asks about all 100 flips."
      },
      {
        "text": "0.57",
        "correct": true,
        "feedback": "Correct. Total heads = \\(11+46 = 57\\) out of \\(25+75 = 100\\) flips, so the relative frequency is \\(\\frac{57}{100} = 0.57\\)."
      },
      {
        "text": "0.61",
        "correct": false,
        "feedback": "Used only the 75 later flips: \\(\\frac{46}{75} \\approx 0.61\\). The question asks about all 100 flips."
      },
      {
        "text": "0.53",
        "correct": false,
        "feedback": "Averaged the two relative frequencies: \\((0.44+0.61) \\div 2 \\approx 0.53\\). The two groups have different sizes, so add the heads (57) and divide by all 100 flips."
      }
    ],
    "backward": "Adding frequencies, ratio as a decimal, Ch11.",
    "forward": "More trials give a better estimate, which is why large samples matter in Ch15."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Switch A works with probability 0.8. The two switches A and B work independently, and the probability that both work is 0.24. What is the probability that switch B works?",
    "options": [
      {
        "text": "0.24",
        "correct": false,
        "feedback": "Gave the probability that both work, 0.24, instead of \\(P(\\text{B})\\). Divide it by \\(P(\\text{A}) = 0.8\\) to remove switch A's share."
      },
      {
        "text": "0.3",
        "correct": true,
        "feedback": "Correct. For independent events \\(P(\\text{A and B}) = P(\\text{A}) \\times P(\\text{B})\\), so \\(P(\\text{B}) = 0.24 \\div 0.8 = 0.3\\)."
      },
      {
        "text": "0.192",
        "correct": false,
        "feedback": "Multiplied \\(0.24 \\times 0.8 = 0.192\\) instead of dividing. To undo a multiplication by 0.8, divide by 0.8."
      },
      {
        "text": "0.03",
        "correct": false,
        "feedback": "Divided 0.24 by 8 instead of by 0.8, giving 0.03. Dividing by 0.8 is the same as dividing 2.4 by 8, which gives 0.3."
      }
    ],
    "backward": "Undoing multiplication by dividing, Ch4.",
    "forward": "Unknown probabilities in tree diagrams are found the same way."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Spinner 1 lands on red with probability \\(\\frac{1}{3}\\) and on blue with probability \\(\\frac{2}{3}\\). Spinner 2 lands on red with probability \\(\\frac{1}{5}\\) and on blue with probability \\(\\frac{4}{5}\\). Each spinner is spun once, independently. The tree diagram shows the possible results. What is the probability that exactly one spinner lands on red?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580 372\" width=\"580\" height=\"372\"><rect x=\"0\" y=\"0\" width=\"580\" height=\"372\" fill=\"#ffffff\"/><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"94\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"132.42\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">1/3</text><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"278\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"247.58\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">2/3</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"54\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"65.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">1/5</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"134\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"130.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">4/5</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"238\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"249.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">1/5</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"318\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"314.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">4/5</text><circle cx=\"56\" cy=\"186\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"236\" cy=\"94\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"84\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">R</text><circle cx=\"236\" cy=\"278\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"298\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">B</text><circle cx=\"420\" cy=\"54\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">RR</text><circle cx=\"420\" cy=\"134\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"139\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">RB</text><circle cx=\"420\" cy=\"238\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"243\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">BR</text><circle cx=\"420\" cy=\"318\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">BB</text><text x=\"236\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Spinner 1</text><text x=\"420\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Spinner 2</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{1}{15}\\)",
        "correct": false,
        "feedback": "Found the path R then R: \\(\\frac{1}{3} \\times \\frac{1}{5} = \\frac{1}{15}\\), which is both spinners red. Exactly one red needs one R and one B."
      },
      {
        "text": "\\(\\frac{4}{15}\\)",
        "correct": false,
        "feedback": "Found only the path R then B: \\(\\frac{1}{3} \\times \\frac{4}{5} = \\frac{4}{15}\\). The path B then R, \\(\\frac{2}{3} \\times \\frac{1}{5} = \\frac{2}{15}\\), also gives exactly one red; add the two."
      },
      {
        "text": "\\(\\frac{2}{15}\\)",
        "correct": false,
        "feedback": "Found only the path B then R: \\(\\frac{2}{3} \\times \\frac{1}{5} = \\frac{2}{15}\\). The path R then B, \\(\\frac{1}{3} \\times \\frac{4}{5} = \\frac{4}{15}\\), also gives exactly one red; add the two."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": true,
        "feedback": "Correct. Exactly one red happens on the paths R then B and B then R. R then B: \\(\\frac{1}{3} \\times \\frac{4}{5} = \\frac{4}{15}\\). B then R: \\(\\frac{2}{3} \\times \\frac{1}{5} = \\frac{2}{15}\\). These paths cannot both happen, so add: \\(\\frac{4}{15}+\\frac{2}{15} = \\frac{6}{15} = \\frac{2}{5}\\)."
      }
    ],
    "backward": "Multiplying along branches and adding across paths.",
    "forward": "The same two steps solve every tree diagram problem later in this chapter."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag has 50 counters. The probability that a counter picked at random is not green is 0.64. How many counters are green?",
    "options": [
      {
        "text": "32",
        "correct": false,
        "feedback": "Found the number that are NOT green: \\(0.64 \\times 50 = 32\\). The question asks for green."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Read \\(P(\\text{green}) = 0.36\\) as 36 counters. A probability is a fraction of the 50 counters: \\(0.36 \\times 50 = 18\\)."
      },
      {
        "text": "18",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{green}) = 1-0.64 = 0.36\\), so the number of green counters is \\(0.36 \\times 50 = 18\\)."
      },
      {
        "text": "0.36",
        "correct": false,
        "feedback": "Found \\(P(\\text{green}) = 0.36\\) and stopped. The question asks how many counters: \\(0.36 \\times 50\\)."
      }
    ],
    "backward": "Finding a percentage of an amount, Ch3.",
    "forward": "Expected numbers later in this chapter use the same 'probability × total'."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are added. The grid shows every possible total. What is the probability that the total is a multiple of 4?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 364\" width=\"384\" height=\"364\"><rect x=\"0\" y=\"0\" width=\"384\" height=\"364\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"59\" font-family=\"sans-serif\" font-size=\"16\" fill=\"#666666\" text-anchor=\"middle\">+</text><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"272\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"316\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"272\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"316\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"272\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"316\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"52\" y=\"164\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"140\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"184\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"228\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"272\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"316\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"52\" y=\"208\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"96\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"140\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"184\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"228\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"272\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"316\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"52\" y=\"252\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"96\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"140\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"184\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"228\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"272\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"316\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">11</text><rect x=\"52\" y=\"296\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"96\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"140\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"184\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"228\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"272\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">11</text><rect x=\"316\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><text x=\"228\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Second die</text><text x=\"18\" y=\"208\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 208)\">First die</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. The totals that are multiples of 4 are 4, 8 and 12. They appear in \\(3+5+1 = 9\\) of the 36 cells, so P = \\(\\frac{9}{36} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{5}{36}\\)",
        "correct": false,
        "feedback": "Counted only the five cells showing 8, giving \\(\\frac{5}{36}\\). The totals 4 and 12 are multiples of 4 too."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Missed the single cell showing 12, so counted 8 cells instead of 9, giving \\(\\frac{8}{36} = \\frac{2}{9}\\)."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Counted the 3 totals that are multiples of 4 (4, 8, 12) out of the 11 different totals, giving \\(\\frac{3}{11}\\). The 36 cells are the equally likely outcomes; the totals are not."
      }
    ],
    "backward": "Multiples, and simplifying fractions, Ch8.",
    "forward": "Counting cells in a grid is the method for larger sample spaces later in this chapter."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A number is picked at random from 1 to 20. No number is both a multiple of 6 and a prime. What is the probability that the number is a multiple of 6 or a prime?",
    "options": [
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": true,
        "feedback": "Correct. The multiples of 6 are 6, 12, 18 (3 numbers) and the primes up to 20 are 2, 3, 5, 7, 11, 13, 17, 19 (8 numbers). The events cannot both happen, so add: \\(\\frac{3}{20}+\\frac{8}{20} = \\frac{11}{20}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Missed 18 as a multiple of 6, so counted only 2 multiples: \\(\\frac{2+8}{20} = \\frac{10}{20} = \\frac{1}{2}\\). The multiples of 6 up to 20 are 6, 12 and 18."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Counted only the 8 primes: \\(\\frac{8}{20} = \\frac{2}{5}\\). The 3 multiples of 6 count too."
      },
      {
        "text": "\\(\\frac{3}{50}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{3}{20} \\times \\frac{8}{20} = \\frac{24}{400} = \\frac{3}{50}\\). 'Or' with events that cannot both happen needs adding."
      }
    ],
    "backward": "Multiples and primes.",
    "forward": "The addition rule is used for branches of tree diagrams later in this chapter."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "The probability that a student is absent on any one day is 0.04. A school has 1250 students. How many absences would you expect in total over 5 school days?",
    "options": [
      {
        "text": "50",
        "correct": false,
        "feedback": "Found the expected absences for one day only: \\(0.04 \\times 1250 = 50\\). The question asks about 5 days."
      },
      {
        "text": "6250",
        "correct": false,
        "feedback": "Multiplied \\(1250 \\times 5 = 6250\\) and never used the probability 0.04. Each student is absent with probability 0.04 each day."
      },
      {
        "text": "250",
        "correct": true,
        "feedback": "Correct. Expected absences in one day = \\(0.04 \\times 1250 = 50\\). Over 5 days: \\(50 \\times 5 = 250\\)."
      },
      {
        "text": "5000",
        "correct": false,
        "feedback": "Used 4 instead of 0.04: \\(4 \\times 1250 = 5000\\). The probability 0.04 is 4 hundredths, so one day gives 50."
      }
    ],
    "backward": "Finding a percentage of an amount, Ch3.",
    "forward": "Expected numbers are compared with actual counts in Ch15."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A biased coin lands on heads with probability 0.6. It is flipped three times. The flips are independent. What is the probability that all three flips are heads?",
    "options": [
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Gave the probability of heads for a single flip, 0.6. All three flips must be heads, so multiply three times."
      },
      {
        "text": "0.216",
        "correct": true,
        "feedback": "Correct. The flips are independent, so multiply: \\(0.6 \\times 0.6 \\times 0.6 = 0.216\\)."
      },
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Found \\(P(\\text{tails}) = 1-0.6 = 0.4\\). The question asks for three heads."
      },
      {
        "text": "0.36",
        "correct": false,
        "feedback": "Multiplied only two flips: \\(0.6 \\times 0.6 = 0.36\\). There are three flips."
      }
    ],
    "backward": "Multiplying decimals, counting decimal places.",
    "forward": "Tree diagrams later in this chapter use three-stage paths like this."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A fair die is rolled twice. What is the probability of getting exactly one 6?",
    "options": [
      {
        "text": "\\(\\frac{25}{36}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{no 6})\\): \\(\\frac{5}{6} \\times \\frac{5}{6} = \\frac{25}{36}\\). The question asks for exactly one 6."
      },
      {
        "text": "\\(\\frac{5}{36}\\)",
        "correct": false,
        "feedback": "Found only one order, 6 then not 6: \\(\\frac{1}{6} \\times \\frac{5}{6} = \\frac{5}{36}\\). Not 6 then 6 also gives exactly one 6."
      },
      {
        "text": "\\(\\frac{11}{36}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one 6})\\): \\(\\frac{1}{36}+\\frac{5}{36}+\\frac{5}{36} = \\frac{11}{36}\\). 'Exactly one' leaves out the case of two 6s."
      },
      {
        "text": "\\(\\frac{5}{18}\\)",
        "correct": true,
        "feedback": "Correct. 6 then not 6: \\(\\frac{1}{6} \\times \\frac{5}{6} = \\frac{5}{36}\\). Not 6 then 6: \\(\\frac{5}{6} \\times \\frac{1}{6} = \\frac{5}{36}\\). These cannot both happen, so add: \\(\\frac{5}{36}+\\frac{5}{36} = \\frac{10}{36} = \\frac{5}{18}\\)."
      }
    ],
    "backward": "Multiplying fractions, and the 'not' rule.",
    "forward": "Tree diagrams later in this chapter organise exactly this working."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A fair spinner has 15 equal sections numbered 1 to 15. What is the probability of landing on a factor of 24?",
    "options": [
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Missed 1 as a factor, so counted only 6 factors (2, 3, 4, 6, 8, 12): \\(\\frac{6}{15} = \\frac{2}{5}\\). The number 1 is a factor of every number."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not a factor of 24}) = \\frac{15-7}{15} = \\frac{8}{15}\\). The question asks for a factor."
      },
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Compared the 7 factors with the 8 non-factors, giving \\(\\frac{7}{8}\\). The total is all 15 sections."
      },
      {
        "text": "\\(\\frac{7}{15}\\)",
        "correct": true,
        "feedback": "Correct. The factors of 24 up to 15 are 1, 2, 3, 4, 6, 8, 12 (7 numbers), so P = \\(\\frac{7}{15}\\)."
      }
    ],
    "backward": "Finding the factors of a number, and fractions of a whole, Ch8.",
    "forward": "Counting favourable outcomes is needed for the grids later in this chapter."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped three times. What is the probability of getting exactly two heads?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Counted HHH as well as HHT, HTH and THH, which is at least two heads: \\(\\frac{4}{8} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. The 8 equally likely outcomes are HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. Exactly two heads: HHT, HTH, THH, which is 3. P = \\(\\frac{3}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Counted only one outcome with exactly two heads, giving \\(\\frac{1}{8}\\). There are three."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Listed only HHT and HTH and missed THH, giving \\(\\frac{2}{8} = \\frac{1}{4}\\)."
      }
    ],
    "backward": "Listing outcomes systematically.",
    "forward": "Tree diagrams later in this chapter show the same eight outcomes as paths."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A spinner has four sections A, B, C and D. \\(P(\\text{A}) = 0.2\\), \\(P(\\text{B}) = 0.35\\) and \\(P(\\text{C}) = 0.15\\). What is the probability that it lands on C or D?",
    "options": [
      {
        "text": "0.45",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{D}) = 1-(0.2+0.35+0.15) = 0.3\\). C and D cannot both happen, so \\(P(\\text{C or D}) = 0.15+0.3 = 0.45\\)."
      },
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Gave \\(P(\\text{C}) = 0.15\\) only. D counts too, and \\(P(\\text{D}) = 0.3\\)."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found \\(P(\\text{D}) = 0.3\\) and stopped. C counts too: add 0.15."
      },
      {
        "text": "0.55",
        "correct": false,
        "feedback": "Added \\(P(\\text{A})+P(\\text{B}) = 0.2+0.35 = 0.55\\). That is \\(P(\\text{A or B})\\), the probability of NOT C or D."
      }
    ],
    "backward": "Probabilities of all outcomes add up to 1.",
    "forward": "Tree diagrams later in this chapter use the same 'find the missing branch' step."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A fair die is rolled 300 times and a 6 appears 56 times. Which statement is best?",
    "options": [
      {
        "text": "The die must be biased, because the 56 sixes are not equal to the 50 expected.",
        "correct": false,
        "feedback": "Expected an exact match. Chance causes results to vary around the expected number, so a small difference is normal."
      },
      {
        "text": "Nothing can be said about the die, because 300 rolls is too few to learn anything.",
        "correct": false,
        "feedback": "Dismissed the data. 300 rolls give a reasonably good estimate, and 56 is close to the 50 expected."
      },
      {
        "text": "56 is close to the 50 expected, so there is no strong evidence of bias.",
        "correct": true,
        "feedback": "Correct. The expected number of sixes is \\(\\frac{1}{6} \\times 300 = 50\\). Results vary by chance, and 56 is close to 50."
      },
      {
        "text": "The expected number of sixes is 56, because that is how many sixes appeared.",
        "correct": false,
        "feedback": "Mixed up expected and actual. The expected number comes from the probability: \\(\\frac{1}{6} \\times 300 = 50\\)."
      }
    ],
    "backward": "Expected number = probability × trials.",
    "forward": "Judging whether results are 'close enough' to expected is part of interpreting results in Ch15."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Dev passes a test with probability \\(\\frac{9}{10}\\) and Eve passes it with probability \\(\\frac{5}{6}\\). Their results are independent. What is the probability that Dev passes and Eve fails?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Found Dev fails and Eve passes: \\(\\frac{1}{10} \\times \\frac{5}{6} = \\frac{5}{60} = \\frac{1}{12}\\). The question has Dev passing and Eve failing."
      },
      {
        "text": "\\(\\frac{1}{60}\\)",
        "correct": false,
        "feedback": "Found both fail: \\(\\frac{1}{10} \\times \\frac{1}{6} = \\frac{1}{60}\\). Dev must pass, so use \\(\\frac{9}{10}\\)."
      },
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{Eve fails}) = 1-\\frac{5}{6} = \\frac{1}{6}\\). Multiply: \\(\\frac{9}{10} \\times \\frac{1}{6} = \\frac{9}{60} = \\frac{3}{20}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Multiplied the two pass probabilities: \\(\\frac{9}{10} \\times \\frac{5}{6} = \\frac{3}{4}\\). Eve must fail, so use \\(1-\\frac{5}{6} = \\frac{1}{6}\\)."
      }
    ],
    "backward": "The 'not' rule, and multiplying and simplifying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along branches."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Two fair dice are rolled. What is the probability that the total is not 7?",
    "options": [
      {
        "text": "\\(\\frac{31}{36}\\)",
        "correct": false,
        "feedback": "Counted only 5 outcomes with total 7: \\(\\frac{5}{36}\\), so \\(P(\\text{not 7}) = \\frac{31}{36}\\). There are 6."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": true,
        "feedback": "Correct. A total of 7 happens in 6 of the 36 outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). So \\(P(7) = \\frac{6}{36} = \\frac{1}{6}\\) and \\(P(\\text{not 7}) = 1-\\frac{1}{6} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{total 7}) = \\frac{6}{36} = \\frac{1}{6}\\). The question asks for NOT 7."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Counted only 3 outcomes with total 7 (leaving out the reversed pairs): \\(\\frac{3}{36}\\), so \\(P(\\text{not 7}) = \\frac{33}{36} = \\frac{11}{12}\\). There are 6 such outcomes."
      }
    ],
    "backward": "Listing outcomes, and the 'not' rule.",
    "forward": "'not' probabilities simplify 'at least one' problems later in this chapter."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag has red, blue and green counters in the ratio \\(1:2:4\\). One counter is picked at random. What is the probability that it is not blue?",
    "options": [
      {
        "text": "\\(\\frac{2}{7}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{blue}) = \\frac{2}{7}\\). The question asks for NOT blue."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Compared blue with the other counters (2 parts to \\(1+4 = 5\\) parts): \\(\\frac{2}{5}\\). Probability compares with the whole, 7 parts."
      },
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{green}) = \\frac{4}{7}\\). Not blue means red or green: \\(\\frac{1}{7}+\\frac{4}{7}\\)."
      },
      {
        "text": "\\(\\frac{5}{7}\\)",
        "correct": true,
        "feedback": "Correct. The ratio has \\(1+2+4 = 7\\) parts, so \\(P(\\text{blue}) = \\frac{2}{7}\\) and \\(P(\\text{not blue}) = 1-\\frac{2}{7} = \\frac{5}{7}\\)."
      }
    ],
    "backward": "Equal parts of a ratio, Ch11.",
    "forward": "Probabilities from ratios appear again in Ch15."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled. What is the probability that the first die shows a larger number than the second?",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": true,
        "feedback": "Correct. For a first die of 2, 3, 4, 5, 6 the second die can be smaller in 1, 2, 3, 4, 5 ways: \\(1+2+3+4+5 = 15\\) of the 36 outcomes. P = \\(\\frac{15}{36} = \\frac{5}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Counted only the 6 pairs with equal scores: \\(\\frac{6}{36} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Counted all 30 pairs with different scores: \\(\\frac{30}{36} = \\frac{5}{6}\\). Only half of those have the first die larger."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": false,
        "feedback": "Counted pairs with equal scores as well (first larger or equal): \\(15+6 = 21\\) of \\(36 = \\frac{7}{12}\\)."
      }
    ],
    "backward": "Listing outcomes systematically.",
    "forward": "Sample space grids later in this chapter let you shade conditions like this."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "In a raffle, \\(P(\\text{1st prize}) = \\frac{1}{50}\\), \\(P(\\text{2nd prize}) = \\frac{1}{25}\\) and \\(P(\\text{3rd prize}) = \\frac{1}{10}\\). A ticket can win at most one prize. What is the probability that a ticket wins a prize?",
    "options": [
      {
        "text": "\\(\\frac{4}{25}\\)",
        "correct": true,
        "feedback": "Correct. A ticket cannot win two prizes, so add: \\(\\frac{1}{50}+\\frac{2}{50}+\\frac{5}{50} = \\frac{8}{50} = \\frac{4}{25}\\)."
      },
      {
        "text": "\\(\\frac{1}{12500}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{1}{50} \\times \\frac{1}{25} \\times \\frac{1}{10} = \\frac{1}{12500}\\). For 'or' with events that cannot both happen, add."
      },
      {
        "text": "\\(\\frac{3}{85}\\)",
        "correct": false,
        "feedback": "Added the numerators (\\(1+1+1 = 3\\)) and the denominators (\\(50+25+10 = 85\\)), giving \\(\\frac{3}{85}\\). Write the fractions with a common denominator before adding."
      },
      {
        "text": "\\(\\frac{21}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{no prize}) = 1-\\frac{4}{25} = \\frac{21}{25}\\). The question asks for winning a prize."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "The addition rule is used for tree diagram branches later in this chapter."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A bag has 8 counters, 3 of them red. A counter is picked at random and put back, and this is repeated 240 times. How many times would you expect to pick a red?",
    "options": [
      {
        "text": "150",
        "correct": false,
        "feedback": "Found the expected number of counters that are NOT red: \\(\\frac{5}{8} \\times 240 = 150\\). The question asks for red."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Found one-eighth of \\(240 = 30\\) and stopped. Red is 3 of the 8 parts, so multiply by 3."
      },
      {
        "text": "640",
        "correct": false,
        "feedback": "Divided \\(240 \\div (\\frac{3}{8}) = 640\\). Multiply 240 by the probability instead."
      },
      {
        "text": "90",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{red}) = \\frac{3}{8}\\), so the expected number is \\(\\frac{3}{8} \\times 240 = 90\\)."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Expected numbers are compared with actual results in Ch15."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Rain on Monday has probability 25% and rain on Tuesday has probability 40%. The two days are independent. What is the probability of rain on both days?",
    "options": [
      {
        "text": "15%",
        "correct": false,
        "feedback": "Subtracted \\(40\\%-25\\% = 15\\%\\). For 'both', multiply the probabilities."
      },
      {
        "text": "10%",
        "correct": true,
        "feedback": "Correct. Multiply: \\(0.25 \\times 0.4 = 0.1 = 10\\%\\)."
      },
      {
        "text": "62.5%",
        "correct": false,
        "feedback": "Divided \\(25 \\div 40 = 0.625 = 62.5\\%\\). For 'both', multiply the probabilities."
      },
      {
        "text": "65%",
        "correct": false,
        "feedback": "Added \\(25\\%+40\\% = 65\\%\\). For 'both', multiply the probabilities."
      }
    ],
    "backward": "Percentages as decimals, Ch3.",
    "forward": "Tree diagrams later in this chapter use the same multiplication."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A biased coin landed on heads 42 times in 60 flips. Use the relative frequency as the probability of heads. The coin is flipped twice. What is the probability of heads on the first flip and tails on the second?",
    "options": [
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Found the relative frequency of heads, \\(\\frac{7}{10}\\), and stopped. Both flips matter, so multiply by \\(\\frac{3}{10}\\)."
      },
      {
        "text": "\\(\\frac{49}{100}\\)",
        "correct": false,
        "feedback": "Found heads then heads: \\(\\frac{7}{10} \\times \\frac{7}{10} = \\frac{49}{100}\\). The second flip must be tails."
      },
      {
        "text": "\\(\\frac{21}{100}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{heads}) = \\frac{42}{60} = \\frac{7}{10}\\), so \\(P(\\text{tails}) = \\frac{3}{10}\\). The flips are independent: \\(\\frac{7}{10} \\times \\frac{3}{10} = \\frac{21}{100}\\)."
      },
      {
        "text": "\\(\\frac{9}{100}\\)",
        "correct": false,
        "feedback": "Used \\(\\frac{3}{10}\\) for both flips (tails then tails): \\(\\frac{3}{10} \\times \\frac{3}{10} = \\frac{9}{100}\\). The first flip must be heads, with probability \\(\\frac{7}{10}\\)."
      }
    ],
    "backward": "Relative frequency as a fraction, Ch11, and the 'not' rule.",
    "forward": "Estimated probabilities can be used on tree diagram branches later in this chapter."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A class of 30 students has 14 girls. Three more girls join the class. A student is chosen at random. What is the probability that the student is a boy?",
    "options": [
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Ignored the new girls: \\(\\frac{16}{30} = \\frac{8}{15}\\). The class now has 33 students."
      },
      {
        "text": "\\(\\frac{16}{33}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(30-14 = 16\\) boys. After the 3 girls join there are 33 students, so \\(P(\\text{boy}) = \\frac{16}{33}\\)."
      },
      {
        "text": "\\(\\frac{17}{33}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{girl}) = \\frac{14+3}{33} = \\frac{17}{33}\\). The question asks for a boy."
      },
      {
        "text": "\\(\\frac{13}{33}\\)",
        "correct": false,
        "feedback": "Took the 3 new students off the boys: \\(\\frac{13}{33}\\). The new students are girls, so the number of boys stays at 16."
      }
    ],
    "backward": "A part of a whole as a fraction, Ch8.",
    "forward": "Updating the total before counting is needed in every sample space problem later in this chapter."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 3-sided spinner numbered 1 to 3 and a fair 4-sided spinner numbered 1 to 4 are spun, and the two scores are multiplied. What is the probability that the product is even?",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3 \\times 4 = 12\\) equally likely pairs. The product is odd only when both scores are odd: 2 odd scores on the first spinner (1, 3) and 2 on the second (1, 3) give 4 pairs. So 8 pairs give an even product: \\(\\frac{8}{12} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Assumed even and odd products are equally likely, \\(\\frac{1}{2}\\). Count them: 8 of the 12 pairs give an even product."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Counted only the pairs where both scores are even, (2,2) and (2,4): \\(\\frac{2}{12} = \\frac{1}{6}\\). A product is even when at least one score is even."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{odd product}) = \\frac{4}{12} = \\frac{1}{3}\\). The question asks for an even product."
      }
    ],
    "backward": "Even and odd numbers, and multiplying to count outcomes.",
    "forward": "Grids later in this chapter list outcomes like this."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "In one match, \\(P(\\text{a team wins}) = 0.4\\) and \\(P(\\text{it draws}) = 0.15\\). Every match ends as a win, a draw or a loss. What is the probability that the team wins or loses?",
    "options": [
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Gave \\(P(\\text{draws}) = 0.15\\). The question asks for win or lose."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Found \\(P(\\text{loses}) = 0.45\\) and stopped. A win counts too: add 0.4."
      },
      {
        "text": "0.55",
        "correct": false,
        "feedback": "Added \\(P(\\text{wins})+P(\\text{draws}) = 0.4+0.15 = 0.55\\). That is win or draw. The question asks for win or lose."
      },
      {
        "text": "0.85",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{loses}) = 1-(0.4+0.15) = 0.45\\). A match cannot be both a win and a loss, so \\(P(\\text{wins or loses}) = 0.4+0.45 = 0.85\\)."
      }
    ],
    "backward": "Probabilities of all outcomes add up to 1.",
    "forward": "The 'missing branch' step is used in tree diagrams later in this chapter."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A spinner was spun 150 times and landed on green 36 times. Use the relative frequency as the probability of green. How many greens would you expect in 1000 spins?",
    "options": [
      {
        "text": "360",
        "correct": false,
        "feedback": "Used 36 out of 100 as the relative frequency: \\(0.36 \\times 1000 = 360\\). The experiment had 150 spins, so the relative frequency is \\(\\frac{36}{150} = 0.24\\)."
      },
      {
        "text": "4167",
        "correct": false,
        "feedback": "Divided \\(1000 \\div 0.24 \\approx 4166.67\\), about 4167. Multiply the probability by the number of spins instead."
      },
      {
        "text": "240",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{36}{150} = 0.24\\). Expected greens = \\(0.24 \\times 1000 = 240\\)."
      },
      {
        "text": "1036",
        "correct": false,
        "feedback": "Added \\(1000+36 = 1036\\). Expected number = probability × spins."
      }
    ],
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Experiments with more trials give better estimates; this matters in Ch15."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "The probability of rain is 0.2 on Monday, 0.5 on Tuesday and 0.1 on Wednesday. The days are independent. What is the probability that it rains on all three days?",
    "options": [
      {
        "text": "0.1",
        "correct": false,
        "feedback": "Multiplied only Monday and Tuesday: \\(0.2 \\times 0.5 = 0.1\\). Wednesday's 0.1 must be included."
      },
      {
        "text": "0.05",
        "correct": false,
        "feedback": "Multiplied only Tuesday and Wednesday: \\(0.5 \\times 0.1 = 0.05\\). Monday's 0.2 must be included."
      },
      {
        "text": "0.01",
        "correct": true,
        "feedback": "Correct. Multiply the three probabilities: \\(0.2 \\times 0.5 \\times 0.1 = 0.01\\)."
      },
      {
        "text": "0.8",
        "correct": false,
        "feedback": "Added \\(0.2+0.5+0.1 = 0.8\\). For 'all three', multiply."
      }
    ],
    "backward": "Multiplying decimals.",
    "forward": "Tree diagrams later in this chapter have three-stage paths like this."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A fair coin is flipped three times. What is the probability of at least one head?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Counted the outcomes with at least two heads (HHH, HHT, HTH, THH), giving \\(\\frac{4}{8} = \\frac{1}{2}\\). One head counts too."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{no heads}) = \\frac{1}{8}\\) (TTT). The question asks for at least one head."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Counted only the outcomes with exactly one head (HTT, THT, TTH), giving \\(\\frac{3}{8}\\). Two or three heads count too."
      },
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": true,
        "feedback": "Correct. The only outcome with no heads is TTT, which has probability \\(\\frac{1}{8}\\). So \\(P(\\text{at least one head}) = 1-\\frac{1}{8} = \\frac{7}{8}\\)."
      }
    ],
    "backward": "Listing outcomes, and the 'not' rule.",
    "forward": "'at least one' problems with trees use this shortcut."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A number is picked at random from 1 to 60. What is the probability that it is a multiple of 9?",
    "options": [
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": true,
        "feedback": "Correct. The multiples of 9 up to 60 are 9, 18, 27, 36, 45, 54 (6 numbers), so P = \\(\\frac{6}{60} = \\frac{1}{10}\\)."
      },
      {
        "text": "\\(\\frac{7}{60}\\)",
        "correct": false,
        "feedback": "Rounded \\(60 \\div 9 \\approx 6.67\\) up to 7 multiples: \\(\\frac{7}{60}\\). The multiples are 9, 18, 27, 36, 45, 54, which is 6."
      },
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": false,
        "feedback": "Used 9 as the number of favourable outcomes: \\(\\frac{9}{60} = \\frac{3}{20}\\). The favourable outcomes are the multiples of 9, which are 6 numbers."
      },
      {
        "text": "\\(\\frac{9}{10}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not a multiple of 9}) = \\frac{54}{60} = \\frac{9}{10}\\). The question asks for a multiple of 9."
      }
    ],
    "backward": "Multiples, and simplifying fractions, Ch8.",
    "forward": "Counting favourable outcomes carefully is needed for the grids later in this chapter."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are added. What is the probability that the total is 11 or more?",
    "options": [
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Counted only (6,6), giving \\(\\frac{1}{36}\\). A total of 11 counts too."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": true,
        "feedback": "Correct. Total 11: (5,6), (6,5). Total 12: (6,6). That is 3 of the 36 outcomes, so P = \\(\\frac{3}{36} = \\frac{1}{12}\\)."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Used the 11 different totals as the outcomes, with 2 favourable totals (11 and 12): \\(\\frac{2}{11}\\). The 36 pairs are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": false,
        "feedback": "Counted only total 11: \\(\\frac{2}{36} = \\frac{1}{18}\\). A total of 12 counts too."
      }
    ],
    "backward": "Listing outcomes in a grid.",
    "forward": "Sample space grids later in this chapter work the same way."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "Each student joins exactly one club: chess, drama, music or sport. \\(P(\\text{chess}) = \\frac{1}{5}\\), \\(P(\\text{drama}) = \\frac{1}{4}\\) and \\(P(\\text{music}) = \\frac{1}{10}\\). What is the probability that a student joins chess or sport?",
    "options": [
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Added \\(P(\\text{chess})+P(\\text{music}) = \\frac{4}{20}+\\frac{2}{20} = \\frac{6}{20} = \\frac{3}{10}\\). That is chess or music. The question asks for chess or sport."
      },
      {
        "text": "\\(\\frac{9}{20}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{sport}) = \\frac{9}{20}\\) and stopped. Chess counts too: add \\(\\frac{4}{20}\\)."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": false,
        "feedback": "Added \\(P(\\text{chess})+P(\\text{drama})+P(\\text{music}) = \\frac{4}{20}+\\frac{5}{20}+\\frac{2}{20} = \\frac{11}{20}\\), which is \\(P(\\text{not sport})\\). The question asks for chess or sport."
      },
      {
        "text": "\\(\\frac{13}{20}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{sport}) = 1-(\\frac{4}{20}+\\frac{5}{20}+\\frac{2}{20}) = \\frac{9}{20}\\). A student joins only one club, so \\(P(\\text{chess or sport}) = \\frac{4}{20}+\\frac{9}{20} = \\frac{13}{20}\\)."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "The 'missing branch' step is used in tree diagrams later in this chapter."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A drawing pin landed point up 36 times in 90 drops. Use the relative frequency as the probability of landing point up. How many point-up landings would you expect in 250 drops?",
    "options": [
      {
        "text": "36",
        "correct": false,
        "feedback": "Repeated the 36 from the first experiment. The question asks about 250 new drops."
      },
      {
        "text": "625",
        "correct": false,
        "feedback": "Divided \\(250 \\div 0.4 = 625\\). Multiply the probability by the number of drops instead."
      },
      {
        "text": "100",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{36}{90} = 0.4\\). Expected = \\(0.4 \\times 250 = 100\\)."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Found the expected number of point-down landings: \\(0.6 \\times 250 = 150\\). The question asks for point up."
      }
    ],
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Estimates from experiments are interpreted in Ch15."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "The probability that lamp A works is \\(\\frac{3}{4}\\) and the probability that lamp B works is \\(\\frac{4}{9}\\). The lamps work independently. What is the probability that both work?",
    "options": [
      {
        "text": "\\(\\frac{11}{36}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{3}{4}-\\frac{4}{9} = \\frac{27}{36}-\\frac{16}{36} = \\frac{11}{36}\\). For 'both', multiply."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. Multiply: \\(\\frac{3}{4} \\times \\frac{4}{9} = \\frac{12}{36} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Gave lamp A's probability, \\(\\frac{3}{4}\\), only. Lamp B must work too, so multiply by \\(\\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{7}{13}\\)",
        "correct": false,
        "feedback": "Added the numerators (\\(3+4 = 7\\)) and the denominators (\\(4+9 = 13\\)): \\(\\frac{7}{13}\\). Multiply numerators and denominators: \\(\\frac{12}{36}\\)."
      }
    ],
    "backward": "Multiplying and simplifying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along branches."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Sam is late with probability 0.2 and Tia is late with probability 0.1, independently. What is the probability that exactly one of them is late?",
    "options": [
      {
        "text": "0.26",
        "correct": true,
        "feedback": "Correct. Sam late and Tia not: \\(0.2 \\times 0.9 = 0.18\\). Tia late and Sam not: \\(0.8 \\times 0.1 = 0.08\\). These cannot both happen, so add: \\(0.18+0.08 = 0.26\\)."
      },
      {
        "text": "0.18",
        "correct": false,
        "feedback": "Found only Sam late and Tia on time: \\(0.2 \\times 0.9 = 0.18\\). Tia late and Sam on time (\\(0.8 \\times 0.1 = 0.08\\)) also counts."
      },
      {
        "text": "0.02",
        "correct": false,
        "feedback": "Found the probability that both are late: \\(0.2 \\times 0.1 = 0.02\\). The question asks for exactly one."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Added \\(0.2+0.1 = 0.3\\). That counts the case where both are late twice, and ignores the probabilities of the other person being on time."
      }
    ],
    "backward": "The 'not' rule, multiplying decimals.",
    "forward": "Tree diagrams later in this chapter organise exactly this working."
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
    title: "Probability — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Two-step probability — finding a missing probability then combining it, sample-space grids, simple tree diagrams, and expected numbers from experiments — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. This level asks for two steps in most questions: first find or list what you need (a missing probability, a total, a list of outcomes), then combine it. Write each step down before you choose an answer. For each question, ask yourself first: is it 'or' (add, when events cannot happen together) or 'and' (multiply, when events do not affect each other), and do I need to find 'not' first? If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

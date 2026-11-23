

// seed/mathSeedCh12ProbabilityL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 12
// (Probability), Level 4 — converted from the standalone diagnostic
// JSON ch12-probability-level-4.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh12ProbabilityL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-12-probability";
const CHAPTER_NAME = "Probability";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Cards are numbered 1 to 25 and one is picked at random. What is the probability that the number is a square number?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Compared the 5 squares with the 20 non-squares: \\(\\frac{5}{20} = \\frac{1}{4}\\). The total is all 25 cards."
      },
      {
        "text": "\\(\\frac{4}{25}\\)",
        "correct": false,
        "feedback": "Missed one square, listing 4, 9, 16 and 25 but not 1: \\(\\frac{4}{25}\\). The number 1 is \\(1 \\times 1\\), a square."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": true,
        "feedback": "Correct. The squares are 1, 4, 9, 16 and 25, which is 5 of the 25 cards. P = \\(\\frac{5}{25} = \\frac{1}{5}\\)."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not a square}) = \\frac{20}{25} = \\frac{4}{5}\\). The question asks for a square number."
      }
    ],
    "retryHint": "List the square numbers up to 25 and count them.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Ch15 uses the same count-then-divide step with data."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "S",
    "question": "A fair coin is flipped and a fair 4-sided spinner numbered 1 to 4 is spun. What is the probability of tails and a number greater than 2?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(2 \\times 4 = 8\\) equally likely outcomes. Tails with a 3 or 4 gives T3 and T4, which is 2 outcomes. P = \\(\\frac{2}{8} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Counted 3 favourable outcomes by including H3: \\(\\frac{3}{8}\\). The coin must show tails."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Counted 6 outcomes \\((2+4)\\) instead of \\(2 \\times 4 = 8\\): \\(\\frac{2}{6} = \\frac{1}{3}\\). Each coin result pairs with each spinner result."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{tails}) = \\frac{1}{2}\\) only. The spinner must show 3 or 4 as well."
      }
    ],
    "retryHint": "Count all the outcomes first (coin × spinner), then list those that are tails with 3 or 4.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Ch12 grids later in this level use the same count."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "tier": "C",
    "question": "A spinner lands on red, blue, green or yellow. \\(P(\\text{red}) = 0.15\\), \\(P(\\text{blue}) = 0.4\\) and \\(P(\\text{green}) = 0.25\\). What is the probability that it lands on yellow or red?",
    "options": [
      {
        "text": "0.65",
        "correct": false,
        "feedback": "Found \\(P(\\text{blue or green}) = 0.4+0.25 = 0.65\\). The question asks for yellow or red."
      },
      {
        "text": "0.35",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{yellow}) = 1-(0.15+0.4+0.25) = 1-0.8 = 0.2\\). Yellow and red cannot both happen, so \\(P(\\text{yellow or red}) = 0.2+0.15 = 0.35\\)."
      },
      {
        "text": "0.2",
        "correct": false,
        "feedback": "Found \\(P(\\text{yellow}) = 0.2\\) and stopped. Red counts too: add 0.15."
      },
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Gave \\(P(\\text{red}) = 0.15\\) only. Yellow counts too."
      }
    ],
    "retryHint": "Find \\(P(\\text{yellow})\\) first, using the fact that all four probabilities add to 1.",
    "backward": "The probabilities of all outcomes add to 1.",
    "forward": "Ch15 finds missing probabilities in data tables the same way."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "tier": "S",
    "question": "A spinner landed on green 21 times in 60 spins. Use the relative frequency to estimate how many times it would land on green in 300 spins.",
    "options": [
      {
        "text": "150",
        "correct": false,
        "feedback": "Assumed green comes up half the time: \\(300 \\div 2 = 150\\). The relative frequency is \\(\\frac{21}{60} = 0.35\\)."
      },
      {
        "text": "195",
        "correct": false,
        "feedback": "Found the estimate for NOT green: \\(0.65 \\times 300 = 195\\). The question asks for green."
      },
      {
        "text": "360",
        "correct": false,
        "feedback": "Added \\(300+60 = 360\\). An estimate is relative frequency × number of spins."
      },
      {
        "text": "105",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{21}{60} = 0.35\\), so the estimate is \\(0.35 \\times 300 = 105\\)."
      }
    ],
    "retryHint": "Find the relative frequency first, then scale it up to 300 spins.",
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Ch15 compares estimates like this with real data."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "tier": "S",
    "question": "Priya passes a maths test with probability 0.6 and a science test with probability 0.9. The two results are independent. What is the probability that she passes both?",
    "options": [
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Averaged the two probabilities: \\((0.6+0.9) \\div 2 = 0.75\\). 'Both' needs multiplying."
      },
      {
        "text": "0.54",
        "correct": true,
        "feedback": "Correct. For independent events, multiply: \\(0.6 \\times 0.9 = 0.54\\)."
      },
      {
        "text": "0.96",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one pass}) = 1-0.4 \\times 0.1 = 0.96\\). The question asks for both."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Subtracted \\(0.9-0.6 = 0.3\\). 'Both' for independent events needs multiplying."
      }
    ],
    "retryHint": "The two tests are independent, so decide whether to add or multiply.",
    "backward": "Multiplying decimals.",
    "forward": "Ch12 tree diagrams later in this level multiply along branches in the same way."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "tier": "H",
    "question": "Each day the probability of rain is 0.2, independently of other days. What is the probability that it rains on at least one of three days?",
    "options": [
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Added \\(0.2+0.2+0.2 = 0.6\\). Rainy days can overlap, so adding overcounts; use 1 minus the probability of no rain."
      },
      {
        "text": "0.8",
        "correct": false,
        "feedback": "Gave \\(P(\\text{no rain}) = 0.8\\) for a single day. The question asks about at least one rainy day in three."
      },
      {
        "text": "0.512",
        "correct": false,
        "feedback": "Found \\(P(\\text{no rain on all three days}) = 0.512\\) and stopped. 'At least one' is the opposite: \\(1-0.512\\)."
      },
      {
        "text": "0.488",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{no rain on a day}) = 0.8\\), so \\(P(\\text{no rain on all three}) = 0.8 \\times 0.8 \\times 0.8 = 0.512\\). \\(P(\\text{at least one rainy day}) = 1-0.512 = 0.488\\)."
      }
    ],
    "retryHint": "Find the probability that it does not rain on any of the three days first.",
    "backward": "The 'not' rule, and multiplying decimals.",
    "forward": "Ch15 uses this 'at least one' route for larger numbers of trials."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "tier": "S",
    "question": "A bag has 30 counters: 11 are red, 8 are blue and the rest are green. One counter is picked at random. What is the probability that it is green?",
    "options": [
      {
        "text": "\\(\\frac{11}{30}\\)",
        "correct": true,
        "feedback": "Correct. Green counters: \\(30-11-8 = 11\\). \\(P(\\text{green}) = \\frac{11}{30}\\)."
      },
      {
        "text": "\\(\\frac{19}{30}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not green}) = \\frac{11+8}{30} = \\frac{19}{30}\\). The question asks for green."
      },
      {
        "text": "\\(\\frac{11}{19}\\)",
        "correct": false,
        "feedback": "Compared the 11 green counters with the 19 other counters: \\(\\frac{11}{19}\\). The total is all 30 counters."
      },
      {
        "text": "\\(\\frac{4}{15}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{blue}) = \\frac{8}{30} = \\frac{4}{15}\\). The question asks for green."
      }
    ],
    "retryHint": "Find how many green counters there are first.",
    "backward": "Fractions of a whole, Ch8.",
    "forward": "Ch15 reads probabilities from frequency tables."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "T",
    "question": "A fair coin is flipped and a fair die is rolled. What is the probability of tails or an even number (or both)?",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{tails and even}) = \\frac{3}{12} = \\frac{1}{4}\\). 'Or' includes every outcome in either group."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{tails}) = \\frac{1}{2}\\) only. Heads with an even number counts too."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. There are 12 equally likely outcomes. Tails gives T1 to T6 (6 outcomes) and heads with an even number gives H2, H4 and H6 (3 more). That is 9 outcomes, so P = \\(\\frac{9}{12} = \\frac{3}{4}\\)."
      },
      {
        "text": "1",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{2}+\\frac{1}{2} = 1\\). T2, T4 and T6 are in both groups, so adding counts them twice."
      }
    ],
    "retryHint": "Count the outcomes that are tails, then the ones that are even, and watch for any outcome in both groups.",
    "backward": "Listing outcomes, and simplifying fractions, Ch8.",
    "forward": "Ch12 later items show why 'or' needs care when events overlap."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "tier": "S",
    "question": "A raffle has 200 tickets. Maya buys 12 of them. What is the probability that Maya holds the winning ticket?",
    "options": [
      {
        "text": "\\(\\frac{3}{50}\\)",
        "correct": true,
        "feedback": "Correct. P = \\(\\frac{12}{200} = \\frac{3}{50}\\)."
      },
      {
        "text": "\\(\\frac{3}{25}\\)",
        "correct": false,
        "feedback": "Divided 12 by 100 instead of 200: \\(\\frac{12}{100} = \\frac{3}{25}\\). There are 200 tickets."
      },
      {
        "text": "\\(\\frac{3}{47}\\)",
        "correct": false,
        "feedback": "Compared Maya's 12 tickets with the 188 other tickets: \\(\\frac{12}{188} = \\frac{3}{47}\\). The total is all 200 tickets."
      },
      {
        "text": "\\(\\frac{47}{50}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{Maya does not win}) = \\frac{188}{200} = \\frac{47}{50}\\). The question asks for her winning."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Ch15 uses sample sizes as denominators in the same way."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "C",
    "question": "Two fair dice are rolled and the scores are multiplied. The grid shows every product. What is the probability that the product is greater than 20?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 364\" width=\"384\" height=\"364\"><rect x=\"0\" y=\"0\" width=\"384\" height=\"364\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"59\" font-family=\"sans-serif\" font-size=\"16\" fill=\"#666666\" text-anchor=\"middle\">×</text><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"272\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"316\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"272\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"316\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"272\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"316\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"52\" y=\"164\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"140\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"184\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"228\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"272\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">15</text><rect x=\"316\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">18</text><rect x=\"52\" y=\"208\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"96\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"140\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"184\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"228\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">16</text><rect x=\"272\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">20</text><rect x=\"316\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">24</text><rect x=\"52\" y=\"252\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"96\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"140\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"184\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">15</text><rect x=\"228\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">20</text><rect x=\"272\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">25</text><rect x=\"316\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">30</text><rect x=\"52\" y=\"296\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"96\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"140\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><rect x=\"184\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">18</text><rect x=\"228\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">24</text><rect x=\"272\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">30</text><rect x=\"316\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">36</text><text x=\"228\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Second die</text><text x=\"18\" y=\"208\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 208)\">First die</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{5}{36}\\)",
        "correct": false,
        "feedback": "Counted (4,6) but not (6,4): \\(\\frac{5}{36}\\). Each ordered pair is a separate outcome."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Counted products of 20 or more, 8 cells: \\(\\frac{8}{36} = \\frac{2}{9}\\). (4,5) and (5,4) give exactly 20, which is not greater than 20."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Counted only pairs with both scores at least 5: \\(\\frac{4}{36} = \\frac{1}{9}\\). (4,6) and (6,4) also give more than 20."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. The grid has 36 cells. Products greater than 20 are 24, 24, 25, 30, 30 and 36, which is 6 cells. P = \\(\\frac{6}{36} = \\frac{1}{6}\\)."
      }
    ],
    "backward": "Multiplication tables, and simplifying fractions, Ch8.",
    "forward": "Ch12 later items read conditions off grids in the same way."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "tier": "S",
    "question": "Each person chooses exactly one of tea, coffee or juice. \\(P(\\text{tea}) = 0.42\\) and \\(P(\\text{coffee}) = 0.31\\). What is the probability that a person chooses juice?",
    "options": [
      {
        "text": "0.1302",
        "correct": false,
        "feedback": "Multiplied \\(0.42 \\times 0.31 = 0.1302\\). Outcomes that cannot happen together are added, not multiplied."
      },
      {
        "text": "0.27",
        "correct": true,
        "feedback": "Correct. The probabilities add to 1, so \\(P(\\text{juice}) = 1-0.42-0.31 = 0.27\\)."
      },
      {
        "text": "0.73",
        "correct": false,
        "feedback": "Found \\(P(\\text{tea or coffee}) = 0.42+0.31 = 0.73\\). The question asks for juice."
      },
      {
        "text": "0.11",
        "correct": false,
        "feedback": "Subtracted \\(0.42-0.31 = 0.11\\). Juice is what is left from 1 after taking away both tea and coffee."
      }
    ],
    "backward": "The probabilities of all outcomes add to 1.",
    "forward": "Ch15 finds missing probabilities in tables the same way."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "tier": "C",
    "question": "A biased coin landed heads 72 times in 120 flips. Use the relative frequency to estimate how many tails you would expect in 250 flips.",
    "options": [
      {
        "text": "180",
        "correct": false,
        "feedback": "Treated 72 as a percentage: \\(0.72 \\times 250 = 180\\). The 72 heads were out of 120 flips, and tails is the question."
      },
      {
        "text": "125",
        "correct": false,
        "feedback": "Assumed tails comes up half the time: \\(250 \\div 2 = 125\\). The results show tails 0.4 of the time."
      },
      {
        "text": "100",
        "correct": true,
        "feedback": "Correct. Tails in 120 flips: \\(120-72 = 48\\), so \\(P(\\text{tails}) = \\frac{48}{120} = 0.4\\). Expected tails = \\(0.4 \\times 250 = 100\\)."
      },
      {
        "text": "150",
        "correct": false,
        "feedback": "Found the expected number of heads: \\(0.6 \\times 250 = 150\\). The question asks for tails."
      }
    ],
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Ch15 compares estimates like this with real data."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "tier": "T",
    "question": "A phone and a laptop each fail within a year with probabilities 0.2 and 0.1, independently. What is the probability that at least one of them fails?",
    "options": [
      {
        "text": "0.02",
        "correct": false,
        "feedback": "Found \\(P(\\text{both fail}) = 0.2 \\times 0.1 = 0.02\\). At least one includes cases where only one fails."
      },
      {
        "text": "0.72",
        "correct": false,
        "feedback": "Found \\(P(\\text{neither fails}) = 0.72\\) and stopped. 'At least one' is the opposite: \\(1-0.72\\)."
      },
      {
        "text": "0.28",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{neither fails}) = 0.8 \\times 0.9 = 0.72\\), so \\(P(\\text{at least one fails}) = 1-0.72 = 0.28\\)."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Added \\(0.2+0.1 = 0.3\\). Both can fail together, so adding counts that case twice."
      }
    ],
    "backward": "The 'not' rule, and multiplying decimals.",
    "forward": "Ch12 tree diagrams later in this level use the same route."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "tier": "H",
    "question": "A bag has 5 red, 3 blue and 2 green counters. A counter is picked, its colour noted, and it is put back. This is done three times. What is the probability that all three counters are the same colour?",
    "options": [
      {
        "text": "0.48",
        "correct": false,
        "feedback": "Multiplied the correct total by 3: \\(0.16 \\times 3 = 0.48\\). The three cases are different colours, not three copies of the same case."
      },
      {
        "text": "0.16",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{red}) = 0.5\\), \\(P(\\text{blue}) = 0.3\\), \\(P(\\text{green}) = 0.2\\). All red: \\(0.5 \\times 0.5 \\times 0.5 = 0.125\\). All blue: 0.027. All green: 0.008. These cannot happen together, so add: \\(0.125+0.027+0.008 = 0.16\\)."
      },
      {
        "text": "0.03",
        "correct": false,
        "feedback": "Found one order of three different colours: \\(0.5 \\times 0.3 \\times 0.2 = 0.03\\). That is not the same colour three times."
      },
      {
        "text": "0.125",
        "correct": false,
        "feedback": "Found only 'all red': 0.125. 'All blue' and 'all green' count too."
      }
    ],
    "backward": "Multiplying decimals.",
    "forward": "Ch12 tree diagrams later in this level organise this kind of working."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "tier": "S",
    "question": "A fruit bowl holds 4 apples, 6 pears, 5 plums and 3 kiwis. One piece of fruit is picked at random. What is the probability that it is a pear or a plum?",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Counted only the pears: \\(\\frac{6}{18} = \\frac{1}{3}\\). Plums count too."
      },
      {
        "text": "\\(\\frac{5}{18}\\)",
        "correct": false,
        "feedback": "Counted only the plums: \\(\\frac{5}{18}\\). Pears count too."
      },
      {
        "text": "\\(\\frac{7}{18}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{apple or kiwi}) = \\frac{4+3}{18} = \\frac{7}{18}\\). The question asks for pear or plum."
      },
      {
        "text": "\\(\\frac{11}{18}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(4+6+5+3 = 18\\) pieces. Pears or plums: \\(6+5 = 11\\), so P = \\(\\frac{11}{18}\\)."
      }
    ],
    "backward": "Fractions of a whole, Ch8.",
    "forward": "Ch15 adds up frequencies in the same way."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "C",
    "question": "A fair 3-sided spinner (numbered 1 to 3) and a fair 5-sided spinner (numbered 1 to 5) are spun and the scores are added. What is the probability that the total is 7?",
    "options": [
      {
        "text": "\\(\\frac{2}{15}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3 \\times 5 = 15\\) equally likely pairs. Total 7: (2,5) and (3,4), which is 2 pairs. P = \\(\\frac{2}{15}\\)."
      },
      {
        "text": "\\(\\frac{1}{7}\\)",
        "correct": false,
        "feedback": "Used the 7 different totals (2 to 8) as the outcomes, giving \\(\\frac{1}{7}\\). The 15 pairs are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{4}{15}\\)",
        "correct": false,
        "feedback": "Counted the reversed pairs (5,2) and (4,3) as well, giving 4 pairs: \\(\\frac{4}{15}\\). The first spinner only goes up to 3, so those pairs cannot happen."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Counted 3 pairs by including (3,5), which totals 8: \\(\\frac{3}{15} = \\frac{1}{5}\\). Only (2,5) and (3,4) total 7."
      }
    ],
    "backward": "Multiplying to count outcomes.",
    "forward": "Ch12 grids in this chapter list outcomes the same way."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "tier": "S",
    "question": "Events A and B cannot happen at the same time. \\(P(\\text{A or B}) = 0.9\\) and \\(P(\\text{A}) = 0.6\\). What is \\(P(\\text{B})\\)?",
    "options": [
      {
        "text": "0.54",
        "correct": false,
        "feedback": "Multiplied \\(0.9 \\times 0.6 = 0.54\\). For events that cannot both happen, \\(P(\\text{A or B})\\) is a sum, so subtract \\(P(\\text{A})\\) from it."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Halved 0.9 to get 0.45, assuming A and B are equally likely. Subtract \\(P(\\text{A})\\) from 0.9 instead."
      },
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Found \\(P(\\text{not A}) = 1-0.6 = 0.4\\). That includes the 'neither' outcomes as well as B."
      },
      {
        "text": "0.3",
        "correct": true,
        "feedback": "Correct. The events cannot both happen, so \\(P(\\text{A or B}) = P(\\text{A})+P(\\text{B})\\). \\(P(\\text{B}) = 0.9-0.6 = 0.3\\)."
      }
    ],
    "backward": "The addition rule for events that cannot happen together.",
    "forward": "Ch15 finds missing probabilities in data tables the same way."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "tier": "T",
    "question": "The probability that a spinner lands on red is 0.3. It is spun 80 times and lands on red 20 times. By how many does the observed number of reds differ from the number you would expect?",
    "options": [
      {
        "text": "6",
        "correct": false,
        "feedback": "Found \\(0.3 \\times 20 = 6\\), using the observed number as the number of spins. Use \\(0.3 \\times 80\\) for the expected number."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Gave the observed number of reds, 20. The question asks for the difference from the expected number."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. Expected number = \\(0.3 \\times 80 = 24\\). Observed = 20. The difference is \\(24-20 = 4\\)."
      },
      {
        "text": "24",
        "correct": false,
        "feedback": "Gave the expected number, 24. The question asks for the difference between 24 and 20."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Ch15 compares expected and observed results in this way."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "tier": "T",
    "question": "A biased coin lands on heads with probability 0.4. It is flipped twice, independently. What is the probability of exactly one head?",
    "options": [
      {
        "text": "0.48",
        "correct": true,
        "feedback": "Correct. Heads then tails: \\(0.4 \\times 0.6 = 0.24\\). Tails then heads: \\(0.6 \\times 0.4 = 0.24\\). These cannot both happen, so add: \\(0.24+0.24 = 0.48\\)."
      },
      {
        "text": "0.16",
        "correct": false,
        "feedback": "Found \\(P(\\text{two heads}) = 0.4 \\times 0.4 = 0.16\\). The question asks for exactly one head."
      },
      {
        "text": "0.64",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one head}) = 1-0.6 \\times 0.6 = 0.64\\). That includes two heads."
      },
      {
        "text": "0.24",
        "correct": false,
        "feedback": "Found only one order (heads then tails): 0.24. Tails then heads also gives exactly one head."
      }
    ],
    "backward": "The 'not' rule, and multiplying decimals.",
    "forward": "Ch12 tree diagrams later in this level organise this working."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "tier": "H",
    "question": "Machine A makes 60% of a factory's items and 5% of its items are faulty. Machine B makes the other 40% and 10% of its items are faulty. The tree diagram shows the machine, then whether the item is faulty. What is the probability that a random item is faulty?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 372\" width=\"640\" height=\"372\"><rect x=\"0\" y=\"0\" width=\"640\" height=\"372\" fill=\"#ffffff\"/><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"94\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"132.42\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.6</text><line x1=\"56\" y1=\"186\" x2=\"236\" y2=\"278\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"140.08\" y=\"247.58\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.4</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"54\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"65.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.05</text><line x1=\"236\" y1=\"94\" x2=\"420\" y2=\"134\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"130.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.95</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"238\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"249.3\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.1</text><line x1=\"236\" y1=\"278\" x2=\"420\" y2=\"318\" stroke=\"#333333\" stroke-width=\"2\"/><text x=\"325.24\" y=\"314.7\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#c0392b\" font-weight=\"bold\" text-anchor=\"middle\">0.9</text><circle cx=\"56\" cy=\"186\" r=\"4.5\" fill=\"#333333\"/><circle cx=\"236\" cy=\"94\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"84\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">Machine A</text><circle cx=\"236\" cy=\"278\" r=\"4.5\" fill=\"#333333\"/><text x=\"228\" y=\"298\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"end\">Machine B</text><circle cx=\"420\" cy=\"54\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Machine A, Faulty</text><circle cx=\"420\" cy=\"134\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"139\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Machine A, Not faulty</text><circle cx=\"420\" cy=\"238\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"243\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Machine B, Faulty</text><circle cx=\"420\" cy=\"318\" r=\"4.5\" fill=\"#333333\"/><text x=\"432\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\">Machine B, Not faulty</text><text x=\"236\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Machine</text><text x=\"420\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#666666\" text-anchor=\"middle\">Item</text></svg></div>",
    "options": [
      {
        "text": "0.075",
        "correct": false,
        "feedback": "Averaged the two fault rates: \\((0.05+0.1) \\div 2 = 0.075\\). The machines make different shares, so weight each rate by its share."
      },
      {
        "text": "0.07",
        "correct": true,
        "feedback": "Correct. Machine A and faulty: \\(0.6 \\times 0.05 = 0.03\\). Machine B and faulty: \\(0.4 \\times 0.1 = 0.04\\). These paths cannot both happen, so add: \\(0.03+0.04 = 0.07\\)."
      },
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Added \\(0.05+0.1 = 0.15\\). Each fault rate applies only to that machine's share of the items."
      },
      {
        "text": "0.03",
        "correct": false,
        "feedback": "Found only the Machine A path: \\(0.6 \\times 0.05 = 0.03\\). The Machine B path also gives faulty items."
      }
    ],
    "backward": "Percentages and decimals, Ch3.",
    "forward": "Ch12 later items use trees with unequal branches in this way."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "tier": "H",
    "question": "A bag has 6 red and 9 blue counters. How many red counters must be added so that the probability of picking red is \\(\\frac{2}{3}\\)?",
    "options": [
      {
        "text": "9",
        "correct": false,
        "feedback": "Added 9 reds to match the 9 blues: 15 red out of 24 is \\(\\frac{5}{8}\\), not \\(\\frac{2}{3}\\)."
      },
      {
        "text": "12",
        "correct": true,
        "feedback": "Correct. For \\(P(\\text{red}) = \\frac{2}{3}\\), red must be twice blue. Blue stays at 9, so red must be 18. Add \\(18-6 = 12\\). (Check: \\(\\frac{18}{27} = \\frac{2}{3}\\).)"
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Added 6, doubling the reds: 12 red out of 21 is \\(\\frac{4}{7}\\), not \\(\\frac{2}{3}\\)."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Added 3 to make the numbers equal: 9 red and 9 blue gives \\(\\frac{1}{2}\\), not \\(\\frac{2}{3}\\)."
      }
    ],
    "backward": "Forming equations, Ch4.",
    "forward": "Ch15 works backwards from probabilities to counts in the same way."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "C",
    "question": "A café meal is one of 5 starters, one of 3 mains and one of 2 desserts, chosen at random. What is the probability that the meal has the soup starter and the cake dessert?",
    "options": [
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(5 \\times 3 \\times 2 = 30\\) equally likely meals. With soup and cake, the main can be any of 3, so 3 meals. P = \\(\\frac{3}{30} = \\frac{1}{10}\\)."
      },
      {
        "text": "\\(\\frac{1}{7}\\)",
        "correct": false,
        "feedback": "Added \\(5+2 = 7\\) instead of multiplying the choices: \\(\\frac{1}{7}\\). Each starter and dessert pairs with each main."
      },
      {
        "text": "\\(\\frac{9}{10}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not soup and cake}) = \\frac{27}{30} = \\frac{9}{10}\\). The question asks for soup and cake."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{soup starter}) = \\frac{1}{5}\\) only. The dessert must be cake as well."
      }
    ],
    "backward": "Multiplying to count outcomes.",
    "forward": "Ch12 sample-space questions in this chapter count in the same way."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "tier": "T",
    "question": "A card is picked at random from cards numbered 1 to 10. Event A is 'an even number' and event B is 'a multiple of 3'. What is the probability of A or B (or both)?",
    "options": [
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{even and a multiple of 3}) = \\frac{1}{10}\\), only the number 6. 'Or' counts numbers in either group."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{5}{10}+\\frac{3}{10} = \\frac{8}{10} = \\frac{4}{5}\\). The number 6 is both even and a multiple of 3, so it was counted twice."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": true,
        "feedback": "Correct. Even: 2, 4, 6, 8, 10 (5 numbers). Multiples of 3: 3, 6, 9 (3 numbers). The number 6 is in both, so \\(5+3-1 = 7\\) numbers are in A or B. P = \\(\\frac{7}{10}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{even}) = \\frac{5}{10} = \\frac{1}{2}\\) only. The multiples of 3 that are odd, 3 and 9, count too."
      }
    ],
    "backward": "Listing outcomes, and fractions of a whole, Ch8.",
    "forward": "Ch15 checks whether events overlap before adding frequencies."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "tier": "T",
    "question": "A fair die is rolled 60 times and a 6 appears 15 times. The same die is then rolled 120 more times. How many 6s would you expect in those 120 rolls?",
    "options": [
      {
        "text": "24",
        "correct": false,
        "feedback": "Divided \\(120 \\div 5 = 24\\), as if the die had 5 faces. A fair die has 6 faces."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Used the relative frequency \\(\\frac{15}{60} = 0.25\\): \\(0.25 \\times 120 = 30\\). The die is fair, so use \\(P(6) = \\frac{1}{6}\\)."
      },
      {
        "text": "45",
        "correct": false,
        "feedback": "Multiplied \\(15 \\times 3 = 45\\) as though 120 rolls were three times 60 rolls. It is twice, and the fair die gives \\(\\frac{1}{6}\\) anyway."
      },
      {
        "text": "20",
        "correct": true,
        "feedback": "Correct. The die is fair, so \\(P(6) = \\frac{1}{6}\\) and the expected number is \\(120 \\div 6 = 20\\). A short run of results does not change the probability of a fair die."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Ch15 compares expected and observed results in this way."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Independent events",
    "tier": "S",
    "question": "Tom, Una and Vic arrive on time independently, with probabilities 0.9, 0.8 and 0.5. What is the probability that all three arrive on time?",
    "options": [
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Multiplied only Una and Vic: \\(0.8 \\times 0.5 = 0.4\\). Tom's 0.9 must be included."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Multiplied only Tom and Vic: \\(0.9 \\times 0.5 = 0.45\\). Una's 0.8 must be included."
      },
      {
        "text": "0.36",
        "correct": true,
        "feedback": "Correct. Multiply the three probabilities: \\(0.9 \\times 0.8 \\times 0.5 = 0.36\\)."
      },
      {
        "text": "0.72",
        "correct": false,
        "feedback": "Multiplied only the first two: \\(0.9 \\times 0.8 = 0.72\\). Vic's 0.5 must be included."
      }
    ],
    "backward": "Multiplying decimals.",
    "forward": "Ch12 tree diagrams in this chapter multiply along paths in the same way."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "tier": "H",
    "question": "A spinner landed on 1 on 12 of 40 spins, on 2 on 8 of 40 spins and on 3 on the rest. Use the relative frequencies as probabilities. The spinner is spun twice. What is the probability that the total is 4?",
    "options": [
      {
        "text": "0.04",
        "correct": false,
        "feedback": "Found only (2,2): 0.04. The pairs (1,3) and (3,1) also give a total of 4."
      },
      {
        "text": "0.19",
        "correct": false,
        "feedback": "Missed the order (3,1): \\(0.15+0.04 = 0.19\\). Both (1,3) and (3,1) give a total of 4."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Missed the pair (2,2): \\(0.15+0.15 = 0.3\\). Two 2s also give a total of 4."
      },
      {
        "text": "0.34",
        "correct": true,
        "feedback": "Correct. \\(P(1) = 0.3\\), \\(P(2) = 0.2\\), \\(P(3) = 0.5\\). Total 4: (1,3) is \\(0.3 \\times 0.5 = 0.15\\), (3,1) is 0.15 and (2,2) is \\(0.2 \\times 0.2 = 0.04\\). These cannot happen together, so add: \\(0.15+0.15+0.04 = 0.34\\)."
      }
    ],
    "backward": "Relative frequency, Ch11, and multiplying decimals.",
    "forward": "Ch12 tree diagrams in this chapter organise this working."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "tier": "S",
    "question": "A box holds 8 red, 12 blue and 5 green pencils. One is picked at random. What is the probability that it is not blue?",
    "options": [
      {
        "text": "\\(\\frac{12}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{blue}) = \\frac{12}{25}\\). The question asks for NOT blue."
      },
      {
        "text": "\\(\\frac{13}{25}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(8+12+5 = 25\\) pencils. Not blue: \\(8+5 = 13\\), so P = \\(\\frac{13}{25}\\)."
      },
      {
        "text": "\\(\\frac{8}{25}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red}) = \\frac{8}{25}\\). Green pencils are not blue as well."
      },
      {
        "text": "\\(\\frac{13}{20}\\)",
        "correct": false,
        "feedback": "Found \\(\\frac{13}{20}\\) by dividing by 20 (the red and blue pencils) and leaving the green ones out of the total. The total is all 25 pencils."
      }
    ],
    "backward": "The 'not' rule, and fractions of a whole, Ch8.",
    "forward": "Ch15 uses 'not' probabilities with data."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "tier": "C",
    "question": "Ben picks one of 5 hats and one of 4 scarves at random. One hat is red and 3 of the scarves are red. What is the probability that he picks a red hat and a red scarf?",
    "options": [
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(5 \\times 4 = 20\\) equally likely pairs. Red hat with a red scarf: \\(1 \\times 3 = 3\\) pairs. P = \\(\\frac{3}{20}\\)."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Added \\(1+3 = 4\\) favourable pairs: \\(\\frac{4}{20} = \\frac{1}{5}\\). The favourable pairs are \\(1 \\times 3\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red scarf}) = \\frac{3}{4}\\) only. The hat must be red as well."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not a red scarf}) = \\frac{1}{4}\\). The question asks about a red hat and a red scarf."
      }
    ],
    "backward": "Multiplying to count outcomes.",
    "forward": "Ch12 sample-space questions in this chapter count in the same way."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A tin holds 26 sweets: 7 mint, 9 toffee and the rest fruit. One sweet is picked at random. What is the probability that it is fruit?",
    "options": [
      {
        "text": "\\(\\frac{19}{26}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not mint}) = \\frac{19}{26}\\). The question asks for fruit."
      },
      {
        "text": "\\(\\frac{5}{13}\\)",
        "correct": true,
        "feedback": "Correct. Fruit sweets: \\(26-7-9 = 10\\). \\(P(\\text{fruit}) = \\frac{10}{26} = \\frac{5}{13}\\)."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Compared the 10 fruit sweets with the 16 other sweets: \\(\\frac{10}{16} = \\frac{5}{8}\\). The total is all 26 sweets."
      },
      {
        "text": "\\(\\frac{8}{13}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not fruit}) = \\frac{16}{26} = \\frac{8}{13}\\). The question asks for fruit."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Ch15 reads probabilities from frequency tables."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped and a fair die is rolled. What is the probability of heads and a factor of 6?",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{factor of 6}) = \\frac{4}{6} = \\frac{2}{3}\\) only. The coin must show heads as well."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Counted only H1, H2 and H3, missing H6: \\(\\frac{3}{12} = \\frac{1}{4}\\). Six is a factor of 6."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{heads}) = \\frac{1}{2}\\) only. The die must show a factor of 6 as well."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(2 \\times 6 = 12\\) equally likely outcomes. Heads with 1, 2, 3 or 6 gives 4 outcomes. P = \\(\\frac{4}{12} = \\frac{1}{3}\\)."
      }
    ],
    "backward": "Factors, and simplifying fractions, Ch8.",
    "forward": "Ch12 grids in this level list outcomes the same way."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A spinner lands on A, B, C or D. \\(P(\\text{A}) = 0.3\\), \\(P(\\text{B}) = 0.2\\), \\(P(\\text{C}) = x\\) and \\(P(\\text{D}) = 4x\\). What is \\(P(\\text{D})\\)?",
    "options": [
      {
        "text": "0.4",
        "correct": true,
        "feedback": "Correct. The probabilities add to 1: \\(0.3+0.2+x+4x = 1\\), so \\(5x = 0.5\\) and \\(x = 0.1\\). \\(P(\\text{D}) = 4x = 0.4\\)."
      },
      {
        "text": "0.7",
        "correct": false,
        "feedback": "Found \\(P(\\text{not A}) = 1-0.3 = 0.7\\). The question asks for \\(P(\\text{D})\\)."
      },
      {
        "text": "0.1",
        "correct": false,
        "feedback": "Found \\(x = 0.1\\), which is \\(P(\\text{C})\\). \\(P(\\text{D})\\) is \\(4x\\)."
      },
      {
        "text": "0.5",
        "correct": false,
        "feedback": "Found \\(5x = 0.5\\), the probability of C or D together. The question asks for D only."
      }
    ],
    "backward": "Forming and solving equations, Ch4.",
    "forward": "Ch15 finds unknown probabilities in the same way."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A spinner landed on 3 in 18 of 120 spins. Use the relative frequency to estimate how many times it would land on 3 in 500 spins.",
    "options": [
      {
        "text": "18",
        "correct": false,
        "feedback": "Repeated the 18 from the first 120 spins. The question asks about 500 spins."
      },
      {
        "text": "90",
        "correct": false,
        "feedback": "Treated 18 as a percentage: \\(0.18 \\times 500 = 90\\). The 18 landings were out of 120 spins, so \\(\\frac{18}{120} = 0.15\\)."
      },
      {
        "text": "75",
        "correct": true,
        "feedback": "Correct. Relative frequency = \\(\\frac{18}{120} = 0.15\\), so the estimate is \\(0.15 \\times 500 = 75\\)."
      },
      {
        "text": "425",
        "correct": false,
        "feedback": "Found the estimate for NOT landing on 3: \\(0.85 \\times 500 = 425\\). The question asks for 3."
      }
    ],
    "backward": "A ratio as a decimal, Ch11.",
    "forward": "Ch15 compares estimates like this with real data."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Events A and B are independent. \\(P(\\text{A}) = \\frac{3}{4}\\) and \\(P(\\text{B}) = \\frac{2}{3}\\). What is the probability that neither A nor B happens?",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{exactly one}) = \\frac{3}{4} \\times \\frac{1}{3}+\\frac{1}{4} \\times \\frac{2}{3} = \\frac{5}{12}\\). The question asks for neither."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{at least one}) = 1-\\frac{1}{12} = \\frac{11}{12}\\). The question asks for neither."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{not A}) = \\frac{1}{4}\\) and \\(P(\\text{not B}) = \\frac{1}{3}\\). For independent events, multiply: \\(\\frac{1}{4} \\times \\frac{1}{3} = \\frac{1}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{both}) = \\frac{3}{4} \\times \\frac{2}{3} = \\frac{1}{2}\\). The question asks for neither."
      }
    ],
    "backward": "The 'not' rule, and multiplying fractions, Ch8.",
    "forward": "Ch15 uses 'neither' to find 'at least one'."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Spinner A lands on red with probability 0.6 and on blue with probability 0.4. Spinner B lands on red with probability 0.25 and on blue with probability 0.75. Each is spun once, independently. What is the probability that the two colours are different?",
    "options": [
      {
        "text": "0.55",
        "correct": true,
        "feedback": "Correct. A red and B blue: \\(0.6 \\times 0.75 = 0.45\\). A blue and B red: \\(0.4 \\times 0.25 = 0.1\\). These cannot happen together, so add: \\(0.45+0.1 = 0.55\\)."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Found only A red and B blue: 0.45. A blue and B red also gives different colours."
      },
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Found both red: \\(0.6 \\times 0.25 = 0.15\\). The question asks for different colours."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found both blue: \\(0.4 \\times 0.75 = 0.3\\). The question asks for different colours."
      }
    ],
    "backward": "Multiplying decimals.",
    "forward": "Ch12 tree diagrams in this level organise this working."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "Red, blue and green marbles are in the ratio \\(3:4:5\\). One marble is picked at random. What is the probability that it is not green?",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{green}) = \\frac{5}{12}\\). The question asks for NOT green."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red}) = \\frac{3}{12} = \\frac{1}{4}\\). Blue marbles are not green as well."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{red or green}) = \\frac{8}{12} = \\frac{2}{3}\\). The question asks for not green."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": true,
        "feedback": "Correct. The total is \\(3+4+5 = 12\\) parts. Green is 5 parts, so \\(P(\\text{not green}) = \\frac{7}{12}\\)."
      }
    ],
    "backward": "Sharing in a ratio, Ch11.",
    "forward": "Ch15 turns ratios into probabilities in the same way."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair dice are rolled and the scores are added. What is the probability that the total is a prime number?",
    "options": [
      {
        "text": "\\(\\frac{7}{18}\\)",
        "correct": false,
        "feedback": "Missed the total of 2 (1 pair): \\(\\frac{14}{36} = \\frac{7}{18}\\). A total of 2 is prime."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": true,
        "feedback": "Correct. Prime totals and their pairs: 2 (1), 3 (2), 5 (4), 7 (6), 11 (2). That is 15 of the 36 outcomes, so P = \\(\\frac{15}{36} = \\frac{5}{12}\\)."
      },
      {
        "text": "\\(\\frac{5}{11}\\)",
        "correct": false,
        "feedback": "Used the 11 different totals as the outcomes, with 5 prime totals: \\(\\frac{5}{11}\\). The 36 pairs are equally likely; the totals are not."
      },
      {
        "text": "\\(\\frac{13}{36}\\)",
        "correct": false,
        "feedback": "Missed the total of 11 (2 pairs): \\(\\frac{13}{36}\\). A total of 11 is prime."
      }
    ],
    "backward": "Prime numbers, and simplifying fractions, Ch8.",
    "forward": "Ch12 grids in this level make this count easier."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "In a game, \\(P(\\text{win or draw}) = 0.8\\) and \\(P(\\text{win}) = 0.35\\). What is the probability of a draw?",
    "options": [
      {
        "text": "0.45",
        "correct": true,
        "feedback": "Correct. Win and draw cannot both happen, so \\(P(\\text{draw}) = 0.8-0.35 = 0.45\\)."
      },
      {
        "text": "0.8",
        "correct": false,
        "feedback": "Gave \\(P(\\text{win or draw}) = 0.8\\). That includes winning as well as drawing."
      },
      {
        "text": "0.2",
        "correct": false,
        "feedback": "Found \\(P(\\text{lose}) = 1-0.8 = 0.2\\). The question asks for a draw."
      },
      {
        "text": "0.65",
        "correct": false,
        "feedback": "Found \\(P(\\text{not win}) = 1-0.35 = 0.65\\). That includes losing as well as drawing."
      }
    ],
    "backward": "The addition rule for events that cannot happen together.",
    "forward": "Ch15 finds missing probabilities in tables the same way."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A fair die is rolled 240 times. How many times would you expect a score of 5 or 6?",
    "options": [
      {
        "text": "40",
        "correct": false,
        "feedback": "Found the expected number of 6s only: \\(240 \\div 6 = 40\\). A 5 counts too."
      },
      {
        "text": "80",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{5 or 6}) = \\frac{2}{6} = \\frac{1}{3}\\), so the expected number is \\(240 \\div 3 = 80\\)."
      },
      {
        "text": "120",
        "correct": false,
        "feedback": "Assumed half of the rolls: \\(240 \\div 2 = 120\\). Two of the six faces count, which is \\(\\frac{1}{3}\\)."
      },
      {
        "text": "160",
        "correct": false,
        "feedback": "Found the expected number of scores that are NOT 5 or 6: \\(\\frac{4}{6} \\times 240 = 160\\). The question asks for 5 or 6."
      }
    ],
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Ch15 compares expected and observed results in this way."
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
    title: "Probability — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every probability cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: 25 minutes for 20 questions, which is about 75 seconds each. Each question carries a tag. S means speed: answer it on sight. C means core: work it steadily. H means hard: if it is taking more than two minutes, mark it and move on. T means trap: a tempting wrong answer is waiting, so slow down and ask what the question really wants (exactly or at least, add or multiply, one outcome or all of them). Skip anything that stalls you and come back at the end. Your timing and your choices tell us as much as your score, so use the full strategy.</p><p>The clock starts when you begin question 1.</p>",
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

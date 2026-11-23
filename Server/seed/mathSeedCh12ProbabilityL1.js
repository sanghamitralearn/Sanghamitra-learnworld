

// seed/mathSeedCh12ProbabilityL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 12
// (Probability), Level 1 — converted from the standalone diagnostic
// JSON ch12-probability-level-1.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh12ProbabilityL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-12-probability";
const CHAPTER_NAME = "Probability";
const LEVEL = 1;

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
    "question": "A bag holds 3 red, 5 blue and 2 green counters. One counter is picked at random. What is the probability that it is red?",
    "options": [
      {
        "text": "\\(\\frac{3}{7}\\)",
        "correct": false,
        "feedback": "Compared red with the other colours, 3 to \\(5+2 = 7\\), giving \\(\\frac{3}{7}\\). Probability compares red with all the counters, red ones included."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Compared red with blue only (3 out of 5), giving \\(\\frac{3}{5}\\). The total must include every counter: \\(3+5+2 = 10\\)."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3+5+2 = 10\\) counters and 3 of them are red, so \\(P(\\text{red}) = \\frac{3}{10}\\)."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Found the probability of NOT red: \\(\\frac{5+2}{10} = \\frac{7}{10}\\). The question asks for red."
      }
    ],
    "retryHint": "Count all the counters first. The probability is the number of red counters divided by that total.",
    "backward": "A part of a whole written as a fraction, Ch8.",
    "forward": "The same 'favourable ÷ total' idea gives probabilities from a sample space grid later in this chapter."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped and a fair 4-sided spinner numbered 1 to 4 is spun. How many different outcomes are possible?",
    "options": [
      {
        "text": "8",
        "correct": true,
        "feedback": "Correct. Each of the 2 coin results pairs with each of the 4 spinner results: \\(2 \\times 4 = 8\\) (H1, H2, H3, H4, T1, T2, T3, T4)."
      },
      {
        "text": "4",
        "correct": false,
        "feedback": "Counted only the spinner results (4). The coin gives 2 results for each of them."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Counted only the coin results (2). The spinner gives 4 results for each of them."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Added \\(2+4 = 6\\). Each coin result pairs with every spinner result, so multiply instead of adding."
      }
    ],
    "retryHint": "Pair each coin result with each spinner number. How many pairs can you make?",
    "backward": "Multiplying to count combinations, like rows × columns in an array.",
    "forward": "Later in this chapter you show all these outcomes in a sample space grid."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "The probability that a train is late is 0.2 and the probability that it is cancelled is 0.05. A train cannot be both late and cancelled. What is the probability that a train is late or cancelled?",
    "options": [
      {
        "text": "0.15",
        "correct": false,
        "feedback": "Subtracted \\(0.2-0.05 = 0.15\\). For 'or' with events that cannot both happen, add the probabilities."
      },
      {
        "text": "0.01",
        "correct": false,
        "feedback": "Multiplied \\(0.2 \\times 0.05 = 0.01\\). Multiplying is for 'and' with independent events. For 'or' with events that cannot both happen, add."
      },
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Found the probability that the train is neither late nor cancelled: \\(1-0.25 = 0.75\\). The question asks for late or cancelled."
      },
      {
        "text": "0.25",
        "correct": true,
        "feedback": "Correct. The two events cannot happen together, so add their probabilities: \\(0.2+0.05 = 0.25\\)."
      }
    ],
    "retryHint": "The two events cannot both happen, so there is no overlap to worry about. Combine the two probabilities with the operation that gives the chance of either one.",
    "backward": "Adding decimals by lining up the decimal points.",
    "forward": "Tree diagrams later in this chapter add the probabilities of outcomes that cannot happen together."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A coin was flipped 40 times and landed on heads 18 times. What is the relative frequency of heads?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave the theoretical probability of heads for a fair coin, \\(\\frac{1}{2}\\). Relative frequency comes from the actual results: 18 heads in 40 flips."
      },
      {
        "text": "\\(\\frac{9}{20}\\)",
        "correct": true,
        "feedback": "Correct. Relative frequency = number of heads ÷ number of flips = \\(\\frac{18}{40} = \\frac{9}{20}\\)."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": false,
        "feedback": "Used the tails count: \\(40-18 = 22\\) and \\(\\frac{22}{40} = \\frac{11}{20}\\). The question asks about heads."
      },
      {
        "text": "\\(\\frac{9}{11}\\)",
        "correct": false,
        "feedback": "Compared heads with tails (18 to 22), giving \\(\\frac{18}{22} = \\frac{9}{11}\\). Relative frequency compares heads with all 40 flips."
      }
    ],
    "retryHint": "Relative frequency is the number of times the event happened divided by the total number of trials.",
    "backward": "A ratio written as a fraction in simplest form, Ch11.",
    "forward": "With many trials, the relative frequency estimates a probability, which you then use to find expected numbers later in this chapter."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A fair coin is flipped and a fair die is rolled. The two results do not affect each other. \\(P(\\text{heads}) = \\frac{1}{2}\\) and \\(P(6) = \\frac{1}{6}\\). What is the probability of heads and a 6?",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{1}{2}-\\frac{1}{6} = \\frac{1}{3}\\). 'Both happen' is less likely than either one alone, so multiply, which makes the answer smaller."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": true,
        "feedback": "Correct. The events are independent, so multiply: \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Ignored the coin and gave \\(P(6) = \\frac{1}{6}\\). Both events must happen, so multiply \\(P(6)\\) by \\(P(\\text{heads})\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{2}+\\frac{1}{6} = \\frac{2}{3}\\). For 'and' with independent events, multiply the probabilities."
      }
    ],
    "retryHint": "For 'A and B' with independent events, multiply the two probabilities: multiply the numerators, then the denominators.",
    "backward": "Multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along each branch."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "The probability that it rains tomorrow is 0.35. What is the probability that it does not rain?",
    "options": [
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Subtracted digit by digit and left the 5 unchanged: took 0.3 from 1 to get 0.7 and wrote 5 after it, giving 0.75. Write 1 as 1.00 and subtract 0.35 to get 0.65."
      },
      {
        "text": "0.35",
        "correct": false,
        "feedback": "Gave \\(P(\\text{rain}) = 0.35\\) itself. 'Does not rain' is the opposite event, so subtract from 1."
      },
      {
        "text": "0.5",
        "correct": false,
        "feedback": "Assumed rain and no rain are equally likely and gave 0.5. They are only equally likely if \\(P(\\text{rain})\\) is 0.5; here \\(P(\\text{rain}) = 0.35\\), so subtract from 1."
      },
      {
        "text": "0.65",
        "correct": true,
        "feedback": "Correct. Rain and no rain cover every possibility, so \\(P(\\text{no rain}) = 1-0.35 = 0.65\\)."
      }
    ],
    "retryHint": "An event happening and not happening have probabilities that add up to 1. Write 1 as 1.00 and subtract.",
    "backward": "Subtracting a decimal from 1.",
    "forward": "The same 'not' rule gives 'at least one' probabilities in tree diagrams later in this chapter."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "Two fair coins are flipped. The four possible outcomes are HH, HT, TH and TT, and they are equally likely. What is the probability of exactly one head?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Exactly one head happens in HT and TH, which is 2 of the 4 outcomes: \\(\\frac{2}{4} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Treated HT and TH as the same outcome, so counted 3 outcomes with 1 favourable, giving \\(\\frac{1}{3}\\). HT and TH are different outcomes."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Counted only HT, giving \\(\\frac{1}{4}\\). TH also has exactly one head."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Counted the outcomes with at least one head (HH, HT, TH), giving \\(\\frac{3}{4}\\). 'Exactly one' leaves out HH."
      }
    ],
    "retryHint": "List the outcomes that have exactly one head, then write that count over 4.",
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Sample space grids later in this chapter list outcomes this way."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A fair die is rolled 120 times. How many times would you expect to roll a 4?",
    "options": [
      {
        "text": "114",
        "correct": false,
        "feedback": "Subtracted \\(120-6 = 114\\). The expected number is \\(\\frac{1}{6}\\) of the 120 rolls."
      },
      {
        "text": "720",
        "correct": false,
        "feedback": "Multiplied \\(120 \\times 6 = 720\\). A probability of \\(\\frac{1}{6}\\) means 1 part in 6, so divide 120 by 6."
      },
      {
        "text": "20",
        "correct": true,
        "feedback": "Correct. Expected number = probability × trials = \\(\\frac{1}{6} \\times 120 = 20\\)."
      },
      {
        "text": "126",
        "correct": false,
        "feedback": "Added \\(120+6 = 126\\). An expected number is a fraction of the rolls: \\(\\frac{1}{6}\\) of 120."
      }
    ],
    "retryHint": "Expected number = probability × number of trials. What fraction of the rolls should show a 4?",
    "backward": "Finding a fraction of an amount, Ch8.",
    "forward": "Later in this chapter you compare expected numbers with actual results to judge whether a die is fair."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A bag has 3 red, 7 yellow and 5 green sweets. One sweet is picked at random. What is the probability that it is yellow?",
    "options": [
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Compared yellow with the other sweets (\\(3+5 = 8\\)), giving \\(\\frac{7}{8}\\). The total includes the yellow sweets: 15."
      },
      {
        "text": "\\(\\frac{7}{15}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3+7+5 = 15\\) sweets and 7 are yellow, so \\(P(\\text{yellow}) = \\frac{7}{15}\\)."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Found \\(P(\\text{not yellow}) = \\frac{3+5}{15} = \\frac{8}{15}\\). The question asks for yellow."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Compared yellow with red only (7 out of \\(3+7 = 10\\)), giving \\(\\frac{7}{10}\\). Use all 15 sweets."
      }
    ],
    "backward": "A part of a whole as a fraction, Ch8.",
    "forward": "Equally likely outcomes are counted the same way in a sample space later in this chapter."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped and a fair 3-sided spinner numbered 1, 2, 3 is spun. Which list shows all the possible outcomes?",
    "options": [
      {
        "text": "H1, H2, H3, H1, T2, T3",
        "correct": false,
        "feedback": "Wrote H1 twice and left out T1. Each outcome should appear once: go through each coin result in turn and pair it with all three spinner numbers."
      },
      {
        "text": "H, T, 1, 2, 3",
        "correct": false,
        "feedback": "Listed the single results instead of pairs. One outcome of this experiment combines a coin result with a spinner result, such as H2."
      },
      {
        "text": "H1, H2, H3",
        "correct": false,
        "feedback": "Listed only the outcomes with heads. Tails also pairs with each spinner number, giving T1, T2, T3."
      },
      {
        "text": "H1, H2, H3, T1, T2, T3",
        "correct": true,
        "feedback": "Correct. Go through each coin result in turn and pair it with each spinner number: heads gives H1, H2, H3 and tails gives T1, T2, T3. That is \\(2 \\times 3 = 6\\) outcomes."
      }
    ],
    "backward": "Multiplying to count combinations.",
    "forward": "The same systematic listing builds a sample space grid later in this chapter."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A spinner lands on red, blue or green. \\(P(\\text{red}) = \\frac{1}{6}\\) and \\(P(\\text{blue}) = \\frac{1}{4}\\). The spinner can only land on one colour at a time. What is the probability that it lands on red or blue?",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": true,
        "feedback": "Correct. The events cannot happen together, so add: \\(\\frac{1}{6}+\\frac{1}{4} = \\frac{2}{12}+\\frac{3}{12} = \\frac{5}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{1}{4}-\\frac{1}{6} = \\frac{3}{12}-\\frac{2}{12} = \\frac{1}{12}\\). For 'or', add the probabilities."
      },
      {
        "text": "\\(\\frac{1}{24}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{1}{6} \\times \\frac{1}{4} = \\frac{1}{24}\\). Multiplying is for 'and' with independent events. For 'or' with events that cannot both happen, add."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": false,
        "feedback": "Found the probability of green instead: \\(1-(\\frac{1}{6}+\\frac{1}{4}) = 1-\\frac{5}{12} = \\frac{7}{12}\\). The question asks for red or blue."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "Tree diagrams later in this chapter add probabilities in the same way."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A drawing pin was dropped 80 times and landed point up 52 times. What is the relative frequency of landing point up?",
    "options": [
      {
        "text": "0.35",
        "correct": false,
        "feedback": "Used the point-down count: \\(80-52 = 28\\) and \\(28 \\div 80 = 0.35\\). The question asks for point up."
      },
      {
        "text": "0.52",
        "correct": false,
        "feedback": "Treated 52 as 52 out of 100 and wrote 0.52. There were 80 drops, so divide 52 by 80."
      },
      {
        "text": "0.65",
        "correct": true,
        "feedback": "Correct. Relative frequency = point-up count ÷ number of drops = \\(52 \\div 80 = 0.65\\)."
      },
      {
        "text": "0.39",
        "correct": false,
        "feedback": "Added the 52 point-up drops to the 80 drops to get 132 and divided: \\(52 \\div 132 \\approx 0.39\\). The 80 drops already include the 52 point-up drops."
      }
    ],
    "backward": "Dividing to write a ratio as a decimal, Ch11.",
    "forward": "With many more drops, this value becomes a good estimate of the probability."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "The probability of rain on Saturday is 0.4 and on Sunday is 0.3. The two days are independent. What is the probability that it rains on both days?",
    "options": [
      {
        "text": "0.4",
        "correct": false,
        "feedback": "Gave \\(P(\\text{rain on Saturday}) = 0.4\\) only. Rain is needed on both days, so multiply by \\(P(\\text{rain on Sunday})\\)."
      },
      {
        "text": "0.1",
        "correct": false,
        "feedback": "Subtracted \\(0.4-0.3 = 0.1\\). For 'both happen', multiply the probabilities."
      },
      {
        "text": "0.12",
        "correct": true,
        "feedback": "Correct. Independent events, so multiply: \\(0.4 \\times 0.3 = 0.12\\) (\\(4 \\times 3 = 12\\), with two decimal places in total)."
      },
      {
        "text": "0.7",
        "correct": false,
        "feedback": "Added \\(0.4+0.3 = 0.7\\). For 'and' with independent events, multiply."
      }
    ],
    "backward": "Multiplying decimals, counting decimal places.",
    "forward": "Tree diagrams later in this chapter multiply along branches."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A spinner lands on A, B or C. \\(P(\\text{A}) = 0.25\\) and \\(P(\\text{B}) = 0.4\\). What is the probability that it does not land on C?",
    "options": [
      {
        "text": "0.65",
        "correct": true,
        "feedback": "Correct. Not C means A or B, and these cannot both happen, so add: \\(0.25+0.4 = 0.65\\). (Check: \\(P(\\text{C}) = 1-0.65 = 0.35\\).)"
      },
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{B})\\): \\(1-0.4 = 0.6\\). That left out A's share. Not C means A or B: \\(0.25+0.4\\)."
      },
      {
        "text": "0.35",
        "correct": false,
        "feedback": "Found \\(P(\\text{C}) = 1-(0.25+0.4) = 0.35\\). The question asks for NOT C."
      },
      {
        "text": "0.75",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{A})\\): \\(1-0.25 = 0.75\\). That left out B's share. Not C means A or B: \\(0.25+0.4\\)."
      }
    ],
    "backward": "Adding probabilities of events that cannot happen together, and the 'not' rule from earlier in this chapter.",
    "forward": "'at least one' probabilities in tree diagrams use the same pairing of add and subtract."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "The probability that Dev wins a chess game is \\(\\frac{3}{8}\\). What is the probability that Dev does not win?",
    "options": [
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{win}) = \\frac{3}{8}\\) itself. 'Does not win' is the opposite event: subtract from 1."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Compared wins with non-wins (3 to \\(8-3 = 5\\)) and wrote \\(\\frac{3}{5}\\). The fraction \\(\\frac{3}{8}\\) means 3 out of every 8, so not winning is 5 out of 8."
      },
      {
        "text": "\\(\\frac{8}{11}\\)",
        "correct": false,
        "feedback": "Read \\(\\frac{3}{8}\\) as '3 wins to 8 losses', so the total is \\(3+8 = 11\\) and the losses are \\(\\frac{8}{11}\\). The fraction \\(\\frac{3}{8}\\) already means 3 out of 8 in total."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": true,
        "feedback": "Correct. Winning and not winning cover every possibility: \\(1-\\frac{3}{8} = \\frac{8}{8}-\\frac{3}{8} = \\frac{5}{8}\\)."
      }
    ],
    "backward": "Subtracting fractions from 1, Ch8.",
    "forward": "The 'not' rule gives 'at least one' probabilities later in this chapter."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 3-sided spinner (1, 2, 3) and a fair 4-sided spinner (1, 2, 3, 4) are spun and the scores are added. The grid shows every possible total. What is the probability that the total is 5?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 296 232\" width=\"296\" height=\"232\"><rect x=\"0\" y=\"0\" width=\"296\" height=\"232\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"59\" font-family=\"sans-serif\" font-size=\"16\" fill=\"#666666\" text-anchor=\"middle\">+</text><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"164\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"140\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"184\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"228\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><text x=\"184\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">4-sided spinner</text><text x=\"18\" y=\"142\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 142)\">3-sided spinner</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{3}{7}\\)",
        "correct": false,
        "feedback": "Used \\(3+4 = 7\\) as the number of outcomes, giving \\(\\frac{3}{7}\\). The grid has \\(3 \\times 4 = 12\\) cells."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. The grid has \\(3 \\times 4 = 12\\) equally likely cells and the total 5 appears in 3 of them, so P = \\(\\frac{3}{12} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Read 'total 5' as 5 favourable outcomes, giving \\(\\frac{5}{12}\\). The 5 is the score being looked for; count how many cells show it."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Counted only one cell showing 5, giving \\(\\frac{1}{12}\\). The total 5 appears in 3 cells (\\(1+4\\), \\(2+3\\) and \\(3+2\\))."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Later in this chapter you find probabilities from larger grids in the same way."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A bag has red, blue and yellow counters. \\(P(\\text{red}) = 0.1\\) and \\(P(\\text{blue}) = 0.55\\). Every counter is red, blue or yellow. What is the probability that a counter is yellow?",
    "options": [
      {
        "text": "0.9",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{red})\\): \\(1-0.1 = 0.9\\). That left out blue's 0.55."
      },
      {
        "text": "0.65",
        "correct": false,
        "feedback": "Added \\(0.1+0.55 = 0.65\\) and stopped. That is \\(P(\\text{red or blue})\\); subtract it from 1 to get yellow."
      },
      {
        "text": "0.45",
        "correct": false,
        "feedback": "Subtracted only \\(P(\\text{blue})\\): \\(1-0.55 = 0.45\\). That left out red's 0.1."
      },
      {
        "text": "0.35",
        "correct": true,
        "feedback": "Correct. The probabilities of all the outcomes add up to 1, so \\(P(\\text{yellow}) = 1-(0.1+0.55) = 0.35\\)."
      }
    ],
    "backward": "Subtracting decimals from 1.",
    "forward": "Tree diagram branches from one point always add to 1, so you can fill in a missing branch."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "The probability that a light bulb is faulty is 0.03. A batch has 2000 bulbs. How many faulty bulbs would you expect?",
    "options": [
      {
        "text": "600",
        "correct": false,
        "feedback": "Used 0.3 instead of 0.03: \\(0.3 \\times 2000 = 600\\). 0.03 is 3%, not 30%."
      },
      {
        "text": "60",
        "correct": true,
        "feedback": "Correct. Expected number = probability × number of bulbs = \\(0.03 \\times 2000 = 60\\)."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Used 0.003 instead of 0.03: \\(0.003 \\times 2000 = 6\\). 0.03 has two decimal places, so 3 hundredths."
      },
      {
        "text": "1940",
        "correct": false,
        "feedback": "Found the number expected not to be faulty: \\(2000-60 = 1940\\). The question asks for faulty bulbs."
      }
    ],
    "backward": "Finding a percentage of an amount, Ch3.",
    "forward": "Comparing expected numbers with actual counts is how you judge results in Ch15."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Each seed planted has an 80% chance of growing, independently of the others. Two seeds are planted. What is the probability that both grow?",
    "options": [
      {
        "text": "6.4%",
        "correct": false,
        "feedback": "Worked out \\(0.8 \\times 0.8 = 0.64\\) but wrote it as 6.4% by multiplying by 10 instead of 100. As a percentage, \\(0.64 = 64\\%\\)."
      },
      {
        "text": "20%",
        "correct": false,
        "feedback": "Gave the chance that a single seed fails to grow: \\(100\\%-80\\% = 20\\%\\). The question asks for both seeds growing."
      },
      {
        "text": "64%",
        "correct": true,
        "feedback": "Correct. Independent events, so multiply: \\(0.8 \\times 0.8 = 0.64 = 64\\%\\)."
      },
      {
        "text": "16%",
        "correct": false,
        "feedback": "Found the chance that the first seed grows and the second does not: \\(0.8 \\times 0.2 = 0.16 = 16\\%\\). The question asks for both seeds growing."
      }
    ],
    "backward": "Percentages as decimals, Ch3.",
    "forward": "Tree diagrams later in this chapter multiply along branches in the same way."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Mia scores a penalty with probability 0.7 each time, independently. She takes two penalties. What is the probability that she misses both?",
    "options": [
      {
        "text": "0.09",
        "correct": true,
        "feedback": "Correct. \\(P(\\text{miss}) = 1-0.7 = 0.3\\). The penalties are independent, so \\(P(\\text{miss both}) = 0.3 \\times 0.3 = 0.09\\)."
      },
      {
        "text": "0.6",
        "correct": false,
        "feedback": "Added the two miss probabilities: \\(0.3+0.3 = 0.6\\). 'Both' needs multiplication."
      },
      {
        "text": "0.49",
        "correct": false,
        "feedback": "Found the probability that she scores both: \\(0.7 \\times 0.7 = 0.49\\). The question asks for missing both."
      },
      {
        "text": "0.3",
        "correct": false,
        "feedback": "Found \\(P(\\text{a single miss}) = 1-0.7 = 0.3\\) and stopped. Both penalties must be missed, so multiply \\(0.3 \\times 0.3\\)."
      }
    ],
    "backward": "The 'not' rule and multiplying decimals.",
    "forward": "'at least one' problems are solved the same way, by finding 'none' first."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "The probability that a bus is on time is 85%. What is the probability that it is not on time?",
    "options": [
      {
        "text": "15%",
        "correct": true,
        "feedback": "Correct. On time and not on time cover every possibility, so \\(100\\%-85\\% = 15\\%\\)."
      },
      {
        "text": "85%",
        "correct": false,
        "feedback": "Gave \\(P(\\text{on time}) = 85\\%\\) itself. 'Not on time' is the opposite event: subtract from 100%."
      },
      {
        "text": "0.15%",
        "correct": false,
        "feedback": "Worked out \\(1-0.85 = 0.15\\) correctly but wrote it as 0.15% without converting. As a percentage, \\(0.15 = 15\\%\\)."
      },
      {
        "text": "1.5%",
        "correct": false,
        "feedback": "Worked out \\(1-0.85 = 0.15\\) correctly but then wrote it as 1.5% by multiplying by 10 instead of 100. As a percentage, \\(0.15 = 15\\%\\)."
      }
    ],
    "backward": "Percentages of a whole, Ch3.",
    "forward": "The 'not' rule is used again for 'at least one' problems later in this chapter."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A café meal is one sandwich and one drink. There are 3 different sandwiches and 4 different drinks. How many different meals are possible?",
    "options": [
      {
        "text": "4",
        "correct": false,
        "feedback": "Counted only the drinks (4). Each drink can go with 3 different sandwiches."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Counted only the sandwiches (3). Each sandwich can go with 4 different drinks."
      },
      {
        "text": "12",
        "correct": true,
        "feedback": "Correct. Each of the 3 sandwiches pairs with each of the 4 drinks: \\(3 \\times 4 = 12\\) meals."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Added \\(3+4 = 7\\). Each sandwich can go with every drink, so multiply."
      }
    ],
    "backward": "Multiplying to count the cells of a grid.",
    "forward": "Sample space grids later in this chapter count outcomes in the same way."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A number is picked at random from 1 to 10. Which pair of events cannot happen at the same time (are mutually exclusive)?",
    "options": [
      {
        "text": "'a square number' and 'an odd number'",
        "correct": false,
        "feedback": "Both happen for 1 and 9, which are squares and odd. Events that can happen together are not mutually exclusive."
      },
      {
        "text": "'a prime number' and 'a multiple of 4'",
        "correct": true,
        "feedback": "Correct. The primes up to 10 are 2, 3, 5, 7 and the multiples of 4 are 4, 8. No number is in both lists, so the events cannot happen together."
      },
      {
        "text": "'an even number' and 'a multiple of 5'",
        "correct": false,
        "feedback": "Both happen when the number is 10, which is even and a multiple of 5. Events that can happen together are not mutually exclusive."
      },
      {
        "text": "'less than 6' and 'an odd number'",
        "correct": false,
        "feedback": "Both happen for 1, 3 and 5, which are below 6 and odd. Events that can happen together are not mutually exclusive."
      }
    ],
    "backward": "Recognising prime numbers and multiples.",
    "forward": "The addition rule for 'A or B' only works for events like these."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A biased coin is flipped by four students. Each records the relative frequency of heads. Whose result is most likely to be closest to the true probability of heads?",
    "options": [
      {
        "text": "Aisha: 0.7 from 10 flips",
        "correct": false,
        "feedback": "Judged by the value (0.7) without checking the number of flips. With only 10 flips a relative frequency can easily be far from the true probability."
      },
      {
        "text": "Ben: 0.58 from 50 flips",
        "correct": false,
        "feedback": "Picked 0.58, the value closest to 0.5, but this coin is biased, so being near 0.5 means nothing. It also comes from 50 flips, fewer than Cara's 300."
      },
      {
        "text": "Dan: 0.8 from 5 flips",
        "correct": false,
        "feedback": "Picked the highest relative frequency (0.8). A bigger value is not more reliable: it comes from only 5 flips."
      },
      {
        "text": "Cara: 0.62 from 300 flips",
        "correct": true,
        "feedback": "Correct. Relative frequency settles down towards the true probability as the number of trials grows, so the result from the most flips (300) is the most reliable."
      }
    ],
    "backward": "Relative frequency as heads ÷ flips.",
    "forward": "Later in this chapter you use relative frequencies to compare with expected numbers."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Dev passes a test with probability \\(\\frac{3}{4}\\) and Eve passes it with probability \\(\\frac{2}{3}\\). Their results are independent. What is the probability that both pass?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{3}{4}-\\frac{2}{3} = \\frac{1}{12}\\). For 'both', multiply the probabilities."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Independent events, so multiply: \\(\\frac{3}{4} \\times \\frac{2}{3} = \\frac{6}{12} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{6}{7}\\)",
        "correct": false,
        "feedback": "Multiplied the numerators (\\(3 \\times 2 = 6\\)) but added the denominators (\\(4+3 = 7\\)), giving \\(\\frac{6}{7}\\). Multiply both: \\(\\frac{6}{12}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Gave Dev's probability, \\(\\frac{3}{4}\\), only. Eve must pass too, so multiply by \\(\\frac{2}{3}\\)."
      }
    ],
    "backward": "Multiplying fractions and simplifying, Ch8.",
    "forward": "Tree diagrams later in this chapter multiply along branches."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "Two fair dice are rolled and the scores are added. The grid shows the total for every possible pair of scores. What is the probability that the total is 2 or 12?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 364\" width=\"384\" height=\"364\"><rect x=\"0\" y=\"0\" width=\"384\" height=\"364\" fill=\"#ffffff\"/><rect x=\"52\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"59\" font-family=\"sans-serif\" font-size=\"16\" fill=\"#666666\" text-anchor=\"middle\">+</text><rect x=\"96\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"140\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"184\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"228\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"272\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"316\" y=\"32\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"52\" y=\"76\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"140\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"184\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"228\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"272\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"316\" y=\"76\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"52\" y=\"120\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"140\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"184\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"228\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"272\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"316\" y=\"120\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"52\" y=\"164\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"140\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"184\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"228\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"272\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"316\" y=\"164\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"52\" y=\"208\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><rect x=\"96\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"140\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"184\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"228\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"272\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"316\" y=\"208\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"235\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"52\" y=\"252\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><rect x=\"96\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"140\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"184\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"228\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"272\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"316\" y=\"252\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"279\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">11</text><rect x=\"52\" y=\"296\" width=\"44\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"74\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><rect x=\"96\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"118\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">7</text><rect x=\"140\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"162\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">8</text><rect x=\"184\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"206\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">9</text><rect x=\"228\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"250\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">10</text><rect x=\"272\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"294\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">11</text><rect x=\"316\" y=\"296\" width=\"44\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"338\" y=\"323\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">12</text><text x=\"228\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Second die</text><text x=\"18\" y=\"208\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 208)\">First die</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{1}{18}\\)",
        "correct": true,
        "feedback": "Correct. A total of 2 comes only from (1,1) and a total of 12 only from (6,6), so 2 of the 36 equally likely outcomes are favourable. These cannot happen together, so P = \\(\\frac{2}{36} = \\frac{1}{18}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Used 12 as the number of outcomes (2 out of 12), giving \\(\\frac{1}{6}\\). There are \\(6 \\times 6 = 36\\) equally likely outcomes."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Counted only one of the two totals, giving 1 out of \\(36 = \\frac{1}{36}\\). Both (1,1) and (6,6) are favourable."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Used 11 as the number of outcomes, because the totals 2 to 12 are 11 different values, giving \\(\\frac{2}{11}\\). The 36 outcomes (pairs of scores) are equally likely; the totals are not."
      }
    ],
    "backward": "Listing outcomes and adding probabilities of events that cannot happen together.",
    "forward": "The same two ideas combine in tree diagrams later in this chapter."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A fair spinner has 10 equal sections numbered 1 to 10. What is the probability of landing on a number greater than 7?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\" width=\"280\" height=\"280\"><rect x=\"0\" y=\"0\" width=\"280\" height=\"280\" fill=\"#ffffff\"/><circle cx=\"140\" cy=\"140\" r=\"110\" fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"140\" y1=\"140\" x2=\"140\" y2=\"30\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"204.66\" y2=\"51.01\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"244.62\" y2=\"106.01\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"244.62\" y2=\"173.99\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"204.66\" y2=\"228.99\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"140\" y2=\"250\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"75.34\" y2=\"228.99\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"35.38\" y2=\"173.99\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"35.38\" y2=\"106.01\" stroke=\"#333333\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"140\" x2=\"75.34\" y2=\"51.01\" stroke=\"#333333\" stroke-width=\"1.5\"/><text x=\"164.47\" y=\"69.68\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><text x=\"204.07\" y=\"98.45\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><text x=\"219.2\" y=\"145\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><text x=\"204.07\" y=\"191.55\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">4</text><text x=\"164.47\" y=\"220.32\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">5</text><text x=\"115.53\" y=\"220.32\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">6</text><text x=\"75.93\" y=\"191.55\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">7</text><text x=\"60.8\" y=\"145\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">8</text><text x=\"75.93\" y=\"98.45\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">9</text><text x=\"115.53\" y=\"69.68\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">10</text><line x1=\"140\" y1=\"140\" x2=\"140\" y2=\"179.6\" stroke=\"#c0392b\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle cx=\"140\" cy=\"140\" r=\"5\" fill=\"#c0392b\"/></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Counted 7, 8, 9, 10 (4 sections), giving \\(\\frac{4}{10} = \\frac{2}{5}\\). 'Greater than 7' does not include 7."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Counted the numbers that are NOT greater than 7: 1 to 7 is 7 sections, giving \\(\\frac{7}{10}\\). The question asks for greater than 7."
      },
      {
        "text": "\\(\\frac{3}{7}\\)",
        "correct": false,
        "feedback": "Compared the 3 favourable sections with the 7 others, giving \\(\\frac{3}{7}\\). The total is all 10 sections."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": true,
        "feedback": "Correct. The numbers greater than 7 are 8, 9 and 10, which is 3 of the 10 sections, so P = \\(\\frac{3}{10}\\)."
      }
    ],
    "backward": "Reading 'greater than' correctly.",
    "forward": "The same care with wording is needed for 'at least' and 'more than' in later tree diagram problems."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair 3-sided spinner numbered 1 to 3 is spun twice. The grid shows all 9 outcomes. What is the probability that both spins give the same number?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 288 232\" width=\"288\" height=\"232\"><rect x=\"0\" y=\"0\" width=\"288\" height=\"232\" fill=\"#ffffff\"/><rect x=\"40\" y=\"32\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><rect x=\"96\" y=\"32\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"124\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"152\" y=\"32\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"180\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"208\" y=\"32\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"236\" y=\"59\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"40\" y=\"76\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"68\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">1</text><rect x=\"96\" y=\"76\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"124\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(1, 1)</text><rect x=\"152\" y=\"76\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"180\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(1, 2)</text><rect x=\"208\" y=\"76\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"236\" y=\"103\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(1, 3)</text><rect x=\"40\" y=\"120\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"68\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">2</text><rect x=\"96\" y=\"120\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"124\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(2, 1)</text><rect x=\"152\" y=\"120\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"180\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(2, 2)</text><rect x=\"208\" y=\"120\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"236\" y=\"147\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(2, 3)</text><rect x=\"40\" y=\"164\" width=\"56\" height=\"44\" fill=\"#f2f2f2\" stroke=\"#bbbbbb\"/><text x=\"68\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#333333\" text-anchor=\"middle\">3</text><rect x=\"96\" y=\"164\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"124\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(3, 1)</text><rect x=\"152\" y=\"164\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"180\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(3, 2)</text><rect x=\"208\" y=\"164\" width=\"56\" height=\"44\" fill=\"#ffffff\" stroke=\"#bbbbbb\"/><text x=\"236\" y=\"191\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#333333\" text-anchor=\"middle\">(3, 3)</text><text x=\"180\" y=\"22\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\">Second spin</text><text x=\"18\" y=\"142\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#333333\" text-anchor=\"middle\" transform=\"rotate(-90 18 142)\">First spin</text></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Compared the 3 same pairs with the 6 different pairs (3 out of 6), giving \\(\\frac{1}{2}\\). The total is all 9 outcomes."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Counted the 6 pairs that are different: \\(\\frac{6}{9} = \\frac{2}{3}\\). The question asks for both spins the same."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. The same-number pairs are (1,1), (2,2) and (3,3), which is 3 of the 9 outcomes: \\(\\frac{3}{9} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": false,
        "feedback": "Counted only (1,1), giving \\(\\frac{1}{9}\\). The pairs (2,2) and (3,3) also have both spins the same."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "Later in this chapter you check this by multiplying probabilities."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A fair die is rolled. \\(P(5) = \\frac{1}{6}\\) and \\(P(6) = \\frac{1}{6}\\). What is the probability of scoring a 5 or a 6?",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Gave the probability of NOT scoring a 5 or a 6: \\(1-\\frac{1}{3} = \\frac{2}{3}\\). The question asks for a 5 or a 6."
      },
      {
        "text": "\\(\\frac{1}{36}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\). Multiplying is for 'and' with independent events. A 5 or a 6 on one roll cannot both happen, so add."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. A single roll cannot be both 5 and 6, so add: \\(\\frac{1}{6}+\\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Gave the probability of only one of the two scores, \\(\\frac{1}{6}\\). Either score counts, so add both probabilities."
      }
    ],
    "backward": "Adding fractions with the same denominator, Ch8.",
    "forward": "Tree diagrams later in this chapter add the probabilities of separate branches."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A spinner has \\(P(\\text{green}) = 0.2\\). After 20 spins, the relative frequency of green is 0.35. The spinner is then spun 2000 more times. What is most likely to happen to the relative frequency of green?",
    "options": [
      {
        "text": "It becomes exactly 0.2",
        "correct": false,
        "feedback": "Expected the relative frequency to hit 0.2 exactly. Chance still causes small differences, so it gets close but need not equal 0.2."
      },
      {
        "text": "It stays at 0.35",
        "correct": false,
        "feedback": "Assumed the first 20 spins fix the value. New spins change the overall relative frequency, pulling it towards 0.2."
      },
      {
        "text": "It goes above 0.35",
        "correct": false,
        "feedback": "Assumed more spins push the value further from the theoretical probability. More spins usually bring the relative frequency closer to 0.2."
      },
      {
        "text": "It gets closer to 0.2",
        "correct": true,
        "feedback": "Correct. With more trials, the relative frequency settles close to the theoretical probability, 0.2."
      }
    ],
    "backward": "Theoretical probability from earlier in this chapter.",
    "forward": "This is why large samples are trusted in Ch15."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A bag has 2 red and 3 blue counters. A counter is picked at random, put back, and then another counter is picked. What is the probability that both counters are red?",
    "options": [
      {
        "text": "\\(\\frac{4}{25}\\)",
        "correct": true,
        "feedback": "Correct. The counter is put back, so the picks are independent and \\(P(\\text{red}) = \\frac{2}{5}\\) each time: \\(\\frac{2}{5} \\times \\frac{2}{5} = \\frac{4}{25}\\)."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Gave the probability of red for one pick. Both picks must be red, so multiply by \\(\\frac{2}{5}\\) again."
      },
      {
        "text": "\\(\\frac{6}{25}\\)",
        "correct": false,
        "feedback": "Found the probability of red then blue: \\(\\frac{2}{5} \\times \\frac{3}{5} = \\frac{6}{25}\\). The question asks for red both times."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{2}{5}+\\frac{2}{5} = \\frac{4}{5}\\). For 'red and red', multiply."
      }
    ],
    "backward": "Multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter show two-pick problems like this."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A spinner landed on blue 30 times in 120 spins. Use the relative frequency as the estimated probability of blue. What is the estimated probability that the next spin is not blue?",
    "options": [
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Treated the 30 blue spins as 30 out of 100, so 'not blue' is \\(\\frac{70}{100} = \\frac{7}{10}\\). There were 120 spins, not 100."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. Estimated \\(P(\\text{blue}) = \\frac{30}{120} = \\frac{1}{4}\\), so \\(P(\\text{not blue}) = 1-\\frac{1}{4} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Found the relative frequency of blue, \\(\\frac{1}{4}\\), and stopped. The question asks for NOT blue."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Compared blue with not blue (30 to 90), giving \\(\\frac{30}{90} = \\frac{1}{3}\\). Divide by all 120 spins."
      }
    ],
    "backward": "Relative frequency as a ratio written as a fraction, Ch11, and the 'not' rule.",
    "forward": "Estimated probabilities can be used in tree diagrams later in this chapter."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A letter is picked at random from the word PROBABILITY. What is the probability that it is a vowel?",
    "options": [
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Compared vowels with consonants (4 to 7), giving \\(\\frac{4}{7}\\). The total is all 11 letters."
      },
      {
        "text": "\\(\\frac{7}{11}\\)",
        "correct": false,
        "feedback": "Counted the consonants (7) instead of the vowels, giving \\(\\frac{7}{11}\\). The question asks for a vowel."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Counted the repeated I only once (O, A, I = 3), giving \\(\\frac{3}{11}\\). The word has two I's, so there are 4 vowels."
      },
      {
        "text": "\\(\\frac{4}{11}\\)",
        "correct": true,
        "feedback": "Correct. PROBABILITY has 11 letters and the vowels are O, A, I, I (4 of them), so \\(P(\\text{vowel}) = \\frac{4}{11}\\)."
      }
    ],
    "backward": "Favourable ÷ total, Ch8.",
    "forward": "The same counting is used on sample spaces later in this chapter."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A meal has one starter, one main and one dessert. There are 2 starters, 4 mains and 3 desserts. How many different meals are possible?",
    "options": [
      {
        "text": "8",
        "correct": false,
        "feedback": "Multiplied only the starters and mains (\\(2 \\times 4 = 8\\)) and left out the desserts."
      },
      {
        "text": "24",
        "correct": true,
        "feedback": "Correct. Each choice multiplies the number of meals: \\(2 \\times 4 \\times 3 = 24\\)."
      },
      {
        "text": "12",
        "correct": false,
        "feedback": "Multiplied only the mains and desserts (\\(4 \\times 3 = 12\\)) and left out the starters."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Added \\(2+4+3 = 9\\). Each starter can go with every main and every dessert, so multiply."
      }
    ],
    "backward": "Multiplying to count combinations.",
    "forward": "Sample space grids later in this chapter count pairs the same way."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "Each pupil travels to school by exactly one method. \\(P(\\text{bus}) = 35\\%\\), \\(P(\\text{car}) = 20\\%\\) and \\(P(\\text{walk}) = 45\\%\\). What is the probability that a pupil travels by bus or car?",
    "options": [
      {
        "text": "55%",
        "correct": true,
        "feedback": "Correct. A pupil uses only one method, so add: \\(35\\%+20\\% = 55\\%\\)."
      },
      {
        "text": "15%",
        "correct": false,
        "feedback": "Subtracted \\(35\\%-20\\% = 15\\%\\). For 'or', add the probabilities."
      },
      {
        "text": "7%",
        "correct": false,
        "feedback": "Multiplied \\(0.35 \\times 0.2 = 0.07 = 7\\%\\). For 'or' with events that cannot happen together, add."
      },
      {
        "text": "45%",
        "correct": false,
        "feedback": "Gave \\(P(\\text{walk}) = 100\\%-55\\% = 45\\%\\), the probability of neither bus nor car. The question asks for bus or car."
      }
    ],
    "backward": "Adding percentages.",
    "forward": "Tree diagrams later in this chapter add probabilities in the same way."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A coin was flipped 50 times and landed on heads 28 times. What is the relative frequency of tails?",
    "options": [
      {
        "text": "0.56",
        "correct": false,
        "feedback": "Gave the relative frequency of heads: \\(28 \\div 50 = 0.56\\). The question asks for tails."
      },
      {
        "text": "0.5",
        "correct": false,
        "feedback": "Gave the theoretical probability 0.5 for a fair coin. Relative frequency uses the actual results: 22 tails in 50 flips."
      },
      {
        "text": "0.44",
        "correct": true,
        "feedback": "Correct. Tails came up \\(50-28 = 22\\) times, so the relative frequency of tails is \\(22 \\div 50 = 0.44\\)."
      },
      {
        "text": "0.79",
        "correct": false,
        "feedback": "Compared tails with heads (\\(22 \\div 28 \\approx 0.79\\)). Divide by all 50 flips."
      }
    ],
    "backward": "Dividing to write a ratio as a decimal, Ch11.",
    "forward": "Relative frequencies are compared with theoretical probabilities when judging fairness later in this chapter."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "A fair coin is flipped three times. What is the probability that all three flips are heads?",
    "options": [
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": true,
        "feedback": "Correct. The flips are independent, so multiply: \\(\\frac{1}{2} \\times \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Multiplied the 2 outcomes of a flip by the 3 flips and used \\(\\frac{1}{2 \\times 3} = \\frac{1}{6}\\). Each flip has probability \\(\\frac{1}{2}\\), so multiply \\(\\frac{1}{2}\\) three times."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave the probability of heads on one flip. All three flips must be heads, so multiply by \\(\\frac{1}{2}\\) for each flip."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Multiplied only two of the three flips: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\). All three flips must be heads."
      }
    ],
    "backward": "Multiplying fractions, Ch8.",
    "forward": "Tree diagrams later in this chapter show these three-flip outcomes."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A drawing pin landed point up 10 times in 40 drops. Use this relative frequency as the probability that a pin lands point up. The pin is dropped twice, independently. What is the probability that it lands point up both times?",
    "options": [
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{1}{4}\\) by \\(\\frac{1}{2}\\) instead of \\(\\frac{1}{4}\\), giving \\(\\frac{1}{8}\\). The estimated probability is \\(\\frac{1}{4}\\) for each drop."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{4}+\\frac{1}{4} = \\frac{1}{2}\\). For 'both', multiply."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Found the relative frequency for one drop and stopped. Both drops must be point up, so multiply by \\(\\frac{1}{4}\\) again."
      },
      {
        "text": "\\(\\frac{1}{16}\\)",
        "correct": true,
        "feedback": "Correct. Estimated \\(P(\\text{point up}) = \\frac{10}{40} = \\frac{1}{4}\\). The drops are independent, so \\(P(\\text{both}) = \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}\\)."
      }
    ],
    "backward": "Relative frequency, and multiplying fractions, Ch8.",
    "forward": "Estimated probabilities can feed into tree diagrams later in this chapter."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Probability of a single event",
    "question": "A student is chosen at random from a class of 30. There are 14 boys in the class. What is the probability that the student is a girl?",
    "options": [
      {
        "text": "\\(\\frac{7}{15}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{boy}) = \\frac{14}{30} = \\frac{7}{15}\\). The question asks for a girl."
      },
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Compared boys with girls (14 to 16), giving \\(\\frac{14}{16} = \\frac{7}{8}\\). The total is all 30 students."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": true,
        "feedback": "Correct. There are \\(30-14 = 16\\) girls, so \\(P(\\text{girl}) = \\frac{16}{30} = \\frac{8}{15}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Assumed boys and girls are equally likely, giving \\(\\frac{1}{2}\\). The class has 14 boys and 16 girls, so the chances are not equal."
      }
    ],
    "backward": "Simplifying fractions, Ch8.",
    "forward": "The 'not' rule gives \\(P(\\text{girl}) = 1-P(\\text{boy})\\), which is used in later tree diagram problems."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Listing outcomes of combined events",
    "question": "A fair coin is flipped three times. How many of the possible outcomes have exactly two heads?",
    "options": [
      {
        "text": "4",
        "correct": false,
        "feedback": "Included HHH as well as HHT, HTH and THH, so counted 4. That is at least two heads; 'exactly two' excludes HHH."
      },
      {
        "text": "3",
        "correct": true,
        "feedback": "Correct. Listing systematically: HHT, HTH, THH. There are 3 outcomes with exactly two heads (out of 8 in total)."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Gave the total number of outcomes (\\(2 \\times 2 \\times 2 = 8\\)). The question asks only for those with exactly two heads."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Listed HHT and HTH but missed THH, so counted 2. Place the tail in each of the three positions in turn."
      }
    ],
    "backward": "Listing outcomes systematically.",
    "forward": "Sample space grids later in this chapter use the same approach."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Mutually exclusive events",
    "question": "A fair die is rolled. \\(P(\\text{an even score}) = \\frac{1}{2}\\) and \\(P(\\text{a 3}) = \\frac{1}{6}\\). An even score can never be a 3. What is the probability of an even score or a 3?",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Gave \\(P(3) = \\frac{1}{6}\\) only. An even score also counts, so add \\(\\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. The events cannot happen together, so add: \\(\\frac{1}{2}+\\frac{1}{6} = \\frac{3}{6}+\\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Multiplied \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\). For 'or' with events that cannot happen together, add."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Gave \\(P(\\text{even}) = \\frac{1}{2}\\) only. A score of 3 also counts, so add \\(\\frac{1}{6}\\)."
      }
    ],
    "backward": "Adding fractions with different denominators, Ch8.",
    "forward": "The addition rule is used for branches in tree diagrams later in this chapter."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Chance experiments",
    "question": "A biased die lands on 6 with probability 0.2. It is rolled 150 times. How many 6s would you expect?",
    "options": [
      {
        "text": "3",
        "correct": false,
        "feedback": "Used 0.02 instead of 0.2: \\(0.02 \\times 150 = 3\\). 0.2 is two tenths."
      },
      {
        "text": "300",
        "correct": false,
        "feedback": "Treated 0.2 as 2: \\(2 \\times 150 = 300\\). Multiplying by 0.2 gives a fifth of 150, not double."
      },
      {
        "text": "30",
        "correct": true,
        "feedback": "Correct. Expected number = probability × rolls = \\(0.2 \\times 150 = 30\\)."
      },
      {
        "text": "750",
        "correct": false,
        "feedback": "Divided \\(150 \\div 0.2 = 750\\). The expected number is the probability times the number of rolls."
      }
    ],
    "backward": "Multiplying decimals.",
    "forward": "Comparing expected numbers with actual results is part of judging fairness later in this chapter."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Independent events",
    "question": "Raj hits a target with probability \\(\\frac{2}{3}\\) and Sam hits it with probability \\(\\frac{1}{4}\\). Their shots are independent. What is the probability that both hit the target?",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{2}{3}-\\frac{1}{4} = \\frac{5}{12}\\). For 'both', multiply the probabilities."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Gave only Sam's probability, \\(\\frac{1}{4}\\). Raj must hit too, so multiply by Raj's \\(\\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{2}{3}+\\frac{1}{4} = \\frac{11}{12}\\). For 'both', multiply."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Independent events, so multiply: \\(\\frac{2}{3} \\times \\frac{1}{4} = \\frac{2}{12} = \\frac{1}{6}\\)."
      }
    ],
    "backward": "Multiplying fractions and simplifying, Ch8.",
    "forward": "Tree diagrams later in this chapter use the same multiplication."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed probability problems",
    "question": "A spinner was spun 40 times. It landed on red 14 times, on blue 22 times and on green 4 times. Use the relative frequencies as probabilities. What is the estimated probability of red or green?",
    "options": [
      {
        "text": "\\(\\frac{9}{20}\\)",
        "correct": true,
        "feedback": "Correct. Red or green happened \\(14+4 = 18\\) times out of 40, so the estimate is \\(\\frac{18}{40} = \\frac{9}{20}\\)."
      },
      {
        "text": "\\(\\frac{9}{11}\\)",
        "correct": false,
        "feedback": "Compared red and green with blue (18 to 22), giving \\(\\frac{18}{22} = \\frac{9}{11}\\). Divide by all 40 spins."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": false,
        "feedback": "Used the blue count: \\(\\frac{22}{40} = \\frac{11}{20}\\), the estimate for NOT red or green. The question asks for red or green."
      },
      {
        "text": "\\(\\frac{7}{20}\\)",
        "correct": false,
        "feedback": "Counted only red: \\(\\frac{14}{40} = \\frac{7}{20}\\). Green counts too."
      }
    ],
    "backward": "Relative frequency, and adding counts for events that cannot happen together.",
    "forward": "Estimates like this can be used in tree diagrams later in this chapter."
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
    title: "Probability — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Single-event probability, the addition rule for mutually exclusive events, multiplying for independent events, listing outcomes, and relative frequency — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your probability skills already are: working out the chance of one event, listing all the outcomes when two things happen, adding for 'or' when events cannot happen together, multiplying for 'and' when events do not affect each other, and using results from experiments. For each question, ask yourself first: what exactly is the event, and is the question about 'or' or 'and'? Then work it out before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

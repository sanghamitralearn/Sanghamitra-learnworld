// seed/mathSeedCh9SequencesFunctionsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 9
// (Sequences and Functions), Level 2 — converted from the
// standalone diagnostic JSON ch9-sequences-functions-level-2.json.
//
// Run with: node seed/mathSeedCh9SequencesFunctionsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-9-sequences-functions";
const CHAPTER_NAME = "Sequences and Functions";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "C1": "Term-to-term rules",
  "C2": "Finding the nth term",
  "C3": "Using the nth term",
  "C4": "Working backwards",
  "C5": "Special sequences",
  "C6": "Advanced sequence and function problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "A sequence starts \\(6, 11, 16, 21, \\ldots\\) What is the 9th term?",
    "options": [
      {
        "text": "\\(46\\)",
        "correct": true,
        "feedback": "Correct. The difference is 5, so the 9th term is \\(6 + 8 \\times 5 = 46\\)."
      },
      {
        "text": "\\(41\\)",
        "correct": false,
        "feedback": "Used 7 steps instead of 8: \\(6 + 7 \\times 5 = 41\\). The 1st to 9th term is 8 steps, not 7."
      },
      {
        "text": "\\(51\\)",
        "correct": false,
        "feedback": "Used 9 steps instead of 8: \\(6 + 9 \\times 5 = 51\\). The 1st term is already counted, so only 8 steps separate it from the 9th."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "Multiplied position by difference and forgot the first term: \\(9 \\times 5 = 45\\)."
      }
    ],
    "retryHint": "Find the difference, then count the steps from the 1st term to the 9th (8 steps), then add the first term.",
    "backward": "Finding the common difference — Ch9 L1.",
    "forward": "The nth-term formula gives a direct method for any term."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term of a sequence is \\(4n-3\\). Which term equals \\(45\\)?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(4n-3 = 45 \\implies 4n = 48 \\implies n = 12\\)."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "Added 3 to both sides to get \\(4n = 48\\), then stopped — the division by 4 is still to do."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "Subtracted 3 in the wrong direction: \\(45 - 3 = 42\\). Adding 3 was needed to undo the \\(-3\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Off by one: \\(n=11\\) gives \\(4(11)-3 = 41\\), not 45."
      }
    ],
    "retryHint": "Add 3 to both sides, then divide by 4.",
    "backward": "Solving a two-step equation — Ch4.",
    "forward": "Working backwards from a term to its position."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the difference between the 10th square number and the 6th square number?",
    "options": [
      {
        "text": "\\(64\\)",
        "correct": true,
        "feedback": "Correct. \\(10^2 - 6^2 = 100 - 36 = 64\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Computed only the 6th square (\\(6^2 = 36\\)) and stopped."
      },
      {
        "text": "\\(136\\)",
        "correct": false,
        "feedback": "Added the two squares instead of subtracting: \\(100 + 36 = 136\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Subtracted the positions first, then squared: \\((10-6)^2 = 4^2 = 16\\)."
      }
    ],
    "retryHint": "Compute each square first, then subtract.",
    "backward": "Knowing square numbers — Ch9 L1.",
    "forward": "The difference of squares appears in algebraic factorisation."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(9, 13, 17, 21, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n+5\\)",
        "correct": true,
        "feedback": "Correct. Difference 4, so the coefficient of \\(n\\) is 4. At \\(n=1\\): \\(4(1)+5 = 9\\). Rule: \\(4n+5\\)."
      },
      {
        "text": "\\(4n+9\\)",
        "correct": false,
        "feedback": "Used the first term (9) as the constant. But \\(4(1)+9 = 13\\), not 9 — the rule is shifted by one."
      },
      {
        "text": "\\(5n+4\\)",
        "correct": false,
        "feedback": "Swapped the difference (4) and the constant (5). The difference is 4, so the coefficient of \\(n\\) is 4."
      },
      {
        "text": "\\(4n+4\\)",
        "correct": false,
        "feedback": "Correct difference (4) but the constant is off by one: \\(4(1)+4 = 8\\), not 9."
      }
    ],
    "retryHint": "Difference → coefficient of n. Test n=1 to find the constant.",
    "backward": "Finding the common difference.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 8th term of \\(4n+1\\) and the 5th term of \\(5n-2\\). What is their difference (first minus second)?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. 8th of \\(4n+1\\) is \\(4(8)+1 = 33\\). 5th of \\(5n-2\\) is \\(5(5)-2 = 23\\). Difference \\(= 33 - 23 = 10\\)."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "Added the two terms instead of subtracting: \\(33 + 23 = 56\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Computed only the second term (\\(23\\)) and stopped."
      },
      {
        "text": "\\(33\\)",
        "correct": false,
        "feedback": "Computed only the first term (\\(33\\)) and stopped."
      }
    ],
    "retryHint": "Compute both terms separately, then subtract the second from the first.",
    "backward": "Substituting into a formula — Ch9 L1.",
    "forward": "Comparing terms of different sequences."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next two terms of \\(3, 15, 75, 375, \\ldots\\)",
    "options": [
      {
        "text": "\\(1875, 9375\\)",
        "correct": true,
        "feedback": "Correct. The constant multiplier is 5. \\(375 \\times 5 = 1875\\), then \\(1875 \\times 5 = 9375\\)."
      },
      {
        "text": "\\(3750, 37500\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 5: \\(375 \\times 10 = 3750\\), then \\(3750 \\times 10 = 37500\\)."
      },
      {
        "text": "\\(750, 1125\\)",
        "correct": false,
        "feedback": "Added the last term instead of multiplying: \\(375 + 375 = 750\\), then \\(750 + 375 = 1125\\). That treats the sequence as constant-difference, but it is geometric."
      },
      {
        "text": "\\(1875, 7500\\)",
        "correct": false,
        "feedback": "First term correct (\\(1875\\)) but then multiplied by 4 instead of 5: \\(1875 \\times 4 = 7500\\)."
      }
    ],
    "retryHint": "Divide consecutive terms to find the constant multiplier, then apply it twice.",
    "backward": "Recognising a geometric pattern — Ch9 L1.",
    "forward": "Geometric sequences appear in direct proportion, Ch11."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 4x-3\\). Find \\(f(f(2))\\).",
    "options": [
      {
        "text": "\\(17\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 4(2)-3 = 5\\), then \\(f(5) = 4(5)-3 = 17\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(2) = 5\\). The outer \\(f\\) still needs to be applied to that result."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Computed \\(f(2) = 5\\), then \\(4(5) = 20\\) — forgot the \\(-3\\) at the second step."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Computed \\(f(2) = 5\\), then added 3 instead of applying the function: \\(5 + 3 = 8\\)."
      }
    ],
    "retryHint": "Apply f once to get 5, then substitute 5 back into the rule \\(4x-3\\).",
    "backward": "Substituting into a function — Ch9 L1.",
    "forward": "Composite function evaluation appears in Ch10."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the 8th triangular number?",
    "options": [
      {
        "text": "\\(36\\)",
        "correct": true,
        "feedback": "Correct. Triangular numbers: \\(1, 3, 6, 10, 15, 21, 28, 36, \\ldots\\). The 8th is 36."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "Used \\(8^2 = 64\\) — this is the 8th square number, not the 8th triangular number."
      },
      {
        "text": "\\(28\\)",
        "correct": false,
        "feedback": "Used the 7th triangular number (28) — off by one."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "Used the 9th triangular number (45) — off by one the other way."
      }
    ],
    "retryHint": "Continue the pattern 1, 3, 6, 10, 15, … — the differences are 2, 3, 4, 5, 6, 7, 8.",
    "backward": "Extending a special sequence — Ch9 L1.",
    "forward": "Triangular numbers arise in counting problems."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "A sequence starts \\(8, 15, 22, 29, \\ldots\\) Find the 12th term.",
    "options": [
      {
        "text": "\\(85\\)",
        "correct": true,
        "feedback": "Correct. Difference 7. 12th term \\(= 8 + 11 \\times 7 = 85\\)."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "Used 10 steps instead of 11: \\(8 + 10 \\times 7 = 78\\)."
      },
      {
        "text": "\\(92\\)",
        "correct": false,
        "feedback": "Used 12 steps instead of 11: \\(8 + 12 \\times 7 = 92\\)."
      },
      {
        "text": "\\(77\\)",
        "correct": false,
        "feedback": "Multiplied step count by difference, forgetting the first term: \\(11 \\times 7 = 77\\)."
      }
    ],
    "backward": "Counting steps — 11 steps from 1st to 12th.",
    "forward": "Nth-term formula gives a direct method."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term of a sequence is \\(4n-5\\). Which term equals \\(43\\)?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(4n-5 = 43 \\implies 4n = 48 \\implies n = 12\\)."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "Added 5 to get \\(4n = 48\\), then stopped — the division by 4 is still to do."
      },
      {
        "text": "\\(38\\)",
        "correct": false,
        "feedback": "Subtracted 5 in the wrong direction: \\(43 - 5 = 38\\). Adding 5 was needed."
      },
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "Returned the given term value without solving for its position."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(5, 13, 21, 29, \\ldots\\)",
    "options": [
      {
        "text": "\\(8n-3\\)",
        "correct": true,
        "feedback": "Correct. Difference 8, so the coefficient of \\(n\\) is 8. At \\(n=1\\): \\(8(1)-3 = 5\\). Rule: \\(8n-3\\)."
      },
      {
        "text": "\\(8n+5\\)",
        "correct": false,
        "feedback": "Used the first term (5) as the constant. This gives \\(8(1)+5 = 13\\), not 5 — the rule is shifted."
      },
      {
        "text": "\\(5n+8\\)",
        "correct": false,
        "feedback": "Swapped the difference (8) and the constant (5)."
      },
      {
        "text": "\\(8n-2\\)",
        "correct": false,
        "feedback": "Correct coefficient (8) but the constant is off by one: \\(8(1)-2 = 6\\), not 5."
      }
    ],
    "backward": "Finding the common difference.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the difference between the 12th square number and the 7th square number?",
    "options": [
      {
        "text": "\\(95\\)",
        "correct": true,
        "feedback": "Correct. \\(12^2 - 7^2 = 144 - 49 = 95\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Subtracted the positions first, then squared: \\((12-7)^2 = 5^2 = 25\\)."
      },
      {
        "text": "\\(193\\)",
        "correct": false,
        "feedback": "Added the two squares instead of subtracting: \\(144 + 49 = 193\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Computed only the 7th square (\\(7^2 = 49\\))."
      }
    ],
    "backward": "Square numbers.",
    "forward": "Difference of squares."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 6th term of \\(3n+5\\), then subtract the 4th term of \\(2n+9\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. 6th of \\(3n+5\\) is \\(3(6)+5 = 23\\). 4th of \\(2n+9\\) is \\(2(4)+9 = 17\\). Difference \\(= 23 - 17 = 6\\)."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Added the two terms instead of subtracting: \\(23 + 17 = 40\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Computed only the first term (\\(23\\))."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Computed only the second term (\\(17\\))."
      }
    ],
    "backward": "Two substitutions then subtract.",
    "forward": "Comparing terms of different sequences."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 5x-2\\). Find \\(f(f(1))\\).",
    "options": [
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 5(1)-2 = 3\\), then \\(f(3) = 5(3)-2 = 13\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 3\\) — the second application was not done."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Used \\(f(x) = 5x\\) and ignored the \\(-2\\) at both steps: \\(f(1) = 5\\), \\(f(5) = 25\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Computed \\(f(1) = 3\\), then added the coefficient 5: \\(3 + 5 = 8\\)."
      }
    ],
    "backward": "Composite function.",
    "forward": "Function composition in Ch10."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "A sequence is \\(100, 95, 90, 85, \\ldots\\) Find the 20th term.",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= -5\\). 20th term \\(= 100 + 19 \\times (-5) = 100 - 95 = 5\\)."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Used 20 steps instead of 19: \\(100 + 20 \\times (-5) = 0\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Used 18 steps instead of 19: \\(100 + 18 \\times (-5) = 10\\)."
      },
      {
        "text": "\\(-5\\)",
        "correct": false,
        "feedback": "Used 21 steps instead of 19: \\(100 + 21 \\times (-5) = -5\\)."
      }
    ],
    "backward": "Negative difference — same method as positive.",
    "forward": "Arithmetic with negatives in algebra."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "Which of these numbers is a term of the sequence with nth term \\(6n+1\\)?",
    "options": [
      {
        "text": "\\(43\\)",
        "correct": true,
        "feedback": "Correct. \\(6n+1 = 43 \\implies n = 7\\), which is a whole number, so 43 is a term."
      },
      {
        "text": "\\(38\\)",
        "correct": false,
        "feedback": "\\(6n+1 = 38 \\implies n = 37/6\\), not a whole number — so 38 is not a term."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "\\(6n+1 = 40 \\implies n = 39/6\\), not a whole number — so 40 is not a term."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "\\(6n+1 = 42 \\implies n = 41/6\\), not a whole number — so 42 is not a term."
      }
    ],
    "backward": "Testing candidates by solving.",
    "forward": "Sequence membership."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(11, 8, 5, 2, \\ldots\\)",
    "options": [
      {
        "text": "\\(-3n+14\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= -3\\), so the coefficient of \\(n\\) is \\(-3\\). At \\(n=1\\): \\(-3(1)+14 = 11\\). Rule: \\(-3n+14\\)."
      },
      {
        "text": "\\(3n+8\\)",
        "correct": false,
        "feedback": "Flipped the sign of the difference to \\(+3\\), then matched the first term by choosing the constant: \\(3(1)+8 = 11\\). Fails at \\(n=2\\): \\(3(2)+8 = 14 \\neq 8\\). The terms are decreasing, so the coefficient must be negative."
      },
      {
        "text": "\\(-3n+11\\)",
        "correct": false,
        "feedback": "Correct coefficient (\\(-3\\)) but the constant is wrong: \\(-3(1)+11 = 8\\), not 11."
      },
      {
        "text": "\\(14n-3\\)",
        "correct": false,
        "feedback": "Swapped the roles of coefficient and constant: used 14 (the constant) as the coefficient of \\(n\\) and \\(-3\\) (the coefficient) as the constant. \\(14(1)-3 = 11\\) matches the first term but \\(14(2)-3 = 25 \\neq 8\\)."
      }
    ],
    "backward": "Negative coefficient.",
    "forward": "Decreasing sequences in algebra."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the 9th triangular number?",
    "options": [
      {
        "text": "\\(45\\)",
        "correct": true,
        "feedback": "Correct. Triangular numbers: \\(1, 3, 6, 10, 15, 21, 28, 36, 45, \\ldots\\). The 9th is 45."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Used the 8th triangular number (36) — off by one."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Used the 10th triangular number (55) — off by one the other way."
      },
      {
        "text": "\\(81\\)",
        "correct": false,
        "feedback": "Used \\(9^2 = 81\\) — this is the 9th square number, not triangular."
      }
    ],
    "backward": "Extending a special sequence.",
    "forward": "Triangular numbers arise in counting."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "The nth term is \\(5n-2\\). Find the 12th term, then double it.",
    "options": [
      {
        "text": "\\(116\\)",
        "correct": true,
        "feedback": "Correct. \\(5(12)-2 = 58\\), then doubled \\(= 116\\)."
      },
      {
        "text": "\\(58\\)",
        "correct": false,
        "feedback": "Computed the 12th term (58) but forgot to double."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "Computed \\(5(12) = 60\\) — forgot the \\(-2\\) and forgot to double."
      },
      {
        "text": "\\(120\\)",
        "correct": false,
        "feedback": "Computed \\(5(12) \\times 2 = 120\\) — doubled but dropped the \\(-2\\)."
      }
    ],
    "backward": "Substitution then a further operation on the result.",
    "forward": "Two-step use of formulas."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A machine doubles its input, then subtracts 5. If the input is 8, what is the output?",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(2 \\times 8 = 16\\), then \\(16 - 5 = 11\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Stopped after doubling (\\(16\\)) — the subtraction was not done."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Added 5 instead of subtracting: \\(16 + 5 = 21\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Subtracted before doubling: \\(2(8 - 5) = 2 \\times 3 = 6\\). The order is double first, then subtract."
      }
    ],
    "backward": "Two-step function machine.",
    "forward": "Composing operations in algebra."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "A geometric sequence starts \\(3, 12, 48, \\ldots\\) Find the 5th term.",
    "options": [
      {
        "text": "\\(768\\)",
        "correct": true,
        "feedback": "Correct. The constant multiplier is 4. 5th term \\(= 3 \\times 4^4 = 3 \\times 256 = 768\\)."
      },
      {
        "text": "\\(192\\)",
        "correct": false,
        "feedback": "Stopped at the 4th term (\\(3 \\times 4^3 = 192\\)) — the 5th term is one step further."
      },
      {
        "text": "\\(3072\\)",
        "correct": false,
        "feedback": "Used \\(3 \\times 4^5 = 3072\\) — that is the 6th term, one step too far."
      },
      {
        "text": "\\(576\\)",
        "correct": false,
        "feedback": "Multiplied the 4th term by 3 instead of 4: \\(192 \\times 3 = 576\\). The constant multiplier is 4."
      }
    ],
    "backward": "Recognising a geometric pattern.",
    "forward": "Direct proportion in Ch11."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(9n-2\\). Which term equals \\(61\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(9n-2 = 61 \\implies 9n = 63 \\implies n = 7\\)."
      },
      {
        "text": "\\(63\\)",
        "correct": false,
        "feedback": "Added 2 to get \\(9n = 63\\), then stopped — the division by 9 is still to do."
      },
      {
        "text": "\\(59\\)",
        "correct": false,
        "feedback": "Subtracted 2 in the wrong direction: \\(61 - 2 = 59\\). Adding 2 was needed."
      },
      {
        "text": "\\(61\\)",
        "correct": false,
        "feedback": "Returned the given term value without solving."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(3, 11, 19, 27, \\ldots\\)",
    "options": [
      {
        "text": "\\(8n-5\\)",
        "correct": true,
        "feedback": "Correct. Difference 8. At \\(n=1\\): \\(8(1)-5 = 3\\). Rule: \\(8n-5\\)."
      },
      {
        "text": "\\(8n+3\\)",
        "correct": false,
        "feedback": "Used the first term (3) as the constant. This gives \\(8(1)+3 = 11\\), not 3 — the rule is shifted."
      },
      {
        "text": "\\(3n+8\\)",
        "correct": false,
        "feedback": "Swapped the difference (8) and the constant (3)."
      },
      {
        "text": "\\(8n-4\\)",
        "correct": false,
        "feedback": "Correct coefficient (8) but the constant is off by one: \\(8(1)-4 = 4\\), not 3."
      }
    ],
    "backward": "Difference and test.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "The Fibonacci sequence begins \\(1, 1, 2, 3, 5, 8, \\ldots\\) What is its 8th term?",
    "options": [
      {
        "text": "\\(21\\)",
        "correct": true,
        "feedback": "Correct. Extending: \\(1, 1, 2, 3, 5, 8, 13, 21\\). The 8th term is 21."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Used the 7th term (13) — off by one."
      },
      {
        "text": "\\(34\\)",
        "correct": false,
        "feedback": "Used the 9th term (34) — off by one the other way."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Added the term three places back instead of two: \\(8 + 3 = 11\\). Fibonacci adds the previous two terms, so it should be \\(8 + 5 = 13\\)."
      }
    ],
    "backward": "Fibonacci recursion.",
    "forward": "Recursive rules in higher sequences."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 4th term of \\(3n+1\\) and the 7th term of \\(2n+5\\). What is their sum?",
    "options": [
      {
        "text": "\\(32\\)",
        "correct": true,
        "feedback": "Correct. 4th of \\(3n+1\\) is \\(3(4)+1 = 13\\). 7th of \\(2n+5\\) is \\(2(7)+5 = 19\\). Sum \\(= 13 + 19 = 32\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Computed only the first term (13)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Computed only the second term (19)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Subtracted instead of adding: \\(19 - 13 = 6\\)."
      }
    ],
    "backward": "Two substitutions then add.",
    "forward": "Combining sequence terms."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "A machine multiplies its input by 3, then adds 5. If the output is 26, what was the input?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Working backwards: \\((26-5)/3 = 21/3 = 7\\)."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Subtracted 5 to get \\(3x = 21\\), then stopped — the division by 3 is still to do."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "Multiplied the output by 3 instead of dividing: \\(26 \\times 3 = 78\\)."
      },
      {
        "text": "\\(31\\)",
        "correct": false,
        "feedback": "Added 5 instead of subtracting: \\(26 + 5 = 31\\), then stopped without dividing."
      }
    ],
    "backward": "Reverse two-step machine.",
    "forward": "Inverse operations in algebra."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The 3rd term of an arithmetic sequence is 15 and the 7th term is 31. What is the 1st term?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= (31-15)/(7-3) = 16/4 = 4\\). Then \\(t_1 = t_3 - 2 \\times 4 = 15 - 8 = 7\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Subtracted one difference from the 3rd term: \\(15 - 4 = 11\\). The 1st term is two steps back from the 3rd, not one."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Returned the difference (4) as the first term."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Returned the 3rd term value without working backwards."
      }
    ],
    "backward": "Finding the difference from two terms.",
    "forward": "Linear interpolation."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(7n-2\\). Which term equals \\(54\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(7n-2 = 54 \\implies 7n = 56 \\implies n = 8\\)."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "Added 2 to get \\(7n = 56\\), then stopped — the division by 7 is still to do."
      },
      {
        "text": "\\(52\\)",
        "correct": false,
        "feedback": "Subtracted 2 in the wrong direction: \\(54 - 2 = 52\\). Adding 2 was needed."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "Returned the given term value without solving."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(6, 17, 28, 39, \\ldots\\)",
    "options": [
      {
        "text": "\\(11n-5\\)",
        "correct": true,
        "feedback": "Correct. Difference 11. At \\(n=1\\): \\(11(1)-5 = 6\\). Rule: \\(11n-5\\)."
      },
      {
        "text": "\\(10n-4\\)",
        "correct": false,
        "feedback": "Read the difference as 10 instead of 11: rule \\(10n-4\\) gives \\(10(1)-4 = 6\\) matching the first term, but \\(10(2)-4 = 16\\), not 17."
      },
      {
        "text": "\\(6n+11\\)",
        "correct": false,
        "feedback": "Swapped the difference (11) and the constant (6)."
      },
      {
        "text": "\\(11n-4\\)",
        "correct": false,
        "feedback": "Correct coefficient (11) but the constant is off by one: \\(11(1)-4 = 7\\), not 6."
      }
    ],
    "backward": "Difference and test.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the 12th triangular number?",
    "options": [
      {
        "text": "\\(78\\)",
        "correct": true,
        "feedback": "Correct. Using \\(T_n = n(n+1)/2\\): \\(12 \\times 13 / 2 = 78\\)."
      },
      {
        "text": "\\(144\\)",
        "correct": false,
        "feedback": "Used \\(12^2 = 144\\) — this is the 12th square number, not triangular."
      },
      {
        "text": "\\(66\\)",
        "correct": false,
        "feedback": "Used the 11th triangular number (66) — off by one."
      },
      {
        "text": "\\(91\\)",
        "correct": false,
        "feedback": "Used the 13th triangular number (91) — off by one the other way."
      }
    ],
    "backward": "Extending special sequences.",
    "forward": "Triangular numbers arise in counting."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 8th term of \\(3n+2\\), then subtract the 3rd term of \\(7n-1\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. 8th of \\(3n+2\\) is \\(3(8)+2 = 26\\). 3rd of \\(7n-1\\) is \\(7(3)-1 = 20\\). Difference \\(= 26 - 20 = 6\\)."
      },
      {
        "text": "\\(46\\)",
        "correct": false,
        "feedback": "Added the two terms instead of subtracting: \\(26 + 20 = 46\\)."
      },
      {
        "text": "\\(26\\)",
        "correct": false,
        "feedback": "Computed only the first term (26)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Computed only the second term (20)."
      }
    ],
    "backward": "Two substitutions, then subtract.",
    "forward": "Comparing terms of different sequences."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "\\(f(x) = 4x+1\\). Find the value of \\(x\\) when \\(f(x) = 33\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(4x+1 = 33 \\implies 4x = 32 \\implies x = 8\\)."
      },
      {
        "text": "\\(132\\)",
        "correct": false,
        "feedback": "Multiplied the coefficient by the target, treating 33 as the input and forgetting the \\(+1\\): \\(4 \\times 33 = 132\\). The task is to solve \\(4x + 1 = 33\\) for \\(x\\)."
      },
      {
        "text": "\\(34\\)",
        "correct": false,
        "feedback": "Added 1 instead of subtracting, then stopped: \\(33 + 1 = 34\\)."
      },
      {
        "text": "\\(33\\)",
        "correct": false,
        "feedback": "Returned the target value without solving."
      }
    ],
    "backward": "Working backwards through a function.",
    "forward": "Inverse functions in Ch10."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the 20th term of \\(15, 21, 27, 33, \\ldots\\)",
    "options": [
      {
        "text": "\\(129\\)",
        "correct": true,
        "feedback": "Correct. Difference 6. 20th term \\(= 15 + 19 \\times 6 = 129\\)."
      },
      {
        "text": "\\(123\\)",
        "correct": false,
        "feedback": "Used 18 steps instead of 19: \\(15 + 18 \\times 6 = 123\\)."
      },
      {
        "text": "\\(135\\)",
        "correct": false,
        "feedback": "Used 20 steps instead of 19: \\(15 + 20 \\times 6 = 135\\)."
      },
      {
        "text": "\\(114\\)",
        "correct": false,
        "feedback": "Multiplied step count by difference, forgetting the first term: \\(19 \\times 6 = 114\\)."
      }
    ],
    "backward": "Difference and step count.",
    "forward": "Distant-term computation."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(7n+2\\). Which term equals \\(65\\)?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(7n+2 = 65 \\implies 7n = 63 \\implies n = 9\\)."
      },
      {
        "text": "\\(63\\)",
        "correct": false,
        "feedback": "Subtracted 2 to get \\(7n = 63\\), then stopped — the division by 7 is still to do."
      },
      {
        "text": "\\(67\\)",
        "correct": false,
        "feedback": "Added 2 in the wrong direction: \\(65 + 2 = 67\\). Subtracting 2 was needed."
      },
      {
        "text": "\\(65\\)",
        "correct": false,
        "feedback": "Returned the given term value without solving."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(8, 15, 22, 29, \\ldots\\)",
    "options": [
      {
        "text": "\\(7n+1\\)",
        "correct": true,
        "feedback": "Correct. Difference 7. At \\(n=1\\): \\(7(1)+1 = 8\\). Rule: \\(7n+1\\)."
      },
      {
        "text": "\\(6n+2\\)",
        "correct": false,
        "feedback": "Read the difference as 6 instead of 7: rule \\(6n+2\\) gives \\(6(1)+2 = 8\\) matching the first term, but \\(6(2)+2 = 14\\), not 15."
      },
      {
        "text": "\\(8n+7\\)",
        "correct": false,
        "feedback": "Swapped the difference (7) and the constant (8)."
      },
      {
        "text": "\\(7n+2\\)",
        "correct": false,
        "feedback": "Correct coefficient (7) but the constant is off by one: \\(7(1)+2 = 9\\), not 8."
      }
    ],
    "backward": "Difference and test.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the difference between the 8th square number and the 3rd square number?",
    "options": [
      {
        "text": "\\(55\\)",
        "correct": true,
        "feedback": "Correct. \\(8^2 - 3^2 = 64 - 9 = 55\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Subtracted the positions first, then squared: \\((8-3)^2 = 5^2 = 25\\)."
      },
      {
        "text": "\\(73\\)",
        "correct": false,
        "feedback": "Added the two squares instead of subtracting: \\(64 + 9 = 73\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Added the positions rather than subtracting the squares: \\(8 + 3 = 11\\)."
      }
    ],
    "backward": "Square numbers.",
    "forward": "Difference of squares."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 5th term of \\(6n+3\\), then subtract the 3rd term of \\(4n+7\\).",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": true,
        "feedback": "Correct. 5th of \\(6n+3\\) is \\(6(5)+3 = 33\\). 3rd of \\(4n+7\\) is \\(4(3)+7 = 19\\). Difference \\(= 33 - 19 = 14\\)."
      },
      {
        "text": "\\(52\\)",
        "correct": false,
        "feedback": "Added the two terms instead of subtracting: \\(33 + 19 = 52\\)."
      },
      {
        "text": "\\(33\\)",
        "correct": false,
        "feedback": "Computed only the first term (33)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Computed only the second term (19)."
      }
    ],
    "backward": "Two substitutions, then subtract.",
    "forward": "Comparing terms."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x+2\\). Find \\(f(f(2))\\).",
    "options": [
      {
        "text": "\\(26\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 3(2)+2 = 8\\), then \\(f(8) = 3(8)+2 = 26\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(2) = 8\\) — the second application was not done."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Computed \\(f(2) = 8\\), then added the coefficient 3: \\(8 + 3 = 11\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Computed \\(f(2) = 8\\), then forgot the \\(+2\\) at the second step: \\(3(8) = 24\\)."
      }
    ],
    "backward": "Composite function.",
    "forward": "Composition in Ch10."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The 4th term of an arithmetic sequence is 17 and the 10th term is 47. What is the 1st term?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= (47-17)/(10-4) = 30/6 = 5\\). Then \\(t_1 = t_4 - 3 \\times 5 = 17 - 15 = 2\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Subtracted one difference from the 4th term: \\(17 - 5 = 12\\). The 1st term is three steps back, not one."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Subtracted two differences: \\(17 - 2 \\times 5 = 7\\). The 1st term is three steps back from the 4th, not two."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Returned the 4th term value without working backwards."
      }
    ],
    "backward": "Difference from two terms, then back.",
    "forward": "Linear interpolation."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(4n+7\\). Which term equals \\(55\\)?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(4n+7 = 55 \\implies 4n = 48 \\implies n = 12\\)."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "Subtracted 7 to get \\(4n = 48\\), then stopped — the division by 4 is still to do."
      },
      {
        "text": "\\(62\\)",
        "correct": false,
        "feedback": "Added 7 in the wrong direction: \\(55 + 7 = 62\\). Subtracting 7 was needed."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Returned the given term value without solving."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(20, 15, 10, 5, \\ldots\\)",
    "options": [
      {
        "text": "\\(-5n+25\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= -5\\). At \\(n=1\\): \\(-5(1)+25 = 20\\). Rule: \\(-5n+25\\)."
      },
      {
        "text": "\\(5n+15\\)",
        "correct": false,
        "feedback": "Flipped the sign of the difference to \\(+5\\), then matched the first term by choosing the constant: \\(5(1)+15 = 20\\). Fails at \\(n=2\\): \\(5(2)+15 = 25 \\neq 15\\). The terms are decreasing, so the coefficient must be negative."
      },
      {
        "text": "\\(-5n+20\\)",
        "correct": false,
        "feedback": "Correct coefficient (\\(-5\\)) but the constant is wrong: \\(-5(1)+20 = 15\\), not 20."
      },
      {
        "text": "\\(25n-5\\)",
        "correct": false,
        "feedback": "Swapped the roles of coefficient and constant: used 25 (the constant) as the coefficient of \\(n\\) and \\(-5\\) (the coefficient) as the constant. \\(25(1)-5 = 20\\) matches the first term but \\(25(2)-5 = 45 \\neq 15\\)."
      }
    ],
    "backward": "Negative difference.",
    "forward": "Decreasing sequences in algebra."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the 11th triangular number?",
    "options": [
      {
        "text": "\\(66\\)",
        "correct": true,
        "feedback": "Correct. Triangular numbers: \\(1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, \\ldots\\). The 11th is 66."
      },
      {
        "text": "\\(121\\)",
        "correct": false,
        "feedback": "Used \\(11^2 = 121\\) — the 11th square number, not triangular."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Used the 10th triangular number (55) — off by one."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "Used the 12th triangular number (78) — off by one the other way."
      }
    ],
    "backward": "Extending special sequences.",
    "forward": "Triangular numbers in counting."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 10th term of \\(5n-2\\), then subtract the 5th term of the same formula.",
    "options": [
      {
        "text": "\\(25\\)",
        "correct": true,
        "feedback": "Correct. 10th \\(= 5(10)-2 = 48\\). 5th \\(= 5(5)-2 = 23\\). Difference \\(= 48 - 23 = 25\\)."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "Computed only the 10th term (48)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Computed only the 5th term (23)."
      },
      {
        "text": "\\(71\\)",
        "correct": false,
        "feedback": "Added the two terms instead of subtracting: \\(48 + 23 = 71\\)."
      }
    ],
    "backward": "Two substitutions of the same formula.",
    "forward": "Sequence differences."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "A machine multiplies its input by 5, then subtracts 3. If the output is 22, what was the input?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Working backwards: \\((22+3)/5 = 25/5 = 5\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Subtracted 3 instead of adding: \\(22 - 3 = 19\\), then stopped without dividing."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Added 3 to get 25, then stopped — the division by 5 is still to do."
      },
      {
        "text": "\\(110\\)",
        "correct": false,
        "feedback": "Multiplied the output by 5 instead of dividing: \\(22 \\times 5 = 110\\)."
      }
    ],
    "backward": "Reverse two-step machine.",
    "forward": "Inverse operations in algebra."
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
    title: "Sequences and Functions — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Two-step sequence reasoning — distant terms, decreasing sequences, sequence membership, comparing terms of two rules, and two-step function machines — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not a test, not timed. These questions each combine two steps within a single topic: for example, find the rule and then apply it, or evaluate a formula and then compare. Work through each question carefully; if something feels tricky, that is useful information, not a failure.</p><p>You will see questions from all six topics. Take your time — accuracy matters more than speed.</p>",
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

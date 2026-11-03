// seed/mathSeedCh9SequencesFunctionsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 9
// (Sequences and Functions), Level 1 — converted from the
// standalone diagnostic JSON ch9-sequences-functions-level-1.json.
//
// Run with: node seed/mathSeedCh9SequencesFunctionsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-9-sequences-functions";
const CHAPTER_NAME = "Sequences and Functions";
const LEVEL = 1;

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
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 5th term of the sequence with nth term \\(2n+1\\).",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(2(5)+1 = 11\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Used \\(n=3\\): \\(2(3)+1 = 7\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Computed \\(2 \\times 5 = 10\\), forgot to add 1."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Used \\(n=6\\): \\(2(6)+1 = 13\\)."
      }
    ],
    "retryHint": "Substitute \\(n=5\\) into \\(2n+1\\). Multiply first, then add.",
    "backward": "Substituting into an expression — same as Ch2.",
    "forward": "Nth-term formulas return in Ch10 graphs."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the next term: \\(3, 7, 11, 15, \\ldots\\)",
    "options": [
      {
        "text": "\\(19\\)",
        "correct": true,
        "feedback": "Correct. Terms increase by 4: \\(15+4=19\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Added 3: \\(15+3=18\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Added 1: \\(15+1=16\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Added 5: \\(15+5=20\\)."
      }
    ],
    "retryHint": "Find the difference between consecutive terms.",
    "backward": "Subtraction to find difference.",
    "forward": "Difference pattern is the basis of the nth-term method."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(1, 4, 9, 16, \\ldots\\)",
    "options": [
      {
        "text": "\\(25\\)",
        "correct": true,
        "feedback": "Correct. These are squares: \\(1^2, 2^2, 3^2, 4^2\\). Next is \\(5^2 = 25\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Added the last difference (4): \\(16+4=20\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Added 6: \\(16+6=22\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Used \\(6^2=36\\), skipping the 5th square."
      }
    ],
    "retryHint": "Look for a special pattern — try squaring the position number.",
    "backward": "Knowing the first five square numbers.",
    "forward": "Square patterns appear in quadratic sequences later."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(5, 8, 11, 14, \\ldots\\)",
    "options": [
      {
        "text": "\\(3n+2\\)",
        "correct": true,
        "feedback": "Correct. Difference 3, so coefficient of \\(n\\) is 3. When \\(n=1\\): \\(3(1)+2 = 5\\). Rule: \\(3n+2\\)."
      },
      {
        "text": "\\(3n+5\\)",
        "correct": false,
        "feedback": "Used the first term (5) directly as the constant — but 5 = 3(1)+2, so the constant is 2, not 5."
      },
      {
        "text": "\\(5n+3\\)",
        "correct": false,
        "feedback": "Swapped difference (3) and constant (5). Difference is 3, so the coefficient of \\(n\\) is 3."
      },
      {
        "text": "\\(3n+1\\)",
        "correct": false,
        "feedback": "Correct difference (3) but wrong constant — \\(3(1)+1 = 4\\), not 5."
      }
    ],
    "retryHint": "Difference → coefficient of \\(n\\). Test \\(n=1\\) to find the constant.",
    "backward": "Finding common difference.",
    "forward": "Nth-term formulas underpin Ch10 graphing."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x\\). Find \\(f(4)\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(f(4) = 3 \\times 4 = 12\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Added \\(3+4=7\\) instead of multiplying."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Returned the input (4) without applying the rule."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Computed \\(3^2 = 9\\) — treated the input as an exponent."
      }
    ],
    "retryHint": "Substitute 4 for \\(x\\): \\(f(4) = 3 \\times 4\\).",
    "backward": "Substitution — same as evaluating any expression.",
    "forward": "Function notation appears in Ch10 graphs."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term of a sequence is \\(4n+1\\). Which term equals \\(21\\)?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(4n+1 = 21 \\implies 4n = 20 \\implies n = 5\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Solved \\(4n+1=21\\) as \\(4n = 20\\), but forgot to divide by 4."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Added 1 instead of subtracting: \\(4n = 22\\)."
      },
      {
        "text": "\\(84\\)",
        "correct": false,
        "feedback": "Multiplied instead of solving: \\(4 \\times 21 = 84\\)."
      }
    ],
    "retryHint": "Subtract 1 from both sides, then divide by 4.",
    "backward": "Solving a simple equation — Ch4.",
    "forward": "Working backwards from formula to position."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(2, 6, 18, 54, \\ldots\\)",
    "options": [
      {
        "text": "\\(162\\)",
        "correct": true,
        "feedback": "Correct. Each term is multiplied by 3: \\(54 \\times 3 = 162\\)."
      },
      {
        "text": "\\(108\\)",
        "correct": false,
        "feedback": "Multiplied by 2 instead of 3: \\(54 \\times 2 = 108\\)."
      },
      {
        "text": "\\(540\\)",
        "correct": false,
        "feedback": "Multiplied by 10: \\(54 \\times 10 = 540\\)."
      },
      {
        "text": "\\(57\\)",
        "correct": false,
        "feedback": "Added 3 instead of multiplying: \\(54+3=57\\)."
      }
    ],
    "retryHint": "Divide consecutive terms — is there a constant multiplier?",
    "backward": "Recognising a multiplication pattern (geometric).",
    "forward": "Geometric sequences appear in Ch11 direct proportion."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 2x-5\\). Find \\(f(10)\\).",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": true,
        "feedback": "Correct. \\(f(10) = 2(10)-5 = 20-5 = 15\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Computed \\(2(10) = 20\\), forgot to subtract 5."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Computed \\(2(10)+5 = 25\\), wrong sign."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Returned the input without applying the rule."
      }
    ],
    "retryHint": "Substitute 10 for \\(x\\): \\(2(10)-5\\). Multiply before subtracting.",
    "backward": "Two-step substitution.",
    "forward": "Function machines become two-step operations."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the 10th term of \\(5, 9, 13, 17, \\ldots\\)",
    "options": [
      {
        "text": "\\(41\\)",
        "correct": true,
        "feedback": "Correct. Difference 4, first term 5. 10th term \\(= 5 + 9 \\times 4 = 41\\)."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "\\(5 + 10 \\times 4 = 45\\) — used 10 steps instead of 9."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "\\(10 \\times 4 = 40\\) — forgot to add the first term."
      },
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "\\(5 + 8 \\times 4 = 37\\) — used 8 steps."
      }
    ],
    "backward": "Counting steps — 9 steps from 1st to 10th.",
    "forward": "Nth-term formula gives a direct method."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(3n+2\\). Which term equals \\(32\\)?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(3n+2=32 \\implies 3n=30 \\implies n=10\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "\\(32-2 = 30\\), forgot to divide by 3."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Returned the given value without solving."
      },
      {
        "text": "\\(98\\)",
        "correct": false,
        "feedback": "Substituted in the wrong direction: \\(3(32)+2 = 98\\)."
      }
    ],
    "backward": "Solving linear equations.",
    "forward": "Working backwards from terms to positions."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(7, 10, 13, 16, \\ldots\\)",
    "options": [
      {
        "text": "\\(3n+4\\)",
        "correct": true,
        "feedback": "Correct. Difference 3 → coefficient 3. At \\(n=1\\): \\(3(1)+4=7\\). Rule: \\(3n+4\\)."
      },
      {
        "text": "\\(3n+7\\)",
        "correct": false,
        "feedback": "Used the first term as the constant (\\(3n+7\\)) — this gives 10 at \\(n=1\\), shifted by one."
      },
      {
        "text": "\\(4n+3\\)",
        "correct": false,
        "feedback": "Read the difference as 4 instead of 3."
      },
      {
        "text": "\\(3n+3\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(3(1)+3=6\\), not 7."
      }
    ],
    "backward": "Finding common difference.",
    "forward": "Predicting far terms."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next two terms of \\(1, 1, 2, 3, 5, 8, \\ldots\\)",
    "options": [
      {
        "text": "\\(13, 21\\)",
        "correct": true,
        "feedback": "Correct. Each term is the sum of the previous two: \\(5+8=13\\), \\(8+13=21\\)."
      },
      {
        "text": "\\(11, 14\\)",
        "correct": false,
        "feedback": "Continued adding 3 after 8: \\(8+3=11\\), \\(11+3=14\\) — not a Fibonacci pattern."
      },
      {
        "text": "\\(16, 32\\)",
        "correct": false,
        "feedback": "Doubled the last term: \\(8 \\times 2 = 16\\), \\(16 \\times 2 = 32\\) — multiplication, not summation."
      },
      {
        "text": "\\(11, 19\\)",
        "correct": false,
        "feedback": "Partial Fibonacci: \\(8+3=11\\), then \\(11+8=19\\). Used the wrong pair for the second step."
      }
    ],
    "backward": "Fibonacci pattern — each term is a sum.",
    "forward": "Recursive rules appear in higher sequences."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 20th term of \\(5n-3\\).",
    "options": [
      {
        "text": "\\(97\\)",
        "correct": true,
        "feedback": "Correct. \\(5(20)-3 = 100-3 = 97\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "\\(5(20)=100\\), forgot the \\(-3\\)."
      },
      {
        "text": "\\(103\\)",
        "correct": false,
        "feedback": "\\(5(20)+3 = 103\\), used the wrong sign."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Returned \\(n\\) without applying the rule."
      }
    ],
    "backward": "Substitution into a formula.",
    "forward": "Evaluating expressions at large \\(n\\)."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "For the sequence \\(10, 14, 18, 22, \\ldots\\) find the nth term, then the 15th term.",
    "options": [
      {
        "text": "\\(66\\)",
        "correct": true,
        "feedback": "Correct. Difference 4 → \\(4n+6\\) (since \\(4(1)+6=10\\)). 15th term \\(= 4(15)+6 = 66\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "\\(4(15) = 60\\), forgot the \\(+6\\)."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Used the first term (10) as the constant: \\(4(15)+10 = 70\\)."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "\\(4(15)+4 = 64\\), constant off by 2."
      }
    ],
    "backward": "Finding the rule (C2) then using it (C3) — two skills chained.",
    "forward": "Multi-step sequence problems."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(5, 15, 45, 135, \\ldots\\)",
    "options": [
      {
        "text": "\\(405\\)",
        "correct": true,
        "feedback": "Correct. Constant multiplier 3: \\(135 \\times 3 = 405\\)."
      },
      {
        "text": "\\(270\\)",
        "correct": false,
        "feedback": "Multiplied by 2: \\(135 \\times 2 = 270\\)."
      },
      {
        "text": "\\(675\\)",
        "correct": false,
        "feedback": "Multiplied by 5: \\(135 \\times 5 = 675\\)."
      },
      {
        "text": "\\(138\\)",
        "correct": false,
        "feedback": "Added 3: \\(135+3=138\\)."
      }
    ],
    "backward": "Recognising geometric pattern.",
    "forward": "Geometric sequences return in Ch11."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(7n-4\\). Which term equals \\(45\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(7n-4=45 \\implies 7n=49 \\implies n=7\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "\\(45+4=49\\), forgot to divide by 7."
      },
      {
        "text": "\\(41\\)",
        "correct": false,
        "feedback": "\\(45-4=41\\) — subtracted the constant in the wrong direction."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "From \\(7n=49\\), subtracted 7 instead of dividing: \\(49-7=42\\). The correct operation is division."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Solving for term positions."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(2, 5, 8, 11, \\ldots\\)",
    "options": [
      {
        "text": "\\(3n-1\\)",
        "correct": true,
        "feedback": "Correct. Difference 3, first term 2. \\(3(1)-1 = 2\\), so rule is \\(3n-1\\)."
      },
      {
        "text": "\\(3n+2\\)",
        "correct": false,
        "feedback": "Used the first term (2) as the constant — gives 5 at \\(n=1\\), shifted."
      },
      {
        "text": "\\(2n+3\\)",
        "correct": false,
        "feedback": "Swapped difference (3) and constant (2)."
      },
      {
        "text": "\\(3n+1\\)",
        "correct": false,
        "feedback": "Constant off by 2: \\(3(1)+1 = 4\\), not 2."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Forming the general rule."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(1, 3, 6, 10, 15, \\ldots\\)",
    "options": [
      {
        "text": "\\(21\\)",
        "correct": true,
        "feedback": "Correct. These are triangular numbers. Differences are \\(2, 3, 4, 5\\); next is \\(6\\), so \\(15+6=21\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Added 3: \\(15+3=18\\) — used an early difference instead of the next one."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Added 5: \\(15+5=20\\) — used the previous difference instead of continuing."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Added 7: \\(15+7=22\\) — skipped the difference 6."
      }
    ],
    "backward": "Spotting the increasing-difference pattern.",
    "forward": "Triangular numbers appear in combinatorics."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 8th term of \\(4n+7\\).",
    "options": [
      {
        "text": "\\(39\\)",
        "correct": true,
        "feedback": "Correct. \\(4(8)+7 = 32+7 = 39\\)."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "\\(4(8) = 32\\), forgot the \\(+7\\)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "Used \\(n=7\\): \\(4(7)+7 = 35\\)."
      },
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "Used \\(n=9\\): \\(4(9)+7 = 43\\)."
      }
    ],
    "backward": "Substituting into formulas.",
    "forward": "Evaluating expressions."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "\\(f(x) = 3x-2\\). Find the value of \\(x\\) when \\(f(x) = 19\\).",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(3x-2=19 \\implies 3x=21 \\implies x=7\\)."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "\\(f(19)=3(19)-2=55\\) — applied \\(f\\) to 19 instead of solving."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "\\(3x=19+2=21\\), forgot to divide by 3."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Returned the target value without solving."
      }
    ],
    "backward": "Function notation + solving equation — two skills combined.",
    "forward": "Inverse functions in Ch10."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the next term: \\(100, 90, 80, 70, \\ldots\\)",
    "options": [
      {
        "text": "\\(60\\)",
        "correct": true,
        "feedback": "Correct. Each term decreases by 10: \\(70-10=60\\)."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Subtracted 20."
      },
      {
        "text": "\\(65\\)",
        "correct": false,
        "feedback": "Subtracted 5."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Subtracted 15."
      }
    ],
    "backward": "Recognising a decreasing arithmetic pattern.",
    "forward": "Negative differences handled in algebra."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(6n+1\\). Which term equals \\(73\\)?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(6n+1=73 \\implies 6n=72 \\implies n=12\\)."
      },
      {
        "text": "\\(72\\)",
        "correct": false,
        "feedback": "\\(73-1=72\\), forgot to divide by 6."
      },
      {
        "text": "\\(74\\)",
        "correct": false,
        "feedback": "\\(73+1=74\\), wrong direction."
      },
      {
        "text": "\\(438\\)",
        "correct": false,
        "feedback": "Multiplied the coefficient by the target (forgot to solve, forgot the constant): \\(6 \\times 73 = 438\\)."
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
    "question": "Find the nth term of \\(4, 9, 14, 19, \\ldots\\)",
    "options": [
      {
        "text": "\\(5n-1\\)",
        "correct": true,
        "feedback": "Correct. Difference 5. At \\(n=1\\): \\(5(1)-1 = 4\\). Rule: \\(5n-1\\)."
      },
      {
        "text": "\\(5n+4\\)",
        "correct": false,
        "feedback": "Used first term (4) as constant — gives 9 at \\(n=1\\), shifted by one."
      },
      {
        "text": "\\(4n+5\\)",
        "correct": false,
        "feedback": "Swapped difference (5) and constant (4)."
      },
      {
        "text": "\\(5n+1\\)",
        "correct": false,
        "feedback": "Constant off by 2."
      }
    ],
    "backward": "Finding difference and testing.",
    "forward": "Rule formation."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(4, 9, 16, 25, \\ldots\\)",
    "options": [
      {
        "text": "\\(36\\)",
        "correct": true,
        "feedback": "Correct. These are \\(2^2, 3^2, 4^2, 5^2\\). Next is \\(6^2 = 36\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Used \\(7^2 = 49\\), skipping the 6th square."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "Added 5 (last difference)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "Added 10 (doubled last difference)."
      }
    ],
    "backward": "Square numbers.",
    "forward": "Recognising non-arithmetic patterns."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 30th term of \\(3n+6\\).",
    "options": [
      {
        "text": "\\(96\\)",
        "correct": true,
        "feedback": "Correct. \\(3(30)+6 = 90+6 = 96\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "\\(3(30)=90\\), forgot \\(+6\\)."
      },
      {
        "text": "\\(99\\)",
        "correct": false,
        "feedback": "Used \\(n=31\\): \\(3(31)+6=99\\)."
      },
      {
        "text": "\\(93\\)",
        "correct": false,
        "feedback": "Used \\(n=29\\) (off by one): \\(3(29)+6 = 87+6 = 93\\). The 30th term uses \\(n=30\\), not \\(n=29\\)."
      }
    ],
    "backward": "Substituting into formulas.",
    "forward": "Large-\\(n\\) evaluation."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A function machine has the rule: input → multiply by 3 → add 2 → output. Which correctly expresses this as \\(f(x)\\) and evaluates \\(f(5)\\)?",
    "options": [
      {
        "text": "\\(f(x)=3x+2\\) and \\(f(5)=17\\)",
        "correct": true,
        "feedback": "Correct. Rule is multiply by 3 THEN add 2: \\(f(x)=3x+2\\). \\(f(5)=3(5)+2=17\\)."
      },
      {
        "text": "\\(f(x)=3(x+2)\\) and \\(f(5)=21\\)",
        "correct": false,
        "feedback": "Read the machine as 'add 2 first, then multiply by 3' — reversed order."
      },
      {
        "text": "\\(f(x)=2x+3\\) and \\(f(5)=13\\)",
        "correct": false,
        "feedback": "Swapped the two operations (multiply by 2, add 3)."
      },
      {
        "text": "\\(f(x)=3x+2\\) and \\(f(5)=5\\)",
        "correct": false,
        "feedback": "Applied the rule but returned the input — forgot to multiply."
      }
    ],
    "backward": "Translating a machine into function notation + substituting.",
    "forward": "Two-step function rules appear in Ch10."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the 12th term of \\(7, 12, 17, 22, \\ldots\\)",
    "options": [
      {
        "text": "\\(62\\)",
        "correct": true,
        "feedback": "Correct. Difference 5, first term 7. 12th term \\(= 7 + 11 \\times 5 = 62\\)."
      },
      {
        "text": "\\(67\\)",
        "correct": false,
        "feedback": "\\(7 + 12 \\times 5 = 67\\) — used 12 steps instead of 11."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "\\(12 \\times 5 = 60\\) — forgot first term."
      },
      {
        "text": "\\(57\\)",
        "correct": false,
        "feedback": "\\(7 + 10 \\times 5 = 57\\) — used 10 steps."
      }
    ],
    "backward": "Counting steps between positions.",
    "forward": "Nth-term formula."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(8n-3\\). Which term equals \\(61\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(8n-3=61 \\implies 8n=64 \\implies n=8\\)."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "\\(61+3=64\\), forgot to divide by 8."
      },
      {
        "text": "\\(58\\)",
        "correct": false,
        "feedback": "\\(61-3=58\\), subtracted in wrong direction."
      },
      {
        "text": "\\(53\\)",
        "correct": false,
        "feedback": "Off-by-one on \\(n\\): used \\(n=7\\), giving \\(8(7)-3=53\\). The correct position is \\(n=8\\)."
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
    "question": "Find the nth term of \\(9, 13, 17, 21, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n+5\\)",
        "correct": true,
        "feedback": "Correct. Difference 4. At \\(n=1\\): \\(4(1)+5 = 9\\). Rule: \\(4n+5\\)."
      },
      {
        "text": "\\(4n+9\\)",
        "correct": false,
        "feedback": "First term (9) used as constant — shifted by one."
      },
      {
        "text": "\\(5n+4\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(4n+4\\)",
        "correct": false,
        "feedback": "Constant off by 1."
      }
    ],
    "backward": "Difference and test.",
    "forward": "Rule formation."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(25, 36, 49, \\ldots\\)",
    "options": [
      {
        "text": "\\(64\\)",
        "correct": true,
        "feedback": "Correct. These are \\(5^2, 6^2, 7^2\\). Next is \\(8^2 = 64\\)."
      },
      {
        "text": "\\(81\\)",
        "correct": false,
        "feedback": "Used \\(9^2 = 81\\), skipping the 8th square."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "Added 7 (too small)."
      },
      {
        "text": "\\(62\\)",
        "correct": false,
        "feedback": "Added 13 (repeated the previous difference — differences are 11, 13, next is 15)."
      }
    ],
    "backward": "Square numbers.",
    "forward": "Recognising square patterns quickly."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 15th term of \\(6n-5\\).",
    "options": [
      {
        "text": "\\(85\\)",
        "correct": true,
        "feedback": "Correct. \\(6(15)-5 = 90-5 = 85\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "\\(6(15)=90\\), forgot \\(-5\\)."
      },
      {
        "text": "\\(95\\)",
        "correct": false,
        "feedback": "\\(6(15)+5=95\\), wrong sign."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Multiplied by 5 (wrong coefficient) instead of 6: \\(5(15)-5 = 75-5 = 70\\)."
      }
    ],
    "backward": "Substituting into formulas.",
    "forward": "Evaluation at any \\(n\\)."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Sequence A has nth term \\(2n+3\\). Sequence B has nth term \\(3n-1\\). For which term number \\(n\\) do both sequences give the same value?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Set equal: \\(2n+3=3n-1 \\implies 4 = n\\). At \\(n=4\\): A gives \\(11\\), B gives \\(11\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "\\(11\\) is the common *value*, not the term number."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "\\(n=5\\) → A gives 13, B gives 14 (not equal, off by 1)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "\\(n=3\\) → A gives 9, B gives 8 (not equal, off by 1)."
      }
    ],
    "backward": "Forming and solving an equation from two rules — C2 + C4 combined.",
    "forward": "Simultaneous equations in Ch4."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the next term: \\(4, 11, 18, 25, \\ldots\\)",
    "options": [
      {
        "text": "\\(32\\)",
        "correct": true,
        "feedback": "Correct. Difference 7: \\(25+7=32\\)."
      },
      {
        "text": "\\(39\\)",
        "correct": false,
        "feedback": "Added 14."
      },
      {
        "text": "\\(28\\)",
        "correct": false,
        "feedback": "Added 3."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Added 4."
      }
    ],
    "backward": "Arithmetic pattern.",
    "forward": "Nth-term method."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(5n+4\\). Which term equals \\(39\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(5n+4=39 \\implies 5n=35 \\implies n=7\\)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "\\(39-4=35\\), forgot to divide."
      },
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "\\(39+4=43\\), wrong direction."
      },
      {
        "text": "\\(199\\)",
        "correct": false,
        "feedback": "\\(5(39)+4=199\\), substituted wrongly."
      }
    ],
    "backward": "Solving linear equation.",
    "forward": "Backwards problems."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(6, 10, 14, 18, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n+2\\)",
        "correct": true,
        "feedback": "Correct. Difference 4. At \\(n=1\\): \\(4(1)+2=6\\). Rule: \\(4n+2\\)."
      },
      {
        "text": "\\(4n+6\\)",
        "correct": false,
        "feedback": "First term as constant (shifted by one)."
      },
      {
        "text": "\\(2n+4\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(4n+1\\)",
        "correct": false,
        "feedback": "Constant off by 1."
      }
    ],
    "backward": "Difference + test.",
    "forward": "General rule."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(5, 8, 13, 21, \\ldots\\)",
    "options": [
      {
        "text": "\\(34\\)",
        "correct": true,
        "feedback": "Correct. Each term is the sum of the two before it: \\(13+21=34\\)."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Added 8 to 21 (used an earlier term)."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "Doubled 21: \\(21 \\times 2 = 42\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Returned an earlier term."
      }
    ],
    "backward": "Fibonacci-style pattern.",
    "forward": "Recursive sequences."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 20th term of \\(3n+5\\).",
    "options": [
      {
        "text": "\\(65\\)",
        "correct": true,
        "feedback": "Correct. \\(3(20)+5=65\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "\\(3(20)=60\\), forgot \\(+5\\)."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "\\(3(20)+10=70\\), doubled the constant."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Subtracted the constant instead of adding: \\(3(20)-5 = 60-5 = 55\\). The formula is \\(3n+5\\), not \\(3n-5\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluating at large \\(n\\)."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x\\). Find \\(f(f(2))\\).",
    "options": [
      {
        "text": "\\(18\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2)=3(2)=6\\), then \\(f(6)=3(6)=18\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(2)=6\\), forgot the second application."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Doubled the inner result: \\(2 \\times 6=12\\)."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "Applied \\(f\\) three times: \\(f(f(f(2)))=54\\)."
      }
    ],
    "backward": "Applying a function twice — composite evaluation.",
    "forward": "Inverse and composite functions in Ch10."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Find the 15th term of \\(3, 8, 13, 18, \\ldots\\)",
    "options": [
      {
        "text": "\\(73\\)",
        "correct": true,
        "feedback": "Correct. Difference 5, first term 3. 15th term \\(= 3 + 14 \\times 5 = 73\\)."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "\\(3+15 \\times 5=78\\) — off-by-one."
      },
      {
        "text": "\\(75\\)",
        "correct": false,
        "feedback": "\\(15 \\times 5=75\\) — forgot first term."
      },
      {
        "text": "\\(68\\)",
        "correct": false,
        "feedback": "\\(3+13 \\times 5=68\\) — used 13 steps."
      }
    ],
    "backward": "Counting steps.",
    "forward": "General formula."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(4n+3\\). Which term equals \\(51\\)?",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. \\(4n+3=51 \\implies 4n=48 \\implies n=12\\)."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "\\(51-3=48\\), forgot to divide."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "\\(51+3=54\\), wrong direction."
      },
      {
        "text": "\\(207\\)",
        "correct": false,
        "feedback": "\\(4(51)+3=207\\), substituted wrongly."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Backwards problems."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(10, 16, 22, 28, \\ldots\\)",
    "options": [
      {
        "text": "\\(6n+4\\)",
        "correct": true,
        "feedback": "Correct. Difference 6. At \\(n=1\\): \\(6(1)+4=10\\). Rule: \\(6n+4\\)."
      },
      {
        "text": "\\(6n+10\\)",
        "correct": false,
        "feedback": "First term as constant (shifted)."
      },
      {
        "text": "\\(4n+6\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(6n+3\\)",
        "correct": false,
        "feedback": "Constant off by 1."
      }
    ],
    "backward": "Difference + test.",
    "forward": "General rule."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the next term: \\(6, 10, 15, 21, \\ldots\\)",
    "options": [
      {
        "text": "\\(28\\)",
        "correct": true,
        "feedback": "Correct. Triangular-pattern: differences are 4, 5, 6, so next is 7: \\(21+7=28\\)."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "Added 6 (used previous difference)."
      },
      {
        "text": "\\(26\\)",
        "correct": false,
        "feedback": "Added 5 (used an earlier difference)."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Added 8."
      }
    ],
    "backward": "Increasing-difference pattern.",
    "forward": "Triangular numbers."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 50th term of \\(2n+1\\).",
    "options": [
      {
        "text": "\\(101\\)",
        "correct": true,
        "feedback": "Correct. \\(2(50)+1 = 101\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "\\(2(50)=100\\), forgot \\(+1\\)."
      },
      {
        "text": "\\(103\\)",
        "correct": false,
        "feedback": "Used \\(n=51\\): \\(2(51)+1=103\\)."
      },
      {
        "text": "\\(99\\)",
        "correct": false,
        "feedback": "Used \\(n=49\\) (off by one): \\(2(49)+1 = 98+1 = 99\\). The 50th term uses \\(n=50\\), not \\(n=49\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Large-\\(n\\) evaluation."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 2x+5\\). Find \\(f(f(1))\\).",
    "options": [
      {
        "text": "\\(19\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1)=2(1)+5=7\\), then \\(f(7)=2(7)+5=19\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1)=7\\) — forgot the second application."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Computed \\(f(1)=7\\), then added 5 instead of doubling at the second step: \\(7+5=12\\). The outer function doubles first."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Computed \\(f(1)=7\\), then sign error on the second application: \\(2(7)-5=9\\). The formula is \\(2x+5\\), not \\(2x-5\\)."
      }
    ],
    "backward": "Composite function evaluation.",
    "forward": "Function composition in Ch10."
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
    title: "Sequences and Functions — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Term-to-term rules, finding and using the nth term, working backwards, special sequences, and simple function notation — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not a test, not timed. It checks what is solid across six sequence-and-function topics: term-to-term rules, finding and using the nth term, working backwards, special sequences, and function problems. Work through each question carefully; if something feels tricky, that is useful information, not a failure.</p><p>You will see questions from all six topics. Take your time.</p>",
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

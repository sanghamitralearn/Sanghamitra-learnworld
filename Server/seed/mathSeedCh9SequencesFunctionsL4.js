// seed/mathSeedCh9SequencesFunctionsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 9
// (Sequences and Functions), Level 4 — converted from the
// standalone diagnostic JSON ch9-sequences-functions-level-4.json.
//
// Run with: node seed/mathSeedCh9SequencesFunctionsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-9-sequences-functions";
const CHAPTER_NAME = "Sequences and Functions";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Sequence \\(4, 9, 14, 19, \\ldots\\) — find the 10th term.",
    "options": [
      {
        "text": "\\(49\\)",
        "correct": true,
        "feedback": "Correct. Difference 5. 10th term \\(= 4 + 9 \\times 5 = 49\\)."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "Counted 9 steps but forgot the first term: \\(9 \\times 5 = 45\\)."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "Used 10 steps: \\(4 + 10 \\times 5 = 54\\)."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Used 8 steps: \\(4 + 8 \\times 5 = 44\\)."
      }
    ],
    "retryHint": "10th term = first term + (10−1) × difference.",
    "backward": "Term-to-term extension.",
    "forward": "Distant-term computation."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "tier": "S",
    "question": "Find the 7th term of \\(3n-2\\).",
    "options": [
      {
        "text": "\\(19\\)",
        "correct": true,
        "feedback": "Correct. \\(3(7)-2 = 19\\)."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Dropped the constant: \\(3(7) = 21\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Wrong sign: \\(3(7)+2 = 23\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Used \\(n=6\\): \\(3(6)-2 = 16\\)."
      }
    ],
    "retryHint": "Substitute n=7, multiply first, then subtract.",
    "backward": "Substitution.",
    "forward": "Evaluation."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "S",
    "question": "What is the 7th triangular number?",
    "options": [
      {
        "text": "\\(28\\)",
        "correct": true,
        "feedback": "Correct. \\(T_7 = 7 \\times 8 / 2 = 28\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Confused with squares: \\(7^2 = 49\\)."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "6th triangular (21) — off by one."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "8th triangular (36) — off by one the other way."
      }
    ],
    "retryHint": "\\(T_n = n(n+1)/2\\), with n=7.",
    "backward": "Applying special formula.",
    "forward": "Combinatorial counting."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "tier": "S",
    "question": "Find the nth term of \\(3, 7, 11, 15, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n-1\\)",
        "correct": true,
        "feedback": "Correct. Difference 4. Test \\(n=1\\): \\(4(1)-1 = 3\\)."
      },
      {
        "text": "\\(4n+3\\)",
        "correct": false,
        "feedback": "Used the first term's value (3) as the constant. This rule gives \\(4(1)+3 = 7\\) at \\(n=1\\) — it matches \\(t_2\\), not \\(t_1\\), so the rule is shifted by one."
      },
      {
        "text": "\\(3n+4\\)",
        "correct": false,
        "feedback": "Swapped the difference and the constant."
      },
      {
        "text": "\\(4n-2\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(4(1)-2 = 2 \\neq 3\\)."
      }
    ],
    "retryHint": "Difference → coefficient of n. Test n=1 to find the constant.",
    "backward": "Finding the difference.",
    "forward": "Rule formation."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "tier": "S",
    "question": "The nth term is \\(5n+2\\). Which term equals 37?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(5n+2 = 37 \\implies n = 7\\)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "\\(37-2 = 35\\), forgot to divide by 5."
      },
      {
        "text": "\\(39\\)",
        "correct": false,
        "feedback": "Added 2 in the wrong direction: \\(37+2 = 39\\)."
      },
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "retryHint": "Subtract 2, then divide by 5.",
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "S",
    "question": "\\(f(x) = 2x+1\\). Find \\(f(5)\\).",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(f(5) = 2(5)+1 = 11\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Forgot the \\(+1\\): \\(2(5) = 10\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Used wrong constant: \\(2(5)+2 = 12\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned the input."
      }
    ],
    "retryHint": "Substitute 5 for x, multiply, then add.",
    "backward": "Substitution.",
    "forward": "Function notation appears in Ch10."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "S",
    "question": "Geometric: \\(3, 12, 48, \\ldots\\) Find the next term.",
    "options": [
      {
        "text": "\\(192\\)",
        "correct": true,
        "feedback": "Correct. Multiplier 4: \\(48 \\times 4 = 192\\)."
      },
      {
        "text": "\\(144\\)",
        "correct": false,
        "feedback": "Multiplier 3: \\(48 \\times 3 = 144\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "Added the previous term: \\(48 + 12 = 60\\)."
      },
      {
        "text": "\\(51\\)",
        "correct": false,
        "feedback": "Added 3 (the first term): \\(48 + 3 = 51\\)."
      }
    ],
    "retryHint": "Find the constant multiplier (divide consecutive terms).",
    "backward": "Geometric pattern.",
    "forward": "Direct proportion in Ch11."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "S",
    "question": "What is the 9th square number?",
    "options": [
      {
        "text": "\\(81\\)",
        "correct": true,
        "feedback": "Correct. \\(9^2 = 81\\)."
      },
      {
        "text": "\\(45\\)",
        "correct": false,
        "feedback": "9th triangular (45), not square."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "8th square (64) — off by one."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "10th square (100) — off by one the other way."
      }
    ],
    "retryHint": "Square the position: \\(9^2\\).",
    "backward": "Square numbers.",
    "forward": "Recognising patterns."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "tier": "S",
    "question": "Sequence \\(5, 8, 11, 14, \\ldots\\) — 15th term?",
    "options": [
      {
        "text": "\\(47\\)",
        "correct": true,
        "feedback": "Correct. \\(5 + 14 \\times 3 = 47\\)."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Used 13 steps: \\(5 + 13 \\times 3 = 44\\)."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Used 15 steps: \\(5 + 15 \\times 3 = 50\\)."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "Forgot the first term: \\(14 \\times 3 = 42\\)."
      }
    ],
    "backward": "Term-to-term.",
    "forward": "Distant-term."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "tier": "C",
    "question": "The nth term is \\(6n-4\\). Which term equals 50?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(6n-4 = 50 \\implies 6n = 54 \\implies n = 9\\)."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "\\(50+4 = 54\\), forgot to divide by 6."
      },
      {
        "text": "\\(46\\)",
        "correct": false,
        "feedback": "\\(50-4 = 46\\), wrong direction."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Returned the target value."
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
    "tier": "S",
    "question": "Find the nth term of \\(6, 10, 14, 18, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n+2\\)",
        "correct": true,
        "feedback": "Correct. Difference 4. Test \\(n=1\\): \\(4(1)+2 = 6\\)."
      },
      {
        "text": "\\(4n+6\\)",
        "correct": false,
        "feedback": "Used the first term (6) as the constant. This gives \\(4(1)+6 = 10\\) — it matches \\(t_2\\), not \\(t_1\\), so the rule is shifted."
      },
      {
        "text": "\\(6n+4\\)",
        "correct": false,
        "feedback": "Swapped the difference and the constant."
      },
      {
        "text": "\\(4n+1\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(4(1)+1 = 5 \\neq 6\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Rule formation."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "T",
    "question": "What is the difference between the 8th triangular number and the 6th triangular number?",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": true,
        "feedback": "Correct. \\(T_8 = 36\\), \\(T_6 = 21\\). Difference \\(= 15\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "TRAP: subtracted the positions (\\(8-6=2\\)), then took \\(T_2 = 3\\). The question asks for the difference of the triangular **values**, not the triangular of the position difference."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Only the 8th triangular number (36)."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Only the 6th triangular number (21)."
      }
    ],
    "backward": "Special sequences.",
    "forward": "Comparing sequence values."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "tier": "S",
    "question": "Find the 9th term of \\(4n-3\\).",
    "options": [
      {
        "text": "\\(33\\)",
        "correct": true,
        "feedback": "Correct. \\(4(9)-3 = 33\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Dropped the constant: \\(4(9) = 36\\)."
      },
      {
        "text": "\\(39\\)",
        "correct": false,
        "feedback": "Wrong sign: \\(4(9)+3 = 39\\)."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Used \\(n=8\\): \\(4(8)-3 = 29\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluation."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "T",
    "question": "A machine multiplies by 3, then adds 5. Input 8 → what output?",
    "options": [
      {
        "text": "\\(29\\)",
        "correct": true,
        "feedback": "Correct. \\(3(8)+5 = 29\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Only multiplied: \\(3(8) = 24\\)."
      },
      {
        "text": "\\(39\\)",
        "correct": false,
        "feedback": "TRAP: reversed the operation order — added first, then multiplied: \\((8+5) \\times 3 = 39\\). Multiply first, then add."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Only added: \\(8+5 = 13\\)."
      }
    ],
    "backward": "Two-step machine.",
    "forward": "Composing operations."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "C",
    "question": "Geometric: \\(2, 10, 50, \\ldots\\) Find the 6th term.",
    "options": [
      {
        "text": "\\(6250\\)",
        "correct": true,
        "feedback": "Correct. Multiplier 5. \\(2 \\times 5^5 = 2 \\times 3125 = 6250\\)."
      },
      {
        "text": "\\(1250\\)",
        "correct": false,
        "feedback": "Used \\(5^4\\) — this is the 5th term (1250)."
      },
      {
        "text": "\\(31250\\)",
        "correct": false,
        "feedback": "Used \\(5^6\\) — this is the 7th term (31250)."
      },
      {
        "text": "\\(250\\)",
        "correct": false,
        "feedback": "Used \\(5^3\\) — this is the 4th term (250)."
      }
    ],
    "backward": "Geometric extension.",
    "forward": "Exponential growth."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "C",
    "question": "The nth term is \\(5n+3\\). The 4th term of this sequence equals the 3rd term of a second sequence with nth term \\(3n+k\\). Find \\(k\\).",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": true,
        "feedback": "Correct. 4th of first \\(= 5(4)+3 = 23\\). Second sequence: \\(3(3)+k = 9+k = 23 \\implies k = 14\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Stopped at the 4th term value (23) without solving for \\(k\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Forgot to multiply \\(n=3\\) by the coefficient 3 (treated \\(3n+k\\) as \\(3+k\\)): solved \\(3+k = 23\\), giving \\(k = 20\\). Should be \\(9+k = 23\\), giving \\(k = 14\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Computed \\(3(3) = 9\\) and stopped without solving."
      }
    ],
    "backward": "Substitution and solving.",
    "forward": "Matching sequence terms."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "tier": "S",
    "question": "Find the nth term of \\(7, 12, 17, 22, \\ldots\\)",
    "options": [
      {
        "text": "\\(5n+2\\)",
        "correct": true,
        "feedback": "Correct. Difference 5. Test \\(n=1\\): \\(5(1)+2 = 7\\)."
      },
      {
        "text": "\\(5n+7\\)",
        "correct": false,
        "feedback": "Used the first term (7) as the constant — matches \\(t_2\\), not \\(t_1\\)."
      },
      {
        "text": "\\(7n+5\\)",
        "correct": false,
        "feedback": "Swapped the difference and the constant."
      },
      {
        "text": "\\(5n+1\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(5(1)+1 = 6 \\neq 7\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Rule formation."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "C",
    "question": "What is the difference between the 15th square number and the 10th square number?",
    "options": [
      {
        "text": "\\(125\\)",
        "correct": true,
        "feedback": "Correct. \\(15^2 - 10^2 = 225 - 100 = 125\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Subtracted the positions first, then squared: \\((15-10)^2 = 5^2 = 25\\)."
      },
      {
        "text": "\\(325\\)",
        "correct": false,
        "feedback": "Added the two squares: \\(225+100 = 325\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "Only the 10th square."
      }
    ],
    "backward": "Square numbers.",
    "forward": "Difference of squares."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "tier": "C",
    "question": "Find the 12th term of \\(7n-5\\) and the 3rd term of \\(2n+8\\). What is their difference (first minus second)?",
    "options": [
      {
        "text": "\\(65\\)",
        "correct": true,
        "feedback": "Correct. 12th of first \\(= 7(12)-5 = 79\\). 3rd of second \\(= 2(3)+8 = 14\\). Difference \\(= 79 - 14 = 65\\)."
      },
      {
        "text": "\\(93\\)",
        "correct": false,
        "feedback": "Sum instead of difference: \\(79 + 14 = 93\\)."
      },
      {
        "text": "\\(79\\)",
        "correct": false,
        "feedback": "Only the first term (79)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Only the second term (14)."
      }
    ],
    "backward": "Two substitutions.",
    "forward": "Comparing sequences."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "H",
    "question": "\\(f(x) = 4x-2\\). Find \\(f(f(1))\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 2\\), then \\(f(2) = 6\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 2\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Wrong sign at second step: \\(4(2)+2 = 10\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Applied the function three times: \\(f(f(f(1))) = f(6) = 22\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Function composition in Ch10."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "tier": "S",
    "question": "Sequence \\(100, 90, 80, 70, \\ldots\\) — 12th term?",
    "options": [
      {
        "text": "\\(-10\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(-10\\): \\(100 + 11(-10) = -10\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Used 9 steps: \\(100 + 9(-10) = 10\\)."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Used 10 steps: \\(100 + 10(-10) = 0\\)."
      },
      {
        "text": "\\(-20\\)",
        "correct": false,
        "feedback": "Used 12 steps: \\(100 + 12(-10) = -20\\)."
      }
    ],
    "backward": "Negative difference.",
    "forward": "Decreasing sequences in algebra."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "C",
    "question": "The nth term is \\(6n-2\\). The term at position \\(p\\) equals 40. Find the term at position \\(2p\\).",
    "options": [
      {
        "text": "\\(82\\)",
        "correct": true,
        "feedback": "Correct. \\(6p-2 = 40 \\implies p = 7\\). \\(2p = 14\\). Term at 14: \\(6(14)-2 = 82\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Stopped at \\(2p = 14\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Stopped at \\(p = 7\\)."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Solving then substituting.",
    "forward": "Chained substitutions."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "tier": "T",
    "question": "Find the nth term of \\(4, 9, 14, 19, \\ldots\\)",
    "options": [
      {
        "text": "\\(5n-1\\)",
        "correct": true,
        "feedback": "Correct. Difference 5. Test \\(n=1\\): \\(5(1)-1 = 4\\)."
      },
      {
        "text": "\\(5n+4\\)",
        "correct": false,
        "feedback": "TRAP: \\(5n+4\\) gives \\(5(1)+4 = 9\\), matching \\(t_2\\) instead of \\(t_1\\). If you test against the 2nd term by mistake, you'll pick this. Testing against the 1st term reveals the error."
      },
      {
        "text": "\\(4n+5\\)",
        "correct": false,
        "feedback": "Swapped the difference and the constant."
      },
      {
        "text": "\\(5n+1\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(5(1)+1 = 6 \\neq 4\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Rule formation."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "tier": "T",
    "question": "What is the difference between the 12th square number and the 12th triangular number?",
    "options": [
      {
        "text": "\\(66\\)",
        "correct": true,
        "feedback": "Correct. \\(12^2 = 144\\), \\(T_{12} = 12 \\times 13 / 2 = 78\\). Difference \\(= 144 - 78 = 66\\)."
      },
      {
        "text": "\\(72\\)",
        "correct": false,
        "feedback": "TRAP: used the wrong triangular formula \\(n^2 / 2 = 72\\) instead of \\(n(n+1)/2 = 78\\). Then \\(144 - 72 = 72\\). The correct triangular formula adds 1 before dividing."
      },
      {
        "text": "\\(144\\)",
        "correct": false,
        "feedback": "Only the 12th square number."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "Only the 12th triangular number."
      }
    ],
    "backward": "Special sequences.",
    "forward": "Comparing sequence values."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "C",
    "question": "The 8th term of \\(4n+3\\) equals the 5th term of \\(3n+k\\). Find \\(k\\).",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. 8th of first \\(= 4(8)+3 = 35\\). Second: \\(3(5)+k = 15+k = 35 \\implies k = 20\\)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "Stopped at the 8th term value (35) without solving for \\(k\\)."
      },
      {
        "text": "\\(32\\)",
        "correct": false,
        "feedback": "Forgot to multiply \\(n=5\\) by the coefficient 3: solved \\(35 - 3 = 32\\) instead of \\(35 - 3(5) = 20\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Computed \\(3(5) = 15\\) and stopped."
      }
    ],
    "backward": "Substitution and solving.",
    "forward": "Matching terms."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "tier": "H",
    "question": "Pattern: \\(x_1 = 2\\), \\(x_{n+1} = 3x_n - 1\\). Find \\(x_4\\).",
    "options": [
      {
        "text": "\\(41\\)",
        "correct": true,
        "feedback": "Correct. \\(x_2 = 3(2)-1 = 5\\). \\(x_3 = 3(5)-1 = 14\\). \\(x_4 = 3(14)-1 = 41\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Stopped at \\(x_3 = 14\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Stopped at \\(x_2 = 5\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned \\(x_1\\)."
      }
    ],
    "backward": "Iterative function application.",
    "forward": "Iterative sequences in Ch10."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "tier": "S",
    "question": "Sequence \\(9, 14, 19, 24, \\ldots\\) — 10th term?",
    "options": [
      {
        "text": "\\(54\\)",
        "correct": true,
        "feedback": "Correct. \\(9 + 9 \\times 5 = 54\\)."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "Used 8 steps: \\(9 + 8 \\times 5 = 49\\)."
      },
      {
        "text": "\\(59\\)",
        "correct": false,
        "feedback": "Used 10 steps: \\(9 + 10 \\times 5 = 59\\)."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Forgot the first term: \\(10 \\times 5 = 50\\)."
      }
    ],
    "backward": "Term-to-term.",
    "forward": "Distant-term computation."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "tier": "C",
    "question": "The nth term is \\(8n-5\\). Which term equals 59?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(8n-5 = 59 \\implies 8n = 64 \\implies n = 8\\)."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "\\(59+5 = 64\\), forgot to divide by 8."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "\\(59-5 = 54\\), wrong direction."
      },
      {
        "text": "\\(59\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "20th term of \\(5, 11, 17, 23, \\ldots\\)",
    "options": [
      {
        "text": "\\(119\\)",
        "correct": true,
        "feedback": "Correct. \\(5 + 19 \\times 6 = 119\\)."
      },
      {
        "text": "\\(113\\)",
        "correct": false,
        "feedback": "Used 18 steps: \\(5 + 18 \\times 6 = 113\\)."
      },
      {
        "text": "\\(125\\)",
        "correct": false,
        "feedback": "Used 20 steps: \\(5 + 20 \\times 6 = 125\\)."
      },
      {
        "text": "\\(114\\)",
        "correct": false,
        "feedback": "Forgot the first term: \\(19 \\times 6 = 114\\)."
      }
    ],
    "backward": "Term-to-term.",
    "forward": "Distant-term."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(6n+2\\). Which term equals 62?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(6n+2 = 62 \\implies 6n = 60 \\implies n = 10\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "\\(62-2 = 60\\), forgot to divide by 6."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "Wrong direction: \\(62+2 = 64\\)."
      },
      {
        "text": "\\(62\\)",
        "correct": false,
        "feedback": "Returned the target value."
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
    "question": "Find the nth term of \\(8, 13, 18, 23, \\ldots\\)",
    "options": [
      {
        "text": "\\(5n+3\\)",
        "correct": true,
        "feedback": "Correct. Difference 5. Test \\(n=1\\): \\(5(1)+3 = 8\\)."
      },
      {
        "text": "\\(5n+8\\)",
        "correct": false,
        "feedback": "Used the first term (8) as the constant — matches \\(t_2\\), not \\(t_1\\)."
      },
      {
        "text": "\\(8n+5\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(5n+2\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(5(1)+2 = 7 \\neq 8\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Rule formation."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "14th triangular number?",
    "options": [
      {
        "text": "\\(105\\)",
        "correct": true,
        "feedback": "Correct. \\(T_{14} = 14 \\times 15 / 2 = 105\\)."
      },
      {
        "text": "\\(196\\)",
        "correct": false,
        "feedback": "Confused with square: \\(14^2 = 196\\)."
      },
      {
        "text": "\\(91\\)",
        "correct": false,
        "feedback": "13th triangular (91) — off by one."
      },
      {
        "text": "\\(120\\)",
        "correct": false,
        "feedback": "15th triangular (120) — off by one the other way."
      }
    ],
    "backward": "Special formula.",
    "forward": "Combinatorial counting."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "10th term of \\(7n-4\\).",
    "options": [
      {
        "text": "\\(66\\)",
        "correct": true,
        "feedback": "Correct. \\(7(10)-4 = 66\\)."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Dropped the constant: \\(7(10) = 70\\)."
      },
      {
        "text": "\\(74\\)",
        "correct": false,
        "feedback": "Wrong sign: \\(7(10)+4 = 74\\)."
      },
      {
        "text": "\\(59\\)",
        "correct": false,
        "feedback": "Used \\(n=9\\): \\(7(9)-4 = 59\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluation."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x-1\\). Find \\(f(f(1))\\).",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 2\\), then \\(f(2) = 5\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 2\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Wrong sign at second step: \\(3(2)+2 = 8\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Applied the function three times: \\(f(f(f(1))) = f(5) = 14\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Function composition in Ch10."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "7th term of geometric \\(2, 6, 18, 54, \\ldots\\)",
    "options": [
      {
        "text": "\\(1458\\)",
        "correct": true,
        "feedback": "Correct. \\(2 \\times 3^6 = 2 \\times 729 = 1458\\)."
      },
      {
        "text": "\\(486\\)",
        "correct": false,
        "feedback": "Used \\(3^5\\) — this is the 6th term (486)."
      },
      {
        "text": "\\(4374\\)",
        "correct": false,
        "feedback": "Used \\(3^7\\) — this is the 8th term (4374)."
      },
      {
        "text": "\\(162\\)",
        "correct": false,
        "feedback": "Used \\(3^4\\) — this is the 5th term (162)."
      }
    ],
    "backward": "Geometric extension.",
    "forward": "Exponential growth."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "\\(t_2 = 9\\), \\(t_5 = 27\\). Find the nth term.",
    "options": [
      {
        "text": "\\(6n-3\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= (27-9)/(5-2) = 6\\). \\(t_1 = 9 - 6 = 3\\). Rule \\(6n-3\\)."
      },
      {
        "text": "\\(6n+3\\)",
        "correct": false,
        "feedback": "Used \\(t_2\\) as if it were \\(t_1\\): \\(6(1)+3 = 9\\) matches the (assumed) first term, but \\(6(5)+3 = 33 \\neq 27\\)."
      },
      {
        "text": "\\(6n-9\\)",
        "correct": false,
        "feedback": "Over-subtracted when finding \\(t_1\\): computed \\(6(1)-9 = -3\\), not the correct \\(t_1 = 3\\)."
      },
      {
        "text": "\\(5n-1\\)",
        "correct": false,
        "feedback": "Used difference 5 instead of 6: \\(5(2)-1 = 9\\) matches \\(t_2\\), but \\(5(5)-1 = 24 \\neq 27\\)."
      }
    ],
    "backward": "Finding difference from two terms.",
    "forward": "Linear interpolation."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "15th term of \\(4n+1\\).",
    "options": [
      {
        "text": "\\(61\\)",
        "correct": true,
        "feedback": "Correct. \\(4(15)+1 = 61\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "Dropped the constant: \\(4(15) = 60\\)."
      },
      {
        "text": "\\(65\\)",
        "correct": false,
        "feedback": "Used \\(n=16\\): \\(4(16)+1 = 65\\)."
      },
      {
        "text": "\\(57\\)",
        "correct": false,
        "feedback": "Used \\(n=14\\): \\(4(14)+1 = 57\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluation."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Machine: multiply by 5, subtract 3. Output 22 → input?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Working backwards: \\((22+3)/5 = 5\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Subtracted 3 instead of adding: \\(22-3 = 19\\), then stopped without dividing."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Added 3 to get 25, then stopped without dividing."
      },
      {
        "text": "\\(110\\)",
        "correct": false,
        "feedback": "Multiplied the output by 5: \\(22 \\times 5 = 110\\)."
      }
    ],
    "backward": "Reversing two-step machine.",
    "forward": "Inverse operations."
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
    title: "Sequences and Functions — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every sequences and functions cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a <strong>timed diagnostic — 20 questions in 25 minutes.</strong></p><p>Three things before you begin:</p><ul><li><strong>Skip is available.</strong> If a question is taking too long, skip and return if there's time.</li><li><strong>Some items contain traps.</strong> Watch for stems that say 'spot the error', 'which is greater', 'difference between', or that reverse an operation. Read the stem before computing.</li><li><strong>Bank quick wins early.</strong> The first few questions are S-tier speed items — solve confidently, don't second-guess.</li></ul><p>The clock starts when you press Start.</p>",
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

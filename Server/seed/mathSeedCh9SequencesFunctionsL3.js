// seed/mathSeedCh9SequencesFunctionsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 9
// (Sequences and Functions), Level 3 — converted from the
// standalone diagnostic JSON ch9-sequences-functions-level-3.json.
//
// Run with: node seed/mathSeedCh9SequencesFunctionsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-9-sequences-functions";
const CHAPTER_NAME = "Sequences and Functions";
const LEVEL = 3;

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
    "question": "Sequence \\(6, 15, 24, 33, \\ldots\\). What is the difference between the 10th term and the 5th term?",
    "options": [
      {
        "text": "\\(45\\)",
        "correct": true,
        "feedback": "Correct. Difference 9. 10th term \\(= 6 + 9 \\times 9 = 87\\). 5th term \\(= 6 + 4 \\times 9 = 42\\). Difference \\(= 87 - 42 = 45\\)."
      },
      {
        "text": "\\(87\\)",
        "correct": false,
        "feedback": "Computed only the 10th term (87) and stopped."
      },
      {
        "text": "\\(42\\)",
        "correct": false,
        "feedback": "Computed only the 5th term (42) and stopped."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Used 4 steps between the 5th and 10th terms instead of 5: \\(4 \\times 9 = 36\\). There are \\(10 - 5 = 5\\) steps between them."
      }
    ],
    "retryHint": "Compute both terms, then subtract the smaller from the larger.",
    "backward": "Term-to-term extension.",
    "forward": "The shortcut is \\((10-5) \\times 9 = 45\\)."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "The nth term is \\(4n-1\\). The 7th term of this sequence equals the 3rd term of a second sequence with nth term \\(6n+k\\). Find \\(k\\).",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. 7th of first \\(= 4(7)-1 = 27\\). Second sequence: \\(6(3)+k = 18+k = 27 \\implies k = 9\\)."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "Stopped at the 7th term value (27) without solving for \\(k\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Subtracted the first coefficient instead of the second: \\(27 - 4 = 23\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Used the 2nd position of the second sequence: \\(27 - 6(2) = 15\\)."
      }
    ],
    "retryHint": "Compute the 7th term of the first sequence, then solve \\(6(3)+k =\\) that value.",
    "backward": "Substituting into a formula.",
    "forward": "Matching sequence terms appears in linear modelling."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the difference between the 8th square number and the 6th triangular number?",
    "options": [
      {
        "text": "\\(43\\)",
        "correct": true,
        "feedback": "Correct. \\(8^2 = 64\\). 6th triangular \\(= 21\\). Difference \\(= 43\\)."
      },
      {
        "text": "\\(85\\)",
        "correct": false,
        "feedback": "Added: \\(64 + 21 = 85\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Used the 7th square number (49) instead of the 6th triangular number (21): \\(64 - 49 = 15\\)."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "Computed only the 8th square."
      }
    ],
    "retryHint": "Compute the square first, then the triangular, then subtract.",
    "backward": "Knowing special sequences.",
    "forward": "Comparing special sequences appears in combinatorics."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Sequence 1: \\(5, 14, 23, 32, \\ldots\\). Sequence 2: \\(2, 10, 18, 26, \\ldots\\). Which has the larger 10th term, and by how much?",
    "options": [
      {
        "text": "Sequence 1, by \\(12\\).",
        "correct": true,
        "feedback": "Correct. Sequence 1 10th term \\(= 5 + 9 \\times 9 = 86\\). Sequence 2 10th term \\(= 2 + 9 \\times 8 = 74\\). Sequence 1 larger by 12."
      },
      {
        "text": "Sequence 2, by \\(12\\).",
        "correct": false,
        "feedback": "Correct difference (12), wrong direction. Sequence 1 grows by 9 per step, so it is larger."
      },
      {
        "text": "Sequence 1, by \\(86\\).",
        "correct": false,
        "feedback": "Computed only Sequence 1's 10th term (86)."
      },
      {
        "text": "Sequence 1, by \\(3\\).",
        "correct": false,
        "feedback": "Compared only the starting values (5 and 2): difference 3. The different common differences also matter."
      }
    ],
    "retryHint": "Compute both 10th terms (first + 9×difference), then subtract.",
    "backward": "Term-to-term extension of both.",
    "forward": "Comparing sequences."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x+4\\). Find \\(f(f(0))\\).",
    "options": [
      {
        "text": "\\(16\\)",
        "correct": true,
        "feedback": "Correct. \\(f(0) = 4\\), then \\(f(4) = 3(4)+4 = 16\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(0) = 4\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "\\(3(4) = 12\\) — forgot the \\(+4\\) at the second step."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "\\(4 + 4 = 8\\) — added the constant instead of applying the rule."
      }
    ],
    "retryHint": "Apply \\(f\\) once to 0, then substitute the result back into \\(3x+4\\).",
    "backward": "Composing functions.",
    "forward": "Function composition appears in Ch10."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A student solves \"The nth term is \\(5n+3\\). Which term equals 43?\" as follows:<br>Step 1: \\(5n+3 = 43\\)<br>Step 2: \\(5n = 46\\)<br>Step 3: \\(n = 9.2\\)<br>Where is the error?",
    "options": [
      {
        "text": "Step 2 — should be \\(5n = 40\\), giving \\(n = 8\\).",
        "correct": true,
        "feedback": "Correct. Step 2 should subtract 3 (not add): \\(5n = 40\\), giving \\(n = 8\\)."
      },
      {
        "text": "Step 3 — \\(46/5 = 9.2\\) is correct.",
        "correct": false,
        "feedback": "Step 3's arithmetic is correct given Step 2 — the error is upstream."
      },
      {
        "text": "Step 1 — should be \\(5n+3 = 43\\).",
        "correct": false,
        "feedback": "Step 1 is correct."
      },
      {
        "text": "No error — the answer \\(9.2\\) is correct.",
        "correct": false,
        "feedback": "The answer is wrong — the term position should be a positive integer."
      }
    ],
    "retryHint": "Undoing \\(+3\\) requires subtracting 3, not adding 3.",
    "backward": "Inverse operations.",
    "forward": "Working backwards in algebra."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Geometric sequence: \\(2, 6, 18, 54, \\ldots\\) Find the 8th term.",
    "options": [
      {
        "text": "\\(4374\\)",
        "correct": true,
        "feedback": "Correct. Multiplier 3. 8th term \\(= 2 \\times 3^7 = 2 \\times 2187 = 4374\\)."
      },
      {
        "text": "\\(1458\\)",
        "correct": false,
        "feedback": "Used \\(3^6\\): \\(2 \\times 729 = 1458\\) — off by one on the exponent."
      },
      {
        "text": "\\(13122\\)",
        "correct": false,
        "feedback": "Used \\(3^8\\): \\(2 \\times 6561 = 13122\\) — off by one the other way."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "Returned the 4th term (54), not the 8th."
      }
    ],
    "retryHint": "First term × multiplier\\(^{(n-1)}\\), with n = 8.",
    "backward": "Geometric pattern.",
    "forward": "Direct proportion in Ch11."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Fibonacci-like sequence: \\(3, 4, 7, 11, 18, \\ldots\\) (each term = sum of previous two). What is the 8th term?",
    "options": [
      {
        "text": "\\(76\\)",
        "correct": true,
        "feedback": "Correct. Extending: \\(3, 4, 7, 11, 18, 29, 47, 76\\). The 8th term is 76."
      },
      {
        "text": "\\(47\\)",
        "correct": false,
        "feedback": "Returned the 7th term (47) — off by one."
      },
      {
        "text": "\\(123\\)",
        "correct": false,
        "feedback": "Extended one step too far: \\(47 + 76 = 123\\) is the 9th term."
      },
      {
        "text": "\\(65\\)",
        "correct": false,
        "feedback": "Added the 7th and 5th terms instead of the 7th and 6th: \\(47 + 18 = 65\\). Fibonacci adds the two most recent terms."
      }
    ],
    "retryHint": "Continue carefully, checking you're adding the two most recent terms each time.",
    "backward": "Fibonacci recursion.",
    "forward": "Recursive sequences."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Sequence 1: \\(7, 12, 17, 22, \\ldots\\). Sequence 2: \\(11, 19, 27, 35, \\ldots\\). Which has the larger 20th term, and by how much?",
    "options": [
      {
        "text": "Sequence 2, by \\(61\\).",
        "correct": true,
        "feedback": "Correct. Seq 1 20th \\(= 7 + 19 \\times 5 = 102\\). Seq 2 20th \\(= 11 + 19 \\times 8 = 163\\). Sequence 2 larger by 61."
      },
      {
        "text": "Sequence 1, by \\(61\\).",
        "correct": false,
        "feedback": "Correct difference, wrong direction."
      },
      {
        "text": "Sequence 2, by \\(163\\).",
        "correct": false,
        "feedback": "Computed only Sequence 2's 20th term (163)."
      },
      {
        "text": "Sequence 2, by \\(56\\).",
        "correct": false,
        "feedback": "Used 20 steps for Sequence 1 (7 + 20 × 5 = 107) instead of 19: 163 − 107 = 56."
      }
    ],
    "backward": "Term-to-term extension.",
    "forward": "Comparing sequences."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "The nth term is \\(3n+5\\). The term at position \\(p\\) equals 44. Find the term at position \\(2p\\).",
    "options": [
      {
        "text": "\\(83\\)",
        "correct": true,
        "feedback": "Correct. \\(3p+5 = 44 \\implies p = 13\\). Then \\(2p = 26\\). Term at 26: \\(3(26)+5 = 83\\)."
      },
      {
        "text": "\\(26\\)",
        "correct": false,
        "feedback": "Stopped at \\(2p = 26\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Stopped at \\(p = 13\\)."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Solving for a position, then substituting again.",
    "forward": "Chained substitutions."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Sequence \\(4, 10, 16, 22, \\ldots\\). Find the nth term, then the 20th term.",
    "options": [
      {
        "text": "\\(118\\)",
        "correct": true,
        "feedback": "Correct. Difference 6. Rule \\(6n-2\\) (since \\(6(1)-2 = 4\\)). 20th term \\(= 6(20)-2 = 118\\)."
      },
      {
        "text": "\\(122\\)",
        "correct": false,
        "feedback": "Used rule \\(6n+2\\) (constant sign flipped): \\(6(20)+2 = 122\\)."
      },
      {
        "text": "\\(120\\)",
        "correct": false,
        "feedback": "Used rule \\(6n\\) (constant dropped): \\(6(20) = 120\\)."
      },
      {
        "text": "\\(112\\)",
        "correct": false,
        "feedback": "Used \\(n = 19\\): \\(6(19)-2 = 112\\)."
      }
    ],
    "backward": "Finding the rule, then applying it.",
    "forward": "Applying rules at distant positions."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Which is greater: the 12th square number or the 16th triangular number?",
    "options": [
      {
        "text": "The square, by \\(8\\).",
        "correct": true,
        "feedback": "Correct. 12th square \\(= 144\\). 16th triangular \\(= 16 \\times 17 / 2 = 136\\). Square larger by 8."
      },
      {
        "text": "The triangular number, by \\(8\\).",
        "correct": false,
        "feedback": "Correct difference, wrong direction."
      },
      {
        "text": "The square, by \\(144\\).",
        "correct": false,
        "feedback": "Computed only the 12th square (144)."
      },
      {
        "text": "The triangular number, by \\(136\\).",
        "correct": false,
        "feedback": "Computed only the 16th triangular (136)."
      }
    ],
    "backward": "Special sequences.",
    "forward": "Comparing special sequences."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 8th term of \\(5n-3\\) and the 5th term of \\(4n+9\\). What is their sum?",
    "options": [
      {
        "text": "\\(66\\)",
        "correct": true,
        "feedback": "Correct. 8th of first \\(= 5(8)-3 = 37\\). 5th of second \\(= 4(5)+9 = 29\\). Sum \\(= 66\\)."
      },
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "Computed only the first term (37)."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Computed only the second term (29)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Subtracted instead of adding: \\(37 - 29 = 8\\)."
      }
    ],
    "backward": "Substitution into two formulas.",
    "forward": "Combining sequence terms."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A pattern starts at 5 and adds 4 each time. Write its nth term, then find the first term in the sequence that is greater than 100.",
    "options": [
      {
        "text": "\\(101\\)",
        "correct": true,
        "feedback": "Correct. Rule: \\(4n+1\\). Solving \\(4n+1 > 100\\): \\(n > 24.75\\), so \\(n = 25\\). Term \\(= 4(25)+1 = 101\\)."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "Returned the threshold (100) itself, not the first term above it."
      },
      {
        "text": "\\(97\\)",
        "correct": false,
        "feedback": "Used \\(n = 24\\): \\(4(24)+1 = 97\\), which is not greater than 100."
      },
      {
        "text": "\\(105\\)",
        "correct": false,
        "feedback": "Used \\(n = 26\\): \\(4(26)+1 = 105\\), skipping the first term above 100."
      }
    ],
    "backward": "Finding rule + solving inequality + evaluating.",
    "forward": "Multi-step analysis."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Sequence: \\(2, 3, 5, 8, 12, \\ldots\\) (each difference is 1 more than the previous). Find the next two terms.",
    "options": [
      {
        "text": "\\(17, 23\\)",
        "correct": true,
        "feedback": "Correct. Differences are 1, 2, 3, 4; next are 5 and 6. \\(12+5=17\\), \\(17+6=23\\)."
      },
      {
        "text": "\\(16, 20\\)",
        "correct": false,
        "feedback": "Used difference 4 twice: \\(12+4=16\\), \\(16+4=20\\)."
      },
      {
        "text": "\\(18, 26\\)",
        "correct": false,
        "feedback": "Skipped differences 5 and 7, using 6 and 8: \\(12+6=18\\), \\(18+8=26\\)."
      },
      {
        "text": "\\(17, 22\\)",
        "correct": false,
        "feedback": "Used difference 5 twice: \\(12+5=17\\), \\(17+5=22\\)."
      }
    ],
    "backward": "Spotting a pattern in the differences.",
    "forward": "Non-arithmetic sequences."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A student writes:<br>Step 1: \\(4n-7 = 33\\)<br>Step 2: \\(4n = 26\\)<br>Step 3: \\(n = 6.5\\)<br>Where is the error?",
    "options": [
      {
        "text": "Step 2 — should be \\(4n = 40\\), giving \\(n = 10\\).",
        "correct": true,
        "feedback": "Correct. \\(4n-7 = 33 \\implies 4n = 40 \\implies n = 10\\). Step 2 subtracted instead of adding 7."
      },
      {
        "text": "Step 3 — \\(26/4 = 6.5\\) is correct.",
        "correct": false,
        "feedback": "Step 3's arithmetic is correct given Step 2 — the error is upstream."
      },
      {
        "text": "Step 1 — should be \\(4n = 33\\).",
        "correct": false,
        "feedback": "Step 1 correctly states the equation."
      },
      {
        "text": "No error — the answer \\(6.5\\) is correct.",
        "correct": false,
        "feedback": "The answer is wrong — the position must be a positive integer."
      }
    ],
    "backward": "Inverse operations.",
    "forward": "Working backwards."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A plumber charges a callout fee plus an hourly rate. A 3-hour job costs £95; a 5-hour job costs £135. Write the nth-term formula (where n = hours), then find the charge for an 8-hour job.",
    "options": [
      {
        "text": "£195",
        "correct": true,
        "feedback": "Correct. Rate \\(= (135-95)/(5-3) = 20\\). Callout \\(= 95 - 3(20) = 35\\). Rule: \\(20n+35\\). 8-hour: \\(20(8)+35 = 195\\)."
      },
      {
        "text": "£160",
        "correct": false,
        "feedback": "Forgot the callout fee: \\(20(8) = 160\\)."
      },
      {
        "text": "£175",
        "correct": false,
        "feedback": "Wrong callout: used \\(95 - 4(20) = 15\\), then \\(20(8)+15 = 175\\)."
      },
      {
        "text": "£135",
        "correct": false,
        "feedback": "Returned the given 5-hour charge."
      }
    ],
    "backward": "Deriving a rule from data.",
    "forward": "Linear modelling."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Square numbers: \\(1, 4, 9, 16, 25, \\ldots\\). Triangular numbers: \\(1, 3, 6, 10, 15, \\ldots\\). What is the next number (after 1) that appears in both sequences?",
    "options": [
      {
        "text": "\\(36\\)",
        "correct": true,
        "feedback": "Correct. Extending squares: 36, 49, 64, 81, 100... Triangulars: 21, 28, 36, 45... 36 is both the 6th square and the 8th triangular."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "16 is a square but not triangular."
      },
      {
        "text": "\\(28\\)",
        "correct": false,
        "feedback": "28 is triangular but not square."
      },
      {
        "text": "\\(49\\)",
        "correct": false,
        "feedback": "49 is a square but not triangular."
      }
    ],
    "backward": "Extending two special sequences.",
    "forward": "Recognising shared patterns."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "The nth term is \\(7n-3\\). The term at position \\(k\\) equals 60. Find the term at position \\(k-4\\).",
    "options": [
      {
        "text": "\\(32\\)",
        "correct": true,
        "feedback": "Correct. \\(7k-3 = 60 \\implies k = 9\\). \\(k-4 = 5\\). \\(7(5)-3 = 32\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Stopped at \\(k = 9\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "Returned the target value."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Used \\(k-5 = 4\\): \\(7(4)-3 = 25\\)."
      }
    ],
    "backward": "Working backwards then substituting.",
    "forward": "Chained sequence operations."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "A student finds the nth term of \\(4, 9, 14, 19, \\ldots\\) and its 10th term:<br>Step 1: Common difference = 5.<br>Step 2: nth term = \\(5n+4\\).<br>Step 3: 10th term = \\(5(10)+4 = 54\\).<br>Where is the error?",
    "options": [
      {
        "text": "Step 2 — should be \\(5n-1\\), giving 10th term = 49.",
        "correct": true,
        "feedback": "Correct. Rule should be \\(5n-1\\) (since \\(5(1)-1 = 4\\)). 10th term \\(= 49\\)."
      },
      {
        "text": "Step 1 — the common difference is 4.",
        "correct": false,
        "feedback": "The common difference IS 5."
      },
      {
        "text": "Step 3 — the 10th term should be 50.",
        "correct": false,
        "feedback": "Step 3's arithmetic is correct given Step 2's rule — the error is in Step 2."
      },
      {
        "text": "No error — 54 is correct.",
        "correct": false,
        "feedback": "The answer is wrong because Step 2's rule is wrong."
      }
    ],
    "backward": "Finding rule by testing \\(n=1\\).",
    "forward": "Verifying a multi-step working."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Sequence 1: \\(5, 11, 17, 23, \\ldots\\). Sequence 2: \\(3, 10, 17, 24, \\ldots\\). At which term number do they first have the same value? What is that value?",
    "options": [
      {
        "text": "\\(n = 3\\), value \\(17\\).",
        "correct": true,
        "feedback": "Correct. Seq 1 rule: \\(6n-1\\). Seq 2 rule: \\(7n-4\\). \\(6n-1 = 7n-4 \\implies n = 3\\). Value \\(= 17\\)."
      },
      {
        "text": "\\(n = 17\\), value \\(3\\).",
        "correct": false,
        "feedback": "Swapped the position and the value."
      },
      {
        "text": "\\(n = 4\\), value \\(24\\).",
        "correct": false,
        "feedback": "Only computed Sequence 2's 4th term (24) — no equality at \\(n = 4\\)."
      },
      {
        "text": "They never meet.",
        "correct": false,
        "feedback": "They do meet at \\(n = 3\\)."
      }
    ],
    "backward": "Finding rules and solving.",
    "forward": "Equality of two sequences."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "A sequence has \\(t_3 = 14\\) and \\(t_7 = 30\\). Find the nth term, then \\(t_{10}\\).",
    "options": [
      {
        "text": "\\(42\\)",
        "correct": true,
        "feedback": "Correct. Difference \\(= (30-14)/(7-3) = 4\\). \\(t_1 = 14 - 2 \\times 4 = 6\\). Rule: \\(4n+2\\). \\(t_{10} = 42\\)."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Used \\(t_3\\) as if it were \\(t_1\\): rule \\(4n+10\\), \\(t_{10} = 50\\)."
      },
      {
        "text": "\\(38\\)",
        "correct": false,
        "feedback": "Used \\(n = 9\\) in the correct rule: \\(4(9)+2 = 38\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "Returned the value of \\(t_7\\)."
      }
    ],
    "backward": "Finding difference from two terms.",
    "forward": "Linear interpolation."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Sequence \\(4, 7, 10, 13, \\ldots\\). Find the nth term, then the 30th term.",
    "options": [
      {
        "text": "\\(91\\)",
        "correct": true,
        "feedback": "Correct. Difference 3. Rule \\(3n+1\\). 30th term \\(= 91\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Dropped the constant: \\(3(30) = 90\\)."
      },
      {
        "text": "\\(94\\)",
        "correct": false,
        "feedback": "Used \\(n = 31\\): \\(3(31)+1 = 94\\)."
      },
      {
        "text": "\\(88\\)",
        "correct": false,
        "feedback": "Used \\(n = 29\\): \\(3(29)+1 = 88\\)."
      }
    ],
    "backward": "Finding and applying rule.",
    "forward": "Distant-term evaluation."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Fibonacci-like sequence: \\(2, 5, 7, 12, 19, \\ldots\\) (each term = sum of previous two). What is the 9th term?",
    "options": [
      {
        "text": "\\(131\\)",
        "correct": true,
        "feedback": "Correct. Extending: \\(2, 5, 7, 12, 19, 31, 50, 81, 131\\). 9th term = 131."
      },
      {
        "text": "\\(81\\)",
        "correct": false,
        "feedback": "Returned the 8th term (81) — off by one."
      },
      {
        "text": "\\(212\\)",
        "correct": false,
        "feedback": "Extended one step too far: \\(81 + 131 = 212\\) is the 10th term."
      },
      {
        "text": "\\(112\\)",
        "correct": false,
        "feedback": "Added the 8th and 6th terms instead of the 8th and 7th: \\(81 + 31 = 112\\)."
      }
    ],
    "backward": "Fibonacci recursion.",
    "forward": "Recursive rules."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "The nth term is \\(4n+1\\). The term at position \\(p\\) equals 37. Then find the term at position \\(2p\\) in a different sequence with nth term \\(3n-5\\).",
    "options": [
      {
        "text": "\\(49\\)",
        "correct": true,
        "feedback": "Correct. \\(4p+1 = 37 \\implies p = 9\\). Then \\(2p = 18\\). \\(3(18)-5 = 49\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Stopped at \\(p = 9\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Used position 9 in the second sequence: \\(3(9)-5 = 22\\)."
      },
      {
        "text": "\\(37\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Working backwards then forward in a different rule.",
    "forward": "Chained operations across rules."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 3x-1\\). Find \\(f(f(2)) - f(2)\\).",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 5\\). \\(f(f(2)) = f(5) = 14\\). Difference \\(= 14 - 5 = 9\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Computed only \\(f(f(2)) = 14\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Computed only \\(f(2) = 5\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Added instead of subtracting: \\(14 + 5 = 19\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Function composition in Ch10."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Geometric sequence: \\(3, 6, 12, 24, \\ldots\\). Find the 8th term.",
    "options": [
      {
        "text": "\\(384\\)",
        "correct": true,
        "feedback": "Correct. Multiplier 2. 8th term \\(= 3 \\times 2^7 = 384\\)."
      },
      {
        "text": "\\(192\\)",
        "correct": false,
        "feedback": "Used \\(2^6\\): \\(3 \\times 64 = 192\\) — off by one."
      },
      {
        "text": "\\(768\\)",
        "correct": false,
        "feedback": "Used \\(2^8\\): \\(3 \\times 256 = 768\\) — off by one the other way."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Returned the 4th term."
      }
    ],
    "backward": "Geometric extension.",
    "forward": "Exponential growth."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Machine 1: multiply by 4, then subtract 5. If the output is 23, what was the input? Then apply Machine 2 (multiply by 3, then add 1) to that input.",
    "options": [
      {
        "text": "\\(22\\)",
        "correct": true,
        "feedback": "Correct. Machine 1 reversed: \\((23+5)/4 = 7\\). Machine 2 applied to 7: \\(3(7)+1 = 22\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Stopped at the input (7) without applying Machine 2."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Applied Machine 2 to the original output: \\(3(23)+1 = 70\\)."
      },
      {
        "text": "\\(23\\)",
        "correct": false,
        "feedback": "Returned the original output."
      }
    ],
    "backward": "Reversing a two-step machine.",
    "forward": "Inverse functions."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "The nth triangular number is \\(T_n = n(n+1)/2\\). Find \\(T_{15}\\).",
    "options": [
      {
        "text": "\\(120\\)",
        "correct": true,
        "feedback": "Correct. \\(T_{15} = 15 \\times 16 / 2 = 120\\)."
      },
      {
        "text": "\\(105\\)",
        "correct": false,
        "feedback": "Used \\(n = 14\\): \\(14 \\times 15 / 2 = 105\\)."
      },
      {
        "text": "\\(136\\)",
        "correct": false,
        "feedback": "Used \\(n = 16\\): \\(16 \\times 17 / 2 = 136\\)."
      },
      {
        "text": "\\(225\\)",
        "correct": false,
        "feedback": "Used \\(15^2 = 225\\) — confused with squares."
      }
    ],
    "backward": "Applying a special sequence formula.",
    "forward": "Combinatorial counting."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Which square number is closest to 90?",
    "options": [
      {
        "text": "\\(81\\)",
        "correct": true,
        "feedback": "Correct. \\(81\\) is 9 away from 90; \\(100\\) is 10 away. 81 is closer."
      },
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "The next square — but distance 10 > distance 9."
      },
      {
        "text": "\\(64\\)",
        "correct": false,
        "feedback": "Previous-previous square — distance 26."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "90 is not a perfect square."
      }
    ],
    "backward": "Knowing squares around 90.",
    "forward": "Approximations."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "Sequence 1 has nth term \\(3n+2\\); Sequence 2 has nth term \\(n+8\\). For what value of \\(n\\) is the term of Sequence 1 exactly twice the term of Sequence 2?",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": true,
        "feedback": "Correct. \\(3n+2 = 2(n+8) = 2n+16 \\implies n = 14\\). Check: \\(3(14)+2 = 44\\), \\(14+8 = 22\\), and \\(44 = 2 \\times 22\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Forgot to distribute the 2: solved \\(3n+2 = 2n+8 \\implies n = 6\\). At \\(n=6\\): Seq 1 = 20, Seq 2 = 14, not double."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Returned Sequence 1's term value at the correct \\(n\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Returned Sequence 2's term value at the correct \\(n\\)."
      }
    ],
    "backward": "Forming and solving an equation linking two sequences.",
    "forward": "Linear relationships."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 2x+3\\). A sequence is generated by \\(x_1 = 1\\) and \\(x_{n+1} = f(x_n)\\). Find \\(x_4\\).",
    "options": [
      {
        "text": "\\(29\\)",
        "correct": true,
        "feedback": "Correct. \\(x_1 = 1\\). \\(x_2 = f(1) = 5\\). \\(x_3 = f(5) = 13\\). \\(x_4 = f(13) = 29\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Stopped at \\(x_3 = 13\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Stopped at \\(x_2 = 5\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Returned the starting value \\(x_1\\)."
      }
    ],
    "backward": "Applying a function iteratively.",
    "forward": "Iterative sequences appear in Ch10."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Term-to-term rules",
    "question": "Sequence \\(10, 17, 24, 31, \\ldots\\). Find the 15th term.",
    "options": [
      {
        "text": "\\(108\\)",
        "correct": true,
        "feedback": "Correct. Difference 7. 15th \\(= 10 + 14 \\times 7 = 108\\)."
      },
      {
        "text": "\\(101\\)",
        "correct": false,
        "feedback": "Used 13 steps: \\(10 + 13 \\times 7 = 101\\)."
      },
      {
        "text": "\\(115\\)",
        "correct": false,
        "feedback": "Used 15 steps: \\(10 + 15 \\times 7 = 115\\)."
      },
      {
        "text": "\\(98\\)",
        "correct": false,
        "feedback": "Multiplied steps by difference but forgot the first term: \\(14 \\times 7 = 98\\)."
      }
    ],
    "backward": "Term-to-term extension.",
    "forward": "Distant-term computation."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Geometric sequence: \\(5, 15, 45, 135, \\ldots\\). Find the 6th term.",
    "options": [
      {
        "text": "\\(1215\\)",
        "correct": true,
        "feedback": "Correct. Multiplier 3. 6th \\(= 5 \\times 3^5 = 1215\\)."
      },
      {
        "text": "\\(405\\)",
        "correct": false,
        "feedback": "Used \\(3^4\\): \\(5 \\times 81 = 405\\)."
      },
      {
        "text": "\\(3645\\)",
        "correct": false,
        "feedback": "Used \\(3^6\\): \\(5 \\times 729 = 3645\\)."
      },
      {
        "text": "\\(135\\)",
        "correct": false,
        "feedback": "Returned the 4th term."
      }
    ],
    "backward": "Geometric extension.",
    "forward": "Exponential growth."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(3, 10, 17, 24, \\ldots\\)",
    "options": [
      {
        "text": "\\(7n-4\\)",
        "correct": true,
        "feedback": "Correct. Difference 7. Test \\(n=1\\): \\(7(1)-4 = 3\\)."
      },
      {
        "text": "\\(7n+3\\)",
        "correct": false,
        "feedback": "Used first term (3) as constant — shifted: \\(7(1)+3 = 10 \\neq 3\\)."
      },
      {
        "text": "\\(3n+7\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(7n-3\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(7(1)-3 = 4 \\neq 3\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Finding the nth term",
    "question": "Find the nth term of \\(2, 6, 10, 14, \\ldots\\)",
    "options": [
      {
        "text": "\\(4n-2\\)",
        "correct": true,
        "feedback": "Correct. Difference 4. Test \\(n=1\\): \\(4(1)-2 = 2\\)."
      },
      {
        "text": "\\(4n+2\\)",
        "correct": false,
        "feedback": "Used first term as constant — shifted: \\(4(1)+2 = 6 \\neq 2\\)."
      },
      {
        "text": "\\(2n+4\\)",
        "correct": false,
        "feedback": "Swapped difference and constant."
      },
      {
        "text": "\\(4n-1\\)",
        "correct": false,
        "feedback": "Constant off by one: \\(4(1)-1 = 3 \\neq 2\\)."
      }
    ],
    "backward": "Finding the difference.",
    "forward": "Forming a general rule."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 12th term of \\(8n-3\\).",
    "options": [
      {
        "text": "\\(93\\)",
        "correct": true,
        "feedback": "Correct. \\(8(12)-3 = 93\\)."
      },
      {
        "text": "\\(96\\)",
        "correct": false,
        "feedback": "Dropped constant: \\(8(12) = 96\\)."
      },
      {
        "text": "\\(99\\)",
        "correct": false,
        "feedback": "Wrong sign: \\(8(12)+3 = 99\\)."
      },
      {
        "text": "\\(85\\)",
        "correct": false,
        "feedback": "Used \\(n=11\\): \\(8(11)-3 = 85\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluation at any position."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Using the nth term",
    "question": "Find the 15th term of \\(6n-4\\).",
    "options": [
      {
        "text": "\\(86\\)",
        "correct": true,
        "feedback": "Correct. \\(6(15)-4 = 86\\)."
      },
      {
        "text": "\\(90\\)",
        "correct": false,
        "feedback": "Dropped constant: \\(6(15) = 90\\)."
      },
      {
        "text": "\\(94\\)",
        "correct": false,
        "feedback": "Wrong sign: \\(6(15)+4 = 94\\)."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "Used \\(n=14\\): \\(6(14)-4 = 80\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Evaluation."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(6n+1\\). Which term equals 55?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(6n+1 = 55 \\implies 6n = 54 \\implies n = 9\\)."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "Stopped at \\(6n = 54\\)."
      },
      {
        "text": "\\(56\\)",
        "correct": false,
        "feedback": "Added 1 wrongly: \\(55+1 = 56\\)."
      },
      {
        "text": "\\(55\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Working backwards",
    "question": "The nth term is \\(9n-2\\). Which term equals 70?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(9n-2 = 70 \\implies 9n = 72 \\implies n = 8\\)."
      },
      {
        "text": "\\(72\\)",
        "correct": false,
        "feedback": "Stopped at \\(9n = 72\\)."
      },
      {
        "text": "\\(68\\)",
        "correct": false,
        "feedback": "Subtracted wrongly: \\(70-2 = 68\\)."
      },
      {
        "text": "\\(70\\)",
        "correct": false,
        "feedback": "Returned the target value."
      }
    ],
    "backward": "Two-step equation.",
    "forward": "Working backwards."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "Find the 13th triangular number.",
    "options": [
      {
        "text": "\\(91\\)",
        "correct": true,
        "feedback": "Correct. \\(T_{13} = 13 \\times 14 / 2 = 91\\)."
      },
      {
        "text": "\\(78\\)",
        "correct": false,
        "feedback": "\\(T_{12} = 78\\) — off by one."
      },
      {
        "text": "\\(105\\)",
        "correct": false,
        "feedback": "\\(T_{14} = 105\\) — off by one the other way."
      },
      {
        "text": "\\(169\\)",
        "correct": false,
        "feedback": "\\(13^2 = 169\\) — confused with squares."
      }
    ],
    "backward": "Applying special formula.",
    "forward": "Combinatorial counting."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Special sequences",
    "question": "What is the difference between the 11th square number and the 8th triangular number?",
    "options": [
      {
        "text": "\\(85\\)",
        "correct": true,
        "feedback": "Correct. \\(11^2 = 121\\). 8th triangular \\(= 36\\). Difference \\(= 85\\)."
      },
      {
        "text": "\\(157\\)",
        "correct": false,
        "feedback": "Added: \\(121 + 36 = 157\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "Computed only the 8th triangular number."
      },
      {
        "text": "\\(121\\)",
        "correct": false,
        "feedback": "Computed only the 11th square."
      }
    ],
    "backward": "Knowing squares and triangulars.",
    "forward": "Comparing special sequences."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 5x-2\\). Find \\(f(f(2))\\).",
    "options": [
      {
        "text": "\\(38\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 8\\), then \\(f(8) = 38\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(2) = 8\\)."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Forgot \\(-2\\) at second step: \\(5 \\times 8 = 40\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Added the constant: \\(8 + 5 = 13\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Function composition in Ch10."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Advanced sequence and function problems",
    "question": "\\(f(x) = 4x-1\\). Find \\(f(f(f(1)))\\).",
    "options": [
      {
        "text": "\\(43\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1)=3\\), \\(f(3)=11\\), \\(f(11)=43\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(f(1)) = 11\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 3\\)."
      },
      {
        "text": "\\(44\\)",
        "correct": false,
        "feedback": "Forgot \\(-1\\) at last step: \\(4 \\times 11 = 44\\)."
      }
    ],
    "backward": "Three-function composition.",
    "forward": "Iterative function application."
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
    title: "Sequences and Functions — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Synthesis items comparing sequences, chaining positions and rules, spotting errors, modelling real-world charges, and iterating functions — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not timed, not graded. These questions are <em>synthesis</em> items: most combine more than one skill, and many ask you to spot an error, compare two sequences, or interpret a real-world scenario. Read carefully — the path to the answer is often yours to construct.</p><p>You will see questions from all six topics. Accuracy matters more than speed.</p>",
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

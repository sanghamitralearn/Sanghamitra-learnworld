

// seed/mathSeedCh10GraphsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 10
// (Graphs), Level 3 — converted from the standalone diagnostic
// JSON ch10-graphs-level-3.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh10GraphsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-10-graphs";
const CHAPTER_NAME = "Graphs";
const LEVEL = 3;

const CLUSTER_NAMES = {
  "C1": "Coordinates and plotting",
  "C2": "Gradient",
  "C3": "y-intercept",
  "C4": "Equation of a line",
  "C5": "Interpreting graphs",
  "C6": "Functions and mappings"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Points \\(A = (2, 3)\\) and \\(B = (6, 11)\\) lie on a straight line. When \\(x = 10\\), what is \\(y\\)?",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Returned \\(B\\)'s y-coordinate without extending."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Used the x-step (4) as the y-step from \\(B\\): \\(11 + 4 = 15\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Subtracted the y-step instead of adding: \\(11 - 8 = 3\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 8/4 = 2\\). From \\(B\\), increasing \\(x\\) by 4 increases \\(y\\) by 8: \\(11 + 8 = 19\\)."
      }
    ],
    "retryHint": "Find the gradient, then apply the same y-step for the same x-step.",
    "backward": "Gradient from two points.",
    "forward": "Linear extension."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Line \\(A\\) passes through \\((0, 2)\\) and \\((4, 14)\\). Line \\(B\\) is parallel to \\(A\\) and passes through \\((0, -1)\\). What is the equation of line \\(B\\)?",
    "options": [
      {
        "text": "\\(y = 2x - 1\\)",
        "correct": false,
        "feedback": "Used \\(A\\)'s intercept (2) as \\(B\\)'s gradient — but parallel needs gradient 3, not 2."
      },
      {
        "text": "\\(y = 3x + 1\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      },
      {
        "text": "\\(y = 3x - 1\\)",
        "correct": true,
        "feedback": "Correct. \\(A\\)'s gradient \\(= 12/4 = 3\\). Parallel → same gradient. \\(B\\)'s intercept is \\(-1\\)."
      },
      {
        "text": "\\(y = 3x + 2\\)",
        "correct": false,
        "feedback": "Used \\(A\\)'s intercept (2) as \\(B\\)'s intercept — but \\(B\\) passes through \\((0, -1)\\), not \\((0, 2)\\)."
      }
    ],
    "retryHint": "First compute A's gradient. Parallel lines have the same gradient. Then use B's given intercept.",
    "backward": "Gradient from two points + parallel.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, -2)\\) with gradient \\(4\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 4x - 2\\)",
        "correct": true,
        "feedback": "Correct. Gradient 4, intercept \\(-2\\)."
      },
      {
        "text": "\\(y = -2x + 4\\)",
        "correct": false,
        "feedback": "Swapped gradient and intercept."
      },
      {
        "text": "\\(y = 4x + 2\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      },
      {
        "text": "\\(y = 2x - 4\\)",
        "correct": false,
        "feedback": "Swapped the two numbers and then reversed both signs: gradient 2, intercept \\(-4\\)."
      }
    ],
    "retryHint": "In y = mx + c, the coefficient of x is the gradient and the constant is the intercept.",
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((2, 1)\\) and \\((5, 10)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 3x + 1\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate (1) as \\(c\\)."
      },
      {
        "text": "\\(y = 3x - 5\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 9/3 = 3\\). \\(1 = 3(2) + c \\implies c = -5\\)."
      },
      {
        "text": "\\(y = 9x - 5\\)",
        "correct": false,
        "feedback": "Used the rise (9) as the gradient."
      },
      {
        "text": "\\(y = 5x - 9\\)",
        "correct": false,
        "feedback": "Used the x-coordinate of the second point (5) as the gradient, then found the intercept from \\((2, 1)\\): \\(c = 1 - 5(2) = -9\\)."
      }
    ],
    "retryHint": "Compute the gradient first. Then substitute one point to find c.",
    "backward": "Gradient from two points + intercept.",
    "forward": "Forming equations."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A taxi charges a fixed fee plus a rate per mile. A 3-mile journey costs £11; a 5-mile journey costs £17. What is the fixed fee?",
    "options": [
      {
        "text": "£2",
        "correct": true,
        "feedback": "Correct. Rate \\(= (17-11)/(5-3) = 3\\). Fee \\(= 11 - 3(3) = 2\\)."
      },
      {
        "text": "£3",
        "correct": false,
        "feedback": "Used the rate (3) as the fee."
      },
      {
        "text": "£11",
        "correct": false,
        "feedback": "Used the 3-mile cost as the fee."
      },
      {
        "text": "£8",
        "correct": false,
        "feedback": "Subtracted the mile count from the cost: \\(11 - 3 = 8\\)."
      }
    ],
    "retryHint": "Compute the rate per mile first. Then subtract the per-mile charge from one journey to find the fixed fee.",
    "backward": "Two points → gradient + intercept.",
    "forward": "Real-world linear models."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x - 2\\). What is \\(f(f(2))\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(2) = 4\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Sign error at the second step: \\(3(4) + 2 = 14\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Forgot \\(-2\\) at the first step: \\(f(2) = 6\\), \\(f(6) = 16\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 4\\), then \\(f(4) = 10\\)."
      }
    ],
    "retryHint": "Apply f once, then apply f again to the result.",
    "backward": "Composing functions.",
    "forward": "Composite functions."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "Rectangle \\(ABCD\\) has \\(A = (1, 2)\\), \\(B = (5, 2)\\), \\(C = (5, 6)\\). What is the gradient of diagonal \\(AC\\)?",
    "options": [
      {
        "text": "\\(-1\\)",
        "correct": false,
        "feedback": "Confused with diagonal \\(BD\\) (which has gradient \\(-1\\))."
      },
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(AC\\) gradient \\(= (6-2)/(5-1) = 4/4 = 1\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Used \\(A\\) and \\(B\\) (the horizontal base of the rectangle) instead of \\(A\\) and \\(C\\): rise 0, so gradient 0."
      }
    ],
    "retryHint": "Use the coordinates of A and C. Gradient = (change in y) ÷ (change in x).",
    "backward": "Rectangle + gradient.",
    "forward": "Diagonals in geometry."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A profit graph shows profit (£) against items sold. At 2 items, profit is £30; at 5 items, profit is £90. What is the profit per item?",
    "options": [
      {
        "text": "£30",
        "correct": false,
        "feedback": "Used first profit value."
      },
      {
        "text": "£60",
        "correct": false,
        "feedback": "Used the rise only (60)."
      },
      {
        "text": "£20",
        "correct": true,
        "feedback": "Correct. Rate \\(= 60/3 = 20\\)."
      },
      {
        "text": "£15",
        "correct": false,
        "feedback": "Counted the items on the graph from 2 to 5 inclusive (4 items) instead of subtracting (\\(5 - 2 = 3\\)): \\(60 \\div 4 = 15\\)."
      }
    ],
    "retryHint": "Profit per item = (change in profit) ÷ (change in items).",
    "backward": "Gradient as rate.",
    "forward": "Real-world models."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Rectangle \\(ABCD\\) has \\(A = (2, 3)\\) and \\(B = (8, 3)\\). The rectangle has area 24 square units. What is the y-coordinate of \\(D\\) (assuming \\(D\\) is above \\(AB\\))?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the height (4) as the y-coordinate, forgetting to add the base's y-coordinate 3."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(AB = 6\\); height \\(= 24 \\div 6 = 4\\); \\(D_y = 3 + 4 = 7\\)."
      },
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "Added the area to the base's y-coordinate: \\(24 + 3 = 27\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Returned the base's y-coordinate."
      }
    ],
    "backward": "Rectangle area + coordinates.",
    "forward": "Coordinate geometry."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((1, 4)\\) and \\((5, 12)\\). A second line has the same y-intercept but double the gradient. What is the second line's equation?",
    "options": [
      {
        "text": "\\(y = 4x + 2\\)",
        "correct": true,
        "feedback": "Correct. First line gradient \\(= 8/4 = 2\\); intercept \\(= 4 - 2(1) = 2\\). First line: \\(y = 2x + 2\\). Second line: doubled gradient (4), same intercept (2): \\(y = 4x + 2\\)."
      },
      {
        "text": "\\(y = 2x + 2\\)",
        "correct": false,
        "feedback": "Didn't double the gradient — returned the first line's equation."
      },
      {
        "text": "\\(y = 4x - 2\\)",
        "correct": false,
        "feedback": "Doubled the gradient correctly, but flipped the sign on the intercept."
      },
      {
        "text": "\\(y = 2x + 4\\)",
        "correct": false,
        "feedback": "Doubled the intercept instead of the gradient: kept \\(m = 2\\), changed \\(c\\) from 2 to 4."
      }
    ],
    "backward": "Gradient from two points + equation.",
    "forward": "Transforming a line's equation."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line has gradient 2 and y-intercept 5. A second line is parallel to it and passes through \\((1, 9)\\). What is the equation of the second line?",
    "options": [
      {
        "text": "\\(y = 2x + 9\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate (9) as the intercept."
      },
      {
        "text": "\\(y = 2x + 5\\)",
        "correct": false,
        "feedback": "Gave the first line's equation. It does not pass through \\((1, 9)\\), since \\(2(1) + 5 = 7\\)."
      },
      {
        "text": "\\(y = 2x + 7\\)",
        "correct": true,
        "feedback": "Correct. Parallel → gradient 2. \\(9 = 2(1) + c \\implies c = 7\\)."
      },
      {
        "text": "\\(y = x + 9\\)",
        "correct": false,
        "feedback": "Used the point's coordinates as the gradient and intercept (1 and 9)."
      }
    ],
    "backward": "Parallel + substituting a point.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A graph shows cost (£) against items bought. The line passes through \\((0, 6)\\) and \\((4, 26)\\). What is the cost per item?",
    "options": [
      {
        "text": "£6",
        "correct": false,
        "feedback": "Used the intercept (fixed cost)."
      },
      {
        "text": "£20",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "£26",
        "correct": false,
        "feedback": "Used the final cost."
      },
      {
        "text": "£5",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 20/4 = 5\\)."
      }
    ],
    "backward": "Gradient as rate.",
    "forward": "Real-world models."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The line \\(y = 3x + c\\) passes through \\((4, -1)\\). What is \\(c\\)?",
    "options": [
      {
        "text": "\\(-13\\)",
        "correct": true,
        "feedback": "Correct. \\(-1 = 3(4) + c \\implies c = -13\\)."
      },
      {
        "text": "\\(-1\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as \\(c\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Computed \\(3(4) = 12\\) and stopped."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Wrote \\(-1 = 12 + c\\) as \\(c = 1 + 12\\), dropping the negative sign of \\(-1\\)."
      }
    ],
    "backward": "Substitute + solve.",
    "forward": "Finding intercepts."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 2x - 3\\). Find the value of \\(x\\) when \\(f(x) = 11\\).",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Added 3 to both sides to get \\(2x = 14\\), then stopped — the division by 2 is still to do."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Returned the given value of \\(f(x)\\) instead of solving for \\(x\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(2x - 3 = 11 \\implies 2x = 14 \\implies x = 7\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned the coefficient of \\(x\\) (2) instead of solving."
      }
    ],
    "backward": "Reverse a function.",
    "forward": "Inverse functions."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Points \\(A = (-2, 3)\\), \\(B = (4, 3)\\), \\(C = (4, -1)\\). What are the coordinates of \\(D\\) such that \\(ABCD\\) is a rectangle?",
    "options": [
      {
        "text": "\\((-1, -2)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates of the correct point \\((-2, -1)\\), giving \\((-1, -2)\\)."
      },
      {
        "text": "\\((1, -1)\\)",
        "correct": false,
        "feedback": "Used the x-midpoint of \\(AB\\) \\(((-2+4)/2 = 1)\\) instead of \\(A\\)'s x-coordinate."
      },
      {
        "text": "\\((-2, 7)\\)",
        "correct": false,
        "feedback": "Moved up instead of down from \\(A\\): \\(3 + 4 = 7\\). \\(BC\\) goes down from \\(B\\), so \\(D\\) is 4 below \\(A\\)."
      },
      {
        "text": "\\((-2, -1)\\)",
        "correct": true,
        "feedback": "Correct. \\(AB\\) horizontal at \\(y=3\\); \\(BC\\) vertical at \\(x=4\\). \\(D\\) is directly below \\(A\\) at \\(y = -1\\): \\(D = (-2, -1)\\)."
      }
    ],
    "backward": "Rectangle properties.",
    "forward": "Coordinate geometry."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((3, -1)\\) with gradient 2. What is its equation?",
    "options": [
      {
        "text": "\\(y = 2x - 1\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as \\(c\\)."
      },
      {
        "text": "\\(y = 2x - 7\\)",
        "correct": true,
        "feedback": "Correct. \\(-1 = 2(3) + c \\implies c = -7\\)."
      },
      {
        "text": "\\(y = 3x - 7\\)",
        "correct": false,
        "feedback": "Replaced the given gradient with the point's x-coordinate (3) while keeping the intercept \\(-7\\). The gradient is given as 2."
      },
      {
        "text": "\\(y = 2x + 7\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      }
    ],
    "backward": "Gradient + point → equation.",
    "forward": "Forming equations."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "Line \\(A\\) passes through \\((0, 3)\\) and \\((4, 11)\\); line \\(B\\) passes through \\((0, -1)\\) and \\((5, 9)\\). Compare their gradients: are they equal, or is one steeper?",
    "options": [
      {
        "text": "Line \\(A\\) is steeper",
        "correct": false,
        "feedback": "Compared runs (4 vs 5) — thought a shorter run means a steeper line. Gradient requires rise ÷ run, not run alone."
      },
      {
        "text": "Line \\(B\\) is steeper",
        "correct": false,
        "feedback": "Compared rises (10 vs 8) — thought a larger rise means a steeper line."
      },
      {
        "text": "The gradients are equal",
        "correct": true,
        "feedback": "Correct. \\(A\\)'s gradient \\(= 8/4 = 2\\). \\(B\\)'s gradient \\(= 10/5 = 2\\). Equal."
      },
      {
        "text": "Cannot be determined without plotting both",
        "correct": false,
        "feedback": "Gradient is computable from any two points on a straight line — no plotting needed."
      }
    ],
    "backward": "Gradient from two points.",
    "forward": "Comparing rates."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A phone bill graph shows cost (£) against data used (GB) and passes through \\((0, 10)\\) and \\((4, 30)\\). How many GB are used if the bill is £45?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Rate \\(= 20/4 = 5\\); intercept \\(= 10\\). Rule: \\(y = 5x + 10\\). \\(45 = 5x + 10 \\implies 5x = 35 \\implies x = 7\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Forgot the intercept: \\(45/5 = 9\\). The bill is \\(5x + 10\\), so the fixed £10 must be subtracted first."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned the rate (5) instead of solving for \\(x\\)."
      },
      {
        "text": "\\(35\\)",
        "correct": false,
        "feedback": "Subtracted the intercept (\\(45 - 10 = 35\\)) but stopped before dividing by the rate."
      }
    ],
    "backward": "Gradient + intercept + inverse.",
    "forward": "Linear models."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The line \\(4x - 2y = 10\\) crosses the y-axis at:",
    "options": [
      {
        "text": "\\((0, 5)\\)",
        "correct": false,
        "feedback": "Dropped the negative sign: read \\(-2y = 10\\) as \\(2y = 10\\), giving \\(y = 5\\)."
      },
      {
        "text": "\\((0, -5)\\)",
        "correct": true,
        "feedback": "Correct. \\(x=0\\): \\(-2y = 10 \\implies y = -5\\)."
      },
      {
        "text": "\\((0, 4)\\)",
        "correct": false,
        "feedback": "Used the magnitude of the x-coefficient (4)."
      },
      {
        "text": "\\((-5, 0)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates of the correct point \\((0, -5)\\), giving \\((-5, 0)\\)."
      }
    ],
    "backward": "Substitute \\(x=0\\) + negative coefficient.",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 5x - 2\\). Find \\(x\\) when \\(f(x) = 13\\).",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the coefficient."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Returned the output value."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "\\(13 - 2 = 11\\) and stopped (forgot to divide by 5)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(5x - 2 = 13 \\implies x = 3\\)."
      }
    ],
    "backward": "Reverse function.",
    "forward": "Inverse functions."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Rectangle \\(ABCD\\) has vertices \\(A = (2, 4)\\), \\(B = (6, 4)\\), \\(C = (6, 8)\\). What is the perimeter of \\(ABCD\\)?",
    "options": [
      {
        "text": "\\(16\\)",
        "correct": true,
        "feedback": "Correct. \\(AB = 4\\), \\(BC = 4\\) (square). Perimeter \\(= 2(4+4) = 16\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Sum of one width and one height only (forgot to double)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Used the x-coordinate (6) as \\(BC\\): \\(2(4+6) = 20\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Used the y-coordinate (8) as \\(BC\\): \\(2(4+8) = 24\\)."
      }
    ],
    "backward": "Rectangle + coordinates.",
    "forward": "Perimeter via coordinates."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "The graph shows a straight line through the two marked points. At what value of \\(x\\) does \\(y = 18\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 540\" width=\"360\" height=\"540\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"540\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"510\" x2=\"30\" y2=\"30\"/><line x1=\"60\" y1=\"510\" x2=\"60\" y2=\"30\"/><line x1=\"90\" y1=\"510\" x2=\"90\" y2=\"30\"/><line x1=\"120\" y1=\"510\" x2=\"120\" y2=\"30\"/><line x1=\"150\" y1=\"510\" x2=\"150\" y2=\"30\"/><line x1=\"180\" y1=\"510\" x2=\"180\" y2=\"30\"/><line x1=\"210\" y1=\"510\" x2=\"210\" y2=\"30\"/><line x1=\"240\" y1=\"510\" x2=\"240\" y2=\"30\"/><line x1=\"270\" y1=\"510\" x2=\"270\" y2=\"30\"/><line x1=\"300\" y1=\"510\" x2=\"300\" y2=\"30\"/><line x1=\"330\" y1=\"510\" x2=\"330\" y2=\"30\"/><line x1=\"30\" y1=\"510\" x2=\"330\" y2=\"510\"/><line x1=\"30\" y1=\"480\" x2=\"330\" y2=\"480\"/><line x1=\"30\" y1=\"450\" x2=\"330\" y2=\"450\"/><line x1=\"30\" y1=\"420\" x2=\"330\" y2=\"420\"/><line x1=\"30\" y1=\"390\" x2=\"330\" y2=\"390\"/><line x1=\"30\" y1=\"360\" x2=\"330\" y2=\"360\"/><line x1=\"30\" y1=\"330\" x2=\"330\" y2=\"330\"/><line x1=\"30\" y1=\"300\" x2=\"330\" y2=\"300\"/><line x1=\"30\" y1=\"270\" x2=\"330\" y2=\"270\"/><line x1=\"30\" y1=\"240\" x2=\"330\" y2=\"240\"/><line x1=\"30\" y1=\"210\" x2=\"330\" y2=\"210\"/><line x1=\"30\" y1=\"180\" x2=\"330\" y2=\"180\"/><line x1=\"30\" y1=\"150\" x2=\"330\" y2=\"150\"/><line x1=\"30\" y1=\"120\" x2=\"330\" y2=\"120\"/><line x1=\"30\" y1=\"90\" x2=\"330\" y2=\"90\"/><line x1=\"30\" y1=\"60\" x2=\"330\" y2=\"60\"/><line x1=\"30\" y1=\"30\" x2=\"330\" y2=\"30\"/></g><line x1=\"30\" y1=\"450\" x2=\"330\" y2=\"450\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"90\" y1=\"510\" x2=\"90\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"463\">-2</text><text x=\"60\" y=\"463\">-1</text><text x=\"120\" y=\"463\">1</text><text x=\"150\" y=\"463\">2</text><text x=\"180\" y=\"463\">3</text><text x=\"210\" y=\"463\">4</text><text x=\"240\" y=\"463\">5</text><text x=\"270\" y=\"463\">6</text><text x=\"300\" y=\"463\">7</text><text x=\"330\" y=\"463\">8</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"85\" y=\"513.5\">-2</text><text x=\"85\" y=\"483.5\">-1</text><text x=\"85\" y=\"423.5\">1</text><text x=\"85\" y=\"393.5\">2</text><text x=\"85\" y=\"363.5\">3</text><text x=\"85\" y=\"333.5\">4</text><text x=\"85\" y=\"303.5\">5</text><text x=\"85\" y=\"273.5\">6</text><text x=\"85\" y=\"243.5\">7</text><text x=\"85\" y=\"213.5\">8</text><text x=\"85\" y=\"183.5\">9</text><text x=\"85\" y=\"153.5\">10</text><text x=\"85\" y=\"123.5\">11</text><text x=\"85\" y=\"93.5\">12</text><text x=\"85\" y=\"63.5\">13</text><text x=\"85\" y=\"33.5\">14</text></g><text x=\"326\" y=\"444\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"98\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"30\" y1=\"510\" x2=\"270\" y2=\"30\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"390\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"240\" cy=\"90\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Forgot the intercept: \\(18/2 = 9\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 10/5 = 2\\); intercept \\(= 2\\). Line: \\(y = 2x + 2\\). \\(18 = 2x + 2 \\implies 2x = 16 \\implies x = 8\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Subtracted the intercept (\\(18 - 2 = 16\\)) but stopped before dividing by the gradient."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned the gradient (2) instead of solving for \\(x\\)."
      }
    ],
    "backward": "Build equation, then invert.",
    "forward": "Linear models."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A car's distance–time graph (distance in metres, time in seconds) passes through \\((0, 0)\\) and \\((12, 180)\\). What is the speed?",
    "options": [
      {
        "text": "\\(180 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(12 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Used the run only, forgetting the rise."
      },
      {
        "text": "\\(168 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Subtracted \\(180 - 12 = 168\\)."
      },
      {
        "text": "\\(15 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 180/12 = 15\\)."
      }
    ],
    "backward": "Gradient + units.",
    "forward": "Real-world models."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A graph (distance in metres, time in seconds) shows an object returning towards its start. The line passes through \\((0, 100)\\) and \\((10, 0)\\). What is the speed of return?",
    "options": [
      {
        "text": "\\(-10 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Returned the gradient's sign — speed is positive (a rate), not a signed value."
      },
      {
        "text": "\\(100 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Used the rise (100)."
      },
      {
        "text": "\\(10 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= -100/10 = -10\\). Speed is the magnitude: \\(10 \\text{ m/s}\\)."
      },
      {
        "text": "\\(0 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Thought stationary — but the line is sloping, not flat."
      }
    ],
    "backward": "Gradient + magnitude.",
    "forward": "Distance–time interpretation."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(3x + 5y = 20\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(x=0\\): \\(5y = 20 \\implies y = 4\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the y-coefficient."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Used the constant term."
      },
      {
        "text": "\\(-4\\)",
        "correct": false,
        "feedback": "Treated \\(3x + 5y = 20\\) as having \\(-5y\\) at \\(x = 0\\): \\(-5y = 20\\) gives \\(-4\\)."
      }
    ],
    "backward": "Substitute \\(x=0\\).",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x - 1\\) and \\(g(x) = x + 4\\). Find the value of \\(x\\) for which \\(f(x) = 2g(x)\\).",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Sign error on the \\(-1\\): solved \\(3x + 1 = 2x + 8 \\implies x = 7\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Forgot to distribute the 2 over \\(x + 4\\): solved \\(3x - 1 = 2x + 4 \\implies x = 5\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Dropped the \\(-1\\): solved \\(3x = 2x + 8 \\implies x = 8\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(3x - 1 = 2(x + 4) = 2x + 8 \\implies x = 9\\). Check: \\(f(9) = 26\\); \\(2g(9) = 2(13) = 26\\)."
      }
    ],
    "backward": "Distributing + solving.",
    "forward": "Setting two functions equal."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "\\(O = (0, 0)\\), \\(A = (6, 0)\\) and \\(B = (6, 8)\\). What is the length of \\(OB\\)?",
    "options": [
      {
        "text": "\\(100\\)",
        "correct": false,
        "feedback": "Found \\(OB^2 = 100\\) but did not take the square root."
      },
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(OA = 6\\) and \\(AB = 8\\) meet at a right angle at \\(A\\), so \\(OB^2 = 6^2 + 8^2 = 100\\) and \\(OB = 10\\)."
      },
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Added the two lengths (\\(6 + 8 = 14\\)) instead of using Pythagoras."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Subtracted the lengths (\\(8 - 6 = 2\\))."
      }
    ],
    "backward": "Pythagoras, Ch5, with coordinates.",
    "forward": "Distance between two points."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line is parallel to \\(2x + y = 7\\) and passes through \\((1, 1)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 2x + 3\\)",
        "correct": false,
        "feedback": "Sign error on the gradient."
      },
      {
        "text": "\\(y = -2x - 3\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      },
      {
        "text": "\\(y = -2x + 3\\)",
        "correct": true,
        "feedback": "Correct. Rearrange: \\(y = -2x + 7\\) → gradient \\(-2\\). \\(1 = -2(1) + c \\implies c = 3\\)."
      },
      {
        "text": "\\(y = -2x + 1\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as \\(c\\)."
      }
    ],
    "backward": "Rearrange + parallel.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A ramp has gradient 0.15. If it runs 20 m horizontally, how high does it rise?",
    "options": [
      {
        "text": "\\(0.3 \\text{ m}\\)",
        "correct": false,
        "feedback": "Read the gradient as 0.015 (misplaced the decimal): \\(0.015 \\times 20 = 0.3\\)."
      },
      {
        "text": "\\(133 \\text{ m}\\)",
        "correct": false,
        "feedback": "Divided \\(20 / 0.15\\)."
      },
      {
        "text": "\\(20 \\text{ m}\\)",
        "correct": false,
        "feedback": "Gave the run (20 m) as the rise."
      },
      {
        "text": "\\(3 \\text{ m}\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 0.15 \\times 20 = 3\\)."
      }
    ],
    "backward": "Gradient × run = rise.",
    "forward": "Real-world slope contexts."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "Car \\(A\\) travels 200 km in 4 hours; car \\(B\\) travels 180 km in 3 hours. Which is faster, and by how much?",
    "options": [
      {
        "text": "Car \\(B\\) by \\(10 \\text{ km/h}\\)",
        "correct": true,
        "feedback": "Correct. \\(A\\): \\(200/4 = 50\\); \\(B\\): \\(180/3 = 60\\). \\(B\\) faster by \\(10\\)."
      },
      {
        "text": "Car \\(A\\) by \\(10 \\text{ km/h}\\)",
        "correct": false,
        "feedback": "Right size of difference (10 km/h) but the wrong car: \\(A\\) travels at 50 km/h, which is slower."
      },
      {
        "text": "Car \\(B\\) by \\(20 \\text{ km/h}\\)",
        "correct": false,
        "feedback": "Difference of distances (200 − 180 = 20), not rates."
      },
      {
        "text": "Car \\(B\\) by \\(60 \\text{ km/h}\\)",
        "correct": false,
        "feedback": "\\(B\\)'s speed only, not the difference."
      }
    ],
    "backward": "Gradients of two graphs.",
    "forward": "Comparing real-world rates."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "A line has y-intercept 5 and passes through \\((4, 17)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 4x + 5\\)",
        "correct": false,
        "feedback": "Used the x-coordinate (4) as the gradient."
      },
      {
        "text": "\\(y = 12x + 5\\)",
        "correct": false,
        "feedback": "Used the rise (\\(17-5=12\\)) as the gradient."
      },
      {
        "text": "\\(y = 3x + 5\\)",
        "correct": true,
        "feedback": "Correct. \\(17 = m(4) + 5 \\implies m = 3\\)."
      },
      {
        "text": "\\(y = 3x - 5\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      }
    ],
    "backward": "Intercept + point → gradient.",
    "forward": "Forming equations."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 2x + 5\\) and \\(g(x) = 6 - x\\). For what value of \\(x\\) does \\(f(x) = g(x)\\)?",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Subtracted \\(x\\) instead of adding: \\(2x - x = 6 - 5 \\implies x = 1\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + 5 = 6 - x \\implies 3x = 1 \\implies x = 1/3\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Dropped the \\(-x\\) term: \\(2x + 5 = 6 \\implies 2x = 1 \\implies x = 1/2\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned the constant 5 from \\(f\\)."
      }
    ],
    "backward": "Set equal + solve.",
    "forward": "Function equality."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Rectangle \\(ABCD\\) has vertices \\(A = (0, 0)\\), \\(B = (6, 0)\\), \\(C = (6, 4)\\). What is the area of \\(ABCD\\)?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Added the side lengths (\\(6 + 4 = 10\\)) instead of multiplying them."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Doubled the width (\\(2 \\times 6\\))."
      },
      {
        "text": "\\(24\\)",
        "correct": true,
        "feedback": "Correct. \\(6 \\times 4 = 24\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Doubled the height (\\(2 \\times 4\\))."
      }
    ],
    "backward": "Rectangle area + coordinates.",
    "forward": "Area via coordinates."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((0, 2)\\) and \\((4, 14)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(12/4 = 3\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the run only, forgetting the rise."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: divided the run by the rise."
      }
    ],
    "backward": "Gradient from two points.",
    "forward": "Gradient reasoning."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(y = 5x - 2\\)?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Dropped the negative sign of the constant in \\(y = 5x - 2\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the gradient."
      },
      {
        "text": "\\(-5\\)",
        "correct": false,
        "feedback": "Negative of the gradient."
      },
      {
        "text": "\\(-2\\)",
        "correct": true,
        "feedback": "Correct. Constant term is \\(-2\\)."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Intercept from equation."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, -1)\\) with gradient \\(2\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = -x + 2\\)",
        "correct": false,
        "feedback": "Swapped the roles: used 2 as the intercept and \\(-1\\) as the gradient."
      },
      {
        "text": "\\(y = 2x - 1\\)",
        "correct": true,
        "feedback": "Correct."
      },
      {
        "text": "\\(y = 2x + 1\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(+1\\) instead of \\(-1\\)."
      },
      {
        "text": "\\(y = x - 2\\)",
        "correct": false,
        "feedback": "Used 1 as the gradient and \\(-2\\) as the intercept: mixed up the two given numbers and changed their signs."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A distance–time graph (distance in metres, time in seconds) passes through \\((0, 0)\\) and \\((10, 200)\\). What is the speed?",
    "options": [
      {
        "text": "\\(20 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. \\(200/10 = 20\\)."
      },
      {
        "text": "\\(200 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(10 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Used the run only, forgetting the rise."
      },
      {
        "text": "\\(190 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Subtracted the coordinates (\\(200 - 10 = 190\\)) instead of dividing."
      }
    ],
    "backward": "Gradient + units.",
    "forward": "Real-world models."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 4x - 1\\). What is \\(f(f(1))\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 3\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the coefficient 4."
      },
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 3\\), \\(f(3) = 11\\)."
      },
      {
        "text": "\\(43\\)",
        "correct": false,
        "feedback": "Applied three times: \\(f(11) = 43\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Composite functions."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Rectangle \\(ABCD\\) has vertices \\(A = (1, 2)\\), \\(B = (5, 2)\\), \\(D = (1, 7)\\). What is the y-coordinate of \\(C\\)?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned \\(AB\\)'s y-coordinate."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(AD\\) is vertical; \\(BC\\) is parallel to \\(AD\\), so \\(C\\) is at \\(y = 7\\) (same as \\(D\\))."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used \\(B\\)'s x-coordinate as the y-coordinate."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Added \\(7 + 2 = 9\\)."
      }
    ],
    "backward": "Rectangle + coordinates.",
    "forward": "Coordinate geometry."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "What is the gradient of \\(y = -3x + 4\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign of \\(-3x\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Gave the intercept (4) instead of the gradient."
      },
      {
        "text": "\\(-4\\)",
        "correct": false,
        "feedback": "Took the negative of the intercept (\\(-4\\)) instead of reading the coefficient of \\(x\\)."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. Coefficient of \\(x\\)."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Gradient from equation."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(2x + y = 6\\)?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Used x-coefficient."
      },
      {
        "text": "\\(-6\\)",
        "correct": false,
        "feedback": "Treated the equation as \\(-y = 6\\) at \\(x = 0\\), giving \\(-6\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(x=0\\): \\(y = 6\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Found the x-intercept (set \\(y = 0\\): \\(2x = 6\\), \\(x = 3\\)) instead of the y-intercept."
      }
    ],
    "backward": "Substitute \\(x=0\\).",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((3, 5)\\) with y-intercept 2. What is its gradient?",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(5 = 3m + 2 \\implies m = 1\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the x-coordinate (3) as the gradient."
      },
      {
        "text": "\\(\\frac{7}{3}\\)",
        "correct": false,
        "feedback": "Added instead of subtracting: \\((5+2)/3 = 7/3\\)."
      },
      {
        "text": "\\(\\frac{5}{3}\\)",
        "correct": false,
        "feedback": "Forgot to subtract the intercept: \\(5/3\\)."
      }
    ],
    "backward": "Intercept + point → gradient.",
    "forward": "Forming equations."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A conversion graph (miles on y-axis, km on x-axis) has gradient 0.625. How many miles is 8 km?",
    "options": [
      {
        "text": "\\(12.8\\)",
        "correct": false,
        "feedback": "Divided instead: \\(8 / 0.625 = 12.8\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(0.625 \\times 8 = 5\\)."
      },
      {
        "text": "\\(0.625\\)",
        "correct": false,
        "feedback": "Gave the gradient (0.625) without multiplying by 8."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Gave the 8 km as the answer without converting to miles."
      }
    ],
    "backward": "Gradient as conversion rate.",
    "forward": "Real-world models."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "A function machine: multiply by 3, then add 4. Output is 22. What is the input?",
    "options": [
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Stopped at \\(3x = 18\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Returned the output."
      },
      {
        "text": "\\(66\\)",
        "correct": false,
        "feedback": "Multiplied output by 3: \\(22 \\times 3 = 66\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(3x + 4 = 22 \\implies x = 6\\)."
      }
    ],
    "backward": "Reverse two-step machine.",
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
    title: "Graphs — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Synthesis items building equations from points, comparing rates, linking parallel lines, working backwards from outputs, and coordinate geometry — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not timed, not graded. These questions are <em>synthesis</em> items: most combine more than one graph skill, and many ask you to build an equation, compare two rates, or work backwards from an output to an input. Read each question carefully — the path to the answer is often yours to construct.</p><p>You will see questions from all six topics. Accuracy matters more than speed.</p>",
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

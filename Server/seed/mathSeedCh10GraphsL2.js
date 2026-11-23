

// seed/mathSeedCh10GraphsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 10
// (Graphs), Level 2 — converted from the standalone diagnostic
// JSON ch10-graphs-level-2.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh10GraphsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-10-graphs";
const CHAPTER_NAME = "Graphs";
const LEVEL = 2;

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
    "question": "Complete the table for \\(y = 3x - 2\\). At \\(x = 4\\), the corresponding point is:",
    "options": [
      {
        "text": "\\((10, 4)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates."
      },
      {
        "text": "\\((4, 12)\\)",
        "correct": false,
        "feedback": "Forgot the constant entirely: \\(3(4) = 12\\)."
      },
      {
        "text": "\\((4, 10)\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 3(4) - 2 = 10\\), so the point is \\((4, 10)\\)."
      },
      {
        "text": "\\((4, 14)\\)",
        "correct": false,
        "feedback": "Added instead of subtracting: \\(3(4) + 2 = 14\\)."
      }
    ],
    "retryHint": "Substitute \\(x = 4\\) into \\(y = 3x - 2\\), then subtract. The point is \\((x, y)\\).",
    "backward": "Substituting into a rule.",
    "forward": "Table of values feeds a graph."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line goes from \\((0, 0)\\) to \\((2, 8)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 8\\), run \\(= 2\\), gradient \\(= 8 \\div 2 = 4\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Multiplied rise and run: \\(8 \\times 2 = 16\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{2}{8} = \\frac{1}{4}\\)."
      }
    ],
    "retryHint": "Gradient = rise ÷ run. The rise is 8 and the run is 2.",
    "backward": "Rise ÷ run.",
    "forward": "Gradient from equation."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The line \\(y = 2x + c\\) passes through \\((3, 11)\\). What is \\(c\\)?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(11 = 2(3) + c \\implies c = 5\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "\\(2(3) = 6\\) — stopped."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Used the y-coordinate as \\(c\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Added \\(6 + 11 = 17\\)."
      }
    ],
    "retryHint": "Substitute the point: \\(11 = 2(3) + c\\). Solve for \\(c\\).",
    "backward": "Substituting a point.",
    "forward": "Finding intercepts from a point and gradient."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line has gradient \\(4\\) and passes through \\((2, 10)\\). What is its y-intercept?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "\\(4(2) = 8\\) — stopped."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Used the y-coordinate as the intercept."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "Added \\(8 + 10 = 18\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(10 = 4(2) + c \\implies c = 2\\)."
      }
    ],
    "retryHint": "Substitute the point into \\(y = 4x + c\\). Solve for \\(c\\).",
    "backward": "\\(y = mx + c\\) with a given point.",
    "forward": "Forming equations from gradient + point."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A taxi's cost graph has y-intercept £3 and gradient £2 per km. What is the cost of a 4 km ride?",
    "options": [
      {
        "text": "£8",
        "correct": false,
        "feedback": "Forgot the intercept: \\(2(4) = 8\\)."
      },
      {
        "text": "£11",
        "correct": true,
        "feedback": "Correct. Cost \\(= 2(4) + 3 = 11\\)."
      },
      {
        "text": "£3",
        "correct": false,
        "feedback": "Ignored distance — returned the intercept."
      },
      {
        "text": "£4",
        "correct": false,
        "feedback": "Ignored both — returned the input."
      }
    ],
    "retryHint": "Cost = (rate × distance) + intercept.",
    "backward": "Gradient as rate + intercept as starting value.",
    "forward": "Real-world linear models."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x - 4\\). Find \\(f(5)\\).",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(3(5) - 4 = 11\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Forgot \\(-4\\)."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "Sign error: \\(3(5) + 4 = 19\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned the input."
      }
    ],
    "retryHint": "Substitute \\(x = 5\\): multiply first, then subtract.",
    "backward": "Substituting into a function.",
    "forward": "Using functions to model graphs."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line goes from \\((0, 0)\\) to \\((4, -8)\\). Its gradient is:",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Dropped the negative sign."
      },
      {
        "text": "\\(-8\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(-2\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= -8\\), run \\(= 4\\), gradient \\(= -8 \\div 4 = -2\\)."
      },
      {
        "text": "\\(-\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: divided the run by the rise."
      }
    ],
    "retryHint": "The line falls, so the gradient is negative. Rise ÷ run = \\(-8 \\div 4\\).",
    "backward": "Negative gradient.",
    "forward": "Sign of gradient."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of the line \\(3x + 2y = 12\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the x-coefficient."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Used the constant term."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Divided by the x-coefficient instead of the y-coefficient: \\(12 \\div 3 = 4\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(2y = 12\\), \\(y = 6\\)."
      }
    ],
    "retryHint": "Set \\(x = 0\\), then solve for \\(y\\).",
    "backward": "Substituting \\(x = 0\\).",
    "forward": "Rearranging equations."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Point \\(P\\) is at \\((4, -2)\\). Point \\(Q\\) is 3 units to the right of \\(P\\) and 5 units above \\(P\\). What are the coordinates of \\(Q\\)?",
    "options": [
      {
        "text": "\\((9, 1)\\)",
        "correct": false,
        "feedback": "Swapped the two moves: went 5 right and 3 up instead of 3 right and 5 up."
      },
      {
        "text": "\\((7, -7)\\)",
        "correct": false,
        "feedback": "Moved 5 down instead of 5 up: \\(-2 - 5 = -7\\)."
      },
      {
        "text": "\\((1, 3)\\)",
        "correct": false,
        "feedback": "Moved 3 to the left instead of the right: \\(4 - 3 = 1\\)."
      },
      {
        "text": "\\((7, 3)\\)",
        "correct": true,
        "feedback": "Correct. Moving right adds to \\(x\\): \\(4 + 3 = 7\\). Moving up adds to \\(y\\): \\(-2 + 5 = 3\\). So \\(Q = (7, 3)\\)."
      }
    ],
    "backward": "Coordinate arithmetic with negative numbers.",
    "forward": "Translations in Ch13."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Line \\(L\\) is shown. Which equation represents a line parallel to \\(L\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 480\" width=\"360\" height=\"480\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"480\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"450\" x2=\"30\" y2=\"30\"/><line x1=\"60\" y1=\"450\" x2=\"60\" y2=\"30\"/><line x1=\"90\" y1=\"450\" x2=\"90\" y2=\"30\"/><line x1=\"120\" y1=\"450\" x2=\"120\" y2=\"30\"/><line x1=\"150\" y1=\"450\" x2=\"150\" y2=\"30\"/><line x1=\"180\" y1=\"450\" x2=\"180\" y2=\"30\"/><line x1=\"210\" y1=\"450\" x2=\"210\" y2=\"30\"/><line x1=\"240\" y1=\"450\" x2=\"240\" y2=\"30\"/><line x1=\"270\" y1=\"450\" x2=\"270\" y2=\"30\"/><line x1=\"300\" y1=\"450\" x2=\"300\" y2=\"30\"/><line x1=\"330\" y1=\"450\" x2=\"330\" y2=\"30\"/><line x1=\"30\" y1=\"450\" x2=\"330\" y2=\"450\"/><line x1=\"30\" y1=\"420\" x2=\"330\" y2=\"420\"/><line x1=\"30\" y1=\"390\" x2=\"330\" y2=\"390\"/><line x1=\"30\" y1=\"360\" x2=\"330\" y2=\"360\"/><line x1=\"30\" y1=\"330\" x2=\"330\" y2=\"330\"/><line x1=\"30\" y1=\"300\" x2=\"330\" y2=\"300\"/><line x1=\"30\" y1=\"270\" x2=\"330\" y2=\"270\"/><line x1=\"30\" y1=\"240\" x2=\"330\" y2=\"240\"/><line x1=\"30\" y1=\"210\" x2=\"330\" y2=\"210\"/><line x1=\"30\" y1=\"180\" x2=\"330\" y2=\"180\"/><line x1=\"30\" y1=\"150\" x2=\"330\" y2=\"150\"/><line x1=\"30\" y1=\"120\" x2=\"330\" y2=\"120\"/><line x1=\"30\" y1=\"90\" x2=\"330\" y2=\"90\"/><line x1=\"30\" y1=\"60\" x2=\"330\" y2=\"60\"/><line x1=\"30\" y1=\"30\" x2=\"330\" y2=\"30\"/></g><line x1=\"30\" y1=\"270\" x2=\"330\" y2=\"270\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"180\" y1=\"450\" x2=\"180\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"283\">-5</text><text x=\"60\" y=\"283\">-4</text><text x=\"90\" y=\"283\">-3</text><text x=\"120\" y=\"283\">-2</text><text x=\"150\" y=\"283\">-1</text><text x=\"210\" y=\"283\">1</text><text x=\"240\" y=\"283\">2</text><text x=\"270\" y=\"283\">3</text><text x=\"300\" y=\"283\">4</text><text x=\"330\" y=\"283\">5</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"175\" y=\"453.5\">-6</text><text x=\"175\" y=\"423.5\">-5</text><text x=\"175\" y=\"393.5\">-4</text><text x=\"175\" y=\"363.5\">-3</text><text x=\"175\" y=\"333.5\">-2</text><text x=\"175\" y=\"303.5\">-1</text><text x=\"175\" y=\"243.5\">1</text><text x=\"175\" y=\"213.5\">2</text><text x=\"175\" y=\"183.5\">3</text><text x=\"175\" y=\"153.5\">4</text><text x=\"175\" y=\"123.5\">5</text><text x=\"175\" y=\"93.5\">6</text><text x=\"175\" y=\"63.5\">7</text><text x=\"175\" y=\"33.5\">8</text></g><text x=\"326\" y=\"264\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"188\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"75\" y1=\"450\" x2=\"285\" y2=\"30\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><text x=\"269\" y=\"48\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">L</text><circle cx=\"180\" cy=\"240\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"210\" cy=\"180\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(y = 2x + 1\\)",
        "correct": false,
        "feedback": "This is \\(L\\) itself (it passes through \\((0, 1)\\)) — the same line, not a parallel one."
      },
      {
        "text": "\\(y = 2x + 5\\)",
        "correct": true,
        "feedback": "Correct. \\(L\\) passes through \\((0, 1)\\) and \\((1, 3)\\): rise 2 for every run of 1, so its gradient is 2. A parallel line needs gradient 2 but a different intercept, so \\(y = 2x + 5\\) works."
      },
      {
        "text": "\\(y = -2x + 1\\)",
        "correct": false,
        "feedback": "Flipped the sign of the gradient: \\(L\\) rises from left to right, so its gradient is positive."
      },
      {
        "text": "\\(y = x + 2\\)",
        "correct": false,
        "feedback": "Matched the constant 2 instead of the gradient: \\(y = x + 2\\) has gradient 1, not 2."
      }
    ],
    "backward": "Parallel → same gradient, different intercept.",
    "forward": "Parallel line reasoning throughout algebra."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((-2, -1)\\) and \\((4, 2)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 2 - (-1) = 3\\), run \\(= 4 - (-2) = 6\\), gradient \\(= \\frac{3}{6} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Calculated the run as \\(4 - 2 = 2\\), ignoring the negative sign of \\(-2\\): \\(\\frac{3}{2}\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Inverted (run ÷ rise): \\(\\frac{6}{3} = 2\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(2 - (-1) = 3\\))."
      }
    ],
    "backward": "Gradient from two points, with a negative coordinate.",
    "forward": "Forming equations."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A car's distance–time graph (distance in metres, time in seconds) goes from \\((0, 0)\\) to \\((10, 150)\\). What does the gradient tell you?",
    "options": [
      {
        "text": "The car's distance is \\(15 \\text{ m}\\)",
        "correct": false,
        "feedback": "Confused gradient with distance."
      },
      {
        "text": "The car's time is \\(15 \\text{ s}\\)",
        "correct": false,
        "feedback": "Confused gradient with time."
      },
      {
        "text": "The car's speed is \\(15 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 150/10 = 15\\), and distance ÷ time = speed."
      },
      {
        "text": "The car is stationary",
        "correct": false,
        "feedback": "Stationary is horizontal."
      }
    ],
    "backward": "Gradient + units.",
    "forward": "Real-world linear models."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(4x + 2y = 16\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(2y = 16 \\implies y = 8\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the x-coefficient."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Used the constant term."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Used the y-coefficient as the intercept."
      }
    ],
    "backward": "Substituting \\(x = 0\\) and solving.",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 2x + 1\\) and \\(g(x) = x - 3\\). What is \\(f(g(4))\\)?",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Applied only \\(f\\): \\(f(4) = 9\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Applied \\(f\\) then \\(g\\) (wrong order): \\(g(9) = 6\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Applied only \\(g\\): \\(g(4) = 1\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(g(4) = 1\\), then \\(f(1) = 3\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Function chains."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Points \\(A = (-2, 1)\\) and \\(B = (2, 1)\\) are plotted. Which of these describes line \\(AB\\)?",
    "options": [
      {
        "text": "A vertical line at \\(x = 1\\)",
        "correct": false,
        "feedback": "Confused the shared y-value (1) for a shared x-value, giving a vertical line at \\(x = 1\\). The shared value is \\(y = 1\\), so the line is horizontal at \\(y = 1\\), not vertical."
      },
      {
        "text": "A line with gradient \\(4\\)",
        "correct": false,
        "feedback": "Used the run (4) as a gradient."
      },
      {
        "text": "A horizontal line at \\(y = 1\\)",
        "correct": true,
        "feedback": "Correct. Both points have \\(y = 1\\), so the line is horizontal at \\(y = 1\\)."
      },
      {
        "text": "A line with undefined gradient",
        "correct": false,
        "feedback": "Saw a flat line and thought 'no change in y → no gradient → undefined.' A horizontal line has gradient 0; only vertical lines are undefined."
      }
    ],
    "backward": "Horizontal/vertical from coordinates.",
    "forward": "Parallel/vertical relations."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Points \\(A = (0, 3)\\) and \\(B = (4, 11)\\). What is the equation of line \\(AB\\)?",
    "options": [
      {
        "text": "\\(y = 4x + 3\\)",
        "correct": false,
        "feedback": "Used the run as the gradient."
      },
      {
        "text": "\\(y = 2x + 3\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 8/4 = 2\\); intercept from \\(A(0, 3)\\) is 3. Equation: \\(y = 2x + 3\\)."
      },
      {
        "text": "\\(y = 2x + 11\\)",
        "correct": false,
        "feedback": "Used \\(B\\)'s y-coordinate as the intercept."
      },
      {
        "text": "\\(y = 8x + 3\\)",
        "correct": false,
        "feedback": "Used the rise as the gradient."
      }
    ],
    "backward": "Gradient + intercept from two points.",
    "forward": "Forming equations."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line goes through \\((-1, 4)\\) and \\((2, -5)\\). Its gradient is:",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign."
      },
      {
        "text": "\\(-9\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(-\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: divided the run by the rise."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= -5 - 4 = -9\\), run \\(= 2 - (-1) = 3\\), gradient \\(= -9 \\div 3 = -3\\)."
      }
    ],
    "backward": "Negative gradient with calculation.",
    "forward": "Sign interpretation."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A graph shows cost (£) against number of items bought, passing through \\((0, 8)\\) and \\((4, 28)\\). What does the gradient represent?",
    "options": [
      {
        "text": "£5 per item",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 20/4 = 5\\), which is the cost per item."
      },
      {
        "text": "£8 starting cost",
        "correct": false,
        "feedback": "£8 is the y-intercept (the starting cost), not the gradient."
      },
      {
        "text": "£28 total cost",
        "correct": false,
        "feedback": "£28 is a point value (the cost of 4 items), not a rate."
      },
      {
        "text": "£20 per item",
        "correct": false,
        "feedback": "Used the rise (20) without dividing by the run (4)."
      }
    ],
    "backward": "Gradient as a rate.",
    "forward": "Linear models."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "Line \\(y = 2x + b\\) passes through \\((4, 3)\\). What is \\(b\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "\\(2(4) = 8\\) — stopped before solving."
      },
      {
        "text": "\\(-5\\)",
        "correct": true,
        "feedback": "Correct. \\(3 = 2(4) + b \\implies 3 = 8 + b \\implies b = -5\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the y-coordinate as \\(b\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Added \\(8 + 3 = 11\\)."
      }
    ],
    "backward": "Substituting a point.",
    "forward": "Finding intercepts."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 4x - 2\\). Find \\(f(f(1))\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Stopped at \\(f(1) = 2\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Forgot \\(-2\\) at the second step: \\(4(2) = 8\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(f(1) = 2\\), then \\(f(2) = 6\\)."
      },
      {
        "text": "\\(22\\)",
        "correct": false,
        "feedback": "Applied three times: \\(f(6) = 22\\)."
      }
    ],
    "backward": "Composing functions.",
    "forward": "Composite functions."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Points \\(A = (1, 2)\\), \\(B = (4, 2)\\), \\(C = (4, 6)\\) are three corners of a rectangle. What are the coordinates of the fourth corner \\(D\\)?",
    "options": [
      {
        "text": "\\((1, 6)\\)",
        "correct": true,
        "feedback": "Correct. Vertical sides at \\(x = 1\\) and \\(x = 4\\); horizontal sides at \\(y = 2\\) and \\(y = 6\\). Fourth vertex: \\((1, 6)\\)."
      },
      {
        "text": "\\((6, 1)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates."
      },
      {
        "text": "\\((1, 8)\\)",
        "correct": false,
        "feedback": "Added the two y-coordinates (\\(2 + 6 = 8\\)) instead of using the correct y-coordinate."
      },
      {
        "text": "\\((2, 6)\\)",
        "correct": false,
        "feedback": "Used the y-coordinate of \\(A\\) (2) as the x-coordinate of \\(D\\); \\(D\\) is directly above \\(A\\), so its x-coordinate is 1."
      }
    ],
    "backward": "Rectangle + coordinates.",
    "forward": "Coordinate geometry."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, -3)\\) with gradient \\(5\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = -3x + 5\\)",
        "correct": false,
        "feedback": "Swapped gradient and intercept."
      },
      {
        "text": "\\(y = 5x + 3\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      },
      {
        "text": "\\(y = 3x - 5\\)",
        "correct": false,
        "feedback": "Swapped the two numbers and then reversed both signs: gradient 3, intercept \\(-5\\)."
      },
      {
        "text": "\\(y = 5x - 3\\)",
        "correct": true,
        "feedback": "Correct. Gradient 5, intercept \\(-3\\)."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "Using the points \\((1, 4)\\) and \\((5, 16)\\), calculate the gradient.",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 16 - 4 = 12\\), run \\(= 5 - 1 = 4\\), gradient \\(= 12 \\div 4 = 3\\)."
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
    "forward": "Gradient in coordinate geometry."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A savings graph shows savings (£) on the y-axis and months on the x-axis, passing through \\((0, 100)\\) and \\((5, 250)\\). What is the monthly savings rate?",
    "options": [
      {
        "text": "£150 per month",
        "correct": false,
        "feedback": "Used the rise only, without dividing by the run."
      },
      {
        "text": "£100 per month",
        "correct": false,
        "feedback": "Used the intercept."
      },
      {
        "text": "£30 per month",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 150/5 = 30\\)."
      },
      {
        "text": "£250 per month",
        "correct": false,
        "feedback": "Used the maximum y-value."
      }
    ],
    "backward": "Gradient as rate.",
    "forward": "Real-world models."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(2x - 5y = 15\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign: read \\(-5y = 15\\) as \\(5y = 15\\), giving 3."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(-5y = 15 \\implies y = -3\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Used the constant term."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the magnitude of the y-coefficient."
      }
    ],
    "backward": "Substituting \\(x = 0\\), negative coefficient.",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "A function machine does: input × 3, then subtract 4. If the output is 17, what was the input?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(3x - 4 = 17 \\implies 3x = 21 \\implies x = 7\\)."
      },
      {
        "text": "\\(21\\)",
        "correct": false,
        "feedback": "Stopped at \\(3x = 21\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Returned the output."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Returned the constant."
      }
    ],
    "backward": "Reverse two-step machine.",
    "forward": "Inverse functions."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "The point \\((k, 11)\\) lies on the line \\(y = 3x - 4\\). What is \\(k\\)?",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Stopped at \\(3k = 15\\) — the division by 3 is still to do."
      },
      {
        "text": "\\(29\\)",
        "correct": false,
        "feedback": "Substituted 11 for \\(x\\) instead of \\(y\\): \\(3(11) - 4 = 29\\)."
      },
      {
        "text": "\\(\\frac{7}{3}\\)",
        "correct": false,
        "feedback": "Subtracted 4 from 11 instead of adding it: \\(3k = 7\\), so \\(k = \\frac{7}{3}\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(11 = 3k - 4 \\implies 3k = 15 \\implies k = 5\\)."
      }
    ],
    "backward": "Substituting a coordinate and solving.",
    "forward": "Finding where lines pass through given points."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line is parallel to \\(y = -2x + 5\\) and passes through \\((1, 4)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 2x + 6\\)",
        "correct": false,
        "feedback": "Sign error on the gradient."
      },
      {
        "text": "\\(y = -2x - 6\\)",
        "correct": false,
        "feedback": "Sign error on the intercept."
      },
      {
        "text": "\\(y = -2x + 6\\)",
        "correct": true,
        "feedback": "Correct. Parallel → gradient \\(-2\\). \\(4 = -2(1) + c \\implies c = 6\\)."
      },
      {
        "text": "\\(y = -2x + 5\\)",
        "correct": false,
        "feedback": "Same line as the given one — not parallel to itself."
      }
    ],
    "backward": "Parallel + point → intercept.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A wheelchair ramp rises 1 m for every 12 m of horizontal distance. What is the gradient of the ramp?",
    "options": [
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": true,
        "feedback": "Correct. Rise ÷ run \\(= 1/12\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Inverted (run ÷ rise)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Added rise and run."
      },
      {
        "text": "\\(\\frac{1}{13}\\)",
        "correct": false,
        "feedback": "Rise ÷ (rise + run)."
      }
    ],
    "backward": "Rise ÷ run in context.",
    "forward": "Gradient in real-world models."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "Runner 1's graph (distance in metres, time in seconds) goes from \\((0, 0)\\) to \\((6, 36)\\). Runner 2's goes from \\((0, 0)\\) to \\((6, 24)\\). Which runner is faster, and by how much?",
    "options": [
      {
        "text": "Runner 2 by \\(2 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Right size of difference (2 m/s) but the wrong runner: Runner 2's graph is less steep, so Runner 2 is slower."
      },
      {
        "text": "Runner 1 by \\(2 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. Runner 1: \\(36/6 = 6 \\text{ m/s}\\). Runner 2: \\(24/6 = 4 \\text{ m/s}\\). Runner 1 faster by 2 m/s."
      },
      {
        "text": "Runner 1 by \\(12 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Difference of distances (\\(36 - 24 = 12\\)), not rates."
      },
      {
        "text": "Runner 1 by \\(6 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Only Runner 1's speed, not the difference."
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
    "question": "Lines \\(y = 2x + 5\\) and \\(y = 2x - 2\\) are parallel. What is the vertical distance between their y-intercepts?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used \\(|a + b|\\) instead of \\(|a - b|\\): \\(|5 + (-2)| = 3\\)."
      },
      {
        "text": "\\(-7\\)",
        "correct": false,
        "feedback": "Sign error: \\(-(5 - (-2)) = -7\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned one intercept (5)."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(|5 - (-2)| = 7\\)."
      }
    ],
    "backward": "Reading both intercepts + absolute difference.",
    "forward": "Parallel lines and separation."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 5 - 2x\\). Find the value of \\(x\\) when \\(f(x) = -7\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Stopped at \\(-2x = -12\\) and gave 12 — the division by \\(-2\\) is still to do."
      },
      {
        "text": "\\(-6\\)",
        "correct": false,
        "feedback": "Divided \\(-12\\) by 2 and kept the minus sign; dividing \\(-12\\) by \\(-2\\) gives \\(+6\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(5 - 2x = -7 \\implies -2x = -12 \\implies x = 6\\). Check: \\(f(6) = 5 - 12 = -7\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Added 5 to both sides instead of subtracting: \\(-2x = -2\\), so \\(x = 1\\)."
      }
    ],
    "backward": "Solving a two-step equation.",
    "forward": "Inverse functions."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Point \\(P\\) is at \\((-3, 5)\\). Point \\(Q\\) is 2 units to the right of \\(P\\) and 4 units below \\(P\\). What are the coordinates of \\(Q\\)?",
    "options": [
      {
        "text": "\\((1, 3)\\)",
        "correct": false,
        "feedback": "Swapped the two moves: went 4 right and 2 down instead of 2 right and 4 down."
      },
      {
        "text": "\\((-1, 1)\\)",
        "correct": true,
        "feedback": "Correct. Moving right adds to \\(x\\): \\(-3 + 2 = -1\\). Moving down subtracts from \\(y\\): \\(5 - 4 = 1\\). So \\(Q = (-1, 1)\\)."
      },
      {
        "text": "\\((-1, 9)\\)",
        "correct": false,
        "feedback": "Moved 4 up instead of down: \\(5 + 4 = 9\\)."
      },
      {
        "text": "\\((-5, 1)\\)",
        "correct": false,
        "feedback": "Moved 2 to the left instead of the right: \\(-3 - 2 = -5\\)."
      }
    ],
    "backward": "Coordinate arithmetic with negative numbers.",
    "forward": "Translations in Ch13."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "The point \\((k, 9)\\) lies on the line \\(y = 2x - 5\\). What is \\(k\\)?",
    "options": [
      {
        "text": "\\(14\\)",
        "correct": false,
        "feedback": "Stopped at \\(2k = 14\\) — the division by 2 is still to do."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "Substituted 9 for \\(x\\) instead of \\(y\\): \\(2(9) - 5 = 13\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Subtracted 5 from 9 instead of adding it: \\(2k = 4\\), so \\(k = 2\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(9 = 2k - 5 \\implies 2k = 14 \\implies k = 7\\)."
      }
    ],
    "backward": "Substituting a coordinate and solving.",
    "forward": "Finding where lines pass through given points."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((-2, 1)\\) and \\((4, 5)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Calculated the run as \\(4 - 2 = 2\\), ignoring the negative sign of \\(-2\\): \\(\\frac{4}{2} = 2\\)."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Inverted (run ÷ rise): \\(\\frac{6}{4} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 5 - 1 = 4\\), run \\(= 4 - (-2) = 6\\), gradient \\(= \\frac{4}{6} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(5 - 1 = 4\\))."
      }
    ],
    "backward": "Gradient from two points, with a negative coordinate.",
    "forward": "Forming equations."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((-2, 7)\\) and \\((2, -1)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(-2\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= -1 - 7 = -8\\), run \\(= 2 - (-2) = 4\\), gradient \\(= -8 \\div 4 = -2\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Dropped the negative sign: the line falls, so the gradient is negative."
      },
      {
        "text": "\\(-8\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(-1 - 7 = -8\\))."
      },
      {
        "text": "\\(-\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted (run ÷ rise): \\(\\frac{4}{-8} = -\\frac{1}{2}\\)."
      }
    ],
    "backward": "Negative gradient with calculation.",
    "forward": "Sign interpretation."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(3x + 4y = 24\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Divided 24 by the x-coefficient (\\(24 \\div 3 = 8\\)), which gives the x-intercept, not the y-intercept."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Used the constant term."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the y-coefficient as the intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(4y = 24 \\implies y = 6\\)."
      }
    ],
    "backward": "Substituting \\(x = 0\\) and solving.",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The line \\(y = 3x + b\\) passes through \\((2, -1)\\). What is \\(b\\)?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "\\(3(2) = 6\\) — stopped before solving."
      },
      {
        "text": "\\(-7\\)",
        "correct": true,
        "feedback": "Correct. \\(-1 = 3(2) + b \\implies -1 = 6 + b \\implies b = -7\\)."
      },
      {
        "text": "\\(-1\\)",
        "correct": false,
        "feedback": "Used the y-coordinate as \\(b\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Added 6 to \\(-1\\) instead of subtracting it: \\(-1 + 6 = 5\\)."
      }
    ],
    "backward": "Substituting a point.",
    "forward": "Finding intercepts."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, -4)\\) with gradient \\(3\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 3x - 4\\)",
        "correct": true,
        "feedback": "Correct. Gradient 3, intercept \\(-4\\)."
      },
      {
        "text": "\\(y = -4x + 3\\)",
        "correct": false,
        "feedback": "Swapped gradient and intercept."
      },
      {
        "text": "\\(y = 3x + 4\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(+4\\) instead of \\(-4\\)."
      },
      {
        "text": "\\(y = -3x + 4\\)",
        "correct": false,
        "feedback": "Reversed the signs of both the gradient and the intercept."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line is parallel to \\(y = 3x + 2\\) and passes through \\((2, 5)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 3x + 2\\)",
        "correct": false,
        "feedback": "Same line as the given one, which does not pass through \\((2, 5)\\) — and is not parallel to itself."
      },
      {
        "text": "\\(y = -3x + 11\\)",
        "correct": false,
        "feedback": "Reversed the sign of the gradient: \\(5 = -3(2) + c\\) gives \\(c = 11\\), but parallel lines have the same gradient."
      },
      {
        "text": "\\(y = 3x - 1\\)",
        "correct": true,
        "feedback": "Correct. Parallel → gradient 3. \\(5 = 3(2) + c \\implies c = -1\\)."
      },
      {
        "text": "\\(y = 3x + 5\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as \\(c\\)."
      }
    ],
    "backward": "Parallel + point → intercept.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "Runner A's graph (distance in metres, time in seconds) goes from \\((0, 0)\\) to \\((5, 40)\\). Runner B's goes from \\((0, 0)\\) to \\((5, 30)\\). Which runner is faster, and by how much?",
    "options": [
      {
        "text": "Runner B by \\(2 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Right size of difference (2 m/s) but the wrong runner: Runner B's graph is less steep, so Runner B is slower."
      },
      {
        "text": "Runner A by \\(2 \\text{ m/s}\\)",
        "correct": true,
        "feedback": "Correct. Runner A: \\(40/5 = 8 \\text{ m/s}\\). Runner B: \\(30/5 = 6 \\text{ m/s}\\). Runner A is faster by 2 m/s."
      },
      {
        "text": "Runner A by \\(10 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Difference of distances (\\(40 - 30 = 10\\)), not rates."
      },
      {
        "text": "Runner A by \\(8 \\text{ m/s}\\)",
        "correct": false,
        "feedback": "Only Runner A's speed, not the difference."
      }
    ],
    "backward": "Gradients of two graphs.",
    "forward": "Comparing real-world rates."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A graph shows cost (£) against number of items bought, passing through \\((0, 6)\\) and \\((5, 31)\\). What does the gradient represent?",
    "options": [
      {
        "text": "£6 starting cost",
        "correct": false,
        "feedback": "£6 is the y-intercept (the starting cost), not the gradient."
      },
      {
        "text": "£31 total cost",
        "correct": false,
        "feedback": "£31 is a point value (the cost of 5 items), not a rate."
      },
      {
        "text": "£25 per item",
        "correct": false,
        "feedback": "Used the rise (25) without dividing by the run (5)."
      },
      {
        "text": "£5 per item",
        "correct": true,
        "feedback": "Correct. Gradient \\(= 25/5 = 5\\), which is the cost per item."
      }
    ],
    "backward": "Gradient as a rate.",
    "forward": "Linear models."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
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
    "clusterName": "Functions and mappings",
    "question": "Machine: multiply by 5, subtract 3. Output 22 → input?",
    "options": [
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
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Working backwards: \\((22+3)/5 = 5\\)."
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
    title: "Graphs — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Two-step graph reasoning — finding a gradient and then using it, substituting a point to find an intercept, forming equations from two points, and interpreting rates — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not a test, not timed. Most questions take two steps within a single topic: find the gradient then use it, substitute a point then solve for the intercept, or read a graph and interpret the rate. Write down your first step before you start the second. One question shows a graph — read it from the grid. Accuracy matters more than speed.</p><p>You will see questions from all six topics.</p>",
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

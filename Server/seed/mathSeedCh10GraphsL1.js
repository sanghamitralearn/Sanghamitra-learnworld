

// seed/mathSeedCh10GraphsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 10
// (Graphs), Level 1 — converted from the standalone diagnostic
// JSON ch10-graphs-level-1.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh10GraphsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-10-graphs";
const CHAPTER_NAME = "Graphs";
const LEVEL = 1;

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
    "question": "A rule is \\(y = x + 2\\). When \\(x = 3\\), what is \\(y\\)?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Doubled the input instead of adding: \\(3 \\times 2 = 6\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 3 + 2 = 5\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Subtracted the constant instead of adding: \\(3 - 2 = 1\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Returned the input \\(x\\)."
      }
    ],
    "retryHint": "Substitute \\(x = 3\\) into the rule \\(y = x + 2\\), then evaluate.",
    "backward": "Substituting into a rule — completing the table before plotting.",
    "forward": "Table of values feeds the graph in Ch10."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line goes from \\((0, 0)\\) to \\((2, 6)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Used the rise only: \\(6\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Multiplied rise and run: \\(6 \\times 2 = 12\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{\\text{rise}}{\\text{run}} = \\frac{6}{2} = 3\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{2}{6} = \\frac{1}{3}\\)."
      }
    ],
    "retryHint": "Gradient = rise ÷ run. The rise is 6 and the run is 2.",
    "backward": "Rise ÷ run.",
    "forward": "Gradient from equation in Ch10."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The line \\(y = 2x + 5\\) crosses the y-axis at which point?",
    "options": [
      {
        "text": "\\((5, 0)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates — the point is on the y-axis, not the x-axis."
      },
      {
        "text": "\\((0, 5)\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\), \\(y = 5\\). So the y-intercept is at \\((0, 5)\\)."
      },
      {
        "text": "\\((0, 2)\\)",
        "correct": false,
        "feedback": "Used the gradient (2) as the y-value."
      },
      {
        "text": "\\((2, 0)\\)",
        "correct": false,
        "feedback": "Swapped the gradient to the x-axis."
      }
    ],
    "retryHint": "Set \\(x = 0\\) in \\(y = 2x + 5\\) and evaluate.",
    "backward": "The y-axis is where \\(x = 0\\).",
    "forward": "Y-intercept \\(c\\) in \\(y = mx + c\\)."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Which point lies on the line \\(y = x + 2\\)?",
    "options": [
      {
        "text": "\\((3, 5)\\)",
        "correct": true,
        "feedback": "Correct. \\(3 + 2 = 5\\)."
      },
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Swapped the x- and y-coordinates."
      },
      {
        "text": "\\((3, 6)\\)",
        "correct": false,
        "feedback": "Doubled the input instead of adding: \\(3 \\times 2 = 6\\)."
      },
      {
        "text": "\\((2, 2)\\)",
        "correct": false,
        "feedback": "Ignored the \\(+2\\) (used \\(y = x\\))."
      }
    ],
    "retryHint": "Substitute the x-coordinate into the rule; the y-coordinate should match.",
    "backward": "Substituting to test if a point is on a line.",
    "forward": "Plotting lines from points in Ch10."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "On a distance–time graph, what does the gradient represent?",
    "options": [
      {
        "text": "The distance",
        "correct": false,
        "feedback": "Distance is the y-axis value itself, not the gradient."
      },
      {
        "text": "The time",
        "correct": false,
        "feedback": "Time is the x-axis value, not the gradient."
      },
      {
        "text": "The total journey",
        "correct": false,
        "feedback": "The gradient is a rate, not a total journey."
      },
      {
        "text": "The speed",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{\\text{distance}}{\\text{time}} = \\) speed."
      }
    ],
    "retryHint": "What is being divided by what? Distance ÷ time.",
    "backward": "Units of gradient.",
    "forward": "Real-world interpretation throughout Ch10."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x + 1\\). Find \\(f(2)\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Forgot the \\(+1\\): \\(3(2) = 6\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Added coefficient and input instead of multiplying: \\(3 + 2 = 5\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 3(2) + 1 = 7\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned the input."
      }
    ],
    "retryHint": "Substitute 2 for \\(x\\): \\(3 \\times 2 + 1\\).",
    "backward": "Function notation — Ch9.",
    "forward": "Using functions to generate graphs."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line falls from \\((0, 8)\\) to \\((4, 0)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(-2\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 0 - 8 = -8\\), run \\(= 4\\), gradient \\(= \\frac{-8}{4} = -2\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Dropped the negative sign — the line falls, so the gradient is negative."
      },
      {
        "text": "\\(-8\\)",
        "correct": false,
        "feedback": "Used the rise only: \\(-8\\)."
      },
      {
        "text": "\\(-\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(-\\frac{4}{8} = -\\frac{1}{2}\\)."
      }
    ],
    "retryHint": "The line falls, so the gradient is negative. Rise ÷ run = \\(-8 \\div 4\\).",
    "backward": "Negative gradient for a falling line.",
    "forward": "Sign of gradient interpreted later."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(y = 4x - 3\\)?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the gradient (4) as the intercept."
      },
      {
        "text": "\\(-4\\)",
        "correct": false,
        "feedback": "Took the negative of the gradient."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. In \\(y = mx + c\\), the intercept is \\(c = -3\\)."
      }
    ],
    "retryHint": "In \\(y = mx + c\\), \\(c\\) is the y-intercept.",
    "backward": "The constant term is the y-intercept.",
    "forward": "Reading intercepts off \\(y = mx + c\\)."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Complete the table for \\(y = 2x + 1\\): when \\(x = 4\\), \\(y = ?\\)",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Forgot \\(+1\\): \\(2(4) = 8\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 2(4) + 1 = 9\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Added input to constant: \\(4 + 1 = 5\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Returned the input."
      }
    ],
    "backward": "Substituting into a rule.",
    "forward": "Table of values feeds a graph."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Which is the equation of a line with gradient \\(3\\) and y-intercept \\(-2\\)?",
    "options": [
      {
        "text": "\\(y = 3x - 2\\)",
        "correct": true,
        "feedback": "Correct. Gradient = coefficient of \\(x\\) (3), intercept = constant (\\(-2\\))."
      },
      {
        "text": "\\(y = -2x + 3\\)",
        "correct": false,
        "feedback": "Swapped the gradient and intercept."
      },
      {
        "text": "\\(y = 2x + 3\\)",
        "correct": false,
        "feedback": "Swapped and lost the sign of the intercept."
      },
      {
        "text": "\\(y = 3x + 2\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(+2\\) instead of \\(-2\\)."
      }
    ],
    "backward": "\\(y = mx + c\\) structure.",
    "forward": "Forming an equation from data."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "The graph shows a straight line through the two marked points. What is its gradient?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 420\" width=\"300\" height=\"420\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"420\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"390\" x2=\"30\" y2=\"30\"/><line x1=\"60\" y1=\"390\" x2=\"60\" y2=\"30\"/><line x1=\"90\" y1=\"390\" x2=\"90\" y2=\"30\"/><line x1=\"120\" y1=\"390\" x2=\"120\" y2=\"30\"/><line x1=\"150\" y1=\"390\" x2=\"150\" y2=\"30\"/><line x1=\"180\" y1=\"390\" x2=\"180\" y2=\"30\"/><line x1=\"210\" y1=\"390\" x2=\"210\" y2=\"30\"/><line x1=\"240\" y1=\"390\" x2=\"240\" y2=\"30\"/><line x1=\"270\" y1=\"390\" x2=\"270\" y2=\"30\"/><line x1=\"30\" y1=\"390\" x2=\"270\" y2=\"390\"/><line x1=\"30\" y1=\"360\" x2=\"270\" y2=\"360\"/><line x1=\"30\" y1=\"330\" x2=\"270\" y2=\"330\"/><line x1=\"30\" y1=\"300\" x2=\"270\" y2=\"300\"/><line x1=\"30\" y1=\"270\" x2=\"270\" y2=\"270\"/><line x1=\"30\" y1=\"240\" x2=\"270\" y2=\"240\"/><line x1=\"30\" y1=\"210\" x2=\"270\" y2=\"210\"/><line x1=\"30\" y1=\"180\" x2=\"270\" y2=\"180\"/><line x1=\"30\" y1=\"150\" x2=\"270\" y2=\"150\"/><line x1=\"30\" y1=\"120\" x2=\"270\" y2=\"120\"/><line x1=\"30\" y1=\"90\" x2=\"270\" y2=\"90\"/><line x1=\"30\" y1=\"60\" x2=\"270\" y2=\"60\"/><line x1=\"30\" y1=\"30\" x2=\"270\" y2=\"30\"/></g><line x1=\"30\" y1=\"360\" x2=\"270\" y2=\"360\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"390\" x2=\"60\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"373\">-1</text><text x=\"90\" y=\"373\">1</text><text x=\"120\" y=\"373\">2</text><text x=\"150\" y=\"373\">3</text><text x=\"180\" y=\"373\">4</text><text x=\"210\" y=\"373\">5</text><text x=\"240\" y=\"373\">6</text><text x=\"270\" y=\"373\">7</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"55\" y=\"393.5\">-1</text><text x=\"55\" y=\"333.5\">1</text><text x=\"55\" y=\"303.5\">2</text><text x=\"55\" y=\"273.5\">3</text><text x=\"55\" y=\"243.5\">4</text><text x=\"55\" y=\"213.5\">5</text><text x=\"55\" y=\"183.5\">6</text><text x=\"55\" y=\"153.5\">7</text><text x=\"55\" y=\"123.5\">8</text><text x=\"55\" y=\"93.5\">9</text><text x=\"55\" y=\"63.5\">10</text><text x=\"55\" y=\"33.5\">11</text></g><text x=\"266\" y=\"354\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"68\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"30\" y1=\"390\" x2=\"210\" y2=\"30\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"270\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"180\" cy=\"90\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(9 - 3 = 6\\))."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the run only (\\(4 - 1 = 3\\))."
      },
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. Reading the marked points: \\((1, 3)\\) and \\((4, 9)\\). Rise \\(= 9 - 3 = 6\\), run \\(= 4 - 1 = 3\\), gradient \\(= \\frac{6}{3} = 2\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{3}{6} = \\frac{1}{2}\\)."
      }
    ],
    "backward": "Gradient from two points.",
    "forward": "Gradient from coordinates."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "On a distance–time graph, what does a horizontal (flat) section represent?",
    "options": [
      {
        "text": "The object is moving fast",
        "correct": false,
        "feedback": "Assumed 'not moving in x' means 'moving fast in y.' Moving fast is a steeper slope, not a flat one."
      },
      {
        "text": "The object is stationary",
        "correct": true,
        "feedback": "Correct. A flat line means distance is not changing, so the object is stationary."
      },
      {
        "text": "The object is accelerating",
        "correct": false,
        "feedback": "Acceleration would be a curve, not a flat line."
      },
      {
        "text": "The object is moving backwards",
        "correct": false,
        "feedback": "Moving backwards would be a downward slope."
      }
    ],
    "backward": "Reading graph shapes.",
    "forward": "Interpreting real-world graphs."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of the line \\(y = 5 - 2x\\)?",
    "options": [
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "Identified the gradient instead."
      },
      {
        "text": "\\(-5\\)",
        "correct": false,
        "feedback": "Gave the constant 5 a negative sign (\\(-5\\))."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Magnitude of the gradient."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Rearrange: \\(y = -2x + 5\\). The intercept is 5."
      }
    ],
    "backward": "Identifying the constant term.",
    "forward": "Rearranged equations in Ch10 L2."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 4x - 3\\). Find \\(f(0)\\).",
    "options": [
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Returned the input."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. \\(f(0) = 4(0) - 3 = -3\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Sign error on the constant."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Gave the gradient (4) as the output instead of substituting \\(x = 0\\)."
      }
    ],
    "backward": "Substituting into a function.",
    "forward": "Reading a value off the line at \\(x = 0\\)."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Which quadrant contains the point \\((-3, 5)\\)?",
    "options": [
      {
        "text": "Second",
        "correct": true,
        "feedback": "Correct. \\(x &lt; 0\\) and \\(y &gt; 0\\) — the second quadrant."
      },
      {
        "text": "First",
        "correct": false,
        "feedback": "Ignored the negative x-coordinate."
      },
      {
        "text": "Third",
        "correct": false,
        "feedback": "Assumed both coordinates negative."
      },
      {
        "text": "Fourth",
        "correct": false,
        "feedback": "Flipped the signs of both coordinates, giving \\((3, -5)\\), which is in the fourth quadrant."
      }
    ],
    "backward": "Quadrant conventions.",
    "forward": "Plotting points on a coordinate grid."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Which of these lines is parallel to \\(y = 2x + 1\\)?",
    "options": [
      {
        "text": "\\(y = -2x + 1\\)",
        "correct": false,
        "feedback": "Flipped the sign of the gradient."
      },
      {
        "text": "\\(y = x + 2\\)",
        "correct": false,
        "feedback": "Matched the constant 2 instead of the gradient: \\(y = x + 2\\) has gradient 1, not 2."
      },
      {
        "text": "\\(y = 5x + 1\\)",
        "correct": false,
        "feedback": "Matched the intercept 1 and ignored the gradient: \\(y = 5x + 1\\) has gradient 5, not 2."
      },
      {
        "text": "\\(y = 2x - 5\\)",
        "correct": true,
        "feedback": "Correct. Parallel lines have the same gradient. Both have gradient 2."
      }
    ],
    "backward": "Gradient as slope.",
    "forward": "Parallel line reasoning throughout algebra."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "What is the gradient of a horizontal line?",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Assumed every line has gradient 1 (like \\(y = x\\)). A horizontal line has gradient 0."
      },
      {
        "text": "\\(0\\)",
        "correct": true,
        "feedback": "Correct. A horizontal line has no rise (rise = 0), so gradient = 0."
      },
      {
        "text": "Undefined",
        "correct": false,
        "feedback": "Confused with a vertical line, where the run is 0 and the gradient is undefined. A horizontal line has rise 0, not run 0."
      },
      {
        "text": "Infinite",
        "correct": false,
        "feedback": "Treated 'dividing by zero' as 'infinitely steep.' A horizontal line is not steep at all: its gradient is 0."
      }
    ],
    "backward": "Rise ÷ run with rise = 0.",
    "forward": "Distinguishing horizontal from vertical."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A savings graph shows total savings on the y-axis and months on the x-axis. What does the y-intercept represent?",
    "options": [
      {
        "text": "The starting savings",
        "correct": true,
        "feedback": "Correct. The y-intercept is the value when \\(x = 0\\), which is the starting amount."
      },
      {
        "text": "The monthly savings rate",
        "correct": false,
        "feedback": "Confused the intercept with the gradient. The monthly rate is the gradient (change in savings per month)."
      },
      {
        "text": "The total after 12 months",
        "correct": false,
        "feedback": "Confused a future point on the line with the intercept. The intercept is at \\(x = 0\\) (start), not \\(x = 12\\)."
      },
      {
        "text": "The number of months to reach a target",
        "correct": false,
        "feedback": "Not represented by the intercept — that would be the x-coordinate at a target y-value."
      }
    ],
    "backward": "Y-intercept at \\(x = 0\\).",
    "forward": "Real-world intercept meaning."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "The graph shows a straight line. What is its y-intercept?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 400\" width=\"400\" height=\"400\"><rect x=\"0\" y=\"0\" width=\"400\" height=\"400\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"370\" x2=\"30\" y2=\"30\"/><line x1=\"64\" y1=\"370\" x2=\"64\" y2=\"30\"/><line x1=\"98\" y1=\"370\" x2=\"98\" y2=\"30\"/><line x1=\"132\" y1=\"370\" x2=\"132\" y2=\"30\"/><line x1=\"166\" y1=\"370\" x2=\"166\" y2=\"30\"/><line x1=\"200\" y1=\"370\" x2=\"200\" y2=\"30\"/><line x1=\"234\" y1=\"370\" x2=\"234\" y2=\"30\"/><line x1=\"268\" y1=\"370\" x2=\"268\" y2=\"30\"/><line x1=\"302\" y1=\"370\" x2=\"302\" y2=\"30\"/><line x1=\"336\" y1=\"370\" x2=\"336\" y2=\"30\"/><line x1=\"370\" y1=\"370\" x2=\"370\" y2=\"30\"/><line x1=\"30\" y1=\"370\" x2=\"370\" y2=\"370\"/><line x1=\"30\" y1=\"336\" x2=\"370\" y2=\"336\"/><line x1=\"30\" y1=\"302\" x2=\"370\" y2=\"302\"/><line x1=\"30\" y1=\"268\" x2=\"370\" y2=\"268\"/><line x1=\"30\" y1=\"234\" x2=\"370\" y2=\"234\"/><line x1=\"30\" y1=\"200\" x2=\"370\" y2=\"200\"/><line x1=\"30\" y1=\"166\" x2=\"370\" y2=\"166\"/><line x1=\"30\" y1=\"132\" x2=\"370\" y2=\"132\"/><line x1=\"30\" y1=\"98\" x2=\"370\" y2=\"98\"/><line x1=\"30\" y1=\"64\" x2=\"370\" y2=\"64\"/><line x1=\"30\" y1=\"30\" x2=\"370\" y2=\"30\"/></g><line x1=\"30\" y1=\"268\" x2=\"370\" y2=\"268\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"132\" y1=\"370\" x2=\"132\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"281\">-3</text><text x=\"64\" y=\"281\">-2</text><text x=\"98\" y=\"281\">-1</text><text x=\"166\" y=\"281\">1</text><text x=\"200\" y=\"281\">2</text><text x=\"234\" y=\"281\">3</text><text x=\"268\" y=\"281\">4</text><text x=\"302\" y=\"281\">5</text><text x=\"336\" y=\"281\">6</text><text x=\"370\" y=\"281\">7</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"127\" y=\"373.5\">-3</text><text x=\"127\" y=\"339.5\">-2</text><text x=\"127\" y=\"305.5\">-1</text><text x=\"127\" y=\"237.5\">1</text><text x=\"127\" y=\"203.5\">2</text><text x=\"127\" y=\"169.5\">3</text><text x=\"127\" y=\"135.5\">4</text><text x=\"127\" y=\"101.5\">5</text><text x=\"127\" y=\"67.5\">6</text><text x=\"127\" y=\"33.5\">7</text></g><text x=\"366\" y=\"262\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"140\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"30\" y1=\"30\" x2=\"370\" y2=\"370\" stroke=\"#c0392b\" stroke-width=\"2.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. The line crosses the y-axis at the point \\((0, 4)\\), so the y-intercept is 4."
      },
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Gave the x-coordinate of the crossing point (0) instead of its y-value."
      },
      {
        "text": "\\(-1\\)",
        "correct": false,
        "feedback": "Gave the gradient (\\(-1\\)) instead of the y-intercept: the line falls 1 for every 1 across."
      },
      {
        "text": "\\((4, 0)\\)",
        "correct": false,
        "feedback": "Read the point where the line crosses the x-axis, \\((4, 0)\\), instead of where it crosses the y-axis."
      }
    ],
    "backward": "Reading the y-value where the line meets the y-axis.",
    "forward": "Identifying \\(c\\) in \\(y = mx + c\\)."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "A function machine is: input × 2, then add 3. What is the output for input 4?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Forgot the \\(+3\\): \\(2 \\times 4 = 8\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. \\(2 \\times 4 + 3 = 11\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Forgot the \\(\\times 2\\): \\(4 + 3 = 7\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Returned the constant."
      }
    ],
    "backward": "Two-step function machine — Ch9.",
    "forward": "\\(f(x) = 2x + 3\\) form."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "What are the coordinates of point \\(P\\) on the grid?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 420\" width=\"420\" height=\"420\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"420\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"390\" x2=\"30\" y2=\"30\"/><line x1=\"60\" y1=\"390\" x2=\"60\" y2=\"30\"/><line x1=\"90\" y1=\"390\" x2=\"90\" y2=\"30\"/><line x1=\"120\" y1=\"390\" x2=\"120\" y2=\"30\"/><line x1=\"150\" y1=\"390\" x2=\"150\" y2=\"30\"/><line x1=\"180\" y1=\"390\" x2=\"180\" y2=\"30\"/><line x1=\"210\" y1=\"390\" x2=\"210\" y2=\"30\"/><line x1=\"240\" y1=\"390\" x2=\"240\" y2=\"30\"/><line x1=\"270\" y1=\"390\" x2=\"270\" y2=\"30\"/><line x1=\"300\" y1=\"390\" x2=\"300\" y2=\"30\"/><line x1=\"330\" y1=\"390\" x2=\"330\" y2=\"30\"/><line x1=\"360\" y1=\"390\" x2=\"360\" y2=\"30\"/><line x1=\"390\" y1=\"390\" x2=\"390\" y2=\"30\"/><line x1=\"30\" y1=\"390\" x2=\"390\" y2=\"390\"/><line x1=\"30\" y1=\"360\" x2=\"390\" y2=\"360\"/><line x1=\"30\" y1=\"330\" x2=\"390\" y2=\"330\"/><line x1=\"30\" y1=\"300\" x2=\"390\" y2=\"300\"/><line x1=\"30\" y1=\"270\" x2=\"390\" y2=\"270\"/><line x1=\"30\" y1=\"240\" x2=\"390\" y2=\"240\"/><line x1=\"30\" y1=\"210\" x2=\"390\" y2=\"210\"/><line x1=\"30\" y1=\"180\" x2=\"390\" y2=\"180\"/><line x1=\"30\" y1=\"150\" x2=\"390\" y2=\"150\"/><line x1=\"30\" y1=\"120\" x2=\"390\" y2=\"120\"/><line x1=\"30\" y1=\"90\" x2=\"390\" y2=\"90\"/><line x1=\"30\" y1=\"60\" x2=\"390\" y2=\"60\"/><line x1=\"30\" y1=\"30\" x2=\"390\" y2=\"30\"/></g><line x1=\"30\" y1=\"210\" x2=\"390\" y2=\"210\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"210\" y1=\"390\" x2=\"210\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"223\">-6</text><text x=\"60\" y=\"223\">-5</text><text x=\"90\" y=\"223\">-4</text><text x=\"120\" y=\"223\">-3</text><text x=\"150\" y=\"223\">-2</text><text x=\"180\" y=\"223\">-1</text><text x=\"240\" y=\"223\">1</text><text x=\"270\" y=\"223\">2</text><text x=\"300\" y=\"223\">3</text><text x=\"330\" y=\"223\">4</text><text x=\"360\" y=\"223\">5</text><text x=\"390\" y=\"223\">6</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"205\" y=\"393.5\">-6</text><text x=\"205\" y=\"363.5\">-5</text><text x=\"205\" y=\"333.5\">-4</text><text x=\"205\" y=\"303.5\">-3</text><text x=\"205\" y=\"273.5\">-2</text><text x=\"205\" y=\"243.5\">-1</text><text x=\"205\" y=\"183.5\">1</text><text x=\"205\" y=\"153.5\">2</text><text x=\"205\" y=\"123.5\">3</text><text x=\"205\" y=\"93.5\">4</text><text x=\"205\" y=\"63.5\">5</text><text x=\"205\" y=\"33.5\">6</text></g><text x=\"386\" y=\"204\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"218\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><circle cx=\"330\" cy=\"300\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><text x=\"338\" y=\"292\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\">P</text></svg></div>",
    "options": [
      {
        "text": "\\((4, -3)\\)",
        "correct": true,
        "feedback": "Correct. \\(P\\) is 4 across (right of the y-axis) and 3 down (below the x-axis), so \\(P = (4, -3)\\)."
      },
      {
        "text": "\\((-3, 4)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates: read the vertical value first."
      },
      {
        "text": "\\((4, 3)\\)",
        "correct": false,
        "feedback": "Ignored the negative sign of the y-coordinate: \\(P\\) is below the x-axis."
      },
      {
        "text": "\\((-4, -3)\\)",
        "correct": false,
        "feedback": "Gave both coordinates a negative sign, but \\(P\\) is to the right of the y-axis so \\(x\\) is positive."
      }
    ],
    "backward": "Coordinates are (x, y): across first, then up or down.",
    "forward": "Plotting points to draw graphs."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "What is the equation of the line with gradient \\(-1\\) and y-intercept \\(3\\)?",
    "options": [
      {
        "text": "\\(y = x - 3\\)",
        "correct": false,
        "feedback": "Sign errors on both \\(m\\) and \\(c\\)."
      },
      {
        "text": "\\(y = -3x + 1\\)",
        "correct": false,
        "feedback": "Swapped \\(m\\) and \\(c\\) and then reversed both signs, giving \\(m = -3\\), \\(c = 1\\)."
      },
      {
        "text": "\\(y = 3x - 1\\)",
        "correct": false,
        "feedback": "Swapped \\(m\\) and \\(c\\), giving \\(m = 3\\), \\(c = -1\\)."
      },
      {
        "text": "\\(y = -x + 3\\)",
        "correct": true,
        "feedback": "Correct. Gradient = \\(-1\\) → coefficient of \\(x\\) is \\(-1\\); intercept = 3."
      }
    ],
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations from properties."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((0, 0)\\) and \\((3, -6)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Dropped the negative sign."
      },
      {
        "text": "\\(-2\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= -6 - 0 = -6\\), run \\(= 3\\), gradient \\(= \\frac{-6}{3} = -2\\)."
      },
      {
        "text": "\\(-6\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(-6\\)), forgetting to divide by the run."
      },
      {
        "text": "\\(-\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(-\\frac{3}{6} = -\\frac{1}{2}\\)."
      }
    ],
    "backward": "Negative gradient for a falling line.",
    "forward": "Sign interpretation."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A bath fills with water. The graph shows volume on the y-axis and time on the x-axis. What does the gradient represent?",
    "options": [
      {
        "text": "The total volume when full",
        "correct": false,
        "feedback": "Confused the maximum volume (a y-value at the end) with the rate of filling. The gradient is volume ÷ time, not the total."
      },
      {
        "text": "The time to fill the bath",
        "correct": false,
        "feedback": "Confused the total time (an x-value at the end) with the gradient."
      },
      {
        "text": "The rate of filling (litres per minute)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{\\text{volume}}{\\text{time}} = \\) rate of filling."
      },
      {
        "text": "The starting volume of water",
        "correct": false,
        "feedback": "Confused the starting volume (the y-intercept) with the gradient."
      }
    ],
    "backward": "Units of gradient.",
    "forward": "Real-world rate interpretation."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of the line \\(4x - 2y = 8\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Solved \\(-2y = 8\\) as \\(y = 4\\), dropping the negative sign of the y-coefficient."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Used the magnitude of the y-coefficient (2)."
      },
      {
        "text": "\\(-4\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(-2y = 8 \\implies y = -4\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Used the constant term."
      }
    ],
    "backward": "Substituting \\(x = 0\\) to find the intercept.",
    "forward": "Rearranged equations in Ch10 L2."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x + 7\\). What is \\(f(3) - f(1)\\)?",
    "options": [
      {
        "text": "\\(26\\)",
        "correct": false,
        "feedback": "Added instead of subtracting: \\(16 + 10 = 26\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "Only computed \\(f(3) = 16\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Only computed \\(f(1) = 10\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(f(3) = 16\\), \\(f(1) = 10\\), difference \\(= 6\\)."
      }
    ],
    "backward": "Evaluating a function twice.",
    "forward": "Function values as differences."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Which of these points has an x-coordinate of 0?",
    "options": [
      {
        "text": "\\((5, 0)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates of \\((0, 5)\\): \\((5, 0)\\) has \\(x = 5\\), not 0."
      },
      {
        "text": "\\((5, 5)\\)",
        "correct": false,
        "feedback": "Assumed both coordinates must be 0 to have an x-coordinate of 0. Only the x-coordinate needs to be 0."
      },
      {
        "text": "\\((0, 5)\\)",
        "correct": true,
        "feedback": "Correct. The first coordinate is \\(x\\), so \\(x = 0\\) at \\((0, 5)\\)."
      },
      {
        "text": "\\((1, 0)\\)",
        "correct": false,
        "feedback": "Swapped the axes: this point has \\(y = 0\\) so it's on the x-axis, not the y-axis (where \\(x = 0\\))."
      }
    ],
    "backward": "Coordinates are (x, y).",
    "forward": "Points on the y-axis."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Which equation represents a line with gradient \\(0\\)?",
    "options": [
      {
        "text": "\\(x = 5\\)",
        "correct": false,
        "feedback": "\\(x = 5\\) is vertical — gradient undefined."
      },
      {
        "text": "\\(y = x\\)",
        "correct": false,
        "feedback": "\\(y = x\\) has gradient 1."
      },
      {
        "text": "\\(y = 2x\\)",
        "correct": false,
        "feedback": "\\(y = 2x\\) has gradient 2."
      },
      {
        "text": "\\(y = 5\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 5\\) is horizontal, so its gradient is 0."
      }
    ],
    "backward": "Horizontal line has gradient 0.",
    "forward": "Distinguishing horizontal from vertical."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((2, 1)\\) and \\((2, 5)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(0\\)",
        "correct": false,
        "feedback": "Confused with a horizontal line."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(5 - 1 = 4\\))."
      },
      {
        "text": "Infinite",
        "correct": false,
        "feedback": "Confused 'undefined' with 'infinite.' A vertical line's gradient is not a number — it is undefined, not infinite."
      },
      {
        "text": "Undefined",
        "correct": true,
        "feedback": "Correct. Run \\(= 2 - 2 = 0\\), so rise ÷ run involves dividing by zero — gradient is undefined."
      }
    ],
    "backward": "Vertical lines.",
    "forward": "Distinguishing horizontal from vertical throughout algebra."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A graph shows the temperature of a cooling cup of tea over time. The line slopes downwards. What does this indicate?",
    "options": [
      {
        "text": "The temperature is decreasing over time",
        "correct": true,
        "feedback": "Correct. Downward slope = the y-value decreases as x increases, so temperature decreases."
      },
      {
        "text": "The temperature is increasing over time",
        "correct": false,
        "feedback": "Misread the direction of the slope."
      },
      {
        "text": "The temperature is constant",
        "correct": false,
        "feedback": "Confused with a horizontal line."
      },
      {
        "text": "The time is decreasing",
        "correct": false,
        "feedback": "Inverted the variables."
      }
    ],
    "backward": "Reading slope direction.",
    "forward": "Interpreting real-world graphs."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "The line \\(y = mx + 4\\) passes through \\((2, 20)\\). What is the value of \\(m\\)?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Used the y-coordinate (20) as \\(m\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Used the given intercept (4) as \\(m\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Substitute the point: \\(20 = m(2) + 4 \\implies 2m = 16 \\implies m = 8\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Added the y-coordinate and the intercept: \\(20 + 4 = 24\\)."
      }
    ],
    "backward": "Substituting a point into a line equation.",
    "forward": "Finding equations of lines in Ch10 L2."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 3x\\). What is \\(f(2) + f(4)\\)?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Only computed \\(f(2) = 6\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Only computed \\(f(4) = 12\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 6\\), \\(f(4) = 12\\), sum \\(= 18\\)."
      },
      {
        "text": "\\(24\\)",
        "correct": false,
        "feedback": "Multiplied the inputs before applying the function: \\(3(2 \\times 4) = 24\\)."
      }
    ],
    "backward": "Evaluating a function twice.",
    "forward": "Function values as sums."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Complete the table for \\(y = 3x - 2\\): when \\(x = 5\\), \\(y = ?\\)",
    "options": [
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(3(5) - 2 = 13\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Forgot \\(-2\\): \\(3(5) = 15\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Added instead: \\(3(5) + 2 = 17\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Returned the input."
      }
    ],
    "backward": "Substituting into a rule.",
    "forward": "Table of values."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "Which of these points has a y-coordinate of 0?",
    "options": [
      {
        "text": "\\((0, 4)\\)",
        "correct": false,
        "feedback": "Read the point as \\((y, x)\\): in \\((0, 4)\\) the x-coordinate is 0, but the y-coordinate is 4."
      },
      {
        "text": "\\((4, 4)\\)",
        "correct": false,
        "feedback": "Neither coordinate is 0."
      },
      {
        "text": "\\((4, 0)\\)",
        "correct": true,
        "feedback": "Correct. The second coordinate is \\(y\\), so \\(y = 0\\) at \\((4, 0)\\)."
      },
      {
        "text": "\\((1, 4)\\)",
        "correct": false,
        "feedback": "Looked at the first number only: the y-coordinate (second number) of \\((1, 4)\\) is 4, not 0."
      }
    ],
    "backward": "Coordinates are (x, y).",
    "forward": "Points on the x-axis."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "What is the equation of the line with \\(m = 4\\) and \\(c = -1\\)?",
    "options": [
      {
        "text": "\\(y = -x + 4\\)",
        "correct": false,
        "feedback": "Swapped \\(m\\) and \\(c\\), giving gradient \\(-1\\) and intercept 4."
      },
      {
        "text": "\\(y = x - 4\\)",
        "correct": false,
        "feedback": "Swapped \\(m\\) and \\(c\\) and then reversed both signs, giving gradient 1 and intercept \\(-4\\)."
      },
      {
        "text": "\\(y = 4x - 1\\)",
        "correct": true,
        "feedback": "Correct. \\(y = mx + c\\) with \\(m = 4\\), \\(c = -1\\)."
      },
      {
        "text": "\\(y = -4x + 1\\)",
        "correct": false,
        "feedback": "Sign errors on both."
      }
    ],
    "backward": "\\(y = mx + c\\) structure.",
    "forward": "Forming equations."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "Which of these lines is parallel to \\(y = 5x - 2\\)?",
    "options": [
      {
        "text": "\\(y = -5x + 2\\)",
        "correct": false,
        "feedback": "Flipped the sign of the gradient."
      },
      {
        "text": "\\(y = 5x + 3\\)",
        "correct": true,
        "feedback": "Correct. Parallel lines have the same gradient. Both have gradient 5."
      },
      {
        "text": "\\(y = 2x - 5\\)",
        "correct": false,
        "feedback": "Swapped the gradient and constant."
      },
      {
        "text": "\\(y = x + 5\\)",
        "correct": false,
        "feedback": "Matched the constant 5 instead of the gradient: \\(y = x + 5\\) has gradient 1, not 5."
      }
    ],
    "backward": "Gradient as slope.",
    "forward": "Parallel line reasoning."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A line passes through \\((2, 3)\\) and \\((5, 9)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the run only (\\(5 - 2 = 3\\))."
      },
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 9 - 3 = 6\\), run \\(= 5 - 2 = 3\\), gradient \\(= 2\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(9 - 3 = 6\\))."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the fraction."
      }
    ],
    "backward": "Gradient from two points.",
    "forward": "Gradient from coordinates."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "What is the gradient of \\(y = -4x + 7\\)?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Dropped the negative sign of \\(-4x\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Identified the intercept instead."
      },
      {
        "text": "\\(-7\\)",
        "correct": false,
        "feedback": "Took the negative of the intercept."
      },
      {
        "text": "\\(-4\\)",
        "correct": true,
        "feedback": "Correct. The coefficient of \\(x\\) in \\(y = mx + c\\) is \\(-4\\)."
      }
    ],
    "backward": "Identifying \\(m\\) in \\(y = mx + c\\).",
    "forward": "Gradient from equation."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(y = 3 - x\\)?",
    "options": [
      {
        "text": "\\(-1\\)",
        "correct": false,
        "feedback": "Identified the gradient (\\(-1\\))."
      },
      {
        "text": "\\(-3\\)",
        "correct": false,
        "feedback": "Sign error on the constant."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Rearrange: \\(y = -x + 3\\). The intercept is 3."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Magnitude of the gradient."
      }
    ],
    "backward": "Identifying the constant term.",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of \\(2x + y = 5\\)?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Used the coefficient of \\(x\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(y = 5\\)."
      },
      {
        "text": "\\(-5\\)",
        "correct": false,
        "feedback": "Treated the equation as \\(-y = 5\\) at \\(x = 0\\), giving \\(-5\\)."
      },
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "Negative of the coefficient."
      }
    ],
    "backward": "Substituting \\(x = 0\\).",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "On a distance–time graph, a line that slopes downwards indicates:",
    "options": [
      {
        "text": "The object is returning towards the start",
        "correct": true,
        "feedback": "Correct. Downward slope = distance decreases with time = returning."
      },
      {
        "text": "The object is stationary",
        "correct": false,
        "feedback": "Stationary is a horizontal line."
      },
      {
        "text": "The object is speeding up",
        "correct": false,
        "feedback": "Speeding up is a curve that steepens, not a downward slope."
      },
      {
        "text": "The object is moving away from the start",
        "correct": false,
        "feedback": "Moving away is an upward slope."
      }
    ],
    "backward": "Reading slope direction in context.",
    "forward": "Interpreting real-world graphs."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "On a conversion graph between two currencies, what does the gradient represent?",
    "options": [
      {
        "text": "The conversion rate between the two units",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{\\Delta y}{\\Delta x} = \\) conversion rate."
      },
      {
        "text": "The starting value",
        "correct": false,
        "feedback": "The starting value is the y-intercept."
      },
      {
        "text": "The total amount converted",
        "correct": false,
        "feedback": "Total amount is a point value, not a rate."
      },
      {
        "text": "The time taken",
        "correct": false,
        "feedback": "Time is not the variable here."
      }
    ],
    "backward": "Units of gradient.",
    "forward": "Interpreting conversion graphs."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 5x - 1\\). Find \\(f(2)\\).",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Forgot \\(-1\\): \\(5(2) = 10\\)."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Sign error: \\(5(2) + 1 = 11\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned the input."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. \\(f(2) = 5(2) - 1 = 9\\)."
      }
    ],
    "backward": "Substituting into a function.",
    "forward": "Function values throughout algebra."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "A function machine is: input × 3, then subtract 2. What is the output for input 5?",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Forgot the \\(-2\\): \\(3(5) = 15\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Added instead: \\(3(5) + 2 = 17\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Returned the constant."
      },
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(3 \\times 5 - 2 = 13\\)."
      }
    ],
    "backward": "Two-step machine.",
    "forward": "\\(f(x) = 3x - 2\\) form."
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
    title: "Graphs — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Plotting points and using rules, gradient, y-intercept, the equation of a line, reading graphs in context, and function machines — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not a test, not timed. It checks what is solid across six graph topics: plotting points and using rules, gradient, y-intercept, equation of a line, reading graphs in context, and function machines. A few questions show a graph — read the points off the grid carefully. If something feels tricky, that is useful information, not a failure.</p><p>You will see questions from all six topics. Take your time.</p>",
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

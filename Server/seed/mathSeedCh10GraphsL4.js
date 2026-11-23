

// seed/mathSeedCh10GraphsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 10
// (Graphs), Level 4 — converted from the standalone diagnostic
// JSON ch10-graphs-level-4.json. Diagrams are inlined as SVG HTML
// directly in each question's text (the schema has no separate diagram field).
//
// Run with: node seed/mathSeedCh10GraphsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-10-graphs";
const CHAPTER_NAME = "Graphs";
const LEVEL = 4;

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
    "tier": "S",
    "question": "What are the coordinates of the point that is 3 units to the right of the origin and 5 units up?",
    "options": [
      {
        "text": "\\((3, 5)\\)",
        "correct": true,
        "feedback": "Correct. Across 3 gives \\(x = 3\\) and up 5 gives \\(y = 5\\), so the point is \\((3, 5)\\)."
      },
      {
        "text": "\\((5, 3)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates: gave the vertical value first."
      },
      {
        "text": "\\((-3, 5)\\)",
        "correct": false,
        "feedback": "Moved 3 to the left instead of to the right."
      },
      {
        "text": "\\((3, -5)\\)",
        "correct": false,
        "feedback": "Moved 5 down instead of up."
      }
    ],
    "retryHint": "Left and right change the x-coordinate; up and down change the y-coordinate. Write the point as \\((x, y)\\).",
    "backward": "Coordinates are written (x, y).",
    "forward": "Plotting points to draw graphs."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Gradient",
    "tier": "S",
    "question": "A line goes from \\((0, 0)\\) to \\((2, 10)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{\\text{rise}}{\\text{run}} = \\frac{10}{2} = 5\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Used the rise only (10)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Used the run only (2)."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{2}{10} = \\frac{1}{5}\\)."
      }
    ],
    "retryHint": "Gradient is rise divided by run. Find how far the line goes up, then how far across.",
    "backward": "Gradient as rise over run.",
    "forward": "Gradient from any two points."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "tier": "S",
    "question": "The line \\(y = 3x + 6\\) crosses the y-axis at \\(y = ?\\)",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Gave the gradient (3) instead of the y-intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. In \\(y = mx + c\\) the y-intercept is \\(c = 6\\)."
      },
      {
        "text": "\\(-6\\)",
        "correct": false,
        "feedback": "Changed the sign of the constant."
      },
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "Found where the line crosses the x-axis instead (set \\(y = 0\\): \\(x = -2\\))."
      }
    ],
    "retryHint": "Compare the equation with \\(y = mx + c\\). The y-intercept is the constant on its own.",
    "backward": "Reading \\(c\\) from \\(y = mx + c\\).",
    "forward": "Finding intercepts from other forms of equation."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "tier": "S",
    "question": "A line has gradient \\(4\\) and y-intercept \\(1\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = x + 4\\)",
        "correct": false,
        "feedback": "Swapped the gradient and the intercept."
      },
      {
        "text": "\\(y = 4x - 1\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(-1\\) instead of \\(+1\\)."
      },
      {
        "text": "\\(y = 5x\\)",
        "correct": false,
        "feedback": "Added the gradient and the intercept (4 + 1) to make a single coefficient."
      },
      {
        "text": "\\(y = 4x + 1\\)",
        "correct": true,
        "feedback": "Correct. \\(m = 4\\) and \\(c = 1\\) in \\(y = mx + c\\)."
      }
    ],
    "retryHint": "Substitute the gradient for \\(m\\) and the y-intercept for \\(c\\) in \\(y = mx + c\\).",
    "backward": "\\(y = mx + c\\).",
    "forward": "Forming equations from graphs."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "tier": "S",
    "question": "A distance–time graph is a straight line from \\((0, 0)\\) to \\((3, 60)\\), with distance in kilometres and time in hours. What is the speed?",
    "options": [
      {
        "text": "\\(60\\) km/h",
        "correct": false,
        "feedback": "Read the distance (60) as the speed."
      },
      {
        "text": "\\(3\\) km/h",
        "correct": false,
        "feedback": "Read the time (3) as the speed."
      },
      {
        "text": "\\(20\\) km/h",
        "correct": true,
        "feedback": "Correct. Speed is the gradient: \\(\\frac{60}{3} = 20\\) km/h."
      },
      {
        "text": "\\(180\\) km/h",
        "correct": false,
        "feedback": "Multiplied distance by time (\\(60 \\times 3\\)) instead of dividing."
      }
    ],
    "retryHint": "Speed on a distance–time graph is the gradient: distance divided by time.",
    "backward": "Gradient as a rate.",
    "forward": "Direct proportion and rates in Ch11."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "tier": "C",
    "question": "\\(f(x) = 3x + 1\\). Find \\(f(4)\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Left out the \\(+1\\): \\(3 \\times 4 = 12\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(f(4) = 3(4) + 1 = 13\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Added 1 before multiplying: \\(3(4 + 1) = 15\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Added instead of multiplying: \\(3 + 4 = 7\\)."
      }
    ],
    "retryHint": "Replace \\(x\\) with 4, multiply by 3 first, then add 1.",
    "backward": "Substituting into a function.",
    "forward": "Solving \\(f(x) = k\\)."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C2",
    "clusterName": "Gradient",
    "tier": "C",
    "question": "A line goes through \\((1, 7)\\) and \\((3, 1)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign: the line falls, so the gradient is negative."
      },
      {
        "text": "\\(-6\\)",
        "correct": false,
        "feedback": "Used the rise only (\\(1 - 7 = -6\\))."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 1 - 7 = -6\\), run \\(= 3 - 1 = 2\\), gradient \\(= -6 \\div 2 = -3\\)."
      },
      {
        "text": "\\(-\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{2}{-6} = -\\frac{1}{3}\\)."
      }
    ],
    "retryHint": "Rise is the change in y, run is the change in x. Subtract the first point from the second in the same order for both.",
    "backward": "Negative gradient from two points.",
    "forward": "Interpreting a falling line."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "tier": "C",
    "question": "A line has gradient \\(2\\) and passes through \\((3, 11)\\). What is its y-intercept?",
    "options": [
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "Added \\(2 \\times 3 = 6\\) to 11 instead of subtracting it."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as the intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Stopped at \\(2 \\times 3 = 6\\) and gave that as the intercept."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(11 = 2(3) + c \\implies c = 5\\)."
      }
    ],
    "retryHint": "Substitute \\(m = 2\\), \\(x = 3\\) and \\(y = 11\\) into \\(y = mx + c\\), then solve for \\(c\\).",
    "backward": "Substituting a point into \\(y = mx + c\\).",
    "forward": "Forming equations."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "tier": "S",
    "question": "In which quadrant is the point \\((-4, 3)\\)?",
    "options": [
      {
        "text": "First",
        "correct": false,
        "feedback": "Ignored the negative sign of the x-coordinate."
      },
      {
        "text": "Second",
        "correct": true,
        "feedback": "Correct. A negative \\(x\\) puts the point left of the y-axis and a positive \\(y\\) puts it above the x-axis: the top-left quadrant, the second."
      },
      {
        "text": "Third",
        "correct": false,
        "feedback": "Gave both coordinates a negative sign."
      },
      {
        "text": "Fourth",
        "correct": false,
        "feedback": "Read the point as \\((4, -3)\\), swapping which coordinate is negative."
      }
    ],
    "backward": "Quadrants and signs of coordinates.",
    "forward": "Plotting graphs through all four quadrants."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "tier": "C",
    "question": "A line passes through \\((0, -3)\\) and \\((2, 1)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 2x + 3\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(+3\\) instead of \\(-3\\)."
      },
      {
        "text": "\\(y = 4x - 3\\)",
        "correct": false,
        "feedback": "Used the rise (4) as the gradient without dividing by the run."
      },
      {
        "text": "\\(y = 2x - 3\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{1 - (-3)}{2 - 0} = 2\\), and the line crosses the y-axis at \\((0, -3)\\), so \\(c = -3\\)."
      },
      {
        "text": "\\(y = -3x + 2\\)",
        "correct": false,
        "feedback": "Swapped the roles: used \\(-3\\) as the gradient and 2 as the intercept."
      }
    ],
    "backward": "Equation from two points.",
    "forward": "Equations of graphs in modelling."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "tier": "T",
    "question": "The graph shows a straight line through the two marked points. Read the scale on each axis carefully. What is the gradient of the line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 398\" width=\"340\" height=\"398\"><rect x=\"0\" y=\"0\" width=\"340\" height=\"398\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"368\" x2=\"30\" y2=\"30\"/><line x1=\"70\" y1=\"368\" x2=\"70\" y2=\"30\"/><line x1=\"110\" y1=\"368\" x2=\"110\" y2=\"30\"/><line x1=\"150\" y1=\"368\" x2=\"150\" y2=\"30\"/><line x1=\"190\" y1=\"368\" x2=\"190\" y2=\"30\"/><line x1=\"230\" y1=\"368\" x2=\"230\" y2=\"30\"/><line x1=\"270\" y1=\"368\" x2=\"270\" y2=\"30\"/><line x1=\"310\" y1=\"368\" x2=\"310\" y2=\"30\"/><line x1=\"30\" y1=\"368\" x2=\"310\" y2=\"368\"/><line x1=\"30\" y1=\"342\" x2=\"310\" y2=\"342\"/><line x1=\"30\" y1=\"316\" x2=\"310\" y2=\"316\"/><line x1=\"30\" y1=\"290\" x2=\"310\" y2=\"290\"/><line x1=\"30\" y1=\"264\" x2=\"310\" y2=\"264\"/><line x1=\"30\" y1=\"238\" x2=\"310\" y2=\"238\"/><line x1=\"30\" y1=\"212\" x2=\"310\" y2=\"212\"/><line x1=\"30\" y1=\"186\" x2=\"310\" y2=\"186\"/><line x1=\"30\" y1=\"160\" x2=\"310\" y2=\"160\"/><line x1=\"30\" y1=\"134\" x2=\"310\" y2=\"134\"/><line x1=\"30\" y1=\"108\" x2=\"310\" y2=\"108\"/><line x1=\"30\" y1=\"82\" x2=\"310\" y2=\"82\"/><line x1=\"30\" y1=\"56\" x2=\"310\" y2=\"56\"/><line x1=\"30\" y1=\"30\" x2=\"310\" y2=\"30\"/></g><line x1=\"30\" y1=\"342\" x2=\"310\" y2=\"342\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"368\" x2=\"70\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"355\">-1</text><text x=\"110\" y=\"355\">1</text><text x=\"150\" y=\"355\">2</text><text x=\"190\" y=\"355\">3</text><text x=\"230\" y=\"355\">4</text><text x=\"270\" y=\"355\">5</text><text x=\"310\" y=\"355\">6</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"65\" y=\"293.5\">20</text><text x=\"65\" y=\"241.5\">40</text><text x=\"65\" y=\"189.5\">60</text><text x=\"65\" y=\"137.5\">80</text><text x=\"65\" y=\"85.5\">100</text><text x=\"65\" y=\"33.5\">120</text></g><text x=\"306\" y=\"336\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"78\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"30\" y1=\"368\" x2=\"290\" y2=\"30\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"110\" cy=\"264\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"270\" cy=\"56\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. From the scales, the points are \\((1, 30)\\) and \\((5, 110)\\). Rise \\(= 80\\), run \\(= 4\\), gradient \\(= 80 \\div 4 = 20\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Counted grid squares (8 up, 4 across) instead of using the axis values; each vertical square is worth 10."
      },
      {
        "text": "\\(80\\)",
        "correct": false,
        "feedback": "Used the rise only (80)."
      },
      {
        "text": "\\(\\frac{1}{20}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{4}{80} = \\frac{1}{20}\\)."
      }
    ],
    "backward": "Gradient from a graph with unequal scales.",
    "forward": "Rates from scatter graphs in Ch15."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "tier": "S",
    "question": "A graph shows a person's distance from home (y-axis) against time (x-axis). The line slopes downwards. What does this show?",
    "options": [
      {
        "text": "The person is stationary",
        "correct": false,
        "feedback": "Mistook a downward slope for a flat line: a stationary person gives a horizontal line."
      },
      {
        "text": "The person is moving away from home",
        "correct": false,
        "feedback": "Read any sloping line as moving away; here the distance from home is falling."
      },
      {
        "text": "The person is slowing down",
        "correct": false,
        "feedback": "Read the downward slope as slowing down; speed is the steepness, not the direction of the slope."
      },
      {
        "text": "The person is moving back towards home",
        "correct": true,
        "feedback": "Correct. The distance from home is decreasing, so the person is getting closer to home."
      }
    ],
    "backward": "Reading the direction of a distance–time graph.",
    "forward": "Interpreting real-world graphs."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "tier": "C",
    "question": "What is the y-intercept of the line \\(2x + 5y = 20\\)?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Set \\(y = 0\\) instead of \\(x = 0\\): \\(2x = 20\\), which gives the x-intercept."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Used the constant on the right-hand side as the intercept."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the coefficient of \\(y\\) as the intercept."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(5y = 20 \\implies y = 4\\)."
      }
    ],
    "backward": "Substituting \\(x = 0\\).",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "tier": "S",
    "question": "\\(f(x) = 5x\\). Find \\(f(-2)\\).",
    "options": [
      {
        "text": "\\(-10\\)",
        "correct": true,
        "feedback": "Correct. \\(f(-2) = 5 \\times (-2) = -10\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Dropped the negative sign of the product."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Added instead of multiplying: \\(5 + (-2) = 3\\)."
      },
      {
        "text": "\\(-7\\)",
        "correct": false,
        "feedback": "Subtracted instead of multiplying: \\(-2 - 5 = -7\\)."
      }
    ],
    "backward": "Substituting a negative input.",
    "forward": "Functions with negative inputs."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "tier": "C",
    "question": "Which of these points lies on the line \\(y = 3x - 5\\)?",
    "options": [
      {
        "text": "\\((4, 7)\\)",
        "correct": true,
        "feedback": "Correct. \\(3(4) - 5 = 7\\), so \\((4, 7)\\) is on the line."
      },
      {
        "text": "\\((4, 17)\\)",
        "correct": false,
        "feedback": "Used \\(y = 3x + 5\\): \\(3(4) + 5 = 17\\)."
      },
      {
        "text": "\\((7, 4)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates of the correct point."
      },
      {
        "text": "\\((4, 12)\\)",
        "correct": false,
        "feedback": "Used \\(3x\\) and forgot to subtract 5."
      }
    ],
    "backward": "Testing a point in an equation.",
    "forward": "Finding where graphs pass through given points."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "tier": "H",
    "question": "A line passes through \\((0, 5)\\) and \\((4, 13)\\). The point \\((k, 25)\\) is also on the line. What is \\(k\\)?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "Stopped at \\(2k = 20\\) without dividing by 2."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Added 5 to 25 instead of subtracting: \\(2k = 30\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{13 - 5}{4} = 2\\) and \\(c = 5\\), so \\(y = 2x + 5\\). Then \\(25 = 2k + 5 \\implies k = 10\\)."
      },
      {
        "text": "\\(\\frac{5}{2}\\)",
        "correct": false,
        "feedback": "Used the rise (8) as the gradient: \\(25 = 8k + 5\\) gives \\(k = \\frac{5}{2}\\)."
      }
    ],
    "backward": "Equation from two points, then substitution.",
    "forward": "Solving problems with linear models."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Gradient",
    "tier": "T",
    "question": "What is the gradient of the line \\(y = 7 - 3x\\)?",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Read the first number in the equation as the gradient."
      },
      {
        "text": "\\(-3\\)",
        "correct": true,
        "feedback": "Correct. Written as \\(y = -3x + 7\\), the coefficient of \\(x\\) is \\(-3\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Dropped the negative sign in front of the \\(3x\\) term."
      },
      {
        "text": "\\(\\frac{7}{3}\\)",
        "correct": false,
        "feedback": "Found the x-intercept (set \\(y = 0\\): \\(x = \\frac{7}{3}\\)) instead of the gradient."
      }
    ],
    "backward": "Gradient from \\(y = mx + c\\) in a different order.",
    "forward": "Gradients from rearranged equations."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "tier": "H",
    "question": "The graph shows the journeys of two cars, \\(A\\) and \\(B\\), with distance in kilometres and time in hours. Which car is travelling faster, and by how much?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 540\" width=\"360\" height=\"540\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"540\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"510\" x2=\"30\" y2=\"30\"/><line x1=\"80\" y1=\"510\" x2=\"80\" y2=\"30\"/><line x1=\"130\" y1=\"510\" x2=\"130\" y2=\"30\"/><line x1=\"180\" y1=\"510\" x2=\"180\" y2=\"30\"/><line x1=\"230\" y1=\"510\" x2=\"230\" y2=\"30\"/><line x1=\"280\" y1=\"510\" x2=\"280\" y2=\"30\"/><line x1=\"330\" y1=\"510\" x2=\"330\" y2=\"30\"/><line x1=\"30\" y1=\"510\" x2=\"330\" y2=\"510\"/><line x1=\"30\" y1=\"478\" x2=\"330\" y2=\"478\"/><line x1=\"30\" y1=\"446\" x2=\"330\" y2=\"446\"/><line x1=\"30\" y1=\"414\" x2=\"330\" y2=\"414\"/><line x1=\"30\" y1=\"382\" x2=\"330\" y2=\"382\"/><line x1=\"30\" y1=\"350\" x2=\"330\" y2=\"350\"/><line x1=\"30\" y1=\"318\" x2=\"330\" y2=\"318\"/><line x1=\"30\" y1=\"286\" x2=\"330\" y2=\"286\"/><line x1=\"30\" y1=\"254\" x2=\"330\" y2=\"254\"/><line x1=\"30\" y1=\"222\" x2=\"330\" y2=\"222\"/><line x1=\"30\" y1=\"190\" x2=\"330\" y2=\"190\"/><line x1=\"30\" y1=\"158\" x2=\"330\" y2=\"158\"/><line x1=\"30\" y1=\"126\" x2=\"330\" y2=\"126\"/><line x1=\"30\" y1=\"94\" x2=\"330\" y2=\"94\"/><line x1=\"30\" y1=\"62\" x2=\"330\" y2=\"62\"/><line x1=\"30\" y1=\"30\" x2=\"330\" y2=\"30\"/></g><line x1=\"30\" y1=\"478\" x2=\"330\" y2=\"478\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"80\" y1=\"510\" x2=\"80\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"491\">-1</text><text x=\"130\" y=\"491\">1</text><text x=\"180\" y=\"491\">2</text><text x=\"230\" y=\"491\">3</text><text x=\"280\" y=\"491\">4</text><text x=\"330\" y=\"491\">5</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"75\" y=\"417.5\">20</text><text x=\"75\" y=\"353.5\">40</text><text x=\"75\" y=\"289.5\">60</text><text x=\"75\" y=\"225.5\">80</text><text x=\"75\" y=\"161.5\">100</text><text x=\"75\" y=\"97.5\">120</text><text x=\"75\" y=\"33.5\">140</text></g><text x=\"326\" y=\"472\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">Time (h)</text><text x=\"88\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">Distance (km)</text><line x1=\"60\" y1=\"510\" x2=\"330\" y2=\"78\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><text x=\"314\" y=\"96\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\" text-anchor=\"end\">A</text><line x1=\"30\" y1=\"382\" x2=\"305\" y2=\"30\" stroke=\"#2c6fbb\" stroke-width=\"2.5\"/><text x=\"289\" y=\"48\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#2c6fbb\" text-anchor=\"end\">B</text><circle cx=\"80\" cy=\"478\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"280\" cy=\"158\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"80\" cy=\"318\" r=\"4.5\" fill=\"#2c6fbb\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"280\" cy=\"62\" r=\"4.5\" fill=\"#2c6fbb\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "Car \\(B\\), by \\(5\\) km/h",
        "correct": false,
        "feedback": "Judged by height on the graph: \\(B\\)'s line is higher, but its gradient is smaller (20 against 25)."
      },
      {
        "text": "Car \\(A\\), by \\(25\\) km/h",
        "correct": false,
        "feedback": "Gave \\(A\\)'s speed (25) instead of the difference in speeds."
      },
      {
        "text": "Car \\(B\\), by \\(30\\) km/h",
        "correct": false,
        "feedback": "Compared distances at 4 hours (\\(130 - 100 = 30\\)) instead of the gradients."
      },
      {
        "text": "Car \\(A\\), by \\(5\\) km/h",
        "correct": true,
        "feedback": "Correct. Car \\(A\\): \\(\\frac{100}{4} = 25\\) km/h. Car \\(B\\): \\(\\frac{130 - 50}{4} = 20\\) km/h. Car \\(A\\) is faster by 5 km/h."
      }
    ],
    "backward": "Comparing gradients of two graphs.",
    "forward": "Comparing rates in Ch11."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "tier": "T",
    "question": "What is the y-intercept of the line \\(y = 2(x - 3)\\)?",
    "options": [
      {
        "text": "\\(-3\\)",
        "correct": false,
        "feedback": "Read the number inside the bracket as the intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Expanded correctly but dropped the negative sign: \\(2 \\times 3 = 6\\)."
      },
      {
        "text": "\\(-6\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(y = 2x - 6\\), so \\(c = -6\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Gave the gradient (2) instead of the y-intercept."
      }
    ],
    "backward": "Expanding brackets, Ch2, then reading \\(c\\).",
    "forward": "Intercepts of rearranged equations."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "tier": "C",
    "question": "\\(f(x) = 4 - 3x\\). Find \\(f(-2)\\).",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(f(-2) = 4 - 3(-2) = 4 + 6 = 10\\)."
      },
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "Treated \\(-3x\\) as \\(+3x\\): \\(4 + 3(-2) = -2\\)."
      },
      {
        "text": "\\(-10\\)",
        "correct": false,
        "feedback": "Evaluated \\(3x - 4\\) instead: \\(-6 - 4 = -10\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Added the input to 4 (\\(4 + (-2)\\)) instead of substituting into \\(-3x\\)."
      }
    ],
    "backward": "Substituting a negative into a function.",
    "forward": "Composite and inverse functions."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "tier": "T",
    "question": "Point \\(P\\) is shown on the grid. What are the coordinates of the point on the x-axis directly below \\(P\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 420\" width=\"420\" height=\"420\"><rect x=\"0\" y=\"0\" width=\"420\" height=\"420\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"390\" x2=\"30\" y2=\"30\"/><line x1=\"60\" y1=\"390\" x2=\"60\" y2=\"30\"/><line x1=\"90\" y1=\"390\" x2=\"90\" y2=\"30\"/><line x1=\"120\" y1=\"390\" x2=\"120\" y2=\"30\"/><line x1=\"150\" y1=\"390\" x2=\"150\" y2=\"30\"/><line x1=\"180\" y1=\"390\" x2=\"180\" y2=\"30\"/><line x1=\"210\" y1=\"390\" x2=\"210\" y2=\"30\"/><line x1=\"240\" y1=\"390\" x2=\"240\" y2=\"30\"/><line x1=\"270\" y1=\"390\" x2=\"270\" y2=\"30\"/><line x1=\"300\" y1=\"390\" x2=\"300\" y2=\"30\"/><line x1=\"330\" y1=\"390\" x2=\"330\" y2=\"30\"/><line x1=\"360\" y1=\"390\" x2=\"360\" y2=\"30\"/><line x1=\"390\" y1=\"390\" x2=\"390\" y2=\"30\"/><line x1=\"30\" y1=\"390\" x2=\"390\" y2=\"390\"/><line x1=\"30\" y1=\"360\" x2=\"390\" y2=\"360\"/><line x1=\"30\" y1=\"330\" x2=\"390\" y2=\"330\"/><line x1=\"30\" y1=\"300\" x2=\"390\" y2=\"300\"/><line x1=\"30\" y1=\"270\" x2=\"390\" y2=\"270\"/><line x1=\"30\" y1=\"240\" x2=\"390\" y2=\"240\"/><line x1=\"30\" y1=\"210\" x2=\"390\" y2=\"210\"/><line x1=\"30\" y1=\"180\" x2=\"390\" y2=\"180\"/><line x1=\"30\" y1=\"150\" x2=\"390\" y2=\"150\"/><line x1=\"30\" y1=\"120\" x2=\"390\" y2=\"120\"/><line x1=\"30\" y1=\"90\" x2=\"390\" y2=\"90\"/><line x1=\"30\" y1=\"60\" x2=\"390\" y2=\"60\"/><line x1=\"30\" y1=\"30\" x2=\"390\" y2=\"30\"/></g><line x1=\"30\" y1=\"210\" x2=\"390\" y2=\"210\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"210\" y1=\"390\" x2=\"210\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"223\">-6</text><text x=\"60\" y=\"223\">-5</text><text x=\"90\" y=\"223\">-4</text><text x=\"120\" y=\"223\">-3</text><text x=\"150\" y=\"223\">-2</text><text x=\"180\" y=\"223\">-1</text><text x=\"240\" y=\"223\">1</text><text x=\"270\" y=\"223\">2</text><text x=\"300\" y=\"223\">3</text><text x=\"330\" y=\"223\">4</text><text x=\"360\" y=\"223\">5</text><text x=\"390\" y=\"223\">6</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"205\" y=\"393.5\">-6</text><text x=\"205\" y=\"363.5\">-5</text><text x=\"205\" y=\"333.5\">-4</text><text x=\"205\" y=\"303.5\">-3</text><text x=\"205\" y=\"273.5\">-2</text><text x=\"205\" y=\"243.5\">-1</text><text x=\"205\" y=\"183.5\">1</text><text x=\"205\" y=\"153.5\">2</text><text x=\"205\" y=\"123.5\">3</text><text x=\"205\" y=\"93.5\">4</text><text x=\"205\" y=\"63.5\">5</text><text x=\"205\" y=\"33.5\">6</text></g><text x=\"386\" y=\"204\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"218\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><circle cx=\"120\" cy=\"90\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><text x=\"128\" y=\"82\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"bold\" fill=\"#c0392b\">P</text></svg></div>",
    "options": [
      {
        "text": "\\((-3, 0)\\)",
        "correct": true,
        "feedback": "Correct. \\(P = (-3, 4)\\). Moving straight down to the x-axis keeps \\(x = -3\\) and makes \\(y = 0\\)."
      },
      {
        "text": "\\((0, 4)\\)",
        "correct": false,
        "feedback": "Moved across to the y-axis instead of down to the x-axis."
      },
      {
        "text": "\\((-3, -4)\\)",
        "correct": false,
        "feedback": "Went as far below the x-axis as \\(P\\) is above it, rather than stopping at the axis."
      },
      {
        "text": "\\((4, 0)\\)",
        "correct": false,
        "feedback": "Read \\(P\\) as \\((4, -3)\\) by swapping the coordinates, then dropped to the x-axis."
      }
    ],
    "backward": "Coordinates on the axes.",
    "forward": "Reflections and translations in Ch13."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "tier": "C",
    "question": "A line has gradient \\(3\\) and passes through \\((2, 7)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = 3x + 7\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate as the intercept."
      },
      {
        "text": "\\(y = 3x + 1\\)",
        "correct": true,
        "feedback": "Correct. \\(7 = 3(2) + c \\implies c = 1\\), so \\(y = 3x + 1\\)."
      },
      {
        "text": "\\(y = 3x + 13\\)",
        "correct": false,
        "feedback": "Added \\(3 \\times 2 = 6\\) to 7 instead of subtracting it."
      },
      {
        "text": "\\(y = 3x - 1\\)",
        "correct": false,
        "feedback": "Solved \\(7 = 6 + c\\) as \\(c = 6 - 7 = -1\\), reversing the subtraction."
      }
    ],
    "backward": "Equation from gradient and a point.",
    "forward": "Forming equations."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Gradient",
    "tier": "C",
    "question": "A line passes through \\((-4, 1)\\) and \\((2, 4)\\). What is its gradient?",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{6}{3} = 2\\)."
      },
      {
        "text": "\\(-\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Wrote the run as \\(2 - 4 = -2\\) instead of \\(2 - (-4) = 6\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Used the rise only (3)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Rise \\(= 4 - 1 = 3\\), run \\(= 2 - (-4) = 6\\), gradient \\(= \\frac{3}{6} = \\frac{1}{2}\\)."
      }
    ],
    "backward": "Gradient with a negative coordinate.",
    "forward": "Gradients as rates."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "tier": "T",
    "question": "A taxi's cost (in £) against distance (in km) is a straight line through \\((0, 3)\\) and \\((5, 13)\\). What is the cost of an 8 km journey?",
    "options": [
      {
        "text": "\\(£16\\)",
        "correct": false,
        "feedback": "Forgot the fixed charge: \\(2 \\times 8 = 16\\)."
      },
      {
        "text": "\\(£19\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{13 - 3}{5} = 2\\) per km, and the fixed charge is 3, so cost \\(= 2 \\times 8 + 3 = 19\\)."
      },
      {
        "text": "\\(£24\\)",
        "correct": false,
        "feedback": "Used the fixed charge as the rate: \\(3 \\times 8 = 24\\)."
      },
      {
        "text": "\\(£11\\)",
        "correct": false,
        "feedback": "Added the distance to the fixed charge: \\(3 + 8 = 11\\)."
      }
    ],
    "backward": "Gradient as a rate and intercept as a starting amount.",
    "forward": "Linear models and rates."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "tier": "H",
    "question": "A line passes through \\((2, 9)\\) and \\((5, 18)\\). What is its y-intercept?",
    "options": [
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Added \\(3 \\times 2 = 6\\) to 9 instead of subtracting it."
      },
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{18 - 9}{5 - 2} = 3\\). Then \\(9 = 3(2) + c \\implies c = 3\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Stopped at \\(3 \\times 2 = 6\\) and gave that as the intercept."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "Used the y-coordinate of the first point as the intercept."
      }
    ],
    "backward": "Gradient, then intercept.",
    "forward": "Forming equations from data."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "tier": "C",
    "question": "\\(f(x) = 2x + 3\\). For what value of \\(x\\) is \\(f(x) = 11\\)?",
    "options": [
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Substituted 11 as the input: \\(f(11) = 2(11) + 3 = 25\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Stopped at \\(2x = 8\\) without dividing by 2."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + 3 = 11 \\implies 2x = 8 \\implies x = 4\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Added 3 instead of subtracting it: \\(2x = 14\\), so \\(x = 7\\)."
      }
    ],
    "backward": "Solving a two-step equation.",
    "forward": "Inverse functions."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "tier": "C",
    "question": "\\(A(-2, 1)\\), \\(B(4, 1)\\) and \\(C(4, 7)\\) are three vertices of a square \\(ABCD\\). What are the coordinates of \\(D\\)?",
    "options": [
      {
        "text": "\\((7, -2)\\)",
        "correct": false,
        "feedback": "Swapped the coordinates of the correct point."
      },
      {
        "text": "\\((-2, -5)\\)",
        "correct": false,
        "feedback": "Went 6 down from \\(A\\) instead of 6 up: \\(1 - 6 = -5\\)."
      },
      {
        "text": "\\((-2, 7)\\)",
        "correct": true,
        "feedback": "Correct. \\(AB = 6\\), so each side is 6. \\(D\\) is directly above \\(A\\): \\((-2, 1 + 6) = (-2, 7)\\)."
      },
      {
        "text": "\\((-2, 6)\\)",
        "correct": false,
        "feedback": "Used the side length (6) as the y-coordinate."
      }
    ],
    "backward": "Coordinates of a shape.",
    "forward": "Coordinate geometry."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "tier": "H",
    "question": "The line \\(y = mx + c\\) passes through \\((1, 5)\\) and \\((3, 11)\\). What is \\(m + c\\)?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Multiplied instead of adding: \\(3 \\times 2 = 6\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Subtracted instead of adding: \\(3 - 2 = 1\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Used the point's y-coordinate (5) as \\(c\\): \\(3 + 5 = 8\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(m = \\frac{11 - 5}{3 - 1} = 3\\). Then \\(5 = 3(1) + c \\implies c = 2\\), so \\(m + c = 5\\)."
      }
    ],
    "backward": "Finding \\(m\\) and \\(c\\) from two points.",
    "forward": "Forming equations."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Coordinates and plotting",
    "question": "In which quadrant is the point \\((3, -6)\\)?",
    "options": [
      {
        "text": "First",
        "correct": false,
        "feedback": "Ignored the negative sign of the y-coordinate."
      },
      {
        "text": "Second",
        "correct": false,
        "feedback": "Read the point as \\((-3, 6)\\), swapping which coordinate is negative."
      },
      {
        "text": "Fourth",
        "correct": true,
        "feedback": "Correct. A positive \\(x\\) puts the point right of the y-axis and a negative \\(y\\) puts it below the x-axis: the bottom-right quadrant, the fourth."
      },
      {
        "text": "Third",
        "correct": false,
        "feedback": "Gave both coordinates a negative sign."
      }
    ],
    "backward": "Quadrants and signs of coordinates.",
    "forward": "Plotting graphs through all four quadrants."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "A straight line passes through the two marked points on the graph. Check the scale on each axis, then find the gradient of the line.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 398\" width=\"340\" height=\"398\"><rect x=\"0\" y=\"0\" width=\"340\" height=\"398\" fill=\"#ffffff\"/><g stroke=\"#e0e0e0\" stroke-width=\"1\"><line x1=\"30\" y1=\"368\" x2=\"30\" y2=\"30\"/><line x1=\"70\" y1=\"368\" x2=\"70\" y2=\"30\"/><line x1=\"110\" y1=\"368\" x2=\"110\" y2=\"30\"/><line x1=\"150\" y1=\"368\" x2=\"150\" y2=\"30\"/><line x1=\"190\" y1=\"368\" x2=\"190\" y2=\"30\"/><line x1=\"230\" y1=\"368\" x2=\"230\" y2=\"30\"/><line x1=\"270\" y1=\"368\" x2=\"270\" y2=\"30\"/><line x1=\"310\" y1=\"368\" x2=\"310\" y2=\"30\"/><line x1=\"30\" y1=\"368\" x2=\"310\" y2=\"368\"/><line x1=\"30\" y1=\"342\" x2=\"310\" y2=\"342\"/><line x1=\"30\" y1=\"316\" x2=\"310\" y2=\"316\"/><line x1=\"30\" y1=\"290\" x2=\"310\" y2=\"290\"/><line x1=\"30\" y1=\"264\" x2=\"310\" y2=\"264\"/><line x1=\"30\" y1=\"238\" x2=\"310\" y2=\"238\"/><line x1=\"30\" y1=\"212\" x2=\"310\" y2=\"212\"/><line x1=\"30\" y1=\"186\" x2=\"310\" y2=\"186\"/><line x1=\"30\" y1=\"160\" x2=\"310\" y2=\"160\"/><line x1=\"30\" y1=\"134\" x2=\"310\" y2=\"134\"/><line x1=\"30\" y1=\"108\" x2=\"310\" y2=\"108\"/><line x1=\"30\" y1=\"82\" x2=\"310\" y2=\"82\"/><line x1=\"30\" y1=\"56\" x2=\"310\" y2=\"56\"/><line x1=\"30\" y1=\"30\" x2=\"310\" y2=\"30\"/></g><line x1=\"30\" y1=\"342\" x2=\"310\" y2=\"342\" stroke=\"#333333\" stroke-width=\"2\"/><line x1=\"70\" y1=\"368\" x2=\"70\" y2=\"30\" stroke=\"#333333\" stroke-width=\"2\"/><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"middle\"><text x=\"30\" y=\"355\">-1</text><text x=\"110\" y=\"355\">1</text><text x=\"150\" y=\"355\">2</text><text x=\"190\" y=\"355\">3</text><text x=\"230\" y=\"355\">4</text><text x=\"270\" y=\"355\">5</text><text x=\"310\" y=\"355\">6</text></g><g font-family=\"sans-serif\" font-size=\"10\" fill=\"#666666\" text-anchor=\"end\"><text x=\"65\" y=\"293.5\">10</text><text x=\"65\" y=\"241.5\">20</text><text x=\"65\" y=\"189.5\">30</text><text x=\"65\" y=\"137.5\">40</text><text x=\"65\" y=\"85.5\">50</text><text x=\"65\" y=\"33.5\">60</text></g><text x=\"306\" y=\"336\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"78\" y=\"42\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#333333\" font-style=\"italic\">y</text><line x1=\"30\" y1=\"368\" x2=\"290\" y2=\"30\" stroke=\"#c0392b\" stroke-width=\"2.5\"/><circle cx=\"110\" cy=\"264\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/><circle cx=\"270\" cy=\"56\" r=\"4.5\" fill=\"#c0392b\" stroke=\"#ffffff\" stroke-width=\"1.5\"/></svg></div>",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. From the scales, the points are \\((1, 15)\\) and \\((5, 55)\\). Rise \\(= 40\\), run \\(= 4\\), gradient \\(= 40 \\div 4 = 10\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Counted grid squares (8 up, 4 across) instead of using the axis values; each vertical square is worth 5."
      },
      {
        "text": "\\(40\\)",
        "correct": false,
        "feedback": "Used the rise only (40)."
      },
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Inverted the fraction: \\(\\frac{4}{40} = \\frac{1}{10}\\)."
      }
    ],
    "backward": "Gradient from a graph with unequal scales.",
    "forward": "Rates from scatter graphs in Ch15."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Gradient",
    "question": "What is the gradient of the line \\(y = 8 - 5x\\)?",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Read the first number in the equation as the gradient."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Dropped the negative sign in front of the \\(5x\\) term."
      },
      {
        "text": "\\(-5\\)",
        "correct": true,
        "feedback": "Correct. Written as \\(y = -5x + 8\\), the coefficient of \\(x\\) is \\(-5\\)."
      },
      {
        "text": "\\(\\frac{8}{5}\\)",
        "correct": false,
        "feedback": "Found the x-intercept (set \\(y = 0\\): \\(x = \\frac{8}{5}\\)) instead of the gradient."
      }
    ],
    "backward": "Gradient from \\(y = mx + c\\) in a different order.",
    "forward": "Gradients from rearranged equations."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of the line \\(y = 3(x - 2)\\)?",
    "options": [
      {
        "text": "\\(-6\\)",
        "correct": true,
        "feedback": "Correct. Expanding gives \\(y = 3x - 6\\), so \\(c = -6\\)."
      },
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "Read the number inside the bracket as the intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Expanded correctly but dropped the negative sign: \\(3 \\times 2 = 6\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Gave the gradient (3) instead of the y-intercept."
      }
    ],
    "backward": "Expanding brackets, Ch2, then reading \\(c\\).",
    "forward": "Intercepts of rearranged equations."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "What is the y-intercept of the line \\(3x + 5y = 30\\)?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Set \\(y = 0\\) instead of \\(x = 0\\): \\(3x = 30\\), which gives the x-intercept."
      },
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. At \\(x = 0\\): \\(5y = 30 \\implies y = 6\\)."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "Used the constant on the right-hand side as the intercept."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Used the coefficient of \\(y\\) as the intercept."
      }
    ],
    "backward": "Substituting \\(x = 0\\).",
    "forward": "Rearranged equations."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Functions and mappings",
    "question": "\\(f(x) = 7 - 2x\\). Find \\(f(-3)\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Treated \\(-2x\\) as \\(+2x\\): \\(7 + 2(-3) = 1\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. \\(f(-3) = 7 - 2(-3) = 7 + 6 = 13\\)."
      },
      {
        "text": "\\(-13\\)",
        "correct": false,
        "feedback": "Evaluated \\(2x - 7\\) instead: \\(-6 - 7 = -13\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Added the input to 7 (\\(7 + (-3)\\)) instead of substituting into \\(-2x\\)."
      }
    ],
    "backward": "Substituting a negative into a function.",
    "forward": "Composite and inverse functions."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C5",
    "clusterName": "Interpreting graphs",
    "question": "A hire company's cost (in £) against time (in hours) is a straight line through \\((0, 5)\\) and \\((4, 21)\\). What is the cost of 6 hours?",
    "options": [
      {
        "text": "\\(£24\\)",
        "correct": false,
        "feedback": "Forgot the fixed charge: \\(4 \\times 6 = 24\\)."
      },
      {
        "text": "\\(£30\\)",
        "correct": false,
        "feedback": "Used the fixed charge as the rate: \\(5 \\times 6 = 30\\)."
      },
      {
        "text": "\\(£11\\)",
        "correct": false,
        "feedback": "Added the hours to the fixed charge: \\(5 + 6 = 11\\)."
      },
      {
        "text": "\\(£29\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{21 - 5}{4} = 4\\) per hour, and the fixed charge is 5, so cost \\(= 4 \\times 6 + 5 = 29\\)."
      }
    ],
    "backward": "Gradient as a rate and intercept as a starting amount.",
    "forward": "Linear models and rates."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, 4)\\) and \\((2, 10)\\). The point \\((k, 31)\\) is also on the line. What is \\(k\\)?",
    "options": [
      {
        "text": "\\(27\\)",
        "correct": false,
        "feedback": "Stopped at \\(3k = 27\\) without dividing by 3."
      },
      {
        "text": "\\(\\frac{35}{3}\\)",
        "correct": false,
        "feedback": "Added 4 to 31 instead of subtracting: \\(3k = 35\\)."
      },
      {
        "text": "\\(\\frac{9}{2}\\)",
        "correct": false,
        "feedback": "Used the rise (6) as the gradient: \\(31 = 6k + 4\\) gives \\(k = \\frac{9}{2}\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{10 - 4}{2} = 3\\) and \\(c = 4\\), so \\(y = 3x + 4\\). Then \\(31 = 3k + 4 \\implies k = 9\\)."
      }
    ],
    "backward": "Equation from two points, then substitution.",
    "forward": "Solving problems with linear models."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "y-intercept",
    "question": "A line passes through \\((1, 7)\\) and \\((4, 16)\\). What is its y-intercept?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Added \\(3 \\times 1 = 3\\) to 7 instead of subtracting it."
      },
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{16 - 7}{4 - 1} = 3\\). Then \\(7 = 3(1) + c \\implies c = 4\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Stopped at \\(3 \\times 1 = 3\\) and gave that as the intercept."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "Used the y-coordinate of the first point as the intercept."
      }
    ],
    "backward": "Gradient, then intercept.",
    "forward": "Forming equations from data."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C4",
    "clusterName": "Equation of a line",
    "question": "A line passes through \\((0, 6)\\) and \\((3, 0)\\). What is its equation?",
    "options": [
      {
        "text": "\\(y = -2x + 6\\)",
        "correct": true,
        "feedback": "Correct. Gradient \\(= \\frac{0 - 6}{3 - 0} = -2\\) and the line crosses the y-axis at 6."
      },
      {
        "text": "\\(y = 2x + 6\\)",
        "correct": false,
        "feedback": "Dropped the negative sign: the line falls, so the gradient is negative."
      },
      {
        "text": "\\(y = -3x + 6\\)",
        "correct": false,
        "feedback": "Used the run (3) as the gradient."
      },
      {
        "text": "\\(y = -2x - 6\\)",
        "correct": false,
        "feedback": "Wrote the intercept as \\(-6\\) instead of \\(+6\\)."
      }
    ],
    "backward": "Equation from two points with a falling line.",
    "forward": "Forming equations."
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
    title: "Graphs — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every graphs cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a <strong>timed diagnostic: 25 minutes, 20 questions</strong>. It checks whether you can work with gradients, intercepts, equations and graphs accurately and quickly. It is not graded, so use it to find out where you slip under time pressure.</p><p><strong>Strategy:</strong> answer the quick questions straight away. If one is taking longer than about a minute and a half, skip it and come back. Slow down for questions that look simple: some are built to catch a common slip, such as a missing negative sign, a graph scale that is not 1 per square, or a fixed charge you forget to add. Questions come from all six topics, mixed together.</p>",
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

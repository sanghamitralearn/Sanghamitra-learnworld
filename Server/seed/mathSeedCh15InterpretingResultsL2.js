// Interpreting and Discussing Results — Grade 8, Level 2 (Advanced Core).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh15InterpretingResultsL2.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-15-interpreting-discussing-results";
const CHAPTER_NAME = "Interpreting and Discussing Results";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "C1": "Frequency polygons",
  "C2": "Scatter graphs",
  "C3": "Back-to-back stem-and-leaf diagrams",
  "C4": "Statistics for grouped data",
  "C5": "Representing data",
  "C6": "Mixed data problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the lifetimes of the batteries tested in a laboratory. How many more batteries are in the class \\(50 \\le n &lt; 60\\) than in the class \\(30 \\le n &lt; 40\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the lifetimes of the batteries tested in a laboratory: points plotted at the class midpoints and joined by straight lines, at (35, 4), (45, 6), (55, 8), (65, 7); the horizontal axis shows the lifetime, n, in hours, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"268.6\" x2=\"64\" y2=\"268.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"273.1\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"241.2\" x2=\"64\" y2=\"241.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"245.7\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"213.8\" x2=\"64\" y2=\"213.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"218.3\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"186.4\" x2=\"64\" y2=\"186.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"190.9\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"131.6\" x2=\"64\" y2=\"131.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"136.1\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"104.2\" x2=\"64\" y2=\"104.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"108.7\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"76.8\" x2=\"64\" y2=\"76.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"81.3\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"49.4\" x2=\"64\" y2=\"49.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"53.9\" text-anchor=\"end\" fill=\"#1f2937\">9</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Lifetime, n (hours)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,186.4 240.2,131.6 357.8,76.8 475.2,104.2\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"186.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"131.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"76.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"104.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "12 batteries",
        "correct": false,
        "feedback": "Added the two heights, \\(8 + 4 = 12\\), giving 12 batteries. 'How many more' means subtract the smaller from the larger."
      },
      {
        "text": "4 batteries",
        "correct": true,
        "feedback": "Correct. The heights are 8 for \\(50 \\le n &lt; 60\\) and 4 for \\(30 \\le n &lt; 40\\), so the difference is \\(8 - 4 = 4\\)."
      },
      {
        "text": "8 batteries",
        "correct": false,
        "feedback": "Gave the height of the class \\(50 \\le n &lt; 60\\) alone, 8, giving 8 batteries. The question compares it with the class \\(30 \\le n &lt; 40\\), which has height 4."
      },
      {
        "text": "20 batteries",
        "correct": false,
        "feedback": "Subtracted the midpoints, 20, instead of the heights, giving 20 batteries. The midpoints are positions across the axis. The frequencies are the heights."
      }
    ],
    "retryHint": "Read both heights, then subtract the smaller from the larger.",
    "backward": "Finding a difference by subtracting, from earlier stages.",
    "forward": "Later in this chapter you compare two polygons on the same axes."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the puzzle times of the players in a contest; the frequency of each class is given in brackets: \\(60 \\le p &lt; 70\\) (1); \\(70 \\le p &lt; 80\\) (7); \\(80 \\le p &lt; 90\\) (12); \\(90 \\le p &lt; 100\\) (7); \\(100 \\le p &lt; 110\\) (1). How many players have a time of less than 80?",
    "options": [
      {
        "text": "20 players",
        "correct": false,
        "feedback": "Included the class \\(80 \\le p &lt; 90\\) as well, 12, giving 20 players. That class starts at 80, so its values are not less than 80."
      },
      {
        "text": "1 player",
        "correct": false,
        "feedback": "Left out the class just below 80, 7, giving 1 player. That class lies completely below 80, so it is included."
      },
      {
        "text": "7 players",
        "correct": false,
        "feedback": "Used only the class just below 80, 7, giving 7 players. 'Less than 80' includes every class below it."
      },
      {
        "text": "8 players",
        "correct": true,
        "feedback": "Correct. The classes below 80 have frequencies 1, 7, so \\(1 + 7 = 8\\)."
      }
    ],
    "retryHint": "Add the frequencies of every class that lies completely below the boundary.",
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use running totals like this to find the class containing the median."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of house price against number of rooms with a line of best fit. Use the line to estimate the house price when number of rooms is 6.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of house price against number of rooms: 7 points at (2, 140), (3, 165), (4, 214), (5, 320), (6, 374), (7, 412), (8, 494); the horizontal axis shows number of rooms and the vertical axis shows house price (thousand pounds), with a straight line of best fit drawn through (3, 180) and (5, 303).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"306.2\" x2=\"534\" y2=\"306.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"247.4\" x2=\"534\" y2=\"247.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"208.2\" x2=\"534\" y2=\"208.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"188.6\" x2=\"534\" y2=\"188.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"149.4\" x2=\"534\" y2=\"149.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"90.6\" x2=\"534\" y2=\"90.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"31.8\" x2=\"534\" y2=\"31.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"267.0\" x2=\"534\" y2=\"267.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"71.0\" x2=\"534\" y2=\"71.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"121.6\" y1=\"22\" x2=\"121.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"173.1\" y1=\"22\" x2=\"173.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"276.2\" y1=\"22\" x2=\"276.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"327.8\" y1=\"22\" x2=\"327.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"430.9\" y1=\"22\" x2=\"430.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"482.4\" y1=\"22\" x2=\"482.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"267.0\" x2=\"70\" y2=\"267.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"271.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"71.0\" x2=\"70\" y2=\"71.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"75.5\" text-anchor=\"end\" fill=\"#1f2937\">500</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">600</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"121.6\" y1=\"316\" x2=\"121.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"121.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">1</text><line x1=\"173.1\" y1=\"316\" x2=\"173.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"173.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">3</text><line x1=\"276.2\" y1=\"316\" x2=\"276.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"276.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"327.8\" y1=\"316\" x2=\"327.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"327.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"430.9\" y1=\"316\" x2=\"430.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"430.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">7</text><line x1=\"482.4\" y1=\"316\" x2=\"482.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"482.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">9</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of rooms</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">House price (thousand pounds)</text><line x1=\"173.1\" y1=\"257.9\" x2=\"482.4\" y2=\"77.1\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"224.7\" cy=\"227.8\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"327.8\" cy=\"167.5\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"173.1\" cy=\"247.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"235.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"276.2\" cy=\"211.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"327.8\" cy=\"159.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"132.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"114.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"482.4\" cy=\"73.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "241.5 thousand pounds",
        "correct": false,
        "feedback": "Used halfway between the two marked heights, \\((180 + 303) \\div 2\\), giving 241.5 thousand pounds. Read the line at 6 across, not at the middle of the marked points."
      },
      {
        "text": "374 thousand pounds",
        "correct": false,
        "feedback": "Read the nearest plotted point, (6, 374), instead of the line, giving 374 thousand pounds. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "369 thousand pounds",
        "correct": false,
        "feedback": "Multiplied the gradient, 61.5, by 6 as if the line started at the origin, giving 369 thousand pounds. The line does not pass through (0, 0), so first find where it is at your value on the horizontal axis."
      },
      {
        "text": "364.5 thousand pounds",
        "correct": true,
        "feedback": "Correct. The line rises 123 for every 2 across, a gradient of 61.5. From (3, 180) to 6 across is 3 further, so the line is at \\(180 + 61.5 \\times 3 = 364.5\\)."
      }
    ],
    "retryHint": "Go to the value on the horizontal axis, go up to the line (not to a plotted point), then read across.",
    "backward": "Gradient and intercept, Ch10.",
    "forward": "Later in this chapter you decide when such an estimate can be trusted."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The distances thrown in a data set run from 33 to 54. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(30 \\le d \\le 35\\), \\(35 \\le d \\le 40\\), \\(40 \\le d \\le 45\\), \\(45 \\le d \\le 50\\), \\(50 \\le d \\le 55\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 35 would fit in two classes, giving \\(30 \\le d \\le 35\\), \\(35 \\le d \\le 40\\), \\(40 \\le d \\le 45\\), \\(45 \\le d \\le 50\\), \\(50 \\le d \\le 55\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(30 \\le d &lt; 35\\), \\(35 \\le d &lt; 40\\), \\(40 \\le d &lt; 45\\), \\(45 \\le d &lt; 50\\), \\(50 \\le d &lt; 55\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 5, the classes start at 30, which is at or below the smallest value, 33, and the last class reaches above the largest, 54. Each end value belongs to exactly one class because the upper end is left out."
      },
      {
        "text": "\\(35 \\le d &lt; 40\\), \\(40 \\le d &lt; 45\\), \\(45 \\le d &lt; 50\\), \\(50 \\le d &lt; 55\\), \\(55 \\le d &lt; 60\\)",
        "correct": false,
        "feedback": "Chose classes that start at 35, so the smallest value, 33, belongs to no class, giving \\(35 \\le d &lt; 40\\), \\(40 \\le d &lt; 45\\), \\(45 \\le d &lt; 50\\), \\(50 \\le d &lt; 55\\), \\(55 \\le d &lt; 60\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(30 \\le d &lt; 35\\), \\(35 \\le d &lt; 40\\), \\(40 \\le d &lt; 45\\), \\(45 \\le d &lt; 55\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(30 \\le d &lt; 35\\), \\(35 \\le d &lt; 40\\), \\(40 \\le d &lt; 45\\), \\(45 \\le d &lt; 55\\). Classes should all have the same width, so the frequencies can be compared fairly."
      }
    ],
    "retryHint": "Check three things: equal widths, no gaps or overlaps, and every value from smallest to largest is covered.",
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the lengths of leaves of two groups, E and F. What is the median of group E?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the lengths of leaves: group E on the left and group F on the right, rows (left leaves, then right leaves) 4: 6 2 | 6 7 9; 5: 9 | -; 6: 8 1 | 4; 7: 6 3 3 | 3 3; 8: 9 0 | 1 2 5; the key reads 5 | 9 means 59 mm.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group E</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group F</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"302.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"178.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group E: 9 | 5 means 59 mm</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group F: 5 | 9 means 59 mm</text></svg></div>",
    "options": [
      {
        "text": "70.5 mm",
        "correct": true,
        "feedback": "Correct. Counting the leaves in order: there are 10 values, so the median is halfway between the 5th and 6th: \\((68 + 73) \\div 2 = 70.5\\)."
      },
      {
        "text": "65.5 mm",
        "correct": false,
        "feedback": "Found the value halfway between the lowest and highest, \\((42 + 89) \\div 2\\), giving 65.5 mm. The median is the middle value in order, not the middle of the range."
      },
      {
        "text": "66.7 mm",
        "correct": false,
        "feedback": "Found the mean instead, 66.7, giving 66.7 mm. The median is the middle value, not the mean."
      },
      {
        "text": "68 mm",
        "correct": false,
        "feedback": "Took only the lower of the two middle values, 68, giving 68 mm. With an even number of values the median is halfway between the two middle ones."
      }
    ],
    "retryHint": "Count how many values there are, find the middle position, then count along the leaves in order from the smallest.",
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you compare the medians of two groups."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the 100 m times of the runners in a school race. What fraction of the runners are in the class \\(22 \\le s &lt; 24\\)? Give the fraction in its simplest form.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the 100 m times of the runners in a school race: points plotted at the class midpoints and joined by straight lines, at (15, 1), (17, 2), (19, 4), (21, 7), (23, 4), (25, 2); the horizontal axis shows the time, s, in seconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"142.3\" y1=\"22\" x2=\"142.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"220.7\" y1=\"22\" x2=\"220.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"377.3\" y1=\"22\" x2=\"377.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"455.7\" y1=\"22\" x2=\"455.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"142.3\" y1=\"296\" x2=\"142.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"142.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><line x1=\"220.7\" y1=\"296\" x2=\"220.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"220.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">18</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"377.3\" y1=\"296\" x2=\"377.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"377.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">22</text><line x1=\"455.7\" y1=\"296\" x2=\"455.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"455.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">24</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">26</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, s (seconds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"103.2,261.8 181.5,227.5 259.8,159.0 338.2,56.2 416.5,159.0 494.8,227.5\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"103.2\" cy=\"261.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.5\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"259.8\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"338.2\" cy=\"56.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"416.5\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"494.8\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Put the frequency over the number of classes, \\(\\frac{4}{6}\\), giving \\(\\frac{2}{3}\\). The bottom of the fraction is the total number of runners, not the number of classes."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Found the fraction outside the class instead, \\(\\frac{20 - 4}{20}\\), giving \\(\\frac{4}{5}\\). The question asks for the fraction inside the class, so use its own frequency on top."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": true,
        "feedback": "Correct. The class has 4 of the \\(1 + 2 + 4 + 7 + 4 + 2 = 20\\) runners, so the fraction is \\(\\frac{4}{20} = \\frac{1}{5}\\)."
      },
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Compared the class with the tallest class instead of with the total, giving \\(\\frac{4}{7}\\). A fraction of all the runners has the total, 20, on the bottom."
      }
    ],
    "retryHint": "Read the height of the class and the total of all heights, then write one over the other and simplify.",
    "backward": "Fractions, Ch8.",
    "forward": "Later in this chapter you find the same fraction from grouped data in a table."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the weekly screen times of the teenagers in a survey; the frequency of each class is given in brackets: \\(10 \\le y &lt; 20\\) (2); \\(20 \\le y &lt; 30\\) (7); \\(30 \\le y &lt; 40\\) (8); \\(40 \\le y &lt; 50\\) (12); \\(50 \\le y &lt; 60\\) (11). Which class is the modal class?",
    "options": [
      {
        "text": "\\(50 \\le y &lt; 60\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(50 \\le y &lt; 60\\). The modal class has the highest frequency."
      },
      {
        "text": "\\(10 \\le y &lt; 20\\)",
        "correct": false,
        "feedback": "Chose the first class, giving \\(10 \\le y &lt; 20\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(40 \\le y &lt; 50\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 12, which belongs to the class \\(40 \\le y &lt; 50\\), so that is the modal class."
      },
      {
        "text": "\\(20 \\le y &lt; 30\\)",
        "correct": false,
        "feedback": "Chose the class \\(20 \\le y &lt; 30\\), which has frequency 7, giving \\(20 \\le y &lt; 30\\). The modal class has the highest frequency, 12."
      }
    ],
    "retryHint": "The modal class has the highest frequency. Find the biggest number in the frequency column.",
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A teacher has the exact times for the 100 metres of 11 students in class A and 12 students in class B and wants to compare the two classes while keeping every time visible. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A back-to-back stem-and-leaf diagram of the times of the two classes",
        "correct": true,
        "feedback": "Correct. Here you need to compare two groups while keeping every value visible, and a back-to-back stem-and-leaf diagram compares two sets of values side by side and keeps every individual value."
      },
      {
        "text": "A scatter graph of the times of the two classes",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the times of the two classes\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare two groups while keeping every value visible."
      },
      {
        "text": "A frequency polygon of the times of the two classes",
        "correct": false,
        "feedback": "Chose \"A frequency polygon of the times of the two classes\". A frequency polygon shows how grouped data are spread across equal classes, but here you need to compare two groups while keeping every value visible."
      },
      {
        "text": "A bar chart of the times of the two classes",
        "correct": false,
        "feedback": "Chose \"A bar chart of the times of the two classes\". A bar chart compares the frequencies of separate categories, but here you need to compare two groups while keeping every value visible."
      }
    ],
    "retryHint": "Decide what the diagram must show, then match it to the diagram that does that.",
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the test marks of a Year 9 class. How many students have a mark of less than 20?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the test marks of a Year 9 class: points plotted at the class midpoints and joined by straight lines, at (5, 9), (15, 15), (25, 11), (35, 3); the horizontal axis shows the mark, m, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"278.9\" x2=\"534\" y2=\"278.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"244.6\" x2=\"534\" y2=\"244.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"210.4\" x2=\"534\" y2=\"210.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"176.1\" x2=\"534\" y2=\"176.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"141.9\" x2=\"534\" y2=\"141.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"107.6\" x2=\"534\" y2=\"107.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"73.4\" x2=\"534\" y2=\"73.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"39.1\" x2=\"534\" y2=\"39.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Mark, m</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,141.9 240.2,39.1 357.8,107.6 475.2,244.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"141.9\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"39.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"107.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"244.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "24 students",
        "correct": true,
        "feedback": "Correct. The classes below 20 have heights 9, 15, so \\(9 + 15 = 24\\)."
      },
      {
        "text": "15 students",
        "correct": false,
        "feedback": "Used only the class just below 20, 15, giving 15 students. Less than 20 includes every class below it, not just the nearest."
      },
      {
        "text": "35 students",
        "correct": false,
        "feedback": "Included the class \\(20 \\le m &lt; 30\\) as well, 11, giving 35 students. That class starts at 20, so its values are not less than 20."
      },
      {
        "text": "38 students",
        "correct": false,
        "feedback": "Gave the total of every class, 38, giving 38 students. Only the classes below 20 count."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you use running totals to find the class that contains the median."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the lengths of the calls to a help line in one hour; the frequency of each class is given in brackets: \\(5 \\le l &lt; 10\\) (6); \\(10 \\le l &lt; 15\\) (9); \\(15 \\le l &lt; 20\\) (7); \\(20 \\le l &lt; 25\\) (2); \\(25 \\le l &lt; 30\\) (1). Estimate the mean length.",
    "options": [
      {
        "text": "14.1 minutes",
        "correct": true,
        "feedback": "Correct. The midpoints are 7.5, 12.5, 17.5, 22.5, 27.5. The total of midpoint×frequency is \\(45 + 112.5 + 122.5 + 45 + 27.5 = 352.5\\), and the number of calls is \\(6 + 9 + 7 + 2 + 1 = 25\\), so the estimated mean is \\(352.5 \\div 25 = 14.1\\)."
      },
      {
        "text": "352.5 minutes",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(45 + 112.5 + 122.5 + 45 + 27.5 = 352.5\\), and did not divide, giving 352.5 minutes. A mean needs dividing by the number of calls, 25."
      },
      {
        "text": "70.5 minutes",
        "correct": false,
        "feedback": "Divided 352.5 by the number of classes, 5, giving 70.5 minutes. Divide by the total frequency, 25, which is the number of calls."
      },
      {
        "text": "17.5 minutes",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((7.5 + 12.5 + 17.5 + 22.5 + 27.5) \\div 5\\), giving 17.5 minutes. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of goals scored against hours of practice with a line of best fit. Use the line to estimate the number of goals scored when hours of practice is 9.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of goals scored against hours of practice: 10 points at (1, 3), (2, 4), (3, 5), (4, 7), (5, 9), (6, 9), (7, 13), (8, 14), (9, 15), (10, 19); the horizontal axis shows hours of practice and the vertical axis shows number of goals scored, with a straight line of best fit drawn through (3, 5) and (6, 11).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"108.7\" y1=\"22\" x2=\"108.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"263.3\" y1=\"22\" x2=\"263.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"340.7\" y1=\"22\" x2=\"340.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"495.3\" y1=\"22\" x2=\"495.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">15</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Hours of practice</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of goals scored</text><line x1=\"108.7\" y1=\"301.3\" x2=\"456.7\" y2=\"36.7\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"186.0\" cy=\"242.5\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"302.0\" cy=\"154.3\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"108.7\" cy=\"271.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"147.3\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"242.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"213.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"263.3\" cy=\"183.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"183.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"340.7\" cy=\"124.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"110.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"456.7\" cy=\"36.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "8",
        "correct": false,
        "feedback": "Used halfway between the two marked heights, \\((5 + 11) \\div 2\\), giving 8. Read the line at 9 across, not at the middle of the marked points."
      },
      {
        "text": "15",
        "correct": false,
        "feedback": "Read the nearest plotted point, (9, 15), instead of the line. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "17",
        "correct": true,
        "feedback": "Correct. The line rises 6 for every 3 across, a gradient of 2. From (3, 5) to 9 across is 6 further, so the line is at \\(5 + 2 \\times 6 = 17\\)."
      },
      {
        "text": "18",
        "correct": false,
        "feedback": "Multiplied the gradient, 2, by 9 as if the line started at the origin, giving 18. The line does not pass through (0, 0), so first find where it is at your value on the horizontal axis."
      }
    ],
    "backward": "Straight-line functions, Ch9, and gradient, Ch10.",
    "forward": "Later in this chapter you decide when such an estimate can be trusted."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A bar chart shows the sales of two shops: 56 and 60. Its vertical axis starts at 54 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "6 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 54, 6, as the number of times, giving 6 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "4 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(60 - 56 = 4\\), giving 4 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "2 times as tall",
        "correct": false,
        "feedback": "Gave the height of the first bar, 2, giving 2 times as tall. Divide the second height by the first height."
      },
      {
        "text": "3 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 54, the bars are drawn with heights \\(60 - 54 = 6\\) and \\(56 - 54 = 2\\). So the second bar looks \\(6 \\div 2 = 3\\) times as tall, although the real values are close."
      }
    ],
    "backward": "Reading scales on graphs, Ch10, and ratio, Ch11.",
    "forward": "Later in this chapter you meet other features that make a graph misleading."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the times to complete a puzzle of two groups, C and D. What is the median of group D?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the times to complete a puzzle: group C on the left and group D on the right, rows (left leaves, then right leaves) 1: 9 | -; 2: 8 6 4 1 | 8; 3: 6 4 0 0 | 1 2 3 7 8 9; 4: - | 2 2; 5: 2 0 | 0 2; 6: 0 | 2 4; the key reads 2 | 1 means 21 seconds.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"166.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group C</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group D</text><text x=\"225.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"203.0\" y1=\"42\" x2=\"203.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"247.0\" y1=\"42\" x2=\"247.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"225.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"225.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"178.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"163.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"148.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"257.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"225.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"178.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"163.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"148.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"257.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"302.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"317.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"332.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"225.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"257.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"225.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"178.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"257.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"225.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"193.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"257.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"272.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group C: 1 | 2 means 21 seconds</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group D: 2 | 1 means 21 seconds</text></svg></div>",
    "options": [
      {
        "text": "42 seconds",
        "correct": false,
        "feedback": "Took the 8th value instead of the 7th, giving 42 seconds. Count from both ends to check which value is exactly in the middle."
      },
      {
        "text": "46 seconds",
        "correct": false,
        "feedback": "Found the value halfway between the lowest and highest, \\((28 + 64) \\div 2\\), giving 46 seconds. The median is the middle value in order, not the middle of the range."
      },
      {
        "text": "38 seconds",
        "correct": false,
        "feedback": "Took the 6th value instead of the 7th value, giving 38 seconds. With 13 values the median is the 7th value, the one with equal numbers on each side."
      },
      {
        "text": "39 seconds",
        "correct": true,
        "feedback": "Correct. Counting the leaves in order: there are 13 values, so the median is the 7th value, and in order that is 39."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you compare the medians of two groups."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the puzzle times of the players in a contest; the frequency of each class is given in brackets: \\(40 \\le p &lt; 60\\) (3); \\(60 \\le p &lt; 80\\) (9); \\(80 \\le p &lt; 100\\) (13); \\(100 \\le p &lt; 120\\) (11); \\(120 \\le p &lt; 140\\) (4). What percentage of the players are in the class \\(120 \\le p &lt; 140\\)?",
    "options": [
      {
        "text": "0.1%",
        "correct": false,
        "feedback": "Divided 4 by 40 and did not multiply by 100, giving 0.1%. A percentage is out of 100, so multiply the fraction by 100."
      },
      {
        "text": "4%",
        "correct": false,
        "feedback": "Gave the frequency, 4, as the percentage, giving 4%. A percentage is out of 100. Divide by the total, 40, then multiply by 100."
      },
      {
        "text": "10%",
        "correct": true,
        "feedback": "Correct. The class has 4 of the \\(3 + 9 + 13 + 11 + 4 = 40\\) players, so the percentage is \\(4 \\div 40 \\times 100 = 10\\%\\)."
      },
      {
        "text": "5%",
        "correct": false,
        "feedback": "Halved the percentage, \\(10 \\div 2 = 5\\), giving 5%. The class has 4 of 40, which is 10%."
      }
    ],
    "backward": "Percentages, Ch3, and fractions of a total, Ch8.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the masses of the eggs from a farm in one day. Which class contains the median?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the masses of the eggs from a farm in one day: points plotted at the class midpoints and joined by straight lines, at (52.5, 2), (57.5, 5), (62.5, 7), (67.5, 8), (72.5, 13); the horizontal axis shows the mass, g, in grams, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"276.4\" x2=\"534\" y2=\"276.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"237.3\" x2=\"534\" y2=\"237.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"198.1\" x2=\"534\" y2=\"198.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"119.9\" x2=\"534\" y2=\"119.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"80.7\" x2=\"534\" y2=\"80.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"256.9\" x2=\"64\" y2=\"256.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"261.4\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"217.7\" x2=\"64\" y2=\"217.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"222.2\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"178.6\" x2=\"64\" y2=\"178.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"183.1\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"139.4\" x2=\"64\" y2=\"139.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"143.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"100.3\" x2=\"64\" y2=\"100.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"104.8\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"61.1\" x2=\"64\" y2=\"61.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"65.6\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">55</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">65</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">75</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Mass, g (grams)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,256.9 205.0,198.1 299.0,159.0 393.0,139.4 487.0,41.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"256.9\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"198.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"139.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"41.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(65 \\le g &lt; 70\\)",
        "correct": true,
        "feedback": "Correct. There are \\(2 + 5 + 7 + 8 + 13 = 35\\) values, so the middle value is the 18th value. The running totals are 2, 7, 14, 22, so the 18th value falls in the class \\(65 \\le g &lt; 70\\)."
      },
      {
        "text": "\\(60 \\le g &lt; 65\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(60 \\le g &lt; 65\\). Keep adding until the running total reaches the middle position among all the values."
      },
      {
        "text": "\\(50 \\le g &lt; 55\\)",
        "correct": false,
        "feedback": "Chose the class \\(50 \\le g &lt; 55\\), where the running total is only 2, giving \\(50 \\le g &lt; 55\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(55 \\le g &lt; 60\\)",
        "correct": false,
        "feedback": "Chose the class \\(55 \\le g &lt; 60\\), where the running total is only 7, giving \\(55 \\le g &lt; 60\\). The running total must reach the middle position, so keep adding until it does."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the journey times of the commuters on one train; the frequency of each class is given in brackets: \\(10 \\le t &lt; 20\\) (1); \\(20 \\le t &lt; 30\\) (2); \\(30 \\le t &lt; 40\\) (10); \\(40 \\le t &lt; 50\\) (14); \\(50 \\le t &lt; 60\\) (9). Which class is the modal class?",
    "options": [
      {
        "text": "\\(50 \\le t &lt; 60\\)",
        "correct": false,
        "feedback": "Chose the last class, giving \\(50 \\le t &lt; 60\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(40 \\le t &lt; 50\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 14, which belongs to the class \\(40 \\le t &lt; 50\\), so that is the modal class."
      },
      {
        "text": "\\(10 \\le t &lt; 20\\)",
        "correct": false,
        "feedback": "Chose the first class, giving \\(10 \\le t &lt; 20\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(30 \\le t &lt; 40\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(30 \\le t &lt; 40\\). The modal class has the highest frequency."
      }
    ],
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of ice creams sold against outdoor temperature with a line of best fit. Use the line to estimate the outdoor temperature that goes with a number of ice creams sold of 88.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of ice creams sold against outdoor temperature: 12 points at (13, 30), (14, 30), (20, 56), (24, 83), (25, 85), (26, 94), (27, 101), (28, 99), (29, 102), (30, 124), (31, 112), (32, 124); the horizontal axis shows outdoor temperature (°C) and the vertical axis shows number of ice creams sold, with a straight line of best fit drawn through (21, 67) and (27, 97).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"305.5\" x2=\"534\" y2=\"305.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"295.0\" x2=\"534\" y2=\"295.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"284.5\" x2=\"534\" y2=\"284.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"263.5\" x2=\"534\" y2=\"263.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"253.0\" x2=\"534\" y2=\"253.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.5\" x2=\"534\" y2=\"221.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"211.0\" x2=\"534\" y2=\"211.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"200.5\" x2=\"534\" y2=\"200.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"179.5\" x2=\"534\" y2=\"179.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"158.5\" x2=\"534\" y2=\"158.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"137.5\" x2=\"534\" y2=\"137.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.0\" x2=\"534\" y2=\"127.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.5\" x2=\"534\" y2=\"116.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"85.0\" x2=\"534\" y2=\"85.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"74.5\" x2=\"534\" y2=\"74.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"53.5\" x2=\"534\" y2=\"53.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"43.0\" x2=\"534\" y2=\"43.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"32.5\" x2=\"534\" y2=\"32.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"274.0\" x2=\"534\" y2=\"274.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"232.0\" x2=\"534\" y2=\"232.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"190.0\" x2=\"534\" y2=\"190.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"148.0\" x2=\"534\" y2=\"148.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.0\" x2=\"534\" y2=\"106.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"64.0\" x2=\"534\" y2=\"64.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"274.0\" x2=\"70\" y2=\"274.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"278.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"232.0\" x2=\"70\" y2=\"232.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"236.5\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"190.0\" x2=\"70\" y2=\"190.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"194.5\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"148.0\" x2=\"70\" y2=\"148.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"152.5\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"106.0\" x2=\"70\" y2=\"106.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"110.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"64.0\" x2=\"70\" y2=\"64.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"68.5\" text-anchor=\"end\" fill=\"#1f2937\">120</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Outdoor temperature (°C)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of ice creams sold</text><polyline points=\"81,322 85,310 89,322 93,310\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"125.7\" y1=\"259.3\" x2=\"478.3\" y2=\"59.8\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"274.2\" cy=\"175.3\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"385.5\" cy=\"112.3\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"125.7\" cy=\"253.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"144.2\" cy=\"253.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"198.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"329.8\" cy=\"141.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"348.4\" cy=\"137.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"367.0\" cy=\"118.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"385.5\" cy=\"103.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"404.1\" cy=\"108.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"422.6\" cy=\"101.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"441.2\" cy=\"55.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"459.8\" cy=\"80.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"478.3\" cy=\"55.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "24 °C",
        "correct": false,
        "feedback": "Used halfway between the two marked values across, \\((21 + 27) \\div 2\\), giving 24 °C. Read across from 88 up to the line, then down to the horizontal axis."
      },
      {
        "text": "25 °C",
        "correct": false,
        "feedback": "Read the outdoor temperature of the plotted point nearest to 88 up, (25, 85), giving 25 °C. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "17.6 °C",
        "correct": false,
        "feedback": "Divided 88 by the gradient 5 as if the line started at the origin, \\(88 \\div 5 = 17.6\\), giving 17.6 °C. The line does not pass through (0, 0), so allow for where it starts."
      },
      {
        "text": "25.2 °C",
        "correct": true,
        "feedback": "Correct. The line has gradient 5. It is at 67 when outdoor temperature is 21, so to reach 88 it needs \\(21 \\div 5 = 4.2\\) more across, and \\(21 + 4.2 = 25.2\\)."
      }
    ],
    "backward": "Gradient and intercept, Ch10, and solving equations, Ch4.",
    "forward": "Later in this chapter you judge whether such an estimate is reliable."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "Journey times in the morning and in the evening have been grouped into the same equal classes. A planner wants to compare the two distributions using one set of axes. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A pie chart of the journey times in the morning and the evening",
        "correct": false,
        "feedback": "Chose \"A pie chart of the journey times in the morning and the evening\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A scatter graph of the journey times in the morning and the evening",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the journey times in the morning and the evening\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A pair of frequency polygons of the journey times in the morning and the evening",
        "correct": true,
        "feedback": "Correct. Here you need to compare the shape of two grouped data sets on the same axes, and a pair of frequency polygons lets two grouped data sets be compared on the same scale."
      },
      {
        "text": "A bar chart of the journey times in the morning and the evening",
        "correct": false,
        "feedback": "Chose \"A bar chart of the journey times in the morning and the evening\". A bar chart compares the frequencies of separate categories, but here you need to compare the shape of two grouped data sets on the same axes."
      }
    ],
    "backward": "Reading and choosing graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram compares the masses of apples of two groups, R and S. Which statement is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of apples: group R on the left and group S on the right, rows (left leaves, then right leaves) 10: 9 3 | 9 9; 11: 7 1 | 4; 12: 8 7 | 0 1 6; 13: 7 6 2 2 | 1 2 4 5; 14: 8 4 | 0 4; 15: - | 0; the key reads 11 | 1 means 111 grams.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group R</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group S</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">11</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"302.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">13</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"178.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"163.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"317.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">14</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">15</text><text x=\"272.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group R: 1 | 11 means 111 grams</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group S: 11 | 1 means 111 grams</text></svg></div>",
    "options": [
      {
        "text": "Group S has both the higher median and the larger range",
        "correct": false,
        "feedback": "Took the ranges the wrong way round: 45 for R and 41 for S, giving Group S has both the higher median and the larger range. The larger range belongs to the group whose highest and lowest values are further apart."
      },
      {
        "text": "Group S has the higher median, but group R has the larger range",
        "correct": true,
        "feedback": "Correct. Group R has median 130 and range 45. Group S has median 131 and range 41. So group S has the higher median and group R has the larger range."
      },
      {
        "text": "Group R has the higher median, but group S has the larger range",
        "correct": false,
        "feedback": "Reversed both comparisons, giving Group R has the higher median, but group S has the larger range. Work out the median and the range of each group separately, then compare each pair."
      },
      {
        "text": "Group R has both the higher median and the larger range",
        "correct": false,
        "feedback": "Took the medians the wrong way round: 130 for R and 131 for S, giving Group R has both the higher median and the larger range. Find each median by counting to the middle of each group, and compare them carefully."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you decide what such a comparison does and does not show."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The tables give the heights of two groups, J and K. Group J: \\(50 \\le h &lt; 60\\) (1); \\(60 \\le h &lt; 70\\) (3); \\(70 \\le h &lt; 80\\) (13); \\(80 \\le h &lt; 90\\) (21); \\(90 \\le h &lt; 100\\) (12). Group K: \\(50 \\le h &lt; 60\\) (5); \\(60 \\le h &lt; 70\\) (10); \\(70 \\le h &lt; 80\\) (7); \\(80 \\le h &lt; 90\\) (2); \\(90 \\le h &lt; 100\\) (1). Which statement is correct?",
    "options": [
      {
        "text": "Group J has the higher estimated mean, by 2435 cm",
        "correct": false,
        "feedback": "Compared the totals of midpoint×frequency, which differ by 2435, giving Group J has the higher estimated mean, by 2435 cm. Each total must be divided by the number of values in its group before the groups are compared."
      },
      {
        "text": "Group J has the higher estimated mean, by 14.4 cm",
        "correct": true,
        "feedback": "Correct. Group J has \\(4150 \\div 50 = 83\\) and group K has \\(1715 \\div 25 = 68.6\\), so group J has the higher estimated mean, by 14.4 cm."
      },
      {
        "text": "Group K has the higher estimated mean, by 14.4 cm",
        "correct": false,
        "feedback": "Took the means the wrong way round: 83 for J and 68.6 for K, giving Group K has the higher estimated mean, by 14.4 cm. Estimate each mean by midpoint×frequency, add, then divide, and compare carefully."
      },
      {
        "text": "Group J has the higher estimated mean, by 20 cm",
        "correct": false,
        "feedback": "Compared the midpoints of the two modal classes, which differ by 20, giving Group J has the higher estimated mean, by 20 cm. The mean uses every class, not only the modal class."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you decide how far a comparison of averages can be trusted."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the 100 m times of the runners in a school race. Estimate the mean time.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the 100 m times of the runners in a school race: points plotted at the class midpoints and joined by straight lines, at (15, 1), (17, 4), (19, 10), (21, 5); the horizontal axis shows the time, s, in seconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.2\" x2=\"64\" y2=\"273.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"277.7\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"250.3\" x2=\"64\" y2=\"250.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"254.8\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"181.8\" x2=\"64\" y2=\"181.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"186.3\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"136.2\" x2=\"64\" y2=\"136.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"140.7\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">9</text><line x1=\"59\" y1=\"67.7\" x2=\"64\" y2=\"67.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"72.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"44.8\" x2=\"64\" y2=\"44.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"49.3\" text-anchor=\"end\" fill=\"#1f2937\">11</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">18</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">22</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, s (seconds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,273.2 240.2,204.7 357.8,67.7 475.2,181.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"273.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"204.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"67.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"181.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "18 seconds",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((15 + 17 + 19 + 21) \\div 4\\), giving 18 seconds. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      },
      {
        "text": "378 seconds",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(15 + 68 + 190 + 105 = 378\\), and did not divide, giving 378 seconds. A mean needs dividing by the number of runners, 20."
      },
      {
        "text": "94.5 seconds",
        "correct": false,
        "feedback": "Divided 378 by the number of classes, 4, giving 94.5 seconds. Divide by the total frequency, 20, which is the number of runners."
      },
      {
        "text": "18.9 seconds",
        "correct": true,
        "feedback": "Correct. The midpoints are 15, 17, 19, 21. The total of midpoint×frequency is \\(15 + 68 + 190 + 105 = 378\\), and the number of runners is \\(1 + 4 + 10 + 5 = 20\\), so the estimated mean is \\(378 \\div 20 = 18.9\\)."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the amounts spent by the customers in a shop one afternoon; the frequency of each class is given in brackets: \\(0 \\le c &lt; 10\\) (12); \\(10 \\le c &lt; 20\\) (15); \\(20 \\le c &lt; 30\\) (9); \\(30 \\le c &lt; 40\\) (3); \\(40 \\le c &lt; 50\\) (1). Estimate the mean amount.",
    "options": [
      {
        "text": "660 pounds",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(60 + 225 + 225 + 105 + 45 = 660\\), and did not divide, giving 660 pounds. A mean needs dividing by the number of customers, 40."
      },
      {
        "text": "16.5 pounds",
        "correct": true,
        "feedback": "Correct. The midpoints are 5, 15, 25, 35, 45. The total of midpoint×frequency is \\(60 + 225 + 225 + 105 + 45 = 660\\), and the number of customers is \\(12 + 15 + 9 + 3 + 1 = 40\\), so the estimated mean is \\(660 \\div 40 = 16.5\\)."
      },
      {
        "text": "8 pounds",
        "correct": false,
        "feedback": "Found the mean of the frequencies, \\(40 \\div 5\\), giving 8 pounds. The mean is of the values (marks, times, heights), not of the frequencies. Use the midpoints."
      },
      {
        "text": "11.5 pounds",
        "correct": false,
        "feedback": "Used the lower end of each class instead of its midpoint: \\(0 + 150 + 180 + 90 + 40 = 460\\), then \\(\\div 40\\), giving 11.5 pounds. Use the midpoint of each class, because the values are spread across the class."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of test mark against number of absences with a line of best fit that has been extended. Which estimate from the line is the least reliable?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of test mark against number of absences: 12 points at (0, 89), (1, 89), (2, 80), (3, 77), (4, 77), (5, 71), (7, 59), (8, 59), (9, 51), (10, 49), (11, 47), (12, 41); the horizontal axis shows number of absences and the vertical axis shows test mark, with a straight line of best fit drawn through (3, 78) and (7, 62), extended from 6 to 15 on the horizontal axis.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"308.6\" x2=\"534\" y2=\"308.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"293.9\" x2=\"534\" y2=\"293.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"264.6\" x2=\"534\" y2=\"264.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"249.8\" x2=\"534\" y2=\"249.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"220.4\" x2=\"534\" y2=\"220.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.1\" x2=\"534\" y2=\"191.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"176.3\" x2=\"534\" y2=\"176.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"161.7\" x2=\"534\" y2=\"161.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"147.0\" x2=\"534\" y2=\"147.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"117.5\" x2=\"534\" y2=\"117.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"102.8\" x2=\"534\" y2=\"102.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"88.2\" x2=\"534\" y2=\"88.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"73.5\" x2=\"534\" y2=\"73.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"44.1\" x2=\"534\" y2=\"44.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"29.4\" x2=\"534\" y2=\"29.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"99.0\" y1=\"22\" x2=\"99.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"157.0\" y1=\"22\" x2=\"157.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"215.0\" y1=\"22\" x2=\"215.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"273.0\" y1=\"22\" x2=\"273.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"331.0\" y1=\"22\" x2=\"331.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"389.0\" y1=\"22\" x2=\"389.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"447.0\" y1=\"22\" x2=\"447.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"505.0\" y1=\"22\" x2=\"505.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"279.2\" x2=\"534\" y2=\"279.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"205.8\" x2=\"534\" y2=\"205.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"132.2\" x2=\"534\" y2=\"132.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"58.8\" x2=\"534\" y2=\"58.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"279.2\" x2=\"70\" y2=\"279.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"283.8\" text-anchor=\"end\" fill=\"#1f2937\">30</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"205.8\" x2=\"70\" y2=\"205.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"210.2\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"132.2\" x2=\"70\" y2=\"132.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"136.8\" text-anchor=\"end\" fill=\"#1f2937\">70</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"58.8\" x2=\"70\" y2=\"58.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"63.2\" text-anchor=\"end\" fill=\"#1f2937\">90</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of absences</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Test mark</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"70.0\" y1=\"58.8\" x2=\"505.0\" y2=\"279.2\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"157.0\" cy=\"102.8\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"273.0\" cy=\"161.7\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"70.0\" cy=\"62.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"99.0\" cy=\"62.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"128.0\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"157.0\" cy=\"106.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"106.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"215.0\" cy=\"128.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"273.0\" cy=\"172.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"172.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"331.0\" cy=\"202.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"360.0\" cy=\"209.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"389.0\" cy=\"216.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"238.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "number of absences = 15",
        "correct": true,
        "feedback": "Correct. The plotted data only cover number of absences from 0 to 12. 15 is outside that range, so using the line there is extrapolation, and the pattern may not continue."
      },
      {
        "text": "number of absences = 8",
        "correct": false,
        "feedback": "Chose number of absences = 8. 8 is inside the plotted range, 0 to 12, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "number of absences = 10",
        "correct": false,
        "feedback": "Chose number of absences = 10. 10 is inside the plotted range, 0 to 12, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "number of absences = 6",
        "correct": false,
        "feedback": "Chose number of absences = 6. 6 is inside the plotted range, 0 to 12, so this is interpolation, which is fairly reliable."
      }
    ],
    "backward": "Describing graphs, Ch10.",
    "forward": "Later in this chapter you meet more situations where a result needs a warning."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The test marks in a data set run from 1 to 48. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(0 \\le m \\le 10\\), \\(10 \\le m \\le 20\\), \\(20 \\le m \\le 30\\), \\(30 \\le m \\le 40\\), \\(40 \\le m \\le 50\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 10 would fit in two classes, giving \\(0 \\le m \\le 10\\), \\(10 \\le m \\le 20\\), \\(20 \\le m \\le 30\\), \\(30 \\le m \\le 40\\), \\(40 \\le m \\le 50\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(0 \\le m &lt; 10\\), \\(10 \\le m &lt; 20\\), \\(20 \\le m &lt; 30\\), \\(30 \\le m &lt; 40\\), \\(40 \\le m &lt; 50\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 10, the classes start at 0, which is at or below the smallest value, 1, and the last class reaches above the largest, 48. Each end value belongs to exactly one class because the upper end is left out."
      },
      {
        "text": "\\(10 \\le m &lt; 20\\), \\(20 \\le m &lt; 30\\), \\(30 \\le m &lt; 40\\), \\(40 \\le m &lt; 50\\), \\(50 \\le m &lt; 60\\)",
        "correct": false,
        "feedback": "Chose classes that start at 10, so the smallest value, 1, belongs to no class, giving \\(10 \\le m &lt; 20\\), \\(20 \\le m &lt; 30\\), \\(30 \\le m &lt; 40\\), \\(40 \\le m &lt; 50\\), \\(50 \\le m &lt; 60\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(0 \\le m &lt; 10\\), \\(10 \\le m &lt; 20\\), \\(20 \\le m &lt; 30\\), \\(30 \\le m &lt; 50\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(0 \\le m &lt; 10\\), \\(10 \\le m &lt; 20\\), \\(20 \\le m &lt; 30\\), \\(30 \\le m &lt; 50\\). Classes should all have the same width, so the frequencies can be compared fairly."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the delivery times of two groups, A and B. What is the mean of group A?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the delivery times: group A on the left and group B on the right, rows (left leaves, then right leaves) 2: 7 | -; 3: 9 | 5 6 8; 4: 8 2 | 0 1 1; 5: 4 4 | 5; 6: 7 6 2 1 | 0; 7: - | 0 4; the key reads 3 | 9 means 39 minutes.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group A</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group B</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"247.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"279.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group A: 9 | 3 means 39 minutes</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group B: 3 | 9 means 39 minutes</text></svg></div>",
    "options": [
      {
        "text": "52 minutes",
        "correct": true,
        "feedback": "Correct. The 10 values add up to \\(27 + 39 + 42 + 48 + 54 + 54 + 61 + 62 + 66 + 67 = 520\\), so the mean is \\(520 \\div 10 = 52\\)."
      },
      {
        "text": "54 minutes",
        "correct": false,
        "feedback": "Found the median instead, 54, giving 54 minutes. The mean uses every value, added up and shared out."
      },
      {
        "text": "5 minutes",
        "correct": false,
        "feedback": "Averaged the leaves only and ignored the stems, giving 5 minutes. Each value is the stem and the leaf together, so use the full values."
      },
      {
        "text": "520 minutes",
        "correct": false,
        "feedback": "Added the values, \\(27 + 39 + 42 + 48 + 54 + 54 + 61 + 62 + 66 + 67 = 520\\), and did not divide, giving 520 minutes. A mean needs dividing by the number of values, 10."
      }
    ],
    "backward": "The mean, from earlier stages, and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare the means of two groups."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The mean time of 30 students in group A is 41 minutes. The mean time of 20 students in group B is 57 minutes. What is the mean time of all 50 students together?",
    "options": [
      {
        "text": "1185 minutes",
        "correct": false,
        "feedback": "Divided the total, 2370, by 2, the number of groups, giving 1185 minutes. Divide by the number of values, 50, not the number of groups."
      },
      {
        "text": "49 minutes",
        "correct": false,
        "feedback": "Found the mean of the two means, \\((41 + 57) \\div 2\\), giving 49 minutes. The groups have different sizes, so the larger group counts for more. Use the total of all the values."
      },
      {
        "text": "2370 minutes",
        "correct": false,
        "feedback": "Found the total of all the values, \\(30 \\times 41 + 20 \\times 57 = 2370\\), and did not divide, giving 2370 minutes. Divide by the total number of values, 50."
      },
      {
        "text": "47.4 minutes",
        "correct": true,
        "feedback": "Correct. Group A has total \\(30 \\times 41 = 1230\\). Group B has total \\(20 \\times 57 = 1140\\). All 50 students have total \\(1230 + 1140 = 2370\\), so the mean is \\(2370 \\div 50 = 47.4\\) minutes."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you use means to compare groups."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows two frequency polygons on the same axes, group P and group Q, for the lengths. Which statement about the modal classes is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the lengths, group P (solid line) at (90, 12), (110, 16), (130, 12), (150, 3) and group Q (dashed line) at (90, 3), (110, 11), (130, 17), (150, 12); the horizontal axis shows the length, f, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"281.2\" x2=\"534\" y2=\"281.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"251.7\" x2=\"534\" y2=\"251.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"222.1\" x2=\"534\" y2=\"222.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"192.6\" x2=\"534\" y2=\"192.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"133.4\" x2=\"534\" y2=\"133.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"103.9\" x2=\"534\" y2=\"103.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"30\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"30\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"30\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"266.4\" x2=\"64\" y2=\"266.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"270.9\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"236.9\" x2=\"64\" y2=\"236.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"241.4\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"207.3\" x2=\"64\" y2=\"207.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"211.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"177.8\" x2=\"64\" y2=\"177.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"182.3\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"148.2\" x2=\"64\" y2=\"148.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"152.7\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"118.7\" x2=\"64\" y2=\"118.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"123.2\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"89.1\" x2=\"64\" y2=\"89.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"93.6\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"59.6\" x2=\"64\" y2=\"59.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"64.1\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">80</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">100</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">120</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">140</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">160</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Length, f (minutes)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,118.7 240.2,59.6 357.8,118.7 475.2,251.7\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"118.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"59.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"118.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"251.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"122.8,251.7 240.2,133.4 357.8,44.8 475.2,118.7\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"118.8\" y=\"247.7\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"236.2\" y=\"129.4\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"353.8\" y=\"40.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"471.2\" y=\"114.7\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group P</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group Q</text></svg></div>",
    "options": [
      {
        "text": "Group P is modal in \\(120 \\le f &lt; 140\\) and group Q is modal in \\(100 \\le f &lt; 120\\)",
        "correct": false,
        "feedback": "Swapped the two groups: read group P's polygon as group Q's, giving Group P is modal in \\(120 \\le f &lt; 140\\) and group Q is modal in \\(100 \\le f &lt; 120\\). Group P is the solid line. Its highest point is at the class \\(100 \\le f &lt; 120\\)."
      },
      {
        "text": "Both groups are modal in \\(100 \\le f &lt; 120\\)",
        "correct": false,
        "feedback": "Read the highest point of group P only, the class \\(100 \\le f &lt; 120\\), giving Both groups are modal in \\(100 \\le f &lt; 120\\). Each polygon has its own highest point. Group Q's is at the class \\(120 \\le f &lt; 140\\)."
      },
      {
        "text": "Group P is modal in \\(100 \\le f &lt; 120\\) and group Q is modal in \\(120 \\le f &lt; 140\\)",
        "correct": true,
        "feedback": "Correct. The highest point of group P is 16, at the class \\(100 \\le f &lt; 120\\). The highest point of group Q is 17, at the class \\(120 \\le f &lt; 140\\)."
      },
      {
        "text": "Both groups are modal in \\(120 \\le f &lt; 140\\)",
        "correct": false,
        "feedback": "Read the highest point of group Q only, the class \\(120 \\le f &lt; 140\\), giving Both groups are modal in \\(120 \\le f &lt; 140\\). Each polygon has its own highest point. Group P's is at the class \\(100 \\le f &lt; 120\\)."
      }
    ],
    "backward": "Reading and comparing values on a graph, Ch10.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the distances thrown by the pupils in a throwing event; the frequency of each class is given in brackets: \\(10 \\le d &lt; 20\\) (5); \\(20 \\le d &lt; 30\\) (11); \\(30 \\le d &lt; 40\\) (15); \\(40 \\le d &lt; 50\\) (17). Which class contains the median?",
    "options": [
      {
        "text": "\\(30 \\le d &lt; 40\\)",
        "correct": true,
        "feedback": "Correct. There are \\(5 + 11 + 15 + 17 = 48\\) values, so the median is halfway between the 24th and 25th values. The running totals are 5, 16, 31, so both fall in the class \\(30 \\le d &lt; 40\\)."
      },
      {
        "text": "\\(20 \\le d &lt; 30\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(20 \\le d &lt; 30\\). Keep adding until the running total reaches the middle position among all the values."
      },
      {
        "text": "\\(10 \\le d &lt; 20\\)",
        "correct": false,
        "feedback": "Chose the class \\(10 \\le d &lt; 20\\), where the running total is only 5, giving \\(10 \\le d &lt; 20\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(40 \\le d &lt; 50\\)",
        "correct": false,
        "feedback": "Chose the modal class, which has the highest frequency, giving \\(40 \\le d &lt; 50\\). The median is the middle value, so it needs a running total of the frequencies. The tallest class is not necessarily the one that holds it."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of height against shoe size with a line of best fit. Which statement describes the gradient of the line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of height against shoe size: 10 points at (3, 146), (4, 150), (5, 155), (6, 155), (7, 166), (8, 168), (9, 173), (10, 180), (11, 184), (12, 189); the horizontal axis shows shoe size and the vertical axis shows height (cm), with a line of best fit drawn through (9, 174) and (12, 189).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"103.1\" y1=\"22\" x2=\"103.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"169.4\" y1=\"22\" x2=\"169.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"235.7\" y1=\"22\" x2=\"235.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"368.3\" y1=\"22\" x2=\"368.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"434.6\" y1=\"22\" x2=\"434.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"500.9\" y1=\"22\" x2=\"500.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">160</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">170</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">180</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">190</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Shoe size</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Height (cm)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"169.4\" y1=\"292.5\" x2=\"467.7\" y2=\"27.9\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"368.3\" cy=\"116.1\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"467.7\" cy=\"27.9\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"169.4\" cy=\"280.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"235.7\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"163.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"151.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"368.3\" cy=\"122.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"80.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"434.6\" cy=\"57.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"27.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "Each extra shoe size adds about 129 cm to the height",
        "correct": false,
        "feedback": "Used the value where the line meets the vertical axis, 129, giving Each extra shoe size adds about 129 cm to the height. The meeting point is the starting value, the intercept. The gradient is the steepness."
      },
      {
        "text": "Each extra shoe size adds about 0.2 cm to the height",
        "correct": false,
        "feedback": "Turned the gradient upside down, \\(3 \\div 15 = 0.2\\), giving Each extra shoe size adds about 0.2 cm to the height. The gradient is the change up divided by the change across, \\(15 \\div 3\\)."
      },
      {
        "text": "Each extra shoe size adds about 5 cm to the height",
        "correct": true,
        "feedback": "Correct. The gradient is the change up divided by the change across: \\((189 - 174) \\div (12 - 9) = 15 \\div 3 = 5\\). So each extra shoe size adds about 5 cm."
      },
      {
        "text": "Each extra shoe size adds about 15 cm to the height",
        "correct": false,
        "feedback": "Used the whole change between the two marked points, \\(189 - 174 = 15\\), giving Each extra shoe size adds about 15 cm to the height. That change is for 3 steps across together. The gradient shares it out per single step."
      }
    ],
    "backward": "Gradient and intercept, Ch10.",
    "forward": "Later in this chapter you use the line to estimate values."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the heights of seedlings of two groups as a back-to-back stem-and-leaf diagram. The same data could also be put in a grouped frequency table. What can the stem-and-leaf diagram show that the grouped table cannot?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the heights of seedlings: group P on the left and group Q on the right, rows (left leaves, then right leaves) 3: 4 0 | 5 6; 4: 7 4 2 2 | 1 6; 5: 9 7 4 2 | 2 5 6 8 9; 6: 7 | 0 0 6; 7: 1 | 8; the key reads 4 | 2 means 42 cm.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"173.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group P</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group Q</text><text x=\"232.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"210.5\" y1=\"42\" x2=\"210.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"254.5\" y1=\"42\" x2=\"254.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"232.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"264.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"232.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"232.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"155.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"232.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"264.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group P: 2 | 4 means 42 cm</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group Q: 4 | 2 means 42 cm</text></svg></div>",
    "options": [
      {
        "text": "Which class is the modal class of group P",
        "correct": false,
        "feedback": "Chose \"Which class is the modal class of group P\". A grouped frequency table shows this too, so it is not something only the stem-and-leaf diagram shows."
      },
      {
        "text": "The number of values in group P",
        "correct": false,
        "feedback": "Chose \"The number of values in group P\". A frequency table shows this too, so it is not something only the stem-and-leaf diagram shows."
      },
      {
        "text": "The exact lowest value in group P, 30 cm",
        "correct": true,
        "feedback": "Correct. The diagram keeps every individual value, so the lowest value in group P, 30 cm, can be read exactly. A grouped table only says which class a value is in."
      },
      {
        "text": "The estimated mean of group P",
        "correct": false,
        "feedback": "Chose \"The estimated mean of group P\". An estimated mean can be found from a grouped table, so it is not something only the stem-and-leaf diagram shows."
      }
    ],
    "backward": "Grouped frequency tables, from earlier stages.",
    "forward": "Later in this chapter you decide which diagram to use for which data."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the waiting times of two groups, T and U. How much higher is the higher median than the lower median?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the waiting times: group T on the left and group U on the right, rows (left leaves, then right leaves) 0: 9 8 | -; 1: 7 | 7 8 9; 2: 9 5 0 | 9; 3: 9 7 | 2 2 2 8; 4: 7 | 1 3 4 7; 5: 3 3 2 | 3; the key reads 1 | 7 means 17 minutes.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group T</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group U</text><text x=\"232.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"210.5\" y1=\"42\" x2=\"210.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"254.5\" y1=\"42\" x2=\"254.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"232.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">0</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"232.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"232.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"309.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"232.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"200.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"170.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"264.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group T: 7 | 1 means 17 minutes</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group U: 1 | 7 means 17 minutes</text></svg></div>",
    "options": [
      {
        "text": "65 minutes",
        "correct": false,
        "feedback": "Added the two medians, 33 and 32, giving 65 minutes. 'How much higher' means subtract the smaller median from the larger."
      },
      {
        "text": "1 minute",
        "correct": true,
        "feedback": "Correct. Group T has median 33 and group U has median 32, so the difference is \\(33 - 32 = 1\\)."
      },
      {
        "text": "33 minutes",
        "correct": false,
        "feedback": "Gave the median of group T itself, 33, giving 33 minutes. Subtract the median of group U, 32, to find how much higher it is."
      },
      {
        "text": "9 minutes",
        "correct": false,
        "feedback": "Compared the ranges instead, 45 and 36, giving 9 minutes. The question asks about the medians, the middle values, not the spread."
      }
    ],
    "backward": "The median and finding a difference, from earlier stages.",
    "forward": "Later in this chapter you compare the medians of two groups."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The distances cycled, in km, of 5 friends are: 12, 13, 66, 15, 11. Which of these is least affected by the unusually large value, 66?",
    "options": [
      {
        "text": "The total, 117 km",
        "correct": false,
        "feedback": "Chose \"The total, 117 km\". The total includes 66, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 23.4 km",
        "correct": false,
        "feedback": "Chose \"The mean, 23.4 km\": the values add to 117, and \\(117 \\div 5 = 23.4\\). The mean uses every value, so the unusual value 66 pulls it upwards. The median is not pulled in the same way."
      },
      {
        "text": "The range, 55 km",
        "correct": false,
        "feedback": "Chose \"The range, 55 km\": \\(66 - 11 = 55\\). The range uses the highest value, 66, so it is changed most by an unusual value. It is also a measure of spread, not an average."
      },
      {
        "text": "The median, 13 km",
        "correct": true,
        "feedback": "Correct. In order the values are 11, 12, 13, 15, 66. The middle value is 13, and replacing 66 with a larger number would not change it. The mean, 23.4, would change."
      }
    ],
    "backward": "The median and the mean, from earlier stages.",
    "forward": "Later in this chapter you choose the best average to describe data with an unusual value."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the waiting times of the patients at a clinic one morning. How many patients have a time of 25 or more?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the waiting times of the patients at a clinic one morning: points plotted at the class midpoints and joined by straight lines, at (12.5, 2), (17.5, 9), (22.5, 19), (27.5, 11), (32.5, 2); the horizontal axis shows the time, x, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"282.3\" x2=\"534\" y2=\"282.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"254.9\" x2=\"534\" y2=\"254.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"200.1\" x2=\"534\" y2=\"200.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"172.7\" x2=\"534\" y2=\"172.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"145.3\" x2=\"534\" y2=\"145.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"117.9\" x2=\"534\" y2=\"117.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.1\" x2=\"534\" y2=\"63.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"35.7\" x2=\"534\" y2=\"35.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"268.6\" x2=\"64\" y2=\"268.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"273.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"241.2\" x2=\"64\" y2=\"241.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"245.7\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"213.8\" x2=\"64\" y2=\"213.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"218.3\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"186.4\" x2=\"64\" y2=\"186.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"190.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"131.6\" x2=\"64\" y2=\"131.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"136.1\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"104.2\" x2=\"64\" y2=\"104.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"108.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"76.8\" x2=\"64\" y2=\"76.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"81.3\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"49.4\" x2=\"64\" y2=\"49.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"53.9\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, x (minutes)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,268.6 205.0,172.7 299.0,35.7 393.0,145.3 487.0,268.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"268.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"172.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"35.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"145.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"268.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "11 patients",
        "correct": false,
        "feedback": "Used only the class \\(25 \\le x &lt; 30\\), 11, giving 11 patients. A value of 25 or more also includes every class above it."
      },
      {
        "text": "2 patients",
        "correct": false,
        "feedback": "Left out the class that starts at 25: \\(2 = 2\\), giving 2 patients. The class \\(25 \\le x &lt; 30\\) starts at 25, so it is included."
      },
      {
        "text": "32 patients",
        "correct": false,
        "feedback": "Added the class below as well, 19, giving 32 patients. That class ends at 25 and does not reach it, so it is not included."
      },
      {
        "text": "13 patients",
        "correct": true,
        "feedback": "Correct. The classes from \\(25 \\le x &lt; 30\\) upwards have heights 11, 2, so \\(11 + 2 = 13\\)."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you use running totals to find the class that contains the median."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the ages of the members of a sports club; the frequency of each class is given in brackets: \\(20 \\le a &lt; 30\\) (1); \\(30 \\le a &lt; 40\\) (6); \\(40 \\le a &lt; 50\\) (9); \\(50 \\le a &lt; 60\\) (6); \\(60 \\le a &lt; 70\\) (1). How many members have an age of less than 60?",
    "options": [
      {
        "text": "22 members",
        "correct": true,
        "feedback": "Correct. The classes below 60 have frequencies 1, 6, 9, 6, so \\(1 + 6 + 9 + 6 = 22\\)."
      },
      {
        "text": "1 member",
        "correct": false,
        "feedback": "Found the number of 60 or more instead, \\(23 - 22 = 1\\), giving 1 member. The question asks for the members below 60."
      },
      {
        "text": "16 members",
        "correct": false,
        "feedback": "Left out the class just below 60, 6, giving 16 members. That class lies completely below 60, so it is included."
      },
      {
        "text": "6 members",
        "correct": false,
        "feedback": "Used only the class just below 60, 6, giving 6 members. 'Less than 60' includes every class below it."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use running totals like this to find the class containing the median."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of ice creams sold against outdoor temperature. How many points have outdoor temperature less than 22 °C and number of ice creams sold more than 38?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of ice creams sold against outdoor temperature: 12 points at (12, 48), (13, 63), (16, 37), (17, 24), (18, 37), (20, 53), (21, 31), (24, 88), (25, 58), (26, 178), (31, 96), (32, 91); the horizontal axis shows outdoor temperature (°C) and the vertical axis shows number of ice creams sold.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Outdoor temperature (°C)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of ice creams sold</text><polyline points=\"81,322 85,310 89,322 93,310\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"107.1\" cy=\"245.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"125.7\" cy=\"223.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.4\" cy=\"261.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"199.9\" cy=\"280.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"218.5\" cy=\"261.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"238.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"274.2\" cy=\"270.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"329.8\" cy=\"186.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"348.4\" cy=\"230.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"367.0\" cy=\"54.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"459.8\" cy=\"174.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"478.3\" cy=\"182.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "12 points",
        "correct": false,
        "feedback": "Counted the points that meet either condition, 12, giving 12 points. The word 'and' means a point has to meet both conditions at once."
      },
      {
        "text": "3 points",
        "correct": true,
        "feedback": "Correct. The points with outdoor temperature less than 22 °C and number of ice creams sold more than 38 are (12, 48), (13, 63), (20, 53), which makes 3."
      },
      {
        "text": "7 points",
        "correct": false,
        "feedback": "Counted only the points with outdoor temperature less than 22 °C, 7, giving 7 points. Each point must also have number of ice creams sold more than 38."
      },
      {
        "text": "8 points",
        "correct": false,
        "feedback": "Counted only the points with number of ice creams sold more than 38, 8, giving 8 points. Each point must also have outdoor temperature less than 22 °C."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you turn a count like this into a fraction of the whole."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A bar chart shows the attendances of two clubs: 34 and 43. Its vertical axis starts at 31 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "12 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 31, 12, as the number of times, giving 12 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "9 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(43 - 34 = 9\\), giving 9 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "5 times as tall",
        "correct": false,
        "feedback": "Divided to get 4 and then added 1, giving 5 times as tall. The second bar is 4 times the height of the first, not 5."
      },
      {
        "text": "4 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 31, the bars are drawn with heights \\(43 - 31 = 12\\) and \\(34 - 31 = 3\\). So the second bar looks \\(12 \\div 3 = 4\\) times as tall, although the real values are close."
      }
    ],
    "backward": "Reading scales on graphs, Ch10, and ratio, Ch11.",
    "forward": "Later in this chapter you meet other features that make a graph misleading."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram compares the battery lives of two groups, J and K. Which statement is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the battery lives: group J on the left and group K on the right, rows (left leaves, then right leaves) 3: 1 | 9; 4: 1 | 3 4; 5: 5 3 1 1 | 1 1 2 3 4 6 7; 6: 9 4 2 | -; 7: 8 6 4 | 1 3 9; the key reads 4 | 1 means 41 hours.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"158.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group J</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group K</text><text x=\"217.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"195.5\" y1=\"42\" x2=\"195.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"239.5\" y1=\"42\" x2=\"239.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"217.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"249.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"217.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"249.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"217.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"155.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"140.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"249.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"339.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"217.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"217.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"155.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"249.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"264.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group J: 1 | 4 means 41 hours</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group K: 4 | 1 means 41 hours</text></svg></div>",
    "options": [
      {
        "text": "Group J has the higher median, but group K has the larger range",
        "correct": false,
        "feedback": "Took the ranges the wrong way round: 47 for J and 40 for K, giving Group J has the higher median, but group K has the larger range. The larger range belongs to the group whose highest and lowest values are further apart."
      },
      {
        "text": "Group J has both the higher median and the larger range",
        "correct": true,
        "feedback": "Correct. Group J has median 58.5 and range 47. Group K has median 53 and range 40. So group J has the higher median and group J has the larger range."
      },
      {
        "text": "Group K has both the higher median and the larger range",
        "correct": false,
        "feedback": "Reversed both comparisons, giving Group K has both the higher median and the larger range. Work out the median and the range of each group separately, then compare each pair."
      },
      {
        "text": "Group K has the higher median, but group J has the larger range",
        "correct": false,
        "feedback": "Took the medians the wrong way round: 58.5 for J and 53 for K, giving Group K has the higher median, but group J has the larger range. Find each median by counting to the middle of each group, and compare them carefully."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you decide what such a comparison does and does not show."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The tables give the masses of two groups, E and F. Group E: \\(10 \\le w &lt; 20\\) (4); \\(20 \\le w &lt; 30\\) (7); \\(30 \\le w &lt; 40\\) (6); \\(40 \\le w &lt; 50\\) (3). Group F: \\(10 \\le w &lt; 20\\) (7); \\(20 \\le w &lt; 30\\) (9); \\(30 \\le w &lt; 40\\) (8); \\(40 \\le w &lt; 50\\) (1). Which statement is correct?",
    "options": [
      {
        "text": "Group E has the higher estimated mean, by 2.8 kg",
        "correct": true,
        "feedback": "Correct. Group E has \\(580 \\div 20 = 29\\) and group F has \\(655 \\div 25 = 26.2\\), so group E has the higher estimated mean, by 2.8 kg."
      },
      {
        "text": "The two groups have the same estimated mean",
        "correct": false,
        "feedback": "Said the means were equal, giving The two groups have the same estimated mean. Work out each estimated mean separately: they differ."
      },
      {
        "text": "Group F has the higher estimated mean, by 2.8 kg",
        "correct": false,
        "feedback": "Took the means the wrong way round: 29 for E and 26.2 for F, giving Group F has the higher estimated mean, by 2.8 kg. Estimate each mean by midpoint×frequency, add, then divide, and compare carefully."
      },
      {
        "text": "Group E has the higher estimated mean, by 75 kg",
        "correct": false,
        "feedback": "Compared the totals of midpoint×frequency, which differ by 75, giving Group E has the higher estimated mean, by 75 kg. Each total must be divided by the number of values in its group before the groups are compared."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you decide how far a comparison of averages can be trusted."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "What is the midpoint of the class \\(40 \\le p &lt; 50\\)?",
    "options": [
      {
        "text": "40",
        "correct": false,
        "feedback": "Used the lower end of the class, 40. The midpoint lies halfway between the two ends of the class."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Gave the class width, \\(50 - 40 = 10\\). The width is the length of the class. The midpoint is a position inside it."
      },
      {
        "text": "45",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((40 + 50) \\div 2 = 45\\)."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Gave half the class width, \\(10 \\div 2\\), giving 5. Half the width is the distance from an end to the midpoint. Add it to the lower end, 40."
      }
    ],
    "backward": "The mean of two numbers, from earlier stages.",
    "forward": "Later in this chapter you multiply each midpoint by its frequency to estimate the mean."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the reaction times of the volunteers in a reaction experiment. What fraction of the volunteers are in the class \\(200 \\le r &lt; 250\\)? Give the fraction in its simplest form.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the reaction times of the volunteers in a reaction experiment: points plotted at the class midpoints and joined by straight lines, at (225, 2), (275, 6), (325, 7), (375, 5); the horizontal axis shows the time, r, in milliseconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">200</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">250</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">300</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">350</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">400</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, r (milliseconds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,227.5 240.2,90.5 357.8,56.2 475.2,124.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"90.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"56.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"124.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{2}{7}\\)",
        "correct": false,
        "feedback": "Compared the class with the tallest class instead of with the total, giving \\(\\frac{2}{7}\\). A fraction of all the volunteers has the total, 20, on the bottom."
      },
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": true,
        "feedback": "Correct. The class has 2 of the \\(2 + 6 + 7 + 5 = 20\\) volunteers, so the fraction is \\(\\frac{2}{20} = \\frac{1}{10}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Put the frequency over the number of classes, \\(\\frac{2}{4}\\), giving \\(\\frac{1}{2}\\). The bottom of the fraction is the total number of volunteers, not the number of classes."
      },
      {
        "text": "\\(\\frac{9}{10}\\)",
        "correct": false,
        "feedback": "Found the fraction outside the class instead, \\(\\frac{20 - 2}{20}\\), giving \\(\\frac{9}{10}\\). The question asks for the fraction inside the class, so use its own frequency on top."
      }
    ],
    "backward": "Probability as a fraction, Ch12.",
    "forward": "Later in this chapter you find the same fraction from grouped data in a table."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "The masses of parcels at two depots have been grouped into the same equal classes. A manager wants to compare the shapes of the two distributions on one set of axes. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A pair of frequency polygons of the masses of the parcels in two depots",
        "correct": true,
        "feedback": "Correct. Here you need to compare the shape of two grouped data sets on the same axes, and a pair of frequency polygons lets two grouped data sets be compared on the same scale."
      },
      {
        "text": "A bar chart of the masses of the parcels in two depots",
        "correct": false,
        "feedback": "Chose \"A bar chart of the masses of the parcels in two depots\". A bar chart compares the frequencies of separate categories, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A pie chart of the masses of the parcels in two depots",
        "correct": false,
        "feedback": "Chose \"A pie chart of the masses of the parcels in two depots\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A scatter graph of the masses of the parcels in two depots",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the masses of the parcels in two depots\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare the shape of two grouped data sets on the same axes."
      }
    ],
    "backward": "Plotting graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of test mark against hours of revision with a line of best fit. Use the line to estimate the test mark when hours of revision is 1.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of test mark against hours of revision: 11 points at (0, 22), (1, 28), (2, 31), (3, 39), (4, 44), (5, 54), (6, 66), (7, 73), (8, 73), (9, 88), (10, 87); the horizontal axis shows hours of revision and the vertical axis shows test mark, with a straight line of best fit drawn through (4, 48) and (7, 69).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"108.7\" y1=\"22\" x2=\"108.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"263.3\" y1=\"22\" x2=\"263.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"340.7\" y1=\"22\" x2=\"340.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"495.3\" y1=\"22\" x2=\"495.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Hours of revision</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Test mark</text><line x1=\"70.0\" y1=\"257.2\" x2=\"456.7\" y2=\"51.4\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"224.7\" cy=\"174.9\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"340.7\" cy=\"113.1\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"70.0\" cy=\"251.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"108.7\" cy=\"233.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"147.3\" cy=\"224.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"201.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"186.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"263.3\" cy=\"157.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"122.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"340.7\" cy=\"101.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"101.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"57.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"456.7\" cy=\"60.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "28",
        "correct": false,
        "feedback": "Read the nearest plotted point, (1, 28), instead of the line. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Multiplied the gradient, 7, by 1 as if the line started at the origin. The line does not pass through (0, 0), so first find where it is at your value on the horizontal axis."
      },
      {
        "text": "58.5",
        "correct": false,
        "feedback": "Used halfway between the two marked heights, \\((48 + 69) \\div 2\\), giving 58.5. Read the line at 1 across, not at the middle of the marked points."
      },
      {
        "text": "27",
        "correct": true,
        "feedback": "Correct. The line rises 21 for every 3 across, a gradient of 7. From (4, 48) to 1 across is \\(-3\\) further, so the line is at \\(48 + 7 \\times -3 = 27\\)."
      }
    ],
    "backward": "Straight-line functions, Ch9, and gradient, Ch10.",
    "forward": "Later in this chapter you decide when such an estimate can be trusted."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the weekly screen times of the teenagers in a survey; the frequency of each class is given in brackets: \\(10 \\le y &lt; 15\\) (5); \\(15 \\le y &lt; 20\\) (10); \\(20 \\le y &lt; 25\\) (6); \\(25 \\le y &lt; 30\\) (3); \\(30 \\le y &lt; 35\\) (1). What percentage of the teenagers are in the class \\(25 \\le y &lt; 30\\)?",
    "options": [
      {
        "text": "88%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 12 = 88\\), giving 88%. The question asks for the percentage inside the class."
      },
      {
        "text": "30%",
        "correct": false,
        "feedback": "Divided by the tallest frequency, 10, giving 30%. Divide by the total number of teenagers, 25."
      },
      {
        "text": "12%",
        "correct": true,
        "feedback": "Correct. The class has 3 of the \\(5 + 10 + 6 + 3 + 1 = 25\\) teenagers, so the percentage is \\(3 \\div 25 \\times 100 = 12\\%\\)."
      },
      {
        "text": "3%",
        "correct": false,
        "feedback": "Gave the frequency, 3, as the percentage, giving 3%. A percentage is out of 100. Divide by the total, 25, then multiply by 100."
      }
    ],
    "backward": "Percentages, Ch3.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the times to run 60 metres of two groups, R and S. What is the mean of group R?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the times to run 60 metres: group R on the left and group S on the right, rows (left leaves, then right leaves) 8: - | 3; 9: 4 1 | 4; 10: 9 7 6 | 1; 11: 7 7 5 | 4 7 9 9; 12: 5 | 0 3; the key reads 9 | 1 means 9.1 seconds.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group R</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group S</text><text x=\"232.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"210.5\" y1=\"42\" x2=\"210.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"254.5\" y1=\"42\" x2=\"254.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"232.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"264.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"232.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"232.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"232.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">11</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"264.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group R: 1 | 9 means 9.1 seconds</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group S: 9 | 1 means 9.1 seconds</text></svg></div>",
    "options": [
      {
        "text": "9.81 seconds",
        "correct": false,
        "feedback": "Divided by 10, one more than the number of values, giving 9.81 seconds. There are 9 values, so divide by 9."
      },
      {
        "text": "98.1 seconds",
        "correct": false,
        "feedback": "Added the values, \\(9.1 + 9.4 + 10.6 + 10.7 + 10.9 + 11.5 + 11.7 + 11.7 + 12.5 = 98.1\\), and did not divide, giving 98.1 seconds. A mean needs dividing by the number of values, 9."
      },
      {
        "text": "10.9 seconds",
        "correct": true,
        "feedback": "Correct. The 9 values add up to \\(9.1 + 9.4 + 10.6 + 10.7 + 10.9 + 11.5 + 11.7 + 11.7 + 12.5 = 98.1\\), so the mean is \\(98.1 \\div 9 = 10.9\\)."
      },
      {
        "text": "19.62 seconds",
        "correct": false,
        "feedback": "Divided the total by the number of rows, 5, giving 19.62 seconds. Divide by the number of values, 9, not the number of rows."
      }
    ],
    "backward": "The mean, from earlier stages, and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare the means of two groups."
  }
];

function buildDocs(phase, items) {
  return items.map((item) => ({ grade: GRADE, chapterSlug: CHAPTER_SLUG, chapterName: CHAPTER_NAME, level: LEVEL, phase, ...item }));
}

const allQuestions = [
  ...buildDocs('warmup', warmupItems),
  ...buildDocs('diagnostic', diagnosticItems),
  ...buildDocs('recheck', recheckItems)
];

const chapterDocs = [{
  grade: GRADE,
  gradeLabel: GRADE_LABEL,
  chapterSlug: CHAPTER_SLUG,
  chapterName: CHAPTER_NAME,
  level: LEVEL,
  title: "Interpreting and Discussing Results — Advanced Core",
  subtitle: "Grade 8 · Level 2 · Advanced Core",
  description: "Comparing distributions, lines of best fit, estimating the mean from grouped data, and choosing representations — warm-up, diagnostic, and spaced recheck.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. This level asks for two steps in most questions: first find what you need (the total of a polygon, the midpoints of a table, a point on a line of best fit), then use it to answer. Write each step down before you choose an answer. For each question, ask yourself first: what do I need to find before I can answer, and what units will the answer have? If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
  timedSeconds: 0
}];

async function run() {
  await mongoose.connect(process.env.DATABASE);
  const filter = { grade: GRADE, chapterSlug: CHAPTER_SLUG, level: LEVEL };
  await MathChapter.deleteMany(filter);
  await MathQuestion.deleteMany(filter);
  await MathChapter.insertMany(chapterDocs);
  const inserted = await MathQuestion.insertMany(allQuestions);
  console.log(`Seeded ${CHAPTER_NAME} L${LEVEL}: ${inserted.length} questions (${warmupItems.length} warm-up, ${diagnosticItems.length} diagnostic, ${recheckItems.length} recheck)`);
  await mongoose.disconnect();
}

run().catch(err => { console.error('Seed failed:', err); process.exit(1); });

// Interpreting and Discussing Results — Grade 8, Level 4 (Speed & Strategy).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh15InterpretingResultsL4.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-15-interpreting-discussing-results";
const CHAPTER_NAME = "Interpreting and Discussing Results";
const LEVEL = 4;

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
    "tier": "S",
    "question": "In a frequency table the class \\(20 \\le d &lt; 30\\) has frequency 6. A frequency polygon is drawn for the table. At which value of d is the point for this class plotted?",
    "options": [
      {
        "text": "20",
        "correct": false,
        "feedback": "Used the lower end of the class, 20. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      },
      {
        "text": "25",
        "correct": true,
        "feedback": "Correct. A frequency polygon is plotted at the midpoint of each class, which is \\((20 + 30) \\div 2 = 25\\)."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Used the upper end of the class, 30. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Used the class width, 10. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      }
    ],
    "retryHint": "Plot at the middle of the class: add the two ends of the class and halve.",
    "backward": "Dividing decimals by 2, Ch3.",
    "forward": "Later in this chapter you use the same midpoints to estimate a mean."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "S",
    "question": "What is the midpoint of the class \\(300 \\le r &lt; 400\\)?",
    "options": [
      {
        "text": "350",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((300 + 400) \\div 2 = 350\\)."
      },
      {
        "text": "100",
        "correct": false,
        "feedback": "Gave the class width, \\(400 - 300 = 100\\). The width is the length of the class. The midpoint is a position inside it."
      },
      {
        "text": "50",
        "correct": false,
        "feedback": "Gave half the class width, \\(100 \\div 2\\), giving 50. Half the width is the distance from an end to the midpoint. Add it to the lower end, 300."
      },
      {
        "text": "300",
        "correct": false,
        "feedback": "Used the lower end of the class, 300. The midpoint lies halfway between the two ends of the class."
      }
    ],
    "retryHint": "Add the two ends of the class together, then divide by 2.",
    "backward": "Dividing decimals by 2, Ch3.",
    "forward": "Later in this chapter you multiply each midpoint by its frequency to estimate the mean."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "tier": "S",
    "question": "The diagram shows a scatter graph of number of tickets sold against price of a ticket. Which description fits the correlation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of tickets sold against price of a ticket: 12 points at (5, 211), (6, 188), (7, 182), (10, 179), (11, 166), (12, 138), (13, 134), (16, 96), (18, 102), (20, 81), (22, 74), (23, 47); the horizontal axis shows price of a ticket (pounds) and the vertical axis shows number of tickets sold.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Price of a ticket (pounds)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of tickets sold</text><circle cx=\"162.8\" cy=\"67.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.4\" cy=\"94.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"199.9\" cy=\"102.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"105.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"274.2\" cy=\"120.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"292.7\" cy=\"153.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"311.3\" cy=\"158.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"367.0\" cy=\"203.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"404.1\" cy=\"196.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"441.2\" cy=\"220.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"478.3\" cy=\"229.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"496.9\" cy=\"260.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "No correlation between price of a ticket and number of tickets sold",
        "correct": false,
        "feedback": "Said there is no pattern, giving No correlation between price of a ticket and number of tickets sold. The points do follow a clear direction, so there is correlation."
      },
      {
        "text": "Strong positive correlation between price of a ticket and number of tickets sold",
        "correct": false,
        "feedback": "Reversed the direction: the points go down as price of a ticket increases, giving Strong positive correlation between price of a ticket and number of tickets sold. As price of a ticket increases, number of tickets sold goes down, which is negative correlation."
      },
      {
        "text": "Weak negative correlation between price of a ticket and number of tickets sold",
        "correct": false,
        "feedback": "Judged the points to be spread out, calling the correlation weak, giving Weak negative correlation between price of a ticket and number of tickets sold. Strong correlation means the points lie close to a straight line. Weak means they are more spread out."
      },
      {
        "text": "Strong negative correlation between price of a ticket and number of tickets sold",
        "correct": true,
        "feedback": "Correct. As price of a ticket increases, number of tickets sold falls, and the points lie close to a straight line, so the correlation is strong negative."
      }
    ],
    "retryHint": "Look at the direction the points move as you go to the right, then at how close they sit to a straight line.",
    "backward": "The gradient of a graph, Ch10.",
    "forward": "Later in this chapter you draw a line of best fit through scatter graphs like this."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "tier": "S",
    "question": "A teacher has measured the height and the arm span of each of 24 students and wants to see whether taller students tend to have longer arm spans. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A line graph of the heights and arm spans of the students",
        "correct": false,
        "feedback": "Chose \"A line graph of the heights and arm spans of the students\". A line graph shows how one quantity changes over time, but here you need to see whether two measurements are related."
      },
      {
        "text": "A pie chart of the heights and arm spans of the students",
        "correct": false,
        "feedback": "Chose \"A pie chart of the heights and arm spans of the students\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to see whether two measurements are related."
      },
      {
        "text": "A scatter graph of the heights and arm spans of the students",
        "correct": true,
        "feedback": "Correct. Here you need to see whether two measurements are related, and a scatter graph shows whether two measurements taken on the same items are related."
      },
      {
        "text": "A frequency polygon of the heights and arm spans of the students",
        "correct": false,
        "feedback": "Chose \"A frequency polygon of the heights and arm spans of the students\". A frequency polygon shows how grouped data are spread across equal classes, but here you need to see whether two measurements are related."
      }
    ],
    "retryHint": "Decide what the diagram must show, then match it to the diagram that does that.",
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "tier": "S",
    "question": "The diagram shows the masses of potatoes of two groups, A and B. What value does the leaf 2 in the row with stem 14 represent for group B?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of potatoes: group A on the left and group B on the right, rows (left leaves, then right leaves) 12: 9 | 1 4 7 7; 13: 0 | 3; 14: 8 6 3 3 3 1 | 2 7; 15: - | 2; 16: 8 8 3 | 0 2 3; the key reads 13 | 0 means 130 grams.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group A</text><text x=\"314.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group B</text><text x=\"255.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"233.0\" y1=\"42\" x2=\"233.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"277.0\" y1=\"42\" x2=\"277.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"255.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"223.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"302.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"317.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"332.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"255.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">13</text><text x=\"223.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"255.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">14</text><text x=\"223.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"178.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"163.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"148.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"255.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">15</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"255.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">16</text><text x=\"223.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"317.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group A: 0 | 13 means 130 grams</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group B: 13 | 0 means 130 grams</text></svg></div>",
    "options": [
      {
        "text": "16 grams",
        "correct": false,
        "feedback": "Added the stem and the leaf, \\(14 + 2\\), giving 16 grams. The stem and leaf are digits of one number, not numbers to add."
      },
      {
        "text": "14.2 grams",
        "correct": false,
        "feedback": "Put the decimal point in the wrong place, giving 14.2 grams. Follow the key to see what the stem and the leaf stand for."
      },
      {
        "text": "214 grams",
        "correct": false,
        "feedback": "Reversed the digits, giving 214 grams. The stem comes first and the leaf second."
      },
      {
        "text": "142 grams",
        "correct": true,
        "feedback": "Correct. The key shows how to read each row: the stem 14 and the leaf 2 together stand for 142 grams."
      }
    ],
    "retryHint": "Read the key first: it tells you what the stem and the leaf stand for.",
    "backward": "Place value, Ch3.",
    "forward": "Later in this chapter you use values read from the key to find medians and ranges."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "C",
    "question": "The table gives the distances to school of the pupils in a year group; the frequency of each class is given in brackets: \\(2 \\le k &lt; 4\\) (4); \\(4 \\le k &lt; 6\\) (7); \\(6 \\le k &lt; 8\\) (6); \\(8 \\le k &lt; 10\\) (3). What percentage of the pupils are in the class \\(8 \\le k &lt; 10\\)?",
    "options": [
      {
        "text": "30%",
        "correct": false,
        "feedback": "Doubled the percentage, \\(2 \\times 15 = 30\\), giving 30%. The class has 3 of 20, which is 15%."
      },
      {
        "text": "3%",
        "correct": false,
        "feedback": "Gave the frequency, 3, as the percentage, giving 3%. A percentage is out of 100. Divide by the total, 20, then multiply by 100."
      },
      {
        "text": "15%",
        "correct": true,
        "feedback": "Correct. The class has 3 of the \\(4 + 7 + 6 + 3 = 20\\) pupils, so the percentage is \\(3 \\div 20 \\times 100 = 15\\%\\)."
      },
      {
        "text": "85%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 15 = 85\\), giving 85%. The question asks for the percentage inside the class."
      }
    ],
    "retryHint": "Divide the frequency of the class by the total frequency, then multiply by 100.",
    "backward": "Percentages, Ch3, and fractions of a total, Ch8.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "tier": "S",
    "question": "In a frequency table the class \\(30 \\le c &lt; 40\\) has frequency 5. At what coordinates is its point plotted on a frequency polygon?",
    "options": [
      {
        "text": "(35, 5)",
        "correct": true,
        "feedback": "Correct. The point is plotted at the midpoint of the class, \\((30 + 40) \\div 2 = 35\\), and at a height equal to the frequency, 5, so it is (35, 5)."
      },
      {
        "text": "(5, 35)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving (5, 35). A point is written (across, up): the midpoint of the class goes first and the frequency second."
      },
      {
        "text": "(30, 5)",
        "correct": false,
        "feedback": "Plotted at the lower end of the class, 30, giving (30, 5). The point goes at the middle of the class, not at either end."
      },
      {
        "text": "(40, 5)",
        "correct": false,
        "feedback": "Plotted at the upper end of the class, 40, giving (40, 5). The point goes at the middle of the class, not at either end."
      }
    ],
    "retryHint": "Write (midpoint of the class, frequency). Find the midpoint first.",
    "backward": "Plotting coordinates, Ch10.",
    "forward": "Later in this chapter you read coordinates back off a polygon to estimate a mean."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "C",
    "question": "The table gives the 100 m times of the runners in a school race; the frequency of each class is given in brackets: \\(12 \\le s &lt; 14\\) (1); \\(14 \\le s &lt; 16\\) (2); \\(16 \\le s &lt; 18\\) (9); \\(18 \\le s &lt; 20\\) (13); \\(20 \\le s &lt; 22\\) (10). How many runners have a time of less than 20?",
    "options": [
      {
        "text": "35 runners",
        "correct": false,
        "feedback": "Included the class \\(20 \\le s &lt; 22\\) as well, 10, giving 35 runners. That class starts at 20, so its values are not less than 20."
      },
      {
        "text": "25 runners",
        "correct": true,
        "feedback": "Correct. The classes below 20 have frequencies 1, 2, 9, 13, so \\(1 + 2 + 9 + 13 = 25\\)."
      },
      {
        "text": "10 runners",
        "correct": false,
        "feedback": "Found the number of 20 or more instead, \\(35 - 25 = 10\\), giving 10 runners. The question asks for the runners below 20."
      },
      {
        "text": "13 runners",
        "correct": false,
        "feedback": "Used only the class just below 20, 13, giving 13 runners. 'Less than 20' includes every class below it."
      }
    ],
    "retryHint": "Add the frequencies of every class that lies completely below the boundary.",
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use running totals like this to find the class containing the median."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "tier": "C",
    "question": "The diagram shows a frequency polygon for the test marks of a Year 9 class. How many more students are in the class \\(20 \\le m &lt; 30\\) than in the class \\(40 \\le m &lt; 50\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the test marks of a Year 9 class: points plotted at the class midpoints and joined by straight lines, at (5, 8), (15, 18), (25, 7), (35, 2), (45, 1); the horizontal axis shows the mark, m, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"282.3\" x2=\"534\" y2=\"282.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"254.9\" x2=\"534\" y2=\"254.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"200.1\" x2=\"534\" y2=\"200.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"172.7\" x2=\"534\" y2=\"172.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"145.3\" x2=\"534\" y2=\"145.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"117.9\" x2=\"534\" y2=\"117.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.1\" x2=\"534\" y2=\"63.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"35.7\" x2=\"534\" y2=\"35.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"268.6\" x2=\"64\" y2=\"268.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"273.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"241.2\" x2=\"64\" y2=\"241.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"245.7\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"213.8\" x2=\"64\" y2=\"213.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"218.3\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"186.4\" x2=\"64\" y2=\"186.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"190.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"131.6\" x2=\"64\" y2=\"131.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"136.1\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"104.2\" x2=\"64\" y2=\"104.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"108.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"76.8\" x2=\"64\" y2=\"76.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"81.3\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"49.4\" x2=\"64\" y2=\"49.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"53.9\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Mark, m</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,186.4 205.0,49.4 299.0,200.1 393.0,268.6 487.0,282.3\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"186.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"49.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"200.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"268.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"282.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "8 students",
        "correct": false,
        "feedback": "Added the two heights, \\(7 + 1 = 8\\), giving 8 students. 'How many more' means subtract the smaller from the larger."
      },
      {
        "text": "7 students",
        "correct": false,
        "feedback": "Gave the height of the class \\(20 \\le m &lt; 30\\) alone, 7, giving 7 students. The question compares it with the class \\(40 \\le m &lt; 50\\), which has height 1."
      },
      {
        "text": "20 students",
        "correct": false,
        "feedback": "Subtracted the midpoints, 20, instead of the heights, giving 20 students. The midpoints are positions across the axis. The frequencies are the heights."
      },
      {
        "text": "6 students",
        "correct": true,
        "feedback": "Correct. The heights are 7 for \\(20 \\le m &lt; 30\\) and 1 for \\(40 \\le m &lt; 50\\), so the difference is \\(7 - 1 = 6\\)."
      }
    ],
    "backward": "Finding a difference by subtracting, from earlier stages.",
    "forward": "Later in this chapter you compare two polygons on the same axes."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "C",
    "question": "The table gives the heights of the sunflower plants in a school garden; the frequency of each class is given in brackets: \\(20 \\le h &lt; 40\\) (1); \\(40 \\le h &lt; 60\\) (2); \\(60 \\le h &lt; 80\\) (5); \\(80 \\le h &lt; 100\\) (7); \\(100 \\le h &lt; 120\\) (10). Which class contains the median?",
    "options": [
      {
        "text": "\\(60 \\le h &lt; 80\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(60 \\le h &lt; 80\\). Keep adding until the running total reaches the middle position among all the values."
      },
      {
        "text": "\\(80 \\le h &lt; 100\\)",
        "correct": true,
        "feedback": "Correct. There are \\(1 + 2 + 5 + 7 + 10 = 25\\) values, so the middle value is the 13th value. The running totals are 1, 3, 8, 15, so the 13th value falls in the class \\(80 \\le h &lt; 100\\)."
      },
      {
        "text": "\\(20 \\le h &lt; 40\\)",
        "correct": false,
        "feedback": "Chose the class \\(20 \\le h &lt; 40\\), where the running total is only 1, giving \\(20 \\le h &lt; 40\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(100 \\le h &lt; 120\\)",
        "correct": false,
        "feedback": "Chose the modal class, which has the highest frequency, giving \\(100 \\le h &lt; 120\\). The median is the middle value, so it needs a running total of the frequencies. The tallest class is not necessarily the one that holds it."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "tier": "C",
    "question": "The diagram shows a scatter graph of stopping distance against speed of a car with a line of best fit. Use the line to estimate the stopping distance when speed of a car is 57 km/h.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of stopping distance against speed of a car: 12 points at (25, 3), (29, 9), (52, 38), (54, 29), (59, 39), (61, 42), (69, 54), (73, 58), (87, 72), (94, 75), (98, 71), (100, 78); the horizontal axis shows speed of a car (km/h) and the vertical axis shows stopping distance (metres), with a straight line of best fit drawn through (48, 29) and (74, 55).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"89.3\" y1=\"22\" x2=\"89.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"108.7\" y1=\"22\" x2=\"108.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"166.7\" y1=\"22\" x2=\"166.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"205.3\" y1=\"22\" x2=\"205.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"263.3\" y1=\"22\" x2=\"263.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"282.7\" y1=\"22\" x2=\"282.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"321.3\" y1=\"22\" x2=\"321.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"340.7\" y1=\"22\" x2=\"340.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"398.7\" y1=\"22\" x2=\"398.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"437.3\" y1=\"22\" x2=\"437.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"495.3\" y1=\"22\" x2=\"495.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"514.7\" y1=\"22\" x2=\"514.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">80</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">100</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">120</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Speed of a car (km/h)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Stopping distance (metres)</text><line x1=\"166.7\" y1=\"298.4\" x2=\"456.7\" y2=\"77.9\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"255.6\" cy=\"230.7\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"356.1\" cy=\"154.3\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"166.7\" cy=\"307.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"182.1\" cy=\"289.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"271.1\" cy=\"204.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"278.8\" cy=\"230.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"298.1\" cy=\"201.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"305.9\" cy=\"192.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"336.8\" cy=\"157.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"352.3\" cy=\"145.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"406.4\" cy=\"104.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"433.5\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"448.9\" cy=\"107.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"456.7\" cy=\"86.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "42 metres",
        "correct": false,
        "feedback": "Used halfway between the two marked heights, \\((29 + 55) \\div 2\\), giving 42 metres. Read the line at 57 across, not at the middle of the marked points."
      },
      {
        "text": "38 metres",
        "correct": true,
        "feedback": "Correct. The line rises 26 for every 26 across, a gradient of 1. From (48, 29) to 57 across is 9 further, so the line is at \\(29 + 1 \\times 9 = 38\\)."
      },
      {
        "text": "39 metres",
        "correct": false,
        "feedback": "Read the nearest plotted point, (59, 39), instead of the line, giving 39 metres. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "57 metres",
        "correct": false,
        "feedback": "Multiplied the gradient, 1, by 57 as if the line started at the origin, giving 57 metres. The line does not pass through (0, 0), so first find where it is at your value on the horizontal axis."
      }
    ],
    "backward": "Gradient and intercept, Ch10.",
    "forward": "Later in this chapter you decide when such an estimate can be trusted."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "tier": "T",
    "question": "A bar chart shows the attendances of two clubs: 21 and 29. Its vertical axis starts at 19 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "5 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 19, the bars are drawn with heights \\(29 - 19 = 10\\) and \\(21 - 19 = 2\\). So the second bar looks \\(10 \\div 2 = 5\\) times as tall, although the real values are close."
      },
      {
        "text": "10 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 19, 10, as the number of times, giving 10 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "8 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(29 - 21 = 8\\), giving 8 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "2 times as tall",
        "correct": false,
        "feedback": "Gave the height of the first bar, 2, giving 2 times as tall. Divide the second height by the first height."
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
    "tier": "C",
    "question": "The diagram shows the journey times of two groups, R and S. What is the median of group S?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the journey times: group R on the left and group S on the right, rows (left leaves, then right leaves) 2: 5 | 0 3 3 9; 3: 8 7 5 | 2; 4: - | 1; 5: 9 3 | 1; 6: 6 3 2 2 | 3 6 8; the key reads 3 | 5 means 35 minutes.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group R</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group S</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"302.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"317.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"178.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"178.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"163.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group R: 5 | 3 means 35 minutes</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group S: 3 | 5 means 35 minutes</text></svg></div>",
    "options": [
      {
        "text": "32 minutes",
        "correct": false,
        "feedback": "Took only the lower of the two middle values, 32, giving 32 minutes. With an even number of values the median is halfway between the two middle ones."
      },
      {
        "text": "36.5 minutes",
        "correct": true,
        "feedback": "Correct. Counting the leaves in order: there are 10 values, so the median is halfway between the 5th and 6th: \\((32 + 41) \\div 2 = 36.5\\)."
      },
      {
        "text": "44 minutes",
        "correct": false,
        "feedback": "Found the value halfway between the lowest and highest, \\((20 + 68) \\div 2\\), giving 44 minutes. The median is the middle value in order, not the middle of the range."
      },
      {
        "text": "41 minutes",
        "correct": false,
        "feedback": "Took only the upper of the two middle values, 41, giving 41 minutes. With an even number of values the median is halfway between the two middle ones."
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
    "tier": "H",
    "question": "The table gives the journey times of the commuters on one train; the frequency of each class is shown in brackets: \\(20 \\le t &lt; 30\\) (2); \\(30 \\le t &lt; 40\\) \\((x)\\); \\(40 \\le t &lt; 50\\) (6); \\(50 \\le t &lt; 60\\) (10); \\(60 \\le t &lt; 70\\) (10). The estimated mean time is 50 minutes. Find the value of x.",
    "options": [
      {
        "text": "12",
        "correct": false,
        "feedback": "Used the upper end of the unknown class, 40, instead of its midpoint, giving 12. Each class is represented by its midpoint, 35, when estimating a mean."
      },
      {
        "text": "8",
        "correct": true,
        "feedback": "Correct. The known classes give a total of midpoint×frequency of 1520 and 28 values. With x values at the midpoint 35, the mean is \\((1520 + 35x) \\div (28 + x) = 50\\). So \\(1520 + 35x = 50(28 + x) = 1400 + 50x\\), which gives \\(-15x = -120\\), so \\(x = 8\\)."
      },
      {
        "text": "36",
        "correct": false,
        "feedback": "Gave the total frequency, \\(2 + 6 + 10 + 10 + 8 = 36\\), instead of x. x is only the frequency of one class, the unknown one."
      },
      {
        "text": "6",
        "correct": false,
        "feedback": "Used the lower end of the unknown class, 30, instead of its midpoint, giving 6. Each class is represented by its midpoint, 35, when estimating a mean."
      }
    ],
    "backward": "Solving equations, Ch4, and the mean, from earlier stages.",
    "forward": "Later in this chapter you use the same idea to check estimates."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "tier": "T",
    "question": "The diagram shows a frequency polygon for the weekly screen times of the teenagers in a survey. How many teenagers have a time of 20 or more?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the weekly screen times of the teenagers in a survey: points plotted at the class midpoints and joined by straight lines, at (12.5, 1), (17.5, 5), (22.5, 10), (27.5, 18), (32.5, 10); the horizontal axis shows the time, y, in hours, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"282.3\" x2=\"534\" y2=\"282.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"254.9\" x2=\"534\" y2=\"254.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"200.1\" x2=\"534\" y2=\"200.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"172.7\" x2=\"534\" y2=\"172.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"145.3\" x2=\"534\" y2=\"145.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"117.9\" x2=\"534\" y2=\"117.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.1\" x2=\"534\" y2=\"63.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"35.7\" x2=\"534\" y2=\"35.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"268.6\" x2=\"64\" y2=\"268.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"273.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"241.2\" x2=\"64\" y2=\"241.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"245.7\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"213.8\" x2=\"64\" y2=\"213.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"218.3\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"186.4\" x2=\"64\" y2=\"186.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"190.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"131.6\" x2=\"64\" y2=\"131.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"136.1\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"104.2\" x2=\"64\" y2=\"104.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"108.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"76.8\" x2=\"64\" y2=\"76.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"81.3\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"49.4\" x2=\"64\" y2=\"49.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"53.9\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, y (hours)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,282.3 205.0,227.5 299.0,159.0 393.0,49.4 487.0,159.0\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"282.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"49.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "10 teenagers",
        "correct": false,
        "feedback": "Used only the class \\(20 \\le y &lt; 25\\), 10, giving 10 teenagers. A value of 20 or more also includes every class above it."
      },
      {
        "text": "28 teenagers",
        "correct": false,
        "feedback": "Left out the class that starts at 20: \\(18 + 10 = 28\\), giving 28 teenagers. The class \\(20 \\le y &lt; 25\\) starts at 20, so it is included."
      },
      {
        "text": "38 teenagers",
        "correct": true,
        "feedback": "Correct. The classes from \\(20 \\le y &lt; 25\\) upwards have heights 10, 18, 10, so \\(10 + 18 + 10 = 38\\)."
      },
      {
        "text": "6 teenagers",
        "correct": false,
        "feedback": "Found the number below 20 instead, \\(44 - 38 = 6\\), giving 6 teenagers. The question asks for 20 or more."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you use running totals to find the class that contains the median."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "H",
    "question": "The table gives the distances thrown by the pupils in a throwing event; the frequency of each class is given in brackets: \\(20 \\le d &lt; 30\\) (6); \\(30 \\le d &lt; 40\\) (11); \\(40 \\le d &lt; 50\\) (6); \\(50 \\le d &lt; 60\\) (2). Estimate the mean distance.",
    "options": [
      {
        "text": "915 metres",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(150 + 385 + 270 + 110 = 915\\), and did not divide, giving 915 metres. A mean needs dividing by the number of pupils, 25."
      },
      {
        "text": "31.6 metres",
        "correct": false,
        "feedback": "Used the lower end of each class instead of its midpoint: \\(120 + 330 + 240 + 100 = 790\\), then \\(\\div 25\\), giving 31.6 metres. Use the midpoint of each class, because the values are spread across the class."
      },
      {
        "text": "36.6 metres",
        "correct": true,
        "feedback": "Correct. The midpoints are 25, 35, 45, 55. The total of midpoint×frequency is \\(150 + 385 + 270 + 110 = 915\\), and the number of pupils is \\(6 + 11 + 6 + 2 = 25\\), so the estimated mean is \\(915 \\div 25 = 36.6\\)."
      },
      {
        "text": "40 metres",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((25 + 35 + 45 + 55) \\div 4\\), giving 40 metres. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "tier": "H",
    "question": "The diagram shows a scatter graph of house price against distance from the town centre. How many points have distance from the town centre less than 9 km and house price more than 317 thousand pounds?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of house price against distance from the town centre: 12 points at (2, 323), (3, 295), (4, 322), (5, 434), (6, 294), (7, 287), (8, 364), (10, 325), (11, 202), (13, 218), (14, 291), (15, 192); the horizontal axis shows distance from the town centre (km) and the vertical axis shows house price (thousand pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"306.2\" x2=\"534\" y2=\"306.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"247.4\" x2=\"534\" y2=\"247.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"208.2\" x2=\"534\" y2=\"208.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"188.6\" x2=\"534\" y2=\"188.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"149.4\" x2=\"534\" y2=\"149.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"90.6\" x2=\"534\" y2=\"90.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"31.8\" x2=\"534\" y2=\"31.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"99.0\" y1=\"22\" x2=\"99.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"157.0\" y1=\"22\" x2=\"157.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"215.0\" y1=\"22\" x2=\"215.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"273.0\" y1=\"22\" x2=\"273.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"331.0\" y1=\"22\" x2=\"331.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"389.0\" y1=\"22\" x2=\"389.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"447.0\" y1=\"22\" x2=\"447.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"505.0\" y1=\"22\" x2=\"505.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"267.0\" x2=\"534\" y2=\"267.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"71.0\" x2=\"534\" y2=\"71.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"267.0\" x2=\"70\" y2=\"267.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"271.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">350</text><line x1=\"65\" y1=\"71.0\" x2=\"70\" y2=\"71.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"75.5\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">450</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance from the town centre (km)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">House price (thousand pounds)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"128.0\" cy=\"146.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"157.0\" cy=\"173.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"147.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"215.0\" cy=\"37.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"244.0\" cy=\"174.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"273.0\" cy=\"181.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"106.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"360.0\" cy=\"144.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"389.0\" cy=\"265.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"447.0\" cy=\"249.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"476.0\" cy=\"177.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"505.0\" cy=\"274.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "4 points",
        "correct": true,
        "feedback": "Correct. The points with distance from the town centre less than 9 km and house price more than 317 thousand pounds are (2, 323), (4, 322), (5, 434), (8, 364), which makes 4."
      },
      {
        "text": "8 points",
        "correct": false,
        "feedback": "Counted the points that meet either condition, 8, giving 8 points. The word 'and' means a point has to meet both conditions at once."
      },
      {
        "text": "7 points",
        "correct": false,
        "feedback": "Counted only the points with distance from the town centre less than 9 km, 7, giving 7 points. Each point must also have house price more than 317 thousand pounds."
      },
      {
        "text": "5 points",
        "correct": false,
        "feedback": "Counted only the points with house price more than 317 thousand pounds, 5, giving 5 points. Each point must also have distance from the town centre less than 9 km."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you turn a count like this into a fraction of the whole."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Representing data",
    "tier": "S",
    "question": "The waiting times of 50 patients have been grouped into equal classes. A clinic manager wants to show the shape of the distribution of times. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A frequency polygon of the waiting times of the patients",
        "correct": true,
        "feedback": "Correct. Here you need to show the shape of grouped data, and a frequency polygon shows how grouped data are spread across equal classes."
      },
      {
        "text": "A bar chart of the waiting times of the patients",
        "correct": false,
        "feedback": "Chose \"A bar chart of the waiting times of the patients\". A bar chart compares the frequencies of separate categories, but here you need to show the shape of grouped data."
      },
      {
        "text": "A scatter graph of the waiting times of the patients",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the waiting times of the patients\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to show the shape of grouped data."
      },
      {
        "text": "A pie chart of the waiting times of the patients",
        "correct": false,
        "feedback": "Chose \"A pie chart of the waiting times of the patients\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to show the shape of grouped data."
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
    "tier": "T",
    "question": "The diagram shows the times to run 60 metres of two groups, T and U. How many values in group U are more than 11.1?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the times to run 60 metres: group T on the left and group U on the right, rows (left leaves, then right leaves) 8: 1 | 6; 9: 0 | 1 1 2 3 7; 10: 9 8 6 | -; 11: 3 3 | 0 1 8; 12: 9 5 0 | 2; the key reads 9 | 0 means 9 seconds.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"173.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group T</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group U</text><text x=\"225.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"203.0\" y1=\"42\" x2=\"203.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"247.0\" y1=\"42\" x2=\"247.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"225.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"257.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"225.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"257.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"317.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"225.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"178.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"163.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"225.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">11</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"178.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"257.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"225.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"178.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"163.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"257.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group T: 0 | 9 means 9 seconds</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group U: 9 | 0 means 9 seconds</text></svg></div>",
    "options": [
      {
        "text": "4",
        "correct": false,
        "feedback": "Counted every value from the row with stem 11 upwards, giving 4. Check each leaf in that row against the value itself: some are below it."
      },
      {
        "text": "7",
        "correct": false,
        "feedback": "Counted the values below 11.1 instead, giving 7. The question asks for the values above 11.1."
      },
      {
        "text": "2",
        "correct": true,
        "feedback": "Correct. The values above 11.1 are 11.8, 12.2, which is 2 values."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Counted the values of 11.1 or more, including 11.1 itself, giving 3. 'More than 11.1' does not include 11.1."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you group values like these into classes."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "H",
    "question": "The tables give the distances to school of two groups, X and Y. Group X: \\(4 \\le k &lt; 6\\) (2); \\(6 \\le k &lt; 8\\) (6); \\(8 \\le k &lt; 10\\) (9); \\(10 \\le k &lt; 12\\) (6); \\(12 \\le k &lt; 14\\) (2). Group Y: \\(4 \\le k &lt; 6\\) (1); \\(6 \\le k &lt; 8\\) (2); \\(8 \\le k &lt; 10\\) (11); \\(10 \\le k &lt; 12\\) (18); \\(12 \\le k &lt; 14\\) (8). Which statement is correct?",
    "options": [
      {
        "text": "Group Y has the higher estimated mean, by 195 km",
        "correct": false,
        "feedback": "Compared the totals of midpoint×frequency, which differ by 195, giving Group Y has the higher estimated mean, by 195 km. Each total must be divided by the number of values in its group before the groups are compared."
      },
      {
        "text": "Group Y has the higher estimated mean, by 1.5 km",
        "correct": true,
        "feedback": "Correct. Group X has \\(225 \\div 25 = 9\\) and group Y has \\(420 \\div 40 = 10.5\\), so group Y has the higher estimated mean, by 1.5 km."
      },
      {
        "text": "Group X has the higher estimated mean, by 1.5 km",
        "correct": false,
        "feedback": "Took the means the wrong way round: 9 for X and 10.5 for Y, giving Group X has the higher estimated mean, by 1.5 km. Estimate each mean by midpoint×frequency, add, then divide, and compare carefully."
      },
      {
        "text": "Group Y has the higher estimated mean, by 2 km",
        "correct": false,
        "feedback": "Compared the midpoints of the two modal classes, which differ by 2, giving Group Y has the higher estimated mean, by 2 km. The mean uses every class, not only the modal class."
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
    "tier": "H",
    "question": "The diagram shows a frequency polygon for the lengths of the films in a streaming library. Estimate the mean length.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the lengths of the films in a streaming library: points plotted at the class midpoints and joined by straight lines, at (105, 2), (115, 5), (125, 7), (135, 6); the horizontal axis shows the length, f, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">100</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">110</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">120</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">130</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">140</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Length, f (minutes)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,227.5 240.2,124.8 357.8,56.2 475.2,90.5\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"124.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"56.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"90.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "123.5 minutes",
        "correct": true,
        "feedback": "Correct. The midpoints are 105, 115, 125, 135. The total of midpoint×frequency is \\(210 + 575 + 875 + 810 = 2470\\), and the number of films is \\(2 + 5 + 7 + 6 = 20\\), so the estimated mean is \\(2470 \\div 20 = 123.5\\)."
      },
      {
        "text": "120 minutes",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((105 + 115 + 125 + 135) \\div 4\\), giving 120 minutes. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      },
      {
        "text": "118.5 minutes",
        "correct": false,
        "feedback": "Used the lower end of each class instead of its midpoint: \\(200 + 550 + 840 + 780 = 2370\\), then \\(\\div 20\\), giving 118.5 minutes. Use the midpoint of each class, because the values are spread across the class."
      },
      {
        "text": "5 minutes",
        "correct": false,
        "feedback": "Found the mean of the frequencies, \\(20 \\div 4\\), giving 5 minutes. The mean is of the values (marks, times, heights), not of the frequencies. Use the midpoints."
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
    "tier": "T",
    "question": "The table gives the amounts spent by the customers in a shop one afternoon; the frequency of each class is given in brackets: \\(20 \\le c &lt; 30\\) (3); \\(30 \\le c &lt; 40\\) (8); \\(40 \\le c &lt; 50\\) (9); \\(50 \\le c &lt; 60\\) (7). What is the greatest possible range of the amounts spent?",
    "options": [
      {
        "text": "30 pounds",
        "correct": false,
        "feedback": "Subtracted the midpoints of the first and last classes, \\(55 - 25\\), giving 30 pounds. Midpoints are not actual values. The greatest range comes from the outer ends of the classes."
      },
      {
        "text": "60 pounds",
        "correct": false,
        "feedback": "Gave the top end of the last class alone, 60, giving 60 pounds. A range is a difference, so take the lowest end, 20, away."
      },
      {
        "text": "20 pounds",
        "correct": false,
        "feedback": "Gave the smallest possible range, \\(50 - 30 = 20\\), giving 20 pounds. The greatest possible range uses the largest value the data could take and the smallest it could take."
      },
      {
        "text": "40 pounds",
        "correct": true,
        "feedback": "Correct. The largest possible value is just under 60 and the smallest possible is 20, so the greatest possible range is \\(60 - 20 = 40\\)."
      }
    ],
    "backward": "The range, from earlier stages.",
    "forward": "Later in this chapter you compare the spread of two data sets."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "tier": "C",
    "question": "The diagram shows a scatter graph of house price against distance from the town centre with a line of best fit that has been extended. Which estimate from the line is the least reliable?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of house price against distance from the town centre: 12 points at (1, 417), (2, 382), (3, 359), (4, 340), (5, 350), (6, 312), (7, 301), (10, 242), (11, 228), (12, 218), (14, 193), (15, 181); the horizontal axis shows distance from the town centre (km) and the vertical axis shows house price (thousand pounds), with a straight line of best fit drawn through (9, 269) and (13, 203), extended from 0 to 14 on the horizontal axis.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"306.2\" x2=\"534\" y2=\"306.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"247.4\" x2=\"534\" y2=\"247.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"208.2\" x2=\"534\" y2=\"208.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"188.6\" x2=\"534\" y2=\"188.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"149.4\" x2=\"534\" y2=\"149.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"90.6\" x2=\"534\" y2=\"90.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"31.8\" x2=\"534\" y2=\"31.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"99.0\" y1=\"22\" x2=\"99.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"157.0\" y1=\"22\" x2=\"157.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"215.0\" y1=\"22\" x2=\"215.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"273.0\" y1=\"22\" x2=\"273.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"331.0\" y1=\"22\" x2=\"331.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"389.0\" y1=\"22\" x2=\"389.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"447.0\" y1=\"22\" x2=\"447.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"505.0\" y1=\"22\" x2=\"505.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"267.0\" x2=\"534\" y2=\"267.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"71.0\" x2=\"534\" y2=\"71.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"267.0\" x2=\"70\" y2=\"267.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"271.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">350</text><line x1=\"65\" y1=\"71.0\" x2=\"70\" y2=\"71.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"75.5\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">450</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance from the town centre (km)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">House price (thousand pounds)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"70.0\" y1=\"53.8\" x2=\"505.0\" y2=\"296.4\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"331.0\" cy=\"199.4\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"447.0\" cy=\"264.1\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"99.0\" cy=\"54.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"128.0\" cy=\"88.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"157.0\" cy=\"111.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"129.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"215.0\" cy=\"120.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"244.0\" cy=\"157.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"273.0\" cy=\"168.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"360.0\" cy=\"225.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"389.0\" cy=\"239.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"249.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"476.0\" cy=\"273.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"505.0\" cy=\"285.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "distance from the town centre = 9",
        "correct": false,
        "feedback": "Chose distance from the town centre = 9. 9 is inside the plotted range, 1 to 15, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "distance from the town centre = 14",
        "correct": false,
        "feedback": "Chose distance from the town centre = 14. 14 is inside the plotted range, 1 to 15, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "distance from the town centre = 0",
        "correct": true,
        "feedback": "Correct. The plotted data only cover distance from the town centre from 1 to 15. 0 is outside that range, so using the line there is extrapolation, and the pattern may not continue."
      },
      {
        "text": "distance from the town centre = 6",
        "correct": false,
        "feedback": "Chose distance from the town centre = 6. 6 is inside the plotted range, 1 to 15, so this is interpolation, which is fairly reliable."
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
    "tier": "C",
    "question": "The reaction times in a data set run from 208 to 245. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(200 \\le r \\le 210\\), \\(210 \\le r \\le 220\\), \\(220 \\le r \\le 230\\), \\(230 \\le r \\le 240\\), \\(240 \\le r \\le 250\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 210 would fit in two classes, giving \\(200 \\le r \\le 210\\), \\(210 \\le r \\le 220\\), \\(220 \\le r \\le 230\\), \\(230 \\le r \\le 240\\), \\(240 \\le r \\le 250\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(210 \\le r &lt; 220\\), \\(220 \\le r &lt; 230\\), \\(230 \\le r &lt; 240\\), \\(240 \\le r &lt; 250\\), \\(250 \\le r &lt; 260\\)",
        "correct": false,
        "feedback": "Chose classes that start at 210, so the smallest value, 208, belongs to no class, giving \\(210 \\le r &lt; 220\\), \\(220 \\le r &lt; 230\\), \\(230 \\le r &lt; 240\\), \\(240 \\le r &lt; 250\\), \\(250 \\le r &lt; 260\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(200 \\le r &lt; 210\\), \\(210 \\le r &lt; 220\\), \\(220 \\le r &lt; 230\\), \\(230 \\le r &lt; 250\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(200 \\le r &lt; 210\\), \\(210 \\le r &lt; 220\\), \\(220 \\le r &lt; 230\\), \\(230 \\le r &lt; 250\\). Classes should all have the same width, so the frequencies can be compared fairly."
      },
      {
        "text": "\\(200 \\le r &lt; 210\\), \\(210 \\le r &lt; 220\\), \\(220 \\le r &lt; 230\\), \\(230 \\le r &lt; 240\\), \\(240 \\le r &lt; 250\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 10, the classes start at 200, which is at or below the smallest value, 208, and the last class reaches above the largest, 245. Each end value belongs to exactly one class because the upper end is left out."
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
    "tier": "H",
    "question": "The diagram compares the masses of newborn babies of two groups, C and D. Which statement is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 266\" width=\"480\" height=\"266\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of newborn babies: group C on the left and group D on the right, rows (left leaves, then right leaves) 2: 9 | -; 3: 9 7 6 3 0 | 2 6 8; 4: 6 4 3 2 2 | 1 4 6 7; 5: - | 1 1 1; the key reads 3 | 0 means 3 kg.\"><rect width=\"480\" height=\"266\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group C</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group D</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"176\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"176\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"155.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"240.0\" y=\"206\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group C: 0 | 3 means 3 kg</text><text x=\"240.0\" y=\"226\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group D: 3 | 0 means 3 kg</text></svg></div>",
    "options": [
      {
        "text": "Group D has both the higher median and the larger range",
        "correct": true,
        "feedback": "Correct. Group C has median 3.9 and range 1.7. Group D has median 4.5 and range 1.9. So group D has the higher median and group D has the larger range."
      },
      {
        "text": "Group D has the higher median, but group C has the larger range",
        "correct": false,
        "feedback": "Took the ranges the wrong way round: 1.7 for C and 1.9 for D, giving Group D has the higher median, but group C has the larger range. The larger range belongs to the group whose highest and lowest values are further apart."
      },
      {
        "text": "Group C has both the higher median and the larger range",
        "correct": false,
        "feedback": "Reversed both comparisons, giving Group C has both the higher median and the larger range. Work out the median and the range of each group separately, then compare each pair."
      },
      {
        "text": "Group C has the higher median, but group D has the larger range",
        "correct": false,
        "feedback": "Took the medians the wrong way round: 3.9 for C and 4.5 for D, giving Group C has the higher median, but group D has the larger range. Find each median by counting to the middle of each group, and compare them carefully."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you decide what such a comparison does and does not show."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "tier": "T",
    "question": "The waiting times, in minutes, of 6 patients are: 7, 4, 46, 10, 9, 8. Which of these is least affected by the unusually large value, 46?",
    "options": [
      {
        "text": "The total, 84 minutes",
        "correct": false,
        "feedback": "Chose \"The total, 84 minutes\". The total includes 46, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 14 minutes",
        "correct": false,
        "feedback": "Chose \"The mean, 14 minutes\": the values add to 84, and \\(84 \\div 6 = 14\\). The mean uses every value, so the unusual value 46 pulls it upwards. The median is not pulled in the same way."
      },
      {
        "text": "The range, 42 minutes",
        "correct": false,
        "feedback": "Chose \"The range, 42 minutes\": \\(46 - 4 = 42\\). The range uses the highest value, 46, so it is changed most by an unusual value. It is also a measure of spread, not an average."
      },
      {
        "text": "The median, 8.5 minutes",
        "correct": true,
        "feedback": "Correct. In order the values are 4, 7, 8, 9, 10, 46. The median is halfway between the middle two values, 8.5, and replacing 46 with a larger number would not change it. The mean, 14, would change."
      }
    ],
    "backward": "The median and the mean, from earlier stages.",
    "forward": "Later in this chapter you choose the best average to describe data with an unusual value."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "tier": "S",
    "question": "The diagram shows a frequency polygon for the ages of the members of a sports club. What fraction of the members are in the class \\(70 \\le a &lt; 80\\)? Give the fraction in its simplest form.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the ages of the members of a sports club: points plotted at the class midpoints and joined by straight lines, at (35, 10), (45, 22), (55, 13), (65, 4), (75, 1); the horizontal axis shows the age, a, in years, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"284.6\" x2=\"534\" y2=\"284.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"238.9\" x2=\"534\" y2=\"238.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"216.1\" x2=\"534\" y2=\"216.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"170.4\" x2=\"534\" y2=\"170.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"147.6\" x2=\"534\" y2=\"147.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"101.9\" x2=\"534\" y2=\"101.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"79.1\" x2=\"534\" y2=\"79.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"33.4\" x2=\"534\" y2=\"33.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.2\" x2=\"64\" y2=\"273.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"277.7\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"250.3\" x2=\"64\" y2=\"250.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"254.8\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"181.8\" x2=\"64\" y2=\"181.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"186.3\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"136.2\" x2=\"64\" y2=\"136.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"140.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"67.7\" x2=\"64\" y2=\"67.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"72.2\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"59\" y1=\"44.8\" x2=\"64\" y2=\"44.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"49.3\" text-anchor=\"end\" fill=\"#1f2937\">22</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">24</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">80</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age, a (years)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,181.8 205.0,44.8 299.0,147.6 393.0,250.3 487.0,284.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"181.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"44.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"147.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"250.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"284.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{49}{50}\\)",
        "correct": false,
        "feedback": "Found the fraction outside the class instead, \\(\\frac{50 - 1}{50}\\), giving \\(\\frac{49}{50}\\). The question asks for the fraction inside the class, so use its own frequency on top."
      },
      {
        "text": "\\(\\frac{1}{22}\\)",
        "correct": false,
        "feedback": "Compared the class with the tallest class instead of with the total, giving \\(\\frac{1}{22}\\). A fraction of all the members has the total, 50, on the bottom."
      },
      {
        "text": "\\(\\frac{1}{50}\\)",
        "correct": true,
        "feedback": "Correct. The class has 1 of the \\(10 + 22 + 13 + 4 + 1 = 50\\) members, so the fraction is \\(\\frac{1}{50}\\)."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Put the frequency over the number of classes, \\(\\frac{1}{5}\\). The bottom of the fraction is the total number of members, not the number of classes."
      }
    ],
    "backward": "Fractions, Ch8.",
    "forward": "Later in this chapter you find the same fraction from grouped data in a table."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "tier": "S",
    "question": "The table gives the waiting times of the patients at a clinic one morning; the frequency of each class is given in brackets: \\(20 \\le x &lt; 25\\) (2); \\(25 \\le x &lt; 30\\) (13); \\(30 \\le x &lt; 35\\) (16); \\(35 \\le x &lt; 40\\) (9); \\(40 \\le x &lt; 45\\) (3). How many patients have a time of less than 35?",
    "options": [
      {
        "text": "12 patients",
        "correct": false,
        "feedback": "Found the number of 35 or more instead, \\(43 - 31 = 12\\), giving 12 patients. The question asks for the patients below 35."
      },
      {
        "text": "15 patients",
        "correct": false,
        "feedback": "Left out the class just below 35, 16, giving 15 patients. That class lies completely below 35, so it is included."
      },
      {
        "text": "16 patients",
        "correct": false,
        "feedback": "Used only the class just below 35, 16, giving 16 patients. 'Less than 35' includes every class below it."
      },
      {
        "text": "31 patients",
        "correct": true,
        "feedback": "Correct. The classes below 35 have frequencies 2, 13, 16, so \\(2 + 13 + 16 = 31\\)."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use running totals like this to find the class containing the median."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "In a frequency table the class \\(15 \\le n &lt; 20\\) has frequency 2. At what coordinates is its point plotted on a frequency polygon?",
    "options": [
      {
        "text": "(17.5, 2)",
        "correct": true,
        "feedback": "Correct. The point is plotted at the midpoint of the class, \\((15 + 20) \\div 2 = 17.5\\), and at a height equal to the frequency, 2, so it is (17.5, 2)."
      },
      {
        "text": "(2, 17.5)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving (2, 17.5). A point is written (across, up): the midpoint of the class goes first and the frequency second."
      },
      {
        "text": "(15, 2)",
        "correct": false,
        "feedback": "Plotted at the lower end of the class, 15, giving (15, 2). The point goes at the middle of the class, not at either end."
      },
      {
        "text": "(20, 2)",
        "correct": false,
        "feedback": "Plotted at the upper end of the class, 20, giving (20, 2). The point goes at the middle of the class, not at either end."
      }
    ],
    "backward": "Plotting coordinates, Ch10.",
    "forward": "Later in this chapter you read coordinates back off a polygon to estimate a mean."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "What is the midpoint of the class \\(50 \\le d &lt; 60\\)?",
    "options": [
      {
        "text": "10",
        "correct": false,
        "feedback": "Gave the class width, \\(60 - 50 = 10\\). The width is the length of the class. The midpoint is a position inside it."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Gave half the class width, \\(10 \\div 2\\), giving 5. Half the width is the distance from an end to the midpoint. Add it to the lower end, 50."
      },
      {
        "text": "55",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((50 + 60) \\div 2 = 55\\)."
      },
      {
        "text": "50",
        "correct": false,
        "feedback": "Used the lower end of the class, 50. The midpoint lies halfway between the two ends of the class."
      }
    ],
    "backward": "The mean of two numbers, from earlier stages.",
    "forward": "Later in this chapter you multiply each midpoint by its frequency to estimate the mean."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of resale price against age of a phone. Which description fits the correlation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of resale price against age of a phone: 12 points at (1, 136), (1, 347), (2, 288), (3, 245), (4, 224), (4, 261), (4, 67), (5, 143), (5, 379), (6, 236), (6, 283), (6, 371); the horizontal axis shows age of a phone (years) and the vertical axis shows resale price (pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"308.6\" x2=\"534\" y2=\"308.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"293.9\" x2=\"534\" y2=\"293.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"264.6\" x2=\"534\" y2=\"264.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"249.8\" x2=\"534\" y2=\"249.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"220.4\" x2=\"534\" y2=\"220.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.1\" x2=\"534\" y2=\"191.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"176.3\" x2=\"534\" y2=\"176.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"161.7\" x2=\"534\" y2=\"161.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"147.0\" x2=\"534\" y2=\"147.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"117.5\" x2=\"534\" y2=\"117.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"102.8\" x2=\"534\" y2=\"102.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"88.2\" x2=\"534\" y2=\"88.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"73.5\" x2=\"534\" y2=\"73.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"44.1\" x2=\"534\" y2=\"44.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"29.4\" x2=\"534\" y2=\"29.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"279.2\" x2=\"534\" y2=\"279.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"205.8\" x2=\"534\" y2=\"205.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"132.2\" x2=\"534\" y2=\"132.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"58.8\" x2=\"534\" y2=\"58.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"279.2\" x2=\"70\" y2=\"279.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"283.8\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"205.8\" x2=\"70\" y2=\"205.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"210.2\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"132.2\" x2=\"70\" y2=\"132.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"136.8\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"58.8\" x2=\"70\" y2=\"58.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"63.2\" text-anchor=\"end\" fill=\"#1f2937\">350</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">1</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">3</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">7</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age of a phone (years)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Resale price (pounds)</text><circle cx=\"136.3\" cy=\"216.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"136.3\" cy=\"61.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"104.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"135.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"151.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"124.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"266.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"210.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"37.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"142.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"108.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"43.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "Strong positive correlation between age of a phone and resale price",
        "correct": false,
        "feedback": "Joined a few high points together as if they made a line, giving Strong positive correlation between age of a phone and resale price. Most points do not line up. There is no strong pattern, or any pattern at all."
      },
      {
        "text": "Weak positive correlation between age of a phone and resale price",
        "correct": false,
        "feedback": "Saw a slight upward drift in the points, giving Weak positive correlation between age of a phone and resale price. The points do not follow any direction. They are scattered with no pattern."
      },
      {
        "text": "Weak negative correlation between age of a phone and resale price",
        "correct": false,
        "feedback": "Saw a slight downward drift in the points, giving Weak negative correlation between age of a phone and resale price. The points do not follow any direction. They are scattered with no pattern."
      },
      {
        "text": "No correlation between age of a phone and resale price",
        "correct": true,
        "feedback": "Correct. The points are scattered with no clear direction, so there is no correlation between age of a phone and resale price."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you decide which graph suits which kind of data."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The heights in a data set run from 28 to 68. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(20 \\le h \\le 30\\), \\(30 \\le h \\le 40\\), \\(40 \\le h \\le 50\\), \\(50 \\le h \\le 60\\), \\(60 \\le h \\le 70\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 30 would fit in two classes, giving \\(20 \\le h \\le 30\\), \\(30 \\le h \\le 40\\), \\(40 \\le h \\le 50\\), \\(50 \\le h \\le 60\\), \\(60 \\le h \\le 70\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(20 \\le h &lt; 30\\), \\(30 \\le h &lt; 40\\), \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 10, the classes start at 20, which is at or below the smallest value, 28, and the last class reaches above the largest, 68. Each end value belongs to exactly one class because the upper end is left out."
      },
      {
        "text": "\\(30 \\le h &lt; 40\\), \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\), \\(70 \\le h &lt; 80\\)",
        "correct": false,
        "feedback": "Chose classes that start at 30, so the smallest value, 28, belongs to no class, giving \\(30 \\le h &lt; 40\\), \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\), \\(70 \\le h &lt; 80\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(20 \\le h &lt; 30\\), \\(30 \\le h &lt; 40\\), \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 70\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(20 \\le h &lt; 30\\), \\(30 \\le h &lt; 40\\), \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 70\\). Classes should all have the same width, so the frequencies can be compared fairly."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the scores in a quiz of two groups, J and K. What is the lowest value in group K?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the scores in a quiz: group J on the left and group K on the right, rows (left leaves, then right leaves) 1: 2 1 | 0 7; 2: 9 | -; 3: 2 0 | 0 7 7 8; 4: 8 4 3 3 2 | 1 3 4 6; 5: - | 8; the key reads 2 | 9 means 29.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group J</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group K</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"324.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group J: 9 | 2 means 29</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group K: 2 | 9 means 29</text></svg></div>",
    "options": [
      {
        "text": "11",
        "correct": false,
        "feedback": "Read the lowest value in group J instead, 11. The question asks about group K."
      },
      {
        "text": "10",
        "correct": true,
        "feedback": "Correct. The lowest value is in the first row, and the leaf closest to the stem is the smallest, so the lowest value is 10."
      },
      {
        "text": "58",
        "correct": false,
        "feedback": "Read the highest value, 58. The lowest value is in the first row, not the last."
      },
      {
        "text": "17",
        "correct": false,
        "feedback": "Read the leaf furthest from the stem in the first row, 17. In each row the smallest leaf is the one next to the stem, so read in towards the stem."
      }
    ],
    "backward": "Multiplying and dividing by powers of 10, Ch3.",
    "forward": "Later in this chapter you use the lowest and highest values to find the range."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the masses of the parcels delivered to a depot one morning; the frequency of each class is given in brackets: \\(20 \\le w &lt; 25\\) (7); \\(25 \\le w &lt; 30\\) (8); \\(30 \\le w &lt; 35\\) (6); \\(35 \\le w &lt; 40\\) (2); \\(40 \\le w &lt; 45\\) (1); \\(45 \\le w &lt; 50\\) (1). What percentage of the parcels are in the class \\(30 \\le w &lt; 35\\)?",
    "options": [
      {
        "text": "75%",
        "correct": false,
        "feedback": "Divided by the tallest frequency, 8, giving 75%. Divide by the total number of parcels, 25."
      },
      {
        "text": "6%",
        "correct": false,
        "feedback": "Gave the frequency, 6, as the percentage, giving 6%. A percentage is out of 100. Divide by the total, 25, then multiply by 100."
      },
      {
        "text": "76%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 24 = 76\\), giving 76%. The question asks for the percentage inside the class."
      },
      {
        "text": "24%",
        "correct": true,
        "feedback": "Correct. The class has 6 of the \\(7 + 8 + 6 + 2 + 1 + 1 = 25\\) parcels, so the percentage is \\(6 \\div 25 \\times 100 = 24\\%\\)."
      }
    ],
    "backward": "Percentages, Ch3.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows two frequency polygons on the same axes, group E and group F, for the distances to school. Which statement about the modal classes is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the distances to school, group E (solid line) at (5, 1), (7, 5), (9, 11), (11, 6), (13, 1) and group F (dashed line) at (5, 6), (7, 9), (9, 7), (11, 1), (13, 1); the horizontal axis shows the distance, k, in km, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.8\" x2=\"534\" y2=\"273.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"251.7\" x2=\"534\" y2=\"251.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"229.5\" x2=\"534\" y2=\"229.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"185.2\" x2=\"534\" y2=\"185.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"140.8\" x2=\"534\" y2=\"140.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"96.5\" x2=\"534\" y2=\"96.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.2\" x2=\"534\" y2=\"52.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"30\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"30\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"30\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"30\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.8\" x2=\"64\" y2=\"273.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"278.3\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"251.7\" x2=\"64\" y2=\"251.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"256.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"229.5\" x2=\"64\" y2=\"229.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"234.0\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"207.3\" x2=\"64\" y2=\"207.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"211.8\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"185.2\" x2=\"64\" y2=\"185.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"189.7\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"163.0\" x2=\"64\" y2=\"163.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"167.5\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"140.8\" x2=\"64\" y2=\"140.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"145.3\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"118.7\" x2=\"64\" y2=\"118.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"123.2\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"96.5\" x2=\"64\" y2=\"96.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"101.0\" text-anchor=\"end\" fill=\"#1f2937\">9</text><line x1=\"59\" y1=\"74.3\" x2=\"64\" y2=\"74.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"78.8\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"52.2\" x2=\"64\" y2=\"52.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"56.7\" text-anchor=\"end\" fill=\"#1f2937\">11</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance, k (km)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,273.8 205.0,185.2 299.0,52.2 393.0,163.0 487.0,273.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"273.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"185.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"52.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"163.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"273.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"111.0,163.0 205.0,96.5 299.0,140.8 393.0,273.8 487.0,273.8\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"107.0\" y=\"159.0\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"201.0\" y=\"92.5\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"295.0\" y=\"136.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"389.0\" y=\"269.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"483.0\" y=\"269.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group E</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group F</text></svg></div>",
    "options": [
      {
        "text": "Group E is modal in \\(6 \\le k &lt; 8\\) and group F is modal in \\(8 \\le k &lt; 10\\)",
        "correct": false,
        "feedback": "Swapped the two groups: read group E's polygon as group F's, giving Group E is modal in \\(6 \\le k &lt; 8\\) and group F is modal in \\(8 \\le k &lt; 10\\). Group E is the solid line. Its highest point is at the class \\(8 \\le k &lt; 10\\)."
      },
      {
        "text": "Group E is modal in \\(8 \\le k &lt; 10\\) and group F is modal in \\(6 \\le k &lt; 8\\)",
        "correct": true,
        "feedback": "Correct. The highest point of group E is 11, at the class \\(8 \\le k &lt; 10\\). The highest point of group F is 9, at the class \\(6 \\le k &lt; 8\\)."
      },
      {
        "text": "Both groups are modal in \\(8 \\le k &lt; 10\\)",
        "correct": false,
        "feedback": "Read the highest point of group E only, the class \\(8 \\le k &lt; 10\\), giving Both groups are modal in \\(8 \\le k &lt; 10\\). Each polygon has its own highest point. Group F's is at the class \\(6 \\le k &lt; 8\\)."
      },
      {
        "text": "Both groups are modal in \\(6 \\le k &lt; 8\\)",
        "correct": false,
        "feedback": "Read the highest point of group F only, the class \\(6 \\le k &lt; 8\\), giving Both groups are modal in \\(6 \\le k &lt; 8\\). Each polygon has its own highest point. Group E's is at the class \\(8 \\le k &lt; 10\\)."
      }
    ],
    "backward": "Reading and comparing values on a graph, Ch10.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the test marks of a Year 9 class; the frequency of each class is given in brackets: \\(0 \\le m &lt; 10\\) (1); \\(10 \\le m &lt; 20\\) (5); \\(20 \\le m &lt; 30\\) (6); \\(30 \\le m &lt; 40\\) (10); \\(40 \\le m &lt; 50\\) (7). Which class is the modal class?",
    "options": [
      {
        "text": "\\(30 \\le m &lt; 40\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 10, which belongs to the class \\(30 \\le m &lt; 40\\), so that is the modal class."
      },
      {
        "text": "\\(0 \\le m &lt; 10\\)",
        "correct": false,
        "feedback": "Chose the first class, giving \\(0 \\le m &lt; 10\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(10 \\le m &lt; 20\\)",
        "correct": false,
        "feedback": "Chose the class \\(10 \\le m &lt; 20\\), which has frequency 5, giving \\(10 \\le m &lt; 20\\). The modal class has the highest frequency, 10."
      },
      {
        "text": "\\(40 \\le m &lt; 50\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(40 \\le m &lt; 50\\). The modal class has the highest frequency."
      }
    ],
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of value of the car against age of a car. Look at the point where age of a car is 10 years. What is the value of the car for that point?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of value of the car against age of a car: 12 points at (1, 22), (2, 19), (3, 17), (4, 16), (5, 14), (6, 12), (7, 11), (8, 11), (9, 8), (10, 6), (11, 5), (12, 4); the horizontal axis shows age of a car (years) and the vertical axis shows value of the car (thousand pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"103.1\" y1=\"22\" x2=\"103.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"169.4\" y1=\"22\" x2=\"169.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"235.7\" y1=\"22\" x2=\"235.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"368.3\" y1=\"22\" x2=\"368.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"434.6\" y1=\"22\" x2=\"434.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"500.9\" y1=\"22\" x2=\"500.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">15</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">25</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age of a car (years)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Value of the car (thousand pounds)</text><circle cx=\"103.1\" cy=\"57.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"136.3\" cy=\"92.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"169.4\" cy=\"116.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"127.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"235.7\" cy=\"151.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"174.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"186.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"186.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"368.3\" cy=\"221.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"245.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"434.6\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"269.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "8 thousand pounds",
        "correct": false,
        "feedback": "Read the point on the other side, at 9, giving 8 thousand pounds. The point at 10 across is the one needed."
      },
      {
        "text": "10 thousand pounds",
        "correct": false,
        "feedback": "Gave the age of a car value, 10, as the answer, giving 10 thousand pounds. The value of the car is read up the vertical axis, not along the horizontal axis."
      },
      {
        "text": "6 thousand pounds",
        "correct": true,
        "feedback": "Correct. Go to 10 on the horizontal axis, find the point above it, then read across to the vertical axis: 6."
      },
      {
        "text": "5 thousand pounds",
        "correct": false,
        "feedback": "Read the point beside it, at 11, giving 5 thousand pounds. The point at 10 across is the one needed."
      }
    ],
    "backward": "Reading coordinates from a graph, Ch10.",
    "forward": "Later in this chapter you read values from a line of best fit in the same way."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the lengths of songs of two groups, C and D. How much higher is the higher median than the lower median?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the lengths of songs: group C on the left and group D on the right, rows (left leaves, then right leaves) 2: 5 3 2 2 | 8; 3: 5 | 6 7 7 7; 4: 3 | 0 4 8; 5: 7 4 | 9 9; 6: 0 | 3; the key reads 3 | 5 means 3.5 minutes.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group C</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group D</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"178.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"163.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"302.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"317.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"302.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group C: 5 | 3 means 3.5 minutes</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group D: 3 | 5 means 3.5 minutes</text></svg></div>",
    "options": [
      {
        "text": "0.5 minutes",
        "correct": true,
        "feedback": "Correct. Group D has median 4 and group C has median 3.5, so the difference is \\(4 - 3.5 = 0.5\\)."
      },
      {
        "text": "0.3 minutes",
        "correct": false,
        "feedback": "Compared the ranges instead, 3.8 and 3.5, giving 0.3 minutes. The question asks about the medians, the middle values, not the spread."
      },
      {
        "text": "0.6 minutes",
        "correct": false,
        "feedback": "Compared the lowest values, 2.8 and 2.2, giving 0.6 minutes. The median is the middle value in order, not the lowest."
      },
      {
        "text": "7.5 minutes",
        "correct": false,
        "feedback": "Added the two medians, 4 and 3.5, giving 7.5 minutes. 'How much higher' means subtract the smaller median from the larger."
      }
    ],
    "backward": "The median and finding a difference, from earlier stages.",
    "forward": "Later in this chapter you compare the medians of two groups."
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
  title: "Interpreting and Discussing Results — Speed & Strategy",
  subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
  description: "A 25-minute timed diagnostic mixing Speed, Core, Hard and Trap items across every data interpretation cluster.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> The diagnostic is timed: 25 minutes for 20 questions, which is about 75 seconds each. Each question carries a tag. S means speed: answer it on sight. C means core: work it steadily. H means hard: if it is taking more than two minutes, mark it and move on. T means trap: a tempting wrong answer is waiting, so slow down and ask what the question really wants (more than or at least, the total or one class, the highest possible or the typical, the height of a bar or its real value). Skip anything that stalls you and come back at the end. Your timing and your choices tell us as much as your score, so use the full strategy.</p><p>The clock starts when you begin question 1.</p>",
  timedSeconds: 1500
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

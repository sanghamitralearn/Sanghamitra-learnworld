// Interpreting and Discussing Results — Grade 8, Level 3 (Problem-Solving & Synthesis).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh15InterpretingResultsL3.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-15-interpreting-discussing-results";
const CHAPTER_NAME = "Interpreting and Discussing Results";
const LEVEL = 3;

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
    "question": "The diagram shows a frequency polygon for the masses of the dogs at a rescue centre. How many dogs have a mass of 10 or more?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the masses of the dogs at a rescue centre: points plotted at the class midpoints and joined by straight lines, at (2.5, 9), (7.5, 22), (12.5, 12), (17.5, 2), (22.5, 1); the horizontal axis shows the mass, b, in kg, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"284.6\" x2=\"534\" y2=\"284.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"238.9\" x2=\"534\" y2=\"238.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"216.1\" x2=\"534\" y2=\"216.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"170.4\" x2=\"534\" y2=\"170.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"147.6\" x2=\"534\" y2=\"147.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"101.9\" x2=\"534\" y2=\"101.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"79.1\" x2=\"534\" y2=\"79.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"33.4\" x2=\"534\" y2=\"33.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.2\" x2=\"64\" y2=\"273.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"277.7\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"250.3\" x2=\"64\" y2=\"250.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"254.8\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"181.8\" x2=\"64\" y2=\"181.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"186.3\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"136.2\" x2=\"64\" y2=\"136.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"140.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"67.7\" x2=\"64\" y2=\"67.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"72.2\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"59\" y1=\"44.8\" x2=\"64\" y2=\"44.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"49.3\" text-anchor=\"end\" fill=\"#1f2937\">22</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">24</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Mass, b (kg)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,193.2 205.0,44.8 299.0,159.0 393.0,273.2 487.0,284.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"193.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"44.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"273.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"284.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "15 dogs",
        "correct": true,
        "feedback": "Correct. The classes from \\(10 \\le b &lt; 15\\) upwards have heights 12, 2, 1, so \\(12 + 2 + 1 = 15\\)."
      },
      {
        "text": "12 dogs",
        "correct": false,
        "feedback": "Used only the class \\(10 \\le b &lt; 15\\), 12, giving 12 dogs. A value of 10 or more also includes every class above it."
      },
      {
        "text": "3 dogs",
        "correct": false,
        "feedback": "Left out the class that starts at 10: \\(2 + 1 = 3\\), giving 3 dogs. The class \\(10 \\le b &lt; 15\\) starts at 10, so it is included."
      },
      {
        "text": "37 dogs",
        "correct": false,
        "feedback": "Added the class below as well, 22, giving 37 dogs. That class ends at 10 and does not reach it, so it is not included."
      }
    ],
    "retryHint": "List the classes that fit the condition, read the height of each point and add.",
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you use running totals to find the class that contains the median."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the masses of the eggs from a farm in one day; the frequency of each class is given in brackets: \\(50 \\le g &lt; 55\\) (1); \\(55 \\le g &lt; 60\\) (2); \\(60 \\le g &lt; 65\\) (9); \\(65 \\le g &lt; 70\\) (17); \\(70 \\le g &lt; 75\\) (7); \\(75 \\le g &lt; 80\\) (1). How many eggs have a mass of less than 70?",
    "options": [
      {
        "text": "8 eggs",
        "correct": false,
        "feedback": "Found the number of 70 or more instead, \\(37 - 29 = 8\\), giving 8 eggs. The question asks for the eggs below 70."
      },
      {
        "text": "12 eggs",
        "correct": false,
        "feedback": "Left out the class just below 70, 17, giving 12 eggs. That class lies completely below 70, so it is included."
      },
      {
        "text": "17 eggs",
        "correct": false,
        "feedback": "Used only the class just below 70, 17, giving 17 eggs. 'Less than 70' includes every class below it."
      },
      {
        "text": "29 eggs",
        "correct": true,
        "feedback": "Correct. The classes below 70 have frequencies 1, 2, 9, 17, so \\(1 + 2 + 9 + 17 = 29\\)."
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
    "question": "The diagram shows a scatter graph of number of tickets sold against price of a ticket with a line of best fit. Use the line to estimate the number of tickets sold when price of a ticket is 21 pounds.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of tickets sold against price of a ticket: 12 points at (5, 198), (6, 186), (10, 161), (11, 149), (12, 133), (15, 115), (17, 122), (18, 96), (21, 80), (22, 53), (23, 63), (25, 39); the horizontal axis shows price of a ticket (pounds) and the vertical axis shows number of tickets sold, with a straight line of best fit drawn through (15, 119) and (21, 74).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"85.5\" y1=\"22\" x2=\"85.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"100.9\" y1=\"22\" x2=\"100.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"116.4\" y1=\"22\" x2=\"116.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"131.9\" y1=\"22\" x2=\"131.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"178.3\" y1=\"22\" x2=\"178.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"193.7\" y1=\"22\" x2=\"193.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"209.2\" y1=\"22\" x2=\"209.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"240.1\" y1=\"22\" x2=\"240.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"271.1\" y1=\"22\" x2=\"271.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"286.5\" y1=\"22\" x2=\"286.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"317.5\" y1=\"22\" x2=\"317.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"332.9\" y1=\"22\" x2=\"332.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"363.9\" y1=\"22\" x2=\"363.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"394.8\" y1=\"22\" x2=\"394.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"410.3\" y1=\"22\" x2=\"410.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"425.7\" y1=\"22\" x2=\"425.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"472.1\" y1=\"22\" x2=\"472.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"487.6\" y1=\"22\" x2=\"487.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"503.1\" y1=\"22\" x2=\"503.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"518.5\" y1=\"22\" x2=\"518.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Price of a ticket (pounds)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of tickets sold</text><line x1=\"147.3\" y1=\"87.9\" x2=\"456.7\" y2=\"264.3\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"302.0\" cy=\"176.1\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"394.8\" cy=\"229.0\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"147.3\" cy=\"83.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"162.8\" cy=\"97.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"126.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.1\" cy=\"140.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"159.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"180.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"332.9\" cy=\"172.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"348.4\" cy=\"203.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"394.8\" cy=\"221.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"410.3\" cy=\"253.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"425.7\" cy=\"241.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"456.7\" cy=\"270.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "231.5",
        "correct": false,
        "feedback": "Read where the line meets the vertical axis, 231.5. The meeting point is the starting value. The estimate needs the line at 21 across."
      },
      {
        "text": "74",
        "correct": true,
        "feedback": "Correct. The line rises \\(-45\\) for every 6 across, a gradient of \\(-7.5\\). From (15, 119) to 21 across is 6 further, so the line is at \\(119 + -7.5 \\times 6 = 74\\)."
      },
      {
        "text": "80",
        "correct": false,
        "feedback": "Read the nearest plotted point, (21, 80), instead of the line. The estimate comes from the line of best fit, not from one of the points."
      },
      {
        "text": "96.5",
        "correct": false,
        "feedback": "Used halfway between the two marked heights, \\((119 + 74) \\div 2\\), giving 96.5. Read the line at 21 across, not at the middle of the marked points."
      }
    ],
    "retryHint": "Go to the value on the horizontal axis, go up to the line (not to a plotted point), then read across.",
    "backward": "Gradient and intercept, Ch10.",
    "forward": "Later in this chapter you decide when such an estimate can be trusted."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A bar chart shows the scores of two teams: 27 and 55. Its vertical axis starts at 23 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "32 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 23, 32, as the number of times, giving 32 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "28 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(55 - 27 = 28\\), giving 28 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "8 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 23, the bars are drawn with heights \\(55 - 23 = 32\\) and \\(27 - 23 = 4\\). So the second bar looks \\(32 \\div 4 = 8\\) times as tall, although the real values are close."
      },
      {
        "text": "4 times as tall",
        "correct": false,
        "feedback": "Gave the height of the first bar, 4, giving 4 times as tall. Divide the second height by the first height."
      }
    ],
    "retryHint": "Measure each bar from the start of the vertical axis, then compare the two heights.",
    "backward": "Reading scales on graphs, Ch10, and ratio, Ch11.",
    "forward": "Later in this chapter you meet other features that make a graph misleading."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the masses of apples of two groups, M and N. How much higher is the higher median than the lower median?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of apples: group M on the left and group N on the right, rows (left leaves, then right leaves) 9: - | 8 9; 10: - | 2 3 3; 11: 6 3 0 | 8; 12: 5 4 2 | -; 13: 9 | 0 6; 14: 9 4 4 | 1; the key reads 10 | 2 means 102 grams.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group M</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group N</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"302.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">11</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"178.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"178.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">13</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">14</text><text x=\"208.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"193.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"178.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group M: 2 | 10 means 102 grams</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group N: 10 | 2 means 102 grams</text></svg></div>",
    "options": [
      {
        "text": "227.5 grams",
        "correct": false,
        "feedback": "Added the two medians, 124.5 and 103, giving 227.5 grams. 'How much higher' means subtract the smaller median from the larger."
      },
      {
        "text": "124.5 grams",
        "correct": false,
        "feedback": "Gave the median of group M itself, 124.5, giving 124.5 grams. Subtract the median of group N, 103, to find how much higher it is."
      },
      {
        "text": "21.5 grams",
        "correct": true,
        "feedback": "Correct. Group M has median 124.5 and group N has median 103, so the difference is \\(124.5 - 103 = 21.5\\)."
      },
      {
        "text": "4 grams",
        "correct": false,
        "feedback": "Compared the ranges instead, 39 and 43, giving 4 grams. The question asks about the medians, the middle values, not the spread."
      }
    ],
    "retryHint": "Find the median of each group, then subtract the smaller from the larger.",
    "backward": "The median and finding a difference, from earlier stages.",
    "forward": "Later in this chapter you compare the medians of two groups."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the reaction times of the volunteers in a reaction experiment; the frequency of each class is given in brackets: \\(300 \\le r &lt; 350\\) (3); \\(350 \\le r &lt; 400\\) (10); \\(400 \\le r &lt; 450\\) (13); \\(450 \\le r &lt; 500\\) (11); \\(500 \\le r &lt; 550\\) (3). What percentage of the volunteers are in the class \\(300 \\le r &lt; 350\\)?",
    "options": [
      {
        "text": "15%",
        "correct": false,
        "feedback": "Doubled the percentage, \\(2 \\times 7.5 = 15\\), giving 15%. The class has 3 of 40, which is 7.5%."
      },
      {
        "text": "3%",
        "correct": false,
        "feedback": "Gave the frequency, 3, as the percentage, giving 3%. A percentage is out of 100. Divide by the total, 40, then multiply by 100."
      },
      {
        "text": "92.5%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 7.5 = 92.5\\), giving 92.5%. The question asks for the percentage inside the class."
      },
      {
        "text": "7.5%",
        "correct": true,
        "feedback": "Correct. The class has 3 of the \\(3 + 10 + 13 + 11 + 3 = 40\\) volunteers, so the percentage is \\(3 \\div 40 \\times 100 = 7.5\\%\\)."
      }
    ],
    "retryHint": "Divide the frequency of the class by the total frequency, then multiply by 100.",
    "backward": "Percentages, Ch3.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows two frequency polygons on the same axes, one for each of the groups M and N, giving the weekly screen times. How many more teenagers from group M than from group N are in the class \\(35 \\le y &lt; 40\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the weekly screen times, group M (solid line) at (22.5, 9), (27.5, 12), (32.5, 10), (37.5, 7), (42.5, 3) and group N (dashed line) at (22.5, 8), (27.5, 16), (32.5, 8), (37.5, 2), (42.5, 1); the horizontal axis shows the time, y, in hours, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"281.2\" x2=\"534\" y2=\"281.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"251.7\" x2=\"534\" y2=\"251.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"222.1\" x2=\"534\" y2=\"222.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"192.6\" x2=\"534\" y2=\"192.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"133.4\" x2=\"534\" y2=\"133.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"103.9\" x2=\"534\" y2=\"103.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"30\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"30\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"30\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"30\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"266.4\" x2=\"64\" y2=\"266.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"270.9\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"236.9\" x2=\"64\" y2=\"236.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"241.4\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"207.3\" x2=\"64\" y2=\"207.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"211.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"177.8\" x2=\"64\" y2=\"177.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"182.3\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"148.2\" x2=\"64\" y2=\"148.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"152.7\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"118.7\" x2=\"64\" y2=\"118.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"123.2\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"89.1\" x2=\"64\" y2=\"89.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"93.6\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"59.6\" x2=\"64\" y2=\"59.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"64.1\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">45</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, y (hours)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,163.0 205.0,118.7 299.0,148.2 393.0,192.6 487.0,251.7\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"163.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"118.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"148.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"192.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"251.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"111.0,177.8 205.0,59.6 299.0,177.8 393.0,266.4 487.0,281.2\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"107.0\" y=\"173.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"201.0\" y=\"55.6\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"295.0\" y=\"173.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"389.0\" y=\"262.4\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"483.0\" y=\"277.2\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group M</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group N</text></svg></div>",
    "options": [
      {
        "text": "9 teenagers",
        "correct": false,
        "feedback": "Added the two heights, \\(7 + 2 = 9\\), giving 9 teenagers. 'How many more' means subtract."
      },
      {
        "text": "5 teenagers",
        "correct": true,
        "feedback": "Correct. At the class \\(35 \\le y &lt; 40\\) group M has height 7 and group N has height 2, so the difference is \\(7 - 2 = 5\\)."
      },
      {
        "text": "6 teenagers",
        "correct": false,
        "feedback": "Compared the two totals, 41 and 35, instead of the class \\(35 \\le y &lt; 40\\), giving 6 teenagers. Only the class asked for matters here, so compare the two heights at that class."
      },
      {
        "text": "4 teenagers",
        "correct": false,
        "feedback": "Compared the tallest points of the two polygons, 12 and 16, giving 4 teenagers. The question is about the class \\(35 \\le y &lt; 40\\), which is not always the tallest."
      }
    ],
    "retryHint": "Read both heights at the same class, then subtract.",
    "backward": "Reading and comparing values on a graph, Ch10.",
    "forward": "Later in this chapter you compare two sets of data using their averages and spread."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the distances to school of the pupils in a year group; the frequency of each class is given in brackets: \\(2 \\le k &lt; 4\\) (3); \\(4 \\le k &lt; 6\\) (5); \\(6 \\le k &lt; 8\\) (7); \\(8 \\le k &lt; 10\\) (9); \\(10 \\le k &lt; 12\\) (10); \\(12 \\le k &lt; 14\\) (6). Which class contains the median?",
    "options": [
      {
        "text": "\\(8 \\le k &lt; 10\\)",
        "correct": true,
        "feedback": "Correct. There are \\(3 + 5 + 7 + 9 + 10 + 6 = 40\\) values, so the median is halfway between the 20th and 21st values. The running totals are 3, 8, 15, 24, so both fall in the class \\(8 \\le k &lt; 10\\)."
      },
      {
        "text": "\\(2 \\le k &lt; 4\\)",
        "correct": false,
        "feedback": "Chose the class \\(2 \\le k &lt; 4\\), where the running total is only 3, giving \\(2 \\le k &lt; 4\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(4 \\le k &lt; 6\\)",
        "correct": false,
        "feedback": "Chose the class \\(4 \\le k &lt; 6\\), where the running total is only 8, giving \\(4 \\le k &lt; 6\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(6 \\le k &lt; 8\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(6 \\le k &lt; 8\\). Keep adding until the running total reaches the middle position among all the values."
      }
    ],
    "retryHint": "Add the frequencies as a running total until you reach the middle position among all the values.",
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the amounts spent by the customers in a shop one afternoon. Which class contains the median?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the amounts spent by the customers in a shop one afternoon: points plotted at the class midpoints and joined by straight lines, at (25, 1), (35, 5), (45, 7), (55, 12), (65, 18); the horizontal axis shows the amount, c, in pounds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"282.3\" x2=\"534\" y2=\"282.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"254.9\" x2=\"534\" y2=\"254.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"200.1\" x2=\"534\" y2=\"200.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"172.7\" x2=\"534\" y2=\"172.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"145.3\" x2=\"534\" y2=\"145.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"117.9\" x2=\"534\" y2=\"117.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.1\" x2=\"534\" y2=\"63.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"35.7\" x2=\"534\" y2=\"35.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"268.6\" x2=\"534\" y2=\"268.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"241.2\" x2=\"534\" y2=\"241.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"213.8\" x2=\"534\" y2=\"213.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.4\" x2=\"534\" y2=\"186.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"131.6\" x2=\"534\" y2=\"131.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"104.2\" x2=\"534\" y2=\"104.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"76.8\" x2=\"534\" y2=\"76.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"49.4\" x2=\"534\" y2=\"49.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"268.6\" x2=\"64\" y2=\"268.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"273.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"241.2\" x2=\"64\" y2=\"241.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"245.7\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"213.8\" x2=\"64\" y2=\"213.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"218.3\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"186.4\" x2=\"64\" y2=\"186.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"190.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"131.6\" x2=\"64\" y2=\"131.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"136.1\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"104.2\" x2=\"64\" y2=\"104.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"108.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"76.8\" x2=\"64\" y2=\"76.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"81.3\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"49.4\" x2=\"64\" y2=\"49.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"53.9\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Amount, c (pounds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,282.3 205.0,227.5 299.0,200.1 393.0,131.6 487.0,49.4\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"282.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"227.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"200.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"131.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"49.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(50 \\le c &lt; 60\\)",
        "correct": true,
        "feedback": "Correct. There are \\(1 + 5 + 7 + 12 + 18 = 43\\) values, so the middle value is the 22nd value. The running totals are 1, 6, 13, 25, so the 22nd value falls in the class \\(50 \\le c &lt; 60\\)."
      },
      {
        "text": "\\(60 \\le c &lt; 70\\)",
        "correct": false,
        "feedback": "Chose the modal class, which has the highest frequency, giving \\(60 \\le c &lt; 70\\). The median is the middle value, so it needs a running total of the frequencies. The tallest class is not necessarily the one that holds it."
      },
      {
        "text": "\\(40 \\le c &lt; 50\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(40 \\le c &lt; 50\\). Keep adding until the running total reaches the middle position among all the values."
      },
      {
        "text": "\\(20 \\le c &lt; 30\\)",
        "correct": false,
        "feedback": "Chose the class \\(20 \\le c &lt; 30\\), where the running total is only 1, giving \\(20 \\le c &lt; 30\\). The running total must reach the middle position, so keep adding until it does."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the waiting times of the patients at a clinic one morning; the frequency of each class is given in brackets: \\(10 \\le x &lt; 20\\) (6); \\(20 \\le x &lt; 30\\) (7); \\(30 \\le x &lt; 40\\) (4); \\(40 \\le x &lt; 50\\) (2); \\(50 \\le x &lt; 60\\) (1). Estimate the mean time.",
    "options": [
      {
        "text": "550 minutes",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(90 + 175 + 140 + 90 + 55 = 550\\), and did not divide, giving 550 minutes. A mean needs dividing by the number of patients, 20."
      },
      {
        "text": "110 minutes",
        "correct": false,
        "feedback": "Divided 550 by the number of classes, 5, giving 110 minutes. Divide by the total frequency, 20, which is the number of patients."
      },
      {
        "text": "35 minutes",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((15 + 25 + 35 + 45 + 55) \\div 5\\), giving 35 minutes. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      },
      {
        "text": "27.5 minutes",
        "correct": true,
        "feedback": "Correct. The midpoints are 15, 25, 35, 45, 55. The total of midpoint×frequency is \\(90 + 175 + 140 + 90 + 55 = 550\\), and the number of patients is \\(6 + 7 + 4 + 2 + 1 = 20\\), so the estimated mean is \\(550 \\div 20 = 27.5\\)."
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
    "question": "The diagram shows a scatter graph of arm span against height with a line of best fit. A student uses the line to estimate the arm span when height is 177 cm. Is this estimate reliable?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of arm span against height: 12 points at (152, 152), (153, 155), (158, 156), (164, 163), (168, 168), (169, 168), (173, 173), (174, 170), (176, 177), (178, 179), (181, 177), (185, 184); the horizontal axis shows height (cm) and the vertical axis shows arm span (cm), with a line of best fit drawn through (150, 150) and (163, 163).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"81.6\" y1=\"22\" x2=\"81.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"93.2\" y1=\"22\" x2=\"93.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"104.8\" y1=\"22\" x2=\"104.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"116.4\" y1=\"22\" x2=\"116.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"139.6\" y1=\"22\" x2=\"139.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"151.2\" y1=\"22\" x2=\"151.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"174.4\" y1=\"22\" x2=\"174.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"197.6\" y1=\"22\" x2=\"197.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"209.2\" y1=\"22\" x2=\"209.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"220.8\" y1=\"22\" x2=\"220.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"232.4\" y1=\"22\" x2=\"232.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"267.2\" y1=\"22\" x2=\"267.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"278.8\" y1=\"22\" x2=\"278.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"290.4\" y1=\"22\" x2=\"290.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"313.6\" y1=\"22\" x2=\"313.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"325.2\" y1=\"22\" x2=\"325.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"336.8\" y1=\"22\" x2=\"336.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"371.6\" y1=\"22\" x2=\"371.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"383.2\" y1=\"22\" x2=\"383.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"394.8\" y1=\"22\" x2=\"394.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"406.4\" y1=\"22\" x2=\"406.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"429.6\" y1=\"22\" x2=\"429.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"452.8\" y1=\"22\" x2=\"452.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"464.4\" y1=\"22\" x2=\"464.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"487.6\" y1=\"22\" x2=\"487.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"499.2\" y1=\"22\" x2=\"499.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"510.8\" y1=\"22\" x2=\"510.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"522.4\" y1=\"22\" x2=\"522.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">160</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">170</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">180</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">190</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">150</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">155</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">160</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">165</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">170</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">175</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">180</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">185</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">190</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Height (cm)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Arm span (cm)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><polyline points=\"81,322 85,310 89,322 93,310\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"70.0\" y1=\"257.2\" x2=\"476.0\" y2=\"51.4\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"70.0\" cy=\"257.2\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"220.8\" cy=\"180.8\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"93.2\" cy=\"245.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"104.8\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"162.8\" cy=\"221.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"232.4\" cy=\"180.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"278.8\" cy=\"151.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"290.4\" cy=\"151.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"336.8\" cy=\"122.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"348.4\" cy=\"139.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"371.6\" cy=\"98.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"394.8\" cy=\"86.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"429.6\" cy=\"98.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"476.0\" cy=\"57.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "Yes: a line of best fit can be used for any value of height",
        "correct": false,
        "feedback": "Said the line works for any height, giving Yes: a line of best fit can be used for any value of height. The line is only reliable inside the range of the data, and 177 is inside it."
      },
      {
        "text": "No: the line only works for the values that were plotted as points",
        "correct": false,
        "feedback": "Said the line works only at the plotted points, giving No: the line only works for the values that were plotted as points. The line of best fit can be used anywhere inside the range of the data, 152 to 185."
      },
      {
        "text": "No: the points are not exactly on the line",
        "correct": false,
        "feedback": "Said the estimate is unreliable because the points do not lie exactly on the line, giving No: the points are not exactly on the line. Points scatter around a line of best fit. Inside the range of the data the line still gives a fair estimate."
      },
      {
        "text": "Yes: 177 is inside the range of the data, so the estimate is fairly reliable",
        "correct": true,
        "feedback": "Correct. The plotted values of height run from 152 to 185, and 177 is inside that range, so the estimate is fairly reliable."
      }
    ],
    "backward": "Describing graphs, Ch10.",
    "forward": "Later in this chapter you decide how far a conclusion can be trusted."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "The marks of two classes have been grouped into the same equal classes. A teacher wants to compare the shapes of the two distributions on one set of axes. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A pie chart of the test marks of the two classes",
        "correct": false,
        "feedback": "Chose \"A pie chart of the test marks of the two classes\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A scatter graph of the test marks of the two classes",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the test marks of the two classes\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare the shape of two grouped data sets on the same axes."
      },
      {
        "text": "A pair of frequency polygons of the test marks of the two classes",
        "correct": true,
        "feedback": "Correct. Here you need to compare the shape of two grouped data sets on the same axes, and a pair of frequency polygons lets two grouped data sets be compared on the same scale."
      },
      {
        "text": "A bar chart of the test marks of the two classes",
        "correct": false,
        "feedback": "Chose \"A bar chart of the test marks of the two classes\". A bar chart compares the frequencies of separate categories, but here you need to compare the shape of two grouped data sets on the same axes."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the journey times of two groups, P and Q. A student says: 'Group Q has the higher median, so every value in group Q is higher than every value in group P.' Is the student correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the journey times: group P on the left and group Q on the right, rows (left leaves, then right leaves) 2: 6 | -; 3: 8 7 6 | 1 6 6 6; 4: - | 1 3; 5: 9 8 6 0 0 | 2; 6: 6 4 2 0 | 1 5 6; 7: - | 0 3 4 5; the key reads 3 | 6 means 36 minutes.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group P</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group Q</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"324.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"155.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"309.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"279.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"309.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"324.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group P: 6 | 3 means 36 minutes</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group Q: 3 | 6 means 36 minutes</text></svg></div>",
    "options": [
      {
        "text": "No: group P's highest value, 66 minutes, is above group Q's lowest value, 31 minutes",
        "correct": true,
        "feedback": "Correct. Group Q has the higher median, 56.5 minutes, but the lowest value in group Q is 31 minutes and the highest in group P is 66 minutes. The groups overlap, so a median alone cannot show that every value is higher."
      },
      {
        "text": "Yes: the groups cannot overlap when the medians, 56.5 minutes and 56 minutes, are different",
        "correct": false,
        "feedback": "Chose \"Yes: the groups cannot overlap when the medians, 56.5 minutes and 56 minutes, are different\". The groups can overlap even when one has a higher median. Compare the highest and lowest values."
      },
      {
        "text": "No: the medians, 56.5 minutes and 56 minutes, are too close together to compare",
        "correct": false,
        "feedback": "Chose \"No: the medians, 56.5 minutes and 56 minutes, are too close together to compare\". The medians are different, so one group has the higher middle value. The point is that the whole groups still overlap."
      },
      {
        "text": "Yes: a higher median means every value in group Q is above every value in group P",
        "correct": false,
        "feedback": "Chose \"Yes: a higher median means every value in group Q is above every value in group P\". The median compares the middle values only. Individual values can still overlap."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you meet other cases where a single number is not enough."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The tables give the masses of two groups, M and N. Group M: \\(40 \\le g &lt; 45\\) (6); \\(45 \\le g &lt; 50\\) (10); \\(50 \\le g &lt; 55\\) (6); \\(55 \\le g &lt; 60\\) (3). Group N: \\(40 \\le g &lt; 45\\) (7); \\(45 \\le g &lt; 50\\) (11); \\(50 \\le g &lt; 55\\) (5); \\(55 \\le g &lt; 60\\) (2). Which statement is correct?",
    "options": [
      {
        "text": "Group M has the higher estimated mean, by 0.8 grams",
        "correct": true,
        "feedback": "Correct. Group M has \\(1217.5 \\div 25 = 48.7\\) and group N has \\(1197.5 \\div 25 = 47.9\\), so group M has the higher estimated mean, by 0.8 grams."
      },
      {
        "text": "The two groups have the same estimated mean",
        "correct": false,
        "feedback": "Said the means were equal, giving The two groups have the same estimated mean. Work out each estimated mean separately: they differ."
      },
      {
        "text": "Group N has the higher estimated mean, by 0.8 grams",
        "correct": false,
        "feedback": "Took the means the wrong way round: 48.7 for M and 47.9 for N, giving Group N has the higher estimated mean, by 0.8 grams. Estimate each mean by midpoint×frequency, add, then divide, and compare carefully."
      },
      {
        "text": "Group M has the higher estimated mean, by 20 grams",
        "correct": false,
        "feedback": "Compared the totals of midpoint×frequency, which differ by 20, giving Group M has the higher estimated mean, by 20 grams. Each total must be divided by the number of values in its group before the groups are compared."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you decide how far a comparison of averages can be trusted."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the lifetimes of the batteries tested in a laboratory. Estimate the mean lifetime.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the lifetimes of the batteries tested in a laboratory: points plotted at the class midpoints and joined by straight lines, at (15, 6), (25, 10), (35, 7), (45, 1), (55, 1); the horizontal axis shows the lifetime, n, in hours, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.2\" x2=\"64\" y2=\"273.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"277.7\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"250.3\" x2=\"64\" y2=\"250.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"254.8\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"181.8\" x2=\"64\" y2=\"181.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"186.3\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"136.2\" x2=\"64\" y2=\"136.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"140.7\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">9</text><line x1=\"59\" y1=\"67.7\" x2=\"64\" y2=\"67.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"72.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"44.8\" x2=\"64\" y2=\"44.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"49.3\" text-anchor=\"end\" fill=\"#1f2937\">11</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Lifetime, n (hours)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,159.0 205.0,67.7 299.0,136.2 393.0,273.2 487.0,273.2\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"67.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"136.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"273.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"273.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "35 hours",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((15 + 25 + 35 + 45 + 55) \\div 5\\), giving 35 hours. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      },
      {
        "text": "27.4 hours",
        "correct": true,
        "feedback": "Correct. The midpoints are 15, 25, 35, 45, 55. The total of midpoint×frequency is \\(90 + 250 + 245 + 45 + 55 = 685\\), and the number of batteries is \\(6 + 10 + 7 + 1 + 1 = 25\\), so the estimated mean is \\(685 \\div 25 = 27.4\\)."
      },
      {
        "text": "685 hours",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(90 + 250 + 245 + 45 + 55 = 685\\), and did not divide, giving 685 hours. A mean needs dividing by the number of batteries, 25."
      },
      {
        "text": "137 hours",
        "correct": false,
        "feedback": "Divided 685 by the number of classes, 5, giving 137 hours. Divide by the total frequency, 25, which is the number of batteries."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the lengths of the calls to a help line in one hour; the frequency of each class is given in brackets: \\(5 \\le l &lt; 10\\) (5); \\(10 \\le l &lt; 15\\) (12); \\(15 \\le l &lt; 20\\) (14); \\(20 \\le l &lt; 25\\) (11); \\(25 \\le l &lt; 30\\) (6). What is the greatest possible range of the lengths?",
    "options": [
      {
        "text": "20 minutes",
        "correct": false,
        "feedback": "Subtracted the midpoints of the first and last classes, \\(27.5 - 7.5\\), giving 20 minutes. Midpoints are not actual values. The greatest range comes from the outer ends of the classes."
      },
      {
        "text": "30 minutes",
        "correct": false,
        "feedback": "Gave the top end of the last class alone, 30, giving 30 minutes. A range is a difference, so take the lowest end, 5, away."
      },
      {
        "text": "15 minutes",
        "correct": false,
        "feedback": "Gave the smallest possible range, \\(25 - 10 = 15\\), giving 15 minutes. The greatest possible range uses the largest value the data could take and the smallest it could take."
      },
      {
        "text": "25 minutes",
        "correct": true,
        "feedback": "Correct. The largest possible value is just under 30 and the smallest possible is 5, so the greatest possible range is \\(30 - 5 = 25\\)."
      }
    ],
    "backward": "The range, from earlier stages.",
    "forward": "Later in this chapter you compare the spread of two data sets."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of heating bill against outdoor temperature for a sample of cases. Which statement about the graph is best supported by the data?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of heating bill against outdoor temperature: 12 points at (1, 82), (2, 95), (5, 69), (6, 67), (7, 67), (8, 73), (10, 54), (11, 42), (14, 38), (15, 33), (19, 16), (20, 16); the horizontal axis shows outdoor temperature (°C) and the vertical axis shows heating bill (pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Outdoor temperature (°C)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Heating bill (pounds)</text><circle cx=\"88.6\" cy=\"74.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"107.1\" cy=\"36.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"162.8\" cy=\"113.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.4\" cy=\"119.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"199.9\" cy=\"119.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"218.5\" cy=\"101.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"157.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"274.2\" cy=\"192.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"329.8\" cy=\"204.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"348.4\" cy=\"219.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"422.6\" cy=\"269.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"441.2\" cy=\"269.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "There is no relationship between outdoor temperature and heating bill, so neither could affect the other",
        "correct": false,
        "feedback": "Said there is no relationship, giving There is no relationship between outdoor temperature and heating bill, so neither could affect the other. The points follow a clear direction, so there is correlation."
      },
      {
        "text": "A higher outdoor temperature tends to go with a lower heating bill, but this does not prove that it is the cause",
        "correct": true,
        "feedback": "Correct. The points show strong negative correlation, so a higher outdoor temperature tends to go with a lower heating bill. A scatter graph alone cannot show that one causes the other."
      },
      {
        "text": "A higher outdoor temperature is the cause of a lower heating bill, because the points follow a clear pattern",
        "correct": false,
        "feedback": "Said a higher outdoor temperature is the cause of a lower heating bill, giving A higher outdoor temperature is the cause of a lower heating bill, because the points follow a clear pattern. Correlation shows a relationship in the data. It does not prove that one thing causes the other: something else could be involved."
      },
      {
        "text": "A higher outdoor temperature tends to go with a higher heating bill, but this does not prove that it is the cause",
        "correct": false,
        "feedback": "Read the direction of the correlation the wrong way round, giving A higher outdoor temperature tends to go with a higher heating bill, but this does not prove that it is the cause. The points go down as outdoor temperature increases, so the relationship is negative."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you meet other ways a result can be misread."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the masses of potatoes of two groups as a back-to-back stem-and-leaf diagram. The same data could also be put in a grouped frequency table. What can the stem-and-leaf diagram show that the grouped table cannot?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of potatoes: group P on the left and group Q on the right, rows (left leaves, then right leaves) 12: 9 3 | 0 4 7; 13: 7 0 | 4 6 6 9; 14: 9 9 5 0 | 3 6; 15: 6 3 | 2 5; 16: 8 6 4 | 5 6 9; the key reads 13 | 0 means 130 grams.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group P</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group Q</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"302.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">13</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"302.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"317.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">14</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"178.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"163.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">15</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">16</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"178.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group P: 0 | 13 means 130 grams</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group Q: 13 | 0 means 130 grams</text></svg></div>",
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
        "text": "The estimated mean of group P",
        "correct": false,
        "feedback": "Chose \"The estimated mean of group P\". An estimated mean can be found from a grouped table, so it is not something only the stem-and-leaf diagram shows."
      },
      {
        "text": "The exact lowest value in group P, 123 grams",
        "correct": true,
        "feedback": "Correct. The diagram keeps every individual value, so the lowest value in group P, 123 grams, can be read exactly. A grouped table only says which class a value is in."
      }
    ],
    "backward": "Grouped frequency tables, from earlier stages.",
    "forward": "Later in this chapter you decide which diagram to use for which data."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the pulse rates of two groups, J and K. What is the mean of group J?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the pulse rates: group J on the left and group K on the right, rows (left leaves, then right leaves) 6: 8 6 5 4 0 | 6 9; 7: 6 6 2 | 3 7 8 8; 8: 4 1 | 0; 9: 5 3 | 1 2 6 9; 10: 1 | 4 7 8; the key reads 7 | 2 means 72 beats per minute.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group J</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group K</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"170.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"155.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"309.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"324.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"324.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"309.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group J: 2 | 7 means 72 beats per minute</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group K: 7 | 2 means 72 beats per minute</text></svg></div>",
    "options": [
      {
        "text": "76 beats per minute",
        "correct": false,
        "feedback": "Found the median instead, 76, giving 76 beats per minute. The mean uses every value, added up and shared out."
      },
      {
        "text": "200.2 beats per minute",
        "correct": false,
        "feedback": "Divided the total by the number of rows, 5, giving 200.2 beats per minute. Divide by the number of values, 13, not the number of rows."
      },
      {
        "text": "77 beats per minute",
        "correct": true,
        "feedback": "Correct. The 13 values add up to \\(60 + 64 + 65 + 66 + 68 + 72 + 76 + 76 + 81 + 84 + 93 + 95 + 101 = 1001\\), so the mean is \\(1001 \\div 13 = 77\\)."
      },
      {
        "text": "1001 beats per minute",
        "correct": false,
        "feedback": "Added the values, \\(60 + 64 + 65 + 66 + 68 + 72 + 76 + 76 + 81 + 84 + 93 + 95 + 101 = 1001\\), and did not divide, giving 1001 beats per minute. A mean needs dividing by the number of values, 13."
      }
    ],
    "backward": "The mean, from earlier stages, and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare the means of two groups."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The mean height of 30 students in group A is 144 cm. The mean height of 20 students in group B is 166 cm. What is the mean height of all 50 students together?",
    "options": [
      {
        "text": "152.8 cm",
        "correct": true,
        "feedback": "Correct. Group A has total \\(30 \\times 144 = 4320\\). Group B has total \\(20 \\times 166 = 3320\\). All 50 students have total \\(4320 + 3320 = 7640\\), so the mean is \\(7640 \\div 50 = 152.8\\) cm."
      },
      {
        "text": "3820 cm",
        "correct": false,
        "feedback": "Divided the total, 7640, by 2, the number of groups, giving 3820 cm. Divide by the number of values, 50, not the number of groups."
      },
      {
        "text": "155 cm",
        "correct": false,
        "feedback": "Found the mean of the two means, \\((144 + 166) \\div 2\\), giving 155 cm. The groups have different sizes, so the larger group counts for more. Use the total of all the values."
      },
      {
        "text": "7640 cm",
        "correct": false,
        "feedback": "Found the total of all the values, \\(30 \\times 144 + 20 \\times 166 = 7640\\), and did not divide, giving 7640 cm. Divide by the total number of values, 50."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you use means to compare groups."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows two frequency polygons on the same axes, one for each of the groups M and N, giving the weekly screen times. How many more teenagers from group M than from group N are in the class \\(15 \\le y &lt; 20\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the weekly screen times, group M (solid line) at (12.5, 7), (17.5, 14), (22.5, 8), (27.5, 1), (32.5, 1) and group N (dashed line) at (12.5, 2), (17.5, 5), (22.5, 11), (27.5, 6), (32.5, 1); the horizontal axis shows the time, y, in hours, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"279.4\" x2=\"534\" y2=\"279.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"262.8\" x2=\"534\" y2=\"262.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"246.1\" x2=\"534\" y2=\"246.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"229.5\" x2=\"534\" y2=\"229.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"212.9\" x2=\"534\" y2=\"212.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"196.2\" x2=\"534\" y2=\"196.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"179.6\" x2=\"534\" y2=\"179.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"146.4\" x2=\"534\" y2=\"146.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.1\" x2=\"534\" y2=\"113.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"96.5\" x2=\"534\" y2=\"96.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"79.9\" x2=\"534\" y2=\"79.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.2\" x2=\"534\" y2=\"63.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"46.6\" x2=\"534\" y2=\"46.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"262.8\" x2=\"534\" y2=\"262.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"229.5\" x2=\"534\" y2=\"229.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"196.2\" x2=\"534\" y2=\"196.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"96.5\" x2=\"534\" y2=\"96.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"63.2\" x2=\"534\" y2=\"63.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"30\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"30\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"30\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"30\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"262.8\" x2=\"64\" y2=\"262.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"267.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"229.5\" x2=\"64\" y2=\"229.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"234.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"196.2\" x2=\"64\" y2=\"196.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"200.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"163.0\" x2=\"64\" y2=\"163.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"167.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"129.8\" x2=\"64\" y2=\"129.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"134.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"96.5\" x2=\"64\" y2=\"96.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"101.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"63.2\" x2=\"64\" y2=\"63.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"67.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, y (hours)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,179.6 205.0,63.2 299.0,163.0 393.0,279.4 487.0,279.4\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"179.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"63.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"163.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"279.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"279.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"111.0,262.8 205.0,212.9 299.0,113.1 393.0,196.2 487.0,279.4\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"107.0\" y=\"258.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"201.0\" y=\"208.9\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"295.0\" y=\"109.1\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"389.0\" y=\"192.2\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"483.0\" y=\"275.4\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group M</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group N</text></svg></div>",
    "options": [
      {
        "text": "6 teenagers",
        "correct": false,
        "feedback": "Compared the two totals, 31 and 25, instead of the class \\(15 \\le y &lt; 20\\), giving 6 teenagers. Only the class asked for matters here, so compare the two heights at that class."
      },
      {
        "text": "3 teenagers",
        "correct": false,
        "feedback": "Compared the tallest points of the two polygons, 14 and 11, giving 3 teenagers. The question is about the class \\(15 \\le y &lt; 20\\), which is not always the tallest."
      },
      {
        "text": "5 teenagers",
        "correct": false,
        "feedback": "Read only the height for group N, 5, giving 5 teenagers. The question asks for the difference between the two heights, 14 and 5."
      },
      {
        "text": "9 teenagers",
        "correct": true,
        "feedback": "Correct. At the class \\(15 \\le y &lt; 20\\) group M has height 14 and group N has height 5, so the difference is \\(14 - 5 = 9\\)."
      }
    ],
    "backward": "Reading and comparing values on a graph, Ch10.",
    "forward": "Later in this chapter you compare two sets of data using their averages and spread."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the lifetimes of the batteries tested in a laboratory; the frequency of each class is given in brackets: \\(20 \\le n &lt; 25\\) (8); \\(25 \\le n &lt; 30\\) (13); \\(30 \\le n &lt; 35\\) (8); \\(35 \\le n &lt; 40\\) (4); \\(40 \\le n &lt; 45\\) (1); \\(45 \\le n &lt; 50\\) (1). Which class is the modal class?",
    "options": [
      {
        "text": "\\(25 \\le n &lt; 30\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 13, which belongs to the class \\(25 \\le n &lt; 30\\), so that is the modal class."
      },
      {
        "text": "\\(45 \\le n &lt; 50\\)",
        "correct": false,
        "feedback": "Chose the last class, giving \\(45 \\le n &lt; 50\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(30 \\le n &lt; 35\\)",
        "correct": false,
        "feedback": "Chose the class \\(30 \\le n &lt; 35\\), which has frequency 8, giving \\(30 \\le n &lt; 35\\). The modal class has the highest frequency, 13."
      },
      {
        "text": "\\(20 \\le n &lt; 25\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(20 \\le n &lt; 25\\). The modal class has the highest frequency."
      }
    ],
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of height against shoe size with a line of best fit that has been extended. Which estimate from the line is the least reliable?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of height against shoe size: 10 points at (3, 145), (4, 151), (5, 156), (6, 162), (7, 164), (8, 168), (9, 175), (10, 183), (11, 190), (12, 189); the horizontal axis shows shoe size and the vertical axis shows height (cm), with a straight line of best fit drawn through (8, 171) and (11, 186), extended from 0 to 10 on the horizontal axis.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"308.6\" x2=\"534\" y2=\"308.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"293.9\" x2=\"534\" y2=\"293.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"264.6\" x2=\"534\" y2=\"264.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"249.8\" x2=\"534\" y2=\"249.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"220.4\" x2=\"534\" y2=\"220.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.1\" x2=\"534\" y2=\"191.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"176.3\" x2=\"534\" y2=\"176.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"161.7\" x2=\"534\" y2=\"161.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"147.0\" x2=\"534\" y2=\"147.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"117.5\" x2=\"534\" y2=\"117.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"102.8\" x2=\"534\" y2=\"102.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"88.2\" x2=\"534\" y2=\"88.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"73.5\" x2=\"534\" y2=\"73.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"44.1\" x2=\"534\" y2=\"44.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"29.4\" x2=\"534\" y2=\"29.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"103.1\" y1=\"22\" x2=\"103.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"169.4\" y1=\"22\" x2=\"169.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"235.7\" y1=\"22\" x2=\"235.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"368.3\" y1=\"22\" x2=\"368.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"434.6\" y1=\"22\" x2=\"434.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"500.9\" y1=\"22\" x2=\"500.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"279.2\" x2=\"534\" y2=\"279.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"205.8\" x2=\"534\" y2=\"205.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"132.2\" x2=\"534\" y2=\"132.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"58.8\" x2=\"534\" y2=\"58.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">120</text><line x1=\"65\" y1=\"279.2\" x2=\"70\" y2=\"279.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"283.8\" text-anchor=\"end\" fill=\"#1f2937\">130</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"65\" y1=\"205.8\" x2=\"70\" y2=\"205.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"210.2\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">160</text><line x1=\"65\" y1=\"132.2\" x2=\"70\" y2=\"132.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"136.8\" text-anchor=\"end\" fill=\"#1f2937\">170</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">180</text><line x1=\"65\" y1=\"58.8\" x2=\"70\" y2=\"58.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"63.2\" text-anchor=\"end\" fill=\"#1f2937\">190</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Shoe size</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Height (cm)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"70.0\" y1=\"275.6\" x2=\"467.7\" y2=\"55.1\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"335.1\" cy=\"128.6\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"434.6\" cy=\"73.5\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"169.4\" cy=\"224.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"202.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"235.7\" cy=\"183.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"161.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"154.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"139.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"368.3\" cy=\"113.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"84.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"434.6\" cy=\"58.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"62.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "shoe size = 4",
        "correct": false,
        "feedback": "Chose shoe size = 4. 4 is inside the plotted range, 3 to 12, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "shoe size = 10",
        "correct": false,
        "feedback": "Chose shoe size = 10. 10 is inside the plotted range, 3 to 12, so this is interpolation, which is fairly reliable."
      },
      {
        "text": "shoe size = 0",
        "correct": true,
        "feedback": "Correct. The plotted data only cover shoe size from 3 to 12. 0 is outside that range, so using the line there is extrapolation, and the pattern may not continue."
      },
      {
        "text": "shoe size = 7",
        "correct": false,
        "feedback": "Chose shoe size = 7. 7 is inside the plotted range, 3 to 12, so this is interpolation, which is fairly reliable."
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
    "question": "The masses in a data set run from 54 to 77. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(50 \\le g \\le 60\\), \\(60 \\le g \\le 70\\), \\(70 \\le g \\le 80\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 60 would fit in two classes, giving \\(50 \\le g \\le 60\\), \\(60 \\le g \\le 70\\), \\(70 \\le g \\le 80\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(60 \\le g &lt; 70\\), \\(70 \\le g &lt; 80\\), \\(80 \\le g &lt; 90\\)",
        "correct": false,
        "feedback": "Chose classes that start at 60, so the smallest value, 54, belongs to no class, giving \\(60 \\le g &lt; 70\\), \\(70 \\le g &lt; 80\\), \\(80 \\le g &lt; 90\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(50 \\le g &lt; 60\\), \\(60 \\le g &lt; 80\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(50 \\le g &lt; 60\\), \\(60 \\le g &lt; 80\\). Classes should all have the same width, so the frequencies can be compared fairly."
      },
      {
        "text": "\\(50 \\le g &lt; 60\\), \\(60 \\le g &lt; 70\\), \\(70 \\le g &lt; 80\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 10, the classes start at 50, which is at or below the smallest value, 54, and the last class reaches above the largest, 77. Each end value belongs to exactly one class because the upper end is left out."
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
    "question": "The diagram compares the scores in a quiz of two groups, P and Q. Which statement is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the scores in a quiz: group P on the left and group Q on the right, rows (left leaves, then right leaves) 0: - | 4 5 9; 1: 7 5 | 1 2 7; 2: 8 7 1 0 | 2 5; 3: 3 0 | 4; 4: 9 4 4 1 | 0 1 1 6 9; 5: 4 | -; the key reads 1 | 5 means 15.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"173.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group P</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group Q</text><text x=\"232.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"210.5\" y1=\"42\" x2=\"210.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"254.5\" y1=\"42\" x2=\"254.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"232.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">0</text><text x=\"264.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"232.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"155.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"232.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"232.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"264.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"309.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"324.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"200.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group P: 5 | 1 means 15</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group Q: 1 | 5 means 15</text></svg></div>",
    "options": [
      {
        "text": "Group P has both the higher median and the larger range",
        "correct": false,
        "feedback": "Took the ranges the wrong way round: 39 for P and 45 for Q, giving Group P has both the higher median and the larger range. The larger range belongs to the group whose highest and lowest values are further apart."
      },
      {
        "text": "Group Q has the higher median, but group P has the larger range",
        "correct": false,
        "feedback": "Reversed both comparisons, giving Group Q has the higher median, but group P has the larger range. Work out the median and the range of each group separately, then compare each pair."
      },
      {
        "text": "Group P has the higher median, but group Q has the larger range",
        "correct": true,
        "feedback": "Correct. Group P has median 30 and range 39. Group Q has median 23.5 and range 45. So group P has the higher median and group Q has the larger range."
      },
      {
        "text": "Group Q has both the higher median and the larger range",
        "correct": false,
        "feedback": "Took the medians the wrong way round: 30 for P and 23.5 for Q, giving Group Q has both the higher median and the larger range. Find each median by counting to the middle of each group, and compare them carefully."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you decide what such a comparison does and does not show."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the lengths of the films in a streaming library; the frequency of each class is shown in brackets: \\(80 \\le f &lt; 90\\) (3); \\(90 \\le f &lt; 100\\) \\((x)\\); \\(100 \\le f &lt; 110\\) (9); \\(110 \\le f &lt; 120\\) (9); \\(120 \\le f &lt; 130\\) (9). The estimated mean length is 110 minutes. Find the value of x.",
    "options": [
      {
        "text": "6",
        "correct": false,
        "feedback": "Used the upper end of the unknown class, 100, instead of its midpoint, giving 6. Each class is represented by its midpoint, 95, when estimating a mean."
      },
      {
        "text": "4",
        "correct": true,
        "feedback": "Correct. The known classes give a total of midpoint×frequency of 3360 and 30 values. With x values at the midpoint 95, the mean is \\((3360 + 95x) \\div (30 + x) = 110\\). So \\(3360 + 95x = 110(30 + x) = 3300 + 110x\\), which gives \\(-15x = -60\\), so \\(x = 4\\)."
      },
      {
        "text": "34",
        "correct": false,
        "feedback": "Gave the total frequency, \\(3 + 9 + 9 + 9 + 4 = 34\\), instead of x. x is only the frequency of one class, the unknown one."
      },
      {
        "text": "3",
        "correct": false,
        "feedback": "Used the lower end of the unknown class, 90, instead of its midpoint, giving 3. Each class is represented by its midpoint, 95, when estimating a mean."
      }
    ],
    "backward": "Solving equations, Ch4, and the mean, from earlier stages.",
    "forward": "Later in this chapter you use the same idea to check estimates."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows two frequency polygons on the same axes, group T and group U, for the puzzle times. Which statement about the modal classes is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the puzzle times, group T (solid line) at (65, 2), (75, 8), (85, 17), (95, 10) and group U (dashed line) at (65, 11), (75, 12), (85, 9), (95, 5); the horizontal axis shows the time, p, in seconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"281.2\" x2=\"534\" y2=\"281.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"251.7\" x2=\"534\" y2=\"251.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"222.1\" x2=\"534\" y2=\"222.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"192.6\" x2=\"534\" y2=\"192.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"133.4\" x2=\"534\" y2=\"133.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"103.9\" x2=\"534\" y2=\"103.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"266.4\" x2=\"534\" y2=\"266.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"236.9\" x2=\"534\" y2=\"236.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"177.8\" x2=\"534\" y2=\"177.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"148.2\" x2=\"534\" y2=\"148.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"89.1\" x2=\"534\" y2=\"89.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"59.6\" x2=\"534\" y2=\"59.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"30\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"30\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"30\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"266.4\" x2=\"64\" y2=\"266.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"270.9\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"236.9\" x2=\"64\" y2=\"236.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"241.4\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"207.3\" x2=\"64\" y2=\"207.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"211.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"177.8\" x2=\"64\" y2=\"177.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"182.3\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"148.2\" x2=\"64\" y2=\"148.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"152.7\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"118.7\" x2=\"64\" y2=\"118.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"123.2\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"89.1\" x2=\"64\" y2=\"89.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"93.6\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"59.6\" x2=\"64\" y2=\"59.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"64.1\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">80</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">90</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">100</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, p (seconds)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,266.4 240.2,177.8 357.8,44.8 475.2,148.2\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"266.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"177.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"44.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"148.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"122.8,133.4 240.2,118.7 357.8,163.0 475.2,222.1\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"118.8\" y=\"129.4\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"236.2\" y=\"114.7\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"353.8\" y=\"159.0\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"471.2\" y=\"218.1\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group T</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group U</text></svg></div>",
    "options": [
      {
        "text": "Group T is modal in \\(80 \\le p &lt; 90\\) and group U is modal in \\(70 \\le p &lt; 80\\)",
        "correct": true,
        "feedback": "Correct. The highest point of group T is 17, at the class \\(80 \\le p &lt; 90\\). The highest point of group U is 12, at the class \\(70 \\le p &lt; 80\\)."
      },
      {
        "text": "Group T is modal in \\(70 \\le p &lt; 80\\) and group U is modal in \\(80 \\le p &lt; 90\\)",
        "correct": false,
        "feedback": "Swapped the two groups: read group T's polygon as group U's, giving Group T is modal in \\(70 \\le p &lt; 80\\) and group U is modal in \\(80 \\le p &lt; 90\\). Group T is the solid line. Its highest point is at the class \\(80 \\le p &lt; 90\\)."
      },
      {
        "text": "Both groups are modal in \\(80 \\le p &lt; 90\\)",
        "correct": false,
        "feedback": "Read the highest point of group T only, the class \\(80 \\le p &lt; 90\\), giving Both groups are modal in \\(80 \\le p &lt; 90\\). Each polygon has its own highest point. Group U's is at the class \\(70 \\le p &lt; 80\\)."
      },
      {
        "text": "Both groups are modal in \\(70 \\le p &lt; 80\\)",
        "correct": false,
        "feedback": "Read the highest point of group U only, the class \\(70 \\le p &lt; 80\\), giving Both groups are modal in \\(70 \\le p &lt; 80\\). Each polygon has its own highest point. Group T's is at the class \\(80 \\le p &lt; 90\\)."
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
    "question": "The table gives the journey times of the commuters on one train; the frequency of each class is given in brackets: \\(20 \\le t &lt; 30\\) (4); \\(30 \\le t &lt; 40\\) (8); \\(40 \\le t &lt; 50\\) (5); \\(50 \\le t &lt; 60\\) (2); \\(60 \\le t &lt; 70\\) (1). Estimate the mean time.",
    "options": [
      {
        "text": "44 minutes",
        "correct": false,
        "feedback": "Used the upper end of each class instead of its midpoint: \\(120 + 320 + 250 + 120 + 70 = 880\\), then \\(\\div 20\\), giving 44 minutes. Use the midpoint of each class, because the values are spread across the class."
      },
      {
        "text": "4 minutes",
        "correct": false,
        "feedback": "Found the mean of the frequencies, \\(20 \\div 5\\), giving 4 minutes. The mean is of the values (marks, times, heights), not of the frequencies. Use the midpoints."
      },
      {
        "text": "39 minutes",
        "correct": true,
        "feedback": "Correct. The midpoints are 25, 35, 45, 55, 65. The total of midpoint×frequency is \\(100 + 280 + 225 + 110 + 65 = 780\\), and the number of commuters is \\(4 + 8 + 5 + 2 + 1 = 20\\), so the estimated mean is \\(780 \\div 20 = 39\\)."
      },
      {
        "text": "34 minutes",
        "correct": false,
        "feedback": "Used the lower end of each class instead of its midpoint: \\(80 + 240 + 200 + 100 + 60 = 680\\), then \\(\\div 20\\), giving 34 minutes. Use the midpoint of each class, because the values are spread across the class."
      }
    ],
    "backward": "The mean, from earlier stages, and multiplying and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of ice creams sold against outdoor temperature with a line of best fit. Which statement describes the gradient of the line?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of ice creams sold against outdoor temperature: 12 points at (12, 22), (13, 29), (14, 32), (15, 41), (16, 47), (19, 51), (20, 57), (21, 69), (22, 71), (27, 104), (29, 111), (32, 121); the horizontal axis shows outdoor temperature (°C) and the vertical axis shows number of ice creams sold, with a line of best fit drawn through (16, 43) and (22, 73).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"305.5\" x2=\"534\" y2=\"305.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"295.0\" x2=\"534\" y2=\"295.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"284.5\" x2=\"534\" y2=\"284.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"263.5\" x2=\"534\" y2=\"263.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"253.0\" x2=\"534\" y2=\"253.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.5\" x2=\"534\" y2=\"221.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"211.0\" x2=\"534\" y2=\"211.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"200.5\" x2=\"534\" y2=\"200.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"179.5\" x2=\"534\" y2=\"179.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"158.5\" x2=\"534\" y2=\"158.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"137.5\" x2=\"534\" y2=\"137.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.0\" x2=\"534\" y2=\"127.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.5\" x2=\"534\" y2=\"116.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"85.0\" x2=\"534\" y2=\"85.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"74.5\" x2=\"534\" y2=\"74.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"53.5\" x2=\"534\" y2=\"53.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"43.0\" x2=\"534\" y2=\"43.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"32.5\" x2=\"534\" y2=\"32.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"274.0\" x2=\"534\" y2=\"274.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"232.0\" x2=\"534\" y2=\"232.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"190.0\" x2=\"534\" y2=\"190.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"148.0\" x2=\"534\" y2=\"148.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.0\" x2=\"534\" y2=\"106.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"64.0\" x2=\"534\" y2=\"64.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"274.0\" x2=\"70\" y2=\"274.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"278.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"232.0\" x2=\"70\" y2=\"232.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"236.5\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"190.0\" x2=\"70\" y2=\"190.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"194.5\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"148.0\" x2=\"70\" y2=\"148.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"152.5\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"106.0\" x2=\"70\" y2=\"106.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"110.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"64.0\" x2=\"70\" y2=\"64.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"68.5\" text-anchor=\"end\" fill=\"#1f2937\">120</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">15</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">25</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">35</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Outdoor temperature (°C)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of ice creams sold</text><polyline points=\"81,322 85,310 89,322 93,310\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><line x1=\"107.1\" y1=\"267.7\" x2=\"478.3\" y2=\"57.7\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"181.4\" cy=\"225.7\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"292.7\" cy=\"162.7\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"107.1\" cy=\"269.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"125.7\" cy=\"255.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"144.2\" cy=\"248.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"162.8\" cy=\"229.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.4\" cy=\"217.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"237.0\" cy=\"208.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"255.6\" cy=\"196.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"274.2\" cy=\"171.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"292.7\" cy=\"166.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"385.5\" cy=\"97.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"422.6\" cy=\"82.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"478.3\" cy=\"61.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "Each extra degree of outdoor temperature takes about 5 off the number of ice creams sold",
        "correct": false,
        "feedback": "Read the direction of the line the wrong way round, giving Each extra degree of outdoor temperature takes about 5 off the number of ice creams sold. The line goes up as outdoor temperature increases, so each extra degree of outdoor temperature adds to the number of ice creams sold."
      },
      {
        "text": "Each extra degree of outdoor temperature adds about 5 to the number of ice creams sold",
        "correct": true,
        "feedback": "Correct. The gradient is the change up divided by the change across: \\((73 - 43) \\div (22 - 16) = 30 \\div 6 = 5\\). So each extra degree of outdoor temperature adds about 5."
      },
      {
        "text": "Each extra degree of outdoor temperature adds about 0.2 to the number of ice creams sold",
        "correct": false,
        "feedback": "Turned the gradient upside down, \\(6 \\div 30 = 0.2\\), giving Each extra degree of outdoor temperature adds about 0.2 to the number of ice creams sold. The gradient is the change up divided by the change across, \\(30 \\div 6\\)."
      },
      {
        "text": "Each extra degree of outdoor temperature adds about 30 to the number of ice creams sold",
        "correct": false,
        "feedback": "Used the whole change between the two marked points, \\(73 - 43 = 30\\), giving Each extra degree of outdoor temperature adds about 30 to the number of ice creams sold. That change is for 6 steps across together. The gradient shares it out per single step."
      }
    ],
    "backward": "Straight-line functions, Ch9, and gradient, Ch10.",
    "forward": "Later in this chapter you use the line to estimate values."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A bar chart shows the scores of two teams: 57 and 75. Its vertical axis starts at 54 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "21 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 54, 21, as the number of times, giving 21 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "18 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(75 - 57 = 18\\), giving 18 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "7 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 54, the bars are drawn with heights \\(75 - 54 = 21\\) and \\(57 - 54 = 3\\). So the second bar looks \\(21 \\div 3 = 7\\) times as tall, although the real values are close."
      },
      {
        "text": "8 times as tall",
        "correct": false,
        "feedback": "Divided to get 7 and then added 1, giving 8 times as tall. The second bar is 7 times the height of the first, not 8."
      }
    ],
    "backward": "Reading scales on graphs, Ch10, and ratio, Ch11.",
    "forward": "Later in this chapter you meet other features that make a graph misleading."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the pulse rates of two groups, E and F. A student says: 'Group F has the higher median, so every value in group F is higher than every value in group E.' Is the student correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the pulse rates: group E on the left and group F on the right, rows (left leaves, then right leaves) 6: 7 1 | -; 7: 8 8 7 3 0 | 1 3 7 9; 8: 8 5 4 | 1 2 3 4; 9: 1 | 1 1 5 6; 10: 8 3 | 1 5; the key reads 7 | 0 means 70 beats per minute.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group E</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group F</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"155.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"309.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"324.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"324.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group E: 0 | 7 means 70 beats per minute</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group F: 7 | 0 means 70 beats per minute</text></svg></div>",
    "options": [
      {
        "text": "Yes: the groups cannot overlap when the medians, 83.5 beats per minute and 78 beats per minute, are different",
        "correct": false,
        "feedback": "Chose \"Yes: the groups cannot overlap when the medians, 83.5 beats per minute and 78 beats per minute, are different\". The groups can overlap even when one has a higher median. Compare the highest and lowest values."
      },
      {
        "text": "No: group E's highest value, 108 beats per minute, is above group F's lowest value, 71 beats per minute",
        "correct": true,
        "feedback": "Correct. Group F has the higher median, 83.5 beats per minute, but the lowest value in group F is 71 beats per minute and the highest in group E is 108 beats per minute. The groups overlap, so a median alone cannot show that every value is higher."
      },
      {
        "text": "No: the medians, 83.5 beats per minute and 78 beats per minute, are too close together to compare",
        "correct": false,
        "feedback": "Chose \"No: the medians, 83.5 beats per minute and 78 beats per minute, are too close together to compare\". The medians are different, so one group has the higher middle value. The point is that the whole groups still overlap."
      },
      {
        "text": "Yes: a higher median means every value in group F is above every value in group E",
        "correct": false,
        "feedback": "Chose \"Yes: a higher median means every value in group F is above every value in group E\". The median compares the middle values only. Individual values can still overlap."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you meet other cases where a single number is not enough."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The tables give the ages of two groups, C and D. Group C: \\(30 \\le a &lt; 40\\) (3); \\(40 \\le a &lt; 50\\) (6); \\(50 \\le a &lt; 60\\) (7); \\(60 \\le a &lt; 70\\) (6); \\(70 \\le a &lt; 80\\) (3). Group D: \\(30 \\le a &lt; 40\\) (14); \\(40 \\le a &lt; 50\\) (18); \\(50 \\le a &lt; 60\\) (11); \\(60 \\le a &lt; 70\\) (5); \\(70 \\le a &lt; 80\\) (2). Which statement is correct?",
    "options": [
      {
        "text": "Group C has the higher estimated mean, by 1005 years",
        "correct": false,
        "feedback": "Compared the totals of midpoint×frequency, which differ by 1005, giving Group C has the higher estimated mean, by 1005 years. Each total must be divided by the number of values in its group before the groups are compared."
      },
      {
        "text": "Group C has the higher estimated mean, by 7.4 years",
        "correct": true,
        "feedback": "Correct. Group C has \\(1375 \\div 25 = 55\\) and group D has \\(2380 \\div 50 = 47.6\\), so group C has the higher estimated mean, by 7.4 years."
      },
      {
        "text": "Group D has the higher estimated mean, by 7.4 years",
        "correct": false,
        "feedback": "Took the means the wrong way round: 55 for C and 47.6 for D, giving Group D has the higher estimated mean, by 7.4 years. Estimate each mean by midpoint×frequency, add, then divide, and compare carefully."
      },
      {
        "text": "Group C has the higher estimated mean, by 10 years",
        "correct": false,
        "feedback": "Compared the midpoints of the two modal classes, which differ by 10, giving Group C has the higher estimated mean, by 10 years. The mean uses every class, not only the modal class."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you decide how far a comparison of averages can be trusted."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the journey times of the commuters on one train. How many more commuters are in the class \\(60 \\le t &lt; 70\\) than in the class \\(20 \\le t &lt; 30\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the journey times of the commuters on one train: points plotted at the class midpoints and joined by straight lines, at (15, 1), (25, 2), (35, 5), (45, 10), (55, 13), (65, 10); the horizontal axis shows the time, t, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"276.4\" x2=\"534\" y2=\"276.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"237.3\" x2=\"534\" y2=\"237.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"198.1\" x2=\"534\" y2=\"198.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"119.9\" x2=\"534\" y2=\"119.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"80.7\" x2=\"534\" y2=\"80.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"142.3\" y1=\"22\" x2=\"142.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"220.7\" y1=\"22\" x2=\"220.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"377.3\" y1=\"22\" x2=\"377.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"455.7\" y1=\"22\" x2=\"455.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"256.9\" x2=\"64\" y2=\"256.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"261.4\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"217.7\" x2=\"64\" y2=\"217.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"222.2\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"178.6\" x2=\"64\" y2=\"178.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"183.1\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"139.4\" x2=\"64\" y2=\"139.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"143.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"100.3\" x2=\"64\" y2=\"100.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"104.8\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"61.1\" x2=\"64\" y2=\"61.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"65.6\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"142.3\" y1=\"296\" x2=\"142.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"142.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"220.7\" y1=\"296\" x2=\"220.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"220.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"377.3\" y1=\"296\" x2=\"377.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"377.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"455.7\" y1=\"296\" x2=\"455.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"455.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, t (minutes)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"103.2,276.4 181.5,256.9 259.8,198.1 338.2,100.3 416.5,41.6 494.8,100.3\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"103.2\" cy=\"276.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.5\" cy=\"256.9\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"259.8\" cy=\"198.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"338.2\" cy=\"100.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"416.5\" cy=\"41.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"494.8\" cy=\"100.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "12 commuters",
        "correct": false,
        "feedback": "Added the two heights, \\(10 + 2 = 12\\), giving 12 commuters. 'How many more' means subtract the smaller from the larger."
      },
      {
        "text": "10 commuters",
        "correct": false,
        "feedback": "Gave the height of the class \\(60 \\le t &lt; 70\\) alone, 10, giving 10 commuters. The question compares it with the class \\(20 \\le t &lt; 30\\), which has height 2."
      },
      {
        "text": "8 commuters",
        "correct": true,
        "feedback": "Correct. The heights are 10 for \\(60 \\le t &lt; 70\\) and 2 for \\(20 \\le t &lt; 30\\), so the difference is \\(10 - 2 = 8\\)."
      },
      {
        "text": "40 commuters",
        "correct": false,
        "feedback": "Subtracted the midpoints, 40, instead of the heights, giving 40 commuters. The midpoints are positions across the axis. The frequencies are the heights."
      }
    ],
    "backward": "Finding a difference by subtracting, from earlier stages.",
    "forward": "Later in this chapter you compare two polygons on the same axes."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the masses of the dogs at a rescue centre; the frequency of each class is given in brackets: \\(0 \\le b &lt; 5\\) (2); \\(5 \\le b &lt; 10\\) (4); \\(10 \\le b &lt; 15\\) (7); \\(15 \\le b &lt; 20\\) (9); \\(20 \\le b &lt; 25\\) (14). Which class contains the median?",
    "options": [
      {
        "text": "\\(0 \\le b &lt; 5\\)",
        "correct": false,
        "feedback": "Chose the class \\(0 \\le b &lt; 5\\), where the running total is only 2, giving \\(0 \\le b &lt; 5\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(5 \\le b &lt; 10\\)",
        "correct": false,
        "feedback": "Chose the class \\(5 \\le b &lt; 10\\), where the running total is only 6, giving \\(5 \\le b &lt; 10\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(10 \\le b &lt; 15\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(10 \\le b &lt; 15\\). Keep adding until the running total reaches the middle position among all the values."
      },
      {
        "text": "\\(15 \\le b &lt; 20\\)",
        "correct": true,
        "feedback": "Correct. There are \\(2 + 4 + 7 + 9 + 14 = 36\\) values, so the median is halfway between the 18th and 19th values. The running totals are 2, 6, 13, 22, so both fall in the class \\(15 \\le b &lt; 20\\)."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of resale price against age of a phone with a line of best fit. A student uses the line to estimate the resale price when age of a phone is 12 years. Is this estimate reliable?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of resale price against age of a phone: 6 points at (1, 387), (2, 316), (3, 289), (4, 190), (5, 114), (6, 36); the horizontal axis shows age of a phone (years) and the vertical axis shows resale price (pounds), with a line of best fit drawn through (2, 327) and (4, 187).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"309.5\" x2=\"534\" y2=\"309.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"302.9\" x2=\"534\" y2=\"302.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"289.9\" x2=\"534\" y2=\"289.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"270.3\" x2=\"534\" y2=\"270.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"263.7\" x2=\"534\" y2=\"263.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"244.1\" x2=\"534\" y2=\"244.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"231.1\" x2=\"534\" y2=\"231.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"224.5\" x2=\"534\" y2=\"224.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"211.5\" x2=\"534\" y2=\"211.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"204.9\" x2=\"534\" y2=\"204.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.9\" x2=\"534\" y2=\"191.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"172.3\" x2=\"534\" y2=\"172.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"165.7\" x2=\"534\" y2=\"165.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"146.1\" x2=\"534\" y2=\"146.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"133.1\" x2=\"534\" y2=\"133.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"126.5\" x2=\"534\" y2=\"126.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"113.5\" x2=\"534\" y2=\"113.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.9\" x2=\"534\" y2=\"106.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"93.9\" x2=\"534\" y2=\"93.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"48.1\" x2=\"534\" y2=\"48.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"35.1\" x2=\"534\" y2=\"35.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"28.5\" x2=\"534\" y2=\"28.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"283.3\" x2=\"534\" y2=\"283.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"250.7\" x2=\"534\" y2=\"250.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"185.3\" x2=\"534\" y2=\"185.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"152.7\" x2=\"534\" y2=\"152.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"87.3\" x2=\"534\" y2=\"87.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"54.7\" x2=\"534\" y2=\"54.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"283.3\" x2=\"70\" y2=\"283.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"287.8\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"250.7\" x2=\"70\" y2=\"250.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"255.2\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"185.3\" x2=\"70\" y2=\"185.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"189.8\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"152.7\" x2=\"70\" y2=\"152.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"157.2\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"87.3\" x2=\"70\" y2=\"87.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"91.8\" text-anchor=\"end\" fill=\"#1f2937\">350</text><line x1=\"65\" y1=\"54.7\" x2=\"70\" y2=\"54.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"59.2\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">450</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">1</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">3</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">7</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age of a phone (years)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Resale price (pounds)</text><line x1=\"136.3\" y1=\"56.6\" x2=\"467.7\" y2=\"285.3\" stroke=\"#b91c1c\" stroke-width=\"2.2\"/><circle cx=\"202.6\" cy=\"102.4\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"335.1\" cy=\"193.8\" r=\"5.5\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"2\"/><circle cx=\"136.3\" cy=\"63.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"109.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"127.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"191.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"241.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"292.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "No: a line of best fit can never be used to estimate",
        "correct": false,
        "feedback": "Said a line of best fit cannot be used for estimates, giving No: a line of best fit can never be used to estimate. It can be used for estimates inside the range of the data."
      },
      {
        "text": "Yes: the line of best fit can be used for any value of age of a phone",
        "correct": false,
        "feedback": "Said the line can be used for any age of a phone, giving Yes: the line of best fit can be used for any value of age of a phone. 12 is outside the data, 1 to 6, so the pattern may not continue."
      },
      {
        "text": "No: 12 is outside the range of the data, so the estimate may be unreliable",
        "correct": true,
        "feedback": "Correct. The plotted values of age of a phone run from 1 to 6, and 12 is outside that range, so the estimate is an extrapolation, which may be unreliable."
      },
      {
        "text": "Yes: the line goes through the middle of the points",
        "correct": false,
        "feedback": "Said the estimate is reliable because the line fits the points, giving Yes: the line goes through the middle of the points. The line fits inside the range of the data. Beyond it, nothing shows that the pattern continues."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you decide how far a conclusion can be trusted."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A quiz organiser has the exact scores of 12 players in team A and 11 players in team B and wants to compare the teams with every score still visible. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A back-to-back stem-and-leaf diagram of the scores of the two teams",
        "correct": true,
        "feedback": "Correct. Here you need to compare two groups while keeping every value visible, and a back-to-back stem-and-leaf diagram compares two sets of values side by side and keeps every individual value."
      },
      {
        "text": "A bar chart of the scores of the two teams",
        "correct": false,
        "feedback": "Chose \"A bar chart of the scores of the two teams\". A bar chart compares the frequencies of separate categories, but here you need to compare two groups while keeping every value visible."
      },
      {
        "text": "A scatter graph of the scores of the two teams",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the scores of the two teams\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare two groups while keeping every value visible."
      },
      {
        "text": "A frequency polygon of the scores of the two teams",
        "correct": false,
        "feedback": "Chose \"A frequency polygon of the scores of the two teams\". A frequency polygon shows how grouped data are spread across equal classes, but here you need to compare two groups while keeping every value visible."
      }
    ],
    "backward": "Reading and choosing graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the ages of club members of two groups, M and N. What is the mean of group M?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the ages of club members: group M on the left and group N on the right, rows (left leaves, then right leaves) 2: 8 8 7 | 1 1 1 4 5 9; 3: 5 3 | 6; 4: 9 4 0 | 2 2 3; 5: 7 3 | 2 4 7; 6: 8 2 1 | 5; the key reads 3 | 3 means 33 years.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"166.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group M</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group N</text><text x=\"217.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"195.5\" y1=\"42\" x2=\"195.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"239.5\" y1=\"42\" x2=\"239.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"217.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"170.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"155.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"249.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"264.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"309.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"324.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"217.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"249.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"217.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"170.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"249.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"217.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"249.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"217.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"155.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"249.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group M: 3 | 3 means 33 years</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group N: 3 | 3 means 33 years</text></svg></div>",
    "options": [
      {
        "text": "44 years",
        "correct": false,
        "feedback": "Found the median instead, 44, giving 44 years. The mean uses every value, added up and shared out."
      },
      {
        "text": "45 years",
        "correct": true,
        "feedback": "Correct. The 13 values add up to \\(27 + 28 + 28 + 33 + 35 + 40 + 44 + 49 + 53 + 57 + 61 + 62 + 68 = 585\\), so the mean is \\(585 \\div 13 = 45\\)."
      },
      {
        "text": "5 years",
        "correct": false,
        "feedback": "Averaged the leaves only and ignored the stems, giving 5 years. Each value is the stem and the leaf together, so use the full values."
      },
      {
        "text": "585 years",
        "correct": false,
        "feedback": "Added the values, \\(27 + 28 + 28 + 33 + 35 + 40 + 44 + 49 + 53 + 57 + 61 + 62 + 68 = 585\\), and did not divide, giving 585 years. A mean needs dividing by the number of values, 13."
      }
    ],
    "backward": "The mean, from earlier stages, and dividing decimals, Ch3.",
    "forward": "Later in this chapter you compare the means of two groups."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The numbers of messages sent of 6 students are: 15, 16, 19, 109, 13, 14. Which of these is least affected by the unusually large value, 109?",
    "options": [
      {
        "text": "The total, 186",
        "correct": false,
        "feedback": "Chose \"The total, 186\". The total includes 109, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 31",
        "correct": false,
        "feedback": "Chose \"The mean, 31\": the values add to 186, and \\(186 \\div 6 = 31\\). The mean uses every value, so the unusual value 109 pulls it upwards. The median is not pulled in the same way."
      },
      {
        "text": "The range, 96",
        "correct": false,
        "feedback": "Chose \"The range, 96\": \\(109 - 13 = 96\\). The range uses the highest value, 109, so it is changed most by an unusual value. It is also a measure of spread, not an average."
      },
      {
        "text": "The median, 15.5",
        "correct": true,
        "feedback": "Correct. In order the values are 13, 14, 15, 16, 19, 109. The median is halfway between the middle two values, 15.5, and replacing 109 with a larger number would not change it. The mean, 31, would change."
      }
    ],
    "backward": "The median and the mean, from earlier stages.",
    "forward": "Later in this chapter you choose the best average to describe data with an unusual value."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "What is the midpoint of the class \\(80 \\le g &lt; 90\\)?",
    "options": [
      {
        "text": "80",
        "correct": false,
        "feedback": "Used the lower end of the class, 80. The midpoint lies halfway between the two ends of the class."
      },
      {
        "text": "85",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((80 + 90) \\div 2 = 85\\)."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Gave the class width, \\(90 - 80 = 10\\). The width is the length of the class. The midpoint is a position inside it."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Gave half the class width, \\(10 \\div 2\\), giving 5. Half the width is the distance from an end to the midpoint. Add it to the lower end, 80."
      }
    ],
    "backward": "Dividing decimals by 2, Ch3.",
    "forward": "Later in this chapter you multiply each midpoint by its frequency to estimate the mean."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the distances thrown by the pupils in a throwing event. How many pupils have a distance of less than 30?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the distances thrown by the pupils in a throwing event: points plotted at the class midpoints and joined by straight lines, at (15, 3), (25, 10), (35, 14), (45, 12), (55, 2); the horizontal axis shows the distance, d, in metres, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"278.9\" x2=\"534\" y2=\"278.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"244.6\" x2=\"534\" y2=\"244.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"210.4\" x2=\"534\" y2=\"210.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"176.1\" x2=\"534\" y2=\"176.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"141.9\" x2=\"534\" y2=\"141.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"107.6\" x2=\"534\" y2=\"107.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"73.4\" x2=\"534\" y2=\"73.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"39.1\" x2=\"534\" y2=\"39.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance, d (metres)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,244.6 205.0,124.8 299.0,56.2 393.0,90.5 487.0,261.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"244.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"124.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"56.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"90.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"261.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "27 pupils",
        "correct": false,
        "feedback": "Included the class \\(30 \\le d &lt; 40\\) as well, 14, giving 27 pupils. That class starts at 30, so its values are not less than 30."
      },
      {
        "text": "3 pupils",
        "correct": false,
        "feedback": "Left out the class just below 30, 10, giving 3 pupils. That class lies completely below 30, so it is included."
      },
      {
        "text": "13 pupils",
        "correct": true,
        "feedback": "Correct. The classes below 30 have heights 3, 10, so \\(3 + 10 = 13\\)."
      },
      {
        "text": "10 pupils",
        "correct": false,
        "feedback": "Used only the class just below 30, 10, giving 10 pupils. Less than 30 includes every class below it, not just the nearest."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you use running totals to find the class that contains the median."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The heights in a data set run from 46 to 68. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 10, the classes start at 40, which is at or below the smallest value, 46, and the last class reaches above the largest, 68. Each end value belongs to exactly one class because the upper end is left out."
      },
      {
        "text": "\\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 70\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(40 \\le h &lt; 50\\), \\(50 \\le h &lt; 70\\). Classes should all have the same width, so the frequencies can be compared fairly."
      },
      {
        "text": "\\(40 \\le h \\le 50\\), \\(50 \\le h \\le 60\\), \\(60 \\le h \\le 70\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 50 would fit in two classes, giving \\(40 \\le h \\le 50\\), \\(50 \\le h \\le 60\\), \\(60 \\le h \\le 70\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\), \\(70 \\le h &lt; 80\\)",
        "correct": false,
        "feedback": "Chose classes that start at 50, so the smallest value, 46, belongs to no class, giving \\(50 \\le h &lt; 60\\), \\(60 \\le h &lt; 70\\), \\(70 \\le h &lt; 80\\). The classes must cover every value, starting at or below the smallest."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The diagram shows a scatter graph of number of leaves against length of a plant stem. How many points have length of a plant stem less than 43 cm and number of leaves more than 25?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of leaves against length of a plant stem: 12 points at (11, 3), (22, 17), (29, 20), (35, 21), (37, 22), (40, 22), (41, 28), (44, 28), (45, 32), (51, 35), (54, 37), (56, 33); the horizontal axis shows length of a plant stem (cm) and the vertical axis shows number of leaves.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"308.6\" x2=\"534\" y2=\"308.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"293.9\" x2=\"534\" y2=\"293.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"264.6\" x2=\"534\" y2=\"264.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"249.8\" x2=\"534\" y2=\"249.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"220.4\" x2=\"534\" y2=\"220.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.1\" x2=\"534\" y2=\"191.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"176.3\" x2=\"534\" y2=\"176.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"161.7\" x2=\"534\" y2=\"161.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"147.0\" x2=\"534\" y2=\"147.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"117.5\" x2=\"534\" y2=\"117.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"102.8\" x2=\"534\" y2=\"102.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"88.2\" x2=\"534\" y2=\"88.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"73.5\" x2=\"534\" y2=\"73.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"44.1\" x2=\"534\" y2=\"44.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"29.4\" x2=\"534\" y2=\"29.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"85.5\" y1=\"22\" x2=\"85.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"100.9\" y1=\"22\" x2=\"100.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"116.4\" y1=\"22\" x2=\"116.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"131.9\" y1=\"22\" x2=\"131.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"178.3\" y1=\"22\" x2=\"178.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"193.7\" y1=\"22\" x2=\"193.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"209.2\" y1=\"22\" x2=\"209.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"240.1\" y1=\"22\" x2=\"240.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"271.1\" y1=\"22\" x2=\"271.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"286.5\" y1=\"22\" x2=\"286.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"317.5\" y1=\"22\" x2=\"317.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"332.9\" y1=\"22\" x2=\"332.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"363.9\" y1=\"22\" x2=\"363.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"394.8\" y1=\"22\" x2=\"394.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"410.3\" y1=\"22\" x2=\"410.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"425.7\" y1=\"22\" x2=\"425.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"472.1\" y1=\"22\" x2=\"472.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"487.6\" y1=\"22\" x2=\"487.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"503.1\" y1=\"22\" x2=\"503.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"518.5\" y1=\"22\" x2=\"518.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"279.2\" x2=\"534\" y2=\"279.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"205.8\" x2=\"534\" y2=\"205.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"132.2\" x2=\"534\" y2=\"132.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"58.8\" x2=\"534\" y2=\"58.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"279.2\" x2=\"70\" y2=\"279.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"283.8\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"65\" y1=\"205.8\" x2=\"70\" y2=\"205.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"210.2\" text-anchor=\"end\" fill=\"#1f2937\">15</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"65\" y1=\"132.2\" x2=\"70\" y2=\"132.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"136.8\" text-anchor=\"end\" fill=\"#1f2937\">25</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">30</text><line x1=\"65\" y1=\"58.8\" x2=\"70\" y2=\"58.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"63.2\" text-anchor=\"end\" fill=\"#1f2937\">35</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Length of a plant stem (cm)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of leaves</text><circle cx=\"155.1\" cy=\"293.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.1\" cy=\"191.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"294.3\" cy=\"169.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"340.7\" cy=\"161.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"356.1\" cy=\"154.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"154.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"387.1\" cy=\"110.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"410.3\" cy=\"110.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"80.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"464.4\" cy=\"58.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.6\" cy=\"44.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"503.1\" cy=\"73.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "7 points",
        "correct": false,
        "feedback": "Counted only the points with length of a plant stem less than 43 cm, 7, giving 7 points. Each point must also have number of leaves more than 25."
      },
      {
        "text": "1 point",
        "correct": true,
        "feedback": "Correct. The points with length of a plant stem less than 43 cm and number of leaves more than 25 are (41, 28), which makes 1."
      },
      {
        "text": "6 points",
        "correct": false,
        "feedback": "Counted only the points with number of leaves more than 25, 6, giving 6 points. Each point must also have length of a plant stem less than 43 cm."
      },
      {
        "text": "12 points",
        "correct": false,
        "feedback": "Counted the points that meet either condition, 12, giving 12 points. The word 'and' means a point has to meet both conditions at once."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you turn a count like this into a fraction of the whole."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The mean height of 30 students in group A is 163 cm. The mean height of 10 students in group B is 143 cm. What is the mean height of all 40 students together?",
    "options": [
      {
        "text": "6320 cm",
        "correct": false,
        "feedback": "Found the total of all the values, \\(30 \\times 163 + 10 \\times 143 = 6320\\), and did not divide, giving 6320 cm. Divide by the total number of values, 40."
      },
      {
        "text": "3160 cm",
        "correct": false,
        "feedback": "Divided the total, 6320, by 2, the number of groups, giving 3160 cm. Divide by the number of values, 40, not the number of groups."
      },
      {
        "text": "153 cm",
        "correct": false,
        "feedback": "Found the mean of the two means, \\((163 + 143) \\div 2\\), giving 153 cm. The groups have different sizes, so the larger group counts for more. Use the total of all the values."
      },
      {
        "text": "158 cm",
        "correct": true,
        "feedback": "Correct. Group A has total \\(30 \\times 163 = 4890\\). Group B has total \\(10 \\times 143 = 1430\\). All 40 students have total \\(4890 + 1430 = 6320\\), so the mean is \\(6320 \\div 40 = 158\\) cm."
      }
    ],
    "backward": "The mean, from earlier stages.",
    "forward": "Later in this chapter you use means to compare groups."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram compares the times to complete a puzzle of two groups, C and D. Which statement is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the times to complete a puzzle: group C on the left and group D on the right, rows (left leaves, then right leaves) 1: 6 | 8; 2: 3 | 0 1; 3: 0 | 0 5 6; 4: 8 7 7 6 1 | 1 3 4 4 6; 5: 6 3 3 3 | 2 2 2; 6: 1 | -; the key reads 2 | 3 means 23 seconds.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"173.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group C</text><text x=\"306.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group D</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"302.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"178.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"163.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"148.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"302.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"317.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"332.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"193.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"178.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"163.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"240.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"208.0\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group C: 3 | 2 means 23 seconds</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group D: 2 | 3 means 23 seconds</text></svg></div>",
    "options": [
      {
        "text": "Group C has both the higher median and the larger range",
        "correct": true,
        "feedback": "Correct. Group C has median 47 and range 45. Group D has median 42 and range 34. So group C has the higher median and group C has the larger range."
      },
      {
        "text": "Group D has both the higher median and the larger range",
        "correct": false,
        "feedback": "Reversed both comparisons, giving Group D has both the higher median and the larger range. Work out the median and the range of each group separately, then compare each pair."
      },
      {
        "text": "Group D has the higher median, but group C has the larger range",
        "correct": false,
        "feedback": "Took the medians the wrong way round: 47 for C and 42 for D, giving Group D has the higher median, but group C has the larger range. Find each median by counting to the middle of each group, and compare them carefully."
      },
      {
        "text": "Group C has the higher median, but group D has the larger range",
        "correct": false,
        "feedback": "Took the ranges the wrong way round: 45 for C and 34 for D, giving Group C has the higher median, but group D has the larger range. The larger range belongs to the group whose highest and lowest values are further apart."
      }
    ],
    "backward": "The median and the range, from earlier stages.",
    "forward": "Later in this chapter you decide what such a comparison does and does not show."
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
  title: "Interpreting and Discussing Results — Problem-Solving & Synthesis",
  subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
  description: "Synthesis items mixing comparisons, correlation, grouped statistics and judging representations — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. In this level many questions bring two topics together, for example reading a line of best fit and then judging how far to trust it, finding two estimated means and then comparing the groups, or checking whether a conclusion really follows from a graph. Work out the first part, write the result down, and only then do the second part. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

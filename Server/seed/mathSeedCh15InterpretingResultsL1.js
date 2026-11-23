// Interpreting and Discussing Results — Grade 8, Level 1 (Core Fluency).
// Warm-up, diagnostic and spaced recheck items.
// Run with: node seed/mathSeedCh15InterpretingResultsL1.js
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-15-interpreting-discussing-results";
const CHAPTER_NAME = "Interpreting and Discussing Results";
const LEVEL = 1;

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
    "question": "In a frequency table the class \\(20 \\le l &lt; 25\\) has frequency 4. A frequency polygon is drawn for the table. At which value of l is the point for this class plotted?",
    "options": [
      {
        "text": "20",
        "correct": false,
        "feedback": "Used the lower end of the class, 20. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      },
      {
        "text": "25",
        "correct": false,
        "feedback": "Used the upper end of the class, 25. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Used the class width, 5. A frequency polygon plots each class at the middle of the class, halfway between its two ends."
      },
      {
        "text": "22.5",
        "correct": true,
        "feedback": "Correct. A frequency polygon is plotted at the midpoint of each class, which is \\((20 + 25) \\div 2 = 22.5\\)."
      }
    ],
    "retryHint": "Plot at the middle of the class: add the two ends of the class and halve.",
    "backward": "The mean of two numbers, from earlier stages.",
    "forward": "Later in this chapter you use the same midpoints to estimate a mean."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the lengths of the films in a streaming library; the frequency of each class is given in brackets: \\(100 \\le f &lt; 110\\) (6); \\(110 \\le f &lt; 120\\) (9); \\(120 \\le f &lt; 130\\) (7); \\(130 \\le f &lt; 140\\) (3). Which class is the modal class?",
    "options": [
      {
        "text": "\\(130 \\le f &lt; 140\\)",
        "correct": false,
        "feedback": "Chose the last class, giving \\(130 \\le f &lt; 140\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(100 \\le f &lt; 110\\)",
        "correct": false,
        "feedback": "Chose the first class, giving \\(100 \\le f &lt; 110\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(110 \\le f &lt; 120\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 9, which belongs to the class \\(110 \\le f &lt; 120\\), so that is the modal class."
      },
      {
        "text": "\\(120 \\le f &lt; 130\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(120 \\le f &lt; 130\\). The modal class has the highest frequency."
      }
    ],
    "retryHint": "The modal class has the highest frequency. Find the biggest number in the frequency column.",
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of height against age of a child. Which description fits the correlation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of height against age of a child: 12 points at (3, 96), (4, 102), (5, 105), (6, 111), (7, 115), (8, 127), (9, 132), (10, 132), (11, 139), (12, 148), (13, 152), (14, 155); the horizontal axis shows age of a child (years) and the vertical axis shows height (cm).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"307.6\" x2=\"534\" y2=\"307.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"299.2\" x2=\"534\" y2=\"299.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"290.8\" x2=\"534\" y2=\"290.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"282.4\" x2=\"534\" y2=\"282.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"248.8\" x2=\"534\" y2=\"248.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"240.4\" x2=\"534\" y2=\"240.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"223.6\" x2=\"534\" y2=\"223.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"215.2\" x2=\"534\" y2=\"215.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"206.8\" x2=\"534\" y2=\"206.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"181.6\" x2=\"534\" y2=\"181.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"173.2\" x2=\"534\" y2=\"173.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"164.8\" x2=\"534\" y2=\"164.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"156.4\" x2=\"534\" y2=\"156.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"131.2\" x2=\"534\" y2=\"131.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"122.8\" x2=\"534\" y2=\"122.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"114.4\" x2=\"534\" y2=\"114.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"97.6\" x2=\"534\" y2=\"97.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"89.2\" x2=\"534\" y2=\"89.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"72.4\" x2=\"534\" y2=\"72.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"55.6\" x2=\"534\" y2=\"55.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"47.2\" x2=\"534\" y2=\"47.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"38.8\" x2=\"534\" y2=\"38.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"30.4\" x2=\"534\" y2=\"30.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"99.0\" y1=\"22\" x2=\"99.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"157.0\" y1=\"22\" x2=\"157.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"215.0\" y1=\"22\" x2=\"215.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"273.0\" y1=\"22\" x2=\"273.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"331.0\" y1=\"22\" x2=\"331.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"389.0\" y1=\"22\" x2=\"389.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"447.0\" y1=\"22\" x2=\"447.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"505.0\" y1=\"22\" x2=\"505.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"274.0\" x2=\"534\" y2=\"274.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"232.0\" x2=\"534\" y2=\"232.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"190.0\" x2=\"534\" y2=\"190.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"148.0\" x2=\"534\" y2=\"148.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.0\" x2=\"534\" y2=\"106.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"64.0\" x2=\"534\" y2=\"64.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">90</text><line x1=\"65\" y1=\"274.0\" x2=\"70\" y2=\"274.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"278.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"232.0\" x2=\"70\" y2=\"232.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"236.5\" text-anchor=\"end\" fill=\"#1f2937\">110</text><line x1=\"65\" y1=\"190.0\" x2=\"70\" y2=\"190.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"194.5\" text-anchor=\"end\" fill=\"#1f2937\">120</text><line x1=\"65\" y1=\"148.0\" x2=\"70\" y2=\"148.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"152.5\" text-anchor=\"end\" fill=\"#1f2937\">130</text><line x1=\"65\" y1=\"106.0\" x2=\"70\" y2=\"106.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"110.5\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"65\" y1=\"64.0\" x2=\"70\" y2=\"64.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"68.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">160</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age of a child (years)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Height (cm)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"157.0\" cy=\"290.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"265.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"215.0\" cy=\"253.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"244.0\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"273.0\" cy=\"211.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"160.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"331.0\" cy=\"139.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"360.0\" cy=\"139.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"389.0\" cy=\"110.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"72.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"447.0\" cy=\"55.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"476.0\" cy=\"43.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "No correlation between age of a child and height",
        "correct": false,
        "feedback": "Said there is no pattern, giving No correlation between age of a child and height. The points do follow a clear direction, so there is correlation."
      },
      {
        "text": "Strong positive correlation between age of a child and height",
        "correct": true,
        "feedback": "Correct. As age of a child increases, height rises, and the points lie close to a straight line, so the correlation is strong positive."
      },
      {
        "text": "Strong negative correlation between age of a child and height",
        "correct": false,
        "feedback": "Reversed the direction: the points go up as age of a child increases, giving Strong negative correlation between age of a child and height. As age of a child increases, height goes up, which is positive correlation."
      },
      {
        "text": "Weak positive correlation between age of a child and height",
        "correct": false,
        "feedback": "Judged the points to be spread out, calling the correlation weak, giving Weak positive correlation between age of a child and height. Strong correlation means the points lie close to a straight line. Weak means they are more spread out."
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
    "question": "A library wants to compare the number of books borrowed in each of the twelve months. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A bar chart of the books borrowed in each month",
        "correct": true,
        "feedback": "Correct. Here you need to compare the number in each separate category, and a bar chart compares the frequencies of separate categories."
      },
      {
        "text": "A frequency polygon of the books borrowed in each month",
        "correct": false,
        "feedback": "Chose \"A frequency polygon of the books borrowed in each month\". A frequency polygon shows how grouped data are spread across equal classes, but here you need to compare the number in each separate category."
      },
      {
        "text": "A scatter graph of the books borrowed in each month",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the books borrowed in each month\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to compare the number in each separate category."
      },
      {
        "text": "A line graph of the books borrowed in each month",
        "correct": false,
        "feedback": "Chose \"A line graph of the books borrowed in each month\". A line graph shows how one quantity changes over time, but here you need to compare the number in each separate category."
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
    "question": "The diagram shows the heights of seedlings of two groups, T and U. What value does the leaf 3 in the row with stem 4 represent for group U?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the heights of seedlings: group T on the left and group U on the right, rows (left leaves, then right leaves) 3: 4 2 | 2 6 9; 4: 9 4 | 3 5; 5: - | 5 6 6; 6: 3 | 0 2 4; 7: 9 0 0 0 | -; the key reads 4 | 4 means 44 cm.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group T</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group U</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group T: 4 | 4 means 44 cm</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group U: 4 | 4 means 44 cm</text></svg></div>",
    "options": [
      {
        "text": "43 cm",
        "correct": true,
        "feedback": "Correct. The key shows how to read each row: the stem 4 and the leaf 3 together stand for 43 cm."
      },
      {
        "text": "7 cm",
        "correct": false,
        "feedback": "Added the stem and the leaf, \\(4 + 3\\), giving 7 cm. The stem and leaf are digits of one number, not numbers to add."
      },
      {
        "text": "4.3 cm",
        "correct": false,
        "feedback": "Put the decimal point in the wrong place, giving 4.3 cm. Follow the key to see what the stem and the leaf stand for."
      },
      {
        "text": "34 cm",
        "correct": false,
        "feedback": "Reversed the digits, giving 34 cm. The stem comes first and the leaf second."
      }
    ],
    "retryHint": "Read the key first: it tells you what the stem and the leaf stand for.",
    "backward": "Place value, Ch3.",
    "forward": "Later in this chapter you use values read from the key to find medians and ranges."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the ages of the members of a sports club. How many members are in the class \\(50 \\le a &lt; 60\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the ages of the members of a sports club: points plotted at the class midpoints and joined by straight lines, at (15, 3), (25, 10), (35, 15), (45, 13), (55, 3); the horizontal axis shows the age, a, in years, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"278.9\" x2=\"534\" y2=\"278.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"244.6\" x2=\"534\" y2=\"244.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"210.4\" x2=\"534\" y2=\"210.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"176.1\" x2=\"534\" y2=\"176.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"141.9\" x2=\"534\" y2=\"141.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"107.6\" x2=\"534\" y2=\"107.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"73.4\" x2=\"534\" y2=\"73.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"39.1\" x2=\"534\" y2=\"39.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age, a (years)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,244.6 205.0,124.8 299.0,39.1 393.0,73.4 487.0,244.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"244.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"124.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"39.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"73.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"244.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "16 members",
        "correct": false,
        "feedback": "Added the neighbouring class, 13, to 3, giving 16 members. Only the class \\(50 \\le a &lt; 60\\) is asked for, so use its own height."
      },
      {
        "text": "55 members",
        "correct": false,
        "feedback": "Read the horizontal value of the point, 55, instead of its height, giving 55 members. The point for a class sits at the midpoint of the class across, and its height up the vertical axis is the frequency."
      },
      {
        "text": "13 members",
        "correct": false,
        "feedback": "Read the height of the neighbouring point, for the class \\(40 \\le a &lt; 50\\), giving 13 members. The point for \\(50 \\le a &lt; 60\\) is the one plotted at 55 across."
      },
      {
        "text": "3 members",
        "correct": true,
        "feedback": "Correct. The point for the class \\(50 \\le a &lt; 60\\) is plotted at its midpoint, 55, and its height is the frequency, 3, so there are 3 members in that class."
      }
    ],
    "retryHint": "Find the point at the middle of the class on the horizontal axis, then read across to the vertical axis for the frequency.",
    "backward": "Reading values from a graph, Ch10.",
    "forward": "Later in this chapter you use these heights to estimate a mean."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "What is the midpoint of the class \\(30 \\le n &lt; 35\\)?",
    "options": [
      {
        "text": "35",
        "correct": false,
        "feedback": "Used the upper end of the class, 35. The midpoint lies halfway between the two ends of the class."
      },
      {
        "text": "32.5",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((30 + 35) \\div 2 = 32.5\\)."
      },
      {
        "text": "30",
        "correct": false,
        "feedback": "Used the lower end of the class, 30. The midpoint lies halfway between the two ends of the class."
      },
      {
        "text": "5",
        "correct": false,
        "feedback": "Gave the class width, \\(35 - 30 = 5\\). The width is the length of the class. The midpoint is a position inside it."
      }
    ],
    "retryHint": "Add the two ends of the class together, then divide by 2.",
    "backward": "The mean of two numbers, from earlier stages.",
    "forward": "Later in this chapter you multiply each midpoint by its frequency to estimate the mean."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The masses in a data set run from 42 to 113. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(60 \\le g &lt; 80\\), \\(80 \\le g &lt; 100\\), \\(100 \\le g &lt; 120\\), \\(120 \\le g &lt; 140\\)",
        "correct": false,
        "feedback": "Chose classes that start at 60, so the smallest value, 42, belongs to no class, giving \\(60 \\le g &lt; 80\\), \\(80 \\le g &lt; 100\\), \\(100 \\le g &lt; 120\\), \\(120 \\le g &lt; 140\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(40 \\le g &lt; 60\\), \\(60 \\le g &lt; 80\\), \\(80 \\le g &lt; 120\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(40 \\le g &lt; 60\\), \\(60 \\le g &lt; 80\\), \\(80 \\le g &lt; 120\\). Classes should all have the same width, so the frequencies can be compared fairly."
      },
      {
        "text": "\\(40 \\le g &lt; 60\\), \\(60 \\le g &lt; 80\\), \\(80 \\le g &lt; 100\\), \\(100 \\le g &lt; 120\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 20, the classes start at 40, which is at or below the smallest value, 42, and the last class reaches above the largest, 113. Each end value belongs to exactly one class because the upper end is left out."
      },
      {
        "text": "\\(40 \\le g \\le 60\\), \\(60 \\le g \\le 80\\), \\(80 \\le g \\le 100\\), \\(100 \\le g \\le 120\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 60 would fit in two classes, giving \\(40 \\le g \\le 60\\), \\(60 \\le g \\le 80\\), \\(80 \\le g \\le 100\\), \\(100 \\le g \\le 120\\). Each value must be in exactly one class, so one end of each class must be left out."
      }
    ],
    "retryHint": "Check three things: equal widths, no gaps or overlaps, and every value from smallest to largest is covered.",
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the reaction times of the volunteers in a reaction experiment. How many volunteers are there altogether?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the reaction times of the volunteers in a reaction experiment: points plotted at the class midpoints and joined by straight lines, at (250, 2), (350, 6), (450, 10), (550, 15), (650, 11); the horizontal axis shows the time, r, in milliseconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"278.9\" x2=\"534\" y2=\"278.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"244.6\" x2=\"534\" y2=\"244.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"210.4\" x2=\"534\" y2=\"210.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"176.1\" x2=\"534\" y2=\"176.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"141.9\" x2=\"534\" y2=\"141.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"107.6\" x2=\"534\" y2=\"107.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"73.4\" x2=\"534\" y2=\"73.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"39.1\" x2=\"534\" y2=\"39.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">200</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">300</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">400</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">500</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">600</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">700</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, r (milliseconds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,261.8 205.0,193.2 299.0,124.8 393.0,39.1 487.0,107.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"261.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"193.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"124.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"39.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"107.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "46 volunteers",
        "correct": false,
        "feedback": "Added the first height, 2, a second time: \\(44 + 2 = 46\\), giving 46 volunteers. Each point's height is added once."
      },
      {
        "text": "44 volunteers",
        "correct": true,
        "feedback": "Correct. Each height is the frequency of one class, so the total is \\(2 + 6 + 10 + 15 + 11 = 44\\)."
      },
      {
        "text": "15 volunteers",
        "correct": false,
        "feedback": "Gave the height of the tallest point, 15, giving 15 volunteers. The tallest point is only one class. Every point's height counts, so add them all."
      },
      {
        "text": "75 volunteers",
        "correct": false,
        "feedback": "Multiplied the number of classes, 5, by the tallest height, 15: \\(5 \\times 15 = 75\\), giving 75 volunteers. The points have different heights, so add the individual heights instead."
      }
    ],
    "backward": "Reading values from a graph, Ch10, and adding whole numbers, from earlier stages.",
    "forward": "Later in this chapter you divide by this total to find a mean."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the distances thrown by the pupils in a throwing event; the frequency of each class is given in brackets: \\(10 \\le d &lt; 20\\) (1); \\(20 \\le d &lt; 30\\) (2); \\(30 \\le d &lt; 40\\) (9); \\(40 \\le d &lt; 50\\) (16); \\(50 \\le d &lt; 60\\) (9). How many pupils have a distance of less than 50?",
    "options": [
      {
        "text": "28 pupils",
        "correct": true,
        "feedback": "Correct. The classes below 50 have frequencies 1, 2, 9, 16, so \\(1 + 2 + 9 + 16 = 28\\)."
      },
      {
        "text": "9 pupils",
        "correct": false,
        "feedback": "Found the number of 50 or more instead, \\(37 - 28 = 9\\), giving 9 pupils. The question asks for the pupils below 50."
      },
      {
        "text": "12 pupils",
        "correct": false,
        "feedback": "Left out the class just below 50, 16, giving 12 pupils. That class lies completely below 50, so it is included."
      },
      {
        "text": "16 pupils",
        "correct": false,
        "feedback": "Used only the class just below 50, 16, giving 16 pupils. 'Less than 50' includes every class below it."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use running totals like this to find the class containing the median."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of house price against number of rooms. Look at the point where number of rooms is 5. What is the house price for that point?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of house price against number of rooms: 12 points at (2, 136), (4, 234), (4, 237), (4, 269), (5, 316), (5, 324), (6, 329), (6, 358), (7, 434), (7, 441), (8, 434), (8, 472); the horizontal axis shows number of rooms and the vertical axis shows house price (thousand pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"304.2\" x2=\"534\" y2=\"304.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"292.5\" x2=\"534\" y2=\"292.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"280.7\" x2=\"534\" y2=\"280.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"269.0\" x2=\"534\" y2=\"269.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"245.4\" x2=\"534\" y2=\"245.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"233.7\" x2=\"534\" y2=\"233.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"221.9\" x2=\"534\" y2=\"221.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"210.2\" x2=\"534\" y2=\"210.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"186.6\" x2=\"534\" y2=\"186.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"174.9\" x2=\"534\" y2=\"174.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"163.1\" x2=\"534\" y2=\"163.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"151.4\" x2=\"534\" y2=\"151.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"127.8\" x2=\"534\" y2=\"127.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"116.1\" x2=\"534\" y2=\"116.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"104.3\" x2=\"534\" y2=\"104.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"92.6\" x2=\"534\" y2=\"92.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"69.0\" x2=\"534\" y2=\"69.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"57.3\" x2=\"534\" y2=\"57.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"45.5\" x2=\"534\" y2=\"45.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"33.8\" x2=\"534\" y2=\"33.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"121.6\" y1=\"22\" x2=\"121.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"173.1\" y1=\"22\" x2=\"173.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"276.2\" y1=\"22\" x2=\"276.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"327.8\" y1=\"22\" x2=\"327.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"430.9\" y1=\"22\" x2=\"430.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"482.4\" y1=\"22\" x2=\"482.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"257.2\" x2=\"70\" y2=\"257.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"261.7\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"198.4\" x2=\"70\" y2=\"198.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"202.9\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"139.6\" x2=\"70\" y2=\"139.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"144.1\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"80.8\" x2=\"70\" y2=\"80.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"85.3\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">500</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"121.6\" y1=\"316\" x2=\"121.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"121.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">1</text><line x1=\"173.1\" y1=\"316\" x2=\"173.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"173.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">3</text><line x1=\"276.2\" y1=\"316\" x2=\"276.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"276.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"327.8\" y1=\"316\" x2=\"327.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"327.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"430.9\" y1=\"316\" x2=\"430.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"430.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">7</text><line x1=\"482.4\" y1=\"316\" x2=\"482.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"482.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">9</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of rooms</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">House price (thousand pounds)</text><circle cx=\"173.1\" cy=\"236.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"276.2\" cy=\"178.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"276.2\" cy=\"176.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"276.2\" cy=\"157.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"327.8\" cy=\"130.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"327.8\" cy=\"125.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"122.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"105.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"60.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"56.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"482.4\" cy=\"60.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"482.4\" cy=\"38.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "316 thousand pounds",
        "correct": false,
        "feedback": "Read the point on the other side, at 5, giving 316 thousand pounds. The point at 5 across is the one needed."
      },
      {
        "text": "324 thousand pounds",
        "correct": true,
        "feedback": "Correct. Go to 5 on the horizontal axis, find the point above it, then read across to the vertical axis: 324."
      },
      {
        "text": "5 thousand pounds",
        "correct": false,
        "feedback": "Gave the number of rooms value, 5, as the answer, giving 5 thousand pounds. The house price is read up the vertical axis, not along the horizontal axis."
      },
      {
        "text": "329 thousand pounds",
        "correct": false,
        "feedback": "Read the point beside it, at 6, giving 329 thousand pounds. The point at 5 across is the one needed."
      }
    ],
    "backward": "Reading coordinates from a graph, Ch10.",
    "forward": "Later in this chapter you read values from a line of best fit in the same way."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A kiosk has recorded the temperature and the number of cold drinks sold on each of 25 days and wants to see whether the two are related. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A scatter graph of the daily temperatures and cold drinks sold",
        "correct": true,
        "feedback": "Correct. Here you need to see whether two measurements are related, and a scatter graph shows whether two measurements taken on the same items are related."
      },
      {
        "text": "A line graph of the daily temperatures and cold drinks sold",
        "correct": false,
        "feedback": "Chose \"A line graph of the daily temperatures and cold drinks sold\". A line graph shows how one quantity changes over time, but here you need to see whether two measurements are related."
      },
      {
        "text": "A pie chart of the daily temperatures and cold drinks sold",
        "correct": false,
        "feedback": "Chose \"A pie chart of the daily temperatures and cold drinks sold\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to see whether two measurements are related."
      },
      {
        "text": "A frequency polygon of the daily temperatures and cold drinks sold",
        "correct": false,
        "feedback": "Chose \"A frequency polygon of the daily temperatures and cold drinks sold\". A frequency polygon shows how grouped data are spread across equal classes, but here you need to see whether two measurements are related."
      }
    ],
    "backward": "Reading and choosing graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the pulse rates of two groups, J and K. What is the lowest value in group J?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the pulse rates: group J on the left and group K on the right, rows (left leaves, then right leaves) 6: 7 | -; 7: 8 8 2 | 2 6 6; 8: 6 5 | 5 8; 9: 5 0 | 3 4 9; 10: 2 | 1 2 6; the key reads 7 | 2 means 72 beats per minute.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group J</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group K</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"193.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"178.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"302.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"287.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">9</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"193.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"302.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"302.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group J: 2 | 7 means 72 beats per minute</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group K: 7 | 2 means 72 beats per minute</text></svg></div>",
    "options": [
      {
        "text": "102 beats per minute",
        "correct": false,
        "feedback": "Read the highest value, 102, giving 102 beats per minute. The lowest value is in the first row, not the last."
      },
      {
        "text": "60 beats per minute",
        "correct": false,
        "feedback": "Used the stem alone, 60, giving 60 beats per minute. The leaf is part of the value as well."
      },
      {
        "text": "67 beats per minute",
        "correct": true,
        "feedback": "Correct. The lowest value is in the first row, and the leaf closest to the stem is the smallest, so the lowest value is 67 beats per minute."
      },
      {
        "text": "72 beats per minute",
        "correct": false,
        "feedback": "Read the lowest value in group K instead, 72, giving 72 beats per minute. The question asks about group J."
      }
    ],
    "backward": "Multiplying and dividing by powers of 10, Ch3.",
    "forward": "Later in this chapter you use the lowest and highest values to find the range."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the waiting times of the patients at a clinic one morning; the frequency of each class is given in brackets: \\(10 \\le x &lt; 15\\) (1); \\(15 \\le x &lt; 20\\) (5); \\(20 \\le x &lt; 25\\) (7); \\(25 \\le x &lt; 30\\) (5); \\(30 \\le x &lt; 35\\) (1); \\(35 \\le x &lt; 40\\) (1). What percentage of the patients are in the class \\(10 \\le x &lt; 15\\)?",
    "options": [
      {
        "text": "10%",
        "correct": false,
        "feedback": "Doubled the percentage, \\(2 \\times 5 = 10\\), giving 10%. The class has 1 of 20, which is 5%."
      },
      {
        "text": "5%",
        "correct": true,
        "feedback": "Correct. The class has 1 of the \\(1 + 5 + 7 + 5 + 1 + 1 = 20\\) patients, so the percentage is \\(1 \\div 20 \\times 100 = 5\\%\\)."
      },
      {
        "text": "1%",
        "correct": false,
        "feedback": "Gave the frequency, 1, as the percentage, giving 1%. A percentage is out of 100. Divide by the total, 20, then multiply by 100."
      },
      {
        "text": "95%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 5 = 95\\), giving 95%. The question asks for the percentage inside the class."
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
    "question": "The diagram shows two frequency polygons on the same axes, group R and group S, for the journey times. Which statement about the modal classes is correct?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Two frequency polygons on the same axes for the journey times, group R (solid line) at (25, 3), (35, 9), (45, 10), (55, 8) and group S (dashed line) at (25, 7), (35, 11), (45, 8), (55, 4); the horizontal axis shows the time, t, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.8\" x2=\"534\" y2=\"273.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"251.7\" x2=\"534\" y2=\"251.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"229.5\" x2=\"534\" y2=\"229.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"207.3\" x2=\"534\" y2=\"207.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"185.2\" x2=\"534\" y2=\"185.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"163.0\" x2=\"534\" y2=\"163.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"140.8\" x2=\"534\" y2=\"140.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"118.7\" x2=\"534\" y2=\"118.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"96.5\" x2=\"534\" y2=\"96.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.2\" x2=\"534\" y2=\"52.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30.0\" x2=\"534\" y2=\"30.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"30\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"30\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"30\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"30\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"30\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.8\" x2=\"64\" y2=\"273.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"278.3\" text-anchor=\"end\" fill=\"#1f2937\">1</text><line x1=\"59\" y1=\"251.7\" x2=\"64\" y2=\"251.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"256.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"229.5\" x2=\"64\" y2=\"229.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"234.0\" text-anchor=\"end\" fill=\"#1f2937\">3</text><line x1=\"59\" y1=\"207.3\" x2=\"64\" y2=\"207.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"211.8\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"185.2\" x2=\"64\" y2=\"185.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"189.7\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"59\" y1=\"163.0\" x2=\"64\" y2=\"163.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"167.5\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"140.8\" x2=\"64\" y2=\"140.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"145.3\" text-anchor=\"end\" fill=\"#1f2937\">7</text><line x1=\"59\" y1=\"118.7\" x2=\"64\" y2=\"118.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"123.2\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"96.5\" x2=\"64\" y2=\"96.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"101.0\" text-anchor=\"end\" fill=\"#1f2937\">9</text><line x1=\"59\" y1=\"74.3\" x2=\"64\" y2=\"74.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"78.8\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"52.2\" x2=\"64\" y2=\"52.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"56.7\" text-anchor=\"end\" fill=\"#1f2937\">11</text><line x1=\"59\" y1=\"30.0\" x2=\"64\" y2=\"30.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"34.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, t (minutes)</text><text transform=\"translate(16 163.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,229.5 240.2,96.5 357.8,74.3 475.2,118.7\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"229.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"96.5\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"74.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"118.7\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><polyline points=\"122.8,140.8 240.2,52.2 357.8,118.7 475.2,207.3\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-dasharray=\"7 4\"/><rect x=\"118.8\" y=\"136.8\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"236.2\" y=\"48.2\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"353.8\" y=\"114.7\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><rect x=\"471.2\" y=\"203.3\" width=\"8\" height=\"8\" fill=\"#b45309\" stroke=\"#fff\" stroke-width=\"1\"/><line x1=\"72\" y1=\"14\" x2=\"102\" y2=\"14\" stroke=\"#1d4ed8\" stroke-width=\"2.2\"/><text x=\"108\" y=\"18.5\" fill=\"#1f2937\">Group R</text><line x1=\"202\" y1=\"14\" x2=\"232\" y2=\"14\" stroke=\"#b45309\" stroke-width=\"2.2\" stroke-dasharray=\"7 4\"/><text x=\"238\" y=\"18.5\" fill=\"#1f2937\">Group S</text></svg></div>",
    "options": [
      {
        "text": "Group R is modal in \\(40 \\le t &lt; 50\\) and group S is modal in \\(30 \\le t &lt; 40\\)",
        "correct": true,
        "feedback": "Correct. The highest point of group R is 10, at the class \\(40 \\le t &lt; 50\\). The highest point of group S is 11, at the class \\(30 \\le t &lt; 40\\)."
      },
      {
        "text": "Group R is modal in \\(30 \\le t &lt; 40\\) and group S is modal in \\(40 \\le t &lt; 50\\)",
        "correct": false,
        "feedback": "Swapped the two groups: read group R's polygon as group S's, giving Group R is modal in \\(30 \\le t &lt; 40\\) and group S is modal in \\(40 \\le t &lt; 50\\). Group R is the solid line. Its highest point is at the class \\(40 \\le t &lt; 50\\)."
      },
      {
        "text": "Both groups are modal in \\(40 \\le t &lt; 50\\)",
        "correct": false,
        "feedback": "Read the highest point of group R only, the class \\(40 \\le t &lt; 50\\), giving Both groups are modal in \\(40 \\le t &lt; 50\\). Each polygon has its own highest point. Group S's is at the class \\(30 \\le t &lt; 40\\)."
      },
      {
        "text": "Both groups are modal in \\(30 \\le t &lt; 40\\)",
        "correct": false,
        "feedback": "Read the highest point of group S only, the class \\(30 \\le t &lt; 40\\), giving Both groups are modal in \\(30 \\le t &lt; 40\\). Each polygon has its own highest point. Group R's is at the class \\(40 \\le t &lt; 50\\)."
      }
    ],
    "backward": "Reading and comparing values on a graph, Ch10.",
    "forward": "Later in this chapter you compare two groups using their estimated means."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the heights of the sunflower plants in a school garden; the frequency of each class is given in brackets: \\(40 \\le h &lt; 60\\) (13); \\(60 \\le h &lt; 80\\) (14); \\(80 \\le h &lt; 100\\) (13); \\(100 \\le h &lt; 120\\) (8); \\(120 \\le h &lt; 140\\) (2). Estimate the mean height.",
    "options": [
      {
        "text": "90 cm",
        "correct": false,
        "feedback": "Took the mean of the midpoints without using the frequencies: \\((50 + 70 + 90 + 110 + 130) \\div 5\\), giving 90 cm. Each midpoint must be counted as many times as its frequency, so multiply by the frequency first."
      },
      {
        "text": "78.8 cm",
        "correct": true,
        "feedback": "Correct. The midpoints are 50, 70, 90, 110, 130. The total of midpoint×frequency is \\(650 + 980 + 1170 + 880 + 260 = 3940\\), and the number of plants is \\(13 + 14 + 13 + 8 + 2 = 50\\), so the estimated mean is \\(3940 \\div 50 = 78.8\\)."
      },
      {
        "text": "788 cm",
        "correct": false,
        "feedback": "Divided 3940 by the number of classes, 5, giving 788 cm. Divide by the total frequency, 50, which is the number of plants."
      },
      {
        "text": "3940 cm",
        "correct": false,
        "feedback": "Found the total of the midpoints times the frequencies, \\(650 + 980 + 1170 + 880 + 260 = 3940\\), and did not divide, giving 3940 cm. A mean needs dividing by the number of plants, 50."
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
    "question": "The diagram shows a scatter graph of test mark against number of absences. Which description fits the correlation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of test mark against number of absences: 12 points at (0, 88), (2, 80), (3, 77), (4, 76), (5, 67), (6, 65), (7, 66), (8, 60), (9, 54), (10, 48), (11, 44), (12, 40); the horizontal axis shows number of absences and the vertical axis shows test mark.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"306.2\" x2=\"534\" y2=\"306.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"247.4\" x2=\"534\" y2=\"247.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"208.2\" x2=\"534\" y2=\"208.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"188.6\" x2=\"534\" y2=\"188.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"149.4\" x2=\"534\" y2=\"149.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"129.8\" x2=\"534\" y2=\"129.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"90.6\" x2=\"534\" y2=\"90.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"31.8\" x2=\"534\" y2=\"31.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"103.1\" y1=\"22\" x2=\"103.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"169.4\" y1=\"22\" x2=\"169.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"235.7\" y1=\"22\" x2=\"235.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"368.3\" y1=\"22\" x2=\"368.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"434.6\" y1=\"22\" x2=\"434.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"500.9\" y1=\"22\" x2=\"500.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"267.0\" x2=\"534\" y2=\"267.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"71.0\" x2=\"534\" y2=\"71.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"136.3\" y1=\"22\" x2=\"136.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"202.6\" y1=\"22\" x2=\"202.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"268.9\" y1=\"22\" x2=\"268.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"335.1\" y1=\"22\" x2=\"335.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"401.4\" y1=\"22\" x2=\"401.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"467.7\" y1=\"22\" x2=\"467.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">30</text><line x1=\"65\" y1=\"267.0\" x2=\"70\" y2=\"267.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"271.5\" text-anchor=\"end\" fill=\"#1f2937\">40</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">50</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">60</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">70</text><line x1=\"65\" y1=\"71.0\" x2=\"70\" y2=\"71.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"75.5\" text-anchor=\"end\" fill=\"#1f2937\">80</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">90</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"136.3\" y1=\"316\" x2=\"136.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"136.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"202.6\" y1=\"316\" x2=\"202.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"202.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"268.9\" y1=\"316\" x2=\"268.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"268.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"335.1\" y1=\"316\" x2=\"335.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"335.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"401.4\" y1=\"316\" x2=\"401.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"401.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"467.7\" y1=\"316\" x2=\"467.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"467.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of absences</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Test mark</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"70.0\" cy=\"31.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"136.3\" cy=\"71.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"169.4\" cy=\"85.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"202.6\" cy=\"90.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"235.7\" cy=\"134.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"268.9\" cy=\"144.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"139.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"335.1\" cy=\"169.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"368.3\" cy=\"198.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"401.4\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"434.6\" cy=\"247.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"467.7\" cy=\"267.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "No correlation between number of absences and test mark",
        "correct": false,
        "feedback": "Said there is no pattern, giving No correlation between number of absences and test mark. The points do follow a clear direction, so there is correlation."
      },
      {
        "text": "Strong positive correlation between number of absences and test mark",
        "correct": false,
        "feedback": "Reversed the direction: the points go down as number of absences increases, giving Strong positive correlation between number of absences and test mark. As number of absences increases, test mark goes down, which is negative correlation."
      },
      {
        "text": "Weak negative correlation between number of absences and test mark",
        "correct": false,
        "feedback": "Judged the points to be spread out, calling the correlation weak, giving Weak negative correlation between number of absences and test mark. Strong correlation means the points lie close to a straight line. Weak means they are more spread out."
      },
      {
        "text": "Strong negative correlation between number of absences and test mark",
        "correct": true,
        "feedback": "Correct. As number of absences increases, test mark falls, and the points lie close to a straight line, so the correlation is strong negative."
      }
    ],
    "backward": "Straight-line functions, Ch9, and gradient, Ch10.",
    "forward": "Later in this chapter you draw a line of best fit through scatter graphs like this."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "The masses of 80 parcels have been grouped into classes of equal width. A depot manager wants to show how the masses are spread. Which type of diagram is the most suitable?",
    "options": [
      {
        "text": "A bar chart of the masses of the parcels",
        "correct": false,
        "feedback": "Chose \"A bar chart of the masses of the parcels\". A bar chart compares the frequencies of separate categories, but here you need to show the shape of grouped data."
      },
      {
        "text": "A scatter graph of the masses of the parcels",
        "correct": false,
        "feedback": "Chose \"A scatter graph of the masses of the parcels\". A scatter graph shows whether two measurements taken on the same items are related, but here you need to show the shape of grouped data."
      },
      {
        "text": "A frequency polygon of the masses of the parcels",
        "correct": true,
        "feedback": "Correct. Here you need to show the shape of grouped data, and a frequency polygon shows how grouped data are spread across equal classes."
      },
      {
        "text": "A pie chart of the masses of the parcels",
        "correct": false,
        "feedback": "Chose \"A pie chart of the masses of the parcels\". A pie chart shows how a total is split between categories as shares of the whole, but here you need to show the shape of grouped data."
      }
    ],
    "backward": "Plotting graphs, Ch10.",
    "forward": "Later in this chapter you use these diagrams to answer questions about data."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the waiting times of two groups, A and B. What is the mode of group B?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 322\" width=\"480\" height=\"322\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the waiting times: group A on the left and group B on the right, rows (left leaves, then right leaves) 0: 7 6 | 9; 1: 1 | 1 6 7; 2: 6 5 | 5 6 6 8; 3: 5 3 | 7; 4: 7 7 1 | -; 5: - | 4; the key reads 1 | 1 means 11 minutes.\"><rect width=\"480\" height=\"322\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group A</text><text x=\"291.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group B</text><text x=\"232.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"210.5\" y1=\"42\" x2=\"210.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"254.5\" y1=\"42\" x2=\"254.5\" y2=\"232\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"232.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">0</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"264.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"232.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"264.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"232.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"185.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"264.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">5</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">8</text><text x=\"232.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"264.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"232.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"185.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"170.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"232.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"264.5\" y=\"210\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"262\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group A: 1 | 1 means 11 minutes</text><text x=\"240.0\" y=\"282\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group B: 1 | 1 means 11 minutes</text></svg></div>",
    "options": [
      {
        "text": "20 minutes",
        "correct": false,
        "feedback": "Chose the stem with the most leaves, 20, giving 20 minutes. The mode is a single value that appears most often, not a row."
      },
      {
        "text": "47 minutes",
        "correct": false,
        "feedback": "Gave the mode of group A instead, giving 47 minutes. The question asks about group B."
      },
      {
        "text": "26 minutes",
        "correct": true,
        "feedback": "Correct. The value 26 appears 2 times in group B, more than any other value, so it is the mode."
      },
      {
        "text": "6 minutes",
        "correct": false,
        "feedback": "Gave only the leaf, 6, giving 6 minutes. The mode is the whole value, stem and leaf together."
      }
    ],
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you use the mode and the median together when you describe a data set."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the amounts spent by the customers in a shop one afternoon; the frequency of each class is given in brackets: \\(20 \\le c &lt; 40\\) (5); \\(40 \\le c &lt; 60\\) (9); \\(60 \\le c &lt; 80\\) (16); \\(80 \\le c &lt; 100\\) (10). What percentage of the customers are in the class \\(60 \\le c &lt; 80\\)?",
    "options": [
      {
        "text": "100%",
        "correct": false,
        "feedback": "Divided by the tallest frequency, 16, giving 100%. Divide by the total number of customers, 40."
      },
      {
        "text": "16%",
        "correct": false,
        "feedback": "Gave the frequency, 16, as the percentage, giving 16%. A percentage is out of 100. Divide by the total, 40, then multiply by 100."
      },
      {
        "text": "60%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 40 = 60\\), giving 60%. The question asks for the percentage inside the class."
      },
      {
        "text": "40%",
        "correct": true,
        "feedback": "Correct. The class has 16 of the \\(5 + 9 + 16 + 10 = 40\\) customers, so the percentage is \\(16 \\div 40 \\times 100 = 40\\%\\)."
      }
    ],
    "backward": "Percentages, Ch3.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the ages of the members of a sports club. How many more members are in the class \\(30 \\le a &lt; 40\\) than in the class \\(10 \\le a &lt; 20\\)?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the ages of the members of a sports club: points plotted at the class midpoints and joined by straight lines, at (15, 1), (25, 5), (35, 11), (45, 14), (55, 8); the horizontal axis shows the age, a, in years, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"278.9\" x2=\"534\" y2=\"278.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"244.6\" x2=\"534\" y2=\"244.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"210.4\" x2=\"534\" y2=\"210.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"176.1\" x2=\"534\" y2=\"176.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"141.9\" x2=\"534\" y2=\"141.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"107.6\" x2=\"534\" y2=\"107.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"73.4\" x2=\"534\" y2=\"73.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"39.1\" x2=\"534\" y2=\"39.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"261.8\" x2=\"64\" y2=\"261.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"266.2\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"193.2\" x2=\"64\" y2=\"193.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"197.8\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"124.8\" x2=\"64\" y2=\"124.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"129.2\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"56.2\" x2=\"64\" y2=\"56.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"60.8\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Age, a (years)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,278.9 205.0,210.4 299.0,107.6 393.0,56.2 487.0,159.0\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"278.9\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"210.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"107.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"56.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "12 members",
        "correct": false,
        "feedback": "Added the two heights, \\(11 + 1 = 12\\), giving 12 members. 'How many more' means subtract the smaller from the larger."
      },
      {
        "text": "11 members",
        "correct": false,
        "feedback": "Gave the height of the class \\(30 \\le a &lt; 40\\) alone, 11, giving 11 members. The question compares it with the class \\(10 \\le a &lt; 20\\), which has height 1."
      },
      {
        "text": "20 members",
        "correct": false,
        "feedback": "Subtracted the midpoints, 20, instead of the heights, giving 20 members. The midpoints are positions across the axis. The frequencies are the heights."
      },
      {
        "text": "10 members",
        "correct": true,
        "feedback": "Correct. The heights are 11 for \\(30 \\le a &lt; 40\\) and 1 for \\(10 \\le a &lt; 20\\), so the difference is \\(11 - 1 = 10\\)."
      }
    ],
    "backward": "Finding a difference by subtracting, from earlier stages.",
    "forward": "Later in this chapter you compare two polygons on the same axes."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the reaction times of the volunteers in a reaction experiment; the frequency of each class is given in brackets: \\(200 \\le r &lt; 250\\) (1); \\(250 \\le r &lt; 300\\) (2); \\(300 \\le r &lt; 350\\) (5); \\(350 \\le r &lt; 400\\) (13); \\(400 \\le r &lt; 450\\) (16). Which class contains the median?",
    "options": [
      {
        "text": "\\(350 \\le r &lt; 400\\)",
        "correct": true,
        "feedback": "Correct. There are \\(1 + 2 + 5 + 13 + 16 = 37\\) values, so the middle value is the 19th value. The running totals are 1, 3, 8, 21, so the 19th value falls in the class \\(350 \\le r &lt; 400\\)."
      },
      {
        "text": "\\(200 \\le r &lt; 250\\)",
        "correct": false,
        "feedback": "Chose the class \\(200 \\le r &lt; 250\\), where the running total is only 1, giving \\(200 \\le r &lt; 250\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(250 \\le r &lt; 300\\)",
        "correct": false,
        "feedback": "Chose the class \\(250 \\le r &lt; 300\\), where the running total is only 3, giving \\(250 \\le r &lt; 300\\). The running total must reach the middle position, so keep adding until it does."
      },
      {
        "text": "\\(300 \\le r &lt; 350\\)",
        "correct": false,
        "feedback": "Chose the class where the running total stopped before reaching the middle position, giving \\(300 \\le r &lt; 350\\). Keep adding until the running total reaches the middle position among all the values."
      }
    ],
    "backward": "The median, from earlier stages.",
    "forward": "Later in this chapter you use the whole table to estimate the mean as well."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of house price against distance from the town centre. One point does not fit the pattern. What are its coordinates?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of house price against distance from the town centre: 12 points at (1, 402), (2, 393), (3, 369), (4, 363), (6, 319), (7, 307), (8, 306), (10, 146), (11, 240), (13, 223), (14, 208), (15, 170); the horizontal axis shows distance from the town centre (km) and the vertical axis shows house price (thousand pounds).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"307.6\" x2=\"534\" y2=\"307.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"299.2\" x2=\"534\" y2=\"299.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"290.8\" x2=\"534\" y2=\"290.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"282.4\" x2=\"534\" y2=\"282.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"248.8\" x2=\"534\" y2=\"248.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"240.4\" x2=\"534\" y2=\"240.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"223.6\" x2=\"534\" y2=\"223.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"215.2\" x2=\"534\" y2=\"215.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"206.8\" x2=\"534\" y2=\"206.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"181.6\" x2=\"534\" y2=\"181.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"173.2\" x2=\"534\" y2=\"173.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"164.8\" x2=\"534\" y2=\"164.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"156.4\" x2=\"534\" y2=\"156.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"131.2\" x2=\"534\" y2=\"131.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"122.8\" x2=\"534\" y2=\"122.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"114.4\" x2=\"534\" y2=\"114.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"97.6\" x2=\"534\" y2=\"97.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"89.2\" x2=\"534\" y2=\"89.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"72.4\" x2=\"534\" y2=\"72.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"55.6\" x2=\"534\" y2=\"55.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"47.2\" x2=\"534\" y2=\"47.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"38.8\" x2=\"534\" y2=\"38.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"30.4\" x2=\"534\" y2=\"30.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"99.0\" y1=\"22\" x2=\"99.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"157.0\" y1=\"22\" x2=\"157.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"215.0\" y1=\"22\" x2=\"215.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"273.0\" y1=\"22\" x2=\"273.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"331.0\" y1=\"22\" x2=\"331.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"389.0\" y1=\"22\" x2=\"389.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"447.0\" y1=\"22\" x2=\"447.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"505.0\" y1=\"22\" x2=\"505.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"274.0\" x2=\"534\" y2=\"274.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"232.0\" x2=\"534\" y2=\"232.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"190.0\" x2=\"534\" y2=\"190.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"148.0\" x2=\"534\" y2=\"148.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.0\" x2=\"534\" y2=\"106.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"64.0\" x2=\"534\" y2=\"64.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"128.0\" y1=\"22\" x2=\"128.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"244.0\" y1=\"22\" x2=\"244.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"360.0\" y1=\"22\" x2=\"360.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"476.0\" y1=\"22\" x2=\"476.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">100</text><line x1=\"65\" y1=\"274.0\" x2=\"70\" y2=\"274.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"278.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"232.0\" x2=\"70\" y2=\"232.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"236.5\" text-anchor=\"end\" fill=\"#1f2937\">200</text><line x1=\"65\" y1=\"190.0\" x2=\"70\" y2=\"190.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"194.5\" text-anchor=\"end\" fill=\"#1f2937\">250</text><line x1=\"65\" y1=\"148.0\" x2=\"70\" y2=\"148.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"152.5\" text-anchor=\"end\" fill=\"#1f2937\">300</text><line x1=\"65\" y1=\"106.0\" x2=\"70\" y2=\"106.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"110.5\" text-anchor=\"end\" fill=\"#1f2937\">350</text><line x1=\"65\" y1=\"64.0\" x2=\"70\" y2=\"64.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"68.5\" text-anchor=\"end\" fill=\"#1f2937\">400</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">450</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"128.0\" y1=\"316\" x2=\"128.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"128.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"186.0\" y1=\"316\" x2=\"186.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"186.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"244.0\" y1=\"316\" x2=\"244.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"244.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"360.0\" y1=\"316\" x2=\"360.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"360.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"418.0\" y1=\"316\" x2=\"418.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"418.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><line x1=\"476.0\" y1=\"316\" x2=\"476.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"476.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">14</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">16</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance from the town centre (km)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">House price (thousand pounds)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"99.0\" cy=\"62.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"128.0\" cy=\"69.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"157.0\" cy=\"90.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"95.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"244.0\" cy=\"132.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"273.0\" cy=\"142.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"302.0\" cy=\"143.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"360.0\" cy=\"277.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"389.0\" cy=\"198.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"447.0\" cy=\"212.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"476.0\" cy=\"225.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"505.0\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "(8, 306)",
        "correct": false,
        "feedback": "Chose a point in the middle of the cloud, giving (8, 306). An outlier lies away from the main group of points, not in the middle of it."
      },
      {
        "text": "(146, 10)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving (146, 10). Write coordinates as (across, up): the horizontal value first."
      },
      {
        "text": "(1, 402)",
        "correct": false,
        "feedback": "Chose the highest point, which still follows the pattern, giving (1, 402). An outlier is a point that does not fit the pattern of the rest, not simply the highest one."
      },
      {
        "text": "(10, 146)",
        "correct": true,
        "feedback": "Correct. Most points follow the trend, but the point (10, 146) lies well away from it. That is the outlier."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you decide how far to trust estimates when a data set has an outlier."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Representing data",
    "question": "A bar chart shows the prices of two brands: 90 and 126. Its vertical axis starts at 86 instead of 0. How many times as tall as the first bar does the second bar look?",
    "options": [
      {
        "text": "40 times as tall",
        "correct": false,
        "feedback": "Gave the height of the second bar above 86, 40, as the number of times, giving 40 times as tall. Divide the second height by the first height, both measured from the start of the axis."
      },
      {
        "text": "36 times as tall",
        "correct": false,
        "feedback": "Used the difference of the two values, \\(126 - 90 = 36\\), giving 36 times as tall. Compare the heights of the bars as drawn, which start from the beginning of the axis."
      },
      {
        "text": "10 times as tall",
        "correct": true,
        "feedback": "Correct. With the axis starting at 86, the bars are drawn with heights \\(126 - 86 = 40\\) and \\(90 - 86 = 4\\). So the second bar looks \\(40 \\div 4 = 10\\) times as tall, although the real values are close."
      },
      {
        "text": "11 times as tall",
        "correct": false,
        "feedback": "Divided to get 10 and then added 1, giving 11 times as tall. The second bar is 10 times the height of the first, not 11."
      }
    ],
    "backward": "Reading scales on graphs, Ch10, and ratio, Ch11.",
    "forward": "Later in this chapter you meet other features that make a graph misleading."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the masses of apples of two groups, C and D. What is the range of group C?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the masses of apples: group C on the left and group D on the right, rows (left leaves, then right leaves) 10: 8 7 7 6 | 2 6; 11: 1 | 3 9; 12: 9 4 | 4; 13: 2 | 1 7 7 9; 14: 1 | 7; the key reads 11 | 1 means 111 grams.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"181.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group C</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group D</text><text x=\"240.0\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"218.0\" y1=\"42\" x2=\"218.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"262.0\" y1=\"42\" x2=\"262.0\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"240.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">10</text><text x=\"208.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"193.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"178.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"163.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"272.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"287.0\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">11</text><text x=\"208.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"272.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"287.0\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">12</text><text x=\"208.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"193.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"272.0\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">13</text><text x=\"208.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"272.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"287.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"302.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"317.0\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"240.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">14</text><text x=\"208.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"272.0\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group C: 1 | 11 means 111 grams</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group D: 11 | 1 means 111 grams</text></svg></div>",
    "options": [
      {
        "text": "247 grams",
        "correct": false,
        "feedback": "Added the highest and lowest values, \\(106 + 141\\), giving 247 grams. The range is the highest minus the lowest."
      },
      {
        "text": "45 grams",
        "correct": false,
        "feedback": "Found the range of group D instead, 45, giving 45 grams. The question asks about group C."
      },
      {
        "text": "141 grams",
        "correct": false,
        "feedback": "Gave the highest value, 141, giving 141 grams. A range is a difference. Take the lowest value away."
      },
      {
        "text": "35 grams",
        "correct": true,
        "feedback": "Correct. The highest value is 141 and the lowest is 106, so the range is \\(141 - 106 = 35\\)."
      }
    ],
    "backward": "The range, from earlier stages.",
    "forward": "Later in this chapter you use the range to compare how spread out two groups are."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The distances cycled, in km, of 5 friends are: 12, 69, 15, 8, 9. Which of these is least affected by the unusually large value, 69?",
    "options": [
      {
        "text": "The total, 113 km",
        "correct": false,
        "feedback": "Chose \"The total, 113 km\". The total includes 69, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 22.6 km",
        "correct": false,
        "feedback": "Chose \"The mean, 22.6 km\": the values add to 113, and \\(113 \\div 5 = 22.6\\). The mean uses every value, so the unusual value 69 pulls it upwards. The median is not pulled in the same way."
      },
      {
        "text": "The median, 12 km",
        "correct": true,
        "feedback": "Correct. In order the values are 8, 9, 12, 15, 69. The middle value is 12, and replacing 69 with a larger number would not change it. The mean, 22.6, would change."
      },
      {
        "text": "The range, 61 km",
        "correct": false,
        "feedback": "Chose \"The range, 61 km\": \\(69 - 8 = 61\\). The range uses the highest value, 69, so it is changed most by an unusual value. It is also a measure of spread, not an average."
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
    "question": "The diagram shows a frequency polygon for the journey times of the commuters on one train. What fraction of the commuters are in the class \\(50 \\le t &lt; 60\\)? Give the fraction in its simplest form.<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the journey times of the commuters on one train: points plotted at the class midpoints and joined by straight lines, at (15, 1), (25, 2), (35, 13), (45, 23), (55, 11); the horizontal axis shows the time, t, in minutes, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"284.6\" x2=\"534\" y2=\"284.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"261.8\" x2=\"534\" y2=\"261.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"238.9\" x2=\"534\" y2=\"238.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"216.1\" x2=\"534\" y2=\"216.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"193.2\" x2=\"534\" y2=\"193.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"170.4\" x2=\"534\" y2=\"170.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"147.6\" x2=\"534\" y2=\"147.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"124.8\" x2=\"534\" y2=\"124.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"101.9\" x2=\"534\" y2=\"101.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"79.1\" x2=\"534\" y2=\"79.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"56.2\" x2=\"534\" y2=\"56.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"33.4\" x2=\"534\" y2=\"33.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"273.2\" x2=\"534\" y2=\"273.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"227.5\" x2=\"534\" y2=\"227.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"181.8\" x2=\"534\" y2=\"181.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"136.2\" x2=\"534\" y2=\"136.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"90.5\" x2=\"534\" y2=\"90.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"44.8\" x2=\"534\" y2=\"44.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"273.2\" x2=\"64\" y2=\"273.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"277.7\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"250.3\" x2=\"64\" y2=\"250.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"254.8\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"227.5\" x2=\"64\" y2=\"227.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"232.0\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"181.8\" x2=\"64\" y2=\"181.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"186.3\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"159.0\" x2=\"64\" y2=\"159.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"163.5\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"136.2\" x2=\"64\" y2=\"136.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"140.7\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"90.5\" x2=\"64\" y2=\"90.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"95.0\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"59\" y1=\"67.7\" x2=\"64\" y2=\"67.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"72.2\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"59\" y1=\"44.8\" x2=\"64\" y2=\"44.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"49.3\" text-anchor=\"end\" fill=\"#1f2937\">22</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">24</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">20</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">30</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, t (minutes)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,284.6 205.0,273.2 299.0,147.6 393.0,33.4 487.0,170.4\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"284.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"273.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"147.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"33.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"170.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "\\(\\frac{39}{50}\\)",
        "correct": false,
        "feedback": "Found the fraction outside the class instead, \\(\\frac{50 - 11}{50}\\), giving \\(\\frac{39}{50}\\). The question asks for the fraction inside the class, so use its own frequency on top."
      },
      {
        "text": "\\(\\frac{11}{50}\\)",
        "correct": true,
        "feedback": "Correct. The class has 11 of the \\(1 + 2 + 13 + 23 + 11 = 50\\) commuters, so the fraction is \\(\\frac{11}{50}\\)."
      },
      {
        "text": "\\(\\frac{11}{23}\\)",
        "correct": false,
        "feedback": "Compared the class with the tallest class instead of with the total, giving \\(\\frac{11}{23}\\). A fraction of all the commuters has the total, 50, on the bottom."
      },
      {
        "text": "\\(\\frac{11}{5}\\)",
        "correct": false,
        "feedback": "Put the frequency over the number of classes, \\(\\frac{11}{5}\\). The bottom of the fraction is the total number of commuters, not the number of classes."
      }
    ],
    "backward": "Writing one number as a fraction of another, Ch8.",
    "forward": "Later in this chapter you find the same fraction from grouped data in a table."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the 100 m times of the runners in a school race; the frequency of each class is given in brackets: \\(14 \\le s &lt; 16\\) (8); \\(16 \\le s &lt; 18\\) (14); \\(18 \\le s &lt; 20\\) (6); \\(20 \\le s &lt; 22\\) (1). What is the greatest possible range of the 100 m times?",
    "options": [
      {
        "text": "8 seconds",
        "correct": true,
        "feedback": "Correct. The largest possible value is just under 22 and the smallest possible is 14, so the greatest possible range is \\(22 - 14 = 8\\)."
      },
      {
        "text": "6 seconds",
        "correct": false,
        "feedback": "Subtracted the midpoints of the first and last classes, \\(21 - 15\\), giving 6 seconds. Midpoints are not actual values. The greatest range comes from the outer ends of the classes."
      },
      {
        "text": "22 seconds",
        "correct": false,
        "feedback": "Gave the top end of the last class alone, 22, giving 22 seconds. A range is a difference, so take the lowest end, 14, away."
      },
      {
        "text": "4 seconds",
        "correct": false,
        "feedback": "Gave the smallest possible range, \\(20 - 16 = 4\\), giving 4 seconds. The greatest possible range uses the largest value the data could take and the smallest it could take."
      }
    ],
    "backward": "The range, from earlier stages.",
    "forward": "Later in this chapter you compare the spread of two data sets."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of arm span against height. How many points have height less than 166 cm and arm span more than 160 cm?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of arm span against height: 12 points at (148, 156), (152, 155), (153, 164), (161, 165), (162, 144), (163, 141), (171, 157), (174, 173), (179, 175), (180, 168), (182, 168), (184, 175); the horizontal axis shows height (cm) and the vertical axis shows arm span (cm).\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"309.5\" x2=\"534\" y2=\"309.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"302.9\" x2=\"534\" y2=\"302.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"296.4\" x2=\"534\" y2=\"296.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"289.9\" x2=\"534\" y2=\"289.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"276.8\" x2=\"534\" y2=\"276.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"270.3\" x2=\"534\" y2=\"270.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"263.7\" x2=\"534\" y2=\"263.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"244.1\" x2=\"534\" y2=\"244.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"237.6\" x2=\"534\" y2=\"237.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"231.1\" x2=\"534\" y2=\"231.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"224.5\" x2=\"534\" y2=\"224.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"211.5\" x2=\"534\" y2=\"211.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"204.9\" x2=\"534\" y2=\"204.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"191.9\" x2=\"534\" y2=\"191.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"178.8\" x2=\"534\" y2=\"178.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"172.3\" x2=\"534\" y2=\"172.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"165.7\" x2=\"534\" y2=\"165.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"159.2\" x2=\"534\" y2=\"159.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"146.1\" x2=\"534\" y2=\"146.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"133.1\" x2=\"534\" y2=\"133.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"126.5\" x2=\"534\" y2=\"126.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"113.5\" x2=\"534\" y2=\"113.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"106.9\" x2=\"534\" y2=\"106.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"100.4\" x2=\"534\" y2=\"100.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"93.9\" x2=\"534\" y2=\"93.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"74.3\" x2=\"534\" y2=\"74.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"61.2\" x2=\"534\" y2=\"61.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"48.1\" x2=\"534\" y2=\"48.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"35.1\" x2=\"534\" y2=\"35.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"28.5\" x2=\"534\" y2=\"28.5\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"88.6\" y1=\"22\" x2=\"88.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"107.1\" y1=\"22\" x2=\"107.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"125.7\" y1=\"22\" x2=\"125.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"144.2\" y1=\"22\" x2=\"144.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"181.4\" y1=\"22\" x2=\"181.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"199.9\" y1=\"22\" x2=\"199.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"218.5\" y1=\"22\" x2=\"218.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"237.0\" y1=\"22\" x2=\"237.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"274.2\" y1=\"22\" x2=\"274.2\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"292.7\" y1=\"22\" x2=\"292.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"311.3\" y1=\"22\" x2=\"311.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"329.8\" y1=\"22\" x2=\"329.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"367.0\" y1=\"22\" x2=\"367.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"385.5\" y1=\"22\" x2=\"385.5\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"404.1\" y1=\"22\" x2=\"404.1\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"422.6\" y1=\"22\" x2=\"422.6\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"459.8\" y1=\"22\" x2=\"459.8\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"478.3\" y1=\"22\" x2=\"478.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"496.9\" y1=\"22\" x2=\"496.9\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"515.4\" y1=\"22\" x2=\"515.4\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"283.3\" x2=\"534\" y2=\"283.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"250.7\" x2=\"534\" y2=\"250.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"218.0\" x2=\"534\" y2=\"218.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"185.3\" x2=\"534\" y2=\"185.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"152.7\" x2=\"534\" y2=\"152.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"120.0\" x2=\"534\" y2=\"120.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"87.3\" x2=\"534\" y2=\"87.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"54.7\" x2=\"534\" y2=\"54.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"162.8\" y1=\"22\" x2=\"162.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"255.6\" y1=\"22\" x2=\"255.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"348.4\" y1=\"22\" x2=\"348.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"441.2\" y1=\"22\" x2=\"441.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">135</text><line x1=\"65\" y1=\"283.3\" x2=\"70\" y2=\"283.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"287.8\" text-anchor=\"end\" fill=\"#1f2937\">140</text><line x1=\"65\" y1=\"250.7\" x2=\"70\" y2=\"250.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"255.2\" text-anchor=\"end\" fill=\"#1f2937\">145</text><line x1=\"65\" y1=\"218.0\" x2=\"70\" y2=\"218.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"222.5\" text-anchor=\"end\" fill=\"#1f2937\">150</text><line x1=\"65\" y1=\"185.3\" x2=\"70\" y2=\"185.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"189.8\" text-anchor=\"end\" fill=\"#1f2937\">155</text><line x1=\"65\" y1=\"152.7\" x2=\"70\" y2=\"152.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"157.2\" text-anchor=\"end\" fill=\"#1f2937\">160</text><line x1=\"65\" y1=\"120.0\" x2=\"70\" y2=\"120.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"124.5\" text-anchor=\"end\" fill=\"#1f2937\">165</text><line x1=\"65\" y1=\"87.3\" x2=\"70\" y2=\"87.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"91.8\" text-anchor=\"end\" fill=\"#1f2937\">170</text><line x1=\"65\" y1=\"54.7\" x2=\"70\" y2=\"54.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"59.2\" text-anchor=\"end\" fill=\"#1f2937\">175</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">180</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">140</text><line x1=\"162.8\" y1=\"316\" x2=\"162.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"162.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">150</text><line x1=\"255.6\" y1=\"316\" x2=\"255.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"255.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">160</text><line x1=\"348.4\" y1=\"316\" x2=\"348.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"348.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">170</text><line x1=\"441.2\" y1=\"316\" x2=\"441.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"441.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">180</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">190</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Height (cm)</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Arm span (cm)</text><polyline points=\"64,307 76,303 64,299 76,295\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><polyline points=\"81,322 85,310 89,322 93,310\" fill=\"none\" stroke=\"#374151\" stroke-width=\"1.5\"/><circle cx=\"144.2\" cy=\"178.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.4\" cy=\"185.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"190.6\" cy=\"126.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"264.9\" cy=\"120.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"274.2\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"283.4\" cy=\"276.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.7\" cy=\"172.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"385.5\" cy=\"67.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"431.9\" cy=\"54.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"441.2\" cy=\"100.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"459.8\" cy=\"100.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"478.3\" cy=\"54.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "11 points",
        "correct": false,
        "feedback": "Counted the points that meet either condition, 11, giving 11 points. The word 'and' means a point has to meet both conditions at once."
      },
      {
        "text": "2 points",
        "correct": true,
        "feedback": "Correct. The points with height less than 166 cm and arm span more than 160 cm are (153, 164), (161, 165), which makes 2."
      },
      {
        "text": "6 points",
        "correct": false,
        "feedback": "Counted only the points with height less than 166 cm, 6, giving 6 points. Each point must also have arm span more than 160 cm."
      },
      {
        "text": "7 points",
        "correct": false,
        "feedback": "Counted only the points with arm span more than 160 cm, 7, giving 7 points. Each point must also have height less than 166 cm."
      }
    ],
    "backward": "Inequalities, Ch4, and reading graphs, Ch10.",
    "forward": "Later in this chapter you turn a count like this into a fraction of the whole."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the masses of the eggs from a farm in one day. Which of these can be found exactly from the polygon?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the masses of the eggs from a farm in one day: points plotted at the class midpoints and joined by straight lines, at (42.5, 1), (47.5, 1), (52.5, 3), (57.5, 7), (62.5, 12), (67.5, 6); the horizontal axis shows the mass, g, in grams, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"276.4\" x2=\"534\" y2=\"276.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"237.3\" x2=\"534\" y2=\"237.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"198.1\" x2=\"534\" y2=\"198.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"119.9\" x2=\"534\" y2=\"119.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"80.7\" x2=\"534\" y2=\"80.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"41.6\" x2=\"534\" y2=\"41.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"256.9\" x2=\"534\" y2=\"256.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"217.7\" x2=\"534\" y2=\"217.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"178.6\" x2=\"534\" y2=\"178.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"139.4\" x2=\"534\" y2=\"139.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"100.3\" x2=\"534\" y2=\"100.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"61.1\" x2=\"534\" y2=\"61.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"142.3\" y1=\"22\" x2=\"142.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"220.7\" y1=\"22\" x2=\"220.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"377.3\" y1=\"22\" x2=\"377.3\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"455.7\" y1=\"22\" x2=\"455.7\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"256.9\" x2=\"64\" y2=\"256.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"261.4\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"217.7\" x2=\"64\" y2=\"217.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"222.2\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"178.6\" x2=\"64\" y2=\"178.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"183.1\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"139.4\" x2=\"64\" y2=\"139.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"143.9\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"100.3\" x2=\"64\" y2=\"100.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"104.8\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"61.1\" x2=\"64\" y2=\"61.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"65.6\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">40</text><line x1=\"142.3\" y1=\"296\" x2=\"142.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"142.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">45</text><line x1=\"220.7\" y1=\"296\" x2=\"220.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"220.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">50</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">55</text><line x1=\"377.3\" y1=\"296\" x2=\"377.3\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"377.3\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"455.7\" y1=\"296\" x2=\"455.7\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"455.7\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">65</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Mass, g (grams)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"103.2,276.4 181.5,276.4 259.8,237.3 338.2,159.0 416.5,61.1 494.8,178.6\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"103.2\" cy=\"276.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"181.5\" cy=\"276.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"259.8\" cy=\"237.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"338.2\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"416.5\" cy=\"61.1\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"494.8\" cy=\"178.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "The exact highest mass of any of the eggs",
        "correct": false,
        "feedback": "Chose \"The exact highest mass of any of the eggs\". A polygon shows only how many are in each class, so individual values are not known."
      },
      {
        "text": "The exact mean mass of all the eggs",
        "correct": false,
        "feedback": "Chose \"The exact mean mass of all the eggs\". Only an estimate of the mean can be found from grouped data, because the exact values are not known."
      },
      {
        "text": "The number of eggs in the class \\(65 \\le g &lt; 70\\)",
        "correct": true,
        "feedback": "Correct. The height of the point at 67.5 is the frequency of the class \\(65 \\le g &lt; 70\\), which is 6, so that can be read exactly."
      },
      {
        "text": "How many eggs had a mass of exactly 66 grams",
        "correct": false,
        "feedback": "Chose \"How many eggs had a mass of exactly 66 grams\". Values inside a class are not shown separately, so this cannot be read."
      }
    ],
    "backward": "Interpreting graphs, Ch10.",
    "forward": "Later in this chapter you estimate a mean from grouped data, which cannot be exact."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the lengths of leaves of two groups, M and N. How many values in group M are more than 52?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the lengths of leaves: group M on the left and group N on the right, rows (left leaves, then right leaves) 4: - | 9; 5: 7 4 4 2 1 0 | 7; 6: 6 | 7 7 7; 7: 5 0 | 4 6 9; 8: 1 | 6; the key reads 5 | 0 means 50 mm.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group M</text><text x=\"314.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group N</text><text x=\"262.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"240.5\" y1=\"42\" x2=\"240.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"284.5\" y1=\"42\" x2=\"284.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"262.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"262.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"230.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"155.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">7</text><text x=\"294.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"262.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"230.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"324.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">7</text><text x=\"262.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"230.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">5</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"309.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"324.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"262.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">8</text><text x=\"230.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group M: 0 | 5 means 50 mm</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group N: 5 | 0 means 50 mm</text></svg></div>",
    "options": [
      {
        "text": "10",
        "correct": false,
        "feedback": "Counted every value from the row with stem 5 upwards, giving 10. Check each leaf in that row against the value itself: some are below it."
      },
      {
        "text": "2",
        "correct": false,
        "feedback": "Counted the values below 52 instead, giving 2. The question asks for the values above 52."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Counted the values of 52 or more, including 52 itself, giving 8. 'More than 52' does not include 52."
      },
      {
        "text": "7",
        "correct": true,
        "feedback": "Correct. The values above 52 are 54, 54, 57, 66, 70, 75, 81, which is 7 values."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you group values like these into classes."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The masses, in kg, of 5 parcels are: 4, 11, 8, 6, 48. Which of these is least affected by the unusually large value, 48?",
    "options": [
      {
        "text": "The median, 8 kg",
        "correct": true,
        "feedback": "Correct. In order the values are 4, 6, 8, 11, 48. The middle value is 8, and replacing 48 with a larger number would not change it. The mean, 15.4, would change."
      },
      {
        "text": "The total, 77 kg",
        "correct": false,
        "feedback": "Chose \"The total, 77 kg\". The total includes 48, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 15.4 kg",
        "correct": false,
        "feedback": "Chose \"The mean, 15.4 kg\": the values add to 77, and \\(77 \\div 5 = 15.4\\). The mean uses every value, so the unusual value 48 pulls it upwards. The median is not pulled in the same way."
      },
      {
        "text": "The range, 44 kg",
        "correct": false,
        "feedback": "Chose \"The range, 44 kg\": \\(48 - 4 = 44\\). The range uses the highest value, 48, so it is changed most by an unusual value. It is also a measure of spread, not an average."
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
    "question": "In a frequency table the class \\(0 \\le x &lt; 10\\) has frequency 4. At what coordinates is its point plotted on a frequency polygon?",
    "options": [
      {
        "text": "(4, 5)",
        "correct": false,
        "feedback": "Swapped the coordinates, giving (4, 5). A point is written (across, up): the midpoint of the class goes first and the frequency second."
      },
      {
        "text": "(0, 4)",
        "correct": false,
        "feedback": "Plotted at the lower end of the class, 0, giving (0, 4). The point goes at the middle of the class, not at either end."
      },
      {
        "text": "(5, 4)",
        "correct": true,
        "feedback": "Correct. The point is plotted at the midpoint of the class, \\((0 + 10) \\div 2 = 5\\), and at a height equal to the frequency, 4, so it is (5, 4)."
      },
      {
        "text": "(10, 4)",
        "correct": false,
        "feedback": "Plotted at the upper end of the class, 10, giving (10, 4). The point goes at the middle of the class, not at either end."
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
    "question": "The table gives the reaction times of the volunteers in a reaction experiment; the frequency of each class is given in brackets: \\(200 \\le r &lt; 250\\) (3); \\(250 \\le r &lt; 300\\) (6); \\(300 \\le r &lt; 350\\) (9); \\(350 \\le r &lt; 400\\) (8). Which class is the modal class?",
    "options": [
      {
        "text": "\\(300 \\le r &lt; 350\\)",
        "correct": true,
        "feedback": "Correct. The highest frequency is 9, which belongs to the class \\(300 \\le r &lt; 350\\), so that is the modal class."
      },
      {
        "text": "\\(200 \\le r &lt; 250\\)",
        "correct": false,
        "feedback": "Chose the first class, giving \\(200 \\le r &lt; 250\\). The modal class is chosen by frequency, not by position."
      },
      {
        "text": "\\(250 \\le r &lt; 300\\)",
        "correct": false,
        "feedback": "Chose the class \\(250 \\le r &lt; 300\\), which has frequency 6, giving \\(250 \\le r &lt; 300\\). The modal class has the highest frequency, 9."
      },
      {
        "text": "\\(350 \\le r &lt; 400\\)",
        "correct": false,
        "feedback": "Chose the class with the second highest frequency, giving \\(350 \\le r &lt; 400\\). The modal class has the highest frequency."
      }
    ],
    "backward": "The mode, from earlier stages.",
    "forward": "Later in this chapter you find the class that contains the median."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of goals scored against hours of practice. Which description fits the correlation?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of goals scored against hours of practice: 12 points at (1, 9), (2, 15), (2, 4), (3, 3), (3, 2), (6, 10), (6, 17), (7, 6), (7, 8), (7, 15), (8, 6), (8, 2); the horizontal axis shows hours of practice and the vertical axis shows number of goals scored.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"121.6\" y1=\"22\" x2=\"121.6\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"173.1\" y1=\"22\" x2=\"173.1\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"276.2\" y1=\"22\" x2=\"276.2\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"327.8\" y1=\"22\" x2=\"327.8\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"430.9\" y1=\"22\" x2=\"430.9\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"482.4\" y1=\"22\" x2=\"482.4\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">15</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"121.6\" y1=\"316\" x2=\"121.6\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"121.6\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">1</text><line x1=\"173.1\" y1=\"316\" x2=\"173.1\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"173.1\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">3</text><line x1=\"276.2\" y1=\"316\" x2=\"276.2\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"276.2\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"327.8\" y1=\"316\" x2=\"327.8\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"327.8\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">5</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"430.9\" y1=\"316\" x2=\"430.9\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"430.9\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">7</text><line x1=\"482.4\" y1=\"316\" x2=\"482.4\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"482.4\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">9</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Hours of practice</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of goals scored</text><circle cx=\"121.6\" cy=\"183.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"173.1\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"173.1\" cy=\"257.2\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"271.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"286.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"169.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"66.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"198.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"430.9\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"482.4\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"482.4\" cy=\"286.6\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "Strong positive correlation between hours of practice and number of goals scored",
        "correct": false,
        "feedback": "Joined a few high points together as if they made a line, giving Strong positive correlation between hours of practice and number of goals scored. Most points do not line up. There is no strong pattern, or any pattern at all."
      },
      {
        "text": "Weak positive correlation between hours of practice and number of goals scored",
        "correct": false,
        "feedback": "Saw a slight upward drift in the points, giving Weak positive correlation between hours of practice and number of goals scored. The points do not follow any direction. They are scattered with no pattern."
      },
      {
        "text": "No correlation between hours of practice and number of goals scored",
        "correct": true,
        "feedback": "Correct. The points are scattered with no clear direction, so there is no correlation between hours of practice and number of goals scored."
      },
      {
        "text": "Weak negative correlation between hours of practice and number of goals scored",
        "correct": false,
        "feedback": "Saw a slight downward drift in the points, giving Weak negative correlation between hours of practice and number of goals scored. The points do not follow any direction. They are scattered with no pattern."
      }
    ],
    "backward": "Describing graphs, Ch10.",
    "forward": "Later in this chapter you decide which graph suits which kind of data."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C1",
    "clusterName": "Frequency polygons",
    "question": "The diagram shows a frequency polygon for the puzzle times of the players in a contest. Which of these can be found exactly from the polygon?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the puzzle times of the players in a contest: points plotted at the class midpoints and joined by straight lines, at (65, 3), (75, 9), (85, 17), (95, 10); the horizontal axis shows the time, p, in seconds, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"280.8\" x2=\"534\" y2=\"280.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"219.9\" x2=\"534\" y2=\"219.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"189.4\" x2=\"534\" y2=\"189.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"174.2\" x2=\"534\" y2=\"174.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"143.8\" x2=\"534\" y2=\"143.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"128.6\" x2=\"534\" y2=\"128.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"98.1\" x2=\"534\" y2=\"98.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"82.9\" x2=\"534\" y2=\"82.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.4\" x2=\"534\" y2=\"52.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"37.2\" x2=\"534\" y2=\"37.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"174.2\" x2=\"534\" y2=\"174.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"143.8\" x2=\"534\" y2=\"143.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"82.9\" x2=\"534\" y2=\"82.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.4\" x2=\"534\" y2=\"52.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"181.5\" y1=\"22\" x2=\"181.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"299.0\" y1=\"22\" x2=\"299.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"416.5\" y1=\"22\" x2=\"416.5\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"265.6\" x2=\"64\" y2=\"265.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"270.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"235.1\" x2=\"64\" y2=\"235.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"239.6\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"174.2\" x2=\"64\" y2=\"174.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"178.7\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"143.8\" x2=\"64\" y2=\"143.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"148.3\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"82.9\" x2=\"64\" y2=\"82.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"87.4\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"52.4\" x2=\"64\" y2=\"52.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"56.9\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">60</text><line x1=\"181.5\" y1=\"296\" x2=\"181.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"181.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">70</text><line x1=\"299.0\" y1=\"296\" x2=\"299.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"299.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">80</text><line x1=\"416.5\" y1=\"296\" x2=\"416.5\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"416.5\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">90</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">100</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Time, p (seconds)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"122.8,250.3 240.2,159.0 357.8,37.2 475.2,143.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"122.8\" cy=\"250.3\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"240.2\" cy=\"159.0\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"357.8\" cy=\"37.2\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"475.2\" cy=\"143.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "The exact highest time of any of the players",
        "correct": false,
        "feedback": "Chose \"The exact highest time of any of the players\". A polygon shows only how many are in each class, so individual values are not known."
      },
      {
        "text": "The exact mean time of all the players",
        "correct": false,
        "feedback": "Chose \"The exact mean time of all the players\". Only an estimate of the mean can be found from grouped data, because the exact values are not known."
      },
      {
        "text": "How many players had a time of exactly 91 seconds",
        "correct": false,
        "feedback": "Chose \"How many players had a time of exactly 91 seconds\". Values inside a class are not shown separately, so this cannot be read."
      },
      {
        "text": "The number of players in the class \\(90 \\le p &lt; 100\\)",
        "correct": true,
        "feedback": "Correct. The height of the point at 95 is the frequency of the class \\(90 \\le p &lt; 100\\), which is 10, so that can be read exactly."
      }
    ],
    "backward": "Reading values from a graph, Ch10.",
    "forward": "Later in this chapter you estimate a mean from grouped data, which cannot be exact."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the scores in a quiz of two groups, T and U. What value does the leaf 9 in the row with stem 2 represent for group U?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the scores in a quiz: group T on the left and group U on the right, rows (left leaves, then right leaves) 1: 6 4 1 | 9; 2: 1 | 9; 3: - | 2 4; 4: 8 8 3 0 | 2 2; 5: 9 2 | 0 2 4; the key reads 2 | 1 means 21.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group T</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group U</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">1</text><text x=\"215.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"200.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"185.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">2</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">9</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">3</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"170.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"294.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">2</text><text x=\"200.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">2</text><text x=\"309.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">4</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group T: 1 | 2 means 21</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group U: 2 | 1 means 21</text></svg></div>",
    "options": [
      {
        "text": "2.9",
        "correct": false,
        "feedback": "Put the decimal point in the wrong place, giving 2.9. Follow the key to see what the stem and the leaf stand for."
      },
      {
        "text": "9",
        "correct": false,
        "feedback": "Read only the leaf, 9, giving 9. The value is made from the stem and the leaf together."
      },
      {
        "text": "11",
        "correct": false,
        "feedback": "Added the stem and the leaf, \\(2 + 9\\), giving 11. The stem and leaf are digits of one number, not numbers to add."
      },
      {
        "text": "29",
        "correct": true,
        "feedback": "Correct. The key shows how to read each row: the stem 2 and the leaf 9 together stand for 29."
      }
    ],
    "backward": "Multiplying and dividing by powers of 10, Ch3.",
    "forward": "Later in this chapter you use values read from the key to find medians and ranges."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "The table gives the heights of the sunflower plants in a school garden; the frequency of each class is given in brackets: \\(20 \\le h &lt; 40\\) (1); \\(40 \\le h &lt; 60\\) (3); \\(60 \\le h &lt; 80\\) (4); \\(80 \\le h &lt; 100\\) (7); \\(100 \\le h &lt; 120\\) (5). What percentage of the plants are in the class \\(60 \\le h &lt; 80\\)?",
    "options": [
      {
        "text": "25%",
        "correct": false,
        "feedback": "Divided by the plants outside the class, 16, instead of by the total, giving 25%. Divide by the total number of plants, 20."
      },
      {
        "text": "4%",
        "correct": false,
        "feedback": "Gave the frequency, 4, as the percentage, giving 4%. A percentage is out of 100. Divide by the total, 20, then multiply by 100."
      },
      {
        "text": "20%",
        "correct": true,
        "feedback": "Correct. The class has 4 of the \\(1 + 3 + 4 + 7 + 5 = 20\\) plants, so the percentage is \\(4 \\div 20 \\times 100 = 20\\%\\)."
      },
      {
        "text": "80%",
        "correct": false,
        "feedback": "Found the percentage outside the class instead, \\(100 - 20 = 80\\), giving 80%. The question asks for the percentage inside the class."
      }
    ],
    "backward": "Percentages, Ch3.",
    "forward": "Later in this chapter you compare groups using percentages and averages."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Statistics for grouped data",
    "question": "What is the midpoint of the class \\(90 \\le f &lt; 110\\)?",
    "options": [
      {
        "text": "90",
        "correct": false,
        "feedback": "Used the lower end of the class, 90. The midpoint lies halfway between the two ends of the class."
      },
      {
        "text": "100",
        "correct": true,
        "feedback": "Correct. The midpoint is halfway between the ends: \\((90 + 110) \\div 2 = 100\\)."
      },
      {
        "text": "20",
        "correct": false,
        "feedback": "Gave the class width, \\(110 - 90 = 20\\). The width is the length of the class. The midpoint is a position inside it."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Gave half the class width, \\(20 \\div 2\\), giving 10. Half the width is the distance from an end to the midpoint. Add it to the lower end, 90."
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
    "question": "The diagram shows a frequency polygon for the distances to school of the pupils in a year group. How many pupils have a distance of 8 or more?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 360\" width=\"560\" height=\"360\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Frequency polygon of the distances to school of the pupils in a year group: points plotted at the class midpoints and joined by straight lines, at (3, 7), (5, 16), (7, 10), (9, 2), (11, 1); the horizontal axis shows the distance, k, in km, and the vertical axis shows frequency.\"><rect width=\"560\" height=\"360\" fill=\"#ffffff\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"280.8\" x2=\"534\" y2=\"280.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"250.3\" x2=\"534\" y2=\"250.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"219.9\" x2=\"534\" y2=\"219.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"189.4\" x2=\"534\" y2=\"189.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"174.2\" x2=\"534\" y2=\"174.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"159.0\" x2=\"534\" y2=\"159.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"143.8\" x2=\"534\" y2=\"143.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"128.6\" x2=\"534\" y2=\"128.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"98.1\" x2=\"534\" y2=\"98.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"82.9\" x2=\"534\" y2=\"82.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"67.7\" x2=\"534\" y2=\"67.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.4\" x2=\"534\" y2=\"52.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"37.2\" x2=\"534\" y2=\"37.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"64\" y1=\"296.0\" x2=\"534\" y2=\"296.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"265.6\" x2=\"534\" y2=\"265.6\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"235.1\" x2=\"534\" y2=\"235.1\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"204.7\" x2=\"534\" y2=\"204.7\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"174.2\" x2=\"534\" y2=\"174.2\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"143.8\" x2=\"534\" y2=\"143.8\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"113.3\" x2=\"534\" y2=\"113.3\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"82.9\" x2=\"534\" y2=\"82.9\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"52.4\" x2=\"534\" y2=\"52.4\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"22\" x2=\"64.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"158.0\" y1=\"22\" x2=\"158.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"252.0\" y1=\"22\" x2=\"252.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"22\" x2=\"346.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"440.0\" y1=\"22\" x2=\"440.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"296\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"64\" y1=\"22\" x2=\"64\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"64\" y1=\"296\" x2=\"534\" y2=\"296\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"59\" y1=\"296.0\" x2=\"64\" y2=\"296.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"300.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"59\" y1=\"265.6\" x2=\"64\" y2=\"265.6\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"270.1\" text-anchor=\"end\" fill=\"#1f2937\">2</text><line x1=\"59\" y1=\"235.1\" x2=\"64\" y2=\"235.1\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"239.6\" text-anchor=\"end\" fill=\"#1f2937\">4</text><line x1=\"59\" y1=\"204.7\" x2=\"64\" y2=\"204.7\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"209.2\" text-anchor=\"end\" fill=\"#1f2937\">6</text><line x1=\"59\" y1=\"174.2\" x2=\"64\" y2=\"174.2\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"178.7\" text-anchor=\"end\" fill=\"#1f2937\">8</text><line x1=\"59\" y1=\"143.8\" x2=\"64\" y2=\"143.8\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"148.3\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"59\" y1=\"113.3\" x2=\"64\" y2=\"113.3\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"117.8\" text-anchor=\"end\" fill=\"#1f2937\">12</text><line x1=\"59\" y1=\"82.9\" x2=\"64\" y2=\"82.9\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"87.4\" text-anchor=\"end\" fill=\"#1f2937\">14</text><line x1=\"59\" y1=\"52.4\" x2=\"64\" y2=\"52.4\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"56.9\" text-anchor=\"end\" fill=\"#1f2937\">16</text><line x1=\"59\" y1=\"22.0\" x2=\"64\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"55\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">18</text><line x1=\"64.0\" y1=\"296\" x2=\"64.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"64.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"158.0\" y1=\"296\" x2=\"158.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"158.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"252.0\" y1=\"296\" x2=\"252.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"252.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"346.0\" y1=\"296\" x2=\"346.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"346.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"440.0\" y1=\"296\" x2=\"440.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"440.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"534.0\" y1=\"296\" x2=\"534.0\" y2=\"301\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"316\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><text x=\"299.0\" y=\"348\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Distance, k (km)</text><text transform=\"translate(16 159.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Frequency</text><polyline points=\"111.0,189.4 205.0,52.4 299.0,143.8 393.0,265.6 487.0,280.8\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.2\" stroke-linejoin=\"round\"/><circle cx=\"111.0\" cy=\"189.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"205.0\" cy=\"52.4\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"299.0\" cy=\"143.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"393.0\" cy=\"265.6\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"487.0\" cy=\"280.8\" r=\"4.5\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "1 pupil",
        "correct": false,
        "feedback": "Left out the class that starts at 8: \\(1 = 1\\), giving 1 pupil. The class \\(8 \\le k &lt; 10\\) starts at 8, so it is included."
      },
      {
        "text": "3 pupils",
        "correct": true,
        "feedback": "Correct. The classes from \\(8 \\le k &lt; 10\\) upwards have heights 2, 1, so \\(2 + 1 = 3\\)."
      },
      {
        "text": "13 pupils",
        "correct": false,
        "feedback": "Added the class below as well, 10, giving 13 pupils. That class ends at 8 and does not reach it, so it is not included."
      },
      {
        "text": "2 pupils",
        "correct": false,
        "feedback": "Used only the class \\(8 \\le k &lt; 10\\), 2, giving 2 pupils. A value of 8 or more also includes every class above it."
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
    "question": "The weekly screen times in a data set run from 4 to 18. Which set of classes is suitable for a grouped frequency table with equal class widths?",
    "options": [
      {
        "text": "\\(0 \\le y &lt; 5\\), \\(5 \\le y &lt; 10\\), \\(10 \\le y &lt; 20\\)",
        "correct": false,
        "feedback": "Chose classes with unequal widths, with the last two classes joined together, giving \\(0 \\le y &lt; 5\\), \\(5 \\le y &lt; 10\\), \\(10 \\le y &lt; 20\\). Classes should all have the same width, so the frequencies can be compared fairly."
      },
      {
        "text": "\\(0 \\le y \\le 5\\), \\(5 \\le y \\le 10\\), \\(10 \\le y \\le 15\\), \\(15 \\le y \\le 20\\)",
        "correct": false,
        "feedback": "Chose classes where each ends at the value the next one starts with, so 5 would fit in two classes, giving \\(0 \\le y \\le 5\\), \\(5 \\le y \\le 10\\), \\(10 \\le y \\le 15\\), \\(15 \\le y \\le 20\\). Each value must be in exactly one class, so one end of each class must be left out."
      },
      {
        "text": "\\(5 \\le y &lt; 10\\), \\(10 \\le y &lt; 15\\), \\(15 \\le y &lt; 20\\), \\(20 \\le y &lt; 25\\)",
        "correct": false,
        "feedback": "Chose classes that start at 5, so the smallest value, 4, belongs to no class, giving \\(5 \\le y &lt; 10\\), \\(10 \\le y &lt; 15\\), \\(15 \\le y &lt; 20\\), \\(20 \\le y &lt; 25\\). The classes must cover every value, starting at or below the smallest."
      },
      {
        "text": "\\(0 \\le y &lt; 5\\), \\(5 \\le y &lt; 10\\), \\(10 \\le y &lt; 15\\), \\(15 \\le y &lt; 20\\)",
        "correct": true,
        "feedback": "Correct. Each class has width 5, the classes start at 0, which is at or below the smallest value, 4, and the last class reaches above the largest, 18. Each end value belongs to exactly one class because the upper end is left out."
      }
    ],
    "backward": "Inequalities, Ch4.",
    "forward": "Later in this chapter you use classes like these to estimate a mean."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C2",
    "clusterName": "Scatter graphs",
    "question": "The diagram shows a scatter graph of number of goals scored against hours of practice. Look at the point where hours of practice is 5. What is the number of goals scored for that point?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 380\" width=\"560\" height=\"380\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Scatter graph of number of goals scored against hours of practice: 12 points at (1, 0), (2, 3), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10), (5, 11), (8, 15), (9, 16), (10, 19); the horizontal axis shows hours of practice and the vertical axis shows number of goals scored.\"><rect width=\"560\" height=\"380\" fill=\"#ffffff\"/><line x1=\"70\" y1=\"301.3\" x2=\"534\" y2=\"301.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"286.6\" x2=\"534\" y2=\"286.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"271.9\" x2=\"534\" y2=\"271.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"257.2\" x2=\"534\" y2=\"257.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"227.8\" x2=\"534\" y2=\"227.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"213.1\" x2=\"534\" y2=\"213.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"198.4\" x2=\"534\" y2=\"198.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"183.7\" x2=\"534\" y2=\"183.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"154.3\" x2=\"534\" y2=\"154.3\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"139.6\" x2=\"534\" y2=\"139.6\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"124.9\" x2=\"534\" y2=\"124.9\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"110.2\" x2=\"534\" y2=\"110.2\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"80.8\" x2=\"534\" y2=\"80.8\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"66.1\" x2=\"534\" y2=\"66.1\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"51.4\" x2=\"534\" y2=\"51.4\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"36.7\" x2=\"534\" y2=\"36.7\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"108.7\" y1=\"22\" x2=\"108.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"186.0\" y1=\"22\" x2=\"186.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"263.3\" y1=\"22\" x2=\"263.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"340.7\" y1=\"22\" x2=\"340.7\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"22\" x2=\"418.0\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"495.3\" y1=\"22\" x2=\"495.3\" y2=\"316\" stroke=\"#f1f3f6\" stroke-width=\"1\"/><line x1=\"70\" y1=\"316.0\" x2=\"534\" y2=\"316.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"242.5\" x2=\"534\" y2=\"242.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"169.0\" x2=\"534\" y2=\"169.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"95.5\" x2=\"534\" y2=\"95.5\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22.0\" x2=\"534\" y2=\"22.0\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"22\" x2=\"70.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"147.3\" y1=\"22\" x2=\"147.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"224.7\" y1=\"22\" x2=\"224.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"302.0\" y1=\"22\" x2=\"302.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"379.3\" y1=\"22\" x2=\"379.3\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"456.7\" y1=\"22\" x2=\"456.7\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"534.0\" y1=\"22\" x2=\"534.0\" y2=\"316\" stroke=\"#d1d5db\" stroke-width=\"1\"/><line x1=\"70\" y1=\"22\" x2=\"70\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"70\" y1=\"316\" x2=\"534\" y2=\"316\" stroke=\"#374151\" stroke-width=\"2\"/><line x1=\"65\" y1=\"316.0\" x2=\"70\" y2=\"316.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"320.5\" text-anchor=\"end\" fill=\"#1f2937\">0</text><line x1=\"65\" y1=\"242.5\" x2=\"70\" y2=\"242.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"247.0\" text-anchor=\"end\" fill=\"#1f2937\">5</text><line x1=\"65\" y1=\"169.0\" x2=\"70\" y2=\"169.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"173.5\" text-anchor=\"end\" fill=\"#1f2937\">10</text><line x1=\"65\" y1=\"95.5\" x2=\"70\" y2=\"95.5\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"100.0\" text-anchor=\"end\" fill=\"#1f2937\">15</text><line x1=\"65\" y1=\"22.0\" x2=\"70\" y2=\"22.0\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"61\" y=\"26.5\" text-anchor=\"end\" fill=\"#1f2937\">20</text><line x1=\"70.0\" y1=\"316\" x2=\"70.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"70.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">0</text><line x1=\"147.3\" y1=\"316\" x2=\"147.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"147.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">2</text><line x1=\"224.7\" y1=\"316\" x2=\"224.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"224.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">4</text><line x1=\"302.0\" y1=\"316\" x2=\"302.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"302.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">6</text><line x1=\"379.3\" y1=\"316\" x2=\"379.3\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"379.3\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">8</text><line x1=\"456.7\" y1=\"316\" x2=\"456.7\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"456.7\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">10</text><line x1=\"534.0\" y1=\"316\" x2=\"534.0\" y2=\"321\" stroke=\"#374151\" stroke-width=\"1.5\"/><text x=\"534.0\" y=\"336\" text-anchor=\"middle\" fill=\"#1f2937\">12</text><text x=\"302.0\" y=\"368\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Hours of practice</text><text transform=\"translate(16 169.0) rotate(-90)\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1f2937\">Number of goals scored</text><circle cx=\"108.7\" cy=\"316.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"147.3\" cy=\"271.9\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"242.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"186.0\" cy=\"227.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"213.1\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"224.7\" cy=\"198.4\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"263.3\" cy=\"183.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"263.3\" cy=\"169.0\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"263.3\" cy=\"154.3\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"379.3\" cy=\"95.5\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"418.0\" cy=\"80.8\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/><circle cx=\"456.7\" cy=\"36.7\" r=\"4.2\" fill=\"#1d4ed8\" stroke=\"#fff\" stroke-width=\"1\"/></svg></div>",
    "options": [
      {
        "text": "5",
        "correct": false,
        "feedback": "Gave the hours of practice value, 5, as the answer. The number of goals scored is read up the vertical axis, not along the horizontal axis."
      },
      {
        "text": "9",
        "correct": true,
        "feedback": "Correct. Go to 5 on the horizontal axis, find the point above it, then read across to the vertical axis: 9."
      },
      {
        "text": "10",
        "correct": false,
        "feedback": "Read the point beside it, at 5, giving 10. The point at 5 across is the one needed."
      },
      {
        "text": "8",
        "correct": false,
        "feedback": "Read the point on the other side, at 4, giving 8. The point at 5 across is the one needed."
      }
    ],
    "backward": "Reading coordinates from a graph, Ch10.",
    "forward": "Later in this chapter you read values from a line of best fit in the same way."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed data problems",
    "question": "The numbers of messages sent of 5 students are: 124, 11, 24, 19, 20. Which of these is least affected by the unusually large value, 124?",
    "options": [
      {
        "text": "The median, 20",
        "correct": true,
        "feedback": "Correct. In order the values are 11, 19, 20, 24, 124. The middle value is 20, and replacing 124 with a larger number would not change it. The mean, 39.6, would change."
      },
      {
        "text": "The range, 113",
        "correct": false,
        "feedback": "Chose \"The range, 113\": \\(124 - 11 = 113\\). The range uses the highest value, 124, so it is changed most by an unusual value. It is also a measure of spread, not an average."
      },
      {
        "text": "The total, 198",
        "correct": false,
        "feedback": "Chose \"The total, 198\". The total includes 124, so it is affected by it as much as any value is."
      },
      {
        "text": "The mean, 39.6",
        "correct": false,
        "feedback": "Chose \"The mean, 39.6\": the values add to 198, and \\(198 \\div 5 = 39.6\\). The mean uses every value, so the unusual value 124 pulls it upwards. The median is not pulled in the same way."
      }
    ],
    "backward": "The median and the mean, from earlier stages.",
    "forward": "Later in this chapter you choose the best average to describe data with an unusual value."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C3",
    "clusterName": "Back-to-back stem-and-leaf diagrams",
    "question": "The diagram shows the heights of seedlings of two groups, E and F. What is the median of group E?<div class=\"mb-diagram\" style=\"margin:14px 0;\"><svg style=\"max-width:100%;height:auto\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 294\" width=\"480\" height=\"294\" font-family=\"Arial, Helvetica, sans-serif\" font-size=\"13\" role=\"img\" aria-label=\"Back-to-back stem-and-leaf diagram of the heights of seedlings: group E on the left and group F on the right, rows (left leaves, then right leaves) 3: - | 0 1; 4: 9 8 1 0 | 1; 5: 9 4 | 1 1 6; 6: 8 0 0 | 0; 7: 6 | 0 3; the key reads 4 | 0 means 40 cm.\"><rect width=\"480\" height=\"294\" fill=\"#ffffff\"/><text x=\"188.5\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group E</text><text x=\"299.0\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1f2937\">Group F</text><text x=\"247.5\" y=\"30\" text-anchor=\"middle\" fill=\"#1f2937\">Stem</text><line x1=\"225.5\" y1=\"42\" x2=\"225.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><line x1=\"269.5\" y1=\"42\" x2=\"269.5\" y2=\"204\" stroke=\"#374151\" stroke-width=\"1.8\"/><text x=\"247.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">3</text><text x=\"279.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"70\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"247.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">4</text><text x=\"215.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">1</text><text x=\"185.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"170.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"98\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"247.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">5</text><text x=\"215.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">4</text><text x=\"200.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">9</text><text x=\"279.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"294.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">1</text><text x=\"309.5\" y=\"126\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">6</text><text x=\"247.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">6</text><text x=\"215.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"200.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">0</text><text x=\"185.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">8</text><text x=\"279.5\" y=\"154\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"247.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" font-weight=\"bold\" fill=\"#1f2937\">7</text><text x=\"215.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#1d4ed8\">6</text><text x=\"279.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">0</text><text x=\"294.5\" y=\"182\" text-anchor=\"middle\" font-family=\"Courier New, Consolas, monospace\" font-size=\"17\" fill=\"#b45309\">3</text><text x=\"240.0\" y=\"234\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group E: 0 | 4 means 40 cm</text><text x=\"240.0\" y=\"254\" text-anchor=\"middle\" fill=\"#1f2937\">Key for group F: 4 | 0 means 40 cm</text></svg></div>",
    "options": [
      {
        "text": "56.5 cm",
        "correct": true,
        "feedback": "Correct. Counting the leaves in order: there are 10 values, so the median is halfway between the 5th and 6th: \\((54 + 59) \\div 2 = 56.5\\)."
      },
      {
        "text": "55.5 cm",
        "correct": false,
        "feedback": "Found the mean instead, 55.5, giving 55.5 cm. The median is the middle value, not the mean."
      },
      {
        "text": "54 cm",
        "correct": false,
        "feedback": "Took only the lower of the two middle values, 54, giving 54 cm. With an even number of values the median is halfway between the two middle ones."
      },
      {
        "text": "51 cm",
        "correct": false,
        "feedback": "Found the median of group F instead, 51, giving 51 cm. The question asks about group E."
      }
    ],
    "backward": "The median, from earlier stages.",
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
  title: "Interpreting and Discussing Results — Core Fluency",
  subtitle: "Grade 8 · Level 1 · Core Fluency",
  description: "Frequency polygons, scatter graphs and correlation, back-to-back stem-and-leaf diagrams, and statistics for grouped data — warm-up, diagnostic, and spaced recheck for core fluency.",
  clusterNames: CLUSTER_NAMES,
  gateReviewHTML: "<p><strong>Warm-up done.</strong> Next comes the diagnostic. It is not a test and it is not timed, so there is no prize for speed. It is a check on how secure your skills already are with: frequency polygons, scatter graphs and correlation, back-to-back stem-and-leaf diagrams, averages and spread from grouped data, and choosing a sensible way to show data. For each question, ask yourself first: what is the graph or table showing, and what exactly is the question asking for? Then work it out before you choose. If a question feels awkward, that tells us exactly where to look next, so it is useful, not a failure.</p><p>You will meet all six topics, mixed together. Take your time.</p>",
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

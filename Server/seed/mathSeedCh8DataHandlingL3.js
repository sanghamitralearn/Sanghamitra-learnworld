// seed/mathSeedCh8DataHandlingL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 3 — converted from the standalone HTML file
// ch-8-data-handling-level-3.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 3;

const CLUSTER_NAMES = {
  PICTO: "Pictographs",
  BAR: "Bar Graphs",
  LINE: "Line Graphs",
  TABLE: "Tables & Tally Charts",
  VOCAB: "Probability Vocabulary",
  SCALE: "Reading Scales & Keys"
};

const warmupItems = [
  {
    itemId: "w1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 sun = 6 sunny days. April: 4 full suns + 1 half sun; May: 3 full suns + 1 half sun. How many more sunny days in April?",
    options: [
        { text: "6", correct: true, feedback: "April = 4×6 + 3 = 27; May = 3×6 + 3 = 21; diff = 6." },
        { text: "1", correct: false, feedback: "You only compared the symbol difference without using the key." },
        { text: "3", correct: false, feedback: "That's the value of the half sun." },
        { text: "27", correct: false, feedback: "That's April's total only." }
      ],
    retryHint: "Calculate sunny days for each month using the key. Then subtract."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Week 1: 120 visitors; Week 2: 80 visitors. What fraction of the total visitors came in Week 1? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{3}{5}\\)", correct: true, feedback: "Total = 200. 120/200 = 3/5." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "That's 120/180, not the correct total." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "120/200 is more than half." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "That's Week 2's fraction." }
      ],
    retryHint: "Add the two weeks to get the total. Write Week 1 over total and simplify."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature at 8 AM: 18°C, 10 AM: 24°C, 12 PM: 20°C. Between which two times was the greatest change in temperature?",
    options: [
        { text: "8 AM to 10 AM", correct: true, feedback: "8−10: rise of 6°C; 10−12: drop of 4°C. Greatest change is 6°C." },
        { text: "10 AM to 12 PM", correct: false, feedback: "That's a drop of 4°C, smaller than the 6°C rise." },
        { text: "Both are equal", correct: false, feedback: "6°C and 4°C are not equal." },
        { text: "Cannot say", correct: false, feedback: "We can calculate both changes." }
      ],
    retryHint: "Calculate the difference (ignoring sign) for each interval. The larger difference is the greatest change."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows three test scores: 25, 35, and 30. What is the average score?",
    options: [
        { text: "30", correct: true, feedback: "(25 + 35 + 30) ÷ 3 = 90 ÷ 3 = 30." },
        { text: "90", correct: false, feedback: "That's the total, not the average." },
        { text: "35", correct: false, feedback: "That's the highest score, not the average." },
        { text: "25", correct: false, feedback: "That's the lowest score." }
      ],
    retryHint: "Add the three numbers, then divide by 3."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag has 5 green marbles and 5 other marbles (red and blue). Picking a green marble is:",
    options: [
        { text: "Equally likely", correct: true, feedback: "There are 5 green and 5 non‑green. The chance is 5 out of 10 = 1/2." },
        { text: "Likely", correct: false, feedback: "It's exactly half, so equally likely, not more likely." },
        { text: "Unlikely", correct: false, feedback: "Half is not unlikely." },
        { text: "Certain", correct: false, feedback: "It could be non‑green." }
      ],
    retryHint: "Find the total marbles. If green is exactly half, it's equally likely."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Pictograph key: 1 star = 8 points. The total points are 44. How many full stars and half stars are there?",
    options: [
        { text: "5 full + 1 half", correct: true, feedback: "5×8 = 40; half of 8 = 4; total = 44." },
        { text: "6 full", correct: false, feedback: "6×8 = 48, too many." },
        { text: "4 full + 1 half", correct: false, feedback: "4×8 + 4 = 36, too few." },
        { text: "5 full", correct: false, feedback: "5×8 = 40, not 44." }
      ],
    retryHint: "Divide the total by 8. The whole number part is the full stars. If the remainder is 4, that's one half star."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A distance‑time graph shows 1 PM: 15 km, 3 PM: 45 km. What was the average speed between these times?",
    options: [
        { text: "15 km/h", correct: true, feedback: "Distance = 30 km, time = 2 h. 30 ÷ 2 = 15 km/h." },
        { text: "30 km/h", correct: false, feedback: "That's the total distance, not the speed." },
        { text: "45 km/h", correct: false, feedback: "That's the final distance." },
        { text: "10 km/h", correct: false, feedback: "Incorrect division." }
      ],
    retryHint: "Speed = (final distance − initial distance) ÷ time taken."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "Two shops: Shop A sold 120, 150, 130 in three months. Shop B sold 110, 160, 140 in the same months. Which shop sold more in total, and by how much?",
    options: [
        { text: "B by 10", correct: true, feedback: "A total = 400; B total = 410. B sold 10 more." },
        { text: "A by 10", correct: false, feedback: "A total is 400, B is 410." },
        { text: "Both equal", correct: false, feedback: "400 ≠ 410." },
        { text: "B by 20", correct: false, feedback: "Incorrect addition." }
      ],
    retryHint: "Add each shop's sales separately, then compare the totals."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 star = 10 points. The total points are 35. How many full stars and half stars are there?",
    options: [
        { text: "3 full + 1 half", correct: true, feedback: "3×10 = 30; half of 10 = 5; total = 35." },
        { text: "4 full", correct: false, feedback: "4×10 = 40, too many." },
        { text: "3 full", correct: false, feedback: "30 points, not 35." },
        { text: "2 full + 1 half", correct: false, feedback: "20+5 = 25, too few." }
      ],
    backward: "Divide total by the key value; the quotient is full symbols, and if the remainder equals half the key, you have a half symbol.",
    forward: "Working backwards from data to the pictograph representation builds inverse reasoning."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows School A: 240 students; School B: 180 students. What is the ratio of School A's students to School B's students in simplest form?",
    options: [
        { text: "4 : 3", correct: true, feedback: "240:180 simplifies by dividing both by 60 → 4:3." },
        { text: "3 : 4", correct: false, feedback: "That's B to A, not A to B." },
        { text: "2 : 1", correct: false, feedback: "240 is not twice 180." },
        { text: "240 : 180", correct: false, feedback: "Not simplified." }
      ],
    backward: "Write the two numbers as a ratio and simplify by dividing both by their HCF (60).",
    forward: "Ratios are another way to compare data visually represented in bar graphs."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows visitors: at 2 PM: 60, at 3 PM: 85, at 4 PM: 100. What was the total increase in visitors from 2 PM to 4 PM?",
    options: [
        { text: "40", correct: true, feedback: "100 − 60 = 40." },
        { text: "25", correct: false, feedback: "That's 85−60, not the total increase." },
        { text: "15", correct: false, feedback: "That's 100−85." },
        { text: "100", correct: false, feedback: "That's the final number, not the increase." }
      ],
    backward: "Subtract the starting value from the ending value.",
    forward: "Total change is often more important than step‑by‑step changes."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "The table shows three test scores: 78, 85, and ?. The average is 80. Find the missing score.",
    options: [
        { text: "77", correct: true, feedback: "Total = 3×80 = 240. Sum of known = 78+85 = 163. Missing = 240−163 = 77." },
        { text: "80", correct: false, feedback: "That's the average, not the missing score." },
        { text: "85", correct: false, feedback: "That's one of the known scores." },
        { text: "75", correct: false, feedback: "240−163 = 77, not 75." }
      ],
    backward: "Multiply average by 3 to get total. Subtract the sum of the known scores.",
    forward: "Finding a missing value from an average is a key problem‑solving skill."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "You spin a spinner with 3 equal sections (red, blue, green) and roll a fair six‑sided die. What is the probability of getting red AND an even number? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{1}{6}\\)", correct: true, feedback: "Total outcomes = 3×6 = 18. Favourable = 1 (red) × 3 (even: 2,4,6) = 3. Probability = 3/18 = 1/6." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "That would be only the spinner part." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "That would be only the die part." },
        { text: "\\(\\frac{1}{9}\\)", correct: false, feedback: "Incorrect counting." }
      ],
    backward: "Multiply the number of outcomes for each event to get total possible outcomes. Count the favourable outcomes and simplify.",
    forward: "Combined probability is the foundation of more advanced probability."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis has marks at 0, 10, 20, 30, 40. Bar A ends exactly halfway between 20 and 30. Bar B ends at 35. What is the difference between Bar B and Bar A?",
    options: [
        { text: "10", correct: true, feedback: "Bar A = 25; Bar B = 35; diff = 10." },
        { text: "5", correct: false, feedback: "35 − 25 = 10, not 5." },
        { text: "15", correct: false, feedback: "Incorrect midpoint." },
        { text: "20", correct: false, feedback: "That's the difference between 35 and 15." }
      ],
    backward: "First read Bar A's value (midpoint). Then subtract from Bar B's value.",
    forward: "Combining scale reading with comparison is a practical graph skill."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 book = 4 books. Section P: 3 full + 1 half book. Section Q: 2 full books. What fraction of the total books are in Section Q? (Simplify.)",
    options: [
        { text: "\\(\\frac{4}{11}\\)", correct: true, feedback: "P = 12+2 = 14; Q = 8; total = 22. Fraction = 8/22 = 4/11." },
        { text: "\\(\\frac{4}{7}\\)", correct: false, feedback: "That's Q compared to P only (8/14)." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{8}{22}\\)", correct: false, feedback: "Not simplified." }
      ],
    backward: "Calculate each section's books using the key. Add to get total. Write Q's books over total and simplify.",
    forward: "Fractions from pictographs are used in reports and presentations."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "In a bar graph, a bar representing 25% of the total is 15 cm tall. What is the total?",
    options: [
        { text: "60", correct: true, feedback: "If 25% = 15, then 100% = 15 × 4 = 60." },
        { text: "30", correct: false, feedback: "That would be 50%." },
        { text: "40", correct: false, feedback: "Incorrect." },
        { text: "15", correct: false, feedback: "That's the bar for 25%." }
      ],
    backward: "If 25% is 15, then 100% is 4 times 15.",
    forward: "Percentages are often shown in bar graphs and pie charts."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows at 10 AM: 20°C; at 11 AM: 24°C. If the temperature continues to rise at the same rate, what will it be at 12 PM?",
    options: [
        { text: "28°C", correct: true, feedback: "Rise per hour = 4°C. 24 + 4 = 28°C." },
        { text: "24°C", correct: false, feedback: "No change assumed." },
        { text: "20°C", correct: false, feedback: "That's the earlier temperature." },
        { text: "30°C", correct: false, feedback: "Incorrect rise." }
      ],
    backward: "Find the rate of change per hour. Add that to the last known value.",
    forward: "Extrapolating from a line graph is used in forecasting."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "Table 1: June 45, July 50. Table 2: June 40, July 55. What is the difference between the total of Table 1 and the total of Table 2?",
    options: [
        { text: "0", correct: true, feedback: "Table 1 total = 95; Table 2 total = 95; difference = 0." },
        { text: "5", correct: false, feedback: "One month difference, not total." },
        { text: "10", correct: false, feedback: "Incorrect addition." },
        { text: "95", correct: false, feedback: "That's each total, not the difference." }
      ],
    backward: "Add each table separately, then subtract.",
    forward: "Comparing data from two sources is common in data analysis."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has 4 equal parts numbered 1, 2, 3, 4. Is the chance of getting an odd number equally likely, likely, unlikely, or certain?",
    options: [
        { text: "Equally likely", correct: true, feedback: "Odd numbers: 1,3 (2 outcomes). Even numbers: 2,4 (2 outcomes). Both equal." },
        { text: "Likely", correct: false, feedback: "It's not more likely than even." },
        { text: "Unlikely", correct: false, feedback: "2 out of 4 is not unlikely." },
        { text: "Certain", correct: false, feedback: "There are also even numbers." }
      ],
    backward: "Count the number of odd outcomes and compare with total outcomes.",
    forward: "Spinners are used in games of chance."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 tree = 6 trees. There are 5 full tree symbols and 2 half tree symbols. How many trees in total?",
    options: [
        { text: "36", correct: true, feedback: "5×6 = 30; 2×3 = 6; total = 36." },
        { text: "30", correct: false, feedback: "Forgot the half symbols." },
        { text: "42", correct: false, feedback: "Counted half symbols as full (5+2=7, 7×6=42)." },
        { text: "33", correct: false, feedback: "Incorrect half value." }
      ],
    backward: "Multiply full symbols by 6, half symbols by 3, then add.",
    forward: "Keys with half symbols require careful calculation."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 circle = 5 students. Total students in two classes = 55. Class A has 6 full circles. How many circles (full and half) does Class B have?",
    options: [
        { text: "5 full", correct: true, feedback: "Class A = 6×5 = 30 students. Class B = 55−30 = 25 students. 25÷5 = 5 full circles." },
        { text: "4 full + 1 half", correct: false, feedback: "4×5 + 2.5 = 22.5, not 25." },
        { text: "6 full", correct: false, feedback: "That would be 30 students." },
        { text: "5 full + 1 half", correct: false, feedback: "5×5+2.5=27.5, not 25." }
      ],
    backward: "Find Class B's students by subtracting. Divide by the key to get the number of full circles.",
    forward: "Working backwards from a total is a common data problem."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows City X rainfall: 350 mm; City Y rainfall: 250 mm. How much more rain did City X get? What fraction is City Y's rainfall of City X's? (Simplify.)",
    options: [
        { text: "Diff 100 mm, fraction \\(\\frac{5}{7}\\)", correct: true, feedback: "Difference = 100 mm. Fraction = 250/350 = 5/7." },
        { text: "Diff 100 mm, fraction \\(\\frac{7}{5}\\)", correct: false, feedback: "7/5 > 1, not possible as a fraction of a smaller part." },
        { text: "Diff 100 mm, fraction \\(\\frac{2}{5}\\)", correct: false, feedback: "Incorrect simplification." },
        { text: "Diff 150 mm, fraction \\(\\frac{5}{7}\\)", correct: false, feedback: "Difference is 100, not 150." }
      ],
    backward: "Subtract for difference; write smaller over larger and simplify.",
    forward: "Bar graphs can be used to find both absolute and relative differences."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature: 9 AM: 10°C, 10 AM: 10°C, 11 AM: 12°C. During which hour(s) did the temperature stay the same?",
    options: [
        { text: "9 AM to 10 AM", correct: true, feedback: "The line is horizontal, meaning no change." },
        { text: "10 AM to 11 AM", correct: false, feedback: "That's when it rose." },
        { text: "Both hours", correct: false, feedback: "Only one hour had no change." },
        { text: "Neither", correct: false, feedback: "9−10 AM shows no change." }
      ],
    backward: "A horizontal line segment means the value did not change.",
    forward: "Flat sections of a line graph are as important as rising/falling sections."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "Table A: four numbers: 12, 18, 24, 30. Table B: two numbers: 16, 20. What is the average of all six numbers?",
    options: [
        { text: "20", correct: true, feedback: "Sum A = 84; Sum B = 36; total = 120; count = 6; average = 20." },
        { text: "21", correct: false, feedback: "That's the average of Table A only." },
        { text: "18", correct: false, feedback: "That's the average of Table B only." },
        { text: "120", correct: false, feedback: "That's the total, not the average." }
      ],
    backward: "Sum all numbers, count all numbers, divide.",
    forward: "Combining data from two tables and finding an overall average is a common statistical task."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "Two fair six‑sided dice are rolled. What is the probability that the sum is 7? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{1}{6}\\)", correct: true, feedback: "There are 6 ways to get sum 7 out of 36 possible outcomes: 6/36 = 1/6." },
        { text: "\\(\\frac{1}{12}\\)", correct: false, feedback: "Incorrect counting." },
        { text: "\\(\\frac{1}{9}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "Too high." }
      ],
    backward: "List the ways to get sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 ways. Total possible = 36.",
    forward: "Dice sums are classic probability problems."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A line graph's y‑axis has labels 0, 20, 40, 60. Point P is exactly halfway between 40 and 60. Point Q is at 50. What is the difference between P and Q?",
    options: [
        { text: "0", correct: true, feedback: "P = 50; Q = 50; difference = 0." },
        { text: "10", correct: false, feedback: "Incorrect midpoint." },
        { text: "20", correct: false, feedback: "That's the difference between 60 and 40." },
        { text: "5", correct: false, feedback: "Incorrect." }
      ],
    backward: "Find the value at P (midpoint). Compare with Q.",
    forward: "Sometimes points are exactly on the midpoint."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Pictograph 1 key: 1 star = 4 points. Team A has 5 stars. Pictograph 2 key: 1 star = 5 points. Team B has 4 stars. Which team has more points?",
    options: [
        { text: "Equal", correct: true, feedback: "A = 5×4 = 20; B = 4×5 = 20. They are equal." },
        { text: "Team A", correct: false, feedback: "Both are 20." },
        { text: "Team B", correct: false, feedback: "Both are 20." },
        { text: "Cannot compare", correct: false, feedback: "We can calculate both using their keys." }
      ],
    backward: "Calculate the points using each key, then compare.",
    forward: "Different pictographs may use different keys — always check before comparing."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Monday 150, Tuesday 100, Wednesday 50. What is the total? Then what fraction of the total is Wednesday? (Simplify.)",
    options: [
        { text: "Total 300, fraction \\(\\frac{1}{6}\\)", correct: true, feedback: "150+100+50 = 300. 50/300 = 1/6." },
        { text: "Total 300, fraction \\(\\frac{1}{5}\\)", correct: false, feedback: "50/300 simplifies to 1/6." },
        { text: "Total 250, fraction \\(\\frac{1}{5}\\)", correct: false, feedback: "Total is 300, not 250." },
        { text: "Total 300, fraction \\(\\frac{1}{3}\\)", correct: false, feedback: "50/300 is not 1/3." }
      ],
    backward: "Add the three bars. Write Wednesday over total and simplify.",
    forward: "Bar graphs can be used to find proportions of a whole."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows a stock price at 10 AM: ₹500, at 11 AM: ₹450, at 12 PM: ₹480. Between which times was the greatest decrease, and by how much?",
    options: [
        { text: "10 AM−11 AM, ₹50", correct: true, feedback: "10−11: drop ₹50; 11−12: rise ₹30. Greatest decrease is ₹50." },
        { text: "11 AM−12 PM, ₹30", correct: false, feedback: "That's a rise, not a decrease." },
        { text: "10 AM−12 PM, ₹20", correct: false, feedback: "That's the net change over 2 hours." },
        { text: "10 AM−11 AM, ₹100", correct: false, feedback: "Incorrect amount." }
      ],
    backward: "Look for the largest drop. Ignore any increases.",
    forward: "Identifying trends helps in making decisions."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows A = 28, B = ?, C = 22. The total is 75. Find B.",
    options: [
        { text: "25", correct: true, feedback: "75 − (28+22) = 75 − 50 = 25." },
        { text: "28", correct: false, feedback: "That's A." },
        { text: "22", correct: false, feedback: "That's C." },
        { text: "35", correct: false, feedback: "Incorrect subtraction." }
      ],
    backward: "Subtract the sum of the known values from the total.",
    forward: "Finding missing data from a total is a basic data‑handling skill."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 3 red, 4 blue, and 5 green marbles. You pick one marble. What is the probability that it is NOT red? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{3}{4}\\)", correct: true, feedback: "Total = 12. Not red = 4+5 = 9. 9/12 = 3/4." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "That's the probability of red." },
        { text: "\\(\\frac{1}{3}\\)", correct: false, feedback: "Incorrect." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "9/12 simplifies to 3/4, not 2/3." }
      ],
    backward: "Total marbles = 12. Not red = blue + green = 9. Probability = 9/12 = 3/4.",
    forward: "Complementary probability (chance of something not happening) is very useful."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 apple = 8 apples. The total number of apples is 52. How many full and half apple symbols are there?",
    options: [
        { text: "6 full + 1 half", correct: true, feedback: "6×8 = 48; half of 8 = 4; total = 52." },
        { text: "7 full", correct: false, feedback: "7×8 = 56, too many." },
        { text: "5 full + 1 half", correct: false, feedback: "5×8+4 = 44." },
        { text: "6 full", correct: false, feedback: "48, not 52." }
      ],
    backward: "Divide total by the key. The quotient is full symbols; if the remainder equals half the key, add a half symbol.",
    forward: "Reverse engineering a pictograph from a given total tests understanding of scales."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 car = 6 cars. The total number of cars is 45. How many full and half car symbols are there?",
    options: [
        { text: "7 full + 1 half", correct: true, feedback: "7×6 = 42; half of 6 = 3; total = 45." },
        { text: "8 full", correct: false, feedback: "8×6 = 48, too many." },
        { text: "7 full", correct: false, feedback: "42, not 45." },
        { text: "6 full + 1 half", correct: false, feedback: "36+3 = 39." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Bar A: 200, Bar B: 150. What is the ratio A:B in simplest form?",
    options: [
        { text: "4 : 3", correct: true, feedback: "200:150 ÷50 = 4:3." },
        { text: "3 : 4", correct: false, feedback: "Not correct — try the next one." },
        { text: "2 : 1", correct: false, feedback: "Not correct — try the next one." },
        { text: "200 : 150", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows 1 PM: 30 km/h, 2 PM: 50 km/h, 3 PM: 40 km/h. Between which times was the greatest increase?",
    options: [
        { text: "1 PM to 2 PM", correct: true, feedback: "Increase of 20 km/h. 2−3 was a decrease." },
        { text: "2 PM to 3 PM", correct: false, feedback: "Not correct — try the next one." },
        { text: "Both equal", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "The average of four numbers is 25. Three numbers are 20, 30, and 25. Find the fourth number.",
    options: [
        { text: "25", correct: true, feedback: "Total = 4×25 = 100. Sum of known = 75. Missing = 25." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." },
        { text: "75", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has numbers 1 to 8. What is the probability of getting an odd number? (Simplify.)",
    options: [
        { text: "\\(\\frac{1}{2}\\)", correct: true, feedback: "4 odd (1,3,5,7) out of 8 = 1/2." },
        { text: "\\(\\frac{1}{4}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{3}{8}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{5}{8}\\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 leaf = 10 leaves. Total leaves = 65. How many full and half leaf symbols?",
    options: [
        { text: "6 full + 1 half", correct: true, feedback: "6×10=60; half=5; total=65." },
        { text: "7 full", correct: false, feedback: "Not correct — try the next one." },
        { text: "5 full + 1 half", correct: false, feedback: "Not correct — try the next one." },
        { text: "6 full", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 book = 3 books. Class X: 4 full + 1 half; Class Y: 2 full + 2 half. Which class has more books, and by how much?",
    options: [
        { text: "X by 4.5", correct: true, feedback: "X = 12+1.5=13.5; Y = 6+3=9; diff=4.5." },
        { text: "Y by 4.5", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equal", correct: false, feedback: "Not correct — try the next one." },
        { text: "X by 3", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Monday 60, Tuesday 90. Monday's value is what fraction of Tuesday's? (Simplify.)",
    options: [
        { text: "\\(\\frac{2}{3}\\)", correct: true, feedback: "60/90 = 2/3." },
        { text: "\\(\\frac{3}{2}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{2}{5}\\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows a flat line at 25°C from 9 AM to 11 AM. What was the temperature at 10 AM?",
    options: [
        { text: "25°C", correct: true, feedback: "A flat line means constant temperature." },
        { text: "20°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "30°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "Table A: 15, 25. Table B: 10, 20, 30. What is the average of all five numbers?",
    options: [
        { text: "20", correct: true, feedback: "Sum = 15+25+10+20+30 = 100; ÷5 = 20." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." },
        { text: "25", correct: false, feedback: "Not correct — try the next one." },
        { text: "22", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "Two dice are rolled. What is the probability that the sum is 2? (Simplify.)",
    options: [
        { text: "\\(\\frac{1}{36}\\)", correct: true, feedback: "Only (1,1) gives sum 2 out of 36 outcomes." },
        { text: "\\(\\frac{1}{18}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{1}{12}\\)", correct: false, feedback: "Not correct — try the next one." },
        { text: "\\(\\frac{1}{6}\\)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis has marks at 0, 5, 10, 15. A bar ends exactly halfway between 10 and 15. What is its value?",
    options: [
        { text: "12.5", correct: true, feedback: "(10+15)÷2 = 12.5." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." },
        { text: "15", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." }
      ]
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
    title: "Data Handling — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems: working backwards from pictograph totals, ratios and fractions from bar graphs, combined probability, and missing values from averages.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Synthesis Tips</strong><br>\n        • Combine pictograph keys with totals to work backwards to find symbols.<br>\n        • Bar graphs can be used to find ratios, fractions, and percentages.<br>\n        • Line graphs show rate of change; find the steepest part to identify the greatest increase or decrease.<br>\n        • Use totals and averages to find missing values in tables.<br>\n        • For combined probability (e.g., spinner and dice), multiply the number of outcomes.<br>\n        • Reading between scale marks requires finding midpoints or estimating values.",
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

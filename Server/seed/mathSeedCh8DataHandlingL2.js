// seed/mathSeedCh8DataHandlingL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 2 — converted from the standalone HTML file
// ch-8-data-handling-level-2.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 2;

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
    question: "Key: 1 circle = 4 students. Monday: 5 circles, Tuesday: 3 circles. How many more students on Monday than Tuesday?",
    options: [
        { text: "8", correct: true, feedback: "Monday = 5×4 = 20; Tuesday = 3×4 = 12. 20 − 12 = 8." },
        { text: "2", correct: false, feedback: "You only looked at the circles (5−3), forgot to multiply by 4." },
        { text: "20", correct: false, feedback: "That's Monday's total only." },
        { text: "12", correct: false, feedback: "That's Tuesday's total only." }
      ],
    retryHint: "First multiply each day's circles by 4, then subtract."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Apples: 15, Bananas: 25. How many fruit in total?",
    options: [
        { text: "40", correct: true, feedback: "15 + 25 = 40 fruit." },
        { text: "10", correct: false, feedback: "That's the difference (25−15), not the total." },
        { text: "15", correct: false, feedback: "That's only apples." },
        { text: "25", correct: false, feedback: "That's only bananas." }
      ],
    retryHint: "Add the two values together."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature at 10 AM = 20°C, at 12 PM = 26°C. How much did the temperature rise?",
    options: [
        { text: "6°C", correct: true, feedback: "26 − 20 = 6°C." },
        { text: "20°C", correct: false, feedback: "That's the starting temperature." },
        { text: "26°C", correct: false, feedback: "That's the later temperature." },
        { text: "46°C", correct: false, feedback: "You added instead of subtracted." }
      ],
    retryHint: "Subtract the earlier temperature from the later one."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows: Monday 12, Tuesday 18, Wednesday 15. What is the total?",
    options: [
        { text: "45", correct: true, feedback: "12 + 18 + 15 = 45." },
        { text: "30", correct: false, feedback: "You only added Monday and Tuesday." },
        { text: "33", correct: false, feedback: "You added Tuesday and Wednesday only." },
        { text: "15", correct: false, feedback: "That's just Wednesday." }
      ],
    retryHint: "Add all three numbers."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag has 5 red balls and 1 blue ball. You pick one ball. The chance of picking a red ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "Most balls are red, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There is still a blue ball, so not 100% sure." },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal in number." },
        { text: "Unlikely", correct: false, feedback: "With 5 out of 6 being red, it's likely, not unlikely." }
      ],
    retryHint: "If there are more of one colour, that colour is likely."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Pictograph key: 1 star = 5 points. There are 4 full stars and one half star. How many points?",
    options: [
        { text: "22.5", correct: true, feedback: "4 × 5 = 20; half of 5 = 2.5; total = 22.5." },
        { text: "20", correct: false, feedback: "You forgot the half star." },
        { text: "25", correct: false, feedback: "You counted the half as a full star." },
        { text: "4.5", correct: false, feedback: "You forgot to multiply by the key value." }
      ],
    retryHint: "Multiply full stars by 5; a half star adds 2.5. Sum them."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Monday: 35, Tuesday: 20. How many more on Monday?",
    options: [
        { text: "15", correct: true, feedback: "35 − 20 = 15." },
        { text: "55", correct: false, feedback: "You added the two numbers." },
        { text: "20", correct: false, feedback: "That's Tuesday's value." },
        { text: "35", correct: false, feedback: "That's Monday's value." }
      ],
    retryHint: "Subtract the smaller bar from the larger bar."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows a plant's height: week 1 = 5 cm, week 3 = 11 cm. How much did it grow from week 1 to week 3?",
    options: [
        { text: "6 cm", correct: true, feedback: "11 − 5 = 6 cm." },
        { text: "5 cm", correct: false, feedback: "That's the starting height." },
        { text: "11 cm", correct: false, feedback: "That's the final height." },
        { text: "16 cm", correct: false, feedback: "You added instead of subtracted." }
      ],
    retryHint: "Final height minus starting height."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 book symbol = 6 books. Class A has 7 symbols; Class B has 4 symbols. How many more books did Class A read?",
    options: [
        { text: "18", correct: true, feedback: "A = 7×6 = 42; B = 4×6 = 24; 42 − 24 = 18." },
        { text: "3", correct: false, feedback: "You only compared the symbols (7−4) without multiplying by the key." },
        { text: "42", correct: false, feedback: "That's Class A's total only." },
        { text: "24", correct: false, feedback: "That's Class B's total only." }
      ],
    backward: "Multiply the symbols for each class by the key value, then subtract.",
    forward: "Comparing categories is the main purpose of pictographs."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows: Monday 45, Tuesday 30, Wednesday 50. What is the total?",
    options: [
        { text: "125", correct: true, feedback: "45 + 30 + 50 = 125." },
        { text: "80", correct: false, feedback: "You only added Monday and Wednesday." },
        { text: "95", correct: false, feedback: "Tuesday + Wednesday." },
        { text: "105", correct: false, feedback: "Incorrect addition." }
      ],
    backward: "Add the values of all three bars.",
    forward: "Totals help summarise data."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows sales: January ₹2,000; February ₹2,500. What is the increase from January to February?",
    options: [
        { text: "₹500", correct: true, feedback: "2500 − 2000 = ₹500." },
        { text: "₹2,000", correct: false, feedback: "That's January's value." },
        { text: "₹2,500", correct: false, feedback: "That's February's value." },
        { text: "₹4,500", correct: false, feedback: "You added instead of subtracted." }
      ],
    backward: "Subtract the earlier value from the later value.",
    forward: "Line graphs are excellent for showing growth."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows: Class A 28 students, Class B 32 students, Class C 25 students. Which class has the most students?",
    options: [
        { text: "Class B", correct: true, feedback: "32 is the largest number." },
        { text: "Class A", correct: false, feedback: "28 < 32." },
        { text: "Class C", correct: false, feedback: "25 is the smallest." },
        { text: "All equal", correct: false, feedback: "The numbers are different." }
      ],
    backward: "Find the row with the highest number.",
    forward: "Tables organise data for easy comparison."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has 4 equal sections: 3 green, 1 yellow. Landing on yellow is best described as:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 4 sections is yellow, so it is unlikely." },
        { text: "Likely", correct: false, feedback: "3 green sections make green likely; yellow is not." },
        { text: "Certain", correct: false, feedback: "It is not certain — green could come." },
        { text: "Impossible", correct: false, feedback: "It is possible because there is a yellow section." }
      ],
    backward: "With only 1 out of 4, it is not impossible but less likely.",
    forward: "Probability words help us describe chance events."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis is labelled 0, 10, 20, 30. A bar ends exactly halfway between 20 and 30. What is its value?",
    options: [
        { text: "25", correct: true, feedback: "Halfway between 20 and 30 is (20+30)÷2 = 25." },
        { text: "20", correct: false, feedback: "That's the lower mark." },
        { text: "30", correct: false, feedback: "That's the upper mark." },
        { text: "15", correct: false, feedback: "That's halfway between 10 and 20." }
      ],
    backward: "Halfway between two numbers is their average.",
    forward: "Reading between marks is a key graph skill."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 circle = 5 students. Music: 3 full circles and 1 half circle. Art: 2 full circles. How many students in total?",
    options: [
        { text: "27.5", correct: true, feedback: "Music = 3×5 + 2.5 = 17.5; Art = 2×5 = 10; total = 27.5." },
        { text: "25", correct: false, feedback: "You ignored the half symbol." },
        { text: "30", correct: false, feedback: "You counted the half as a full symbol." },
        { text: "5", correct: false, feedback: "You only wrote the key value." }
      ],
    backward: "Multiply full symbols by 5, half symbols by 2.5; add for each category, then sum.",
    forward: "Totals with half symbols require careful multiplication."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows City A: 400 mm rain; City B: 250 mm rain. How much more rain fell in City A?",
    options: [
        { text: "150 mm", correct: true, feedback: "400 − 250 = 150 mm." },
        { text: "650 mm", correct: false, feedback: "You added instead of subtracted." },
        { text: "400 mm", correct: false, feedback: "That's City A's total." },
        { text: "250 mm", correct: false, feedback: "That's City B's total." }
      ],
    backward: "Subtract the smaller value from the larger.",
    forward: "Differences highlight how much more or less."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature: 6 AM 18°C, 8 AM 20°C, 10 AM 24°C. Between which two hours did the temperature rise the most?",
    options: [
        { text: "8 AM to 10 AM", correct: true, feedback: "6−8: +2°C; 8−10: +4°C. The largest rise is 4°C." },
        { text: "6 AM to 8 AM", correct: false, feedback: "That rise was only 2°C." },
        { text: "Both are equal", correct: false, feedback: "2°C and 4°C are not equal." },
        { text: "Cannot say", correct: false, feedback: "We can calculate the rises." }
      ],
    backward: "Calculate the rise for each interval; compare.",
    forward: "Identifying the steepest part of a line graph is a key analytical skill."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A daily food bill: Monday ₹120, Tuesday ₹180, Wednesday ₹150. What is the average bill per day?",
    options: [
        { text: "₹150", correct: true, feedback: "(120+180+150) ÷ 3 = 450 ÷ 3 = ₹150." },
        { text: "₹450", correct: false, feedback: "That's the total, not the average." },
        { text: "₹180", correct: false, feedback: "That's Tuesday's bill only." },
        { text: "₹120", correct: false, feedback: "That's Monday's bill only." }
      ],
    backward: "Add the three numbers, then divide by 3.",
    forward: "The average gives a typical value for the data."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 2 red, 2 blue, and 2 green balls. Picking a red ball is:",
    options: [
        { text: "Equally likely", correct: true, feedback: "Each colour has the same number of balls, so all three colours are equally likely." },
        { text: "Certain", correct: false, feedback: "Other colours could also be picked." },
        { text: "Likely", correct: false, feedback: "It's not more likely than blue or green." },
        { text: "Unlikely", correct: false, feedback: "It's not unlikely — it has the same chance as the others." }
      ],
    backward: "Because all colours have the same count, they have the same chance.",
    forward: "Equally likely is the foundation of fair games."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Pictograph key: 1 tree symbol = 8 trees. There are 3 full symbols and one half symbol. How many trees?",
    options: [
        { text: "28", correct: true, feedback: "3 × 8 = 24; half of 8 = 4; total = 28." },
        { text: "32", correct: false, feedback: "You counted the half symbol as a full symbol." },
        { text: "24", correct: false, feedback: "You ignored the half symbol." },
        { text: "3.5", correct: false, feedback: "You didn't multiply by the key value." }
      ],
    backward: "Multiply full symbols by 8; half symbol = 4. Add.",
    forward: "Pictographs often use half symbols to show more precise data."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 star = 10 votes. Candidate X: 2 stars and 1 half star. Candidate Y: 3 stars. Who got more votes, and by how much?",
    options: [
        { text: "Y by 5 votes", correct: true, feedback: "X = 2×10 + 5 = 25; Y = 3×10 = 30; Y wins by 5." },
        { text: "X by 5 votes", correct: false, feedback: "X has 25, Y has 30 — X is behind." },
        { text: "Y by 10 votes", correct: false, feedback: "Incorrect calculation." },
        { text: "Both equal", correct: false, feedback: "25 ≠ 30." }
      ],
    backward: "Calculate votes for each, then subtract.",
    forward: "Election results are often shown in pictographs."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Day 1: 80 and Day 2: 60. What fraction of the total does Day 1 represent? (Simplify your answer.)",
    options: [
        { text: "\\(\\frac{4}{7}\\)", correct: true, feedback: "Total = 80+60 = 140. Day 1 fraction = 80/140 = 8/14 = 4/7." },
        { text: "\\(\\frac{3}{7}\\)", correct: false, feedback: "That's Day 2's fraction (60/140 = 3/7)." },
        { text: "\\(\\frac{1}{2}\\)", correct: false, feedback: "80/140 is not 1/2." },
        { text: "\\(\\frac{2}{3}\\)", correct: false, feedback: "80/140 simplifies to 4/7, not 2/3." }
      ],
    backward: "Write Day 1 over the total and simplify.",
    forward: "Bar graphs can be used to find proportions."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A distance‑time graph shows: 2 PM: 10 km, 3 PM: 25 km. What was the speed between 2 PM and 3 PM?",
    options: [
        { text: "15 km/h", correct: true, feedback: "(25 − 10) ÷ 1 = 15 km/h." },
        { text: "10 km/h", correct: false, feedback: "That's the distance at 2 PM, not the speed." },
        { text: "25 km/h", correct: false, feedback: "That's the distance at 3 PM, not the speed." },
        { text: "35 km/h", correct: false, feedback: "You added instead of subtracted." }
      ],
    backward: "Speed = change in distance ÷ change in time.",
    forward: "Distance‑time graphs link data handling with speed."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table of fruit: Apples 20, Oranges 15, Bananas 25. What is the total number of fruits?",
    options: [
        { text: "60", correct: true, feedback: "20 + 15 + 25 = 60." },
        { text: "45", correct: false, feedback: "You missed one fruit." },
        { text: "50", correct: false, feedback: "Incorrect addition." },
        { text: "70", correct: false, feedback: "Too high." }
      ],
    backward: "Add all the numbers in the table.",
    forward: "Totals are the simplest summary statistic."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A fair six‑sided die is rolled. The chance of getting a number less than 7 is:",
    options: [
        { text: "Certain", correct: true, feedback: "All numbers on a die (1−6) are less than 7, so it will definitely happen." },
        { text: "Likely", correct: false, feedback: "It's more than likely — it's guaranteed." },
        { text: "Equally likely", correct: false, feedback: "All outcomes satisfy the condition, so it's certain." },
        { text: "Impossible", correct: false, feedback: "It will always happen." }
      ],
    backward: "Every possible outcome satisfies the condition, so it's certain.",
    forward: "Certain and impossible are the two extremes in probability."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A line graph's y‑axis is labelled 0, 50, 100, 150. A point lies exactly halfway between 50 and 100. What is its value?",
    options: [
        { text: "75", correct: true, feedback: "(50 + 100) ÷ 2 = 75." },
        { text: "50", correct: false, feedback: "That's the lower mark." },
        { text: "100", correct: false, feedback: "That's the upper mark." },
        { text: "125", correct: false, feedback: "That's halfway between 100 and 150." }
      ],
    backward: "Halfway is the average of the two numbers.",
    forward: "Accurate reading is essential for correct interpretation."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 smiley = 2 people. Group A: 8 smileys; Group B: 6 smileys. How many people in total?",
    options: [
        { text: "28", correct: true, feedback: "A = 8×2 = 16; B = 6×2 = 12; total = 28." },
        { text: "14", correct: false, feedback: "You added the symbols only (8+6) without multiplying." },
        { text: "16", correct: false, feedback: "That's Group A only." },
        { text: "12", correct: false, feedback: "That's Group B only." }
      ],
    backward: "Multiply each group's symbols by 2, then add.",
    forward: "Pictographs can show combined totals."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows June: 45, July: 30. How many fewer in July?",
    options: [
        { text: "15", correct: true, feedback: "45 − 30 = 15." },
        { text: "75", correct: false, feedback: "You added the two values." },
        { text: "30", correct: false, feedback: "That's July's value." },
        { text: "45", correct: false, feedback: "That's June's value." }
      ],
    backward: "Subtract the smaller bar from the larger.",
    forward: "Differences are easy to spot in bar graphs."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature: 8 AM 10°C, 12 PM 22°C, 4 PM 18°C. During which period did the temperature fall?",
    options: [
        { text: "12 PM to 4 PM", correct: true, feedback: "From 12 PM to 4 PM, the temperature went from 22°C down to 18°C." },
        { text: "8 AM to 12 PM", correct: false, feedback: "That's when the temperature rose." },
        { text: "Both periods", correct: false, feedback: "Only one period shows a fall." },
        { text: "Neither period", correct: false, feedback: "One period clearly goes down." }
      ],
    backward: "Look for a downward slope — the value goes down.",
    forward: "Line graphs can show both increases and decreases."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows: A = 35, B = 40, C = 45. What is the total?",
    options: [
        { text: "120", correct: true, feedback: "35 + 40 + 45 = 120." },
        { text: "80", correct: false, feedback: "Only A and B." },
        { text: "100", correct: false, feedback: "Incorrect addition." },
        { text: "110", correct: false, feedback: "Incorrect." }
      ],
    backward: "Add the three numbers.",
    forward: "Totals summarise the data in one number."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 1 red ball and 9 blue balls. Picking a red ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 10 balls is red, so the chance is small." },
        { text: "Certain", correct: false, feedback: "It is not certain." },
        { text: "Likely", correct: false, feedback: "With only 1 red out of 10, it is unlikely, not likely." },
        { text: "Impossible", correct: false, feedback: "There is a red ball, so it is possible." }
      ],
    backward: "The chance is small but not zero, so it's unlikely.",
    forward: "Probability words help us make predictions."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis is labelled 0, 20, 40, 60. A bar ends exactly halfway between 40 and 60. What is its value?",
    options: [
        { text: "50", correct: true, feedback: "(40 + 60) ÷ 2 = 50." },
        { text: "40", correct: false, feedback: "That's the lower mark." },
        { text: "60", correct: false, feedback: "That's the upper mark." },
        { text: "30", correct: false, feedback: "That's halfway between 20 and 40." }
      ],
    backward: "Halfway is the midpoint; (40+60)÷2 = 50.",
    forward: "Reading between marks is necessary when bars fall between gridlines."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 apple = 3 kg. Shop A has 6 full apples and 1 half apple. Shop B has 5 full apples. How many more kg does Shop A have?",
    options: [
        { text: "4.5 kg", correct: true, feedback: "A = 6×3 + 1.5 = 19.5; B = 5×3 = 15; difference = 4.5 kg." },
        { text: "1.5 kg", correct: false, feedback: "You only compared the half symbol value." },
        { text: "15 kg", correct: false, feedback: "That's Shop B's total." },
        { text: "19.5 kg", correct: false, feedback: "That's Shop A's total." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Monday: 55, Tuesday: 45. What is the total?",
    options: [
        { text: "100", correct: true, feedback: "55 + 45 = 100." },
        { text: "10", correct: false, feedback: "That's the difference." },
        { text: "55", correct: false, feedback: "Monday only." },
        { text: "45", correct: false, feedback: "Tuesday only." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows Week 1: 30 cm, Week 2: 45 cm. What was the increase?",
    options: [
        { text: "15 cm", correct: true, feedback: "45 − 30 = 15 cm." },
        { text: "30 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "45 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "75 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows A: 14, B: 16, C: 18. What is the average?",
    options: [
        { text: "16", correct: true, feedback: "(14+16+18) ÷ 3 = 48 ÷ 3 = 16." },
        { text: "48", correct: false, feedback: "That's the total." },
        { text: "14", correct: false, feedback: "Not correct — try the next one." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag has 8 red balls and 2 blue balls. Picking a blue ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 2 out of 10 are blue." },
        { text: "Certain", correct: false, feedback: "Not correct — try the next one." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equally likely", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 car symbol = 4 cars. There are 2 full symbols and 1 half symbol. How many cars?",
    options: [
        { text: "10", correct: true, feedback: "2×4 = 8; half = 2; total = 10." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "2.5", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 star = 5 points. Team P: 4 stars; Team Q: 3 stars and 1 half star. How many more points for Team P?",
    options: [
        { text: "2.5", correct: true, feedback: "P = 20; Q = 15 + 2.5 = 17.5; difference = 2.5." },
        { text: "1", correct: false, feedback: "Not correct — try the next one." },
        { text: "5", correct: false, feedback: "Not correct — try the next one." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Day X: 80, Day Y: 50. How many more on Day X?",
    options: [
        { text: "30", correct: true, feedback: "80 − 50 = 30." },
        { text: "130", correct: false, feedback: "Not correct — try the next one." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows 9 AM: 20°C, 11 AM: 20°C, 1 PM: 24°C. Between which two times was the greatest rise?",
    options: [
        { text: "11 AM to 1 PM", correct: true, feedback: "9−11: 0°C rise; 11−1: +4°C rise." },
        { text: "9 AM to 11 AM", correct: false, feedback: "Not correct — try the next one." },
        { text: "All equal", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows P: ₹250, Q: ₹300, R: ₹200. What is the total?",
    options: [
        { text: "₹750", correct: true, feedback: "250 + 300 + 200 = 750." },
        { text: "₹550", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹500", correct: false, feedback: "Not correct — try the next one." },
        { text: "₹800", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has 5 red sections and 0 blue sections. Landing on blue is:",
    options: [
        { text: "Impossible", correct: true, feedback: "There are no blue sections." },
        { text: "Certain", correct: false, feedback: "Not correct — try the next one." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis has marks at 0, 20, 40, 60, 80. A bar ends exactly halfway between 60 and 80. What is its value?",
    options: [
        { text: "70", correct: true, feedback: "(60 + 80) ÷ 2 = 70." },
        { text: "60", correct: false, feedback: "Not correct — try the next one." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Data Handling — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step comparisons, totals, averages, and midpoint scale readings across every data-handling cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Multi‑Step Data Handling</strong><br>\n        • Pictographs: multiply symbols by the key value; add half symbol values for exact numbers.<br>\n        • Bar graphs: read bar heights, find differences and totals, compare categories.<br>\n        • Line graphs: find the change between two points, identify the period of greatest increase or decrease.<br>\n        • Tables: read values, compute totals and averages.<br>\n        • Probability: certain (will happen), likely, equally likely, unlikely, impossible (cannot happen).<br>\n        • Scales: find the interval between marks; read values halfway between marks.",
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

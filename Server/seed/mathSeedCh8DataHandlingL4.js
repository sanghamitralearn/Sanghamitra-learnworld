// seed/mathSeedCh8DataHandlingL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 4 — converted from the standalone HTML file
// ch-8-data-handling-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh8DataHandlingL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 4;

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
    question: "Key: 1 circle = 3 students. How many students do 5 circles represent?",
    options: [
        { text: "15", correct: true, feedback: "5 × 3 = 15 students." },
        { text: "5", correct: false, feedback: "You forgot to multiply by the key value." },
        { text: "8", correct: false, feedback: "You added instead of multiplying." },
        { text: "2", correct: false, feedback: "You divided instead of multiplying." }
      ]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Monday 20, Tuesday 30. What is the total?",
    options: [
        { text: "50", correct: true, feedback: "20 + 30 = 50." },
        { text: "10", correct: false, feedback: "That's the difference, not the total." },
        { text: "20", correct: false, feedback: "That's only Monday." },
        { text: "30", correct: false, feedback: "That's only Tuesday." }
      ]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows the temperature at 9 AM is 15°C. What is the temperature at 9 AM?",
    options: [
        { text: "15°C", correct: true, feedback: "Read the value at the 9 AM point." },
        { text: "9°C", correct: false, feedback: "That's the time, not the temperature." },
        { text: "10°C", correct: false, feedback: "Incorrect reading." },
        { text: "20°C", correct: false, feedback: "Incorrect reading." }
      ]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows A = 12, B = 18. What is the value for A?",
    options: [
        { text: "12", correct: true, feedback: "The table shows 12 for A." },
        { text: "18", correct: false, feedback: "That's B's value." },
        { text: "30", correct: false, feedback: "That's the total." },
        { text: "6", correct: false, feedback: "That's the difference." }
      ]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag has 8 red balls and 2 blue balls. Picking a red ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "Most balls are red, so red is likely." },
        { text: "Certain", correct: false, feedback: "There are also blue balls." },
        { text: "Unlikely", correct: false, feedback: "8 out of 10 is likely, not unlikely." },
        { text: "Impossible", correct: false, feedback: "Red balls exist." }
      ]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 star = 5 points. How many points do 3 stars represent?",
    options: [
        { text: "15", correct: true, feedback: "3 × 5 = 15 points." },
        { text: "3", correct: false, feedback: "You forgot the key." },
        { text: "8", correct: false, feedback: "You added 3+5." },
        { text: "5", correct: false, feedback: "That's the key value for one star." }
      ]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 book symbol = 4 books. What does a half book symbol represent?",
    options: [
        { text: "2", correct: true, feedback: "Half of 4 is 2." },
        { text: "4", correct: false, feedback: "That's a full symbol." },
        { text: "8", correct: false, feedback: "You doubled instead of halving." },
        { text: "1", correct: false, feedback: "Incorrect fraction." }
      ]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "Which is more: 40 or 35?",
    options: [
        { text: "40", correct: true, feedback: "40 is greater than 35." },
        { text: "35", correct: false, feedback: "35 is smaller." },
        { text: "They are equal", correct: false, feedback: "40 ≠ 35." },
        { text: "Cannot say", correct: false, feedback: "We can compare numbers." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "S",
    question: "Key: 1 book symbol = 5 books. There are 4 book symbols. How many books in total?",
    options: [
        { text: "20", correct: true, feedback: "4 × 5 = 20 books." },
        { text: "4", correct: false, feedback: "You forgot to multiply by the key." },
        { text: "9", correct: false, feedback: "You added 5+4." },
        { text: "25", correct: false, feedback: "You multiplied 5×5." }
      ]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "S",
    question: "A bar graph shows Cats: 25. How many cats are there?",
    options: [
        { text: "25", correct: true, feedback: "The bar reaches 25 on the scale." },
        { text: "20", correct: false, feedback: "Incorrect reading of the bar height." },
        { text: "30", correct: false, feedback: "Incorrect." },
        { text: "15", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "S",
    question: "A line graph shows the height of a plant at week 2 is 30 cm. What is the height at week 2?",
    options: [
        { text: "30 cm", correct: true, feedback: "Read the value on the graph at week 2." },
        { text: "2 cm", correct: false, feedback: "That's the week number." },
        { text: "15 cm", correct: false, feedback: "Incorrect reading." },
        { text: "60 cm", correct: false, feedback: "Incorrect reading." }
      ]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "S",
    question: "A table shows Monday 14, Tuesday 16. What is Tuesday's value?",
    options: [
        { text: "16", correct: true, feedback: "The row for Tuesday shows 16." },
        { text: "14", correct: false, feedback: "That's Monday." },
        { text: "30", correct: false, feedback: "That's the total." },
        { text: "2", correct: false, feedback: "That's the difference." }
      ]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "T",
    question: "A bag has 9 red balls and 1 blue ball. You pick one ball without looking. The chance of picking the blue ball is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 10 balls is blue — a small chance." },
        { text: "Likely", correct: false, feedback: "It is not likely because there is only 1 blue." },
        { text: "Impossible", correct: false, feedback: "There is a blue ball, so it is possible." },
        { text: "Certain", correct: false, feedback: "It is not certain." }
      ]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    tier: "T",
    question: "Key: 1 sun symbol = 6 days. There are 3 full suns and 1 half sun. How many days in total?",
    options: [
        { text: "21", correct: true, feedback: "3×6 = 18; half of 6 = 3; total = 21." },
        { text: "18", correct: false, feedback: "You forgot the half sun." },
        { text: "24", correct: false, feedback: "You counted the half as a full sun (4×6)." },
        { text: "9", correct: false, feedback: "You added symbols and key incorrectly." }
      ]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "C",
    question: "Key: 1 star = 4 votes. Candidate A has 5 stars; Candidate B has 3 stars. How many more votes does Candidate A have?",
    options: [
        { text: "8", correct: true, feedback: "A = 5×4 = 20; B = 3×4 = 12; 20 − 12 = 8." },
        { text: "2", correct: false, feedback: "You only compared the stars (5−3)." },
        { text: "20", correct: false, feedback: "That's A's total." },
        { text: "12", correct: false, feedback: "That's B's total." }
      ]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "C",
    question: "A bar graph shows June: 45, July: 60. How many more in July than June?",
    options: [
        { text: "15", correct: true, feedback: "60 − 45 = 15." },
        { text: "105", correct: false, feedback: "You added the two values." },
        { text: "45", correct: false, feedback: "That's June's value." },
        { text: "60", correct: false, feedback: "That's July's value." }
      ]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "T",
    question: "A line graph shows temperature at 8 AM: 10°C, and at 12 PM: 22°C. How much did the temperature rise?",
    options: [
        { text: "12°C", correct: true, feedback: "22 − 10 = 12°C." },
        { text: "10°C", correct: false, feedback: "That's the starting temperature." },
        { text: "22°C", correct: false, feedback: "That's the later temperature." },
        { text: "32°C", correct: false, feedback: "You added instead of subtracted." }
      ]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "C",
    question: "A table shows A = 20, B = 30, C = 40. What is the total?",
    options: [
        { text: "90", correct: true, feedback: "20 + 30 + 40 = 90." },
        { text: "50", correct: false, feedback: "You only added A and B." },
        { text: "70", correct: false, feedback: "You only added B and C." },
        { text: "60", correct: false, feedback: "Incorrect addition." }
      ]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "H",
    question: "A spinner has 5 equal sections: 2 red, 2 blue, and 1 green. Landing on green is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 5 sections is green — a small chance." },
        { text: "Likely", correct: false, feedback: "It is not likely because there is only 1 green." },
        { text: "Certain", correct: false, feedback: "Other colours could come." },
        { text: "Equally likely", correct: false, feedback: "Green has fewer sections than red or blue." }
      ]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    tier: "H",
    question: "A bar graph's y‑axis is labelled 0, 20, 40, 60. A bar ends exactly halfway between 40 and 60. What is its value?",
    options: [
        { text: "50", correct: true, feedback: "(40 + 60) ÷ 2 = 50." },
        { text: "40", correct: false, feedback: "That's the lower mark." },
        { text: "60", correct: false, feedback: "That's the upper mark." },
        { text: "30", correct: false, feedback: "That's halfway between 20 and 40." }
      ]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "T",
    question: "Key: 1 apple symbol = 4 apples. The total number of apples is 14. How many full and half apple symbols are there?",
    options: [
        { text: "3 full + 1 half", correct: true, feedback: "3×4 = 12; half of 4 = 2; total = 14." },
        { text: "4 full", correct: false, feedback: "4×4 = 16, too many." },
        { text: "3 full", correct: false, feedback: "12, not 14." },
        { text: "2 full + 1 half", correct: false, feedback: "8+2=10, too few." }
      ]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "T",
    question: "A bar graph shows Monday: 80, Tuesday: 50. How many more on Monday than Tuesday?",
    options: [
        { text: "30", correct: true, feedback: "80 − 50 = 30." },
        { text: "130", correct: false, feedback: "You added the values." },
        { text: "80", correct: false, feedback: "That's Monday's value." },
        { text: "50", correct: false, feedback: "That's Tuesday's value." }
      ]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    tier: "H",
    question: "A distance‑time graph shows: at 2 PM: 10 km, at 4 PM: 30 km. What was the average speed between 2 PM and 4 PM?",
    options: [
        { text: "10 km/h", correct: true, feedback: "Distance = 20 km; time = 2 h. 20 ÷ 2 = 10 km/h." },
        { text: "20 km/h", correct: false, feedback: "You confused distance with speed." },
        { text: "30 km/h", correct: false, feedback: "That's the final distance." },
        { text: "15 km/h", correct: false, feedback: "Incorrect calculation." }
      ]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    tier: "H",
    question: "A table shows three numbers: A = 12, B = ?, C = 18. The average of the three numbers is 15. Find B.",
    options: [
        { text: "15", correct: true, feedback: "Total = 3×15 = 45. Sum of A+C = 30. B = 45 − 30 = 15." },
        { text: "12", correct: false, feedback: "That's A." },
        { text: "18", correct: false, feedback: "That's C." },
        { text: "10", correct: false, feedback: "Incorrect calculation." }
      ]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    tier: "C",
    question: "A bag contains 5 red and 3 blue marbles. You pick one marble. The chance of picking a red marble is:",
    options: [
        { text: "Likely", correct: true, feedback: "5 out of 8 is more than half, so it is likely." },
        { text: "Certain", correct: false, feedback: "Blue marbles also exist." },
        { text: "Unlikely", correct: false, feedback: "5 out of 8 is likely, not unlikely." },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal in number." }
      ]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    tier: "C",
    question: "Key: 1 leaf symbol = 10 leaves. There are 4 full leaves and 2 half leaves. How many leaves in total?",
    options: [
        { text: "50", correct: true, feedback: "4×10 = 40; 2×5 = 10; total = 50." },
        { text: "40", correct: false, feedback: "You forgot the half leaves." },
        { text: "60", correct: false, feedback: "You counted halves as full (6×10)." },
        { text: "42", correct: false, feedback: "You added 40+2." }
      ]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    tier: "H",
    question: "Pictograph 1: key = 5, has 4 stars. Pictograph 2: key = 3, has 7 stars. Which pictograph represents a larger total?",
    options: [
        { text: "Pictograph 2", correct: true, feedback: "P1 = 5×4 = 20; P2 = 3×7 = 21. P2 is larger." },
        { text: "Pictograph 1", correct: false, feedback: "20 vs 21 — P2 is larger." },
        { text: "Both are equal", correct: false, feedback: "20 ≠ 21." },
        { text: "Cannot compare", correct: false, feedback: "We can calculate both totals using their keys." }
      ]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    tier: "H",
    question: "A bar graph shows School A: 240 students, School B: 160 students. What is the ratio of School A to School B in simplest form?",
    options: [
        { text: "3 : 2", correct: true, feedback: "240:160 divide both by 80 → 3:2." },
        { text: "2 : 3", correct: false, feedback: "That's B to A, not A to B." },
        { text: "240 : 160", correct: false, feedback: "Not simplified." },
        { text: "4 : 3", correct: false, feedback: "Incorrect simplification." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 car symbol = 6 cars. There are 3 full car symbols and 1 half car symbol. How many cars in total?",
    options: [
        { text: "21", correct: true, feedback: "3×6 = 18; half of 6 = 3; total = 21." },
        { text: "18", correct: false, feedback: "Not correct — try the next one." },
        { text: "24", correct: false, feedback: "Not correct — try the next one." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows Day X: 35, Day Y: 50. How many more on Day Y?",
    options: [
        { text: "15", correct: true, feedback: "50 − 35 = 15." },
        { text: "85", correct: false, feedback: "Not correct — try the next one." },
        { text: "35", correct: false, feedback: "Not correct — try the next one." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature at 9 AM: 12°C, and at 11 AM: 20°C. How much did the temperature rise?",
    options: [
        { text: "8°C", correct: true, feedback: "20 − 12 = 8°C." },
        { text: "12°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "20°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "32°C", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows A = 10, B = 20, C = 30. What is the total?",
    options: [
        { text: "60", correct: true, feedback: "10 + 20 + 30 = 60." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "50", correct: false, feedback: "Not correct — try the next one." },
        { text: "40", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 1 red ball and 9 blue balls. You pick one ball. The chance of picking a blue ball is:",
    options: [
        { text: "Likely", correct: true, feedback: "9 out of 10 is very likely." },
        { text: "Certain", correct: false, feedback: "Not correct — try the next one." },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Impossible", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "Key: 1 fish symbol = 8 fish. The total number of fish is 20. How many full and half fish symbols are there?",
    options: [
        { text: "2 full + 1 half", correct: true, feedback: "2×8=16; half=4; total=20." },
        { text: "3 full", correct: false, feedback: "Not correct — try the next one." },
        { text: "2 full", correct: false, feedback: "Not correct — try the next one." },
        { text: "1 full + 1 half", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Key: 1 star = 4 points. Team A: 6 stars; Team B: 4 stars + 1 half star. Which team has more points?",
    options: [
        { text: "Team A", correct: true, feedback: "A = 24; B = 16+2 = 18. A has more." },
        { text: "Team B", correct: false, feedback: "Not correct — try the next one." },
        { text: "Both equal", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot compare", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows School A: 300, School B: 200. What is the ratio A to B in simplest form?",
    options: [
        { text: "3 : 2", correct: true, feedback: "300:200 ÷100 = 3:2." },
        { text: "2 : 3", correct: false, feedback: "Not correct — try the next one." },
        { text: "300 : 200", correct: false, feedback: "Not correct — try the next one." },
        { text: "5 : 3", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A distance‑time graph shows 1 PM: 5 km, 2 PM: 15 km. What was the average speed?",
    options: [
        { text: "10 km/h", correct: true, feedback: "Distance=10 km; time=1 h; speed=10 km/h." },
        { text: "5 km/h", correct: false, feedback: "Not correct — try the next one." },
        { text: "15 km/h", correct: false, feedback: "Not correct — try the next one." },
        { text: "20 km/h", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has 1 red section and 4 blue sections. Landing on red is:",
    options: [
        { text: "Unlikely", correct: true, feedback: "Only 1 out of 5 sections is red." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Certain", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equally likely", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Data Handling — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every data-handling cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "",
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

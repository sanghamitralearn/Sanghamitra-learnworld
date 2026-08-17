// seed/mathSeedCh8DataHandlingL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 8
// (Data Handling), Level 1 — converted from the standalone HTML file
// ch-8-data-handling-level-1.html.
//
// Run with: node seed/mathSeedCh8DataHandlingL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-8-data-handling";
const CHAPTER_NAME = "Data Handling";
const LEVEL = 1;

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
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A pictograph uses a key: 1 symbol = 4 books. What does one symbol represent?",
    options: [
        { text: "4 books", correct: true, feedback: "The key tells you the value of one symbol." },
        { text: "1 book", correct: false, feedback: "The key says 1 symbol = 4 books." },
        { text: "2 books", correct: false, feedback: "Check the key carefully." },
        { text: "8 books", correct: false, feedback: "Don't multiply yet — just read the key value." }
      ],
    retryHint: "Look at the key: it tells you the number that one symbol stands for."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "In the same pictograph, there are 6 symbols for Tuesday. How many books were there on Tuesday?",
    options: [
        { text: "24", correct: true, feedback: "6 × 4 = 24 books." },
        { text: "6", correct: false, feedback: "You forgot to multiply by the key value." },
        { text: "4", correct: false, feedback: "That's just the key value." },
        { text: "10", correct: false, feedback: "Don't add — multiply." }
      ],
    retryHint: "Count the symbols and multiply by the value of one symbol (the key)."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows ice cream sales: Vanilla 30, Chocolate 45, Strawberry 25. Which flavour sold the most?",
    options: [
        { text: "Chocolate", correct: true, feedback: "The tallest bar represents the largest number." },
        { text: "Vanilla", correct: false, feedback: "Vanilla is 30, less than Chocolate." },
        { text: "Strawberry", correct: false, feedback: "Strawberry is the smallest." },
        { text: "All equal", correct: false, feedback: "The numbers are different." }
      ],
    retryHint: "Look for the highest bar."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows a plant's height over weeks. At week 4, the point is at 12 cm. What is the height at week 4?",
    options: [
        { text: "12 cm", correct: true, feedback: "Read the value on the vertical axis at week 4." },
        { text: "4 cm", correct: false, feedback: "That's the week number." },
        { text: "10 cm", correct: false, feedback: "Check the graph again." },
        { text: "16 cm", correct: false, feedback: "That's too high." }
      ],
    retryHint: "Find week 4 on the horizontal axis, go up to the point, and read across to the vertical axis."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows the number of absent students: Monday 5, Tuesday 3, Wednesday 7. How many were absent on Wednesday?",
    options: [
        { text: "7", correct: true, feedback: "The table shows 7 for Wednesday." },
        { text: "5", correct: false, feedback: "That's Monday." },
        { text: "3", correct: false, feedback: "That's Tuesday." },
        { text: "15", correct: false, feedback: "That's the total — not what is asked." }
      ],
    retryHint: "Find the row for Wednesday and read the number."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "If you toss a fair coin, it can land on heads or tails. The chance of getting heads is best described as:",
    options: [
        { text: "Equally likely", correct: true, feedback: "There are two outcomes, both equally likely." },
        { text: "Certain", correct: false, feedback: "It is not certain — you could get tails." },
        { text: "Unlikely", correct: false, feedback: "It is not unlikely; it happens half the time." },
        { text: "Impossible", correct: false, feedback: "It is possible to get heads." }
      ],
    retryHint: "With two equal choices, each outcome has the same chance."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "On a bar graph, the y‑axis is marked 0, 10, 20, 30. What is the interval between two consecutive marks?",
    options: [
        { text: "10", correct: true, feedback: "20 − 10 = 10; 10 − 0 = 10." },
        { text: "5", correct: false, feedback: "Count the difference carefully." },
        { text: "20", correct: false, feedback: "That's the gap from 0 to 20, not consecutive." },
        { text: "30", correct: false, feedback: "That's the largest number, not the interval." }
      ],
    retryHint: "Subtract one mark value from the next mark value."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "A symbol of a car stands for 3 cars. How many cars does a half symbol represent?",
    options: [
        { text: "1.5", correct: true, feedback: "Half of 3 is 1.5." },
        { text: "3", correct: false, feedback: "That's a full symbol." },
        { text: "1", correct: false, feedback: "Incorrect — half of 3 is 1.5, not 1." },
        { text: "6", correct: false, feedback: "You doubled instead of halved." }
      ],
    retryHint: "A half symbol means half the value of a full symbol."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "In a pictograph, each sun symbol stands for 5 sunny days. March has 7 sun symbols. How many sunny days were there in March?",
    options: [
        { text: "35", correct: true, feedback: "7 × 5 = 35 sunny days." },
        { text: "7", correct: false, feedback: "You forgot to multiply by the key value." },
        { text: "5", correct: false, feedback: "That's just the key value." },
        { text: "12", correct: false, feedback: "You added instead of multiplying." }
      ],
    backward: "Count the symbols and multiply by the value given in the key.",
    forward: "Pictographs are a fun way to represent data with pictures."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows fruit sold: Apples 20, Bananas 35, Oranges 15. How many bananas were sold?",
    options: [
        { text: "35", correct: true, feedback: "The bar for bananas reaches 35 on the scale." },
        { text: "20", correct: false, feedback: "That's the number for apples." },
        { text: "15", correct: false, feedback: "That's oranges." },
        { text: "70", correct: false, feedback: "You added the numbers." }
      ],
    backward: "Read the height of the bar for bananas on the y‑axis scale.",
    forward: "Bar graphs are used to compare data at a glance."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows the temperature at different times: 9 AM: 22°C, 10 AM: 24°C, 11 AM: 26°C. What was the temperature at 10 AM?",
    options: [
        { text: "24°C", correct: true, feedback: "The point at 10 AM is at 24 on the scale." },
        { text: "22°C", correct: false, feedback: "That's 9 AM." },
        { text: "26°C", correct: false, feedback: "That's 11 AM." },
        { text: "28°C", correct: false, feedback: "Too high." }
      ],
    backward: "Locate the time on the horizontal axis, go up to the line, and read the value on the vertical axis.",
    forward: "Line graphs are useful for showing trends over time."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "The table shows students' marks: Ravi 78, Sita 85, John 72. What is John's mark?",
    options: [
        { text: "72", correct: true, feedback: "The row for John shows 72." },
        { text: "78", correct: false, feedback: "That's Ravi's mark." },
        { text: "85", correct: false, feedback: "That's Sita's mark." },
        { text: "80", correct: false, feedback: "Not in the table." }
      ],
    backward: "Find the row for John and read the number in that row.",
    forward: "Tables organise data neatly into rows and columns."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 8 red balls and 2 blue balls. Without looking, you pick one ball. Which word best describes picking a red ball?",
    options: [
        { text: "Likely", correct: true, feedback: "There are many red balls, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There are also blue balls, so it is not 100% sure." },
        { text: "Unlikely", correct: false, feedback: "With 8 red and 2 blue, red is likely, not unlikely." },
        { text: "Impossible", correct: false, feedback: "There are red balls, so it is possible." }
      ],
    backward: "If there are more of one colour, picking that colour is likely.",
    forward: "Probability words help describe the chance of everyday events."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph has its y‑axis marked: 0, 5, 10, 15. What is the interval between two consecutive marks?",
    options: [
        { text: "5", correct: true, feedback: "10 − 5 = 5; 5 − 0 = 5." },
        { text: "1", correct: false, feedback: "The marks jump by 5 each time, not 1." },
        { text: "10", correct: false, feedback: "That's the gap from 0 to 10, not between consecutive marks." },
        { text: "15", correct: false, feedback: "That's the top mark, not the interval." }
      ],
    backward: "Subtract the value of one mark from the value of the next mark.",
    forward: "Understanding the scale helps you read the values of the bars correctly."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "A pictograph shows trees planted. Each tree symbol represents 10 trees. A park has 4 full symbols and one half symbol. How many trees were planted?",
    options: [
        { text: "45", correct: true, feedback: "4 × 10 = 40; half = 5; total = 45." },
        { text: "40", correct: false, feedback: "You forgot the half symbol." },
        { text: "50", correct: false, feedback: "You counted the half as a full symbol." },
        { text: "4.5", correct: false, feedback: "You forgot to multiply by the key value." }
      ],
    backward: "Multiply full symbols by the key value, and add half of the key value for half symbols.",
    forward: "Pictographs with half symbols represent fractions of the data."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "In a bar graph, the bar for Class 3 reaches 25, and the bar for Class 4 reaches 30. Which class has the higher value?",
    options: [
        { text: "Class 4", correct: true, feedback: "30 is greater than 25." },
        { text: "Class 3", correct: false, feedback: "25 is less than 30." },
        { text: "Both are equal", correct: false, feedback: "25 and 30 are different." },
        { text: "Cannot tell", correct: false, feedback: "The bars clearly show different heights." }
      ],
    backward: "Compare the numbers shown by the two bars.",
    forward: "Quick comparisons are the main purpose of bar graphs."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows the number of visitors to a zoo. On Saturday, the point is at 500. How many visitors were there on Saturday?",
    options: [
        { text: "500", correct: true, feedback: "Read the value at the Saturday point." },
        { text: "400", correct: false, feedback: "Not the correct reading." },
        { text: "600", correct: false, feedback: "Too high." },
        { text: "Saturday is not on the graph", correct: false, feedback: "Saturday is marked on the horizontal axis." }
      ],
    backward: "Locate Saturday, find the point, and read its value on the vertical axis.",
    forward: "Line graphs are often used to show daily changes."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A frequency table shows favourite colours: Red 12, Blue 8, Green 5. How many students chose Blue?",
    options: [
        { text: "8", correct: true, feedback: "The table shows 8 for Blue." },
        { text: "12", correct: false, feedback: "That's Red." },
        { text: "5", correct: false, feedback: "That's Green." },
        { text: "25", correct: false, feedback: "That's the total of all three." }
      ],
    backward: "Find the row for Blue and read the frequency.",
    forward: "Tables summarise data clearly."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains 10 blue balls and no other colours. You pick one ball. The chance of picking a red ball is:",
    options: [
        { text: "Impossible", correct: true, feedback: "There are no red balls, so it cannot happen." },
        { text: "Certain", correct: false, feedback: "You cannot pick a red ball if there are none." },
        { text: "Likely", correct: false, feedback: "It is not likely — it is impossible." },
        { text: "Unlikely", correct: false, feedback: "It is impossible, not just unlikely." }
      ],
    backward: "If there are zero of a kind, picking that kind is impossible.",
    forward: "Understanding impossible events is important in probability."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A pictograph key shows: one star = 5 points. What does one star represent?",
    options: [
        { text: "5 points", correct: true, feedback: "The key tells you exactly that." },
        { text: "1 point", correct: false, feedback: "The key says 5, not 1." },
        { text: "10 points", correct: false, feedback: "You doubled the key value." },
        { text: "0 points", correct: false, feedback: "Incorrect." }
      ],
    backward: "Read the information in the key directly.",
    forward: "Always check the key before reading a pictograph."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Each car symbol in a pictograph stands for 4 cars. A showroom sold 3 car symbols on Monday. How many cars were sold?",
    options: [
        { text: "12", correct: true, feedback: "3 × 4 = 12 cars." },
        { text: "7", correct: false, feedback: "You added 3 + 4." },
        { text: "3", correct: false, feedback: "You forgot to multiply." },
        { text: "16", correct: false, feedback: "You multiplied 4 × 4." }
      ],
    backward: "Multiply the number of symbols by the value each symbol represents.",
    forward: "Pictographs make data visual and easy to compare."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows the number of books read: Ram 6, Shyam 9, Jadu 4. Who read the fewest books?",
    options: [
        { text: "Jadu", correct: true, feedback: "Jadu has the shortest bar (4 books)." },
        { text: "Ram", correct: false, feedback: "Ram read 6, more than Jadu." },
        { text: "Shyam", correct: false, feedback: "Shyam read the most." },
        { text: "All equal", correct: false, feedback: "The numbers are different." }
      ],
    backward: "The shortest bar corresponds to the smallest number.",
    forward: "Bar graphs make it easy to see the smallest and largest values at a glance."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows the temperature falling from 30°C at noon to 20°C at 6 PM. What was the temperature at 6 PM?",
    options: [
        { text: "20°C", correct: true, feedback: "The point at 6 PM is at 20°C." },
        { text: "30°C", correct: false, feedback: "That's noon." },
        { text: "25°C", correct: false, feedback: "Not the correct reading." },
        { text: "10°C", correct: false, feedback: "Too low." }
      ],
    backward: "Read the value at the specific time you are asked about.",
    forward: "Line graphs show how a value changes over time."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "The table shows the number of students who like each sport: Cricket 15, Football 10, Tennis 5. How many like Cricket?",
    options: [
        { text: "15", correct: true, feedback: "The table shows 15 for Cricket." },
        { text: "10", correct: false, feedback: "That's Football." },
        { text: "5", correct: false, feedback: "That's Tennis." },
        { text: "30", correct: false, feedback: "That's the total." }
      ],
    backward: "Read the number directly from the row for Cricket.",
    forward: "Tables are the simplest way to record data."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "Which word best describes the chance that the sun will set today?",
    options: [
        { text: "Certain", correct: true, feedback: "The sun sets every day — it is certain." },
        { text: "Likely", correct: false, feedback: "It is more than likely — it's a sure event." },
        { text: "Unlikely", correct: false, feedback: "It always happens." },
        { text: "Impossible", correct: false, feedback: "It definitely happens." }
      ],
    backward: "Events that happen every day are certain.",
    forward: "Certain and impossible are the two extremes of probability."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "On a line graph, the vertical axis shows numbers from 0 to 100, with marks every 20 units. What is the value between two consecutive marks?",
    options: [
        { text: "20", correct: true, feedback: "The marks go 0, 20, 40, … so the interval is 20." },
        { text: "10", correct: false, feedback: "Half the interval, but not the mark spacing." },
        { text: "5", correct: false, feedback: "Too small." },
        { text: "100", correct: false, feedback: "That's the total range." }
      ],
    backward: "Look at the difference between two labelled marks next to each other.",
    forward: "Large‑scale graphs often use intervals like 20 to fit all data."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Each smiley symbol represents 2 students. A club has 5 full smileys and one half smiley. How many students in the club?",
    options: [
        { text: "11", correct: true, feedback: "5 × 2 = 10; half of 2 = 1; total 11." },
        { text: "10", correct: false, feedback: "You forgot the half symbol." },
        { text: "12", correct: false, feedback: "You counted the half as a full symbol." },
        { text: "5.5", correct: false, feedback: "You forgot to multiply by the key." }
      ],
    backward: "Full symbols times the key value; half symbol adds half the key value.",
    forward: "Pictographs can show exact numbers with full and half symbols."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "In a bar graph, the bar for Monday reaches 40, and the bar for Tuesday reaches 35. Which day had more?",
    options: [
        { text: "Monday", correct: true, feedback: "40 > 35, so Monday is higher." },
        { text: "Tuesday", correct: false, feedback: "35 is less than 40." },
        { text: "Both are equal", correct: false, feedback: "40 and 35 are different." },
        { text: "Cannot say", correct: false, feedback: "The bars clearly show the values." }
      ],
    backward: "Compare the numbers on the y‑axis for the two bars.",
    forward: "Comparing values is the main reason we draw bar graphs."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows a flat line at 25°C from 2 PM to 4 PM. What was the temperature at 3 PM?",
    options: [
        { text: "25°C", correct: true, feedback: "Since the line is flat, the temperature stayed the same." },
        { text: "30°C", correct: false, feedback: "The line didn't go up." },
        { text: "20°C", correct: false, feedback: "The line didn't go down." },
        { text: "Cannot say", correct: false, feedback: "A flat line means constant value." }
      ],
    backward: "A flat horizontal line means the value is not changing.",
    forward: "Line graphs can show steady, increasing, or decreasing trends."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A tally chart shows the number of absent students: Monday: 5, Tuesday: 7, Wednesday: 4. How many were absent on Tuesday?",
    options: [
        { text: "7", correct: true, feedback: "Tuesday's count is 7." },
        { text: "5", correct: false, feedback: "That's Monday." },
        { text: "4", correct: false, feedback: "That's Wednesday." },
        { text: "16", correct: false, feedback: "That's the total." }
      ],
    backward: "Find the row for Tuesday and read the number.",
    forward: "Tally charts are a quick way to record data as it is collected."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner is divided into 4 equal parts — 3 red and 1 blue. Spinning the spinner and landing on red is:",
    options: [
        { text: "Likely", correct: true, feedback: "There are more red sections, so it is likely, but not certain." },
        { text: "Certain", correct: false, feedback: "There is still a blue section." },
        { text: "Equally likely", correct: false, feedback: "Red and blue are not equal." },
        { text: "Impossible", correct: false, feedback: "There are red sections." }
      ],
    backward: "More of one colour means that colour is likely.",
    forward: "Spinners are used in games and probability experiments."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "The axis of a bar graph is labelled: 0, 100, 200, 300. What is the step size between consecutive marks?",
    options: [
        { text: "100", correct: true, feedback: "100 − 0 = 100; 200 − 100 = 100." },
        { text: "50", correct: false, feedback: "Half of 100, but the marks jump by 100." },
        { text: "200", correct: false, feedback: "That's two steps." },
        { text: "300", correct: false, feedback: "That's the top value." }
      ],
    backward: "Find the difference between any two neighbouring numbers on the axis.",
    forward: "Large numbers often use a step size of 100 to keep the graph readable."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "A pictograph shows fish caught. Each fish symbol = 3 fish. There are 4 fish symbols. How many fish were caught?",
    options: [
        { text: "12", correct: true, feedback: "4 × 3 = 12 fish." },
        { text: "7", correct: false, feedback: "You added instead of multiplied." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "9", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows pets: Dogs 8, Cats 5, Birds 3. How many cats are there?",
    options: [
        { text: "5", correct: true, feedback: "The bar for cats is at 5." },
        { text: "8", correct: false, feedback: "Not correct — try the next one." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." },
        { text: "16", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows rainfall. In July, the point is at 120 mm. What is the rainfall in July?",
    options: [
        { text: "120 mm", correct: true, feedback: "Read the value from the graph." },
        { text: "100 mm", correct: false, feedback: "Not correct — try the next one." },
        { text: "140 mm", correct: false, feedback: "Not correct — try the next one." },
        { text: "July", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "The table shows favourite fruits: Apple 20, Banana 15, Mango 25. Which fruit has the highest count?",
    options: [
        { text: "Mango", correct: true, feedback: "25 is the largest number." },
        { text: "Apple", correct: false, feedback: "Not correct — try the next one." },
        { text: "Banana", correct: false, feedback: "Not correct — try the next one." },
        { text: "All equal", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A bag contains only red balls. Picking a red ball is:",
    options: [
        { text: "Certain", correct: true, feedback: "All balls are red, so it will definitely happen." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Impossible", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A pictograph key shows one star = 5 points. What does one star represent?",
    options: [
        { text: "5 points", correct: true, feedback: "The key tells you directly." },
        { text: "1 point", correct: false, feedback: "Not correct — try the next one." },
        { text: "10 points", correct: false, feedback: "Not correct — try the next one." },
        { text: "0 points", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "PICTO",
    clusterName: CLUSTER_NAMES.PICTO,
    question: "Each circle symbol = 10 students. There are 2 full circles and one half circle. How many students?",
    options: [
        { text: "25", correct: true, feedback: "2 × 10 = 20; half is 5; total 25." },
        { text: "20", correct: false, feedback: "Not correct — try the next one." },
        { text: "30", correct: false, feedback: "Not correct — try the next one." },
        { text: "2.5", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "BAR",
    clusterName: CLUSTER_NAMES.BAR,
    question: "A bar graph shows sales: Monday ₹200, Tuesday ₹300. Which day had higher sales?",
    options: [
        { text: "Tuesday", correct: true, feedback: "300 > 200." },
        { text: "Monday", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equal", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "LINE",
    clusterName: CLUSTER_NAMES.LINE,
    question: "A line graph shows temperature at 8 AM as 15°C. What is the temperature at 8 AM?",
    options: [
        { text: "15°C", correct: true, feedback: "Read from the graph." },
        { text: "10°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "20°C", correct: false, feedback: "Not correct — try the next one." },
        { text: "8°C", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "TABLE",
    clusterName: CLUSTER_NAMES.TABLE,
    question: "A table shows marks: A 80, B 90, C 70. What is B's mark?",
    options: [
        { text: "90", correct: true, feedback: "The row for B shows 90." },
        { text: "80", correct: false, feedback: "Not correct — try the next one." },
        { text: "70", correct: false, feedback: "Not correct — try the next one." },
        { text: "240", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "VOCAB",
    clusterName: CLUSTER_NAMES.VOCAB,
    question: "A spinner has all 4 sections coloured red. Landing on red is:",
    options: [
        { text: "Certain", correct: true, feedback: "Every section is red." },
        { text: "Likely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Unlikely", correct: false, feedback: "Not correct — try the next one." },
        { text: "Impossible", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "SCALE",
    clusterName: CLUSTER_NAMES.SCALE,
    question: "A bar graph's y‑axis is labelled: 0, 2, 4, 6. What is the interval between marks?",
    options: [
        { text: "2", correct: true, feedback: "2 − 0 = 2; 4 − 2 = 2." },
        { text: "1", correct: false, feedback: "Not correct — try the next one." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Data Handling — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Single-step reading of pictographs, bar graphs, line graphs, tables, probability vocabulary, and scale keys.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review</strong><br>\n        • Pictographs: Check the key to see what one symbol stands for. Half symbols represent half the value.<br>\n        • Bar graphs: The height of each bar shows the quantity. Read the scale on the y‑axis.<br>\n        • Line graphs: The points show values; read the value at any point by looking across to the axis.<br>\n        • Tables & tally charts: Find the correct row or column and read the number.<br>\n        • Probability vocabulary: Certain (will definitely happen), likely, equally likely, unlikely, impossible (cannot happen).<br>\n        • Reading scales: Look at the labels on the axis or the key to see what each unit or symbol represents.",
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

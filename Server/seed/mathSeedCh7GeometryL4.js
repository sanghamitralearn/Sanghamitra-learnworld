// seed/mathSeedCh7GeometryL4.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 7
// (Geometry), Level 4 — converted from the standalone HTML file
// ch-7-geometry-level-4.html.
//
// This is the 25-minute timed diagnostic level; diagnostic items carry a
// difficulty tier (S = Speed, C = Core, H = Hard, T = Trap).
//
// Run with: node seed/mathSeedCh7GeometryL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-7-geometry";
const CHAPTER_NAME = "Geometry";
const LEVEL = 4;

const CLUSTER_NAMES = {
  LINES: "Lines & Angles",
  TRI: "Triangles",
  CIRC: "Circles",
  SYM: "Symmetry",
  SHAPE: "2D & 3D Shapes",
  COORD: "Coordinates"
};

const warmupItems = [
  {
    itemId: "w1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "What type of angle is 150°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "150° is between 90° and 180°, so it is an obtuse angle." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°." },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°." },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°." }
      ]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has all three sides equal to 8 cm. What type of triangle is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All sides equal → equilateral." },
        { text: "Isosceles", correct: false, feedback: "Isosceles has exactly two equal sides." },
        { text: "Scalene", correct: false, feedback: "Scalene has no equal sides." },
        { text: "Right", correct: false, feedback: "We don't know the angles." }
      ]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "The diameter of a circle is 10 cm. What is its radius?",
    options: [
        { text: "5 cm", correct: true, feedback: "Radius = diameter ÷ 2 = 5 cm." },
        { text: "10 cm", correct: false, feedback: "That's the diameter." },
        { text: "20 cm", correct: false, feedback: "You multiplied by 2 instead of dividing." },
        { text: "2 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a square have?",
    options: [
        { text: "4", correct: true, feedback: "A square has 4 lines of symmetry (two diagonals, one vertical, one horizontal)." },
        { text: "2", correct: false, feedback: "That's for a rectangle (non‑square)." },
        { text: "1", correct: false, feedback: "Too few." },
        { text: "8", correct: false, feedback: "Too many." }
      ]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many faces does a cube have?",
    options: [
        { text: "6", correct: true, feedback: "A cube has 6 square faces." },
        { text: "4", correct: false, feedback: "Too few." },
        { text: "8", correct: false, feedback: "8 is the number of vertices." },
        { text: "12", correct: false, feedback: "12 is the number of edges." }
      ]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is at (0,7). On which axis does it lie?",
    options: [
        { text: "y‑axis", correct: true, feedback: "x=0 means the point is on the y‑axis." },
        { text: "x‑axis", correct: false, feedback: "y=0 would be on the x‑axis." },
        { text: "At the origin", correct: false, feedback: "Origin is (0,0)." },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not in any quadrant." }
      ]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two angles are complementary. One angle is 35°. Find the other.",
    options: [
        { text: "55°", correct: true, feedback: "Complementary angles sum to 90°. 90 − 35 = 55°." },
        { text: "145°", correct: false, feedback: "That would be supplementary (180−35)." },
        { text: "35°", correct: false, feedback: "That's the given angle." },
        { text: "65°", correct: false, feedback: "Incorrect subtraction." }
      ]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle with one angle of exactly 90° is called a ______.",
    options: [
        { text: "Right‑angled triangle", correct: true, feedback: "A 90° angle is a right angle." },
        { text: "Acute‑angled triangle", correct: false, feedback: "All angles < 90°." },
        { text: "Obtuse‑angled triangle", correct: false, feedback: "One angle > 90°." },
        { text: "Equilateral triangle", correct: false, feedback: "All angles 60°." }
      ]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "S",
    question: "What type of angle is 45°?",
    options: [
        { text: "Acute", correct: true, feedback: "An acute angle is less than 90°." },
        { text: "Obtuse", correct: false, feedback: "Obtuse is between 90° and 180°." },
        { text: "Right", correct: false, feedback: "Right is exactly 90°." },
        { text: "Straight", correct: false, feedback: "Straight is exactly 180°." }
      ]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "S",
    question: "A triangle has sides 5 cm, 5 cm, and 8 cm. What type of triangle is it by sides?",
    options: [
        { text: "Isosceles", correct: true, feedback: "Two sides are equal (5 and 5)." },
        { text: "Equilateral", correct: false, feedback: "All three would need to be equal." },
        { text: "Scalene", correct: false, feedback: "No sides equal." },
        { text: "Right", correct: false, feedback: "We cannot tell angles from side lengths alone." }
      ]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "S",
    question: "A circle has a radius of 12 cm. What is its diameter?",
    options: [
        { text: "24 cm", correct: true, feedback: "Diameter = 2 × radius = 24 cm." },
        { text: "12 cm", correct: false, feedback: "That's the radius." },
        { text: "6 cm", correct: false, feedback: "That's half the radius." },
        { text: "36 cm", correct: false, feedback: "You multiplied by 3." }
      ]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "S",
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular pentagon has 5 sides, so 5 lines of symmetry." },
        { text: "4", correct: false, feedback: "That's for a square." },
        { text: "6", correct: false, feedback: "That's for a regular hexagon." },
        { text: "3", correct: false, feedback: "That's for an equilateral triangle." }
      ]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    tier: "T",
    question: "Which net can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This classic T‑shaped net of 6 squares folds into a cube." },
        { text: "6 squares in a straight line", correct: false, feedback: "Cannot close into a cube without overlapping." },
        { text: "5 squares in a T shape", correct: false, feedback: "Only 5 faces; a cube needs 6." },
        { text: "4 squares in a large square", correct: false, feedback: "Only 4 faces." }
      ]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    tier: "T",
    question: "A point is at (3,0). On which axis does it lie?",
    options: [
        { text: "x‑axis", correct: true, feedback: "y=0 means the point lies on the x‑axis." },
        { text: "y‑axis", correct: false, feedback: "x=0 would be on the y‑axis." },
        { text: "At the origin", correct: false, feedback: "Origin is (0,0)." },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not inside any quadrant." }
      ]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "C",
    question: "Two complementary angles differ by 10°. Find the larger angle.",
    options: [
        { text: "50°", correct: true, feedback: "x + (x+10) = 90 → 2x = 80 → x=40; larger = 50°." },
        { text: "40°", correct: false, feedback: "That's the smaller angle." },
        { text: "45°", correct: false, feedback: "That would be equal." },
        { text: "60°", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "C",
    question: "The angles of a triangle are in the ratio 2:3:4. Find the largest angle.",
    options: [
        { text: "80°", correct: true, feedback: "Total parts = 9. One part = 180÷9 = 20°. Largest = 4×20 = 80°." },
        { text: "60°", correct: false, feedback: "That's 3 parts." },
        { text: "40°", correct: false, feedback: "That's 2 parts." },
        { text: "100°", correct: false, feedback: "Incorrect sum." }
      ]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "T",
    question: "A circle has radius 5 cm. A point is 4.5 cm from the centre. Is the point inside or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "4.5 cm < 5 cm → the point is inside the circle." },
        { text: "Outside", correct: false, feedback: "The distance is less than the radius, so it's inside." },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 5 cm." },
        { text: "Cannot say", correct: false, feedback: "We can compare the distance to the radius." }
      ]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "C",
    question: "A rectangle 8 cm by 6 cm is folded in half along its vertical line of symmetry. Find the perimeter of the folded shape.",
    options: [
        { text: "22 cm", correct: true, feedback: "Folded dimensions: 8 cm by 3 cm. Perimeter = 2(8+3) = 22 cm." },
        { text: "20 cm", correct: false, feedback: "That's if folded horizontally (4 cm by 6 cm)." },
        { text: "24 cm", correct: false, feedback: "Incorrect." },
        { text: "28 cm", correct: false, feedback: "That's the original perimeter." }
      ]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    tier: "H",
    question: "A cuboid measures 5 cm × 4 cm × 3 cm. What is the total length of all its edges?",
    options: [
        { text: "48 cm", correct: true, feedback: "4 × (5+4+3) = 4 × 12 = 48 cm." },
        { text: "60 cm", correct: false, feedback: "That's the volume (5×4×3)." },
        { text: "12 cm", correct: false, feedback: "That's just the sum of dimensions." },
        { text: "24 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    tier: "H",
    question: "Reflect the point (2,3) over the vertical line x=5. What are the new coordinates?",
    options: [
        { text: "(8,3)", correct: true, feedback: "x′ = 2×5 − 2 = 8; y unchanged → (8,3)." },
        { text: "(2,3)", correct: false, feedback: "Unchanged." },
        { text: "(2,7)", correct: false, feedback: "You reflected over y=5." },
        { text: "(−2,3)", correct: false, feedback: "That's reflection over x=0." }
      ]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "T",
    question: "Two angles are supplementary. One angle is 70°. Find the other angle.",
    options: [
        { text: "110°", correct: true, feedback: "Supplementary angles sum to 180°. 180 − 70 = 110°." },
        { text: "20°", correct: false, feedback: "That's complementary (90−70)." },
        { text: "70°", correct: false, feedback: "That's the given angle." },
        { text: "290°", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "T",
    question: "An isosceles triangle has perimeter 28 cm. Each of the equal sides is 10 cm. Find the length of the unequal side.",
    options: [
        { text: "8 cm", correct: true, feedback: "28 − 2×10 = 28 − 20 = 8 cm." },
        { text: "10 cm", correct: false, feedback: "That's one of the equal sides." },
        { text: "18 cm", correct: false, feedback: "28 − 10 = 18 (forgot the other equal side)." },
        { text: "14 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "H",
    question: "A circle has its centre at (5,12) and passes through the origin (0,0). What is its radius?",
    options: [
        { text: "13", correct: true, feedback: "Distance = √(5²+12²) = √(25+144) = √169 = 13." },
        { text: "5", correct: false, feedback: "That's just the x‑coordinate." },
        { text: "12", correct: false, feedback: "That's just the y‑coordinate." },
        { text: "17", correct: false, feedback: "You added 5+12." }
      ]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "H",
    question: "Reflect the point (4,1) over the line y = x. What are the new coordinates?",
    options: [
        { text: "(1,4)", correct: true, feedback: "Reflection over y=x swaps the x and y coordinates." },
        { text: "(4,1)", correct: false, feedback: "Unchanged." },
        { text: "(4,−1)", correct: false, feedback: "That's reflection over the x‑axis." },
        { text: "(−4,1)", correct: false, feedback: "Reflection over the y‑axis." }
      ]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    tier: "C",
    question: "A cube has volume 216 cm³. What is the length of one edge?",
    options: [
        { text: "6 cm", correct: true, feedback: "∛216 = 6, because 6 × 6 × 6 = 216." },
        { text: "36 cm", correct: false, feedback: "You divided 216 by 6." },
        { text: "12 cm", correct: false, feedback: "Incorrect." },
        { text: "72 cm", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    tier: "C",
    question: "Start at (1,1). Move 2 units right and 3 units up, then 1 unit left and 2 units down. What are the final coordinates?",
    options: [
        { text: "(2,2)", correct: true, feedback: "1+2−1 = 2 for x; 1+3−2 = 2 for y → (2,2)." },
        { text: "(3,5)", correct: false, feedback: "You only did the first move." },
        { text: "(0,2)", correct: false, feedback: "Incorrect." },
        { text: "(4,4)", correct: false, feedback: "Incorrect." }
      ]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "H",
    question: "The angles of a triangle are x°, 2x°, and 3x°. Find the largest angle.",
    options: [
        { text: "90°", correct: true, feedback: "x+2x+3x = 6x = 180 → x=30. Largest = 3x = 90°." },
        { text: "60°", correct: false, feedback: "That's 2x." },
        { text: "30°", correct: false, feedback: "That's x." },
        { text: "120°", correct: false, feedback: "Incorrect sum." }
      ]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "H",
    question: "An isosceles right triangle has one angle of 90°. Find the measure of each of the other two equal angles.",
    options: [
        { text: "45°", correct: true, feedback: "180 − 90 = 90°. Divide by 2 → 45° each." },
        { text: "60°", correct: false, feedback: "That would be equilateral, not right." },
        { text: "30°", correct: false, feedback: "Incorrect." },
        { text: "90°", correct: false, feedback: "A triangle cannot have two 90° angles." }
      ]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "What type of angle is 100°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "Between 90° and 180° → obtuse." },
        { text: "Acute", correct: false, feedback: "Not correct — try the next one." },
        { text: "Right", correct: false, feedback: "Not correct — try the next one." },
        { text: "Straight", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has sides 6 cm, 6 cm, 6 cm. What type is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All sides equal." },
        { text: "Isosceles", correct: false, feedback: "Not correct — try the next one." },
        { text: "Scalene", correct: false, feedback: "Not correct — try the next one." },
        { text: "Right", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "Diameter = 18 cm. Radius = ?",
    options: [
        { text: "9 cm", correct: true, feedback: "Radius is half the diameter." },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "36 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "6 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does an equilateral triangle have?",
    options: [
        { text: "3", correct: true, feedback: "One from each vertex to the midpoint of the opposite side." },
        { text: "1", correct: false, feedback: "Not correct — try the next one." },
        { text: "2", correct: false, feedback: "Not correct — try the next one." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many vertices does a cube have?",
    options: [
        { text: "8", correct: true, feedback: "A cube has 8 corners." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "12", correct: false, feedback: "Not correct — try the next one." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is at (5,0). On which axis does it lie?",
    options: [
        { text: "x‑axis", correct: true, feedback: "y=0 → on x‑axis." },
        { text: "y‑axis", correct: false, feedback: "Not correct — try the next one." },
        { text: "At the origin", correct: false, feedback: "Not correct — try the next one." },
        { text: "In the first quadrant", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two supplementary angles: one is 85°. Find the other.",
    options: [
        { text: "95°", correct: true, feedback: "180 − 85 = 95°." },
        { text: "5°", correct: false, feedback: "Not correct — try the next one." },
        { text: "85°", correct: false, feedback: "Not correct — try the next one." },
        { text: "105°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A right triangle has one angle of 90° and another of 30°. Find the third angle.",
    options: [
        { text: "60°", correct: true, feedback: "180 − 90 − 30 = 60°." },
        { text: "90°", correct: false, feedback: "Not correct — try the next one." },
        { text: "30°", correct: false, feedback: "Not correct — try the next one." },
        { text: "120°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "Radius = 7 cm. A point is 6 cm from the centre. Inside or outside?",
    options: [
        { text: "Inside", correct: true, feedback: "6 < 7 → inside." },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one." },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cuboid has total edge length 40 cm. Its length=6 cm, width=3 cm. Find height.",
    options: [
        { text: "1 cm", correct: true, feedback: "4(6+3+h)=40 → 9+h=10 → h=1 cm." },
        { text: "2 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "3 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "4 cm", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Geometry — Speed & Strategy",
    subtitle: "Telangana & Cambridge · Level 4 · Speed & Strategy",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every geometry cluster.",
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

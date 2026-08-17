// seed/mathSeedCh7GeometryL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 7
// (Geometry), Level 2 — converted from the standalone HTML file
// ch-7-geometry-level-2.html.
//
// Run with: node seed/mathSeedCh7GeometryL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-7-geometry";
const CHAPTER_NAME = "Geometry";
const LEVEL = 2;

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
    question: "Two angles lie on a straight line. One angle is 65°. Find the other angle.",
    options: [
        { text: "115°", correct: true, feedback: "Angles on a straight line sum to 180°. 180° − 65° = 115°." },
        { text: "25°", correct: false, feedback: "You subtracted from 90° (complementary), not 180° (supplementary)." },
        { text: "65°", correct: false, feedback: "That's the given angle, not the other one." },
        { text: "180°", correct: false, feedback: "That's the total sum, not the unknown angle." }
      ],
    retryHint: "Angles on a straight line add up to 180°. Subtract the known angle from 180°."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has angles 50° and 60°. Find the third angle.",
    options: [
        { text: "70°", correct: true, feedback: "180° − 50° − 60° = 70°." },
        { text: "110°", correct: false, feedback: "You added 50 + 60 instead of subtracting from 180." },
        { text: "80°", correct: false, feedback: "Incorrect calculation." },
        { text: "130°", correct: false, feedback: "180 − 50 = 130, but you forgot to subtract 60 as well." }
      ],
    retryHint: "The sum of angles in a triangle is 180°. Add the two known angles and subtract from 180°."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "The diameter of a circle is 16 cm. Find its radius.",
    options: [
        { text: "8 cm", correct: true, feedback: "Radius = diameter ÷ 2 = 8 cm." },
        { text: "32 cm", correct: false, feedback: "You multiplied by 2 instead of dividing." },
        { text: "4 cm", correct: false, feedback: "You divided by 4." },
        { text: "16 cm", correct: false, feedback: "That's the diameter, not the radius." }
      ],
    retryHint: "The radius is half the diameter. Divide by 2."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a regular hexagon have?",
    options: [
        { text: "6", correct: true, feedback: "A regular hexagon has 6 sides, so it has 6 lines of symmetry." },
        { text: "3", correct: false, feedback: "That's the number for an equilateral triangle, not a hexagon." },
        { text: "4", correct: false, feedback: "That's for a square." },
        { text: "8", correct: false, feedback: "Too many; an octagon has 8." }
      ],
    retryHint: "A regular polygon has as many lines of symmetry as it has sides."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many edges does a cube have?",
    options: [
        { text: "12", correct: true, feedback: "A cube has 4 edges on top, 4 on bottom, and 4 vertical edges." },
        { text: "6", correct: false, feedback: "6 is the number of faces." },
        { text: "8", correct: false, feedback: "8 is the number of vertices." },
        { text: "10", correct: false, feedback: "A cube has 12 edges, not 10." }
      ],
    retryHint: "Picture a dice: count the edges (the lines where faces meet)."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Starting at (1, 2), move 2 units right and 3 units up. What are the new coordinates?",
    options: [
        { text: "(3, 5)", correct: true, feedback: "Right changes x (1+2=3). Up changes y (2+3=5)." },
        { text: "(3, 2)", correct: false, feedback: "You forgot to add the up movement to y." },
        { text: "(1, 5)", correct: false, feedback: "You forgot to add the right movement to x." },
        { text: "(2, 3)", correct: false, feedback: "You swapped the changes." }
      ],
    retryHint: "Add the right amount to the x‑coordinate, and the up amount to the y‑coordinate."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An angle is twice its complement. Find the angle.",
    options: [
        { text: "60°", correct: true, feedback: "Let smaller = x, larger = 2x. x + 2x = 90 → 3x = 90 → x = 30, so the larger angle = 60°." },
        { text: "30°", correct: false, feedback: "That's the smaller angle (the complement)." },
        { text: "45°", correct: false, feedback: "That would be if both were equal." },
        { text: "90°", correct: false, feedback: "That's the total sum, not the angle." }
      ],
    retryHint: "Complementary angles sum to 90°. Let the angle be 2x and its complement be x. Solve 3x = 90."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "An isosceles triangle has two equal angles. The third angle is 80°. Find the equal angles.",
    options: [
        { text: "50° each", correct: true, feedback: "180° − 80° = 100°. Divide by 2 → 50°." },
        { text: "40°", correct: false, feedback: "That would leave 100° for the third angle, not 80°." },
        { text: "60°", correct: false, feedback: "Incorrect calculation." },
        { text: "80°", correct: false, feedback: "That's the third angle, not the equal ones." }
      ],
    retryHint: "Subtract the third angle from 180°, then divide by 2."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An angle is 30° more than its supplement. Find the angle.",
    options: [
        { text: "105°", correct: true, feedback: "Let angle = x. Its supplement = 180 − x. x = (180 − x) + 30 → 2x = 210 → x = 105°." },
        { text: "75°", correct: false, feedback: "That's the supplement, not the angle." },
        { text: "150°", correct: false, feedback: "Incorrect equation." },
        { text: "120°", correct: false, feedback: "Incorrect." }
      ],
    backward: "Supplementary angles sum to 180°. Set up the equation carefully.",
    forward: "Equation‑solving with angles builds algebra skills."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are in the ratio 2:3:4. Find the largest angle.",
    options: [
        { text: "80°", correct: true, feedback: "Total parts = 2+3+4 = 9. One part = 180° ÷ 9 = 20°. Largest = 4 × 20 = 80°." },
        { text: "60°", correct: false, feedback: "That's 3 parts." },
        { text: "40°", correct: false, feedback: "That's 2 parts, the smallest." },
        { text: "100°", correct: false, feedback: "Incorrect sum of parts." }
      ],
    backward: "Sum the ratio parts, divide 180° by the total, multiply by the largest part.",
    forward: "Ratio problems appear frequently in geometry and real life."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has radius 6 cm. A point P is 7 cm from the centre. Is P inside or outside the circle?",
    options: [
        { text: "Outside", correct: true, feedback: "The distance from centre (7 cm) is greater than the radius (6 cm), so P is outside." },
        { text: "Inside", correct: false, feedback: "Inside means distance < radius." },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 6 cm." },
        { text: "Cannot say", correct: false, feedback: "We can compare the distance to the radius." }
      ],
    backward: "The distance from the centre to any point inside the circle is less than the radius.",
    forward: "This idea leads to the formal definition of a circle as a set of points."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Two identical squares are joined along a full edge to form a rectangle. How many lines of symmetry does this shape have?",
    options: [
        { text: "2", correct: true, feedback: "The rectangle (2 units by 1 unit) has one vertical and one horizontal line of symmetry." },
        { text: "1", correct: false, feedback: "It has more than one." },
        { text: "4", correct: false, feedback: "That would be a square, not a 2×1 rectangle." },
        { text: "0", correct: false, feedback: "The shape does have symmetry." }
      ],
    backward: "Sketch the shape; look for lines that divide it into two mirror‑image halves.",
    forward: "Symmetry of composite shapes builds spatial reasoning."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "Which net can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This T‑shaped or cross‑shaped net of 6 squares can fold into a cube." },
        { text: "6 squares in a straight line", correct: false, feedback: "Cannot close into a cube without overlapping." },
        { text: "5 squares in a T shape", correct: false, feedback: "Only 5 faces, a cube needs 6." },
        { text: "4 squares in a large square", correct: false, feedback: "Only 4 faces." }
      ],
    backward: "A cube net must have exactly 6 squares arranged so they can fold without overlapping.",
    forward: "Nets are essential for understanding surface area and packaging."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a rectangle are (1,1), (1,4), (4,1). What is the fourth vertex?",
    options: [
        { text: "(4,4)", correct: true, feedback: "The missing corner must have x=4 and y=4 to complete the rectangle." },
        { text: "(1,1)", correct: false, feedback: "Already given." },
        { text: "(4,1)", correct: false, feedback: "Already given." },
        { text: "(1,4)", correct: false, feedback: "Already given." }
      ],
    backward: "Plot the points; the missing corner must align with the other x and y values.",
    forward: "Coordinate geometry links algebra and shape."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two angles are complementary. One is twice the other. Find the larger angle.",
    options: [
        { text: "60°", correct: true, feedback: "Let smaller = x, larger = 2x. x + 2x = 90 → 3x = 90 → x = 30, larger = 60°." },
        { text: "30°", correct: false, feedback: "That's the smaller angle." },
        { text: "45°", correct: false, feedback: "That would be if they were equal." },
        { text: "90°", correct: false, feedback: "That's the total sum." }
      ],
    backward: "Complementary angles sum to 90°. Set up x + 2x = 90.",
    forward: "These equation‑based angle problems are common in exams."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "An isosceles triangle has one angle of 100°. Find the other two angles.",
    options: [
        { text: "40° each", correct: true, feedback: "The 100° must be the vertex angle. 180 − 100 = 80; ÷2 = 40° each." },
        { text: "50° each", correct: false, feedback: "That would give a sum of 200° (100+50+50)." },
        { text: "80° and 0°", correct: false, feedback: "Impossible." },
        { text: "30° and 50°", correct: false, feedback: "Not isosceles (not equal)." }
      ],
    backward: "The 100° must be the vertex angle; the base angles are equal.",
    forward: "Isosceles triangles have two equal sides and two equal angles."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has diameter 1 m. What is its radius in centimetres?",
    options: [
        { text: "50 cm", correct: true, feedback: "1 m = 100 cm. Radius = 100 ÷ 2 = 50 cm." },
        { text: "100 cm", correct: false, feedback: "That's the diameter in cm." },
        { text: "25 cm", correct: false, feedback: "You divided by 4." },
        { text: "200 cm", correct: false, feedback: "You multiplied by 2." }
      ],
    backward: "Convert to cm first, then divide by 2.",
    forward: "Unit conversions appear everywhere in measurement."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A shape has 4 lines of symmetry. Which could it be?",
    options: [
        { text: "Square", correct: true, feedback: "A square has 4 lines of symmetry (two diagonals, one vertical, one horizontal)." },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A non‑square rectangle has only 2 lines of symmetry." },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry." },
        { text: "Regular hexagon", correct: false, feedback: "A regular hexagon has 6 lines." }
      ],
    backward: "A square has symmetry along both diagonals and both midlines.",
    forward: "The number of lines of symmetry helps identify regular polygons."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube has edge length 5 cm. What is the total length of all its edges?",
    options: [
        { text: "60 cm", correct: true, feedback: "A cube has 12 edges. 12 × 5 = 60 cm." },
        { text: "30 cm", correct: false, feedback: "You used 6 faces instead of 12 edges? 6×5=30." },
        { text: "20 cm", correct: false, feedback: "You used 4 edges per face? No." },
        { text: "120 cm", correct: false, feedback: "You multiplied by 24? No." }
      ],
    backward: "A cube has 12 edges; multiply by the length of one edge.",
    forward: "This is used in frame construction and wire models."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point moves 3 units right and 2 units down from (4,5). What are the new coordinates?",
    options: [
        { text: "(7,3)", correct: true, feedback: "Right: 4+3=7. Down: 5−2=3 → (7,3)." },
        { text: "(1,7)", correct: false, feedback: "You subtracted x and added y." },
        { text: "(7,7)", correct: false, feedback: "You only moved right, forgot down." },
        { text: "(4,5)", correct: false, feedback: "No movement." }
      ],
    backward: "Right means add to x; down means subtract from y.",
    forward: "Translation is the simplest coordinate transformation."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An angle is equal to its supplement. Find the angle.",
    options: [
        { text: "90°", correct: true, feedback: "x = 180 − x → 2x = 180 → x = 90°." },
        { text: "45°", correct: false, feedback: "45 + 45 = 90, not 180." },
        { text: "180°", correct: false, feedback: "180 = 0? No." },
        { text: "0°", correct: false, feedback: "0 + 180 = 180, but 0 ≠ 180." }
      ],
    backward: "Set up x = 180 − x.",
    forward: "A right angle is the only angle equal to its supplement."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are (x+10)°, (2x−10)°, and (3x−30)°. Find x.",
    options: [
        { text: "35", correct: true, feedback: "Sum = (x+10)+(2x−10)+(3x−30) = 6x − 30 = 180 → 6x = 210 → x = 35." },
        { text: "30", correct: false, feedback: "Then sum = 6(30)−30 = 150, not 180." },
        { text: "40", correct: false, feedback: "Then sum = 210, >180." },
        { text: "25", correct: false, feedback: "Then sum = 120." }
      ],
    backward: "Sum the expressions, set equal to 180°, solve for x.",
    forward: "Algebraic triangles prepare for more advanced geometry proofs."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has diameter 14 cm. A point Q is 6 cm from the centre. Is Q inside, on, or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "Radius = 7 cm. Distance 6 cm < 7 cm → inside." },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 7 cm." },
        { text: "Outside", correct: false, feedback: "6 < 7, so inside." },
        { text: "Cannot say", correct: false, feedback: "We can compare." }
      ],
    backward: "Find the radius, then compare the distance to the radius.",
    forward: "This is the fundamental idea of a circle's boundary."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "An equilateral triangle is placed on top of a square, sharing one full side (the triangle's base). The apex points upward. How many lines of symmetry does the combined shape have?",
    options: [
        { text: "1", correct: true, feedback: "Only the vertical line through the centre creates mirror halves." },
        { text: "0", correct: false, feedback: "The vertical midline does work." },
        { text: "2", correct: false, feedback: "The horizontal midline does not work because of the triangle on top." },
        { text: "4", correct: false, feedback: "That would be the square alone." }
      ],
    backward: "Draw the shape; only the vertical line through the centre creates mirror halves.",
    forward: "Symmetry of composite shapes is used in architecture and logos."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube has volume 27 cm³. What is the length of one edge?",
    options: [
        { text: "3 cm", correct: true, feedback: "∛27 = 3, because 3 × 3 × 3 = 27." },
        { text: "9 cm", correct: false, feedback: "9 × 9 × 9 = 729, not 27." },
        { text: "27 cm", correct: false, feedback: "That's the volume, not the edge." },
        { text: "6 cm", correct: false, feedback: "Incorrect." }
      ],
    backward: "The cube of what number equals 27?",
    forward: "Cube roots are the inverse of cubing; volume and side length are connected."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a square are (2,2), (2,5), (5,2). Find the fourth vertex.",
    options: [
        { text: "(5,5)", correct: true, feedback: "The missing corner must have x=5 and y=5." },
        { text: "(2,2)", correct: false, feedback: "Already given." },
        { text: "(5,2)", correct: false, feedback: "Already given." },
        { text: "(2,5)", correct: false, feedback: "Already given." }
      ],
    backward: "The missing corner must align with the other x and y values.",
    forward: "Squares in the coordinate plane have equal side lengths and right angles."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two angles are supplementary; one is 40° more than the other. Find the smaller angle.",
    options: [
        { text: "70°", correct: true, feedback: "Smaller = x, larger = x+40. x + (x+40) = 180 → 2x = 140 → x = 70°." },
        { text: "110°", correct: false, feedback: "That's the larger angle." },
        { text: "40°", correct: false, feedback: "Incorrect." },
        { text: "140°", correct: false, feedback: "Incorrect." }
      ],
    backward: "Let the smaller be x; the larger is x+40. Sum is 180°.",
    forward: "Word problems with supplementary angles use simple algebra."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle is both right‑angled and isosceles. Find its acute angles.",
    options: [
        { text: "45° each", correct: true, feedback: "180° − 90° = 90°. Divide by 2 → 45°." },
        { text: "60° and 30°", correct: false, feedback: "That's a 30‑60‑90 triangle, not isosceles." },
        { text: "90° and 45°", correct: false, feedback: "A triangle can't have two 90° angles." },
        { text: "50° each", correct: false, feedback: "Incorrect sum." }
      ],
    backward: "Subtract the right angle (90°), then divide the remaining 90° equally.",
    forward: "The right isosceles triangle is a special triangle in geometry."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "How many chords of length exactly 20 cm can be drawn in a circle of diameter 18 cm?",
    options: [
        { text: "0", correct: true, feedback: "The longest possible chord is the diameter (18 cm). No chord can be 20 cm long." },
        { text: "1", correct: false, feedback: "A 20 cm chord would be longer than the diameter, which is impossible." },
        { text: "2", correct: false, feedback: "Impossible." },
        { text: "Infinitely many", correct: false, feedback: "Only chords ≤18 cm exist; 20 cm exceeds the maximum." }
      ],
    backward: "The diameter is the longest chord in a circle. No chord can exceed it.",
    forward: "This reinforces the key property of chords and the diameter."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A shape has exactly 2 lines of symmetry and all its sides are equal. Which shape could it be?",
    options: [
        { text: "Rhombus", correct: true, feedback: "A rhombus has all sides equal and generally 2 lines of symmetry (its diagonals)." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry." },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A rectangle does not have all sides equal." },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry." }
      ],
    backward: "A rhombus has all sides equal and generally 2 lines of symmetry (its diagonals).",
    forward: "Classifying quadrilaterals by symmetry and sides deepens shape knowledge."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cuboid has length 10 cm, width 5 cm, and height 2 cm. What is the sum of the lengths of all its edges?",
    options: [
        { text: "68 cm", correct: true, feedback: "4 × (10 + 5 + 2) = 4 × 17 = 68 cm." },
        { text: "17 cm", correct: false, feedback: "That's the sum of the three dimensions." },
        { text: "34 cm", correct: false, feedback: "You multiplied by 2 instead of 4." },
        { text: "100 cm", correct: false, feedback: "Incorrect." }
      ],
    backward: "A cuboid has 4 edges of each dimension. Add the three different dimensions and multiply by 4.",
    forward: "This is useful for calculating the frame length of a box."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A rectangle has vertices (1,1), (1,3), (4,1). What is the fourth vertex?",
    options: [
        { text: "(4,3)", correct: true, feedback: "The missing vertex shares x=4 and y=3." },
        { text: "(1,1)", correct: false, feedback: "Already given." },
        { text: "(3,1)", correct: false, feedback: "That would not complete a rectangle." },
        { text: "(4,1)", correct: false, feedback: "Already given." }
      ],
    backward: "The missing vertex shares the x of the far right point and the y of the top point.",
    forward: "Completing rectangles on the coordinate grid is a key spatial skill."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An angle is 50° less than its supplement. Find the angle.",
    options: [
        { text: "65°", correct: true, feedback: "x = (180−x) − 50 → 2x = 130 → x = 65°." },
        { text: "115°", correct: false, feedback: "That's the supplement." },
        { text: "50°", correct: false, feedback: "Not correct — try the next one." },
        { text: "130°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are in the ratio 1:2:3. Find the smallest angle.",
    options: [
        { text: "30°", correct: true, feedback: "1+2+3=6 parts. One part = 180÷6=30°." },
        { text: "20°", correct: false, feedback: "Not correct — try the next one." },
        { text: "60°", correct: false, feedback: "Not correct — try the next one." },
        { text: "90°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has radius 9 cm. A point is 8.5 cm from the centre. Is it inside or outside?",
    options: [
        { text: "Inside", correct: true, feedback: "8.5 < 9 → inside." },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one." },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a regular octagon have?",
    options: [
        { text: "8", correct: true, feedback: "A regular octagon has 8 sides, so 8 lines." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube has edge 3 cm. What is the total length of all its edges?",
    options: [
        { text: "36 cm", correct: true, feedback: "12 × 3 = 36 cm." },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "24 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "72 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Starting at (3,2), move 2 units right and 3 units up. New coordinates?",
    options: [
        { text: "(5,5)", correct: true, feedback: "3+2=5, 2+3=5." },
        { text: "(5,2)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(3,5)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(1,5)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two complementary angles differ by 20°. Find the larger angle.",
    options: [
        { text: "55°", correct: true, feedback: "x + (x+20) = 90 → 2x = 70 → x=35, larger=55." },
        { text: "45°", correct: false, feedback: "Not correct — try the next one." },
        { text: "65°", correct: false, feedback: "Not correct — try the next one." },
        { text: "35°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are 2x, 3x, and 5x. Find x.",
    options: [
        { text: "18°", correct: true, feedback: "10x = 180 → x = 18." },
        { text: "20°", correct: false, feedback: "Not correct — try the next one." },
        { text: "15°", correct: false, feedback: "Not correct — try the next one." },
        { text: "10°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has diameter 2 km. Find its radius in metres.",
    options: [
        { text: "1000 m", correct: true, feedback: "2 km = 2000 m. Radius = 1000 m." },
        { text: "2000 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "500 m", correct: false, feedback: "Not correct — try the next one." },
        { text: "100 m", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Which shape has 0 lines of symmetry and all sides different?",
    options: [
        { text: "Scalene triangle", correct: true, feedback: "All sides different, no mirror symmetry." },
        { text: "Isosceles triangle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Rectangle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Square", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "The volume of a cube is 64 cm³. Find the edge length.",
    options: [
        { text: "4 cm", correct: true, feedback: "∛64 = 4." },
        { text: "8 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "32 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "16 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a rectangle are (0,0), (0,3), (5,0). Find the fourth vertex.",
    options: [
        { text: "(5,3)", correct: true, feedback: "Missing x=5, y=3." },
        { text: "(0,3)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(5,0)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(3,5)", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Geometry — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Multi-step angle equations, ratio problems, and coordinate translations across every geometry cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Multi‑Step Geometry</strong><br>\n        • Supplementary angles sum to 180°; complementary angles sum to 90°.<br>\n        • The sum of angles in a triangle is always 180°.<br>\n        • Use ratios to find angles: sum the parts, divide 180° by the total, multiply.<br>\n        • Radius = half of diameter. The longest chord is the diameter.<br>\n        • Lines of symmetry: a regular polygon has as many lines as sides.<br>\n        • A cube has 6 faces, 12 edges, 8 vertices. Total edge length = 12 × edge.<br>\n        • On a coordinate grid, right = add to x, up = add to y. Complete rectangles by finding the missing vertex.",
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

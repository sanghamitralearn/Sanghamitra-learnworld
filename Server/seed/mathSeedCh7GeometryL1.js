// seed/mathSeedCh7GeometryL1.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 7
// (Geometry), Level 1 — converted from the standalone HTML file
// ch-7-geometry-level-1.html.
//
// Run with: node seed/mathSeedCh7GeometryL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-7-geometry";
const CHAPTER_NAME = "Geometry";
const LEVEL = 1;

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
    question: "What type of angle is 45°?",
    options: [
        { text: "Acute", correct: true, feedback: "An angle less than 90° is called an acute angle." },
        { text: "Obtuse", correct: false, feedback: "Obtuse angles are between 90° and 180°." },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°." },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°." }
      ],
    retryHint: "An angle less than 90° is called acute."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle with all three sides equal is called a ______.",
    options: [
        { text: "Equilateral triangle", correct: true, feedback: "All sides and all angles are equal in an equilateral triangle." },
        { text: "Isosceles triangle", correct: false, feedback: "Isosceles triangles have exactly two equal sides." },
        { text: "Scalene triangle", correct: false, feedback: "Scalene triangles have no equal sides." },
        { text: "Right triangle", correct: false, feedback: "A right triangle has one 90° angle; side lengths can vary." }
      ],
    retryHint: "Think of the prefix: 'equi' means equal, 'lateral' means sides."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "What is the name of a line segment from the centre of a circle to any point on the circle?",
    options: [
        { text: "Radius", correct: true, feedback: "The radius is the distance from the centre to any point on the circle." },
        { text: "Diameter", correct: false, feedback: "The diameter goes all the way across through the centre." },
        { text: "Chord", correct: false, feedback: "A chord is any line segment joining two points on the circle, not necessarily through the centre." },
        { text: "Arc", correct: false, feedback: "An arc is a curved part of the circumference." }
      ],
    retryHint: "It is half the length of the diameter."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a square have?",
    options: [
        { text: "4", correct: true, feedback: "A square has symmetry along both diagonals and both midlines (vertical and horizontal)." },
        { text: "2", correct: false, feedback: "That's the number for a rectangle (non‑square) or an isosceles triangle." },
        { text: "1", correct: false, feedback: "A square has more than one line of symmetry." },
        { text: "8", correct: false, feedback: "Too many; a regular octagon has 8 lines of symmetry." }
      ],
    retryHint: "Can you fold a square in half exactly? How many different ways?"
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many faces does a cube have?",
    options: [
        { text: "6", correct: true, feedback: "A cube has 6 square faces, like a dice." },
        { text: "4", correct: false, feedback: "A cube has more than 4 faces." },
        { text: "8", correct: false, feedback: "8 is the number of vertices (corners) of a cube." },
        { text: "12", correct: false, feedback: "12 is the number of edges of a cube." }
      ],
    retryHint: "Picture a dice — how many flat square surfaces does it have?"
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "What are the coordinates of a point that is 3 units right and 4 units up from the origin?",
    options: [
        { text: "(3, 4)", correct: true, feedback: "x‑coordinate comes first (right), y‑coordinate comes second (up)." },
        { text: "(4, 3)", correct: false, feedback: "You swapped the x and y coordinates." },
        { text: "(3, −4)", correct: false, feedback: "A negative y means down, not up." },
        { text: "(0, 0)", correct: false, feedback: "That's the origin itself." }
      ],
    retryHint: "The first number is how far right (x), the second is how far up (y)."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two lines that never meet and are always the same distance apart are called ______.",
    options: [
        { text: "Parallel lines", correct: true, feedback: "Parallel lines stay exactly the same distance apart forever." },
        { text: "Perpendicular lines", correct: false, feedback: "Perpendicular lines meet at a right angle." },
        { text: "Intersecting lines", correct: false, feedback: "Intersecting lines cross each other at some point." },
        { text: "Curved lines", correct: false, feedback: "Curved lines are not straight; parallel lines are straight." }
      ],
    retryHint: "Think of railway tracks — they never meet."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle with one angle of 90° is called a ______.",
    options: [
        { text: "Right‑angled triangle", correct: true, feedback: "A triangle with a 90° angle is called a right‑angled triangle." },
        { text: "Acute‑angled triangle", correct: false, feedback: "All angles in an acute triangle are less than 90°." },
        { text: "Obtuse‑angled triangle", correct: false, feedback: "An obtuse triangle has one angle greater than 90°." },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has three 60° angles." }
      ],
    retryHint: "A right angle is exactly 90°."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "What type of angle is 120°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "An obtuse angle is greater than 90° and less than 180°." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°." },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°." },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°." }
      ],
    backward: "An obtuse angle is between 90° and 180°.",
    forward: "Angles are used in construction, design, and navigation."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has sides 5 cm, 5 cm, and 8 cm. What type of triangle is it by sides?",
    options: [
        { text: "Isosceles", correct: true, feedback: "Two sides are equal (5 cm and 5 cm), so it is isosceles." },
        { text: "Equilateral", correct: false, feedback: "All three sides would need to be equal." },
        { text: "Scalene", correct: false, feedback: "All three sides would need to be different." },
        { text: "Cannot be determined", correct: false, feedback: "We can classify it by the side lengths given." }
      ],
    backward: "Isosceles triangles have at least two equal sides.",
    forward: "Triangles are classified by both side lengths and angles."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "If the radius of a circle is 7 cm, what is its diameter?",
    options: [
        { text: "14 cm", correct: true, feedback: "Diameter = 2 × radius = 2 × 7 = 14 cm." },
        { text: "7 cm", correct: false, feedback: "That's the radius, not the diameter." },
        { text: "3.5 cm", correct: false, feedback: "That's half the radius." },
        { text: "21 cm", correct: false, feedback: "You multiplied by 3 instead of 2." }
      ],
    backward: "The diameter is twice the radius.",
    forward: "The diameter is used to find circumference and area."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does an equilateral triangle have?",
    options: [
        { text: "3", correct: true, feedback: "Each line goes from a vertex to the midpoint of the opposite side." },
        { text: "1", correct: false, feedback: "A scalene triangle has 0; an isosceles has 1. An equilateral has 3." },
        { text: "2", correct: false, feedback: "That would be an isosceles triangle." },
        { text: "0", correct: false, feedback: "A scalene triangle has no lines of symmetry." }
      ],
    backward: "An equilateral triangle has symmetry along each median.",
    forward: "Symmetry helps in design, art, and understanding shapes."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "Which of the following is a polygon?",
    options: [
        { text: "Square", correct: true, feedback: "A square is a polygon because it has straight sides and is closed." },
        { text: "Circle", correct: false, feedback: "A circle has a curved boundary, so it is not a polygon." },
        { text: "Oval", correct: false, feedback: "An oval is curved, not a polygon." },
        { text: "Sphere", correct: false, feedback: "A sphere is a 3D object; polygons are 2D." }
      ],
    backward: "A polygon is a closed 2D shape with only straight sides.",
    forward: "Polygons are the building blocks of 2D geometry."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is at (5, 0). Where is it located?",
    options: [
        { text: "On the x‑axis", correct: true, feedback: "When the y‑coordinate is 0, the point lies on the x‑axis." },
        { text: "On the y‑axis", correct: false, feedback: "That would be when the x‑coordinate is 0." },
        { text: "At the origin", correct: false, feedback: "The origin is (0, 0)." },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not inside any quadrant." }
      ],
    backward: "When y = 0, the point lies on the x‑axis.",
    forward: "Coordinates are used in maps, graphs, and coding."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "How many degrees are there in a right angle?",
    options: [
        { text: "90°", correct: true, feedback: "A right angle is exactly 90°." },
        { text: "180°", correct: false, feedback: "That's a straight angle." },
        { text: "360°", correct: false, feedback: "That's a full turn." },
        { text: "45°", correct: false, feedback: "That's half of a right angle." }
      ],
    backward: "A right angle is a quarter turn.",
    forward: "Right angles are the basis for perpendicular lines and coordinate grids."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has one angle of 100°. What type of triangle is it by angles?",
    options: [
        { text: "Obtuse‑angled", correct: true, feedback: "One angle is greater than 90°, making it obtuse‑angled." },
        { text: "Acute‑angled", correct: false, feedback: "All angles would need to be less than 90°." },
        { text: "Right‑angled", correct: false, feedback: "A right angle is exactly 90°, not 100°." },
        { text: "Equilateral", correct: false, feedback: "Equilateral triangles have all angles equal to 60°." }
      ],
    backward: "An obtuse triangle has one angle greater than 90°.",
    forward: "Triangles are classified by their largest angle."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "What is a chord of a circle?",
    options: [
        { text: "A line segment joining any two points on the circle", correct: true, feedback: "A chord connects two points on the circumference." },
        { text: "A line from the centre to the edge", correct: false, feedback: "That's the radius." },
        { text: "A line through the centre from edge to edge", correct: false, feedback: "That's the diameter (a special chord)." },
        { text: "A curved part of the circumference", correct: false, feedback: "That's an arc." }
      ],
    backward: "A chord is any line segment whose endpoints lie on the circle.",
    forward: "The diameter is the longest possible chord."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Which letter of the alphabet has exactly one line of symmetry?",
    options: [
        { text: "A", correct: true, feedback: "The letter A has one vertical line of symmetry." },
        { text: "B", correct: false, feedback: "B has no line of symmetry in standard print." },
        { text: "H", correct: false, feedback: "H has two lines of symmetry (vertical and horizontal)." },
        { text: "X", correct: false, feedback: "X has two lines of symmetry (both diagonals)." }
      ],
    backward: "Trace the letter and imagine folding it. If the two halves match exactly, that fold line is a line of symmetry.",
    forward: "Symmetry is found in letters, logos, and nature."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many edges does a cuboid have?",
    options: [
        { text: "12", correct: true, feedback: "A cuboid has 4 edges on the top, 4 on the bottom, and 4 vertical edges." },
        { text: "6", correct: false, feedback: "6 is the number of faces." },
        { text: "8", correct: false, feedback: "8 is the number of vertices (corners)." },
        { text: "10", correct: false, feedback: "A cuboid has 12 edges, not 10." }
      ],
    backward: "A cuboid has the same number of edges, faces, and vertices as a cube.",
    forward: "Edges, faces, and vertices are used to describe all 3D shapes."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "What are the coordinates of the origin?",
    options: [
        { text: "(0, 0)", correct: true, feedback: "The origin is where the x‑axis and y‑axis intersect." },
        { text: "(1, 1)", correct: false, feedback: "That's one unit right and one unit up." },
        { text: "(0, 1)", correct: false, feedback: "That's one unit up on the y‑axis." },
        { text: "(1, 0)", correct: false, feedback: "That's one unit right on the x‑axis." }
      ],
    backward: "The origin is the starting point (0,0) on a coordinate grid.",
    forward: "All coordinates are measured from the origin."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two lines that meet at exactly 90° are called ______.",
    options: [
        { text: "Perpendicular lines", correct: true, feedback: "Perpendicular lines intersect at a right angle." },
        { text: "Parallel lines", correct: false, feedback: "Parallel lines never meet." },
        { text: "Intersecting lines", correct: false, feedback: "Intersecting lines can meet at any angle, not necessarily 90°." },
        { text: "Skew lines", correct: false, feedback: "Skew lines are in 3D and do not intersect, but are not parallel." }
      ],
    backward: "Perpendicular means 'at right angles'.",
    forward: "Perpendicular lines are used in grids, buildings, and coordinate axes."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has angles 60°, 60°, and 60°. What type of triangle is it by sides?",
    options: [
        { text: "Equilateral", correct: true, feedback: "If all angles are equal, all sides must also be equal." },
        { text: "Isosceles", correct: false, feedback: "An isosceles triangle has only two equal angles." },
        { text: "Scalene", correct: false, feedback: "A scalene triangle has no equal angles." },
        { text: "Right‑angled", correct: false, feedback: "No angle is 90°." }
      ],
    backward: "Equal angles imply equal opposite sides.",
    forward: "Equilateral triangles are regular polygons."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "The distance around a circle is called its ______.",
    options: [
        { text: "Circumference", correct: true, feedback: "Circumference is the perimeter of a circle." },
        { text: "Perimeter", correct: false, feedback: "Perimeter is used for polygons; circumference is for circles." },
        { text: "Area", correct: false, feedback: "Area is the space inside the circle." },
        { text: "Radius", correct: false, feedback: "Radius is the distance from the centre to the edge." }
      ],
    backward: "The circumference is the total length around the circle.",
    forward: "Circumference = π × diameter."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular polygon has as many lines of symmetry as it has sides." },
        { text: "2", correct: false, feedback: "That's much too few." },
        { text: "3", correct: false, feedback: "That's for an equilateral triangle." },
        { text: "10", correct: false, feedback: "That's double the number of sides." }
      ],
    backward: "A regular pentagon has 5 sides, so it has 5 lines of symmetry.",
    forward: "Regular polygons also have rotational symmetry."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "Which of these is NOT a 3D shape?",
    options: [
        { text: "Triangle", correct: true, feedback: "A triangle is a flat 2D shape." },
        { text: "Cube", correct: false, feedback: "A cube is a 3D shape." },
        { text: "Sphere", correct: false, feedback: "A sphere is a 3D shape." },
        { text: "Cylinder", correct: false, feedback: "A cylinder is a 3D shape." }
      ],
    backward: "3D shapes have volume and can be held; 2D shapes are flat.",
    forward: "Recognising 2D vs 3D is fundamental in geometry."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is at (2, 5). How far is it from the origin along the x‑axis?",
    options: [
        { text: "2 units", correct: true, feedback: "The x‑coordinate (2) tells the horizontal distance from the origin." },
        { text: "5 units", correct: false, feedback: "That's the vertical distance (y‑coordinate)." },
        { text: "7 units", correct: false, feedback: "You added the two coordinates." },
        { text: "√29 units", correct: false, feedback: "That would be the straight‑line distance, not along the x‑axis." }
      ],
    backward: "The x‑coordinate measures horizontal distance right from the origin.",
    forward: "Coordinates separate horizontal and vertical movement."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "A straight angle measures how many degrees?",
    options: [
        { text: "180°", correct: true, feedback: "A straight line forms an angle of 180°." },
        { text: "90°", correct: false, feedback: "That's a right angle." },
        { text: "360°", correct: false, feedback: "That's a full turn." },
        { text: "0°", correct: false, feedback: "That would be no angle." }
      ],
    backward: "A straight line is a half turn.",
    forward: "Angles on a straight line sum to 180°."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "What is the minimum number of acute angles in any triangle?",
    options: [
        { text: "2", correct: true, feedback: "Every triangle must have at least two acute angles. Even a right or obtuse triangle has two acute angles." },
        { text: "1", correct: false, feedback: "A triangle cannot have only one acute angle (the sum would exceed 180° if the other two were ≥90°)." },
        { text: "3", correct: false, feedback: "An acute triangle has 3, but right and obtuse triangles have only 2." },
        { text: "0", correct: false, feedback: "Every triangle must have at least 2 acute angles." }
      ],
    backward: "The sum of angles in a triangle is 180°. If one angle is ≥90°, the other two must be acute.",
    forward: "This property is used in triangle classification and proofs."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has a radius of 10 cm. What is the length of its longest chord?",
    options: [
        { text: "20 cm", correct: true, feedback: "The longest chord is the diameter, which is 2 × radius = 20 cm." },
        { text: "10 cm", correct: false, feedback: "That's the radius, not the diameter." },
        { text: "5 cm", correct: false, feedback: "That's half the radius." },
        { text: "15 cm", correct: false, feedback: "That's not twice the radius." }
      ],
    backward: "The diameter is the longest chord and passes through the centre.",
    forward: "Understanding the diameter leads to circumference and area calculations."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Which shape has NO lines of symmetry?",
    options: [
        { text: "Scalene triangle", correct: true, feedback: "A scalene triangle has all sides different, so it has no lines of symmetry." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry." },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry." },
        { text: "Circle", correct: false, feedback: "A circle has infinitely many lines of symmetry." }
      ],
    backward: "Symmetry requires at least two parts to be mirror images; a scalene triangle has no matching halves.",
    forward: "Asymmetry is also important in design and nature."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "Which of these nets can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This T‑shaped or cross‑shaped net of 6 squares can fold into a cube." },
        { text: "5 squares in a row", correct: false, feedback: "A cube needs exactly 6 faces, not 5." },
        { text: "6 squares in a straight line", correct: false, feedback: "Six squares in a line cannot fold into a closed cube — the faces would overlap." },
        { text: "4 squares in a large square", correct: false, feedback: "That only makes 4 faces, not enough for a cube." }
      ],
    backward: "A cube net must have exactly 6 squares arranged so they can fold without overlapping.",
    forward: "Nets connect 2D and 3D geometry and are used in packaging design."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point has coordinates (6, 3). How far is it from the x‑axis?",
    options: [
        { text: "3 units", correct: true, feedback: "The y‑coordinate (3) tells the vertical distance from the x‑axis." },
        { text: "6 units", correct: false, feedback: "That's the distance from the y‑axis (x‑coordinate)." },
        { text: "9 units", correct: false, feedback: "You added the coordinates." },
        { text: "0 units", correct: false, feedback: "The point is not on the x‑axis." }
      ],
    backward: "The y‑coordinate tells how far up the point is from the x‑axis.",
    forward: "Distance from axes is used in mapping and geometry."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "What type of angle is 150°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "150° is between 90° and 180°, so it is obtuse." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°." },
        { text: "Right", correct: false, feedback: "Right angles are exactly 90°." },
        { text: "Straight", correct: false, feedback: "Straight angles are exactly 180°." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has sides 7 cm, 7 cm, and 7 cm. What type of triangle is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All three sides are equal." },
        { text: "Isosceles", correct: false, feedback: "Isosceles has exactly two equal sides." },
        { text: "Scalene", correct: false, feedback: "Scalene has no equal sides." },
        { text: "Right", correct: false, feedback: "We cannot tell the angles from side lengths alone, but the side classification is equilateral." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "The radius of a circle is 3 cm. What is its diameter?",
    options: [
        { text: "6 cm", correct: true, feedback: "Diameter = 2 × radius = 6 cm." },
        { text: "3 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "1.5 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "9 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a rectangle (not a square) have?",
    options: [
        { text: "2", correct: true, feedback: "A non‑square rectangle has one vertical and one horizontal line of symmetry." },
        { text: "4", correct: false, feedback: "That's for a square." },
        { text: "1", correct: false, feedback: "Not correct — try the next one." },
        { text: "0", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "How many vertices does a cube have?",
    options: [
        { text: "8", correct: true, feedback: "A cube has 8 corners (vertices)." },
        { text: "6", correct: false, feedback: "6 is the number of faces." },
        { text: "12", correct: false, feedback: "12 is the number of edges." },
        { text: "4", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "What are the coordinates of a point 2 units right and 5 units up from the origin?",
    options: [
        { text: "(2, 5)", correct: true, feedback: "x=2, y=5." },
        { text: "(5, 2)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(2, −5)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(0, 0)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two lines that cross each other at any point are called ______.",
    options: [
        { text: "Intersecting lines", correct: true, feedback: "Any two lines that cross are intersecting." },
        { text: "Parallel lines", correct: false, feedback: "Not correct — try the next one." },
        { text: "Perpendicular lines", correct: false, feedback: "Perpendicular lines intersect at a specific angle (90°)." },
        { text: "Curved lines", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has angles 30°, 60°, and 90°. What type of triangle is it by angles?",
    options: [
        { text: "Right‑angled", correct: true, feedback: "It has one 90° angle." },
        { text: "Acute‑angled", correct: false, feedback: "Not correct — try the next one." },
        { text: "Obtuse‑angled", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equilateral", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "What is the name of a chord that passes through the centre of a circle?",
    options: [
        { text: "Diameter", correct: true, feedback: "The diameter is a chord that passes through the centre." },
        { text: "Radius", correct: false, feedback: "Not correct — try the next one." },
        { text: "Arc", correct: false, feedback: "Not correct — try the next one." },
        { text: "Tangent", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Which shape has infinitely many lines of symmetry?",
    options: [
        { text: "Circle", correct: true, feedback: "Any line through the centre of a circle is a line of symmetry." },
        { text: "Square", correct: false, feedback: "Not correct — try the next one." },
        { text: "Equilateral triangle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Rectangle", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "Which of these is a polygon?",
    options: [
        { text: "Pentagon", correct: true, feedback: "A pentagon has five straight sides, so it is a polygon." },
        { text: "Circle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Oval", correct: false, feedback: "Not correct — try the next one." },
        { text: "Sphere", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point lies on the y‑axis. Which coordinate must be zero?",
    options: [
        { text: "x‑coordinate", correct: true, feedback: "All points on the y‑axis have x = 0." },
        { text: "y‑coordinate", correct: false, feedback: "The y‑coordinate can be any number." },
        { text: "Both coordinates", correct: false, feedback: "Not correct — try the next one." },
        { text: "Neither", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Geometry — Core Fluency",
    subtitle: "Telangana & Cambridge · Level 1 · Core Fluency",
    description: "Single-step facts across lines and angles, triangles, circles, symmetry, 2D/3D shapes, and coordinates.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review</strong><br>\n        • Angles: acute (<90°), right (90°), obtuse (90°–180°), straight (180°), reflex (>180°).<br>\n        • Lines: parallel (never meet), perpendicular (meet at 90°), intersecting (cross at any angle).<br>\n        • Triangles: by sides — equilateral (3 equal), isosceles (2 equal), scalene (0 equal); by angles — acute, right, obtuse.<br>\n        • Circle: centre, radius (centre to edge), diameter (edge to edge through centre, = 2×radius), chord (line joining two points on circle).<br>\n        • Symmetry: a line of symmetry divides a shape into two mirror‑image halves.<br>\n        • 3D shapes: cube (6 faces, 12 edges, 8 vertices), cuboid (same counts), cylinder, cone, sphere.<br>\n        • Coordinates: (x, y) — x is horizontal distance right, y is vertical distance up from the origin (0,0).",
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

// seed/mathSeedCh7GeometryL3.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 7
// (Geometry), Level 3 — converted from the standalone HTML file
// ch-7-geometry-level-3.html.
//
// Run with: node seed/mathSeedCh7GeometryL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-7-geometry";
const CHAPTER_NAME = "Geometry";
const LEVEL = 3;

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
    question: "Two supplementary angles differ by 50°. Find the smaller angle.",
    options: [
        { text: "65°", correct: true, feedback: "Let smaller = x, larger = x+50. x + (x+50) = 180 → 2x = 130 → x = 65°." },
        { text: "115°", correct: false, feedback: "That's the larger angle." },
        { text: "50°", correct: false, feedback: "Incorrect equation." },
        { text: "130°", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Let the smaller angle be x. Then the larger is x+50. Their sum is 180°."
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are (x+15)°, (2x−15)°, and (3x−30)°. Find x.",
    options: [
        { text: "35", correct: true, feedback: "Sum = (x+15)+(2x−15)+(3x−30) = 6x−30 = 180 → 6x = 210 → x = 35." },
        { text: "30", correct: false, feedback: "Then sum would be 150°." },
        { text: "40", correct: false, feedback: "Sum would be 210°." },
        { text: "25", correct: false, feedback: "Sum would be 120°." }
      ],
    retryHint: "Add the three expressions and set equal to 180°."
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (3,4) and passes through the origin (0,0). What is its radius?",
    options: [
        { text: "5", correct: true, feedback: "Distance = √((3−0)² + (4−0)²) = √(9+16) = √25 = 5." },
        { text: "3", correct: false, feedback: "That's just the x‑coordinate." },
        { text: "4", correct: false, feedback: "That's the y‑coordinate." },
        { text: "7", correct: false, feedback: "You added 3+4 instead of using Pythagoras." }
      ],
    retryHint: "Use the distance formula: √((x₂−x₁)² + (y₂−y₁)²)."
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A regular polygon has each interior angle 135°. How many lines of symmetry does it have?",
    options: [
        { text: "8", correct: true, feedback: "Interior angle = (n−2)×180/n = 135 → n=8 (octagon). Lines of symmetry = n = 8." },
        { text: "6", correct: false, feedback: "That would be a hexagon (interior 120°)." },
        { text: "10", correct: false, feedback: "Decagon interior = 144°." },
        { text: "5", correct: false, feedback: "Pentagon interior = 108°." }
      ],
    retryHint: "First find the number of sides from the interior angle formula, then symmetry lines = number of sides."
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cuboid measures 6 cm × 4 cm × 2 cm. A cube has the same total edge length as the cuboid. Find the cube's volume.",
    options: [
        { text: "64 cm³", correct: true, feedback: "Cuboid edges = 4(6+4+2)=48 cm. Cube edge = 48/12=4 cm. Volume = 4³ = 64 cm³." },
        { text: "48 cm³", correct: false, feedback: "That's the total edge length, not volume." },
        { text: "32 cm³", correct: false, feedback: "Incorrect edge length." },
        { text: "128 cm³", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Total edge length of cuboid = 4(l+b+h). Cube has 12 equal edges."
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is translated 1 unit right and 4 up, then 3 left and 2 down, ending at (4,5). Find the starting point.",
    options: [
        { text: "(6,3)", correct: true, feedback: "Net translation = (1−3, 4−2) = (−2, +2). Reverse: (4+2, 5−2) = (6,3)." },
        { text: "(2,7)", correct: false, feedback: "You added incorrectly." },
        { text: "(4,5)", correct: false, feedback: "No movement." },
        { text: "(8,1)", correct: false, feedback: "Wrong reversal." }
      ],
    retryHint: "Combine the two translations into one net movement, then reverse it."
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "In a triangle, one angle is three times the smallest angle, and the third angle is 40° more than the smallest. Find the largest angle.",
    options: [
        { text: "84°", correct: true, feedback: "Let smallest = x. Angles: x, 3x, x+40. Sum = 5x+40 = 180 → x=28. Largest = 3x = 84°." },
        { text: "68°", correct: false, feedback: "That's the middle angle." },
        { text: "28°", correct: false, feedback: "That's the smallest." },
        { text: "90°", correct: false, feedback: "Incorrect." }
      ],
    retryHint: "Let smallest angle = x. Express the other two in terms of x and sum to 180°."
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (2,2) and passes through (5,6). Which point lies inside the circle? (4,3), (7,5), (6,6), (5,6)",
    options: [
        { text: "(4,3)", correct: true, feedback: "Radius² = 3²+4² = 25. (4,3) distance² = 2²+1² = 5 < 25 → inside." },
        { text: "(7,5)", correct: false, feedback: "Distance² = 5²+3² = 34 > 25 → outside." },
        { text: "(6,6)", correct: false, feedback: "Distance² = 4²+4² = 32 > 25 → outside." },
        { text: "(5,6)", correct: false, feedback: "Distance² = 25 → on the circle." }
      ],
    retryHint: "Find the radius squared, then check each point's distance squared from the centre."
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two complementary angles: one is 10° more than three times the other. Find the larger angle.",
    options: [
        { text: "70°", correct: true, feedback: "x + (3x+10) = 90 → 4x = 80 → x = 20, larger = 3×20+10 = 70°." },
        { text: "20°", correct: false, feedback: "That's the smaller angle." },
        { text: "60°", correct: false, feedback: "Incorrect equation." },
        { text: "80°", correct: false, feedback: "Incorrect." }
      ],
    backward: "Complementary angles sum to 90°. Set up the equation carefully.",
    forward: "Algebraic angle problems appear in exams and real‑world design."
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "In a triangle, the second angle is twice the first, and the third is 20° more than the second. Find the first angle.",
    options: [
        { text: "32°", correct: true, feedback: "Angles: x, 2x, 2x+20. Sum = 5x+20 = 180 → x = 32." },
        { text: "30°", correct: false, feedback: "Then sum would be 170°." },
        { text: "36°", correct: false, feedback: "Sum would be 200°." },
        { text: "40°", correct: false, feedback: "Sum would be 220°." }
      ],
    backward: "Express all angles in terms of the first, sum to 180°.",
    forward: "Using variables for unknown angles builds algebraic thinking."
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (2,3) and radius 5. Which point lies on the circle? (6,6), (7,6), (3,7), (5,8)",
    options: [
        { text: "(6,6)", correct: true, feedback: "Distance² = (6−2)²+(6−3)² = 4²+3² = 25 = 5² → on the circle." },
        { text: "(7,6)", correct: false, feedback: "Distance² = 5²+3² = 34 > 25." },
        { text: "(3,7)", correct: false, feedback: "Distance² = 1²+4² = 17." },
        { text: "(5,8)", correct: false, feedback: "Distance² = 3²+5² = 34." }
      ],
    backward: "A point is on the circle if its distance from the centre equals the radius.",
    forward: "Combining coordinates and circle definitions prepares for analytic geometry."
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A shape has exactly 2 lines of symmetry, rotational symmetry of order 2, and all sides equal. Which shape is it?",
    options: [
        { text: "Rhombus", correct: true, feedback: "A rhombus (non‑square) has all sides equal, 2 lines (its diagonals), and order‑2 rotation." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry." },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A rectangle does not have all sides equal." },
        { text: "Kite", correct: false, feedback: "A kite generally has only 1 line of symmetry." }
      ],
    backward: "A rhombus has all sides equal, order‑2 rotation, and 2 lines of symmetry (diagonals).",
    forward: "Classifying shapes by multiple symmetry properties deepens understanding."
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube's total edge length is 60 cm. A cuboid has the same total edge length, with length 6 cm and width 4 cm. Find the cuboid's height.",
    options: [
        { text: "5 cm", correct: true, feedback: "Cube edge = 60/12 = 5 cm. Cuboid: 4(6+4+h) = 60 → 10+h = 15 → h = 5 cm." },
        { text: "3 cm", correct: false, feedback: "Then total edges = 4(13)=52." },
        { text: "4 cm", correct: false, feedback: "Total edges = 4(14)=56." },
        { text: "6 cm", correct: false, feedback: "Total edges = 4(16)=64." }
      ],
    backward: "Total edges = 4(l+b+h). First find the sum l+b+h, then subtract known dimensions.",
    forward: "Linking cube and cuboid properties through edge sums."
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a rectangle are (1,2), (1,5), (4,2). Reflect the fourth vertex over the line x=3. Find the reflected coordinates.",
    options: [
        { text: "(2,5)", correct: true, feedback: "Fourth vertex = (4,5). Reflect over x=3: x' = 2×3−4 = 2, y unchanged → (2,5)." },
        { text: "(4,5)", correct: false, feedback: "That's the original fourth vertex." },
        { text: "(5,2)", correct: false, feedback: "Swapped coordinates." },
        { text: "(2,2)", correct: false, feedback: "Incorrect reflection." }
      ],
    backward: "Reflect by finding the image: x' = 2k − x, y' = y.",
    forward: "Coordinate reflections are used in computer graphics and design."
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An exterior angle of a triangle is 130°, and one interior opposite angle is 50°. Find the other interior opposite angle.",
    options: [
        { text: "80°", correct: true, feedback: "Exterior angle = sum of two interior opposite angles → 130 = 50 + x → x = 80°." },
        { text: "100°", correct: false, feedback: "Incorrect." },
        { text: "50°", correct: false, feedback: "That's the given angle." },
        { text: "60°", correct: false, feedback: "Incorrect." }
      ],
    backward: "Exterior angle = sum of interior opposite angles.",
    forward: "This property is used in navigation and construction."
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "An isosceles triangle has perimeter 32 cm. The unequal side is 10 cm. Find the length of each equal side.",
    options: [
        { text: "11 cm", correct: true, feedback: "(32 − 10) ÷ 2 = 11 cm." },
        { text: "10 cm", correct: false, feedback: "That's the unequal side." },
        { text: "12 cm", correct: false, feedback: "Then perimeter = 34 cm." },
        { text: "14 cm", correct: false, feedback: "Then perimeter = 38 cm." }
      ],
    backward: "Subtract the unequal side from the perimeter, then divide by 2.",
    forward: "Perimeter problems with triangles are common in real‑world measurements."
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (5,5) and passes through (9,8). Find the x‑coordinate of the point on the circle with y=5 that lies to the left of the centre.",
    options: [
        { text: "0", correct: true, feedback: "Radius² = 4²+3² = 25. For y=5: (x−5)² = 25 → x−5 = ±5 → x=10 or 0. Left of centre → x=0." },
        { text: "10", correct: false, feedback: "That's the point to the right." },
        { text: "5", correct: false, feedback: "That's the centre." },
        { text: "−5", correct: false, feedback: "Incorrect." }
      ],
    backward: "Set y=5 in the circle equation, solve for x, pick the one left of centre.",
    forward: "Finding specific points on a circle links algebra and geometry."
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A rectangle 8 cm by 6 cm is folded in half along its vertical line of symmetry. Find the perimeter of the folded shape.",
    options: [
        { text: "22 cm", correct: true, feedback: "Folded dimensions: 8 cm by 3 cm. Perimeter = 2(8+3) = 22 cm." },
        { text: "20 cm", correct: false, feedback: "That would be if folded horizontally (8 by 3? no, horizontally folded would be 4 by 6, perimeter=20)." },
        { text: "24 cm", correct: false, feedback: "Original perimeter?" },
        { text: "28 cm", correct: false, feedback: "Original perimeter." }
      ],
    backward: "Folding along the vertical midline halves the width, not the length.",
    forward: "Symmetry and folding are used in paper engineering and packaging."
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cuboid 4 cm × 5 cm × 10 cm is cut into two equal halves along a plane parallel to the smallest face. Find the volume of each half.",
    options: [
        { text: "100 cm³", correct: true, feedback: "Smallest face = 4×5. Cut parallel to it halves the 10 cm dimension → 4×5×5 = 100 cm³." },
        { text: "50 cm³", correct: false, feedback: "You might have quartered it." },
        { text: "200 cm³", correct: false, feedback: "That's the whole volume." },
        { text: "150 cm³", correct: false, feedback: "Incorrect." }
      ],
    backward: "The cut is parallel to the 4×5 face, so the 10 cm side is halved.",
    forward: "Visualising cross‑sections builds spatial reasoning."
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is translated 2 left and 5 up, then 4 right and 3 down, ending at (7,6). Find the starting point.",
    options: [
        { text: "(5,4)", correct: true, feedback: "Net translation = (−2+4, 5−3) = (+2, +2). Reverse: (7−2, 6−2) = (5,4)." },
        { text: "(3,8)", correct: false, feedback: "Incorrect reversal." },
        { text: "(9,2)", correct: false, feedback: "Incorrect." },
        { text: "(9,8)", correct: false, feedback: "You added the net translation instead of reversing it." }
      ],
    backward: "Combine translations first, then reverse.",
    forward: "Multiple translations are used in robotics and animation."
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two angles are supplementary. Twice the larger exceeds three times the smaller by 20°. Find the larger angle.",
    options: [
        { text: "112°", correct: true, feedback: "x+y=180, 2x−3y=20. Solve: x=112, y=68." },
        { text: "68°", correct: false, feedback: "That's the smaller angle." },
        { text: "90°", correct: false, feedback: "Incorrect." },
        { text: "135°", correct: false, feedback: "Incorrect." }
      ],
    backward: "Set up a system of two equations.",
    forward: "Systems of equations appear in many geometry problems."
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A triangle has sides 7 cm, 8 cm, 9 cm. It is enlarged so that the longest side becomes 18 cm. Find the new perimeter.",
    options: [
        { text: "48 cm", correct: true, feedback: "Scale factor = 18/9 = 2. New sides = 14,16,18; perimeter = 48 cm." },
        { text: "36 cm", correct: false, feedback: "Original perimeter." },
        { text: "54 cm", correct: false, feedback: "Scale factor 1.5? No." },
        { text: "24 cm", correct: false, feedback: "Half." }
      ],
    backward: "Find the scale factor, apply to all sides, then sum.",
    forward: "Scaling is used in maps, models, and design."
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (2,3) and radius 5. The circle is reflected over the line x=4. What is the new centre?",
    options: [
        { text: "(6,3)", correct: true, feedback: "Reflect x‑coordinate: x' = 2×4 − 2 = 6; y unchanged." },
        { text: "(2,3)", correct: false, feedback: "Unchanged." },
        { text: "(4,3)", correct: false, feedback: "That's the mirror line." },
        { text: "(8,3)", correct: false, feedback: "Incorrect reflection." }
      ],
    backward: "The line x=4 is vertical; reflect the x‑coordinate across it.",
    forward: "Reflections are used in symmetry and optics."
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A square has vertices (1,1), (1,3), (3,3), (3,1). It is reflected over the line y=x. Find the image of the vertex (1,3).",
    options: [
        { text: "(3,1)", correct: true, feedback: "Reflection over y=x swaps x and y." },
        { text: "(1,3)", correct: false, feedback: "Unchanged." },
        { text: "(3,3)", correct: false, feedback: "Incorrect." },
        { text: "(1,1)", correct: false, feedback: "Incorrect." }
      ],
    backward: "Swap x and y to reflect over y=x.",
    forward: "This transformation is a key concept in coordinate geometry."
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube and a cuboid have the same volume. The cube has edge 4 cm. The cuboid has length 8 cm and width 2 cm. Find the height of the cuboid.",
    options: [
        { text: "4 cm", correct: true, feedback: "Cube volume = 64 cm³. Cuboid: 8×2×h = 64 → h = 4 cm." },
        { text: "2 cm", correct: false, feedback: "Then volume = 32 cm³." },
        { text: "6 cm", correct: false, feedback: "Volume = 96 cm³." },
        { text: "8 cm", correct: false, feedback: "Volume = 128 cm³." }
      ],
    backward: "Volume = l×b×h. Equate the volumes, solve for h.",
    forward: "Comparing volumes of different shapes is a practical skill."
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a parallelogram are (1,1), (4,1), and (6,4). Find the fourth vertex.",
    options: [
        { text: "(3,4)", correct: true, feedback: "Vector from (1,1) to (4,1) is (3,0). Add to (6,4): (6−3, 4−0) = (3,4)." },
        { text: "(9,4)", correct: false, feedback: "Added vectors incorrectly." },
        { text: "(1,4)", correct: false, feedback: "Incorrect." },
        { text: "(4,6)", correct: false, feedback: "Swapped coordinates." }
      ],
    backward: "In a parallelogram, opposite sides are parallel and equal; use vectors.",
    forward: "Coordinate geometry and vector thinking combine."
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two straight lines intersect. One of the angles formed is 72°. Find the sum of the other three angles.",
    options: [
        { text: "288°", correct: true, feedback: "Angles around a point sum to 360°. 360 − 72 = 288°." },
        { text: "108°", correct: false, feedback: "That's the supplement of 72°." },
        { text: "180°", correct: false, feedback: "That's the sum of two angles on a straight line." },
        { text: "216°", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "Angles around a point sum to 360°.",
    forward: "This is fundamental in circle theorems and navigation."
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "A right triangle has legs of length 5 cm and 12 cm. Find its area.",
    options: [
        { text: "30 cm²", correct: true, feedback: "Area = ½ × base × height = ½ × 5 × 12 = 30 cm²." },
        { text: "60 cm²", correct: false, feedback: "You forgot to halve the product." },
        { text: "15 cm²", correct: false, feedback: "Incorrect." },
        { text: "25 cm²", correct: false, feedback: "Incorrect." }
      ],
    backward: "Area = ½ × base × height; the legs are the base and height.",
    forward: "Area of triangles is used in construction and design."
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A point P is 3 cm from the centre of a circle of radius 5 cm. What is the length of the longest chord that passes through P?",
    options: [
        { text: "10 cm", correct: true, feedback: "The diameter through P is the longest chord; length = 2 × 5 = 10 cm." },
        { text: "8 cm", correct: false, feedback: "That would be the chord perpendicular to the radius through P (but that's shorter)." },
        { text: "6 cm", correct: false, feedback: "Too short." },
        { text: "4 cm", correct: false, feedback: "Too short." }
      ],
    backward: "The diameter passing through P is the longest possible chord through that point.",
    forward: "Understanding chords deepens circle geometry."
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "A right triangle with legs 6 cm and 8 cm is reflected across its hypotenuse. Find the perimeter of the resulting quadrilateral.",
    options: [
        { text: "28 cm", correct: true, feedback: "Hypotenuse = 10 cm. The quadrilateral has sides 6,8,6,8; perimeter = 28 cm." },
        { text: "20 cm", correct: false, feedback: "Sum of legs only." },
        { text: "24 cm", correct: false, feedback: "Twice the hypotenuse." },
        { text: "30 cm", correct: false, feedback: "Incorrect." }
      ],
    backward: "Reflecting across the hypotenuse creates a kite with the legs as sides.",
    forward: "Reflections produce symmetric shapes with calculable perimeters."
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube is cut into smaller 1 cm cubes. The total surface area of all the small cubes is 48 cm². Find the edge length of the original cube.",
    options: [
        { text: "2 cm", correct: true, feedback: "Number of small cubes = n. Total SA = 6n = 48 → n = 8. Original edge = ∛8 = 2 cm." },
        { text: "3 cm", correct: false, feedback: "Volume would be 27, SA = 6×27 = 162." },
        { text: "4 cm", correct: false, feedback: "Volume 64, SA = 384." },
        { text: "8 cm", correct: false, feedback: "Volume 512, SA huge." }
      ],
    backward: "Total SA = 6 × (number of small cubes). Number = n³, so 6n³ = 48 → n³=8 → n=2.",
    forward: "Reverse engineering from small parts to the whole."
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A triangle has vertices (1,1), (5,1), (1,4). It is reflected over the line y=x. Find the area of the reflected triangle.",
    options: [
        { text: "6 square units", correct: true, feedback: "Reflection preserves area. Original area = ½ × 4 × 3 = 6." },
        { text: "12", correct: false, feedback: "You might have doubled the area." },
        { text: "3", correct: false, feedback: "Halved." },
        { text: "4", correct: false, feedback: "Incorrect." }
      ],
    backward: "Reflection does not change area; compute area before or after.",
    forward: "Transformations and area are linked in geometry."
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "Two complementary angles differ by 30°. Find the larger angle.",
    options: [
        { text: "60°", correct: true, feedback: "x + (x+30) = 90 → 2x=60 → x=30, larger=60." },
        { text: "30°", correct: false, feedback: "Not correct — try the next one." },
        { text: "45°", correct: false, feedback: "Not correct — try the next one." },
        { text: "75°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "The angles of a triangle are in the ratio 1:2:3. Find the largest angle.",
    options: [
        { text: "90°", correct: true, feedback: "Total parts=6. One part=30. Largest=3×30=90°." },
        { text: "60°", correct: false, feedback: "Not correct — try the next one." },
        { text: "45°", correct: false, feedback: "Not correct — try the next one." },
        { text: "30°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (0,0) and radius 5. Which point lies on the circle? (3,4), (4,4), (5,5), (6,0)",
    options: [
        { text: "(3,4)", correct: true, feedback: "Distance = 5. (4,4) gives √32, (5,5) √50, (6,0) 6." },
        { text: "(4,4)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(5,5)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(6,0)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular pentagon has 5 sides, so 5 lines of symmetry." },
        { text: "3", correct: false, feedback: "Not correct — try the next one." },
        { text: "6", correct: false, feedback: "Not correct — try the next one." },
        { text: "10", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cuboid measures 8 cm × 3 cm × 2 cm. Find its total edge length.",
    options: [
        { text: "52 cm", correct: true, feedback: "4(8+3+2) = 52 cm." },
        { text: "48 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "56 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "60 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "A point is translated 3 units right and 2 units down from (2,5). Find the new coordinates.",
    options: [
        { text: "(5,3)", correct: true, feedback: "2+3=5, 5−2=3." },
        { text: "(5,7)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(0,3)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(2,5)", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    question: "An exterior angle of a triangle is 120°, and one interior opposite angle is 50°. Find the other interior opposite angle.",
    options: [
        { text: "70°", correct: true, feedback: "120 = 50 + x → x = 70°." },
        { text: "60°", correct: false, feedback: "Not correct — try the next one." },
        { text: "80°", correct: false, feedback: "Not correct — try the next one." },
        { text: "110°", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    question: "An isosceles triangle has perimeter 36 cm and unequal side 12 cm. Find the length of each equal side.",
    options: [
        { text: "12 cm", correct: true, feedback: "(36−12)/2 = 12 cm." },
        { text: "10 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "14 cm", correct: false, feedback: "Not correct — try the next one." },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    question: "A circle has centre (1,2) and radius 5. Is the point (4,5) inside, on, or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "Distance² = 3²+3² = 18 < 25 → inside." },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one." },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    question: "Which shape has exactly one line of symmetry?",
    options: [
        { text: "Isosceles triangle", correct: true, feedback: "An isosceles triangle has exactly one line of symmetry." },
        { text: "Square", correct: false, feedback: "Not correct — try the next one." },
        { text: "Circle", correct: false, feedback: "Not correct — try the next one." },
        { text: "Parallelogram", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    question: "A cube has volume 125 cm³. Find its surface area.",
    options: [
        { text: "150 cm²", correct: true, feedback: "Edge = ∛125 = 5 cm. SA = 6 × 25 = 150 cm²." },
        { text: "125 cm²", correct: false, feedback: "Not correct — try the next one." },
        { text: "30 cm²", correct: false, feedback: "Not correct — try the next one." },
        { text: "100 cm²", correct: false, feedback: "Not correct — try the next one." }
      ]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    question: "Three vertices of a rectangle are (0,0), (0,2), (3,0). Find the fourth vertex.",
    options: [
        { text: "(3,2)", correct: true, feedback: "Missing x=3, y=2." },
        { text: "(2,3)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(0,2)", correct: false, feedback: "Not correct — try the next one." },
        { text: "(3,0)", correct: false, feedback: "Not correct — try the next one." }
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
    title: "Geometry — Problem-Solving & Synthesis",
    subtitle: "Telangana & Cambridge · Level 3 · Problem-Solving & Synthesis",
    description: "Non-routine synthesis problems: algebraic angle systems, circle distance formulas, coordinate reflections, and composite shape properties.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<strong>Quick Review — Synthesis Tips</strong><br>\n        • Supplementary angles sum to 180°; complementary sum to 90°.<br>\n        • Triangle angle sum is 180°. Use variables and ratios to find unknown angles.<br>\n        • Circle: distance from centre = radius determines if a point is on/inside/outside the circle.<br>\n        • Symmetry: reflection over x-axis (y → −y), y-axis (x → −x), y=x (swap x and y).<br>\n        • 3D shapes: total edge length = 4(l+b+h) for cuboid, 12×edge for cube. Volume = l×b×h.<br>\n        • Coordinate transformations: translation — add/subtract from coordinates; reflection — use mirror line.",
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

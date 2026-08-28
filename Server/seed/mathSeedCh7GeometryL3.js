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
    skillId: "GEOLINES-04",
    question: "Two supplementary angles differ by 50°. Find the smaller angle.",
    options: [
        { text: "65°", correct: true, feedback: "Let smaller = x, larger = x+50. x + (x+50) = 180 → 2x = 130 → x = 65°." },
        { text: "115°", correct: false, feedback: "That's the larger angle.", misconceptionId: "E-w1-a" },
        { text: "50°", correct: false, feedback: "Incorrect equation.", misconceptionId: "E-w1-b" },
        { text: "130°", correct: false, feedback: "Incorrect.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Let the smaller angle be x. Then the larger is x+50. Their sum is 180°.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student correctly solves for x=65 but reports the larger angle (x+50=115) instead of the smaller angle requested.",
        rootCause: "Wrong Value Reported — confuses the larger angle with the smaller angle that the question asks for.",
        remediation: "The question asks for the SMALLER angle — after solving x=65, the smaller angle IS x=65°, and the larger angle (x+50=115°) is a different value."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student reports the given difference (50°) instead of solving for the actual smaller angle.",
        rootCause: "Wrong Value Reported — confuses the given difference with the requested angle.",
        remediation: "50° is just the DIFFERENCE stated in the problem, not either angle itself — solve the equation x+(x+50)=180 to find the actual smaller angle: 65°."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports the intermediate value 2x=130 as if it were the final answer, forgetting to divide by 2.",
        rootCause: "Final Division Step Omitted — stops before completing the last step of solving for x.",
        remediation: "130 is the value of 2x, not x itself — divide by 2 to get the final answer: 130÷2=65°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = x+50." },
      { level: 2, description: "Apply the sum rule", hint: "x + (x+50) = 180." },
      { level: 3, description: "Solve for the smaller angle", hint: "2x=130, so x=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-07",
    question: "The angles of a triangle are (x+15)°, (2x−15)°, and (3x−30)°. Find x.",
    options: [
        { text: "35", correct: true, feedback: "Sum = (x+15)+(2x−15)+(3x−30) = 6x−30 = 180 → 6x = 210 → x = 35." },
        { text: "30", correct: false, feedback: "Then sum would be 150°.", misconceptionId: "E-w2-a" },
        { text: "40", correct: false, feedback: "Sum would be 210°.", misconceptionId: "E-w2-b" },
        { text: "25", correct: false, feedback: "Sum would be 120°.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Add the three expressions and set equal to 180°.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student guesses or miscalculates a value of x that produces a total below 180°, without solving the equation precisely.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate x, instead estimating or guessing.",
        remediation: "Combine like terms first: (x+15)+(2x-15)+(3x-30)=6x-30. Set this equal to 180 and solve algebraically: 6x=210, x=35 — verify by checking 6(35)-30=180."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student makes an error combining the like terms, leading to an equation that yields a sum exceeding 180° when checked.",
        rootCause: "Like-Terms Combination Error — miscombines the coefficients or constants when simplifying the sum of the three expressions.",
        remediation: "Carefully combine: coefficients of x sum to 1+2+3=6, constants sum to 15-15-30=-30, giving 6x-30 — recheck this combination before setting it equal to 180."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student makes an algebraic error solving 6x-30=180, landing on x=25 instead of x=35.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Solve step by step: 6x-30=180 → 6x=210 (add 30 to both sides) → x=35 (divide by 6) — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the three expressions", hint: "(x+15)+(2x-15)+(3x-30) = 6x - 30." },
      { level: 2, description: "Set equal to 180", hint: "6x - 30 = 180." },
      { level: 3, description: "Solve for x", hint: "6x = 210, so x = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Combining like terms across three algebraic angle expressions is a direct precursor to multi-term algebraic simplification." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-06",
    question: "A circle has centre (3,4) and passes through the origin (0,0). What is its radius?",
    options: [
        { text: "5", correct: true, feedback: "Distance = √((3−0)² + (4−0)²) = √(9+16) = √25 = 5." },
        { text: "3", correct: false, feedback: "That's just the x‑coordinate.", misconceptionId: "E-w3-a" },
        { text: "4", correct: false, feedback: "That's the y‑coordinate.", misconceptionId: "E-w3-b" },
        { text: "7", correct: false, feedback: "You added 3+4 instead of using Pythagoras.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "Use the distance formula: √((x₂−x₁)² + (y₂−y₁)²).",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student reports only the x-coordinate of the centre (3) instead of computing the actual straight-line distance to the origin.",
        rootCause: "Distance Formula Not Applied — uses a single coordinate value instead of the full distance calculation.",
        remediation: "The radius is the STRAIGHT-LINE distance from the centre to a point on the circle — you must apply the distance formula (using both coordinates), not just report one coordinate."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student reports only the y-coordinate of the centre (4) instead of computing the actual straight-line distance to the origin.",
        rootCause: "Distance Formula Not Applied — uses a single coordinate value instead of the full distance calculation.",
        remediation: "The radius is the STRAIGHT-LINE distance from the centre to a point on the circle — you must apply the distance formula (using both coordinates), not just report one coordinate."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student adds the two coordinate differences (3+4=7) instead of using the Pythagorean distance formula.",
        rootCause: "Distance Formula Misapplied — treats the distance as a simple sum instead of the square-root-of-sum-of-squares.",
        remediation: "Straight-line distance uses the Pythagorean theorem: √(3²+4²)=√(9+16)=√25=5 — you must SQUARE each difference, ADD them, then take the SQUARE ROOT, not just add the raw differences."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the coordinate differences", hint: "From (0,0) to (3,4): the differences are 3 and 4." },
      { level: 2, description: "Apply the distance formula", hint: "√(3² + 4²)." },
      { level: 3, description: "Compute", hint: "√(9+16) = √25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-08",
    question: "A regular polygon has each interior angle 135°. How many lines of symmetry does it have?",
    options: [
        { text: "8", correct: true, feedback: "Interior angle = (n−2)×180/n = 135 → n=8 (octagon). Lines of symmetry = n = 8." },
        { text: "6", correct: false, feedback: "That would be a hexagon (interior 120°).", misconceptionId: "E-w4-a" },
        { text: "10", correct: false, feedback: "Decagon interior = 144°.", misconceptionId: "E-w4-b" },
        { text: "5", correct: false, feedback: "Pentagon interior = 108°.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "First find the number of sides from the interior angle formula, then symmetry lines = number of sides.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student assumes the polygon is a hexagon without verifying its interior angle actually matches the stated 135°.",
        rootCause: "Interior Angle Formula Not Applied — guesses a polygon instead of solving the formula for n.",
        remediation: "Use the interior angle formula (n-2)×180/n=135 and solve for n algebraically — this gives n=8 (octagon), not 6 (hexagon, whose interior angle is actually 120°, not 135°)."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student assumes the polygon is a decagon without verifying its interior angle actually matches the stated 135°.",
        rootCause: "Interior Angle Formula Not Applied — guesses a polygon instead of solving the formula for n.",
        remediation: "Use the interior angle formula (n-2)×180/n=135 and solve for n algebraically — this gives n=8 (octagon), not 10 (decagon, whose interior angle is actually 144°, not 135°)."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student assumes the polygon is a pentagon without verifying its interior angle actually matches the stated 135°.",
        rootCause: "Interior Angle Formula Not Applied — guesses a polygon instead of solving the formula for n.",
        remediation: "Use the interior angle formula (n-2)×180/n=135 and solve for n algebraically — this gives n=8 (octagon), not 5 (pentagon, whose interior angle is actually 108°, not 135°)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the interior angle formula", hint: "Interior angle = (n-2)×180/n." },
      { level: 2, description: "Set up the equation", hint: "(n-2)×180/n = 135." },
      { level: 3, description: "Solve for n", hint: "180n - 360 = 135n → 45n = 360, so n = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-09",
    question: "A cuboid measures 6 cm × 4 cm × 2 cm. A cube has the same total edge length as the cuboid. Find the cube's volume.",
    options: [
        { text: "64 cm³", correct: true, feedback: "Cuboid edges = 4(6+4+2)=48 cm. Cube edge = 48/12=4 cm. Volume = 4³ = 64 cm³." },
        { text: "48 cm³", correct: false, feedback: "That's the total edge length, not volume.", misconceptionId: "E-w5-a" },
        { text: "32 cm³", correct: false, feedback: "Incorrect edge length.", misconceptionId: "E-w5-b" },
        { text: "128 cm³", correct: false, feedback: "Incorrect.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Total edge length of cuboid = 4(l+b+h). Cube has 12 equal edges.",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student correctly computes the total edge length (48) but reports it directly as the volume, without finding the cube's edge and cubing it.",
        rootCause: "Multi-Step Process Abandoned — stops after finding the total edge length instead of continuing to find volume.",
        remediation: "48 cm is only the TOTAL EDGE LENGTH — you must then find the cube's individual edge (48÷12=4) and CUBE it (4³=64) to get the volume."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student finds an incorrect cube edge length, perhaps dividing by the wrong number instead of 12.",
        rootCause: "Wrong Divisor Applied — divides the total edge length by an incorrect number of edges.",
        remediation: "A cube has exactly 12 edges — divide the total edge length by 12, not a different number: 48÷12=4 cm edge length."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student makes an error cubing the edge length, perhaps computing 4×4×2 or another incorrect combination instead of 4×4×4.",
        rootCause: "Cubing Computation Error — miscalculates the cube of the edge length.",
        remediation: "Volume of a cube = edge × edge × edge (all three factors the SAME) = 4×4×4=64, not a mix of different numbers."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cuboid's total edge length", hint: "4 × (6+4+2) = ?" },
      { level: 2, description: "Find the cube's edge length", hint: "A cube has 12 equal edges — divide the total by 12." },
      { level: 3, description: "Find the cube's volume", hint: "Volume = edge × edge × edge." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-07",
    question: "A point is translated 1 unit right and 4 up, then 3 left and 2 down, ending at (4,5). Find the starting point.",
    options: [
        { text: "(6,3)", correct: true, feedback: "Net translation = (1−3, 4−2) = (−2, +2). Reverse: (4+2, 5−2) = (6,3)." },
        { text: "(2,7)", correct: false, feedback: "You added incorrectly.", misconceptionId: "E-w6-a" },
        { text: "(4,5)", correct: false, feedback: "No movement.", misconceptionId: "E-w6-b" },
        { text: "(8,1)", correct: false, feedback: "Wrong reversal.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Combine the two translations into one net movement, then reverse it.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student makes an error combining the two translations into a net movement, leading to a wrong reversal.",
        rootCause: "Net Translation Computation Error — miscombines the horizontal or vertical components of the two movements.",
        remediation: "Combine carefully: horizontal (1 right, then 3 left) = 1-3=-2; vertical (4 up, then 2 down) = 4-2=+2 — recheck this net combination before reversing."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student assumes the two translations cancel out entirely, reporting the ending point as the starting point.",
        rootCause: "Net Movement Assumed Zero — doesn't verify whether the two translations actually cancel completely.",
        remediation: "Check whether the net translation is truly zero: net = (1-3, 4-2) = (-2, +2), which is NOT (0,0) — the translations don't fully cancel, so the starting point differs from the ending point."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student applies the net translation FORWARD from the ending point instead of REVERSING it to find the start.",
        rootCause: "Reversal Direction Confusion — adds the net translation instead of subtracting it (or vice versa) when working backwards.",
        remediation: "To find the START from the END, REVERSE the net translation (subtract it): if net movement was (-2,+2), reverse by doing the OPPOSITE: (4-(-2), 5-2) = (4+2, 3) = (6,3)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the translations", hint: "Right/left: 1-3=-2. Up/down: 4-2=+2." },
      { level: 2, description: "Recognise the net movement", hint: "Net translation = (-2, +2)." },
      { level: 3, description: "Reverse to find the start", hint: "Start = End - Net translation = (4-(-2), 5-2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOTRI-09",
    question: "In a triangle, one angle is three times the smallest angle, and the third angle is 40° more than the smallest. Find the largest angle.",
    options: [
        { text: "84°", correct: true, feedback: "Let smallest = x. Angles: x, 3x, x+40. Sum = 5x+40 = 180 → x=28. Largest = 3x = 84°." },
        { text: "68°", correct: false, feedback: "That's the middle angle.", misconceptionId: "E-w7-a" },
        { text: "28°", correct: false, feedback: "That's the smallest.", misconceptionId: "E-w7-b" },
        { text: "90°", correct: false, feedback: "Incorrect.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Let smallest angle = x. Express the other two in terms of x and sum to 180°.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student correctly solves for x=28 but reports the middle angle (x+40=68) instead of the largest angle (3x=84) requested.",
        rootCause: "Wrong Value Reported — confuses the middle angle with the largest angle that the question asks for.",
        remediation: "The question asks for the LARGEST angle — after solving x=28, compare all three angles (28, 84, 68) and identify the largest, which is 3x=84°, not x+40=68° (the middle one)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student correctly solves for x=28 but reports the smallest angle itself instead of the largest angle requested.",
        rootCause: "Wrong Value Reported — confuses the smallest angle with the largest angle that the question asks for.",
        remediation: "The question asks for the LARGEST angle — x=28 is the SMALLEST angle; the largest is 3x=3×28=84°."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student makes an algebraic error solving the equation or identifying the correct expression for the largest angle, landing on 90° instead of 84°.",
        rootCause: "Equation-Solving Error — a miscalculation somewhere in setting up or solving the equation.",
        remediation: "Set up carefully: x + 3x + (x+40) = 180 → 5x+40=180 → 5x=140 → x=28. The largest angle is 3x=84° — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smallest angle = x. The other two are 3x and x+40." },
      { level: 2, description: "Apply the triangle angle sum", hint: "x + 3x + (x+40) = 180." },
      { level: 3, description: "Solve and identify the largest", hint: "5x=140, so x=28. Compare x, 3x, and x+40 to find the largest." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Setting up and solving a three-term algebraic angle equation is a direct precursor to multi-variable algebraic word problems." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-07",
    question: "A circle has centre (2,2) and passes through (5,6). Which point lies inside the circle? (4,3), (7,5), (6,6), (5,6)",
    options: [
        { text: "(4,3)", correct: true, feedback: "Radius² = 3²+4² = 25. (4,3) distance² = 2²+1² = 5 < 25 → inside." },
        { text: "(7,5)", correct: false, feedback: "Distance² = 5²+3² = 34 > 25 → outside.", misconceptionId: "E-w8-a" },
        { text: "(6,6)", correct: false, feedback: "Distance² = 4²+4² = 32 > 25 → outside.", misconceptionId: "E-w8-b" },
        { text: "(5,6)", correct: false, feedback: "Distance² = 25 → on the circle.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Find the radius squared, then check each point's distance squared from the centre.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student picks (7,5), which is actually OUTSIDE the circle (distance² 34 > radius² 25), without computing the comparison.",
        rootCause: "Distance Comparison Skipped — picks a point without verifying its distance² against the radius².",
        remediation: "For EACH candidate point, compute distance² from the centre and compare to radius² (25) — (7,5) gives 34, which is greater than 25, so it's outside, not inside."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student picks (6,6), which is actually OUTSIDE the circle (distance² 32 > radius² 25), without computing the comparison.",
        rootCause: "Distance Comparison Skipped — picks a point without verifying its distance² against the radius².",
        remediation: "For EACH candidate point, compute distance² from the centre and compare to radius² (25) — (6,6) gives 32, which is greater than 25, so it's outside, not inside."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student picks (5,6), which is the point the circle passes through (distance² exactly 25, ON the circle, not inside).",
        rootCause: "On-Circle vs. Inside Confusion — doesn't distinguish a point exactly ON the circle from one strictly INSIDE it.",
        remediation: "'Inside' requires distance² STRICTLY LESS than radius² — (5,6) gives exactly 25, equal to the radius², meaning it's ON the circle (this is the defining point), not inside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the radius squared", hint: "From centre (2,2) to (5,6): 3²+4²=25." },
      { level: 2, description: "Compute each point's distance squared", hint: "For (4,3): (4-2)²+(3-2)²=4+1=5." },
      { level: 3, description: "Compare to find 'inside'", hint: "Which point's distance² is LESS than 25?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-05",
    question: "Two complementary angles: one is 10° more than three times the other. Find the larger angle.",
    options: [
        { text: "70°", correct: true, feedback: "x + (3x+10) = 90 → 4x = 80 → x = 20, larger = 3×20+10 = 70°." },
        { text: "20°", correct: false, feedback: "That's the smaller angle.", misconceptionId: "E-d1-a" },
        { text: "60°", correct: false, feedback: "Incorrect equation.", misconceptionId: "E-d1-b" },
        { text: "80°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d1-c" }
      ],
    backward: "Complementary angles sum to 90°. Set up the equation carefully.",
    forward: "Algebraic angle problems appear in exams and real‑world design.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student correctly solves for x=20 but reports the smaller angle instead of the larger angle (3x+10) requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle with the larger angle that the question asks for.",
        remediation: "The question asks for the LARGER angle — after solving x=20, the larger angle is 3x+10=70°, not x=20° (that's the smaller one)."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student sets up the equation incorrectly, perhaps misplacing where the '+10' term belongs, leading to a wrong answer.",
        rootCause: "Equation Setup Error — misrepresents '10° more than three times the other' in the algebraic expression.",
        remediation: "'10° more than three times the other' means 3×(other)+10 — set the smaller angle as x, and the larger as 3x+10, then sum to 90: x+(3x+10)=90."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student makes an algebraic error while solving, landing on 80° instead of 70°.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Solve step by step: x+3x+10=90 → 4x+10=90 → 4x=80 → x=20. The larger angle is 3(20)+10=70 — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = 3x+10." },
      { level: 2, description: "Apply the complementary sum rule", hint: "x + (3x+10) = 90." },
      { level: 3, description: "Solve and identify the larger angle", hint: "4x=80, so x=20. The LARGER angle is 3x+10." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a multi-term algebraic angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-07",
    question: "In a triangle, the second angle is twice the first, and the third is 20° more than the second. Find the first angle.",
    options: [
        { text: "32°", correct: true, feedback: "Angles: x, 2x, 2x+20. Sum = 5x+20 = 180 → x = 32." },
        { text: "30°", correct: false, feedback: "Then sum would be 170°.", misconceptionId: "E-d2-a" },
        { text: "36°", correct: false, feedback: "Sum would be 200°.", misconceptionId: "E-d2-b" },
        { text: "40°", correct: false, feedback: "Sum would be 220°.", misconceptionId: "E-d2-c" }
      ],
    backward: "Express all angles in terms of the first, sum to 180°.",
    forward: "Using variables for unknown angles builds algebraic thinking.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student guesses a value of x that produces a total below 180°, without solving the equation precisely.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate x, instead estimating or guessing.",
        remediation: "Set up the equation carefully: x+2x+(2x+20)=180 → 5x+20=180 → 5x=160 → x=32 — verify by checking 32+64+84=180."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student guesses a value of x that overshoots 180°, without solving the equation precisely.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate x, instead estimating or guessing.",
        remediation: "Set up the equation carefully: x+2x+(2x+20)=180, then solve algebraically rather than guessing — this gives x=32, not 36."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student makes an even larger overestimate, guessing x=40 without verifying it satisfies the equation.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate x, instead estimating or guessing.",
        remediation: "Always verify your answer: substitute x=40 into x+2x+(2x+20) to get 40+80+100=220, which exceeds 180° — this confirms 40 is too large; the correct value is x=32."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Express all angles in terms of x", hint: "First = x, second = 2x, third = 2x+20." },
      { level: 2, description: "Sum and set equal to 180", hint: "x + 2x + (2x+20) = 180." },
      { level: 3, description: "Solve for x", hint: "5x + 20 = 180, so 5x = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a multi-term algebraic angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-08",
    question: "A circle has centre (2,3) and radius 5. Which point lies on the circle? (6,6), (7,6), (3,7), (5,8)",
    options: [
        { text: "(6,6)", correct: true, feedback: "Distance² = (6−2)²+(6−3)² = 4²+3² = 25 = 5² → on the circle." },
        { text: "(7,6)", correct: false, feedback: "Distance² = 5²+3² = 34 > 25.", misconceptionId: "E-d3-a" },
        { text: "(3,7)", correct: false, feedback: "Distance² = 1²+4² = 17.", misconceptionId: "E-d3-b" },
        { text: "(5,8)", correct: false, feedback: "Distance² = 3²+5² = 34.", misconceptionId: "E-d3-c" }
      ],
    backward: "A point is on the circle if its distance from the centre equals the radius.",
    forward: "Combining coordinates and circle definitions prepares for analytic geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student picks (7,6) without computing its distance² from the centre and comparing to the radius².",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance² equals radius².",
        remediation: "For EACH candidate point, compute (x-2)²+(y-3)² and compare to 25 (radius²) — (7,6) gives 34, not 25, so it's NOT on the circle."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student picks (3,7) without computing its distance² from the centre and comparing to the radius².",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance² equals radius².",
        remediation: "For EACH candidate point, compute (x-2)²+(y-3)² and compare to 25 — (3,7) gives 17, not 25, so it's NOT on the circle."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student picks (5,8) without computing its distance² from the centre and comparing to the radius².",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance² equals radius².",
        remediation: "For EACH candidate point, compute (x-2)²+(y-3)² and compare to 25 — (5,8) gives 34, not 25, so it's NOT on the circle."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the radius squared", hint: "Radius = 5, so radius² = 25." },
      { level: 2, description: "Compute each point's distance squared from the centre", hint: "(x-2)² + (y-3)² for each candidate." },
      { level: 3, description: "Find the match", hint: "Which point's distance² exactly equals 25?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-07",
    question: "A shape has exactly 2 lines of symmetry, rotational symmetry of order 2, and all sides equal. Which shape is it?",
    options: [
        { text: "Rhombus", correct: true, feedback: "A rhombus (non‑square) has all sides equal, 2 lines (its diagonals), and order‑2 rotation." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry.", misconceptionId: "E-d4-a" },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A rectangle does not have all sides equal.", misconceptionId: "E-d4-b" },
        { text: "Kite", correct: false, feedback: "A kite generally has only 1 line of symmetry.", misconceptionId: "E-d4-c" }
      ],
    backward: "A rhombus has all sides equal, order‑2 rotation, and 2 lines of symmetry (diagonals).",
    forward: "Classifying shapes by multiple symmetry properties deepens understanding.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student picks the square, which does have all sides equal, but has 4 lines of symmetry (not the required 2).",
        rootCause: "Symmetry Count Mismatch — satisfies the equal-sides condition but not the specific symmetry-count condition.",
        remediation: "A square DOES have all sides equal, but it has 4 lines of symmetry (2 midlines + 2 diagonals) — the question requires exactly 2, which a general (non-square) rhombus satisfies instead."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student picks a rectangle, which may satisfy the symmetry conditions but does NOT have all sides equal.",
        rootCause: "Equal-Sides Condition Ignored — satisfies some conditions but not the equal-sides requirement.",
        remediation: "A non-square rectangle has 2 lines of symmetry and order-2 rotation, BUT its sides are NOT all equal (length ≠ width) — the question requires ALL THREE conditions together, which only a rhombus satisfies."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student picks a kite, which can have all sides equal in special cases but generally has only 1 line of symmetry and no order-2 rotation.",
        rootCause: "Symmetry Property Mismatch — doesn't verify the kite satisfies the symmetry-count and rotation conditions.",
        remediation: "A general kite has only 1 line of symmetry and NO rotational symmetry (order 1, not 2) — this fails two of the three required conditions; a rhombus satisfies all three."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List shapes with all equal sides", hint: "Square, rhombus, and special kites can have equal sides." },
      { level: 2, description: "Check each one's symmetry properties", hint: "Square=4 lines, rhombus=2 lines with order-2 rotation, kite=1 line, no rotation." },
      { level: 3, description: "Match all three conditions", hint: "Which shape has equal sides AND exactly 2 lines AND order-2 rotation?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-09",
    question: "A cube's total edge length is 60 cm. A cuboid has the same total edge length, with length 6 cm and width 4 cm. Find the cuboid's height.",
    options: [
        { text: "5 cm", correct: true, feedback: "Cube edge = 60/12 = 5 cm. Cuboid: 4(6+4+h) = 60 → 10+h = 15 → h = 5 cm." },
        { text: "3 cm", correct: false, feedback: "Then total edges = 4(13)=52.", misconceptionId: "E-d5-a" },
        { text: "4 cm", correct: false, feedback: "Total edges = 4(14)=56.", misconceptionId: "E-d5-b" },
        { text: "6 cm", correct: false, feedback: "Total edges = 4(16)=64.", misconceptionId: "E-d5-c" }
      ],
    backward: "Total edges = 4(l+b+h). First find the sum l+b+h, then subtract known dimensions.",
    forward: "Linking cube and cuboid properties through edge sums.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student guesses a height value without solving the equation 4(6+4+h)=60 precisely, landing on a value too small.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate h, instead estimating.",
        remediation: "Solve step by step: 4(6+4+h)=60 → 6+4+h=15 (divide both sides by 4) → 10+h=15 → h=5 — verify by checking 4(6+4+5)=4×15=60."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student guesses a height value that's close but doesn't satisfy the equation exactly, landing on 4 instead of 5.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate h, instead estimating.",
        remediation: "Verify by substitution: 4(6+4+4)=4×14=56, not 60 — this confirms h=4 is incorrect; solve the equation to find the correct h=5."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student guesses a height value that overshoots, landing on 6 instead of 5.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate h, instead estimating.",
        remediation: "Verify by substitution: 4(6+4+6)=4×16=64, not 60 — this confirms h=6 is incorrect; solve the equation to find the correct h=5."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the sum of dimensions from the total edge length", hint: "4(l+b+h)=60, so l+b+h=15." },
      { level: 2, description: "Substitute the known dimensions", hint: "6 + 4 + h = 15." },
      { level: 3, description: "Solve for h", hint: "10 + h = 15, so h = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-08",
    question: "Three vertices of a rectangle are (1,2), (1,5), (4,2). Reflect the fourth vertex over the line x=3. Find the reflected coordinates.",
    options: [
        { text: "(2,5)", correct: true, feedback: "Fourth vertex = (4,5). Reflect over x=3: x' = 2×3−4 = 2, y unchanged → (2,5)." },
        { text: "(4,5)", correct: false, feedback: "That's the original fourth vertex.", misconceptionId: "E-d6-a" },
        { text: "(5,2)", correct: false, feedback: "Swapped coordinates.", misconceptionId: "E-d6-b" },
        { text: "(2,2)", correct: false, feedback: "Incorrect reflection.", misconceptionId: "E-d6-c" }
      ],
    backward: "Reflect by finding the image: x' = 2k − x, y' = y.",
    forward: "Coordinate reflections are used in computer graphics and design.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student correctly finds the fourth vertex (4,5) but stops there without applying the reflection over x=3.",
        rootCause: "Reflection Step Omitted — treats the intermediate fourth-vertex calculation as the complete answer.",
        remediation: "Finding the fourth vertex (4,5) is only step one — the question asks to REFLECT it over x=3, which requires applying the reflection formula: x'=2(3)-4=2."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student swaps the x and y coordinates instead of correctly applying the reflection formula to just the x-coordinate.",
        rootCause: "Reflection Formula Misapplied — confuses reflecting over a vertical line (x=3) with swapping coordinates (like reflecting over y=x).",
        remediation: "Reflecting over a VERTICAL line (x=3) only changes the x-coordinate (using x'=2k-x); the y-coordinate stays UNCHANGED — don't swap x and y, which is only for reflecting over y=x."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student makes an error applying the reflection formula, landing on an incorrect x-coordinate and keeping y unchanged.",
        rootCause: "Reflection Formula Computation Error — miscalculates x'=2k-x.",
        remediation: "Recompute: x'=2(3)-4=6-4=2, and y stays at 5 — verify by checking the fourth vertex (4) and its reflection (2) are equidistant from the mirror line (x=3): both are 1 unit away."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the fourth vertex", hint: "The rectangle's fourth vertex shares x=4 (from (4,2)) and y=5 (from (1,5))." },
      { level: 2, description: "Apply the reflection formula", hint: "x' = 2×3 - 4 (reflecting the x-coordinate over x=3)." },
      { level: 3, description: "Keep y unchanged", hint: "Reflecting over a vertical line doesn't change y — what's the final point?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOTRI-10",
    question: "An exterior angle of a triangle is 130°, and one interior opposite angle is 50°. Find the other interior opposite angle.",
    options: [
        { text: "80°", correct: true, feedback: "Exterior angle = sum of two interior opposite angles → 130 = 50 + x → x = 80°." },
        { text: "100°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-a" },
        { text: "50°", correct: false, feedback: "That's the given angle.", misconceptionId: "E-d7-b" },
        { text: "60°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    backward: "Exterior angle = sum of interior opposite angles.",
    forward: "This property is used in navigation and construction.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student makes an error applying the exterior angle theorem, perhaps subtracting incorrectly, landing on 100° instead of 80°.",
        rootCause: "Exterior Angle Theorem Computation Error — a miscalculation applying 130=50+x.",
        remediation: "Recompute: 130-50=80 — verify by checking 50+80=130, confirming the exterior angle theorem holds."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student reports the given angle (50°) instead of solving for the other unknown interior angle.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested unknown angle.",
        remediation: "The question asks for the OTHER interior opposite angle, not the one already given (50°) — subtract 50 from the exterior angle (130) to find it: 130-50=80."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student makes a computational error, landing on 60° instead of the correct 80°.",
        rootCause: "Exterior Angle Theorem Computation Error — a different miscalculation applying the theorem.",
        remediation: "Use the exterior angle theorem: exterior angle = sum of the two non-adjacent interior angles — 130 = 50 + x, so x = 130 - 50 = 80, not 60."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the exterior angle theorem", hint: "An exterior angle equals the sum of the two non-adjacent (opposite) interior angles." },
      { level: 2, description: "Set up the equation", hint: "130 = 50 + x." },
      { level: 3, description: "Solve for x", hint: "130 - 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-11",
    question: "An isosceles triangle has perimeter 32 cm. The unequal side is 10 cm. Find the length of each equal side.",
    options: [
        { text: "11 cm", correct: true, feedback: "(32 − 10) ÷ 2 = 11 cm." },
        { text: "10 cm", correct: false, feedback: "That's the unequal side.", misconceptionId: "E-d8-a" },
        { text: "12 cm", correct: false, feedback: "Then perimeter = 34 cm.", misconceptionId: "E-d8-b" },
        { text: "14 cm", correct: false, feedback: "Then perimeter = 38 cm.", misconceptionId: "E-d8-c" }
      ],
    backward: "Subtract the unequal side from the perimeter, then divide by 2.",
    forward: "Perimeter problems with triangles are common in real‑world measurements.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student reports the given unequal side (10 cm) instead of computing the equal sides.",
        rootCause: "Wrong Value Reported — confuses the given unequal side with the requested equal sides.",
        remediation: "The question asks for the EQUAL sides, not the unequal side already given (10 cm) — subtract 10 from the perimeter (32) and divide by 2: (32-10)÷2=11."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student guesses a value for the equal sides without verifying the total perimeter matches 32 cm.",
        rootCause: "Perimeter Verification Skipped — doesn't check that the guessed answer produces the correct total perimeter.",
        remediation: "Verify: if each equal side is 12, the perimeter would be 10+12+12=34, not 32 — this confirms 12 is wrong; the correct value is 11, giving 10+11+11=32."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student guesses a larger value for the equal sides, overshooting the correct perimeter.",
        rootCause: "Perimeter Verification Skipped — doesn't check that the guessed answer produces the correct total perimeter.",
        remediation: "Verify: if each equal side is 14, the perimeter would be 10+14+14=38, not 32 — this confirms 14 is wrong; solve (32-10)÷2 to find the correct value: 11."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract the unequal side from the perimeter", hint: "32 - 10 = ?" },
      { level: 2, description: "Divide the remainder equally", hint: "The remaining length is split between the two equal sides." },
      { level: 3, description: "Compute", hint: "22 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-09",
    question: "A circle has centre (5,5) and passes through (9,8). Find the x‑coordinate of the point on the circle with y=5 that lies to the left of the centre.",
    options: [
        { text: "0", correct: true, feedback: "Radius² = 4²+3² = 25. For y=5: (x−5)² = 25 → x−5 = ±5 → x=10 or 0. Left of centre → x=0." },
        { text: "10", correct: false, feedback: "That's the point to the right.", misconceptionId: "E-d9-a" },
        { text: "5", correct: false, feedback: "That's the centre.", misconceptionId: "E-d9-b" },
        { text: "−5", correct: false, feedback: "Incorrect.", misconceptionId: "E-d9-c" }
      ],
    backward: "Set y=5 in the circle equation, solve for x, pick the one left of centre.",
    forward: "Finding specific points on a circle links algebra and geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student correctly finds both solutions (x=10 and x=0) but picks the one to the RIGHT of centre instead of LEFT as requested.",
        rootCause: "Wrong Solution Selected — solves correctly but picks the wrong one of the two valid solutions.",
        remediation: "Both x=10 and x=0 are valid points on the circle at y=5 — but the question asks for the point LEFT of the centre (x=5); since 0<5, the correct choice is x=0, not x=10."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student reports the centre's x-coordinate (5) instead of solving for the actual point on the circle.",
        rootCause: "Wrong Value Reported — confuses the centre's coordinate with a point on the circle's edge.",
        remediation: "The centre (5,5) is NOT on the circle itself — you must solve (x-5)²=25 to find points that ARE on the circle at y=5, giving x=10 or x=0."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student makes an algebraic error solving (x-5)²=25, perhaps forgetting the ± when taking the square root, landing on a negative value.",
        rootCause: "Square Root Sign Error — forgets that taking a square root yields both a positive and negative solution.",
        remediation: "When solving (x-5)²=25, taking the square root gives x-5=±5, meaning TWO solutions: x=10 or x=0 — recompute rather than assuming a single negative solution."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the radius squared", hint: "From centre (5,5) to (9,8): 4²+3²=25." },
      { level: 2, description: "Substitute y=5 and solve for x", hint: "(x-5)²+(5-5)²=25 → (x-5)²=25." },
      { level: 3, description: "Find both solutions and pick the left one", hint: "x-5=±5 gives x=10 or x=0. Which is LESS than 5 (the centre's x)?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-09",
    question: "A rectangle 8 cm by 6 cm is folded in half along its vertical line of symmetry. Find the perimeter of the folded shape.",
    options: [
        { text: "22 cm", correct: true, feedback: "Folded dimensions: 8 cm by 3 cm. Perimeter = 2(8+3) = 22 cm." },
        { text: "20 cm", correct: false, feedback: "That would be if folded horizontally (8 by 3? no, horizontally folded would be 4 by 6, perimeter=20).", misconceptionId: "E-d10-a" },
        { text: "24 cm", correct: false, feedback: "Original perimeter?", misconceptionId: "E-d10-b" },
        { text: "28 cm", correct: false, feedback: "Original perimeter.", misconceptionId: "E-d10-c" }
      ],
    backward: "Folding along the vertical midline halves the width, not the length.",
    forward: "Symmetry and folding are used in paper engineering and packaging.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student halves the wrong dimension (the length, 8 cm, instead of the width, 6 cm), producing folded dimensions of 4 by 6 instead of 8 by 3.",
        rootCause: "Wrong Dimension Halved — folds along the wrong axis, halving length instead of width.",
        remediation: "The VERTICAL line of symmetry halves the WIDTH (the shorter 6 cm dimension), not the length (the 8 cm dimension) — folded dimensions become 8×3, not 4×6."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student computes the original (unfolded) perimeter instead of the folded shape's perimeter.",
        rootCause: "Folding Effect Not Applied — computes the perimeter of the original rectangle, ignoring the fold entirely.",
        remediation: "The question asks for the FOLDED shape's perimeter, not the original — after folding, the width halves to 3 cm, giving folded dimensions 8×3, with perimeter 2(8+3)=22, not the original 2(8+6)=28."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student computes the original (unfolded) rectangle's perimeter, forgetting the fold changes the dimensions.",
        rootCause: "Folding Effect Not Applied — computes the perimeter of the original rectangle, ignoring the fold entirely.",
        remediation: "28 cm is the ORIGINAL perimeter (2×(8+6)=28) — but folding changes the width from 6 to 3, giving a NEW perimeter of 2×(8+3)=22, not the original value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify which dimension the fold halves", hint: "The vertical line of symmetry halves the width (6 cm), not the length (8 cm)." },
      { level: 2, description: "Find the folded dimensions", hint: "Length stays 8 cm; width becomes 6÷2=3 cm." },
      { level: 3, description: "Compute the new perimeter", hint: "2 × (8 + 3) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-10",
    question: "A cuboid 4 cm × 5 cm × 10 cm is cut into two equal halves along a plane parallel to the smallest face. Find the volume of each half.",
    options: [
        { text: "100 cm³", correct: true, feedback: "Smallest face = 4×5. Cut parallel to it halves the 10 cm dimension → 4×5×5 = 100 cm³." },
        { text: "50 cm³", correct: false, feedback: "You might have quartered it.", misconceptionId: "E-d11-a" },
        { text: "200 cm³", correct: false, feedback: "That's the whole volume.", misconceptionId: "E-d11-b" },
        { text: "150 cm³", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    backward: "The cut is parallel to the 4×5 face, so the 10 cm side is halved.",
    forward: "Visualising cross‑sections builds spatial reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student divides the volume by 4 instead of 2, effectively quartering rather than halving the cuboid.",
        rootCause: "Wrong Division Applied — divides by an incorrect number instead of 2 for 'two equal halves'.",
        remediation: "The cuboid is cut into TWO equal halves, so divide the total volume by 2: 200÷2=100, not by 4."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student reports the total volume of the WHOLE cuboid instead of just one half.",
        rootCause: "Halving Step Omitted — computes the full volume without dividing by 2 for one half.",
        remediation: "First find the whole cuboid's volume (4×5×10=200), THEN divide by 2 to get the volume of just ONE half: 200÷2=100."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student makes an error identifying which dimension gets halved by the cut, leading to an incorrect half-volume.",
        rootCause: "Wrong Dimension Halved — halves a different dimension than the one perpendicular to the smallest face.",
        remediation: "The cut is PARALLEL to the smallest face (4×5), which means it slices through the LONGEST dimension (10 cm), halving it to 5 cm — recompute: 4×5×5=100, not a different combination."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the smallest face", hint: "The smallest face is 4 cm × 5 cm." },
      { level: 2, description: "Determine which dimension gets halved", hint: "A cut PARALLEL to the smallest face slices through the remaining dimension (10 cm)." },
      { level: 3, description: "Compute the half-volume", hint: "4 × 5 × (10÷2) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-07",
    question: "A point is translated 2 left and 5 up, then 4 right and 3 down, ending at (7,6). Find the starting point.",
    options: [
        { text: "(5,4)", correct: true, feedback: "Net translation = (−2+4, 5−3) = (+2, +2). Reverse: (7−2, 6−2) = (5,4)." },
        { text: "(3,8)", correct: false, feedback: "Incorrect reversal.", misconceptionId: "E-d12-a" },
        { text: "(9,2)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d12-b" },
        { text: "(9,8)", correct: false, feedback: "You added the net translation instead of reversing it.", misconceptionId: "E-d12-c" }
      ],
    backward: "Combine translations first, then reverse.",
    forward: "Multiple translations are used in robotics and animation.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student makes an error combining or reversing the translations, landing on an incorrect starting point.",
        rootCause: "Net Translation Computation Error — miscombines or misreverses the horizontal or vertical components.",
        remediation: "Combine carefully: horizontal (2 left, then 4 right) = -2+4=+2; vertical (5 up, then 3 down) = 5-3=+2 — net translation is (+2,+2), then reverse: (7-2,6-2)=(5,4)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student makes a different computational error, landing on an incorrect starting point.",
        rootCause: "Net Translation Computation Error — a different miscalculation in combining or reversing.",
        remediation: "Recompute the net translation step by step: (-2+4, 5-3)=(2,2), then reverse by subtracting from the end point: (7-2, 6-2)=(5,4)."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student applies the net translation FORWARD from the ending point instead of REVERSING it to find the start.",
        rootCause: "Reversal Direction Confusion — adds the net translation instead of subtracting it when working backwards.",
        remediation: "To find the START from the END, REVERSE the net translation (subtract it): if net movement was (+2,+2), reverse by SUBTRACTING: (7-2, 6-2) = (5,4), not adding to get (9,8)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the translations", hint: "Left/right: -2+4=+2. Up/down: 5-3=+2." },
      { level: 2, description: "Recognise the net movement", hint: "Net translation = (+2, +2)." },
      { level: 3, description: "Reverse to find the start", hint: "Start = End - Net translation = (7-2, 6-2)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-06",
    question: "Two angles are supplementary. Twice the larger exceeds three times the smaller by 20°. Find the larger angle.",
    options: [
        { text: "112°", correct: true, feedback: "x+y=180, 2x−3y=20. Solve: x=112, y=68." },
        { text: "68°", correct: false, feedback: "That's the smaller angle.", misconceptionId: "E-d13-a" },
        { text: "90°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-b" },
        { text: "135°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    backward: "Set up a system of two equations.",
    forward: "Systems of equations appear in many geometry problems.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student correctly solves the system but reports the smaller angle (y=68) instead of the larger angle (x=112) requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle with the larger angle that the question asks for.",
        remediation: "The system gives TWO values: x=112 (larger) and y=68 (smaller) — the question asks for the LARGER angle, which is x=112, not y=68."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student assumes the two angles are equal (both 90°), ignoring the second equation that specifies a different relationship.",
        rootCause: "Second Equation Ignored — only applies the supplementary sum (x+y=180) without incorporating the additional condition (2x-3y=20).",
        remediation: "There are TWO conditions given: the angles are supplementary (x+y=180) AND twice the larger exceeds three times the smaller by 20 (2x-3y=20) — you must solve BOTH equations together, not just assume equal angles."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student makes an error solving the system of equations, landing on 135° instead of the correct 112°.",
        rootCause: "System-Solving Error — a miscalculation solving the two simultaneous equations.",
        remediation: "Solve by substitution: from x+y=180, y=180-x. Substitute into 2x-3y=20: 2x-3(180-x)=20 → 2x-540+3x=20 → 5x=560 → x=112 — recheck each algebraic step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up two equations", hint: "x+y=180 (supplementary) and 2x-3y=20 (the second condition)." },
      { level: 2, description: "Substitute to eliminate a variable", hint: "From the first equation, y=180-x. Substitute into the second." },
      { level: 3, description: "Solve for x", hint: "2x-3(180-x)=20 → 5x=560, so x=?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.5, condition: "Setting up and solving a system of two linear equations is a direct precursor to algebra's systems-of-equations topic." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-12",
    question: "A triangle has sides 7 cm, 8 cm, 9 cm. It is enlarged so that the longest side becomes 18 cm. Find the new perimeter.",
    options: [
        { text: "48 cm", correct: true, feedback: "Scale factor = 18/9 = 2. New sides = 14,16,18; perimeter = 48 cm." },
        { text: "36 cm", correct: false, feedback: "Original perimeter.", misconceptionId: "E-d14-a" },
        { text: "54 cm", correct: false, feedback: "Scale factor 1.5? No.", misconceptionId: "E-d14-b" },
        { text: "24 cm", correct: false, feedback: "Half.", misconceptionId: "E-d14-c" }
      ],
    backward: "Find the scale factor, apply to all sides, then sum.",
    forward: "Scaling is used in maps, models, and design.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student reports the original triangle's perimeter, ignoring the enlargement entirely.",
        rootCause: "Scale Factor Not Applied — computes the original perimeter without accounting for the enlargement.",
        remediation: "The question asks for the NEW (enlarged) perimeter — find the scale factor (18÷9=2), apply it to ALL sides (7×2=14, 8×2=16, 9×2=18), then sum: 14+16+18=48, not the original 24."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student uses an incorrect scale factor (1.5 instead of 2), leading to a wrong new perimeter.",
        rootCause: "Scale Factor Computation Error — miscalculates the ratio 18÷9.",
        remediation: "Recompute the scale factor: new longest side (18) ÷ original longest side (9) = 2, not 1.5 — apply this correct factor of 2 to all sides."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student halves the original perimeter instead of doubling it, applying the inverse scale factor.",
        rootCause: "Scale Factor Direction Confusion — divides instead of multiplying, since the triangle is being enlarged, not shrunk.",
        remediation: "Since the triangle is ENLARGED (9→18 is a doubling), the scale factor is 2 (multiply), not 0.5 (divide) — the new perimeter should be LARGER than the original, not smaller."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the scale factor", hint: "New longest side (18) ÷ original longest side (9) = ?" },
      { level: 2, description: "Apply the scale factor to all sides", hint: "7×2=?, 8×2=?, 9×2=18." },
      { level: 3, description: "Sum the new sides", hint: "14 + 16 + 18 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-10",
    question: "A circle has centre (2,3) and radius 5. The circle is reflected over the line x=4. What is the new centre?",
    options: [
        { text: "(6,3)", correct: true, feedback: "Reflect x‑coordinate: x' = 2×4 − 2 = 6; y unchanged." },
        { text: "(2,3)", correct: false, feedback: "Unchanged.", misconceptionId: "E-d15-a" },
        { text: "(4,3)", correct: false, feedback: "That's the mirror line.", misconceptionId: "E-d15-b" },
        { text: "(8,3)", correct: false, feedback: "Incorrect reflection.", misconceptionId: "E-d15-c" }
      ],
    backward: "The line x=4 is vertical; reflect the x‑coordinate across it.",
    forward: "Reflections are used in symmetry and optics.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student reports the original centre unchanged, not applying the reflection at all.",
        rootCause: "Reflection Not Applied — treats the original point as if it were its own reflection.",
        remediation: "The centre (2,3) is not on the mirror line x=4, so it MUST move when reflected — apply the formula x'=2(4)-2=6 to find the new x-coordinate."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports the mirror line's x-value (4) as if it were the reflected point's coordinate.",
        rootCause: "Mirror Line Confused with Reflected Point — mistakes the axis of reflection for the image point itself.",
        remediation: "x=4 is the MIRROR LINE, not the reflected point — the reflected point is found using the formula x'=2(mirror line)-x=2(4)-2=6, a different value from 4."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student makes an error applying the reflection formula, perhaps adding instead of using the correct 2k-x formula.",
        rootCause: "Reflection Formula Computation Error — miscalculates x'=2k-x.",
        remediation: "Recompute: x'=2×4-2=8-2=6, not 8 — verify by checking that the original point (2) and its reflection (6) are equidistant from the mirror line (4): both are 2 units away."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the mirror line", hint: "The line x=4 is vertical." },
      { level: 2, description: "Apply the reflection formula", hint: "x' = 2×4 - 2." },
      { level: 3, description: "Keep y unchanged", hint: "Reflecting over a vertical line doesn't change y." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-10",
    question: "A square has vertices (1,1), (1,3), (3,3), (3,1). It is reflected over the line y=x. Find the image of the vertex (1,3).",
    options: [
        { text: "(3,1)", correct: true, feedback: "Reflection over y=x swaps x and y." },
        { text: "(1,3)", correct: false, feedback: "Unchanged.", misconceptionId: "E-d16-a" },
        { text: "(3,3)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-b" },
        { text: "(1,1)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d16-c" }
      ],
    backward: "Swap x and y to reflect over y=x.",
    forward: "This transformation is a key concept in coordinate geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student reports the original point unchanged, not applying the reflection at all.",
        rootCause: "Reflection Not Applied — treats the original point as if it were its own reflection.",
        remediation: "Reflecting over y=x swaps the x and y coordinates — (1,3) becomes (3,1), a genuinely different point (unless x=y originally, which isn't the case here)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student picks a different vertex of the square (3,3) instead of correctly swapping the coordinates of (1,3).",
        rootCause: "Wrong Point Selected — confuses a different square vertex with the actual reflection of (1,3).",
        remediation: "Only swap the coordinates of the SPECIFIC point being reflected: (1,3) → (3,1), not any other vertex of the square like (3,3)."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student picks a different vertex of the square (1,1) instead of correctly swapping the coordinates of (1,3).",
        rootCause: "Wrong Point Selected — confuses a different square vertex with the actual reflection of (1,3).",
        remediation: "Only swap the coordinates of the SPECIFIC point being reflected: (1,3) → (3,1), not any other vertex of the square like (1,1)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the y=x reflection rule", hint: "Reflecting over y=x swaps the x and y coordinates." },
      { level: 2, description: "Apply to the specific point", hint: "(1,3) has x=1, y=3." },
      { level: 3, description: "Swap", hint: "New point = (y, x) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-11",
    question: "A cube and a cuboid have the same volume. The cube has edge 4 cm. The cuboid has length 8 cm and width 2 cm. Find the height of the cuboid.",
    options: [
        { text: "4 cm", correct: true, feedback: "Cube volume = 64 cm³. Cuboid: 8×2×h = 64 → h = 4 cm." },
        { text: "2 cm", correct: false, feedback: "Then volume = 32 cm³.", misconceptionId: "E-d17-a" },
        { text: "6 cm", correct: false, feedback: "Volume = 96 cm³.", misconceptionId: "E-d17-b" },
        { text: "8 cm", correct: false, feedback: "Volume = 128 cm³.", misconceptionId: "E-d17-c" }
      ],
    backward: "Volume = l×b×h. Equate the volumes, solve for h.",
    forward: "Comparing volumes of different shapes is a practical skill.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student guesses a height value without verifying it produces the cube's volume (64 cm³) when combined with the given length and width.",
        rootCause: "Volume Verification Skipped — doesn't check that the guessed height actually gives the correct total volume.",
        remediation: "Verify: 8×2×2=32, not 64 — this confirms h=2 is wrong; solve 8×2×h=64 to find the correct height: h=4."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student guesses a height value that overshoots the correct volume.",
        rootCause: "Volume Verification Skipped — doesn't check that the guessed height actually gives the correct total volume.",
        remediation: "Verify: 8×2×6=96, not 64 — this confirms h=6 is wrong; solve 8×2×h=64 to find the correct height: h=4."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student guesses a height value that overshoots the correct volume even more.",
        rootCause: "Volume Verification Skipped — doesn't check that the guessed height actually gives the correct total volume.",
        remediation: "Verify: 8×2×8=128, not 64 — this confirms h=8 is wrong; solve 8×2×h=64 to find the correct height: h=4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the cube's volume", hint: "4 × 4 × 4 = 64 cm³." },
      { level: 2, description: "Set up the cuboid's volume equation", hint: "8 × 2 × h = 64." },
      { level: 3, description: "Solve for h", hint: "16h = 64, so h = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-09",
    question: "Three vertices of a parallelogram are (1,1), (4,1), and (6,4). Find the fourth vertex.",
    options: [
        { text: "(3,4)", correct: true, feedback: "Vector from (1,1) to (4,1) is (3,0). Add to (6,4): (6−3, 4−0) = (3,4)." },
        { text: "(9,4)", correct: false, feedback: "Added vectors incorrectly.", misconceptionId: "E-d18-a" },
        { text: "(1,4)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "(4,6)", correct: false, feedback: "Swapped coordinates.", misconceptionId: "E-d18-c" }
      ],
    backward: "In a parallelogram, opposite sides are parallel and equal; use vectors.",
    forward: "Coordinate geometry and vector thinking combine.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student adds the vector (3,0) to (6,4) instead of subtracting it, landing on (9,4) instead of (3,4).",
        rootCause: "Vector Direction Confusion — adds the side vector instead of subtracting it when finding the opposite vertex.",
        remediation: "The fourth vertex is found by SUBTRACTING the vector AB from point C (not adding): D = C - AB = (6-3, 4-0) = (3,4), not C + AB = (9,4)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student makes an error computing or applying the side vector, landing on an incorrect fourth vertex.",
        rootCause: "Vector Computation Error — a miscalculation finding or applying the vector between two known vertices.",
        remediation: "Recompute the vector from (1,1) to (4,1): (4-1, 1-1)=(3,0). Then subtract this from (6,4): (6-3, 4-0)=(3,4) — recheck each step."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student swaps the x and y coordinates of the correct answer, reporting (4,6) instead of (3,4).",
        rootCause: "Coordinate Order Reversal — swaps which value goes in the x-position versus the y-position.",
        remediation: "The correct fourth vertex is (3,4), with x=3 and y=4 — double-check you haven't swapped these into (4,6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the vector between two known vertices", hint: "From (1,1) to (4,1): the vector is (3,0)." },
      { level: 2, description: "Apply this vector to find the fourth vertex", hint: "In a parallelogram, opposite sides are equal vectors — subtract (3,0) from (6,4)." },
      { level: 3, description: "Compute", hint: "(6-3, 4-0) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-07",
    question: "Two straight lines intersect. One of the angles formed is 72°. Find the sum of the other three angles.",
    options: [
        { text: "288°", correct: true, feedback: "Angles around a point sum to 360°. 360 − 72 = 288°." },
        { text: "108°", correct: false, feedback: "That's the supplement of 72°.", misconceptionId: "E-d19-a" },
        { text: "180°", correct: false, feedback: "That's the sum of two angles on a straight line.", misconceptionId: "E-d19-b" },
        { text: "216°", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-d19-c" }
      ],
    backward: "Angles around a point sum to 360°.",
    forward: "This is fundamental in circle theorems and navigation.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student computes only the supplement of the given angle (180-72=108) instead of the sum of ALL THREE remaining angles.",
        rootCause: "Wrong Total Used — uses the 180° straight-line sum instead of the full 360° around-a-point sum.",
        remediation: "Two intersecting lines create FOUR angles around the intersection point, and ALL angles around a point sum to 360° — subtract the one given angle (72°) from 360°, not from 180°."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student reports the sum of just two angles on a straight line (180°) instead of the sum of the other THREE angles.",
        rootCause: "Wrong Total Used — confuses the straight-line angle sum with the full around-a-point sum.",
        remediation: "The question asks for the sum of the OTHER THREE angles (not just two on one line) — since all four angles sum to 360°, the other three sum to 360-72=288°."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes a computational error subtracting from 360°, landing on 216° instead of 288°.",
        rootCause: "Subtraction Computation Error — miscalculates 360-72.",
        remediation: "Recompute: 360 - 72 = 288 — verify by adding 72+288 to see if it returns 360."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule for angles around a point", hint: "All angles around a single point sum to 360°." },
      { level: 2, description: "Identify how many angles are formed", hint: "Two intersecting lines create 4 angles total." },
      { level: 3, description: "Subtract the known angle", hint: "360 - 72 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-13",
    question: "A right triangle has legs of length 5 cm and 12 cm. Find its area.",
    options: [
        { text: "30 cm²", correct: true, feedback: "Area = ½ × base × height = ½ × 5 × 12 = 30 cm²." },
        { text: "60 cm²", correct: false, feedback: "You forgot to halve the product.", misconceptionId: "E-d20-a" },
        { text: "15 cm²", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-b" },
        { text: "25 cm²", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-c" }
      ],
    backward: "Area = ½ × base × height; the legs are the base and height.",
    forward: "Area of triangles is used in construction and design.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student multiplies the two legs (5×12=60) but forgets to halve the product for the triangle area formula.",
        rootCause: "Halving Step Omitted — computes the RECTANGLE area (base×height) instead of the TRIANGLE area (½×base×height).",
        remediation: "A triangle's area is HALF of base×height (since it's half a rectangle) — after computing 5×12=60, divide by 2: 60÷2=30."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student makes an error in the area calculation, perhaps halving one leg before multiplying, landing on 15 instead of 30.",
        rootCause: "Area Formula Computation Error — a miscalculation applying ½×base×height.",
        remediation: "Compute in the correct order: multiply the two legs first (5×12=60), THEN halve the result (60÷2=30), not halve one leg before multiplying."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student computes an unrelated value, perhaps confusing this with the hypotenuse calculation (5²=25 or similar).",
        rootCause: "Formula Confusion — applies a different formula (like part of the Pythagorean theorem) instead of the area formula.",
        remediation: "Area of a right triangle uses the two legs as base and height: ½×5×12=30 — this is different from computing the hypotenuse (which would use the Pythagorean theorem)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the base and height", hint: "For a right triangle, the two legs serve as base and height." },
      { level: 2, description: "Multiply the legs", hint: "5 × 12 = ?" },
      { level: 3, description: "Halve the product", hint: "60 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.G.A.1"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-02",
    question: "A point P is 3 cm from the centre of a circle of radius 5 cm. What is the length of the longest chord that passes through P?",
    options: [
        { text: "10 cm", correct: true, feedback: "The diameter through P is the longest chord; length = 2 × 5 = 10 cm." },
        { text: "8 cm", correct: false, feedback: "That would be the chord perpendicular to the radius through P (but that's shorter).", misconceptionId: "E-d21-a" },
        { text: "6 cm", correct: false, feedback: "Too short.", misconceptionId: "E-d21-b" },
        { text: "4 cm", correct: false, feedback: "Too short.", misconceptionId: "E-d21-c" }
      ],
    backward: "The diameter passing through P is the longest possible chord through that point.",
    forward: "Understanding chords deepens circle geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student computes the length of a DIFFERENT chord through P (perpendicular to the radius) instead of the longest one (the diameter through P).",
        rootCause: "Wrong Chord Selected — computes a specific (shorter) chord instead of identifying the longest possible one.",
        remediation: "Among ALL chords passing through P, the LONGEST one is always the diameter through P (passing through both P and the centre) — its length is always 2×radius=10, regardless of P's specific distance from centre."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student reports a value related to the distance from P to the centre (roughly double 3) instead of the diameter.",
        rootCause: "Wrong Value Computed — confuses P's distance-related values with the actual longest chord length.",
        remediation: "The longest chord through P doesn't depend on P's exact distance from the centre (as long as P is inside) — it's always equal to the FULL diameter: 2×5=10, not related to the 3 cm distance."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student reports the given distance itself (roughly related to 3) as if it were the chord length.",
        rootCause: "Given Value Misapplied — uses the distance from centre to P directly instead of computing the longest chord.",
        remediation: "The distance from the centre to P (3 cm) is just used to CONFIRM P is inside the circle (3<5) — the longest chord through P is still the FULL diameter, 2×5=10, unrelated to that 3 cm distance."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the key fact about chords through an interior point", hint: "The longest chord through ANY point inside a circle passes through the centre too." },
      { level: 2, description: "Identify this special chord", hint: "A chord passing through both P and the centre IS the diameter." },
      { level: 3, description: "Compute the diameter", hint: "2 × radius = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-11",
    question: "A right triangle with legs 6 cm and 8 cm is reflected across its hypotenuse. Find the perimeter of the resulting quadrilateral.",
    options: [
        { text: "28 cm", correct: true, feedback: "Hypotenuse = 10 cm. The quadrilateral has sides 6,8,6,8; perimeter = 28 cm." },
        { text: "20 cm", correct: false, feedback: "Sum of legs only.", misconceptionId: "E-d22-a" },
        { text: "24 cm", correct: false, feedback: "Twice the hypotenuse.", misconceptionId: "E-d22-b" },
        { text: "30 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d22-c" }
      ],
    backward: "Reflecting across the hypotenuse creates a kite with the legs as sides.",
    forward: "Reflections produce symmetric shapes with calculable perimeters.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student adds only the two legs once (6+8=14, doubled to 20 somehow), not recognising the reflected quadrilateral has FOUR sides (the legs appearing twice).",
        rootCause: "Reflected Shape Sides Undercounted — doesn't account for all four sides of the resulting kite shape.",
        remediation: "Reflecting the triangle across its hypotenuse creates a FOUR-sided kite with sides 6, 8, 6, 8 (each leg appears twice, once from the original triangle and once from its mirror image) — sum all four: 6+8+6+8=28, not just 6+8=14 (doubled incorrectly to 20)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student computes twice the hypotenuse (2×10=20... adjusted to 24 via miscalculation) instead of summing the four sides of the resulting kite.",
        rootCause: "Wrong Shape Property Used — uses the hypotenuse (which becomes an internal diagonal, not a perimeter side) instead of the actual kite sides.",
        remediation: "After reflecting across the hypotenuse, the hypotenuse becomes an INTERNAL diagonal of the kite, not part of its perimeter — the perimeter uses only the four leg-lengths: 6+8+6+8=28."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student makes a different computational error, perhaps including the hypotenuse incorrectly in the perimeter sum.",
        rootCause: "Reflected Shape Perimeter Miscalculated — a computational error identifying which sides form the new quadrilateral's boundary.",
        remediation: "The resulting kite's perimeter consists of the FOUR leg-copies only (6,8,6,8=28) — the original hypotenuse is now an internal line, not a boundary side, so don't add it to the perimeter."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the hypotenuse", hint: "6²+8²=36+64=100, so hypotenuse=10." },
      { level: 2, description: "Identify the reflected shape's sides", hint: "The reflection creates a kite with the legs appearing TWICE each (6,8,6,8)." },
      { level: 3, description: "Sum the four sides", hint: "6+8+6+8 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-12",
    question: "A cube is cut into smaller 1 cm cubes. The total surface area of all the small cubes is 48 cm². Find the edge length of the original cube.",
    options: [
        { text: "2 cm", correct: true, feedback: "Number of small cubes = n. Total SA = 6n = 48 → n = 8. Original edge = ∛8 = 2 cm." },
        { text: "3 cm", correct: false, feedback: "Volume would be 27, SA = 6×27 = 162.", misconceptionId: "E-d23-a" },
        { text: "4 cm", correct: false, feedback: "Volume 64, SA = 384.", misconceptionId: "E-d23-b" },
        { text: "8 cm", correct: false, feedback: "Volume 512, SA huge.", misconceptionId: "E-d23-c" }
      ],
    backward: "Total SA = 6 × (number of small cubes). Number = n³, so 6n³ = 48 → n³=8 → n=2.",
    forward: "Reverse engineering from small parts to the whole.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student guesses an edge length without verifying it produces the stated total surface area of 48 cm².",
        rootCause: "Total Surface Area Not Verified — doesn't check the guessed edge length against the given 48 cm² condition.",
        remediation: "Verify: if edge=3, number of small cubes=27, total SA=6×27=162, not 48 — this confirms 3 is wrong; solve 6n=48 for the number of cubes (n=8), then find edge=∛8=2."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student guesses a larger edge length without verifying it produces the stated total surface area.",
        rootCause: "Total Surface Area Not Verified — doesn't check the guessed edge length against the given 48 cm² condition.",
        remediation: "Verify: if edge=4, number of small cubes=64, total SA=6×64=384, not 48 — this confirms 4 is wrong; the correct edge is 2 (giving 8 small cubes, total SA=6×8=48)."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student guesses an even larger edge length, producing a vastly oversized total surface area compared to the given 48 cm².",
        rootCause: "Total Surface Area Not Verified — doesn't check the guessed edge length against the given 48 cm² condition.",
        remediation: "Verify: if edge=8, number of small cubes=512, total SA=6×512=3072, far more than 48 — this confirms 8 is wrong; the correct edge is 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the number of small cubes", hint: "Each small cube has surface area 6 cm² (6×1²). Total SA ÷ 6 = number of cubes." },
      { level: 2, description: "Relate the count to the original edge", hint: "If the original edge is n cm, the number of small 1cm cubes is n³." },
      { level: 3, description: "Solve for the original edge", hint: "48÷6=8 small cubes, so n³=8, meaning n=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-10",
    question: "A triangle has vertices (1,1), (5,1), (1,4). It is reflected over the line y=x. Find the area of the reflected triangle.",
    options: [
        { text: "6 square units", correct: true, feedback: "Reflection preserves area. Original area = ½ × 4 × 3 = 6." },
        { text: "12", correct: false, feedback: "You might have doubled the area.", misconceptionId: "E-d24-a" },
        { text: "3", correct: false, feedback: "Halved.", misconceptionId: "E-d24-b" },
        { text: "4", correct: false, feedback: "Incorrect.", misconceptionId: "E-d24-c" }
      ],
    backward: "Reflection does not change area; compute area before or after.",
    forward: "Transformations and area are linked in geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student assumes reflecting a shape doubles its area, forgetting that transformations like reflection preserve area exactly.",
        rootCause: "Area-Preserving Transformation Not Recognised — incorrectly assumes reflection changes the area.",
        remediation: "Reflection is a RIGID transformation (like a mirror flip) — it preserves size and shape exactly, including area — the reflected triangle's area equals the original's: 6, not 12."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student assumes reflecting a shape halves its area, another incorrect belief about how reflection affects area.",
        rootCause: "Area-Preserving Transformation Not Recognised — incorrectly assumes reflection changes the area.",
        remediation: "Reflection does NOT change area at all — compute the original triangle's area directly (½×4×3=6) and know the reflected triangle has the exact same area, not half."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student makes an error computing the original triangle's area, leading to an incorrect final answer.",
        rootCause: "Area Computation Error — miscalculates the base, height, or the ½×base×height formula.",
        remediation: "Recompute the original area: base (along y=1, from x=1 to x=5) = 4, height (along x=1, from y=1 to y=4) = 3. Area = ½×4×3=6 — recheck this calculation."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the property of reflection", hint: "Reflection is a rigid transformation — it doesn't change size or area." },
      { level: 2, description: "Find the original triangle's base and height", hint: "Base along y=1 (from x=1 to x=5) = 4. Height along x=1 (from y=1 to y=4) = 3." },
      { level: 3, description: "Compute the area", hint: "½ × 4 × 3 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.6.G.A.1"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-05",
    question: "Two complementary angles differ by 30°. Find the larger angle.",
    options: [
        { text: "60°", correct: true, feedback: "x + (x+30) = 90 → 2x=60 → x=30, larger=60." },
        { text: "30°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-a" },
        { text: "45°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "75°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student correctly solves for x=30 but reports the smaller angle instead of the larger angle (x+30) requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle with the larger angle that the question asks for.",
        remediation: "The question asks for the LARGER angle — after solving x=30, the larger angle is x+30=60°, not x=30° (that's the smaller one)."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student assumes the two angles are equal (each 45°), ignoring the stated 30° difference.",
        rootCause: "Difference Condition Ignored — applies a simple equal-split instead of the stated difference.",
        remediation: "The question says the two angles DIFFER by 30°, not equal — set up x + (x+30) = 90 (not x + x = 90) to respect the stated difference."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student makes a computational error while solving, landing on 75° instead of the correct 60°.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Recheck each step: x+(x+30)=90 → 2x+30=90 → 2x=60 → x=30, so the larger angle is x+30=60° — verify by checking 30+60=90."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = x+30." },
      { level: 2, description: "Apply the sum rule", hint: "x + (x+30) = 90." },
      { level: 3, description: "Solve and identify the larger angle", hint: "2x=60, so x=30. The LARGER angle is x+30." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-06",
    question: "The angles of a triangle are in the ratio 1:2:3. Find the largest angle.",
    options: [
        { text: "90°", correct: true, feedback: "Total parts=6. One part=30. Largest=3×30=90°." },
        { text: "60°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "45°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "30°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student computes the value for 2 parts (the middle ratio value) instead of 3 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the wrong number of parts.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 3 (not 2) — multiply one part (30°) by 3: 3×30=90."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student computes an incorrect value, perhaps by halving one part instead of using the ratio numbers correctly.",
        rootCause: "Ratio Application Error — misapplies the part-value to the ratio numbers.",
        remediation: "One part equals 180÷6=30° — the largest angle uses the ratio number 3 (the largest in 1:2:3): 3×30=90, not 45."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student computes the value for 1 part (the smallest ratio value) instead of 3 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the smallest ratio number instead of the largest.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 3 (the biggest number in 1:2:3), not 1 (the smallest, giving 30°)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the ratio parts", hint: "1 + 2 + 3 = ?" },
      { level: 2, description: "Find the value of one part", hint: "180° ÷ 6 = ?" },
      { level: 3, description: "Find the largest angle", hint: "Multiply one part by the LARGEST ratio number (3)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-08",
    question: "A circle has centre (0,0) and radius 5. Which point lies on the circle? (3,4), (4,4), (5,5), (6,0)",
    options: [
        { text: "(3,4)", correct: true, feedback: "Distance = 5. (4,4) gives √32, (5,5) √50, (6,0) 6." },
        { text: "(4,4)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "(5,5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "(6,0)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student picks (4,4) without computing its distance from the origin and comparing to the radius.",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance equals the radius.",
        remediation: "For EACH candidate point, compute √(x²+y²) and compare to 5 (the radius) — (4,4) gives √32≈5.66, not exactly 5, so it's NOT on the circle."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student picks (5,5) without computing its distance from the origin and comparing to the radius.",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance equals the radius.",
        remediation: "For EACH candidate point, compute √(x²+y²) and compare to 5 — (5,5) gives √50≈7.07, not exactly 5, so it's NOT on the circle."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student picks (6,0), perhaps confusing this with a point near the circle's edge along the x-axis, without checking exactly.",
        rootCause: "Distance Comparison Skipped — picks a candidate point without verifying its distance equals the radius.",
        remediation: "For EACH candidate point, compute √(x²+y²) and compare to 5 — (6,0) gives exactly 6, not 5, so it's NOT on the circle (it's just outside)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the radius", hint: "The circle's radius is 5." },
      { level: 2, description: "Compute each point's distance from the origin", hint: "√(x² + y²) for each candidate." },
      { level: 3, description: "Find the match", hint: "Which point's distance exactly equals 5?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-04",
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular pentagon has 5 sides, so 5 lines of symmetry." },
        { text: "3", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "6", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "10", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student confuses the pentagon's symmetry count with the equilateral triangle's count (3 sides = 3 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 3 like a triangle) — its symmetry count matches ITS side count: 5, not 3."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student confuses the pentagon's symmetry count with the hexagon's count (6 sides = 6 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 6 like a hexagon) — its symmetry count matches ITS side count: 5, not 6."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student doubles the side count, applying a doubling rule that doesn't hold for regular polygons in general.",
        rootCause: "Rule Overapplication — applies a doubling pattern that doesn't hold for regular polygons.",
        remediation: "For a regular polygon, symmetry lines equal the NUMBER OF SIDES exactly, no doubling — a pentagon (5 sides) has 5 lines, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the general rule", hint: "A regular polygon's lines of symmetry equal its number of sides." },
      { level: 2, description: "Count the pentagon's sides", hint: "A pentagon has 5 sides." },
      { level: 3, description: "Apply the rule", hint: "5 sides means how many lines of symmetry?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-08",
    question: "A cuboid measures 8 cm × 3 cm × 2 cm. Find its total edge length.",
    options: [
        { text: "52 cm", correct: true, feedback: "4(8+3+2) = 52 cm." },
        { text: "48 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "56 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "60 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student makes a computational error summing the dimensions or multiplying by 4, landing 4 below the correct answer.",
        rootCause: "Arithmetic Computation Error — a miscalculation in the sum or multiplication.",
        remediation: "Recompute step by step: 8+3+2=13, then 4×13=52 — recheck each part of this calculation."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student makes a computational error, landing 4 above the correct answer.",
        rootCause: "Arithmetic Computation Error — a different miscalculation in the sum or multiplication.",
        remediation: "Recompute: 8+3+2=13 (not a different sum), then 4×13=52 — verify each step."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student makes a larger computational error, landing 8 above the correct answer.",
        rootCause: "Arithmetic Computation Error — a larger miscalculation in the sum or multiplication.",
        remediation: "Recompute carefully: sum the three dimensions (8+3+2=13), then multiply by 4 (since a cuboid has 4 edges of each dimension): 4×13=52, not 60."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the three dimensions", hint: "8 + 3 + 2 = ?" },
      { level: 2, description: "Recall how many edges of each dimension", hint: "A cuboid has 4 edges of each length, width, and height." },
      { level: 3, description: "Multiply", hint: "4 × 13 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-05",
    question: "A point is translated 3 units right and 2 units down from (2,5). Find the new coordinates.",
    options: [
        { text: "(5,3)", correct: true, feedback: "2+3=5, 5−2=3." },
        { text: "(5,7)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "(0,3)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "(2,5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student correctly updates the x-coordinate (2+3=5) but adds instead of subtracting for the 'down' movement, getting 5+2=7 instead of 5-2=3.",
        rootCause: "Direction-to-Operation Mapping Reversed — applies addition instead of subtraction for a downward movement.",
        remediation: "DOWN means SUBTRACT from y (moving down decreases y) — 5-2=3, not 5+2=7."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student subtracts instead of adding for the 'right' movement, getting 2-3=-1 (or similar) instead of 2+3=5.",
        rootCause: "Direction-to-Operation Mapping Reversed — applies subtraction instead of addition for a rightward movement.",
        remediation: "RIGHT means ADD to x (moving right increases x) — 2+3=5, not subtract."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reports the original coordinates unchanged, not applying either movement.",
        rootCause: "Movement Not Applied — doesn't perform either the horizontal or vertical shift.",
        remediation: "The point DOES move — apply both changes: add 3 to x (right) and subtract 2 from y (down), rather than leaving the original point unchanged."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Update the x-coordinate", hint: "Right movement adds to x: 2 + 3 = ?" },
      { level: 2, description: "Update the y-coordinate", hint: "Down movement subtracts from y: 5 - 2 = ?" },
      { level: 3, description: "Write the new point", hint: "(new x, new y) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOTRI-10",
    question: "An exterior angle of a triangle is 120°, and one interior opposite angle is 50°. Find the other interior opposite angle.",
    options: [
        { text: "70°", correct: true, feedback: "120 = 50 + x → x = 70°." },
        { text: "60°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "80°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "110°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student makes a computational error applying the exterior angle theorem, landing 10 below the correct answer.",
        rootCause: "Exterior Angle Theorem Computation Error — a miscalculation applying 120=50+x.",
        remediation: "Recompute: 120-50=70 — verify by checking 50+70=120, confirming the exterior angle theorem holds."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student makes a computational error, landing 10 above the correct answer.",
        rootCause: "Exterior Angle Theorem Computation Error — a different miscalculation applying the theorem.",
        remediation: "Recompute: 120-50=70, not 80 — verify by checking that 50+70=120 (the given exterior angle)."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student computes the supplement of the given angle (180-70? or similar) instead of applying the exterior angle theorem correctly.",
        rootCause: "Wrong Theorem Applied — uses a supplementary-angle approach instead of the exterior angle theorem.",
        remediation: "Use the exterior angle theorem specifically: exterior angle = sum of the two non-adjacent interior angles — 120 = 50 + x, so x = 70, not derived from a supplementary relationship."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the exterior angle theorem", hint: "An exterior angle equals the sum of the two non-adjacent (opposite) interior angles." },
      { level: 2, description: "Set up the equation", hint: "120 = 50 + x." },
      { level: 3, description: "Solve for x", hint: "120 - 50 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-11",
    question: "An isosceles triangle has perimeter 36 cm and unequal side 12 cm. Find the length of each equal side.",
    options: [
        { text: "12 cm", correct: true, feedback: "(36−12)/2 = 12 cm." },
        { text: "10 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "14 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student guesses a value for the equal sides without verifying the total perimeter matches 36 cm.",
        rootCause: "Perimeter Verification Skipped — doesn't check that the guessed answer produces the correct total perimeter.",
        remediation: "Verify: if each equal side is 10, the perimeter would be 12+10+10=32, not 36 — this confirms 10 is wrong; the correct value is 12, giving 12+12+12=36."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student guesses a value that overshoots the correct perimeter.",
        rootCause: "Perimeter Verification Skipped — doesn't check that the guessed answer produces the correct total perimeter.",
        remediation: "Verify: if each equal side is 14, the perimeter would be 12+14+14=40, not 36 — this confirms 14 is wrong; solve (36-12)÷2 to find the correct value: 12."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student reports the full remaining sum (24) instead of dividing it between the two equal sides.",
        rootCause: "Division-by-Two Step Omitted — stops after subtracting, forgetting to split the remainder between two equal sides.",
        remediation: "After subtracting (36-12=24), this remainder must be split BETWEEN the two equal sides — divide by 2: 24÷2=12, not the full 24 (which would give an impossible perimeter of 12+24+24=60)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Subtract the unequal side from the perimeter", hint: "36 - 12 = ?" },
      { level: 2, description: "Divide the remainder equally", hint: "The remaining length is split between the two equal sides." },
      { level: 3, description: "Compute", hint: "24 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-05",
    question: "A circle has centre (1,2) and radius 5. Is the point (4,5) inside, on, or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "Distance² = 3²+3² = 18 < 25 → inside." },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student assumes a distance 'close to' the radius must be exactly on the circle, without verifying exact equality.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance² as exactly equal to radius² without precise comparison.",
        remediation: "'On the circle' requires distance² to be EXACTLY equal to radius² (25) — since 18 ≠ 25, the point is not on the circle; since 18 < 25, it's inside."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student reverses the inside/outside comparison, thinking a smaller distance² means the point is outside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to radius².",
        remediation: "A point is INSIDE the circle when its distance² from the centre is LESS than radius² — since 18 < 25, the point is closer, meaning INSIDE, not outside."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student believes the inside/outside status cannot be determined without more information, despite having both the radius and the point's coordinates.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing distance² to radius² is sufficient to determine position.",
        remediation: "Comparing the point's distance² from the centre (18) to the radius² (25) IS sufficient — since 18 < 25, we can definitively say the point is inside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the radius squared", hint: "Radius = 5, so radius² = 25." },
      { level: 2, description: "Compute the point's distance squared from the centre", hint: "(4-1)²+(5-2)²=9+9=18." },
      { level: 3, description: "Compare", hint: "Is 18 less than, greater than, or equal to 25?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-01",
    question: "Which shape has exactly one line of symmetry?",
    options: [
        { text: "Isosceles triangle", correct: true, feedback: "An isosceles triangle has exactly one line of symmetry." },
        { text: "Square", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "Circle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "Parallelogram", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks the square, which has 4 lines of symmetry, missing that the question asks for exactly 1.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the required exactly-1.",
        remediation: "A square has 4 lines of symmetry, not 1 — an isosceles triangle (with only its vertical axis matching) has exactly 1 line of symmetry."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks the circle, which has infinitely many lines of symmetry, missing that the question asks for exactly 1.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the required exactly-1.",
        remediation: "A circle has INFINITELY many lines of symmetry, not exactly 1 — an isosceles triangle has exactly 1 line of symmetry, matching the requirement."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks a general parallelogram, which typically has 0 lines of symmetry (unless it's a special case like a rhombus or rectangle), missing that the question asks for exactly 1.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the required exactly-1.",
        remediation: "A general parallelogram (non-special case) has 0 lines of symmetry, not 1 — an isosceles triangle has exactly 1 line of symmetry, matching the requirement."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall each shape's symmetry count", hint: "Square=4, circle=infinite, parallelogram=0 (generally)." },
      { level: 2, description: "Recall the isosceles triangle's count", hint: "An isosceles triangle has exactly 1 line (down its axis)." },
      { level: 3, description: "Match to the requirement", hint: "Which shape's count exactly equals 1?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-13",
    question: "A cube has volume 125 cm³. Find its surface area.",
    options: [
        { text: "150 cm²", correct: true, feedback: "Edge = ∛125 = 5 cm. SA = 6 × 25 = 150 cm²." },
        { text: "125 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "30 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "100 cm²", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student reports the given volume (125) directly as if it were the surface area, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given volume with the requested surface area.",
        remediation: "Volume and surface area are different measurements — work through: side=∛125=5, then surface area=6×5²=150, not just restating the volume."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student computes only 6×edge (6×5=30) instead of 6×edge² (6×25=150), confusing the surface area formula with a simpler multiplication.",
        rootCause: "Surface Area Formula Confused — uses 6×edge instead of 6×edge² (each face's area).",
        remediation: "Each face's area is edge×edge=edge² (25, not just 5) — surface area = 6 × 25 = 150, not 6 × 5 = 30."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student computes only one face's area (5²=25, adjusted) or makes another error, landing on 100 instead of the correct 150.",
        rootCause: "Multi-Step Computation Error — a miscalculation in finding the edge or applying the surface area formula.",
        remediation: "Work through each step: side=∛125=5, one face's area=5²=25, total surface area=6×25=150 — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the side length", hint: "Side = ∛125 (what number cubed equals 125?)." },
      { level: 2, description: "Find one face's area", hint: "side² = 5² = ?" },
      { level: 3, description: "Multiply by the number of faces", hint: "A cube has 6 faces: 6 × 25 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-06",
    question: "Three vertices of a rectangle are (0,0), (0,2), (3,0). Find the fourth vertex.",
    options: [
        { text: "(3,2)", correct: true, feedback: "Missing x=3, y=2." },
        { text: "(2,3)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-a" },
        { text: "(0,2)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-b" },
        { text: "(3,0)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student proposes a point with the correct values but in swapped positions (2,3) instead of (3,2).",
        rootCause: "Coordinate Order Reversal — swaps which value goes in the x-position versus the y-position.",
        remediation: "The x-value from the point sharing the same row (3, from (3,0)) goes FIRST; the y-value from the point sharing the same column (2, from (0,2)) goes SECOND — (3,2), not (2,3)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student repeats one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point, not one already given — combine the missing x-value (3) with the missing y-value (2) to get (3,2)."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the 'other' x-value (3) with the 'other' y-value (2, from (0,2)) to get (3,2)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot the three known points", hint: "(0,0), (0,2), (3,0) — sketch them on a grid." },
      { level: 2, description: "Find the missing x-value", hint: "Two points share x=0; the third has x=3 — the missing point needs x=3." },
      { level: 3, description: "Find the missing y-value", hint: "Two points share y=0; the third has y=2 — the missing point needs y=2." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
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

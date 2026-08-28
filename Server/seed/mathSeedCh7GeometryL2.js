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
    skillId: "GEOLINES-04",
    question: "Two angles lie on a straight line. One angle is 65°. Find the other angle.",
    options: [
        { text: "115°", correct: true, feedback: "Angles on a straight line sum to 180°. 180° − 65° = 115°." },
        { text: "25°", correct: false, feedback: "You subtracted from 90° (complementary), not 180° (supplementary).", misconceptionId: "E-w1-a" },
        { text: "65°", correct: false, feedback: "That's the given angle, not the other one.", misconceptionId: "E-w1-b" },
        { text: "180°", correct: false, feedback: "That's the total sum, not the unknown angle.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "Angles on a straight line add up to 180°. Subtract the known angle from 180°.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student subtracts 65° from 90° instead of 180°, applying the complementary-angle rule to a supplementary-angle situation.",
        rootCause: "Complementary/Supplementary Confusion — mixes up the 90° sum rule with the 180° sum rule.",
        remediation: "Angles on a STRAIGHT LINE always sum to 180° (supplementary), not 90° (complementary, which applies to angles forming a right angle) — subtract from 180°."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student reports the given angle unchanged, not computing the OTHER angle at all.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested unknown angle.",
        remediation: "The question asks for the OTHER angle, not the given one — subtract the given 65° from 180° to find the different, unknown angle."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student reports the total sum (180°) instead of solving for the missing angle.",
        rootCause: "Final Subtraction Step Omitted — stops after recalling the sum rule without applying it to find the unknown.",
        remediation: "180° is the TOTAL of both angles combined — subtract the known 65° from this total to isolate the other angle: 180° - 65° = 115°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "Angles on a straight line sum to 180°." },
      { level: 2, description: "Set up the subtraction", hint: "180° - 65° = ?" },
      { level: 3, description: "Check", hint: "Do 65° and your answer add up to 180°?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "GEOLINES-05", probability: 0.35, condition: "Confusing complementary (90°) with supplementary (180°) sum rules recurs whenever both angle types appear together." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-04",
    question: "A triangle has angles 50° and 60°. Find the third angle.",
    options: [
        { text: "70°", correct: true, feedback: "180° − 50° − 60° = 70°." },
        { text: "110°", correct: false, feedback: "You added 50 + 60 instead of subtracting from 180.", misconceptionId: "E-w2-a" },
        { text: "80°", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w2-b" },
        { text: "130°", correct: false, feedback: "180 − 50 = 130, but you forgot to subtract 60 as well.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "The sum of angles in a triangle is 180°. Add the two known angles and subtract from 180°.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student adds the two given angles together and reports that sum, instead of subtracting from 180°.",
        rootCause: "Final Subtraction Step Omitted — stops after adding the two known angles, without subtracting from 180°.",
        remediation: "50+60=110 is just the sum of the KNOWN angles — you must subtract this from the triangle's TOTAL (180°) to find the third angle: 180-110=70."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student makes a computational error somewhere in the addition or subtraction, landing on 80 instead of 70.",
        rootCause: "Arithmetic Computation Error — a miscalculation in the two-step process.",
        remediation: "Work through carefully: 50+60=110, then 180-110=70 — recheck each step of this two-step calculation."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student subtracts only ONE of the two known angles (50°) from 180°, forgetting to also subtract the second (60°).",
        rootCause: "Second Subtraction Step Omitted — only accounts for one of the two known angles.",
        remediation: "The triangle has THREE angles totaling 180° — subtract BOTH known angles (50° AND 60°) from 180°, not just one: 180-50-60=70."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "All angles in a triangle sum to 180°." },
      { level: 2, description: "Add the two known angles", hint: "50 + 60 = ?" },
      { level: 3, description: "Subtract from the total", hint: "180 - 110 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-04",
    question: "The diameter of a circle is 16 cm. Find its radius.",
    options: [
        { text: "8 cm", correct: true, feedback: "Radius = diameter ÷ 2 = 8 cm." },
        { text: "32 cm", correct: false, feedback: "You multiplied by 2 instead of dividing.", misconceptionId: "E-w3-a" },
        { text: "4 cm", correct: false, feedback: "You divided by 4.", misconceptionId: "E-w3-b" },
        { text: "16 cm", correct: false, feedback: "That's the diameter, not the radius.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "The radius is half the diameter. Divide by 2.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student multiplies the diameter by 2 instead of dividing, applying the inverse operation.",
        rootCause: "Operation Direction Confusion — multiplies instead of dividing when finding the radius from the diameter.",
        remediation: "Radius is SMALLER than diameter (it's half) — divide the diameter by 2, don't multiply it: 16 ÷ 2 = 8, not 16 × 2."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student divides the diameter by 4 instead of 2, overshooting the reduction.",
        rootCause: "Wrong Divisor Applied — uses an incorrect divisor when halving the diameter.",
        remediation: "Radius = diameter ÷ 2 exactly — divide by 2, not 4: 16 ÷ 2 = 8 cm."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student reports the diameter value directly as the radius, without halving it.",
        rootCause: "Halving Step Omitted — forgets that radius = diameter ÷ 2, not diameter itself.",
        remediation: "The radius is HALF the diameter — you must divide the diameter by 2, not just restate the diameter value."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Radius = diameter ÷ 2." },
      { level: 2, description: "Substitute the value", hint: "16 ÷ 2 = ?" },
      { level: 3, description: "Check", hint: "Is your answer smaller than the diameter, since radius is only half?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-04",
    question: "How many lines of symmetry does a regular hexagon have?",
    options: [
        { text: "6", correct: true, feedback: "A regular hexagon has 6 sides, so it has 6 lines of symmetry." },
        { text: "3", correct: false, feedback: "That's the number for an equilateral triangle, not a hexagon.", misconceptionId: "E-w4-a" },
        { text: "4", correct: false, feedback: "That's for a square.", misconceptionId: "E-w4-b" },
        { text: "8", correct: false, feedback: "Too many; an octagon has 8.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "A regular polygon has as many lines of symmetry as it has sides.",
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student confuses the hexagon's symmetry count with the equilateral triangle's count (3 sides = 3 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the hexagon.",
        remediation: "A hexagon has 6 sides (not 3 like a triangle) — its symmetry count matches ITS side count: 6, not 3."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student confuses the hexagon's symmetry count with the square's count (4 sides = 4 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the hexagon.",
        remediation: "A hexagon has 6 sides (not 4 like a square) — its symmetry count matches ITS side count: 6, not 4."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student confuses the hexagon's symmetry count with the octagon's count (8 sides = 8 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the hexagon.",
        remediation: "A hexagon has 6 sides (not 8 like an octagon) — its symmetry count matches ITS side count: 6, not 8."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the general rule", hint: "A regular polygon's lines of symmetry equal its number of sides." },
      { level: 2, description: "Count the hexagon's sides", hint: "A hexagon has 6 sides." },
      { level: 3, description: "Apply the rule", hint: "6 sides means how many lines of symmetry?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-03",
    question: "How many edges does a cube have?",
    options: [
        { text: "12", correct: true, feedback: "A cube has 4 edges on top, 4 on bottom, and 4 vertical edges." },
        { text: "6", correct: false, feedback: "6 is the number of faces.", misconceptionId: "E-w5-a" },
        { text: "8", correct: false, feedback: "8 is the number of vertices.", misconceptionId: "E-w5-b" },
        { text: "10", correct: false, feedback: "A cube has 12 edges, not 10.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Picture a dice: count the edges (the lines where faces meet).",
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student confuses the number of edges with the number of faces.",
        rootCause: "3D Attribute Confusion — mixes up edges (line segments) with faces (flat surfaces).",
        remediation: "Edges are the LINE SEGMENTS where two faces meet (12 for a cube); faces are the FLAT SURFACES (6 for a cube) — these are different attributes."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student confuses the number of edges with the number of vertices.",
        rootCause: "3D Attribute Confusion — mixes up edges (line segments) with vertices (corner points).",
        remediation: "Edges are the LINE SEGMENTS (12 for a cube); vertices are the CORNER POINTS where edges meet (8 for a cube) — these are different attributes."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student undercounts the edges, perhaps missing some of the 4 vertical connecting edges.",
        rootCause: "Incomplete Edge Count — misses some edges when counting systematically.",
        remediation: "Count in three groups: 4 edges on the top face, 4 edges on the bottom face, and 4 vertical edges connecting them — that's 4+4+4=12 total."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the top face's edges", hint: "A cube's top face has 4 edges." },
      { level: 2, description: "Count the bottom face's edges", hint: "Similarly, the bottom face has 4 edges." },
      { level: 3, description: "Count the vertical edges and total", hint: "4 vertical edges connect top to bottom. 4+4+4=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-05",
    question: "Starting at (1, 2), move 2 units right and 3 units up. What are the new coordinates?",
    options: [
        { text: "(3, 5)", correct: true, feedback: "Right changes x (1+2=3). Up changes y (2+3=5)." },
        { text: "(3, 2)", correct: false, feedback: "You forgot to add the up movement to y.", misconceptionId: "E-w6-a" },
        { text: "(1, 5)", correct: false, feedback: "You forgot to add the right movement to x.", misconceptionId: "E-w6-b" },
        { text: "(2, 3)", correct: false, feedback: "You swapped the changes.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "Add the right amount to the x‑coordinate, and the up amount to the y‑coordinate.",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student correctly updates the x-coordinate (1+2=3) but leaves the y-coordinate unchanged, forgetting the 'up' movement.",
        rootCause: "Partial Movement Applied — applies only one of the two described movements.",
        remediation: "The point moves in BOTH directions — update x (right movement) AND y (up movement): x=1+2=3, y=2+3=5."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student correctly updates the y-coordinate (2+3=5) but leaves the x-coordinate unchanged, forgetting the 'right' movement.",
        rootCause: "Partial Movement Applied — applies only one of the two described movements.",
        remediation: "The point moves in BOTH directions — update x (right movement) AND y (up movement): x=1+2=3, y=2+3=5."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student applies the right-movement amount to y and the up-movement amount to x, swapping which change goes to which coordinate.",
        rootCause: "Coordinate Change Swap — mismatches which movement (right/up) updates which coordinate (x/y).",
        remediation: "'Right' movement always changes the x-coordinate; 'up' movement always changes the y-coordinate — don't swap them: x=1+2 (right), y=2+3 (up)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Update the x-coordinate", hint: "Right movement adds to x: 1 + 2 = ?" },
      { level: 2, description: "Update the y-coordinate", hint: "Up movement adds to y: 2 + 3 = ?" },
      { level: 3, description: "Write the new point", hint: "(new x, new y) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-05",
    question: "An angle is twice its complement. Find the angle.",
    options: [
        { text: "60°", correct: true, feedback: "Let smaller = x, larger = 2x. x + 2x = 90 → 3x = 90 → x = 30, so the larger angle = 60°." },
        { text: "30°", correct: false, feedback: "That's the smaller angle (the complement).", misconceptionId: "E-w7-a" },
        { text: "45°", correct: false, feedback: "That would be if both were equal.", misconceptionId: "E-w7-b" },
        { text: "90°", correct: false, feedback: "That's the total sum, not the angle.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Complementary angles sum to 90°. Let the angle be 2x and its complement be x. Solve 3x = 90.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student correctly solves for x=30 but reports the SMALLER angle (the complement) instead of the LARGER angle requested.",
        rootCause: "Wrong Value Reported — confuses the complement (x) with the angle itself (2x) that the question asks for.",
        remediation: "The question asks for THE ANGLE (which is twice its complement) — after solving x=30, the ANGLE is 2x=60°, not x=30° (that's just the complement)."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student assumes the angle and its complement are equal (each 45°), ignoring the stated 'twice' relationship.",
        rootCause: "Ratio Condition Ignored — applies the simple equal-split instead of the stated 2:1 ratio.",
        remediation: "The question says the angle is TWICE its complement, not equal to it — set up x + 2x = 90 (not x + x = 90) to respect the 2:1 ratio."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student reports the total sum (90°) instead of solving the equation for the specific angle.",
        rootCause: "Equation Not Solved — stops at recalling the sum rule without solving for x.",
        remediation: "90° is the TOTAL of the angle and its complement combined — you must solve the equation x+2x=90 to find the actual angle value, not just state the sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the complement = x, and the angle = 2x." },
      { level: 2, description: "Apply the sum rule", hint: "x + 2x = 90." },
      { level: 3, description: "Solve and identify the angle", hint: "3x=90, so x=30. The ANGLE is 2x, not x." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a ratio-based angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-05",
    question: "An isosceles triangle has two equal angles. The third angle is 80°. Find the equal angles.",
    options: [
        { text: "50° each", correct: true, feedback: "180° − 80° = 100°. Divide by 2 → 50°." },
        { text: "40°", correct: false, feedback: "That would leave 100° for the third angle, not 80°.", misconceptionId: "E-w8-a" },
        { text: "60°", correct: false, feedback: "Incorrect calculation.", misconceptionId: "E-w8-b" },
        { text: "80°", correct: false, feedback: "That's the third angle, not the equal ones.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "Subtract the third angle from 180°, then divide by 2.",
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student divides 80° by 2 (getting 40°) instead of subtracting 80° from 180° first.",
        rootCause: "Wrong Value Halved — halves the given third angle instead of the REMAINING angle sum.",
        remediation: "First subtract the known third angle from 180° to find the REMAINING sum for the two equal angles (180-80=100), THEN divide that remainder by 2, not the original 80°."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student makes a computational error in the subtraction or division, landing on 60° instead of 50°.",
        rootCause: "Arithmetic Computation Error — a miscalculation in the two-step process.",
        remediation: "Work through carefully: 180-80=100, then 100÷2=50 — recheck each step of this two-step calculation."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student reports the given third angle (80°) instead of computing the two equal angles requested.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested equal angles.",
        remediation: "The question asks for the TWO EQUAL angles, not the third angle already given — subtract 80° from 180° and divide by 2 to find them."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the remaining angle sum", hint: "180° - 80° = ?" },
      { level: 2, description: "Divide equally", hint: "The remaining sum is split equally between the two equal angles." },
      { level: 3, description: "Compute", hint: "100 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  }
];

const diagnosticItems = [
  {
    itemId: "d1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "An angle is 30° more than its supplement. Find the angle.",
    options: [
        { text: "105°", correct: true, feedback: "Let angle = x. Its supplement = 180 − x. x = (180 − x) + 30 → 2x = 210 → x = 105°." },
        { text: "75°", correct: false, feedback: "That's the supplement, not the angle.", misconceptionId: "E-d1-a" },
        { text: "150°", correct: false, feedback: "Incorrect equation.", misconceptionId: "E-d1-b" },
        { text: "120°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d1-c" }
      ],
    backward: "Supplementary angles sum to 180°. Set up the equation carefully.",
    forward: "Equation‑solving with angles builds algebra skills.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student correctly solves the equation but reports the supplement (180-x) instead of the angle (x) requested.",
        rootCause: "Wrong Value Reported — confuses the supplement with the angle itself that the question asks for.",
        remediation: "The question asks for THE ANGLE, not its supplement — after solving x=105, the ANGLE is 105°, and its supplement (75°) is a different value."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student sets up the equation incorrectly, perhaps treating '30° more' as a factor instead of an additive term, leading to a wrong equation and answer.",
        rootCause: "Equation Setup Error — misrepresents 'more than' as multiplication instead of addition.",
        remediation: "'30° more than' means ADD 30, not multiply — the equation should be x = (180-x) + 30, where 30 is added to the supplement."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student makes an algebraic error while solving the equation, landing on 120 instead of 105.",
        rootCause: "Equation-Solving Error — a miscalculation when isolating x.",
        remediation: "Recheck each algebraic step: x = (180-x) + 30 → x = 210 - x → 2x = 210 → x = 105 — verify by checking 105 = (180-105)+30 = 75+30 = 105."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the variables", hint: "Let the angle = x, so its supplement = 180 - x." },
      { level: 2, description: "Write the equation", hint: "x = (180 - x) + 30." },
      { level: 3, description: "Solve for x", hint: "2x = 210, so x = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a supplementary-angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-06",
    question: "The angles of a triangle are in the ratio 2:3:4. Find the largest angle.",
    options: [
        { text: "80°", correct: true, feedback: "Total parts = 2+3+4 = 9. One part = 180° ÷ 9 = 20°. Largest = 4 × 20 = 80°." },
        { text: "60°", correct: false, feedback: "That's 3 parts.", misconceptionId: "E-d2-a" },
        { text: "40°", correct: false, feedback: "That's 2 parts, the smallest.", misconceptionId: "E-d2-b" },
        { text: "100°", correct: false, feedback: "Incorrect sum of parts.", misconceptionId: "E-d2-c" }
      ],
    backward: "Sum the ratio parts, divide 180° by the total, multiply by the largest part.",
    forward: "Ratio problems appear frequently in geometry and real life.",
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student computes the value for 3 parts (the middle ratio value) instead of 4 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the wrong number of parts.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 4 (not 3) — multiply one part (20°) by 4: 4×20=80."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student computes the value for 2 parts (the smallest ratio value) instead of 4 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the smallest ratio number instead of the largest.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 4 (the biggest number in 2:3:4), not 2 (the smallest)."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student miscounts the total number of ratio parts, using an incorrect sum before dividing 180°.",
        rootCause: "Ratio Sum Miscounted — adds the ratio numbers incorrectly.",
        remediation: "Add all three ratio numbers correctly: 2+3+4=9 (not a different total) — this is the total number of 'parts' that divide 180°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the ratio parts", hint: "2 + 3 + 4 = ?" },
      { level: 2, description: "Find the value of one part", hint: "180° ÷ 9 = ?" },
      { level: 3, description: "Find the largest angle", hint: "Multiply one part by the LARGEST ratio number (4)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-05",
    question: "A circle has radius 6 cm. A point P is 7 cm from the centre. Is P inside or outside the circle?",
    options: [
        { text: "Outside", correct: true, feedback: "The distance from centre (7 cm) is greater than the radius (6 cm), so P is outside." },
        { text: "Inside", correct: false, feedback: "Inside means distance < radius.", misconceptionId: "E-d3-a" },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 6 cm.", misconceptionId: "E-d3-b" },
        { text: "Cannot say", correct: false, feedback: "We can compare the distance to the radius.", misconceptionId: "E-d3-c" }
      ],
    backward: "The distance from the centre to any point inside the circle is less than the radius.",
    forward: "This idea leads to the formal definition of a circle as a set of points.",
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student reverses the inside/outside comparison, thinking a GREATER distance than the radius means the point is inside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to the radius.",
        remediation: "A point is INSIDE the circle when its distance from the centre is LESS than the radius — since 7 > 6 (the radius), the point is farther away, meaning OUTSIDE."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student assumes any point 'close to' the radius value is exactly on the circle, without checking the distance is exactly equal.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance as exactly equal without precise comparison.",
        remediation: "'On the circle' requires the distance to be EXACTLY equal to the radius (6 cm) — since 7 cm ≠ 6 cm, the point is not on the circle; it's outside since 7 > 6."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student believes the inside/outside status cannot be determined without more information, despite having both the radius and the distance.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing distance to radius is sufficient to determine position.",
        remediation: "Comparing the point's distance from the centre (7 cm) to the radius (6 cm) IS sufficient — since 7 > 6, we can definitively say the point is outside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the radius", hint: "The circle's radius is 6 cm." },
      { level: 2, description: "Compare the distance to the radius", hint: "Is 7 cm greater than, less than, or equal to 6 cm?" },
      { level: 3, description: "Determine the position", hint: "Distance greater than radius means the point is..." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-06",
    question: "Two identical squares are joined along a full edge to form a rectangle. How many lines of symmetry does this shape have?",
    options: [
        { text: "2", correct: true, feedback: "The rectangle (2 units by 1 unit) has one vertical and one horizontal line of symmetry." },
        { text: "1", correct: false, feedback: "It has more than one.", misconceptionId: "E-d4-a" },
        { text: "4", correct: false, feedback: "That would be a square, not a 2×1 rectangle.", misconceptionId: "E-d4-b" },
        { text: "0", correct: false, feedback: "The shape does have symmetry.", misconceptionId: "E-d4-c" }
      ],
    backward: "Sketch the shape; look for lines that divide it into two mirror‑image halves.",
    forward: "Symmetry of composite shapes builds spatial reasoning.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student finds only one line of symmetry (e.g. just the vertical midline) and stops, missing the horizontal midline also works.",
        rootCause: "Incomplete Symmetry Search — stops after finding the first valid fold line.",
        remediation: "Test BOTH the vertical midline AND the horizontal midline — for this 2×1 rectangle, both create matching halves, giving 2 total lines."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student assumes joining two squares must create a square-like shape with 4 lines of symmetry, not recognising the result is a non-square rectangle.",
        rootCause: "Composite Shape Misidentification — misidentifies the resulting shape's proportions.",
        remediation: "Two squares joined along a full edge form a RECTANGLE that is twice as long as it is wide (2:1 ratio) — this is NOT a square, so it only has 2 lines of symmetry, not 4."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student assumes the composite shape has no symmetry at all, perhaps due to it being 'made of two pieces'.",
        rootCause: "Composite Shape Symmetry Doubt — assumes joining shapes destroys symmetry.",
        remediation: "The resulting 2×1 rectangle IS symmetric — fold it along the vertical or horizontal midline, and the two halves match exactly, giving 2 lines of symmetry."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the resulting shape", hint: "Two squares joined along a full edge form a rectangle twice as long as wide." },
      { level: 2, description: "Test the midlines", hint: "Fold vertically and horizontally — do both halves match?" },
      { level: 3, description: "Test the diagonals", hint: "For a non-square rectangle, do the diagonals also create matching halves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-05",
    question: "Which net can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This T‑shaped or cross‑shaped net of 6 squares can fold into a cube." },
        { text: "6 squares in a straight line", correct: false, feedback: "Cannot close into a cube without overlapping.", misconceptionId: "E-d5-a" },
        { text: "5 squares in a T shape", correct: false, feedback: "Only 5 faces, a cube needs 6.", misconceptionId: "E-d5-b" },
        { text: "4 squares in a large square", correct: false, feedback: "Only 4 faces.", misconceptionId: "E-d5-c" }
      ],
    backward: "A cube net must have exactly 6 squares arranged so they can fold without overlapping.",
    forward: "Nets are essential for understanding surface area and packaging.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student assumes having the correct COUNT of squares (6) automatically means the net will fold correctly, without checking the arrangement.",
        rootCause: "Arrangement Not Checked — verifies the count of squares but not whether their specific arrangement allows a valid fold.",
        remediation: "Having 6 squares is necessary but NOT sufficient — the ARRANGEMENT matters too: a straight line of 6 squares causes faces to overlap when folded, unlike a cross/T-shaped arrangement."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student doesn't count the total squares, missing that a cube requires exactly 6 faces, not 5.",
        rootCause: "Face Count Not Verified — doesn't check that the net has the correct total number of squares before considering foldability.",
        remediation: "A cube ALWAYS has exactly 6 faces — any net with fewer squares (like 5) cannot form a complete cube, regardless of arrangement."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student doesn't count the total squares, missing that a 2×2 arrangement only gives 4 faces, not the required 6.",
        rootCause: "Face Count Not Verified — doesn't check the net has 6 total squares before considering foldability.",
        remediation: "A 2×2 square arrangement has only 4 individual squares — a cube needs 6, so this arrangement is missing 2 faces entirely."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the squares", hint: "A cube net must have exactly 6 squares." },
      { level: 2, description: "Check the arrangement", hint: "Even with 6 squares, can they fold WITHOUT overlapping?" },
      { level: 3, description: "Identify the valid net", hint: "Which option has both 6 squares AND a foldable arrangement?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-06",
    question: "Three vertices of a rectangle are (1,1), (1,4), (4,1). What is the fourth vertex?",
    options: [
        { text: "(4,4)", correct: true, feedback: "The missing corner must have x=4 and y=4 to complete the rectangle." },
        { text: "(1,1)", correct: false, feedback: "Already given.", misconceptionId: "E-d6-a" },
        { text: "(4,1)", correct: false, feedback: "Already given.", misconceptionId: "E-d6-b" },
        { text: "(1,4)", correct: false, feedback: "Already given.", misconceptionId: "E-d6-c" }
      ],
    backward: "Plot the points; the missing corner must align with the other x and y values.",
    forward: "Coordinate geometry links algebra and shape.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student repeats one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point, not one already given — it takes the x-coordinate from one given point (4) and the y-coordinate from another (4), forming (4,4)."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the 'other' x-value (4, from (4,1)) with the 'other' y-value (4, from (1,4)) to get (4,4)."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the missing x-value (4) with the missing y-value (4) to get (4,4), not repeat an existing vertex."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot the three known points", hint: "(1,1), (1,4), (4,1) — sketch them on a grid." },
      { level: 2, description: "Find the missing x-value", hint: "Two points share x=1; the third has x=4 — the missing point needs x=4." },
      { level: 3, description: "Find the missing y-value", hint: "Two points share y=1; the third has y=4 — the missing point needs y=4." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-05",
    question: "Two angles are complementary. One is twice the other. Find the larger angle.",
    options: [
        { text: "60°", correct: true, feedback: "Let smaller = x, larger = 2x. x + 2x = 90 → 3x = 90 → x = 30, larger = 60°." },
        { text: "30°", correct: false, feedback: "That's the smaller angle.", misconceptionId: "E-d7-a" },
        { text: "45°", correct: false, feedback: "That would be if they were equal.", misconceptionId: "E-d7-b" },
        { text: "90°", correct: false, feedback: "That's the total sum.", misconceptionId: "E-d7-c" }
      ],
    backward: "Complementary angles sum to 90°. Set up x + 2x = 90.",
    forward: "These equation‑based angle problems are common in exams.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student correctly solves for x=30 but reports the smaller angle instead of the larger angle requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle (x) with the larger angle (2x) that the question asks for.",
        remediation: "The question asks for the LARGER angle — after solving x=30, the larger angle is 2x=60°, not x=30° (that's the smaller one)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student assumes the two angles are equal (each 45°), ignoring the stated 'twice' relationship.",
        rootCause: "Ratio Condition Ignored — applies a simple equal-split instead of the stated 2:1 ratio.",
        remediation: "The question says one angle is TWICE the other, not equal — set up x + 2x = 90 (not x + x = 90) to respect the 2:1 ratio."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student reports the total sum (90°) instead of solving the equation for the larger angle.",
        rootCause: "Equation Not Solved — stops at recalling the sum rule without solving for x.",
        remediation: "90° is the TOTAL of both angles combined — you must solve the equation x+2x=90 to find the actual larger angle value, not just state the sum."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = 2x." },
      { level: 2, description: "Apply the sum rule", hint: "x + 2x = 90." },
      { level: 3, description: "Solve and identify the larger angle", hint: "3x=90, so x=30. The LARGER angle is 2x, not x." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a ratio-based angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-05",
    question: "An isosceles triangle has one angle of 100°. Find the other two angles.",
    options: [
        { text: "40° each", correct: true, feedback: "The 100° must be the vertex angle. 180 − 100 = 80; ÷2 = 40° each." },
        { text: "50° each", correct: false, feedback: "That would give a sum of 200° (100+50+50).", misconceptionId: "E-d8-a" },
        { text: "80° and 0°", correct: false, feedback: "Impossible.", misconceptionId: "E-d8-b" },
        { text: "30° and 50°", correct: false, feedback: "Not isosceles (not equal).", misconceptionId: "E-d8-c" }
      ],
    backward: "The 100° must be the vertex angle; the base angles are equal.",
    forward: "Isosceles triangles have two equal sides and two equal angles.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student assumes the two equal angles could be larger than 90° minus half the given angle, without checking the total sum stays 180°.",
        rootCause: "Angle Sum Verification Skipped — doesn't check that the three angles actually add up to 180°.",
        remediation: "Always verify: 100+50+50=200, which is MORE than 180° — impossible for a triangle. The correct equal angles must satisfy 100+x+x=180, giving x=40."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student proposes an angle of 0°, which cannot form a valid triangle, alongside an unequal 80°.",
        rootCause: "Invalid Triangle Proposed — suggests angles that violate both the isosceles condition and basic triangle validity (an angle can't be 0°).",
        remediation: "Both remaining angles must be EQUAL (that's what makes it isosceles) and POSITIVE (greater than 0°) — 80° and 0° satisfies neither condition properly."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student proposes two unequal angles (30° and 50°), violating the requirement that an isosceles triangle's base angles must be equal.",
        rootCause: "Equal-Angle Requirement Ignored — doesn't ensure the two remaining angles are equal, which is required for isosceles.",
        remediation: "Isosceles means TWO angles are EQUAL — 30° and 50° are different from each other, which doesn't satisfy the isosceles condition, even if they sum correctly with 100°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the vertex angle", hint: "The given 100° must be the unique (vertex) angle, since two angles ≥90° would exceed 180°." },
      { level: 2, description: "Find the remaining sum", hint: "180° - 100° = ?" },
      { level: 3, description: "Split equally", hint: "80° ÷ 2 = ? (the two remaining angles must be equal)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-04",
    question: "A circle has diameter 1 m. What is its radius in centimetres?",
    options: [
        { text: "50 cm", correct: true, feedback: "1 m = 100 cm. Radius = 100 ÷ 2 = 50 cm." },
        { text: "100 cm", correct: false, feedback: "That's the diameter in cm.", misconceptionId: "E-d9-a" },
        { text: "25 cm", correct: false, feedback: "You divided by 4.", misconceptionId: "E-d9-b" },
        { text: "200 cm", correct: false, feedback: "You multiplied by 2.", misconceptionId: "E-d9-c" }
      ],
    backward: "Convert to cm first, then divide by 2.",
    forward: "Unit conversions appear everywhere in measurement.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student correctly converts to 100 cm but forgets to halve it to find the radius, reporting the diameter instead.",
        rootCause: "Halving Step Omitted — stops after the unit conversion, forgetting to also find the radius.",
        remediation: "The question has TWO steps: convert units AND find the radius — after converting to 100 cm (diameter), divide by 2 to get the radius: 50 cm."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student divides the diameter by 4 instead of 2, overshooting the reduction.",
        rootCause: "Wrong Divisor Applied — uses an incorrect divisor when halving the diameter.",
        remediation: "Radius = diameter ÷ 2 exactly — divide 100 cm by 2, not 4: 100 ÷ 2 = 50 cm."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student multiplies instead of dividing, doubling the diameter instead of halving it.",
        rootCause: "Operation Direction Confusion — multiplies instead of dividing when finding the radius from the diameter.",
        remediation: "Radius is SMALLER than diameter (it's half) — divide by 2, don't multiply: 100 ÷ 2 = 50 cm, not 100 × 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to centimetres", hint: "1 m = 100 cm." },
      { level: 2, description: "Find the radius", hint: "Radius = diameter ÷ 2." },
      { level: 3, description: "Compute", hint: "100 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-01",
    question: "A shape has 4 lines of symmetry. Which could it be?",
    options: [
        { text: "Square", correct: true, feedback: "A square has 4 lines of symmetry (two diagonals, one vertical, one horizontal)." },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A non‑square rectangle has only 2 lines of symmetry.", misconceptionId: "E-d10-a" },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry.", misconceptionId: "E-d10-b" },
        { text: "Regular hexagon", correct: false, feedback: "A regular hexagon has 6 lines.", misconceptionId: "E-d10-c" }
      ],
    backward: "A square has symmetry along both diagonals and both midlines.",
    forward: "The number of lines of symmetry helps identify regular polygons.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student picks a non-square rectangle, which has only 2 lines of symmetry, missing that the question asks for 4.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the stated 4.",
        remediation: "A non-square rectangle only has 2 lines of symmetry (the midlines) — its diagonals don't work since the sides aren't equal — this doesn't match the required 4."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student picks the equilateral triangle, which has 3 lines of symmetry, missing that the question asks for 4.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the stated 4.",
        remediation: "An equilateral triangle has 3 lines of symmetry (one per vertex) — this doesn't match the required 4; a square (4 sides) matches instead."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student picks the regular hexagon, which has 6 lines of symmetry, missing that the question asks for 4.",
        rootCause: "Symmetry Count Mismatch — doesn't verify the shape's actual symmetry count matches the stated 4.",
        remediation: "A regular hexagon has 6 lines of symmetry (matching its 6 sides) — this doesn't match the required 4; a square (4 sides, 4 lines) matches instead."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall each shape's symmetry count", hint: "Rectangle=2, equilateral triangle=3, hexagon=6." },
      { level: 2, description: "Recall the square's count", hint: "A square has 4 lines (2 midlines + 2 diagonals)." },
      { level: 3, description: "Match to the requirement", hint: "Which shape's count exactly equals 4?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-06",
    question: "A cube has edge length 5 cm. What is the total length of all its edges?",
    options: [
        { text: "60 cm", correct: true, feedback: "A cube has 12 edges. 12 × 5 = 60 cm." },
        { text: "30 cm", correct: false, feedback: "You used 6 faces instead of 12 edges? 6×5=30.", misconceptionId: "E-d11-a" },
        { text: "20 cm", correct: false, feedback: "You used 4 edges per face? No.", misconceptionId: "E-d11-b" },
        { text: "120 cm", correct: false, feedback: "You multiplied by 24? No.", misconceptionId: "E-d11-c" }
      ],
    backward: "A cube has 12 edges; multiply by the length of one edge.",
    forward: "This is used in frame construction and wire models.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student multiplies the edge length by the number of FACES (6) instead of the number of EDGES (12).",
        rootCause: "3D Attribute Confusion — mixes up faces (6) with edges (12) when computing total edge length.",
        remediation: "The question asks about EDGES, of which a cube has 12 (not 6, which is the number of faces) — multiply 5 cm by 12, not 6."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student uses only 4 edges (one face's worth) instead of all 12 edges of the cube.",
        rootCause: "Incomplete Edge Count — only counts the edges of one face, not the whole 3D shape.",
        remediation: "A cube has edges on the TOP face (4), BOTTOM face (4), AND connecting them vertically (4 more) — that's 12 total, not just the 4 on one face."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student overcounts the edges, using 24 instead of the correct 12.",
        rootCause: "Edge Count Doubled — counts each edge twice, perhaps by double-counting shared edges between faces.",
        remediation: "A cube has exactly 12 distinct edges (not 24) — each edge is shared by exactly 2 faces but should only be counted ONCE in the total edge count."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the edge count", hint: "A cube has 12 edges." },
      { level: 2, description: "Set up the multiplication", hint: "12 × 5 = ?" },
      { level: 3, description: "Check", hint: "Count edges systematically: 4 top + 4 bottom + 4 vertical = 12." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-05",
    question: "A point moves 3 units right and 2 units down from (4,5). What are the new coordinates?",
    options: [
        { text: "(7,3)", correct: true, feedback: "Right: 4+3=7. Down: 5−2=3 → (7,3)." },
        { text: "(1,7)", correct: false, feedback: "You subtracted x and added y.", misconceptionId: "E-d12-a" },
        { text: "(7,7)", correct: false, feedback: "You only moved right, forgot down.", misconceptionId: "E-d12-b" },
        { text: "(4,5)", correct: false, feedback: "No movement.", misconceptionId: "E-d12-c" }
      ],
    backward: "Right means add to x; down means subtract from y.",
    forward: "Translation is the simplest coordinate transformation.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student applies the operations to the wrong coordinates, subtracting from x (should add) and adding to y (should subtract).",
        rootCause: "Direction-to-Operation Mapping Reversed — swaps which operation (add/subtract) applies to which coordinate (x/y).",
        remediation: "RIGHT means ADD to x (moving right increases x); DOWN means SUBTRACT from y (moving down decreases y) — don't reverse these mappings."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student correctly updates the x-coordinate (4+3=7) but leaves the y-coordinate unchanged, forgetting the 'down' movement.",
        rootCause: "Partial Movement Applied — applies only one of the two described movements.",
        remediation: "The point moves in BOTH directions — update x (right movement, add 3) AND y (down movement, subtract 2): x=4+3=7, y=5-2=3."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student reports the original coordinates unchanged, not applying either movement.",
        rootCause: "Movement Not Applied — doesn't perform either the horizontal or vertical shift.",
        remediation: "The point DOES move — apply both changes: add 3 to x (right) and subtract 2 from y (down), rather than leaving the original point unchanged."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Update the x-coordinate", hint: "Right movement adds to x: 4 + 3 = ?" },
      { level: 2, description: "Update the y-coordinate", hint: "Down movement subtracts from y: 5 - 2 = ?" },
      { level: 3, description: "Write the new point", hint: "(new x, new y) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "An angle is equal to its supplement. Find the angle.",
    options: [
        { text: "90°", correct: true, feedback: "x = 180 − x → 2x = 180 → x = 90°." },
        { text: "45°", correct: false, feedback: "45 + 45 = 90, not 180.", misconceptionId: "E-d13-a" },
        { text: "180°", correct: false, feedback: "180 = 0? No.", misconceptionId: "E-d13-b" },
        { text: "0°", correct: false, feedback: "0 + 180 = 180, but 0 ≠ 180.", misconceptionId: "E-d13-c" }
      ],
    backward: "Set up x = 180 − x.",
    forward: "A right angle is the only angle equal to its supplement.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student confuses this with a complementary-angle scenario (summing to 90°) instead of a supplementary one (summing to 180°).",
        rootCause: "Complementary/Supplementary Confusion — mixes up the 90° sum rule with the 180° sum rule.",
        remediation: "A SUPPLEMENT means the two angles sum to 180° — if the angle equals its supplement, then angle+angle=180°, giving 2×angle=180°, so angle=90°, not 45° (which would satisfy the 90° complementary rule instead)."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student reports the total sum (180°) as if it were the angle itself, rather than solving the equation for a single angle value.",
        rootCause: "Equation Not Solved — stops at recalling the sum rule without solving x=180-x for x.",
        remediation: "180° is the SUM of the angle and its supplement combined — you must solve x=180-x to find the SINGLE angle value that satisfies this equation, which is 90°."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student proposes 0° as the angle, not verifying that 0° does not actually equal its own supplement (180°).",
        rootCause: "Solution Not Verified — doesn't check that the proposed answer actually satisfies the original condition (angle equals its supplement).",
        remediation: "Check: does 0° equal its supplement? The supplement of 0° is 180°-0°=180°, and 0°≠180°, so 0° does NOT satisfy the condition — only 90° does, since 90°=180°-90°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the equation", hint: "The angle equals its supplement: x = 180 - x." },
      { level: 2, description: "Solve for x", hint: "2x = 180." },
      { level: 3, description: "Verify", hint: "Does 90 equal 180-90?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-07",
    question: "The angles of a triangle are (x+10)°, (2x−10)°, and (3x−30)°. Find x.",
    options: [
        { text: "35", correct: true, feedback: "Sum = (x+10)+(2x−10)+(3x−30) = 6x − 30 = 180 → 6x = 210 → x = 35." },
        { text: "30", correct: false, feedback: "Then sum = 6(30)−30 = 150, not 180.", misconceptionId: "E-d14-a" },
        { text: "40", correct: false, feedback: "Then sum = 210, >180.", misconceptionId: "E-d14-b" },
        { text: "25", correct: false, feedback: "Then sum = 120.", misconceptionId: "E-d14-c" }
      ],
    backward: "Sum the expressions, set equal to 180°, solve for x.",
    forward: "Algebraic triangles prepare for more advanced geometry proofs.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student guesses or miscalculates a value of x that produces a total below 180°, without solving the equation precisely.",
        rootCause: "Equation Not Solved Precisely — doesn't algebraically isolate x, instead estimating or guessing.",
        remediation: "Combine like terms first: (x+10)+(2x-10)+(3x-30)=6x-30. Set this equal to 180 and solve algebraically: 6x=210, x=35 — verify by checking 6(35)-30=180."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student makes an error combining the like terms, leading to an equation that yields a sum exceeding 180° when checked.",
        rootCause: "Like-Terms Combination Error — miscombines the coefficients or constants when simplifying the sum of the three expressions.",
        remediation: "Carefully combine: coefficients of x sum to 1+2+3=6, constants sum to 10-10-30=-30, giving 6x-30 — recheck this combination before setting it equal to 180."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes an algebraic error solving 6x-30=180, landing on x=25 instead of x=35.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Solve step by step: 6x-30=180 → 6x=210 (add 30 to both sides) → x=35 (divide by 6) — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the three expressions", hint: "(x+10)+(2x-10)+(3x-30) = 6x - 30." },
      { level: 2, description: "Set equal to 180", hint: "6x - 30 = 180." },
      { level: 3, description: "Solve for x", hint: "6x = 210, so x = ?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.45, condition: "Combining like terms across three algebraic angle expressions is a direct precursor to multi-term algebraic simplification." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-05",
    question: "A circle has diameter 14 cm. A point Q is 6 cm from the centre. Is Q inside, on, or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "Radius = 7 cm. Distance 6 cm < 7 cm → inside." },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 7 cm.", misconceptionId: "E-d15-a" },
        { text: "Outside", correct: false, feedback: "6 < 7, so inside.", misconceptionId: "E-d15-b" },
        { text: "Cannot say", correct: false, feedback: "We can compare.", misconceptionId: "E-d15-c" }
      ],
    backward: "Find the radius, then compare the distance to the radius.",
    forward: "This is the fundamental idea of a circle's boundary.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student assumes a distance 'close to' the radius must be exactly on the circle, without verifying exact equality.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance as exactly equal without precise comparison.",
        remediation: "'On the circle' requires the distance to be EXACTLY equal to the radius (7 cm) — since 6 cm ≠ 7 cm, the point is not on the circle; since 6 < 7, it's inside."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reverses the inside/outside comparison, thinking a distance less than the radius means the point is outside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to the radius.",
        remediation: "A point is INSIDE the circle when its distance from the centre is LESS than the radius — since 6 < 7 (the radius), the point is closer, meaning INSIDE, not outside."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student forgets to first compute the radius from the given diameter before comparing to the point's distance.",
        rootCause: "Radius Not Derived First — attempts to compare the distance to the diameter instead of the radius.",
        remediation: "First find the radius (diameter ÷ 2 = 7 cm), THEN compare the point's distance (6 cm) to this radius — you cannot compare directly to the diameter."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the radius", hint: "Radius = diameter ÷ 2 = 14 ÷ 2 = 7 cm." },
      { level: 2, description: "Compare the distance to the radius", hint: "Is 6 cm greater than, less than, or equal to 7 cm?" },
      { level: 3, description: "Determine the position", hint: "Distance less than radius means the point is..." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-06",
    question: "An equilateral triangle is placed on top of a square, sharing one full side (the triangle's base). The apex points upward. How many lines of symmetry does the combined shape have?",
    options: [
        { text: "1", correct: true, feedback: "Only the vertical line through the centre creates mirror halves." },
        { text: "0", correct: false, feedback: "The vertical midline does work.", misconceptionId: "E-d16-a" },
        { text: "2", correct: false, feedback: "The horizontal midline does not work because of the triangle on top.", misconceptionId: "E-d16-b" },
        { text: "4", correct: false, feedback: "That would be the square alone.", misconceptionId: "E-d16-c" }
      ],
    backward: "Draw the shape; only the vertical line through the centre creates mirror halves.",
    forward: "Symmetry of composite shapes is used in architecture and logos.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student assumes the composite house-like shape has no symmetry at all, perhaps due to its irregular overall outline.",
        rootCause: "Composite Shape Symmetry Doubt — assumes an irregular-looking combined shape must lack any symmetry.",
        remediation: "Even though the overall shape (square + triangle) isn't a simple polygon, the VERTICAL line through its centre still divides it into two mirror-image halves — test this fold before concluding zero symmetry."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student assumes the square's horizontal symmetry line still works for the combined shape, not recognising the triangle on top breaks that particular symmetry.",
        rootCause: "Composite Shape Symmetry Overextended — carries over a symmetry line from just the square without checking it still works for the combined shape.",
        remediation: "The square ALONE has a horizontal line of symmetry, but adding the triangle only on TOP makes the shape taller on top than bottom — this breaks horizontal symmetry, leaving only the vertical line valid."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student reports the symmetry count of the square alone (4 lines), ignoring that adding the triangle changes the overall shape's symmetry.",
        rootCause: "Composite Shape Not Reconsidered — uses the original square's symmetry count without accounting for the added triangle.",
        remediation: "The triangle is only on the TOP of the square, not symmetric around the whole shape's centre in the same way — this breaks 3 of the square's 4 original symmetry lines (both diagonals and the horizontal), leaving only the vertical line."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sketch the combined shape", hint: "A square with an equilateral triangle sitting on top of one side, apex pointing up." },
      { level: 2, description: "Test the vertical line", hint: "Does folding along the vertical centre line create matching halves?" },
      { level: 3, description: "Test the other lines", hint: "Do the horizontal line or diagonals still work, given the triangle is only on top?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-07",
    question: "A cube has volume 27 cm³. What is the length of one edge?",
    options: [
        { text: "3 cm", correct: true, feedback: "∛27 = 3, because 3 × 3 × 3 = 27." },
        { text: "9 cm", correct: false, feedback: "9 × 9 × 9 = 729, not 27.", misconceptionId: "E-d17-a" },
        { text: "27 cm", correct: false, feedback: "That's the volume, not the edge.", misconceptionId: "E-d17-b" },
        { text: "6 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    backward: "The cube of what number equals 27?",
    forward: "Cube roots are the inverse of cubing; volume and side length are connected.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student divides 27 by 3 to get 9, confusing the cube root operation with simple division.",
        rootCause: "Cube Root Confused with Division — divides by 3 instead of finding the number that, when cubed, equals 27.",
        remediation: "Cube root is NOT division by 3 — it's finding a number x such that x×x×x=27. Testing x=3: 3×3×3=27 ✓ — so the edge is 3 cm, not 9 (since 9×9×9=729, far too large)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student reports the given volume (27) directly as if it were the edge length, without any calculation.",
        rootCause: "Wrong Value Reported — confuses the given volume with the requested edge length.",
        remediation: "Volume and edge length are different measurements — you must find the cube ROOT of the volume (∛27=3) to get the edge length, not just restate the volume."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student computes an incorrect value, perhaps confusing cube root with square root or halving.",
        rootCause: "Wrong Root Operation Applied — applies a different root (like square root) instead of cube root.",
        remediation: "Since volume = side³ (side cubed, i.e. multiplied by itself THREE times), you need the CUBE root, not square root — test: 6×6×6=216, not 27, so 6 is wrong; 3×3×3=27 is correct."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the volume formula", hint: "Volume of cube = side × side × side = side³." },
      { level: 2, description: "Find the cube root", hint: "What number, multiplied by itself three times, equals 27?" },
      { level: 3, description: "Verify", hint: "Test your answer: does it cubed equal 27?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-06",
    question: "Three vertices of a square are (2,2), (2,5), (5,2). Find the fourth vertex.",
    options: [
        { text: "(5,5)", correct: true, feedback: "The missing corner must have x=5 and y=5." },
        { text: "(2,2)", correct: false, feedback: "Already given.", misconceptionId: "E-d18-a" },
        { text: "(5,2)", correct: false, feedback: "Already given.", misconceptionId: "E-d18-b" },
        { text: "(2,5)", correct: false, feedback: "Already given.", misconceptionId: "E-d18-c" }
      ],
    backward: "The missing corner must align with the other x and y values.",
    forward: "Squares in the coordinate plane have equal side lengths and right angles.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student repeats one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the square-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point, not one already given — combine the missing x-value (5) with the missing y-value (5) to get (5,5)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the square-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the 'other' x-value (5) with the 'other' y-value (5, from (2,5)) to get (5,5)."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the square-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the 'other' x-value (5, from (5,2)) with the 'other' y-value (5) to get (5,5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot the three known points", hint: "(2,2), (2,5), (5,2) — sketch them on a grid." },
      { level: 2, description: "Find the missing x-value", hint: "Two points share x=2; the third has x=5 — the missing point needs x=5." },
      { level: 3, description: "Find the missing y-value", hint: "Two points share y=2; the third has y=5 — the missing point needs y=5." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "Two angles are supplementary; one is 40° more than the other. Find the smaller angle.",
    options: [
        { text: "70°", correct: true, feedback: "Smaller = x, larger = x+40. x + (x+40) = 180 → 2x = 140 → x = 70°." },
        { text: "110°", correct: false, feedback: "That's the larger angle.", misconceptionId: "E-d19-a" },
        { text: "40°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-b" },
        { text: "140°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d19-c" }
      ],
    backward: "Let the smaller be x; the larger is x+40. Sum is 180°.",
    forward: "Word problems with supplementary angles use simple algebra.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student correctly solves for x=70 but reports the larger angle (x+40=110) instead of the smaller angle requested.",
        rootCause: "Wrong Value Reported — confuses the larger angle with the smaller angle that the question asks for.",
        remediation: "The question asks for the SMALLER angle — after solving x=70, the smaller angle IS x=70°, and the larger angle (x+40=110°) is a different value."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student reports the difference between the two angles (40°) instead of solving for the smaller angle itself.",
        rootCause: "Wrong Value Reported — confuses the given difference with the requested angle value.",
        remediation: "40° is just the DIFFERENCE between the two angles, not either angle itself — solve the equation x+(x+40)=180 to find the actual smaller angle: 70°."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student reports twice the smaller angle (2×70=140) instead of the smaller angle itself.",
        rootCause: "Intermediate Value Reported — confuses an intermediate step's value with the final answer.",
        remediation: "140 is the value of 2x during solving (before dividing by 2) — the final answer for x (the smaller angle) is 140÷2=70°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = x+40." },
      { level: 2, description: "Apply the sum rule", hint: "x + (x+40) = 180." },
      { level: 3, description: "Solve and identify the smaller angle", hint: "2x=140, so x=?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a difference-based angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-08",
    question: "A triangle is both right‑angled and isosceles. Find its acute angles.",
    options: [
        { text: "45° each", correct: true, feedback: "180° − 90° = 90°. Divide by 2 → 45°." },
        { text: "60° and 30°", correct: false, feedback: "That's a 30‑60‑90 triangle, not isosceles.", misconceptionId: "E-d20-a" },
        { text: "90° and 45°", correct: false, feedback: "A triangle can't have two 90° angles.", misconceptionId: "E-d20-b" },
        { text: "50° each", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-d20-c" }
      ],
    backward: "Subtract the right angle (90°), then divide the remaining 90° equally.",
    forward: "The right isosceles triangle is a special triangle in geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student proposes a valid right-angled triangle (30-60-90) but one that isn't isosceles, since 30°≠60°.",
        rootCause: "Isosceles Condition Not Verified — doesn't check that the two proposed acute angles are actually EQUAL.",
        remediation: "The triangle must be BOTH right-angled AND isosceles — this means the TWO ACUTE angles must be equal (since the right angle can't repeat), giving 45° and 45°, not the unequal 30° and 60°."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student proposes two angles that include another 90°, violating the rule that a triangle can have only one right angle.",
        rootCause: "Triangle Validity Violated — proposes a triangle with two 90° angles, which is geometrically impossible (would need a third angle of 0°).",
        remediation: "A triangle can have AT MOST one 90° angle — if there were two 90° angles, the third would have to be 0°, which isn't a valid angle; only ONE angle is 90°, and the other two share the remaining 90°."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student makes a computational error, landing on 50° each instead of 45° each, which would make the total sum incorrect.",
        rootCause: "Angle Sum Verification Skipped — doesn't check that 90+50+50=190, which exceeds 180°.",
        remediation: "Verify: 90+50+50=190, which is MORE than 180° — impossible. The correct equal angles must satisfy 90+x+x=180, giving x=45."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Account for the right angle", hint: "One angle is 90°. Only one angle in a triangle can be 90°." },
      { level: 2, description: "Find the remaining sum", hint: "180° - 90° = ?" },
      { level: 3, description: "Split equally (isosceles)", hint: "90° ÷ 2 = ? (the two remaining angles must be equal)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d21",
    order: 21,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-02",
    question: "How many chords of length exactly 20 cm can be drawn in a circle of diameter 18 cm?",
    options: [
        { text: "0", correct: true, feedback: "The longest possible chord is the diameter (18 cm). No chord can be 20 cm long." },
        { text: "1", correct: false, feedback: "A 20 cm chord would be longer than the diameter, which is impossible.", misconceptionId: "E-d21-a" },
        { text: "2", correct: false, feedback: "Impossible.", misconceptionId: "E-d21-b" },
        { text: "Infinitely many", correct: false, feedback: "Only chords ≤18 cm exist; 20 cm exceeds the maximum.", misconceptionId: "E-d21-c" }
      ],
    backward: "The diameter is the longest chord in a circle. No chord can exceed it.",
    forward: "This reinforces the key property of chords and the diameter.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student assumes exactly one such chord could exist, not recognising that ANY chord exceeding the diameter length is impossible.",
        rootCause: "Maximum Chord Length Not Applied — doesn't recognise the diameter as an absolute upper bound on chord length.",
        remediation: "The diameter (18 cm) is the ABSOLUTE MAXIMUM possible chord length in this circle — since 20 cm > 18 cm, NO chord of that length can exist, not even one."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student assumes multiple such impossible chords could exist, not recognising the fundamental impossibility.",
        rootCause: "Maximum Chord Length Not Applied — doesn't recognise the diameter as an absolute upper bound on chord length.",
        remediation: "Since 20 cm exceeds the maximum possible chord length (18 cm, the diameter), it's impossible for ANY such chord to exist — the answer is 0, not 2."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student assumes chords can have any length, including exceeding the diameter, without recognising the diameter caps the maximum.",
        rootCause: "Maximum Chord Length Not Understood — doesn't recognise that every chord in a circle is bounded above by the diameter.",
        remediation: "EVERY chord in a circle has length at most equal to the diameter (18 cm) — a chord of 20 cm is simply impossible to draw, giving 0 such chords, not infinitely many."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the maximum chord length", hint: "The longest possible chord in any circle is the diameter." },
      { level: 2, description: "Compare the requested length to the diameter", hint: "Is 20 cm greater than the diameter (18 cm)?" },
      { level: 3, description: "Conclude", hint: "If the requested length exceeds the maximum possible, how many such chords exist?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-07",
    question: "A shape has exactly 2 lines of symmetry and all its sides are equal. Which shape could it be?",
    options: [
        { text: "Rhombus", correct: true, feedback: "A rhombus has all sides equal and generally 2 lines of symmetry (its diagonals)." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry.", misconceptionId: "E-d22-a" },
        { text: "Rectangle (non‑square)", correct: false, feedback: "A rectangle does not have all sides equal.", misconceptionId: "E-d22-b" },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry.", misconceptionId: "E-d22-c" }
      ],
    backward: "A rhombus has all sides equal and generally 2 lines of symmetry (its diagonals).",
    forward: "Classifying quadrilaterals by symmetry and sides deepens shape knowledge.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student picks the square, which does have all sides equal, but has 4 lines of symmetry (not the required 2).",
        rootCause: "Symmetry Count Mismatch — satisfies the equal-sides condition but not the specific symmetry-count condition.",
        remediation: "A square DOES have all sides equal, but it has 4 lines of symmetry (2 midlines + 2 diagonals) — the question requires exactly 2, which a general (non-square) rhombus satisfies instead."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student picks a rectangle, which may have 2 lines of symmetry but does NOT have all sides equal.",
        rootCause: "Equal-Sides Condition Ignored — satisfies the symmetry-count condition but not the equal-sides requirement.",
        remediation: "A non-square rectangle has 2 lines of symmetry, BUT its sides are NOT all equal (length ≠ width) — the question requires BOTH conditions, which only a (non-square) rhombus satisfies."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student picks the equilateral triangle, which has all sides equal but 3 lines of symmetry (not the required 2).",
        rootCause: "Symmetry Count Mismatch — satisfies the equal-sides condition but not the specific symmetry-count condition.",
        remediation: "An equilateral triangle DOES have all sides equal, but it has 3 lines of symmetry — the question requires exactly 2, which a rhombus satisfies instead."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List shapes with all equal sides", hint: "Square, rhombus, equilateral triangle." },
      { level: 2, description: "Check each one's symmetry count", hint: "Square=4, rhombus=2, equilateral triangle=3." },
      { level: 3, description: "Match to the requirement", hint: "Which shape has BOTH equal sides AND exactly 2 lines of symmetry?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-08",
    question: "A cuboid has length 10 cm, width 5 cm, and height 2 cm. What is the sum of the lengths of all its edges?",
    options: [
        { text: "68 cm", correct: true, feedback: "4 × (10 + 5 + 2) = 4 × 17 = 68 cm." },
        { text: "17 cm", correct: false, feedback: "That's the sum of the three dimensions.", misconceptionId: "E-d23-a" },
        { text: "34 cm", correct: false, feedback: "You multiplied by 2 instead of 4.", misconceptionId: "E-d23-b" },
        { text: "100 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d23-c" }
      ],
    backward: "A cuboid has 4 edges of each dimension. Add the three different dimensions and multiply by 4.",
    forward: "This is useful for calculating the frame length of a box.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student sums the three dimensions but forgets to multiply by 4 to account for 4 edges of each dimension.",
        rootCause: "Multiplication by 4 Omitted — stops after adding the dimensions once, forgetting each dimension appears 4 times among the 12 edges.",
        remediation: "A cuboid has 4 edges of EACH dimension (4 lengths, 4 widths, 4 heights) — after summing the three DIFFERENT dimensions (10+5+2=17), multiply by 4: 4×17=68."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student multiplies the dimension sum by 2 instead of 4, undercounting by half.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of the correct factor of 4.",
        remediation: "A cuboid has 4 edges of each dimension (not 2) — multiply the sum of dimensions by 4: 4×17=68, not 2×17=34."
      },
      {
        misconceptionId: "E-d23-c",
        description: "Student makes a larger computational error, perhaps confusing the edge-sum calculation with volume or surface area.",
        rootCause: "Formula Confusion — applies a different 3D formula (like volume) instead of the total-edge-length formula.",
        remediation: "Total edge length uses 4×(l+b+h), which is different from volume (l×b×h=100) or surface area — recompute using the correct edge-length formula: 4×(10+5+2)=68."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the three different dimensions", hint: "10 + 5 + 2 = ?" },
      { level: 2, description: "Recall how many edges of each dimension", hint: "A cuboid has 4 edges of each length, width, and height." },
      { level: 3, description: "Multiply", hint: "4 × 17 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-06",
    question: "A rectangle has vertices (1,1), (1,3), (4,1). What is the fourth vertex?",
    options: [
        { text: "(4,3)", correct: true, feedback: "The missing vertex shares x=4 and y=3." },
        { text: "(1,1)", correct: false, feedback: "Already given.", misconceptionId: "E-d24-a" },
        { text: "(3,1)", correct: false, feedback: "That would not complete a rectangle.", misconceptionId: "E-d24-b" },
        { text: "(4,1)", correct: false, feedback: "Already given.", misconceptionId: "E-d24-c" }
      ],
    backward: "The missing vertex shares the x of the far right point and the y of the top point.",
    forward: "Completing rectangles on the coordinate grid is a key spatial skill.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student repeats one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the missing x-value (4) with the missing y-value (3) to get (4,3), not repeat (1,1)."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student proposes a point that doesn't correctly complete the rectangle, swapping which coordinate goes with which value.",
        rootCause: "Coordinate Combination Error — mismatches the x and y values when forming the fourth vertex.",
        remediation: "The fourth vertex takes the x-value from (4,1) (which is 4) and the y-value from (1,3) (which is 3), giving (4,3) — not (3,1), which swaps these values incorrectly."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point, not (4,1) which is already given — combine the missing x-value (4) with the missing y-value (3) to get (4,3)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot the three known points", hint: "(1,1), (1,3), (4,1) — sketch them on a grid." },
      { level: 2, description: "Find the missing x-value", hint: "Two points share x=1; the third has x=4 — the missing point needs x=4." },
      { level: 3, description: "Find the missing y-value", hint: "Two points share y=1; the third has y=3 — the missing point needs y=3." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "An angle is 50° less than its supplement. Find the angle.",
    options: [
        { text: "65°", correct: true, feedback: "x = (180−x) − 50 → 2x = 130 → x = 65°." },
        { text: "115°", correct: false, feedback: "That's the supplement.", misconceptionId: "E-r1-a" },
        { text: "50°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "130°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student correctly solves the equation but reports the supplement (180-x) instead of the angle (x) requested.",
        rootCause: "Wrong Value Reported — confuses the supplement with the angle itself that the question asks for.",
        remediation: "The question asks for THE ANGLE, not its supplement — after solving x=65, the ANGLE is 65°, and its supplement (115°) is a different value."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student reports the given difference (50°) instead of solving for the actual angle value.",
        rootCause: "Wrong Value Reported — confuses the given difference with the requested angle.",
        remediation: "50° is just the DIFFERENCE stated in the problem, not the angle itself — solve the equation x=(180-x)-50 to find the actual angle: 65°."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student reports the intermediate value 2x=130 as if it were the final answer, forgetting to divide by 2.",
        rootCause: "Final Division Step Omitted — stops before completing the last step of solving for x.",
        remediation: "130 is the value of 2x, not x itself — divide by 2 to get the final answer: 130÷2=65°."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up the variables", hint: "Let the angle = x, so its supplement = 180 - x." },
      { level: 2, description: "Write the equation", hint: "x = (180 - x) - 50." },
      { level: 3, description: "Solve for x", hint: "2x = 130, so x = ?" }
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
    question: "The angles of a triangle are in the ratio 1:2:3. Find the smallest angle.",
    options: [
        { text: "30°", correct: true, feedback: "1+2+3=6 parts. One part = 180÷6=30°." },
        { text: "20°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "60°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "90°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student miscounts the total number of ratio parts, using an incorrect sum before dividing 180°.",
        rootCause: "Ratio Sum Miscounted — adds the ratio numbers incorrectly.",
        remediation: "Add all three ratio numbers correctly: 1+2+3=6 (not a different total) — this is the total number of 'parts' that divide 180°: 180÷6=30."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student computes the value for 2 parts (the middle ratio value) instead of 1 part (the smallest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the wrong number of parts.",
        remediation: "The question asks for the SMALLEST angle, which corresponds to the ratio value 1 (not 2) — one part alone (1×30=30) is the smallest angle."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student computes the value for 3 parts (the largest ratio value) instead of 1 part (the smallest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the largest ratio number instead of the smallest.",
        remediation: "The question asks for the SMALLEST angle, which corresponds to the ratio value 1 (the smallest number in 1:2:3), not 3 (the largest, giving 90°)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the ratio parts", hint: "1 + 2 + 3 = ?" },
      { level: 2, description: "Find the value of one part", hint: "180° ÷ 6 = ?" },
      { level: 3, description: "Find the smallest angle", hint: "The smallest angle corresponds to the smallest ratio number (1)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-05",
    question: "A circle has radius 9 cm. A point is 8.5 cm from the centre. Is it inside or outside?",
    options: [
        { text: "Inside", correct: true, feedback: "8.5 < 9 → inside." },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reverses the inside/outside comparison, thinking a distance less than the radius means the point is outside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to the radius.",
        remediation: "A point is INSIDE the circle when its distance from the centre is LESS than the radius — since 8.5 < 9 (the radius), the point is closer, meaning INSIDE, not outside."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student assumes a distance 'close to' the radius must be exactly on the circle, without verifying exact equality.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance as exactly equal without precise comparison.",
        remediation: "'On the circle' requires the distance to be EXACTLY equal to the radius (9 cm) — since 8.5 cm ≠ 9 cm, the point is not on the circle; since 8.5 < 9, it's inside."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student believes the inside/outside status cannot be determined without more information, despite having both the radius and the distance.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing distance to radius is sufficient to determine position.",
        remediation: "Comparing the point's distance from the centre (8.5 cm) to the radius (9 cm) IS sufficient — since 8.5 < 9, we can definitively say the point is inside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the radius", hint: "The circle's radius is 9 cm." },
      { level: 2, description: "Compare the distance to the radius", hint: "Is 8.5 cm greater than, less than, or equal to 9 cm?" },
      { level: 3, description: "Determine the position", hint: "Distance less than radius means the point is..." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-04",
    question: "How many lines of symmetry does a regular octagon have?",
    options: [
        { text: "8", correct: true, feedback: "A regular octagon has 8 sides, so 8 lines." },
        { text: "4", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "6", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "10", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student confuses the octagon's symmetry count with the square's count (4 sides = 4 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the octagon.",
        remediation: "An octagon has 8 sides (not 4 like a square) — its symmetry count matches ITS side count: 8, not 4."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student confuses the octagon's symmetry count with the hexagon's count (6 sides = 6 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the octagon.",
        remediation: "An octagon has 8 sides (not 6 like a hexagon) — its symmetry count matches ITS side count: 8, not 6."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student overcounts, perhaps applying a doubling rule that doesn't hold for regular polygon symmetry.",
        rootCause: "Rule Overapplication — applies a doubling pattern that doesn't hold for regular polygons in general.",
        remediation: "For a regular polygon, symmetry lines equal the NUMBER OF SIDES exactly, no doubling — an octagon (8 sides) has 8 lines, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the general rule", hint: "A regular polygon's lines of symmetry equal its number of sides." },
      { level: 2, description: "Count the octagon's sides", hint: "An octagon has 8 sides." },
      { level: 3, description: "Apply the rule", hint: "8 sides means how many lines of symmetry?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-06",
    question: "A cube has edge 3 cm. What is the total length of all its edges?",
    options: [
        { text: "36 cm", correct: true, feedback: "12 × 3 = 36 cm." },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "24 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "72 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student multiplies the edge length by the number of FACES (6) instead of the number of EDGES (12).",
        rootCause: "3D Attribute Confusion — mixes up faces (6) with edges (12) when computing total edge length.",
        remediation: "The question asks about EDGES, of which a cube has 12 (not 6, which is the number of faces) — multiply 3 cm by 12, not 6."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student uses an incorrect edge count, perhaps 8 (the vertex count) instead of 12.",
        rootCause: "3D Attribute Confusion — mixes up edges (12) with vertices (8) when computing total edge length.",
        remediation: "The question asks about EDGES, of which a cube has 12 (not 8, which is the number of vertices) — multiply 3 cm by 12, not 8."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student overcounts the edges, using 24 instead of the correct 12.",
        rootCause: "Edge Count Doubled — counts each edge twice, perhaps by double-counting shared edges between faces.",
        remediation: "A cube has exactly 12 distinct edges (not 24) — each edge is shared by exactly 2 faces but should only be counted ONCE in the total edge count."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the edge count", hint: "A cube has 12 edges." },
      { level: 2, description: "Set up the multiplication", hint: "12 × 3 = ?" },
      { level: 3, description: "Check", hint: "Count edges systematically: 4 top + 4 bottom + 4 vertical = 12." }
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
    question: "Starting at (3,2), move 2 units right and 3 units up. New coordinates?",
    options: [
        { text: "(5,5)", correct: true, feedback: "3+2=5, 2+3=5." },
        { text: "(5,2)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "(3,5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "(1,5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student correctly updates the x-coordinate (3+2=5) but leaves the y-coordinate unchanged, forgetting the 'up' movement.",
        rootCause: "Partial Movement Applied — applies only one of the two described movements.",
        remediation: "The point moves in BOTH directions — update x (right movement) AND y (up movement): x=3+2=5, y=2+3=5."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student correctly updates the y-coordinate (2+3=5) but leaves the x-coordinate unchanged, forgetting the 'right' movement.",
        rootCause: "Partial Movement Applied — applies only one of the two described movements.",
        remediation: "The point moves in BOTH directions — update x (right movement) AND y (up movement): x=3+2=5, y=2+3=5."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student subtracts instead of adding to the x-coordinate, applying the wrong operation for a 'right' movement.",
        rootCause: "Operation Sign Misread — subtracts instead of adding for a rightward movement.",
        remediation: "'Right' movement always ADDS to the x-coordinate (moving right increases x) — 3+2=5, not 3-2=1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Update the x-coordinate", hint: "Right movement adds to x: 3 + 2 = ?" },
      { level: 2, description: "Update the y-coordinate", hint: "Up movement adds to y: 2 + 3 = ?" },
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
    skillId: "GEOLINES-05",
    question: "Two complementary angles differ by 20°. Find the larger angle.",
    options: [
        { text: "55°", correct: true, feedback: "x + (x+20) = 90 → 2x = 70 → x=35, larger=55." },
        { text: "45°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "65°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "35°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student assumes the two angles are equal (each 45°), ignoring the stated 20° difference.",
        rootCause: "Difference Condition Ignored — applies a simple equal-split instead of the stated difference.",
        remediation: "The question says the two angles DIFFER by 20°, not equal — set up x + (x+20) = 90 (not x + x = 90) to respect the stated difference."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student makes a computational error while solving, landing on 65° instead of the correct 55°.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Recheck each step: x+(x+20)=90 → 2x+20=90 → 2x=70 → x=35, so the larger angle is x+20=55° — verify by checking 35+55=90."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student correctly solves for x=35 but reports the smaller angle instead of the larger angle (x+20) requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle with the larger angle that the question asks for.",
        remediation: "The question asks for the LARGER angle — after solving x=35, the larger angle is x+20=55°, not x=35° (that's the smaller one)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = x+20." },
      { level: 2, description: "Apply the sum rule", hint: "x + (x+20) = 90." },
      { level: 3, description: "Solve and identify the larger angle", hint: "2x=70, so x=35. The LARGER angle is x+20." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a difference-based angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-07",
    question: "The angles of a triangle are 2x, 3x, and 5x. Find x.",
    options: [
        { text: "18°", correct: true, feedback: "10x = 180 → x = 18." },
        { text: "20°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "15°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "10°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student miscounts the total coefficient sum, using an incorrect total instead of 10x.",
        rootCause: "Coefficient Sum Miscounted — adds the coefficients of x incorrectly.",
        remediation: "Add the three coefficients correctly: 2+3+5=10 (not a different total) — this gives 10x=180, so x=18, not a different value."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student makes a division error, landing on 15° instead of the correct 18°.",
        rootCause: "Division Computation Error — miscalculates 180 ÷ 10.",
        remediation: "Recompute: 180 ÷ 10 = 18 — verify by multiplying 18 × 10 to see if it returns 180."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student makes a larger computational error, landing on 10° instead of the correct 18°.",
        rootCause: "Division Computation Error — a different miscalculation of 180 ÷ 10.",
        remediation: "Recompute carefully: 2x+3x+5x=10x, and 10x=180, so x=180÷10=18, not 10."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the coefficients", hint: "2x + 3x + 5x = 10x." },
      { level: 2, description: "Set equal to 180", hint: "10x = 180." },
      { level: 3, description: "Solve for x", hint: "180 ÷ 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-04",
    question: "A circle has diameter 2 km. Find its radius in metres.",
    options: [
        { text: "1000 m", correct: true, feedback: "2 km = 2000 m. Radius = 1000 m." },
        { text: "2000 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "500 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "100 m", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student correctly converts to 2000 m but forgets to halve it to find the radius, reporting the diameter instead.",
        rootCause: "Halving Step Omitted — stops after the unit conversion, forgetting to also find the radius.",
        remediation: "The question has TWO steps: convert units AND find the radius — after converting to 2000 m (diameter), divide by 2 to get the radius: 1000 m."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student divides the diameter by 4 instead of 2, overshooting the reduction.",
        rootCause: "Wrong Divisor Applied — uses an incorrect divisor when halving the diameter.",
        remediation: "Radius = diameter ÷ 2 exactly — divide 2000 m by 2, not 4: 2000 ÷ 2 = 1000 m."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student makes a much larger error, perhaps dividing by 20 instead of 2, or misconverting km to m entirely.",
        rootCause: "Unit Conversion Error — a significant miscalculation in converting km to m before or during the halving step.",
        remediation: "First convert 2 km to metres: 2 × 1000 = 2000 m. THEN halve it for the radius: 2000 ÷ 2 = 1000 m — check each conversion step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Convert to metres", hint: "2 km = 2000 m." },
      { level: 2, description: "Find the radius", hint: "Radius = diameter ÷ 2." },
      { level: 3, description: "Compute", hint: "2000 ÷ 2 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.A.1"]
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-05",
    question: "Which shape has 0 lines of symmetry and all sides different?",
    options: [
        { text: "Scalene triangle", correct: true, feedback: "All sides different, no mirror symmetry." },
        { text: "Isosceles triangle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "Rectangle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "Square", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks the isosceles triangle, which has 2 equal sides (not all different) and 1 line of symmetry (not 0).",
        rootCause: "Shape Property Mismatch — doesn't verify BOTH conditions (all sides different AND zero symmetry) for the chosen shape.",
        remediation: "An isosceles triangle has TWO equal sides (not all different) and 1 line of symmetry — this fails both conditions; a SCALENE triangle (no equal sides) satisfies both."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks the rectangle, which has 2 lines of symmetry (not 0) and doesn't have all sides different (opposite sides are equal).",
        rootCause: "Shape Property Mismatch — doesn't verify BOTH conditions for the chosen shape.",
        remediation: "A rectangle has opposite sides EQUAL (not all different) and 2 lines of symmetry (not 0) — this fails both conditions; a scalene triangle satisfies both."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks the square, which has all sides EQUAL (not different) and 4 lines of symmetry (not 0).",
        rootCause: "Shape Property Mismatch — doesn't verify BOTH conditions for the chosen shape.",
        remediation: "A square has ALL sides equal (the opposite of 'all different') and 4 lines of symmetry — this fails both conditions dramatically; a scalene triangle satisfies both."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the 'all sides different' condition", hint: "Which shape has no two sides equal?" },
      { level: 2, description: "Check the '0 symmetry' condition", hint: "Does that same shape have any matching mirror halves?" },
      { level: 3, description: "Confirm both conditions together", hint: "Which shape satisfies BOTH conditions simultaneously?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-07",
    question: "The volume of a cube is 64 cm³. Find the edge length.",
    options: [
        { text: "4 cm", correct: true, feedback: "∛64 = 4." },
        { text: "8 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "32 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "16 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student computes the square root instead of the cube root, or confuses 8×8=64 (square) with the cube root relationship.",
        rootCause: "Wrong Root Operation Applied — applies square root instead of cube root.",
        remediation: "Since volume = side³ (side cubed, multiplied by itself THREE times), you need the CUBE root — test: 8×8×8=512, not 64; 4×4×4=64 is correct, so the edge is 4 cm, not 8."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student divides 64 by 2, confusing the cube root operation with simple division.",
        rootCause: "Cube Root Confused with Division — divides instead of finding the number that, when cubed, equals 64.",
        remediation: "Cube root is NOT division by 2 — it's finding a number x such that x×x×x=64. Testing x=4: 4×4×4=64 ✓ — so the edge is 4 cm, not 32."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student divides 64 by 4, another confusion of cube root with simple division.",
        rootCause: "Cube Root Confused with Division — divides instead of finding the number that, when cubed, equals 64.",
        remediation: "Cube root is NOT division by 4 — test x=4: 4×4×4=64 ✓ — the edge IS 4, but this comes from cubing, not from 64÷4=16 (which happens to look similar but is a different, incorrect operation)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the volume formula", hint: "Volume of cube = side × side × side = side³." },
      { level: 2, description: "Find the cube root", hint: "What number, multiplied by itself three times, equals 64?" },
      { level: 3, description: "Verify", hint: "Test your answer: does it cubed equal 64?" }
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
    question: "Three vertices of a rectangle are (0,0), (0,3), (5,0). Find the fourth vertex.",
    options: [
        { text: "(5,3)", correct: true, feedback: "Missing x=5, y=3." },
        { text: "(0,3)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-a" },
        { text: "(5,0)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-b" },
        { text: "(3,5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student repeats one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point, not one already given — combine the missing x-value (5) with the missing y-value (3) to get (5,3)."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student repeats a different one of the given vertices instead of deriving the missing fourth one.",
        rootCause: "Missing Vertex Not Derived — doesn't apply the rectangle-completion logic to find a NEW point.",
        remediation: "The fourth vertex must be a NEW point — combine the 'other' x-value (5) with the 'other' y-value (3, from (0,3)) to get (5,3)."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student proposes a point with the correct values but in swapped positions (3,5) instead of (5,3).",
        rootCause: "Coordinate Order Reversal — swaps which value goes in the x-position versus the y-position.",
        remediation: "The x-value from the point sharing the same row (5, from (5,0)) goes FIRST; the y-value from the point sharing the same column (3, from (0,3)) goes SECOND — (5,3), not (3,5)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Plot the three known points", hint: "(0,0), (0,3), (5,0) — sketch them on a grid." },
      { level: 2, description: "Find the missing x-value", hint: "Two points share x=0; the third has x=5 — the missing point needs x=5." },
      { level: 3, description: "Find the missing y-value", hint: "Two points share y=0; the third has y=3 — the missing point needs y=3." }
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

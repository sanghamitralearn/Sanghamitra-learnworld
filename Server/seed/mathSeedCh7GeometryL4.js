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
    skillId: "GEOLINES-01",
    question: "What type of angle is 150°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "150° is between 90° and 180°, so it is an obtuse angle." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°.", misconceptionId: "E-w1-a" },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°.", misconceptionId: "E-w1-b" },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°.", misconceptionId: "E-w1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student severely underestimates the angle's category, calling a 150° angle acute.",
        rootCause: "Threshold Comparison Skipped — doesn't compare the angle to the 90° acute/obtuse boundary.",
        remediation: "Always compare to 90° first: 150° is GREATER than 90° (and less than 180°), placing it in the obtuse category, not acute."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student confuses 150° with the specific 90° right-angle value.",
        rootCause: "Angle Category Confusion — doesn't distinguish 'exactly 90°' from other angle measures.",
        remediation: "A right angle is EXACTLY 90° — 150° is 60° more than that, placing it in the obtuse range (90°-180°), not right."
      },
      {
        misconceptionId: "E-w1-c",
        description: "Student rounds up to 180°, confusing an obtuse angle close to (but less than) 180° with the straight angle itself.",
        rootCause: "Angle Category Confusion — conflates an obtuse angle with the larger straight angle.",
        remediation: "A straight angle is EXACTLY 180° — 150° is 30° less than that, still falling in the obtuse range, not straight."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle categories", hint: "Acute < 90° < obtuse < 180° (straight)." },
      { level: 2, description: "Compare the given angle to the boundaries", hint: "Is 150° between 90° and 180°?" },
      { level: 3, description: "Classify", hint: "150° falls between 90° and 180°, so it's obtuse." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle has all three sides equal to 8 cm. What type of triangle is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All sides equal → equilateral." },
        { text: "Isosceles", correct: false, feedback: "Isosceles has exactly two equal sides.", misconceptionId: "E-w2-a" },
        { text: "Scalene", correct: false, feedback: "Scalene has no equal sides.", misconceptionId: "E-w2-b" },
        { text: "Right", correct: false, feedback: "We don't know the angles.", misconceptionId: "E-w2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student confuses 'all three sides equal' with 'isosceles', not recognising isosceles specifically means exactly two.",
        rootCause: "Triangle Category Confusion — conflates the two-equal-sides category with the three-equal-sides category.",
        remediation: "'Isosceles' specifically means exactly TWO equal sides — a triangle with all THREE sides equal is a special case called 'equilateral', not isosceles."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student confuses 'scalene' (no equal sides) with the described triangle (all sides equal), mixing up the two extreme categories.",
        rootCause: "Triangle Category Confusion — mixes up the 'no equal sides' category with the 'all equal sides' category.",
        remediation: "Scalene means NO sides are equal — the opposite of the situation described (ALL three sides equal), which is equilateral."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student assumes a side-based classification requires additional angle information beyond just the side lengths.",
        rootCause: "Classification Requirement Misunderstanding — doesn't recognise that side-based triangle classification uses ONLY the side lengths.",
        remediation: "Classifying a triangle by its SIDES uses ONLY the side lengths given — with all three sides equal (8 cm each), you can classify it as equilateral without needing angle information."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the side-based categories", hint: "Equilateral (3 equal), isosceles (2 equal), scalene (0 equal)." },
      { level: 2, description: "Count the equal sides described", hint: "The question says ALL THREE sides are equal (8 cm each)." },
      { level: 3, description: "Match to the category", hint: "All three sides equal matches which category name?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "w3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-01",
    question: "The diameter of a circle is 10 cm. What is its radius?",
    options: [
        { text: "5 cm", correct: true, feedback: "Radius = diameter ÷ 2 = 5 cm." },
        { text: "10 cm", correct: false, feedback: "That's the diameter.", misconceptionId: "E-w3-a" },
        { text: "20 cm", correct: false, feedback: "You multiplied by 2 instead of dividing.", misconceptionId: "E-w3-b" },
        { text: "2 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-w3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student reports the diameter value directly as the radius, without halving it.",
        rootCause: "Halving Step Omitted — forgets that radius = diameter ÷ 2, not diameter itself.",
        remediation: "The radius is HALF the diameter — you must divide the diameter by 2, not just restate the diameter value."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student multiplies the diameter by 2 instead of dividing, applying the inverse operation.",
        rootCause: "Operation Direction Confusion — multiplies instead of dividing when finding the radius from the diameter.",
        remediation: "Radius is SMALLER than diameter (it's half) — divide the diameter by 2, don't multiply it: 10 ÷ 2 = 5, not 10 × 2."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student divides the diameter by 5 instead of 2, overshooting the reduction.",
        rootCause: "Wrong Divisor Applied — uses an incorrect divisor when halving the diameter.",
        remediation: "Radius = diameter ÷ 2 exactly — divide by 2, not 5: 10 ÷ 2 = 5 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Radius = diameter ÷ 2." },
      { level: 2, description: "Substitute the value", hint: "10 ÷ 2 = ?" },
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
    skillId: "GEOSYM-01",
    question: "How many lines of symmetry does a square have?",
    options: [
        { text: "4", correct: true, feedback: "A square has 4 lines of symmetry (two diagonals, one vertical, one horizontal)." },
        { text: "2", correct: false, feedback: "That's for a rectangle (non‑square).", misconceptionId: "E-w4-a" },
        { text: "1", correct: false, feedback: "Too few.", misconceptionId: "E-w4-b" },
        { text: "8", correct: false, feedback: "Too many.", misconceptionId: "E-w4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w4-a",
        description: "Student counts only the two midline symmetry lines (vertical and horizontal), forgetting the two diagonal lines also work for a square.",
        rootCause: "Incomplete Symmetry Search — finds some but not all valid fold lines.",
        remediation: "A square has FOUR lines of symmetry: the vertical midline, the horizontal midline, AND both diagonals — check all four, not just two."
      },
      {
        misconceptionId: "E-w4-b",
        description: "Student finds only one line of symmetry and stops searching, missing the other three.",
        rootCause: "Incomplete Symmetry Search — stops after finding the first valid fold line.",
        remediation: "Systematically test each possible fold: vertical, horizontal, and both diagonals — a square has symmetry along all four of these."
      },
      {
        misconceptionId: "E-w4-c",
        description: "Student confuses the square's symmetry count with that of a different regular polygon (octagon has 8 sides and 8 lines of symmetry).",
        rootCause: "Shape Confusion — applies the symmetry count of a different polygon to the square.",
        remediation: "A regular polygon has as many lines of symmetry as it has sides — a square has 4 sides, so it has 4 lines of symmetry, not 8 (that's for an octagon)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test the midlines", hint: "Fold vertically and horizontally — do both halves match?" },
      { level: 2, description: "Test the diagonals", hint: "Fold along each diagonal — do both halves match?" },
      { level: 3, description: "Count all valid folds", hint: "How many total fold lines made the halves match?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "w5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-01",
    question: "How many faces does a cube have?",
    options: [
        { text: "6", correct: true, feedback: "A cube has 6 square faces." },
        { text: "4", correct: false, feedback: "Too few.", misconceptionId: "E-w5-a" },
        { text: "8", correct: false, feedback: "8 is the number of vertices.", misconceptionId: "E-w5-b" },
        { text: "12", correct: false, feedback: "12 is the number of edges.", misconceptionId: "E-w5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w5-a",
        description: "Student undercounts, perhaps only picturing the 4 'side' faces and forgetting the top and bottom.",
        rootCause: "Hidden Face Not Counted — forgets faces that aren't immediately visible from one viewing angle (like the bottom or back).",
        remediation: "A cube has faces on ALL sides: front, back, left, right, top, AND bottom — that's 6 total, not just the 4 visible from one angle."
      },
      {
        misconceptionId: "E-w5-b",
        description: "Student confuses the number of faces (flat surfaces) with the number of vertices (corner points).",
        rootCause: "3D Attribute Confusion — mixes up faces (2D surfaces), edges (line segments), and vertices (corner points).",
        remediation: "Faces are the FLAT SURFACES (6 for a cube); vertices are the CORNER POINTS (8 for a cube) — these are different attributes."
      },
      {
        misconceptionId: "E-w5-c",
        description: "Student confuses the number of faces with the number of edges.",
        rootCause: "3D Attribute Confusion — mixes up faces (2D surfaces) with edges (the line segments where two faces meet).",
        remediation: "Faces are the FLAT SURFACES (6 for a cube); edges are the LINE SEGMENTS where two faces meet (12 for a cube) — these are different attributes."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Picture the shape", hint: "Imagine a dice — count each flat square surface." },
      { level: 2, description: "Count systematically", hint: "Top, bottom, front, back, left, right." },
      { level: 3, description: "Total", hint: "How many surfaces did you count?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "w6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-01",
    question: "A point is at (0,7). On which axis does it lie?",
    options: [
        { text: "y‑axis", correct: true, feedback: "x=0 means the point is on the y‑axis." },
        { text: "x‑axis", correct: false, feedback: "y=0 would be on the x‑axis.", misconceptionId: "E-w6-a" },
        { text: "At the origin", correct: false, feedback: "Origin is (0,0).", misconceptionId: "E-w6-b" },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not in any quadrant.", misconceptionId: "E-w6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student confuses which coordinate being zero indicates the x-axis versus the y-axis.",
        rootCause: "Axis Rule Confusion — swaps the condition for lying on the x-axis with the condition for the y-axis.",
        remediation: "A point lies ON the y-axis when its x-coordinate is 0 (like (0,7)) — a point lies on the x-axis when its y-coordinate is 0 (like (7,0))."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student confuses any point with a zero coordinate for the origin specifically, not recognising the origin requires BOTH coordinates to be zero.",
        rootCause: "Origin Definition Confusion — doesn't recognise the origin requires both x=0 AND y=0.",
        remediation: "The origin is specifically (0, 0) — BOTH coordinates must be zero. (0,7) has y=7 (not zero), so it's on the y-axis but not at the origin."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student assumes any point with a positive coordinate must be inside a quadrant, not recognising points exactly on an axis are boundary points, not interior points.",
        rootCause: "Quadrant Boundary Confusion — doesn't recognise that points with a zero coordinate lie ON an axis, not inside any quadrant.",
        remediation: "Quadrants are the four REGIONS between the axes — a point with x=0 lies exactly ON the y-axis (the boundary), not inside any quadrant."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the coordinates", hint: "(0, 7) — x=0, y=7." },
      { level: 2, description: "Apply the axis rule", hint: "x=0 means the point has no horizontal distance from the y-axis." },
      { level: 3, description: "Locate the point", hint: "A point with x=0 lies exactly on which axis?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "Two angles are complementary. One angle is 35°. Find the other.",
    options: [
        { text: "55°", correct: true, feedback: "Complementary angles sum to 90°. 90 − 35 = 55°." },
        { text: "145°", correct: false, feedback: "That would be supplementary (180−35).", misconceptionId: "E-w7-a" },
        { text: "35°", correct: false, feedback: "That's the given angle.", misconceptionId: "E-w7-b" },
        { text: "65°", correct: false, feedback: "Incorrect subtraction.", misconceptionId: "E-w7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student subtracts 35° from 180° instead of 90°, applying the supplementary-angle rule to a complementary-angle situation.",
        rootCause: "Complementary/Supplementary Confusion — mixes up the 90° sum rule with the 180° sum rule.",
        remediation: "COMPLEMENTARY angles sum to 90° (not 180°, which is supplementary) — subtract 35 from 90, not 180: 90-35=55."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student reports the given angle unchanged, not computing the OTHER angle at all.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested unknown angle.",
        remediation: "The question asks for the OTHER angle, not the given one — subtract the given 35° from 90° to find the different, unknown angle."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student makes a computational error in the subtraction, landing on 65° instead of 55°.",
        rootCause: "Subtraction Computation Error — miscalculates 90-35.",
        remediation: "Recompute: 90 - 35 = 55 — verify by adding 35+55 to see if it returns 90."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "Complementary angles sum to 90°." },
      { level: 2, description: "Set up the subtraction", hint: "90° - 35° = ?" },
      { level: 3, description: "Check", hint: "Do 35° and your answer add up to 90°?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "GEOLINES-05", probability: 0.35, condition: "Confusing complementary (90°) with supplementary (180°) sum rules recurs whenever both angle types appear together." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-02",
    question: "A triangle with one angle of exactly 90° is called a ______.",
    options: [
        { text: "Right‑angled triangle", correct: true, feedback: "A 90° angle is a right angle." },
        { text: "Acute‑angled triangle", correct: false, feedback: "All angles < 90°.", misconceptionId: "E-w8-a" },
        { text: "Obtuse‑angled triangle", correct: false, feedback: "One angle > 90°.", misconceptionId: "E-w8-b" },
        { text: "Equilateral triangle", correct: false, feedback: "All angles 60°.", misconceptionId: "E-w8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-w8-a",
        description: "Student confuses a triangle WITH a 90° angle for one where ALL angles are less than 90° (acute).",
        rootCause: "Triangle Angle Category Confusion — mixes up the 'has exactly one 90°' category with the 'all angles under 90°' category.",
        remediation: "'Acute-angled' means ALL THREE angles are less than 90° — a triangle with one EXACT 90° angle is called right-angled, not acute-angled."
      },
      {
        misconceptionId: "E-w8-b",
        description: "Student confuses exactly 90° with an angle greater than 90° (obtuse).",
        rootCause: "Threshold Comparison Error — doesn't distinguish 'equal to 90°' from 'greater than 90°'.",
        remediation: "A 90° angle is EXACTLY 90°, making the triangle right-angled — 'obtuse-angled' specifically requires an angle GREATER than 90°."
      },
      {
        misconceptionId: "E-w8-c",
        description: "Student confuses an angle-based classification (right-angled) with a side-based classification (equilateral).",
        rootCause: "Side/Angle Classification Confusion — mixes up classifying by angle measures with classifying by side lengths.",
        remediation: "'Equilateral' describes SIDE lengths (all equal, giving 60° angles); the question describes an ANGLE measure (90°), which corresponds to 'right-angled'."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the angle-based categories", hint: "Acute-angled (all <90°), right-angled (one =90°), obtuse-angled (one >90°)." },
      { level: 2, description: "Match the given angle", hint: "The triangle has an angle of EXACTLY 90°." },
      { level: 3, description: "Name the category", hint: "Exactly 90° matches which category?" }
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
    tier: "S",
    skillId: "GEOLINES-01",
    question: "What type of angle is 45°?",
    options: [
        { text: "Acute", correct: true, feedback: "An acute angle is less than 90°." },
        { text: "Obtuse", correct: false, feedback: "Obtuse is between 90° and 180°.", misconceptionId: "E-d1-a" },
        { text: "Right", correct: false, feedback: "Right is exactly 90°.", misconceptionId: "E-d1-b" },
        { text: "Straight", correct: false, feedback: "Straight is exactly 180°.", misconceptionId: "E-d1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student assumes any angle that isn't obviously 'small' must be obtuse, without comparing it to the 90° threshold.",
        rootCause: "Threshold Comparison Skipped — doesn't explicitly compare the given angle to 90° before classifying it.",
        remediation: "Always compare the angle's measure to 90°: 45° < 90°, so it's acute — obtuse angles must be strictly greater than 90°."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student confuses any angle with a round-looking number (45) with the specific 90° right angle.",
        rootCause: "Angle Category Confusion — doesn't distinguish the exact value 90° from other angle measures.",
        remediation: "A right angle is EXACTLY 90°, no more, no less — 45° is half of 90°, and any angle less than 90° is acute, not right."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student severely overestimates the angle's category, jumping to the 180° straight-angle classification.",
        rootCause: "Angle Category Confusion — conflates a small acute angle with the much larger straight angle.",
        remediation: "A straight angle is EXACTLY 180° — 45° is far smaller, less than even the 90° right-angle threshold, making it acute."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle categories", hint: "Acute < 90° < obtuse < 180° (straight)." },
      { level: 2, description: "Compare the given angle to 90°", hint: "Is 45° less than, equal to, or greater than 90°?" },
      { level: 3, description: "Classify", hint: "45° is less than 90°, so it falls in the acute category." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "S",
    skillId: "GEOTRI-01",
    question: "A triangle has sides 5 cm, 5 cm, and 8 cm. What type of triangle is it by sides?",
    options: [
        { text: "Isosceles", correct: true, feedback: "Two sides are equal (5 and 5)." },
        { text: "Equilateral", correct: false, feedback: "All three would need to be equal.", misconceptionId: "E-d2-a" },
        { text: "Scalene", correct: false, feedback: "No sides equal.", misconceptionId: "E-d2-b" },
        { text: "Right", correct: false, feedback: "We cannot tell angles from side lengths alone.", misconceptionId: "E-d2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d2-a",
        description: "Student sees two equal sides (5, 5) and assumes ALL sides must be equal, missing that the third side (8) is different.",
        rootCause: "Partial Pattern Overgeneralization — extends a partial match (2 equal sides) to a full match (3 equal sides).",
        remediation: "Check ALL three sides: 5, 5, and 8 — only two match, not all three, so this is isosceles (exactly two equal), not equilateral (all three equal)."
      },
      {
        misconceptionId: "E-d2-b",
        description: "Student focuses on the fact that not all sides are equal and jumps to 'scalene', missing that two sides ARE equal.",
        rootCause: "Partial Pattern Overgeneralization — extends 'not all equal' to 'none equal', missing the two matching sides.",
        remediation: "Scalene means NO sides are equal — but here 5 and 5 ARE equal, so this triangle has exactly two equal sides, making it isosceles, not scalene."
      },
      {
        misconceptionId: "E-d2-c",
        description: "Student confuses an angle-based classification (right-angled) with a side-based classification, applying the wrong system.",
        rootCause: "Side/Angle Classification Confusion — mixes up classifying by side lengths with classifying by angle measures.",
        remediation: "The question asks to classify BY SIDES — 'right' is an angle-based term requiring a 90° angle, which isn't determinable from side lengths alone; use the side-based terms instead."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the three sides", hint: "5 cm, 5 cm, 8 cm." },
      { level: 2, description: "Compare all pairs", hint: "Which sides match, and which are different?" },
      { level: 3, description: "Count the equal sides", hint: "Exactly two sides match (5 and 5) — what category is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "S",
    skillId: "GEOCIRC-02",
    question: "A circle has a radius of 12 cm. What is its diameter?",
    options: [
        { text: "24 cm", correct: true, feedback: "Diameter = 2 × radius = 24 cm." },
        { text: "12 cm", correct: false, feedback: "That's the radius.", misconceptionId: "E-d3-a" },
        { text: "6 cm", correct: false, feedback: "That's half the radius.", misconceptionId: "E-d3-b" },
        { text: "36 cm", correct: false, feedback: "You multiplied by 3.", misconceptionId: "E-d3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d3-a",
        description: "Student reports the radius value directly as the diameter, without doubling it.",
        rootCause: "Doubling Step Omitted — forgets that diameter = 2 × radius, not radius itself.",
        remediation: "The diameter is TWICE the radius — you must multiply the radius by 2, not just restate the radius value."
      },
      {
        misconceptionId: "E-d3-b",
        description: "Student halves the radius instead of doubling it, applying the inverse operation.",
        rootCause: "Operation Direction Confusion — divides instead of multiplying to relate radius and diameter.",
        remediation: "Diameter is LARGER than radius (it spans all the way across) — multiply the radius by 2, don't divide it: 12 × 2 = 24, not 12 ÷ 2."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student multiplies the radius by 3 instead of 2.",
        rootCause: "Wrong Multiplier Applied — uses an incorrect factor when doubling the radius.",
        remediation: "Diameter = 2 × radius exactly — multiply by 2, not 3: 12 × 2 = 24 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Diameter = 2 × radius." },
      { level: 2, description: "Substitute the value", hint: "2 × 12 = ?" },
      { level: 3, description: "Check", hint: "Is your answer bigger than the radius, since diameter spans the whole circle?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "S",
    skillId: "GEOSYM-04",
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular pentagon has 5 sides, so 5 lines of symmetry." },
        { text: "4", correct: false, feedback: "That's for a square.", misconceptionId: "E-d4-a" },
        { text: "6", correct: false, feedback: "That's for a regular hexagon.", misconceptionId: "E-d4-b" },
        { text: "3", correct: false, feedback: "That's for an equilateral triangle.", misconceptionId: "E-d4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student confuses the pentagon's symmetry count with the square's count (4 sides = 4 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 4 like a square) — its symmetry count matches ITS side count: 5, not 4."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student confuses the pentagon's symmetry count with the hexagon's count (6 sides = 6 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 6 like a hexagon) — its symmetry count matches ITS side count: 5, not 6."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student confuses the pentagon's symmetry count with the equilateral triangle's count (3 sides = 3 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 3 like a triangle) — its symmetry count matches ITS side count: 5, not 3."
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
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    tier: "T",
    skillId: "GEOSHAPE-05",
    question: "Which net can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This classic T‑shaped net of 6 squares folds into a cube." },
        { text: "6 squares in a straight line", correct: false, feedback: "Cannot close into a cube without overlapping.", misconceptionId: "E-d5-a" },
        { text: "5 squares in a T shape", correct: false, feedback: "Only 5 faces; a cube needs 6.", misconceptionId: "E-d5-b" },
        { text: "4 squares in a large square", correct: false, feedback: "Only 4 faces.", misconceptionId: "E-d5-c" }
      ],
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
    tier: "T",
    skillId: "GEOCOORD-02",
    question: "A point is at (3,0). On which axis does it lie?",
    options: [
        { text: "x‑axis", correct: true, feedback: "y=0 means the point lies on the x‑axis." },
        { text: "y‑axis", correct: false, feedback: "x=0 would be on the y‑axis.", misconceptionId: "E-d6-a" },
        { text: "At the origin", correct: false, feedback: "Origin is (0,0).", misconceptionId: "E-d6-b" },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not inside any quadrant.", misconceptionId: "E-d6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student confuses which coordinate being zero indicates the x-axis versus the y-axis.",
        rootCause: "Axis Rule Confusion — swaps the condition for lying on the x-axis with the condition for the y-axis.",
        remediation: "A point lies ON the x-axis when its y-coordinate is 0 (like (3,0)) — a point lies on the y-axis when its x-coordinate is 0 (like (0,3))."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student confuses any point with a zero coordinate for the origin specifically, not recognising the origin requires BOTH coordinates to be zero.",
        rootCause: "Origin Definition Confusion — doesn't recognise the origin requires both x=0 AND y=0.",
        remediation: "The origin is specifically (0, 0) — BOTH coordinates must be zero. (3,0) has x=3 (not zero), so it's on the x-axis but not at the origin."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student assumes any point with a positive coordinate must be inside a quadrant, not recognising points exactly on an axis are boundary points.",
        rootCause: "Quadrant Boundary Confusion — doesn't recognise that points with a zero coordinate lie ON an axis, not inside any quadrant.",
        remediation: "Quadrants are the four REGIONS between the axes — a point with y=0 lies exactly ON the x-axis (the boundary), not inside any quadrant."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the coordinates", hint: "(3, 0) — x=3, y=0." },
      { level: 2, description: "Apply the axis rule", hint: "y=0 means the point has no vertical distance from the x-axis." },
      { level: 3, description: "Locate the point", hint: "A point with y=0 lies exactly on which axis?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "C",
    skillId: "GEOLINES-05",
    question: "Two complementary angles differ by 10°. Find the larger angle.",
    options: [
        { text: "50°", correct: true, feedback: "x + (x+10) = 90 → 2x = 80 → x=40; larger = 50°." },
        { text: "40°", correct: false, feedback: "That's the smaller angle.", misconceptionId: "E-d7-a" },
        { text: "45°", correct: false, feedback: "That would be equal.", misconceptionId: "E-d7-b" },
        { text: "60°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student correctly solves for x=40 but reports the smaller angle instead of the larger angle (x+10) requested.",
        rootCause: "Wrong Value Reported — confuses the smaller angle with the larger angle that the question asks for.",
        remediation: "The question asks for the LARGER angle — after solving x=40, the larger angle is x+10=50°, not x=40° (that's the smaller one)."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student assumes the two angles are equal (each 45°), ignoring the stated 10° difference.",
        rootCause: "Difference Condition Ignored — applies a simple equal-split instead of the stated difference.",
        remediation: "The question says the two angles DIFFER by 10°, not equal — set up x + (x+10) = 90 (not x + x = 90) to respect the stated difference."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student makes a computational error while solving, landing on 60° instead of the correct 50°.",
        rootCause: "Equation-Solving Error — a miscalculation isolating x.",
        remediation: "Recheck each step: x+(x+10)=90 → 2x+10=90 → 2x=80 → x=40, so the larger angle is x+10=50° — verify by checking 40+50=90."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Set up variables", hint: "Let the smaller angle = x, and the larger = x+10." },
      { level: 2, description: "Apply the sum rule", hint: "x + (x+10) = 90." },
      { level: 3, description: "Solve and identify the larger angle", hint: "2x=80, so x=40. The LARGER angle is x+10." }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Setting up and solving a difference-based angle equation is a direct precursor to algebraic word-problem skills." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "C",
    skillId: "GEOTRI-06",
    question: "The angles of a triangle are in the ratio 2:3:4. Find the largest angle.",
    options: [
        { text: "80°", correct: true, feedback: "Total parts = 9. One part = 180÷9 = 20°. Largest = 4×20 = 80°." },
        { text: "60°", correct: false, feedback: "That's 3 parts.", misconceptionId: "E-d8-a" },
        { text: "40°", correct: false, feedback: "That's 2 parts.", misconceptionId: "E-d8-b" },
        { text: "100°", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-d8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student computes the value for 3 parts (the middle ratio value) instead of 4 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the wrong number of parts.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 4 (not 3) — multiply one part (20°) by 4: 4×20=80."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student computes the value for 2 parts (the smallest ratio value) instead of 4 parts (the largest).",
        rootCause: "Wrong Ratio Part Selected — multiplies by the smallest ratio number instead of the largest.",
        remediation: "The question asks for the LARGEST angle, which corresponds to the ratio value 4 (the biggest number in 2:3:4), not 2 (the smallest)."
      },
      {
        misconceptionId: "E-d8-c",
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
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "T",
    skillId: "GEOCIRC-03",
    question: "A circle has radius 5 cm. A point is 4.5 cm from the centre. Is the point inside or outside the circle?",
    options: [
        { text: "Inside", correct: true, feedback: "4.5 cm < 5 cm → the point is inside the circle." },
        { text: "Outside", correct: false, feedback: "The distance is less than the radius, so it's inside.", misconceptionId: "E-d9-a" },
        { text: "On the circle", correct: false, feedback: "On the circle would be exactly 5 cm.", misconceptionId: "E-d9-b" },
        { text: "Cannot say", correct: false, feedback: "We can compare the distance to the radius.", misconceptionId: "E-d9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student reverses the inside/outside comparison, thinking a distance less than the radius means the point is outside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to the radius.",
        remediation: "A point is INSIDE the circle when its distance from the centre is LESS than the radius — since 4.5 < 5 (the radius), the point is closer, meaning INSIDE, not outside."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student assumes a distance 'close to' the radius must be exactly on the circle, without verifying exact equality.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance as exactly equal without precise comparison.",
        remediation: "'On the circle' requires the distance to be EXACTLY equal to the radius (5 cm) — since 4.5 cm ≠ 5 cm, the point is not on the circle; since 4.5 < 5, it's inside."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student believes the inside/outside status cannot be determined without more information, despite having both the radius and the distance.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing distance to radius is sufficient to determine position.",
        remediation: "Comparing the point's distance from the centre (4.5 cm) to the radius (5 cm) IS sufficient — since 4.5 < 5, we can definitively say the point is inside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the radius", hint: "The circle's radius is 5 cm." },
      { level: 2, description: "Compare the distance to the radius", hint: "Is 4.5 cm greater than, less than, or equal to 5 cm?" },
      { level: 3, description: "Determine the position", hint: "Distance less than radius means the point is..." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "C",
    skillId: "GEOSYM-09",
    question: "A rectangle 8 cm by 6 cm is folded in half along its vertical line of symmetry. Find the perimeter of the folded shape.",
    options: [
        { text: "22 cm", correct: true, feedback: "Folded dimensions: 8 cm by 3 cm. Perimeter = 2(8+3) = 22 cm." },
        { text: "20 cm", correct: false, feedback: "That's if folded horizontally (4 cm by 6 cm).", misconceptionId: "E-d10-a" },
        { text: "24 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d10-b" },
        { text: "28 cm", correct: false, feedback: "That's the original perimeter.", misconceptionId: "E-d10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student halves the wrong dimension (the length, 8 cm, instead of the width, 6 cm), producing folded dimensions of 4 by 6 instead of 8 by 3.",
        rootCause: "Wrong Dimension Halved — folds along the wrong axis, halving length instead of width.",
        remediation: "The VERTICAL line of symmetry halves the WIDTH (the shorter 6 cm dimension), not the length (the 8 cm dimension) — folded dimensions become 8×3, not 4×6."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student makes a computational error in finding the folded dimensions or the perimeter, landing on 24 instead of 22.",
        rootCause: "Folded Perimeter Computation Error — a miscalculation in the folded dimensions or the perimeter formula.",
        remediation: "Recompute: folded dimensions are 8×3, so perimeter = 2×(8+3)=2×11=22 — recheck each step."
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
    tier: "H",
    skillId: "GEOSHAPE-06",
    question: "A cuboid measures 5 cm × 4 cm × 3 cm. What is the total length of all its edges?",
    options: [
        { text: "48 cm", correct: true, feedback: "4 × (5+4+3) = 4 × 12 = 48 cm." },
        { text: "60 cm", correct: false, feedback: "That's the volume (5×4×3).", misconceptionId: "E-d11-a" },
        { text: "12 cm", correct: false, feedback: "That's just the sum of dimensions.", misconceptionId: "E-d11-b" },
        { text: "24 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student computes the volume (5×4×3=60) instead of the total edge length, confusing the two different formulas.",
        rootCause: "Volume/Edge-Length Formula Confusion — applies the multiplication-based volume formula instead of the addition-then-multiply edge-length formula.",
        remediation: "Volume uses l×b×h (multiplication of all three); total edge length uses 4×(l+b+h) (sum the dimensions, then multiply by 4) — these are different formulas for different measurements."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student sums the three dimensions but forgets to multiply by 4 to account for 4 edges of each dimension.",
        rootCause: "Multiplication by 4 Omitted — stops after adding the dimensions once, forgetting each dimension appears 4 times among the 12 edges.",
        remediation: "A cuboid has 4 edges of EACH dimension (4 lengths, 4 widths, 4 heights) — after summing the three DIFFERENT dimensions (5+4+3=12), multiply by 4: 4×12=48."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student multiplies the dimension sum by 2 instead of 4, undercounting by half.",
        rootCause: "Wrong Multiplier Applied — uses a factor of 2 instead of the correct factor of 4.",
        remediation: "A cuboid has 4 edges of each dimension (not 2) — multiply the sum of dimensions by 4: 4×12=48, not 2×12=24."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Sum the three different dimensions", hint: "5 + 4 + 3 = ?" },
      { level: 2, description: "Recall how many edges of each dimension", hint: "A cuboid has 4 edges of each length, width, and height." },
      { level: 3, description: "Multiply", hint: "4 × 12 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    tier: "H",
    skillId: "GEOCOORD-08",
    question: "Reflect the point (2,3) over the vertical line x=5. What are the new coordinates?",
    options: [
        { text: "(8,3)", correct: true, feedback: "x′ = 2×5 − 2 = 8; y unchanged → (8,3)." },
        { text: "(2,3)", correct: false, feedback: "Unchanged.", misconceptionId: "E-d12-a" },
        { text: "(2,7)", correct: false, feedback: "You reflected over y=5.", misconceptionId: "E-d12-b" },
        { text: "(−2,3)", correct: false, feedback: "That's reflection over x=0.", misconceptionId: "E-d12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student reports the original point unchanged, not applying the reflection at all.",
        rootCause: "Reflection Not Applied — treats the original point as if it were its own reflection.",
        remediation: "The point (2,3) is not on the mirror line x=5, so it MUST move when reflected — apply the formula x'=2(5)-2=8 to find the new x-coordinate."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student reflects the y-coordinate instead of the x-coordinate, confusing a reflection over a vertical line (x=5) with one over a horizontal line (y=5).",
        rootCause: "Reflection Axis Confusion — mixes up reflecting over a vertical line with reflecting over a horizontal line.",
        remediation: "The mirror line x=5 is VERTICAL, so it changes the X-coordinate only (using x'=2k-x); the y-coordinate stays unchanged — reflecting over y=5 (a horizontal line) would change y instead."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student applies the reflection formula as if the mirror line were x=0 (the y-axis) instead of x=5.",
        rootCause: "Wrong Mirror Line Used — uses 0 instead of the actual given mirror line value (5).",
        remediation: "The mirror line is x=5, not x=0 — use x'=2(5)-2=8, not x'=2(0)-2=-2 (which would be for reflecting over the y-axis instead)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the mirror line", hint: "The line x=5 is vertical." },
      { level: 2, description: "Apply the reflection formula", hint: "x' = 2×5 - 2." },
      { level: 3, description: "Keep y unchanged", hint: "Reflecting over a vertical line doesn't change y." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "T",
    skillId: "GEOLINES-04",
    question: "Two angles are supplementary. One angle is 70°. Find the other angle.",
    options: [
        { text: "110°", correct: true, feedback: "Supplementary angles sum to 180°. 180 − 70 = 110°." },
        { text: "20°", correct: false, feedback: "That's complementary (90−70).", misconceptionId: "E-d13-a" },
        { text: "70°", correct: false, feedback: "That's the given angle.", misconceptionId: "E-d13-b" },
        { text: "290°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d13-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student subtracts 70° from 90° instead of 180°, applying the complementary-angle rule to a supplementary-angle situation.",
        rootCause: "Complementary/Supplementary Confusion — mixes up the 90° sum rule with the 180° sum rule.",
        remediation: "SUPPLEMENTARY angles sum to 180° (not 90°, which is complementary) — subtract 70 from 180, not 90: 180-70=110."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student reports the given angle unchanged, not computing the OTHER angle at all.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested unknown angle.",
        remediation: "The question asks for the OTHER angle, not the given one — subtract the given 70° from 180° to find the different, unknown angle."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student adds instead of subtracting, or makes another significant computational error, landing on a value far too large.",
        rootCause: "Operation Sign Misread — adds instead of subtracting to find the supplementary angle.",
        remediation: "To find the OTHER supplementary angle, SUBTRACT the given angle from 180°: 180-70=110, not add or otherwise miscompute to reach 290."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "Supplementary angles sum to 180°." },
      { level: 2, description: "Set up the subtraction", hint: "180° - 70° = ?" },
      { level: 3, description: "Check", hint: "Do 70° and your answer add up to 180°?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "T",
    skillId: "GEOTRI-11",
    question: "An isosceles triangle has perimeter 28 cm. Each of the equal sides is 10 cm. Find the length of the unequal side.",
    options: [
        { text: "8 cm", correct: true, feedback: "28 − 2×10 = 28 − 20 = 8 cm." },
        { text: "10 cm", correct: false, feedback: "That's one of the equal sides.", misconceptionId: "E-d14-a" },
        { text: "18 cm", correct: false, feedback: "28 − 10 = 18 (forgot the other equal side).", misconceptionId: "E-d14-b" },
        { text: "14 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d14-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student reports one of the given equal sides (10 cm) instead of computing the unequal side.",
        rootCause: "Wrong Value Reported — confuses the given equal side with the requested unequal side.",
        remediation: "The question asks for the UNEQUAL side, not the equal sides already given (10 cm each) — subtract both equal sides from the perimeter: 28-10-10=8."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student subtracts only ONE equal side (10) from the perimeter instead of BOTH equal sides (2×10=20).",
        rootCause: "Second Equal Side Omitted — accounts for only one of the two equal sides in the subtraction.",
        remediation: "An isosceles triangle has TWO equal sides, not one — subtract BOTH (2×10=20) from the perimeter: 28-20=8, not just 28-10=18."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student makes a computational error in the subtraction, landing on 14 instead of the correct 8.",
        rootCause: "Arithmetic Computation Error — a miscalculation in 28-20.",
        remediation: "Recompute: 28 - 20 = 8 — verify by checking 10+10+8=28, the full perimeter."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the total length of the two equal sides", hint: "2 × 10 = 20." },
      { level: 2, description: "Subtract from the perimeter", hint: "28 - 20 = ?" },
      { level: 3, description: "Check", hint: "Does 10+10+8 equal the perimeter, 28?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    tier: "H",
    skillId: "GEOCIRC-06",
    question: "A circle has its centre at (5,12) and passes through the origin (0,0). What is its radius?",
    options: [
        { text: "13", correct: true, feedback: "Distance = √(5²+12²) = √(25+144) = √169 = 13." },
        { text: "5", correct: false, feedback: "That's just the x‑coordinate.", misconceptionId: "E-d15-a" },
        { text: "12", correct: false, feedback: "That's just the y‑coordinate.", misconceptionId: "E-d15-b" },
        { text: "17", correct: false, feedback: "You added 5+12.", misconceptionId: "E-d15-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student reports only the x-coordinate of the centre (5) instead of computing the actual straight-line distance to the origin.",
        rootCause: "Distance Formula Not Applied — uses a single coordinate value instead of the full distance calculation.",
        remediation: "The radius is the STRAIGHT-LINE distance from the centre to a point on the circle — you must apply the distance formula (using both coordinates), not just report one coordinate."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student reports only the y-coordinate of the centre (12) instead of computing the actual straight-line distance to the origin.",
        rootCause: "Distance Formula Not Applied — uses a single coordinate value instead of the full distance calculation.",
        remediation: "The radius is the STRAIGHT-LINE distance from the centre to a point on the circle — you must apply the distance formula (using both coordinates), not just report one coordinate."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student adds the two coordinates (5+12=17) instead of using the Pythagorean distance formula.",
        rootCause: "Distance Formula Misapplied — treats the distance as a simple sum instead of the square-root-of-sum-of-squares.",
        remediation: "Straight-line distance uses the Pythagorean theorem: √(5²+12²)=√(25+144)=√169=13 — you must SQUARE each difference, ADD them, then take the SQUARE ROOT, not just add the raw values."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the coordinate differences", hint: "From (0,0) to (5,12): the differences are 5 and 12." },
      { level: 2, description: "Apply the distance formula", hint: "√(5² + 12²)." },
      { level: 3, description: "Compute", hint: "√(25+144) = √169 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    tier: "H",
    skillId: "GEOSYM-10",
    question: "Reflect the point (4,1) over the line y = x. What are the new coordinates?",
    options: [
        { text: "(1,4)", correct: true, feedback: "Reflection over y=x swaps the x and y coordinates." },
        { text: "(4,1)", correct: false, feedback: "Unchanged.", misconceptionId: "E-d16-a" },
        { text: "(4,−1)", correct: false, feedback: "That's reflection over the x‑axis.", misconceptionId: "E-d16-b" },
        { text: "(−4,1)", correct: false, feedback: "Reflection over the y‑axis.", misconceptionId: "E-d16-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student reports the original point unchanged, not applying the reflection at all.",
        rootCause: "Reflection Not Applied — treats the original point as if it were its own reflection.",
        remediation: "Reflecting over y=x swaps the x and y coordinates — (4,1) becomes (1,4), a genuinely different point (unless x=y originally, which isn't the case here)."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student negates the y-coordinate (reflecting over the x-axis) instead of swapping the coordinates (reflecting over y=x).",
        rootCause: "Reflection Line Confusion — mixes up reflecting over the x-axis with reflecting over the diagonal line y=x.",
        remediation: "Reflecting over y=x means SWAPPING x and y (4,1)→(1,4); reflecting over the x-axis means NEGATING y (4,1)→(4,-1) — these are different reflections."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student negates the x-coordinate (reflecting over the y-axis) instead of swapping the coordinates (reflecting over y=x).",
        rootCause: "Reflection Line Confusion — mixes up reflecting over the y-axis with reflecting over the diagonal line y=x.",
        remediation: "Reflecting over y=x means SWAPPING x and y (4,1)→(1,4); reflecting over the y-axis means NEGATING x (4,1)→(-4,1) — these are different reflections."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the y=x reflection rule", hint: "Reflecting over y=x swaps the x and y coordinates." },
      { level: 2, description: "Apply to the specific point", hint: "(4,1) has x=4, y=1." },
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
    tier: "C",
    skillId: "GEOSHAPE-07",
    question: "A cube has volume 216 cm³. What is the length of one edge?",
    options: [
        { text: "6 cm", correct: true, feedback: "∛216 = 6, because 6 × 6 × 6 = 216." },
        { text: "36 cm", correct: false, feedback: "You divided 216 by 6.", misconceptionId: "E-d17-a" },
        { text: "12 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-b" },
        { text: "72 cm", correct: false, feedback: "Incorrect.", misconceptionId: "E-d17-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student divides 216 by 6 to get 36, confusing the cube root operation with simple division.",
        rootCause: "Cube Root Confused with Division — divides by 6 instead of finding the number that, when cubed, equals 216.",
        remediation: "Cube root is NOT division by 6 — it's finding a number x such that x×x×x=216. Testing x=6: 6×6×6=216 ✓ — so the edge is 6 cm, not 36 (216÷6=36 is a coincidentally similar-looking but incorrect operation)."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student computes an incorrect value, perhaps confusing cube root with a different operation, landing on 12 instead of 6.",
        rootCause: "Wrong Root Operation Applied — misapplies a different calculation instead of the correct cube root.",
        remediation: "Test x=12: 12×12×12=1728, far more than 216 — this confirms 12 is wrong; the correct edge is 6, since 6×6×6=216 exactly."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student computes a much larger incorrect value, perhaps by multiplying instead of finding the cube root.",
        rootCause: "Wrong Operation Applied — applies multiplication or a different incorrect operation instead of the cube root.",
        remediation: "Test x=72: 72×72×72 is vastly larger than 216 — this confirms 72 is wrong; the correct edge is 6, verified by 6×6×6=216."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the volume formula", hint: "Volume of cube = side × side × side = side³." },
      { level: 2, description: "Find the cube root", hint: "What number, multiplied by itself three times, equals 216?" },
      { level: 3, description: "Verify", hint: "Test your answer: does it cubed equal 216?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    tier: "C",
    skillId: "GEOCOORD-07",
    question: "Start at (1,1). Move 2 units right and 3 units up, then 1 unit left and 2 units down. What are the final coordinates?",
    options: [
        { text: "(2,2)", correct: true, feedback: "1+2−1 = 2 for x; 1+3−2 = 2 for y → (2,2)." },
        { text: "(3,5)", correct: false, feedback: "You only did the first move.", misconceptionId: "E-d18-a" },
        { text: "(0,2)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-b" },
        { text: "(4,4)", correct: false, feedback: "Incorrect.", misconceptionId: "E-d18-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student applies only the first movement (2 right, 3 up) and stops, forgetting the second movement (1 left, 2 down).",
        rootCause: "Multi-Step Movement Abandoned — doesn't continue through both described movements.",
        remediation: "The point moves TWICE — after the first movement (to (3,5)), apply the SECOND movement (1 left, 2 down) to reach the final position: (3-1, 5-2)=(2,2)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student makes an error combining the movements, perhaps miscalculating the x-coordinate, landing on 0 instead of 2.",
        rootCause: "Coordinate Combination Error — a miscalculation combining the multiple movements for one coordinate.",
        remediation: "Track x carefully: 1 (start) +2 (right) -1 (left) = 2 — recompute this combination step by step."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student adds all the movement amounts together instead of applying them in sequence with correct signs (some additions, some subtractions).",
        rootCause: "Direction Signs Ignored — treats all movements as additions, ignoring that 'left' and 'down' should subtract.",
        remediation: "Track each direction with the correct sign: right/up ADD, left/down SUBTRACT — x: 1+2-1=2 (not 1+2+1=4); y: 1+3-2=2 (not 1+3+2=6)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Apply the first movement", hint: "x: 1+2=3. y: 1+3=4." },
      { level: 2, description: "Apply the second movement", hint: "x: 3-1=2. y: 4-2=2." },
      { level: 3, description: "State the final point", hint: "(final x, final y) = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.2"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    tier: "H",
    skillId: "GEOTRI-09",
    question: "The angles of a triangle are x°, 2x°, and 3x°. Find the largest angle.",
    options: [
        { text: "90°", correct: true, feedback: "x+2x+3x = 6x = 180 → x=30. Largest = 3x = 90°." },
        { text: "60°", correct: false, feedback: "That's 2x.", misconceptionId: "E-d19-a" },
        { text: "30°", correct: false, feedback: "That's x.", misconceptionId: "E-d19-b" },
        { text: "120°", correct: false, feedback: "Incorrect sum.", misconceptionId: "E-d19-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student correctly solves for x=30 but reports the middle angle (2x=60) instead of the largest angle (3x=90) requested.",
        rootCause: "Wrong Value Reported — confuses the middle angle with the largest angle that the question asks for.",
        remediation: "The question asks for the LARGEST angle — after solving x=30, compare all three angles (30, 60, 90) and identify the largest, which is 3x=90°, not 2x=60° (the middle one)."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student correctly solves for x=30 but reports the smallest angle itself instead of the largest angle requested.",
        rootCause: "Wrong Value Reported — confuses the smallest angle with the largest angle that the question asks for.",
        remediation: "The question asks for the LARGEST angle — x=30 is the SMALLEST angle; the largest is 3x=3×30=90°."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student makes an algebraic error solving 6x=180, or miscombines the like terms, landing on 120° instead of 90°.",
        rootCause: "Equation-Solving Error — a miscalculation combining terms or solving for x.",
        remediation: "Combine like terms first: x+2x+3x=6x. Set 6x=180, so x=30. The largest angle is 3x=90 — recheck each step."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Combine the three expressions", hint: "x + 2x + 3x = 6x." },
      { level: 2, description: "Set equal to 180 and solve", hint: "6x = 180, so x = ?" },
      { level: 3, description: "Find the largest angle", hint: "Compare x, 2x, and 3x — which is largest?" }
    ],
    forwardRiskLinks: [
      { targetSkillId: "ALGEBRA-EQ-01", probability: 0.4, condition: "Combining like terms across three algebraic angle expressions is a direct precursor to multi-term algebraic simplification." }
    ],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    tier: "H",
    skillId: "GEOTRI-14",
    question: "An isosceles right triangle has one angle of 90°. Find the measure of each of the other two equal angles.",
    options: [
        { text: "45°", correct: true, feedback: "180 − 90 = 90°. Divide by 2 → 45° each." },
        { text: "60°", correct: false, feedback: "That would be equilateral, not right.", misconceptionId: "E-d20-a" },
        { text: "30°", correct: false, feedback: "Incorrect.", misconceptionId: "E-d20-b" },
        { text: "90°", correct: false, feedback: "A triangle cannot have two 90° angles.", misconceptionId: "E-d20-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student confuses this right isosceles triangle with an equilateral triangle, applying the 60° angle value instead.",
        rootCause: "Triangle Type Confusion — mixes up the right isosceles triangle's angles with the equilateral triangle's angles.",
        remediation: "An EQUILATERAL triangle has three 60° angles, but this is a RIGHT ISOSCELES triangle (one 90° angle plus two equal angles) — the two equal angles here are 45° each, not 60°."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student makes a computational error, landing on 30° instead of the correct 45°.",
        rootCause: "Arithmetic Computation Error — a miscalculation in the subtraction or division.",
        remediation: "Recompute: 180-90=90, then 90÷2=45 — recheck each step, since 30 would come from a different (incorrect) calculation."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student proposes both remaining angles are also 90°, which would make the triangle invalid (angles summing to more than 180°).",
        rootCause: "Triangle Validity Violated — proposes a triangle with two 90° angles, which is geometrically impossible.",
        remediation: "A triangle can have AT MOST one 90° angle — if there were two, the third angle would have to be 0°, which isn't valid; the two remaining angles must be smaller, specifically 45° each."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Account for the right angle", hint: "One angle is 90°." },
      { level: 2, description: "Find the remaining sum", hint: "180° - 90° = ?" },
      { level: 3, description: "Split equally (isosceles)", hint: "90° ÷ 2 = ? (the two remaining angles must be equal)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-01",
    question: "What type of angle is 100°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "Between 90° and 180° → obtuse." },
        { text: "Acute", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-a" },
        { text: "Right", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-b" },
        { text: "Straight", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student underestimates the angle's category, calling a 100° angle acute.",
        rootCause: "Threshold Comparison Skipped — doesn't compare the angle to the 90° acute/obtuse boundary.",
        remediation: "Always compare to 90° first: 100° is GREATER than 90° (and less than 180°), placing it in the obtuse category, not acute."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student confuses 100° with the specific 90° right-angle value.",
        rootCause: "Angle Category Confusion — doesn't distinguish 'exactly 90°' from other angle measures.",
        remediation: "A right angle is EXACTLY 90° — 100° is 10° more than that, placing it in the obtuse range (90°-180°), not right."
      },
      {
        misconceptionId: "E-r1-c",
        description: "Student confuses 100° with the 180° straight-angle value.",
        rootCause: "Angle Category Confusion — conflates an obtuse angle with the larger straight angle.",
        remediation: "A straight angle is EXACTLY 180° — 100° is far smaller than that, falling in the obtuse range (between 90° and 180°), not straight."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle categories", hint: "Acute < 90° < obtuse < 180° (straight)." },
      { level: 2, description: "Compare the given angle to the boundaries", hint: "Is 100° between 90° and 180°?" },
      { level: 3, description: "Classify", hint: "100° falls between 90° and 180°, so it's obtuse." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle has sides 6 cm, 6 cm, 6 cm. What type is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All sides equal." },
        { text: "Isosceles", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-a" },
        { text: "Scalene", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-b" },
        { text: "Right", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student doesn't verify all three sides match, treating the triangle as if only two of the three sides were equal.",
        rootCause: "Equal-Side Count Undercounted — doesn't check all THREE sides match.",
        remediation: "Check all three sides: 6, 6, and 6 — ALL THREE match, not just two, which means the triangle is equilateral, not isosceles."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student assumes 'scalene' without checking that all three side values are actually identical.",
        rootCause: "Equal-Side Recognition Failure — fails to notice the three given side values are identical.",
        remediation: "Compare the three side values directly: 6=6=6 — they are ALL equal, which is the opposite of scalene (no sides equal)."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student assumes side lengths alone can determine an angle-based classification (right-angled), which requires angle information not given.",
        rootCause: "Side/Angle Classification Confusion — attempts to apply an angle-based category using only side-length data.",
        remediation: "'Right-angled' is an ANGLE classification requiring knowledge of a 90° angle — with only side lengths given, you can only classify by SIDES (equilateral, isosceles, or scalene)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the three sides", hint: "6 cm, 6 cm, 6 cm." },
      { level: 2, description: "Compare all three", hint: "Are all three side lengths identical?" },
      { level: 3, description: "Classify", hint: "All three sides equal matches which category?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r3",
    order: 3,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-01",
    question: "Diameter = 18 cm. Radius = ?",
    options: [
        { text: "9 cm", correct: true, feedback: "Radius is half the diameter." },
        { text: "18 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "36 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "6 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports the diameter value directly as the radius, without halving it.",
        rootCause: "Halving Step Omitted — forgets that radius = diameter ÷ 2, not diameter itself.",
        remediation: "The radius is HALF the diameter — you must divide the diameter by 2, not just restate the diameter value."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student multiplies the diameter by 2 instead of dividing, applying the inverse operation.",
        rootCause: "Operation Direction Confusion — multiplies instead of dividing when finding the radius from the diameter.",
        remediation: "Radius is SMALLER than diameter (it's half) — divide the diameter by 2, don't multiply it: 18 ÷ 2 = 9, not 18 × 2."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student divides the diameter by 3 instead of 2, overshooting the reduction.",
        rootCause: "Wrong Divisor Applied — uses an incorrect divisor when halving the diameter.",
        remediation: "Radius = diameter ÷ 2 exactly — divide by 2, not 3: 18 ÷ 2 = 9 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Radius = diameter ÷ 2." },
      { level: 2, description: "Substitute the value", hint: "18 ÷ 2 = ?" },
      { level: 3, description: "Check", hint: "Is your answer smaller than the diameter, since radius is only half?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-02",
    question: "How many lines of symmetry does an equilateral triangle have?",
    options: [
        { text: "3", correct: true, feedback: "One from each vertex to the midpoint of the opposite side." },
        { text: "1", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-a" },
        { text: "2", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "4", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student finds only one line of symmetry and stops searching, missing the other two lines from the remaining vertices.",
        rootCause: "Incomplete Symmetry Search — stops after finding the first valid fold line instead of testing from each vertex.",
        remediation: "An equilateral triangle has THREE vertices — test a fold line from EACH vertex to the midpoint of the opposite side; all three work."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student confuses the equilateral triangle's symmetry count (3) with the isosceles triangle's count (1), or otherwise undercounts by one.",
        rootCause: "Shape Confusion — applies a different triangle type's symmetry count.",
        remediation: "An equilateral triangle (all sides/angles equal) has 3 lines of symmetry — one from each vertex — more than an isosceles triangle's single line."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student confuses the triangle's symmetry count with a square's count (4 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the triangle.",
        remediation: "An equilateral triangle has 3 sides (not 4 like a square) — its symmetry count matches its side count: 3, not 4."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the vertices", hint: "An equilateral triangle has 3 vertices." },
      { level: 2, description: "Test a fold from each vertex", hint: "Each fold line goes from one vertex to the midpoint of the opposite side." },
      { level: 3, description: "Count the valid folds", hint: "How many of the three folds create matching halves?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "r5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-01",
    question: "How many vertices does a cube have?",
    options: [
        { text: "8", correct: true, feedback: "A cube has 8 corners." },
        { text: "6", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-a" },
        { text: "12", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-b" },
        { text: "4", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r5-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r5-a",
        description: "Student confuses the number of vertices with the number of faces.",
        rootCause: "3D Attribute Confusion — mixes up vertices (corner points) with faces (flat surfaces).",
        remediation: "Vertices are the CORNER POINTS (8 for a cube); faces are the FLAT SURFACES (6 for a cube) — these are different attributes."
      },
      {
        misconceptionId: "E-r5-b",
        description: "Student confuses the number of vertices with the number of edges.",
        rootCause: "3D Attribute Confusion — mixes up vertices (corner points) with edges (line segments).",
        remediation: "Vertices are the CORNER POINTS (8 for a cube); edges are the LINE SEGMENTS where faces meet (12 for a cube) — these are different attributes."
      },
      {
        misconceptionId: "E-r5-c",
        description: "Student severely undercounts, perhaps only picturing the 4 corners visible from one face.",
        rootCause: "Hidden Vertex Not Counted — forgets corners that aren't immediately visible from one viewing angle.",
        remediation: "A cube has corners on BOTH the top face (4 corners) AND the bottom face (4 more corners) — that's 4+4=8 total, not just the 4 visible from one angle."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the top face's corners", hint: "The top square face has 4 corners." },
      { level: 2, description: "Count the bottom face's corners", hint: "The bottom square face also has 4 corners." },
      { level: 3, description: "Total", hint: "4 + 4 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-02",
    question: "A point is at (5,0). On which axis does it lie?",
    options: [
        { text: "x‑axis", correct: true, feedback: "y=0 → on x‑axis." },
        { text: "y‑axis", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "At the origin", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "In the first quadrant", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student confuses which coordinate being zero indicates the x-axis versus the y-axis.",
        rootCause: "Axis Rule Confusion — swaps the condition for lying on the x-axis with the condition for the y-axis.",
        remediation: "A point lies ON the x-axis when its y-coordinate is 0 (like (5,0)) — a point lies on the y-axis when its x-coordinate is 0 (like (0,5))."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student confuses any point with a zero coordinate for the origin specifically, not recognising the origin requires BOTH coordinates to be zero.",
        rootCause: "Origin Definition Confusion — doesn't recognise the origin requires both x=0 AND y=0.",
        remediation: "The origin is specifically (0, 0) — BOTH coordinates must be zero. (5,0) has x=5 (not zero), so it's on the x-axis but not at the origin."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student assumes any point with a positive coordinate must be inside a quadrant, not recognising points exactly on an axis are boundary points.",
        rootCause: "Quadrant Boundary Confusion — doesn't recognise that points with a zero coordinate lie ON an axis, not inside any quadrant.",
        remediation: "Quadrants are the four REGIONS between the axes — a point with y=0 lies exactly ON the x-axis (the boundary), not inside any quadrant."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check the coordinates", hint: "(5, 0) — x=5, y=0." },
      { level: 2, description: "Apply the axis rule", hint: "y=0 means the point has no vertical distance from the x-axis." },
      { level: 3, description: "Locate the point", hint: "A point with y=0 lies exactly on which axis?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-04",
    question: "Two supplementary angles: one is 85°. Find the other.",
    options: [
        { text: "95°", correct: true, feedback: "180 − 85 = 95°." },
        { text: "5°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "85°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-b" },
        { text: "105°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student subtracts 85° from 90° instead of 180°, applying the complementary-angle rule to a supplementary-angle situation.",
        rootCause: "Complementary/Supplementary Confusion — mixes up the 90° sum rule with the 180° sum rule.",
        remediation: "SUPPLEMENTARY angles sum to 180° (not 90°, which is complementary) — subtract 85 from 180, not 90: 180-85=95."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student reports the given angle unchanged, not computing the OTHER angle at all.",
        rootCause: "Wrong Value Reported — confuses the given angle with the requested unknown angle.",
        remediation: "The question asks for the OTHER angle, not the given one — subtract the given 85° from 180° to find the different, unknown angle."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student makes a computational error in the subtraction, landing on 105° instead of 95°.",
        rootCause: "Subtraction Computation Error — miscalculates 180-85.",
        remediation: "Recompute: 180 - 85 = 95 — verify by adding 85+95 to see if it returns 180."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "Supplementary angles sum to 180°." },
      { level: 2, description: "Set up the subtraction", hint: "180° - 85° = ?" },
      { level: 3, description: "Check", hint: "Do 85° and your answer add up to 180°?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.7"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-04",
    question: "A right triangle has one angle of 90° and another of 30°. Find the third angle.",
    options: [
        { text: "60°", correct: true, feedback: "180 − 90 − 30 = 60°." },
        { text: "90°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "30°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "120°", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student proposes a second 90° angle, which would make the triangle invalid (two right angles impossible in a triangle).",
        rootCause: "Triangle Validity Violated — proposes a triangle with two 90° angles, which is geometrically impossible.",
        remediation: "A triangle can have AT MOST one 90° angle — since one angle is already 90° and another is 30°, the third must be 180-90-30=60°, not another 90°."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student reports the given 30° angle again instead of computing the third, different angle.",
        rootCause: "Wrong Value Reported — confuses a given angle with the requested third angle.",
        remediation: "The question asks for the THIRD angle, different from both given angles (90° and 30°) — subtract both from 180°: 180-90-30=60."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student adds the two given angles instead of subtracting from 180°, or makes another significant error.",
        rootCause: "Final Subtraction Step Omitted — stops after adding the two known angles, without subtracting from 180°.",
        remediation: "90+30=120 is just the sum of the KNOWN angles — you must subtract this from the triangle's TOTAL (180°) to find the third angle: 180-120=60."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the rule", hint: "All angles in a triangle sum to 180°." },
      { level: 2, description: "Add the two known angles", hint: "90 + 30 = ?" },
      { level: 3, description: "Subtract from the total", hint: "180 - 120 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-03",
    question: "Radius = 7 cm. A point is 6 cm from the centre. Inside or outside?",
    options: [
        { text: "Inside", correct: true, feedback: "6 < 7 → inside." },
        { text: "Outside", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "On the circle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "Cannot say", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student reverses the inside/outside comparison, thinking a distance less than the radius means the point is outside.",
        rootCause: "Comparison Direction Reversal — swaps the meaning of 'greater than' and 'less than' relative to the radius.",
        remediation: "A point is INSIDE the circle when its distance from the centre is LESS than the radius — since 6 < 7 (the radius), the point is closer, meaning INSIDE, not outside."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student assumes a distance 'close to' the radius must be exactly on the circle, without verifying exact equality.",
        rootCause: "Approximate Equality Assumption — treats a nearby distance as exactly equal without precise comparison.",
        remediation: "'On the circle' requires the distance to be EXACTLY equal to the radius (7 cm) — since 6 cm ≠ 7 cm, the point is not on the circle; since 6 < 7, it's inside."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student believes the inside/outside status cannot be determined without more information, despite having both the radius and the distance.",
        rootCause: "Comparison Confidence Gap — doesn't recognise that comparing distance to radius is sufficient to determine position.",
        remediation: "Comparing the point's distance from the centre (6 cm) to the radius (7 cm) IS sufficient — since 6 < 7, we can definitively say the point is inside."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the radius", hint: "The circle's radius is 7 cm." },
      { level: 2, description: "Compare the distance to the radius", hint: "Is 6 cm greater than, less than, or equal to 7 cm?" },
      { level: 3, description: "Determine the position", hint: "Distance less than radius means the point is..." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-09",
    question: "A cuboid has total edge length 40 cm. Its length=6 cm, width=3 cm. Find height.",
    options: [
        { text: "1 cm", correct: true, feedback: "4(6+3+h)=40 → 9+h=10 → h=1 cm." },
        { text: "2 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "3 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "4 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student guesses a height value without verifying it produces the stated total edge length of 40 cm.",
        rootCause: "Total Edge Length Not Verified — doesn't check the guessed height against the given 40 cm condition.",
        remediation: "Verify: if h=2, total edge length = 4(6+3+2)=4×11=44, not 40 — this confirms 2 is wrong; solve 4(6+3+h)=40 to find the correct height: h=1."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student guesses a larger height value without verifying it produces the stated total edge length.",
        rootCause: "Total Edge Length Not Verified — doesn't check the guessed height against the given 40 cm condition.",
        remediation: "Verify: if h=3, total edge length = 4(6+3+3)=4×12=48, not 40 — this confirms 3 is wrong; the correct height is 1."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student guesses an even larger height value, producing a total edge length that overshoots 40 cm.",
        rootCause: "Total Edge Length Not Verified — doesn't check the guessed height against the given 40 cm condition.",
        remediation: "Verify: if h=4, total edge length = 4(6+3+4)=4×13=52, far more than 40 — this confirms 4 is wrong; the correct height is 1."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the sum of dimensions from the total edge length", hint: "4(l+b+h)=40, so l+b+h=10." },
      { level: 2, description: "Substitute the known dimensions", hint: "6 + 3 + h = 10." },
      { level: 3, description: "Solve for h", hint: "9 + h = 10, so h = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.MD.C.5"]
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

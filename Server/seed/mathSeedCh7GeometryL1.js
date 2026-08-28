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
    skillId: "GEOLINES-01",
    question: "What type of angle is 45°?",
    options: [
        { text: "Acute", correct: true, feedback: "An angle less than 90° is called an acute angle." },
        { text: "Obtuse", correct: false, feedback: "Obtuse angles are between 90° and 180°.", misconceptionId: "E-w1-a" },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°.", misconceptionId: "E-w1-b" },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°.", misconceptionId: "E-w1-c" }
      ],
    retryHint: "An angle less than 90° is called acute.",
    misconceptions: [
      {
        misconceptionId: "E-w1-a",
        description: "Student assumes any angle that isn't obviously 'small' must be obtuse, without comparing it to the 90° threshold.",
        rootCause: "Threshold Comparison Skipped — doesn't explicitly compare the given angle to 90° before classifying it.",
        remediation: "Always compare the angle's measure to 90°: 45° < 90°, so it's acute — obtuse angles must be strictly greater than 90°."
      },
      {
        misconceptionId: "E-w1-b",
        description: "Student confuses any angle with a round-looking number (45) with the specific 90° right angle.",
        rootCause: "Angle Category Confusion — doesn't distinguish the exact value 90° from other angle measures.",
        remediation: "A right angle is EXACTLY 90°, no more, no less — 45° is half of 90°, and any angle less than 90° is acute, not right."
      },
      {
        misconceptionId: "E-w1-c",
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
    itemId: "w2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle with all three sides equal is called a ______.",
    options: [
        { text: "Equilateral triangle", correct: true, feedback: "All sides and all angles are equal in an equilateral triangle." },
        { text: "Isosceles triangle", correct: false, feedback: "Isosceles triangles have exactly two equal sides.", misconceptionId: "E-w2-a" },
        { text: "Scalene triangle", correct: false, feedback: "Scalene triangles have no equal sides.", misconceptionId: "E-w2-b" },
        { text: "Right triangle", correct: false, feedback: "A right triangle has one 90° angle; side lengths can vary.", misconceptionId: "E-w2-c" }
      ],
    retryHint: "Think of the prefix: 'equi' means equal, 'lateral' means sides.",
    misconceptions: [
      {
        misconceptionId: "E-w2-a",
        description: "Student confuses 'all three sides equal' with 'isosceles', not recognising isosceles specifically means exactly two.",
        rootCause: "Triangle Category Confusion — conflates the two-equal-sides category with the three-equal-sides category.",
        remediation: "'Isosceles' specifically means exactly TWO equal sides — a triangle with all THREE sides equal is a special case called 'equilateral', not isosceles."
      },
      {
        misconceptionId: "E-w2-b",
        description: "Student confuses 'scalene' (no equal sides) with the described triangle (all sides equal), possibly mixing up the two extreme categories.",
        rootCause: "Triangle Category Confusion — mixes up the 'no equal sides' category with the 'all equal sides' category.",
        remediation: "Scalene means NO sides are equal — the opposite of the situation described (ALL three sides equal), which is equilateral."
      },
      {
        misconceptionId: "E-w2-c",
        description: "Student confuses a side-based classification (equilateral) with an angle-based classification (right-angled).",
        rootCause: "Side/Angle Classification Confusion — mixes up classifying by side lengths with classifying by angle measures.",
        remediation: "'Right triangle' is an ANGLE-based classification (has a 90° angle); 'equilateral' is a SIDE-based classification (all sides equal) — the question asks about sides."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the side-based categories", hint: "Equilateral (3 equal), isosceles (2 equal), scalene (0 equal)." },
      { level: 2, description: "Count the equal sides described", hint: "The question says ALL THREE sides are equal." },
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
    question: "What is the name of a line segment from the centre of a circle to any point on the circle?",
    options: [
        { text: "Radius", correct: true, feedback: "The radius is the distance from the centre to any point on the circle." },
        { text: "Diameter", correct: false, feedback: "The diameter goes all the way across through the centre.", misconceptionId: "E-w3-a" },
        { text: "Chord", correct: false, feedback: "A chord is any line segment joining two points on the circle, not necessarily through the centre.", misconceptionId: "E-w3-b" },
        { text: "Arc", correct: false, feedback: "An arc is a curved part of the circumference.", misconceptionId: "E-w3-c" }
      ],
    retryHint: "It is half the length of the diameter.",
    misconceptions: [
      {
        misconceptionId: "E-w3-a",
        description: "Student confuses radius (centre to edge) with diameter (edge to edge through the centre).",
        rootCause: "Circle Vocabulary Confusion — mixes up the two related but distinct measurements.",
        remediation: "Radius goes from the CENTRE to the edge (one 'half' segment); diameter goes all the way ACROSS through the centre (two radii combined)."
      },
      {
        misconceptionId: "E-w3-b",
        description: "Student confuses radius with chord, not recognising the radius specifically starts at the centre.",
        rootCause: "Circle Vocabulary Confusion — doesn't distinguish a segment starting at the centre from one connecting any two points on the circle.",
        remediation: "A chord connects ANY two points on the circle's edge; the radius specifically goes from the CENTRE to one point on the edge — these are different segments."
      },
      {
        misconceptionId: "E-w3-c",
        description: "Student confuses the straight-line radius with the curved arc.",
        rootCause: "Circle Vocabulary Confusion — mixes up a straight-line segment (radius) with a curved boundary piece (arc).",
        remediation: "An arc is a CURVED part of the circle's edge (circumference); the radius is a STRAIGHT line segment from the centre to the edge."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the starting point", hint: "The segment starts at the CENTRE of the circle." },
      { level: 2, description: "Identify the ending point", hint: "The segment ends at a point ON the circle's edge." },
      { level: 3, description: "Name it", hint: "Centre-to-edge segments have a specific name — not diameter (which spans across) or chord (which doesn't start at the centre)." }
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
        { text: "4", correct: true, feedback: "A square has symmetry along both diagonals and both midlines (vertical and horizontal)." },
        { text: "2", correct: false, feedback: "That's the number for a rectangle (non‑square) or an isosceles triangle.", misconceptionId: "E-w4-a" },
        { text: "1", correct: false, feedback: "A square has more than one line of symmetry.", misconceptionId: "E-w4-b" },
        { text: "8", correct: false, feedback: "Too many; a regular octagon has 8 lines of symmetry.", misconceptionId: "E-w4-c" }
      ],
    retryHint: "Can you fold a square in half exactly? How many different ways?",
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
        { text: "6", correct: true, feedback: "A cube has 6 square faces, like a dice." },
        { text: "4", correct: false, feedback: "A cube has more than 4 faces.", misconceptionId: "E-w5-a" },
        { text: "8", correct: false, feedback: "8 is the number of vertices (corners) of a cube.", misconceptionId: "E-w5-b" },
        { text: "12", correct: false, feedback: "12 is the number of edges of a cube.", misconceptionId: "E-w5-c" }
      ],
    retryHint: "Picture a dice — how many flat square surfaces does it have?",
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
    question: "What are the coordinates of a point that is 3 units right and 4 units up from the origin?",
    options: [
        { text: "(3, 4)", correct: true, feedback: "x‑coordinate comes first (right), y‑coordinate comes second (up)." },
        { text: "(4, 3)", correct: false, feedback: "You swapped the x and y coordinates.", misconceptionId: "E-w6-a" },
        { text: "(3, −4)", correct: false, feedback: "A negative y means down, not up.", misconceptionId: "E-w6-b" },
        { text: "(0, 0)", correct: false, feedback: "That's the origin itself.", misconceptionId: "E-w6-c" }
      ],
    retryHint: "The first number is how far right (x), the second is how far up (y).",
    misconceptions: [
      {
        misconceptionId: "E-w6-a",
        description: "Student writes the y-value first and x-value second, reversing the standard (x, y) order.",
        rootCause: "Coordinate Order Reversal — swaps which value goes in the x-position versus the y-position.",
        remediation: "Coordinates are always written as (x, y) — the FIRST number is the horizontal (right) distance, the SECOND is the vertical (up) distance: (3, 4)."
      },
      {
        misconceptionId: "E-w6-b",
        description: "Student writes the y-coordinate as negative even though the point is described as moving UP (positive direction).",
        rootCause: "Sign Confusion — associates 'up' with a negative value instead of positive.",
        remediation: "Moving UP from the origin is a POSITIVE y-value; only moving DOWN would be negative — since the point moves up, y=4, not y=-4."
      },
      {
        misconceptionId: "E-w6-c",
        description: "Student reports the origin's coordinates instead of the described point's coordinates.",
        rootCause: "Wrong Point Reported — confuses the reference point (origin) with the point being described.",
        remediation: "The origin (0,0) is just the STARTING point — the question asks for the coordinates of a DIFFERENT point, 3 right and 4 up from there."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the x-coordinate", hint: "How far right? That's the FIRST number." },
      { level: 2, description: "Find the y-coordinate", hint: "How far up? That's the SECOND number." },
      { level: 3, description: "Write the pair", hint: "(x, y) = (?, ?)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "w7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-02",
    question: "Two lines that never meet and are always the same distance apart are called ______.",
    options: [
        { text: "Parallel lines", correct: true, feedback: "Parallel lines stay exactly the same distance apart forever." },
        { text: "Perpendicular lines", correct: false, feedback: "Perpendicular lines meet at a right angle.", misconceptionId: "E-w7-a" },
        { text: "Intersecting lines", correct: false, feedback: "Intersecting lines cross each other at some point.", misconceptionId: "E-w7-b" },
        { text: "Curved lines", correct: false, feedback: "Curved lines are not straight; parallel lines are straight.", misconceptionId: "E-w7-c" }
      ],
    retryHint: "Think of railway tracks — they never meet.",
    misconceptions: [
      {
        misconceptionId: "E-w7-a",
        description: "Student confuses 'never meet' (parallel) with 'meet at 90°' (perpendicular), missing that perpendicular lines DO meet.",
        rootCause: "Line Relationship Confusion — mixes up two distinct line relationships.",
        remediation: "Perpendicular lines DO meet (at a 90° angle) — the question describes lines that NEVER meet, which is the definition of parallel, not perpendicular."
      },
      {
        misconceptionId: "E-w7-b",
        description: "Student confuses 'never meet' with lines that DO cross (intersecting), the opposite relationship.",
        rootCause: "Line Relationship Confusion — selects the category describing lines that DO meet, contradicting the question's description.",
        remediation: "Intersecting lines DO cross at some point — the question describes lines that NEVER meet, which rules out intersecting lines."
      },
      {
        misconceptionId: "E-w7-c",
        description: "Student focuses only on the 'never meet' property and picks curved lines, ignoring that parallel lines are specifically straight.",
        rootCause: "Incomplete Definition Match — matches part of the description (never meet) without checking the other required property (straight, constant distance).",
        remediation: "Parallel lines are specifically STRAIGHT lines that never meet and stay the same distance apart — curved lines don't fit this precise definition."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key properties", hint: "Never meet AND always the same distance apart." },
      { level: 2, description: "Rule out lines that DO meet", hint: "Perpendicular and intersecting lines both cross at some point." },
      { level: 3, description: "Match the remaining category", hint: "Straight lines that never meet are called...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.1"]
  },
  {
    itemId: "w8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-02",
    question: "A triangle with one angle of 90° is called a ______.",
    options: [
        { text: "Right‑angled triangle", correct: true, feedback: "A triangle with a 90° angle is called a right‑angled triangle." },
        { text: "Acute‑angled triangle", correct: false, feedback: "All angles in an acute triangle are less than 90°.", misconceptionId: "E-w8-a" },
        { text: "Obtuse‑angled triangle", correct: false, feedback: "An obtuse triangle has one angle greater than 90°.", misconceptionId: "E-w8-b" },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has three 60° angles.", misconceptionId: "E-w8-c" }
      ],
    retryHint: "A right angle is exactly 90°.",
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
    skillId: "GEOLINES-01",
    question: "What type of angle is 120°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "An obtuse angle is greater than 90° and less than 180°." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°.", misconceptionId: "E-d1-a" },
        { text: "Right", correct: false, feedback: "A right angle is exactly 90°.", misconceptionId: "E-d1-b" },
        { text: "Straight", correct: false, feedback: "A straight angle is exactly 180°.", misconceptionId: "E-d1-c" }
      ],
    backward: "An obtuse angle is between 90° and 180°.",
    forward: "Angles are used in construction, design, and navigation.",
    misconceptions: [
      {
        misconceptionId: "E-d1-a",
        description: "Student severely underestimates the angle's category, calling a 120° angle acute.",
        rootCause: "Threshold Comparison Skipped — doesn't compare the angle to the 90° acute/obtuse boundary.",
        remediation: "Always compare to 90° first: 120° is GREATER than 90° (and less than 180°), placing it in the obtuse category, not acute."
      },
      {
        misconceptionId: "E-d1-b",
        description: "Student confuses 120° with the specific 90° right-angle value.",
        rootCause: "Angle Category Confusion — doesn't distinguish 'exactly 90°' from other angle measures.",
        remediation: "A right angle is EXACTLY 90° — 120° is 30° more than that, placing it in the obtuse range (90°-180°), not right."
      },
      {
        misconceptionId: "E-d1-c",
        description: "Student overestimates, confusing 120° with the 180° straight-angle value.",
        rootCause: "Angle Category Confusion — conflates an obtuse angle with the larger straight angle.",
        remediation: "A straight angle is EXACTLY 180° — 120° is less than that, falling in the obtuse range (between 90° and 180°), not straight."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle categories", hint: "Acute < 90° < obtuse < 180° (straight)." },
      { level: 2, description: "Compare the given angle to the boundaries", hint: "Is 120° between 90° and 180°?" },
      { level: 3, description: "Classify", hint: "120° falls between 90° and 180°, so it's obtuse." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "d2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle has sides 5 cm, 5 cm, and 8 cm. What type of triangle is it by sides?",
    options: [
        { text: "Isosceles", correct: true, feedback: "Two sides are equal (5 cm and 5 cm), so it is isosceles." },
        { text: "Equilateral", correct: false, feedback: "All three sides would need to be equal.", misconceptionId: "E-d2-a" },
        { text: "Scalene", correct: false, feedback: "All three sides would need to be different.", misconceptionId: "E-d2-b" },
        { text: "Cannot be determined", correct: false, feedback: "We can classify it by the side lengths given.", misconceptionId: "E-d2-c" }
      ],
    backward: "Isosceles triangles have at least two equal sides.",
    forward: "Triangles are classified by both side lengths and angles.",
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
        description: "Student believes side-based classification requires additional information (like angles) beyond just the side lengths.",
        rootCause: "Classification Requirement Misunderstanding — doesn't recognise that side-based triangle classification uses ONLY the side lengths.",
        remediation: "Classifying a triangle 'by sides' uses ONLY the side lengths given — comparing 5, 5, and 8 is sufficient to determine it's isosceles, no angle information needed."
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
    skillId: "GEOCIRC-02",
    question: "If the radius of a circle is 7 cm, what is its diameter?",
    options: [
        { text: "14 cm", correct: true, feedback: "Diameter = 2 × radius = 2 × 7 = 14 cm." },
        { text: "7 cm", correct: false, feedback: "That's the radius, not the diameter.", misconceptionId: "E-d3-a" },
        { text: "3.5 cm", correct: false, feedback: "That's half the radius.", misconceptionId: "E-d3-b" },
        { text: "21 cm", correct: false, feedback: "You multiplied by 3 instead of 2.", misconceptionId: "E-d3-c" }
      ],
    backward: "The diameter is twice the radius.",
    forward: "The diameter is used to find circumference and area.",
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
        remediation: "Diameter is LARGER than radius (it spans all the way across) — multiply the radius by 2, don't divide it: 7 × 2 = 14, not 7 ÷ 2."
      },
      {
        misconceptionId: "E-d3-c",
        description: "Student multiplies the radius by 3 instead of 2.",
        rootCause: "Wrong Multiplier Applied — uses an incorrect factor when doubling the radius.",
        remediation: "Diameter = 2 × radius exactly — multiply by 2, not 3: 7 × 2 = 14 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Diameter = 2 × radius." },
      { level: 2, description: "Substitute the value", hint: "2 × 7 = ?" },
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
    skillId: "GEOSYM-02",
    question: "How many lines of symmetry does an equilateral triangle have?",
    options: [
        { text: "3", correct: true, feedback: "Each line goes from a vertex to the midpoint of the opposite side." },
        { text: "1", correct: false, feedback: "A scalene triangle has 0; an isosceles has 1. An equilateral has 3.", misconceptionId: "E-d4-a" },
        { text: "2", correct: false, feedback: "That would be an isosceles triangle.", misconceptionId: "E-d4-b" },
        { text: "0", correct: false, feedback: "A scalene triangle has no lines of symmetry.", misconceptionId: "E-d4-c" }
      ],
    backward: "An equilateral triangle has symmetry along each median.",
    forward: "Symmetry helps in design, art, and understanding shapes.",
    misconceptions: [
      {
        misconceptionId: "E-d4-a",
        description: "Student finds only one line of symmetry and stops searching, missing the other two lines from the remaining vertices.",
        rootCause: "Incomplete Symmetry Search — stops after finding the first valid fold line instead of testing from each vertex.",
        remediation: "An equilateral triangle has THREE vertices — test a fold line from EACH vertex to the midpoint of the opposite side; all three work."
      },
      {
        misconceptionId: "E-d4-b",
        description: "Student confuses the equilateral triangle's symmetry count (3) with the isosceles triangle's count (1), or otherwise undercounts by one.",
        rootCause: "Shape Confusion — applies a different triangle type's symmetry count.",
        remediation: "An equilateral triangle (all sides/angles equal) has 3 lines of symmetry — one from each vertex — more than an isosceles triangle's single line."
      },
      {
        misconceptionId: "E-d4-c",
        description: "Student confuses the equilateral triangle (highly symmetric) with a scalene triangle (no symmetry).",
        rootCause: "Shape Confusion — mixes up the most symmetric triangle type with the least symmetric type.",
        remediation: "Equilateral triangles have ALL sides and angles equal, making them highly symmetric (3 lines) — scalene triangles (no equal sides) have 0 lines of symmetry, the opposite case."
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
    itemId: "d5",
    order: 5,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-02",
    question: "Which of the following is a polygon?",
    options: [
        { text: "Square", correct: true, feedback: "A square is a polygon because it has straight sides and is closed." },
        { text: "Circle", correct: false, feedback: "A circle has a curved boundary, so it is not a polygon.", misconceptionId: "E-d5-a" },
        { text: "Oval", correct: false, feedback: "An oval is curved, not a polygon.", misconceptionId: "E-d5-b" },
        { text: "Sphere", correct: false, feedback: "A sphere is a 3D object; polygons are 2D.", misconceptionId: "E-d5-c" }
      ],
    backward: "A polygon is a closed 2D shape with only straight sides.",
    forward: "Polygons are the building blocks of 2D geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d5-a",
        description: "Student assumes any closed shape (including a circle) qualifies as a polygon, missing the straight-sides requirement.",
        rootCause: "Polygon Definition Incomplete — focuses only on 'closed' without checking 'straight sides'.",
        remediation: "A polygon needs BOTH properties: closed AND made of straight sides — a circle is closed but curved, so it fails the straight-sides requirement."
      },
      {
        misconceptionId: "E-d5-b",
        description: "Student assumes an oval, being a common closed shape, must be a polygon, missing its curved boundary.",
        rootCause: "Polygon Definition Incomplete — focuses only on 'closed' without checking 'straight sides'.",
        remediation: "An oval's boundary is curved, not made of straight line segments — polygons require ONLY straight sides, ruling out ovals."
      },
      {
        misconceptionId: "E-d5-c",
        description: "Student doesn't distinguish 2D shapes (polygons) from 3D solids (like a sphere).",
        rootCause: "2D/3D Confusion — treats a 3D solid as if it could be classified as a 2D polygon.",
        remediation: "Polygons are specifically FLAT, 2D shapes — a sphere is a 3D solid (has volume), so it cannot be a polygon regardless of its boundary."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the polygon definition", hint: "Closed shape with ONLY straight sides." },
      { level: 2, description: "Check each option for straight sides", hint: "Circle, oval — curved. Sphere — 3D, not flat." },
      { level: 3, description: "Identify the match", hint: "Which option is flat, closed, AND made of straight sides?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.B.3"]
  },
  {
    itemId: "d6",
    order: 6,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-02",
    question: "A point is at (5, 0). Where is it located?",
    options: [
        { text: "On the x‑axis", correct: true, feedback: "When the y‑coordinate is 0, the point lies on the x‑axis." },
        { text: "On the y‑axis", correct: false, feedback: "That would be when the x‑coordinate is 0.", misconceptionId: "E-d6-a" },
        { text: "At the origin", correct: false, feedback: "The origin is (0, 0).", misconceptionId: "E-d6-b" },
        { text: "In the first quadrant", correct: false, feedback: "Points on the axes are not inside any quadrant.", misconceptionId: "E-d6-c" }
      ],
    backward: "When y = 0, the point lies on the x‑axis.",
    forward: "Coordinates are used in maps, graphs, and coding.",
    misconceptions: [
      {
        misconceptionId: "E-d6-a",
        description: "Student confuses which coordinate being zero indicates the x-axis versus the y-axis.",
        rootCause: "Axis Rule Confusion — swaps the condition for lying on the x-axis with the condition for the y-axis.",
        remediation: "A point lies ON the x-axis when its y-coordinate is 0 (like (5,0)) — a point lies on the y-axis when its x-coordinate is 0 (like (0,5))."
      },
      {
        misconceptionId: "E-d6-b",
        description: "Student confuses any point with a zero coordinate for the origin specifically, not recognising the origin requires BOTH coordinates to be zero.",
        rootCause: "Origin Definition Confusion — doesn't recognise the origin requires both x=0 AND y=0.",
        remediation: "The origin is specifically (0, 0) — BOTH coordinates must be zero. (5, 0) has x=5 (not zero), so it's on the x-axis but not at the origin."
      },
      {
        misconceptionId: "E-d6-c",
        description: "Student assumes any point with positive coordinates must be inside a quadrant, not recognising points exactly on an axis are boundary points, not interior points.",
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
    itemId: "d7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-01",
    question: "How many degrees are there in a right angle?",
    options: [
        { text: "90°", correct: true, feedback: "A right angle is exactly 90°." },
        { text: "180°", correct: false, feedback: "That's a straight angle.", misconceptionId: "E-d7-a" },
        { text: "360°", correct: false, feedback: "That's a full turn.", misconceptionId: "E-d7-b" },
        { text: "45°", correct: false, feedback: "That's half of a right angle.", misconceptionId: "E-d7-c" }
      ],
    backward: "A right angle is a quarter turn.",
    forward: "Right angles are the basis for perpendicular lines and coordinate grids.",
    misconceptions: [
      {
        misconceptionId: "E-d7-a",
        description: "Student confuses a right angle with a straight angle, both 'important' benchmark angles.",
        rootCause: "Angle Category Confusion — mixes up the 90° right angle with the 180° straight angle.",
        remediation: "A right angle is a QUARTER turn (90°); a straight angle is a HALF turn (180°) — these are two different benchmark angles."
      },
      {
        misconceptionId: "E-d7-b",
        description: "Student confuses a right angle with a full turn (360°).",
        rootCause: "Angle Category Confusion — mixes up the 90° right angle with the 360° full rotation.",
        remediation: "A right angle is a QUARTER turn (90°); a full turn all the way around is 360° — these are very different amounts of rotation."
      },
      {
        misconceptionId: "E-d7-c",
        description: "Student halves the correct value, confusing 90° with 45° (half of a right angle).",
        rootCause: "Value Halved Incorrectly — reports half the correct angle measure.",
        remediation: "A right angle is exactly 90°, not 45° — 45° is HALF of a right angle, a different (smaller) angle."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the benchmark angles", hint: "A full turn is 360°, a half turn is 180°, a quarter turn is 90°." },
      { level: 2, description: "Identify a right angle", hint: "A right angle is a QUARTER turn." },
      { level: 3, description: "State the measure", hint: "A quarter of 360° is how many degrees?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "d8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-02",
    question: "A triangle has one angle of 100°. What type of triangle is it by angles?",
    options: [
        { text: "Obtuse‑angled", correct: true, feedback: "One angle is greater than 90°, making it obtuse‑angled." },
        { text: "Acute‑angled", correct: false, feedback: "All angles would need to be less than 90°.", misconceptionId: "E-d8-a" },
        { text: "Right‑angled", correct: false, feedback: "A right angle is exactly 90°, not 100°.", misconceptionId: "E-d8-b" },
        { text: "Equilateral", correct: false, feedback: "Equilateral triangles have all angles equal to 60°.", misconceptionId: "E-d8-c" }
      ],
    backward: "An obtuse triangle has one angle greater than 90°.",
    forward: "Triangles are classified by their largest angle.",
    misconceptions: [
      {
        misconceptionId: "E-d8-a",
        description: "Student misjudges 100° as still 'small enough' to be acute, not comparing precisely to the 90° threshold.",
        rootCause: "Threshold Comparison Skipped — doesn't explicitly compare 100° to 90°.",
        remediation: "Compare directly: 100° > 90°, so this triangle has an obtuse angle, making it obtuse-angled — acute-angled requires ALL angles under 90°."
      },
      {
        misconceptionId: "E-d8-b",
        description: "Student confuses 100° with the specific 90° right-angle value.",
        rootCause: "Angle Category Confusion — doesn't distinguish 'exactly 90°' from angles greater than 90°.",
        remediation: "A right angle is EXACTLY 90° — 100° is 10° more than that, placing it in the obtuse category, not right."
      },
      {
        misconceptionId: "E-d8-c",
        description: "Student confuses an angle-based classification (obtuse-angled) with a side-based classification (equilateral).",
        rootCause: "Side/Angle Classification Confusion — mixes up classifying by angle measures with classifying by side lengths.",
        remediation: "'Equilateral' describes SIDE lengths (all equal, giving 60° angles); the question describes an ANGLE measure (100°), which corresponds to 'obtuse-angled', a different classification system."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle-based categories", hint: "Acute-angled (all <90°), right-angled (one =90°), obtuse-angled (one >90°)." },
      { level: 2, description: "Compare the given angle to 90°", hint: "Is 100° greater than 90°?" },
      { level: 3, description: "Classify", hint: "One angle greater than 90° matches which category?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-01",
    question: "What is a chord of a circle?",
    options: [
        { text: "A line segment joining any two points on the circle", correct: true, feedback: "A chord connects two points on the circumference." },
        { text: "A line from the centre to the edge", correct: false, feedback: "That's the radius.", misconceptionId: "E-d9-a" },
        { text: "A line through the centre from edge to edge", correct: false, feedback: "That's the diameter (a special chord).", misconceptionId: "E-d9-b" },
        { text: "A curved part of the circumference", correct: false, feedback: "That's an arc.", misconceptionId: "E-d9-c" }
      ],
    backward: "A chord is any line segment whose endpoints lie on the circle.",
    forward: "The diameter is the longest possible chord.",
    misconceptions: [
      {
        misconceptionId: "E-d9-a",
        description: "Student confuses chord with radius, not recognising a chord doesn't need to start at the centre.",
        rootCause: "Circle Vocabulary Confusion — mixes up a general edge-to-edge segment with the specific centre-to-edge segment.",
        remediation: "A chord connects ANY two points on the circle's edge (doesn't need to touch the centre); the radius specifically starts at the CENTRE."
      },
      {
        misconceptionId: "E-d9-b",
        description: "Student describes only the special case of a chord that passes through the centre (diameter), missing that chords in general don't need to.",
        rootCause: "Special Case Overgeneralized — treats the diameter (a special chord) as the complete definition of any chord.",
        remediation: "The diameter is a SPECIAL chord that happens to pass through the centre — but a general chord can connect any two points, not necessarily through the centre."
      },
      {
        misconceptionId: "E-d9-c",
        description: "Student confuses the straight-line chord with the curved arc.",
        rootCause: "Circle Vocabulary Confusion — mixes up a straight-line segment (chord) with a curved boundary piece (arc).",
        remediation: "An arc is a CURVED part of the circle's edge; a chord is a STRAIGHT line segment connecting two points on that edge — these are different."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the endpoints", hint: "A chord's two endpoints are both ON the circle's edge." },
      { level: 2, description: "Check if it must pass through the centre", hint: "Does a chord HAVE to go through the centre? (No — that's only the diameter.)" },
      { level: 3, description: "State the general definition", hint: "A chord is a straight segment connecting any two points on the circle." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-03",
    question: "Which letter of the alphabet has exactly one line of symmetry?",
    options: [
        { text: "A", correct: true, feedback: "The letter A has one vertical line of symmetry." },
        { text: "B", correct: false, feedback: "B has no line of symmetry in standard print.", misconceptionId: "E-d10-a" },
        { text: "H", correct: false, feedback: "H has two lines of symmetry (vertical and horizontal).", misconceptionId: "E-d10-b" },
        { text: "X", correct: false, feedback: "X has two lines of symmetry (both diagonals).", misconceptionId: "E-d10-c" }
      ],
    backward: "Trace the letter and imagine folding it. If the two halves match exactly, that fold line is a line of symmetry.",
    forward: "Symmetry is found in letters, logos, and nature.",
    misconceptions: [
      {
        misconceptionId: "E-d10-a",
        description: "Student assumes B has symmetry because it 'looks balanced', without actually testing a fold.",
        rootCause: "Visual Balance Assumption — mistakes general visual balance for actual mirror symmetry.",
        remediation: "Test by imagining an actual fold: B's curves are not symmetric top-to-bottom or left-to-right in standard print — it has zero lines of symmetry, unlike A's single vertical line."
      },
      {
        misconceptionId: "E-d10-b",
        description: "Student picks H, which has TWO lines of symmetry, instead of a letter with exactly ONE.",
        rootCause: "Symmetry Count Miscounted — doesn't verify the EXACT count requested (one, not two or more).",
        remediation: "H has symmetry along BOTH a vertical fold AND a horizontal fold (two lines total) — the question asks for exactly ONE line, which A has."
      },
      {
        misconceptionId: "E-d10-c",
        description: "Student picks X, which has TWO diagonal lines of symmetry, instead of a letter with exactly ONE.",
        rootCause: "Symmetry Count Miscounted — doesn't verify the EXACT count requested (one, not two).",
        remediation: "X has symmetry along BOTH diagonals (two lines total) — the question asks for exactly ONE line, which A has (just the vertical line)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test each letter by folding", hint: "Imagine folding each letter — do the halves match?" },
      { level: 2, description: "Count each letter's symmetry lines", hint: "A=1, B=0, H=2, X=2." },
      { level: 3, description: "Find the one with exactly one", hint: "Which letter has EXACTLY one line, not zero or two?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-03",
    question: "How many edges does a cuboid have?",
    options: [
        { text: "12", correct: true, feedback: "A cuboid has 4 edges on the top, 4 on the bottom, and 4 vertical edges." },
        { text: "6", correct: false, feedback: "6 is the number of faces.", misconceptionId: "E-d11-a" },
        { text: "8", correct: false, feedback: "8 is the number of vertices (corners).", misconceptionId: "E-d11-b" },
        { text: "10", correct: false, feedback: "A cuboid has 12 edges, not 10.", misconceptionId: "E-d11-c" }
      ],
    backward: "A cuboid has the same number of edges, faces, and vertices as a cube.",
    forward: "Edges, faces, and vertices are used to describe all 3D shapes.",
    misconceptions: [
      {
        misconceptionId: "E-d11-a",
        description: "Student confuses the number of edges with the number of faces.",
        rootCause: "3D Attribute Confusion — mixes up edges (line segments) with faces (flat surfaces).",
        remediation: "Edges are the LINE SEGMENTS where two faces meet (12 for a cuboid); faces are the FLAT SURFACES (6 for a cuboid) — these are different attributes."
      },
      {
        misconceptionId: "E-d11-b",
        description: "Student confuses the number of edges with the number of vertices.",
        rootCause: "3D Attribute Confusion — mixes up edges (line segments) with vertices (corner points).",
        remediation: "Edges are the LINE SEGMENTS (12 for a cuboid); vertices are the CORNER POINTS where edges meet (8 for a cuboid) — these are different attributes."
      },
      {
        misconceptionId: "E-d11-c",
        description: "Student undercounts the edges, perhaps missing some of the 4 vertical connecting edges.",
        rootCause: "Incomplete Edge Count — misses some edges when counting systematically.",
        remediation: "Count in three groups: 4 edges on the top face, 4 edges on the bottom face, and 4 vertical edges connecting top to bottom — that's 4+4+4=12 total."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Count the top face's edges", hint: "A cuboid's top face has 4 edges." },
      { level: 2, description: "Count the bottom face's edges", hint: "Similarly, the bottom face has 4 edges." },
      { level: 3, description: "Count the vertical edges and total", hint: "4 vertical edges connect top to bottom. 4+4+4=?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-03",
    question: "What are the coordinates of the origin?",
    options: [
        { text: "(0, 0)", correct: true, feedback: "The origin is where the x‑axis and y‑axis intersect." },
        { text: "(1, 1)", correct: false, feedback: "That's one unit right and one unit up.", misconceptionId: "E-d12-a" },
        { text: "(0, 1)", correct: false, feedback: "That's one unit up on the y‑axis.", misconceptionId: "E-d12-b" },
        { text: "(1, 0)", correct: false, feedback: "That's one unit right on the x‑axis.", misconceptionId: "E-d12-c" }
      ],
    backward: "The origin is the starting point (0,0) on a coordinate grid.",
    forward: "All coordinates are measured from the origin.",
    misconceptions: [
      {
        misconceptionId: "E-d12-a",
        description: "Student picks a point one unit away in both directions instead of the exact zero-distance starting point.",
        rootCause: "Origin Definition Confusion — doesn't recognise the origin requires BOTH coordinates to be exactly zero.",
        remediation: "The origin is the STARTING point where both axes cross — both coordinates must be 0, not 1: (0,0), not (1,1)."
      },
      {
        misconceptionId: "E-d12-b",
        description: "Student picks a point on the y-axis (x=0) but with a nonzero y-value, missing that the origin also requires y=0.",
        rootCause: "Origin Definition Confusion — satisfies only one of the two required zero conditions.",
        remediation: "The origin requires BOTH x=0 AND y=0 — (0,1) has x=0 correctly but y=1, which is not the origin, just a point on the y-axis."
      },
      {
        misconceptionId: "E-d12-c",
        description: "Student picks a point on the x-axis (y=0) but with a nonzero x-value, missing that the origin also requires x=0.",
        rootCause: "Origin Definition Confusion — satisfies only one of the two required zero conditions.",
        remediation: "The origin requires BOTH x=0 AND y=0 — (1,0) has y=0 correctly but x=1, which is not the origin, just a point on the x-axis."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the definition", hint: "The origin is where the x-axis and y-axis cross." },
      { level: 2, description: "Determine both coordinates there", hint: "At that crossing point, how far right (x) and how far up (y)?" },
      { level: 3, description: "State the coordinates", hint: "Both distances are zero: (?, ?)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d13",
    order: 13,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-03",
    question: "Two lines that meet at exactly 90° are called ______.",
    options: [
        { text: "Perpendicular lines", correct: true, feedback: "Perpendicular lines intersect at a right angle." },
        { text: "Parallel lines", correct: false, feedback: "Parallel lines never meet.", misconceptionId: "E-d13-a" },
        { text: "Intersecting lines", correct: false, feedback: "Intersecting lines can meet at any angle, not necessarily 90°.", misconceptionId: "E-d13-b" },
        { text: "Skew lines", correct: false, feedback: "Skew lines are in 3D and do not intersect, but are not parallel.", misconceptionId: "E-d13-c" }
      ],
    backward: "Perpendicular means 'at right angles'.",
    forward: "Perpendicular lines are used in grids, buildings, and coordinate axes.",
    misconceptions: [
      {
        misconceptionId: "E-d13-a",
        description: "Student confuses 'meet at 90°' (perpendicular) with 'never meet' (parallel), the opposite relationship.",
        rootCause: "Line Relationship Confusion — mixes up two distinct line relationships.",
        remediation: "Parallel lines NEVER meet at all — the question describes lines that DO meet, specifically at 90°, which is the definition of perpendicular."
      },
      {
        misconceptionId: "E-d13-b",
        description: "Student picks the broader category (intersecting, which includes ANY crossing angle) instead of the more specific 90°-only category.",
        rootCause: "General vs. Specific Category Confusion — doesn't distinguish the general 'intersecting' category from the more specific 'perpendicular' subcase.",
        remediation: "'Intersecting' describes lines crossing at ANY angle; 'perpendicular' is a SPECIFIC type of intersecting where the angle is exactly 90° — the question asks specifically about 90°."
      },
      {
        misconceptionId: "E-d13-c",
        description: "Student confuses perpendicular (2D lines meeting at 90°) with skew lines (3D lines that don't meet at all).",
        rootCause: "Line Relationship Confusion — mixes up a 2D intersecting relationship with a 3D non-intersecting relationship.",
        remediation: "Skew lines don't meet at all (they're in different planes in 3D) — the question describes lines that DO meet at 90°, which is perpendicular."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key property", hint: "The lines meet at EXACTLY 90°." },
      { level: 2, description: "Rule out non-meeting lines", hint: "Parallel and skew lines don't meet at all." },
      { level: 3, description: "Narrow to the specific 90° case", hint: "Among lines that DO meet, which specific type meets at exactly 90°?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.1"]
  },
  {
    itemId: "d14",
    order: 14,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle has angles 60°, 60°, and 60°. What type of triangle is it by sides?",
    options: [
        { text: "Equilateral", correct: true, feedback: "If all angles are equal, all sides must also be equal." },
        { text: "Isosceles", correct: false, feedback: "An isosceles triangle has only two equal angles.", misconceptionId: "E-d14-a" },
        { text: "Scalene", correct: false, feedback: "A scalene triangle has no equal angles.", misconceptionId: "E-d14-b" },
        { text: "Right‑angled", correct: false, feedback: "No angle is 90°.", misconceptionId: "E-d14-c" }
      ],
    backward: "Equal angles imply equal opposite sides.",
    forward: "Equilateral triangles are regular polygons.",
    misconceptions: [
      {
        misconceptionId: "E-d14-a",
        description: "Student undercounts the equal angles, treating 'all three equal' as if only two matched.",
        rootCause: "Equal-Angle Count Undercounted — doesn't verify all THREE angles match, not just two.",
        remediation: "Check all three angles: 60°, 60°, 60° — ALL THREE match, not just two, which means the triangle is equilateral, not isosceles."
      },
      {
        misconceptionId: "E-d14-b",
        description: "Student assumes 'scalene' when the angles are described numerically, without checking they're actually all equal.",
        rootCause: "Equal-Angle Recognition Failure — fails to notice the three given angle values are identical.",
        remediation: "Compare the three angle values directly: 60°=60°=60° — they are ALL equal, which is the opposite of scalene (no angles equal)."
      },
      {
        misconceptionId: "E-d14-c",
        description: "Student confuses an angle-based classification (right-angled) applicable to a different set of angles with this equilateral case.",
        rootCause: "Triangle Category Confusion — applies the wrong classification category to angles that don't include 90°.",
        remediation: "None of the three angles (60°, 60°, 60°) equal 90° — right-angled requires exactly one 90° angle, which isn't present here."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Compare the three angles", hint: "Are all three angle values the same?" },
      { level: 2, description: "Recall the angle-side relationship", hint: "Equal angles correspond to equal opposite sides." },
      { level: 3, description: "Classify by sides", hint: "All angles equal means all sides are also equal — what category is that?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "d15",
    order: 15,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-03",
    question: "The distance around a circle is called its ______.",
    options: [
        { text: "Circumference", correct: true, feedback: "Circumference is the perimeter of a circle." },
        { text: "Perimeter", correct: false, feedback: "Perimeter is used for polygons; circumference is for circles.", misconceptionId: "E-d15-a" },
        { text: "Area", correct: false, feedback: "Area is the space inside the circle.", misconceptionId: "E-d15-b" },
        { text: "Radius", correct: false, feedback: "Radius is the distance from the centre to the edge.", misconceptionId: "E-d15-c" }
      ],
    backward: "The circumference is the total length around the circle.",
    forward: "Circumference = π × diameter.",
    misconceptions: [
      {
        misconceptionId: "E-d15-a",
        description: "Student uses the general term 'perimeter', not recognising circles have their own specific term.",
        rootCause: "Vocabulary Specificity Missed — uses a general polygon term instead of the circle-specific term.",
        remediation: "'Perimeter' is used for shapes with STRAIGHT sides (polygons); circles have a curved boundary and use the specific term 'circumference' instead."
      },
      {
        misconceptionId: "E-d15-b",
        description: "Student confuses the distance AROUND the circle (circumference, a length) with the space INSIDE it (area).",
        rootCause: "Perimeter/Area Confusion — mixes up the boundary measurement with the interior space measurement.",
        remediation: "Circumference measures the length of the BOUNDARY (a 1D measurement, like walking around the edge); area measures the SPACE INSIDE (a 2D measurement) — the question asks about distance around, which is circumference."
      },
      {
        misconceptionId: "E-d15-c",
        description: "Student confuses circumference (the full distance around) with radius (a single straight segment from centre to edge).",
        rootCause: "Circle Vocabulary Confusion — mixes up the boundary length with a specific internal segment length.",
        remediation: "The radius is just ONE straight segment (centre to edge); the circumference is the TOTAL curved distance all the way AROUND the circle — very different measurements."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify what's being measured", hint: "The distance AROUND (the boundary), not inside." },
      { level: 2, description: "Recall the circle-specific term", hint: "Circles have their own word for 'perimeter'." },
      { level: 3, description: "State the term", hint: "The distance around a circle specifically is called...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d16",
    order: 16,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-04",
    question: "How many lines of symmetry does a regular pentagon have?",
    options: [
        { text: "5", correct: true, feedback: "A regular polygon has as many lines of symmetry as it has sides." },
        { text: "2", correct: false, feedback: "That's much too few.", misconceptionId: "E-d16-a" },
        { text: "3", correct: false, feedback: "That's for an equilateral triangle.", misconceptionId: "E-d16-b" },
        { text: "10", correct: false, feedback: "That's double the number of sides.", misconceptionId: "E-d16-c" }
      ],
    backward: "A regular pentagon has 5 sides, so it has 5 lines of symmetry.",
    forward: "Regular polygons also have rotational symmetry.",
    misconceptions: [
      {
        misconceptionId: "E-d16-a",
        description: "Student severely undercounts, perhaps thinking of only a couple of obvious fold lines without the general rule.",
        rootCause: "General Rule Not Applied — doesn't apply the pattern that a regular polygon's symmetry count equals its side count.",
        remediation: "For any REGULAR polygon, the number of lines of symmetry equals the number of sides — a pentagon has 5 sides, so it has 5 lines of symmetry, not fewer."
      },
      {
        misconceptionId: "E-d16-b",
        description: "Student confuses the pentagon's symmetry count with the equilateral triangle's count (3 sides = 3 lines).",
        rootCause: "Shape Confusion — applies a different polygon's symmetry count to the pentagon.",
        remediation: "A pentagon has 5 sides (not 3 like a triangle) — its symmetry count matches ITS side count: 5, not 3."
      },
      {
        misconceptionId: "E-d16-c",
        description: "Student doubles the side count, perhaps confusing the rule with something else (like counting both diagonals and midlines separately, which happens only for even-sided shapes with reflection AND midline symmetry, not applicable here).",
        rootCause: "Rule Overapplication — applies a doubling pattern that doesn't hold for regular polygons in general.",
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
    itemId: "d17",
    order: 17,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-04",
    question: "Which of these is NOT a 3D shape?",
    options: [
        { text: "Triangle", correct: true, feedback: "A triangle is a flat 2D shape." },
        { text: "Cube", correct: false, feedback: "A cube is a 3D shape.", misconceptionId: "E-d17-a" },
        { text: "Sphere", correct: false, feedback: "A sphere is a 3D shape.", misconceptionId: "E-d17-b" },
        { text: "Cylinder", correct: false, feedback: "A cylinder is a 3D shape.", misconceptionId: "E-d17-c" }
      ],
    backward: "3D shapes have volume and can be held; 2D shapes are flat.",
    forward: "Recognising 2D vs 3D is fundamental in geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d17-a",
        description: "Student misclassifies the cube as the flat shape, not recognising it has volume (three dimensions).",
        rootCause: "2D/3D Attribute Confusion — doesn't check whether the shape has depth/volume.",
        remediation: "A cube has length, width, AND height (volume) — it's a 3D solid, unlike a triangle, which is flat and has no depth."
      },
      {
        misconceptionId: "E-d17-b",
        description: "Student misclassifies the sphere as the flat shape, perhaps confusing it with a flat circle.",
        rootCause: "2D/3D Attribute Confusion — confuses a 3D sphere with its 2D 'shadow' (a circle).",
        remediation: "A sphere is a solid, round 3D object (like a ball) with volume — its 2D counterpart is a circle, but the sphere itself is 3D."
      },
      {
        misconceptionId: "E-d17-c",
        description: "Student misclassifies the cylinder as the flat shape, not recognising it has depth (height and circular cross-section combine to give volume).",
        rootCause: "2D/3D Attribute Confusion — doesn't check whether the shape has volume.",
        remediation: "A cylinder has a circular base AND a height, giving it volume (like a can) — it's a 3D solid, unlike the flat 2D triangle."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Check for volume/depth", hint: "Which shapes can be picked up and have 'thickness'?" },
      { level: 2, description: "Identify the flat one", hint: "Which shape is completely flat, with no depth?" },
      { level: 3, description: "Confirm", hint: "A triangle is a 2D shape — the others (cube, sphere, cylinder) all have volume." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.B.3"]
  },
  {
    itemId: "d18",
    order: 18,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-04",
    question: "A point is at (2, 5). How far is it from the origin along the x‑axis?",
    options: [
        { text: "2 units", correct: true, feedback: "The x‑coordinate (2) tells the horizontal distance from the origin." },
        { text: "5 units", correct: false, feedback: "That's the vertical distance (y‑coordinate).", misconceptionId: "E-d18-a" },
        { text: "7 units", correct: false, feedback: "You added the two coordinates.", misconceptionId: "E-d18-b" },
        { text: "√29 units", correct: false, feedback: "That would be the straight‑line distance, not along the x‑axis.", misconceptionId: "E-d18-c" }
      ],
    backward: "The x‑coordinate measures horizontal distance right from the origin.",
    forward: "Coordinates separate horizontal and vertical movement.",
    misconceptions: [
      {
        misconceptionId: "E-d18-a",
        description: "Student reports the y-coordinate (vertical distance) instead of the x-coordinate (horizontal distance) requested.",
        rootCause: "Coordinate Axis Confusion — swaps which coordinate corresponds to the x-axis distance versus the y-axis distance.",
        remediation: "The x-coordinate specifically measures HORIZONTAL distance (along the x-axis) — for (2,5), that's 2, not the y-coordinate (5, which is vertical)."
      },
      {
        misconceptionId: "E-d18-b",
        description: "Student adds both coordinates together instead of using just the x-coordinate for horizontal distance.",
        rootCause: "Coordinate Combination Error — incorrectly combines both coordinates when only one is relevant.",
        remediation: "Horizontal distance along the x-axis is given DIRECTLY by the x-coordinate alone (2) — don't add the y-coordinate to it."
      },
      {
        misconceptionId: "E-d18-c",
        description: "Student computes the straight-line (diagonal) distance from the origin to the point instead of the horizontal-only distance.",
        rootCause: "Distance Type Confusion — computes the direct diagonal distance instead of the distance restricted to one axis.",
        remediation: "The question asks for distance ALONG THE X-AXIS specifically (horizontal only), not the direct diagonal distance to the point — that's simply the x-coordinate, 2."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the coordinates", hint: "(2, 5) — x=2, y=5." },
      { level: 2, description: "Recall which coordinate is horizontal", hint: "The x-coordinate measures distance along the x-axis (horizontal)." },
      { level: 3, description: "State the answer", hint: "The horizontal distance is just the x-coordinate value." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "d19",
    order: 19,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-01",
    question: "A straight angle measures how many degrees?",
    options: [
        { text: "180°", correct: true, feedback: "A straight line forms an angle of 180°." },
        { text: "90°", correct: false, feedback: "That's a right angle.", misconceptionId: "E-d19-a" },
        { text: "360°", correct: false, feedback: "That's a full turn.", misconceptionId: "E-d19-b" },
        { text: "0°", correct: false, feedback: "That would be no angle.", misconceptionId: "E-d19-c" }
      ],
    backward: "A straight line is a half turn.",
    forward: "Angles on a straight line sum to 180°.",
    misconceptions: [
      {
        misconceptionId: "E-d19-a",
        description: "Student confuses a straight angle (180°, a half turn) with a right angle (90°, a quarter turn).",
        rootCause: "Angle Category Confusion — mixes up two different benchmark angles.",
        remediation: "A right angle is a QUARTER turn (90°); a straight angle is a HALF turn (180°), twice as large — these are different benchmark angles."
      },
      {
        misconceptionId: "E-d19-b",
        description: "Student confuses a straight angle (half turn) with a full turn (360°).",
        rootCause: "Angle Category Confusion — mixes up a half turn with a full turn.",
        remediation: "A straight angle is a HALF turn (180°); a full turn all the way around is 360°, TWICE the straight angle — these are different amounts."
      },
      {
        misconceptionId: "E-d19-c",
        description: "Student assumes a straight line has no angle at all, missing that it still forms a measurable 180° angle.",
        rootCause: "Straight Angle Concept Misunderstood — doesn't recognise that a straight line is itself a special angle measure.",
        remediation: "A straight LINE, viewed as an angle, is exactly 180° (a half turn) — it's not 'no angle' (0°); 0° would mean the two rays overlap completely with no rotation at all."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the benchmark angles", hint: "A full turn is 360°, a half turn is 180°, a quarter turn is 90°." },
      { level: 2, description: "Identify a straight angle", hint: "A straight angle is a HALF turn." },
      { level: 3, description: "State the measure", hint: "Half of 360° is how many degrees?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.MD.C.5"]
  },
  {
    itemId: "d20",
    order: 20,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-03",
    question: "What is the minimum number of acute angles in any triangle?",
    options: [
        { text: "2", correct: true, feedback: "Every triangle must have at least two acute angles. Even a right or obtuse triangle has two acute angles." },
        { text: "1", correct: false, feedback: "A triangle cannot have only one acute angle (the sum would exceed 180° if the other two were ≥90°).", misconceptionId: "E-d20-a" },
        { text: "3", correct: false, feedback: "An acute triangle has 3, but right and obtuse triangles have only 2.", misconceptionId: "E-d20-b" },
        { text: "0", correct: false, feedback: "Every triangle must have at least 2 acute angles.", misconceptionId: "E-d20-c" }
      ],
    backward: "The sum of angles in a triangle is 180°. If one angle is ≥90°, the other two must be acute.",
    forward: "This property is used in triangle classification and proofs.",
    misconceptions: [
      {
        misconceptionId: "E-d20-a",
        description: "Student assumes only 1 acute angle is guaranteed, not proving that the remaining two angles must both be acute when one is ≥90°.",
        rootCause: "Angle Sum Reasoning Incomplete — doesn't work through the full logical proof using the 180° angle sum.",
        remediation: "If one angle is 90° or more, the OTHER TWO must sum to 90° or less (since all three sum to 180°) — this forces BOTH remaining angles to be under 90° (acute), giving a guaranteed minimum of 2, not 1."
      },
      {
        misconceptionId: "E-d20-b",
        description: "Student assumes the MAXIMUM possible acute angle count (3, in an acute triangle) is also the guaranteed MINIMUM for every triangle.",
        rootCause: "Maximum/Minimum Confusion — confuses the highest possible count with the guaranteed lowest count across ALL triangle types.",
        remediation: "An acute triangle has 3 acute angles, but a right or obtuse triangle only has 2 — since the question asks for the MINIMUM guaranteed across ALL triangles, the answer is 2 (the count for right/obtuse triangles), not 3."
      },
      {
        misconceptionId: "E-d20-c",
        description: "Student assumes it's possible for a triangle to have zero acute angles, not applying the angle-sum constraint.",
        rootCause: "Angle Sum Constraint Not Applied — doesn't recognise the 180° total forces at least some angles to be small.",
        remediation: "If a triangle had zero acute angles, ALL three angles would be ≥90°, summing to at least 270° — but a triangle's angles must sum to exactly 180°, so this is impossible; at least 2 angles must be acute."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the angle sum", hint: "All three angles in a triangle sum to 180°." },
      { level: 2, description: "Test the worst case", hint: "If one angle is as large as possible (close to 180°), what must the other two be?" },
      { level: 3, description: "Generalize", hint: "Even if one angle is ≥90°, can both remaining angles also be ≥90°? Why not?" }
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
    question: "A circle has a radius of 10 cm. What is the length of its longest chord?",
    options: [
        { text: "20 cm", correct: true, feedback: "The longest chord is the diameter, which is 2 × radius = 20 cm." },
        { text: "10 cm", correct: false, feedback: "That's the radius, not the diameter.", misconceptionId: "E-d21-a" },
        { text: "5 cm", correct: false, feedback: "That's half the radius.", misconceptionId: "E-d21-b" },
        { text: "15 cm", correct: false, feedback: "That's not twice the radius.", misconceptionId: "E-d21-c" }
      ],
    backward: "The diameter is the longest chord and passes through the centre.",
    forward: "Understanding the diameter leads to circumference and area calculations.",
    misconceptions: [
      {
        misconceptionId: "E-d21-a",
        description: "Student reports the radius value directly, not recognising the LONGEST chord is the diameter (double the radius).",
        rootCause: "Longest-Chord Identification Missed — doesn't connect 'longest chord' to the specific concept of diameter.",
        remediation: "The LONGEST possible chord in a circle is specifically the diameter, which equals 2 × radius — so the answer is 2×10=20, not just the radius itself."
      },
      {
        misconceptionId: "E-d21-b",
        description: "Student halves the radius instead of doubling it.",
        rootCause: "Operation Direction Confusion — divides instead of multiplying to find the diameter from the radius.",
        remediation: "Diameter is LARGER than radius (double it) — multiply the radius by 2, don't divide it: 10 × 2 = 20, not 10 ÷ 2."
      },
      {
        misconceptionId: "E-d21-c",
        description: "Student computes an intermediate or incorrect value that isn't exactly double the radius.",
        rootCause: "Doubling Computation Error — a miscalculation when doubling the radius.",
        remediation: "Recompute: 2 × 10 = 20 exactly — verify by halving your answer to check it returns the original radius (10)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the longest chord", hint: "The longest possible chord is specifically called the diameter." },
      { level: 2, description: "Recall the diameter formula", hint: "Diameter = 2 × radius." },
      { level: 3, description: "Compute", hint: "2 × 10 = ?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "d22",
    order: 22,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-05",
    question: "Which shape has NO lines of symmetry?",
    options: [
        { text: "Scalene triangle", correct: true, feedback: "A scalene triangle has all sides different, so it has no lines of symmetry." },
        { text: "Square", correct: false, feedback: "A square has 4 lines of symmetry.", misconceptionId: "E-d22-a" },
        { text: "Equilateral triangle", correct: false, feedback: "An equilateral triangle has 3 lines of symmetry.", misconceptionId: "E-d22-b" },
        { text: "Circle", correct: false, feedback: "A circle has infinitely many lines of symmetry.", misconceptionId: "E-d22-c" }
      ],
    backward: "Symmetry requires at least two parts to be mirror images; a scalene triangle has no matching halves.",
    forward: "Asymmetry is also important in design and nature.",
    misconceptions: [
      {
        misconceptionId: "E-d22-a",
        description: "Student picks the square, which actually HAS 4 lines of symmetry, missing that the question asks for NO symmetry.",
        rootCause: "Question Direction Misread — picks a highly symmetric shape instead of one with zero symmetry.",
        remediation: "The square has 4 lines of symmetry (a lot!) — the question asks for the shape with NONE, which is the scalene triangle (no equal sides, no matching halves)."
      },
      {
        misconceptionId: "E-d22-b",
        description: "Student picks the equilateral triangle, which has 3 lines of symmetry, confusing it with the scalene triangle (0 lines).",
        rootCause: "Triangle Type Confusion — mixes up the highly symmetric equilateral triangle with the asymmetric scalene triangle.",
        remediation: "An equilateral triangle (all sides equal) has 3 lines of symmetry; a SCALENE triangle (no sides equal) has 0 — these are opposite cases."
      },
      {
        misconceptionId: "E-d22-c",
        description: "Student picks the circle, which actually has infinitely many lines of symmetry, missing that the question asks for NO symmetry.",
        rootCause: "Question Direction Misread — picks the most symmetric shape possible instead of one with zero symmetry.",
        remediation: "A circle has INFINITELY many lines of symmetry (any line through the centre works) — the question asks for the shape with NONE, which is the scalene triangle."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall each shape's symmetry", hint: "Square=4, equilateral triangle=3, circle=infinite, scalene triangle=?" },
      { level: 2, description: "Think about why scalene has none", hint: "A scalene triangle has no equal sides — can any fold line create matching halves?" },
      { level: 3, description: "Identify the answer", hint: "Which shape has ZERO matching fold lines?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.3"]
  },
  {
    itemId: "d23",
    order: 23,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-05",
    question: "Which of these nets can be folded to make a cube?",
    options: [
        { text: "A cross shape made of 6 squares", correct: true, feedback: "This T‑shaped or cross‑shaped net of 6 squares can fold into a cube." },
        { text: "5 squares in a row", correct: false, feedback: "A cube needs exactly 6 faces, not 5.", misconceptionId: "E-d23-a" },
        { text: "6 squares in a straight line", correct: false, feedback: "Six squares in a line cannot fold into a closed cube — the faces would overlap.", misconceptionId: "E-d23-b" },
        { text: "4 squares in a large square", correct: false, feedback: "That only makes 4 faces, not enough for a cube.", misconceptionId: "E-d23-c" }
      ],
    backward: "A cube net must have exactly 6 squares arranged so they can fold without overlapping.",
    forward: "Nets connect 2D and 3D geometry and are used in packaging design.",
    misconceptions: [
      {
        misconceptionId: "E-d23-a",
        description: "Student doesn't count the total number of squares in the net, missing that a cube requires exactly 6 faces, not 5.",
        rootCause: "Face Count Not Verified — doesn't check that the net has the correct total number of squares before considering foldability.",
        remediation: "A cube ALWAYS has exactly 6 faces — any net with fewer (like 5) or more squares cannot form a complete cube, regardless of arrangement."
      },
      {
        misconceptionId: "E-d23-b",
        description: "Student assumes having the correct COUNT of squares (6) automatically means the net will fold correctly, without checking the arrangement.",
        rootCause: "Arrangement Not Checked — verifies the count of squares but not whether their specific arrangement allows a valid fold.",
        remediation: "Having 6 squares is necessary but NOT sufficient — the ARRANGEMENT matters too: a straight line of 6 squares causes faces to overlap when folded, unlike a cross/T-shaped arrangement."
      },
      {
        misconceptionId: "E-d23-c",
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
    itemId: "d24",
    order: 24,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-04",
    question: "A point has coordinates (6, 3). How far is it from the x‑axis?",
    options: [
        { text: "3 units", correct: true, feedback: "The y‑coordinate (3) tells the vertical distance from the x‑axis." },
        { text: "6 units", correct: false, feedback: "That's the distance from the y‑axis (x‑coordinate).", misconceptionId: "E-d24-a" },
        { text: "9 units", correct: false, feedback: "You added the coordinates.", misconceptionId: "E-d24-b" },
        { text: "0 units", correct: false, feedback: "The point is not on the x‑axis.", misconceptionId: "E-d24-c" }
      ],
    backward: "The y‑coordinate tells how far up the point is from the x‑axis.",
    forward: "Distance from axes is used in mapping and geometry.",
    misconceptions: [
      {
        misconceptionId: "E-d24-a",
        description: "Student reports the x-coordinate (distance from the y-axis) instead of the y-coordinate (distance from the x-axis) requested.",
        rootCause: "Coordinate Axis Confusion — swaps which coordinate corresponds to distance from which axis.",
        remediation: "Distance FROM THE X-AXIS is measured vertically, which is the y-coordinate (3) — the x-coordinate (6) measures distance from the Y-axis instead, a different axis."
      },
      {
        misconceptionId: "E-d24-b",
        description: "Student adds both coordinates together instead of using just the y-coordinate for distance from the x-axis.",
        rootCause: "Coordinate Combination Error — incorrectly combines both coordinates when only one is relevant.",
        remediation: "Distance from the x-axis is given DIRECTLY by the y-coordinate alone (3) — don't add the x-coordinate to it."
      },
      {
        misconceptionId: "E-d24-c",
        description: "Student assumes the point must be on the x-axis itself (distance 0), not recognising it's a separate point some distance away.",
        rootCause: "Point Location Misunderstanding — confuses a point's distance FROM an axis with the point BEING ON that axis.",
        remediation: "The point (6,3) is NOT on the x-axis (since y=3, not 0) — it sits 3 units above the x-axis, which is its distance from that axis."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the coordinates", hint: "(6, 3) — x=6, y=3." },
      { level: 2, description: "Recall which coordinate is vertical", hint: "The y-coordinate measures distance from the x-axis (vertical distance)." },
      { level: 3, description: "State the answer", hint: "The vertical distance from the x-axis is just the y-coordinate value." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  }
];

const recheckItems = [
  {
    itemId: "r1",
    order: 1,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-01",
    question: "What type of angle is 150°?",
    options: [
        { text: "Obtuse", correct: true, feedback: "150° is between 90° and 180°, so it is obtuse." },
        { text: "Acute", correct: false, feedback: "Acute angles are less than 90°.", misconceptionId: "E-r1-a" },
        { text: "Right", correct: false, feedback: "Right angles are exactly 90°.", misconceptionId: "E-r1-b" },
        { text: "Straight", correct: false, feedback: "Straight angles are exactly 180°.", misconceptionId: "E-r1-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r1-a",
        description: "Student severely underestimates the angle's category, calling a 150° angle acute.",
        rootCause: "Threshold Comparison Skipped — doesn't compare the angle to the 90° acute/obtuse boundary.",
        remediation: "Always compare to 90° first: 150° is GREATER than 90° (and less than 180°), placing it in the obtuse category, not acute."
      },
      {
        misconceptionId: "E-r1-b",
        description: "Student confuses 150° with the specific 90° right-angle value.",
        rootCause: "Angle Category Confusion — doesn't distinguish 'exactly 90°' from other angle measures.",
        remediation: "A right angle is EXACTLY 90° — 150° is 60° more than that, placing it in the obtuse range (90°-180°), not right."
      },
      {
        misconceptionId: "E-r1-c",
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
    itemId: "r2",
    order: 2,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-01",
    question: "A triangle has sides 7 cm, 7 cm, and 7 cm. What type of triangle is it?",
    options: [
        { text: "Equilateral", correct: true, feedback: "All three sides are equal." },
        { text: "Isosceles", correct: false, feedback: "Isosceles has exactly two equal sides.", misconceptionId: "E-r2-a" },
        { text: "Scalene", correct: false, feedback: "Scalene has no equal sides.", misconceptionId: "E-r2-b" },
        { text: "Right", correct: false, feedback: "We cannot tell the angles from side lengths alone, but the side classification is equilateral.", misconceptionId: "E-r2-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r2-a",
        description: "Student doesn't verify all three sides match, treating the triangle as if only two of the three sides were equal.",
        rootCause: "Equal-Side Count Undercounted — doesn't check all THREE sides match.",
        remediation: "Check all three sides: 7, 7, and 7 — ALL THREE match, not just two, which means the triangle is equilateral, not isosceles."
      },
      {
        misconceptionId: "E-r2-b",
        description: "Student assumes 'scalene' without checking that all three side values are actually identical.",
        rootCause: "Equal-Side Recognition Failure — fails to notice the three given side values are identical.",
        remediation: "Compare the three side values directly: 7=7=7 — they are ALL equal, which is the opposite of scalene (no sides equal)."
      },
      {
        misconceptionId: "E-r2-c",
        description: "Student assumes side lengths alone can determine an angle-based classification (right-angled), which requires angle information not given.",
        rootCause: "Side/Angle Classification Confusion — attempts to apply an angle-based category using only side-length data.",
        remediation: "'Right-angled' is an ANGLE classification requiring knowledge of a 90° angle — with only side lengths given, you can only classify by SIDES (equilateral, isosceles, or scalene)."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List the three sides", hint: "7 cm, 7 cm, 7 cm." },
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
    skillId: "GEOCIRC-02",
    question: "The radius of a circle is 3 cm. What is its diameter?",
    options: [
        { text: "6 cm", correct: true, feedback: "Diameter = 2 × radius = 6 cm." },
        { text: "3 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-a" },
        { text: "1.5 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-b" },
        { text: "9 cm", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r3-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r3-a",
        description: "Student reports the radius value directly as the diameter, without doubling it.",
        rootCause: "Doubling Step Omitted — forgets that diameter = 2 × radius, not radius itself.",
        remediation: "The diameter is TWICE the radius — you must multiply the radius by 2, not just restate the radius value."
      },
      {
        misconceptionId: "E-r3-b",
        description: "Student halves the radius instead of doubling it, applying the inverse operation.",
        rootCause: "Operation Direction Confusion — divides instead of multiplying to relate radius and diameter.",
        remediation: "Diameter is LARGER than radius (it spans all the way across) — multiply the radius by 2, don't divide it: 3 × 2 = 6, not 3 ÷ 2."
      },
      {
        misconceptionId: "E-r3-c",
        description: "Student multiplies the radius by 3 instead of 2.",
        rootCause: "Wrong Multiplier Applied — uses an incorrect factor when doubling the radius.",
        remediation: "Diameter = 2 × radius exactly — multiply by 2, not 3: 3 × 2 = 6 cm."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the relationship", hint: "Diameter = 2 × radius." },
      { level: 2, description: "Substitute the value", hint: "2 × 3 = ?" },
      { level: 3, description: "Check", hint: "Is your answer bigger than the radius, since diameter spans the whole circle?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r4",
    order: 4,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-01",
    question: "How many lines of symmetry does a rectangle (not a square) have?",
    options: [
        { text: "2", correct: true, feedback: "A non‑square rectangle has one vertical and one horizontal line of symmetry." },
        { text: "4", correct: false, feedback: "That's for a square.", misconceptionId: "E-r4-a" },
        { text: "1", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-b" },
        { text: "0", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r4-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r4-a",
        description: "Student confuses the non-square rectangle's symmetry count with a square's count, forgetting a non-square rectangle's diagonals do NOT create matching halves.",
        rootCause: "Shape Confusion — applies a square's symmetry count to a non-square rectangle.",
        remediation: "A SQUARE has 4 lines (2 midlines + 2 diagonals); a non-square RECTANGLE only has 2 (the midlines) — its diagonals don't create mirror-image halves since the sides aren't equal."
      },
      {
        misconceptionId: "E-r4-b",
        description: "Student finds only one line of symmetry (e.g. just the vertical midline) and stops, missing the horizontal midline also works.",
        rootCause: "Incomplete Symmetry Search — stops after finding the first valid fold line.",
        remediation: "Test BOTH the vertical midline AND the horizontal midline — for a non-square rectangle, both create matching halves, giving 2 total lines."
      },
      {
        misconceptionId: "E-r4-c",
        description: "Student assumes a rectangle has no symmetry at all, perhaps confusing it with an irregular quadrilateral.",
        rootCause: "Shape Confusion — treats a rectangle (which does have symmetry) as if it were an asymmetric shape.",
        remediation: "A rectangle DOES have symmetry — fold it along the vertical or horizontal midline, and the two halves match exactly, giving 2 lines of symmetry."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Test the midlines", hint: "Fold vertically and horizontally — do both halves match?" },
      { level: 2, description: "Test the diagonals", hint: "Fold along a diagonal — do the halves match for a NON-square rectangle?" },
      { level: 3, description: "Count only the valid folds", hint: "Only the midlines work for a non-square rectangle — how many is that?" }
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
        { text: "8", correct: true, feedback: "A cube has 8 corners (vertices)." },
        { text: "6", correct: false, feedback: "6 is the number of faces.", misconceptionId: "E-r5-a" },
        { text: "12", correct: false, feedback: "12 is the number of edges.", misconceptionId: "E-r5-b" },
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
    skillId: "GEOCOORD-01",
    question: "What are the coordinates of a point 2 units right and 5 units up from the origin?",
    options: [
        { text: "(2, 5)", correct: true, feedback: "x=2, y=5." },
        { text: "(5, 2)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-a" },
        { text: "(2, −5)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-b" },
        { text: "(0, 0)", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r6-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r6-a",
        description: "Student writes the y-value first and x-value second, reversing the standard (x, y) order.",
        rootCause: "Coordinate Order Reversal — swaps which value goes in the x-position versus the y-position.",
        remediation: "Coordinates are always written as (x, y) — the FIRST number is the horizontal (right) distance, the SECOND is the vertical (up) distance: (2, 5)."
      },
      {
        misconceptionId: "E-r6-b",
        description: "Student writes the y-coordinate as negative even though the point is described as moving UP (positive direction).",
        rootCause: "Sign Confusion — associates 'up' with a negative value instead of positive.",
        remediation: "Moving UP from the origin is a POSITIVE y-value; only moving DOWN would be negative — since the point moves up, y=5, not y=-5."
      },
      {
        misconceptionId: "E-r6-c",
        description: "Student reports the origin's coordinates instead of the described point's coordinates.",
        rootCause: "Wrong Point Reported — confuses the reference point (origin) with the point being described.",
        remediation: "The origin (0,0) is just the STARTING point — the question asks for the coordinates of a DIFFERENT point, 2 right and 5 up from there."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Find the x-coordinate", hint: "How far right? That's the FIRST number." },
      { level: 2, description: "Find the y-coordinate", hint: "How far up? That's the SECOND number." },
      { level: 3, description: "Write the pair", hint: "(x, y) = (?, ?)." }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
  },
  {
    itemId: "r7",
    order: 7,
    cluster: "LINES",
    clusterName: CLUSTER_NAMES.LINES,
    skillId: "GEOLINES-03",
    question: "Two lines that cross each other at any point are called ______.",
    options: [
        { text: "Intersecting lines", correct: true, feedback: "Any two lines that cross are intersecting." },
        { text: "Parallel lines", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-a" },
        { text: "Perpendicular lines", correct: false, feedback: "Perpendicular lines intersect at a specific angle (90°).", misconceptionId: "E-r7-b" },
        { text: "Curved lines", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r7-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r7-a",
        description: "Student confuses 'lines that cross' with 'lines that never meet' (parallel), the opposite relationship.",
        rootCause: "Line Relationship Confusion — mixes up two opposite line relationships.",
        remediation: "Parallel lines NEVER cross — the question describes lines that DO cross at some point, which is the definition of intersecting."
      },
      {
        misconceptionId: "E-r7-b",
        description: "Student picks the more specific 90°-only category (perpendicular) instead of the general 'any angle' category (intersecting).",
        rootCause: "General vs. Specific Category Confusion — doesn't recognise the question describes the GENERAL case (any angle), not the specific 90° case.",
        remediation: "'Perpendicular' is a SPECIFIC type of intersecting (only at 90°); 'intersecting' is the GENERAL term for lines crossing at ANY angle — the question doesn't specify 90°, so use the general term."
      },
      {
        misconceptionId: "E-r7-c",
        description: "Student focuses on the 'crossing' property but picks curved lines, ignoring that intersecting lines are specifically straight.",
        rootCause: "Incomplete Definition Match — matches part of the description without checking the shape is straight.",
        remediation: "Intersecting lines are specifically STRAIGHT lines that cross — curved lines don't fit this precise definition, even if they also cross each other."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Identify the key property", hint: "The lines cross at ANY point, not a specific angle." },
      { level: 2, description: "Rule out the never-meeting case", hint: "Parallel lines never cross, so that's ruled out." },
      { level: 3, description: "Choose the general term", hint: "Lines crossing at any angle (not specifically 90°) are called...?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.1"]
  },
  {
    itemId: "r8",
    order: 8,
    cluster: "TRI",
    clusterName: CLUSTER_NAMES.TRI,
    skillId: "GEOTRI-02",
    question: "A triangle has angles 30°, 60°, and 90°. What type of triangle is it by angles?",
    options: [
        { text: "Right‑angled", correct: true, feedback: "It has one 90° angle." },
        { text: "Acute‑angled", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-a" },
        { text: "Obtuse‑angled", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-b" },
        { text: "Equilateral", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r8-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r8-a",
        description: "Student sees two of the three angles (30° and 60°) are acute and assumes the whole triangle is acute-angled, overlooking the 90° angle.",
        rootCause: "Partial Angle Check — classifies based on some angles without checking ALL three, missing the 90° angle.",
        remediation: "Check ALL THREE angles: 30° (acute), 60° (acute), AND 90° (right) — the presence of the 90° angle makes this right-angled, even though the other two are acute."
      },
      {
        misconceptionId: "E-r8-b",
        description: "Student confuses the exact 90° angle with an angle greater than 90° (obtuse).",
        rootCause: "Threshold Comparison Error — doesn't distinguish 'equal to 90°' from 'greater than 90°'.",
        remediation: "A 90° angle is EXACTLY 90°, making the triangle right-angled — 'obtuse-angled' specifically requires an angle GREATER than 90°, which isn't the case here."
      },
      {
        misconceptionId: "E-r8-c",
        description: "Student confuses an angle-based classification (right-angled) with a side-based classification (equilateral).",
        rootCause: "Side/Angle Classification Confusion — mixes up classifying by angle measures with classifying by side lengths.",
        remediation: "'Equilateral' describes SIDE lengths (all equal, giving 60° angles); this triangle has DIFFERENT angles (30°, 60°, 90°), so it can't be equilateral — the angle-based classification is right-angled."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "List all three angles", hint: "30°, 60°, 90°." },
      { level: 2, description: "Check for a 90° angle", hint: "Is any angle exactly 90°?" },
      { level: 3, description: "Classify", hint: "One angle exactly 90° matches which category?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.4.G.A.2"]
  },
  {
    itemId: "r9",
    order: 9,
    cluster: "CIRC",
    clusterName: CLUSTER_NAMES.CIRC,
    skillId: "GEOCIRC-01",
    question: "What is the name of a chord that passes through the centre of a circle?",
    options: [
        { text: "Diameter", correct: true, feedback: "The diameter is a chord that passes through the centre." },
        { text: "Radius", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-a" },
        { text: "Arc", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-b" },
        { text: "Tangent", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r9-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r9-a",
        description: "Student confuses the diameter (a full chord through the centre, edge to edge) with the radius (only half that, centre to edge).",
        rootCause: "Circle Vocabulary Confusion — mixes up the full centre-crossing chord with the half-length centre-to-edge segment.",
        remediation: "The radius goes from the CENTRE to ONE edge point; the diameter is a chord that goes ALL THE WAY ACROSS through the centre, from edge to edge — twice as long as the radius."
      },
      {
        misconceptionId: "E-r9-b",
        description: "Student confuses the straight-line diameter with the curved arc.",
        rootCause: "Circle Vocabulary Confusion — mixes up a straight-line segment with a curved boundary piece.",
        remediation: "An arc is a CURVED part of the circle's edge; the diameter is a STRAIGHT line segment through the centre — these are very different."
      },
      {
        misconceptionId: "E-r9-c",
        description: "Student confuses the diameter (a chord passing through the interior) with a tangent (a line touching the circle at only one point, outside the circle).",
        rootCause: "Circle Vocabulary Confusion — mixes up an internal chord with an external touching line.",
        remediation: "A tangent touches the circle at only ONE point and stays OUTSIDE the circle; the diameter passes THROUGH the circle's interior, connecting two edge points via the centre."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall what a chord is", hint: "A chord connects two points on the circle's edge." },
      { level: 2, description: "Add the centre condition", hint: "This specific chord ALSO passes through the centre." },
      { level: 3, description: "Name it", hint: "A chord through the centre has a special name — it's the longest possible chord." }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r10",
    order: 10,
    cluster: "SYM",
    clusterName: CLUSTER_NAMES.SYM,
    skillId: "GEOSYM-05",
    question: "Which shape has infinitely many lines of symmetry?",
    options: [
        { text: "Circle", correct: true, feedback: "Any line through the centre of a circle is a line of symmetry." },
        { text: "Square", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-a" },
        { text: "Equilateral triangle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-b" },
        { text: "Rectangle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r10-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r10-a",
        description: "Student picks the square, which has a finite number (4) of symmetry lines, missing that only the circle has infinitely many.",
        rootCause: "Finite/Infinite Symmetry Confusion — doesn't recognise that polygons always have a finite, countable number of symmetry lines while a circle is unique in having infinite.",
        remediation: "A square has exactly 4 lines of symmetry (a fixed, countable number) — only the CIRCLE has infinitely many, since any line through its centre works as a symmetry line."
      },
      {
        misconceptionId: "E-r10-b",
        description: "Student picks the equilateral triangle, which has a finite number (3) of symmetry lines.",
        rootCause: "Finite/Infinite Symmetry Confusion — doesn't recognise polygons have finite symmetry counts.",
        remediation: "An equilateral triangle has exactly 3 lines of symmetry (a fixed number) — only the circle, with its perfectly round shape, has infinitely many lines."
      },
      {
        misconceptionId: "E-r10-c",
        description: "Student picks the rectangle, which has a finite number (2) of symmetry lines.",
        rootCause: "Finite/Infinite Symmetry Confusion — doesn't recognise polygons have finite symmetry counts.",
        remediation: "A rectangle has exactly 2 lines of symmetry (a fixed number) — only the circle has infinitely many, since it has no corners or straight edges to limit the fold lines."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall each shape's symmetry count", hint: "Square=4, equilateral triangle=3, rectangle=2." },
      { level: 2, description: "Think about shapes with no corners", hint: "A circle has no straight edges or corners — how many lines through its centre are symmetry lines?" },
      { level: 3, description: "Identify the answer", hint: "Which shape has UNLIMITED symmetry lines, not just a fixed number?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: []
  },
  {
    itemId: "r11",
    order: 11,
    cluster: "SHAPE",
    clusterName: CLUSTER_NAMES.SHAPE,
    skillId: "GEOSHAPE-02",
    question: "Which of these is a polygon?",
    options: [
        { text: "Pentagon", correct: true, feedback: "A pentagon has five straight sides, so it is a polygon." },
        { text: "Circle", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-a" },
        { text: "Oval", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-b" },
        { text: "Sphere", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r11-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r11-a",
        description: "Student assumes any closed shape (including a circle) qualifies as a polygon, missing the straight-sides requirement.",
        rootCause: "Polygon Definition Incomplete — focuses only on 'closed' without checking 'straight sides'.",
        remediation: "A polygon needs BOTH properties: closed AND made of straight sides — a circle is closed but curved, so it fails the straight-sides requirement."
      },
      {
        misconceptionId: "E-r11-b",
        description: "Student assumes an oval, being a common closed shape, must be a polygon, missing its curved boundary.",
        rootCause: "Polygon Definition Incomplete — focuses only on 'closed' without checking 'straight sides'.",
        remediation: "An oval's boundary is curved, not made of straight line segments — polygons require ONLY straight sides, ruling out ovals."
      },
      {
        misconceptionId: "E-r11-c",
        description: "Student doesn't distinguish 2D shapes (polygons) from 3D solids (like a sphere).",
        rootCause: "2D/3D Confusion — treats a 3D solid as if it could be classified as a 2D polygon.",
        remediation: "Polygons are specifically FLAT, 2D shapes — a sphere is a 3D solid (has volume), so it cannot be a polygon regardless of its boundary."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the polygon definition", hint: "Closed shape with ONLY straight sides." },
      { level: 2, description: "Check each option for straight sides", hint: "Circle, oval — curved. Sphere — 3D, not flat." },
      { level: 3, description: "Identify the match", hint: "Which option is flat, closed, AND made of straight sides?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.B.3"]
  },
  {
    itemId: "r12",
    order: 12,
    cluster: "COORD",
    clusterName: CLUSTER_NAMES.COORD,
    skillId: "GEOCOORD-02",
    question: "A point lies on the y‑axis. Which coordinate must be zero?",
    options: [
        { text: "x‑coordinate", correct: true, feedback: "All points on the y‑axis have x = 0." },
        { text: "y‑coordinate", correct: false, feedback: "The y‑coordinate can be any number.", misconceptionId: "E-r12-a" },
        { text: "Both coordinates", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-b" },
        { text: "Neither", correct: false, feedback: "Not correct — try the next one.", misconceptionId: "E-r12-c" }
      ],
    misconceptions: [
      {
        misconceptionId: "E-r12-a",
        description: "Student confuses which coordinate must be zero for the y-axis versus the x-axis.",
        rootCause: "Axis Rule Confusion — swaps the condition for lying on the y-axis with the condition for the x-axis.",
        remediation: "A point lies ON the y-axis when its X-coordinate is 0 (like (0,5)) — a point lies on the x-axis when its Y-coordinate is 0 (like (5,0)); the question asks about the y-axis specifically."
      },
      {
        misconceptionId: "E-r12-b",
        description: "Student assumes lying on the y-axis requires both coordinates to be zero, confusing it with the origin specifically.",
        rootCause: "Origin/Axis Confusion — conflates 'on the y-axis' (a whole line) with 'at the origin' (a single point).",
        remediation: "The y-axis is an entire LINE where only x=0 (y can be anything) — the ORIGIN is the single special point where BOTH x=0 and y=0; these are different concepts."
      },
      {
        misconceptionId: "E-r12-c",
        description: "Student assumes no coordinate needs to be zero for a point to lie on the y-axis.",
        rootCause: "Axis Definition Not Applied — doesn't recognise the y-axis is defined by the condition x=0.",
        remediation: "By definition, the y-axis consists of ALL points where x=0 — a point lying on the y-axis MUST have its x-coordinate equal to zero."
      }
    ],
    scaffoldingLevels: [
      { level: 1, description: "Recall the axis definitions", hint: "The y-axis is the vertical line where x=0." },
      { level: 2, description: "Apply to a point on the y-axis", hint: "If a point is on this line, what must its x-coordinate be?" },
      { level: 3, description: "State the answer", hint: "Which coordinate is forced to be zero?" }
    ],
    forwardRiskLinks: [],
    learningObjectives: ["CCSS.MATH.CONTENT.5.G.A.1"]
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

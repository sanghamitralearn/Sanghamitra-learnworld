// seed/mathSeedCh4EquationsInequalitiesL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 4
// (Equations & Inequalities), Level 2 — converted from the
// standalone diagnostic JSON ch4-equations-inequalities-level-2.json.
//
// Run with: node seed/mathSeedCh4EquationsInequalitiesL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-4-equations-inequalities";
const CHAPTER_NAME = "Equations & Inequalities";
const LEVEL = 2;

const CLUSTER_NAMES = {
  "constructing": "Constructing equations",
  "solving": "Solving linear equations (including brackets)",
  "simultaneous": "Simultaneous equations",
  "numberLine": "Inequalities on a number line",
  "solvingIneq": "Solving linear inequalities",
  "mixed": "Mixed contextual problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(4x + 3 = 2x + 11\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(2x\\): \\(2x + 3 = 11\\). Subtract 3: \\(2x = 8\\). Divide by 2: \\(x = 4\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You added 3 to 11 instead of subtracting: \\(2x = 14\\), so \\(x = 7\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You divided 8 by 4 instead of 2: \\(x = 2\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 8\\) and forgot to divide by 2."
      }
    ],
    "retryHint": "Collect \\(x\\)‑terms on one side, constants on the other, then divide.",
    "backward": "Unknowns on both sides.",
    "forward": "The standard method for any linear equation."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(3(x - 2) = 2(x + 1)\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(3x - 6 = 2x + 2\\). Subtract \\(2x\\): \\(x - 6 = 2\\). Add 6: \\(x = 8\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You forgot to distribute the 3 to the \\(-2\\): \\(3x - 2 = 2x + 1\\), giving \\(x = 3\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You subtracted the constants instead of adding: \\(x = 6 - 2 = 4\\)."
      },
      {
        "text": "\\(-4\\)",
        "correct": false,
        "feedback": "You moved the \\(-6\\) to the right without changing its sign: \\(x = 2 - 6 = -4\\)."
      }
    ],
    "retryHint": "Expand both brackets first, then collect like terms.",
    "backward": "Expanding brackets before solving.",
    "forward": "This structure appears in any equation with brackets on both sides."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A rectangle's length is 5 cm more than its width \\(w\\). Its perimeter is 34 cm. Write an equation for \\(w\\).",
    "options": [
      {
        "text": "\\(2(w + w + 5) = 34\\)",
        "correct": true,
        "feedback": "Correct. Length is \\(w + 5\\); perimeter is \\(2(w + w + 5) = 34\\)."
      },
      {
        "text": "\\(w + w + 5 = 34\\)",
        "correct": false,
        "feedback": "You wrote the semi‑perimeter instead of the full perimeter."
      },
      {
        "text": "\\(2w + 5 = 34\\)",
        "correct": false,
        "feedback": "You only doubled the width — the length must also be doubled."
      },
      {
        "text": "\\(2(w + 5) = 34\\)",
        "correct": false,
        "feedback": "You omitted the width from the bracket."
      }
    ],
    "retryHint": "Perimeter = \\(2 \\times\\) (length + width). Substitute the expression for length.",
    "backward": "Using the perimeter formula with an unknown.",
    "forward": "The standard setup for length‑and‑perimeter problems."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(3x - 5 > x + 7\\).",
    "options": [
      {
        "text": "\\(x > 6\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(x\\): \\(2x - 5 > 7\\). Add 5: \\(2x > 12\\). Divide by 2: \\(x > 6\\)."
      },
      {
        "text": "\\(x < 6\\)",
        "correct": false,
        "feedback": "You flipped the inequality sign unnecessarily."
      },
      {
        "text": "\\(x > 1\\)",
        "correct": false,
        "feedback": "You subtracted 7 from 5 instead of adding: \\(2x > 2\\), so \\(x > 1\\)."
      },
      {
        "text": "\\(x > 12\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x > 12\\) and forgot to divide by 2."
      }
    ],
    "retryHint": "Move all \\(x\\) terms to one side and numbers to the other, then divide.",
    "backward": "Two‑step inequality.",
    "forward": "The same steps as equations, with the extra flip rule for negatives."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(y = x + 3\\) and \\(2x + y = 12\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 6\\)",
        "correct": true,
        "feedback": "Correct. Substitute: \\(2x + (x + 3) = 12\\), so \\(3x + 3 = 12\\), \\(x = 3\\), and \\(y = 6\\)."
      },
      {
        "text": "\\(x = 6, y = 3\\)",
        "correct": false,
        "feedback": "You swapped the values of \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 8\\)",
        "correct": false,
        "feedback": "You subtracted 3 instead of adding: \\(3x - 3 = 12\\), \\(x = 5\\), \\(y = 8\\)."
      },
      {
        "text": "\\(x = 4, y = 7\\)",
        "correct": false,
        "feedback": "You stopped at \\(3x = 12\\) and forgot to subtract the 3: \\(x = 4\\), \\(y = 7\\)."
      }
    ],
    "retryHint": "Substitute the expression for \\(y\\) into the second equation.",
    "backward": "Substitution method.",
    "forward": "Extended to systems where neither equation is already solved."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "“\\(x\\) is at least \\(-2\\) and less than 3.” Write this as an inequality.",
    "options": [
      {
        "text": "\\(-2 \\leq x < 3\\)",
        "correct": true,
        "feedback": "Correct. “At least” means \\(\\geq\\); “less than” means \\(<\\)."
      },
      {
        "text": "\\(-2 < x \\leq 3\\)",
        "correct": false,
        "feedback": "You swapped the inclusivity of the two endpoints."
      },
      {
        "text": "\\(-2 \\leq x \\leq 3\\)",
        "correct": false,
        "feedback": "“Less than” is strict, so the upper bound should be \\(<\\)."
      },
      {
        "text": "\\(-2 < x < 3\\)",
        "correct": false,
        "feedback": "“At least” includes the endpoint, so the lower bound should be \\(\\leq\\)."
      }
    ],
    "retryHint": "“At least” = inclusive; “less than” = strict.",
    "backward": "Translating words into inequality symbols.",
    "forward": "Interval notation used throughout algebra."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{x}{3} + 2 = \\frac{x}{2}\\).",
    "options": [
      {
        "text": "\\(x = 12\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 6: \\(2x + 12 = 3x\\), so \\(x = 12\\)."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You forgot to multiply the \\(+2\\) by 6: \\(2x + 2 = 3x\\), giving \\(x = 2\\)."
      },
      {
        "text": "\\(x = 6\\)",
        "correct": false,
        "feedback": "You divided the correct answer by 2."
      },
      {
        "text": "\\(x = -12\\)",
        "correct": false,
        "feedback": "You made a sign error when collecting terms: \\(-x = 12\\) instead of \\(-x = -12\\), giving \\(x = -12\\)."
      }
    ],
    "retryHint": "Multiply every term by 6 to clear the fractions.",
    "backward": "Clearing fractions by multiplying by the LCM.",
    "forward": "The standard method for any equation with fractions."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A gym charges a \\$40 joining fee plus \\$15 per month. A member has paid \\$190 in total. How many months \\(m\\) has she been a member?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(40 + 15m = 190\\), so \\(15m = 150\\), \\(m = 10\\)."
      },
      {
        "text": "\\(13\\)",
        "correct": false,
        "feedback": "You divided 190 by 15, ignoring the joining fee."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You added the joining fee instead of subtracting: \\((190 + 40) \\div 15 \\approx 15.3\\), rounded down."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You divided the remaining amount by 30 instead of 15: \\(150 \\div 30 = 5\\)."
      }
    ],
    "retryHint": "Subtract the joining fee first, then divide by the monthly charge.",
    "backward": "Constructing and solving an equation from a real scenario.",
    "forward": "The standard structure for fixed‑plus‑variable cost problems."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“I think of a number, multiply it by 3, then subtract 5. The result is 16.” Write this as an equation.",
    "options": [
      {
        "text": "\\(3n - 5 = 16\\)",
        "correct": true,
        "feedback": "Correct. “Multiply by 3” gives \\(3n\\); “subtract 5” gives \\(3n - 5 = 16\\)."
      },
      {
        "text": "\\(3(n - 5) = 16\\)",
        "correct": false,
        "feedback": "You placed the \\(-5\\) inside the multiplication — the operations must be applied in the stated order."
      },
      {
        "text": "\\(3n + 5 = 16\\)",
        "correct": false,
        "feedback": "You translated “subtract” as addition."
      },
      {
        "text": "\\(5 - 3n = 16\\)",
        "correct": false,
        "feedback": "You reversed the whole expression."
      }
    ],
    "backward": "Order of operations when translating.",
    "forward": "The starting point for all multi‑step word problems."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is represented by a line segment from \\(-2\\) (closed) to \\(4\\) (open)?",
    "options": [
      {
        "text": "\\(-2 \\leq x < 4\\)",
        "correct": true,
        "feedback": "Correct. Closed circle at \\(-2\\) means \\(\\leq\\); open circle at 4 means \\(<\\)."
      },
      {
        "text": "\\(-2 < x \\leq 4\\)",
        "correct": false,
        "feedback": "You swapped which endpoint is inclusive."
      },
      {
        "text": "\\(-2 \\leq x \\leq 4\\)",
        "correct": false,
        "feedback": "The right endpoint is open, so it should be \\(<\\)."
      },
      {
        "text": "\\(-2 < x < 4\\)",
        "correct": false,
        "feedback": "The left endpoint is closed, so it should be \\(\\leq\\)."
      }
    ],
    "backward": "Circle types determine inclusivity.",
    "forward": "Interval notation for compound inequalities."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(5x - 4 = 3x + 8\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(3x\\): \\(2x - 4 = 8\\). Add 4: \\(2x = 12\\). \\(x = 6\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You subtracted 4 from 8 instead of adding: \\(2x = 4\\), \\(x = 2\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 12\\) and forgot to divide."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You didn't move the \\(-4\\) across: \\(2x = 8\\), \\(x = 4\\)."
      }
    ],
    "backward": "Unknowns on both sides.",
    "forward": "Standard method for linear equations."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(4x + 3 < 2x + 11\\).",
    "options": [
      {
        "text": "\\(x < 4\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(2x\\): \\(2x + 3 < 11\\). Subtract 3: \\(2x < 8\\). \\(x < 4\\)."
      },
      {
        "text": "\\(x > 4\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x < 7\\)",
        "correct": false,
        "feedback": "You added 3 and 11 instead of subtracting: \\(2x < 14\\), \\(x < 7\\)."
      },
      {
        "text": "\\(x < 8\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x < 8\\) and forgot to divide by 2."
      }
    ],
    "backward": "Same steps as equations with unknowns on both sides.",
    "forward": "Extends to inequalities with brackets and negatives."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(2x + y = 13\\) and \\(x - y = 2\\).",
    "options": [
      {
        "text": "\\(x = 5, y = 3\\)",
        "correct": true,
        "feedback": "Correct. Add the equations: \\(3x = 15\\), so \\(x = 5\\); then \\(y = 3\\)."
      },
      {
        "text": "\\(x = 3, y = 5\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 2\\)",
        "correct": false,
        "feedback": "You solved for \\(x\\) correctly but misread \\(x - y = 2\\) as \\(y = 2\\)."
      },
      {
        "text": "\\(x = 6, y = 4\\)",
        "correct": false,
        "feedback": "You made an arithmetic slip on the sum: \\(3x = 18\\) instead of \\(3x = 15\\)."
      }
    ],
    "backward": "Elimination by adding.",
    "forward": "The standard elimination method for systems where coefficients are equal and opposite."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A taxi charges \\$4 plus \\$2.50 per kilometre. A journey costs \\$19. How far was the journey?",
    "options": [
      {
        "text": "\\(6\\) km",
        "correct": true,
        "feedback": "Correct. \\(4 + 2.5d = 19\\), so \\(2.5d = 15\\), \\(d = 6\\)."
      },
      {
        "text": "\\(7.6\\) km",
        "correct": false,
        "feedback": "You divided 19 by 2.5, ignoring the fixed charge: \\(19 \\div 2.5 = 7.6\\)."
      },
      {
        "text": "\\(9.2\\) km",
        "correct": false,
        "feedback": "You added the fixed charge instead of subtracting: \\((19 + 4) \\div 2.5 = 9.2\\)."
      },
      {
        "text": "\\(15\\) km",
        "correct": false,
        "feedback": "You stopped at \\(2.5d = 15\\) without dividing by 2.5."
      }
    ],
    "backward": "Constructing and solving a linear equation from context.",
    "forward": "All fixed‑plus‑variable problems follow this pattern."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "The sum of three consecutive even numbers is 42. Write an equation for the smallest number \\(n\\).",
    "options": [
      {
        "text": "\\(n + (n + 2) + (n + 4) = 42\\)",
        "correct": true,
        "feedback": "Correct. Consecutive even numbers differ by 2, so \\(n, n+2, n+4\\)."
      },
      {
        "text": "\\(n + (n + 1) + (n + 2) = 42\\)",
        "correct": false,
        "feedback": "You used consecutive integers (differ by 1) instead of consecutive even."
      },
      {
        "text": "\\(3n = 42\\)",
        "correct": false,
        "feedback": "You forgot that the numbers are consecutive."
      },
      {
        "text": "\\(n + 2n + 3n = 42\\)",
        "correct": false,
        "feedback": "You multiplied \\(n\\) by 1, 2, 3 instead of adding 2 each time."
      }
    ],
    "backward": "Representing consecutive even integers algebraically.",
    "forward": "Common in number and pattern problems."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "“\\(x\\) is greater than \\(-3\\) and at most 5.” Write this as an inequality.",
    "options": [
      {
        "text": "\\(-3 < x \\leq 5\\)",
        "correct": true,
        "feedback": "Correct. “Greater than” is strict (\\(<\\)); “at most” is inclusive (\\(\\leq\\))."
      },
      {
        "text": "\\(-3 \\leq x < 5\\)",
        "correct": false,
        "feedback": "You swapped the inclusivity of the two bounds."
      },
      {
        "text": "\\(-3 < x < 5\\)",
        "correct": false,
        "feedback": "“At most” includes the endpoint."
      },
      {
        "text": "\\(-3 \\leq x \\leq 5\\)",
        "correct": false,
        "feedback": "“Greater than” is strict, not inclusive."
      }
    ],
    "backward": "Translating phrases into inequality symbols.",
    "forward": "Used when writing solution sets."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(4(x + 1) = 2(x + 5)\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(4x + 4 = 2x + 10\\). Subtract \\(2x\\): \\(2x + 4 = 10\\). \\(2x = 6\\), \\(x = 3\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 6\\) without dividing by 2."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You forgot to distribute 4 to the \\(+1\\), writing \\(4x + 1 = 2x + 5\\), giving \\(2x = 4\\), \\(x = 2\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You added the constants instead of subtracting: \\(2x = 14\\), \\(x = 7\\)."
      }
    ],
    "backward": "Expanding brackets on both sides.",
    "forward": "Standard multi‑step equation technique."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(5 - 2x \\geq 11\\).",
    "options": [
      {
        "text": "\\(x \\leq -3\\)",
        "correct": true,
        "feedback": "Correct. Subtract 5: \\(-2x \\geq 6\\). Divide by \\(-2\\) and flip: \\(x \\leq -3\\)."
      },
      {
        "text": "\\(x \\geq -3\\)",
        "correct": false,
        "feedback": "You forgot to flip the sign."
      },
      {
        "text": "\\(x \\leq 3\\)",
        "correct": false,
        "feedback": "You flipped the sign but mis‑signed the number."
      },
      {
        "text": "\\(x \\geq 3\\)",
        "correct": false,
        "feedback": "You made both errors — no flip and wrong sign."
      }
    ],
    "backward": "The flip rule when dividing by a negative.",
    "forward": "Essential for inequalities with negative coefficients."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(y = x + 4\\) and \\(x + y = 10\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 7\\)",
        "correct": true,
        "feedback": "Correct. Substitute: \\(x + (x+4) = 10\\) → \\(2x = 6\\) → \\(x = 3\\), \\(y = 7\\)."
      },
      {
        "text": "\\(x = 7, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 7, y = 11\\)",
        "correct": false,
        "feedback": "You subtracted 4 instead of adding: \\(2x - 4 = 10\\), \\(x = 7\\), \\(y = 11\\)."
      },
      {
        "text": "\\(x = 5, y = 5\\)",
        "correct": false,
        "feedback": "You ignored the relationship \\(y = x + 4\\)."
      }
    ],
    "backward": "Substitution method with one equation already solved.",
    "forward": "The base case of substitution."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is twice its width. Its perimeter is 60 cm. Find the width.",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. Let width \\(= w\\), length \\(= 2w\\). Perimeter \\(= 2(w + 2w) = 6w = 60\\), so \\(w = 10\\)."
      },
      {
        "text": "\\(20\\) cm",
        "correct": false,
        "feedback": "This is the length, not the width."
      },
      {
        "text": "\\(15\\) cm",
        "correct": false,
        "feedback": "You divided 60 by 4 (using the semi‑perimeter incorrectly)."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "You halved 10."
      }
    ],
    "backward": "Constructing an equation from a geometric context.",
    "forward": "Common in area and perimeter problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A rectangle's length is 3 more than twice its width \\(w\\). Write an expression for its perimeter.",
    "options": [
      {
        "text": "\\(6w + 6\\)",
        "correct": true,
        "feedback": "Correct. Length \\(= 2w + 3\\). Perimeter \\(= 2(w + 2w + 3) = 2(3w + 3) = 6w + 6\\)."
      },
      {
        "text": "\\(6w + 3\\)",
        "correct": false,
        "feedback": "You doubled the \\(3w\\) but not the 3."
      },
      {
        "text": "\\(4w + 6\\)",
        "correct": false,
        "feedback": "You wrote the length as \\(w + 3\\) instead of \\(2w + 3\\)."
      },
      {
        "text": "\\(3w + 3\\)",
        "correct": false,
        "feedback": "You wrote the semi‑perimeter rather than the perimeter."
      }
    ],
    "backward": "Constructing expressions from relationships.",
    "forward": "Used in algebraic perimeter problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Solve \\(-2x < 6\\), then describe the number line representation.",
    "options": [
      {
        "text": "Open circle at \\(-3\\), arrow to the right",
        "correct": true,
        "feedback": "Correct. Divide by \\(-2\\), flip: \\(x > -3\\). Open circle at \\(-3\\), arrow right."
      },
      {
        "text": "Closed circle at \\(-3\\), arrow to the right",
        "correct": false,
        "feedback": "\\(>\\) gives an open circle, not closed."
      },
      {
        "text": "Open circle at \\(-3\\), arrow to the left",
        "correct": false,
        "feedback": "You forgot to flip when dividing by \\(-2\\)."
      },
      {
        "text": "Open circle at 3, arrow to the right",
        "correct": false,
        "feedback": "Sign error when dividing."
      }
    ],
    "backward": "Solve then interpret.",
    "forward": "The standard method for describing solution sets."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(4(x - 1) = 2(x + 3)\\).",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(4x - 4 = 2x + 6\\). Subtract \\(2x\\): \\(2x - 4 = 6\\). \\(2x = 10\\), \\(x = 5\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "You subtracted 4 from 6 instead of adding: \\(2x = 2\\), \\(x = 1\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 10\\) without dividing."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You forgot to distribute the 4 to the \\(-1\\): \\(4x - 1 = 2x + 3\\), giving \\(2x = 4\\), \\(x = 2\\)."
      }
    ],
    "backward": "Brackets on both sides.",
    "forward": "Routine algebraic manipulation."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(3(x + 1) \\leq 2x + 8\\).",
    "options": [
      {
        "text": "\\(x \\leq 5\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(3x + 3 \\leq 2x + 8\\). Subtract \\(2x\\): \\(x + 3 \\leq 8\\). \\(x \\leq 5\\)."
      },
      {
        "text": "\\(x \\geq 5\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\leq 11\\)",
        "correct": false,
        "feedback": "You added the constants instead of moving them: \\(3 + 8 = 11\\), giving \\(x \\leq 11\\)."
      },
      {
        "text": "\\(x \\leq 2\\)",
        "correct": false,
        "feedback": "You subtracted 3 twice: \\(x \\leq 8 - 3 - 3 = 2\\)."
      }
    ],
    "backward": "Expanding brackets in an inequality.",
    "forward": "Same method as for any bracketed inequality."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x + 2y = 14\\) and \\(y = 2x\\).",
    "options": [
      {
        "text": "\\(x = 2, y = 4\\)",
        "correct": true,
        "feedback": "Correct. Substitute: \\(3x + 2(2x) = 14\\) → \\(7x = 14\\) → \\(x = 2\\), \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 2\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 2, y = 2\\)",
        "correct": false,
        "feedback": "You solved for \\(x\\) correctly but forgot \\(y = 2x\\), writing \\(y = x\\)."
      },
      {
        "text": "\\(x = 3, y = 6\\)",
        "correct": false,
        "feedback": "You made an arithmetic slip: \\(7x = 21\\) instead of \\(7x = 14\\), giving \\(x = 3\\) and \\(y = 6\\)."
      }
    ],
    "backward": "Substitution when \\(y\\) is a multiple of \\(x\\).",
    "forward": "Extends to systems with proportional relationships."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A father is currently 3 times as old as his son. In 10 years, the father will be twice as old as the son. How old is the son now?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Let son \\(= s\\), father \\(= 3s\\). In 10 years: \\(3s + 10 = 2(s + 10)\\), so \\(3s + 10 = 2s + 20\\), \\(s = 10\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(30\\)",
        "correct": false,
        "feedback": "You applied the father's multiplier (3×) to the son's current age."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "backward": "Constructing equations from age relationships.",
    "forward": "Classic age‑word problem."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“One‑third of a number \\(n\\), plus 4, is 9.” Write this as an equation.",
    "options": [
      {
        "text": "\\(\\frac{n}{3} + 4 = 9\\)",
        "correct": true,
        "feedback": "Correct. “One‑third of \\(n\\)” is \\(n/3\\); “plus 4” gives \\(n/3 + 4 = 9\\)."
      },
      {
        "text": "\\(\\frac{n + 4}{3} = 9\\)",
        "correct": false,
        "feedback": "You placed the “+4” inside the fraction."
      },
      {
        "text": "\\(\\frac{n}{3} - 4 = 9\\)",
        "correct": false,
        "feedback": "You translated “plus” as subtract."
      },
      {
        "text": "\\(3n + 4 = 9\\)",
        "correct": false,
        "feedback": "You inverted the fraction (3n instead of \\(n/3\\))."
      }
    ],
    "backward": "Translating fractions in word problems.",
    "forward": "The starting point for solving equations with fractions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Solve \\(2x + 1 \\leq 7\\), then describe the number line.",
    "options": [
      {
        "text": "Closed circle at 3, arrow to the left",
        "correct": true,
        "feedback": "Correct. \\(2x \\leq 6\\), \\(x \\leq 3\\). Closed circle at 3, arrow left."
      },
      {
        "text": "Open circle at 3, arrow to the left",
        "correct": false,
        "feedback": "\\(\\leq\\) gives a closed circle, not open."
      },
      {
        "text": "Closed circle at 3, arrow to the right",
        "correct": false,
        "feedback": "The arrow should point left for \\(\\leq\\)."
      },
      {
        "text": "Closed circle at 4, arrow to the left",
        "correct": false,
        "feedback": "\\(2x \\leq 6\\) gives \\(x \\leq 3\\), not \\(x \\leq 4\\)."
      }
    ],
    "backward": "Solve then represent.",
    "forward": "Standard method for interval representation."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{x}{4} + 1 = \\frac{x}{2}\\).",
    "options": [
      {
        "text": "\\(x = 4\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 4: \\(x + 4 = 2x\\), so \\(x = 4\\)."
      },
      {
        "text": "\\(x = 1\\)",
        "correct": false,
        "feedback": "You forgot to multiply the \\(+1\\) by 4: \\(x + 1 = 2x\\), giving \\(x = 1\\)."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(x = -4\\)",
        "correct": false,
        "feedback": "You moved the \\(+4\\) with the wrong sign: \\(x - 4 = 2x\\), giving \\(-4 = x\\)."
      }
    ],
    "backward": "Clearing fractions by multiplying by the LCM.",
    "forward": "Standard method for equations with fractions."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-3x + 1 > 10\\).",
    "options": [
      {
        "text": "\\(x < -3\\)",
        "correct": true,
        "feedback": "Correct. Subtract 1: \\(-3x > 9\\). Divide by \\(-3\\) and flip: \\(x < -3\\)."
      },
      {
        "text": "\\(x > -3\\)",
        "correct": false,
        "feedback": "You forgot to flip the sign."
      },
      {
        "text": "\\(x < 3\\)",
        "correct": false,
        "feedback": "You flipped but mis‑signed: dividing 9 by \\(-3\\) gives \\(-3\\), not 3."
      },
      {
        "text": "\\(x > 3\\)",
        "correct": false,
        "feedback": "You made both errors — no flip and wrong sign."
      }
    ],
    "backward": "Flipping the sign when dividing by a negative.",
    "forward": "Standard technique for inequalities with negative coefficients."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x - y = 5\\) and \\(x + y = 7\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 4\\)",
        "correct": true,
        "feedback": "Correct. Add the equations: \\(4x = 12\\), so \\(x = 3\\); then \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 6, y = 1\\)",
        "correct": false,
        "feedback": "You doubled \\(x\\) to make the sum work: \\(6 + 1 = 7\\), but \\(3(6) - 1 = 17 \\neq 5\\)."
      },
      {
        "text": "\\(x = 2, y = 5\\)",
        "correct": false,
        "feedback": "You solved only the second equation: \\(x + y = 7\\) gives (2, 5), but that doesn’t satisfy \\(3x - y = 5\\) (6 − 5 = 1 ≠ 5)."
      }
    ],
    "backward": "Elimination by adding.",
    "forward": "Extended to systems where coefficients need scaling."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is 4 cm more than its width. Its perimeter is 32 cm. Find the length.",
    "options": [
      {
        "text": "\\(10\\) cm",
        "correct": true,
        "feedback": "Correct. Let width \\(= w\\), length \\(= w + 4\\). Perimeter: \\(2(w + w + 4) = 32\\), so \\(2w + 4 = 16\\), \\(w = 6\\), length \\(= 10\\)."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "This is the width, not the length."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "You added the 4 twice: \\(6 + 4 + 4 = 14\\)."
      },
      {
        "text": "\\(7\\) cm",
        "correct": false,
        "feedback": "You halved the semi‑perimeter (14 ÷ 2 = 7) instead of finding the length."
      }
    ],
    "backward": "Constructing and solving a geometric equation.",
    "forward": "Common in perimeter problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“A number \\(n\\) is tripled, then 4 is subtracted. The result is 11.” Write this as an equation.",
    "options": [
      {
        "text": "\\(3n - 4 = 11\\)",
        "correct": true,
        "feedback": "Correct. Tripling gives \\(3n\\); subtracting 4 gives \\(3n - 4 = 11\\)."
      },
      {
        "text": "\\(3(n - 4) = 11\\)",
        "correct": false,
        "feedback": "You placed the \\(-4\\) inside the tripling."
      },
      {
        "text": "\\(3n + 4 = 11\\)",
        "correct": false,
        "feedback": "You translated “subtract” as addition."
      },
      {
        "text": "\\(4 - 3n = 11\\)",
        "correct": false,
        "feedback": "You reversed the expression."
      }
    ],
    "backward": "Order of operations when translating.",
    "forward": "Common form in word problems."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "The sum of three consecutive odd numbers is 51. Write an equation for the smallest number \\(n\\).",
    "options": [
      {
        "text": "\\(n + (n + 2) + (n + 4) = 51\\)",
        "correct": true,
        "feedback": "Correct. Consecutive odd numbers differ by 2."
      },
      {
        "text": "\\(n + (n + 1) + (n + 2) = 51\\)",
        "correct": false,
        "feedback": "You used consecutive integers."
      },
      {
        "text": "\\(3n = 51\\)",
        "correct": false,
        "feedback": "You ignored the “consecutive” condition."
      },
      {
        "text": "\\(n + 3n + 5n = 51\\)",
        "correct": false,
        "feedback": "You multiplied instead of adding 2 each time."
      }
    ],
    "backward": "Representing consecutive odd integers.",
    "forward": "Standard pattern problem."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(6x - 5 = 4x + 7\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(4x\\): \\(2x - 5 = 7\\). Add 5: \\(2x = 12\\). \\(x = 6\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "You subtracted 5 from 7: \\(2x = 2\\), \\(x = 1\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 12\\)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You added 5 to 7 instead of subtracting: \\(2x = 14\\), \\(x = 7\\)."
      }
    ],
    "backward": "Unknowns on both sides.",
    "forward": "Standard linear equation method."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(5(x - 2) = 3(x + 2)\\).",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(5x - 10 = 3x + 6\\). \\(2x = 16\\). \\(x = 8\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You subtracted the constants: \\(2x = 4\\), \\(x = 2\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 16\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You forgot to distribute the 5 to \\(-2\\): \\(5x - 2 = 3x + 6\\), \\(2x = 8\\), \\(x = 4\\)."
      }
    ],
    "backward": "Brackets on both sides.",
    "forward": "Multi‑step equation technique."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(y = x + 5\\) and \\(2x + y = 17\\).",
    "options": [
      {
        "text": "\\(x = 4, y = 9\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + (x + 5) = 17\\) → \\(3x = 12\\) → \\(x = 4\\), \\(y = 9\\)."
      },
      {
        "text": "\\(x = 9, y = 4\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 6, y = 11\\)",
        "correct": false,
        "feedback": "You made an arithmetic slip: \\(3x = 18\\) instead of \\(3x = 12\\)."
      },
      {
        "text": "\\(x = 4, y = 4\\)",
        "correct": false,
        "feedback": "You solved for \\(x\\) correctly but forgot to add 5 in \\(y = x + 5\\)."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Extended to systems where neither equation is solved."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(2x + y = 11\\) and \\(y = x - 1\\).",
    "options": [
      {
        "text": "\\(x = 4, y = 3\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + (x - 1) = 11\\) → \\(3x - 1 = 11\\) → \\(3x = 12\\) → \\(x = 4\\), \\(y = 3\\)."
      },
      {
        "text": "\\(x = 3, y = 4\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 4\\)",
        "correct": false,
        "feedback": "You solved \\(3x = 15\\) instead of \\(3x = 12\\)."
      },
      {
        "text": "\\(x = 4, y = 5\\)",
        "correct": false,
        "feedback": "You found \\(x = 4\\) correctly, but then computed \\(y = x + 1 = 5\\) instead of \\(y = x - 1 = 3\\)."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Common system format."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "“\\(x\\) is at least \\(-1\\) and less than 4.” Write this as an inequality.",
    "options": [
      {
        "text": "\\(-1 \\leq x < 4\\)",
        "correct": true,
        "feedback": "Correct. “At least” is inclusive; “less than” is strict."
      },
      {
        "text": "\\(-1 < x \\leq 4\\)",
        "correct": false,
        "feedback": "You swapped the inclusivity."
      },
      {
        "text": "\\(-1 \\leq x \\leq 4\\)",
        "correct": false,
        "feedback": "“Less than” is strict, not inclusive."
      },
      {
        "text": "\\(-1 < x < 4\\)",
        "correct": false,
        "feedback": "“At least” is inclusive, not strict."
      }
    ],
    "backward": "Translating words to symbols.",
    "forward": "Interval notation."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is represented by a line segment from 0 (open) to 5 (closed)?",
    "options": [
      {
        "text": "\\(0 < x \\leq 5\\)",
        "correct": true,
        "feedback": "Correct. Open circle at 0 = strict; closed circle at 5 = inclusive."
      },
      {
        "text": "\\(0 \\leq x < 5\\)",
        "correct": false,
        "feedback": "You swapped which endpoint is inclusive."
      },
      {
        "text": "\\(0 < x < 5\\)",
        "correct": false,
        "feedback": "The right endpoint is closed (inclusive)."
      },
      {
        "text": "\\(0 \\leq x \\leq 5\\)",
        "correct": false,
        "feedback": "The left endpoint is open (strict)."
      }
    ],
    "backward": "Circle types and interval notation.",
    "forward": "Standard representation of solution sets."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(3x + 4 > x + 10\\).",
    "options": [
      {
        "text": "\\(x > 3\\)",
        "correct": true,
        "feedback": "Correct. \\(2x > 6\\), \\(x > 3\\)."
      },
      {
        "text": "\\(x < 3\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x > 7\\)",
        "correct": false,
        "feedback": "You added 4 and 10: \\(2x > 14\\), \\(x > 7\\)."
      },
      {
        "text": "\\(x > 6\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x > 6\\) without dividing by 2."
      }
    ],
    "backward": "Unknowns on both sides of an inequality.",
    "forward": "Standard technique."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(2 - 3x \\geq 8\\).",
    "options": [
      {
        "text": "\\(x \\leq -2\\)",
        "correct": true,
        "feedback": "Correct. Subtract 2: \\(-3x \\geq 6\\). Divide by \\(-3\\) and flip: \\(x \\leq -2\\)."
      },
      {
        "text": "\\(x \\geq -2\\)",
        "correct": false,
        "feedback": "You forgot to flip."
      },
      {
        "text": "\\(x \\leq 2\\)",
        "correct": false,
        "feedback": "You flipped but mis‑signed."
      },
      {
        "text": "\\(x \\geq 2\\)",
        "correct": false,
        "feedback": "You made both errors."
      }
    ],
    "backward": "Flip rule.",
    "forward": "Essential for negative coefficients."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is 5 cm more than its width. Its perimeter is 46 cm. Find the width.",
    "options": [
      {
        "text": "\\(9\\) cm",
        "correct": true,
        "feedback": "Correct. \\(2(w + w + 5) = 46\\) → \\(2w + 5 = 23\\) → \\(w = 9\\)."
      },
      {
        "text": "\\(14\\) cm",
        "correct": false,
        "feedback": "This is the length, not the width."
      },
      {
        "text": "\\(11.5\\) cm",
        "correct": false,
        "feedback": "You divided 46 by 4."
      },
      {
        "text": "\\(23\\) cm",
        "correct": false,
        "feedback": "You reported the semi‑perimeter \\(2w + 5 = 23\\) instead of solving for \\(w\\)."
      }
    ],
    "backward": "Geometric equation construction.",
    "forward": "Standard perimeter problems."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A plumber charges \\$50 call‑out plus \\$30 per hour. A job costs \\$200. How many hours did it take?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. \\(50 + 30h = 200\\) → \\(30h = 150\\) → \\(h = 5\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You divided 200 by 50."
      },
      {
        "text": "\\(6.7\\)",
        "correct": false,
        "feedback": "You divided 200 by 30."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You added the fixed charge instead of subtracting: \\((200 + 50) \\div 30 \\approx 8.3\\), rounded down."
      }
    ],
    "backward": "Constructing and solving an equation from context.",
    "forward": "Fixed‑plus‑variable problems."
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
    title: "Equations & Inequalities — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Multi-step equations with unknowns on both sides and brackets, compound inequality notation, and simultaneous equations built from context — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Advanced Core diagnostic for equations and inequalities. Each question asks you to chain two or more steps — construct the equation, move terms across the equals sign, expand brackets, or combine two equations. Take your time and use the feedback to sharpen your understanding.</p>",
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

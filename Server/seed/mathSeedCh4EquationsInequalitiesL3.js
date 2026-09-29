// seed/mathSeedCh4EquationsInequalitiesL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 4
// (Equations & Inequalities), Level 3 — converted from the
// standalone diagnostic JSON ch4-equations-inequalities-level-3.json.
//
// Run with: node seed/mathSeedCh4EquationsInequalitiesL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-4-equations-inequalities";
const CHAPTER_NAME = "Equations & Inequalities";
const LEVEL = 3;

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
    "question": "Solve \\(3(2x - 1) = 4(x + 3) - 5\\).",
    "options": [
      {
        "text": "\\(x = 5\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(6x - 3 = 4x + 12 - 5 = 4x + 7\\). Then \\(2x = 10\\), \\(x = 5\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You forgot to distribute the 3 to the \\(-1\\): \\(6x - 1 = 4x + 7\\), giving \\(2x = 8\\), \\(x = 4\\)."
      },
      {
        "text": "\\(x = 10\\)",
        "correct": false,
        "feedback": "You added the constants instead of subtracting: \\(4x + 12 + 5 = 4x + 17\\), giving \\(2x = 20\\), \\(x = 10\\)."
      },
      {
        "text": "\\(x = 2.5\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "retryHint": "Expand brackets on both sides, collect like terms, then solve.",
    "backward": "Brackets and collected constants on both sides.",
    "forward": "Non‑routine equations require expanding both sides first."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Solve \\(-3 \\leq 2x + 1 < 7\\), and describe the number line.",
    "options": [
      {
        "text": "Closed circle at \\(-2\\), open circle at 3, line segment between",
        "correct": true,
        "feedback": "Correct. Subtract 1: \\(-4 \\leq 2x < 6\\). Divide by 2: \\(-2 \\leq x < 3\\). Closed at \\(-2\\), open at 3."
      },
      {
        "text": "Open circle at \\(-2\\), closed circle at 3, line segment between",
        "correct": false,
        "feedback": "You swapped the circle types at the endpoints."
      },
      {
        "text": "Closed circle at \\(-2\\), open circle at 7, line segment between",
        "correct": false,
        "feedback": "You forgot to divide the upper bound by 2."
      },
      {
        "text": "Open circle at \\(-2\\), open circle at 3, line segment between",
        "correct": false,
        "feedback": "You forgot that the lower bound is inclusive (\\(\\leq\\)), which gives a closed circle."
      }
    ],
    "retryHint": "Subtract 1 from all three parts, then divide by 2.",
    "backward": "Solving compound inequalities.",
    "forward": "The same structure appears in error bounds and intervals."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x + 2y = 19\\) and \\(2x - y = 8\\).",
    "options": [
      {
        "text": "\\(x = 5, y = 2\\)",
        "correct": true,
        "feedback": "Correct. From the second equation, \\(y = 2x - 8\\). Substitute: \\(3x + 2(2x - 8) = 19\\) → \\(7x - 16 = 19\\) → \\(7x = 35\\) → \\(x = 5\\), \\(y = 2\\)."
      },
      {
        "text": "\\(x = 2, y = 5\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = -3, y = 14\\)",
        "correct": false,
        "feedback": "You rearranged the second equation as \\(y = 8 - 2x\\) instead of \\(y = 2x - 8\\)."
      },
      {
        "text": "\\(x = 6, y = 0.5\\)",
        "correct": false,
        "feedback": "These satisfy the first equation (\\(3(6) + 2(0.5) = 19\\)) but not the second (\\(2(6) - 0.5 = 11.5 \\neq 8\\))."
      }
    ],
    "retryHint": "Rearrange the simpler equation to make \\(y\\) the subject, then substitute.",
    "backward": "Rearranging before substituting.",
    "forward": "Used when one equation isn't already in \\(y = \\ldots\\) form."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is 3 cm less than twice its width. Its perimeter is 54 cm. Find the width \\(w\\).",
    "options": [
      {
        "text": "\\(w = 10\\)",
        "correct": true,
        "feedback": "Correct. Length \\(= 2w - 3\\). Perimeter: \\(2(w + 2w - 3) = 54\\), so \\(6w - 6 = 54\\), \\(6w = 60\\), \\(w = 10\\)."
      },
      {
        "text": "\\(w = 8\\)",
        "correct": false,
        "feedback": "You used length \\(= 2w + 3\\) instead of \\(2w - 3\\): \\(6w + 6 = 54\\), \\(6w = 48\\), \\(w = 8\\)."
      },
      {
        "text": "\\(w = 15\\)",
        "correct": false,
        "feedback": "You used length \\(= w - 3\\): \\(2(2w - 3) = 54\\), \\(4w - 6 = 54\\), \\(4w = 60\\), \\(w = 15\\)."
      },
      {
        "text": "\\(w = 12\\)",
        "correct": false,
        "feedback": "You solved \\(6w = 72\\) instead of \\(6w = 60\\)."
      }
    ],
    "retryHint": "Write the length in terms of \\(w\\), then use perimeter \\(= 2(\\text{length} + \\text{width})\\).",
    "backward": "Constructing and solving an equation in a geometric context.",
    "forward": "This structure underlies all perimeter problems with relationships."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(\\frac{2x - 1}{3} \\geq x - 2\\).",
    "options": [
      {
        "text": "\\(x \\leq 5\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 3: \\(2x - 1 \\geq 3x - 6\\). Then \\(-1 + 6 \\geq x\\), so \\(x \\leq 5\\)."
      },
      {
        "text": "\\(x \\geq 5\\)",
        "correct": false,
        "feedback": "You forgot to flip the inequality sign when dividing by \\(-1\\)."
      },
      {
        "text": "\\(x \\leq -5\\)",
        "correct": false,
        "feedback": "You mis-signed the 6 on the right: \\(-x \\geq 5\\) instead of \\(-x \\geq -5\\), giving \\(x \\leq -5\\)."
      },
      {
        "text": "\\(x \\geq -5\\)",
        "correct": false,
        "feedback": "You forgot to flip the sign when dividing by \\(-1\\), AND you mis-signed the 6: \\(-x \\geq 5\\) (should be \\(-x \\geq -5\\)), giving \\(x \\geq -5\\)."
      }
    ],
    "retryHint": "Multiply both sides by 3 to clear the fraction, then collect terms.",
    "backward": "Clearing fractions in inequalities.",
    "forward": "The same technique as for equations, with the same flip rule if multiplying by a negative."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A mobile phone plan costs \\$20 per month plus \\$0.10 per minute. A second plan costs \\$35 per month with unlimited minutes. How many minutes \\(m\\) make the first plan more expensive than the second?",
    "options": [
      {
        "text": "\\(m > 150\\)",
        "correct": true,
        "feedback": "Correct. First plan: \\(20 + 0.1m\\). Second: \\(35\\). We want \\(20 + 0.1m > 35\\), so \\(0.1m > 15\\), \\(m > 150\\)."
      },
      {
        "text": "\\(m < 150\\)",
        "correct": false,
        "feedback": "You reversed the inequality direction."
      },
      {
        "text": "\\(m > 15\\)",
        "correct": false,
        "feedback": "You forgot to divide by 0.1 — you wrote \\(m > 15\\) directly instead of \\(m > 15 \\div 0.1 = 150\\)."
      },
      {
        "text": "\\(m = 150\\)",
        "correct": false,
        "feedback": "You solved the equality \\(20 + 0.1m = 35\\), not the inequality."
      }
    ],
    "retryHint": "Write each plan as an expression, set the first greater than the second, and solve.",
    "backward": "Constructing and solving an inequality from context.",
    "forward": "Cost comparison problems use exactly this structure."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{3x - 2}{4} = \\frac{x + 1}{2} + 1\\).",
    "options": [
      {
        "text": "\\(x = 8\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 4: \\(3x - 2 = 2(x + 1) + 4 = 2x + 6\\), so \\(x = 8\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You forgot to multiply the \\(+1\\) by 4: \\(3x - 2 = 2x + 2\\), giving \\(x = 4\\)."
      },
      {
        "text": "\\(x = 6\\)",
        "correct": false,
        "feedback": "You wrote \\(3x - 2 = 2x + 4\\), expanding \\(2(x+1) + 4\\) as \\(2x + 4\\). Remember that \\(+4\\) must also be applied: the RHS is \\(2x + 6\\)."
      },
      {
        "text": "\\(x = -8\\)",
        "correct": false,
        "feedback": "You made a sign error at the final step: \\(x = -8\\)."
      }
    ],
    "retryHint": "Multiply every term by 4 to clear the fractions.",
    "backward": "Clearing fractions by multiplying by the LCM.",
    "forward": "The standard method for any equation with fractions."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(\\frac{x + y}{2} = 5\\) and \\(x - y = 4\\).",
    "options": [
      {
        "text": "\\(x = 7, y = 3\\)",
        "correct": true,
        "feedback": "Correct. From the first equation: \\(x + y = 10\\). Add to \\(x - y = 4\\): \\(2x = 14\\), \\(x = 7\\), \\(y = 3\\)."
      },
      {
        "text": "\\(x = 3, y = 7\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 1\\)",
        "correct": false,
        "feedback": "Satisfies \\(x - y = 4\\) but not \\(x + y = 10\\) (\\(5 + 1 = 6\\))."
      },
      {
        "text": "\\(x = 6, y = 2\\)",
        "correct": false,
        "feedback": "Satisfies \\(x - y = 4\\) but not \\(x + y = 10\\) (\\(6 + 2 = 8\\))."
      }
    ],
    "retryHint": "Multiply the first equation by 2 to remove the fraction, then eliminate.",
    "backward": "Multiplying out fractions before elimination.",
    "forward": "Common in systems where equations aren't in standard form."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's perimeter is 68 cm. Its length is 4 cm more than 3 times its width. Find the width.",
    "options": [
      {
        "text": "\\(w = 7.5\\)",
        "correct": true,
        "feedback": "Correct. Length \\(= 3w + 4\\). Perimeter: \\(2(w + 3w + 4) = 68\\), so \\(8w + 8 = 68\\), \\(8w = 60\\), \\(w = 7.5\\)."
      },
      {
        "text": "\\(w = 9.5\\)",
        "correct": false,
        "feedback": "You used length \\(= 3w - 4\\): \\(8w - 8 = 68\\), \\(8w = 76\\), \\(w = 9.5\\)."
      },
      {
        "text": "\\(w = 15\\)",
        "correct": false,
        "feedback": "You used length \\(= w + 4\\): \\(2(2w + 4) = 68\\), \\(4w + 8 = 68\\), \\(w = 15\\)."
      },
      {
        "text": "\\(w = 3.75\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "backward": "Constructing and solving an equation from a geometric description.",
    "forward": "Multi‑step perimeter problems."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "A number \\(x\\) satisfies \\(-1 \\leq 3x - 4 \\leq 8\\). Which integer values of \\(x\\) satisfy this?",
    "options": [
      {
        "text": "\\(\\{1, 2, 3, 4\\}\\)",
        "correct": true,
        "feedback": "Correct. Add 4: \\(3 \\leq 3x \\leq 12\\). Divide by 3: \\(1 \\leq x \\leq 4\\). Integer values: 1, 2, 3, 4."
      },
      {
        "text": "\\(\\{2, 3, 4\\}\\)",
        "correct": false,
        "feedback": "You treated the lower bound as strict (\\(x > 1\\)) instead of inclusive (\\(x \\geq 1\\))."
      },
      {
        "text": "\\(\\{1, 2, 3\\}\\)",
        "correct": false,
        "feedback": "You excluded the upper bound 4."
      },
      {
        "text": "\\(\\{1, 2, 3, 4, 5\\}\\)",
        "correct": false,
        "feedback": "You included 5, which is above the upper bound \\(x \\leq 4\\)."
      }
    ],
    "backward": "Solving compound inequalities.",
    "forward": "Used to find integer solutions within ranges."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(2(x + 3) - 3(x - 1) = 4\\).",
    "options": [
      {
        "text": "\\(x = 5\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(2x + 6 - 3x + 3 = -x + 9\\). So \\(-x + 9 = 4\\), \\(-x = -5\\), \\(x = 5\\)."
      },
      {
        "text": "\\(x = -5\\)",
        "correct": false,
        "feedback": "You made a sign error at the final step: \\(-x = -5\\) but wrote \\(x = -5\\)."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You forgot the \\(+3\\) when expanding \\(-3(x-1) = -3x + 3\\): LHS becomes \\(-x + 6\\), giving \\(-x + 6 = 4\\), \\(x = 2\\)."
      },
      {
        "text": "\\(x = -2\\)",
        "correct": false,
        "feedback": "You forgot the \\(+3\\) AND made a sign error: \\(-x + 6 = 4\\), but wrote \\(-x = 2\\), \\(x = -2\\)."
      }
    ],
    "backward": "Expanding brackets with signs.",
    "forward": "Routine in any multi‑bracket equation."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(3(x - 2) + 4 \\leq 2(x + 1)\\).",
    "options": [
      {
        "text": "\\(x \\leq 4\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(3x - 6 + 4 = 3x - 2\\). RHS: \\(2x + 2\\). So \\(3x - 2 \\leq 2x + 2\\), \\(x \\leq 4\\)."
      },
      {
        "text": "\\(x \\geq 4\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\leq 2\\)",
        "correct": false,
        "feedback": "You dropped the \\(+2\\) on the right side: \\(3x - 2 \\leq 2x\\), giving \\(x \\leq 2\\)."
      },
      {
        "text": "\\(x \\leq 10\\)",
        "correct": false,
        "feedback": "You expanded \\(2(x+1)\\) as \\(2x + 8\\): \\(3x - 2 \\leq 2x + 8\\), giving \\(x \\leq 10\\)."
      }
    ],
    "backward": "Expanding brackets in an inequality.",
    "forward": "Same method as for any bracketed inequality."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(\\frac{x}{2} + \\frac{y}{3} = 5\\) and \\(x + y = 12\\).",
    "options": [
      {
        "text": "\\(x = 6, y = 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply the first equation by 6: \\(3x + 2y = 30\\). Substitute \\(x = 12 - y\\): \\(36 - 3y + 2y = 30\\), \\(y = 6\\), \\(x = 6\\)."
      },
      {
        "text": "\\(x = 12, y = 0\\)",
        "correct": false,
        "feedback": "Satisfies \\(x + y = 12\\) but not \\(x/2 + y/3 = 5\\) (\\(6 + 0 = 6 \\neq 5\\))."
      },
      {
        "text": "\\(x = 8, y = 4\\)",
        "correct": false,
        "feedback": "Check: \\(8/2 + 4/3 = 4 + 1.33 = 5.33 \\neq 5\\)."
      },
      {
        "text": "\\(x = 4, y = 8\\)",
        "correct": false,
        "feedback": "Check: \\(4/2 + 8/3 = 2 + 2.67 = 4.67 \\neq 5\\)."
      }
    ],
    "backward": "Clearing fractions then solving by substitution.",
    "forward": "Common in systems where one equation has fractional coefficients."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A shop sells small notebooks for \\$3 and large notebooks for \\$5. On Monday it sold 30 notebooks for a total of \\$110. How many small notebooks did it sell?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. Let small \\(= s\\), large \\(= l\\). \\(s + l = 30\\), \\(3s + 5l = 110\\). Substitute: \\(3s + 5(30 - s) = 110\\), \\(150 - 2s = 110\\), \\(s = 20\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "This is the number of large notebooks, not small."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You assumed an equal split (15 each): \\(3(15) + 5(15) = 120 \\neq 110\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Check: \\(3(25) + 5(5) = 100 \\neq 110\\)."
      }
    ],
    "backward": "Constructing and solving a simultaneous system from context.",
    "forward": "This two-item/two-price structure appears in every inventory problem."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "The sum of three consecutive integers is 12 more than twice the smallest. Find the smallest integer.",
    "options": [
      {
        "text": "\\(9\\)",
        "correct": true,
        "feedback": "Correct. Let integers be \\(n, n+1, n+2\\). Sum: \\(3n + 3\\). Twice the smallest plus 12: \\(2n + 12\\). Equation: \\(3n + 3 = 2n + 12\\), so \\(n = 9\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You found the middle integer (\\(9 + 1 = 10\\))."
      },
      {
        "text": "\\(11\\)",
        "correct": false,
        "feedback": "You found the largest integer (\\(9 + 2 = 11\\))."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You forgot the \\(+3\\) in the sum: \\(3n = 2n + 12\\), giving \\(n = 12\\)."
      }
    ],
    "backward": "Constructing equations from algebraic relationships.",
    "forward": "Common structure in consecutive-integer problems."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-4 \\leq 2 - 3x < 11\\), and list the integer values of \\(x\\).",
    "options": [
      {
        "text": "\\(\\{-2, -1, 0, 1, 2\\}\\)",
        "correct": true,
        "feedback": "Correct. Subtract 2: \\(-6 \\leq -3x < 9\\). Divide by \\(-3\\) and flip: \\(2 \\geq x > -3\\), i.e., \\(-3 < x \\leq 2\\). Integers: \\(-2, -1, 0, 1, 2\\)."
      },
      {
        "text": "\\(\\{-3, -2, -1, 0, 1, 2\\}\\)",
        "correct": false,
        "feedback": "You included \\(-3\\), but the lower bound is strict."
      },
      {
        "text": "\\(\\{-1, 0, 1\\}\\)",
        "correct": false,
        "feedback": "You excluded the endpoints \\(-2\\) and \\(2\\)."
      },
      {
        "text": "\\(\\{0, 1, 2\\}\\)",
        "correct": false,
        "feedback": "You excluded the negative integers."
      }
    ],
    "backward": "Compound inequality with a negative coefficient.",
    "forward": "The flip rule is essential here."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{x + 7}{2} - \\frac{x - 3}{3} = 4\\).",
    "options": [
      {
        "text": "\\(x = -3\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 6: \\(3(x + 7) - 2(x - 3) = 24\\). Expand: \\(3x + 21 - 2x + 6 = 24\\), so \\(x + 27 = 24\\), \\(x = -3\\)."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You made a sign error at the final step: \\(x + 27 = 24\\) gives \\(x = -3\\), not \\(3\\)."
      },
      {
        "text": "\\(x = -27\\)",
        "correct": false,
        "feedback": "You moved 27 to the right but kept it negative: \\(x = -24 - 3 = -27\\)."
      },
      {
        "text": "\\(x = 27\\)",
        "correct": false,
        "feedback": "You moved 27 to the right and added instead of subtracting: \\(x = 24 + 3 = 27\\)."
      }
    ],
    "backward": "Clearing fractions in an equation with a minus sign.",
    "forward": "The same structure appears in any equation with fractions."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-2(x - 3) > 4 - 3x\\).",
    "options": [
      {
        "text": "\\(x > -2\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(-2x + 6 > 4 - 3x\\). Add \\(3x\\): \\(x + 6 > 4\\). Then \\(x > -2\\)."
      },
      {
        "text": "\\(x < -2\\)",
        "correct": false,
        "feedback": "You flipped the inequality sign unnecessarily — no negative multiplication or division was needed."
      },
      {
        "text": "\\(x > 10\\)",
        "correct": false,
        "feedback": "You added 6 to both sides instead of subtracting: \\(x > 4 + 6 = 10\\)."
      },
      {
        "text": "\\(x < 10\\)",
        "correct": false,
        "feedback": "You added 6 to both sides (getting \\(x > 10\\)) AND you flipped the sign unnecessarily, giving \\(x < 10\\)."
      }
    ],
    "backward": "Expanding and collecting in an inequality.",
    "forward": "Any linear inequality follows this pattern."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x + 2y = 16\\) and \\(2x - y = 6\\).",
    "options": [
      {
        "text": "\\(x = 4, y = 2\\)",
        "correct": true,
        "feedback": "Correct. From the second equation, \\(y = 2x - 6\\). Substitute: \\(3x + 2(2x - 6) = 16\\) → \\(7x - 12 = 16\\) → \\(7x = 28\\) → \\(x = 4\\), \\(y = 2\\)."
      },
      {
        "text": "\\(x = 2, y = 4\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 1\\)",
        "correct": false,
        "feedback": "Check: \\(3(5) + 2(1) = 17 \\neq 16\\)."
      },
      {
        "text": "\\(x = 4, y = 4\\)",
        "correct": false,
        "feedback": "You solved for \\(x\\) correctly but set \\(y = x\\) instead of substituting."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Extended to any system where one equation can be rearranged."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "Two pipes fill a tank. Pipe A fills at 4 L/min and Pipe B at 6 L/min. Together they fill a 200 L tank. How many minutes does it take?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. Combined rate = \\(4 + 6 = 10\\) L/min. Time = \\(200 \\div 10 = 20\\) minutes."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "You used only pipe A's rate: \\(200 \\div 4 = 50\\)."
      },
      {
        "text": "\\(33.3\\)",
        "correct": false,
        "feedback": "You used only pipe B's rate: \\(200 \\div 6 = 33.3\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "backward": "Constructing a rate equation from context.",
    "forward": "Rates add when working together — this underlies all \"working together\" problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is 2 cm more than twice its width. Its perimeter is 40 cm. Find the length.",
    "options": [
      {
        "text": "\\(14\\) cm",
        "correct": true,
        "feedback": "Correct. Length \\(= 2w + 2\\). Perimeter: \\(2(w + 2w + 2) = 40\\), \\(6w + 4 = 40\\), \\(w = 6\\), length \\(= 14\\)."
      },
      {
        "text": "\\(6\\) cm",
        "correct": false,
        "feedback": "This is the width, not the length."
      },
      {
        "text": "\\(8\\) cm",
        "correct": false,
        "feedback": "You found the width (6) and added 2, giving 8. But length \\(= 2w + 2 = 14\\)."
      },
      {
        "text": "\\(12\\) cm",
        "correct": false,
        "feedback": "You computed \\(2w = 12\\) but forgot to add 2."
      }
    ],
    "backward": "Constructing and solving a geometric equation.",
    "forward": "Multi‑step perimeter problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-1 \\leq \\frac{x + 2}{3} < 3\\).",
    "options": [
      {
        "text": "\\(-5 \\leq x < 7\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 3: \\(-3 \\leq x + 2 < 9\\). Subtract 2: \\(-5 \\leq x < 7\\)."
      },
      {
        "text": "\\(-3 \\leq x < 9\\)",
        "correct": false,
        "feedback": "You forgot to subtract 2 after multiplying by 3."
      },
      {
        "text": "\\(-5 \\leq x < 5\\)",
        "correct": false,
        "feedback": "You subtracted 2 twice from the upper bound: \\(9 - 2 - 2 = 5\\), giving \\(-5 \\leq x < 5\\)."
      },
      {
        "text": "\\(-5 < x < 7\\)",
        "correct": false,
        "feedback": "You flipped the strictness of the lower bound (\\(\\leq\\) became \\(<\\))."
      }
    ],
    "backward": "Clearing fractions in a compound inequality.",
    "forward": "Interval notation for solution sets."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(8 - 3(x - 1) = 5 - 2x\\).",
    "options": [
      {
        "text": "\\(x = 6\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(8 - 3x + 3 = 11 - 3x\\). RHS: \\(5 - 2x\\). So \\(11 - 3x = 5 - 2x\\), \\(11 - 5 = 3x - 2x\\), \\(x = 6\\)."
      },
      {
        "text": "\\(x = -6\\)",
        "correct": false,
        "feedback": "You wrote \\(x = -6\\) instead of \\(x = 6\\) at the final step — you confused the sign of the final division."
      },
      {
        "text": "\\(x = 0\\)",
        "correct": false,
        "feedback": "You subtracted 3 instead of adding when expanding \\(-3(x - 1)\\): LHS becomes \\(5 - 3x\\), so \\(5 - 3x = 5 - 2x\\), \\(x = 0\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You added 2 to the RHS constant by mistake: \\(11 - 3x = 7 - 2x\\), giving \\(x = 4\\)."
      }
    ],
    "backward": "Expanding with a negative coefficient.",
    "forward": "This structure appears in any equation with a negative multiplier."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(\\frac{4x - 3}{5} \\leq \\frac{2x + 1}{3}\\).",
    "options": [
      {
        "text": "\\(x \\leq 7\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 15: \\(3(4x - 3) \\leq 5(2x + 1)\\). Expand: \\(12x - 9 \\leq 10x + 5\\). Then \\(2x \\leq 14\\), \\(x \\leq 7\\)."
      },
      {
        "text": "\\(x \\geq 7\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\leq 14\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x \\leq 14\\) without dividing by 2."
      },
      {
        "text": "\\(x \\leq -7\\)",
        "correct": false,
        "feedback": "You subtracted 5 from \\(-9\\) instead of adding: \\(2x \\leq -14\\), giving \\(x \\leq -7\\)."
      }
    ],
    "backward": "Clearing fractions in an inequality.",
    "forward": "The same technique as for equations, with the flip rule if multiplying by a negative."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "Two numbers have sum 30 and difference 8. Find the smaller number.",
    "options": [
      {
        "text": "\\(11\\)",
        "correct": true,
        "feedback": "Correct. Let \\(a > b\\): \\(a + b = 30\\), \\(a - b = 8\\). Add: \\(2a = 38\\), \\(a = 19\\), \\(b = 11\\). Smaller = 11."
      },
      {
        "text": "\\(19\\)",
        "correct": false,
        "feedback": "This is the larger number, not the smaller."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You found the mean of the two numbers (\\(30 \\div 2 = 15\\))."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You found half the difference (\\(8 \\div 2 = 4\\))."
      }
    ],
    "backward": "Elimination by adding.",
    "forward": "This technique underlies all sum/difference systems."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A group of 40 people goes to the cinema. Adult tickets cost \\$12 and children's tickets cost \\$8. Total cost is \\$400. How many adults were there?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. \\(12a + 8c = 400\\), \\(a + c = 40\\). Substitute: \\(12a + 8(40 - a) = 400\\), \\(4a + 320 = 400\\), \\(a = 20\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Check: \\(12(25) + 8(15) = 420\\), not 400."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "Check: \\(12(15) + 8(25) = 380\\), not 400."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Check: \\(12(10) + 8(30) = 360\\), not 400."
      }
    ],
    "backward": "Constructing a simultaneous system from context.",
    "forward": "This structure appears in any two-tier pricing problem."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A taxi charges \\$5 plus \\$2.50/km. A second taxi charges \\$8 plus \\$2/km. For what distance \\(d\\) are the costs equal?",
    "options": [
      {
        "text": "\\(6\\) km",
        "correct": true,
        "feedback": "Correct. \\(5 + 2.5d = 8 + 2d\\), so \\(0.5d = 3\\), \\(d = 6\\)."
      },
      {
        "text": "\\(3\\) km",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(2\\) km",
        "correct": false,
        "feedback": "At 2 km, the costs are \\$10 and \\$12 — not equal."
      },
      {
        "text": "\\(12\\) km",
        "correct": false,
        "feedback": "You doubled the correct answer."
      }
    ],
    "backward": "Constructing and solving an equation from a cost comparison.",
    "forward": "Real‑world comparison problems."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "How many integers \\(x\\) satisfy \\(-3 < 2x + 1 < 9\\)?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Subtract 1: \\(-4 < 2x < 8\\). Divide by 2: \\(-2 < x < 4\\). Integers: \\(-1, 0, 1, 2, 3\\), giving 5."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You included an endpoint (\\(-2\\) or \\(4\\)) that is excluded by the strict inequality."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You excluded one interior integer."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You included both endpoints."
      }
    ],
    "backward": "Solving compound inequalities and counting integer solutions.",
    "forward": "This appears in discrete problems."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(4(x - 2) - 3(x + 1) = 2(x - 4) + 5\\).",
    "options": [
      {
        "text": "\\(x = -8\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(4x - 8 - 3x - 3 = x - 11\\). RHS: \\(2x - 8 + 5 = 2x - 3\\). So \\(x - 11 = 2x - 3\\), \\(-x = 8\\), \\(x = -8\\)."
      },
      {
        "text": "\\(x = 8\\)",
        "correct": false,
        "feedback": "You made a sign error at the final step: \\(-x = 8\\) gives \\(x = -8\\), not 8."
      },
      {
        "text": "\\(x = -4\\)",
        "correct": false,
        "feedback": "You mis-combined the RHS constants: \\(2x - 8 + 5 = 2x - 3\\), not \\(2x - 7\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You made both a sign error and a constant error."
      }
    ],
    "backward": "Expanding brackets on both sides with signs.",
    "forward": "Non‑routine equation requiring careful constant handling."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(\\frac{x + 2}{4} - \\frac{x - 1}{3} > 1\\).",
    "options": [
      {
        "text": "\\(x < -2\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 12: \\(3(x + 2) - 4(x - 1) > 12\\). Expand: \\(3x + 6 - 4x + 4 > 12\\), \\(-x + 10 > 12\\), \\(-x > 2\\), \\(x < -2\\)."
      },
      {
        "text": "\\(x > -2\\)",
        "correct": false,
        "feedback": "You forgot to flip the inequality sign when dividing by \\(-1\\)."
      },
      {
        "text": "\\(x < 2\\)",
        "correct": false,
        "feedback": "You subtracted 12 from 10 with the wrong sign: \\(-x > -2\\), giving \\(x < 2\\)."
      },
      {
        "text": "\\(x > 2\\)",
        "correct": false,
        "feedback": "You subtracted 12 from 10 with the wrong sign (\\(-x > -2\\)) AND you forgot to flip the sign when dividing by \\(-1\\), giving \\(x > 2\\)."
      }
    ],
    "backward": "Clearing fractions in an inequality with a minus sign.",
    "forward": "The flip rule is essential."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(2x + 3y = 12\\) and \\(3x - 4y = 1\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 2\\)",
        "correct": true,
        "feedback": "Correct. Multiply the first by 4 and the second by 3: \\(8x + 12y = 48\\), \\(9x - 12y = 3\\). Add: \\(17x = 51\\), \\(x = 3\\). Then \\(2(3) + 3y = 12\\), \\(y = 2\\)."
      },
      {
        "text": "\\(x = 2, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 4, y = 1\\)",
        "correct": false,
        "feedback": "Check: \\(2(4) + 3(1) = 11 \\neq 12\\)."
      },
      {
        "text": "\\(x = 0, y = 4\\)",
        "correct": false,
        "feedback": "Check: \\(3(0) - 4(4) = -16 \\neq 1\\)."
      }
    ],
    "backward": "Elimination with scaling.",
    "forward": "Extends to systems where coefficients are not equal."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A boat travels 12 km upstream in 2 hours and 20 km downstream in 2 hours. Find the speed of the boat in still water \\(b\\) and the current \\(c\\).",
    "options": [
      {
        "text": "\\(b = 8, c = 2\\)",
        "correct": true,
        "feedback": "Correct. Upstream: \\(b - c = 12 \\div 2 = 6\\). Downstream: \\(b + c = 20 \\div 2 = 10\\). Add: \\(2b = 16\\), \\(b = 8\\), \\(c = 2\\)."
      },
      {
        "text": "\\(b = 2, c = 8\\)",
        "correct": false,
        "feedback": "You swapped the boat speed and current."
      },
      {
        "text": "\\(b = 6, c = 4\\)",
        "correct": false,
        "feedback": "Check: \\(6 - 4 = 2 \\neq 6\\)."
      },
      {
        "text": "\\(b = 10, c = 2\\)",
        "correct": false,
        "feedback": "Check: \\(10 - 2 = 8 \\neq 6\\)."
      }
    ],
    "backward": "Constructing a simultaneous system from rates.",
    "forward": "The same structure solves wind/current problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A rectangle's length is 5 cm more than 3 times its width. Its perimeter is 74 cm. Find the width.",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(2(w + 3w + 5) = 74\\) → \\(8w + 10 = 74\\) → \\(8w = 64\\) → \\(w = 8\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "You doubled the correct answer."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(10.5\\)",
        "correct": false,
        "feedback": "You added 10 instead of subtracting: \\(8w = 84\\), \\(w = 10.5\\)."
      }
    ],
    "backward": "Geometric equation construction.",
    "forward": "Standard perimeter problems."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(5 - 2(x - 3) = 3x + 1\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(5 - 2x + 6 = 11 - 2x\\). So \\(11 - 2x = 3x + 1\\), \\(10 = 5x\\), \\(x = 2\\)."
      },
      {
        "text": "\\(-2\\)",
        "correct": false,
        "feedback": "You wrote \\(x = -2\\) instead of \\(x = 2\\) — you divided 10 by \\(-5\\) instead of 5 at the final step."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "You stopped at \\(5x = 10\\) without dividing by 5."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You divided 10 by 2 instead of 5."
      }
    ],
    "backward": "Expanding with a negative coefficient.",
    "forward": "Routine two-side equation."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x + 2y = 17\\) and \\(2x - y = 2\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 4\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 2x - 2\\). Substitute: \\(3x + 2(2x - 2) = 17\\), \\(7x = 21\\), \\(x = 3\\), \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 1\\)",
        "correct": false,
        "feedback": "First equation holds (\\(3(5) + 2(1) = 17\\)) but the second doesn't (\\(2(5) - 1 = 9 \\neq 2\\))."
      },
      {
        "text": "\\(x = 2, y = 5\\)",
        "correct": false,
        "feedback": "Check: \\(3(2) + 2(5) = 16 \\neq 17\\)."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Common system format."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-5 \\leq 3 - 2x < 7\\), and list the integer values of \\(x\\).",
    "options": [
      {
        "text": "\\(\\{-1, 0, 1, 2, 3, 4\\}\\)",
        "correct": true,
        "feedback": "Correct. Subtract 3: \\(-8 \\leq -2x < 4\\). Divide by \\(-2\\), flip: \\(4 \\geq x > -2\\), i.e., \\(-2 < x \\leq 4\\). Integers: \\(-1, 0, 1, 2, 3, 4\\)."
      },
      {
        "text": "\\(\\{-2, -1, 0, 1, 2, 3, 4\\}\\)",
        "correct": false,
        "feedback": "You included \\(-2\\), but the lower bound is strict."
      },
      {
        "text": "\\(\\{-1, 0, 1, 2, 3\\}\\)",
        "correct": false,
        "feedback": "You excluded the upper bound 4."
      },
      {
        "text": "\\(\\{0, 1, 2, 3, 4\\}\\)",
        "correct": false,
        "feedback": "You excluded the negative integer \\(-1\\)."
      }
    ],
    "backward": "Compound inequality with a negative coefficient.",
    "forward": "Flip rule essential."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(2(x - 3) + 5 \\geq 3(x + 1) - 7\\).",
    "options": [
      {
        "text": "\\(x \\leq 3\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(2x - 1\\). RHS: \\(3x - 4\\). So \\(2x - 1 \\geq 3x - 4\\), \\(-x \\geq -3\\), \\(x \\leq 3\\)."
      },
      {
        "text": "\\(x \\geq 3\\)",
        "correct": false,
        "feedback": "You forgot to flip the sign when dividing by \\(-1\\)."
      },
      {
        "text": "\\(x \\leq -3\\)",
        "correct": false,
        "feedback": "You moved the \\(-4\\) incorrectly: \\(-x \\geq 3\\), giving \\(x \\leq -3\\)."
      },
      {
        "text": "\\(x \\geq -3\\)",
        "correct": false,
        "feedback": "You made both errors."
      }
    ],
    "backward": "Expanding and collecting in an inequality.",
    "forward": "Same method as for any linear inequality."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A shop sells pencils at \\$0.50 and pens at \\$1.50. On a day it sold 80 items for \\$80. How many pencils did it sell?",
    "options": [
      {
        "text": "\\(40\\)",
        "correct": true,
        "feedback": "Correct. \\(0.5p + 1.5q = 80\\), \\(p + q = 80\\). Substitute: \\(0.5p + 1.5(80 - p) = 80\\), \\(-p = -40\\), \\(p = 40\\)."
      },
      {
        "text": "\\(60\\)",
        "correct": false,
        "feedback": "This is the number of pens, not pencils."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      },
      {
        "text": "\\(50\\)",
        "correct": false,
        "feedback": "Check: \\(0.5(50) + 1.5(30) = 25 + 45 = 70 \\neq 80\\)."
      }
    ],
    "backward": "Simultaneous system from context.",
    "forward": "Same structure as any two-item pricing problem."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A pen costs 3 times as much as a pencil. 4 pens and 5 pencils cost \\$51. Find the cost of a pencil.",
    "options": [
      {
        "text": "\\(\\$3\\)",
        "correct": true,
        "feedback": "Correct. Let pencil \\(= p\\), pen \\(= 3p\\). Then \\(4(3p) + 5p = 51\\), \\(17p = 51\\), \\(p = 3\\)."
      },
      {
        "text": "\\(\\$4\\)",
        "correct": false,
        "feedback": "Check: \\(4(12) + 5(4) = 68 \\neq 51\\)."
      },
      {
        "text": "\\(\\$5\\)",
        "correct": false,
        "feedback": "Check: \\(4(15) + 5(5) = 85 \\neq 51\\)."
      },
      {
        "text": "\\(\\$6\\)",
        "correct": false,
        "feedback": "Check: \\(4(18) + 5(6) = 102 \\neq 51\\)."
      }
    ],
    "backward": "Constructing an equation from a cost relationship.",
    "forward": "Common structure in \"one item is a multiple of another\" problems."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(3(x + 4) - 2(x - 1) = 4(x + 2) - 9\\).",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(x + 14\\). RHS: \\(4x - 1\\). So \\(x + 14 = 4x - 1\\), \\(15 = 3x\\), \\(x = 5\\)."
      },
      {
        "text": "\\(-5\\)",
        "correct": false,
        "feedback": "You wrote \\(x = -5\\) instead of \\(x = 5\\) — you confused the sign of the final division."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You stopped at \\(3x = 15\\) without dividing by 3."
      },
      {
        "text": "\\(-15\\)",
        "correct": false,
        "feedback": "You made a sign error and stopped early."
      }
    ],
    "backward": "Expanding both sides.",
    "forward": "Multi‑step equation technique."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(4x + 3y = 24\\) and \\(2x - y = 2\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 4\\)",
        "correct": true,
        "feedback": "Correct. \\(y = 2x - 2\\). Substitute: \\(4x + 3(2x - 2) = 24\\), \\(10x = 30\\), \\(x = 3\\), \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 0\\)",
        "correct": false,
        "feedback": "Check: \\(4(5) + 3(0) = 20 \\neq 24\\)."
      },
      {
        "text": "\\(x = 2, y = 5\\)",
        "correct": false,
        "feedback": "Check: \\(4(2) + 3(5) = 23 \\neq 24\\)."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Common system format."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "How many positive integers \\(x\\) satisfy \\(-1 < \\frac{2x - 3}{2} \\leq 5\\)?",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 2: \\(-2 < 2x - 3 \\leq 10\\). Add 3: \\(1 < 2x \\leq 13\\). Divide by 2: \\(0.5 < x \\leq 6.5\\). Positive integers: \\(1, 2, 3, 4, 5, 6\\), giving 6."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You included 0 or 7, which lie outside \\(0.5 < x \\leq 6.5\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You excluded the upper bound 6."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You included both 0 and 7."
      }
    ],
    "backward": "Compound inequality and integer counting.",
    "forward": "Interval problems."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(\\frac{3x + 2}{5} - \\frac{x - 1}{2} \\geq 1\\).",
    "options": [
      {
        "text": "\\(x \\geq 1\\)",
        "correct": true,
        "feedback": "Correct. Multiply by 10: \\(2(3x + 2) - 5(x - 1) \\geq 10\\). Expand: \\(6x + 4 - 5x + 5 \\geq 10\\), so \\(x + 9 \\geq 10\\), \\(x \\geq 1\\)."
      },
      {
        "text": "\\(x \\leq 1\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\geq 19\\)",
        "correct": false,
        "feedback": "You added 9 to both sides instead of subtracting: \\(x \\geq 10 + 9 = 19\\)."
      },
      {
        "text": "\\(x \\geq -1\\)",
        "correct": false,
        "feedback": "You subtracted 2 from the right side instead of 10: \\(x + 9 \\geq 8\\), giving \\(x \\geq -1\\)."
      }
    ],
    "backward": "Clearing fractions in an inequality.",
    "forward": "Same technique for any fractional inequality."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A chemist mixes a 20% acid solution with a 50% acid solution to make 30 L of a 30% solution. How many litres of the 20% solution are used?",
    "options": [
      {
        "text": "\\(20\\)",
        "correct": true,
        "feedback": "Correct. \\(0.2a + 0.5b = 9\\), \\(a + b = 30\\). Substitute: \\(0.2a + 0.5(30 - a) = 9\\), \\(-0.3a = -6\\), \\(a = 20\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You assumed an equal split (15 L each)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "Check: \\(0.2(10) + 0.5(20) = 12 \\neq 9\\)."
      },
      {
        "text": "\\(25\\)",
        "correct": false,
        "feedback": "Check: \\(0.2(25) + 0.5(5) = 7.5 \\neq 9\\)."
      }
    ],
    "backward": "Constructing a simultaneous system from a mixture problem.",
    "forward": "This structure appears in all concentration problems."
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
    title: "Equations & Inequalities — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Multi-step reasoning combining equation construction, fractional equations and inequalities, compound inequalities, and simultaneous systems in unfamiliar contexts — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Problem‑Solving & Synthesis diagnostic for equations and inequalities. Each question asks you to construct your own path — combine ideas from different topics, reason through multi‑step problems, and decide which method to apply. Take your time, build each solution step by step, and use the feedback to deepen your understanding.</p>",
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

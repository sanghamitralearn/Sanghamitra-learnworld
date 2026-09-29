// seed/mathSeedCh4EquationsInequalitiesL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 4
// (Equations & Inequalities), Level 4 — converted from the
// standalone diagnostic JSON ch4-equations-inequalities-level-4.json.
//
// Run with: node seed/mathSeedCh4EquationsInequalitiesL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-4-equations-inequalities";
const CHAPTER_NAME = "Equations & Inequalities";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Solve \\(x + 7 = 3\\).",
    "options": [
      {
        "text": "\\(x = -4\\)",
        "correct": true,
        "feedback": "Correct. Subtract 7 from both sides: \\(x = 3 - 7 = -4\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You computed \\(7 - 3 = 4\\) instead of \\(3 - 7 = -4\\)."
      },
      {
        "text": "\\(x = 10\\)",
        "correct": false,
        "feedback": "You added 7 to 3 instead of subtracting."
      },
      {
        "text": "\\(x = -10\\)",
        "correct": false,
        "feedback": "You added 7 to 3 AND mis-signed."
      }
    ],
    "retryHint": "To undo \\(+7\\), subtract 7 from both sides.",
    "backward": "Inverse operations.",
    "forward": "Negative answers are common and expected."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "tier": "S",
    "question": "Which inequality is shown on a number line by a **closed** circle at 2 with an arrow pointing to the left?",
    "options": [
      {
        "text": "\\(x \\leq 2\\)",
        "correct": true,
        "feedback": "Correct. Closed circle means inclusive (\\(\\leq\\) or \\(\\geq\\)); arrow to the left means less than."
      },
      {
        "text": "\\(x \\geq 2\\)",
        "correct": false,
        "feedback": "The arrow points left, not right."
      },
      {
        "text": "\\(x < 2\\)",
        "correct": false,
        "feedback": "A closed circle means \\(\\leq\\), not \\(<\\)."
      },
      {
        "text": "\\(x > 2\\)",
        "correct": false,
        "feedback": "Both the circle type and the arrow direction are wrong."
      }
    ],
    "retryHint": "Closed = inclusive; left = smaller.",
    "backward": "Circle type and direction determine the inequality.",
    "forward": "Used in every solution set."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "tier": "S",
    "question": "Solve \\(4x = -12\\).",
    "options": [
      {
        "text": "\\(x = -3\\)",
        "correct": true,
        "feedback": "Correct. Divide by 4: \\(x = -12 \\div 4 = -3\\)."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You ignored the sign of \\(-12\\)."
      },
      {
        "text": "\\(x = -48\\)",
        "correct": false,
        "feedback": "You multiplied by 4 instead of dividing."
      },
      {
        "text": "\\(x = 48\\)",
        "correct": false,
        "feedback": "You multiplied AND ignored the sign."
      }
    ],
    "retryHint": "To undo \\(\\times 4\\), divide both sides by 4. Keep the negative sign.",
    "backward": "Inverse of multiplication.",
    "forward": "Always check the sign."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "S",
    "question": "Solve \\(2x < 10\\).",
    "options": [
      {
        "text": "\\(x < 5\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by 2: \\(x < 5\\)."
      },
      {
        "text": "\\(x > 5\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x < 20\\)",
        "correct": false,
        "feedback": "You multiplied by 2."
      },
      {
        "text": "\\(x > 20\\)",
        "correct": false,
        "feedback": "You multiplied AND flipped."
      }
    ],
    "retryHint": "Dividing by a positive number keeps the inequality direction unchanged.",
    "backward": "Same as an equation with a positive coefficient.",
    "forward": "Extends to inequalities with negative coefficients, where the sign flips."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "tier": "C",
    "question": "Solve \\(y = x + 4\\) and \\(2x + y = 16\\).",
    "options": [
      {
        "text": "\\(x = 4, y = 8\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + (x + 4) = 16\\) → \\(3x = 12\\) → \\(x = 4\\), \\(y = 8\\)."
      },
      {
        "text": "\\(x = 8, y = 4\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 4, y = 9\\)",
        "correct": false,
        "feedback": "You found \\(x = 4\\) correctly but then computed \\(y = x + 5 = 9\\) instead of \\(y = x + 4 = 8\\)."
      },
      {
        "text": "\\(x = 4, y = 4\\)",
        "correct": false,
        "feedback": "You found \\(x = 4\\) correctly but set \\(y = x\\) instead of \\(y = x + 4\\)."
      }
    ],
    "retryHint": "Substitute \\(y = x + 4\\) into the second equation.",
    "backward": "Substitution method.",
    "forward": "Extended to systems where neither equation is solved."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "tier": "C",
    "question": "Solve \\(3(x - 2) = 9\\).",
    "options": [
      {
        "text": "\\(x = 5\\)",
        "correct": true,
        "feedback": "Correct. Divide by 3: \\(x - 2 = 3\\). Add 2: \\(x = 5\\)."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You stopped at \\(x - 2 = 3\\) and forgot to add 2."
      },
      {
        "text": "\\(x = 6\\)",
        "correct": false,
        "feedback": "You solved \\(x - 2 = 3\\) but then added 3 instead of 2, giving \\(x = 6\\)."
      },
      {
        "text": "\\(x = 1\\)",
        "correct": false,
        "feedback": "You subtracted 2 from 3 instead of adding: \\(x = 1\\)."
      }
    ],
    "retryHint": "Divide both sides by 3 first, then add 2.",
    "backward": "Undoing a bracket.",
    "forward": "The standard two-step method."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "H",
    "question": "A number is tripled, then 4 is added. The result is the same as 7 more than the original number. Find the number.",
    "options": [
      {
        "text": "\\(1.5\\)",
        "correct": true,
        "feedback": "Correct. Let the number be \\(n\\). \\(3n + 4 = n + 7\\), so \\(2n = 3\\), \\(n = 1.5\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "You dropped the \\(n\\) on the right side: \\(3n + 4 = 10\\), \\(n = 2\\)."
      },
      {
        "text": "\\(5.5\\)",
        "correct": false,
        "feedback": "You added 4 to 7 instead of subtracting: \\(2n = 11\\), \\(n = 5.5\\)."
      },
      {
        "text": "\\(0.75\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "retryHint": "Set the two expressions equal, collect the \\(n\\) terms on one side and constants on the other.",
    "backward": "Constructing equations from a described relationship.",
    "forward": "This structure appears in any \"result is the same as\" problem."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "T",
    "question": "Solve \\(-2x > 8\\).",
    "options": [
      {
        "text": "\\(x < -4\\)",
        "correct": true,
        "feedback": "Correct. Divide by \\(-2\\) and flip: \\(x < -4\\)."
      },
      {
        "text": "\\(x > -4\\)",
        "correct": false,
        "feedback": "You forgot to flip the sign."
      },
      {
        "text": "\\(x < 4\\)",
        "correct": false,
        "feedback": "You flipped but mis-signed: dividing 8 by \\(-2\\) gives \\(-4\\), not 4."
      },
      {
        "text": "\\(x > 4\\)",
        "correct": false,
        "feedback": "You made both errors."
      }
    ],
    "retryHint": "Dividing by a negative number reverses the inequality direction.",
    "backward": "The flip rule when dividing by a negative.",
    "forward": "Essential for any inequality with a negative coefficient."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "tier": "S",
    "question": "“A number \\(n\\) is doubled, then 5 is added, giving 13.” Write this as an equation.",
    "options": [
      {
        "text": "\\(2n + 5 = 13\\)",
        "correct": true,
        "feedback": "Correct. “Doubled” gives \\(2n\\); “add 5” gives \\(2n + 5 = 13\\)."
      },
      {
        "text": "\\(5n + 2 = 13\\)",
        "correct": false,
        "feedback": "You swapped the coefficient and the constant."
      },
      {
        "text": "\\(2(n + 5) = 13\\)",
        "correct": false,
        "feedback": "You placed the \\(+5\\) inside the doubling."
      },
      {
        "text": "\\(2n - 5 = 13\\)",
        "correct": false,
        "feedback": "You translated “add” as subtract."
      }
    ],
    "backward": "Translating words to algebra.",
    "forward": "The starting point for solving every worded equation."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "tier": "S",
    "question": "Which inequality is shown on a number line by an **open** circle at \\(-1\\) with an arrow pointing to the right?",
    "options": [
      {
        "text": "\\(x > -1\\)",
        "correct": true,
        "feedback": "Correct. Open circle excludes \\(-1\\); arrow right means greater than."
      },
      {
        "text": "\\(x \\geq -1\\)",
        "correct": false,
        "feedback": "A closed circle would be needed for \\(\\geq\\)."
      },
      {
        "text": "\\(x < -1\\)",
        "correct": false,
        "feedback": "The arrow points right, not left."
      },
      {
        "text": "\\(x \\leq -1\\)",
        "correct": false,
        "feedback": "Both the circle type and the direction are wrong."
      }
    ],
    "backward": "Circle type and direction.",
    "forward": "Standard representation."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "tier": "C",
    "question": "Solve \\(5x - 7 = 2x + 8\\).",
    "options": [
      {
        "text": "\\(x = 5\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(2x\\): \\(3x - 7 = 8\\). Add 7: \\(3x = 15\\). \\(x = 5\\)."
      },
      {
        "text": "\\(x = 1\\)",
        "correct": false,
        "feedback": "You subtracted 7 from 8 instead of adding: \\(3x = 1\\)."
      },
      {
        "text": "\\(x = 15\\)",
        "correct": false,
        "feedback": "You stopped at \\(3x = 15\\) and forgot to divide."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You divided 15 by 5 instead of 3."
      }
    ],
    "backward": "Unknowns on both sides.",
    "forward": "Standard method."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "C",
    "question": "Solve \\(3(x - 1) \\leq 2(x + 2)\\).",
    "options": [
      {
        "text": "\\(x \\leq 7\\)",
        "correct": true,
        "feedback": "Correct. Expand: \\(3x - 3 \\leq 2x + 4\\). Subtract \\(2x\\): \\(x - 3 \\leq 4\\). \\(x \\leq 7\\)."
      },
      {
        "text": "\\(x \\geq 7\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\leq 1\\)",
        "correct": false,
        "feedback": "You moved the \\(-3\\) across without changing its sign: \\(x \\leq 4 - 3 = 1\\)."
      },
      {
        "text": "\\(x \\geq 1\\)",
        "correct": false,
        "feedback": "You moved the \\(-3\\) without changing its sign AND flipped the inequality: \\(x \\geq 4 - 3 = 1\\)."
      }
    ],
    "backward": "Expanding brackets in an inequality.",
    "forward": "Same method as for equations with brackets."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "tier": "C",
    "question": "Solve \\(y = 2x\\) and \\(3x + y = 15\\).",
    "options": [
      {
        "text": "\\(x = 3, y = 6\\)",
        "correct": true,
        "feedback": "Correct. \\(3x + 2x = 15\\), \\(5x = 15\\), \\(x = 3\\), \\(y = 6\\)."
      },
      {
        "text": "\\(x = 6, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 10\\)",
        "correct": false,
        "feedback": "You picked \\(x = 5\\) to satisfy \\(y = 2x\\) (\\(y = 10\\)), but \\(3(5) + 10 = 25 \\neq 15\\)."
      },
      {
        "text": "\\(x = 2, y = 4\\)",
        "correct": false,
        "feedback": "You picked \\(x = 2\\) to satisfy \\(y = 2x\\) (\\(y = 4\\)), but \\(3(2) + 4 = 10 \\neq 15\\)."
      }
    ],
    "backward": "Substitution method.",
    "forward": "Extended to systems where one equation is proportional."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "H",
    "question": "A rectangle's length is 3 cm more than twice its width. Its perimeter is 36 cm. Find the length.",
    "options": [
      {
        "text": "\\(13\\) cm",
        "correct": true,
        "feedback": "Correct. Length \\(= 2w + 3\\). Perimeter: \\(2(w + 2w + 3) = 36\\), \\(6w + 6 = 36\\), \\(w = 5\\), length \\(= 13\\)."
      },
      {
        "text": "\\(5\\) cm",
        "correct": false,
        "feedback": "This is the width, not the length."
      },
      {
        "text": "\\(19\\) cm",
        "correct": false,
        "feedback": "You solved \\(6w = 48\\) (subtracting 6 incorrectly): \\(w = 8\\), length \\(= 2(8) + 3 = 19\\)."
      },
      {
        "text": "\\(18\\) cm",
        "correct": false,
        "feedback": "You used \\(2(w + 3) = 36\\) instead of \\(2(2w + 3) = 36\\): \\(w = 15\\), length \\(= w + 3 = 18\\)."
      }
    ],
    "backward": "Constructing and solving a geometric equation.",
    "forward": "Multi‑step perimeter problems."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "C",
    "question": "“Three times a number minus 2 is 16.” Write and solve an equation.",
    "options": [
      {
        "text": "\\(n = 6\\)",
        "correct": true,
        "feedback": "Correct. \\(3n - 2 = 16\\), \\(3n = 18\\), \\(n = 6\\)."
      },
      {
        "text": "\\(n = 18\\)",
        "correct": false,
        "feedback": "You stopped at \\(3n = 18\\)."
      },
      {
        "text": "\\(n = 4\\)",
        "correct": false,
        "feedback": "You subtracted 4 from 16 instead of adding 2: \\(3n = 12\\), \\(n = 4\\)."
      },
      {
        "text": "\\(n = 2\\)",
        "correct": false,
        "feedback": "You divided the correct answer (6) by the coefficient 3 to get 2."
      }
    ],
    "backward": "Translating and solving.",
    "forward": "One step after construction."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "T",
    "question": "Solve \\(-2 < x + 3 \\leq 4\\), and list the integer values of \\(x\\).",
    "options": [
      {
        "text": "\\(\\{-4, -3, -2, -1, 0, 1\\}\\)",
        "correct": true,
        "feedback": "Correct. Subtract 3: \\(-5 < x \\leq 1\\). Integers: \\(-4, -3, -2, -1, 0, 1\\)."
      },
      {
        "text": "\\(\\{-5, -4, -3, -2, -1, 0, 1\\}\\)",
        "correct": false,
        "feedback": "You included \\(-5\\), but the lower bound is strict."
      },
      {
        "text": "\\(\\{-4, -3, -2, -1, 0\\}\\)",
        "correct": false,
        "feedback": "You excluded 1."
      },
      {
        "text": "\\(\\{-4, -3, -2, -1, 0, 1, 2\\}\\)",
        "correct": false,
        "feedback": "You included 2, which is above the upper bound."
      }
    ],
    "backward": "Solving compound inequalities.",
    "forward": "Listing integer solutions."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "tier": "T",
    "question": "Solve \\(4 - 3(x + 2) = 5x - 10\\).",
    "options": [
      {
        "text": "\\(x = 1\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(4 - 3x - 6 = -2 - 3x\\). RHS: \\(5x - 10\\). So \\(-2 - 3x = 5x - 10\\), \\(8 = 8x\\), \\(x = 1\\)."
      },
      {
        "text": "\\(x = -1\\)",
        "correct": false,
        "feedback": "You wrote \\(x = -1\\) instead of \\(x = 1\\) at the final division (dividing 8 by \\(-8\\) instead of by 8)."
      },
      {
        "text": "\\(x = 2.5\\)",
        "correct": false,
        "feedback": "You expanded \\(-3(x+2)\\) as \\(-3x + 6\\), giving \\(10 - 3x = 5x - 10\\), so \\(20 = 8x\\), \\(x = 2.5\\)."
      },
      {
        "text": "\\(x = 0.5\\)",
        "correct": false,
        "feedback": "You halved the correct answer."
      }
    ],
    "backward": "Expanding with a negative coefficient.",
    "forward": "The trap here is distributing \\(-3\\) correctly."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "S",
    "question": "Solve \\(x - 4 > -1\\).",
    "options": [
      {
        "text": "\\(x > 3\\)",
        "correct": true,
        "feedback": "Correct. Add 4 to both sides: \\(x > 3\\)."
      },
      {
        "text": "\\(x < 3\\)",
        "correct": false,
        "feedback": "You flipped unnecessarily."
      },
      {
        "text": "\\(x > -5\\)",
        "correct": false,
        "feedback": "You subtracted 4 from \\(-1\\): \\(x > -5\\)."
      },
      {
        "text": "\\(x > 5\\)",
        "correct": false,
        "feedback": "You treated \\(-1\\) as \\(+1\\): \\(x > 1 + 4 = 5\\)."
      }
    ],
    "backward": "Same as equation.",
    "forward": "Simple one-step inequality."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "tier": "H",
    "question": "Solve \\(3x - 2y = 11\\) and \\(2x + y = 5\\).",
    "options": [
      {
        "text": "\\(x = 3, y = -1\\)",
        "correct": true,
        "feedback": "Correct. From the second equation: \\(y = 5 - 2x\\). Substitute: \\(3x - 2(5 - 2x) = 11\\), \\(7x - 10 = 11\\), \\(7x = 21\\), \\(x = 3\\), \\(y = -1\\)."
      },
      {
        "text": "\\(x = -1, y = 3\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 4, y = -1\\)",
        "correct": false,
        "feedback": "You used \\(7x = 28\\), \\(x = 4\\)."
      },
      {
        "text": "\\(x = 3, y = 1\\)",
        "correct": false,
        "feedback": "You solved for \\(x\\) correctly but forgot the minus sign when computing \\(y = 5 - 2(3) = -1\\), writing \\(y = 1\\) instead."
      }
    ],
    "backward": "Rearranging then substituting.",
    "forward": "Common in systems with mixed coefficient signs."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "C",
    "question": "A plumber charges \\$40 call-out plus \\$25 per hour. A job costs \\$140. How many hours did it take?",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(40 + 25h = 140\\), \\(25h = 100\\), \\(h = 4\\)."
      },
      {
        "text": "\\(5.6\\)",
        "correct": false,
        "feedback": "You divided 140 by 25, ignoring the call-out fee: \\(140 \\div 25 = 5.6\\)."
      },
      {
        "text": "\\(7.2\\)",
        "correct": false,
        "feedback": "You added the fixed charge instead of subtracting: \\((140 + 40) \\div 25 = 7.2\\)."
      },
      {
        "text": "\\(3.5\\)",
        "correct": false,
        "feedback": "You divided 140 by 40, using only the fixed charge: \\(140 \\div 40 = 3.5\\)."
      }
    ],
    "backward": "Constructing an equation from context.",
    "forward": "Fixed-plus-variable problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "tier": "T",
    "question": "“A number \\(n\\) is multiplied by 5, and the result is the same as 12 more than the number.” Write this as an equation.",
    "options": [
      {
        "text": "\\(5n = n + 12\\)",
        "correct": true,
        "feedback": "Correct. Multiplying by 5 gives \\(5n\\); 12 more than the number is \\(n + 12\\)."
      },
      {
        "text": "\\(5n = 12n\\)",
        "correct": false,
        "feedback": "You placed 12 as a coefficient of \\(n\\)."
      },
      {
        "text": "\\(5n + n = 12\\)",
        "correct": false,
        "feedback": "You added \\(n\\) instead of comparing."
      },
      {
        "text": "\\(5n + 12 = n\\)",
        "correct": false,
        "feedback": "You placed the 12 on the wrong side."
      }
    ],
    "backward": "Translating phrases into algebra.",
    "forward": "“The same as” means equality between the two expressions."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "tier": "C",
    "question": "Solve \\(2x - 3 < 7\\), and describe the number line.",
    "options": [
      {
        "text": "Open circle at 5, arrow to the left",
        "correct": true,
        "feedback": "Correct. \\(2x < 10\\), \\(x < 5\\). Open circle at 5, arrow left."
      },
      {
        "text": "Closed circle at 5, arrow to the left",
        "correct": false,
        "feedback": "A strict inequality (\\(<\\)) gives an open circle, not closed."
      },
      {
        "text": "Open circle at 5, arrow to the right",
        "correct": false,
        "feedback": "The arrow should point left for \\(<\\)."
      },
      {
        "text": "Open circle at 2, arrow to the left",
        "correct": false,
        "feedback": "You divided 10 by 5 instead of 2."
      }
    ],
    "backward": "Solve then represent.",
    "forward": "Standard method for interval representation."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "tier": "S",
    "question": "Solve \\(2x + 8 = 0\\).",
    "options": [
      {
        "text": "\\(x = -4\\)",
        "correct": true,
        "feedback": "Correct. \\(2x = -8\\), \\(x = -4\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You dropped the negative sign."
      },
      {
        "text": "\\(x = -16\\)",
        "correct": false,
        "feedback": "You multiplied instead of dividing."
      },
      {
        "text": "\\(x = 8\\)",
        "correct": false,
        "feedback": "You copied the constant."
      }
    ],
    "backward": "Two-step equation with zero.",
    "forward": "Standard."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "C",
    "question": "Solve \\(\\frac{x}{3} - 1 > 2\\).",
    "options": [
      {
        "text": "\\(x > 9\\)",
        "correct": true,
        "feedback": "Correct. Add 1: \\(x/3 > 3\\). Multiply by 3: \\(x > 9\\)."
      },
      {
        "text": "\\(x > 3\\)",
        "correct": false,
        "feedback": "You subtracted 1 from the right side instead of adding: \\(x/3 > 1\\), \\(x > 3\\)."
      },
      {
        "text": "\\(x > 6\\)",
        "correct": false,
        "feedback": "You multiplied \\(2 + 1 = 3\\) by 2 instead of 3."
      },
      {
        "text": "\\(x < 9\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      }
    ],
    "backward": "Inverse operations with inequalities.",
    "forward": "Two-step inequality."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "tier": "T",
    "question": "Solve \\(y = 3x\\) and \\(2x + y = 10\\).",
    "options": [
      {
        "text": "\\(x = 2, y = 6\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + 3x = 10\\), \\(5x = 10\\), \\(x = 2\\), \\(y = 6\\)."
      },
      {
        "text": "\\(x = 6, y = 2\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 15\\)",
        "correct": false,
        "feedback": "You picked \\(x = 5\\) to satisfy \\(y = 3x\\) (\\(y = 15\\)), but \\(2(5) + 15 = 25 \\neq 10\\)."
      },
      {
        "text": "\\(x = 3, y = 9\\)",
        "correct": false,
        "feedback": "You picked \\(x = 3\\) to satisfy \\(y = 3x\\) (\\(y = 9\\)), but \\(2(3) + 9 = 15 \\neq 10\\)."
      }
    ],
    "backward": "Substitution with proportional relationship.",
    "forward": "Common system format."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "H",
    "question": "A shop sells 30 items: some at \\$4 each and some at \\$7 each. Total revenue is \\$180. How many items at \\$4 were sold?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. Let \\(a\\) be the \\$4 items, \\(b\\) the \\$7 items. \\(a + b = 30\\), \\(4a + 7b = 180\\). Substitute \\(b = 30 - a\\): \\(4a + 210 - 7a = 180\\), \\(-3a = -30\\), \\(a = 10\\)."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "This is the number of \\$7 items, not \\$4."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You assumed an equal split (15 each): \\(4(15) + 7(15) = 165 \\neq 180\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Check: \\(4(5) + 7(25) = 195 \\neq 180\\)."
      }
    ],
    "backward": "Constructing and solving a simultaneous system from context.",
    "forward": "Two-item pricing structure."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "tier": "C",
    "question": "“I think of a number, double it, subtract 5, and the result is 11.” Find the number.",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. \\(2n - 5 = 11\\), \\(2n = 16\\), \\(n = 8\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You subtracted 5 from 11 instead of adding: \\(2n = 6\\), \\(n = 3\\)."
      },
      {
        "text": "\\(16\\)",
        "correct": false,
        "feedback": "You stopped at \\(2n = 16\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You divided 16 by 4 instead of 2."
      }
    ],
    "backward": "Constructing and solving.",
    "forward": "Standard word-problem structure."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "tier": "H",
    "question": "How many integers \\(x\\) satisfy \\(-5 \\leq 2x - 1 < 5\\)?",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Add 1: \\(-4 \\leq 2x < 6\\). Divide by 2: \\(-2 \\leq x < 3\\). Integers: \\(-2, -1, 0, 1, 2\\), giving 5."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You included 3, which is excluded by the strict upper bound."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You excluded \\(-2\\), the inclusive lower bound."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "You treated \\(-3\\) as the lower bound AND included 3 as the upper bound."
      }
    ],
    "backward": "Solving compound inequalities and counting.",
    "forward": "Discrete-problem structure."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“A number \\(n\\) is tripled, then 7 is subtracted, giving 8.” Write this as an equation.",
    "options": [
      {
        "text": "\\(3n - 7 = 8\\)",
        "correct": true,
        "feedback": "Correct. “Tripled” gives \\(3n\\); “subtract 7” gives \\(3n - 7 = 8\\)."
      },
      {
        "text": "\\(3(n - 7) = 8\\)",
        "correct": false,
        "feedback": "You placed the \\(-7\\) inside the tripling."
      },
      {
        "text": "\\(3n + 7 = 8\\)",
        "correct": false,
        "feedback": "You translated “subtract” as addition."
      },
      {
        "text": "\\(7 - 3n = 8\\)",
        "correct": false,
        "feedback": "You reversed the expression."
      }
    ],
    "backward": "Translating words.",
    "forward": "Common structure."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(7x + 3 = 4x + 15\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Subtract \\(4x\\): \\(3x + 3 = 15\\). Subtract 3: \\(3x = 12\\). \\(x = 4\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You added 3 to 15 instead of subtracting: \\(3x = 18\\), \\(x = 6\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You subtracted 6 instead of 3: \\(3x = 9\\), \\(x = 3\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "You stopped at \\(3x = 12\\) without dividing by 3."
      }
    ],
    "backward": "Unknowns on both sides.",
    "forward": "Standard method."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(2x + y = 9\\) and \\(y = x + 3\\).",
    "options": [
      {
        "text": "\\(x = 2, y = 5\\)",
        "correct": true,
        "feedback": "Correct. \\(2x + (x + 3) = 9\\), \\(3x = 6\\), \\(x = 2\\), \\(y = 5\\)."
      },
      {
        "text": "\\(x = 5, y = 2\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 4, y = 7\\)",
        "correct": false,
        "feedback": "You subtracted 3 instead of adding: \\(3x = 12\\), \\(x = 4\\), \\(y = 7\\)."
      },
      {
        "text": "\\(x = 1, y = 4\\)",
        "correct": false,
        "feedback": "You used only \\(y = x + 3\\) with \\(x = 1\\) and did not check the first equation: \\(2(1) + 4 = 6 \\neq 9\\)."
      }
    ],
    "backward": "Substitution.",
    "forward": "Common format."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(-1 \\leq 4 - 2x < 5\\), and list the integer values of \\(x\\).",
    "options": [
      {
        "text": "\\(\\{0, 1, 2\\}\\)",
        "correct": true,
        "feedback": "Correct. Subtract 4: \\(-5 \\leq -2x < 1\\). Divide by \\(-2\\), flip: \\(2.5 \\geq x > -0.5\\), i.e., \\(-0.5 < x \\leq 2.5\\). Integers: \\(0, 1, 2\\)."
      },
      {
        "text": "\\(\\{-1, 0, 1, 2\\}\\)",
        "correct": false,
        "feedback": "You included \\(-1\\), which is below the lower bound."
      },
      {
        "text": "\\(\\{0, 1, 2, 3\\}\\)",
        "correct": false,
        "feedback": "You included 3, which is above the upper bound."
      },
      {
        "text": "\\(\\{1, 2\\}\\)",
        "correct": false,
        "feedback": "You excluded 0, which is within the range."
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
    "question": "Solve \\(3 - 2x \\geq 7\\).",
    "options": [
      {
        "text": "\\(x \\leq -2\\)",
        "correct": true,
        "feedback": "Correct. Subtract 3: \\(-2x \\geq 4\\). Divide by \\(-2\\), flip: \\(x \\leq -2\\)."
      },
      {
        "text": "\\(x \\geq -2\\)",
        "correct": false,
        "feedback": "You forgot to flip."
      },
      {
        "text": "\\(x \\leq 2\\)",
        "correct": false,
        "feedback": "You flipped but mis-signed."
      },
      {
        "text": "\\(x \\geq 2\\)",
        "correct": false,
        "feedback": "Both errors."
      }
    ],
    "backward": "Flip rule.",
    "forward": "Standard technique."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A taxi charges \\$5 plus \\$1.50 per km. A journey costs \\$17. How far was the journey?",
    "options": [
      {
        "text": "\\(8\\) km",
        "correct": true,
        "feedback": "Correct. \\(5 + 1.5d = 17\\), \\(1.5d = 12\\), \\(d = 8\\)."
      },
      {
        "text": "\\(11.3\\) km",
        "correct": false,
        "feedback": "You divided 17 by 1.5, ignoring the fixed charge: \\(17 \\div 1.5 \\approx 11.3\\)."
      },
      {
        "text": "\\(6\\) km",
        "correct": false,
        "feedback": "You divided 12 by 2 instead of 1.5: \\(12 \\div 2 = 6\\)."
      },
      {
        "text": "\\(14.7\\) km",
        "correct": false,
        "feedback": "You added the fixed charge instead of subtracting: \\((17 + 5) \\div 1.5 \\approx 14.7\\)."
      }
    ],
    "backward": "Constructing and solving.",
    "forward": "Fixed-plus-variable problems."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "“Five less than three times a number is 13.” Find the number.",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(3n - 5 = 13\\), \\(3n = 18\\), \\(n = 6\\)."
      },
      {
        "text": "\\(18\\)",
        "correct": false,
        "feedback": "You stopped at \\(3n = 18\\) without dividing by 3."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You solved \\(3n = 9\\) (subtracted 4 from 13 instead of adding 5)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You found \\(n = 13 - 5 = 8\\), forgetting to divide by 3."
      }
    ],
    "backward": "Translating and solving.",
    "forward": "“Less than” reverses the order."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(6 - 2(x + 1) = 3x - 4\\).",
    "options": [
      {
        "text": "\\(x = 1.6\\)",
        "correct": true,
        "feedback": "Correct. LHS: \\(6 - 2x - 2 = 4 - 2x\\). RHS: \\(3x - 4\\). So \\(4 - 2x = 3x - 4\\), \\(8 = 5x\\), \\(x = 1.6\\)."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You solved \\(10 = 5x\\) instead of \\(8 = 5x\\) (adding 4 to both sides twice)."
      },
      {
        "text": "\\(x = -1.6\\)",
        "correct": false,
        "feedback": "You wrote \\(x = -1.6\\) instead of \\(x = 1.6\\) at the final division."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You solved \\(15 = 5x\\) instead of \\(8 = 5x\\)."
      }
    ],
    "backward": "Expanding with a negative coefficient.",
    "forward": "Routine in any two-side equation."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve \\(3x + 4y = 18\\) and \\(y = 3\\).",
    "options": [
      {
        "text": "\\(x = 2, y = 3\\)",
        "correct": true,
        "feedback": "Correct. \\(3x + 12 = 18\\), \\(3x = 6\\), \\(x = 2\\)."
      },
      {
        "text": "\\(x = 3, y = 2\\)",
        "correct": false,
        "feedback": "You swapped \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 6, y = 3\\)",
        "correct": false,
        "feedback": "You solved \\(3x = 18\\) without substituting \\(y\\)."
      },
      {
        "text": "\\(x = 0, y = 4.5\\)",
        "correct": false,
        "feedback": "Check: \\(3(0) + 4(4.5) = 18\\) ✓ but \\(y \\neq 3\\) — you changed the given value."
      }
    ],
    "backward": "Substitution of a known value.",
    "forward": "First step of solving any system by substitution."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A group of 20 people pays \\$400. Children pay \\$15, adults pay \\$25. How many children are there?",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(15c + 25a = 400\\), \\(c + a = 20\\). Substitute: \\(15c + 25(20 - c) = 400\\), \\(-10c + 500 = 400\\), \\(c = 10\\)."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "This is the number of adults, not children."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Check: \\(15(5) + 25(15) = 450 \\neq 400\\)."
      },
      {
        "text": "\\(12\\)",
        "correct": false,
        "feedback": "Check: \\(15(12) + 25(8) = 380 \\neq 400\\)."
      }
    ],
    "backward": "Simultaneous system from context.",
    "forward": "Two-tier pricing."
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
    title: "Equations & Inequalities — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every equations/inequalities cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve completed the warm‑up. The next 20 questions are the <strong>Speed &amp; Strategy diagnostic</strong>. You have <strong>25 minutes</strong> in total — a timer starts when you enter. You can <strong>skip</strong> any question and come back later. Items are tiered: <strong>S</strong> (Speed) — answer fast, <strong>C</strong> (Core) — multi‑step, <strong>H</strong> (Challenge) — deeper synthesis, <strong>T</strong> (Trap) — read carefully. Move fast on easy items, slow down on traps, and don’t get stuck.</p>",
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

// seed/mathSeedCh4EquationsInequalitiesL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 4
// (Equations & Inequalities), Level 1 — converted from the
// standalone diagnostic JSON ch4-equations-inequalities-level-1.json.
//
// Run with: node seed/mathSeedCh4EquationsInequalitiesL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-4-equations-inequalities";
const CHAPTER_NAME = "Equations & Inequalities";
const LEVEL = 1;

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
    "question": "Solve \\(x + 5 = 12\\).",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Subtract 5 from both sides: \\(x = 12 - 5 = 7\\)."
      },
      {
        "text": "\\(17\\)",
        "correct": false,
        "feedback": "You added 5 to both sides instead of subtracting."
      },
      {
        "text": "\\(-7\\)",
        "correct": false,
        "feedback": "You subtracted in the wrong order (\\(5 - 12\\)) and applied a negative sign."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You copied the number being added instead of solving."
      }
    ],
    "retryHint": "To undo \\(+5\\), subtract 5 from both sides.",
    "backward": "Inverse operations undo addition.",
    "forward": "This is the foundation for solving every linear equation."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(3x = 18\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by 3: \\(x = 18 \\div 3 = 6\\)."
      },
      {
        "text": "\\(54\\)",
        "correct": false,
        "feedback": "You multiplied 18 by 3 instead of dividing."
      },
      {
        "text": "\\(15\\)",
        "correct": false,
        "feedback": "You subtracted 3 from 18."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You copied the coefficient instead of solving."
      }
    ],
    "retryHint": "To undo \\(\\times 3\\), divide both sides by 3.",
    "backward": "Inverse of multiplication is division.",
    "forward": "Used whenever a variable is multiplied by a coefficient."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(x - 4 = 9\\).",
    "options": [
      {
        "text": "\\(13\\)",
        "correct": true,
        "feedback": "Correct. Add 4 to both sides: \\(x = 9 + 4 = 13\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "You subtracted 4 from 9 instead of adding."
      },
      {
        "text": "\\(-13\\)",
        "correct": false,
        "feedback": "You added 9 and 4 correctly but gave the result a negative sign. Adding 4 to both sides gives \\(+13\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "You multiplied 9 by 4."
      }
    ],
    "retryHint": "To undo \\(-4\\), add 4 to both sides.",
    "backward": "Inverse operations undo subtraction.",
    "forward": "Same rule applies regardless of how large the numbers are."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{x}{2} = 6\\).",
    "options": [
      {
        "text": "\\(12\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by 2: \\(x = 12\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You divided 6 by 2 instead of multiplying."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "You added 2 to 6."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "You subtracted 2 from 6."
      }
    ],
    "retryHint": "To undo \\(\\div 2\\), multiply both sides by 2.",
    "backward": "Inverse of division is multiplication.",
    "forward": "Used when the variable is divided by a number."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“A number \\(n\\) plus 6 equals 14.” Write this as an equation.",
    "options": [
      {
        "text": "\\(n + 6 = 14\\)",
        "correct": true,
        "feedback": "Correct. “Plus 6” means add 6 to \\(n\\), giving \\(n + 6 = 14\\)."
      },
      {
        "text": "\\(n - 6 = 14\\)",
        "correct": false,
        "feedback": "You translated “plus” as subtraction."
      },
      {
        "text": "\\(6n = 14\\)",
        "correct": false,
        "feedback": "You translated “plus” as multiplication."
      },
      {
        "text": "\\(\\frac{n}{6} = 14\\)",
        "correct": false,
        "feedback": "You translated “plus” as division."
      }
    ],
    "retryHint": "Match each word to an operation: “plus” = addition.",
    "backward": "Translating words into algebra.",
    "forward": "The first step of every word problem is constructing the correct equation."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by an **open** circle at 4 with an arrow pointing to the right?",
    "options": [
      {
        "text": "\\(x > 4\\)",
        "correct": true,
        "feedback": "Correct. An open circle excludes the value, and the arrow to the right means greater than: \\(x > 4\\)."
      },
      {
        "text": "\\(x \\geq 4\\)",
        "correct": false,
        "feedback": "A closed circle would mean \\(x \\geq 4\\); an open circle excludes 4."
      },
      {
        "text": "\\(x < 4\\)",
        "correct": false,
        "feedback": "The arrow points right, not left."
      },
      {
        "text": "\\(x \\leq 4\\)",
        "correct": false,
        "feedback": "Both the circle type and the direction are wrong."
      }
    ],
    "retryHint": "Open circle = not included; arrow to the right = greater than.",
    "backward": "Open vs closed circle indicates strict vs inclusive.",
    "forward": "Every inequality can be represented on a number line this way."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(x + 3 > 7\\).",
    "options": [
      {
        "text": "\\(x > 4\\)",
        "correct": true,
        "feedback": "Correct. Subtract 3 from both sides: \\(x > 4\\)."
      },
      {
        "text": "\\(x < 4\\)",
        "correct": false,
        "feedback": "You flipped the inequality sign unnecessarily — no negative was involved."
      },
      {
        "text": "\\(x > 10\\)",
        "correct": false,
        "feedback": "You added 3 to both sides instead of subtracting."
      },
      {
        "text": "\\(x < 10\\)",
        "correct": false,
        "feedback": "You both added and flipped the sign."
      }
    ],
    "retryHint": "Treat the inequality sign like an equals sign — subtract 3 from both sides.",
    "backward": "Same inverse operations as equations.",
    "forward": "Solving inequalities follows the same steps as equations, with one extra rule for negatives."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(x + y = 10\\) and \\(x - y = 2\\).",
    "options": [
      {
        "text": "\\(x = 6, y = 4\\)",
        "correct": true,
        "feedback": "Correct. Add the equations: \\(2x = 12\\), so \\(x = 6\\). Substitute back: \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 6\\)",
        "correct": false,
        "feedback": "You swapped the values of \\(x\\) and \\(y\\)."
      },
      {
        "text": "\\(x = 5, y = 5\\)",
        "correct": false,
        "feedback": "These satisfy the sum but not the difference (\\(5 - 5 = 0\\), not 2)."
      },
      {
        "text": "\\(x = 8, y = 2\\)",
        "correct": false,
        "feedback": "These satisfy the sum (\\(8 + 2 = 10\\)) but the difference is \\(8 - 2 = 6\\), not 2."
      }
    ],
    "retryHint": "Add the two equations to eliminate \\(y\\), then solve for \\(x\\) and substitute.",
    "backward": "Adding equations eliminates one variable.",
    "forward": "This is the elimination method, extended later to harder systems."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“I think of a number, multiply it by 4, and the result is 20.” Write this as an equation.",
    "options": [
      {
        "text": "\\(4n = 20\\)",
        "correct": true,
        "feedback": "Correct. “Multiply by 4” gives \\(4n\\), and “the result is 20” gives \\(4n = 20\\)."
      },
      {
        "text": "\\(n + 4 = 20\\)",
        "correct": false,
        "feedback": "You translated “multiply” as addition."
      },
      {
        "text": "\\(\\frac{n}{4} = 20\\)",
        "correct": false,
        "feedback": "You translated “multiply” as division."
      },
      {
        "text": "\\(n - 4 = 20\\)",
        "correct": false,
        "feedback": "You translated “multiply” as subtraction."
      }
    ],
    "backward": "Translating operations.",
    "forward": "Constructing equations is the first step in solving any word problem."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by a **closed** circle at \\(-2\\) with an arrow pointing to the left?",
    "options": [
      {
        "text": "\\(x \\leq -2\\)",
        "correct": true,
        "feedback": "Correct. A closed circle includes the value, and the arrow to the left means less than or equal: \\(x \\leq -2\\)."
      },
      {
        "text": "\\(x \\geq -2\\)",
        "correct": false,
        "feedback": "The arrow points left, not right."
      },
      {
        "text": "\\(x < -2\\)",
        "correct": false,
        "feedback": "A closed circle includes \\(-2\\); an open circle would give \\(x < -2\\)."
      },
      {
        "text": "\\(x > -2\\)",
        "correct": false,
        "feedback": "Both the circle type and the arrow direction are wrong."
      }
    ],
    "backward": "Closed = inclusive; left = smaller.",
    "forward": "The same notation covers all four inequality forms."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(5x - 3 = 17\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. Add 3 to both sides: \\(5x = 20\\). Divide by 5: \\(x = 4\\)."
      },
      {
        "text": "\\(2.8\\)",
        "correct": false,
        "feedback": "You divided \\(14\\) by 5 after subtracting instead of adding."
      },
      {
        "text": "\\(20\\)",
        "correct": false,
        "feedback": "You stopped at \\(5x = 20\\) and forgot to divide."
      },
      {
        "text": "\\(3.4\\)",
        "correct": false,
        "feedback": "You divided 17 by 5, ignoring the \\(-3\\)."
      }
    ],
    "backward": "Two inverse operations in sequence.",
    "forward": "The same structure appears in all two-step equations."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(2x + 1 > 9\\).",
    "options": [
      {
        "text": "\\(x > 4\\)",
        "correct": true,
        "feedback": "Correct. Subtract 1: \\(2x > 8\\). Divide by 2: \\(x > 4\\)."
      },
      {
        "text": "\\(x < 4\\)",
        "correct": false,
        "feedback": "You flipped the inequality sign unnecessarily."
      },
      {
        "text": "\\(x > 5\\)",
        "correct": false,
        "feedback": "You added 1 to both sides instead of subtracting, giving \\(2x > 10\\), so \\(x > 5\\)."
      },
      {
        "text": "\\(x > 8\\)",
        "correct": false,
        "feedback": "You divided by 1 instead of 2."
      }
    ],
    "backward": "Same two-step process as equations.",
    "forward": "Extends to three-step inequalities and negatives."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(x + y = 12\\) and \\(x - y = 4\\).",
    "options": [
      {
        "text": "\\(x = 8, y = 4\\)",
        "correct": true,
        "feedback": "Correct. Adding gives \\(2x = 16\\), so \\(x = 8\\); substituting gives \\(y = 4\\)."
      },
      {
        "text": "\\(x = 4, y = 8\\)",
        "correct": false,
        "feedback": "You swapped the values."
      },
      {
        "text": "\\(x = 6, y = 6\\)",
        "correct": false,
        "feedback": "These satisfy the sum but not the difference."
      },
      {
        "text": "\\(x = 10, y = 2\\)",
        "correct": false,
        "feedback": "Difference is 8, not 4."
      }
    ],
    "backward": "Eliminating one variable by addition.",
    "forward": "Extended to systems with unequal coefficients."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A pen costs \\(\\$p\\) and a ruler costs \\(\\$r\\). Three pens and two rulers cost \\(\\$17\\). Write this as an equation.",
    "options": [
      {
        "text": "\\(3p + 2r = 17\\)",
        "correct": true,
        "feedback": "Correct. 3 pens cost \\(3p\\), 2 rulers cost \\(2r\\), total \\(3p + 2r = 17\\)."
      },
      {
        "text": "\\(2p + 3r = 17\\)",
        "correct": false,
        "feedback": "You swapped the coefficients."
      },
      {
        "text": "\\(5pr = 17\\)",
        "correct": false,
        "feedback": "You multiplied the prices rather than adding separate quantities."
      },
      {
        "text": "\\(3p - 2r = 17\\)",
        "correct": false,
        "feedback": "You subtracted instead of adding."
      }
    ],
    "backward": "Combining linear terms in a real context.",
    "forward": "The starting point for simultaneous equations in context."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“Five less than a number is 12.” Write this as an equation.",
    "options": [
      {
        "text": "\\(n - 5 = 12\\)",
        "correct": true,
        "feedback": "Correct. “Five less than \\(n\\)” means \\(n - 5\\), giving \\(n - 5 = 12\\)."
      },
      {
        "text": "\\(5 - n = 12\\)",
        "correct": false,
        "feedback": "You reversed the order of subtraction."
      },
      {
        "text": "\\(5n = 12\\)",
        "correct": false,
        "feedback": "You translated “less” as multiplication."
      },
      {
        "text": "\\(n + 5 = 12\\)",
        "correct": false,
        "feedback": "You translated “less” as addition."
      }
    ],
    "backward": "Order matters in subtraction.",
    "forward": "Common source of error in word problems."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by an **open** circle at 5 with an arrow pointing to the left?",
    "options": [
      {
        "text": "\\(x < 5\\)",
        "correct": true,
        "feedback": "Correct. Open circle excludes 5; arrow to the left means less than: \\(x < 5\\)."
      },
      {
        "text": "\\(x > 5\\)",
        "correct": false,
        "feedback": "The arrow points left, not right."
      },
      {
        "text": "\\(x \\leq 5\\)",
        "correct": false,
        "feedback": "Open circle means \\(<\\), not \\(\\leq\\)."
      },
      {
        "text": "\\(x \\geq 5\\)",
        "correct": false,
        "feedback": "Both the circle type and the direction are wrong."
      }
    ],
    "backward": "Open = strict; left = smaller.",
    "forward": "Used when representing solution sets of inequalities."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(2(x + 3) = 14\\).",
    "options": [
      {
        "text": "\\(x = 4\\)",
        "correct": true,
        "feedback": "Correct. Divide by 2: \\(x + 3 = 7\\). Subtract 3: \\(x = 4\\)."
      },
      {
        "text": "\\(x = 7\\)",
        "correct": false,
        "feedback": "You stopped at \\(x + 3 = 7\\) and forgot to subtract 3."
      },
      {
        "text": "\\(x = 10\\)",
        "correct": false,
        "feedback": "You expanded to \\(2x + 6 = 14\\) but then added 6 instead of subtracting, giving \\(2x = 20\\), so \\(x = 10\\)."
      },
      {
        "text": "\\(x = 5\\)",
        "correct": false,
        "feedback": "You solved \\(x + 3 = 7\\) but subtracted 2 instead of 3, giving \\(x = 5\\)."
      }
    ],
    "backward": "Undoing a bracket.",
    "forward": "The same structure underlies all linear equations with brackets."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(\\frac{x}{3} \\geq 2\\).",
    "options": [
      {
        "text": "\\(x \\geq 6\\)",
        "correct": true,
        "feedback": "Correct. Multiply both sides by 3: \\(x \\geq 6\\)."
      },
      {
        "text": "\\(x \\leq 6\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily — 3 is positive."
      },
      {
        "text": "\\(x \\geq 18\\)",
        "correct": false,
        "feedback": "You multiplied by 9 instead of 3."
      },
      {
        "text": "\\(x \\geq 2\\)",
        "correct": false,
        "feedback": "You kept 2 unchanged instead of multiplying."
      }
    ],
    "backward": "Inverse of division.",
    "forward": "Multiplying an inequality by a positive number keeps the direction."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Given \\(y = x + 2\\) and \\(y = 5\\), find \\(x\\).",
    "options": [
      {
        "text": "\\(x = 3\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(y = 5\\): \\(5 = x + 2\\), so \\(x = 3\\)."
      },
      {
        "text": "\\(x = 7\\)",
        "correct": false,
        "feedback": "You added 2 to 5 instead of subtracting."
      },
      {
        "text": "\\(x = 5\\)",
        "correct": false,
        "feedback": "You used the value of \\(y\\) directly."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You copied the constant instead of solving."
      }
    ],
    "backward": "Substitution into an equation.",
    "forward": "Extends to full simultaneous systems."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A taxi charges \\(\\$3\\) plus \\(\\$2\\) per kilometre. The total fare is \\(\\$13\\). Write an equation for the number of kilometres \\(m\\).",
    "options": [
      {
        "text": "\\(3 + 2m = 13\\)",
        "correct": true,
        "feedback": "Correct. Fixed charge \\(3\\) plus \\(2m\\) equals the total \\(13\\)."
      },
      {
        "text": "\\(2 + 3m = 13\\)",
        "correct": false,
        "feedback": "You swapped the fixed and variable charges."
      },
      {
        "text": "\\(5m = 13\\)",
        "correct": false,
        "feedback": "You combined \\(3\\) and \\(2\\) as though both were per-km."
      },
      {
        "text": "\\(3m - 2 = 13\\)",
        "correct": false,
        "feedback": "You subtracted the fixed charge and used the wrong coefficient."
      }
    ],
    "backward": "Constructing a linear equation from a scenario.",
    "forward": "The starting point for solving real-world cost problems."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A rectangle has length 7 and width \\(w\\). Its perimeter is 24. Write this as an equation.",
    "options": [
      {
        "text": "\\(2(7 + w) = 24\\)",
        "correct": true,
        "feedback": "Correct. Perimeter \\(= 2(l + w)\\), so \\(2(7 + w) = 24\\)."
      },
      {
        "text": "\\(7 + w = 24\\)",
        "correct": false,
        "feedback": "You forgot to double the perimeter formula."
      },
      {
        "text": "\\(14 + w = 24\\)",
        "correct": false,
        "feedback": "You doubled only the length."
      },
      {
        "text": "\\(2(7w) = 24\\)",
        "correct": false,
        "feedback": "You multiplied the dimensions instead of adding."
      }
    ],
    "backward": "Using the perimeter formula.",
    "forward": "The same formula underlies length-and-perimeter problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by a **closed** circle at 0 with an arrow pointing to the right?",
    "options": [
      {
        "text": "\\(x \\geq 0\\)",
        "correct": true,
        "feedback": "Correct. Closed circle includes 0, arrow to the right means greater than or equal to: \\(x \\geq 0\\)."
      },
      {
        "text": "\\(x > 0\\)",
        "correct": false,
        "feedback": "A closed circle means \\(\\geq\\), not \\(>\\)."
      },
      {
        "text": "\\(x \\leq 0\\)",
        "correct": false,
        "feedback": "The arrow points right, not left."
      },
      {
        "text": "\\(x < 0\\)",
        "correct": false,
        "feedback": "Both the circle and the direction are wrong."
      }
    ],
    "backward": "Inclusive boundary and direction.",
    "forward": "The same rule applies to all inclusive inequalities."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(4x + 7 = 31\\).",
    "options": [
      {
        "text": "\\(x = 6\\)",
        "correct": true,
        "feedback": "Correct. Subtract 7: \\(4x = 24\\). Divide by 4: \\(x = 6\\)."
      },
      {
        "text": "\\(x = 24\\)",
        "correct": false,
        "feedback": "You stopped at \\(4x = 24\\) and forgot to divide by 4."
      },
      {
        "text": "\\(x = 9.5\\)",
        "correct": false,
        "feedback": "You added 7 instead of subtracting, giving \\(4x = 38\\), so \\(x = 9.5\\)."
      },
      {
        "text": "\\(x = 5\\)",
        "correct": false,
        "feedback": "You subtracted 11 (the coefficient 4 plus the constant 7) instead of just 7, giving \\(4x = 20\\), so \\(x = 5\\)."
      }
    ],
    "backward": "Two inverse operations.",
    "forward": "Routine in all two-step equation solving."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(3x - 2 \\leq 13\\).",
    "options": [
      {
        "text": "\\(x \\leq 5\\)",
        "correct": true,
        "feedback": "Correct. Add 2: \\(3x \\leq 15\\). Divide by 3: \\(x \\leq 5\\)."
      },
      {
        "text": "\\(x \\geq 5\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\leq 15\\)",
        "correct": false,
        "feedback": "You stopped at \\(3x \\leq 15\\) and forgot to divide by 3."
      },
      {
        "text": "\\(x \\leq 3\\)",
        "correct": false,
        "feedback": "You subtracted 4 instead of 2, giving \\(3x \\leq 9\\), so \\(x \\leq 3\\)."
      }
    ],
    "backward": "Same steps as an equation.",
    "forward": "Prepares for compound inequalities."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(x + y = 20\\) and \\(x - y = 6\\).",
    "options": [
      {
        "text": "\\(x = 13, y = 7\\)",
        "correct": true,
        "feedback": "Correct. Adding: \\(2x = 26\\), so \\(x = 13\\); substituting gives \\(y = 7\\)."
      },
      {
        "text": "\\(x = 7, y = 13\\)",
        "correct": false,
        "feedback": "You swapped the values."
      },
      {
        "text": "\\(x = 10, y = 10\\)",
        "correct": false,
        "feedback": "This satisfies the sum but not the difference."
      },
      {
        "text": "\\(x = 12, y = 8\\)",
        "correct": false,
        "feedback": "Difference is 4, not 6."
      }
    ],
    "backward": "Eliminating by adding.",
    "forward": "The base case of elimination."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "Two numbers add to 15. The larger number is twice the smaller. Find the smaller number.",
    "options": [
      {
        "text": "\\(5\\)",
        "correct": true,
        "feedback": "Correct. Let the smaller be \\(s\\); then \\(s + 2s = 15\\), so \\(3s = 15\\) and \\(s = 5\\)."
      },
      {
        "text": "\\(10\\)",
        "correct": false,
        "feedback": "This is the larger number, not the smaller."
      },
      {
        "text": "\\(7.5\\)",
        "correct": false,
        "feedback": "You halved 15 without using the ratio."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "You divided 15 by 5 instead of 3."
      }
    ],
    "backward": "Constructing equations from relationships.",
    "forward": "The same method solves age and share problems."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“Three times a number minus 4 equals 11.” Write this as an equation.",
    "options": [
      {
        "text": "\\(3n - 4 = 11\\)",
        "correct": true,
        "feedback": "Correct. “Three times a number” is \\(3n\\), “minus 4” gives \\(3n - 4\\), “equals 11” gives \\(3n - 4 = 11\\)."
      },
      {
        "text": "\\(4 - 3n = 11\\)",
        "correct": false,
        "feedback": "You reversed the order of the subtraction."
      },
      {
        "text": "\\(3n + 4 = 11\\)",
        "correct": false,
        "feedback": "You translated “minus” as plus."
      },
      {
        "text": "\\(3(n - 4) = 11\\)",
        "correct": false,
        "feedback": "You placed the “minus 4” inside the bracket."
      }
    ],
    "backward": "Order of operations in translation.",
    "forward": "The building block of multi-step word problems."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which of these describes the number-line representation of \\(x > -3\\)?",
    "options": [
      {
        "text": "Open circle at \\(-3\\), arrow to the right",
        "correct": true,
        "feedback": "Correct. \\(>\\) means open circle; \\(x > -3\\) means all values larger than \\(-3\\), so the arrow points right."
      },
      {
        "text": "Closed circle at \\(-3\\), arrow to the right",
        "correct": false,
        "feedback": "A closed circle would be used for \\(\\geq\\)."
      },
      {
        "text": "Open circle at \\(-3\\), arrow to the left",
        "correct": false,
        "feedback": "The arrow should point right for \\(>\\)."
      },
      {
        "text": "Closed circle at 3, arrow to the right",
        "correct": false,
        "feedback": "The sign of \\(-3\\) has been lost, and the circle type is wrong."
      }
    ],
    "backward": "Reading inequalities from a number line.",
    "forward": "Used to represent solution sets of all inequalities."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(\\frac{x}{4} + 1 = 3\\).",
    "options": [
      {
        "text": "\\(x = 8\\)",
        "correct": true,
        "feedback": "Correct. Subtract 1: \\(\\frac{x}{4} = 2\\). Multiply by 4: \\(x = 8\\)."
      },
      {
        "text": "\\(x = 2\\)",
        "correct": false,
        "feedback": "You stopped at \\(\\frac{x}{4} = 2\\) and forgot to multiply by 4."
      },
      {
        "text": "\\(x = 12\\)",
        "correct": false,
        "feedback": "You multiplied 3 by 4 without subtracting 1 first."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You solved \\(\\frac{x}{4} = 2\\) but multiplied by 2 instead of 4 (or divided 8 by 2)."
      }
    ],
    "backward": "Two inverse operations, one division and one addition.",
    "forward": "Same structure as any two-step equation."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(5 - x > 2\\).",
    "options": [
      {
        "text": "\\(x < 3\\)",
        "correct": true,
        "feedback": "Correct. Subtract 5: \\(-x > -3\\). Multiply by \\(-1\\) and **reverse** the sign: \\(x < 3\\)."
      },
      {
        "text": "\\(x > 3\\)",
        "correct": false,
        "feedback": "You forgot to reverse the sign when multiplying by \\(-1\\)."
      },
      {
        "text": "\\(x < 7\\)",
        "correct": false,
        "feedback": "You added 5 and 2 instead of subtracting: \\(x < 5 + 2 = 7\\). The correct step is \\(5 - x > 2 \\Rightarrow -x > -3 \\Rightarrow x < 3\\)."
      },
      {
        "text": "\\(x > 7\\)",
        "correct": false,
        "feedback": "You added 5 and 2 to get 7, and then also failed to reverse the inequality when multiplying by \\(-1\\)."
      }
    ],
    "backward": "The flip rule when multiplying or dividing by a negative.",
    "forward": "Essential for solving inequalities with negative coefficients."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Given \\(2x + y = 11\\) and \\(y = 3\\), find \\(x\\).",
    "options": [
      {
        "text": "\\(x = 4\\)",
        "correct": true,
        "feedback": "Correct. Substitute \\(y = 3\\): \\(2x + 3 = 11\\). Then \\(2x = 8\\), so \\(x = 4\\)."
      },
      {
        "text": "\\(x = 3\\)",
        "correct": false,
        "feedback": "You copied the value of \\(y\\)."
      },
      {
        "text": "\\(x = 7\\)",
        "correct": false,
        "feedback": "You added 3 to both sides instead of subtracting, giving \\(2x = 14\\), so \\(x = 7\\)."
      },
      {
        "text": "\\(x = 8\\)",
        "correct": false,
        "feedback": "You stopped at \\(2x = 8\\) and forgot to divide by 2."
      }
    ],
    "backward": "Substituting a known value into a two-variable equation.",
    "forward": "The first step of solving any simultaneous system by substitution."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "A rectangle’s perimeter is 26 cm. Its length is 3 cm more than its width \\(w\\). Write an equation for \\(w\\).",
    "options": [
      {
        "text": "\\(2(w + w + 3) = 26\\)",
        "correct": true,
        "feedback": "Correct. The length is \\(w + 3\\). Perimeter \\(= 2(l + w) = 2(w + 3 + w) = 2(2w + 3) = 26\\)."
      },
      {
        "text": "\\(w + w + 3 = 26\\)",
        "correct": false,
        "feedback": "You forgot to double the sum of the length and width (you wrote the semi-perimeter only)."
      },
      {
        "text": "\\(2w + 3 = 26\\)",
        "correct": false,
        "feedback": "You only doubled the width and forgot the length was doubled too."
      },
      {
        "text": "\\(2(w + 3) = 26\\)",
        "correct": false,
        "feedback": "You omitted the width from the bracket — the length is \\(w + 3\\), but the width \\(w\\) also contributes."
      }
    ],
    "backward": "Constructing an equation from a geometric context.",
    "forward": "The starting point for all length-and-perimeter problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“I think of a number, subtract 7, and the result is 4.” Write this as an equation.",
    "options": [
      {
        "text": "\\(n - 7 = 4\\)",
        "correct": true,
        "feedback": "Correct. “Subtract 7 from \\(n\\)” gives \\(n - 7 = 4\\)."
      },
      {
        "text": "\\(7 - n = 4\\)",
        "correct": false,
        "feedback": "You reversed the order of subtraction."
      },
      {
        "text": "\\(7n = 4\\)",
        "correct": false,
        "feedback": "You translated “subtract” as multiplication."
      },
      {
        "text": "\\(n + 7 = 4\\)",
        "correct": false,
        "feedback": "You translated “subtract” as addition."
      }
    ],
    "backward": "Order in subtraction matters.",
    "forward": "Recurring theme in word problems."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "constructing",
    "clusterName": "Constructing equations",
    "question": "“Double a number and add 5, giving 17.” Write this as an equation.",
    "options": [
      {
        "text": "\\(2n + 5 = 17\\)",
        "correct": true,
        "feedback": "Correct. “Double a number” is \\(2n\\); “add 5” gives \\(2n + 5 = 17\\)."
      },
      {
        "text": "\\(5n + 2 = 17\\)",
        "correct": false,
        "feedback": "You swapped the coefficient and the constant."
      },
      {
        "text": "\\(2n - 5 = 17\\)",
        "correct": false,
        "feedback": "You translated “add” as subtract."
      },
      {
        "text": "\\(2(n + 5) = 17\\)",
        "correct": false,
        "feedback": "You applied the \\(+5\\) inside the doubling."
      }
    ],
    "backward": "Two operations in sequence.",
    "forward": "The same form recurs in every worded linear equation."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(6x = 42\\).",
    "options": [
      {
        "text": "\\(7\\)",
        "correct": true,
        "feedback": "Correct. Divide by 6: \\(x = 7\\)."
      },
      {
        "text": "\\(36\\)",
        "correct": false,
        "feedback": "You subtracted 6 from 42."
      },
      {
        "text": "\\(48\\)",
        "correct": false,
        "feedback": "You added 6 to 42."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "You copied the coefficient."
      }
    ],
    "backward": "Inverse of multiplication.",
    "forward": "Used whenever the coefficient of \\(x\\) is not 1."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "solving",
    "clusterName": "Solving linear equations (including brackets)",
    "question": "Solve \\(3(x - 2) = 12\\).",
    "options": [
      {
        "text": "\\(x = 6\\)",
        "correct": true,
        "feedback": "Correct. Divide by 3: \\(x - 2 = 4\\). Add 2: \\(x = 6\\)."
      },
      {
        "text": "\\(x = 4\\)",
        "correct": false,
        "feedback": "You stopped at \\(x - 2 = 4\\) and forgot to add 2."
      },
      {
        "text": "\\(x = 9\\)",
        "correct": false,
        "feedback": "You expanded to \\(3x - 6 = 12\\), got \\(3x = 18\\), then divided by 2 instead of 3."
      },
      {
        "text": "\\(x = 18\\)",
        "correct": false,
        "feedback": "You expanded to \\(3x - 6 = 12\\), got \\(3x = 18\\), and forgot to divide by 3."
      }
    ],
    "backward": "Undoing a bracket.",
    "forward": "Same method for any single-bracket equation."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Solve the simultaneous equations \\(x + y = 9\\) and \\(x - y = 3\\).",
    "options": [
      {
        "text": "\\(x = 6, y = 3\\)",
        "correct": true,
        "feedback": "Correct. Adding: \\(2x = 12\\), so \\(x = 6\\); substituting gives \\(y = 3\\)."
      },
      {
        "text": "\\(x = 3, y = 6\\)",
        "correct": false,
        "feedback": "You swapped the values."
      },
      {
        "text": "\\(x = 4.5, y = 4.5\\)",
        "correct": false,
        "feedback": "These satisfy the sum but not the difference."
      },
      {
        "text": "\\(x = 9, y = 3\\)",
        "correct": false,
        "feedback": "Difference is 6, not 3."
      }
    ],
    "backward": "Elimination by addition.",
    "forward": "Same method for larger systems."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "simultaneous",
    "clusterName": "Simultaneous equations",
    "question": "Given \\(y = 3x\\) and \\(x + y = 8\\), find \\(x\\) and \\(y\\).",
    "options": [
      {
        "text": "\\(x = 2, y = 6\\)",
        "correct": true,
        "feedback": "Correct. Substitute: \\(x + 3x = 8\\), so \\(4x = 8\\) and \\(x = 2\\); then \\(y = 6\\)."
      },
      {
        "text": "\\(x = 6, y = 2\\)",
        "correct": false,
        "feedback": "You swapped the values."
      },
      {
        "text": "\\(x = 3, y = 5\\)",
        "correct": false,
        "feedback": "This doesn’t satisfy \\(y = 3x\\)."
      },
      {
        "text": "\\(x = 4, y = 4\\)",
        "correct": false,
        "feedback": "This satisfies the sum but not \\(y = 3x\\)."
      }
    ],
    "backward": "Substitution into a two-variable equation.",
    "forward": "Extended to any substitution problem."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by an **open** circle at 2 with an arrow pointing to the right?",
    "options": [
      {
        "text": "\\(x > 2\\)",
        "correct": true,
        "feedback": "Correct. Open circle = strict; arrow right = greater than: \\(x > 2\\)."
      },
      {
        "text": "\\(x \\geq 2\\)",
        "correct": false,
        "feedback": "A closed circle would be needed for \\(\\geq\\)."
      },
      {
        "text": "\\(x < 2\\)",
        "correct": false,
        "feedback": "The arrow points right, not left."
      },
      {
        "text": "\\(x \\leq 2\\)",
        "correct": false,
        "feedback": "Both the circle type and the direction are wrong."
      }
    ],
    "backward": "Circle type and direction together determine the inequality.",
    "forward": "Used in every inequality solution set."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "numberLine",
    "clusterName": "Inequalities on a number line",
    "question": "Which inequality is shown on a number line by a **closed** circle at \\(-1\\) with an arrow pointing to the left?",
    "options": [
      {
        "text": "\\(x \\leq -1\\)",
        "correct": true,
        "feedback": "Correct. Closed circle = inclusive; arrow left = less than or equal: \\(x \\leq -1\\)."
      },
      {
        "text": "\\(x \\geq -1\\)",
        "correct": false,
        "feedback": "The arrow points left, not right."
      },
      {
        "text": "\\(x < -1\\)",
        "correct": false,
        "feedback": "A closed circle means \\(\\leq\\), not \\(<\\)."
      },
      {
        "text": "\\(x > -1\\)",
        "correct": false,
        "feedback": "Both the circle type and the direction are wrong."
      }
    ],
    "backward": "Inclusive boundary and direction.",
    "forward": "Same rule applies to any negative boundary."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(x - 3 < 5\\).",
    "options": [
      {
        "text": "\\(x < 8\\)",
        "correct": true,
        "feedback": "Correct. Add 3 to both sides: \\(x < 8\\)."
      },
      {
        "text": "\\(x > 8\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x < 2\\)",
        "correct": false,
        "feedback": "You subtracted 3 from 5 instead of adding."
      },
      {
        "text": "\\(x > 2\\)",
        "correct": false,
        "feedback": "You subtracted and flipped."
      }
    ],
    "backward": "Same as solving an equation.",
    "forward": "The foundation for compound inequalities."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "solvingIneq",
    "clusterName": "Solving linear inequalities",
    "question": "Solve \\(2x \\geq 10\\).",
    "options": [
      {
        "text": "\\(x \\geq 5\\)",
        "correct": true,
        "feedback": "Correct. Divide both sides by 2: \\(x \\geq 5\\)."
      },
      {
        "text": "\\(x \\leq 5\\)",
        "correct": false,
        "feedback": "You flipped the sign unnecessarily."
      },
      {
        "text": "\\(x \\geq 20\\)",
        "correct": false,
        "feedback": "You multiplied by 2 instead of dividing."
      },
      {
        "text": "\\(x \\geq 8\\)",
        "correct": false,
        "feedback": "You subtracted 2 from 10."
      }
    ],
    "backward": "Same as an equation with a positive coefficient.",
    "forward": "Extends to inequalities with negative coefficients, where the sign flips."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "A book costs \\(\\$b\\). Three books plus \\(\\$5\\) postage total \\(\\$26\\). Find \\(b\\).",
    "options": [
      {
        "text": "\\(\\$7\\)",
        "correct": true,
        "feedback": "Correct. \\(3b + 5 = 26\\), so \\(3b = 21\\) and \\(b = 7\\)."
      },
      {
        "text": "\\(\\$21\\)",
        "correct": false,
        "feedback": "You stopped at \\(3b = 21\\) without dividing by 3."
      },
      {
        "text": "\\(\\$10.33\\)",
        "correct": false,
        "feedback": "You added 5 instead of subtracting: \\((26 + 5) \\div 3 = 10.33\\)."
      },
      {
        "text": "\\(\\$8\\)",
        "correct": false,
        "feedback": "You divided 26 by 3 and rounded down — but you must subtract the postage first."
      }
    ],
    "backward": "Constructing and solving an equation from a real scenario.",
    "forward": "The same structure covers all “fixed plus variable cost” problems."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "mixed",
    "clusterName": "Mixed contextual problems",
    "question": "The sum of two consecutive integers is 17. Find the smaller one.",
    "options": [
      {
        "text": "\\(8\\)",
        "correct": true,
        "feedback": "Correct. Let the smaller be \\(n\\), so the next is \\(n + 1\\): \\(2n + 1 = 17\\), so \\(n = 8\\)."
      },
      {
        "text": "\\(9\\)",
        "correct": false,
        "feedback": "This is the larger integer (8 + 9 = 17)."
      },
      {
        "text": "\\(7\\)",
        "correct": false,
        "feedback": "\\(7 + 8 = 15\\), not 17."
      },
      {
        "text": "\\(8.5\\)",
        "correct": false,
        "feedback": "The integers must be whole numbers."
      }
    ],
    "backward": "Representing consecutive integers algebraically.",
    "forward": "Used in many number problems."
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
    title: "Equations & Inequalities — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Constructing equations from words, solving linear equations and inequalities, simultaneous equations, and inequalities on a number line — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p>You’ve finished the warm‑up. The next 24 questions are the Core Fluency diagnostic for equations and inequalities. You’ll construct equations from words, solve linear equations and inequalities, work with simultaneous equations, and represent inequalities on a number line. Take your time and use the feedback to strengthen your understanding.</p>",
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

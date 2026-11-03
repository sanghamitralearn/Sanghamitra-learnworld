// seed/mathSeedCh8FractionsL1.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 8
// (Fractions), Level 1 — converted from the
// standalone diagnostic JSON ch8-fractions-level-1.json.
//
// Run with: node seed/mathSeedCh8FractionsL1.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-8-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 1;

const CLUSTER_NAMES = {
  "C1": "Recurring decimals and fractions",
  "C2": "Order of operations with fractions",
  "C3": "Multiplying fractions",
  "C4": "Dividing fractions",
  "C5": "Strategic simplification",
  "C6": "Mixed fraction problems"
};

const warmupItems = [
  {
    "itemId": "w1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.75\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.75 = \\frac{75}{100}\\). Divide top and bottom by 25 to get \\(\\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{3}{40}\\)",
        "correct": false,
        "feedback": "Divided by 1000 instead of 100 — placed the decimal one place too far. \\(0.75 = \\frac{75}{100}\\), not \\(\\frac{75}{1000}\\)."
      },
      {
        "text": "\\(\\frac{15}{2}\\)",
        "correct": false,
        "feedback": "Divided by 10 instead of 100 — placed the decimal one place too near. \\(0.75 = \\frac{75}{100}\\), not \\(\\frac{75}{10}\\)."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Inverted the answer — \\(\\frac{4}{3}\\) is the reciprocal of \\(\\frac{3}{4}\\)."
      }
    ],
    "retryHint": "Count the decimal places. Two places means hundredths. What goes on the denominator?",
    "backward": "Place value — the 5 sits in the hundredths place.",
    "forward": "Converting decimals to fractions is needed when adding probabilities written in different forms."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{2}{3} \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{2}{3} \\times \\frac{3}{5} = \\frac{6}{15}\\). Cancel the 3s: \\(\\frac{2}{1} \\times \\frac{1}{5} = \\frac{2}{5}\\)."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Added numerators (2+3=5) and denominators (3+5=8). That is the rule for adding fractions, not multiplying."
      },
      {
        "text": "\\(\\frac{6}{8}\\)",
        "correct": false,
        "feedback": "Multiplied numerators (2×3=6) but added denominators (3+5=8). Both parts of a product multiply."
      },
      {
        "text": "\\(\\frac{5}{2}\\)",
        "correct": false,
        "feedback": "Inverted both fractions: \\(\\frac{3}{2} \\times \\frac{5}{3} = \\frac{5}{2}\\). Multiplication does not flip fractions."
      }
    ],
    "retryHint": "Multiply numerators together, and denominators together. Then simplify.",
    "backward": "Cancelling common factors — the same move as simplifying \\(\\frac{6}{15}\\).",
    "forward": "Multiplying fractions scales up to algebraic fractions in Ch2."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{1}{2} \\div \\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. Keep \\(\\frac{1}{2}\\), change ÷ to ×, flip \\(\\frac{1}{4}\\) to \\(\\frac{4}{1}\\). \\(\\frac{1}{2} \\times \\frac{4}{1} = \\frac{4}{2} = 2\\)."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}\\). The ÷ means the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction instead of the second: \\(\\frac{2}{1} \\times \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{2}{1} \\times \\frac{4}{1} = 8\\). Only the divisor gets flipped."
      }
    ],
    "retryHint": "How many \\(\\frac{1}{4}\\)-pieces fit inside \\(\\frac{1}{2}\\)? Picture the quarter-pieces.",
    "backward": "How many quarters fit in a half — you can picture two quarter-pieces.",
    "forward": "'how many times does this fit into that' is the ratio question in Ch11."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{3}{4} + \\frac{1}{2} \\times \\frac{1}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": true,
        "feedback": "Correct. Multiplication before addition: \\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\). Then \\(\\frac{3}{4} + \\frac{1}{6} = \\frac{9}{12} + \\frac{2}{12} = \\frac{11}{12}\\)."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Worked left to right: \\(\\frac{3}{4} + \\frac{1}{2} = \\frac{5}{4}\\), then × \\(\\frac{1}{3} = \\frac{5}{12}\\). Multiplication must be done before addition."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Paired \\(\\frac{3}{4}\\) with \\(\\frac{1}{3}\\) across the addition: \\(\\frac{3}{4} \\times \\frac{1}{3} = \\frac{1}{4}\\), then + \\(\\frac{1}{2} = \\frac{3}{4}\\). The \\(\\frac{3}{4}\\) is added, not multiplied."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Computed the product only (\\(\\frac{1}{6}\\)) and stopped — the \\(\\frac{3}{4}\\) still needs to be added."
      }
    ],
    "retryHint": "Do the multiplication first, then add. Which operation comes before which in BIDMAS?",
    "backward": "BIDMAS — the same order as 3 + 4 × 2.",
    "forward": "This is the routine for evaluating any expression, including formulae later in the course."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which simplification is valid?",
    "options": [
      {
        "text": "\\(\\frac{4}{9} \\times \\frac{3}{8} = \\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Cancelling is valid when the numbers are factors of a product. \\(\\frac{4}{8} = \\frac{1}{2}\\) and \\(\\frac{3}{9} = \\frac{1}{3}\\), so \\(\\frac{4}{9} \\times \\frac{3}{8} = \\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{4}{9} + \\frac{3}{8} = \\frac{4}{3} + \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling 9 with 3 and 8 with 4 across an addition is not valid. Correctly: \\(\\frac{4}{9} + \\frac{3}{8} = \\frac{32}{72} + \\frac{27}{72} = \\frac{59}{72}\\). The cancelled form gives \\(\\frac{4}{3} + \\frac{1}{8} = \\frac{32}{24} + \\frac{3}{24} = \\frac{35}{24}\\) — a different number. Only factors in a product can be cancelled."
      },
      {
        "text": "\\(\\frac{4}{9} \\div \\frac{3}{8} = \\frac{4}{3} \\div \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling across a division is not valid until the divisor is flipped. Correctly: \\(\\frac{4}{9} \\div \\frac{3}{8} = \\frac{4}{9} \\times \\frac{8}{3} = \\frac{32}{27}\\). The cancelled form gives \\(\\frac{4}{3} \\div \\frac{1}{8} = \\frac{4}{3} \\times 8 = \\frac{32}{3}\\) — a different number."
      },
      {
        "text": "\\(\\frac{4}{9} - \\frac{3}{8} = \\frac{4}{3} - \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling across a subtraction is not valid. Correctly: \\(\\frac{4}{9} - \\frac{3}{8} = \\frac{32}{72} - \\frac{27}{72} = \\frac{5}{72}\\). The cancelled form gives \\(\\frac{4}{3} - \\frac{1}{8} = \\frac{32}{24} - \\frac{3}{24} = \\frac{29}{24}\\) — a different number."
      }
    ],
    "retryHint": "Is the number being cancelled a factor of a product, or a term inside a sum or difference?",
    "backward": "Equivalent fractions — dividing numerator and denominator by the same number.",
    "forward": "Knowing when cancelling is legal keeps ratio and algebra error-free."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{6}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.666...\\), so \\(10x = 6.666...\\). Subtracting: \\(9x = 6\\), so \\(x = \\frac{6}{9} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Read 0.6 as terminating — but the bar over the 6 means it repeats forever. \\(0.6 = \\frac{3}{5}\\) is a different number from \\(0.666...\\)"
      },
      {
        "text": "\\(\\frac{33}{50}\\)",
        "correct": false,
        "feedback": "Truncated to 0.66 (two digits) instead of letting the 6 recur. \\(\\frac{33}{50} = 0.66\\) exactly, which is not \\(0.666...\\)"
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Inverted the answer. Solving \\(9x = 6\\) gives \\(x = \\frac{6}{9} = \\frac{2}{3}\\), not \\(\\frac{9}{6} = \\frac{3}{2}\\)."
      }
    ],
    "retryHint": "Set \\(x = 0.666...\\), multiply both sides by 10, then subtract \\(x\\) from \\(10x\\). What cancels?",
    "backward": "Multiplying by 10 shifts the decimal — same as ×10 in Ch3.",
    "forward": "This 'shift and subtract' trick converts any repeating decimal, including in probability answers."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{3}{4} \\div \\frac{1}{8}\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{4} \\div \\frac{1}{8} = \\frac{3}{4} \\times \\frac{8}{1}\\). Cancel 4 with 8: \\(\\frac{3}{1} \\times \\frac{2}{1} = 6\\)."
      },
      {
        "text": "\\(\\frac{3}{32}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{3}{4} \\times \\frac{1}{8} = \\frac{3}{32}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction instead of the second: \\(\\frac{4}{3} \\times \\frac{1}{8} = \\frac{4}{24} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{32}{3}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{4}{3} \\times \\frac{8}{1} = \\frac{32}{3}\\)."
      }
    ],
    "retryHint": "Keep the first fraction, change ÷ to ×, flip the second. Which one gets flipped?",
    "backward": "Reciprocals — same idea as \\(\\frac{1}{8} \\times 8 = 1\\).",
    "forward": "Division by a fraction underlies the 'unit rate' method in ratio problems."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "What is \\(\\frac{1}{2}\\) of \\(\\frac{3}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. 'Of' means multiply: \\(\\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}\\)."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{1}{2} + \\frac{3}{4} = \\frac{5}{4}\\). 'Of' is not addition — it means multiply."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{3}{4} - \\frac{1}{2} = \\frac{1}{4}\\). 'Of' is not subtraction."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Divided \\(\\frac{3}{4} \\div \\frac{1}{2} = \\frac{3}{2}\\). 'Of' means multiply, not divide."
      }
    ],
    "retryHint": "'Of' in fraction problems is the same as 'multiplied by'.",
    "backward": "Multiplying fractions — same procedure as any product of fractions.",
    "forward": "'of' meaning multiply reappears in probability — 'the probability of A and B' multiplies."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{4}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(x = 0.444...\\), \\(10x = 4.444...\\), \\(9x = 4\\), \\(x = \\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Read 0.4 as terminating — but the bar means the 4 repeats forever. \\(\\frac{2}{5} = 0.4\\) exactly, not \\(0.444...\\)"
      },
      {
        "text": "\\(\\frac{11}{25}\\)",
        "correct": false,
        "feedback": "Truncated to 0.44 and converted. \\(\\frac{11}{25} = 0.44\\), which is not \\(0.444...\\)"
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Inverted. Solving \\(9x = 4\\) gives \\(\\frac{4}{9}\\), not \\(\\frac{9}{4}\\)."
      }
    ],
    "backward": "Multiplying by 10 shifts the decimal — Ch3.",
    "forward": "Same technique converts any recurring decimal, including in probability."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{6} \\div \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{3}{2}\\). Cancel 3 with 6: \\(\\frac{5}{2} \\times \\frac{1}{2} = \\frac{5}{4}\\)."
      },
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{6} \\times \\frac{2}{3} = \\frac{10}{18} = \\frac{5}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{6}{5} \\times \\frac{2}{3} = \\frac{12}{15} = \\frac{4}{5}\\)."
      },
      {
        "text": "\\(\\frac{9}{5}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{6}{5} \\times \\frac{3}{2} = \\frac{18}{10} = \\frac{9}{5}\\)."
      }
    ],
    "backward": "Reciprocal — multiplying by \\(\\frac{3}{2}\\) undoes dividing by \\(\\frac{2}{3}\\).",
    "forward": "'invert and multiply' is the backbone of proportional reasoning in Ch11."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{3}{4} + \\frac{1}{2} \\div \\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{11}{4}\\)",
        "correct": true,
        "feedback": "Correct. Division before addition: \\(\\frac{1}{2} \\div \\frac{1}{4} = 2\\). Then \\(\\frac{3}{4} + 2 = \\frac{11}{4}\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Worked left to right: \\(\\frac{3}{4} + \\frac{1}{2} = \\frac{5}{4}\\), then ÷ \\(\\frac{1}{4} = 5\\). Division before addition."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Computed the division (2) and stopped — the \\(\\frac{3}{4}\\) is still to be added."
      },
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}\\), then \\(\\frac{3}{4} + \\frac{1}{8} = \\frac{7}{8}\\)."
      }
    ],
    "backward": "BIDMAS — same precedence as integer work.",
    "forward": "Order of operations holds for every rational computation."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which of these equations is correct?",
    "options": [
      {
        "text": "\\(\\frac{3}{5} \\times \\frac{5}{8} = \\frac{3}{8}\\)",
        "correct": true,
        "feedback": "Correct. Cancelling the 5s is valid because both are factors in a product: \\(\\frac{3}{5} \\times \\frac{5}{8} = \\frac{3}{8}\\)."
      },
      {
        "text": "\\(\\frac{3}{5} + \\frac{5}{8} = \\frac{3}{1} + \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling the 5s across an addition is not valid. Correctly: \\(\\frac{3}{5} + \\frac{5}{8} = \\frac{24}{40} + \\frac{25}{40} = \\frac{49}{40}\\). The cancelled form gives \\(\\frac{3}{1} + \\frac{1}{8} = \\frac{25}{8}\\) — a different number. Only factors in a product can be cancelled."
      },
      {
        "text": "\\(\\frac{3}{5} - \\frac{5}{8} = \\frac{3}{1} - \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling the 5s across a subtraction is not valid. Correctly: \\(\\frac{3}{5} - \\frac{5}{8} = \\frac{24}{40} - \\frac{25}{40} = -\\frac{1}{40}\\). The cancelled form gives \\(\\frac{3}{1} - \\frac{1}{8} = \\frac{23}{8}\\) — a different number."
      },
      {
        "text": "\\(\\frac{3}{5} \\div \\frac{5}{8} = \\frac{3}{1} \\div \\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Cancelling the 5s across a division is not valid until the divisor is flipped. Correctly: \\(\\frac{3}{5} \\div \\frac{5}{8} = \\frac{3}{5} \\times \\frac{8}{5} = \\frac{24}{25}\\). The cancelled form gives \\(\\frac{3}{1} \\div \\frac{1}{8} = 3 \\times 8 = 24\\) — a different number."
      }
    ],
    "backward": "Equivalent fractions — dividing top and bottom by 5.",
    "forward": "Ratio simplification relies on cancelling only factors."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{3}{8} \\times \\frac{4}{9}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Cancel 3 with 9 to get \\(\\frac{1}{3}\\); cancel 4 with 8 to get \\(\\frac{1}{2}\\). \\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{12}{17}\\)",
        "correct": false,
        "feedback": "Multiplied numerators (12) but added denominators (17). Both parts multiply."
      },
      {
        "text": "\\(\\frac{7}{17}\\)",
        "correct": false,
        "feedback": "Added numerators and denominators — that is what you do for +, not ×."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Inverted both and multiplied: \\(\\frac{8}{3} \\times \\frac{9}{4} = 6\\)."
      }
    ],
    "backward": "Cancelling common factors in a product.",
    "forward": "Cross-cancelling scales up to algebraic fractions."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{7}\\) to a fraction, then divide the result by \\(\\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{7} = \\frac{7}{9}\\). Then \\(\\frac{7}{9} \\div \\frac{2}{3} = \\frac{7}{9} \\times \\frac{3}{2} = \\frac{21}{18} = \\frac{7}{6}\\)."
      },
      {
        "text": "\\(\\frac{14}{27}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{7}{9} \\times \\frac{2}{3} = \\frac{14}{27}\\). Division requires flipping the divisor."
      },
      {
        "text": "\\(\\frac{27}{14}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{9}{7} \\times \\frac{3}{2} = \\frac{27}{14}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{7}{9}\\)",
        "correct": false,
        "feedback": "Computed the conversion (\\(\\frac{7}{9}\\)) and stopped — the division by \\(\\frac{2}{3}\\) is still to do."
      }
    ],
    "backward": "Recurring-decimal conversion plus fraction division.",
    "forward": "Multi-step procedures like this are what algebraic manipulation requires."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{5}{11}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{45}\\)",
        "correct": true,
        "feedback": "Correct. Long division: 5 ÷ 11 = 0.4545... — the remainder cycles, so both digits of the block repeat."
      },
      {
        "text": "\\(0.\\overline{4}\\)",
        "correct": false,
        "feedback": "\\(0.\\overline{4} = \\frac{4}{9}\\), not \\(\\frac{5}{11}\\). Both digits of the block repeat."
      },
      {
        "text": "\\(0.45\\)",
        "correct": false,
        "feedback": "\\(0.45 = \\frac{45}{100}\\), terminating — but \\(\\frac{5}{11}\\) has no terminating decimal because 11 does not divide a power of 10."
      },
      {
        "text": "\\(0.4\\overline{5}\\)",
        "correct": false,
        "feedback": "\\(0.4\\overline{5} = 0.4555...\\) — the repeating block is 45 (both digits), not just 5."
      }
    ],
    "backward": "Long division — the remainder cycling is what makes the decimal repeat.",
    "forward": "Recognising the repeating block lets us convert back exactly, needed in probability."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{7}{8} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{8} \\times \\frac{4}{3}\\). Cancel 4 with 8 to get \\(\\frac{7}{2} \\times \\frac{1}{3} = \\frac{7}{6}\\)."
      },
      {
        "text": "\\(\\frac{21}{32}\\)",
        "correct": false,
        "feedback": "Multiplied: \\(\\frac{7}{8} \\times \\frac{3}{4} = \\frac{21}{32}\\)."
      },
      {
        "text": "\\(\\frac{6}{7}\\)",
        "correct": false,
        "feedback": "Flipped the first: \\(\\frac{8}{7} \\times \\frac{3}{4} = \\frac{24}{28} = \\frac{6}{7}\\)."
      },
      {
        "text": "\\(\\frac{32}{21}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{8}{7} \\times \\frac{4}{3} = \\frac{32}{21}\\)."
      }
    ],
    "backward": "Invert and multiply — same process as W7.",
    "forward": "Dividing by fractions is the mechanics behind 'unit rate' problems."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{2}{3} \\times \\frac{3}{4} + \\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. Multiplication first: \\(\\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{2}\\). Then \\(\\frac{1}{2} + \\frac{1}{2} = 1\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Computed the product (\\(\\frac{1}{2}\\)) and stopped. The + \\(\\frac{1}{2}\\) is still to be applied."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{3}{4} + \\frac{1}{2} = \\frac{5}{4}\\), ignoring the \\(\\frac{2}{3} \\times\\). The multiplication applies to \\(\\frac{3}{4}\\) only."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Applied × to the whole sum: \\(\\frac{2}{3} \\times \\left(\\frac{3}{4} + \\frac{1}{2}\\right) = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{5}{6}\\). Multiplication applies to \\(\\frac{3}{4}\\) alone."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Every expression in later algebra obeys the same precedence."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which of these is a valid simplification?",
    "options": [
      {
        "text": "\\(\\frac{5}{8} \\times \\frac{4}{15} = \\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Cancelling 5 with 15 and 4 with 8 is valid because these are factors in a product: \\(\\frac{5}{8} \\times \\frac{4}{15} = \\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{5}{8} + \\frac{4}{15} = \\frac{1}{8} + \\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Cancelling 5 with 15 across an addition is not valid. Correctly: \\(\\frac{5}{8} + \\frac{4}{15} = \\frac{75}{120} + \\frac{32}{120} = \\frac{107}{120}\\). The cancelled form gives \\(\\frac{1}{8} + \\frac{4}{3} = \\frac{3}{24} + \\frac{32}{24} = \\frac{35}{24}\\) — a different number."
      },
      {
        "text": "\\(\\frac{5}{8} - \\frac{4}{15} = \\frac{1}{8} - \\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Cancelling 5 with 15 across a subtraction is not valid. Correctly: \\(\\frac{5}{8} - \\frac{4}{15} = \\frac{75}{120} - \\frac{32}{120} = \\frac{43}{120}\\). The cancelled form gives \\(\\frac{1}{8} - \\frac{4}{3} = \\frac{3}{24} - \\frac{32}{24} = -\\frac{29}{24}\\) — a different number."
      },
      {
        "text": "\\(\\frac{5}{8} \\div \\frac{4}{15} = \\frac{1}{8} \\div \\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Cancelling 5 with 15 across a division is not valid until the divisor is flipped. Correctly: \\(\\frac{5}{8} \\div \\frac{4}{15} = \\frac{5}{8} \\times \\frac{15}{4} = \\frac{75}{32}\\). The cancelled form gives \\(\\frac{1}{8} \\div \\frac{4}{3} = \\frac{1}{8} \\times \\frac{3}{4} = \\frac{3}{32}\\) — a different number."
      }
    ],
    "backward": "Cancelling common factors — same rule as W5.",
    "forward": "Deciding when cancelling is legal prevents the most common fraction-arithmetic error in ratio and probability."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{2}{5} \\times \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{2}{5} \\times \\frac{3}{4}\\). Cancel 2 with 4 to get \\(\\frac{1}{2}\\). \\(\\frac{1}{5} \\times \\frac{3}{2} = \\frac{3}{10}\\)."
      },
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Added numerators (5) and denominators (9). That is the rule for +, not ×."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Multiplied numerators (6) but added denominators (9), giving \\(\\frac{6}{9} = \\frac{2}{3}\\). Both parts multiply."
      },
      {
        "text": "\\(\\frac{10}{3}\\)",
        "correct": false,
        "feedback": "Inverted both: \\(\\frac{5}{2} \\times \\frac{4}{3} = \\frac{10}{3}\\)."
      }
    ],
    "backward": "Cross-cancelling in products.",
    "forward": "Multiplying fractions is routine in probability and ratio."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{4}\\) to a fraction, then multiply the result by \\(\\frac{3}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{4} = \\frac{4}{9}\\). Then \\(\\frac{4}{9} \\times \\frac{3}{2}\\): cancel 4 with 2 to get \\(\\frac{2}{1}\\), and 3 with 9 to get \\(\\frac{1}{3}\\). Result: \\(\\frac{2}{1} \\times \\frac{1}{3} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Read \\(0.\\overline{4}\\) as terminating \\(0.4 = \\frac{2}{5}\\), then multiplied: \\(\\frac{2}{5} \\times \\frac{3}{2} = \\frac{6}{10} = \\frac{3}{5}\\). The bar means the 4 repeats, giving \\(\\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Computed the conversion (\\(\\frac{4}{9}\\)) and stopped — the multiplication is still to do."
      },
      {
        "text": "\\(\\frac{8}{27}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{4}{9} \\times \\frac{2}{3} = \\frac{8}{27}\\). Multiplication does not flip."
      }
    ],
    "backward": "Recurring-decimal conversion plus fraction multiplication.",
    "forward": "Multi-step procedures like this are what algebraic manipulation requires."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Which fraction is equal to \\(0.\\overline{27}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.2727...\\), so \\(100x = 27.2727...\\). Subtracting: \\(99x = 27\\), \\(x = \\frac{27}{99} = \\frac{3}{11}\\)."
      },
      {
        "text": "\\(\\frac{27}{100}\\)",
        "correct": false,
        "feedback": "Treated the decimal as terminating at 0.27. But the bar covers both digits, so 2727... continues forever."
      },
      {
        "text": "\\(\\frac{27}{10}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 (one place) — but the repeating block is two digits, so ×100 is needed to line up the block."
      },
      {
        "text": "\\(\\frac{11}{3}\\)",
        "correct": false,
        "feedback": "Inverted. Solving \\(99x = 27\\) gives \\(\\frac{3}{11}\\), not \\(\\frac{11}{3}\\)."
      }
    ],
    "backward": "×100 shifts the decimal two places, matching the two-digit repeating block.",
    "forward": "Recognising the repeating block is the key to converting any decimal probability to a fraction."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{2}{3} \\div \\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{2}{3} \\times \\frac{5}{4}\\). Cancel 2 with 4 to get \\(\\frac{1}{2}\\). \\(\\frac{1}{3} \\times \\frac{5}{2} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Multiplied: \\(\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}\\)."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Flipped the first: \\(\\frac{3}{2} \\times \\frac{4}{5} = \\frac{12}{10} = \\frac{6}{5}\\)."
      },
      {
        "text": "\\(\\frac{15}{8}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{3}{2} \\times \\frac{5}{4} = \\frac{15}{8}\\)."
      }
    ],
    "backward": "Keep-change-flip — same process as W7.",
    "forward": "Division of fractions underpins scale-factor work in enlargement, Ch13."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{1}{6} + \\frac{2}{3} \\div \\frac{4}{9}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{3}\\)",
        "correct": true,
        "feedback": "Correct. Division first: \\(\\frac{2}{3} \\div \\frac{4}{9} = \\frac{2}{3} \\times \\frac{9}{4} = \\frac{3}{2}\\). Then \\(\\frac{1}{6} + \\frac{3}{2} = \\frac{1}{6} + \\frac{9}{6} = \\frac{10}{6} = \\frac{5}{3}\\)."
      },
      {
        "text": "\\(\\frac{15}{8}\\)",
        "correct": false,
        "feedback": "Worked left to right: \\(\\frac{1}{6} + \\frac{2}{3} = \\frac{5}{6}\\), then ÷ \\(\\frac{4}{9} = \\frac{15}{8}\\). Division comes first."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Computed the division only (\\(\\frac{3}{2}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{25}{54}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{2}{3} \\times \\frac{4}{9} = \\frac{8}{27}\\), then \\(\\frac{1}{6} + \\frac{8}{27} = \\frac{9}{54} + \\frac{16}{54} = \\frac{25}{54}\\)."
      }
    ],
    "backward": "Order of operations.",
    "forward": "Precedence discipline applies to every algebraic and numeric expression."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly simplifies \\(\\frac{8}{9} \\times \\frac{27}{32}\\) by cancelling common factors first?",
    "options": [
      {
        "text": "Cancel 8 with 32 (÷8) and 27 with 9 (÷9), giving \\(\\frac{1}{4} \\times \\frac{3}{1} = \\frac{3}{4}\\).",
        "correct": true,
        "feedback": "Correct. Cancelling first keeps the numbers small: 8÷32 → 1 and 4; 27÷9 → 3 and 1. Result: \\(\\frac{1 \\times 3}{4 \\times 1} = \\frac{3}{4}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{8 + 27}{9 + 32} = \\frac{35}{41}\\).",
        "correct": false,
        "feedback": "Adding numerators and denominators is what you do for combining two parts, not for a product. Multiplying fractions uses numerator × numerator and denominator × denominator — and cancelling first gives \\(\\frac{3}{4}\\), not \\(\\frac{35}{41}\\)."
      },
      {
        "text": "Add: \\(\\frac{8}{9} + \\frac{27}{32}\\).",
        "correct": false,
        "feedback": "Addition is the wrong operation — the problem is a multiplication."
      },
      {
        "text": "Divide: \\(\\frac{8}{9} \\div \\frac{27}{32}\\).",
        "correct": false,
        "feedback": "Division is the wrong operation — the problem is a multiplication."
      }
    ],
    "backward": "Cancelling common factors before multiplying.",
    "forward": "Cancelling first is essential when the numbers grow in ratio and probability."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{5}{6} \\times \\frac{3}{10}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{3}{10}\\). Cancel 5 with 10 to get \\(\\frac{1}{2}\\); cancel 3 with 6 to get \\(\\frac{1}{2}\\). \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Added numerators (8) and denominators (16), giving \\(\\frac{8}{16} = \\frac{1}{2}\\). That is the rule for +, not ×."
      },
      {
        "text": "\\(\\frac{15}{16}\\)",
        "correct": false,
        "feedback": "Multiplied numerators (15) but added denominators (16). Both parts multiply."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Inverted both: \\(\\frac{6}{5} \\times \\frac{10}{3} = 4\\)."
      }
    ],
    "backward": "Cross-cancelling.",
    "forward": "Efficient multiplication is essential when numbers grow, e.g. in compound-probability work."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly calculates \\(\\frac{4}{5} \\div \\frac{2}{15}\\)?",
    "options": [
      {
        "text": "Flip the divisor: \\(\\frac{4}{5} \\times \\frac{15}{2}\\). Cancel 4 with 2 to get \\(\\frac{2}{1}\\), and 15 with 5 to get \\(\\frac{3}{1}\\). Result: \\(\\frac{2 \\times 3}{1 \\times 1} = 6\\).",
        "correct": true,
        "feedback": "Correct. Flip the divisor and cancel strategically: \\(\\frac{4}{5} \\times \\frac{15}{2}\\). Cancel 4 with 2 to get 2 and 1; cancel 15 with 5 to get 3 and 1. Result: \\(\\frac{2 \\times 3}{1 \\times 1} = 6\\)."
      },
      {
        "text": "Multiply without flipping: \\(\\frac{4}{5} \\times \\frac{2}{15} = \\frac{8}{75}\\).",
        "correct": false,
        "feedback": "Multiplication is the wrong operation — the problem is a division. \\(\\frac{4}{5} \\times \\frac{2}{15} = \\frac{8}{75}\\), not the correct value."
      },
      {
        "text": "Flip both fractions and then multiply: \\(\\frac{5}{4} \\times \\frac{15}{2} = \\frac{75}{8}\\).",
        "correct": false,
        "feedback": "Flipped both fractions. Only the divisor gets flipped. \\(\\frac{5}{4} \\times \\frac{15}{2} = \\frac{75}{8}\\), not the correct value."
      },
      {
        "text": "Flip the first fraction only: \\(\\frac{5}{4} \\times \\frac{2}{15} = \\frac{10}{60} = \\frac{1}{6}\\).",
        "correct": false,
        "feedback": "Flipped the wrong fraction. Only the divisor (the second fraction) gets flipped. \\(\\frac{5}{4} \\times \\frac{2}{15} = \\frac{10}{60} = \\frac{1}{6}\\), not the correct value."
      }
    ],
    "backward": "Keep-change-flip plus cancelling common factors before multiplying.",
    "forward": "Choosing the small-intermediate route matters when numbers grow in ratio and probability."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{7}{9}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{7}\\)",
        "correct": true,
        "feedback": "Correct. 7 ÷ 9 = 0.777... — the 7 repeats because the remainder cycles."
      },
      {
        "text": "\\(0.7\\)",
        "correct": false,
        "feedback": "Treated \\(\\frac{7}{9}\\) as terminating at 0.7. But 9 does not divide a power of 10, so the decimal repeats."
      },
      {
        "text": "\\(0.79\\)",
        "correct": false,
        "feedback": "Truncated to 0.79 — the decimal never gets a 9; the digit is always 7."
      },
      {
        "text": "\\(0.7\\overline{9}\\)",
        "correct": false,
        "feedback": "\\(0.7\\overline{9} = 0.7999...\\) — a different number from \\(0.777...\\). The 7 is the digit that repeats."
      }
    ],
    "backward": "Long division — same routine as W6.",
    "forward": "Converting fractions to decimals helps compare probabilities later."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(2\\frac{1}{2} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{10}{3}\\)",
        "correct": true,
        "feedback": "Correct. Convert \\(2\\frac{1}{2} = \\frac{5}{2}\\). Then \\(\\frac{5}{2} \\times \\frac{4}{3}\\). Cancel 2 with 4 to get \\(\\frac{5}{1} \\times \\frac{2}{3} = \\frac{10}{3}\\)."
      },
      {
        "text": "\\(\\frac{15}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{2} \\times \\frac{3}{4} = \\frac{15}{8}\\)."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Inverted the answer — \\(\\frac{3}{10}\\) is the reciprocal of \\(\\frac{10}{3}\\)."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{2}{5} \\times \\frac{4}{3} = \\frac{8}{15}\\)."
      }
    ],
    "backward": "Mixed-number conversion.",
    "forward": "Real-world rates and ratios often involve mixed numbers."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{1}{2} \\times \\left(\\frac{1}{3} + \\frac{1}{6}\\right)\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. Bracket first: \\(\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}\\). Then \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Ignored the brackets: \\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\), then + \\(\\frac{1}{6} = \\frac{1}{3}\\). Brackets say the sum comes first."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{1}{2}\\)) and stopped — the × \\(\\frac{1}{2}\\) is still to be applied."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Multiplied by \\(\\frac{1}{6}\\) only, dropping the \\(\\frac{1}{3}\\): \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\). Every term inside the bracket is affected by × \\(\\frac{1}{2}\\)."
      }
    ],
    "backward": "Brackets override precedence — same rule as integer expressions.",
    "forward": "Brackets are essential in formulae and algebraic manipulation."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly simplifies the calculation \\(\\frac{3}{4} \\times 200\\) by cancelling a common factor first?",
    "options": [
      {
        "text": "Divide 200 by 4 to get 50, then multiply by 3 to get 150.",
        "correct": true,
        "feedback": "Correct. Dividing 200 by 4 first is a form of cancelling — the 4 divides into 200 to give 50, so \\(\\frac{3}{4} \\times 200 = 3 \\times 50 = 150\\)."
      },
      {
        "text": "Divide 200 by 4 to get 50, then multiply by 4 to get 200.",
        "correct": false,
        "feedback": "The 4 in \\(\\frac{3}{4}\\) divides 200, and the 3 is the multiplier — you cancelled correctly but then multiplied by the denominator (4) instead of the numerator (3). This gives \\(50 \\times 4 = 200\\), not the correct value 150."
      },
      {
        "text": "Divide 200 by 3 to get about 66.7, then multiply by 4 to get about 266.7.",
        "correct": false,
        "feedback": "This route divides by the numerator (3) and multiplies by the denominator (4) — that computes \\(200 \\times \\frac{4}{3} \\approx 266.7\\), the reciprocal of the intended product. The fraction is \\(\\frac{3}{4}\\), not \\(\\frac{4}{3}\\)."
      },
      {
        "text": "Add 3 to 200, then divide by 4 to get 50.75.",
        "correct": false,
        "feedback": "This route computes \\(\\frac{203}{4} = 50.75\\), not 150. The 200 is being multiplied by the fraction, not added to 3."
      }
    ],
    "backward": "Equivalent-fraction reasoning — \\(\\frac{3}{4} \\times 200 = \\frac{3 \\times 200}{4}\\).",
    "forward": "Cancelling before multiplying keeps numbers small when they grow in ratio and probability."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(1\\frac{1}{2} \\times \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. Convert \\(1\\frac{1}{2} = \\frac{3}{2}\\). Then \\(\\frac{3}{2} \\times \\frac{2}{3}\\) — cancel the 2s and 3s: \\(\\frac{1}{1} \\times \\frac{1}{1} = 1\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Ignored the whole-number part: \\(\\frac{1}{2} \\times \\frac{2}{3} = \\frac{1}{3}\\). The 1 in \\(1\\frac{1}{2}\\) multiplies too — convert to \\(\\frac{3}{2}\\) first."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{3}{2} \\times \\frac{3}{2} = \\frac{9}{4}\\). Multiplication does not flip."
      },
      {
        "text": "\\(\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Added instead of multiplying: \\(\\frac{3}{2} + \\frac{2}{3} = \\frac{9}{6} + \\frac{4}{6} = \\frac{13}{6}\\)."
      }
    ],
    "backward": "Converting mixed numbers to improper fractions.",
    "forward": "Mixed numbers appear in real-world measurements throughout the course."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{3}\\) to a fraction, then divide the result by \\(\\frac{4}{9}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{3} = \\frac{1}{3}\\). Then \\(\\frac{1}{3} \\div \\frac{4}{9} = \\frac{1}{3} \\times \\frac{9}{4} = \\frac{9}{12} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{4}{27}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{1}{3} \\times \\frac{4}{9} = \\frac{4}{27}\\). Division requires flipping the divisor."
      },
      {
        "text": "\\(\\frac{27}{4}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{3}{1} \\times \\frac{9}{4} = \\frac{27}{4}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Computed the conversion (\\(\\frac{1}{3}\\)) and stopped — the division by \\(\\frac{4}{9}\\) is still to do."
      }
    ],
    "backward": "Recurring-decimal conversion plus fraction division.",
    "forward": "Multi-step procedures like this are what algebraic manipulation requires."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{5}\\) to a fraction.",
    "options": [
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(9x = 5\\), so \\(x = \\frac{5}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.5 = \\frac{1}{2}\\). The bar means the 5 repeats."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": false,
        "feedback": "Truncated to 0.55. The repeating block continues."
      },
      {
        "text": "\\(\\frac{9}{5}\\)",
        "correct": false,
        "feedback": "Inverted. \\(\\frac{9}{5}\\) is the reciprocal of \\(\\frac{5}{9}\\)."
      }
    ],
    "backward": "Same shift-and-subtract routine as D1.",
    "forward": "Recurring-decimal conversion returns in probability."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{8} \\div \\frac{5}{16}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{8} \\times \\frac{16}{5}\\). Cancel 5s and 8 with 16: \\(\\frac{1}{1} \\times \\frac{2}{1} = 2\\)."
      },
      {
        "text": "\\(\\frac{25}{128}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{8} \\times \\frac{5}{16} = \\frac{25}{128}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{8}{5} \\times \\frac{5}{16} = \\frac{40}{80} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{128}{25}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{8}{5} \\times \\frac{16}{5} = \\frac{128}{25}\\)."
      }
    ],
    "backward": "Keep-change-flip.",
    "forward": "Division by fractions is used in unit-rate problems."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{2}{3} + \\frac{1}{4} \\div \\frac{1}{8}\\).",
    "options": [
      {
        "text": "\\(\\frac{8}{3}\\)",
        "correct": true,
        "feedback": "Correct. Division first: \\(\\frac{1}{4} \\div \\frac{1}{8} = 2\\). Then \\(\\frac{2}{3} + 2 = \\frac{8}{3}\\)."
      },
      {
        "text": "\\(\\frac{22}{3}\\)",
        "correct": false,
        "feedback": "Worked left to right: \\(\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}\\), then ÷ \\(\\frac{1}{8} = \\frac{11}{12} \\times 8 = \\frac{88}{12} = \\frac{22}{3}\\). Division must be done first."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Computed the division (2) and stopped — the \\(\\frac{2}{3}\\) is still to be added."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Added \\(\\frac{2}{3} + \\frac{1}{4} = \\frac{11}{12}\\) and stopped."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Precedence applies to every rational expression."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which line correctly simplifies?",
    "options": [
      {
        "text": "\\(\\frac{3}{4} \\times \\frac{4}{5} = \\frac{3}{5}\\)",
        "correct": true,
        "feedback": "Correct. Cancelling the 4s in a product is valid: \\(\\frac{3}{4} \\times \\frac{4}{5} = \\frac{3}{5}\\)."
      },
      {
        "text": "\\(\\frac{3}{4} + \\frac{4}{5} = \\frac{3}{1} + \\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Cancelling the 4s across an addition is not valid. Correctly: \\(\\frac{3}{4} + \\frac{4}{5} = \\frac{15}{20} + \\frac{16}{20} = \\frac{31}{20}\\). The cancelled form gives \\(\\frac{3}{1} + \\frac{1}{5} = \\frac{16}{5}\\) — a different number."
      },
      {
        "text": "\\(\\frac{3}{4} - \\frac{4}{5} = \\frac{3}{1} - \\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Cancelling the 4s across a subtraction is not valid. Correctly: \\(\\frac{3}{4} - \\frac{4}{5} = \\frac{15}{20} - \\frac{16}{20} = -\\frac{1}{20}\\). The cancelled form gives \\(\\frac{3}{1} - \\frac{1}{5} = \\frac{14}{5}\\) — a different number."
      },
      {
        "text": "\\(\\frac{3}{4} \\div \\frac{4}{5} = \\frac{3}{1} \\div \\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Cancelling the 4s across a division is not valid until the divisor is flipped. Correctly: \\(\\frac{3}{4} \\div \\frac{4}{5} = \\frac{3}{4} \\times \\frac{5}{4} = \\frac{15}{16}\\). The cancelled form gives \\(\\frac{3}{1} \\div \\frac{1}{5} = 3 \\times 5 = 15\\) — a different number."
      }
    ],
    "backward": "Cancelling factors.",
    "forward": "Same rule needed in algebra."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{4}{9} \\times \\frac{3}{8}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. Cancel 4 with 8 to get \\(\\frac{1}{2}\\); cancel 3 with 9 to get \\(\\frac{1}{3}\\). \\(\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{7}{17}\\)",
        "correct": false,
        "feedback": "Added numerators and denominators — that is the rule for +, not ×."
      },
      {
        "text": "\\(\\frac{12}{17}\\)",
        "correct": false,
        "feedback": "Multiplied numerators, added denominators."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Inverted both and multiplied: \\(\\frac{9}{4} \\times \\frac{8}{3} = 6\\)."
      }
    ],
    "backward": "Cross-cancelling.",
    "forward": "Same discipline needed for algebraic fractions."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{2}\\) to a fraction, then multiply the result by \\(\\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{2} = \\frac{2}{9}\\). Then \\(\\frac{2}{9} \\times \\frac{3}{4} = \\frac{6}{36} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{8}{27}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{2}{9} \\times \\frac{4}{3} = \\frac{8}{27}\\). Multiplication does not flip."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Computed the conversion (\\(\\frac{2}{9}\\)) and stopped — the multiplication is still to do."
      },
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": false,
        "feedback": "Read \\(0.\\overline{2}\\) as terminating \\(0.2 = \\frac{1}{5}\\), then multiplied: \\(\\frac{1}{5} \\times \\frac{3}{4} = \\frac{3}{20}\\). The bar means the 2 repeats."
      }
    ],
    "backward": "Recurring-decimal conversion plus multiplication.",
    "forward": "Multi-step synthesis builds toward algebra."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{3}{11}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{27}\\)",
        "correct": true,
        "feedback": "Correct. 3 ÷ 11 = 0.2727... — the block 27 repeats."
      },
      {
        "text": "\\(0.\\overline{3}\\)",
        "correct": false,
        "feedback": "\\(0.\\overline{3} = \\frac{3}{9} = \\frac{1}{3}\\), not \\(\\frac{3}{11}\\)."
      },
      {
        "text": "\\(0.27\\)",
        "correct": false,
        "feedback": "\\(0.27 = \\frac{27}{100}\\), terminating. 11 does not divide a power of 10."
      },
      {
        "text": "\\(0.3\\overline{27}\\)",
        "correct": false,
        "feedback": "\\(0.3\\overline{27} = 0.3272727...\\), a different number from \\(0.2727...\\)"
      }
    ],
    "backward": "Long division.",
    "forward": "Recognising the repeating block enables exact fraction conversion."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{4}{5} \\div \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{5} \\times \\frac{3}{2}\\). Cancel 4 with 2 to get \\(\\frac{2}{5} \\times \\frac{3}{1} = \\frac{6}{5}\\)."
      },
      {
        "text": "\\(\\frac{8}{15}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{4}{5} \\times \\frac{2}{3} = \\frac{8}{15}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Flipped the first: \\(\\frac{5}{4} \\times \\frac{2}{3} = \\frac{10}{12} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{15}{8}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{5}{4} \\times \\frac{3}{2} = \\frac{15}{8}\\)."
      }
    ],
    "backward": "Invert and multiply.",
    "forward": "Used in scale and rate problems."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{8}\\) to a fraction, then divide the result by \\(\\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{8} = \\frac{8}{9}\\). Then \\(\\frac{8}{9} \\div \\frac{2}{3} = \\frac{8}{9} \\times \\frac{3}{2} = \\frac{24}{18} = \\frac{4}{3}\\)."
      },
      {
        "text": "\\(\\frac{16}{27}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{8}{9} \\times \\frac{2}{3} = \\frac{16}{27}\\). Division requires flipping the divisor."
      },
      {
        "text": "\\(\\frac{27}{16}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{9}{8} \\times \\frac{3}{2} = \\frac{27}{16}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{8}{9}\\)",
        "correct": false,
        "feedback": "Computed the conversion (\\(\\frac{8}{9}\\)) and stopped — the division is still to do."
      }
    ],
    "backward": "Recurring-decimal conversion plus division.",
    "forward": "Multi-step synthesis builds toward algebra."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly simplifies \\(\\frac{6}{7} \\times \\frac{14}{15}\\) by cancelling common factors first?",
    "options": [
      {
        "text": "Cancel 6 with 15 (÷3) and 14 with 7 (÷7). Result: \\(\\frac{2 \\times 2}{5 \\times 1} = \\frac{4}{5}\\).",
        "correct": true,
        "feedback": "Correct. Cancelling first keeps the numbers small: 6÷15 → 2 and 5; 14÷7 → 2 and 1. Result: \\(\\frac{2 \\times 2}{5 \\times 1} = \\frac{4}{5}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{6 + 14}{7 + 15} = \\frac{20}{22} = \\frac{10}{11}\\).",
        "correct": false,
        "feedback": "Adding numerators and denominators is what you do for combining two parts, not for a product. Multiplying fractions uses numerator × numerator and denominator × denominator — and cancelling first gives \\(\\frac{4}{5}\\), not \\(\\frac{10}{11}\\)."
      },
      {
        "text": "Add: \\(\\frac{6}{7} + \\frac{14}{15}\\).",
        "correct": false,
        "feedback": "Addition is the wrong operation — the problem is a multiplication."
      },
      {
        "text": "Divide: \\(\\frac{6}{7} \\div \\frac{14}{15}\\).",
        "correct": false,
        "feedback": "Division is the wrong operation — the problem is a multiplication."
      }
    ],
    "backward": "Cancelling common factors.",
    "forward": "Cancelling first is essential when the numbers grow."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{3}{5} \\times \\frac{5}{9}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. Cancel the 5s and 3 with 9: \\(\\frac{1}{1} \\times \\frac{1}{3} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{4}{7}\\)",
        "correct": false,
        "feedback": "Added numerators (8) and denominators (14). That is the rule for +."
      },
      {
        "text": "\\(\\frac{15}{14}\\)",
        "correct": false,
        "feedback": "Multiplied numerators (15) but added denominators (14)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Inverted both: \\(\\frac{5}{3} \\times \\frac{9}{5} = 3\\)."
      }
    ],
    "backward": "Cross-cancelling.",
    "forward": "Scales to algebra."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{2}{3} \\div \\frac{1}{4} - \\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{13}{6}\\)",
        "correct": true,
        "feedback": "Correct. Division first: \\(\\frac{2}{3} \\div \\frac{1}{4} = \\frac{2}{3} \\times 4 = \\frac{8}{3}\\). Then \\(\\frac{8}{3} - \\frac{1}{2} = \\frac{16}{6} - \\frac{3}{6} = \\frac{13}{6}\\)."
      },
      {
        "text": "\\(-\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Subtracted in the wrong order: \\(\\frac{1}{2} - \\frac{8}{3} = \\frac{3}{6} - \\frac{16}{6} = -\\frac{13}{6}\\). The division result \\(\\frac{8}{3}\\) comes first in the subtraction."
      },
      {
        "text": "\\(\\frac{8}{3}\\)",
        "correct": false,
        "feedback": "Computed the division only (\\(\\frac{8}{3}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{19}{6}\\)",
        "correct": false,
        "feedback": "Added instead of subtracting: \\(\\frac{8}{3} + \\frac{1}{2} = \\frac{16}{6} + \\frac{3}{6} = \\frac{19}{6}\\)."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Multi-step fraction work is foundational."
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
    title: "Fractions — Core Fluency",
    subtitle: "Grade 8 · Level 1 · Core Fluency",
    description: "Recurring decimals, order of operations, multiplying and dividing fractions, and knowing when cancelling is valid — warm-up, diagnostic, and spaced recheck for core fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — it is not a test and it is not timed. Its purpose is to find out what is solid and what needs a second look. Work through each question carefully; if something feels tricky, that is useful information, not a failure.</p><p>You will see questions from all six topics in the chapter. Take your time.</p>",
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

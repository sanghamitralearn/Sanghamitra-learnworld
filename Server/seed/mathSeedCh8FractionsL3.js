// seed/mathSeedCh8FractionsL3.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 8
// (Fractions), Level 3 — converted from the
// standalone diagnostic JSON ch8-fractions-level-3.json.
//
// Run with: node seed/mathSeedCh8FractionsL3.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-8-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 3;

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
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{3}\\) to a fraction, then multiply by \\(\\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{3} = \\frac{1}{3}\\). Then \\(\\frac{1}{3} \\times \\frac{3}{4} = \\frac{3}{12} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{1}{3} \\times \\frac{1}{4} = \\frac{1}{12}\\). Multiplication does not flip."
      },
      {
        "text": "\\(\\frac{9}{40}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.3 = \\frac{3}{10}\\): \\(\\frac{3}{10} \\times \\frac{3}{4} = \\frac{9}{40}\\). The bar means the 3 repeats, giving \\(\\frac{1}{3}\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Inverted both: \\(\\frac{3}{1} \\times \\frac{4}{3} = 4\\). Multiplication does not flip."
      }
    ],
    "retryHint": "Convert \\(0.\\overline{3}\\) to a fraction with denominator 9 first.",
    "backward": "Single-digit repeating decimal uses /9 — Ch8 L1 conversion.",
    "forward": "Conversion-plus-multiply appears in probability."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Calculate \\(0.\\overline{8} \\div \\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{10}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{8} = \\frac{8}{9}\\). \\(\\frac{8}{9} \\times \\frac{5}{4} = \\frac{40}{36} = \\frac{10}{9}\\)."
      },
      {
        "text": "\\(\\frac{32}{45}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{8}{9} \\times \\frac{4}{5} = \\frac{32}{45}\\)."
      },
      {
        "text": "\\(\\frac{9}{10}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{9}{8} \\times \\frac{4}{5} = \\frac{36}{40} = \\frac{9}{10}\\)."
      },
      {
        "text": "\\(\\frac{45}{32}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{9}{8} \\times \\frac{5}{4} = \\frac{45}{32}\\)."
      }
    ],
    "retryHint": "Convert \\(0.\\overline{8}\\) to \\(\\frac{8}{9}\\) first. Only the divisor gets flipped.",
    "backward": "Keep-change-flip with recurring conversion.",
    "forward": "Unit-rate problems."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A recipe calls for \\(0.\\overline{6}\\) cup of flour per batch, and you make \\(1\\frac{1}{2}\\) batches. How much flour do you use?",
    "options": [
      {
        "text": "\\(1\\) cup",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{6} = \\frac{2}{3}\\). \\(\\frac{2}{3} \\times \\frac{3}{2} = 1\\) cup."
      },
      {
        "text": "\\(\\frac{9}{10}\\) cup",
        "correct": false,
        "feedback": "Read \\(0.\\overline{6}\\) as terminating \\(0.6 = \\frac{3}{5}\\): \\(\\frac{3}{5} \\times \\frac{3}{2} = \\frac{9}{10}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\) cup",
        "correct": false,
        "feedback": "Converted but didn't multiply: \\(\\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\) cup",
        "correct": false,
        "feedback": "Flipped the second factor: \\(\\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\)."
      }
    ],
    "retryHint": "'Batches' signals multiplication. Convert the recurring decimal first.",
    "backward": "'batches' means multiply — same routine as W1.",
    "forward": "Scaling recipes appears in ratio."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Calculate \\(0.\\overline{3} \\times \\frac{3}{4} + \\frac{1}{6}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{3} \\times \\frac{3}{4} = \\frac{1}{4}\\). \\(\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}\\)."
      },
      {
        "text": "\\(\\frac{11}{36}\\)",
        "correct": false,
        "feedback": "Added first: \\(\\frac{1}{3} \\times \\left(\\frac{3}{4} + \\frac{1}{6}\\right) = \\frac{1}{3} \\times \\frac{11}{12} = \\frac{11}{36}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Forgot to add \\(\\frac{1}{6}\\) — stopped at \\(\\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Added the conversion and \\(\\frac{1}{6}\\) first: \\(\\left(\\frac{1}{3} + \\frac{1}{6}\\right) \\times \\frac{3}{4} = \\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}\\)."
      }
    ],
    "retryHint": "Multiplication before addition — convert \\(0.\\overline{3}\\) first.",
    "backward": "BIDMAS with conversion first.",
    "forward": "Precedence discipline throughout algebra."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(0.\\overline{4} \\times 1\\frac{1}{2}\\)?",
    "options": [
      {
        "text": "Convert to \\(\\frac{4}{9}\\). Cancel 4 with 2 and 3 with 9. Result: \\(\\frac{2}{3}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{9} \\times \\frac{3}{2}\\). Cancel 4 with 2 and 3 with 9: \\(\\frac{2}{3}\\)."
      },
      {
        "text": "Read as terminating \\(\\frac{2}{5}\\). Multiply by \\(\\frac{3}{2}\\): \\(\\frac{3}{5}\\).",
        "correct": false,
        "feedback": "Read \\(0.\\overline{4}\\) as terminating \\(0.4 = \\frac{2}{5}\\). The bar means 4 repeats, giving \\(\\frac{4}{9}\\)."
      },
      {
        "text": "Convert to \\(\\frac{4}{9}\\). Add \\(\\frac{3}{2}\\): \\(\\frac{35}{18}\\).",
        "correct": false,
        "feedback": "Wrong operation — the problem is multiplication, not addition."
      },
      {
        "text": "Convert to \\(\\frac{4}{9}\\). Flip the second factor: \\(\\frac{4}{9} \\times \\frac{2}{3} = \\frac{8}{27}\\).",
        "correct": false,
        "feedback": "Flipped a factor that should not be flipped: produces \\(\\frac{8}{27}\\), not \\(\\frac{2}{3}\\)."
      }
    ],
    "retryHint": "Convert to \\(\\frac{4}{9}\\). Look for common factors between numerator and denominator.",
    "backward": "Cancelling before multiplying.",
    "forward": "Cancelling strategy applies in algebra."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Calculate \\(0.\\overline{5} \\div 2\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{20}{81}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{9} \\div \\frac{9}{4} = \\frac{5}{9} \\times \\frac{4}{9} = \\frac{20}{81}\\)."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{9} \\times \\frac{9}{4} = \\frac{5}{4}\\)."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{9}{5} \\times \\frac{4}{9} = \\frac{4}{5}\\)."
      },
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{5}{9}\\))."
      }
    ],
    "retryHint": "Convert both \\(0.\\overline{5}\\) and \\(2\\frac{1}{4}\\) first, then flip the divisor.",
    "backward": "Conversion + mixed + flip.",
    "forward": "Complex rate problems."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Calculate \\(0.\\overline{6} \\times \\left(\\frac{2}{3} + \\frac{1}{6}\\right)\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": true,
        "feedback": "Correct. Bracket = \\(\\frac{5}{6}\\). \\(\\frac{2}{3} \\times \\frac{5}{6} = \\frac{10}{18} = \\frac{5}{9}\\)."
      },
      {
        "text": "\\(\\frac{11}{18}\\)",
        "correct": false,
        "feedback": "Ignored the bracket: \\(\\frac{2}{3} \\times \\frac{2}{3} + \\frac{1}{6} = \\frac{4}{9} + \\frac{1}{6} = \\frac{11}{18}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{5}{6}\\))."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Used only the first term of the bracket: \\(\\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\)."
      }
    ],
    "retryHint": "Bracket first, then multiply by the converted decimal.",
    "backward": "Bracket first.",
    "forward": "Nested operations appear in algebra."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(\\frac{15}{16} \\times \\frac{8}{5}\\)?",
    "options": [
      {
        "text": "Cancel 15 with 5 (→ 3 and 1) and 8 with 16 (→ 1 and 2). Result: \\(\\frac{3}{1} \\times \\frac{1}{2} = \\frac{3}{2}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{15}{16} \\times \\frac{8}{5}\\). Cancel 15 with 5 and 8 with 16: \\(\\frac{3}{2}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{15+8}{16+5} = \\frac{23}{21}\\).",
        "correct": false,
        "feedback": "Adding numerators and denominators is not valid for a product — produces \\(\\frac{23}{21}\\)."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{15 \\times 8}{16} = \\frac{15}{2}\\).",
        "correct": false,
        "feedback": "Multiplying numerators but not denominators — produces \\(\\frac{15}{2}\\)."
      },
      {
        "text": "Invert both: \\(\\frac{16}{15} \\times \\frac{5}{8} = \\frac{2}{3}\\).",
        "correct": false,
        "feedback": "Inverting both produces the reciprocal of the correct product (\\(\\frac{2}{3}\\))."
      }
    ],
    "retryHint": "Look for common factors between numerators and denominators before multiplying.",
    "backward": "Cancelling common factors before multiplying.",
    "forward": "Same strategy in algebraic fractions."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{4}\\) to a fraction, then multiply by \\(1\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{4} = \\frac{4}{9}\\). \\(\\frac{4}{9} \\times \\frac{3}{2} = \\frac{12}{18} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.4 = \\frac{2}{5}\\): \\(\\frac{2}{5} \\times \\frac{3}{2} = \\frac{3}{5}\\)."
      },
      {
        "text": "\\(\\frac{8}{27}\\)",
        "correct": false,
        "feedback": "Flipped the second factor: \\(\\frac{4}{9} \\times \\frac{2}{3} = \\frac{8}{27}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{4}{9}\\))."
      }
    ],
    "backward": "Two-part synthesis — conversion feeds into multiplication.",
    "forward": "Appears in probability problems with decimal inputs."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{6} \\times \\frac{9}{10} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{9}{10} = \\frac{45}{60} = \\frac{3}{4}\\). Then \\(\\frac{3}{4} \\div \\frac{3}{4} = 1\\)."
      },
      {
        "text": "\\(\\frac{9}{16}\\)",
        "correct": false,
        "feedback": "Multiplied at the final step instead of dividing: \\(\\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Stopped after the multiplication (\\(\\frac{3}{4}\\))."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Multiplied correctly to get the intermediate \\(\\frac{3}{4}\\), then inverted that intermediate instead of completing the division: \\(\\frac{3}{4} \\to \\frac{4}{3}\\)."
      }
    ],
    "backward": "Multiply-then-divide chain — same discipline as L2 D2.",
    "forward": "Chained operations in algebra."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\left(\\frac{1}{2} + \\frac{1}{3}\\right) \\div \\left(\\frac{1}{4} - \\frac{1}{6}\\right)\\).",
    "options": [
      {
        "text": "\\(10\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\div \\frac{1}{12} = \\frac{5}{6} \\times \\frac{12}{1} = 10\\)."
      },
      {
        "text": "\\(\\frac{5}{72}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{5}{6} \\times \\frac{1}{12} = \\frac{5}{72}\\)."
      },
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Flipped the dividend: \\(\\frac{1}{12} \\div \\frac{5}{6} = \\frac{1}{12} \\times \\frac{6}{5} = \\frac{1}{10}\\)."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Added the two brackets: \\(\\frac{5}{6} + \\frac{1}{12} = \\frac{11}{12}\\)."
      }
    ],
    "backward": "Two brackets, then divide — brackets override precedence.",
    "forward": "Nested operations throughout algebra."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(\\frac{15}{16} \\div \\frac{5}{8}\\)?",
    "options": [
      {
        "text": "Flip divisor and cancel: \\(\\frac{15}{16} \\times \\frac{8}{5}\\). Cancel 15 with 5 and 8 with 16. Result: \\(\\frac{3}{2}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{15}{16} \\times \\frac{8}{5} = \\frac{3}{2}\\)."
      },
      {
        "text": "Multiply without flipping: \\(\\frac{15}{16} \\times \\frac{5}{8} = \\frac{75}{128}\\).",
        "correct": false,
        "feedback": "Multiplication instead of division — produces \\(\\frac{75}{128}\\)."
      },
      {
        "text": "Flip both: \\(\\frac{16}{15} \\times \\frac{8}{5} = \\frac{128}{75}\\).",
        "correct": false,
        "feedback": "Flipped both fractions — produces \\(\\frac{128}{75}\\)."
      },
      {
        "text": "Flip first only: \\(\\frac{16}{15} \\times \\frac{5}{8} = \\frac{2}{3}\\).",
        "correct": false,
        "feedback": "Flipped the wrong fraction — produces \\(\\frac{2}{3}\\)."
      }
    ],
    "backward": "Flip + cancel — same pattern as W5.",
    "forward": "Division with cancelling is the strategy behind unit-rate problems."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{2}{3} \\times 1\\frac{1}{4} \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{8}{3} \\times \\frac{5}{4} \\times \\frac{3}{5}\\): cancel 5 with 5 and 3 with 3, leaving \\(\\frac{8}{4} = 2\\)."
      },
      {
        "text": "\\(\\frac{10}{3}\\)",
        "correct": false,
        "feedback": "Stopped after two factors: \\(\\frac{8}{3} \\times \\frac{5}{4} = \\frac{10}{3}\\)."
      },
      {
        "text": "\\(\\frac{50}{9}\\)",
        "correct": false,
        "feedback": "Flipped the third factor: \\(\\frac{8}{3} \\times \\frac{5}{4} \\times \\frac{5}{3} = \\frac{50}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{2}{3} \\times \\frac{1}{4} \\times \\frac{3}{5} = \\frac{1}{10}\\)."
      }
    ],
    "backward": "3-factor multiply with mixed numbers.",
    "forward": "Multi-factor scaling in real-world measurements."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{6} \\times \\frac{4}{15} \\div \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{4}{15} = \\frac{20}{90} = \\frac{2}{9}\\). Then \\(\\frac{2}{9} \\div \\frac{2}{3} = \\frac{2}{9} \\times \\frac{3}{2} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{4}{27}\\)",
        "correct": false,
        "feedback": "Multiplied at the final step instead of dividing: \\(\\frac{2}{9} \\times \\frac{2}{3} = \\frac{4}{27}\\)."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Stopped after the multiplication (\\(\\frac{2}{9}\\))."
      },
      {
        "text": "\\(\\frac{9}{2}\\)",
        "correct": false,
        "feedback": "Multiplied correctly to get \\(\\frac{2}{9}\\), then inverted that intermediate instead of completing the division: \\(\\frac{2}{9} \\to \\frac{9}{2}\\)."
      }
    ],
    "backward": "Multiply-then-divide chain — C3 + C4 combined.",
    "forward": "Multi-step synthesis in algebra."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{27}\\) to a fraction, then divide by \\(\\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{15}{44}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{27} = \\frac{3}{11}\\). \\(\\frac{3}{11} \\times \\frac{5}{4} = \\frac{15}{44}\\)."
      },
      {
        "text": "\\(\\frac{12}{55}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{3}{11} \\times \\frac{4}{5} = \\frac{12}{55}\\)."
      },
      {
        "text": "\\(\\frac{44}{15}\\)",
        "correct": false,
        "feedback": "Inverted the final result."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{3}{11}\\))."
      }
    ],
    "backward": "Two-digit conversion feeds into division.",
    "forward": "Mixed representation in probability."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{7}{8} \\div \\frac{3}{4} \\times \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{9}\\)",
        "correct": true,
        "feedback": "Correct. Left to right: \\(\\frac{7}{8} \\times \\frac{4}{3} = \\frac{28}{24} = \\frac{7}{6}\\). Then \\(\\frac{7}{6} \\times \\frac{2}{3} = \\frac{14}{18} = \\frac{7}{9}\\)."
      },
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": false,
        "feedback": "Stopped after the division (\\(\\frac{7}{6}\\))."
      },
      {
        "text": "\\(\\frac{9}{7}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{7}{9} \\to \\frac{9}{7}\\))."
      },
      {
        "text": "\\(\\frac{7}{4}\\)",
        "correct": false,
        "feedback": "Treated the third factor as a divisor: \\(\\frac{7}{6} \\div \\frac{2}{3} = \\frac{7}{4}\\)."
      }
    ],
    "backward": "Equal-precedence left-to-right — same rule as L2 R12.",
    "forward": "Precedence discipline throughout algebra."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A recipe calls for \\(\\frac{3}{5}\\) cup of oil. You want to use \\(\\frac{10}{9}\\) times the recipe's oil amount, and you already have \\(\\frac{1}{6}\\) cup in the pan. How much more oil do you need?",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\) cup",
        "correct": true,
        "feedback": "Correct. Target: \\(\\frac{3}{5} \\times \\frac{10}{9} = \\frac{30}{45} = \\frac{2}{3}\\). Need: \\(\\frac{2}{3} - \\frac{1}{6} = \\frac{4}{6} - \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}\\) cup."
      },
      {
        "text": "\\(\\frac{2}{3}\\) cup",
        "correct": false,
        "feedback": "Forgot to subtract what's already in the pan: \\(\\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\) cup",
        "correct": false,
        "feedback": "Added instead of subtracting: \\(\\frac{2}{3} + \\frac{1}{6} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\) cup",
        "correct": false,
        "feedback": "Only used the \\(\\frac{1}{6}\\) already in the pan — ignored the scaling step entirely."
      }
    ],
    "backward": "Multiply then subtract — construct the path.",
    "forward": "Multi-step recipe/rate problems."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(\\frac{24}{25} \\times \\frac{35}{36}\\)?",
    "options": [
      {
        "text": "Cancel 24 with 36 (→ 2 and 3) and 35 with 25 (→ 7 and 5). Result: \\(\\frac{2}{5} \\times \\frac{7}{3} = \\frac{14}{15}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{24}{25} \\times \\frac{35}{36} = \\frac{14}{15}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{24+35}{25+36} = \\frac{59}{61}\\).",
        "correct": false,
        "feedback": "Added numerators and denominators — a wrong misconception producing \\(\\frac{59}{61}\\)."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{24 \\times 35}{25} = \\frac{168}{5}\\).",
        "correct": false,
        "feedback": "Multiplied numerators only — produces \\(\\frac{168}{5}\\)."
      },
      {
        "text": "Invert both: \\(\\frac{25}{24} \\times \\frac{36}{35} = \\frac{15}{14}\\).",
        "correct": false,
        "feedback": "Inverted both — produces \\(\\frac{15}{14}\\)."
      }
    ],
    "backward": "Cancelling common factors before multiplying.",
    "forward": "This strategy is essential in algebraic fractions."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A pipe delivers \\(0.\\overline{3}\\) litres per second. How many litres does it deliver in \\(\\frac{1}{2}\\) minute?",
    "options": [
      {
        "text": "\\(10\\) litres",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{3} = \\frac{1}{3}\\) L/s. \\(\\frac{1}{2}\\) min = 30 seconds. \\(\\frac{1}{3} \\times 30 = 10\\) litres."
      },
      {
        "text": "\\(20\\) litres",
        "correct": false,
        "feedback": "Used 60 s instead of 30: \\(\\frac{1}{3} \\times 60 = 20\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\) litre",
        "correct": false,
        "feedback": "Multiplied by \\(\\frac{1}{2}\\) without converting minutes to seconds: \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{1}{90}\\) litre",
        "correct": false,
        "feedback": "Divided by 30 instead of multiplying: \\(\\frac{1}{3} \\div 30 = \\frac{1}{90}\\)."
      }
    ],
    "backward": "Conversion + multiply by integer.",
    "forward": "Unit-rate problems with mixed representations."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{3}{4} \\times \\left(\\frac{2}{3} + \\frac{1}{6}\\right) \\div \\frac{5}{6}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. Bracket = \\(\\frac{5}{6}\\). \\(\\frac{3}{4} \\times \\frac{5}{6} = \\frac{15}{24} = \\frac{5}{8}\\). Then \\(\\frac{5}{8} \\div \\frac{5}{6} = \\frac{5}{8} \\times \\frac{6}{5} = \\frac{30}{40} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Stopped after the multiplication (\\(\\frac{5}{8}\\))."
      },
      {
        "text": "\\(\\frac{25}{48}\\)",
        "correct": false,
        "feedback": "Multiplied at the final step instead of dividing: \\(\\frac{5}{8} \\times \\frac{5}{6} = \\frac{25}{48}\\)."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{3}{4} \\to \\frac{4}{3}\\))."
      }
    ],
    "backward": "Three operations chained — bracket, multiply, divide.",
    "forward": "Algebraic chains."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{18}\\) to a fraction, then divide by \\(\\frac{5}{6}\\).",
    "options": [
      {
        "text": "\\(\\frac{12}{55}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{18} = \\frac{2}{11}\\). \\(\\frac{2}{11} \\times \\frac{6}{5} = \\frac{12}{55}\\)."
      },
      {
        "text": "\\(\\frac{5}{33}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{2}{11} \\times \\frac{5}{6} = \\frac{5}{33}\\)."
      },
      {
        "text": "\\(\\frac{55}{12}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{12}{55} \\to \\frac{55}{12}\\))."
      },
      {
        "text": "\\(\\frac{2}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{2}{11}\\))."
      }
    ],
    "backward": "Two-digit conversion + flip.",
    "forward": "Rate problems."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "What fraction makes \\(\\square \\times \\frac{15}{8} = \\frac{5}{6}\\) true?",
    "options": [
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\square = \\frac{5}{6} \\div \\frac{15}{8} = \\frac{5}{6} \\times \\frac{8}{15} = \\frac{40}{90} = \\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{25}{16}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{5}{6} \\times \\frac{15}{8} = \\frac{25}{16}\\)."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Inverted the correct answer (\\(\\frac{4}{9} \\to \\frac{9}{4}\\))."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Ignored the \\(\\frac{15}{8}\\) completely — just returned \\(\\frac{5}{6}\\)."
      }
    ],
    "backward": "Divide to isolate the unknown — same as solving a simple equation.",
    "forward": "Solving for unknowns in algebra."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{3}{4} \\div \\left(\\frac{2}{3} - \\frac{1}{4}\\right) \\times \\frac{5}{8}\\).",
    "options": [
      {
        "text": "\\(\\frac{9}{8}\\)",
        "correct": true,
        "feedback": "Correct. Bracket = \\(\\frac{5}{12}\\). \\(\\frac{3}{4} \\div \\frac{5}{12} = \\frac{3}{4} \\times \\frac{12}{5} = \\frac{9}{5}\\). Then \\(\\frac{9}{5} \\times \\frac{5}{8} = \\frac{9}{8}\\)."
      },
      {
        "text": "\\(\\frac{9}{5}\\)",
        "correct": false,
        "feedback": "Stopped after the division (\\(\\frac{9}{5}\\))."
      },
      {
        "text": "\\(\\frac{72}{25}\\)",
        "correct": false,
        "feedback": "Treated the last factor as a divisor instead of a multiplier: \\(\\frac{9}{5} \\div \\frac{5}{8} = \\frac{9}{5} \\times \\frac{8}{5} = \\frac{72}{25}\\)."
      },
      {
        "text": "\\(\\frac{31}{32}\\)",
        "correct": false,
        "feedback": "Ignored the bracket and worked left to right: \\(\\frac{3}{4} \\div \\frac{2}{3} - \\frac{1}{4} \\times \\frac{5}{8} = \\frac{9}{8} - \\frac{5}{32} = \\frac{31}{32}\\)."
      }
    ],
    "backward": "Three operations + bracket + equal precedence.",
    "forward": "Precedence discipline."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(\\frac{5}{8} \\div \\frac{15}{16} = \\frac{5}{8} \\times \\frac{15}{16} = \\frac{75}{128}\\). What is the error?",
    "options": [
      {
        "text": "The student did not flip the divisor. Correct: \\(\\frac{5}{8} \\times \\frac{16}{15} = \\frac{2}{3}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{8} \\div \\frac{15}{16} = \\frac{5}{8} \\times \\frac{16}{15} = \\frac{80}{120} = \\frac{2}{3}\\)."
      },
      {
        "text": "The student flipped the wrong fraction — should have flipped \\(\\frac{5}{8}\\) instead.",
        "correct": false,
        "feedback": "Only the divisor gets flipped — not the dividend \\(\\frac{5}{8}\\)."
      },
      {
        "text": "The student's arithmetic is wrong — \\(\\frac{5}{8} \\times \\frac{15}{16}\\) should be \\(\\frac{5}{8}\\), not \\(\\frac{75}{128}\\).",
        "correct": false,
        "feedback": "The student's arithmetic (\\(\\frac{5}{8} \\times \\frac{15}{16} = \\frac{75}{128}\\)) is correct; the error is the wrong operation."
      },
      {
        "text": "The working is correct — the answer \\(\\frac{75}{128}\\) is right.",
        "correct": false,
        "feedback": "Division requires flipping the divisor — the answer is not \\(\\frac{75}{128}\\)."
      }
    ],
    "backward": "Keep-change-flip discipline.",
    "forward": "This is the most common fraction-division error and recurs in algebra."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Which is greater: \\(\\frac{5}{6} \\div \\frac{3}{4}\\) or \\(\\frac{5}{6} \\times \\frac{3}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{5}{6} \\div \\frac{3}{4}\\) is greater.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\div \\frac{3}{4} = \\frac{5}{6} \\times \\frac{4}{3} = \\frac{20}{18} = \\frac{10}{9} \\approx 1.11\\). \\(\\frac{5}{6} \\times \\frac{3}{4} = \\frac{15}{24} = \\frac{5}{8} = 0.625\\). Division is greater."
      },
      {
        "text": "\\(\\frac{5}{6} \\times \\frac{3}{4}\\) is greater.",
        "correct": false,
        "feedback": "Multiplying by a number less than 1 makes the result *smaller*, not larger — the opposite of what division does here."
      },
      {
        "text": "They are equal.",
        "correct": false,
        "feedback": "The two operations produce different values (\\(\\frac{10}{9}\\) vs \\(\\frac{5}{8}\\))."
      },
      {
        "text": "Cannot be determined without more information.",
        "correct": false,
        "feedback": "Both values can be computed exactly from the given fractions."
      }
    ],
    "backward": "Computing both operations is the only way to compare.",
    "forward": "Comparison reasoning across operations appears in algebra."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(0.\\overline{4} \\times 1\\frac{1}{2} \\div \\frac{4}{9} = \\frac{4}{9} \\times \\frac{1}{2} \\times \\frac{4}{9} = \\frac{16}{162} = \\frac{8}{81}\\). Identify all errors.",
    "options": [
      {
        "text": "Only the mixed-number conversion is wrong; the division is fine.",
        "correct": false,
        "feedback": "The mixed-number conversion IS wrong — but so is the division step."
      },
      {
        "text": "Only the division is wrong; the mixed-number conversion is fine.",
        "correct": false,
        "feedback": "The division step IS wrong — but so is the conversion."
      },
      {
        "text": "Both are wrong. \\(1\\frac{1}{2} = \\frac{3}{2}\\) (not \\(\\frac{1}{2}\\)), and the divisor should be flipped (\\(\\times \\frac{9}{4}\\)). Correct value: \\(\\frac{3}{2}\\).",
        "correct": true,
        "feedback": "Correct. Two errors: (i) \\(1\\frac{1}{2} = \\frac{3}{2}\\), not \\(\\frac{1}{2}\\); (ii) dividing by \\(\\frac{4}{9}\\) requires multiplying by \\(\\frac{9}{4}\\), not by \\(\\frac{4}{9}\\). Correct computation: \\(\\frac{4}{9} \\times \\frac{3}{2} \\times \\frac{9}{4} = \\frac{108}{72} = \\frac{3}{2}\\)."
      },
      {
        "text": "The working is entirely correct.",
        "correct": false,
        "feedback": "The working has two errors and does not produce the correct value."
      }
    ],
    "backward": "Error-spotting across two distinct skills.",
    "forward": "Verification discipline needed for algebra."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{3}\\) to a fraction, then divide by \\(2\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{27}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{3} \\div \\frac{9}{4} = \\frac{1}{3} \\times \\frac{4}{9} = \\frac{4}{27}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{1}{3} \\times \\frac{9}{4} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{27}{4}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{4}{27} \\to \\frac{27}{4}\\))."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{1}{3}\\))."
      }
    ],
    "backward": "Conversion + mixed + flip.",
    "forward": "Rate problems with mixed representations."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{8} \\div \\frac{15}{16} \\times \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{8} \\times \\frac{16}{15} = \\frac{2}{3}\\). Then \\(\\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Stopped after the division (\\(\\frac{2}{3}\\))."
      },
      {
        "text": "\\(\\frac{25}{64}\\)",
        "correct": false,
        "feedback": "Multiplied all three without flipping: \\(\\frac{5}{8} \\times \\frac{15}{16} \\times \\frac{2}{3} = \\frac{25}{64}\\)."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{4}{9} \\to \\frac{9}{4}\\))."
      }
    ],
    "backward": "Divide then multiply, left to right.",
    "forward": "Chained fraction operations."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{2}{3} \\div \\left(\\frac{1}{2} + \\frac{1}{6}\\right) - \\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. Bracket = \\(\\frac{2}{3}\\). \\(\\frac{2}{3} \\div \\frac{2}{3} = 1\\). Then \\(1 - \\frac{1}{4} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Forgot to subtract \\(\\frac{1}{4}\\) — stopped at 1."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{3}{4} \\to \\frac{4}{3}\\))."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{1}{2}\\) instead of \\(\\frac{1}{4}\\): \\(1 - \\frac{1}{2} = \\frac{1}{2}\\)."
      }
    ],
    "backward": "Bracket overrides precedence.",
    "forward": "Nested operations appear in algebra."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "What fraction, when divided by \\(\\frac{5}{8}\\), gives \\(\\frac{3}{4}\\)?",
    "options": [
      {
        "text": "\\(\\frac{15}{32}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\square \\div \\frac{5}{8} = \\frac{3}{4}\\), so \\(\\square = \\frac{3}{4} \\times \\frac{5}{8} = \\frac{15}{32}\\)."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Divided instead of multiplied: \\(\\frac{3}{4} \\div \\frac{5}{8} = \\frac{3}{4} \\times \\frac{8}{5} = \\frac{6}{5}\\). To isolate the unknown, multiply both sides by \\(\\frac{5}{8}\\)."
      },
      {
        "text": "\\(\\frac{32}{15}\\)",
        "correct": false,
        "feedback": "Inverted the correct answer (\\(\\frac{15}{32} \\to \\frac{32}{15}\\))."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Ignored the \\(\\frac{5}{8}\\) divisor — just returned the target value."
      }
    ],
    "backward": "Undoing a division requires multiplying — inverse operation.",
    "forward": "Solving for unknowns in algebra."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{1}{3} \\times 1\\frac{1}{2} \\times \\frac{2}{7}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{3} \\times \\frac{3}{2} = \\frac{21}{6} = \\frac{7}{2}\\). Then \\(\\frac{7}{2} \\times \\frac{2}{7} = \\frac{14}{14} = 1\\)."
      },
      {
        "text": "\\(\\frac{7}{2}\\)",
        "correct": false,
        "feedback": "Stopped after two factors (\\(\\frac{7}{3} \\times \\frac{3}{2} = \\frac{7}{2}\\))."
      },
      {
        "text": "\\(\\frac{7}{4}\\)",
        "correct": false,
        "feedback": "Halved the two-factor result (\\(\\frac{7}{2} \\to \\frac{7}{4}\\))."
      },
      {
        "text": "\\(\\frac{49}{4}\\)",
        "correct": false,
        "feedback": "Flipped the last factor: \\(\\frac{7}{3} \\times \\frac{3}{2} \\times \\frac{7}{2} = \\frac{49}{4}\\). Multiplication does not flip."
      }
    ],
    "backward": "3-factor multiply with mixed numbers.",
    "forward": "Reciprocal pairs in algebra."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Two students compute \\(0.\\overline{4} \\times 2\\frac{1}{4} \\div \\frac{2}{3}\\).<br>Alice: \\(\\frac{4}{9} \\times \\frac{9}{4} \\times \\frac{3}{2} = 1 \\times \\frac{3}{2} = \\frac{3}{2}\\)<br>Ben: \\(\\frac{4}{9} \\times \\frac{9}{4} \\times \\frac{2}{3} = 1 \\times \\frac{2}{3} = \\frac{2}{3}\\)<br>Who is correct, and why?",
    "options": [
      {
        "text": "Alice — she flipped the divisor to \\(\\frac{3}{2}\\). The correct value is \\(\\frac{3}{2}\\).",
        "correct": true,
        "feedback": "Correct. Alice flipped the divisor \\(\\frac{2}{3} \\to \\frac{3}{2}\\) before multiplying, giving \\(\\frac{3}{2}\\). Ben multiplied by \\(\\frac{2}{3}\\) (the divisor as-is) instead of flipping, giving \\(\\frac{2}{3}\\)."
      },
      {
        "text": "Ben — his answer \\(\\frac{2}{3}\\) is correct.",
        "correct": false,
        "feedback": "Ben forgot to flip the divisor — his value \\(\\frac{2}{3}\\) is wrong."
      },
      {
        "text": "Both are valid; the problem has multiple valid values.",
        "correct": false,
        "feedback": "A single mathematical expression has one correct value, not multiple."
      },
      {
        "text": "Neither; the true value is \\(\\frac{8}{9}\\).",
        "correct": false,
        "feedback": "\\(\\frac{8}{9}\\) is not the correct value — the correct value is \\(\\frac{3}{2}\\)."
      }
    ],
    "backward": "Verifying a multi-step working line by line.",
    "forward": "This verification discipline underpins algebraic manipulation."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{45}\\) to a fraction, then divide by \\(1\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{10}{33}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{45} = \\frac{5}{11}\\). \\(\\frac{5}{11} \\div \\frac{3}{2} = \\frac{5}{11} \\times \\frac{2}{3} = \\frac{10}{33}\\)."
      },
      {
        "text": "\\(\\frac{15}{22}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{5}{11} \\times \\frac{3}{2} = \\frac{15}{22}\\)."
      },
      {
        "text": "\\(\\frac{33}{10}\\)",
        "correct": false,
        "feedback": "Inverted the final result."
      },
      {
        "text": "\\(\\frac{5}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{5}{11}\\))."
      }
    ],
    "backward": "Two-digit conversion + mixed + flip.",
    "forward": "Rate problems."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{5}{8} \\times \\frac{6}{25} \\div \\frac{3}{10}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{8} \\times \\frac{6}{25} = \\frac{30}{200} = \\frac{3}{20}\\). \\(\\frac{3}{20} \\div \\frac{3}{10} = \\frac{3}{20} \\times \\frac{10}{3} = \\frac{30}{60} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": false,
        "feedback": "Stopped after the multiplication (\\(\\frac{3}{20}\\))."
      },
      {
        "text": "\\(\\frac{9}{200}\\)",
        "correct": false,
        "feedback": "Multiplied at the final step instead of dividing: \\(\\frac{3}{20} \\times \\frac{3}{10} = \\frac{9}{200}\\)."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{1}{2} \\to 2\\))."
      }
    ],
    "backward": "Multiply-then-divide chain.",
    "forward": "Chained operations in algebra."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(1\\frac{1}{2} \\div \\frac{2}{3} \\times \\frac{3}{4} = \\frac{3}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} = \\frac{3}{4}\\). Identify the error.",
    "options": [
      {
        "text": "The student didn't flip the divisor \\(\\frac{2}{3}\\). Correct: \\(\\frac{3}{2} \\times \\frac{3}{2} \\times \\frac{3}{4} = \\frac{27}{16}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{2} \\div \\frac{2}{3} = \\frac{3}{2} \\times \\frac{3}{2} = \\frac{9}{4}\\). Then \\(\\frac{9}{4} \\times \\frac{3}{4} = \\frac{27}{16}\\). The student multiplied by \\(\\frac{2}{3}\\) (unflipped divisor) instead of \\(\\frac{3}{2}\\)."
      },
      {
        "text": "The student flipped the wrong fraction — should have flipped \\(\\frac{3}{4}\\) too.",
        "correct": false,
        "feedback": "Only the divisor \\(\\frac{2}{3}\\) should be flipped — not \\(\\frac{3}{4}\\) (a multiplier)."
      },
      {
        "text": "The student's arithmetic is wrong — \\(\\frac{3}{2} \\times \\frac{2}{3} \\times \\frac{3}{4}\\) should be \\(\\frac{27}{16}\\), not \\(\\frac{3}{4}\\).",
        "correct": false,
        "feedback": "The student's arithmetic at each step is fine; the error is the missing flip."
      },
      {
        "text": "The working is correct — the answer \\(\\frac{3}{4}\\) is right.",
        "correct": false,
        "feedback": "The working is not correct — the division step is wrong."
      }
    ],
    "backward": "Keep-change-flip discipline.",
    "forward": "This error class repeats in algebra."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(\\frac{10}{21} \\div \\frac{15}{14}\\)?",
    "options": [
      {
        "text": "Flip divisor and cancel: \\(\\frac{10}{21} \\times \\frac{14}{15}\\). Cancel 10 with 15 and 14 with 21. Result: \\(\\frac{4}{9}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{10}{21} \\times \\frac{14}{15} = \\frac{4}{9}\\)."
      },
      {
        "text": "Multiply without flipping: \\(\\frac{10}{21} \\times \\frac{15}{14} = \\frac{25}{49}\\).",
        "correct": false,
        "feedback": "Multiplication instead of division — produces \\(\\frac{25}{49}\\)."
      },
      {
        "text": "Flip both: \\(\\frac{21}{10} \\times \\frac{14}{15} = \\frac{49}{25}\\).",
        "correct": false,
        "feedback": "Flipped both — produces \\(\\frac{49}{25}\\)."
      },
      {
        "text": "Flip first: \\(\\frac{21}{10} \\times \\frac{15}{14} = \\frac{9}{4}\\).",
        "correct": false,
        "feedback": "Flipped the wrong fraction — produces \\(\\frac{9}{4}\\)."
      }
    ],
    "backward": "Flip + cancel.",
    "forward": "Division strategy."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Which is greater: \\(\\frac{3}{8} \\times \\frac{4}{5}\\) or \\(\\frac{3}{8} \\div \\frac{4}{5}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{8} \\times \\frac{4}{5}\\) is greater.",
        "correct": false,
        "feedback": "Multiplying by a number less than 1 makes the result *smaller*: \\(\\frac{3}{8} \\times \\frac{4}{5} = \\frac{3}{10} = 0.3\\). Division by a number less than 1 makes it *larger*."
      },
      {
        "text": "\\(\\frac{3}{8} \\div \\frac{4}{5}\\) is greater.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{8} \\times \\frac{4}{5} = \\frac{12}{40} = \\frac{3}{10} = 0.3\\). \\(\\frac{3}{8} \\div \\frac{4}{5} = \\frac{3}{8} \\times \\frac{5}{4} = \\frac{15}{32} \\approx 0.469\\). Division is greater."
      },
      {
        "text": "They are equal.",
        "correct": false,
        "feedback": "The two operations produce different values (\\(\\frac{3}{10}\\) vs \\(\\frac{15}{32}\\))."
      },
      {
        "text": "Cannot be determined without more information.",
        "correct": false,
        "feedback": "Both values can be computed exactly from the given fractions."
      }
    ],
    "backward": "Computing both operations is required for comparison.",
    "forward": "Comparison reasoning in algebra."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A tank is \\(0.\\overline{8}\\) full. You use \\(\\frac{3}{4}\\) of the water. Then you split the remaining water equally between 2 containers. What fraction of the tank's capacity is in each container?",
    "options": [
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{8} = \\frac{8}{9}\\). Remaining after use: \\(\\frac{1}{4} \\times \\frac{8}{9} = \\frac{2}{9}\\). Split by 2: \\(\\frac{1}{9}\\)."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Forgot to split into containers: \\(\\frac{2}{9}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Computed the *used* amount: \\(\\frac{3}{4} \\times \\frac{8}{9} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Took half of \\(\\frac{8}{9}\\) and forgot the \\(\\frac{1}{4}\\) factor: \\(\\frac{4}{9}\\)."
      }
    ],
    "backward": "Three-cluster word problem — conversion, multiply, divide.",
    "forward": "Multi-stage real-world problems."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{54}\\) to a fraction, then multiply by \\(\\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{9}{22}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{54} = \\frac{6}{11}\\). \\(\\frac{6}{11} \\times \\frac{3}{4} = \\frac{18}{44} = \\frac{9}{22}\\)."
      },
      {
        "text": "\\(\\frac{8}{11}\\)",
        "correct": false,
        "feedback": "Flipped second: \\(\\frac{6}{11} \\times \\frac{4}{3} = \\frac{24}{33} = \\frac{8}{11}\\)."
      },
      {
        "text": "\\(\\frac{6}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{6}{11}\\))."
      },
      {
        "text": "\\(\\frac{22}{9}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{9}{22} \\to \\frac{22}{9}\\))."
      }
    ],
    "backward": "Two-digit conversion + multiply.",
    "forward": "Mixed representations in probability."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "What fraction \\(\\square\\) makes \\(\\square \\div \\frac{3}{4} = \\frac{5}{6}\\) true?",
    "options": [
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\square = \\frac{5}{6} \\times \\frac{3}{4} = \\frac{15}{24} = \\frac{5}{8}\\)."
      },
      {
        "text": "\\(\\frac{10}{9}\\)",
        "correct": false,
        "feedback": "Divided instead: \\(\\frac{5}{6} \\div \\frac{3}{4} = \\frac{10}{9}\\). To isolate the unknown, multiply both sides by \\(\\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{8}{5}\\)",
        "correct": false,
        "feedback": "Inverted the correct answer (\\(\\frac{5}{8} \\to \\frac{8}{5}\\))."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Ignored the \\(\\frac{3}{4}\\) divisor — just returned the target value."
      }
    ],
    "backward": "Undoing a division requires multiplication.",
    "forward": "Solving for unknowns in algebra."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(2\\frac{1}{2} \\div \\left(\\frac{3}{4} + \\frac{1}{2}\\right)\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. Bracket = \\(\\frac{5}{4}\\). \\(\\frac{5}{2} \\div \\frac{5}{4} = \\frac{5}{2} \\times \\frac{4}{5} = 2\\)."
      },
      {
        "text": "\\(\\frac{25}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{2} \\times \\frac{5}{4} = \\frac{25}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(2 \\to \\frac{1}{2}\\))."
      },
      {
        "text": "\\(\\frac{5}{2}\\)",
        "correct": false,
        "feedback": "Stopped at the mixed conversion (\\(\\frac{5}{2}\\))."
      }
    ],
    "backward": "Bracket + mixed + flip.",
    "forward": "Precedence and mixed-number handling throughout algebra."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(\\frac{5}{6} \\times \\frac{9}{10} \\div \\frac{3}{4} = \\frac{5}{6} \\times \\frac{9}{10} \\times \\frac{3}{4} = \\frac{135}{240} = \\frac{9}{16}\\). Identify the error.",
    "options": [
      {
        "text": "The student didn't flip the divisor \\(\\frac{3}{4}\\). Correct: \\(\\frac{5}{6} \\times \\frac{9}{10} \\times \\frac{4}{3} = 1\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{9}{10} \\times \\frac{4}{3} = \\frac{180}{180} = 1\\). The student multiplied by \\(\\frac{3}{4}\\) (unflipped divisor) instead of \\(\\frac{4}{3}\\)."
      },
      {
        "text": "The student flipped the wrong fraction — should have flipped \\(\\frac{9}{10}\\) instead.",
        "correct": false,
        "feedback": "Only the divisor (the second term after ÷) gets flipped — not the multiplier \\(\\frac{9}{10}\\)."
      },
      {
        "text": "The student's arithmetic is wrong — the product of numerators should be \\(\\frac{45}{240}\\), not \\(\\frac{135}{240}\\).",
        "correct": false,
        "feedback": "The student's arithmetic is correct (\\(5 \\times 9 \\times 3 = 135\\)); the error is the missing flip."
      },
      {
        "text": "The student should have flipped \\(\\frac{5}{6}\\) first.",
        "correct": false,
        "feedback": "Only the divisor is flipped — not the dividend."
      }
    ],
    "backward": "Keep-change-flip discipline.",
    "forward": "This error class is essential to catch in algebra."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(1\\frac{1}{3} \\times \\frac{3}{4} \\times \\frac{2}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{3} \\times \\frac{3}{4} = 1\\). Then \\(1 \\times \\frac{2}{5} = \\frac{2}{5}\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Stopped after two factors (\\(\\frac{4}{3} \\times \\frac{3}{4} = 1\\))."
      },
      {
        "text": "\\(\\frac{5}{2}\\)",
        "correct": false,
        "feedback": "Inverted the final result (\\(\\frac{2}{5} \\to \\frac{5}{2}\\))."
      },
      {
        "text": "\\(\\frac{1}{10}\\)",
        "correct": false,
        "feedback": "Ignored the whole part of \\(1\\frac{1}{3}\\): \\(\\frac{1}{3} \\times \\frac{3}{4} \\times \\frac{2}{5} = \\frac{1}{10}\\)."
      }
    ],
    "backward": "Reciprocal pair + multiply.",
    "forward": "Reciprocal pairs appear in algebra."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(2\\frac{1}{2} \\times 1\\frac{1}{5} \\div \\frac{3}{4} = \\frac{5}{2} \\times \\frac{6}{5} \\times \\frac{3}{4} = 3 \\times \\frac{3}{4} = \\frac{9}{4}\\). Identify the error.",
    "options": [
      {
        "text": "The student didn't flip the divisor \\(\\frac{3}{4}\\). Correct: \\(3 \\times \\frac{4}{3} = 4\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{2} \\times \\frac{6}{5} = \\frac{30}{10} = 3\\) (correct). \\(3 \\div \\frac{3}{4} = 3 \\times \\frac{4}{3} = 4\\). The student multiplied by the divisor instead of flipping."
      },
      {
        "text": "The student's arithmetic is wrong — \\(\\frac{5}{2} \\times \\frac{6}{5}\\) should be \\(\\frac{3}{2}\\), not 3.",
        "correct": false,
        "feedback": "The student's arithmetic at the first multiplication is correct (\\(\\frac{5}{2} \\times \\frac{6}{5} = 3\\)); the error is the missing flip."
      },
      {
        "text": "The mixed-number conversions are wrong.",
        "correct": false,
        "feedback": "Both conversions (\\(2\\frac{1}{2} = \\frac{5}{2}\\), \\(1\\frac{1}{5} = \\frac{6}{5}\\)) are correct."
      },
      {
        "text": "The working is correct — the answer \\(\\frac{9}{4}\\) is right.",
        "correct": false,
        "feedback": "The working is not correct — the division step is missing the flip."
      }
    ],
    "backward": "Mixed-number conversions + division flip.",
    "forward": "Algebraic chain with mixed-number handling."
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
    title: "Fractions — Problem-Solving & Synthesis",
    subtitle: "Grade 8 · Level 3 · Problem-Solving & Synthesis",
    description: "Synthesis items combining recurring decimals, chained operations, missing-number problems, error-spotting, and word problems with fractions — warm-up, diagnostic, and spaced recheck for synthesis-level fluency.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not timed, not graded. These questions are <em>synthesis</em> items: most combine more than one skill from the chapter, and some ask you to spot errors, compare values, or find a missing number rather than just compute a result. Read each question carefully before starting — the path to the answer is often yours to construct.</p><p>You'll see questions from all six topics. Accuracy matters more than speed.</p>",
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

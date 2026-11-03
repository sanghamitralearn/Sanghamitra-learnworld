// seed/mathSeedCh8FractionsL4.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 8
// (Fractions), Level 4 — converted from the
// standalone diagnostic JSON ch8-fractions-level-4.json.
//
// Run with: node seed/mathSeedCh8FractionsL4.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-8-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 4;

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
    "tier": "S",
    "question": "Convert \\(0.\\overline{6}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{6} = \\frac{6}{9} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.6 = \\frac{3}{5}\\). The bar means the 6 repeats, giving \\(\\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{33}{50}\\)",
        "correct": false,
        "feedback": "Truncated to \\(0.66 = \\frac{33}{50}\\). The repeating block continues."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Inverted: \\(\\frac{3}{2}\\)."
      }
    ],
    "retryHint": "Single-digit repeating decimal → denominator 9.",
    "backward": "Single-digit repeating block → denominator 9.",
    "forward": "Conversion returns in probability."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{3}{4} \\times \\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{4} \\times \\frac{4}{5} = \\frac{3}{5}\\) (the 4s cancel)."
      },
      {
        "text": "\\(\\frac{7}{9}\\)",
        "correct": false,
        "feedback": "Added numerators and denominators: \\(\\frac{7}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": false,
        "feedback": "Multiplied numerators but added denominators: \\(\\frac{12}{9} = \\frac{4}{3}\\)."
      },
      {
        "text": "\\(\\frac{5}{3}\\)",
        "correct": false,
        "feedback": "Inverted: \\(\\frac{5}{3}\\)."
      }
    ],
    "retryHint": "Look for common factors between numerator and denominator before multiplying.",
    "backward": "Cancelling common factors.",
    "forward": "Same rule in algebra."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{1}{2} \\div \\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{2} \\times \\frac{4}{1} = 2\\)."
      },
      {
        "text": "\\(\\frac{1}{8}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{1}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{2}{1} \\times \\frac{1}{4} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(8\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{2}{1} \\times \\frac{4}{1} = 8\\)."
      }
    ],
    "retryHint": "Flip only the divisor.",
    "backward": "Keep-change-flip.",
    "forward": "Ratio problems in Ch11."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{1}{2} + \\frac{1}{4} \\times 3\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{4} \\times 3 = \\frac{3}{4}\\). Then \\(\\frac{1}{2} + \\frac{3}{4} = \\frac{2}{4} + \\frac{3}{4} = \\frac{5}{4}\\)."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\left(\\frac{1}{2} + \\frac{1}{4}\\right) \\times 3 = \\frac{3}{4} \\times 3 = \\frac{9}{4}\\). Multiplication must come before addition."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Computed only the multiplication (\\(\\frac{1}{4} \\times 3 = \\frac{3}{4}\\)) and stopped — the \\(\\frac{1}{2}\\) still needs to be added."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": false,
        "feedback": "Treated the × as ÷: \\(\\frac{1}{4} \\div 3 = \\frac{1}{12}\\), then \\(\\frac{1}{2} + \\frac{1}{12} = \\frac{6}{12} + \\frac{1}{12} = \\frac{7}{12}\\). The operator is multiplication, not division."
      }
    ],
    "retryHint": "Multiplication before addition. The × applies only to the \\(\\frac{1}{4}\\), not the whole expression.",
    "backward": "BIDMAS — multiplication before addition.",
    "forward": "Precedence discipline applies throughout algebra."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "tier": "S",
    "question": "Convert \\(0.\\overline{3}\\) to a fraction.",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{9} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.3\\): \\(\\frac{3}{10}\\)."
      },
      {
        "text": "\\(\\frac{33}{100}\\)",
        "correct": false,
        "feedback": "Truncated \\(0.33 = \\frac{33}{100}\\)."
      },
      {
        "text": "\\(3\\)",
        "correct": false,
        "feedback": "Inverted."
      }
    ],
    "retryHint": "Denominator 9.",
    "backward": "Single-digit → /9.",
    "forward": "Probability."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "tier": "S",
    "question": "Calculate \\(2 \\times \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(2 \\times \\frac{3}{4} = \\frac{6}{4} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{11}{4}\\)",
        "correct": false,
        "feedback": "Added: \\(2 + \\frac{3}{4} = \\frac{11}{4}\\)."
      },
      {
        "text": "\\(\\frac{3}{8}\\)",
        "correct": false,
        "feedback": "Divided by 2 instead of multiplying."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Ignored the 2."
      }
    ],
    "retryHint": "Multiply numerator by 2, keep denominator, simplify.",
    "backward": "Integer × fraction.",
    "forward": "Scaling."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{3}{5} \\div 3\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{5} \\times \\frac{1}{3} = \\frac{1}{5}\\)."
      },
      {
        "text": "\\(\\frac{9}{5}\\)",
        "correct": false,
        "feedback": "Multiplied by 3 without flipping: \\(\\frac{3}{5} \\times \\frac{3}{1} = \\frac{9}{5}\\)."
      },
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{5}{3} \\times \\frac{1}{3} = \\frac{5}{9}\\)."
      },
      {
        "text": "\\(5\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{5}{3} \\times \\frac{3}{1} = 5\\). Only the divisor gets flipped."
      }
    ],
    "retryHint": "Write 3 as \\(\\frac{3}{1}\\), flip to \\(\\frac{1}{3}\\). Only the divisor gets flipped.",
    "backward": "Keep-change-flip.",
    "forward": "Unit-rate."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "tier": "S",
    "question": "Which of these is a valid simplification?",
    "options": [
      {
        "text": "\\(\\frac{2}{5} \\times \\frac{5}{8} = \\frac{1}{4}\\)",
        "correct": true,
        "feedback": "Correct. Cancel 5s: \\(\\frac{2}{8} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{2}{5} + \\frac{5}{8} = \\frac{7}{13}\\)",
        "correct": false,
        "feedback": "Added numerators and denominators — invalid."
      },
      {
        "text": "\\(\\frac{2}{5} - \\frac{5}{8} = 1\\)",
        "correct": false,
        "feedback": "Subtracted numerators and denominators — invalid."
      },
      {
        "text": "\\(\\frac{2}{5} \\div \\frac{5}{8} = \\frac{25}{16}\\)",
        "correct": false,
        "feedback": "Flipped the dividend (the first fraction) instead of the divisor (the second): \\(\\frac{5}{2} \\times \\frac{5}{8} = \\frac{25}{16}\\). Only the divisor gets flipped."
      }
    ],
    "retryHint": "Cancelling is valid only across × and ÷ (after flipping). The divisor is the second fraction.",
    "backward": "Cancelling factors only in products.",
    "forward": "Same rule in algebra."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "tier": "S",
    "question": "Convert \\(0.\\overline{8}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{8}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{8}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.8 = \\frac{4}{5}\\)."
      },
      {
        "text": "\\(\\frac{22}{25}\\)",
        "correct": false,
        "feedback": "Truncated \\(0.88 = \\frac{22}{25}\\)."
      },
      {
        "text": "\\(\\frac{9}{8}\\)",
        "correct": false,
        "feedback": "Inverted."
      }
    ],
    "backward": "/9.",
    "forward": "Probability."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "C",
    "question": "Calculate \\(2\\frac{1}{4} \\div \\frac{3}{8}\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{9}{4} \\times \\frac{8}{3} = \\frac{72}{12} = 6\\)."
      },
      {
        "text": "\\(\\frac{27}{32}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{9}{4} \\times \\frac{3}{8} = \\frac{27}{32}\\)."
      },
      {
        "text": "\\(\\frac{32}{27}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{4}{9} \\times \\frac{8}{3} = \\frac{32}{27}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{4}{9} \\times \\frac{3}{8} = \\frac{12}{72} = \\frac{1}{6}\\). Only the divisor gets flipped."
      }
    ],
    "backward": "Mixed + flip.",
    "forward": "Ratio."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{2}{3} + \\frac{1}{6} \\times 2\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{6} \\times 2 = \\frac{1}{3}\\); \\(\\frac{2}{3} + \\frac{1}{3} = 1\\)."
      },
      {
        "text": "\\(\\frac{5}{3}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\frac{5}{6} \\times 2 = \\frac{5}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Only the multiplication."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Only the addition."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Precedence."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "tier": "T",
    "question": "What is \\(\\frac{4}{9} + \\frac{3}{8}\\)?",
    "options": [
      {
        "text": "\\(\\frac{59}{72}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{32}{72} + \\frac{27}{72} = \\frac{59}{72}\\)."
      },
      {
        "text": "\\(\\frac{35}{24}\\)",
        "correct": false,
        "feedback": "TRAP: cancelled 3 with 9 across an addition: \\(\\frac{4}{3} + \\frac{1}{8} = \\frac{35}{24}\\). Illegal — only factors in products can be cancelled."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Multiplied instead — wrong operation."
      },
      {
        "text": "\\(\\frac{7}{17}\\)",
        "correct": false,
        "feedback": "TRAP: added numerators and denominators: \\(\\frac{7}{17}\\)."
      }
    ],
    "backward": "Common denominator.",
    "forward": "Addition in algebra."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "tier": "C",
    "question": "Calculate \\(1\\frac{1}{3} \\times 2\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{3} \\times \\frac{9}{4} = 3\\)."
      },
      {
        "text": "\\(\\frac{43}{12}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{4}{3} + \\frac{9}{4} = \\frac{43}{12}\\)."
      },
      {
        "text": "\\(\\frac{25}{12}\\)",
        "correct": false,
        "feedback": "Multiplied whole parts and fractional parts separately: \\(2 + \\frac{1}{12} = \\frac{25}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{12}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{1}{3} \\times \\frac{1}{4} = \\frac{1}{12}\\)."
      }
    ],
    "backward": "Mixed conversion.",
    "forward": "Scaling."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "H",
    "question": "Convert \\(0.\\overline{4}\\) to a fraction, then divide by \\(1\\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{15}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{9} \\div \\frac{5}{3} = \\frac{4}{9} \\times \\frac{3}{5} = \\frac{12}{45} = \\frac{4}{15}\\)."
      },
      {
        "text": "\\(\\frac{20}{27}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{4}{9} \\times \\frac{5}{3} = \\frac{20}{27}\\)."
      },
      {
        "text": "\\(\\frac{27}{20}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{9}{4} \\times \\frac{3}{5} = \\frac{27}{20}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{4}{9}\\))."
      }
    ],
    "backward": "Conversion + division.",
    "forward": "Multi-step algebra."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "S",
    "question": "Convert \\(0.\\overline{54}\\) to a fraction, then multiply by \\(\\frac{3}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{9}{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{6}{11} \\times \\frac{3}{2} = \\frac{9}{11}\\)."
      },
      {
        "text": "\\(\\frac{4}{11}\\)",
        "correct": false,
        "feedback": "Flipped second: \\(\\frac{6}{11} \\times \\frac{2}{3} = \\frac{4}{11}\\)."
      },
      {
        "text": "\\(\\frac{6}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{6}{11}\\))."
      },
      {
        "text": "\\(\\frac{11}{4}\\)",
        "correct": false,
        "feedback": "Inverted the conversion: \\(\\frac{11}{6} \\times \\frac{3}{2} = \\frac{11}{4}\\)."
      }
    ],
    "backward": "/99.",
    "forward": "Probability."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "S",
    "question": "Calculate \\(\\frac{3}{4} \\div \\frac{1}{8}\\).",
    "options": [
      {
        "text": "\\(6\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{4} \\times 8 = 6\\)."
      },
      {
        "text": "\\(\\frac{3}{32}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{3}{4} \\times \\frac{1}{8} = \\frac{3}{32}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{4}{3} \\times \\frac{1}{8} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{32}{3}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{4}{3} \\times \\frac{8}{1} = \\frac{32}{3}\\)."
      }
    ],
    "backward": "Flip.",
    "forward": "Unit-rate."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "tier": "C",
    "question": "Calculate \\(\\left(\\frac{1}{2} + \\frac{1}{3}\\right) \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{3}{5} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{7}{10}\\)",
        "correct": false,
        "feedback": "Ignored the bracket: \\(\\frac{1}{2} + \\frac{1}{5} = \\frac{7}{10}\\)."
      },
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": false,
        "feedback": "Only the bracket."
      },
      {
        "text": "\\(\\frac{19}{30}\\)",
        "correct": false,
        "feedback": "Distributed over only the first term: \\(\\frac{3}{10} + \\frac{1}{3} = \\frac{19}{30}\\)."
      }
    ],
    "backward": "Bracket first.",
    "forward": "Nested expressions."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "tier": "C",
    "question": "Which route correctly simplifies \\(\\frac{10}{21} \\times \\frac{14}{15}\\) by cancelling first?",
    "options": [
      {
        "text": "Cancel 10 with 15 and 14 with 21: \\(\\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\).",
        "correct": true,
        "feedback": "Correct. Cancel first: \\(\\frac{4}{9}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{24}{36} = \\frac{2}{3}\\).",
        "correct": false,
        "feedback": "Added numerators and denominators — invalid."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{140}{21} = \\frac{20}{3}\\).",
        "correct": false,
        "feedback": "Multiplied numerators only — invalid."
      },
      {
        "text": "Invert both: \\(\\frac{21}{10} \\times \\frac{15}{14} = \\frac{9}{4}\\).",
        "correct": false,
        "feedback": "Inverted both — invalid for multiplication."
      }
    ],
    "backward": "Cancelling factors.",
    "forward": "Algebra."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "tier": "T",
    "question": "Calculate \\(2\\frac{1}{2} \\times 1\\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{2} \\times \\frac{8}{5} = 4\\)."
      },
      {
        "text": "\\(\\frac{23}{10}\\)",
        "correct": false,
        "feedback": "TRAP: multiplied whole × whole and fraction × fraction: \\(2 + \\frac{3}{10} = \\frac{23}{10}\\). Looks plausible; ignores that mixed numbers must be converted first."
      },
      {
        "text": "\\(\\frac{41}{10}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{5}{2} + \\frac{8}{5} = \\frac{41}{10}\\)."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{1}{2} \\times \\frac{3}{5} = \\frac{3}{10}\\)."
      }
    ],
    "backward": "Mixed conversion.",
    "forward": "Scaling."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "T",
    "question": "Which is larger: \\(\\frac{3}{4} \\times \\frac{8}{9}\\) or \\(\\frac{3}{4} \\div \\frac{8}{9}\\)?",
    "options": [
      {
        "text": "\\(\\frac{3}{4} \\div \\frac{8}{9}\\) is larger.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{4} \\times \\frac{8}{9} = \\frac{2}{3} \\approx 0.667\\). \\(\\frac{3}{4} \\div \\frac{8}{9} = \\frac{27}{32} \\approx 0.844\\). Division is larger."
      },
      {
        "text": "\\(\\frac{3}{4} \\times \\frac{8}{9}\\) is larger.",
        "correct": false,
        "feedback": "TRAP: assumes × always grows the result — false when the multiplier is less than 1."
      },
      {
        "text": "They are equal.",
        "correct": false,
        "feedback": "The two values differ (\\(\\frac{2}{3}\\) vs \\(\\frac{27}{32}\\))."
      },
      {
        "text": "Cannot be determined without more information.",
        "correct": false,
        "feedback": "Both values can be computed exactly."
      }
    ],
    "backward": "Compute both.",
    "forward": "Comparison reasoning."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "C",
    "question": "A student writes \\(0.\\overline{6} \\times 0.\\overline{3} = 0.\\overline{18}\\). What is the true value?",
    "options": [
      {
        "text": "\\(0.\\overline{2}\\) (= \\(\\frac{2}{9}\\))",
        "correct": true,
        "feedback": "Correct. \\(\\frac{2}{3} \\times \\frac{1}{3} = \\frac{2}{9} = 0.\\overline{2}\\)."
      },
      {
        "text": "\\(0.\\overline{18}\\) (= \\(\\frac{2}{11}\\))",
        "correct": false,
        "feedback": "The student's own answer — concatenation error: they multiplied 6×3=18 and wrote it as the repeating block. Recurring decimals cannot be multiplied digit-wise."
      },
      {
        "text": "\\(\\frac{1}{3}\\) (= \\(0.\\overline{3}\\))",
        "correct": false,
        "feedback": "Returned the second factor as a stand-in — not the product."
      },
      {
        "text": "\\(2\\)",
        "correct": false,
        "feedback": "Divided instead of multiplied: \\(\\frac{2}{3} \\div \\frac{1}{3} = 2\\)."
      }
    ],
    "backward": "Convert first, then multiply.",
    "forward": "Recurring decimals don't concatenate like integer digits."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "H",
    "question": "Calculate \\(3\\frac{1}{2} \\div 2\\frac{1}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{2} \\times \\frac{3}{7} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{49}{6}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{7}{2} \\times \\frac{7}{3} = \\frac{49}{6}\\)."
      },
      {
        "text": "\\(\\frac{6}{49}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{2}{7} \\times \\frac{3}{7} = \\frac{6}{49}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{2}{7} \\times \\frac{7}{3} = \\frac{14}{21} = \\frac{2}{3}\\). Only the divisor gets flipped."
      }
    ],
    "backward": "Two mixed + flip + simplify.",
    "forward": "Rate problems."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "tier": "C",
    "question": "Calculate \\(\\frac{1}{2} + \\frac{1}{3} \\times \\frac{6}{7} - \\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{15}{28}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{3} \\times \\frac{6}{7} = \\frac{2}{7}\\). Then \\(\\frac{1}{2} + \\frac{2}{7} - \\frac{1}{4} = \\frac{14}{28} + \\frac{8}{28} - \\frac{7}{28} = \\frac{15}{28}\\)."
      },
      {
        "text": "\\(\\frac{13}{28}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\frac{5}{6} \\times \\frac{6}{7} - \\frac{1}{4} = \\frac{5}{7} - \\frac{1}{4} = \\frac{13}{28}\\)."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": false,
        "feedback": "Ignored the × entirely: \\(\\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} = \\frac{7}{12}\\)."
      },
      {
        "text": "\\(\\frac{11}{14}\\)",
        "correct": false,
        "feedback": "Stopped before \\(-\\frac{1}{4}\\): \\(\\frac{1}{2} + \\frac{2}{7} = \\frac{11}{14}\\)."
      }
    ],
    "backward": "BIDMAS three operations.",
    "forward": "Precedence."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "T",
    "question": "A student writes: \\(\\frac{3}{8} \\times \\frac{16}{9} = \\frac{3 \\times 16}{8 \\times 9} = \\frac{48}{72} = \\frac{2}{3}\\). Where is the error?",
    "options": [
      {
        "text": "No error — the working is correct.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3 \\times 16}{8 \\times 9} = \\frac{48}{72} = \\frac{2}{3}\\) — all correct."
      },
      {
        "text": "The student should have cancelled 3 with 9 first.",
        "correct": false,
        "feedback": "TRAP: cancelling first is more efficient but not required — the multiplication is valid."
      },
      {
        "text": "\\(\\frac{48}{72}\\) does not equal \\(\\frac{2}{3}\\).",
        "correct": false,
        "feedback": "TRAP: \\(\\frac{48}{72} \\div 24 = \\frac{2}{3}\\) — the simplification is correct."
      },
      {
        "text": "The multiplication \\(\\frac{3 \\times 16}{8 \\times 9}\\) is incorrect.",
        "correct": false,
        "feedback": "TRAP: the multiplication is correctly written."
      }
    ],
    "backward": "Verifying multi-step working.",
    "forward": "Verification discipline in algebra."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "tier": "C",
    "question": "Calculate \\(2\\frac{2}{3} \\times 1\\frac{1}{2} \\times \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{8}{3} \\times \\frac{3}{2} \\times \\frac{3}{4} = \\frac{72}{24} = 3\\)."
      },
      {
        "text": "\\(4\\)",
        "correct": false,
        "feedback": "Stopped after two factors: \\(\\frac{8}{3} \\times \\frac{3}{2} = 4\\)."
      },
      {
        "text": "\\(\\frac{16}{3}\\)",
        "correct": false,
        "feedback": "Flipped the last factor: \\(\\frac{8}{3} \\times \\frac{3}{2} \\times \\frac{4}{3} = \\frac{16}{3}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{2}{3} \\times \\frac{1}{2} \\times \\frac{3}{4} = \\frac{1}{4}\\)."
      }
    ],
    "backward": "Mixed + 3-factor multiply.",
    "forward": "Multi-factor scaling."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "tier": "C",
    "question": "A student writes: \\(0.\\overline{4} \\div \\frac{5}{6} = \\frac{4}{9} \\times \\frac{5}{6} = \\frac{20}{54} = \\frac{10}{27}\\). Identify the error.",
    "options": [
      {
        "text": "The student didn't flip the divisor. Correct: \\(\\frac{4}{9} \\times \\frac{6}{5} = \\frac{8}{15}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{9} \\times \\frac{6}{5} = \\frac{24}{45} = \\frac{8}{15}\\). The student multiplied by the divisor unflipped."
      },
      {
        "text": "The conversion \\(0.\\overline{4} = \\frac{4}{9}\\) is wrong.",
        "correct": false,
        "feedback": "The conversion is correct."
      },
      {
        "text": "The arithmetic \\(\\frac{4}{9} \\times \\frac{5}{6} = \\frac{20}{54}\\) is wrong.",
        "correct": false,
        "feedback": "\\(\\frac{4}{9} \\times \\frac{5}{6} = \\frac{20}{54}\\) is correct."
      },
      {
        "text": "The simplification \\(\\frac{20}{54} = \\frac{10}{27}\\) is wrong.",
        "correct": false,
        "feedback": "\\(\\frac{20}{54} = \\frac{10}{27}\\) is correct."
      }
    ],
    "backward": "Keep-change-flip discipline.",
    "forward": "Verification in algebra."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "tier": "S",
    "question": "Convert \\(0.\\overline{27}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{27}{99} = \\frac{3}{11}\\)."
      },
      {
        "text": "\\(\\frac{27}{100}\\)",
        "correct": false,
        "feedback": "Terminating \\(0.27\\)."
      },
      {
        "text": "\\(\\frac{27}{10}\\)",
        "correct": false,
        "feedback": "Wrong power of 10."
      },
      {
        "text": "\\(\\frac{11}{3}\\)",
        "correct": false,
        "feedback": "Inverted."
      }
    ],
    "backward": "/99 for two-digit blocks.",
    "forward": "Probability."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "tier": "S",
    "question": "Calculate \\(1\\frac{1}{2} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{2} \\times \\frac{4}{3} = 2\\)."
      },
      {
        "text": "\\(\\frac{9}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{3}{2} \\times \\frac{3}{4} = \\frac{9}{8}\\)."
      },
      {
        "text": "\\(\\frac{8}{9}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{2}{3} \\times \\frac{4}{3} = \\frac{8}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{2}\\)."
      }
    ],
    "backward": "Mixed + flip.",
    "forward": "Rate problems."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{5}\\) to a fraction, then multiply by \\(\\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{9} \\times \\frac{3}{5} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{25}{27}\\)",
        "correct": false,
        "feedback": "Flipped second: \\(\\frac{5}{9} \\times \\frac{5}{3} = \\frac{25}{27}\\)."
      },
      {
        "text": "\\(\\frac{5}{9}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{5}{9}\\))."
      },
      {
        "text": "\\(\\frac{27}{25}\\)",
        "correct": false,
        "feedback": "Inverted conversion: \\(\\frac{9}{5} \\times \\frac{3}{5} = \\frac{27}{25}\\)."
      }
    ],
    "backward": "Conversion + multiply.",
    "forward": "Probability."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(3\\frac{1}{3} \\div 2\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{4}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{10}{3} \\times \\frac{2}{5} = \\frac{4}{3}\\)."
      },
      {
        "text": "\\(\\frac{25}{3}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{10}{3} \\times \\frac{5}{2} = \\frac{25}{3}\\)."
      },
      {
        "text": "\\(\\frac{3}{25}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{3}{10} \\times \\frac{2}{5} = \\frac{3}{25}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{3}{10} \\times \\frac{5}{2} = \\frac{15}{20} = \\frac{3}{4}\\). Only the divisor gets flipped."
      }
    ],
    "backward": "Mixed + flip.",
    "forward": "Rate problems."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{2}{3} + \\frac{1}{2} \\times \\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{16}{15}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{1}{2} \\times \\frac{4}{5} = \\frac{2}{5}\\). \\(\\frac{2}{3} + \\frac{2}{5} = \\frac{16}{15}\\)."
      },
      {
        "text": "\\(\\frac{14}{15}\\)",
        "correct": false,
        "feedback": "Added first: \\(\\frac{7}{6} \\times \\frac{4}{5} = \\frac{14}{15}\\)."
      },
      {
        "text": "\\(\\frac{2}{5}\\)",
        "correct": false,
        "feedback": "Only the multiplication."
      },
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": false,
        "feedback": "Only the addition."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Precedence."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route correctly computes \\(\\frac{8}{15} \\div \\frac{4}{9}\\) by cancelling after flipping?",
    "options": [
      {
        "text": "\\(\\frac{8}{15} \\times \\frac{9}{4}\\), cancel 8 with 4 and 9 with 15 → \\(\\frac{6}{5}\\).",
        "correct": true,
        "feedback": "Correct. Cancel after flipping: \\(\\frac{8}{15} \\times \\frac{9}{4} = \\frac{6}{5}\\)."
      },
      {
        "text": "Multiply without flipping: \\(\\frac{8}{15} \\times \\frac{4}{9} = \\frac{32}{135}\\).",
        "correct": false,
        "feedback": "Multiplied without flipping."
      },
      {
        "text": "Flip both: \\(\\frac{15}{8} \\times \\frac{9}{4} = \\frac{135}{32}\\).",
        "correct": false,
        "feedback": "Flipped both."
      },
      {
        "text": "Flip first only: \\(\\frac{15}{8} \\times \\frac{4}{9} = \\frac{5}{6}\\).",
        "correct": false,
        "feedback": "Flipped first only."
      }
    ],
    "backward": "Flip + cancel.",
    "forward": "Algebra."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(1\\frac{2}{5} \\times \\frac{5}{7}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{5} \\times \\frac{5}{7} = 1\\)."
      },
      {
        "text": "\\(\\frac{49}{25}\\)",
        "correct": false,
        "feedback": "Flipped second: \\(\\frac{7}{5} \\times \\frac{7}{5} = \\frac{49}{25}\\)."
      },
      {
        "text": "\\(\\frac{2}{7}\\)",
        "correct": false,
        "feedback": "Ignored whole part: \\(\\frac{2}{5} \\times \\frac{5}{7} = \\frac{2}{7}\\)."
      },
      {
        "text": "\\(\\frac{74}{35}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{7}{5} + \\frac{5}{7} = \\frac{74}{35}\\)."
      }
    ],
    "backward": "Reciprocals.",
    "forward": "Algebra."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes: \\(0.\\overline{4} \\times 2\\frac{1}{4} = \\frac{4}{9} \\times \\frac{9}{4} = 1\\). Is this correct?",
    "options": [
      {
        "text": "Yes — the working and answer are both correct.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{4}{9} \\times \\frac{9}{4} = 1\\)."
      },
      {
        "text": "No — \\(0.\\overline{4} \\times 2\\frac{1}{4}\\) is much larger.",
        "correct": false,
        "feedback": "The product of two numbers under 2.25 that reduce to 1 is correct."
      },
      {
        "text": "No — \\(0.\\overline{4}\\) is not \\(\\frac{4}{9}\\).",
        "correct": false,
        "feedback": "The conversion is correct."
      },
      {
        "text": "No — \\(2\\frac{1}{4}\\) is not \\(\\frac{9}{4}\\).",
        "correct": false,
        "feedback": "The mixed conversion is correct."
      }
    ],
    "backward": "Verifying multi-step working.",
    "forward": "Verification discipline."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{45}\\) to a fraction, then divide by \\(\\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{25}{33}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{11} \\times \\frac{5}{3} = \\frac{25}{33}\\)."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Multiplied: \\(\\frac{5}{11} \\times \\frac{3}{5} = \\frac{3}{11}\\)."
      },
      {
        "text": "\\(\\frac{5}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion."
      },
      {
        "text": "\\(\\frac{11}{3}\\)",
        "correct": false,
        "feedback": "Inverted conversion: \\(\\frac{11}{5} \\times \\frac{5}{3} = \\frac{11}{3}\\)."
      }
    ],
    "backward": "Conversion + flip.",
    "forward": "Rate problems."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(\\frac{7}{8} \\div \\frac{21}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{8} \\times \\frac{4}{21} = \\frac{28}{168} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{147}{32}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{7}{8} \\times \\frac{21}{4} = \\frac{147}{32}\\)."
      },
      {
        "text": "\\(\\frac{32}{147}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{8}{7} \\times \\frac{4}{21} = \\frac{32}{147}\\)."
      },
      {
        "text": "\\(6\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{8}{7} \\times \\frac{21}{4} = \\frac{168}{28} = 6\\). Only the divisor gets flipped."
      }
    ],
    "backward": "Flip + cancel.",
    "forward": "Unit-rate."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{2}{5} \\times 1\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{18}{5}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{12}{5} \\times \\frac{3}{2} = \\frac{36}{10} = \\frac{18}{5}\\)."
      },
      {
        "text": "\\(\\frac{11}{5}\\)",
        "correct": false,
        "feedback": "Multiplied whole parts and fractional parts separately: \\(2 + \\frac{2}{5} \\times \\frac{1}{2} = 2 + \\frac{2}{10} = 2 + \\frac{1}{5} = \\frac{11}{5}\\)."
      },
      {
        "text": "\\(\\frac{39}{10}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{12}{5} + \\frac{3}{2} = \\frac{24}{10} + \\frac{15}{10} = \\frac{39}{10}\\)."
      },
      {
        "text": "\\(\\frac{1}{5}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{2}{5} \\times \\frac{1}{2} = \\frac{2}{10} = \\frac{1}{5}\\)."
      }
    ],
    "backward": "Mixed conversion + multiply.",
    "forward": "Scaling."
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
        "feedback": "Correct. \\(\\frac{5}{6} \\times \\frac{9}{10} = \\frac{3}{4}\\), then \\(\\frac{3}{4} \\times \\frac{4}{3} = 1\\). The student multiplied by \\(\\frac{3}{4}\\) (unflipped divisor) instead of \\(\\frac{4}{3}\\)."
      },
      {
        "text": "The arithmetic \\(\\frac{5}{6} \\times \\frac{9}{10}\\) is wrong.",
        "correct": false,
        "feedback": "The multiplication is correct (\\(\\frac{5}{6} \\times \\frac{9}{10} = \\frac{3}{4}\\))."
      },
      {
        "text": "The simplification \\(\\frac{135}{240} = \\frac{9}{16}\\) is wrong.",
        "correct": false,
        "feedback": "\\(\\frac{135}{240} \\div 15 = \\frac{9}{16}\\) — the simplification is correct."
      },
      {
        "text": "The working is entirely correct.",
        "correct": false,
        "feedback": "The division step has the error."
      }
    ],
    "backward": "Keep-change-flip.",
    "forward": "Verification in algebra."
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
    title: "Fractions — Speed & Strategy",
    subtitle: "Grade 8 · Level 4 · Speed & Strategy · Olympiad Simulation",
    description: "A 25-minute timed diagnostic mixing Speed, Core, Challenge and Trap items across every fractions cluster.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a <strong>timed diagnostic — 20 questions in 25 minutes.</strong></p><p>Three things before you begin:</p><ul><li><strong>Skip is available.</strong> If a question is taking too long, skip it and return if there's time.</li><li><strong>Some items contain traps</strong> — watch for stems that say 'cancel first', 'is larger', 'spot the error', or 'which route'. Read carefully before computing.</li><li><strong>Bank quick wins early.</strong> The first few questions are the S-tier fast items — solve them confidently, don't second-guess.</li></ul><p>The clock starts when you press Start.</p>",
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

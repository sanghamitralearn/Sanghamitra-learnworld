// seed/mathSeedCh8FractionsL2.js
//
// Populates math_chapters and math_questions with Grade 8, Chapter 8
// (Fractions), Level 2 — converted from the
// standalone diagnostic JSON ch8-fractions-level-2.json.
//
// Run with: node seed/mathSeedCh8FractionsL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-8";
const GRADE_LABEL = "Grade 8";
const CHAPTER_SLUG = "ch-8-fractions";
const CHAPTER_NAME = "Fractions";
const LEVEL = 2;

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
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{1}{2} \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(2\\frac{1}{2} = \\frac{5}{2}\\). Then \\(\\frac{5}{2} \\times \\frac{3}{5} = \\frac{15}{10} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{31}{10}\\)",
        "correct": false,
        "feedback": "Added instead of multiplying: \\(\\frac{5}{2} + \\frac{3}{5} = \\frac{25}{10} + \\frac{6}{10} = \\frac{31}{10}\\)."
      },
      {
        "text": "\\(\\frac{3}{10}\\)",
        "correct": false,
        "feedback": "Ignored the whole-number part: \\(\\frac{1}{2} \\times \\frac{3}{5} = \\frac{3}{10}\\)."
      },
      {
        "text": "\\(\\frac{25}{6}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{5}{2} \\times \\frac{5}{3} = \\frac{25}{6}\\). Multiplication does not flip."
      }
    ],
    "retryHint": "Convert the mixed number to an improper fraction first, then multiply.",
    "backward": "Converting mixed numbers — the same first step as adding mixed numbers.",
    "forward": "Multiplying a mixed number by a fraction appears in scaling recipes and rates."
  },
  {
    "itemId": "w2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(1\\frac{1}{2} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(1\\frac{1}{2} = \\frac{3}{2}\\). Then \\(\\frac{3}{2} \\times \\frac{4}{3} = \\frac{12}{6} = 2\\)."
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
        "feedback": "Flipped both fractions: \\(\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}\\)."
      }
    ],
    "retryHint": "Convert \\(1\\frac{1}{2}\\) to \\(\\frac{3}{2}\\), then change ÷ to × and flip the second fraction.",
    "backward": "Converting mixed numbers to improper fractions.",
    "forward": "Division by a fraction underlies scale-factor problems in enlargement."
  },
  {
    "itemId": "w3",
    "order": 3,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{81}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{9}{11}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.8181...\\), so \\(100x = 81.8181...\\). Subtracting: \\(99x = 81\\), so \\(x = \\frac{81}{99} = \\frac{9}{11}\\)."
      },
      {
        "text": "\\(\\frac{81}{100}\\)",
        "correct": false,
        "feedback": "Read \\(0.81\\) as terminating — but the bar means both digits repeat forever. \\(\\frac{81}{100} = 0.81\\) exactly."
      },
      {
        "text": "\\(\\frac{81}{10}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 100. The repeating block is two digits, so ×100 is needed."
      },
      {
        "text": "\\(\\frac{11}{9}\\)",
        "correct": false,
        "feedback": "Inverted. Solving \\(99x = 81\\) gives \\(\\frac{9}{11}\\), not \\(\\frac{11}{9}\\)."
      }
    ],
    "retryHint": "The repeating block has two digits, so multiply by 100, not 10. Then subtract \\(x\\) from \\(100x\\).",
    "backward": "Multiplying by 100 shifts the decimal two places — same as ×100 in Ch3.",
    "forward": "Recurring-decimal conversion appears in probability and ratio."
  },
  {
    "itemId": "w4",
    "order": 4,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\left(\\frac{1}{3} + \\frac{1}{6}\\right) \\times \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": true,
        "feedback": "Correct. Bracket first: \\(\\frac{1}{3} + \\frac{1}{6} = \\frac{2}{6} + \\frac{1}{6} = \\frac{1}{2}\\). Then \\(\\frac{1}{2} \\times \\frac{2}{3} = \\frac{1}{3}\\)."
      },
      {
        "text": "\\(\\frac{4}{9}\\)",
        "correct": false,
        "feedback": "Ignored the brackets: \\(\\frac{1}{3} + \\frac{1}{6} \\times \\frac{2}{3} = \\frac{1}{3} + \\frac{2}{18} = \\frac{6}{18} + \\frac{2}{18} = \\frac{8}{18} = \\frac{4}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{1}{2}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{1}{27}\\)",
        "correct": false,
        "feedback": "Multiplied all three fractions: \\(\\frac{1}{3} \\times \\frac{1}{6} \\times \\frac{2}{3} = \\frac{2}{54} = \\frac{1}{27}\\)."
      }
    ],
    "retryHint": "Do the bracket first, then multiply the result by \\(\\frac{2}{3}\\).",
    "backward": "Brackets override precedence — same rule as integer expressions.",
    "forward": "Brackets inside fractions appear in algebraic manipulation."
  },
  {
    "itemId": "w5",
    "order": 5,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route has cancelled common factors before multiplying \\(\\frac{4}{9} \\times \\frac{15}{8}\\)?",
    "options": [
      {
        "text": "Cancel 4 with 8 (→ 1 and 2) and 15 with 9 (→ 5 and 3), giving \\(\\frac{1}{3} \\times \\frac{5}{2} = \\frac{5}{6}\\).",
        "correct": true,
        "feedback": "Correct. Cancelling 4 with 8 (÷4) and 15 with 9 (÷3) gives \\(\\frac{1}{3} \\times \\frac{5}{2} = \\frac{5}{6}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{4 + 15}{9 + 8} = \\frac{19}{17}\\).",
        "correct": false,
        "feedback": "Adding numerators and denominators is what you do when combining parts, not for a product. Multiplication uses numerator × numerator and denominator × denominator."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{4 \\times 15}{9} = \\frac{60}{9} = \\frac{20}{3}\\).",
        "correct": false,
        "feedback": "Multiplying numerators but not denominators is not valid. Both parts multiply."
      },
      {
        "text": "Invert both fractions: \\(\\frac{9}{4} \\times \\frac{8}{15} = \\frac{72}{60} = \\frac{6}{5}\\).",
        "correct": false,
        "feedback": "Inverting both fractions is not valid for multiplication — that produces the reciprocal of the correct product."
      }
    ],
    "retryHint": "Look for common factors between a numerator and a denominator — cancel before multiplying.",
    "backward": "Cancelling common factors before multiplying — same rule as simplifying a product.",
    "forward": "Cancelling first keeps numbers small when they grow in ratio and algebra."
  },
  {
    "itemId": "w6",
    "order": 6,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{6}{11}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{54}\\)",
        "correct": true,
        "feedback": "Correct. 6 ÷ 11 = 0.545454..., so the block 54 repeats."
      },
      {
        "text": "\\(0.5\\overline{4}\\)",
        "correct": false,
        "feedback": "\\(0.5\\overline{4} = 0.5444...\\) — only the 4 repeats. The repeating block is 54 (both digits)."
      },
      {
        "text": "\\(0.54\\)",
        "correct": false,
        "feedback": "\\(0.54\\) terminates — but 11 does not divide a power of 10, so the decimal repeats forever."
      },
      {
        "text": "\\(0.\\overline{5}\\)",
        "correct": false,
        "feedback": "\\(0.\\overline{5} = 0.555... = \\frac{5}{9}\\), not \\(\\frac{6}{11}\\)."
      }
    ],
    "retryHint": "Do the long division and watch for the remainder that repeats. The repeating block is two digits.",
    "backward": "Long division — the remainder cycling is what makes the decimal repeat.",
    "forward": "Recognising the repeating block lets us convert back exactly in probability."
  },
  {
    "itemId": "w7",
    "order": 7,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(2\\frac{1}{4} \\div 1\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. Convert both: \\(\\frac{9}{4} \\div \\frac{3}{2} = \\frac{9}{4} \\times \\frac{2}{3} = \\frac{18}{12} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{27}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{9}{4} \\times \\frac{3}{2} = \\frac{27}{8}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{4}{9} \\times \\frac{3}{2} = \\frac{12}{18} = \\frac{2}{3}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Ignored the second mixed number: \\(\\frac{9}{4} \\div 1 = \\frac{9}{4}\\)."
      }
    ],
    "retryHint": "Convert both mixed numbers to improper fractions first, then flip the second and multiply.",
    "backward": "Converting mixed numbers and keep-change-flip.",
    "forward": "Dividing mixed numbers appears in real-world rate problems."
  },
  {
    "itemId": "w8",
    "order": 8,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{1}{2} \\times \\left(\\frac{2}{3} + \\frac{1}{4}\\right)\\).",
    "options": [
      {
        "text": "\\(\\frac{11}{24}\\)",
        "correct": true,
        "feedback": "Correct. Bracket first: \\(\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}\\). Then \\(\\frac{1}{2} \\times \\frac{11}{12} = \\frac{11}{24}\\)."
      },
      {
        "text": "\\(\\frac{7}{12}\\)",
        "correct": false,
        "feedback": "Ignored the brackets: \\(\\frac{1}{2} \\times \\frac{2}{3} + \\frac{1}{4} = \\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}\\)."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{11}{12}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{17}{12}\\)",
        "correct": false,
        "feedback": "Added all three fractions: \\(\\frac{1}{2} + \\frac{2}{3} + \\frac{1}{4} = \\frac{6}{12} + \\frac{8}{12} + \\frac{3}{12} = \\frac{17}{12}\\)."
      }
    ],
    "retryHint": "Do the bracket first, then multiply by \\(\\frac{1}{2}\\).",
    "backward": "Brackets override precedence.",
    "forward": "Nested operations appear in algebraic formulae."
  }
];

const diagnosticItems = [
  {
    "itemId": "d1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{63}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{7}{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(100x = 63.6363...\\), \\(x = 0.6363...\\), \\(99x = 63\\), \\(x = \\frac{63}{99} = \\frac{7}{11}\\)."
      },
      {
        "text": "\\(\\frac{63}{100}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.63\\). The bar means 63 repeats forever."
      },
      {
        "text": "\\(\\frac{63}{10}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 100. The block is two digits."
      },
      {
        "text": "\\(\\frac{11}{7}\\)",
        "correct": false,
        "feedback": "Inverted. \\(99x = 63\\) gives \\(\\frac{7}{11}\\), not \\(\\frac{11}{7}\\)."
      }
    ],
    "backward": "×100 shifts the decimal two places.",
    "forward": "Recurring-decimal conversion returns in probability."
  },
  {
    "itemId": "d2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(1\\frac{1}{2} \\div 2\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{3}{2} \\div \\frac{9}{4} = \\frac{3}{2} \\times \\frac{4}{9} = \\frac{12}{18} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{27}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{3}{2} \\times \\frac{9}{4} = \\frac{27}{8}\\)."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction: \\(\\frac{2}{3} \\times \\frac{9}{4} = \\frac{18}{12} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{8}{27}\\)",
        "correct": false,
        "feedback": "Flipped both: \\(\\frac{2}{3} \\times \\frac{4}{9} = \\frac{8}{27}\\)."
      }
    ],
    "backward": "Keep-change-flip plus mixed conversion.",
    "forward": "Division of fractions underlies Ch11 ratio problems."
  },
  {
    "itemId": "d3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{1}{2} + \\frac{3}{4} \\times \\frac{2}{3} - \\frac{1}{6}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": true,
        "feedback": "Correct. × first: \\(\\frac{3}{4} \\times \\frac{2}{3} = \\frac{6}{12} = \\frac{1}{2}\\). Then \\(\\frac{1}{2} + \\frac{1}{2} - \\frac{1}{6} = 1 - \\frac{1}{6} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\left(\\frac{1}{2} + \\frac{3}{4}\\right) \\times \\frac{2}{3} - \\frac{1}{6} = \\frac{5}{4} \\times \\frac{2}{3} - \\frac{1}{6} = \\frac{10}{12} - \\frac{1}{6} = \\frac{5}{6} - \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{13}{12}\\)",
        "correct": false,
        "feedback": "Ignored the ×: \\(\\frac{1}{2} + \\frac{3}{4} - \\frac{1}{6} = \\frac{6}{12} + \\frac{9}{12} - \\frac{2}{12} = \\frac{13}{12}\\)."
      },
      {
        "text": "\\(1\\)",
        "correct": false,
        "feedback": "Forgot the final subtraction: \\(\\frac{1}{2} + \\frac{1}{2} = 1\\)."
      }
    ],
    "backward": "BIDMAS — three operations in sequence.",
    "forward": "Precedence discipline applies to every algebraic expression."
  },
  {
    "itemId": "d4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route has already cancelled common factors before multiplying \\(\\frac{5}{6} \\times \\frac{3}{10}\\)?",
    "options": [
      {
        "text": "Cancel 5 with 10 (→ 1 and 2) and 3 with 6 (→ 1 and 2), giving \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\).",
        "correct": true,
        "feedback": "Correct. Cancelling 5 with 10 and 3 with 6 gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{5 + 3}{6 + 10} = \\frac{8}{16} = \\frac{1}{2}\\).",
        "correct": false,
        "feedback": "Adding numerators and denominators is the misconception that produces the wrong value \\(\\frac{1}{2}\\)."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{5 \\times 3}{6} = \\frac{15}{6} = \\frac{5}{2}\\).",
        "correct": false,
        "feedback": "Multiplying numerators but not denominators produces \\(\\frac{5}{2}\\), not \\(\\frac{1}{4}\\)."
      },
      {
        "text": "Invert both fractions: \\(\\frac{6}{5} \\times \\frac{10}{3} = \\frac{60}{15} = 4\\).",
        "correct": false,
        "feedback": "Inverting both fractions produces 4 — the reciprocal squared of the correct value."
      }
    ],
    "backward": "Cancelling factors in a product.",
    "forward": "Cancelling first keeps numbers small when they grow in algebra."
  },
  {
    "itemId": "d5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{1}{4} \\times 1\\frac{1}{3}\\).",
    "options": [
      {
        "text": "\\(3\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{9}{4} \\times \\frac{4}{3} = \\frac{36}{12} = 3\\)."
      },
      {
        "text": "\\(\\frac{25}{12}\\)",
        "correct": false,
        "feedback": "Multiplied whole parts and fractional parts separately: \\(2 \\times 1 + \\frac{1}{4} \\times \\frac{1}{3} = 2 + \\frac{1}{12} = \\frac{25}{12}\\)."
      },
      {
        "text": "\\(\\frac{43}{12}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{9}{4} + \\frac{4}{3} = \\frac{27}{12} + \\frac{16}{12} = \\frac{43}{12}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Ignored whole parts: \\(\\frac{1}{4} \\times \\frac{4}{3} = \\frac{1}{3}\\)."
      }
    ],
    "backward": "Converting mixed numbers then multiplying.",
    "forward": "Scaling a mixed quantity by a mixed factor appears in real-world measurements."
  },
  {
    "itemId": "d6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{3}\\) to a fraction, then multiply the result by \\(\\frac{3}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{3} = \\frac{1}{3}\\). Then \\(\\frac{1}{3} \\times \\frac{3}{2} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{2}{9}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{1}{3} \\times \\frac{2}{3} = \\frac{2}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{3}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{1}{3}\\)); multiplication not done."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Treated \\(0.\\overline{3}\\) as \\(1\\): \\(1 \\times \\frac{3}{2} = \\frac{3}{2}\\)."
      }
    ],
    "backward": "Recurring-decimal conversion plus multiplication.",
    "forward": "Multi-step procedures build toward algebraic manipulation."
  },
  {
    "itemId": "d7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{3}{11}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{27}\\)",
        "correct": true,
        "feedback": "Correct. 3 ÷ 11 = 0.272727..., so the block 27 repeats."
      },
      {
        "text": "\\(0.2\\overline{7}\\)",
        "correct": false,
        "feedback": "\\(0.2\\overline{7} = 0.2777...\\) — only the 7 repeats. Both digits repeat."
      },
      {
        "text": "\\(0.27\\)",
        "correct": false,
        "feedback": "\\(0.27\\) terminates — but 11 does not divide a power of 10."
      },
      {
        "text": "\\(0.\\overline{3}\\)",
        "correct": false,
        "feedback": "\\(0.\\overline{3} = \\frac{1}{3}\\), not \\(\\frac{3}{11}\\)."
      }
    ],
    "backward": "Long division.",
    "forward": "Recognising the repeating block lets us convert back to a fraction exactly."
  },
  {
    "itemId": "d8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(1\\frac{1}{4} \\div \\frac{5}{6}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{4} \\div \\frac{5}{6} = \\frac{5}{4} \\times \\frac{6}{5} = \\frac{30}{20} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{25}{24}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{4} \\times \\frac{5}{6} = \\frac{25}{24}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{4}{5} \\times \\frac{5}{6} = \\frac{20}{30} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Ignored the divisor: \\(\\frac{5}{4} \\div 1 = \\frac{5}{4}\\)."
      }
    ],
    "backward": "Keep-change-flip plus mixed conversion.",
    "forward": "Division of mixed numbers appears in real-world rate problems."
  },
  {
    "itemId": "d9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\left(\\frac{2}{3} + \\frac{1}{4}\\right) \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": true,
        "feedback": "Correct. Bracket: \\(\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}\\). Then \\(\\frac{11}{12} \\times \\frac{3}{5} = \\frac{33}{60} = \\frac{11}{20}\\)."
      },
      {
        "text": "\\(\\frac{49}{60}\\)",
        "correct": false,
        "feedback": "Ignored the brackets: \\(\\frac{2}{3} + \\frac{1}{4} \\times \\frac{3}{5} = \\frac{2}{3} + \\frac{3}{20} = \\frac{40}{60} + \\frac{9}{60} = \\frac{49}{60}\\)."
      },
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{11}{12}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{13}{20}\\)",
        "correct": false,
        "feedback": "Distributed × over only the first term: \\(\\frac{2}{3} \\times \\frac{3}{5} + \\frac{1}{4} = \\frac{2}{5} + \\frac{1}{4} = \\frac{8}{20} + \\frac{5}{20} = \\frac{13}{20}\\)."
      }
    ],
    "backward": "Bracket first, then multiply.",
    "forward": "Nested operations appear in formulae."
  },
  {
    "itemId": "d10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route has already cancelled common factors before multiplying \\(\\frac{10}{21} \\times \\frac{14}{15}\\)?",
    "options": [
      {
        "text": "Cancel 10 with 15 (→ 2 and 3) and 14 with 21 (→ 2 and 3), giving \\(\\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{10}{21} \\times \\frac{14}{15} = \\frac{2}{3} \\times \\frac{2}{3} = \\frac{4}{9}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{10 + 14}{21 + 15} = \\frac{24}{36} = \\frac{2}{3}\\).",
        "correct": false,
        "feedback": "Added numerators and denominators — the classic misconception. Produces \\(\\frac{2}{3}\\), not \\(\\frac{4}{9}\\)."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{10 \\times 14}{21} = \\frac{140}{21} = \\frac{20}{3}\\).",
        "correct": false,
        "feedback": "Multiplied numerators only — produces \\(\\frac{20}{3}\\)."
      },
      {
        "text": "Invert both fractions: \\(\\frac{21}{10} \\times \\frac{15}{14} = \\frac{315}{140} = \\frac{9}{4}\\).",
        "correct": false,
        "feedback": "Inverted both — produces \\(\\frac{9}{4}\\)."
      }
    ],
    "backward": "Cancelling factors.",
    "forward": "Cancelling first is essential in algebra."
  },
  {
    "itemId": "d11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(1\\frac{2}{3} \\times 2\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{15}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{3} \\times \\frac{9}{4} = \\frac{45}{12} = \\frac{15}{4}\\)."
      },
      {
        "text": "\\(\\frac{47}{12}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{5}{3} + \\frac{9}{4} = \\frac{20}{12} + \\frac{27}{12} = \\frac{47}{12}\\)."
      },
      {
        "text": "\\(\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Multiplied whole parts and fractional parts separately: \\(1 \\times 2 + \\frac{2}{3} \\times \\frac{1}{4} = 2 + \\frac{2}{12} = \\frac{13}{6}\\)."
      },
      {
        "text": "\\(\\frac{9}{4}\\)",
        "correct": false,
        "feedback": "Ignored the whole part of the first factor: \\(1 \\times \\frac{9}{4} = \\frac{9}{4}\\)."
      }
    ],
    "backward": "Mixed-to-improper conversion then multiplication.",
    "forward": "Scaling mixed quantities appears in ratio."
  },
  {
    "itemId": "d12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{4}\\) to a fraction, then compute \\(\\frac{1}{2} + (\\text{the result}) \\times \\frac{3}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{4} = \\frac{4}{9}\\). Then \\(\\frac{1}{2} + \\frac{4}{9} \\times \\frac{3}{2} = \\frac{1}{2} + \\frac{12}{18} = \\frac{1}{2} + \\frac{2}{3} = \\frac{3}{6} + \\frac{4}{6} = \\frac{7}{6}\\)."
      },
      {
        "text": "\\(\\frac{17}{12}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\left(\\frac{1}{2} + \\frac{4}{9}\\right) \\times \\frac{3}{2} = \\frac{17}{18} \\times \\frac{3}{2} = \\frac{51}{36} = \\frac{17}{12}\\)."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Computed the product only: \\(\\frac{4}{9} \\times \\frac{3}{2} = \\frac{12}{18} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{11}{10}\\)",
        "correct": false,
        "feedback": "Treated \\(0.\\overline{4}\\) as \\(0.4 = \\frac{2}{5}\\): \\(\\frac{1}{2} + \\frac{2}{5} \\times \\frac{3}{2} = \\frac{1}{2} + \\frac{3}{5} = \\frac{5}{10} + \\frac{6}{10} = \\frac{11}{10}\\)."
      }
    ],
    "backward": "Conversion + BIDMAS.",
    "forward": "Multi-step synthesis builds toward algebra."
  },
  {
    "itemId": "d13",
    "order": 13,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{12}\\) to a fraction in simplest form.",
    "options": [
      {
        "text": "\\(\\frac{4}{33}\\)",
        "correct": true,
        "feedback": "Correct. Let \\(x = 0.121212...\\), so \\(100x = 12.1212...\\). Subtracting: \\(99x = 12\\), so \\(x = \\frac{12}{99} = \\frac{4}{33}\\)."
      },
      {
        "text": "\\(\\frac{3}{25}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.12 = \\frac{12}{100} = \\frac{3}{25}\\). The bar means both digits repeat forever, giving \\(\\frac{4}{33}\\)."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 100. The block is two digits, so ×100 is needed."
      },
      {
        "text": "\\(\\frac{33}{4}\\)",
        "correct": false,
        "feedback": "Inverted. Solving \\(99x = 12\\) gives \\(\\frac{4}{33}\\), not \\(\\frac{33}{4}\\)."
      }
    ],
    "backward": "×100 shift for a two-digit block.",
    "forward": "Recurring-decimal conversion returns in probability."
  },
  {
    "itemId": "d14",
    "order": 14,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(2\\frac{1}{2} \\div 1\\frac{1}{4}\\).",
    "options": [
      {
        "text": "\\(2\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{2} \\div \\frac{5}{4} = \\frac{5}{2} \\times \\frac{4}{5} = \\frac{20}{10} = 2\\)."
      },
      {
        "text": "\\(\\frac{25}{8}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{2} \\times \\frac{5}{4} = \\frac{25}{8}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{2}{5} \\times \\frac{5}{4} = \\frac{10}{20} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{5}{2}\\)",
        "correct": false,
        "feedback": "Ignored the second mixed number: \\(\\frac{5}{2} \\div 1 = \\frac{5}{2}\\)."
      }
    ],
    "backward": "Keep-change-flip with mixed conversion.",
    "forward": "Division of fractions appears in unit-rate problems."
  },
  {
    "itemId": "d15",
    "order": 15,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{5}{6} - \\frac{2}{3} \\times \\frac{1}{4} + \\frac{1}{8}\\).",
    "options": [
      {
        "text": "\\(\\frac{19}{24}\\)",
        "correct": true,
        "feedback": "Correct. × first: \\(\\frac{2}{3} \\times \\frac{1}{4} = \\frac{2}{12} = \\frac{1}{6}\\). Then \\(\\frac{5}{6} - \\frac{1}{6} + \\frac{1}{8} = \\frac{4}{6} + \\frac{1}{8} = \\frac{16}{24} + \\frac{3}{24} = \\frac{19}{24}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\left(\\frac{5}{6} - \\frac{2}{3}\\right) \\times \\frac{1}{4} + \\frac{1}{8} = \\frac{1}{6} \\times \\frac{1}{4} + \\frac{1}{8} = \\frac{1}{24} + \\frac{3}{24} = \\frac{4}{24} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{9}{8}\\)",
        "correct": false,
        "feedback": "Added the × part instead of subtracting: \\(\\frac{5}{6} + \\frac{1}{6} + \\frac{1}{8} = 1 + \\frac{1}{8} = \\frac{9}{8}\\)."
      },
      {
        "text": "\\(\\frac{13}{24}\\)",
        "correct": false,
        "feedback": "Subtracted \\(\\frac{1}{8}\\) instead of adding: \\(\\frac{5}{6} - \\frac{1}{6} - \\frac{1}{8} = \\frac{16}{24} - \\frac{3}{24} = \\frac{13}{24}\\)."
      }
    ],
    "backward": "BIDMAS.",
    "forward": "Precedence applies across all rational computations."
  },
  {
    "itemId": "d16",
    "order": 16,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student calculates \\(\\frac{7}{12} \\times \\frac{8}{21}\\) as follows:<br>Line 1: \\(\\frac{7}{12} \\times \\frac{8}{21} = \\frac{7 \\times 8}{12 \\times 21} = \\frac{56}{252}\\)<br>Line 2: \\(\\frac{56}{252} = \\frac{2}{9}\\)<br>Which statement is true?",
    "options": [
      {
        "text": "Both lines are correct, and \\(\\frac{2}{9}\\) is the right answer.",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{12} \\times \\frac{8}{21} = \\frac{56}{252}\\), and \\(\\frac{56}{252}\\) divides by 28 to give \\(\\frac{2}{9}\\). Both lines are mathematically correct."
      },
      {
        "text": "Line 1 has a mathematical error — the student multiplied incorrectly.",
        "correct": false,
        "feedback": "Line 1's arithmetic is correct — the multiplication of numerators and denominators is valid. There is no mathematical error, though cancelling first would be more efficient."
      },
      {
        "text": "Line 2 has an error — \\(\\frac{56}{252}\\) does not equal \\(\\frac{2}{9}\\).",
        "correct": false,
        "feedback": "\\(\\frac{56}{252}\\) does equal \\(\\frac{2}{9}\\) (both reduce to the same value), so the claim in option C is false."
      },
      {
        "text": "The correct answer is \\(\\frac{8}{21}\\), not \\(\\frac{2}{9}\\).",
        "correct": false,
        "feedback": "\\(\\frac{8}{21} \\approx 0.381\\), while \\(\\frac{2}{9} \\approx 0.222\\). The correct product is \\(\\frac{2}{9}\\), not \\(\\frac{8}{21}\\)."
      }
    ],
    "backward": "Verifying multi-step working line by line.",
    "forward": "This verification discipline underpins all algebra."
  },
  {
    "itemId": "d17",
    "order": 17,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(\\frac{3}{8} \\times \\frac{4}{9} \\times \\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{9}\\)",
        "correct": true,
        "feedback": "Correct. Cancel 3 with 9 (→ 1, 3), 4 with 8 (→ 1, 2): \\(\\frac{1}{2} \\times \\frac{1}{3} \\times \\frac{2}{3} = \\frac{2}{18} = \\frac{1}{9}\\)."
      },
      {
        "text": "\\(\\frac{1}{6}\\)",
        "correct": false,
        "feedback": "Multiplied only the first two fractions: \\(\\frac{3}{8} \\times \\frac{4}{9} = \\frac{12}{72} = \\frac{1}{6}\\)."
      },
      {
        "text": "\\(\\frac{59}{108}\\)",
        "correct": false,
        "feedback": "Added the first two, then multiplied by \\(\\frac{2}{3}\\): \\(\\left(\\frac{3}{8} + \\frac{4}{9}\\right) \\times \\frac{2}{3} = \\frac{59}{72} \\times \\frac{2}{3} = \\frac{118}{216} = \\frac{59}{108}\\)."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Multiplied numerators and added denominators: \\(\\frac{3 \\times 4 \\times 2}{8 + 9 + 3} = \\frac{24}{20} = \\frac{6}{5}\\)."
      }
    ],
    "backward": "Cancelling across three fractions.",
    "forward": "Multiple-factor products appear in compound probability."
  },
  {
    "itemId": "d18",
    "order": 18,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "A student writes:<br>\\(0.\\overline{3} \\div \\frac{2}{3} = \\frac{3}{10} \\times \\frac{2}{3} = \\frac{6}{30} = \\frac{1}{5}\\)<br>Which statement is true?",
    "options": [
      {
        "text": "The conversion is the only error — \\(0.\\overline{3}\\) should be \\(\\frac{1}{3}\\), not \\(\\frac{3}{10}\\).",
        "correct": false,
        "feedback": "The conversion is wrong — but it is not the only error. The student also failed to flip the divisor."
      },
      {
        "text": "The division step is the only error — the student should have flipped the divisor.",
        "correct": false,
        "feedback": "The division step is wrong — but it is not the only error. The conversion is also wrong."
      },
      {
        "text": "Both the conversion and the division step are wrong.",
        "correct": true,
        "feedback": "Correct. Both errors are present. (i) Conversion error: \\(0.\\overline{3} = \\frac{1}{3}\\), not \\(\\frac{3}{10}\\). (ii) Division error: \\(\\frac{1}{3} \\div \\frac{2}{3} = \\frac{1}{3} \\times \\frac{3}{2} = \\frac{1}{2}\\), not \\(\\frac{1}{3} \\times \\frac{2}{3}\\). The student failed to flip the divisor. The correct answer is \\(\\frac{1}{2}\\)."
      },
      {
        "text": "The working is correct — the answer \\(\\frac{1}{5}\\) is right.",
        "correct": false,
        "feedback": "The working is not correct. Both the conversion and the division step are wrong."
      }
    ],
    "backward": "Verifying conversion and division independently.",
    "forward": "Error-spotting across two skills is the same discipline needed for algebraic manipulation."
  },
  {
    "itemId": "d19",
    "order": 19,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Which fraction is equal to \\(0.\\overline{24}\\)?",
    "options": [
      {
        "text": "\\(\\frac{8}{33}\\)",
        "correct": true,
        "feedback": "Correct. \\(100x = 24.2424...\\), \\(x = 0.2424...\\), \\(99x = 24\\), \\(x = \\frac{24}{99} = \\frac{8}{33}\\)."
      },
      {
        "text": "\\(\\frac{6}{25}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.24 = \\frac{24}{100} = \\frac{6}{25}\\)."
      },
      {
        "text": "\\(\\frac{12}{5}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 100."
      },
      {
        "text": "\\(\\frac{33}{8}\\)",
        "correct": false,
        "feedback": "Inverted. \\(99x = 24\\) gives \\(\\frac{8}{33}\\), not \\(\\frac{33}{8}\\)."
      }
    ],
    "backward": "×100 shift for a two-digit block.",
    "forward": "Recognising repeating blocks helps convert decimal probabilities to fractions."
  },
  {
    "itemId": "d20",
    "order": 20,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(1\\frac{1}{5} \\div \\frac{3}{10}\\).",
    "options": [
      {
        "text": "\\(4\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{6}{5} \\div \\frac{3}{10} = \\frac{6}{5} \\times \\frac{10}{3} = \\frac{60}{15} = 4\\)."
      },
      {
        "text": "\\(\\frac{9}{25}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{6}{5} \\times \\frac{3}{10} = \\frac{18}{50} = \\frac{9}{25}\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{5}{6} \\times \\frac{3}{10} = \\frac{15}{60} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{6}{5}\\)",
        "correct": false,
        "feedback": "Ignored the divisor: \\(\\frac{6}{5} \\div 1 = \\frac{6}{5}\\)."
      }
    ],
    "backward": "Keep-change-flip with mixed conversion.",
    "forward": "Division of mixed numbers appears in rate problems."
  },
  {
    "itemId": "d21",
    "order": 21,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{3}{8} \\div \\left(\\frac{1}{2} - \\frac{1}{4}\\right)\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": true,
        "feedback": "Correct. Bracket first: \\(\\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}\\). Then \\(\\frac{3}{8} \\div \\frac{1}{4} = \\frac{3}{8} \\times 4 = \\frac{12}{8} = \\frac{3}{2}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\frac{3}{8} \\div \\frac{1}{2} - \\frac{1}{4} = \\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Computed \\(\\frac{3}{8} \\div \\frac{1}{2} = \\frac{3}{4}\\) and stopped."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Added instead of dividing: \\(\\frac{3}{8} + \\frac{1}{4} = \\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}\\)."
      }
    ],
    "backward": "Brackets override precedence.",
    "forward": "Nested operations appear in algebraic manipulation."
  },
  {
    "itemId": "d22",
    "order": 22,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route has cancelled common factors before dividing \\(\\frac{5}{8} \\div \\frac{15}{16}\\)?",
    "options": [
      {
        "text": "Flip the divisor first: \\(\\frac{5}{8} \\times \\frac{16}{15}\\). Cancel 5 with 15 (→ 1 and 3) and 8 with 16 (→ 1 and 2), giving \\(\\frac{1}{3} \\times \\frac{2}{1} = \\frac{2}{3}\\).",
        "correct": true,
        "feedback": "Correct. Flipping the divisor and cancelling gives \\(\\frac{1}{3} \\times \\frac{2}{1} = \\frac{2}{3}\\)."
      },
      {
        "text": "Multiply without flipping: \\(\\frac{5}{8} \\times \\frac{15}{16} = \\frac{75}{128}\\).",
        "correct": false,
        "feedback": "Multiplication instead of division — produces \\(\\frac{75}{128}\\)."
      },
      {
        "text": "Flip both fractions: \\(\\frac{8}{5} \\times \\frac{16}{15} = \\frac{128}{75}\\).",
        "correct": false,
        "feedback": "Flipped both fractions — produces \\(\\frac{128}{75}\\)."
      },
      {
        "text": "Flip the first fraction only: \\(\\frac{8}{5} \\times \\frac{15}{16} = \\frac{120}{80} = \\frac{3}{2}\\).",
        "correct": false,
        "feedback": "Flipped the wrong fraction — produces \\(\\frac{3}{2}\\)."
      }
    ],
    "backward": "Keep-change-flip followed by cancelling factors.",
    "forward": "Division plus cancelling is the strategy behind unit-rate problems in Ch11."
  },
  {
    "itemId": "d23",
    "order": 23,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{1}{3} \\times 1\\frac{1}{2}\\).",
    "options": [
      {
        "text": "\\(\\frac{7}{2}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{3} \\times \\frac{3}{2} = \\frac{21}{6} = \\frac{7}{2}\\)."
      },
      {
        "text": "\\(\\frac{23}{6}\\)",
        "correct": false,
        "feedback": "Added: \\(\\frac{7}{3} + \\frac{3}{2} = \\frac{14}{6} + \\frac{9}{6} = \\frac{23}{6}\\)."
      },
      {
        "text": "\\(\\frac{13}{6}\\)",
        "correct": false,
        "feedback": "Multiplied whole parts and fractional parts separately: \\(2 \\times 1 + \\frac{1}{3} \\times \\frac{1}{2} = 2 + \\frac{1}{6} = \\frac{13}{6}\\)."
      },
      {
        "text": "\\(\\frac{3}{2}\\)",
        "correct": false,
        "feedback": "Ignored the whole part of the first factor: \\(1 \\times \\frac{3}{2} = \\frac{3}{2}\\)."
      }
    ],
    "backward": "Converting both mixed numbers.",
    "forward": "Mixed-number products appear in real-world measurements."
  },
  {
    "itemId": "d24",
    "order": 24,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{6}\\) to a fraction, then divide by \\(2\\frac{1}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{10}{33}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{6} = \\frac{2}{3}\\). Then \\(2\\frac{1}{5} = \\frac{11}{5}\\). So \\(\\frac{2}{3} \\div \\frac{11}{5} = \\frac{2}{3} \\times \\frac{5}{11} = \\frac{10}{33}\\)."
      },
      {
        "text": "\\(\\frac{22}{15}\\)",
        "correct": false,
        "feedback": "Multiplied instead of dividing: \\(\\frac{2}{3} \\times \\frac{11}{5} = \\frac{22}{15}\\). Division requires flipping the divisor."
      },
      {
        "text": "\\(\\frac{2}{3}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{2}{3}\\)) — the division by \\(2\\frac{1}{5}\\) is still to do."
      },
      {
        "text": "\\(\\frac{33}{10}\\)",
        "correct": false,
        "feedback": "Flipped both fractions: \\(\\frac{3}{2} \\times \\frac{11}{5} = \\frac{33}{10}\\). Only the divisor gets flipped."
      }
    ],
    "backward": "Conversion + mixed-number division.",
    "forward": "Multi-step synthesis builds toward algebra."
  }
];

const recheckItems = [
  {
    "itemId": "r1",
    "order": 1,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Convert \\(0.\\overline{72}\\) to a fraction.",
    "options": [
      {
        "text": "\\(\\frac{8}{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(99x = 72\\), \\(x = \\frac{72}{99} = \\frac{8}{11}\\)."
      },
      {
        "text": "\\(\\frac{18}{25}\\)",
        "correct": false,
        "feedback": "Read as terminating \\(0.72 = \\frac{72}{100} = \\frac{18}{25}\\)."
      },
      {
        "text": "\\(\\frac{36}{5}\\)",
        "correct": false,
        "feedback": "Multiplied by 10 instead of 100."
      },
      {
        "text": "\\(\\frac{11}{8}\\)",
        "correct": false,
        "feedback": "Inverted. \\(99x = 72\\) gives \\(\\frac{8}{11}\\), not \\(\\frac{11}{8}\\)."
      }
    ],
    "backward": "Same routine as D1.",
    "forward": "Recurring-decimal conversion returns in probability."
  },
  {
    "itemId": "r2",
    "order": 2,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(1\\frac{2}{3} \\div 1\\frac{1}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{3} \\div \\frac{4}{3} = \\frac{5}{3} \\times \\frac{3}{4} = \\frac{15}{12} = \\frac{5}{4}\\)."
      },
      {
        "text": "\\(\\frac{20}{9}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{5}{3} \\times \\frac{4}{3} = \\frac{20}{9}\\)."
      },
      {
        "text": "\\(\\frac{4}{5}\\)",
        "correct": false,
        "feedback": "Flipped the first fraction only: \\(\\frac{3}{5} \\times \\frac{4}{3} = \\frac{12}{15} = \\frac{4}{5}\\). Only the divisor gets flipped."
      },
      {
        "text": "\\(\\frac{5}{3}\\)",
        "correct": false,
        "feedback": "Ignored the second mixed number: \\(\\frac{5}{3} \\div 1 = \\frac{5}{3}\\)."
      }
    ],
    "backward": "Keep-change-flip with mixed conversion.",
    "forward": "Division of fractions appears in unit-rate problems."
  },
  {
    "itemId": "r3",
    "order": 3,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\frac{1}{2} + \\frac{2}{3} \\times \\left(\\frac{3}{4} - \\frac{1}{4}\\right)\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{6}\\)",
        "correct": true,
        "feedback": "Correct. Bracket: \\(\\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2}\\). × next: \\(\\frac{2}{3} \\times \\frac{1}{2} = \\frac{1}{3}\\). Then \\(\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}\\)."
      },
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": false,
        "feedback": "Ignored the bracket: \\(\\frac{1}{2} + \\frac{2}{3} \\times \\frac{3}{4} - \\frac{1}{4} = \\frac{1}{2} + \\frac{1}{2} - \\frac{1}{4} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{1}{2}\\)) and stopped."
      },
      {
        "text": "\\(\\frac{7}{6}\\)",
        "correct": false,
        "feedback": "Added the first two terms and ignored the rest: \\(\\frac{1}{2} + \\frac{2}{3} = \\frac{7}{6}\\)."
      }
    ],
    "backward": "Brackets plus BIDMAS.",
    "forward": "Precedence discipline applies throughout algebra."
  },
  {
    "itemId": "r4",
    "order": 4,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which of these simplifications is valid?",
    "options": [
      {
        "text": "\\(\\frac{9}{10} \\times \\frac{20}{27} = \\frac{2}{3}\\)",
        "correct": true,
        "feedback": "Correct. Cancelling 9 with 27 and 20 with 10 is valid because they are factors in a product: \\(\\frac{9}{10} \\times \\frac{20}{27} = \\frac{1}{10} \\times \\frac{20}{3} = \\frac{20}{30} = \\frac{2}{3}\\)."
      },
      {
        "text": "\\(\\frac{9}{10} + \\frac{20}{27} = \\frac{1}{10} + \\frac{20}{3}\\)",
        "correct": false,
        "feedback": "Cancelling 9 with 27 across an addition is not valid. Correctly: \\(\\frac{9}{10} + \\frac{20}{27} = \\frac{243}{270} + \\frac{200}{270} = \\frac{443}{270}\\). The cancelled form gives \\(\\frac{1}{10} + \\frac{20}{3} = \\frac{3}{30} + \\frac{200}{30} = \\frac{203}{30}\\) — a different number."
      },
      {
        "text": "\\(\\frac{9}{10} - \\frac{20}{27} = \\frac{1}{10} - \\frac{20}{3}\\)",
        "correct": false,
        "feedback": "Cancelling across a subtraction is not valid. Correctly: \\(\\frac{9}{10} - \\frac{20}{27} = \\frac{243}{270} - \\frac{200}{270} = \\frac{43}{270}\\). The cancelled form gives \\(\\frac{1}{10} - \\frac{20}{3} = \\frac{3}{30} - \\frac{200}{30} = -\\frac{197}{30}\\) — a different number."
      },
      {
        "text": "\\(\\frac{9}{10} \\div \\frac{20}{27} = \\frac{1}{10} \\div \\frac{20}{3}\\)",
        "correct": false,
        "feedback": "Cancelling across a division is not valid until the divisor is flipped. Correctly: \\(\\frac{9}{10} \\div \\frac{20}{27} = \\frac{9}{10} \\times \\frac{27}{20} = \\frac{243}{200}\\). The cancelled form gives \\(\\frac{1}{10} \\div \\frac{20}{3} = \\frac{1}{10} \\times \\frac{3}{20} = \\frac{3}{200}\\) — a different number."
      }
    ],
    "backward": "Cancelling factors only in products.",
    "forward": "The same rule applies in algebra."
  },
  {
    "itemId": "r5",
    "order": 5,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(1\\frac{1}{4} \\times \\frac{3}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{3}{4}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{4} \\times \\frac{3}{5} = \\frac{15}{20} = \\frac{3}{4}\\)."
      },
      {
        "text": "\\(\\frac{25}{12}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{5}{4} \\times \\frac{5}{3} = \\frac{25}{12}\\)."
      },
      {
        "text": "\\(\\frac{3}{20}\\)",
        "correct": false,
        "feedback": "Ignored the whole part: \\(\\frac{1}{4} \\times \\frac{3}{5} = \\frac{3}{20}\\)."
      },
      {
        "text": "\\(\\frac{5}{4}\\)",
        "correct": false,
        "feedback": "Ignored the multiplication by \\(\\frac{3}{5}\\): \\(\\frac{5}{4}\\)."
      }
    ],
    "backward": "Mixed conversion + multiplication.",
    "forward": "Appears in scaling and rate problems."
  },
  {
    "itemId": "r6",
    "order": 6,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{27}\\) to a fraction, then multiply the result by \\(1\\frac{2}{3}\\).",
    "options": [
      {
        "text": "\\(\\frac{5}{11}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{27} = \\frac{3}{11}\\). Then \\(1\\frac{2}{3} = \\frac{5}{3}\\). So \\(\\frac{3}{11} \\times \\frac{5}{3} = \\frac{15}{33} = \\frac{5}{11}\\)."
      },
      {
        "text": "\\(\\frac{9}{55}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{3}{11} \\times \\frac{3}{5} = \\frac{9}{55}\\). Multiplication does not flip."
      },
      {
        "text": "\\(\\frac{3}{11}\\)",
        "correct": false,
        "feedback": "Stopped at the conversion (\\(\\frac{3}{11}\\)) — the multiplication by \\(1\\frac{2}{3}\\) is still to do."
      },
      {
        "text": "\\(\\frac{9}{20}\\)",
        "correct": false,
        "feedback": "Read \\(0.\\overline{27}\\) as terminating \\(0.27 = \\frac{27}{100}\\), then multiplied: \\(\\frac{27}{100} \\times \\frac{5}{3} = \\frac{135}{300} = \\frac{9}{20}\\). The bar means both digits repeat."
      }
    ],
    "backward": "Two-digit repeating block conversion plus multiplication with a mixed-number factor.",
    "forward": "Multi-step synthesis builds toward algebra."
  },
  {
    "itemId": "r7",
    "order": 7,
    "cluster": "C1",
    "clusterName": "Recurring decimals and fractions",
    "question": "Write \\(\\frac{4}{11}\\) as a recurring decimal.",
    "options": [
      {
        "text": "\\(0.\\overline{36}\\)",
        "correct": true,
        "feedback": "Correct. 4 ÷ 11 = 0.363636..., so both digits repeat."
      },
      {
        "text": "\\(0.\\overline{3}\\)",
        "correct": false,
        "feedback": "\\(0.\\overline{3} = \\frac{1}{3}\\), not \\(\\frac{4}{11}\\)."
      },
      {
        "text": "\\(0.36\\)",
        "correct": false,
        "feedback": "\\(0.36\\) terminates — but 11 does not divide a power of 10."
      },
      {
        "text": "\\(0.3\\overline{6}\\)",
        "correct": false,
        "feedback": "\\(0.3\\overline{6} = 0.3666...\\) — only the 6 repeats. Both digits repeat."
      }
    ],
    "backward": "Long division.",
    "forward": "Recognising the block enables exact fraction conversion."
  },
  {
    "itemId": "r8",
    "order": 8,
    "cluster": "C4",
    "clusterName": "Dividing fractions",
    "question": "Calculate \\(2\\frac{1}{3} \\div \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{28}{9}\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{7}{3} \\div \\frac{3}{4} = \\frac{7}{3} \\times \\frac{4}{3} = \\frac{28}{9}\\)."
      },
      {
        "text": "\\(\\frac{7}{4}\\)",
        "correct": false,
        "feedback": "Multiplied without flipping: \\(\\frac{7}{3} \\times \\frac{3}{4} = \\frac{21}{12} = \\frac{7}{4}\\)."
      },
      {
        "text": "\\(\\frac{9}{28}\\)",
        "correct": false,
        "feedback": "Inverted the answer: reciprocal of \\(\\frac{28}{9}\\) is \\(\\frac{9}{28}\\)."
      },
      {
        "text": "\\(\\frac{7}{3}\\)",
        "correct": false,
        "feedback": "Ignored the divisor: \\(\\frac{7}{3} \\div 1 = \\frac{7}{3}\\)."
      }
    ],
    "backward": "Keep-change-flip with mixed conversion.",
    "forward": "Used in rate problems."
  },
  {
    "itemId": "r9",
    "order": 9,
    "cluster": "C2",
    "clusterName": "Order of operations with fractions",
    "question": "Calculate \\(\\left(\\frac{3}{8} + \\frac{1}{4}\\right) \\times \\frac{4}{5}\\).",
    "options": [
      {
        "text": "\\(\\frac{1}{2}\\)",
        "correct": true,
        "feedback": "Correct. Bracket: \\(\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}\\). × next: \\(\\frac{5}{8} \\times \\frac{4}{5} = \\frac{20}{40} = \\frac{1}{2}\\)."
      },
      {
        "text": "\\(\\frac{23}{40}\\)",
        "correct": false,
        "feedback": "Ignored the bracket: \\(\\frac{3}{8} + \\frac{1}{4} \\times \\frac{4}{5} = \\frac{3}{8} + \\frac{1}{5} = \\frac{15}{40} + \\frac{8}{40} = \\frac{23}{40}\\)."
      },
      {
        "text": "\\(\\frac{5}{8}\\)",
        "correct": false,
        "feedback": "Computed the bracket only (\\(\\frac{5}{8}\\))."
      },
      {
        "text": "\\(\\frac{11}{20}\\)",
        "correct": false,
        "feedback": "Distributed × over only the first term: \\(\\frac{3}{8} \\times \\frac{4}{5} + \\frac{1}{4} = \\frac{3}{10} + \\frac{1}{4} = \\frac{6}{20} + \\frac{5}{20} = \\frac{11}{20}\\)."
      }
    ],
    "backward": "Bracket then multiply.",
    "forward": "Appears in formulae."
  },
  {
    "itemId": "r10",
    "order": 10,
    "cluster": "C5",
    "clusterName": "Strategic simplification",
    "question": "Which route has cancelled common factors before multiplying \\(\\frac{5}{14} \\times \\frac{21}{10}\\)?",
    "options": [
      {
        "text": "Cancel 5 with 10 (→ 1 and 2) and 21 with 14 (→ 3 and 2), giving \\(\\frac{1}{2} \\times \\frac{3}{2} = \\frac{3}{4}\\).",
        "correct": true,
        "feedback": "Correct. \\(\\frac{5}{14} \\times \\frac{21}{10} = \\frac{1}{2} \\times \\frac{3}{2} = \\frac{3}{4}\\)."
      },
      {
        "text": "Add numerators and denominators: \\(\\frac{5 + 21}{14 + 10} = \\frac{26}{24} = \\frac{13}{12}\\).",
        "correct": false,
        "feedback": "Added numerators and denominators → \\(\\frac{13}{12}\\), a wrong misconception."
      },
      {
        "text": "Multiply numerators only: \\(\\frac{5 \\times 21}{14} = \\frac{105}{14} = \\frac{15}{2}\\).",
        "correct": false,
        "feedback": "Multiplied numerators only → \\(\\frac{15}{2}\\)."
      },
      {
        "text": "Invert both fractions: \\(\\frac{14}{5} \\times \\frac{10}{21} = \\frac{140}{105} = \\frac{4}{3}\\).",
        "correct": false,
        "feedback": "Inverted both → \\(\\frac{4}{3}\\)."
      }
    ],
    "backward": "Cancelling factors.",
    "forward": "Cancelling first is essential in algebra."
  },
  {
    "itemId": "r11",
    "order": 11,
    "cluster": "C3",
    "clusterName": "Multiplying fractions",
    "question": "Calculate \\(2\\frac{2}{3} \\times \\frac{3}{8}\\).",
    "options": [
      {
        "text": "\\(1\\)",
        "correct": true,
        "feedback": "Correct. \\(\\frac{8}{3} \\times \\frac{3}{8} = \\frac{24}{24} = 1\\)."
      },
      {
        "text": "\\(\\frac{1}{4}\\)",
        "correct": false,
        "feedback": "Ignored the whole part: \\(\\frac{2}{3} \\times \\frac{3}{8} = \\frac{6}{24} = \\frac{1}{4}\\)."
      },
      {
        "text": "\\(\\frac{64}{9}\\)",
        "correct": false,
        "feedback": "Flipped the second fraction: \\(\\frac{8}{3} \\times \\frac{8}{3} = \\frac{64}{9}\\)."
      },
      {
        "text": "\\(\\frac{73}{24}\\)",
        "correct": false,
        "feedback": "Added instead of multiplying: \\(\\frac{8}{3} + \\frac{3}{8} = \\frac{64}{24} + \\frac{9}{24} = \\frac{73}{24}\\)."
      }
    ],
    "backward": "Mixed conversion; the fractions are reciprocal.",
    "forward": "Reciprocal pairs appear in algebra."
  },
  {
    "itemId": "r12",
    "order": 12,
    "cluster": "C6",
    "clusterName": "Mixed fraction problems",
    "question": "Convert \\(0.\\overline{5}\\) to a fraction, then compute \\(\\frac{1}{2} + (\\text{the result}) \\times \\frac{3}{4}\\).",
    "options": [
      {
        "text": "\\(\\frac{11}{12}\\)",
        "correct": true,
        "feedback": "Correct. \\(0.\\overline{5} = \\frac{5}{9}\\). Then \\(\\frac{1}{2} + \\frac{5}{9} \\times \\frac{3}{4} = \\frac{1}{2} + \\frac{15}{36} = \\frac{1}{2} + \\frac{5}{12} = \\frac{6}{12} + \\frac{5}{12} = \\frac{11}{12}\\)."
      },
      {
        "text": "\\(\\frac{19}{24}\\)",
        "correct": false,
        "feedback": "Left-to-right: \\(\\left(\\frac{1}{2} + \\frac{5}{9}\\right) \\times \\frac{3}{4} = \\frac{19}{18} \\times \\frac{3}{4} = \\frac{57}{72} = \\frac{19}{24}\\)."
      },
      {
        "text": "\\(\\frac{5}{12}\\)",
        "correct": false,
        "feedback": "Computed the product only: \\(\\frac{5}{9} \\times \\frac{3}{4} = \\frac{15}{36} = \\frac{5}{12}\\)."
      },
      {
        "text": "\\(\\frac{7}{8}\\)",
        "correct": false,
        "feedback": "Treated \\(0.\\overline{5}\\) as \\(0.5 = \\frac{1}{2}\\): \\(\\frac{1}{2} + \\frac{1}{2} \\times \\frac{3}{4} = \\frac{1}{2} + \\frac{3}{8} = \\frac{4}{8} + \\frac{3}{8} = \\frac{7}{8}\\)."
      }
    ],
    "backward": "Conversion + BIDMAS.",
    "forward": "Multi-step synthesis."
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
    title: "Fractions — Advanced Core",
    subtitle: "Grade 8 · Level 2 · Advanced Core",
    description: "Two-step fraction work — mixed-number products and quotients, two-digit recurring blocks, bracketed expressions, and cancelling before multiplying — warm-up, diagnostic, and spaced recheck.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: "<p><strong>Warm-up complete.</strong> The next section is a diagnostic — not a test, not timed. Unlike the warm-up, these questions each chain two steps within the same topic: convert, then operate; or set up, then solve. The goal is to find out which second steps are solid and which still need work.</p><p>You'll see questions from all six topics. Take your time — accuracy matters more than speed here.</p>",
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

// seed/mathSeedCh3FactorsMultiplesL2.js
//
// Populates math_chapters and math_questions with Grade 5, Chapter 3
// (Factors, Multiples & Number Properties), Level 2 — converted from the
// standalone HTML file ch-3-mult-div-num-props-level-2.html.
//
// Run with: node seed/mathSeedCh3FactorsMultiplesL2.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MathChapter = require('../model/MathChapter');
const MathQuestion = require('../model/MathQuestion');

const GRADE = "grade-5";
const GRADE_LABEL = "Grade 5";
const CHAPTER_SLUG = "ch-3-mult-div-num-props";
const CHAPTER_NAME = "Factors, Multiples & Number Properties";
const LEVEL = 2;

const CLUSTER_NAMES = {
  FACT: "Factors & Prime Factorisation",
  MULT: "Multiples & LCM",
  HCF: "Highest Common Factor",
  DIVR: "Divisibility Rules",
  SQNUM: "Square Numbers",
  PATT: "Number Patterns & Sequences"
};

const warmupItems = [
  {
    itemId: "w1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "Write the prime factorisation of 72.",
    options: [
        { text: "2³ × 3²", correct: true, feedback: "72 = 8×9 = 2³×3²." },
        { text: "2² × 3³", correct: false, feedback: "That's 4×27 = 108, not 72." },
        { text: "8 × 9", correct: false, feedback: "8 and 9 are not prime numbers; you must break them down further." },
        { text: "2⁶ × 3", correct: false, feedback: "2⁶=64, 64×3=192, not 72." }
      ],
    retryHint: "Break 72 into 8×9, then factor 8 (2³) and 9 (3²)."
  },
  {
    itemId: "w2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the LCM of 6 and 8 using prime factorisation.",
    options: [
        { text: "24", correct: true, feedback: "6=2×3, 8=2³; LCM = 2³×3 = 24." },
        { text: "48", correct: false, feedback: "That's the product 6×8, not the LCM." },
        { text: "2", correct: false, feedback: "That's the HCF, not the LCM." },
        { text: "12", correct: false, feedback: "12 is a multiple of 6 but not of 8." }
      ],
    retryHint: "For LCM, take the highest power of each prime: 2³ (from 8) and 3 (from 6)."
  },
  {
    itemId: "w3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the HCF of 48 and 60 using prime factorisation.",
    options: [
        { text: "12", correct: true, feedback: "48=2⁴×3, 60=2²×3×5; HCF = 2²×3 = 12." },
        { text: "6", correct: false, feedback: "6 is common, but 12 is larger and also common." },
        { text: "24", correct: false, feedback: "24 is a factor of 48 but not of 60." },
        { text: "120", correct: false, feedback: "That's the LCM, not the HCF." }
      ],
    retryHint: "For HCF, take the lowest power of each common prime: 2² (not 2⁴) and 3."
  },
  {
    itemId: "w4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest digit □ so that the number 5□4 is divisible by 3.",
    options: [
        { text: "0", correct: true, feedback: "Digit sum = 5+0+4 = 9, divisible by 3." },
        { text: "1", correct: false, feedback: "Sum = 10, not a multiple of 3." },
        { text: "2", correct: false, feedback: "Sum = 11." },
        { text: "4", correct: false, feedback: "Sum = 13." }
      ],
    retryHint: "The digit sum 5+□+4 = 9+□ must be a multiple of 3. Smallest □ is 0."
  },
  {
    itemId: "w5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "√? = 15. Find the number.",
    options: [
        { text: "225", correct: true, feedback: "15² = 15 × 15 = 225." },
        { text: "30", correct: false, feedback: "That's 2×15, not 15²." },
        { text: "150", correct: false, feedback: "That's 10×15." },
        { text: "125", correct: false, feedback: "Incorrect square." }
      ],
    retryHint: "Square root asks: what number multiplied by itself gives the number? 15² = 225."
  },
  {
    itemId: "w6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 1, 2, 3, 5, 8, ___ — what comes next?",
    options: [
        { text: "13", correct: true, feedback: "Fibonacci: each term is the sum of the previous two. 5+8 = 13." },
        { text: "11", correct: false, feedback: "Adding 3 to 8 gives 11, but that's not the rule." },
        { text: "10", correct: false, feedback: "No, check the pattern again." },
        { text: "12", correct: false, feedback: "8+4=12, but the rule is adding the previous term." }
      ],
    retryHint: "Look at pairs: 1+1=2, 1+2=3, 2+3=5, 3+5=8, so 5+8 = ?"
  },
  {
    itemId: "w7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many distinct prime factors does 100 have?",
    options: [
        { text: "2", correct: true, feedback: "100 = 2² × 5². Distinct primes: 2 and 5. So 2 distinct primes." },
        { text: "4", correct: false, feedback: "You counted the total exponents, not distinct primes." },
        { text: "1", correct: false, feedback: "100 has more than one prime factor." },
        { text: "3", correct: false, feedback: "Only 2 and 5 appear." }
      ],
    retryHint: "Prime factorise: 100=2²×5². List the unique primes: {2,5}."
  },
  {
    itemId: "w8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The LCM of 9 and another number is 36. The other number is between 1 and 10. Find it.",
    options: [
        { text: "4", correct: true, feedback: "LCM(9,4) = 36. 9=3², 4=2²; LCM = 2²×3² = 36." },
        { text: "6", correct: false, feedback: "LCM(9,6) = 18, not 36." },
        { text: "12", correct: false, feedback: "12 is not between 1 and 10." },
        { text: "2", correct: false, feedback: "LCM(9,2) = 18." }
      ],
    retryHint: "Test each option: which number gives LCM=36 with 9? 9=3², 36=2²×3², so the number must provide 2²."
  }
];

const diagnosticItems = [
  {
    itemId: "d1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number has prime factorisation 2ᵃ × 3² × 5. It has exactly 12 factors. Find a.",
    options: [
        { text: "1", correct: true, feedback: "Number of factors = (a+1)(2+1)(1+1) = (a+1)×3×2 = 6(a+1). Set =12 → a+1=2 → a=1." },
        { text: "2", correct: false, feedback: "If a=2, factors = (3)×3×2 = 18, not 12." },
        { text: "0", correct: false, feedback: "If a=0, factors = (1)×3×2 = 6." },
        { text: "3", correct: false, feedback: "a=3 gives (4)×3×2 = 24." }
      ],
    backward: "Formula: (exponent+1) multiplied across all primes gives total factor count.",
    forward: "Factor counting is used in combinatorics and number theory."
  },
  {
    itemId: "d2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Two numbers have product 180 and LCM 60. What is their HCF?",
    options: [
        { text: "3", correct: true, feedback: "Product = HCF × LCM → 180 = HCF × 60 → HCF = 180 ÷ 60 = 3." },
        { text: "6", correct: false, feedback: "6×60 = 360, not 180." },
        { text: "30", correct: false, feedback: "30×60 = 1800." },
        { text: "60", correct: false, feedback: "60×60 = 3600." }
      ],
    backward: "Remember: product of two numbers = HCF × LCM.",
    forward: "This relationship is a fundamental number-theory identity."
  },
  {
    itemId: "d3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "The HCF of two numbers is 9. Their sum is 63 and their difference is 9. Find the larger number.",
    options: [
        { text: "36", correct: true, feedback: "Let numbers = 9a,9b. a+b=7, a-b=1 → a=4,b=3. Numbers 36,27; larger = 36." },
        { text: "27", correct: false, feedback: "That's the smaller number." },
        { text: "45", correct: false, feedback: "45+18=63, but difference 27, not 9." },
        { text: "18", correct: false, feedback: "18+? =63, difference not 9." }
      ],
    backward: "Represent numbers as HCF × co-prime factors, then use sum/difference to find the factors.",
    forward: "Leads to solving linear equations in two variables."
  },
  {
    itemId: "d4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest digit □ so that 4,□32 is divisible by both 3 and 4.",
    options: [
        { text: "0", correct: true, feedback: "Last two digits 32 → divisible by 4. Digit sum 4+□+3+2 = 9+□ must be multiple of 3. Smallest □=0." },
        { text: "3", correct: false, feedback: "3 works (sum 12), but 0 is smaller." },
        { text: "2", correct: false, feedback: "Sum = 11, not multiple of 3." },
        { text: "1", correct: false, feedback: "Sum = 10, not multiple of 3." }
      ],
    backward: "Apply each divisibility rule separately, then find the smallest digit that satisfies both.",
    forward: "Combining rules is common in puzzle and Olympiad problems."
  },
  {
    itemId: "d5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Which of these is a perfect square?",
    options: [
        { text: "2⁴ × 5²", correct: true, feedback: "All exponents (4,2) are even, so it's a perfect square." },
        { text: "2² × 3³", correct: false, feedback: "Exponent of 3 is 3 (odd), not a perfect square." },
        { text: "2³ × 3²", correct: false, feedback: "Exponent of 2 is 3 (odd)." },
        { text: "2² × 3 × 5", correct: false, feedback: "Exponents of 3 and 5 are 1 (odd)." }
      ],
    backward: "In prime factorisation, every exponent must be even for the number to be a perfect square.",
    forward: "Connects squares to prime factors; used when simplifying radicals."
  },
  {
    itemId: "d6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "Find the next term: 2, 5, 11, 23, 47, ___",
    options: [
        { text: "95", correct: true, feedback: "Rule: ×2 + 1. 47×2 = 94; 94+1 = 95." },
        { text: "94", correct: false, feedback: "You only doubled 47, forgot to add 1." },
        { text: "96", correct: false, feedback: "47×2 + 2 = 96, not the rule." },
        { text: "70", correct: false, feedback: "Not following the ×2+1 pattern." }
      ],
    backward: "Check the step: 2×2+1=5, 5×2+1=11, 11×2+1=23. So multiply by 2 then add 1.",
    forward: "Two-step rules prepare for functions and algebraic expressions."
  },
  {
    itemId: "d7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number between 40 and 50 is divisible by 7 but not by 2. What is its prime factorisation?",
    options: [
        { text: "7²", correct: true, feedback: "Numbers in range: 41-49. Divisible by 7: 42 (even, excluded), 49 (odd, 7²)." },
        { text: "2 × 23", correct: false, feedback: "46 is in range and even, but the condition says not divisible by 2." },
        { text: "2 × 3 × 7", correct: false, feedback: "42 is in range but even." },
        { text: "7", correct: false, feedback: "7 is not between 40 and 50." }
      ],
    backward: "List numbers in the range, filter by the conditions, then prime factorise.",
    forward: "Descriptive problems build logical filtering and number sense."
  },
  {
    itemId: "d8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Two bells ring every 15 minutes and 25 minutes. They ring together at 12 noon. When will they next ring together?",
    options: [
        { text: "1:15 PM", correct: true, feedback: "LCM(15,25) = 75 minutes. 12:00 + 75 min = 1:15 PM." },
        { text: "12:40 PM", correct: false, feedback: "That's 40 minutes, not a common multiple." },
        { text: "1:00 PM", correct: false, feedback: "60 minutes, not a multiple of 25." },
        { text: "12:50 PM", correct: false, feedback: "50 minutes, not a multiple of 15." }
      ],
    backward: "Find the LCM of the two intervals to know when they coincide again.",
    forward: "Scheduling and rhythm problems use LCM regularly."
  },
  {
    itemId: "d9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Find the largest number that divides 56, 98, and 126 exactly.",
    options: [
        { text: "14", correct: true, feedback: "56=2³×7, 98=2×7², 126=2×3²×7; HCF = 2×7 = 14." },
        { text: "7", correct: false, feedback: "7 is a divisor, but 14 is larger and also divides all." },
        { text: "28", correct: false, feedback: "28 does not divide 98 (98÷28=3.5)." },
        { text: "2", correct: false, feedback: "2 divides all, but 14 is larger." }
      ],
    backward: "The greatest common divisor is the HCF of the three numbers.",
    forward: "Used to simplify ratios and fractions with multiple numbers."
  },
  {
    itemId: "d10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the digit □ so that 7□,345 is divisible by 9 and ends with 5.",
    options: [
        { text: "8", correct: true, feedback: "Digit sum = 7+□+3+4+5 = 19+□. Divisible by 9 → sum=27 → □=8. Already ends in 5." },
        { text: "0", correct: false, feedback: "Sum = 19, not multiple of 9." },
        { text: "1", correct: false, feedback: "Sum = 20." },
        { text: "2", correct: false, feedback: "Sum = 21." }
      ],
    backward: "Apply divisibility by 9 (digit sum multiple of 9) and by 5 (ends in 0 or 5).",
    forward: "Multiple constraints in one puzzle sharpen logical thinking."
  },
  {
    itemId: "d11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "√(16 × 25) = ?",
    options: [
        { text: "20", correct: true, feedback: "16×25 = 400; √400 = 20. Or √16×√25 = 4×5 = 20." },
        { text: "40", correct: false, feedback: "You might have doubled 20." },
        { text: "200", correct: false, feedback: "You multiplied 16 and 25 and divided by 2? Not correct." },
        { text: "400", correct: false, feedback: "That's the product, not the square root." }
      ],
    backward: "Either multiply first then square root, or square root each factor then multiply.",
    forward: "Simplifying radicals and working with square roots."
  },
  {
    itemId: "d12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 4, 9, 16, 25, … What is the 10th term?",
    options: [
        { text: "100", correct: true, feedback: "The sequence is n². 10² = 100." },
        { text: "90", correct: false, feedback: "Not a square." },
        { text: "110", correct: false, feedback: "Not a square." },
        { text: "121", correct: false, feedback: "That's 11², the 11th term." }
      ],
    backward: "Recognise the pattern: 1², 2², 3², 4², 5², … The nth term is n².",
    forward: "Explicit formulas for sequences are the beginning of algebraic thinking."
  },
  {
    itemId: "d13", order: 13, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number = 2² × 3 × 5². How many factors does it have?",
    options: [
        { text: "18", correct: true, feedback: "(2+1)(1+1)(2+1) = 3×2×3 = 18." },
        { text: "12", correct: false, feedback: "You might have used (2)(1)(2)=4? Incorrect formula." },
        { text: "15", correct: false, feedback: "Off by 3." },
        { text: "24", correct: false, feedback: "Maybe you added exponents instead of multiplying (exponent+1)." }
      ],
    backward: "Use (a+1)(b+1)(c+1) where a,b,c are exponents.",
    forward: "Direct application of combinatorics: choosing how many of each prime factor to include."
  },
  {
    itemId: "d14", order: 14, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Find the LCM of 2³ × 3 and 2 × 3² × 5.",
    options: [
        { text: "360", correct: true, feedback: "Highest powers: 2³, 3², 5. 2³×3²×5 = 8×9×5 = 360." },
        { text: "2³ × 3²", correct: false, feedback: "You missed the factor 5." },
        { text: "2 × 3", correct: false, feedback: "That's the HCF." },
        { text: "2³ × 3 × 5", correct: false, feedback: "You missed the 3² (only took 3¹)." }
      ],
    backward: "For LCM, take the maximum exponent for each prime that appears.",
    forward: "Prime factorisation simplifies LCM for large numbers."
  },
  {
    itemId: "d15", order: 15, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Two co-prime numbers multiply to 35. Both are greater than 1. What is their sum?",
    options: [
        { text: "12", correct: true, feedback: "Co-prime with product 35: 5×7. Sum = 5+7 = 12." },
        { text: "6", correct: false, feedback: "That would be 1×35, but both >1." },
        { text: "10", correct: false, feedback: "2×5=10, not 35." },
        { text: "35", correct: false, feedback: "That's the product, not the sum." }
      ],
    backward: "Co-prime means HCF=1. The prime factors give the numbers directly.",
    forward: "Co-primality is used in fraction simplification."
  },
  {
    itemId: "d16", order: 16, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which statement is FALSE? A) Divisible by 6 → divisible by 2 and 3. B) Divisible by 4 → divisible by 8. C) Divisible by 9 → divisible by 3. D) Ending in 0 → divisible by 2 and 5.",
    options: [
        { text: "B", correct: true, feedback: "Example: 12 is divisible by 4 but not by 8. The implication is false." },
        { text: "A", correct: false, feedback: "True: if divisible by 6, it's even (so by 2) and digit sum multiple of 3." },
        { text: "C", correct: false, feedback: "True: 9 is a multiple of 3, so any multiple of 9 is also a multiple of 3." },
        { text: "D", correct: false, feedback: "True: ending in 0 means it's even (by 2) and ends in 0 (by 5)." }
      ],
    backward: "Test each statement with a counter-example. 12 is divisible by 4 but not by 8.",
    forward: "Critical thinking about divisibility implications is important in number theory."
  },
  {
    itemId: "d17", order: 17, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "How many square numbers lie between 50 and 150?",
    options: [
        { text: "5", correct: true, feedback: "8²=64, 9²=81, 10²=100, 11²=121, 12²=144. That's 5 squares." },
        { text: "4", correct: false, feedback: "You might have missed one; list them carefully." },
        { text: "6", correct: false, feedback: "13²=169 >150, so not included." },
        { text: "7", correct: false, feedback: "Way too many." }
      ],
    backward: "Find the smallest integer whose square >50 (8), and the largest whose square <150 (12). Count inclusive.",
    forward: "Estimating square roots and understanding square distributions."
  },
  {
    itemId: "d18", order: 18, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "1, 3, 6, 10, 15, … What is the 8th term? (Triangular numbers)",
    options: [
        { text: "36", correct: true, feedback: "T₈ = 8×9÷2 = 72÷2 = 36." },
        { text: "28", correct: false, feedback: "That's T₇." },
        { text: "45", correct: false, feedback: "That's T₉." },
        { text: "64", correct: false, feedback: "That's 8², not the triangular number." }
      ],
    backward: "Triangular number formula: Tₙ = n(n+1)/2.",
    forward: "Formula-based sequences are a key part of algebra."
  },
  {
    itemId: "d19", order: 19, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "How many even factors does 72 have? (Hint: total factors minus odd factors.)",
    options: [
        { text: "9", correct: true, feedback: "72=2³×3²; total factors = (3+1)(2+1)=12. Odd factors come from 3² only: (2+1)=3. Even factors = 12-3 = 9." },
        { text: "6", correct: false, feedback: "That's half of 12, but not correct." },
        { text: "12", correct: false, feedback: "That includes both even and odd." },
        { text: "8", correct: false, feedback: "Off by 1; check the calculation." }
      ],
    backward: "Even factors = total factors minus number of odd factors. Odd factors come from the odd part of the number.",
    forward: "Classifying factors by parity is a deeper number-theory concept."
  },
  {
    itemId: "d20", order: 20, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "The LCM of 12 and a two-digit number is 60. The number is a multiple of 5, less than 20, and not a multiple of 3. Find the number.",
    options: [
        { text: "10", correct: true, feedback: "10 is <20, multiple of 5, not multiple of 3. LCM(12,10)=60." },
        { text: "15", correct: false, feedback: "15 is a multiple of 3, so excluded." },
        { text: "20", correct: false, feedback: "20 is not less than 20." },
        { text: "5", correct: false, feedback: "5 is not a two-digit number." }
      ],
    backward: "Use the conditions to narrow down, then check LCM.",
    forward: "Reverse LCM problems with constraints build algebraic reasoning."
  },
  {
    itemId: "d21", order: 21, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "A and B are co-prime. A × B = 91. Find A + B.",
    options: [
        { text: "20", correct: true, feedback: "91 = 7×13, co-prime. 7+13 = 20." },
        { text: "14", correct: false, feedback: "7+7=14, but product 49, not 91." },
        { text: "91", correct: false, feedback: "That's the product." },
        { text: "12", correct: false, feedback: "Incorrect." }
      ],
    backward: "Co-prime numbers whose product is given are the prime factors of the product.",
    forward: "Unique factorisation with co-prime condition."
  },
  {
    itemId: "d22", order: 22, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest number between 200 and 300 that is divisible by 2, 3, and 5.",
    options: [
        { text: "210", correct: true, feedback: "Divisible by 2,3,5 → divisible by 30. Multiples of 30: 210,240,270,300. Smallest in range is 210." },
        { text: "200", correct: false, feedback: "200 not divisible by 3." },
        { text: "240", correct: false, feedback: "240 is in range but not the smallest." },
        { text: "300", correct: false, feedback: "300 is in range but not the smallest; also 300 is not <300." }
      ],
    backward: "If a number is divisible by 2,3,5, it must be a multiple of 2×3×5 = 30.",
    forward: "Combining divisibility rules into LCM is a powerful shortcut."
  },
  {
    itemId: "d23", order: 23, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "The area of a square is 289 cm². What is its perimeter?",
    options: [
        { text: "68 cm", correct: true, feedback: "Side = √289 = 17 cm. Perimeter = 4×17 = 68 cm." },
        { text: "17 cm", correct: false, feedback: "That's the side length, not the perimeter." },
        { text: "34 cm", correct: false, feedback: "That's only 2 sides." },
        { text: "72 cm", correct: false, feedback: "Incorrect calculation." }
      ],
    backward: "First find the side using square root, then perimeter = 4 × side.",
    forward: "Geometry and square roots are directly linked."
  },
  {
    itemId: "d24", order: 24, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "First term = 3. Each term = 2 × previous term - 1. Find the 4th term.",
    options: [
        { text: "17", correct: true, feedback: "t1=3; t2=2×3-1=5; t3=2×5-1=9; t4=2×9-1=17." },
        { text: "15", correct: false, feedback: "3,5,9,15? That would be +2,+4,+6, not the rule." },
        { text: "13", correct: false, feedback: "Incorrect recursive calculation." },
        { text: "21", correct: false, feedback: "3-7-15-31? Not correct." }
      ],
    backward: "Apply the rule step-by-step: start with 3, then use the formula to get each next term.",
    forward: "Recursive rules are the foundation of programming and iterative processes."
  }
];

const recheckItems = [
  {
    itemId: "r1", order: 1, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number = 3ᵃ × 5 × 7 has exactly 8 factors. Find a.",
    options: [
        { text: "1", correct: true, feedback: "Factors = (a+1)×2×2 = 4(a+1)=8 → a+1=2 → a=1." },
        { text: "2", correct: false, feedback: "Then 4(3)=12 factors." },
        { text: "0", correct: false, feedback: "4(1)=4 factors." },
        { text: "3", correct: false, feedback: "4(4)=16 factors." }
      ]
  },
  {
    itemId: "r2", order: 2, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Product of two numbers is 240 and LCM is 120. Find their HCF.",
    options: [
        { text: "2", correct: true, feedback: "HCF = 240 ÷ 120 = 2." },
        { text: "60", correct: false, feedback: "Product isn't 60×120." },
        { text: "120", correct: false, feedback: "That's the LCM." },
        { text: "4", correct: false, feedback: "4×120=480." }
      ]
  },
  {
    itemId: "r3", order: 3, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "HCF of two numbers is 12. Sum = 84, difference = 12. Find the larger number.",
    options: [
        { text: "48", correct: true, feedback: "Let numbers = 12a,12b. a+b=7, a-b=1 → a=4,b=3 → numbers 48,36." },
        { text: "36", correct: false, feedback: "Smaller number." },
        { text: "60", correct: false, feedback: "Sum and diff don't match." },
        { text: "24", correct: false, feedback: "Not consistent." }
      ]
  },
  {
    itemId: "r4", order: 4, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Find the smallest digit □ so that 3,2□4 is divisible by both 4 and 9.",
    options: [
        { text: "0", correct: true, feedback: "Last two digits must be divisible by 4: 04 works. Digit sum 3+2+□+4=9+□ must be a multiple of 9 → □=0 (sum 9)." },
        { text: "6", correct: false, feedback: "64 divisible by 4, but sum 15 not a multiple of 9." },
        { text: "9", correct: false, feedback: "94 not divisible by 4." },
        { text: "3", correct: false, feedback: "34 not divisible by 4." }
      ]
  },
  {
    itemId: "r5", order: 5, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "Which is a perfect square?",
    options: [
        { text: "2⁴ × 3²", correct: true, feedback: "Exponents 4 and 2 are even." },
        { text: "2⁶ × 5", correct: false, feedback: "Exponent of 5 is 1 (odd)." },
        { text: "2³ × 3²", correct: false, feedback: "Exponent of 2 is 3." },
        { text: "2 × 3⁴", correct: false, feedback: "Exponent of 2 is 1." }
      ]
  },
  {
    itemId: "r6", order: 6, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "3, 7, 15, 31, ___ — what comes next?",
    options: [
        { text: "63", correct: true, feedback: "Rule: ×2 + 1. 31×2+1=63." },
        { text: "62", correct: false, feedback: "That's ×2 only." },
        { text: "60", correct: false, feedback: "Doesn't follow the rule." },
        { text: "47", correct: false, feedback: "Doesn't follow the rule." }
      ]
  },
  {
    itemId: "r7", order: 7, cluster: "FACT", clusterName: CLUSTER_NAMES.FACT,
    question: "A number between 30 and 40 is divisible by both 4 and 6. Give its prime factorisation.",
    options: [
        { text: "2² × 3²", correct: true, feedback: "36 = 4×9 = 2²×3²." },
        { text: "2⁵", correct: false, feedback: "32 is 2⁵, not divisible by 6." },
        { text: "2 × 17", correct: false, feedback: "34, not divisible by 4 or 6." },
        { text: "3 × 11", correct: false, feedback: "33, not divisible by 4 or 6." }
      ]
  },
  {
    itemId: "r8", order: 8, cluster: "MULT", clusterName: CLUSTER_NAMES.MULT,
    question: "Two bells ring every 12 min and 18 min. They ring together at 10:00 AM. Next together?",
    options: [
        { text: "10:36 AM", correct: true, feedback: "LCM(12,18)=36 minutes." },
        { text: "10:30 AM", correct: false, feedback: "30 is not the LCM." },
        { text: "10:24 AM", correct: false, feedback: "24 is not the LCM." },
        { text: "10:48 AM", correct: false, feedback: "48 is a common multiple but not the least." }
      ]
  },
  {
    itemId: "r9", order: 9, cluster: "HCF", clusterName: CLUSTER_NAMES.HCF,
    question: "Greatest number that divides 36, 60, and 84 exactly?",
    options: [
        { text: "12", correct: true, feedback: "36=2²×3², 60=2²×3×5, 84=2²×3×7; HCF=2²×3=12." },
        { text: "6", correct: false, feedback: "6 divides all but 12 is larger." },
        { text: "18", correct: false, feedback: "18 does not divide 60 exactly." },
        { text: "24", correct: false, feedback: "24 does not divide 36 or 60." }
      ]
  },
  {
    itemId: "r10", order: 10, cluster: "DIVR", clusterName: CLUSTER_NAMES.DIVR,
    question: "Which statement is TRUE? A) Divisible by 8 → divisible by 4. B) Divisible by 4 → divisible by 8. C) Ending in 5 → divisible by 10. D) Divisible by 3 → divisible by 9.",
    options: [
        { text: "A", correct: true, feedback: "If divisible by 8, it's divisible by 2³, so certainly by 2²=4." },
        { text: "B", correct: false, feedback: "12 is divisible by 4 but not 8." },
        { text: "C", correct: false, feedback: "Ends in 5 means not divisible by 2, so not by 10." },
        { text: "D", correct: false, feedback: "3 is divisible by 3 but not 9." }
      ]
  },
  {
    itemId: "r11", order: 11, cluster: "SQNUM", clusterName: CLUSTER_NAMES.SQNUM,
    question: "How many square numbers between 1 and 100 inclusive?",
    options: [
        { text: "10", correct: true, feedback: "1² to 10²: 1,4,9,…,100. That's 10 squares." },
        { text: "9", correct: false, feedback: "You might have excluded 1 or 100." },
        { text: "11", correct: false, feedback: "Too many." },
        { text: "8", correct: false, feedback: "Missing some." }
      ]
  },
  {
    itemId: "r12", order: 12, cluster: "PATT", clusterName: CLUSTER_NAMES.PATT,
    question: "nth term = n² + 1. Find the 5th term.",
    options: [
        { text: "26", correct: true, feedback: "5²+1 = 25+1 = 26." },
        { text: "25", correct: false, feedback: "That's just 5²." },
        { text: "24", correct: false, feedback: "Incorrect." },
        { text: "30", correct: false, feedback: "Incorrect." }
      ]
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
    title: "Factors, Multiples & Number Properties — Advanced Core",
    subtitle: "Telangana & Cambridge · Level 2 · Advanced Core",
    description: "Prime factorisation with exponents, factor counting, LCM/HCF via prime factors, combined divisibility rules, perfect squares, and multi-step patterns.",
    clusterNames: CLUSTER_NAMES,
    gateReviewHTML: '<strong>Quick Review — Multi-Step Number Properties</strong><br>' +
      "&bull; Prime factorisation with exponents: use factor trees; 2³ means 2×2×2.<br>" +
      "&bull; Number of factors = (exponent+1) multiplied across all primes.<br>" +
      "&bull; LCM: take the highest power of each prime factor. HCF: take the lowest power.<br>" +
      "&bull; Useful trick: product of two numbers = LCM × HCF.<br>" +
      "&bull; Combining divisibility rules: for 6, check 2 and 3; for 12, check 4 and 3.<br>" +
      "&bull; Square numbers: all exponents in prime factorisation must be even.<br>" +
      "&bull; Sequences: look for constant difference, doubling, or recursive rules like ×2+1.<br>" +
      "&bull; Triangular numbers: nth term = n(n+1)/2.<br>",
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

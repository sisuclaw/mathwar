"use client";

// Type definitions - moved from SettingsPanel to avoid circular dependency
export type Difficulty = "easy" | "medium" | "hard";
export type ProblemMode =
  | "add"
  | "sub"
  | "mul"
  | "div"
  | "add+sub"
  | "add+mul"
  | "add+div"
  | "sub+mul"
  | "sub+div"
  | "mul+div"
  | "all";

export interface MathProblem {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

function generateProblem(
  difficulty: Difficulty,
  mode: ProblemMode
): MathProblem {
  let operators: string[] = [];
  let maxNum = 10;
  let minNum = 1;
  let answer: number = 0; // Initialize answer to fix TypeScript error

  // Determine operators based on mode
  switch (mode) {
    case "add":
      operators = ["+"];
      break;
    case "sub":
      operators = ["-"];
      break;
    case "mul":
      operators = ["×"];
      break;
    case "div":
      operators = ["÷"];
      break;
    case "add+sub":
      operators = ["+", "-"];
      break;
    case "add+mul":
      operators = ["+", "×"];
      break;
    case "add+div":
      operators = ["+", "÷"];
      break;
    case "sub+mul":
      operators = ["-", "×"];
      break;
    case "sub+div":
      operators = ["-", "÷"];
      break;
    case "mul+div":
      operators = ["×", "÷"];
      break;
    case "all":
      operators = ["+", "-", "×", "÷"];
      break;
  }

  // Determine number range based on difficulty
  switch (difficulty) {
    case "easy":
      maxNum = 10;
      break;
    case "medium":
      maxNum = 50;
      break;
    case "hard":
      maxNum = 100;
      break;
  }

  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  let num2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

  // Generate numbers based on operator
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      // Ensure no negative answers
      if (num1 < num2) {
        [num1, num2] = [num2, num1];
      }
      answer = num1 - num2;
      break;
    case "×":
      // For multiplication, use smaller numbers
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 15) + 1;
      }
      answer = num1 * num2;
      break;
    case "÷":
      // For division, ensure clean division
      // First generate the answer and divisor, then calculate dividend
      let divisor = 12;
      if (difficulty === "medium") {
        divisor = 15;
      } else if (difficulty === "hard") {
        divisor = 20;
      }
      answer = Math.floor(Math.random() * divisor) + 1;
      num2 = Math.floor(Math.random() * divisor) + 1;
      num1 = answer * num2; // Dividend = answer × divisor
      break;
  }

  return { num1, num2, operator, answer };
}

export { generateProblem };

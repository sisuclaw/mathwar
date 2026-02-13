"use client";

import { useState } from "react";
import { MathProblem } from "../lib/mathProblem";

interface TeamPanelProps {
  teamName: string;
  teamColor: "blue" | "red";
  problem: MathProblem | null;
  onAnswer: (answer: number) => void;
  isActive: boolean;
  score: number;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-900",
    border: "border-blue-500",
    text: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  red: {
    bg: "bg-red-900",
    border: "border-red-500",
    text: "text-red-400",
    button: "bg-red-600 hover:bg-red-700",
  },
};

export default function TeamPanel({
  teamName,
  teamColor,
  problem,
  onAnswer,
  isActive,
  score,
}: TeamPanelProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (value: number) => {
    onAnswer(value);
    setInput("");
  };

  const handleNumberClick = (num: string) => {
    if (input.length >= 5) return; // Prevent too long input
    setInput(input + num);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div
      className={`${colorClasses[teamColor].bg} ${colorClasses[teamColor].border} border-4 rounded-xl p-4 flex flex-col`}
    >
      {/* Team Header */}
      <div className="text-center mb-4">
        <h2 className={`text-3xl font-bold ${colorClasses[teamColor].text}`}>
          {teamName}
        </h2>
        <p className="text-4xl font-bold text-white">Score: {score}</p>
      </div>

      {/* Math Problem Display */}
      {problem && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 text-center">
          <div className="text-5xl font-bold text-white mb-2">
            {problem.num1} {problem.operator} {problem.num2} = ?
          </div>
          {isActive && (
            <div className="text-2xl font-bold text-green-400 animate-pulse">
              Jawab Sekarang!
            </div>
          )}
        </div>
      )}

      {/* Answer Input */}
      {problem && (
        <div className="bg-gray-700 rounded-lg p-3 mb-4 text-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-600 text-white text-3xl font-bold w-full text-center rounded p-2"
            placeholder="..."
            disabled={!isActive}
          />
        </div>
      )}

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "OK"].map((key) => (
          <button
            key={key}
            onClick={() => {
              if (key === "Clear") {
                handleClear();
              } else if (key === "OK") {
                handleSubmit(Number.parseInt(input) || 0);
              } else {
                handleNumberClick(String(key));
              }
            }}
            disabled={!isActive}
            className={`${colorClasses[teamColor].button} text-white font-bold py-3 px-4 rounded-lg text-xl transition-all disabled:opacity-50`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

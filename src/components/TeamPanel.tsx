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
    bg: "bg-gradient-to-br from-blue-900/90 to-blue-950/90",
    border: "border-blue-500",
    text: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
    glow: "shadow-blue-500/50",
  },
  red: {
    bg: "bg-gradient-to-br from-red-900/90 to-red-950/90",
    border: "border-red-500",
    text: "text-red-400",
    button: "bg-red-600 hover:bg-red-700 active:bg-red-800",
    glow: "shadow-red-500/50",
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
      className={`${colorClasses[teamColor].bg} ${colorClasses[teamColor].border} border-3 rounded-3xl p-6 backdrop-blur-sm ${
        isActive ? `shadow-2xl ${colorClasses[teamColor].glow}` : "shadow-xl"
      } transition-all duration-300`}
    >
      {/* Team Header */}
      <div className="text-center mb-6">
        <h2 className={`text-3xl md:text-4xl font-bold ${colorClasses[teamColor].text} mb-2`}>
          {teamName}
        </h2>
        <p className="text-5xl md:text-6xl font-black text-white">Score: {score}</p>
      </div>

      {/* Math Problem Display */}
      {problem && (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-6 text-center border-2 border-gray-600">
          <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-wider">
            {problem.num1} {problem.operator} {problem.num2} = ?
          </div>
          {isActive && (
            <div className="text-xl md:text-2xl font-bold text-green-400 animate-pulse">
              Jawab Sekarang!
            </div>
          )}
        </div>
      )}

      {/* Answer Input */}
      {problem && (
        <div className="bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center border-2 border-gray-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-600/90 text-white text-4xl md:text-5xl font-black w-full text-center rounded-xl p-4 border-2 border-gray-500 focus:border-blue-400 focus:outline-none"
            placeholder="..."
            disabled={!isActive}
            autoFocus={isActive}
          />
        </div>
      )}

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-3">
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
            className={`${colorClasses[teamColor].button} text-white font-bold py-5 px-6 rounded-2xl text-2xl md:text-3xl transition-all disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

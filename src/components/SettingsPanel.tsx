"use client";

import { useState } from "react";

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

interface SettingsPanelProps {
  onStart: (difficulty: Difficulty, mode: ProblemMode) => void;
}

const difficulties: { value: Difficulty; label: string; color: string }[] = [
  { value: "easy", label: "Easy", color: "bg-green-500 hover:bg-green-600" },
  { value: "medium", label: "Medium", color: "bg-yellow-500 hover:bg-yellow-600" },
  { value: "hard", label: "Hard", color: "bg-red-500 hover:bg-red-600" },
];

const problemModes: { value: ProblemMode; label: string }[] = [
  { value: "add", label: "➕ Tambah" },
  { value: "sub", label: "➖ Kurang" },
  { value: "mul", label: "✖️ Kali" },
  { value: "div", label: "➗ Bagi" },
  { value: "add+sub", label: "➕➖ Tambah + Kurang" },
  { value: "add+mul", label: "➕✖️ Tambah + Kali" },
  { value: "add+div", label: "➕➗ Tambah + Bagi" },
  { value: "sub+mul", label: "➖✖️ Kurang + Kali" },
  { value: "sub+div", label: "➖➗ Kurang + Bagi" },
  { value: "mul+div", label: "✖️➗ Kali + Bagi" },
  { value: "all", label: "🎲 Campuran Semua" },
];

export default function SettingsPanel({ onStart }: SettingsPanelProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<ProblemMode>("add");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-xl p-6 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-6">
          Math Tug of War 🧮⚔️
        </h1>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-300">
            Pilih Tingkat Kesulitan
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`${diff.color} text-white font-bold py-3 px-4 rounded-lg transition-all ${
                  difficulty === diff.value ? "ring-4 ring-white" : ""
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Mode Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-300">
            Pilih Mode Soal
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {problemModes.map((problemMode) => (
              <button
                key={problemMode.value}
                onClick={() => setMode(problemMode.value)}
                className={`py-2 px-3 rounded-lg transition-all text-sm font-medium ${
                  mode === problemMode.value
                    ? "bg-primary text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                {problemMode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={() => onStart(difficulty, mode)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-lg text-xl hover:scale-105 transition-transform"
        >
          Mulai Game! 🎮
        </button>

        {/* Info */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Dua tim akan bersaing menjawab soal matematika. Tim yang paling banyak
          benar akan menar!
        </p>
      </div>
    </div>
  );
}

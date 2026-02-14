"use client";

import { useState } from "react";

interface SettingsPanelProps {
  onStart: (difficulty: "easy" | "medium" | "hard", playerName: string, mode: "add" | "sub" | "mul" | "div" | "add+sub" | "add+mul" | "add+div" | "sub+mul" | "sub+div" | "mul+div" | "all") => void;
}

const difficulties = [
  { value: "easy" as const, label: "Mudah", description: "1-10 (±,×,÷)", color: "bg-green-500 hover:bg-green-600" },
  { value: "medium" as const, label: "Sedang", description: "1-50 (±,×,÷)", color: "bg-yellow-500 hover:bg-yellow-600" },
  { value: "hard" as const, label: "Sulit", description: "1-100 (±,×,÷)", color: "bg-red-500 hover:bg-red-600" },
];

const singleModes = [
  { value: "add" as const, label: "Tambah", icon: "➕" },
  { value: "sub" as const, label: "Kurang", icon: "➖" },
  { value: "mul" as const, label: "Kali", icon: "✖️" },
  { value: "div" as const, label: "Bagi", icon: "➗" },
];

const combinationModes = [
  { value: "add+sub" as const, label: "Tambah + Kurang", icon: "➕➖" },
  { value: "add+mul" as const, label: "Tambah + Kali", icon: "➕✖️" },
  { value: "add+div" as const, label: "Tambah + Bagi", icon: "➕➗" },
  { value: "sub+mul" as const, label: "Kurang + Kali", icon: "➖✖️" },
  { value: "sub+div" as const, label: "Kurang + Bagi", icon: "➖➗" },
  { value: "mul+div" as const, label: "Kali + Bagi", icon: "✖️➗" },
];

export default function SettingsPanel({ onStart }: SettingsPanelProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [mode, setMode] = useState<"add" | "sub" | "mul" | "div" | "add+sub" | "add+mul" | "add+div" | "sub+mul" | "sub+div" | "mul+div" | "all">("add");
  const [playerName, setPlayerName] = useState("");

  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Silakan masukkan nama kamu dulu!");
      return;
    }
    onStart(difficulty, playerName, mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-600 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-6xl">🧮</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tug of War Mathematics
            </h1>
          </div>
          <div className="text-2xl text-gray-600">⚔️ Kalahkan Robot!</div>
        </div>

        {/* Tingkat Kesulitan */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Pilih Tingkat Kesulitan</h2>
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`
                  relative overflow-hidden rounded-2xl p-6 font-bold text-xl
                  transform transition-all duration-200 hover:scale-105 active:scale-95
                  ${
                    difficulty === diff.value
                      ? `bg-gradient-to-r ${diff.color} text-white shadow-2xl ring-4 ring-offset-4 ring-${diff.color.split("-")[1]}-400`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{diff.label}</span>
                  {difficulty === diff.value && (
                    <div className="text-sm font-medium mt-1 opacity-90">
                      {diff.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Operasi Matematika */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Pilih Operasi</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {singleModes.map((problemMode) => (
              <button
                key={problemMode.value}
                onClick={() => setMode(problemMode.value)}
                className={`
                  flex flex-col items-center gap-2 rounded-2xl p-5 font-bold text-lg
                  transform transition-all duration-200 hover:scale-105 active:scale-95 border-2
                  ${
                    mode === problemMode.value
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-400"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                  }
                `}
              >
                <span className="text-2xl">{problemMode.icon}</span>
                <span>{problemMode.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setMode("all")}
              className={`
                flex items-center gap-2 rounded-2xl p-4 font-bold text-base
                transform transition-all duration-200 hover:scale-105 active:scale-95 border-2
                ${
                  mode === "all"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400"
                    : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50"
                }
              `}
            >
              <span className="text-xl">🎲</span>
              <span>Campuran Semua</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {combinationModes.map((problemMode) => (
              <button
                key={problemMode.value}
                onClick={() => setMode(problemMode.value)}
                className={`
                  flex items-center gap-2 rounded-xl p-3 font-medium text-sm
                  transform transition-all duration-200 hover:scale-105 active:scale-95 border-2
                  ${
                    mode === problemMode.value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50"
                  }
                `}
              >
                <span className="text-lg">{problemMode.icon}</span>
                <span>{problemMode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nama Kamu */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Nama Kamu</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Contoh: Budi"
            className="w-full px-6 py-4 text-xl rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-white"
            maxLength={20}
          />
        </div>

        {/* Start Button */}
        <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-5 px-8 rounded-2xl text-2xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-2xl"
          >
          Lawan Robot! 🤖
        </button>
      </div>
    </div>
  );
}

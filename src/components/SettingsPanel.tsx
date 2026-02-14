"use client";

import { useState } from "react";
import { Difficulty, ProblemMode } from "../lib/mathProblem";

interface SettingsPanelProps {
  onStart: (difficulty: Difficulty, mode: ProblemMode, playerName: string) => void;
}

const difficulties: { value: Difficulty; label: string; color: string }[] = [
  { value: "easy", label: "Easy", color: "from-green-500 to-green-600" },
  { value: "medium", label: "Medium", color: "from-yellow-500 to-yellow-600" },
  { value: "hard", label: "Hard", color: "from-red-500 to-red-600" },
];

const problemModes: { value: ProblemMode; label: string; icon: string }[] = [
  { value: "add", label: "Tambah", icon: "➕" },
  { value: "sub", label: "Kurang", icon: "➖" },
  { value: "mul", label: "Kali", icon: "✖️" },
  { value: "div", label: "Bagi", icon: "➗" },
];

const combinationModes: { value: ProblemMode; label: string; icon: string }[] = [
  { value: "add+sub", label: "Tambah + Kurang", icon: "➕➖" },
  { value: "add+mul", label: "Tambah + Kali", icon: "➕✖️" },
  { value: "add+div", label: "Tambah + Bagi", icon: "➕➗" },
  { value: "sub+mul", label: "Kurang + Kali", icon: "➖✖️" },
  { value: "sub+div", label: "Kurang + Bagi", icon: "➖➗" },
  { value: "mul+div", label: "Kali + Bagi", icon: "✖️➗" },
  { value: "all", label: "Campuran Semua", icon: "🎲" },
];

export default function SettingsPanel({ onStart }: SettingsPanelProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<ProblemMode>("add");
  const [showCombinations, setShowCombinations] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Silakan masukkan nama kamu dulu!");
      return;
    }
    onStart(difficulty, mode, playerName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Math Tug of War
          </h1>
          <p className="text-3xl">🧮⚔️</p>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-200">
            Pilih Tingkat Kesulitan
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className={`
                  relative overflow-hidden rounded-xl p-6 font-bold text-xl
                  transform transition-all duration-200 hover:scale-105 active:scale-95
                  ${
                    difficulty === diff.value
                      ? `bg-gradient-to-r ${diff.color} text-white shadow-lg`
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }
                `}
              >
                {diff.label}
                {difficulty === diff.value && (
                  <div className="absolute inset-0 border-4 border-white rounded-xl animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Mode Selection */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-200">
            Pilih Mode Soal
          </h2>

          {/* Single Operations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-400">Operasi Tunggal</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {problemModes.map((problemMode) => (
                <button
                  key={problemMode.value}
                  onClick={() => setMode(problemMode.value)}
                  className={`
                    relative rounded-xl p-5 font-semibold text-lg
                    transform transition-all duration-200 hover:scale-105 active:scale-95
                    flex flex-col items-center gap-2
                    ${
                      mode === problemMode.value
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }
                  `}
                >
                  <span className="text-2xl">{problemMode.icon}</span>
                  <span>{problemMode.label}</span>
                  {mode === problemMode.value && (
                    <div className="absolute inset-0 border-2 border-white rounded-xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Combination Operations */}
          <div>
            <button
              onClick={() => setShowCombinations(!showCombinations)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl p-4 mb-4 font-semibold flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>🎚️</span>
                <span>Operasi Gabungan</span>
              </span>
              <span className={`transform transition-transform ${showCombinations ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {showCombinations && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 animate-fade-in">
                {combinationModes.map((problemMode) => (
                  <button
                      key={problemMode.value}
                      onClick={() => setMode(problemMode.value)}
                      className={`
                        relative rounded-xl p-4 font-medium text-base
                        transform transition-all duration-200 hover:scale-102 active:scale-98
                        flex items-center gap-3
                        ${
                          mode === problemMode.value
                            ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }
                      `}
                    >
                      <span className="text-xl">{problemMode.icon}</span>
                        <span>{problemMode.label}</span>
                      {mode === problemMode.value && (
                          <div className="absolute inset-0 border-2 border-white rounded-xl" />
                        )}
                    </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Player Name */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-200">
            Nama Kamu
          </h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Contoh: Budi"
            className="w-full px-6 py-4 text-xl rounded-xl border-2 border-gray-600 focus:border-blue-400 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
            maxLength={20}
          />
        </div>

        {/* Start Game Button */}
        <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-6 px-8 rounded-2xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-3xl"
          >
          Lawan Robot! 🤖
        </button>

        {/* Info */}
        <p className="text-center text-gray-400 text-base mt-6 leading-relaxed">
          Kalahkan robot dengan menjawab soal matematika lebih cepat dan lebih banyak!<br />
          Semakin sulit, semakin pintar robot-nya.
        </p>
      </div>
    </div>
  );
}

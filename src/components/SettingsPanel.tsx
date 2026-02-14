"use client";

import { useState } from "react";

interface SettingsPanelProps {
  onStart: (difficulty: "easy" | "medium" | "hard", playerName: string, mode: "add" | "sub" | "mul" | "div" | "add+sub" | "add+mul" | "add+div" | "sub+mul" | "sub+div" | "mul+div" | "all") => void;
}

const difficulties = [
  { value: "easy" as const, label: "Mudah", description: "Tambah & kurang (1-20)", color: "#4CAF50" },
  { value: "medium" as const, label: "Sedang", description: "Kali & bagi (1-12)", color: "#FFC107" },
  { value: "hard" as const, label: "Sulit", description: "Campuran angka besar", color: "#F44336" },
];

const singleModes = [
  { value: "add" as const, label: "Tambah", icon: "+" },
  { value: "sub" as const, label: "Kurang", icon: "-" },
  { value: "mul" as const, label: "Kali", icon: "×" },
  { value: "div" as const, label: "Bagi", icon: "÷" },
];

const combinationModes = [
  { value: "add+sub" as const, label: "Tambah + Kurang", icon: "+" },
  { value: "add+mul" as const, label: "Tambah + Kali", icon: "+" },
  { value: "add+div" as const, label: "Tambah + Bagi", icon: "+" },
  { value: "sub+mul" as const, label: "Kurang + Kali", icon: "-" },
  { value: "sub+div" as const, label: "Kurang + Bagi", icon: "-" },
  { value: "mul+div" as const, label: "Kali + Bagi", icon: "×" },
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#FFF8E1" }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🎮</span>
            <div className="text-left">
              <h1 className="text-4xl font-bold" style={{ color: "#2196F3" }}>
                Tug of War
              </h1>
              <div className="text-2xl font-bold" style={{ color: "#4CAF50" }}>
                Mathematics
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg" style={{ color: "#757575" }}>
            <span>Kalahkan Robot!</span>
            <span className="text-xl">🤖</span>
          </div>
        </div>

        {/* Tingkat Kesulitan */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#212121" }}>
            Pilih Tingkat Kesulitan
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setDifficulty(diff.value)}
                className="relative rounded-xl p-4 font-bold text-lg border-2 transition-all"
                style={{
                  backgroundColor: difficulty === diff.value ? "#E3F2FD" : "#FFFFFF",
                  borderColor: difficulty === diff.value ? "#2196F3" : "#E0E0E0",
                  color: "#212121"
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{
                      backgroundColor: difficulty === diff.value ? diff.color : "transparent",
                      border: difficulty === diff.value ? "none" : "2px solid #E0E0E0"
                    }}
                  />
                  <div className="text-xl">{diff.label}</div>
                  <div className="text-xs" style={{ color: "#757575" }}>
                    {diff.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Operasi Matematika */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#212121" }}>
            Pilih Operasi
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {singleModes.map((problemMode) => (
              <button
                key={problemMode.value}
                onClick={() => setMode(problemMode.value)}
                className="relative rounded-xl p-4 font-semibold transition-all border-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: mode === problemMode.value ? "#2196F3" : "#E0E0E0",
                  color: "#757575"
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">{problemMode.icon}</div>
                  <div className="text-base">{problemMode.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nama Kamu */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">👤</span>
            <h2 className="text-xl font-bold" style={{ color: "#2196F3" }}>
              Nama Kamu
            </h2>
          </div>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Kamu"
            className="w-full px-4 py-3 text-lg rounded-xl border-2 focus:outline-none"
            style={{ borderColor: "#E0E0E0", color: "#212121" }}
            maxLength={20}
          />
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full text-white font-bold py-4 px-6 rounded-2xl text-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
          style={{ backgroundColor: "#2196F3" }}
        >
          <span className="text-2xl">🚀</span>
          Lawan Robot!
        </button>
      </div>
    </div>
  );
}

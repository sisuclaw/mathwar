"use client";

import { useState, useEffect, useCallback } from "react";
import SettingsPanel from "./SettingsPanel";
import TeamPanel from "./TeamPanel";
import TugOfWarAnimation from "./TugOfWarAnimation";
import Timer from "./Timer";
import {
  generateProblem,
  MathProblem,
  Difficulty,
  ProblemMode,
} from "../lib/mathProblem";
import { getSoundManager } from "../lib/soundManager";

export default function GameBoard() {
  // Game State
  const [gameState, setGameState] = useState<
    "settings" | "playing" | "ended"
  >("settings");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<ProblemMode>("add");
  const [timeLeft, setTimeLeft] = useState(120);
  const [playerName, setPlayerName] = useState("");

  // Team States
  const [playerProblem, setPlayerProblem] = useState<MathProblem | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [robotScore, setRobotScore] = useState(0);
  const [winner, setWinner] = useState<"player" | "robot" | null>(null);

  // Robot AI
  const [robotThinking, setRobotThinking] = useState(false);

  // Sound Manager
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  // Load sounds on mount
  useEffect(() => {
    const loadSounds = async () => {
      const soundManager = getSoundManager();
      await soundManager.loadAllSounds();
      setSoundsLoaded(true);
    };
    loadSounds();
  }, []);

  // Start Game Handler
  const handleStartGame = useCallback(
    (difficulty: Difficulty, mode: ProblemMode, playerName: string) => {
      setDifficulty(difficulty);
      setMode(mode);
      setPlayerName(playerName);

      // Generate initial problem
      const prob = generateProblem(difficulty, mode);
      setPlayerProblem(prob);

      // Reset scores
      setPlayerScore(0);
      setRobotScore(0);

      // Set time based on difficulty
      const timeMap = { easy: 180, medium: 120, hard: 60 };
      setTimeLeft(timeMap[difficulty]);

      setGameState("playing");
      setWinner(null);
    },
    []
  );

  // Robot AI Logic
  useEffect(() => {
    if (gameState !== "playing" || robotThinking) return;

    // Robot thinks based on difficulty
    const thinkTime = {
      easy: 5000, // 5 seconds
      medium: 3000, // 3 seconds
      hard: 1500, // 1.5 seconds
    };

    setRobotThinking(true);

    const timer = setTimeout(() => {
      // Robot answers with accuracy based on difficulty
      const accuracy = {
        easy: 0.9, // 90% correct
        medium: 0.7, // 70% correct
        hard: 0.5, // 50% correct
      };

      const isCorrect = Math.random() < accuracy[difficulty];

      if (isCorrect) {
        const soundManager = getSoundManager();
        soundManager.play("correct");
        setRobotScore((prev) => prev + 1);
      } else {
        const soundManager = getSoundManager();
        soundManager.play("wrong");
      }

      setRobotThinking(false);
    }, thinkTime[difficulty]);

    return () => clearTimeout(timer);
  }, [gameState, difficulty, robotThinking, playerScore]);

  // Handle Player Answer
  const handlePlayerAnswer = useCallback(
    (answer: number) => {
      const soundManager = getSoundManager();

      if (playerProblem && answer === playerProblem.answer) {
        // Correct!
        soundManager.play("correct");
        setPlayerScore((prev) => prev + 1);
        const newProblem = generateProblem(difficulty, mode);
        setPlayerProblem(newProblem);
      } else {
        // Wrong!
        soundManager.play("wrong");
      }
    },
    [difficulty, mode, playerProblem]
  );

  // Handle Time Up
  const handleTimeUp = useCallback(() => {
    setGameState("ended");
    const soundManager = getSoundManager();

    if (playerScore > robotScore) {
      setWinner("player");
      soundManager.play("win");
    } else if (robotScore > playerScore) {
      setWinner("robot");
      soundManager.play("win");
    } else {
      // Draw
      soundManager.play("win");
    }
  }, [playerScore, robotScore]);

  // Render Settings
  if (gameState === "settings") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-600 to-gray-900">
        <SettingsPanel onStart={handleStartGame} />
      </div>
    );
  }

  // Render Game Ended
  if (gameState === "ended") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-600 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center border-4 border-indigo-200">
          {winner === "player" ? (
            <>
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Kamu Menang!
              </h1>
              <p className="text-2xl text-gray-600 mb-6">Luar biasa, {playerName}!</p>
            </>
          ) : winner === "robot" ? (
            <>
              <div className="text-8xl mb-6">🤖</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
                Robot Menang!
              </h1>
              <p className="text-2xl text-gray-600 mb-6">Jangan menyerah, {playerName}!</p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">🤝</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
                Seri!
              </h1>
            </>
          )}

          <div className="text-3xl md:text-4xl font-bold mb-8 py-4 px-6 bg-indigo-50 rounded-2xl">
            {playerName}: <span className="text-blue-600">{playerScore}</span>{" "}
            vs{" "}
            Robot 🤖: <span className="text-red-600">{robotScore}</span>
          </div>

          <button
            onClick={() => setGameState("settings")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-5 px-10 rounded-2xl text-2xl shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-2xl"
          >
            Main Lagi! 🔄
          </button>
        </div>
      </div>
    );
  }

  // Render Playing Game
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-600 to-gray-900 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
          {playerName} vs Robot 🤖
        </h1>
        <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} isRunning={gameState === "playing"} />
      </div>

      {/* Tug of War Animation */}
      <TugOfWarAnimation
        team1Score={playerScore}
        team2Score={robotScore}
        winner={winner === "player" ? "blue" : winner === "robot" ? "red" : null}
        team1Name={playerName}
        team2Name="Robot"
      />

      {/* Player Panel */}
      <div className="max-w-2xl mx-auto mt-10">
        <TeamPanel
          teamName={playerName || "Kamu"}
          teamColor="blue"
          problem={playerProblem}
          onAnswer={handlePlayerAnswer}
          isActive={true}
          score={playerScore}
        />
      </div>

      {/* Robot Status */}
      <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-red-200">
        <div className="flex items-center gap-3">
          <div className="text-4xl animate-pulse">
            {robotThinking ? "🤔" : "🤖"}
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">Robot</div>
            <div className="text-sm text-gray-600">
              {robotThinking ? "Sedang berpikir..." : "Siap!"}
            </div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              Skor: {robotScore}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

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
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  // Team States
  const [team1Problem, setTeam1Problem] = useState<MathProblem | null>(null);
  const [team2Problem, setTeam2Problem] = useState<MathProblem | null>(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1); // Which team's turn
  const [winner, setWinner] = useState<"blue" | "red" | null>(null);

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
    (selectedDifficulty: Difficulty, selectedMode: ProblemMode) => {
      setDifficulty(selectedDifficulty);
      setMode(selectedMode);

      // Generate initial problems
      const prob1 = generateProblem(selectedDifficulty, selectedMode);
      const prob2 = generateProblem(selectedDifficulty, selectedMode);
      setTeam1Problem(prob1);
      setTeam2Problem(prob2);

      // Reset scores
      setTeam1Score(0);
      setTeam2Score(0);

      // Set time based on difficulty
      const timeMap = { easy: 180, medium: 120, hard: 60 }; // seconds
      setTimeLeft(timeMap[selectedDifficulty]);

      setActiveTeam(Math.random() > 0.5 ? 1 : 2); // Random start

      setGameState("playing");
      setWinner(null);
    },
    []
  );

  // Handle Answer
  const handleAnswer = useCallback(
    (team: 1 | 2, answer: number) => {
      const soundManager = getSoundManager();

      if (team === 1) {
        if (team1Problem && answer === team1Problem.answer) {
          // Correct!
          soundManager.play("correct");
          setTeam1Score((prev) => prev + 1);
          const newProblem = generateProblem(difficulty, mode);
          setTeam1Problem(newProblem);
        } else {
          // Wrong!
          soundManager.play("wrong");
        }
      } else if (team === 2) {
        if (team2Problem && answer === team2Problem.answer) {
          // Correct!
          soundManager.play("correct");
          setTeam2Score((prev) => prev + 1);
          const newProblem = generateProblem(difficulty, mode);
          setTeam2Problem(newProblem);
        } else {
          // Wrong!
          soundManager.play("wrong");
        }
      }

      // Switch active team
      setActiveTeam((prev) => (prev === 1 ? 2 : 1));
    },
    [difficulty, mode, team1Problem, team2Problem]
  );

  // Handle Time Up
  const handleTimeUp = useCallback(() => {
    setGameState("ended");
    const soundManager = getSoundManager();

    if (team1Score > team2Score) {
      setWinner("blue");
      soundManager.play("win");
    } else if (team2Score > team1Score) {
      setWinner("red");
      soundManager.play("win");
    } else {
      // Draw
      soundManager.play("win");
    }
  }, [team1Score, team2Score]);

  // Render Settings
  if (gameState === "settings") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <SettingsPanel onStart={handleStartGame} />
      </div>
    );
  }

  // Render Game Ended
  if (gameState === "ended") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-800/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl text-center border-2 border-gray-700">
          {winner ? (
            <>
              <div className="text-8xl mb-6 animate-bounce">
                {winner === "blue" ? "🔵" : "🔴"}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {winner === "blue" ? "Tim Biru" : "Tim Merah"} Menang!
              </h1>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">🤝</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-200">
                Seri!
              </h1>
            </>
          )}

          <div className="text-3xl md:text-4xl font-bold mb-8 py-4 px-6 bg-gray-700/50 rounded-2xl">
            Tim Biru: <span className="text-blue-400">{team1Score}</span>{" "}
            vs{" "}
            Tim Merah: <span className="text-red-400">{team2Score}</span>
          </div>

          <button
            onClick={() => setGameState("settings")}
            className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-5 px-10 rounded-2xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-3xl"
          >
            Main Lagi 🔄
          </button>
        </div>
      </div>
    );
  }

  // Render Playing Game
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Math Tug of War
        </h1>
        <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} isRunning={gameState === "playing"} />
      </div>

      {/* Tug of War Animation */}
      <TugOfWarAnimation team1Score={team1Score} team2Score={team2Score} winner={winner} />

      {/* Team Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <TeamPanel
          teamName="Tim Biru"
          teamColor="blue"
          problem={team1Problem}
          onAnswer={(answer) => handleAnswer(1, answer)}
          isActive={activeTeam === 1}
          score={team1Score}
        />
        <TeamPanel
          teamName="Tim Merah"
          teamColor="red"
          problem={team2Problem}
          onAnswer={(answer) => handleAnswer(2, answer)}
          isActive={activeTeam === 2}
          score={team2Score}
        />
      </div>
    </main>
  );
}

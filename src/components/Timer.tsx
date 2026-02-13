"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  timeLeft: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({
  timeLeft,
  onTimeUp,
  isRunning,
}: TimerProps) {
  const [displayTime, setDisplayTime] = useState(timeLeft);

  useEffect(() => {
    setDisplayTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning || displayTime <= 0) return;

    const timer = setInterval(() => {
      setDisplayTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, displayTime, onTimeUp]);

  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;
  const isLow = displayTime <= 10 && displayTime > 0;
  const isCritical = displayTime <= 5 && displayTime > 0;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`px-8 py-4 rounded-2xl font-black text-6xl md:text-7xl transition-all duration-300 ${
          isCritical
            ? "bg-red-600 text-white animate-pulse shadow-2xl shadow-red-500/50"
            : isLow
            ? "bg-yellow-500 text-gray-900 shadow-xl shadow-yellow-500/50"
            : "bg-gray-700 text-white shadow-lg"
        }`}
      >
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      <div className="text-gray-400 text-lg mt-3 font-semibold">
        Waktu Tersisa
      </div>
    </div>
  );
}

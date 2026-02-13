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

  return (
    <div className="text-center">
      <div
        className={`text-6xl font-bold ${
          isLow ? "text-red-500 animate-pulse" : "text-white"
        }`}
      >
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      <div className="text-gray-400 text-lg mt-2">Waktu Tersisa</div>
    </div>
  );
}

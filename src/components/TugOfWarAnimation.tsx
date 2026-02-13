"use client";

interface TugOfWarAnimationProps {
  team1Score: number;
  team2Score: number;
  winner: "blue" | "red" | null;
}

export default function TugOfWarAnimation({
  team1Score,
  team2Score,
  winner,
}: TugOfWarAnimationProps) {
  const totalScore = team1Score + team2Score;
  const team1Percent = totalScore > 0 ? (team1Score / totalScore) * 100 : 50;
  const team2Percent = totalScore > 0 ? (team2Score / totalScore) * 100 : 50;

  // Center position (50% each)
  const ropeCenter = team1Score - team2Score; // Positive = team1 winning, Negative = team2 winning
  const maxOffset = 35; // Maximum percentage offset
  const currentOffset =
    totalScore > 0
      ? Math.max(
          -maxOffset,
          Math.min(maxOffset, (ropeCenter / totalScore) * maxOffset * 2)
        )
      : 0;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Winner Announcement */}
      {winner && (
        <div className="mb-6 text-4xl md:text-5xl font-bold animate-bounce text-center">
          {winner === "blue" ? (
            <span className="text-blue-400">🔵 Tim Biru Menang!</span>
          ) : (
            <span className="text-red-400">🔴 Tim Merah Menang!</span>
          )}
        </div>
      )}

      {/* Tug of War Display */}
      <div className="w-full max-w-5xl bg-gray-700/80 backdrop-blur-sm rounded-3xl h-28 md:h-32 relative overflow-hidden shadow-2xl border-4 border-gray-600">
        {/* Rope Background */}
        <div className="absolute inset-0 flex items-center">
          {/* Dashed Line (Center Marker) */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 border-l-4 border-dashed border-gray-400 h-full opacity-60"
            style={{ left: `${50 + currentOffset}%` }}
          />
        </div>

        {/* Team 1 (Blue) Side */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-700 ease-out"
          style={{ width: `${team1Percent}%` }}
        />

        {/* Team 2 (Red) Side */}
        <div
          className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-600 to-red-700 transition-all duration-700 ease-out"
          style={{ width: `${team2Percent}%` }}
        />

        {/* Characters */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
          {/* Blue Character */}
          <div className="text-6xl md:text-7xl animate-pulse">🧍</div>

          {/* Red Character */}
          <div className="text-6xl md:text-7xl animate-pulse">🧍</div>
        </div>

        {/* Center Marker */}
        <div
          className="absolute top-0 bottom-0 w-3 bg-gradient-to-b from-yellow-400 to-yellow-500 transition-all duration-700 ease-out shadow-lg shadow-yellow-500/50"
          style={{ left: `${50 + currentOffset}%` }}
        />

        {/* Rope Texture */}
        <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-8 opacity-20">
          <div className="h-full w-full bg-repeating-linear-gradient to-b from-gray-900 via-gray-700 to-gray-900 bg-[length:20px_20px]"></div>
        </div>
      </div>

      {/* Score Display */}
      <div className="flex justify-between w-full max-w-5xl mt-6 text-2xl md:text-3xl font-bold">
        <div className="bg-blue-900/60 px-6 py-3 rounded-xl border-2 border-blue-500 shadow-lg shadow-blue-500/30">
          Tim Biru: <span className="text-blue-400">{team1Score}</span>
        </div>
        <div className="text-gray-400 font-black">VS</div>
        <div className="bg-red-900/60 px-6 py-3 rounded-xl border-2 border-red-500 shadow-lg shadow-red-500/30">
          Tim Merah: <span className="text-red-400">{team2Score}</span>
        </div>
      </div>
    </div>
  );
}

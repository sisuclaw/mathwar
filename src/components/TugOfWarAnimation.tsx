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
  const team1Percent =
    totalScore > 0 ? (team1Score / totalScore) * 100 : 50;
  const team2Percent =
    totalScore > 0 ? (team2Score / totalScore) * 100 : 50;

  // Center position (50% each)
  const ropeCenter = team1Score - team2Score; // Positive = team1 winning, Negative = team2 winning
  const maxOffset = 40; // Maximum percentage offset
  const currentOffset =
    totalScore > 0
      ? Math.max(
          -maxOffset,
          Math.min(maxOffset, (ropeCenter / totalScore) * maxOffset * 2)
        )
      : 0;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Timer/Status */}
      {winner && (
        <div className="mb-4 text-4xl font-bold animate-bounce">
          {winner === "blue" ? "🔵 Tim Biru Menang!" : "🔴 Tim Merah Menang!"}
        </div>
      )}

      {/* Tug of War Display */}
      <div className="w-full max-w-4xl bg-gray-700 rounded-full h-20 relative overflow-hidden">
        {/* Rope Background */}
        <div className="absolute inset-0 flex items-center">
          {/* Dashed Line (Center Marker) */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 border-l-4 border-dashed border-gray-400 h-full"
            style={{ left: `${50 + currentOffset}%` }}
          />
        </div>

        {/* Team 1 (Blue) Side */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: team1Percent }}
        />

        {/* Team 2 (Red) Side */}
        <div
          className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-500 to-red-600 transition-all duration-500"
          style={{ width: team2Percent }}
        />

        {/* Characters */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {/* Blue Character */}
          <div className="text-5xl animate-pulse">🧍</div>

          {/* Red Character */}
          <div className="text-5xl animate-pulse">🧍</div>
        </div>

        {/* Center Marker */}
        <div
          className="absolute top-0 bottom-0 w-2 bg-yellow-400 transition-all duration-500"
          style={{ left: `${50 + currentOffset}%` }}
        />
      </div>

      {/* Score Display */}
      <div className="flex justify-between w-full max-w-4xl mt-4 text-2xl font-bold">
        <div className="text-blue-400">Tim Biru: {team1Score}</div>
        <div className="text-gray-400">VS</div>
        <div className="text-red-400">Tim Merah: {team2Score}</div>
      </div>
    </div>
  );
}

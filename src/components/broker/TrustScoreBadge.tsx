// =============================================================
// STOCKWISE — Trust Score Badge
// File: src/components/broker/TrustScoreBadge.tsx
//
// Visual circular-style meter showing a broker's trust score (0-100).
// =============================================================

interface TrustScoreBadgeProps {
  score: number | null | undefined;
}

export default function TrustScoreBadge({ score }: TrustScoreBadgeProps) {
  const value = score ?? 0;

  // Color the score based on how good it is — gives an instant visual read
  const colorClass =
    value >= 80 ? "text-emerald-600 bg-emerald-50" : value >= 60 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";

  return (
    <div className={`inline-flex flex-col items-center justify-center rounded-xl px-4 py-3 ${colorClass}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs font-medium opacity-75">Trust Score</span>
    </div>
  );
}

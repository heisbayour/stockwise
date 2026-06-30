// =============================================================
// STOCKWISE — Progress Bar Component
// File: src/components/ui/ProgressBar.tsx
//
// Generic horizontal progress bar. Used for lesson completion,
// could also be reused for other percentage-based displays.
// =============================================================

interface ProgressBarProps {
  current: number; // e.g. 3
  total: number; // e.g. 10
  label?: string; // optional text shown above the bar
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  // Guard against divide-by-zero and clamp between 0-100
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">
            {current}/{total}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

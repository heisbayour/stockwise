// =============================================================
// STOCKWISE — Star Rating Component
// File: src/components/ui/StarRating.tsx
//
// Displays a 5-star rating. Can be read-only (for showing average
// ratings) or interactive (for submitting a new review).
// =============================================================

"use client";

interface StarRatingProps {
  rating: number; // current rating, 0–5 (can be a decimal for averages, e.g. 4.3)
  onChange?: (rating: number) => void; // if provided, stars become clickable
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-7 h-7",
};

export default function StarRating({ rating, onChange, size = "md" }: StarRatingProps) {
  const isInteractive = !!onChange;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((starValue) => {
        // For display mode, fill stars based on the decimal rating
        // For interactive mode, just compare against whole numbers
        const isFilled = starValue <= Math.round(rating);

        return (
          <button
            key={starValue}
            type="button"
            disabled={!isInteractive}
            onClick={() => onChange?.(starValue)}
            className={isInteractive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <svg
              className={`${sizeClasses[size]} ${isFilled ? "text-amber-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.176 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

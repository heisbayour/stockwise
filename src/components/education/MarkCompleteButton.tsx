// =============================================================
// STOCKWISE — Mark Complete Button
// File: src/components/education/MarkCompleteButton.tsx
//
// Client component since it needs onClick + local state for the
// "completed" toggle. Lives on the individual lesson page.
// =============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface MarkCompleteButtonProps {
  articleId: string;
  initiallyCompleted: boolean;
  isLoggedIn: boolean;
}

export default function MarkCompleteButton({
  articleId,
  initiallyCompleted,
  isLoggedIn,
}: MarkCompleteButtonProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initiallyCompleted);
  const [isLoading, setIsLoading] = useState(false);

  // If not logged in, prompt to log in instead of allowing the action
  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 text-center">
        <a href="/auth/login" className="text-emerald-600 font-medium hover:underline">
          Log in
        </a>{" "}
        to track your progress through this lesson.
      </div>
    );
  }

  async function handleClick() {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/learn/${articleId}/complete`, {
        method: "POST",
      });

      if (response.ok) {
        setIsCompleted(true);
        router.refresh(); // updates the progress bar on the /learn overview page next visit
      }
    } catch {
      // Silently fail — not critical enough to interrupt reading
    } finally {
      setIsLoading(false);
    }
  }

  if (isCompleted) {
    return (
      <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium py-3">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
        Lesson Completed
      </div>
    );
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} fullWidth size="lg">
      {isLoading ? "Marking..." : "Mark as Complete"}
    </Button>
  );
}

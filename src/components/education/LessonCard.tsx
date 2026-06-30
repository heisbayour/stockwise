// =============================================================
// STOCKWISE — Lesson Card
// File: src/components/education/LessonCard.tsx
//
// One row/card per lesson in the /learn roadmap. Shows completion
// status if the user is logged in and has progress data.
// =============================================================

import Link from "next/link";
import { Article } from "@prisma/client";

interface LessonCardProps {
  lesson: Article;
  isCompleted: boolean;
  isLocked?: boolean; // reserved for future "complete lessons in order" logic — unused for now
}

export default function LessonCard({ lesson, isCompleted }: LessonCardProps) {
  return (
    <Link
      href={`/learn/${lesson.slug}`}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all"
    >
      {/* Status circle — checkmark if completed, number if not */}
      <div
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
          isCompleted ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {isCompleted ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          lesson.lessonNumber
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {lesson.title.replace(/^Lesson \d+:\s*/, "")}
        </h3>
        <p className="text-sm text-gray-500 truncate">{lesson.excerpt}</p>
      </div>

      <div className="shrink-0 text-xs text-gray-400 hidden sm:block">{lesson.readingTime} min</div>

      <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

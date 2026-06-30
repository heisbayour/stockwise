// =============================================================
// STOCKWISE — Education Hub Overview Page
// File: src/app/learn/page.tsx
// Route: /learn
//
// Shows the full 10-lesson roadmap. If the user is logged in,
// also shows their personal completion progress.
// =============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LessonCard from "@/components/education/LessonCard";
import ProgressBar from "@/components/ui/ProgressBar";

export default async function LearnPage() {
  const session = await getServerSession(authOptions);

  // Fetch all published lessons, ordered by lesson number
  const lessons = await prisma.article.findMany({
    where: { isPublished: true, category: "LESSON" },
    orderBy: { lessonNumber: "asc" },
  });

  // If logged in, fetch which lessons this user has completed
  let completedLessonIds = new Set<string>();
  if (session?.user?.id) {
    const progress = await prisma.learningProgress.findMany({
      where: { userId: session.user.id, completed: true },
      select: { articleId: true },
    });
    completedLessonIds = new Set(progress.map((p) => p.articleId));
  }

  const completedCount = lessons.filter((l) => completedLessonIds.has(l.id)).length;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Investing Roadmap</h1>
        <p className="mt-2 text-gray-600">
          A free, beginner-friendly path from &quot;I have money&quot; to &quot;I made my first investment.&quot;
        </p>
      </div>

      {/* Progress bar — only meaningful when logged in */}
      {session?.user?.id && (
        <div className="mb-8 bg-gray-50 rounded-xl p-5">
          <ProgressBar current={completedCount} total={lessons.length} label="Your Progress" />
        </div>
      )}

      {/* Lesson list */}
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={completedLessonIds.has(lesson.id)}
          />
        ))}
      </div>

      {lessons.length === 0 && (
        <p className="text-center text-gray-500 py-12">Lessons are being added soon. Check back shortly!</p>
      )}
    </main>
  );
}

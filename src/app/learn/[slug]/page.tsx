// =============================================================
// STOCKWISE — Individual Lesson Page
// File: src/app/learn/[slug]/page.tsx
// Route: /learn/what-is-investing
// =============================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MarkdownRenderer from "@/components/education/MarkdownRenderer";
import MarkCompleteButton from "@/components/education/MarkCompleteButton";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  const lesson = await prisma.article.findUnique({
    where: { slug, isPublished: true },
  });

  if (!lesson) {
    notFound();
  }

  // Check if this user already completed this lesson
  let isCompleted = false;
  if (session?.user?.id) {
    const progress = await prisma.learningProgress.findUnique({
      where: { userId_articleId: { userId: session.user.id, articleId: lesson.id } },
    });
    isCompleted = progress?.completed ?? false;
  }

  // Find the next lesson in sequence, for the "Next Lesson" link at the bottom
  const nextLesson = lesson.lessonNumber
    ? await prisma.article.findFirst({
        where: { lessonNumber: lesson.lessonNumber + 1, isPublished: true, category: "LESSON" },
      })
    : null;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb back to roadmap */}
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Roadmap
      </Link>

      {/* Lesson header */}
      <div className="mb-8">
        {lesson.lessonNumber && (
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            Lesson {lesson.lessonNumber} of 10
          </span>
        )}
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {lesson.title.replace(/^Lesson \d+:\s*/, "")}
        </h1>
        <p className="mt-2 text-sm text-gray-400">{lesson.readingTime} min read</p>
      </div>

      {/* Article content rendered from Markdown */}
      <MarkdownRenderer content={lesson.content} />

      {/* Mark complete button */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <MarkCompleteButton
          articleId={lesson.id}
          initiallyCompleted={isCompleted}
          isLoggedIn={!!session}
        />
      </div>

      {/* Next lesson link */}
      {nextLesson && (
        <Link
          href={`/learn/${nextLesson.slug}`}
          className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div>
            <span className="text-xs text-gray-400">Next Lesson</span>
            <p className="font-medium text-gray-900">{nextLesson.title.replace(/^Lesson \d+:\s*/, "")}</p>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </main>
  );
}

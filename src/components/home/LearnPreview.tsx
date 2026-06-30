// =============================================================
// STOCKWISE — Learn Preview Section
// File: src/components/home/LearnPreview.tsx
//
// Shows the first 3 lessons as a teaser for the Education Hub.
// =============================================================

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function LearnPreview() {
  const lessons = await prisma.article.findMany({
    where: { isPublished: true, category: "LESSON" },
    orderBy: { lessonNumber: "asc" },
    take: 3,
  });

  if (lessons.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Start Learning, Free</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            No jargon. No assumptions. A 10-lesson roadmap built for first-time Nigerian investors.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/learn/${lesson.slug}`}
              className="block p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                Lesson {lesson.lessonNumber}
              </span>
              <h3 className="mt-2 font-semibold text-gray-900">{lesson.title.replace(/^Lesson \d+:\s*/, "")}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{lesson.excerpt}</p>
              <span className="mt-3 inline-block text-xs text-gray-400">{lesson.readingTime} min read</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/learn" variant="outline">
            View Full Roadmap
          </Button>
        </div>
      </div>
    </section>
  );
}

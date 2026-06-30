// =============================================================
// STOCKWISE — Mark Lesson Complete API Route
// File: src/app/api/learn/[id]/complete/route.ts
//
// POST /api/learn/:id/complete
// Marks a lesson (article) as completed for the logged-in user.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in to track progress" }, { status: 401 });
  }

  const { id: articleId } = await params;

  // Confirm the article exists before recording progress against it
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // upsert: create the progress record if it doesn't exist, update it if it does.
  // This handles both "first time completing" and "re-marking" cleanly.
  const progress = await prisma.learningProgress.upsert({
    where: {
      userId_articleId: { userId: session.user.id, articleId },
    },
    create: {
      userId: session.user.id,
      articleId,
      completed: true,
      completedAt: new Date(),
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({ message: "Lesson marked as complete", progress }, { status: 200 });
}

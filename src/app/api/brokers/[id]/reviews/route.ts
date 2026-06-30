// =============================================================
// STOCKWISE — Broker Reviews API Route
// File: src/app/api/brokers/[id]/reviews/route.ts
//
// POST /api/brokers/:id/reviews
// Creates a new review. Enforces one review per user per broker
// via the unique constraint defined in schema.prisma.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in to leave a review" }, { status: 401 });
  }

  const { id: brokerId } = await params;

  try {
    const body = await request.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Please provide a valid rating (1-5 stars)" }, { status: 400 });
    }

    const { rating, title, body: reviewBody } = validation.data;

    // Confirm broker exists
    const broker = await prisma.broker.findUnique({ where: { id: brokerId } });
    if (!broker) {
      return NextResponse.json({ error: "Broker not found" }, { status: 404 });
    }

    // Try to create — the @@unique([userId, brokerId]) constraint in the
    // schema will throw if this user already reviewed this broker
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        brokerId,
        rating,
        title,
        body: reviewBody,
      },
    });

    return NextResponse.json({ message: "Review submitted", review }, { status: 201 });
  } catch (error: any) {
    // Prisma's unique constraint violation error code
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "You've already reviewed this broker" },
        { status: 409 }
      );
    }

    console.error("Review submission error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

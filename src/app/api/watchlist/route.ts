// =============================================================
// STOCKWISE — Watchlist API Route (Create)
// File: src/app/api/watchlist/route.ts
//
// POST /api/watchlist
// Adds a stock ticker to the logged-in user's watchlist.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const watchlistSchema = z.object({
  ticker: z.string().min(1).max(10),
  companyName: z.string().min(1).max(100),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = watchlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Please provide a valid ticker and company name" }, { status: 400 });
    }

    const { ticker, companyName } = validation.data;

    // The @@unique([userId, ticker]) constraint in schema.prisma prevents duplicates
    const item = await prisma.watchlist.create({
      data: { userId: session.user.id, ticker, companyName },
    });

    return NextResponse.json({ message: "Added to watchlist", item }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "This stock is already in your watchlist" }, { status: 409 });
    }

    console.error("Watchlist add error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

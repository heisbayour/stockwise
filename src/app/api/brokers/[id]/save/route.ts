// =============================================================
// STOCKWISE — Save Broker API Route
// File: src/app/api/brokers/[id]/save/route.ts
//
// POST /api/brokers/:id/save
// Toggles whether the logged-in user has saved/bookmarked this broker.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  // Must be logged in to save a broker
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in to save brokers" }, { status: 401 });
  }

  const { id: brokerId } = await params;

  // Confirm the broker actually exists before trying to save it
  const broker = await prisma.broker.findUnique({ where: { id: brokerId } });
  if (!broker) {
    return NextResponse.json({ error: "Broker not found" }, { status: 404 });
  }

  // Check if already saved — toggle behavior
  const existing = await prisma.savedBroker.findUnique({
    where: { userId_brokerId: { userId: session.user.id, brokerId } },
  });

  if (existing) {
    // Already saved — remove it (unsave)
    await prisma.savedBroker.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  } else {
    // Not saved yet — create it
    await prisma.savedBroker.create({
      data: { userId: session.user.id, brokerId },
    });
    return NextResponse.json({ saved: true });
  }
}

// =============================================================
// STOCKWISE — Watchlist API Route (Delete)
// File: src/app/api/watchlist/[id]/route.ts
//
// DELETE /api/watchlist/:id
// Removes one item from the logged-in user's watchlist.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { id } = await params;

  // Confirm this watchlist item actually belongs to the logged-in user
  // before deleting — prevents one user from deleting another's data
  const item = await prisma.watchlist.findUnique({ where: { id } });

  if (!item || item.userId !== session.user.id) {
    return NextResponse.json({ error: "Watchlist item not found" }, { status: 404 });
  }

  await prisma.watchlist.delete({ where: { id } });

  return NextResponse.json({ message: "Removed from watchlist" }, { status: 200 });
}

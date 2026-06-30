// =============================================================
// STOCKWISE — Update Profile API Route
// File: src/app/api/user/profile/route.ts
//
// PATCH /api/user/profile
// Updates the logged-in user's basic profile fields.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  nin: z.string().optional(),
});

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { firstName, lastName, phone, nin } = validation.data;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        phone: phone || undefined,
        // If a NIN value was provided and it's new, mark it as submitted
        // for admin review (see IMPLEMENTATION.md — NIN is stored, not
        // live-verified, in MVP)
        nin: nin || undefined,
        ...(nin ? { ninSubmitted: true } : {}),
      },
    });

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// =============================================================
// STOCKWISE — Email Verification API Route
// File: src/app/api/auth/verify-email/route.ts
//
// POST /api/auth/verify-email
// Body: { userId: string, code: string }
//
// Checks the OTP code against what's stored in the DB.
// If valid, marks the user's email as verified.
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyOtp, createOtp } from "@/lib/auth-utils";
import { OtpType } from "@prisma/client";
import { z } from "zod";

const verifySchema = z.object({
  userId: z.string().min(1),
  code: z.string().length(6, "Code must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request. Please check the code and try again." },
        { status: 400 }
      );
    }

    const { userId, code } = validation.data;

    // Confirm the user actually exists before checking the OTP
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Already verified — no need to re-check, just confirm success
    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 200 });
    }

    const isValid = await verifyOtp(userId, code, OtpType.EMAIL_VERIFICATION);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please request a new one." },
        { status: 400 }
      );
    }

    // Mark the user's email as verified
    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// =============================================================
// RESEND OTP — separate endpoint logic, same file for simplicity
// PUT /api/auth/verify-email  (re-using this route for "resend code")
// Body: { userId: string }
// =============================================================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = z.object({ userId: z.string().min(1) }).parse(body);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 200 });
    }

    // Generate a fresh OTP (this also invalidates the old one — see auth-utils.ts)
    const otpCode = await createOtp(userId, OtpType.EMAIL_VERIFICATION);

    // Re-use the same email sending logic from registration
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
      to: user.email,
      subject: "Your New Stockwise Verification Code",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1a472a;">Here's your new code</h2>
          <div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; 
                      padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #16a34a;">
              ${otpCode}
            </span>
          </div>
          <p style="color: #6b7280;">This code expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    console.log(`[DEV] Resent OTP for ${user.email}: ${otpCode}`); // remove in production!

    return NextResponse.json({ message: "A new code has been sent to your email." }, { status: 200 });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json({ error: "Failed to resend code" }, { status: 500 });
  }
}

// =============================================================
// STOCKWISE — Registration API Route
// File: src/app/api/auth/register/route.ts
//
// POST /api/auth/register
// 
// What this does:
// 1. Validates the input
// 2. Checks email isn't already taken
// 3. Hashes the password
// 4. Creates the user in DB
// 5. Generates an OTP
// 6. Sends OTP to email
// 7. Returns success
// =============================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createOtp } from "@/lib/auth-utils";
import { OtpType } from "@prisma/client";
import { z } from "zod"; // Install: npm install zod

// ── INPUT VALIDATION SCHEMA ───────────────────────────────────
// Zod gives us type-safe validation with helpful error messages
const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Please enter a valid Nigerian phone number")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate input — returns errors if invalid
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          // Format Zod errors into a readable object: { email: "Invalid email", ... }
          fields: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, password } = validation.data;
    const normalizedEmail = email.toLowerCase(); // always store emails lowercase

    // ── CHECK EMAIL UNIQUENESS ──────────────────────────────
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      // Use the same error message for "email taken" and "already verified"
      // to avoid leaking account info
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 } // 409 = Conflict
      );
    }

    // ── HASH PASSWORD ───────────────────────────────────────
    const passwordHash = await hashPassword(password);

    // ── CREATE USER ─────────────────────────────────────────
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: normalizedEmail,
        phone,
        passwordHash,
        emailVerified: false, // must verify email first
      },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });

    // ── GENERATE & SEND EMAIL OTP ───────────────────────────
    const otpCode = await createOtp(user.id, OtpType.EMAIL_VERIFICATION);

    // Send the email — see the email utility for implementation
    // In development, the code is also logged to console
    await sendVerificationEmail(user.email, user.firstName ?? "there", otpCode);

    console.log(`[DEV] OTP for ${user.email}: ${otpCode}`); // remove in production!

    return NextResponse.json(
      {
        message: "Account created! Check your email for your verification code.",
        userId: user.id, // return this so the frontend knows which user to verify
      },
      { status: 201 } // 201 = Created
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ── EMAIL SENDING ─────────────────────────────────────────────
// Using Resend (free tier: 3,000 emails/month)
// Install: npm install resend
// Sign up at resend.com, get API key, add to .env
async function sendVerificationEmail(email: string, name: string, code: string) {
  // Dynamic import so the build doesn't fail if Resend isn't installed yet
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Your Stockwise Verification Code",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1a472a;">Welcome to Stockwise, ${name}! 🇳🇬</h2>
          <p>Your email verification code is:</p>
          <div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; 
                      padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #16a34a;">
              ${code}
            </span>
          </div>
          <p style="color: #6b7280;">This code expires in <strong>10 minutes</strong>.</p>
          <p style="color: #6b7280;">If you didn't create a Stockwise account, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    // Don't crash registration if email fails — log and continue
    // In production, you'd want to queue this for retry
    console.error("Failed to send verification email:", error);
  }
}

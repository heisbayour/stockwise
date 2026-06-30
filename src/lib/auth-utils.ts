// =============================================================
// STOCKWISE — Auth Utilities
// File: src/lib/auth-utils.ts
//
// These functions handle the security-sensitive parts of auth:
// - Password hashing (never store plain text)
// - OTP generation and validation
// =============================================================

import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { OtpType } from "@prisma/client";

// ── PASSWORD UTILITIES ────────────────────────────────────────

/**
 * Hash a plain text password before storing in DB.
 * bcrypt automatically adds a salt (random data) — each hash is unique
 * even for the same password, making rainbow table attacks impossible.
 *
 * Cost factor of 12 = ~250ms to hash on modern hardware.
 * Slow is good here — it makes brute-force attacks impractical.
 */
export async function hashPassword(plainText: string): Promise<string> {
  const COST_FACTOR = 12;
  return bcrypt.hash(plainText, COST_FACTOR);
}

/**
 * Compare a plain text password against a stored hash.
 * Returns true if they match, false otherwise.
 * Use this during login — NEVER compare plain text directly.
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// ── OTP UTILITIES ─────────────────────────────────────────────

/**
 * Generate a random 6-digit OTP code.
 * e.g. "482910"
 */
function generateOtpCode(): string {
  // Math.random() gives 0–0.999..., multiply by 900000 + 100000 gives 100000–999999
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create a new OTP for a user and store it in the database.
 * Invalidates any previous unused OTPs of the same type first.
 *
 * Returns the plain text code (so you can send it via email/SMS).
 * Only the code is returned — never retrieve it after this point.
 */
export async function createOtp(userId: string, type: OtpType): Promise<string> {
  const code = generateOtpCode();

  // Invalidate old unused OTPs of same type to prevent confusion
  await prisma.otpToken.updateMany({
    where: { userId, type, used: false },
    data: { used: true }, // mark old ones as used (expired)
  });

  // OTP expires in 10 minutes
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.otpToken.create({
    data: {
      userId,
      code,
      type,
      expiresAt,
    },
  });

  return code;
}

/**
 * Verify an OTP code.
 * Checks: does it exist, is it unused, and is it not expired?
 *
 * Returns true if valid, false otherwise.
 * Marks the token as used immediately on successful verification.
 */
export async function verifyOtp(userId: string, code: string, type: OtpType): Promise<boolean> {
  const token = await prisma.otpToken.findFirst({
    where: {
      userId,
      code,
      type,
      used: false,
      expiresAt: { gt: new Date() }, // gt = greater than — must not be expired
    },
  });

  if (!token) return false;

  // Mark as used — OTPs are single-use only
  await prisma.otpToken.update({
    where: { id: token.id },
    data: { used: true },
  });

  return true;
}

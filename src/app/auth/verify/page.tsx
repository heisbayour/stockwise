// =============================================================
// STOCKWISE — Email Verification Page
// File: src/app/auth/verify/page.tsx
// Route: /auth/verify?userId=xxx&email=xxx
//
// Shown right after registration. User enters the 6-digit code
// that was emailed to them.
// =============================================================

"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";

// Wrapped in Suspense because useSearchParams() requires it in Next.js App Router
export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyForm />
    </Suspense>
  );
}

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") ?? "";
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleVerify() {
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success — send them to login since they now have a verified account
      router.push("/auth/login?verified=true");
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleResend() {
    setIsResending(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend code");
      } else {
        setSuccessMessage("A new code has been sent to your email.");
        setCode(""); // clear old code input
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-14 h-14 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit code to <span className="font-medium text-gray-900">{email}</span>
          </p>

          <div className="mt-8">
            <OtpInput value={code} onChange={setCode} />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {successMessage && <p className="mt-4 text-sm text-emerald-600">{successMessage}</p>}

          <div className="mt-8">
            <Button onClick={handleVerify} fullWidth disabled={isLoading || code.length !== 6}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Didn&apos;t get the code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-emerald-600 font-medium hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

// =============================================================
// STOCKWISE — Registration Page
// File: src/app/auth/register/page.tsx
// Route: /auth/register
//
// A single-step form (kept simple for MVP) that calls our
// /api/auth/register endpoint, then redirects to the OTP verify page.
// =============================================================

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Shape of field-level validation errors returned by the API
interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
  password?: string[];
}

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Single handler updates whichever field changed, using the input's `name` attribute
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Validation errors come back as { error, fields: { email: [...] } }
        if (data.fields) {
          setFieldErrors(data.fields);
        } else {
          setGeneralError(data.error || "Something went wrong. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Success — go to the OTP verification page, passing the userId
      router.push(`/auth/verify?userId=${data.userId}&email=${encodeURIComponent(formData.email)}`);
    } catch {
      setGeneralError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-2 text-sm text-gray-600">Start your investing journey — it&apos;s free</p>
          </div>

          {generalError && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={fieldErrors.firstName?.[0]}
                required
              />
              <Input
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={fieldErrors.lastName?.[0]}
                required
              />
            </div>

            <Input
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email?.[0]}
              required
              autoComplete="email"
            />

            <Input
              label="Phone number"
              type="tel"
              name="phone"
              placeholder="08012345678"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone?.[0]}
              hint="Nigerian number, e.g. 08012345678"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password?.[0]}
              required
              autoComplete="new-password"
              hint="At least 8 characters, 1 uppercase letter, 1 number"
            />

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald-600 font-medium hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}

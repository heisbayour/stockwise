// =============================================================
// STOCKWISE — Navbar Component (Session-Aware)
// File: src/components/layout/Navbar.tsx
//
// Now uses real NextAuth session state instead of a hardcoded
// placeholder. Requires AuthProvider to be wrapping the app in
// layout.tsx for useSession() to work.
// =============================================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real session check — status is "loading", "authenticated", or "unauthenticated"
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const navLinks = [
    { label: "Brokers", href: "/brokers" },
    { label: "Learn", href: "/learn" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">Stockwise</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right-side auth buttons — desktop only */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              // Avoid a flash of "Log In" while the session is still being checked
              <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
            ) : isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi, {session.user.name?.split(" ")[0] ?? "there"}
                </span>
                <Button href="/dashboard" variant="outline" size="sm">
                  Dashboard
                </Button>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Button href="/auth/login" variant="ghost" size="sm">
                  Log In
                </Button>
                <Button href="/auth/register" variant="primary" size="sm">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              {isLoggedIn ? (
                <>
                  <Button href="/dashboard" variant="outline" fullWidth>
                    Dashboard
                  </Button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-gray-500 hover:text-red-600 py-2"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Button href="/auth/login" variant="outline" fullWidth>
                    Log In
                  </Button>
                  <Button href="/auth/register" variant="primary" fullWidth>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

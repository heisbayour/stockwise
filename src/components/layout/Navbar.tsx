// =============================================================
// STOCKWISE — Navbar Component
// File: src/components/layout/Navbar.tsx
//
// Top navigation bar shown on every page.
// "use client" because it uses useState for the mobile menu toggle.
// =============================================================

"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  // Tracks whether the mobile hamburger menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TODO: once NextAuth session is wired up, replace this with real session check
  // const { data: session } = useSession();
  const isLoggedIn = false; // placeholder until auth UI is connected

  const navLinks = [
    { label: "Brokers", href: "/brokers" },
    { label: "Learn", href: "/learn" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">Stockwise</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
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
            {isLoggedIn ? (
              <Button href="/dashboard" variant="outline" size="sm">
                Dashboard
              </Button>
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
              // X icon when open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu — only shows when mobileMenuOpen is true */}
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
              <Button href="/auth/login" variant="outline" fullWidth>
                Log In
              </Button>
              <Button href="/auth/register" variant="primary" fullWidth>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

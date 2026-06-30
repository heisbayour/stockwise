// =============================================================
// STOCKWISE — Hero Section
// File: src/components/home/HeroSection.tsx
//
// The big headline banner at the top of the homepage.
// =============================================================

import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Invest in Nigeria's Future,{" "}
          <span className="text-emerald-600">The Right Way</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Stockwise connects you to SEC-licensed Nigerian stock brokers, teaches you how
          investing works, and helps you start your journey with confidence — not confusion.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/auth/register" size="lg">
            Start Investing Today
          </Button>
          <Button href="/learn" variant="outline" size="lg">
            Learn the Basics First
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            11 Verified Brokers
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            SEC-Licensed Partners Only
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            100% Free to Use
          </span>
        </div>
      </div>
    </section>
  );
}

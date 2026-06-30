// =============================================================
// STOCKWISE — About Page
// File: src/app/(legal)/about/page.tsx
// Route: /about
//
// The (legal) folder name is a Next.js "route group" — the
// parentheses mean it doesn't appear in the URL, it's just for
// organizing related static pages together in the file system.
// =============================================================

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Stockwise</h1>

      <div className="prose prose-emerald max-w-none space-y-6 text-gray-600">
        <p>
          Stockwise exists to close the gap between curious Nigerians and the stock market.
          Too many people want to invest but don&apos;t know where to start, who to trust, or
          how the process even works.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">What We Do</h2>
        <p>
          We connect you to SEC-licensed Nigerian stock brokers, teach you the fundamentals of
          investing through a free educational roadmap, and help you compare brokers
          transparently — fees, requirements, and reviews side by side.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">What We Don&apos;t Do</h2>
        <p>
          Stockwise is not a stockbroker. We do not execute trades, hold your money, or manage
          your investments. When you&apos;re ready to invest, we connect you directly to your
          chosen broker&apos;s official platform, where they handle the regulated parts of the
          process.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Why It Matters</h2>
        <p>
          Nigeria has a young, ambitious population and a stock market that&apos;s still
          under-explored by everyday people. We believe that with the right information and
          trustworthy guidance, more Nigerians can build long-term wealth through investing —
          not just saving.
        </p>
      </div>
    </main>
  );
}

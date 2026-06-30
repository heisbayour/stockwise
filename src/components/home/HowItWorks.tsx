// =============================================================
// STOCKWISE — How It Works Section
// File: src/components/home/HowItWorks.tsx
// =============================================================

const steps = [
  {
    number: "01",
    title: "Learn the Basics",
    description:
      "Work through our free 10-lesson roadmap covering everything from what a stock is to managing risk.",
  },
  {
    number: "02",
    title: "Compare Brokers",
    description:
      "Browse verified, SEC-licensed brokers. Compare fees, minimum deposits, and reviews side by side.",
  },
  {
    number: "03",
    title: "Open Your Account",
    description:
      "We connect you directly to your chosen broker's official platform to open an account safely.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">How Stockwise Works</h2>
          <p className="mt-3 text-gray-600">Three simple steps from curious to confident investor.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-bold text-emerald-100">{step.number}</span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

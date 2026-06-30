// =============================================================
// STOCKWISE — Featured Brokers Section
// File: src/components/home/FeaturedBrokers.tsx
//
// This is a SERVER COMPONENT (no "use client") — it fetches directly
// from the database using Prisma. Next.js runs this on the server
// before sending HTML to the browser.
// =============================================================

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default async function FeaturedBrokers() {
  // Fetch only featured, active brokers — limit to 3 for the homepage
  const brokers = await prisma.broker.findMany({
    where: { isActive: true, isFeatured: true },
    take: 3,
    orderBy: { trustScore: "desc" },
  });

  // If seed data hasn't run yet, don't crash — show nothing gracefully
  if (brokers.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Brokers</h2>
            <p className="mt-2 text-gray-600">Trusted, SEC-licensed brokers to start with.</p>
          </div>
          <Link href="/brokers" className="text-emerald-600 font-medium hover:underline hidden sm:block">
            View all brokers →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <Link
              key={broker.id}
              href={`/brokers/${broker.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{broker.name}</h3>
                {broker.secLicensed && <Badge color="green">SEC Licensed</Badge>}
              </div>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{broker.description}</p>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Min deposit: <span className="font-medium text-gray-900">₦{broker.minimumDeposit?.toLocaleString()}</span>
                </span>
                <Badge color={broker.type === "DIGITAL" ? "blue" : "gray"}>
                  {broker.type === "DIGITAL" ? "Digital" : "Traditional"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button href="/brokers" variant="outline">
            View All Brokers
          </Button>
        </div>
      </div>
    </section>
  );
}

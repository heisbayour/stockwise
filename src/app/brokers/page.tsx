// =============================================================
// STOCKWISE — Broker Directory Page
// File: src/app/brokers/page.tsx
// Route: /brokers?type=DIGITAL&secOnly=true&sort=trustScore
//
// Server Component — reads filters straight from the URL's
// searchParams (passed in automatically by Next.js) and queries
// the database accordingly. No client-side fetching needed.
// =============================================================

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import BrokerCard from "@/components/broker/BrokerCard";
import BrokerFilter from "@/components/broker/BrokerFilter";

interface BrokersPageProps {
  searchParams: Promise<{
    type?: string;
    secOnly?: string;
    sort?: string;
  }>;
}

export default async function BrokersPage({ searchParams }: BrokersPageProps) {
  // Next.js 14+ passes searchParams as a Promise — must await it
  const params = await searchParams;

  // Build the Prisma `where` clause dynamically based on active filters
  const where: Prisma.BrokerWhereInput = {
    isActive: true,
    ...(params.type === "DIGITAL" || params.type === "TRADITIONAL"
      ? { type: params.type }
      : {}),
    ...(params.secOnly === "true" ? { secLicensed: true } : {}),
  };

  // Build the `orderBy` clause based on the selected sort option
  const orderBy: Prisma.BrokerOrderByWithRelationInput =
    params.sort === "minDeposit"
      ? { minimumDeposit: "asc" }
      : params.sort === "name"
        ? { name: "asc" }
        : { trustScore: "desc" }; // default sort

  const brokers = await prisma.broker.findMany({ where, orderBy });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Browse Brokers</h1>
        <p className="mt-2 text-gray-600">
          Compare {brokers.length} verified Nigerian stock brokers by fees, requirements, and trust score.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <BrokerFilter />

        {/* Results grid */}
        <div className="flex-1">
          {brokers.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No brokers match your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {brokers.map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

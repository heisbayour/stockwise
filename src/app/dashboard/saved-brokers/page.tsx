// =============================================================
// STOCKWISE — Saved Brokers Page
// File: src/app/dashboard/saved-brokers/page.tsx
// Route: /dashboard/saved-brokers
// =============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SavedBrokerRow from "@/components/dashboard/SavedBrokerRow";

export default async function SavedBrokersPage() {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const savedBrokers = await prisma.savedBroker.findMany({
    where: { userId },
    include: { broker: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Saved Brokers</h1>
      <p className="text-gray-600 mb-6">Brokers you&apos;ve bookmarked for later.</p>

      {savedBrokers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-4">You haven&apos;t saved any brokers yet.</p>
          <Link href="/brokers" className="text-emerald-600 font-medium hover:underline">
            Browse brokers →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedBrokers.map((saved) => (
            <SavedBrokerRow key={saved.id} broker={saved.broker} />
          ))}
        </div>
      )}
    </div>
  );
}

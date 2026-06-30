// =============================================================
// STOCKWISE — Watchlist Page
// File: src/app/dashboard/watchlist/page.tsx
// Route: /dashboard/watchlist
//
// NOTE: No live NGX price data here — see IMPLEMENTATION.md Phase 8.
// This tracks which stocks the user is interested in, not live prices.
// =============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddWatchlistForm from "@/components/dashboard/AddWatchlistForm";
import WatchlistRow from "@/components/dashboard/WatchlistRow";

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Watchlist</h1>
      <p className="text-gray-600 mb-6">
        Track stocks you&apos;re interested in. Live prices aren&apos;t available yet — for current
        prices, check the{" "}
        <a
          href="https://ngxgroup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          official NGX website
        </a>
        .
      </p>

      <div className="mb-6">
        <AddWatchlistForm />
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No stocks in your watchlist yet. Add one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {watchlist.map((item) => (
            <WatchlistRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

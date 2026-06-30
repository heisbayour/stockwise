// =============================================================
// STOCKWISE — Dashboard Overview Page
// File: src/app/dashboard/page.tsx
// Route: /dashboard
//
// Protected by middleware.ts — only logged-in users reach this page.
// Pulls together a summary of the user's activity across the platform.
// =============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";

export default async function DashboardPage() {
  // Safe to assume session exists — middleware already enforced login.
  // The "!" tells TypeScript we're confident this isn't null here.
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;

  // Fetch everything needed for the overview in parallel for speed
  const [user, savedBrokers, watchlistItems, totalLessons, completedLessons] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.savedBroker.findMany({
      where: { userId },
      include: { broker: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.watchlist.findMany({
      where: { userId },
      take: 5,
      orderBy: { addedAt: "desc" },
    }),
    prisma.article.count({ where: { category: "LESSON", isPublished: true } }),
    prisma.learningProgress.count({ where: { userId, completed: true } }),
  ]);

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName ?? "there"} 👋
        </h1>
        <p className="mt-1 text-gray-600">Here&apos;s where you left off.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Lessons" value={`${completedLessons}/${totalLessons}`} href="/learn" accentColor="emerald" />
        <StatCard label="Saved Brokers" value={savedBrokers.length} href="/dashboard/saved-brokers" accentColor="blue" />
        <StatCard label="Watchlist" value={watchlistItems.length} href="/dashboard/watchlist" accentColor="amber" />
      </div>

      {/* Learning progress */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Learning Progress</h2>
          <Link href="/learn" className="text-sm text-emerald-600 hover:underline">
            Continue learning →
          </Link>
        </div>
        <ProgressBar current={completedLessons} total={totalLessons} />
      </section>

      {/* Saved brokers preview */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Saved Brokers</h2>
          <Link href="/dashboard/saved-brokers" className="text-sm text-emerald-600 hover:underline">
            View all →
          </Link>
        </div>

        {savedBrokers.length === 0 ? (
          <p className="text-sm text-gray-500">
            No saved brokers yet.{" "}
            <Link href="/brokers" className="text-emerald-600 hover:underline">
              Browse brokers
            </Link>{" "}
            to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {savedBrokers.map((saved) => (
              <Link
                key={saved.id}
                href={`/brokers/${saved.broker.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium text-sm text-gray-900">{saved.broker.name}</span>
                <Badge color={saved.broker.type === "DIGITAL" ? "blue" : "gray"}>
                  {saved.broker.type === "DIGITAL" ? "Digital" : "Traditional"}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Watchlist preview */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Watchlist</h2>
          <Link href="/dashboard/watchlist" className="text-sm text-emerald-600 hover:underline">
            View all →
          </Link>
        </div>

        {watchlistItems.length === 0 ? (
          <p className="text-sm text-gray-500">
            Your watchlist is empty.{" "}
            <Link href="/dashboard/watchlist" className="text-emerald-600 hover:underline">
              Add stocks
            </Link>{" "}
            to track them here.
          </p>
        ) : (
          <div className="space-y-2">
            {watchlistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div>
                  <span className="font-medium text-sm text-gray-900">{item.ticker}</span>
                  <span className="text-sm text-gray-500 ml-2">{item.companyName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

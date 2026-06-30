// =============================================================
// STOCKWISE — Broker Detail Page
// File: src/app/brokers/[slug]/page.tsx
// Route: /brokers/meristem-securities
//
// Server Component — fetches one broker by its URL slug, along
// with its requirements and reviews, and checks the current
// user's session to decide what to show (review form vs login prompt).
// =============================================================

import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TrustScoreBadge from "@/components/broker/TrustScoreBadge";
import RequirementsChecklist from "@/components/broker/RequirementsChecklist";
import BrokerReviewList from "@/components/broker/BrokerReviewList";
import BrokerReviewForm from "@/components/broker/BrokerReviewForm";
import StarRating from "@/components/ui/StarRating";
import { formatNaira, formatYears } from "@/lib/formatters";

interface BrokerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrokerDetailPage({ params }: BrokerDetailPageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  const broker = await prisma.broker.findUnique({
    where: { slug, isActive: true },
    include: {
      openingRequirements: true,
      reviews: {
        include: { user: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  // If no broker matches this slug, show Next.js's built-in 404 page
  if (!broker) {
    notFound();
  }

  // Calculate average rating from the loaded reviews
  const avgRating =
    broker.reviews.length > 0
      ? broker.reviews.reduce((sum, r) => sum + r.rating, 0) / broker.reviews.length
      : 0;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900">{broker.name}</h1>
            <Badge color={broker.type === "DIGITAL" ? "blue" : "gray"}>
              {broker.type === "DIGITAL" ? "Digital" : "Traditional"}
            </Badge>
            {broker.secLicensed && <Badge color="green">SEC Licensed</Badge>}
          </div>

          {broker.reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={avgRating} size="sm" />
              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({broker.reviews.length} review{broker.reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>

        <TrustScoreBadge score={broker.trustScore} />
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-8">
        {/* Main content column */}
        <div className="md:col-span-2 space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{broker.description}</p>
          </section>

          {/* Account requirements */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Account Opening Requirements</h2>
            <RequirementsChecklist requirements={broker.openingRequirements} />
          </section>

          {/* What they offer */}
          {(broker.supportedAssets.length > 0 || broker.features.length > 0) && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">What They Offer</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {broker.supportedAssets.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Supported Assets</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {broker.supportedAssets.map((asset) => (
                        <span key={asset} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {broker.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {broker.features.map((feature) => (
                        <span key={feature} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
            <div className="mb-6">
              <BrokerReviewForm brokerId={broker.id} isLoggedIn={!!session} />
            </div>
            <BrokerReviewList reviews={broker.reviews} />
          </section>
        </div>

        {/* Sidebar — fees + CTA */}
        <aside className="md:col-span-1">
          <div className="sticky top-20 bg-gray-50 rounded-xl p-6 space-y-4">
            <div>
              <span className="text-xs text-gray-400 block">Minimum Deposit</span>
              <span className="text-lg font-semibold text-gray-900">{formatNaira(broker.minimumDeposit)}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Trading Fee</span>
              <span className="text-lg font-semibold text-gray-900">{broker.tradingFeePercent}%</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Years Operating</span>
              <span className="text-lg font-semibold text-gray-900">{formatYears(broker.yearsOperating)}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Account Types</span>
              <span className="text-sm text-gray-700">{broker.accountTypes.join(", ") || "N/A"}</span>
            </div>

            {/* This is the core redirect — Stockwise does NOT host account opening */}
            <a href={broker.website} target="_blank" rel="noopener noreferrer" className="block pt-2">
              <Button fullWidth>Open Account with {broker.name} →</Button>
            </a>
            <p className="text-xs text-gray-400 text-center">
              You&apos;ll be redirected to {broker.name}&apos;s official website
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

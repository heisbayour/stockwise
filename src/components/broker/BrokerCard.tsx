// =============================================================
// STOCKWISE — Broker Card
// File: src/components/broker/BrokerCard.tsx
//
// Used in the /brokers listing grid. One card per broker.
// =============================================================

import Link from "next/link";
import { Broker } from "@prisma/client";
import Badge from "@/components/ui/Badge";
import { formatNaira, formatYears } from "@/lib/formatters";

interface BrokerCardProps {
  broker: Broker & { _avgRating?: number; _reviewCount?: number };
}

export default function BrokerCard({ broker }: BrokerCardProps) {
  return (
    <Link
      href={`/brokers/${broker.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-emerald-200 transition-all"
    >
      {/* Header: name + type badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{broker.name}</h3>
        <Badge color={broker.type === "DIGITAL" ? "blue" : "gray"}>
          {broker.type === "DIGITAL" ? "Digital" : "Traditional"}
        </Badge>
      </div>

      {/* SEC licensed indicator */}
      {broker.secLicensed && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-emerald-700">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          SEC Licensed
        </div>
      )}

      {/* Description preview */}
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{broker.description}</p>

      {/* Key stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-400 block text-xs">Min. Deposit</span>
          <span className="font-medium text-gray-900">{formatNaira(broker.minimumDeposit)}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-xs">Trading Fee</span>
          <span className="font-medium text-gray-900">{broker.tradingFeePercent}%</span>
        </div>
        <div>
          <span className="text-gray-400 block text-xs">Operating</span>
          <span className="font-medium text-gray-900">{formatYears(broker.yearsOperating)}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-xs">Trust Score</span>
          <span className="font-medium text-gray-900">{broker.trustScore ?? "N/A"}/100</span>
        </div>
      </div>

      {/* Asset tags */}
      {broker.supportedAssets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {broker.supportedAssets.slice(0, 3).map((asset) => (
            <span key={asset} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {asset}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

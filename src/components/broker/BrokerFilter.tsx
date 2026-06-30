// =============================================================
// STOCKWISE — Broker Filter Sidebar
// File: src/components/broker/BrokerFilter.tsx
//
// Filters use URL search params (not local state) so filtered
// results are shareable/bookmarkable links, and the page can stay
// a Server Component that reads searchParams directly.
// =============================================================

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function BrokerFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current filter values from the URL, with sensible defaults
  const currentType = searchParams.get("type") ?? "all";
  const secOnly = searchParams.get("secOnly") === "true";
  const sortBy = searchParams.get("sort") ?? "trustScore";

  // Generic helper: updates one query param and pushes the new URL.
  // Removing a param entirely when it's the "default" keeps URLs clean.
  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "all" || value === "false") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Broker type filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Broker Type</h3>
        <div className="space-y-2">
          {[
            { label: "All Brokers", value: "all" },
            { label: "Traditional", value: "TRADITIONAL" },
            { label: "Digital", value: "DIGITAL" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="type"
                checked={currentType === option.value}
                onChange={() => updateParam("type", option.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* SEC licensed toggle */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Verification</h3>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={secOnly}
            onChange={(e) => updateParam("secOnly", e.target.checked ? "true" : "false")}
            className="rounded text-emerald-600 focus:ring-emerald-500"
          />
          SEC Licensed only
        </label>
      </div>

      {/* Sort order */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="trustScore">Trust Score (High to Low)</option>
          <option value="minDeposit">Minimum Deposit (Low to High)</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {/* Clear all filters */}
      {(currentType !== "all" || secOnly || sortBy !== "trustScore") && (
        <button
          onClick={() => router.push(pathname)}
          className="text-sm text-emerald-600 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

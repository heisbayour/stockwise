// =============================================================
// STOCKWISE — Watchlist Row
// File: src/components/dashboard/WatchlistRow.tsx
// =============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Watchlist } from "@prisma/client";

interface WatchlistRowProps {
  item: Watchlist;
}

export default function WatchlistRow({ item }: WatchlistRowProps) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  async function handleRemove() {
    setIsRemoving(true);

    try {
      const response = await fetch(`/api/watchlist/${item.id}`, { method: "DELETE" });
      if (response.ok) {
        setIsHidden(true);
        router.refresh();
      }
    } catch {
      setIsRemoving(false);
    }
  }

  if (isHidden) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
      <div>
        <span className="font-semibold text-gray-900">{item.ticker}</span>
        <span className="text-sm text-gray-500 ml-2">{item.companyName}</span>
      </div>

      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="text-sm text-gray-400 hover:text-red-600 transition-colors"
      >
        {isRemoving ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}

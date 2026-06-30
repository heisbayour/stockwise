// =============================================================
// STOCKWISE — Saved Broker Row
// File: src/components/dashboard/SavedBrokerRow.tsx
//
// One row in the saved brokers list, with a remove (unsave) button.
// Calls the same /api/brokers/:id/save toggle route used on the
// broker detail page — POST again removes it since it's a toggle.
// =============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Broker } from "@prisma/client";
import Badge from "@/components/ui/Badge";
import { formatNaira } from "@/lib/formatters";

interface SavedBrokerRowProps {
  broker: Broker;
}

export default function SavedBrokerRow({ broker }: SavedBrokerRowProps) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  async function handleRemove() {
    setIsRemoving(true);

    try {
      const response = await fetch(`/api/brokers/${broker.id}/save`, { method: "POST" });
      if (response.ok) {
        setIsHidden(true); // optimistically hide it immediately
        router.refresh(); // sync server state in the background
      }
    } catch {
      setIsRemoving(false);
    }
  }

  // Hide instantly once removed rather than waiting for a full page refresh
  if (isHidden) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
      <Link href={`/brokers/${broker.slug}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900">{broker.name}</span>
          <Badge color={broker.type === "DIGITAL" ? "blue" : "gray"}>
            {broker.type === "DIGITAL" ? "Digital" : "Traditional"}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Min. deposit: {formatNaira(broker.minimumDeposit)}</p>
      </Link>

      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="ml-4 text-sm text-gray-400 hover:text-red-600 transition-colors shrink-0"
      >
        {isRemoving ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}

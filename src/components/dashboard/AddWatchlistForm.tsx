// =============================================================
// STOCKWISE — Add to Watchlist Form
// File: src/components/dashboard/AddWatchlistForm.tsx
//
// Simple manual entry since there's no free live NGX ticker search
// API for MVP (see IMPLEMENTATION.md Phase 8 notes). User types the
// ticker and company name directly.
// =============================================================

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AddWatchlistForm() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Tickers are conventionally uppercase, e.g. "DANGCEM", "MTNN"
        body: JSON.stringify({ ticker: ticker.toUpperCase(), companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add stock");
        setIsSubmitting(false);
        return;
      }

      setTicker("");
      setCompanyName("");
      router.refresh(); // re-fetch the watchlist to show the new item
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Add a Stock</h3>
      <div className="grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-end">
        <Input
          label="Ticker"
          placeholder="e.g. MTNN"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />
        <Input
          label="Company Name"
          placeholder="e.g. MTN Nigeria"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}

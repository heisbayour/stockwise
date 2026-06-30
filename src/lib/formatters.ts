// =============================================================
// STOCKWISE — Formatters
// File: src/lib/formatters.ts
//
// Shared formatting helpers — keeps Naira/date/number formatting
// consistent everywhere instead of repeating logic in every component.
// =============================================================

/**
 * Format a number as Nigerian Naira.
 * formatNaira(50000) => "₦50,000"
 * formatNaira(50000, true) => "₦50,000.00"
 */
export function formatNaira(amount: number | null | undefined, showDecimals = false): string {
  if (amount === null || amount === undefined) return "N/A";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Format a percentage value.
 * formatPercent(1.35) => "1.35%"
 */
export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "N/A";
  return `${value}%`;
}

/**
 * Format a date as a readable string.
 * formatDate(new Date()) => "30 June 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format a number of years as readable text.
 * formatYears(1) => "1 year"
 * formatYears(20) => "20 years"
 */
export function formatYears(years: number | null | undefined): string {
  if (!years) return "N/A";
  return years === 1 ? "1 year" : `${years} years`;
}

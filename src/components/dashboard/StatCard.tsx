// =============================================================
// STOCKWISE — Dashboard Stat Card
// File: src/components/dashboard/StatCard.tsx
//
// Small summary card used on the dashboard overview
// (e.g. "3 of 10 lessons", "4 saved brokers").
// =============================================================

import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string | number;
  href: string;
  accentColor?: "emerald" | "blue" | "amber";
}

const accentMap = {
  emerald: "text-emerald-600 bg-emerald-50",
  blue: "text-blue-600 bg-blue-50",
  amber: "text-amber-600 bg-amber-50",
};

export default function StatCard({ label, value, href, accentColor = "emerald" }: StatCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
    >
      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${accentMap[accentColor]}`}>
        {label}
      </span>
      <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
    </Link>
  );
}

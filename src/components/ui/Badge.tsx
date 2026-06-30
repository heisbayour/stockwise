// =============================================================
// STOCKWISE — Badge Component
// File: src/components/ui/Badge.tsx
//
// Small colored pill labels: "SEC Licensed", "Digital", "Traditional"
// Usage: <Badge color="green">SEC Licensed</Badge>
// =============================================================

import { ReactNode } from "react";

type BadgeColor = "green" | "blue" | "gray" | "amber" | "red";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
}

const colorStyles: Record<BadgeColor, string> = {
  green: "bg-emerald-100 text-emerald-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-700",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
};

export default function Badge({ children, color = "gray" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorStyles[color]}`}
    >
      {children}
    </span>
  );
}

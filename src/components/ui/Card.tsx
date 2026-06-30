// =============================================================
// STOCKWISE — Card Component
// File: src/components/ui/Card.tsx
//
// Generic white box with shadow — wraps broker cards, lesson cards, etc.
// Usage: <Card><p>Content here</p></Card>
// =============================================================

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean; // adds a hover lift effect — good for clickable cards
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 ${
        hoverable ? "transition-shadow hover:shadow-md cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

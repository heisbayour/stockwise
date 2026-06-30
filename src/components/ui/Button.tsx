// =============================================================
// STOCKWISE — Button Component
// File: src/components/ui/Button.tsx
//
// A single reusable button with consistent styling everywhere.
// Usage: <Button variant="primary">Get Started</Button>
// =============================================================

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string; // if provided, renders as a Link instead of a button
  children: ReactNode;
  fullWidth?: boolean;
}

// Style maps — Tailwind classes per variant/size, kept in one place
// so every button in the app stays visually consistent
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
  outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-7 py-3.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  fullWidth = false,
  className = "",
  ...rest // spreads any extra props like onClick, type, disabled
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  // If href is given, render as a navigable link styled like a button
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // Otherwise render as a real <button> for form submits / onClick handlers
  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
}

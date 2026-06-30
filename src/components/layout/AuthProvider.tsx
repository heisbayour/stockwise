// =============================================================
// STOCKWISE — Auth Provider Wrapper
// File: src/components/layout/AuthProvider.tsx
//
// NextAuth's useSession() and signIn() hooks only work inside a
// <SessionProvider>. Since the root layout is a Server Component,
// we wrap SessionProvider in this small "use client" component
// and use IT inside layout.tsx instead.
// =============================================================

"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

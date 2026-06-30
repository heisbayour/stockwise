// =============================================================
// STOCKWISE — NextAuth Type Extension
// File: src/types/next-auth.d.ts
//
// By default, NextAuth's Session type only has name/email/image.
// We extended it in auth.ts to also include `id` and `role` —
// this file tells TypeScript about that extension so it doesn't
// throw "Property 'id' does not exist on type..." errors.
// =============================================================

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name?: string | null;
    };
  }
}

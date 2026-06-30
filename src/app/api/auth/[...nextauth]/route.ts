// =============================================================
// STOCKWISE — NextAuth API Handler
// File: src/app/api/auth/[...nextauth]/route.ts
//
// This single file handles ALL NextAuth requests:
// /api/auth/signin, /api/auth/signout, /api/auth/session, /api/auth/callback, etc.
// The [...nextauth] folder name is a "catch-all" route in Next.js.
// =============================================================

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// NextAuth needs both GET (for session checks, sign-in pages)
// and POST (for actual sign-in/sign-out actions)
export { handler as GET, handler as POST };

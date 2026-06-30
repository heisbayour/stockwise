// =============================================================
// STOCKWISE — Prisma Client Singleton
// File: src/lib/prisma.ts
//
// Why a singleton? Next.js hot-reloads in development, which would
// create a new database connection on every file change — eventually
// exhausting the connection pool. This pattern reuses the same
// Prisma instance across hot reloads.
// =============================================================

import { PrismaClient } from "@prisma/client";

// Extend the global Node.js type to include our prisma instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // In dev, log every SQL query to the console — very helpful for debugging
    // In production, only log errors — reduces noise
  });

// In development, attach to global so hot-reload doesn't create new instances
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

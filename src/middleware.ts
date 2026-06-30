// =============================================================
// STOCKWISE — Route Protection Middleware
// File: src/middleware.ts  (MUST be at src/ root, not inside app/)
//
// Runs BEFORE any matched page loads. If the user isn't logged in
// and tries to visit /dashboard/anything, NextAuth automatically
// redirects them to the login page (set in src/lib/auth.ts pages config).
// =============================================================

export { default } from "next-auth/middleware";

export const config = {
  // Any route matching these patterns requires a valid session.
  // :path* means "this route and everything nested under it"
  matcher: ["/dashboard/:path*"],
};

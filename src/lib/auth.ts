// =============================================================
// STOCKWISE — NextAuth Configuration
// File: src/lib/auth.ts
//
// NextAuth handles the session layer. We use "Credentials" provider
// (email + password) since we're building custom auth with OTP.
//
// What NextAuth gives us for free:
// - Session management (JWT cookies)
// - CSRF protection
// - Protected route middleware
// =============================================================

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyPassword } from "./auth-utils";

export const authOptions: NextAuthOptions = {
  // Use JWT strategy — sessions stored in encrypted cookies, not DB
  // This is simpler and scales better for MVP
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days — user stays logged in
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // This runs on every login attempt
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Look up the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        // If no user found, or password doesn't match — same error message
        // Don't say "user not found" specifically — it reveals account existence
        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await verifyPassword(credentials.password, user.passwordHash);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Must have verified email to log in
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        // Return the user object — this gets encoded in the JWT
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Add custom fields to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    // Add custom fields to the session object
    // This is what you get when you call `useSession()` in components
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    // Custom pages instead of NextAuth's default ugly ones
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

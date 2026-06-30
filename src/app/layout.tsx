// =============================================================
// STOCKWISE — Root Layout (with AuthProvider)
// File: src/app/layout.tsx
//
// Wraps EVERY page in the app. AuthProvider must wrap Navbar and
// children so useSession() works anywhere in the component tree.
// =============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/layout/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Stockwise — Invest in Nigeria, The Right Way",
  description:
    "Stockwise connects Nigerian investors to SEC-licensed stock brokers and teaches you how to invest with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-gray-900`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

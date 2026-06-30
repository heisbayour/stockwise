// =============================================================
// STOCKWISE — Root Layout
// File: src/app/layout.tsx
//
// This wraps EVERY page in the app. Navbar + Footer live here once
// instead of being repeated on every page.
// =============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Google Font — loaded once, applied via CSS variable
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// SEO metadata — shows in browser tab + search engine results
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

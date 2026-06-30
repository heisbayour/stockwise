// =============================================================
// STOCKWISE — Footer Component
// File: src/components/layout/Footer.tsx
// =============================================================

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: "Browse Brokers", href: "/brokers" },
      { label: "Learn Investing", href: "/learn" },
      { label: "About Us", href: "/about" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    Support: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/learn" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold text-white">Stockwise</span>
            <p className="mt-3 text-sm text-gray-400">
              Connecting Nigerian investors to licensed, trustworthy stock brokers.
            </p>
          </div>

          {/* Link columns — generated from the footerLinks object above */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-3">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-emerald-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {currentYear} Stockwise. All rights reserved.</p>
          <p className="text-xs text-gray-600 max-w-md text-center sm:text-right">
            Stockwise is not a licensed broker-dealer. We connect users to SEC-licensed brokers
            and do not execute trades or hold investments.
          </p>
        </div>
      </div>
    </footer>
  );
}

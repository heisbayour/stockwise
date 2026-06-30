// =============================================================
// STOCKWISE — Terms of Service Page
// File: src/app/(legal)/terms/page.tsx
// Route: /terms
//
// NOTE: This is a starter template. Have an actual Nigerian lawyer
// review this before going live — especially the broker-redirect
// liability language, since that's core to Stockwise's legal model.
// =============================================================

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <div className="prose prose-emerald max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. About Stockwise</h2>
          <p>
            Stockwise is an educational and broker-discovery platform. We are not a licensed
            stockbroker, investment advisor, or financial institution. We do not execute trades,
            hold funds, or manage investments on your behalf.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Broker Connections</h2>
          <p>
            When you choose to open an account with a broker listed on Stockwise, you will be
            redirected to that broker&apos;s official website. Any agreement you enter into is
            between you and that broker. Stockwise is not a party to that agreement and is not
            responsible for the broker&apos;s services, fees, or conduct.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Educational Content</h2>
          <p>
            All articles, lessons, and guides on Stockwise are provided for general educational
            purposes only. Nothing on this platform constitutes financial, investment, or legal
            advice. You should conduct your own research and consult a licensed professional
            before making investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials.
            You agree to provide accurate information when registering and to notify us of any
            unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Reviews and Content</h2>
          <p>
            Reviews submitted by users must reflect genuine experiences. Stockwise reserves the
            right to remove reviews that are fraudulent, abusive, or violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
          <p>
            Stockwise provides information &quot;as is&quot; without warranties of any kind. We
            are not liable for investment losses, broker disputes, or decisions made based on
            information found on this platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of Stockwise after
            changes are posted constitutes acceptance of the updated Terms.
          </p>
        </section>
      </div>
    </main>
  );
}

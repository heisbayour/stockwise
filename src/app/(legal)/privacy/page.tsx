// =============================================================
// STOCKWISE — Privacy Policy Page
// File: src/app/(legal)/privacy/page.tsx
// Route: /privacy
//
// NOTE: This is a starter template. Have an actual Nigerian lawyer
// review this before going live, especially regarding NDPR (Nigeria
// Data Protection Regulation) compliance for NIN/BVN-adjacent data.
// =============================================================

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: June 2026</p>

      <div className="prose prose-emerald max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>
            When you create a Stockwise account, we collect your name, email address, phone
            number, and, if you provide it, your National Identification Number (NIN). This
            information helps us verify your identity and personalize your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>
            We use your information to manage your account, track your learning progress, save
            your broker preferences, and send you important account notifications. We do not
            sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Sharing with Brokers</h2>
          <p>
            Stockwise does not automatically share your personal information with brokers. When
            you choose to open an account with a broker, you will be redirected to their
            platform, where you will provide your own information directly to them under their
            own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
          <p>
            Passwords are encrypted using industry-standard hashing before storage. We never
            store your password in readable form. Your NIN, where provided, is stored securely
            and used only for identity verification purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
          <p>
            You may request to view, update, or delete your personal information at any time by
            contacting us or through your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out via our contact
            page.
          </p>
        </section>
      </div>
    </main>
  );
}

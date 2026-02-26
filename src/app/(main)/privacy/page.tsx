import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: February 27, 2026</p>

      <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
          <p>
            When you register on Kickvora, we collect your username, email address, and a securely
            hashed version of your password. We also collect data about the teams you create and
            your activity on the platform, such as match participation and leaderboard rankings.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
            <li>Create and manage your account</li>
            <li>Display your performance and rankings on leaderboards</li>
            <li>Improve the platform and user experience</li>
            <li>Respond to support requests</li>
            <li>Send important platform updates (you may opt out at any time)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">3. Data Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect your personal data.
            Passwords are stored using industry-standard bcrypt hashing and are never stored in
            plain text. Sessions are managed using secure, HTTP-only cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">4. Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We may share
            data with trusted service providers who assist in operating the platform, under strict
            confidentiality obligations. We may also disclose information if required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">5. Cookies</h2>
          <p>
            Kickvora uses HTTP-only session cookies to keep you logged in. These cookies do not
            track you across other websites and are deleted when your session ends or you log out.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. To make a request,
            contact us at{" "}
            <a href="mailto:support@kickvora.com" className="text-indigo-600 hover:underline">
              support@kickvora.com
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">7. Children&apos;s Privacy</h2>
          <p>
            Kickvora is not intended for users under the age of 18. We do not knowingly collect
            personal information from minors. If you believe a minor has registered, please contact
            us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify registered users
            of significant changes via email. Continued use of the platform after changes are
            posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">9. Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:support@kickvora.com" className="text-indigo-600 hover:underline">
              support@kickvora.com
            </a>
            .
          </p>
          <p className="mt-2">
            Kickvora, G 93-94, D block, Baani Square, Sector 50, Gurugram, Haryana 122018, India.
          </p>
        </section>
      </div>
    </div>
  );
}

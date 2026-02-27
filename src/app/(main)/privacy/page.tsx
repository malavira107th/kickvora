import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy | Kickvora",
  description:
    "Read the Kickvora Privacy Policy. Learn how we collect, use, and protect your personal information on our free sports strategy platform.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-indigo-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-indigo-200 text-base">Last updated: 27 February 2025</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14">
        {/* Intro */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-10">
          <p className="text-sm text-indigo-800 leading-relaxed">
            Your privacy matters to us. Kickvora collects only the information necessary to operate
            the Platform and does not sell or share your personal data with advertisers. We do not
            process any financial data because Kickvora is entirely free to use.
          </p>
        </div>

        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kickvora is a free-to-use, skill-based sports strategy platform operated from G 93-94,
              D Block, Baani Square, Sector 50, Gurugram, Haryana 122018, India. We can be reached
              at{" "}
              <a href="mailto:support@kickvora.com" className="text-indigo-600">
                support@kickvora.com
              </a>
              .
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              We collect the following types of information:
            </p>
            <ul className="space-y-2">
              {[
                "Account information: When you register, we collect your name, email address, and a securely hashed password.",
                "Usage data: We collect information about how you use the Platform, including matches you participate in, teams you create, and pages you visit.",
                "Device and technical data: We automatically collect your IP address, browser type, operating system, and referring URLs to ensure the Platform functions correctly.",
                "Communications: If you contact us via email or the contact form, we retain that correspondence.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="space-y-2">
              {[
                "Create and manage your account.",
                "Operate the Platform, including team scoring and leaderboard ranking.",
                "Respond to your support requests and communications.",
                "Improve the Platform's features, performance, and user experience.",
                "Send you important service-related communications such as account updates.",
                "Detect and prevent fraudulent or abusive activity.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. How We Store and Protect Your Data</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Your data is stored on secure servers. We implement industry-standard technical and
              organisational measures to protect your personal information against unauthorised
              access, alteration, disclosure, or destruction.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Passwords are stored using strong one-way hashing (bcrypt) and are never stored in
              plain text. We do not store any financial information because Kickvora does not process
              any payments or financial transactions.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data Sharing</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              We do not sell, rent, or trade your personal information to third parties. We may
              share your information only in the following limited circumstances:
            </p>
            <ul className="space-y-2">
              {[
                "Service providers: We may share data with trusted third-party providers who assist in operating the Platform (e.g., hosting, analytics), subject to strict confidentiality agreements.",
                "Legal compliance: We may disclose information if required by law, court order, or governmental authority.",
                "Business transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kickvora uses cookies and similar technologies to maintain your session after login,
              remember your preferences, and analyse Platform usage. You can control cookie settings
              through your browser. Disabling cookies may affect certain Platform features, including
              the ability to stay logged in.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              You have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2">
              {[
                "Access: You may request a copy of the personal data we hold about you.",
                "Correction: You may request that we correct inaccurate or incomplete data.",
                "Deletion: You may request that we delete your account and associated data by emailing support@kickvora.com.",
                "Objection: You may object to certain types of data processing.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:support@kickvora.com" className="text-indigo-600">
                support@kickvora.com
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Data Retention</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We retain your personal data for as long as your account is active or as needed to
              provide you with the Platform&apos;s services. If you delete your account, we will delete
              or anonymise your personal data within 30 days, except where we are required to retain
              it for legal or regulatory purposes.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kickvora is not intended for users under the age of 18. We do not knowingly collect
              personal information from anyone under 18. If we become aware that a user under 18 has
              registered, we will promptly delete their account and associated data.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Third-Party Links</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The Platform may contain links to third-party websites. We are not responsible for
              the privacy practices of those websites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </div>

          <div className="pb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. The updated version will be
              posted on this page with a revised &ldquo;Last updated&rdquo; date. We encourage you to review
              this Policy periodically. Continued use of the Platform after changes are posted
              constitutes your acceptance of the revised Policy.
            </p>
          </div>
        </div>

        {/* Contact box */}
        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">12. Contact Us</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your
            personal data, please contact us:
          </p>
          <p className="text-sm font-semibold text-gray-800">Kickvora</p>
          <p className="text-sm text-gray-600">G 93-94, D Block, Baani Square, Sector 50,</p>
          <p className="text-sm text-gray-600">Gurugram, Haryana 122018, India</p>
          <a
            href="mailto:support@kickvora.com"
            className="text-sm text-indigo-600 font-medium mt-2 inline-block"
          >
            support@kickvora.com
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/terms"
            className="flex-1 text-center bg-indigo-600 text-white font-bold py-3 rounded-xl text-sm"
          >
            Read Terms of Use
          </Link>
          <Link
            href="/contact"
            className="flex-1 text-center border border-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

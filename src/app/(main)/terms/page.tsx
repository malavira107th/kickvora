import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: February 27, 2026</p>

      <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">1. About the Platform</h2>
          <p>
            Kickvora is a free-to-use, skill-based entertainment platform designed for sports fans
            to showcase their knowledge of cricket and basketball. The platform allows users to
            create teams of real players and participate in challenges decided by the actual
            statistical performance of those players in real-world matches. Kickvora is provided
            purely for entertainment, engagement, and sports education purposes. There are no
            real-world stakes, no entry fees, and no financial rewards of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use the platform. By creating an account, you
            confirm that you meet this requirement. Users under 18 are not permitted to register.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activity that occurs under your account. You agree to provide accurate and
            complete information when registering. You may not share your account with others or
            create multiple accounts for the same person.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">4. Nature of the Platform</h2>
          <p>
            Kickvora is a game of skill. The outcome of each challenge depends on your knowledge
            of the sport, player performance, and strategic decision-making. The platform does not
            involve any element of chance, and it is not a form of gambling, wagering, or
            prediction service. No real money or financial value is involved at any stage.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
            <li>Use the platform for any illegal or unauthorized purpose</li>
            <li>Attempt to manipulate leaderboards or scoring through fraudulent means</li>
            <li>Use automated scripts or bots to interact with the platform</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Attempt to gain unauthorized access to any part of the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">6. Intellectual Property</h2>
          <p>
            All content on Kickvora, including text, graphics, logos, and software, is the property
            of Kickvora or its licensors. You may not reproduce or distribute any content from the
            platform without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">7. Disclaimer</h2>
          <p>
            The platform is provided on an &ldquo;as is&rdquo; basis. We make no warranties regarding
            the availability, accuracy, or reliability of the platform or its content.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of the courts in Gurugram, Haryana.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">9. Contact</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:support@kickvora.com" className="text-indigo-600 hover:underline">
              support@kickvora.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

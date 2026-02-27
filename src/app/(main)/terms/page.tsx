import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Use | Kickvora",
  description:
    "Read the Kickvora Terms of Use. Kickvora is a free, skill-based sports strategy platform. No real money, no wagering, no financial transactions.",
};

const sections = [
  {
    id: "1",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Kickvora platform (the "Platform"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, you must not use the Platform. These Terms apply to all users, including registered members and visitors.`,
  },
  {
    id: "2",
    title: "2. About the Platform",
    content: `Kickvora is an online skill-based sports strategy and team-building game. Users create virtual teams of real cricket and basketball players, and those teams earn points based on the actual statistical performance of the selected players in real matches.\n\nKickvora is purely an entertainment and educational platform. It does not involve any form of real-money participation, wagering, or financial reward. No entry fees are charged, and no real-world prizes, cash, or monetary equivalents are offered at any time.`,
  },
  {
    id: "3",
    title: "3. Eligibility",
    content: `To register and use Kickvora, you must:\n• Be at least 18 years of age.\n• Be a resident of a jurisdiction where use of this platform is legally permitted.\n• Provide accurate and truthful registration information.\n• Not have been previously suspended or removed from the Platform.\n\nBy registering, you confirm that you meet all eligibility requirements. Kickvora reserves the right to verify eligibility and to suspend or terminate accounts that do not comply.`,
  },
  {
    id: "4",
    title: "4. Account Registration",
    content: `You must create an account to access the full features of the Platform. You are responsible for keeping your login credentials confidential, all activity that occurs under your account, and notifying us immediately at support@kickvora.com if you suspect unauthorised access.\n\nYou may only create one account per person. Creating multiple accounts is prohibited and may result in the suspension of all associated accounts.`,
  },
  {
    id: "5",
    title: "5. Platform Rules",
    content: `When using Kickvora, you agree to:\n• Use the Platform only for its intended purpose as a sports strategy game.\n• Not use automated tools, bots, or scripts to interact with the Platform.\n• Not attempt to manipulate leaderboard scores or exploit system vulnerabilities.\n• Not share, sell, or transfer your account to another person.\n• Not engage in any conduct that is abusive, harassing, or harmful to other users.\n• Not upload or transmit any content that is unlawful, offensive, or infringing.`,
  },
  {
    id: "6",
    title: "6. Team Selection and Scoring",
    content: `Teams must be submitted before the scheduled lock time of each match. Once locked, no changes can be made to your team selection. Points are awarded based on the actual statistical performance of selected players in the corresponding real-world match.\n\nKickvora reserves the right to adjust, correct, or recalculate points in the event of data errors, match cancellations, or other exceptional circumstances. All scoring decisions made by Kickvora are final.`,
  },
  {
    id: "7",
    title: "7. No Financial Transactions",
    content: `Kickvora does not charge any fees for participation. There are no entry fees, no in-app purchases, no subscriptions, and no financial transactions of any kind on the Platform. The leaderboard is purely for recognition and entertainment purposes. No real-world rewards, prizes, or monetary equivalents are offered or implied.`,
  },
  {
    id: "8",
    title: "8. Intellectual Property",
    content: `All content on the Platform — including but not limited to the Kickvora name, logo, design, text, graphics, and software — is the intellectual property of Kickvora and is protected under applicable laws. You may not reproduce, distribute, or create derivative works from any Platform content without prior written permission.`,
  },
  {
    id: "9",
    title: "9. Disclaimer of Warranties",
    content: `The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Kickvora does not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Platform is at your own risk.`,
  },
  {
    id: "10",
    title: "10. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Kickvora shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform, including but not limited to loss of data, loss of access, or any other losses.`,
  },
  {
    id: "11",
    title: "11. Termination",
    content: `Kickvora reserves the right to suspend or terminate your account at any time, with or without notice, if you violate these Terms or engage in conduct that is harmful to the Platform or its users. You may also delete your account at any time by contacting us at support@kickvora.com.`,
  },
  {
    id: "12",
    title: "12. Governing Law",
    content: `These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana, India.`,
  },
  {
    id: "13",
    title: "13. Changes to These Terms",
    content: `Kickvora may update these Terms from time to time. The updated version will be posted on this page with a revised "Last updated" date. Continued use of the Platform after any changes constitutes your acceptance of the revised Terms.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-indigo-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-indigo-200 text-base">Last updated: 27 February 2025</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14">
        {/* Notice banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> Kickvora is a free-to-use, skill-based sports strategy
            platform. It does not involve real money, entry fees, wagering, or any form of financial
            transaction. By using Kickvora, you confirm that you understand and agree to these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
              <div className="space-y-3">
                {section.content.split("\n\n").map((para, i) => (
                  <div key={i}>
                    {para.startsWith("•") ? (
                      <ul className="space-y-1.5">
                        {para.split("\n").map((line, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                            <span>{line.replace("• ", "")}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 leading-relaxed">{para}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">14. Contact</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you have any questions about these Terms, please contact us:
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
            href="/privacy"
            className="flex-1 text-center bg-indigo-600 text-white font-bold py-3 rounded-xl text-sm"
          >
            Read Privacy Policy
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

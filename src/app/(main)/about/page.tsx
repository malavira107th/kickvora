import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Kickvora</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <p>
          Kickvora was built by a group of sports enthusiasts who wanted a smarter way to engage
          with cricket and basketball. We believe that the best sports fans are not just spectators
          — they are strategists who understand the game at a deeper level.
        </p>

        <p>
          Our platform gives you the tools to put that knowledge to use. You pick real players from
          real upcoming matches, and your team earns points based on how those players actually
          perform. It is a direct test of your sports intelligence — no luck, no shortcuts.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Our Mission</h2>
        <p>
          To make sports more engaging, educational, and community-driven. We want every fan to
          feel more connected to the game they love — not just as a viewer, but as an active
          participant in the strategy of it all.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">What Makes Kickvora Different</h2>
        <p>
          Kickvora is entirely free to use. There are no entry fees, no real-world stakes, and no
          financial elements of any kind. The only thing you compete for is recognition on our
          leaderboards and the satisfaction of knowing your cricket or basketball knowledge is
          sharper than the rest.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Skill over chance — every decision is based on knowledge and analysis</li>
          <li>Transparency — we are clear about what the platform is and what it is not</li>
          <li>Community — we are building a space for fans to connect and compete</li>
          <li>Accessibility — free to play, always</li>
        </ul>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mt-8">
          <p className="text-sm text-indigo-700">
            <strong>Registered Office:</strong> G 93-94, D block, Baani Square, Sector 50,
            Gurugram, Haryana 122018, India
          </p>
          <p className="text-sm text-indigo-700 mt-1">
            <strong>Email:</strong> support@kickvora.com
          </p>
        </div>
      </div>
    </div>
  );
}

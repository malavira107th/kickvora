import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Kickvora",
  description:
    "Learn about Kickvora — a free-to-use, skill-based cricket and basketball strategy platform built for sports fans who love the game.",
};

const values = [
  {
    icon: "/icons/icon-skill.svg",
    title: "Skill Over Luck",
    description:
      "Every decision on Kickvora is driven by sports knowledge. There are no random outcomes — your team performs based on how well you read the game.",
  },
  {
    icon: "/icons/icon-learn.svg",
    title: "Education First",
    description:
      "We built Kickvora to help fans understand cricket and basketball more deeply — player roles, match conditions, and performance patterns.",
  },
  {
    icon: "/icons/icon-community.svg",
    title: "Community Driven",
    description:
      "Kickvora is for fans, built by fans. We listen to our community and continuously improve the platform based on real feedback.",
  },
  {
    icon: "/icons/icon-free.svg",
    title: "Always Free",
    description:
      "Kickvora is and will always be free to use. No entry fees, no subscriptions, no hidden charges. Just pure sports strategy.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/brand/logo-icon.webp"
              alt="Kickvora"
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
            />
            <span className="text-white font-bold text-3xl tracking-tight">Kickvora</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Built for fans who know the game
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Kickvora is a free-to-use, skill-based strategy platform where cricket and basketball
            fans build teams, apply their sports knowledge, and compete on performance-based
            leaderboards — all without any financial stakes.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5 leading-snug">
              Making sports knowledge matter
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We started Kickvora with a simple belief: the fans who study the game, follow player
              form, and understand match conditions deserve a platform where that knowledge is
              actually rewarded.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kickvora gives you a structured way to apply what you know. You pick players based on
              real match data, build a team within defined rules, and then watch how your selections
              perform when the match plays out. The leaderboard reflects your strategy — not chance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              It is a game of knowledge, patience, and sports intelligence. Nothing more, nothing
              less.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <div className="space-y-5">
              {[
                { label: "Sports covered", value: "Cricket & Basketball" },
                { label: "Platform type", value: "Skill-based strategy game" },
                { label: "Entry requirement", value: "Free — no fees ever" },
                { label: "Scoring basis", value: "Real player performance data" },
                { label: "Minimum age", value: "18 years and above" },
                { label: "Support", value: "support@kickvora.com" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center border-b border-indigo-100 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900 text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              What We Stand For
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Our core values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Image src={v.icon} alt={v.title} width={22} height={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Kickvora is and is not */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
            Platform Principles
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            What Kickvora is — and is not
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Kickvora is
            </h3>
            <ul className="space-y-3 text-sm text-green-700">
              {[
                "A free-to-use sports strategy game",
                "A skill and knowledge-based platform",
                "An educational tool for sports fans",
                "A community leaderboard for sports enthusiasts",
                "A safe, compliant entertainment platform",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Kickvora is not
            </h3>
            <ul className="space-y-3 text-sm text-red-700">
              {[
                "A real-money platform of any kind",
                "A sports prediction or wagering service",
                "A platform with entry fees or paid tiers",
                "A platform that offers real-world rewards",
                "A substitute for professional sports advice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Registered address */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 flex flex-col sm:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Registered Office</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              G 93-94, D Block, Baani Square,<br />
              Sector 50, Gurugram,<br />
              Haryana 122018, India
            </p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <a
              href="mailto:support@kickvora.com"
              className="text-sm text-indigo-600 font-medium"
            >
              support@kickvora.com
            </a>
            <p className="text-xs text-gray-400 mt-1">We respond within 1–2 business days.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-14 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Join the Kickvora community</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Create your free account, pick your players, and start competing on the leaderboard today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl text-sm"
          >
            Create Free Account
          </Link>
          <Link
            href="/contact"
            className="border border-white/40 text-white font-medium px-8 py-3 rounded-xl text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

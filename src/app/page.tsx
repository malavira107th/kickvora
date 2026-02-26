import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kickvora — Cricket & Basketball Strategy Platform",
  description:
    "Test your sports knowledge and strategic skills with Kickvora. Build your dream team, compete in free-to-play challenges, and rise to the top of the leaderboards.",
};

const features = [
  {
    icon: "🏏",
    title: "Cricket & Basketball",
    description:
      "Choose from upcoming cricket and basketball matches. Select 11 players for cricket or 5 for basketball and put your knowledge to the test.",
  },
  {
    icon: "📊",
    title: "Real Performance Points",
    description:
      "Your team earns points based on how your selected players actually perform in the real match — runs, wickets, assists, and more.",
  },
  {
    icon: "🏆",
    title: "Skill-Based Leaderboards",
    description:
      "Compete with fans across the country on our live leaderboards. The better your strategy, the higher you rank.",
  },
  {
    icon: "🎓",
    title: "Learn the Game Deeper",
    description:
      "Kickvora helps you understand player form, match conditions, and team dynamics in a hands-on, engaging way.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up for free in under a minute. No credit card or payment required.",
  },
  {
    number: "02",
    title: "Pick a match",
    description: "Browse upcoming cricket and basketball matches and choose one to enter.",
  },
  {
    number: "03",
    title: "Build your team",
    description:
      "Select your players using your knowledge of form, conditions, and matchups. Pick a captain for bonus points.",
  },
  {
    number: "04",
    title: "Track & compete",
    description:
      "Watch the match unfold and see your team's score update in real time. Climb the leaderboard.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>🏏</span>
            <span>Cricket &amp; Basketball</span>
            <span>·</span>
            <span>100% Free to Play</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Where Strategy Meets the Spirit of Sport
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Build your dream team from real players, track their performance in live matches, and
            compete with fans on skill-based leaderboards. No luck involved — just knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors text-base"
            >
              Create Your Team — Free
            </Link>
            <Link
              href="/how-it-works"
              className="border border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for real sports fans
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kickvora rewards deep sports knowledge, not guesswork. Every decision you make is
              grounded in real player data.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Kickvora works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Four simple steps to get started and start competing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to test your skills?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of sports fans who use Kickvora to engage with cricket and basketball
            in a smarter, more strategic way.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-block"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

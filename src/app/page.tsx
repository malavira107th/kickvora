import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kickvora — Cricket & Basketball Strategy Platform",
  description:
    "Build your dream team from real players, track live performance, and compete on skill-based leaderboards. Free to play. No luck — just knowledge.",
  openGraph: {
    title: "Kickvora — Cricket & Basketball Strategy Platform",
    description:
      "Build your dream team from real players, track live performance, and compete on skill-based leaderboards.",
    images: ["/brand/og-image.webp"],
  },
};

const features = [
  {
    icon: "/icons/icon-skill.svg",
    title: "Pure Skill. No Luck.",
    description:
      "Every point your team earns is based on real player performance. The better your cricket and basketball knowledge, the higher you rank.",
  },
  {
    icon: "/icons/icon-stats.svg",
    title: "Live Performance Tracking",
    description:
      "Your selected players earn points from actual match stats — runs, wickets, assists, rebounds. Watch your score update in real time.",
  },
  {
    icon: "/icons/icon-leaderboard.svg",
    title: "Competitive Leaderboards",
    description:
      "Compete with fans on match-by-match leaderboards. Your rank reflects your strategic thinking, not chance.",
  },
  {
    icon: "/icons/icon-learn.svg",
    title: "Learn While You Play",
    description:
      "Kickvora deepens your understanding of player form, match conditions, and team dynamics through hands-on engagement.",
  },
];

const steps = [
  {
    number: "01",
    icon: "/icons/icon-register.svg",
    title: "Create a free account",
    description:
      "Sign up in under a minute. No payment, no subscription — just your email and a password.",
  },
  {
    number: "02",
    icon: "/icons/icon-match.svg",
    title: "Choose a match",
    description:
      "Browse upcoming cricket and basketball matches. Pick one you know well and enter before it starts.",
  },
  {
    number: "03",
    icon: "/icons/icon-team.svg",
    title: "Build your team",
    description:
      "Select 11 players for cricket or 5 for basketball. Use your knowledge of form, conditions, and matchups.",
  },
  {
    number: "04",
    icon: "/icons/icon-trophy.svg",
    title: "Track and compete",
    description:
      "Watch the match and see your team's score update live. Climb the leaderboard based on how well your picks perform.",
  },
];

const sports = [
  {
    name: "Cricket",
    icon: "/icons/icon-cricket.svg",
    image: "/images/cricket-section.webp",
    description:
      "Select your 11-player cricket squad from real match rosters. Earn points from runs, wickets, catches, and all-round performances.",
    detail: "Supports T20, ODI, and Test formats",
    color: "from-red-600/80 to-red-900/90",
  },
  {
    name: "Basketball",
    icon: "/icons/icon-basketball.svg",
    image: "/images/basketball-section.webp",
    description:
      "Pick your 5-player basketball lineup from real game rosters. Points are earned from points scored, assists, rebounds, and blocks.",
    detail: "Domestic and international leagues",
    color: "from-orange-600/80 to-orange-900/90",
  },
];

const trustPoints = [
  {
    icon: "/icons/icon-free.svg",
    title: "Completely Free",
    description: "Kickvora is free to use. There are no charges, subscriptions, or hidden costs of any kind.",
  },
  {
    icon: "/icons/icon-skill.svg",
    title: "Skill-Based Only",
    description:
      "This is a knowledge and strategy platform. Outcomes are determined entirely by real sports performance.",
  },
  {
    icon: "/icons/icon-community.svg",
    title: "Community Driven",
    description:
      "Built for sports fans who want to engage more deeply with the games they already follow and love.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden">
        {/* Full-bleed hero background image */}
        <Image
          src="/images/hero-bg.webp"
          alt="Cricket and basketball — Kickvora"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark indigo overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/75 to-purple-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 py-20 lg:py-28">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
                <Image src="/icons/icon-cricket.svg" alt="Cricket" width={18} height={18} className="opacity-90" />
                <span>Cricket</span>
                <span className="text-white/40">·</span>
                <Image src="/icons/icon-basketball.svg" alt="Basketball" width={18} height={18} className="opacity-90" />
                <span>Basketball</span>
                <span className="text-white/40">·</span>
                <span className="text-green-300 font-semibold">100% Free</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                Where Strategy Meets the
                <span className="block text-indigo-200"> Spirit of Sport</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/75 leading-relaxed mb-10">
                Build your team from real players, track their live performance, and compete on
                skill-based leaderboards. No luck involved — just your knowledge of the game.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
                >
                  Start Playing — Free
                </Link>
                <Link
                  href="/how-it-works"
                  className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right — static UI card stack */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-sm space-y-3">

                {/* Match card */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Upcoming Match</span>
                    <span className="text-xs bg-indigo-600/60 text-indigo-100 px-2 py-0.5 rounded-full font-medium">T20</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Image src="/icons/icon-cricket.svg" alt="Cricket" width={16} height={16} className="brightness-0 invert opacity-80" />
                        <span className="text-white font-bold text-base">IND</span>
                      </div>
                      <span className="text-white/50 text-xs">India</span>
                    </div>
                    <span className="text-white/40 font-semibold text-sm">vs</span>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Image src="/icons/icon-cricket.svg" alt="Cricket" width={16} height={16} className="brightness-0 invert opacity-80" />
                        <span className="text-white font-bold text-base">AUS</span>
                      </div>
                      <span className="text-white/50 text-xs">Australia</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs">Team size</p>
                      <p className="text-white font-bold text-base">11 Players</p>
                    </div>
                  </div>
                </div>

                {/* Player selection cards */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">Select Your Players</p>
                  <div className="space-y-2">
                    {[
                      { name: "Batsman", stat: "Avg 52.4", role: "BAT", selected: true },
                      { name: "All-Rounder", stat: "Avg 38.1 · 2.8 wkts", role: "AR", selected: true },
                      { name: "Bowler", stat: "Econ 6.2 · 3.1 wkts", role: "BOWL", selected: false },
                    ].map((p) => (
                      <div key={p.name} className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                        p.selected ? "bg-indigo-600/30 border border-indigo-400/40" : "bg-white/5 border border-white/10"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            p.selected ? "bg-indigo-500 text-white" : "bg-white/10 text-white/60"
                          }`}>{p.role}</span>
                          <span className="text-white text-sm font-medium">{p.name}</span>
                        </div>
                        <span className="text-white/50 text-xs">{p.stat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard strip */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Leaderboard</p>
                    <Image src="/icons/icon-leaderboard.svg" alt="Leaderboard" width={16} height={16} className="brightness-0 invert opacity-60" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { rank: 1, label: "Your Team", pts: "284 pts", highlight: true },
                      { rank: 2, label: "Team Falcon", pts: "271 pts", highlight: false },
                      { rank: 3, label: "Team Blaze", pts: "259 pts", highlight: false },
                    ].map((row) => (
                      <div key={row.rank} className={`flex items-center gap-3 rounded-lg px-3 py-1.5 ${
                        row.highlight ? "bg-indigo-500/25 border border-indigo-400/30" : ""
                      }`}>
                        <span className={`text-xs font-bold w-5 text-center ${
                          row.rank === 1 ? "text-yellow-400" : "text-white/40"
                        }`}>#{row.rank}</span>
                        <span className={`flex-1 text-sm ${
                          row.highlight ? "text-white font-semibold" : "text-white/70"
                        }`}>{row.label}</span>
                        <span className={`text-xs font-semibold ${
                          row.highlight ? "text-indigo-300" : "text-white/50"
                        }`}>{row.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPORTS COVERED ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Two sports. One platform.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Kickvora supports cricket and basketball — two of the most strategy-rich sports in the
              world. Pick the sport you know best, or master both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sports.map((sport) => (
              <div
                key={sport.name}
                className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={sport.image}
                  alt={`${sport.name} on Kickvora`}
                  width={700}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${sport.color}`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Image src={sport.icon} alt={sport.name} width={28} height={28} className="brightness-0 invert" />
                    <h3 className="text-2xl font-bold">{sport.name}</h3>
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed mb-2">{sport.description}</p>
                  <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {sport.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Kickvora works
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Four straightforward steps from sign-up to competing on the leaderboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* connector line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200" />

            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center relative">
                {/* step circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 bg-indigo-50 border-2 border-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <Image src={step.icon} alt={step.title} width={40} height={40} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for real sports fans
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kickvora rewards deep sports knowledge. Every decision you make is grounded in real
              player data and match context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <Image src={f.icon} alt={f.title} width={28} height={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY KICKVORA / TRUST ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              A platform you can trust
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Kickvora is designed to be straightforward, transparent, and accessible to every
              sports fan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((tp) => (
              <div key={tp.title} className="flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                  <Image src={tp.icon} alt={tp.title} width={36} height={36} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{tp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to test your sports knowledge?
          </h2>
          <p className="text-white/75 mb-10 text-lg leading-relaxed">
            Join Kickvora for free. Build your team, follow the match, and see where your strategy
            takes you on the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-base shadow-lg"
            >
              Create Your Free Account
            </Link>
            <Link
              href="/matches"
              className="border border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Browse Matches
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

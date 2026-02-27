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
    title: "Performance Tracking",
    description:
      "Your selected players earn points from actual match stats — runs, wickets, assists, rebounds. Your score reflects what happened on the field.",
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
    icon: "/icons/icon-register.svg",
    title: "Create a free account",
    description:
      "Sign up in under a minute. No payment, no subscription — just your email and a password.",
  },
  {
    icon: "/icons/icon-match.svg",
    title: "Choose a match",
    description:
      "Browse upcoming cricket and basketball matches. Pick one you know well and enter before it starts.",
  },
  {
    icon: "/icons/icon-team.svg",
    title: "Build your team",
    description:
      "Select players from real match rosters using your knowledge of form, conditions, and matchups.",
  },
  {
    icon: "/icons/icon-trophy.svg",
    title: "Track and compete",
    description:
      "Follow the match and see your team score update. Climb the leaderboard based on how well your picks perform.",
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
    color: "from-indigo-900/70 to-purple-900/80",
  },
  {
    name: "Basketball",
    icon: "/icons/icon-basketball.svg",
    image: "/images/basketball-section.webp",
    description:
      "Pick your 5-player basketball lineup from real game rosters. Points are earned from points scored, assists, rebounds, and blocks.",
    detail: "Domestic and international leagues",
    color: "from-indigo-900/70 to-purple-900/80",
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
      <section className="relative text-white overflow-hidden min-h-[600px] flex items-center">
        {/* Full-bleed hero background */}
        <Image
          src="/images/hero-bg.webp"
          alt="Cricket and basketball — Kickvora"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-900/80 to-purple-950/70" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left — headline and CTAs */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
                <Image src="/icons/icon-cricket.svg" alt="Cricket" width={16} height={16} className="opacity-80" />
                <span>Cricket</span>
                <span className="text-white/30 mx-1">·</span>
                <Image src="/icons/icon-basketball.svg" alt="Basketball" width={16} height={16} className="opacity-80" />
                <span>Basketball</span>
                <span className="text-white/30 mx-1">·</span>
                <span className="text-green-300 font-semibold">100% Free</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                Where Strategy Meets
                <span className="block text-indigo-300">the Spirit of Sport</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
                Build your team from real players, track their performance through actual match
                stats, and compete on knowledge-based leaderboards. No luck — just your
                understanding of the game.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl text-base shadow-lg"
                >
                  Start Playing — Free
                </Link>
                <Link
                  href="/how-it-works"
                  className="border border-white/25 text-white font-semibold px-8 py-3.5 rounded-xl text-base"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right — logo mark + sport icons */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="flex flex-col items-center gap-8">
                <Image
                  src="/brand/logo-light.webp"
                  alt="Kickvora"
                  width={280}
                  height={120}
                  className="w-64 lg:w-72 object-contain brightness-0 invert"
                  priority
                />
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Image src="/icons/icon-cricket.svg" alt="Cricket" width={36} height={36} className="brightness-0 invert opacity-90" />
                    </div>
                    <span className="text-white/60 text-xs font-medium">Cricket</span>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Image src="/icons/icon-basketball.svg" alt="Basketball" width={36} height={36} className="brightness-0 invert opacity-90" />
                    </div>
                    <span className="text-white/60 text-xs font-medium">Basketball</span>
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
              Kickvora supports cricket and basketball — two of the most strategy-rich sports in
              the world. Pick the sport you know best, or master both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sports.map((sport) => (
              <div key={sport.name} className="relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={sport.image}
                  alt={`${sport.name} on Kickvora`}
                  width={700}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${sport.color}`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={sport.icon}
                      alt={sport.name}
                      width={26}
                      height={26}
                      className="brightness-0 invert"
                    />
                    <h3 className="text-2xl font-bold">{sport.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-2">{sport.description}</p>
                  <span className="inline-block bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center">
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
      <section className="py-20 px-4 bg-gray-50">
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
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
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

      {/* ── WHY KICKVORA ── */}
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
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5">
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
      <section className="relative py-24 px-4 text-white overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-bg.webp"
          alt="Kickvora"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-indigo-950/85" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Image
            src="/brand/logo-light.webp"
            alt="Kickvora"
            width={160}
            height={60}
            className="h-12 w-auto object-contain brightness-0 invert mx-auto mb-8 opacity-80"
          />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to test your sports knowledge?
          </h2>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            Join Kickvora for free. Build your team, follow the match, and see where your strategy
            takes you on the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl text-base shadow-lg"
            >
              Create Your Free Account
            </Link>
            <Link
              href="/matches"
              className="border border-white/25 text-white font-semibold px-10 py-4 rounded-xl text-base"
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How It Works | Kickvora",
  description:
    "Learn how to build your team, earn points, and climb the leaderboard on Kickvora — a free, skill-based cricket and basketball strategy platform.",
};

const steps = [
  {
    number: "01",
    icon: "/icons/icon-register.svg",
    title: "Create your free account",
    description:
      "Register on Kickvora with your email address. No fees, no subscriptions — your account is completely free and takes under a minute to set up.",
  },
  {
    number: "02",
    icon: "/icons/icon-match.svg",
    title: "Browse upcoming matches",
    description:
      "Explore the matches calendar. Each match shows the two competing teams, the sport (cricket or basketball), and the scheduled date and time.",
  },
  {
    number: "03",
    icon: "/icons/icon-team.svg",
    title: "Build your strategy team",
    description:
      "Select players from the match squad within the allowed team size. Use your knowledge of player form, conditions, and match history to make smart picks.",
  },
  {
    number: "04",
    icon: "/icons/icon-trophy.svg",
    title: "Track performance and rank up",
    description:
      "Once the match begins, your selected players earn points based on their real statistical performance. Your total score is reflected on the leaderboard.",
  },
];

const cricketScoring = [
  { action: "Run scored", points: "+1" },
  { action: "Boundary (4)", points: "+1 bonus" },
  { action: "Six (6)", points: "+2 bonus" },
  { action: "Half-century (50+ runs)", points: "+8 bonus" },
  { action: "Century (100+ runs)", points: "+16 bonus" },
  { action: "Duck (0 runs, dismissed)", points: "-2" },
  { action: "Wicket (bowler)", points: "+25" },
  { action: "Maiden over", points: "+12" },
  { action: "Catch", points: "+8" },
  { action: "Run out (direct)", points: "+12" },
  { action: "Stumping", points: "+12" },
  { action: "3 wickets in an innings", points: "+4 bonus" },
  { action: "5 wickets in an innings", points: "+8 bonus" },
];

const basketballScoring = [
  { action: "Point scored (2-pointer)", points: "+2" },
  { action: "3-pointer made", points: "+3" },
  { action: "Free throw made", points: "+1" },
  { action: "Assist", points: "+3" },
  { action: "Offensive rebound", points: "+2" },
  { action: "Defensive rebound", points: "+1.5" },
  { action: "Block", points: "+3" },
  { action: "Steal", points: "+3" },
  { action: "Turnover", points: "-1" },
  { action: "Double-double", points: "+5 bonus" },
  { action: "Triple-double", points: "+10 bonus" },
];

const rules = [
  { title: "Team size", cricket: "11 players per team", basketball: "5 players per team" },
  { title: "Team lock", cricket: "Teams lock at match start", basketball: "Teams lock at tip-off" },
  { title: "Substitutions", cricket: "No changes after lock", basketball: "No changes after lock" },
  {
    title: "Points basis",
    cricket: "Batting, bowling & fielding stats",
    basketball: "Scoring, assists, rebounds & defense",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-indigo-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Platform Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            How Kickvora works
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Four simple steps to go from a new account to competing on the leaderboard. No
            experience required — just your sports knowledge.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row gap-6 items-start p-7 rounded-2xl border ${
                i % 2 === 0 ? "bg-white border-gray-100" : "bg-indigo-50 border-indigo-100"
              }`}
            >
              <div className="shrink-0">
                <span className="text-5xl font-black text-indigo-200 leading-none">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <Image src={step.icon} alt={step.title} width={20} height={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team rules table */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Team Rules
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              Cricket vs Basketball — key differences
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="text-left px-6 py-4 font-semibold">Rule</th>
                  <th className="text-left px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/icon-cricket.svg"
                        alt="Cricket"
                        width={16}
                        height={16}
                        className="brightness-0 invert"
                      />
                      Cricket
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/icon-basketball.svg"
                        alt="Basketball"
                        width={16}
                        height={16}
                        className="brightness-0 invert"
                      />
                      Basketball
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, i) => (
                  <tr key={rule.title} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-medium text-gray-700">{rule.title}</td>
                    <td className="px-6 py-4 text-gray-600">{rule.cricket}</td>
                    <td className="px-6 py-4 text-gray-600">{rule.basketball}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Scoring system */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
            Points System
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">How points are calculated</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Points are awarded based on real statistical performance data from each match. Here is
            the full breakdown for both sports.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cricket */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Image src="/icons/icon-cricket.svg" alt="Cricket" width={18} height={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Cricket Scoring</h3>
            </div>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 border-b border-indigo-100">
                    <th className="text-left px-4 py-3 text-gray-700 font-semibold">Action</th>
                    <th className="text-right px-4 py-3 text-gray-700 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {cricketScoring.map((row, i) => (
                    <tr key={row.action} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-600">{row.action}</td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          row.points.startsWith("-") ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {row.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Basketball */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                <Image src="/icons/icon-basketball.svg" alt="Basketball" width={18} height={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Basketball Scoring</h3>
            </div>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b border-orange-100">
                    <th className="text-left px-4 py-3 text-gray-700 font-semibold">Action</th>
                    <th className="text-right px-4 py-3 text-gray-700 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {basketballScoring.map((row, i) => (
                    <tr key={row.action} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-600">{row.action}</td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          row.points.startsWith("-") ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {row.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Common questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is Kickvora completely free to use?",
                a: "Yes. Kickvora is 100% free. There are no entry fees, no paid tiers, and no financial transactions of any kind on the platform.",
              },
              {
                q: "Can I change my team after the match starts?",
                a: "No. Your team locks at the scheduled start time of the match. All selections must be finalised before the match begins.",
              },
              {
                q: "How are points updated?",
                a: "Points are updated by the Kickvora admin team based on official match statistics after the match concludes. The leaderboard reflects final scores once all data is verified.",
              },
              {
                q: "What happens if a player I selected does not play?",
                a: "If a player does not participate in the match, they earn zero points. This is part of the strategy — selecting a strong playing XI is as important as picking top performers.",
              },
              {
                q: "Is there a minimum age to use Kickvora?",
                a: "Yes. You must be at least 18 years of age to register and use the platform.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-14 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to build your first team?</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
          Sign up for free, browse the upcoming matches, and put your sports knowledge to the test.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl text-sm"
          >
            Get Started Free
          </Link>
          <Link
            href="/matches"
            className="border border-white/40 text-white font-medium px-8 py-3 rounded-xl text-sm"
          >
            Browse Matches
          </Link>
        </div>
      </section>
    </div>
  );
}

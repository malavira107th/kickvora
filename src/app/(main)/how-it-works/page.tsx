import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";

export const metadata: Metadata = { title: "How It Works" };

const scoringCricket = [
  { action: "Run scored", points: "+1" },
  { action: "Boundary (4)", points: "+1 bonus" },
  { action: "Six (6)", points: "+2 bonus" },
  { action: "Wicket (bowler)", points: "+25" },
  { action: "Maiden over", points: "+12" },
  { action: "Catch", points: "+8" },
  { action: "Run out", points: "+12" },
  { action: "Stumping", points: "+12" },
];

const scoringBasketball = [
  { action: "Point scored", points: "+1" },
  { action: "3-pointer", points: "+3" },
  { action: "Assist", points: "+3" },
  { action: "Rebound", points: "+1.5" },
  { action: "Block", points: "+3" },
  { action: "Steal", points: "+3" },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">How Kickvora Works</h1>
      <p className="text-gray-500 mb-12">
        A complete guide to getting started and competing on Kickvora.
      </p>

      {/* Steps */}
      <div className="space-y-8 mb-16">
        {[
          {
            step: "1",
            title: "Create a free account",
            body: "Sign up with your email and a username. No payment or credit card required. Your account is free, and it stays free.",
          },
          {
            step: "2",
            title: "Browse upcoming matches",
            body: "Head to the Matches page to see all upcoming cricket and basketball matches. Each match shows the two competing teams, the scheduled date, and the number of players available for selection.",
          },
          {
            step: "3",
            title: "Build your team",
            body: "Click on a match and select your players. For cricket, you must pick exactly 11 players. For basketball, you pick 5. Choose a captain (who earns 2× points) and a vice-captain (who earns 1.5× points). Your selections are locked once you save your team.",
          },
          {
            step: "4",
            title: "Watch the match and track points",
            body: "Once the match starts, our admin team updates player performance points based on real match statistics. Your team's total score is calculated automatically from your selected players' individual points.",
          },
          {
            step: "5",
            title: "Climb the leaderboard",
            body: "After the match is completed, your total points are added to your overall leaderboard score. Compete against other users and see where your strategy ranks you.",
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-5">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
              {item.step}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">{item.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring System */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Scoring System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🏏</span> Cricket
          </h3>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {scoringCricket.map((row) => (
              <div key={row.action} className="flex justify-between px-4 py-2.5 border-b border-gray-50 last:border-b-0 text-sm">
                <span className="text-gray-600">{row.action}</span>
                <span className="font-semibold text-indigo-600">{row.points}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🏀</span> Basketball
          </h3>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {scoringBasketball.map((row) => (
              <div key={row.action} className="flex justify-between px-4 py-2.5 border-b border-gray-50 last:border-b-0 text-sm">
                <span className="text-gray-600">{row.action}</span>
                <span className="font-semibold text-indigo-600">{row.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-center">
        <p className="text-indigo-700 font-medium mb-3">Ready to start?</p>
        <Link
          href="/register"
          className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors inline-block text-sm"
        >
          Create Your Free Account
        </Link>
      </div>
    </div>
  );
}

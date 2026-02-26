import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Matches" };

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string; status?: string }>;
}) {
  const params = await searchParams;
  const sport = params.sport?.toUpperCase();
  const status = params.status?.toUpperCase();

  const where: Record<string, unknown> = {};
  if (sport === "CRICKET" || sport === "BASKETBALL") where.sport = sport;
  if (status === "UPCOMING" || status === "LIVE" || status === "COMPLETED") where.status = status;

  const matches = await prisma.match.findMany({
    where,
    orderBy: { scheduledAt: "asc" },
    include: { _count: { select: { players: true } } },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Browse upcoming and live matches. Select one to build your team.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/matches"
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !sport && !status
              ? "bg-indigo-600 text-white border-indigo-600"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          All
        </Link>
        {[
          { label: "🏏 Cricket", q: "?sport=cricket" },
          { label: "🏀 Basketball", q: "?sport=basketball" },
          { label: "Upcoming", q: "?status=upcoming" },
          { label: "Live", q: "?status=live" },
          { label: "Completed", q: "?status=completed" },
        ].map((f) => (
          <Link
            key={f.q}
            href={`/matches${f.q}`}
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            {f.label}
          </Link>
        ))}
      </div>

      {matches.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-200">
          <p className="text-gray-500">No matches found for the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  match.sport === "CRICKET"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-700"
                }`}>
                  {match.sport === "CRICKET" ? "🏏 Cricket" : "🏀 Basketball"}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  match.status === "LIVE"
                    ? "bg-red-50 text-red-600"
                    : match.status === "COMPLETED"
                    ? "bg-gray-100 text-gray-500"
                    : "bg-indigo-50 text-indigo-600"
                }`}>
                  {match.status === "LIVE" ? "🔴 Live" : match.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{match.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {match.teamA} <span className="text-gray-300 mx-1">vs</span> {match.teamB}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>
                  {new Date(match.scheduledAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>{match._count.players} players</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

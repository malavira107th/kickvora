import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Matches | Kickvora",
  description:
    "Browse upcoming and live cricket and basketball matches on Kickvora. Pick a match, build your team, and compete on the leaderboard.",
};

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

  const activeFilter = sport || status || "all";

  const filters = [
    { label: "All Matches", value: "all", href: "/matches" },
    { label: "Cricket", value: "CRICKET", href: "/matches?sport=cricket" },
    { label: "Basketball", value: "BASKETBALL", href: "/matches?sport=basketball" },
    { label: "Upcoming", value: "UPCOMING", href: "/matches?status=upcoming" },
    { label: "Live", value: "LIVE", href: "/matches?status=live" },
    { label: "Completed", value: "COMPLETED", href: "/matches?status=completed" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/icons/icon-match.svg" alt="" width={24} height={24} />
            <h1 className="text-3xl font-bold">Matches</h1>
          </div>
          <p className="text-indigo-200 text-sm max-w-xl">
            Browse upcoming and live matches. Select a match to view the player list and build your
            strategy team before the match starts.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-7">
          {filters.map((f) => {
            const isActive =
              f.value === "all" ? activeFilter === "all" : activeFilter === f.value;
            return (
              <Link
                key={f.value}
                href={f.href}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {f.value === "CRICKET" && (
                  <span className="mr-1.5">
                    <Image
                      src="/icons/icon-cricket.svg"
                      alt=""
                      width={13}
                      height={13}
                      className="inline -mt-0.5"
                    />
                  </span>
                )}
                {f.value === "BASKETBALL" && (
                  <span className="mr-1.5">
                    <Image
                      src="/icons/icon-basketball.svg"
                      alt=""
                      width={13}
                      height={13}
                      className="inline -mt-0.5"
                    />
                  </span>
                )}
                {f.label}
              </Link>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-4">
          {matches.length === 0
            ? "No matches found"
            : `${matches.length} match${matches.length !== 1 ? "es" : ""} found`}
        </p>

        {matches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-14 text-center">
            <Image
              src="/icons/icon-match.svg"
              alt=""
              width={44}
              height={44}
              className="mx-auto mb-4 opacity-25"
            />
            <p className="text-gray-500 text-sm font-medium mb-1">No matches found</p>
            <p className="text-gray-400 text-xs">Try a different filter or check back later.</p>
            <Link
              href="/matches"
              className="inline-block mt-5 text-sm text-indigo-600 font-semibold"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/matches/${match.id}`}
                className="bg-white border border-gray-100 rounded-2xl p-5 block"
              >
                {/* Top row — sport + status */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                      match.sport === "CRICKET"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    <Image
                      src={
                        match.sport === "CRICKET"
                          ? "/icons/icon-cricket.svg"
                          : "/icons/icon-basketball.svg"
                      }
                      alt={match.sport}
                      width={13}
                      height={13}
                    />
                    {match.sport === "CRICKET" ? "Cricket" : "Basketball"}
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      match.status === "LIVE"
                        ? "bg-red-50 text-red-600"
                        : match.status === "COMPLETED"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    {match.status === "LIVE" ? "● Live" : match.status}
                  </span>
                </div>

                {/* Match title */}
                <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{match.title}</h3>

                {/* Teams */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-gray-700">{match.teamA}</span>
                  <span className="text-xs text-gray-300 font-bold">VS</span>
                  <span className="text-sm font-medium text-gray-700">{match.teamB}</span>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {new Date(match.scheduledAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    ·{" "}
                    {new Date(match.scheduledAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-xs text-gray-400">
                    {match._count.players} player{match._count.players !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

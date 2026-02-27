import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | Kickvora",
  description:
    "See who's leading on Kickvora. Rankings are based on total performance points earned across all teams.",
};

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const params = await searchParams;
  const sport = params.sport?.toUpperCase();

  const matchWhere: Record<string, unknown> = {};
  if (sport === "CRICKET" || sport === "BASKETBALL") matchWhere.sport = sport;

  const session = await getSession();

  const grouped = await prisma.userTeam.groupBy({
    by: ["userId"],
    where: { match: matchWhere },
    _sum: { totalPoints: true },
    orderBy: { _sum: { totalPoints: "desc" } },
    take: 50,
  });

  const userIds = grouped.map((g) => g.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  const leaderboard = grouped.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    username: userMap.get(entry.userId)?.username ?? "Unknown",
    totalPoints: Number(entry._sum.totalPoints ?? 0),
  }));

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const filters = [
    { label: "All Sports", href: "/leaderboard", value: "all" },
    { label: "Cricket", href: "/leaderboard?sport=cricket", value: "CRICKET" },
    { label: "Basketball", href: "/leaderboard?sport=basketball", value: "BASKETBALL" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/icons/icon-leaderboard.svg" alt="" width={24} height={24} />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-indigo-200 text-sm max-w-lg">
            Rankings are based on total performance points earned across all teams. Points are
            awarded based on real match statistics after each game concludes.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Sport filters */}
        <div className="flex gap-2 mb-8">
          {filters.map((f) => {
            const isActive =
              f.value === "all" ? !sport : sport === f.value;
            return (
              <Link
                key={f.href}
                href={f.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {f.value === "CRICKET" && (
                  <Image src="/icons/icon-cricket.svg" alt="" width={13} height={13} />
                )}
                {f.value === "BASKETBALL" && (
                  <Image src="/icons/icon-basketball.svg" alt="" width={13} height={13} />
                )}
                {f.label}
              </Link>
            );
          })}
        </div>

        {leaderboard.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-14 text-center">
            <Image
              src="/icons/icon-trophy.svg"
              alt=""
              width={44}
              height={44}
              className="mx-auto mb-4 opacity-25"
            />
            <p className="text-gray-500 text-sm font-medium mb-1">No rankings yet</p>
            <p className="text-gray-400 text-xs mb-5">
              Be the first to create a team and earn points.
            </p>
            <Link
              href="/matches"
              className="inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
            >
              Browse Matches
            </Link>
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            {top3.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { position: 1, entry: top3[0], color: "from-yellow-400 to-amber-500", badge: "1st" },
                  { position: 2, entry: top3[1], color: "from-gray-300 to-gray-400", badge: "2nd" },
                  { position: 3, entry: top3[2], color: "from-orange-300 to-amber-400", badge: "3rd" },
                ]
                  .filter((p) => p.entry)
                  .map((p) => {
                    const isCurrentUser = session?.userId === p.entry!.userId;
                    return (
                      <div
                        key={p.position}
                        className={`bg-white border rounded-2xl p-4 text-center ${
                          isCurrentUser ? "border-indigo-300 ring-2 ring-indigo-100" : "border-gray-100"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3`}
                        >
                          <span className="text-white font-bold text-sm">{p.badge}</span>
                        </div>
                        <p className="font-bold text-gray-900 text-sm truncate">
                          {p.entry!.username}
                          {isCurrentUser && (
                            <span className="block text-xs text-indigo-400 font-normal">(you)</span>
                          )}
                        </p>
                        <p className="text-indigo-600 font-bold text-base mt-1">
                          {p.entry!.totalPoints.toFixed(1)}
                        </p>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Rest of the table */}
            {rest.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rank</span>
                  <span className="col-span-7 text-xs font-semibold text-gray-400 uppercase tracking-wide">Player</span>
                  <span className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wide text-right">Points</span>
                </div>
                {rest.map((entry) => {
                  const isCurrentUser = session?.userId === entry.userId;
                  return (
                    <div
                      key={entry.userId}
                      className={`grid grid-cols-12 items-center px-5 py-3.5 border-b border-gray-50 last:border-b-0 ${
                        isCurrentUser ? "bg-indigo-50/40" : ""
                      }`}
                    >
                      <span className="col-span-2 text-sm font-bold text-gray-400">
                        #{entry.rank}
                      </span>
                      <span
                        className={`col-span-7 text-sm font-semibold ${
                          isCurrentUser ? "text-indigo-700" : "text-gray-900"
                        }`}
                      >
                        {entry.username}
                        {isCurrentUser && (
                          <span className="text-xs text-indigo-400 font-normal ml-1.5">(you)</span>
                        )}
                      </span>
                      <span className="col-span-3 text-sm font-bold text-indigo-600 text-right">
                        {entry.totalPoints.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA for non-logged-in users */}
            {!session && (
              <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-700 mb-3">
                  Create an account to start building teams and earn your place on the leaderboard.
                </p>
                <Link
                  href="/register"
                  className="inline-block bg-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl"
                >
                  Join Kickvora — It&apos;s Free
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

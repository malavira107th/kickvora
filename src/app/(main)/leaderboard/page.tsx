import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Leaderboard" };

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

  // Aggregate total points per user
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Rankings are based on total performance points earned across all teams.
        </p>
      </div>

      {/* Sport filter */}
      <div className="flex gap-2 mb-6">
        {[
          { label: "All Sports", href: "/leaderboard" },
          { label: "🏏 Cricket", href: "/leaderboard?sport=cricket" },
          { label: "🏀 Basketball", href: "/leaderboard?sport=basketball" },
        ].map((f) => (
          <a
            key={f.href}
            href={f.href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              (f.href === "/leaderboard" && !sport) ||
              (sport && f.href.includes(sport.toLowerCase()))
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {leaderboard.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-200">
          <p className="text-gray-500">No rankings yet. Be the first to create a team!</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = session?.userId === entry.userId;
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

            return (
              <div
                key={entry.userId}
                className={`flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-b-0 ${
                  isCurrentUser ? "bg-indigo-50/50" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 w-6 text-center">
                    {medal ?? `#${entry.rank}`}
                  </span>
                  <div>
                    <p className={`text-sm font-semibold ${isCurrentUser ? "text-indigo-700" : "text-gray-900"}`}>
                      {entry.username}
                      {isCurrentUser && <span className="text-xs text-indigo-400 ml-2">(you)</span>}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-indigo-600">
                  {entry.totalPoints.toFixed(1)} pts
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

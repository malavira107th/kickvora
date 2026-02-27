import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Kickvora",
  description: "View your teams, track your points, and browse upcoming matches on Kickvora.",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, email: true, createdAt: true },
  });

  if (!user) redirect("/login");

  const teams = await prisma.userTeam.findMany({
    where: { userId: session.userId },
    include: {
      match: {
        select: {
          id: true,
          title: true,
          sport: true,
          teamA: true,
          teamB: true,
          status: true,
          scheduledAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const upcomingMatches = await prisma.match.findMany({
    where: { status: "UPCOMING" },
    orderBy: { scheduledAt: "asc" },
    take: 5,
    select: {
      id: true,
      title: true,
      sport: true,
      teamA: true,
      teamB: true,
      scheduledAt: true,
      status: true,
    },
  });

  const totalPoints = teams.reduce((sum, t) => sum + Number(t.totalPoints), 0);
  const completedTeams = teams.filter((t) => t.match.status === "COMPLETED").length;
  const liveTeams = teams.filter((t) => t.match.status === "LIVE").length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm mb-1">Welcome back</p>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-indigo-300 text-sm mt-1">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/matches"
                className="bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl"
              >
                Browse Matches
              </Link>
              <Link
                href="/leaderboard"
                className="border border-white/30 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/icons/icon-team.svg" alt="" width={18} height={18} />
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Teams</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{teams.length}</p>
            <p className="text-xs text-gray-400 mt-1">Total created</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/icons/icon-stats.svg" alt="" width={18} height={18} />
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Points</p>
            </div>
            <p className="text-3xl font-bold text-indigo-600">{totalPoints.toFixed(1)}</p>
            <p className="text-xs text-gray-400 mt-1">Total earned</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/icons/icon-trophy.svg" alt="" width={18} height={18} />
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Completed</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{completedTeams}</p>
            <p className="text-xs text-gray-400 mt-1">Matches finished</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Live</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{liveTeams}</p>
            <p className="text-xs text-gray-400 mt-1">Currently active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Teams */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">My Teams</h2>
              <Link
                href="/matches"
                className="text-sm text-indigo-600 font-medium"
              >
                + New team
              </Link>
            </div>

            {teams.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
                <Image
                  src="/icons/icon-team.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="mx-auto mb-4 opacity-30"
                />
                <p className="text-gray-500 text-sm mb-4">
                  You haven&apos;t created any teams yet.
                  <br />
                  Browse a match and build your first team.
                </p>
                <Link
                  href="/matches"
                  className="inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
                >
                  Browse Matches
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm truncate">{team.teamName}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {team.match.teamA} vs {team.match.teamB}
                      </p>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <p className="text-sm font-bold text-indigo-600">
                        {Number(team.totalPoints).toFixed(1)} pts
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          team.match.status === "LIVE"
                            ? "bg-green-50 text-green-700"
                            : team.match.status === "COMPLETED"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        {team.match.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Matches */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Upcoming Matches</h2>
              <Link href="/matches" className="text-sm text-indigo-600 font-medium">
                View all
              </Link>
            </div>

            {upcomingMatches.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
                <Image
                  src="/icons/icon-match.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="mx-auto mb-4 opacity-30"
                />
                <p className="text-gray-500 text-sm">
                  No upcoming matches right now.
                  <br />
                  Check back soon.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <Link
                    key={match.id}
                    href={`/matches/${match.id}`}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {match.teamA} vs {match.teamB}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(match.scheduledAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3 ${
                        match.sport === "CRICKET"
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {match.sport === "CRICKET" ? "Cricket" : "Basketball"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/matches"
            className="bg-indigo-600 text-white rounded-2xl p-5 flex items-center gap-4"
          >
            <Image src="/icons/icon-match.svg" alt="" width={28} height={28} />
            <div>
              <p className="font-bold text-sm">Browse Matches</p>
              <p className="text-indigo-200 text-xs mt-0.5">Pick a match and build your team</p>
            </div>
          </Link>
          <Link
            href="/leaderboard"
            className="bg-white border border-gray-100 text-gray-900 rounded-2xl p-5 flex items-center gap-4"
          >
            <Image src="/icons/icon-leaderboard.svg" alt="" width={28} height={28} />
            <div>
              <p className="font-bold text-sm">Leaderboard</p>
              <p className="text-gray-400 text-xs mt-0.5">See how you rank globally</p>
            </div>
          </Link>
          <Link
            href="/profile"
            className="bg-white border border-gray-100 text-gray-900 rounded-2xl p-5 flex items-center gap-4"
          >
            <Image src="/icons/icon-skill.svg" alt="" width={28} height={28} />
            <div>
              <p className="font-bold text-sm">My Profile</p>
              <p className="text-gray-400 text-xs mt-0.5">View and edit your account</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

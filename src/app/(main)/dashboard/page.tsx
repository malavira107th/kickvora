import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Dashboard" };

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
        select: { id: true, title: true, sport: true, teamA: true, teamB: true, status: true, scheduledAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const upcomingMatches = await prisma.match.findMany({
    where: { status: "UPCOMING" },
    orderBy: { scheduledAt: "asc" },
    take: 5,
    select: { id: true, title: true, sport: true, teamA: true, teamB: true, scheduledAt: true, status: true },
  });

  const totalPoints = teams.reduce((sum, t) => sum + Number(t.totalPoints), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.username} 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Here&apos;s an overview of your activity on Kickvora.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Teams Created</p>
          <p className="text-3xl font-bold text-gray-900">{teams.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Points Earned</p>
          <p className="text-3xl font-bold text-indigo-600">{totalPoints.toFixed(1)}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Member Since</p>
          <p className="text-xl font-semibold text-gray-900">
            {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Teams */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">My Teams</h2>
            <Link href="/matches" className="text-sm text-indigo-600 hover:underline">
              + Create new team
            </Link>
          </div>
          {teams.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm mb-4">You haven&apos;t created any teams yet.</p>
              <Link
                href="/matches"
                className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{team.teamName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {team.match.teamA} vs {team.match.teamB} ·{" "}
                      <span className={
                        team.match.status === "LIVE"
                          ? "text-green-600 font-medium"
                          : team.match.status === "COMPLETED"
                          ? "text-gray-400"
                          : "text-indigo-500"
                      }>
                        {team.match.status}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-indigo-600">{Number(team.totalPoints).toFixed(1)} pts</p>
                    <p className="text-xs text-gray-400">{team.match.sport}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
            <Link href="/matches" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          {upcomingMatches.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">No upcoming matches right now. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <Link
                  key={match.id}
                  href={`/matches/${match.id}`}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-indigo-200 transition-colors block"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
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
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    match.sport === "CRICKET"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {match.sport === "CRICKET" ? "🏏 Cricket" : "🏀 Basketball"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

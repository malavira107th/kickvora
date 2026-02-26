import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/dashboard");

  const [matchCount, playerCount, userCount, teamCount] = await Promise.all([
    prisma.match.count(),
    prisma.player.count(),
    prisma.user.count(),
    prisma.userTeam.count(),
  ]);

  const recentMatches = await prisma.match.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { _count: { select: { players: true, userTeams: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-bold text-gray-900">Kickvora</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-600">Admin</span>
        </div>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
          Back to site
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage matches, players, and users.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Matches", value: matchCount, color: "text-indigo-600" },
            { label: "Total Players", value: playerCount, color: "text-green-600" },
            { label: "Registered Users", value: userCount, color: "text-purple-600" },
            { label: "Teams Created", value: teamCount, color: "text-orange-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/matches/new"
            className="bg-indigo-600 text-white rounded-xl p-5 hover:bg-indigo-700 transition-colors"
          >
            <p className="text-lg font-bold mb-1">+ New Match</p>
            <p className="text-indigo-200 text-sm">Create a cricket or basketball match</p>
          </Link>
          <Link
            href="/admin/players/new"
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 transition-colors"
          >
            <p className="text-lg font-bold text-gray-900 mb-1">+ Add Players</p>
            <p className="text-gray-500 text-sm">Add players to an existing match</p>
          </Link>
          <Link
            href="/admin/users"
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 transition-colors"
          >
            <p className="text-lg font-bold text-gray-900 mb-1">Manage Users</p>
            <p className="text-gray-500 text-sm">View and manage user accounts</p>
          </Link>
        </div>

        {/* Recent Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Matches</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {recentMatches.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No matches yet.{" "}
                <Link href="/admin/matches/new" className="text-indigo-600 hover:underline">
                  Create one
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Match</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Sport</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Players</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Teams</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match) => (
                    <tr key={match.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50">
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{match.title}</p>
                        <p className="text-xs text-gray-400">{match.teamA} vs {match.teamB}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{match.sport}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          match.status === "LIVE"
                            ? "bg-red-50 text-red-600"
                            : match.status === "COMPLETED"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-indigo-50 text-indigo-600"
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{match._count.players}</td>
                      <td className="px-5 py-3 text-gray-600">{match._count.userTeams}</td>
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/matches/${match.id}`}
                          className="text-indigo-600 hover:underline text-xs font-medium"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

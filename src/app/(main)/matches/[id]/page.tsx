import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = await prisma.match.findUnique({ where: { id: parseInt(id) } });
  if (!match) return { title: "Match Not Found" };
  return { title: `${match.teamA} vs ${match.teamB}` };
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params;
  const matchId = parseInt(id, 10);
  if (isNaN(matchId)) notFound();

  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      players: { orderBy: [{ team: "asc" }, { name: "asc" }] },
    },
  });

  if (!match) notFound();

  const session = await getSession();

  // Check if user already has a team for this match
  let hasTeam = false;
  if (session) {
    const existing = await prisma.userTeam.findFirst({
      where: { userId: session.userId, matchId },
    });
    hasTeam = !!existing;
  }

  const teamAPlayers = match.players.filter((p) => p.team === match.teamA);
  const teamBPlayers = match.players.filter((p) => p.team === match.teamB);
  const requiredCount = match.sport === "CRICKET" ? 11 : 5;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">
            {match.sport === "CRICKET" ? "🏏 Cricket" : "🏀 Basketball"}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            match.status === "LIVE" ? "bg-red-500" : "bg-white/20"
          }`}>
            {match.status === "LIVE" ? "🔴 Live" : match.status}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-1">{match.title}</h1>
        <p className="text-white/80 text-sm">
          {match.teamA} vs {match.teamB}
          {match.venue && <span> · {match.venue}</span>}
        </p>
        <p className="text-white/60 text-xs mt-2">
          {new Date(match.scheduledAt).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* CTA */}
      {match.status !== "COMPLETED" && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {hasTeam ? "You have already created a team for this match." : `Select ${requiredCount} players and build your team.`}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Captain gets 2× points · Vice-captain gets 1.5× points
            </p>
          </div>
          {!hasTeam && session && (
            <Link
              href={`/matches/${match.id}/create-team`}
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap ml-4"
            >
              Create Team
            </Link>
          )}
          {!session && (
            <Link
              href="/login"
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap ml-4"
            >
              Log in to Play
            </Link>
          )}
        </div>
      )}

      {/* Players */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: match.teamA, players: teamAPlayers },
          { name: match.teamB, players: teamBPlayers },
        ].map(({ name, players }) => (
          <div key={name}>
            <h2 className="font-semibold text-gray-900 mb-3">{name}</h2>
            {players.length === 0 ? (
              <p className="text-sm text-gray-400">No players added yet.</p>
            ) : (
              <div className="space-y-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{player.name}</p>
                      <p className="text-xs text-gray-400">{player.role}</p>
                    </div>
                    {player.pointsUpdated && (
                      <span className="text-sm font-bold text-indigo-600">
                        {Number(player.performancePoints).toFixed(1)} pts
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

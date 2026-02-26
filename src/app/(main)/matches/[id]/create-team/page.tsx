"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type Player = {
  id: number;
  name: string;
  team: string;
  role: string;
  sport: string;
};

type Match = {
  id: number;
  title: string;
  sport: string;
  teamA: string;
  teamB: string;
  status: string;
  players: Player[];
};

export default function CreateTeamPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = Number(params.id);

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/matches/${matchId}`)
      .then((r) => r.json())
      .then((data) => {
        setMatch(data.match);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [matchId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading match details...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Match not found.</p>
        <Link href="/matches" className="text-indigo-600 hover:underline mt-2 block">
          Back to matches
        </Link>
      </div>
    );
  }

  const requiredCount = match.sport === "CRICKET" ? 11 : 5;

  function togglePlayer(id: number) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // Deselect — also clear captain/vc if needed
        if (captainId === id) setCaptainId(null);
        if (viceCaptainId === id) setViceCaptainId(null);
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= requiredCount) return prev;
      return [...prev, id];
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!teamName.trim()) {
      setError("Please enter a team name.");
      return;
    }
    if (selected.length !== requiredCount) {
      setError(`Please select exactly ${requiredCount} players.`);
      return;
    }
    if (!captainId) {
      setError("Please select a captain.");
      return;
    }
    if (!viceCaptainId) {
      setError("Please select a vice-captain.");
      return;
    }
    if (captainId === viceCaptainId) {
      setError("Captain and vice-captain must be different players.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          teamName: teamName.trim(),
          playerIds: selected,
          captainId,
          viceCaptainId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create team.");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const teamAPlayers = match.players.filter((p) => p.team === match.teamA);
  const teamBPlayers = match.players.filter((p) => p.team === match.teamB);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href={`/matches/${matchId}`} className="text-sm text-indigo-600 hover:underline">
          ← Back to match
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Create Your Team</h1>
        <p className="text-gray-500 text-sm mt-1">
          {match.teamA} vs {match.teamB} · Select {requiredCount} players
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Team Name */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
            Team Name
          </label>
          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. Champions XI"
            maxLength={50}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Selection progress */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
          <p className="text-sm text-indigo-700 font-medium">
            {selected.length} / {requiredCount} players selected
          </p>
          <div className="flex gap-3 text-xs text-gray-500">
            <span>C: {captainId ? match.players.find((p) => p.id === captainId)?.name : "—"}</span>
            <span>VC: {viceCaptainId ? match.players.find((p) => p.id === viceCaptainId)?.name : "—"}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">
            {error}
          </div>
        )}

        {/* Player selection */}
        {[
          { name: match.teamA, players: teamAPlayers },
          { name: match.teamB, players: teamBPlayers },
        ].map(({ name, players }) => (
          <div key={name} className="mb-6">
            <h2 className="font-semibold text-gray-900 mb-3">{name}</h2>
            <div className="space-y-2">
              {players.map((player) => {
                const isSelected = selected.includes(player.id);
                const isCaptain = captainId === player.id;
                const isVC = viceCaptainId === player.id;

                return (
                  <div
                    key={player.id}
                    className={`bg-white border rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? "border-indigo-400 bg-indigo-50/50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                    onClick={() => togglePlayer(player.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-gray-300"
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.role}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setCaptainId(isCaptain ? null : player.id)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                            isCaptain
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-indigo-100"
                          }`}
                        >
                          C
                        </button>
                        <button
                          type="button"
                          onClick={() => setViceCaptainId(isVC ? null : player.id)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                            isVC
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-purple-100"
                          }`}
                        >
                          VC
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting || selected.length !== requiredCount}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Saving team..." : "Save Team"}
        </button>
      </form>
    </div>
  );
}

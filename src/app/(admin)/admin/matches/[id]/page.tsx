"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Player = {
  id: number;
  name: string;
  team: string;
  role: string;
  performancePoints: number;
  pointsUpdated: boolean;
};

type Match = {
  id: number;
  title: string;
  sport: string;
  teamA: string;
  teamB: string;
  status: string;
  scheduledAt: string;
  venue: string | null;
  players: Player[];
};

export default function AdminMatchPage() {
  const params = useParams();
  const matchId = Number(params.id);

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [pointsEditing, setPointsEditing] = useState<Record<number, string>>({});
  const [newPlayer, setNewPlayer] = useState({ name: "", team: "", role: "" });
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`/api/matches/${matchId}`)
      .then((r) => r.json())
      .then((data) => {
        setMatch(data.match);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [matchId]);

  async function updateStatus(status: string) {
    setStatusLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/matches/${matchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setMatch((prev) => prev ? { ...prev, status: data.match.status } : prev);
      setSuccess(`Status updated to ${status}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Failed to update status."); }
    finally { setStatusLoading(false); }
  }

  async function savePoints(playerId: number) {
    const pts = parseFloat(pointsEditing[playerId] ?? "0");
    if (isNaN(pts)) return;
    try {
      const res = await fetch(`/api/admin/players/${playerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ performancePoints: pts, pointsUpdated: true }),
      });
      if (!res.ok) return;
      setMatch((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          players: prev.players.map((p) =>
            p.id === playerId ? { ...p, performancePoints: pts, pointsUpdated: true } : p
          ),
        };
      });
      setPointsEditing((prev) => { const n = { ...prev }; delete n[playerId]; return n; });
      setSuccess("Points saved.");
      setTimeout(() => setSuccess(""), 2000);
    } catch { setError("Failed to save points."); }
  }

  async function addPlayer(e: React.FormEvent) {
    e.preventDefault();
    setAddingPlayer(true);
    setError("");
    try {
      const res = await fetch("/api/admin/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPlayer, matchId, sport: match?.sport }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setMatch((prev) => prev ? { ...prev, players: [...prev.players, data.player] } : prev);
      setNewPlayer({ name: "", team: "", role: "" });
      setSuccess("Player added.");
      setTimeout(() => setSuccess(""), 2000);
    } catch { setError("Failed to add player."); }
    finally { setAddingPlayer(false); }
  }

  async function deletePlayer(playerId: number) {
    if (!confirm("Remove this player?")) return;
    try {
      await fetch(`/api/admin/players/${playerId}`, { method: "DELETE" });
      setMatch((prev) => prev ? { ...prev, players: prev.players.filter((p) => p.id !== playerId) } : prev);
    } catch { setError("Failed to delete player."); }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading...</div>;
  if (!match) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Match not found. <Link href="/admin" className="text-indigo-600">Back to admin</Link></p></div>;

  const teamAPlayers = match.players.filter((p) => p.team === match.teamA);
  const teamBPlayers = match.players.filter((p) => p.team === match.teamB);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-sm text-indigo-600 hover:underline">Admin</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600 truncate">{match.title}</span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">{success}</div>}

        {/* Match Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{match.title}</h1>
              <p className="text-gray-500 text-sm mt-1">{match.teamA} vs {match.teamB} · {match.sport}</p>
              {match.venue && <p className="text-gray-400 text-xs mt-0.5">{match.venue}</p>}
            </div>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              match.status === "LIVE" ? "bg-red-50 text-red-600" :
              match.status === "COMPLETED" ? "bg-gray-100 text-gray-500" : "bg-indigo-50 text-indigo-600"
            }`}>
              {match.status}
            </span>
          </div>

          {/* Status controls */}
          <div className="flex gap-2 mt-5">
            {["UPCOMING", "LIVE", "COMPLETED"].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={statusLoading || match.status === s}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
                  match.status === s
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Add Player */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Add Player</h2>
          <form onSubmit={addPlayer} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              value={newPlayer.name}
              onChange={(e) => setNewPlayer((p) => ({ ...p, name: e.target.value }))}
              required
              placeholder="Player name"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={newPlayer.team}
              onChange={(e) => setNewPlayer((p) => ({ ...p, team: e.target.value }))}
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select team</option>
              <option value={match.teamA}>{match.teamA}</option>
              <option value={match.teamB}>{match.teamB}</option>
            </select>
            <input
              value={newPlayer.role}
              onChange={(e) => setNewPlayer((p) => ({ ...p, role: e.target.value }))}
              required
              placeholder="Role (e.g. Batsman)"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={addingPlayer}
              className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-60"
            >
              {addingPlayer ? "Adding..." : "Add Player"}
            </button>
          </form>
        </div>

        {/* Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: match.teamA, players: teamAPlayers },
            { name: match.teamB, players: teamBPlayers },
          ].map(({ name, players }) => (
            <div key={name}>
              <h2 className="font-semibold text-gray-900 mb-3">{name} ({players.length})</h2>
              <div className="space-y-2">
                {players.length === 0 && (
                  <p className="text-sm text-gray-400 bg-gray-50 rounded-xl p-4 text-center">No players yet.</p>
                )}
                {players.map((player) => (
                  <div key={player.id} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-400">{player.role}</p>
                      </div>
                      <button
                        onClick={() => deletePlayer(player.id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={pointsEditing[player.id] ?? player.performancePoints}
                        onChange={(e) => setPointsEditing((prev) => ({ ...prev, [player.id]: e.target.value }))}
                        className="w-24 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-xs text-gray-400">pts</span>
                      {pointsEditing[player.id] !== undefined && (
                        <button
                          onClick={() => savePoints(player.id)}
                          className="text-xs font-medium text-indigo-600 hover:underline"
                        >
                          Save
                        </button>
                      )}
                      {player.pointsUpdated && (
                        <span className="text-xs text-green-600 font-medium">✓ Updated</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

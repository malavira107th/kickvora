"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Match = { id: number; title: string; sport: string; teamA: string; teamB: string };

export default function NewPlayerPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [form, setForm] = useState({ matchId: "", name: "", team: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/matches")
      .then((r) => r.json())
      .then((data) => setMatches(data.matches ?? []));
  }, []);

  const selectedMatch = matches.find((m) => m.id === parseInt(form.matchId));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: parseInt(form.matchId),
          name: form.name,
          team: form.team,
          role: form.role,
          sport: selectedMatch?.sport,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push(`/admin/matches/${form.matchId}`);
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-sm text-indigo-600 hover:underline">Admin</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">Add Player</span>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Player to Match</h1>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Match</label>
              <select
                name="matchId"
                value={form.matchId}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a match</option>
                {matches.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Player Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Virat Kohli"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Team</label>
              <select
                name="team"
                value={form.team}
                onChange={handleChange}
                required
                disabled={!selectedMatch}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
              >
                <option value="">Select team</option>
                {selectedMatch && (
                  <>
                    <option value={selectedMatch.teamA}>{selectedMatch.teamA}</option>
                    <option value={selectedMatch.teamB}>{selectedMatch.teamB}</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Batsman / Bowler / All-rounder / Guard / Forward..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? "Adding..." : "Add Player"}
              </button>
              <Link href="/admin" className="border border-gray-200 text-gray-600 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

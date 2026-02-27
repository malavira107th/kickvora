import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Profile | Kickvora",
  description: "View your Kickvora profile, stats, and account details.",
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  });

  if (!user) redirect("/login");

  const teamCount = await prisma.userTeam.count({ where: { userId: session.userId } });

  const pointsResult = await prisma.userTeam.aggregate({
    where: { userId: session.userId },
    _sum: { totalPoints: true },
  });

  const completedTeams = await prisma.userTeam.count({
    where: { userId: session.userId, match: { status: "COMPLETED" } },
  });

  const totalPoints = Number(pointsResult._sum.totalPoints ?? 0);
  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-white">{initials}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-indigo-300 text-sm mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-white/10 text-indigo-200 px-2.5 py-0.5 rounded-full capitalize">
                  {user.role.toLowerCase()}
                </span>
                <span className="text-xs text-indigo-400">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
            <Image
              src="/icons/icon-team.svg"
              alt=""
              width={22}
              height={22}
              className="mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-gray-900">{teamCount}</p>
            <p className="text-xs text-gray-400 mt-0.5">Teams Built</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
            <Image
              src="/icons/icon-stats.svg"
              alt=""
              width={22}
              height={22}
              className="mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-indigo-600">{totalPoints.toFixed(1)}</p>
            <p className="text-xs text-gray-400 mt-0.5">Total Points</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
            <Image
              src="/icons/icon-trophy.svg"
              alt=""
              width={22}
              height={22}
              className="mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-gray-900">{completedTeams}</p>
            <p className="text-xs text-gray-400 mt-0.5">Completed</p>
          </div>
        </div>

        {/* Account details */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Account Details</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "Username", value: user.username },
              { label: "Email address", value: user.email },
              {
                label: "Account type",
                value: user.role.charAt(0) + user.role.slice(1).toLowerCase(),
              },
              {
                label: "Member since",
                value: new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/matches"
            className="bg-indigo-600 text-white rounded-xl p-4 flex items-center gap-3"
          >
            <Image src="/icons/icon-match.svg" alt="" width={20} height={20} />
            <div>
              <p className="font-semibold text-sm">Browse Matches</p>
              <p className="text-indigo-200 text-xs">Build a new team</p>
            </div>
          </Link>
          <Link
            href="/leaderboard"
            className="bg-white border border-gray-100 text-gray-900 rounded-xl p-4 flex items-center gap-3"
          >
            <Image src="/icons/icon-leaderboard.svg" alt="" width={20} height={20} />
            <div>
              <p className="font-semibold text-sm">Leaderboard</p>
              <p className="text-gray-400 text-xs">See your global rank</p>
            </div>
          </Link>
        </div>

        {/* Support note */}
        <p className="text-xs text-gray-400 text-center mt-8">
          Need help or want to update your account?{" "}
          <a href="mailto:support@kickvora.com" className="text-indigo-500">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}

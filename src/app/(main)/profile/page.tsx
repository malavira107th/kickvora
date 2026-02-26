import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Profile" };

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

  const totalPoints = Number(pointsResult._sum.totalPoints ?? 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Teams Created</p>
            <p className="text-2xl font-bold text-gray-900">{teamCount}</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Points</p>
            <p className="text-2xl font-bold text-indigo-600">{totalPoints.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Username</span>
            <span className="font-medium text-gray-900">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account type</span>
            <span className="font-medium text-gray-900 capitalize">{user.role.toLowerCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Member since</span>
            <span className="font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

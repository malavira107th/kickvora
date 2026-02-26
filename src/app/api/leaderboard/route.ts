import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get("sport");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = 20;
  const skip = (page - 1) * limit;

  const matchWhere: Record<string, unknown> = {};
  if (sport === "CRICKET" || sport === "cricket") matchWhere.sport = "CRICKET";
  if (sport === "BASKETBALL" || sport === "basketball") matchWhere.sport = "BASKETBALL";

  // Aggregate total points per user across all their teams
  const leaderboard = await prisma.userTeam.groupBy({
    by: ["userId"],
    where: {
      match: matchWhere,
    },
    _sum: { totalPoints: true },
    orderBy: { _sum: { totalPoints: "desc" } },
    skip,
    take: limit,
  });

  // Fetch user details for the leaderboard entries
  const userIds = leaderboard.map((entry) => entry.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  const result = leaderboard.map((entry, index) => ({
    rank: skip + index + 1,
    userId: entry.userId,
    username: userMap.get(entry.userId)?.username ?? "Unknown",
    totalPoints: entry._sum.totalPoints ?? 0,
  }));

  const total = await prisma.userTeam.groupBy({
    by: ["userId"],
    where: { match: matchWhere },
    _count: true,
  });

  return NextResponse.json({
    leaderboard: result,
    pagination: {
      page,
      limit,
      total: total.length,
      totalPages: Math.ceil(total.length / limit),
    },
  });
}

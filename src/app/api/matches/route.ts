import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get("sport");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (sport === "cricket" || sport === "CRICKET") where.sport = "CRICKET";
  if (sport === "basketball" || sport === "BASKETBALL") where.sport = "BASKETBALL";
  if (status === "upcoming" || status === "UPCOMING") where.status = "UPCOMING";
  if (status === "live" || status === "LIVE") where.status = "LIVE";
  if (status === "completed" || status === "COMPLETED") where.status = "COMPLETED";

  const matches = await prisma.match.findMany({
    where,
    orderBy: { scheduledAt: "asc" },
    select: {
      id: true,
      title: true,
      sport: true,
      teamA: true,
      teamB: true,
      scheduledAt: true,
      status: true,
      venue: true,
      _count: { select: { players: true } },
    },
  });

  return NextResponse.json({ matches });
}

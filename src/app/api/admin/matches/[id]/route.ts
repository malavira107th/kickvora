import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

const updateMatchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED"]).optional(),
  venue: z.string().max(200).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const matchId = parseInt(id, 10);
  if (isNaN(matchId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await req.json();
  const parsed = updateMatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.scheduledAt) {
    data.scheduledAt = new Date(parsed.data.scheduledAt);
  }

  // When a match is completed, recalculate all team points
  if (parsed.data.status === "COMPLETED") {
    await recalculateTeamPoints(matchId);
  }

  const match = await prisma.match.update({ where: { id: matchId }, data });
  return NextResponse.json({ match });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const matchId = parseInt(id, 10);
  if (isNaN(matchId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.match.delete({ where: { id: matchId } });
  return NextResponse.json({ success: true });
}

// Recalculate total points for every team in a match based on player performance
async function recalculateTeamPoints(matchId: number) {
  const teams = await prisma.userTeam.findMany({
    where: { matchId },
    include: {
      players: {
        include: { player: true },
      },
    },
  });

  for (const team of teams) {
    let total = 0;
    for (const tp of team.players) {
      let pts = tp.player.performancePoints;
      // Captain gets 2x points, vice captain gets 1.5x
      if (tp.isCaptain) pts *= 2;
      else if (tp.isViceCaptain) pts *= 1.5;
      total += pts;
    }
    await prisma.userTeam.update({
      where: { id: team.id },
      data: { totalPoints: total },
    });
  }
}

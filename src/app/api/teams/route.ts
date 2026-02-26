import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createTeamSchema = z.object({
  matchId: z.number().int().positive(),
  teamName: z.string().min(1, "Team name is required").max(50),
  playerIds: z.array(z.number().int().positive()).min(1),
  captainId: z.number().int().positive(),
  viceCaptainId: z.number().int().positive(),
});

// GET /api/teams — list teams for the current user
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to view your teams" }, { status: 401 });
  }

  const teams = await prisma.userTeam.findMany({
    where: { userId: session.userId },
    include: {
      match: {
        select: { id: true, title: true, sport: true, teamA: true, teamB: true, status: true },
      },
      players: {
        include: {
          player: { select: { id: true, name: true, team: true, role: true, performancePoints: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ teams });
}

// POST /api/teams — create a new team
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to create a team" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createTeamSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { matchId, teamName, playerIds, captainId, viceCaptainId } = parsed.data;

  // Validate the match exists and is upcoming
  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
  if (match.status === "COMPLETED") {
    return NextResponse.json({ error: "This match has already been completed" }, { status: 400 });
  }

  // Validate player count based on sport
  const requiredCount = match.sport === "CRICKET" ? 11 : 5;
  if (playerIds.length !== requiredCount) {
    return NextResponse.json(
      { error: `You must select exactly ${requiredCount} players for ${match.sport.toLowerCase()}` },
      { status: 400 }
    );
  }

  // Validate all players belong to this match
  const players = await prisma.player.findMany({
    where: { id: { in: playerIds }, matchId },
  });
  if (players.length !== playerIds.length) {
    return NextResponse.json({ error: "One or more players are invalid for this match" }, { status: 400 });
  }

  // Check if user already has a team for this match
  const existingTeam = await prisma.userTeam.findFirst({
    where: { userId: session.userId, matchId },
  });
  if (existingTeam) {
    return NextResponse.json(
      { error: "You have already created a team for this match" },
      { status: 409 }
    );
  }

  // Create the team and its player selections in a transaction
  const team = await prisma.$transaction(async (tx) => {
    const newTeam = await tx.userTeam.create({
      data: {
        userId: session.userId,
        matchId,
        teamName,
        totalPoints: 0,
      },
    });

    await tx.teamPlayer.createMany({
      data: playerIds.map((pid) => ({
        teamId: newTeam.id,
        playerId: pid,
        isCaptain: pid === captainId,
        isViceCaptain: pid === viceCaptainId,
      })),
    });

    return newTeam;
  });

  return NextResponse.json({ team }, { status: 201 });
}

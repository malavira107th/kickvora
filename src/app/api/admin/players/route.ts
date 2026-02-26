import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

const createPlayerSchema = z.object({
  matchId: z.number().int().positive(),
  name: z.string().min(1, "Player name is required").max(100),
  team: z.string().min(1, "Team name is required").max(100),
  role: z.string().min(1, "Player role is required").max(50),
  sport: z.enum(["CRICKET", "BASKETBALL"]),
});

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = createPlayerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  // Verify match exists
  const match = await prisma.match.findUnique({ where: { id: parsed.data.matchId } });
  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  const player = await prisma.player.create({ data: parsed.data });
  return NextResponse.json({ player }, { status: 201 });
}

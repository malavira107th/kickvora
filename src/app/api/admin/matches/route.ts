import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;
  if (session.role !== "ADMIN") return null;
  return session;
}

const createMatchSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  sport: z.enum(["CRICKET", "BASKETBALL"]),
  teamA: z.string().min(1, "Team A name is required").max(100),
  teamB: z.string().min(1, "Team B name is required").max(100),
  scheduledAt: z.string().datetime(),
  venue: z.string().max(200).optional(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const matches = await prisma.match.findMany({
    orderBy: { scheduledAt: "desc" },
    include: {
      _count: { select: { players: true, userTeams: true } },
    },
  });

  return NextResponse.json({ matches });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createMatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const match = await prisma.match.create({
    data: {
      ...parsed.data,
      scheduledAt: new Date(parsed.data.scheduledAt),
    },
  });

  return NextResponse.json({ match }, { status: 201 });
}

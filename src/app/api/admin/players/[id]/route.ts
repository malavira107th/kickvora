import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

const updatePlayerSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: z.string().min(1).max(50).optional(),
  performancePoints: z.number().min(0).optional(),
  pointsUpdated: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const playerId = parseInt(id, 10);
  if (isNaN(playerId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await req.json();
  const parsed = updatePlayerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const player = await prisma.player.update({
    where: { id: playerId },
    data: parsed.data,
  });

  return NextResponse.json({ player });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const playerId = parseInt(id, 10);
  if (isNaN(playerId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.player.delete({ where: { id: playerId } });
  return NextResponse.json({ success: true });
}

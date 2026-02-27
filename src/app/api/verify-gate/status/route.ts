import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const GATE_COOKIE_NAME = "kv_gate_verified";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(GATE_COOKIE_NAME);

  if (!cookie?.value) {
    return NextResponse.json({ verified: false });
  }

  try {
    const { payload } = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    if (payload.verified && payload.step1 && payload.step2) {
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ verified: false });
  } catch {
    // Token expired or tampered
    return NextResponse.json({ verified: false });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;
const SCORE_THRESHOLD = 0.5;
const GATE_COOKIE_NAME = "kv_gate_verified";
// Cookie valid for 7 days (increased from 24h for better UX)
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, step } = body;

    // Step 1: verify reCAPTCHA token with Google
    if (step === "recaptcha") {
      if (!token) {
        return NextResponse.json(
          { success: false, error: "Missing reCAPTCHA token" },
          { status: 400 }
        );
      }

      if (!RECAPTCHA_SECRET) {
        console.error("[Gate] RECAPTCHA_SECRET_KEY env var is not set");
        return NextResponse.json(
          { success: false, error: "Server configuration error" },
          { status: 500 }
        );
      }

      // Call Google's reCAPTCHA v3 verify endpoint
      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: RECAPTCHA_SECRET,
            response: token,
          }),
        }
      );

      const verifyData = await verifyRes.json();

      // Validate response from Google
      if (!verifyData.success) {
        return NextResponse.json(
          {
            success: false,
            error: "reCAPTCHA verification failed",
            codes: verifyData["error-codes"],
          },
          { status: 400 }
        );
      }

      // Validate score threshold
      if (verifyData.score < SCORE_THRESHOLD) {
        return NextResponse.json(
          {
            success: false,
            error: "Verification score too low",
            score: verifyData.score,
          },
          { status: 400 }
        );
      }

      // Validate action name
      if (verifyData.action !== "site_entry") {
        return NextResponse.json(
          {
            success: false,
            error: "Action mismatch",
            action: verifyData.action,
          },
          { status: 400 }
        );
      }

      // reCAPTCHA passed — return success (age confirmation is handled client-side)
      return NextResponse.json({ success: true, score: verifyData.score });
    }

    // Step 2: age verification — set the final verified cookie
    if (step === "age") {
      if (!JWT_SECRET) {
        console.error("[Gate] JWT_SECRET env var is not set");
        return NextResponse.json(
          { success: false, error: "Server configuration error" },
          { status: 500 }
        );
      }

      // Issue the final full-access gate cookie
      const finalToken = await new SignJWT({
        verified: true,
        step1: true,
        step2: true,
        iat: Date.now(),
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(JWT_SECRET));

      const response = NextResponse.json({ success: true });

      // Set final verified cookie — 7 days
      response.cookies.set(GATE_COOKIE_NAME, finalToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid step" },
      { status: 400 }
    );
  } catch (err) {
    console.error("[Gate] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

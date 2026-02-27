import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;
const SCORE_THRESHOLD = 0.5;
const GATE_COOKIE_NAME = "kv_gate_verified";
// Cookie valid for 24 hours
const COOKIE_MAX_AGE = 60 * 60 * 24;

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

      // reCAPTCHA passed — issue a partial gate token (step1 done)
      const partialToken = await new SignJWT({
        step1: true,
        step2: false,
        score: verifyData.score,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h") // short-lived until step 2 completes
        .sign(new TextEncoder().encode(JWT_SECRET));

      const response = NextResponse.json({ success: true, score: verifyData.score });
      response.cookies.set("kv_gate_step1", partialToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour to complete step 2
        path: "/",
      });

      return response;
    }

    // Step 2: age verification confirmation
    if (step === "age") {
      // Verify step 1 was completed
      const step1Cookie = req.cookies.get("kv_gate_step1");
      if (!step1Cookie?.value) {
        return NextResponse.json(
          { success: false, error: "Step 1 not completed" },
          { status: 403 }
        );
      }

      // Verify the step1 JWT is valid
      try {
        const { payload } = await import("jose").then((m) =>
          m.jwtVerify(
            step1Cookie.value,
            new TextEncoder().encode(JWT_SECRET)
          )
        );

        if (!payload.step1) {
          return NextResponse.json(
            { success: false, error: "Step 1 verification invalid" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Step 1 token expired or invalid" },
          { status: 403 }
        );
      }

      // Age confirmed — issue the final full-access gate cookie
      const finalToken = await new SignJWT({
        verified: true,
        step1: true,
        step2: true,
        iat: Date.now(),
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(JWT_SECRET));

      const response = NextResponse.json({ success: true });

      // Set final verified cookie — 24 hours
      response.cookies.set(GATE_COOKIE_NAME, finalToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });

      // Clear the intermediate step1 cookie
      response.cookies.set("kv_gate_step1", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
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

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

type GateStep = "loading" | "recaptcha" | "age" | "done" | "blocked";

export default function VerificationGate({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<GateStep>("loading");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount — check if already verified via cookie
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/verify-gate/status");
        const data = await res.json();
        if (data.verified) {
          setStep("done");
        } else {
          setStep("recaptcha");
        }
      } catch {
        setStep("recaptcha");
      }
    }
    checkStatus();
  }, []);

  // Load reCAPTCHA v3 script dynamically (no CDN in HTML head — loaded on demand)
  useEffect(() => {
    if (step !== "recaptcha") return;

    // Check if script already loaded
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setRecaptchaReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => setRecaptchaReady(true));
    };
    document.head.appendChild(script);

    return () => {
      // Don't remove — keep for the session
    };
  }, [step]);

  // Auto-trigger reCAPTCHA as soon as it's ready
  useEffect(() => {
    if (recaptchaReady && step === "recaptcha" && !verifying) {
      handleRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recaptchaReady, step]);

  const handleRecaptcha = useCallback(async () => {
    setVerifying(true);
    setError(null);

    try {
      const token = await window.grecaptcha.execute(SITE_KEY, {
        action: "site_entry",
      });

      const res = await fetch("/api/verify-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, step: "recaptcha" }),
      });

      const data = await res.json();

      if (data.success) {
        // Step 1 passed — move to age verification
        setStep("age");
      } else {
        setError("Verification failed. Please try again.");
        setStep("blocked");
      }
    } catch {
      setError("Network error. Please refresh the page.");
      setStep("blocked");
    } finally {
      setVerifying(false);
    }
  }, []);

  const handleAgeConfirm = async () => {
    setVerifying(true);
    setError(null);

    try {
      const res = await fetch("/api/verify-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "age" }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("done");
      } else {
        setError("Session error. Please refresh the page.");
      }
    } catch {
      setError("Network error. Please refresh the page.");
    } finally {
      setVerifying(false);
    }
  };

  const handleAgeDecline = () => {
    setStep("blocked");
    setError("You must be 18 or older to access this platform.");
  };

  const handleRetry = () => {
    setError(null);
    setStep("recaptcha");
    setRecaptchaReady(false);
  };

  // Site is verified — render children normally
  if (step === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Blurred, non-interactive site content behind the gate */}
      <div
        aria-hidden="true"
        style={{
          filter: "blur(8px)",
          pointerEvents: "none",
          userSelect: "none",
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {/* Full-screen overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "rgba(15, 15, 30, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {/* Verification card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            maxWidth: "420px",
            width: "100%",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <Image
              src="/brand/logo-icon.webp"
              alt="Kickvora"
              width={56}
              height={56}
              style={{ borderRadius: "12px" }}
              priority
            />
          </div>

          <h1
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "#171717",
              marginBottom: "0.375rem",
              letterSpacing: "-0.01em",
            }}
          >
            Kickvora
          </h1>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "2rem",
            }}
          >
            Cricket &amp; Basketball Strategy Platform
          </p>

          {/* Step indicator */}
          {(step === "recaptcha" || step === "age" || step === "loading") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1.75rem",
              }}
            >
              {/* Step 1 dot */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: step === "recaptcha" || step === "loading" ? "#4f46e5" : "#10b981",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {step === "age" ? "✓" : "1"}
              </div>
              <div style={{ height: "2px", width: "40px", background: step === "age" ? "#10b981" : "#e5e7eb" }} />
              {/* Step 2 dot */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: step === "age" ? "#4f46e5" : "#e5e7eb",
                  color: step === "age" ? "#fff" : "#9ca3af",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                2
              </div>
            </div>
          )}

          {/* Loading state */}
          {step === "loading" && (
            <div style={{ padding: "1rem 0" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "3px solid #e5e7eb",
                  borderTopColor: "#4f46e5",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Checking your session...</p>
            </div>
          )}

          {/* Step 1: reCAPTCHA verification */}
          {step === "recaptcha" && (
            <div>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "0.375rem" }}>
                  Step 1 of 2 — Security Check
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  We are verifying your request with Google reCAPTCHA to protect the platform from automated access.
                </p>
              </div>

              {verifying ? (
                <div style={{ padding: "0.75rem 0" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "3px solid #e5e7eb",
                      borderTopColor: "#4f46e5",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                      margin: "0 auto 0.75rem",
                    }}
                  />
                  <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>Verifying with Google...</p>
                </div>
              ) : (
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>Verification is running automatically...</p>
              )}
            </div>
          )}

          {/* Step 2: Age verification */}
          {step === "age" && (
            <div>
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#16a34a", fontSize: "1rem" }}>✓</span>
                <p style={{ fontSize: "0.8rem", color: "#15803d", fontWeight: 500 }}>
                  Security check passed
                </p>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                  Step 2 of 2 — Age Confirmation
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: "1.5" }}>
                  This platform is intended for users who are <strong>18 years of age or older</strong>.
                  Please confirm your age to continue.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <button
                  onClick={handleAgeConfirm}
                  disabled={verifying}
                  style={{
                    background: verifying ? "#a5b4fc" : "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: verifying ? "not-allowed" : "pointer",
                    width: "100%",
                    transition: "background 0.15s",
                  }}
                >
                  {verifying ? "Please wait..." : "Yes, I am 18 or older — Enter"}
                </button>
                <button
                  onClick={handleAgeDecline}
                  disabled={verifying}
                  style={{
                    background: "transparent",
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: verifying ? "not-allowed" : "pointer",
                    width: "100%",
                  }}
                >
                  No, I am under 18
                </button>
              </div>
            </div>
          )}

          {/* Blocked state */}
          {step === "blocked" && (
            <div>
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚫</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#991b1b", marginBottom: "0.375rem" }}>
                  Access Denied
                </p>
                <p style={{ fontSize: "0.8rem", color: "#b91c1c", lineHeight: "1.5" }}>
                  {error || "You do not meet the requirements to access this platform."}
                </p>
              </div>

              {error && error.includes("Verification failed") && (
                <button
                  onClick={handleRetry}
                  style={{
                    background: "#4f46e5",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          )}

          {/* Error message */}
          {error && step !== "blocked" && (
            <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.75rem" }}>
              {error}
            </p>
          )}

          {/* reCAPTCHA branding (required by Google ToS) */}
          <p
            style={{
              fontSize: "0.7rem",
              color: "#9ca3af",
              marginTop: "1.5rem",
              lineHeight: "1.4",
            }}
          >
            Protected by reCAPTCHA —{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6b7280", textDecoration: "underline" }}
            >
              Privacy
            </a>{" "}
            &amp;{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#6b7280", textDecoration: "underline" }}
            >
              Terms
            </a>
          </p>
        </div>
      </div>

      {/* CSS keyframe for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

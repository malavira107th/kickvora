"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

type GateStep = "welcome" | "recaptcha" | "age" | "done" | "blocked";
type BlockReason = "age" | "error" | "network";

export default function VerificationGate({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<GateStep>("welcome");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockReason, setBlockReason] = useState<BlockReason | null>(null);
  const scriptLoadedRef = useRef(false);

  // Preload the reCAPTCHA script as soon as the gate mounts (but don't execute yet)
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    if (!SITE_KEY) return;

    scriptLoadedRef.current = true;

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setRecaptchaReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setRecaptchaReady(true));
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleStartVerification = useCallback(async () => {
    setStep("recaptcha");
    setVerifying(true);
    setError(null);

    // If no site key, skip reCAPTCHA and go straight to age step
    if (!SITE_KEY) {
      setStep("age");
      setVerifying(false);
      return;
    }

    const doVerify = async () => {
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
          setStep("age");
        } else {
          setError("Security verification failed. Please try again.");
          setBlockReason("error");
          setStep("blocked");
        }
      } catch {
        setError("A network error occurred. Please check your connection and try again.");
        setBlockReason("network");
        setStep("blocked");
      } finally {
        setVerifying(false);
      }
    };

    if (recaptchaReady) {
      doVerify();
    } else {
      // Wait for reCAPTCHA to be ready (max 10s)
      let waited = 0;
      const interval = setInterval(() => {
        waited += 200;
        if (window.grecaptcha) {
          clearInterval(interval);
          window.grecaptcha.ready(() => {
            setRecaptchaReady(true);
            doVerify();
          });
        } else if (waited >= 10000) {
          clearInterval(interval);
          // Fallback: skip reCAPTCHA and go to age step
          setStep("age");
          setVerifying(false);
        }
      }, 200);
    }
  }, [recaptchaReady]);

  const handleAgeConfirm = () => {
    setStep("done");
  };

  const handleAgeDecline = () => {
    setBlockReason("age");
    setStep("blocked");
    setError("You must be 18 or older to access this platform.");
  };

  const handleRetry = () => {
    setError(null);
    setBlockReason(null);
    setStep("welcome");
  };

  // Verified — render children
  if (step === "done") {
    return <>{children}</>;
  }

  const canRetry = blockReason === "error" || blockReason === "network";

  return (
    <>
      {/* Blurred site content behind the gate */}
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

          {/* Step indicator — shown during recaptcha and age steps */}
          {(step === "recaptcha" || step === "age") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1.75rem",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: step === "recaptcha" ? "#4f46e5" : "#10b981",
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

          {/* Welcome step — user must click to begin */}
          {step === "welcome" && (
            <div style={{ padding: "0.5rem 0" }}>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1.5rem",
                  textAlign: "left",
                }}
              >
                <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                  Before entering, we need to:
                </p>
                <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.8 }}>
                  <li>Run a quick security check (reCAPTCHA)</li>
                  <li>Confirm you are 18 years or older</li>
                </ul>
              </div>

              <button
                onClick={handleStartVerification}
                style={{
                  width: "100%",
                  padding: "0.9375rem",
                  background: "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#4338ca")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#4f46e5")}
              >
                Continue to Kickvora →
              </button>
            </div>
          )}

          {/* Step 1: reCAPTCHA in progress */}
          {step === "recaptcha" && (
            <div style={{ padding: "1rem 0" }}>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#111827", marginBottom: "0.375rem" }}>
                  Step 1 of 2 — Security Check
                </p>
                <p style={{ fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.5 }}>
                  Verifying your request with Google reCAPTCHA to protect the platform from automated access.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid #e5e7eb",
                    borderTopColor: "#4f46e5",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    flexShrink: 0,
                  }}
                />
                Verifying with Google...
              </div>
            </div>
          )}

          {/* Step 2: Age confirmation */}
          {step === "age" && (
            <div style={{ padding: "0.5rem 0" }}>
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#16a34a", fontSize: "1rem" }}>✓</span>
                <span style={{ fontSize: "0.875rem", color: "#15803d", fontWeight: 500 }}>Security check passed</span>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#111827", marginBottom: "0.375rem" }}>
                  Step 2 of 2 — Age Confirmation
                </p>
                <p style={{ fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.5 }}>
                  This platform is intended for users who are{" "}
                  <strong style={{ color: "#111827" }}>18 years of age or older</strong>. Please confirm your age to continue.
                </p>
              </div>

              <button
                onClick={handleAgeConfirm}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  background: "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#4338ca")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#4f46e5")}
              >
                Yes, I am 18 or older — Enter
              </button>

              <button
                onClick={handleAgeDecline}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "transparent",
                  color: "#6b7280",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "#9ca3af")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              >
                No, I am under 18
              </button>
            </div>
          )}

          {/* Blocked state */}
          {step === "blocked" && (
            <div style={{ padding: "0.5rem 0" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: blockReason === "age" ? "#fef2f2" : "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.5rem",
                }}
              >
                {blockReason === "age" ? "🔞" : "⚠️"}
              </div>

              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
                {blockReason === "age" ? "Access Restricted" : "Verification Failed"}
              </p>

              {error && (
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                  {error}
                </p>
              )}

              {canRetry && (
                <button
                  onClick={handleRetry}
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          )}

          {/* reCAPTCHA attribution */}
          {step !== "blocked" && (
            <p style={{ fontSize: "0.6875rem", color: "#9ca3af", marginTop: "1.5rem", lineHeight: 1.4 }}>
              Protected by reCAPTCHA —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280" }}>
                Privacy
              </a>{" "}
              &amp;{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280" }}>
                Terms
              </a>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

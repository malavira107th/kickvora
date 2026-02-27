import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VerificationGate from "@/components/VerificationGate";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Kickvora — Cricket & Basketball Strategy Platform",
    template: "%s | Kickvora",
  },
  description:
    "Test your sports knowledge and strategic skills with Kickvora. Build your dream team, compete in free-to-play challenges, and rise to the top of the leaderboards.",
  keywords: [
    "cricket strategy",
    "basketball strategy",
    "sports knowledge game",
    "team building",
    "skill-based sports",
    "free sports game",
    "cricket team builder",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kickvora.com",
    siteName: "Kickvora",
    title: "Kickvora — Cricket & Basketball Strategy Platform",
    description:
      "Build your dream cricket or basketball team, track real player performance, and compete on skill-based leaderboards. Free to play, forever.",
    images: [
      {
        url: "/brand/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kickvora — Cricket & Basketball Strategy Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kickvora — Cricket & Basketball Strategy Platform",
    description:
      "Build your dream team, track real player performance, and compete on skill-based leaderboards. Free to play.",
    images: ["/brand/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VerificationGate>{children}</VerificationGate>
      </body>
    </html>
  );
}

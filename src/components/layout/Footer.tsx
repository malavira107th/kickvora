import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0e1a] text-gray-400">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand — wide column */}
          <div className="md:col-span-5 space-y-5">
            {/* Full logo with wordmark */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/logo-icon.webp"
                alt="Kickvora"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <span className="text-white font-bold text-2xl tracking-tight">Kickvora</span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A free-to-use, skill-based cricket and basketball strategy platform. Build your team
              from real players, track live performance, and compete on knowledge-based leaderboards.
            </p>

            {/* Sport tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                <Image src="/icons/icon-cricket.svg" alt="" width={13} height={13} className="brightness-0 invert opacity-60" />
                Cricket
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                <Image src="/icons/icon-basketball.svg" alt="" width={13} height={13} className="brightness-0 invert opacity-60" />
                Basketball
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-950/50 border border-green-800/40 text-green-500 text-xs px-3 py-1.5 rounded-full">
                Free to Play
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-2 pt-2 text-sm">
              <a href="mailto:support@kickvora.com" className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@kickvora.com
              </a>
              <div className="flex items-start gap-2 text-gray-500 text-xs leading-relaxed">
                <svg className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  G 93-94, D Block, Baani Square,<br />
                  Sector 50, Gurugram,<br />
                  Haryana 122018, India
                </span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Platform links */}
          <div className="md:col-span-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">Platform</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Matches", href: "/matches" },
                { label: "Leaderboard", href: "/leaderboard" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="md:col-span-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/logo-icon.webp"
              alt="Kickvora"
              width={24}
              height={24}
              className="h-6 w-6 object-contain opacity-60"
            />
            <span className="text-xs text-gray-600">&copy; {year} Kickvora. All rights reserved.</span>
          </div>
          <p className="text-xs text-gray-600 text-center sm:text-right">
            A free-to-use entertainment and strategy platform. No real-world stakes involved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0f1a] text-gray-400">
      {/* Top divider accent */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column — wider */}
          <div className="md:col-span-5">
            {/* Actual logo — white version */}
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/brand/logo-light.webp"
                alt="Kickvora"
                width={200}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-6">
              Kickvora is a free-to-use, skill-based cricket and basketball strategy platform.
              Build your team from real players, track live performance, and compete on
              knowledge-based leaderboards.
            </p>

            {/* Sport badges */}
            <div className="flex gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                <Image src="/icons/icon-cricket.svg" alt="Cricket" width={14} height={14} className="brightness-0 invert opacity-70" />
                Cricket
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                <Image src="/icons/icon-basketball.svg" alt="Basketball" width={14} height={14} className="brightness-0 invert opacity-70" />
                Basketball
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full">
                100% Free
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <a
                href="mailto:support@kickvora.com"
                className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
              >
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
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Platform</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Matches", href: "/matches" },
                { label: "Leaderboard", href: "/leaderboard" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-light.webp"
              alt="Kickvora"
              width={90}
              height={28}
              className="h-6 w-auto object-contain brightness-0 invert opacity-40"
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

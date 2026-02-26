import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-xl text-white">Kickvora</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A free-to-use, skill-based cricket and basketball strategy platform. Build teams,
              track performance, and compete with fans around the world.
            </p>
            <div className="mt-4 text-sm space-y-1">
              <p>
                <span className="text-gray-500">Email:</span>{" "}
                <a href="mailto:support@kickvora.com" className="text-gray-300 hover:text-white transition-colors">
                  support@kickvora.com
                </a>
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                G 93-94, D block, Baani Square,<br />
                Sector 50, Gurugram, Haryana 122018, India
              </p>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/matches" className="hover:text-white transition-colors">Matches</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>&copy; {year} Kickvora. All rights reserved.</p>
          <p>
            Kickvora is a free-to-use entertainment platform. No real-world stakes involved.
          </p>
        </div>
      </div>
    </footer>
  );
}

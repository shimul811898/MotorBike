import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0c1017]/80 backdrop-blur-xl text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white flex items-center gap-2">
              <span className="text-emerald-400">🏍️</span> Moto<span className="text-emerald-400">Bike</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium motorcycle hub. Compare verified models, explore top-tier superbikes, and place instant booking vouchers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-bike" className="hover:text-emerald-400 transition">
                  All Bikes
                </Link>
              </li>
              <li>
                <Link href="/mybooking" className="hover:text-emerald-400 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-emerald-400 transition cursor-pointer">Sports Bikes</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Cruisers</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Touring Superbikes</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Adventure / Off-Road</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>📧 support@motobike.com</li>
              <li>📞 +880 1799-802008</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MotoBike Hub. All Rights Reserved.</p>

          <div className="flex gap-6 text-slate-400 font-semibold">
            <span className="hover:text-emerald-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emerald-400 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-emerald-400 transition cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="w-full sticky top-0 z-50 glass-nav shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-white/10 border border-white/10 backdrop-blur-md">
            <Image
              src="/assests/Navlogo.jpg"
              alt="Moto Logo"
              width={42}
              height={42}
              className="h-10 w-10 object-cover rounded-xl"
              priority
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Moto<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">Bike</span>
          </h2>
        </Link>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-1 font-semibold text-slate-300">
          <li>
            <Link 
              href="/" 
              className="px-4 py-2 rounded-xl hover:text-emerald-400 hover:bg-white/5 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/all-bike" 
              className="px-4 py-2 rounded-xl hover:text-emerald-400 hover:bg-white/5 transition duration-200"
            >
              All Bikes
            </Link>
          </li>
          <li>
            <Link 
              href="/mybooking" 
              className="px-4 py-2 rounded-xl hover:text-emerald-400 hover:bg-white/5 transition duration-200"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Auth Buttons / Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="h-10 w-28 bg-white/10 animate-pulse rounded-xl" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
                {user.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={user.image} alt={user.name || "User"} className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/50" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="text-sm font-bold text-slate-200 max-w-[130px] truncate">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 font-bold hover:bg-red-500 hover:text-white transition cursor-pointer text-sm backdrop-blur-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-emerald-400 hover:bg-white/5 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition"
        >
          {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4 bg-[#0e131d]/95 backdrop-blur-2xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-emerald-400 font-medium">
            Home
          </Link>
          <Link href="/all-bike" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-emerald-400 font-medium">
            All Bikes
          </Link>
          <Link href="/mybooking" onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-emerald-400 font-medium">
            Dashboard
          </Link>

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="text-sm font-bold text-slate-300">Logged in as: {user.name || user.email}</div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 font-bold hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = null;

  return (
    <div className="w-full sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
             src="/assests/Navlogo.png"
            alt="Moto Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-xl"
            priority
          />

         <h2 className="text-3xl font-black tracking-tight text-slate-900">
  Moto<span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
    Bike
  </span>
</h2>
        </Link>

       
        <ul className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          
          <li className="relative group py-2">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all"></span>
          </li>

          <li className="relative group py-2">
            <Link href="/all-bike" className="hover:text-green-600 transition">
              All Bikes
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all"></span>
          </li>

          <li className="relative group py-2">
            <Link href="/mybooking" className="hover:text-green-600 transition">
              Dashboard
            </Link>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all"></span>
          </li>
        </ul>

  
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition">
              Profile
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl font-bold text-slate-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold shadow-md hover:bg-green-700 hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100"
        >
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6" />
          )}
        </button>
      </nav>

      
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 border-t" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4 bg-white">

          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-green-600">
            Home
          </Link>

          <Link href="/all-bike" onClick={() => setIsOpen(false)} className="hover:text-green-600">
            All Bikes
          </Link>

          <Link href="/mybooking" onClick={() => setIsOpen(false)} className="hover:text-green-600">
            Dashboard
          </Link>

          <div className="border-t pt-4 flex flex-col gap-3">

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-center py-3 rounded-xl bg-slate-50 font-semibold"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="text-center py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
            >
              Register
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
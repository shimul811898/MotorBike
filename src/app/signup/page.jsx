"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaMotorcycle } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/",
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false);
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error?.message || "Registration failed. Please try again.");
          },
        }
      );
      if (res?.error) {
        setError(res.error.message || "Registration failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during signup.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to initialize Google Sign-In.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0b0f17]">
      <div className="max-w-md w-full space-y-8 bg-[#121826] p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-2 shadow-sm border border-emerald-500/20">
            <FaMotorcycle size={32} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Join MotoBike to explore and book your dream motorcycle
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSignup}>
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaUser />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 border border-white/10 rounded-2xl text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-[#0f172a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-white/10 rounded-2xl text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-[#0f172a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-white/10 rounded-2xl text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-[#0f172a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-white/10 rounded-2xl text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-[#0f172a]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#121826] px-3 text-slate-400 font-bold">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-white/10 rounded-2xl bg-[#0f172a] text-slate-200 font-bold text-sm hover:bg-white/5 hover:border-white/20 transition shadow-sm cursor-pointer disabled:opacity-50"
        >
          <FaGoogle className="text-red-400 text-lg" />
          <span>{googleLoading ? "Connecting to Google..." : "Sign up with Google"}</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm font-semibold text-slate-400 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 font-extrabold hover:underline">
            Log In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

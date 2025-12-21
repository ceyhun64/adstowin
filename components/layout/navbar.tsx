"use client";

import Link from "next/link";
import Image from "next/image";
import { Crown, Wallet, Coins, Plus, LogIn } from "lucide-react";
import HamburgerMenu from "./hamburgerMenu";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, isLoggedIn, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading)
    return (
      <div className="h-20 bg-slate-50/50 dark:bg-white/5 animate-pulse border-b border-slate-200 dark:border-white/10" />
    );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-60 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO SECTION */}
          <Link href="/" className="group flex items-center gap-3 outline-none">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
              <Image
                src="/logo/logo2.jpg"
                alt="Logo"
                width={42}
                height={42}
                className="relative rounded-2xl shadow-lg border-2 border-white dark:border-slate-800 transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              ADSTOWIN
            </span>
          </Link>

          {/* RIGHT SIDE SECTION */}
          <div className="flex items-center gap-4">
            {isLoggedIn && user && (
              <div className="hidden lg:flex items-center gap-3">
                <Stat
                  label="Balance"
                  value={`$${user.balance}`}
                  icon={<Wallet size={16} />}
                  href="/"
                  variant="indigo"
                />
                <Stat
                  label="TKripto"
                  value={user.tkripto}
                  icon={<Coins size={16} />}
                  href="/"
                  variant="amber"
                />
              </div>
            )}

            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all"
                >
                  <LogIn size={18} />
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="relative group overflow-hidden bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-95"
                >
                  <span className="relative z-10 uppercase tracking-widest">
                    Hemen Başla
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* PREMIUM STATUS CHECK - STRING BASED */}
                {user?.membershipType === "PREMIUM" ? (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-linear-to-r from-amber-400 to-yellow-600 text-white text-xs font-black shadow-lg shadow-yellow-500/30 border border-white/20">
                    <Crown size={14} className="fill-current animate-pulse" />
                    <span className="uppercase tracking-wider text-[10px]">
                      Premium
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/premium"
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black shadow-sm border border-slate-200 dark:border-white/10 hover:border-amber-500 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <Crown
                      size={14}
                      className="text-amber-500 group-hover:rotate-12 transition-transform"
                    />
                    <span className="uppercase tracking-wider text-[10px]">
                      Premium'a Geç
                    </span>
                  </Link>
                )}
              </div>
            )}

            {/* MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative w-12 h-12 flex flex-col items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-all active:scale-90"
            >
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span
                  className={`h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                  }`}
                />
                <span
                  className={`h-0.5 bg-indigo-500 rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "w-4 group-hover:w-6"
                  }`}
                />
                <span
                  className={`h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen
                      ? "w-6 -rotate-45 -translate-y-2"
                      : "w-5 group-hover:w-6"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

function Stat({ value, icon, href, variant }: any) {
  const colors = {
    indigo:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20",
    amber:
      "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
  }[variant as "indigo" | "amber"];

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 group ${colors}`}
    >
      <div className="transition-transform group-hover:scale-110">{icon}</div>
      <span className="text-sm font-black tracking-tight">{value}</span>
      <div className="ml-1 p-1 rounded-lg bg-white dark:bg-white/10 shadow-sm border border-inherit transition-transform group-hover:rotate-90">
        <Plus size={12} strokeWidth={4} />
      </div>
    </Link>
  );
}

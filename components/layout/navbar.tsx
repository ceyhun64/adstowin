"use client";

import Link from "next/link";
import Image from "next/image";
import { Crown, Wallet, Coins, Plus, LogIn, Sparkles } from "lucide-react";
import HamburgerMenu from "./hamburgerMenu";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="fixed top-0 inset-x-0 h-20 bg-[#020617]/50 backdrop-blur-md border-b border-white/5 animate-pulse z-50" />
    );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-700 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className={`relative transition-all duration-500 ease-in-out flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 rounded-[24px] border ${
              scrolled
                ? "bg-[#020617]/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* LOGO SECTION */}
            <Link href="/" className="group flex items-center gap-3 outline-none shrink-0">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 p-0.5 bg-gradient-to-br from-white/10 to-transparent">
                <Image
                  src="/logo/logo2.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="relative rounded-[10px] sm:rounded-[14px] transition-transform duration-500 group-hover:scale-110 sm:w-[38px] sm:h-[38px] object-cover"
                />
                <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-[ -0.05em] text-white leading-none">
                  ADS<span className="text-indigo-500">TOWIN</span>
                </span>
                <span className="text-[8px] font-bold tracking-[0.3em] text-slate-500 uppercase">Premium Ecosystem</span>
              </div>
            </Link>

            {/* RIGHT SIDE SECTION */}
            <div className="flex items-center gap-2 sm:gap-6">
              {isLoggedIn && user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Bakiye - Glass Style */}
                  <div className="hidden xs:flex items-center gap-3">
                    <Stat
                      value={`$${user.balance}`}
                      icon={<Wallet size={14} className="text-indigo-400" />}
                      href="/wallet"
                      variant="glass"
                    />
                    <Stat
                      value={user.tkripto}
                      icon={<Coins size={14} className="text-emerald-400" />}
                      href="/mining"
                      variant="glass"
                    />
                  </div>

                  {/* PREMIUM / UPGRADE */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                    {user?.membershipType === "PREMIUM" ? (
                      <div className="relative flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#020617] border border-amber-500/30 text-amber-500 shadow-xl">
                        <Crown size={14} className="fill-current animate-pulse" />
                        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Premium</span>
                      </div>
                    ) : (
                      <Link
                        href="/premium"
                        className="relative flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xl hover:shadow-amber-500/20 transition-all active:scale-95"
                      >
                        <Sparkles size={14} className="text-white fill-current" />
                        <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest italic">Yükselt</span>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className="hidden sm:block text-[11px] font-black tracking-widest text-slate-400 hover:text-white transition-colors uppercase"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/auth/register"
                    className="relative px-6 py-2.5 rounded-xl bg-white text-black text-[11px] font-black uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}

              {/* MODERN HAMBURGER */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="group relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="space-y-1.5">
                  <span className="block w-5 h-[2px] bg-white rounded-full group-hover:w-3 transition-all"></span>
                  <span className="block w-3 h-[2px] bg-indigo-500 rounded-full group-hover:w-5 transition-all"></span>
                  <span className="block w-5 h-[2px] bg-white rounded-full group-hover:w-4 transition-all"></span>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <HamburgerMenu isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

function Stat({ value, icon, href }: any) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
    >
      <div className="p-1 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[12px] font-bold text-slate-200 tracking-tight">{value}</span>
      <Plus size={10} className="text-slate-500 group-hover:text-white transition-colors" />
    </Link>
  );
}
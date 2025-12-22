"use client";

import Image from "next/image";
import LinkNext from "next/link";
import { Crown, Wallet, Coins, Plus, Sparkles, Sun, Moon } from "lucide-react";
import HamburgerMenu from "./hamburgerMenu";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, isLoggedIn, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için mounted kontrolü
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading)
    return (
      <div className="fixed top-0 inset-x-0 h-20 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 animate-pulse z-50" />
    );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <nav
            className={`relative transition-all duration-500 flex items-center justify-between px-3 py-2 sm:px-6 sm:py-3 rounded-[20px] sm:rounded-[24px] border ${
              scrolled
                ? "bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* LOGO SECTION */}
            <LinkNext
              href="/"
              className="group flex items-center gap-2 sm:gap-3 outline-none shrink-0"
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-black/10 dark:border-white/10 p-0.5 bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent shadow-inner">
                <Image
                  src="/logo/logo2.jpg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="relative rounded-[7px] sm:rounded-[14px] transition-transform duration-500 group-hover:scale-110 sm:w-[38px] sm:h-[38px] object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base sm:text-xl tracking-tighter text-slate-900 dark:text-white leading-none uppercase">
                  ADS
                  <span className="text-indigo-600 dark:text-indigo-400">
                    TOWIN
                  </span>
                </span>
                <span className="hidden xs:block text-[7px] sm:text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 uppercase">
                  Premium Ecosystem
                </span>
              </div>
            </LinkNext>

            {/* RIGHT SIDE SECTION */}
            <div className="flex items-center gap-2 sm:gap-4">
           
              {isLoggedIn && user ? (
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <Stat
                    value={user.balance}
                    icon={
                      <Wallet
                        size={12}
                        className="text-indigo-500 dark:text-indigo-400"
                      />
                    }
                    href="/wallet"
                    isCurrency={true}
                  />
                  <div className="hidden md:block">
                    <Stat
                      value={user.tkripto}
                      icon={
                        <Coins
                          size={12}
                          className="text-emerald-500 dark:text-emerald-400"
                        />
                      }
                      href="/mining"
                    />
                  </div>

                  {/* PREMIUM BUTTON */}
                  <div className="relative group shrink-0">
                    {user?.membershipType === "PREMIUM" ? (
                      <div className="relative flex items-center justify-center w-9 h-9 sm:w-auto sm:px-4 sm:py-2 rounded-xl bg-white dark:bg-[#020617] border border-amber-500/30 text-amber-500 shadow-lg shadow-amber-500/5">
                        <Crown
                          size={16}
                          className="fill-current animate-pulse"
                        />
                        <span className="hidden sm:inline-block ml-2 text-[10px] font-black uppercase tracking-widest">
                          Premium
                        </span>
                      </div>
                    ) : (
                      <LinkNext
                        href="/premium"
                        className="relative flex items-center justify-center w-9 h-9 sm:w-auto sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-xl hover:shadow-amber-500/20 transition-all active:scale-90"
                      >
                        <Sparkles
                          size={16}
                          className="text-white fill-current"
                        />
                        <span className="hidden sm:inline-block ml-2 text-[10px] font-black uppercase tracking-widest italic">
                          Yükselt
                        </span>
                      </LinkNext>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LinkNext
                    href="/auth/login"
                    className="hidden xs:block text-[10px] sm:text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors uppercase px-2"
                  >
                    Giriş
                  </LinkNext>
                  <LinkNext
                    href="/auth/register"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-90"
                  >
                    Kayıt
                  </LinkNext>
                </div>
              )}

              {/* MODERN HAMBURGER */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="group relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-90"
              >
                <div className="space-y-1 sm:space-y-1.5">
                  <span className="block w-4 sm:w-5 h-[2px] bg-slate-800 dark:bg-white rounded-full group-hover:w-3 transition-all"></span>
                  <span className="block w-2 sm:w-3 h-[2px] bg-indigo-500 rounded-full group-hover:w-5 transition-all"></span>
                  <span className="block w-4 sm:w-5 h-[2px] bg-slate-800 dark:bg-white rounded-full group-hover:w-4 transition-all"></span>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

function Stat({ value, icon, href, isCurrency = false }: any) {
  return (
    <LinkNext
      href={href}
      className="group flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.1] hover:border-indigo-200 dark:hover:border-white/20 transition-all"
    >
      <div className="shrink-0">{icon}</div>
      <span className="text-[10px] sm:text-[12px] font-bold text-slate-700 dark:text-slate-200 tracking-tighter sm:tracking-tight whitespace-nowrap">
        {isCurrency ? `$${value}` : value}
      </span>
      <Plus
        size={8}
        className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors hidden xs:block"
      />
    </LinkNext>
  );
}

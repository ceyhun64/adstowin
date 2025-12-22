"use client";

import React, { useState, useEffect } from "react";
import LinkNext from "next/link";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ShieldCheck,
  Globe,
  Twitter,
  Instagram,
  Send,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="relative bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 pt-24 pb-12 overflow-hidden transition-colors duration-500">
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Kareli Grid Deseni */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                : "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradyan Işıltılar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/5 dark:bg-indigo-600/5 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Bölüm 1: Marka & Vizyon */}
          <div className="lg:col-span-4 space-y-8">
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

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Dijital etkileşimi yüksek performanslı varlıklara dönüştüren
              premium ekosistem. Geleceğin reklamcılık standartlarını bugünden
              inşa ediyoruz.
            </p>

            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Send, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 hover:border-indigo-200 dark:hover:border-white/20 transition-all duration-300 group shadow-sm dark:shadow-none"
                >
                  <social.Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bölüm 2: Kurumsal */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-[11px] uppercase tracking-[0.3em] opacity-50 dark:opacity-50">
              Kurumsal
            </h4>
            <ul className="space-y-4">
              {[
                "Hakkımızda",
                "Kullanım Koşulları",
                "Gizlilik Politikası",
                "KVKK",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors flex items-center gap-2 group font-light"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bölüm 3: Ekosistem */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-[11px] uppercase tracking-[0.3em] opacity-50">
              Ekosistem
            </h4>
            <ul className="space-y-4">
              {[
                "Anti-Cheat",
                "Reklam Veren",
                "Yayıncı Paneli",
                "Whitepaper",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors flex items-center gap-2 group font-light"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bölüm 4: Roadmap & Destek */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative p-6 rounded-[24px] bg-slate-50 dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-transparent border border-slate-200 dark:border-white/5 overflow-hidden group shadow-inner dark:shadow-none">
              <div className="absolute top-0 right-0 p-3">
                <Zap
                  size={20}
                  className="text-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors duration-700"
                />
              </div>

              <span className="text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] block mb-4">
                Global Vizyon 2027
              </span>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-slate-900 text-lg font-bold tracking-tight">
                    TKRİPTO{" "}
                    <span className="text-slate-400 dark:text-slate-500 font-light">
                      Listing
                    </span>
                  </p>
                  <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs">
                    07/07/2027
                  </span>
                </div>

                <div className="relative w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "35%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-emerald-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={14}
                      className="text-emerald-600 dark:text-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter italic">
                      Verified Protocol
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-2">
              <Mail size={16} className="text-slate-400 dark:text-slate-600" />
              <span className="text-sm text-slate-600 dark:text-slate-400 font-light">
                support@adstowin.com
              </span>
            </div>
          </div>
        </div>

        {/* Alt Bilgi Barı */}
        <div className="pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-slate-500 dark:text-slate-600 text-[11px] font-medium tracking-wide">
              © {currentYear}{" "}
              <span className="text-slate-900 dark:text-white">
                ADS TOWIN GLOBAL
              </span>
              . All Rights Reserved.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-200 dark:hover:bg-white/5 transition-colors">
              <Globe size={12} />
              Region: Global (TR/EN)
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-40 dark:opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <span className="text-[10px] text-slate-900 dark:text-white font-black tracking-[0.2em] uppercase">
              PCI-DSS Compliant
            </span>
            <span className="text-[10px] text-slate-900 dark:text-white font-black tracking-[0.2em] uppercase">
              Secure Assets
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

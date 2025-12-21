"use client";
import React from "react";
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* --- LÜKS ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Kareli Grid Deseni */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradyan Işıltılar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-600/5 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Bölüm 1: Marka & Vizyon (Lg: 4 Sütun) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <Image
                  src="/logo/logotrans.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                ADS
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 not-italic">
                  TOWIN
                </span>
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-light">
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
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <social.Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bölüm 2: Hızlı Linkler (Lg: 2 Sütun) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 text-[11px] uppercase tracking-[0.3em] opacity-50">
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
                    className="text-slate-500 hover:text-indigo-400 text-sm transition-colors flex items-center gap-2 group font-light"
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

          {/* Bölüm 3: Ekosistem (Lg: 2 Sütun) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 text-[11px] uppercase tracking-[0.3em] opacity-50">
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
                    className="text-slate-500 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2 group font-light"
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

          {/* Bölüm 4: Roadmap & Destek (Lg: 4 Sütun) - LÜKS KART */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative p-6 rounded-[24px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                <Zap
                  size={20}
                  className="text-indigo-500/20 group-hover:text-indigo-500 transition-colors duration-700"
                />
              </div>

              <span className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] block mb-4">
                Global Vizyon 2027
              </span>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-white text-lg font-bold tracking-tight">
                    TKRİPTO{" "}
                    <span className="text-slate-500 font-light">Listing</span>
                  </p>
                  <span className="text-emerald-500 font-mono text-xs">
                    07/07/2027
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "35%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-emerald-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter italic">
                      Verified Protocol
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-2">
              <Mail size={16} className="text-slate-600" />
              <span className="text-sm text-slate-400 font-light">
                support@adstowin.com
              </span>
            </div>
          </div>
        </div>

        {/* Alt Bilgi Barı */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-slate-600 text-[11px] font-medium tracking-wide">
              © {currentYear}{" "}
              <span className="text-white">ADS TOWIN GLOBAL</span>. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-colors">
              <Globe size={12} />
              Region: Global (TR/EN)
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <span className="text-[10px] text-white font-black tracking-[0.2em] uppercase">
              PCI-DSS Compliant
            </span>
            <span className="text-[10px] text-white font-black tracking-[0.2em] uppercase">
              Secure Assets
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

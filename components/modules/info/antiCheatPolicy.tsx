"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Ban,
  AlertTriangle,
  Zap,
  Eye,
  Target,
  Home,
  ChevronRight,
  ShieldCheck,
  Flag,
  Fingerprint,
  Cpu,
  Lock,
  ArrowUpRight,
} from "lucide-react";

const HileKarsitiPolitika = () => {
  const prohibitedActions = [
    {
      title: "Otomasyon & Script",
      icon: Cpu,
      severity: "KRİTİK",
      description:
        "Sistemin doğal dengesini bozacak bot, macro veya yapay script kullanımı kesinlikle yasaktır.",
      penalty: "Varlıkların Tasfiyesi & Kalıcı Yasaklama",
      examples: ["İzleme Botları", "Clickerlar", "Headless Browser"],
    },
    {
      title: "VPN & Anonimlik",
      icon: Lock,
      severity: "YÜKSEK",
      description:
        "IP maskeleme, Proxy veya VPN servisleri üzerinden coğrafi konum manipülasyonu kabul edilemez.",
      penalty: "Erişim Kısıtlaması & Doğrulama Talebi",
      examples: ["Residential Proxy", "Ücretli VPN", "Tor Network"],
    },
    {
      title: "Multi-Identity",
      icon: Fingerprint,
      severity: "YÜKSEK",
      description:
        "Tek bir bireyin birden fazla kimlikle ödül havuzunu manipüle etmesi sistem bütünlüğüne aykırıdır.",
      penalty: "İlişkili Tüm Hesapların İptali",
      examples: ["Sahte E-posta", "Referans Avcılığı", "Bot Hesaplar"],
    },
    {
      title: "Sistem İstismarı",
      icon: Zap,
      severity: "YÜKSEK",
      description:
        "Yazılımsal açıkların (Bug) bildirilmek yerine haksız kazanç kapısı olarak kullanılması ağır suçtur.",
      penalty: "Geri Alım & Hukuki Takip",
      examples: ["API Reverse Engineering", "Timer Exploits", "Data Injection"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-500/30 pt-32 pb-20">
      {/* 🛑 High-Security Header */}
      <section className="relative px-6 mb-24 overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-red-600/5 to-transparent -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-12 italic"
          >
            <Link
              href="/"
              className="hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Home size={12} /> System
            </Link>
            <ChevronRight size={10} />
            <span className="text-red-600">Anti-Fraud Protocol</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <ShieldCheck size={12} className="text-red-500" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500">
                  Zero Tolerance Policy
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter italic uppercase italic mb-8">
                Adalet <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-red-900">
                  Zırhımızdır.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
                ADSTOWIN ekosistemi, dürüst kullanıcıların ve prestijli reklam
                verenlerin haklarını korumak için askeri düzeyde güvenlik
                algoritmalarıyla donatılmıştır.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-4 hidden lg:flex justify-end"
            >
              <div className="w-48 h-48 rounded-[3rem] bg-red-600/5 border border-red-500/20 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl">
                <div className="text-4xl font-black text-red-500 mb-2">
                  24/7
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-tight">
                  Gözlem & <br /> Otonom Koruma
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚫 Protocol Violations Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
          {prohibitedActions.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <item.icon size={120} />
              </div>

              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <span className="text-[9px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full border border-red-500/20 text-red-500 uppercase">
                  {item.severity}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase italic mb-4">
                {item.title}
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed mb-8 max-w-sm italic">
                {item.description}
              </p>

              <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-3 py-1 rounded-md bg-white/5 text-slate-500 border border-white/5 uppercase tracking-tighter"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-red-500 text-[11px] font-black uppercase tracking-widest">
                  <Ban size={14} /> {item.penalty}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🕵️ Detection Intelligence Section */}
      <section className="px-6 py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-red-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              Intelligence Units
            </span>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              Nasıl Tespit <br /> Ediyoruz?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  t: "Neural Patterns",
                  d: "Yapay zeka tabanlı davranış analizi.",
                  i: Target,
                },
                {
                  t: "IP Integrity",
                  d: "Ağ katmanlı sahtecilik kontrolü.",
                  i: ShieldAlert,
                },
                {
                  t: "Hardware ID",
                  d: "Cihaz bazlı parmak izi takibi.",
                  i: Zap,
                },
                { t: "Manual Audit", d: "Uzman güvenlik operasyonu.", i: Eye },
              ].map((m, i) => (
                <div
                  key={i}
                  className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-red-500/30 transition-all"
                >
                  <m.i
                    className="text-red-500 mb-4 group-hover:scale-110 transition-transform"
                    size={24}
                  />
                  <div className="font-black text-xs uppercase tracking-widest mb-1">
                    {m.t}
                  </div>
                  <div className="text-xs text-slate-500 font-light">{m.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-red-600/20 blur-[120px] rounded-full group-hover:bg-red-600/30 transition-all" />
            <div className="relative p-12 bg-red-600 rounded-[4rem] shadow-2xl shadow-red-600/20 overflow-hidden">
              <ShieldAlert
                size={200}
                className="absolute -right-20 -bottom-20 text-white/10 rotate-12"
              />
              <h3 className="text-3xl font-black uppercase italic mb-6">
                İtiraz Hakkı
              </h3>
              <p className="text-white/80 leading-relaxed font-light mb-10 italic">
                Dürüst bir hataya inanıyorsanız, profesyonel bir savunma ile
                itiraz hakkınızı kullanabilirsiniz. Kanıtlar incelenir ve 48
                saat içinde nihai karar verilir.
              </p>
              <button className="w-full py-6 bg-white text-red-600 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2">
                Savunma Talebi Başlat <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Manifesto CTA */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <Flag className="w-16 h-16 text-red-600 mx-auto" />
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Dürüstlük, <br /> En Değerli Portföydür.
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
            ADSTOWIN, hile yaparak elde edilen kazançları hiçbir zaman tanımaz.
            Dijital ekosistemimizi temiz tutmak, tüm dürüst üyelerimizin ortak
            menfaatidir.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 pt-8 border-t border-white/5">
            <Link
              href="/terms"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors"
            >
              Security Protocols
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HileKarsitiPolitika;

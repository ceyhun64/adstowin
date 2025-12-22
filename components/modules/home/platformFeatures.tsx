"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Star,
  Gift,
  Users,
  Crown,
  ChevronRight,
  Zap,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function PlatformFeatures() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: Play,
      label: "Akıllı Yayın",
      desc: "Premium içerik algoritması ile yüksek etkileşimli reklamlar.",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-500/10 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Star,
      label: "Şans Çarkı",
      desc: "Saatlik dinamik jackpot ve garantili TKRİPTO çekilişleri.",
      color: "from-amber-400 to-orange-600",
      bgLight: "bg-amber-500/10 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Gift,
      label: "Gelişim",
      desc: "Değer odaklı görevlerle günlük pasif gelir limitlerini aşın.",
      color: "from-emerald-400 to-teal-600",
      bgLight: "bg-emerald-500/10 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Users,
      label: "Global Hub",
      desc: "Real-time topluluk ağı ve canlı WebSocket sohbet deneyimi.",
      color: "from-indigo-400 to-purple-600",
      bgLight: "bg-indigo-500/10 dark:bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Crown,
      label: "VIP Seviye",
      desc: "Özel ekosistem erişimi, 2 kat kazanç ve reklam kaldırma gücü.",
      color: "from-fuchsia-500 to-pink-600",
      bgLight: "bg-fuchsia-500/10 dark:bg-fuchsia-500/10",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#020617] py-32 relative overflow-hidden transition-colors duration-500">
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-[120px]" />

        {/* Kareli Grid Deseni */}
        <div
          className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                : "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-[#020617] dark:via-transparent dark:to-[#020617]" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ÜST BAŞLIK */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm"
          >
            <Zap size={14} className="text-amber-500 fill-amber-500/20" />
            <span className="text-slate-500 dark:text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">
              Platform Kabiliyetleri
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter"
          >
            Dijital Varlıklarınızı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400 font-light">
              Yeniden Tanımlayın
            </span>
          </motion.h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
            ADS <span className="text-slate-900 dark:text-white font-semibold">TOWIN</span> hibrit altyapısı, geleneksel reklamcılığı{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">blockchain vizyonuyla</span> birleştirir.
          </p>
        </div>

        {/* ÖZELLİKLER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-[32px]`}
                />

                <div className="relative h-full p-8 rounded-[32px] bg-white dark:bg-white/[0.02] hover:bg-slate-100/50 dark:hover:bg-white/[0.04] backdrop-blur-3xl border border-slate-200 dark:border-white/5 group-hover:border-indigo-500/30 dark:group-hover:border-white/20 overflow-hidden transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left shadow-sm dark:shadow-none">
                  {/* İkon Kutusu */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-8 border border-slate-100 dark:border-white/5 relative group-hover:scale-110 transition-transform duration-500 shadow-sm`}
                  >
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-sm rounded-2xl`} />
                  </div>

                  {/* Metin İçeriği */}
                  <div className="space-y-4">
                    <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight flex items-center gap-2 justify-center md:justify-start">
                      {feature.label}
                      <ChevronRight
                        size={16}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400 dark:text-white/50"
                      />
                    </h4>
                    <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed font-medium group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {feature.desc}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-700`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ALT GÜVEN PANELİ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-8"
        >
          <div className="flex gap-10">
            {[
              { label: "Uptime", value: "%99.9", icon: Cpu, color: "text-emerald-500" },
              { label: "Security", value: "AES-256", icon: ShieldCheck, color: "text-blue-500" },
              { label: "Network", value: "WebSocket", icon: Zap, color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <stat.icon size={12} className={stat.color} />
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                <span className="text-slate-900 dark:text-white font-bold text-sm tracking-tighter">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>Verified Ecosystem</span>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-800" />
            <span>2024-2027 Roadmap</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
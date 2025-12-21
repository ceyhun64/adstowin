"use client";
import React from "react";
import {
  Play,
  Star,
  Gift,
  Users,
  Crown,
  ChevronRight,
  Hexagon,
  Zap,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PlatformFeatures() {
  const features = [
    {
      icon: Play,
      label: "Akıllı Yayın",
      desc: "Premium içerik algoritması ile yüksek etkileşimli reklamlar.",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-500/10",
    },
    {
      icon: Star,
      label: "Şans Çarkı",
      desc: "Saatlik dinamik jackpot ve garantili TKRİPTO çekilişleri.",
      color: "from-amber-400 to-orange-600",
      bgLight: "bg-amber-500/10",
    },
    {
      icon: Gift,
      label: "Gelişim",
      desc: "Değer odaklı görevlerle günlük pasif gelir limitlerini aşın.",
      color: "from-emerald-400 to-teal-600",
      bgLight: "bg-emerald-500/10",
    },
    {
      icon: Users,
      label: "Global Hub",
      desc: "Real-time topluluk ağı ve canlı WebSocket sohbet deneyimi.",
      color: "from-indigo-400 to-purple-600",
      bgLight: "bg-indigo-500/10",
    },
    {
      icon: Crown,
      label: "VIP Seviye",
      desc: "Özel ekosistem erişimi, 2 kat kazanç ve reklam kaldırma gücü.",
      color: "from-fuchsia-500 to-pink-600",
      bgLight: "bg-fuchsia-500/10",
    },
  ];

  return (
    <div className="w-full bg-[#020617] py-32 relative overflow-hidden">
      {/* --- LÜKS ARKA PLAN EFEKTLERİ (KARELİ GRID) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ana Parlamalar */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />

        {/* İstediğiniz Kareli Grid Deseni */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Maske: Grid'in kenarlara doğru sönümlenmesini sağlar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ÜST BAŞLIK */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
          >
            <Zap size={14} className="text-amber-400 fill-amber-400/20" />
            <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">
              Platform Kabiliyetleri
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Dijital Varlıklarınızı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 italic font-light">
              Yeniden Tanımlayın
            </span>
          </motion.h2>

          <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
            ADS <span className="text-white font-semibold">TOWIN</span> hibrit
            altyapısı, geleneksel reklamcılığı{" "}
            <span className="text-indigo-400">blockchain vizyonuyla</span>{" "}
            birleştirerek size sürdürülebilir bir kazanç kapısı açar.
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
                {/* Kart Glow Efekti */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-[32px]`}
                />

                <div className="relative h-full p-8 rounded-[32px] bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-3xl border border-white/5 group-hover:border-white/20 overflow-hidden transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left">
                  {/* İkon Kutusu */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-8 border border-white/5 relative group-hover:scale-110 transition-transform duration-500 shadow-xl`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    {/* İkonun altındaki ufak parlama */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-sm rounded-2xl`}
                    />
                  </div>

                  {/* Metin İçeriği */}
                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-xl tracking-tight flex items-center gap-2 justify-center md:justify-start">
                      {feature.label}
                      <ChevronRight
                        size={16}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/50"
                      />
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Dekoratif Alt Çizgi */}
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
          className="mt-24 pt-10 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-8"
        >
          <div className="flex gap-10">
            {[
              {
                label: "Uptime",
                value: "%99.9",
                icon: Cpu,
                color: "text-emerald-500",
              },
              {
                label: "Security",
                value: "AES-256",
                icon: ShieldCheck,
                color: "text-blue-500",
              },
              {
                label: "Network",
                value: "WebSocket",
                icon: Zap,
                color: "text-amber-500",
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <stat.icon size={12} className={stat.color} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                <span className="text-white font-bold text-sm tracking-tighter">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>Verified Ecosystem</span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <span>2024-2027 Roadmap</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

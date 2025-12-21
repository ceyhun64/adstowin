"use client";
import React from "react";
import { Play, Star, Gift, Users, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PlatformFeatures() {
  const features = [
    {
      icon: Play,
      label: "Smart Stream",
      desc: "Standard & Premium Content",
      iconColor: "text-blue-600 dark:text-blue-400",
      glowColor:
        "group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/30",
      accent: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "hover:border-blue-200 dark:hover:border-blue-500/30",
      hoverBg: "hover:bg-blue-50/50 dark:hover:bg-blue-500/5",
    },
    {
      icon: Star,
      label: "Spin Wheel",
      desc: "Daily Dynamic Rewards",
      iconColor: "text-amber-600 dark:text-amber-400",
      glowColor:
        "group-hover:shadow-amber-500/20 dark:group-hover:shadow-amber-500/30",
      accent: "bg-amber-50 dark:bg-amber-500/10",
      borderColor: "hover:border-amber-200 dark:hover:border-amber-500/30",
      hoverBg: "hover:bg-amber-50/50 dark:hover:bg-amber-500/5",
    },
    {
      icon: Gift,
      label: "Growth Tasks",
      desc: "Value-Driven Objectives",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      glowColor:
        "group-hover:shadow-emerald-500/20 dark:group-hover:shadow-emerald-500/30",
      accent: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "hover:border-emerald-200 dark:hover:border-emerald-500/30",
      hoverBg: "hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5",
    },
    {
      icon: Users,
      label: "Global Hub",
      desc: "Real-time Community",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      glowColor:
        "group-hover:shadow-indigo-500/20 dark:group-hover:shadow-indigo-500/30",
      accent: "bg-indigo-50 dark:bg-indigo-500/10",
      borderColor: "hover:border-indigo-200 dark:hover:border-indigo-500/30",
      hoverBg: "hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5",
    },
    {
      icon: Crown,
      label: "VIP Tier",
      desc: "Exclusive Ecosystem Access",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
      glowColor:
        "group-hover:shadow-fuchsia-500/20 dark:group-hover:shadow-fuchsia-500/30",
      accent: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
      borderColor: "hover:border-fuchsia-200 dark:hover:border-fuchsia-500/30",
      hoverBg: "hover:bg-fuchsia-50/50 dark:hover:bg-fuchsia-500/5",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-24 relative overflow-hidden">
      {/* Arka Plan Dekorasyonları */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sol üst ışık */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px]" />

        {/* Sağ alt ışık */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-6">
        {/* BAŞLIK ALANI */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse" />
            Platform Ecosystem
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Smarter{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500">
              Interaction
            </span>{" "}
            Hub
          </motion.h3>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
            Çok yönlü dijital ekosistemimiz, her etkileşimi değerli bir veriye
            ve ödüle dönüştürmek için tasarlandı.
          </p>
        </div>

        {/* ÖZELLİKLER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`group relative p-8 rounded-3xl 
                  bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm
                  border border-slate-200 dark:border-white/10 
                  ${feature.borderColor}
                  ${feature.hoverBg}
                  transition-all duration-500 hover:-translate-y-2 
                  shadow-sm hover:shadow-2xl ${feature.glowColor}
                  cursor-pointer`}
              >
                {/* İKON KUTUSU */}
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.accent} 
                  border border-slate-100 dark:border-white/5 
                  flex items-center justify-center mb-6 
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  shadow-sm`}
                >
                  <IconComponent className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                {/* METİN İÇERİĞİ */}
                <div className="space-y-2">
                  <h4 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                    {feature.label}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {feature.desc}
                  </p>
                </div>

                {/* HOVER ARROW (Yeni) */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>

                {/* KÖŞE DETAYI */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${feature.iconColor} blur-[1px] animate-pulse`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ALT TRUST BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-8 text-slate-500 dark:text-slate-600 font-semibold text-xs"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

"use client";
import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  CheckCircle2,
  MousePointer2,
  Sparkles,
  BarChart3,
  Globe,
  TrendingUp,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserTypeCards() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* --- ARKA PLAN KATMANLARI --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Işık Süzmeleri (Glow Effects) */}
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/15 rounded-full blur-[120px] animate-pulse" />

        {/* Modern Noktalı Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] text-slate-500 dark:text-slate-400"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Yumuşak Geçiş Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/30 dark:to-slate-950/30" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        {/* Üst Logo ve Başlık */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-[0.3em] shadow-sm">
            <Globe
              size={14}
              className="text-indigo-600 dark:text-indigo-500 animate-pulse"
            />
            Next-Gen Digital Interaction Network
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            ADS
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 font-light italic">
              TOWIN
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            İki farklı ekosistem, tek platform. Markanızı büyütün veya dijital
            etkileşimlerinizden kazanç elde edin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* --- SOL TARAF: ADVERTISERS (Brands) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col justify-between p-10 md:p-12 rounded-[2.5rem] bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm border-2 border-slate-200 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/30 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            {/* Arka plan gradient efekti */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent dark:from-indigo-500/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-indigo-500/10">
                  <Target size={32} />
                </div>
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/20">
                  B2B Solution
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Growth For <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400 italic">
                    Brands.
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-md text-base">
                  Connect your brand with real and verified audiences. Manage
                  your budget efficiently with transparent analytics and
                  anti-bot protection.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, text: "Targeted Traffic" },
                  { icon: ShieldCheck, text: "Zero Bot Policy" },
                  { icon: Zap, text: "API Integration" },
                  { icon: BarChart3, text: "Real-time Stats" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold group/item hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <item.icon
                      size={16}
                      className="text-indigo-600 dark:text-indigo-500"
                    />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <button className="relative mt-12 flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 active:scale-95 group/btn overflow-hidden">
              <span className="relative z-10">Launch Campaign</span>
              <BarChart3
                className="relative z-10 group-hover/btn:rotate-12 transition-transform"
                size={18}
              />

              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>

            {/* Köşe süsü */}
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-indigo-500/10 dark:border-indigo-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* --- SAĞ TARAF: PUBLISHERS (Users) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative flex flex-col justify-between p-10 md:p-12 rounded-[2.5rem] bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-emerald-500/5 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1"
          >
            {/* Arka plan gradient efekti */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent dark:from-emerald-500/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-emerald-500/10">
                  <MousePointer2 size={32} />
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20">
                  Community Ecosystem
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Value For <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 italic">
                    Users.
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-md text-base">
                  Add value to digital interaction. Discover new brands,
                  complete tasks, and earn points by contributing to the growth
                  of the ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle2, text: "Verified Earnings" },
                  { icon: Sparkles, text: "Daily Challenges" },
                  { icon: Zap, text: "Instant Access" },
                  { icon: Award, text: "VIP Tiers" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold group/item hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <item.icon
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <button className="relative mt-12 flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 active:scale-95 group/btn overflow-hidden">
              <span className="relative z-10">Start Exploring</span>
              <ArrowRight
                className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                size={18}
              />

              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>

            {/* Köşe süsü */}
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-emerald-500/10 dark:border-emerald-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        {/* --- ALT TRUST BAR --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-12 text-slate-500 dark:text-slate-600 font-semibold uppercase tracking-[0.2em] text-[10px]"
        >
          <div className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
            <ShieldCheck
              size={14}
              className="text-indigo-600 dark:text-indigo-500"
            />
            Secured by SSL
          </div>
          <div className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
            <Zap size={14} className="text-amber-500" />
            Low Latency
          </div>
          <div className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
            <Sparkles size={14} className="text-blue-500" />
            AI-Powered Anti-Bot
          </div>
        </motion.div>
      </div>
    </div>
  );
}

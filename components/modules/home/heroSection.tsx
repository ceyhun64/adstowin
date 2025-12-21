"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle2,
  MousePointer2,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroesProps {
  onScrollToForm: () => void;
}

export default function Heroes({ onScrollToForm }: HeroesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* --- DİNAMİK ARKA PLAN --- */}
      <div className="absolute inset-0 z-0">
        {/* Işık Süzmeleri (Light modda daha yumuşak, Dark modda daha belirgin) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />

        {/* Modern Noktalı Grid */}
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(currentColor 0.5px, transparent 0.5px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* --- SOL TARAF: GÖRSEL ALAN --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:order-2"
        >
          {/* Logo Çerçevesi */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Arka Dekoratif Kare */}
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-[40px] rotate-6 animate-pulse" />

            {/* Ana Logo Kartı - Glassmorphism Geliştirildi */}
            <div className="absolute inset-0 bg-white/60 dark:bg-white/5 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 rounded-[40px] -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 flex items-center justify-center p-12 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20">
              <Image
                src="/logo/logotrans.png"
                alt="ADSTOWIN"
                width={300}
                height={300}
                className="object-contain drop-shadow-2xl brightness-100 dark:brightness-110 transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>

            {/* Yüzen Küçük Kartlar - Geliştirilmiş */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 p-4 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200/50 dark:border-white/20 rounded-2xl shadow-xl shadow-yellow-500/10 dark:shadow-yellow-500/20"
            >
              <Zap className="w-6 h-6 text-yellow-500 drop-shadow-lg" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-4 -left-8 p-4 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200/50 dark:border-white/20 rounded-2xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/20"
            >
              <ShieldCheck className="w-6 h-6 text-emerald-500 drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* --- SAĞ TARAF: METİN ALANI --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:order-1"
        >
          {/* Badge - Geliştirilmiş */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles size={14} className="animate-pulse" />
            The Future of Digital Interaction
          </div>

          {/* Headline - Geliştirilmiş Typography */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9]">
              ADS
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400 font-light italic">
                TOWIN
              </span>
              <br />
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                REVOLUTION.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
              Strengthen your digital presence with our technology-driven reward
              system.
              <span className="text-slate-900 dark:text-white font-semibold block sm:inline">
                {" "}
                Secure, fast, and fully transparent.
              </span>
            </p>
          </div>

          {/* CTA Group - Geliştirilmiş */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onScrollToForm}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold text-lg rounded-2xl transition-all border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 w-full sm:w-auto shadow-sm hover:shadow-md">
              Explore System
            </button>
          </div>

          {/* Trust Marks - Geliştirilmiş */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/50 dark:border-white/5 w-full">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <CheckCircle2
                size={16}
                className="text-indigo-600 dark:text-indigo-500"
              />
              <span className="font-medium">Zero Commission</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <Layers
                size={16}
                className="text-indigo-600 dark:text-indigo-500"
              />
              <span className="font-medium">Multi-Platform</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <MousePointer2
                size={16}
                className="text-indigo-600 dark:text-indigo-500"
              />
              <span className="font-medium">Instant Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

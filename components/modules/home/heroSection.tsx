import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Wallet,
  Clock,
  CircleDollarSign,
  MonitorPlay,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroesProps {
  onScrollToForm: () => void;
  onLearnMore?: () => void;
}

const EARNINGS_DISPLAY = "+$2.40";
const DAILY_EARNINGS = "$48.50";
const REMAINING_ADS = "12";

export default function Heroes({ onScrollToForm, onLearnMore }: HeroesProps) {
  const [mounted, setMounted] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Smooth floating animation
    const interval = setInterval(() => {
      setFloatOffset((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const floatY = Math.sin(floatOffset * 0.05) * 20;
  const floatX = Math.sin(floatOffset * 0.03) * 15;

  return (
    <div className="relative min-h-screen flex items-center justify-center py-25 overflow-hidden  bg-[#020617]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out",
        }}
      >
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:order-1">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles
              size={14}
              className="text-indigo-400"
              aria-hidden="true"
            />
            Yeni Nesil Pasif Gelir Sistemi
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
              İzle, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
                Değer Kat,
              </span>{" "}
              <br />
              Kazan.
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-light max-w-lg leading-relaxed">
              Vaktinizi nakde dönüştüren en prestijli platform. Reklam
              dünyasının parçası olun,
              <span className="text-white font-medium">
                {" "}
                her saniyenizi ödüle dönüştürün.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <button
              onClick={onScrollToForm}
              className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-950 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:bg-indigo-50 w-full sm:w-auto overflow-hidden shadow-lg hover:shadow-xl"
              aria-label="Hemen kazanmaya başlayın"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-2">
                Hemen Kazanmaya Başla
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </span>
            </button>

            <button
              onClick={onLearnMore}
              className="flex items-center justify-center gap-2 px-10 py-5 bg-transparent text-white font-semibold text-lg rounded-full border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all w-full sm:w-auto"
              aria-label="Sistemi inceleyin"
            >
              Sistemi İncele
            </button>
          </div>

          {/* Trust Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/5 w-full">
            <div className="flex flex-col gap-2 items-center lg:items-start transition-transform hover:scale-105">
              <Wallet className="text-indigo-400 w-5 h-5" aria-hidden="true" />
              <span className="text-white text-sm font-semibold text-center lg:text-left">
                Anında Çekim
              </span>
              <p className="text-slate-400 text-xs text-center lg:text-left font-light">
                Kazancını anında cüzdanına aktar.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center lg:items-start transition-transform hover:scale-105">
              <MonitorPlay
                className="text-blue-400 w-5 h-5"
                aria-hidden="true"
              />
              <span className="text-white text-sm font-semibold text-center lg:text-left">
                Yüksek Oranlar
              </span>
              <p className="text-slate-400 text-xs text-center lg:text-left font-light">
                Sektörün en yüksek izleme başı ücreti.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center lg:items-start transition-transform hover:scale-105">
              <Clock className="text-emerald-400 w-5 h-5" aria-hidden="true" />
              <span className="text-white text-sm font-semibold text-center lg:text-left">
                7/24 Erişim
              </span>
              <p className="text-slate-400 text-xs text-center lg:text-left font-light">
                Dilediğin zaman, dilediğin yerden izle.
              </p>
            </div>
          </div>
        </div>
        {/* Interactive Ad Visualization */}
        <div className="relative lg:order-2">
          <div className="relative group">
            {/* Arkadaki Çok Katmanlı Parlama Efekti */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-emerald-500/30 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

            <div className="relative bg-[#020617]/90 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-white/20">
              {/* ANA VİDEO VE REKLAM MERKEZİ */}
              <div className="aspect-video relative flex items-center justify-center overflow-hidden bg-[#020617]">
                {/* Hareketli Arka Plan: Para ve Video İkonları Akışı */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Yüzen Para İkonları (Dinamik) */}
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 text-emerald-500/40"
                >
                  <CircleDollarSign size={40} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 25, 0], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-12 right-20 text-indigo-500/40"
                >
                  <MonitorPlay size={32} />
                </motion.div>

                {/* MERKEZİ OYNATMA ALANI */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative group/play cursor-pointer">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20 group-hover/play:opacity-50 transition-opacity" />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative bg-white/5 backdrop-blur-md border border-white/20 p-6 rounded-full shadow-2xl"
                    >
                      <PlayCircle
                        className="w-16 h-16 text-white"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                  <p className="mt-4 text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                    Reklamı Başlat
                  </p>
                </div>

                {/* SAĞ ÜST: CANLI KAZANÇ BALONU */}
                <motion.div
                  style={{ y: floatY }}
                  className="absolute top-6 right-6 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 px-4 py-2.5 rounded-2xl flex flex-col items-end shadow-2xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-emerald-400 font-bold text-sm tracking-tight">
                      CANLI AKIŞ
                    </span>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium mt-1">
                    +{EARNINGS_DISPLAY} / Saniye
                  </span>
                </motion.div>

                {/* ALT: İLERLEME ÇUBUĞU (VİDEO PLAYER STİLİ) */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-white/50">
                      00:42
                    </span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white/50">
                      01:00
                    </span>
                  </div>
                </div>
              </div>

              {/* ALT PANEL: İSTATİSTİKLER */}
              <div className="p-8 grid grid-cols-3 gap-6 bg-white/[0.02] backdrop-blur-3xl border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Günlük Kota
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-white font-light">
                      Limitsiz
                    </span>
                    <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[8px] text-emerald-500 font-bold uppercase">
                        Açık
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-x border-white/10 px-6">
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Başlangıç
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-indigo-400 font-mono font-bold">
                      +$5.00
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 italic">
                    Bonus Aktif
                  </span>
                </div>

                <div className="flex flex-col gap-1 items-end lg:items-center">
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold text-right">
                    Üyelik Statüsü
                  </span>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-yellow-500" />
                    <span className="text-white font-bold tracking-widest uppercase">
                      Premium
                    </span>
                  </div>
                  <span className="text-[9px] text-indigo-400 font-medium">
                    VIP Yükseltilebilir
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* YÜZEN DEKORATİF ELEMENTLER */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-12 -right-6 p-4 bg-indigo-500/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hidden md:block"
          >
            <Zap className="text-indigo-400 w-6 h-6 fill-indigo-400/20" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-8 -left-12 p-4 bg-emerald-500/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hidden md:block"
          >
            <Wallet className="text-emerald-400 w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

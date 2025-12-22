"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Wallet,
  Clock,
  CircleDollarSign,
  MonitorPlay,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";

interface HeroesProps {
  onScrollToForm?: () => void;
  onLearnMore?: () => void;
}

const EARNINGS_DISPLAY = "+$2.40";

export default function Heroes({ onScrollToForm, onLearnMore }: HeroesProps) {
  const [mounted, setMounted] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const floatInterval = setInterval(() => {
      setFloatOffset((prev) => (prev + 1) % 360);
    }, 50);

    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => (prev >= 65 ? 0 : prev + 0.65));
    }, 100);

    return () => {
      clearInterval(floatInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const floatY = Math.sin(floatOffset * 0.05) * 20;

  if (!mounted) return <div className="min-h-screen bg-slate-50 dark:bg-[#020617]" />;

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 md:py-30 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Işık Süzmeleri (Glows) */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[120px] md:blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/20 dark:bg-blue-700/10 rounded-full blur-[120px] md:blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.1] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                : "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out",
        }}
      >
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 lg:order-1">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles size={12} className="animate-pulse" />
            Yeni Nesil Pasif Gelir Sistemi
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              İzle, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">
                Değer Kat,
              </span>{" "}
              <br />
              Kazan.
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
              Vaktinizi nakde dönüştüren en prestijli platform. Reklam
              dünyasının parçası olun,
              <span className="text-slate-900 dark:text-white font-medium">
                {" "}
                her saniyenizi ödüle dönüştürün.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 w-full sm:w-auto">
            <button
              onClick={onScrollToForm}
              className="group relative flex items-center justify-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 hover:bg-indigo-600 dark:hover:bg-indigo-50 w-full sm:w-auto overflow-hidden shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Hemen Başla
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={onLearnMore}
              className="flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-transparent text-slate-700 dark:text-white font-semibold text-base md:text-lg rounded-full border border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              Sistemi İncele
            </button>
          </div>

          {/* Trust Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-slate-200 dark:border-white/5 w-full">
            <TrustItem 
              icon={<Wallet className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />}
              title="Anında Çekim"
              desc="Kazancını anında cüzdanına aktar."
            />
            <TrustItem 
              icon={<MonitorPlay className="text-blue-600 dark:text-blue-400 w-5 h-5" />}
              title="Yüksek Oranlar"
              desc="Sektörün en yüksek izleme başı ücreti."
            />
            <TrustItem 
              icon={<Clock className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />}
              title="7/24 Erişim"
              desc="Dilediğin zaman, dilediğin yerden izle."
            />
          </div>
        </div>

        {/* Interactive Ad Visualization */}
        <div className="relative lg:order-2 w-full max-w-2xl mx-auto">
          <div className="relative group">
            {/* Parlama Efekti */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-emerald-500/30 rounded-[40px] blur-3xl opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-1000" />

            <div className="relative bg-white dark:bg-[#020617]/90 border border-slate-200 dark:border-white/10 rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-indigo-300 dark:group-hover:border-white/20">
              {/* Video Alanı */}
              <div className="aspect-video relative flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-[#020617]">
                {/* Yüzen Para İkonları */}
                <div
                  className="absolute top-6 md:top-10 left-6 md:left-10 text-emerald-600 dark:text-emerald-500/40 hidden sm:block"
                  style={{
                    transform: `translateY(${Math.sin(floatOffset * 0.05) * -20}px)`,
                    opacity: theme === "dark" ? 0.4 : 0.6,
                  }}
                >
                  <CircleDollarSign className="w-8 h-8 md:w-10 md:h-10" />
                </div>

                {/* Play Butonu */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative group/play cursor-pointer">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover/play:opacity-50 transition-opacity" />
                    <div className="relative bg-white/20 dark:bg-white/5 backdrop-blur-md border border-slate-300 dark:border-white/20 p-4 md:p-6 rounded-full shadow-2xl hover:scale-110 transition-transform">
                      <PlayCircle
                        className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 dark:text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <p className="mt-3 md:mt-4 text-slate-500 dark:text-white/60 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    Reklamı Başlat
                  </p>
                </div>

                {/* Canlı Kazanç Göstergesi */}
                <div
                  className="absolute top-3 right-3 md:top-6 md:right-6 bg-white dark:bg-[#020617]/80 backdrop-blur-xl border border-emerald-500/30 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl flex flex-col items-end shadow-xl"
                  style={{ transform: `translateY(${floatY}px)` }}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] md:text-sm tracking-tight">
                      CANLI
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-white/80 text-[8px] md:text-[10px] font-bold mt-0.5">
                    {EARNINGS_DISPLAY}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 bg-gradient-to-t from-slate-200/80 dark:from-black/80 to-transparent">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-[9px] font-mono text-slate-600 dark:text-white/50">00:42</span>
                    <div className="flex-1 h-1 bg-slate-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 dark:text-white/50">01:00</span>
                  </div>
                </div>
              </div>

              {/* İstatistikler Paneli */}
              <div className="p-4 md:p-8 grid grid-cols-3 gap-3 md:gap-6 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-3xl border-t border-slate-200 dark:border-white/5">
                <StatBox label="Günlük" val="Limitsiz" sub="Açık" />
                <StatBox label="Bonus" val="+$5.00" sub="Aktif" highlight />
                <StatBox label="Üyelik" val="Premium" sub="VIP" isBadge />
              </div>
            </div>
          </div>

          {/* Dekoratif Yan Objeler */}
          <div className="absolute -top-12 -right-6 p-4 bg-white dark:bg-indigo-500/10 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl hidden lg:block animate-bounce-slow">
            <Zap className="text-indigo-600 dark:text-indigo-400 w-6 h-6 fill-indigo-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Yardımcı Küçük Bileşenler */

function TrustItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-2 items-center lg:items-start transition-transform hover:scale-105">
      {icon}
      <span className="text-slate-900 dark:text-white text-sm font-bold text-center lg:text-left">{title}</span>
      <p className="text-slate-500 dark:text-slate-400 text-xs text-center lg:text-left font-light">{desc}</p>
    </div>
  );
}

function StatBox({ label, val, sub, highlight = false, isBadge = false }: any) {
  return (
    <div className={`flex flex-col gap-1 ${label === "Bonus" ? "border-x border-slate-200 dark:border-white/10 px-2 md:px-6" : ""}`}>
      <span className="text-slate-400 dark:text-slate-500 text-[8px] md:text-[10px] uppercase tracking-widest font-black">{label}</span>
      <span className={`text-sm md:text-xl font-bold ${highlight ? "text-indigo-600 dark:text-indigo-400 font-mono" : "text-slate-900 dark:text-white"}`}>{val}</span>
      <span className="text-[8px] md:text-[9px] text-emerald-600 dark:text-indigo-400 font-bold uppercase">{sub}</span>
    </div>
  );
}
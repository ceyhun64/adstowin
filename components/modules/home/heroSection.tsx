"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

interface HeyellowctionProps {
  onScrollToForm: () => void;
}

export default function Heroes({ onScrollToForm }: HeyellowctionProps) {
  const [registeredCount, setRegisteredCount] = useState(1247);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegisteredCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(phaseInterval);
  }, []);

  return (
    <div className="relative text-center py-16 md:py-24 overflow-hidden min-h-[90vh] flex items-start justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Spheres */}
        <div
          className="absolute top-[50%] left-[50%] w-[350px] h-[350px] 
          -translate-x-1/2 -translate-y-1/2 
          bg-gradient-to-br from-amber-400/10 to-yellow-300/10 
          rounded-full mix-blend-screen filter blur-[90px] animate-pulse-slow"
        ></div>

        {/* Grid Lines */}
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          {/* Hafif karartılmış grid yüzeyi */}
          <div className="absolute inset-0 bg-white/2"></div>

          {/* Çizgiler (biraz daha koyu) */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
        `,
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT - Logo and Features (Mobil: Üstte ortalanmış | Tablet/Desktop: Solda ortalanmış) */}
        <div className="flex flex-col items-center justify-start space-y-10 lg:order-1">
          {/* Logo */}
          <div className="relative group">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-all duration-500 hover:scale-105">
              {" "}
              {/* Boyutlar düzenlendi */}
              <Image
                src="/logo/logotrans.png"
                alt="ADSTOWIN Logo"
                width={320}
                height={320}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 max-w-sm">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5 shadow-lg hover:bg-white/10 transition-all duration-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">
                100% Secure
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5 shadow-lg hover:bg-white/10 transition-all duration-300">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">
                Fast Processing
              </span>
              {/* Değişiklik: Instant Payout -> Fast Processing */}
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5 shadow-lg hover:bg-white/10 transition-all duration-300">
              <Award className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-semibold text-white">
                Premium Experience
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT - Text and CTA (Mobil: Üstte ortalanmış | Tablet/Desktop: Sağda sola hizalı) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:order-2">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-black leading-[0.85] tracking-tight font-main">
              {" "}
              {/* font-mono -> font-main yapıldı */}
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                {/* Boyut büyütüldü */}
                WATCH
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                {" "}
                {/* Boyut büyütüldü */}
                REWARD
                {/* Değişiklik: EARN -> REWARD */}
              </span>
            </h1>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 blur-xl"></div>
              <p className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4 py-2">
                Next-Generation Digital Rewards
                {/* Değişiklik: Digital Income -> Digital Rewards */}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 font-normal max-w-lg leading-relaxed">
            {" "}
            {/* Max-width eklendi */}
            <span className="text-amber-400 font-semibold">
              Earn points simply
              {/* Değişiklik: Effortlessly earn -> Earn points simply */}
            </span>{" "}
            from your mobile device, or{" "}
            <span className="text-yellow-400 font-semibold">
              reach a real, engaging audience
            </span>{" "}
            in seconds.
          </p>

          {/* CTA Button */}
          <button
            onClick={onScrollToForm}
            className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-black text-xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            <span className="relative text-white flex items-center gap-3 z-10">
              <Sparkles className="w-6 h-6 animate-pulse" />
              Register Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Free Registration</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Fast Payouts</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

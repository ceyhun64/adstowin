"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  Sparkles,
  BarChart3,
  Globe,
  TrendingUp,
  Award,
  Crown,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function UserTypeCards() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/20 dark:bg-amber-600/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />

        {/* Dinamik Grid Yapısı */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                : "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Üst Başlık Grubu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-indigo-300 text-[10px] font-black uppercase tracking-[0.4em] shadow-sm">
            <Layers size={14} className="animate-bounce" />
            Ekosistem Seçimi
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
            Rolünüzü{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-600 dark:from-indigo-400 dark:to-amber-400">
              Belirleyin
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            ADS <span className="text-slate-900 dark:text-white font-bold tracking-widest">TOWIN</span> dünyasında iki farklı yolculuk mümkün.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* --- REKLAMVEREN KARTI --- */}
          <UserCard
            type="Advertiser"
            icon={<Target size={32} />}
            title="Marka"
            subtitle="Vizyonu"
            desc="Küresel ölçekte gerçek kullanıcılara ulaşın. %100 şeffaf reklam paneli."
            features={[
              { icon: <TrendingUp size={16} />, text: "Yüksek Dönüşüm Oranları" },
              { icon: <ShieldCheck size={16} />, text: "AI Destekli Bot Koruması" },
              { icon: <BarChart3 size={16} />, text: "Granüler Veri Analitiği" },
            ]}
            btnText="KAMPANYA OLUŞTUR"
            colorClass="indigo"
          />

          {/* --- YAYINCI KARTI --- */}
          <UserCard
            type="Publisher"
            icon={<Crown size={32} />}
            title="Dijital"
            subtitle="Prestij"
            desc="Vaktinizi yüksek değerli varlıklara dönüştürün. VIP ayrıcalıkların tadını çıkarın."
            features={[
              { icon: <Sparkles size={16} />, text: "Özel Görev Havuzları" },
              { icon: <Zap size={16} />, text: "Anında Kripto Çekim" },
              { icon: <Award size={16} />, text: "VIP Statü Ayrıcalıkları" },
            ]}
            btnText="KAZANMAYA BAŞLA"
            colorClass="amber"
          />
        </div>

        {/* --- ALT GÜVEN PANELİ --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 py-8 border-y border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]"
        >
          <TrustBadge icon={<ShieldCheck className="text-indigo-500" />} text="Military-Grade Security" />
          <TrustBadge icon={<Globe className="text-blue-500" />} text="Global Infrastructure" />
          <TrustBadge icon={<Zap className="text-amber-500" />} text="Ultra-Low Latency" />
        </motion.div>
      </div>
    </div>
  );
}

/* --- YARDIMCI BİLEŞENLER --- */

function UserCard({ type, icon, title, subtitle, desc, features, btnText, colorClass }: any) {
  const isIndigo = colorClass === "indigo";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className={`group relative p-[1px] rounded-[32px] overflow-hidden bg-gradient-to-b ${
        isIndigo ? "from-indigo-500/40 dark:from-indigo-500/20" : "from-amber-500/40 dark:from-amber-500/20"
      } to-transparent`}
    >
      <div className="relative h-full p-10 md:p-14 rounded-[31px] bg-white dark:bg-[#020617]/90 backdrop-blur-xl flex flex-col justify-between border border-white/5 shadow-2xl dark:shadow-none">
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
              isIndigo 
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            }`}>
              {icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-lg border ${
              isIndigo 
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 border-indigo-500/10" 
                : "text-amber-600 dark:text-amber-400 bg-amber-500/5 border-amber-500/10"
            }`}>
              {type}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title} <br />
              <span className={`font-light italic text-5xl ${isIndigo ? "text-indigo-600 dark:text-indigo-400" : "text-amber-600 dark:text-amber-400"}`}>
                {subtitle}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              {desc}
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                <div className={`w-1.5 h-1.5 rounded-full ${isIndigo ? "bg-indigo-500" : "bg-amber-500"}`} />
                {f.text}
              </div>
            ))}
          </div>
        </div>

        <button className={`mt-12 relative overflow-hidden group/btn px-8 py-5 rounded-2xl font-bold transition-all shadow-lg ${
          isIndigo 
            ? "bg-indigo-600 text-white hover:bg-indigo-500" 
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90"
        }`}>
          <span className="relative z-10 flex items-center justify-center gap-3">
            {btnText}
            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function TrustBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 hover:text-slate-900 dark:hover:text-white transition-colors duration-500 cursor-default">
      {icon}
      {text}
    </div>
  );
}
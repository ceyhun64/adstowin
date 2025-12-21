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
  Crown,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserTypeCards() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-[#020617]">
      {/* --- PREMIUM ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />

        {/* İnce Grid Yapısı */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.4em]">
            <Layers size={14} className="text-indigo-400" />
            Ekosistem Seçimi
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            Rolünüzü{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400">
              Belirleyin
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            ADS{" "}
            <span className="text-white font-bold tracking-widest">TOWIN</span>{" "}
            dünyasında iki farklı yolculuk mümkün. İster markanızı zirveye
            taşıyın, ister etkileşiminizle kazanın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* --- REKLAMVEREN KARTI (LÜKS İNDİGO) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-indigo-500/20 to-transparent overflow-hidden"
          >
            <div className="relative h-full p-10 md:p-14 rounded-[31px] bg-[#020617]/90 backdrop-blur-xl flex flex-col justify-between border border-white/5">
              {/* Kart İçindeki Parlama */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />

              <div className="relative space-y-10">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
                    <Target size={32} />
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] bg-indigo-500/5 px-4 py-2 rounded-lg border border-indigo-500/10">
                    Advertiser
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    Marka <br />{" "}
                    <span className="text-indigo-400 font-light italic text-5xl">
                      Vizyonu
                    </span>
                  </h2>
                  <p className="text-slate-400 font-light leading-relaxed text-base">
                    Küresel ölçekte gerçek kullanıcılara ulaşın. Her kuruşun
                    karşılığını aldığınız,
                    <span className="text-white font-medium">
                      {" "}
                      %100 şeffaf{" "}
                    </span>{" "}
                    reklam paneli.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "Yüksek Dönüşüm Oranları" },
                    { icon: ShieldCheck, text: "AI Destekli Bot Koruması" },
                    { icon: BarChart3, text: "Granüler Veri Analitiği" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-sm text-slate-300 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/item:scale-150 transition-transform" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-12 relative overflow-hidden group/btn px-8 py-5 rounded-2xl bg-indigo-600 text-white font-bold transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  KAMPANYA OLUŞTUR{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </motion.div>

          {/* --- KULLANICI KARTI (LÜKS amber) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-amber-500/20 to-transparent overflow-hidden"
          >
            <div className="relative h-full p-10 md:p-14 rounded-[31px] bg-[#020617]/90 backdrop-blur-xl flex flex-col justify-between border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-all duration-700" />

              <div className="relative space-y-10">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <Crown size={32} />
                  </div>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] bg-amber-500/5 px-4 py-2 rounded-lg border border-amber-500/10">
                    Publisher
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    Dijital <br />{" "}
                    <span className="text-amber-400 font-light italic text-5xl">
                      Prestij
                    </span>
                  </h2>
                  <p className="text-slate-400 font-light leading-relaxed text-base">
                    Vaktinizi yüksek değerli varlıklara dönüştürün. Seviye
                    atlayın,
                    <span className="text-white font-medium">
                      {" "}
                      VIP avantajların{" "}
                    </span>{" "}
                    ve yüksek çarpanların tadını çıkarın.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Sparkles, text: "Özel Görev Havuzları" },
                    { icon: Zap, text: "Anında Kripto Çekim" },
                    { icon: Award, text: "VIP Statü Ayrıcalıkları" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-sm text-slate-300 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover/item:scale-150 transition-transform" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-12 relative overflow-hidden group/btn px-8 py-5 rounded-2xl bg-white text-slate-950 font-bold transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  KAZANMAYA BAŞLA{" "}
                  <Sparkles size={18} className="animate-pulse" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- ALT GÜVEN PANELİ --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 py-8 border-y border-white/5 flex flex-wrap justify-center gap-16 text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]"
        >
          <div className="flex items-center gap-3 hover:text-white transition-colors duration-500">
            <ShieldCheck size={16} className="text-indigo-500" />
            Military-Grade Security
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors duration-500">
            <Globe size={16} className="text-blue-500" />
            Global Infrastructure
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors duration-500">
            <Zap size={16} className="text-amber-500" />
            Ultra-Low Latency
          </div>
        </motion.div>
      </div>
    </div>
  );
}

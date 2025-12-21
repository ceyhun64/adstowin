"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  Shield,
  Settings,
  BarChart,
  Target,
  Info,
  Home,
  ChevronRight,
  ArrowLeft,
  MousePointer2,
  Lock,
  Sparkles,
  ToggleRight,
} from "lucide-react";

const CerezPolitikasi = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    advertising: true,
  });

  const cookieTypes = [
    {
      id: "necessary",
      title: "Essential Core",
      icon: Shield,
      required: true,
      description:
        "Sistemin stabilitesi ve güvenliği için gereken temel altyapı çerezleri.",
      duration: "Immutable",
      examples: ["Security Tokens", "Session ID", "Auth State"],
    },
    {
      id: "functional",
      title: "Experience Suite",
      icon: Settings,
      required: false,
      description:
        "Tercih ettiğiniz arayüz ayarlarını ve kişisel konfigürasyonları saklar.",
      duration: "365 Days",
      examples: ["Dark Mode", "Language", "Layout Prefs"],
    },
    {
      id: "analytics",
      title: "Intelligence",
      icon: BarChart,
      required: false,
      description:
        "Deneyiminizi kusursuzlaştırmak için anonim kullanım metrikleri toplar.",
      duration: "730 Days",
      examples: ["Heatmaps", "Traffic Flow", "UX Metrics"],
    },
    {
      id: "advertising",
      title: "Targeted Ads",
      icon: Target,
      required: false,
      description:
        "İlgi alanlarınıza özel, yüksek kaliteli reklam içerikleri sunar.",
      duration: "365 Days",
      examples: ["Retargeting", "Interest Profiling"],
    },
  ];

  const handleToggle = (id: string) => {
    if (id !== "necessary") {
      setCookiePreferences((prev: any) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30 selection:text-orange-200 pt-32 pb-20">
      {/* 🌌 High-End Header */}
      <section className="relative px-6 mb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-orange-500/10 to-transparent -z-10 blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-12 italic"
          >
            <Link
              href="/"
              className="hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              <Home size={12} /> Institutional
            </Link>
            <ChevronRight size={10} />
            <span className="text-orange-500">Cookie Governance</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                <Lock size={12} className="text-orange-500" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-orange-500">
                  Data Sovereignty
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter italic uppercase mb-8">
                Dijital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-200 to-orange-500">
                  İzinleriniz.
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-lg font-light leading-relaxed italic">
                Verileriniz, dijital dünyadaki parmak izinizdir. ADSTOWIN olarak
                bu izlerin kontrolünü tamamen size bırakıyoruz.
              </p>
            </motion.div>

            <div className="hidden lg:flex justify-end italic text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              Revision: 12.21.2025 // V2.0.4
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* 💎 Interactive Dashboard Container */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24">
          {/* Main Controls */}
          <div className="lg:col-span-8 space-y-4">
            {cookieTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 0.995 }}
                onClick={() => handleToggle(type.id)}
                className={`
                  relative cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500 flex items-center justify-between overflow-hidden group
                  ${
                    (cookiePreferences as any)[type.id]
                      ? "bg-white/[0.03] border-orange-500/30 shadow-2xl shadow-orange-500/5"
                      : "bg-white/[0.01] border-white/5 opacity-40 hover:opacity-80"
                  }
                `}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div
                    className={`p-4 rounded-2xl transition-colors duration-500 
                    ${
                      (cookiePreferences as any)[type.id]
                        ? "bg-orange-600 text-white"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    <type.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tight">
                      {type.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-light mt-1 max-w-md">
                      {type.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  {type.required ? (
                    <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-white/5">
                      Mandatory
                    </span>
                  ) : (
                    <div
                      className={`w-14 h-8 rounded-full border transition-all flex items-center px-1 
                      ${
                        (cookiePreferences as any)[type.id]
                          ? "bg-orange-600 border-orange-500"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <motion.div
                        animate={{
                          x: (cookiePreferences as any)[type.id] ? 24 : 0,
                        }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Background Decor */}
                <type.icon className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.02] group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 p-10 bg-orange-600 rounded-[3.5rem] shadow-2xl shadow-orange-600/20 text-center space-y-8 overflow-hidden relative">
              <Sparkles className="absolute -top-10 -left-10 w-40 h-40 text-white/10 animate-pulse" />
              <div className="relative z-10">
                <MousePointer2 className="w-12 h-12 text-white mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase italic leading-tight mb-4">
                  Tercihleri <br />
                  Onayla
                </h3>
                <p className="text-white/80 font-light text-sm mb-8 italic">
                  Seçimleriniz şifreli olarak tarayıcınızda saklanır ve
                  dilediğiniz zaman güncellenebilir.
                </p>
                <button className="w-full py-6 bg-white text-orange-600 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Ayarları Kaydet
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-200 opacity-70">
                  <Shield size={12} /> Privacy Shield Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📚 Detailed Disclosure */}
        <section className="py-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter sticky top-32">
                Teknik <br />{" "}
                <span className="text-orange-500 italic">Manifesto.</span>
              </h2>
            </div>
            <div className="md:w-2/3 space-y-20">
              {cookieTypes.map((type) => (
                <div
                  key={type.id}
                  className="group border-b border-white/5 pb-12 last:border-0"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-orange-500 font-black italic text-xl">
                      /0{cookieTypes.indexOf(type) + 1}
                    </span>
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">
                      {type.title}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 italic">
                    <p className="text-slate-400 font-light leading-relaxed">
                      {type.description} Platformumuzun lüks ve akıcı deneyimini
                      korumak için bu veri noktaları optimize edilmiştir.
                    </p>
                    <div className="space-y-4">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Saklama Süresi:{" "}
                        <span className="text-white">{type.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded text-slate-400 uppercase tracking-tighter"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🛠️ External Management */}
        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
            <Info size={40} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black uppercase italic tracking-tight italic">
              Manuel Denetim
            </h4>
            <p className="text-slate-500 font-light text-sm leading-relaxed italic">
              Platformumuz dışındaki çerez kontrolü için tarayıcı ayarlarınızı
              (Safari, Chrome, Brave) kullanabilirsiniz. Unutmayın, çerezleri
              tamamen devre dışı bırakmak bu özel ekosistemin bazı
              ayrıcalıklarını sınırlayabilir.
            </p>
          </div>
        </div>

        {/* 🔚 Elite Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-white/5 text-center space-y-10">
          <Link
            href="/privacy"
            className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all"
          >
            <ToggleRight
              className="text-orange-500 group-hover:rotate-180 transition-transform duration-500"
              size={20}
            />
            Gizlilik Dokümantasyonu
          </Link>
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors text-[10px] font-black uppercase tracking-widest italic"
            >
              <ArrowLeft size={14} /> Back to Terminal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CerezPolitikasi;

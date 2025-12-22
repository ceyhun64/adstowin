"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
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
      title: "Temel Çekirdek",
      icon: Shield,
      required: true,
      description: "Sistemin stabilitesi ve güvenliği için gereken temel altyapı çerezleri.",
      duration: "Kalıcı",
      examples: ["Güvenlik Jetonları", "Oturum Kimliği", "Yetkilendirme Durumu"],
    },
    {
      id: "functional",
      title: "Deneyim Seti",
      icon: Settings,
      required: false,
      description: "Tercih ettiğiniz arayüz ayarlarını ve kişisel konfigürasyonları saklar.",
      duration: "365 Gün",
      examples: ["Karanlık Mod", "Dil Seçimi", "Yerleşim Tercihleri"],
    },
    {
      id: "analytics",
      title: "Veri Zekası",
      icon: BarChart,
      required: false,
      description: "Deneyiminizi kusursuzlaştırmak için anonim kullanım metrikleri toplar.",
      duration: "730 Gün",
      examples: ["Isı Haritaları", "Trafik Akışı", "Kullanıcı Deneyimi Metrikleri"],
    },
    {
      id: "advertising",
      title: "Hedefli Reklam",
      icon: Target,
      required: false,
      description: "İlgi alanlarınıza özel, yüksek kaliteli reklam içerikleri sunar.",
      duration: "365 Gün",
      examples: ["Yeniden Pazarlama", "İlgi Alanı Profilleme"],
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-orange-500/30 selection:text-orange-900 dark:selection:text-orange-200 pt-24 md:pt-32 pb-10 overflow-x-hidden italic">
      
      {/* 🌌 Üst Bilgi Alanı */}
      <section className="relative px-5 md:px-10 mb-16 md:mb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-orange-500/5 dark:from-orange-500/10 to-transparent blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 md:gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-12"
          >
            <Link href="/" className="hover:text-orange-600 dark:hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={12} /> KURUMSAL
            </Link>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-orange-600 dark:text-orange-500">ÇEREZ YÖNETİMİ</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-end">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 mb-8">
                <Lock size={12} className="text-orange-600 dark:text-orange-500" />
                <span className="text-[10px] font-black tracking-widest uppercase text-orange-600 dark:text-orange-500">VERİ EGEMENLİĞİ</span>
              </div>
              <h1 className="text-5xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                DİJİTAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-orange-600 to-orange-800 dark:from-white dark:via-orange-200 dark:to-orange-500">
                  İZİNLERİNİZ.
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-lg font-light leading-relaxed">
                Verileriniz, dijital parmak izinizdir. ADSTOWIN olarak bu izlerin kontrolünü tamamen size bırakıyoruz.
              </p>
            </motion.div>

            <div className="hidden lg:flex justify-end text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">
              REVİZYON: 22.12.2025 // V2.1.0
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 mb-24 md:mb-40">
          
          {/* Ana Kontroller */}
          <div className="lg:col-span-8 space-y-4">
            {cookieTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ x: 5 }}
                onClick={() => handleToggle(type.id)}
                className={`
                  relative cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500 flex items-center justify-between overflow-hidden group
                  ${(cookiePreferences as any)[type.id]
                    ? "bg-white dark:bg-white/[0.03] border-orange-500/40 shadow-xl shadow-orange-500/5"
                    : "bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/5 opacity-60 hover:opacity-100"
                  }
                `}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`p-4 rounded-2xl transition-all duration-500 
                    ${(cookiePreferences as any)[type.id]
                      ? "bg-orange-600 text-white rotate-6"
                      : "bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    <type.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                      {type.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-500 font-light mt-1 max-w-md leading-snug">
                      {type.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10 shrink-0">
                  {type.required ? (
                    <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-white/5 text-slate-500">
                      ZORUNLU
                    </span>
                  ) : (
                    <div className={`w-14 h-8 rounded-full border transition-all flex items-center px-1 
                      ${(cookiePreferences as any)[type.id]
                        ? "bg-orange-600 border-orange-500"
                        : "bg-slate-300 dark:bg-white/5 border-slate-400 dark:border-white/10"
                      }`}
                    >
                      <motion.div
                        animate={{ x: (cookiePreferences as any)[type.id] ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </div>
                  )}
                </div>
                <type.icon className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] dark:opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>

          {/* Aksiyon Paneli */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 p-10 md:p-12 bg-slate-900 dark:bg-orange-600 text-white rounded-[3.5rem] shadow-2xl shadow-orange-600/10 dark:shadow-orange-600/20 text-center space-y-8 overflow-hidden relative group">
              <Sparkles className="absolute -top-10 -left-10 w-40 h-40 text-white/10 animate-pulse pointer-events-none" />
              <div className="relative z-10">
                <MousePointer2 className="w-14 h-14 text-white mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl md:text-4xl font-black uppercase leading-[0.9] mb-6 tracking-tighter">
                  TERCİHLERİ <br /> ONAYLA
                </h3>
                <p className="text-white/70 font-light text-base mb-10 italic leading-relaxed">
                  Seçimleriniz şifreli olarak tarayıcınızda saklanır ve dilediğiniz zaman güncellenebilir.
                </p>
                <button className="w-full py-6 bg-white text-slate-900 dark:text-orange-600 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  AYARLARI KAYDET
                </button>
                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-orange-200 opacity-60">
                  <Shield size={12} /> GİZLİLİK KALKANI AKTİF
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📚 Teknik Detaylar */}
        <section className="py-24 border-t border-slate-200 dark:border-white/5">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter lg:sticky lg:top-32 leading-[0.9]">
                TEKNİK <br />
                <span className="text-orange-600 dark:text-orange-500">MANİFESTO.</span>
              </h2>
            </div>
            <div className="lg:w-2/3 space-y-20">
              {cookieTypes.map((type, idx) => (
                <div key={type.id} className="group border-b border-slate-200 dark:border-white/5 pb-16 last:border-0">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-orange-600 dark:text-orange-500 font-black text-2xl">/0{idx + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{type.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-10 italic">
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {type.description} Platform deneyimini korumak için bu veri noktaları optimize edilmiştir.
                    </p>
                    <div className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        SAKLAMA SÜRESİ: <span className="text-slate-900 dark:text-white ml-2">{type.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((ex, i) => (
                          <span key={i} className="text-[10px] font-black px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 uppercase tracking-tighter">
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

        {/* 🛠️ Harici Denetim */}
        <div className="p-10 md:p-16 bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 rounded-[3rem] md:rounded-[5rem] flex flex-col sm:flex-row items-center gap-10 shadow-sm dark:shadow-none mb-24">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Info size={40} strokeWidth={1} />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <h4 className="text-2xl font-black uppercase tracking-tighter italic">MANUEL DENETİM</h4>
            <p className="text-slate-500 dark:text-slate-400 font-light text-base md:text-lg leading-relaxed italic">
              Tarayıcı ayarlarınız üzerinden çerezleri yönetebilirsiniz. Tamamen devre dışı bırakmak bu ekosistemin bazı ayrıcalıklarını sınırlayabilir.
            </p>
          </div>
        </div>

        {/* 🔚 Alt Gezinme */}
        <div className="mt-20 md:mt-40 pt-16 border-t border-slate-200 dark:border-white/5 text-center space-y-12">
          <Link
            href="/privacy"
            className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <ToggleRight className="text-orange-600 dark:text-orange-500 group-hover:rotate-180 transition-transform duration-700" size={24} />
            GİZLİLİK DOKÜMANTASYONU
          </Link>
          <div className="pb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors text-[10px] font-black uppercase tracking-[0.3em] italic">
              <ArrowLeft size={14} /> TERMİNALE DÖN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CerezPolitikasi;
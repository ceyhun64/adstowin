"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cookie,
  Shield,
  Settings,
  BarChart,
  Target,
  CheckCircle,
  Info,
  Home,
  ChevronRight,
  ArrowLeft,
  MousePointer2,
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
      title: "Zorunlu Çerezler",
      icon: Shield,
      color: "emerald",
      required: true,
      description:
        "Platformun temel işlevlerinin çalışması için kritik öneme sahiptir.",
      duration: "Oturum süresi veya 1 yıl",
      examples: ["Oturum yönetimi", "Güvenlik doğrulama", "Ödeme işlemleri"],
    },
    {
      id: "functional",
      title: "İşlevsellik Çerezleri",
      icon: Settings,
      color: "blue",
      required: false,
      description:
        "Tema tercihleriniz ve dil ayarlarınız gibi kişiselleştirmeleri hatırlar.",
      duration: "1 yıl",
      examples: ["Karanlık mod tercihi", "Dil seçimi", "Video ayarları"],
    },
    {
      id: "analytics",
      title: "Analitik Çerezler",
      icon: BarChart,
      color: "purple",
      required: false,
      description:
        "Deneyiminizi iyileştirmek için anonim kullanım verileri toplar.",
      duration: "2 yıl",
      examples: ["Sayfa görüntüleme", "Tıklama analizi", "Hata raporları"],
    },
    {
      id: "advertising",
      title: "Reklam Çerezleri",
      icon: Target,
      color: "orange",
      required: false,
      description: "İlgi alanlarınıza göre size daha alakalı reklamlar sunar.",
      duration: "1 yıl",
      examples: [
        "Kişiselleştirilmiş reklamlar",
        "Kampanya ölçümü",
        "Yeniden hedefleme",
      ],
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300 pt-20">
      {/* 🍪 Sabit Bildirim Alanı */}
      <div className="bg-white/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="bg-orange-600/10 dark:bg-orange-500/10 rounded-2xl py-2 px-4 border border-orange-200/50 dark:border-orange-500/20 flex items-center justify-center gap-2">
            <Cookie size={14} className="text-orange-600 animate-bounce" />
            <p className="text-orange-700 dark:text-orange-300 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center">
              Daha İyi Bir Deneyim İçin Çerezleri Kullanıyoruz
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 🧭 Navigasyon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
              <Link
                href="/"
                className="hover:text-orange-600 transition-colors"
              >
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-white font-bold">
                Çerez Politikası
              </span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              Çerez{" "}
              <span className="text-orange-600 italic underline decoration-orange-600/30">
                Tercihleriniz.
              </span>
            </h1>
          </div>
          <div className="text-xs font-bold text-slate-400 bg-slate-200/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
            Güncelleme: 18.12.2025
          </div>
        </div>

        {/* 🌟 Intro & Preference Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-orange-600 text-white shadow-2xl shadow-orange-600/20 relative overflow-hidden group">
            <Cookie
              size={200}
              className="absolute -right-10 -bottom-10 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700"
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 italic">
                Kişisel Deneyim Kontrolü
              </h2>
              <p className="text-orange-50 leading-relaxed text-lg opacity-95">
                ADSTOWIN olarak şeffaflığa inanıyoruz. Hangi verilerin
                cihazınızda saklanacağına siz karar verin. Zorunlu olmayan tüm
                çerezleri istediğiniz zaman kapatabilirsiniz.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MousePointer2 className="text-orange-600" size={28} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Tercihleri Uygula
            </h3>
            <button className="w-full py-4 bg-slate-900 dark:bg-orange-600 text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
              AYARLARI KAYDET
            </button>
          </div>
        </div>

        {/* 🔘 Switch List */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {cookieTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleToggle(type.id)}
              className={`
                cursor-pointer p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-between
                ${
                  (cookiePreferences as any)[type.id]
                    ? "bg-white dark:bg-white/5 border-orange-500/50 shadow-xl shadow-orange-500/5"
                    : "bg-slate-100/50 dark:bg-white/[0.02] border-transparent opacity-60 hover:opacity-100"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-${type.color}-500/10 text-${type.color}-600 dark:text-${type.color}-400`}
                >
                  <type.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                    {type.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {type.description}
                  </p>
                </div>
              </div>

              <div
                className={`
                w-12 h-6 rounded-full relative transition-colors duration-300
                ${
                  (cookiePreferences as any)[type.id]
                    ? "bg-orange-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }
              `}
              >
                <div
                  className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300
                  ${(cookiePreferences as any)[type.id] ? "left-7" : "left-1"}
                `}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 📖 Detailed Content */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <Info className="text-orange-600" size={24} />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Detaylı Çerez Bilgileri
            </h2>
          </div>

          <div className="grid gap-8">
            {cookieTypes.map((type) => (
              <div key={type.id} className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-200 dark:bg-white/10 group-hover:bg-orange-600 transition-colors rounded-full" />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {type.title}
                    </h3>
                    <div className="text-xs font-black text-orange-600 uppercase tracking-widest">
                      {type.duration}
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 italic"
                        >
                          #{ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🛠️ External Control Notice */}
        <div className="mt-20 p-8 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-white/20 bg-slate-100/30 dark:bg-white/[0.01]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm text-blue-500">
              <Info size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Tarayıcı Üzerinden Yönetim
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tercihlerinizi sitemizden yönetebileceğiniz gibi, tarayıcı
                ayarlarınızdan (Chrome, Safari, Firefox vb.) tüm çerezleri
                tamamen engelleyebilir veya silebilirsiniz. Ancak bu durum
                platformun bazı özelliklerinin çalışmamasına neden olabilir.
              </p>
            </div>
          </div>
        </div>

        {/* 🔚 Footer Link */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Daha fazla bilgi için{" "}
            <Link
              href="/privacy"
              className="text-orange-600 font-bold hover:underline"
            >
              Gizlilik Politikamızı
            </Link>{" "}
            inceleyin.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CerezPolitikasi;

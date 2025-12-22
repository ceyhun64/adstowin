"use client";

import React from "react";
import { Shield, Lock, Eye, Database, UserCheck, Globe, Home, ChevronRight, ArrowLeft, Mail, Fingerprint, FileLock2, Cpu, ShieldCheck } from "lucide-react";

const GizlilikPolitikasi = () => {
  const sections = [
    {
      id: "01",
      title: "Veri Toplama",
      subtitle: "Toplanan Veriler",
      icon: Database,
      content: [
        {
          label: "Kimlik Verileri",
          items: ["Ad Soyad", "E-posta Adresi", "Payoneer Kimliği (Ödeme)", "Biyometrik Onay"],
        },
        {
          label: "Teknik Veriler",
          items: ["IP & Coğrafi Konum", "Donanım Parmak İzi", "Davranışsal Analitikler"],
        },
      ],
    },
    {
      id: "02",
      title: "Operasyonel Amaç",
      subtitle: "Kullanım Amaçları",
      icon: Eye,
      content: [
        {
          label: "Temel Hizmet",
          items: ["Hesap Ekosistem Yönetimi", "Ödeme Yönlendirme", "Güvenlik Denetim Kayıtları"],
        },
        {
          label: "Optimizasyon",
          items: ["Kullanıcı Deneyimi Geliştirme", "Sahtekarlık Karşıtı Algoritmalar", "Hedefli Reklam Akışı"],
        },
      ],
    },
    {
      id: "03",
      title: "Güvenlik Altyapısı",
      subtitle: "Veri Güvenliği",
      icon: FileLock2,
      content: [
        {
          label: "Protokoller",
          items: ["256-bit SSL/TLS Şifreleme", "AES-256 Depolama", "İki Faktörlü Kimlik Doğrulama"],
        },
      ],
    },
    {
      id: "04",
      title: "Çerez Yönetimi",
      subtitle: "Çerez Politikası",
      icon: Globe,
      content: [
        {
          label: "Sınıflandırmalar",
          items: ["Zorunlu Temel Çerezler", "Performans Metrikleri", "Deneyim Kişiselleştirme"],
        },
      ],
    },
    {
      id: "05",
      title: "Etik & Paylaşım",
      subtitle: "Paylaşım İlkeleri",
      icon: UserCheck,
      content: [
        {
          label: "Gizlilik Öncelikli",
          items: ["Sıfır Veri Satışı Garantisi", "Minimal Veri İfşası", "Doğrulanmış Entegrasyonlar"],
        },
      ],
    },
    {
      id: "06",
      title: "Kullanıcı Egemenliği",
      subtitle: "Kullanıcı Hakları",
      icon: Shield,
      content: [
        {
          label: "Haklarınız",
          items: ["Veri Erişim & Kopyalama", "Unutulma Hakkı (Silme)", "Veri Taşınabilirliği"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-indigo-500/30 pt-24 md:pt-32 pb-10 overflow-x-hidden">
      
      {/* 🛡️ Header Section */}
      <section className="relative px-5 md:px-10 mb-20 md:mb-32">
        {/* Dekoratif Glow */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[80px] md:blur-[140px] -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 md:gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-10 md:mb-16 italic">
            <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              <Home size={12} /> Kök
            </a>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-indigo-600 dark:text-indigo-500">Gizlilik Protokolü</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 mb-6">
                <Lock size={12} className="text-indigo-600 dark:text-indigo-500" />
                <span className="text-[10px] font-black tracking-widest uppercase text-indigo-700 dark:text-indigo-400">
                  Uluslararası Güvenlik Standartları
                </span>
              </div>
              <h1 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter italic uppercase mb-8">
                Gizlilik, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-slate-900 dark:from-indigo-400 dark:via-blue-200 dark:to-white">
                  Emanetimizdir.
                </span>
              </h1>
              <p className="text-md md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-light leading-relaxed italic border-l-4 border-indigo-600 dark:border-indigo-500/30 pl-6">
                ADSTOWIN ekosisteminde her veri bloğu, dijital bir kale içinde saklanır. 
                <span className="block mt-2 font-medium text-slate-900 dark:text-slate-200">Verileriniz sadece size aittir.</span>
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-6">
              <div className="p-8 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-xl text-right shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                  Revizyon Modeli
                </div>
                <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">ADSTW-S.2025.V1</div>
              </div>
              <ShieldCheck size={140} className="text-indigo-600/10 dark:text-indigo-600/20 mr-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ Sections Area */}
      <section className="px-5 md:px-10 mb-20 md:mb-40">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="group relative bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 hover:border-indigo-500/40 dark:hover:border-indigo-500/20 transition-all duration-700 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
              
              {/* Arka Plan Numarası */}
              <span className="absolute -right-4 -top-10 text-[10rem] md:text-[16rem] font-black text-slate-100 dark:text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-colors leading-none italic pointer-events-none select-none">
                {section.id}
              </span>

              <div className="relative z-10 flex flex-col lg:flex-row gap-12 md:gap-24">
                <div className="lg:w-1/3">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-8 border border-indigo-100 dark:border-indigo-500/10 shadow-inner">
                    <section.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.4em] mb-3 italic">
                    Bölüm {section.id}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm md:text-base">{section.subtitle}</p>
                </div>

                <div className="lg:w-2/3 grid sm:grid-cols-2 gap-10 md:gap-16">
                  {section.content.map((content, cIdx) => (
                    <div key={cIdx} className="space-y-6 md:space-y-8">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-300 border-b-2 border-indigo-500/20 pb-3 inline-block">
                        {content.label}
                      </h4>
                      <ul className="space-y-4">
                        {content.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-4 group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_rgba(79,70,229,0.6)] transition-all" />
                            <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-white transition-colors font-light italic leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛡️ CTA Section */}
      <section className="px-5 py-24 md:py-48 bg-slate-100 dark:bg-white/[0.01] border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
        <Cpu size={300} className="absolute -left-20 top-1/2 -translate-y-1/2 text-slate-200 dark:text-indigo-500/[0.03] -z-0" />

        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-16 relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/40 rotate-12 hover:rotate-0 transition-transform duration-500">
            <Fingerprint size={40} className="text-white" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
              Verileriniz Üzerinde <br className="hidden md:block" /> Tam Egemenlik.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl font-light max-w-2xl mx-auto italic leading-relaxed">
              GDPR ve KVKK protokollerine tam uyumlu şeffaflık politikamızla, verilerinizin kontrolü her an sizin elinizde.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button className="group w-full md:w-auto px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-indigo-900 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4">
              <Mail size={18} /> GÜVENLİK MERKEZİYLE İLETİŞİM
            </button>
            <div className="px-8 py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-full">
              <span className="text-[10px] md:text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Güvenli Protokol: <span className="text-indigo-600 dark:text-indigo-400 font-bold">gizlilik@adstowin.com</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 🏁 Footer Navigation */}
      <footer className="px-5 py-20 text-center">
        <a href="/" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-3 transition-transform" />
          Kontrol Paneline Dön
        </a>
      </footer>
    </div>
  );
};

export default GizlilikPolitikasi;
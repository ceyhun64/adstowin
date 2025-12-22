"use client";

import React from "react";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileText,
  ChevronRight,
  Home,
  ArrowLeft,
  MessageCircle,
  Coins,
  Gavel,
  History,
  Crown,
} from "lucide-react";

const KullanimKosullari = () => {
  const sections = [
    {
      id: "I",
      title: "Temel Şartlar",
      subtitle: "Genel Hükümler",
      icon: FileText,
      content: [
        "ADSTOWIN platformuna erişim, bu dijital protokolün tam mutabakatı ile sağlanır.",
        "Üyelik ekosistemi yalnızca 18 yaş ve üzeri bireyler için tasarlanmıştır.",
        "Kullanıcı kimliği ve verilerinin doğruluğu, platform bütünlüğü için esastır.",
        "Her birey tek bir dijital kimliğe (hesap) sahip olabilir; ihlaller kalıcı kısıtlama sebebidir.",
      ],
    },
    {
      id: "II",
      title: "Operasyonel Çerçeve",
      subtitle: "Platform Kullanımı",
      icon: CheckCircle2,
      content: [
        "Kazanç döngüsü; reklam etkileşimleri ve mikro görevler üzerine inşa edilmiştir.",
        "Normal statüdeki üyeler saatlik 1, Premium üyeler 2 çark çevirme hakkına sahiptir.",
        "Reklam etkileşimleri 15 saniyelik doğrulama periyoduna tabidir.",
        "Premium üyeler, interaktif kod sistemiyle kazanç katsayılarını 2 kat artırabilir.",
      ],
    },
    {
      id: "III",
      title: "Reklam Protokolü",
      subtitle: "Reklam Verme Kuralları",
      icon: Gavel,
      content: [
        "Kampanyalar minimum 1.000 gösterimlik paketler halinde stabilize edilmiştir.",
        "Premium Reklam: Yüksek etkileşimli trafik için 1.000 gösterim / 80 TL.",
        "Standart Reklam: Geniş erişimli trafik için 1.000 gösterim / 20 TL.",
        "Reklam içerikleri evrensel etik değerlere ve yerel yasalara tam uyumlu olmalıdır.",
      ],
    },
    {
      id: "IV",
      title: "Premium Elit Paketi",
      subtitle: "Premium Üyelik",
      icon: Crown,
      content: [
        "Aylık abonelik 170 TL, yıllık elit paket 1.350 TL olarak fiyatlandırılmıştır.",
        "Premium üyeler, platform genelindeki statik reklamlardan tamamen muaftır.",
        "Yüksek frekanslı çark çevirme ve çift katmanlı kazanç çarpanları aktiftir.",
      ],
    },
    {
      id: "V",
      title: "TKripto Varlık Sistemi",
      subtitle: "TKripto Token Sistemi",
      icon: Coins,
      content: [
        "TKripto, platformun yerel varlığıdır; 07/07/2027 borsa listelenmesi hedeflenmektedir.",
        "Arz kıtlığı esastır: Toplam 6 adet üretilmiş, 5 adedi ekosisteme ayrılmıştır.",
        "Aylık performans liderleri TKripto ödülleri ile taltif edilir.",
      ],
    },
    {
      id: "VI",
      title: "Kısıtlı Eylemler",
      subtitle: "Yasaklı Davranışlar",
      icon: AlertTriangle,
      content: [
        "Otomatize sistemler, botlar ve betik kullanımı ekosistemden men edilme sebebidir.",
        "Gizli ağ ve vekil sunucu gibi anonimleştirme araçları sistem güvenliği gereği kısıtlanmıştır.",
        "Hileli etkileşimler yapay zeka tarafından anlık olarak denetlenir.",
      ],
    },
    {
      id: "VII",
      title: "Likidite & Ödemeler",
      subtitle: "Ödeme ve Çekim Koşulları",
      icon: Scale,
      content: [
        "Minimum çekim eşiği 350 TL olarak belirlenmiştir.",
        "Talepler, finans departmanı onayından sonra 1-7 iş günü içinde gerçekleştirilir.",
        "Kullanıcı profil verileri ile ödeme kanalı verileri tam eşleşme sağlamalıdır.",
      ],
    },
    {
      id: "VIII",
      title: "Sorumluluk Reddi",
      subtitle: "Sorumluluk Reddi",
      icon: Shield,
      content: [
        "Üçüncü taraf reklam içeriklerinin doğruluğu ilgili sağlayıcının sorumluluğundadır.",
        "Teknik güncellemeler esnasında geçici servis kesintileri yaşanabilir.",
        "TKripto borsaya açılış süreci bir vizyon olup, piyasa koşullarına bağlıdır.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-indigo-500/30 pt-20 md:pt-32 pb-20 italic overflow-x-hidden">
      {/* 🌌 Atmosferik Arka Plan - Light/Dark uyumlu gradyan */}
      <div className="absolute top-0 left-0 w-full h-[500px] md:h-[800px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-600/10 via-transparent to-transparent -z-10 blur-[80px] md:blur-[120px]" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* 🧭 Navigasyon */}
        <nav className="flex items-center gap-2 md:gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-10 md:mb-16">
          <a
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <Home size={12} /> İndeks
          </a>
          <ChevronRight size={10} className="opacity-30" />
          <span className="text-slate-900 dark:text-white">
            Yasal Anlaşmalar
          </span>
        </nav>

        {/* 🖋️ Header */}
        <header className="max-w-4xl mb-16 md:mb-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-indigo-600 dark:bg-indigo-500" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-indigo-600 dark:text-indigo-500">
              Yasal Yönetişim
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Kullanım <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-400 dark:from-indigo-400 dark:to-indigo-800">
              Koşulları.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl leading-relaxed italic border-l-2 border-slate-200 dark:border-indigo-500/20 pl-6">
            Bu belge, ADSTOWIN dijital ekosistemindeki varlığınızı düzenleyen
            <span className="font-bold text-slate-900 dark:text-white mx-1">
              en üst düzey
            </span>{" "}
            protokol metnidir.
          </p>
        </header>

        {/* 🏛️ Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 md:gap-16 items-start mb-20 md:mb-40">
          {/* Sidebar */}
          <aside className="w-full lg:col-span-4 lg:sticky lg:top-32 space-y-8 order-2 lg:order-1">
            <div className="p-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-none">
              <History
                className="text-indigo-600 dark:text-indigo-500 mb-6"
                size={32}
              />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                Son Revizyon
              </h4>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                22 Aralık, 2025
              </p>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">
                  v2.1.0-STABLE
                </span>
                <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-full text-[10px] font-black uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Yürürlükte
                </span>
              </div>
            </div>

            <div className="p-10 bg-indigo-600 dark:bg-indigo-700 rounded-[3rem] shadow-2xl shadow-indigo-600/30 group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight text-white">
                  Hukuki Bir <br /> Soru mu Var?
                </h3>
                <p className="text-indigo-100 text-xs font-medium mb-8 leading-relaxed opacity-90 italic">
                  Şartlarımızı anlamak platform güvenliğimiz için kritiktir.
                  Hukuk departmanımız size yardımcı olmaya hazır.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all hover:shadow-lg active:scale-95"
                >
                  <MessageCircle size={16} /> DEPARTMANA YAZIN
                </a>
              </div>
              <Shield
                size={140}
                className="absolute -right-8 -bottom-8 text-white opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none"
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:col-span-8 space-y-8 order-1 lg:order-2">
            {sections.map((section) => (
              <section
                key={section.id}
                className="group p-8 md:p-14 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[3rem] md:rounded-[4rem] hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-500 shadow-sm hover:shadow-2xl dark:shadow-none"
              >
                <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
                  <div className="shrink-0 flex sm:flex-col items-center gap-6">
                    <span className="text-4xl md:text-5xl font-black text-slate-100 dark:text-indigo-500/10 font-serif group-hover:text-indigo-500/20 transition-colors">
                      {section.id}
                    </span>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-500 border border-indigo-100 dark:border-indigo-500/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <section.icon size={28} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-500 mb-3 italic">
                      {section.title}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 italic text-slate-800 dark:text-slate-100">
                      {section.subtitle}
                    </h2>
                    <ul className="space-y-6">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex gap-5 group/item">
                          <div className="mt-2.5 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 shrink-0 opacity-20 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all" />
                          <p className="text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-100 transition-colors text-base md:text-lg leading-relaxed font-light italic">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>

        {/* 🏁 Footer */}
        <footer className="pt-16 border-t border-slate-200 dark:border-white/5 flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <a
              href="/privacy"
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              Gizlilik Politikası
            </a>
            <a
              href="/cookies"
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              Çerez Yönetimi
            </a>
            <a
              href="/security"
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              Güvenlik Raporu
            </a>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-4 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group font-black uppercase tracking-[0.5em] text-[10px] mb-12"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-3 transition-transform"
            />
            Terminal Ana Menü
          </a>
        </footer>
      </div>
    </div>
  );
};

export default KullanimKosullari;

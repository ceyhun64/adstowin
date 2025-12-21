"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
      title: "Foundational Terms",
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
      title: "Operational Framework",
      subtitle: "Platform Kullanımı",
      icon: CheckCircle2,
      content: [
        "Kazanç döngüsü; reklam etkileşimleri ve mikro görevler üzerine inşa edilmiştir.",
        "Normal statüdeki üyeler saatlik 1, Premium üyeler 2 çark çevirme hakkına sahiptir.",
        "Reklam etkileşimleri 15 saniyelik doğrulama periyoduna tabidir.",
        "Premium üyeler, interaktif kod sistemiyle kazanç katsayılarını 2x artırabilir.",
        "Likidite çıkışları Payoneer ve Litecoin ağları üzerinden asimetrik şifreleme ile yapılır.",
      ],
    },
    {
      id: "III",
      title: "Advertising Protocol",
      subtitle: "Reklam Verme Kuralları",
      icon: Gavel,
      content: [
        "Kampanyalar minimum 1.000 gösterimlik paketler halinde stabilize edilmiştir.",
        "Premium Reklam: Yüksek etkileşimli trafik için 1.000 gösterim / 20 USD.",
        "Standart Reklam: Geniş erişimli trafik için 1.000 gösterim / 5 USD.",
        "Reklam içerikleri evrensel etik değerlere ve yerel yasalara tam uyumlu olmalıdır.",
      ],
    },
    {
      id: "IV",
      title: "Premium Elite Suite",
      subtitle: "Premium Üyelik",
      icon: Crown,
      content: [
        "Aylık abonelik 4.99 USD, yıllık elit paket 39.99 USD olarak fiyatlandırılmıştır.",
        "Premium üyeler, platform genelindeki statik reklamlardan tamamen muaftır.",
        "Yüksek frekanslı çark çevirme ve çift katmanlı kazanç çarpanları aktiftir.",
      ],
    },
    {
      id: "V",
      title: "TKripto Asset System",
      subtitle: "TKripto Token Sistemi",
      icon: Coins,
      content: [
        "TKripto, platformun yerel varlığıdır; 07/07/2027 borsa listelenmesi hedeflenmektedir.",
        "Arz kıtlığı esastır: Toplam 6 adet üretilmiş, 5 adedi ekosisteme ayrılmıştır.",
        "Aylık performans liderleri TKripto ödülleri ile taltif edilir.",
        "Yıl sonunda en yüksek TKripto hacmine sahip kullanıcı AKripto statüsüne yükselir.",
      ],
    },
    {
      id: "VI",
      title: "Restricted Actions",
      subtitle: "Yasaklı Davranışlar",
      icon: AlertTriangle,
      content: [
        "Otomatize sistemler, botlar ve script kullanımı ekosistemden men edilme sebebidir.",
        "VPN ve Proxy gibi anonimleştirme araçları sistem güvenliği gereği kısıtlanmıştır.",
        "Hileli etkileşimler yapay zeka tarafından anlık olarak denetlenir.",
        "Platform içi iletişimde kurumsal nezaket dışı davranışlara izin verilmez.",
      ],
    },
    {
      id: "VII",
      title: "Liquidity & Payouts",
      subtitle: "Ödeme ve Çekim Koşulları",
      icon: Scale,
      content: [
        "Minimum çekim eşiği 10 USD olarak belirlenmiştir.",
        "Talepler, finans departmanı onayından sonra 1-7 iş günü içinde realize edilir.",
        "Kullanıcı profil verileri ile ödeme kanalı verileri tam eşleşme sağlamalıdır.",
      ],
    },
    {
      id: "VIII",
      title: "Liability Disclaimer",
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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30 pt-32 pb-20 italic overflow-x-hidden">
      {/* 🌌 Atmospheric Background */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent -z-10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* 🧭 Elite Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-16"
        >
          <Link
            href="/"
            className="hover:text-indigo-400 transition-colors flex items-center gap-1"
          >
            <Home size={12} /> Index
          </Link>
          <ChevronRight size={10} />
          <span className="text-white">Legal Agreements</span>
        </motion.nav>

        {/* 🖋️ Section: Header */}
        <header className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-indigo-500" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-indigo-500">
                Legal Governance
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
              Kullanım <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-700">
                Koşulları.
              </span>
            </h1>
            <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
              Bu belge, ADSTOWIN dijital ekosistemindeki varlığınızı ve
              etkileşimlerinizi düzenleyen en üst düzey protokol metnidir.
            </p>
          </motion.div>
        </header>

        {/* 🏛️ The Constitution Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-40">
          {/* Left Side: Sidebar Info */}
          <aside className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
              <History className="text-indigo-500 mb-6" size={32} />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                Son Revizyon
              </h4>
              <p className="text-2xl font-bold tracking-tight">
                18 Aralık, 2025
              </p>
              <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Versiyon</span>
                  <span className="text-indigo-400 text-sm">v2.1.0</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Durum</span>
                  <span className="text-emerald-500 text-sm">Aktif</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">
                  Yardıma mı <br />
                  İhtiyacınız Var?
                </h3>
                <p className="text-indigo-100 text-xs font-medium mb-8 leading-relaxed opacity-80">
                  Hukuki terimler veya kurallar hakkında netlik mi arıyorsunuz?
                  Destek ekibimiz 7/24 yanınızda.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <MessageCircle size={14} /> İletişime Geç
                </Link>
              </div>
              <Shield
                size={150}
                className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700"
              />
            </div>
          </aside>

          {/* Right Side: Constitutional Articles */}
          <main className="lg:col-span-8 space-y-6">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-10 md:p-14 bg-white/[0.01] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.02] hover:border-indigo-500/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-4xl font-black text-indigo-500/20 mb-4 font-serif">
                      {section.id}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500">
                      <section.icon size={28} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-2">
                      {section.title}
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">
                      {section.subtitle}
                    </h2>
                    <ul className="grid gap-6">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex gap-4 group/item">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                          <p className="text-slate-400 group-hover/item:text-slate-200 transition-colors text-sm md:text-base leading-relaxed font-light">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.section>
            ))}
          </main>
        </div>

        {/* 🏁 Footer Navigation */}
        <footer className="pt-20 border-t border-white/5 flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="/privacy"
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Cookie Governance
            </Link>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-slate-600 hover:text-indigo-400 transition-all group font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-2 transition-transform"
            />
            Terminal ana menüsüne dön
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default KullanimKosullari;

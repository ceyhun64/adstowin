"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Ban,
  Target,
  Home,
  ChevronRight,
  ShieldCheck,
  Flag,
  Fingerprint,
  Cpu,
  Lock,
  ArrowUpRight,
  Zap,
  Eye,
} from "lucide-react";

const HileKarsitiPolitika = () => {
  const prohibitedActions = [
    {
      title: "Otomasyon & Betik",
      icon: Cpu,
      severity: "KRİTİK",
      description: "Sistemin doğal dengesini bozacak bot, makro veya yapay betik kullanımı kesinlikle yasaktır.",
      penalty: "Varlıkların Tasfiyesi & Kalıcı Yasaklama",
      examples: ["İzleme Botları", "Tıklayıcılar", "Tarayıcı Botları"],
    },
    {
      title: "Gizli Ağ & Gizlilik",
      icon: Lock,
      severity: "YÜKSEK",
      description: "IP maskeleme, Vekil sunucu veya VPN servisleri üzerinden konum manipülasyonu kabul edilemez.",
      penalty: "Erişim Kısıtlaması & Doğrulama",
      examples: ["Konut Vekil Sunucusu", "Proxy", "Tor Ağı"],
    },
    {
      title: "Çoklu Kimlik",
      icon: Fingerprint,
      severity: "YÜKSEK",
      description: "Tek bir bireyin birden fazla kimlikle ödül havuzunu manipüle etmesi yasaktır.",
      penalty: "İlişkili Tüm Hesapların İptali",
      examples: ["Sahte E-posta", "Referans Avcılığı", "Bot Hesaplar"],
    },
    {
      title: "Sistem İstismarı",
      icon: Zap,
      severity: "YÜKSEK",
      description: "Yazılımsal açıkların (bug) haksız kazanç kapısı olarak kullanılması ağır bir ihlaldir.",
      penalty: "Geri Alım & Hukuki Takip",
      examples: ["API Reverse Engineering", "Zamanlayıcı İstismarı", "Veri Enjeksiyonu"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-red-500/30 pt-24 md:pt-32 pb-10 overflow-x-hidden italic">
      
      {/* 🛑 Hero Section */}
      <section className="relative px-5 md:px-10 mb-20 md:mb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-red-500/5 dark:from-red-500/10 to-transparent blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center md:justify-start gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-12"
          >
            <Link href="/" className="hover:text-red-600 dark:hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={12} /> SİSTEM
            </Link>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-red-600 dark:text-red-500">GÜVENLİK PROTOKOLÜ</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 mb-8">
                <ShieldCheck size={12} className="text-red-600 dark:text-red-500" />
                <span className="text-[10px] font-black tracking-widest uppercase text-red-600 dark:text-red-500">SIFIR TOLERANS</span>
              </div>
              <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                ADALET <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950 dark:from-red-400 dark:via-red-600 dark:to-red-900">
                  ZIRHIMIZDIR.
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
                ADSTOWIN ekosistemi, dürüst kullanıcıların haklarını korumak için askeri düzeyde güvenlik algoritmalarıyla donatılmıştır.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="w-56 h-56 rounded-[3rem] bg-white dark:bg-red-950/10 border border-slate-200 dark:border-red-500/20 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl shadow-2xl dark:shadow-none">
                <div className="text-5xl font-black text-red-600 dark:text-red-500 mb-3 tracking-tighter">24/7</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 leading-tight">
                  OTONOM <br /> DENETİM
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚫 İhlal Kartları */}
      <section className="px-5 md:px-10 mb-20 md:mb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {prohibitedActions.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group p-8 md:p-12 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[3rem] hover:border-red-500/50 dark:hover:border-red-500/30 transition-all duration-500 relative overflow-hidden shadow-lg dark:shadow-none"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.02] group-hover:opacity-[0.08] transition-opacity">
                <item.icon size={120} />
              </div>

              <div className="flex items-start justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-600/10 flex items-center justify-center text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 border border-red-200 dark:border-red-500/10">
                  <item.icon size={28} />
                </div>
                <span className="text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500 uppercase">
                  {item.severity}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-light text-base md:text-lg leading-relaxed mb-8 max-w-sm italic">
                {item.description}
              </p>

              <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex, i) => (
                    <span key={i} className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/5 uppercase tracking-tighter">
                      {ex}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-red-600 dark:text-red-500 text-[11px] md:text-xs font-black uppercase tracking-widest">
                  <Ban size={16} className="shrink-0" /> {item.penalty}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🕵️ Tespit Zekası */}
      <section className="px-5 md:px-10 py-24 md:py-40 bg-white/50 dark:bg-white/[0.01] border-y border-slate-200 dark:border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-red-600 dark:text-red-500 font-black text-xs uppercase tracking-[0.4em] mb-6 block">İSTİHBARAT BİRİMLERİ</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">NASIL TESPİT <br /> EDİYORUZ?</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { t: "Sinirsel Desenler", d: "Davranış analizi.", i: Target },
                { t: "IP Bütünlüğü", d: "Ağ sahteciliği kontrolü.", i: ShieldAlert },
                { t: "Donanım Kimliği", d: "Cihaz parmak izi.", i: Zap },
                { t: "Manuel Denetim", d: "Güvenlik operasyonu.", i: Eye },
              ].map((m, i) => (
                <div key={i} className="group p-6 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl hover:border-red-500/50 transition-all shadow-sm dark:shadow-none">
                  <m.i className="text-red-600 dark:text-red-500 mb-4 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-black text-xs uppercase tracking-widest mb-1">{m.t}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-tight">{m.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-red-600/20 dark:bg-red-600/10 blur-[100px] rounded-full group-hover:bg-red-600/30 transition-all duration-700" />
            <div className="relative p-10 md:p-20 bg-slate-900 dark:bg-red-600 text-white rounded-[4rem] shadow-2xl overflow-hidden">
              <ShieldAlert size={150} className="absolute -right-20 -bottom-20 text-white/10 rotate-12" />
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 tracking-tighter">İTİRAZ HAKKI</h3>
              <p className="text-white/80 leading-relaxed font-light text-lg md:text-xl mb-12 italic">
                Dürüst bir hataya inanıyorsanız, profesyonel bir savunma ile itiraz hakkınızı kullanabilirsiniz. Kanıtlar 48 saat içinde incelenir.
              </p>
              <button className="w-full py-6 bg-white text-slate-900 dark:text-red-600 font-black uppercase text-xs tracking-[0.3em] rounded-2xl active:scale-95 flex items-center justify-center gap-3 shadow-xl transition-all">
                SAVUNMA TALEBİ <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 Manifesto CTA */}
      <section className="px-5 md:px-10 py-24 md:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <Flag className="w-16 h-16 text-red-600 dark:text-red-500 mx-auto" />
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">DÜRÜSTLÜK, <br /> EN DEĞERLİ VARLIKTIR.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
            ADSTOWIN, hile yaparak elde edilen kazançları hiçbir zaman tanımaz. Ekosistemimizi temiz tutmak ortak menfaatimizdir.
          </p>
          <div className="flex justify-center items-center gap-10 pt-12 border-t border-slate-200 dark:border-white/5">
            <Link href="/terms" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 dark:hover:text-white transition-colors">HİZMET KOŞULLARI</Link>
            <Link href="/privacy" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 dark:hover:text-white transition-colors">GÜVENLİK PROTOKOLLERİ</Link>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[0.3em] italic">
          TERMINALE GERİ DÖN
        </Link>
      </footer>
    </div>
  );
};

export default HileKarsitiPolitika;
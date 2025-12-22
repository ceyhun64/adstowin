"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Target,
  Zap,
  Mail,
  MapPin,
  Globe,
  TrendingUp,
  Home,
  ChevronRight,
  Shield,
  ArrowUpRight,
  Fingerprint,
  Award,
} from "lucide-react";

const Hakkimizda = () => {
  const stats = [
    {
      value: "50B+",
      label: "Seçkin Üye",
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      value: "2M₺+",
      label: "Paylaşılan Kazanç",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      value: "1M+",
      label: "Reklam Etkileşimi",
      icon: Target,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      value: "%99.9",
      label: "Sistem Güvenilirliği",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  const timeline = [
    { year: "2024", title: "Başlangıç", desc: "Temellerin atılışı ve ilk dijital imza." },
    { year: "2025", title: "Genişleme", desc: "Küresel elit kullanıcı ağına erişim." },
    { year: "2026", title: "Zeka", desc: "Yapay zeka destekli otonom kazanç motoru." },
    { year: "2027", title: "Hakimiyet", desc: "Ekosistemin küresel borsalarda taçlanışı." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-indigo-500/30 pt-24 md:pt-32 pb-10 overflow-x-hidden italic">
      
      {/* 🌌 Hero Section */}
      <section className="relative px-5 md:px-10 mb-20 md:mb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/5 dark:from-indigo-500/10 to-transparent blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center md:justify-start gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500 mb-12"
          >
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1.5">
              <Home size={12} /> KURUM
            </Link>
            <ChevronRight size={10} className="opacity-30" />
            <span className="text-indigo-600 dark:text-indigo-400">MİRAS HAKKINDA</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-6xl md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase mb-8">
                GELECEK <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-400 dark:to-slate-700">
                  AÇILIYOR.
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-lg font-light leading-relaxed">
                ADSTOWIN, dijital ekonominin kurallarını yeniden yazan, lüksü ve kazancı demokratize eden küresel bir ekosistemdir.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="hidden lg:flex justify-end relative">
              <div className="w-80 h-80 rounded-[3rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] flex items-center justify-center relative group rotate-12 hover:rotate-0 transition-all duration-700 shadow-2xl dark:shadow-none">
                <div className="absolute inset-0 rounded-[3rem] border-2 border-indigo-500/20 animate-pulse" />
                <Fingerprint size={100} className="text-indigo-600 dark:text-indigo-500/50 group-hover:scale-110 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💎 Prestij İstatistikleri */}
      <section className="py-20 px-5 md:px-10 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.01] backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-3"
            >
              <div className={`text-4xl md:text-7xl font-black tracking-tighter ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 italic">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏛 Misyon & Vizyon */}
      <section className="py-24 md:py-40 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 md:p-16 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[3rem] relative overflow-hidden group transition-all shadow-xl dark:shadow-none"
            >
              <Target className="absolute -right-12 -bottom-12 w-64 h-64 text-slate-100 dark:text-white/[0.01] group-hover:text-indigo-500/5 dark:group-hover:text-indigo-500/[0.03] transition-all duration-700" />
              <div className="relative z-10">
                <span className="text-indigo-600 dark:text-indigo-500 font-black text-[11px] uppercase tracking-[0.4em] mb-6 block">MANIFESTO</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">VİZYONUMUZ</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-light mb-10 italic">
                  Dijital reklamcılığı sadece bir veri trafiği olmaktan çıkarıp, her saniyenin altına dönüştüğü küresel bir "Altın Standart" haline getirmek.
                </p>
                <Link href="/roadmap" className="inline-flex items-center gap-2 font-black text-[11px] uppercase tracking-widest text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-b-2 border-slate-900 dark:border-white/20 pb-1">
                  STRATEJİ BELGESİ <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 md:p-16 bg-slate-900 dark:bg-indigo-600 text-white rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-slate-400 dark:shadow-indigo-500/20"
            >
              <Rocket className="absolute -right-12 -bottom-12 w-64 h-64 text-white/10 group-hover:rotate-12 transition-all duration-700" />
              <div className="relative z-10">
                <span className="text-white/50 font-black text-[11px] uppercase tracking-[0.4em] mb-6 block">AMACIMIZ</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">MİSYONUMUZ</h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light mb-10 italic">
                  Her bireyin dijital varlığını bir sermayeye dönüştürmek ve bu sermayeyi en şeffaf, en güvenli ve en lüks deneyimle yönetmesini sağlamak.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
                  <Shield size={14} /> KÜRESEL GÜVENLİK ONAYLI
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⏳ Yol Haritası */}
      <section className="py-24 md:py-40 px-5 md:px-10 bg-slate-100/50 dark:bg-gradient-to-b dark:from-transparent dark:to-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[ -0.05em] text-center italic">YOL HARİTASI</h2>
            <div className="w-24 h-2 bg-indigo-600 dark:bg-indigo-500 mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {timeline.map((m, i) => (
              <div key={i} className="relative space-y-6 group p-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl hover:border-indigo-500 transition-colors shadow-sm dark:shadow-none">
                <div className="text-[12px] font-black text-indigo-600 dark:text-indigo-500 tracking-tighter opacity-50 italic">AŞAMA-0{i + 1}</div>
                <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter border-b border-slate-100 dark:border-white/10 pb-4">
                  {m.year}
                </div>
                <div>
                  <div className="text-[12px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-300 mb-2">{m.title}</div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 font-medium leading-relaxed italic">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏆 Call to Action */}
      <section className="py-24 md:py-40 px-5 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative p-[1.5px] bg-gradient-to-br from-indigo-600 via-purple-600 to-transparent rounded-[3rem] md:rounded-[5rem]">
            <div className="bg-white dark:bg-[#020617] rounded-[2.9rem] md:rounded-[4.9rem] p-12 md:p-24 space-y-10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 blur-[100px] -z-10" />
              <Award className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto" />
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">ZİRVEYE <br /> DAVETLİSİNİZ.</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg md:text-2xl font-light max-w-2xl mx-auto italic leading-relaxed">
                Binlerce elit kullanıcı arasında yerinizi alın. Adil kazanç ve teknolojik lüksün kesiştiği noktada buluşalım.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button className="px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-[#020617] font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl">
                  KAYIT OLUN
                </button>
                <button className="px-12 py-6 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all">
                  TEKNİK DÖKÜMAN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Footer */}
      <footer className="py-20 px-5 md:px-10 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-3"><MapPin size={14} className="text-indigo-600 dark:text-indigo-500" /> İSTANBUL MERKEZ</div>
          <div className="flex items-center gap-3"><Mail size={14} className="text-indigo-600 dark:text-indigo-500" /> ILISKILER@ADSTOWIN.COM</div>
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400"><Globe size={14} /> KÜRESEL AĞ: ÇEVRİMİÇİ</div>
        </div>
      </footer>
    </div>
  );
};

export default Hakkimizda;
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
  MessageCircle,
  Globe,
  TrendingUp,
  Award,
  Home,
  ChevronRight,
  Shield,
  Sparkles,
  ArrowUpRight,
  Fingerprint,
} from "lucide-react";

const Hakkimizda = () => {
  const stats = [
    { value: "50K+", label: "Elite Members", icon: Users, color: "text-indigo-400" },
    { value: "$500K+", label: "Wealth Shared", icon: TrendingUp, color: "text-emerald-400" },
    { value: "1M+", label: "Ad Engagements", icon: Target, color: "text-blue-400" },
    { value: "99.9%", label: "System Integrity", icon: Zap, color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 🌌 Ultra-Modern Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 mb-12 italic"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={12} /> Institutional
            </Link>
            <ChevronRight size={10} />
            <span className="text-indigo-400">About the legacy</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter italic uppercase italic mb-8">
                Future <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-400 to-slate-700">
                  Unfolded.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-lg font-light leading-relaxed">
                ADSTOWIN, dijital ekonominin kurallarını yeniden yazan, lüksü ve kazancı demokratize eden bir ekosistemdir.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex justify-end relative"
            >
              <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center relative group">
                 <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping" />
                 <Fingerprint size={80} className="text-indigo-500/50 group-hover:text-indigo-400 transition-colors duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💎 Prestige Stats Grid */}
      <section className="py-20 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center lg:text-left space-y-2"
            >
              <div className={`text-4xl md:text-6xl font-black tracking-tighter ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏛 Mission & Vision - The "Executive" Look */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden group transition-all"
            >
              <Target className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.02] group-hover:text-indigo-500/[0.05] transition-all duration-700" />
              <div className="relative z-10">
                <span className="text-indigo-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Manifesto</span>
                <h3 className="text-4xl font-black uppercase italic mb-6">Vizyonumuz</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
                  Dijital reklamcılığı sadece bir veri trafiği olmaktan çıkarıp, her saniyenin altına dönüştüğü küresel bir "Altın Standart" haline getirmek.
                </p>
                <Link href="/roadmap" className="inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-white group-hover:text-indigo-400 transition-colors">
                  Strateji Belgesi <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="p-12 bg-indigo-600 rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-indigo-500/20"
            >
              <Rocket className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 group-hover:rotate-12 transition-all duration-700" />
              <div className="relative z-10">
                <span className="text-white/60 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Our Purpose</span>
                <h3 className="text-4xl font-black uppercase italic mb-6">Misyonumuz</h3>
                <p className="text-white/90 text-lg leading-relaxed font-light mb-8">
                  Her bireyin dijital varlığını bir sermayeye dönüştürmek ve bu sermayeyi en şeffaf, en güvenli ve en lüks deneyimle yönetmesini sağlamak.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Shield size={14} /> Global Security Verified
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⏳ The Heritage Timeline */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-center">Yol Haritası</h2>
            <div className="w-20 h-1 bg-indigo-500 mt-4" />
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
             {[
               { year: "2024", title: "Genesis", desc: "Temellerin atılışı ve ilk dijital imza." },
               { year: "2025", title: "Expansion", desc: "Küresel elit kullanıcı ağına erişim." },
               { year: "2026", title: "Intelligence", desc: "AI destekli otonom kazanç motoru." },
               { year: "2027", title: "Dominance", desc: "Ekosistemin küresel borsalarda taçlanışı." },
             ].map((m, i) => (
               <div key={i} className="relative space-y-4 group">
                  <div className="text-sm font-black text-indigo-500 tracking-tighter mb-2 opacity-50 group-hover:opacity-100 transition-opacity italic">0{i+1} / PHASE</div>
                  <div className="text-4xl font-black text-white italic tracking-tighter border-b border-white/10 pb-4">{m.year}</div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-300 pt-2">{m.title}</div>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{m.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 🏆 High-End Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-transparent rounded-[4rem]">
            <div className="bg-[#020617] rounded-[3.9rem] p-16 text-center space-y-10 relative overflow-hidden">
               {/* Decorative background glow */}
               <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 blur-[100px] -z-10" />
               
               <Award className="w-16 h-16 text-indigo-400 mx-auto" />
               <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                 Zirveye <br /> Davetlisiniz.
               </h2>
               <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                 Binlerce elit kullanıcı arasında yerinizi alın. Adil kazanç ve teknolojik lüksün kesiştiği noktada buluşalım.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                 <button className="px-12 py-6 bg-white text-[#020617] font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/5">
                   Kayıt Olun
                 </button>
                 <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all">
                   Whitepaper
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Institutional Footer Stats */}
      <footer className="py-20 px-6 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-8 text-[10px] font-black uppercase tracking-[0.4em] italic">
           <div className="flex items-center gap-2"><MapPin size={12}/> Istanbul HQ</div>
           <div className="flex items-center gap-2"><Mail size={12}/> relations@adstowin.com</div>
           <div className="flex items-center gap-2 text-indigo-400 hover:text-white cursor-pointer transition-colors"><Globe size={12}/> Global Network Status: Online</div>
        </div>
      </footer>
    </div>
  );
};

export default Hakkimizda;
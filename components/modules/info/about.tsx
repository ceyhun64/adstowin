"use client";

import React from "react";
import Link from "next/link";
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
  Heart,
  Home,
  ChevronRight,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Hakkimizda = () => {
  const stats = [
    {
      value: "50K+",
      label: "Aktif Kullanıcı",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      value: "$500K+",
      label: "Toplam Ödeme",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      value: "1M+",
      label: "İzlenen Reklam",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      value: "99.9%",
      label: "Uptime Erişimi",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Büyük Başlangıç",
      desc: "ADSTOWIN dijital reklam pazarına ilk adımını attı.",
    },
    {
      year: "2025",
      title: "10K Kullanıcı",
      desc: "Topluluğumuzun ilk büyük büyüme dalgasını tamamladık.",
    },
    {
      year: "2026",
      title: "Premium Çağı",
      desc: "Yapay zeka destekli reklam hedefleme ve premium üyelik.",
    },
    {
      year: "2027",
      title: "TKripto Finans",
      desc: "Kendi ekosistem token'ımızın küresel borsalarda listelenmesi.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300 pt-20">
      {/* 🚀 Top Ad/Info Banner */}
      <div className="bg-purple-600 dark:bg-purple-900/20 border-b border-purple-700 dark:border-purple-500/20 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <Sparkles
            size={16}
            className="text-white dark:text-purple-400 animate-pulse"
          />
          <p className="text-white dark:text-purple-300 text-[11px] font-bold uppercase tracking-[0.2em]">
            Dijital Reklamcılığın Geleceğine Hoş Geldiniz
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 🧭 Navigation & Header */}
        <div className="mb-20">
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium font-mono">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              <Home size={18} />
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-white font-bold tracking-tight">
              Hakkımızda
            </span>
          </nav>

          <div className="relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
              Sınırları <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
                Aşıyoruz.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
              ADSTOWIN, reklam verenler ile kullanıcılar arasında adil, şeffaf
              ve yüksek kazançlı bir köprü kurmak için tasarlandı.
            </p>
          </div>
        </div>

        {/* 📊 Modern Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/5"
            >
              <div
                className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}
              >
                <s.icon size={24} />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest leading-none">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* 🏔 Vision & Mission - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="group relative p-10 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target size={120} className="dark:text-white text-slate-900" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
              Vizyonumuz
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-4">
              Dünya genelinde dijital reklam tüketimini pasif bir aktiviteden,
              aktif bir kazanç modeline dönüştürmek.
            </p>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
              Gelecek 2027 Hedefleri <ArrowRight size={16} />
            </div>
          </div>

          <div className="group relative p-10 bg-slate-900 dark:bg-purple-600 rounded-[3rem] overflow-hidden text-white shadow-2xl shadow-purple-500/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Rocket size={120} />
            </div>
            <h3 className="text-3xl font-black mb-6 italic">Misyonumuz</h3>
            <p className="text-white/80 leading-relaxed font-medium mb-4">
              Her kullanıcının dijital ayak izinin bir değeri olduğunu
              biliyoruz. Bu değeri adil paylaşımlı bir ekonomiyle herkese geri
              kazandırmak.
            </p>
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-tighter">
              <Shield size={16} /> %100 Şeffaf Altyapı
            </div>
          </div>
        </div>

        {/* ⏳ Roadmap / Timeline */}
        <div className="mb-24">
          <h2 className="text-center text-4xl font-black text-slate-900 dark:text-white mb-16 tracking-tighter">
            Yol Haritamız
          </h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[2.25rem] left-0 right-0 h-0.5 bg-slate-200 dark:bg-white/10 -z-10" />
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 bg-white dark:bg-[#020617] border-4 border-purple-600 rounded-full flex items-center justify-center font-black text-purple-600 mb-6 shadow-lg shadow-purple-500/20">
                  {i + 1}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {m.year}
                </div>
                <div className="font-bold text-purple-600 dark:text-purple-400 text-sm mb-2 uppercase">
                  {m.title}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📞 Contact Grid */}
        <div className="mb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: Mail, t: "E-posta", v: "info@adsTOWIN.com", c: "blue" },
              {
                i: MessageCircle,
                t: "Destek",
                v: "support@adsTOWIN.com",
                c: "emerald",
              },
              { i: Globe, t: "Web", v: "www.adsTOWIN.com", c: "purple" },
              { i: MapPin, t: "Ofis", v: "İstanbul, Türkiye", c: "orange" },
            ].map((contact, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl hover:border-purple-500/50 transition-colors group"
              >
                <contact.i
                  size={20}
                  className="text-slate-400 group-hover:text-purple-500 mb-4 transition-colors"
                />
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                  {contact.t}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {contact.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🏆 Final CTA */}
        <div className="relative group bg-slate-900 rounded-[3rem] p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <Award className="w-16 h-16 text-purple-400 mx-auto mb-8 animate-bounce" />
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              Ekosistemin Bir Parçası Olun
            </h3>
            <p className="text-slate-400 mb-10 text-lg font-medium">
              Binlerce kullanıcı ve yüzlerce reklam verenle büyüyen bu
              toplulukta yerinizi alın. Adil kazanç herkesin hakkı.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-purple-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-purple-600/20 uppercase text-sm tracking-widest">
                Şimdi Kayıt Ol
              </button>
              <button className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase text-sm tracking-widest border border-white/10">
                Detayları İncele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hakkimizda;

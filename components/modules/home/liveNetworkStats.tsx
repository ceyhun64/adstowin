"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users2,
  DollarSign,
  Activity,
  Globe2,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function LiveNetworkStats() {
  // Sayıların canlı gibi görünmesi için küçük bir state simülasyonu (Opsiyonel)
  const [liveCounter, setLiveCounter] = useState(1284500);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Toplam Ödenen",
      value: `$${liveCounter.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/5",
      detail: "Anlık Transferler",
      trend: "+14.2%",
      chart: [40, 70, 45, 90, 65, 80], // Mini grafik için mock data
    },
    {
      label: "Aktif Reklamveren",
      value: "3,120",
      icon: Zap,
      color: "text-indigo-400",
      bg: "bg-indigo-500/5",
      detail: "Global Markalar",
      trend: "Canlı",
      chart: [30, 50, 40, 60, 55, 70],
    },
    {
      label: "Online Kullanıcı",
      value: "18,405",
      icon: Users2,
      color: "text-blue-400",
      bg: "bg-blue-500/5",
      detail: "Dünya Geneli",
      trend: "Yüksek",
      chart: [50, 40, 70, 50, 90, 85],
    },
    {
      label: "Güvenlik Skoru",
      value: "99.9%",
      icon: ShieldCheck,
      color: "text-amber-400",
      bg: "bg-amber-500/5",
      detail: "AI Koruma Aktif",
      trend: "Secure",
      chart: [90, 95, 92, 98, 99, 100],
    },
  ];

  return (
    <div className="w-full bg-[#020617] py-24 border-y border-white/[0.03] relative overflow-hidden">
      {/* Üst Gradyan Çizgisi */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      {/* Arka Plan Dekoratif Elementler */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              {/* Kart Başlığı */}
              <div className="flex items-start justify-between mb-8">
                <div
                  className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border border-white/5`}
                >
                  <stat.icon size={20} />
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`flex items-center gap-1 text-[10px] font-bold ${stat.color} bg-white/5 px-2 py-1 rounded-full border border-white/5`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${stat.color} animate-pulse`}
                    />
                    {stat.trend}
                  </div>
                </div>
              </div>

              {/* Sayısal Veri */}
              <div className="space-y-1 mb-6">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] block">
                  {stat.label}
                </span>
                <h4 className="text-3xl font-bold text-white tracking-tighter tabular-nums group-hover:scale-[1.02] transition-transform origin-left duration-500">
                  {stat.value}
                </h4>
                <p className="text-slate-500 text-[11px] font-medium italic">
                  {stat.detail}
                </p>
              </div>

              {/* Mini Görsel Grafik (Trend Çizgisi Simülasyonu) */}
              <div className="flex items-end gap-1 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                {stat.chart.map((height, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    className={`flex-1 w-full rounded-full ${stat.color.replace(
                      "text",
                      "bg"
                    )} transition-all duration-1000`}
                  />
                ))}
              </div>

              {/* Dekoratif Alt Köşe İkonu */}
              <div className="absolute bottom-4 right-4 text-white/5 group-hover:text-white/20 transition-colors">
                <ArrowUpRight size={24} />
              </div>

              {/* Hover Glow Efekti */}
              <div
                className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>

        {/* Alt Detay Bilgisi */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-4 rounded-2xl bg-white/[0.01] border border-white/5"
        >
          <div className="flex items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Sistem Durumu: Nominal
            </span>
            <span className="hidden md:block opacity-20">|</span>
            <span className="flex items-center gap-2">
              <TrendingUp size={14} className="text-indigo-400" />
              Büyüme Hızı: %22 MoM
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            Canlı Veri Senkronizasyonu Aktif
          </div>
        </motion.div>
      </div>
    </div>
  );
}

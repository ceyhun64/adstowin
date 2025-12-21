"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Home,
  ChevronRight,
  ArrowLeft,
  Mail,
  Fingerprint,
  FileLock2,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const GizlilikPolitikasi = () => {
  const sections = [
    {
      id: "01",
      title: "Data Acquisition",
      subtitle: "Toplanan Veriler",
      icon: Database,
      content: [
        {
          label: "Identity Data",
          items: ["Ad Soyad", "E-posta Adresi", "Payoneer ID (Billing)", "Biyometrik Onay"],
        },
        {
          label: "Technical Data",
          items: ["IP & Geo-Location", "Hardware Fingerprint", "Behavioral Analytics"],
        },
      ],
    },
    {
      id: "02",
      title: "Operational Intent",
      subtitle: "Kullanım Amaçları",
      icon: Eye,
      content: [
        {
          label: "Core Service",
          items: ["Account Ecosystem Management", "Payment Routing", "Security Audit Logs"],
        },
        {
          label: "Optimization",
          items: ["UX Enhancement", "Anti-Fraud Algorithms", "Targeted Ad-Stream"],
        },
      ],
    },
    {
      id: "03",
      title: "Security Infrastructure",
      subtitle: "Veri Güvenliği",
      icon: FileLock2,
      content: [
        {
          label: "Protocols",
          items: ["256-bit SSL/TLS Encryption", "AES-256 Storage", "2FA Authentication"],
        },
      ],
    },
    {
      id: "04",
      title: "Cookie Governance",
      subtitle: "Çerez Politikası",
      icon: Globe,
      content: [
        {
          label: "Classifications",
          items: ["Mandatory Core Cookies", "Performance Metrics", "Experience Personalization"],
        },
      ],
    },
    {
      id: "05",
      title: "Ethics & Sharing",
      subtitle: "Paylaşım İlkeleri",
      icon: UserCheck,
      content: [
        {
          label: "Privacy First",
          items: ["Sıfır Veri Satışı Garantisi", "Minimal Data Exposure", "Verified Integrations"],
        },
      ],
    },
    {
      id: "06",
      title: "User Sovereignty",
      subtitle: "Kullanıcı Hakları",
      icon: Shield,
      content: [
        {
          label: "Your Rights",
          items: ["Veri Erişim & Kopyalama", "Unutulma Hakkı (Deletion)", "Veri Taşınabilirliği"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 pt-32 pb-20 overflow-x-hidden">
      {/* 🛡️ Vault Access Header */}
      <section className="relative px-6 mb-32">
        {/* Deep Glow Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 mb-16 italic"
          >
            <Link href="/" className="hover:text-indigo-500 transition-colors flex items-center gap-1">
              <Home size={12} /> Root
            </Link>
            <ChevronRight size={10} />
            <span className="text-indigo-500">Privacy Protocol</span>
          </motion.nav>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <Lock size={12} className="text-indigo-500" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-400">Military Grade Encryption</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter italic uppercase mb-8">
                Gizlilik, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-200 to-white">
                  Kutsaldır.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed italic border-l-2 border-indigo-500/30 pl-6">
                ADSTOWIN ekosisteminde her veri bloğu, dijital bir kale içinde saklanır. Gizliliğiniz sadece bir kural değil, mimarimizin temel taşıdır.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-4 flex flex-col items-end gap-4"
            >
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl text-right">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Revizyon Modeli</div>
                <div className="text-sm font-mono text-indigo-400">ADSTW-V.2025.12</div>
              </div>
              <ShieldCheck size={120} className="text-indigo-600/20 mr-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🏛️ Privacy Ledger (Sections) */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto space-y-4">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 md:p-16 hover:bg-white/[0.03] hover:border-indigo-500/20 transition-all duration-700 overflow-hidden"
            >
              {/* Background ID number */}
              <span className="absolute -right-4 -top-10 text-[12rem] font-black text-white/[0.02] group-hover:text-indigo-500/[0.03] transition-colors leading-none italic pointer-events-none">
                {section.id}
              </span>

              <div className="relative z-10 flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-500 mb-8">
                    <section.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-3 italic">Bölüm {section.id}</div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tight mb-2">{section.title}</h3>
                  <p className="text-slate-500 font-medium text-sm">{section.subtitle}</p>
                </div>

                <div className="lg:w-2/3 grid md:grid-cols-2 gap-12">
                  {section.content.map((content, cIdx) => (
                    <div key={cIdx} className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2">
                        {content.label}
                      </h4>
                      <ul className="space-y-4">
                        {content.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-indigo-600 group-hover/item:w-3 transition-all" />
                            <span className="text-sm text-slate-400 group-hover/item:text-white transition-colors font-light italic">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛡️ Secure Contact Section */}
      <section className="px-6 py-40 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <Cpu size={300} className="absolute -left-20 top-1/2 -translate-y-1/2 text-indigo-500/[0.03] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/40 rotate-12 group-hover:rotate-0 transition-transform">
            <Fingerprint size={40} className="text-white" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Verileriniz Üzerinde <br /> Tam Hakimiyet.
            </h2>
            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto italic leading-relaxed">
              Veri koruma yasalarına (GDPR, KVKK) tam uyumlu süreçlerimiz hakkında sormak istediğiniz her şeyi doğrudan güvenlik departmanımıza iletebilirsiniz.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-10 py-6 bg-white text-indigo-600 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3">
              <Mail size={16} /> Güvenlik Ekibine Yazın
            </button>
            <div className="text-[11px] font-mono text-slate-500 px-6 py-2 border border-white/5 rounded-full">
              SECURE CHANNEL: privacy@adstowin.com
            </div>
          </div>
        </div>
      </section>

      {/* 🏁 Footer Navigation */}
      <footer className="px-6 py-20 text-center">
        <Link href="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 hover:text-indigo-500 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
          Back to Dashboard
        </Link>
      </footer>
    </div>
  );
};

export default GizlilikPolitikasi;
"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Ban,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Eye,
  Target,
  Home,
  ChevronRight,
  ShieldCheck,
  Flag,
  Info,
} from "lucide-react";

const HileKarsitiPolitika = () => {
  const prohibitedActions = [
    {
      title: "Bot ve Otomasyon",
      icon: Ban,
      color: "red",
      severity: "KRİTİK",
      description:
        "Otomatik araçlar, botlar veya scriptler kullanarak sistemin doğal işleyişine müdahale etmek.",
      penalty: "Hesap kalıcı kapatılır, kazançlar silinir.",
      examples: [
        "İzleme botları",
        "Tıklama scriptleri",
        "Tarayıcı eklentileri",
      ],
    },
    {
      title: "VPN ve Proxy",
      icon: ShieldAlert,
      color: "orange",
      severity: "YÜKSEK",
      description:
        "Gerçek konumunuzu gizlemek için VPN, Proxy veya IP maskeleme araçları kullanmak.",
      penalty: "Geçici askıya alma veya kalıcı ban.",
      examples: ["Ücretli/Ücretsiz VPN", "Tor Browser", "IP Değiştiriciler"],
    },
    {
      title: "Çoklu Hesap",
      icon: AlertTriangle,
      color: "amber",
      severity: "YÜKSEK",
      description:
        "Aynı kişinin birden fazla hesap oluşturarak sistemi manipüle etmesi.",
      penalty: "Tüm ilişkili hesaplar süresiz kapatılır.",
      examples: ["Sahte e-postalar", "Referans istismarı", "Sahte kimlik"],
    },
    {
      title: "Sistem İstismarı",
      icon: Zap,
      color: "rose",
      severity: "YÜKSEK",
      description:
        "Platform açıklarını (bug) bildirmek yerine haksız kazanç için kullanmak.",
      penalty: "Haksız kazancın iadesi ve hesap kısıtlaması.",
      examples: [
        "API manipülasyonu",
        "Süre atlatma hileleri",
        "Veri manipülasyonu",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300 pt-20">
      {/* 🚩 Top Alert Banner */}
      <div className="bg-red-600 dark:bg-red-500/10 border-b border-red-700 dark:border-red-500/20 py-2">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldAlert
            size={14}
            className="text-white dark:text-red-500 animate-pulse"
          />
          <p className="text-white dark:text-red-400 text-[10px] font-black uppercase tracking-widest">
            Sıfır Tolerans Politikası Uygulanmaktadır
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 🧭 Breadcrumb & Header */}
        <div className="mb-16">
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-red-600 transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-white font-bold">
              Hile Karşıtı Politika
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                Adil Oyun <br />
                <span className="text-red-600 dark:text-red-500 inline-flex items-center gap-3">
                  Gerçek Kazanç{" "}
                  <ShieldCheck size={48} className="md:w-16 md:h-16" />
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                ADSTOWIN ekosisteminde dürüstlük en büyük değerimizdir.
                Sistemimizi manipüle etmeye yönelik her türlü girişim, gelişmiş
                algoritmalarımız tarafından anlık olarak takip edilmektedir.
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-[2.5rem] shadow-xl dark:shadow-red-900/10 shrink-0 text-center">
              <div className="text-3xl font-black text-red-600 mb-1 font-mono">
                24/7
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Aktif Koruma
              </div>
            </div>
          </div>
        </div>

        {/* 🚫 Prohibited Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {prohibitedActions.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 hover:border-red-500/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-red-500/5"
            >
              <div
                className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 duration-500 bg-${item.color}-500/10 text-${item.color}-600 dark:text-${item.color}-500`}
              >
                <item.icon size={28} />
              </div>

              <div className="absolute top-8 right-8 text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 uppercase tracking-tighter">
                {item.severity}
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                {item.description}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/5 italic"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase flex items-center gap-2">
                    <Ban size={12} /> {item.penalty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🕵️ Detection & Penalties Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-3">
              <Eye className="text-red-600" /> Tespit Yöntemlerimiz
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "AI Analizi",
                  d: "Davranışsal patern analizi.",
                  i: Target,
                },
                {
                  t: "IP Denetimi",
                  d: "Lokasyon ve ağ doğrulama.",
                  i: ShieldAlert,
                },
                {
                  t: "Cihaz Parmak İzi",
                  d: "Benzersiz donanım takibi.",
                  i: Zap,
                },
                {
                  t: "Manuel Denetim",
                  d: "Uzman güvenlik ekibi onayı.",
                  i: CheckCircle,
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-4"
                >
                  <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                    <m.i size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {m.t}
                    </div>
                    <div className="text-xs text-slate-500">{m.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-red-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 italic leading-tight">
                İtiraz Hakkı
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Yanlışlıkla yasaklandığınızı mı düşünüyorsunuz? Kanıtlarınızla
                birlikte 48 saat içinde itiraz oluşturabilirsiniz.
              </p>
            </div>
            <button className="relative z-10 mt-8 w-full py-4 bg-white text-slate-900 dark:text-red-600 font-black rounded-2xl hover:scale-105 transition-all text-sm uppercase">
              İtiraz Formu Aç
            </button>
            <ShieldAlert
              size={120}
              className="absolute -right-8 -bottom-8 opacity-10 rotate-12"
            />
          </div>
        </div>

        {/* 📜 Final Notice Block */}
        <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-red-600 to-orange-500">
          <div className="bg-white dark:bg-[#0b0c10] rounded-[2.4rem] p-8 md:p-12 overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center shrink-0">
                <Flag className="text-red-600" size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  Önemli Hatırlatma
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  ADSTOWIN, reklam verenlerimizin bütçesini ve dürüst
                  kullanıcılarımızın hakkını korumak için milyonlarca veri
                  noktasını saniyeler içinde analiz eder. Hile yaparak elde
                  edilen kazançlar hiçbir zaman ödenmez ve yasal takip
                  başlatılabilir.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 📩 Support Link */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">
            Sormak istediğiniz bir şey mi var?{" "}
            <span className="text-red-600 dark:text-red-500 font-bold cursor-pointer hover:underline">
              Güvenlik Merkezi
            </span>{" "}
            ile iletişime geçin.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-red-600 flex items-center gap-2 transition-colors"
            >
              <Info size={14} /> Kullanım Koşulları
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-red-600 flex items-center gap-2 transition-colors"
            >
              <CheckCircle size={14} /> Güvenli Ödeme
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HileKarsitiPolitika;

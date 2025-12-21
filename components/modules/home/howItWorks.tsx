"use client";
import { motion } from "framer-motion";
import {
  UserPlus,
  PlayCircle,
  Coins,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Hızlı Kayıt & VIP Seçimi",
      desc: "Saniyeler içinde profilini oluştur. İster Ücretsiz ister Premium üye olarak kazanmaya başla.",
      detail: "Premium ile 2 kat kazanç ve özel biletler seni bekliyor.",
      icon: UserPlus,
      color: "from-blue-600 to-indigo-600",
      tag: "BAŞLANGIÇ",
    },
    {
      title: "İzle, Etkileşime Gir & Kazan",
      desc: "Sana özel seçilmiş reklamları izle. Premium üyeler için özel 10. saniye koduyla kazancını katla.",
      detail: "Normal: $0.005 | Premium: $0.01 kazanç fırsatı.",
      icon: PlayCircle,
      color: "from-indigo-600 to-purple-600",
      tag: "ETKİLEŞİM",
    },
    {
      title: "Çark & TKRİPTO Ekosistemi",
      desc: "Her saat başı çarkı çevir, nakit ve çekiliş bileti kazan. 2027 TKRİPTO vizyonuna ortak ol.",
      detail: "Ay sonu liderlik tablosunda yerini al, büyük ödülleri topla.",
      icon: Coins,
      color: "from-purple-600 to-emerald-500",
      tag: "EKOSİSTEM",
    },
  ];

  return (
    <div className="w-full bg-[#020617] py-32 relative overflow-hidden">
      {/* Lüks Arka Plan Işımaları */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Başlık Grubu */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Zap size={12} className="text-emerald-500 fill-emerald-500" />
            <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em]">
              Adstowin Rehberi
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Kazanca Giden{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent italic">
              Akıllı Yol
            </span>
          </h2>
          <p className="max-w-2xl text-slate-500 text-lg font-light leading-relaxed">
            Reklam verenlerle kullanıcıları şeffaf bir blockchain vizyonuyla
            buluşturan, Türkiye'nin en gelişmiş etkileşim platformunu keşfedin.
          </p>
        </div>

        {/* Adımlar Akışı */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bağlantı Çizgisi (Masaüstü) */}
          <div className="absolute top-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full flex flex-col items-center md:items-start text-center md:text-left">
                {/* İkon ve Numara */}
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] flex items-center justify-center relative shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    <div className="w-full h-full bg-[#020617] rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`}
                      />
                      <step.icon
                        size={32}
                        className="text-white relative z-10"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-black text-xs font-black flex items-center justify-center shadow-xl border-4 border-[#020617]">
                    0{i + 1}
                  </div>
                </div>

                {/* Etiket */}
                <span className="text-emerald-500 text-[9px] font-black tracking-widest uppercase mb-4 opacity-70">
                  {step.tag}
                </span>

                {/* Başlık ve Açıklama */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                  {step.desc}
                </p>

                {/* Detay Kartı (Lüks Bilgi Notu) */}
                <div className="mt-auto w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <ShieldCheck
                    size={16}
                    className="text-indigo-500 shrink-0 mt-0.5"
                  />
                  <p className="text-[11px] text-slate-500 italic leading-snug">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Ok İşareti (Masaüstü) */}
              {i < 2 && (
                <div className="absolute top-24 -right-4 z-20 hidden lg:block">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                    <ChevronRight
                      size={14}
                      className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Alt Bilgi Barı */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">
              Payoneer Entegrasyonu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">
              Litecoin API Hazır
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">
              WebSocket Canlı Sohbet
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Clock,
  Star,
  Gift,
  Megaphone,
  Info,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FortuneWheelPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [nextSpinTime, setNextSpinTime] = useState<string>("");
  const [canSpin, setCanSpin] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const wheelSegments = [
    {
      label: "Normal Bilet",
      prob: 74.94,
      color: "#1e293b",
      textColor: "#94a3b8",
    },
    { label: "Premium Bilet", prob: 25.0, color: "#4f46e5", textColor: "#fff" },
    { label: "0.10 $", prob: 0.5, color: "#10b981", textColor: "#fff" },
    { label: "0.30 $", prob: 0.1, color: "#f59e0b", textColor: "#fff" },
  ];

  const topSpinners = [
    {
      rank: 1,
      name: "Ceyhun",
      spins: 245,
      prize: "10 TK + 10$",
      color: "from-amber-400 to-yellow-600",
    },
    {
      rank: 2,
      name: "Demir",
      spins: 198,
      prize: "7 TK + 7$",
      color: "from-slate-300 to-slate-500",
    },
    {
      rank: 3,
      name: "Selin",
      spins: 167,
      prize: "5 TK + 5$",
      color: "from-orange-400 to-orange-700",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextHour = new Date();
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      const diff = nextHour.getTime() - now.getTime();
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setNextSpinTime(`${mins}d ${secs}s`);
      if (mins === 59 && secs === 59) setCanSpin(true);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const spinWheel = () => {
    if (isSpinning || !canSpin) return;
    setIsSpinning(true);
    setResult(null);

    const random = Math.random() * 100.54;
    let cumulative = 0;
    let winnerIndex = 0;
    for (let i = 0; i < wheelSegments.length; i++) {
      cumulative += wheelSegments[i].prob;
      if (random <= cumulative) {
        winnerIndex = i;
        break;
      }
    }

    const extraSpins = 8;
    const segmentAngle = 360 / wheelSegments.length;
    const targetAngle =
      extraSpins * 360 + winnerIndex * segmentAngle + segmentAngle / 2;
    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(wheelSegments[winnerIndex].label);
      setCanSpin(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-20 md:pt-28 pb-12 relative overflow-hidden">
      {/* Arka Plan Efektleri - Mobilde daha hafif */}
      <div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* SPONSOR BANNER - Mobilde daha kompakt */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <div className="group relative w-full h-16 md:h-20 bg-gradient-to-r from-indigo-950/40 via-slate-900/40 to-indigo-950/40 border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-xl">
            <div className="flex items-center gap-4 md:gap-6 opacity-80 px-4 text-center">
              <Megaphone className="text-indigo-400 w-4 h-4 hidden xs:block" />
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-indigo-200/60">
                Sponsorlu Reklam Alanı
              </span>
              <Megaphone className="text-indigo-400 w-4 h-4 hidden xs:block scale-x-[-1]" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* SOL: ÇARK BÖLÜMÜ */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden backdrop-blur-2xl shadow-2xl">
              <CardHeader className="text-center pt-8 md:pt-12 px-4">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                    <Crown
                      size={12}
                      className={
                        isPremium ? "text-amber-400" : "text-slate-400"
                      }
                    />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {isPremium ? "Premium Membership" : "Standard Account"}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 md:mb-4 italic">
                  FORTUNE <span className="text-indigo-500">WHEEL</span>
                </CardTitle>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-slate-500 text-[10px] md:text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <Zap size={12} className="text-indigo-400" /> Şansını Dene
                  </span>
                  <span className="hidden xs:block w-1 h-1 rounded-full bg-slate-700" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {nextSpinTime} kaldı
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col items-center py-8 md:py-12 relative">
                {/* ÇARK DIŞ HALKA */}
                <div className="relative p-2 md:p-4 rounded-full bg-gradient-to-b from-white/10 to-transparent">
                  <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-[450px] sm:h-[450px]">
                    {/* İbre */}
                    <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 z-30">
                      <div
                        className="w-6 h-10 md:w-8 md:h-12 bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.6)] border-2 border-white/20"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        }}
                      />
                    </div>

                    <motion.div
                      className="w-full h-full rounded-full border-[8px] md:border-[16px] border-slate-900 shadow-2xl relative overflow-hidden"
                      animate={{ rotate: rotation }}
                      transition={{ duration: 4.5, ease: [0.15, 0, 0.15, 1] }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `conic-gradient(from 0deg, 
                            ${wheelSegments[0].color} 0% 74.94%, 
                            ${wheelSegments[1].color} 74.94% 99.94%, 
                            ${wheelSegments[2].color} 99.94% 99.99%, 
                            ${wheelSegments[3].color} 99.99% 100%)`,
                        }}
                      />
                      {/* Segment Yazıları */}
                      {[0, 90, 180, 270].map((deg, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 flex justify-center pt-4 md:pt-8"
                          style={{ transform: `rotate(${deg}deg)` }}
                        >
                          <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                            Fortune
                          </span>
                        </div>
                      ))}
                      {/* Orta Göbek */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-slate-900 rounded-full border-[4px] md:border-[6px] border-white/5 flex items-center justify-center z-20 shadow-inner">
                        <Star className="text-indigo-500 w-6 h-6 md:w-8 md:h-8 fill-indigo-500 animate-pulse" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-10 md:mt-16 relative group w-full max-w-xs px-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl md:rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning || !canSpin}
                    className="relative w-full h-16 md:h-24 rounded-2xl md:rounded-[2.5rem] bg-white text-slate-950 hover:bg-slate-100 text-lg md:text-2xl font-black tracking-tighter shadow-2xl transition-all active:scale-95 disabled:opacity-20"
                  >
                    {isSpinning ? "BEKLEYİN..." : "ÇARKI ÇEVİR"}
                  </Button>
                </div>
              </CardContent>

              {/* KAZANMA MODAL - Mobilde padding ve font boyutu ayarlandı */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl z-50 rounded-[2.5rem] md:rounded-[4rem] p-6"
                  >
                    <div className="text-center space-y-4 md:space-y-6">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500 rounded-2xl rotate-12 flex items-center justify-center mx-auto shadow-2xl">
                        <Gift className="text-white w-8 h-8 md:w-12 md:h-12 -rotate-12" />
                      </div>
                      <h3 className="text-white text-lg md:text-2xl font-black tracking-widest uppercase opacity-60">
                        Muhteşem!
                      </h3>
                      <p className="text-4xl md:text-6xl text-white font-black tracking-tighter italic">
                        {result}
                      </p>
                      <Button
                        onClick={() => setResult(null)}
                        className="rounded-xl md:rounded-2xl px-8 md:px-10 h-12 md:h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold w-full md:w-auto"
                      >
                        Koleksiyona Ekle
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* LİDERLİK TABLOSU - Mobilde dikey, tablette/masaüstünde yan yana */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {topSpinners.map((user, idx) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={idx}
                  className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] flex flex-row sm:flex-col items-center gap-4 sm:gap-0 text-left sm:text-center relative overflow-hidden group"
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${user.color} flex items-center justify-center sm:mb-4 shadow-lg text-slate-950 font-black text-lg shrink-0`}
                  >
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base md:text-lg">
                      {user.name}
                    </h4>
                    <p className="text-[9px] md:text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2 sm:mb-4">
                      {user.spins} Çevirme
                    </p>
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px] md:text-xs font-bold text-emerald-400 inline-block w-full sm:block">
                      {user.prize}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SAĞ SÜTUN */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            {/* ÖDÜL HAVUZU */}
            <Card className="bg-white/5 border-white/10 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xs font-black tracking-[0.2em] uppercase text-slate-400 flex items-center gap-3">
                  <Trophy className="text-amber-500" size={16} /> Ödül Havuzu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3 md:space-y-4">
                {topSpinners.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 md:p-4 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/5 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-600">
                        {item.rank}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-white/80">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-black text-white">
                      {item.prize}
                    </span>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-purple-400" />
                    <span className="text-[9px] font-black tracking-widest uppercase text-slate-500">
                      Çekiliş Bonusları
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] p-3 bg-purple-500/5 rounded-xl border border-purple-500/10">
                    <span className="text-purple-200/60">Premium Ticket</span>
                    <span className="font-black text-purple-400">
                      3 TK + 3$
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OLASILIKLAR */}
            <Card className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] md:rounded-[3rem]">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <Info size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200/80">
                    Olasılık Verileri
                  </span>
                </div>
                <div className="space-y-4">
                  {wheelSegments.map((s, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">
                          {s.label}
                        </span>
                        <span className="text-[10px] font-black text-indigo-400">
                          %{s.prob}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.prob}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-indigo-500/40"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

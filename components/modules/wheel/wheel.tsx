"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Star, Gift, Megaphone, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FortuneWheelPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [nextSpinTime, setNextSpinTime] = useState<string>("");
  const [canSpin, setCanSpin] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const wheelSegments = [
    { label: "Normal Bilet", prob: 74.94, color: "#3b82f6" },
    { label: "Premium Bilet", prob: 25.0, color: "#a855f7" },
    { label: "0.10 $", prob: 0.5, color: "#10b981" },
    { label: "0.30 $", prob: 0.1, color: "#eab308" },
  ];

  const topSpinners = [
    { rank: 1, name: "Ceyhun", spins: 245, prize: "10 TK + 10$" },
    { rank: 2, name: "Demir", spins: 198, prize: "7 TK + 7$" },
    { rank: 3, name: "Selin", spins: 167, prize: "5 TK + 5$" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextHour = new Date();
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      const diff = nextHour.getTime() - now.getTime();
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setNextSpinTime(`${mins}dk ${secs}sn`);
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

    const extraSpins = 5;
    const segmentAngle = 360 / wheelSegments.length;
    const targetAngle =
      extraSpins * 360 +
      winnerIndex * segmentAngle +
      Math.random() * (segmentAngle * 0.8);
    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(wheelSegments[winnerIndex].label);
      setCanSpin(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 pt-24 pb-12 transition-colors duration-500">
      {/* 2- SABİT REKLAM ALANI */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="w-full h-24 bg-white dark:bg-indigo-600/10 border border-slate-200 dark:border-indigo-500/30 rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-sm dark:shadow-none group">
          <div className="flex items-center gap-4 z-10">
            <Megaphone className="text-indigo-600 dark:text-indigo-400 animate-bounce" />
            <span className="text-slate-600 dark:text-indigo-100 font-bold tracking-widest uppercase text-sm">
              Sponsorlu Reklam Alanı
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SOL KOLON: ÇARK */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-md">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-500 text-xs font-bold uppercase tracking-tighter">
                  {isPremium
                    ? "Premium Avantajı: Saatte 2 Çevirme"
                    : "Normal Üye: Saatte 1 Çevirme"}
                </div>
              </div>
              <CardTitle className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
                ŞANS ÇARKINI ÇEVİR
              </CardTitle>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Sistem her saat başı yenilenir.
              </p>
            </CardHeader>

            <CardContent className="flex flex-col items-center py-10 relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 mb-12">
                {/* Pointer */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg">
                  <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-600"></div>
                </div>

                {/* Wheel Visual */}
                <div
                  className="w-full h-full rounded-full border-[12px] border-slate-100 dark:border-slate-800 shadow-2xl transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) relative overflow-hidden"
                  style={{ transform: `rotate(-${rotation}deg)` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `conic-gradient(from 0deg, #3b82f6 0% 74.94%, #a855f7 74.94% 99.94%, #10b981 99.94% 99.99%, #eab308 99.99% 100%)`,
                    }}
                  ></div>
                  {/* Merkez Göbek */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-slate-900 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center z-10 shadow-xl">
                    <Star className="text-amber-500 w-6 h-6 fill-amber-500" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Button
                  onClick={spinWheel}
                  disabled={isSpinning || !canSpin}
                  className="h-20 px-16 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-30"
                >
                  {isSpinning ? "HESAPLANIYOR..." : "ŞİMDİ ÇEVİR"}
                </Button>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-sm bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10">
                  <Clock size={16} /> {nextSpinTime}
                </div>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md z-30 rounded-[3rem]"
                  >
                    <div className="text-center space-y-4 p-8">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-lg">
                        <Gift className="text-white w-10 h-10" />
                      </div>
                      <h3 className="text-slate-900 dark:text-white text-3xl font-black italic">
                        TEBRİKLER!
                      </h3>
                      <p className="text-4xl text-emerald-600 dark:text-emerald-400 font-black tracking-tighter">
                        {result}
                      </p>
                      <Button
                        onClick={() => setResult(null)}
                        className="rounded-xl px-8"
                      >
                        Kapat
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* 27- EN ÇOK ÇEVİRENLER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSpinners.map((user, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center relative shadow-sm"
              >
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                    idx === 0
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white"
                  }`}
                >
                  RANK #{user.rank}
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 font-bold">
                  {user.name.charAt(0)}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  {user.spins} Çevirme
                </p>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-100 dark:border-transparent">
                  {user.prize}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ KOLON */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="text-amber-500" size={20} /> Aylık Ödül
                Havuzu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    label: "1. Kişi",
                    prize: "10 TK + 10$",
                    color: "text-amber-600 dark:text-amber-500",
                  },
                  {
                    label: "2. Kişi",
                    prize: "7 TK + 7$",
                    color: "text-slate-600 dark:text-slate-300",
                  },
                  {
                    label: "3. Kişi",
                    prize: "5 TK + 5$",
                    color: "text-orange-700 dark:text-orange-600",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold ${item.color}`}>
                      {item.prize}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Çekiliş Ödülleri
                </p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Premium Bilet (1 Kişi)
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    3 TK + 3$
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">
                    Normal Bilet (1 Kişi)
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    1 TK + 1$
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-50 dark:bg-indigo-600/10 border-indigo-100 dark:border-indigo-500/20 rounded-[2.5rem]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold">
                <Info size={18} />
                <span className="text-sm">Kazanma Olasılıkları</span>
              </div>
              <div className="space-y-2">
                {wheelSegments.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="text-slate-500 dark:text-slate-400">
                      {s.label}
                    </span>
                    <span className="font-mono font-bold text-slate-700 dark:text-white">
                      %{s.prob}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

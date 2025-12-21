"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Crown,
  Clock,
  DollarSign,
  ShieldCheck,
  Loader2,
  X,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  isPremium: boolean;
  balance: number;
  tkripto: number;
}

interface Ad {
  id: number;
  title: string;
  description: string | null;
  targetUrl: string;
  imageUrl: string | null;
  adType: "NORMAL" | "PREMIUM";
  totalImpressions: number;
  remainingImpressions: number;
  totalClicks: number;
  createdAt: string;
}

export default function WatchAdsPage() {
  const [userData, setUserData] = useState<UserAccount | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAd, setActiveAd] = useState<Ad | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isWatching, setIsWatching] = useState(false);
  const [premiumCode, setPremiumCode] = useState<number | null>(null);
  const [userInputCode, setUserInputCode] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      await Promise.all([fetchUserAccount(), fetchAds()]);
      setLoading(false);
    };
    initPage();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Kullanıcı bilgileri alınamadı");
      const data = await response.json();
      if (data.user) setUserData(data.user);
    } catch (error) {
      toast.error("Profil bilgileri yüklenemedi");
    }
  };

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/ads");
      if (response.ok) {
        const data = await response.json();
        setAds(data);
      }
    } catch (error) {
      toast.error("Reklamlar yüklenirken bir hata oluştu");
    }
  };

  const recordAdView = async (campaignId: number) => {
    try {
      const response = await fetch("/api/ads/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId }),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const fetchVerificationCode = async (campaignId: number) => {
    try {
      const response = await fetch("/api/ads/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId }),
      });
      const data = await response.json();
      return data.code;
    } catch (error) {
      return null;
    }
  };

  const completeAd = async (verificationCode?: number) => {
    if (!activeAd) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ads/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: activeAd.id,
          verificationCode: verificationCode || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "İşlem başarısız");
      }

      const data = await response.json();
      setIsCompleted(true);
      toast.success(`${data.earned}$ kazandınız!`);

      setAds((prev) => prev.filter((ad) => ad.id !== activeAd.id));

      setTimeout(() => {
        setActiveAd(null);
        resetAdState();
        fetchUserAccount();
      }, 2500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWatching && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (activeAd?.adType === "PREMIUM" && newTime === 7 && !premiumCode) {
            fetchVerificationCode(activeAd.id).then((code) => {
              if (code !== null) setPremiumCode(code);
            });
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isWatching && !isCompleted) {
      setIsWatching(false);
      if (activeAd?.adType === "NORMAL") completeAd();
    }
    return () => clearInterval(timer);
  }, [isWatching, timeLeft, activeAd, isCompleted, premiumCode]);

  const handleStartAd = async (ad: Ad) => {
    const success = await recordAdView(ad.id);
    if (!success) {
      toast.error("Reklam başlatılamadı.");
      return;
    }

    setActiveAd(ad);
    setTimeLeft(15);
    setIsWatching(true);
    setIsCompleted(false);
    setPremiumCode(null);
    setUserInputCode("");
    setIsMuted(true);
  };

  const handleVerifyAndComplete = () => {
    if (!activeAd || !premiumCode) return;
    if (parseInt(userInputCode) === premiumCode) {
      completeAd(premiumCode);
    } else {
      toast.error("Hatalı kod! Lütfen videoyu dikkatli izleyin.");
      setUserInputCode("");
    }
  };

  const resetAdState = () => {
    setTimeLeft(15);
    setIsWatching(false);
    setIsCompleted(false);
    setPremiumCode(null);
    setUserInputCode("");
  };

  const getReward = (ad: Ad) => {
    if (ad.adType === "PREMIUM") return 0.01;
    return userData?.isPremium ? 0.005 : 0.001;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Reklam İzle & Kazan
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {userData?.name}, günlük reklam limitini doldurarak gelirini
              artır.
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold">
            Aktif Reklamlar: {ads.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all shadow-sm"
            >
              {ad.adType === "PREMIUM" && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white p-2 rounded-xl z-10 shadow-lg">
                  <Crown size={18} />
                </div>
              )}

              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
                {ad.imageUrl ? (
                  <img
                    src={ad.imageUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <Play size={40} className="text-indigo-500 opacity-20" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg truncate">
                    {ad.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock size={12} /> 15s
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500">
                      <DollarSign size={12} /> +${getReward(ad).toFixed(3)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleStartAd(ad)}
                  className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-6 font-bold shadow-indigo-500/20 shadow-lg"
                >
                  İzlemeye Başla
                </Button>
              </div>
            </div>
          ))}
        </div>

        {ads.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-300 dark:border-white/10">
            <Play size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">
              Şu an için yeni reklam bulunmuyor.
            </p>
          </div>
        )}
      </div>

      {/* FULL SCREEN AD MODAL */}
      <AnimatePresence>
        {activeAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* VIDEO PLAYER */}
              <video
                ref={videoRef}
                src={activeAd.targetUrl}
                className="w-full h-full object-contain pointer-events-none"
                autoPlay
                muted={isMuted}
                playsInline
              />

              {/* OVERLAY CONTROLS */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                <div className="flex flex-col gap-2">
                  <div className="bg-black/50 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 text-white">
                    <Clock
                      className={`text-indigo-400 ${
                        timeLeft > 0 ? "animate-spin" : ""
                      }`}
                      size={24}
                    />
                    <span className="font-mono text-3xl font-black">
                      {timeLeft}s
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/50 backdrop-blur-xl p-3 rounded-xl border border-white/10 text-white w-fit"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>

                {/* EXIT BUTTON (Only visible when time is up) */}
                {timeLeft === 0 && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => {
                      setActiveAd(null);
                      resetAdState();
                    }}
                    className="bg-red-500 hover:bg-red-600 p-4 rounded-2xl text-white shadow-2xl"
                  >
                    <X size={32} />
                  </motion.button>
                )}
              </div>

              {/* PREMIUM CODE DISPLAY */}
              {premiumCode !== null && timeLeft > 0 && !isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-32 bg-amber-500 text-white px-10 py-5 rounded-[2rem] text-4xl font-black shadow-2xl border-4 border-white/20 z-10"
                >
                  KOD: {premiumCode}
                </motion.div>
              )}

              {/* PROGRESS BAR */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>

              {/* VERIFICATION SCREEN */}
              {timeLeft === 0 &&
                activeAd.adType === "PREMIUM" &&
                !isCompleted && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                    className="absolute inset-0 bg-slate-900/90 flex items-center justify-center p-6 z-30"
                  >
                    <div className="max-w-md w-full space-y-6 text-center">
                      <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto">
                        <ShieldCheck size={48} className="text-indigo-400" />
                      </div>
                      <h2 className="text-white text-3xl font-black italic">
                        DOĞRULAMA GEREKLİ
                      </h2>
                      <p className="text-slate-400">
                        Videoda görünen 4 haneli kodu aşağıdaki kutucuğa yazın.
                      </p>

                      <input
                        type="number"
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        className="w-full bg-white/10 border-2 border-white/20 rounded-[1.5rem] p-6 text-white text-center text-4xl font-black focus:border-indigo-500 outline-none transition-all tracking-[0.5em]"
                        placeholder="----"
                        autoFocus
                      />

                      <Button
                        onClick={handleVerifyAndComplete}
                        disabled={isSubmitting || userInputCode.length < 1}
                        className="w-full py-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] text-xl font-black uppercase"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Ödülü Hesaba Aktar"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

              {/* SUCCESS SCREEN */}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-emerald-500 flex flex-col items-center justify-center z-50 text-white p-6"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-9xl mb-6"
                  >
                    💎
                  </motion.div>
                  <h2 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">
                    Mükemmel!
                  </h2>
                  <p className="text-emerald-100 text-xl font-medium">
                    Ödülünüz başarıyla tanımlandı.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  Volume2,
  VolumeX,
  Zap,
  Gem,
  ChevronRight,
  Sparkles,
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
    <div className="min-h-screen bg-[#020617] text-white py-30 px-4 md:px-8 relative overflow-hidden">
      {/* Arka Plan Sanat Eseri */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Bölümü */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10 italic">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-indigo-500"></span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-indigo-400">
                Premium Revenue Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              ELITE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                STREAMS
              </span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 max-w-md">
              Seçkin içerikleri izleyerek dijital varlıklarını büyüt. Her saniye
              değerlidir.
            </p>
          </motion.div>

          <div className="flex flex-col items-end gap-2 text-right">
            <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Mevcut Havuz
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xl font-black">
                  {ads.length} Aktif Yayın
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reklam Grid - Lüks Kart Tasarımı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Premium Badge */}
              {ad.adType === "PREMIUM" && (
                <div className="absolute top-6 right-6 bg-gradient-to-br from-amber-400 to-orange-600 p-2.5 rounded-2xl z-20 shadow-xl ring-4 ring-[#0a0f1e]">
                  <Crown size={16} className="text-white" />
                </div>
              )}

              {/* Resim Alanı - Sinematik Overlay */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent z-10" />
                {ad.imageUrl ? (
                  <img
                    src={ad.imageUrl}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                ) : (
                  <div className="w-full h-full bg-indigo-500/5 flex items-center justify-center">
                    <Zap size={48} className="text-indigo-500/20" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play fill="white" size={24} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Kart İçeriği */}
              <div className="p-8 space-y-6 relative">
                <div>
                  <h3 className="text-xl font-black tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-1 italic">
                    {ad.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <Clock size={12} className="text-indigo-400" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                        15 SANİYE
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <DollarSign size={12} className="text-emerald-500" />
                      <span className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter italic">
                        +${getReward(ad).toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartAd(ad)}
                  className="w-full py-4 bg-white text-[#020617] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 group/btn italic"
                >
                  OTURUMU BAŞLAT
                  <ChevronRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {ads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-slate-700" />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-sm italic">
              Şu an yayınlanacak içerik bulunamadı
            </p>
          </motion.div>
        )}
      </div>

      {/* FULL SCREEN AD MODAL - Sinematik Deneyim */}
      <AnimatePresence>
        {activeAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#020617] flex items-center justify-center"
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
              {/* VIDEO - Sinematik Çerçeve */}
              <div className="relative w-full max-w-5xl aspect-video shadow-[0_0_100px_rgba(79,70,229,0.2)]">
                <video
                  ref={videoRef}
                  src={activeAd.targetUrl}
                  className="w-full h-full object-cover rounded-[2rem] border border-white/10"
                  autoPlay
                  muted={isMuted}
                  playsInline
                />

                {/* Sol Üst: Zamanlayıcı */}
                <div className="absolute -top-10 left-4 md:-left-12 flex flex-col gap-4">
                  <div className="bg-black/80 backdrop-blur-2xl px-6 py-4 rounded-[1.5rem] border border-white/10 flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.1"
                        />
                        <motion.circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeDasharray="113.1"
                          animate={{
                            strokeDashoffset:
                              113.1 - (113.1 * (15 - timeLeft)) / 15,
                          }}
                        />
                      </svg>
                      <span className="absolute font-black text-sm">
                        {timeLeft}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Kalan Süre
                      </span>
                      <span className="text-lg font-black italic uppercase tracking-tighter">
                        Aktif Oturum
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sağ Üst: Ses Kontrol */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute -top-10 -right-4 md:-right-12 p-5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>

              {/* PREMIUM CODE DISPLAY - Elegant Style */}
              {premiumCode !== null && timeLeft > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-12 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] font-black tracking-[0.5em] text-amber-500 uppercase italic">
                    Doğrulama Anahtarı
                  </p>
                  <div className="bg-gradient-to-br from-amber-400 to-orange-600 text-[#020617] px-12 py-4 rounded-2xl text-4xl font-black shadow-[0_10px_40px_rgba(245,158,11,0.3)] ring-4 ring-amber-500/20">
                    {premiumCode}
                  </div>
                </motion.div>
              )}

              {/* PROGRESS LINE */}
              <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                />
              </div>

              {/* VERIFICATION MODAL - Ultra Modern Blur */}
              {timeLeft === 0 &&
                activeAd.adType === "PREMIUM" &&
                !isCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-[160] backdrop-blur-[30px] bg-[#020617]/80 flex items-center justify-center p-6"
                  >
                    <div className="max-w-md w-full text-center space-y-8">
                      <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-indigo-500/20">
                        <ShieldCheck size={48} className="text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-4xl font-black italic tracking-tighter mb-2 italic uppercase">
                          Güvenli Aktarım
                        </h2>
                        <p className="text-slate-400 font-medium">
                          Lütfen videoda gördüğünüz kodu girerek ödülü
                          hesabınıza transfer edin.
                        </p>
                      </div>

                      <input
                        type="number"
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        className="w-full bg-white/[0.03] border-2 border-white/5 rounded-3xl p-8 text-white text-center text-5xl font-black focus:border-indigo-500 outline-none transition-all tracking-[0.4em] italic shadow-inner placeholder:text-white/5"
                        placeholder="0000"
                        autoFocus
                      />

                      <Button
                        onClick={handleVerifyAndComplete}
                        disabled={isSubmitting || userInputCode.length < 1}
                        className="w-full py-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] text-lg font-black uppercase italic tracking-widest transition-all shadow-2xl shadow-indigo-600/30"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "AKTARIYI TAMAMLA"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

              {/* SUCCESS OVERLAY */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-[170] bg-emerald-500 flex flex-col items-center justify-center text-white italic"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="mb-8"
                  >
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl">
                      <Gem size={64} className="text-emerald-500" />
                    </div>
                  </motion.div>
                  <h2 className="text-6xl font-black tracking-tighter uppercase mb-4">
                    Başarılı!
                  </h2>
                  <p className="text-emerald-100 text-xl font-bold tracking-widest uppercase opacity-80">
                    Varlıklar Hesabınıza İşlendi
                  </p>
                </motion.div>
              )}

              {/* EXIT - Sadece süre bittiğinde */}
              {timeLeft === 0 &&
                !isCompleted &&
                activeAd.adType === "NORMAL" && (
                  <button
                    onClick={() => {
                      setActiveAd(null);
                      resetAdState();
                    }}
                    className="absolute top-8 right-8 p-6 bg-white/5 hover:bg-red-500 rounded-full transition-all group"
                  >
                    <X
                      size={32}
                      className="group-hover:rotate-90 transition-transform duration-500"
                    />
                  </button>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

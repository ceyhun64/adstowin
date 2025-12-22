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
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// --- TİPLER ---
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

  // --- SAYFA BAŞLATMA ---
  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      await Promise.all([fetchUserAccount(), fetchAds()]);
      setLoading(false);
    };
    initPage();
  }, []);

  // --- API FONKSİYONLARI ---
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

  // --- TIMER MANTIĞI ---
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

  // --- HANDLERS ---
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
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-400" />
          <div className="absolute inset-0 blur-2xl bg-indigo-500/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Arka Plan Dekoratif Blurlar */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-slate-200 dark:border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 mb-4 transition-colors">
              <TrendingUp
                size={14}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                Premium Revenue Hub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
              ELITE{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                STREAMS
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-4 max-w-md">
              Yüksek kaliteli içerikleri izleyerek varlıklarını büyüt. Her
              saniye değerlidir.
            </p>
          </motion.div>

          <div className="flex gap-4">
            <div className="px-8 py-4 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Aktif Havuz
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-2xl font-black">{ads.length} Yayın</span>
              </div>
            </div>
          </div>
        </header>

        {/* Reklam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ads.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:border-indigo-500/30 transition-all duration-500 shadow-sm"
            >
              {ad.adType === "PREMIUM" && (
                <div className="absolute top-6 right-6 bg-gradient-to-br from-amber-400 to-orange-600 p-3 rounded-2xl z-20 shadow-lg ring-4 ring-white dark:ring-[#0a0f1e]">
                  <Crown size={18} className="text-white" />
                </div>
              )}

              {/* Resim Alanı */}
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0f1e] via-transparent to-transparent z-10" />
                {ad.imageUrl ? (
                  <img
                    src={ad.imageUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-indigo-500/5 flex items-center justify-center">
                    <Zap
                      size={48}
                      className="text-slate-300 dark:text-indigo-500/20"
                    />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* İçerik Alanı */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight line-clamp-1 italic text-slate-800 dark:text-slate-100 uppercase transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {ad.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                      <Clock size={12} /> 15 Saniye
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter italic">
                      <DollarSign size={12} /> +${getReward(ad).toFixed(3)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartAd(ad)}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 italic shadow-lg shadow-slate-200 dark:shadow-none"
                >
                  OTURUMU BAŞLAT
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Yayın Yoksa */}
        {ads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3rem] bg-white dark:bg-white/[0.01]"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
              <Sparkles
                size={32}
                className="text-slate-300 dark:text-slate-600"
              />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
              Şu an yayınlanacak içerik bulunamadı
            </p>
          </motion.div>
        )}
      </div>

      {/* FULL SCREEN AD MODAL */}
      <AnimatePresence>
        {activeAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Sinematik Video Çerçevesi */}
              <div className="relative w-full max-w-5xl aspect-video px-4">
                <video
                  ref={videoRef}
                  src={activeAd.targetUrl}
                  className="w-full h-full object-cover rounded-[2.5rem] shadow-[0_0_100px_rgba(79,70,229,0.3)] border border-white/10"
                  autoPlay
                  muted={isMuted}
                  playsInline
                />

                {/* HUD Bilgileri */}
                <div className="absolute -top-12 left-8 right-8 flex justify-between items-end">
                  <div className="bg-black/60 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90 absolute">
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
                      <span className="font-black text-sm text-white">
                        {timeLeft}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        Kalan Süre
                      </span>
                      <span className="text-lg font-black text-white italic leading-none mt-1 uppercase tracking-tighter">
                        Aktif Oturum
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-5 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
              </div>

              {/* Premium Kod Alanı */}
              {premiumCode !== null && timeLeft > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-16 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] font-black tracking-[0.5em] text-amber-500 uppercase italic">
                    Doğrulama Anahtarı
                  </p>
                  <div className="bg-gradient-to-br from-amber-400 to-orange-600 text-black px-14 py-6 rounded-3xl text-5xl font-black shadow-[0_20px_50px_rgba(245,158,11,0.3)] ring-4 ring-amber-500/20">
                    {premiumCode}
                  </div>
                </motion.div>
              )}

              {/* Alt İlerleme Çubuğu */}
              <div className="fixed bottom-0 left-0 w-full h-1.5 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                />
              </div>

              {/* Doğrulama Formu */}
              {timeLeft === 0 &&
                activeAd.adType === "PREMIUM" &&
                !isCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-[160] backdrop-blur-[40px] bg-black/80 flex items-center justify-center p-6"
                  >
                    <div className="max-w-md w-full text-center space-y-8">
                      <div className="w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-indigo-500/30">
                        <ShieldCheck size={48} className="text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase mb-2">
                          Güvenli Aktarım
                        </h2>
                        <p className="text-slate-400 font-medium">
                          Videodaki kodu girerek ödülü hesabınıza transfer edin.
                        </p>
                      </div>

                      <input
                        type="number"
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        className="w-full bg-white/5 border-2 border-white/10 rounded-[2rem] p-8 text-white text-center text-5xl font-black focus:border-indigo-500 outline-none transition-all placeholder:text-white/5 tracking-[0.2em]"
                        placeholder="0000"
                        autoFocus
                      />

                      <Button
                        onClick={handleVerifyAndComplete}
                        disabled={isSubmitting || userInputCode.length < 1}
                        className="w-full py-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl text-xl font-black italic tracking-widest shadow-2xl shadow-indigo-600/30 transition-all uppercase"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Aktarıyı Tamamla"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

              {/* Başarı Ekranı */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-[200] bg-emerald-600 flex flex-col items-center justify-center text-white italic"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="mb-8"
                  >
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-black/20">
                      <Gem size={64} className="text-emerald-600" />
                    </div>
                  </motion.div>
                  <h2 className="text-7xl font-black tracking-tighter uppercase mb-2">
                    Başarılı!
                  </h2>
                  <p className="text-emerald-100 text-xl font-bold tracking-widest uppercase opacity-80">
                    Varlıklar Hesabınıza İşlendi
                  </p>
                </motion.div>
              )}

              {/* Kapatma Butonu (Normal Reklamlar İçin) */}
              {timeLeft === 0 &&
                !isCompleted &&
                activeAd.adType === "NORMAL" && (
                  <button
                    onClick={() => {
                      setActiveAd(null);
                      resetAdState();
                    }}
                    className="absolute top-10 right-10 p-6 bg-white/10 hover:bg-red-500 rounded-full transition-all group"
                  >
                    <X
                      size={32}
                      className="text-white group-hover:rotate-90 transition-transform"
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

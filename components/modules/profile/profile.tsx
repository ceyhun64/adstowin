"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  LogOut,
  Loader2,
  CreditCard,
  Crown,
  Lock,
  ArrowRight,
  TrendingUp,
  Coins,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Interface (API'nize göre güncel kalmalı)
interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  isPremium: boolean;
  balance: number;
  tkripto: number;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.status === 401 || response.status === 403) {
        setUserData(null);
        return;
      }
      const data = await response.json();
      if (data.user) setUserData(data.user);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast.success("Oturum kapatılıyor...");
    setTimeout(() => router.push("/auth/register"), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          Profil Hazırlanıyor...
        </p>
      </div>
    );
  }

  // --- YETKİSİZ ERİŞİM EKRANI (Profesyonel Fallback) ---
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-6 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-10 rounded-[2.5rem] shadow-xl text-center backdrop-blur-md"
        >
          <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight mb-4">
            Erişim Kısıtlı
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Bu özel alanı görüntülemek için yetkiniz bulunmuyor. Lütfen
            hesabınıza giriş yapın.
          </p>
          <button
            onClick={() => router.push("/auth/register")}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black italic transition-all active:scale-95 flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20"
          >
            Giriş Yap veya Kayıt Ol
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  // --- ANA PROFİL EKRANI ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white py-24 md:py-32 px-4 md:px-8 relative overflow-hidden transition-colors duration-500">
      {/* Arka Plan Dekoratif Blur (Light Mode'da yumuşak, Dark Mode'da neon) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-purple-500/10 dark:bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Üst Bar / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-indigo-600 dark:text-indigo-400">
                Kullanıcı Portalı
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">
              Selam,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:to-white/40">
                {userData.name}
              </span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4 bg-white/50 dark:bg-white/5 p-2 rounded-[2rem] border border-slate-200 dark:border-white/10 backdrop-blur-sm">
            <button
              onClick={() => router.push("/settings")}
              className="p-4 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
              title="Ayarlar"
            >
              <Settings className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />
            <button
              onClick={handleLogout}
              className="px-6 py-4 rounded-2xl bg-red-50 dark:bg-red-500/5 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all flex items-center gap-3 group border border-red-100 dark:border-red-500/10"
            >
              <span className="text-sm font-black italic text-red-600 dark:text-red-400">
                ÇIKIŞ
              </span>
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Ana Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 italic">
          {/* Sol Panel: Finansal Özet */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bakiye Kartı (Modern Glassmorphism) */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative p-10 rounded-[3rem] bg-white dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-900 border border-slate-200 dark:border-indigo-400/20 shadow-xl dark:shadow-indigo-900/40 overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CreditCard
                    size={200}
                    className="text-slate-900 dark:text-white"
                  />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-200" />
                    <p className="text-[11px] font-black tracking-widest uppercase text-slate-500 dark:text-indigo-100/60">
                      Net Kullanılabilir Bakiye
                    </p>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
                    $
                    {userData.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                </div>
              </motion.div>

              {/* Kripto Varlığı */}
              <motion.div
                whileHover={{ y: -8 }}
                className="relative p-10 rounded-[3rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden group"
              >
                <div className="absolute -bottom-10 -left-10 opacity-5 group-hover:rotate-12 transition-transform">
                  <Coins
                    size={180}
                    className="text-slate-900 dark:text-white"
                  />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <p className="text-[11px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
                      TK Kripto Portföyü
                    </p>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                    {userData.tkripto}{" "}
                    <span className="text-2xl text-purple-600 dark:text-purple-500">
                      TK
                    </span>
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* Profil Detay Özeti */}
            <div className="p-8 md:p-12 rounded-[3rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl font-black text-indigo-600 dark:text-white border border-slate-200 dark:border-white/10">
                  {userData.name[0]}
                  {userData.surname[0]}
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-black">
                    {userData.name} {userData.surname}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel: Üyelik & Status */}
          <div className="lg:col-span-4 space-y-8 italic">
            <div
              className={`p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-between ${
                userData.isPremium
                  ? "bg-gradient-to-br from-amber-50 dark:from-amber-500/10 to-transparent border-amber-200 dark:border-amber-500/30 shadow-amber-500/10 shadow-2xl"
                  : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 shadow-xl"
              }`}
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-4 rounded-2xl ${
                      userData.isPremium
                        ? "bg-amber-100 dark:bg-amber-500/20"
                        : "bg-slate-100 dark:bg-white/5"
                    }`}
                  >
                    <Crown
                      className={
                        userData.isPremium
                          ? "text-amber-600 dark:text-amber-500"
                          : "text-slate-400"
                      }
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Plan Türü
                    </p>
                    <h4 className="font-black text-2xl tracking-tighter">
                      {userData.isPremium ? "Elite Member" : "Standart"}
                    </h4>
                  </div>
                </div>

                {!userData.isPremium && (
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">
                    Kazançlarınızı 5 katına çıkarmak ve reklamları kaldırmak
                    için Elite plana yükseltin.
                  </p>
                )}
              </div>

              {!userData.isPremium ? (
                <button className="w-full mt-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-3xl font-black text-sm hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-slate-900/20">
                  PREMIUM'A GEÇ
                </button>
              ) : (
                <div className="mt-10 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center">
                  <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-widest">
                    Tüm Özellikler Aktif
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

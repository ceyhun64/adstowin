"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Ticket,
  Star,
  Sparkles,
  Crown,
  DollarSign,
  Calendar,
  TrendingUp,
  Loader2,
  Settings,
  LogOut,
  X,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  isPremium: boolean;
  membershipType: string;
  balance: number;
  tkripto: number;
  spinCount: number;
  monthlySpinCount: number;
  premiumTickets: number;
  normalTickets: number;
  lastSpinAt: string | null;
  adsRemoved: boolean;
  premiumStartDate: string | null;
  premiumEndDate: string | null;
  language: string;
  darkMode: boolean;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRemoveAds, setShowRemoveAds] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Profil yüklenemedi");

      const data = await response.json();
      if (data.user) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Profil hatası:", error);
      toast.error("Profil bilgileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Implement logout logic
    toast.success("Çıkış yapılıyor...");
    setTimeout(() => router.push("/login"), 1000);
  };

  const getRemainingPremiumDays = () => {
    if (!userData?.premiumEndDate) return 0;
    const end = new Date(userData.premiumEndDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getMemberSince = () => {
    if (!userData?.createdAt) return "";
    const date = new Date(userData.createdAt);
    return date.toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Profil bulunamadı
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl"
          >
            Ana Sayfa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              Profilim
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Hesap bilgilerinizi ve istatistiklerinizi görüntüleyin
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-all"
            >
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-red-500/50 transition-all"
            >
              <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Premium Banner */}
        {!userData.isPremium && showRemoveAds && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-[2px]"
          >
            <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 relative">
              <button
                onClick={() => setShowRemoveAds(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-pink-500/20 rounded-2xl">
                  <Crown className="w-8 h-8 text-amber-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Premium'a Yükselt
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Reklamları kaldır ve özel avantajlardan yararlan!
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Şimdi Yükselt
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative mx-auto md:mx-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                    {userData.name.charAt(0)}
                    {userData.surname.charAt(0)}
                  </div>
                  {userData.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 p-2 rounded-xl shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {userData.name} {userData.surname}
                    </h2>
                    {userData.isPremium && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 justify-center md:justify-start">
                      <Mail className="w-4 h-4 text-indigo-500" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 justify-center md:justify-start">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{userData.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 justify-center md:justify-start">
                      <Calendar className="w-4 h-4 text-pink-500" />
                      <span>Üye: {getMemberSince()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-[2.5rem] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">
                  Bakiye
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  ${userData.balance.toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-[2.5rem] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">
                  TKripto
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {userData.tkripto.toFixed(4)}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
                <Sparkles className="w-6 h-6 text-indigo-500 mb-3" />
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.spinCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Toplam Çevirme
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500 mb-3" />
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.premiumTickets}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Premium Bilet
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all">
                <Ticket className="w-6 h-6 text-pink-500 mb-3" />
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.normalTickets}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Normal Bilet
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                <Calendar className="w-6 h-6 text-purple-500 mb-3" />
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.monthlySpinCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Aylık Çevirme
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
                <Globe className="w-6 h-6 text-emerald-500 mb-3" />
                <div className="text-xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.language}
                </div>
                <div className="text-xs text-slate-500 font-medium">Dil</div>
              </div>

              <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-slate-500/50 transition-all">
                {userData.darkMode ? (
                  <Moon className="w-6 h-6 text-slate-500 mb-3" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-500 mb-3" />
                )}
                <div className="text-xl font-black text-slate-900 dark:text-white mb-1">
                  {userData.darkMode ? "Dark" : "Light"}
                </div>
                <div className="text-xs text-slate-500 font-medium">Tema</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Hızlı İşlemler
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/wheel")}
                  className="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  Çark Çevir
                </button>
                <button
                  onClick={() => router.push("/watch-ads")}
                  className="w-full p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl hover:border-indigo-500/50 transition-all"
                >
                  Reklam İzle
                </button>
                <button
                  onClick={() => router.push("/tickets")}
                  className="w-full p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl hover:border-indigo-500/50 transition-all"
                >
                  Biletlerim
                </button>
              </div>
            </div>

            {/* Premium Status */}
            {userData.isPremium ? (
              <div className="bg-gradient-to-br from-amber-500/20 to-pink-500/20 border border-amber-500/30 rounded-[2.5rem] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-amber-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Premium Üye
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      Kalan Gün
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {getRemainingPremiumDays()} gün
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-pink-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (getRemainingPremiumDays() / 30) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-500/20 to-pink-500/20 border border-amber-500/30 rounded-[2.5rem] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-6 h-6 text-amber-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Premium Avantajları
                  </h3>
                </div>
                <ul className="space-y-3 mb-4">
                  {[
                    "Reklamsız deneyim",
                    "5x daha fazla kazanç",
                    "Ekstra günlük çevirme",
                    "Özel premium biletler",
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full p-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Premium'a Geç
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

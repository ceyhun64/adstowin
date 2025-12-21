"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
  ChevronRight,
  ArrowUpRight,
  CreditCard,
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
      if (data.user) setUserData(data.user);
    } catch (error) {
      toast.error("Profil bilgileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast.success("Güvenli çıkış yapılıyor...");
    setTimeout(() => router.push("/login"), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-indigo-500" />
        </motion.div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-30 px-4 md:px-8 relative overflow-hidden">
      {/* Arka Plan Sanat Eseri */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Üst Bar / Navigasyon Özeti */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-indigo-500"></span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400">
                Executive Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white italic">
              Hoş Geldin,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                {userData.name}
              </span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all group"
            >
              <Settings className="w-5 h-5 text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <button
              onClick={handleLogout}
              className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 transition-all group"
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Ana Grid Sistemi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 italic">
          {/* SOL TARAF: Kartlar ve Finans */}
          <div className="lg:col-span-8 space-y-8">
            {/* Varlık Kartları (Lüks Görünüm) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bakiye Kartı */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-900 overflow-hidden shadow-2xl group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <CreditCard size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-indigo-100/60">
                      Toplam Kullanılabilir Bakiye
                    </p>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-black tracking-tighter text-white">
                    $
                    {userData.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                  <div className="pt-4 flex gap-3">
                    <button className="px-5 py-2.5 bg-white text-indigo-900 rounded-xl font-black text-xs hover:bg-indigo-50 transition-colors">
                      YATIRIM YAP
                    </button>
                    <button className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-black text-xs hover:bg-white/20 transition-colors">
                      TRANSFER
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* TKripto Kartı */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden shadow-xl group"
              >
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700 italic font-black text-9xl">
                  TK
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      Mevcut Kripto Varlığı
                    </p>
                    <Zap size={18} className="text-purple-500 animate-pulse" />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter text-white">
                    {userData.tkripto.toFixed(4)}{" "}
                    <span className="text-lg text-purple-500 italic">TK</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                    Anlık Piyasa Değeri: $0.1245
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Profil Detayları / Modern Bilgi Grid */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -z-10" />
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                    <div className="w-full h-full bg-[#020617] rounded-[22px] flex items-center justify-center text-4xl font-black text-white italic">
                      {userData.name.charAt(0)}
                      {userData.surname.charAt(0)}
                    </div>
                  </div>
                  {userData.isPremium && (
                    <div className="absolute -top-3 -right-3 bg-amber-500 p-2.5 rounded-2xl shadow-xl ring-4 ring-[#020617]">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                      <h2 className="text-3xl font-black tracking-tight">
                        {userData.name} {userData.surname}
                      </h2>
                      {userData.isPremium && (
                        <Badge variant="premium">ULTRA ELITE</Badge>
                      )}
                    </div>
                    <p className="text-slate-400 font-medium tracking-wide">
                      {userData.email}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Rol
                      </p>
                      <p className="font-bold text-indigo-400">
                        {userData.role.toUpperCase()}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Üyelik Tarihi
                      </p>
                      <p className="font-bold text-white">
                        {new Date(userData.createdAt).toLocaleDateString(
                          "tr-TR"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* İstatistik Çubukları */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Toplam Spin",
                  value: userData.spinCount,
                  icon: Sparkles,
                  color: "text-indigo-400",
                },
                {
                  label: "Elite Bilet",
                  value: userData.premiumTickets,
                  icon: Star,
                  color: "text-amber-400",
                },
                {
                  label: "Normal Bilet",
                  value: userData.normalTickets,
                  icon: Ticket,
                  color: "text-pink-400",
                },
                {
                  label: "Aylık Aktivite",
                  value: userData.monthlySpinCount,
                  icon: TrendingUp,
                  color: "text-emerald-400",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all shadow-lg"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                  <p className="text-2xl font-black tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SAĞ TARAF: Sidebar ve Premium Aksiyonları */}
          <div className="lg:col-span-4 space-y-8 italic">
            {/* Hızlı Erişim Paneli */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 tracking-tight">
                <Zap className="w-5 h-5 text-indigo-500" /> Hızlı Kontroller
              </h3>
              <div className="space-y-4">
                <ActionBtn onClick={() => router.push("/wheel")} primary>
                  Çarkı Çevir
                </ActionBtn>
                <ActionBtn onClick={() => router.push("/watch-ads")}>
                  Gelir Elde Et
                </ActionBtn>
                <ActionBtn onClick={() => router.push("/tickets")}>
                  Envanterim
                </ActionBtn>
              </div>
            </div>

            {/* Premium Status Card */}
            <div
              className={`p-8 rounded-[2.5rem] relative overflow-hidden border transition-all ${
                userData.isPremium
                  ? "bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20"
                  : "bg-gradient-to-br from-slate-500/10 to-transparent border-white/10"
              }`}
            >
              {userData.isPremium && (
                <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-amber-500/10 blur-[50px] rounded-full" />
              )}

              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-2xl ${
                    userData.isPremium ? "bg-amber-500/20" : "bg-white/5"
                  }`}
                >
                  <Crown
                    className={
                      userData.isPremium ? "text-amber-500" : "text-slate-500"
                    }
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Üyelik Durumu
                  </p>
                  <h4 className="font-black text-xl italic">
                    {userData.isPremium ? "Elite Member" : "Standart"}
                  </h4>
                </div>
              </div>

              {userData.isPremium ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Üyelik Süresi</span>
                    <span className="text-amber-400 italic">24 Gün Kaldı</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-200"
                    />
                  </div>
                  <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                    YÖNETİM PANELİ
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    Elite Üyeliğe geçerek kazancınızı %500 artırın ve reklamları
                    kalıcı olarak kaldırın.
                  </p>
                  <button className="w-full py-4 bg-white text-[#020617] rounded-2xl font-black text-xs hover:bg-amber-500 transition-all transform active:scale-95 italic">
                    PREMIUM PLANA GEÇİŞ YAP
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// YARDIMCI BİLEŞENLER
const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "premium";
}) => (
  <span className="px-3 py-1 bg-amber-500 text-[#020617] text-[9px] font-black rounded-full italic tracking-tighter">
    {children}
  </span>
);

const ActionBtn = ({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full py-4 rounded-2xl font-black text-xs tracking-[0.1em] uppercase transition-all flex items-center justify-between px-6 group italic ${
      primary
        ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
        : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
    }`}
  >
    {children}
    <ChevronRight
      size={14}
      className="group-hover:translate-x-1 transition-transform"
    />
  </button>
);

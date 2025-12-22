"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Smartphone,
  X,
  Eye,
  EyeOff,
  Loader2,
  Fingerprint,
  ShieldAlert,
  Key,
} from "lucide-react";
import { toast } from "sonner";

interface SecurityData {
  twoFactorEnabled: boolean;
  email: string;
}

export default function SecuritySettingsPage() {
  const [userData, setUserData] = useState<SecurityData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State'leri
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // 2FA State'leri
  const [show2FASetup, setShow2FASetup] = useState(false);

  useEffect(() => {
    // Veri simülasyonu
    const timer = setTimeout(() => {
      setUserData({ twoFactorEnabled: false, email: "user@vault.com" });
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] gap-4 transition-colors duration-500">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-500" />
          <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-black tracking-[0.2em] animate-pulse uppercase text-xs">
          Güvenlik Protokolleri Yükleniyor
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-24 md:pt-32 pb-20 px-4 transition-colors duration-500 relative overflow-hidden">
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-600/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 mb-4">
              <Fingerprint size={14} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
                VAULT SECURITY SYSTEM v2.0
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight">
              Hesap <span className="text-indigo-600 dark:text-indigo-500">Zırhı</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2 max-w-md">
              Varlıklarınızı ve verilerinizi en üst düzey askeri standartlarda koruyun.
            </p>
          </motion.div>

          <div className="flex items-center gap-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-5 rounded-[2rem] shadow-sm backdrop-blur-md w-fit">
            <div className={`w-3.5 h-3.5 rounded-full ${userData?.twoFactorEnabled ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse" : "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"}`} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-0.5">KORUMA SEVİYESİ</p>
              <p className="text-sm font-bold">{userData?.twoFactorEnabled ? "TAM KORUMA" : "RİSKLİ / DÜŞÜK"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-7 bg-white dark:bg-[#0a0f1e]/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl dark:shadow-none backdrop-blur-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">Erişim Kontrolü</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider italic">Şifre Konfigürasyonu</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Mevcut Şifre", state: currentPassword, setState: setCurrentPassword, key: "current" },
                { label: "Yeni Şifre", state: newPassword, setState: setNewPassword, key: "new" },
                { label: "Onay", state: confirmPassword, setState: setConfirmPassword, key: "confirm" },
              ].map((input) => (
                <div key={input.key} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">
                    {input.label}
                  </label>
                  <div className="relative group">
                    <input
                      type={showPasswords[input.key as keyof typeof showPasswords] ? "text" : "password"}
                      value={input.state}
                      onChange={(e) => input.setState(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl p-4 pr-12 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(p => ({ ...p, [input.key]: !p[input.key as keyof typeof showPasswords] }))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                    >
                      {showPasswords[input.key as keyof typeof showPasswords] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full mt-4 py-5 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all transform active:scale-[0.98] italic shadow-lg shadow-slate-900/10 dark:shadow-none">
                VERİLERİ MÜHÜRLE VE KAYDET
              </button>
            </div>
          </motion.div>

          {/* Side Info & 2FA */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div 
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 dark:from-indigo-500/10 to-white dark:to-purple-600/10 border border-indigo-200 dark:border-indigo-500/20 rounded-[2.5rem] p-10 relative shadow-lg dark:shadow-none"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-2 transition-all duration-500 ${userData?.twoFactorEnabled ? "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500/40" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm"}`}>
                  <Smartphone className={userData?.twoFactorEnabled ? "text-emerald-500" : "text-slate-400"} size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-2">
                    İKİ FAKTÖRLÜ <br /> <span className="text-indigo-600 dark:text-indigo-400">DOĞRULAMA</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-4 leading-relaxed">
                    Hesabınıza her girişte mobil cihazınızdan onay alarak güvenliğinizi %100'e çıkarın.
                  </p>
                </div>
                <button
                  onClick={() => !userData?.twoFactorEnabled && setShow2FASetup(true)}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all italic border ${
                    userData?.twoFactorEnabled 
                    ? "bg-transparent border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10" 
                    : "bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700"
                  }`}
                >
                  {userData?.twoFactorEnabled ? "DEVRE DIŞI BIRAK" : "HEMEN AKTİF ET"}
                </button>
              </div>
            </motion.div>

            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex items-start gap-4 shadow-sm">
              <ShieldAlert className="text-amber-500 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-800 dark:text-slate-200 italic tracking-widest">GÜVENLİK ANALİZİ</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Güçlü bir şifre; en az 12 karakter, büyük/küçük harf ve özel semboller içermelidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA MODAL */}
      <AnimatePresence>
        {show2FASetup && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 dark:bg-[#020617]/95 backdrop-blur-xl"
              onClick={() => setShow2FASetup(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">ZIRH <span className="text-indigo-600 dark:text-indigo-500">KURULUMU</span></h3>
                <button onClick={() => setShow2FASetup(false)} className="p-2 bg-slate-100 dark:bg-white/5 rounded-full text-slate-500 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 flex flex-col items-center">
                <div className="p-4 bg-white rounded-[2.5rem] shadow-xl dark:shadow-[0_0_50px_rgba(99,102,241,0.15)]">
                  {/* QR Image Placeholder */}
                  <div className="w-44 h-44 bg-slate-100 dark:bg-slate-200 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">
                     <span className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest px-4">QR KODU UYGULAMADAN TARATIN</span>
                  </div>
                </div>
                
                <div className="w-full space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-center block">DOĞRULAMA KODUNU GİRİN</label>
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full bg-slate-50 dark:bg-white/[0.03] border-2 border-slate-200 dark:border-white/5 rounded-3xl py-6 text-center text-4xl font-black tracking-[0.5em] outline-none focus:border-indigo-500 dark:text-white"
                    placeholder="000000"
                  />
                </div>

                <button className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all italic active:scale-95">
                  PROTOKOLÜ AKTİF ET
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Smartphone,
  Check,
  X,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Copy,
  Download,
  Fingerprint,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Key
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

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
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [changingPassword, setChangingPassword] = useState(false);

  // 2FA State'leri
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [enabling2FA, setEnabling2FA] = useState(false);
  const [disabling2FA, setDisabling2FA] = useState(false);

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const response = await fetch("/api/user/security");
      if (!response.ok) throw new Error();
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error("Veriler alınamadı");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopyalandı");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-slate-500 font-bold tracking-[0.2em] animate-pulse uppercase text-xs">Güvenlik Katmanları Yükleniyor</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Fingerprint size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-400">Vault Security v2.0</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase italic">
              Hesap <span className="text-indigo-500">Zırhı</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">Dijital varlıklarınızın ve hesabınızın koruma seviyesini yönetin.</p>
          </motion.div>

          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-md">
            <div className={`w-3 h-3 rounded-full animate-pulse ${userData?.twoFactorEnabled ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Koruma Durumu</p>
              <p className="text-sm font-bold">{userData?.twoFactorEnabled ? 'Maksimum Güvenlik' : 'Zayıf Koruma'}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Sol Kolon: Şifre İşlemleri */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="md:col-span-7 bg-[#0a0f1e]/50 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <Lock size={120} />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">Erişim Anahtarı</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Şifre Güncelleme</p>
              </div>
            </div>

            <form className="space-y-6">
              {[
                { label: "Mevcut Şifre", state: currentPassword, setState: setCurrentPassword, key: "current" },
                { label: "Yeni Şifre", state: newPassword, setState: setNewPassword, key: "new" },
                { label: "Onay", state: confirmPassword, setState: setConfirmPassword, key: "confirm" }
              ].map((input) => (
                <div key={input.key} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 italic">{input.label}</label>
                  <div className="relative">
                    <input
                      type={showPasswords[input.key as keyof typeof showPasswords] ? "text" : "password"}
                      value={input.state}
                      onChange={(e) => input.setState(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pr-12 outline-none focus:border-indigo-500/50 transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(p => ({ ...p, [input.key]: !p[input.key as keyof typeof showPasswords] }))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                    >
                      {showPasswords[input.key as keyof typeof showPasswords] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full py-5 bg-white text-[#020617] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 italic">
                Değişiklikleri Mühürle
              </button>
            </form>
          </motion.div>

          {/* Sağ Kolon: 2FA ve Bilgi */}
          <div className="md:col-span-5 space-y-8">
            <motion.div 
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center gap-6 relative z-10">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border-2 shadow-2xl ${userData?.twoFactorEnabled ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-white/5 border-white/10'}`}>
                  <Smartphone className={userData?.twoFactorEnabled ? 'text-emerald-400' : 'text-slate-400'} size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic italic">İki Faktörlü <br /> <span className="text-indigo-400">Doğrulama</span></h3>
                  <p className="text-sm text-slate-400 mt-2 font-medium">Biyometrik veya uygulama tabanlı ek güvenlik katmanı.</p>
                </div>
                
                <button
                  onClick={userData?.twoFactorEnabled ? () => {} : () => {}}
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border italic ${
                    userData?.twoFactorEnabled 
                    ? 'bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10' 
                    : 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02]'
                  }`}
                >
                  {userData?.twoFactorEnabled ? 'Sistemi Devre Dışı Bırak' : 'Hemen Aktif Et'}
                </button>
              </div>
            </motion.div>

            <div className="bg-[#0a0f1e]/50 border border-white/5 rounded-[2.5rem] p-6">
              <div className="flex items-start gap-4">
                <ShieldAlert className="text-amber-500 shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase text-slate-300 italic">Güvenlik Notu</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Şifrenizi en az 3 ayda bir güncelleyerek hesabınızı brute-force saldırılarına karşı koruma altında tutun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kurumsal Destek Linki */}
        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">
            Bir sorun mu yaşıyorsunuz? <span className="text-indigo-400 cursor-pointer hover:underline">Siber Güvenlik Ekibiyle İletişime Geçin</span>
          </p>
        </div>
      </div>

      {/* 2FA MODAL (Kurulum Ekranı) */}
      <AnimatePresence>
        {show2FASetup && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0f1e] border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">Zırh <span className="text-indigo-500">Kurulumu</span></h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Authenticator Senkronizasyonu</p>
                </div>
                <button onClick={() => setShow2FASetup(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    {qrCode && <img src={qrCode} alt="QR" className="w-40 h-40" />}
                  </div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">1. Adım: QR Kodu Uygulamanıza Tanıtın</p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">2. Adım: 6 Haneli Doğrulama Kodu</label>
                  <div className="flex gap-2 justify-center">
                    <input
                      type="text"
                      maxLength={6}
                      className="w-full bg-white/[0.03] border-2 border-white/5 rounded-2xl py-6 text-center text-4xl font-black tracking-[0.5em] outline-none focus:border-indigo-500 transition-all"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <button className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all active:scale-95 italic">
                  Sistemi Kilitle ve Aktif Et
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
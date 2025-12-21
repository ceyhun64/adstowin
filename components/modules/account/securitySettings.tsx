"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Check,
  X,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Copy,
  Download,
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

  // Password Change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [changingPassword, setChangingPassword] = useState(false);

  // 2FA
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
      if (!response.ok) throw new Error("Güvenlik bilgileri alınamadı");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error("Güvenlik bilgileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Şifre en az 8 karakter olmalıdır!");
      return;
    }

    setChangingPassword(true);
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Şifre değiştirilemedi");
      }

      toast.success("Şifreniz başarıyla değiştirildi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleEnable2FA = async () => {
    try {
      const response = await fetch("/api/user/2fa/setup", {
        method: "POST",
      });

      if (!response.ok) throw new Error("2FA kurulumu başlatılamadı");

      const data = await response.json();
      setSecret(data.secret);
      setBackupCodes(data.backupCodes);

      // Generate QR Code
      const qr = await QRCode.toDataURL(data.otpauthUrl);
      setQrCode(qr);
      setShow2FASetup(true);
    } catch (error) {
      toast.error("2FA kurulumu başarısız");
    }
  };

  const handleVerify2FA = async () => {
    if (verificationCode.length !== 6) {
      toast.error("Geçerli bir kod girin!");
      return;
    }

    setEnabling2FA(true);
    try {
      const response = await fetch("/api/user/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Doğrulama başarısız");
      }

      toast.success("2FA başarıyla etkinleştirildi!");
      setShow2FASetup(false);
      setVerificationCode("");
      fetchSecurityData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setEnabling2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm("2FA'yı devre dışı bırakmak istediğinizden emin misiniz?")) {
      return;
    }

    setDisabling2FA(true);
    try {
      const response = await fetch("/api/user/2fa/disable", {
        method: "POST",
      });

      if (!response.ok) throw new Error("2FA devre dışı bırakılamadı");

      toast.success("2FA devre dışı bırakıldı");
      fetchSecurityData();
    } catch (error) {
      toast.error("İşlem başarısız");
    } finally {
      setDisabling2FA(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopyalandı!");
  };

  const downloadBackupCodes = () => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    a.click();
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Shield className="text-indigo-500" />
            Güvenlik Ayarları
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Hesabınızın güvenliğini yönetin
          </p>
        </div>

        {/* Password Change Section */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Lock className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Şifre Değiştir
              </h2>
              <p className="text-sm text-slate-500">
                Hesabınızın şifresini güncelleyin
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Mevcut Şifre
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 pr-12 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, current: !p.current }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Yeni Şifre
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 pr-12 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, new: !p.new }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Yeni Şifre (Tekrar)
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 pr-12 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 transition-all"
            >
              {changingPassword ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Şifreyi Güncelle"
              )}
            </button>
          </form>
        </div>

        {/* 2FA Section */}
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Smartphone className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  İki Faktörlü Doğrulama (2FA)
                </h2>
                <p className="text-sm text-slate-500">
                  Hesabınıza ekstra güvenlik katmanı ekleyin
                </p>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-xl font-bold text-sm ${
                userData?.twoFactorEnabled
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500"
              }`}
            >
              {userData?.twoFactorEnabled ? "Aktif" : "Pasif"}
            </div>
          </div>

          {!userData?.twoFactorEnabled ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  2FA etkinleştirildiğinde, giriş yaparken şifrenizin yanı sıra
                  telefonunuzdaki kimlik doğrulayıcı uygulamadan bir kod girmeniz
                  gerekecektir.
                </div>
              </div>
              <button
                onClick={handleEnable2FA}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all"
              >
                2FA'yı Etkinleştir
              </button>
            </div>
          ) : (
            <button
              onClick={handleDisable2FA}
              disabled={disabling2FA}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl disabled:opacity-50 transition-all"
            >
              {disabling2FA ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "2FA'yı Devre Dışı Bırak"
              )}
            </button>
          )}
        </div>

        {/* 2FA Setup Modal */}
        {show2FASetup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2FA Kurulumu
                </h3>
                <button
                  onClick={() => setShow2FASetup(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    1. QR kodunu kimlik doğrulayıcı uygulamanızla tarayın:
                  </p>
                  <div className="bg-white p-4 rounded-2xl flex items-center justify-center">
                    {qrCode && <img src={qrCode} alt="QR Code" className="w-48 h-48" />}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Veya manuel olarak girin:
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-white/5 rounded-xl">
                    <code className="flex-1 text-sm font-mono">{secret}</code>
                    <button
                      onClick={() => copyToClipboard(secret)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    2. Yedek kodlarınızı kaydedin:
                  </p>
                  <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl space-y-2">
                    {backupCodes.map((code, i) => (
                      <div key={i} className="font-mono text-sm">
                        {code}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={downloadBackupCodes}
                    className="w-full mt-2 py-2 bg-slate-200 dark:bg-white/10 rounded-xl text-sm font-bold hover:bg-slate-300 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Kodları İndir
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    3. Doğrulama kodunu girin:
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6 haneli kod"
                    className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 text-center text-2xl font-mono outline-none focus:ring-2 ring-indigo-500/50"
                    maxLength={6}
                  />
                </div>

                <button
                  onClick={handleVerify2FA}
                  disabled={enabling2FA || verificationCode.length !== 6}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 transition-all"
                >
                  {enabling2FA ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Doğrula ve Etkinleştir"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Megaphone,
  Smartphone,
  Info,
  RefreshCcw,
  Wallet,
  Zap,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function AppInstallCaptchaEarningPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [appInstalled, setAppInstalled] = useState(false);

  // Next-themes hydration hatasını engellemek için
  useEffect(() => {
    setMounted(true);
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
  };

  const verifyCaptcha = () => {
    if (!appInstalled) {
      setMessage("Erişim Reddedildi: Önce uygulamayı doğrulamalısınız.");
      setIsSuccess(false);
      return;
    }

    if (userInput.toUpperCase() === captchaText) {
      const earning = Math.floor(Math.random() * 3) + 2;
      setBalance((prev) => prev + earning);
      setCompletedCount((prev) => prev + 1);
      setMessage(`Doğrulama Başarılı: +${earning} TL cüzdana eklendi.`);
      setIsSuccess(true);
      generateCaptcha();
    } else {
      setMessage("Hata: Kod eşleşmedi, lütfen tekrar deneyin.");
      setIsSuccess(false);
      generateCaptcha();
    }
  };

  const handleInstall = () => {
    setAppInstalled(true);
    setBalance((prev) => prev + 5);
    setMessage("Sistem Aktif: Kurulum bonusu +5 TL tanımlandı.");
    setIsSuccess(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 pt-24 pb-16 relative overflow-hidden transition-colors duration-500">
      {/* Dekoratif Arka Plan Gradyanı */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/20 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* ÜST REKLAM BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="w-full h-20 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden group backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <Megaphone
                size={18}
                className="text-indigo-500 dark:text-indigo-400"
              />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80">
                Sponsorlu Premium İçerik
              </span>
            </div>
          </div>
        </motion.div>

        {/* BAŞLIK VE TEMA DEĞİŞTİRİCİ */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs tracking-widest uppercase">
              <Zap size={14} className="fill-current" /> Aktif Kazanç Kanalı
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic">
              KAZANÇ
              <span className="text-indigo-600 dark:text-indigo-500 text-6xl">
                .
              </span>
              HUB
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Görevleri tamamlayarak dijital varlıklarını yönetmeye başla.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* TEMA BUTONU */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 shadow-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* CÜZDAN KARTI */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl flex items-center gap-6 shadow-xl dark:shadow-2xl">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Kullanılabilir Bakiye
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {balance.toFixed(2)}{" "}
                  <span className="text-indigo-600 dark:text-indigo-500 text-sm">
                    TL
                  </span>
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <Wallet className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Görevler",
              val: completedCount,
              icon: <CheckCircle2 size={16} />,
              color: "text-emerald-500",
            },
            {
              label: "Verimlilik",
              val: "%98.4",
              icon: <TrendingUp size={16} />,
              color: "text-indigo-500",
            },
            {
              label: "Güvenlik",
              val: "SSL-AES",
              icon: <ShieldCheck size={16} />,
              color: "text-blue-500",
            },
            {
              label: "Durum",
              val: "Aktif",
              icon: (
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ),
              color: "text-emerald-500",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl flex items-center gap-3 shadow-sm transition-all hover:scale-105"
            >
              <div className={s.color}>{s.icon}</div>
              <div>
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter">
                  {s.label}
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {s.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SOL: KURULUM GÖREVİ */}
          <div className="lg:col-span-5">
            <Card className="h-full bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-[#020617] border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl dark:shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10 pt-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                  <Smartphone className="text-white" size={24} />
                </div>
                <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                  Mobil Aktivasyon
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                  Sistemi tam kapasite kullanmak için cihaz entegrasyonunu
                  tamamla.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-8">
                <div className="space-y-3">
                  {[
                    "Anında +5.00 TL Hoşgeldin Bonusu",
                    "Sınırsız Veri Doğrulama Hakkı",
                    "Öncelikli Para Çekme Talebi",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3 rounded-xl border border-slate-200 dark:border-white/5"
                    >
                      <CheckCircle2 size={14} className="text-indigo-500" />{" "}
                      {text}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleInstall}
                  disabled={appInstalled}
                  className={`w-full py-8 rounded-[2rem] text-lg font-black tracking-tight transition-all duration-500 ${
                    appInstalled
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl"
                  }`}
                >
                  {appInstalled
                    ? "AKTİVASYON TAMAMLANDI"
                    : "SİSTEMİ KUR (+5 TL)"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* SAĞ: CAPTCHA MADENCİLİĞİ */}
          <div className="lg:col-span-7">
            <Card className="bg-white/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[3rem] backdrop-blur-3xl shadow-xl dark:shadow-2xl h-full relative overflow-hidden">
              {!appInstalled && (
                <div className="absolute inset-0 bg-white/60 dark:bg-[#020617]/60 backdrop-blur-md z-20 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-white/10">
                    <Lock
                      className="text-slate-400 dark:text-slate-500"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    ERİŞİM KISITLANDI
                  </h3>
                  <p className="text-sm text-slate-500 max-w-[280px]">
                    Doğrulama terminalini kullanmak için önce uygulamayı
                    yüklemelisin.
                  </p>
                </div>
              )}

              <CardHeader className="pt-10 px-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      Veri Doğrulama
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-xs">
                      Her başarılı onay cüzdan bakiyeni artırır.
                    </CardDescription>
                  </div>
                  <div className="px-4 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    Canlı Havuz
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-10 pb-10 space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" />
                  <div className="relative p-12 bg-slate-100 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex items-center justify-center shadow-inner overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, transparent 27%), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, transparent 27%)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <span className="text-5xl font-black tracking-[0.6em] text-slate-800 dark:text-white italic select-none drop-shadow-md">
                      {captchaText}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={generateCaptcha}
                      className="absolute bottom-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <RefreshCcw size={18} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    maxLength={6}
                    placeholder="Kodu girin..."
                    className="h-20 text-center text-3xl font-black tracking-[0.4em] rounded-[2rem] border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-300 placeholder:text-sm placeholder:tracking-normal"
                  />
                  <Button
                    onClick={verifyCaptcha}
                    disabled={userInput.length < 4 || isSuccess}
                    className="w-full py-9 rounded-[2rem] text-xl font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-20"
                  >
                    ONAYLA VE KAZAN
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key={message}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-2xl border flex items-center gap-3 font-bold text-xs ${
                        isSuccess
                          ? "bg-emerald-50 border-emerald-500/20 text-emerald-600"
                          : "bg-red-50 border-red-500/20 text-red-600"
                      }`}
                    >
                      <Info size={16} /> {message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ALT BİLGİ */}
        <div className="mt-12 p-8 bg-white/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
            <ShieldCheck className="text-slate-500" size={20} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            <b className="text-slate-700 dark:text-slate-300 uppercase tracking-widest mr-2">
              GÜVENLİK PROTOKOLÜ:
            </b>
            Tüm kazançlar şifrelenmiş bloklar halinde cüzdanınıza yansıtılır.
            Uygulamanın kaldırılması durumunda doğrulanmamış bakiyeler askıya
            alınabilir. Günlük limitler sunucu yoğunluğuna göre dinamik olarak
            güncellenir.
          </p>
        </div>
      </div>
    </div>
  );
}

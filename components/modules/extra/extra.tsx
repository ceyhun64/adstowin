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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  Coins,
  TrendingUp,
  Shield,
  Download,
  Moon,
  Sun,
  Megaphone,
  Smartphone,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppInstallCaptchaEarningPage() {
  const [balance, setBalance] = useState(0);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [appInstalled, setAppInstalled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* -------------------- THEME -------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* -------------------- CAPTCHA -------------------- */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const verifyCaptcha = () => {
    if (!appInstalled) {
      setMessage("Önce uygulamayı yüklemeniz gerekiyor!");
      setIsSuccess(false);
      return;
    }

    if (userInput.toUpperCase() === captchaText) {
      const earning = Math.floor(Math.random() * 3) + 2;
      setBalance((prev) => prev + earning);
      setCompletedCount((prev) => prev + 1);
      setMessage(`Başarılı! ${earning} TL kazandınız 🎉`);
      setIsSuccess(true);
      generateCaptcha();
    } else {
      setMessage("Yanlış captcha! Tekrar deneyin.");
      setIsSuccess(false);
      generateCaptcha();
    }
  };

  const handleInstall = () => {
    setAppInstalled(true);
    setBalance((prev) => prev + 5);
    setMessage("Uygulama yüklendi! +5 TL kazandınız 🚀");
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 pt-20 pb-12 transition-colors duration-500">
      {/* 3- SABİT REKLAM ALANI */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="w-full h-24 bg-white dark:bg-indigo-600/10 border border-slate-200 dark:border-indigo-500/30 rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-sm group">
          <div className="flex items-center gap-4 z-10">
            <Megaphone className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="text-slate-600 dark:text-indigo-100 font-bold tracking-widest uppercase text-xs md:text-sm text-center">
              Sponsorlu Reklam Alanı
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              Ek Kazanç Merkezi
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Görevleri tamamla, bakiyeni anında yükselt.
            </p>
          </div>
    
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "Toplam Bakiye",
              val: `${balance} TL`,
              icon: <Coins className="text-amber-500" />,
            },
            {
              title: "Tamamlanan",
              val: completedCount,
              icon: <CheckCircle2 className="text-emerald-500" />,
            },
            {
              title: "Ortalama Kazanç",
              val: `${
                completedCount > 0
                  ? (balance / completedCount).toFixed(2)
                  : "0.00"
              } TL`,
              icon: <TrendingUp className="text-indigo-500" />,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 rounded-3xl shadow-sm"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                  {stat.icon} {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.val}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 35- APP INSTALL BÖLÜMÜ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <Card className="h-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-[2.5rem] border-none shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Smartphone size={120} />
              </div>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-white">
                  <Download size={20} /> Uygulama Görevi
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Uygulamayı cihazına yükle, captcha kazancını aktif et.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-white/10 p-4 rounded-2xl mb-6 backdrop-blur-md">
                  <ul className="text-xs space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} /> Anında +5.00 TL Bonus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} /> Captcha Çözme Yetkisi
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} /> Sınırsız Günlük Görev
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={handleInstall}
                  disabled={appInstalled}
                  className={`w-full py-7 rounded-2xl text-lg font-bold transition-all ${
                    appInstalled
                      ? "bg-emerald-500 text-white opacity-100"
                      : "bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg"
                  }`}
                >
                  {appInstalled
                    ? "Uygulama Yüklendi ✅"
                    : "HEMEN YÜKLE (+5 TL)"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CAPTCHA BÖLÜMÜ */}
          <div className="md:col-span-7">
            <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-slate-900 dark:text-white">
                  <Shield className="text-indigo-500" size={20} /> Captcha
                  Doğrulama
                </CardTitle>
                <CardDescription>
                  Uygulama yüklendikten sonra her captcha 2-5 TL kazandırır.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative group">
                  <div className="p-8 text-center text-5xl font-black tracking-[0.5em] bg-slate-100 dark:bg-white/5 rounded-[2rem] select-none border-2 border-dashed border-slate-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 italic">
                    {captchaText}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateCaptcha}
                    className="absolute top-2 right-2 text-slate-400 hover:text-indigo-500"
                  >
                    Yenile
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    maxLength={6}
                    placeholder="Kodu buraya yazın..."
                    className="h-16 text-center text-2xl font-bold tracking-widest rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-transparent focus:ring-indigo-500"
                  />

                  <Button
                    onClick={verifyCaptcha}
                    disabled={userInput.length < 4 || isSuccess}
                    className="w-full py-8 rounded-[1.5rem] text-xl font-black bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 shadow-lg"
                  >
                    KONTROL ET & KAZAN
                  </Button>
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Alert
                        className={`rounded-2xl border-none ${
                          isSuccess
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Info size={16} />
                          <AlertDescription className="font-bold">
                            {message}
                          </AlertDescription>
                        </div>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-start gap-4">
          <Info className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <b>Önemli Bilgi:</b> Kazançlarınızın hesabınıza yansıması için
            uygulamanın cihazınızda yüklü kalması gerekmektedir. Captcha
            görevleri her 24 saatte bir yenilenen havuzdan beslenir. Adil
            kullanım politikası gereği bot kullanımı yasaktır.
          </p>
        </div>
      </div>
    </div>
  );
}

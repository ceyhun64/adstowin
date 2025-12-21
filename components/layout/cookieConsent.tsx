"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Link bileşenini ekledik

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[100] w-[calc(100%-3rem)] max-w-[380px]"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {/* Üst Kısım: İkon ve Kapatma */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold tracking-tight">
                    Çerez Kullanımı
                  </h4>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* İçerik */}
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Deneyiminizi kişiselleştirmek ve trafiği analiz etmek için
                çerezleri kullanıyoruz. Detaylı bilgi için
                <Link
                  href="/info/cookie_policy"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline ml-1"
                >
                  Çerez Politikamızı
                </Link>{" "}
                inceleyin.
              </p>

              {/* Butonlar */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAction("accepted")}
                  className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold border-none shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                >
                  Onayla
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleAction("declined")}
                  className="h-11 px-4 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold transition-all"
                >
                  Reddet
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

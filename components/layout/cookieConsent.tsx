"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2500); // Biraz daha geç gelmesi premium bir hava katar
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
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-8 right-8 z-[200] w-[calc(100%-4rem)] max-w-[420px]"
        >
          <div className="relative group overflow-hidden">
            {/* Arka Plan Glow Efekti */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative bg-[#0a0f1e]/80 dark:bg-[#020617]/90 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-7 shadow-2xl overflow-hidden">
              {/* Dekoratif Çizgi */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

              <div className="flex flex-col gap-6">
                {/* Üst Kısım: İkon ve Başlık */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0f1e] border-2 border-[#1a1f2e] flex items-center justify-center">
                        <Cookie className="w-3 h-3 text-indigo-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-black tracking-tight text-lg italic uppercase italic">
                        Gizlilik{" "}
                        <span className="text-indigo-400">Merkezi</span>
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                        Kişiselleştirilmiş Deneyim
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* İçerik Metni */}
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Size en seçkin deneyimi sunabilmek için dijital ayak
                  izlerinizi
                  <span className="text-white px-1">çerezler</span>
                  aracılığıyla optimize ediyoruz. Detaylar için
                  <Link
                    href="/info/cookie_policy"
                    className="group/link inline-flex items-center text-indigo-400 font-bold hover:text-indigo-300 ml-1 transition-colors"
                  >
                    Politikamızı inceleyin
                    <ChevronRight
                      size={14}
                      className="group-hover/link:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </p>

                {/* Eylem Butonları */}
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    onClick={() => handleAction("accepted")}
                    className="flex-[2] h-14 rounded-2xl bg-white text-[#020617] hover:bg-indigo-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-white/5 active:scale-95"
                  >
                    Hepsine İzin Ver
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleAction("declined")}
                    className="flex-1 h-14 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-tighter transition-all italic"
                  >
                    Yönet
                  </Button>
                </div>
              </div>

              {/* Köşe Süslemesi */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-indigo-500/10 blur-2xl rounded-full"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

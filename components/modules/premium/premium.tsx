"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Crown,
  Sparkles,
  CreditCard,
  Wallet,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  savings?: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const PremiumPricingPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: "Standart Elite",
      price: 4.99,
      period: "ay",
      color: "from-slate-400 to-slate-600",
      features: [
        "Sınırsız öncelikli mesajlaşma",
        "Sıfır reklam deneyimi",
        "Gümüş profil çerçevesi",
        "Özel Premium emojiler",
        "Aylık performans raporu",
      ],
    },
    {
      id: "yearly",
      name: "Ultimate VIP",
      price: 39.99,
      period: "yıl",
      savings: "%33 Tasarruf Edin",
      popular: true,
      color: "from-amber-400 via-yellow-600 to-amber-700",
      features: [
        "Tüm Standart özellikler",
        "7/24 VIP destek hattı",
        "Altın 'Grandmaster' rozeti",
        "Yeni araçlara erken erişim",
        "Yıllık özel strateji toplantısı",
        "2 Adet Premium hediye kartı",
      ],
    },
  ];

  const paymentMethods = [
    {
      id: "payoneer",
      name: "Küresel Kart Transferi",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Payoneer Güvenli Altyapısı",
    },
    {
      id: "litecoin",
      name: "Dijital Varlık (LTC)",
      icon: <Wallet className="w-5 h-5" />,
      description: "Yıldırım Hızında Kripto Ödemesi",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-amber-500/30 py-24 relative overflow-hidden">
      {/* Tema Değiştirici */}
      <div className="absolute top-8 right-8 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-white/10 backdrop-blur-md border-slate-200 dark:border-white/10"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </Button>
      </div>

      {/* Sanatsal Arka Plan Dokunuşları */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/5 to-transparent blur-3xl opacity-50" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Üst Reklam Alanı */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 p-[1px] rounded-3xl bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent"
        >
          <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-md rounded-3xl p-4 flex items-center justify-center gap-4 border border-slate-200 dark:border-white/5">
            <Badge className="bg-amber-500 text-black font-black text-[10px]">
              ÖZEL TEKLİF
            </Badge>
            <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
              Bugün katılın ve ilk{" "}
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                24 saat
              </span>{" "}
              içinde özel yatırımcı rozetini kazanın.
            </p>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-amber-200">
              AYRICALIKLI ÜYELİK
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
            Sınırları <br /> Yeniden Tanımlayın
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Sıradanlıktan kurtulun. En gelişmiş finansal araçlar ve öncelikli
            erişim hakları ile platformun zirvesinde yerinizi alın.
          </p>
        </div>

        {/* Planlar */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                relative cursor-pointer rounded-[3rem] p-10 transition-all duration-500 border
                ${
                  selectedPlan === plan.id
                    ? "bg-white dark:bg-white/[0.03] border-amber-500/50 shadow-2xl dark:shadow-[0_30px_60px_-15px_rgba(245,158,11,0.15)]"
                    : "bg-white/40 dark:bg-transparent border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-2 rounded-full shadow-xl">
                  <span className="text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                    <Crown className="w-3 h-3" /> TAVSİYE EDİLEN
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black">${plan.price}</span>
                    <span className="text-slate-500 font-bold tracking-tighter">
                      /{plan.period}
                    </span>
                  </div>
                </div>
                {plan.savings && (
                  <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-tighter">
                    {plan.savings}
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-12">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        selectedPlan === plan.id
                          ? "bg-amber-500/10 border-amber-500/20"
                          : "bg-slate-200 dark:bg-white/5 border-slate-300 dark:border-white/10"
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 ${
                          selectedPlan === plan.id
                            ? "text-amber-600 dark:text-amber-500"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`w-full h-16 rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs transition-all ${
                  selectedPlan === plan.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black"
                    : "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/10"
                }`}
              >
                {selectedPlan === plan.id
                  ? "ŞU ANKİ SEÇİMİNİZ"
                  : "BU PLANI SEÇ"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ödeme Alanı */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 backdrop-blur-2xl rounded-[4rem] p-10 md:p-16 shadow-xl dark:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-slate-200 dark:text-white opacity-10">
              <ShieldCheck size={120} />
            </div>

            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
                <Zap className="text-amber-600 dark:text-amber-500" size={32} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                Güvenli Ödeme Protokolü
              </h2>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
                İşlemleriniz kurumsal düzeyde 256-bit şifreleme ile
                korunmaktadır.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`
                    relative cursor-pointer rounded-[2rem] p-8 transition-all border
                    ${
                      selectedPayment === method.id
                        ? "bg-amber-500 border-amber-400 shadow-lg text-black"
                        : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 text-slate-900 dark:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`p-4 rounded-2xl ${
                        selectedPayment === method.id
                          ? "bg-black/10"
                          : "bg-white dark:bg-white/5 shadow-sm"
                      }`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-wider">
                        {method.name}
                      </p>
                      <p className={`text-[10px] font-bold opacity-60`}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              disabled={!selectedPayment}
              className="w-full h-20 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl hover:shadow-indigo-500/40 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 group"
            >
              <span className="text-lg font-black uppercase tracking-[0.2em]">
                Üyeliği Başlat
              </span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Button>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale contrast-125 dark:contrast-100">
              <span className="text-[10px] font-black tracking-widest uppercase italic">
                Payoneer Onaylı
              </span>
              <div className="hidden md:block w-px h-4 bg-slate-400 dark:bg-white/20" />
              <span className="text-[10px] font-black tracking-widest uppercase italic">
                LTC Şifreli Ağ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPricingPage;

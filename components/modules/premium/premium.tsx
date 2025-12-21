"use client";
import React, { useState } from "react";
import {
  Check,
  Crown,
  Sparkles,
  CreditCard,
  Wallet,
  Star,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sabit Reklam Bileşeni


interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  savings?: string;
  features: string[];
  popular?: boolean;
}

const PremiumPricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: "Aylık Premium",
      price: 4.99,
      period: "ay",
      features: [
        "Sınırsız mesajlaşma",
        "Reklamsız deneyim",
        "Özel profil rozetleri",
        "Premium emoji paketi",
        "Gelişmiş istatistikler",
      ],
    },
    {
      id: "yearly",
      name: "Yıllık Premium",
      price: 39.99,
      period: "yıl",
      savings: "%33 tasarruf",
      popular: true,
      features: [
        "Tüm aylık özellikler",
        "2 ay ücretsiz kullanım",
        "VIP destek önceliği",
        "Özel yıllık VIP rozet",
        "Yeni özelliklere erken erişim",
        "2 adet hediye premium kodu",
      ],
    },
  ];

  const paymentMethods = [
    {
      id: "payoneer",
      name: "Payoneer API",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Kredi Kartı / Banka Kartı",
    },
    {
      id: "litecoin",
      name: "Litecoin (LTC) API",
      icon: <Wallet className="w-6 h-6" />,
      description: "Kripto Para İle Ödeme",
    },
  ];

  const handlePurchase = () => {
    if (!selectedPayment) {
      alert("Lütfen bir ödeme yöntemi seçin");
      return;
    }
    const plan = plans.find((p) => p.id === selectedPlan);
    alert(
      `${
        plan?.name
      } için ${selectedPayment.toUpperCase()} API sistemi üzerinden ödeme başlatılıyor...`
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] transition-colors pb-24 pt-24">
      {/* 5. GEREKSİNİM: SAYFANIN EN ÜSTÜNDE SABİT REKLAM ALANI */}
      <div className="max-w-7xl mx-auto px-4">
        {/* HERO SECTION */}
        <div className="text-center mb-16 animate-in fade-in  duration-700">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/20">
              <Crown className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Premium’a Yükselt
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Profesyonel araçlara erişin ve platformun tüm gücünü serbest
            bırakın.
          </p>
        </div>

        {/* 40 & 41. GEREKSİNİMLER: PRICING (4.99 & 39.99) */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`
                relative cursor-pointer rounded-[2.5rem] p-8 border transition-all duration-500
                ${
                  selectedPlan === plan.id
                    ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                    : "bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-indigo-300"
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-6 py-1.5 rounded-full bg-indigo-600 text-white border-none shadow-lg">
                    <Star className="w-3 h-3 mr-2 fill-current" /> EN POPÜLER
                  </Badge>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 font-bold">
                    /{plan.period}
                  </span>
                </div>
                {plan.savings && (
                  <Badge
                    variant="outline"
                    className="mt-3 text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                  >
                    {plan.savings}
                  </Badge>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={`w-full py-4 rounded-2xl flex items-center justify-center font-bold transition-all ${
                  selectedPlan === plan.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-400"
                }`}
              >
                {selectedPlan === plan.id ? "Seçili Plan" : "Planı Seç"}
              </div>
            </div>
          ))}
        </div>

        {/* 42. GEREKSİNİM: ÖDEME SEÇENEKLERİ (API SİSTEMLERİ) */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border dark:border-white/5 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Sparkles className="text-emerald-500" size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Güvenli Ödeme
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`
                  group cursor-pointer rounded-3xl p-6 border transition-all
                  ${
                    selectedPayment === method.id
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "bg-slate-50 dark:bg-white/5 border-transparent hover:border-indigo-500/30"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl transition-colors ${
                      selectedPayment === method.id
                        ? "bg-white/20"
                        : "bg-white dark:bg-slate-800 shadow-sm text-indigo-600"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{method.name}</p>
                    <p
                      className={`text-xs ${
                        selectedPayment === method.id
                          ? "text-indigo-100"
                          : "text-slate-500"
                      }`}
                    >
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handlePurchase}
            disabled={!selectedPayment}
            className="w-full py-8 rounded-[1.5rem] text-xs md:text-xl font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-30"
          >
            Ödemeyi Tamamla (${plans.find((p) => p.id === selectedPlan)?.price})
          </Button>

          <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest">
            Payoneer ve Litecoin API sistemleri ile şifrelenmiş güvenli işlem.
          </p>
        </div>
      </div>

      {/* 43. GEREKSİNİM: TÜM SAYFALARDA GÖRÜNECEK SABİT REKLAM ALANI */}
    </div>
  );
};

export default PremiumPricingPage;

"use client";
import React, { useState } from "react";
import {
  Check,
  Crown,
  Sparkles,
  CreditCard,
  Wallet,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [showAdBanner, setShowAdBanner] = useState(true);

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: "Aylık Premium",
      price: 4.99,
      period: "ay",
      features: [
        "Sınırsız mesajlaşma",
        "Öncelikli müşteri desteği",
        "Reklamsız deneyim",
        "Özel profil rozetleri",
        "Gelişmiş istatistikler",
        "Premium emoji paketi",
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
        "2 ay ücretsiz",
        "Özel yıllık rozetler",
        "Öncelikli yeni özellikler",
        "VIP destek hattı",
        "Hediye premium kodları (2 adet)",
        "Özel tema paketi",
      ],
    },
  ];

  const paymentMethods = [
    {
      id: "payoneer",
      name: "Payoneer",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Kredi/Banka Kartı ile Ödeme",
    },
    {
      id: "litecoin",
      name: "Litecoin (LTC)",
      icon: <Wallet className="w-6 h-6" />,
      description: "Kripto Para ile Ödeme",
    },
  ];

  const handlePurchase = () => {
    if (!selectedPayment) {
      alert("Lütfen bir ödeme yöntemi seçin!");
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    alert(
      `${plan?.name} planı için ${selectedPayment} ile ödeme işlemi başlatılıyor...`
    );
  };

  return (
    <div className="h-full w-full overflow-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      <div
        className={`max-w-7xl mx-auto px-4 py-12 ${
          showAdBanner ? "mt-16" : "mt-4"
        }`}
      >
        {/* Başlık */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Premium'a Yükselt
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Platformun tüm özelliklerini kullan, sınırsız mesajlaş ve özel
            ayrıcalıklardan yararlan!
          </p>
        </div>

        {/* Fiyatlandırma Kartları */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "ring-4 ring-indigo-500 scale-105"
                  : "hover:shadow-2xl hover:scale-102"
              } ${plan.popular ? "border-4 border-yellow-400" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1">
                  <Star className="w-4 h-4 mr-1 inline" />
                  EN POPÜLER
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                {plan.savings && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    {plan.savings}
                  </Badge>
                )}
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">
                    / {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 text-lg font-semibold ${
                  selectedPlan === plan.id
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Seçildi ✓" : "Seç"}
              </Button>
            </div>
          ))}
        </div>

        {/* Ödeme Yöntemleri */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Ödeme Yöntemi Seçin
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedPayment === method.id
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedPayment === method.id
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {method.name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
                {selectedPayment === method.id && (
                  <div className="mt-3">
                    <Badge className="bg-green-500">
                      <Check className="w-3 h-3 mr-1" />
                      Seçildi
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Satın Al Butonu */}
          <Button
            onClick={handlePurchase}
            disabled={!selectedPayment}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Crown className="w-5 h-5 mr-2" />
            Premium Satın Al - $
            {plans.find((p) => p.id === selectedPlan)?.price}
          </Button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Güvenli ödeme • 30 gün para iade garantisi • İstediğin zaman iptal
            et
          </p>
        </div>

        {/* Alt Reklam Alanı */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-2">
            🎁 Arkadaşını Davet Et, İkisiniz de Kazanın!
          </h3>
          <p className="text-lg mb-4">
            Her davet için 7 gün ücretsiz premium kazanın!
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
            Davet Linki Al
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPricingPage;

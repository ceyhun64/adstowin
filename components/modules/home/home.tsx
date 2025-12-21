"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/modules/home/heroSection";
import UserTypeCards from "@/components/modules/home/userTypeCards";
import PlatformFeatures from "@/components/modules/home/platformFeatures";
import Users from "@/components/modules/home/ads/users/users";
import Advertisers from "@/components/modules/home/ads/advertisers/advertisers";

// Kullanıcı veri tipini tanımlayalım
interface UserData {
  name: string;
  email: string;
  surname: string;
  isPremium: boolean;
  balance: number;
  tkripto: number;
  role: string; // API'den role bilgisinin de gelmesi gerekir
}

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/account/check");
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleScrollToForm = () => {
    const formElement = document.getElementById("registration-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 1. Yükleme Durumu
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  // 2. Giriş Yapılmışsa Role Göre Gösterim
  if (user) {
    return (
      <div className="min-h-screen bg-[#020617]">
        {/* Not: API'den gelen role değerine göre karar veriyoruz. 
          API'de henüz 'role' yoksa user.role yerine session'daki mantığı kurmalısın.
        */}
        {user.role === "ADVERTISER" ? <Advertisers /> : <Users />}
      </div>
    );
  }

  // 3. Giriş Yapılmamışsa Landing Page
  return (
    <div className="min-h-screen relative overflow-y-hidden font-sans overflow-x-hidden">
      <main className="relative z-10 container mx-auto max-w-8xl">
        <HeroSection onScrollToForm={handleScrollToForm} />
        <UserTypeCards />
        <PlatformFeatures />
      </main>
    </div>
  );
}

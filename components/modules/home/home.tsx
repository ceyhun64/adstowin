"use client";

import { useState } from "react";
import HeroSection from "@/components/modules/home/heroSection";
import UserTypeCards from "@/components/modules/home/userTypeCards";
import PlatformFeatures from "@/components/modules/home/platformFeatures";
import RegistrationForm from "@/components/modules/home/registrationForm";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";

export default function Home() {
  const [userType, setUserType] = useState<"earner" | "business">("earner");

  const handleScrollToForm = () => {
    const formElement = document.getElementById("registration-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black relative overflow-y-hidden font-sans">
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={100}
        gridGap={5}
        color="#6D6A75"
        maxOpacity={0.1}
        flickerChance={0.1}
      />
      <main className="relative z-10 container mx-auto pb-8 max-w-8xl">
        {/* Hero Section */}
        <HeroSection onScrollToForm={handleScrollToForm} />

        <div className="px-4">
          {/* Coming Soon Badge */}
          <div className="flex justify-center mb-12 ">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-full px-6 md:px-8 py-3 backdrop-blur-sm">
                <p className="text-yellow-300 font-bold text-sm md:text-base flex items-center gap-3">
                  COMING SOON
                </p>
              </div>
            </div>
          </div>

          {/* User Type Cards */}
          <UserTypeCards userType={userType} setUserType={setUserType} />

          {/* Platform Features */}
          <PlatformFeatures />

          {/* Registration Form */}
          <RegistrationForm userType={userType} setUserType={setUserType} />

          {/* Footer */}
          <footer className="text-center text-white/40 text-sm space-y-3 pb-8">
            <p className="font-semibold">
              © 2025 ADSTOWIN - Tüm hakları saklıdır
            </p>
            <p>Mobil cihazlarınızdan kolayca erişin ve kazanmaya başlayın</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

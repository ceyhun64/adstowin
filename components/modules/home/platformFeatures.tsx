import React from "react";
import { Play, Star, Gift, Users, Crown } from "lucide-react";

export default function PlatformFeatures() {
  const features = [
    {
      icon: Play,
      label: "Ads", // Reklamlar -> Ads
      desc: "Standard & Premium", // Normal & Premium -> Standard & Premium
      color: "indigo",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/20",
      borderColor: "border-sky-500/30 hover:border-sky-400/80",
    },
    {
      icon: Star,
      label: "Spin Wheel", // Şans Çarkı -> Spin Wheel
      desc: "Bonus earnings", // Bonus kazanç -> Bonus earnings
      color: "yellow",
      // Neon color: Yellow/Bonus theme from the previous component
      iconColor: "text-yellow-300",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30 hover:border-yellow-300/80",
    },
    {
      icon: Gift,
      label: "Extra Income", // Ek Kazanç -> Extra Income
      desc: "Tasks", // Görevler -> Tasks
      color: "cyan",
      // Neon color: Greenish/Emerald Green
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30 hover:border-emerald-400/80",
    },
    {
      icon: Users,
      label: "Live Chat", // Canlı Chat -> Live Chat
      desc: "Community", // Topluluk -> Community
      color: "emerald",
      // Neon color: Purple/Magenta
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30 hover:border-purple-400/80",
    },
    {
      icon: Crown,
      label: "Premium", // Premium -> Premium (Aynı kaldı)
      desc: "VIP membership", // VIP üyelik -> VIP membership
      color: "purple",
      // Neon color: Pink/Fuchsia - Earner theme
      iconColor: "text-fuchsia-400",
      bgColor: "bg-fuchsia-500/20",
      borderColor: "border-fuchsia-500/30 hover:border-fuchsia-400/80",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-16 px-2">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
          Platform Features
        </h3>
        {/* Platform Özellikleri -> Platform Features */}
        <p className="text-white/60 text-lg">
          Mobile-friendly, fully featured earning platform
        </p>
        {/* Mobil uyumlu, tam özellikli kazanç platformu -> Mobile-friendly, fully featured earning platform */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {" "}
        {/* Gap increased */}
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={idx}
              className={`group bg-white/5 backdrop-blur-md rounded-2xl px-1 py-3 border ${feature.borderColor} transition-all duration-300 hover:scale-[1.03] text-center shadow-xl shadow-black/30 hover:shadow-lg hover:shadow-white/5`}
            >
              {/* Icon Box */}
              <div
                className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform border ${feature.borderColor}`}
              >
                <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
              </div>

              {/* Label and Description */}
              <p className="text-white font-extrabold text-lg mb-1">
                {feature.label}
              </p>
              <p className="text-white/50 text-sm font-medium">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
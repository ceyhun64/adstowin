"use client";
import React from "react";
import {
  Home,
  Zap,
  MessageSquare,
  Crown,
  Gift,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  link: string;
}

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { id: "home", icon: Home, label: "Reklamlar", link: "/" },
    { id: "wheel", icon: Gift, label: "Çark", link: "/wheel" },
    { id: "extra", icon: Zap, label: "Ek Kazanç", link: "/extra" },
    { id: "chat", icon: MessageSquare, label: "Chat", link: "/chat" },
    { id: "premium", icon: Crown, label: "Premium", link: "/premium" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-5xl mx-auto px-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;

            // Aktiflik Kontrolü
            const isActive =
              item.link === pathname ||
              (item.link !== "/" && pathname.startsWith(item.link));

            return (
              // 👇 GÜNCELLEME: legacyBehavior, passHref ve <a> etiketi kaldırıldı.
              // Sınıflar doğrudan Link bileşenine uygulandı.
              <Link
                href={item.link}
                key={item.id}
                className={`flex flex-col items-center py-3 px-4 flex-1 transition relative ${
                  isActive
                    ? "text-purple-500" // Aktif renk
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" // Pasif renk
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-purple-500/10 rounded-xl transition-all duration-300"></div>
                )}
                <Icon
                  size={24}
                  className={`relative z-10 ${isActive ? "scale-110" : ""}`}
                />
                <span className="relative z-10 text-[8px] md:text-sm mt-1 font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

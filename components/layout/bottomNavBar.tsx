"use client";
import React, { useState } from "react";
import {
  Crown,
  LoaderPinwheel,
  Megaphone,
  Coins,
  MessageCircle,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  link: string;
  color: string;
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  const validRoutes = ["/", "/wheel", "/extra", "/chat", "/premium", "/profile", "/wallet"];
  const isNotFound = !validRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  if (isNotFound) return null;

  const navItems: NavItem[] = [
    { id: "home", icon: Megaphone, label: "Reklam", link: "/", color: "from-blue-600 to-cyan-500" },
    { id: "wheel", icon: LoaderPinwheel, label: "Çark", link: "/wheel", color: "from-amber-600 to-orange-500" },
    { id: "extra", icon: Coins, label: "Görev", link: "/extra", color: "from-emerald-600 to-teal-500" },
    { id: "chat", icon: MessageCircle, label: "Chat", link: "/chat", color: "from-indigo-600 to-purple-500" },
    { id: "premium", icon: Crown, label: "VIP", link: "/premium", color: "from-fuchsia-600 to-pink-500" },
  ];

  return (
    <nav className="fixed bottom-1 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-[440px] pointer-events-none">
      <div className="flex flex-col items-center gap-1 pointer-events-auto">
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative w-full p-1.5 rounded-[2.5rem] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="relative flex justify-between items-center px-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.link === pathname || (item.link !== "/" && pathname.startsWith(item.link));

                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className={`relative flex items-center justify-center transition-all duration-500 ease-in-out h-14
                        ${isActive ? "flex-[2] sm:flex-[1.5]" : "flex-1"}`}
                    >
                      {/* Aktif Arka Plan */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className={`absolute inset-0 rounded-[2rem] bg-gradient-to-r ${item.color} shadow-lg shadow-black/20`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      <div className={`relative z-10 flex items-center justify-center gap-2 px-2 
                        ${isActive ? "text-white" : "text-zinc-500"}`}>
                        
                        <Icon 
                          size={20} 
                          strokeWidth={isActive ? 2.5 : 2}
                          className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}
                        />

                        {/* Yazı Sadece Aktifken Mobilde Görünür */}
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              className="text-[10px] font-black uppercase tracking-tighter overflow-hidden whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bildirim Pulse */}
                      {item.id === "chat" && !isActive && (
                        <span className="absolute top-3 right-1/3 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kontrol Düğmesi - Daha Minimal */}
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          className="w-12 h-6 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/5 rounded-full hover:bg-black/60 transition-colors shadow-lg"
        >
          <ChevronDown
            size={14}
            className={`text-zinc-500 transition-transform duration-500 ${isVisible ? "rotate-0" : "rotate-180"}`}
          />
        </motion.button>
      </div>
    </nav>
  );
}
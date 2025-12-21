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
    { id: "home", icon: Megaphone, label: "Reklamlar", link: "/", color: "from-blue-500 to-cyan-400" },
    { id: "wheel", icon: LoaderPinwheel, label: "Çark", link: "/wheel", color: "from-amber-500 to-orange-400" },
    { id: "extra", icon: Coins, label: "Ek Kazanç", link: "/extra", color: "from-emerald-500 to-teal-400" },
    { id: "chat", icon: MessageCircle, label: "Sohbet", link: "/chat", color: "from-indigo-500 to-purple-400" },
    { id: "premium", icon: Crown, label: "VIP", link: "/premium", color: "from-fuchsia-600 to-pink-500" },
  ];

  return (
    // Genişliği %92'den %96'ya çıkardım ve max-w-md yerine max-w-lg kullanarak daha fazla alan sağladım.
    <nav className="fixed bottom-1 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-lg pointer-events-none">
      <div className="flex flex-col items-center gap-2 pointer-events-auto">
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              // p-2 yerine px-3 py-2 yaparak yanlardan genişlettim. rounded miktarını dengeledim.
              className="relative w-full px-3 py-2 rounded-[2.2rem] bg-zinc-950/80 dark:bg-black/85 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Lüks Arka Plan Efekti */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-indigo-600 rounded-full blur-[60px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-fuchsia-600 rounded-full blur-[60px]" />
              </div>

              <div className="relative flex justify-between items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.link === pathname || (item.link !== "/" && pathname.startsWith(item.link));

                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      // py-3.5 yerine flex-grow kullanarak içeriğin genişliğine göre yayılmasını sağladım.
                      className="relative flex flex-1 flex-col items-center justify-center py-4 outline-none group min-w-0"
                    >
                      {/* Aktif Pill (Vurgu) - Yazıları tam kaplaması için inset-x değerini 0.5 yaptım */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className={`absolute inset-x-0.5 inset-y-1.5 rounded-[1.8rem] bg-gradient-to-br ${item.color} shadow-lg`}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}

                      <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
                        isActive ? "scale-105 text-white" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}>
                        <div className={`p-1 rounded-xl transition-all duration-500 ${isActive ? "bg-black/20" : ""}`}>
                          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        {/* whitespace-nowrap ve text-[8px] ile taşmayı engelledim, tracking'i hafifçe kıstım */}
                        <span className={`text-[8px] md:text-[9px] font-black mt-1 uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-70"
                        }`}>
                          {item.label}
                        </span>
                      </div>

                      {/* Bildirim Pulse */}
                      {item.id === "chat" && !isActive && (
                        <div className="absolute top-4 right-1/4 w-1.5 h-1.5 bg-indigo-500 rounded-full">
                           <div className="w-full h-full bg-indigo-500 rounded-full animate-ping opacity-75" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KONTROL DÜĞMESİ */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(!isVisible)}
          className="group flex items-center justify-center w-16 h-7 bg-zinc-950/90 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl transition-all"
        >
          <ChevronDown
            size={14}
            className={`text-zinc-500 group-hover:text-white transition-transform duration-500 ${
              isVisible ? "rotate-0" : "rotate-180"
            }`}
          />
        </motion.button>
      </div>
    </nav>
  );
}
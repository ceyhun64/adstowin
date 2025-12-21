"use client";
import React, { useState, useEffect } from "react";
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
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // 1. ADIM: Tanımlı olmayan bir sayfada (404) gizlemek için geçerli rotaların listesi
  const validRoutes = [
    "/",
    "/wheel",
    "/extra",
    "/chat",
    "/premium",
    "/profile",
    "/wallet",
  ];

  // 2. ADIM: Eğer pathname geçerli rotalardan birini içermiyorsa null döndür (Hiç render etme)
  // Not: Eğer alt sayfalarınız varsa startsWith kontrolü de ekleyebilirsiniz.
  const isNotFound = !validRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  if (isNotFound) return null;

  const navItems: NavItem[] = [
    { id: "home", icon: Megaphone, label: "Reklamlar", link: "/" },
    { id: "wheel", icon: LoaderPinwheel, label: "Çark", link: "/wheel" },
    { id: "extra", icon: Coins, label: "Ek Kazanç", link: "/extra" },
    { id: "chat", icon: MessageCircle, label: "Chat", link: "/chat" },
    { id: "premium", icon: Crown, label: "Premium", link: "/premium" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-0.5 md:px-4 pointer-events-none">
      <div className="relative flex flex-col items-center gap-0 pointer-events-auto">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full rounded-[2rem] border border-white/20 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="flex justify-around items-center px-0 md:px-2 py-2 md:py-2 relative">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.link === pathname ||
                    (item.link !== "/" && pathname.startsWith(item.link));

                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="relative group flex flex-1 flex-col items-center justify-center py-0.5 transition-colors outline-none"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-x-1 inset-y-0 rounded-3xl bg-violet-600 shadow-lg shadow-indigo-500/30"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      <div
                        className={`relative z-10 flex py-2 px-2 md:py-3 md:px-2 flex-col items-center transition-transform duration-300 ${
                          isActive
                            ? "scale-110 text-white"
                            : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                      >
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[8px] md:text-[10px] font-bold mt-1 uppercase tracking-tighter">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(!isVisible)}
          className={`w-12 h-6 flex items-center justify-center border border-white/20 bg-white/80 dark:bg-zinc-900/90 shadow-xl transition-all duration-300 ${
            isVisible ? "rounded-b-full" : "rounded-t-full"
          }`}
        >
          <ChevronDown
            size={16}
            className={`text-zinc-900 dark:text-zinc-300 transition-transform duration-500 ${
              isVisible ? "rotate-0" : "rotate-180"
            }`}
          />
        </motion.button>
      </div>
    </nav>
  );
}

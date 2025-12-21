"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import {
  X,
  User,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Info,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

/* -------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------- */
interface HamburgerMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

interface SessionUser {
  name?: string;
  surname?: string;
  email?: string;
}

/* -------------------------------------------------- */
/* COMPONENT */
/* -------------------------------------------------- */
export default function HamburgerMenu({
  isMenuOpen,
  onClose,
}: HamburgerMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<"tr" | "en" | "pt">("tr");

  /* Statik değerler (şimdilik) */
  const payoneerId = "PY-88231";
  const wheelSpins = 12;

  /* -------------------------------------------------- */
  /* MOUNT GUARD (hydration safe) */
  /* -------------------------------------------------- */
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  /* -------------------------------------------------- */
  /* BODY SCROLL LOCK */
  /* -------------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  /* -------------------------------------------------- */
  /* FETCH SESSION USER */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!mounted) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/account/check", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [mounted]);
  console.log(user);

  /* -------------------------------------------------- */
  /* ACTIONS */
  /* -------------------------------------------------- */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      onClose();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* MENU */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="fixed right-0 top-0 z-[9999] h-full w-full max-w-sm bg-white dark:bg-[#0F0F0F] shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-black italic tracking-tighter">
                    MENÜ
                  </h2>
                  <div className="h-1 w-8 bg-indigo-500 rounded-full mt-1" />
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-black/5 dark:bg-white/10 hover:rotate-90 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* USER CARD */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm dark:text-white">
                      {user
                        ? `${user.name ?? ""} ${user.surname ?? ""}`.trim()
                        : "Misafir"}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {user?.email ?? "Giriş yapılmadı"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <InfoBox label="Payoneer ID" value={payoneerId} />
                  <InfoBox label="Çark Hakkı" value={wheelSpins} highlight />
                </div>
              </div>

              {/* ACCOUNT */}
              <Section title="Hesap & Destek">
                <MenuLink
                  icon={User}
                  label="Profil"
                  href="/profile"
                  onClick={onClose}
                />
                <MenuLink
                  icon={Shield}
                  label="Güvenlik Ayarları"
                  href="/account/security_settings"
                  onClick={onClose}
                />
                <MenuLink
                  icon={HelpCircle}
                  label="Yardım & SSS"
                  href="/account/help_faq"
                  onClick={onClose}
                />
                <MenuLink
                  icon={FileText}
                  label="Destek Talep"
                  href="/account/support_requests"
                  onClick={onClose}
                />
                <MenuButton
                  icon={LogOut}
                  label="Güvenli Çıkış"
                  danger
                  onClick={handleLogout}
                />
              </Section>

              {/* LEGAL */}
              <Section title="Yasal & Kurumsal">
                <MenuLink
                  icon={Info}
                  label="Kullanım Koşulları"
                  href="/info/terms_of_use"
                  onClick={onClose}
                />
                <MenuLink
                  icon={Shield}
                  label="Gizlilik Politikası"
                  href="/info/privacy_policy"
                  onClick={onClose}
                />
                <MenuLink
                  icon={ShieldAlert}
                  label="Hile Karşıtı Politika"
                  href="/info/anti_cheat_policy"
                  onClick={onClose}
                />
                <MenuLink
                  icon={FileText}
                  label="Çerez Politikası"
                  href="/info/cookie_policy"
                  onClick={onClose}
                />
                <MenuLink
                  icon={User}
                  label="Hakkımızda"
                  href="/info/about"
                  onClick={onClose}
                />
              </Section>

              {/* SETTINGS */}
              {/* SETTINGS */}
              <Section title="Uygulama Ayarları">
                {/* 🌍 DİL SEÇİMİ */}
                <div className="mb-4">
                 

                  <div className="grid grid-cols-3 gap-2">
                    <LangButton
                      active={language === "tr"}
                      label="TR"
                      onClick={() => setLanguage("tr")}
                    />
                    <LangButton
                      active={language === "en"}
                      label="EN"
                      onClick={() => setLanguage("en")}
                    />
                    <LangButton
                      active={language === "pt"}
                      label="PT"
                      onClick={() => setLanguage("pt")}
                    />
                  </div>
                </div>

                {/* 🌙 TEMA */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl
      bg-black/5 dark:bg-white/5
      hover:bg-black/10 dark:hover:bg-white/10
      transition-all"
                >
                  {theme === "dark" ? (
                    <Moon size={18} className="text-indigo-400" />
                  ) : (
                    <Sun size={18} className="text-orange-500" />
                  )}
                  <span className="text-sm font-bold dark:text-white">
                    Tema Değiştir
                  </span>
                </button>
              </Section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* -------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------- */

function Section({ title, children }: any) {
  return (
    <section className="mb-8">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function InfoBox({ label, value, highlight }: any) {
  return (
    <div className="bg-white dark:bg-black/40 p-2 rounded-xl border border-black/5 dark:border-white/5">
      <span className="block opacity-50 mb-0.5">{label}</span>
      <span
        className={`font-bold ${
          highlight ? "dark:text-emerald-400" : "dark:text-indigo-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MenuLink({ icon: Icon, label, href, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all group"
    >
      <div className="flex items-center gap-3 text-sm font-bold dark:text-slate-200">
        <Icon size={18} className="opacity-70" />
        {label}
      </div>
      <ChevronRight size={14} className="opacity-40" />
    </Link>
  );
}

function MenuButton({ icon: Icon, label, danger, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
        danger
          ? "text-red-500 hover:bg-red-500/10"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3 text-sm font-bold">
        <Icon size={18} />
        {label}
      </div>
      <ChevronRight size={14} className="opacity-40" />
    </button>
  );
}

function LangButton({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 rounded-xl text-xs font-black transition-all
        border ${
          active
            ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/30"
            : "bg-black/5 dark:bg-white/5 hover:bg-indigo-500/10 border-black/5 dark:border-white/10 dark:text-white"
        }`}
    >
      {label}
    </button>
  );
}

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
  Zap,
  Star,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface HamburgerMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({
  isMenuOpen,
  onClose,
}: HamburgerMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<"tr" | "en" | "pt">("tr");

  const payoneerId = "PY-88231";
  const wheelSpins = 12;

  useEffect(() => {
    setMounted(true);

    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

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

    if (isMenuOpen) fetchUser();
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      onClose();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* ARKA PLAN BULANLAŞTIRMA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-[#020617]/40 backdrop-blur-md z-[9998]"
          />

          {/* MENÜ GÖVDESİ */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[9999] h-full w-full max-w-[380px] bg-white dark:bg-[#020617] border-l border-slate-200 dark:border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.2)] dark:shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* ÜST GRADYAN EFEKTİ */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-indigo-500/5 dark:from-indigo-600/10 to-transparent pointer-events-none" />

            <div className="relative flex flex-col h-full z-10">
              {/* HEADER */}
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />

                  <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 dark:text-slate-500 uppercase italic">
                    Kontrol Paneli
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:rotate-90"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 pb-12 custom-scrollbar">
                {/* KULLANICI KARTI (LÜKS TASARIM) */}
                <div className="relative p-6 rounded-[28px] bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/[0.05] dark:to-transparent border border-slate-200 dark:border-white/10 mb-10 overflow-hidden group shadow-sm dark:shadow-none">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-600/10 blur-3xl group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-600/20 transition-all" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-indigo-500/20">
                        {user?.name ? user.name[0] : <User size={24} />}
                      </div>

                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-[#020617] rounded-full" />
                    </div>

                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold tracking-tight text-lg">
                        {user
                          ? `${user.name ?? ""} ${user.surname ?? ""}`
                          : "Hoş Geldiniz"}
                      </h3>

                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-500 text-xs font-medium">
                        <Zap
                          size={10}
                          className="text-indigo-500 dark:text-indigo-400 fill-indigo-500 dark:fill-indigo-400"
                        />

                        {user?.email ?? "Misafir Oturumu"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <QuickStat
                      label="PAYONEER ID"
                      value={payoneerId}
                      icon={<Shield size={10} />}
                    />

                    <QuickStat
                      label="ÇARK HAKKI"
                      value={wheelSpins}
                      icon={<Star size={10} />}
                      active
                    />
                  </div>
                </div>

                {/* MENÜ GRUPLARI */}
                <div className="space-y-10">
                  <Section title="Yönetim & Profil">
                    <MenuLink
                      icon={User}
                      label="Hesap Bilgileri"
                      href="/profile"
                      onClick={onClose}
                    />

                    <MenuLink
                      icon={Shield}
                      label="Güvenlik & Gizlilik"
                      href="/account/security_settings"
                      onClick={onClose}
                    />

                    <MenuLink
                      icon={Shield}
                      label="Yardım & SSS"
                      href="/account/help_faq"
                      onClick={onClose}
                    />

                    <MenuLink
                      icon={HelpCircle}
                      label="Destek Merkezi"
                      href="/account/support_requests"
                      onClick={onClose}
                    />

                    {/* ÇIKIŞ BUTONU */}
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full group flex items-center justify-center gap-3 p-4 rounded-[20px] bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <LogOut
                        size={18}
                        className="text-red-500 group-hover:text-white transition-colors"
                      />

                      <span className="text-sm font-black uppercase tracking-[0.2em] text-red-600 group-hover:text-white">
                        Güvenli Çıkış
                      </span>
                    </button>
                  </Section>

                  <Section title="Ekosistem">
                    <MenuLink
                      icon={Info}
                      label="Kullanım Koşulları"
                      href="/info/terms_of_use"
                      onClick={onClose}
                    />

                    <MenuLink
                      icon={FileText}
                      label="Gizlilik Politikası"
                      href="/info/privacy_policy"
                      onClick={onClose}
                    />

                    <MenuLink
                      icon={ShieldAlert}
                      label="Hile Karşıtı Sistem"
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
                      icon={FileText}
                      label="Hakkımızda"
                      href="/info/about"
                      onClick={onClose}
                    />
                  </Section>

                  <Section title="Tercihler">
                    {/* DİL SEÇİCİ */}
                    <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 mb-3">
                      {["tr", "en", "pt"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang as any)}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                            language === lang
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                              : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* TEMA DEĞİŞTİR */}
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? (
                          <Moon
                            size={18}
                            className="text-indigo-500 dark:text-indigo-400"
                          />
                        ) : (
                          <Sun size={18} className="text-amber-500" />
                        )}

                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          Görünüm
                        </span>
                      </div>

                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white uppercase tracking-tighter">
                        {theme === "dark" ? "Karanlık" : "Aydınlık"}
                      </span>
                    </button>
                  </Section>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* YARDIMCI BİLEŞENLER */

function QuickStat({ label, value, icon, active }: any) {
  return (
    <div
      className={`p-3 rounded-2xl border ${
        active
          ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5"
      }`}
    >
      <div className="flex items-center gap-1.5 opacity-40 mb-1 text-slate-600 dark:text-slate-400">
        {icon}

        <span className="text-[8px] font-black tracking-widest uppercase">
          {label}
        </span>
      </div>

      <span
        className={`text-xs font-bold tracking-tight ${
          active
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-4 ml-1">
        {title}
      </h4>

      <div className="grid gap-1">{children}</div>
    </div>
  );
}

function MenuLink({ icon: Icon, label, href, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-[18px] hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/5 transition-all group"
    >
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        <Icon
          size={18}
          className="opacity-50 group-hover:opacity-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
        />

        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </div>

      <ChevronRight
        size={14}
        className="text-slate-300 dark:text-slate-700 group-hover:text-slate-700 dark:group-hover:text-white transition-all group-hover:translate-x-1"
      />
    </Link>
  );
}

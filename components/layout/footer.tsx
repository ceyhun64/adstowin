"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ShieldCheck,
  Globe,
  Twitter,
  Instagram,
  Send,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 overflow-hidden transition-colors duration-500">
      {/* Arka Plan Hafif Işıklandırma - Temaya göre renk değiştirir */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Bölüm 1: Marka Kimliği */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                <Image
                  src="/logo/logotrans.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white uppercase">
                ADS
                <span className="text-indigo-600 dark:text-indigo-500">
                  TOWIN
                </span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Dijital etkileşimi değere dönüştüren yeni nesil ekosistem.
              Markalar için şeffaf büyüme, topluluk için sürdürülebilir ödül
              altyapısı.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Send, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  <social.Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Bölüm 2: Kurumsal Linkler */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Kurumsal
            </h4>
            <ul className="space-y-4">
              {[
                "Hakkımızda",
                "Kullanım Koşulları",
                "Gizlilik Politikası",
                "KVKK Aydınlatma",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bölüm 3: Ekosistem Linkleri */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Ekosistem
            </h4>
            <ul className="space-y-4">
              {[
                "Hile Karşıtı Sistem",
                "Reklamveren Paneli",
                "Yayıncı Rehberi",
                "TKripto Whitepaper",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bölüm 4: İletişim & Hedef */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Destek & Vizyon
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400 group cursor-pointer">
                <Mail
                  size={18}
                  className="text-indigo-600 dark:text-indigo-500 shrink-0"
                />
                <div className="text-sm">
                  <p className="text-slate-900 dark:text-white font-medium">
                    Bize Ulaşın
                  </p>
                  <p className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    support@adsTOWIN.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <ShieldCheck
                  size={18}
                  className="text-emerald-600 dark:text-emerald-500 shrink-0"
                />
                <div className="text-sm">
                  <p className="text-slate-900 dark:text-white font-medium">
                    Güvenlik Sistemi
                  </p>
                  <p>256-bit SSL Koruma</p>
                </div>
              </div>
            </div>

            {/* TKripto Badge - Light mode'da daha belirgin hale getirildi */}
            <div className="p-4 rounded-2xl bg-indigo-600/5 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 shadow-sm dark:shadow-none">
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest mb-1">
                Roadmap Milestone
              </p>
              <div className="flex items-center justify-between text-xs text-slate-900 dark:text-white">
                <span>TKripto Listing</span>
                <span className="font-bold">07/07/2027</span>
              </div>
              <div className="mt-2 w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-indigo-600 dark:bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {currentYear}{" "}
            <span className="text-slate-900 dark:text-white font-bold">
              ADS
              <span className="text-indigo-600 dark:text-indigo-500 font-medium">
                TOWIN
              </span>
            </span>
            . Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
            <div className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-300 transition-colors cursor-pointer">
              <Globe size={12} />
              TR / EN
            </div>
            <p className="hidden sm:block">
              Made for the future of digital assets
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

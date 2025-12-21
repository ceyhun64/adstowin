"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const translations: Record<string, string> = {
  home: "Anasayfa",
  products: "Tüm Ürünler",
  about: "Hakkımızda",
  contact: "İletişim",
  login: "Giriş Yap",
  register: "Kayıt Ol",
  profile: "Profilim",
  cart: "Sepetim",
  checkout: "Ödeme",
};

function translateSegment(segment: string): string {
  return translations[segment.toLowerCase()] || segment.replace(/-/g, " ");
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  return (
    <nav className="text-sm sm:text-md breadcrumbs mb-0 md:mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Anasayfa
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const translated = translateSegment(segment);
          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-700 font-semibold">
                  {translated}
                </span>
              ) : (
                <Link href={href} className="text-gray-500 hover:text-gray-700">
                  {translated}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const MobileHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          ADSTOWIN
        </Link>

        {/* Hamburger Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Content */}
      {menuOpen && (
        <div className="bg-slate-800 p-4 space-y-2">
          <h3 className="text-white font-semibold">
            Kullanıcı Yönetimi & Destek
          </h3>
          <ul className="text-gray-200 space-y-1">
            <li>Profil Hesap Bilgileri</li>
            <li>Reklamları Kaldır / TKripto Kazancı</li>
            <li>Güvenlik Ayarları</li>
            <li>Yardım / SSS</li>
            <li>Destek Ticket</li>
            <li>Güvenli Çıkış</li>
          </ul>

          <h3 className="text-white font-semibold mt-4">Yasal & Kurumsal</h3>
          <ul className="text-gray-200 space-y-1">
            <li>Kullanım Koşulları</li>
            <li>Gizlilik Politikası</li>
            <li>Hile Karşıtı Politika</li>
            <li>Çerez Politikası</li>
            <li>Hakkımızda</li>
          </ul>

          <h3 className="text-white font-semibold mt-4">Ek Seçenekler</h3>
          <ul className="text-gray-200 space-y-1">
            <li>Dil Seçenekleri</li>
            <li>Karanlık Mod / Tema</li>
          </ul>
        </div>
      )}
    </header>
  );
};

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 flex justify-around p-2 z-40">
      <Link href="/ads" className="text-white text-center">
        Reklamlar
      </Link>
      <Link href="/spin" className="text-white text-center">
        Çark
      </Link>
      <Link href="/earn" className="text-white text-center">
        Ek Kazanç
      </Link>
      <Link href="/chat" className="text-white text-center">
        Chat
      </Link>
      <Link href="/premium" className="text-white text-center">
        Premium
      </Link>
    </nav>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="pb-16">
      <MobileHeader />
      <main className="mt-16">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
export { Breadcrumb };

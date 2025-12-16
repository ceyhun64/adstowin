"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import HamburgerMenu from "./hamburgerMenu"; // Yolu kontrol edin
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menü açma/kapama işlevi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mock user data
  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    isPremium: false,
    balance: 15.75,
    tkripto: 2.5,
  };

  return (
    // 'relative' sınıfını ekledik, böylece HamburgerMenu'deki 'absolute' doğru çalışır.
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div className="hidden sm:block">
            <Link href="/">
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                AdsToWin
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Reklam Ver - Para Kazan
              </p>
            </Link>
          </div>
        </div>

        {/* User Info - Desktop (Menüye yakın hizalandı) */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="text-xs opacity-70">Bakiye</div>
              <div className="font-bold text-green-500">
                ${user.balance.toFixed(2)}
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="text-xs opacity-70">TKripto</div>
              <div className="font-bold text-purple-500">
                {user.tkripto.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Hamburger/Kapatma Butonu */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none"
            aria-label={isMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-900 dark:text-white" />
            ) : (
              <Menu size={24} className="text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Hamburger Menü Componenti */}
      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

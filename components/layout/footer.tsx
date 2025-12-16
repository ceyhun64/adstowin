import React from "react";

// isDarkMode prop'unu kaldırdık ve interface'i sildik.
// export default function Footer({ isDarkMode }: FooterProps) { // Önceki satır
export default function Footer() {
  return (
    <footer
      // Temayı belirlemek için koşullu sınıf yerine sadece Tailwind dark sınıflarını kullandık.
      // `.dark` sınıfı `<html>` elementindeyken stiller otomatik olarak uygulanacaktır.
      className="mt-20 mb-18 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              {/* Logo metnini dark/light moddan etkilenmesi için ayarladık */}
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                AdsTown
              </span>
            </div>
            <p
              // Koşullu sınıf yerine dark:text-gray-400 kullandık
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Reklam izleyerek para kazanın. TKripto ile geleceğe yatırım yapın.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  // Koşullu sınıf yerine dark: hover: sınıflarını kullandık
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                >
                  Kullanım Koşulları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                >
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                >
                  Hile Karşıtı Politika
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                >
                  Hakkımızda
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">İletişim</h4>
            <p
              // Koşullu sınıf yerine dark:text-gray-400 kullandık
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Email: info@adstown.com
              <br />
              Destek: support@adstown.com
            </p>
            <div className="mt-4">
              <p className="text-xs opacity-70">
                TKripto Borsa Hedefi: 7/7/2027
              </p>
            </div>
          </div>
        </div>

        <div
          // Koşullu sınıf yerine dark:border-gray-700 ve dark:text-gray-400 kullandık
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <p>&copy; 2024 AdsTown.com - Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

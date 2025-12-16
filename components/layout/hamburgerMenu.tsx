import React from "react";
import {
  User,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
interface HamburgerMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

// PropTypes olarak isMenuOpen ve onClose eklendi
export default function HamburgerMenu({ isMenuOpen, onClose }: HamburgerMenuProps) {
  // Bu state artık Navbar tarafından yönetileceği için kaldırıldı.
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = React.useState("home");

  // Theme toggle fonksiyonu
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  // Menü kapalıysa null döndür.
  if (!isMenuOpen) return null;

  // Menü içindeki bir öğeye tıklandığında hem sayfayı ayarlar hem de menüyü kapatır.
  const handleMenuItemClick = (page: string) => {
    setCurrentPage(page);
    onClose(); // Menüyü kapatmak için dışarıdan gelen işlevi çağır
  };

  return (
    // Menü, Navbar'ın altında görünecek şekilde konumlandırıldı.
    <div className="absolute right-0 top-full w-80 bg-white dark:bg-gray-800 border-l border-b border-gray-200 dark:border-gray-700 shadow-xl max-h-[80vh] overflow-y-auto z-40">
      {/* 1 - KULLANICI YÖNETİMİ VE DESTEK */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-sm mb-3 opacity-70">
          Kullanıcı Yönetimi ve Destek
        </h3>

        {/* A - Profil Hesap Bilgileri */}
        <button
          onClick={() => handleMenuItemClick("profile")}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          <div className="flex items-center space-x-3">
            <User size={20} />
            <span>Profil</span>
          </div>
          <ChevronRight size={16} />
        </button>

        {/* B - Güvenlik Ayarları */}
        <button
          onClick={() => handleMenuItemClick("security")}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          <div className="flex items-center space-x-3">
            <Shield size={20} />
            <span>Güvenlik Ayarları</span>
          </div>
          <ChevronRight size={16} />
        </button>

        {/* C - Yardım & SSS */}
        <button
          onClick={() => handleMenuItemClick("help")}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle size={20} />
            <span>Yardım & SSS</span>
          </div>
          <ChevronRight size={16} />
        </button>

        {/* D - Destek Ticket */}
        <button
          onClick={() => handleMenuItemClick("support")}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          <div className="flex items-center space-x-3">
            <FileText size={20} />
            <span>Destek Ticket</span>
          </div>
          <ChevronRight size={16} />
        </button>

        {/* E - Güvenli Çıkış */}
        <button
          onClick={() => {
            alert("Güvenli çıkış yapılıyor...");
            onClose(); // Çıkış yapıldıktan sonra menüyü kapat
          }}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          <div className="flex items-center space-x-3">
            <LogOut size={20} />
            <span>Güvenli Çıkış</span>
          </div>
        </button>
      </div>

      {/* 2 - YASAL VE KURUMSAL BİLGİLER (Diğer butonlar aynı mantıkla handleMenuItemClick ile güncellenmelidir.) */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-sm mb-3 opacity-70">
          Yasal ve Kurumsal Bilgiler
        </h3>

        <button
          onClick={() => handleMenuItemClick("terms")}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          Kullanım Koşulları
        </button>
        <button
          onClick={() => handleMenuItemClick("privacy")}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          Gizlilik Politikası
        </button>
        <button
          onClick={() => handleMenuItemClick("anticheat")}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          Hile Karşıtı Politika
        </button>
        <button
          onClick={() => handleMenuItemClick("cookies")}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
        >
          Çerez Politikası
        </button>
        <button
          onClick={() => handleMenuItemClick("about")}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Hakkımızda
        </button>
      </div>

      {/* 3 - EK SEÇENEKLER (DİL VE TEMA) */}
      <div className="p-4">
        <h3 className="font-bold text-sm mb-3 opacity-70">Ek Seçenekler</h3>

        {/* A - Dil Seçenekleri (Şimdilik çalışmıyor) */}
        <div className="mb-3">
          <label className="block text-sm mb-2">Dil Seçenekleri</label>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-lg flex-1 bg-gray-100 dark:bg-gray-700">
              🇹🇷 TR
            </button>
            <button className="px-4 py-2 rounded-lg flex-1 bg-gray-100 dark:bg-gray-700">
              🇬🇧 EN
            </button>
            <button className="px-4 py-2 rounded-lg flex-1 bg-gray-100 dark:bg-gray-700">
              🇵🇹 PT
            </button>
          </div>
        </div>

        {/* B - Karanlık Mod / Tema */}
        <div>
          <label className="block text-sm mb-2">Tema</label>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <span className="dark:hidden">Aydınlık Mod</span>
            <span className="hidden dark:inline">Karanlık Mod</span>
            <Sun size={20} className="dark:hidden" />
            <Moon size={20} className="hidden dark:inline" />
          </button>
        </div>
      </div>
    </div>
  );
}

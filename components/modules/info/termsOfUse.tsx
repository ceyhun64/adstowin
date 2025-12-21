"use client";
import React from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileText,
  ChevronRight,
  Home,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

const KullanimKosullari = () => {
  const sections = [
    {
      id: 1,
      title: "Genel Hükümler",
      icon: FileText,
      content: [
        "ADSTOWIN platformuna erişim ve kullanım, bu kullanım koşullarının kabulü ile mümkündür.",
        "18 yaş ve üzeri kullanıcılar platforma kayıt olabilir.",
        "Kayıt sırasında verilen bilgilerin doğru ve güncel olması kullanıcının sorumluluğundadır.",
        "Her kullanıcı yalnızca bir hesap oluşturabilir. Çoklu hesap kullanımı tespit edildiğinde tüm hesaplar kapatılır.",
      ],
    },
    {
      id: 2,
      title: "Platform Kullanımı",
      icon: CheckCircle2,
      content: [
        "Kullanıcılar reklam izleyerek, çark çevirerek ve ek görevler tamamlayarak kazanç elde edebilir.",
        "Normal üyeler saatte 1 kez, Premium üyeler saatte 2 kez çark çevirebilir.",
        "Reklam izleme süresi 15 saniyedir ve süre dolmadan çıkış yapılamaz.",
        "Premium üyeler reklam izlerken ekrana çıkan kodu doğru girerek ekstra kazanç sağlayabilir.",
        "Kazançlar minimum çekim limitine ulaştığında Payoneer veya Litecoin ile çekilebilir.",
      ],
    },
    {
      id: 3,
      title: "Reklam Verme Kuralları",
      icon: Scale,
      content: [
        "Reklam verenler minimum 1000 gösterim satın almalıdır.",
        "Normal reklam: 1000 gösterim = 5 USD, gösterim başına 0.005 USD",
        "Premium reklam: 1000 gösterim = 20 USD, gösterim başına 0.02 USD",
        "Reklam içerikleri yasalara uygun olmalı, yanıltıcı içerik içermemelidir.",
        "Kullanıcılar her reklamı yalnızca 1 kez tıklayabilir.",
        "Reklam verenler kampanya istatistiklerini anlık olarak takip edebilir.",
      ],
    },
    {
      id: 4,
      title: "Premium Üyelik",
      icon: Shield,
      content: [
        "Aylık Premium: 4.99 USD",
        "Yıllık Premium: 39.99 USD (yaklaşık %33 indirim)",
        "Premium üyeler sabit reklamlardan muaftır.",
        "Premium üyeler saatte 2 kez çark çevirebilir.",
        "Premium üyeler reklam izlerken kod girişi ile 2x kazanç sağlar.",
        "Premium üyelik iptali için destek birimi ile iletişime geçilmelidir.",
      ],
    },
    {
      id: 5,
      title: "TKripto Token Sistemi",
      icon: CoinsIcon, // Özel ikon veya Coins
      content: [
        "TKripto, ADSTOWIN'un özel kripto token'ıdır ve 7/7/2027 tarihinde borsaya açılması hedeflenmektedir.",
        "Toplam 6 adet TKripto üretilecek, 5'i dağıtılacak, 1'i kurucuda kalacaktır.",
        "Aylık çark yarışmalarında en başarılı kullanıcılara TKripto ödülü verilir.",
        "Yıl sonunda en çok TKripto dağıtan kullanıcı 1 AKripto alacaktır.",
        "TKripto transferleri ve değişimi platform içinde gerçekleştirilir.",
      ],
    },
    {
      id: 6,
      title: "Yasaklı Davranışlar",
      icon: AlertTriangle,
      content: [
        "Bot, script veya otomatik araçlar kullanmak kesinlikle yasaktır.",
        "VPN, proxy veya IP maskeleme araçları kullanımı yasaktır.",
        "Sahte tıklama, hileli kazanç elde etme girişimleri tespit edildiğinde hesap kalıcı kapatılır.",
        "Çoklu hesap açma ve yönetme yasaktır.",
        "Sistemde hata bulunması durumunda bu hatadan yararlanmak yerine destek birimine bildirilmelidir.",
        "Diğer kullanıcıları rahatsız edici davranışlar, chat'te küfür ve hakaret yasaktır.",
      ],
    },
    {
      id: 7,
      title: "Ödeme ve Çekim Koşulları",
      icon: Scale,
      content: [
        "Minimum çekim limiti: 10 USD",
        "Çekim talepleri 1-7 iş günü içinde işleme alınır.",
        "Payoneer ve Litecoin ödeme yöntemleri desteklenmektedir.",
        "Çekim ücretleri ödeme yöntemine göre değişiklik gösterebilir.",
        "Şüpheli aktivite tespit edilen hesaplarda çekim işlemleri askıya alınabilir.",
        "Kullanıcı bilgileri ile ödeme bilgileri uyuşmuyorsa çekim reddedilir.",
      ],
    },
    {
      id: 8,
      title: "Sorumluluk Reddi",
      icon: Shield,
      content: [
        "ADSTOWIN, üçüncü taraf reklamların içeriğinden sorumlu değildir.",
        "Platform kesintisiz hizmet garantisi vermez, bakım ve güncelleme dönemlerinde geçici kesintiler olabilir.",
        "Kullanıcıların hesap güvenliği kendi sorumluluğundadır.",
        "Platform, kurallara uymayan kullanıcıların hesaplarını önceden bildirimde bulunmaksızın kapatma hakkını saklı tutar.",
        "TKripto'nun borsaya açılması bir hedeftir ve garanti edilmemektedir.",
      ],
    },
    {
      id: 9,
      title: "Değişiklik Hakkı",
      icon: FileText,
      content: [
        "ADSTOWIN, kullanım koşullarını önceden bildirimde bulunarak değiştirme hakkını saklı tutar.",
        "Önemli değişiklikler kullanıcılara e-posta ile bildirilir.",
        "Değişiklikler yürürlüğe girdikten sonra platformu kullanmaya devam etmek, yeni koşulların kabul edildiği anlamına gelir.",
        "Kullanıcılar, koşulları düzenli olarak kontrol etmekle yükümlüdür.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300 pt-20">
      {/* 📢 Sabit Reklam Alanı */}
      <div className="bg-white/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 backdrop-blur-md sticky top-0 z-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="bg-indigo-600/10 dark:bg-indigo-500/10 rounded-2xl py-2 px-4 border border-indigo-200/50 dark:border-indigo-500/20 flex items-center justify-center gap-2">
            <span className="animate-pulse w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest text-center">
              Reklam Alanı • Kampanyaları Keşfedin
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 🧭 Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <Link
                href="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <span className="font-medium text-slate-900 dark:text-white">
                Kullanım Koşulları
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              Kullanım{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                Koşulları
              </span>
            </h1>
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-400">
            Son Güncelleme: 18 Aralık 2025
          </div>
        </div>

        {/* 📝 Giriş Özeti */}
        <div className="relative group mb-12 p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Scale size={120} className="text-indigo-600" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/20">
              <Shield size={24} />
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              ADSTOWIN platformunu kullanarak aşağıdaki kullanım koşullarını
              kabul etmiş sayılırsınız. Bu metin, platform üzerindeki
              haklarınızı ve sorumluluklarınızı belirleyen yasal bir çerçevedir.
            </p>
          </div>
        </div>

        {/* 📂 Maddeler Grid/List */}
        <div className="grid gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="group bg-white dark:bg-white/[0.03] rounded-3xl border border-slate-200 dark:border-white/10 p-6 md:p-8 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <section.icon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-widest">
                      Madde 0{section.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-slate-600 dark:text-slate-400"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ⚠️ Önemli Uyarı Kutusu */}
        <div className="mt-16 p-8 rounded-[2rem] bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl text-white">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="text-xl font-black text-amber-800 dark:text-amber-500 mb-2">
                Önemli Uyarı
              </h4>
              <p className="text-amber-700 dark:text-amber-200/70 text-sm leading-relaxed font-medium">
                Bu kullanım koşullarına uymayan kullanıcıların hesapları önceden
                bildirimde bulunulmaksızın askıya alınabilir veya kalıcı olarak
                kapatılabilir. Sistem dürüstlüğü bizim için en öncelikli
                kuraldır.
              </p>
            </div>
          </div>
        </div>

        {/* 💬 Footer CTA */}
        <div className="mt-12 text-center flex flex-col items-center">
          <div className="w-1 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full mb-8" />
          <h4 className="text-slate-900 dark:text-white font-bold mb-4">
            Hala sorularınız mı var?
          </h4>
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
          >
            <MessageCircle
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            Destek Ekibine Yazın
          </Link>
          <Link
            href="/"
            className="mt-6 text-sm text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

// Basit bir ikon (CoinsIcon) tanımlaması ya da Lucide'den çekme
function CoinsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

export default KullanimKosullari;

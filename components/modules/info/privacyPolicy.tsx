"use client";
import React from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  AlertCircle,
  Home,
  ChevronRight,
  ArrowLeft,
  Mail,
} from "lucide-react";

const GizlilikPolitikasi = () => {
  const sections = [
    {
      id: 1,
      title: "Toplanan Veriler",
      icon: Database,
      content: [
        {
          subtitle: "Kişisel Bilgiler",
          items: [
            "Ad Soyad",
            "E-posta adresi",
            "Payoneer ID (ödeme için)",
            "IP adresi ve konum bilgisi",
            "Cihaz ve tarayıcı bilgileri",
          ],
        },
        {
          subtitle: "Kullanım Verileri",
          items: [
            "Platform kullanım alışkanlıkları",
            "İzlenen reklam sayısı ve süreleri",
            "Kazanç geçmişi ve çekim talepleri",
            "Chat mesajları ve aktiviteleri",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Verilerin Kullanım Amaçları",
      icon: Eye,
      content: [
        {
          subtitle: "Temel Hizmetler",
          items: [
            "Hesap oluşturma ve yönetimi",
            "Ödeme işlemlerinin gerçekleştirilmesi",
            "Kazanç takibi ve raporlama",
            "Platform güvenliğinin sağlanması",
          ],
        },
        {
          subtitle: "İyileştirme ve Analiz",
          items: [
            "Kullanıcı deneyiminin geliştirilmesi",
            "Reklam hedeflemesi ve optimizasyonu",
            "Hile ve dolandırıcılık tespiti",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Veri Güvenliği",
      icon: Lock,
      content: [
        {
          subtitle: "Güvenlik Önlemleri",
          items: [
            "SSL/TLS şifreleme ile veri iletimi",
            "Şifrelenmiş veritabanı depolama",
            "İki faktörlü kimlik doğrulama (2FA) desteği",
            "Düzenli güvenlik denetimleri",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Çerez Kullanımı",
      icon: Globe,
      content: [
        {
          subtitle: "Çerez Türleri",
          items: [
            "Zorunlu Çerezler: Temel işlevsellik için",
            "Performans Çerezleri: Analiz amaçlı",
            "Hedefleme Çerezleri: Kişiselleştirilmiş reklamlar",
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Üçüncü Taraf Paylaşımı",
      icon: UserCheck,
      content: [
        {
          subtitle: "Paylaşım İlkeleri",
          items: [
            "Sadece gerekli minimum veri paylaşılır",
            "Kullanıcı verilerinin satışı kesinlikle yapılmaz",
            "Tüm entegrasyonlar güvenlik denetiminden geçer",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Kullanıcı Hakları",
      icon: Shield,
      content: [
        {
          subtitle: "Veri Erişim Hakları",
          items: [
            "Kişisel verilerinize erişim talebi",
            "Veri düzeltme ve silme (unutulma) hakkı",
            "Veri taşınabilirliği hakkı",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300 pt-20">
      {/* 🔒 Sabit Reklam Alanı */}
      <div className="bg-white/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="bg-indigo-600/10 dark:bg-indigo-500/10 rounded-2xl py-2 px-4 border border-indigo-200/50 dark:border-indigo-500/20 flex items-center justify-center gap-2">
            <Lock size={14} className="text-indigo-600 animate-pulse" />
            <p className="text-indigo-700 dark:text-indigo-300 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center">
              Verileriniz 256-bit SSL ile Korunmaktadır
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 🧭 Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-white">
                Gizlilik Politikası
              </span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              Güvenliğiniz{" "}
              <span className="text-indigo-600 italic">Önceliğimiz.</span>
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-400">
            <AlertCircle size={14} /> Revizyon: 18.12.2025
          </div>
        </div>

        {/* 🛡️ Intro Card */}
        <div className="mb-12 relative overflow-hidden p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 transition-all">
          <Shield
            size={180}
            className="absolute -right-10 -bottom-10 opacity-10 rotate-12"
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">
              Gizliliğiniz Bizim İçin Önemli
            </h2>
            <p className="text-indigo-50 leading-relaxed text-lg opacity-90">
              ADSTOWIN olarak, verilerinizin gizliliğine büyük önem veriyoruz.
              Bu politika, verilerinizin nasıl toplandığını, korunduğunu ve
              haklarınızı GDPR uyumlu olarak açıklamaktadır.
            </p>
          </div>
        </div>

        {/* 📋 Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="group bg-white dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/10 p-8 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <section.icon size={32} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-xs font-black text-indigo-600 mb-2 uppercase tracking-widest">
                    Bölüm 0{section.id}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {section.title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {section.content.map((sub, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm uppercase">
                          {sub.subtitle}
                        </h4>
                        <ul className="space-y-3">
                          {sub.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                            >
                              <CheckCircleIcon className="w-4 h-4 text-indigo-500 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✉️ Contact Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-2xl bg-slate-200 dark:bg-white/5 mb-8">
            <div className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Veri koruma ile ilgili sorularınız için:
                <span className="font-bold text-indigo-600 ml-1">
                  privacy@adstowin.com
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Verileriniz Üzerinde Kontrol Sizde
            </h3>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <Mail size={20} />
              GİZLİLİK EKİBİYLE İLETİŞİME GEÇ
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default GizlilikPolitikasi;

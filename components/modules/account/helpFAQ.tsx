"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Play,
  DollarSign,
  Shield,
  CreditCard,
  Users,
  Settings,
  MessageCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Platform Kullanımı
  {
    category: "Platform Kullanımı",
    question: "Çark nasıl çevirilir?",
    answer:
      "Ana sayfada bulunan 'Çarkı Çevir' butonuna tıklayarak çarkı çevirebilirsiniz. Her kullanıcı günde 3 kez ücretsiz çevirme hakkına sahiptir. Premium üyeler ek çevirme hakkı kazanır.",
  },
  {
    category: "Platform Kullanımı",
    question: "Reklam izleyerek nasıl para kazanabilirim?",
    answer:
      "'Reklam İzle' bölümünden 15 saniyelik reklamları izleyerek para kazanabilirsiniz. Normal reklamlar için 0.001$, Premium reklamlar için 0.01$ kazanırsınız. Premium üyeler normal reklamlardan 5x daha fazla kazanır.",
  },
  {
    category: "Platform Kullanımı",
    question: "Biletler nasıl kullanılır?",
    answer:
      "Normal ve Premium biletler aylık çekilişlerde kullanılır. Premium biletler daha yüksek ödül havuzuna katılır. Biletlerinizi 'Biletlerim' sayfasından görüntüleyebilirsiniz.",
  },
  {
    category: "Platform Kullanımı",
    question: "TKripto nedir?",
    answer:
      "TKripto platformumuzun özel kripto parasıdır. Çeşitli ödüllerden kazanabilir ve yakında gerçek paraya dönüştürebileceksiniz.",
  },

  // Ödeme Süreçleri
  {
    category: "Ödeme Süreçleri",
    question: "Minimum çekim limiti nedir?",
    answer:
      "Minimum çekim limiti 10$ olarak belirlenmiştir. Bakiyeniz bu miktara ulaştığında çekim talebinde bulunabilirsiniz.",
  },
  {
    category: "Ödeme Süreçleri",
    question: "Para çekme işlemi ne kadar sürer?",
    answer:
      "Para çekme talepleri 1-3 iş günü içinde işleme alınır. Payoneer üzerinden yapılan ödemeler genellikle 24 saat içinde hesabınıza ulaşır.",
  },
  {
    category: "Ödeme Süreçleri",
    question: "Hangi ödeme yöntemleri destekleniyor?",
    answer:
      "Şu anda Payoneer ödeme yöntemini destekliyoruz. Yakında daha fazla ödeme seçeneği eklenecektir.",
  },
  {
    category: "Ödeme Süreçleri",
    question: "Ödeme komisyonu var mı?",
    answer:
      "Platform komisyonu bulunmamaktadır. Sadece ödeme sağlayıcısının (Payoneer) standart transfer ücretleri geçerlidir.",
  },

  // Güvenlik ve Hile Karşıtı
  {
    category: "Güvenlik ve Hile Karşıtı",
    question: "Hesabım nasıl korunuyor?",
    answer:
      "Tüm hesaplar şifreli bağlantı ile korunmaktadır. İki faktörlü doğrulama (2FA) aktif ederek ek güvenlik sağlayabilirsiniz.",
  },
  {
    category: "Güvenlik ve Hile Karşıtı",
    question: "Hile yaparsam ne olur?",
    answer:
      "Hile, bot kullanımı veya çoklu hesap tespiti durumunda hesabınız kalıcı olarak askıya alınır ve kazançlarınız iptal edilir. Detaylar için Hile Karşıtı Politikamızı okuyun.",
  },
  {
    category: "Güvenlik ve Hile Karşıtı",
    question: "VPN kullanabilir miyim?",
    answer:
      "VPN kullanımı şüpheli aktivite olarak değerlendirilebilir. Hesap güvenliği için gerçek konumunuzdan giriş yapmanızı öneririz.",
  },
  {
    category: "Güvenlik ve Hile Karşıtı",
    question: "Şifremi unuttum, ne yapmalıyım?",
    answer:
      "Giriş sayfasındaki 'Şifremi Unuttum' linkine tıklayarak email adresinize şifre sıfırlama linki gönderebilirsiniz.",
  },

  // Premium Üyelik
  {
    category: "Premium Üyelik",
    question: "Premium üyelik avantajları nelerdir?",
    answer:
      "Premium üyeler reklamsız deneyim, 5x kazanç artışı, ekstra günlük çevirme hakkı, özel premium biletler ve öncelikli destek hizmetlerinden yararlanır.",
  },
  {
    category: "Premium Üyelik",
    question: "Premium üyelik ne kadar?",
    answer:
      "Aylık Premium üyelik 9.99$, yıllık üyelik ise 99.99$ (2 ay bedava) olarak belirlenmiştir.",
  },
  {
    category: "Premium Üyelik",
    question: "Premium üyeliğimi iptal edebilir miyim?",
    answer:
      "Evet, istediğiniz zaman premium üyeliğinizi iptal edebilirsiniz. İptal sonrası mevcut periyodunuz sonuna kadar premium avantajlardan yararlanmaya devam edersiniz.",
  },
];

const categories = [
  { name: "Tümü", icon: HelpCircle },
  { name: "Platform Kullanımı", icon: Play },
  { name: "Ödeme Süreçleri", icon: DollarSign },
  { name: "Güvenlik ve Hile Karşıtı", icon: Shield },
  { name: "Premium Üyelik", icon: CreditCard },
];

export default function HelpFAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tümü" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Yardım & SSS
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Sık sorulan sorular ve yardım dokümanları
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Sorunuzu yazın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                Aradığınız sonuç bulunamadı
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  <div className="flex-1">
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                      {faq.category}
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-slate-400 w-5 h-5 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[2.5rem] p-8 text-center">
          <MessageCircle className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Sorunuzu bulamadınız mı?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Destek ekibimize ulaşın, size yardımcı olmaktan mutluluk duyarız
          </p>
          <button
            onClick={() => (window.location.href = "/account/support_requests")}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all"
          >
            Destek Talebi Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}

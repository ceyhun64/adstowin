"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Play,
  DollarSign,
  Shield,
  CreditCard,
  MessageCircle,
  Sparkles,
  ArrowRight,
  LifeBuoy,
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

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tümü" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Arka Plan Işık Oyunları */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Bölümü */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">
              Destek Merkezi
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic uppercase">
            Nasıl{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Yardımcı
            </span>{" "}
            Olabiliriz?
          </h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
            Platform kullanımı, ödemeler ve güvenlik hakkında merak ettiğiniz
            her şey burada.
          </p>
        </motion.div>

        {/* Arama Barı - Modern Glassmorphism */}
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative flex items-center bg-[#0a0f1e]/80 border border-white/10 backdrop-blur-xl rounded-[1.8rem] overflow-hidden transition-all duration-300 group-focus-within:border-indigo-500/50">
            <Search
              className="ml-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Bir konu veya soru arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-6 bg-transparent outline-none text-white placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>

        {/* Kategoriler - Minimalist Şerit */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap border italic ${
                  isActive
                    ? "bg-white text-[#020617] border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    : "bg-white/[0.03] text-slate-500 border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-[#020617]" : "text-indigo-500"}
                />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Listesi - Akordiyon Tasarımı */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]"
              >
                <LifeBuoy size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-sm">
                  Eşleşen bir sonuç bulunamadı
                </p>
              </motion.div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                    expandedIndex === index
                      ? "bg-white/[0.04] border-indigo-500/30 shadow-2xl shadow-indigo-500/5"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] opacity-80 italic">
                        {faq.category}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-slate-200 group-hover:text-white transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`p-3 rounded-xl transition-all duration-500 ${
                        expandedIndex === index
                          ? "bg-indigo-500 text-white rotate-180"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-8 text-slate-400 leading-relaxed font-medium text-lg border-t border-white/5 pt-4 italic">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* İletişim Kartı - Ultra Modern Call-to-Action */}
        <motion.div whileHover={{ y: -5 }} className="relative mt-24 group p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-700" />
          <div className="relative bg-[#0a0f1e] border border-white/10 rounded-[2.8rem] p-10 md:p-16 overflow-hidden">
            {/* Arka plan deseni */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageCircle size={200} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20">
                <MessageCircle className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                  Özel Bir <span className="text-indigo-400">Desteğe</span> mi
                  İhtiyacınız Var?
                </h2>
                <p className="text-slate-400 font-medium max-w-lg mx-auto italic">
                  Sorunuzun yanıtını bulamadıysanız, 7/24 hizmet veren uzman
                  destek ekibimizle bir oturum başlatın.
                </p>
              </div>

              <button
                onClick={() =>
                  (window.location.href = "/account/support_requests")
                }
                className="flex items-center gap-3 px-10 py-5 bg-white text-[#020617] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 group/btn italic"
              >
                DESTEK TALEBİ OLUŞTUR
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

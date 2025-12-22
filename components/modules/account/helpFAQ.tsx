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
  {
    category: "Platform Kullanımı",
    question: "Çark nasıl çevirilir?",
    answer: "Ana sayfada bulunan 'Çarkı Çevir' butonuna tıklayarak çarkı çevirebilirsiniz. Her kullanıcı günde 3 kez ücretsiz çevirme hakkına sahiptir. Premium üyeler ek çevirme hakkı kazanır.",
  },
  {
    category: "Platform Kullanımı",
    question: "Reklam izleyerek nasıl para kazanabilirim?",
    answer: "'Reklam İzle' bölümünden 15 saniyelik reklamları izleyerek para kazanabilirsiniz. Normal reklamlar için 0.001$, Premium reklamlar için 0.01$ kazanırsınız.",
  },
  {
    category: "Ödeme Süreçleri",
    question: "Minimum çekim limiti nedir?",
    answer: "Minimum çekim limiti 10$ olarak belirlenmiştir. Bakiyeniz bu miktara ulaştığında çekim talebinde bulunabilirsiniz.",
  },
  {
    category: "Güvenlik ve Hile Karşıtı",
    question: "VPN kullanabilir miyim?",
    answer: "VPN kullanımı şüpheli aktivite olarak değerlendirilebilir. Hesap güvenliği için gerçek konumunuzdan giriş yapmanızı öneririz.",
  },
  {
    category: "Premium Üyelik",
    question: "Premium üyelik avantajları nelerdir?",
    answer: "Premium üyeler reklamsız deneyim, 5x kazanç artışı, ekstra günlük çevirme hakkı ve öncelikli destek hizmetlerinden yararlanır.",
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-24 md:pt-32 pb-16 px-4 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/5 dark:from-indigo-500/10 to-transparent blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400">
              DESTEK MERKEZİ & REHBER
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Nasıl <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              YARDIMCI
            </span>{" "}
            Olabiliriz?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-lg italic px-4 leading-relaxed">
            Sistem kullanımı, finansal süreçler ve güvenlik protokolleri hakkında merak ettiğiniz her detaya buradan ulaşabilirsiniz.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative group max-w-3xl mx-auto px-2">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-700" />
          <div className="relative flex items-center bg-white dark:bg-[#0a0f1e]/80 border border-slate-200 dark:border-white/10 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 group-focus-within:border-indigo-500">
            <Search className="ml-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Hangi konuda yardıma ihtiyacınız var?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-5 md:py-7 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-semibold text-base md:text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-start md:justify-center gap-3 overflow-x-auto pb-6 px-4 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => { setSelectedCategory(cat.name); setExpandedIndex(null); }}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap border italic shrink-0 shadow-sm ${
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-[#020617] border-slate-900 dark:border-white scale-105"
                    : "bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-500 border-slate-200 dark:border-white/5 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-white"
                }`}
              >
                <Icon size={14} className={isActive ? "text-indigo-400" : "text-indigo-500"} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto px-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white dark:bg-white/[0.01] border border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
                <LifeBuoy size={48} className="text-slate-300 dark:text-slate-800 mx-auto mb-6" />
                <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.3em] text-xs">Aramanızla eşleşen sonuç bulunamadı</p>
              </motion.div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  layout
                  className={`group rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                    expandedIndex === index
                      ? "bg-white dark:bg-white/[0.04] border-indigo-500/40 shadow-2xl shadow-indigo-500/5"
                      : "bg-white dark:bg-transparent border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-7 md:p-10 text-left"
                  >
                    <div className="space-y-2 pr-6">
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] italic">
                        {faq.category}
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-3 rounded-2xl transition-all duration-500 shrink-0 ${
                      expandedIndex === index ? "bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-600/30" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="px-7 pb-10 md:px-10 md:pb-12 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-xl border-t border-slate-100 dark:border-white/5 pt-6 italic">
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

        {/* Contact CTA */}
        <motion.div className="relative mt-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur-2xl opacity-5 dark:opacity-10" />
          <div className="relative bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 md:p-20 overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-indigo-500 pointer-events-none hidden lg:block">
              <MessageCircle size={320} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-[2rem] flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shadow-inner">
                <MessageCircle className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                  Kişisel <span className="text-indigo-600 dark:text-indigo-400">Desteğe</span> mi <br /> İhtiyacınız Var?
                </h2>
                <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto italic leading-relaxed">
                  Aradığınız yanıtı bulamadınız mı? Alanında uzman destek ekibimiz size yardımcı olmak için hazır bekliyor.
                </p>
              </div>

              <button className="group/btn flex items-center gap-4 px-10 py-6 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 italic shadow-2xl">
                DESTEK TALEBİ OLUŞTUR
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
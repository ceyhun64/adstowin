"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Clock,
  Loader2,
  Send,
  Headphones,
  LifeBuoy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  History,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: "OPEN" | "CLOSED" | "PENDING";
  adminReply: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function SupportTicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // API Simülasyonu
      setLoading(true);
      setTimeout(() => {
        setTickets([]); // Gerçek API gelince buraya data setlenecek
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Talepler senkronize edilemedi");
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      OPEN: {
        label: "Aktif",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-400/10",
        border: "border-blue-200 dark:border-blue-400/20",
      },
      PENDING: {
        label: "İnceleniyor",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-400/10",
        border: "border-amber-200 dark:border-amber-400/20",
      },
      CLOSED: {
        label: "Çözüldü",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-400/10",
        border: "border-emerald-200 dark:border-emerald-400/20",
      },
    };
    return configs[status as keyof typeof configs] || configs.OPEN;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-500 mb-6" />
        <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 dark:text-slate-500 uppercase italic">
          Şifreli Bağlantı Kuruluyor
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-24 md:pt-32 pb-20 px-4 md:px-8 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/5 dark:from-indigo-500/10 to-transparent blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 mb-6 shadow-sm">
              <Sparkles
                size={14}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
                Öncelikli Destek Hattı
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Size Nasıl <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                DESTEK
              </span>{" "}
              OLABİLİRİZ?
            </h1>
          </motion.div>

          {/* Tabs */}
          <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none backdrop-blur-xl w-full md:w-fit">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all italic ${
                activeTab === "active"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-[#020617] shadow-lg"
                  : "text-slate-400 hover:text-indigo-600 dark:hover:text-white"
              }`}
            >
              <Inbox size={14} /> Aktif Talepler
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all italic ${
                activeTab === "history"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-[#020617] shadow-lg"
                  : "text-slate-400 hover:text-indigo-600 dark:hover:text-white"
              }`}
            >
              <History size={14} /> Geçmiş
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Mobil Toggle Button */}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="lg:hidden w-full flex items-center justify-between p-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl shadow-indigo-600/20"
          >
            <div className="flex items-center gap-3">
              <Plus size={20} /> Yeni Talep Oluştur
            </div>
            {isFormOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Left Column: Form */}
          <div
            className={`${
              isFormOpen ? "block" : "hidden"
            } lg:block lg:col-span-5`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl lg:sticky lg:top-32 shadow-2xl shadow-slate-200 dark:shadow-none"
            >
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                YENİ TALEP{" "}
                <div className="h-1 w-12 bg-indigo-500 rounded-full" />
              </h2>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">
                    Sorun Kategorisi
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer transition-all dark:text-white"
                  >
                    <option value="" className="bg-white dark:bg-[#0a0f1e]">
                      Kategori Seçiniz
                    </option>
                    <option
                      value="Teknik"
                      className="bg-white dark:bg-[#0a0f1e]"
                    >
                      Teknik / Sistem Hatası
                    </option>
                    <option
                      value="Ödeme"
                      className="bg-white dark:bg-[#0a0f1e]"
                    >
                      Ödeme & Finansal İşlemler
                    </option>
                    <option
                      value="Hesap"
                      className="bg-white dark:bg-[#0a0f1e]"
                    >
                      Hesap & Güvenlik
                    </option>
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">
                    Konu Başlığı
                  </label>
                  <input
                    type="text"
                    placeholder="Kısa bir özet..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 italic">
                    Detaylı Açıklama
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Lütfen sorununuzu tüm detaylarıyla açıklayın..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400 dark:text-white"
                  />
                </div>

                <button className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-[#020617] rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 italic flex items-center justify-center gap-3 shadow-xl">
                  <Send size={16} /> TALEBİ GÖNDER
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Tickets List */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="popLayout">
              {tickets.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] text-center p-8 bg-white/50 dark:bg-transparent"
                >
                  <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <LifeBuoy
                      size={40}
                      className="text-slate-300 dark:text-slate-700 animate-pulse"
                    />
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-400 dark:text-slate-600 mb-2">
                    Kayıtlı Talep Bulunmuyor
                  </h3>
                  <p className="text-sm text-slate-400 font-medium max-w-xs italic leading-relaxed">
                    Henüz bir destek talebi oluşturmadınız. Yardım almak için
                    formu kullanabilirsiniz.
                  </p>
                </motion.div>
              ) : (
                tickets.map((ticket, index) => {
                  const config = getStatusConfig(ticket.status);
                  return (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-2xl dark:shadow-none"
                    >
                      <div className="space-y-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border italic tracking-wider ${config.bg} ${config.color} ${config.border}`}
                              >
                                {config.label}
                              </span>
                              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                                Ticket #{ticket.id}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                              {ticket.subject}
                            </h3>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap pt-2 italic">
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "tr-TR"
                            )}
                          </span>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
                          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                            "{ticket.message}"
                          </p>
                        </div>

                        {ticket.adminReply ? (
                          <div className="p-6 bg-indigo-50 dark:bg-indigo-500/5 rounded-3xl border border-indigo-100 dark:border-indigo-500/10 relative overflow-hidden group/reply">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] dark:opacity-[0.1] -rotate-12">
                              <Headphones size={64} />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Headphones size={12} className="text-white" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 italic">
                                YETKİLİ DESTEK YANITI
                              </span>
                            </div>
                            <p className="text-sm md:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-bold italic">
                              {ticket.adminReply}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-indigo-500/50 dark:text-blue-400/30 px-2">
                            <Clock size={14} className="animate-spin-slow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                              Operatör onayı bekleniyor...
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

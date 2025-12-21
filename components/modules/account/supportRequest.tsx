"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  AlertCircle,
  ChevronRight,
  Headphones,
  LifeBuoy,
  Sparkles,
  History,
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
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

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
      const response = await fetch("/api/user/support");
      if (!response.ok) throw new Error();
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      toast.error("Talepler senkronize edilemedi");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      OPEN: {
        label: "Aktif",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
      },
      PENDING: {
        label: "İnceleniyor",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
      },
      CLOSED: {
        label: "Çözüldü",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
      },
    };
    return configs[status as keyof typeof configs] || configs.OPEN;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="relative flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
          <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">
            Destek Hattına Bağlanılıyor
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Sparkles size={12} className="text-indigo-400" />
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                Öncelikli Destek Merkezi
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase italic leading-none">
              Size Nasıl <br />{" "}
              <span className="text-indigo-500">Yardımcı Olabiliriz?</span>
            </h1>
          </motion.div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "active"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "history"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Geçmiş
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sol Kolon: Yeni Talep Formu (Sticky) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-2xl sticky top-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Plus className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic italic tracking-tight">
                    Yeni Talep
                  </h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest italic">
                    Concierge Service
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">
                    Kategori Seçimi
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:border-indigo-500/50 transition-all outline-none appearance-none"
                  >
                    <option value="" className="bg-[#020617]">
                      Seçiniz
                    </option>
                    <option value="Teknik" className="bg-[#020617]">
                      Teknik Sorun
                    </option>
                    <option value="Ödeme" className="bg-[#020617]">
                      Ödeme Sorunu
                    </option>
                    <option value="VIP" className="bg-[#020617]">
                      VIP Hizmetler
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">
                    Konu Başlığı
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Kısa bir özet..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:border-indigo-500/50 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2 italic">
                    Mesajınız
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Lütfen detayları belirtin..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:border-indigo-500/50 transition-all outline-none resize-none"
                  />
                </div>

                <button className="w-full py-5 bg-white text-[#020617] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all transform active:scale-95 italic flex items-center justify-center gap-3 shadow-xl shadow-white/5">
                  <Send size={16} />
                  Talebi İlet
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sağ Kolon: Talepler Listesi */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="popLayout">
              {tickets.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]"
                >
                  <LifeBuoy
                    size={48}
                    className="text-slate-700 mb-4 animate-pulse"
                  />
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest italic">
                    Henüz bir kayıt bulunmuyor
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
                      className="group bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 hover:border-indigo-500/30 transition-all hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-col gap-6">
                        {/* Ticket Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${config.bg} ${config.color} ${config.border}`}
                              >
                                {config.label}
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                #{ticket.id}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                              {ticket.subject}
                            </h3>
                          </div>
                          <p className="text-[10px] text-slate-600 font-medium">
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "tr-TR"
                            )}
                          </p>
                        </div>

                        {/* User Message Bubble */}
                        <div className="relative pl-4 border-l-2 border-white/10">
                          <p className="text-sm text-slate-400 leading-relaxed italic line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                            "{ticket.message}"
                          </p>
                        </div>

                        {/* Admin Reply - Modern Chat Look */}
                        {ticket.adminReply && (
                          <div className="mt-2 p-5 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 relative">
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 rounded-full flex items-center gap-2">
                              <Headphones size={10} />
                              <span className="text-[9px] font-black uppercase tracking-widest">
                                Resmi Yanıt
                              </span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                              {ticket.adminReply}
                            </p>
                          </div>
                        )}

                        {!ticket.adminReply && ticket.status === "OPEN" && (
                          <div className="flex items-center gap-2 text-blue-400/60">
                            <Clock size={14} className="animate-spin-slow" />
                            <span className="text-[10px] font-bold uppercase tracking-widest italic">
                              Ekibimiz incelemeye başladı...
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

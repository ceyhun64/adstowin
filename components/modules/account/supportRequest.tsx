"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Send,
  AlertCircle,
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

  // New Ticket Form
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
      if (!response.ok) throw new Error("Talepler yüklenemedi");

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      toast.error("Talepler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !subject.trim() || !message.trim()) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/user/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `[${category}] ${subject}`,
          message,
        }),
      });

      if (!response.ok) throw new Error("Talep oluşturulamadı");

      toast.success("Destek talebiniz oluşturuldu!");
      setShowNewTicket(false);
      setCategory("");
      setSubject("");
      setMessage("");
      fetchTickets();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      OPEN: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      CLOSED: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    };
    const labels = {
      OPEN: "Açık",
      PENDING: "Beklemede",
      CLOSED: "Kapalı",
    };
    return (
      <span
        className={`px-3 py-1 rounded-xl text-xs font-bold border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const categories = [
    "Teknik Sorun",
    "Ödeme Sorunu",
    "Hesap Sorunu",
    "Güvenlik",
    "Premium Üyelik",
    "Diğer",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <MessageSquare className="text-indigo-500" />
              Destek Talepleri
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Destek ekibimizle iletişime geçin
            </p>
          </div>
          <button
            onClick={() => setShowNewTicket(!showNewTicket)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all"
          >
            <Plus size={20} />
            Yeni Talep
          </button>
        </div>

        {/* New Ticket Form */}
        {showNewTicket && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Yeni Destek Talebi
            </h2>

            <form onSubmit={handleSubmitTicket} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                  required
                >
                  <option value="">Seçiniz</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Talebinizin konusunu yazın"
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Mesaj
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sorununuzu detaylı olarak açıklayın..."
                  rows={6}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      Gönder
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="px-6 py-4 bg-slate-200 dark:bg-white/5 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
                >
                  İptal
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-12 text-center">
            <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Henüz destek talebiniz yok
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Bir sorun yaşıyorsanız yeni bir destek talebi oluşturun
            </p>
            <button
              onClick={() => setShowNewTicket(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all"
            >
              Yeni Talep Oluştur
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {ticket.subject}
                      </h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "tr-TR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <span>Talep #{ticket.id}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* User Message */}
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <div className="text-xs text-slate-500 font-bold mb-2">
                      Mesajınız:
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      {ticket.message}
                    </p>
                  </div>

                  {/* Admin Reply */}
                  {ticket.adminReply && (
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-2">
                        <CheckCircle size={14} />
                        Destek Ekibi Yanıtı:
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {ticket.adminReply}
                      </p>
                    </div>
                  )}

                  {ticket.status === "OPEN" && !ticket.adminReply && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        Talebiniz inceleniyor. En kısa sürede size dönüş
                        yapılacaktır.
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

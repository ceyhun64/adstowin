"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Target,
  Crown,
  Info,
  PlusCircle,
  Loader2,
  Image as ImageIcon,
  Link2,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserAccountData {
  id: string;
  name: string;
  email: string;
  role: string;
  surname: string;
  isPremium: boolean;
  balance: number;
  tkripto: number;
}

export default function AdvertisePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserAccountData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State'leri
  const [adType, setAdType] = useState<"NORMAL" | "PREMIUM">("NORMAL");
  const [viewCount, setViewCount] = useState<number>(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const NORMAL_UNIT_PRICE = 0.005;
  const PREMIUM_UNIT_PRICE = 0.02;

  const currentUnitPrice =
    adType === "NORMAL" ? NORMAL_UNIT_PRICE : PREMIUM_UNIT_PRICE;
  const totalPrice = viewCount * currentUnitPrice;

  const fetchAccountData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Hesap bilgileri alınamadı");
      const data = await response.json();
      if (data.user) setUserData(data.user);
    } catch (error) {
      toast.error("Profil verileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !targetUrl.trim()) {
      toast.error("Lütfen zorunlu alanları doldurunuz.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/advertiser/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          targetUrl: targetUrl.trim(),
          imageUrl: imageUrl.trim() || null,
          adType,
          totalImpressions: viewCount,
        }),
      });

      if (!response.ok) throw new Error("Kampanya oluşturulamadı");

      toast.success("Kampanya başarıyla oluşturuldu! 🚀");
      fetchAccountData();
      setTitle("");
      setDescription("");
      setTargetUrl("");
      setImageUrl("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-indigo-600 dark:text-amber-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-28 pb-20 px-4 md:px-8 relative overflow-hidden transition-colors duration-500">
      {/* 🔮 Arka Plan Glow Efektleri */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-0 w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 🏆 Header Bölümü */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-indigo-600 dark:bg-amber-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-amber-500">
                Campaign Architect
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase italic">
              Kitleleri <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-amber-200 dark:to-amber-500">
                Domine Edin.
              </span>
            </h1>
          </motion.div>

          {userData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group bg-white dark:bg-white/[0.03] backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-1 rounded-[2.5rem] flex items-center shadow-xl dark:shadow-2xl"
            >
              <div className="px-8 py-4">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Wallet size={12} /> Bakiye
                </p>
                <p className="text-3xl font-black tabular-nums tracking-tight">
                  ${userData.balance.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => router.push("/advertiser/deposit")}
                className="bg-slate-900 dark:bg-amber-500 hover:bg-indigo-600 dark:hover:bg-amber-400 text-white dark:text-black font-black p-5 rounded-[2.2rem] transition-all flex items-center gap-2 self-stretch"
              >
                <PlusCircle size={20} />
              </button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 📝 SOL: Kampanya Formu */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-sm dark:shadow-inner"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                  <Megaphone
                    className="text-white dark:text-indigo-400"
                    size={26}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Kampanya Parametreleri
                  </h2>
                  <p className="text-sm text-slate-500 font-medium italic">
                    Hedef kitlenize giden en kısa yolu çizin.
                  </p>
                </div>
              </div>

              {/* ⚡ Reklam Tipi Seçimi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <AdOption
                  active={adType === "NORMAL"}
                  onClick={() => setAdType("NORMAL")}
                  title="Standart Erişim"
                  price={NORMAL_UNIT_PRICE}
                  icon={Target}
                  color="indigo"
                />
                <AdOption
                  active={adType === "PREMIUM"}
                  onClick={() => setAdType("PREMIUM")}
                  title="Elite Premium"
                  price={PREMIUM_UNIT_PRICE}
                  icon={Crown}
                  color="amber"
                />
              </div>

              {/* 🖋️ Form Girişleri */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] ml-2 text-slate-400">
                      Kampanya Başlığı
                    </Label>
                    <input
                      type="text"
                      placeholder="Örn: Yaz İndirimi Fırsatları"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:border-amber-500/30 transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] ml-2 text-slate-400">
                      Açıklama (Opsiyonel)
                    </Label>
                    <textarea
                      placeholder="Kullanıcıları etkileyecek kısa bir mesaj..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] ml-2 text-slate-400">
                      Hedef Bağlantı (URL)
                    </Label>
                    <div className="relative group">
                      <Link2
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                        size={20}
                      />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 pl-14 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-[0.2em] ml-2 text-slate-400">
                      Kapak Görseli (URL)
                    </Label>
                    <div className="relative group">
                      <ImageIcon
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                        size={20}
                      />
                      <input
                        type="url"
                        placeholder="https://image..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 pl-14 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 📊 Gösterim Slider */}
                <div className="p-10 rounded-[2.5rem] bg-slate-100 dark:bg-gradient-to-br dark:from-indigo-500/5 dark:to-transparent border border-slate-200 dark:border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">
                        Erişim Hacmi
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        Hedeflenen tekil görüntüleme sayısı
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-indigo-600 dark:text-amber-500 tabular-nums">
                        {viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={500}
                    value={viewCount}
                    onChange={(e) => setViewCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-amber-500"
                  />
                  <div className="flex justify-between mt-4 text-[11px] font-black text-slate-400 uppercase">
                    <span>Min 1K</span>
                    <span className="text-slate-300">Ölçeklendirilebilir</span>
                    <span>Max 100K</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 💰 SAĞ: Özet ve Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-10 sticky top-28 shadow-xl"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-10 flex items-center justify-between">
                <span>Yatırım Analizi</span>
                <BarChart3 size={16} />
              </h3>

              <div className="space-y-6 mb-10">
                <SummaryRow
                  label="Seçili Plan"
                  value={adType}
                  highlight={adType === "PREMIUM"}
                />
                <SummaryRow
                  label="Birim Ücret"
                  value={`$${currentUnitPrice}`}
                />
                <SummaryRow
                  label="Erişim Hedefi"
                  value={`${viewCount.toLocaleString()} Görüntüleme`}
                />

                <div className="h-px bg-slate-100 dark:bg-white/5 my-4" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Tahmini Toplam Maliyet
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter tabular-nums">
                      ${totalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-slate-400 uppercase">
                      USD
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {userData && userData.balance < totalPrice && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold mb-6"
                  >
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p>
                      Yetersiz bakiye. Kampanyayı başlatmak için bakiye
                      eklemeniz gerekiyor.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !userData ||
                  userData.balance < totalPrice ||
                  !title.trim() ||
                  !targetUrl.trim()
                }
                className={`w-full h-20 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all duration-500 group relative overflow-hidden ${
                  adType === "PREMIUM"
                    ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 dark:bg-white hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white dark:text-black shadow-xl"
                } disabled:opacity-20`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-3 relative z-10">
                    Siparişi Onayla{" "}
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                )}
              </Button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />{" "}
                End-to-End Encrypted Ad Injection
              </div>
            </motion.div>

            {/* Premium Upsell Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-indigo-600 to-violet-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-lg"
            >
              <Zap className="absolute -right-4 -top-4 w-32 h-32 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative z-10">
                <Badge className="bg-white/20 mb-4">Ad Pro Tips</Badge>
                <h4 className="text-xl font-black mb-2 uppercase leading-tight italic">
                  Neden Premium?
                </h4>
                <p className="text-xs text-indigo-100/70 font-medium leading-relaxed mb-6">
                  Premium reklamlar ana sayfa vitrininde, video öncesi slotlarda
                  ve algoritma önceliğinde yer alır. %400 daha fazla etkileşim
                  oranı sağlar.
                </p>
                <button className="text-[11px] font-black uppercase tracking-widest border-b-2 border-white pb-1 group-hover:text-amber-400 group-hover:border-amber-400 transition-colors">
                  Case Study İncele
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- YARDIMCI BİLEŞENLER --- */

function AdOption({ active, onClick, title, price, icon: Icon, color }: any) {
  const activeStyles =
    color === "amber"
      ? "border-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08] text-amber-600 dark:text-amber-400 ring-4 ring-amber-500/10"
      : "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/[0.08] text-indigo-700 dark:text-indigo-400 ring-4 ring-indigo-500/10";

  return (
    <button
      onClick={onClick}
      className={`relative p-8 rounded-[2.2rem] border-2 transition-all duration-500 text-left group overflow-hidden ${
        active
          ? activeStyles
          : "border-slate-200 dark:border-white/5 bg-transparent hover:border-slate-300 dark:hover:border-white/10 text-slate-400 dark:text-slate-500"
      }`}
    >
      <Icon
        className={`mb-5 transition-transform duration-500 ${
          active ? "scale-110" : "opacity-40"
        }`}
        size={32}
      />
      <div
        className={`font-black text-xl uppercase tracking-tighter mb-1 ${
          active ? "dark:text-white text-slate-900" : ""
        }`}
      >
        {title}
      </div>
      <div className="text-[11px] font-black uppercase tracking-widest opacity-60">
        ${price} / Impression
      </div>
      {active && (
        <motion.div
          layoutId="selection-glow"
          className={`absolute -right-4 -bottom-4 w-12 h-12 blur-2xl rounded-full ${
            color === "amber" ? "bg-amber-500" : "bg-indigo-500"
          }`}
        />
      )}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">
        {label}
      </span>
      <span
        className={`text-sm font-black uppercase tracking-tight ${
          highlight ? "text-amber-500" : "text-slate-900 dark:text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block ${className}`}
  >
    {children}
  </span>
);

const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <label className={`block ${className}`}>{children}</label>;

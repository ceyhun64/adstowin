"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Target,
  Crown,
  Info,
  DollarSign,
  PlusCircle,
  Loader2,
  Image as ImageIcon,
  Link2,
  BarChart3,
  ShieldCheck,
  ChevronRight,
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

  // Sabitler
  const NORMAL_UNIT_PRICE = 0.005;
  const PREMIUM_UNIT_PRICE = 0.02;

  const currentUnitPrice =
    adType === "NORMAL" ? NORMAL_UNIT_PRICE : PREMIUM_UNIT_PRICE;
  const totalPrice = viewCount * currentUnitPrice;
  const minViews = 1000;

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
      toast.error("Zorunlu alanları doldurunuz.");
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

      toast.success("Kampanya yayına hazır! 🎉");
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
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Loader2 className="w-12 h-12 text-amber-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Estetik Arka Plan Efektleri */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Başlık ve Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-amber-500"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">
                Ad Manager Pro
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Kitlelere{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                Hükmedin.
              </span>
            </h1>
          </div>

          {userData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 px-8 rounded-3xl flex items-center gap-6 shadow-2xl"
            >
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Kullanılabilir Bakiye
                </p>
                <p className="text-2xl font-black text-white">
                  ${userData.balance.toFixed(2)}
                </p>
              </div>
              <Button
                onClick={() => router.push("/advertiser/deposit")}
                className="bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl h-12"
              >
                Yükleme Yap
              </Button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sol Panel - Form */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 shadow-inner">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <PlusCircle className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Yeni Kampanya</h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Reklam detaylarını belirleyin
                  </p>
                </div>
              </div>

              {/* Reklam Tipi Seçimi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  {
                    id: "NORMAL",
                    name: "Standart Erişim",
                    price: 0.005,
                    icon: Target,
                    color: "indigo",
                  },
                  {
                    id: "PREMIUM",
                    name: "Elite Premium",
                    price: 0.02,
                    icon: Crown,
                    color: "amber",
                  },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setAdType(type.id as any)}
                    className={`relative overflow-hidden group p-6 rounded-[2rem] border-2 transition-all duration-300 text-left ${
                      adType === type.id
                        ? `border-${type.color}-500 bg-${type.color}-500/[0.05]`
                        : "border-white/5 bg-transparent hover:border-white/20"
                    }`}
                  >
                    <type.icon
                      className={`mb-4 ${
                        adType === type.id
                          ? `text-${type.color}-500`
                          : "text-slate-600"
                      }`}
                      size={28}
                    />
                    <div className="font-black text-lg">{type.name}</div>
                    <div className="text-xs font-bold text-slate-500">
                      ${type.price} / Görüntüleme
                    </div>
                    {adType === type.id && (
                      <motion.div
                        layoutId="activeType"
                        className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-${type.color}-500`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Giriş Alanları */}
              <div className="space-y-6">
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Kampanya Başlığı (Zorunlu)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 outline-none focus:border-amber-500/50 transition-all font-medium"
                  />
                </div>

                <textarea
                  placeholder="Kampanya Açıklaması (Opsiyonel)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 outline-none focus:border-amber-500/50 transition-all resize-none font-medium"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Link2
                      className="absolute left-5 top-5 text-slate-500"
                      size={18}
                    />
                    <input
                      type="url"
                      placeholder="Hedef URL"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 pl-12 outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <ImageIcon
                      className="absolute left-5 top-5 text-slate-500"
                      size={18}
                    />
                    <input
                      type="url"
                      placeholder="Görsel URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 pl-12 outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-transparent border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-black uppercase tracking-widest text-slate-400">
                      Gösterim Hedefi
                    </label>
                    <span className="text-amber-500 font-mono font-bold text-lg">
                      {viewCount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={500}
                    value={viewCount}
                    onChange={(e) => setViewCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                    <span>1,000 İzleme</span>
                    <span>100,000 İzleme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel - Özet & Ödeme */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 sticky top-28 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                <BarChart3 size={16} className="text-amber-500" /> Yatırım Özeti
              </h3>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Seçili Segment
                  </span>
                  <Badge
                    className={
                      adType === "PREMIUM"
                        ? "bg-amber-500 text-black"
                        : "bg-indigo-600"
                    }
                  >
                    {adType}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Birim Maliyet
                  </span>
                  <span className="font-bold">${currentUnitPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    Erişim Hedefi
                  </span>
                  <span className="font-bold">
                    {viewCount.toLocaleString()} Kişi
                  </span>
                </div>

                <div className="h-px bg-white/5 my-6" />

                <div className="flex justify-between items-end">
                  <span className="text-slate-400 text-sm font-bold uppercase">
                    Toplam Bedel
                  </span>
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {userData && userData.balance < totalPrice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-6"
                  >
                    <Info size={16} /> Yetersiz bakiye. Lütfen yükleme yapın.
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
                className="w-full h-16 rounded-2xl bg-white hover:bg-amber-500 text-black font-black uppercase tracking-widest transition-all duration-300 group disabled:opacity-20"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-black" />
                ) : (
                  <div className="flex items-center gap-2">
                    Kampanyayı Başlat{" "}
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                )}
              </Button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 uppercase">
                <ShieldCheck size={14} className="text-emerald-500" /> Secure
                Ad-Network Infrastructure
              </div>
            </div>

            {/* Bilgi Kartı */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-6 text-white overflow-hidden relative group">
              <Megaphone className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20 rotate-12 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-2">Daha fazla erişim mi lazım?</h4>
              <p className="text-xs text-indigo-100 mb-4 opacity-80">
                Premium reklamlar, ana sayfa ve yüksek etkileşimli alanlarda
                öncelikli gösterilir.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4">
                Detayları Gör
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Badge Bileşeni (UI Kit'inizde yoksa diye basit hali)
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${className}`}
  >
    {children}
  </span>
);

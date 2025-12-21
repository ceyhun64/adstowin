"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  Target,
  Crown,
  Info,
  DollarSign,
  PlusCircle,
  Loader2,
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

  // Hesaplamalar
  const currentUnitPrice =
    adType === "NORMAL" ? NORMAL_UNIT_PRICE : PREMIUM_UNIT_PRICE;
  const totalPrice = viewCount * currentUnitPrice;
  const minViews = 1000;

  // Hesap verilerini API'den çekme - Tek endpoint kullanımı
  const fetchAccountData = async () => {
    try {
      const response = await fetch("/api/user/profile");

      if (!response.ok) {
        throw new Error("Hesap bilgileri alınamadı");
      }

      const data = await response.json();

      if (data.user) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Hesap bilgileri çekilemedi:", error);
      toast.error("Hesap bilgileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !targetUrl.trim()) {
      toast.error("Lütfen zorunlu alanları doldurun");
      return;
    }

    if (viewCount < minViews) {
      toast.error(`Minimum ${minViews} gösterim gereklidir`);
      return;
    }

    if (!userData || userData.balance < totalPrice) {
      toast.error("Yetersiz bakiye!");
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Kampanya oluşturulamadı");
      }

      toast.success("Kampanya başarıyla oluşturuldu! 🎉");

      // Bakiyeyi güncellemek için veriyi tekrar çek
      fetchAccountData();

      // Form'u temizle
      setTitle("");
      setDescription("");
      setTargetUrl("");
      setImageUrl("");
      setViewCount(1000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Banner Reklam Alanı */}
        <div className="w-full h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-between px-8 relative overflow-hidden shadow-xl">
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
              <Megaphone className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Burada Reklamınız Olsun!</h3>
              <p className="text-indigo-100 text-xs">
                Günlük aktif kullanıcılara hemen ulaşın.
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full bg-white/5 skew-x-[45deg] translate-x-32" />
        </div>

        {/* Güncel Bakiye Kartı */}
        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hesabınız: {userData.name} {userData.surname}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${userData.balance.toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/advertiser/deposit")}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              Bakiye Yükle
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <PlusCircle className="text-indigo-500" /> Kampanya Oluştur
                </h2>
              </div>

              {/* Tip Seçimi */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAdType("NORMAL")}
                  className={`p-5 rounded-2xl border-2 transition-all text-left ${
                    adType === "NORMAL"
                      ? "border-indigo-500 bg-indigo-500/5"
                      : "border-slate-100 dark:border-white/5 hover:border-indigo-500/30"
                  }`}
                >
                  <Target
                    className={
                      adType === "NORMAL" ? "text-indigo-500" : "text-slate-400"
                    }
                  />
                  <div className="font-bold mt-2 text-slate-900 dark:text-white">
                    Normal Reklam
                  </div>
                  <div className="text-xs text-slate-500">$0.005 / İzleme</div>
                </button>

                <button
                  onClick={() => setAdType("PREMIUM")}
                  className={`p-5 rounded-2xl border-2 transition-all text-left ${
                    adType === "PREMIUM"
                      ? "border-amber-500 bg-amber-500/5"
                      : "border-slate-100 dark:border-white/5 hover:border-amber-500/30"
                  }`}
                >
                  <Crown
                    className={
                      adType === "PREMIUM" ? "text-amber-500" : "text-slate-400"
                    }
                  />
                  <div className="font-bold mt-2 text-slate-900 dark:text-white">
                    Premium Reklam
                  </div>
                  <div className="text-xs text-slate-500">$0.02 / İzleme</div>
                </button>
              </div>

              {/* Form Inputları */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Reklam Başlığı *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                />
                <textarea
                  placeholder="Açıklama (Opsiyonel)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white resize-none"
                />
                <input
                  type="url"
                  placeholder="Hedef URL (https://...) *"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="Görsel URL (Opsiyonel)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-500/50 text-slate-900 dark:text-white"
                />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
                    Gösterim Sayısı (Min: {minViews.toLocaleString()})
                  </label>
                  <input
                    type="number"
                    min={minViews}
                    step={100}
                    value={viewCount}
                    onChange={(e) => setViewCount(Number(e.target.value))}
                    className="w-full bg-slate-100 dark:bg-white/5 rounded-2xl p-4 font-mono text-lg text-slate-900 dark:text-white outline-none focus:ring-2 ring-indigo-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Özet */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 sticky top-24">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">
                Ödeme Özeti
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Reklam Tipi:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {adType === "NORMAL" ? "Normal" : "Premium"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Birim Fiyat:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${currentUnitPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gösterim:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {viewCount.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-white/10" />
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm">Toplam:</span>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                {userData && userData.balance < totalPrice && (
                  <div className="flex items-center gap-2 text-xs bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-xl font-medium">
                    <Info size={14} /> Yetersiz bakiye!
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !userData ||
                  userData.balance < totalPrice ||
                  !title.trim() ||
                  !targetUrl.trim() ||
                  viewCount < minViews
                }
                className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-500 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Bakiyemle Öde & Yayınla"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

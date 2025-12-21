"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  UserPlus,
  Users,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type UserRole = "USER" | "ADVERTISER";

interface RegisterFormProps {
  onLoginClick?: () => void;
}

export default function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER" as UserRole,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAdvertiser = formData.role === "ADVERTISER";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler birbiriyle eşleşmiyor!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.error || "Kayıt işlemi başarısız.");
      else {
        toast.success("Başarıyla katıldınız!");
        router.push("/auth/login");
      }
    } catch (err) {
      toast.error("Bağlantı hatası.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-30 flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden font-sans">
      {/* Arka Plan Glow Efektleri */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full transition-colors duration-1000 ${
          isAdvertiser ? "bg-orange-600/10" : "bg-indigo-600/10"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid md:grid-cols-12 bg-white/5 backdrop-blur-3xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10"
      >
        {/* SOL PANEL: AVANTAJLAR (5 Kolon) */}
        <div
          className={`md:col-span-5 relative hidden md:flex flex-col justify-between p-12 lg:p-16 text-white transition-all duration-1000 overflow-hidden ${
            isAdvertiser
              ? "bg-gradient-to-br from-orange-600 to-amber-900"
              : "bg-gradient-to-br from-indigo-600 to-violet-900"
          }`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative z-10">
            <motion.div
              key={formData.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-8 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Özel Üyelik
              </span>
            </motion.div>

            <h2 className="text-4xl font-black leading-tight mb-8 tracking-tighter italic whitespace-pre-line">
              {isAdvertiser
                ? "MARKANIZI\nZİRVEYE TAŞIYIN"
                : "KAZANANLARIN\nARASINA KATILIN"}
            </h2>

            <div className="space-y-6">
              {(isAdvertiser
                ? [
                    "Global hedefleme seçenekleri",
                    "Yüksek dönüşüm oranları",
                    "7/24 Kampanya yönetimi",
                    "Detaylı analitik raporlama",
                  ]
                : [
                    "Anlık ödeme garantisi",
                    "VIP görev havuzu",
                    "Kişisel hesap danışmanı",
                    "Yüksek referans kazancı",
                  ]
              ).map((text, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={text}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-white/10 p-1.5 rounded-full border border-white/10">
                    <CheckCircle2 size={16} className="text-white/80" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-12">
            <div className="p-6 bg-black/20 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-xs font-medium text-white/70 mb-4 italic leading-relaxed">
                "Hızlı aksiyon alabilen, güvenilir ve modern bir platform
                arıyorsanız doğru yerdesiniz."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Community Feedback
                </span>
                <Link
                  href="/auth/login"
                  className="text-xs font-bold hover:text-indigo-200 transition-colors flex items-center gap-1"
                >
                  Giriş Yap <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ PANEL: FORM (7 Kolon) */}
        <div className="md:col-span-7 p-8 md:p-16 lg:p-20 bg-white/5 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Yeni Hesap Başvurusu
            </h1>
            <p className="text-slate-500 font-medium">
              Platformun tüm avantajlarından yararlanmak için formu doldurun.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* ROLE SELECTOR */}
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Üyelik Modeli
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <RoleButton
                  active={!isAdvertiser}
                  onClick={() => setFormData({ ...formData, role: "USER" })}
                  icon={<Users size={18} />}
                  label="Kazanan"
                  color="indigo"
                />
                <RoleButton
                  active={isAdvertiser}
                  onClick={() =>
                    setFormData({ ...formData, role: "ADVERTISER" })
                  }
                  icon={<Briefcase size={18} />}
                  label="Reklamveren"
                  color="orange"
                />
              </div>
            </div>

            {/* NAME & SURNAME */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  İsim
                </Label>
                <Input
                  id="name"
                  onChange={handleChange}
                  className="h-12 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Soyad
                </Label>
                <Input
                  id="surname"
                  onChange={handleChange}
                  className="h-12 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-5"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                E-Posta Adresi
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="ornek@adstowin.com"
                className="h-12 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-5"
                required
              />
            </div>

            {/* PASSWORDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Şifre
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="h-12 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Şifre Onay
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="h-12 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 rounded-[20px] text-white font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98] ${
                isAdvertiser
                  ? "bg-orange-600 hover:bg-orange-500 shadow-orange-500/20"
                  : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  Hesabı Oluştur <ArrowRight size={18} />
                </div>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* HELPER COMPONENTS */

function RoleButton({ active, onClick, icon, label, color }: any) {
  const activeStyles =
    color === "orange"
      ? "border-orange-500 bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
      : "border-indigo-500 bg-indigo-500/10 text-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-500 ${
        active
          ? activeStyles
          : "border-white/5 bg-white/5 text-slate-500 hover:border-white/10"
      }`}
    >
      {icon}
      <span className="text-[11px] font-black uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}

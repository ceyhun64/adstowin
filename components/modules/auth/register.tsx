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
  Users,
  Briefcase,
  ArrowRight,
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
    <div className="min-h-screen w-full flex items-center justify-center py-30 bg-slate-50 dark:bg-[#020617] p-4 relative overflow-hidden transition-colors duration-700">
      {/* 🌌 Dinamik Glow Efektleri */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full transition-colors duration-1000 ${
          isAdvertiser
            ? "bg-orange-500/10 dark:bg-orange-600/10"
            : "bg-indigo-500/10 dark:bg-indigo-600/10"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid md:grid-cols-12 bg-white/70 dark:bg-white/[0.03] backdrop-blur-3xl rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border border-white dark:border-white/10"
      >
        {/* 🚀 SOL PANEL: AVANTAJLAR */}
        <div
          className={`md:col-span-5 relative hidden md:flex flex-col justify-between p-12 lg:p-16 text-white transition-all duration-1000 overflow-hidden ${
            isAdvertiser
              ? "bg-orange-600 dark:bg-gradient-to-br dark:from-orange-600 dark:to-amber-950"
              : "bg-indigo-600 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-violet-950"
          }`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              key={formData.role}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-10 bg-white/20 w-fit px-5 py-2 rounded-full border border-white/10 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-amber-300 fill-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {isAdvertiser ? "Enterprise Node" : "Elite Member Access"}
              </span>
            </motion.div>

            <h2 className="text-5xl font-black leading-[0.9] mb-12 tracking-tighter italic uppercase whitespace-pre-line">
              {isAdvertiser
                ? "Markanızı\n" + "Zirveye\n" + "Taşıyın"
                : "Kazananlar\n" + "Dünyasına\n" + "Katılın"}
            </h2>

            <div className="space-y-6">
              {(isAdvertiser
                ? [
                    "Global hedefleme motoru",
                    "Yüksek ROI garantili trafik",
                    "AI destekli kampanya yönetimi",
                    "Gerçek zamanlı analitik panel",
                  ]
                : [
                    "Anlık likidite ve ödeme",
                    "VIP görev ve havuz erişimi",
                    "Kişisel varlık danışmanı",
                    "Multi-tier referans sistemi",
                  ]
              ).map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white/90">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 p-8 rounded-[32px] bg-black/20 border border-white/10 backdrop-blur-xl">
            <p className="text-[13px] font-medium text-white/80 italic leading-relaxed mb-6">
              "Geleceğin finansal ekosisteminde yerinizi almak için doğru
              kapıdasınız."
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                Trusted Network
              </span>
              <Link
                href="/auth/login"
                className="px-8 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-black hover:bg-indigo-600 hover:text-white dark:hover:bg-white/10 transition-all uppercase tracking-widest"
              >
                GIRIS YAPIN
              </Link>
            </div>
          </div>
        </div>

        {/* 📝 SAĞ PANEL: FORM */}
        <div className="md:col-span-7 p-8 md:p-16 lg:p-20 bg-white/40 dark:bg-transparent flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic mb-3">
              Yeni Kimlik{" "}
              <span
                className={
                  isAdvertiser
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-indigo-600 dark:text-indigo-400"
                }
              >
                Oluştur
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              ADSTOWIN ekosistemine katılmak için bilgilerinizi doğrulayın.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* ROLE SELECTOR */}
            <div className="space-y-3">
              <Label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1">
                Üyelik Katmanı
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <RoleButton
                  active={!isAdvertiser}
                  onClick={() => setFormData({ ...formData, role: "USER" })}
                  icon={<Users size={20} />}
                  label="Kazanan"
                  activeColor="indigo"
                />
                <RoleButton
                  active={isAdvertiser}
                  onClick={() =>
                    setFormData({ ...formData, role: "ADVERTISER" })
                  }
                  icon={<Briefcase size={20} />}
                  label="Reklamveren"
                  activeColor="orange"
                />
              </div>
            </div>

            {/* NAME & SURNAME */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1"
                >
                  İsim
                </Label>
                <Input
                  id="name"
                  onChange={handleChange}
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-8 focus:ring-indigo-500/5 transition-all px-5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="surname"
                  className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1"
                >
                  Soyad
                </Label>
                <Input
                  id="surname"
                  onChange={handleChange}
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-8 focus:ring-indigo-500/5 transition-all px-5"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1"
              >
                E-Posta Adresi
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="ornek@adstowin.com"
                className="h-14 rounded-2xl border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-8 focus:ring-indigo-500/5 transition-all px-5"
                required
              />
            </div>

            {/* PASSWORDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1">
                  Şifre
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="h-14 rounded-2xl border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-8 focus:ring-indigo-500/5 transition-all px-5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-1">
                  Onay
                </Label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="h-14 rounded-2xl border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:ring-8 focus:ring-indigo-500/5 transition-all px-5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-16 rounded-[24px] text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98] group ${
                isAdvertiser
                  ? "bg-orange-600 hover:bg-orange-500 shadow-orange-500/20"
                  : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  Sisteme Katıl{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>
              )}
            </Button>

            {/* 📱 MOBİL GİRİŞ YÖNLENDİRMESİ */}
            <div className="md:hidden pt-4 text-center border-t border-slate-100 dark:border-white/5 mt-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
                Zaten bir hesabınız var mı?
              </p>
              <Link
                href="/auth/login"
                className="px-8 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-black hover:bg-indigo-600 hover:text-white dark:hover:bg-white/10 transition-all uppercase tracking-widest"
              >
                GIRIS YAPIN
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* 🎨 YARDIMCI BİLEŞEN: ROLE BUTTON */

function RoleButton({ active, onClick, icon, label, activeColor }: any) {
  const baseStyles =
    "flex flex-col items-center justify-center gap-3 p-5 rounded-[24px] border transition-all duration-500 group relative overflow-hidden";

  const colorConfig = {
    indigo: active
      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-xl shadow-indigo-500/10"
      : "border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] text-slate-400 dark:text-slate-600 hover:border-slate-300 dark:hover:border-white/10",
    orange: active
      ? "border-orange-600 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-xl shadow-orange-500/10"
      : "border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] text-slate-400 dark:text-slate-600 hover:border-slate-300 dark:hover:border-white/10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${
        colorConfig[activeColor as keyof typeof colorConfig]
      }`}
    >
      <div
        className={`transition-transform duration-500 ${
          active ? "scale-110" : "scale-100"
        }`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 border-2 border-current rounded-[24px] pointer-events-none"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

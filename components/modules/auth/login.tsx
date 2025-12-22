"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  onLoginSuccess?: (user: { name?: string; email?: string }) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Kimlik bilgileri doğrulanamadı.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Erişim onaylandı. Yönlendiriliyorsunuz...");
        if (onLoginSuccess) onLoginSuccess({ email });

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      }
    } catch (error) {
      toast.error("Sistemsel bir hata oluştu.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#020617] py-30 p-4 relative overflow-hidden transition-colors duration-500">
      {/* 🌌 Dinamik Ambient Işıklar */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid md:grid-cols-12 bg-white/70 dark:bg-white/[0.03] backdrop-blur-3xl rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border border-white dark:border-white/10"
      >
        {/* 📝 SOL PANEL: GİRİŞ FORMU */}
        <div className="md:col-span-7 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative bg-white/40 dark:bg-transparent">
          <div className="mb-12">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-14 h-14 bg-indigo-600 dark:bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20"
            >
              <ShieldCheck className="text-white" size={28} />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 italic uppercase">
              Kasalara <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-200">
                Erişim Sağlayın.
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
              ADSTOWIN dijital varlık merkezine{" "}
              <br className="hidden sm:block" /> güvenli geçiş yapın.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">
                Kurumsal E-Posta
              </Label>
              <div className="relative group">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@adstowin.com"
                  className="h-16 rounded-[20px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5 transition-all px-6 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  Güvenlik Anahtarı
                </Label>
                <Link
                  href="/auth/forgot_password"
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors uppercase tracking-tighter"
                >
                  Şifremi Unuttum?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="h-16 rounded-[20px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5 transition-all px-6 pr-14 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-[20px] bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/10 transition-all active:scale-[0.98] group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <div className="flex items-center gap-3">
                  SİSTEME GİRİŞ YAP
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium italic">
              Henüz bir kimliğiniz yok mu?
            </p>
            <Link
              href="/auth/register"
              className="px-8 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-black hover:bg-indigo-600 hover:text-white dark:hover:bg-white/10 transition-all uppercase tracking-widest"
            >
              KAYIT OLUN
            </Link>
          </div>
        </div>

        {/* 🚀 SAĞ PANEL: CTA / ÖZELLİKLER */}
        <div className="md:col-span-5 hidden md:flex flex-col justify-between p-12 lg:p-20 bg-indigo-600 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-950 text-white relative">
          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12 bg-white/20 w-fit px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300 fill-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Elite Node Access
              </span>
            </div>

            <h2 className="text-5xl font-black leading-[0.9] mb-12 tracking-tighter italic uppercase">
              Zamanı <br />
              <span className="text-indigo-200">Varlığa</span> <br />
              Dönüştürün.
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: "Smart Mining",
                  desc: "Algoritmik veri işleme ve kazanç.",
                },
                {
                  title: "Premium VIP",
                  desc: "Yüksek çarpanlı elit havuz erişimi.",
                },
                {
                  title: "Instant Pay",
                  desc: "Saniyeler içinde likidite çıkışı.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                    <CheckCircle size={20} className="text-indigo-200" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-indigo-100/70 font-medium italic leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-16 p-8 rounded-[32px] bg-black/20 border border-white/10 backdrop-blur-xl group hover:bg-black/30 transition-all duration-500">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Sparkles
                  key={s}
                  size={12}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-[13px] font-medium text-indigo-50 leading-relaxed mb-6 italic">
              "ADSTOWIN ile dijital portföyümü yönetmek artık profesyonel bir
              deneyime dönüştü. Hız ve güvenlik rakipsiz."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-blue-400 border-2 border-white/20 shadow-lg" />
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest">
                  Mert S.
                </span>
                <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-tighter">
                  Strategic Investor
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

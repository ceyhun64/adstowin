"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

        // Senkronizasyon işlemleri (Fav & Cart)
        // ... (Mevcut mantık korunabilir)

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
    <div className="min-h-screen w-full py-30 flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
      {/* Arka Plan Ambient Işıklar */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl grid md:grid-cols-12 bg-white/5 backdrop-blur-3xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
      >
        {/* SOL PANEL: GİRİŞ FORMU (7 Kolon) */}
        <div className="md:col-span-7 p-8 md:p-16 lg:p-20 bg-white/5 flex flex-col justify-center">
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20"
            >
              <ShieldCheck className="text-white" size={24} />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-3">
              Kasalara{" "}
              <span className="text-indigo-500 text-glow">Erişin.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg">
              Adstowin Premium hesabınıza güvenli geçiş yapın.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Kurumsal E-Posta
              </Label>
              <div className="relative group">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="isim@adstowin.com"
                  className="h-14 rounded-2xl border-white/5 bg-white/[0.03] text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-6"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Güvenlik Anahtarı
                </Label>
                <Link
                  href="/auth/forgot_password"
                  size-xs
                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Şifremi Unuttum?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="h-14 rounded-2xl border-white/5 bg-white/[0.03] text-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all px-6 pr-14"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-500/20 transition-all active:scale-[0.98] group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  Oturum Aç
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-medium">
              Hesabınız yok mu?
            </p>
            <Link
              href="/auth/register"
              className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-black hover:bg-white/10 transition-all"
            >
              YENİ HESAP OLUŞTUR
            </Link>
          </div>
        </div>

        {/* SAĞ PANEL: CTA (5 Kolon) */}
        <div className="md:col-span-5 hidden md:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10">
              <Sparkles size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Global Ecosystem
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[1.1] mb-8 tracking-tighter italic">
              ZAMANINIZI <br />
              <span className="text-indigo-200">KAZANCA</span> <br />
              DÖNÜŞTÜRÜN.
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Smart Mining",
                  desc: "Arka planda kesintisiz kazanç.",
                },
                {
                  title: "Premium VIP",
                  desc: "5 kata kadar daha fazla getiri.",
                },
                { title: "Instant Pay", desc: "Anlık çekim onayı." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="mt-1">
                    <CheckCircle
                      size={18}
                      className="text-indigo-300 opacity-60"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-none mb-1 group-hover:text-indigo-200 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-indigo-100/60 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial / Social Proof */}
          <div className="relative z-10 mt-12 p-6 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Sparkles
                  key={s}
                  size={10}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-xs font-medium text-indigo-50 leading-relaxed mb-4">
              "Finansal özgürlüğümü bu platformdaki otomatize sistemlerle inşa
              ettim. Kesinlikle sınıfının en iyisi."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400/30 border border-white/20" />
              <span className="text-[11px] font-black uppercase tracking-widest">
                Mert S. —{" "}
                <span className="opacity-50 font-medium">Investor</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

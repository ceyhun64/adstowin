"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
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
        toast.error("Email veya şifre hatalı");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Giriş başarılı!");

        const loggedInUser = { email };
        if (onLoginSuccess) onLoginSuccess(loggedInUser);

        // --- Veri Senkronizasyon İşlemleri ---
        
        // 1. Favorileri veritabanına aktar
        const localFavs: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (localFavs.length > 0) {
          await Promise.all(
            localFavs.map((productId) =>
              fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
                credentials: "include",
              })
            )
          );
          localStorage.removeItem("favorites");
        }

        // 2. Misafir sepetini (Guest Cart) aktar
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        if (guestCart.length > 0) {
          await Promise.all(
            guestCart.map((item: any) =>
              fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
                credentials: "include",
              })
            )
          );
          localStorage.removeItem("guestCart");
        }

        router.push("/");
        router.refresh(); // Session durumunu güncellemek için
      }
    } catch (error) {
      console.error(error);
      toast.error("Giriş sırasında bir hata oluştu");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        {/* Sol Panel: Giriş Formu */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Tekrar Merhaba!</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Dijital dünyaya adımınızı atın.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                E-POSTA
              </Label>
              <Input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@adstowin.com" 
                className="h-14 rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                required 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  ŞİFRE
                </Label>
                <Link href="/auth/forgot_password" className="text-xs font-bold text-indigo-600 hover:underline transition-all">
                  Şifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"} 
                  className="h-14 rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-950 pr-12"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Giriş yapılıyor...
                </div>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-slate-500 font-medium">
            Henüz hesabınız yok mu?{" "}
            <Link href="/auth/register" className="text-indigo-600 font-black hover:underline">
              Kayıt Ol
            </Link>
          </p>
        </div>

        {/* Sağ Panel: CTA Bilgi Alanı */}
        <div className="hidden md:flex flex-col justify-center p-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative">
          {/* Arka plan deseni */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black leading-tight mb-6 tracking-tight">
              ADS<span className="opacity-70">TOWIN</span> ile Kazanmaya Başlayın
            </h2>
            <div className="space-y-5">
              {[
                "Anlık bakiye ve kripto takibi",
                "Premium görevlerle yüksek kazanç",
                "7/24 kesintisiz teknik destek",
                "Güvenli ödeme altyapısı"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                    <CheckCircle size={18} />
                  </div>
                  <span className="font-semibold text-indigo-50">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm">
              <p className="italic font-medium opacity-90 leading-relaxed text-sm">
                "Bu platform sayesinde dijital varlıklarımı yönetmek ve yeni fırsatları takip etmek hiç bu kadar kolay olmamıştı."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-white/40 border-2 border-white/30 shadow-inner" />
                <div>
                  <p className="font-bold text-sm leading-none">Ahmet Yılmaz</p>
                  <p className="text-[10px] uppercase font-bold opacity-60 mt-1">Premium Üye</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
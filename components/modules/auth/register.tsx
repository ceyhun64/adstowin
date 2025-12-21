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
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData({ ...formData, role });
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
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Kayıt işlemi başarısız oldu.");
      } else {
        toast.success("Hesabınız başarıyla oluşturuldu!");
        if (onLoginClick) onLoginClick();
        router.push("/auth/login");
      }
    } catch (err) {
      toast.error("Sunucuyla bağlantı kurulamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAdvertiser = formData.role === "ADVERTISER";

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1100px] grid md:grid-cols-2 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-white/5"
      >
        {/* SOL TARAF: AVANTAJLAR */}
        <div
          className={`relative hidden md:flex flex-col justify-center p-16 text-white transition-all duration-700 ease-in-out bg-gradient-to-br ${
            isAdvertiser
              ? "from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-800"
              : "from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-950"
          }`}
        >
          {/* Arka plan süsleme halkası */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />

          <div className="relative z-10">
            <motion.div
              key={formData.role}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <UserPlus className="w-12 h-12 mb-6 text-white/80" />
            </motion.div>

            <h2 className="text-4xl font-black mb-6 leading-tight">
              {isAdvertiser
                ? "Markanızı\nBüyütmeye Başlayın"
                : "Kazanmaya Bugün\nAdım Atın."}
            </h2>

            <div className="space-y-6 mb-10">
              {(isAdvertiser
                ? [
                    "Hedef kitlenize doğrudan ulaşın",
                    "Düşük bütçelerle yüksek etkileşim",
                    "Detaylı kampanya analizi",
                    "Hızlı onaylanan reklam modelleri",
                  ]
                : [
                    "Kayıt sonrası anında bakiye yönetimi",
                    "Size özel görevler ve ödül havuzu",
                    "Detaylı sipariş ve işlem geçmişi",
                    "Güvenli ödeme sistemleri",
                  ]
              ).map((text, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={text}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 bg-white/20 p-1 rounded-full group-hover:bg-white/40 transition-colors">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <p className="text-white/90 font-medium leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-sm font-semibold mb-4 text-white/80">
                Zaten üye misiniz?
              </p>
              <Link href="/auth/login">
                <Button
                  variant="secondary"
                  className="w-full h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-50 font-bold transition-all border-none"
                >
                  Giriş Yapın
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: KAYIT FORMU */}
        <div
          className={`p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out ${
            isAdvertiser
              ? "bg-amber-50/30 dark:bg-amber-950/10"
              : "bg-white dark:bg-slate-900"
          }`}
        >
          <div className="mb-8">
            <h2
              className={`text-3xl font-black tracking-tight mb-2 transition-colors duration-500 ${
                isAdvertiser
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              Hesap Oluştur
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              {isAdvertiser
                ? "Kampanyalarınızı yönetmek için şirket hesabı açın."
                : "Bireysel görevleri tamamlayarak kazanmaya başlayın."}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1">
                Kullanıcı Türü
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange("USER")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    formData.role === "USER"
                      ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "border-slate-100 dark:border-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10"
                  }`}
                >
                  <Users size={18} />
                  <span className="text-sm font-bold">Kazanan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange("ADVERTISER")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    formData.role === "ADVERTISER"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      : "border-slate-100 dark:border-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10"
                  }`}
                >
                  <Briefcase size={18} />
                  <span className="text-sm font-bold">Reklamveren</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1"
                >
                  İsim
                </Label>
                <Input
                  id="name"
                  placeholder="Adınızı giriniz..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 focus:ring-2 transition-all ${
                    isAdvertiser
                      ? "focus:ring-amber-500/20"
                      : "focus:ring-indigo-500/20"
                  }`}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="surname"
                  className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1"
                >
                  Soyad
                </Label>
                <Input
                  id="surname"
                  placeholder="Soyadınızı giriniz..."
                  value={formData.surname}
                  onChange={handleChange}
                  required
                  className={`h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 focus:ring-2 transition-all ${
                    isAdvertiser
                      ? "focus:ring-amber-500/20"
                      : "focus:ring-indigo-500/20"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1"
              >
                E-Posta
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="isim@ornek.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 focus:ring-2 transition-all ${
                  isAdvertiser
                    ? "focus:ring-amber-500/20"
                    : "focus:ring-indigo-500/20"
                }`}
              />
            </div>

            <div className="space-y-1.5 relative">
              <Label
                htmlFor="password"
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1"
              >
                Şifre
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <Label
                htmlFor="confirmPassword"
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase ml-1"
              >
                Şifre Onay
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 rounded-xl text-white text-md font-bold shadow-lg transition-all active:scale-[0.98] mt-4 border-none ${
                isAdvertiser
                  ? "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20 dark:bg-amber-700 dark:hover:bg-amber-600"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 dark:bg-indigo-700 dark:hover:bg-indigo-600"
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Kayıt Ol"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  Bell,
  ArrowRight,
  Play,
  Target,
  X,
  Star, // Değişiklik: DollarSign -> Star
  Megaphone,
} from "lucide-react";
import { toast } from "sonner";

interface RegistrationFormProps {
  userType: "earner" | "business";
  setUserType: (value: "earner" | "business") => void;
}

// Yeni Modal Bileşeni (Değişiklik Yok)
interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl w-full max-w-xl h-full max-h-[80vh] overflow-hidden border border-white/20 shadow-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/20 sticky top-0 bg-white/10 backdrop-blur-md z-10">
          <h4 className="text-xl font-bold text-white">{title}</h4>
          <button
            onClick={onClose}
            className="text-white hover:text-white/70 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Modal Content */}
        <div className="p-5 overflow-y-auto text-white/80 leading-relaxed text-sm h-[calc(100%-65px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function RegistrationForm({
  userType,
  setUserType,
}: RegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // MODAL STATE'LERİ
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms of use.");
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true); // ← LOADING BAŞLATILDI

    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userType }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "An error occurred.");
        return;
      }

      toast.success("Great! Registration successful.");
      setEmail("");
      setTermsAccepted(false);
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false); // ← LOADING DURDURULDU
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-16" id="registration-form">
      {/* 1. KULLANIM ŞARTLARI MODALI (İçerik Değişikliği Yok) */}
      <Modal
        title="Terms of Use"
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      >
        <p className="mb-4 text-white/90 font-semibold">
          1. Acceptance of Terms
        </p>
        <p>
          By using our services, you agree to be bound by these Terms of Use and
          all applicable laws. If you do not agree with these terms, you must
          not use the platform.
        </p>
        {/* ... (Diğer Şartlar) ... */}
        <p className="mt-6 mb-4 text-white/90 font-semibold">
          2. Account Responsibility
        </p>
        <p>
          You are solely responsible for maintaining the security of your
          account and for all activities that occur under your account. Do not
          share your password with anyone.
        </p>
        <p className="mt-6 mb-4 text-white/90 font-semibold">3. Termination</p>
        <p>
          In the event of a violation of these terms, we may suspend or
          terminate your access to the services immediately and without prior
          notice.
        </p>
        <p className="mt-6 mb-4 text-white/90 font-semibold">
          4. Content Responsibility
        </p>
        <p>
          You are responsible for any content you upload or submit to the
          platform. Illegal, defamatory, or third-party rights-violating content
          is strictly prohibited.
        </p>
      </Modal>

      {/* 2. GİZLİLİK POLİTİKASI MODALI (İçerik Değişikliği Yok) */}
      <Modal
        title="Privacy Policy"
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      >
        <p className="mb-4 text-white/90 font-semibold">
          1. Information We Collect
        </p>
        <p>
          During registration, we collect your name, email address, and user
          type (Earner / Business). We may also collect anonymous data related
          to your usage of the service.
        </p>
        {/* ... (Diğer Politikalar) ... */}
        <p className="mt-6 mb-4 text-white/90 font-semibold">
          2. How We Use Your Information
        </p>
        <p>
          We use the information we collect to provide and improve our services,
          manage your account, send you notifications, and ensure platform
          security.
        </p>
        <p className="mt-6 mb-4 text-white/90 font-semibold">3. Data Sharing</p>
        <p>
          We never share your personal information with third parties without
          your explicit consent, unless required by law.
        </p>
        <p className="mt-6 mb-4 text-white/90 font-semibold">4. Security</p>
        <p>
          We apply various security measures to protect your data; however, no
          method of internet transmission is 100% secure.
        </p>
      </Modal>

      {/* ANA FORM İÇERİĞİ */}
      <div className="relative">
        {/* 🌈 Soft Aurora Background (GÜNCELLENDİ) */}
        <div
          className={`absolute inset-0 rounded-3xl blur-[50px] opacity-25 
          ${
            userType === "earner"
              ? "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-amber-300 via-amber-200 to-yellow-200"
              : "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-300 via-sky-200 to-indigo-200"
          }`}
        />

        {/* MAIN CARD */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl px-5 py-10 md:p-12 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
          {/* HEADER (Değişiklik Yok) */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 
              bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg mb-4"
            >
              <Bell className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
              Early Access Registration
            </h3>
            <p className="text-white/60 text-base md:text-lg">
              Don't miss the launch—be the first to grab the benefits!
            </p>
          </div>

          {/* USER TYPE SELECT (Butonlar GÜNCELLENDİ) */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-3 text-base text-center">
              User Type
            </label>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {/* Reward Earner */}
                <button
                  onClick={() => setUserType("earner")}
                  className={`relative py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    userType === "earner"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md scale-[1.02]"
                      : "text-white/60 hover:text-white bg-white/5"
                  }`}
                >
                  <div className="relative flex items-center justify-center gap-2 text-sm">
                    <Star className="w-5 h-5" />
                    {/* Değişiklik: DollarSign -> Star */}
                    <span>Reward Earner</span>
                    {/* Değişiklik: Money Earner -> Reward Earner */}
                  </div>
                </button>

                {/* Business */}
                <button
                  onClick={() => setUserType("business")}
                  className={`relative py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    userType === "business"
                      ? "bg-gradient-to-r from-blue-400 to-sky-500 text-white shadow-md scale-[1.02]"
                      : "text-white/60 hover:text-white bg-white/5"
                  }`}
                >
                  <div className="relative flex items-center justify-center gap-2 text-sm">
                    <Megaphone className="w-6 h-6" /> <span>Business</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* FORM (Değişiklik Yok) */}
          <div className="space-y-6">
            {/* Email (Değişiklik Yok) */}
            <div>
              <label className="block text-white font-semibold mb-3 text-base">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl 
                text-white placeholder:text-white/40 focus:outline-none 
                focus:ring-4 focus:ring-white/20 focus:border-white/30
                transition-all disabled:opacity-50 text-base"
              />
            </div>

            {/* TERMS (Değişiklik Yok) */}
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-white/75 text-sm leading-snug"
              >
                {/* ONCLICK EKLEME: Kullanım Şartları */}
                <span
                  onClick={() => setShowTermsModal(true)}
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Terms of Use
                </span>{" "}
                and {/* ONCLICK EKLEME: Gizlilik Politikası */}
                <span
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Privacy Policy
                </span>{" "}
                I accept.
              </label>
            </div>

            {/* SUBMIT BUTTON (GÜNCELLENDİ) */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !email || !termsAccepted}
              className={`relative w-full py-5 rounded-2xl font-bold text-lg transition-all
              group overflow-hidden text-white shadow-lg
              ${
                userType === "earner"
                  ? "bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300"
                  : "bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300" // Earner'a benzer parlaklıkta renkler ayarlandı
              }
              hover:scale-[1.02] disabled:opacity-50`}
            >
              <span className="relative flex items-center justify-center gap-2 text-sm">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Register for Early Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="mt-6 text-center space-y-1">
            <p className="text-white/50 text-xs">
              We will notify you before the launch
            </p>
            <p className="text-white/40 text-xs">
              Special bonuses for the first 10,000 users!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

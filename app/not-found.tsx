import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#020617] px-6 transition-colors duration-300 z-50">
      {/* İkon Bölümü */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
        <AlertCircle size={80} className="text-indigo-600 dark:text-indigo-500 relative z-10 animate-bounce" />
      </div>

      {/* Metin Bölümü */}
      <h1 className="text-8xl font-black tracking-tighter text-slate-900 dark:text-white">
        404
      </h1>
      
      <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full my-4" />

      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
        Sayfa Bulunamadı
      </h2>
      
      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xs text-center font-medium">
        Aradığınız yol bir çıkmaza girdi veya taşınmış olabilir.
      </p>

      {/* Buton */}
      <Link
        href="/"
        className="mt-10 flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-500/25 active:scale-95 group"
      >
        <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        Ana Sayfaya Dön
      </Link>

      {/* Arka Plan Dekorasyonu */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10 dark:opacity-[0.03] pointer-events-none">
        <span className="text-[20rem] font-black select-none">404</span>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  User,
  Users,
  X,
  Menu,
  Smile,
  Crown,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

// --- Tipler ---
type UserRole = "REKLAM_VEREN" | "KAZANAN" | "ADMIN";

interface UserInfo {
  id: string;
  name: string;
  avatarColor: string;
  role: UserRole;
  isOnline?: boolean;
}

interface MessageType {
  id: number;
  sender: UserInfo;
  text: string;
  time: string;
}

const MAX_CHAR_LIMIT = 200;

const ALL_USERS: UserInfo[] = [
  {
    id: "admin",
    name: "Premium Destek",
    avatarColor: "text-amber-500",
    role: "ADMIN",
    isOnline: true,
  },
  {
    id: "ahmet",
    name: "Ahmet Reklam",
    avatarColor: "text-blue-500",
    role: "REKLAM_VEREN",
    isOnline: true,
  },
  {
    id: "ayse",
    name: "Ayşe VIP",
    avatarColor: "text-indigo-500",
    role: "KAZANAN",
    isOnline: true,
  },
  {
    id: "mehmet",
    name: "Mehmet Elite",
    avatarColor: "text-emerald-500",
    role: "KAZANAN",
    isOnline: false,
  },
];

const CURRENT_USER: UserInfo = ALL_USERS[1];

const getRoleStyle = (role: UserRole) => {
  switch (role) {
    case "REKLAM_VEREN":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "KAZANAN":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "ADMIN":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
  }
};

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case "REKLAM_VEREN":
      return "Reklam Veren";
    case "KAZANAN":
      return "Kazanan";
    case "ADMIN":
      return "Yönetici";
  }
};

const Message: React.FC<{ message: MessageType; isCurrentUser: boolean }> = ({
  message,
  isCurrentUser,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-6 w-full px-4`}
    >
      <div
        className={`flex items-end max-w-[85%] md:max-w-[70%] gap-3 ${
          isCurrentUser ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex-shrink-0 mb-1">
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <User size={16} className={message.sender.avatarColor} />
          </div>
        </div>

        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {message.sender.name}
            </span>
            <Badge
              className={`text-[8px] px-1.5 h-4 border shadow-none ${getRoleStyle(
                message.sender.role
              )}`}
            >
              {message.sender.role === "ADMIN" && (
                <Crown size={8} className="mr-1" />
              )}
              {getRoleLabel(message.sender.role)}
            </Badge>
          </div>

          <div
            className={`relative px-4 py-2.5 rounded-[1.2rem] text-sm shadow-md border ${
              isCurrentUser
                ? "bg-indigo-600 text-white border-indigo-500 rounded-br-none"
                : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none"
            }`}
          >
            {message.text}
            <div
              className={`text-[8px] mt-1.5 font-medium opacity-60 ${
                isCurrentUser
                  ? "text-right text-indigo-100"
                  : "text-left text-slate-500"
              }`}
            >
              {message.time}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PlatformChat: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      sender: ALL_USERS[0],
      text: "Elite Lounge'a hoş geldiniz. En iyi kazananlarla bilgi alışverişi yapın ve bağlantı kurun. ✨",
      time: "12:00",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: MessageType = {
      id: Date.now(),
      sender: CURRENT_USER,
      text: inputMessage,
      time: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-[#020617] flex flex-col overflow-hidden font-sans transition-colors duration-300">
      {/* Glow Background (Sadece Dark Modda Belirgin) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50 dark:opacity-100">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* ANA SOHBET ALANI */}
        <main
          className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
            showUserList ? "lg:mr-80" : "mr-0"
          }`}
        >
          {/* HEADER */}
          <header className="h-16 md:h-20 flex items-center justify-between px-6 bg-white/80 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                  Canlı Sohbet
                </h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                    {ALL_USERS.filter((u) => u.isOnline).length} ÇEVRİMİÇİ
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserList(!showUserList)}
                className="rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400"
              >
                {showUserList ? <Menu size={20} /> : <Users size={20} />}
              </Button>
            </div>
          </header>

          {/* SOHBET İÇERİĞİ */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto py-4">
              <div className="flex justify-center mb-8">
                <div className="px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                  Uçtan uca şifreli kanal
                </div>
              </div>
              {messages.map((m) => (
                <Message
                  key={m.id}
                  message={m}
                  isCurrentUser={m.sender.id === CURRENT_USER.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* MESAJ GİRİŞ ALANI */}
          <footer className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto relative">
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute bottom-20 left-0 z-50 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10"
                  >
                    <EmojiPicker
                      theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                      onEmojiClick={(e) => setInputMessage((p) => p + e.emoji)}
                      width={300}
                      height={400}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) =>
                      setInputMessage(e.target.value.slice(0, MAX_CHAR_LIMIT))
                    }
                    onKeyPress={handleKeyPress}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full h-14 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl pl-6 pr-24 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-500/50 transition-all shadow-sm"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold ${
                        inputMessage.length >= MAX_CHAR_LIMIT
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {inputMessage.length}/{MAX_CHAR_LIMIT}
                    </span>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      <Smile size={20} />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="h-14 w-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </footer>
        </main>

        {/* YAN MENÜ (ÜYE LİSTESİ) */}
        <aside
          className={`fixed lg:absolute right-0 h-full w-80 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-3xl border-l border-slate-200 dark:border-white/5 transition-all duration-500 ease-in-out z-50 shadow-2xl ${
            showUserList ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-20 flex items-center justify-between border-b border-slate-200 dark:border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
              <Users size={14} /> AKTİF ÜYELER
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserList(false)}
              className="rounded-full h-8 w-8 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500"
            >
              <X size={18} />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100%-80px)] p-6">
            <div className="space-y-5">
              {ALL_USERS.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-all"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-white/10 flex items-center justify-center">
                      <User size={18} className={user.avatarColor} />
                    </div>
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#020617] bg-emerald-500 shadow-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {user.name}
                    </p>
                    <Badge
                      className={`mt-0.5 text-[7px] font-black uppercase tracking-tighter shadow-none ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* MOBİL ARKA PLAN ÖRTÜSÜ */}
        <AnimatePresence>
          {showUserList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowUserList(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlatformChat;

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import {
  Send,
  User,
  Users,
  Loader2,
  X,
  Megaphone,
  BadgeCheck,
  Coins,
  Briefcase,
  Menu,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker, { Theme } from "emoji-picker-react";

// --- Tipler ---
type UserRole = "REKLAM_VEREN" | "KAZANAN" | "ADMIN";
interface UserInfo {
  id: string;
  name: string;
  avatarColor: string;
  role: UserRole;
}
interface MessageType {
  id: number;
  sender: UserInfo;
  text: string;
  time: string;
}

const MAX_CHAR_LIMIT = 200; // Karakter sınırı

const ALL_USERS: UserInfo[] = [
  { id: "admin", name: "Admin", avatarColor: "text-red-500", role: "ADMIN" },
  {
    id: "ahmet",
    name: "Ahmet Reklam",
    avatarColor: "text-blue-500",
    role: "REKLAM_VEREN",
  },
  {
    id: "ayse",
    name: "Ayşe Pro",
    avatarColor: "text-pink-500",
    role: "KAZANAN",
  },
  {
    id: "mehmet",
    name: "Mehmet Can",
    avatarColor: "text-green-500",
    role: "KAZANAN",
  },
  {
    id: "zeynep",
    name: "Zeynep Media",
    avatarColor: "text-purple-500",
    role: "REKLAM_VEREN",
  },
];

const CURRENT_USER: UserInfo = ALL_USERS[1];

const Message: React.FC<{ message: MessageType; isCurrentUser: boolean }> = ({
  message,
  isCurrentUser,
}) => {
  const align = isCurrentUser ? "justify-end" : "justify-start";
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "REKLAM_VEREN":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-none text-[9px] h-4 flex gap-0.5">
            <Briefcase size={8} /> Reklam Veren
          </Badge>
        );
      case "KAZANAN":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] h-4 flex gap-0.5">
            <Coins size={8} /> Kazanan
          </Badge>
        );
      case "ADMIN":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-none text-[9px] h-4 flex gap-0.5">
            <BadgeCheck size={8} /> Admin
          </Badge>
        );
    }
  };

  return (
    <div
      className={`flex ${align} mb-4 w-full animate-in fade-in slide-in-from-bottom-2`}
    >
      <div
        className={`flex items-start max-w-[85%] md:max-w-md gap-2 ${
          isCurrentUser ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border dark:border-slate-700 shadow-sm">
            <User size={16} className={message.sender.avatarColor} />
          </div>
        </div>
        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold dark:text-slate-300">
              {message.sender.name}
            </span>
            {getRoleBadge(message.sender.role)}
          </div>
          <div
            className={`px-4 py-2 rounded-2xl shadow-sm text-sm break-words ${
              isCurrentUser
                ? "bg-indigo-600 text-white rounded-tr-none"
                : "bg-white dark:bg-slate-800 border dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none"
            }`}
          >
            {message.text}
            <span className="block text-[9px] mt-1 opacity-60 text-right">
              {message.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlatformChat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      sender: ALL_USERS[0],
      text: "Merhaba! 👋 Reklam verenler ve kazananlar burada yardımlaşabilir.",
      time: "12:00",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Emoji dışına tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const onEmojiClick = (emojiData: any) => {
    if (inputMessage.length + emojiData.emoji.length <= MAX_CHAR_LIMIT) {
      setInputMessage((prev) => prev + emojiData.emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || inputMessage.length > MAX_CHAR_LIMIT) return;

    const newMessage: MessageType = {
      id: Date.now(),
      sender: CURRENT_USER,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed inset-0 z-50 top-0 w-full bg-slate-50 dark:bg-[#020617] flex flex-col overflow-hidden transition-colors">
      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            showUserList ? "lg:mr-72" : "mr-0"
          }`}
        >
          <header className="bg-white dark:bg-slate-900/50 border-b dark:border-white/5 p-4 shrink-0">
            {/* Bu yeni div içeriği sınırlar ve ortalar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
              {/* Sol Kısım */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Users size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-black dark:text-white uppercase tracking-tight">
                    Canlı Chat
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-slate-500 uppercase font-bold">
                      {ALL_USERS.length} Aktif
                    </span>
                  </div>
                </div>
              </div>

              {/* Sağ Kısım (Buton) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserList(!showUserList)}
                className="hover:bg-indigo-50 dark:hover:bg-white/5"
              >
                {showUserList ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </header>

          {/* MESAJ ALANI */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-transparent flex flex-col">
            <div className="flex-1" />
            <div className="max-w-7xl mx-auto w-full">
              {messages.map((m) => (
                <Message
                  key={m.id}
                  message={m}
                  isCurrentUser={m.sender.id === CURRENT_USER.id}
                />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 animate-pulse ml-10 mb-1">
                  <Loader2 size={10} className="animate-spin" />
                  <span className="text-[9px] font-bold uppercase italic">
                    Yazıyor...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* FOOTER - EMOJI VE KARAKTER SINIRI */}
          {/* FOOTER - EMOJI VE KARAKTER SINIRI İÇ İÇE */}
          <footer className="p-4 bg-white dark:bg-slate-900 border-t dark:border-white/5 shrink-0 relative">
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-20 left-4 z-50 shadow-2xl animate-in zoom-in-95 duration-200"
              >
                <EmojiPicker
                  theme={Theme.AUTO}
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  searchPlaceholder="Emoji ara..."
                  width={300}
                  height={400}
                />
              </div>
            )}

            <form
              onSubmit={handleSendMessage}
              className="max-w-7xl mx-auto flex items-center gap-2"
            >
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) =>
                    setInputMessage(e.target.value.slice(0, MAX_CHAR_LIMIT))
                  }
                  placeholder="Mesaj gönder..."
                  className="w-full h-12 bg-slate-100 dark:bg-white/5 border-none rounded-2xl pl-4 pr-24 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none transition-all"
                />

                {/* İÇ PANEL (Emoji ve Sayaç) */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm py-1 px-2 rounded-xl border border-white/20">
                  {/* Karakter Sayacı */}
                  <span
                    className={`text-[10px] font-mono font-bold select-none ${
                      inputMessage.length >= MAX_CHAR_LIMIT
                        ? "text-red-500"
                        : "text-slate-400"
                    }`}
                  >
                    {inputMessage.length}/{MAX_CHAR_LIMIT}
                  </span>

                  {/* Ayırıcı Çizgi */}
                  <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-700" />

                  {/* Emoji Butonu */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-slate-400 hover:text-indigo-500 transition-colors p-1"
                  >
                    <Smile size={18} />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  !inputMessage.trim() || inputMessage.length > MAX_CHAR_LIMIT
                }
                className="h-12 w-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shrink-0 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
              >
                <Send size={18} />
              </Button>
            </form>
          </footer>
        </div>

        {/* SIDEBAR - ÜYE LİSTESİ */}
        <aside
          className={`absolute right-0 h-full w-72 bg-white dark:bg-slate-900 border-l dark:border-white/5 transition-transform duration-500 ease-in-out z-102 ${
            showUserList ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5 border-b dark:border-white/5 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Üye Listesi
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowUserList(false)}
            >
              <X size={16} />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100%-65px)] p-4">
            <div className="space-y-4">
              {ALL_USERS.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border dark:border-slate-700">
                      <User size={16} className={user.avatarColor} />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold dark:text-white truncate">
                      {user.name}
                    </p>
                    <span
                      className={`text-[8px] font-bold uppercase ${
                        user.role === "REKLAM_VEREN"
                          ? "text-blue-500"
                          : user.role === "ADMIN"
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {user.role.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {showUserList && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setShowUserList(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PlatformChat;

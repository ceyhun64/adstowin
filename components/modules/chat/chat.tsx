// PlatformChat.tsx

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Send, User, Users, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// ... (Arayüz Tanımları ve Kullanıcı Verileri sabit kalır) ...
interface UserInfo {
  id: string;
  name: string;
  avatarColor: string;
}

interface MessageType {
  id: number;
  sender: UserInfo;
  text: string;
  time: string;
}

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

const ALL_USERS: UserInfo[] = [
  { id: "ahmet", name: "Ahmet Yılmaz", avatarColor: "text-blue-500" },
  { id: "ayse", name: "Ayşe Kaya", avatarColor: "text-pink-500" },
  { id: "mehmet", name: "Mehmet Can", avatarColor: "text-green-500" },
  { id: "zeynep", name: "Zeynep Demir", avatarColor: "text-purple-500" },
  { id: "admin", name: "Platform Admin", avatarColor: "text-red-500" },
];

const CURRENT_USER: UserInfo = ALL_USERS[0];

// --- 3. Message Bileşeni (Alt Bileşen) ---
const Message: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  const align = isCurrentUser ? "justify-end" : "justify-start";
  const bgColor = isCurrentUser
    ? "bg-indigo-500 text-white"
    : "bg-gray-100 dark:bg-gray-700 dark:text-gray-100 text-gray-900";
  const rounded = isCurrentUser ? "rounded-tr-none" : "rounded-tl-none";

  const nameColor = isCurrentUser
    ? "text-white/80"
    : message.sender.avatarColor;

  return (
    <div className={`flex ${align} mb-4`}>
      <div className={`flex items-start max-w-sm md:max-w-md`}>
        {!isCurrentUser && (
          <div className="flex-shrink-0 mr-3 mt-1">
            <User size={20} className={message.sender.avatarColor} />
          </div>
        )}

        <div
          className={`${bgColor} p-3 ${rounded} rounded-xl shadow-md transition-all duration-300`}
        >
          <p className={`text-xs font-semibold mb-1 ${nameColor}`}>
            {message.sender.name}
          </p>
          <p className="text-sm">{message.text}</p>
          <span className="block text-right text-xs mt-1 opacity-70">
            {message.time}
          </span>
        </div>

        {isCurrentUser && (
          <div className="flex-shrink-0 ml-3 mt-1">
            <User size={20} className={message.sender.avatarColor} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. PlatformChat Bileşeni (Ana Bileşen) ---
const PlatformChat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      sender: ALL_USERS[4],
      text: `Platforma hoş geldiniz! Lütfen kurallarımızı incelemeyi unutmayın.`,
      time: "15:00",
    },
    {
      id: 2,
      sender: ALL_USERS[1],
      text: "Merhaba millet! Yeni reklam teklifleri arıyorum. Kimler hazır?",
      time: "15:05",
    },
    {
      id: 3,
      sender: CURRENT_USER,
      text: "Ben de yeni katıldım. Platformdaki en popüler reklam kategorisi nedir?",
      time: "15:10",
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSimulatingTyping, setIsSimulatingTyping] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showUserList, setShowUserList] = useState(true); // Başlangıçta açık
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ... (simulateRandomReply ve handleSendMessage fonksiyonları aynı kalır) ...
  const simulateRandomReply = () => {
    setIsSimulatingTyping(true);

    const availableUsers = ALL_USERS.filter((u) => u.id !== CURRENT_USER.id);
    const randomSender =
      availableUsers[Math.floor(Math.random() * availableUsers.length)];

    setTimeout(() => {
      let replyText: string;

      if (randomSender.id === "mehmet") {
        replyText =
          "Ben Mehmet, genelde teknoloji reklamları çok kazandırıyor.";
      } else if (randomSender.id === "ayse") {
        replyText =
          "Ayşe Kaya: Benim tecrübem, emlak ve finansın en yüksek dönüşü sağladığı yönünde.";
      } else if (randomSender.id === "zeynep") {
        replyText = "Zeynep: E-ticaret kategorisinde de güzel fırsatlar var!";
      } else if (randomSender.id === "admin") {
        replyText = "Lütfen sorularınızı destek kanalına yazınız.";
      } else {
        replyText =
          "Farklı kategorilerde çok sayıda teklif var, denemek lazım!";
      }

      const newReply: MessageType = {
        id: Date.now() + 1,
        sender: randomSender,
        text: replyText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, newReply]);
      setIsSimulatingTyping(false);
    }, 2000 + Math.random() * 1000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage === "") return;

    const newMessage: MessageType = {
      id: Date.now(),
      sender: CURRENT_USER,
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages: MessageType[]) => [...prevMessages, newMessage]);
    setInputMessage("");

    if (messages.length % 2 === 0) {
      simulateRandomReply();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSimulatingTyping]);

  // Sidebar açıkken footer'ın sağdan ne kadar daralacağını belirleyen dinamik sınıf
  const footerRightClass = showUserList ? "right-[256px]" : "right-0"; // w-64 = 256px

  return (
    <div className="fixed inset-0 z-50 top-20 bottom-20 w-full h-full bg-white dark:bg-gray-900 flex overflow-hidden ">
      {/* 1. Ana Chat Alanı (Soldaki Gözüken Kısım) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          showUserList ? "mr-64" : "mr-0"
        }`}
      >
        {/* Header */}
        <header className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-b border-indigo-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users size={30} className="text-white" />
            <div>
              <h2 className="text-xl font-bold">Genel Platform Kanalı</h2>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white mt-1"
              >
                {ALL_USERS.length} Üye Çevrimiçi
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Sidebar Aç/Kapa Butonu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowUserList(!showUserList)}
              className="text-white hover:bg-white/20"
            >
              {showUserList ? (
                <X className="w-5 h-5" />
              ) : (
                <Users className="w-5 h-5" />
              )}
            </Button>
            {/* Küçült Butonu */}
          </div>
        </header>

        {/* Mesaj Geçmişi Alanı */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isCurrentUser={message.sender.id === CURRENT_USER.id}
            />
          ))}

          {isSimulatingTyping && (
            <div className="flex justify-start items-center mb-4 ml-3">
              <Loader2
                size={20}
                className="animate-spin text-indigo-500 mr-2"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Bir kullanıcı yazıyor...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. Mesaj Giriş Formu (Footer) - DİNAMİK SABİTLENDİ */}
        <footer
          className={`fixed bottom-20 left-0 ${footerRightClass} bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-20 transition-all duration-300`}
        >
          <form onSubmit={handleSendMessage} className="flex space-x-3 w-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Kanala bir mesaj gönderin..."
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition"
              disabled={isSimulatingTyping}
            />
            <button
              type="submit"
              className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 flex items-center justify-center"
              disabled={inputMessage.trim() === "" || isSimulatingTyping}
            >
              <Send size={20} />
            </button>
          </form>
        </footer>
      </div>

      {/* 2. Çevrimiçi Kullanıcılar Sidebar */}
      <div
        className={`fixed top-20 right-0 h-full w-64 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 z-10 transform ${
          showUserList ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4" />
            Çevrimiçi Kullanıcılar
          </h3>
        </div>
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {ALL_USERS.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <User size={32} className={user.avatarColor} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.id === CURRENT_USER.id ? "Sen" : "Çevrimiçi"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlatformChat;

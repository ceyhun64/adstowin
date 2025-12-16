import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BottomNavigation from "@/components/layout/bottomNavBar";
import Chat from "@/components/modules/chat/chat";

export default function ChatPage() {
  return (
    <div>
      <Navbar />
      <Chat />
      <BottomNavigation />
    </div>
  );
}

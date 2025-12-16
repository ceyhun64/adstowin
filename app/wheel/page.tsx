import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BottomNavigation from "@/components/layout/bottomNavBar";
import Wheel from "@/components/modules/wheel/wheel";

export default function WheelPage() {
  return (
    <div>
      <Navbar />
      <Wheel />
      <Footer />
      <BottomNavigation />
    </div>
  );
}

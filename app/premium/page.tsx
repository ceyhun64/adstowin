import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BottomNavigation from "@/components/layout/bottomNavBar";
import Premium from "@/components/modules/premium/premium";

export default function PremiumPage() {
  return (
    <div>
      <Navbar />
      <Premium />
      <Footer />
      <BottomNavigation />
    </div>
  );
}

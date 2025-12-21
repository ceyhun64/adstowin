import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CookiePolicy from "@/components/modules/info/cookiePolicy";

export default function CookiePolicyPage() {
  return (
    <div>
      <Navbar />
      <CookiePolicy />
      <Footer />
    </div>
  );
}

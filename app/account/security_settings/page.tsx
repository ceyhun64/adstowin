import Navbar from "@/components/layout/navbar";
import SecuritySettings from "@/components/modules/account/securitySettings";
import Footer from "@/components/layout/footer";

export default function SecuritySettingsPage() {
  return (
    <div>
      <Navbar />
      <SecuritySettings />
      <Footer />
    </div>
  );
}

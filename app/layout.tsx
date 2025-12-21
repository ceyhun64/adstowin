import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import BottomNavigation from "@/components/layout/bottomNavBar";
import { ThemeProvider } from "next-themes";
import CookieConsent from "@/components/layout/cookieConsent";
import ScrollToTopButton from "../components/layout/scrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdsToWin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <CookieConsent />
        </ThemeProvider>
        <BottomNavigation />
        <ScrollToTopButton />

        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            style: { zIndex: 9999 },
          }}
        />
      </body>
    </html>
  );
}

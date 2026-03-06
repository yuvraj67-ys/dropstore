import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/common/SearchModal";
import { Toaster } from "react-hot-toast";
import ThemeInitializer from "@/components/common/ThemeInitializer";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DropStore — Your Brand. Your Store. Your Rules.",
  description: "Shop the best products at unbeatable prices. Free shipping on orders above ₹499.",
  keywords: ["dropstore", "ecommerce", "online shopping", "dropshipping", "india"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${dmSans.variable} antialiased`}>
        <ThemeInitializer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '14px' },
          }}
        />
        <div className="flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <MobileNav />
        <CartDrawer />
        <SearchModal />
      </body>
    </html>
  );
}

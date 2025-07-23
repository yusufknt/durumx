import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "DürümX | Hatay Dürüm & Fast Food",
  description: "Gerçek Hatay dürümü, burger ve daha fazlası şimdi DürümX'te!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`bg-gradient-to-br from-[#fff0e6] via-[#fff] to-[#f7f7fa] text-[#22223b] min-h-screen flex flex-col antialiased ${inter.className} scroll-smooth`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 
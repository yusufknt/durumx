"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrderModal from "@/components/shared/OrderModal";
import ModalProvider from "@/providers/ModalProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <title>DürümX - Gerçek Hatay Dürümü</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Gerçek Hatay dürümü, burger ve daha fazlası şimdi DürümX'te!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`bg-gradient-to-br from-[#fff0e6] via-[#fff] to-[#f7f7fa] text-[#22223b] min-h-screen flex flex-col antialiased ${inter.className} scroll-smooth`}
      >
        <ModalProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <OrderModal />
        </ModalProvider>
      </body>
    </html>
  );
}

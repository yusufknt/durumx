"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { FaLeaf, FaClock, FaUserTie, FaPepperHot, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";

const KATEGORILER = [
  { name: "Dürümler", icon: <FaPepperHot size={32} className="text-[#e63946]" />, href: "/menu" },
  { name: "Burgerler", icon: <FaUserTie size={32} className="text-[#ffb703]" />, href: "/menu" },
  { name: "İçecekler", icon: <FaLeaf size={32} className="text-[#38b000]" />, href: "/menu" },
];

const AVANTAJLAR = [
  { title: "Taze Malzeme", desc: "Her gün taze ve kaliteli ürünler.", icon: <FaLeaf size={28} className="text-[#38b000]" /> },
  { title: "Hızlı Servis", desc: "Siparişiniz dakikalar içinde hazır.", icon: <FaClock size={28} className="text-[#e63946]" /> },
  { title: "Usta Şefler", desc: "Deneyimli ve uzman mutfak ekibi.", icon: <FaUserTie size={28} className="text-[#ffb703]" /> },
  { title: "Gerçek Hatay Lezzeti", desc: "Otantik ve geleneksel tarifler.", icon: <FaPepperHot size={28} className="text-[#e63946]" /> },
];

const YORUMLAR = [
  {
    name: "Ayşe K.",
    comment: "Gerçekten Hatay'daki gibi! Dürümler harika ve çok hızlı geldi.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Mehmet T.",
    comment: "Burger menüsü de şahane, patatesler çıtır çıtırdı.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Elif B.",
    comment: "Lezzet, sunum ve servis mükemmel. Tekrar sipariş vereceğim!",
    stars: 5,
    avatar: "/vercel.svg",
  },
];

export default function HomePage() {
  const [show, setShow] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const orderBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOrderToggle = () => setOrderOpen((prev) => !prev);
  const handleOrderKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") setOrderOpen((prev) => !prev);
  };
  useEffect(() => {
    if (!orderOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        orderBtnRef.current &&
        !orderBtnRef.current.contains(e.target as Node)
      ) {
        setOrderOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [orderOpen]);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className={`transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <Hero />
      </div>
      {/* Hızlı Menü Kategorileri */}
      <section className={`max-w-4xl mx-auto py-12 px-4 transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {KATEGORILER.map((kat, i) => (
            <Link
              key={kat.name}
              href={kat.href}
              className={`flex flex-col items-center rounded-3xl shadow-xl p-8 w-full sm:w-1/3 border border-[#ececec] hover:scale-105 hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-[#ff1a1a] to-black relative
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-black/30 rounded-3xl pointer-events-none" />
              <span className="mb-2 group-hover:scale-110 transition-transform duration-200 relative z-10">{kat.icon}</span>
              <span className="mt-3 text-xl font-extrabold text-gray-100 tracking-tight relative z-10">{kat.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* Avantajlar */}
      <section className="relative max-w-5xl mx-auto py-20 px-6 rounded-3xl overflow-hidden mb-16 bg-white shadow-lg border border-[#f3f3f3] transition-all duration-1000 ease-out">
        <h3 className="text-3xl font-extrabold mb-10 text-center text-[#e63946] tracking-tight drop-shadow-lg">Neden DürümX?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {AVANTAJLAR.map((a, i) => (
            <div
              key={a.title}
              className="flex flex-col items-center rounded-2xl shadow-md p-8 border border-[#f3f3f3] bg-white hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <span className="mb-4 text-3xl">{a.icon}</span>
              <span className="mt-2 text-lg font-bold text-[#22223b]">{a.title}</span>
              <span className="text-sm text-[#666] mt-1 text-center">{a.desc}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Müşteri Yorumları */}
      <section className="relative max-w-4xl mx-auto py-20 px-6 rounded-3xl overflow-hidden mb-16 bg-white shadow-lg border border-[#f3f3f3] transition-all duration-1000 ease-out">
        <h3 className="text-3xl font-extrabold mb-10 text-center text-[#e63946] tracking-tight drop-shadow-lg">Müşteri Yorumları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {YORUMLAR.map((y, i) => (
            <div
              key={y.name}
              className="rounded-2xl shadow-md p-8 flex flex-col items-center border border-[#f3f3f3] bg-white hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <Image
                src={y.avatar}
                alt={y.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-full mb-4 border-2 border-[#ffb703] shadow-md"
              />
              <span className="font-bold text-[#22223b] text-lg">{y.name}</span>
              <div className="flex gap-1 my-2">
                {[...Array(y.stars)].map((_, i) => <FaStar key={i} className="text-[#ffb703]" />)}
              </div>
              <span className="text-sm text-[#666] text-center">{y.comment}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Sabit Hızlı Sipariş Butonu */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ease-out ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <button
          ref={orderBtnRef}
          className="px-10 py-4 rounded-full text-white font-extrabold text-xl shadow-2xl hover:scale-105 hover:brightness-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#ff1a1a]/60 focus:ring-offset-2 transition-all duration-300 w-full block"
          style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)' }}
          aria-label="Hemen Sipariş Ver"
          aria-haspopup="true"
          aria-expanded={orderOpen}
          onClick={handleOrderToggle}
          onKeyDown={handleOrderKeyDown}
          tabIndex={0}
        >
          Hemen Sipariş Ver
        </button>
        {orderOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 bottom-20 w-64 bg-white/95 border border-[#ececec] rounded-xl shadow-2xl z-50 backdrop-blur-md animate-fade-in"
            role="menu"
          >
            <a
              href="tel:+905555555555"
              className="block px-5 py-4 text-[#22223b] hover:bg-[#f9fafb] transition-colors rounded-t-xl"
              aria-label="Telefonla Sipariş Ver"
              tabIndex={0}
              onClick={() => setOrderOpen(false)}
            >
              📞 Telefonla Sipariş
            </a>
            <a
              href="https://www.yemeksepeti.com/restaurant/meej/durumx-meej"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-4 text-[#22223b] hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
              aria-label="Yemeksepeti'nden Sipariş Ver"
              tabIndex={0}
              onClick={() => setOrderOpen(false)}
            >
              <Image src="/logo/yemeksepeti-logo.png" alt="Yemeksepeti" width={24} height={24} className="object-contain" />
              Yemeksepeti
            </a>
            <a
              href="https://getir.com/yemek/restoran/hatay-doneri-durum-x-ipekyolu-halilaga-mah-ipekyolu-van/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-4 text-[#5f259f] hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
              aria-label="Getir'den Sipariş Ver"
              tabIndex={0}
              onClick={() => setOrderOpen(false)}
            >
              <Image src="/logo/getiryemek.png" alt="Getir" width={24} height={24} className="object-contain" />
              Getir
            </a>
            <a
              href="https://tgoyemek.com/restoranlar/127596"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-4 text-[#ff7100] hover:bg-[#f9fafb] transition-colors flex items-center gap-2 rounded-b-xl"
              aria-label="Trendyol Yemek'ten Sipariş Ver"
              tabIndex={0}
              onClick={() => setOrderOpen(false)}
            >
              <Image src="/logo/trendyolyemek.png" alt="Trendyol Yemek" width={24} height={24} className="object-contain" />
              Trendyol Yemek
            </a>
          </div>
        )}
      </div>
    </>
  );
} 
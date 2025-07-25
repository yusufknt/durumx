"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const YEMEKSEPETI_URL = "https://www.yemeksepeti.com/restaurant/meej/durumx-meej";
const PHONE_NUMBER = "+905555555555";

const Hero = () => {
  const [show, setShow] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const orderBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOrderToggle = () => setOrderOpen((prev) => !prev);
  const handleOrderKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") setOrderOpen((prev) => !prev);
  };
  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShowHeadline(true), 200);
    return () => clearTimeout(t);
  }, []);
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

  return (
    <section
      className="relative w-full h-[75vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden rounded-b-3xl shadow-xl border-b-4 border-[#e63946]/10"
      style={{ backgroundImage: 'url("/hero-placeholder.jpg")' }}
      aria-label="DürümX Karşılama Bölümü"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 backdrop-blur-[2px]" aria-hidden="true" />
      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-4 transition-opacity duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} max-w-2xl mx-auto`}
      >
        <Image src="/logo.png" alt="DürümX Logo" width={64} height={64} className="h-16 w-auto mb-6 drop-shadow-xl" unoptimized quality={100} />
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 tracking-tight drop-shadow-2xl leading-[1.15] transition-all duration-1000 ease-out font-sans
            ${showHeadline ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
          style={{
            background: "linear-gradient(90deg, #ff1a1a 0%, #000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "black"
          }}
        >
          DürümX’e Hoşgeldiniz
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-10 font-semibold text-[#22223b] bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl px-6 py-3 shadow-lg inline-block">
          Otantik lezzetler, modern dokunuşlar. Hatay’dan elinize.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className="rounded-full overflow-hidden relative">
            <button
              ref={orderBtnRef}
              className="px-10 py-4 rounded-full text-white font-extrabold text-xl shadow-2xl hover:scale-105 hover:brightness-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#ff1a1a]/60 focus:ring-offset-2 transition-all duration-300 w-full block"
              style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)' }}
              aria-label="Şimdi Sipariş Ver"
              aria-haspopup="true"
              aria-expanded={orderOpen}
              onClick={handleOrderToggle}
              onKeyDown={handleOrderKeyDown}
              tabIndex={0}
            >
              Şimdi Sipariş Ver
            </button>
            {orderOpen && (
              <div
                ref={dropdownRef}
                className="fixed left-1/2 -translate-x-1/2 top-[30%] sm:absolute sm:left-auto sm:translate-x-0 sm:top-auto sm:right-0 sm:mt-3 w-64 bg-white border border-[#ececec] rounded-xl shadow-xl z-50 animate-fade-in"
                role="menu"
              >
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="block px-5 py-4 text-[#22223b] hover:bg-[#f9fafb] transition-colors rounded-t-xl"
                  aria-label="Telefonla Sipariş Ver"
                  tabIndex={0}
                  onClick={() => setOrderOpen(false)}
                >
                  📞 Telefonla Sipariş
                </a>
                <a
                  href={YEMEKSEPETI_URL}
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
          <Link
            href="/menu"
            className="px-10 py-4 rounded-full bg-white/90 border-2 border-[#e63946] text-[#e63946] font-extrabold text-xl shadow-2xl hover:bg-[#fff0e6] hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#e63946]/60 focus:ring-offset-2 transition-all duration-300"
            aria-label="Menüyü Görüntüle"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/menu'; } }}
          >
            Menüyü Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
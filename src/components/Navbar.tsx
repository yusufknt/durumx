"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

const YEMEKSEPETI_URL = "https://www.yemeksepeti.com/restaurant/meej/durumx-meej";
const PHONE_NUMBER = "+905555555555";

const Navbar = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const orderBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleOrderToggle = () => setOrderOpen((prev) => !prev);
  const handleOrderKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") setOrderOpen((prev) => !prev);
  };
  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);
  const handleMobileMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") setMobileMenuOpen((prev) => !prev);
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
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-lg shadow-xl flex items-center justify-between px-6 py-4 border-b border-white/30 rounded-b-2xl">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="DürümX Anasayfa" className="flex items-center gap-2">
          <Image src="/logo.png" alt="DürümX Logo" width={48} height={48} className="h-12 w-auto object-contain" unoptimized quality={100} />
        </Link>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-[#22223b] font-semibold text-lg px-4 py-2 rounded-xl
              after:content-[' '] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[#ff1a1a] after:to-black after:rounded-full after:transition-all after:duration-300
              hover:after:w-3/4 focus:after:w-3/4
              transition-all duration-200 active:scale-97 active:shadow-md"
            aria-label={link.label}
            tabIndex={0}
          >
            {link.label}
          </Link>
        ))}
        <div className="relative">
          <button
            ref={orderBtnRef}
            className="px-6 py-2 rounded-full text-white font-bold text-base shadow-lg hover:scale-105 hover:brightness-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#ff1a1a]/60 focus:ring-offset-2 transition-all duration-200 inline-block"
            style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)' }}
            aria-label="Sipariş Ver"
            aria-haspopup="true"
            aria-expanded={orderOpen}
            onClick={handleOrderToggle}
            onKeyDown={handleOrderKeyDown}
            tabIndex={0}
          >
            Sipariş Ver
          </button>
          {orderOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-52 bg-white/95 border border-[#ececec] rounded-xl shadow-xl z-50 backdrop-blur-md">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="block px-5 py-3 text-[#22223b] hover:bg-[#f9fafb] transition-colors rounded-t-xl"
                aria-label="Telefonla Sipariş Ver"
                tabIndex={0}
              >
                📞 Telefonla Sipariş
              </a>
              <a
                href={YEMEKSEPETI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-5 py-3 text-[#22223b] hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
                aria-label="Yemeksepeti'nden Sipariş Ver"
                tabIndex={0}
              >
                <Image src="/logo/yemeksepeti-logo.png" alt="Yemeksepeti" width={48} height={48} className="h-6 w-6 object-contain" unoptimized quality={100} />
                Yemeksepeti
              </a>
              <a
                href="https://getir.com/yemek/restoran/hatay-doneri-durum-x-ipekyolu-halilaga-mah-ipekyolu-van/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-5 py-3 text-[#5f259f] hover:bg-[#f9fafb] transition-colors flex items-center gap-2"
                aria-label="Getir'den Sipariş Ver"
                tabIndex={0}
              >
                <Image src="/logo/getiryemek.png" alt="Getir" width={48} height={48} className="h-6 w-6 object-contain" unoptimized quality={100} />
                Getir
              </a>
              <a
                href="https://tgoyemek.com/restoranlar/127596"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-5 py-3 text-[#ff7100] hover:bg-[#f9fafb] transition-colors flex items-center gap-2 rounded-b-xl"
                aria-label="Trendyol Yemek'ten Sipariş Ver"
                tabIndex={0}
              >
                <Image src="/logo/trendyolyemek.png" alt="Trendyol Yemek" width={48} height={48} className="h-6 w-6 object-contain" unoptimized quality={100} />
                Trendyol Yemek
              </a>
            </div>
          )}
        </div>
      </div>
      {/* Mobil hamburger menü butonu */}
      <button
        className="md:hidden ml-auto flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
        aria-label={mobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
        aria-expanded={mobileMenuOpen}
        onClick={handleMobileMenuToggle}
        onKeyDown={handleMobileMenuKeyDown}
        tabIndex={0}
      >
        {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>
      {/* Mobil açılır menü */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 bg-white/95 flex justify-end md:hidden"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-64 bg-white h-full shadow-2xl flex flex-col gap-2 p-6 animate-slide-in-right">
            <button
              className="self-end mb-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              aria-label="Menüyü Kapat"
              onClick={() => setMobileMenuOpen(false)}
              tabIndex={0}
            >
              <FaTimes size={24} />
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#22223b] font-semibold text-lg px-4 py-3 rounded-xl hover:bg-[#f7f7fa] focus:bg-[#f7f7fa] transition-all duration-200"
                aria-label={link.label}
                tabIndex={0}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobilde Sipariş Ver dropdown kaldırıldı */}
          </div>
        </div>
      )}
      <div className="flex gap-4 ml-6">
        <a
          href="https://www.instagram.com/durum_x/?hl=tr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram'a git"
          tabIndex={0}
          className="text-[#22223b] hover:text-[#e1306c] focus:outline-none focus:ring-2 focus:ring-[#e1306c] rounded-full p-1 transition-colors duration-200 shadow-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.open('https://www.instagram.com/durum_x/?hl=tr', '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="#"
          aria-label="TikTok"
          tabIndex={0}
          className="text-[#22223b] hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded-full p-1 transition-colors duration-200 shadow-sm"
        >
          <FaTiktok size={22} />
        </a>
        <a
          href="https://wa.me/904322151555"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          tabIndex={0}
          className="text-[#22223b] hover:text-[#38b000] focus:outline-none focus:ring-2 focus:ring-[#38b000] rounded-full p-1 transition-colors duration-200 shadow-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.open('https://wa.me/904322151555', '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <FaWhatsapp size={22} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
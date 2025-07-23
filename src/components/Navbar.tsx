"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

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

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-lg shadow-xl flex items-center justify-between px-6 py-4 border-b border-white/30 rounded-b-2xl">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="DürümX Anasayfa" className="flex items-center gap-2">
          <img src="/logo.png" alt="DürümX Logo" className="h-12 w-auto object-contain" />
        </Link>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-[#22223b] font-semibold text-lg px-4 py-2 rounded-xl
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[#e63946] after:to-[#ffb703] after:rounded-full after:transition-all after:duration-300
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
            className="bg-transparent px-6 py-2 rounded-full shadow-lg font-bold hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#e63946] focus:ring-offset-2 border-2 border-transparent"
            style={{ background: 'linear-gradient(135deg, #e63946 0%, #ff7f50 50%, #ffb703 100%)', color: '#fff' }}
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
                <img src="/logo/yemeksepeti-logo.png" alt="Yemeksepeti" className="h-6 w-6 object-contain" />
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
                <img src="/logo/getiryemek.png" alt="Getir" className="h-6 w-6 object-contain" />
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
                <img src="/logo/trendyolyemek.png" alt="Trendyol Yemek" className="h-6 w-6 object-contain" />
                Trendyol Yemek
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 ml-6">
        <a href="#" aria-label="Instagram" tabIndex={0} className="text-[#22223b] hover:text-[#e1306c] focus:outline-none focus:ring-2 focus:ring-[#e1306c] rounded-full p-1 transition-colors duration-200 shadow-sm">
          <FaInstagram size={22} />
        </a>
        <a href="#" aria-label="TikTok" tabIndex={0} className="text-[#22223b] hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded-full p-1 transition-colors duration-200 shadow-sm">
          <FaTiktok size={22} />
        </a>
        <a href="#" aria-label="WhatsApp" tabIndex={0} className="text-[#22223b] hover:text-[#38b000] focus:outline-none focus:ring-2 focus:ring-[#38b000] rounded-full p-1 transition-colors duration-200 shadow-sm">
          <FaWhatsapp size={22} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
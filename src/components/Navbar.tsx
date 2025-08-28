"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useModal } from "@/app/layout";

const LEFT_NAV_LINKS = [
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/subelerimiz", label: "Şubelerimiz" },
  { href: "/franchise", label: "Franchise" },
];

const RIGHT_NAV_LINKS = [
  { href: "/urunlerimiz", label: "Ürünlerimiz" },
  { href: "/contact", label: "İletişim" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { setOrderOpen } = useModal();

  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Check if a link is active (current page)
  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={`sticky top-0 z-50 w-full shadow-xl flex items-center justify-between px-6 py-2 border-b border-white/30 rounded-b-2xl ${mobileMenuOpen ? 'bg-white' : 'bg-white/20 backdrop-blur-lg md:backdrop-blur-lg'}`}>
      {/* Sol taraf */}
      <div className="hidden md:flex gap-8 items-center">
        {LEFT_NAV_LINKS.map((link) => (
          <div key={link.href} className="relative">
            <Link
              href={link.href}
              className={`text-[#22223b] font-semibold text-lg px-4 py-3 rounded-xl transition-all duration-200 block ${
                isActiveLink(link.href) ? 'text-[#ff1a1a]' : ''
              }`}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
            {/* Hover ve Active çizgisi */}
            <div 
              className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-red-500 to-black rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                isActiveLink(link.href) || hoveredLink === link.href ? 'w-4/5 opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ zIndex: 10 }}
            />
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center flex-1 relative">
        <Link href="/" aria-label="DürümX Anasayfa" className="group relative">
          {/* Soft transparent frame extending below navbar */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/60 transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-3xl" style={{ marginBottom: '-35px', zIndex: 60 }}>
            {/* Main logo image */}
            <Image 
              src="/logo.png" 
              alt="DürümX Logo" 
              width={48} 
              height={48} 
              className="h-12 w-auto object-contain relative z-10" 
              unoptimized 
              priority
              quality={75} 
            />
            
            {/* Bottom protruding shadow effect */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-red-500/30 via-red-400/20 to-transparent rounded-full blur-sm"></div>
          </div>
        </Link>
      </div>

      {/* Sağ taraf */}
      <div className="hidden md:flex gap-8 items-center">
        {RIGHT_NAV_LINKS.map((link) => (
          <div key={link.href} className="relative">
            <Link
              href={link.href}
              className={`text-[#22223b] font-semibold text-lg px-4 py-3 rounded-xl transition-all duration-300 block ${
                isActiveLink(link.href) ? 'text-[#ff1a1a]' : ''
              }`}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
            {/* Hover ve Active çizgisi */}
            <div 
              className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-red-500 to-black rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                isActiveLink(link.href) || hoveredLink === link.href ? 'w-4/5 opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ zIndex: 10 }}
            />
          </div>
        ))}
        <button
          className="px-6 py-2 rounded-full text-white font-bold text-base shadow-lg hover:scale-105 transition-all duration-200"
          style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)' }}
          onClick={() => setOrderOpen(true)}
        >
          Sipariş Ver
        </button>
      </div>

      {/* Mobilde Sipariş Ver ve Menü */}
      <div className="md:hidden flex items-center gap-2 absolute right-3 top-3">
        <button
          className="px-3 py-2 rounded-full text-white text-sm font-bold shadow"
          style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)' }}
          onClick={() => setOrderOpen(true)}
        >
          Sipariş Ver
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-lg"
          onClick={handleMobileMenuToggle}
        >
          {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobil açılır menü */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-50 flex justify-end md:hidden bg-black/30" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 bg-white h-full shadow-2xl flex flex-col gap-2 p-6 animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-4 p-2 rounded" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes size={24} />
            </button>
            {[...LEFT_NAV_LINKS, ...RIGHT_NAV_LINKS].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`block text-[#22223b] font-semibold text-lg px-4 py-3 rounded-xl hover:bg-[#f7f7fa] transition-all duration-200 ${
                  isActiveLink(link.href) ? 'bg-[#ff1a1a]/10 text-[#ff1a1a] border-l-4 border-[#ff1a1a]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
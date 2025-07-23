"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section
      className="relative w-full h-[75vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden rounded-b-3xl shadow-xl border-b-4 border-[#e63946]/10"
      style={{ backgroundImage: 'url("/hero-placeholder.jpg")' }}
      aria-label="DürümX Karşılama Bölümü"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e63946]/80 via-white/80 to-[#fff0e6]/90 backdrop-blur-[2px]" aria-hidden="true" />
      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-4 transition-opacity duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} max-w-2xl mx-auto`}
      >
        <img src="/logo.png" alt="DürümX Logo" className="h-16 w-auto mb-6 drop-shadow-xl" />
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-[#e63946] via-[#ff7f50] to-[#ffb703] text-transparent bg-clip-text drop-shadow-2xl leading-[1.15]">
          DürümX’e Hoşgeldiniz
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-10 font-semibold text-[#22223b] bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl px-6 py-3 shadow-lg inline-block">
          Otantik lezzetler, modern dokunuşlar. Hatay’dan elinize.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className="rounded-full overflow-hidden">
            <Link
              href="https://www.yemeksepeti.com/restaurant/meej/durumx-meej"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-transparent rounded-full text-white font-extrabold text-xl shadow-2xl hover:scale-105 hover:brightness-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#e63946]/60 focus:ring-offset-2 transition-all duration-300 border-2 border-transparent w-full block"
              style={{ background: 'linear-gradient(135deg, #e63946 0%, #ff7f50 50%, #ffb703 100%)' }}
              aria-label="Şimdi Sipariş Ver"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.open('https://www.yemeksepeti.com/restaurant/meej/durumx-meej', '_blank'); } }}
            >
              Şimdi Sipariş Ver
            </Link>
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
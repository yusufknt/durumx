"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useModal } from "@/app/layout";
import VideoBackground from "./VideoBackground";

const Hero = () => {
  const [show, setShow] = useState(false);
  const { setOrderOpen } = useModal();

  const handleOpenOrder = () => {
    setOrderOpen(true);
  };

  const handleOpenOrderKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOrderOpen(true);
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  // Video array for background
  const backgroundVideos = [
    "/videos/doner-preparation.mp4",
    "/videos/hero-video-2.mp4", 
    "/videos/hero-video-3.mp4"
  ];

  return (
    <section
      className="relative w-full h-[80vh] md:h-[93vh] flex flex-col items-center justify-between overflow-hidden rounded-b-3xl shadow-xl border-b-4 border-[#e63946]/10"
      aria-label="DürümX Karşılama Bölümü"
    >
      {/* Video Background */}
      <VideoBackground 
        videos={backgroundVideos} 
        fallbackImage="/durum.png"
      />
      
      {/* Content */}
      <div
        className={`relative z-20 flex flex-col items-center justify-between h-full py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} max-w-2xl mx-auto w-full`}
      >
        {/* Spacer for top */}
        <div></div>
        
        {/* Buttons - Bottom */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            type="button"
            onClick={handleOpenOrder}
            onKeyDown={handleOpenOrderKeyDown}
            className="group relative px-10 py-4 rounded-full text-white font-extrabold text-xl bg-gradient-to-r from-[#ff1a1a] to-[#d62a3a] border-2 border-white/30 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Şimdi Sipariş Ver"
            tabIndex={0}
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-2px]">
              Şimdi Sipariş Ver
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e63946] to-[#c1121f] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
          </button>
          <Link
            href="/urunlerimiz"
            className="group relative px-10 py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/80 text-[#e63946] font-extrabold text-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl"
            aria-label="Menüyü Görüntüle"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/urunlerimiz'; } }}
          >
            <span className="relative z-10 transition-all duration-500 group-hover:text-white">
              Menüyü Görüntüle
            </span>
            <div className="absolute inset-0 bg-[#e63946] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useModal } from "@/providers/ModalProvider";
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

  // Mobilde 4 video - 480p/600kbps optimize versiyonlar (takılma/kasma önleme)
  const mobileVideos = [
    "/videos/mobilvideo4-mobile.webm",
    "/videos/hero-video-mobil-2-mobile.webm",
    "/videos/hero-video-mobil-3-mobile.webm",
    "/videos/hero-video-mobil-1-mobile.webm"
  ];
  
  const desktopVideos = [
    "/videos/video4.webm", // Bursa Görükle yeni şube videosu (desktop)
    "/videos/doner-preparation.webm",
    "/videos/hero-video-2.webm", 
    "/videos/hero-video-3.webm"
  ];

  return (
    <section
      className="relative w-full h-[82vh] md:h-[93vh] flex flex-col items-center justify-between overflow-hidden rounded-b-3xl shadow-xl border-b-4 border-[#e63946]/10"
      aria-label="DürümX Karşılama Bölümü"
    >
      {/* Video Background */}
      <VideoBackground 
        mobileVideos={mobileVideos}
        desktopVideos={desktopVideos}
        fallbackImage="/logo.png"
      />
      
      {/* Content */}
      <div
        className={`relative z-20 flex flex-col items-center justify-start h-full py-4 md:py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} max-w-2xl mx-auto w-full`}
      >
        {/* Video area - mobile için yukarıda */}
        <div className="flex items-start justify-center pt-2 md:hidden">
          <div className="w-full h-56"></div>
        </div>
        
        {/* Buttons - mobile için video altında, web için alt */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-4 w-full justify-center mt-auto md:mt-auto">
          <button
            type="button"
            onClick={handleOpenOrder}
            onKeyDown={handleOpenOrderKeyDown}
            className="group relative px-8 md:px-10 py-3 md:py-4 rounded-full text-white font-extrabold text-base md:text-xl bg-gradient-to-r from-[#ff1a1a] to-[#d62a3a] border-2 border-white/30 backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/60"
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
            className="group relative px-8 md:px-10 py-3 md:py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/80 text-[#e63946] font-extrabold text-base md:text-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl"
            aria-label="Menüyü Görüntüle"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/urunlerimiz'; } }}
          >
            <span className="relative z-10 transition-all duration-500 group-hover:text-white text-center block w-full">
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
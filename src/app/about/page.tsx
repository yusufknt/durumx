"use client";
import { useState, useEffect } from "react";
import { FaLeaf, FaClock, FaUserTie, FaPepperHot } from "react-icons/fa";
import Image from "next/image";

const NEDENLER = [
  { icon: <FaLeaf size={28} className="text-[#38b000]" />, title: "Taze Malzeme", desc: "Her gün taze ve kaliteli ürünler." },
  { icon: <FaClock size={28} className="text-[#e63946]" />, title: "Hızlı Servis", desc: "Siparişiniz dakikalar içinde hazır." },
  { icon: <FaUserTie size={28} className="text-[#ffb703]" />, title: "Usta Şefler", desc: "Deneyimli ve uzman mutfak ekibi." },
  { icon: <FaPepperHot size={28} className="text-[#e63946]" />, title: "Gerçek Hatay Lezzeti", desc: "Otantik ve geleneksel tarifler." },
];

const AboutPage = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-[#fff0e6] via-[#ffe5ec] to-[#f7f7fa] py-16 px-4 flex items-center justify-center">
      <div className={`max-w-5xl w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-[#ececec] flex flex-col md:flex-row items-center md:items-stretch gap-10 p-8 md:p-14 transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Sol: Görsel */}
        <div className={`flex-1 flex items-center justify-center transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '150ms' }}>
          <Image src="/about-placeholder.jpg" alt="DürümX Hakkımızda" width={256} height={256} className="w-64 h-64 object-cover rounded-3xl shadow-xl border-4 border-[#e63946]" />
        </div>
        {/* Sağ: İçerik */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '250ms' }}>
          <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={100} />
          <h2 className="text-4xl font-extrabold mb-4 text-[#e63946] tracking-tight">Hakkımızda</h2>
          <p className="text-lg mb-4 font-medium text-[#22223b]">
            <b>DürümX</b>, Hatay’ın eşsiz sokak lezzetlerini modern bir dokunuşla sunmak için 2024 yılında kuruldu. Amacımız, gerçek Hatay dürümünü ve sokak lezzetlerini en taze ve kaliteli malzemelerle sizlerle buluşturmak. Menüdeki her ürün, ustalarımızın elinden özenle hazırlanır ve Hatay’ın sıcak misafirperverliğini sofralarınıza taşır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="bg-white/80 rounded-xl p-4 flex-1 shadow border border-[#ececec]">
              <span className="font-bold text-[#e63946]">Misyonumuz:</span>
              <span className="block text-sm text-[#22223b] mt-1">Geleneksel Hatay lezzetlerini, hızlı ve kaliteli servisle herkesin ulaşabileceği şekilde sunmak.</span>
            </div>
            <div className="bg-white/80 rounded-xl p-4 flex-1 shadow border border-[#ececec]">
              <span className="font-bold text-[#e63946]">Vizyonumuz:</span>
              <span className="block text-sm text-[#22223b] mt-1">Türkiye’nin dört bir yanında Hatay dürümünün adını duyurmak ve sokak lezzetlerinde öncü olmak.</span>
            </div>
          </div>
          <div className="mt-2 mb-6">
            <h3 className="text-2xl font-bold text-[#e63946] mb-3">Neden DürümX?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NEDENLER.map((n, i) => (
                <div
                  key={n.title}
                  className={`flex items-center gap-3 bg-white/90 rounded-xl p-3 shadow border border-[#ececec] transition-all duration-700
                    ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
                  style={{ transitionDelay: `${350 + i * 100}ms` }}
                >
                  {n.icon}
                  <div>
                    <span className="font-bold text-[#22223b]">{n.title}</span>
                    <div className="text-xs text-[#555]">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-[#e63946]/10 to-[#ffb703]/10 rounded-xl p-4 shadow-inner border border-[#ececec]">
            <span className="italic text-[#22223b] text-base">“Lezzet, kalite ve samimiyet bizim için bir gelenek. Her dürümde Hatay’ın ruhunu yaşatıyoruz.”</span>
            <div className="mt-2 text-right text-[#e63946] font-bold">- Usta Şefimiz</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage; 
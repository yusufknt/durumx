"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const KurumsalPage = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 flex items-center justify-center py-10">
      <section className={`max-w-6xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
        <h1 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
          Kurumsal
        </h1>

        {/* Hakkımızda Bölümü */}
        <div className={`mb-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
          <h2 className="text-3xl font-bold mb-6 text-[#22223b] text-center">Hakkımızda</h2>
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-2xl p-8 border border-[#dee2e6]">
            <p className="text-lg text-[#495057] leading-relaxed text-center max-w-4xl mx-auto">
              DürümX olarak, 2020 yılından bu yana Hatay&apos;ın geleneksel lezzetlerini modern restoran anlayışıyla buluşturuyoruz. 
              Özel baharatlarımız, taze malzemelerimiz ve geleneksel tariflerimizle, müşterilerimize unutulmaz bir gastronomi deneyimi sunuyoruz.
            </p>
          </div>
        </div>

        {/* Misyon & Vizyon Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "200ms" }}>
          {/* Misyon */}
          <div className="bg-gradient-to-br from-[#ff6b6b] to-[#ee5a24] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Misyonumuz
            </h3>
            <p className="text-lg leading-relaxed">
              Geleneksel Hatay mutfağının otantik lezzetlerini, modern restoran standartlarında sunarak, 
              müşterilerimizin damaklarında unutulmaz tatlar bırakmak ve onları tekrar tekrar aramızda görmek.
            </p>
          </div>

          {/* Vizyon */}
          <div className="bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Vizyonumuz
            </h3>
            <p className="text-lg leading-relaxed">
              Türkiye&apos;nin önde gelen geleneksel lezzet zincirlerinden biri olmak ve 
              Hatay mutfağının zengin kültürünü tüm ülkeye yaymak.
            </p>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div className={`mb-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
          <h2 className="text-3xl font-bold mb-8 text-[#22223b] text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌟", title: "Kalite", desc: "En kaliteli malzemeler ve en taze ürünler" },
              { icon: "🤝", title: "Güven", desc: "Müşteri memnuniyeti odaklı hizmet" },
              { icon: "🏛️", title: "Gelenek", desc: "Geleneksel tariflerin korunması" },
              { icon: "💡", title: "İnovasyon", desc: "Modern restoran teknolojileri" }
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-lg border border-[#e9ecef] hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="text-4xl mb-3 text-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#e63946] text-center">{value.title}</h3>
                <p className="text-[#6c757d] text-center">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İstatistikler */}
        <div className={`transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
          <h2 className="text-3xl font-bold mb-8 text-[#22223b] text-center">Rakamlarla DürümX</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "3+", label: "Yıllık Deneyim" },
              { number: "10K+", label: "Mutlu Müşteri" },
              { number: "100%", label: "Taze Malzeme" },
              { number: "24/7", label: "Hizmet Kalitesi" }
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-to-br from-[#ffb703] to-[#fb8500] rounded-xl p-6 text-center text-white shadow-lg">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KurumsalPage;

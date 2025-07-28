"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const MENU_ITEMS = [
  {
    name: "Hatay Usulü Tavuk Dürüm",
    desc: "Özel baharatlı tavuk, çıtır lavaş, bol yeşillik ve Hatay usulü sos.",
    price: "85₺",
    img: "/menu-durum.jpg",
  },
  {
    name: "Hatay Usulü Et Dürüm",
    desc: "Dana eti, közlenmiş biber, sumaklı soğan ve nefis Hatay sosu.",
    price: "110₺",
    img: "/menu-durum2.jpg",
  },
  {
    name: "Hamburger Menü",
    desc: "Ev yapımı burger köftesi, taze sebzeler ve patates kızartması.",
    price: "95₺",
    img: "/menu-burger.jpg",
  },
  {
    name: "Cheeseburger Menü",
    desc: "Çedar peynirli burger, çıtır patates ve özel sos.",
    price: "105₺",
    img: "/menu-cheeseburger.jpg",
  },
  {
    name: "Ayran",
    desc: "Doğal ve serinletici ayran.",
    price: "20₺",
    img: "/menu-ayran.jpg",
  },
  {
    name: "Kola",
    desc: "Buz gibi kola.",
    price: "25₺",
    img: "/menu-kola.jpg",
  },
];

const MenuPage = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleImgClick = (img: string) => setModalImg(img);
  const handleClose = () => setModalImg(null);

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 flex items-center justify-center py-10">
      <section className={`max-w-5xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
        <h2 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>Menü</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {MENU_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className={`bg-white rounded-3xl shadow-2xl p-7 flex flex-col items-center border border-[#ececec] hover:scale-105 hover:shadow-3xl transition-all duration-200
                ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
              style={{ transitionDelay: `${100 + i * 50}ms` }}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={192}
                height={192}
                className="w-48 h-48 object-cover rounded-2xl mb-6 border-4 border-[#ffb703] shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => handleImgClick(item.img)}
                tabIndex={0}
                aria-label={`${item.name} görselini büyüt`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleImgClick(item.img); }}
                loading="lazy"
              />
              <h3 className="text-2xl font-bold mb-2 text-[#e63946]">{item.name}</h3>
              <p className="text-base text-[#22223b] mb-3 text-center">{item.desc}</p>
              <span className="text-xl font-extrabold text-[#38b000]">{item.price}</span>
            </div>
          ))}
        </div>
        {/* Modal */}
        {modalImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={handleClose}>
            <div className="relative max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleClose}
                aria-label="Kapat"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-[#e63946] rounded-full p-2 shadow focus:outline-none"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              <Image src={modalImg || ""} alt="Büyük ürün görseli" width={400} height={400} className="w-full h-auto rounded-2xl shadow-2xl border-4 border-[#ffb703]" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MenuPage; 
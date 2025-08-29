"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: string;
  img: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  variant?: "styled"; // Added variant for styled cards
}

const MENU_ITEMS: MenuItem[] = [
  // DÖNERLER KATEGORİSİ
  {
    id: 1,
    name: "Et Döner",
    desc: "Özel marine edilmiş dana eti, taze sebzeler ve geleneksel soslar ile hazırlanmış.",
    price: "110₺",
    img: "/categories/menu/et-durum.png",
    category: "Dönerler"
  },
  {
    id: 2,
    name: "Tavuk Döner",
    desc: "Özel baharatlı tavuk eti, çıtır lavaş, bol yeşillik ve Hatay usulü sos.",
    price: "95₺",
    img: "/categories/menu/et-durum.png",
    category: "Dönerler"
  },
  {
    id: 3,
    name: "Mix Döner",
    desc: "Et ve tavuk karışımı, özel soslar ile harmanlanmış lezzetli döner.",
    price: "105₺",
    img: "/categories/menu/et-durum.png",
    category: "Dönerler"
  },
  {
    id: 4,
    name: "Köfte Döner",
    desc: "Ev yapımı köfte, taze sebzeler ve özel soslar ile hazırlanmış döner.",
    price: "100₺",
    img: "/categories/menu/kofte-doner.jpg",
    category: "Dönerler"
  },
  {
    id: 5,
    name: "Tavuk Az Kes",
    desc: "Tavuk eti, az miktarda kesilmiş, özel soslar ile hazırlanmış.",
    price: "80₺",
    img: "/categories/menu/tavuk-az-kes.jpg",
    category: "Dönerler"
  },
  {
    id: 6,
    name: "Et Az Kes",
    desc: "Dana eti, az miktarda kesilmiş, özel soslar ile hazırlanmış.",
    price: "95₺",
    img: "/categories/menu/et-az-kes.jpg",
    category: "Dönerler"
  },

  // SERVİSLER KATEGORİSİ
  {
    id: 7,
    name: "Et Döner Porsiyon",
    desc: "Dana eti döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "140₺",
    img: "/categories/menu/et-servis.png",
    category: "Servisler"
  },
  {
    id: 8,
    name: "Tavuk Döner Porsiyon",
    desc: "Tavuk eti döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "125₺",
    img: "/categories/menu/tavuk-servis.png",
    category: "Servisler"
  },
  {
    id: 9,
    name: "Mix Porsiyon",
    desc: "Et ve tavuk karışımı döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "135₺",
    img: "/categories/menu/mix-porisyon.jpg",
    category: "Servisler"
  },
  {
    id: 10,
    name: "Köfte Porsiyon",
    desc: "Ev yapımı köfte, pilav, salata ve özel soslar ile servis edilir.",
    price: "130₺",
    img: "/categories/menu/kofte-porisyon.jpg",
    category: "Servisler"
  },
  {
    id: 11,
    name: "Tavuk İskender",
    desc: "Geleneksel Tavuk İskender, yoğurt, domates sosu ve tereyağı ile.",
    price: "145₺",
    img: "/categories/menu/tavuk-iskender.jpg",
    category: "Servisler"
  },
  {
    id: 12,
    name: "Et İskender",
    desc: "Geleneksel Et İskender, yoğurt, domates sosu ve tereyağı ile.",
    price: "160₺",
    img: "/categories/menu/et-iskender.jpg",
    category: "Servisler"
  },

  // BURGERLER KATEGORİSİ
  {
    id: 13,
    name: "Tavuk Burger",
    desc: "Tavuk göğsü, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "85₺",
    img: "/categories/menu/burger.png",
    category: "Burgerler"
  },
  {
    id: 14,
    name: "Et Burger",
    desc: "Dana eti köftesi, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "95₺",
    img: "/categories/menu/burger.png",
    category: "Burgerler"
  },
  {
    id: 15,
    name: "Mix Burger",
    desc: "Et ve tavuk karışımı köfte, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "90₺",
    img: "/categories/menu/mix-burger.jpg",
    category: "Burgerler"
  },
  {
    id: 16,
    name: "Ekmek Arası Köfte",
    desc: "Ev yapımı köfte, taze sebzeler ve özel soslar ile hazırlanmış ekmek arası.",
    price: "75₺",
    img: "/categories/menu/ekmek-arasi-kofte.jpg",
    category: "Burgerler"
  },

  // ATIŞTIRMALIKLAR KATEGORİSİ
  {
    id: 17,
    name: "Patates Kızartması",
    desc: "Çıtır çıtır patates kızartması, özel baharatlarla hazırlanmış.",
    price: "35₺",
    img: "/categories/menu/atistirmaliklar.png",
    category: "Atıştırmalıklar"
  },

  // İÇECEKLER KATEGORİSİ
  {
    id: 18,
    name: "Ayran",
    desc: "Doğal ve serinletici ayran.",
    price: "20₺",
    img: "/categories/menu/ayran.png",
    category: "İçecekler"
  },
  {
    id: 19,
    name: "Kola",
    desc: "Buz gibi kola.",
    price: "25₺",
    img: "/categories/menu/kola.png",
    category: "İçecekler"
  },

  // ÖZEL TASARIM KARTLAR (Son 3 kart korunuyor)
  {
    id: 20,
    name: "Özel Et Servis",
    desc: "Lezzetli et servisi, özenle hazırlanmış sunum.",
    price: "185₺",
    img: "/categories/menu/et-servis.jpg",
    category: "Servisler",
    variant: "styled"
  },
  {
    id: 21,
    name: "Özel Tavuk Servis",
    desc: "Nefis tavuk servis, sıcak ve taze.",
    price: "155₺",
    img: "/categories/menu/tavuk-servis.png",
    category: "Dönerler",
    variant: "styled"
  },
  {
    id: 22,
    name: "Şefin Önerisi",
    desc: "Şefe özel kombinasyon, doyurucu ve lezzet dolu.",
    price: "210₺",
    img: "/categories/menu/ornek.jpg",
    category: "Burgerler",
    variant: "styled"
  }
];

const CATEGORIES = ["Tümü", "Dönerler", "Servisler", "Burgerler", "İçecekler", "Atıştırmalıklar"];

const UrunlerimizPage = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // URL parametrelerini kontrol et ve kategoriyi otomatik seç
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const kategori = urlParams.get('kategori');
      if (kategori) {
        const categoryMap: { [key: string]: string } = {
          'donerler': 'Dönerler',
          'servisler': 'Servisler',
          'burgerler': 'Burgerler',
          'icecekler': 'İçecekler',
          'atistirmaliklar': 'Atıştırmalıklar'
        };
        const mappedCategory = categoryMap[kategori];
        if (mappedCategory) {
          setSelectedCategory(mappedCategory);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!modalImg) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalImg]);

  const handleClose = () => setModalImg(null);
  const handleImgClick = (img: string) => setModalImg(img);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === "Tümü" || item.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#f8dfe3] via-[#f2f3f5] to-[#fdecef] flex items-center justify-center py-10">
      <section className={`max-w-7xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
          Ürünlerimiz
        </h1>

        {/* Kategori Filtreleri */}
        <div className={`mb-12 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-2xl p-6 border border-[#dee2e6]">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white shadow-lg shadow-[#e63946]/30'
                      : 'bg-white text-[#495057] border border-[#ced4da] hover:bg-[#f8f9fa] hover:border-[#e63946]/50 hover:text-[#e63946]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ürün Sayısı */}
        <div className={`mb-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "150ms" }}>
          <p className="text-center text-[#6c757d]">
            <span className="font-semibold text-[#e63946]">{filteredItems.length}</span> ürün bulundu
            {selectedCategory !== "Tümü" && ` - ${selectedCategory} kategorisinde`}
          </p>
        </div>

        {/* Ürün Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "200ms" }}>
          {filteredItems.map((item, i) => (
            item.variant === "styled" ? (
              <div
                key={item.id}
                className={`group relative rounded-2xl shadow-2xl border border-[#ececec] bg-white transition-transform duration-300 overflow-hidden ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
                style={{ transitionDelay: `${250 + i * 50}ms` }}
                onClick={() => handleImgClick(item.img)}
                tabIndex={0}
                role="button"
                aria-label={`${item.name} görselini büyüt`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleImgClick(item.img); }}
              >
                {/* Background image layer */}
                <div
                  className="absolute inset-0 bg-center bg-cover transition-all duration-300 ease-out group-hover:blur-[3px]"
                  style={{ backgroundImage: `url(${item.img})` }}
                />

                {/* Content overlay (revealed on hover) */}
                <div className="relative z-[2] h-60 sm:h-64 md:h-72 w-full"></div>
 
                {/* Hover Overlay with Description (like before) */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 bottom-12 z-[2] flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full p-4">
                    <p className="text-white text-sm leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                </div>

                {/* Single Glass Bottom Bar */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]">
                  <div className="m-3 rounded-xl bg-white/55 backdrop-blur-md ring-1 ring-white/40 shadow overflow-hidden transition-colors duration-300 group-hover:bg-white/65">
                    <div className="px-3 py-2 flex items-center justify-between gap-2">
                      <span className="max-w-[70%] truncate text-[13px] font-semibold text-[#111827]">{item.name}</span>
                      <span className="text-[13px] font-bold text-[#b91c1c]">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className={`group bg-white rounded-3xl shadow-2xl border border-[#ececec] transition-all duration-500 relative overflow-hidden ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
                style={{ transitionDelay: `${250 + i * 50}ms` }}
                onClick={() => handleImgClick(item.img)}
                tabIndex={0}
                role="button"
                aria-label={`${item.name} görselini büyüt`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleImgClick(item.img); }}
              >
                {/* Photo area container */}
                <div className="relative h-60 sm:h-64 md:h-72">
                  {/* Background image layer (blurs on hover) */}
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-contain transition-all duration-300 ease-out group-hover:blur-[3px]"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  {/* Persistent gradient above photo to avoid pop */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/35 to-transparent z-[2]"></div>
                  {/* Hover description over photo (only text animates) */}
                  <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="absolute inset-x-0 bottom-16 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <p className="text-white text-[13px] sm:text-sm leading-relaxed drop-shadow-md bg-black/35 ring-1 ring-white/10 rounded md:px-2 px-1 md:py-1 py-0.5 inline-block">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Name & Price unified bar over photo */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 z-[3]">
                  <div className="w-full rounded-xl bg-white/55 backdrop-blur-md ring-1 ring-white/40 shadow px-4 py-3 flex items-center justify-between gap-3">
                    <span className="truncate text-[14px] sm:text-[15px] font-semibold text-[#111827]">{item.name}</span>
                    <span className="text-[14px] sm:text-[15px] font-bold text-[#b91c1c]">{item.price}</span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Boş Durum */}
        {filteredItems.length === 0 && (
          <div className={`text-center py-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#6c757d] mb-2">Ürün Bulunamadı</h3>
            <p className="text-[#6c757d]">
              Seçilen kategoride ürün bulunamadı. 
              Farklı bir kategori seçebilirsiniz.
            </p>
          </div>
        )}

        

        {/* Modal (Portal to body for true viewport centering) */}
        {isMounted && modalImg && createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Büyük görsel görüntüleme">
            <div className="relative w-full max-w-4xl max-h-[85vh] mx-4 sm:mx-6 md:mx-8" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleClose}
                aria-label="Kapat"
                className="absolute -top-3 -right-3 sm:top-2 sm:right-2 bg-white/90 hover:bg-white text-[#e63946] rounded-full p-2 shadow focus:outline-none transition-colors duration-200 z-10"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#f3f3f3]">
                <Image
                  src={modalImg || ""}
                  alt="Büyük ürün görseli"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 90vw, 70vw"
                  priority
                />
              </div>
            </div>
          </div>,
          document.body
        )}
      </section>
    </div>
  );
};

export default UrunlerimizPage;


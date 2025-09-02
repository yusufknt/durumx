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
  ingredients: string[];
  isPopular?: boolean;
  isNew?: boolean;
  variant?: "styled";
}

const MENU_ITEMS: MenuItem[] = [
  // DÖNERLER KATEGORİSİ
  {
    id: 1,
    name: "Et Döner",
    desc: "Özel marine edilmiş dana eti, taze sebzeler ve geleneksel soslar ile hazırlanmış.",
    price: "110₺",
    img: "/categories/menu/et-durum.webp",
    category: "Dönerler",
    ingredients: ["Dana eti", "Lavaş", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 2,
    name: "Tavuk Döner",
    desc: "Özel baharatlı tavuk eti, çıtır lavaş, bol yeşillik ve Hatay usulü sos.",
    price: "95₺",
    img: "/categories/menu/et-durum.webp",
    category: "Dönerler",
    ingredients: ["Tavuk eti", "Lavaş", "Domates", "Salatalık", "Soğan", "Marul", "Hatay sosu", "Baharatlar"]
  },
  {
    id: 3,
    name: "Mix Döner",
    desc: "Et ve tavuk karışımı, özel soslar ile harmanlanmış lezzetli döner.",
    price: "105₺",
    img: "/categories/menu/et-durum.webp",
    category: "Dönerler",
    ingredients: ["Dana eti", "Tavuk eti", "Lavaş", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 4,
    name: "Köfte Döner",
    desc: "Ev yapımı köfte, taze sebzeler ve özel soslar ile hazırlanmış döner.",
    price: "100₺",
    img: "/categories/menu/et-durum.webp",
    category: "Dönerler",
    ingredients: ["Ev yapımı köfte", "Lavaş", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 5,
    name: "Zurna Et Döner",
    desc: "Dana eti, özel baharatlarla marine edilmiş, zurna şeklinde sarılmış lezzetli döner.",
    price: "115₺",
    img: "/categories/menu/zurna-doner.webp",
    category: "Dönerler",
    ingredients: ["Dana eti", "Zurna ekmeği", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 6,
    name: "Zurna Tavuk Döner",
    desc: "Tavuk eti, özel baharatlarla marine edilmiş, zurna şeklinde sarılmış lezzetli döner.",
    price: "100₺",
    img: "/categories/menu/zurna-doner.webp",
    category: "Dönerler",
    ingredients: ["Tavuk eti", "Zurna ekmeği", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 7,
    name: "Zurna Mix Döner",
    desc: "Et ve tavuk karışımı, özel soslar ile harmanlanmış, zurna şeklinde sarılmış lezzetli döner.",
    price: "110₺",
    img: "/categories/menu/zurna-doner.webp",
    category: "Dönerler",
    ingredients: ["Dana eti", "Tavuk eti", "Zurna ekmeği", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },


  // SERVİSLER KATEGORİSİ
  {
    id: 9,
    name: "Et Döner Porsiyon",
    desc: "Dana eti döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "140₺",
    img: "/categories/menu/et-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Dana eti döner", "Pilav", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 10,
    name: "Tavuk Döner Porsiyon",
    desc: "Tavuk eti döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "125₺",
    img: "/categories/menu/tavuk-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Tavuk eti döner", "Pilav", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 11,
    name: "Mix Porsiyon",
    desc: "Et ve tavuk karışımı döner, pilav, salata ve özel soslar ile servis edilir.",
    price: "135₺",
    img: "/categories/menu/mix-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Et döner", "Tavuk döner", "Pilav", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 12,
    name: "Köfte Porsiyon",
    desc: "Ev yapımı köfte, pilav, salata ve özel soslar ile hazırlanmış.",
    price: "130₺",
    img: "/categories/menu/köfte-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Ev yapımı köfte", "Pilav", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 13,
    name: "Tavuk İskender",
    desc: "Geleneksel Tavuk İskender, yoğurt, domates sosu ve tereyağı ile.",
    price: "145₺",
    img: "/categories/menu/tavuk-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Tavuk eti", "Yoğurt", "Domates sosu", "Tereyağı", "Pilav", "Baharatlar"]
  },
  {
    id: 14,
    name: "Et İskender",
    desc: "Geleneksel Et İskender, yoğurt, domates sosu ve tereyağı ile.",
    price: "160₺",
    img: "/categories/menu/et-porsiyon.webp",
    category: "Servisler",
    ingredients: ["Dana eti", "Yoğurt", "Domates sosu", "Tereyağı", "Pilav", "Baharatlar"]
  },

  // BURGERLER KATEGORİSİ
  {
    id: 15,
    name: "Tavuk Burger",
    desc: "Tavuk göğsü, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "85₺",
    img: "/categories/menu/tavuk-burger.webp",
    category: "Burgerler",
    ingredients: ["Tavuk göğsü", "Çıtır ekmek", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 16,
    name: "Et Burger",
    desc: "Dana eti köftesi, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "95₺",
    img: "/categories/menu/et-burger.webp",
    category: "Burgerler",
    ingredients: ["Dana eti köftesi", "Çıtır ekmek", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 17,
    name: "Mix Burger",
    desc: "Et ve tavuk karışımı köfte, taze sebzeler, özel sos ve çıtır ekmek ile hazırlanmış burger.",
    price: "90₺",
    img: "/categories/menu/köfte-burger.webp",
    category: "Burgerler",
    ingredients: ["Et köftesi", "Tavuk köftesi", "Çıtır ekmek", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },
  {
    id: 18,
    name: "Ekmek Arası Köfte",
    desc: "Ev yapımı köfte, taze sebzeler ve özel soslar ile hazırlanmış ekmek arası.",
    price: "75₺",
    img: "/categories/menu/köfte-burger.webp",
    category: "Burgerler",
    ingredients: ["Ev yapımı köfte", "Taze ekmek", "Domates", "Salatalık", "Soğan", "Marul", "Özel sos", "Baharatlar"]
  },

  // ATIŞTIRMALIKLAR KATEGORİSİ
  {
    id: 19,
    name: "Patates Kızartması",
    desc: "Çıtır çıtır patates kızartması, özel baharatlarla hazırlanmış.",
    price: "35₺",
    img: "/categories/menu/atistirmaliklar.webp",
    category: "Atıştırmalıklar",
    ingredients: ["Patates", "Zeytinyağı", "Tuz", "Özel baharatlar"]
  },

  // İÇECEKLER KATEGORİSİ
  {
    id: 20,
    name: "Ayran",
    desc: "Doğal ve serinletici ayran.",
    price: "20₺",
    img: "/categories/menu/ayran.webp",
    category: "İçecekler",
    ingredients: ["Doğal yoğurt", "Su", "Tuz"]
  },
  {
    id: 21,
    name: "Kola",
    desc: "Buz gibi kola.",
    price: "25₺",
    img: "/categories/menu/kola.webp",
    category: "İçecekler",
    ingredients: ["Kola", "Buz", "Limon dilimi"]
  }
  ,
  {
    id: 22,
    name: "Fuse Tea Çeşitleri",
    desc: "Şeftali, limon vb. ferahlatıcı soğuk çay seçenekleri.",
    price: "25₺",
    img: "/categories/menu/fuse-tea-cesitleri.webp",
    category: "İçecekler",
    ingredients: ["Şeftali", "Limon", "Buz"]
  }
];



const UrunlerimizPage = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const filteredItems = selectedCategory 
    ? MENU_ITEMS.filter(item => item.category === selectedCategory)
    : [];

  // Kategori seçilmemişse ana sayfa göster
  if (!selectedCategory) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
        </div>

        <section className={`max-w-7xl w-full mx-auto py-8 md:py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="relative mb-8">
              <h1 className="text-3xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent leading-tight turkish-text-fix">
                Ürünlerimiz
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
            </div>
          </div>

          {/* Kategori Grid Layout */}
          <div className={`grid grid-cols-1 lg:grid-cols-9 gap-6 md:gap-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
            
            {/* Sol - Dönerler (biraz daha geniş) */}
            <div className="lg:col-span-2 lg:col-start-2">
              <div 
                className="group relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Dönerler")}
                tabIndex={0}
                role="button"
                aria-label="Dönerler kategorisini görüntüle"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick("Dönerler"); }}
              >
                <Image
                  src="/categories/menu/et-durum.webp"
                  alt="Dönerler"
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Dönerler</h3>
                    <p className="text-sm opacity-90">Geleneksel Lezzet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta - Dikey 3 Kategori (daha geniş) */}
            <div className="lg:col-span-3 space-y-6 md:space-y-9">
              {/* Servisler */}
              <div 
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Servisler")}
                tabIndex={0}
                role="button"
                aria-label="Servisler kategorisini görüntüle"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick("Servisler"); }}
              >
                <Image
                  src="/categories/menu/et-servis.webp"
                  alt="Servisler"
                  fill
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 180px, 200px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Servisler</h3>
                    <p className="text-sm opacity-90">Doyurucu Porsiyonlar</p>
                  </div>
                </div>
              </div>

              {/* Burgerler */}
              <div 
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Burgerler")}
                tabIndex={0}
                role="button"
                aria-label="Burgerler kategorisini görüntüle"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick("Burgerler"); }}
              >
                <Image
                  src="/categories/menu/burger.webp"
                  alt="Burgerler"
                  fill
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 180px, 200px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Burgerler</h3>
                    <p className="text-sm opacity-90">Çıtır Lezzetler</p>
                  </div>
                </div>
              </div>

              {/* İçecekler */}
              <div 
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("İçecekler")}
                tabIndex={0}
                role="button"
                aria-label="İçecekler kategorisini görüntüle"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick("İçecekler"); }}
              >
                <Image
                  src="/categories/menu/ayran.webp"
                  alt="İçecekler"
                  fill
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 180px, 200px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">İçecekler</h3>
                    <p className="text-sm opacity-90">Serinletici İçecekler</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ - Atıştırmalıklar (biraz daha geniş) */}
            <div className="lg:col-span-2">
              <div 
                className="group relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Atıştırmalıklar")}
                tabIndex={0}
                role="button"
                aria-label="Atıştırmalıklar kategorisini görüntüle"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick("Atıştırmalıklar"); }}
              >
                <Image
                  src="/categories/menu/atistirmaliklar.webp"
                  alt="Atıştırmalıklar"
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Atıştırmalıklar</h3>
                    <p className="text-sm opacity-90">Çıtır Lezzetler</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Kategori seçildiğinde ürünleri göster
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      <section className={`max-w-7xl w-full mx-auto py-8 md:py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent">
              {selectedCategory}
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-600">
              {filteredItems.length} ürün bulundu
            </p>
          </div>
          
          <button
            onClick={handleBackToCategories}
            className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
            tabIndex={0}
            aria-label="Kategorilere geri dön"
          >
            ← Kategorilere Dön
          </button>
        </div>

        {/* Ürün Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "200ms" }}>
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/60 transition-all duration-500 relative overflow-hidden hover:shadow-red-500/20 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
              style={{ transitionDelay: `${250 + i * 50}ms` }}
              onClick={() => handleImgClick(item.img)}
              tabIndex={0}
              role="button"
              aria-label={`${item.name} görselini büyüt`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleImgClick(item.img); }}
            >
              {/* Photo area container */}
              <div className="relative h-56 sm:h-60 md:h-72">
                {/* Optimized product image */}
                <Image
                  src={item.img}
                  alt={`${item.name} ürünü`}
                  fill
                  className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading={i < 1 ? "eager" : "lazy"}
                  fetchPriority={i < 1 ? "high" : "auto"}
                  decoding="async"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzIwJyBoZWlnaHQ9JzE4MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjZWVlIi8+PC9zdmc+"
                  quality={75}
                />
                {/* Persistent gradient above photo to avoid pop */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/60 via-white/35 to-transparent z-[2]"></div>
                {/* Hover description over photo (only text animates) */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                  <div className="absolute inset-x-0 bottom-16 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <p className="text-gray-800 text-[13px] sm:text-sm leading-relaxed drop-shadow-md bg-white/90 ring-1 ring-gray-200/20 rounded md:px-2 px-1 md:py-1 py-0.5 inline-block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
              {/* Name bar over photo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 md:p-3 z-[3]">
                <div className="w-full rounded-xl bg-white/90 backdrop-blur-md ring-1 ring-gray-200/60 shadow px-3 md:px-4 py-2 md:py-3 flex items-center justify-center">
                  <span className="truncate text-xs md:text-[15px] font-semibold text-gray-800">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lavaş Seçenekleri - Sadece Dönerler kategorisinde göster */}
        {selectedCategory === "Dönerler" && (
          <div className="mt-8 md:mt-12">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2">Lavaş Seçenekleri</h2>
            </div>
            
            <div className="flex justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-gray-700">Tek Lavaş</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-gray-700">Çift Lavaş</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-gray-700">Üç Lavaş</span>
              </div>
            </div>
          </div>
        )}

        {/* Boş Durum */}
        {filteredItems.length === 0 && (
          <div className={`text-center py-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-600">
              Bu kategoride ürün bulunamadı.
            </p>
          </div>
        )}

        {/* Modal (Portal to body for true viewport centering) */}
        {isMounted && modalImg && createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Ürün detay görüntüleme">
            <div className="relative w-full max-w-6xl max-h-[90vh] mx-4 sm:mx-6 md:mx-8 overflow-y-auto overscroll-contain" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleClose}
                aria-label="Kapat"
                className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 hover:bg-gray-100 text-red-600 rounded-full p-2.5 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-colors duration-200 z-10 border border-gray-200/60"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              
              {/* Modal Content */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Sol - Fotoğraf */}
                  <div className="relative h-[50vh] lg:h-[70vh] bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={modalImg || ""}
                      alt="Ürün görseli"
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  
                  {/* Sağ - Ürün Bilgileri */}
                  <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    {/* Ürün Adı ve Kategori */}
                    <div className="mb-4 md:mb-6">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-3">
                        {filteredItems.find(item => item.img === modalImg)?.name || "Ürün"}
                      </h2>
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                          {filteredItems.find(item => item.img === modalImg)?.category || ""}
                        </span>
                      </div>
                    </div>
                    
                    {/* Ürün Açıklaması */}
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-3">Açıklama</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {filteredItems.find(item => item.img === modalImg)?.desc || ""}
                      </p>
                    </div>
                    
                    {/* İçerik Listesi */}
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4">İçindekiler</h3>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {filteredItems.find(item => item.img === modalImg)?.ingredients?.map((ingredient, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-1.5 md:gap-2 p-2 md:p-3 bg-white/60 rounded-xl border border-gray-200/40 hover:bg-white/80 transition-all duration-200"
                          >
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs md:text-sm font-medium text-gray-700">{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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



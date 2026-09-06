"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MENU_ITEMS } from "@/constants/menu";

export default function MenuGrid() {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kategori = urlParams.get("kategori");
      if (kategori) {
        const categoryMap: { [key: string]: string } = {
          donerler: "Dönerler",
          servisler: "Servisler",
          burgerler: "Burgerler",
          icecekler: "İçecekler",
          atistirmaliklar: "Atıştırmalıklar",
        };
        const mappedCategory = categoryMap[kategori];
        if (mappedCategory) {
          setSelectedCategory(mappedCategory);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (selectedItemId == null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItemId]);

  const handleClose = () => setSelectedItemId(null);
  const handleItemClick = (id: number) => setSelectedItemId(id);
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const filteredItems = selectedCategory
    ? MENU_ITEMS.filter((item) => item.category === selectedCategory)
    : [];

  const selectedItem =
    selectedItemId != null
      ? MENU_ITEMS.find((item) => item.id === selectedItemId) || null
      : null;

  if (!selectedCategory) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
        </div>

        <section
          className={`max-w-7xl w-full mx-auto py-8 md:py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-12 md:mb-16">
            <div className="relative mb-8">
              <h1 className="text-3xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent leading-tight turkish-text-fix">
                Ürünlerimiz
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
            </div>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-9 gap-6 md:gap-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="lg:col-span-2 lg:col-start-2">
              <div
                className="group relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Dönerler")}
                tabIndex={0}
                role="button"
                aria-label="Dönerler kategorisini görüntüle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCategoryClick("Dönerler");
                }}
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

            <div className="lg:col-span-3 space-y-6 md:space-y-9">
              <div
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Servisler")}
                tabIndex={0}
                role="button"
                aria-label="Servisler kategorisini görüntüle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCategoryClick("Servisler");
                }}
              >
                <Image
                  src="/categories/menu/et-porsiyon.webp"
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

              <div
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Burgerler")}
                tabIndex={0}
                role="button"
                aria-label="Burgerler kategorisini görüntüle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCategoryClick("Burgerler");
                }}
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

              <div
                className="group relative h-28 md:h-36 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("İçecekler")}
                tabIndex={0}
                role="button"
                aria-label="İçecekler kategorisini görüntüle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCategoryClick("İçecekler");
                }}
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

            <div className="lg:col-span-2">
              <div
                className="group relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
                onClick={() => handleCategoryClick("Atıştırmalıklar")}
                tabIndex={0}
                role="button"
                aria-label="Atıştırmalıklar kategorisini görüntüle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCategoryClick("Atıştırmalıklar");
                }}
              >
                <Image
                  src="/categories/menu/patates.webp"
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      <section
        className={`max-w-7xl w-full mx-auto py-8 md:py-12 px-4 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
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

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/60 transition-all duration-500 relative overflow-hidden hover:shadow-red-500/20 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
              style={{ transitionDelay: `${250 + i * 50}ms` }}
              onClick={() => handleItemClick(item.id)}
              tabIndex={0}
              role="button"
              aria-label={`${item.name} detaylarını aç`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  handleItemClick(item.id);
              }}
            >
              <div className="relative h-56 sm:h-60 md:h-72">
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
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/60 via-white/35 to-transparent z-[2]"></div>
                <div className="pointer-events-none absolute inset-0 z-[3]">
                  <div className="absolute inset-x-0 bottom-16 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <p className="text-gray-800 text-[13px] sm:text-sm leading-relaxed drop-shadow-md bg-white/90 ring-1 ring-gray-200/20 rounded md:px-2 px-1 md:py-1 py-0.5 inline-block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 md:p-3 z-[3]">
                <div className="w-full rounded-xl bg-white/90 backdrop-blur-md ring-1 ring-gray-200/60 shadow px-3 md:px-4 py-2 md:py-3 flex items-center justify-center">
                  <span className="truncate text-xs md:text-[15px] font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCategory === "Dönerler" && (
          <div className="mt-8 md:mt-12">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-2">
                Lavaş Seçenekleri
              </h2>
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

        {filteredItems.length === 0 && (
          <div
            className={`text-center py-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">
              Ürün Bulunamadı
            </h3>
            <p className="text-gray-600">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}

        {isMounted && selectedItem && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={handleClose}
            />
            <div
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] md:max-h-[85vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full text-gray-800 transition-colors backdrop-blur-md"
                aria-label="Kapat"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="w-full md:w-1/2 relative bg-gray-50 flex-shrink-0 h-48 sm:h-64 md:h-auto">
                <Image
                  src={selectedItem.img}
                  alt={selectedItem.name}
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col overflow-y-auto">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold tracking-wide">
                      {selectedItem.category}
                    </span>
                    {selectedItem.isPopular && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                        ⭐ Popüler
                      </span>
                    )}
                  </div>

                  <h2
                    id="modal-title"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight"
                  >
                    {selectedItem.name}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                    {selectedItem.desc}
                  </p>

                  <div className="mb-6 md:mb-8 bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 md:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      İçindekiler
                    </h3>
                    <ul className="grid grid-cols-2 gap-2 md:gap-3">
                      {selectedItem.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center text-sm md:text-base text-gray-700">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 flex-shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100">
                  <div className="flex items-end justify-between mb-4 md:mb-6">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Fiyat</p>
                      <p className="text-3xl md:text-4xl font-black text-red-600">
                        {selectedItem.price}
                      </p>
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
}

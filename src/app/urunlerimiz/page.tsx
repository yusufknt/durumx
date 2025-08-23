"use client";
import { useState, useEffect } from "react";
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
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Hatay Usulü Tavuk Döner",
    desc: "Özel baharatlı tavuk, çıtır lavaş, bol yeşillik ve Hatay usulü sos.",
    price: "85₺",
    img: "/menu-durum.jpg",
    category: "Dönerler",
    isPopular: true
  },
  {
    id: 2,
    name: "Hatay Usulü Et Döner",
    desc: "Dana eti, közlenmiş biber, sumaklı soğan ve nefis Hatay sosu.",
    price: "110₺",
    img: "/menu-durum2.jpg",
    category: "Dönerler",
    isPopular: true
  },
  {
    id: 3,
    name: "Hamburger Menü",
    desc: "Ev yapımı burger köftesi, taze sebzeler ve patates kızartması.",
    price: "95₺",
    img: "/menu-burger.jpg",
    category: "Burgerler",
    isPopular: true
  },
  {
    id: 4,
    name: "Cheeseburger Menü",
    desc: "Çedar peynirli burger, çıtır patates ve özel sos.",
    price: "105₺",
    img: "/menu-cheeseburger.jpg",
    category: "Burgerler"
  },
  {
    id: 5,
    name: "Ayran",
    desc: "Doğal ve serinletici ayran.",
    price: "20₺",
    img: "/menu-ayran.jpg",
    category: "İçecekler"
  },
  {
    id: 6,
    name: "Kola",
    desc: "Buz gibi kola.",
    price: "25₺",
    img: "/menu-kola.jpg",
    category: "İçecekler"
  },
  {
    id: 7,
    name: "Hatay Usulü Dana Döner",
    desc: "Özel marine edilmiş dana eti, taze sebzeler ve geleneksel soslar.",
    price: "120₺",
    img: "/menu-durum.jpg",
    category: "Dönerler",
    isNew: true
  },
  {
    id: 8,
    name: "Veggie Döner",
    desc: "Taze sebzeler, humus ve özel bitkisel sos ile hazırlanmış vejetaryen döner.",
    price: "75₺",
    img: "/menu-durum2.jpg",
    category: "Dönerler",
    isNew: true
  },
  {
    id: 9,
    name: "Döner Servisi",
    desc: "4 kişilik döner servisi, patates kızartması ve içecekler dahil.",
    price: "280₺",
    img: "/menu-durum.jpg",
    category: "Servisler",
    isPopular: true
  },
  {
    id: 10,
    name: "Burger Servisi",
    desc: "4 kişilik burger servisi, patates kızartması ve içecekler dahil.",
    price: "320₺",
    img: "/menu-burger.jpg",
    category: "Servisler"
  },
  {
    id: 11,
    name: "Patates Kızartması",
    desc: "Çıtır çıtır patates kızartması, özel baharatlarla.",
    price: "35₺",
    img: "/menu-burger.jpg",
    category: "Atıştırmalıklar"
  },
  {
    id: 12,
    name: "Soğan Halkası",
    desc: "Çıtır soğan halkası, ranch sos ile.",
    price: "30₺",
    img: "/menu-burger.jpg",
    category: "Atıştırmalıklar"
  }
];

const CATEGORIES = ["Tümü", "Dönerler", "Servisler", "Burgerler", "İçecekler", "Atıştırmalıklar"];

const UrunlerimizPage = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
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

  const handleImgClick = (img: string) => setModalImg(img);
  const handleClose = () => setModalImg(null);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === "Tümü" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 flex items-center justify-center py-10">
      <section className={`max-w-7xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
        <h1 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
          Ürünlerimiz
        </h1>

        {/* Arama ve Filtreler */}
        <div className={`mb-12 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] rounded-2xl p-6 border border-[#dee2e6]">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Arama */}
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6c757d]">🔍</span>
                </div>
              </div>

              {/* Kategori Filtreleri */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-[#e63946] text-white shadow-lg'
                        : 'bg-white text-[#495057] border border-[#ced4da] hover:bg-[#f8f9fa]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
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
            <div
              key={item.id}
              className={`bg-white rounded-3xl shadow-2xl border border-[#ececec] hover:scale-105 hover:shadow-3xl transition-all duration-200 relative overflow-hidden ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
              style={{ transitionDelay: `${250 + i * 50}ms` }}
            >
              {/* Badge'ler */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {item.isPopular && (
                  <span className="bg-[#ff6b35] text-white px-3 py-1 rounded-full text-xs font-bold">
                    🔥 Popüler
                  </span>
                )}
                {item.isNew && (
                  <span className="bg-[#38b000] text-white px-3 py-1 rounded-full text-xs font-bold">
                    ✨ Yeni
                  </span>
                )}
              </div>

              {/* Kategori Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-[#e63946] text-white px-3 py-1 rounded-full text-xs font-bold">
                  {item.category}
                </span>
              </div>

              {/* Ürün Görseli */}
              <div className="relative">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => handleImgClick(item.img)}
                  tabIndex={0}
                  aria-label={`${item.name} görselini büyüt`}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleImgClick(item.img); }}
                  loading="lazy"
                />
              </div>

              {/* Ürün Bilgileri */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#22223b] line-clamp-2">{item.name}</h3>
                <p className="text-sm text-[#6c757d] mb-4 line-clamp-3">{item.desc}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-[#38b000]">{item.price}</span>
                  <button className="bg-[#e63946] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#d62a3a] transition-colors">
                    🛒 Sipariş Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boş Durum */}
        {filteredItems.length === 0 && (
          <div className={`text-center py-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#6c757d] mb-2">Ürün Bulunamadı</h3>
            <p className="text-[#6c757d]">
              &ldquo;{searchTerm}&rdquo; araması için sonuç bulunamadı. 
              Farklı anahtar kelimeler deneyebilir veya filtreleri değiştirebilirsiniz.
            </p>
          </div>
        )}

        {/* Özel Teklifler */}
        <div className={`mt-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
          <div className="bg-gradient-to-r from-[#fff3e0] to-[#ffe0b2] rounded-2xl p-8 border border-[#ffcc02] text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#f57c00]">Özel Teklifler</h2>
            <p className="text-lg text-[#ef6c00] mb-6">
              Menü kombinasyonlarımızı keşfedin ve özel fiyatlardan yararlanın!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Dürüm + İçecek", price: "95₺", originalPrice: "110₺", discount: "15₺" },
                { name: "Burger + Patates + İçecek", price: "115₺", originalPrice: "140₺", discount: "25₺" },
                { name: "2 Dürüm + 2 İçecek", price: "180₺", originalPrice: "220₺", discount: "40₺" }
              ].map((combo) => (
                <div key={combo.name} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-[#f57c00] mb-2">{combo.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-[#38b000]">{combo.price}</span>
                    <span className="text-sm text-[#6c757d] line-through">{combo.originalPrice}</span>
                  </div>
                  <span className="bg-[#ff6b35] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {combo.discount} İndirim
                  </span>
                </div>
              ))}
            </div>
          </div>
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

export default UrunlerimizPage;

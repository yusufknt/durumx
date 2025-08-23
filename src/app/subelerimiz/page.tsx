"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const BRANCHES = [
  {
    id: 1,
    name: "DürümX İpekyolu Şubesi",
    address: "İpekyolu Mahallesi, Hatay",
    phone: "+90 555 123 4567",
    hours: "09:00 - 23:00",
    features: ["Otopark", "Wi-Fi", "Teras"],
    coordinates: { lat: 36.2023, lng: 36.1613 },
    image: "/about-placeholder.jpg"
  },
  {
    id: 2,
    name: "DürümX Merkez Şubesi",
    address: "Merkez Mahallesi, Hatay",
    phone: "+90 555 987 6543",
    hours: "08:00 - 24:00",
    features: ["Drive-thru", "Wi-Fi", "Çocuk Oyun Alanı"],
    coordinates: { lat: 36.2023, lng: 36.1613 },
    image: "/hero-placeholder.jpg"
  },
  {
    id: 3,
    name: "DürümX Üniversite Şubesi",
    address: "Üniversite Mahallesi, Hatay",
    phone: "+90 555 456 7890",
    hours: "10:00 - 22:00",
    features: ["Öğrenci İndirimi", "Wi-Fi", "Çalışma Alanı"],
    coordinates: { lat: 36.2023, lng: 36.1613 },
    image: "/about-placeholder.jpg"
  }
];

const SubelerimizPage = () => {
  const [show, setShow] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<typeof BRANCHES[0] | null>(null);
  
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleBranchClick = (branch: typeof BRANCHES[0]) => {
    setSelectedBranch(branch);
  };

  const handleCloseModal = () => {
    setSelectedBranch(null);
  };

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 flex items-center justify-center py-10">
      <section className={`max-w-6xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
        <h1 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
          Şubelerimiz
        </h1>

        {/* Genel Bilgi */}
        <div className={`mb-12 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
          <div className="bg-gradient-to-r from-[#e3f2fd] to-[#bbdefb] rounded-2xl p-8 border border-[#90caf9] text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#1565c0]">Tüm Şubelerimizde Aynı Kalite!</h2>
            <p className="text-lg text-[#1976d2]">
              Hatay'ın farklı noktalarında hizmet veren şubelerimizde, 
              geleneksel lezzetlerimizi aynı kalitede sunuyoruz.
            </p>
          </div>
        </div>

        {/* Şube Kartları */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "200ms" }}>
          {BRANCHES.map((branch, index) => (
            <div
              key={branch.id}
              className={`bg-white rounded-2xl shadow-xl border border-[#e9ecef] hover:shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => handleBranchClick(branch)}
              tabIndex={0}
              aria-label={`${branch.name} detaylarını görüntüle`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleBranchClick(branch);
                }
              }}
            >
              <div className="relative">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-t-2xl"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#e63946] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {branch.id === 1 ? "Ana Şube" : "Şube"}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#22223b]">{branch.name}</h3>
                <div className="space-y-2 text-[#6c757d]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e63946]">📍</span>
                    <span className="text-sm">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e63946]">📞</span>
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e63946]">🕒</span>
                    <span className="text-sm">{branch.hours}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {branch.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-[#f8f9fa] text-[#495057] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Harita Bilgisi */}
        <div className={`transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "600ms" }}>
          <div className="bg-gradient-to-r from-[#fff3e0] to-[#ffe0b2] rounded-2xl p-8 border border-[#ffcc02] text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#f57c00]">Harita ve Konum</h2>
            <p className="text-lg text-[#ef6c00] mb-4">
              Tüm şubelerimizin konumlarını haritada görebilir, 
              size en yakın şubeyi bulabilirsiniz.
            </p>
            <div className="bg-[#f57c00] text-white px-6 py-3 rounded-full inline-block font-bold hover:bg-[#ef6c00] transition-colors cursor-pointer">
              🗺️ Haritayı Aç
            </div>
          </div>
        </div>

        {/* Şube Detay Modal */}
        {selectedBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
            <div className="relative max-w-2xl w-full mx-4 bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleCloseModal}
                aria-label="Kapat"
                className="absolute top-4 right-4 bg-[#e63946] text-white rounded-full p-2 hover:bg-[#d62a3a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e63946]/60"
              >
                <span className="text-xl font-bold">&times;</span>
              </button>
              
              <div className="p-8">
                <Image
                  src={selectedBranch.image}
                  alt={selectedBranch.name}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                <h2 className="text-2xl font-bold mb-4 text-[#22223b]">{selectedBranch.name}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <div className="font-semibold text-[#22223b]">Adres</div>
                        <div className="text-[#6c757d]">{selectedBranch.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <div className="font-semibold text-[#22223b]">Telefon</div>
                        <div className="text-[#6c757d]">{selectedBranch.phone}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🕒</span>
                      <div>
                        <div className="font-semibold text-[#22223b]">Çalışma Saatleri</div>
                        <div className="text-[#6c757d]">{selectedBranch.hours}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-semibold text-[#22223b]">Özellikler</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedBranch.features.map((feature) => (
                            <span
                              key={feature}
                              className="bg-[#e63946] text-white px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#e63946] text-white py-3 rounded-xl font-bold hover:bg-[#d62a3a] transition-colors">
                    📞 Ara
                  </button>
                  <button className="flex-1 bg-[#38b000] text-white py-3 rounded-xl font-bold hover:bg-[#2d8f00] transition-colors">
                    🚗 Yol Tarifi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SubelerimizPage;

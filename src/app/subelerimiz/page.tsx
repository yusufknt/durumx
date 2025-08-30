"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import type * as Leaflet from "leaflet";

// React-Leaflet bileşenleri SSR devre dışı dinamik import
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

const useRevealOnScroll = () => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.revealId;
          if (!id) return;
          if (entry.isIntersecting) {
            setRevealed((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const register = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  return { revealed, register } as const;
};

type Branch = {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  services: Array<"paket" | "gel-al" | "masa">;
  hours: string;
  mapsUrl: string;
  lat: number;
  lng: number;
};

const ShinyButton: React.FC<{ href: string; label: string; ariaLabel: string }> = ({ href, label, ariaLabel }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    tabIndex={0}
    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-6 py-3 text-white text-sm font-bold shadow-2xl outline-none transition-all duration-300 hover:scale-105 hover:shadow-red-500/25 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 focus-visible:ring-offset-gray-900 overflow-hidden"
  >
    <span className="relative z-10">{label}</span>
    <svg fill="currentColor" viewBox="0 0 24 24" className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
      <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </a>
);

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  return (
    <article
      role="article"
      aria-label={`${branch.name} şubesi kartı`}
      tabIndex={0}
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-600/50"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">{branch.name}</h3>
        <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">Açık</span>
      </div>
      
      <p className="text-gray-300 mb-4 leading-relaxed">{branch.address}</p>
      
      <div className="flex flex-wrap gap-3">
        <a
          href={branch.mapsUrl}
          aria-label={`${branch.name} haritada aç`}
          tabIndex={0}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          Haritada Gör
        </a>
        <a
          href={`tel:${branch.phone}`}
          aria-label={`${branch.name} paket servis için ara`}
          tabIndex={0}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-white text-sm font-bold shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.086c.977 0 1.84.63 2.135 1.563l.662 2.087c.262.826-.06 1.726-.78 2.217l-1.19.81c.852 1.73 2.237 3.115 3.967 3.967l.81-1.19c.491-.72 1.391-1.042 2.217-.78l2.087.662c.933.295 1.563 1.158 1.563 2.135V19.5c0 1.243-1.007 2.25-2.25 2.25h-1.5C8.593 21.75 2.25 15.407 2.25 7.5v-0.75z" />
          </svg>
          Ara
        </a>
      </div>
    </article>
  );
};

// Harita: şubeleri logo ikonuyla gösteren interaktif bileşen
const InteractiveBranchesMap: React.FC<{ branches: Branch[]; activeCity?: string }> = ({ branches, activeCity }) => {
  const [leaflet, setLeaflet] = useState<null | typeof Leaflet>(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("leaflet");
        if (!mounted) return;
        setLeaflet(mod.default ?? mod);
      } catch (error) {
        console.error("Leaflet yüklenirken hata:", error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Map container'ı yeniden oluşturmak için key değiştir
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [branches.length]);

  // Basit icon kullan (DivIcon yerine)
  const simpleIcon = useMemo(() => {
    if (!leaflet) return null;
    return leaflet.icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="white" stroke="#dc2626" stroke-width="2"/>
          <circle cx="20" cy="20" r="12" fill="#dc2626"/>
        </svg>
      `),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  }, [leaflet]);

  // Map'i bounds'a oturtan yardımcı bileşen
  const FitToBounds: React.FC<{ branches: Branch[]; activeCity?: string }> = ({ branches, activeCity }) => {
    const map = useMap();
    
    useEffect(() => {
      if (!leaflet || !map) return;
      
      try {
        if (branches.length === 0) {
          map.setView([39.0, 35.0], 6);
          return;
        }

        // Varsayılan: şehir filtresi boşsa Van'a odaklan
        if (!activeCity) {
          const vanBranches = branches.filter((b) => b.city === "Van");
          if (vanBranches.length > 0) {
            const vanBounds = leaflet.latLngBounds(vanBranches.map((b) => [b.lat, b.lng]) as [number, number][]);
            map.fitBounds(vanBounds, { padding: [24, 24], maxZoom: 13 });
            return;
          }
        }

        // Aksi halde mevcut branch listesine sığdır
        const latLngs = branches.map((b) => [b.lat, b.lng]) as [number, number][];
        const nextBounds = leaflet.latLngBounds(latLngs);
        map.fitBounds(nextBounds, { padding: [24, 24], maxZoom: 14 });
      } catch (error) {
        console.error("Map bounds ayarlanırken hata:", error);
        // Fallback: merkez koordinatları
        map.setView([38.495, 43.38], 12);
      }
    }, [map, branches, activeCity, leaflet]);
    
    return null;
  };

  // Harita yüklenemezse fallback göster
  if (!leaflet) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-lg">
        <div className="text-center text-gray-300">
          <div className="text-lg font-semibold mb-2">Harita Yükleniyor...</div>
          <div className="text-sm">Lütfen bekleyin</div>
        </div>
      </div>
    );
  }

  return (
    <div role="region" aria-label="DürümX şubeler haritası" className="h-full w-full">
      <MapContainer
        key={mapKey}
        className="h-full w-full"
        center={[38.495, 43.38]}
        zoom={12}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitToBounds branches={branches} activeCity={activeCity} />
        
        {simpleIcon && branches.map((b) => (
          <Marker 
            key={`${b.id}-${mapKey}`} 
            position={[b.lat, b.lng]} 
            icon={simpleIcon}
          >
            <Popup>
              <div className="space-y-1 p-2">
                <div className="font-bold text-sm text-gray-900">{b.name}</div>
                <div className="text-xs text-gray-600">{b.address}</div>
                <a 
                  href={`tel:${b.phone}`} 
                  className="text-xs text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  Ara: {b.phone}
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const SubelerimizPage = () => {
  const { revealed, register } = useRevealOnScroll();

  const allBranches = useMemo<Branch[]>(
    () => [
      {
        id: "dx-kadikoy",
        name: "DürümX Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        address: "Moda Mah. Caferağa Sk. No:12 Kadıköy / İstanbul",
        phone: "+902122223344",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 01:00",
        mapsUrl: "https://maps.google.com",
        lat: 40.9902,
        lng: 29.0271,
      },
      {
        id: "dx-uskudar",
        name: "DürümX Üsküdar",
        city: "İstanbul",
        district: "Üsküdar",
        address: "Selamiali Mah. Çamlıca Cd. No:7 Üsküdar / İstanbul",
        phone: "+902123334455",
        services: ["paket", "gel-al"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com",
        lat: 41.0227,
        lng: 29.023,
      },
      {
        id: "dx-ankara-cankaya",
        name: "DürümX Çankaya",
        city: "Ankara",
        district: "Çankaya",
        address: "Atatürk Bul. No:45 Çankaya / Ankara",
        phone: "+903123334455",
        services: ["paket", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com",
        lat: 39.9099,
        lng: 32.853,
      },
      {
        id: "dx-izmir-karsiyaka",
        name: "DürümX Karşıyaka",
        city: "İzmir",
        district: "Karşıyaka",
        address: "İnönü Cd. No:9 Karşıyaka / İzmir",
        phone: "+902324445566",
        services: ["gel-al", "masa"],
        hours: "11:00 - 00:00",
        mapsUrl: "https://maps.google.com",
        lat: 38.455,
        lng: 27.1097,
      },
      {
        id: "dx-van-merkez-1",
        name: "DürümX Van Merkez - İskele Cd.",
        city: "Van",
        district: "İpekyolu",
        address: "İskele Cd. No:25 İpekyolu / Van",
        phone: "+904322001001",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com",
        lat: 38.4965,
        lng: 43.3835,
      },
      {
        id: "dx-van-merkez-2",
        name: "DürümX Van Merkez - Cumhuriyet Cd.",
        city: "Van",
        district: "İpekyolu",
        address: "Cumhuriyet Cd. No:66 İpekyolu / Van",
        phone: "+904322001002",
        services: ["paket", "gel-al"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com",
        lat: 38.4942,
        lng: 43.378,
      },
      {
        id: "dx-van-edremit",
        name: "DürümX Van Edremit",
        city: "Van",
        district: "Edremit",
        address: "Yeni Mah. Sahil Yolu No:5 Edremit / Van",
        phone: "+904322001003",
        services: ["paket", "masa"],
        hours: "11:00 - 23:30",
        mapsUrl: "https://maps.google.com",
        lat: 38.4525,
        lng: 43.33,
      },
    ],
    []
  );

  const cities = useMemo(() => Array.from(new Set(allBranches.map((b) => b.city))), [allBranches]);
  const districtsByCity = useMemo(() => {
    const map = new Map<string, string[]>();
    allBranches.forEach((b) => {
      const arr = map.get(b.city) ?? [];
      if (!arr.includes(b.district)) arr.push(b.district);
      map.set(b.city, arr);
    });
    return map;
  }, [allBranches]);

  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [service, setService] = useState<"paket" | "gel-al" | "masa" | "">("");

  const filtered = useMemo(() => {
    return allBranches.filter((b) => {
      const matchesSearch = `${b.name} ${b.city} ${b.district} ${b.address}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      if (!matchesSearch) return false;
      if (city && b.city !== city) return false;
      if (district && b.district !== district) return false;
      if (service && !b.services.includes(service)) return false;
      return true;
    });
  }, [allBranches, search, city, district, service]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Şubelerimiz
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
            </div>
            
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed">
              Türkiye&apos;nin dört bir yanında hizmet veren DürümX şubelerimizi keşfedin
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section 
        ref={register("filters")} 
        data-reveal-id="filters" 
        className={`transition-all duration-1000 ease-out ${
          revealed["filters"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 p-6 md:p-8 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Şube Arama ve Filtreleme
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-gray-300">Arama</span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Şube adı, adres..."
                    aria-label="Şube arama"
                    className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </label>
                
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-gray-300">Şehir</span>
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setDistrict("");
                    }}
                    aria-label="Şehir seç"
                    className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-gray-200 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Tümü</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-gray-300">İlçe</span>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    aria-label="İlçe seç"
                    className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-gray-200 outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="">Tümü</option>
                    {(districtsByCity.get(city || cities[0]) ?? []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section 
        ref={register("grid")} 
        data-reveal-id="grid" 
        className={`transition-all duration-1000 ease-out ${
          revealed["grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              {filtered.length} Şube Bulundu
            </h2>
            {(city || district || service || search) && (
              <button
                type="button"
                aria-label="Filtreleri temizle"
                className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors duration-300"
                onClick={() => {
                  setSearch("");
                  setCity("");
                  setDistrict("");
                  setService("");
                }}
              >
                Filtreleri Temizle
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => (
              <BranchCard key={b.id} branch={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={register("map")} 
        data-reveal-id="map" 
        className={`transition-all duration-1000 ease-out ${
          revealed["map"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-4">
              İnteraktif Harita
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Şubelerimizin konumlarını haritada görüntüleyin
            </p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl">
            <div className="aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9] w-full">
              <InteractiveBranchesMap branches={filtered} activeCity={city} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={register("cta")} 
        data-reveal-id="cta" 
        className={`transition-all duration-1000 ease-out ${
          revealed["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.4),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Yeni Şube Öneriniz Var mı?
              </h3>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
                Bulunduğunuz bölgede DürümX görmek ister misiniz? Bize yazın, değerlendirelim.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <ShinyButton href="/contact" label="Önerini Paylaş" ariaLabel="İletişim sayfasına git" />
                <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise bilgi sayfasına git" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubelerimizPage;



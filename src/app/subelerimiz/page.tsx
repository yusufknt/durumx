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

interface RevealState {
  [key: string]: boolean;
}

interface RefMap {
  [key: string]: HTMLElement | null;
}


interface Branch {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  phone2?: string;
  services: Array<"paket" | "gel-al" | "masa">;
  hours: string;
  mapsUrl: string;
  lat: number;
  lng: number;
}

const useRevealOnScroll = () => {
  const [revealed, setRevealed] = useState<RevealState>({});
  const refs = useRef<RefMap>({});

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

const ShinyButton: React.FC<{ href: string; label: string; ariaLabel: string }> = ({ href, label, ariaLabel }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    tabIndex={0}
    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-6 py-3 text-white text-sm font-bold shadow-lg outline-none transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 focus-visible:ring-offset-white overflow-hidden"
  >
    <span className="relative z-10">{label}</span>
    <svg fill="currentColor" viewBox="0 0 24 24" className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1">
      <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
  </a>
);

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  return (
    <article
      role="article"
      aria-label={`${branch.name} şubesi kartı`}
      tabIndex={0}
      className="group relative bg-gradient-to-br from-white/95 to-gray-50/90 border border-gray-200/40 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-300/60"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{branch.name}</h3>
        <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">Açık</span>
      </div>
      
      <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">{branch.address}</p>
      
      <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.086c.977 0 1.84.63 2.135 1.563l.662 2.087c.262.826-.06 1.726-.78 2.217l-1.19.81c.852 1.73 2.237 3.115 3.967 3.967l.81-1.19c.491-.72 1.391-1.042 2.217-.78l2.087.662c.933.295 1.563 1.158 1.563 2.135V19.5c0 1.243-1.007 2.25-2.25 2.25h-1.5C8.593 21.75 2.25 15.407 2.25 7.5v-0.75z" />
          </svg>
          <span>{branch.phone}</span>
          {branch.phone2 && branch.phone2 !== branch.phone && (
            <span className="text-gray-400">/ {branch.phone2}</span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-3">
        <a
          href={branch.mapsUrl}
          aria-label={`${branch.name} haritada aç`}
          tabIndex={0}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200"
        >
          Haritada Gör
        </a>
        <a
          href={`tel:${branch.phone}`}
          aria-label={`${branch.name} paket servis için ara`}
          tabIndex={0}
          className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-red-600 px-4 md:px-5 py-1.5 md:py-2 text-white text-xs md:text-sm font-bold shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
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
const InteractiveBranchesMap: React.FC<{ branches: Branch[] }> = ({ branches }) => {
  const [leaflet, setLeaflet] = useState<null | typeof Leaflet>(null);
  const [mapKey, setMapKey] = useState(0);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("leaflet");
        if (!mounted) return;
        setLeaflet(mod.default ?? mod);
      } catch (error) {
        console.error("Leaflet yüklenirken hata:", error);
        setMapError("Leaflet kütüphanesi yüklenemedi.");
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
  const FitToBounds: React.FC<{ branches: Branch[] }> = ({ branches }) => {
    const map = useMap();
    
    useEffect(() => {
      if (!leaflet || !map) return;
      
      try {
        if (branches.length === 0) {
          map.setView([39.0, 35.0], 6);
          return;
        }

        // Varsayılan: Tüm şubelere odaklan
        if (branches.length > 0) {
          const allBounds = leaflet.latLngBounds(branches.map((b) => [b.lat, b.lng]) as [number, number][]);
          map.fitBounds(allBounds, { padding: [24, 24], maxZoom: 12 });
          return;
        }

        // Aksi halde mevcut branch listesine sığdır
        const latLngs = branches.map((b) => [b.lat, b.lng]) as [number, number][];
        const nextBounds = leaflet.latLngBounds(latLngs);
        map.fitBounds(nextBounds, { padding: [24, 24], maxZoom: 14 });
      } catch (error) {
        console.error("Map bounds ayarlanırken hata:", error);
        // Fallback: merkez koordinatları (Van-Bitlis arası)
        map.setView([38.45, 42.8], 10);
      }
    }, [map, branches]);
    
    return null;
  };

  // Harita yüklenemezse fallback göster
  if (mapError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-600">
          <div className="text-lg font-semibold mb-2">Harita Yüklenemedi</div>
          <div className="text-sm">{mapError}</div>
        </div>
      </div>
    );
  }

  if (!leaflet) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
        <div className="text-center text-gray-600">
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-lg font-semibold mb-2 text-gray-700">Harita Yükleniyor...</div>
          <div className="text-sm text-gray-500">Şubelerimiz haritaya yerleştiriliyor</div>
        </div>
      </div>
    );
  }

  return (
    <div role="region" aria-label="DürümX şubeler haritası" className="h-full w-full">
      <MapContainer
        key={mapKey}
        className="h-full w-full"
        center={[38.45, 42.8]}
        zoom={10}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitToBounds branches={branches} />
        
        {simpleIcon && branches.map((b) => (
          <Marker 
            key={`${b.id}-${mapKey}`} 
            position={[b.lat, b.lng]} 
            icon={simpleIcon}
          >
            <Popup>
              <div className="space-y-2 p-3 min-w-[200px]">
                <div className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">{b.name}</div>
                <div className="text-xs text-gray-600 mb-2">{b.address}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {b.hours}
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`tel:${b.phone}`} 
                    className="text-xs text-red-600 font-semibold hover:text-red-700 transition-colors bg-red-50 px-2 py-1 rounded"
                  >
                    📞 {b.phone}
                  </a>
                  <a 
                    href={b.mapsUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors bg-blue-50 px-2 py-1 rounded"
                  >
                    🗺️ Harita
                  </a>
                </div>
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
        id: "dx-van-merkez-bahcivan",
        name: "Van Merkez Dürümx Şube",
        city: "Van",
        district: "Merkez",
        address: "Bahçıvan Mahallesi, Yüzbaşıoğlu Sokak No:65, 65130 İpekyolu/Van",
        phone: "0432 215 15 55",
        phone2: "0432 214 15 55",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.492,43.383&z=17&t=m",
        lat: 38.492,
        lng: 43.383,
      },
      {
        id: "dx-bitlis-tatvan",
        name: "Tatvan Dürümx Şube",
        city: "Bitlis",
        district: "Tatvan",
        address: "Aydınlar Mahallesi Cumhuriyet Caddesi 156/1A  Tatvan/Bitlis",
        phone: "0434 827 0077",
        phone2: "0434 827 0077",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.502,42.298&z=17&t=m",
        lat: 38.502,
        lng: 42.298,
      },
      {
        id: "dx-van-caldiran",
        name: "Çaldıran Dürümx Şube",
        city: "Van",
        district: "Çaldıran",
        address: "Recep Tayyip Erdoğan Mahallesi Azerbeycan Caddesi Yıldırım İş Hanı No:3 Çaldıran/Van",
        phone: "0546 181 15 64",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=39.148,43.652&z=17&t=m",
        lat: 39.148,
        lng: 43.652,
      },
      {
        id: "dx-bitlis-merkez",
        name: "Bitlis Dürümx Şubesi",
        city: "Bitlis",
        district: "Merkez",
        address: "Hüsrevpaşa Mahallesi Ahmet Eren Bulvarı Merkez/Bitlis",
        phone: "0434 228 80 13",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.401,42.108&z=17&t=m",
        lat: 38.401,
        lng: 42.108,
      },
      {
        id: "dx-van-edremit",
        name: "Van Edremit Dürümx Şube",
        city: "Van",
        district: "Edremit",
        address: "Erdemkent Mah. Eski Toki Yolu Ayrımı 3A Edremit/Van",
        phone: "0534 054 15 20",
        
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.452,43.328&z=17&t=m",
        lat: 38.452,
        lng: 43.328,
      },

      {
        id: "dx-bitlis-merkez-2",
        name: "Eren Üniversitesi Dürümx Şube",
        city: "Bitlis",
        district: "Merkez",
        address: "Beşminare Mahallesi Ahmet Eren Bulvarı Nova İş Merkezi No:334 Bitlis",
        phone: "0543 866 79 60",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.408,42.115&z=17&t=m",
        lat: 38.408,
        lng: 42.115,
      },
      {
        id: "dx-hakkari-cukurca",
        name: "Hakkari Çukurca Dürümx Şube",
        city: "Hakkâri",
        district: "Çukurca",
        address: "Emir Şaban Mahallesi Cumhuriyet Caddesi 48/B Çukurca/Hakkâri",
        phone: "0532 171 24 98",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=37.198,43.602&z=17&t=m",
        lat: 37.198,
        lng: 43.602,
      },
      {
        id: "dx-van-tusba-kalecik",
        name: "Kalecik Dürümx Şube",
        city: "Van",
        district: "Tuşba",
        address: "Kalecik Mahallesi 902. Sokak No:6/1 Tuşba/Van",
        phone: "0552 888 01 65",
      
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.518,43.418&z=17&t=m",
        lat: 38.518,
        lng: 43.418,
      },

      {
        id: "dx-van-gurpinar",
        name: "Gürpınar Dürümx Şube",
        city: "Van",
        district: "Gürpınar",
        address: "Akpınar Mahallesi Milli Egemenlik Caddesi Donat İş Merkezi No:12 Gürpınar / Van",
        phone: "0531 665 78 68",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.322,43.278&z=17&t=m",
        lat: 38.322,
        lng: 43.278,
      },
      {
        id: "dx-van-organize",
        name: "Organize Dürümx Şube",
        city: "Bitlis",
        district: "-",
        address: "Şemsibey Mahallesi Osb Kavşağı Anadolu Plaza No:5 Tuşba/Van",
        phone: "0432 504 15 55",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.478,43.348&z=17&t=m",
        lat: 38.478,
        lng: 43.348,
      },
      {
        id: "dx-van-iskele",
        name: "Van İskele Dürümx Şube",
        city: "Van",
        district: "İpekyolu",
        address: "Alipaşa Mahallesi İskele Caddesi No:69/4 İpekyolu/Van",
        phone: "0553 523 65 25",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=38.508,43.408&z=17&t=m",
        lat: 38.508,
        lng: 43.408,
      },
      {
        id: "dx-hakkari-derecik",
        name: "Hakkari Derecik",
        city: "Hakkari",
        district: "-",
        address: "Derecik Hastane Caddesi",
        phone: "0536 516 31 31",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://maps.google.com/maps?q=37.248,44.618&z=17&t=m",
        lat: 37.248,
        lng: 44.618,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/3 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <h1 className="text-3xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent">
                Şubelerimiz
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent blur-3xl" />
            </div>
            
            <p className="mt-6 max-w-3xl text-base md:text-xl text-gray-600 leading-relaxed">
              Türkiye&apos;nin dört bir yanında hizmet veren DürümX şubelerimizi keşfedin
            </p>
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
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
          <div className="mb-4 md:mb-6">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
              Tüm Şubelerimiz
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allBranches.map((b) => (
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
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
              İnteraktif Şube Haritası
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-3xl mx-auto">
              Tüm DürümX şubelerimizin konumlarını interaktif haritada keşfedin. Her işaretçiye tıklayarak şube bilgilerini görüntüleyebilir, telefon ile arayabilir veya haritada açabilirsiniz.
            </p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden border border-gray-200/40 shadow-lg bg-gradient-to-br from-white/95 to-gray-50/90">
            <div className="aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9] w-full">
              <InteractiveBranchesMap branches={allBranches} />
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
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-white/95 to-gray-50/90 border border-gray-200/40 p-6 md:p-12 shadow-lg overflow-hidden">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
                Yeni Şube Öneriniz Var mı?
              </h3>
              <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
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


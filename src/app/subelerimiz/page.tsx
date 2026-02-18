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
        id: "dx-bursa-gorukle",
        name: "Bursa Görükle Dürümx Şube",
        city: "Bursa",
        district: "Görükle",
        address: "Dumlupınar Mah. Pamukkale Cad. Adapark Sitesi B Blok No:38 Nilüfer / Bursa",
        phone: "0540 538 78 69",
        services: ["paket", "gel-al", "masa"],
        hours: "10:00 - 00:00",
        mapsUrl: "https://www.google.com/maps/place/Dumlupınar,+Pamukkale+Cd.,+16120+Nilüfer%2FBursa/@40.2020694,28.8742647,17z/data=!3m1!4b1!4m6!3m5!1s0x14ca1557c1ea5a01:0x7e8f3e8f9e8f9e8f!8m2!3d40.2020694!4d28.8768396!16s%2Fg%2F11bw3y8y8y?entry=ttu",
        lat: 40.2020694,
        lng: 28.8768396,
      },
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
        mapsUrl: "https://www.google.com/maps/place/Bah%C3%A7%C4%B1van,+Y%C3%BCzba%C5%9F%C4%B1o%C4%9Flu+Sk.+No:65,+65130+Van+Merkez%2FVan/@38.4990467,43.3898086,17z/data=!3m1!4b1!4m6!3m5!1s0x4012706aa8fea51f:0xf216aa73f2a064f!8m2!3d38.4990425!4d43.3923889!16s%2Fg%2F11hb6_df6j?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.4990425,
        lng: 43.3923889,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%9CR%C3%9CMX/@38.4993669,42.2784256,17z/data=!3m1!4b1!4m6!3m5!1s0x400d3eb35a2e0567:0xa4b023bbbdfbccd0!8m2!3d38.4993628!4d42.2832911!16s%2Fg%2F11cs264yj7?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.4993628,
        lng: 42.2832911,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%BCr%C3%BCmx+Hatay+D%C3%B6neri/@39.1255275,43.8722089,12.6z/data=!4m6!3m5!1s0x40136dd1302ebfbb:0xce2f797cf1a7a362!8m2!3d39.1337537!4d43.900883!16s%2Fg%2F11tk1zdky8?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 39.1337537,
        lng: 43.900883,
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
        mapsUrl: "https://www.google.com/maps/place/Be%C5%9F+Minare,+Ahmet+Eren+Blv,+13002+Bitlis+Merkez%2FBitlis/@38.4740832,42.1614195,19.52z/data=!4m6!3m5!1s0x400d3ad8c206813f:0x648788c9cab33d4a!8m2!3d38.4739499!4d42.1618737!16s%2Fg%2F11k3d5j3_q?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.4739499,
        lng: 42.1618737,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%BCr%C3%BCmx/@38.4174276,43.2613206,17z/data=!3m1!4b1!4m6!3m5!1s0x400d8973da621809:0x412814fd31b55729!8m2!3d38.4174235!4d43.2661861!16s%2Fg%2F11fj7fsd4j?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.4174235,
        lng: 43.2661861,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%9CR%C3%9CMX+%C3%BCniversite/@38.4734972,42.1500606,15.48z/data=!4m10!1m2!2m1!1zZXJlbiDDvG5pdmVyc2l0ZXNpIGTDvHLDvG14!3m6!1s0x400d3be87f17b9fb:0x958992aed17258db!8m2!3d38.4787987!4d42.1656202!15sChtlcmVuIMO8bml2ZXJzaXRlc2kgZMO8csO8bXhaHSIbZXJlbiDDvG5pdmVyc2l0ZXNpIGTDvHLDvG14kgEKcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VRdFozUlVjM0pSUlJBQqoBXBABKhYiEmVyZW4gw7xuaXZlcnNpdGVzaSghMh8QASIb_gqbvYNUmPzFP0jSH5R-c-G42-juRoFK_DlgMh8QAiIbZXJlbiDDvG5pdmVyc2l0ZXNpIGTDvHLDvG144AEA-gEECGcQIA!16s%2Fg%2F11h5rqb2b4?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.4787987,
        lng: 42.1656202,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%BCr%C3%BCm+X+-+%C3%87orbaci/@37.2469617,43.6053781,16.06z/data=!4m6!3m5!1s0x400f38f56c136ed5:0x1c65b43c2860e4b3!8m2!3d37.2467725!4d43.6137108!16s%2Fg%2F11n__y41gr?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 37.2467725,
        lng: 43.6137108,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%BCr%C3%BCmx+Kalecik/@38.5530776,43.3453223,17z/data=!3m1!4b1!4m6!3m5!1s0x4012657b523a384d:0x9bcc41cba046609e!8m2!3d38.5530734!4d43.3479026!16s%2Fg%2F11q4k9gp3c?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.5530734,
        lng: 43.3479026,
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
        mapsUrl: "https://www.google.com/maps/place/Gürpınar,+Van/@38.3237249,43.374642,14z/data=!3m1!4b1!4m6!3m5!1s0x400df5a61f72c8f9:0x56b2eb64e77ec568!8m2!3d38.324117!4d43.409163!16s%2Fg%2F12m99tm3v?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
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
        mapsUrl: "https://www.google.com/maps/place/HATAY+D%C3%96NER%C4%B0+D%C3%9CR%C3%9CM+X+KAMP%C3%9CS+ORGAN%C4%B0ZE/@38.5690355,43.2889923,15z/data=!4m10!1m2!2m1!1zZMO8csO8bXggb3JnYW7EsXpl!3m6!1s0x4012631be3ae46fd:0x58884c3a9987b0c9!8m2!3d38.5690355!4d43.3080467!15sChJkw7xyw7xteCBvcmdhbsSxemVaFCISZMO8csO8bXggb3JnYW7EsXplkgEKcmVzdGF1cmFudJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyeHNObGxXVWpGa1JsSnlZbXBrZEdNeFZtNVVSV3h2WXpOd1NWZ3hSUkFCqgFKEAEqDSIJb3JnYW7EsXplKCEyHxABIhubY3N6lEud0OcijGbhc-RYE7L3mhwiAKTz2J8yFhACIhJkw7xyw7xteCBvcmdhbsSxemXgAQD6AQQIABAh!16s%2Fg%2F11xlfhpkx_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.5690355,
        lng: 43.3080467,
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
        mapsUrl: "https://www.google.com/maps/place/D%C3%9CR%C3%9CMX+%C4%B0SKELE+%C5%9EUBE/@38.5066427,43.3773626,17z/data=!3m1!4b1!4m6!3m5!1s0x40127160797faadf:0xeb9909cb343947be!8m2!3d38.5066386!4d43.3822281!16s%2Fg%2F11ydlkkzdw?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
        lat: 38.5066386,
        lng: 43.3822281,
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
        mapsUrl: "https://www.google.com/maps/place/Derecik,+Akören,+30802+Derecik%2FHakkari/@37.0724503,44.2854223,14z/data=!3m1!4b1!4m6!3m5!1s0x400593a34000007d:0xa7b964d8c62a96d!8m2!3d37.072423!4d44.324348!16s%2Fg%2F187cczhw?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D",
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


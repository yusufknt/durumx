"use client";
import { useEffect, useMemo, useRef, useState } from "react";

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
};

const ShinyButton: React.FC<{ href: string; label: string; ariaLabel: string }> = ({ href, label, ariaLabel }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    tabIndex={0}
    className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-red-300/50 px-5 py-2 text-white text-sm font-bold shadow-lg outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
    style={{ backgroundColor: "#dc2626" }}
  >
    <span className="relative z-[1]">{label}</span>
    <svg fill="currentColor" viewBox="0 0 24 24" className="relative z-[1] h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
      <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
    </svg>
    <span className="pointer-events-none absolute inset-y-0 -left-24 w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 transition-transform duration-[1400ms] group-hover:translate-x-[220%]" />
  </a>
);

//

const BranchCard: React.FC<{ branch: Branch }> = ({ branch }) => {
  return (
    <article
      role="article"
      aria-label={`${branch.name} şubesi kartı`}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-red-600"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">{branch.name}</h3>
        </div>
        <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">Açık</span>
      </div>
      <p className="mt-3 text-sm text-zinc-700">{branch.address}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={branch.mapsUrl}
          aria-label={`${branch.name} haritada aç`}
          tabIndex={0}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-red-50"
        >
          Haritada Gör
        </a>
        <a
          href={`tel:${branch.phone}`}
          aria-label={`${branch.name} paket servis için ara`}
          tabIndex={0}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-2 text-white text-sm font-bold shadow-md transform-gpu transition-colors transition-transform duration-200 ease-out hover:from-red-700 hover:to-red-600 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
    <div className="min-h-[90vh] w-full bg-gradient-to-b from-red-50 via-red-100 to-red-50 antialiased">
      <section className="relative" aria-label="DürümX Şubelerimiz">
        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1f2937]">Şubelerimiz</h1>
          </div>
        </div>
      </section>

      <section ref={register("filters")} data-reveal-id="filters" className={`transition-all duration-700 ease-out ${revealed["filters"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col">
                <span className="mb-1 text-sm font-semibold text-zinc-700">Arama</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Şube adı, adres..."
                  aria-label="Şube arama"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1 text-sm font-semibold text-zinc-700">Şehir</span>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDistrict("");
                  }}
                  aria-label="Şehir seç"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600 bg-white"
                >
                  <option value="">Tümü</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col">
                <span className="mb-1 text-sm font-semibold text-zinc-700">İlçe</span>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  aria-label="İlçe seç"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600 bg-white"
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
      </section>

      <section ref={register("grid")} data-reveal-id="grid" className={`transition-all duration-700 ease-out ${revealed["grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">{filtered.length} Şube</h2>
            {(city || district || service || search) && (
              <button
                type="button"
                aria-label="Filtreleri temizle"
                className="text-sm font-semibold text-red-700 hover:underline"
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

      <section ref={register("map")} data-reveal-id="map" className={`transition-all duration-700 ease-out ${revealed["map"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white">
            <div className="aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9] w-full">
              <iframe
                title="DürümX Şubeler Haritası"
                aria-label="Google Haritalar üzerinde şubeler"
                tabIndex={0}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12035.229393902677!2d29.0205366!3d41.0223531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8b1b6d0d52f%3A0xa27e!2sKad%C4%B1k%C3%B6y%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={register("cta")} data-reveal-id="cta" className={`transition-all duration-700 ease-out ${revealed["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1f2937] text-center">Yeni Şube Öneriniz Var mı?</h3>
            <p className="mt-3 max-w-3xl text-center text-[#4b5563]">Bulunduğunuz bölgede DürümX görmek ister misiniz? Bize yazın, değerlendirelim.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <ShinyButton href="/contact" label="Önerini Paylaş" ariaLabel="İletişim sayfasına git" />
              <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise bilgi sayfasına git" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubelerimizPage;



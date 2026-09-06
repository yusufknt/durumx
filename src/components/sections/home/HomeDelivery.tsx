"use client";

import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";

export default function HomeDelivery() {
  const { setOrderOpen } = useModal();
  const handleOpenOrder = () => setOrderOpen(true);
  const handleOpenOrderKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOrderOpen(true);
    }
  };

  return (
    <section className="relative pt-12 md:pt-24 pb-16 md:pb-28 bg-gradient-to-br from-gray-900 via-[#0f0f10] to-gray-900 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Icon + Slogan */}
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="100">
            {/* Moto Courier Logo (Image) */}
            <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-white to-red-100 shadow-2xl border border-white/70">
              <Image
                src="/logo/kurye-logo.png"
                alt="Kurye Logo"
                width={120}
                height={120}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Fast and Hot
              <br /> DürümX
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Sıcaklığını ve tazeliğini kaybetmeden, moto kuryelerimizle ışık
              hızında kapınızda. Güvenli paketleme, hijyen ve üstün kalite
              standartlarıyla.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3" aria-label="Güven unsurları">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20">
                Hijyenik paketleme
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20">
                Hızlı teslimat
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20">
                Sıcak servis
              </span>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenOrder}
                onKeyDown={handleOpenOrderKeyDown}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-red-600 to-orange-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Hemen Sipariş Ver"
                tabIndex={0}
              >
                Hemen Sipariş Ver
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Partner Logos Card */}
          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="relative rounded-3xl p-6 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Decorative */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-red-400/20 to-orange-300/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl" />

              <div className="relative z-10">
                <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">
                  Ortaklarımız
                </p>
                <h3 className="text-white text-lg md:text-3xl font-extrabold mb-6 md:mb-10">
                  En sevdiğiniz platformlarda DürümX
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                  <a
                    href="https://getir.com/yemek/restoran/hatay-doneri-durum-x-ipekyolu-halilaga-mah-ipekyolu-van/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                    aria-label="Getir Yemek ile sipariş ver"
                  >
                    <Image
                      src="/logo/getiryemek.png"
                      alt="Getir Yemek"
                      width={200}
                      height={60}
                      className="h-16 md:h-24 w-auto object-contain"
                      unoptimized
                      priority
                    />
                  </a>
                  <a
                    href="https://www.yemeksepeti.com/restaurant/meej/durumx-meej"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                    aria-label="Yemeksepeti ile sipariş ver"
                  >
                    <Image
                      src="/logo/yemeksepeti-logo.png"
                      alt="Yemeksepeti"
                      width={200}
                      height={60}
                      className="h-16 md:h-24 w-auto object-contain"
                      unoptimized
                      priority
                    />
                  </a>
                  <a
                    href="https://tgoyemek.com/restoranlar/127596"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                    aria-label="Trendyol Yemek ile sipariş ver"
                  >
                    <Image
                      src="/logo/trendyolyemek.png"
                      alt="Trendyol Yemek"
                      width={200}
                      height={60}
                      className="h-16 md:h-24 w-auto object-contain"
                      unoptimized
                      priority
                    />
                  </a>
                </div>

                {/* Safety/Assurance Row */}
                <div
                  className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  aria-label="Güvenlik ve kalite güvenceleri"
                >
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-semibold">
                      Canlı sıcaklık kontrolü
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-sm font-semibold">
                      Hijyenik teslimat
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                    <span className="inline-flex h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />
                    <span className="text-sm font-semibold">
                      Güvenli paketleme
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom soft fade to footer */}
      <div className="pointer-events-none absolute -bottom-10 left-0 right-0 h-10 bg-gradient-to-t from-[#0b0b0c]/90 to-transparent" />
    </section>
  );
}

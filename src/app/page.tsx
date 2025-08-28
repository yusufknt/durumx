"use client";

import Hero from "@/components/Hero";
import StackedCategoryCards from "@/components/StackedCategoryCards";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useModal } from "@/app/layout";

const KATEGORILER = [
  {
    name: "Dönerler",
    href: "/urunlerimiz?kategori=donerler",
    bgImage: "/categories/kategoriler/et-durum.png",
    description: "Geleneksel Hatay lezzeti"
  },
  {
    name: "Servisler",
    href: "/urunlerimiz?kategori=servisler",
    bgImage: "/categories/kategoriler/servis-doner.webp",
    description: "Aile boyu menüler"
  },
  {
    name: "Burgerler",
    href: "/urunlerimiz?kategori=burgerler",
    bgImage: "/categories/kategoriler/burger.png",
    description: "Ev yapımı burgerler"
  },
  {
    name: "İçecekler",
    href: "/urunlerimiz?kategori=icecekler",
    bgImage: "/categories/kategoriler/icecekler.png",
    description: "Serinletici içecekler"
  },
  {
    name: "Atıştırmalıklar",
    href: "/urunlerimiz?kategori=atistirmaliklar",
    bgImage: "/categories/kategoriler/atistirmaliklar.png",
    description: "Çıtır çıtır lezzetler"
  },
];


export default function HomePage() {
  const { setOrderOpen } = useModal();
  const handleOpenOrder = () => setOrderOpen(true);
  const handleOpenOrderKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOrderOpen(true);
    }
  };
  // AOS initialization (robust for client navigation)
  useEffect(() => {
    let detachScroll: (() => void) | null = null;
    let mounted = true;
    (async () => {
      try {
        const mod = await import('aos');
        const AOS = mod.default;
        const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        AOS.init({
          duration: reduceMotion ? 0 : 800,
          once: false,
          offset: 120,
          easing: 'ease-out-cubic',
          disable: reduceMotion,
          delay: 0,
          anchorPlacement: 'top-bottom',
          mirror: false,
        });
        // Force refresh immediately and after a tick for CSR navigations
        try { AOS.refreshHard(); } catch {}
        setTimeout(() => { try { if (mounted) AOS.refreshHard(); } catch {} }, 0);
        const handleScroll = () => { try { AOS.refresh(); } catch {} };
        window.addEventListener('scroll', handleScroll, { passive: true });
        detachScroll = () => window.removeEventListener('scroll', handleScroll);
      } catch {}
    })();
    return () => { mounted = false; if (detachScroll) detachScroll(); };
  }, []);

  return (
    <>
      {/* Global soft background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-gradient-to-br from-red-200/25 to-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-full blur-3xl" />
      </div>
      <div data-aos="fade-up" data-aos-duration="300" data-aos-delay="0" data-aos-once="false">
        <Hero />
      </div>

      {/* Modern Kategoriler Bölümü */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-100/30 to-red-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-red-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-100" data-aos="fade-down" data-aos-delay="100">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold text-sm">Lezzet Kategorileri</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-800 via-red-600 to-gray-800 bg-clip-text text-transparent leading-tight tracking-tight" data-aos="fade-up" data-aos-delay="200">
              Menü Kategorilerimiz
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Her kategoride özenle hazırlanmış lezzetlerimizi keşfedin ve damak tadınıza uygun seçimler yapın
            </p>
          </div>

          {/* Categories Special Stack - "birbirinin içinden çıkma" etkileşimi */}
          <div className="mb-10" data-aos="zoom-in" data-aos-delay="100">
            <StackedCategoryCards items={KATEGORILER.slice(0, 5)} />
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
            <Link 
              href="/urunlerimiz"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 ease-out hover:scale-105"
            >
              <span>Tüm Menüyü Görüntüle</span>
              <svg className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Soft divider between light and dark sections */}
      <div className="h-10 w-full bg-gradient-to-b from-transparent to-gray-900/80" />

      {/* Modern Dürümx Geçmişi Bölümü */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-400/30 backdrop-blur-sm" data-aos="fade-down" data-aos-delay="100">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-semibold text-sm">Şirket Tarihçesi</span>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent leading-tight tracking-tight" data-aos="fade-up" data-aos-delay="200">
              Dürümx Geçmişi
            </h2>

            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-400/30 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
              <span className="text-red-300 font-bold text-lg">2010&apos;dan Bugüne</span>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side - Text Content */}
            <div className="space-y-8" data-aos="fade-right" data-aos-delay="400">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Faaliyete geçtiğinden beri Dürümx lezzetini tadanların müptelası haline gelen şirketimizin hizmet standartları ve çalışma şartlarıyla hem müşterilerini hem de personellerini mutlu etmeyi bilmektedir.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Hızla gelişen modern çağa ayak uydurmayı başarabilen bir firmadır Dürümx. Müşterileri için ürünlerini en kaliteli bir şekilde seçerek hijyenik ortamlarda hazırlayıp müptela eden doyurucu Dürümx lezzetini sofralarınıza sunar.
                </p>
              </div>
            </div>

            {/* Right Side - Animated Stats */}
            <div className="space-y-6" data-aos="fade-left" data-aos-delay="500">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30 text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-red-300 mb-2 group-hover:text-white transition-colors duration-300">13+</div>
                  <div className="text-red-200 text-sm">Yıllık Deneyim</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30 text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-orange-300 mb-2 group-hover:text-white transition-colors duration-300">1000+</div>
                  <div className="text-orange-200 text-sm">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Hijyenik Üretim", icon: "🧼", color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-400/30", textColor: "text-green-300" },
              { title: "Helal Kesim", icon: "🕌", color: "from-blue-500/20 to-indigo-500/20", borderColor: "border-blue-400/30", textColor: "text-blue-300" },
              { title: "Özel Soslar", icon: "🥫", color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-400/30", textColor: "text-purple-300" },
              { title: "Kaliteli Malzemeler", icon: "🥩", color: "from-red-500/20 to-pink-500/20", borderColor: "border-red-400/30", textColor: "text-red-300" },
              { title: "Mutlu Müşteri", icon: "😊", color: "from-yellow-500/20 to-orange-500/20", borderColor: "border-yellow-400/30", textColor: "text-yellow-300" },
              { title: "Mutlu Personeller", icon: "👨‍🍳", color: "from-indigo-500/20 to-blue-500/20", borderColor: "border-indigo-400/30", textColor: "text-indigo-300" }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              data-aos="fade-up"
                data-aos-delay={600 + index * 100}
              data-aos-duration="800"
            >
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="mb-4 h-16 md:h-20 flex items-center justify-center">
                    {feature.title === "Hijyenik Üretim" ? (
                      <Image
                        src="/logo/hijyenik.png"
                        alt="Hijyenik Üretim"
                        width={96}
                        height={96}
                        className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                        unoptimized
                      />
                    ) : feature.title === "Helal Kesim" ? (
                      <div className="h-full flex items-center justify-center overflow-hidden">
                        <Image
                          src="/logo/helal-logo.png"
                          alt="Helal Kesim"
                          width={96}
                          height={96}
                          className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    ) : feature.title === "Kaliteli Malzemeler" ? (
                      <Image
                        src="/logo/kalite-logo.png"
                        alt="Kaliteli Malzemeler"
                        width={96}
                        height={96}
                        className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                        unoptimized
                      />
                    ) : feature.title === "Mutlu Müşteri" ? (
                      <Image
                        src="/logo/mutlu-musteri.png"
                        alt="Mutlu Müşteri"
                        width={96}
                        height={96}
                        className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                        unoptimized
                      />
                    ) : feature.title === "Özel Soslar" ? (
                      <Image
                        src="/logo/ozel-soslar.png"
                        alt="Özel Soslar"
                        width={96}
                        height={96}
                        className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                        unoptimized
                      />
                    ) : feature.title === "Mutlu Personeller" ? (
                      <Image
                        src="/logo/mutlu-personeller.png"
                        alt="Mutlu Personeller"
                        width={96}
                        height={96}
                        className="h-full w-auto object-contain mx-auto transform scale-[1.7] group-hover:scale-[1.9] transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="text-5xl leading-none group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold ${feature.textColor} group-hover:text-white transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-4 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="800">
            <Link 
              href="/kurumsal"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 ease-out hover:scale-105"
            >
              <span>Daha Fazla Bilgi</span>
              <svg className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            </div>
        </div>
      </section>

      {/* Fast & Hot Courier + Partner Logos (Yeni Bölüm) */}
      <section className="relative pt-24 pb-28 bg-gradient-to-br from-gray-900 via-[#0f0f10] to-gray-900 overflow-hidden">
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

              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                Fast and Hot
                <br /> DürümX
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Sıcaklığını ve tazeliğini kaybetmeden, moto kuryelerimizle ışık hızında kapınızda. Güvenli paketleme, hijyen ve üstün kalite standartlarıyla.
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
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Partner Logos Card */}
            <div className="relative" data-aos="fade-left" data-aos-delay="150">
              <div className="relative rounded-3xl p-10 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Decorative */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-red-400/20 to-orange-300/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">Ortaklarımız</p>
                  <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-10">
                    En sevdiğiniz platformlarda DürümX
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    <a
                      href="https://getir.com/yemek/restoran/hatay-doneri-durum-x-ipekyolu-halilaga-mah-ipekyolu-van/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                      aria-label="Getir Yemek ile sipariş ver"
                    >
                      <Image src="/logo/getiryemek.png" alt="Getir Yemek" width={200} height={60} className="h-16 md:h-24 w-auto object-contain" unoptimized priority/>
                    </a>
                    <a
                      href="https://www.yemeksepeti.com/restaurant/meej/durumx-meej"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                      aria-label="Yemeksepeti ile sipariş ver"
                    >
                      <Image src="/logo/yemeksepeti-logo.png" alt="Yemeksepeti" width={200} height={60} className="h-16 md:h-24 w-auto object-contain" unoptimized priority/>
                    </a>
                    <a
                      href="https://tgoyemek.com/restoranlar/127596"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center rounded-2xl bg-white/95 p-0 border border-white/60 shadow hover:shadow-lg transition-all h-28 md:h-32"
                      aria-label="Trendyol Yemek ile sipariş ver"
                    >
                      <Image src="/logo/trendyolyemek.png" alt="Trendyol Yemek" width={200} height={60} className="h-16 md:h-24 w-auto object-contain" unoptimized priority/>
                    </a>
                  </div>

                  {/* Safety/Assurance Row */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Güvenlik ve kalite güvenceleri">
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm font-semibold">Canlı sıcaklık kontrolü</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                      <span className="inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-sm font-semibold">Hijyenik teslimat</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
                      <span className="inline-flex h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />
                      <span className="text-sm font-semibold">Güvenli paketleme</span>
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
    </>
  );
} 
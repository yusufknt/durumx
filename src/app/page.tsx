"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";

const KATEGORILER = [
  {
    name: "Dönerler",
    href: "/urunlerimiz?kategori=donerler",
    bgImage: "/categories/kategoriler/et-durum.webp",
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
    bgImage: "/menu-cheeseburger.jpg",
    description: "Ev yapımı burgerler"
  },
  {
    name: "İçecekler",
    href: "/urunlerimiz?kategori=icecekler",
    bgImage: "/menu-kola.jpg",
    description: "Serinletici içecekler"
  },
  {
    name: "Atıştırmalıklar",
    href: "/urunlerimiz?kategori=atistirmaliklar",
    bgImage: "/menu-ayran.jpg",
    description: "Çıtır çıtır lezzetler"
  },
];

const YORUMLAR = [
  {
    name: "Ayşe K.",
    comment: "Gerçekten Hatay'daki gibi! Dürümler harika ve çok hızlı geldi.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Mehmet T.",
    comment: "Burger menüsü de şahane, patatesler çıtır çıtırdı.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Elif B.",
    comment: "Lezzet, sunum ve servis mükemmel. Tekrar sipariş vereceğim!",
    stars: 5,
    avatar: "/vercel.svg",
  },
];

export default function HomePage() {
  // AOS initialization
  useEffect(() => {
    // Sayfa yüklendiğinde AOS'ı başlat
    const initAOS = () => {
      console.log('AOS initializing...');
    AOS.init({ 
        duration: 800, 
        once: false,
        offset: 120,
        easing: 'ease-out-cubic',
        startEvent: 'load',
        disable: false,
        delay: 0,
        anchorPlacement: 'top-bottom',
        mirror: false
      });
      console.log('AOS initialized successfully');
    };

    // DOM yüklendiğinde AOS'ı başlat
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAOS);
    } else {
      initAOS();
    }

    // Scroll event listener ekle
    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('DOMContentLoaded', initAOS);
    };
  }, []);

  return (
    <>
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

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-800 via-red-600 to-gray-800 bg-clip-text text-transparent leading-tight" data-aos="fade-up" data-aos-delay="200">
              Menü Kategorilerimiz
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Her kategoride özenle hazırlanmış lezzetlerimizi keşfedin ve damak tadınıza uygun seçimler yapın
            </p>
          </div>

          {/* Categories Grid - Modern Photo-First Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {KATEGORILER.map((kat, index) => (
              <div
                key={kat.name}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                data-aos-duration="800"
              >
                {/* Card Container */}
                <div className="category-card relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 min-w-[280px]">
                  {/* Background Image Container */}
                  <div className="relative h-96 w-full overflow-hidden">
                    <div
                      className="category-image h-full w-full bg-cover bg-center transition-transform duration-700"
                      style={{ backgroundImage: `url(${kat.bgImage})` }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Category Name - Positioned over image */}
                    <div className="category-text-overlay absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-black mb-3 leading-tight tracking-wide">
                        {kat.name}
                      </h3>
                      
                      {/* Subtle Description */}
                      <p className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                        {kat.description}
                      </p>
                    </div>

                    {/* Hover Effect Indicator */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Shine Effect */}
                    <div className="shine-effect"></div>
                  </div>

                  {/* Bottom Action Bar - Removed for cleaner design */}
                </div>

                {/* Link Wrapper */}
                <Link href={kat.href} className="absolute inset-0 z-10" aria-label={`${kat.name} kategorisini keşfet`} />
              </div>
            ))}
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

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent leading-tight" data-aos="fade-up" data-aos-delay="200">
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
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
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

      {/* Modern Müşteri Yorumları */}
      <section className="max-w-7xl mx-auto py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#22223b] mb-6" data-aos="fade-up">
            Müşteri Yorumları
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Müşterilerimizin deneyimleri bizim için çok değerli
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {YORUMLAR.map((y, index) => (
            <div
              key={y.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
              data-aos-duration="800"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={y.avatar}
                  alt={y.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 object-cover rounded-full border-3 border-[#ff1a1a] shadow-md"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-[#22223b] text-lg">{y.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(y.stars)].map((_, i) => (
                      <FaStar key={i} className="text-[#ffb703] w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#666] leading-relaxed italic">&ldquo;{y.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 
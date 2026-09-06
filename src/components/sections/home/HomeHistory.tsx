"use client";

import { FEATURES } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function HomeHistory() {
  return (
    <>
      {/* Soft divider between light and dark sections */}
      <div className="h-10 w-full bg-gradient-to-b from-transparent to-gray-900/80" />

      {/* Modern Dürümx Geçmişi Bölümü */}
      <section className="relative py-12 md:py-24 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse md:animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-full blur-3xl md:animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl md:animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-400/30 backdrop-blur-sm"
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-disable="mobile"
            >
              <div className="w-2 h-2 bg-red-400 rounded-full md:animate-pulse"></div>
              <span className="text-red-300 font-semibold text-sm">
                Şirket Tarihçesi
              </span>
              <div
                className="w-2 h-2 bg-orange-400 rounded-full md:animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <h2
              className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent tracking-tight leading-normal pb-2"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-disable="mobile"
            >
              Dürümx Geçmişi
            </h2>

            <div
              className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-400/30 backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-disable="mobile"
            >
              <div className="w-3 h-3 bg-red-400 rounded-full md:animate-bounce"></div>
              <span className="text-red-300 font-bold text-lg">
                2008&apos;dan Bugüne
              </span>
              <div
                className="w-3 h-3 bg-orange-400 rounded-full md:animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
            {/* Left Side - Text Content */}
            <div
              className="space-y-6 md:space-y-8"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-disable="mobile"
            >
              <div className="bg-white/10 backdrop-blur-sm md:backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl">
                <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-4 md:mb-6">
                  Faaliyete geçtiğinden beri Dürümx lezzetini tadanların
                  müptelası haline gelen şirketimizin hizmet standartları ve
                  çalışma şartlarıyla hem müşterilerini hem de personellerini
                  mutlu etmeyi bilmektedir.
                </p>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  Hızla gelişen modern çağa ayak uydurmayı başarabilen bir
                  firmadır Dürümx. Müşterileri için ürünlerini en kaliteli bir
                  şekilde seçerek hijyenik ortamlarda hazırlayıp müptela eden
                  doyurucu Dürümx lezzetini sofralarınıza sunar.
                </p>
              </div>
            </div>

            {/* Right Side - Animated Stats */}
            <div
              className="space-y-4 md:space-y-6"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-disable="mobile"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm md:backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-red-400/30 text-center group md:hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-4xl font-bold text-red-300 mb-1 md:mb-2 md:group-hover:text-white transition-colors duration-300">
                    13+
                  </div>
                  <div className="text-red-200 text-xs md:text-sm">
                    Yıllık Deneyim
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-sm md:backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-orange-400/30 text-center group md:hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-4xl font-bold text-orange-300 mb-1 md:mb-2 md:group-hover:text-white transition-colors duration-300">
                    1000+
                  </div>
                  <div className="text-orange-200 text-xs md:text-sm">
                    Mutlu Müşteri
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm md:backdrop-blur-sm rounded-2xl p-3 md:p-6 border border-white/20 shadow-xl md:hover:shadow-2xl transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={600 + index * 100}
                data-aos-duration="800"
                data-aos-disable="mobile"
              >
                {/* Hover Effect Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="mb-2 md:mb-4 h-12 md:h-20 flex items-center justify-center">
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
                      <div className="text-5xl leading-none group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    )}
                  </div>
                  <h3
                    className={`text-sm md:text-xl font-bold ${feature.textColor} md:group-hover:text-white transition-colors duration-300`}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 rounded-full md:animate-ping"></div>
                  <div
                    className="absolute top-4 right-4 w-1 h-1 bg-white/20 rounded-full md:animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full md:animate-ping"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="text-center mt-20"
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-disable="mobile"
          >
            <Link
              href="/kurumsal"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 ease-out hover:scale-105"
            >
              <span>Daha Fazla Bilgi</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

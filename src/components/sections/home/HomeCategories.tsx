"use client";

import { KATEGORILER } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategories() {
  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-100/30 to-red-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-red-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-100"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-600 font-semibold text-sm">
              Lezzet Kategorileri
            </span>
            <div
              className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <h2
            className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-800 via-red-600 to-gray-800 bg-clip-text text-transparent tracking-tight leading-normal pb-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Menü Kategorilerimiz
          </h2>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Her kategoride özenle hazırlanmış lezzetlerimizi keşfedin ve damak
            tadınıza uygun seçimler yapın
          </p>
        </div>

        {/* Sade ve Şık Kategori Kartları */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {KATEGORILER.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative w-40 md:w-52 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="600"
            >
              {/* Card Content */}
              <div className="p-3 md:p-5">
                {/* Image Container */}
                <div className="relative mb-2 md:mb-3 overflow-hidden rounded-xl bg-gray-50">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={category.bgImage}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-1 md:space-y-2">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Simple Arrow */}
                  <div className="flex justify-center pt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors duration-300">
                      <svg
                        className="w-3 h-3 text-gray-400 group-hover:text-red-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Link
            href="/urunlerimiz"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 ease-out hover:scale-105"
          >
            <span>Tüm Menüyü Görüntüle</span>
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
  );
}

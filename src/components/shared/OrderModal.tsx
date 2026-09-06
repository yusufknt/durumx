"use client";

import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaTimes } from "react-icons/fa";

export default function OrderModal() {
  const { orderOpen, setOrderOpen } = useModal();

  if (!orderOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center p-4 animate-backdrop-fade"
      onClick={() => setOrderOpen(false)}
    >
      {/* Main Modal Container */}
      <div
        className="relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200/50 animate-modal-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-red-50 transition-all duration-300 group z-50 shadow-lg hover:shadow-xl hover:scale-110 border border-gray-200/50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOrderOpen(false);
          }}
          aria-label="Kapat"
        >
          <FaTimes
            size={18}
            className="text-gray-600 group-hover:text-red-500 transition-colors"
          />
        </button>

        {/* Header Section */}
        <div className="relative z-10 text-center py-3 md:py-4 px-6 md:px-8">
          <div className="flex justify-center mb-0">
            <div className="relative w-44 h-16 md:w-52 md:h-20 bg-black rounded-2xl p-2 md:p-3 shadow-lg border border-black/80">
              <Image
                src="/logo.png"
                alt="DürümX Logo"
                fill
                className="object-contain"
                quality={100}
                priority
                sizes="(max-width: 768px) 224px, 256px"
              />
            </div>
          </div>

          <h2
            id="order-modal-title"
            className="text-3xl md:text-3xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent mt-1 mb-1 leading-tight"
          >
            Sipariş Ver
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium">
            Size en uygun sipariş yöntemini seçin
          </p>
        </div>

        {/* Order Options Grid */}
        <div className="relative z-10 px-6 md:px-8 pt-2 pb-5 md:pt-3 md:pb-6">
          <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 items-center justify-items-center">
            {/* Branches Page Redirect */}
            <div className="card red h-20 sm:h-20 w-56 sm:w-60 md:w-64">
              <Link
                href="/subelerimiz"
                className="flex items-center justify-center flex-col text-center h-full w-full rounded-xl text-white cursor-pointer transition-all duration-400"
                onClick={() => setOrderOpen(false)}
                aria-label="Şubelerimiz sayfasına git"
              >
                <FaPhone size={28} className="mb-1 md:mb-1" />
                <p className="tip text-sm md:text-base font-bold">Şubelerimiz</p>
                <p className="second-text text-[11px] md:text-xs opacity-90">
                  Tüm şubeleri görüntüle
                </p>
              </Link>
            </div>

            {/* Yemeksepeti */}
            <div className="card orange h-20 sm:h-20 w-56 sm:w-60 md:w-64">
              <a
                href="https://www.yemeksepeti.com/restaurant/meej/durumx-meej"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-col text-center h-full w-full rounded-xl text-white cursor-pointer transition-all duration-400"
              >
                <Image
                  src="/logo/yemeksepeti-logo.png"
                  alt="Yemeksepeti"
                  width={28}
                  height={28}
                  className="mb-1 object-contain drop-shadow-lg"
                />
                <p className="tip text-sm md:text-base font-bold">Yemeksepeti</p>
                <p className="second-text text-[11px] md:text-xs opacity-90">
                  Online sipariş
                </p>
              </a>
            </div>

            {/* Getir */}
            <div className="card purple h-20 sm:h-20 w-56 sm:w-60 md:w-64">
              <a
                href="https://getir.com/yemek/restoran/hatay-doneri-durum-x-ipekyolu-halilaga-mah-ipekyolu-van/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-col text-center h-full w-full rounded-xl text-white cursor-pointer transition-all duration-400"
              >
                <Image
                  src="/logo/getiryemek.png"
                  alt="Getir"
                  width={28}
                  height={28}
                  className="mb-1 object-contain drop-shadow-lg"
                />
                <p className="tip text-sm md:text-base font-bold">Getir Yemek</p>
                <p className="second-text text-[11px] md:text-xs opacity-90">
                  Hızlı teslimat
                </p>
              </a>
            </div>

            {/* Trendyol */}
            <div className="card blue h-20 sm:h-20 w-56 sm:w-60 md:w-64">
              <a
                href="https://tgoyemek.com/restoranlar/127596"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-col text-center h-full w-full rounded-xl text-white cursor-pointer transition-all duration-400"
              >
                <Image
                  src="/logo/trendyolyemek.png"
                  alt="Trendyol Yemek"
                  width={28}
                  height={28}
                  className="mb-1 object-contain drop-shadow-lg"
                />
                <p className="tip text-sm md:text-base font-bold">
                  Trendyol Yemek
                </p>
                <p className="second-text text-[11px] md:text-xs opacity-90">
                  Güvenilir sipariş
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center py-3 md:py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 via-white/50 to-gray-50/50">
          <p className="text-gray-600 text-sm md:text-base font-medium">
            Tüm siparişleriniz için teşekkür ederiz!
          </p>
        </div>
      </div>
    </div>
  );
}

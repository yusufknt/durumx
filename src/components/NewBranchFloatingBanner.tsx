"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useModal } from "@/providers/ModalProvider";

const NewBranchFloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { setOrderOpen } = useModal();

  // Sayfa yüklendiğinde 2 saniye sonra bildirimi göster
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenOrder = () => {
    setOrderOpen(true);
  };

  if (!isVisible) return null;

  // Kompakt bildirim görünümü (toast notification)
  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-notification-slide-in">
        <div
          onClick={() => setIsExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
          className="group relative bg-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-3 pr-12 border-l-4 border-red-600 max-w-xs cursor-pointer"
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
            aria-label="Kapat"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-red-600/20 rounded-lg blur-md animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-600 to-orange-500 rounded-lg p-2 shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              {/* Ping Badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  YENİ ŞUBE
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight mb-0.5">
                Bursa Görükle&apos;de Açıldık! 🎉
              </h4>
              <p className="text-xs text-gray-600 line-clamp-1">
                Hemen sipariş verin...
              </p>
            </div>
          </div>

          {/* Click indicator */}
          <div className="absolute bottom-1 right-2 text-xs text-gray-400 font-medium">
            Detaylar →
          </div>
        </div>
      </div>
    );
  }

  // Genişletilmiş görünüm
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-notification-expand">
      <div className="relative w-72 sm:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-orange-500 p-4 pb-3">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          </div>

          {/* Close & Minimize Buttons */}
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <button
              onClick={() => setIsExpanded(false)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg p-1 transition-all duration-200"
              aria-label="Küçült"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg p-1 transition-all duration-200"
              aria-label="Kapat"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="bg-white/95 rounded-xl p-2.5 shadow-lg">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-green-400 px-2 py-0.5 rounded-full mb-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                <span className="text-white font-bold text-xs">YENİ AÇILDI</span>
              </div>
              <h3 className="text-base font-black text-white leading-tight drop-shadow-lg">
                Bursa Görükle 🎉
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            Efsane DürümX lezzeti artık Bursa Görükle&apos;de! Sıcacık tadın keyfini hemen sipariş vererek çıkarın.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Link
              href="/subelerimiz"
              className="group flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-center"
            >
              <span className="flex items-center justify-center gap-1">
                📍 Şube
              </span>
            </Link>
            <button
              type="button"
              onClick={handleOpenOrder}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              🔥 Sipariş Ver
            </button>
          </div>

          {/* Timestamp */}
          <p className="text-xs text-gray-400 text-center">
            Şimdi
          </p>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
      </div>
    </div>
  );
};

export default NewBranchFloatingBanner;


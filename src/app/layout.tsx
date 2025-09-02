'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaTimes, FaPhone } from 'react-icons/fa';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

// Modal Context
const ModalContext = createContext<{
  orderOpen: boolean;
  setOrderOpen: (open: boolean) => void;
}>({
  orderOpen: false,
  setOrderOpen: () => {},
});

export const useModal = () => useContext(ModalContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderOpen, setOrderOpen] = useState(false);

  // Prevent body scroll when order modal is open
  useEffect(() => {
    if (orderOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [orderOpen]);

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    if (!orderOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOrderOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [orderOpen, setOrderOpen]);

  return (
    <html lang="tr">
      <head>
        <title>DürümX - Gerçek Hatay Dürümü</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Gerçek Hatay dürümü, burger ve daha fazlası şimdi DürümX'te!" />
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        <style>{`
          .cards {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .cards .red {
            background-color: #f43f5e;
          }
          
          .cards .orange {
            background-color: #f97316;
          }
          
          .cards .purple {
            background-color: #8b5cf6;
          }
          
          .cards .blue {
            background-color: #3b82f6;
          }
          
          .cards .card {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 96px;
            width: 256px;
            border-radius: 10px;
            color: white;
            cursor: pointer;
            transition: 400ms;
          }
          
          .cards .card p.tip {
            font-size: 1em;
            font-weight: 700;
          }
          
          .cards .card p.second-text {
            font-size: .7em;
          }
          
          .cards .card:hover {
            transform: scale(1.05, 1.05);
          }

          /* Hover edilen kart dışındaki TÜM kartları bulanıklaştır ve küçült */
          .cards:has(.card:hover) .card {
            filter: blur(3px);
            transform: scale(0.95, 0.95);
          }
          /* Hover edilen kart net ve büyük kalsın */
          .cards:has(.card:hover) .card:hover {
            filter: none;
            transform: scale(1.05, 1.05);
          }
        `}</style>
      </head>
      <body className={`bg-gradient-to-br from-[#fff0e6] via-[#fff] to-[#f7f7fa] text-[#22223b] min-h-screen flex flex-col antialiased ${inter.className} scroll-smooth`}>
        <ModalContext.Provider value={{ orderOpen, setOrderOpen }}>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />

          {/* Global Order Modal - Now accessible from any page */}
          {orderOpen && (
            <div
              className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center p-4 animate-backdrop-fade"
              onClick={() => setOrderOpen(false)}
            >
              {/* Main Modal Container */}
              <div
                className="relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md sm:max-w-2xl md:max-w-4xl max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible shadow-2xl border border-gray-200/50 overflow-hidden animate-modal-slide-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-red-50 transition-all duration-300 group z-50 shadow-lg hover:shadow-xl hover:scale-110 border border-gray-200/50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked');
                    setOrderOpen(false);
                  }}
                  aria-label="Kapat"
                >
                  <FaTimes size={18} className="text-gray-600 group-hover:text-red-500 transition-colors" />
                </button>

                {/* Header Section */}
                <div className="relative z-10 text-center py-6 md:py-8 px-6 md:px-8">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-sm rounded-full p-2.5 md:p-3 shadow-lg border border-red-200/50">
                        <Image
                          src="/logo.png"
                          alt="DürümX Logo"
                          width={56}
                          height={56}
                          className="h-12 w-auto md:h-14 object-contain"
                          quality={100}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent mb-1 md:mb-2">
                    Sipariş Ver
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg font-medium">
                    Size en uygun sipariş yöntemini seçin
                  </p>
                </div>

                {/* Order Options Grid */}
                <div className="relative z-10 px-6 md:px-8 pb-6 md:pb-8">
                  <div className="cards flex flex-col gap-3 md:gap-4 items-center">
                    
                    {/* Branches Page Redirect */}
                    <div className="card red h-20 w-56 sm:h-24 sm:w-64">
                      <Link
                        href="/subelerimiz"
                        className="flex items-center justify-center flex-col text-center h-full w-full rounded-xl text-white cursor-pointer transition-all duration-400"
                        onClick={() => setOrderOpen(false)}
                        aria-label="Şubelerimiz sayfasına git"
                      >
                        <FaPhone size={28} className="mb-1 md:mb-1" />
                        <p className="tip text-sm md:text-base font-bold">Şubelerimiz</p>
                        <p className="second-text text-[11px] md:text-xs opacity-90">Tüm şubeleri görüntüle</p>
                      </Link>
                    </div>

                    {/* Yemeksepeti */}
                    <div className="card orange h-20 w-56 sm:h-24 sm:w-64">
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
                        <p className="second-text text-[11px] md:text-xs opacity-90">Online sipariş</p>
                      </a>
                    </div>

                    {/* Getir */}
                    <div className="card purple h-20 w-56 sm:h-24 sm:w-64">
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
                        <p className="second-text text-[11px] md:text-xs opacity-90">Hızlı teslimat</p>
                      </a>
                    </div>

                    {/* Trendyol */}
                    <div className="card blue h-20 w-56 sm:h-24 sm:w-64">
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
                        <p className="tip text-sm md:text-base font-bold">Trendyol Yemek</p>
                        <p className="second-text text-[11px] md:text-xs opacity-90">Güvenilir sipariş</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-center py-4 md:py-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 via-white/50 to-gray-50/50">
                  <p className="text-gray-600 text-sm md:text-base font-medium">
                    Tüm siparişleriniz için teşekkür ederiz! 
                  </p>
                </div>
              </div>
            </div>
          )}
        </ModalContext.Provider>
      </body>
    </html>
  );
}
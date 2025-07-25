import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => (
  <footer className="w-full bg-gradient-to-br from-[#fff0e6]/80 via-white/80 to-[#ffe5ec]/90 backdrop-blur-md text-[#22223b] py-10 mt-12 border-t border-[#ececec] shadow-2xl rounded-t-2xl">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-8">
      {/* Sol: Logo ve Slogan */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <Image src="/logo.png" alt="DürümX Logo" width={40} height={40} className="h-10 w-auto mb-1" unoptimized quality={100} />
        <span className="font-bold text-lg">DürümX</span>
        <span className="text-sm text-[#e63946] font-medium">Gerçek Hatay Lezzeti, Modern Sunum</span>
      </div>
      {/* Orta: Bilgi */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-semibold">Adres:</span>
        <span className="text-sm">Atatürk Cad. No: 123, Antakya / HATAY</span>
        <span className="font-semibold mt-2">Çalışma Saatleri:</span>
        <span className="text-sm">Her gün 10:00 - 23:00</span>
        <a href="tel:+904322151555" className="mt-3 inline-block text-white px-4 py-2 rounded-full font-bold shadow hover:scale-105 hover:shadow-xl transition-all duration-200" aria-label="Telefonla Ara" style={{background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)'}}>Telefon: 0432 215 15 55</a>
        <a href="https://wa.me/904322151555" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-white px-4 py-2 rounded-full font-bold shadow hover:scale-105 hover:shadow-xl transition-all duration-200" aria-label="WhatsApp ile İletişim" style={{background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)'}}>WhatsApp: 0432 215 15 55</a>
      </div>
      {/* Sağ: Sosyal Medya */}
      <div className="flex flex-col items-center gap-3">
        <span className="font-semibold mb-1">Bizi Takip Edin</span>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" tabIndex={0} className="group relative text-white rounded-full p-1 transition-colors duration-200 shadow-sm" style={{background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)'}}>
            <FaInstagram size={26} />
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-[#ff1a1a] text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200">Instagram</span>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" tabIndex={0} className="group relative text-white rounded-full p-1 transition-colors duration-200 shadow-sm" style={{background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)'}}>
            <FaTiktok size={26} />
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200">TikTok</span>
          </a>
          <a href="https://wa.me/904322151555" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" tabIndex={0} className="group relative text-white rounded-full p-1 transition-colors duration-200 shadow-sm" style={{background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)'}}>
            <FaWhatsapp size={26} />
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-[#ff1a1a] text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center text-sm text-[#888]">DürümX &copy; {new Date().getFullYear()} | Tüm hakları saklıdır.</div>
  </footer>
);

export default Footer; 
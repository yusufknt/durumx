import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => (
  <footer className="relative w-full mt-0 bg-gradient-to-br from-[#0b0b0c] via-[#111113] to-[#18181b] text-white overflow-hidden">
    {/* soft top fade into footer */}
    <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-[#0b0b0c]/90" />
    {/* subtle grid / pattern */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,_#ffffff_1px,_transparent_1px)] [background-size:12px_12px]" />

    <div className="relative max-w-7xl mx-auto px-6 py-14">
      {/* top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black border border-black/80 shadow-sm">
              <Image src="/logo.png" alt="DürümX" width={40} height={40} className="h-8 w-auto" unoptimized quality={100} />
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-wide">DürümX</p>
              <p className="text-sm text-white/60">Gerçek Hatay Lezzeti, Modern Sunum</p>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Sıcak, hızlı ve güvenilir. DürümX lezzetini her gün kapınıza getiriyoruz.
          </p>
        </div>

        {/* Contact / Hours */}
        <div className="space-y-3">
          <p className="text-white/80 font-semibold tracking-wide">İletişim</p>
          <p className="text-sm text-white/70">Bahçıvan Mahallesi, Yüzbaşıoğlu Sokak No:65, 65130 İpekyolu/Van</p>
          <p className="text-sm text-white/70">Her gün <span className="font-semibold text-white">10:00 - 23:00</span></p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="tel:+904322151555"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Telefonla Ara: 0432 215 15 55"
            >
              Telefon: 0432 215 15 55
            </a>
            <a
              href="https://wa.me/905343858166"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="WhatsApp ile İletişim: 0534 385 81 66"
            >
              WhatsApp: 0534 385 81 66
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <p className="text-white/80 font-semibold tracking-wide">Bizi Takip Edin</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/durum_x/?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              tabIndex={0}
              className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15 hover:scale-105 transition-all"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              tabIndex={0}
              className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15 hover:scale-105 transition-all"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="https://wa.me/905343858166"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              tabIndex={0}
              className="group inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15 hover:scale-105 transition-all"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-white/60">
          DürümX © {new Date().getFullYear()} • Tüm hakları saklıdır.
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/60">
          <span className="inline-flex h-2 w-2 rounded-full bg-green-400/80 animate-pulse" />
          <span>Hızlı teslimat • Güvenli paketleme • Hijyen standartları</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 
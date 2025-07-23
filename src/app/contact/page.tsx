"use client";
import { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-[#fff0e6] via-[#ffe5ec] to-[#f7f7fa] py-16 px-4 flex items-center justify-center">
      <div className={`max-w-5xl w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-[#ececec] flex flex-col md:flex-row gap-10 p-8 md:p-14 transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Sol: Bilgi ve Sosyal */}
        <div className={`flex-1 flex flex-col gap-6 justify-center transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '150ms' }}>
          <img src="/logo.png" alt="DürümX Logo" className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" />
          <h2 className="text-4xl font-extrabold mb-2 text-[#e63946] tracking-tight">Bize Ulaşın</h2>
          <p className="text-base text-[#22223b] mb-4">Her türlü soru, öneri ve sipariş için bize ulaşabilirsiniz.</p>
          <div className="flex items-center gap-3 text-[#e63946] font-bold text-lg">
            <FaMapMarkerAlt />
            <span>Atatürk Caddesi No: 123, Antakya / HATAY</span>
          </div>
          <a href="tel:+905555555555" className="flex items-center gap-3 text-[#e63946] font-bold text-lg hover:underline">
            <FaPhoneAlt />
            <span>+90 555 555 55 55</span>
          </a>
          <a href="mailto:info@durumx.com" className="flex items-center gap-3 text-[#e63946] font-bold text-lg hover:underline">
            <FaEnvelope />
            <span>info@durumx.com</span>
          </a>
          <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#38b000] font-bold text-lg hover:underline">
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
          <div className="flex gap-4 mt-2">
            {["instagram", "tiktok", "whatsapp"].map((type, i) => {
              const iconProps = {
                instagram: {
                  href: "https://instagram.com",
                  className: "group relative text-[#22223b] hover:text-[#e1306c] rounded-full p-1 transition-colors duration-200 shadow-sm",
                  icon: <FaInstagram size={26} />,
                  tooltip: "Instagram",
                  tooltipClass: "bg-[#e1306c]"
                },
                tiktok: {
                  href: "https://tiktok.com",
                  className: "group relative text-[#22223b] hover:text-black rounded-full p-1 transition-colors duration-200 shadow-sm",
                  icon: <FaTiktok size={26} />,
                  tooltip: "TikTok",
                  tooltipClass: "bg-black"
                },
                whatsapp: {
                  href: "https://wa.me/905555555555",
                  className: "group relative text-[#22223b] hover:text-[#38b000] rounded-full p-1 transition-colors duration-200 shadow-sm",
                  icon: <FaWhatsapp size={26} />,
                  tooltip: "WhatsApp",
                  tooltipClass: "bg-[#38b000]"
                }
              }[type];
              return (
                <a
                  key={type}
                  href={iconProps.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={iconProps.tooltip}
                  tabIndex={0}
                  className={`${iconProps.className} transition-all duration-700 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
                  style={{ transitionDelay: `${250 + i * 100}ms` }}
                >
                  {iconProps.icon}
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 ${iconProps.tooltipClass} text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200`}>{iconProps.tooltip}</span>
                </a>
              );
            })}
          </div>
          <div className={`mt-6 bg-white/90 rounded-xl shadow border border-[#ececec] p-3 transition-all duration-1000 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '350ms' }}>
            <iframe
              title="DürümX Konum"
              src="https://www.google.com/maps?q=Hatay+Atatürk+Caddesi+123&output=embed"
              width="100%"
              height="180"
              className="rounded-lg border border-[#ffb703] shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* Sağ: Form */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '250ms' }}>
          <form className="bg-white/90 rounded-2xl shadow-lg border border-[#ececec] p-7 flex flex-col gap-5 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#e63946] mb-2">İletişim Formu</h3>
            {["Adınız", "E-posta", "Mesajınız"].map((label, i) => (
              <label key={label} className={`font-semibold text-base transition-all duration-700 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: `${350 + i * 100}ms` }}>
                {label}
                {label === "Mesajınız" ? (
                  <textarea className="mt-1 p-3 border border-[#ececec] rounded w-full focus:border-[#e63946] focus:ring-2 focus:ring-[#e63946]/30 transition-all" rows={4} placeholder="Mesajınızı yazın" />
                ) : (
                  <input type={label === "E-posta" ? "email" : "text"} className="mt-1 p-3 border border-[#ececec] rounded w-full focus:border-[#e63946] focus:ring-2 focus:ring-[#e63946]/30 transition-all" placeholder={label === "E-posta" ? "E-posta adresiniz" : "Adınızı girin"} />
                )}
              </label>
            ))}
            <button type="submit" className={`bg-gradient-to-r from-[#e63946] to-[#ffb703] text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:scale-105 hover:shadow-xl transition-all duration-200 mt-2 transition-all duration-700 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`} style={{ transitionDelay: '700ms' }}>
              Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage; 
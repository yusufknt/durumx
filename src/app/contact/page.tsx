"use client";
import { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

const ContactPage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Van'ın gerçek koordinatları (Bahçıvan Mahallesi yakını)
  const location = {
    lat: 38.4891, // Van'ın enlemi
    lng: 43.4089, // Van'ın boylamı
    address: "Bahçıvan, Yüzbaşıoğlu Sk. No:65, 65130 Van Merkez/Van"
  };

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleMapClick = () => {
    // Google Maps'te aç
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
    window.open(url, '_blank');
  };

  const handleOpenStreetMapClick = () => {
    // OpenStreetMap'te aç
    const url = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}&zoom=15`;
    window.open(url, '_blank');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Formspree ile form gönderimi (daha basit)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        throw new Error('Form gönderimi başarısız');
      }
    } catch (error) {
      console.error('Form gönderimi başarısız:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-[#fff0e6] via-[#ffe5ec] to-[#f7f7fa] py-16 px-4 flex items-center justify-center">
      <div className={`max-w-5xl w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-[#ececec] flex flex-col md:flex-row gap-10 p-8 md:p-14 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* Sol: Bilgi ve Sosyal */}
        <div className={`flex-1 flex flex-col gap-6 justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '75ms' }}>
          <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
          <h2 className="text-4xl font-extrabold mb-2 text-[#e63946] tracking-tight">Bize Ulaşın</h2>
          <p className="text-base text-[#22223b] mb-4">Her türlü soru, öneri ve sipariş için bize ulaşabilirsiniz.</p>
          <div className="flex items-center gap-3 text-[#e63946] font-bold text-lg">
            <FaMapMarkerAlt />
            <span>{location.address}</span>
          </div>
          <a href="tel:+904322151555" className="flex items-center gap-3 text-[#e63946] font-bold text-lg hover:underline">
            <FaPhoneAlt />
            <span>(0432) 215 15 55</span>
          </a>
          <a href="mailto:info@durumx.com" className="flex items-center gap-3 text-[#e63946] font-bold text-lg hover:underline">
            <FaEnvelope />
            <span>info@durumx.com</span>
          </a>
          <a href="https://wa.me/904322151555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#38b000] font-bold text-lg hover:underline">
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
                  href: "https://wa.me/904322151555",
                  className: "group relative text-[#22223b] hover:text-[#38b000] rounded-full p-1 transition-colors duration-200 shadow-sm",
                  icon: <FaWhatsapp size={26} />,
                  tooltip: "WhatsApp",
                  tooltipClass: "bg-[#38b000]"
                }
              }[type];
              if (!iconProps) return null;
              return (
                <a
                  key={type}
                  href={iconProps.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={iconProps.tooltip}
                  tabIndex={0}
                  className={`${iconProps.className} transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}
                  style={{ transitionDelay: `${125 + i * 50}ms` }}
                >
                  {iconProps.icon}
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 ${iconProps.tooltipClass} text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200`}>{iconProps.tooltip}</span>
                </a>
              );
            })}
          </div>
          <div className={`mt-6 bg-white/90 rounded-xl shadow border border-[#ececec] p-3 transition-all duration-300 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }}>
            <div className="relative">
              {/* OpenStreetMap iframe */}
              <iframe
                title="DürümX Konum - OpenStreetMap"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                width="100%"
                height="200"
                className="rounded-lg border border-[#ffb703] shadow-md"
                loading="lazy"
                style={{ border: 0 }}
              />
              
              {/* Marker overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-8 h-8 bg-[#e63946] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">DX</span>
                </div>
              </div>
              
              {/* Harita seçenekleri */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={handleMapClick}
                  className="bg-white/90 hover:bg-white rounded-lg px-2 py-1 text-xs text-gray-600 shadow-sm transition-colors duration-200"
                  title="Google Maps'te aç"
                >
                  Google
                </button>
                <button
                  onClick={handleOpenStreetMapClick}
                  className="bg-white/90 hover:bg-white rounded-lg px-2 py-1 text-xs text-gray-600 shadow-sm transition-colors duration-200"
                  title="OpenStreetMap'te aç"
                >
                  OSM
                </button>
              </div>
              
              {/* Konum bilgisi */}
              <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-xs text-gray-600 shadow-sm max-w-[calc(100%-4rem)]">
                <div className="font-semibold text-[#e63946]">DürümX</div>
                <div className="truncate">{location.address}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Sağ: Form */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '125ms' }}>
          <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-lg border border-[#ececec] p-7 flex flex-col gap-5 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#e63946] mb-2">İletişim Formu</h3>
            
            {/* Ad Alanı */}
            <label className={`font-semibold text-base transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }}>
              Adınız
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1 p-3 border border-[#ececec] rounded w-full focus:border-[#e63946] focus:ring-2 focus:ring-[#e63946]/30 transition-all" 
                placeholder="Adınızı girin"
                required
              />
            </label>

            {/* E-posta Alanı */}
            <label className={`font-semibold text-base transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '225ms' }}>
              E-posta
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 p-3 border border-[#ececec] rounded w-full focus:border-[#e63946] focus:ring-2 focus:ring-[#e63946]/30 transition-all" 
                placeholder="E-posta adresiniz"
                required
              />
            </label>

            {/* Mesaj Alanı */}
            <label className={`font-semibold text-base transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '275ms' }}>
              Mesajınız
              <textarea 
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="mt-1 p-3 border border-[#ececec] rounded w-full focus:border-[#e63946] focus:ring-2 focus:ring-[#e63946]/30 transition-all" 
                rows={4} 
                placeholder="Mesajınızı yazın"
                required
              />
            </label>

            {/* Durum Mesajları */}
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded transition-all duration-200">
                ✅ Mesajınız başarıyla gönderildi!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded transition-all duration-200">
                ❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-10 py-4 rounded-full text-white font-extrabold text-xl shadow-2xl hover:scale-105 hover:brightness-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#ff1a1a]/60 focus:ring-offset-2 transition-all duration-200 w-full block mt-2 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ background: 'linear-gradient(90deg, #ff1a1a 0%, #000 100%)', transitionDelay: '325ms' }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Gönderiliyor...
                </div>
              ) : (
                'Gönder'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage; 
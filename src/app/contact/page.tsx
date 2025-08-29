"use client";
import { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
 

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
    <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-rose-50 via-white to-rose-100 py-16 px-4 flex items-center justify-center overflow-hidden">
      <div className={`max-w-6xl w-full mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl ring-1 ring-black/5 flex flex-col md:flex-row gap-10 p-6 md:p-10 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* Sol: Bilgi ve Sosyal */}
        <div className={`flex-1 flex flex-col gap-6 justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '75ms' }}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-slate-900 tracking-tight">Bize Ulaşın</h2>
          <p className="text-base md:text-lg text-slate-600 mb-4">Her türlü soru, öneri ve sipariş için bize ulaşabilirsiniz.</p>
          <div className="flex items-center gap-3 text-rose-600 font-semibold text-base">
            <FaMapMarkerAlt />
            <span>{location.address}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="tel:+904322151555" aria-label="Telefon ile ara" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm"><FaPhoneAlt /></span>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">Telefon</span>
                <span className="font-semibold text-slate-900">(0432) 215 15 55</span>
              </div>
            </a>
            <a href="mailto:info@durumx.com" aria-label="E-posta gönder" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm"><FaEnvelope /></span>
              <div className="flex flex-col">
                <span className="text-slate-500 text-xs">E-posta</span>
                <span className="font-semibold text-slate-900">info@durumx.com</span>
              </div>
            </a>
          </div>
          <a href="https://wa.me/904322151555" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yaz" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 w-fit">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm"><FaWhatsapp /></span>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs">WhatsApp</span>
              <span className="font-semibold text-slate-900">Hızlı mesaj</span>
            </div>
          </a>
          <div className="flex gap-4 mt-2" role="group" aria-label="Sosyal medya bağlantıları">
            {["instagram", "tiktok", "whatsapp"].map((type, i) => {
              const iconProps = {
                instagram: {
                  href: "https://instagram.com",
                  className: "group relative text-slate-600 hover:text-[#e1306c] rounded-full p-2 transition-all duration-200 shadow-sm hover:shadow",
                  icon: <FaInstagram size={26} />,
                  tooltip: "Instagram",
                  tooltipClass: "bg-[#e1306c]"
                },
                tiktok: {
                  href: "https://tiktok.com",
                  className: "group relative text-slate-600 hover:text-black rounded-full p-2 transition-all duration-200 shadow-sm hover:shadow",
                  icon: <FaTiktok size={26} />,
                  tooltip: "TikTok",
                  tooltipClass: "bg-black"
                },
                whatsapp: {
                  href: "https://wa.me/904322151555",
                  className: "group relative text-slate-600 hover:text-[#38b000] rounded-full p-2 transition-all duration-200 shadow-sm hover:shadow",
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
          <div className={`mt-6 bg-white/90 rounded-xl shadow border border-slate-200 p-3 transition-all duration-300 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }}>
            <div className="relative">
              {/* OpenStreetMap iframe */}
              <iframe
                title="DürümX Konum - OpenStreetMap"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                width="100%"
                height="200"
                className="rounded-xl border border-rose-200 shadow-md"
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
                  className="bg-white/90 hover:bg-white rounded-lg px-2 py-1 text-xs text-slate-600 shadow-sm transition-colors duration-200"
                  title="Google Maps'te aç"
                >
                  Google
                </button>
                <button
                  onClick={handleOpenStreetMapClick}
                  className="bg-white/90 hover:bg-white rounded-lg px-2 py-1 text-xs text-slate-600 shadow-sm transition-colors duration-200"
                  title="OpenStreetMap'te aç"
                >
                  OSM
                </button>
              </div>
              
              {/* Konum bilgisi */}
              <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-xs text-slate-600 shadow-sm max-w-[calc(100%-4rem)]">
                <div className="font-semibold text-rose-600">DürümX</div>
                <div className="truncate">{location.address}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Sağ: Form */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '125ms' }}>
          <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-lg border border-slate-200 p-7 flex flex-col gap-5 w-full max-w-md mx-auto" aria-label="İletişim formu">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">İletişim Formu</h3>
            <p className="text-slate-600 text-sm -mt-2">Size en kısa sürede geri dönüş yapacağız.</p>
            
            {/* Ad Alanı */}
            <label className={`font-medium text-sm text-slate-700 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }} htmlFor="name">
              Adınız
            </label>
            <input 
              id="name"
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 p-3 border border-slate-200 rounded-lg w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none" 
              placeholder="Adınızı girin"
              aria-required="true"
              required
            />

            {/* E-posta Alanı */}
            <label className={`font-medium text-sm text-slate-700 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '225ms' }} htmlFor="email">
              E-posta
            </label>
            <input 
              id="email"
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 p-3 border border-slate-200 rounded-lg w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none" 
              placeholder="E-posta adresiniz"
              aria-required="true"
              required
            />

            {/* Mesaj Alanı */}
            <label className={`font-medium text-sm text-slate-700 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '275ms' }} htmlFor="message">
              Mesajınız
            </label>
            <textarea 
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="mt-1 p-3 border border-slate-200 rounded-lg w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all outline-none" 
              rows={5} 
              placeholder="Mesajınızı yazın"
              aria-required="true"
              required
            />

            {/* Durum Mesajları */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg transition-all duration-200" role="status">
                ✅ Mesajınız başarıyla gönderildi!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg transition-all duration-200" role="alert">
                ❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-500/40 focus:ring-offset-2 transition-all duration-200 w-full block mt-2 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ background: 'linear-gradient(90deg, #ef4444 0%, #0f172a 100%)', transitionDelay: '325ms' }}
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
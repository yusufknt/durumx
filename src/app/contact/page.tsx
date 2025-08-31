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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      <section className="relative w-full px-4 flex items-center justify-center overflow-hidden">
        <div className={`max-w-6xl w-full mx-auto transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Hero Section */}
          <section className="relative pt-20 pb-16">
            <div className="text-center">
              <div className="relative mb-8">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent">
                  Bize Ulaşın
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
              </div>
              
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
                Her türlü soru, öneri ve sipariş için bize ulaşabilirsiniz.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sol: Bilgi ve Sosyal */}
            <div className={`flex-1 flex flex-col gap-6 justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '75ms' }}>
              <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl p-8 border border-gray-200/60 shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">İletişim Bilgileri</h2>
                  
                  <div className="flex items-center gap-3 text-red-600 font-semibold text-base mb-6">
                    <FaMapMarkerAlt />
                    <span className="text-gray-600">{location.address}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <a href="tel:+904322151555" aria-label="Telefon ile ara" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-100/80 px-4 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-gray-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-sm">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg"><FaPhoneAlt /></span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">Telefon</span>
                        <span className="font-semibold text-gray-800">(0432) 215 15 55</span>
                      </div>
                    </a>
                    
                    <a href="mailto:info@durumx.com" aria-label="E-posta gönder" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-100/80 px-4 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-gray-200/80 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-sm">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600 text-white shadow-lg"><FaEnvelope /></span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">E-posta</span>
                        <span className="font-semibold text-gray-800">info@durumx.com</span>
                      </div>
                    </a>
                  </div>
                  
                  <a href="https://wa.me/904322151555" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yaz" tabIndex={0} className="group flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-100/80 px-4 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-gray-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-fit backdrop-blur-sm mb-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg"><FaWhatsapp /></span>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs">WhatsApp</span>
                      <span className="font-semibold text-gray-800">Hızlı mesaj</span>
                    </div>
                  </a>
                  
                  <div className="flex gap-4 mb-6" role="group" aria-label="Sosyal medya bağlantıları">
                    {["instagram", "tiktok", "whatsapp"].map((type, i) => {
                      const iconProps = {
                        instagram: {
                          href: "https://instagram.com",
                          className: "group relative text-gray-500 hover:text-[#e1306c] rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm",
                          icon: <FaInstagram size={24} />,
                          tooltip: "Instagram",
                          tooltipClass: "bg-[#e1306c]"
                        },
                        tiktok: {
                          href: "https://tiktok.com",
                          className: "group relative text-gray-500 hover:text-gray-800 rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm",
                          icon: <FaTiktok size={24} />,
                          tooltip: "TikTok",
                          tooltipClass: "bg-gray-600"
                        },
                        whatsapp: {
                          href: "https://wa.me/904322151555",
                          className: "group relative text-gray-500 hover:text-[#38b000] rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm",
                          icon: <FaWhatsapp size={24} />,
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
                          <span className={`absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 ${iconProps.tooltipClass} text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200 backdrop-blur-sm`}>{iconProps.tooltip}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Harita */}
              <div className={`relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl p-6 border border-gray-200/60 shadow-xl overflow-hidden transition-all duration-300 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }}>
                <div className="relative">
                  {/* OpenStreetMap iframe */}
                  <iframe
                    title="DürümX Konum - OpenStreetMap"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                    width="100%"
                    height="200"
                    className="rounded-xl border border-gray-300 shadow-lg"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                  
                  {/* Marker overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DX</span>
                    </div>
                  </div>
                  
                  {/* Harita seçenekleri */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={handleMapClick}
                      className="bg-white/90 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs text-gray-600 shadow-lg transition-colors duration-200 backdrop-blur-sm border border-gray-300"
                      title="Google Maps'te aç"
                    >
                      Google
                    </button>
                    <button
                      onClick={handleOpenStreetMapClick}
                      className="bg-white/90 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs text-gray-600 shadow-lg transition-colors duration-200 backdrop-blur-sm border border-gray-300"
                      title="OpenStreetMap'te aç"
                    >
                      OSM
                    </button>
                  </div>
                  
                  {/* Konum bilgisi */}
                  <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-xs text-gray-600 shadow-lg max-w-[calc(100%-4rem)] backdrop-blur-sm border border-gray-300">
                    <div className="font-semibold text-red-600">DürümX</div>
                    <div className="truncate">{location.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ: Form */}
            <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '125ms' }}>
              <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl p-8 border border-gray-200/60 shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.4),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">İletişim Formu</h3>
                  <p className="text-gray-500 text-sm mb-6">Size en kısa sürede geri dönüş yapacağız.</p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="İletişim formu">
                    {/* Ad Alanı */}
                    <label className={`font-medium text-sm text-gray-600 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '175ms' }} htmlFor="name">
                      Adınız
                    </label>
                    <input 
                      id="name"
                      type="text" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1 p-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl w-full focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none placeholder-gray-500 backdrop-blur-sm" 
                      placeholder="Adınızı girin"
                      aria-required="true"
                      required
                    />

                    {/* E-posta Alanı */}
                    <label className={`font-medium text-sm text-gray-600 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '225ms' }} htmlFor="email">
                      E-posta
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1 p-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl w-full focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none placeholder-gray-500 backdrop-blur-sm" 
                      placeholder="E-posta adresiniz"
                      aria-required="true"
                      required
                    />

                    {/* Mesaj Alanı */}
                    <label className={`font-medium text-sm text-gray-600 transition-all duration-200 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`} style={{ transitionDelay: '275ms' }} htmlFor="message">
                      Mesajınız
                    </label>
                    <textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-1 p-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl w-full focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none placeholder-gray-500 backdrop-blur-sm" 
                      rows={5} 
                      placeholder="Mesajınızı yazın"
                      aria-required="true"
                      required
                    />

                    {/* Durum Mesajları */}
                    {submitStatus === 'success' && (
                      <div className="bg-green-100/80 border border-green-300/60 text-green-700 px-4 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm" role="status">
                        ✅ Mesajınız başarıyla gönderildi!
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="bg-red-100/80 border border-red-300/60 text-red-700 px-4 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm" role="alert">
                        ❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 w-full block mt-2 ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600`}
                      style={{ transitionDelay: '325ms' }}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 
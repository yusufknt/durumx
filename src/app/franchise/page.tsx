"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface FranchiseForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  investmentAmount: string;
  experience: string;
  message: string;
  agreement: boolean;
}

const FranchisePage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FranchiseForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    investmentAmount: "",
    experience: "",
    message: "",
    agreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        district: "",
        investmentAmount: "",
        experience: "",
        message: "",
        agreement: false
      });
    }, 3000);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => 
      typeof value === 'boolean' ? value : value.trim() !== ''
    );
  };

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-br from-[#ffb3b3]/70 via-[#ffe5ec]/80 to-[#f9fafb]/90 flex items-center justify-center py-10">
      <section className={`max-w-6xl w-full mx-auto py-12 px-4 transition-all duration-300 ease-out bg-white/90 rounded-3xl shadow-xl border border-[#f3f3f3] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Image src="/logo.png" alt="DürümX Logo" width={56} height={56} className="h-14 w-auto mx-auto mb-4 drop-shadow-xl" unoptimized quality={75} />
        <h1 className={`text-4xl font-extrabold mb-12 text-center text-[#e63946] tracking-tight transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
          Franchise
        </h1>

        {/* Franchise Bilgileri */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
          {/* Sol taraf - Bilgiler */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#e8f5e8] to-[#c8e6c9] rounded-2xl p-8 border border-[#81c784]">
              <h2 className="text-2xl font-bold mb-4 text-[#2e7d32] flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                Neden DürümX Franchise?
              </h2>
              <ul className="space-y-3 text-[#1b5e20]">
                <li className="flex items-center gap-2">
                  <span className="text-[#4caf50]">✓</span>
                  Kanıtlanmış iş modeli
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#4caf50]">✓</span>
                  Kapsamlı eğitim programı
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#4caf50]">✓</span>
                  Pazarlama desteği
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#4caf50]">✓</span>
                  Sürekli operasyonel destek
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#fff3e0] to-[#ffe0b2] rounded-2xl p-8 border border-[#ffcc02]">
              <h3 className="text-xl font-bold mb-4 text-[#f57c00] flex items-center gap-3">
                <span className="text-2xl">💰</span>
                Yatırım Gereksinimleri
              </h3>
              <div className="space-y-2 text-[#ef6c00]">
                <div className="flex justify-between">
                  <span>Franchise Bedeli:</span>
                  <span className="font-bold">50.000₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Ekipman:</span>
                  <span className="font-bold">150.000₺</span>
                </div>
                <div className="flex justify-between">
                  <span>İşletme Sermayesi:</span>
                  <span className="font-bold">100.000₺</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam:</span>
                    <span>300.000₺</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] rounded-2xl p-8 border border-[#90caf9]">
              <h3 className="text-xl font-bold mb-4 text-[#1565c0] flex items-center gap-3">
                <span className="text-2xl">📋</span>
                Gereksinimler
              </h3>
              <ul className="space-y-2 text-[#1976d2]">
                <li>• 50-100m² dükkan alanı</li>
                <li>• Yoğun nüfuslu bölge</li>
                <li>• Otopark imkanı</li>
                <li>• İş deneyimi (tercih edilir)</li>
                <li>• Finansal yeterlilik</li>
              </ul>
            </div>
          </div>

          {/* Sağ taraf - Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#e9ecef] p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#22223b] text-center">Franchise Başvuru Formu</h2>
            
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#38b000] mb-2">Başvurunuz Alındı!</h3>
                <p className="text-[#6c757d]">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* İsim Soyisim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#495057] mb-2">
                      Ad *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#495057] mb-2">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* İletişim Bilgileri */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#495057] mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#495057] mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Lokasyon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#495057] mb-2">
                      Şehir *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-[#495057] mb-2">
                      İlçe *
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Yatırım ve Deneyim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-[#495057] mb-2">
                      Yatırım Miktarı *
                    </label>
                    <select
                      id="investmentAmount"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="200-300k">200.000₺ - 300.000₺</option>
                      <option value="300-400k">300.000₺ - 400.000₺</option>
                      <option value="400-500k">400.000₺ - 500.000₺</option>
                      <option value="500k+">500.000₺+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-[#495057] mb-2">
                      İş Deneyimi *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="none">Deneyim yok</option>
                      <option value="1-3">1-3 yıl</option>
                      <option value="3-5">3-5 yıl</option>
                      <option value="5-10">5-10 yıl</option>
                      <option value="10+">10+ yıl</option>
                    </select>
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#495057] mb-2">
                    Ek Bilgiler
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#ced4da] rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors resize-none"
                    placeholder="Kendiniz ve projeniz hakkında bilgi verebilirsiniz..."
                  />
                </div>

                {/* Sözleşme */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-[#e63946] border-[#ced4da] rounded focus:ring-[#e63946]/60"
                    required
                  />
                  <label htmlFor="agreement" className="text-sm text-[#495057]">
                    <a href="#" className="text-[#e63946] hover:underline">Franchise sözleşmesi</a> şartlarını 
                    kabul ediyorum ve kişisel verilerimin işlenmesine izin veriyorum. *
                  </label>
                </div>

                {/* Gönder Butonu */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                    isFormValid() && !isSubmitting
                      ? 'bg-[#e63946] text-white hover:bg-[#d62a3a] hover:scale-105 shadow-lg'
                      : 'bg-[#ced4da] text-[#6c757d] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </span>
                  ) : (
                    'Başvuruyu Gönder'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className={`transition-all duration-300 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
          <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] rounded-2xl p-8 border border-[#f48fb1] text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#c2185b]">Franchise Hakkında Daha Fazla Bilgi</h2>
            <p className="text-lg text-[#ad1457] mb-6">
              Franchise programımız hakkında detaylı bilgi almak için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-[#c2185b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#ad1457] transition-colors cursor-pointer">
                📞 0555 123 4567
              </div>
              <div className="bg-[#c2185b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#ad1457] transition-colors cursor-pointer">
                ✉️ franchise@durumx.com
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FranchisePage;

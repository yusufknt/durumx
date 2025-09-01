"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, User, MapPin, Building2, Briefcase, Wallet } from "lucide-react";

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
    agreement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => {
      clearTimeout(t);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

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
        agreement: false,
      });
    }, 3000);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) =>
      typeof value === "boolean" ? value : value.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-2xl" />
      </div>

      {/* Hero Section - Animasyonsuz */}
      <div className="relative max-w-6xl w-full mx-auto px-6">
        <div className="relative pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <h1 className="text-3xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent">
                Franchise
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
            </div>
            
            <p className="mt-6 max-w-3xl text-base md:text-xl text-gray-600 leading-relaxed">
              DürümX franchise programı ile kendi işinizi kurun ve başarı hikayenizi yazın
            </p>
          </div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl w-full mx-auto px-6"
      >

        {/* DÜRÜMX FRANCHISE – Modern Split Hero */}
        <section className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left: Headline, copy, CTAs, stats */}
          <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm border border-gray-200/60 shadow-xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-red-600 text-xs font-semibold backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                DÜRÜMX FRANCHISE
              </div>
              
              <h3 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-gray-800">
                Lezzeti Markaya Dönüştürün
                <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Güçlü Franchise Ekosistemi</span>
              </h3>
              
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                DürümX; standartlaştırılmış lezzet, güçlü operasyon ve modern pazarlama ile
                girişimcilere kârlı ve sürdürülebilir bir iş modeli sunar. Bugün adım atın,
                birlikte büyüyelim.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Güçlü ve tanınan marka
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Eğitim ve sürekli destek
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  İmalathane ve tedarik güvencesi
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Yenilikçi pazarlama ve sosyal destek
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4 text-center">
                <div className="rounded-xl bg-gray-100/80 border border-gray-200/60 p-2 md:p-3 backdrop-blur-sm">
                  <div className="text-lg md:text-2xl font-extrabold text-red-600">50K+</div>
                  <div className="text-xs text-gray-500">Aylık Ziyaret</div>
                </div>
                <div className="rounded-xl bg-gray-100/80 border border-gray-200/60 p-2 md:p-3 backdrop-blur-sm">
                  <div className="text-lg md:text-2xl font-extrabold text-red-600">%98</div>
                  <div className="text-xs text-gray-500">Memnuniyet</div>
                </div>
                <div className="rounded-xl bg-gray-100/80 border border-gray-200/60 p-2 md:p-3 backdrop-blur-sm">
                  <div className="text-lg md:text-2xl font-extrabold text-red-600">7/24</div>
                  <div className="text-xs text-gray-500">Operasyon Desteği</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Layered visual */}
          <div className="relative h-full">
            <div className="absolute -top-6 -right-6 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-gradient-to-tr from-red-600/10 via-red-500/10 to-red-400/10 blur-2xl opacity-40" aria-hidden="true" />
            
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
              <Image
                src="/logo/franchise-gorsel.jpg"
                alt="DürümX franchise vitrini"
                width={900}
                height={700}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/10" aria-hidden="true" />
            </div>

            <div className="mt-4 w-full max-w-md mx-auto rounded-2xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm border border-gray-200/60 shadow-lg p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-red-600 flex items-center justify-center text-white text-xs md:text-sm font-bold" aria-hidden="true">DX</div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-semibold text-gray-800">Açılış Öncesi Eğitim</p>
                  <p className="text-xs text-gray-500">Operasyon, servis ve pazarlama destekleri.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Başvuru Formu - Altta Tek Parça */}
        <div
          id="form"
          className="relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm shadow-xl border border-gray-200/60 p-6 md:p-8 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
              Franchise Başvuru Formu
            </h2>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Başvurunuz Alındı!
                </h3>
                <p className="text-gray-600">
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* İsim Soyisim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <InputField
                    icon={<User size={18} />}
                    label="Ad *"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    icon={<User size={18} />}
                    label="Soyad *"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* İletişim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <InputField
                    icon={<Mail size={18} />}
                    label="E-posta *"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <InputField
                    icon={<Phone size={18} />}
                    label="Telefon *"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Lokasyon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <InputField
                    icon={<MapPin size={18} />}
                    label="Şehir *"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <InputField
                    icon={<Building2 size={18} />}
                    label="İlçe *"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Yatırım ve Deneyim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <SelectField
                    icon={<Wallet size={18} />}
                    label="Yatırım Miktarı *"
                    id="investmentAmount"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    options={[
                      { value: "200-300k", label: "200.000₺ - 300.000₺" },
                      { value: "300-400k", label: "300.000₺ - 400.000₺" },
                      { value: "400-500k", label: "400.000₺ - 500.000₺" },
                      { value: "500k+", label: "500.000₺+" },
                    ]}
                  />
                  <SelectField
                    icon={<Briefcase size={18} />}
                    label="İş Deneyimi *"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    options={[
                      { value: "none", label: "Deneyim yok" },
                      { value: "1-3", label: "1-3 yıl" },
                      { value: "3-5", label: "3-5 yıl" },
                      { value: "5-10", label: "5-10 yıl" },
                      { value: "10+", label: "10+ yıl" },
                    ]}
                  />
                </div>

                {/* Mesaj */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3"
                  >
                    Ek Bilgiler
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none placeholder-gray-500 text-sm md:text-base"
                    placeholder="Kendiniz ve projeniz hakkında bilgi verebilirsiniz..."
                  />
                </div>

                {/* Sözleşme */}
                <div className="flex items-start gap-2 md:gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 md:w-5 md:h-5 text-red-500 border-gray-300 rounded focus:ring-red-500/60 bg-white"
                    required
                  />
                  <label htmlFor="agreement" className="text-xs md:text-sm text-gray-600">
                    <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                      Franchise sözleşmesi
                    </a>{" "}
                    şartlarını kabul ediyorum. *
                  </label>
                </div>

                {/* Buton */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full py-3 md:py-4 px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                    isFormValid() && !isSubmitting
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/25"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Başvuruyu Gönder"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div
          id="contact-info"
          className="mt-12 md:mt-16 relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm p-6 md:p-8 border border-gray-200/60 text-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
              Franchise Hakkında Daha Fazla Bilgi
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Franchise programımız hakkında detaylı bilgi almak için bizimle
              iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 cursor-pointer text-sm md:text-base">
                📞 0555 123 4567
              </a>
              <a className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 cursor-pointer text-sm md:text-base">
                ✉️ franchise@durumx.com
              </a>
            </div>
          </div>
                </div>
      </motion.section>
    </div>
  );
};

export default FranchisePage;

/* ------- Küçük Yardımcı Input Bileşenleri ------- */
type InputFieldProps = {
  icon: React.ReactNode;
  label: string;
  id: string;
  name: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  icon,
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder-gray-500 text-sm md:text-base"
        required
      />
    </div>
  </div>
);

type SelectFieldOption = { value: string; label: string };
type SelectFieldProps = {
  icon: React.ReactNode;
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectFieldOption[];
};

const SelectField = ({
  icon,
  label,
  id,
  name,
  value,
  onChange,
  options,
}: SelectFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs md:text-sm font-medium text-gray-600 mb-2 md:mb-3"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 bg-white/80 text-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm md:text-base"
        required
      >
        <option value="">Seçiniz</option>
        {options.map((opt: SelectFieldOption) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
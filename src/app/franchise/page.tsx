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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-2xl" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl w-full mx-auto py-12 px-6"
      >
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
                      <div className="relative mb-8">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Franchise
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent blur-2xl" />
            </div>
          
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed">
            DürümX franchise programı ile kendi işinizi kurun ve başarı hikayenizi yazın
          </p>
        </div>

        {/* DÜRÜMX FRANCHISE – Modern Split Hero */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Headline, copy, CTAs, stats */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-red-400 text-xs font-semibold backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                DÜRÜMX FRANCHISE
              </div>
              
              <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Lezzeti Markaya Dönüştürün
                <span className="block bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">Güçlü Franchise Ekosistemi</span>
              </h3>
              
              <p className="mt-4 text-gray-300 leading-relaxed">
                DürümX; standartlaştırılmış lezzet, güçlü operasyon ve modern pazarlama ile
                girişimcilere kârlı ve sürdürülebilir bir iş modeli sunar. Bugün adım atın,
                birlikte büyüyelim.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
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

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-gray-800/50 border border-gray-700/50 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-red-400">50K+</div>
                  <div className="text-xs text-gray-400">Aylık Ziyaret</div>
                </div>
                <div className="rounded-xl bg-gray-800/50 border border-gray-700/50 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-red-400">%98</div>
                  <div className="text-xs text-gray-400">Memnuniyet</div>
                </div>
                <div className="rounded-xl bg-gray-800/50 border border-gray-700/50 p-3 backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-red-400">7/24</div>
                  <div className="text-xs text-gray-400">Operasyon Desteği</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Layered visual */}
          <div className="relative h-full">
            <div className="absolute -top-6 -right-6 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-gradient-to-tr from-red-600/10 via-red-500/10 to-red-400/10 blur-2xl opacity-40" aria-hidden="true" />
            
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-sm shadow-xl overflow-hidden">
              <Image
                src="/logo/franchise-gorsel.jpg"
                alt="DürümX franchise vitrini"
                width={900}
                height={700}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/10" aria-hidden="true" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 w-full max-w-md mx-auto rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold" aria-hidden="true">DX</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Açılış Öncesi Eğitim</p>
                  <p className="text-xs text-gray-400">Operasyon, servis ve pazarlama destekleri.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Başvuru Formu - Altta Tek Parça */}
        <motion.div
          id="form"
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700/50 p-8 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Franchise Başvuru Formu
            </h2>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Başvurunuz Alındı!
                </h3>
                <p className="text-gray-300">
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* İsim Soyisim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="block text-sm font-medium text-gray-300 mb-3"
                  >
                    Ek Bilgiler
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none placeholder-gray-400"
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
                    className="mt-1 w-5 h-5 text-red-500 border-gray-600 rounded focus:ring-red-500/60 bg-gray-800"
                    required
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-300">
                    <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                      Franchise sözleşmesi
                    </a>{" "}
                    şartlarını kabul ediyorum. *
                  </label>
                </div>

                {/* Buton */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isFormValid() && !isSubmitting
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/25"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
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
        </motion.div>

        {/* İletişim Bilgileri */}
        <motion.div
          id="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 relative rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-sm p-8 border border-gray-700/50 text-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Franchise Hakkında Daha Fazla Bilgi
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Franchise programımız hakkında detaylı bilgi almak için bizimle
              iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 cursor-pointer">
                📞 0555 123 4567
              </a>
              <a className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 cursor-pointer">
                ✉️ franchise@durumx.com
              </a>
            </div>
          </div>
        </motion.div>
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
      className="block text-sm font-medium text-gray-300 mb-3"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder-gray-400"
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
      className="block text-sm font-medium text-gray-300 mb-3"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-800/50 text-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
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
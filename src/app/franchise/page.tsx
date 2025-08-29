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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#fafafa] flex items-center justify-center py-10 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full mx-auto py-12 px-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-6xl font-black drop-shadow-lg focus-in-expand bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            Franchise
          </h1>
        </div>

        {/* DÜRÜMX FRANCHISE – Modern Split Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Headline, copy, CTAs, stats */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-700 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              DÜRÜMX FRANCHISE
            </div>
            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Lezzeti Markaya Dönüştürün
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">Güçlü Franchise Ekosistemi</span>
            </h3>
            <p className="mt-4 text-gray-700 leading-relaxed">
              DürümX; standartlaştırılmış lezzet, güçlü operasyon ve modern pazarlama ile
              girişimcilere kârlı ve sürdürülebilir bir iş modeli sunar. Bugün adım atın,
              birlikte büyüyelim.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                Güçlü ve tanınan marka
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                Eğitim ve sürekli destek
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                İmalathane ve tedarik güvencesi
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                Yenilikçi pazarlama ve sosyal destek
              </li>
            </ul>



            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                <div className="text-2xl font-extrabold text-rose-700">50K+</div>
                <div className="text-xs text-rose-800">Aylık Ziyaret</div>
              </div>
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                <div className="text-2xl font-extrabold text-rose-700">%98</div>
                <div className="text-xs text-rose-800">Memnuniyet</div>
              </div>
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                <div className="text-2xl font-extrabold text-rose-700">7/24</div>
                <div className="text-xs text-rose-800">Operasyon Desteği</div>
              </div>
            </div>
          </div>

          {/* Right: Layered visual */}
          <div className="relative h-full">
            <div className="absolute -top-6 -right-6 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-gradient-to-tr from-rose-300 via-pink-300 to-amber-200 blur-3xl opacity-60" aria-hidden="true" />
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/60 backdrop-blur shadow-xl overflow-hidden">
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 w-full max-w-md mx-auto rounded-2xl bg-white/90 backdrop-blur border border-rose-100 shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-sm font-bold" aria-hidden="true">DX</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Açılış Öncesi Eğitim</p>
                  <p className="text-xs text-gray-600">Operasyon, servis ve pazarlama destekleri.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Başvuru Formu - Altta Tek Parça */}
        <motion.div
          id="form"
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* İsim Soyisim */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ek Bilgiler
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors resize-none"
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
                  className="mt-1 w-5 h-5 text-[#e63946] border-gray-300 rounded focus:ring-[#e63946]/60"
                  required
                />
                <label htmlFor="agreement" className="text-sm text-gray-700">
                  <a href="#" className="text-[#e63946] hover:underline">
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
                    ? "bg-[#e63946] text-white hover:bg-[#d62a3a] hover:shadow-lg hover:scale-105"
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
        </motion.div>

        {/* İletişim Bilgileri */}
        <motion.div
          id="contact-info"
          initial={{ opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-pink-50 to-rose-100 rounded-2xl p-8 border border-pink-200 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-pink-800">
            Franchise Hakkında Daha Fazla Bilgi
          </h2>
          <p className="text-lg text-pink-700 mb-6">
            Franchise programımız hakkında detaylı bilgi almak için bizimle
            iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition cursor-pointer">
              📞 0555 123 4567
            </a>
            <a className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition cursor-pointer">
              ✉️ franchise@durumx.com
            </a>
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
      className="block text-sm font-medium text-gray-700 mb-2"
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
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
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
      className="block text-sm font-medium text-gray-700 mb-2"
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
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e63946]/60 focus:border-[#e63946] transition-colors"
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
import Hero from "@/components/Hero";
import Link from "next/link";
import { FaLeaf, FaClock, FaUserTie, FaPepperHot, FaStar } from "react-icons/fa";

const KATEGORILER = [
  { name: "Dürümler", icon: <FaPepperHot size={32} className="text-[#e63946]" />, href: "/menu" },
  { name: "Burgerler", icon: <FaUserTie size={32} className="text-[#ffb703]" />, href: "/menu" },
  { name: "İçecekler", icon: <FaLeaf size={32} className="text-[#38b000]" />, href: "/menu" },
];

const AVANTAJLAR = [
  { title: "Taze Malzeme", desc: "Her gün taze ve kaliteli ürünler.", icon: <FaLeaf size={28} className="text-[#38b000]" /> },
  { title: "Hızlı Servis", desc: "Siparişiniz dakikalar içinde hazır.", icon: <FaClock size={28} className="text-[#e63946]" /> },
  { title: "Usta Şefler", desc: "Deneyimli ve uzman mutfak ekibi.", icon: <FaUserTie size={28} className="text-[#ffb703]" /> },
  { title: "Gerçek Hatay Lezzeti", desc: "Otantik ve geleneksel tarifler.", icon: <FaPepperHot size={28} className="text-[#e63946]" /> },
];

const GUNUN_ONERISI = {
  name: "Hatay Usulü Tavuk Dürüm",
  desc: "Özel baharatlı tavuk, çıtır lavaş ve bol yeşillik ile hazırlanır. Şefimizin bugünkü önerisi!",
  img: "/menu-durum.jpg",
  price: "85₺",
};

const YORUMLAR = [
  {
    name: "Ayşe K.",
    comment: "Gerçekten Hatay'daki gibi! Dürümler harika ve çok hızlı geldi.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Mehmet T.",
    comment: "Burger menüsü de şahane, patatesler çıtır çıtırdı.",
    stars: 5,
    avatar: "/vercel.svg",
  },
  {
    name: "Elif B.",
    comment: "Lezzet, sunum ve servis mükemmel. Tekrar sipariş vereceğim!",
    stars: 5,
    avatar: "/vercel.svg",
  },
];

const YEMEKSEPETI_URL = "https://www.yemeksepeti.com/restaurant/meej/durumx-meej";
const PHONE_NUMBER = "+905555555555";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Hızlı Menü Kategorileri */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {KATEGORILER.map((kat) => (
            <Link key={kat.name} href={kat.href} className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-8 w-full sm:w-1/3 border border-[#ececec] hover:scale-105 hover:shadow-2xl transition-all duration-200 group">
              <span className="mb-2 group-hover:scale-110 transition-transform duration-200">{kat.icon}</span>
              <span className="mt-3 text-xl font-extrabold text-[#22223b] tracking-tight">{kat.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* Avantajlar */}
      <section className="relative max-w-5xl mx-auto py-16 px-4 rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-[#fff0e6] via-[#ffe5ec] to-[#f7f7fa] shadow-xl border border-[#ececec]">
        <h3 className="text-3xl font-extrabold mb-8 text-center text-[#e63946] tracking-tight drop-shadow-lg">Neden DürümX?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {AVANTAJLAR.map((a) => (
            <div key={a.title} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-7 border border-[#ececec] hover:scale-105 hover:shadow-2xl transition-all duration-200">
              <span className="mb-2">{a.icon}</span>
              <span className="mt-3 text-lg font-bold text-[#22223b]">{a.title}</span>
              <span className="text-sm text-[#555] mt-1 text-center">{a.desc}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Müşteri Yorumları */}
      <section className="relative max-w-4xl mx-auto py-16 px-4 rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-[#e0f7fa] via-[#f7f7fa] to-[#ffe5ec] shadow-xl border border-[#ececec]">
        <h3 className="text-3xl font-extrabold mb-8 text-center text-[#e63946] tracking-tight drop-shadow-lg">Müşteri Yorumları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {YORUMLAR.map((y) => (
            <div key={y.name} className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center border border-[#ececec] hover:scale-105 hover:shadow-2xl transition-all duration-200">
              <img src={y.avatar} alt={y.name} className="w-16 h-16 object-cover rounded-full mb-3 border-2 border-[#ffb703] shadow-md hover:scale-110 transition-transform duration-200" />
              <span className="font-bold text-[#22223b] text-lg">{y.name}</span>
              <div className="flex gap-1 my-1">
                {[...Array(y.stars)].map((_, i) => <FaStar key={i} className="text-[#ffb703]" />)}
              </div>
              <span className="text-sm text-[#555] text-center">{y.comment}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Sabit Hızlı Sipariş Butonu */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={YEMEKSEPETI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#e63946] to-[#ffb703] text-white px-8 py-4 rounded-full shadow-2xl font-extrabold text-xl hover:scale-110 hover:shadow-3xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#e63946]/60"
          aria-label="Hemen Sipariş Ver"
        >
          Hemen Sipariş Ver
        </a>
      </div>
    </>
  );
} 
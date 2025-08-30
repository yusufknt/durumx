"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const useRevealOnScroll = () => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.revealId;
          if (!id) return;
          if (entry.isIntersecting) {
            setRevealed((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const register = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  return { revealed, register } as const;
};

const KurumsalPage = () => {
  const { revealed, register } = useRevealOnScroll();

  const ShinyButton: React.FC<{ href: string; label: string; ariaLabel: string }> = ({ href, label, ariaLabel }) => (
    <a
      href={href}
      aria-label={ariaLabel}
      tabIndex={0}
      className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-6 py-3 text-white text-sm font-bold shadow-2xl outline-none transition-all duration-300 hover:scale-105 hover:shadow-red-500/25 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400 focus-visible:ring-offset-white overflow-hidden"
    >
      <span className="relative z-10">{label}</span>
      <svg fill="currentColor" viewBox="0 0 24 24" className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
        <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </a>
  );

  const GlassCard: React.FC<{
    title: string;
    ariaLabel: string;
    children: React.ReactNode;
    badgeTop?: string;
    badgeBottom?: string;
    variant?: "primary" | "secondary" | "accent";
  }> = ({ title, ariaLabel, children, badgeTop = "", badgeBottom = "", variant = "primary" }) => {
    const variants = {
      primary: "from-white/90 to-gray-50/80 border-gray-200/60",
      secondary: "from-gray-50/90 to-white/80 border-gray-200/60",
      accent: "from-red-50/90 to-red-100/80 border-red-200/60"
    };

    return (
      <div
        className="group relative w-full h-full"
        role="article"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.currentTarget.focus();
          }
        }}
      >
        <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${variants[variant]} backdrop-blur-xl border border-opacity-50 p-8 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 rounded-2xl opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(220,38,38,0.05)_50%,transparent_60%)] bg-[length:20px_20px]" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
              {title}
            </h3>
            <div className="text-gray-600 leading-relaxed">
              {children}
            </div>
          </div>

          {/* Badge */}
          {badgeTop && badgeBottom && (
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl border border-red-500/30 flex flex-col items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white/80">{badgeTop}</span>
              <span className="text-lg font-black text-white">{badgeBottom}</span>
            </div>
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    );
  };



  const StatCard: React.FC<{
    number: string;
    label: string;
  }> = ({ number, label }) => (
    <div className="relative bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
      <div className="text-4xl font-black text-red-600 mb-2">{number}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  const TimelineItem: React.FC<{
    year: string;
    text: string;
  }> = ({ year, text }) => (
    <li className="relative mb-8 ml-8 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-gray-300 via-red-500 to-gray-300" />
      
      {/* Year marker */}
      <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="text-xs font-bold text-white">{year.slice(-2)}</span>
      </div>
      
      {/* Content */}
      <div className="ml-6 bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-gray-200/60 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{year}</h4>
        <p className="text-gray-600">{text}</p>
      </div>
    </li>
  );

  const principles = useMemo(
    () => [
      "Kalite", "Hız", "Müşteri Memnuniyeti", "Dürüstlük", "Süreklilik", "Hijyen ve Tazelik",
    ],
    []
  );

  const certificate = useMemo(
    () => ({
      image: "/certificates/sertifika.png",
      alt: "DürümX Sertifikası"
    }),
    []
  );

  const stats = useMemo(
    () => [
      { number: "15+", label: "Yıllık Deneyim" },
      { number: "10K+", label: "Mutlu Müşteri" },
      { number: "100%", label: "Taze Malzeme" },
      { number: "24/7", label: "Hizmet Kalitesi" },
    ],
    []
  );

  const timelineData = useMemo(
    () => [
      { year: "2008", text: "İlk şube ve marka kuruluşu" },
      { year: "2015", text: "Menü ve operasyonel süreçlerin güçlendirilmesi" },
      { year: "2023", text: "Çevrimiçi sipariş kanallarında büyüme" },
      { year: "2024", text: "Kurumsal iş birlikleri ve yeni şubeler" },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 antialiased relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-red-600 to-red-500 bg-clip-text text-transparent">
                Kurumsal
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
            </div>
            
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
              Gelenekten geleceğe, her lokmada aynı özen. DürümX; kalite, hız ve
              misafir memnuniyeti için modern çözümler sunar.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise başvuru sayfasına git" />
              <ShinyButton href="/contact" label="İletişime Geç" ariaLabel="İletişim sayfasına git" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={register("about")}
        data-reveal-id="about"
        className={`transition-all duration-1000 ease-out ${
          revealed["about"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <GlassCard title="DürümX Hakkında" ariaLabel="DürümX Hakkında kartı" badgeTop="HKK" badgeBottom="DX" variant="accent">
            <p className="text-lg leading-relaxed text-gray-700">
              DürümX; aile sıcaklığını modern hizmet anlayışıyla buluşturan yenilikçi bir döner markasıdır. <br /> Her gün
              misafirlerimize taze, hijyenik ve özenle hazırlanmış lezzetler sunuyoruz. <br /> İşimizi kalite, hız, müşteri
              memnuniyeti, dürüstlük ve süreklilik prensipleri üzerine kurduk.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={register("mission")}
        data-reveal-id="mission"
        className={`transition-all duration-1000 ease-out ${
          revealed["mission"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <GlassCard title="İlkelerimiz" ariaLabel="İlkelerimiz kartı" badgeTop="ILKE" badgeBottom="DX" variant="primary">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-center gap-3 group">
                    <span className="w-2 h-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors duration-300" />
                    <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">{principle}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
            
            <GlassCard title="Vizyonumuz" ariaLabel="Vizyonumuz kartı" badgeTop="VZN" badgeBottom="DX" variant="secondary">
              <p className="text-lg leading-relaxed text-gray-700">
                Sadece döner sunmak değil; her lokmada sağlık, lezzet ve doyuruculuğu ulaştırmak. Yenilikçi
                                 bakış açımız ve sürdürülebilir üretim anlayışımızla Türkiye&apos;nin en güvenilir, en sevilen döner
                markalarından biri olmayı hedefliyoruz.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section
        ref={register("certificates")}
        data-reveal-id="certificates"
        className={`transition-all duration-1000 ease-out ${
          revealed["certificates"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-4">
              Sertifikalarımız
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Kalite ve güvenilirliğimizi kanıtlayan belgelerimiz
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="max-w-lg">
              <Image 
                src={certificate.image} 
                alt={certificate.alt}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={register("stats")}
        data-reveal-id="stats"
        className={`transition-all duration-1000 ease-out ${
          revealed["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-gray-200/60 p-8 md:p-12 shadow-xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
                Rakamlarla DürümX
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={register("timeline")}
        data-reveal-id="timeline"
        className={`transition-all duration-1000 ease-out ${
          revealed["timeline"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-4">
              Yolculuğumuz
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Başarı hikayemizin kilometre taşları
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <ol className="relative">
                             {timelineData.map((item) => (
                 <TimelineItem key={item.year} {...item} />
               ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={register("cta")}
        data-reveal-id="cta"
        className={`transition-all duration-1000 ease-out ${
          revealed["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl border border-gray-200/60 p-8 md:p-12 shadow-xl overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.4),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.3),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">
                İş Ortağımız Olmak İster misiniz?
              </h3>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
                Kurumsal iş birliği, toplu sipariş ve etkinlik çözümlerimiz için bize ulaşın. Size en kısa sürede dönüş yapalım.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <ShinyButton href="/contact" label="Hemen İletişime Geç" ariaLabel="İletişim sayfasına git" />
                <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise bilgi sayfasına git" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KurumsalPage;

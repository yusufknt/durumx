"use client";
import { useEffect, useMemo, useRef, useState } from "react";

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
      className="group relative inline-flex items-center justify-center gap-2 rounded-full border-4 border-red-300/50 px-5 py-2 text-white text-sm font-bold shadow-lg outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
      style={{ backgroundColor: "#dc2626" }}
    >
      <span className="relative z-[1]">{label}</span>
      <svg fill="currentColor" viewBox="0 0 24 24" className="relative z-[1] h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
        <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
      </svg>
      <span className="pointer-events-none absolute inset-y-0 -left-24 w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 transition-transform duration-[1400ms] group-hover:translate-x-[220%]" />
    </a>
  );

  const ThreeDCard: React.FC<{
    title: string;
    ariaLabel: string;
    children: React.ReactNode;
    badgeTop?: string;
    badgeBottom?: string;
    soft?: boolean;
  }> = ({ title, ariaLabel, children, badgeTop = "", badgeBottom = "", soft = false }) => {
    return (
      <div className="w-full h-full" style={{ perspective: "1000px" }}>
        <div
          className="relative w-full h-full shadow transition-all duration-500"
          role="article"
          aria-label={ariaLabel}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              (e.currentTarget as HTMLElement).classList.toggle("[transform:rotate3d(.5,1,0,30deg)]");
            }
          }}
          style={{
            paddingTop: soft ? "24px" : "50px",
            border: "3px solid #141414",
            transformStyle: "preserve-3d",
            background: soft
              ? "linear-gradient(135deg, #0000 18.75%, rgba(40,40,40,0.6) 0 31.25%, #0000 0), repeating-linear-gradient(45deg, rgba(40,40,40,0.3) -6.25% 6.25%, rgba(20,20,20,0.3) 0 18.75%)"
              : "linear-gradient(135deg, #0000 18.75%, #1f1f1f 0 31.25%, #0000 0), repeating-linear-gradient(45deg, #1f1f1f -6.25% 6.25%, #0b0b0b 0 18.75%)",
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 0",
            backgroundColor: soft ? "#121212" : "#0b0b0b",
            boxShadow: soft ? "rgba(142,142,142,0.25) 0px 22px 24px -12px" : "rgba(142,142,142,0.3) 0px 30px 30px -10px",
            borderRadius: "16px",
            minHeight: "50px",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            const shift = soft ? 60 : 100;
            const rotate = soft ? 12 : 30;
            el.style.backgroundPosition = `-${shift}px ${shift}px, -${shift}px ${shift}px`;
            el.style.transform = `rotate3d(0.5, 1, 0, ${rotate}deg)`;
            el.style.transitionDuration = soft ? "700ms" : "500ms";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundPosition = "0 0, 0 0";
            el.style.transform = "none";
            el.style.transitionDuration = soft ? "700ms" : "500ms";
          }}
        >
          <div
            className="rounded-xl h-full"
            style={{
              background: "#dc2626",
              transition: soft ? "all .7s ease-out" : "all .5s ease-in-out",
              padding: soft ? "48px 25px 25px 25px" : "60px 25px 25px 25px",
              transformStyle: "preserve-3d",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              marginBottom: soft ? "8px" : undefined,
            }}
          >
            <span
              className="block font-extrabold"
              style={{
                color: "#ffffff",
                fontSize: soft ? "28px" : "25px",
                transform: "translate3d(0px,0px,50px)",
                transition: soft ? "all .7s ease-out" : "all .5s ease-in-out",
                textShadow: soft ? "rgba(0,0,0,0.25) 0 1px 2px" : "none",
              }}
            >
              {title}
            </span>
            <div
              className="mt-3 text-sm font-bold"
              style={{
                color: "#ffffff",
                transform: "translate3d(0px,0px,30px)",
                transition: soft ? "all .7s ease-out" : "all .5s ease-in-out",
                fontSize: soft ? "18px" : undefined,
                lineHeight: soft ? 1.75 : undefined,
                textShadow: soft ? "rgba(0,0,0,0.2) 0 1px 2px" : "none",
              }}
            >
              {children}
            </div>
          </div>
          <div
            className="absolute"
            style={{
              top: "30px",
              right: "30px",
              height: "60px",
              width: "60px",
              background: "#0b0b0b",
              border: "1px solid #dc2626",
              padding: "10px",
              transform: "translate3d(0px,0px,80px)",
              boxShadow: "rgba(100,100,111,0.2) 0px 17px 10px -10px",
              borderRadius: "12px",
            }}
            aria-hidden="true"
          >
            <span className="block text-center" style={{ color: "#dc2626", fontSize: "9px", fontWeight: 700 }}>
              {badgeTop}
            </span>
            <span className="block text-center" style={{ color: "#dc2626", fontSize: "20px", fontWeight: 900 }}>
              {badgeBottom}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const principles = useMemo(
    () => [
      "Kalite", "Hız", "Müşteri Memnuniyeti", "Dürüstlük", "Süreklilik", "Hijyen ve Tazelik",
    ],
    []
  );

  const values = useMemo(
    () => [
      { icon: "🌿", title: "Doğallık", desc: "Katkısız ve taze içerikler" },
      { icon: "🧼", title: "Hijyen", desc: "Yüksek hijyen standartları" },
      { icon: "⚡", title: "Hızlı Teslimat", desc: "Sıcacık ve hızlı servis" },
      { icon: "💬", title: "Şeffaflık", desc: "Açık ve dürüst iletişim" },
      { icon: "🤝", title: "Güven", desc: "Misafir odaklı yaklaşım" },
      { icon: "💡", title: "İnovasyon", desc: "Sürekli gelişim kültürü" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { number: "3+", label: "Yıllık Deneyim" },
      { number: "10K+", label: "Mutlu Müşteri" },
      { number: "100%", label: "Taze Malzeme" },
      { number: "24/7", label: "Hizmet Kalitesi" },
    ],
    []
  );

  

  return (
    <div className="min-h-[90vh] w-full bg-gradient-to-b from-red-50 via-red-100 to-red-50 antialiased">
      {/* Hero */}
      <section
        className="relative"
        aria-label="DürümX Kurumsal Tanıtım"
      >

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="flex flex-col items-center text-center">
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1f2937]"
            >
              Kurumsal
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-zinc-600">
              Gelenekten geleceğe, her lokmada aynı özen. DürümX; kalite, hız ve
              misafir memnuniyeti için modern çözümler sunar.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise başvuru sayfasına git" />
              <ShinyButton href="/contact" label="İletişime Geç" ariaLabel="İletişim sayfasına git" />
            </div>
          </div>
        </div>
      </section>

      

      {/* About */}
      <section
        ref={register("about")}
        data-reveal-id="about"
        className={`transition-all duration-700 ease-out ${
          revealed["about"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <ThreeDCard title="DürümX Hakkında" ariaLabel="DürümX Hakkında kartı" badgeTop="HKK" badgeBottom="DX" soft>
            <p className="text-base leading-relaxed text-white text-center">
              DürümX; aile sıcaklığını modern hizmet anlayışıyla buluşturan yenilikçi bir döner markasıdır. Her gün
              misafirlerimize taze, hijyenik ve özenle hazırlanmış lezzetler sunuyoruz. İşimizi kalite, hız, müşteri
              memnuniyeti, dürüstlük ve süreklilik prensipleri üzerine kurduk.
            </p>
          </ThreeDCard>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        ref={register("mission")}
        data-reveal-id="mission"
        className={`transition-all duration-700 ease-out ${
          revealed["mission"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <ThreeDCard title="İlkelerimiz" ariaLabel="İlkelerimiz kartı" badgeTop="ILKE" badgeBottom="DX">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {principles.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#ffffff]" />
                    <span className="text-white">{p}</span>
                  </li>
                ))}
              </ul>
            </ThreeDCard>
            <ThreeDCard title="Vizyonumuz" ariaLabel="Vizyonumuz kartı" badgeTop="VZN" badgeBottom="DX">
              <p className="text-base leading-relaxed text-white">
                Sadece döner sunmak değil; her lokmada sağlık, lezzet ve doyuruculuğu ulaştırmak. Yenilikçi
                bakış açımız ve sürdürülebilir üretim anlayışımızla Türkiye’nin en güvenilir, en sevilen döner
                markalarından biri olmayı hedefliyoruz.
              </p>
            </ThreeDCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={register("values")}
        data-reveal-id="values"
        className={`transition-all duration-700 ease-out ${
          revealed["values"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">Değerlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 text-center">{v.icon}</div>
                <h3 className="text-xl font-bold mb-1 text-red-600 text-center">{v.title}</h3>
                <p className="text-[#4b5563] text-center">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={register("stats")}
        data-reveal-id="stats"
        className={`transition-all duration-700 ease-out ${
          revealed["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <div className="rounded-3xl bg-gradient-to-r from-red-500 to-red-600 text-white p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Rakamlarla DürümX</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 p-5 text-center shadow">
                  <div className="text-3xl font-extrabold">{s.number}</div>
                  <div className="text-sm font-medium opacity-90">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        ref={register("timeline")}
        data-reveal-id="timeline"
        className={`transition-all duration-700 ease-out ${
          revealed["timeline"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">Yolculuğumuz</h2>
          <ol className="relative border-s border-gray-200 max-w-3xl mx-auto">
            {[
              { year: "2021", text: "İlk şube ve marka kuruluşu" },
              { year: "2022", text: "Menü ve operasyonel süreçlerin güçlendirilmesi" },
              { year: "2023", text: "Çevrimiçi sipariş kanallarında büyüme" },
              { year: "2024", text: "Kurumsal iş birlikleri ve yeni şubeler" },
            ].map((step) => (
              <li key={step.year} className="mb-8 ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                  {step.year.slice(-2)}
                </span>
                <h4 className="text-lg font-semibold text-zinc-900">{step.year}</h4>
                <p className="text-zinc-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={register("cta")}
        data-reveal-id="cta"
        className={`transition-all duration-700 ease-out ${
          revealed["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1f2937] text-center">
              İş Ortağımız Olmak İster misiniz?
            </h3>
            <p className="mt-3 max-w-3xl text-center text-[#4b5563]">
              Kurumsal iş birliği, toplu sipariş ve etkinlik çözümlerimiz için bize ulaşın. Size en kısa sürede dönüş yapalım.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <ShinyButton href="/contact" label="Hemen İletişime Geç" ariaLabel="İletişim sayfasına git" />
              <ShinyButton href="/franchise" label="Franchise Bilgisi" ariaLabel="Franchise bilgi sayfasına git" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KurumsalPage;

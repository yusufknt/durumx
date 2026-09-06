"use client";

import Hero from "@/components/Hero";
import NewBranchFloatingBanner from "@/components/NewBranchFloatingBanner";
import HomeCategories from "@/components/sections/home/HomeCategories";
import HomeDelivery from "@/components/sections/home/HomeDelivery";
import HomeHistory from "@/components/sections/home/HomeHistory";
import { useEffect } from "react";

export default function HomePage() {
  // AOS initialization (robust for client navigation)
  useEffect(() => {
    let detachScroll: (() => void) | null = null;
    let mounted = true;
    (async () => {
      try {
        const mod = await import("aos");
        const AOS = mod.default;
        const reduceMotion =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        AOS.init({
          duration: reduceMotion ? 0 : 800,
          once: false,
          offset: 120,
          easing: "ease-out-cubic",
          disable: reduceMotion,
          delay: 0,
          anchorPlacement: "top-bottom",
          mirror: false,
        });
        // Force refresh immediately and after a tick for CSR navigations
        try {
          AOS.refreshHard();
        } catch {}
        setTimeout(() => {
          try {
            if (mounted) AOS.refreshHard();
          } catch {}
        }, 0);
        const handleScroll = () => {
          try {
            AOS.refresh();
          } catch {}
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        detachScroll = () => window.removeEventListener("scroll", handleScroll);
      } catch {}
    })();
    return () => {
      mounted = false;
      if (detachScroll) detachScroll();
    };
  }, []);

  return (
    <>
      {/* Floating New Branch Banner */}
      <NewBranchFloatingBanner />

      {/* Global soft background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-gradient-to-br from-red-200/25 to-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-full blur-3xl" />
      </div>
      
      <div
        data-aos="fade-up"
        data-aos-duration="300"
        data-aos-delay="0"
        data-aos-once="false"
      >
        <Hero />
      </div>

      <HomeCategories />
      <HomeHistory />
      <HomeDelivery />
    </>
  );
}

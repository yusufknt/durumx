/**
 * Global Hata Yakalama Yöneticisi
 * Agent'lar tüm hataları bu fonksiyon üzerinden fırlatmalı veya loglamalıdır.
 */
export const handleError = (error: unknown, context?: string) => {
  // Geliştirme ortamında console'a daha detaylı bas
  if (process.env.NODE_ENV === "development") {
    console.group(`🚨 Hata Yakalandı: ${context || "Bilinmeyen Bağlam"}`);
    console.error(error);
    console.groupEnd();
  }

  // İleride Sentry, Datadog veya Toast bildirimleri (Sonner/Hot Toast) buraya eklenebilir
  // return toast.error("Bir hata oluştu");
};

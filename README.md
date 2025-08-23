# DürümX - Modern Döner Restaurant Website

Modern, responsive ve kullanıcı dostu döner restaurant web sitesi. React, Next.js ve TailwindCSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Video Background**: Ana sayfada dönen video arka planı
- **Modern UI/UX**: TailwindCSS ile şık tasarım
- **Performance Optimized**: Hızlı yükleme ve smooth animasyonlar
- **Accessibility**: WCAG standartlarına uygun
- **SEO Friendly**: Next.js ile optimize edilmiş

## 🎥 Video Background Sistemi

Ana sayfada "DürümX'e Hoşgeldiniz" yazısının arkasında 3 adet video dönüşümlü olarak oynatılır.

### Video Kurulumu

1. `public/videos/` klasörüne aşağıdaki video dosyalarını yerleştirin:

   - `doner-preparation.mp4` - Döner hazırlama videosu
   - `kitchen-cooking.mp4` - Mutfakta yemek pişirme videosu
   - `food-serving.mp4` - Yemek servis videosu

2. Video özellikleri:

   - **Format**: MP4
   - **Çözünürlük**: En az 1920x1080 (Full HD)
   - **Süre**: 10-30 saniye arası
   - **Boyut**: Web için optimize edilmiş

3. Video yoksa otomatik olarak `hero-placeholder.jpg` resmi gösterilir

### Video Kontrolleri

- **Otomatik Döngü**: 6 saniyede bir video değişir
- **Manuel Kontrol**: Alt kısımdaki noktalar ile video seçimi
- **Progress Bar**: Video ilerleme göstergesi
- **Smooth Transitions**: Yumuşak geçişler

## 🛠️ Teknoloji Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: React Icons
- **Build Tool**: Vite

## 📁 Proje Yapısı

```
durumx/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── page.tsx        # Ana sayfa
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global stiller
│   └── components/         # React bileşenleri
│       ├── Hero.tsx        # Ana hero bölümü
│       ├── VideoBackground.tsx # Video arka plan
│       ├── Navbar.tsx      # Navigasyon
│       └── Footer.tsx      # Alt bilgi
├── public/                 # Statik dosyalar
│   ├── videos/            # Video dosyaları
│   ├── logo/              # Logo dosyaları
│   └── categories/        # Kategori resimleri
└── package.json           # Bağımlılıklar
```

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**

   ```bash
   npm run dev
   ```

3. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

## 📱 Responsive Tasarım

- **Desktop**: Tam özellikli video arka plan
- **Tablet**: Optimize edilmiş video performansı
- **Mobile**: Hızlı yükleme ve basitleştirilmiş animasyonlar

## 🎨 Özelleştirme

### Video Ayarları

`src/components/Hero.tsx` dosyasında video ayarlarını değiştirebilirsiniz:

```typescript
const backgroundVideos = [
  "/videos/doner-preparation.mp4",
  "/videos/kitchen-cooking.mp4",
  "/videos/food-serving.mp4",
];

// Video değişim süresi (milisaniye)
<VideoBackground videos={backgroundVideos} interval={6000} />;
```

### CSS Animasyonları

`src/app/globals.css` dosyasında video geçiş animasyonlarını özelleştirebilirsiniz.

## 🔧 Geliştirme

### Yeni Video Ekleme

1. Video dosyasını `public/videos/` klasörüne ekleyin
2. `Hero.tsx` dosyasındaki `backgroundVideos` dizisine ekleyin
3. Video otomatik olarak döngüye dahil olacaktır

### Video Formatı Değiştirme

`VideoBackground.tsx` dosyasında video formatını değiştirebilirsiniz:

```typescript
<source src={videoSrc} type="video/webm" /> // WebM formatı için
<source src={videoSrc} type="video/ogg" />  // OGG formatı için
```

## 📊 Performance

- **Lazy Loading**: Video dosyaları ihtiyaç duyulduğunda yüklenir
- **Error Handling**: Video yüklenemezse otomatik fallback
- **Mobile Optimization**: Mobil cihazlarda performans optimizasyonu
- **Smooth Transitions**: Hardware acceleration ile smooth geçişler

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallback**: Video desteklenmeyen tarayıcılarda resim gösterilir

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilir veya pull request gönderebilirsiniz.

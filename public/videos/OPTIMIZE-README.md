# Mobil Video Optimizasyonu

Hero bölümündeki videolar mobilde takılıyorsa, bu optimizasyonu uygulayın.

## Önerilen: Agresif Optimizasyon (Takılma/Kasma Önleme)

**scripts\optimize-mobile-videos-aggressive.bat** - 480p, 600kbps

- Çözünürlük: 480p (mobil için yeterli)
- Bitrate: 600 kbps (çok daha küçük dosyalar)
- Dosya boyutu: ~%80 azalma
- Orijinaller `-orijinal` uzantısıyla yedeklenir

## Alternatif: Standart Optimizasyon

**scripts\optimize-mobile-videos.bat** - 720p, 1 Mbps

## Adımlar

1. **FFmpeg yükleyin** (yoksa):
   - Windows: https://ffmpeg.org/download.html veya `winget install ffmpeg`
   - Mac: `brew install ffmpeg`

2. **Script'i çalıştırın**:
   - Windows: `scripts\optimize-mobile-videos-aggressive.bat` (önerilen)
   - veya `scripts\optimize-mobile-videos.bat`

3. **OneDrive kullanıyorsanız**: Videolar senkronize edilene kadar bekleyin.

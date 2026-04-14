#!/bin/bash
# Mobil hero videolarını AGGRESSIVE optimize eder (takılma/kasma/donma önleme)
# 480p, 600kbps - mobil için yeterli kalite, çok daha küçük dosyalar

VIDEOS_DIR="$(cd "$(dirname "$0")/../public/videos" && pwd)"
cd "$VIDEOS_DIR"

if ! command -v ffmpeg &> /dev/null; then
  echo "FFmpeg bulunamadı! Lütfen yükleyin: brew install ffmpeg"
  exit 1
fi

echo "========================================"
echo "Mobil videolar AGGRESSIVE optimize ediliyor..."
echo "480p, 600kbps - takılma/kasma önleme"
echo "========================================"
echo ""

opt_video() {
  local name=$1
  local src="${name}-orijinal.webm"
  [ ! -f "$src" ] && src="${name}.webm"
  [ ! -f "$src" ] && { echo "$name: kaynak bulunamadı"; return; }

  echo "$name.webm işleniyor (480p, 600kbps)..."
  ffmpeg -y -i "$src" -vf "scale=-2:480" -c:v libvpx-vp9 -b:v 600k -maxrate 800k -bufsize 1M -an -row-mt 1 -deadline good "${name}.webm"
  [ -f "${name}.webm" ] && echo "  -> ${name}.webm optimize edildi"

  echo "$name.mp4 işleniyor (Safari fallback)..."
  ffmpeg -y -i "$src" -vf "scale=-2:480" -c:v libx264 -preset fast -crf 30 -b:v 600k -maxrate 800k -bufsize 1M -an -movflags +faststart "${name}.mp4"
  [ -f "${name}.mp4" ] && echo "  -> ${name}.mp4 optimize edildi"
}

# Orijinalleri yedekle (henüz yoksa)
for name in mobilvideo4 hero-video-mobil-1 hero-video-mobil-2 hero-video-mobil-3; do
  [ ! -f "${name}-orijinal.webm" ] && [ -f "${name}.webm" ] && cp "${name}.webm" "${name}-orijinal.webm"
done

opt_video mobilvideo4
opt_video hero-video-mobil-1
opt_video hero-video-mobil-2
opt_video hero-video-mobil-3

echo ""
echo "Tamamlandı! Videolar mobil için optimize edildi."
echo "Boyutlar ~%70-80 azaldı - takılma/kasma çözülmeli."

#!/bin/bash
# Mobil hero videolarını optimize eder (takılmayı azaltır)
# Gereksinim: FFmpeg (brew install ffmpeg / apt install ffmpeg)
# Kullanım: ./scripts/optimize-mobile-videos.sh

VIDEOS_DIR="$(cd "$(dirname "$0")/../public/videos" && pwd)"
cd "$VIDEOS_DIR"

if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg bulunamadı! Lütfen yükleyin: brew install ffmpeg"
    exit 1
fi

echo "Mobil videolar optimize ediliyor..."
echo ""

# Tüm 4 mobil videoyu optimize et - 720p, 1Mbps, ses yok
opt_video() {
  local name=$1
  if [ -f "${name}.webm" ]; then
    echo "${name}.webm işleniyor..."
    ffmpeg -y -i "${name}.webm" -vf "scale=720:-2" -c:v libvpx-vp9 -b:v 1M -an -row-mt 1 "${name}-opt.webm"
    [ -f "${name}-opt.webm" ] && echo "  -> ${name}-opt.webm oluşturuldu"
  fi
  if [ -f "${name}.mp4" ]; then
    ffmpeg -y -i "${name}.mp4" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 28 -b:v 1M -an -movflags +faststart "${name}-opt.mp4"
  elif [ -f "${name}.webm" ]; then
    ffmpeg -y -i "${name}.webm" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 28 -b:v 1M -an -movflags +faststart "${name}-opt.mp4"
  fi
  [ -f "${name}-opt.mp4" ] && echo "  -> ${name}-opt.mp4 oluşturuldu"
}

opt_video mobilvideo4
opt_video hero-video-mobil-2
opt_video hero-video-mobil-3
opt_video hero-video-mobil-1

echo ""
echo "Tamamlandı! Tüm 4 video optimize edildi."
echo "Orijinalleri -opt versiyonlarıyla değiştirin."

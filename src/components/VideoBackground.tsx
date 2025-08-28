"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  videos: string[];
  fallbackImage?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videos, 
  fallbackImage = "/durum.png"
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const triedAutoplayRef = useRef<boolean>(false);

  useEffect(() => {
    const first = videoRefs.current[0];
    if (first && !triedAutoplayRef.current) {
      triedAutoplayRef.current = true;
      try {
        // Autoplay için güvenli öntanımlar
        first.muted = true;
        first.playsInline = true;
        first.setAttribute("muted", "");
        first.setAttribute("playsinline", "");
        first.play().catch(() => {
          // Bazı tarayıcılarda metadata gelene kadar play reddedilebilir
          setTimeout(() => first.play().catch(() => {}), 400);
        });
      } catch {}
    }

    // Güvenlik amaçlı: en geç 1.5s sonra loading'i kaldır
    const safety = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(safety);
  }, []);

  // Handle video end event to move to next video
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % videos.length;
      
      // Stop current video
      if (videoRefs.current[prevIndex]) {
        videoRefs.current[prevIndex]!.pause();
        videoRefs.current[prevIndex]!.currentTime = 0;
      }
      
      // Start next video after a short delay
      setTimeout(() => {
        if (videoRefs.current[newIndex]) {
          videoRefs.current[newIndex]!.play().catch(console.log);
        }
      }, 100);
      
      return newIndex;
    });
  };

  const handleVideoError = () => {
    console.log('Video yükleme hatası, fallback image gösteriliyor');
    setHasVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    const current = videoRefs.current[currentVideoIndex];
    if (current) {
      current.muted = true;
      current.setAttribute("muted", "");
      current.play().catch(() => {});
    }
  };

  const handleMetadataLoad = () => {
    // Metadata yüklendiğinde de loading'i bitir
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    const current = videoRefs.current[currentVideoIndex];
    if (current) {
      current.muted = true;
      current.setAttribute("muted", "");
      current.play().catch(() => {});
    }
  };

  const handleWaiting = () => {
    // Buffer beklerken oynatmayı yeniden dene
    const current = videoRefs.current[currentVideoIndex];
    if (current) {
      setTimeout(() => current.play().catch(() => {}), 300);
    }
  };

  // Video hatası varsa fallback image göster
  if (hasVideoError) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={fallbackImage}
          alt="DürümX Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Video hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {videos.map((videoSrc, index) => (
        <video
          key={`video-${index}`}
          ref={(el) => {
            if (videoRefs.current) {
              videoRefs.current[index] = el;
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentVideoIndex ? "opacity-100" : "opacity-0"
          }`}
          muted
          autoPlay={index === 0}
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          loop
          poster={fallbackImage}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          onLoadedMetadata={handleMetadataLoad}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onEnded={handleVideoEnded}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Video indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {videos.map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentVideoIndex
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoBackground;
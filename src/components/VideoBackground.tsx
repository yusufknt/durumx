"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  mobileVideos: string[];
  desktopVideos: string[];
  fallbackImage?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  mobileVideos,
  desktopVideos,
  fallbackImage = "/logo.png"
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Mobile-first: mobilde doğru videoların hemen yüklenmesi için varsayılan true
  const [isMobile, setIsMobile] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const triedAutoplayRef = useRef<boolean>(false);
  const [shouldUseStaticImage, setShouldUseStaticImage] = useState(false);
  const [supportsWebm, setSupportsWebm] = useState(true);

  // Get current videos based on screen size
  const currentVideos = isMobile ? mobileVideos : desktopVideos;

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Detect data-saver / slow connection to fall back to static image
  useEffect(() => {
    try {
      type MaybeNetworkInformation = { saveData?: boolean; effectiveType?: string } | undefined;
      const navInfo = navigator as unknown as {
        connection?: MaybeNetworkInformation;
        mozConnection?: MaybeNetworkInformation;
        webkitConnection?: MaybeNetworkInformation;
      };
      const connection = navInfo.connection || navInfo.mozConnection || navInfo.webkitConnection;
      const saveData = connection?.saveData === true;
      const slowType = connection?.effectiveType && ["slow-2g", "2g"].includes(connection.effectiveType);
      if (saveData || slowType) {
        setShouldUseStaticImage(true);
      }
    } catch {}
  }, []);

  // Detect WebM support (older Safari versions)
  useEffect(() => {
    try {
      const testVideo = document.createElement('video');
      const canPlayWebm = testVideo.canPlayType('video/webm; codecs="vp8, vorbis"') || testVideo.canPlayType('video/webm');
      setSupportsWebm(!!canPlayWebm);
    } catch {}
  }, []);

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
  }, [currentVideos]);

  // Handle video end event to move to next video
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % currentVideos.length;
      
      // First fade out current video
      setIsVideoReady(false);
      
      // Stop current video
      if (videoRefs.current[prevIndex]) {
        videoRefs.current[prevIndex]!.pause();
        videoRefs.current[prevIndex]!.currentTime = 0;
      }
      
      // Start next video and fade in after a smooth transition
      setTimeout(() => {
        if (videoRefs.current[newIndex]) {
          const nextVideo = videoRefs.current[newIndex]!;
          nextVideo.currentTime = 0;
          nextVideo.play().then(() => {
            setIsVideoReady(true);
          }).catch(console.log);
        }
      }, 200);
      
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
    setIsVideoReady(true);
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
    setIsVideoReady(true);
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
  if (hasVideoError || shouldUseStaticImage) {
    return (
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-white md:bg-black">
        <Image
          src={fallbackImage}
          alt="DürümX Hero Background"
          fill
          className="object-cover md:object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20 md:bg-black/30"></div>
      </div>
    );
  }

  // Loading state: show a lightweight spinner overlay (no poster image)
  if (isLoading) {
    return (
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-white md:bg-black flex items-center justify-center">
        <div className="text-black md:text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-black/30 md:border-white/30 border-t-black md:border-t-white mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Video hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  // Return videos for all devices (mobile and desktop)
  return (
    <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-white md:bg-black" style={{
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }}>
      {currentVideos.map((videoSrc, index) => (
        <video
          key={`video-${index}`}
          ref={(el) => {
            if (videoRefs.current) {
              videoRefs.current[index] = el;
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover md:object-cover transition-opacity duration-1000 md:translate-y-0 ${
            index === currentVideoIndex && (isVideoReady || !isLoading) ? "opacity-100" : "opacity-0"
          }`}
          muted
          autoPlay={index === currentVideoIndex}
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload={index === 0 ? "metadata" : "none"}
          disablePictureInPicture
          controls={false}
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          onLoadedMetadata={handleMetadataLoad}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onEnded={handleVideoEnded}
        >
          {supportsWebm && (
            <source src={videoSrc} type="video/webm" />
          )}
          <source src={videoSrc.replace(/\.webm$/, '.mp4')} type="video/mp4" />
        </video>
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10 md:bg-black/20"></div>
      
      {/* Video indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {currentVideos.map((_, index) => (
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
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo({ onProgress, onComplete }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const progressRef = useRef(0);
  const durationRef = useRef(0);

  // 1. Clean, original blob preloading (no jumping progress)
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/optimized_scrub.mp4', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const videoUrl = URL.createObjectURL(xhr.response);
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          setVideoLoaded(true);
          if (onComplete) onComplete();
        }
      }
    };

    xhr.send();
    return () => xhr.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Direct, lightweight scroll scrub
  useEffect(() => {
    if (!videoLoaded) return;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    let cancelled = false;
    let st;
    let tick;

    const startScrub = () => {
      durationRef.current = video.duration || 10;

      st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      let lastTarget = -1;

      tick = () => {
        if (cancelled) return;
        const progress = progressRef.current;
        const target = progress * durationRef.current;

        if (!video.seeking && Math.abs(target - lastTarget) > 0.015) {
          video.currentTime = target;
          lastTarget = target;
        }

        if (overlay) {
          const fadeStart = 0.5;
          const fadeProgress = Math.min(
            1,
            Math.max(0, (progress - fadeStart) / (1 - fadeStart))
          );

          if (fadeProgress <= 0) {
            if (overlay.style.display !== 'none') overlay.style.display = 'none';
          } else {
            if (overlay.style.display === 'none') overlay.style.display = 'block';
            overlay.style.opacity = fadeProgress;
          }
        }
      };

      gsap.ticker.add(tick);
    };

    if (video.readyState >= 1) {
      startScrub();
    } else {
      video.onloadedmetadata = startScrub;
    }

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      if (st) st.kill();
      video.onloadedmetadata = null;
    };
  }, [videoLoaded]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] object-cover"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          display: 'none',
          opacity: 0,
          backdropFilter: 'blur(24px) brightness(0.35)',
          WebkitBackdropFilter: 'blur(24px) brightness(0.35)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")',
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
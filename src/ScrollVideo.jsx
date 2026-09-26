import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo({ onProgress, onComplete }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Mutable refs read inside the render loop, so the loop never has to be
  // torn down and rebuilt just because a number changed.
  const progressRef = useRef(0);
  const durationRef = useRef(0);

  // 1. RAM BLOB PRELOADING — unchanged, this part was already solid.
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/optimized_scrub.mp4', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.floor((event.loaded / event.total) * 100);
        if (onProgress) onProgress(percent);
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

  // 2. SCROLL-DRIVEN SCRUB — rewritten for performance.
  useEffect(() => {
    if (!videoLoaded) return;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    let cancelled = false;
    let st;
    let tick;

    const startScrub = () => {
      durationRef.current = video.duration || 10;

      // Cheap: only stores a number, never touches the video or the DOM.
      st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      let lastTarget = -1;

      // One render loop drives both the video seek and the overlay fade,
      // piggybacking on the same GSAP ticker that already runs Lenis.
      tick = () => {
        if (cancelled) return;
        const progress = progressRef.current;
        const target = progress * durationRef.current;

        // THE key fix: never queue a new seek while the previous one is
        // still being decoded, and skip sub-frame-sized moves. This is
        // what stops the video from falling behind during fast scrolling.
        if (!video.seeking && Math.abs(target - lastTarget) > 0.015) {
          video.currentTime = target;
          lastTarget = target;
        }

        // Blur/darken overlay: the blur radius itself never changes, only
        // opacity does, and it's skipped entirely (display:none) for the
        // first half of the scroll — no backdrop-filter cost until needed.
        if (overlay) {
          const fadeStart = 0.5; // roughly matches the old "center center" start
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
        style={{ filter: 'contrast(1.1) saturate(1.1) brightness(0.9)' }}
      />

      {/* Static-radius blur overlay, animated by opacity only. This replaces
          animating the video's own blur radius every tick, which was the
          single most expensive thing happening on scroll. */}
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

      {/* Plain low-opacity overlay instead of mix-blend-overlay: blending
          against a video whose pixels change every frame forces a full
          recomposite each tick. A flat overlay doesn't. */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
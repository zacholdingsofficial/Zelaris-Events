import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo({ onProgress, onComplete }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const progressRef = useRef(0);
  const imagesRef = useRef([]);
  const frameCount = 240;

  // 1. ASYNCHRONOUS PROGRESSIVE PRELOADING
  useEffect(() => {
    let loadedCount = 0;
    let isCompleteTriggered = false;
    const images = [];

    // Assign the empty array to the ref immediately so the scroll logic doesn't break
    imagesRef.current = images;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, '0');
      img.src = `/frames/frame_${frameStr}.webp`;

      img.onload = () => {
        loadedCount++;
        
        if (onProgress) {
          const percent = Math.floor((loadedCount / frameCount) * 100);
          onProgress(percent);
        }
        
        // DRAW THE FIRST FRAME IMMEDIATELY
        if (i === 1) {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
        
        // UNBLOCK THE WEBSITE AFTER JUST 10 FRAMES LOAD (Lightning Fast Initial Load)
        if (loadedCount >= 10 && !isCompleteTriggered) {
          isCompleteTriggered = true;
          setImagesLoaded(true);
          if (onComplete) onComplete();
        }
      };
      
      images.push(img);
    }
  }, [onProgress, onComplete]);

  // 2. SCROLL-DRIVEN CANVAS SCRUB
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const overlay = overlayRef.current;
    
    let cancelled = false;
    let st;
    let tick;
    let lastRenderedFrame = -1;

    st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    tick = () => {
      if (cancelled) return;
      const progress = progressRef.current;

      const targetFrame = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );

      if (targetFrame !== lastRenderedFrame) {
        const img = imagesRef.current[targetFrame];
        // Only draw if the specific frame has finished downloading in the background
        if (img && img.complete) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          lastRenderedFrame = targetFrame;
        }
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

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      if (st) st.kill();
    };
  }, [imagesLoaded]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        width={3840}
        height={2160}
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
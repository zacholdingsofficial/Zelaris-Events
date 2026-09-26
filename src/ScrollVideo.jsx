import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const canvasRef = useRef(null);

  const frameCount = 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });

    if (!context) return;

    // --------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Don't allow extremely high DPR on mobile.
    const maxDpr = isMobile ? 1.25 : 1.5;

    const images = new Array(frameCount);
    const loaded = new Array(frameCount).fill(false);
    const loading = new Array(frameCount).fill(false);

    const playhead = {
      frame: 0,
    };

    let destroyed = false;
    let renderQueued = false;

    // --------------------------------------------------
    // CANVAS SIZE
    // --------------------------------------------------

    function updateCanvasSize() {
      if (destroyed) return;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      queueRender();
    }

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    function render() {
      renderQueued = false;

      if (destroyed) return;

      const index = Math.max(
        0,
        Math.min(frameCount - 1, Math.round(playhead.frame))
      );

      const img = images[index];

      if (!img || !loaded[index]) {
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imageWidth = img.naturalWidth || img.width;
      const imageHeight = img.naturalHeight || img.height;

      if (!imageWidth || !imageHeight) return;

      const hRatio = canvasWidth / imageWidth;
      const vRatio = canvasHeight / imageHeight;

      // Cover
      const ratio = Math.max(hRatio, vRatio);

      const drawWidth = imageWidth * ratio;
      const drawHeight = imageHeight * ratio;

      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

      context.fillStyle = '#000';
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      context.drawImage(
        img,
        0,
        0,
        imageWidth,
        imageHeight,
        x,
        y,
        drawWidth,
        drawHeight
      );
    }

    function queueRender() {
      if (renderQueued || destroyed) return;

      renderQueued = true;

      requestAnimationFrame(render);
    }

    // --------------------------------------------------
    // LOAD ONE FRAME
    // --------------------------------------------------

    function loadFrame(index) {
      if (
        destroyed ||
        index < 0 ||
        index >= frameCount ||
        loaded[index] ||
        loading[index]
      ) {
        return;
      }

      loading[index] = true;

      const img = new Image();

      img.decoding = 'async';

      img.src = `/frames_raw/frame_${String(index + 1).padStart(3, '0')}.png`;

      img.onload = async () => {
        if (destroyed) return;

        try {
          // Let browser decode before using the image.
          if (img.decode) {
            await img.decode();
          }
        } catch {
          // Some browsers may reject decode after load.
        }

        if (destroyed) return;

        images[index] = img;
        loaded[index] = true;
        loading[index] = false;

        // Immediately show first frame.
        if (index === 0) {
          playhead.frame = 0;
          queueRender();
        }
      };

      img.onerror = () => {
        loading[index] = false;
      };
    }

    // --------------------------------------------------
    // PROGRESSIVE PRELOADING
    // --------------------------------------------------

    let preloadIndex = 1;

    function preloadNextBatch() {
      if (destroyed) return;

      // Load only a few frames at a time.
      const batchSize = isMobile ? 3 : 6;

      let loadedThisBatch = 0;

      while (
        preloadIndex < frameCount &&
        loadedThisBatch < batchSize
      ) {
        loadFrame(preloadIndex);

        preloadIndex++;
        loadedThisBatch++;
      }

      if (preloadIndex < frameCount) {
        setTimeout(preloadNextBatch, isMobile ? 120 : 60);
      }
    }

    // --------------------------------------------------
    // PRIORITIZE FRAMES NEAR CURRENT FRAME
    // --------------------------------------------------

    function preloadAroundFrame(frame) {
      const center = Math.round(frame);

      // Load several frames around the current position.
      for (let offset = 1; offset <= 8; offset++) {
        loadFrame(center + offset);
        loadFrame(center - offset);
      }
    }

    // --------------------------------------------------
    // INITIAL FRAME
    // --------------------------------------------------

    // IMPORTANT:
    // Frame 1 is loaded FIRST before everything else.
    loadFrame(0);

    // Start progressive loading shortly after.
    const preloadTimer = setTimeout(() => {
      preloadNextBatch();
    }, 100);

    // --------------------------------------------------
    // SCROLL ANIMATION
    // --------------------------------------------------

    const scrollTween = gsap.to(playhead, {
      frame: frameCount - 1,

      snap: 'frame',

      ease: 'none',

      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,

        invalidateOnRefresh: true,

        onUpdate: self => {
          const currentFrame = Math.round(
            self.progress * (frameCount - 1)
          );

          playhead.frame = currentFrame;

          // Make sure frames around current position are available.
          preloadAroundFrame(currentFrame);

          queueRender();
        },
      },

      onUpdate: () => {
        queueRender();
      },
    });

    // --------------------------------------------------
    // BLUR / DARKEN EFFECT
    // --------------------------------------------------

    const blurTween = gsap.fromTo(
      canvas,
      {
        filter:
          'contrast(1.1) saturate(1.1) brightness(0.9) blur(0px)',
      },
      {
        filter:
          'contrast(1.1) saturate(1.1) brightness(0.3) blur(24px)',

        ease: 'power2.in',

        scrollTrigger: {
          trigger: document.body,
          start: 'center center',
          end: 'bottom bottom',
          scrub: true,

          invalidateOnRefresh: true,
        },
      }
    );

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    let resizeTimer;

    function handleResize() {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        updateCanvasSize();

        ScrollTrigger.refresh();
      }, 150);
    }

    window.addEventListener('resize', handleResize);

    // --------------------------------------------------
    // TAB / FOCUS
    // --------------------------------------------------

    function handleVisibility() {
      if (!document.hidden) {
        requestAnimationFrame(() => {
          queueRender();
        });
      }
    }

    function handleFocus() {
      queueRender();
    }

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    );

    window.addEventListener('focus', handleFocus);

    // --------------------------------------------------
    // INITIAL CANVAS SETUP
    // --------------------------------------------------

    updateCanvasSize();

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      destroyed = true;

      clearTimeout(preloadTimer);
      clearTimeout(resizeTimer);

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleFocus);

      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      );

      // IMPORTANT:
      // Only kill THIS component's animations.
      scrollTween.kill();
      blurTween.kill();

      if (scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill();
      }

      if (blurTween.scrollTrigger) {
        blurTween.scrollTrigger.kill();
      }

      // Release image references.
      for (let i = 0; i < images.length; i++) {
        images[i] = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">

      <canvas
        ref={canvasRef}
        className="w-full h-full block origin-center"
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
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
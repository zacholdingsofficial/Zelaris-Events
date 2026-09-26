import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo({ onProgress, onComplete }) {
  const canvasRef = useRef(null);
  const frameCount = 240; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    
    let lastWidth = 0; 
    const images = [];
    const playhead = { frame: 0 };
    let loadedCount = 0;

    const updateCanvasSize = () => {
      if (window.innerWidth === lastWidth && canvas.width > 0) return;
      lastWidth = window.innerWidth;

      const dpr = window.devicePixelRatio || 1;
      const paddedWidth = window.innerWidth * 1.05;
      const paddedHeight = window.innerHeight * 1.05;
      
      canvas.width = paddedWidth * dpr;
      canvas.height = paddedHeight * dpr;
      canvas.style.width = `${paddedWidth}px`;
      canvas.style.height = `${paddedHeight}px`;
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      render(); 
    };

    updateCanvasSize();

    function render() {
      if (!canvas || !context) return;
      
      // 1. SUB-FRAME BLENDING: Calculate exactly where we are between two frames
      const prevFrameIndex = Math.floor(playhead.frame);
      const nextFrameIndex = Math.min(prevFrameIndex + 1, frameCount - 1);
      
      // 'fraction' is the decimal part (e.g., if frame is 10.45, fraction is 0.45)
      const fraction = playhead.frame - prevFrameIndex;
      
      const img1 = images[prevFrameIndex];
      const img2 = images[nextFrameIndex];
      
      if (img1 && img1.complete && img1.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const hRatio = canvas.width / img1.width;
        const vRatio = canvas.height / img1.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - img1.width * ratio) / 2;
        const centerShiftY = (canvas.height - img1.height * ratio) / 2;
        
        const drawW = Math.floor(img1.width * ratio);
        const drawH = Math.floor(img1.height * ratio);
        const drawX = Math.floor(centerShiftX);
        const drawY = Math.floor(centerShiftY);

        // 2. Draw the base frame at 100% opacity
        context.globalAlpha = 1;
        context.drawImage(img1, 0, 0, img1.width, img1.height, drawX, drawY, drawW, drawH);
        
        // 3. Draw the next frame on top, fading it in based on the exact scroll decimal
        if (img2 && img2.complete && fraction > 0) {
            context.globalAlpha = fraction;
            context.drawImage(img2, 0, 0, img2.width, img2.height, drawX, drawY, drawW, drawH);
            context.globalAlpha = 1; // Reset alpha for the next render loop
        }
      }
    }

    const trackProgress = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / frameCount) * 100);
      if (onProgress) onProgress(percent);
      if (loadedCount === frameCount && onComplete) onComplete();
    };

    const loadRemainingFrames = () => {
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/frames_optimized/frame_${i.toString().padStart(3, '0')}.webp`;
        img.decode().then(trackProgress).catch(trackProgress); 
        images[i - 1] = img; 
      }
    };

    const loadFirstFrame = () => {
      const firstImg = new Image();
      
      const handleLoad = () => {
        images[0] = firstImg;
        render(); 
        trackProgress();
        loadRemainingFrames();
      };

      firstImg.onload = handleLoad;
      firstImg.src = `/frames_optimized/frame_001.webp`;
      
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        firstImg.onload = null; 
        handleLoad();
      }
    };

    loadFirstFrame();

    const tween = gsap.to(playhead, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      onUpdate: render,
    });

    const blurTween = gsap.fromTo(canvas, 
      { filter: 'contrast(1.1) saturate(1.1) brightness(0.9) blur(0px)' },
      { 
        filter: 'contrast(1.1) saturate(1.1) brightness(0.3) blur(24px)',
        ease: "power2.in",
        scrollTrigger: {
          trigger: document.body,
          start: "center center", 
          end: "bottom bottom",
          scrub: true,
        }
      }
    );

    const handleVisibility = () => {
      if (!document.hidden) requestAnimationFrame(render);
    };

    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('focus', render);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('focus', render);
      document.removeEventListener('visibilitychange', handleVisibility);
      tween.kill();
      blurTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  return (
    <div 
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none bg-cover bg-center"
      style={{ backgroundImage: 'url("/frames_optimized/frame_001.webp")' }}
    >
      <canvas ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block origin-center" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
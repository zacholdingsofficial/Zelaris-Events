import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const canvasRef = useRef(null);
  const frameCount = 240; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    
    let lastWidth = 0; 
    const images = [];
    const playhead = { frame: 0 };

    const updateCanvasSize = () => {
      if (window.innerWidth === lastWidth && canvas.width > 0) return;
      lastWidth = window.innerWidth;

      const dpr = window.devicePixelRatio || 1;
      
      // Make the canvas permanently 5% larger than the screen to hide blur edge-bleeding
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

    // FIX 1: Force the canvas to calculate its full-screen size immediately on mount, 
    // without waiting for any images to load.
    updateCanvasSize();

    function render() {
      if (!canvas || !context) return;
      
      const img = images[playhead.frame];
      
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    }

    const loadRemainingFrames = () => {
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/frames_optimized/frame_${i.toString().padStart(3, '0')}.webp`;
        images[i - 1] = img; 
      }
    };

    const loadFirstFrame = () => {
      const firstImg = new Image();
      
      // FIX 2: Define what happens when it loads FIRST
      const handleLoad = () => {
        images[0] = firstImg;
        render(); 
        loadRemainingFrames();
      };

      // Attach the listener before setting the source
      firstImg.onload = handleLoad;
      firstImg.src = `/frames_optimized/frame_001.webp`;
      
      // FIX 3: If the browser cached it instantly from our CSS background, fire it manually
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        firstImg.onload = null; // Prevent double firing
        handleLoad();
      }
    };

    loadFirstFrame();

    const tween = gsap.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, 
      },
      onUpdate: render,
    });

    const blurTween = gsap.fromTo(canvas, 
      { 
        filter: 'contrast(1.1) saturate(1.1) brightness(0.9) blur(0px)'
      },
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
      if (!document.hidden) {
        requestAnimationFrame(render);
      }
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
  }, [frameCount]);

  return (
    <div 
      className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none bg-cover bg-center"
      style={{ backgroundImage: 'url("/frames_optimized/frame_001.webp")' }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block origin-center" 
      />
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
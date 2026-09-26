import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const canvasRef = useRef(null);
  
  // Make sure this matches your exact final frame count
  const frameCount = 240; 

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // Force a redraw immediately whenever the window resizes
      render(); 
    };

    const images = [];
    const playhead = { frame: 0 };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames_raw/frame_${i.toString().padStart(3, '0')}.png`;
      images.push(img);
    }

    // Initialize size and draw the first frame once loaded
    images[0].onload = () => {
        updateCanvasSize();
    };

    function render() {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (images[playhead.frame] && images[playhead.frame].complete) {
        const img = images[playhead.frame];
        
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    }

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

    // FIX: Detect when the user switches tabs or focuses back on the window
    const handleVisibility = () => {
      if (!document.hidden) {
        // requestAnimationFrame ensures the browser has fully restored memory before drawing
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
    <div className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block origin-center" 
      />
      
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
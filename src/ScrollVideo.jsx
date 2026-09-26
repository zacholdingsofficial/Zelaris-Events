import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo({ onProgress, onComplete }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 1. RAM BLOB PRELOADING: Fetch the entire video into local memory
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/optimized_scrub.mp4', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        // Flawlessly drives your existing glassmorphism loading bar
        const percent = Math.floor((event.loaded / event.total) * 100);
        if (onProgress) onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Convert the RAM data into a local URL the video tag can instantly read
        const videoUrl = URL.createObjectURL(xhr.response);
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          setVideoLoaded(true);
          if (onComplete) onComplete();
        }
      }
    };
    
    xhr.send();

    return () => xhr.abort(); // Cleanup if the component unmounts early
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. GSAP SCROLL SCRUBBING
  useEffect(() => {
    if (!videoLoaded) return;
    const video = videoRef.current;

    const setupScrub = () => {
      // Tie the video's current time exactly to the scroll progress
      const tween = gsap.fromTo(video,
        { currentTime: 0 },
        {
          currentTime: video.duration || 10, 
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true, // Inherits the buttery sync from Lenis
          }
        }
      );

      // Maintain the cinematic blur effect at the bottom of the page
      const blurTween = gsap.fromTo(video,
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

      return () => {
        tween.kill();
        blurTween.kill();
      };
    };

    // Ensure the video metadata is ready before calculating duration
    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.onloadedmetadata = setupScrub;
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [videoLoaded]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-black overflow-hidden pointer-events-none">
      {/* 
        We use w-[105%] and h-[105%] with absolute centering to prevent 
        the blur edge-bleeding issue from earlier, without triggering a resize loop! 
      */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] object-cover"
      />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
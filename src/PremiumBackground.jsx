import { useEffect, useRef } from 'react';

export default function PremiumBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate 150 floating luxury orbs
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(217, 119, 6, ${Math.random() * 0.5 + 0.1})`, // Amber/Gold hues
        speed: Math.random() * 0.5 + 0.1,
        depth: Math.random() * 2 + 0.5, // Creates parallax depth
      });
    }

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const render = () => {
      // Clear canvas with a slight trail effect for smoothness
      ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Tie particle movement to their base speed PLUS the user's scroll position
        let currentY = p.y - (scrollY * p.depth * 0.1) - (Date.now() * p.speed * 0.05);

        // Loop particles back to the bottom when they float off the top
        currentY = ((currentY % canvas.height) + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, currentY, p.radius * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Add a premium glow to larger, closer particles
        if (p.depth > 1.5) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(217, 119, 6, 0.8)';
        } else {
            ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none" 
      style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)' }}
    />
  );
}
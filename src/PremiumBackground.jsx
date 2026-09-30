import { useEffect, useRef } from 'react';

export default function PremiumBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(217, 119, 6, ${Math.random() * 0.5 + 0.1})`,
        speed: Math.random() * 0.5 + 0.1,
        depth: Math.random() * 2 + 0.5,
      });
    }

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        let currentY = p.y - (scrollY * p.depth * 0.1) - (Date.now() * p.speed * 0.05);
        currentY = ((currentY % canvas.height) + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, currentY, p.radius * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // Removed the performance-killing ctx.shadowBlur logic here
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
    />
  );
}
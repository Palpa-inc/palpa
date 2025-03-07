"use client";

import { useEffect, useRef, useState } from "react";

export function CreativeDotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // リサイズ後に描画を確実に継続するため、一度だけdrawDotsを呼び出す
      if (!animationFrameId) {
        drawDots();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const drawDots = () => {
      if (!ctx) return;

      time += 0.005;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // アニメーションフレームIDをクリアして、次のフレームをリクエストする前に設定
      animationFrameId = 0;

      // Create a gradient for the dots
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(168, 85, 247, 0.4)"); // purple-600
      gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.4)"); // pink-500
      gradient.addColorStop(1, "rgba(234, 179, 8, 0.4)"); // yellow-500

      const spacing = 30;
      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing;
          const y = i * spacing;

          // Calculate distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          // Add some wave effect
          const wave = Math.sin(time + i * 0.2 + j * 0.3) * 2;

          // Calculate dot size based on distance from mouse and wave
          let dotSize = 1;

          if (distance < maxDistance) {
            // Increase size when mouse is near
            dotSize = 1 + (1 - distance / maxDistance) * 3 + wave;
          } else {
            // Normal size with slight wave
            dotSize = 1 + wave * 0.2;
          }

          // 負の値にならないように最小値を設定
          dotSize = Math.max(0.1, dotSize);

          // Add some random movement
          const offsetX = Math.sin(time * 2 + i) * 2;
          const offsetY = Math.cos(time * 2 + j) * 2;

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawDots);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    drawDots();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

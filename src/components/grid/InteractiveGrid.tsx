"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Grid configuration
    const colCount = 12;
    const rowSpacing = 96;

    const render = () => {
      if (!ctx) return;

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      const scrollOffset = (currentScrollY * 0.08) % rowSpacing;

      ctx.clearRect(0, 0, width, height);

      const colWidth = width / colCount;

      // 1. Draw Subtle Horizontal Engineering Lines
      const startY = -scrollOffset;
      for (let y = startY; y < height + rowSpacing; y += rowSpacing) {
        const distY = Math.abs(mouseY - y);
        const mouseProximity = Math.max(0, 1 - distY / 180);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        
        // Base light slate line, illuminated slightly near mouse
        const alpha = 0.04 + mouseProximity * 0.08;
        const blueShift = mouseProximity * 0.12;
        
        if (blueShift > 0.02) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha + blueShift})`;
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
        }
        
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Draw 12 Vertical Architectural Columns
      for (let i = 1; i < colCount; i++) {
        const x = i * colWidth;
        const distX = Math.abs(mouseX - x);
        const mouseProximity = Math.max(0, 1 - distX / 200);

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);

        // Subtly highlighted if cursor is near
        const alpha = 0.07 + mouseProximity * 0.14;
        const blueShift = mouseProximity * 0.2;

        if (blueShift > 0.03) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha + blueShift})`;
        } else {
          ctx.strokeStyle = `rgba(203, 213, 225, ${alpha})`;
        }

        ctx.lineWidth = 1;
        ctx.stroke();

        // 3. Draw Precision Technical Crosshairs at Intersections
        for (let y = startY; y < height + rowSpacing; y += rowSpacing) {
          const distCorner = Math.hypot(mouseX - x, mouseY - y);
          const cornerProximity = Math.max(0, 1 - distCorner / 160);

          const crossSize = 3;
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);

          if (cornerProximity > 0.05) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 + cornerProximity * 0.5})`;
            ctx.lineWidth = 1.2;
          } else {
            ctx.strokeStyle = `rgba(148, 163, 184, 0.22)`;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
}

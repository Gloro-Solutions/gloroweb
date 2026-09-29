"use client";

import { useEffect, useRef, useState } from "react";

export interface LaptopInteractionState {
  mouse: { x: number; y: number };
  dampedMouse: { x: number; y: number };
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function useLaptopInteraction() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const dampedMouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(checkMotion.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x, y };
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update loop for smooth damping
  const updateDamping = (ease = 0.06) => {
    if (prefersReducedMotion) {
      dampedMouseRef.current = { x: 0, y: 0 };
      return dampedMouseRef.current;
    }

    dampedMouseRef.current.x += (mouseRef.current.x - dampedMouseRef.current.x) * ease;
    dampedMouseRef.current.y += (mouseRef.current.y - dampedMouseRef.current.y) * ease;

    return dampedMouseRef.current;
  };

  return {
    mouseRef,
    dampedMouseRef,
    updateDamping,
    isMobile,
    prefersReducedMotion,
  };
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useMouseTilt<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    // Desktop only and respect reduced motion
    const isDesktop = window.innerWidth >= 1024;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || isReducedMotion) return;

    // Use GSAP quickTo for 60fps hardware-accelerated lerp
    const xTo = gsap.quickTo(el, "rotationY", {
      duration: 0.45,
      ease: "power2.out",
    });

    const yTo = gsap.quickTo(el, "rotationX", {
      duration: 0.45,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Rotate up to ~6 degrees toward cursor
      const targetRotY = normX * 6;
      const targetRotX = -normY * 5;

      xTo(targetRotY);
      yTo(targetRotX);
    };

    const handleMouseLeave = () => {
      // Smoothly reset to neutral on mouse leave
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return containerRef;
}

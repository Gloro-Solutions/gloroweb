"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseSectionParallaxOptions {
  sectionRef: React.RefObject<HTMLElement | null>;
  bgRef: React.RefObject<HTMLElement | null>;
  midRef: React.RefObject<HTMLElement | null>;
  foreRef: React.RefObject<HTMLElement | null>;
  variant?: "hero" | "web" | "applications";
}

export function useSectionParallax({
  sectionRef,
  bgRef,
  midRef,
  foreRef,
  variant = "hero",
}: UseSectionParallaxOptions) {
  const [screenState, setScreenState] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      // Fallback to static layout for accessibility
      return;
    }

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const bgEl = bgRef.current;
    const midEl = midRef.current;
    const foreEl = foreRef.current;

    const ctx = gsap.context(() => {
      // --- PHASE 3 TASK 3: Entrance Animation ---
      // Laptop scales/fades in from 90% opacity/scale as it enters viewport
      // Text staggers in with a slight y-offset
      if (midEl) {
        gsap.fromTo(
          midEl,
          { opacity: 0.9, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (foreEl) {
        const textElements = foreEl.children;
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { opacity: 0.85, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // --- PHASE 2: 3-Layer Parallax System tied strictly to section bounds ---
      const isHero = variant === "hero";
      const startPoint = isHero ? "top top" : "top bottom";
      const endPoint = "bottom top";

      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: startPoint,
          end: endPoint,
          scrub: 0.8,
          onUpdate: (self) => {
            // --- PHASE 3 TASK 2: Dynamic Screen Content State ---
            // 0 - 33% = State 0, 33 - 66% = State 1, 66 - 100% = State 2
            const p = self.progress;
            const nextState = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
            setScreenState(nextState);
          },
        },
      });

      // Layer 1: Background layer (slowest, ~0.2x speed)
      if (bgEl) {
        if (isHero) {
          parallaxTl.fromTo(
            bgEl,
            { y: 0, force3D: true },
            { y: 150, ease: "none", force3D: true },
            0
          );
        } else {
          parallaxTl.fromTo(
            bgEl,
            { y: -130, force3D: true },
            { y: 130, ease: "none", force3D: true },
            0
          );
        }
      }

      // Layer 2: Midground layer (3D laptop mockup, ~0.5x speed + subtle 2-5 deg tilt)
      if (midEl) {
        const baseRotY = variant === "applications" ? 12 : -12;
        if (isHero) {
          parallaxTl.fromTo(
            midEl,
            {
              y: 0,
              rotationX: 0,
              rotationY: baseRotY,
              force3D: true,
            },
            {
              y: 85,
              rotationX: 4.5,
              rotationY: baseRotY + 4,
              ease: "none",
              force3D: true,
            },
            0
          );
        } else {
          parallaxTl.fromTo(
            midEl,
            {
              y: -70,
              rotationX: -3.5,
              rotationY: baseRotY - 3.5,
              force3D: true,
            },
            {
              y: 70,
              rotationX: 3.5,
              rotationY: baseRotY + 3.5,
              ease: "none",
              force3D: true,
            },
            0
          );
        }
      }

      // Layer 3: Foreground layer (headings, paragraph, cards, ~1.1x speed)
      if (foreEl) {
        if (isHero) {
          parallaxTl.fromTo(
            foreEl,
            { y: 0, force3D: true },
            { y: -65, ease: "none", force3D: true },
            0
          );
        } else {
          parallaxTl.fromTo(
            foreEl,
            { y: 35, force3D: true },
            { y: -35, ease: "none", force3D: true },
            0
          );
        }
      }
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, bgRef, midRef, foreRef, variant]);

  return { screenState };
}

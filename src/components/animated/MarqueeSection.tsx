"use client";

import React, { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";

const ROW_1_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const ROW_2_IMAGES = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// Tripled lists for seamless scroll rendering
const TRIPLED_ROW_1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
const TRIPLED_ROW_2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        // Scroll offset formula from specification:
        // (window.scrollY - sectionTop + window.innerHeight) * 0.3
        const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setScrollOffset(offset);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const row1Transform = `translateX(${scrollOffset - 200}px)`;
  const row2Transform = `translateX(${-(scrollOffset - 200)}px)`;

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative z-20 bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-24 sm:pt-32 md:pt-40 pb-16 overflow-hidden select-none shadow-2xl border-t border-white/10"
    >
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 sm:mb-16">
        <FadeIn y={30} delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>// PRODUCTION REEL &amp; CASE EXPERIENCES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-kanit tracking-tight uppercase leading-tight">
                HIGH-VELOCITY <br className="hidden sm:inline" />
                <span className="hero-heading">DIGITAL EXPERIENCES.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
              Explore interactive WebGL environments, AI-powered applications, and digital engineering systems created by Gloro Solutions.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-3 w-full overflow-hidden">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{
            transform: row1Transform,
            transition: "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {TRIPLED_ROW_1.map((url, idx) => (
            <div
              key={`row1-${idx}`}
              className="group relative shrink-0 w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg shadow-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Production preview ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-300">
                  GLORO // EXP #{String((idx % 11) + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-3 whitespace-nowrap will-change-transform"
          style={{
            transform: row2Transform,
            transition: "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {TRIPLED_ROW_2.map((url, idx) => (
            <div
              key={`row2-${idx}`}
              className="group relative shrink-0 w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg shadow-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Production preview ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-300">
                  GLORO // SYS #{String((idx % 10) + 12).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

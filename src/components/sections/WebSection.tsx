"use client";

import React, { useRef } from "react";
import { Globe, Zap } from "lucide-react";
import { LaptopScene } from "@/components/three/LaptopScene";
import { useSectionParallax } from "@/components/scroll/useSectionParallax";
import { useMouseTilt } from "@/components/three/useMouseTilt";

export function WebSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const foreLayerRef = useRef<HTMLDivElement | null>(null);

  const { screenState } = useSectionParallax({
    sectionRef,
    bgRef: bgLayerRef,
    midRef: midLayerRef,
    foreRef: foreLayerRef,
    variant: "web",
  });

  const mouseTiltRef = useMouseTilt<HTMLDivElement>();

  return (
    <section
      id="web-experiences"
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 pb-10 px-5 sm:px-10 overflow-hidden select-none bg-transparent"
      aria-label="Web Experiences and Digital Engineering Section"
    >
      {/* 1. BACKGROUND PARALLAX LAYER (z-0) - Ghost outline typography */}
      <div
        ref={bgLayerRef}
        data-parallax="bg"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <h2
          className="font-black uppercase text-blue-600/[0.05] leading-none whitespace-nowrap tracking-tighter text-[26vw] sm:text-[22vw] select-none"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 85, 255, 0.18)",
          }}
        >
          WEB
        </h2>
      </div>

      {/* 2. STRICT TWO-COLUMN CONTENT GRID (Max width 7xl, Text Left, Mockup Right) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* COLUMN 1: FOREGROUND EDITORIAL CONTENT & CARDS (lg:col-span-6, z-20) */}
          <div
            ref={foreLayerRef}
            data-parallax="foreground"
            className="lg:col-span-6 flex flex-col items-start text-left relative z-20 pointer-events-auto will-change-transform"
          >
            {/* Domain Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/20 bg-blue-50/80 backdrop-blur-xs text-blue-600 text-[11px] sm:text-xs font-mono tracking-wider mb-3 sm:mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>{"01 // WEB EXPERIENCES"}</span>
            </div>

            {/* Primary Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-950 uppercase font-sans leading-[1.02]">
              INTERFACES ENGINEERED FOR SPEED, <br />
              <span className="text-blue-600">CLARITY</span> AND IMPACT.
            </h2>

            {/* Value Proposition */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 max-w-lg font-normal leading-relaxed">
              Crafting award-winning web platforms that combine high-framerate WebGL interactions,
              instantaneous response times, and editorial Swiss precision.
            </p>

            {/* Subordinate Capability Cards (Cleanly nested in Column 1 with high z-index) */}
            <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full relative z-20">
              <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 01</span>
                  <span className="text-blue-600 font-bold">60 FPS</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">WebGL Motion</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Hardware-accelerated kinetic 3D interfaces.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 02</span>
                  <span className="text-blue-600 font-bold">99.8</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Web Vitals</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Sub-second LCP &amp; instant edge delivery.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 03</span>
                  <span className="text-blue-600 font-bold">SWISS</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Precision</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Architectural grid &amp; typography discipline.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 2: MIDGROUND 3D LAPTOP MOCKUP (lg:col-span-6, z-10) */}
          <div
            ref={midLayerRef}
            data-parallax="midground"
            className="lg:col-span-6 flex items-center justify-center relative z-10 w-full h-[300px] sm:h-[380px] lg:h-[460px] max-w-full overflow-visible pointer-events-auto will-change-transform mt-4 lg:mt-0"
          >
            <div
              ref={mouseTiltRef}
              className="w-full h-full max-w-[500px] max-h-[440px] flex items-center justify-center will-change-transform"
            >
              <LaptopScene variant="web" screenState={screenState} />
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM FOOTER TELEMETRY */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-slate-200/60 font-mono text-[11px] sm:text-xs text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-3">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>STAGE: WEB PRESENTATION ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>PIPELINE: NEXT.JS // THREE.JS // GSAP</span>
          <span className="hidden sm:inline text-blue-600 font-semibold">[SCROLL TO ADVANCE]</span>
        </div>
      </div>
    </section>
  );
}

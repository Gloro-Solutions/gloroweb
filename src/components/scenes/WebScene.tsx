"use client";

import React from "react";
import { Globe, Zap } from "lucide-react";

interface WebSceneProps {
  progress: number;
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function WebScene({ progress }: WebSceneProps) {
  // WebScene enters 0.28 -> 0.38, holds 0.38 -> 0.58, exits 0.58 -> 0.66
  if (progress < 0.26 || progress > 0.68) {
    return null;
  }

  let opacity = 0;
  let translateY = 0;

  if (progress < 0.38) {
    // Eased entry from below
    const t = smoothstep(0.28, 0.38, progress);
    opacity = t;
    translateY = (1 - t) * 32;
  } else if (progress <= 0.58) {
    // Stable presentation hold
    opacity = 1;
    translateY = 0;
  } else {
    // Eased exit upward
    const t = smoothstep(0.58, 0.66, progress);
    opacity = Math.max(0, 1 - t);
    translateY = -t * 32;
  }

  // Kinetic horizontal shift for decorative background "WEB"
  const webShiftX = (progress - 0.48) * 180;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden pointer-events-none select-none transition-opacity duration-150"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {/* 1. GIANT BACKGROUND DECORATIVE "WEB" TYPOGRAPHY (z-0, decorative bleed allowed) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <h2
          className="font-black uppercase text-blue-600/[0.05] leading-none whitespace-nowrap tracking-tighter text-[28vw] sm:text-[24vw] select-none will-change-transform"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 85, 255, 0.16)",
            transform: `translate3d(${webShiftX}px, 0, 0)`,
          }}
        >
          WEB
        </h2>
      </div>

      {/* 2. FOREGROUND EDITORIAL CONTENT (Laptop on Left 0–46%, Editorial on Right 52–100%) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full h-full flex flex-col justify-between pointer-events-none">
        <div className="my-auto w-full flex items-center justify-between">
          
          {/* LEFT COLUMN SPACER: Reserved for 3D Laptop (Left zone) */}
          <div className="hidden lg:block w-[46%] pointer-events-none" />

          {/* RIGHT COLUMN: Web Editorial Content (Right zone) */}
          <div className="w-full lg:w-[48%] max-w-xl flex flex-col items-start text-left pt-2 sm:pt-0 pointer-events-auto relative z-30">
            {/* Domain Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/20 bg-blue-50/80 backdrop-blur-xs text-blue-600 text-[11px] sm:text-xs font-mono tracking-wider mb-3 sm:mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>01 // WEB EXPERIENCES</span>
            </div>

            {/* Primary Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-950 uppercase font-sans leading-[1.02]">
              INTERFACES ENGINEERED FOR SPEED, <br />
              <span className="text-blue-600">CLARITY</span> AND IMPACT.
            </h2>

            {/* Value Proposition */}
            <p className="mt-3 sm:mt-5 text-xs sm:text-base text-slate-600 max-w-lg font-normal leading-relaxed">
              Crafting award-winning web platforms that combine high-framerate WebGL interactions,
              instantaneous response times, and editorial Swiss precision.
            </p>

            {/* Subordinate Capability Cards */}
            <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
              <div className="p-3 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 01</span>
                  <span className="text-blue-600 font-bold">60 FPS</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">WebGL Motion</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Hardware-accelerated kinetic 3D systems.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 02</span>
                  <span className="text-blue-600 font-bold">99.8</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Web Vitals</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Sub-second LCP & instant edge delivery.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>CORE 03</span>
                  <span className="text-blue-600 font-bold">SWISS</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">Precision</h4>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Grid & typography architectural discipline.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM FOOTER TELEMETRY */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-slate-200/60 font-mono text-[11px] sm:text-xs text-slate-500 pointer-events-auto">
          <div className="flex items-center gap-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>STAGE: WEB PRESENTATION ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>PIPELINE: NEXT.JS // THREE.JS // GSAP</span>
            <span className="hidden sm:inline text-blue-600 font-semibold">[SCROLL TO ADVANCE]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

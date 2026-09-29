"use client";

import React from "react";
import { ArrowRight, ArrowDown, Activity, Layers, Cpu, Radio } from "lucide-react";

interface HeroSceneProps {
  progress: number;
  onStartProject: () => void;
  onExploreExpertise: () => void;
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function HeroScene({ progress, onStartProject, onExploreExpertise }: HeroSceneProps) {
  // Hero is fully visible at p <= 0.22, then smoothly dissolves up through p = 0.32
  if (progress >= 0.32) return null;

  let opacity = 1;
  let translateY = 0;

  if (progress > 0.22) {
    const t = smoothstep(0.22, 0.32, progress);
    opacity = Math.max(0, 1 - t);
    translateY = -t * 32;
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between pt-20 sm:pt-28 pb-6 sm:pb-10 px-5 sm:px-10 overflow-hidden pointer-events-none select-none transition-opacity duration-150"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: opacity > 0.3 ? "auto" : "none",
      }}
    >
      {/* 1. KINETIC BACKGROUND DISPLAY WORD */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          transform: `translate3d(-${progress * 140}px, ${progress * 30}px, 0)`,
        }}
      >
        <div className="w-full flex justify-between px-6 sm:px-12 text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300/80 mb-2">
          <span>GLORO SOLUTIONS // PRODUCTION STUDIO</span>
          <span>SYSTEM RUNTIME: 60 FPS</span>
          <span className="hidden md:inline">ARCHITECTURE: THREE.JS // NEXT.JS 16 // REACT 19</span>
        </div>

        <div className="w-full flex items-center justify-center px-4 overflow-hidden">
          <h2
            className="font-black uppercase text-blue-600/[0.06] leading-none whitespace-nowrap tracking-tighter text-[18vw] sm:text-[15vw] select-none transition-all duration-300"
            style={{
              WebkitTextStroke: "1px rgba(0, 85, 255, 0.20)",
            }}
          >
            ENGINEERING
          </h2>
        </div>

        <div className="w-full flex justify-between px-6 sm:px-12 text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300/80 mt-2">
          <span>01 / WEB EXPERIENCES</span>
          <span>02 / APPLICATIONS</span>
          <span className="hidden sm:inline">03 / CLOUD ARCHITECTURE</span>
          <span className="hidden sm:inline">04 / CONNECTED SYSTEMS</span>
        </div>
      </div>

      {/* 2. FOREGROUND EDITORIAL CONTENT (12-Column Grid with Left Headline and Right Laptop Spacer) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full h-full flex flex-col justify-between pointer-events-none">
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center w-full">
          {/* LEFT COLUMN: Swiss-Modernist Typography & Value Proposition (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pt-2 sm:pt-0 pointer-events-auto">
            {/* Domain Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/20 bg-blue-50/70 backdrop-blur-xs text-blue-600 text-[11px] sm:text-xs font-mono tracking-wider mb-3 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>00 // DIGITAL ENGINEERING STUDIO</span>
            </div>

            {/* Primary Swiss Display Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-black tracking-tight text-slate-950 leading-[0.98] uppercase font-sans">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                DIGITAL
              </span>{" "}
              <br />
              SYSTEMS.
            </h1>

            {/* High-Impact Value Proposition */}
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Gloro Solutions designs and engineers high-performance web platforms, autonomous
              applications, and connected digital products built for scale.
            </p>

            {/* Dual Primary CTA Cluster */}
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto">
              <button
                onClick={onStartProject}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-blue-600 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onExploreExpertise}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm tracking-wide shadow-xs hover:border-slate-300 transition-all duration-200 backdrop-blur-xs cursor-pointer"
              >
                <span>Explore Expertise</span>
                <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Capabilities Checklist */}
            <div className="mt-5 sm:mt-8 hidden sm:flex flex-wrap items-center gap-y-1.5 gap-x-5 text-[11px] sm:text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Awwwards-Caliber Motion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Hardware 3D Acceleration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Sub-Second Latency</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Spacer for 3D Laptop */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none" />
        </div>

        {/* 3. BOTTOM TELEMETRY BAR */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200/60 font-mono text-[11px] sm:text-xs text-slate-500 pointer-events-auto">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>ACTIVE DEPLOYMENTS: 24+</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>AVAILABILITY: Q2/Q3</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>CORE: NEXT.JS 16 // REACT 19</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span>GLOBAL EDGE MESH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

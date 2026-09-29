"use client";

import React, { useRef } from "react";
import { ArrowRight, ArrowDown, Activity, Layers, Cpu, Radio, Sparkles } from "lucide-react";
import { LaptopScene } from "@/components/three/LaptopScene";
import { useSectionParallax } from "@/components/scroll/useSectionParallax";
import { useMouseTilt } from "@/components/three/useMouseTilt";

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreExpertise: () => void;
}

export function HeroSection({ onStartProject, onExploreExpertise }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const foreLayerRef = useRef<HTMLDivElement | null>(null);

  const { screenState } = useSectionParallax({
    sectionRef,
    bgRef: bgLayerRef,
    midRef: midLayerRef,
    foreRef: foreLayerRef,
    variant: "hero",
  });

  const mouseTiltRef = useMouseTilt<HTMLDivElement>();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-5 sm:px-10 overflow-hidden select-none bg-transparent"
      aria-label="Digital Engineering Studio Hero Section"
    >
      {/* 1. BACKGROUND PARALLAX LAYER (z-0) - Ghost outline typography & telemetry */}
      <div
        ref={bgLayerRef}
        data-parallax="bg"
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full flex justify-between px-6 sm:px-12 text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300/80 mb-2">
          <span>GLORO SOLUTIONS // PRODUCTION STUDIO</span>
          <span>LAT 37.7749° N // LON 122.4194° W</span>
          <span className="hidden md:inline">ARCHITECTURE: THREE.JS // NEXT.JS 16 // REACT 19</span>
        </div>

        <div className="w-full flex items-center justify-center px-4 overflow-hidden">
          <h2
            className="font-black uppercase text-blue-600/[0.06] leading-none whitespace-nowrap tracking-tighter text-[18vw] sm:text-[15vw] select-none"
            style={{
              WebkitTextStroke: "1px rgba(37, 99, 235, 0.22)",
            }}
          >
            ENGINEERING
          </h2>
        </div>

        <div className="w-full flex justify-between px-6 sm:px-12 text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300/80 mt-2">
          <span>01 / WEB EXPERIENCES</span>
          <span>02 / AUTONOMOUS AI</span>
          <span className="hidden sm:inline">03 / CLOUD ARCHITECTURE</span>
          <span className="hidden sm:inline">04 / CONNECTED SYSTEMS</span>
        </div>
      </div>

      {/* 2. STRICT TWO-COLUMN CONTENT GRID (Max width 7xl, Content Left, Mockup Right) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* COLUMN 1: FOREGROUND TEXT CONTENT (lg:col-span-6, z-20) */}
          <div
            ref={foreLayerRef}
            data-parallax="foreground"
            className="lg:col-span-6 flex flex-col items-start text-left relative z-20 pointer-events-auto will-change-transform"
          >
            {/* Studio Meta Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200/90 text-blue-700 text-xs font-mono font-medium tracking-wide shadow-xs shadow-blue-500/10 mb-4 sm:mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="tracking-wider uppercase font-semibold text-[11px]">
                {"00 // DIGITAL ENGINEERING STUDIO"}
              </span>
            </div>

            {/* Swiss Editorial Display Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-black tracking-tight text-slate-950 leading-[0.98] uppercase font-sans mb-3 sm:mb-5">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                DIGITAL
              </span>{" "}
              <br />
              SYSTEMS.
            </h1>

            {/* Supporting Technical Statement */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed mb-6 sm:mb-8 text-balance">
              Gloro Solutions combines design, software, autonomous AI, and connected hardware to engineer modern digital experiences with mathematical precision.
            </p>

            {/* Production CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-30">
              <button
                onClick={onStartProject}
                data-cursor="hover"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreExpertise}
                data-cursor="hover"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 hover:border-slate-400 active:scale-95 flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Explore Expertise</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Studio Capability Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 sm:pt-6 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">WEB PLATFORMS</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">AI PIPELINES</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">IOT SYSTEMS</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">INTERACTION</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: MIDGROUND 3D LAPTOP MOCKUP (lg:col-span-6, z-10) */}
          <div
            ref={midLayerRef}
            data-parallax="midground"
            className="lg:col-span-6 flex items-center justify-center relative z-10 w-full h-[320px] sm:h-[400px] lg:h-[480px] max-w-full overflow-visible pointer-events-auto will-change-transform"
          >
            <div
              ref={mouseTiltRef}
              className="w-full h-full max-w-[500px] max-h-[440px] flex items-center justify-center will-change-transform"
            >
              <LaptopScene variant="hero" screenState={screenState} />
            </div>
          </div>

        </div>
      </div>

      {/* 3. HERO BOTTOM TELEMETRY BAR */}
      <div className="relative z-20 w-full max-w-7xl mx-auto pt-4 sm:pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-slate-900 font-semibold">ENGINEERING DEPLOYMENTS</span>
          </div>
          <span className="hidden md:inline text-slate-300">{"//"}</span>
          <span className="hidden md:inline">GLTF PBR 3D PIPELINE ACTIVE</span>
        </div>

        <button
          onClick={onExploreExpertise}
          className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-500 hover:text-blue-600 transition-colors animate-pulse cursor-pointer"
        >
          <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        </button>

        <div className="flex items-center gap-2 text-[11px]">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span>REAL-TIME 60 FPS // READY</span>
        </div>
      </div>
    </section>
  );
}

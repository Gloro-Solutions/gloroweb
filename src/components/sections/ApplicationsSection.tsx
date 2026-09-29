"use client";

import React, { useRef } from "react";
import { Server, Zap } from "lucide-react";
import { LaptopScene } from "@/components/three/LaptopScene";
import { useSectionParallax } from "@/components/scroll/useSectionParallax";
import { useMouseTilt } from "@/components/three/useMouseTilt";

export function ApplicationsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const foreLayerRef = useRef<HTMLDivElement | null>(null);

  const { screenState } = useSectionParallax({
    sectionRef,
    bgRef: bgLayerRef,
    midRef: midLayerRef,
    foreRef: foreLayerRef,
    variant: "applications",
  });

  const mouseTiltRef = useMouseTilt<HTMLDivElement>();

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 pb-10 px-5 sm:px-10 overflow-hidden select-none bg-transparent"
      aria-label="Applications and Autonomous Systems Section"
    >
      {/* 1. BACKGROUND PARALLAX LAYER (z-0) - Ghost outline typography */}
      <div
        ref={bgLayerRef}
        data-parallax="bg"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <h2
          className="font-black uppercase text-blue-600/[0.05] leading-none whitespace-nowrap tracking-tighter text-[19vw] sm:text-[16vw] select-none"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 85, 255, 0.16)",
          }}
        >
          APPLICATIONS
        </h2>
      </div>

      {/* 2. STRICT TWO-COLUMN CONTENT GRID (Mockup Left, Editorial Text Right) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* COLUMN 1: MIDGROUND 3D LAPTOP MOCKUP (lg:col-span-6, z-10) - On mobile appears below text */}
          <div
            ref={midLayerRef}
            data-parallax="midground"
            className="order-2 lg:order-1 lg:col-span-6 flex items-center justify-center relative z-10 w-full h-[300px] sm:h-[380px] lg:h-[460px] max-w-full overflow-visible pointer-events-auto will-change-transform mt-4 lg:mt-0"
          >
            <div
              ref={mouseTiltRef}
              className="w-full h-full max-w-[500px] max-h-[440px] flex items-center justify-center will-change-transform"
            >
              <LaptopScene variant="applications" screenState={screenState} />
            </div>
          </div>

          {/* COLUMN 2: FOREGROUND EDITORIAL CONTENT (lg:col-span-6, z-20) */}
          <div
            ref={foreLayerRef}
            data-parallax="foreground"
            className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-start text-left relative z-20 pointer-events-auto will-change-transform"
          >
            {/* Domain Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/20 bg-blue-50/80 backdrop-blur-xs text-blue-600 text-[11px] sm:text-xs font-mono tracking-wider mb-3 sm:mb-4">
              <Server className="w-3.5 h-3.5" />
              <span>{"02 // APPLICATIONS"}</span>
            </div>

            {/* Primary Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-950 uppercase font-sans leading-[1.02]">
              SOFTWARE SYSTEMS DESIGNED AROUND THE WAY PEOPLE{" "}
              <span className="text-blue-600">ACTUALLY WORK.</span>
            </h2>

            {/* Value Proposition */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 max-w-lg font-normal leading-relaxed">
              From distributed enterprise portals and real-time operations dashboards to autonomous
              agent workflows, we build fault-tolerant software engines that power core business execution.
            </p>

            {/* Enterprise Capability Matrix */}
            <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full relative z-20">
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-xs hover:border-blue-300 transition-colors">
                <div className="font-mono text-[10px] text-blue-600 font-bold mb-1">
                  {"// ARCHITECTURE 01"}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Event-Driven Workflows</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Zero-drop pipeline execution handling 148k+ operations/sec with automated failover.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-xs hover:border-blue-300 transition-colors">
                <div className="font-mono text-[10px] text-blue-600 font-bold mb-1">
                  {"// ARCHITECTURE 02"}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Real-Time State Mesh</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Sub-millisecond multi-user synchronization with conflict-free replicated data types.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM TELEMETRY FOOTER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-slate-200/60 font-mono text-[11px] sm:text-xs text-slate-500 pointer-events-auto">
        <div className="flex items-center gap-3">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>STAGE: ENTERPRISE CLOUD ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>STREAM: 148K REQ/SEC</span>
          <span className="hidden sm:inline text-blue-600 font-semibold">[NEXT: EXPERTISE MATRIX]</span>
        </div>
      </div>
    </section>
  );
}

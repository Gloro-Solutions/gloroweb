"use client";

import React from "react";
import { Server, Zap } from "lucide-react";

interface ApplicationsSceneProps {
  progress: number;
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function ApplicationsScene({ progress }: ApplicationsSceneProps) {
  // Applications active window: enters 0.60 -> 0.72, holds 0.72 -> 0.94, handoff 0.94 -> 1.00
  if (progress < 0.59) {
    return null;
  }

  // Coordinated staggered entrance progression (Section 4)
  const labelT = smoothstep(0.60, 0.65, progress);
  const headlineT = smoothstep(0.63, 0.68, progress);
  const paragraphT = smoothstep(0.66, 0.71, progress);
  const cardsT = smoothstep(0.68, 0.74, progress);

  // Overall scene container opacity & handoff
  let containerOpacity = 1;
  let containerTranslateY = 0;

  if (progress < 0.70) {
    containerOpacity = smoothstep(0.60, 0.70, progress);
  } else if (progress > 0.94) {
    const exitT = smoothstep(0.94, 1.00, progress);
    containerOpacity = Math.max(0, 1 - exitT);
    containerTranslateY = -exitT * 24;
  }

  // Kinetic horizontal translation for decorative background "APPLICATIONS"
  const appShiftX = (progress - 0.82) * -160;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden pointer-events-none select-none transition-opacity duration-150"
      style={{
        opacity: containerOpacity,
        transform: `translate3d(0, ${containerTranslateY}px, 0)`,
        pointerEvents: containerOpacity > 0.4 ? "auto" : "none",
      }}
    >
      {/* 1. GIANT BACKGROUND DECORATIVE "APPLICATIONS" DISPLAY TYPOGRAPHY */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <h2
          className="font-black uppercase text-blue-600/[0.05] leading-none whitespace-nowrap tracking-tighter text-[20vw] sm:text-[17vw] select-none will-change-transform"
          style={{
            WebkitTextStroke: "1.5px rgba(0, 85, 255, 0.16)",
            transform: `translate3d(${appShiftX}px, 0, 0)`,
          }}
        >
          APPLICATIONS
        </h2>
      </div>

      {/* 2. FOREGROUND EDITORIAL COMPOSITION: Editorial on Left (0–48%), Laptop on Right (52–100%) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full h-full flex flex-col justify-between pointer-events-none">
        <div className="my-auto w-full flex items-center justify-between">
          
          {/* LEFT COLUMN: Applications Editorial Content (Left zone) */}
          <div className="w-full lg:w-[48%] max-w-xl flex flex-col items-start text-left pointer-events-auto relative z-30">
            
            {/* Step 1: Applications Domain Badge (0.60 -> 0.65) */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-600/20 bg-blue-50/80 backdrop-blur-xs text-blue-600 text-[11px] sm:text-xs font-mono tracking-wider mb-3 sm:mb-4 will-change-transform"
              style={{
                opacity: labelT,
                transform: `translate3d(0, ${(1 - labelT) * 18}px, 0)`,
              }}
            >
              <Server className="w-3.5 h-3.5" />
              <span>02 // APPLICATIONS</span>
            </div>

            {/* Step 2: Primary Headline (0.63 -> 0.68) */}
            <h2
              className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-950 uppercase font-sans leading-[1.02] will-change-transform"
              style={{
                opacity: headlineT,
                transform: `translate3d(0, ${(1 - headlineT) * 22}px, 0)`,
              }}
            >
              SOFTWARE SYSTEMS DESIGNED AROUND THE WAY PEOPLE{" "}
              <span className="text-blue-600">ACTUALLY WORK.</span>
            </h2>

            {/* Step 3: Value Proposition Paragraph (0.66 -> 0.71) */}
            <p
              className="mt-3 sm:mt-5 text-xs sm:text-base text-slate-600 max-w-lg font-normal leading-relaxed will-change-transform"
              style={{
                opacity: paragraphT,
                transform: `translate3d(0, ${(1 - paragraphT) * 20}px, 0)`,
              }}
            >
              From distributed enterprise portals and real-time operations dashboards to autonomous
              agent workflows, we build fault-tolerant software engines that power core business execution.
            </p>

            {/* Step 4: Enterprise Architecture Cards (0.68 -> 0.74) */}
            <div
              className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full will-change-transform"
              style={{
                opacity: cardsT,
                transform: `translate3d(0, ${(1 - cardsT) * 18}px, 0)`,
              }}
            >
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-blue-300 transition-colors">
                <div className="font-mono text-[10px] text-blue-600 font-bold mb-1">
                  {"// ARCHITECTURE 01"}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">Event-Driven Workflows</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Zero-drop pipeline execution handling 148k+ operations/sec with automated failover.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-xs hover:border-blue-300 transition-colors">
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

          {/* RIGHT COLUMN SPACER: Reserved for 3D Laptop at X: 52%–100% */}
          <div className="hidden lg:block w-[46%] pointer-events-none" />

        </div>

        {/* 3. BOTTOM TELEMETRY FOOTER */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-slate-200/60 font-mono text-[11px] sm:text-xs text-slate-500 pointer-events-auto">
          <div className="flex items-center gap-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>STAGE: ENTERPRISE CLOUD ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>STREAM: 148K REQ/SEC</span>
            <span className="hidden sm:inline text-blue-600 font-semibold">[NEXT: EXPERTISE MATRIX]</span>
          </div>
        </div>

      </div>
    </div>
  );
}

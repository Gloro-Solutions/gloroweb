"use client";

import React, { useState } from "react";

export interface LaptopFallbackProps {
  variant?: "hero" | "web" | "applications";
  screenState?: number; // 0, 1, 2
  mouse?: { x: number; y: number };
  className?: string;
}

export function LaptopFallback({
  variant = "hero",
  screenState = 0,
  mouse = { x: 0, y: 0 },
  className = "",
}: LaptopFallbackProps) {
  const [, setIsHovered] = useState(false);

  // Initial tilt based on section orientation:
  // Hero & Applications sit on the right column, so face slightly left toward center (-12 deg)
  // Web sits on the left column, so faces slightly right toward center (+12 deg)
  const baseRotY = variant === "web" ? 12 : -12;
  const baseRotX = 7;

  // Add subtle cursor reaction
  const rotY = baseRotY + mouse.x * 5;
  const rotX = baseRotX - mouse.y * 3;

  return (
    <div
      className={`relative w-full h-full max-w-[520px] max-h-[440px] flex items-center justify-center select-none overflow-visible pointer-events-auto ${className}`}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive 3D Laptop Visualization"
    >
      {/* 3D Transform Pivot Group - Constrained to container */}
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform origin-center scale-[0.65] xs:scale-[0.75] sm:scale-[0.88] md:scale-95 lg:scale-100"
        style={{
          transform: `translate3d(0, 0, 0) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Contact Shadow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[340px] sm:w-[460px] h-[40px] bg-slate-950/20 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
          style={{ transform: "rotateX(90deg) translateZ(-35px)" }}
        />

        {/* SCREEN ASSEMBLY (Lid angled open at ergonomic angle) */}
        <div
          className="relative w-[340px] sm:w-[460px] h-[215px] sm:h-[290px] rounded-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 p-[7px] sm:p-[9px] shadow-2xl border border-slate-300/90"
          style={{
            transformOrigin: "bottom center",
            transform: "rotateX(-12deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inner Black Bezel */}
          <div className="relative w-full h-full rounded-xl bg-slate-950 p-2.5 sm:p-3.5 overflow-hidden border border-slate-800 flex flex-col justify-between">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[9px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="ml-2 font-bold text-slate-200 truncate">
                  GLORO // DIGITAL PLATFORM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-blue-400 font-semibold hidden sm:inline text-[10px]">
                  {variant === "hero"
                    ? "CORE: PRODUCTION LIVE"
                    : variant === "web"
                    ? "DOMAIN 01 // WEB"
                    : "DOMAIN 02 // APPLICATIONS"}
                </span>
              </div>
            </div>

            {/* Dynamic Animated Screen Content System */}
            <div className="flex-1 py-2 sm:py-3 flex flex-col justify-between relative overflow-hidden text-left">
              {/* HERO VARIANT */}
              {variant === "hero" && (
                <div className="relative h-full flex flex-col justify-between">
                  {screenState === 0 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 00 ARCHITECTURE & SYSTEMS"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        ENGINEERING DIGITAL SYSTEMS
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 max-w-[320px] line-clamp-2">
                        High-performance web applications, intelligent cloud architecture, and connected platforms.
                      </p>
                      <div className="pt-1.5 sm:pt-2 flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-slate-400">
                        <span className="text-blue-400 font-semibold">99.8 WEB VITALS</span>
                        <span>{"//"}</span>
                        <span className="text-emerald-400 font-semibold">12MS LATENCY</span>
                      </div>
                    </div>
                  )}

                  {screenState === 1 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 00 GLOBAL EDGE TELEMETRY"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        EDGE RUNTIME &amp; MESH
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-blue-400">12 REGIONS</div>
                          <div className="text-[9px] text-slate-400">Global Cluster</div>
                        </div>
                        <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-emerald-400">99.99%</div>
                          <div className="text-[9px] text-slate-400">Production SLA</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {screenState >= 2 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 00 CI/CD AUTOMATION"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        ZERO-DOWNTIME PIPELINE
                      </h4>
                      <div className="p-2 rounded bg-slate-900/95 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-0.5">
                        <div className="text-blue-400">&gt; next build --turbopack</div>
                        <div className="text-slate-400">✓ Compiled in 420ms (Static &amp; Edge)</div>
                        <div className="text-emerald-400">✓ Deployed to production edge</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WEB EXPERIENCES VARIANT */}
              {variant === "web" && (
                <div className="relative h-full flex flex-col justify-between">
                  {screenState === 0 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 01 WEB EXPERIENCES"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        60 FPS INTERACTIVE ARCHITECTURE
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-blue-400">60 FPS</div>
                          <div className="text-[9px] text-slate-400">WebGL Acceleration</div>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-blue-400">THREE.JS</div>
                          <div className="text-[9px] text-slate-400">PBR Studio Shaders</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {screenState === 1 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 01 PERFORMANCE AUDIT"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        SUB-SECOND CORE WEB VITALS
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-emerald-400">99.8 SCORE</div>
                          <div className="text-[9px] text-slate-400">Lighthouse Mobile/Desktop</div>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-blue-400">0.4s LCP</div>
                          <div className="text-[9px] text-slate-400">Instant First Paint</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {screenState >= 2 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 01 SWISS TYPOGRAPHIC DISCIPLINE"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        ARCHITECTURAL PRECISION
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        Mathematical grid alignment, responsive fluid clamp scaling, and editorial polish.
                      </p>
                      <div className="text-[9px] font-mono text-blue-400">
                        GRID SYSTEM // 12-COL HARMONY
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* APPLICATIONS VARIANT */}
              {variant === "applications" && (
                <div className="relative h-full flex flex-col justify-between">
                  {screenState === 0 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                          {"// 02 ENTERPRISE CLOUD OS"}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400">148K REQ/S</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        DISTRIBUTED SYSTEMS DASHBOARD
                      </h4>
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                          <div className="text-[10px] font-mono text-blue-400 font-bold">24 NODES</div>
                          <div className="text-[8px] text-slate-400">Active Workflows</div>
                        </div>
                        <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                          <div className="text-[10px] font-mono text-emerald-400 font-bold">148k/s</div>
                          <div className="text-[8px] text-slate-400">Throughput</div>
                        </div>
                        <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                          <div className="text-[10px] font-mono text-blue-400 font-bold">12 AGENTS</div>
                          <div className="text-[8px] text-slate-400">AI Cluster</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {screenState === 1 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 02 REAL-TIME STATE MESH"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        EVENT-DRIVEN STREAMING
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-blue-400">&lt; 1ms</div>
                          <div className="text-[9px] text-slate-400">State Replication</div>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="text-xs font-mono font-bold text-emerald-400">0 LOSS</div>
                          <div className="text-[9px] text-slate-400">Backpressure Fault Tol.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {screenState >= 2 && (
                    <div className="space-y-1.5 sm:space-y-2 animate-fadeIn">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        {"// 02 AUTONOMOUS REASONING"}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                        ENTERPRISE AI ORCHESTRATION
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        Distributed agents executing autonomous workflow synthesis with continuous compliance.
                      </p>
                      <div className="text-[9px] font-mono text-blue-400">
                        STATUS: ALL 12 WORKERS HEALTHY
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Runtime Indicator */}
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  RUNTIME: ACTIVE
                </span>
                <span className="text-blue-400 font-medium">GLORO ENGINE v4.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* KEYBOARD BASE */}
        <div
          className="relative w-[350px] sm:w-[480px] h-[175px] sm:h-[235px] -mt-[10px] rounded-b-2xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 shadow-xl border border-slate-300 p-2"
          style={{
            transformOrigin: "top center",
            transform: "rotateX(78deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Keyboard Recess */}
          <div className="w-[84%] h-[50%] mx-auto mt-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center">
            <span className="text-[8px] font-mono text-slate-500">PRECISION KEYBOARD MESH</span>
          </div>
          {/* Trackpad */}
          <div className="w-[32%] h-[32%] mx-auto mt-3 rounded-md bg-slate-200/60 border border-slate-300 shadow-inner" />
        </div>
      </div>
    </div>
  );
}

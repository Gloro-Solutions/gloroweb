"use client";

import React, { useRef } from "react";
import { LaptopScene } from "@/components/three/LaptopScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { WebScene } from "@/components/scenes/WebScene";
import { ApplicationsScene } from "@/components/scenes/ApplicationsScene";
import { useScrollProgress } from "./useScrollProgress";

interface ScrollExperienceProps {
  onStartProject: () => void;
  onExploreExpertise: () => void;
}

export function ScrollExperience({ onStartProject, onExploreExpertise }: ScrollExperienceProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { progress, progressRef } = useScrollProgress(containerRef);

  // Chapter state for subtle side ticker
  const currentChapter =
    progress < 0.32
      ? "00 // HERO"
      : progress < 0.65
      ? "01 // WEB EXPERIENCES"
      : "02 // APPLICATIONS";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[700vh] bg-transparent"
      aria-label="Gloro Solutions Cinematic Digital Journey"
    >
      {/* Sticky Full-Viewport Cinematic Stage (100vh pinned) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        
        {/* Subtle Side Chapter Progress Indicator (Desktop Only) */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3 pointer-events-none"
          aria-hidden="true"
        >
          <div className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">
            {currentChapter}
          </div>
          <div className="w-24 h-1 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-75 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <div className="text-[9px] font-mono text-slate-400">
            STAGE PROGRESS: {Math.round(progress * 100)}%
          </div>
        </div>

        {/* 1. SINGLE PERSISTENT 3D LAPTOP WEBGL CANVAS (z-10) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: progress > 0.96 ? Math.max(0, 1 - (progress - 0.96) / 0.04) : 1,
          }}
        >
          <LaptopScene scrollProgressRef={progressRef} currentProgress={progress} />
        </div>

        {/* 2. OVERLAY DOM SCENES (z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Scene 01: Hero */}
          <HeroScene
            progress={progress}
            onStartProject={onStartProject}
            onExploreExpertise={onExploreExpertise}
          />

          {/* Scene 02: Web Experiences */}
          <WebScene progress={progress} />

          {/* Scene 03: Applications */}
          <ApplicationsScene progress={progress} />
        </div>
      </div>
    </section>
  );
}

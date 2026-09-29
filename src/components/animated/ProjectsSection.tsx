"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";

interface ProjectItem {
  num: string;
  category: string;
  name: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveUrl?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    num: "01",
    category: "Client // WebGL Platform",
    name: "Nextlevel Studio",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    liveUrl: "#",
  },
  {
    num: "02",
    category: "Enterprise // AI Automation",
    name: "Aura Systems",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    liveUrl: "#",
  },
  {
    num: "03",
    category: "Global // Cloud Infrastructure",
    name: "Solaris Cloud",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    liveUrl: "#",
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onLiveClick?: () => void;
}

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  onLiveClick,
}: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[85vh] sm:min-h-[90vh] flex items-start justify-center sticky"
      style={{ top: `calc(5rem + ${index * 28}px)` }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl shadow-black/80 overflow-hidden"
      >
        {/* TOP ROW: Number, Category, Name, Live Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-kanit font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-blue-400 font-semibold">
                {project.category}
              </span>
              <h3 className="font-kanit font-medium uppercase text-white text-lg sm:text-2xl md:text-3xl tracking-tight mt-0.5">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="self-end sm:self-center">
            <LiveProjectButton
              label="Live Project"
              onClick={onLiveClick}
            />
          </div>
        </div>

        {/* BOTTOM ROW: Two-column image grid (Left 40% with 2 stacked images, Right 60% with 1 tall image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6 flex-1 min-h-0">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-slate-900 border border-white/10 relative"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-slate-900 border border-white/10 relative"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image */}
          <div className="md:col-span-7 h-full min-h-[260px] sm:min-h-[320px] md:min-h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-slate-900 border border-white/10 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2Img}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ProjectsSectionProps {
  onStartProject?: () => void;
}

export function ProjectsSection({ onStartProject }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = PROJECTS_DATA.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 pb-32 px-4 sm:px-8 md:px-10 overflow-visible"
    >
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-12 sm:mb-20 text-center">
        <FadeIn delay={0} y={40}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-4">
            <span>// 04 SELECTED WORK &amp; SYSTEMS</span>
          </div>
          <h2
            className="hero-heading font-kanit font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {/* 3 Sticky-Stacking Project Cards */}
      <div className="relative max-w-6xl mx-auto flex flex-col gap-12 sm:gap-20">
        {PROJECTS_DATA.map((project, idx) => {
          // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
          const targetScale = 1 - (totalCards - 1 - idx) * 0.03;
          const range: [number, number] = [idx * 0.25, 1];

          return (
            <ProjectCard
              key={project.num}
              project={project}
              index={idx}
              totalCards={totalCards}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              onLiveClick={onStartProject}
            />
          );
        })}
      </div>
    </section>
  );
}

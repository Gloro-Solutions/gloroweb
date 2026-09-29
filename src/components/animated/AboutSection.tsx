"use client";

import React from "react";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";
import { Cpu, Layers, ShieldCheck, Zap } from "lucide-react";

interface AboutSectionProps {
  onStartProject?: () => void;
}

export function AboutSection({ onStartProject }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 4 HIGH-TECH 3D / ARCHITECTURAL CORNER FLOATING ACCENTS WITH MAGNET */}
      
      {/* Top-Left: Kinetic 3D Architecture Node */}
      <div className="absolute top-[6%] left-[3%] sm:left-[5%] md:left-[8%] z-10 pointer-events-auto">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <Magnet padding={120} strength={3.5}>
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 group hover:border-blue-500/50 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">01 // LAYER</span>
                <span className="text-xs font-bold text-white tracking-tight">Kinetic 3D Systems</span>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom-Left: Autonomous Intelligence Node */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[5%] md:left-[8%] z-10 pointer-events-auto">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <Magnet padding={120} strength={3.5}>
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 group hover:border-blue-500/50 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">02 // COGNITION</span>
                <span className="text-xs font-bold text-white tracking-tight">Autonomous Pipelines</span>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Top-Right: Resilient Cloud Mesh Node */}
      <div className="absolute top-[6%] right-[3%] sm:right-[5%] md:right-[8%] z-10 pointer-events-auto">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <Magnet padding={120} strength={3.5}>
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 group hover:border-blue-500/50 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">03 // EDGE</span>
                <span className="text-xs font-bold text-white tracking-tight">Zero-Drop Telemetry</span>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom-Right: Mission-Critical Security Node */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[5%] md:right-[8%] z-10 pointer-events-auto">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <Magnet padding={120} strength={3.5}>
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 group hover:border-blue-500/50 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">04 // INTEGRITY</span>
                <span className="text-xs font-bold text-white tracking-tight">Enterprise Standard</span>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* CENTER CONTENT STACK */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-12">
        {/* Subtle Domain Tag */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>// 03 STUDIO PHILOSOPHY &amp; CRAFT</span>
          </div>
        </FadeIn>

        {/* Heading: ABOUT GLORO SOLUTIONS */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-kanit font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(2.75rem, 9vw, 130px)" }}
          >
            About Gloro
          </h2>
        </FadeIn>

        {/* Gap between heading & text */}
        <div className="h-8 sm:h-12 md:h-14" />

        {/* Animated paragraph: character-by-character scroll opacity reveal */}
        <AnimatedText
          text="With extensive mastery in modern digital engineering, Gloro Solutions architects high-performance web systems, autonomous AI agent pipelines, and resilient cloud infrastructure. We partner with ambitious enterprises that aim to stand out, command authority, and execute at peak velocity. Let's engineer something extraordinary together!"
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px] mx-auto text-[clamp(1rem,1.8vw,1.35rem)]"
        />

        {/* Gap between text block and button */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton
            onClick={onStartProject}
            label="Start a Project"
          />
        </FadeIn>
      </div>
    </section>
  );
}

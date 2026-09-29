"use client";

import React from "react";
import { Cloud, Cpu, Layers, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function CapabilitiesSection() {

  const pillars = [
    {
      id: "01",
      title: "Web Experiences & Digital Engineering",
      badge: "Core Capability",
      desc: "Hyper-fast, immersive digital products built with Next.js, React 19, WebGL, and state-of-the-art interactive architectures that elevate brands above competitors.",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      features: [
        "Headless & composable architectures",
        "Kinetic typography & 3D WebGL interactions",
        "Awwwards-quality interaction design",
        "Ultra-low latency Core Web Vitals",
      ],
    },
    {
      id: "02",
      title: "Intelligent Automation & AI Systems",
      badge: "Autonomous Systems",
      desc: "Enterprise LLM pipelines, autonomous reasoning agents, and automated data pipelines designed to eliminate friction and compound operational velocity.",
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      features: [
        "Domain-specific LLM fine-tuning & RAG",
        "Autonomous multi-agent orchestration",
        "Automated operational pipelines",
        "Intelligent document & vision systems",
      ],
    },
    {
      id: "03",
      title: "Cloud Architecture & Infrastructure",
      badge: "Distributed Systems",
      desc: "Resilient, auto-scaling distributed architectures engineered for zero downtime, global edge delivery, and mission-critical enterprise reliability.",
      icon: <Cloud className="w-5 h-5 text-blue-600" />,
      features: [
        "Multi-cloud & edge deployment networks",
        "Kubernetes & serverless computing",
        "Continuous compliance monitoring",
        "Real-time telemetry and observability",
      ],
    },
    {
      id: "04",
      title: "Physical IoT & Embedded Systems",
      badge: "Connected Hardware",
      desc: "End-to-end IoT engineering linking physical sensor arrays, edge microcontrollers, and cloud telemetry into unified digital ecosystems.",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      features: [
        "Hardware-to-cloud bidirectional messaging",
        "Low-power edge signal processing",
        "Device fleet lifecycle management",
        "Industrial telemetry & analytics",
      ],
    },
  ];

  const fullServices = [
    { num: "01", name: "Modern Website Development", cat: "Engineering" },
    { num: "02", name: "Interactive Web Design", cat: "Design" },
    { num: "03", name: "Application Development", cat: "Full-Stack" },
    { num: "04", name: "AI Automation & Pipelines", cat: "Intelligence" },
    { num: "05", name: "IoT Device Systems", cat: "Hardware" },
    { num: "06", name: "Digital Production & Visuals", cat: "Creative" },
    { num: "07", name: "Custom Software Systems", cat: "Enterprise" },
  ];

  return (
    <section id="expertise" className="relative z-10 py-24 px-6 sm:px-10 border-t border-slate-200/80 bg-white/70 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-600 uppercase font-semibold mb-3">
              <span>{"// 01 ARCHITECTURE & SYSTEMS"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              ENGINEERED FOR <br className="hidden sm:inline" />
              <span className="text-blue-600">THE NEXT ERA.</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            We bridge the gap between rigorous engineering precision and award-winning creative technology to deliver high-impact digital experiences.
          </p>
        </div>

        {/* 4 Interactive Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="group relative p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              data-cursor="hover"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      SYS // {pillar.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold tracking-wide">
                      {pillar.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-2">
                {pillar.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Services Matrix */}
        <div id="services" className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 overflow-hidden relative">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div>
              <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-medium">
                Comprehensive Engineering Services
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Capabilities Matrix
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ACTIVE CLIENT SERVICES</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
            {fullServices.map((srv) => (
              <div
                key={srv.num}
                className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 hover:bg-white/10 transition-all cursor-pointer"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-blue-400 font-bold">{srv.num}</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {srv.name}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

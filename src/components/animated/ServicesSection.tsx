"use client";

import React from "react";
import { FadeIn } from "./FadeIn";

const SERVICES_DATA = [
  {
    num: "01",
    name: "Web Experiences & Digital Engineering",
    desc: "Creation of hyper-fast, immersive digital platforms and applications tailored to specific client needs, combining Next.js, React 19, and hardware-accelerated 3D WebGL interactions.",
  },
  {
    num: "02",
    name: "Intelligent Automation & AI Systems",
    desc: "Autonomous reasoning agents, domain-specific LLM fine-tuning, and automated data pipelines designed to eliminate operational friction and compound enterprise velocity.",
  },
  {
    num: "03",
    name: "Cloud Architecture & Infrastructure",
    desc: "Resilient, auto-scaling distributed architectures engineered for zero downtime, global edge delivery, multi-region failover, and mission-critical reliability.",
  },
  {
    num: "04",
    name: "Physical IoT & Embedded Systems",
    desc: "End-to-end IoT engineering linking physical sensor arrays, edge microcontrollers, and real-time cloud telemetry into unified digital ecosystems.",
  },
  {
    num: "05",
    name: "Custom Software Systems",
    desc: "Designing clean, modern, and conversion-focused applications and fault-tolerant software engines that power core business execution.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-20 bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden shadow-2xl"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-16 sm:mb-20 md:mb-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-600/20 bg-blue-50 text-blue-600 font-mono text-xs uppercase tracking-wider mb-4">
              <span>// 03 CORE CAPABILITIES</span>
            </div>
            <h2
              className="font-kanit font-black uppercase text-[#0C0C0C] leading-none tracking-tight text-center"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Services
            </h2>
          </div>
        </FadeIn>

        {/* 5 Service Items in Vertical List */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((srv, idx) => (
            <FadeIn key={srv.num} delay={idx * 0.1} y={30}>
              <div
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-slate-50/80 px-4 sm:px-6 rounded-2xl"
                data-cursor="hover"
              >
                {/* Number on Left */}
                <div
                  className="font-kanit font-black text-[#0C0C0C] group-hover:text-blue-600 transition-colors duration-300 leading-none shrink-0"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {srv.num}
                </div>

                {/* Name + Description on Right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1">
                  <h3
                    className="font-kanit font-medium uppercase text-slate-950 group-hover:text-blue-600 transition-colors duration-300 leading-tight"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {srv.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-slate-900 opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]"
                  >
                    {srv.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

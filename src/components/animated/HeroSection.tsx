"use client";

import React from "react";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { ContactButton } from "./ContactButton";

interface HeroSectionProps {
  onStartProject?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function HeroSection({ onStartProject, onNavigateSection }: HeroSectionProps) {
  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === "contact") {
      onStartProject?.();
      return;
    }
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero-animated"
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 select-none"
    >
      {/* 1. TOP NAVBAR */}
      <FadeIn delay={0} y={-20} className="w-full pt-6 md:pt-8 z-30">
        <nav className="w-full flex items-center justify-between">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* 2. MASSIVE HERO HEADING */}
      <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-0 text-center">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1
            className="hero-heading font-kanit font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] select-none"
          >
            Hi, we&apos;re gloro
          </h1>
        </FadeIn>
      </div>

      {/* 3. CENTER HERO PORTRAIT / 3D VISUAL WITH MAGNET */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full h-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Gloro Solutions Creator Visual"
              loading="eager"
              className="w-full h-auto object-contain filter drop-shadow-2xl pointer-events-none select-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. BOTTOM BAR: Left Text + Right Contact Button */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 z-20">
        {/* Left Statement */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] select-none"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a digital engineering studio driven by crafting striking and unforgettable systems
          </p>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton
            onClick={onStartProject}
            label="Contact Us"
          />
        </FadeIn>
      </div>
    </section>
  );
}

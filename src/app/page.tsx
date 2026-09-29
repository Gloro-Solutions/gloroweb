"use client";

import React, { useState } from "react";
import { CustomCursor } from "@/components/common/CustomCursor";
import { InteractiveGrid } from "@/components/grid/InteractiveGrid";
import { Navbar } from "@/components/nav/Navbar";
import { SocialRail } from "@/components/nav/SocialRail";
import { ScrollExperience } from "@/components/scroll/ScrollExperience";
import { MarqueeSection } from "@/components/animated/MarqueeSection";
import { AboutSection } from "@/components/animated/AboutSection";
import { ServicesSection } from "@/components/animated/ServicesSection";
import { ProjectsSection } from "@/components/animated/ProjectsSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { Footer } from "@/components/footer/Footer";
import { ProjectInquiryModal } from "@/components/modals/ProjectInquiryModal";
import { SmoothScroll } from "@/components/common/SmoothScroll";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleNavigateSection = (section: string) => {
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (section === "contact") {
      setIsInquiryOpen(true);
      return;
    }

    const container = document.getElementById("hero");
    if (container) {
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (section === "web-experiences") {
        window.scrollTo({ top: totalScrollable * 0.45, behavior: "smooth" });
        return;
      }
      if (section === "applications") {
        window.scrollTo({ top: totalScrollable * 0.78, behavior: "smooth" });
        return;
      }
    }

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-clip font-sans selection:bg-blue-600 selection:text-white">
      {/* 0. Momentum Lenis Smooth Scroll System */}
      <SmoothScroll />
      
      {/* 1. Subtle Precision Cursor for Desktop */}
      <CustomCursor />

      {/* 2. Interactive Engineering Grid Canvas */}
      <InteractiveGrid />

      {/* 3. Architectural Left Social Rail (Desktop Only) */}
      <SocialRail />

      {/* 4. Sticky Translucent Navigation */}
      <Navbar
        onStartProject={() => setIsInquiryOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 5. Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-between overflow-x-clip">
        {/* Flagship Section 01: Continuous Cinematic 3D Journey (Hero -> Web Experiences -> Applications) */}
        <ScrollExperience
          onStartProject={() => setIsInquiryOpen(true)}
          onExploreExpertise={() => handleNavigateSection("showcase")}
        />

        {/* Section 02: Marquee Dual-Row Scroll Section (Production Showcase) */}
        <MarqueeSection />

        {/* Section 03: About Section with Character Scroll Opacity Reveal & High-Tech 3D Nodes */}
        <AboutSection onStartProject={() => setIsInquiryOpen(true)} />

        {/* Section 04: Services Section with Editorial Numbered Hierarchy (01-05) */}
        <ServicesSection />

        {/* Section 05: Projects Section with Sticky Stacking Cards */}
        <ProjectsSection onStartProject={() => setIsInquiryOpen(true)} />

        {/* Section 06: Studio Capabilities & Systems Matrix */}
        <div id="expertise" className="relative z-20 bg-white">
          <CapabilitiesSection />
        </div>
      </main>

      {/* 6. Clean Engineering Footer */}
      <Footer />

      {/* 7. Production Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}

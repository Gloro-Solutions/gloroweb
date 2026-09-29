"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onStartProject: () => void;
  onNavigateSection?: (section: string) => void;
}

export function Navbar({ onStartProject, onNavigateSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Showcase", href: "#showcase" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Expertise", href: "#expertise" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs shadow-slate-900/5 py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Official Brand Logo & Name */}
        <a
          href="#hero"
          onClick={(e) => {
            if (onNavigateSection) {
              e.preventDefault();
              onNavigateSection("hero");
            }
          }}
          className="flex items-center gap-3.5 group focus:outline-none"
          data-cursor="hover"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-slate-200/80 shadow-xs transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/brand/Logo.png"
              alt="Gloro Solutions Logo"
              width={36}
              height={36}
              className="w-8 h-8 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                GLORO <span className="text-blue-600 font-black">SOLUTIONS</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
              Digital Engineering Studio
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600 tracking-wider uppercase">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (onNavigateSection) {
                  e.preventDefault();
                  onNavigateSection(item.href.replace("#", ""));
                }
              }}
              className="relative py-1 text-slate-600 hover:text-slate-950 transition-colors duration-150 group"
              data-cursor="hover"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action & System Status */}
        <div className="flex items-center gap-4">
          
          {/* Engineering System Badge (Desktop) */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/90 text-[11px] font-mono font-medium text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>STUDIO // ONLINE</span>
          </div>

          {/* Primary Production CTA */}
          <button
            onClick={onStartProject}
            data-cursor="hover"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-6 py-5 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection(item.href.replace("#", ""));
                  }
                }}
                className="py-2 border-b border-slate-100 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="mt-2 w-full py-3 rounded-xl bg-blue-600 text-white text-center font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

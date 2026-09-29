"use client";

import React from "react";

interface ContactButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export function ContactButton({
  onClick,
  label = "Start a Project",
  className = "",
}: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className={`group relative rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: "linear-gradient(123deg, #051336 7%, #0252FF 37%, #2563EB 72%, #00D4FF 100%)",
        boxShadow: "0px 4px 18px rgba(2, 82, 255, 0.45), inset 4px 4px 14px rgba(0, 212, 255, 0.4)",
        outline: "2px solid rgba(255, 255, 255, 0.9)",
        outlineOffset: "-3px",
      }}
    >
      <span className="relative z-10 flex items-center gap-2 drop-shadow-xs">
        {label}
      </span>
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}

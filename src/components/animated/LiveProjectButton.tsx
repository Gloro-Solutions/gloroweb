"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  className?: string;
}

export function LiveProjectButton({
  onClick,
  href,
  label = "Live Project",
  className = "",
}: LiveProjectButtonProps) {
  const content = (
    <>
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  const baseClasses = `group inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:border-white hover:text-white cursor-pointer active:scale-95 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className={baseClasses}
    >
      {content}
    </button>
  );
}

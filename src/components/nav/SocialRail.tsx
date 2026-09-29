"use client";

import React from "react";
import { Mail } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export function SocialRail() {
  const verifiedChannels = [
    { label: "GitHub", href: "https://github.com/Gloro-Solutions", icon: <GithubIcon /> },
    { label: "Direct Mail", href: "mailto:contact@glorosolutions.com", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside
      aria-label="Studio Connect"
      className="hidden lg:flex fixed left-7 top-1/2 -translate-y-1/2 flex-col items-center gap-7 z-30 pointer-events-auto"
    >
      {/* Top technical tick line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-300 to-slate-400/50" />

      {verifiedChannels.map((item, idx) => (
        <React.Fragment key={item.label}>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            data-cursor="hover"
            className="group flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-slate-400 hover:text-blue-600 transition-all duration-200 writing-mode-vertical"
          >
            <span className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all -rotate-90">
              {item.icon}
            </span>
            <span className="group-hover:translate-y-0.5 transition-transform">
              {item.label}
            </span>
          </a>
          {idx < verifiedChannels.length - 1 && (
            <span className="w-1 h-1 rounded-full bg-slate-300/80 group-hover:bg-blue-400 transition-colors" />
          )}
        </React.Fragment>
      ))}

      {/* Bottom technical coordinate label */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-slate-300 to-slate-400/50" />
      <span className="text-[9px] font-mono text-slate-400/70 -rotate-90 tracking-tighter">
        45°N / 73°W
      </span>
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  X,
  Sparkles,
  Layers,
  Cloud,
  Cpu,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

// Official Social SVG Icons
function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 500);
  };

  const capabilities = [
    {
      icon: <Cloud className="w-5 h-5 text-blue-600" />,
      title: "Cloud & Infrastructure",
      desc: "Resilient, auto-scaling distributed systems engineered for mission-critical enterprise reliability."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      title: "Intelligent Automation & AI",
      desc: "Custom LLM pipelines, intelligent agents, and automated workflows designed to accelerate business speed."
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: "Modern Web Engineering",
      desc: "Hyper-fast, responsive digital products built with Next.js, React 19, and state-of-the-art architectures."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: "Zero-Trust Security",
      desc: "Hardened security architecture, continuous compliance monitoring, and robust data protection."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Architectural Vertical Grid Lines */}
      <div className="grid-lines-bg z-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-line-col hidden sm:block" />
        ))}
      </div>

      {/* Main Card / Full Container */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        
        {/* Top Navigation Bar */}
        <header className="w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
            
            {/* Official Gloro Solutions Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/brand/Logo.png"
                  alt="Gloro Solutions Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                  GLORO <span className="text-blue-600 font-bold">SOLUTIONS</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  Digital Engineering
                </span>
              </div>
            </div>

            {/* Center Navigation Links (Clean Editorial Style) */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 tracking-wide">
              <span className="text-blue-600 cursor-default">Home</span>
              <span className="hover:text-slate-900 transition-colors cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                Expertise
              </span>
              <span className="hover:text-slate-900 transition-colors cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                Roadmap
              </span>
              <a href="mailto:contact@glorosolutions.com" className="hover:text-slate-900 transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Action Button (Royal Blue Pill) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Notify Me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Center Hero Section */}
        <main className="flex-1 relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20 min-h-[580px]">
          
          {/* Left Vertical Social Rail (Matching Reference Image Style) */}
          <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-30 text-[11px] font-medium text-slate-400">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 writing-mode-vertical"
            >
              <FacebookIcon /> Facebook
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 writing-mode-vertical"
            >
              <TwitterIcon /> X (Twitter)
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 writing-mode-vertical"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <a 
              href="https://github.com/Gloro-Solutions" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 writing-mode-vertical"
            >
              <GithubIcon /> GitHub
            </a>
          </aside>

          {/* GIANT TYPOGRAPHY: "DEVELOPMENT" (Edge-to-Edge in Royal Electric Blue) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0 px-2 sm:px-6">
            <h2 className="font-black uppercase tracking-tighter text-blue-600 opacity-95 text-[15vw] sm:text-[14vw] md:text-[13vw] leading-none whitespace-nowrap drop-shadow-sm">
              DEVELOPMENT
            </h2>
          </div>

          {/* FOREGROUND HEADLINE: "Website under Development" (Without Center Lines) */}
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse-dot"></span>
              <span>SYSTEM UNDER ACTIVE BUILD</span>
            </div>

            {/* Center Clean Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
              Website under <br />
              <span className="text-slate-900">Development</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
              Gloro Solutions is engineering next-generation cloud architectures, autonomous AI pipelines, and digital software ecosystems.
            </p>

            {/* In-Page Quick Notification Form */}
            <div className="w-full max-w-md">
              {!submitted ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl bg-white border border-slate-300 shadow-xl shadow-slate-200/50">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter work email for early access..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Notify Me
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>You're on the priority notification list! We'll alert you on launch.</span>
                </div>
              )}
            </div>

            {/* Toggle Capabilities Preview Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>{showDetails ? "Hide Capabilities" : "Preview What We're Building"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
            </button>

          </div>

          {/* Expandable Core Capabilities Section */}
          {showDetails && (
            <div className="relative z-20 w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left animate-fadeIn">
              {capabilities.map((cap, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                    {cap.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{cap.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          )}

        </main>

        {/* Bottom Strip / Footer */}
        <footer className="w-full border-t border-slate-200/70 bg-white/90 backdrop-blur-sm py-6 z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Image
                  src="/brand/Logo.png"
                  alt="Gloro Solutions Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-medium text-slate-700">&copy; {new Date().getFullYear()} Gloro Solutions.</span>
              <span>All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/Gloro-Solutions" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a 
                href="mailto:contact@glorosolutions.com" 
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@glorosolutions.com
              </a>
            </div>
          </div>
        </footer>

      </div>

      {/* Modal / Popup for "Notify Me" */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Get Early Access</h3>
                <p className="text-xs text-slate-500">Be notified when Gloro Solutions officially launches</p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Register for Launch Notification"
                  )}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm font-medium text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-blue-600 mx-auto" />
                <p>Thank you! Your email is registered for our public launch announcement.</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-2 text-xs font-semibold text-blue-700 underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

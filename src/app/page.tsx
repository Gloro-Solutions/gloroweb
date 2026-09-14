"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Cloud,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Mail,
  Activity,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Globe,
  Lock,
  ChevronRight
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"capabilities" | "milestones">("capabilities");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 600);
  };

  const capabilities = [
    {
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      title: "Cloud & Distributed Systems",
      desc: "Architecting hyper-resilient, auto-scaling multi-cloud infrastructures built for zero-downtime mission-critical workloads."
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Intelligent AI & Autonomous Automation",
      desc: "Custom LLM orchestration, agentic pipelines, and autonomous workflow engines designed to accelerate operational velocity."
    },
    {
      icon: <Layers className="w-5 h-5 text-sky-400" />,
      title: "Modern Web & Enterprise Software",
      desc: "High-performance, reactive digital applications built with modern frontend architectures and uncompromising UX standards."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Zero-Trust Security & Compliance",
      desc: "Hardened security architecture, automated threat mitigation, and strict data sovereignty embedded into every layer."
    }
  ];

  const milestones = [
    { name: "Core Architecture & Cloud Mesh", status: "100%", phase: "Completed", tag: "Infrastructure" },
    { name: "Identity & Zero-Trust Security Fabric", status: "100%", phase: "Completed", tag: "Security" },
    { name: "Autonomous AI Engine & API Gateway", status: "92%", phase: "In Progress", tag: "AI Engine" },
    { name: "Public Client Portal & Developer Docs", status: "70%", phase: "Final Polish", tag: "Experience" }
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Background Ambience & Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0"></div>
      <div className="fixed top-[-10%] left-[20%] w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0"></div>
      <div className="fixed top-[30%] right-[-5%] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0"></div>
      <div className="fixed bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Main Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <header className="border-b border-white/5 bg-[#030712]/75 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Official Logo & Brand Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Image
                  src="/brand/Logo.png"
                  alt="Gloro Solutions Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
                  GLORO <span className="text-cyan-400 font-semibold text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">SOLUTIONS</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wide">Innovating Digital Frontiers</span>
              </div>
            </div>

            {/* Live Indicator & Quick Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System v0.9 • Active Build
              </div>

              <a
                href="https://github.com/Gloro-Solutions/gloroweb"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-medium text-slate-200"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 max-w-5xl mx-auto px-6 pt-14 pb-20 flex flex-col items-center text-center justify-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium tracking-wide mb-8 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WEBSITE CURRENTLY UNDER DEVELOPMENT</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.12] mb-6">
            Engineering the Next Era of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Intelligent Platforms
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-light">
            Gloro Solutions is developing a unified platform for enterprise cloud infrastructure, autonomous AI agents, and high-performance digital engineering. Our public website will be live shortly.
          </p>

          {/* Official Brand Banner Showcase */}
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl shadow-cyan-950/40 mb-12 relative group">
            <div className="relative aspect-[16/6] sm:aspect-[21/7] w-full overflow-hidden">
              <Image
                src="/brand/LinkedIn Cover.png"
                alt="Gloro Solutions Brand Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30"></div>
              
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Digital Presence — Launching Soon</span>
              </div>
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="w-full max-w-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-10 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-3">
              <span className="flex items-center gap-2 text-cyan-400">
                <Activity className="w-4 h-4" /> Platform Launch Readiness
              </span>
              <span className="font-mono text-white font-semibold">88% Ready</span>
            </div>
            
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden p-[1px] border border-white/10">
              <div
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-cyan-500/50"
                style={{ width: "88%" }}
              ></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/5 text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500 block">Status</span>
                <span className="text-emerald-400 font-medium">In Development</span>
              </div>
              <div>
                <span className="text-slate-500 block">Security</span>
                <span className="text-slate-200 font-medium">Hardened</span>
              </div>
              <div>
                <span className="text-slate-500 block">Stack</span>
                <span className="text-cyan-400 font-medium">Next.js 16 + React 19</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target</span>
                <span className="text-slate-200 font-medium">Public Beta</span>
              </div>
            </div>
          </div>

          {/* Notification Form */}
          <div className="w-full max-w-md mb-16">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Get Notified
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Thank you! We will alert you the moment the full platform goes live.</span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2.5">
              Strict privacy. We only send notification of our public launch.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-xl mb-8">
            <button
              onClick={() => setActiveTab("capabilities")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "capabilities"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Core Capabilities
            </button>
            <button
              onClick={() => setActiveTab("milestones")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "milestones"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Launch Roadmap
            </button>
          </div>

          {/* Capabilities Cards */}
          {activeTab === "capabilities" && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Milestones Roadmap */}
          {activeTab === "milestones" && (
            <div className="w-full max-w-2xl space-y-3 text-left">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="text-cyan-400 font-mono">{m.tag}</span>
                      <span>•</span>
                      <span>Progress: {m.status}</span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        m.phase === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      }`}
                    >
                      {m.phase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#030712]/85 backdrop-blur-md py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 rounded-md overflow-hidden bg-white/5 p-0.5">
                <Image
                  src="/brand/Logo.png"
                  alt="Gloro Solutions Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span>&copy; {new Date().getFullYear()} Gloro Solutions. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Gloro-Solutions"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href="mailto:contact@glorosolutions.com"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Us
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

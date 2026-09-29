"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2, Send } from "lucide-react";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Web Experiences");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    // Launch mailto client with structured project brief
    const subject = encodeURIComponent(`Project Inquiry: ${name} — ${service}`);
    const body = encodeURIComponent(
      `Client Name: ${name}\nClient Email: ${email}\nService Required: ${service}\n\nProject Brief:\n${message || "N/A"}\n\nSent via Gloro Solutions Engineering Portal.`
    );
    window.location.href = `mailto:contact@glorosolutions.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/45 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-slate-200/90 text-left transition-all transform animate-scaleUp"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="hover"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
              {"// ENGINEERING ENGAGEMENT"}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Start a Project
            </h3>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Connect directly with our engineering team to discuss web platforms, AI pipelines, IoT devices, or custom digital systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Architecture / Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
              >
                <option value="Web Experiences & Platforms">01 // Web Experiences & Platforms</option>
                <option value="Application Development">02 // Modern Application Development</option>
                <option value="AI Automation & Pipelines">03 // AI Automation & Pipelines</option>
                <option value="Physical IoT Systems">04 // Physical IoT & Connected Systems</option>
                <option value="Digital Production & Visuals">05 // Digital Production & Visuals</option>
                <option value="Custom Software Systems">06 // Custom Enterprise Software</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Overview (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your objectives, architecture needs, or timeframe..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              data-cursor="hover"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20 active:scale-[0.99]"
            >
              <span>Transmit Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] font-mono text-center text-slate-400">
              Direct routing to contact@glorosolutions.com // NDA protected.
            </p>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Inquiry Draft Prepared
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been formulated. If your mail client did not open automatically, you can reach us directly at{" "}
              <a
                href="mailto:contact@glorosolutions.com"
                className="text-blue-600 font-semibold underline"
              >
                contact@glorosolutions.com
              </a>.
            </p>
            <button
              onClick={onClose}
              data-cursor="hover"
              className="mt-4 px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

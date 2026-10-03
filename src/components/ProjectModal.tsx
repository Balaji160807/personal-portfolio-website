import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Wrench, Shield, ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0E0E10]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-black/10 shadow-2xl z-10 flex flex-col"
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#0E0E10] text-white">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-mono text-[#FF2E93] font-semibold tracking-wider uppercase">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full hover:bg-black/5 text-gray-700 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Title & Tagline */}
            <div>
              <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#0E0E10] uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-base sm:text-lg font-medium text-gray-600">
                {project.tagline}
              </p>
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-black/8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-black/10 text-xs font-mono text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Problem & Goal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/60">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>THE ENGINEERING PROBLEM</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans">
                  {caseStudy.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-2">
                  <Shield className="w-4 h-4" />
                  <span>THE OBJECTIVE / GOAL</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans">
                  {caseStudy.goal}
                </p>
              </div>
            </div>

            {/* Architecture Overview */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-black/8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF2E93] uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>ARCHITECTURE OVERVIEW</span>
              </div>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-sans">
                {caseStudy.architectureOverview}
              </p>
            </div>

            {/* Implementation Details */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0E0E10] uppercase tracking-wider mb-4">
                <Wrench className="w-4 h-4 text-[#FF2E93]" />
                <span>IMPLEMENTATION METHODOLOGY</span>
              </div>
              <div className="space-y-3">
                {caseStudy.implementation.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/8 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#FF2E93] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Challenges Solved */}
            <div>
              <div className="text-xs font-mono font-bold text-[#0E0E10] uppercase tracking-wider mb-3">
                CRITICAL ENGINEERING CHALLENGES:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.engineeringChallenges.map((challenge, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-black/5 text-xs text-gray-700 leading-relaxed">
                    <strong className="text-black block mb-1 font-mono">CHALLENGE 0{idx + 1}:</strong>
                    {challenge}
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome & Impact */}
            <div className="p-6 rounded-2xl bg-[#0E0E10] text-white">
              <span className="text-xs font-mono font-bold text-[#FF2E93] uppercase tracking-widest block mb-1">
                SYSTEM OUTCOME & RELIABILITY IMPACT
              </span>
              <p className="text-base sm:text-lg font-display font-medium text-white leading-snug">
                {caseStudy.outcome}
              </p>
            </div>

            {/* Code / Demo CTA Bar */}
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-gray-600 text-center sm:text-left">
                <span className="font-bold text-gray-900 block">CASE STUDY STATUS: {caseStudy.status}</span>
                <span>Repositories & live cluster demonstrations available upon interview request.</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#0E0E10] hover:bg-[#FF2E93] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1.5"
                >
                  <span>REQUEST TECHNICAL DEEP-DIVE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

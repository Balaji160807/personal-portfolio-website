import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowUpRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { CLOUD_THOUGHTS } from '../data/portfolioData';

export const CloudThoughts: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const topicPills = [
    'Kubernetes',
    'AWS Architecture',
    'Cloud Security',
    'Infrastructure as Code',
    'CI/CD Pipelines',
    'Linux Internals',
    'DevOps Automation',
    'Backend Systems',
    'Observability',
    'System Reliability',
  ];

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                ENGINEERING LOG & PERSPECTIVES
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0E0E10] uppercase">
              CLOUD THOUGHTS
            </h2>
          </div>

          <p className="text-base sm:text-lg font-normal text-gray-600 max-w-md">
            Architectural principles, system trade-offs, and lessons learned while building in the cloud.
          </p>
        </div>

        {/* Topics Cloud Pills */}
        <div className="pt-8 pb-4">
          <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
            TECHNICAL DOMAINS UNDER INVESTIGATION:
          </div>
          <div className="flex flex-wrap gap-2">
            {topicPills.map((topic) => (
              <span
                key={topic}
                className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-mono font-medium text-gray-800 shadow-sm hover:border-[#FF2E93] hover:text-[#FF2E93] transition-colors select-none"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Articles / Thoughts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {CLOUD_THOUGHTS.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => toggleExpand(item.id)}
                className="group p-7 sm:p-8 rounded-3xl bg-white border border-black/10 hover:border-[#FF2E93] transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Category & Read Time */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/8 text-xs font-mono">
                    <span className="font-bold text-[#FF2E93] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-gray-400">{item.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#0E0E10] tracking-tight mt-4 group-hover:text-[#0E0E10] leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  {/* Expandable Key Takeaways */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-black/5 space-y-2 overflow-hidden"
                      >
                        <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                          KEY ARCHITECTURAL HIGHLIGHTS:
                        </span>
                        {item.keyPoints.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs font-sans text-gray-700">
                            <span className="text-[#FF2E93] font-bold">›</span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-gray-900 group-hover:text-[#FF2E93] transition-colors">
                  <span>{isExpanded ? 'COLLAPSE BRIEF' : 'EXPAND ARCHITECTURAL BRIEF'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

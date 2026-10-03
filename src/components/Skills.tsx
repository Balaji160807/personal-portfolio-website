import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Cpu, Terminal, Network, Database, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cloud,
  Cpu,
  Terminal,
  Network,
  Database,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                TECHNICAL CAPABILITIES
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0E0E10] uppercase">
              SKILLS
            </h2>
          </div>

          <p className="text-base sm:text-lg font-normal text-gray-600 max-w-md">
            Technologies, infrastructure patterns, and engineering domains I am actively building with daily.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 my-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-[#0E0E10] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-black/10 hover:border-[#FF2E93]'
            }`}
          >
            ALL CAPABILITIES (05)
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0E0E10] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-black/10 hover:border-[#FF2E93]'
              }`}
            >
              CARD {cat.number} — {cat.category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredCategories.map((card, idx) => {
            const Icon = iconMap[card.iconName] || Cloud;
            const isWide = idx === 0 && activeCategory === 'all';

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group relative p-7 md:p-8 rounded-3xl bg-white border border-black/10 hover:border-[#FF2E93] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Top Row: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-black/8">
                    <span className="font-mono text-3xl md:text-4xl font-black text-gray-300 group-hover:text-[#FF2E93] transition-colors">
                      {card.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-black/[0.03] group-hover:bg-[#FF2E93]/10 text-gray-700 group-hover:text-[#FF2E93] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category Name & Description */}
                  <div className="pt-6">
                    <h3 className="font-display font-black text-xl md:text-2xl text-[#0E0E10] uppercase tracking-tight group-hover:text-[#0E0E10]">
                      {card.category}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>

                  {/* Core Capabilities List */}
                  <div className="mt-6 pt-4 border-t border-black/5 space-y-2">
                    <span className="text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wider block">
                      Core Implementation Focus:
                    </span>
                    {card.coreCapabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs font-sans text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2E93] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Tags */}
                <div className="pt-8 mt-6 border-t border-black/8">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                    TECHNICAL TAGS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-black/8 text-[11px] font-mono text-gray-800 group-hover:border-[#FF2E93]/30 transition-colors select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle Accent Bottom Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#FF2E93] transition-colors rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

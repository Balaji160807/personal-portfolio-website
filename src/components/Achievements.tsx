import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, MapPin, Sparkles, Briefcase } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                INTERNSHIPS, HONORS & TECHNICAL IMMERSIONS
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0E0E10] uppercase">
              ACHIEVEMENTS
            </h2>
          </div>

          <p className="text-base sm:text-lg font-normal text-gray-600 max-w-md">
            Engineering internships, hackathons, and technical presentations.
          </p>
        </div>

        {/* Large Numbered Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-white border border-black/10 hover:border-[#FF2E93] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Number & Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-black/8">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-gray-300 group-hover:text-[#FF2E93] transition-colors">
                    {item.number}
                  </span>

                  {item.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-black/10 text-xs font-mono font-bold text-gray-900 group-hover:border-[#FF2E93]/40 group-hover:text-[#FF2E93] transition-colors">
                      {item.category.includes('INTERNSHIP') ? (
                        <Briefcase className="w-3.5 h-3.5 text-[#FF2E93]" />
                      ) : (
                        <Trophy className="w-3.5 h-3.5 text-[#FF2E93]" />
                      )}
                      <span>{item.badge}</span>
                    </span>
                  )}
                </div>

                {/* Title & Organization */}
                <div className="pt-6">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-gray-400 font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#0E0E10] uppercase tracking-tight leading-snug group-hover:text-[#0E0E10]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF2E93]" />
                    <span>{item.organization} • {item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>VERIFIED RECORD</span>
                <span className="text-[#FF2E93] group-hover:translate-x-1 transition-transform">
                  COIMBATORE / CHENNAI →
                </span>
              </div>

              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-transparent group-hover:bg-[#FF2E93] transition-colors rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

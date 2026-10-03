import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                ACADEMIC FOUNDATION
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#0E0E10] uppercase tracking-tight">
              EDUCATION
            </h2>
          </div>

          <p className="text-xs font-mono text-gray-500 max-w-xs">
            B.TECH INFORMATION TECHNOLOGY // COIMBATORE, TAMIL NADU
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pt-12">
          {/* Vertical Track Line */}
          <div className="absolute left-4 sm:left-8 top-12 bottom-4 w-px bg-black/10" />

          <div className="space-y-8">
            {EDUCATION_DATA.map((item, idx) => {
              const isCurrent = idx === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12 sm:pl-20 group"
                >
                  {/* Timeline Node Point */}
                  <div
                    className={`absolute left-4 sm:left-8 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#FF2E93] border-[#FF2E93] ring-4 ring-[#FF2E93]/20'
                        : 'bg-white border-black/30 group-hover:border-[#FF2E93]'
                    }`}
                  />

                  {/* Card Content */}
                  <div
                    className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-white border-black/15 shadow-md hover:border-[#FF2E93]'
                        : 'bg-white/80 border-black/8 hover:border-black/20 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#FF2E93]" />
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-gray-900">
                          {item.period}
                        </span>
                      </div>

                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[11px] font-mono font-bold self-start sm:self-auto">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          UNDERGRADUATE CANDIDATE
                        </span>
                      ) : (
                        item.score && (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FAF9F6] border border-black/10 text-xs font-mono font-bold text-gray-800 self-start sm:self-auto">
                            SCORE: {item.score}
                          </span>
                        )
                      )}
                    </div>

                    <div className="pt-4">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-[#0E0E10] tracking-tight">
                        {item.degree}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm font-sans font-medium text-gray-700 mt-1">
                        <GraduationCap className="w-4 h-4 text-[#FF2E93]" />
                        <span>{item.institution}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono text-gray-500 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>

                      {item.highlight && (
                        <p className="mt-3 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed border-t border-black/5 pt-3">
                          {item.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

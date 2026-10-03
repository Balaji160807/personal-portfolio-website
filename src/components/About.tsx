import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Building2, Calendar, Target, Code2, Sparkles, ShieldCheck, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const handsOnTech = [
    'AWS',
    'Linux',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Cloud Security',
    'Infrastructure Automation',
    'Monitoring',
    'Backend Development',
  ];

  const metadataBlocks = [
    {
      label: 'LOCATION',
      value: 'Coimbatore, Tamil Nadu',
      sub: 'India (Open to Remote / Relocation)',
      icon: MapPin,
    },
    {
      label: 'INTERNSHIP',
      value: '15-Day AI Internship',
      sub: 'CIT Coimbatore (Artificial Intelligence)',
      icon: Briefcase,
    },
    {
      label: 'EDUCATION',
      value: 'B.Tech Information Technology',
      sub: 'Undergraduate Degree',
      icon: GraduationCap,
    },
    {
      label: 'UNIVERSITY',
      value: 'Dr. N.G.P. Institute of Technology',
      sub: 'Coimbatore, Tamil Nadu',
      icon: Building2,
    },
    {
      label: 'GRADUATION',
      value: '2028 Expected',
      sub: 'Third-Year B.Tech IT Student',
      icon: Calendar,
    },
    {
      label: 'CURRENT FOCUS',
      value: 'Cloud Engineering + DevOps + Backend',
      sub: 'AWS • K8s • Linux • Reliability',
      icon: Target,
      highlight: true,
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                ENGINEERING PROFILE
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0E0E10] uppercase">
              ABOUT
            </h2>
          </div>

          <div className="text-xs font-mono text-gray-500 max-w-xs">
            BALAJI R // ASPIRING CLOUD & DEVOPS ENGINEER // FOCUSING ON SCALABLE PLATFORMS
          </div>
        </div>

        {/* Asymmetric Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          {/* Left Column: Narrative & Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#0E0E10] leading-snug">
              I'm <span className="font-bold text-black underline decoration-[#FF2E93] decoration-2 underline-offset-4">Balaji R</span>, a third-year B.Tech Information Technology student with hands-on experience including a{' '}
              <span className="text-[#FF2E93] font-bold">15-day AI internship at CIT Coimbatore</span>, focused on{' '}
              <span className="text-[#FF2E93] font-bold">cloud engineering</span>, infrastructure automation, DevOps and backend systems.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-sans">
              I focus on the intersection of cloud architectures, container orchestration, and continuous deployment. Rather than treating infrastructure as an afterthought, I engineer cloud platforms with high availability, declarative configs, least-privilege security, and resilient failover built-in from day one.
            </p>

            {/* Hands-on Stack Badges */}
            <div className="pt-2">
              <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>HANDS-ON BUILDING EXPERIENCE:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {handsOnTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 hover:border-[#FF2E93] hover:text-[#FF2E93] text-xs font-mono font-medium text-[#18181B] transition-all shadow-sm select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages & Interests Strip */}
            <div className="mt-2 p-5 rounded-2xl bg-white border border-black/8 shadow-sm flex flex-col sm:flex-row justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-400 block mb-1">LANGUAGES</span>
                <span className="font-semibold text-gray-800">
                  {PERSONAL_INFO.languages.join(' • ')}
                </span>
              </div>
              <div className="sm:border-l sm:border-black/10 sm:pl-6">
                <span className="text-gray-400 block mb-1">PERSONAL INTERESTS</span>
                <span className="font-semibold text-gray-800">
                  {PERSONAL_INFO.interests.join(' • ')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Portrait Card + 5 Metadata Blocks */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Asymmetric Personal Portrait Card in About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 rounded-3xl bg-white border border-black/10 shadow-sm flex items-center gap-5 overflow-hidden group hover:border-[#FF2E93]/40 transition-all"
            >
              {/* Bust crop thumbnail */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF9F6] to-gray-200 border border-black/5 relative">
                <img
                  src="/images/balaji-portrait.png"
                  alt="Balaji R portrait"
                  width={140}
                  height={180}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bio summary alongside crop */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF2E93] font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93]" />
                  <span>OFFICIAL PORTRAIT</span>
                </div>
                <h3 className="font-display font-black text-lg text-[#0E0E10] tracking-tight">
                  BALAJI R
                </h3>
                <p className="text-xs text-gray-600 font-sans leading-snug">
                  Third-year B.Tech IT scholar at Dr. N.G.P. iTech, actively building cloud automation & DevOps architectures.
                </p>
                <div className="pt-1 text-[11px] font-mono text-gray-500">
                  Coimbatore • 2024–2028
                </div>
              </div>
            </motion.div>

            {/* 5 Metadata Blocks */}
            {metadataBlocks.map((block, idx) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-md ${
                    block.highlight
                      ? 'bg-[#0E0E10] text-white border-[#0E0E10]'
                      : 'bg-white text-[#0E0E10] border-black/8 hover:border-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${
                          block.highlight ? 'text-[#FF2E93]' : 'text-gray-400'
                        }`}
                      >
                        {block.label}
                      </span>
                      <h4
                        className={`text-base sm:text-lg font-display font-bold mt-0.5 ${
                          block.highlight ? 'text-white' : 'text-[#0E0E10]'
                        }`}
                      >
                        {block.value}
                      </h4>
                      <p
                        className={`text-xs font-sans mt-0.5 ${
                          block.highlight ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {block.sub}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl ${
                        block.highlight
                          ? 'bg-white/10 text-[#FF2E93]'
                          : 'bg-black/[0.04] text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
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

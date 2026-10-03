import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Sparkles, Shield, Cpu, Activity, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { ArchitectureVisualizer } from './ArchitectureVisualizer';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured' | 'cloud' | 'monitoring'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'featured') return p.featured;
    if (filter === 'cloud') return p.tags.includes('AWS') || p.tags.includes('Kubernetes');
    if (filter === 'monitoring') return p.tags.includes('Monitoring') || p.tags.includes('Observability');
    return true;
  });

  return (
    <section id="projects" className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                ENGINEERING PLATFORMS & WORKLOADS
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0E0E10] uppercase">
              PROJECTS
            </h2>
          </div>

          <div>
            <p className="text-base sm:text-lg font-normal text-gray-600 max-w-md">
              Engineering systems, infrastructure blueprints, and platforms engineered for reliability, security, and automation.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 my-8">
          {[
            { id: 'all', label: 'ALL WORKLOADS (05)' },
            { id: 'featured', label: 'FEATURED ARCHITECTURES (02)' },
            { id: 'cloud', label: 'AWS & KUBERNETES' },
            { id: 'monitoring', label: 'MONITORING & TELEMETRY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                filter === tab.id
                  ? 'bg-[#0E0E10] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-black/10 hover:border-[#FF2E93]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-12 pt-4">
          {/* PROJECT 01 — Featured Dominant Card */}
          {filteredProjects.find((p) => p.id === 'self-healing-kubernetes') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-cursor="project"
              className="group relative p-6 sm:p-8 md:p-12 rounded-3xl bg-white border border-black/10 hover:border-[#FF2E93] transition-all duration-300 shadow-sm hover:shadow-2xl"
            >
              {/* Card Meta & Number Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-gray-300 group-hover:text-[#FF2E93] transition-colors">
                    01
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0E0E10] text-white tracking-wider uppercase">
                    CLOUD / KUBERNETES / DEVOPS
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    AUTONOMOUS HEALING
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(PROJECTS[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF9F6] border border-black/10 group-hover:bg-[#FF2E93] group-hover:text-white group-hover:border-[#FF2E93] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 self-start sm:self-auto"
                >
                  <span>INSPECT FULL CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Title & Description */}
              <div className="pt-8">
                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#0E0E10] uppercase tracking-tight leading-none group-hover:text-[#0E0E10]">
                  SELF-HEALING KUBERNETES PLATFORM
                </h3>
                <p className="mt-4 text-base sm:text-xl font-medium text-gray-700 max-w-3xl leading-relaxed">
                  A cloud-native platform focused on workload reliability, automated recovery, container orchestration and reducing manual operational intervention.
                </p>
              </div>

              {/* Interactive Architecture Visualization Component */}
              <ArchitectureVisualizer type="kubernetes" />

              {/* Bottom Tags & Case Study CTA */}
              <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {PROJECTS[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-[#FAF9F6] border border-black/8 text-xs font-mono text-gray-800 select-none group-hover:border-[#FF2E93]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(PROJECTS[0])}
                    className="text-xs font-mono font-bold text-[#FF2E93] hover:underline uppercase flex items-center gap-1"
                  >
                    <span>VIEW PROBLEM & ARCHITECTURE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-transparent group-hover:bg-[#FF2E93] transition-colors rounded-full" />
            </motion.div>
          )}

          {/* PROJECT 02 — Featured AWS Infrastructure Platform */}
          {filteredProjects.find((p) => p.id === 'cloud-infrastructure-platform') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-cursor="project"
              className="group relative p-6 sm:p-8 md:p-12 rounded-3xl bg-white border border-black/10 hover:border-[#FF9900] transition-all duration-300 shadow-sm hover:shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-gray-300 group-hover:text-[#FF9900] transition-colors">
                    02
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#232F3E] text-[#FF9900] tracking-wider uppercase">
                    AWS / INFRASTRUCTURE / DEVOPS
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                    MULTI-AZ CLUSTER
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(PROJECTS[1])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF9F6] border border-black/10 group-hover:bg-[#0E0E10] group-hover:text-[#FF9900] group-hover:border-black text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 self-start sm:self-auto"
                >
                  <span>INSPECT FULL CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              <div className="pt-8">
                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#0E0E10] uppercase tracking-tight leading-none group-hover:text-[#0E0E10]">
                  CLOUD INFRASTRUCTURE PLATFORM
                </h3>
                <p className="mt-4 text-base sm:text-xl font-medium text-gray-700 max-w-3xl leading-relaxed">
                  A cloud infrastructure platform focused on repeatable provisioning, secure resource management, scalability, automation and operational visibility.
                </p>
              </div>

              {/* AWS Architecture Diagram Component */}
              <ArchitectureVisualizer type="aws" />

              <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {PROJECTS[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-[#FAF9F6] border border-black/8 text-xs font-mono text-gray-800 select-none group-hover:border-[#FF9900]/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(PROJECTS[1])}
                  className="text-xs font-mono font-bold text-[#FF9900] hover:underline uppercase flex items-center gap-1"
                >
                  <span>VIEW VPC TOPOLOGY & SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-transparent group-hover:bg-[#FF9900] transition-colors rounded-full" />
            </motion.div>
          )}

          {/* PROJECTS 03, 04, 05 — Sleek Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {filteredProjects
              .filter((p) => p.id !== 'self-healing-kubernetes' && p.id !== 'cloud-infrastructure-platform')
              .map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  data-cursor="project"
                  onClick={() => setSelectedProject(project)}
                  className="group relative p-7 rounded-3xl bg-white border border-black/10 hover:border-[#FF2E93] transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between pb-5 border-b border-black/8">
                      <span className="font-mono text-2xl font-black text-gray-300 group-hover:text-[#FF2E93] transition-colors">
                        {project.number}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF9F6] text-gray-700 border border-black/8 uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="pt-6">
                      <h4 className="font-display font-bold text-xl md:text-2xl text-[#0E0E10] uppercase tracking-tight group-hover:text-[#FF2E93] transition-colors">
                        {project.title}
                      </h4>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and CTA */}
                  <div className="pt-6 mt-6 border-t border-black/8">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-black/8 text-[11px] font-mono text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-900 group-hover:text-[#FF2E93] transition-colors">
                      <span>OPEN DOSSIER</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-transparent group-hover:bg-[#FF2E93] transition-colors rounded-full" />
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

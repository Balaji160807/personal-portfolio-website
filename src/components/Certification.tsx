import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CheckCircle, Clock, ShieldCheck, BookOpen } from 'lucide-react';

export const Certification: React.FC = () => {
  const syllabusAreas = [
    'AWS Global Infrastructure & Multi-AZ Resiliency',
    'Core Services: EC2 Compute, S3 Storage, VPC Networking',
    'Security & Compliance: AWS IAM & Shared Responsibility Model',
    'Cloud Economics, Billing, and AWS Pricing Calculators',
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-t border-black/8">
      <div className="max-w-7xl mx-auto">
        {/* Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-12 rounded-3xl bg-white border border-[#FF9900]/30 shadow-md overflow-hidden"
        >
          {/* Subtle AWS amber gradient aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left: Badge & Info */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FF9900]" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF9900] uppercase">
                  CREDENTIAL TRACK & CONTINUOUS LEARNING
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0E0E10] uppercase tracking-tight">
                  AWS CERTIFIED CLOUD PRACTITIONER
                </h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-mono font-bold tracking-wider uppercase">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  CURRENTLY PURSUING // IN PROGRESS
                </span>
              </div>

              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                Actively preparing for the AWS Certified Cloud Practitioner examination. Rigorously solidifying foundational AWS cloud knowledge, architectural best practices, and identity security before advancing to AWS Solutions Architect Associate.
              </p>

              {/* Syllabus Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {syllabusAreas.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-[#FF9900] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Architectural Emblem */}
            <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0B0B0D] text-white border border-white/10 text-center w-full lg:w-72 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-[#FF9900]/15 border border-[#FF9900]/40 flex items-center justify-center text-[#FF9900] mb-3">
                <Cloud className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                EXAM PREPARATION
              </span>
              <span className="text-sm font-display font-bold text-white mt-1">
                AWS CLF-C02
              </span>
              <span className="mt-3 text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/10">
                ACTIVE LAB REVIEWS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

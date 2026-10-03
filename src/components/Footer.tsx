import React from 'react';
import { ArrowUp, Mail, Phone, Linkedin, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-[#060607] text-white pt-20 pb-12 px-4 md:px-8 lg:px-12 border-t border-white/10 overflow-hidden select-none">
      {/* Partially Cropped Oversized Watermark Typography */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-display font-black text-[12rem] sm:text-[18rem] md:text-[24rem] text-white/[0.02] tracking-tighter uppercase whitespace-nowrap pointer-events-none -z-0">
        CLOUD
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-16 border-b border-white/10">
          {/* Brand & Positioning */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E93]" />
              <span className="font-display font-black text-2xl tracking-tight text-white uppercase">
                BALAJI R
              </span>
            </div>

            <p className="font-mono text-xs font-semibold text-[#FF2E93] tracking-widest uppercase">
              CLOUD ENGINEER • DEVOPS • BACKEND
            </p>

            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              Engineering secure, automated, and self-healing cloud platforms. Focused on high-availability AWS architectures, Kubernetes container orchestration, and reliable infrastructure pipelines.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
              QUICK NAVIGATION
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-mono text-gray-300 hover:text-[#FF2E93] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
              CHANNELS
            </div>
            <div className="text-xs font-mono text-gray-300 space-y-2">
              <div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#FF2E93] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#FF2E93] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </div>
              <div>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF2E93] transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#FF2E93]" />
                  <span>linkedin.com/in/{PERSONAL_INFO.linkedinHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span>BUILT WITH REACT, TYPESCRIPT & TAILWIND</span>
            <span>•</span>
            <span>COIMBATORE, INDIA</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF2E93]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

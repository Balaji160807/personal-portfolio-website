import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);

      // Check current section
      const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Check if over dark section (contact or dark elements)
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 0) {
          setIsOverDark(true);
        } else {
          setIsOverDark(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 inset-x-0 z-40 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
      >
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 shadow-sm ${
            isOverDark
              ? 'bg-[#18181C]/90 text-white border border-white/15 backdrop-blur-xl shadow-2xl'
              : isScrolled
              ? 'bg-[#FAF9F6]/90 text-[#0E0E10] border border-[#0E0E10]/10 backdrop-blur-xl shadow-lg'
              : 'bg-[#FAF9F6]/75 text-[#0E0E10] border border-[#0E0E10]/8 backdrop-blur-md'
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 pr-3 md:pr-6 group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E93] group-hover:scale-125 transition-transform" />
            <span className="font-display font-bold text-sm tracking-widest uppercase">
              BALAJI
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-medium uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? isOverDark
                        ? 'text-white'
                        : 'text-[#0E0E10]'
                      : isOverDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-[#0E0E10]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full ${
                        isOverDark
                          ? 'bg-white/15 border border-white/20'
                          : 'bg-black/[0.06] border border-black/10'
                      }`}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action: Terminal Quick Jump & Contact Button */}
          <div className="flex items-center gap-2 pl-2 md:pl-4">
            <a
              href="#terminal-section"
              onClick={(e) => handleNavClick(e, '#terminal-section')}
              aria-label="View interactive terminal"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                isOverDark
                  ? 'border-white/10 text-gray-300 hover:text-white hover:border-[#FF2E93]'
                  : 'border-black/10 text-gray-600 hover:text-black hover:border-[#FF2E93]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#FF2E93]" />
              <span className="hidden md:inline">CLI</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-1.5 text-xs font-mono font-semibold rounded-full bg-[#0E0E10] text-white hover:bg-[#FF2E93] transition-all duration-200 shadow-sm"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`lg:hidden p-1.5 rounded-full transition-colors ${
                isOverDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-[#0E0E10] text-white border border-white/15 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400">NAVIGATION</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF2E93]/20 text-[#FF2E93] border border-[#FF2E93]/30">
                  BALAJI R
                </span>
              </div>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between py-2 text-base font-display font-medium tracking-wide text-gray-200 hover:text-[#FF2E93] transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono text-gray-500">→</span>
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full text-center py-3 rounded-full bg-[#FF2E93] text-white font-mono font-semibold text-xs tracking-wider"
                >
                  LET'S CONNECT ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

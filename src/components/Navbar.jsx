import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-steel-950/95 backdrop-blur-md border-b border-white/5 shadow-industrial'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
              className="flex items-center gap-3 group"
            >
              {/* Tire icon SVG */}
              <div className="relative w-9 h-9">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" stroke="#C8102E" strokeWidth="2"/>
                  <circle cx="20" cy="20" r="10" stroke="#C8102E" strokeWidth="1.5"/>
                  <circle cx="20" cy="20" r="4" fill="#C8102E"/>
                  {/* Tread marks */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1="20" y1="2" x2="20" y2="8"
                      stroke="#C8102E" strokeWidth="2" strokeLinecap="round"
                      transform={`rotate(${angle} 20 20)`}
                    />
                  ))}
                </svg>
              </div>
              <div>
                <span
                  className="font-display text-2xl text-white tracking-wider group-hover:text-accent transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  NEUMÁTICOS<span className="text-accent">LISANDRO</span>
                </span>
                <p className="font-mono text-[9px] text-nardo tracking-widest uppercase hidden md:block">
                  {COMPANY.slogan}
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-body text-xs font-medium uppercase tracking-widest text-steel-300 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA Phone + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${COMPANY.phone}`}
                className="hidden md:flex items-center gap-2 btn-primary py-2 px-5 text-xs"
              >
                <Phone size={14} />
                <span>{COMPANY.phone}</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-accent transition-colors"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Menú"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-steel-950 flex flex-col pt-24 pb-10 section-padding"
          >
            {/* Decorative line */}
            <div className="industrial-line mb-8" />

            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-display text-5xl text-white hover:text-accent transition-colors duration-300 py-2 border-b border-white/5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <a href={`tel:${COMPANY.phone}`} className="btn-primary justify-center">
                <Phone size={16} /> {COMPANY.phone}
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-center"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

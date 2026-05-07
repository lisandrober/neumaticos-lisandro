import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import { useInView } from '../hooks/useScrollAnimation';
import { COMPANY, NAV_LINKS } from '../data/content';

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-steel-950 border-t border-white/5">
      {/* Industrial separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="section-padding py-16" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <circle cx="20" cy="20" r="18" stroke="#C8102E" strokeWidth="2"/>
                <circle cx="20" cy="20" r="10" stroke="#C8102E" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="4" fill="#C8102E"/>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line key={angle} x1="20" y1="2" x2="20" y2="8" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" transform={`rotate(${angle} 20 20)`} />
                ))}
              </svg>
              <span
                className="font-display text-xl text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                NEUMÁTICO<span className="text-accent">PRO</span>
              </span>
            </div>
            <p className="font-body text-xs text-steel-500 leading-relaxed mb-5 max-w-xs">
              {COMPANY.tagline}. Especialistas en neumáticos nuevos, recapado industrial y servicios automotrices desde {COMPANY.founded}.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
                { Icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
                { Icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-steel-700 flex items-center justify-center text-steel-400 hover:text-accent hover:border-accent transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-body text-sm text-steel-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-accent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-body text-sm text-steel-400">{COMPANY.phone}</p>
              <a href={`mailto:${COMPANY.email}`} className="font-body text-sm text-steel-400 hover:text-white transition-colors">
                {COMPANY.email}
              </a>
              <p className="font-body text-xs text-steel-500 leading-relaxed">{COMPANY.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-steel-600 uppercase tracking-widest">
            © {year} NeumaticoPro. Todos los derechos reservados.
          </p>

          <button
            onClick={scrollTop}
            className="w-9 h-9 rounded-sm border border-steel-700 flex items-center justify-center text-steel-400 hover:text-accent hover:border-accent transition-all duration-300 group"
            aria-label="Volver arriba"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

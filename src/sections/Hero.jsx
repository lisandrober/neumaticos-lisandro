import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { HERO, COMPANY } from '../data/content';

// Animated decorative tire SVG
const TireDecoration = () => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.07] pointer-events-none hidden xl:block">
    <svg viewBox="0 0 200 200" className="w-full h-full tire-spin">
      <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="4" fill="none"/>
      <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="3" fill="none"/>
      <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="2" fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 65 * Math.cos(angle);
        const y1 = 100 + 65 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="4" strokeLinecap="round" />;
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 100 + 93 * Math.cos(angle);
        const y1 = 100 + 93 * Math.sin(angle);
        const x2 = 100 + 98 * Math.cos(angle);
        const y2 = 100 + 98 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />;
      })}
    </svg>
  </div>
);

// Grid lines overlay
const GridOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `
        linear-gradient(to right, white 1px, transparent 1px),
        linear-gradient(to bottom, white 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }}
  />
);

export default function Hero() {
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=Hola,%20me%20interesa%20recibir%20información%20sobre%20sus%20servicios.`;

  const scrollToServices = () => {
    document.querySelector('#neumaticos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO.bg_image}
          alt="Neumáticos industriales en ruta"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950/95 via-steel-950/80 to-steel-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950/90 via-transparent to-steel-950/20" />
        {/* Red accent stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent opacity-50" />
      </div>

      {/* Grid overlay */}
      <GridOverlay />

      {/* Decorative rotating tire */}
      <TireDecoration />

      {/* Content */}
      <div className="relative z-10 section-padding w-full pt-28 pb-24">
        <div className="max-w-3xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-accent" />
            <span className="section-label">{COMPANY.slogan}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="font-display uppercase text-white mb-6 leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              letterSpacing: '0.02em',
            }}
          >
            {HERO.title.split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? 'text-gradient-accent' : 'text-white'}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-body text-steel-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            {HERO.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary group">
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              {HERO.cta_primary}
            </a>
            <button onClick={scrollToServices} className="btn-secondary group">
              {HERO.cta_secondary}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { v: '25+', l: 'Años' },
              { v: '12k+', l: 'Clientes' },
              { v: '50k+', l: 'Neumáticos' },
              { v: '98%', l: 'Satisfacción' },
            ].map((stat) => (
              <div key={stat.l}>
                <p
                  className="font-display text-3xl md:text-4xl text-accent"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.v}
                </p>
                <p className="font-mono text-xs text-steel-400 uppercase tracking-widest mt-1">
                  {stat.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-steel-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} className="text-steel-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

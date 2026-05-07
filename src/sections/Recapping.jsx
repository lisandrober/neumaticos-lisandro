import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useScrollAnimation';
import { RECAP_PROCESS, RECAP_BENEFITS } from '../data/content';

/**
 * SCROLL-DRIVEN RECAPPING ANIMATION
 * ===================================
 * Cómo funciona:
 * - El container tiene height: 400vh para crear una zona de scroll extendida
 * - La parte visual queda "sticky" mientras el usuario scrollea
 * - El progreso del scroll dentro del container se mapea a:
 *   a) La rotación animada del neumático SVG
 *   b) El paso activo del proceso
 *   c) Transformaciones CSS en capas del neumático
 *
 * Para agregar imágenes reales en lugar del SVG:
 * - Descomenta el bloque "USAR IMÁGENES REALES" abajo
 * - Coloca frames en /public/recap-frames/frame-001.jpg ... frame-100.jpg
 */

// Animated tire built with SVG layers — each layer appears/transforms on scroll
function AnimatedTireSVG({ progress }) {
  // 5 stages mapped to 0-1 progress
  const stage = Math.floor(progress * 4.99); // 0..4
  const stageProgress = (progress * 5) % 1;  // 0..1 within stage

  const treadOpacity     = progress < 0.2 ? 1 : Math.max(0, 1 - (progress - 0.2) * 10);
  const carcassOpacity   = progress > 0.1 ? 1 : 0;
  const rubberOpacity    = progress > 0.4 ? Math.min(1, (progress - 0.4) * 5) : 0;
  const vulcOpacity      = progress > 0.65 ? Math.min(1, (progress - 0.65) * 5) : 0;
  const finishedOpacity  = progress > 0.85 ? Math.min(1, (progress - 0.85) * 6) : 0;

  const rotation = progress * 360;
  const heatColor = progress > 0.6 ? `rgba(200, 16, 46, ${(progress - 0.6) * 0.6})` : 'transparent';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect during vulcanization */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-500"
        style={{ background: heatColor }}
      />

      <svg
        viewBox="0 0 300 300"
        className="relative z-10 w-64 h-64 md:w-80 md:h-80"
        style={{ filter: `drop-shadow(0 0 ${20 + progress * 30}px rgba(200,16,46,${progress * 0.5}))` }}
      >
        {/* === LAYER 0: Carcasa (estructura base) === */}
        <g opacity={carcassOpacity} style={{ transition: 'opacity 0.5s' }}>
          <circle cx="150" cy="150" r="130" fill="#1F2937" stroke="#374151" strokeWidth="3" />
          <circle cx="150" cy="150" r="90" fill="#111827" stroke="#374151" strokeWidth="2" />
          {/* Structural cords */}
          {Array.from({ length: 20 }).map((_, i) => {
            const a = (i * 18 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={150 + 93 * Math.cos(a)} y1={150 + 93 * Math.sin(a)}
                x2={150 + 127 * Math.cos(a)} y2={150 + 127 * Math.sin(a)}
                stroke="#374151" strokeWidth="1.5"
              />
            );
          })}
        </g>

        {/* === LAYER 1: Old tread (fading out) === */}
        <g
          opacity={treadOpacity}
          transform={`rotate(${rotation * 0.5}, 150, 150)`}
          style={{ transition: 'opacity 0.3s' }}
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            const r1 = 127, r2 = 138;
            return (
              <rect
                key={i}
                x="148" y={150 - r2}
                width="4" height={r2 - r1}
                rx="1"
                fill="#6B7280"
                transform={`rotate(${i * 10}, 150, 150)`}
              />
            );
          })}
          <circle cx="150" cy="150" r="137" fill="none" stroke="#6B7280" strokeWidth="6" strokeDasharray="8 4" />
        </g>

        {/* === LAYER 2: New rubber application === */}
        <g opacity={rubberOpacity} style={{ transition: 'opacity 0.5s' }}>
          <circle cx="150" cy="150" r="132" fill="none" stroke="#C8102E" strokeWidth="8" strokeOpacity="0.4"
            strokeDasharray={`${rubberOpacity * 830} 830`}
          />
        </g>

        {/* === LAYER 3: Vulcanization heat rings === */}
        {vulcOpacity > 0 && Array.from({ length: 3 }).map((_, i) => (
          <circle
            key={i}
            cx="150" cy="150"
            r={120 + i * 10}
            fill="none"
            stroke="#C8102E"
            strokeWidth="1"
            strokeOpacity={vulcOpacity * (0.6 - i * 0.15)}
            strokeDasharray="4 8"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`${i % 2 === 0 ? 0 : 360} 150 150`}
              to={`${i % 2 === 0 ? 360 : 0} 150 150`}
              dur={`${2 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* === LAYER 4: Finished tire new tread === */}
        <g opacity={finishedOpacity} transform={`rotate(${-rotation * 0.3}, 150, 150)`}>
          {Array.from({ length: 36 }).map((_, i) => (
            <rect
              key={i}
              x="147" y="12"
              width="6" height="14"
              rx="2"
              fill="white"
              transform={`rotate(${i * 10}, 150, 150)`}
            />
          ))}
          <circle cx="150" cy="150" r="138" fill="none" stroke="white" strokeWidth="4" strokeDasharray="12 6" />
          <circle cx="150" cy="150" r="128" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6 10" />
        </g>

        {/* === HUB (always visible) === */}
        <circle cx="150" cy="150" r="28" fill="#111827" stroke="#C8102E" strokeWidth="2" />
        <circle cx="150" cy="150" r="12" fill="#C8102E" />
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i * 72 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={150 + 20 * Math.cos(a)}
              cy={150 + 20 * Math.sin(a)}
              r="4"
              fill="#C8102E"
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '150px 150px', transition: 'transform 0.05s linear' }}
            />
          );
        })}
      </svg>

      {/* Progress percentage */}
      <div className="absolute bottom-4 right-4">
        <span className="font-mono text-xs text-accent">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

export default function RecappingSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll scrub logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / containerHeight));
      setProgress(p);
      setActiveStep(Math.min(RECAP_PROCESS.length - 1, Math.floor(p * RECAP_PROCESS.length)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1 });

  return (
    <section id="recapado" className="bg-steel-900 relative">
      {/* Top line */}
      <div className="industrial-line" />

      {/* Section header */}
      <div className="section-padding pt-24 pb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-accent" />
          <span className="section-label">Tecnología industrial</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="section-title text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Proceso de<br />
            <span className="text-gradient-accent">Recapado</span>
          </h2>
          <p className="font-body text-steel-400 text-sm max-w-sm leading-relaxed">
            Extendemos la vida útil de tus neumáticos con tecnología de punta y control de calidad certificado bajo norma ISO 9001 e INTI.
          </p>
        </div>
      </div>

      {/* ============================================
           SCROLL SCRUB AREA
           Altura = 400vh para zona de scroll extendida
           ============================================ */}
      <div ref={containerRef} style={{ height: '400vh' }} className="relative">
        {/* Sticky visual container */}
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden"
        >
          {/* Left: Animated tire */}
          <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center bg-steel-950">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <AnimatedTireSVG progress={progress} />

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-steel-800">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Right: Process steps */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center section-padding py-8 bg-steel-900 overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
              Paso {activeStep + 1} de {RECAP_PROCESS.length}
            </p>

            <div className="relative">
              {RECAP_PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  animate={{
                    opacity: i === activeStep ? 1 : i < activeStep ? 0.3 : 0.15,
                    y: i === activeStep ? 0 : i < activeStep ? -10 : 20,
                    scale: i === activeStep ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className={`mb-6 ${i === activeStep ? '' : 'pointer-events-none'}`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="font-display text-5xl lg:text-7xl leading-none"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: i === activeStep ? 'var(--color-accent)' : 'var(--color-steel-700)',
                      }}
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3
                        className="font-display text-xl lg:text-2xl uppercase text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                      {i === activeStep && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="font-body text-sm text-steel-400 leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step dots */}
            <div className="flex gap-2 mt-4">
              {RECAP_PROCESS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeStep ? '24px' : '8px',
                    background: i <= activeStep ? 'var(--color-accent)' : 'var(--color-steel-700)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div ref={benefitsRef} className="section-padding pb-24 pt-0 bg-steel-950">
        <div className="industrial-line mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECAP_BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 group hover:border-accent/30 transition-colors duration-300"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h4
                className="font-display text-xl uppercase text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {benefit.title}
              </h4>
              <p className="font-body text-sm text-steel-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

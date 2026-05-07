import { motion } from 'framer-motion';
import { useInView } from '../hooks/useScrollAnimation';
import { CERTIFICATIONS } from '../data/content';

function CertCard({ cert, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 150 }}
      className="group cursor-default"
    >
      {/* Red card */}
      <div className="relative aspect-square flex flex-col items-center justify-center p-6 rounded-sm overflow-hidden bg-accent transition-all duration-500 group-hover:bg-accent-dark group-hover:shadow-glow-red group-hover:-translate-y-2">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Cert code — big typography */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <p
            className="font-display text-center text-white leading-none whitespace-pre-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: cert.code.includes('\n') ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            {cert.code}
          </p>
          <div className="w-8 h-px bg-white/50 mt-1" />
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/80 text-center">
            {cert.name}
          </p>
        </div>

        {/* Hover tooltip */}
        <div className="absolute inset-0 bg-steel-950/95 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center p-5 z-20">
          <p className="font-body text-xs text-steel-300 text-center leading-relaxed">
            {cert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="certificaciones" className="relative section-py bg-steel-100 overflow-hidden">
      {/* Light theme for this section */}
      <div className="absolute inset-0 bg-gradient-to-br from-steel-50 to-steel-100" />

      {/* Industrial decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Diagonal accent bar */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'var(--color-accent)' }}
      />

      <div className="section-padding relative z-10">
        {/* Header */}
        <div ref={ref} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Calidad garantizada
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display uppercase leading-none text-steel-900"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              }}
            >
              Certificaciones<br />
              <span style={{ color: 'var(--color-accent)' }}>& Avales</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-sm text-steel-500 max-w-xs leading-relaxed"
          >
            Nuestros procesos están respaldados por organismos de certificación nacionales e internacionales, garantizando los más altos estándares de calidad y seguridad.
          </motion.p>
        </div>

        {/* Certs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Bottom descriptor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 border border-steel-200 rounded-sm bg-white/60 backdrop-blur-sm max-w-2xl"
        >
          <p className="font-body text-sm text-steel-600 leading-relaxed">
            <span className="font-semibold text-steel-900">NeumaticoPro</span> opera bajo estrictos protocolos de calidad auditados anualmente. Nuestras certificaciones ISO 9001 e ISO 14001, junto al aval del INTI, nos posicionan como referentes de confianza en el mercado industrial argentino.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

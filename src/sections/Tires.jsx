import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useScrollAnimation';
import { TIRES, COMPANY } from '../data/content';

function TireCard({ tire, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  const badgeStyles = {
    accent: 'bg-accent text-white',
    cobalt: 'bg-cobalt text-white',
    nardo: 'bg-nardo-dark text-white',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="card-industrial group cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={tire.image}
          alt={tire.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950/80 to-transparent" />

        {/* Badge */}
        <span className={`absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm ${badgeStyles[tire.badgeColor]}`}>
          {tire.badge}
        </span>

        {/* Category */}
        <span className="absolute bottom-4 left-4 section-label text-[10px]">
          {tire.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-display text-2xl text-white uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {tire.title}
          </h3>
          <span className="text-2xl">{tire.icon}</span>
        </div>

        <p className="font-body text-sm text-steel-400 leading-relaxed mb-5 flex-1">
          {tire.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-6">
          {tire.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 font-body text-xs text-steel-300">
              <CheckCircle size={12} className="text-accent flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`https://wa.me/${COMPANY.whatsapp}?text=Hola,%20me%20interesa%20información%20sobre%20${encodeURIComponent(tire.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between group/cta border-t border-white/10 pt-4 text-steel-400 hover:text-accent transition-colors duration-300"
        >
          <span className="font-mono text-xs uppercase tracking-wider">Solicitar cotización</span>
          <ArrowUpRight size={16} className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function TiresSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="neumaticos" className="relative section-py bg-steel-950">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px industrial-line" />

      <div className="section-padding">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-accent" />
            <span className="section-label">Nuestros productos</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="section-title text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Neumáticos<br />
              <span className="text-gradient-accent">de primera línea</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-steel-400 text-sm max-w-xs md:text-right leading-relaxed"
            >
              Línea completa de neumáticos nuevos para todas las aplicaciones con garantía certificada.
            </motion.p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIRES.map((tire, i) => (
            <TireCard key={tire.id} tire={tire} index={i} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 p-6 glass-card flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-display text-xl text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              ¿No encontrás la medida?
            </p>
            <p className="font-body text-sm text-steel-400">
              Consultanos por cualquier medida especial o catálogo completo de marcas.
            </p>
          </div>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}?text=Hola,%20necesito%20consultar%20una%20medida%20especial%20de%20neumático.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            Consultar catálogo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

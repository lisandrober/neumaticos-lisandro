import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useInView } from '../hooks/useScrollAnimation';
import { COMPANY, ABOUT } from '../data/content';

// Contact info item
function ContactItem({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-start gap-4 group"
    >
      <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
        <Icon size={16} className="text-accent group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel-500 mb-0.5">{label}</p>
        <p className="font-body text-sm text-white group-hover:text-accent transition-colors duration-300">{value}</p>
      </div>
    </a>
  );
}

// Contact form
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone || 'No proporcionado',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setLoading(false);
      console.error('Error sending email:', err);
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full gap-4 py-16"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-accent" />
        </div>
        <h3 className="font-display text-2xl text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
          ¡Mensaje enviado!
        </h3>
        <p className="font-body text-sm text-steel-400 text-center">
          Nos pondremos en contacto a la brevedad.
        </p>
        <button onClick={() => setSent(false)} className="btn-secondary text-xs py-2 px-5 mt-2">
          Enviar otro
        </button>
      </motion.div>
    );
  }

  const inputClass = `
    w-full bg-steel-900 border border-steel-700 rounded-sm px-4 py-3
    font-body text-sm text-white placeholder-steel-500
    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
    transition-all duration-300
  `;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-steel-500 mb-1.5 block">
            Nombre *
          </label>
          <input
            type="text" name="name" required
            value={form.name} onChange={handleChange}
            placeholder="Tu nombre completo"
            className={inputClass}
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-steel-500 mb-1.5 block">
            Teléfono
          </label>
          <input
            type="tel" name="phone"
            value={form.phone} onChange={handleChange}
            placeholder="+54 11 0000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-steel-500 mb-1.5 block">
          Email *
        </label>
        <input
          type="email" name="email" required
          value={form.email} onChange={handleChange}
          placeholder="tu@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-steel-500 mb-1.5 block">
          Mensaje *
        </label>
        <textarea
          name="message" required rows={4}
          value={form.message} onChange={handleChange}
          placeholder="Contanos en qué podemos ayudarte..."
          className={inputClass + ' resize-none'}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Enviando...
          </span>
        ) : (
          <>
            <Send size={15} />
            Enviar mensaje
          </>
        )}
      </button>

      <p className="font-mono text-[9px] text-steel-600 text-center">
        O si preferís respuesta inmediata, contactanos por WhatsApp →
      </p>
    </form>
  );
}

export default function ContactSection() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=Hola,%20me%20interesa%20recibir%20información%20sobre%20sus%20servicios.`;

  return (
    <section id="contacto" className="relative section-py bg-steel-950 overflow-hidden">
      <div className="industrial-line absolute top-0 left-0 right-0" />

      {/* Large background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        CONTACTO
      </div>

      <div className="section-padding relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

          {/* Left: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-accent" />
              <span className="section-label">Hablemos</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title text-white mb-8 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {ABOUT.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-3 mb-10"
            >
              <p className="font-body text-sm text-steel-400 leading-relaxed">
                {ABOUT.description}
              </p>
              <p className="font-body text-sm text-steel-400 leading-relaxed">
                {ABOUT.paragraph2}
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-5 mb-10"
            >
              <ContactItem
                icon={MessageCircle}
                label="WhatsApp"
                value={COMPANY.phone}
                href={waLink}
              />
              <ContactItem
                icon={Phone}
                label="Teléfono"
                value={COMPANY.phone}
                href={`tel:${COMPANY.phone}`}
              />
              <ContactItem
                icon={Mail}
                label="Email"
                value={COMPANY.email}
                href={`mailto:${COMPANY.email}`}
              />
              <ContactItem
                icon={MapPin}
                label="Dirección"
                value={COMPANY.address}
                href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
              />
            </motion.div>

            {/* Big WhatsApp CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-5 rounded-sm bg-green-600 hover:bg-green-500 transition-colors duration-300 group shadow-[0_8px_32px_rgba(37,211,102,0.25)]"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-display text-xl text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  Escribinos ahora
                </p>
                <p className="font-mono text-xs text-white/70">Respuesta en menos de 2 horas</p>
              </div>
              <div className="ml-auto">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-6 md:p-8">
              <h3
                className="font-display text-2xl uppercase text-white mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Formulario de contacto
              </h3>
              <p className="font-body text-xs text-steel-500 mb-6">
                Completá el formulario y te respondemos a la brevedad.
              </p>
              <ContactForm />
            </div>

            {/* Map */}
            <div className="mt-5 rounded-sm overflow-hidden border border-white/10 h-48">
              <iframe
                src={COMPANY.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(85%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación NeumaticoPro"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

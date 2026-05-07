// ============================================================
//  DATA MOCK — Modificar aquí los textos y contenidos
// ============================================================

export const COMPANY = {
  name: 'LisandroNeumaticos',
  slogan: 'Ingeniería en Rodamiento',
  tagline: 'Calidad certificada. Confianza comprobada.',
  founded: '1998',
  years: '25+',
  phone: '+54 11 2651-8101',
  whatsapp: '5491126518101',  // ← CAMBIAR: número sin + ni espacios
  email: 'lisandro.bernis0@gmail.com',
  address: 'Mayorano 637, Lujan, Buenos Aires. CP: 6700',
  mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8774446480857!2d-59.096000623399405!3d-34.58196745635127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc87832866c0e1%3A0xca5a8730f6cc7be5!2sMayorano%20637%2C%20B6702IUM%20Luj%C3%A1n%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1778124076428!5m2!1ses-419!2sar",
  social: {
    instagram: 'https://instagram.com/neumaticópro',
    facebook: 'https://facebook.com/neumaticópro',
    linkedin: 'https://linkedin.com/company/neumaticópro',
  },
  stats: [
    { value: '25+', label: 'Años de trayectoria' },
    { value: '12.000+', label: 'Clientes satisfechos' },
    { value: '50.000+', label: 'Neumáticos vendidos' },
    { value: '98%', label: 'Índice de satisfacción' },
  ],
};

// ============================================================
//  HERO
// ============================================================
export const HERO = {
  title: 'Rodamos con la industria',
  subtitle: 'Neumáticos nuevos, recapados certificados y soluciones industriales de alto rendimiento para tu flota.',
  cta_primary: 'Contactar por WhatsApp',
  cta_secondary: 'Ver servicios',
  // Imagen de fondo del hero — reemplazar en /public/images/hero-bg.jpg
  bg_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
};

// ============================================================
//  NEUMÁTICOS NUEVOS
// ============================================================
export const TIRES = [
  {
    id: 1,
    category: 'Autos & SUVs',
    title: 'Neumáticos para Autos',
    description: 'Cubrimos todas las medidas para vehículos particulares y SUVs. Marcas premium y nacionales con garantía certificada.',
    features: ['Alta adherencia', 'Bajo ruido', 'Larga duración'],
    // Imagen: /public/images/tire-auto.jpg
    image: 'https://imgs.search.brave.com/GnxMUHWwY8HZYTo2b74x_UYn7gYWP30muPFDLfpsetU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaS11/cGxvYWRzLXBvZDEz/LmRlYWxlcmluc3Bp/cmUuY29tL21hdXNu/aXNzYW5ub3J0aHRh/bXBhL3VwbG9hZHMv/MjAyNS8wMi9zZW50/cmF2c2NydXplLnBu/Zw',
    badge: 'Más vendido',
    badgeColor: 'accent',
  },
  {
    id: 2,
    category: 'Transporte de carga',
    title: 'Neumáticos para Camiones',
    description: 'Soluciones de rodamiento para flotas de transporte pesado, semirremolques y vehículos de carga de larga distancia.',
    features: ['Carga máxima', 'Kilómetros optimizados', 'Resistencia extrema'],
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    badge: 'Industrial',
    badgeColor: 'cobalt',
  },
  {
    id: 3,
    category: 'Maquinaria pesada',
    title: 'Neumáticos Industriales',
    description: 'Cubiertas para maquinaria agrícola, retroexcavadoras, montacargas y equipos de movimiento de tierras.',
    features: ['Para terrenos extremos', 'Autopropulsado', 'Alta presión'],
    image: 'https://bloglatam.jacto.com/wp-content/uploads/2022/04/trator-585x308.png',
    badge: 'Especializado',
    badgeColor: 'nardo',
  },
];

// ============================================================
//  RECAPADO — Proceso (scroll animation)
// ============================================================
export const RECAP_PROCESS = [
  {
    step: '01',
    title: 'Inspección Inicial',
    description: 'Análisis estructural completo del neumático mediante tecnología de rayos X y ultrasonido para detectar cualquier daño interno.',
  },
  {
    step: '02',
    title: 'Raspado y Pulido',
    description: 'Remoción controlada de la banda de rodadura existente hasta llegar a la carcasa en perfecto estado.',
  },
  {
    step: '03',
    title: 'Aplicación de Banda',
    description: 'Aplicación de goma cruda de alta calidad en capas precisas sobre la carcasa preparada.',
  },
  {
    step: '04',
    title: 'Vulcanización',
    description: 'La autoclave aplica calor, presión y vacío controlado para vulcanizar la banda nueva sobre la carcasa del neumático. Durante este proceso, el caucho se fusiona químicamente con la cubierta original, logrando una unión firme, uniforme y resistente. La presión evita burbujas o deformaciones, mientras que la temperatura activa la vulcanización que le da durabilidad y adherencia a la nueva banda de rodamiento.',
  },
  {
    step: '05',
    title: 'Control de Calidad',
    description: 'Inspección final certificada bajo normativa ISO 9001 e INTI para garantizar el estándar de seguridad requerido.',
  },
];

export const RECAP_BENEFITS = [
  {
    title: 'Ahorro hasta 60%',
    description: 'El recapado cuesta significativamente menos que un neumático nuevo manteniendo el mismo rendimiento.',
  },
  {
    title: 'Sustentabilidad',
    description: 'Reducimos el impacto ambiental al extender la vida útil de las carcasas y disminuir residuos industriales.',
  },
  {
    title: 'Mayor duración',
    description: 'Nuestro proceso de vulcanización garantiza una banda de rodadura con vida útil equivalente a la original.',
  },
  {
    title: 'Seguridad certificada',
    description: 'Cada neumático recapado pasa por controles de calidad rigurosos bajo normas INTI e ISO internacionales.',
  },
];


// ============================================================
//  CERTIFICACIONES
// ============================================================
export const CERTIFICATIONS = [
  {
    id: 1,
    code: 'ISO\n14001',
    name: 'Gestión Ambiental',
    description: 'Certificación internacional de gestión ambiental, comprometidos con la sustentabilidad.',
  },
  {
    id: 2,
    code: 'INTI',
    name: 'Instituto Nacional',
    description: 'Certificación del Instituto Nacional de Tecnología Industrial para procesos de recapado.',
  },
  {
    id: 3,
    code: 'ISO\n9001',
    name: 'Gestión de Calidad',
    description: 'Sistema de gestión de calidad certificado internacionalmente para todos nuestros procesos.',
  },
  {
    id: 4,
    code: '★★★★★',
    name: 'Empresa Certificada',
    description: 'Reconocidos por excelencia en atención al cliente y calidad de servicio por más de 25 años.',
  },
];

// ============================================================
//  NOSOTROS
// ============================================================
export const ABOUT = {
  title: 'Más de 25 años\nrodando con vos',
  description: 'NeumaticoPro nació en 1998 con una visión clara: brindar soluciones de rodamiento de alta calidad con el respaldo técnico y la cercanía que las empresas necesitan. Hoy somos referentes en el mercado de neumáticos industriales y automotrices.',
  paragraph2: 'Contamos con tecnología de punta, personal altamente capacitado y un proceso de control de calidad certificado que nos permite garantizar cada producto y servicio que entregamos.',
};

// ============================================================
//  NAVEGACIÓN
// ============================================================
export const NAV_LINKS = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Neumáticos',   href: '#neumaticos' },
  { label: 'Recapado',     href: '#recapado' },
  { label: 'Autos',        href: '#autos' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Contacto',     href: '#contacto' },
];

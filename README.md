# NeumaticoPro — Landing Page

Landing page completa para empresa de neumáticos y recapado industrial.

## Stack
- **React 18** + **Vite 5**
- **TailwindCSS 3**
- **Framer Motion** (animaciones)
- **Lucide React** (iconos)

---

## 🚀 Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Build para producción
npm run build

# 4. Preview del build
npm run preview
```

---

## 📁 Estructura de carpetas

```
src/
├── components/
│   ├── Navbar.jsx        → Barra de navegación fija + menú mobile
│   ├── WhatsAppFloat.jsx → Botón flotante de WhatsApp
│   └── Footer.jsx        → Pie de página
├── sections/
│   ├── Hero.jsx          → Pantalla de inicio
│   ├── Tires.jsx         → Sección neumáticos nuevos
│   ├── Recapping.jsx     → Sección recapado (scroll animation)
│   ├── Certifications.jsx→ Certificaciones ISO / INTI
│   └── Contact.jsx       → Contacto + formulario
├── hooks/
│   └── useScrollAnimation.js → Hooks de scroll y viewport
├── data/
│   └── content.js        → ← TODOS LOS TEXTOS Y DATOS AQUÍ
├── App.jsx
├── main.jsx
└── index.css             → Variables de color globales
```

---

## ✏️ Dónde modificar textos

**Todo el contenido editable está en: `src/data/content.js`**

```js
export const COMPANY = {
  name: 'NeumaticoPro',          // ← nombre empresa
  phone: '+54 11 4567-8900',     // ← teléfono
  whatsapp: '5491145678900',     // ← número WhatsApp (sin + ni espacios)
  email: 'contacto@empresa.com', // ← email
  address: 'Dirección...',       // ← dirección
  // ...
};
```

---

## 🖼️ Cómo reemplazar imágenes

Las imágenes usan URLs de Unsplash por defecto. Para usar imágenes propias:

1. Colocar las imágenes en `/public/images/`
2. En `src/data/content.js` cambiar las URLs:

```js
// Antes (Unsplash):
image: 'https://images.unsplash.com/photo-xxx',

// Después (propia):
image: '/images/neumatico-auto.jpg',
```

**Imágenes recomendadas:**
- `/public/images/hero-bg.jpg` — Fondo del hero (1920x1080 mínimo)
- `/public/images/tire-auto.jpg` — Neumático para autos
- `/public/images/tire-truck.jpg` — Neumático para camiones
- `/public/images/tire-industrial.jpg` — Neumático industrial

---

## 🎬 Cómo agregar frames al recapado (scroll animation)

La animación de recapado usa SVG generativo por defecto. 
Para usar **imágenes reales** (secuencia de frames):

1. Colocar frames en `/public/recap-frames/` con nombres:
   `frame-001.jpg`, `frame-002.jpg`, ..., `frame-100.jpg`

2. En `src/sections/Recapping.jsx`, reemplazar el componente `AnimatedTireSVG`:

```jsx
// Componente alternativo con imágenes reales:
function RecapFramePlayer({ progress }) {
  const TOTAL_FRAMES = 100;
  const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
  const frameNum = String(frameIndex + 1).padStart(3, '0');
  const src = `/recap-frames/frame-${frameNum}.jpg`;

  return (
    <img
      src={src}
      alt={`Proceso de recapado paso ${frameIndex + 1}`}
      className="w-full h-full object-cover"
    />
  );
}
```

---

## 🎨 Cómo cambiar colores globales

**Opción 1 — Variables CSS** (más rápido):
En `src/index.css`, modificar:
```css
:root {
  --color-accent: #C8102E;       /* Rojo principal */
  --color-cobalt: #1B3A6B;       /* Azul industrial */
  --color-bg-dark: #060A12;      /* Fondo oscuro */
}
```

**Opción 2 — Tailwind config**:
En `tailwind.config.js`, modificar el objeto `colors.accent`:
```js
accent: {
  DEFAULT: '#C8102E',  // ← cambiar aquí
  light: '#E8253F',
  dark: '#9B0C22',
},
```

---

## 📱 Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conectar el repositorio directamente desde [vercel.com](https://vercel.com).

---

## 🔧 Integrar formulario real

El formulario usa un `setTimeout` simulado. Para hacerlo funcional:

**Con EmailJS (sin backend):**
1. `npm install @emailjs/browser`
2. Registrarse en [emailjs.com](https://www.emailjs.com/)
3. En `Contact.jsx`, reemplazar el `setTimeout` con:

```js
import emailjs from '@emailjs/browser';

await emailjs.send(
  'SERVICE_ID',
  'TEMPLATE_ID',
  { name: form.name, email: form.email, message: form.message },
  'PUBLIC_KEY'
);
```

**Con Formspree:**
Cambiar el `form` a:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

---

## 📞 Número de WhatsApp

El número debe tener el formato internacional sin `+` ni espacios.  
Ejemplo para Argentina: `5491145678900` (54 = código país, 11 = área, 45678900 = número)

```js
// src/data/content.js
whatsapp: '5491145678900',
```

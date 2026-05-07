/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === PALETA PRINCIPAL ===
        // Rojo intenso de acento
        accent: {
          DEFAULT: '#C8102E',
          light: '#E8253F',
          dark: '#9B0C22',
        },
        // Grises industriales
        steel: {
          50:  '#F4F5F7',
          100: '#E8EAED',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0A0F1A',
          950: '#060A12',
        },
        // Azul industrial
        cobalt: {
          DEFAULT: '#1B3A6B',
          light: '#2952A3',
          dark: '#0F2240',
        },
        // Gris nardo
        nardo: {
          DEFAULT: '#9E9E9E',
          light: '#B8B8B8',
          dark: '#6E6E6E',
        },
      },
      fontFamily: {
        // Display: tipografía industrial fuerte
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        // Body: limpio y moderno
        body: ['DM Sans', 'sans-serif'],
        // Mono para detalles técnicos
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow-red': '0 0 30px rgba(200, 16, 46, 0.4)',
        'glow-blue': '0 0 30px rgba(27, 58, 107, 0.5)',
        'industrial': '0 20px 60px rgba(0,0,0,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

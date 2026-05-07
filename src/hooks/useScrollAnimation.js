import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar cuando un elemento entra en el viewport.
 * Útil para activar animaciones de entrada.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) {
            observer.unobserve(el);
          }
        } else if (options.once === false) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, inView];
}

/**
 * Hook para trackear la posición de scroll del usuario.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

/**
 * Hook para el efecto de scrubbing por scroll dentro de un elemento.
 * Retorna un valor de progreso entre 0 y 1 según el scroll dentro del ref.
 */
export function useScrollScrub(heightMultiplier = 3) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progreso: 0 cuando el top del container está en viewport bottom, 1 cuando está en top
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const clampedProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [containerRef, progress];
}

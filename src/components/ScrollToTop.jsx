import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambie la ruta (pathname), hace scroll automático hacia arriba
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Cambia a 'smooth' si prefieres que suba con animación suave
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
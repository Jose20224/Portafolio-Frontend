import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Agregamos un pequeño retraso para sincronizarlo con las animaciones de transición
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 120); // Puedes probar entre 50ms y 150ms según se acomode mejor a tu cross-fade

    // Limpiamos el timeout si el componente se desmonta o cambia de ruta rápidamente
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
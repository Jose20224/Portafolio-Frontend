import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Componentes para la cuadrícula y el detalle
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';

// Configuración de las variantes de la animación de desvanecimiento cruzado
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.9, // Duración de la transición en segundos (ajústala a tu gusto)
  ease: 'easeInOut',
};

// Componente para la Página de Inicio (Home) que junta tus secciones principales
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

// Componente interno que maneja las rutas y la animación AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // mode="wait" asegura que la página actual termine de desvanecerse antes de mostrar la siguiente
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Ruta de Inicio */}
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />

        {/* Ruta para la cuadrícula completa de todos los proyectos */}
        <Route
          path="/proyectos"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProjectsGrid />
            </motion.div>
          }
        />
        
        {/* Ruta con parámetro dinámico para el detalle de un proyecto */}
        <Route
          path="/proyecto/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProjectDetail />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      
      <div className="min-h-screen bg-surface text-on-surface font-geist flex flex-col">
        {/* Barra de Navegación fija / superior */}
        <Navbar />

        {/* Definición de Rutas Animadas de la Aplicación */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* Pie de página global */}
        <Footer />
      </div>
    </>
  );
}

export default App;
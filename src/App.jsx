import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';
import AdminRoutes from './admin/AdminRoutes';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

const variants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const transition = { duration: 0.3, ease: 'easeOut' };

function PublicRoutes() {
  const location = useLocation();
  return <div className="min-h-screen bg-surface text-on-surface font-geist flex flex-col"><ScrollToTop /><Navbar /><main className="flex-grow"><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}><Hero /><About /><Projects /><Skills /><Contact /></motion.div>} /><Route path="/proyectos" element={<motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}><ProjectsGrid /></motion.div>} /><Route path="/proyecto/:id" element={<motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}><ProjectDetail /></motion.div>} /><Route path="*" element={<div className="min-h-[60vh] grid place-items-center text-center px-6"><div><h1 className="text-3xl font-bold">Página no encontrada</h1><a className="text-primary underline mt-4 inline-block" href="/">Volver al inicio</a></div></div>} /></Routes></AnimatePresence></main><Footer /></div>;
}

function AppContent() {
  const location = useLocation();
  const admin = location.pathname.startsWith('/admin');
  return admin ? <Routes><Route path="/admin/*" element={<AdminRoutes />} /></Routes> : <PublicRoutes />;
}

export default function App() {
  return <AuthProvider><PortfolioProvider><AppContent /></PortfolioProvider></AuthProvider>;
}

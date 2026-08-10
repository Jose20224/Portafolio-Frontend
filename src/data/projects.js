export const projectsData = [
  {
    id: 'portfolio-v2',
    title: 'Portafolio Profesional V2',
    category: 'web',
    categoryLabel: 'Desarrollo Web',
    shortDescription: 'Plataforma web personal construida con React 18, Vite y Tailwind CSS siguiendo las guías de Material Design 3.',
    fullDescription: 'Un portafolio interactivo de alto rendimiento diseñado para mostrar proyectos de software, competencias técnicas y experiencia. Incorpora navegación dinámica entre vistas sin recarga de página, filtros por categoría y adaptación completa a dispositivos móviles.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    role: 'Frontend Lead & Designer',
    highlights: [
      'Navegación reactiva entre vista Home, Galería y Detalle',
      'Filtrado interactivo por categorías y búsqueda por tecnología',
      'Arquitectura modular basada en componentes de React',
      'Optimización de carga y accesibilidad según guías M3'
    ],
    techStack: [
      { name: 'React 18', role: 'Librería UI Principal' },
      { name: 'Vite', role: 'Bundler & Entorno de Desarrollo' },
      { name: 'Tailwind CSS', role: 'Estilos y Sistema de Diseño M3' },
      { name: 'Material Symbols', role: 'Iconografía Vectorial' }
    ]
  },
  {
    id: 'ecommerce-system',
    title: 'Plataforma E-Commerce API',
    category: 'systems',
    categoryLabel: 'Sistemas & Backend',
    shortDescription: 'Sistema distribuido de comercio electrónico con procesamiento de pagos, inventario en tiempo real y microservicios.',
    fullDescription: 'Backend completo para tiendas en línea capaz de procesar miles de transacciones simultáneas. Implementa autenticación segura JWT, pasarela de pago integrada y gestión en tiempo real mediante WebSockets.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2023',
    role: 'Backend Software Engineer',
    highlights: [
      'Arquitectura basada en microservicios desacoplados',
      'Caché de consultas de alto tráfico mediante Redis',
      'Contenerización completa con Docker y Docker Compose',
      'Pruebas unitarias e integración con cobertura del 85%'
    ],
    techStack: [
      { name: 'Node.js & Express', role: 'Servidor Backend y REST API' },
      { name: 'MongoDB', role: 'Base de Datos NoSQL' },
      { name: 'Redis', role: 'Sistema de Caché e In-Memory Data' },
      { name: 'Docker', role: 'Contenerización de Servicios' }
    ]
  },
  {
    id: 'task-manager-app',
    title: 'TaskFlow Mobile App',
    category: 'mobile',
    categoryLabel: 'Aplicaciones Móviles',
    shortDescription: 'Aplicación móvil de gestión de tareas y productividad en equipo con sincronización offline y modo oscuro.',
    fullDescription: 'Aplicación móvil multiplataforma orientada a equipos de desarrollo que requieren organización Kanban, recordatorios inteligentes e integración de widgets en la pantalla de inicio.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: '2023',
    role: 'Mobile App Developer',
    highlights: [
      'Sincronización en segundo plano al recuperar conectividad',
      'Tableros Kanban interactivos con gestos drag & drop',
      'Notificaciones push programadas localmente',
      'Soporte completo para iOS y Android'
    ],
    techStack: [
      { name: 'React Native', role: 'Framework Móvil Multiplataforma' },
      { name: 'TypeScript', role: 'Tipado Estático Seguro' },
      { name: 'Redux Toolkit', role: 'Gestión del Estado Global' },
      { name: 'Expo', role: 'Plataforma de Despliegue' }
    ]
  },
  {
    id: 'dashboard-analytics',
    title: 'MetricPulse Analytics Dashboard',
    category: 'ui-ux',
    categoryLabel: 'Diseño UI/UX',
    shortDescription: 'Panel de control analítico e inteligencia de negocios enfocado en visualización clara de datos complejos.',
    fullDescription: 'Diseño y desarrollo frontend para un panel de administración empresarial que visualiza KPIs, métricas de conversión y comportamiento de usuarios mediante gráficos interactivos en tiempo real.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['Figma', 'React', 'Chart.js', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: '2024',
    role: 'UI/UX Designer & Frontend Developer',
    highlights: [
      'Prototipado interactivo completo realizado en Figma',
      'Gráficos adaptativos y personalizables con Chart.js',
      'Exportación de reportes en formato PDF y CSV',
      'Diseño responsive adaptado a tablets y monitores ultrawide'
    ],
    techStack: [
      { name: 'Figma', role: 'Diseño de Interfaz y Sistema de Componentes' },
      { name: 'React', role: 'Desarrollo de Componentes Dinámicos' },
      { name: 'Chart.js', role: 'Librería de Visualización de Datos' }
    ]
  },
  {
    id: 'ai-code-assistant',
    title: 'DevCopilot AI Assistant',
    category: 'web',
    categoryLabel: 'Inteligencia Artificial',
    shortDescription: 'Asistente de código inteligente que analiza repositorios y genera documentación automática.',
    fullDescription: 'Herramienta de desarrollo basada en modelos LLM que escanea archivos de código fuente, detecta inconsistencias de estilo y genera documentación en Markdown en tiempo real.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Python', 'FastAPI', 'OpenAI API'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    role: 'Lead Frontend Developer',
    // 1 Colaborador
    collaborators: [
      {
        name: 'Carlos Mendoza',
        role: 'Backend & AI Engineer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    ],
    highlights: [
      'Integración con la API de OpenAI para explicaciones de código',
      'Interfaz modular desarrollada con React y Tailwind CSS',
      'Tiempo de respuesta optimizado con WebSockets'
    ],
    techStack: [
      { name: 'React 18', role: 'Interfaz de usuario' },
      { name: 'FastAPI', role: 'Servidor Backend Python' }
    ]
  },
  {
    id: 'fintech-dashboard',
    title: 'FinPay Wallet Platform',
    category: 'systems',
    categoryLabel: 'Fintech & Backend',
    shortDescription: 'Billetera digital y sistema de transferencias interbancarias en tiempo real.',
    fullDescription: 'Plataforma financiera integral para la gestión de microtransacciones, análisis de gastos con gráficos dinámicos y generación de códigos QR de pago.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    tags: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: '2024',
    role: 'Full Stack Developer',
    // 2 Colaboradores
    collaborators: [
      {
        name: 'Ana Martínez',
        role: 'UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'David Torres',
        role: 'DevOps & Security',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    ],
    highlights: [
      'Arquitectura segura con cifrado de extremo a extremo',
      'Diseño responsivo optimizado para móviles y escritorio',
      'Sincronización bancaria en tiempo real'
    ],
    techStack: [
      { name: 'Node.js', role: 'API REST Cifrada' },
      { name: 'PostgreSQL', role: 'Base de datos transaccional' }
    ]
  },
  {
    id: 'health-track-app',
    title: 'PulseFit Health Tracker',
    category: 'mobile',
    categoryLabel: 'Aplicaciones Móviles',
    shortDescription: 'App de seguimiento de rendimiento físico y nutrición comunitaria.',
    fullDescription: 'Aplicación nativa móvil para atletas que conecta dispositivos de monitoreo cardíaco, genera planes de entrenamiento con IA y comparte logros en una red social interna.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.nVlab2PHRIsWgKAWrMthowHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    tags: ['React Native', 'Firebase', 'GraphQL', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    year: '2023',
    role: 'Frontend Mobile Lead',
    // 3 Colaboradores
    collaborators: [
      {
        name: 'Elena Gómez',
        role: 'Mobile UI Designer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'Roberto Silva',
        role: 'Backend Architect',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'Sofia Ruíz',
        role: 'QA & Testing Specialist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    ],
    highlights: [
      'Integración con sensores Bluetooth de bajo consumo',
      'Modo offline con sincronización diferida',
      'Pruebas e2e automatizadas'
    ],
    techStack: [
      { name: 'React Native', role: 'Desarrollo multiplataforma' },
      { name: 'Firebase', role: 'Base de datos e imágenes' }
    ]
  }
];
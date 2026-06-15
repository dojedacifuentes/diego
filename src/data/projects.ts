export type ProjectStatus =
  | 'Demo funcional'
  | 'Prototipo'
  | 'Plataforma activa'
  | 'En desarrollo'
  | 'Programa académico'
  | 'Repositorio';

export type ProjectCategory =
  | 'Todos'
  | 'Legaltech'
  | 'DIAT · Academia'
  | 'Herramientas de estudio'
  | 'Examen de Grado'
  | 'RPG jurídico'
  | 'Administrativo y Público'
  | 'Talleres y IA'
  | 'Apps personalizadas'
  | 'Pymes'
  | 'IA y prompting';

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  tags: string[];
  status: ProjectStatus;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  caseNote: string;
}

export const CATEGORIES: ProjectCategory[] = [
  'Todos',
  'Legaltech',
  'DIAT · Academia',
  'Talleres y IA',
  'Herramientas de estudio',
  'Examen de Grado',
  'RPG jurídico',
  'Administrativo y Público',
  'Apps personalizadas',
  'Pymes',
  'IA y prompting',
];

export const projects: Project[] = [
  {
    title: 'diegoojeda.cl · Diógenes Lab',
    category: 'Legaltech',
    description:
      'Esta plataforma. Sitio personal y portafolio con estética legaltech: panel de diagnóstico IA, simulador de ROI, command palette ⌘K, animaciones y SEO técnico. Diseñado y construido de extremo a extremo.',
    problem:
      'Reunir investigación, docencia y desarrollo en una carta de presentación profesional, técnica y desplegable.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Vercel'],
    status: 'Plataforma activa',
    demoUrl: 'https://diegoojeda.cl',
    repoUrl: 'https://github.com/dojedacifuentes/diego',
    featured: true,
    caseNote:
      'Demuestra diseño de producto end-to-end: arquitectura, motion design, accesibilidad y despliegue.',
  },
  {
    title: 'DIAT Prompting Hub',
    category: 'Talleres y IA',
    description:
      'Plataforma académica completa para el taller de IA jurídica: módulos, generador de prompts LexPrompt, flashcards, toolkit IA y dossier exportable en PDF.',
    problem:
      'Organizar contenidos, módulos, herramientas y experiencia formativa en una plataforma académica aplicada.',
    tags: ['IA jurídica', 'Prompting', 'Next.js 16', 'jsPDF', 'Legaltech'],
    status: 'Demo funcional',
    demoUrl: 'https://taller-diat.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/taller-diat',
    featured: true,
    caseNote:
      'Demuestra diseño de plataformas formativas, organización modular y experiencia académica aplicada.',
  },
  {
    title: 'Taller de IA Jurídica Aplicada · DIAT 2023',
    category: 'DIAT · Academia',
    description:
      'Programa de tecnología jurídica del DIAT PUCV. Participé como codirector y ayudante de investigación encargado del taller. Segunda edición, co-financiada por la Vicerrectoría de Vinculación con el Medio PUCV.',
    problem:
      'Formar a estudiantes y profesionales del Derecho en IA aplicada con casos reales y flujos verificables.',
    tags: ['IA jurídica', 'Docencia', 'Codirección', 'PUCV', 'Vinculación con el Medio'],
    status: 'Programa académico',
    demoUrl:
      'https://www.pucv.cl/uuaa/derecho-pucv/noticias/tecnologia-juridica-en-accion-programa-diat-pucv-integra-la',
    featured: true,
    caseNote:
      'Cobertura institucional PUCV. Dos ediciones del taller lideradas y diseñadas por mí.',
  },
  {
    title: 'Marea — Workspace Jurídico',
    category: 'Legaltech',
    description:
      'App personalizada para abogada académica: gestión de interrogaciones, magíster, flashcards jurídicas, tareas, biblioteca normativa, modo focus y sistema de recompensas. Layout responsive con drawer móvil.',
    problem:
      'Centralizar herramientas académicas y jurídicas en un espacio digital funcional, accesible y personalizado.',
    tags: ['App jurídica', 'Workspace', 'React + Vite', 'Legaltech'],
    status: 'Demo funcional',
    demoUrl: 'https://holavale.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/marea',
    featured: true,
    caseNote:
      'Demuestra personalización de herramientas jurídicas para flujos reales de trabajo académico.',
  },
  {
    title: 'Umbral — Comprensión lectora jurídica',
    category: 'Herramientas de estudio',
    description:
      'Plataforma de entrenamiento interpretativo para primer año de Derecho, con 4 modos —El Archivo (40 textos), El Laboratorio (misiones), La Arena (boss) y el Taller—, lector con modo enfoque, sonidos sintetizados y panel docente. Pensada como demo institucional.',
    problem:
      'Diagnosticar y mejorar la comprensión lectora jurídica desde el inicio de la carrera: leer mejor para pensar mejor.',
    tags: ['EdTech jurídica', 'Next.js 16', 'Tailwind v4', 'Recharts', 'Estudio'],
    status: 'Demo funcional',
    demoUrl: 'https://umbral-tau.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/umbral',
    featured: true,
    caseNote:
      'MVP demostrativo presentable a una Escuela de Derecho: 40 textos, misiones, panel docente y piloto de 4 semanas.',
  },
  {
    title: 'Conversaciones DIAT',
    category: 'DIAT · Academia',
    description:
      'Ciclo de charlas donde expertos internacionales exponen en la Sala Quinto Centenario para la Escuela de Derecho y público interesado. Organización y gestión académica.',
    problem:
      'Acercar el debate global sobre Derecho, IA y tecnología a la comunidad universitaria.',
    tags: ['Divulgación', 'Eventos', 'Expertos internacionales', 'PUCV'],
    status: 'Programa académico',
    demoUrl: 'https://diatpucv.cl/',
    caseNote:
      'Demuestra gestión de eventos académicos interdisciplinarios de alcance internacional.',
  },
  {
    title: 'Noticias en un Bit',
    category: 'DIAT · Academia',
    description:
      'Cápsulas breves de noticias sobre inteligencia artificial producidas para el programa DIAT PUCV: divulgación clara y periódica del avance de la IA y su impacto jurídico.',
    problem:
      'Mantener a la comunidad informada sobre IA con un formato corto, riguroso y constante.',
    tags: ['Divulgación', 'IA', 'Contenido', 'PUCV'],
    status: 'Programa académico',
    demoUrl: 'https://diatpucv.cl/',
    caseNote:
      'Demuestra comunicación técnica accesible y producción de contenido de divulgación.',
  },
  {
    title: 'LexFeedback Benfeld',
    category: 'Legaltech',
    description:
      'Herramienta de práctica y retroalimentación para interrogación oral y litigación, con módulo de interrogación oral y feedback estructurado.',
    problem:
      'Practicar la interrogación oral y recibir retroalimentación accionable, no solo teoría.',
    tags: ['Legaltech', 'Litigación', 'Interrogación oral', 'Feedback'],
    status: 'Demo funcional',
    demoUrl: 'https://lexfeedback-benfeld.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/lexfeedback-benfeld',
    caseNote:
      'Demuestra diseño de herramientas de práctica y evaluación para destrezas de litigación.',
  },
  {
    title: 'LegalFlow — Laboral Chile',
    category: 'Legaltech',
    description:
      'Aplicación de Derecho Laboral chileno: flujos guiados para orientar y ordenar escenarios laborales.',
    problem:
      'Ordenar y resolver escenarios de derecho laboral chileno con una herramienta clara.',
    tags: ['Legaltech', 'Derecho Laboral', 'Chile', 'Next.js'],
    status: 'Demo funcional',
    demoUrl: 'https://legalflow-teal.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/legalflow',
    caseNote:
      'Demuestra traducción de un área normativa concreta en un flujo digital utilizable.',
  },
  {
    title: 'Lex RPG — Examen de Grado',
    category: 'RPG jurídico',
    description:
      'RPG narrativo del Examen de Grado chileno (Civil · Procesal · Público). Incluye la expansión "Reinos del Derecho": overworld de 7 regiones con bosses, vidas, desafíos y una biblioteca de artículos legendarios coleccionables. Audio 100% sintetizado, sin archivos.',
    problem:
      'Memorizar y aplicar materia jurídica de forma activa y significativa para el examen de grado.',
    tags: ['RPG', 'Next.js', 'Zustand', 'Examen de Grado', 'Gamificación'],
    status: 'Demo funcional',
    demoUrl: 'https://rpgproce.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/rpgproce',
    featured: true,
    caseNote:
      'El proyecto más extenso: 7 regiones, 34 artículos y 52 desafíos. Sistema de save, audio sintetizado y arquitectura de expansión aislada.',
  },
  {
    title: 'Sucesorio — Casos avanzados',
    category: 'Herramientas de estudio',
    description:
      'Plataforma de estudio de Derecho Sucesorio: casos avanzados, resolución guiada y sistematización de la materia para el examen de grado.',
    problem:
      'Practicar Derecho Sucesorio con casos reales y progresión, no solo lectura pasiva.',
    tags: ['Derecho Sucesorio', 'Casos', 'Examen de Grado', 'Estudio'],
    status: 'Demo funcional',
    demoUrl: 'https://sucesorio.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/sucesorio',
    caseNote:
      'Demuestra conversión de materia jurídica densa en práctica de casos progresiva.',
  },
  {
    title: 'SonicPC — Quizzes relámpago',
    category: 'Herramientas de estudio',
    description:
      'Juego de quizzes rápidos para estudiar de forma activa: preguntas relámpago, ritmo y repetición espaciada para fijar conceptos.',
    problem:
      'Repasar materia de forma ágil y entretenida, midiendo avance en tiempo real.',
    tags: ['Quizzes', 'Gamificación', 'Estudio', 'Spaced repetition'],
    status: 'Demo funcional',
    demoUrl: 'https://sonicpc.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/SONICPC',
    caseNote:
      'Demuestra diseño de microaprendizaje gamificado con feedback inmediato.',
  },
  {
    title: 'Dr. Gabriel Mena',
    category: 'Apps personalizadas',
    description:
      'Plataforma clínica para médico especialista en salud mental: perfil público, panel de pacientes, notas SOAP, citas y seguimiento con visualización de datos.',
    problem:
      'Gestión integral de pacientes, citas, notas clínicas y seguimiento para profesional de salud.',
    tags: ['App médica', 'Dashboard clínico', 'Salud'],
    status: 'Demo funcional',
    demoUrl: 'https://dr-gabrielmena.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/dr-gabrielmena',
    caseNote:
      'Demuestra adaptación de dashboards profesionales a contextos de salud y seguimiento clínico.',
  },
  {
    title: 'Solergy',
    category: 'Pymes',
    description:
      'Landing comercial inteligente para empresa de energía solar: simulador de ahorro, captación de leads, panel de gestión y analytics.',
    problem:
      'Captación de clientes, simulación de ahorro energético y gestión de leads para empresa comercial.',
    tags: ['Landing comercial', 'Simulador', 'Leads', 'CRM', 'Next.js 16'],
    status: 'Demo funcional',
    demoUrl: 'https://solergysoluciones.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/solergy',
    caseNote: 'Demuestra landing comercial con simulador de ahorro, CRM y captación de leads.',
  },
  {
    title: 'El Jardín de Mónica',
    category: 'Apps personalizadas',
    description:
      'App web personal diseñada como jardín vivo y refugio cultural: notas, biblioteca, música, memoria emocional y espacio de bienestar digital.',
    problem:
      'Crear un espacio digital accesible, personalizado y emocional para usuario adulto no técnico.',
    tags: ['App personal', 'React + Vite', 'Accesibilidad'],
    status: 'Demo funcional',
    demoUrl: 'https://monicagarden.vercel.app',
    repoUrl: 'https://github.com/dojedacifuentes/monicagarden',
    caseNote:
      'Demuestra diseño accesible y personalización profunda para usuarios no técnicos.',
  },
];

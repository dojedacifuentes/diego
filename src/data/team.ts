export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  description: string;
  credentials: string[];
  areas: string[];
  quote: string;
  badges: string[];
  color: string;
  accent: string;
  linkedin: string;
  email: string;
}

export const team: TeamMember[] = [
  {
    name: 'Diego Hernán Ojeda Cifuentes',
    initials: 'DO',
    role: 'Director Operativo · Programa DIAT (Derecho, IA y Tecnología) — PUCV',
    description:
      'Licenciado en Ciencias Jurídicas PUCV, con trayectoria en la intersección entre Derecho, inteligencia artificial y filosofía jurídica. En el programa DIAT desde 2020, donde ha liderado proyectos de divulgación, investigación e IA aplicada al derecho.',
    credentials: [
      'Director Operativo del Programa DIAT PUCV (desde 2020)',
      'Subdirector de proyectos y ayudante de investigación · DIAT',
      'Ayudante de Filosofía del Derecho · Facultad de Derecho PUCV',
      'Codirector y encargado del taller de IA jurídica (edición 2023, co-financiado por Vinculación con el Medio PUCV)',
      'Tesis y publicaciones sobre transparencia algorítmica (caso SyRI · Países Bajos)',
      'Creador de la plataforma DIAT Prompting Hub y de herramientas legaltech con IA',
    ],
    areas: [
      'Derecho e inteligencia artificial',
      'Filosofía del Derecho',
      'Transparencia algorítmica',
      'Divulgación académica',
      'Prompt engineering jurídico',
      'Dirección de proyectos',
      'Legaltech',
    ],
    quote:
      'Combina criterio jurídico, formación filosófica y construcción de software para diseñar soluciones digitales aplicadas a problemas reales del Derecho, la educación y la investigación.',
    badges: ['Derecho + IA', 'Filosofía del Derecho', 'Transparencia algorítmica', 'DIAT', 'Investigación', 'Legaltech'],
    color: 'border-cyan-500/20 bg-cyan-500/5',
    accent: 'text-cyan-400',
    linkedin: 'https://www.linkedin.com/in/diegoojedac/',
    email: 'diego.ojeda.c@pucv.cl',
  },
  {
    name: 'Diego Andrade Cortés',
    initials: 'DA',
    role: 'Cofundador · Abogado e IA generativa aplicada',
    description:
      'Abogado de MLV Abogados, con más de 3 años de experiencia profesional y especialización práctica en IA generativa aplicada al trabajo jurídico, la automatización y el diseño de soluciones digitales.',
    credentials: [
      'Abogado en MLV Abogados',
      'Más de 3 años de experiencia en el ejercicio profesional del Derecho',
      'Especializado en IA generativa para optimizar análisis, redacción y organización documental',
      'Usuario avanzado de Claude y herramientas de IA generativa',
      'Flujos de trabajo con IA aplicada a tareas jurídicas, documentales y profesionales',
    ],
    areas: [
      'Ejercicio profesional del Derecho',
      'IA generativa aplicada',
      'Claude avanzado',
      'Automatización de tareas jurídicas',
      'Gestión documental',
      'Redacción y análisis jurídico asistido',
      'Legaltech aplicada',
    ],
    quote:
      'Aporta experiencia práctica desde el ejercicio profesional del Derecho y el uso avanzado de IA generativa para construir herramientas útiles, concretas y adaptadas al trabajo real de abogados.',
    badges: ['Abogado', 'MLV Abogados', 'IA generativa', 'Claude avanzado', 'Automatización jurídica', 'Legaltech'],
    color: 'border-indigo-500/20 bg-indigo-500/5',
    accent: 'text-indigo-400',
    linkedin: 'https://www.linkedin.com/in/diego-andrade-cort%C3%A9s-1a7396166/',
    email: 'diegoandradecortes@gmail.com',
  },
];

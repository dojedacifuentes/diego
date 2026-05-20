export type ServiceKey =
  | 'legaltech'
  | 'documentAutomation'
  | 'aiWorkflows'
  | 'training'
  | 'dashboard'
  | 'studyApp'
  | 'cybersecurity'
  | 'commercialPlatform';

export type Scores = Record<ServiceKey, number>;

export const SERVICE_MAP: Record<ServiceKey, { label: string; description: string; benefit: string }> = {
  legaltech: {
    label: 'IusMachina / Plataforma LegalTech',
    description: 'Diseño de herramientas jurídicas, asistentes de estudio, automatización documental, paneles de gestión, análisis normativo y flujos de IA para el trabajo legal.',
    benefit: 'Centralizar información jurídica, reducir tareas manuales y mejorar trazabilidad de causas, documentos y clientes.',
  },
  documentAutomation: {
    label: 'Automatización documental',
    description: 'Formularios inteligentes, plantillas estructuradas y generación asistida de contratos, minutas, informes, reportes o fichas.',
    benefit: 'Menos tareas repetitivas, menor tasa de error manual y mayor velocidad de respuesta documental.',
  },
  aiWorkflows: {
    label: 'Flujos IA y Prompt Engineering',
    description: 'Diseño de prompts, metodologías y flujos multi-IA para investigación, redacción, revisión, análisis documental o gestión profesional.',
    benefit: 'Resultados de IA más consistentes, flujos reutilizables y mejor control sobre la calidad de salida.',
  },
  training: {
    label: 'Taller o capacitación aplicada',
    description: 'Formación práctica en IA, prompting, automatización documental, herramientas digitales y uso seguro en contextos profesionales.',
    benefit: 'Equipo capacitado, mejor uso de herramientas existentes y reducción de resistencia al cambio tecnológico.',
  },
  dashboard: {
    label: 'Dashboard o panel interno',
    description: 'Sistema para centralizar clientes, proyectos, tareas, estados, documentos, comunicaciones y métricas de seguimiento.',
    benefit: 'Información centralizada, seguimiento visible y mejor capacidad de decisión basada en datos.',
  },
  studyApp: {
    label: 'App de estudio o formación',
    description: 'Plataforma educativa con contenidos estructurados, flashcards, preguntas, simuladores, rutas de aprendizaje y asistencia con IA.',
    benefit: 'Aprendizaje más activo, mejor retención de contenidos complejos y estudio más eficiente.',
  },
  cybersecurity: {
    label: 'Ciberseguridad y uso responsable',
    description: 'Diagnóstico de riesgos, privacidad, manejo de información sensible, buenas prácticas y límites de automatización.',
    benefit: 'Menor exposición de datos sensibles, mayor confianza del cliente y uso responsable de IA.',
  },
  commercialPlatform: {
    label: 'Landing inteligente y captación comercial',
    description: 'Sitio estratégico con simuladores, formularios avanzados, WhatsApp contextual, panel de leads y narrativa comercial clara.',
    benefit: 'Más leads cualificados, proceso de captación más ordenado y mejor primera impresión digital.',
  },
};

export interface WizardOption {
  id: string;
  label: string;
  scores: Partial<Scores>;
}

export interface WizardQuestion {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi';
  options: WizardOption[];
}

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 'occupation',
    title: '¿A qué te dedicas?',
    type: 'single',
    options: [
      { id: 'abogado', label: 'Abogado/a independiente', scores: { legaltech: 20, documentAutomation: 20, aiWorkflows: 10 } },
      { id: 'estudio', label: 'Estudio jurídico', scores: { legaltech: 25, documentAutomation: 25, dashboard: 20 } },
      { id: 'empresa', label: 'Empresa', scores: { dashboard: 20, commercialPlatform: 20, cybersecurity: 15 } },
      { id: 'institucion', label: 'Institución educativa', scores: { studyApp: 25, training: 20, aiWorkflows: 15 } },
      { id: 'docente', label: 'Docente o investigador/a', scores: { studyApp: 20, training: 20, aiWorkflows: 20 } },
      { id: 'estudiante', label: 'Estudiante de Derecho', scores: { studyApp: 30, aiWorkflows: 15, legaltech: 10 } },
      { id: 'pyme', label: 'Pyme o negocio profesional', scores: { commercialPlatform: 25, dashboard: 20, aiWorkflows: 10 } },
      { id: 'profesional', label: 'Profesional independiente', scores: { dashboard: 15, documentAutomation: 15, aiWorkflows: 15 } },
      { id: 'otro', label: 'Otro', scores: { aiWorkflows: 10, training: 10 } },
    ],
  },
  {
    id: 'tasks',
    title: '¿Qué tareas realizas con mayor frecuencia?',
    subtitle: 'Puedes seleccionar varias',
    type: 'multi',
    options: [
      { id: 'redaccion', label: 'Redacción de documentos', scores: { documentAutomation: 25, aiWorkflows: 10 } },
      { id: 'revision', label: 'Revisión de contratos o informes', scores: { documentAutomation: 20, aiWorkflows: 15, legaltech: 10 } },
      { id: 'clientes', label: 'Gestión de clientes', scores: { dashboard: 25, commercialPlatform: 15 } },
      { id: 'causas', label: 'Seguimiento de causas o proyectos', scores: { dashboard: 25, legaltech: 20 } },
      { id: 'clases', label: 'Preparación de clases o materiales', scores: { studyApp: 20, training: 15 } },
      { id: 'estudio', label: 'Estudio y memorización de contenidos', scores: { studyApp: 30, aiWorkflows: 15 } },
      { id: 'analisis', label: 'Análisis normativo o jurisprudencial', scores: { legaltech: 25, aiWorkflows: 20 } },
      { id: 'captacion', label: 'Captación comercial', scores: { commercialPlatform: 25, dashboard: 10 } },
      { id: 'organizacion', label: 'Organización interna', scores: { dashboard: 20, documentAutomation: 10 } },
      { id: 'reportes', label: 'Reportes o presentaciones', scores: { documentAutomation: 15, dashboard: 15 } },
    ],
  },
  {
    id: 'aiUsage',
    title: '¿Cómo usas IA actualmente?',
    type: 'single',
    options: [
      { id: 'no_uso', label: 'No uso IA todavía', scores: { training: 20, aiWorkflows: 15, cybersecurity: 10 } },
      { id: 'basico', label: 'Uso ChatGPT de forma básica', scores: { aiWorkflows: 20, training: 15 } },
      { id: 'sin_flujo', label: 'Uso varias IA sin flujo claro', scores: { aiWorkflows: 25, training: 15, cybersecurity: 10 } },
      { id: 'redactar', label: 'Uso IA para redactar o resumir', scores: { documentAutomation: 20, aiWorkflows: 15 } },
      { id: 'investigar', label: 'Uso IA para investigación', scores: { aiWorkflows: 20, legaltech: 15 } },
      { id: 'procesos', label: 'Uso IA en procesos internos', scores: { dashboard: 20, aiWorkflows: 20, cybersecurity: 15 } },
      { id: 'plataforma', label: 'Tengo una plataforma propia', scores: { dashboard: 20, cybersecurity: 20, legaltech: 15 } },
      { id: 'no_se', label: 'No sé bien cómo podría usar IA', scores: { training: 25, aiWorkflows: 15 } },
    ],
  },
  {
    id: 'timeLoss',
    title: '¿Dónde sientes más pérdida de tiempo?',
    type: 'single',
    options: [
      { id: 'docs', label: 'Documentos repetitivos', scores: { documentAutomation: 30 } },
      { id: 'buscar', label: 'Buscar información', scores: { aiWorkflows: 25, legaltech: 15 } },
      { id: 'ordenar', label: 'Ordenar antecedentes', scores: { dashboard: 25, documentAutomation: 15 } },
      { id: 'comms', label: 'Comunicaciones dispersas', scores: { dashboard: 20, commercialPlatform: 15 } },
      { id: 'seguimiento', label: 'Seguimiento manual', scores: { dashboard: 30 } },
      { id: 'informes', label: 'Preparar informes', scores: { documentAutomation: 25, aiWorkflows: 15 } },
      { id: 'contenidos', label: 'Estudiar o enseñar contenidos complejos', scores: { studyApp: 30 } },
      { id: 'cotizar', label: 'Cotizar o captar clientes', scores: { commercialPlatform: 30 } },
      { id: 'no_claro', label: 'No tengo claro, pero sé que ocurre', scores: { training: 20, aiWorkflows: 15 } },
    ],
  },
  {
    id: 'repetitiveness',
    title: '¿Qué tan repetitivo es tu proceso?',
    type: 'single',
    options: [
      { id: 'bajo', label: 'Bajo', scores: { aiWorkflows: 10 } },
      { id: 'medio', label: 'Medio', scores: { documentAutomation: 15, aiWorkflows: 15 } },
      { id: 'alto', label: 'Alto', scores: { documentAutomation: 25, dashboard: 15 } },
      { id: 'muy_alto', label: 'Muy alto', scores: { documentAutomation: 30, dashboard: 20 } },
    ],
  },
  {
    id: 'weeklyHours',
    title: '¿Cuántas horas semanales consume ese proceso?',
    type: 'single',
    options: [
      { id: '1-3', label: '1 a 3 horas', scores: { training: 10 } },
      { id: '4-8', label: '4 a 8 horas', scores: { aiWorkflows: 15, documentAutomation: 10 } },
      { id: '9-15', label: '9 a 15 horas', scores: { documentAutomation: 20, dashboard: 15 } },
      { id: '16-25', label: '16 a 25 horas', scores: { documentAutomation: 25, dashboard: 20 } },
      { id: '25+', label: 'Más de 25 horas', scores: { documentAutomation: 30, dashboard: 25, aiWorkflows: 15 } },
    ],
  },
  {
    id: 'priority',
    title: '¿Cuál es tu prioridad principal?',
    type: 'single',
    options: [
      { id: 'tiempo', label: 'Ahorrar tiempo', scores: { documentAutomation: 25, aiWorkflows: 15 } },
      { id: 'ordenar', label: 'Ordenar información', scores: { dashboard: 25 } },
      { id: 'automatizar', label: 'Automatizar documentos', scores: { documentAutomation: 30 } },
      { id: 'captacion', label: 'Mejorar captación de clientes', scores: { commercialPlatform: 30 } },
      { id: 'plataforma', label: 'Crear una plataforma interna', scores: { dashboard: 30 } },
      { id: 'capacitar', label: 'Capacitar a mi equipo', scores: { training: 30 } },
      { id: 'seguridad', label: 'Usar IA con seguridad', scores: { cybersecurity: 25, training: 15 } },
      { id: 'estudiar', label: 'Estudiar mejor', scores: { studyApp: 30 } },
      { id: 'profesionalizar', label: 'Profesionalizar mi servicio', scores: { dashboard: 20, legaltech: 15 } },
    ],
  },
  {
    id: 'solutionLevel',
    title: '¿Qué nivel de solución buscas?',
    type: 'single',
    options: [
      { id: 'diagnostico', label: 'Diagnóstico inicial', scores: { training: 15, aiWorkflows: 15 } },
      { id: 'prompt', label: 'Prompt o flujo de IA', scores: { aiWorkflows: 25 } },
      { id: 'automatizacion', label: 'Automatización documental', scores: { documentAutomation: 30 } },
      { id: 'simple', label: 'Plataforma simple', scores: { dashboard: 25, legaltech: 15 } },
      { id: 'dashboard', label: 'Dashboard o panel interno', scores: { dashboard: 30 } },
      { id: 'app', label: 'App de estudio o formación', scores: { studyApp: 30 } },
      { id: 'taller', label: 'Taller o capacitación', scores: { training: 30 } },
      { id: 'medida', label: 'Sistema a medida', scores: { legaltech: 25, dashboard: 20, documentAutomation: 20 } },
    ],
  },
];

export type WizardAnswers = Record<string, string | string[]>;

export function computeScores(answers: WizardAnswers): Scores {
  const scores: Scores = {
    legaltech: 0, documentAutomation: 0, aiWorkflows: 0, training: 0,
    dashboard: 0, studyApp: 0, cybersecurity: 0, commercialPlatform: 0,
  };
  for (const question of WIZARD_QUESTIONS) {
    const answer = answers[question.id];
    if (!answer) continue;
    const ids = Array.isArray(answer) ? answer : [answer];
    for (const id of ids) {
      const opt = question.options.find(o => o.id === id);
      if (opt) {
        for (const [k, v] of Object.entries(opt.scores) as [ServiceKey, number][]) {
          scores[k] += v;
        }
      }
    }
  }
  return scores;
}

export interface DiagnosticResult {
  compatibility: number;
  level: string;
  levelKey: 'initial' | 'good' | 'high' | 'strategic';
  topService: ServiceKey;
  serviceLabel: string;
  serviceDescription: string;
  serviceBenefit: string;
  message: string;
  profile: string;
  weeklyHours: string;
  priority: string;
  // Maturity index (from aiUsage answer)
  maturityKey: import('@/data/benchmark').MaturityKey;
  maturityLabel: string;
  // Top opportunity areas (3 most relevant based on top service)
  topOpportunities: import('@/data/benchmark').OpportunityId[];
}

export function buildResult(answers: WizardAnswers): DiagnosticResult {
  const scores = computeScores(answers);
  const topService = (Object.entries(scores) as [ServiceKey, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
  const topScore = scores[topService];
  const compatibility = Math.min(100, Math.max(45, Math.round(topScore)));

  let level: string;
  let levelKey: 'initial' | 'good' | 'high' | 'strategic';
  let message: string;

  if (compatibility >= 90) {
    level = 'Compatibilidad estratégica';
    levelKey = 'strategic';
    message = 'Tu caso muestra compatibilidad estratégica con una solución estructurada: diagnóstico, diseño de flujo, prototipo funcional y automatización o plataforma a medida.';
  } else if (compatibility >= 75) {
    level = 'Alta compatibilidad';
    levelKey = 'high';
    message = 'Tu proceso tiene alta compatibilidad con soluciones de automatización, plataformas internas o herramientas de IA aplicada. Hay potencial real para ahorrar tiempo y mejorar trazabilidad.';
  } else if (compatibility >= 60) {
    level = 'Buena oportunidad';
    levelKey = 'good';
    message = 'Tu perfil muestra una buena oportunidad para mejorar productividad mediante flujos de IA, automatización parcial o una plataforma simple de apoyo.';
  } else {
    level = 'Oportunidad inicial';
    levelKey = 'initial';
    message = 'Tu proceso muestra una oportunidad inicial para ordenar información, identificar tareas repetitivas y evaluar el uso de IA con bajo riesgo. El primer paso recomendado es un diagnóstico breve.';
  }

  // Build profile label from occupation
  const occupationAnswer = answers['occupation'] as string | undefined;
  const occupationMap: Record<string, string> = {
    abogado: 'Abogado/a independiente',
    estudio: 'Estudio jurídico',
    empresa: 'Empresa',
    institucion: 'Institución educativa',
    docente: 'Docente o investigador/a',
    estudiante: 'Estudiante de Derecho',
    pyme: 'Pyme o negocio profesional',
    profesional: 'Profesional independiente',
    otro: 'Organización',
  };
  const profile = occupationAnswer ? (occupationMap[occupationAnswer] ?? 'Organización') : 'Organización';

  const weeklyHoursAnswer = answers['weeklyHours'] as string | undefined;
  const hoursMap: Record<string, string> = {
    '1-3': '1–3 h/semana', '4-8': '4–8 h/semana', '9-15': '9–15 h/semana',
    '16-25': '16–25 h/semana', '25+': 'más de 25 h/semana',
  };
  const weeklyHours = weeklyHoursAnswer ? (hoursMap[weeklyHoursAnswer] ?? weeklyHoursAnswer) : 'No especificado';

  const priorityAnswer = answers['priority'] as string | undefined;
  const priorityMap: Record<string, string> = {
    tiempo: 'Ahorrar tiempo', ordenar: 'Ordenar información', automatizar: 'Automatizar documentos',
    captacion: 'Mejorar captación', plataforma: 'Crear plataforma', capacitar: 'Capacitar equipo',
    seguridad: 'Usar IA con seguridad', estudiar: 'Estudiar mejor', profesionalizar: 'Profesionalizar servicio',
  };
  const priority = priorityAnswer ? (priorityMap[priorityAnswer] ?? priorityAnswer) : 'No especificado';

  // Compute AI maturity from aiUsage answer
  const aiUsageAnswer = answers['aiUsage'] as string | undefined;
  const maturityMap: Record<string, import('@/data/benchmark').MaturityKey> = {
    no_uso:     'inicial',
    no_se:      'inicial',
    basico:     'explorador',
    redactar:   'explorador',
    sin_flujo:  'operativo',
    investigar: 'operativo',
    procesos:   'estrategico',
    plataforma: 'estrategico',
  };
  const maturityKey = aiUsageAnswer ? (maturityMap[aiUsageAnswer] ?? 'inicial') : 'inicial';
  const maturityLabelMap: Record<string, string> = {
    inicial:     'Inicial',
    explorador:  'Explorador',
    operativo:   'Operativo',
    estrategico: 'Estratégico',
  };
  const maturityLabel = maturityLabelMap[maturityKey];

  // Map topService → top 3 opportunity areas
  const serviceOpportunities: Record<string, import('@/data/benchmark').OpportunityId[]> = {
    legaltech:           ['iusmachina', 'ia_aplicada', 'workflows'],
    documentAutomation:  ['documentacion', 'workflows', 'ia_aplicada'],
    aiWorkflows:         ['workflows', 'ia_aplicada', 'documentacion'],
    training:            ['capacitacion', 'ia_aplicada', 'workflows'],
    dashboard:           ['dashboard', 'workflows', 'documentacion'],
    studyApp:            ['capacitacion', 'iusmachina', 'ia_aplicada'],
    cybersecurity:       ['compliance', 'capacitacion', 'ia_aplicada'],
    commercialPlatform:  ['dashboard', 'documentacion', 'ia_aplicada'],
  };
  const topOpportunities = serviceOpportunities[topService] ?? ['ia_aplicada', 'workflows', 'capacitacion'];

  const svc = SERVICE_MAP[topService];
  return {
    compatibility, level, levelKey, topService,
    serviceLabel: svc.label,
    serviceDescription: svc.description,
    serviceBenefit: svc.benefit,
    message, profile, weeklyHours, priority,
    maturityKey, maturityLabel, topOpportunities,
  };
}

/**
 * Datos de referencia extraídos de:
 * "Análisis de Mercado de la Inteligencia Artificial Legal y Benchmarking Estratégico para 2026"
 * Fuentes: Fortune Business Insights, Mordor Intelligence, Future Market Insights,
 * Lemontech, Webdox CLM, Encuesta Gerencias Legales LATAM 2025, BCN, Carey/Magnar.
 */

// ── Mercado global ─────────────────────────────────────────────────────────────

export const LEGALTECH_MARKET = {
  legalAI_2025_bn: 4.02,
  legalAI_2026_bn: 5.21,
  legalAI_2034_bn: 40.94,
  legalAI_cagr_pct: 29.4,
  legaltech_2026_bn: 38.1,
  legaltech_2036_bn: 78.1,
  legaltech_cagr_pct: 7.6,
  harvey_valuation_bn: 5.0,
  thomson_annual_invest_mUSD: 200,
  firms_ai_efficiency_pct: 88, // "88% de firmas con IA activa reportan mejora en eficiencia"
  source: 'Fortune Business Insights / Mordor Intelligence / Future Market Insights 2026',
};

// ── Chile ───────────────────────────────────────────────────────────────────────

export const CHILE_BENCHMARK = {
  adoption_pct: 24,        // único país LATAM que no supera 30%
  latam_avg_pct: 28,
  tech_sector_pct: 40,     // sector tecnología — mayor adopción
  financial_sector_pct: 37, // sector financiero
  ilia_index: 'Pionero' as const,  // Índice ILIA — conectividad/IA general
  legal_lag: true,         // rezago estructural del sector legal vs economía general
  altech_companies: 11,
  source: 'Encuesta "Retos y Perspectivas Gerencias Legales LATAM 2025" / ILIA 2025',
};

// ── ROI benchmark ───────────────────────────────────────────────────────────────

export const ROI_BENCHMARK = {
  weekly_hours_lost_per_lawyer: 2.5,  // registro manual de tiempo
  monthly_leakage_usd: 510,           // fuga por abogado/mes
  benchmark_roi_pct: 4380,            // Lemontech: 20 abogados, $100/h USD
  benchmark_payback_months: 0.3,      // ~9 días hábiles
  annual_license_usd: 600,            // por abogado/año
  adoption_efficiency_pct: 88,
  study_team_size: 20,                // tamaño de firma en el benchmark de referencia
  study_hourly_rate_usd: 100,
  source: 'Lemontech / LIA Memory 2026',
};

// ── Eficiencia de procesos (Webdox CLM) ────────────────────────────────────────

export const PROCESS_EFFICIENCY = [
  {
    id: 'expedientes',
    process: 'Análisis de expedientes complejos',
    traditional: '3–5 horas',
    withAI: '15–20 min',
    label: '93–95%',
    pct: 94,
  },
  {
    id: 'clausulas',
    process: 'Revisión y extracción de cláusulas',
    traditional: 'Varios días',
    withAI: 'Segundos / minutos',
    label: '90%',
    pct: 90,
  },
  {
    id: 'portafolio',
    process: 'Clasificación masiva de portafolio',
    traditional: '6 meses',
    withAI: '1 día',
    label: '180×',
    pct: 99,
  },
  {
    id: 'consultas',
    process: 'Resolución de consultas frecuentes',
    traditional: 'Interrupción constante',
    withAI: 'Respuesta inmediata',
    label: '70%',
    pct: 70,
  },
  {
    id: 'firma',
    process: 'Flujos de aprobación y firma',
    traditional: 'Ciclos manuales',
    withAI: 'Firma electrónica integrada',
    label: '25%',
    pct: 25,
  },
] as const;

// ── Ley 21.719 ─────────────────────────────────────────────────────────────────

export const LEY_21719 = {
  effective_date: '1 dic 2026',
  grace_period_end: 'dic 2027',
  replaces: 'Ley 19.628',
  requires_dpo: true,
  fines: {
    leve:      { utmMax: 5_000,  clpApprox: 345_000_000,   label: 'Leve'      },
    grave:     { utmMax: 10_000, clpApprox: 690_000_000,   label: 'Grave'     },
    gravisima: { utmMax: 20_000, clpApprox: 1_380_000_000, label: 'Gravísima' },
  },
  reincidence_multiplier: 3,
  source: 'Ley 21.719 · BCN 2026',
} as const;

// ── Niveles de madurez IA ──────────────────────────────────────────────────────

export type MaturityKey = 'inicial' | 'explorador' | 'operativo' | 'estrategico';

export interface MaturityLevel {
  key: MaturityKey;
  label: string;
  description: string;
  sectorPct: number;   // estimado % del sector legal chileno en este nivel
  color: string;
  border: string;
  bg: string;
  ring: string;
}

export const MATURITY_LEVELS: Record<MaturityKey, MaturityLevel> = {
  inicial: {
    key: 'inicial',
    label: 'Inicial',
    description: 'Sin adopción activa de IA en procesos jurídicos',
    sectorPct: 53,
    color: 'text-zinc-400',
    border: 'border-zinc-500/30',
    bg: 'bg-zinc-500/8',
    ring: 'ring-zinc-500/40',
  },
  explorador: {
    key: 'explorador',
    label: 'Explorador',
    description: 'Uso básico de IA sin flujos definidos',
    sectorPct: 29,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/8',
    ring: 'ring-cyan-500/40',
  },
  operativo: {
    key: 'operativo',
    label: 'Operativo',
    description: 'Flujos establecidos y uso regular de IA',
    sectorPct: 12,
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/8',
    ring: 'ring-indigo-500/40',
  },
  estrategico: {
    key: 'estrategico',
    label: 'Estratégico',
    description: 'IA integrada en operaciones jurídicas clave',
    sectorPct: 6,
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/8',
    ring: 'ring-violet-500/40',
  },
};

// ── Áreas de oportunidad ───────────────────────────────────────────────────────

export type OpportunityId =
  | 'documentacion'
  | 'capacitacion'
  | 'compliance'
  | 'workflows'
  | 'dashboard'
  | 'iusmachina'
  | 'ia_aplicada';

export interface OpportunityArea {
  id: OpportunityId;
  label: string;
  description: string;
  accentColor: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
}

export const OPPORTUNITY_AREAS: Record<OpportunityId, OpportunityArea> = {
  documentacion: {
    id: 'documentacion',
    label: 'Automatización documental',
    description: 'Formularios inteligentes, contratos, minutas y reportes generados con IA',
    accentColor: '#22d3ee',
    borderClass: 'border-cyan-500/30',
    bgClass: 'bg-cyan-500/8',
    textClass: 'text-cyan-400',
  },
  capacitacion: {
    id: 'capacitacion',
    label: 'Capacitación IA',
    description: 'Prompting jurídico, flujos multi-IA y alfabetización digital aplicada',
    accentColor: '#818cf8',
    borderClass: 'border-indigo-500/30',
    bgClass: 'bg-indigo-500/8',
    textClass: 'text-indigo-400',
  },
  compliance: {
    id: 'compliance',
    label: 'Compliance Ley 21.719',
    description: 'Adecuación normativa, auditorías de datos y designación de DPO',
    accentColor: '#f59e0b',
    borderClass: 'border-amber-500/30',
    bgClass: 'bg-amber-500/8',
    textClass: 'text-amber-400',
  },
  workflows: {
    id: 'workflows',
    label: 'Workflows IA',
    description: 'Flujos multi-IA para investigación, redacción y análisis documental',
    accentColor: '#a78bfa',
    borderClass: 'border-violet-500/30',
    bgClass: 'bg-violet-500/8',
    textClass: 'text-violet-400',
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard interno',
    description: 'Panel centralizado de clientes, causas, tareas y métricas de gestión',
    accentColor: '#34d399',
    borderClass: 'border-emerald-500/30',
    bgClass: 'bg-emerald-500/8',
    textClass: 'text-emerald-400',
  },
  iusmachina: {
    id: 'iusmachina',
    label: 'IusMachina',
    description: 'Plataforma LegalTech personalizada para tu práctica jurídica',
    accentColor: '#f87171',
    borderClass: 'border-rose-500/30',
    bgClass: 'bg-rose-500/8',
    textClass: 'text-rose-400',
  },
  ia_aplicada: {
    id: 'ia_aplicada',
    label: 'IA Aplicada',
    description: 'Solución arquitectónica a medida para tu proceso jurídico crítico',
    accentColor: '#38bdf8',
    borderClass: 'border-sky-500/30',
    bgClass: 'bg-sky-500/8',
    textClass: 'text-sky-400',
  },
};

// ── Mapa servicio → oportunidades ─────────────────────────────────────────────

export const SERVICE_TO_OPPORTUNITIES: Record<string, OpportunityId[]> = {
  legaltech:           ['iusmachina', 'ia_aplicada', 'workflows'],
  documentAutomation:  ['documentacion', 'workflows', 'ia_aplicada'],
  aiWorkflows:         ['workflows', 'ia_aplicada', 'documentacion'],
  training:            ['capacitacion', 'ia_aplicada', 'workflows'],
  dashboard:           ['dashboard', 'workflows', 'documentacion'],
  studyApp:            ['capacitacion', 'iusmachina', 'ia_aplicada'],
  cybersecurity:       ['compliance', 'capacitacion', 'ia_aplicada'],
  commercialPlatform:  ['dashboard', 'documentacion', 'ia_aplicada'],
};

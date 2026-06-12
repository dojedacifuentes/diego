import { DiogenesLamp } from '@/components/common/DiogenesLamp';

const footerCols = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Perfil', href: '/#perfil' },
      { label: 'Trayectoria', href: '/#trayectoria' },
      { label: 'Investigación', href: '/#investigacion' },
      { label: 'Docencia y talleres', href: '/#docencia' },
    ],
  },
  {
    title: 'Diógenes Lab',
    links: [
      { label: 'Proyectos', href: '/#lab' },
      { label: 'Diagnóstico IA', href: '/#evaluacion' },
      { label: 'Simulador ROI', href: '/#simulador' },
      { label: 'Programa del taller', href: '/capacitacion' },
    ],
  },
  {
    title: 'Trabajo',
    links: [
      { label: 'Servicios', href: '/#servicios' },
      { label: 'Método', href: '/#metodo' },
      { label: 'Contacto', href: '/#contacto' },
    ],
  },
];

const STACK = ['Next.js', 'TypeScript', 'Claude', 'Vercel', 'Tailwind'];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line-soft)] bg-[oklch(0.105_0.021_255)] mt-12 overflow-hidden">
      <div className="absolute top-0 inset-x-0 hairline-cyan" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 space-y-12">

        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-12">
          {/* Identity */}
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 px-3 rounded-[10px] border border-[oklch(0.78_0.13_205/0.4)] bg-gradient-to-br from-[oklch(0.78_0.13_205/0.14)] to-[oklch(0.62_0.19_285/0.1)] flex items-center justify-center">
                <span className="mono text-sm font-bold tracking-tight text-[oklch(0.86_0.1_205)]">
                  DO<span className="text-[oklch(0.62_0.19_285)]">/</span>
                </span>
              </div>
              <div className="leading-none">
                <div className="text-base font-bold tracking-tight text-white">Diego Ojeda</div>
                <div className="text-[9px] mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
                  Derecho · IA · Filosofía
                </div>
              </div>
            </div>

            <p className="text-[13px] text-zinc-500 leading-relaxed">
              Investigación en transparencia algorítmica, docencia en filosofía del derecho
              y desarrollo de herramientas digitales para el aprendizaje y ejercicio del derecho.
            </p>

            {/* Diógenes Lab seal */}
            <div className="flex items-center gap-2.5 rounded-lg border lab-chip px-3.5 py-2.5 w-fit">
              <DiogenesLamp className="w-4 h-4" />
              <div className="leading-none">
                <span className="text-[11px] mono font-semibold">Diógenes Lab</span>
                <div className="text-[9px] mono text-zinc-500 mt-1">
                  software · aprendizaje jurídico · crítica algorítmica
                </div>
              </div>
            </div>

            {/* Status line */}
            <div className="flex items-center gap-2.5 text-[11px] mono text-zinc-600">
              <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
              <span className="text-zinc-400">diegoojeda.cl</span>
              <span className="text-zinc-700">·</span>
              <span>Valparaíso, Chile</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerCols.map(col => (
              <div key={col.title} className="space-y-3.5">
                <div className="eyebrow text-zinc-600">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-[13px] text-zinc-500 hover:text-[oklch(0.84_0.11_205)] transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--line-soft)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] text-zinc-600 mono">
            © 2026 Diego Ojeda · Diógenes Lab. Pensar, enseñar, construir.
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {STACK.map(t => (
              <span key={t} className="badge-tech py-1! px-2.5! text-[10px]!">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

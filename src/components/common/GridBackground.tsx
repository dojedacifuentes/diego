export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Aurora — slow drifting gradient blobs (living, studio-grade) */}
      <div
        className="aurora-blob"
        style={{
          top: '-12%', left: '-8%', width: '46vw', height: '46vw',
          background: 'radial-gradient(circle, oklch(0.78 0.13 205 / 0.16), transparent 70%)',
          animation: 'aurora-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: '20%', right: '-12%', width: '42vw', height: '42vw',
          background: 'radial-gradient(circle, oklch(0.62 0.19 285 / 0.14), transparent 70%)',
          animation: 'aurora-b 26s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: '-16%', left: '28%', width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, oklch(0.74 0.14 165 / 0.1), transparent 70%)',
          animation: 'aurora-c 30s ease-in-out infinite',
        }}
      />

      {/* Technical grid, faded toward edges */}
      <div className="absolute inset-0 grid-bg grid-fade-mask opacity-70" />

      {/* Primary radial spotlight — cold cyan from above */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -12%, oklch(0.78 0.13 205 / 0.09) 0%, transparent 65%)',
        }}
      />

      {/* Violet counterlight, lower right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 92% 78%, oklch(0.62 0.19 285 / 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Deep navy vignette to anchor the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, oklch(0.09 0.02 255 / 0.55) 100%)',
        }}
      />

      {/* Horizon beam */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 15%, oklch(0.78 0.13 205 / 0.35) 50%, transparent 85%)',
        }}
      />
    </div>
  );
}

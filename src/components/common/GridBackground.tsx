export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
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

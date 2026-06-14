import { ImageResponse } from 'next/og';

export const alt = 'Diego Ojeda — Derecho, IA y Filosofía Jurídica Aplicada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const cyan = 'oklch(0.82 0.12 205)';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(900px circle at 25% 18%, rgba(34,200,230,0.16), transparent 60%), #0c1320',
          fontFamily: 'sans-serif',
          color: '#e8edf4',
          position: 'relative',
        }}
      >
        {/* grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(34,200,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,200,230,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            display: 'flex',
          }}
        />
        {/* top row: monogram + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                borderRadius: 18,
                border: '1px solid rgba(34,200,230,0.45)',
                background: 'rgba(34,200,230,0.12)',
                fontSize: 30,
                fontWeight: 800,
                color: cyan,
              }}
            >
              DO/
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 26, fontWeight: 700 }}>Diego Ojeda</span>
              <span style={{ fontSize: 16, color: '#7e8aa0', letterSpacing: 3 }}>
                DERECHO · IA · FILOSOFÍA
              </span>
            </div>
          </div>
          <span style={{ fontSize: 18, color: '#5fe0b0', display: 'flex' }}>● diegoojeda.cl</span>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            Derecho, IA y{' '}
            <span style={{ color: cyan }}>filosofía jurídica aplicada.</span>
          </span>
          <span style={{ fontSize: 27, color: '#9aa6ba', maxWidth: 900, marginTop: 14 }}>
            Investigo, enseño y construyo herramientas para pensar el derecho en la era
            algorítmica.
          </span>
        </div>

        {/* bottom tags */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['Transparencia algorítmica', 'LegalTech', 'Prompt Engineering', 'Diógenes Lab'].map(
            t => (
              <span
                key={t}
                style={{
                  fontSize: 18,
                  color: '#aeb9cc',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  padding: '8px 16px',
                  display: 'flex',
                }}
              >
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}

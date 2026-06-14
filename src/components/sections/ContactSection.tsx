'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, X, Mail, ScanLine, ArrowUpRight, Clock3, AlertTriangle, Loader2 } from 'lucide-react';
import { useDiagnostic } from '@/store/diagnosticContext';
import { SectionHeader } from '@/components/common/SectionHeader';

const CONTACT_EMAIL = 'dojedacifuentes@gmail.com';     // proyectos / personal
const EMAIL_DIAT = 'diego.ojeda.c@pucv.cl';            // asuntos DIAT / académicos
const LINKEDIN_URL = 'https://www.linkedin.com/in/diegoojedac/';
const WA_NUMBER = '56934301930';

// Real form delivery via Formspree (no backend, no exposed secrets).
// 1) Create a free form at https://formspree.io  2) paste your form id below
//    (looks like "xayzqwer"). While it stays as the placeholder, the form
//    falls back to opening the mail client so it never silently fails.
const FORMSPREE_ID = 'TU_FORM_ID';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;
const FORM_CONFIGURED = FORMSPREE_ID !== 'TU_FORM_ID';

const AREAS = ['Jurídico', 'Académico', 'Pyme', 'Salud', 'Otro'];

const PROBLEM_TYPES = [
  'Plataforma o app a medida',
  'Automatización documental',
  'Dashboard o panel interno',
  'Flujos de IA / prompting',
  'Taller o capacitación',
  'Diagnóstico digital',
  'Otro',
];

const NEXT_STEPS = [
  { num: '01', text: 'Me cuentas el proceso que quieres ordenar, automatizar o convertir en plataforma.' },
  { num: '02', text: 'Conversación breve de diagnóstico: contexto, volumen, herramientas actuales.' },
  { num: '03', text: 'Recibes una propuesta inicial clara: alcance, etapas y entregables.' },
];

export function ContactSection() {
  const { result: diagResult, clearResult } = useDiagnostic();

  const [form, setForm] = useState({
    name: '',
    org: '',
    area: '',
    type: '',
    problem: '',
    email: '',
    wa: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sent = status === 'sent';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  function buildDiagnosticBlock() {
    if (!diagResult) return '';
    return `\n\n--- AI Readiness Scanner ---\nScore: ${diagResult.compatibility}/100\nNivel: ${diagResult.level}\nMadurez digital: ${diagResult.maturityLabel}\nPerfil: ${diagResult.profile}\nOportunidad: ${diagResult.serviceLabel}\nHoras semanales: ${diagResult.weeklyHours}`;
  }

  const buildMailto = () => {
    const subject = encodeURIComponent(
      `Solicitud de diagnóstico — ${form.type || 'Proceso'} — ${form.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nOrganización / Rubro: ${form.org}\nÁrea: ${form.area}\nTipo de problema: ${form.type}\nProceso a ordenar: ${form.problem}\nCorreo: ${form.email}\nWhatsApp: ${form.wa}${buildDiagnosticBlock()}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const buildWhatsApp = () => {
    const diagLine = diagResult
      ? `\n\n📊 Scanner: ${diagResult.compatibility}/100 · ${diagResult.level} · ${diagResult.serviceLabel}`
      : '';
    const text = encodeURIComponent(
      `Hola Diego, quiero solicitar un diagnóstico.\n\nNombre: ${form.name || '(no indicado)'}\nOrganización: ${form.org || '(no indicado)'}\nÁrea: ${form.area || '(no indicada)'}\nTipo: ${form.type || '(no indicado)'}\nProceso: ${form.problem || '(no indicado)'}${diagLine}`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No provider configured yet → graceful mailto fallback (never fails silently)
    if (!FORM_CONFIGURED) {
      window.location.href = buildMailto();
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          organizacion: form.org,
          area: form.area,
          tipo: form.type,
          proceso: form.problem,
          email: form.email,
          whatsapp: form.wa,
          diagnostico: buildDiagnosticBlock() || 'sin diagnóstico adjunto',
          _subject: `Solicitud — ${form.type || 'Proceso'} — ${form.name}`,
        }),
      });
      if (res.ok) setStatus('sent');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Closing ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 100%, oklch(0.78 0.13 205 / 0.07) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-12 relative">

        <SectionHeader
          index="05"
          eyebrow="Contacto"
          title={<>Diseñemos el sistema que tu <em className="serif-italic text-gradient-tech">proceso</em> necesita.</>}
          sub="El primer paso es una conversación, no una compra. Cuéntame qué quieres ordenar, automatizar o convertir en plataforma."
          align="center"
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">

          {/* ── Left: what happens next ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="space-y-4 lg:sticky lg:top-28"
          >
            <div className="panel-deep rounded-2xl p-6 space-y-5">
              <div className="eyebrow text-zinc-600">Qué pasa después de escribir</div>
              <div className="space-y-4">
                {NEXT_STEPS.map(({ num, text }) => (
                  <div key={num} className="flex gap-3.5">
                    <span className="mono text-[11px] text-[oklch(0.82_0.12_205)] font-bold mt-0.5 shrink-0">{num}</span>
                    <p className="text-[12.5px] text-zinc-400 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-[var(--line-soft)]">
                <Clock3 className="w-3.5 h-3.5 text-[oklch(0.74_0.14_165)]" />
                <span className="text-[11px] mono text-zinc-500">respuesta en 24–48 horas hábiles</span>
              </div>
            </div>

            {/* Direct channels */}
            <div className="grid grid-cols-1 gap-2.5">
              <a
                href={buildWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 panel rounded-xl px-4 py-3.5 card-surface-hover"
              >
                <div className="w-9 h-9 rounded-lg border border-[oklch(0.74_0.14_165/0.35)] bg-[oklch(0.74_0.14_165/0.07)] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[oklch(0.78_0.13_162)]" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white">Enviar mensaje directo</div>
                  <div className="text-[11px] mono text-zinc-600">WhatsApp · sin formulario</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[oklch(0.78_0.13_162)] transition-colors" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3.5 panel rounded-xl px-4 py-3.5 card-surface-hover"
              >
                <div className="w-9 h-9 rounded-lg border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.07)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[oklch(0.82_0.12_205)]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white">Correo · proyectos</div>
                  <div className="text-[11px] mono text-zinc-600 truncate">{CONTACT_EMAIL}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[oklch(0.82_0.12_205)] transition-colors shrink-0" />
              </a>
              <a
                href={`mailto:${EMAIL_DIAT}`}
                className="group flex items-center gap-3.5 panel rounded-xl px-4 py-3.5 card-surface-hover"
              >
                <div className="w-9 h-9 rounded-lg border border-[oklch(0.62_0.19_285/0.35)] bg-[oklch(0.62_0.19_285/0.07)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[oklch(0.72_0.16_285)]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white">Correo · DIAT / académico</div>
                  <div className="text-[11px] mono text-zinc-600 truncate">{EMAIL_DIAT}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[oklch(0.72_0.16_285)] transition-colors shrink-0" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 panel rounded-xl px-4 py-3.5 card-surface-hover"
              >
                <div className="w-9 h-9 rounded-lg border border-[var(--line-mid)] bg-white/[0.02] flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-zinc-300" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white">LinkedIn · perfil profesional</div>
                  <div className="text-[11px] mono text-zinc-600 truncate">in/diegoojedac</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* ── Right: form panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            {/* Scanner result banner */}
            {diagResult && !sent && (
              <div className="mb-3 rounded-xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.06)] p-4 flex items-start gap-3">
                <ScanLine className="w-4 h-4 text-[oklch(0.82_0.12_205)] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[oklch(0.86_0.09_205)]">
                    Tu resultado del scanner se adjuntará a la solicitud
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5 mono">
                    score {diagResult.compatibility}/100 · {diagResult.level} · {diagResult.serviceLabel}
                  </p>
                </div>
                <button
                  onClick={clearResult}
                  className="text-zinc-600 hover:text-zinc-400 transition-colors shrink-0"
                  aria-label="Quitar diagnóstico"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="panel-raised rounded-2xl overflow-hidden corner-frame">
              {/* Form chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.85)]">
                <span className="text-[11px] mono text-zinc-400">solicitud-de-diagnostico</span>
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
                  <span className="text-[9px] mono text-zinc-500 uppercase">canal abierto</span>
                </span>
              </div>

              <div className="p-6 sm:p-7">
                {sent ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[oklch(0.78_0.13_205/0.1)] border border-[oklch(0.78_0.13_205/0.35)] flex items-center justify-center mx-auto glow-cyan">
                      <Send className="w-6 h-6 text-[oklch(0.82_0.12_205)]" />
                    </div>
                    <p className="text-base font-bold text-white">Solicitud enviada</p>
                    <p className="text-xs text-zinc-500">Te responderé con una propuesta inicial clara y viable.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-4"
                    >
                      Enviar otra solicitud
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-500 font-medium">Nombre *</label>
                        <input
                          name="name" value={form.name} onChange={handleChange} required
                          placeholder="Tu nombre" className="input-tech"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-500 font-medium">Organización o rubro</label>
                        <input
                          name="org" value={form.org} onChange={handleChange}
                          placeholder="Estudio jurídico, facultad, empresa…" className="input-tech"
                        />
                      </div>
                    </div>

                    {/* Área segmented */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-500 font-medium">Área</label>
                      <div className="flex flex-wrap gap-2">
                        {AREAS.map(a => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, area: a }))}
                            className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all ${
                              form.area === a
                                ? 'border-[oklch(0.78_0.13_205/0.55)] bg-[oklch(0.78_0.13_205/0.12)] text-[oklch(0.86_0.09_205)]'
                                : 'border-[var(--line-soft)] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-500 font-medium">Tipo de problema</label>
                      <select
                        name="type" value={form.type} onChange={handleChange}
                        className="input-tech appearance-none"
                      >
                        <option value="">Seleccionar…</option>
                        {PROBLEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-500 font-medium">¿Qué proceso quieres ordenar? *</label>
                      <textarea
                        name="problem" value={form.problem} onChange={handleChange} required rows={3}
                        placeholder="Describe el proceso que quieres ordenar, automatizar o digitalizar…"
                        className="input-tech resize-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-500 font-medium">Correo *</label>
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="tu@correo.cl" className="input-tech"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-500 font-medium">WhatsApp (opcional)</label>
                        <input
                          name="wa" value={form.wa} onChange={handleChange}
                          placeholder="+56 9 …" className="input-tech"
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="rounded-lg border border-[oklch(0.66_0.19_18/0.4)] bg-[oklch(0.66_0.19_18/0.08)] px-4 py-3 flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-[oklch(0.74_0.15_18)] shrink-0" />
                        <p className="text-[12px] text-[oklch(0.82_0.1_18)] leading-snug">
                          No se pudo enviar. Escríbeme directo por WhatsApp o correo aquí al lado.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Solicitar diagnóstico
                          </>
                        )}
                      </button>
                      <a
                        href={buildWhatsApp()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-[oklch(0.78_0.13_162)]! border-[oklch(0.74_0.14_165/0.3)]! hover:bg-[oklch(0.74_0.14_165/0.08)]!"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Mensaje directo
                      </a>
                    </div>

                    <p className="text-[11px] text-zinc-700 text-center pt-1 mono">
                      sin spam · sin compromiso · respuesta personal
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

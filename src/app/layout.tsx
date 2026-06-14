import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import { GridBackground } from '@/components/common/GridBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { CursorFX } from '@/components/common/CursorFX';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ClientProviders } from '@/components/common/ClientProviders';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://diegoojeda.cl'),
  title: 'Diego Ojeda | Derecho, Inteligencia Artificial y Filosofía Jurídica Aplicada',
  description:
    'Plataforma personal de Diego Ojeda: investigación en transparencia algorítmica, docencia en filosofía del derecho, dirección operativa del programa DIAT y desarrollo de herramientas digitales para el aprendizaje y ejercicio del derecho. Diógenes Lab: software, aprendizaje jurídico y crítica algorítmica.',
  keywords:
    'Diego Ojeda, transparencia algorítmica, filosofía del derecho, IA jurídica, legaltech, DIAT, PUCV, prompting jurídico, Claude, Diógenes Lab, derecho e inteligencia artificial, EdTech jurídica',
  alternates: { canonical: '/' },
  authors: [{ name: 'Diego Ojeda', url: 'https://diegoojeda.cl' }],
  openGraph: {
    title: 'Diego Ojeda — Derecho, IA y Filosofía Jurídica Aplicada',
    description:
      'Investigo, enseño y diseño herramientas para comprender el derecho en la era algorítmica. Investigación, docencia, DIAT y Diógenes Lab.',
    type: 'website',
    locale: 'es_CL',
    url: 'https://diegoojeda.cl',
    siteName: 'Diego Ojeda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Ojeda — Derecho, IA y Filosofía Jurídica Aplicada',
    description:
      'Investigo, enseño y construyo herramientas para pensar el derecho en la era algorítmica.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="scanlines min-h-full bg-[oklch(0.1_0.02_255)] text-zinc-200 overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Diego Ojeda',
              url: 'https://diegoojeda.cl',
              jobTitle: 'Jurista · Investigador en IA y Derecho · Constructor de herramientas',
              email: 'mailto:dojedacifuentes@gmail.com',
              alumniOf: [
                { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Católica de Valparaíso' },
                { '@type': 'CollegeOrUniversity', name: 'Pontificia Universidad Católica de Chile' },
              ],
              knowsAbout: [
                'Transparencia algorítmica',
                'Filosofía del Derecho',
                'Inteligencia Artificial aplicada al Derecho',
                'LegalTech',
                'Prompt Engineering',
              ],
              worksFor: { '@type': 'Organization', name: 'Diógenes Lab' },
              address: { '@type': 'PostalAddress', addressLocality: 'Valparaíso', addressCountry: 'CL' },
            }),
          }}
        />
        <GridBackground />
        <CursorFX />
        <ScrollProgress />
        <ClientProviders>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CommandPalette />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

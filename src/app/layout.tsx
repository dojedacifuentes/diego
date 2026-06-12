import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import { GridBackground } from '@/components/common/GridBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AICommandBar } from '@/components/common/AICommandBar';
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
  title: 'Diego Ojeda | Derecho, Inteligencia Artificial y Filosofía Jurídica Aplicada',
  description:
    'Plataforma personal de Diego Ojeda: investigación en transparencia algorítmica, docencia en filosofía del derecho, dirección operativa del programa DIAT y desarrollo de herramientas digitales para el aprendizaje y ejercicio del derecho. Diógenes Lab: software, aprendizaje jurídico y crítica algorítmica.',
  keywords:
    'Diego Ojeda, transparencia algorítmica, filosofía del derecho, IA jurídica, legaltech, DIAT, PUCV, prompting jurídico, Claude, Diógenes Lab, derecho e inteligencia artificial, EdTech jurídica',
  openGraph: {
    title: 'Diego Ojeda — Derecho, IA y Filosofía Jurídica Aplicada',
    description:
      'Investigo, enseño y diseño herramientas para comprender el derecho en la era algorítmica. Investigación, docencia, DIAT y Diógenes Lab.',
    type: 'website',
    locale: 'es_CL',
    url: 'https://diegoojeda.cl',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[oklch(0.115_0.022_255)] text-zinc-200 overflow-x-hidden">
        <GridBackground />
        <ClientProviders>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AICommandBar />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

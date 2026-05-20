import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Ojeda & Andrade Labs | Apps inteligentes, automatización documental y ciberseguridad aplicada',
  description:
    'Laboratorio de soluciones digitales para abogados, profesionales, pymes e instituciones. Desarrollamos apps personalizadas, automatización documental, plataformas jurídicas, talleres de IA y ciberseguridad aplicada.',
  keywords:
    'IA jurídica, legaltech, automatización documental, apps para abogados, ciberseguridad, talleres de IA, Vercel, GitHub, Claude, tecnología jurídica, Ojeda Andrade Labs, IusMachina',
  openGraph: {
    title: 'Ojeda & Andrade Labs',
    description:
      'Apps inteligentes, automatización documental y ciberseguridad aplicada para abogados, profesionales, pymes e instituciones.',
    type: 'website',
    locale: 'es_CL',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[oklch(0.07_0.015_250)] text-zinc-200 overflow-x-hidden">
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

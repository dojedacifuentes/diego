import { HeroSection } from '@/components/sections/HeroSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { TrajectorySection } from '@/components/sections/TrajectorySection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { TrainingPreviewSection } from '@/components/sections/TrainingPreviewSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { AIEvaluationSection } from '@/components/sections/AIEvaluationSection';
import { SavingsSimulator } from '@/components/sections/SavingsSimulator';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { BenchmarkSection } from '@/components/sections/BenchmarkSection';
import { ContactSection } from '@/components/sections/ContactSection';

/**
 * Narrative: identity → proof → lab → offer → close.
 *  Hero      — quién soy (pensar · enseñar · construir)
 *  01 Perfil — posicionamiento + pilares
 *  02 Trayectoria — academia y código
 *  03 Investigación — transparencia algorítmica
 *  04 Docencia — ayudantía, DIAT, taller 2026
 *  05 Diógenes Lab — proyectos reales
 *  06 Scanner · 07 ROI — experimentos en vivo
 *  08 Servicios — qué construyo
 *  09 Método — pipeline
 *  10 Contexto — benchmark LegalTech
 *  11 Contacto — cierre
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <TrajectorySection />
      <ResearchSection />
      <TrainingPreviewSection />
      <PortfolioSection />
      <AIEvaluationSection />
      <SavingsSimulator />
      <SolutionsSection />
      <MethodSection />
      <BenchmarkSection />
      <ContactSection />
    </>
  );
}

import { HeroSection } from '@/components/sections/HeroSection';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { TrajectorySection } from '@/components/sections/TrajectorySection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ContactSection } from '@/components/sections/ContactSection';

/**
 * Lean home — the personal spine. Identity → proof → contact.
 * The heavier interactive tools (AI scanner, ROI, services, method,
 * benchmark) live on /diagnostico so the home stays uncluttered.
 *
 *  Hero          — quién soy (terminal viva)
 *  01 Perfil     — pensar · enseñar · construir
 *  02 Trayectoria
 *  03 Investigación — transparencia algorítmica
 *  04 Diógenes Lab  — proyectos
 *  05 Contacto
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <TrajectorySection />
      <ResearchSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
}

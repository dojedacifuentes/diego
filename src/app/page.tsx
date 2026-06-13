import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/common/Marquee';
import { PillarsSection } from '@/components/sections/PillarsSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { TrajectorySection } from '@/components/sections/TrajectorySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SectionDivider } from '@/components/common/SectionDivider';

/**
 * Lean home — leads with identity, then proof, then depth, then contact.
 * Heavier interactive tools (scanner, ROI, services, method, benchmark)
 * live on /diagnostico so the home stays focused.
 *
 *  Hero            — quién soy (terminal viva)
 *  ▸ Marquee       — ticker de credibilidad
 *  01 Perfil       — pensar · enseñar · construir
 *  02 Diógenes Lab — proyectos (la prueba, arriba)
 *  03 Investigación — transparencia algorítmica
 *  04 Trayectoria
 *  05 Contacto
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <PillarsSection />
      <SectionDivider label="lab" />
      <PortfolioSection />
      <SectionDivider label="research" />
      <ResearchSection />
      <SectionDivider label="path" />
      <TrajectorySection />
      <ContactSection />
    </>
  );
}

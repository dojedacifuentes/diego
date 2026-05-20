import { HeroSection } from '@/components/sections/HeroSection';
import { AIEvaluationSection } from '@/components/sections/AIEvaluationSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { BenchmarkSection } from '@/components/sections/BenchmarkSection';
import { SavingsSimulator } from '@/components/sections/SavingsSimulator';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TrainingPreviewSection } from '@/components/sections/TrainingPreviewSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AIEvaluationSection />
      <ProblemSection />
      <SolutionsSection />
      <BenchmarkSection />
      <SavingsSimulator />
      <PortfolioSection />
      <TrainingPreviewSection />
      <MethodSection />
      <ContactSection />
    </>
  );
}

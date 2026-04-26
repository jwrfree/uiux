import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ProcessSection from '@/components/sections/process';
import ProjectsShowcase from '@/components/sections/projects-showcase';
import Faq from '@/components/sections/faq';
import CtaSection from '@/components/sections/cta';

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <ProjectsShowcase />
      <Faq />
      <CtaSection />
    </main>
  );
}

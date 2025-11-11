import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ProjectsShowcase from '@/components/sections/projects-showcase';
import ProcessSection from '@/components/sections/process';
import Faq from '@/components/sections/faq';
import CtaSection from '@/components/sections/cta';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export default function Home() {
  return (
    <main>
      <ScrollAnimation>
        <HeroSection />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <AboutSection />
      </ScrollAnimation>
      <ScrollAnimation delay={150}>
        <ProjectsShowcase />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <ProcessSection />
      </ScrollAnimation>
      <ScrollAnimation delay={150}>
        <Faq />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <CtaSection />
      </ScrollAnimation>
    </main>
  );
}

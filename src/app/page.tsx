import Header from '@/components/sections/header';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ProjectsShowcase from '@/components/sections/projects-showcase';
import ProcessSection from '@/components/sections/process';
import Faq from '@/components/sections/faq';
import CtaSection from '@/components/sections/cta';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsShowcase />
        <ProcessSection />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
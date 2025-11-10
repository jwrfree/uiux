
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            <ScrollAnimation>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-dark tracking-tighter mb-6">
                About Me
                </h1>
            </ScrollAnimation>
            <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-none">
                <ScrollAnimation delay={150}>
                    <p>
                        I'm a passionate and results-oriented Senior UI/UX Designer with a knack for creating intuitive, engaging, and beautiful user experiences. I believe that great design is not just about aesthetics, but about solving real-world problems and making technology more human-centric.
                    </p>
                </ScrollAnimation>
                <ScrollAnimation delay={300}>
                    <p>
                        Throughout my career, I've had the privilege of working on a diverse range of projects, from complex enterprise software to consumer-facing mobile apps. This has given me a deep understanding of the entire product design lifecycle, from initial research and concept development to prototyping, user testing, and final implementation.
                    </p>
                </ScrollAnimation>
                <ScrollAnimation delay={450}>
                    <h3 className="font-display font-semibold text-2xl mt-8 mb-4">My Design Philosophy</h3>
                </ScrollAnimation>
              <ul className="space-y-4">
                <ScrollAnimation delay={600}>
                    <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                        <span className="font-semibold">Empathy-Driven:</span> I always start by putting myself in the user's shoes to understand their needs, motivations, and pain points.
                    </span>
                    </li>
                </ScrollAnimation>
                <ScrollAnimation delay={750}>
                    <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                        <span className="font-semibold">Data-Informed:</span> I use a combination of qualitative and quantitative data to inform my design decisions and validate my assumptions.
                    </span>
                    </li>
                </ScrollAnimation>
                 <ScrollAnimation delay={900}>
                    <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                        <span className="font-semibold">Collaborative:</span> I believe that the best products are built by teams, not individuals. I enjoy collaborating closely with product managers, engineers, and other stakeholders.
                    </span>
                    </li>
                 </ScrollAnimation>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <ScrollAnimation delay={400}>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
                <Image
                    src="/profile-placeholder.jpg" 
                    alt="Your Name"
                    width={320}
                    height={320}
                    className="object-cover"
                />
                </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
      <CtaSection />
    </div>
  );
};

export default AboutPage;

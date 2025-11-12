
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32 pt-32 md:pt-40 lg:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="flex flex-col gap-8">
            <ScrollAnimation>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-text-dark tracking-tight mb-4">
                About Me
                </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={150}>
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl max-w-md">
                <Image
                    src="https://i.imgur.com/P7sZTw4.png"
                    alt="Wruhantojati - UI/UX Designer"
                    fill
                    className="object-cover"
                />
                </div>
            </ScrollAnimation>
          </div>
          
          <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-none">
            <ScrollAnimation delay={300}>
                <p>
                    I'm a passionate UI/UX Designer with 3 years of experience creating intuitive, engaging, and beautiful user experiences. I believe great design solves real-world problems and makes technology more human-centric.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={450}>
                <p>
                    Throughout my career, I've worked on a diverse range of projects, from complex enterprise software to consumer-facing mobile apps. This has given me a deep understanding of the product design lifecycle, from initial research to final implementation.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
                <h3 className="font-display font-semibold text-2xl mt-12 mb-4 text-text-dark">My Design Philosophy</h3>
            </ScrollAnimation>
            <ul className="space-y-4 !pl-0">
              <ScrollAnimation delay={750}>
                  <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <span>
                      <span className="font-semibold text-text-dark">Empathy-Driven:</span> I always start by putting myself in the user's shoes to understand their needs, motivations, and pain points.
                  </span>
                  </li>
              </ScrollAnimation>
              <ScrollAnimation delay={900}>
                  <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <span>
                      <span className="font-semibold text-text-dark">Data-Informed:</span> I use a combination of qualitative and quantitative data to inform my design decisions and validate my assumptions.
                  </span>
                  </li>
              </ScrollAnimation>
               <ScrollAnimation delay={1050}>
                  <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <span>
                      <span className="font-semibold text-text-dark">Collaborative:</span> I believe that the best products are built by teams. I enjoy collaborating closely with product managers, engineers, and other stakeholders.
                  </span>
                  </li>
               </ScrollAnimation>
            </ul>
          </div>

        </div>
      </main>
      <CtaSection />
    </div>
  );
};

export default AboutPage;

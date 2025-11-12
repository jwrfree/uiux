
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
        <div className="flex flex-col items-center">
            <ScrollAnimation>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-text-dark tracking-tight mb-12 text-center">
                About Me
                </h1>
            </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <ScrollAnimation delay={150}>
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto md:max-w-none">
                <Image
                    src="https://i.imgur.com/P7sZTw4.png"
                    alt="Wruhantojati - UI/UX Designer"
                    fill
                    className="object-cover"
                />
                </div>
            </ScrollAnimation>
          
          <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-2xl">
            <ScrollAnimation delay={300}>
                <p>
                    I'm Wruhantojati, a UI/UX designer based in Yogyakarta, Indonesia. I believe great design isn't just about making things look good—it's about understanding people, their struggles, and designing solutions that genuinely improve their lives.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={450}>
                <p>
                    For the past 2+ years, I've been designing for problems that matter: from helping 10,000+ users shift from burning waste to recycling, to supporting families through grief with compassionate digital services.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
                <h3 className="font-display font-semibold text-2xl mt-12 mb-4 text-text-dark">My Design Philosophy</h3>
            </ScrollAnimation>
            <ul className="space-y-4 !pl-0 text-left">
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

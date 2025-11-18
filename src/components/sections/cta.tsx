import Image from "next/image";
import { ArrowRight, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "../ui/scroll-animation";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-40 lg:py-48">
      <ScrollAnimation>
        <div
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
        >
            <span
            className="font-display font-medium text-center text-[240px] leading-none select-none
                        md:text-[320px] lg:text-[400px] bg-gradient-to-b from-[color:var(--color-border)] to-white bg-clip-text text-transparent"
            >
            UI/UX
            </span>
        </div>
      </ScrollAnimation>
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <ScrollAnimation delay={150}>
            <h2 className="max-w-5xl font-display text-4xl font-medium leading-tight bg-gradient-to-b from-gradient-text-start to-gradient-text-end bg-clip-text text-transparent md:text-5xl lg:text-[56px] lg:leading-[1.1]">
            Have a project in mind? Let's build something great together.
            </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={300}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button asChild variant="primary" size="xl" className="group rounded-full w-full sm:w-auto">
            <a href="mailto:wruhantojati@gmail.com" className="flex items-center gap-2 justify-center">
                <Mail className="h-5 w-5" />
                <span className="font-medium sm:font-semibold drop-shadow-sm">
                Send me an email
                </span>
                <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <ArrowRight className="h-4 w-4" />
                </div>
            </a>
            </Button>
            <Button asChild variant="frosted" size="xl" className="group rounded-full w-full sm:w-auto">
            <a
                href="https://linkedin.com/in/wrjati"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center"
            >
                <Linkedin className="h-5 w-5" />
                <span className="font-medium sm:font-semibold drop-shadow-sm">
                Connect on LinkedIn
                </span>
                <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <ArrowUpRight className="h-4 w-4" />
                </div>
            </a>
            </Button>
            </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CtaSection;

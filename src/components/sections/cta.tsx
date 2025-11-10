import Image from "next/image";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-32 lg:py-40">
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-medium text-center text-[240px] leading-none text-[color:var(--color-border)] select-none
                     md:text-[320px] lg:text-[400px]"
        >
          UI/UX
        </span>
      </div>
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <h2 className="max-w-4xl font-display text-4xl font-medium leading-tight text-text-dark-secondary md:text-5xl lg:text-[56px] lg:leading-[1.1]">
          Let's connect if you're looking for a designer who brings{" "}
          <span className="text-foreground">empathy, craft, and results.</span>
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button asChild variant="primary" size="xl" className="group rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95">
          <a href="mailto:jwrite.free@gmail.com">
            <Mail className="h-5 w-5" />
            <span className="font-medium">
              Send me an email
            </span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
        <Button asChild variant="secondary" size="xl" className="group rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-secondary/50 active:scale-95">
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">
              Connect on LinkedIn
            </span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
import Image from "next/image";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-40">
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
        <h2 className="max-w-4xl font-display text-4xl font-medium leading-tight text-muted md:text-5xl lg:text-[56px] lg:leading-[1.1]">
          Let's connect if you're looking for a designer who brings{" "}
          <span className="text-foreground">empathy, craft, and results.</span>
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="mailto:your.email@example.com"
            className="group inline-flex transform-gpu items-center gap-3 rounded-full bg-gradient-to-b from-primary to-[#191B18] px-6 py-5 text-left shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Mail className="h-5 w-5 text-primary-foreground" />
            <span className="font-medium text-primary-foreground">
              Send me an email
            </span>
            <ArrowRight className="h-5 w-5 text-primary-foreground" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex transform-gpu items-center gap-3 rounded-full bg-secondary px-6 py-5 text-left shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <Linkedin className="h-5 w-5 text-foreground" />
            <span className="font-medium text-foreground">
              Connect on LinkedIn
            </span>
            <ArrowRight className="h-5 w-5 text-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
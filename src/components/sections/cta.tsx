import Image from "next/image";
import { ArrowRight, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-40 lg:py-48">
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
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <h2 className="max-w-5xl font-display text-4xl font-medium leading-tight bg-gradient-to-b from-gradient-text-start to-gradient-text-end bg-clip-text text-transparent md:text-5xl lg:text-[56px] lg:leading-[1.1]">
          Currently open to new opportunities. Feel free to reach out via email or connect with me on LinkedIn.
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button asChild variant="primary" size="xl" className="group rounded-full">
          <a href="mailto:wruhantojati@gmail.com">
            <Mail className="h-5 w-5" />
            <span className="font-medium">
              Send me an email
            </span>
            <div className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-700 ease-in-out">
                <ArrowRight className="h-5 w-5" />
            </div>
          </a>
        </Button>
        <Button asChild variant="secondary" size="xl" className="group rounded-full">
          <a
            href="https://linkedin.com/in/wrjati"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">
              Connect on LinkedIn
            </span>
            <div className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-1 transition-all duration-700 ease-in-out">
                <ArrowUpRight className="h-5 w-5" />
            </div>
          </a>
        </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

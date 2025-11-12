
import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/sections/header";
import CtaSection from "@/components/sections/cta";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const NotFoundPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] container mx-auto px-4 text-center">
        <ScrollAnimation>
          <SearchX className="h-24 w-24 text-muted-foreground mx-auto mb-8" strokeWidth={1} />
        </ScrollAnimation>
        <ScrollAnimation delay={150}>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-dark tracking-tighter mb-4">
            404 - Page Not Found
            </h1>
        </ScrollAnimation>
        <ScrollAnimation delay={300}>
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-md mx-auto">
            Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
            </p>
        </ScrollAnimation>
        <ScrollAnimation delay={450}>
            <Button asChild variant="primary" size="lg" className="group rounded-full">
                <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    <span>Return to Homepage</span>
                </Link>
            </Button>
        </ScrollAnimation>
      </main>
      <CtaSection />
    </div>
  );
};

export default NotFoundPage;

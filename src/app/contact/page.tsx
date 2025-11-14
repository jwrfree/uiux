
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, ArrowRight } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32 pt-32 md:pt-40 lg:pt-48">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-text-dark tracking-tighter mb-6 text-center">
              Contact Me
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out to me.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollAnimation delay={300}>
              <div className="bg-white/50 dark:bg-black/20 p-8 rounded-3xl shadow-lg border border-white/70 h-full">
                <h3 className="font-display font-semibold text-3xl mb-6">Send a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium text-text-secondary mb-2">Name</label>
                    <Input id="name" placeholder="Your Name" className="bg-white/70 dark:bg-black/30" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-text-secondary mb-2">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" className="bg-white/70 dark:bg-black/30" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-base font-medium text-text-secondary mb-2">Message</label>
                    <Textarea id="message" placeholder="How can I help you?" rows={5} className="bg-white/70 dark:bg-black/30" />
                  </div>
                  <Button type="submit" variant="primary" size="xl" className="w-full rounded-full group">
                    <span className="font-medium sm:font-semibold drop-shadow-sm">Send Message</span>
                    <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </form>
              </div>
            </ScrollAnimation>

            <div className="flex flex-col justify-center">
                <ScrollAnimation delay={450}>
                  <h3 className="font-display font-semibold text-3xl mb-6">Contact Information</h3>
                </ScrollAnimation>
                <div className="space-y-6">
                    <ScrollAnimation delay={600}>
                      <div className="flex items-center">
                          <Mail className="h-8 w-8 text-primary mr-4" />
                          <div>
                              <h4 className="font-semibold text-xl">Email</h4>
                              <a href="mailto:jati.uiux@gmail.com" className="text-lg text-text-secondary hover:text-primary transition-colors">jati.uiux@gmail.com</a>
                          </div>
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation delay={750}>
                      <div className="flex items-center">
                          <Phone className="h-8 w-8 text-primary mr-4" />
                          <div>
                              <h4 className="font-semibold text-xl">Phone</h4>
                              <a href="tel:+6281548300288" className="text-lg text-text-secondary hover:text-primary transition-colors">+62 815 4830 0288</a>
                          </div>
                      </div>
                    </ScrollAnimation>
                </div>
            </div>

          </div>
        </div>
      </main>
      <CtaSection />
    </div>
  );
};

export default ContactPage;

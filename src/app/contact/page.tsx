
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-dark tracking-tighter mb-6 text-center">
            Contact Me
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out to me.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-white/50 dark:bg-black/20 p-8 rounded-3xl shadow-lg border border-white/70">
              <h3 className="font-display font-semibold text-2xl mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <Input id="name" placeholder="Your Name" className="bg-white/70 dark:bg-black/30" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-white/70 dark:bg-black/30" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <Textarea id="message" placeholder="How can I help you?" rows={5} className="bg-white/70 dark:bg-black/30" />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full rounded-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex flex-col justify-center">
                <h3 className="font-display font-semibold text-2xl mb-6">Contact Information</h3>
                <div className="space-y-6">
                    <div className="flex items-center">
                        <Mail className="h-8 w-8 text-primary mr-4" />
                        <div>
                            <h4 className="font-semibold text-lg">Email</h4>
                            <a href="mailto:jwrite.free@gmail.com" className="text-text-secondary hover:text-primary transition-colors">jwrite.free@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Phone className="h-8 w-8 text-primary mr-4" />
                        <div>
                            <h4 className="font-semibold text-lg">Phone</h4>
                            <span className="text-text-secondary">+1 (555) 123-4567</span>
                        </div>
                    </div>
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

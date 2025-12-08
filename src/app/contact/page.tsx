import { Metadata } from "next";
import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ready to collaborate? Contact Wruhantojati for full-time opportunities or to discuss a new design project. Let\'s build something great together.",
  alternates: {
    canonical: "/contact",
  },
};

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message should be at least 10 characters." })
    .max(2000, { message: "Message is too long." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [clickIndicator, setClickIndicator] = useState<{ x: number; y: number; id: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!clickIndicator) return;

    const timeout = setTimeout(() => setClickIndicator(null), 600);
    return () => clearTimeout(timeout);
  }, [clickIndicator]);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitMessage("");
    try {
      await emailjs.send(
        "service_8q859bz", // Service ID
        "template_255ehg8", // Template ID
        data,
        "rso8qfCxGAfaObNqe" // Public Key
      );

      setIsSuccess(true);
      reset();
    } catch (error) {
      setSubmitMessage("Failed to send message. Please try again.");
    }
  };

  const handleButtonMouseDown = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (isSubmitting || !isValid) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setClickIndicator({ x, y, id: Date.now() });
  };

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32 pt-32 md:pt-40 lg:pt-48">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-text-dark tracking-tighter mb-6 text-center">
              Let's Build Something Great
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={150}>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
              I'm currently available for full-time roles and open to discussing new projects. Let's connect and see how I can bring your vision to life.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollAnimation delay={300}>
              <div className="bg-white/50 dark:bg-black/20 p-8 rounded-3xl shadow-lg border border-white/70 h-full">
                {isSuccess ? (
                  <div className="flex flex-col items-center text-center space-y-4 py-10 px-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display font-semibold text-3xl">Message Sent!</h3>
                    <p className="text-lg text-text-secondary">
                      Thanks for reaching out. I’ll get back within 24 hours. In the meantime, feel free to explore case studies or download my resume.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button asChild variant="primary" size="lg" className="rounded-full">
                        <Link href="/#work">
                          View Case Studies
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="secondary" size="lg" className="rounded-full">
                        <a href="/resume.pdf" download>
                          Download Resume
                        </a>
                      </Button>
                    </div>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setSubmitMessage("");
                      }}
                      className="text-sm text-text-secondary hover:text-foreground underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-semibold text-3xl mb-6">Send a Message</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-base font-medium text-text-secondary mb-2">Name</label>
                        <Input
                          id="name"
                          placeholder="Your Name"
                          aria-invalid={errors.name ? "true" : "false"}
                          className={cn(
                            "bg-white/70 dark:bg-black/30",
                            errors.name && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
                          )}
                          {...register("name")}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-base font-medium text-text-secondary mb-2">Email</label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          aria-invalid={errors.email ? "true" : "false"}
                          className={cn(
                            "bg-white/70 dark:bg-black/30",
                            errors.email && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
                          )}
                          {...register("email")}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-base font-medium text-text-secondary mb-2">Message</label>
                        <Textarea
                          id="message"
                          placeholder="Hi Jati, I'm [Name] from [Company]. I was impressed by your work on the [Project Name] case study and would love to discuss a potential role with you."
                          rows={7}
                          aria-invalid={errors.message ? "true" : "false"}
                          className={cn(
                            "bg-white/70 dark:bg-black/30",
                            errors.message && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
                          )}
                          {...register("message")}
                        />
                        {errors.message && <p className="text-sm text-red-500 mt-2">{errors.message.message}</p>}
                      </div>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="xl" 
                        className="w-full rounded-full group flex items-center justify-center relative overflow-hidden"
                        disabled={isSubmitting || !isValid}
                        onMouseDown={handleButtonMouseDown}
                      >
                        {clickIndicator && (
                          <span
                            key={clickIndicator.id}
                            className="pointer-events-none absolute w-24 h-24 rounded-full bg-white/40 dark:bg-white/20 animate-ping -translate-x-1/2 -translate-y-1/2"
                            style={{ left: clickIndicator.x, top: clickIndicator.y }}
                          />
                        )}
                        {isSubmitting ? (
                          <>
                            <Spinner className="mr-2" />
                            <span className="font-medium sm:font-semibold drop-shadow-sm">Sending...</span>
                          </>
                        ) : (
                          <span className="font-medium sm:font-semibold drop-shadow-sm">Send Message</span>
                        )}
                      </Button>
                      {submitMessage && !submitMessage.includes("success") && (
                        <p className="text-sm text-red-500 text-center">{submitMessage}</p>
                      )}
                    </form>
                  </>
                )}
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

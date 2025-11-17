import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
 const footerLinks: { name: string; href: string }[] = [
 { name: "Email", href: "mailto:wruhantojati@gmail.com" },
 { name: "LinkedIn", href: "https://linkedin.com/in/wrjati" },
 { name: "Behance", href: "https://www.behance.net/wruhantojati" },
  { name: "Dribbble", href: "https://dribbble.com/wruhantojati" },
];
 const year = new Date().getFullYear();

 return (
  <footer role="contentinfo" aria-label="Site footer" className="bg-background border-t py-10">
   <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
    <div className="flex flex-row gap-4 sm:gap-6 order-1 sm:order-2">
     {footerLinks.map((link) => (
      <a
       key={link.name}
       href={link.href}
       target={link.href.startsWith("http") ? "_blank" : undefined}
       rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
       className="group relative inline-flex items-center gap-1 text-sm font-medium text-text-dark hover:text-primary dark:text-white/80 dark:hover:text-white transition-all after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
      >
       <span>{link.name}</span>
       {link.href.startsWith("http") && (
        <span className="relative h-3.5 w-3.5 overflow-hidden">
         <ArrowUpRight className="absolute inset-0 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full" />
         <ArrowUpRight className="absolute inset-0 h-3.5 w-3.5 translate-y-full -translate-x-full transition-transform duration-300 group-hover:translate-y-0 group-hover:translate-x-0" />
        </span>
       )}
      </a>
     ))}
    </div>
    <p className="text-sm font-medium tracking-[0.08em] leading-relaxed order-2 sm:order-1 text-stone-600 dark:text-white/90">
     &copy; {year} Wruhantojati. All rights reserved.
    </p>
   </div>
  </footer>
 );
};

export default Footer;

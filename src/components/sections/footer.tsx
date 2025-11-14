import React from 'react';

const Footer = () => {
 const footerLinks: { name: string; href: string }[] = [];
 const year = new Date().getFullYear();

 return (
  <footer role="contentinfo" aria-label="Site footer" className="bg-background border-t py-10">
   <div className="container flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
    <p className="text-[14px] font-medium tracking-[0.08em] order-2 sm:order-1 text-stone-600 dark:text-white/90 ">
     &copy; {year} Wruhantojati. All rights reserved.
    </p>
    {footerLinks.length > 0 && (
     <div className="flex flex-row gap-4 sm:gap-6 order-1 sm:order-2">
      {footerLinks.map((link) => (
       <a
        key={link.name}
        href={link.href}
        className="text-sm font-medium text-text-dark hover:opacity-100 dark:text-white/80 dark:hover:text-white transition-colors"
       >
        {link.name}
       </a>
      ))}
     </div>
    )}
   </div>
  </footer>
 );
};

export default Footer;

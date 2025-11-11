import React from 'react';

const Footer = () => {
  const footerLinks: { name: string; href: string }[] = [];

  return (
    <footer className="bg-background text-foreground py-10">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-black font-medium order-2 sm:order-1">
          © 2025 Wruhantojati. All rights reserved.
        </p>
        {footerLinks.length > 0 && (
          <div className="flex flex-row gap-4 sm:gap-6 order-1 sm:order-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-text-light font-medium hover:text-foreground transition-colors"
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

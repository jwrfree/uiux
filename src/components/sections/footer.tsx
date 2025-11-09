import React from 'react';

const Footer = () => {
  const footerLinks = [
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="container z-10">
      <div className="py-8 border-t border-border">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="m-0 text-sm text-foreground/50">
            © 2025 UI/UX Designer Portfolio. All rights reserved.
          </p>
          <nav>
            <ul className="m-0 p-0 list-none flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
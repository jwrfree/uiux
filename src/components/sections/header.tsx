"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AnimatedMenuIcon = ({ isOpen, isHovered }: {isOpen: boolean;isHovered: boolean;}) =>
<div className="relative w-6 h-6 flex items-center justify-center">
    <span
    className={`block absolute h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 ease-out ${
    isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : isHovered ? "top-[5px]" : "top-[8px]"}`
    } />

    <span
    className={`block absolute h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 ease-out ${
    isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : isHovered ? "top-[19px]" : "top-[16px]"}`
    } />

  </div>;


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full p-4 md:p-6 lg:p-8 pointer-events-none flex justify-center">
        <div
          className={`w-full max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg mx-auto pointer-events-auto transition-all duration-500 ease-out ${
          isScrolled ? 'scale-[0.95]' : 'scale-100'}`
          }>

          <div
            className={`h-[72px] bg-background/80 rounded-full px-3 py-3 grid grid-cols-3 items-center transition-all duration-500 ease-out ${
            isScrolled ? 'shadow-xl backdrop-blur-xl' : 'shadow-lg backdrop-blur-lg'} ${
            isMenuOpen ? 'backdrop-blur-2xl' : ''}`}>

            <div className="flex justify-start items-center">
              <Link
                href="/"
                aria-label="Home"
                onClick={closeMenu}
                className="flex items-center justify-start ml-2 lg:ml-4 transition-transform duration-300 hover:scale-105">

                <span className="text-2xl md:text-3xl font-medium bg-gradient-to-b from-[#232522] to-[rgba(35,37,34,0.4)] text-transparent bg-clip-text">
                  UI/UX
                </span>
              </Link>
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group flex items-center justify-center w-12 h-12 cursor-pointer rounded-full transition-all duration-300 hover:bg-black/5 active:scale-95"
                aria-label="Toggle menu">

                <AnimatedMenuIcon isOpen={isMenuOpen} isHovered={isHovered} />
              </button>
            </div>

            <div className="flex justify-end items-center">
              <a
                href="mailto:your.email@example.com"
                className="hidden md:inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-b from-[#232522] to-[#191B18] text-primary-foreground text-base font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ease-out !w-[160px] !h-[54px]">

                <span>Get in Touch</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="md:hidden inline-flex items-center justify-center h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-b from-[#232522] to-[#191B18] text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">

                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background/85 backdrop-blur-3xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`
        }
        onClick={closeMenu}>

        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'}`
          }
          onClick={(e) => e.stopPropagation()}>

          <ul className="text-center space-y-6 md:space-y-8">
            {[
            { href: "/#about", label: "About Me" },
            { href: "/#work", label: "My Work" },
            { href: "mailto:your.email@example.com", label: "Contact" }].
            map((item, index) =>
            <li
              key={item.href}
              className={`transition-all duration-500 ease-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
              }
              style={{ transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms' }}>

                <a
                href={item.href}
                onClick={closeMenu}
                className="text-3xl md:text-5xl font-medium text-foreground transition-all duration-300 hover:text-muted-foreground inline-block hover:scale-105">

                  {item.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>);

}
'use client';

import { useEffect, useRef, useMemo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  textAs?: keyof JSX.IntrinsicElements;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal = ({
  children,
  as: Container = 'h2',
  textAs: TextWrapper = 'p',
  containerClassName = '',
  textClassName = '',
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return <TextWrapper key={index} className={textClassName} style={{ display: 'inline' }}>{word}</TextWrapper>;
      return (
        <span
          key={index}
          style={{ display: 'inline-block', overflow: 'hidden' }}
          className="word-wrapper"
        >
          <span
            className="word inline-block"
            style={{ transform: 'translateY(100%)' }}
          >
            {word}
          </span>
        </span>
      );
    });
  }, [children, textClassName, TextWrapper]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word');
    if (words.length === 0) return;

    gsap.set(words, { y: '110%' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false,
        toggleActions: 'play none none none',
      },
    });

    tl.to(words, {
      y: '0%',
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
    });
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [children]);

  return (
    <Container ref={containerRef as any} className={containerClassName}>
        {splitText}
    </Container>
  );
};

export default ScrollReveal;

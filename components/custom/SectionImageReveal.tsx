'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '@/components/image-reveal';

export default function SectionImageReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);   // overflow:hidden wrapper for title
  const titleRef = useRef<HTMLDivElement>(null);  // the element that slides
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Only animate header elements — never touch the interactive city-list grid
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1.3,
        },
      });

      tl
        .to(titleRef.current, { yPercent: 0, ease: 'expo.out', duration: 0.7 }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'expo.out', duration: 0.5 }, 0.25)
        .to(subRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.4 }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      {/* Title — masked slide up */}
      <div ref={maskRef} className="overflow-hidden">
        <div ref={titleRef}>
          <h2 className="font-['Anton'] text-[13vw] md:text-[8.5vw] leading-none text-black tracking-tight uppercase">
            Metropolises
          </h2>
        </div>
      </div>

      <div ref={lineRef} className="h-px bg-black/15 w-full mt-5 mb-5" />

      <p ref={subRef} className="font-mono text-[10px] text-black/40 tracking-[0.4em] uppercase mb-8">
        Ranchi / Jamshedpur / Dhanbad / Bokaro
      </p>

      {/* City hover-reveal list — renders at full opacity, GSAP never touches it */}
      <Component
        variant="default"
        size="expanded"
        className="border-0 bg-transparent rounded-none"
      />
    </section>
  );
}

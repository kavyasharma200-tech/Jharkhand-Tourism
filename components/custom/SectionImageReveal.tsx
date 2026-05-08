'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '@/components/image-reveal';

export default function SectionImageReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title letters split-reveal from left
      gsap.set(titleRef.current, { clipPath: 'inset(0 100% 0 0)', x: -40 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 12 });
      gsap.set(gridRef.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1.2,
        },
      });

      tl.to(titleRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        ease: 'expo.out',
        duration: 1,
      }, 0)
      .to(lineRef.current, {
        scaleX: 1,
        ease: 'expo.out',
        duration: 0.8,
      }, 0.3)
      .to(subRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.7,
      }, 0.5)
      .to(gridRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.9,
      }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24 py-24"
    >
      <div className="mb-10">
        <div ref={titleRef}>
          <h2 className="font-['Anton'] text-[13vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
            Metropolises
          </h2>
        </div>
        <div ref={lineRef} className="h-px bg-black/20 w-full mt-4 mb-6" />
        <p ref={subRef} className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] uppercase">
          Ranchi / Jamshedpur / Dhanbad / Bokaro
        </p>
      </div>
      <div ref={gridRef}>
        <Component variant="default" size="expanded" className="border-0 bg-transparent rounded-none" />
      </div>
    </section>
  );
}

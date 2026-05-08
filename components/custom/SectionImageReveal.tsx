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
      // Set initial hidden states
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 12 });
      gsap.set(gridRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.4,
        },
      });

      tl.to(titleRef.current, { yPercent: 0, ease: 'expo.out', duration: 0.8 }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'expo.out', duration: 0.6 }, 0.3)
        .to(subRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.5 }, 0.45)
        .to(gridRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      {/* Title masked reveal */}
      <div className="overflow-hidden mb-0">
        <div ref={titleRef}>
          <h2 className="font-['Anton'] text-[14vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
            Metropolises
          </h2>
        </div>
      </div>

      <div ref={lineRef} className="h-px bg-black/15 w-full mt-5 mb-5" />

      <p ref={subRef} className="font-mono text-[10px] text-black/40 tracking-[0.4em] uppercase mb-8">
        Ranchi / Jamshedpur / Dhanbad / Bokaro
      </p>

      {/* City hover list — full opacity, no GSAP interference */}
      <div ref={gridRef}>
        <Component variant="default" size="expanded" className="border-0 bg-transparent rounded-none" />
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '@/components/image-reveal';

export default function SectionImageReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 2,
        },
      });

      tl.to(titleRef.current, { yPercent: 0, ease: 'power4.out', duration: 1 }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'power3.out', duration: 0.8 }, 0.35)
        .to(subRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.6 }, 0.5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col px-8 md:px-24 pt-20 pb-8"
    >
      {/* Anti-design cross-font heading — mask reveal */}
      <div ref={maskRef} className="overflow-hidden mb-0">
        <div ref={titleRef}>
          <h2 className="leading-none tracking-tight uppercase flex items-baseline flex-wrap">
            <span className="font-['var(--font-bodoni)'] italic text-[12vw] md:text-[7.5vw] text-black font-light">
              Metro
            </span>
            <span className="font-['Anton'] text-[14vw] md:text-[9vw] text-black tracking-[-0.02em]">
              POLISES
            </span>
          </h2>
        </div>
      </div>

      <div ref={lineRef} className="h-px bg-black/12 w-full mt-4 mb-4" />

      <p ref={subRef} className="font-mono text-[9px] text-black/35 tracking-[0.5em] uppercase mb-6">
        Ranchi&nbsp;&nbsp;/&nbsp;&nbsp;Jamshedpur&nbsp;&nbsp;/&nbsp;&nbsp;Dhanbad&nbsp;&nbsp;/&nbsp;&nbsp;Bokaro
      </p>

      {/* City list — fully visible, never hidden by GSAP */}
      <div className="flex-1 min-h-0">
        <Component
          variant="default"
          size="expanded"
          className="border-0 bg-transparent rounded-none h-full"
        />
      </div>
    </section>
  );
}

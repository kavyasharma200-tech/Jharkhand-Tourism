'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionKineticText() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-kinetic-line]', sectionRef.current!);
      const meta = sectionRef.current!.querySelector<HTMLElement>('[data-kinetic-meta]');

      // Set initial hidden state — clip-masked below their containers
      gsap.set(lines, { yPercent: 110, opacity: 0 });
      gsap.set(meta, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center 40%',
          scrub: 1.4,
        },
      });

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
      }, 0);

      tl.to(meta, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.5);

      // Letters drift slightly left as you scroll past
      lines.forEach((line, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(line, {
          x: dir * 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-8 md:px-24 border-t border-white/5"
    >
      {/* Corner meta */}
      <div className="absolute top-10 left-8 md:left-24 font-['Space_Mono'] text-[8px] text-white/20 uppercase tracking-[0.6em]">
        JHARKHAND
      </div>
      <div className="absolute bottom-10 left-8 md:left-24 font-['Space_Mono'] text-[8px] text-white/20 uppercase tracking-[0.6em]">
        ARCHIVE
      </div>

      {/* Three kinetic lines — clip-overflow so slide-up works */}
      <div className="w-full flex flex-col items-center -space-y-3 md:-space-y-8 overflow-hidden">
        <div className="overflow-hidden w-full text-center">
          <div data-kinetic-line>
            <span className="font-['Anton'] text-[21vw] leading-none text-white tracking-tighter uppercase whitespace-nowrap">
              WATERFALLS
            </span>
          </div>
        </div>

        <div className="overflow-hidden w-full text-center">
          <div data-kinetic-line>
            <span
              className="font-['Playfair_Display'] text-[17vw] leading-none text-transparent italic font-black uppercase whitespace-nowrap"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              WILDERNESS
            </span>
          </div>
        </div>

        <div className="overflow-hidden w-full text-center">
          <div data-kinetic-line>
            <span className="font-['DM_Serif_Display'] text-[23vw] leading-none text-white uppercase whitespace-nowrap">
              WONDERS
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div data-kinetic-meta className="mt-12 flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-white/20" />
        <p className="font-['Space_Mono'] text-[9px] text-white/30 tracking-[0.5em] uppercase italic">
          The kinetic heart of the east
        </p>
      </div>

      {/* Side accent lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-48 bg-white/10" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-48 bg-white/10" />
    </section>
  );
}

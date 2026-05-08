'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SectionKineticText
 * Full-viewport black screen. Three enormous lines of text animate in
 * with staggered slide-up reveals on scroll enter.
 * On scroll-leave (reverse) they slide back down.
 */
export default function SectionKineticText() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Slide up from below with clip
      tl.fromTo(
        line1Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, ease: 'expo.out' },
        0
      );
      tl.fromTo(
        line2Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, ease: 'expo.out' },
        0.12
      );
      tl.fromTo(
        line3Ref.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, ease: 'expo.out' },
        0.24
      );
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-8 md:px-24 border-t border-white/5"
    >
      {/* Corner meta labels */}
      {/* Clean corner meta */}
      <div className="absolute top-8 left-8 font-['Space_Mono'] text-[8px] text-white/20 uppercase tracking-[0.6em]">
        JHARKHAND
      </div>
      <div className="absolute bottom-8 left-8 font-['Space_Mono'] text-[8px] text-white/20 uppercase tracking-[0.6em]">
        ARCHIVE
      </div>

      {/* Three kinetic lines — clip-overflow so slide-up works */}
      <div className="w-full flex flex-col items-center -space-y-3 md:-space-y-8 overflow-hidden">
        <div className="overflow-hidden w-full text-center">
          <div ref={line1Ref}>
            <span className="font-['Anton'] text-[21vw] leading-none text-white tracking-tighter uppercase whitespace-nowrap">
              WATERFALLS
            </span>
          </div>
        </div>

        <div className="overflow-hidden w-full text-center">
          <div ref={line2Ref}>
            <span
              className="font-['Playfair_Display'] text-[17vw] leading-none text-transparent italic font-black uppercase whitespace-nowrap"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              WILDERNESS
            </span>
          </div>
        </div>

        <div className="overflow-hidden w-full text-center">
          <div ref={line3Ref}>
            <span className="font-['DM_Serif_Display'] text-[23vw] leading-none text-white uppercase whitespace-nowrap">
              WONDERS
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div ref={metaRef} className="mt-12 flex flex-col items-center gap-3">
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

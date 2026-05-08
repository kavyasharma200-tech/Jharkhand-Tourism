'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionKineticText() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-kline]', sectionRef.current!);
      const rule = sectionRef.current!.querySelector<HTMLElement>('[data-kline-rule]');
      const sub = sectionRef.current!.querySelector<HTMLElement>('[data-kline-sub]');

      // Lines: each masked, slides up from below container
      lines.forEach((line) => {
        gsap.set(line, { yPercent: 105 });
      });
      gsap.set(rule, { scaleX: 0, transformOrigin: 'center' });
      gsap.set(sub, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.6,
        },
      });

      tl.to(lines, {
        yPercent: 0,
        ease: 'expo.out',
        duration: 1.4,
        stagger: 0.18,
      }, 0)
      .to(rule, {
        scaleX: 1,
        ease: 'expo.out',
        duration: 0.8,
      }, 0.4)
      .to(sub, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.7,
      }, 0.6);

      // Horizontal drift on scroll-past — odd lines go right, even go left
      lines.forEach((line, i) => {
        gsap.to(line, {
          x: i % 2 === 0 ? -40 : 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-32"
    >
      {/* Corner type marks */}
      <span className="absolute top-8 left-8 md:left-16 font-['Space_Mono'] text-[7px] text-white/20 uppercase tracking-[0.5em]">JH</span>
      <span className="absolute top-8 right-8 md:right-16 font-['Space_Mono'] text-[7px] text-white/20 uppercase tracking-[0.5em]">∞</span>

      {/* Three masked lines */}
      <div className="w-full flex flex-col items-center gap-0 overflow-hidden">
        <div className="overflow-hidden w-full text-center leading-none">
          <div data-kline>
            <span className="font-['Anton'] text-[19vw] leading-none text-white uppercase tracking-tighter whitespace-nowrap block">
              WATERFALLS
            </span>
          </div>
        </div>
        <div className="overflow-hidden w-full text-center leading-none">
          <div data-kline>
            <span
              className="font-['Playfair_Display'] text-[16vw] leading-none text-transparent italic font-black uppercase whitespace-nowrap block"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}
            >
              WILDERNESS
            </span>
          </div>
        </div>
        <div className="overflow-hidden w-full text-center leading-none">
          <div data-kline>
            <span className="font-['Anton'] text-[22vw] leading-none text-white uppercase tracking-tighter whitespace-nowrap block">
              WONDERS
            </span>
          </div>
        </div>
      </div>

      {/* Rule + caption */}
      <div data-kline-rule className="w-24 h-px bg-white/20 mt-12" />
      <p data-kline-sub className="font-['Space_Mono'] text-[9px] text-white/25 tracking-[0.5em] uppercase mt-4 italic">
        The kinetic soul of the east
      </p>
    </section>
  );
}

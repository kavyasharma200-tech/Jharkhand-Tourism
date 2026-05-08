'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Component from '@/components/image-reveal';

export default function SectionImageReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const titleWrap = sectionRef.current!.querySelector<HTMLElement>('[data-ir-title]');
      const line = sectionRef.current!.querySelector<HTMLElement>('[data-ir-line]');
      const sub = sectionRef.current!.querySelector<HTMLElement>('[data-ir-sub]');
      const tags = gsap.utils.toArray<HTMLElement>('[data-ir-tag]', sectionRef.current!);
      const grid = sectionRef.current!.querySelector<HTMLElement>('[data-ir-grid]');

      gsap.set(titleWrap, { clipPath: 'inset(0 100% 0 0)', x: -30 });
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(sub, { opacity: 0, y: 10 });
      gsap.set(tags, { opacity: 0, y: 16, stagger: 0.1 });
      gsap.set(grid, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.4,
        },
      });

      tl.to(titleWrap, { clipPath: 'inset(0 0% 0 0)', x: 0, ease: 'expo.out', duration: 0.8 }, 0)
        .to(line, { scaleX: 1, ease: 'expo.out', duration: 0.6 }, 0.3)
        .to(sub, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.5 }, 0.45)
        .to(tags, { opacity: 1, y: 0, ease: 'power3.out', stagger: 0.08, duration: 0.5 }, 0.55)
        .to(grid, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.7 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      {/* Number accent */}
      <div className="absolute top-8 right-8 md:right-24 font-['var(--font-space-mono)'] font-mono text-[8px] text-black/15 tracking-[0.4em] uppercase">
        03 / DESTINATIONS
      </div>

      <div className="mb-8">
        <div data-ir-title className="overflow-visible">
          <h2 className="font-['Anton'] text-[14vw] md:text-[9vw] leading-[0.9] text-black tracking-tight uppercase">
            Metropolises
          </h2>
        </div>
        <div data-ir-line className="h-px bg-black/15 w-full mt-5 mb-5" />

        {/* Guide tags row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          {['BEST OCT–MAR', 'CITY BREAKS', 'CULTURE + STEEL', '2–4 DAYS'].map((tag) => (
            <span
              key={tag}
              data-ir-tag
              className="font-['var(--font-space-mono)'] font-mono text-[9px] text-black/40 tracking-[0.35em] uppercase border border-black/10 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <p data-ir-sub className="font-['var(--font-instrument)'] font-serif text-lg md:text-xl text-black/50 italic max-w-lg leading-relaxed">
          Ranchi for the falls and plateau air. Jamshedpur for industrial grandeur.
          Dhanbad for coal-country grit — each city its own texture.
        </p>
      </div>

      <div data-ir-grid>
        <Component variant="default" size="expanded" className="border-0 bg-transparent rounded-none" />
      </div>
    </section>
  );
}

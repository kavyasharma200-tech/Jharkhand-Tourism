'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const CARDS = [
  { src: JHARKHAND_IMAGES[16], title: 'NETARHAT', sub: 'Queen of Chotanagpur', tag: '01' },
  { src: JHARKHAND_IMAGES[17], title: 'GHAGHRI', sub: 'Lower falls at dusk', tag: '02' },
  { src: JHARKHAND_IMAGES[20], title: 'BURUDI', sub: 'The quiet eastern mirror', tag: '03' },
  { src: JHARKHAND_IMAGES[21], title: 'RANKINI', sub: 'Ancient stones, living faith', tag: '04' },
];

export default function SectionStaggeredReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-reveal-heading]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-reveal-card]', sectionRef.current!);

      gsap.set(heading, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'center 30%',
          scrub: 1.6,
        },
      });

      tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0);
      tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out', stagger: 0.12 }, 0.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-neutral-950 overflow-hidden py-32 px-8 md:px-24 border-t border-white/5"
    >
      <div data-reveal-heading className="mb-16 flex justify-between items-end">
        <div>
          <p className="font-['Space_Mono'] text-[8px] text-white/30 tracking-[0.6em] uppercase mb-4">COLLECTION</p>
          <h2 className="font-['Anton'] text-[10vw] md:text-[5vw] text-white leading-none uppercase tracking-tight">
            THE COLLECTION
          </h2>
        </div>
        <p className="hidden md:block font-['DM_Serif_Display'] text-lg text-white/20 italic max-w-xs text-right">
          Places that stay with you long after you leave
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-6xl mx-auto">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            data-reveal-card
            className={`flex flex-col ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5 group">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 border border-white/[0.08] group-hover:border-white/25 transition-colors duration-500" />
              <div className="absolute top-4 left-4 font-['Space_Mono'] text-[7px] text-white/40 uppercase tracking-[0.4em]">
                {card.tag}
              </div>
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="font-['Anton'] text-3xl md:text-4xl text-white tracking-tight uppercase">
                  {card.title}
                </h3>
                <p className="font-['DM_Serif_Display'] text-base text-white/35 mt-1 italic">{card.sub}</p>
              </div>
              <span className="font-['Space_Mono'] text-[9px] text-white/15 mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-['Playfair_Display'] text-[20vw] text-white/[0.015] italic font-black uppercase whitespace-nowrap">
          ARCHIVE
        </span>
      </div>
    </section>
  );
}

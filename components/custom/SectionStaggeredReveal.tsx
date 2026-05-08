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
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-sr-heading]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-sr-card]', sectionRef.current!);
      const images = gsap.utils.toArray<HTMLElement>('[data-sr-img]', sectionRef.current!);

      // Heading: clip-reveal from bottom + large scale
      gsap.set(heading, { yPercent: 100, opacity: 0 });
      // Card labels: stagger up from below
      gsap.set(cards, { y: 60, opacity: 0 });
      // Images: scale-in with slight upward drift
      gsap.set(images, { scale: 1.15, opacity: 0, y: 30 });

      const entranceTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 10%',
          scrub: 1.5,
        },
      });

      entranceTL
        .to(heading, { yPercent: 0, opacity: 1, ease: 'expo.out', duration: 1 }, 0)
        .to(images, { scale: 1, opacity: 1, y: 0, ease: 'expo.out', stagger: 0.12, duration: 1.2 }, 0.15)
        .to(cards, { y: 0, opacity: 1, ease: 'power3.out', stagger: 0.1, duration: 1 }, 0.3);

      // Each image slowly drifts upward as you scroll past (parallax depth)
      images.forEach((img, i) => {
        const travel = 30 + i * 10;
        gsap.to(img, {
          y: -travel,
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
      className="relative w-full bg-neutral-950 overflow-hidden py-32 px-8 md:px-24 border-t border-white/5"
    >
      {/* Ambient ghost word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-['Playfair_Display'] text-[22vw] text-white/[0.02] italic font-black uppercase whitespace-nowrap">
          ARCHIVE
        </span>
      </div>

      {/* Section heading */}
      <div className="overflow-hidden mb-20">
        <div data-sr-heading className="flex justify-between items-end">
          <div>
            <p className="font-['Space_Mono'] text-[8px] text-white/25 tracking-[0.6em] uppercase mb-3">COLLECTION</p>
            <h2 className="font-['Anton'] text-[11vw] md:text-[5.5vw] text-white leading-none uppercase tracking-tight">
              THE COLLECTION
            </h2>
          </div>
          <p className="hidden md:block font-['DM_Serif_Display'] text-base text-white/20 italic max-w-[240px] text-right">
            Places that stay with you long after you leave
          </p>
        </div>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 max-w-6xl mx-auto relative z-10">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            data-sr-card
            className={`flex flex-col ${i % 2 !== 0 ? 'md:mt-20' : ''}`}
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5 group">
              <img
                data-sr-img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/20 transition-colors duration-500" />
              <div className="absolute top-4 left-4 font-['Space_Mono'] text-[7px] text-white/30 uppercase tracking-[0.4em]">
                {card.tag}
              </div>
            </div>
            {/* Label */}
            <div className="mt-6 flex justify-between items-end">
              <div>
                <h3 className="font-['Anton'] text-3xl md:text-4xl text-white tracking-tight uppercase">
                  {card.title}
                </h3>
                <p className="font-['DM_Serif_Display'] text-sm text-white/30 mt-1 italic">{card.sub}</p>
              </div>
              <span className="font-['Space_Mono'] text-[10px] text-white/15">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
} from '@/components/animated-slideshow';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const WONDERS = [
  {
    label: 'HUNDRU FALLS',
    image: JHARKHAND_IMAGES[0],
    season: 'JUL–SEP',
    distance: '45 km from Ranchi',
    note: 'Highest in Jharkhand at 98m',
  },
  {
    label: 'PATRATU VALLEY',
    image: JHARKHAND_IMAGES[1],
    season: 'OCT–FEB',
    distance: '40 km from Ranchi',
    note: 'Dawn mist over serpentine highway',
  },
  {
    label: 'BETLA FOREST',
    image: JHARKHAND_IMAGES[5],
    season: 'NOV–MAR',
    distance: '140 km from Ranchi',
    note: 'Project Tiger reserve since 1973',
  },
  {
    label: 'DASSAM FALLS',
    image: JHARKHAND_IMAGES[11],
    season: 'AUG–OCT',
    distance: '40 km from Ranchi',
    note: 'Ten streams converging as one',
  },
  {
    label: 'NETARHAT',
    image: JHARKHAND_IMAGES[4],
    season: 'NOV–JAN',
    distance: '156 km from Ranchi',
    note: 'Sunrise above the Chotanagpur clouds',
  },
];

export default function SectionAnimatedSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-aw-heading]');
      const rule = sectionRef.current!.querySelector<HTMLElement>('[data-aw-rule]');
      const guide = sectionRef.current!.querySelector<HTMLElement>('[data-aw-guide]');
      const list = sectionRef.current!.querySelector<HTMLElement>('[data-aw-list]');

      gsap.set(heading, { yPercent: 110, opacity: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(guide, { opacity: 0, x: 20 });
      gsap.set(list, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.4,
        },
      });

      tl.to(heading, { yPercent: 0, opacity: 1, ease: 'expo.out', duration: 0.8 }, 0)
        .to(rule, { scaleX: 1, ease: 'expo.out', duration: 0.6 }, 0.3)
        .to(guide, { opacity: 1, x: 0, ease: 'power3.out', duration: 0.7 }, 0.4)
        .to(list, { opacity: 1, ease: 'power2.out', duration: 0.8 }, 0.55);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      {/* Section marker */}
      <div className="absolute top-8 right-8 md:right-24 font-mono text-[8px] text-black/15 tracking-[0.4em] uppercase">
        04 / WONDERS
      </div>

      {/* Header */}
      <div className="overflow-hidden mb-3">
        <h2 data-aw-heading className="font-['Anton'] text-[14vw] md:text-[9vw] leading-[0.9] text-black tracking-tight uppercase">
          Wonders
        </h2>
      </div>
      <div data-aw-rule className="h-px bg-black/15 w-full mb-5" />

      {/* Visitor guide blurb */}
      <p data-aw-guide className="font-['var(--font-instrument)'] font-serif text-lg md:text-xl text-black/50 italic max-w-xl mb-10 leading-relaxed">
        Hover a name. See where it falls on the map of your memory.
        Best visited in the monsoon or winter — each season rewrites these landscapes entirely.
      </p>

      {/* Hover list */}
      <div data-aw-list>
        <HoverSlider className="w-full flex flex-col md:flex-row items-stretch border-t border-black/10">
          <div className="w-full md:w-1/2 flex flex-col justify-center py-8 z-10 relative">
            <div className="flex flex-col gap-1">
              {WONDERS.map((w, i) => (
                <div key={w.label} className="group flex items-baseline gap-4">
                  <TextStaggerHover
                    text={w.label}
                    index={i}
                    className="font-['Anton'] text-[6vw] md:text-[3.2vw] text-black/20 group-hover:text-black leading-tight cursor-pointer transition-colors duration-300 uppercase"
                  />
                  <span className="hidden md:block font-mono text-[8px] text-black/25 tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                    {w.season}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <HoverSliderImageWrap className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-0">
            {WONDERS.map((w, i) => (
              <HoverSliderImage
                key={w.label}
                index={i}
                imageUrl={w.image}
                alt={w.label}
                className="object-cover w-full h-full"
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>

        {/* Bottom guide strip */}
        <div className="hidden md:flex items-center gap-8 mt-6 border-t border-black/5 pt-4">
          {WONDERS.slice(0, 3).map((w) => (
            <div key={w.label} className="flex flex-col gap-1">
              <span className="font-['Anton'] text-[10px] text-black/60 uppercase tracking-wide">{w.label}</span>
              <span className="font-mono text-[8px] text-black/30 tracking-[0.3em]">{w.distance}</span>
              <span className="font-['var(--font-instrument)'] font-serif text-[11px] text-black/40 italic">{w.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

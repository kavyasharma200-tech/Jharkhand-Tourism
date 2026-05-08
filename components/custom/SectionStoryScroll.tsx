'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowArt, { FlowSection } from '@/components/story-scroll';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const STORIES = [
  {
    num: '01',
    topic: 'FORESTS',
    kicker: 'Where to start',
    headline: 'Begin in Saranda.',
    subhead: 'The world\'s largest sal forest',
    body: '820 km² of unbroken canopy. Drive through at dawn. No map needed — the birds know the way.',
    detail: 'BEST NOV – FEB · JEEP SAFARI AVAILABLE · STAY: BETLA FOREST HUT',
    image: JHARKHAND_IMAGES[1],
    bg: '#f8f7f5',
    accent: 'FOREST',
  },
  {
    num: '02',
    topic: 'WATERFALLS',
    kicker: 'High season essential',
    headline: 'Chase the monsoon.',
    subhead: '40+ named falls in one state',
    body: 'Hundru at peak flow. Dassam in the rain. Jonha at golden hour. Three days, three waterfalls, one river.',
    detail: 'BEST AUG – OCT · NH-23 LOOP ROUTE · CARRY WATERPROOF GEAR',
    image: JHARKHAND_IMAGES[0],
    bg: '#f2f4f7',
    accent: 'WATER',
  },
  {
    num: '03',
    topic: 'CULTURE',
    kicker: 'Go beyond the surface',
    headline: 'Witness Sarhul.',
    subhead: '32 tribes. Living traditions.',
    body: 'Every spring, Jharkhand erupts in Sarhul — the tribal new year. Flowers, drums, and a faith that predates temples.',
    detail: 'BEST MAR – APR · RANCHI & KHUNTI DISTRICT · RESPECTFUL OBSERVATION',
    image: JHARKHAND_IMAGES[3],
    bg: '#f5f3f0',
    accent: 'TRIBE',
  },
  {
    num: '04',
    topic: 'WILDLIFE',
    kicker: 'For the serious traveller',
    headline: 'Enter Betla at 5am.',
    subhead: 'One of India\'s first tiger reserves',
    body: 'Elephants at the salt lick before sunrise. Gaur in the clearings. The forest holds its breath — so will you.',
    detail: 'BEST DEC – MAR · PRE-BOOK FOREST DEPT JEEP · 2 NIGHT MIN STAY',
    image: JHARKHAND_IMAGES[5],
    bg: '#f0f2f0',
    accent: 'WILD',
  },
];

export default function SectionStoryScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 1.2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white border-t border-black/5">
      <div ref={headingRef} className="px-8 md:px-24 pt-24 pb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-[8px] text-black/30 tracking-[0.5em] uppercase mb-3">06 / NARRATIVES</p>
            <h2 className="font-['Anton'] text-[13vw] md:text-[9vw] leading-[0.9] text-black tracking-tight uppercase">
              Field Notes
            </h2>
          </div>
          <p className="hidden md:block font-['var(--font-instrument)'] font-serif text-base text-black/40 italic max-w-xs text-right leading-relaxed">
            A visitor's guide to going deeper — past the itinerary, into the wild
          </p>
        </div>
        <div className="h-px w-full bg-black/10" />
      </div>

      <FlowArt className="bg-white">
        {STORIES.map((story) => (
          <FlowSection
            key={story.num}
            style={{ backgroundColor: story.bg }}
            aria-label={story.topic}
          >
            <div className="flex flex-col h-full justify-between p-8 md:p-16">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-black/25 tracking-[0.4em] uppercase">
                    {story.num} — {story.topic}
                  </span>
                  <span className="font-['var(--font-instrument)'] font-serif text-sm text-black/40 italic">
                    {story.kicker}
                  </span>
                </div>
                <span className="font-['Anton'] text-[8vw] md:text-[4vw] text-black/[0.04] uppercase tracking-tighter">
                  {story.accent}
                </span>
              </div>

              {/* Main content */}
              <div className="flex flex-col md:flex-row gap-12 items-end">
                <div className="flex-1">
                  <h3 className="font-['Anton'] text-[9vw] md:text-[6vw] text-black leading-[0.9] uppercase tracking-tight mb-4">
                    {story.headline}
                  </h3>
                  <p className="font-['var(--font-cormorant)'] text-[4vw] md:text-[2.2vw] text-black/60 italic leading-tight mb-6 font-light">
                    {story.subhead}
                  </p>
                  <p className="font-['var(--font-instrument)'] font-serif text-base md:text-lg text-black/55 leading-relaxed max-w-lg">
                    {story.body}
                  </p>
                  <div className="mt-8 border-t border-black/8 pt-4">
                    <p className="font-mono text-[8px] text-black/30 tracking-[0.35em] uppercase">
                      {story.detail}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-[40%] aspect-[4/3] overflow-hidden shrink-0">
                  <img
                    src={story.image}
                    alt={story.topic}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}

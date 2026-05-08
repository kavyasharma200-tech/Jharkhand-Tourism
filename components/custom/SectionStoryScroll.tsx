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
    headline: 'Where the jungle breathes',
    body: 'Saranda — the world\'s largest sal forest. 820 square kilometres of unbroken canopy, ancient and alive.',
    image: JHARKHAND_IMAGES[1],
    bg: '#f9f9f9',
  },
  {
    num: '02',
    topic: 'WATERFALLS',
    headline: 'Water writing history in stone',
    body: 'Over 40 named waterfalls. Hundru, Jonha, Dassam, Panchghagh — each carved by the Subarnarekha.',
    image: JHARKHAND_IMAGES[0],
    bg: '#ffffff',
  },
  {
    num: '03',
    topic: 'CULTURE',
    headline: '32 tribes. One heartbeat.',
    body: 'Santhali, Munda, Ho, Oraon — traditions older than written history, still alive in every festival.',
    image: JHARKHAND_IMAGES[3],
    bg: '#f5f5f5',
  },
  {
    num: '04',
    topic: 'WILDLIFE',
    headline: 'Bengal tigers still roam here.',
    body: 'Betla National Park — one of India\'s first tiger reserves. Elephants, leopards, gaur in untouched habitat.',
    image: JHARKHAND_IMAGES[5],
    bg: '#ffffff',
  },
];

export default function SectionStoryScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white border-t border-black/5">
      <div ref={headingRef} className="px-8 md:px-24 pt-24 pb-16">
        <h2 className="font-['Anton'] text-[13vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
          Narratives
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mt-4 uppercase">
          Ancient / Modern / Eternal
        </p>
      </div>

      <FlowArt className="bg-white">
        {STORIES.map((story) => (
          <FlowSection
            key={story.num}
            className="border border-black/5"
            style={{ backgroundColor: story.bg }}
            aria-label={story.topic}
          >
            <div className="flex flex-col h-full justify-between p-8 md:p-12">
              <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">
                {story.num} / {story.topic}
              </span>
              <div>
                <h3 className="font-['Playfair_Display'] text-[8vw] md:text-[5.5vw] text-black leading-tight italic">
                  {story.headline}
                </h3>
                <p className="font-['DM_Serif_Display'] text-xl md:text-2xl text-black/50 mt-6 max-w-xl">
                  {story.body}
                </p>
              </div>
              <img
                src={story.image}
                alt={story.topic}
                className="w-full h-48 md:h-72 object-cover mt-8"
              />
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}

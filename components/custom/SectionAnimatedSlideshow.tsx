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

const SLIDES = [
  { label: 'HUNDRU FALLS', image: JHARKHAND_IMAGES[0] },
  { label: 'PATRATU VALLEY', image: JHARKHAND_IMAGES[1] },
  { label: 'BETLA FOREST', image: JHARKHAND_IMAGES[5] },
  { label: 'DASSAM FALLS', image: JHARKHAND_IMAGES[11] },
  { label: 'NETARHAT SUMMIT', image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 12 });
      gsap.set(listRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.4,
        },
      });

      tl.to(titleRef.current, { yPercent: 0, ease: 'expo.out', duration: 0.8 }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'expo.out', duration: 0.6 }, 0.3)
        .to(subRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.5 }, 0.45)
        .to(listRef.current, { opacity: 1, ease: 'power2.out', duration: 0.7 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      {/* Header */}
      <div className="overflow-hidden">
        <div ref={titleRef}>
          <h2 className="font-['Anton'] text-[14vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
            Wonders
          </h2>
        </div>
      </div>

      <div ref={lineRef} className="h-px bg-black/15 w-full mt-5 mb-5" />

      <p ref={subRef} className="font-mono text-[10px] text-black/40 tracking-[0.4em] uppercase mb-10">
        Cascades / Valleys / Sanctuaries
      </p>

      {/* Hover list */}
      <div ref={listRef}>
        <HoverSlider className="w-full flex flex-col md:flex-row items-stretch border-t border-black/10">
          {/* Left — text list */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-10 z-10 relative">
            <div className="flex flex-col gap-2">
              {SLIDES.map((slide, i) => (
                <TextStaggerHover
                  key={slide.label}
                  text={slide.label}
                  index={i}
                  className="font-['Anton'] text-[7vw] md:text-[3.5vw] text-black/25 hover:text-black leading-tight cursor-pointer transition-colors duration-300 uppercase"
                />
              ))}
            </div>
          </div>

          {/* Right — image that follows hover */}
          <HoverSliderImageWrap className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-0">
            {SLIDES.map((slide, i) => (
              <HoverSliderImage
                key={slide.label}
                index={i}
                imageUrl={slide.image}
                alt={slide.label}
                className="object-cover w-full h-full"
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>
      </div>
    </section>
  );
}

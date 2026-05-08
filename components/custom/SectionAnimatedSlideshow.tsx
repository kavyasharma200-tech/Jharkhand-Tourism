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

const slides = [
  { label: 'HUNDRU FALLS', image: JHARKHAND_IMAGES[0] },
  { label: 'PATRATU VALLEY', image: JHARKHAND_IMAGES[1] },
  { label: 'BETLA FOREST', image: JHARKHAND_IMAGES[5] },
  { label: 'DASSAM FALLS', image: JHARKHAND_IMAGES[11] },
  { label: 'NETARHAT SUMMIT', image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger lines of heading character-by-character upward
      gsap.set(headingRef.current, { yPercent: 120, opacity: 0 });
      gsap.set(metaRef.current, { opacity: 0, x: -20 });
      gsap.set(listRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 15%',
          scrub: 1.4,
        },
      });

      tl.to(headingRef.current, {
        yPercent: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 1,
      }, 0)
      .to(metaRef.current, {
        opacity: 1,
        x: 0,
        ease: 'power3.out',
        duration: 0.8,
      }, 0.35)
      .to(listRef.current, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.9,
      }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24 py-24"
    >
      {/* Header */}
      <div className="mb-16 overflow-hidden">
        <h2 ref={headingRef} className="font-['Anton'] text-[13vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
          Wonders
        </h2>
      </div>
      <p ref={metaRef} className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] uppercase mb-16">
        Cascades / Valleys / Sanctuaries
      </p>

      {/* Slider */}
      <div ref={listRef}>
        <HoverSlider className="w-full flex flex-col md:flex-row items-stretch border-t border-black/10">
          <div className="w-full md:w-1/2 flex flex-col justify-center py-12 z-10 relative">
            <div className="flex flex-col gap-2">
              {slides.map((slide, i) => (
                <TextStaggerHover
                  key={slide.label}
                  text={slide.label}
                  index={i}
                  className="font-['Anton'] text-[7vw] md:text-[3.5vw] text-black/20 hover:text-black leading-tight cursor-pointer transition-colors duration-300 uppercase"
                />
              ))}
            </div>
          </div>

          <HoverSliderImageWrap className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-0">
            {slides.map((slide, i) => (
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

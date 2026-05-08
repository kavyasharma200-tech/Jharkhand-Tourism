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
  { label: 'HUNDRU FALLS',   image: JHARKHAND_IMAGES[0] },
  { label: 'PATRATU VALLEY', image: JHARKHAND_IMAGES[1] },
  { label: 'BETLA FOREST',   image: JHARKHAND_IMAGES[5] },
  { label: 'DASSAM FALLS',   image: JHARKHAND_IMAGES[11] },
  { label: 'NETARHAT',       image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(subRef.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 2,
        },
      });

      tl.to(titleRef.current, { yPercent: 0, ease: 'power4.out', duration: 1 }, 0)
        .to(lineRef.current, { scaleX: 1, ease: 'power3.out', duration: 0.8 }, 0.35)
        .to(subRef.current, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.6 }, 0.5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white flex flex-col px-8 md:px-24 pt-20 pb-8"
    >
      {/* Anti-design cross-font heading */}
      <div ref={maskRef} className="overflow-hidden">
        <div ref={titleRef}>
          <h2 className="leading-none tracking-tight flex items-baseline flex-wrap">
            <span className="font-['Anton'] text-[14vw] md:text-[9vw] text-black tracking-[-0.02em] uppercase">
              WON
            </span>
            <span className="font-['var(--font-bodoni)'] italic text-[10vw] md:text-[6.5vw] text-black font-light">
              ders
            </span>
          </h2>
        </div>
      </div>

      <div ref={lineRef} className="h-px bg-black/12 w-full mt-4 mb-4" />

      <p ref={subRef} className="font-mono text-[9px] text-black/35 tracking-[0.5em] uppercase mb-4">
        Cascades&nbsp;&nbsp;/&nbsp;&nbsp;Valleys&nbsp;&nbsp;/&nbsp;&nbsp;Sanctuaries
      </p>

      {/* HoverSlider — fully visible from mount, scrub never touches it */}
      <div className="flex-1 min-h-0">
        <HoverSlider className="relative flex h-full items-stretch border-t border-black/8">
          {/* Left text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-4 z-10">
            {SLIDES.map((slide, i) => (
              <TextStaggerHover
                key={slide.label}
                text={slide.label}
                index={i}
                className="block font-['Anton'] text-[6.5vw] md:text-[3.5vw] text-black leading-snug cursor-pointer uppercase py-1 tracking-tight"
              />
            ))}
          </div>

          {/* Right image reveal */}
          <div className="hidden md:block relative w-1/2">
            <HoverSliderImageWrap className="absolute inset-0">
              {SLIDES.map((slide, i) => (
                <HoverSliderImage
                  key={slide.label}
                  index={i}
                  imageUrl={slide.image}
                />
              ))}
            </HoverSliderImageWrap>
          </div>
        </HoverSlider>
      </div>
    </section>
  );
}

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
  { label: 'BETLA NATIONAL PARK', image: JHARKHAND_IMAGES[5] },
  { label: 'DASSAM FALLS', image: JHARKHAND_IMAGES[11] },
  { label: 'NETARHAT SUNSET', image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
        },
      });
      tl.from(headerRef.current, { opacity: 0, y: 60, ease: 'power3.out' }, 0);
      tl.from(sliderRef.current, { opacity: 0, x: 60, ease: 'power3.out' }, 0.2);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      <div ref={headerRef} className="pt-24 pb-8">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight mb-4 uppercase">
          Wonders
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mb-12 uppercase">
          Cascades / Valleys / Sanctuaries
        </p>
      </div>

      <div ref={sliderRef} className="w-full">
        <HoverSlider className="w-full flex flex-col md:flex-row items-stretch border-t border-black/10">
          <div className="w-full md:w-1/2 flex flex-col justify-center py-24 z-10 relative">
            <div className="flex flex-col gap-4">
              {slides.map((slide, i) => (
                <TextStaggerHover
                  key={slide.label}
                  text={slide.label}
                  index={i}
                  className="font-['Anton'] text-[6vw] md:text-[3.5vw] text-black/20 hover:text-black leading-tight cursor-pointer transition-colors duration-300 uppercase"
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
                className="object-cover contrast-110 w-full h-full"
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>
      </div>
    </section>
  );
}

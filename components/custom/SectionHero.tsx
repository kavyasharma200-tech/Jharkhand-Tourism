'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollExpandMedia from '@/components/scroll-expansion-hero';

export default function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <ScrollExpandMedia
        containerRef={sectionRef}
        mediaType="video"
        mediaSrc="/assets/hero-vid.mp4"
        posterSrc="/assets/hero-vid-poster.png"
        bgImageSrc="/assets/hero-vid-poster.png"
        title="JHARKHAND"
        textBlend={false}
      >
        <p className="font-['Space_Mono'] text-xs tracking-[0.3em] text-white/60 uppercase">
          THE SOUL OF INDIA — FORESTS, FALLS &amp; FIRE
        </p>
      </ScrollExpandMedia>
    </section>
  );
}

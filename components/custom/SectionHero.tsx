'use client';

import { useRef } from 'react';
import ScrollExpandMedia from '@/components/scroll-expansion-hero';

export default function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <ScrollExpandMedia
        containerRef={sectionRef}
        mediaType="video"
        mediaSrc="/assets/hero vid-latest.mp4"
        posterSrc="/assets/hero-vid-poster.png"
        bgImageSrc="/assets/hero-vid-poster.png"
        title="JHARKHAND"
      >
        THE SOUL OF INDIA
      </ScrollExpandMedia>
    </section>
  );
}

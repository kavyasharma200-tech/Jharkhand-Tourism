'use client';

import { useRef } from 'react';
import ScrollExpandMedia from '@/components/scroll-expansion-hero';
// Import the file directly from the app/assets folder so Next.js bundles it
import heroVideo from '@/app/assets/hero-vid-latest.mp4';

export default function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Next.js can return a static asset object or a string for video imports
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoSrc = typeof heroVideo === 'string' ? heroVideo : (heroVideo as any)?.src || heroVideo;

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <ScrollExpandMedia
        containerRef={sectionRef}
        mediaType="video"
        mediaSrc={videoSrc}
        posterSrc="/assets/hero-vid-poster.png"
        bgImageSrc="/assets/hero-vid-poster.png"
        title="JHARKHAND"
      >
        THE SOUL OF INDIA
      </ScrollExpandMedia>
    </section>
  );
}

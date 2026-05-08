'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollExpandMedia from '@/components/scroll-expansion-hero'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function SectionHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
        snap: 1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/assets/hero-vid.mp4"
        posterSrc="/assets/hero-vid-poster.png"
        bgImageSrc="/assets/hero-vid-poster.png"
        title="JHARKHAND"
        textBlend={false}
      >
        <p className="font-['Space_Mono'] text-xs tracking-[0.3em] text-black/60 text-center uppercase">
          THE SOUL OF INDIA — FORESTS, FALLS & FIRE
        </p>
      </ScrollExpandMedia>
      <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <p className="font-['Space_Mono'] text-[11px] text-black tracking-[0.4em] uppercase text-center mt-16">
          INDIA&apos;S BEST KEPT SECRET
        </p>
      </div>
    </section>
  )
}


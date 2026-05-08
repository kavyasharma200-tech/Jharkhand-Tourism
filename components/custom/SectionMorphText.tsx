'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroAnimation from '@/components/scroll-morph-hero'

export default function SectionMorphText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        snap: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden border-t border-black/5">
      {/* Full-bleed IntroAnimation */}
      <IntroAnimation scrollProgress={scrollProgress} />
    </section>
  )
}

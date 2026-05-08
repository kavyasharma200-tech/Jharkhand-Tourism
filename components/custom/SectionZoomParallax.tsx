'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from '@/components/zoom-parallax';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const PARALLAX_IMAGES = [
  { src: JHARKHAND_IMAGES[0],  alt: 'Hundru Falls' },
  { src: JHARKHAND_IMAGES[1],  alt: 'Patratu Valley' },
  { src: JHARKHAND_IMAGES[2],  alt: 'Baidyanath Temple' },
  { src: JHARKHAND_IMAGES[4],  alt: 'Netarhat' },
  { src: JHARKHAND_IMAGES[6],  alt: 'Dimna Lake' },
  { src: JHARKHAND_IMAGES[8],  alt: 'Paras Nath' },
  { src: JHARKHAND_IMAGES[10], alt: 'Ghatshila' },
];

export default function SectionZoomParallax() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header fades in as section enters, then fades out before zoom takes over
      gsap.set(headerRef.current, { opacity: 0, y: 24 });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      gsap.to(headerRef.current, {
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 15%',
          end: 'top top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black border-t border-white/5">
      {/* Floating header — sits above ZoomParallax's sticky layer */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 w-full z-20 px-8 md:px-24 pt-16 pb-8 pointer-events-none"
      >
        <p className="font-mono text-[8px] text-white/30 tracking-[0.5em] uppercase mb-3">
          05 / LANDSCAPES
        </p>
        <h2 className="font-['Anton'] text-[13vw] md:text-[8vw] leading-none text-white tracking-tight uppercase">
          Landscapes
        </h2>
        <p className="font-mono text-[10px] text-white/30 tracking-[0.4em] mt-4 uppercase">
          Unbroken / Canopy / Horizon
        </p>
      </div>

      {/* ZoomParallax owns its own 300vh + sticky scroll — no conflicting GSAP pin */}
      <ZoomParallax images={PARALLAX_IMAGES} />
    </section>
  );
}

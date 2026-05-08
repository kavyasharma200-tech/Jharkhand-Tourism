'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from '@/components/zoom-parallax';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const parallaxImages = [
  { src: JHARKHAND_IMAGES[0], alt: 'Hundru Falls' },
  { src: JHARKHAND_IMAGES[1], alt: 'Patratu Valley' },
  { src: JHARKHAND_IMAGES[2], alt: 'Baidyanath Temple' },
  { src: JHARKHAND_IMAGES[4], alt: 'Netarhat' },
  { src: JHARKHAND_IMAGES[6], alt: 'Dimna Lake' },
  { src: JHARKHAND_IMAGES[8], alt: 'Paras Nath' },
  { src: JHARKHAND_IMAGES[10], alt: 'Ghatshila' },
];

export default function SectionZoomParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Label rides upward as user enters, then fades as zoom begins
      gsap.set(labelRef.current, { opacity: 0, y: 30 });

      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      gsap.to(labelRef.current, {
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white w-full overflow-hidden border-t border-black/5"
    >
      {/* Floating label */}
      <div
        ref={labelRef}
        className="sticky top-0 z-10 w-full px-8 md:px-24 pt-20 pb-8 pointer-events-none"
      >
        <h2 className="font-['Anton'] text-[13vw] md:text-[9vw] leading-none text-black tracking-tight uppercase">
          Landscapes
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mt-4 uppercase">
          Unbroken / Canopy / Horizon
        </p>
      </div>
      {/* ZoomParallax handles its own 300vh scroll + sticky */}
      <ZoomParallax images={parallaxImages} />
    </section>
  );
}

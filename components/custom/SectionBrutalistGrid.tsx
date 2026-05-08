'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JHARKHAND_IMAGES } from '@/data/images.data';

const GRID_ITEMS = [
  { src: JHARKHAND_IMAGES[12], alt: 'Jonha Falls', label: 'JONHA', pos: 'absolute left-[5%] top-[10%] w-[22%] h-[70%]', rotate: '' },
  { src: JHARKHAND_IMAGES[13], alt: 'Tagore Hill', label: 'TAGORE', pos: 'absolute left-[30%] top-[8%] w-[18%] h-[40%]', rotate: 'rotate-[-2deg]' },
  { src: JHARKHAND_IMAGES[14], alt: 'Tapovan', label: 'TAPOVAN', pos: 'absolute right-[14%] top-[12%] w-[20%] h-[55%]', rotate: '' },
  { src: JHARKHAND_IMAGES[15], alt: 'Nandan Pahad', label: 'NANDAN', pos: 'absolute right-[4%] bottom-[8%] w-[12%] h-[32%]', rotate: 'rotate-[3deg]' },
];

export default function SectionBrutalistGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>('[data-grid-item]', sectionRef.current!);
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-grid-heading]');
      const label = sectionRef.current!.querySelector<HTMLElement>('[data-grid-label]');

      // Images: each falls from above with stagger
      gsap.set(images, { y: -60, opacity: 0, scale: 1.08 });
      // Heading: slides in from left, large
      gsap.set(heading, { x: -80, opacity: 0 });
      // Label: fades from below
      gsap.set(label, { y: 24, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: 1.6,
        },
      });

      tl.to(images, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'expo.out',
        stagger: { each: 0.1, from: 'random' },
        duration: 1.2,
      }, 0);

      tl.to(heading, {
        x: 0,
        opacity: 1,
        ease: 'expo.out',
        duration: 1,
      }, 0.2);

      tl.to(label, {
        y: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.8,
      }, 0.6);

      // Parallax depth pass — images drift at different rates as you scroll through
      images.forEach((img, i) => {
        const depth = [0.6, 1.2, 0.9, 1.5][i % 4];
        gsap.to(img, {
          y: -50 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center border-t border-black/5"
    >
      {/* Ghost word */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-['Anton'] text-[28vw] leading-none text-black/[0.025] uppercase whitespace-nowrap tracking-tighter">
          SARANDA
        </span>
      </span>

      {/* Images */}
      {GRID_ITEMS.map((item, i) => (
        <div
          key={item.label}
          data-grid-item
          className={`overflow-hidden bg-black ${item.pos} ${item.rotate}`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-[1.04] hover:scale-100"
          />
          <div className="absolute bottom-3 left-3 font-['Space_Mono'] text-[7px] text-white/60 uppercase tracking-[0.3em]">
            {String(i + 1).padStart(2, '0')} / {item.label}
          </div>
        </div>
      ))}

      {/* Central editorial heading */}
      <div data-grid-heading className="absolute left-[29%] bottom-[15%] z-20">
        <h2 className="font-['Playfair_Display'] text-[7vw] text-black leading-[0.85] italic font-black uppercase">
          Raw.<br />Brutal.<br />Alive.
        </h2>
        <div data-grid-label className="mt-6 flex items-center gap-3">
          <span className="block w-10 h-px bg-black/40" />
          <p className="font-['Space_Mono'] text-[9px] text-black/40 tracking-[0.45em] uppercase">
            The soul of Jharkhand
          </p>
        </div>
      </div>

      {/* Frame */}
      <div className="absolute inset-4 border border-black/[0.05] pointer-events-none z-30" />
    </section>
  );
}

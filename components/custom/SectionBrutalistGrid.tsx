'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JHARKHAND_IMAGES } from '@/data/images.data';

export default function SectionBrutalistGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>('[data-grid-item]', sectionRef.current!);
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-grid-heading]');
      const label = sectionRef.current!.querySelector<HTMLElement>('[data-grid-label]');

      // Initial states
      gsap.set(images, { opacity: 0, scale: 1.06, y: 50 });
      gsap.set(heading, { opacity: 0, x: -60 });
      gsap.set(label, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          end: 'bottom 60%',
          scrub: 1.5,
        },
      });

      tl.to(images, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
      }, 0);

      tl.to(heading, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'expo.out',
      }, 0.1);

      tl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.4);

      // Subtle parallax on individual images while scrolling through
      images.forEach((img, i) => {
        const depth = (i % 3) * 0.3 + 0.4;
        gsap.to(img, {
          y: -40 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
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
      {/* Editorial label top-left */}
      <div className="absolute top-12 left-8 md:left-24 z-20">
        <h2 className="font-['Anton'] text-[3.5vw] text-black/15 uppercase tracking-widest">Editorial</h2>
      </div>

      {/* Ghost background text */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-['Anton'] text-[28vw] leading-none text-black/[0.03] uppercase whitespace-nowrap tracking-tighter">
          SARANDA
        </span>
      </span>

      {/* ── Image 1: Left tall ─────────────────────── */}
      <div data-grid-item className="absolute left-[5%] top-[10%] w-[22%] h-[70%] overflow-hidden bg-black">
        <img
          src={JHARKHAND_IMAGES[12]}
          alt="Jonha Falls"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-3 left-3 font-['Space_Mono'] text-[7px] text-white/60 uppercase tracking-[0.3em]">
          01 / JONHA
        </div>
      </div>

      {/* ── Image 2: Top-center small ──────────────── */}
      <div data-grid-item className="absolute left-[30%] top-[8%] w-[18%] h-[40%] overflow-hidden bg-black rotate-[-2deg]">
        <img
          src={JHARKHAND_IMAGES[13]}
          alt="Tagore Hill"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-3 left-3 font-['Space_Mono'] text-[7px] text-white/60 uppercase tracking-[0.3em]">
          02 / TAGORE
        </div>
      </div>

      {/* ── Central editorial heading ──────────────── */}
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

      {/* ── Image 3: Right center tall ─────────────── */}
      <div data-grid-item className="absolute right-[14%] top-[12%] w-[20%] h-[55%] overflow-hidden bg-black">
        <img
          src={JHARKHAND_IMAGES[14]}
          alt="Tapovan"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-3 left-3 font-['Space_Mono'] text-[7px] text-white/60 uppercase tracking-[0.3em]">
          03 / TAPOVAN
        </div>
      </div>

      {/* ── Image 4: Far-right bottom ──────────────── */}
      <div data-grid-item className="absolute right-[4%] bottom-[8%] w-[12%] h-[32%] overflow-hidden bg-black rotate-[3deg]">
        <img
          src={JHARKHAND_IMAGES[15]}
          alt="Nandan Pahad"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-3 left-3 font-['Space_Mono'] text-[7px] text-white/60 uppercase tracking-[0.3em]">
          04 / NANDAN
        </div>
      </div>

      {/* Thin border frame */}
      <div className="absolute inset-4 border border-black/6 pointer-events-none z-30" />
    </section>
  );
}

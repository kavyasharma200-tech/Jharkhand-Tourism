'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JHARKHAND_IMAGES } from '@/data/images.data';

/**
 * SectionBrutalistGrid
 * Full-viewport editorial collage. 5 images pinned in absolute positions,
 * staggered fade + slide-in on scroll enter.
 */
export default function SectionBrutalistGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Images stagger-reveal
      tl.fromTo(
        [img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current],
        { opacity: 0, scale: 1.08, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12 },
        0
      );

      // Heading
      tl.fromTo(
        headRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'expo.out' },
        0.2
      );

      // Label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center"
    >
      {/* Ghost background text */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-['Anton'] text-[28vw] leading-none text-black/[0.03] uppercase whitespace-nowrap tracking-tighter">
          SARANDA
        </span>
      </span>

      {/* ── Image 1: Left tall ─────────────────────── */}
      <div
        ref={img1Ref}
        className="absolute left-[5%] top-[10%] w-[22%] h-[70%] overflow-hidden bg-black"
      >
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
      <div
        ref={img2Ref}
        className="absolute left-[30%] top-[8%] w-[18%] h-[40%] overflow-hidden bg-black rotate-[-2deg]"
      >
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
      <div
        ref={headRef}
        className="absolute left-[29%] bottom-[15%] z-20"
      >
        <h2 className="font-['Playfair_Display'] text-[7vw] text-black leading-[0.85] italic font-black uppercase">
          Raw.<br />Brutal.<br />Alive.
        </h2>
        <div ref={labelRef} className="mt-6 flex items-center gap-3">
          <span className="block w-10 h-px bg-black/40" />
          <p className="font-['Space_Mono'] text-[9px] text-black/40 tracking-[0.45em] uppercase">
            The soul of Jharkhand
          </p>
        </div>
      </div>

      {/* ── Image 3: Right center tall ─────────────── */}
      <div
        ref={img3Ref}
        className="absolute right-[14%] top-[12%] w-[20%] h-[55%] overflow-hidden bg-black"
      >
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
      <div
        ref={img4Ref}
        className="absolute right-[4%] bottom-[8%] w-[12%] h-[32%] overflow-hidden bg-black rotate-[3deg]"
      >
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

      {/* Coordinate label */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-['Space_Mono'] text-[8px] text-black/20 tracking-[0.5em] uppercase"
      >
        23.6102° N · 85.2799° E
      </div>
    </section>
  );
}

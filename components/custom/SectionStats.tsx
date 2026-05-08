'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATS = [
  { value: 28, suffix: '', label: 'DISTRICTS' },
  { value: 40, suffix: '+', label: 'WATERFALLS' },
  { value: 32, suffix: '', label: 'TRIBES' },
  { value: 820, suffix: 'km²', label: 'SAL FOREST' },
  { value: 1000, suffix: '+', label: 'TEMPLES' },
];

export default function SectionStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelector<HTMLElement>('[data-stats-heading]');
      const items = gsap.utils.toArray<HTMLElement>('[data-stat-item]', sectionRef.current!);
      const dividers = gsap.utils.toArray<HTMLElement>('[data-stat-div]', sectionRef.current!);

      // Heading sweeps up
      gsap.set(heading, { y: 50, opacity: 0 });
      // Items: stagger from below
      gsap.set(items, { y: 80, opacity: 0 });
      // Dividers: scale from center
      gsap.set(dividers, { scaleY: 0, transformOrigin: 'center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 20%',
          scrub: 1.4,
        },
      });

      tl.to(heading, { y: 0, opacity: 1, ease: 'expo.out', duration: 0.9 }, 0)
        .to(dividers, { scaleY: 1, ease: 'expo.out', stagger: 0.06, duration: 0.8 }, 0.2)
        .to(items, { y: 0, opacity: 1, ease: 'expo.out', stagger: 0.08, duration: 1 }, 0.25);

      // Counter animation — fires once when section enters, not scrub-tied
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.3 + i * 0.08,
          onUpdate() {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reset',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white border-t border-black/5 py-32 px-8 md:px-24 overflow-hidden"
    >
      {/* Ghost number */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="font-['Anton'] text-[40vw] text-black/[0.025] leading-none uppercase">∞</span>
      </div>

      {/* Heading */}
      <div data-stats-heading className="mb-20">
        <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.5em] uppercase mb-4">BY THE NUMBERS</p>
        <h2 className="font-['Anton'] text-[13vw] md:text-[8vw] leading-none text-black tracking-tight uppercase">
          Statistics
        </h2>
      </div>

      {/* Stats row */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-12 md:gap-0 w-full">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-stretch">
            {/* Divider before all except first */}
            {i > 0 && (
              <div data-stat-div className="hidden md:block w-px bg-black/10 mx-8 lg:mx-14 self-stretch" />
            )}
            <div data-stat-item className="flex flex-col gap-2">
              <div className="flex items-end gap-1">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="font-['Anton'] text-[12vw] md:text-[6vw] text-black leading-none"
                >
                  0
                </span>
                {stat.suffix && (
                  <span className="font-['Anton'] text-[5vw] md:text-[2.5vw] text-black/50 leading-none mb-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.35em] text-black/40 uppercase">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

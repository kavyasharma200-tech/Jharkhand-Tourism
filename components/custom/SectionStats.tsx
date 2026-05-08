'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { number: 28, suffix: '', label: 'DISTRICTS' },
  { number: 40, suffix: '+', label: 'WATERFALLS' },
  { number: 32, suffix: '', label: 'INDIGENOUS TRIBES' },
  { number: 820, suffix: 'km²', label: 'SARANDA FOREST' },
  { number: 1000, suffix: '+', label: 'TEMPLES & SHRINES' },
];

export default function SectionStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
        },
      });

      tl.from(headerRef.current, { opacity: 0, y: 60, ease: 'power3.out' }, 0);
      tl.from(statsRef.current, { opacity: 0, y: 40, ease: 'power3.out' }, 0.2);

      numbersRef.current.forEach((numEl, i) => {
        if (!numEl) return;
        const finalValue = parseInt(numEl.dataset.value ?? '0', 10);
        tl.fromTo(
          numEl,
          { textContent: '0' },
          {
            textContent: finalValue,
            duration: 1,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate() {
              if (numEl) numEl.textContent = Math.round(Number(numEl.textContent)).toString();
            },
          },
          0.3 + i * 0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-white flex flex-col items-center justify-center py-24 overflow-hidden border-t border-black/5 px-8 md:px-24"
    >
      <div ref={headerRef} className="w-full mb-12">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight uppercase">
          Statistics
        </h2>
      </div>
      <div
        ref={statsRef}
        className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8 w-full"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex flex-col items-center text-center">
              <div className="font-['Anton'] text-[15vw] md:text-[8vw] text-black leading-none">
                <span
                  ref={(el) => { numbersRef.current[i] = el; }}
                  data-value={stat.number}
                >
                  0
                </span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.3em] text-black/40 mt-4 uppercase">
                {stat.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-32 bg-black/10 mx-8 lg:mx-16" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

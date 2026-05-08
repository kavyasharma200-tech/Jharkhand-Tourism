'use client';

import { useEffect, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  textBlend?: boolean;
  children?: ReactNode;
  containerRef?: RefObject<HTMLElement>;
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  textBlend,
  children,
  containerRef: externalRef,
}: ScrollExpandMediaProps) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = externalRef ?? internalRef;

  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(mediaWrapRef.current, { width: '100vw', height: '100vh', borderRadius: 0, ease: 'none' }, 0);
      tl.to(bgRef.current, { opacity: 0, ease: 'none' }, 0);
      tl.to(textRef.current, { opacity: 0, y: -30, ease: 'power2.in' }, 0);
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [firstWord = '', ...rest] = (title ?? '').split(' ');
  const restOfTitle = rest.join(' ');

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img src={bgImageSrc} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={mediaWrapRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl w-[85vw] h-[55vh] md:w-[42vw] md:h-[62vh]"
        >
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={mediaSrc} alt={title ?? ''} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className={`flex flex-col items-center gap-0 ${textBlend ? 'mix-blend-difference' : ''}`}>
          <span
            className="font-['Anton'] text-[18vw] md:text-[14vw] leading-none uppercase"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)', color: 'transparent' }}
          >
            {firstWord}
          </span>
          {restOfTitle && (
            <span
              className="font-['Anton'] text-[18vw] md:text-[14vw] leading-none uppercase"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)', color: 'transparent' }}
            >
              {restOfTitle}
            </span>
          )}
        </div>
        {children && (
          <div className="mt-6 font-['Space_Mono'] text-xs text-white/50 tracking-[0.4em] uppercase text-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

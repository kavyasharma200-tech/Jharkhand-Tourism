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
  const triggerRef = externalRef ?? internalRef;

  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial state: card centred, normal size
      gsap.set(mediaWrapRef.current, {
        width: '44vw',
        height: '62vh',
        borderRadius: '16px',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.4,
        },
      });

      // Phase 1 (0–0.5): video expands to full screen
      tl.to(
        mediaWrapRef.current,
        { width: '100vw', height: '100vh', borderRadius: 0, ease: 'power2.inOut' },
        0
      );
      // Phase 1 simultaneously: bg fades out
      tl.to(bgRef.current, { opacity: 0, ease: 'power2.in' }, 0);
      // Phase 1: title dissolves upward
      tl.to(textRef.current, { opacity: 0, y: -40, ease: 'power2.in' }, 0);
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [firstWord = '', ...rest] = (title ?? '').split(' ');
  const restOfTitle = rest.join(' ');

  return (
    <div
      ref={triggerRef as RefObject<HTMLDivElement>}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Blurred bg still */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src={bgImageSrc}
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'blur(2px) brightness(0.55)' }}
        />
      </div>

      {/* Expanding video card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={mediaWrapRef}
          className="relative overflow-hidden shadow-2xl"
          style={{ width: '44vw', height: '62vh', borderRadius: '16px' }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* Title overlay */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className={`flex flex-col items-center ${textBlend ? 'mix-blend-difference' : ''}`}>
          <span
            className="font-['Anton'] text-[17vw] md:text-[13vw] leading-none uppercase"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)', color: 'transparent' }}
          >
            {firstWord}
          </span>
          {restOfTitle && (
            <span
              className="font-['Anton'] text-[17vw] md:text-[13vw] leading-none uppercase"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)', color: 'transparent' }}
            >
              {restOfTitle}
            </span>
          )}
        </div>
        {children && (
          <div className="mt-8 font-['var(--font-space-mono)'] font-mono text-[10px] text-white/40 tracking-[0.45em] uppercase text-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

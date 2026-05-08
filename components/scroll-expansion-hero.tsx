'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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
  containerRef?: React.RefObject<HTMLDivElement>;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  textBlend,
  children,
  containerRef: externalContainerRef,
}: ScrollExpandMediaProps) => {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalContainerRef;
  const mediaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(mediaRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        ease: 'none',
      }, 0);

      tl.to(bgRef.current, {
        opacity: 0,
        ease: 'none',
      }, 0);

      tl.to(textRef.current, {
        opacity: 0,
        y: -30,
        ease: 'power2.in',
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background still image that fades out */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <img
          src={bgImageSrc}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Expanding media card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          ref={mediaRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{ width: isMobile ? '85vw' : '42vw', height: isMobile ? '55vh' : '62vh' }}
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
            <img src={mediaSrc} alt={title || ''} className="w-full h-full object-cover" />
          )}
          {/* Dark vignette overlay on video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text overlay — spreads apart and fades */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className={`flex flex-col items-center gap-0 ${textBlend ? 'mix-blend-difference' : ''}`}>
          <span
            className="font-['Anton'] text-[18vw] md:text-[14vw] leading-none uppercase text-transparent"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
          >
            {firstWord}
          </span>
          {restOfTitle && (
            <span
              className="font-['Anton'] text-[18vw] md:text-[14vw] leading-none uppercase text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
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
};

export default ScrollExpandMedia;

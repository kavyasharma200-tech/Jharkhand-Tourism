'use client';

import { useEffect, useRef, useState, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  children?: ReactNode;
  containerRef?: RefObject<HTMLElement>;
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  children,
  containerRef: externalRef,
}: ScrollExpandMediaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerEl = externalRef?.current ?? wrapperRef.current;

  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = externalRef?.current ?? wrapperRef.current;

    const ctx = gsap.context(() => {
      gsap.set(mediaWrapRef.current, {
        width: '44vw',
        height: '62vh',
        borderRadius: '16px',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.4,
        },
      });

      tl.to(mediaWrapRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        ease: 'power2.inOut',
      }, 0);
      tl.to(bgRef.current, { opacity: 0, ease: 'power2.in' }, 0);
      tl.to(textRef.current, { opacity: 0, y: -40, ease: 'power2.in' }, 0);
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const [first = '', ...rest] = (title ?? '').split(' ');
  const restTitle = rest.join(' ');

  return (
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Blurred bg */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src={bgImageSrc}
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'blur(3px) brightness(0.5)' }}
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
              ref={videoRef}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Hollow title */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-['Anton'] text-[17vw] md:text-[14vw] leading-none uppercase tracking-tighter block text-center"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.75)', color: 'transparent' }}
        >
          {first}
        </span>
        {restTitle && (
          <span
            className="font-['Anton'] text-[17vw] md:text-[14vw] leading-none uppercase tracking-tighter block text-center"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.75)', color: 'transparent' }}
          >
            {restTitle}
          </span>
        )}
        {children && (
          <p className="font-mono text-[9px] text-white/40 tracking-[0.5em] uppercase mt-6">
            {children}
          </p>
        )}
      </div>

      {/* Sound toggle — bottom right, pointer-events-auto */}
      {mediaType === 'video' && (
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-30 flex items-center gap-2 border border-white/30 px-4 py-2 font-mono text-[9px] text-white/60 tracking-[0.3em] uppercase hover:border-white/70 hover:text-white/90 transition-all duration-300"
        >
          {muted ? (
            <>
              <span className="w-3 h-3 flex items-end gap-[2px]">
                <span className="block w-[2px] h-1 bg-current" />
                <span className="block w-[2px] h-2 bg-current" />
              </span>
              SOUND OFF
            </>
          ) : (
            <>
              <span className="w-3 h-3 flex items-end gap-[2px]">
                <span className="block w-[2px] h-1 bg-current" />
                <span className="block w-[2px] h-2 bg-current" />
                <span className="block w-[2px] h-3 bg-current" />
              </span>
              SOUND ON
            </>
          )}
        </button>
      )}

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-10 bg-white/20 animate-pulse" />
        <p className="font-mono text-[7px] text-white/25 tracking-[0.5em] uppercase">SCROLL</p>
      </div>
    </div>
  );
}

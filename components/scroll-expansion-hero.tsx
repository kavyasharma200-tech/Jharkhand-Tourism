'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <section ref={sectionRef} className='relative flex flex-col items-center justify-start h-screen w-full'>
        <div className='relative w-full flex flex-col items-center h-screen'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: 1 - scrollProgress }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen object-cover'
              priority
            />
            <div className='absolute inset-0 bg-white/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-screen relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                }}
              >
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt={title || ''}
                    width={1280}
                    height={720}
                    className='w-full h-full object-cover'
                  />
                )}
              </div>

              <div
                className={`flex flex-col items-center justify-center text-center gap-4 w-full relative z-10 ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-8xl lg:text-[12vw] font-["Anton"] text-black uppercase leading-[0.85]'
                  style={{ 
                    x: `-${textTranslateX}vw`,
                    WebkitTextStroke: '2px black',
                    color: 'transparent'
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-8xl lg:text-[12vw] font-["Anton"] uppercase leading-[0.85]'
                  style={{ 
                    x: `${textTranslateX}vw`,
                    WebkitTextStroke: '2px black',
                    color: 'transparent'
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.div
              className='w-full px-8 py-10 md:px-16 lg:py-20'
              style={{ opacity: scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

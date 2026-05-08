'use client';

import { MoveUpRight } from 'lucide-react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageData {
  id: number;
  src: string;
  alt: string;
}

import { CITY_IMAGES as images } from '@/data/images.data';

// Inlined useMediaQuery hook to resolve import issue
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      setMatches(mediaQueryList.matches);
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
};

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blue-theme' | 'green-theme';
  size?: 'default' | 'compact' | 'expanded';
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', size = 'default', asChild, className, children, ...props }, ref) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [activeImage, setActiveImage] = useState<ImageData | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [scale, setScale] = useState(0.5);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const requestRef = useRef<number | null>(null);
    const prevCursorPosition = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dx = clientX - prevCursorPosition.current.x;
      const dy = clientY - prevCursorPosition.current.y;

      const easeAmount = 0.2;
      const newX = prevCursorPosition.current.x + dx * easeAmount;
      const newY = prevCursorPosition.current.y + dy * easeAmount;

      setCursorPosition({ x: newX, y: newY });
      prevCursorPosition.current = { x: newX, y: newY };
    }, []);

    useEffect(() => {
      const updateCursorPosition = (e: MouseEvent) => {
        if (requestRef.current) return;
        requestRef.current = requestAnimationFrame(() => {
          handleMouseMove(e);
          requestRef.current = null;
        });
      };

      window.addEventListener('mousemove', updateCursorPosition);
      return () => {
        window.removeEventListener('mousemove', updateCursorPosition);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }, [handleMouseMove]);

    const handleImageHover = useCallback(
      (image: ImageData) => {
        if (activeImage !== image) {
          setActiveImage(image);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setOpacity(1);
            setScale(1);
          }, 50);
        } else {
          setOpacity(1);
          setScale(1);
        }
      },
      [activeImage]
    );

    const handleMouseLeave = useCallback(() => {
      setOpacity(0);
      setScale(0.5);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActiveImage(null);
      }, 300);
    }, []);

    const variantClasses = {
      default: 'bg-white border-black/10',
      'blue-theme': 'dark:bg-gradient-to-b from-blue-900 from-10% to-blue-950 to-100% bg-blue-100',
      'green-theme': 'dark:bg-gradient-to-b from-green-900 from-10% to-green-950 to-100% bg-green-100',
    };

    const sizeClasses = {
      default: 'p-4 text-xl sm:text-2xl md:text-5xl',
      compact: 'p-2 text-lg sm:text-xl md:text-4xl',
      expanded: 'p-6 text-2xl sm:text-3xl md:text-6xl',
    };

    const h2SizeClasses = {
        default: 'text-xl sm:text-2xl md:text-5xl',
        compact: 'text-lg sm:text-xl md:text-4xl',
        expanded: 'text-2xl sm:text-3xl md:text-6xl',
    };

    const commonClasses = cn(
      'relative w-full min-h-fit rounded-md border',
      variantClasses[variant],
      className
    );

    if (asChild) {
      return React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            ref: ref as any,
            className: cn((children.props as any).className, commonClasses),
            ...props,
          })
        : <div ref={ref} className={commonClasses} {...props}>{children}</div>;
    }

    return (
      <div
        ref={ref}
        className={commonClasses}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(`cursor-pointer relative sm:flex items-center justify-between`, sizeClasses[size])}
            onMouseEnter={() => handleImageHover(image)}
          >
            {!isDesktop && (
              <img
                src={image.src}
                className='sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md'
                alt='mobileImg'
              />
            )}
            <h2
              className={cn(
                `font-['Anton'] uppercase sm:py-6 py-2 leading-[100%] relative transition-colors duration-300`,
                h2SizeClasses[size],
                activeImage?.id === image.id
                  ? 'mix-blend-difference z-20 text-white'
                  : 'text-black/80'
              )}
            >
              {image.alt}
            </h2>
            <button
              className={cn(
                `sm:block hidden p-4 rounded-full transition-all duration-300 ease-out border border-white/10`,
                activeImage?.id === image.id
                  ? 'mix-blend-difference z-20 bg-black text-white'
                  : 'bg-white text-black'
              )}
            >
              <MoveUpRight className='w-8 h-8' />
            </button>
            <div
              className={`h-[2px] bg-white absolute bottom-0 left-0 transition-all duration-300 ease-linear ${
                activeImage?.id === image.id ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
        {isDesktop && activeImage && (
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className={`fixed bg-white object-cover pointer-events-none z-10 w-[400px] h-[300px] rounded-none contrast-110 shadow-2xl`}
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
            }}
          />
        )}
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;
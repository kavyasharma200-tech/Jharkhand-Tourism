'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CITY_IMAGES as images } from '@/data/images.data';

interface ImageData {
  id: number;
  src: string;
  alt: string;
}

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blue-theme' | 'green-theme';
  size?: 'default' | 'compact' | 'expanded';
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', size = 'default', asChild, className, children, ...props }, ref) => {
    const [activeImage, setActiveImage] = useState<ImageData | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
        rafRef.current = null;
      });
    }, []);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      el.addEventListener('mousemove', handleMouseMove);
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [handleMouseMove]);

    const sizeClasses: Record<string, string> = {
      default: 'text-xl sm:text-2xl md:text-5xl',
      compact: 'text-lg sm:text-xl md:text-4xl',
      expanded: 'text-2xl sm:text-3xl md:text-6xl',
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node!;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn('relative w-full overflow-hidden', className)}
        onMouseLeave={() => setActiveImage(null)}
        {...props}
      >
        {/* Hover image — absolute relative to this container */}
        {activeImage && (
          <div
            className="absolute z-10 pointer-events-none overflow-hidden w-[320px] h-[220px] md:w-[420px] md:h-[290px] shadow-2xl"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.2s ease',
            }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* City rows */}
        {images.map((image) => (
          <div
            key={image.id}
            className="relative flex items-center justify-between border-b border-black/8 py-4 md:py-6 group cursor-pointer"
            onMouseEnter={() => setActiveImage(image)}
          >
            <h2
              className={cn(
                "font-['Anton'] uppercase leading-none transition-all duration-300 relative z-20",
                sizeClasses[size],
                activeImage?.id === image.id
                  ? 'text-black scale-[1.01] translate-x-2'
                  : 'text-black/50'
              )}
            >
              {image.alt}
            </h2>

            {/* Right arrow indicator */}
            <span
              className={cn(
                'font-mono text-[9px] tracking-[0.4em] uppercase transition-all duration-300 relative z-20',
                activeImage?.id === image.id ? 'text-black opacity-100 translate-x-0' : 'text-black/20 -translate-x-2 opacity-0'
              )}
            >
              EXPLORE →
            </span>

            {/* Underline expand */}
            <div
              className={cn(
                'absolute bottom-0 left-0 h-px bg-black transition-all duration-300',
                activeImage?.id === image.id ? 'w-full' : 'w-0'
              )}
            />
          </div>
        ))}
      </div>
    );
  }
);

Component.displayName = 'Component';
export default Component;
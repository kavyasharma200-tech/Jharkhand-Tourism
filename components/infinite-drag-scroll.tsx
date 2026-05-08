'use client';

import { useMotionValue, motion } from 'framer-motion';
import { memo, useContext, useEffect, useRef, createContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type variants = 'default' | 'masonry' | 'polaroid';

const GridVariantContext = createContext<variants | undefined>(undefined);

export const DraggableContainer = ({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Wheel scroll — accumulates on top of current position, never resets
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      x.set(x.get() - e.deltaX);
      y.set(y.get() - e.deltaY);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [x, y]);

  // Touch / drag — purely additive, no momentum, no spring-back
  const dragStart = useRef({ x: 0, y: 0, mx: 0, my: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, mx: x.get(), my: y.get() };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!(e.currentTarget as HTMLDivElement).hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    x.set(dragStart.current.mx + dx);
    y.set(dragStart.current.my + dy);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  return (
    <GridVariantContext.Provider value={variant}>
      <div className="h-dvh overflow-hidden">
        <motion.div
          ref={ref}
          className={cn(
            'grid h-fit w-fit cursor-grab active:cursor-grabbing will-change-transform grid-cols-[repeat(2,1fr)] bg-white',
            className,
          )}
          style={{ x, y }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {children}
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    'overflow-hidden w-full h-full will-change-transform',
    {
      variants: {
        variant: {
          default: 'rounded-sm',
          masonry: 'even:mt-[60%] rounded-sm',
          polaroid:
            'border-10 border-b-28 border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[60%]',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  );

  return (
    <div className={cn(gridItemStyles({ variant, className }))}>
      {children}
    </div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva('grid grid-cols-[repeat(6,1fr)] h-fit w-fit', {
      variants: {
        variant: {
          default: 'gap-14 p-7 md:gap-28 md:p-14',
          masonry: 'gap-x-14 px-7 md:gap-x-28 md:px-14',
          polaroid: 'gap-x-14 px-7 md:gap-x-28 md:px-14',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(gridBodyStyles({ variant, className }))}
          >
            {children}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = 'GridBody';

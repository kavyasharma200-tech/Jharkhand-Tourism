import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
} from "framer-motion";
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

//Types
type variants = "default" | "masonry" | "polaroid";

// Create Context
const GridVariantContext = createContext<variants | undefined>(undefined);

//Motion Variants
const rowVariants = {
  initial: { opacity: 0 },
  animate: () => ({
    opacity: 1,
    transition: {
      delay: Math.random() * 0.5 + 0.5,
      duration: 1,
      ease: "easeOut",
    },
  }),
};

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

  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      // Use a direct check instead of depending on state to prevent useEffect re-runs
      animate(y, y.get() - event.deltaY * 2.7, {
        type: "tween",
        duration: 1.2,
        ease: cubicBezier(0.18, 0.71, 0.11, 1),
      });
    };

    window.addEventListener("wheel", handleWheelScroll);
    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, [y]);

  return (
    <GridVariantContext.Provider value={variant}>
      <div className="h-dvh overflow-hidden">
        <motion.div
          className="h-dvh overflow-hidden"
        >
          <motion.div
            className={cn(
              "grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] bg-white active:cursor-grabbing will-change-transform",
              className,
            )}
            drag
            dragMomentum={true}
            dragElastic={0}
            dragTransition={{
              timeConstant: 300,
              power: 0.3,
              bounceStiffness: 0,
            }}
            onMouseDown={handleIsDragging}
            onMouseUp={handleIsNotDragging}
            onMouseLeave={handleIsNotDragging}
            style={{ x, y }}
            ref={ref}
          >
            {children}
          </motion.div>
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
    "overflow-hidden hover:cursor-pointer w-full h-full will-change-transform",
    {
      variants: {
        variant: {
          default: "rounded-sm",
          masonry: "even:mt-[60%] rounded-sm ",
          polaroid:
            "border-10 border-b-28 border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[60%]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant, className }))}
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
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

    const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
      variants: {
        variant: {
          default: "gap-14 p-7 md:gap-28 md:p-14",
          masonry: "gap-x-14 px-7 md:gap-x-28 md:px-14",
          polaroid: "gap-x-14 px-7 md:gap-x-28 md:px-14",
        },
      },
      defaultVariants: {
        variant: "default",
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

GridBody.displayName = "GridBody";

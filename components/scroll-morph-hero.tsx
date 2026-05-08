"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Utility ---
// function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs));
// }

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  // Reduced from 100
const IMG_HEIGHT = 85; // Reduced from 140

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                mass: 0.8,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-transparent transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white flex flex-col items-center justify-center p-4 border border-black/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="font-['Space_Mono'] text-[8px] font-bold text-black uppercase tracking-[0.2em] mb-1">
                          {LOCATION_NAMES[index % LOCATION_NAMES.length]}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000; // Virtual scroll range

import { JHARKHAND_IMAGES } from "@/data/images.data";

// Jharkhand Images and Locations
const IMAGES = JHARKHAND_IMAGES;

const LOCATION_NAMES = [
  "Hundru Falls", "Betla Forest", "Jonha Falls", "Panchghagh", "Dalma Hills", "Ranchi", "Patratu Valley", "Deoghar", "Hazaribagh", "Netarhat"
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation({ scrollProgress }: { scrollProgress: number }) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [morphProgress, setMorphProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync morphProgress with scrollProgress
    useEffect(() => {
        const m = Math.min(Math.max(scrollProgress * 4, 0), 1);
        setMorphProgress(m);
    }, [scrollProgress]);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = () => {
            setContainerSize({
                width: containerRef.current!.offsetWidth,
                height: containerRef.current!.offsetHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 40);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 600);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2200);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1600,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.5,
            opacity: 0,
        }));
    }, []);

    const [parallaxVal, setParallaxVal] = useState(0);
    useEffect(() => {
        const unsub = smoothMouseX.on("change", setParallaxVal);
        return () => unsub();
    }, [smoothMouseX]);

    // --- Card Pos Calculation ---
    const getCardTarget = (i: number) => {
        if (introPhase === "scatter") return scatterPositions[i];
        
        if (introPhase === "line") {
            const spacing = 75;
            const totalW = TOTAL_IMAGES * spacing;
            return { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
        }

        // Circle vs Arc Morph
        const isMobile = containerSize.width < 768;
        const minDim = Math.min(containerSize.width, containerSize.height);
        
        // Circle
        const radius = Math.min(minDim * 0.35, 340);
        const angle = (i / TOTAL_IMAGES) * 360;
        const rad = (angle * Math.PI) / 180;
        const circle = {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius,
            rotation: angle + 90,
            scale: 1,
        };

        // Arc (Rainbow)
        const arcRadius = minDim * (isMobile ? 1.4 : 1.2);
        const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.2);
        const arcCenterY = arcApexY + arcRadius;
        const spread = isMobile ? 90 : 120;
        const startA = -90 - (spread / 2);
        const step = spread / (TOTAL_IMAGES - 1);
        
        // Shuffle based on remaining scroll (after morph)
        // Shuffling happens between 0.3 and 1.0 of scrollProgress
        const shuffleProgress = Math.max((scrollProgress - 0.3) / 0.7, 0);
        const rotationOffset = -shuffleProgress * (spread * 0.8);

        const curAngle = startA + (i * step) + rotationOffset;
        const curRad = (curAngle * Math.PI) / 180;
        const arc = {
            x: Math.cos(curRad) * arcRadius + parallaxVal,
            y: Math.sin(curRad) * arcRadius + arcCenterY,
            rotation: curAngle + 90,
            scale: isMobile ? 1.5 : 1.8,
        };

        return {
            x: lerp(circle.x, arc.x, morphProgress),
            y: lerp(circle.y, arc.y, morphProgress),
            rotation: lerp(circle.rotation, arc.rotation, morphProgress),
            scale: lerp(circle.scale, arc.scale, morphProgress),
            opacity: 1,
        };
    };

    // Fades
    const contentOpacity = morphProgress > 0.8 ? (morphProgress - 0.8) * 5 : 0;
    const contentY = morphProgress > 0.8 ? (1 - (morphProgress - 0.8) * 5) * 20 : 20;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
                {/* Hero Title (Fades Out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center top-1/2 -translate-y-1/2">
                    <motion.h1
                        animate={introPhase === "circle" && morphProgress < 0.5 ? { opacity: 1 - morphProgress * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="font-['Anton'] text-[8vw] md:text-[6vw] text-black tracking-tight leading-none uppercase"
                    >
                        THE LAND OF FORESTS
                    </motion.h1>
                </div>

                {/* Sub-content (Fades In) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[12%] z-10 flex flex-col items-center text-center px-4"
                >
                    <h2 className="font-['Anton'] text-[5vw] text-black uppercase leading-none mb-4">
                        Ancient Wilderness
                    </h2>
                    <p className="font-['Space_Mono'] text-[10px] text-black/40 max-w-sm uppercase tracking-[0.2em] leading-relaxed">
                        Where the jungle breathes and history is written in stone.
                    </p>
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => (
                        <FlipCard
                            key={i}
                            src={src}
                            index={i}
                            total={TOTAL_IMAGES}
                            phase={introPhase}
                            target={getCardTarget(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}



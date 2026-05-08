'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function SectionBrutalistGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Layer 1 moves slower
      gsap.to(layer1Ref.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Layer 2 moves faster
      gsap.to(layer2Ref.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Layer 3 (text) moves even faster
      gsap.to(layer3Ref.current, {
        y: -400,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-white overflow-hidden border-t border-black/5 flex items-center justify-center">
      {/* Background Text Fragment */}
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none select-none">
        <h2 className="font-['Anton'] text-[30vw] leading-none uppercase">Chaos</h2>
      </div>

      {/* Layer 1: Base Images */}
      <div ref={layer1Ref} className="absolute inset-0 z-0 grid grid-cols-4 gap-8 p-10 opacity-40">
        <div className="aspect-[3/4] bg-black/5 overflow-hidden">
          <img src={JHARKHAND_IMAGES[12]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="aspect-[3/4] bg-black/5 overflow-hidden mt-40">
          <img src={JHARKHAND_IMAGES[13]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="aspect-[3/4] bg-black/5 overflow-hidden -mt-20">
          <img src={JHARKHAND_IMAGES[14]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="aspect-[3/4] bg-black/5 overflow-hidden mt-10">
          <img src={JHARKHAND_IMAGES[15]} alt="" className="w-full h-full object-cover grayscale" />
        </div>
      </div>

      {/* Layer 2: Offset Images */}
      <div ref={layer2Ref} className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-12 gap-4">
        <div className="col-start-2 col-span-4 aspect-square bg-black overflow-hidden shadow-2xl rotate-3">
          <img src={JHARKHAND_IMAGES[16]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="col-start-8 col-span-4 aspect-[4/5] bg-black overflow-hidden shadow-2xl -rotate-6 mt-40">
          <img src={JHARKHAND_IMAGES[17]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Layer 3: Typography Focus */}
      <div ref={layer3Ref} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <h3 className="font-['Playfair_Display'] text-[12vw] md:text-[8vw] text-black leading-[0.8] italic font-black uppercase mix-blend-difference invert">
            Brutalist<br />Heritage
          </h3>
          <p className="font-['Space_Mono'] text-[10px] md:text-sm text-black tracking-[0.5em] mt-8 uppercase bg-white px-4 py-2">
            The raw pulse of Jharkhand
          </p>
        </div>
      </div>

      {/* Foreground Accent */}
      <div className="absolute bottom-40 right-20 z-30 w-64 h-64 border border-black p-4 flex flex-col justify-end">
        <p className="font-['Space_Mono'] text-[9px] leading-tight text-black uppercase">
          [ ARCHIVAL FRAGMENT 092 ]<br />
          Saranda Canopy Density<br />
          Coordinates: 22.25°N 85.35°E
        </p>
      </div>
    </section>
  )
}

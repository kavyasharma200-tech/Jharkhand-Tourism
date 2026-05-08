'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZoomParallax } from '@/components/zoom-parallax'
import { JHARKHAND_IMAGES } from '@/data/images.data'

const parallaxImages = [
  { src: JHARKHAND_IMAGES[0], alt: "Hundru Falls" },
  { src: JHARKHAND_IMAGES[1], alt: "Patratu Valley" },
  { src: JHARKHAND_IMAGES[2], alt: "Baidyanath Temple" },
  { src: JHARKHAND_IMAGES[4], alt: "Netarhat" },
  { src: JHARKHAND_IMAGES[6], alt: "Dimna Lake" },
  { src: JHARKHAND_IMAGES[8], alt: "Paras Nath" },
  { src: JHARKHAND_IMAGES[10], alt: "Ghatshila" },
];

export default function SectionZoomParallax() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative bg-white w-full h-screen overflow-hidden border-t border-black/5">
      <div className="absolute top-0 left-0 w-full z-10 px-8 md:px-24 pt-32 pb-16 pointer-events-none">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight uppercase">Landscapes</h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mt-4 uppercase">Unbroken / Canopy / Horizon</p>
      </div>
      <ZoomParallax images={parallaxImages} />
    </section>
  )
}



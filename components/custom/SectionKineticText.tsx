'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SectionKineticText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line3Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      tl.to(line1Ref.current, { x: -200, rotate: -5, duration: 1 }, 0)
      tl.to(line2Ref.current, { x: 200, rotate: 5, duration: 1 }, 0)
      tl.to(line3Ref.current, { x: -150, scale: 1.5, duration: 1 }, 0)
      
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center py-20 px-4">
      <div ref={textRef} className="w-full max-w-none flex flex-col gap-4 md:gap-0 items-center justify-center">
        <h2 ref={line1Ref} className="font-['Anton'] text-[20vw] md:text-[18vw] leading-none text-white tracking-tighter uppercase whitespace-nowrap">
          Waterfalls
        </h2>
        <h2 ref={line2Ref} className="font-['Playfair_Display'] text-[18vw] md:text-[15vw] leading-none text-transparent italic font-black uppercase whitespace-nowrap" style={{ WebkitTextStroke: '2px white' }}>
          Wilderness
        </h2>
        <h2 ref={line3Ref} className="font-['DM_Serif_Display'] text-[22vw] md:text-[20vw] leading-none text-white uppercase whitespace-nowrap">
          Wonders
        </h2>
      </div>

      {/* Brutalist Elements */}
      <div className="absolute top-10 left-10 text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-[0.4em]">
        JHARKHAND / KINETIC PULSE
      </div>
      
      <div className="absolute bottom-10 right-10 text-white flex flex-col items-end">
        <span className="font-['Space_Mono'] text-[8px] opacity-50 mb-2 uppercase">Editorial Perspective</span>
        <div className="w-40 h-1 bg-white" />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-white/10 pointer-events-none" />
    </section>
  )
}

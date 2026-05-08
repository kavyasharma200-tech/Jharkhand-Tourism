'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Component from '@/components/image-reveal'

export default function SectionImageReveal() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
        }
      })

      tl.from(headerRef.current, {
        opacity: 0,
        y: 60,
        ease: 'power3.out',
      }, 0)

      tl.from(gridRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 40,
        ease: 'power3.out',
      }, 0.2)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5 px-8 md:px-24">
      <div ref={headerRef} className="pt-24 pb-8">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight mb-4 uppercase">
          Metropolises
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mb-12 uppercase">
          Ranchi / Jamshedpur / Dhanbad / Bokaro
        </p>
      </div>
      <div ref={gridRef} className="flex-1 min-h-0">
        <Component variant="default" size="expanded" className="border-0 bg-transparent rounded-none h-full" />
      </div>
    </section>
  )
}



'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Component from '@/components/image-reveal'

export default function SectionImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5">
      <div ref={headerRef} className="px-8 md:px-24 pt-24 pb-8">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight mb-4 uppercase">
          Metropolises
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mb-12 uppercase">
          Ranchi / Jamshedpur / Dhanbad / Bokaro
        </p>
      </div>
      <div className="px-8 md:px-24">
        <Component variant="default" size="expanded" className="border-0 bg-transparent rounded-none" />
      </div>
    </section>
  )
}



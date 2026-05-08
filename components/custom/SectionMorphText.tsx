'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroAnimation from '@/components/scroll-morph-hero'

export default function SectionMorphText() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',        // 3.5× viewport of pinning scroll room
        pin: true,
        pinSpacing: true,
        scrub: 1.8,            // generous lag for buttery momentum
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden border-t border-black/5"
    >
      <IntroAnimation scrollProgress={scrollProgress} />
    </section>
  )
}

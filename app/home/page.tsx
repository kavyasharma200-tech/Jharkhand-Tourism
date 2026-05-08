'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/custom/Navbar'
import SectionHero from '@/components/custom/SectionHero'
import SectionMorphText from '@/components/custom/SectionMorphText'
import SectionImageReveal from '@/components/custom/SectionImageReveal'
import SectionAnimatedSlideshow from '@/components/custom/SectionAnimatedSlideshow'
import SectionZoomParallax from '@/components/custom/SectionZoomParallax'
import SectionStoryScroll from '@/components/custom/SectionStoryScroll'
import SectionStats from '@/components/custom/SectionStats'
import SectionBrutalistGrid from '@/components/custom/SectionBrutalistGrid'
import SectionKineticText from '@/components/custom/SectionKineticText'
import SectionHorizontalGallery from '@/components/custom/SectionHorizontalGallery'
import Footer from '@/components/custom/Footer'

export default function HomePage() {
  useEffect(() => {
    let rafId: number

    const tickerUpdate = (time: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) lenis.raf(time * 1000)
    }

    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis
      if (lenis) {
        gsap.registerPlugin(ScrollTrigger)
        gsap.ticker.add(tickerUpdate)
        gsap.ticker.lagSmoothing(0)

        // Snapping for all major sections
        const sections = gsap.utils.toArray('section')
        if (sections.length > 0) {
          ScrollTrigger.create({
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            snap: {
              snapTo: 1 / (sections.length - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.1,
              ease: "power1.inOut"
            }
          })
        }
      } else {
        rafId = requestAnimationFrame(init)
      }
    }

    init()

    return () => {
      gsap.ticker.remove(tickerUpdate)
      if (rafId) cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main>
      <Navbar />
      <SectionHero />
      <SectionMorphText />
      <SectionImageReveal />
      <SectionAnimatedSlideshow />
      <SectionZoomParallax />
      <SectionStoryScroll />
      <SectionBrutalistGrid />
      <SectionKineticText />
      <SectionHorizontalGallery />
      <SectionStats />
      <Footer />
    </main>
  )
}

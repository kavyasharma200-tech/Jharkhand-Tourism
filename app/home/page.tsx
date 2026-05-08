'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '@/components/custom/Navbar'
import SectionHero from '@/components/custom/SectionHero'
import SectionMorphText from '@/components/custom/SectionMorphText'
import SectionImageReveal from '@/components/custom/SectionImageReveal'
import SectionAnimatedSlideshow from '@/components/custom/SectionAnimatedSlideshow'
import SectionZoomParallax from '@/components/custom/SectionZoomParallax'
import SectionStoryScroll from '@/components/custom/SectionStoryScroll'
import SectionStats from '@/components/custom/SectionStats'
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
        gsap.ticker.add(tickerUpdate)
        gsap.ticker.lagSmoothing(0)
      } else {
        rafId = requestAnimationFrame(init)
      }
    }

    init()

    return () => {
      gsap.ticker.remove(tickerUpdate)
      if (rafId) cancelAnimationFrame(rafId)
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
      <SectionStats />
      <Footer />
    </main>
  )
}

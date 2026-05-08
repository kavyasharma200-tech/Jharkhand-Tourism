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
    // Wait for Lenis to be initialized globally by LenisProvider
    const initGSAPLenis = () => {
      const lenis = (window as any).__lenis
      if (lenis) {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      } else {
        requestAnimationFrame(initGSAPLenis)
      }
    }
    
    initGSAPLenis()

    // Add snapping for sections
    const sections = gsap.utils.toArray('section')
    if (sections.length > 0) {
      ScrollTrigger.create({
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / 7, // 7 sections + 1 footer = 8 points
          duration: { min: 0.3, max: 0.7 },
          delay: 0.1,
          ease: "power2.inOut"
        }
      })
    }

    return () => {
      gsap.ticker.remove((time) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).__lenis
        if (lenis) lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <main>
      <Navbar />
      <SectionHero />          {/* ScrollExpandMedia — Jharkhand video/image */}
      <SectionMorphText />     {/* IntroAnimation — "Jharkhand is a tourism paradise" */}
      <SectionImageReveal />   {/* Image trail — 5 major cities */}
      <SectionAnimatedSlideshow /> {/* HoverSlider — natural wonders */}
      <SectionZoomParallax />  {/* Multi-layer parallax zoom */}
      <SectionStoryScroll />   {/* FlowArt — 4 stories: forest, falls, culture, wildlife */}
      <SectionStats />         {/* Custom — GSAP counter animation */}
      <Footer />
    </main>
  )
}

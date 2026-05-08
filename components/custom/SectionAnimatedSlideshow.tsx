'use client'

import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage
} from '@/components/animated-slideshow'
import { JHARKHAND_IMAGES } from '@/data/images.data'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const slides = [
  { label: "HUNDRU FALLS", image: JHARKHAND_IMAGES[0] },
  { label: "PATRATU VALLEY", image: JHARKHAND_IMAGES[1] },
  { label: "BETLA NATIONAL PARK", image: JHARKHAND_IMAGES[5] },
  { label: "DASSAM FALLS", image: JHARKHAND_IMAGES[11] },
  { label: "NETARHAT SUNSET", image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
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
          Wonders
        </h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mb-12 uppercase">
          Cascades / Valleys / Sanctuaries
        </p>
      </div>

      <div className="px-8 md:px-24">
        <HoverSlider className="w-full flex flex-col md:flex-row items-stretch border-t border-black/10">
          {/* Left: Text list, 50% */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-24 z-10 relative">
            <div className="flex flex-col gap-4">
              {slides.map((slide, i) => (
                <TextStaggerHover
                  key={i}
                  text={slide.label}
                  index={i}
                  className="font-['Anton'] text-[6vw] md:text-[3.5vw] text-black/20 hover:text-black leading-tight cursor-pointer transition-colors duration-300 uppercase"
                />
              ))}
            </div>
          </div>

          {/* Right: Image wrap */}
          <HoverSliderImageWrap className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-0">
            {slides.map((slide, i) => (
              <HoverSliderImage
                key={i}
                index={i}
                imageUrl={slide.image}
                alt={slide.label}
                className="object-cover contrast-110 w-full h-full"
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>
      </div>
    </section>
  )
}



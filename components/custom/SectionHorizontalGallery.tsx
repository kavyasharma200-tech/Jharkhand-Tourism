'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function SectionHorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.offsetWidth || 0
      const amountToScroll = scrollWidth - window.innerWidth

      gsap.to(scrollRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Horizontal scroll length
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const galleryItems = [
    { src: JHARKHAND_IMAGES[18], title: "Steel & Spirit", desc: "Jamshedpur's industrial legacy" },
    { src: JHARKHAND_IMAGES[19], title: "Divine Peaks", desc: "Parasnath's spiritual climb" },
    { src: JHARKHAND_IMAGES[20], title: "Lake Burudi", desc: "The quiet mirror of the east" },
    { src: JHARKHAND_IMAGES[21], title: "Rankini Temple", desc: "Ancient stones, timeless devotion" },
    { src: JHARKHAND_IMAGES[22], title: "Kanke Dam", desc: "Sunset over the water reserve" },
  ]

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-white overflow-hidden border-t border-black/5">
      <div className="absolute top-12 left-12 z-20">
        <h2 className="font-['Anton'] text-[8vw] md:text-[5vw] text-black leading-none">
          THE HORIZON
        </h2>
        <p className="font-['Space_Mono'] text-[10px] tracking-[0.3em] text-black/40 uppercase mt-4">
          A panoramic journey across districts
        </p>
      </div>

      <div ref={scrollRef} className="flex flex-nowrap items-center h-full px-[10vw] gap-[5vw]">
        {galleryItems.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-[80vw] md:w-[45vw] h-[60vh] relative group">
            <div className="w-full h-full overflow-hidden bg-black/5">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
            </div>
            <div className="mt-6">
              <span className="font-['Space_Mono'] text-[9px] text-black/30">0{i + 1} / DISCOVERY</span>
              <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl text-black mt-2 font-black italic">{item.title}</h3>
              <p className="font-['DM_Serif_Display'] text-lg text-black/40 mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-12 left-0 w-full px-12 z-20 flex justify-between items-end">
        <div className="w-1/2 h-px bg-black/10" />
        <span className="font-['Space_Mono'] text-[9px] text-black/40 tracking-[0.25em]">CONTINUE EXPLORING ↓</span>
      </div>
    </section>
  )
}

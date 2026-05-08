'use client'

import ScrollExpandMedia from '@/components/scroll-expansion-hero'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function SectionHero() {
  return (
    <div className="relative w-full h-full [&_h2]:!text-black">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={JHARKHAND_IMAGES[1]}
        bgImageSrc={JHARKHAND_IMAGES[1]}
        title="JHARKHAND"
        scrollToExpand="SCROLL TO ENTER"
        textBlend={false}
      >
        <p className="font-['Space_Mono'] text-xs tracking-[0.3em] text-black/60 text-center uppercase">
          THE SOUL OF INDIA — FORESTS, FALLS & FIRE
        </p>
      </ScrollExpandMedia>
      <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <p className="font-['Space_Mono'] text-[11px] text-black tracking-[0.4em] uppercase text-center mt-16">
          INDIA&apos;S BEST KEPT SECRET
        </p>
      </div>
    </div>
  )
}


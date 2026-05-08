'use client'

import { ZoomParallax } from '@/components/zoom-parallax'
import { JHARKHAND_IMAGES } from '@/data/images.data'

const parallaxImages = [
  { src: JHARKHAND_IMAGES[0], alt: "Hundru Falls" },
  { src: JHARKHAND_IMAGES[1], alt: "Patratu Valley" },
  { src: JHARKHAND_IMAGES[2], alt: "Baidyanath Temple" },
  { src: JHARKHAND_IMAGES[4], alt: "Netarhat" },
  { src: JHARKHAND_IMAGES[6], alt: "Dimna Lake" },
  { src: JHARKHAND_IMAGES[8], alt: "Paras Nath" },
  { src: JHARKHAND_IMAGES[10], alt: "Ghatshila" },
];

export default function SectionZoomParallax() {
  return (
    <section className="relative bg-white w-full overflow-hidden [&_.zoom-parallax-container_img]:contrast-105">
      {/* Pre-section label */}
      <div className="absolute top-8 left-0 w-full z-20 flex justify-between px-8 pointer-events-none">
        <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.25em]">LANDSCAPES</span>
        <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.25em]">SCROLL ↓</span>
      </div>
      <ZoomParallax images={parallaxImages} />
    </section>
  )
}


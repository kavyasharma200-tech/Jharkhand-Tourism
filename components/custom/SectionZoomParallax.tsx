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
    <section className="relative bg-white w-full overflow-hidden [&_.zoom-parallax-container_img]:contrast-105 border-t border-black/5">
      <div className="px-8 md:px-24 pt-32 pb-16">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight uppercase">Landscapes</h2>
        <p className="font-['Space_Mono'] text-[11px] text-black/40 tracking-[0.4em] mt-4 uppercase">Unbroken / Canopy / Horizon</p>
      </div>
      <ZoomParallax images={parallaxImages} />
    </section>
  )
}


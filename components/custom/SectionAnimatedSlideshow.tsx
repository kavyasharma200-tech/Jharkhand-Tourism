'use client'

import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage
} from '@/components/animated-slideshow'
import { JHARKHAND_IMAGES } from '@/data/images.data'

const slides = [
  { label: "HUNDRU FALLS", image: JHARKHAND_IMAGES[0] },
  { label: "PATRATU VALLEY", image: JHARKHAND_IMAGES[1] },
  { label: "BETLA NATIONAL PARK", image: JHARKHAND_IMAGES[5] },
  { label: "DASSAM FALLS", image: JHARKHAND_IMAGES[11] },
  { label: "NETARHAT SUNSET", image: JHARKHAND_IMAGES[4] },
];

export default function SectionAnimatedSlideshow() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col md:flex-row items-stretch overflow-hidden border-t border-black/5">
      <HoverSlider className="w-full flex flex-col md:flex-row items-stretch">
        {/* Left: Text list, 50% */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-24 z-10 relative">
          <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] mb-8 uppercase">
            NATURAL WONDERS
          </p>
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
    </section>
  )
}


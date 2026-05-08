'use client'

import FlowArt, { FlowSection } from '@/components/story-scroll'
import { JHARKHAND_IMAGES } from '@/data/images.data'

export default function SectionStoryScroll() {
  return (
    <section className="relative w-full bg-white">
      <FlowArt className="bg-white">
        
        <FlowSection
          className="bg-[#f9f9f9] border border-black/5"
          aria-label="Forests"
        >
          <div className="flex flex-col h-full justify-between p-8 md:p-12">
            <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">01 / FORESTS</span>
            <div>
              <h2 className="font-['Playfair_Display'] text-[8vw] md:text-[6vw] text-black leading-tight">
                Where the jungle breathes
              </h2>
              <p className="font-['DM_Serif_Display'] text-xl md:text-2xl text-black/50 mt-6 max-w-lg">
                Saranda — the world&apos;s largest sal forest. 820 square kilometres of unbroken canopy.
              </p>
            </div>
            <img src={JHARKHAND_IMAGES[1]} className="w-full h-48 md:h-64 object-cover contrast-110 mt-8" />
          </div>
        </FlowSection>

        <FlowSection
          className="bg-[#ffffff] border border-black/5"
          aria-label="Waterfalls"
        >
          <div className="flex flex-col h-full justify-between p-8 md:p-12">
            <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">02 / WATERFALLS</span>
            <div>
              <h2 className="font-['Playfair_Display'] text-[8vw] md:text-[6vw] text-black leading-tight">
                Water writing history in stone
              </h2>
              <p className="font-['DM_Serif_Display'] text-xl md:text-2xl text-black/50 mt-6 max-w-lg">
                Over 40 named waterfalls. Hundru, Jonha, Dassam, Panchghagh — each carved by the Subarnarekha.
              </p>
            </div>
            <img src={JHARKHAND_IMAGES[0]} className="w-full h-48 md:h-64 object-cover contrast-110 mt-8" />
          </div>
        </FlowSection>

        <FlowSection
          className="bg-[#f5f5f5] border border-black/5"
          aria-label="Culture"
        >
          <div className="flex flex-col h-full justify-between p-8 md:p-12">
            <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">03 / CULTURE</span>
            <div>
              <h2 className="font-['Playfair_Display'] text-[8vw] md:text-[6vw] text-black leading-tight">
                32 tribes. One heartbeat.
              </h2>
              <p className="font-['DM_Serif_Display'] text-xl md:text-2xl text-black/50 mt-6 max-w-lg">
                Santhali, Munda, Ho, Oraon — traditions older than written history, still alive in every festival.
              </p>
            </div>
            <img src={JHARKHAND_IMAGES[3]} className="w-full h-48 md:h-64 object-cover contrast-110 mt-8" />
          </div>
        </FlowSection>

        <FlowSection
          className="bg-white border border-black/5"
          aria-label="Wildlife"
        >
          <div className="flex flex-col h-full justify-between p-8 md:p-12">
            <span className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">04 / WILDLIFE</span>
            <div>
              <h2 className="font-['Playfair_Display'] text-[8vw] md:text-[6vw] text-black leading-tight">
                Bengal tigers still roam here.
              </h2>
              <p className="font-['DM_Serif_Display'] text-xl md:text-2xl text-black/50 mt-6 max-w-lg">
                Betla National Park — one of India&apos;s first tiger reserves. Elephants, leopards, gaur.
              </p>
            </div>
            <img src={JHARKHAND_IMAGES[5]} className="w-full h-48 md:h-64 object-cover contrast-110 mt-8" />
          </div>
        </FlowSection>

      </FlowArt>
    </section>
  )
}

